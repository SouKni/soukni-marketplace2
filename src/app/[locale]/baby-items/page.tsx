'use client'
import React, { useState, useMemo, useEffect } from 'react'
import { createPortal } from 'react-dom'
import Link from 'next/link'
import { Heart, Search, MapPin, ChevronDown, SlidersHorizontal, ChevronRight, Diamond, MessageCircle, X } from 'lucide-react'
import { useMarket } from '@/context/MarketContext'
import { useListings } from '@/hooks/useListings'

const I = {
  hero:   'https://images.pexels.com/photos/35537/child-children-girl-happy.jpeg?auto=compress&w=1600',
  b1:     'https://images.pexels.com/photos/35537/child-children-girl-happy.jpeg?auto=compress&w=600',
  b2:     'https://images.pexels.com/photos/1648377/pexels-photo-1648377.jpeg?auto=compress&w=600',
  b3:     'https://images.pexels.com/photos/906150/pexels-photo-906150.jpeg?auto=compress&w=600',
  b4:     'https://images.pexels.com/photos/3662667/pexels-photo-3662667.jpeg?auto=compress&w=600',
  b5:     'https://images.pexels.com/photos/35537/child-children-girl-happy.jpeg?auto=compress&w=600',
  b6:     'https://images.pexels.com/photos/1648377/pexels-photo-1648377.jpeg?auto=compress&w=600',
  b7:     'https://images.pexels.com/photos/906150/pexels-photo-906150.jpeg?auto=compress&w=600',
  b8:     'https://images.pexels.com/photos/3662667/pexels-photo-3662667.jpeg?auto=compress&w=600',
  immo:   'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&w=1200',
  auto:   'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&w=1200',
}

type Badge = 'diamond' | 'certified' | 'pro' | null
interface Listing { id:string; title:string; price:number; location:string; time:string; image:string; badge:Badge }

const featuredListings: Listing[] = [
  { id:'f1', badge:'diamond',   title:'Stokke Tripp Trapp High Chair + Newborn Set', price:3200, location:'Casablanca', time:'Just now', image:I.b1 },
  { id:'f2', badge:'certified', title:'UPPAbaby VISTA V2 Full Travel System',        price:8500, location:'Rabat',      time:'1h ago',   image:I.b2 },
  { id:'f3', badge:'pro',       title:'Cybex Platinum Priam Rose Gold Pram',         price:7200, location:'Marrakech',  time:'2h ago',   image:I.b3 },
  { id:'f4', badge:'diamond',   title:'Baby Bjorn Travel Crib Light + Mattress',     price:2400, location:'Tangier',    time:'3h ago',   image:I.b4 },
]

const exclusiveListings: Listing[] = [
  { id:'e1', badge:'diamond',   title:'Silver Cross Dune Pram — Stone Edition',     price:9800, location:'Casablanca', time:'Just now', image:I.b1 },
  { id:'e2', badge:'certified', title:'Bugaboo Fox 5 Complete Stroller System',      price:7500, location:'Rabat',      time:'1h ago',   image:I.b2 },
  { id:'e3', badge:'pro',       title:'Snoo Smart Sleeper Bassinet by Happiest Baby', price:6200, location:'Agadir',    time:'2h ago',   image:I.b3 },
  { id:'e4', badge:'diamond',   title:'Maxi-Cosi Pearl 360 Pro Car Seat',            price:3800, location:'Fès',        time:'3h ago',   image:I.b4 },
]

const discoveryListings: Listing[] = [
  { id:'d1',  badge:'diamond',   title:'Stokke Steps High Chair — White Oak',        price:2800, location:'Casablanca', time:'Just now', image:I.b5 },
  { id:'d2',  badge:'certified', title:'Chicco Trio Style Stroller Travel System',   price:4200, location:'Rabat',      time:'1h ago',   image:I.b6 },
  { id:'d3',  badge:'pro',       title:'Joie i-Spin 360° Car Seat 0-18kg',          price:2100, location:'Tangier',    time:'2h ago',   image:I.b7 },
  { id:'d4',  badge:'diamond',   title:'Fisher-Price Deluxe Kick & Play Piano Gym', price:850,  location:'Marrakech',  time:'3h ago',   image:I.b8 },
  { id:'d5',  badge:'certified', title:'BABYZEN YOYO² 6+ Complete Stroller',        price:5500, location:'Casablanca', time:'4h ago',   image:I.b1 },
  { id:'d6',  badge:'diamond',   title:'Nuna RAVA Convertible Car Seat',             price:3200, location:'Rabat',      time:'5h ago',   image:I.b2 },
  { id:'d7',  badge:'pro',       title:'Graco Pack n Play Playard with Bassinet',    price:1200, location:'Agadir',     time:'6h ago',   image:I.b3 },
  { id:'d8',  badge:'certified', title:'Baby Einstein Neptune Ocean Adventure Gym',  price:750,  location:'Fès',        time:'7h ago',   image:I.b4 },
  { id:'d9',  badge:'diamond',   title:'Ergobaby 360 All Position Baby Carrier',     price:1800, location:'Casablanca', time:'8h ago',   image:I.b5 },
  { id:'d10', badge:'certified', title:'Medela Freestyle Flex Breast Pump',          price:2400, location:'Rabat',      time:'9h ago',   image:I.b6 },
  { id:'d11', badge:'pro',       title:'Munchkin Bluetooth Baby Monitor',            price:1600, location:'Marrakech',  time:'10h ago',  image:I.b7 },
  { id:'d12', badge:'diamond',   title:'Peg Perego Tatamia High Chair + Newborn',   price:2900, location:'Casablanca', time:'11h ago',  image:I.b8 },
]

const categories = [
  { label:'All Baby Items',    slug:'all-baby-items'  },
  { label:'Strollers & Prams', slug:'strollers-prams' },
  { label:'Car Seats',         slug:'car-seats'       },
  { label:'High Chairs',       slug:'high-chairs'     },
  { label:'Cribs & Beds',      slug:'cribs-beds'      },
  { label:'Baby Carriers',     slug:'baby-carriers'   },
  { label:'Toys & Gyms',       slug:'toys-gyms'       },
]

const C = { mint:'#22d4a8', mintDk:'#0f9b8e', ink:'#161d1b', surface:'#f4fbf8', muted:'#6b7a76' }
const UB = { fontFamily:"'Inter',sans-serif", fontWeight:900, letterSpacing:'-0.05em' } as const
const HK = { fontFamily:"'Hanken Grotesk',sans-serif", fontWeight:900, letterSpacing:'-0.03em' } as const

