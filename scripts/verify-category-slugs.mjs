// Regression test: inserts one real listing per canonical category_slug
// (using the exact fields post-ad's picker produces), then runs the exact
// query src/hooks/useListings.ts's fetchListings() builds for that category
// (via the anon key, same privilege real browse pages use) and confirms the
// listing comes back. Cleans up every test row it creates.
//
// Requires SUPABASE_SERVICE_ROLE_KEY (to insert as an arbitrary seller) and
// NEXT_PUBLIC_SUPABASE_ANON_KEY (to query the same way the app does).
// Run from the repo root: node scripts/verify-category-slugs.mjs

import { createClient } from '@supabase/supabase-js'
import fs from 'fs'

function loadEnv(path) {
  if (!fs.existsSync(path)) return {}
  const out = {}
  for (const line of fs.readFileSync(path, 'utf8').split('\n')) {
    const m = line.match(/^([A-Z_][A-Z0-9_]*)=(.*)$/)
    if (m) out[m[1]] = m[2].replace(/^["']|["']$/g, '')
  }
  return out
}

const env = { ...loadEnv('.env'), ...loadEnv('.env.local') }
const admin = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
})
const anon = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

// Must match src/app/[locale]/post-ad/page.tsx's CATEGORIES exactly.
const CANONICAL_CATEGORIES = [
  'motors', 'property', 'electronics', 'fashion', 'home-garden', 'home-appliances',
  'jewelry-watches', 'musical-instruments', 'gaming', 'toys', 'tickets-vouchers',
  'collectibles-treasures', 'vault-other', 'baby-items', 'pets-accessories', 'sports-equipment',
]

// Any seller works for RLS SELECT (policy allows status='active' for everyone);
// reuse whatever seller exists, or fall back to a throwaway id — insert only
// needs to succeed under the service role key, which bypasses RLS entirely.
const { data: anySeller } = await admin.from('profiles').select('id').limit(1).single()
const SELLER_ID = anySeller?.id
if (!SELLER_ID) {
  console.error('No profiles row found to use as seller_id — aborting.')
  process.exit(1)
}

const stamp = Date.now()
const inserted = []
let failures = 0

console.log(`Testing ${CANONICAL_CATEGORIES.length} categories...\n`)

for (const slug of CANONICAL_CATEGORIES) {
  const title = `CATEGORY VERIFY ${stamp} — ${slug}`

  const { data: row, error: insertErr } = await admin
    .from('listings')
    .insert({
      seller_id: SELLER_ID,
      title,
      description: 'Automated category_slug regression test row. Safe to delete.',
      category_slug: slug,
      subcategory: 'Test',
      condition: 'good',
      city: 'Rabat',
      price: 100000,
      currency: 'MAD',
      status: 'active',
    })
    .select()
    .single()

  if (insertErr) {
    console.log(`❌ ${slug.padEnd(24)} INSERT FAILED: ${insertErr.message}`)
    failures++
    continue
  }
  inserted.push(row.id)

  // Exact query shape from src/hooks/useListings.ts fetchListings()
  const { data: rows, error: queryErr } = await anon
    .from('listings')
    .select('*, profiles(full_name, avatar_url, badge, rating, review_count)')
    .eq('status', 'active')
    .eq('category_slug', slug)
    .order('boosted', { ascending: false })
    .order('created_at', { ascending: false })
    .range(0, 19)

  if (queryErr) {
    console.log(`❌ ${slug.padEnd(24)} QUERY FAILED: ${queryErr.message}`)
    failures++
    continue
  }

  const found = rows.some(r => r.id === row.id)
  console.log(`${found ? '✅' : '❌'} ${slug.padEnd(24)} ${found ? 'listing found by its own browse-page query' : 'NOT RETURNED — category_slug mismatch'}`)
  if (!found) failures++
}

console.log('\nCleaning up test rows...')
if (inserted.length) await admin.from('listings').delete().in('id', inserted)
console.log(`Removed ${inserted.length} test listing(s).`)

console.log(`\n${failures === 0 ? '✅ ALL CATEGORIES VERIFIED' : `❌ ${failures} CATEGORY MISMATCH(ES) FOUND`}`)
process.exit(failures === 0 ? 0 : 1)
