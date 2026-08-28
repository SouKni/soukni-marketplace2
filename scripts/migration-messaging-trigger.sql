-- Messaging trigger migration
-- Run this in the Supabase SQL Editor, then tell Claude it's done.
--
-- conversations/messages tables and their RLS already exist and are
-- correctly scoped (verified live: a user can only see/insert into their
-- own conversations, cross-user impersonation is blocked). What's missing
-- is automatic bookkeeping on conversations whenever a message is inserted
-- — right now buyer_unread/seller_unread never increment at all, so a
-- recipient's unread badge would always read 0.

CREATE OR REPLACE FUNCTION public.handle_new_message()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE public.conversations
  SET
    last_message    = NEW.text,
    last_message_at = NEW.created_at,
    buyer_unread     = CASE WHEN seller_id = NEW.sender_id THEN buyer_unread + 1 ELSE buyer_unread END,
    seller_unread    = CASE WHEN buyer_id  = NEW.sender_id THEN seller_unread + 1 ELSE seller_unread END
  WHERE id = NEW.conversation_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_message_insert ON public.messages;
CREATE TRIGGER on_message_insert
  AFTER INSERT ON public.messages
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_message();

-- The app's messaging hook already subscribes via Supabase Realtime
-- (postgres_changes on `messages`), but the table was never added to the
-- realtime publication — verified live: the subscription connects
-- (status SUBSCRIBED) but never receives an actual INSERT event. This
-- turns it on for real, so new messages appear without a manual refresh.
ALTER PUBLICATION supabase_realtime ADD TABLE public.messages;
ALTER PUBLICATION supabase_realtime ADD TABLE public.conversations;