function CertifiedBadge({ type }: { type: Badge }) {
  if (!type) return null
  if (type === 'diamond') return (
    <span style={{ position:'absolute', top:10, left:10, zIndex:2, background:'linear-gradient(135deg,#22d4a8,#0f9b8e)', color:'white', fontSize:'8px', ...UB, letterSpacing:'0.06em', padding:'3px 10px', borderRadius:100, display:'inline-flex', alignItems:'center', gap:3 }}>
      <Diamond size={8} /> SOUKNI CERTIFIED
    </span>
  )
  return (
    <span style={{ position:'absolute', top:10, left:10, zIndex:2, backgroundColor:'rgba(255,255,255,0.92)', color:C.mint, fontSize:'8px', ...UB, letterSpacing:'0.06em', padding:'3px 10px', borderRadius:100 }}>
      ✓ CERTIFIED
    </span>
  )
}

function ListingCard({ item, locale, compact=false }: { item:Listing; locale:string; compact?:boolean }) {
  const [saved, setSaved] = useState(false)
  const [hov, setHov] = useState(false)
  const { formatPrice } = useMarket()
  return (
    <Link href={`/${locale}/listing/${item.id}`} style={{ textDecoration:'none', display:'block' }}>
      <article onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
        style={{ backgroundColor:'white', borderRadius:compact?20:28, overflow:'hidden', border:`1px solid ${hov?C.mint:'rgba(186,202,197,0.2)'}`, boxShadow:hov?'0 20px 48px rgba(0,0,0,0.12)':'0 2px 8px rgba(0,0,0,0.04)', transition:'all 0.3s', cursor:'pointer' }}>
        <div style={{ position:'relative', aspectRatio:'4/3', overflow:'hidden' }}>
          <img src={item.image} alt={item.title} style={{ width:'100%', height:'100%', objectFit:'cover', transition:'transform 0.5s', transform:hov?'scale(1.06)':'scale(1)' }} />
          <CertifiedBadge type={item.badge} />
          <button onClick={e=>{e.preventDefault();setSaved(!saved)}} style={{ position:'absolute', top:10, right:10, zIndex:2, width:30, height:30, borderRadius:'50%', backgroundColor:'rgba(255,255,255,0.15)', backdropFilter:'blur(8px)', border:'1px solid rgba(255,255,255,0.3)', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer' }}>
            <Heart size={13} color={saved?'#ef4444':'white'} fill={saved?'#ef4444':'none'} />
          </button>
        </div>
        <div style={{ padding:compact?'12px 14px':'16px 18px' }}>
          <p style={{ fontSize:10, color:C.muted, marginBottom:3, display:'flex', alignItems:'center', gap:3 }}><MapPin size={10} />{item.location} · {item.time}</p>
          <h4 style={{ ...HK, fontSize:compact?13:14, color:C.ink, marginBottom:6, lineHeight:1.3, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{item.title}</h4>
          <p style={{ ...HK, fontSize:compact?15:17, color:C.mint, marginBottom:10 }}>{formatPrice(item.price)}</p>
          <div style={{ display:'flex', gap:6 }}>
            <button onClick={e=>e.preventDefault()} style={{ flex:1, backgroundColor:'#eef5f2', color:'#3c4a46', border:'none', padding:'8px 0', borderRadius:100, fontWeight:700, fontSize:11, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', gap:4 }}>
              <MessageCircle size={11} /> Chat
            </button>
            <button onClick={e=>e.preventDefault()} style={{ flex:1, backgroundColor:'#25D366', color:'white', border:'none', padding:'8px 0', borderRadius:100, fontWeight:700, fontSize:11, cursor:'pointer' }}>WhatsApp</button>
          </div>
        </div>
      </article>
    </Link>
  )
}


function DDrop({ label, value, options, open, setOpen, onChange, heroStyle }: any) {
  const btnRef = React.useRef<HTMLButtonElement>(null)
  const [pos, setPos] = React.useState({ top:0, left:0, width:0 })
  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => { setMounted(true) }, [])
  React.useEffect(() => {
    if (!open) return
    const measure = () => {
      if (btnRef.current) {
        const rect = btnRef.current.getBoundingClientRect()
        setPos({ top: rect.bottom + 8, left: rect.left, width: rect.width })
      }
    }
    measure()
    const closeOnScroll = () => setOpen(false)
    window.addEventListener('scroll', closeOnScroll, true)
    window.addEventListener('resize', measure)
    return () => {
      window.removeEventListener('scroll', closeOnScroll, true)
      window.removeEventListener('resize', measure)
    }
  }, [open])

  const dropdown = open && mounted ? createPortal(
    <>
      <div onClick={()=>setOpen(false)} style={{ position:'fixed', inset:0, zIndex:99998 }} />
      <div style={{ position:'fixed', top:pos.top, left:pos.left, minWidth:Math.max(pos.width,200), maxHeight:320, overflowY:'auto' as const, backgroundColor:'white', borderRadius:16, boxShadow:'0 16px 48px rgba(0,0,0,0.2)', border:'1px solid rgba(107,122,118,0.1)', zIndex:99999, padding:'6px 0' }}>
        {options.map((opt:string)=>(
          <button key={opt} onClick={()=>{ onChange(opt); setOpen(false) }}
            style={{ width:'100%', padding:'10px 18px', background:'none', border:'none', cursor:'pointer', textAlign:'left' as const, fontSize:13, fontFamily:'Inter,sans-serif', fontWeight:900, color:opt===value?C.mint:C.ink, display:'flex', justifyContent:'space-between', alignItems:'center' }}
            onMouseEnter={e=>e.currentTarget.style.backgroundColor=C.surface}
            onMouseLeave={e=>e.currentTarget.style.backgroundColor='transparent'}
          >{opt}{opt===value&&<span style={{color:C.mint}}>✓</span>}</button>
        ))}
      </div>
    </>, document.body
  ) : null

  return (
    <div style={{ position:'relative', flex:1 }}>
      <button ref={btnRef} onClick={(e)=>{ e.stopPropagation(); setOpen(!open) }}
        style={heroStyle
          ? { background:'none', border:'none', cursor:'pointer', padding:0, display:'flex', alignItems:'center', gap:6, color:'white', fontSize:14, fontFamily:'Inter,sans-serif', fontWeight:900 }
          : { width:'100%', height:'100%', background:'none', border:'none', cursor:'pointer', padding:'0 20px', display:'flex', flexDirection:'column' as const, justifyContent:'center', textAlign:'left' as const }}>
        {heroStyle ? (
          <>{value} <ChevronDown size={14} style={{ flexShrink:0, transition:'transform 0.2s', transform:open?'rotate(180deg)':'rotate(0)' }} /></>
        ) : (
          <>
            <span style={{ fontSize:9, textTransform:'uppercase' as const, fontWeight:700, color:C.muted, letterSpacing:'0.1em' }}>{label}</span>
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
              <span style={{ fontSize:13, fontWeight:600, color:C.ink }}>{value}</span>
              <ChevronDown size={14} color={C.mint} style={{ flexShrink:0, transition:'transform 0.2s', transform:open?'rotate(180deg)':'rotate(0)' }} />
            </div>
          </>
        )}
      </button>
      {dropdown}
    </div>
  )
}

export default function BabyItemsPage({ params }: { params: Promise<{ locale:string }> }) {
  const { locale } = React.use(params)
  const [activeSeller, setActiveSeller] = useState('All Sellers')
  const [diamondFirst, setDiamondFirst] = useState(true)
  const [activePill, setActivePill] = useState('All Baby Items')
  const [page, setPage] = useState(1)
  const [viewGrid, setViewGrid] = useState(true)
  const [heroCity, setHeroCity]       = useState('')
  const [heroKeyword, setHeroKeyword] = useState('')
  const [applied, setApplied]         = useState({ city:'', keyword:'' })
  const [price, setPrice]             = useState('Any Price')
  const [neighborhood, setNeighborhood] = useState('All Neighborhoods')
  const [cityOpen, setCityOpen]       = useState(false)
  const [heroCityOpen, setHeroCityOpen] = useState(false)
  const [neighOpen, setNeighOpen]     = useState(false)
  const [priceOpen, setPriceOpen]     = useState(false)
  const [sortBy, setSortBy]           = useState('Default')
  const [sortOpen, setSortOpen]       = useState(false)
  const [savedSearch, setSavedSearch] = useState(false)
  const [activeChip, setActiveChip]   = useState('New Arrivals')

  const CITIES = ['Rabat','Casablanca','Marrakech','Fès','Tanger','Agadir','Meknès']
  const PRICES = ['Any Price','0–500 MAD','500–2,000 MAD','2,000–8,000 MAD','8,000+ MAD']
  const NEIGHBORHOODS = ['All Neighborhoods','Agdal','Hay Riad','Souissi','Hassan','Médina']

  function applySearch() {
    setApplied({ city: heroCity, keyword: heroKeyword })
    setPriceOpen(false); setNeighOpen(false); setCityOpen(false)
  }

  const sellerTabs = ['All Sellers','SouKni Members','SouKni Pro']

  const { fetchListings } = useListings()
  const [dbListings, setDbListings] = useState<any[]>([])

  useEffect(() => {
    const t = setTimeout(() => {
      fetchListings({ category: 'baby-items', sortBy: 'newest', limit: 20 }).then(rows => setDbListings(rows || []))
    }, 400)
    return () => clearTimeout(t)
  }, [])

  function mapDbRowToListing(row: any, fallbackImg: string): Listing {
    const badge: Badge = row.badge === 'diamond' || row.badge === 'certified' || row.badge === 'pro' ? row.badge : 'certified'
    return {
      id: row.id,
      title: row.title,
      price: (row.price || 0) / 100,
      location: row.city || '',
      time: 'Recently',
      image: (row.images && row.images[0]) || fallbackImg,
      badge,
    }
  }

  const realFeaturedListings  = dbListings.length >= 4  ? dbListings.slice(0, 4).map(r => mapDbRowToListing(r, I.b1))  : featuredListings
  const realExclusiveListings = dbListings.length >= 8  ? dbListings.slice(4, 8).map(r => mapDbRowToListing(r, I.b1))  : exclusiveListings
  const realDiscoveryListings = dbListings.length >= 12 ? dbListings.slice(8, 20).map(r => mapDbRowToListing(r, I.b5)) : discoveryListings

  const filteredDiscovery = useMemo(() => {
    return realDiscoveryListings.filter(item => {
      const mc = !applied.city    || item.location.toLowerCase().includes(applied.city.toLowerCase())
      const mk = !applied.keyword || item.title.toLowerCase().includes(applied.keyword.toLowerCase())
      const mp = price === 'Any Price' ? true
               : price === '0–500 MAD'      ? item.price <= 500
               : price === '500–2,000 MAD'  ? item.price > 500   && item.price <= 2000
               : price === '2,000–8,000 MAD'? item.price > 2000  && item.price <= 8000
               : item.price > 8000
      return mc && mk && mp
    })
  }, [applied, price, realDiscoveryListings])

  return (
    <div style={{ fontFamily:"'Inter',sans-serif", backgroundColor:C.surface, minHeight:'100vh' }}>

      {/* CINEMATIC HERO */}
      <section style={{ position:'relative', height:480, overflow:'hidden', display:'flex', alignItems:'center', justifyContent:'center' }}>
        <img src={I.hero} alt="Baby Items" style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover' }} />
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top,rgba(15,23,42,0.88),rgba(15,23,42,0.32))' }} />
        <div style={{ position:'relative', zIndex:10, textAlign:'center', padding:'0 24px', maxWidth:760, width:'100%' }}>
          <h1 style={{ ...UB, fontSize:'clamp(36px,6vw,64px)', color:'white', lineHeight:1.0, marginBottom:20, textTransform:'uppercase' as const }}>
            PREMIUM BABY ITEMS.<br />EVERY STAGE IN RABAT.
          </h1>
          <div style={{ display:'flex', alignItems:'stretch', backgroundColor:'rgba(255,255,255,0.12)', backdropFilter:'blur(24px)', border:'1px solid rgba(255,255,255,0.25)', borderRadius:100, overflow:'hidden', maxWidth:680, margin:'0 auto', boxShadow:'0 8px 32px rgba(0,0,0,0.2)' }}>
            <div style={{ display:'flex', flexDirection:'column' as const, padding:'14px 22px', flex:'0 0 160px', borderRight:'1px solid rgba(255,255,255,0.2)', gap:2 }}>
              <span style={{ fontSize:9, fontWeight:800, color:'rgba(255,255,255,0.55)', textTransform:'uppercase' as const, letterSpacing:'0.12em' }}>City</span>
              <DDrop label="" value={heroCity||'All Cities'} options={CITIES} open={heroCityOpen} setOpen={setHeroCityOpen} onChange={setHeroCity} heroStyle />
            </div>
            <div style={{ display:'flex', flexDirection:'column' as const, padding:'14px 22px', flex:1, borderRight:'1px solid rgba(255,255,255,0.2)', gap:2 }}>
              <span style={{ fontSize:9, fontWeight:800, color:'rgba(255,255,255,0.55)', textTransform:'uppercase' as const, letterSpacing:'0.12em' }}>Keyword</span>
              <input value={heroKeyword} onChange={e=>setHeroKeyword(e.target.value)} onKeyDown={e=>e.key==='Enter'&&applySearch()} placeholder="Stroller, car seat, high chair..." autoComplete="off" style={{ backgroundColor:'transparent', border:'none', outline:'none', fontSize:14, fontWeight:600, color:'white', fontFamily:"'Inter',sans-serif", padding:0, width:'100%' }} />
            </div>
            <button onClick={applySearch} style={{ backgroundColor:C.mint, color:'white', border:'none', padding:'0 32px', fontWeight:800, fontSize:14, cursor:'pointer', flexShrink:0, transition:'background 0.15s', display:'flex', alignItems:'center', gap:8 }}
              onMouseEnter={e=>e.currentTarget.style.backgroundColor=C.mintDk}
              onMouseLeave={e=>e.currentTarget.style.backgroundColor=C.mint}>
              <Search size={16} /> Search
            </button>
          </div>
        </div>
      </section>

      {/* ADVANCED FILTER BAR */}
      <div style={{ maxWidth:1440, margin:'-26px auto 0', padding:'0 40px', position:'relative', zIndex:30 }}>
        <div style={{ backgroundColor:'rgba(255,255,255,0.92)', backdropFilter:'blur(20px)', borderRadius:100, padding:'8px 8px 8px 0', boxShadow:'0 8px 40px rgba(0,0,0,0.10)', border:'1px solid rgba(255,255,255,0.7)', display:'flex', alignItems:'center', overflow:'visible' }}>
          <DDrop label="CITY" value={heroCity||'All Cities'} options={['All Cities',...CITIES]} open={cityOpen} setOpen={setCityOpen}
            onChange={(v:string)=>setHeroCity(v==='All Cities'?'':v)} />
          <div style={{ flex:2, padding:'8px 20px', borderRight:'1px solid rgba(186,202,197,0.25)', display:'flex', flexDirection:'column' as const, gap:1 }}>
            <span style={{ fontSize:9, textTransform:'uppercase' as const, fontWeight:700, color:C.muted, letterSpacing:'0.1em' }}>KEYWORD</span>
            <div style={{ display:'flex', alignItems:'center', gap:6 }}>
              <Search size={12} color={C.muted} />
              <input value={heroKeyword} onChange={e=>setHeroKeyword(e.target.value)} onKeyDown={e=>e.key==='Enter'&&applySearch()} placeholder="Stroller, car seat, toys..." autoComplete="off"
                style={{ fontSize:13, fontWeight:600, color:C.ink, border:'none', outline:'none', background:'none', flex:1 }} />
              {heroKeyword && <button onClick={()=>{setHeroKeyword('');setApplied(p=>({...p,keyword:''}))}} style={{ background:'none', border:'none', cursor:'pointer', color:C.muted, display:'flex' }}><X size={13}/></button>}
            </div>
          </div>
          <DDrop label="NEIGHBORHOOD" value={neighborhood} options={NEIGHBORHOODS} open={neighOpen} setOpen={setNeighOpen} onChange={setNeighborhood} />
          <DDrop label="PRICE (MAD)" value={price} options={PRICES} open={priceOpen} setOpen={setPriceOpen} onChange={setPrice} />
          <button onClick={applySearch} style={{ backgroundColor:C.mint, color:'white', border:'none', padding:'12px 24px', borderRadius:100, cursor:'pointer', fontWeight:700, fontSize:13, flexShrink:0, marginLeft:8, display:'flex', alignItems:'center', gap:6, transition:'background 0.15s' }}
            onMouseEnter={e=>e.currentTarget.style.backgroundColor=C.mintDk} onMouseLeave={e=>e.currentTarget.style.backgroundColor=C.mint}>
            <Search size={15} /> SEARCH
          </button>
        </div>
      </div>

      <div style={{ maxWidth:1440, margin:'32px auto 0', padding:'0 40px 80px' }}>

        {/* BREADCRUMB */}
        <nav style={{ display:'flex', alignItems:'center', gap:6, fontSize:11, fontWeight:700, color:C.muted, textTransform:'uppercase' as const, letterSpacing:'0.06em', marginBottom:8 }}>
          <Link href={`/${locale}`} style={{ color:C.muted, textDecoration:'none' }}>Home</Link><span>›</span>
          <Link href={`/${locale}/vault`} style={{ color:C.muted, textDecoration:'none' }}>The Vault</Link><span>›</span>
          <span style={{ color:C.ink }}>Baby Items</span>
        </nav>

        {/* TITLE + SORT/SAVE */}
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:4 }}>
          <h2 style={{ ...UB, fontSize:22, color:C.ink }}>New and Pre-Owned Baby Items &amp; Gear in Rabat</h2>
          <div style={{ display:'flex', gap:8 }}>
            <div style={{ position:'relative' }}>
              <button onClick={()=>setSortOpen(!sortOpen)} style={{ display:'flex', alignItems:'center', gap:6, padding:'8px 14px', borderRadius:12, border:'1px solid rgba(186,202,197,0.4)', backgroundColor:sortOpen?C.ink:'#eef5f2', fontSize:12, fontWeight:700, cursor:'pointer', color:sortOpen?'white':C.ink, transition:'all 0.15s' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="3" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="13" y1="18" x2="21" y2="18"/></svg>
                Sort: {sortBy}
              </button>
              {sortOpen && (
                <div onClick={e=>e.stopPropagation()} style={{ position:'absolute', top:'calc(100% + 6px)', right:0, backgroundColor:'white', borderRadius:14, boxShadow:'0 12px 30px rgba(0,0,0,0.12)', border:'1px solid rgba(107,122,118,0.12)', zIndex:100, overflow:'hidden', minWidth:180 }}>
                  {['Default','Price: Low to High','Price: High to Low'].map(opt=>(
                    <button key={opt} onClick={()=>{setSortBy(opt);setSortOpen(false)}} style={{ width:'100%', padding:'10px 16px', background:'none', border:'none', textAlign:'left' as const, fontSize:11, fontWeight:700, color:sortBy===opt?C.mint:C.ink, cursor:'pointer' }}>{opt}</button>
                  ))}
                </div>
              )}
            </div>
            <button onClick={()=>setSavedSearch(!savedSearch)} style={{ display:'flex', alignItems:'center', gap:6, padding:'8px 14px', borderRadius:12, border:'1px solid rgba(186,202,197,0.4)', backgroundColor:savedSearch?C.mint:'#eef5f2', fontSize:12, fontWeight:700, cursor:'pointer', color:savedSearch?'white':C.ink, transition:'all 0.15s' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
              {savedSearch?'Search Saved':'Save Search'}
            </button>
          </div>
        </div>
        <p style={{ fontSize:14, color:C.muted, marginBottom:16 }}>2,340 Ads in Rabat District</p>

        {/* CATEGORY PILLS */}
        <div style={{ display:'flex', gap:8, marginBottom:16, overflowX:'auto', paddingBottom:4 }}>
          {categories.map(cat=>(
            <Link key={cat.slug} href={`/${locale}/baby-items/${cat.slug}`}
              style={{ padding:'8px 20px', borderRadius:100, fontSize:12, fontWeight:700, cursor:'pointer', whiteSpace:'nowrap' as const, transition:'all 0.15s', textDecoration:'none', display:'inline-block', backgroundColor:'#e8efec', color:'#3c4a46' }}
              onMouseEnter={e=>{e.currentTarget.style.backgroundColor=C.ink;e.currentTarget.style.color='white'}}
              onMouseLeave={e=>{e.currentTarget.style.backgroundColor='#e8efec';e.currentTarget.style.color='#3c4a46'}}
            >{cat.label}</Link>
          ))}
        </div>

        {/* UTILITY BAR */}
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'12px 0', borderTop:'1px solid rgba(186,202,197,0.25)', borderBottom:'1px solid rgba(186,202,197,0.25)', marginBottom:16, flexWrap:'wrap' as const, gap:10 }}>
          <div style={{ display:'flex', gap:6 }}>
            {sellerTabs.map(tab=>(
              <button key={tab} onClick={()=>setActiveSeller(tab)}
                style={{ padding:'7px 18px', borderRadius:100, fontSize:12, fontWeight:700, cursor:'pointer', border:'none', backgroundColor:activeSeller===tab?'#dde4e1':'transparent', color:activeSeller===tab?C.ink:C.muted }}>
                {tab}
              </button>
            ))}
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:16 }}>
            <div style={{ display:'flex', alignItems:'center', gap:8, cursor:'pointer' }} onClick={()=>setDiamondFirst(!diamondFirst)}>
              <span style={{ fontSize:12, fontWeight:700, color:C.muted }}>Show SouKni Diamond Verified First</span>
              <div style={{ width:40, height:20, borderRadius:100, backgroundColor:diamondFirst?C.mint:'#bacac5', position:'relative', transition:'background 0.25s' }}>
                <div style={{ position:'absolute', top:2, left:diamondFirst?22:2, width:16, height:16, borderRadius:'50%', backgroundColor:'white', transition:'left 0.25s', boxShadow:'0 1px 3px rgba(0,0,0,0.15)' }} />
              </div>
            </div>
            <div style={{ display:'flex', gap:6 }}>
              <button onClick={()=>setViewGrid(true)} style={{ width:34, height:34, display:'flex', alignItems:'center', justifyContent:'center', borderRadius:8, border:'none', cursor:'pointer', backgroundColor:viewGrid?C.ink:'#e8efec', color:viewGrid?'white':C.ink }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
              </button>
              <button onClick={()=>setViewGrid(false)} style={{ width:34, height:34, display:'flex', alignItems:'center', justifyContent:'center', borderRadius:8, border:'none', cursor:'pointer', backgroundColor:!viewGrid?C.ink:'#e8efec', color:!viewGrid?'white':C.ink }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
              </button>
            </div>
          </div>
        </div>

        {/* QUICK FILTER CHIPS */}
        <div style={{ display:'flex', gap:8, marginBottom:28, flexWrap:'wrap' as const }}>
          {[
            { emoji:'✨', label:'New Arrivals' },
            { emoji:'📉', label:'Price Drop Alert' },
            { emoji:'🛍️', label:'Shop Sellers' },
          ].map(chip=>(
            <button key={chip.label} onClick={()=>setActiveChip(chip.label)}
              style={{ display:'flex', alignItems:'center', gap:6, padding:'8px 16px', borderRadius:100, fontSize:12, fontWeight:700, cursor:'pointer', transition:'all 0.15s', border:activeChip===chip.label?'none':'1px solid rgba(186,202,197,0.5)', backgroundColor:activeChip===chip.label?C.ink:'white', color:activeChip===chip.label?'white':'#3c4a46' }}
              onMouseEnter={e=>{if(activeChip!==chip.label){e.currentTarget.style.borderColor=C.mint;e.currentTarget.style.color=C.ink}}}
              onMouseLeave={e=>{if(activeChip!==chip.label){e.currentTarget.style.borderColor='rgba(186,202,197,0.5)';e.currentTarget.style.color='#3c4a46'}}}>
              {chip.emoji} {chip.label}
            </button>
          ))}
        </div>

        {/* FEATURED */}
        <section style={{ marginBottom:48 }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:20 }}>
            <h2 style={{ ...UB, fontSize:13, color:C.ink, textTransform:'uppercase' as const, letterSpacing:'0.1em' }}>FEATURED PREMIUM BABY ITEMS</h2>
            <Link href="#" style={{ color:C.mint, fontWeight:700, fontSize:13, textDecoration:'none', display:'flex', alignItems:'center', gap:4 }}>View all Featured <ChevronRight size={14} /></Link>
          </div>
          {viewGrid ? (
            <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:20 }}>
              {realFeaturedListings.map(item=><ListingCard key={item.id} item={item} locale={locale} />)}
            </div>
          ) : (
            <div style={{ display:'flex', flexDirection:'column' as const, gap:12 }}>
              {realFeaturedListings.map(item=>(
                <div key={item.id} style={{ display:'flex', backgroundColor:'white', borderRadius:20, border:'1px solid rgba(107,122,118,0.1)', overflow:'hidden', height:120 }}>
                  <img src={item.image} alt={item.title} style={{ width:120, height:'100%', objectFit:'cover' as const, flexShrink:0 }} />
                  <div style={{ flex:1, padding:'14px 18px', display:'flex', flexDirection:'column' as const, justifyContent:'space-between' }}>
                    <div>
                      <p style={{ fontSize:11, color:C.muted, marginBottom:3 }}>{item.location}</p>
                      <h4 style={{ fontSize:14, fontWeight:900, color:C.ink }}>{item.title}</h4>
                    </div>
                    <p style={{ fontSize:17, fontWeight:900, color:C.mint }}>{item.price.toLocaleString()} MAD</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* IMMO PRO BANNER */}
        <section style={{ marginBottom:48 }}>
          <div style={{ position:'relative', height:220, borderRadius:40, overflow:'hidden', cursor:'pointer', boxShadow:'0 20px 60px rgba(0,0,0,0.15)' }}>
            <img src={I.immo} alt="Immo Pro" style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover' }} />
            <div style={{ position:'absolute', inset:0, background:'linear-gradient(to right,rgba(22,29,27,0.92) 0%,rgba(22,29,27,0.5) 60%,transparent)' }} />
            <div style={{ position:'absolute', inset:0, display:'flex', flexDirection:'column' as const, justifyContent:'center', padding:'0 56px' }}>
              <span style={{ backgroundColor:C.mint, color:'white', fontSize:9, ...UB, padding:'4px 14px', borderRadius:100, textTransform:'uppercase' as const, letterSpacing:'0.12em', display:'inline-block', marginBottom:14, width:'fit-content' }}>SouKni Immo Pro</span>
              <h2 style={{ ...UB, fontSize:'clamp(20px,3vw,32px)', color:'white', marginBottom:20, lineHeight:1.1 }}>List your luxury property<br/>where the elite browse.</h2>
              <div style={{ display:'flex', gap:12 }}>
                <Link href={`/${locale}/property`} style={{ textDecoration:'none' }}>
                  <button style={{ backgroundColor:'white', color:C.ink, border:'none', padding:'11px 28px', borderRadius:100, fontSize:12, ...UB, cursor:'pointer' }}>Explore Properties</button>
                </Link>
                <button style={{ backgroundColor:'transparent', color:'white', border:'1px solid rgba(255,255,255,0.4)', padding:'11px 28px', borderRadius:100, fontSize:12, fontWeight:700, cursor:'pointer' }}>Contact Expert</button>
              </div>
            </div>
          </div>
        </section>

        {/* EXCLUSIVE COLLECTION — CLEAN BENTO */}
        <section style={{ marginBottom:48 }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:20 }}>
            <h2 style={{ ...UB, fontSize:22, color:C.mint }}>Exclusive Baby Collection</h2>
            <Link href="#" style={{ color:C.mint, fontWeight:700, fontSize:13, textDecoration:'none', display:'flex', alignItems:'center', gap:4 }}>View all <ChevronRight size={14} /></Link>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'1.4fr 1fr', gridTemplateRows:'280px 280px', gap:16, marginBottom:16 }}>
            <div style={{ gridRow:'span 2' }}>
              <div style={{ height:'100%', borderRadius:32, overflow:'hidden', position:'relative', cursor:'pointer' }}
                onMouseEnter={e=>{const img=e.currentTarget.querySelector('img') as HTMLImageElement;if(img)img.style.transform='scale(1.06)'}}
                onMouseLeave={e=>{const img=e.currentTarget.querySelector('img') as HTMLImageElement;if(img)img.style.transform='scale(1)'}}>
                <img src={realExclusiveListings[0].image} alt={realExclusiveListings[0].title} style={{ width:'100%', height:'100%', objectFit:'cover', transition:'transform 0.6s' }} />
                <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top,rgba(0,0,0,0.85),rgba(0,0,0,0.05))' }} />
                <div style={{ position:'absolute', top:16, left:16 }}><span style={{ background:'linear-gradient(135deg,#22d4a8,#0f9b8e)', color:'white', fontSize:'8px', fontWeight:900, padding:'3px 10px', borderRadius:100, textTransform:'uppercase' as const, letterSpacing:'0.08em' }}>✦ SOUKNI CERTIFIED</span></div>
                <div style={{ position:'absolute', bottom:24, left:24, right:24 }}>
                  <p style={{ ...HK, fontSize:18, color:'white', marginBottom:8, lineHeight:1.2 }}>{realExclusiveListings[0].title}</p>
                  <p style={{ ...HK, fontSize:22, color:C.mint, marginBottom:14 }}>{realExclusiveListings[0].price.toLocaleString()} MAD</p>
                  <div style={{ display:'flex', gap:8 }}>
                    <button onClick={e=>e.preventDefault()} style={{ flex:1, backgroundColor:'rgba(255,255,255,0.15)', backdropFilter:'blur(8px)', color:'white', border:'1px solid rgba(255,255,255,0.3)', padding:'9px 0', borderRadius:100, fontWeight:700, fontSize:12, cursor:'pointer' }}>Chat</button>
                    <button onClick={e=>e.preventDefault()} style={{ flex:1, backgroundColor:'#25D366', color:'white', border:'none', padding:'9px 0', borderRadius:100, fontWeight:700, fontSize:12, cursor:'pointer' }}>WhatsApp</button>
                  </div>
                </div>
              </div>
            </div>
            <div style={{ borderRadius:24, overflow:'hidden', position:'relative', cursor:'pointer' }}
              onMouseEnter={e=>{const img=e.currentTarget.querySelector('img') as HTMLImageElement;if(img)img.style.transform='scale(1.06)'}}
              onMouseLeave={e=>{const img=e.currentTarget.querySelector('img') as HTMLImageElement;if(img)img.style.transform='scale(1)'}}>
              <img src={realExclusiveListings[1].image} alt={realExclusiveListings[1].title} style={{ width:'100%', height:'100%', objectFit:'cover', transition:'transform 0.6s' }} />
              <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top,rgba(0,0,0,0.8),rgba(0,0,0,0.05))' }} />
              <div style={{ position:'absolute', top:12, left:12 }}><span style={{ background:'linear-gradient(135deg,#22d4a8,#0f9b8e)', color:'white', fontSize:'8px', fontWeight:900, padding:'3px 8px', borderRadius:100, textTransform:'uppercase' as const }}>✦ CERTIFIED</span></div>
              <div style={{ position:'absolute', bottom:16, left:16, right:16 }}>
                <p style={{ ...HK, fontSize:14, color:'white', marginBottom:4 }}>{realExclusiveListings[1].title}</p>
                <p style={{ ...HK, fontSize:17, color:C.mint }}>{realExclusiveListings[1].price.toLocaleString()} MAD</p>
              </div>
            </div>
            <div style={{ borderRadius:24, overflow:'hidden', position:'relative', cursor:'pointer' }}
              onMouseEnter={e=>{const img=e.currentTarget.querySelector('img') as HTMLImageElement;if(img)img.style.transform='scale(1.06)'}}
              onMouseLeave={e=>{const img=e.currentTarget.querySelector('img') as HTMLImageElement;if(img)img.style.transform='scale(1)'}}>
              <img src={realExclusiveListings[2].image} alt={realExclusiveListings[2].title} style={{ width:'100%', height:'100%', objectFit:'cover', transition:'transform 0.6s' }} />
              <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top,rgba(0,0,0,0.8),rgba(0,0,0,0.05))' }} />
              <div style={{ position:'absolute', top:12, left:12 }}><span style={{ background:'linear-gradient(135deg,#22d4a8,#0f9b8e)', color:'white', fontSize:'8px', fontWeight:900, padding:'3px 8px', borderRadius:100, textTransform:'uppercase' as const }}>✦ CERTIFIED</span></div>
              <div style={{ position:'absolute', bottom:16, left:16, right:16 }}>
                <p style={{ ...HK, fontSize:14, color:'white', marginBottom:4 }}>{realExclusiveListings[2].title}</p>
                <p style={{ ...HK, fontSize:17, color:C.mint }}>{realExclusiveListings[2].price.toLocaleString()} MAD</p>
              </div>
            </div>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 }}>
            <ListingCard item={realExclusiveListings[3]} locale={locale} compact />
            <div style={{ borderRadius:24, overflow:'hidden', position:'relative', cursor:'pointer', minHeight:200 }}>
              <img src={I.b5} alt="Baby Pro" style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover' }} />
              <div style={{ position:'absolute', inset:0, background:'linear-gradient(135deg,rgba(22,29,27,0.92),rgba(22,29,27,0.4))' }} />
              <div style={{ position:'absolute', inset:0, display:'flex', flexDirection:'column' as const, justifyContent:'center', padding:'0 28px' }}>
                <span style={{ background:'linear-gradient(135deg,#22d4a8,#0f9b8e)', color:'white', fontSize:9, fontWeight:900, padding:'4px 12px', borderRadius:100, textTransform:'uppercase' as const, letterSpacing:'0.1em', display:'inline-block', marginBottom:10, width:'fit-content' }}>SouKni Baby Pro</span>
                <h3 style={{ ...UB, fontSize:18, color:'white', marginBottom:12, lineHeight:1.2 }}>Find certified baby<br/>gear for every stage.</h3>
                <button style={{ backgroundColor:'white', color:C.ink, border:'none', padding:'9px 20px', borderRadius:100, fontSize:11, ...UB, cursor:'pointer', alignSelf:'flex-start' as const }}>Explore All</button>
              </div>
            </div>
          </div>
        </section>

        {/* AUTO PRO BANNER */}
        <section style={{ marginBottom:48 }}>
          <div style={{ position:'relative', height:220, borderRadius:40, overflow:'hidden', cursor:'pointer', boxShadow:'0 20px 60px rgba(0,0,0,0.15)' }}>
            <img src={I.auto} alt="Auto Pro" style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover' }} />
            <div style={{ position:'absolute', inset:0, background:'linear-gradient(to right,rgba(22,29,27,0.92) 0%,rgba(22,29,27,0.5) 60%,transparent)' }} />
            <div style={{ position:'absolute', inset:0, display:'flex', flexDirection:'column' as const, justifyContent:'center', padding:'0 56px' }}>
              <span style={{ backgroundColor:'#8d4f00', color:'white', fontSize:9, ...UB, padding:'4px 14px', borderRadius:100, textTransform:'uppercase' as const, letterSpacing:'0.12em', display:'inline-block', marginBottom:14, width:'fit-content' }}>SouKni Auto Pro</span>
              <h2 style={{ ...UB, fontSize:'clamp(20px,3vw,32px)', color:'white', marginBottom:20, lineHeight:1.1 }}>Premium Vehicles for<br/>the Elite Shopper.</h2>
              <div style={{ display:'flex', gap:12 }}>
                <Link href={`/${locale}/motors`} style={{ textDecoration:'none' }}>
                  <button style={{ backgroundColor:'white', color:C.ink, border:'none', padding:'11px 28px', borderRadius:100, fontSize:12, ...UB, cursor:'pointer' }}>Browse &amp; Explore</button>
                </Link>
                <button style={{ backgroundColor:'transparent', color:'white', border:'1px solid rgba(255,255,255,0.4)', padding:'11px 28px', borderRadius:100, fontSize:12, fontWeight:700, cursor:'pointer' }}>Contact Expert</button>
              </div>
            </div>
          </div>
        </section>

        {/* PRO DISCOVERY GRID */}
        <section style={{ marginBottom:48 }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:20 }}>
            <h2 style={{ ...UB, fontSize:20, color:C.ink }}>Pro Baby Item Discoveries</h2>
            <Link href="#" style={{ color:C.mint, fontWeight:700, fontSize:13, textDecoration:'none', display:'flex', alignItems:'center', gap:4 }}>View all <ChevronRight size={14} /></Link>
          </div>
          <div style={{ display:'flex', flexDirection:'column' as const, gap:16 }}>
            {filteredDiscovery.length === 0 ? (
              <div style={{ textAlign:'center' as const, padding:'48px 20px', backgroundColor:'white', borderRadius:24 }}>
                <p style={{ fontSize:16, fontWeight:700, color:C.ink, marginBottom:8 }}>No results found</p>
                <p style={{ fontSize:13, color:C.muted, marginBottom:16 }}>Try a different city, keyword or price range</p>
                <button onClick={()=>{setHeroCity('');setHeroKeyword('');setApplied({city:'',keyword:''});setPrice('Any Price')}}
                  style={{ padding:'10px 24px', borderRadius:100, backgroundColor:C.mint, color:'white', border:'none', fontWeight:700, fontSize:13, cursor:'pointer' }}>Clear Filters</button>
              </div>
            ) : viewGrid ? (
              <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:16 }}>
                {filteredDiscovery.map(item=><ListingCard key={item.id} item={item} locale={locale} compact />)}
              </div>
            ) : (
              <div style={{ display:'flex', flexDirection:'column' as const, gap:12 }}>
                {filteredDiscovery.map(item=>(
                  <div key={item.id} style={{ display:'flex', backgroundColor:'white', borderRadius:20, border:'1px solid rgba(107,122,118,0.1)', overflow:'hidden', height:120 }}>
                    <img src={item.image} alt={item.title} style={{ width:120, height:'100%', objectFit:'cover' as const, flexShrink:0 }} />
                    <div style={{ flex:1, padding:'14px 18px', display:'flex', flexDirection:'column' as const, justifyContent:'space-between' }}>
                      <div>
                        <p style={{ fontSize:11, color:C.muted, marginBottom:3 }}>{item.location}</p>
                        <h4 style={{ fontSize:14, fontWeight:900, color:C.ink }}>{item.title}</h4>
                      </div>
                      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                        <p style={{ fontSize:17, fontWeight:900, color:C.mint }}>{item.price.toLocaleString()} MAD</p>
                        <div style={{ display:'flex', gap:8 }}>
                          <button style={{ padding:'7px 14px', borderRadius:10, border:`1px solid ${C.ink}`, backgroundColor:'transparent', color:C.ink, fontSize:10, fontWeight:700, cursor:'pointer' }}>Chat</button>
                          <button style={{ padding:'7px 14px', borderRadius:10, border:'none', backgroundColor:'#25D366', color:'white', fontSize:10, fontWeight:700, cursor:'pointer' }}>WhatsApp</button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* PAGINATION */}
        <div style={{ display:'flex', justifyContent:'center', alignItems:'center', gap:8, marginBottom:56 }}>
          {[1,2,3,4].map(p=>(
            <button key={p} onClick={()=>setPage(p)}
              style={{ width:36, height:36, borderRadius:10, border:page===p?'none':'1px solid #e2e8f0', backgroundColor:page===p?C.mint:'white', color:page===p?'white':C.ink, fontWeight:700, fontSize:13, cursor:'pointer' }}>
              {p}
            </button>
          ))}
          <button style={{ padding:'0 16px', height:36, borderRadius:10, border:'1px solid #e2e8f0', backgroundColor:'white', color:C.ink, fontWeight:700, fontSize:13, cursor:'pointer', display:'flex', alignItems:'center', gap:4 }}>
            Next <ChevronRight size={14} />
          </button>
        </div>

        {/* DIAMOND BANNER */}
        <section style={{ position:'relative', borderRadius:40, overflow:'hidden', marginBottom:40 }}>
          <img src={I.hero} alt="Diamond" style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover' }} />
          <div style={{ position:'absolute', inset:0, background:'linear-gradient(135deg,rgba(15,23,42,0.96),rgba(15,23,42,0.7))' }} />
          <div style={{ position:'relative', zIndex:1, padding:'56px 64px', maxWidth:640 }}>
            <span style={{ display:'inline-flex', alignItems:'center', gap:6, background:'linear-gradient(135deg,#22d4a8,#0f9b8e)', color:'white', fontSize:9, ...UB, padding:'5px 16px', borderRadius:100, textTransform:'uppercase' as const, letterSpacing:'0.12em', marginBottom:20 }}>✦ SOUKNI CERTIFIED</span>
            <h2 style={{ ...UB, fontSize:'clamp(28px,4vw,48px)', color:'white', marginBottom:16, lineHeight:1.05 }}>Unlock the Power of Diamond.</h2>
            <p style={{ fontSize:15, color:'rgba(255,255,255,0.72)', lineHeight:1.7, marginBottom:28 }}>Priority placement, boosted visibility, and full access to Morocco's most discerning parents. Get started today.</p>
            <div style={{ display:'flex', gap:12 }}>
              <button style={{ backgroundColor:C.mint, color:'white', border:'none', padding:'13px 28px', borderRadius:100, fontSize:13, ...UB, cursor:'pointer' }}>Get Started</button>
              <button style={{ backgroundColor:'transparent', color:'white', border:'1px solid rgba(255,255,255,0.3)', padding:'13px 28px', borderRadius:100, fontSize:13, fontWeight:700, cursor:'pointer' }}>Learn More</button>
            </div>
          </div>
        </section>

        {/* JOIN THE SOUKNI FAMILY */}
        <section style={{ borderRadius:40, background:'linear-gradient(135deg,#22d4a8,#0f9b8e)', padding:'56px 64px', display:'flex', alignItems:'center', justifyContent:'space-between', gap:40, flexWrap:'wrap' as const }}>
          <div>
            <h2 style={{ ...UB, fontSize:'clamp(28px,4vw,44px)', color:'white', marginBottom:12, lineHeight:1.05 }}>JOIN THE SOUKNI FAMILY</h2>
            <p style={{ fontSize:15, color:'rgba(255,255,255,0.85)', maxWidth:480, lineHeight:1.7 }}>Get early access to new drops, exclusive member deals, and Morocco's finest baby item listings.</p>
            <div style={{ display:'flex', gap:12, marginTop:24 }}>
              <button style={{ backgroundColor:'white', color:C.mint, border:'none', padding:'12px 24px', borderRadius:100, fontWeight:800, fontSize:13, cursor:'pointer', display:'flex', alignItems:'center', gap:8 }}>🍎 App Store</button>
              <button style={{ backgroundColor:'rgba(255,255,255,0.15)', color:'white', border:'1px solid rgba(255,255,255,0.4)', padding:'12px 24px', borderRadius:100, fontWeight:800, fontSize:13, cursor:'pointer', display:'flex', alignItems:'center', gap:8 }}>▶ Google Play</button>
            </div>
          </div>
          <Link href={`/${locale}/post-ad`} style={{ textDecoration:'none' }}>
            <span style={{ display:'inline-block', backgroundColor:'white', color:C.mint, padding:'16px 36px', borderRadius:100, fontWeight:900, fontSize:14, cursor:'pointer', whiteSpace:'nowrap' as const, ...UB }}>Post Free Ad →</span>
          </Link>
        </section>

      </div>
    </div>
  )
}
