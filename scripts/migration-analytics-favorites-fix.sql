-- Fix for a gap found while building real seller analytics.
-- Run this in the Supabase SQL Editor, then tell Claude it's done.
--
-- favorites' existing RLS only lets a user see their own favorites list
-- (user_id = auth.uid()) — there was no way for a listing's seller to see
-- who favorited *their own* listing, so the analytics page's real "Saves"
-- count came back as 0 even with a real favorite in the table. Verified
-- live: a seller reading favorites on their own listing got an empty
-- result. This adds a read-only policy letting a seller see favorite rows
-- on listings they own (needed to count saves — same category of
-- visibility a seller already has into who messaged them).

DROP POLICY IF EXISTS "Sellers can view favorites on own listings" ON public.favorites;
CREATE POLICY "Sellers can view favorites on own listings"
  ON public.favorites FOR SELECT
  USING (EXISTS (SELECT 1 FROM public.listings WHERE listings.id = favorites.listing_id AND listings.seller_id = auth.uid()));
