'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Heart, Search, ChevronLeft, ChevronRight, MapPin, Star, Users, Wifi, Waves, TreePine, Sun, Coffee, Car, LayoutGrid, List } from 'lucide-react'
import { useParams } from 'next/navigation'
import { useListings } from '@/hooks/useListings'
import Breadcrumb from '@/components/ui/Breadcrumb'
import CategoryFooterNav from '@/components/ui/CategoryFooterNav'
import { useFavorites } from '@/hooks/useFavorites'

const C = { mint:'#22d4a8', mintDk:'#0f9b8e', ink:'#161d1b', surface:'#f4fbf8', muted:'#6b7a76' }
const UB = { fontFamily:"'Inter',sans-serif", fontWeight:900, letterSpacing:'-0.05em' } as const
const CB = { fontFamily:"'Hanken Grotesk',sans-serif", fontWeight:900, letterSpacing:'-0.03em' } as const

const CAT_DATA: Record<string,{ label:string; hero:string; desc:string; count:string; emoji:string; vibe:string }> = {
  'apartments-daily': { label:'Apartments',     emoji:'🏙️', hero:'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&w=1600', desc:'Modern city flats and furnished apartments for short stays across Morocco.',     count:'2,840', vibe:'City breaks & urban escapes' },
  'villas-daily':     { label:'Villas',          emoji:'🏡', hero:'https://images.pexels.com/photos/2581922/pexels-photo-2581922.jpeg?auto=compress&w=1600', desc:'Private villas with pools, gardens and ocean views — your exclusive retreat.',   count:'1,240', vibe:'Luxury & private pools' },
  'riads-daily':      { label:'Riads',           emoji:'🕌', hero:'https://images.pexels.com/photos/440731/pexels-photo-440731.jpeg?auto=compress&w=1600',   desc:'Authentic Moroccan riads — courtyards, hammams and timeless beauty.',          count:'680',   vibe:'Moroccan soul & heritage' },
  'chalets-daily':    { label:'Chalets',          emoji:'🏔️', hero:'https://images.pexels.com/photos/1458457/pexels-photo-1458457.jpeg?auto=compress&w=1600', desc:'Mountain chalets and Atlas lodges for hiking, skiing and nature escapes.',      count:'320',   vibe:'Mountain & nature escapes' },
  'hostels-daily':    { label:'Hostels',          emoji:'🎒', hero:'https://images.pexels.com/photos/1648776/pexels-photo-1648776.jpeg?auto=compress&w=1600', desc:'Social, affordable and fun — meet fellow travellers from around the world.',   count:'480',   vibe:'Budget & social stays' },
  'beach-houses':     { label:'Beach Houses',     emoji:'🏖️', hero:'https://images.pexels.com/photos/2872755/pexels-photo-2872755.jpeg?auto=compress&w=1600', desc:'Beachfront homes and coastal retreats steps from the ocean.',                  count:'560',   vibe:'Beachfront & ocean views' },
  'desert-camps':     { label:'Desert Camps',     emoji:'🏕️', hero:'https://images.pexels.com/photos/2245436/pexels-photo-2245436.jpeg?auto=compress&w=1600', desc:'Luxury Sahara tents and desert experiences under a canopy of stars.',          count:'180',   vibe:'Sahara nights & stargazing' },
}

const DEFAULT = CAT_DATA['villas-daily']

const ALL_CATS = [
  { label:'Apartments',   slug:'apartments-daily', emoji:'🏙️' },
  { label:'Villas',       slug:'villas-daily',     emoji:'🏡' },
  { label:'Riads',        slug:'riads-daily',      emoji:'🕌' },
  { label:'Chalets',      slug:'chalets-daily',    emoji:'🏔️' },
  { label:'Hostels',      slug:'hostels-daily',    emoji:'🎒' },
  { label:'Beach Houses', slug:'beach-houses',     emoji:'🏖️' },
  { label:'Desert Camps', slug:'desert-camps',     emoji:'🏕️' },
]

const IMGS: Record<string,string[]> = {
  'apartments-daily': ['https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&w=500','https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&w=500'],
  'villas-daily':     ['https://images.pexels.com/photos/2581922/pexels-photo-2581922.jpeg?auto=compress&w=500','https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&w=500'],
  'riads-daily':      ['https://images.pexels.com/photos/440731/pexels-photo-440731.jpeg?auto=compress&w=500','https://images.pexels.com/photos/1268871/pexels-photo-1268871.jpeg?auto=compress&w=500'],
  'chalets-daily':    ['https://images.pexels.com/photos/1458457/pexels-photo-1458457.jpeg?auto=compress&w=500','https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&w=500'],
  'hostels-daily':    ['https://images.pexels.com/photos/1648776/pexels-photo-1648776.jpeg?auto=compress&w=500','https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&w=500'],
  'beach-houses':     ['https://images.pexels.com/photos/2872755/pexels-photo-2872755.jpeg?auto=compress&w=500','https://images.pexels.com/photos/1268871/pexels-photo-1268871.jpeg?auto=compress&w=500'],
  'desert-camps':     ['https://images.pexels.com/photos/2245436/pexels-photo-2245436.jpeg?auto=compress&w=500','https://images.pexels.com/photos/1458457/pexels-photo-1458457.jpeg?auto=compress&w=500'],
}

