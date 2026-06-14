# SOUKNI MARKETPLACE - GRAND BLUEPRINT MEMO

## 🎯 Scale Targets
- **Traffic:** 500K Visitors
- **Localization:** 5 Languages (i18n)
- **Currency:** 4 Dynamic Currencies
- **Data Volume:** 100K+ Active Ads
- **Infrastructure:** Hostinger Cloud Server VPS (KVM4 / KVM8)

---

## 🏗️ The System Architecture
1. **Frontend UI Layer (Next.js):** Lightweight, runs layout, translation rendering, and SEO optimizations.
2. **Search Indexing Layer (Meilisearch / Elasticsearch):** Offloads search filters from the primary database to deliver sub-30ms search results.
3. **Primary Core Database (PostgreSQL + PostGIS):** Relational storage engine with spatial mapping index extensions (`GiST` & `B-Tree`).
4. **Data Cache Layer (Redis):** Caches live currency conversion rates and active session tokens.

---

## 🗺️ Step-by-Step Implementation Map

### Phase 1: Localization & App Shell Setup
- [ ] Configure Next.js `[locale]` internationalization router for 5 distinct languages.
- [ ] Set up client-side currency filter context utility.
- [ ] Connect Google Stitch layout design files to Next.js page shells.

### Phase 2: Core Data Architecture
- [ ] Initialize PostgreSQL with PostGIS extension enabled.
- [ ] Create categories tree and listings schema tables.
- [ ] Build structural optimization indexes for high-speed table reads.

### Phase 3: High-Speed Search Indexing
- [ ] Connect a search optimization service instance locally.
- [ ] Write the asynchronous sync pipeline script (PostgreSQL -> Search Index).
- [ ] Set up the instant search UI results page with viewport lazy-loading.

### Phase 4: Media & Map Interfaces
- [ ] Integrate Mapbox GL JS engine with administrative polygon boundaries.
- [ ] Connect media upload state engine to a fast object storage bucket.
- [ ] Construct the dynamic seller ad placement routing steps.
