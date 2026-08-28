'use client'

import { useState, use } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { Search, MapPin, Filter, X, Heart, Eye, List, SlidersHorizontal } from 'lucide-react'
import type { MapListing } from '@/components/map/LeafletMap'
import { useFavorites } from '@/hooks/useFavorites'

// ── Load Leaflet with NO SSR — fixes "window is not defined" server errors ──
const LeafletMap = dynamic(() => import('@/components/map/LeafletMap'), {
  ssr: false,
  loading: () => (
    <div style={{ flex:1, display:'flex', alignItems:'center', justifyContent:'center', background:'#f0f9f6' }}>
      <div style={{ textAlign:'center' }}>
        <div style={{ width:40, height:40, border:'3px solid #22d4a8', borderTopColor:'transparent', borderRadius:'50%', animation:'spin 0.8s linear infinite', margin:'0 auto 12px' }}/>
        <p style={{ fontSize:13, fontWeight:700, color:'#6b7a76', fontFamily:"'Inter',sans-serif" }}>Loading map...</p>
        <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      </div>
    </div>
  ),
})

type Locale = 'en' | 'fr' | 'ar' | 'es' | 'de'

const C = { mint:'#22d4a8', mintDk:'#0f9b8e', ink:'#161d1b', surface:'#f4fbf8', muted:'#6b7a76' }
const F = "'Inter', system-ui, sans-serif"

const LISTINGS: MapListing[] = [
  { id:1,  title:'iPhone 15 Pro Max 256GB',       price:'12,500 MAD',    priceNum:12500,   category:'Electronics', city:'Rabat',      image:'https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&w=400',    badge:'Diamond',   lat:33.9832, lng:-6.8519, views:847,  condition:'Like New'  },
  { id:2,  title:'BMW M4 Competition 2022',        price:'785,000 MAD',   priceNum:785000,  category:'Motors',      city:'Casablanca', image:'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&w=400',  badge:'Diamond',   lat:33.5885, lng:-7.6114, views:1284, condition:'Excellent' },
  { id:3,  title:'Appartement 3Ch — Agdal Rabat', price:'25,000 MAD/mo', priceNum:25000,   category:'Property',    city:'Rabat',      image:'https://images.pexels.com/photos/1918291/pexels-photo-1918291.jpeg?auto=compress&w=400',  badge:'Diamond',   lat:33.9950, lng:-6.8400, views:412,  condition:'N/A'       },
  { id:4,  title:'MacBook Pro 14" M3 Pro',         price:'24,800 MAD',    priceNum:24800,   category:'Electronics', city:'Rabat',      image:'https://images.pexels.com/photos/1229861/pexels-photo-1229861.jpeg?auto=compress&w=400',  badge:'Certified', lat:34.0200, lng:-6.8340, views:523,  condition:'New'       },
  { id:5,  title:'Patek Philippe Nautilus 5711',   price:'1,850,000 MAD', priceNum:1850000, category:'The Vault',   city:'Casablanca', image:'https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&w=400',    badge:'Diamond',   lat:33.5731, lng:-7.5898, views:934,  condition:'Mint'      },
  { id:6,  title:'Villa 500m² Palmeraie Piscine',  price:'8,500,000 MAD', priceNum:8500000, category:'Property',    city:'Marrakech',  image:'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&w=400',  badge:'Diamond',   lat:31.6295, lng:-7.9811, views:267,  condition:'N/A'       },
  { id:7,  title:'AirPods Pro 2nd Gen — Sealed',   price:'1,850 MAD',     priceNum:1850,    category:'Electronics', city:'Rabat',      image:'https://images.pexels.com/photos/8000631/pexels-photo-8000631.jpeg?auto=compress&w=400',  badge:null,        lat:33.9523, lng:-6.8520, views:156,  condition:'New'       },
  { id:8,  title:'Rolex Submariner Date 2024',     price:'320,000 MAD',   priceNum:320000,  category:'The Vault',   city:'Tangier',    image:'https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&w=400',    badge:'Diamond',   lat:35.7673, lng:-5.7998, views:445,  condition:'Unworn'    },
  { id:9,  title:'Sony WH-1000XM5 Headphones',    price:'3,400 MAD',     priceNum:3400,    category:'Electronics', city:'Rabat',      image:'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&w=400',  badge:'Certified', lat:34.0120, lng:-6.8630, views:234,  condition:'Like New'  },
  { id:10, title:'Land Rover Defender 110 P400',   price:'1,200,000 MAD', priceNum:1200000, category:'Motors',      city:'Marrakech',  image:'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&w=400',    badge:'Diamond',   lat:31.6380, lng:-8.0200, views:789,  condition:'Excellent' },
  { id:11, title:'Appartement Vue Mer — Tanger',   price:'3,500,000 MAD', priceNum:3500000, category:'Property',    city:'Tangier',    image:'https://images.pexels.com/photos/1918291/pexels-photo-1918291.jpeg?auto=compress&w=400',  badge:'Diamond',   lat:35.7800, lng:-5.7800, views:312,  condition:'N/A'       },
  { id:12, title:'Porsche Cayenne Turbo S 2023',   price:'980,000 MAD',   priceNum:980000,  category:'Motors',      city:'Casablanca', image:'https://images.pexels.com/photos/1638459/pexels-photo-1638459.jpeg?auto=compress&w=400',  badge:'Diamond',   lat:33.5950, lng:-7.6350, views:623,  condition:'Like New'  },
  { id:13, title:'Riad 6 Suites — Médina Fès',    price:'4,200,000 MAD', priceNum:4200000, category:'Property',    city:'Fès',        image:'https://images.pexels.com/photos/440731/pexels-photo-440731.jpeg?auto=compress&w=400',    badge:'Diamond',   lat:34.0133, lng:-5.0003, views:198,  condition:'N/A'       },
  { id:14, title:'Tesla Model 3 Long Range',       price:'480,000 MAD',   priceNum:480000,  category:'Motors',      city:'Casablanca', image:'https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg?auto=compress&w=400',  badge:'Certified', lat:33.6000, lng:-7.6200, views:890,  condition:'Excellent' },
  { id:15, title:'Hermès Birkin 35 — Togo Fauve', price:'180,000 MAD',   priceNum:180000,  category:'The Vault',   city:'Rabat',      image:'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&w=400',  badge:'Diamond',   lat:34.0100, lng:-6.8500, views:567,  condition:'Like New'  },
]

