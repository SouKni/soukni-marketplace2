-- Real notification generation — fixes the gap found in the Pre-Design
-- Backend Audit: the notifications table, its RLS, and its realtime read
-- path were all real and correct, but nothing anywhere ever *created* a
-- notification row (0 rows existed).
-- Run this in the Supabase SQL Editor, then tell Claude it's done.

-- ── 1. New message → notify the OTHER conversation participant. ──
-- href has no locale prefix — src/app/[locale]/notifications/page.tsx
-- already prepends `/${locale}` when it renders n.href, same convention
-- every other real notification-consuming spot in the app uses.
CREATE OR REPLACE FUNCTION public.notify_new_message()
RETURNS TRIGGER AS $$
DECLARE
  conv RECORD;
  recipient_id UUID;
BEGIN
  SELECT buyer_id, seller_id INTO conv FROM public.conversations WHERE id = NEW.conversation_id;
  IF conv IS NULL THEN
    RETURN NEW;
  END IF;

  recipient_id := CASE WHEN NEW.sender_id = conv.buyer_id THEN conv.seller_id ELSE conv.buyer_id END;

  INSERT INTO public.notifications (user_id, type, title, body, href, data)
  VALUES (
    recipient_id,
    'message',
    'New message',
    LEFT(NEW.text, 140),
    '/messages?c=' || NEW.conversation_id,
    jsonb_build_object('conversation_id', NEW.conversation_id, 'message_id', NEW.id)
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_message_notify ON public.messages;
CREATE TRIGGER on_message_notify
  AFTER INSERT ON public.messages
  FOR EACH ROW EXECUTE FUNCTION public.notify_new_message();

-- ── 2. Listing status changes that the seller didn't just make themselves:
--    admin approval, admin rejection, and expiry (inert until an actual
--    expiry mechanism sets status='expired' — this trigger will just be
--    ready and waiting for that separate fix). Self-initiated changes
--    (pause/reactivate/mark sold via /account/my-ads) intentionally don't
--    notify — the seller already knows, they just did it. ──
CREATE OR REPLACE FUNCTION public.notify_listing_status_change()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.status IS DISTINCT FROM OLD.status THEN
    IF NEW.status = 'active' AND OLD.status = 'pending' THEN
      INSERT INTO public.notifications (user_id, type, title, body, href, data)
      VALUES (NEW.seller_id, 'listing_approved', 'Your ad was approved',
              NEW.title || ' is now live on SouKni.', '/listing/' || NEW.id,
              jsonb_build_object('listing_id', NEW.id));
    ELSIF NEW.status = 'rejected' THEN
      INSERT INTO public.notifications (user_id, type, title, body, href, data)
      VALUES (NEW.seller_id, 'listing_rejected', 'Your ad was rejected',
              NEW.title || ' was not approved. Check My Ads for details.', '/account/my-ads',
              jsonb_build_object('listing_id', NEW.id));
    ELSIF NEW.status = 'expired' AND OLD.status IS DISTINCT FROM 'expired' THEN
      INSERT INTO public.notifications (user_id, type, title, body, href, data)
      VALUES (NEW.seller_id, 'listing_expired', 'Your ad has expired',
              NEW.title || ' is no longer visible to buyers. Renew it to relist.', '/account/my-ads',
              jsonb_build_object('listing_id', NEW.id));
    END IF;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_listing_status_notify ON public.listings;
CREATE TRIGGER on_listing_status_notify
  AFTER UPDATE ON public.listings
  FOR EACH ROW EXECUTE FUNCTION public.notify_listing_status_change();
