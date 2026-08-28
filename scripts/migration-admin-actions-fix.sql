-- Fix for a gap found during live verification of the admin dashboard.
-- Run this in the Supabase SQL Editor, then tell Claude it's done.

-- ── The pre-existing "Sellers can manage own listings" FOR ALL policy lets a
--    seller set their own listing's `status` directly — including moving it
--    OUT of 'pending' or 'rejected' into 'active' themselves, bypassing the
--    admin Listings tab's approve/reject workflow entirely (most concretely:
--    an admin explicitly rejects a listing, and the seller can just revert
--    it back to 'active' on their own). This blocks that specific
--    transition for non-admins while leaving normal seller self-service
--    (editing, pausing/resuming an already-approved listing, etc.) alone. ──
CREATE OR REPLACE FUNCTION public.prevent_seller_self_moderation()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.status IS DISTINCT FROM OLD.status
     AND OLD.status IN ('pending', 'rejected')
     AND NOT EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = true)
  THEN
    RAISE EXCEPTION 'Only an admin can approve or reject a listing.';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS listings_prevent_self_moderation ON public.listings;
CREATE TRIGGER listings_prevent_self_moderation
  BEFORE UPDATE ON public.listings
  FOR EACH ROW EXECUTE FUNCTION public.prevent_seller_self_moderation();
