-- Fix for a live security gap found during the Pre-Design Backend Audit.
-- Run this in the Supabase SQL Editor, then tell Claude it's done.
--
-- categories has RLS disabled entirely — same bug class as boosts and
-- diamond_applications earlier in this project. Verified live: an
-- anonymous client can currently INSERT arbitrary rows into the category
-- taxonomy with no error at all.

ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Categories are publicly viewable" ON public.categories;
CREATE POLICY "Categories are publicly viewable"
  ON public.categories FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Admins can manage categories" ON public.categories;
CREATE POLICY "Admins can manage categories"
  ON public.categories FOR ALL
  USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = true));

-- Sanity check: relrowsecurity should read `true` after this runs.
-- SELECT relname, relrowsecurity FROM pg_class WHERE relname = 'categories';
