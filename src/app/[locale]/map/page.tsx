'use client'

import { useState, use, useEffect, useRef } from 'react'
import Link from 'next/link'
import { Search, MapPin, Filter, X, ChevronRight, Heart, Eye, MessageCircle, ZoomIn, ZoomOut, Locate, Layers, List } from 'lucide-react'

type Locale = 'en' | 'fr' | 'ar' | 'es' | 'de'

const MINT    = '#22d4a8'
const SURFACE = '#f4fbf8'
const INK     = '#161d1b'
const MUTED   = '#6b7a76'
const FONT    = "'Inter', system-ui, sans-serif"

type Listing = {
  id: number
  title: string
  price: string
  priceNum: number
  category: string
  city: string
  image: string
  badge: string | null
  lat: number
  lng: number
  views: number
}

const LISTINGS: Listing[] = [
  { id: 1,  title: 'iPhone 15 Pro Max 256GB',          price: '12,500 MAD', priceNum: 12500, category: 'Electronics', city: 'Rabat, Agdal',      image: 'https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&w=300',    badge: 'Diamond', lat: 33.9832,  lng: -6.8519, views: 847 },
  { id: 2,  title: 'BMW M4 Competition',               price: '785,000 MAD',priceNum: 785000,category: 'Motors',      city: 'Casablanca, Maarif',  image: 'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&w=300', badge: 'Diamond', lat: 33.5885,  lng: -7.6114, views: 1284 },
  { id: 3,  title: 'Appartement 3Ch Agdal',            price: '25,000 MAD', priceNum: 25000, category: 'Property',    city: 'Rabat, Agdal',       image: 'https://images.pexels.com/photos/1918291/pexels-photo-1918291.jpeg?auto=compress&w=300',  badge: 'Diamond', lat: 33.9950,  lng: -6.8400, views: 412 },
  { id: 4,  title: 'MacBook Pro 14" M3',               price: '24,800 MAD', priceNum: 24800, category: 'Electronics', city: 'Rabat, Hassan',       image: 'https://images.pexels.com/photos/1229861/pexels-photo-1229861.jpeg?auto=compress&w=300',  badge: 'Certified',lat: 34.0200, lng: -6.8340, views: 523 },
  { id: 5,  title: 'Patek Philippe Nautilus 5711',     price: '1,850,000 MAD',priceNum:1850000,category:'The Vault',  city: 'Casablanca, CFC',     image: 'https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&w=300',    badge: 'Diamond', lat: 33.5731,  lng: -7.5898, views: 934 },
  { id: 6,  title: 'Villa 500m² Palmeraie',            price: '8,500,000 MAD',priceNum:8500000,category:'Property',   city: 'Marrakech, Palmeraie',image: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&w=300',  badge: 'Diamond', lat: 31.6295,  lng: -7.9811, views: 267 },
  { id: 7,  title: 'AirPods Pro 2nd Gen Sealed',       price: '1,850 MAD',  priceNum: 1850,  category: 'Electronics', city: 'Rabat, Hay Riad',     image: 'https://images.pexels.com/photos/8000631/pexels-photo-8000631.jpeg?auto=compress&w=300',  badge: null,       lat: 33.9523,  lng: -6.8520, views: 156 },
  { id: 8,  title: 'Rolex Submariner 2024',            price: '320,000 MAD', priceNum: 320000,category: 'The Vault',  city: 'Tangier, Marina',     image: 'https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&w=300',    badge: 'Diamond', lat: 35.7673,  lng: -5.7998, views: 445 },
  { id: 9,  title: 'Sony WH-1000XM5 Headphones',      price: '3,400 MAD',  priceNum: 3400,  category: 'Electronics', city: 'Rabat, Souissi',      image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&w=300',  badge: 'Certified',lat: 34.0120, lng: -6.8630, views: 234 },
  { id: 10, title: 'Land Rover Defender 110',          price: '1,200,000 MAD',priceNum:1200000,category:'Motors',     city: 'Marrakech, Gueliz',   image: 'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&w=300',    badge: 'Diamond', lat: 31.6380,  lng: -8.0200, views: 789 },
  { id: 11, title: 'Appartement Vue Mer Tangier',      price: '3,500,000 MAD',priceNum:3500000,category:'Property',   city: 'Tangier, Malabata',   image: 'https://images.pexels.com/photos/1918291/pexels-photo-1918291.jpeg?auto=compress&w=300',  badge: 'Diamond', lat: 35.7800,  lng: -5.7800, views: 312 },
  { id: 12, title: 'Porsche Cayenne Turbo S',          price: '980,000 MAD', priceNum: 980000,category: 'Motors',     city: 'Casablanca, Anfa',    image: 'https://images.pexels.com/photos/1638459/pexels-photo-1638459.jpeg?auto=compress&w=300',  badge: 'Diamond', lat: 33.5950,  lng: -7.6350, views: 623 },
]

const CATEGORIES = ['All', 'Electronics', 'Motors', 'Property', 'The Vault', 'Fashion', 'Services']
const CITIES_CENTER: Record<string, [number, number]> = {
  'All Morocco': [31.7917, -7.0926],
  'Rabat':       [34.0209, -6.8416],
  'Casablanca':  [33.5731, -7.5898],
  'Marrakech':   [31.6295, -7.9811],
  'Tangier':     [35.7673, -5.7998],
  'Fès':         [34.0133, -5.0003],
}

export default function MapPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = use(params)
  const [search, setSearch]           = useState('')
  const [category, setCategory]       = useState('All')
  const [selected, setSelected]       = useState<Listing | null>(null)
  const [saved, setSaved]             = useState<number[]>([])
  const [view, setView]               = useState<'map' | 'list'>('map')
  const [maxPrice, setMaxPrice]       = useState(10000000)
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [city, setCity]               = useState('All Morocco')
  const [zoom, setZoom]               = useState(6)

  const mapCenter = CITIES_CENTER[city] || CITIES_CENTER['All Morocco']

  const filtered = LISTINGS.filter(l => {
    const matchSearch   = !search || l.title.toLowerCase().includes(search.toLowerCase())
    const matchCategory = category === 'All' || l.category === category
    const matchPrice    = l.priceNum <= maxPrice
    const matchCity     = city === 'All Morocco' || l.city.toLowerCase().includes(city.toLowerCase())
    return matchSearch && matchCategory && matchPrice && matchCity
  })

  // Convert lat/lng to SVG coordinates for our Morocco map
  const toSVG = (lat: number, lng: number, w = 600, h = 400) => {
    const latMin = 27.5, latMax = 36.0
    const lngMin = -14.0, lngMax = -1.0
    const x = ((lng - lngMin) / (lngMax - lngMin)) * w
    const y = ((latMax - lat) / (latMax - latMin)) * h
    return { x, y }
  }

  // Morocco outline (simplified path)
  const moroccoPath = "M 95,20 L 120,18 L 145,22 L 160,30 L 175,35 L 190,40 L 200,55 L 210,70 L 215,90 L 220,110 L 225,130 L 230,150 L 240,165 L 250,175 L 260,185 L 270,195 L 275,210 L 270,225 L 260,240 L 250,255 L 240,265 L 230,275 L 220,285 L 210,295 L 200,305 L 185,315 L 170,320 L 155,318 L 140,310 L 125,300 L 110,290 L 95,280 L 80,265 L 70,250 L 65,235 L 70,220 L 75,205 L 80,190 L 75,175 L 65,160 L 55,145 L 45,130 L 40,115 L 42,100 L 48,85 L 55,70 L 65,55 L 75,42 L 85,30 Z"

  return (
    <div style={{ background: SURFACE, height: '100vh', display: 'flex', flexDirection: 'column', fontFamily: FONT, overflow: 'hidden' }}>

      {/* TOP BAR */}
      <div style={{ background: 'white', borderBottom: '1px solid #e2eae6', padding: '12px 20px', display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap', zIndex: 10 }}>

        {/* Search */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: SURFACE, borderRadius: '100px', padding: '0 14px', height: '40px', border: '1.5px solid #e2eae6', flex: 1, minWidth: '200px', maxWidth: '360px' }}>
          <Search size={15} color={MUTED} />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search listings on map..."
            style={{ flex: 1, border: 'none', background: 'transparent', outline: 'none', fontSize: '13px', fontFamily: FONT, fontWeight: 700, color: INK }} />
          {search && <button onClick={() => setSearch('')} style={{ border: 'none', background: 'none', cursor: 'pointer', display: 'flex', padding: '0' }}><X size={14} color={MUTED} /></button>}
        </div>

        {/* Category pills */}
        <div style={{ display: 'flex', gap: '6px', overflowX: 'auto' }}>
          {CATEGORIES.map(c => (
            <button key={c} onClick={() => setCategory(c)}
              style={{ whiteSpace: 'nowrap', padding: '7px 14px', borderRadius: '100px', border: `1.5px solid ${category === c ? MINT : '#e2eae6'}`, background: category === c ? MINT : 'white', color: category === c ? 'white' : MUTED, fontSize: '12px', fontWeight: 900, cursor: 'pointer', fontFamily: FONT }}>
              {c}
            </button>
          ))}
        </div>

        {/* City selector */}
        <select value={city} onChange={e => { setCity(e.target.value); setSelected(null) }}
          style={{ padding: '8px 14px', borderRadius: '100px', border: '1.5px solid #e2eae6', fontSize: '12px', fontFamily: FONT, fontWeight: 900, color: INK, background: 'white', outline: 'none', cursor: 'pointer', appearance: 'none' }}>
          {Object.keys(CITIES_CENTER).map(c => <option key={c}>{c}</option>)}
        </select>

        {/* Filters */}
        <button onClick={() => setFiltersOpen(!filtersOpen)}
          style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 14px', borderRadius: '100px', border: `1.5px solid ${filtersOpen ? MINT : '#e2eae6'}`, background: filtersOpen ? MINT : 'white', color: filtersOpen ? 'white' : INK, fontSize: '12px', fontWeight: 900, cursor: 'pointer', fontFamily: FONT }}>
          <Filter size={13} /> Filters
        </button>

        {/* View toggle */}
        <div style={{ display: 'flex', background: SURFACE, padding: '3px', borderRadius: '10px', border: '1px solid #e2eae6' }}>
          {[{ key: 'map', icon: <MapPin size={14} />, label: 'Map' }, { key: 'list', icon: <List size={14} />, label: 'List' }].map(v => (
            <button key={v.key} onClick={() => setView(v.key as 'map' | 'list')}
              style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '6px 12px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontSize: '12px', fontWeight: 900, fontFamily: FONT, background: view === v.key ? 'white' : 'transparent', color: view === v.key ? INK : MUTED, boxShadow: view === v.key ? '0 1px 4px rgba(0,0,0,0.08)' : 'none' }}>
              {v.icon} {v.label}
            </button>
          ))}
        </div>

        {/* Results count */}
        <span style={{ fontSize: '12px', color: MUTED, fontWeight: 700, whiteSpace: 'nowrap' }}>{filtered.length} results</span>
      </div>

      {/* FILTERS PANEL */}
      {filtersOpen && (
        <div style={{ background: 'white', borderBottom: '1px solid #e2eae6', padding: '14px 20px', display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '12px', fontWeight: 900, color: INK, whiteSpace: 'nowrap' }}>Max Price: {maxPrice >= 10000000 ? 'Any' : `${maxPrice.toLocaleString()} MAD`}</span>
            <input type="range" min={1000} max={10000000} step={1000} value={maxPrice} onChange={e => setMaxPrice(Number(e.target.value))}
              style={{ width: '160px', accentColor: MINT }} />
          </div>
          <button onClick={() => { setCategory('All'); setSearch(''); setMaxPrice(10000000); setCity('All Morocco') }}
            style={{ fontSize: '12px', fontWeight: 900, color: MINT, background: 'none', border: 'none', cursor: 'pointer', fontFamily: FONT }}>
            Reset All
          </button>
        </div>
      )}

      {/* MAIN CONTENT */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden', position: 'relative' }}>

        {/* MAP VIEW */}
        {view === 'map' && (
          <>
            {/* SVG Map */}
            <div style={{ flex: 1, position: 'relative', background: 'linear-gradient(135deg, #e0f2fe 0%, #f0fdf9 100%)', overflow: 'hidden' }}>

              {/* Map background */}
              <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} viewBox="0 0 600 420" preserveAspectRatio="xMidYMid meet">
                {/* Ocean */}
                <rect width="600" height="420" fill="#bfdbfe" opacity="0.4" />

                {/* Morocco shape */}
                <path d={moroccoPath} fill="#e6f9f3" stroke="#22d4a8" strokeWidth="1.5" opacity="0.8" />

                {/* Grid lines */}
                {[0.2, 0.4, 0.6, 0.8].map(t => (
                  <g key={t} opacity="0.15">
                    <line x1={t * 600} y1="0" x2={t * 600} y2="420" stroke="#22d4a8" strokeWidth="0.5" strokeDasharray="4,4" />
                    <line x1="0" y1={t * 420} x2="600" y2={t * 420} stroke="#22d4a8" strokeWidth="0.5" strokeDasharray="4,4" />
                  </g>
                ))}

                {/* City labels */}
                {Object.entries(CITIES_CENTER).filter(([k]) => k !== 'All Morocco').map(([cityName, [lat, lng]]) => {
                  const { x, y } = toSVG(lat, lng)
                  return (
                    <g key={cityName}>
                      <circle cx={x} cy={y} r="3" fill="#94a3b8" opacity="0.5" />
                      <text x={x + 5} y={y + 4} fontSize="8" fill="#64748b" fontWeight="700" opacity="0.8">{cityName}</text>
                    </g>
                  )
                })}

                {/* Listing markers */}
                {filtered.map(listing => {
                  const { x, y } = toSVG(listing.lat, listing.lng)
                  const isSelected = selected?.id === listing.id
                  const badgeColor = listing.badge === 'Diamond' ? MINT : listing.badge === 'Certified' ? '#0891b2' : '#6b7a76'
                  return (
                    <g key={listing.id} style={{ cursor: 'pointer' }} onClick={() => setSelected(isSelected ? null : listing)}>
                      {/* Pulse ring for selected */}
                      {isSelected && <circle cx={x} cy={y} r="20" fill={MINT} opacity="0.15" />}

                      {/* Price bubble */}
                      <g transform={`translate(${x - 28}, ${y - 18})`}>
                        <rect width="56" height="20" rx="10" fill={isSelected ? MINT : 'white'} stroke={isSelected ? MINT : badgeColor} strokeWidth={isSelected ? 0 : 1.5} filter={isSelected ? 'drop-shadow(0 2px 8px rgba(34,212,168,0.4))' : 'drop-shadow(0 1px 4px rgba(0,0,0,0.15))'} />
                        <text x="28" y="13.5" textAnchor="middle" fontSize="8" fill={isSelected ? 'white' : INK} fontWeight="900">
                          {listing.priceNum >= 1000000 ? `${(listing.priceNum/1000000).toFixed(1)}M` : listing.priceNum >= 1000 ? `${(listing.priceNum/1000).toFixed(0)}K` : listing.priceNum} MAD
                        </text>
                      </g>

                      {/* Pin */}
                      <circle cx={x} cy={y + 5} r="4" fill={isSelected ? MINT : badgeColor} stroke="white" strokeWidth="1.5" />
                    </g>
                  )
                })}
              </svg>

              {/* Zoom controls */}
              <div style={{ position: 'absolute', right: '16px', bottom: '80px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {[{ icon: <ZoomIn size={16} />, action: () => setZoom(z => Math.min(z + 1, 10)) }, { icon: <ZoomOut size={16} />, action: () => setZoom(z => Math.max(z - 1, 1)) }, { icon: <Locate size={16} />, action: () => {} }].map((btn, i) => (
                  <button key={i} onClick={btn.action}
                    style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'white', border: '1px solid #e2eae6', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: INK, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
                    {btn.icon}
                  </button>
                ))}
              </div>

              {/* Results summary */}
              <div style={{ position: 'absolute', bottom: '16px', left: '16px', background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(8px)', borderRadius: '12px', padding: '8px 14px', border: '1px solid #e2eae6', boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}>
                <p style={{ fontSize: '12px', fontWeight: 900, color: INK }}>{filtered.length} listings in view</p>
                <p style={{ fontSize: '10px', color: MUTED, fontWeight: 700 }}>Click a marker to preview</p>
              </div>
            </div>

            {/* SELECTED LISTING PANEL */}
            {selected && (
              <div style={{ width: '320px', background: 'white', borderLeft: '1px solid #e2eae6', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                <div style={{ position: 'relative', aspectRatio: '16/10', overflow: 'hidden', flexShrink: 0 }}>
                  <img src={selected.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <button onClick={() => setSelected(null)}
                    style={{ position: 'absolute', top: '10px', right: '10px', width: '28px', height: '28px', borderRadius: '50%', background: 'rgba(0,0,0,0.5)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <X size={14} color="white" />
                  </button>
                  {selected.badge && (
                    <span style={{ position: 'absolute', top: '10px', left: '10px', fontSize: '9px', fontWeight: 900, padding: '3px 8px', borderRadius: '100px', background: MINT, color: 'white', textTransform: 'uppercase' }}>
                      {selected.badge === 'Diamond' ? '💎' : '✓'} {selected.badge}
                    </span>
                  )}
                </div>
                <div style={{ padding: '16px', flex: 1 }}>
                  <p style={{ fontSize: '11px', color: MUTED, fontWeight: 700, marginBottom: '4px' }}>{selected.category} · {selected.city}</p>
                  <h3 style={{ fontSize: '15px', fontWeight: 900, color: INK, marginBottom: '8px', lineHeight: 1.3, letterSpacing: '-0.03em' }}>{selected.title}</h3>
                  <p style={{ fontSize: '20px', fontWeight: 900, color: MINT, marginBottom: '14px', letterSpacing: '-0.03em' }}>{selected.price}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: MUTED, fontWeight: 700 }}>
                      <Eye size={12} /> {selected.views}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: MUTED, fontWeight: 700 }}>
                      <MapPin size={12} /> {selected.city}
                    </span>
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <Link href={`/${locale}/listing/${selected.id}`}
                      style={{ flex: 1, padding: '11px', borderRadius: '10px', background: INK, color: 'white', textDecoration: 'none', fontSize: '12px', fontWeight: 900, textAlign: 'center' }}>
                      View Listing
                    </Link>
                    <button onClick={() => setSaved(prev => prev.includes(selected.id) ? prev.filter(i => i !== selected.id) : [...prev, selected.id])}
                      style={{ width: '40px', height: '40px', borderRadius: '10px', border: `1.5px solid ${saved.includes(selected.id) ? '#ef4444' : '#e2eae6'}`, background: saved.includes(selected.id) ? '#fef2f2' : 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Heart size={16} color={saved.includes(selected.id) ? '#ef4444' : MUTED} fill={saved.includes(selected.id) ? '#ef4444' : 'none'} />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        {/* LIST VIEW */}
        {view === 'list' && (
          <div style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>
            <div style={{ maxWidth: '900px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
              {filtered.map(listing => (
                <Link key={listing.id} href={`/${locale}/listing/${listing.id}`} style={{ textDecoration: 'none' }}>
                  <div style={{ background: 'white', borderRadius: '16px', overflow: 'hidden', border: '1px solid #e2eae6', transition: 'all 0.2s' }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = MINT; e.currentTarget.style.transform = 'translateY(-2px)' }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = '#e2eae6'; e.currentTarget.style.transform = 'translateY(0)' }}
                  >
                    <div style={{ position: 'relative', aspectRatio: '4/3', overflow: 'hidden' }}>
                      <img src={listing.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      {listing.badge && (
                        <span style={{ position: 'absolute', top: '8px', left: '8px', fontSize: '9px', fontWeight: 900, padding: '3px 8px', borderRadius: '100px', background: MINT, color: 'white' }}>
                          {listing.badge}
                        </span>
                      )}
                    </div>
                    <div style={{ padding: '12px' }}>
                      <p style={{ fontSize: '11px', color: MUTED, fontWeight: 700, marginBottom: '3px' }}>{listing.category}</p>
                      <p style={{ fontSize: '13px', fontWeight: 900, color: INK, marginBottom: '4px', lineHeight: 1.3, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{listing.title}</p>
                      <p style={{ fontSize: '15px', fontWeight: 900, color: MINT, marginBottom: '4px' }}>{listing.price}</p>
                      <p style={{ fontSize: '10px', color: MUTED, fontWeight: 700, display: 'flex', alignItems: 'center', gap: '3px' }}><MapPin size={10} />{listing.city}</p>
                    </div>
                  </div>
                </Link>
              ))}
              {filtered.length === 0 && (
                <div style={{ gridColumn: '1 / -1', background: 'white', borderRadius: '20px', padding: '60px', textAlign: 'center', border: '1px solid #e2eae6' }}>
                  <p style={{ fontSize: '15px', fontWeight: 900, color: INK, marginBottom: '6px' }}>No results</p>
                  <p style={{ fontSize: '13px', color: MUTED, fontWeight: 700 }}>Try adjusting your filters</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
