-- Fix for two gaps found during live verification of migration-reviews-system.sql
-- Run this in the Supabase SQL Editor, then tell Claude it's done.

-- ── 1. SECURITY FIX: the reviews table had a pre-existing INSERT policy
--    named "Reviewers can create" (WITH CHECK reviewer_id = auth.uid(),
--    with no interaction requirement) that predates the reviews-system
--    migration and has a different name than anything that migration
--    dropped. Left in place, Postgres OR's it together with the new
--    "must have a real conversation" policy — so the old, more permissive
--    policy silently won, and ANY authenticated user could review ANY
--    other user with zero real interaction. Verified live: a stranger
--    with no conversation successfully posted a review before this fix. ──
DROP POLICY IF EXISTS "Reviewers can create" ON public.reviews;
DROP POLICY IF EXISTS "Reviews are public" ON public.reviews; -- old duplicate of the new public-read policy, harmless but redundant

-- ── 2. BUG FIX: the original two-partial-index scheme (one unique index
--    scoped to listing_id IS NOT NULL, one scoped to listing_id IS NULL)
--    left a gap — the same reviewer could get exactly one listing-tied
--    review AND one general (no-listing) review through for the same
--    reviewee, i.e. 2 reviews instead of 1. Verified live: this actually
--    happened in testing. A review is fundamentally about the seller
--    (reviewee_id), not the listing, so this replaces both partial
--    indexes with a single plain unique index covering every row. ──
DROP INDEX IF EXISTS reviews_reviewer_listing_unique;
DROP INDEX IF EXISTS reviews_reviewer_reviewee_unique;
CREATE UNIQUE INDEX reviews_reviewer_reviewee_unique
  ON public.reviews (reviewer_id, reviewee_id);
