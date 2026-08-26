-- ═══════════════════════════════════════════════════════════════
-- SouKni Database Schema
-- Run this in your Supabase SQL editor
-- ═══════════════════════════════════════════════════════════════

-- Enable extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm"; -- for fuzzy search

-- ── Users (extends Supabase auth.users) ────────────────────────
CREATE TABLE public.profiles (
  id              UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  username        TEXT UNIQUE,
  full_name       TEXT,
  avatar_url      TEXT,
  bio             TEXT,
  phone           TEXT,
  whatsapp        BOOLEAN DEFAULT false,
  city            TEXT,
  neighborhood    TEXT,
  badge           TEXT CHECK (badge IN ('certified', 'diamond', 'pro', null)),
  badge_expires_at TIMESTAMPTZ,
  verified_at     TIMESTAMPTZ,
  response_rate   INTEGER DEFAULT 0,
  response_time   TEXT DEFAULT '< 1 hour',
  total_sales     INTEGER DEFAULT 0,
  rating          DECIMAL(3,2) DEFAULT 0,
  review_count    INTEGER DEFAULT 0,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ── Categories ─────────────────────────────────────────────────
CREATE TABLE public.categories (
  id          UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  slug        TEXT UNIQUE NOT NULL,
  label       TEXT NOT NULL,
  label_fr    TEXT,
  label_ar    TEXT,
  emoji       TEXT,
  parent_id   UUID REFERENCES public.categories(id),
  sort_order  INTEGER DEFAULT 0,
  active      BOOLEAN DEFAULT true
);

-- ── Listings ───────────────────────────────────────────────────
CREATE TABLE public.listings (
  id              UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  seller_id       UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  title           TEXT NOT NULL,
  title_fr        TEXT,
  title_ar        TEXT,
  description     TEXT,
  description_fr  TEXT,
  description_ar  TEXT,
  category_id     UUID REFERENCES public.categories(id),
  category_slug   TEXT,
  subcategory     TEXT,
  price           BIGINT, -- in centimes to avoid float issues
  currency        TEXT DEFAULT 'MAD',
  negotiable      BOOLEAN DEFAULT false,
  hide_price      BOOLEAN DEFAULT false,
  free_item       BOOLEAN DEFAULT false,
  condition       TEXT CHECK (condition IN ('new','like_new','good','fair','for_parts')),
  city            TEXT,
  neighborhood    TEXT,
  latitude        DECIMAL(10,7),
  longitude       DECIMAL(10,7),
  images          TEXT[] DEFAULT '{}',
  video_url       TEXT,
  status          TEXT DEFAULT 'active' CHECK (status IN ('active','paused','sold','expired','pending','rejected')),
  badge           TEXT,
  boosted         BOOLEAN DEFAULT false,
  boosted_until   TIMESTAMPTZ,
  boost_tier      TEXT,
  is_auction      BOOLEAN DEFAULT false,
  auction_ends_at TIMESTAMPTZ,
  auction_start_price BIGINT,
  auction_reserve_price BIGINT,
  views           INTEGER DEFAULT 0,
  favorites_count INTEGER DEFAULT 0,
  messages_count  INTEGER DEFAULT 0,
  search_vector   TSVECTOR,
  expires_at      TIMESTAMPTZ DEFAULT (NOW() + INTERVAL '60 days'),
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

-- Search index
CREATE INDEX listings_search_idx ON public.listings USING GIN(search_vector);
CREATE INDEX listings_city_idx ON public.listings(city);
CREATE INDEX listings_category_idx ON public.listings(category_slug);
CREATE INDEX listings_status_idx ON public.listings(status);
CREATE INDEX listings_seller_idx ON public.listings(seller_id);
CREATE INDEX listings_boosted_idx ON public.listings(boosted, boosted_until);
CREATE INDEX listings_created_idx ON public.listings(created_at DESC);

-- Auto-update search vector
CREATE OR REPLACE FUNCTION update_listing_search_vector()
RETURNS TRIGGER AS $$
BEGIN
  NEW.search_vector :=
    setweight(to_tsvector('french', COALESCE(NEW.title, '')), 'A') ||
    setweight(to_tsvector('french', COALESCE(NEW.description, '')), 'B') ||
    setweight(to_tsvector('french', COALESCE(NEW.city, '')), 'C') ||
    setweight(to_tsvector('french', COALESCE(NEW.subcategory, '')), 'C');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER listings_search_update
  BEFORE INSERT OR UPDATE ON public.listings
  FOR EACH ROW EXECUTE FUNCTION update_listing_search_vector();

-- ── Price History ──────────────────────────────────────────────
CREATE TABLE public.price_history (
  id          UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  listing_id  UUID REFERENCES public.listings(id) ON DELETE CASCADE,
  price       BIGINT NOT NULL,
  currency    TEXT DEFAULT 'MAD',
  changed_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ── Favorites ──────────────────────────────────────────────────
CREATE TABLE public.favorites (
  id          UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id     UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  listing_id  UUID REFERENCES public.listings(id) ON DELETE CASCADE,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, listing_id)
);

-- ── Saved Searches ─────────────────────────────────────────────
CREATE TABLE public.saved_searches (
  id          UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id     UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  query       TEXT,
  category    TEXT,
  city        TEXT,
  min_price   BIGINT,
  max_price   BIGINT,
  condition   TEXT,
  frequency   TEXT DEFAULT 'daily' CHECK (frequency IN ('instant','daily','weekly')),
  active      BOOLEAN DEFAULT true,
  last_run_at TIMESTAMPTZ,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ── Conversations & Messages ───────────────────────────────────
CREATE TABLE public.conversations (
  id              UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  listing_id      UUID REFERENCES public.listings(id) ON DELETE SET NULL,
  buyer_id        UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  seller_id       UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  last_message    TEXT,
  last_message_at TIMESTAMPTZ DEFAULT NOW(),
  buyer_unread    INTEGER DEFAULT 0,
  seller_unread   INTEGER DEFAULT 0,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(listing_id, buyer_id, seller_id)
);

CREATE TABLE public.messages (
  id              UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  conversation_id UUID REFERENCES public.conversations(id) ON DELETE CASCADE,
  sender_id       UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  text            TEXT NOT NULL,
  image_url       TEXT,
  read            BOOLEAN DEFAULT false,
  read_at         TIMESTAMPTZ,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX messages_conversation_idx ON public.messages(conversation_id, created_at DESC);

-- ── Orders / Transactions ──────────────────────────────────────
CREATE TABLE public.orders (
  id              UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  listing_id      UUID REFERENCES public.listings(id) ON DELETE SET NULL,
  buyer_id        UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  seller_id       UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  offer_price     BIGINT,
  agreed_price    BIGINT,
  currency        TEXT DEFAULT 'MAD',
  status          TEXT DEFAULT 'offer_made' CHECK (status IN (
    'offer_made','offer_accepted','meeting_set','item_inspected',
    'completed','offer_declined','cancelled','no_show','disputed'
  )),
  meeting_location TEXT,
  meeting_time    TIMESTAMPTZ,
  escrow_id       TEXT,
  escrow_status   TEXT,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ── Reviews ───────────────────────────────────────────────────
CREATE TABLE public.reviews (
  id          UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  order_id    UUID REFERENCES public.orders(id) ON DELETE CASCADE,
  reviewer_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  reviewee_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  rating      INTEGER CHECK (rating BETWEEN 1 AND 5),
  comment     TEXT,
  tags        TEXT[],
  anonymous   BOOLEAN DEFAULT false,
  helpful     INTEGER DEFAULT 0,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Auto-update seller rating when review added
CREATE OR REPLACE FUNCTION update_seller_rating()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE public.profiles SET
    rating = (SELECT AVG(rating) FROM public.reviews WHERE reviewee_id = NEW.reviewee_id),
    review_count = (SELECT COUNT(*) FROM public.reviews WHERE reviewee_id = NEW.reviewee_id),
    updated_at = NOW()
  WHERE id = NEW.reviewee_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER reviews_update_rating
  AFTER INSERT ON public.reviews
  FOR EACH ROW EXECUTE FUNCTION update_seller_rating();

-- ── Reports ───────────────────────────────────────────────────
CREATE TABLE public.reports (
  id          UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  listing_id  UUID REFERENCES public.listings(id) ON DELETE CASCADE,
  reporter_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  category    TEXT NOT NULL,
  sub_reason  TEXT,
  description TEXT,
  evidence    TEXT[],
  status      TEXT DEFAULT 'open' CHECK (status IN ('open','reviewing','resolved','dismissed')),
  priority    TEXT DEFAULT 'medium' CHECK (priority IN ('low','medium','high')),
  urgent      BOOLEAN DEFAULT false,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ── Notifications ──────────────────────────────────────────────
CREATE TABLE public.notifications (
  id          UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id     UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  type        TEXT NOT NULL,
  title       TEXT NOT NULL,
  body        TEXT,
  href        TEXT,
  read        BOOLEAN DEFAULT false,
  data        JSONB DEFAULT '{}',
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX notifications_user_idx ON public.notifications(user_id, created_at DESC);

-- ── Diamond Applications ───────────────────────────────────────
CREATE TABLE public.diamond_applications (
  id              UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id         UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  plan            TEXT CHECK (plan IN ('diamond','pro')),
  status          TEXT DEFAULT 'pending' CHECK (status IN ('pending','approved','rejected')),
  cin_front_url   TEXT,
  cin_back_url    TEXT,
  selfie_url      TEXT,
  rc_number       TEXT,
  if_number       TEXT,
  business_doc_url TEXT,
  stripe_sub_id   TEXT,
  notes           TEXT,
  reviewed_at     TIMESTAMPTZ,
  reviewed_by     UUID,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ── Boost Purchases ────────────────────────────────────────────
CREATE TABLE public.boosts (
  id              UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  listing_id      UUID REFERENCES public.listings(id) ON DELETE CASCADE,
  user_id         UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  plan            TEXT NOT NULL,
  add_ons         TEXT[] DEFAULT '{}',
  amount_paid     BIGINT,
  currency        TEXT DEFAULT 'MAD',
  stripe_payment_id TEXT,
  starts_at       TIMESTAMPTZ DEFAULT NOW(),
  ends_at         TIMESTAMPTZ,
  active          BOOLEAN DEFAULT true,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ── Row Level Security ─────────────────────────────────────────
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saved_searches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;

-- Profiles: public read, owner write
CREATE POLICY "Public profiles are viewable" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Listings: public read, owner write
CREATE POLICY "Active listings are viewable" ON public.listings FOR SELECT USING (status = 'active' OR seller_id = auth.uid());
CREATE POLICY "Sellers can manage own listings" ON public.listings FOR ALL USING (seller_id = auth.uid());

-- Favorites: owner only
CREATE POLICY "Users manage own favorites" ON public.favorites FOR ALL USING (user_id = auth.uid());

-- Saved searches: owner only
CREATE POLICY "Users manage own saved searches" ON public.saved_searches FOR ALL USING (user_id = auth.uid());

-- Conversations: participants only
CREATE POLICY "Conversation participants only" ON public.conversations FOR ALL USING (buyer_id = auth.uid() OR seller_id = auth.uid());

-- Messages: conversation participants
CREATE POLICY "Message participants only" ON public.messages FOR ALL USING (
  EXISTS (SELECT 1 FROM public.conversations c WHERE c.id = conversation_id AND (c.buyer_id = auth.uid() OR c.seller_id = auth.uid()))
);

-- Orders: participants only
CREATE POLICY "Order participants only" ON public.orders FOR ALL USING (buyer_id = auth.uid() OR seller_id = auth.uid());

-- Reviews: public read, reviewer write
CREATE POLICY "Reviews are public" ON public.reviews FOR SELECT USING (true);
CREATE POLICY "Reviewers can create" ON public.reviews FOR INSERT WITH CHECK (reviewer_id = auth.uid());

-- Notifications: owner only
CREATE POLICY "Users see own notifications" ON public.notifications FOR ALL USING (user_id = auth.uid());

-- Reports: reporter can create, no read
CREATE POLICY "Anyone can report" ON public.reports FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- ═══════════════════════════════════════════════════════════════
-- RPC: increment_listing_views
-- Called by src/hooks/useListings.ts on every listing detail view.
-- SECURITY DEFINER because any visitor (not just the seller) needs
-- to bump the counter, which the "Sellers can manage own listings"
-- RLS policy would otherwise block.
-- ═══════════════════════════════════════════════════════════════
CREATE OR REPLACE FUNCTION public.increment_listing_views(listing_id UUID)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE public.listings SET views = views + 1 WHERE id = listing_id;
END;
$$;

GRANT EXECUTE ON FUNCTION public.increment_listing_views(UUID) TO anon, authenticated;

-- ═══════════════════════════════════════════════════════════════
-- Seed data: top-level categories
-- One row per top-level "goods" route folder under src/app/[locale]/
-- so `.eq('category_slug', ...)` queries return real rows once a
-- page is wired to Supabase. Slugs match the route folder name,
-- following the precedent already set by the two pages already
-- wired to Supabase (electronics/page.tsx uses category_slug
-- 'electronics', motors/cars/[category]/page.tsx uses 'motors').
--
-- Deliberately excludes jobs/services/community/wellness-spa —
-- those are gig/service postings, not physical goods, and the
-- `listings` table's condition/free_item/is_auction columns don't
-- fit them; whether they belong in this table or a separate one is
-- an open product decision, not a seed-data problem.
--
-- Several slugs below overlap in real-world meaning (electronics /
-- mobiles-electronics / home-appliances, property / real-estate /
-- commercial-properties / land-for-sale / vacation-properties,
-- motors / car-rental / motorcycles-scooters / trucks-vans, vault /
-- vault-other / collectibles / collectibles-treasures) because each
-- is a distinct existing route today. Seeded as-is rather than
-- silently merged — deduping the IA is a product call, not this
-- migration's job.
-- ═══════════════════════════════════════════════════════════════
INSERT INTO public.categories (slug, label, emoji, sort_order) VALUES
  ('electronics',            'Electronics',            '📱', 10),
  ('mobiles-electronics',    'Mobiles & Electronics',  '📱', 11),
  ('home-appliances',        'Home Appliances',        '🔌', 12),
  ('fashion',                'Fashion',                 '👗', 20),
  ('jewelry-watches',        'Jewelry & Watches',      '💍', 21),
  ('motors',                 'Motors',                  '🚗', 30),
  ('car-rental',             'Car Rental',              '🚗', 31),
  ('motorcycles-scooters',   'Motorcycles & Scooters', '🏍️', 32),
  ('trucks-vans',            'Trucks & Vans',           '🚚', 33),
  ('property',               'Property',                '🏠', 40),
  ('real-estate',            'Real Estate',             '🏠', 41),
  ('commercial-properties',  'Commercial Properties',  '🏢', 42),
  ('land-for-sale',          'Land for Sale',           '🗺️', 43),
  ('vacation-properties',    'Vacation Properties',    '🏖️', 44),
  ('home-garden',            'Home & Garden',           '🛋️', 50),
  ('home-living',            'Home & Living',           '🛋️', 51),
  ('vault',                  'The Vault',               '💎', 60),
  ('vault-other',            'Vault — Other',           '💎', 61),
  ('collectibles',           'Collectibles',            '🏺', 62),
  ('collectibles-treasures', 'Collectibles & Treasures','🏺', 63),
  ('gaming',                 'Gaming',                  '🎮', 70),
  ('musical-instruments',    'Musical Instruments',    '🎸', 71),
  ('toys',                   'Toys',                    '🧸', 72),
  ('baby-items',             'Baby & Kids Items',      '🍼', 73),
  ('pets-accessories',       'Pets & Accessories',     '🐾', 74),
  ('sports-equipment',       'Sports Equipment',       '⚽', 75),
  ('tickets-vouchers',       'Tickets & Vouchers',     '🎟️', 76)
ON CONFLICT (slug) DO NOTHING;

-- ═══════════════════════════════════════════════════════════════
-- listings.listing_type — distinguishes for-sale vs for-rent
-- property listings. Only meaningful for category_slug='property';
-- NULL for every other vertical (goods are implicitly "for sale").
-- Needed by src/app/[locale]/property/for-rent/page.tsx and
-- .../for-sale/page.tsx, which previously showed the same
-- undifferentiated pool of listings on both pages.
-- ═══════════════════════════════════════════════════════════════
ALTER TABLE public.listings
  ADD COLUMN IF NOT EXISTS listing_type TEXT CHECK (listing_type IN ('sale', 'rent'));

CREATE INDEX IF NOT EXISTS listings_listing_type_idx ON public.listings(listing_type);

-- ═══════════════════════════════════════════════════════════════
-- listings.bedrooms / bathrooms / area — property-specific fields
-- already read (defensively, as `row.field || undefined`) by
-- property/for-rent/page.tsx and property/for-sale/page.tsx.
-- NULL for every non-property vertical; area is in square metres.
-- ═══════════════════════════════════════════════════════════════
ALTER TABLE public.listings
  ADD COLUMN IF NOT EXISTS bedrooms  INTEGER,
  ADD COLUMN IF NOT EXISTS bathrooms INTEGER,
  ADD COLUMN IF NOT EXISTS area      DECIMAL(8,2);