const AMENITIES_MAP: Record<string,string[][]> = {
  'apartments-daily': [['wifi','parking'],['wifi'],['wifi','bfast'],['parking','wifi']],
  'villas-daily':     [['pool','wifi','parking'],['beach','pool'],['pool','nature','wifi'],['pool','bfast','parking']],
  'riads-daily':      [['pool','bfast','wifi'],['bfast','wifi'],['pool','bfast'],['bfast','wifi','nature']],
  'chalets-daily':    [['nature','wifi','parking'],['nature','bfast'],['nature','wifi'],['nature','parking','bfast']],
  'hostels-daily':    [['wifi','bfast'],['wifi'],['wifi','parking'],['bfast','wifi']],
  'beach-houses':     [['beach','wifi','parking'],['beach','pool'],['beach','wifi'],['beach','parking','bfast']],
  'desert-camps':     [['bfast','nature'],['nature'],['bfast','nature'],['nature','bfast']],
}

const BADGES = ['Guest Favourite','SouKni Select','Superhost','Unique Stay','Guest Favourite','Superhost']

function makeListings(cat: string, count: number) {
  const titles: Record<string,string[]> = {
    'apartments-daily': ['Modern City Flat — Sea View Terrace','Designer Apartment — Old Medina','Penthouse with Rooftop Pool','Cosy Studio City Centre','Luxury Apartment — Corniche','Furnished Flat Near Beach','Contemporary Loft — Arts District','Serviced Apartment — Business Bay'],
    'villas-daily':     ['Private Pool Villa — Palmeraie','Beachfront Estate — Private Beach','Contemporary Villa — Sea Views','Family Villa — Mountain Backdrop','Luxury Villa with Infinity Pool','Boutique Villa — Olive Grove','Modern Villa — City & Sea Views','Classic Moroccan Villa with Riad'],
    'riads-daily':      ['Riad Royale — Private Courtyard Pool','Heritage Riad — 6 Suites Breakfast','Romantic Riad — Couples Retreat','Artist Riad — Colourful Tiles','Modern Riad — 4 Bedroom','Luxury Riad — Hammam & Spa','Traditional Riad — Medina Heart','Boutique Riad — Rooftop Terrace'],
    'chalets-daily':    ['Atlas Mountain Chalet — Ski Lodge','Cedar Forest Chalet — Ifrane','Valley View Lodge — Private Terrace','Stone Chalet — Waterfall View','Alpine Retreat — Mountain Summit','Eco Chalet — Off-Grid Solar','Adventure Base — Hiking Trails','Cosy Wood Cabin — Fireplace'],
    'hostels-daily':    ['Vibrant Social Hostel — Rooftop Bar','Budget Backpacker — City Centre','Surf Hostel — Steps to Beach','Cultural Hostel — Medina','Party Hostel — Pool & Bar','Quiet Hostel — Garden Courtyard','Design Hostel — Shared Studios','Beach Hostel — Hammocks & Surf'],
    'beach-houses':     ['Beachfront House — Private Beach Access','Ocean View Cottage — Cliffside','Sea-Front Home — 5 Bedrooms','Coastal Retreat — Surf Spot','Beach Bungalow — Palm Garden','Atlantic Villa — Sunset Terrace','Fisherman\'s House — Harbour View','Dune House — Direct Beach Access'],
    'desert-camps':     ['Luxury Sahara Camp — En-Suite Tents','Nomad Berber Camp — Full Board','Stargazing Desert Camp — Merzouga','Boutique Desert Lodge — Private Pool','Wild Desert Bivouac — Camel Trek','Royal Tent Suite — Dunes View','Eco Desert Camp — Solar Powered','Adventure Camp — Quad & Camel'],
  }
  const locs: Record<string,string[]> = {
    'apartments-daily': ['Casablanca, Corniche','Rabat, Agdal','Marrakech, Gueliz','Tangier, Centre','Casablanca, Maarif'],
    'villas-daily':     ['Marrakech, Palmeraie','Agadir, Bord de Mer','Essaouira','Tangier, Malabata','Casablanca, Ain Diab'],
    'riads-daily':      ['Marrakech Médina','Fès Médina','Chefchaouen','Rabat Médina','Meknès Médina'],
    'chalets-daily':    ['Ifrane, Moyen Atlas','Imlil, Haut Atlas','Ourika Valley','Azrou, Cèdres','Toubkal National Park'],
    'hostels-daily':    ['Marrakech','Agadir','Essaouira','Chefchaouen','Tangier'],
    'beach-houses':     ['Agadir, Bord de Mer','Essaouira','Asilah','Taghazout','El Jadida'],
    'desert-camps':     ['Merzouga, Sahara','Zagora Desert','Erg Chebbi','M\'hamid','Drâa Valley'],
  }
  const t = titles[cat] || titles['villas-daily']
  const l = locs[cat]   || locs['villas-daily']
  const a = AMENITIES_MAP[cat] || AMENITIES_MAP['villas-daily']
  const imgs = IMGS[cat] || IMGS['villas-daily']
  return Array.from({length:count},(_,i)=>({
    id:       `${cat}-${i}`,
    title:    t[i%t.length],
    price:    400 + ((i*1373)%8000),
    per:      'night',
    guests:   2 + ((i*3)%10),
    rating:   4.5 + (i%5)*0.1,
    reviews:  20 + ((i*37)%350),
    location: l[i%l.length],
    amenities:a[i%a.length],
    image:    imgs[i%imgs.length],
    badge:    BADGES[i%BADGES.length],
  }))
}

