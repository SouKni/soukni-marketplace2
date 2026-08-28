-- Real reviews system migration
-- Run this in the Supabase SQL Editor, then tell Claude it's done.
-- Independent of scripts/migration-reports-system.sql — run in either order.

-- ── 1. Redefine the reviews table. It already existed (order_id, reviewer_id,
--    reviewee_id, rating, comment, tags, anonymous, helpful) but keyed off
--    `orders`, a table that's never actually populated anywhere in the app
--    (the /orders and /review/[orderId] pages are 100% mock UI, no Supabase
--    writes). 0 rows exist, so this is a clean redefinition, not a data
--    migration. `anonymous` is kept — the seller profile page already reads
--    it to decide whether to show "Anonymous" vs the reviewer's name. ──
ALTER TABLE public.reviews DROP COLUMN IF EXISTS order_id;
ALTER TABLE public.reviews DROP COLUMN IF EXISTS tags;
ALTER TABLE public.reviews DROP COLUMN IF EXISTS helpful;

ALTER TABLE public.reviews ADD COLUMN IF NOT EXISTS listing_id UUID REFERENCES public.listings(id) ON DELETE SET NULL;

ALTER TABLE public.reviews ALTER COLUMN reviewer_id SET NOT NULL;
ALTER TABLE public.reviews ALTER COLUMN reviewee_id SET NOT NULL;
ALTER TABLE public.reviews ALTER COLUMN rating SET NOT NULL;

ALTER TABLE public.reviews DROP CONSTRAINT IF EXISTS reviews_rating_check;
ALTER TABLE public.reviews ADD CONSTRAINT reviews_rating_check CHECK (rating BETWEEN 1 AND 5);

-- Self-review prevention, enforced at the table level (not just RLS/UI).
ALTER TABLE public.reviews DROP CONSTRAINT IF EXISTS reviews_not_self_check;
ALTER TABLE public.reviews ADD CONSTRAINT reviews_not_self_check CHECK (reviewer_id <> reviewee_id);

-- "One buyer can't review the same transaction twice." A plain
-- UNIQUE(reviewer_id, listing_id) wouldn't actually stop repeat *general*
-- (no-listing) reviews of the same seller, since SQL treats every NULL as
-- distinct — so this is two partial unique indexes instead: one per listing,
-- one per (reviewer, reviewee) when there's no listing attached.
DROP INDEX IF EXISTS reviews_reviewer_listing_unique;
CREATE UNIQUE INDEX reviews_reviewer_listing_unique
  ON public.reviews (reviewer_id, listing_id) WHERE listing_id IS NOT NULL;

DROP INDEX IF EXISTS reviews_reviewer_reviewee_unique;
CREATE UNIQUE INDEX reviews_reviewer_reviewee_unique
  ON public.reviews (reviewer_id, reviewee_id) WHERE listing_id IS NULL;

-- ── 2. RLS: reviews are public read (like Amazon); insert requires a real
--    prior interaction. `orders` isn't a usable signal (never populated), so
--    this gates on a conversation actually existing between the two users —
--    the one real, enforceable proxy for "these two people interacted"
--    given what's actually wired up in this app today. ──
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Reviews are publicly readable" ON public.reviews;
CREATE POLICY "Reviews are publicly readable"
  ON public.reviews FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Users can leave reviews after a real interaction" ON public.reviews;
CREATE POLICY "Users can leave reviews after a real interaction"
  ON public.reviews FOR INSERT
  WITH CHECK (
    reviewer_id = auth.uid()
    AND EXISTS (
      SELECT 1 FROM public.conversations
      WHERE (buyer_id = reviewer_id AND seller_id = reviewee_id)
         OR (seller_id = reviewer_id AND buyer_id = reviewee_id)
    )
  );

DROP POLICY IF EXISTS "Users can update own reviews" ON public.reviews;
CREATE POLICY "Users can update own reviews"
  ON public.reviews FOR UPDATE
  USING (reviewer_id = auth.uid());

DROP POLICY IF EXISTS "Users can delete own reviews" ON public.reviews;
CREATE POLICY "Users can delete own reviews"
  ON public.reviews FOR DELETE
  USING (reviewer_id = auth.uid());

-- ── 3. Keep profiles.rating/review_count as a denormalized aggregate,
--    recomputed by trigger on every insert/update/delete. Chosen over a view
--    or compute-on-read because reads (every listing card, every seller
--    profile — the highest-traffic query in the app) get an O(1) column
--    lookup instead of re-aggregating reviews on every render; writes
--    (leaving a review) are rare and can afford the O(n) recompute. ──
CREATE OR REPLACE FUNCTION public.update_seller_rating()
RETURNS TRIGGER AS $$
DECLARE
  target_id UUID := COALESCE(NEW.reviewee_id, OLD.reviewee_id);
BEGIN
  UPDATE public.profiles SET
    rating = COALESCE((SELECT ROUND(AVG(rating)::numeric, 2) FROM public.reviews WHERE reviewee_id = target_id), 0),
    review_count = (SELECT COUNT(*) FROM public.reviews WHERE reviewee_id = target_id),
    updated_at = NOW()
  WHERE id = target_id;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS reviews_update_rating ON public.reviews;
CREATE TRIGGER reviews_update_rating
  AFTER INSERT OR UPDATE OR DELETE ON public.reviews
  FOR EACH ROW EXECUTE FUNCTION public.update_seller_rating();

-- ── 4. The 3 live profiles currently show fake seeded ratings (e.g.
--    4.8★/132 reviews) with zero real reviews behind them. Resetting to 0
--    per your call, so the aggregate is honest going forward. ──
UPDATE public.profiles SET rating = 0, review_count = 0;
