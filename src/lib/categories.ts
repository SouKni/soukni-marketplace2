// Single source of truth for the "post an ad" category picker.
//
// Every `slug` here MUST match a real category_slug that some browse page's
// fetchListings() actually queries by (src/app/[locale]/<slug>/page.tsx) —
// verified live via scripts/verify-category-slugs.mjs. Do not add a category
// here without a matching browse page, and do not rename a slug here without
// updating the browse page(s) that query it.
//
// Jobs/Services/Other are deliberately excluded: no browse page exists for
// job/service postings (they don't fit this table's goods-oriented columns —
// condition, free_item, etc.), so listing them here would let a user post an
// ad that can never be found.
export type Category = {
  slug: string
  label: string
  emoji: string
  subs: string[]
}

export const CATEGORIES: Category[] = [
  { slug: 'motors',                 label: 'Motors',                   emoji: '🚗', subs: ['Used Cars', 'New Cars', 'Rental Cars', 'Parts & Accessories', 'Moto & Scooters', 'Trucks & Vans', 'Agro & Heavy', 'Car Services & Garages', 'Other Motors'] },
  { slug: 'property',               label: 'Property',                 emoji: '🏠', subs: ['For Sale', 'For Rent', 'Rooms', 'Daily Rentals', 'Commercial', 'New Projects', 'Land for Sale', 'Vacation Properties', 'Other Property'] },
  { slug: 'electronics',            label: 'Mobiles & Electronics',    emoji: '📱', subs: ['Mobiles', 'Tablets', 'Laptops', 'Desktops', 'Audio', 'Wearables', 'Cameras', 'Projectors & TVs', 'Car Electronics', 'Accessories', 'Other Electronics'] },
  { slug: 'fashion',                label: 'Fashion',                  emoji: '👗', subs: ["Women's Clothing", "Men's Clothing", 'Shoes', 'Bags', 'Traditional Wear', 'Sports & Activewear', 'Vintage & Thrift', 'Wedding & Eveningwear', 'Other Fashion'] },
  { slug: 'home-garden',            label: 'Home & Garden',            emoji: '🛋️', subs: ['Furniture', 'Outdoors & Gardens', 'Curtains & Textiles', 'Lighting', 'Rugs & Carpets', 'Kitchen', 'Decor', 'Tools & DIY', 'Other Home'] },
  { slug: 'home-appliances',        label: 'Home Appliances',          emoji: '🔌', subs: ['Washing Machines', 'Refrigerators', 'Kitchen Appliances', 'Air Conditioners', 'Vacuum Cleaners', 'Coffee Machines', 'Other Appliances'] },
  { slug: 'jewelry-watches',        label: 'Jewelry & Watches',        emoji: '💍', subs: ['Luxury Watches', 'Rings', 'Necklaces', 'Bracelets', 'Earrings', 'Vintage & Antique'] },
  { slug: 'musical-instruments',    label: 'Musical Instruments',      emoji: '🎸', subs: ['Guitars', 'Pianos & Keys', 'Drums & Percussion', 'Wind & Brass', 'String & Bowed', 'Traditional Instruments', 'Studio & DJ'] },
  { slug: 'gaming',                 label: 'Gaming',                   emoji: '🎮', subs: ['Consoles', 'Gaming PCs', 'Monitors', 'Headsets', 'Controllers', 'VR & AR', 'Handheld'] },
  { slug: 'toys',                   label: 'Toys',                     emoji: '🎲', subs: ['Building & LEGO', 'Video Games', 'Action Figures', 'Dolls & Plush', 'Outdoor & Sport', 'Board Games', 'Educational Toys'] },
  { slug: 'tickets-vouchers',       label: 'Tickets & Vouchers',       emoji: '🎟️', subs: ['Events & Shows', 'Sports & Golf', 'Dining & Restaurants', 'Shopping Vouchers', 'Travel & Hotels', 'Wellness & Spa', 'Gift Cards'] },
  { slug: 'collectibles-treasures', label: 'Collectibles & Treasures', emoji: '🏺', subs: ['Vintage Watches', 'Amazigh & Berber Jewelry', 'Vintage Rugs', 'Pottery & Ceramics', 'Coins & Banknotes', 'Stamps & Postcards', 'Vintage Posters', 'Other Collectibles'] },
  { slug: 'vault-other',            label: 'Vault — Other',            emoji: '💎', subs: ['Rare Collectibles', 'Art & Antiques', 'Vintage Items', 'Other Vault Items'] },
  { slug: 'baby-items',             label: 'Baby & Kids',              emoji: '🧸', subs: ['Baby Clothes', 'Toys', 'Strollers & Prams', 'Car Seats', 'Baby Gear', 'Kids Furniture', 'School Supplies', 'Other Baby & Kids'] },
  { slug: 'pets-accessories',       label: 'Pets',                     emoji: '🐾', subs: ['Dogs', 'Cats', 'Birds', 'Fish & Aquarium', 'Pet Food', 'Pet Accessories', 'Vet Services', 'Other Pets'] },
  { slug: 'sports-equipment',       label: 'Sports & Hobbies',         emoji: '⚽', subs: ['Football', 'Fitness & Gym', 'Cycling', 'Martial Arts', 'Swimming', 'Tennis & Racket', 'Outdoor & Hiking', 'Books & Magazines', 'Art & Craft', 'Other Sports'] },
]

// `listings.condition` is a lowercase/underscore DB enum; UI shows human labels.
export const CONDITION_TO_DB: Record<string, string> = {
  'New': 'new', 'Like New': 'like_new', 'Good': 'good', 'Fair': 'fair', 'For Parts': 'for_parts',
}
export const CONDITION_FROM_DB: Record<string, string> = {
  new: 'New', like_new: 'Like New', good: 'Good', fair: 'Fair', for_parts: 'For Parts',
}

// Best-effort match of a free-text category guess (e.g. from an AI prompt or
// a legacy label) to a canonical category. Tries exact label match first,
// then substring match either direction, then a slug match. Returns null if
// nothing reasonable is found — callers should require the user to pick one
// explicitly rather than silently guessing wrong.
export function matchCategory(guess: string | null | undefined): Category | null {
  if (!guess) return null
  const g = guess.trim().toLowerCase()
  if (!g) return null
  const exact = CATEGORIES.find(c => c.label.toLowerCase() === g || c.slug === g)
  if (exact) return exact
  const partial = CATEGORIES.find(c => c.label.toLowerCase().includes(g) || g.includes(c.label.toLowerCase()))
  return partial || null
}
