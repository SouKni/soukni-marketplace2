'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Heart, Search, ChevronRight, ChevronLeft, MapPin, Phone, Maximize, TrendingUp, Building, Layers } from 'lucide-react'
import { useListings } from '@/hooks/useListings'

const C = { mint:'#22d4a8', mintDk:'#0f9b8e', ink:'#161d1b', surface:'#f4fbf8', muted:'#6b7a76' }
const UB = { fontFamily:"'Inter',sans-serif", fontWeight:900, letterSpacing:'-0.05em' } as const
const CB = { fontFamily:"'Hanken Grotesk',sans-serif", fontWeight:900, letterSpacing:'-0.03em' } as const

const COMM_CATS = [
  { label:'Offices',          slug:'offices',       count:'2,840', image:'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&w=600',    desc:'From serviced desks to full floors' },
  { label:'Retail & Shops',   slug:'retail',        count:'1,920', image:'https://images.pexels.com/photos/1109561/pexels-photo-1109561.jpeg?auto=compress&w=600',    desc:'High-street and mall boutiques' },
  { label:'Warehouses',       slug:'warehouses',    count:'680',   image:'https://images.pexels.com/photos/2219024/pexels-photo-2219024.jpeg?auto=compress&w=600',    desc:'Storage, logistics and industrial' },
  { label:'Factories',        slug:'factories',     count:'340',   image:'https://images.pexels.com/photos/1595109/pexels-photo-1595109.jpeg?auto=compress&w=600',    desc:'Light and heavy manufacturing units' },
  { label:'Restaurants & Food',slug:'restaurants',  count:'560',   image:'https://images.pexels.com/photos/380769/pexels-photo-380769.jpeg?auto=compress&w=600',     desc:'Equipped kitchens and dining spaces' },
  { label:'Hotels & Guesthouses',slug:'hotels-comm',count:'280',   image:'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&w=600',     desc:'Hospitality assets for investors' },
  { label:'Land & Plots',     slug:'land-plots',    count:'1,240', image:'https://images.pexels.com/photos/162553/excavator-construction-site-machine-162553.jpeg?auto=compress&w=600', desc:'Commercial development land' },
]

const featuredListings = [
  { id:'cm1', badge:'Verified',    badge2:'For Sale',   title:'Skyline Executive Tower — Full Floor',         type:'Office',    price:'18,500,000', unit:'MAD',    area:850,  floor:'12th',   parking:20, yield_pct:6.8, location:'Casablanca Finance City',    image:'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&w=700' },
  { id:'cm2', badge:'Exclusive',   badge2:'For Rent',   title:'Prestige Boutique Unit — Menara Mall',         type:'Retail',    price:'32,000',     unit:'MAD/mo', area:120,  floor:'GF',     parking:4,  yield_pct:null, location:'Marrakech, Menara Mall',     image:'https://images.pexels.com/photos/1109561/pexels-photo-1109561.jpeg?auto=compress&w=700' },
  { id:'cm3', badge:'Verified',    badge2:'For Sale',   title:'Modern Industrial Warehouse — Port Zone',      type:'Warehouse', price:'6,800,000',  unit:'MAD',    area:2400, floor:null,     parking:30, yield_pct:7.2, location:'Tangier Med Zone',            image:'https://images.pexels.com/photos/2219024/pexels-photo-2219024.jpeg?auto=compress&w=700' },
  { id:'cm4', badge:'New Listing', badge2:'For Rent',   title:'Street-Level Restaurant Space — Gueliz',      type:'Restaurant',price:'24,000',     unit:'MAD/mo', area:210,  floor:'GF',     parking:8,  yield_pct:null, location:'Marrakech, Gueliz',          image:'https://images.pexels.com/photos/380769/pexels-photo-380769.jpeg?auto=compress&w=700' },
  { id:'cm5', badge:'Exclusive',   badge2:'For Sale',   title:'Boutique Hotel — 24 Rooms Medina View',        type:'Hotel',     price:'28,000,000', unit:'MAD',    area:1800, floor:'5F',     parking:12, yield_pct:8.1, location:'Fès, Médina Perimeter',      image:'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&w=700' },
  { id:'cm6', badge:'Verified',    badge2:'For Rent',   title:'Open-Plan Co-working Office — Agdal',         type:'Office',    price:'45,000',     unit:'MAD/mo', area:450,  floor:'3rd',    parking:10, yield_pct:null, location:'Rabat, Agdal',               image:'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&w=700' },
]

const moreListings = [
  { id:'cm7',  badge:'Verified',    badge2:'For Sale',   title:'Prime Retail Strip — Anfa Place',             type:'Retail',    price:'9,200,000',  unit:'MAD',    area:380,  floor:'GF',     parking:6,  yield_pct:5.9, location:'Casablanca, Anfa',           image:'https://images.pexels.com/photos/1109561/pexels-photo-1109561.jpeg?auto=compress&w=700' },
  { id:'cm8',  badge:'New Listing', badge2:'For Rent',   title:'Factory Unit — Ain Sebaa Industrial Zone',    type:'Factory',   price:'85,000',     unit:'MAD/mo', area:3200, floor:null,     parking:40, yield_pct:null, location:'Casablanca, Ain Sebaa',      image:'https://images.pexels.com/photos/1595109/pexels-photo-1595109.jpeg?auto=compress&w=700' },
  { id:'cm9',  badge:'Exclusive',   badge2:'For Sale',   title:'Mixed-Use Development Plot 8,000m²',          type:'Land',      price:'42,000,000', unit:'MAD',    area:8000, floor:null,     parking:null,yield_pct:null, location:'Rabat, Route de Kenitra',    image:'https://images.pexels.com/photos/162553/excavator-construction-site-machine-162553.jpeg?auto=compress&w=700' },
  { id:'cm10', badge:'Verified',    badge2:'For Rent',   title:'Ground Floor Showroom — Boulevard Zerktouni', type:'Retail',    price:'18,000',     unit:'MAD/mo', area:95,   floor:'GF',     parking:2,  yield_pct:null, location:'Casablanca, Zerktouni',      image:'https://images.pexels.com/photos/1109561/pexels-photo-1109561.jpeg?auto=compress&w=700' },
  { id:'cm11', badge:'Verified',    badge2:'For Sale',   title:'Class-A Office Building 6 Floors',            type:'Office',    price:'95,000,000', unit:'MAD',    area:6500, floor:'6F',     parking:80, yield_pct:7.5, location:'Casablanca Finance City',    image:'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&w=700' },
  { id:'cm12', badge:'New Listing', badge2:'For Rent',   title:'Serviced Offices — Flexible Lease',           type:'Office',    price:'8,500',      unit:'MAD/mo', area:45,   floor:'2nd',    parking:2,  yield_pct:null, location:'Rabat, Hassan',              image:'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&w=700' },
]

