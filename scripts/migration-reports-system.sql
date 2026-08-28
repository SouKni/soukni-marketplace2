-- Reports system + admin dashboard migration
-- Run this in the Supabase SQL Editor, then tell Claude it's done.
-- This SUPERSEDES scripts/migration-admin-dashboard.sql — run only this one
-- (it includes everything that file had, plus the reports-table redesign).

-- ── 1. CRITICAL: lock down diamond_applications (currently has NO RLS at all —
--    anyone with the public anon key can read every applicant's ID photos) ──
ALTER TABLE public.diamond_applications ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own diamond applications" ON public.diamond_applications;
CREATE POLICY "Users can view own diamond applications"
  ON public.diamond_applications FOR SELECT
  USING (user_id = auth.uid());

DROP POLICY IF EXISTS "Users can create own diamond applications" ON public.diamond_applications;
CREATE POLICY "Users can create own diamond applications"
  ON public.diamond_applications FOR INSERT
  WITH CHECK (user_id = auth.uid());

-- ── 2. New profiles columns for admin gating + suspension ──
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS is_admin BOOLEAN DEFAULT false;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS suspended BOOLEAN DEFAULT false;

-- ── 3. Redesign the reports table to support reporting listings, users, AND
--    messages (it currently only supports listings, via a listing_id column,
--    and has no reviewed_at/reviewed_by trail). Table is empty (0 rows) so
--    this is a clean redefinition, not a data migration. ──
ALTER TABLE public.reports DROP COLUMN IF EXISTS listing_id;
ALTER TABLE public.reports DROP COLUMN IF EXISTS category;
ALTER TABLE public.reports DROP COLUMN IF EXISTS sub_reason;
ALTER TABLE public.reports DROP COLUMN IF EXISTS evidence;
ALTER TABLE public.reports DROP COLUMN IF EXISTS priority;
ALTER TABLE public.reports DROP COLUMN IF EXISTS urgent;

ALTER TABLE public.reports RENAME COLUMN description TO details;

ALTER TABLE public.reports ADD COLUMN IF NOT EXISTS target_type TEXT
  CHECK (target_type IN ('listing', 'user', 'message'));
ALTER TABLE public.reports ADD COLUMN IF NOT EXISTS target_id UUID;
ALTER TABLE public.reports ADD COLUMN IF NOT EXISTS reason TEXT
  CHECK (reason IN ('scam', 'inappropriate', 'spam', 'fake', 'other'));
ALTER TABLE public.reports ADD COLUMN IF NOT EXISTS reviewed_at TIMESTAMPTZ;
ALTER TABLE public.reports ADD COLUMN IF NOT EXISTS reviewed_by UUID REFERENCES public.profiles(id);

ALTER TABLE public.reports ALTER COLUMN status SET DEFAULT 'pending';
ALTER TABLE public.reports DROP CONSTRAINT IF EXISTS reports_status_check;
ALTER TABLE public.reports ADD CONSTRAINT reports_status_check
  CHECK (status IN ('pending', 'reviewed', 'actioned', 'dismissed'));

ALTER TABLE public.reports ALTER COLUMN target_type SET NOT NULL;
ALTER TABLE public.reports ALTER COLUMN target_id SET NOT NULL;
ALTER TABLE public.reports ALTER COLUMN reason SET NOT NULL;

-- ── 4. Spam prevention: a Postgres trigger (not a static unique index, since
--    "within a short window" needs a time comparison) that rejects a new
--    report if the same user already reported the same target in the last
--    24h, or has filed more than 5 reports total in the last 10 minutes. ──
CREATE OR REPLACE FUNCTION public.check_report_rate_limit()
RETURNS TRIGGER AS $$
DECLARE
  recent_duplicate_count INT;
  recent_total_count INT;
BEGIN
  SELECT COUNT(*) INTO recent_duplicate_count
  FROM public.reports
  WHERE reporter_id = NEW.reporter_id
    AND target_type = NEW.target_type
    AND target_id = NEW.target_id
    AND created_at > now() - INTERVAL '24 hours';

  IF recent_duplicate_count > 0 THEN
    RAISE EXCEPTION 'You already reported this within the last 24 hours.';
  END IF;

  SELECT COUNT(*) INTO recent_total_count
  FROM public.reports
  WHERE reporter_id = NEW.reporter_id
    AND created_at > now() - INTERVAL '10 minutes';

  IF recent_total_count >= 5 THEN
    RAISE EXCEPTION 'Too many reports submitted recently. Please try again later.';
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS report_rate_limit ON public.reports;
CREATE TRIGGER report_rate_limit
  BEFORE INSERT ON public.reports
  FOR EACH ROW EXECUTE FUNCTION public.check_report_rate_limit();

-- ── 5. RLS on reports: users insert/view their own; admins see + update all ──
ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can create own reports" ON public.reports;
CREATE POLICY "Users can create own reports"
  ON public.reports FOR INSERT
  WITH CHECK (reporter_id = auth.uid());

DROP POLICY IF EXISTS "Users can view own reports" ON public.reports;
CREATE POLICY "Users can view own reports"
  ON public.reports FOR SELECT
  USING (reporter_id = auth.uid());

DROP POLICY IF EXISTS "Admins can view all reports" ON public.reports;
CREATE POLICY "Admins can view all reports"
  ON public.reports FOR SELECT
  USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = true));

DROP POLICY IF EXISTS "Admins can update reports" ON public.reports;
CREATE POLICY "Admins can update reports"
  ON public.reports FOR UPDATE
  USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = true));

-- ── 6. Admin-bypass policies elsewhere, so an admin can actually view/action
--    whatever gets reported (listings, profiles, and — for message reports —
--    conversations/messages they aren't a participant in) ──
DROP POLICY IF EXISTS "Admins can view all diamond applications" ON public.diamond_applications;
CREATE POLICY "Admins can view all diamond applications"
  ON public.diamond_applications FOR SELECT
  USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = true));

DROP POLICY IF EXISTS "Admins can update diamond applications" ON public.diamond_applications;
CREATE POLICY "Admins can update diamond applications"
  ON public.diamond_applications FOR UPDATE
  USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = true));

DROP POLICY IF EXISTS "Admins can view all listings" ON public.listings;
CREATE POLICY "Admins can view all listings"
  ON public.listings FOR SELECT
  USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = true));

DROP POLICY IF EXISTS "Admins can update any listing" ON public.listings;
CREATE POLICY "Admins can update any listing"
  ON public.listings FOR UPDATE
  USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = true));

DROP POLICY IF EXISTS "Admins can update any profile" ON public.profiles;
CREATE POLICY "Admins can update any profile"
  ON public.profiles FOR UPDATE
  USING (EXISTS (SELECT 1 FROM public.profiles p2 WHERE p2.id = auth.uid() AND p2.is_admin = true));

DROP POLICY IF EXISTS "Admins can view all conversations" ON public.conversations;
CREATE POLICY "Admins can view all conversations"
  ON public.conversations FOR SELECT
  USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = true));

DROP POLICY IF EXISTS "Admins can view all messages" ON public.messages;
CREATE POLICY "Admins can view all messages"
  ON public.messages FOR SELECT
  USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = true));

-- ── 7. Make yourself an admin — replace the email before running ──
-- UPDATE public.profiles SET is_admin = true WHERE id = (SELECT id FROM auth.users WHERE email = 'YOUR_EMAIL_HERE');