const CATEGORIES = ['All','Electronics','Motors','Property','The Vault','Fashion','Services']
const CITIES = ['All Morocco','Casablanca','Rabat','Marrakech','Tangier','Fès','Agadir']

export default function MapPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale }              = use(params)
  const [search,     setSearch    ] = useState('')
  const [category,   setCategory  ] = useState('All')
  const [selected,   setSelected  ] = useState<MapListing | null>(null)
  const { isFavorited, toggleFavorite } = useFavorites()
  const [view,       setView      ] = useState<'map'|'list'>('map')
  const [maxPrice,   setMaxPrice  ] = useState(10000000)
  const [filtersOpen,setFiltersOpen] = useState(false)
  const [city,       setCity      ] = useState('All Morocco')
  const [sortBy,     setSortBy    ] = useState<'newest'|'price_asc'|'price_desc'>('newest')

  const handleSave = (id: number) => toggleFavorite(String(id))

  const filtered = LISTINGS.filter(l => {
    if (search && !l.title.toLowerCase().includes(search.toLowerCase())) return false
    if (category !== 'All' && l.category !== category) return false
    if (l.priceNum > maxPrice) return false
    if (city !== 'All Morocco' && !l.city.toLowerCase().includes(city.toLowerCase())) return false
    return true
  }).sort((a,b) =>
    sortBy==='price_asc'  ? a.priceNum-b.priceNum :
    sortBy==='price_desc' ? b.priceNum-a.priceNum : b.id-a.id
  )

  return (
    <div style={{ background:C.surface, height:'100vh', display:'flex', flexDirection:'column', fontFamily:F, overflow:'hidden' }}>

      {/* TOP BAR */}
      <div style={{ background:'white', borderBottom:'1px solid #e2eae6', padding:'10px 20px', display:'flex', alignItems:'center', gap:'10px', flexWrap:'wrap', zIndex:20, boxShadow:'0 1px 8px rgba(0,0,0,0.06)' }}>

        {/* Search */}
        <div style={{ display:'flex', alignItems:'center', gap:8, background:C.surface, borderRadius:100, padding:'0 14px', height:40, border:'1.5px solid #e2eae6', flex:1, minWidth:180, maxWidth:300 }}>
          <Search size={14} color={C.muted}/>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search on map..."
            style={{ flex:1, border:'none', background:'transparent', outline:'none', fontSize:13, fontFamily:F, fontWeight:600, color:C.ink }}/>
          {search && <button onClick={()=>setSearch('')} style={{ border:'none', background:'none', cursor:'pointer', padding:0, display:'flex' }}><X size={13} color={C.muted}/></button>}
        </div>

        {/* Categories */}
        <div style={{ display:'flex', gap:6, overflowX:'auto' }}>
          {CATEGORIES.map(cat=>(
            <button key={cat} onClick={()=>setCategory(cat)}
              style={{ whiteSpace:'nowrap', padding:'7px 14px', borderRadius:100, border:`1.5px solid ${category===cat?C.mint:'#e2eae6'}`, background:category===cat?C.mint:'white', color:category===cat?'white':C.muted, fontSize:12, fontWeight:900, cursor:'pointer', fontFamily:F, transition:'all 0.15s' }}>
              {cat}
            </button>
          ))}
        </div>

        {/* City */}
        <select value={city} onChange={e=>{setCity(e.target.value);setSelected(null)}}
          style={{ padding:'8px 14px', borderRadius:100, border:'1.5px solid #e2eae6', fontSize:12, fontFamily:F, fontWeight:700, color:C.ink, background:'white', outline:'none', cursor:'pointer' }}>
          {CITIES.map(c=><option key={c}>{c}</option>)}
        </select>

        {/* Filters */}
        <button onClick={()=>setFiltersOpen(!filtersOpen)}
          style={{ display:'flex', alignItems:'center', gap:6, padding:'8px 16px', borderRadius:100, border:`1.5px solid ${filtersOpen?C.mint:'#e2eae6'}`, background:filtersOpen?C.mint:'white', color:filtersOpen?'white':C.ink, fontSize:12, fontWeight:900, cursor:'pointer', fontFamily:F, transition:'all 0.15s' }}>
          <SlidersHorizontal size={13}/> Filters
        </button>

        {/* View toggle */}
        <div style={{ display:'flex', background:C.surface, padding:3, borderRadius:10, border:'1px solid #e2eae6', flexShrink:0 }}>
          {[{key:'map',label:'Map',icon:<MapPin size={13}/>},{key:'list',label:'List',icon:<List size={13}/>}].map(v=>(
            <button key={v.key} onClick={()=>setView(v.key as 'map'|'list')}
              style={{ display:'flex', alignItems:'center', gap:5, padding:'6px 14px', borderRadius:8, border:'none', cursor:'pointer', fontSize:12, fontWeight:900, fontFamily:F, background:view===v.key?'white':'transparent', color:view===v.key?C.ink:C.muted, boxShadow:view===v.key?'0 1px 4px rgba(0,0,0,0.08)':'none', transition:'all 0.15s' }}>
              {v.icon}{v.label}
            </button>
          ))}
        </div>

        <span style={{ fontSize:12, color:C.muted, fontWeight:700, whiteSpace:'nowrap', marginLeft:'auto' }}>
          <span style={{ color:C.ink, fontWeight:900 }}>{filtered.length}</span> results
        </span>
      </div>

      {/* FILTERS PANEL */}
      {filtersOpen && (
        <div style={{ background:'white', borderBottom:'1px solid #e2eae6', padding:'12px 20px', display:'flex', alignItems:'center', gap:24, flexWrap:'wrap', zIndex:10 }}>
          <div style={{ display:'flex', alignItems:'center', gap:12 }}>
            <span style={{ fontSize:12, fontWeight:800, color:C.ink, whiteSpace:'nowrap' }}>
              Max: <span style={{ color:C.mint }}>{maxPrice>=10000000?'Any':`${maxPrice.toLocaleString()} MAD`}</span>
            </span>
            <input type="range" min={1000} max={10000000} step={10000} value={maxPrice}
              onChange={e=>setMaxPrice(Number(e.target.value))}
              style={{ width:180, accentColor:C.mint, cursor:'pointer' }}/>
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:8 }}>
            <span style={{ fontSize:12, fontWeight:800, color:C.ink }}>Sort:</span>
            {[{key:'newest',label:'Newest'},{key:'price_asc',label:'Price ↑'},{key:'price_desc',label:'Price ↓'}].map(s=>(
              <button key={s.key} onClick={()=>setSortBy(s.key as any)}
                style={{ padding:'6px 14px', borderRadius:100, border:`1.5px solid ${sortBy===s.key?C.mint:'#e2eae6'}`, background:sortBy===s.key?C.mint:'white', color:sortBy===s.key?'white':C.muted, fontSize:11, fontWeight:900, cursor:'pointer', fontFamily:F }}>
                {s.label}
              </button>
            ))}
          </div>
          <button onClick={()=>{setCategory('All');setSearch('');setMaxPrice(10000000);setCity('All Morocco');setSortBy('newest')}}
            style={{ fontSize:12, fontWeight:900, color:'#ef4444', background:'none', border:'none', cursor:'pointer', fontFamily:F, marginLeft:'auto' }}>
            Reset All ✕
          </button>
        </div>
      )}

      {/* MAIN */}
      <div style={{ flex:1, display:'flex', overflow:'hidden' }}>

        {/* MAP VIEW */}
        {view==='map' && (
          <LeafletMap
            listings={filtered}
            selected={selected}
            onSelect={setSelected}
            locale={locale}
            isFavorited={(id: number) => isFavorited(String(id))}
            onSave={handleSave}
            allListings={LISTINGS}
          />
        )}

        {/* LIST VIEW */}
        {view==='list' && (
          <div style={{ flex:1, overflowY:'auto', padding:'24px 32px' }}>
            <div style={{ maxWidth:1200, margin:'0 auto' }}>
              <h2 style={{ fontFamily:"'Inter',sans-serif", fontWeight:900, fontSize:22, color:C.ink, marginBottom:24, letterSpacing:'-0.05em' }}>
                {filtered.length} listings across Morocco
              </h2>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))', gap:20 }}>
                {filtered.map(listing=>(
                  <Link key={listing.id} href={`/${locale}/listing/${listing.id}`} style={{ textDecoration:'none' }}>
                    <div style={{ background:'white', borderRadius:20, overflow:'hidden', border:'1px solid #e2eae6', transition:'all 0.2s', cursor:'pointer' }}
                      onMouseEnter={e=>{e.currentTarget.style.borderColor=C.mint;e.currentTarget.style.transform='translateY(-3px)';e.currentTarget.style.boxShadow='0 12px 32px rgba(0,0,0,0.1)'}}
                      onMouseLeave={e=>{e.currentTarget.style.borderColor='#e2eae6';e.currentTarget.style.transform='translateY(0)';e.currentTarget.style.boxShadow='none'}}>
                      <div style={{ position:'relative', aspectRatio:'16/10', overflow:'hidden' }}>
                        <img src={listing.image} alt={listing.title} style={{ width:'100%', height:'100%', objectFit:'cover' }}/>
                        {listing.badge && (
                          <span style={{ position:'absolute', top:10, left:10, fontSize:'9px', fontWeight:900, padding:'4px 10px', borderRadius:100, background:listing.badge==='Diamond'?C.mint:'#0891b2', color:'white', textTransform:'uppercase' as const }}>
                            {listing.badge==='Diamond'?'💎 ':''}{listing.badge}
                          </span>
                        )}
                        <button onClick={e=>{e.preventDefault();handleSave(listing.id)}}
                          style={{ position:'absolute', top:10, right:10, width:32, height:32, borderRadius:'50%', background:'rgba(255,255,255,0.9)', border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}>
                          <Heart size={14} color={isFavorited(String(listing.id))?'#ef4444':C.muted} fill={isFavorited(String(listing.id))?'#ef4444':'none'}/>
                        </button>
                      </div>
                      <div style={{ padding:'14px 16px' }}>
                        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:4 }}>
                          <span style={{ fontSize:10, fontWeight:800, color:C.mint, textTransform:'uppercase' as const, letterSpacing:'0.07em' }}>{listing.category}</span>
                          <span style={{ fontSize:10, fontWeight:600, color:C.muted, display:'flex', alignItems:'center', gap:3 }}><Eye size={10}/>{listing.views}</span>
                        </div>
                        <p style={{ fontSize:14, fontWeight:900, color:C.ink, marginBottom:6, lineHeight:1.3, letterSpacing:'-0.02em' }}>{listing.title}</p>
                        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                          <span style={{ fontSize:16, fontWeight:900, color:C.mint, fontFamily:"'Inter',sans-serif" }}>{listing.price}</span>
                          <span style={{ fontSize:11, color:C.muted, fontWeight:600, display:'flex', alignItems:'center', gap:3 }}><MapPin size={11}/>{listing.city}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
                {filtered.length===0 && (
                  <div style={{ gridColumn:'1/-1', background:'white', borderRadius:24, padding:'80px 40px', textAlign:'center', border:'1px solid #e2eae6' }}>
                    <p style={{ fontSize:18, fontWeight:900, color:C.ink, marginBottom:8 }}>No results found</p>
                    <p style={{ fontSize:14, color:C.muted, fontWeight:600, marginBottom:20 }}>Try adjusting your filters</p>
                    <button onClick={()=>{setCategory('All');setSearch('');setMaxPrice(10000000);setCity('All Morocco')}}
                      style={{ padding:'10px 24px', borderRadius:100, background:C.mint, color:'white', border:'none', fontSize:13, fontWeight:800, cursor:'pointer', fontFamily:F }}>
                      Clear Filters
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
