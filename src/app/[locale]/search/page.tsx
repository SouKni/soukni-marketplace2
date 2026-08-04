'use client'

import { useState, use, useMemo } from 'react'
import Link from 'next/link'
import { Search, MapPin, SlidersHorizontal, X, ChevronDown, Heart, Grid, List, ArrowUpDown, Check } from 'lucide-react'

type Locale = 'en' | 'fr' | 'ar' | 'es' | 'de'

// Mock dataset spanning multiple categories — in production this is a real DB query
const ALL_LISTINGS = [
  { id: 1, title: 'iPhone 15 Pro Max 256GB Titanium Black', price: 12500, category: 'Electronics', subcategory: 'Mobiles', city: 'Rabat', image: 'https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&w=500', badge: 'Diamond', condition: 'Like New', postedDays: 1 },
  { id: 2, title: 'iPhone 14 Pro Max 256GB Space Black', price: 9200, category: 'Electronics', subcategory: 'Mobiles', city: 'Marrakech', image: 'https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&w=500', badge: 'Verified', condition: 'Good', postedDays: 3 },
  { id: 3, title: 'iPhone 13 128GB Midnight — Unlocked', price: 5800, category: 'Electronics', subcategory: 'Mobiles', city: 'Casablanca', image: 'https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&w=500', badge: null, condition: 'Good', postedDays: 5 },
  { id: 4, title: 'Samsung Galaxy S24 Ultra 512GB', price: 11800, category: 'Electronics', subcategory: 'Mobiles', city: 'Rabat', image: 'https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg?auto=compress&w=500', badge: 'Diamond', condition: 'New', postedDays: 2 },
  { id: 5, title: 'MacBook Pro 14" M3 Pro 18GB/512GB', price: 24800, category: 'Electronics', subcategory: 'Laptops', city: 'Rabat', image: 'https://images.pexels.com/photos/1229861/pexels-photo-1229861.jpeg?auto=compress&w=500', badge: 'Verified', condition: 'Like New', postedDays: 4 },
  { id: 6, title: 'iPad Pro 12.9" M2 256GB WiFi', price: 13200, category: 'Electronics', subcategory: 'Tablets', city: 'Tangier', image: 'https://images.pexels.com/photos/1334597/pexels-photo-1334597.jpeg?auto=compress&w=500', badge: 'Verified', condition: 'New', postedDays: 1 },
  { id: 7, title: 'iPhone Charger 20W USB-C Original', price: 180, category: 'Electronics', subcategory: 'Accessories', city: 'Fès', image: 'https://images.pexels.com/photos/4526414/pexels-photo-4526414.jpeg?auto=compress&w=500', badge: null, condition: 'New', postedDays: 6 },
  { id: 8, title: 'BMW M4 Competition — Carbon Pack', price: 785000, category: 'Motors', subcategory: 'Cars', city: 'Casablanca', image: 'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&w=500', badge: 'Diamond', condition: 'Like New', postedDays: 2 },
  { id: 9, title: 'Modern Apartment, Casablanca CFC', price: 25000, category: 'Property', subcategory: 'Apartments', city: 'Casablanca', image: 'https://images.pexels.com/photos/1918291/pexels-photo-1918291.jpeg?auto=compress&w=500', badge: 'Diamond', condition: 'New', postedDays: 1 },
  { id: 10, title: 'Patek Philippe Nautilus 5711', price: 1850000, category: 'The Vault', subcategory: 'Watches', city: 'Casablanca', image: 'https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&w=500', badge: 'Diamond', condition: 'Like New', postedDays: 7 },
  { id: 11, title: 'AirPods Pro 2nd Gen — Sealed Box', price: 1850, category: 'Electronics', subcategory: 'Audio', city: 'Agadir', image: 'https://images.pexels.com/photos/8000631/pexels-photo-8000631.jpeg?auto=compress&w=500', badge: null, condition: 'New', postedDays: 3 },
  { id: 12, title: 'Sony WH-1000XM5 Headphones', price: 3400, category: 'Electronics', subcategory: 'Audio', city: 'Rabat', image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&w=500', badge: null, condition: 'Like New', postedDays: 4 },
]

const CITIES = ['All Cities', 'Rabat', 'Casablanca', 'Marrakech', 'Tangier', 'Fès', 'Agadir']
const CONDITIONS = ['New', 'Like New', 'Good', 'Fair']
const SORT_OPTIONS = [
  { key: 'relevance', label: 'Relevance' },
  { key: 'newest', label: 'Newest First' },
  { key: 'price-low', label: 'Price: Low to High' },
  { key: 'price-high', label: 'Price: High to Low' },
]

export default function SearchPage({ params, searchParams }: { params: Promise<{ locale: Locale }>; searchParams: Promise<{ q?: string }> }) {
  const { locale } = use(params)
  const { q } = use(searchParams)

  const [query, setQuery] = useState(q || '')
  const [city, setCity] = useState('All Cities')
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const [conditions, setConditions] = useState<string[]>([])
  const [sortBy, setSortBy] = useState('relevance')
  const [sortOpen, setSortOpen] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(false)

  const POPULAR_SEARCHES = [
    'iPhone 15 Pro', 'BMW Série 3', 'Appartement Rabat', 'MacBook Pro',
    'Rolex Submariner', 'PlayStation 5', 'Land Rover Defender', 'Airpods Pro',
  ]

  const suggestions = query.trim().length > 0
    ? ALL_LISTINGS
        .filter(l => l.title.toLowerCase().includes(query.toLowerCase()))
        .slice(0, 5)
        .map(l => l.title)
    : POPULAR_SEARCHES
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [view, setView] = useState<'grid' | 'list'>('grid')
  const [savedIds, setSavedIds] = useState<number[]>([])

  const toggleCondition = (c: string) => setConditions(prev => prev.includes(c) ? prev.filter(x => x !== c) : [...prev, c])
  const toggleSave = (id: number) => setSavedIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])

  // Fuzzy match — scores how well query matches title
  const fuzzyScore = (text: string, query: string): number => {
    const t = text.toLowerCase()
    const q = query.toLowerCase().trim()
    if (!q) return 1
    if (t.includes(q)) return 1                        // exact match
    const words = q.split(/\s+/)
    const allWords = words.every(w => t.includes(w))
    if (allWords) return 0.9                           // all words present
    const someWords = words.filter(w => t.includes(w)).length / words.length
    if (someWords > 0) return 0.5 + someWords * 0.3   // partial word match
    // Typo tolerance — check char-by-char overlap
    let matches = 0
    for (let i = 0; i < q.length; i++) {
      if (t.includes(q[i])) matches++
    }
    const ratio = matches / q.length
    return ratio > 0.7 ? ratio * 0.5 : 0              // typo tolerance
  }

  const results = useMemo(() => {
    let filtered = ALL_LISTINGS.filter(l => {
      const score = query.trim() === '' ? 1 : Math.max(
        fuzzyScore(l.title, query),
        fuzzyScore(l.category, query),
        fuzzyScore(l.subcategory, query),
        fuzzyScore(l.city, query)
      )
      const matchesQuery = score > 0.3
      const matchesCity = city === 'All Cities' || l.city === city
      const matchesMin = minPrice === '' || l.price >= Number(minPrice)
      const matchesMax = maxPrice === '' || l.price <= Number(maxPrice)
      const matchesCondition = conditions.length === 0 || conditions.includes(l.condition)
      return matchesQuery && matchesCity && matchesMin && matchesMax && matchesCondition
    })

    if (sortBy === 'relevance') filtered = [...filtered].sort((a, b) => { const sa = Math.max(fuzzyScore(a.title, query), fuzzyScore(a.category, query)); const sb = Math.max(fuzzyScore(b.title, query), fuzzyScore(b.category, query)); return sb - sa })
    if (sortBy === 'price-low') filtered = [...filtered].sort((a, b) => a.price - b.price)
    if (sortBy === 'price-high') filtered = [...filtered].sort((a, b) => b.price - a.price)
    if (sortBy === 'newest') filtered = [...filtered].sort((a, b) => a.postedDays - b.postedDays)

    return filtered
  }, [query, city, minPrice, maxPrice, conditions, sortBy])

  const activeFilterCount = (city !== 'All Cities' ? 1 : 0) + (minPrice ? 1 : 0) + (maxPrice ? 1 : 0) + conditions.length

  const clearFilters = () => { setCity('All Cities'); setMinPrice(''); setMaxPrice(''); setConditions([]) }

  return (
    <div style={{ background: '#f4fbf8', minHeight: '100vh', fontFamily: 'Hanken Grotesk, Inter, system-ui, sans-serif' }}>

      {/* SEARCH HERO BAR */}
      <div style={{ background: '#161d1b', padding: '28px 24px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'flex', gap: '10px', background: 'white', borderRadius: '16px', padding: '6px', boxShadow: '0 8px 32px rgba(0,0,0,0.3)', position: 'relative' }}>
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '10px', padding: '0 16px' }}>
              <Search size={18} color="#6b7a76" />
              <input
                value={query}
                onChange={e => { setQuery(e.target.value); setShowSuggestions(true) }}
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
                onKeyDown={e => e.key === 'Escape' && setShowSuggestions(false)}
                placeholder="Search for anything — iPhone, BMW, apartment..."
                style={{ flex: 1, border: 'none', outline: 'none', fontSize: '15px', padding: '12px 0', fontFamily: 'inherit', color: '#161d1b' }}
                autoComplete="off"
              />
              {/* Suggestions dropdown */}
              {showSuggestions && suggestions.length > 0 && (
                <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, background: 'white', borderRadius: '14px', boxShadow: '0 8px 32px rgba(0,0,0,0.15)', border: '1px solid #e2eae6', overflow: 'hidden', zIndex: 50, marginTop: '8px' }}>
                  {query.trim() === '' && <div style={{ padding: '10px 16px 4px', fontSize: '10px', fontWeight: 900, color: '#6b7a76', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Popular Searches</div>}
                  {suggestions.map((s, i) => (
                    <button key={i}
                      onMouseDown={() => { setQuery(s); setShowSuggestions(false) }}
                      style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '10px', padding: '11px 16px', border: 'none', background: 'white', cursor: 'pointer', fontSize: '14px', fontWeight: 600, color: '#161d1b', textAlign: 'left', fontFamily: 'inherit' }}
                      onMouseEnter={e => e.currentTarget.style.background = '#f4fbf8'}
                      onMouseLeave={e => e.currentTarget.style.background = 'white'}
                    >
                      <span style={{ fontSize: '13px', color: '#6b7a76' }}>🔍</span>
                      <span>{s}</span>
                    </button>
                  ))}
                </div>
              )}
              {query && (
                <button onClick={() => setQuery('')} style={{ border: 'none', background: 'none', cursor: 'pointer', display: 'flex' }}>
                  <X size={16} color="#6b7a76" />
                </button>
              )}
            </div>
            <button style={{ background: '#22d4a8', color: 'white', border: 'none', padding: '0 28px', borderRadius: '12px', fontSize: '14px', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>
              Search
            </button>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px' }}>

        {/* RESULTS HEADER */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <h1 style={{ fontSize: '20px', fontWeight: 800, color: '#161d1b', letterSpacing: '-0.02em' }}>
              {query ? `Results for "${query}"` : 'All Listings'}
            </h1>
            <p style={{ fontSize: '13px', color: '#6b7a76', marginTop: '2px' }}>{results.length} ad{results.length !== 1 ? 's' : ''} found</p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {/* Map view link */}
            <Link href={`/${locale}/map`}
              style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 14px', borderRadius: '10px', border: '1px solid #e2eae6', background: 'white', color: '#161d1b', textDecoration: 'none', fontSize: '13px', fontWeight: 600 }}>
              🗺 Map View
            </Link>

            {/* View toggle */}
            <div style={{ display: 'flex', gap: '4px', background: 'white', padding: '4px', borderRadius: '10px', border: '1px solid #e2eae6' }}>
              <button onClick={() => setView('grid')} style={{ width: '32px', height: '32px', borderRadius: '8px', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', background: view === 'grid' ? '#22d4a8' : 'transparent', color: view === 'grid' ? 'white' : '#6b7a76' }}>
                <Grid size={14} />
              </button>
              <button onClick={() => setView('list')} style={{ width: '32px', height: '32px', borderRadius: '8px', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', background: view === 'list' ? '#22d4a8' : 'transparent', color: view === 'list' ? 'white' : '#6b7a76' }}>
                <List size={14} />
              </button>
            </div>

            {/* Sort */}
            <div style={{ position: 'relative' }}>
              <button onClick={() => setSortOpen(!sortOpen)}
                style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'white', border: '1px solid #e2eae6', borderRadius: '10px', padding: '9px 14px', fontSize: '13px', fontWeight: 600, color: '#161d1b', cursor: 'pointer', fontFamily: 'inherit' }}>
                <ArrowUpDown size={14} /> {SORT_OPTIONS.find(s => s.key === sortBy)?.label} <ChevronDown size={14} />
              </button>
              {sortOpen && (
                <div style={{ position: 'absolute', top: '44px', right: 0, background: 'white', borderRadius: '14px', boxShadow: '0 8px 32px rgba(0,0,0,0.15)', border: '1px solid #e2eae6', overflow: 'hidden', minWidth: '190px', zIndex: 20 }}>
                  {SORT_OPTIONS.map(opt => (
                    <button key={opt.key} onClick={() => { setSortBy(opt.key); setSortOpen(false) }}
                      style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '11px 16px', border: 'none', background: sortBy === opt.key ? '#f0fdf9' : 'white', cursor: 'pointer', fontSize: '13px', fontWeight: 600, color: '#161d1b', fontFamily: 'inherit', textAlign: 'left' }}>
                      {opt.label} {sortBy === opt.key && <Check size={14} color="#22d4a8" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Filters toggle (mobile-style collapsible, but shown always here) */}
            <button onClick={() => setFiltersOpen(!filtersOpen)}
              style={{ display: 'flex', alignItems: 'center', gap: '8px', background: activeFilterCount > 0 ? '#161d1b' : 'white', border: '1px solid #e2eae6', borderRadius: '10px', padding: '9px 14px', fontSize: '13px', fontWeight: 600, color: activeFilterCount > 0 ? 'white' : '#161d1b', cursor: 'pointer', fontFamily: 'inherit' }}>
              <SlidersHorizontal size={14} /> Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
            </button>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: filtersOpen ? '260px 1fr' : '1fr', gap: '24px', alignItems: 'start' }}>

          {/* FILTERS SIDEBAR */}
          {filtersOpen && (
            <div style={{ background: 'white', borderRadius: '20px', padding: '20px', border: '1px solid #e2eae6', position: 'sticky', top: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
                <p style={{ fontSize: '14px', fontWeight: 800, color: '#161d1b' }}>Filters</p>
                {activeFilterCount > 0 && (
                  <button onClick={clearFilters} style={{ fontSize: '12px', color: '#22d4a8', fontWeight: 700, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>Clear all</button>
                )}
              </div>

              {/* City */}
              <div style={{ marginBottom: '20px' }}>
                <p style={{ fontSize: '12px', fontWeight: 700, color: '#161d1b', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>City</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {CITIES.map(c => (
                    <button key={c} onClick={() => setCity(c)}
                      style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 10px', borderRadius: '8px', border: 'none', background: city === c ? '#f0fdf9' : 'transparent', cursor: 'pointer', fontSize: '13px', fontWeight: city === c ? 700 : 500, color: city === c ? '#22d4a8' : '#161d1b', fontFamily: 'inherit', textAlign: 'left' }}>
                      <MapPin size={13} /> {c}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div style={{ marginBottom: '20px' }}>
                <p style={{ fontSize: '12px', fontWeight: 700, color: '#161d1b', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Price (MAD)</p>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <input type="number" placeholder="Min" value={minPrice} onChange={e => setMinPrice(e.target.value)}
                    style={{ width: '50%', padding: '9px 10px', borderRadius: '8px', border: '1.5px solid #e2eae6', fontSize: '12px', fontFamily: 'inherit', outline: 'none', color: '#161d1b' }} />
                  <input type="number" placeholder="Max" value={maxPrice} onChange={e => setMaxPrice(e.target.value)}
                    style={{ width: '50%', padding: '9px 10px', borderRadius: '8px', border: '1.5px solid #e2eae6', fontSize: '12px', fontFamily: 'inherit', outline: 'none', color: '#161d1b' }} />
                </div>
              </div>

              {/* Condition */}
              <div>
                <p style={{ fontSize: '12px', fontWeight: 700, color: '#161d1b', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Condition</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {CONDITIONS.map(c => (
                    <label key={c} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                      <div onClick={() => toggleCondition(c)} style={{ width: '16px', height: '16px', borderRadius: '5px', border: `2px solid ${conditions.includes(c) ? '#22d4a8' : '#e2eae6'}`, background: conditions.includes(c) ? '#22d4a8' : 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        {conditions.includes(c) && <Check size={10} color="white" strokeWidth={3} />}
                      </div>
                      <span style={{ fontSize: '13px', color: '#161d1b', fontWeight: 500 }}>{c}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* RESULTS */}
          <div>
            {results.length === 0 ? (
              <div style={{ background: 'white', borderRadius: '20px', padding: '60px 20px', textAlign: 'center', border: '1px solid #e2eae6' }}>
                <p style={{ fontSize: '40px', marginBottom: '12px' }}>🔍</p>
                <p style={{ fontSize: '16px', fontWeight: 700, color: '#161d1b', marginBottom: '6px' }}>No results found</p>
                <p style={{ fontSize: '13px', color: '#6b7a76', marginBottom: '20px' }}>Try adjusting your search or filters</p>
                <button onClick={clearFilters} style={{ padding: '10px 24px', borderRadius: '10px', background: '#22d4a8', color: 'white', border: 'none', fontSize: '13px', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>
                  Clear Filters
                </button>
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: view === 'grid' ? 'repeat(4, 1fr)' : '1fr', gap: '14px' }}>
                {results.map(item => (
                  <Link key={item.id} href={`/${locale}/listing/${item.id}`} style={{ textDecoration: 'none' }}>
                    <div style={{ background: 'white', borderRadius: '18px', overflow: 'hidden', border: '1px solid #e2eae6', display: view === 'list' ? 'flex' : 'block', transition: 'all 0.2s', cursor: 'pointer' }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = '#22d4a8'; e.currentTarget.style.transform = 'translateY(-2px)' }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = '#e2eae6'; e.currentTarget.style.transform = 'translateY(0)' }}
                    >
                      <div style={{ position: 'relative', aspectRatio: view === 'list' ? '1/1' : '4/3', width: view === 'list' ? '160px' : '100%', flexShrink: 0, overflow: 'hidden' }}>
                        <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        {item.badge && (
                          <span style={{ position: 'absolute', top: '10px', left: '10px', background: item.badge === 'Diamond' ? '#22d4a8' : 'white', color: item.badge === 'Diamond' ? 'white' : '#22d4a8', fontSize: '9px', fontWeight: 700, padding: '4px 10px', borderRadius: '100px', textTransform: 'uppercase' }}>
                            {item.badge}
                          </span>
                        )}
                        <button onClick={e => { e.preventDefault(); toggleSave(item.id) }}
                          style={{ position: 'absolute', top: '10px', right: '10px', width: '30px', height: '30px', borderRadius: '50%', background: 'rgba(255,255,255,0.9)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <Heart size={14} color={savedIds.includes(item.id) ? '#ef4444' : '#6b7a76'} fill={savedIds.includes(item.id) ? '#ef4444' : 'none'} />
                        </button>
                      </div>
                      <div style={{ padding: '14px' }}>
                        <p style={{ fontSize: '11px', color: '#6b7a76', marginBottom: '4px', fontWeight: 500 }}>{item.category} · {item.subcategory}</p>
                        <p style={{ fontSize: '13px', fontWeight: 700, color: '#161d1b', marginBottom: '6px', lineHeight: 1.3, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{item.title}</p>
                        <p style={{ fontSize: '16px', fontWeight: 800, color: '#22d4a8', marginBottom: '6px' }}>{item.price.toLocaleString()} MAD</p>
                        <p style={{ fontSize: '11px', color: '#6b7a76', display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <MapPin size={11} /> {item.city}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
