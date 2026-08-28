-- Stripe billing migration — Boost + Diamond subscription support.
-- Run this in the Supabase SQL Editor, then tell Claude it's done.

-- ── 1. profiles needs a place to remember the Stripe customer/subscription
--    so renewals, cancellations, and "already has a customer" lookups work
--    without re-creating a Stripe customer on every checkout. ──
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS stripe_customer_id TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS stripe_subscription_id TEXT;
CREATE INDEX IF NOT EXISTS profiles_stripe_customer_id_idx ON public.profiles(stripe_customer_id);

-- ── 2. SECURITY: boosts has RLS disabled entirely (same class of bug found
--    earlier on diamond_applications) — verified live: an anonymous client
--    can currently insert arbitrary boost rows (only blocked by the
--    listing_id foreign key, not by any policy). Since boost purchases are
--    only ever written by the Stripe webhook (service role, bypasses RLS),
--    there is no legitimate client-side INSERT/UPDATE path — only a
--    read-your-own policy is needed. ──
ALTER TABLE public.boosts ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own boosts" ON public.boosts;
CREATE POLICY "Users can view own boosts"
  ON public.boosts FOR SELECT
  USING (user_id = auth.uid());

DROP POLICY IF EXISTS "Admins can view all boosts" ON public.boosts;
CREATE POLICY "Admins can view all boosts"
  ON public.boosts FOR SELECT
  USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = true));