const highlights = [
  { icon:'🏢', label:'2,840',    sub:'Office Spaces'      },
  { icon:'🏪', label:'1,920',    sub:'Retail Units'        },
  { icon:'🏭', label:'1,020',    sub:'Industrial Units'    },
  { icon:'📈', label:'6.8%',     sub:'Avg. Rental Yield'  },
]

type Listing = typeof featuredListings[0]

function BadgeChip({ label, green }: { label: string; green?: boolean }) {
  return (
    <span style={{ backgroundColor:green||label==='For Rent'?C.mint:label==='For Sale'?C.ink:'rgba(15,23,42,0.85)', color:'white', fontSize:'9px', fontWeight:800, padding:'3px 9px', borderRadius:'4px', letterSpacing:'0.08em', textTransform:'uppercase' as const, whiteSpace:'nowrap' as const }}>
      {label}
    </span>
  )
}

function CommercialCard({ item, locale, view }: { item: Listing; locale: string; view: 'grid'|'list' }) {
  const [saved, setSaved] = useState(false)
  const [hov,   setHov  ] = useState(false)

  if (view === 'list') return (
    <Link href={`/${locale}/listing/${item.id}`} style={{ textDecoration:'none' }}>
      <article onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
        style={{ backgroundColor:'white', borderRadius:'18px', overflow:'hidden', boxShadow:hov?'0 12px 36px rgba(0,0,0,0.1)':'0 2px 8px rgba(0,0,0,0.05)', border:`1px solid ${hov?C.mint:'rgba(0,0,0,0.06)'}`, transition:'all 0.3s', display:'flex', cursor:'pointer', marginBottom:14 }}>
        <div style={{ position:'relative', width:240, flexShrink:0, overflow:'hidden' }}>
          <img src={item.image} alt={item.title} style={{ width:'100%', height:'100%', objectFit:'cover', transition:'transform 0.5s', transform:hov?'scale(1.04)':'scale(1)' }} />
          <div style={{ position:'absolute', top:10, left:10, display:'flex', gap:6 }}>
            <BadgeChip label={item.badge} />
            {item.badge2 && <BadgeChip label={item.badge2} />}
          </div>
          {item.yield_pct && (
            <div style={{ position:'absolute', bottom:10, left:10, backgroundColor:`${C.mint}f0`, padding:'5px 10px', borderRadius:8, display:'flex', alignItems:'center', gap:4 }}>
              <TrendingUp size={11} color="white" />
              <span style={{ fontSize:'11px', fontWeight:800, color:'white' }}>{item.yield_pct}% yield</span>
            </div>
          )}
        </div>
        <div style={{ padding:'20px 24px', flex:1, display:'flex', flexDirection:'column', justifyContent:'space-between' }}>
          <div>
            <p style={{ fontSize:11, color:C.mint, fontWeight:800, textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:4 }}>{item.type}</p>
            <h3 style={{ ...CB, fontSize:'16px', color:hov?C.mint:C.ink, marginBottom:6, transition:'color 0.2s', lineHeight:1.3 }}>{item.title}</h3>
            <div style={{ display:'flex', alignItems:'center', gap:5, marginBottom:10 }}>
              <MapPin size={12} color={C.muted}/><span style={{ fontSize:'13px', color:C.muted, fontWeight:600 }}>{item.location}</span>
            </div>
            <div style={{ display:'flex', gap:16, flexWrap:'wrap' }}>
              <span style={{ fontSize:'12px', color:'#475569', fontWeight:600, display:'flex', alignItems:'center', gap:4 }}><Maximize size={13} color={C.mint}/>{item.area.toLocaleString()}m²</span>
              {item.floor && <span style={{ fontSize:'12px', color:'#475569', fontWeight:600, display:'flex', alignItems:'center', gap:4 }}><Layers size={13} color={C.mint}/>Floor: {item.floor}</span>}
              {item.parking && <span style={{ fontSize:'12px', color:'#475569', fontWeight:600, display:'flex', alignItems:'center', gap:4 }}>🅿️ {item.parking} spaces</span>}
            </div>
          </div>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginTop:16, paddingTop:14, borderTop:'1px solid #f1f5f9' }}>
            <div>
              <span style={{ ...CB, fontSize:'22px', color:C.mint }}>{item.price} </span>
              <span style={{ fontSize:'13px', color:C.muted, fontWeight:600 }}>MAD{item.unit.includes('/')?' '+item.unit.replace('MAD/','/ '):''}</span>
            </div>
            <div style={{ display:'flex', gap:8 }}>
              <button onClick={e=>e.preventDefault()} style={{ padding:'9px 18px', borderRadius:100, backgroundColor:C.surface, color:C.ink, border:'none', fontSize:'13px', fontWeight:700, cursor:'pointer', fontFamily:"'Inter',sans-serif" }}>Message</button>
              <button onClick={e=>e.preventDefault()} style={{ padding:'9px 20px', borderRadius:100, backgroundColor:C.mint, color:'white', border:'none', fontSize:'13px', fontWeight:700, cursor:'pointer', display:'flex', alignItems:'center', gap:6, fontFamily:"'Inter',sans-serif" }}><Phone size={13}/>Contact</button>
            </div>
          </div>
        </div>
      </article>
    </Link>
  )

  return (
    <Link href={`/${locale}/listing/${item.id}`} style={{ textDecoration:'none' }}>
      <article onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
        style={{ backgroundColor:'white', borderRadius:'20px', overflow:'hidden', boxShadow:hov?'0 20px 48px rgba(0,0,0,0.13)':'0 2px 12px rgba(0,0,0,0.06)', border:`1px solid ${hov?C.mint:'rgba(0,0,0,0.06)'}`, transition:'all 0.3s', cursor:'pointer' }}>
        <div style={{ position:'relative', aspectRatio:'16/10', overflow:'hidden' }}>
          <img src={item.image} alt={item.title} style={{ width:'100%', height:'100%', objectFit:'cover', transition:'transform 0.6s', transform:hov?'scale(1.06)':'scale(1)' }} />
          <div style={{ position:'absolute', top:'12px', left:'12px', display:'flex', gap:'6px', flexWrap:'wrap' }}>
            <BadgeChip label={item.badge} />
            {item.badge2 && <BadgeChip label={item.badge2} />}
          </div>
          <button onClick={e=>{e.preventDefault();setSaved(!saved)}}
            style={{ position:'absolute', top:'10px', right:'10px', width:'34px', height:'34px', borderRadius:'50%', backgroundColor:'rgba(255,255,255,0.9)', border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', boxShadow:'0 2px 8px rgba(0,0,0,0.15)' }}>
            <Heart size={16} fill={saved?'#ef4444':'none'} color={saved?'#ef4444':'#6b7a76'} />
          </button>
          {item.yield_pct && (
            <div style={{ position:'absolute', bottom:'12px', left:'12px', background:`linear-gradient(135deg,${C.mint},${C.mintDk})`, padding:'5px 12px', borderRadius:'8px', display:'flex', alignItems:'center', gap:5 }}>
              <TrendingUp size={12} color="white" />
              <span style={{ color:'white', fontSize:'11px', fontWeight:800 }}>{item.yield_pct}% yield</span>
            </div>
          )}
          <div style={{ position:'absolute', bottom:'12px', right:'12px', backgroundColor:'rgba(22,29,27,0.75)', backdropFilter:'blur(8px)', padding:'4px 10px', borderRadius:'6px' }}>
            <span style={{ color:'white', fontSize:'11px', fontWeight:700 }}>{item.type}</span>
          </div>
        </div>
        <div style={{ padding:'16px 18px' }}>
          <h3 style={{ ...CB, fontSize:'14px', color:hov?C.mint:C.ink, marginBottom:'6px', lineHeight:1.3, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' as const, transition:'color 0.2s' }}>{item.title}</h3>
          <div style={{ display:'flex', alignItems:'center', gap:'5px', marginBottom:'10px' }}>
            <MapPin size={12} color={C.muted} />
            <span style={{ fontSize:'12px', color:C.muted, fontWeight:600 }}>{item.location}</span>
          </div>
          <div style={{ display:'flex', gap:'10px', marginBottom:'12px', paddingTop:'10px', borderTop:'1px solid #f1f5f9', flexWrap:'wrap' }}>
            <span style={{ display:'flex', alignItems:'center', gap:'4px', fontSize:'11px', color:'#475569', fontWeight:600 }}><Maximize size={12} color={C.mint}/>{item.area.toLocaleString()}m²</span>
            {item.floor && <span style={{ display:'flex', alignItems:'center', gap:'4px', fontSize:'11px', color:'#475569', fontWeight:600 }}><Layers size={12} color={C.mint}/>{item.floor}</span>}
            {item.parking && <span style={{ fontSize:'11px', color:'#475569', fontWeight:600 }}>🅿️ {item.parking}</span>}
          </div>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
            <div>
              <span style={{ ...CB, fontSize:'18px', color:C.mint }}>{item.price} </span>
              <span style={{ fontSize:'11px', color:C.muted, fontWeight:600 }}>{item.unit.includes('/')?item.unit.replace('MAD/','MAD / '):'MAD'}</span>
            </div>
            <button onClick={e=>e.preventDefault()} style={{ display:'flex', alignItems:'center', gap:'5px', padding:'8px 14px', borderRadius:'100px', backgroundColor:C.ink, color:'white', border:'none', fontSize:'12px', fontWeight:700, cursor:'pointer', transition:'background 0.2s', fontFamily:"'Inter',sans-serif" }}
              onMouseEnter={e=>e.currentTarget.style.backgroundColor=C.mint}
              onMouseLeave={e=>e.currentTarget.style.backgroundColor=C.ink}>
              <Phone size={11}/> Contact
            </button>
          </div>
        </div>
      </article>
    </Link>
  )
}

export default function CommercialPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale }              = React.use(params)
  const [keyword, setKeyword]   = useState('')
  const [city,    setCity   ]   = useState('All Morocco')
  const [propFor, setPropFor]   = useState<'All'|'For Sale'|'For Rent'>('All')
  const [type,    setType   ]   = useState('All Types')
  const [minArea, setMinArea]   = useState('')
  const [maxArea, setMaxArea]   = useState('')
  const [priceRange, setPriceRange] = useState('Any Price')
  const [view,    setView   ]   = useState<'grid'|'list'>('grid')
  const [hovCat,  setHovCat ]   = useState<string|null>(null)
  const [seller,  setSeller ]   = useState<'All Sellers'|'SouKni Agencies'|'Verified Owners'>('All Sellers')
  const [page,    setPage   ]   = useState(1)
  const [sort,    setSort   ]   = useState('Popular')

  const cities     = ['All Morocco','Casablanca','Rabat','Marrakech','Tangier','Agadir','Fès','Meknès']
  const types      = ['All Types','Office','Retail & Shop','Warehouse','Factory','Restaurant','Hotel','Land']
  const priceRanges= ['Any Price','Under 1M MAD','1M – 5M MAD','5M – 20M MAD','20M+ MAD','Under 20K/mo','20K – 50K/mo','50K+/mo']

  const { fetchListings } = useListings()
  const [dbListings, setDbListings] = useState<any[]>([])
  useEffect(() => {
    const t = setTimeout(() => {
      fetchListings({ category: 'property', sortBy: 'newest', limit: 24 }).then(rows => setDbListings(rows || []))
    }, 400)
    return () => clearTimeout(t)
  }, [])
  function mapDbRowToCard(row: any): Listing {
    return {
      id: row.id,
      title: row.title,
      price: Math.round((row.price || 0) / 100).toLocaleString(),
      unit: 'MAD',
      area: 0,
      floor: null,
      parking: null,
      yield_pct: null,
      location: row.city,
      image: (row.images && row.images[0]) || featuredListings[0].image,
      badge: row.badge || 'Verified',
      badge2: undefined,
      type: row.subcategory || '',
    } as Listing
  }
  const hasRealData = dbListings.length > 0
  const realCards = dbListings.map(mapDbRowToCard)

  const filteredFeatured = (hasRealData ? realCards.slice(0, 6) : featuredListings).filter(l =>
    propFor === 'All' ? true : l.badge2 === propFor
  )
  const filteredMore = (hasRealData ? realCards.slice(6) : moreListings).filter(l =>
    propFor === 'All' ? true : l.badge2 === propFor
  )

  return (
    <div style={{ fontFamily:"'Inter',sans-serif", backgroundColor:C.surface, minHeight:'100vh' }}>

      {/* CINEMATIC HERO */}
      <section style={{ position:'relative', height:580, overflow:'hidden', display:'flex', alignItems:'center', justifyContent:'center' }}>
        <img src="https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&w=1600" alt="Commercial Property Morocco"
          style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover' }} />
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top, rgba(15,23,42,0.95) 0%, rgba(15,23,42,0.5) 55%, rgba(15,23,42,0.2) 100%)' }} />
        <div style={{ position:'relative', zIndex:10, textAlign:'center', padding:'0 24px', maxWidth:820, width:'100%' }}>
          <div style={{ display:'inline-flex', alignItems:'center', gap:8, backgroundColor:'rgba(34,212,168,0.15)', border:'1px solid rgba(34,212,168,0.4)', borderRadius:100, padding:'6px 18px', marginBottom:22 }}>
            <Building size={12} color={C.mint} />
            <span style={{ fontSize:11, fontWeight:800, color:C.mint, textTransform:'uppercase', letterSpacing:'0.18em' }}>SouKni Commercial &amp; Business Property</span>
          </div>
          <h1 style={{ ...UB, fontSize:'clamp(36px,6vw,70px)', color:'white', lineHeight:0.92, marginBottom:18, textTransform:'uppercase' }}>
            WHERE BUSINESS<br/><span style={{ color:C.mint }}>FINDS ITS</span><br/>ADDRESS.
          </h1>
          <p style={{ fontSize:17, color:'rgba(255,255,255,0.68)', marginBottom:36, maxWidth:560, margin:'0 auto 36px', lineHeight:1.65 }}>
            7,060+ verified commercial listings — offices, retail, warehouses, factories & investment assets across Morocco
          </p>
          {/* Hero search */}
          <div style={{ display:'flex', alignItems:'stretch', backgroundColor:'rgba(255,255,255,0.1)', backdropFilter:'blur(24px)', border:'1px solid rgba(255,255,255,0.2)', borderRadius:100, overflow:'hidden', maxWidth:740, margin:'0 auto', boxShadow:'0 8px 32px rgba(0,0,0,0.3)' }}>
            <div style={{ display:'flex', flexDirection:'column', padding:'14px 22px', flex:'0 0 150px', borderRight:'1px solid rgba(255,255,255,0.15)', gap:2 }}>
              <span style={{ fontSize:9, fontWeight:800, color:'rgba(255,255,255,0.5)', textTransform:'uppercase', letterSpacing:'0.12em' }}>City</span>
              <select value={city} onChange={e=>setCity(e.target.value)} style={{ backgroundColor:'transparent', border:'none', outline:'none', fontSize:14, fontWeight:700, color:'white', fontFamily:"'Inter',sans-serif", cursor:'pointer' }}>
                {cities.map(c=><option key={c} style={{ color:C.ink }}>{c}</option>)}
              </select>
            </div>
            <div style={{ display:'flex', flexDirection:'column', padding:'14px 22px', flex:'0 0 140px', borderRight:'1px solid rgba(255,255,255,0.15)', gap:2 }}>
              <span style={{ fontSize:9, fontWeight:800, color:'rgba(255,255,255,0.5)', textTransform:'uppercase', letterSpacing:'0.12em' }}>Type</span>
              <select value={type} onChange={e=>setType(e.target.value)} style={{ backgroundColor:'transparent', border:'none', outline:'none', fontSize:14, fontWeight:700, color:'white', fontFamily:"'Inter',sans-serif", cursor:'pointer' }}>
                {types.map(t=><option key={t} style={{ color:C.ink }}>{t}</option>)}
              </select>
            </div>
            <div style={{ display:'flex', flexDirection:'column', padding:'14px 22px', flex:1, borderRight:'1px solid rgba(255,255,255,0.15)', gap:2 }}>
              <span style={{ fontSize:9, fontWeight:800, color:'rgba(255,255,255,0.5)', textTransform:'uppercase', letterSpacing:'0.12em' }}>Keyword</span>
              <input value={keyword} onChange={e=>setKeyword(e.target.value)} placeholder="Area, building name, zone..." style={{ backgroundColor:'transparent', border:'none', outline:'none', fontSize:14, fontWeight:600, color:'white', fontFamily:"'Inter',sans-serif", padding:0 }} />
            </div>
            <button style={{ backgroundColor:C.mint, color:'white', border:'none', padding:'0 32px', fontWeight:800, fontSize:14, cursor:'pointer', flexShrink:0, transition:'background 0.15s', display:'flex', alignItems:'center', gap:8 }}
              onMouseEnter={e=>e.currentTarget.style.backgroundColor=C.mintDk}
              onMouseLeave={e=>e.currentTarget.style.backgroundColor=C.mint}>
              <Search size={16}/> Search
            </button>
          </div>
        </div>
      </section>

      {/* RICH FILTER BAR — sticky, matching rooms subpage style */}
      <div style={{ backgroundColor:'white', borderBottom:'1px solid rgba(186,202,197,0.3)', boxShadow:'0 4px 24px rgba(0,0,0,0.06)', position:'sticky', top:0, zIndex:40 }}>
        <div style={{ maxWidth:1440, margin:'0 auto', padding:'0 40px', display:'flex', alignItems:'center', height:72 }}>
          {[
            { label:'LOCATION',     content:<select value={city} onChange={e=>setCity(e.target.value)} style={{ border:'none', outline:'none', fontSize:14, fontWeight:700, color:C.ink, fontFamily:"'Inter',sans-serif", backgroundColor:'transparent', cursor:'pointer' }}>{cities.map(c=><option key={c}>{c}</option>)}</select> },
            { label:'PROPERTY FOR', content:<select value={propFor} onChange={e=>setPropFor(e.target.value as any)} style={{ border:'none', outline:'none', fontSize:14, fontWeight:700, color:C.ink, fontFamily:"'Inter',sans-serif", backgroundColor:'transparent', cursor:'pointer' }}>{['All','For Sale','For Rent'].map(o=><option key={o}>{o}</option>)}</select> },
            { label:'PROPERTY TYPE',content:<select value={type} onChange={e=>setType(e.target.value)} style={{ border:'none', outline:'none', fontSize:14, fontWeight:700, color:C.ink, fontFamily:"'Inter',sans-serif", backgroundColor:'transparent', cursor:'pointer' }}>{types.map(o=><option key={o}>{o}</option>)}</select> },
            { label:'PRICE RANGE',  content:<select value={priceRange} onChange={e=>setPriceRange(e.target.value)} style={{ border:'none', outline:'none', fontSize:14, fontWeight:700, color:C.ink, fontFamily:"'Inter',sans-serif", backgroundColor:'transparent', cursor:'pointer' }}>{priceRanges.map(o=><option key={o}>{o}</option>)}</select> },
            { label:'MIN AREA (M²)', content:<input type="number" value={minArea} onChange={e=>setMinArea(e.target.value)} placeholder="Any" style={{ border:'none', outline:'none', fontSize:14, fontWeight:700, color:C.ink, fontFamily:"'Inter',sans-serif", backgroundColor:'transparent', width:80 }} /> },
            { label:'MAX AREA (M²)', content:<input type="number" value={maxArea} onChange={e=>setMaxArea(e.target.value)} placeholder="Any" style={{ border:'none', outline:'none', fontSize:14, fontWeight:700, color:C.ink, fontFamily:"'Inter',sans-serif", backgroundColor:'transparent', width:80 }} /> },
          ].map((f,i,arr)=>(
            <div key={f.label} style={{ flex:1, padding:'0 16px', borderRight:i<arr.length-1?'1px solid rgba(186,202,197,0.25)':'none', display:'flex', flexDirection:'column', gap:2, height:'100%', justifyContent:'center' }}>
              <span style={{ fontSize:9, textTransform:'uppercase', fontWeight:800, color:C.muted, letterSpacing:'0.1em' }}>{f.label}</span>
              {f.content}
            </div>
          ))}
          <button style={{ backgroundColor:C.mint, color:'white', border:'none', padding:'12px 24px', borderRadius:100, cursor:'pointer', fontWeight:800, fontSize:13, flexShrink:0, marginLeft:12, display:'flex', alignItems:'center', gap:6, whiteSpace:'nowrap' }}
            onMouseEnter={e=>e.currentTarget.style.backgroundColor=C.mintDk}
            onMouseLeave={e=>e.currentTarget.style.backgroundColor=C.mint}>
            <Search size={15}/> SEARCH
          </button>
        </div>
      </div>

      <div style={{ maxWidth:1440, margin:'0 auto', padding:'32px 40px 80px' }}>

        {/* BREADCRUMB */}
        <nav style={{ display:'flex', alignItems:'center', gap:6, fontSize:11, fontWeight:700, color:C.muted, textTransform:'uppercase', letterSpacing:'0.07em', marginBottom:32 }}>
          {[
            { label:'Home',       href:`/${locale}` },
            { label:'Property',   href:`/${locale}/property` },
            { label:'Commercial', href:null },
          ].map((c,i,arr)=>(
            <span key={c.label} style={{ display:'flex', alignItems:'center', gap:6 }}>
              {c.href
                ? <Link href={c.href} style={{ color:C.muted, textDecoration:'none' }}
                    onMouseEnter={e=>e.currentTarget.style.color=C.mint}
                    onMouseLeave={e=>e.currentTarget.style.color=C.muted}>{c.label}</Link>
                : <span style={{ color:C.ink }}>{c.label}</span>}
              {i<arr.length-1 && <ChevronRight size={12} color={C.muted}/>}
            </span>
          ))}
        </nav>

        {/* MARKET HIGHLIGHTS */}
        <section style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:16, marginBottom:56 }}>
          {highlights.map(h=>(
            <div key={h.sub} style={{ backgroundColor:'white', borderRadius:20, padding:'22px 24px', border:'1px solid rgba(186,202,197,0.2)', boxShadow:'0 2px 8px rgba(0,0,0,0.04)', display:'flex', alignItems:'center', gap:14 }}>
              <div style={{ width:48, height:48, borderRadius:14, backgroundColor:`${C.mint}15`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:22, flexShrink:0 }}>{h.icon}</div>
              <div>
                <p style={{ ...UB, fontSize:24, color:C.ink, marginBottom:2 }}>{h.label}</p>
                <p style={{ fontSize:12, color:C.muted, fontWeight:600 }}>{h.sub}</p>
              </div>
            </div>
          ))}
        </section>

        {/* SUBCATEGORY HUB GRID */}
        <section style={{ marginBottom:64 }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:24 }}>
            <div>
              <h2 style={{ ...UB, fontSize:30, color:C.ink, marginBottom:4 }}>Browse by Property Type</h2>
              <p style={{ fontSize:15, color:C.muted }}>7,060 commercial listings across Morocco</p>
            </div>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:16 }}>
            {COMM_CATS.map(cat=>(
              <Link key={cat.slug} href={`/${locale}/property/commercial/${cat.slug}`} style={{ textDecoration:'none' }}>
                <div onMouseEnter={()=>setHovCat(cat.slug)} onMouseLeave={()=>setHovCat(null)}
                  style={{ position:'relative', borderRadius:20, overflow:'hidden', cursor:'pointer', transition:'transform 0.2s, box-shadow 0.2s', transform:hovCat===cat.slug?'scale(1.02)':'scale(1)', boxShadow:hovCat===cat.slug?'0 20px 48px rgba(0,0,0,0.18)':'0 2px 8px rgba(0,0,0,0.06)' }}>
                  <div style={{ aspectRatio:'3/2', overflow:'hidden' }}>
                    <img src={cat.image} alt={cat.label} style={{ width:'100%', height:'100%', objectFit:'cover', transition:'transform 0.5s', transform:hovCat===cat.slug?'scale(1.08)':'scale(1)' }} />
                  </div>
                  <div style={{ position:'absolute', inset:0, background:hovCat===cat.slug?'linear-gradient(to top,rgba(34,212,168,0.82),rgba(0,0,0,0.05))':'linear-gradient(to top,rgba(15,23,42,0.85),rgba(0,0,0,0.05))' }} />
                  <div style={{ position:'absolute', bottom:0, left:0, right:0, padding:'16px 18px' }}>
                    <p style={{ ...UB, fontSize:15, color:'white', marginBottom:2 }}>{cat.label}</p>
                    <p style={{ fontSize:11, color:'rgba(255,255,255,0.7)', fontWeight:600 }}>{cat.count} listings · {cat.desc}</p>
                  </div>
                </div>
              </Link>
            ))}
            {/* View More */}
            <Link href={`/${locale}/property`} style={{ textDecoration:'none' }}>
              <div onMouseEnter={()=>setHovCat('more')} onMouseLeave={()=>setHovCat(null)}
                style={{ position:'relative', borderRadius:20, overflow:'hidden', cursor:'pointer', aspectRatio:'3/2', transition:'transform 0.2s, box-shadow 0.2s', transform:hovCat==='more'?'scale(1.02)':'scale(1)', boxShadow:hovCat==='more'?'0 20px 48px rgba(0,0,0,0.18)':'0 2px 8px rgba(0,0,0,0.06)', background:hovCat==='more'?`linear-gradient(135deg,${C.mint},${C.mintDk})`:C.ink, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:8 }}>
                <ChevronRight size={28} color="white" />
                <p style={{ ...UB, fontSize:15, color:'white' }}>View More</p>
                <p style={{ fontSize:11, color:'rgba(255,255,255,0.65)', fontWeight:600 }}>All property types</p>
              </div>
            </Link>
          </div>
        </section>

        {/* IMMO PRO BANNER */}
        <section style={{ marginBottom:64 }}>
          <div style={{ position:'relative', height:210, borderRadius:32, overflow:'hidden', boxShadow:'0 20px 60px rgba(0,0,0,0.15)' }}>
            <img src="https://images.pexels.com/photos/1109561/pexels-photo-1109561.jpeg?auto=compress&w=1200" alt="Immo Pro" style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover' }} />
            <div style={{ position:'absolute', inset:0, background:'linear-gradient(to right,rgba(15,23,42,0.96) 0%,rgba(15,23,42,0.65) 60%,transparent)' }} />
            <div style={{ position:'absolute', inset:0, display:'flex', flexDirection:'column', justifyContent:'center', padding:'0 56px' }}>
              <span style={{ backgroundColor:C.mint, color:'white', fontSize:9, ...UB, padding:'4px 14px', borderRadius:100, textTransform:'uppercase', letterSpacing:'0.12em', display:'inline-block', marginBottom:12, width:'fit-content' }}>SouKni Business Pro</span>
              <h2 style={{ ...UB, fontSize:'clamp(18px,2.5vw,28px)', color:'white', marginBottom:16, lineHeight:1.1 }}>List your commercial property<br/>where serious investors browse.</h2>
              <div style={{ display:'flex', gap:10 }}>
                <Link href={`/${locale}/diamond`} style={{ textDecoration:'none' }}><button style={{ backgroundColor:'white', color:C.ink, border:'none', padding:'10px 24px', borderRadius:100, fontSize:12, ...UB, cursor:'pointer' }}>Get Certified</button></Link>
                <button style={{ backgroundColor:'transparent', color:'white', border:'1px solid rgba(255,255,255,0.35)', padding:'10px 24px', borderRadius:100, fontSize:12, fontWeight:700, cursor:'pointer' }}>Learn More</button>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURED LISTINGS */}
        <section style={{ marginBottom:64 }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:24, flexWrap:'wrap', gap:12 }}>
            <div>
              <h2 style={{ ...UB, fontSize:28, color:C.ink, marginBottom:4 }}>Featured Commercial Listings</h2>
              <p style={{ fontSize:14, color:C.muted }}>Premium verified assets — offices, retail &amp; investment</p>
            </div>
            {/* FOR SALE / FOR RENT / ALL toggle */}
            <div style={{ display:'flex', gap:8, alignItems:'center' }}>
              {/* View toggle */}
              <div style={{ display:'flex', gap:2, padding:'3px', backgroundColor:'white', borderRadius:10, border:'1px solid rgba(186,202,197,0.3)', marginRight:8 }}>
                {[{v:'grid',icon:'⊞'},{v:'list',icon:'☰'}].map(btn=>(
                  <button key={btn.v} onClick={()=>setView(btn.v as any)}
                    style={{ width:34, height:34, borderRadius:8, border:'none', cursor:'pointer', fontSize:16, backgroundColor:view===btn.v?C.ink:'transparent', color:view===btn.v?'white':C.muted, transition:'all 0.2s' }}>
                    {btn.icon}
                  </button>
                ))}
              </div>
              {(['All','For Sale','For Rent'] as const).map(f=>(
                <button key={f} onClick={()=>setPropFor(f)}
                  style={{ padding:'9px 20px', borderRadius:100, fontSize:12, fontWeight:700, border:`1.5px solid ${propFor===f?C.mint:'rgba(186,202,197,0.4)'}`, backgroundColor:propFor===f?C.mint:'white', color:propFor===f?'white':C.muted, cursor:'pointer', transition:'all 0.15s', fontFamily:"'Inter',sans-serif" }}>
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* Seller tabs */}
          <div style={{ display:'flex', gap:4, padding:'4px', backgroundColor:'#e8efec', borderRadius:100, marginBottom:24, width:'fit-content' }}>
            {(['All Sellers','SouKni Agencies','Verified Owners'] as const).map(tab=>(
              <button key={tab} onClick={()=>setSeller(tab)}
                style={{ padding:'9px 22px', borderRadius:100, fontSize:11, fontWeight:900, border:'none', cursor:'pointer', fontFamily:"'Inter',sans-serif", textTransform:'uppercase', letterSpacing:'0.06em', transition:'all 0.2s',
                  backgroundColor:seller===tab?C.ink:'transparent', color:seller===tab?'white':C.muted, boxShadow:seller===tab?'0 2px 8px rgba(0,0,0,0.15)':'none' }}>
                {tab}
              </button>
            ))}
          </div>

          {view === 'grid' ? (
            <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:24 }}>
              {filteredFeatured.map(item => <CommercialCard key={item.id} item={item} locale={locale} view="grid" />)}
            </div>
          ) : (
            <div>{filteredFeatured.map(item => <CommercialCard key={item.id} item={item} locale={locale} view="list" />)}</div>
          )}
        </section>

        {/* INVESTMENT BANNER */}
        <section style={{ marginBottom:64 }}>
          <div style={{ background:`linear-gradient(135deg, ${C.ink}, #2b3230)`, borderRadius:32, padding:'44px 52px', display:'flex', alignItems:'center', gap:48, flexWrap:'wrap' }}>
            <div style={{ flex:1, minWidth:280 }}>
              <span style={{ display:'inline-block', backgroundColor:`${C.mint}20`, color:C.mint, fontSize:10, fontWeight:800, padding:'4px 14px', borderRadius:100, textTransform:'uppercase', letterSpacing:'0.12em', marginBottom:14 }}>Investment Opportunities</span>
              <h2 style={{ ...UB, fontSize:'clamp(22px,3vw,36px)', color:'white', marginBottom:10, lineHeight:1.05 }}>High-yield commercial<br/>assets across Morocco</h2>
              <p style={{ fontSize:14, color:'rgba(255,255,255,0.55)', lineHeight:1.7, marginBottom:20 }}>Discover offices, retail strips and hospitality assets delivering 6–9% annual yields in Morocco's fastest-growing business districts.</p>
              <Link href={`/${locale}/property/commercial/offices`} style={{ textDecoration:'none' }}>
                <button style={{ backgroundColor:C.mint, color:'white', border:'none', padding:'12px 28px', borderRadius:100, fontSize:13, ...UB, cursor:'pointer' }}>Browse Investment Assets</button>
              </Link>
            </div>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:12 }}>
              {[
                { zone:'Casa Finance City', yield:'7.2%', type:'Class-A Office' },
                { zone:'Marrakech Menara',  yield:'6.8%', type:'Retail & Mall'  },
                { zone:'Tangier Med Zone',  yield:'8.1%', type:'Industrial'      },
                { zone:'Rabat Hay Riad',    yield:'5.9%', type:'Mixed-Use'       },
              ].map(z=>(
                <div key={z.zone} style={{ backgroundColor:'rgba(255,255,255,0.07)', borderRadius:14, padding:'16px 18px', border:'1px solid rgba(255,255,255,0.1)', cursor:'pointer', transition:'all 0.2s' }}
                  onMouseEnter={e=>{e.currentTarget.style.backgroundColor='rgba(34,212,168,0.12)';e.currentTarget.style.borderColor=`${C.mint}40`}}
                  onMouseLeave={e=>{e.currentTarget.style.backgroundColor='rgba(255,255,255,0.07)';e.currentTarget.style.borderColor='rgba(255,255,255,0.1)'}}>
                  <p style={{ fontSize:12, fontWeight:800, color:'white', marginBottom:4 }}>{z.zone}</p>
                  <p style={{ fontSize:10, color:'rgba(255,255,255,0.45)', marginBottom:4 }}>{z.type}</p>
                  <p style={{ fontSize:18, fontWeight:900, color:C.mint, fontFamily:"'Inter',sans-serif" }}>{z.yield}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* MORE LISTINGS */}
        <section style={{ marginBottom:64 }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:24 }}>
            <div>
              <h2 style={{ ...UB, fontSize:28, color:C.ink, marginBottom:4 }}>More Commercial Properties</h2>
              <p style={{ fontSize:14, color:C.muted }}>Fresh listings — updated daily</p>
            </div>
            <Link href={`/${locale}/property/commercial/offices`} style={{ color:C.mint, fontWeight:700, fontSize:13, textDecoration:'none', display:'flex', alignItems:'center', gap:4 }}>
              View all <ChevronRight size={14}/>
            </Link>
          </div>
          {view === 'grid' ? (
            <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:24 }}>
              {filteredMore.map(item => <CommercialCard key={item.id} item={item} locale={locale} view="grid" />)}
            </div>
          ) : (
            <div>{filteredMore.map(item => <CommercialCard key={item.id} item={item} locale={locale} view="list" />)}</div>
          )}
        </section>

        {/* TRENDING SEARCHES */}
        <section style={{ marginBottom:64 }}>
          <h2 style={{ ...UB, fontSize:22, color:C.ink, marginBottom:20 }}>Trending Commercial Searches</h2>
          <div style={{ display:'flex', gap:10, flexWrap:'wrap' }}>
            {['Office Casa Finance City','Retail Marrakech Mall','Warehouse Tangier Port','Restaurant Space Gueliz','Co-working Rabat','Factory Ain Sebaa','Hotel Investment Fès','Showroom Casablanca','Land Commercial Zone','Boutique Hivernage','Logistics Hub','Serviced Office'].map(tag=>(
              <Link key={tag} href={`/${locale}/property/commercial/offices`} style={{ textDecoration:'none' }}>
                <span style={{ display:'inline-block', padding:'9px 18px', borderRadius:100, fontSize:13, fontWeight:700, backgroundColor:'white', color:C.ink, border:'1px solid rgba(186,202,197,0.4)', cursor:'pointer', transition:'all 0.15s' }}
                  onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.backgroundColor=C.mint;(e.currentTarget as HTMLElement).style.color='white'}}
                  onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.backgroundColor='white';(e.currentTarget as HTMLElement).style.color=C.ink}}>
                  {tag}
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* DIAMOND BANNER */}
        <section style={{ position:'relative', borderRadius:40, overflow:'hidden', marginBottom:48 }}>
          <img src="https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&w=1600" alt="Diamond" style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover' }} />
          <div style={{ position:'absolute', inset:0, background:'linear-gradient(135deg,rgba(15,23,42,0.97),rgba(15,23,42,0.7))' }} />
          <div style={{ position:'relative', zIndex:1, padding:'64px 72px', maxWidth:660 }}>
            <span style={{ display:'inline-flex', alignItems:'center', gap:6, background:`linear-gradient(135deg,${C.mint},${C.mintDk})`, color:'white', fontSize:9, ...UB, padding:'5px 16px', borderRadius:100, textTransform:'uppercase', letterSpacing:'0.12em', marginBottom:22 }}>✦ SOUKNI DIAMOND</span>
            <h2 style={{ ...UB, fontSize:'clamp(26px,4vw,46px)', color:'white', marginBottom:16, lineHeight:1.05 }}>Become a Diamond<br/>Business Pro.</h2>
            <p style={{ fontSize:15, color:'rgba(255,255,255,0.65)', lineHeight:1.8, marginBottom:28, maxWidth:480 }}>Priority placement in commercial searches, verified trust badge for corporate clients, and a dedicated account manager. The fastest way to lease or sell your commercial asset in Morocco.</p>
            <div style={{ display:'flex', gap:14 }}>
              <Link href={`/${locale}/diamond`} style={{ textDecoration:'none' }}>
                <button style={{ backgroundColor:C.mint, color:'white', border:'none', padding:'14px 32px', borderRadius:100, fontSize:14, ...UB, cursor:'pointer', boxShadow:`0 4px 20px ${C.mint}50` }}>Get Certified Now</button>
              </Link>
              <button style={{ backgroundColor:'transparent', color:'white', border:'1px solid rgba(255,255,255,0.25)', padding:'14px 32px', borderRadius:100, fontSize:14, fontWeight:700, cursor:'pointer' }}>Learn More</button>
            </div>
          </div>
        </section>

        {/* JOIN CTA */}
        <section style={{ borderRadius:40, background:`linear-gradient(135deg,${C.mint},${C.mintDk})`, padding:'56px 64px', display:'flex', alignItems:'center', justifyContent:'space-between', gap:40, flexWrap:'wrap', marginBottom:64 }}>
          <div>
            <h2 style={{ ...UB, fontSize:'clamp(26px,4vw,42px)', color:'white', marginBottom:12, lineHeight:1.05 }}>LIST YOUR COMMERCIAL PROPERTY</h2>
            <p style={{ fontSize:15, color:'rgba(255,255,255,0.85)', maxWidth:480, lineHeight:1.7 }}>Reach Morocco's most serious business buyers and tenants — post your listing free in 2 minutes.</p>
            <div style={{ display:'flex', gap:12, marginTop:24 }}>
              <button style={{ backgroundColor:'white', color:C.mint, border:'none', padding:'12px 24px', borderRadius:100, fontWeight:800, fontSize:13, cursor:'pointer' }}>🍎 App Store</button>
              <button style={{ backgroundColor:'rgba(255,255,255,0.15)', color:'white', border:'1px solid rgba(255,255,255,0.4)', padding:'12px 24px', borderRadius:100, fontWeight:800, fontSize:13, cursor:'pointer' }}>▶ Google Play</button>
            </div>
          </div>
          <Link href={`/${locale}/post-ad`} style={{ textDecoration:'none' }}>
            <span style={{ display:'inline-block', backgroundColor:'white', color:C.mint, padding:'18px 40px', borderRadius:100, fontWeight:900, fontSize:15, cursor:'pointer', whiteSpace:'nowrap', ...UB, boxShadow:'0 8px 32px rgba(0,0,0,0.15)' }}>Post Free Ad →</span>
          </Link>
        </section>

        {/* BACK NAVIGATION */}
        <div style={{ borderTop:'1px solid rgba(186,202,197,0.3)', paddingTop:40 }}>
          <p style={{ fontSize:12, fontWeight:800, color:C.muted, textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:20, textAlign:'center' }}>Navigate Property</p>
          <div style={{ display:'flex', gap:10, justifyContent:'center', flexWrap:'wrap' }}>
            {[
              { label:'← Property Hub',   href:`/${locale}/property`          },
              { label:'← For Sale',       href:`/${locale}/property/for-sale`  },
              { label:'← For Rent',       href:`/${locale}/property/for-rent`  },
              { label:'← All Property',   href:`/${locale}/property`           },
              { label:'← Home',           href:`/${locale}`                    },
            ].map((b,i)=>(
              <Link key={b.label} href={b.href}
                style={{ padding:'12px 24px', borderRadius:100, textDecoration:'none', fontSize:13, fontWeight:900, fontFamily:"'Inter',sans-serif", transition:'all 0.2s', display:'flex', alignItems:'center', gap:6, border:`1.5px solid rgba(186,202,197,0.4)`, backgroundColor: i===4 ? C.ink : 'white', color: i===4 ? 'white' : C.ink }}
                onMouseEnter={e=>{if(i<4){(e.currentTarget as HTMLElement).style.borderColor=C.mint;(e.currentTarget as HTMLElement).style.color=C.mint}else{(e.currentTarget as HTMLElement).style.backgroundColor=C.mint}}}
                onMouseLeave={e=>{if(i<4){(e.currentTarget as HTMLElement).style.borderColor='rgba(186,202,197,0.4)';(e.currentTarget as HTMLElement).style.color=C.ink}else{(e.currentTarget as HTMLElement).style.backgroundColor=C.ink}}}>
                {b.label}
              </Link>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