function Stars({ rating }: { rating: number }) {
  return (
    <div style={{ display:'flex', gap:1 }}>
      {[1,2,3,4,5].map(i=>(
        <Star key={i} size={11} fill={i<=Math.round(rating)?'#f59e0b':'none'} color="#f59e0b" strokeWidth={1.5}/>
      ))}
    </div>
  )
}

const AMENITY_ICONS: Record<string,string> = { pool:'🏊', beach:'🏖️', wifi:'📶', nature:'🌿', bfast:'☕', parking:'🅿️' }

function StayCard({ item, locale, view }: { item:any; locale:string; view:'grid'|'list' }) {
  const { isFavorited, toggleFavorite } = useFavorites()
  const saved = isFavorited(item.id)
  const [hov,   setHov  ] = useState(false)

  if (view === 'list') return (
    <Link href={`/${locale}/listing/${item.id}`} style={{ textDecoration:'none' }}>
      <article onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
        style={{ backgroundColor:'white', borderRadius:18, overflow:'hidden', boxShadow:hov?'0 12px 36px rgba(0,0,0,0.1)':'0 2px 8px rgba(0,0,0,0.05)', border:`1px solid ${hov?C.mint:'rgba(0,0,0,0.06)'}`, transition:'all 0.3s', display:'flex', cursor:'pointer', marginBottom:14 }}>
        <div style={{ position:'relative', width:260, flexShrink:0, overflow:'hidden' }}>
          <img src={item.image} alt={item.title} style={{ width:'100%', height:'100%', objectFit:'cover', transition:'transform 0.5s', transform:hov?'scale(1.04)':'scale(1)' }} />
          <div style={{ position:'absolute', top:10, left:10 }}>
            <span style={{ backgroundColor:item.badge==='SouKni Select'?C.ink:item.badge==='Unique Stay'?'#7c3aed':C.mint, color:'white', fontSize:'9px', fontWeight:800, padding:'3px 10px', borderRadius:100, textTransform:'uppercase' as const }}>{item.badge}</span>
          </div>
        </div>
        <div style={{ padding:'20px 24px', flex:1, display:'flex', flexDirection:'column', justifyContent:'space-between' }}>
          <div>
            <div style={{ display:'flex', alignItems:'center', gap:6, marginBottom:6 }}>
              <Stars rating={item.rating}/>
              <span style={{ fontSize:'12px', color:C.muted, fontWeight:600 }}>{item.rating} ({item.reviews} reviews)</span>
            </div>
            <h3 style={{ ...CB, fontSize:'16px', color:hov?C.mint:C.ink, marginBottom:6, transition:'color 0.2s' }}>{item.title}</h3>
            <div style={{ display:'flex', alignItems:'center', gap:5, marginBottom:8 }}>
              <MapPin size={12} color={C.muted}/><span style={{ fontSize:'12px', color:C.muted, fontWeight:600 }}>{item.location}</span>
            </div>
            <div style={{ display:'flex', alignItems:'center', gap:10 }}>
              <span style={{ fontSize:'12px', color:'#475569', fontWeight:600, display:'flex', alignItems:'center', gap:4 }}><Users size={13} color={C.mint}/>Up to {item.guests} guests</span>
              <span style={{ fontSize:'16px' }}>{item.amenities.map((a:string)=>AMENITY_ICONS[a]).join(' ')}</span>
            </div>
          </div>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', paddingTop:14, borderTop:'1px solid #f1f5f9' }}>
            <div>
              <span style={{ ...CB, fontSize:'22px', color:C.mint }}>{item.price.toLocaleString()} </span>
              <span style={{ fontSize:'13px', color:C.muted, fontWeight:600 }}>MAD / {item.per}</span>
            </div>
            <div style={{ display:'flex', gap:8 }}>
              <button onClick={e=>e.preventDefault()} style={{ padding:'9px 18px', borderRadius:100, backgroundColor:C.surface, color:C.ink, border:'none', fontSize:'12px', fontWeight:700, cursor:'pointer', fontFamily:"'Inter',sans-serif" }}>Message</button>
              <button onClick={e=>e.preventDefault()} style={{ padding:'9px 20px', borderRadius:100, backgroundColor:C.mint, color:'white', border:'none', fontSize:'12px', fontWeight:700, cursor:'pointer', fontFamily:"'Inter',sans-serif" }}>Book Now</button>
            </div>
          </div>
        </div>
      </article>
    </Link>
  )

  return (
    <Link href={`/${locale}/listing/${item.id}`} style={{ textDecoration:'none' }}>
      <article onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
        style={{ backgroundColor:'white', borderRadius:24, overflow:'hidden', boxShadow:hov?'0 20px 48px rgba(0,0,0,0.12)':'0 2px 12px rgba(0,0,0,0.06)', border:`1px solid ${hov?C.mint:'rgba(0,0,0,0.06)'}`, transition:'all 0.3s', cursor:'pointer' }}>
        <div style={{ position:'relative', aspectRatio:'4/3', overflow:'hidden' }}>
          <img src={item.image} alt={item.title} style={{ width:'100%', height:'100%', objectFit:'cover', transition:'transform 0.6s', transform:hov?'scale(1.06)':'scale(1)' }} />
          <div style={{ position:'absolute', top:12, left:12 }}>
            <span style={{ backgroundColor:item.badge==='SouKni Select'?C.ink:item.badge==='Unique Stay'?'#7c3aed':C.mint, color:'white', fontSize:'9px', fontWeight:800, padding:'4px 10px', borderRadius:100, textTransform:'uppercase' as const, whiteSpace:'nowrap' }}>
              {item.badge}
            </span>
          </div>
          <button onClick={e=>{e.preventDefault();toggleFavorite(item.id)}}
            style={{ position:'absolute', top:12, right:12, width:34, height:34, borderRadius:'50%', backgroundColor:'rgba(255,255,255,0.9)', border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}>
            <Heart size={16} fill={saved?'#ef4444':'none'} color={saved?'#ef4444':'#6b7a76'}/>
          </button>
          <div style={{ position:'absolute', bottom:12, right:12, display:'flex', gap:4 }}>
            {item.amenities.map((a:string)=>(
              <div key={a} style={{ width:26, height:26, borderRadius:'50%', backgroundColor:'rgba(255,255,255,0.92)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:12 }}>
                {AMENITY_ICONS[a]}
              </div>
            ))}
          </div>
        </div>
        <div style={{ padding:'16px 18px' }}>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:5 }}>
            <div style={{ display:'flex', alignItems:'center', gap:5 }}>
              <MapPin size={11} color={C.muted}/>
              <span style={{ fontSize:'11px', color:C.muted, fontWeight:600 }}>{item.location}</span>
            </div>
            <div style={{ display:'flex', alignItems:'center', gap:4 }}>
              <Stars rating={item.rating}/>
              <span style={{ fontSize:'10px', color:C.muted }}>{item.rating}</span>
            </div>
          </div>
          <h3 style={{ ...CB, fontSize:'14px', color:hov?C.mint:C.ink, marginBottom:8, lineHeight:1.3, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap', transition:'color 0.2s' }}>{item.title}</h3>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', paddingTop:10, borderTop:'1px solid #f1f5f9' }}>
            <div style={{ display:'flex', alignItems:'center', gap:5 }}>
              <Users size={12} color={C.muted}/>
              <span style={{ fontSize:'11px', color:C.muted, fontWeight:600 }}>{item.guests} guests</span>
            </div>
            <div>
              <span style={{ ...CB, fontSize:'18px', color:C.mint }}>{item.price.toLocaleString()} </span>
              <span style={{ fontSize:'10px', color:C.muted, fontWeight:600 }}>MAD / night</span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  )
}

export default function DailyRentalSubPage() {
  const params  = useParams()
  const locale  = (params?.locale   as string) || 'en'
  const catSlug = (params?.category as string) || 'villas-daily'
  const data    = CAT_DATA[catSlug] || DEFAULT

  const [checkin,  setCheckin ]  = useState('')
  const [checkout, setCheckout]  = useState('')
  const [guests,   setGuests  ]  = useState('2 guests')
  const [city,     setCity    ]  = useState('Anywhere')
  const [priceMax, setPriceMax]  = useState('Any')
  const [amenity,  setAmenity ]  = useState<string|null>(null)
  const [view,     setView    ]  = useState<'grid'|'list'>('grid')
  const [sort,     setSort    ]  = useState<'Popular'|'Price Low'|'Price High'|'Top Rated'>('Popular')
  const [page,     setPage    ]  = useState(1)
  useEffect(() => { setPage(1) }, [city, priceMax, amenity, sort])

  const cities = ['Anywhere','Marrakech','Agadir','Casablanca','Essaouira','Chefchaouen','Merzouga','Ifrane','Fès','Tanger']
  const guestOpts = ['1 guest','2 guests','3 guests','4 guests','5 guests','6 guests','8+ guests','10+ guests']

  const { fetchListings } = useListings()
  const [dbListings, setDbListings] = useState<any[]>([])
  useEffect(() => {
    const t = setTimeout(() => {
      fetchListings({ category: 'property', sortBy: 'newest', limit: 24 }).then(rows => setDbListings(rows || []))
    }, 400)
    return () => clearTimeout(t)
  }, [])
  function mapDbRowToCard(row: any) {
    return {
      id: row.id,
      title: row.title,
      price: (row.price || 0) / 100,
      per: 'night',
      guests: 2,
      rating: row.profiles?.rating || 4.5,
      reviews: row.profiles?.review_count || 0,
      location: row.city,
      amenities: [] as string[],
      image: (row.images && row.images[0]) || (IMGS[catSlug] || IMGS['villas-daily'])[0],
      badge: row.badge || 'Guest Favourite',
    }
  }
  const hasRealData = dbListings.length > 0
  const sourceListings = hasRealData ? dbListings.map(mapDbRowToCard) : makeListings(catSlug, 24)
  const filteredListings = sourceListings.filter(l => {
    const ma = amenity ? l.amenities.includes(amenity) : true
    const mc = city === 'Anywhere' || l.location.toLowerCase().includes(city.toLowerCase())
    const priceCap = /^\d/.test(priceMax) ? Number(priceMax.replace(/[^\d]/g, '')) : null
    const mp = priceCap === null || l.price <= priceCap
    return ma && mc && mp
  }).sort((a, b) => {
    if (sort === 'Price Low') return a.price - b.price
    if (sort === 'Price High') return b.price - a.price
    if (sort === 'Top Rated') return b.rating - a.rating
    return b.reviews - a.reviews // Popular (default)
  })
  const PAGE_SIZE = 5
  const totalPages = Math.max(1, Math.ceil(filteredListings.length / PAGE_SIZE))
  const listings = filteredListings.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  const AMENITY_FILTERS = [
    { key:'pool',    label:'Pool',    icon:'🏊' },
    { key:'beach',   label:'Beach',   icon:'🏖️' },
    { key:'wifi',    label:'WiFi',    icon:'📶' },
    { key:'nature',  label:'Nature',  icon:'🌿' },
    { key:'bfast',   label:'Breakfast',icon:'☕' },
    { key:'parking', label:'Parking', icon:'🅿️' },
  ]

  return (
    <div style={{ fontFamily:"'Inter',sans-serif", backgroundColor:'white', minHeight:'100vh' }}>

      {/* HERO */}
      <section style={{ position:'relative', height:520, overflow:'hidden', display:'flex', alignItems:'center', justifyContent:'center' }}>
        <img src={data.hero} alt={data.label} style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover' }} />
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top, rgba(15,23,42,0.9) 0%, rgba(15,23,42,0.3) 60%, rgba(15,23,42,0.1) 100%)' }} />
        <div style={{ position:'relative', zIndex:10, textAlign:'center', padding:'0 24px', maxWidth:780, width:'100%' }}>
          <span style={{ fontSize:56, display:'block', marginBottom:12 }}>{data.emoji}</span>
          <h1 style={{ ...UB, fontSize:'clamp(36px,6vw,64px)', color:'white', lineHeight:0.95, marginBottom:12, textTransform:'uppercase' }}>{data.label}</h1>
          <p style={{ fontSize:16, color:'rgba(255,255,255,0.72)', marginBottom:32, lineHeight:1.6 }}>{data.desc}</p>
          {/* GLASSMORPHIC SEARCH — same as all other hub pages */}
          <div style={{ display:'flex', alignItems:'stretch', backgroundColor:'rgba(255,255,255,0.12)', backdropFilter:'blur(24px)', border:'1px solid rgba(255,255,255,0.25)', borderRadius:100, overflow:'hidden', maxWidth:680, margin:'0 auto', boxShadow:'0 8px 32px rgba(0,0,0,0.2)' }}>
            <div style={{ display:'flex', flexDirection:'column', padding:'14px 22px', flex:'0 0 160px', borderRight:'1px solid rgba(255,255,255,0.2)', gap:2 }}>
              <span style={{ fontSize:9, fontWeight:800, color:'rgba(255,255,255,0.55)', textTransform:'uppercase', letterSpacing:'0.12em' }}>Destination</span>
              <select value={city} onChange={e=>setCity(e.target.value)} style={{ backgroundColor:'transparent', border:'none', outline:'none', fontSize:14, fontWeight:700, color:'white', fontFamily:"'Inter',sans-serif", cursor:'pointer' }}>
                {cities.map(c=><option key={c} style={{ color:C.ink }}>{c}</option>)}
              </select>
            </div>
            <div style={{ display:'flex', flexDirection:'column', padding:'14px 22px', flex:1, borderRight:'1px solid rgba(255,255,255,0.2)', gap:2 }}>
              <span style={{ fontSize:9, fontWeight:800, color:'rgba(255,255,255,0.55)', textTransform:'uppercase', letterSpacing:'0.12em' }}>Keyword</span>
              <input placeholder={`Search ${data.label.toLowerCase()}...`} style={{ backgroundColor:'transparent', border:'none', outline:'none', fontSize:14, fontWeight:600, color:'white', fontFamily:"'Inter',sans-serif", padding:0 }} />
            </div>
            <button style={{ backgroundColor:C.mint, color:'white', border:'none', padding:'0 32px', fontWeight:800, fontSize:14, cursor:'pointer', flexShrink:0, transition:'background 0.15s', display:'flex', alignItems:'center', gap:8 }}
              onMouseEnter={e=>e.currentTarget.style.backgroundColor=C.mintDk}
              onMouseLeave={e=>e.currentTarget.style.backgroundColor=C.mint}>
              <Search size={16}/> Search
            </button>
          </div>
        </div>
      </section>

      {/* FILTER HUB BAR — clean 2-row design */}
      <div style={{ maxWidth:1440, margin:'-26px auto 0', padding:'0 40px', position:'relative', zIndex:30 }}>
        <div style={{ backgroundColor:'rgba(255,255,255,0.97)', backdropFilter:'blur(20px)', borderRadius:32, boxShadow:'0 8px 40px rgba(0,0,0,0.10)', border:'1px solid rgba(255,255,255,0.7)', overflow:'hidden' }}>

          {/* Row 1: main filters */}
          <div style={{ display:'flex', alignItems:'center', borderBottom:'1px solid rgba(186,202,197,0.2)' }}>
            <div style={{ flex:'0 0 160px', padding:'12px 20px', borderRight:'1px solid rgba(186,202,197,0.2)', display:'flex', flexDirection:'column', gap:1 }}>
              <span style={{ fontSize:9, textTransform:'uppercase', fontWeight:800, color:C.muted, letterSpacing:'0.1em' }}>Destination</span>
              <select value={city} onChange={e=>setCity(e.target.value)} style={{ border:'none', outline:'none', fontSize:14, fontWeight:700, color:C.ink, backgroundColor:'transparent', cursor:'pointer', fontFamily:"'Inter',sans-serif" }}>
                {cities.map(c=><option key={c}>{c}</option>)}
              </select>
            </div>
            <div style={{ flex:'0 0 148px', padding:'12px 20px', borderRight:'1px solid rgba(186,202,197,0.2)', display:'flex', flexDirection:'column', gap:1 }}>
              <span style={{ fontSize:9, textTransform:'uppercase', fontWeight:800, color:C.muted, letterSpacing:'0.1em' }}>Check-in</span>
              <input type="date" value={checkin} onChange={e=>setCheckin(e.target.value)} style={{ border:'none', outline:'none', fontSize:13, fontWeight:700, color:checkin?C.ink:C.muted, backgroundColor:'transparent', fontFamily:"'Inter',sans-serif", cursor:'pointer', width:'100%' }} />
            </div>
            <div style={{ flex:'0 0 148px', padding:'12px 20px', borderRight:'1px solid rgba(186,202,197,0.2)', display:'flex', flexDirection:'column', gap:1 }}>
              <span style={{ fontSize:9, textTransform:'uppercase', fontWeight:800, color:C.muted, letterSpacing:'0.1em' }}>Check-out</span>
              <input type="date" value={checkout} onChange={e=>setCheckout(e.target.value)} style={{ border:'none', outline:'none', fontSize:13, fontWeight:700, color:checkout?C.ink:C.muted, backgroundColor:'transparent', fontFamily:"'Inter',sans-serif", cursor:'pointer', width:'100%' }} />
            </div>
            <div style={{ flex:'0 0 140px', padding:'12px 20px', borderRight:'1px solid rgba(186,202,197,0.2)', display:'flex', flexDirection:'column', gap:1 }}>
              <span style={{ fontSize:9, textTransform:'uppercase', fontWeight:800, color:C.muted, letterSpacing:'0.1em' }}>Guests</span>
              <select value={guests} onChange={e=>setGuests(e.target.value)} style={{ border:'none', outline:'none', fontSize:14, fontWeight:700, color:C.ink, backgroundColor:'transparent', cursor:'pointer', fontFamily:"'Inter',sans-serif" }}>
                {['1 guest','2 guests','3 guests','4 guests','5 guests','6+ guests','8+ guests','10+ guests'].map(g=><option key={g}>{g}</option>)}
              </select>
            </div>
            <div style={{ flex:1, padding:'12px 20px', display:'flex', flexDirection:'column', gap:1 }}>
              <span style={{ fontSize:9, textTransform:'uppercase', fontWeight:800, color:C.muted, letterSpacing:'0.1em' }}>Max Price / Night</span>
              <select value={priceMax} onChange={e=>setPriceMax(e.target.value)} style={{ border:'none', outline:'none', fontSize:14, fontWeight:700, color:C.ink, backgroundColor:'transparent', cursor:'pointer', fontFamily:"'Inter',sans-serif" }}>
                {['Any price','500 MAD','1,000 MAD','2,000 MAD','5,000 MAD','10,000 MAD'].map(p=><option key={p}>{p}</option>)}
              </select>
            </div>
            <div style={{ padding:'8px 12px', flexShrink:0 }}>
              <button style={{ backgroundColor:C.mint, color:'white', border:'none', padding:'13px 28px', borderRadius:100, cursor:'pointer', fontWeight:800, fontSize:14, display:'flex', alignItems:'center', gap:7, whiteSpace:'nowrap' }}
                onMouseEnter={e=>e.currentTarget.style.backgroundColor=C.mintDk}
                onMouseLeave={e=>e.currentTarget.style.backgroundColor=C.mint}>
                <Search size={15}/> SEARCH
              </button>
            </div>
          </div>

          {/* Row 2: amenity filters — no emojis, clean pills */}
          <div style={{ display:'flex', alignItems:'center', gap:8, padding:'10px 20px', flexWrap:'wrap' }}>
            <span style={{ fontSize:10, fontWeight:800, color:C.muted, textTransform:'uppercase', letterSpacing:'0.1em', flexShrink:0 }}>Amenities:</span>
            {AMENITY_FILTERS.map(f=>(
              <button key={f.key} onClick={()=>setAmenity(amenity===f.key?null:f.key)}
                style={{ padding:'7px 18px', borderRadius:100, border:`1.5px solid ${amenity===f.key?C.mint:'rgba(186,202,197,0.4)'}`, backgroundColor:amenity===f.key?C.mint:'white', color:amenity===f.key?'white':C.muted, cursor:'pointer', fontSize:12, fontWeight:700, transition:'all 0.2s', whiteSpace:'nowrap', fontFamily:"'Inter',sans-serif" }}>
                {f.label}
              </button>
            ))}
            {(amenity !== null) && (
              <button onClick={()=>setAmenity(null)}
                style={{ padding:'7px 14px', borderRadius:100, border:'1.5px solid rgba(186,202,197,0.4)', backgroundColor:'white', color:C.muted, cursor:'pointer', fontSize:11, fontWeight:700, fontFamily:"'Inter',sans-serif", transition:'all 0.2s' }}
                onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.borderColor='#ef4444';(e.currentTarget as HTMLElement).style.color='#ef4444'}}
                onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.borderColor='rgba(186,202,197,0.4)';(e.currentTarget as HTMLElement).style.color=C.muted}}>
                Clear ✕
              </button>
            )}
          </div>

        </div>
      </div>

      <div style={{ maxWidth:1440, margin:'0 auto', padding:'32px 40px 80px' }}>

        {/* BREADCRUMB */}
        <Breadcrumb
          items={[
            { label:'Home',             href:`/${locale}` },
            { label:'Property',         href:`/${locale}/property` },
            { label:'Daily Rentals',    href:`/${locale}/property/daily-rentals` },
            { label:data.label,         href:null },
          ]}
          mutedColor={C.muted}
          inkColor={C.ink}
          style={{ fontSize:11, marginBottom:24 }}
        />

        {/* TITLE + SORT + VIEW */}
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', gap:16, marginBottom:24, flexWrap:'wrap' }}>
          <div>
            <h1 style={{ ...UB, fontSize:'clamp(22px,3vw,32px)', color:C.ink, marginBottom:4 }}>{data.emoji} {data.label} in Morocco</h1>
            <p style={{ fontSize:15, color:C.mint, fontWeight:700 }}>{data.count} stays · {data.vibe}</p>
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:10 }}>
            <div style={{ display:'flex', gap:4, padding:'4px', backgroundColor:'#f4f4f4', borderRadius:100 }}>
              {(['Popular','Price Low','Price High','Top Rated'] as const).map(s=>(
                <button key={s} onClick={()=>setSort(s)}
                  style={{ padding:'7px 14px', borderRadius:100, fontSize:11, fontWeight:800, border:'none', cursor:'pointer', fontFamily:"'Inter',sans-serif", transition:'all 0.2s',
                    backgroundColor:sort===s?C.ink:'transparent', color:sort===s?'white':C.muted, boxShadow:sort===s?'0 2px 8px rgba(0,0,0,0.15)':'none' }}>
                  {s}
                </button>
              ))}
            </div>
            <div style={{ display:'flex', gap:2, padding:'3px', backgroundColor:'white', borderRadius:10, border:'1px solid rgba(186,202,197,0.3)' }}>
              <button onClick={()=>setView('grid')} style={{ width:34, height:34, borderRadius:8, border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', backgroundColor:view==='grid'?C.ink:'transparent', transition:'all 0.2s' }}>
                <LayoutGrid size={15} color={view==='grid'?'white':C.muted}/>
              </button>
              <button onClick={()=>setView('list')} style={{ width:34, height:34, borderRadius:8, border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', backgroundColor:view==='list'?C.ink:'transparent', transition:'all 0.2s' }}>
                <List size={15} color={view==='list'?'white':C.muted}/>
              </button>
            </div>
          </div>
        </div>

        {/* CATEGORY PILLS */}
        <div style={{ display:'flex', gap:10, flexWrap:'wrap', marginBottom:24 }}>
          {ALL_CATS.map(cat=>(
            <Link key={cat.slug} href={`/${locale}/property/daily-rentals/${cat.slug}`}
              style={{ padding:'9px 18px', borderRadius:100, fontSize:12, fontWeight:800, border:`1.5px solid ${catSlug===cat.slug?C.mint:'rgba(186,202,197,0.4)'}`, backgroundColor:catSlug===cat.slug?C.mint:'white', color:catSlug===cat.slug?'white':C.muted, textDecoration:'none', transition:'all 0.15s', fontFamily:"'Inter',sans-serif", display:'flex', alignItems:'center', gap:5 }}
              onMouseEnter={e=>{if(catSlug!==cat.slug){(e.currentTarget as HTMLElement).style.borderColor=C.mint;(e.currentTarget as HTMLElement).style.color=C.mint}}}
              onMouseLeave={e=>{if(catSlug!==cat.slug){(e.currentTarget as HTMLElement).style.borderColor='rgba(186,202,197,0.4)';(e.currentTarget as HTMLElement).style.color=C.muted}}}>
              {cat.emoji} {cat.label}
            </Link>
          ))}
          <Link href={`/${locale}/property/daily-rentals`}
            style={{ padding:'9px 18px', borderRadius:100, fontSize:12, fontWeight:800, border:'1.5px solid rgba(186,202,197,0.4)', backgroundColor:'white', color:C.muted, textDecoration:'none', fontFamily:"'Inter',sans-serif" }}>
            + View More
          </Link>
        </div>

        {/* RESULTS COUNT */}
        <p style={{ fontSize:13, color:C.muted, fontWeight:600, marginBottom:24 }}>
          {listings.length} {data.label.toLowerCase()} available
          {amenity ? ` with ${amenity}` : ''}
          {city !== 'Anywhere' ? ` in ${city}` : ' across Morocco'}
        </p>

        {/* LISTINGS */}
        {listings.length > 0 ? (
          view === 'grid' ? (
            <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:24, marginBottom:48 }}>
              {listings.map(item => <StayCard key={item.id} item={item} locale={locale} view="grid" />)}
            </div>
          ) : (
            <div style={{ marginBottom:48 }}>
              {listings.map(item => <StayCard key={item.id} item={item} locale={locale} view="list" />)}
            </div>
          )
        ) : (
          <div style={{ textAlign:'center', padding:'80px 0' }}>
            <span style={{ fontSize:48, display:'block', marginBottom:16 }}>😔</span>
            <p style={{ fontSize:18, fontWeight:700, color:C.muted, marginBottom:16 }}>No stays match your filters.</p>
            <button onClick={()=>setAmenity(null)} style={{ padding:'12px 28px', borderRadius:100, backgroundColor:C.mint, color:'white', border:'none', fontSize:14, fontWeight:700, cursor:'pointer' }}>Clear Filters</button>
          </div>
        )}

        {/* PAGINATION */}
        <div style={{ display:'flex', justifyContent:'center', alignItems:'center', gap:10, marginBottom:64 }}>
          <button onClick={()=>setPage(Math.max(1,page-1))} disabled={page===1} style={{ width:44, height:44, borderRadius:12, backgroundColor:'white', border:'1px solid rgba(107,122,118,0.12)', cursor:page===1?'not-allowed':'pointer', opacity:page===1?0.4:1, display:'flex', alignItems:'center', justifyContent:'center', color:C.muted }}><ChevronLeft size={18}/></button>
          {Array.from({length:totalPages},(_,i)=>i+1).map(p=>(
            <button key={p} onClick={()=>setPage(p)} style={{ width:44, height:44, borderRadius:12, cursor:'pointer', fontSize:15, fontWeight:900, border:'1px solid', transition:'all 0.2s', backgroundColor:page===p?C.mint:'white', color:page===p?'white':C.muted, borderColor:page===p?C.mint:'rgba(107,122,118,0.12)', fontFamily:"'Inter',sans-serif" }}>{p}</button>
          ))}
          <button onClick={()=>setPage(Math.min(totalPages,page+1))} disabled={page>=totalPages} style={{ width:44, height:44, borderRadius:12, backgroundColor:'white', border:'1px solid rgba(107,122,118,0.12)', cursor:page>=totalPages?'not-allowed':'pointer', opacity:page>=totalPages?0.4:1, display:'flex', alignItems:'center', justifyContent:'center', color:C.muted }}><ChevronRight size={18}/></button>
        </div>

        {/* EXPLORE OTHER STAY TYPES */}
        <div style={{ borderTop:'1px solid rgba(186,202,197,0.3)', paddingTop:40 }}>
          <p style={{ fontSize:12, fontWeight:800, color:C.muted, textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:20, textAlign:'center' }}>Explore Other Stay Types</p>
          <div style={{ display:'flex', gap:10, justifyContent:'center', flexWrap:'wrap', marginBottom:24 }}>
            {ALL_CATS.filter(c=>c.slug!==catSlug).map(cat=>(
              <Link key={cat.slug} href={`/${locale}/property/daily-rentals/${cat.slug}`}
                style={{ padding:'10px 22px', borderRadius:100, fontSize:12, fontWeight:800, border:'1.5px solid rgba(186,202,197,0.4)', backgroundColor:'white', color:C.muted, textDecoration:'none', transition:'all 0.2s', fontFamily:"'Inter',sans-serif", display:'flex', alignItems:'center', gap:5 }}
                onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.borderColor=C.mint;(e.currentTarget as HTMLElement).style.color=C.mint}}
                onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.borderColor='rgba(186,202,197,0.4)';(e.currentTarget as HTMLElement).style.color=C.muted}}>
                {cat.emoji} {cat.label}
              </Link>
            ))}
          </div>

          {/* BACK BUTTONS */}
          <div style={{ display:'flex', gap:10, justifyContent:'center', flexWrap:'wrap' }}>
            {[
              { label:'← Daily Rentals', href:`/${locale}/property/daily-rentals` },
              { label:'← Property Hub',  href:`/${locale}/property`              },
              { label:'← Home',          href:`/${locale}`                       },
            ].map((b,i)=>(
              <Link key={b.label} href={b.href}
                style={{ padding:'12px 24px', borderRadius:100, textDecoration:'none', fontSize:13, fontWeight:900, fontFamily:"'Inter',sans-serif", transition:'all 0.2s', display:'flex', alignItems:'center', gap:6,
                  backgroundColor: i===2 ? C.ink : 'white',
                  color:           i===2 ? 'white' : C.ink,
                  border:          i===2 ? 'none' : '1.5px solid rgba(186,202,197,0.4)' }}
                onMouseEnter={e=>{if(i<2){(e.currentTarget as HTMLElement).style.borderColor=C.mint;(e.currentTarget as HTMLElement).style.color=C.mint}else{(e.currentTarget as HTMLElement).style.backgroundColor=C.mint}}}
                onMouseLeave={e=>{if(i<2){(e.currentTarget as HTMLElement).style.borderColor='rgba(186,202,197,0.4)';(e.currentTarget as HTMLElement).style.color=C.ink}else{(e.currentTarget as HTMLElement).style.backgroundColor=C.ink}}}>
                {b.label}
              </Link>
            ))}
          </div>
        </div>

        <CategoryFooterNav
          backHref={`/${locale}/property/daily-rentals`}
          backLabel="Back to All Daily Rentals"
          related={ALL_CATS.filter(c=>c.slug!==catSlug).map(c=>({ label:c.label, href:`/${locale}/property/daily-rentals/${c.slug}` }))}
          inkColor={C.ink}
          mintDkColor={C.mintDk}
        />

      </div>
    </div>
  )
}
