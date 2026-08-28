-- Fix for a live security gap found during admin dashboard verification.
-- Run this in the Supabase SQL Editor, then tell Claude it's done.
--
-- diamond_applications currently has RLS *disabled* (relrowsecurity = false)
-- — despite migration-reports-system.sql including an ENABLE ROW LEVEL
-- SECURITY statement for this exact table, and despite 2 of its 4 intended
-- policies (the admin ones) actually existing. With RLS off, every policy
-- on the table is a no-op: any authenticated user currently has full
-- read/write access to every applicant's row, including CIN photos and
-- selfies, and can approve/reject anyone's application. Verified live: a
-- stranger with no relationship to an application successfully approved it.
--
-- This re-enables RLS and re-asserts all 4 intended policies from scratch
-- (idempotent — safe regardless of exactly which of them currently exist).

ALTER TABLE public.diamond_applications ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own diamond applications" ON public.diamond_applications;
CREATE POLICY "Users can view own diamond applications"
  ON public.diamond_applications FOR SELECT
  USING (user_id = auth.uid());

DROP POLICY IF EXISTS "Users can create own diamond applications" ON public.diamond_applications;
CREATE POLICY "Users can create own diamond applications"
  ON public.diamond_applications FOR INSERT
  WITH CHECK (user_id = auth.uid());

DROP POLICY IF EXISTS "Admins can view all diamond applications" ON public.diamond_applications;
CREATE POLICY "Admins can view all diamond applications"
  ON public.diamond_applications FOR SELECT
  USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = true));

DROP POLICY IF EXISTS "Admins can update diamond applications" ON public.diamond_applications;
CREATE POLICY "Admins can update diamond applications"
  ON public.diamond_applications FOR UPDATE
  USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = true));

-- Sanity check: relrowsecurity should read `true` after this runs.
-- SELECT relname, relrowsecurity FROM pg_class WHERE relname = 'diamond_applications';
