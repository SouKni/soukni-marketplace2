'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Heart, Search, ChevronRight, ChevronLeft, MapPin, Maximize, Phone, LayoutGrid, List, FileCheck, TrendingUp } from 'lucide-react'
import { useListings } from '@/hooks/useListings'
import Breadcrumb from '@/components/ui/Breadcrumb'
import CategoryFooterNav from '@/components/ui/CategoryFooterNav'
import { useFavorites } from '@/hooks/useFavorites'

const C = { mint:'#22d4a8', mintDk:'#0f9b8e', ink:'#161d1b', surface:'#f4fbf8', muted:'#6b7a76' }
const UB = { fontFamily:"'Inter',sans-serif", fontWeight:900, letterSpacing:'-0.05em' } as const
const CB = { fontFamily:"'Hanken Grotesk',sans-serif", fontWeight:900, letterSpacing:'-0.03em' } as const

const LAND_CATS = [
  { slug:'residential',  label:'Residential',   count:'1,840', emoji:'🏠', desc:'Ready-to-build plots', image:'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&w=600' },
  { slug:'commercial',   label:'Commercial',    count:'680',   emoji:'🏪', desc:'Business & retail zones', image:'https://images.pexels.com/photos/1109561/pexels-photo-1109561.jpeg?auto=compress&w=600' },
  { slug:'agricultural', label:'Agricultural',  count:'920',   emoji:'🌾', desc:'Farms & rural land', image:'https://images.pexels.com/photos/1148955/pexels-photo-1148955.jpeg?auto=compress&w=600' },
  { slug:'industrial',   label:'Industrial',    count:'340',   emoji:'🏭', desc:'Factory & logistics zones', image:'https://images.pexels.com/photos/1595109/pexels-photo-1595109.jpeg?auto=compress&w=600' },
  { slug:'coastal',      label:'Coastal',       count:'210',   emoji:'🌊', desc:'Sea view & beachfront', image:'https://images.pexels.com/photos/2872755/pexels-photo-2872755.jpeg?auto=compress&w=600' },
  { slug:'mixed-use',    label:'Mixed Use',     count:'420',   emoji:'🌆', desc:'Residential + commercial', image:'https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg?auto=compress&w=600' },
]

type ZoneType = 'all'|'residential'|'commercial'|'agricultural'|'industrial'|'coastal'
type PermitStatus = 'all'|'approved'|'pending'|'no-permit'

const LISTINGS = [
  { id:'ld1',  badge:'Verified',    badge2:'Permits Approved', title:'Residential Plot — Ready to Build Immediately',    zone:'Residential',  price:'1,250,000', pricePerM2:'2,083', area:600,   location:'Rabat, Outskirts',           permit:'approved', image:'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&w=700',  serviced:true,  road:true },
  { id:'ld2',  badge:'New Listing', badge2:null,               title:'Commercial Land on Main N1 Highway',               zone:'Commercial',   price:'3,800,000', pricePerM2:'1,520', area:2500,  location:'Casablanca, Nouaceur',       permit:'approved', image:'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&w=700',  serviced:true,  road:true },
  { id:'ld3',  badge:'Exclusive',   badge2:null,               title:'Agricultural Land with Well & Water Access',       zone:'Agricultural', price:'980,000',   pricePerM2:'65',    area:15000, location:'Meknès Region',              permit:'no-permit',image:'https://images.pexels.com/photos/1148955/pexels-photo-1148955.jpeg?auto=compress&w=700',  serviced:false, road:false },
  { id:'ld4',  badge:'Verified',    badge2:'Serviced',         title:'Buildable Plot — Adjacent to New Residence',      zone:'Residential',  price:'1,600,000', pricePerM2:'2,000', area:800,   location:'Marrakech, Route de Fès',    permit:'approved', image:'https://images.pexels.com/photos/2581922/pexels-photo-2581922.jpeg?auto=compress&w=700',  serviced:true,  road:true },
  { id:'ld5',  badge:'New Listing', badge2:'Permits Approved', title:'Industrial Zone Plot with Planning Permission',    zone:'Industrial',   price:'5,200,000', pricePerM2:'1,238', area:4200,  location:'Tanger Free Zone',           permit:'approved', image:'https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg?auto=compress&w=700',  serviced:true,  road:true },
  { id:'ld6',  badge:'Exclusive',   badge2:'Sea View',         title:'Coastal Land — Prime Development Opportunity',    zone:'Coastal',      price:'6,800,000', pricePerM2:'3,778', area:1800,  location:'Agadir Coastline',           permit:'pending',  image:'https://images.pexels.com/photos/2872755/pexels-photo-2872755.jpeg?auto=compress&w=700',  serviced:false, road:true },
  { id:'ld7',  badge:'Exclusive',   badge2:null,               title:'Residential Subdivision — 3,200m² Flat Plot',     zone:'Residential',  price:'4,500,000', pricePerM2:'1,406', area:3200,  location:'Fès Ville Nouvelle',         permit:'pending',  image:'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&w=700',  serviced:true,  road:true },
  { id:'ld8',  badge:'Verified',    badge2:null,               title:'Small Investment Plot — Excellent Road Access',   zone:'Residential',  price:'620,000',   pricePerM2:'1,378', area:450,   location:'Rabat, Témara',              permit:'approved', image:'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&w=700',  serviced:true,  road:true },
  { id:'ld9',  badge:'New Listing', badge2:'Agricultural',     title:'Farm Land with Irrigation Canal — 5 Hectares',   zone:'Agricultural', price:'2,200,000', pricePerM2:'44',    area:50000, location:'Souss Plain, Agadir',        permit:'no-permit',image:'https://images.pexels.com/photos/1148955/pexels-photo-1148955.jpeg?auto=compress&w=700',  serviced:false, road:false },
  { id:'ld10', badge:'Verified',    badge2:'Mixed Use',        title:'Mixed-Use Development Site — 12,000m²',          zone:'Mixed Use',    price:'18,500,000',pricePerM2:'1,542', area:12000, location:'Casablanca, Ain Sebaa',      permit:'approved', image:'https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg?auto=compress&w=700',  serviced:true,  road:true },
  { id:'ld11', badge:'Exclusive',   badge2:'Sea View',         title:'Beachfront Lot — Asilah Old Town Perimeter',     zone:'Coastal',      price:'3,400,000', pricePerM2:'4,250', area:800,   location:'Asilah, Atlantic Coast',     permit:'pending',  image:'https://images.pexels.com/photos/2872755/pexels-photo-2872755.jpeg?auto=compress&w=700',  serviced:false, road:true },
  { id:'ld12', badge:'Verified',    badge2:'Industrial',       title:'Logistics Plot — Near Tanger Med Port',          zone:'Industrial',   price:'8,900,000', pricePerM2:'1,424', area:6250,  location:'Tanger Med Zone',            permit:'approved', image:'https://images.pexels.com/photos/2219024/pexels-photo-2219024.jpeg?auto=compress&w=700',  serviced:true,  road:true },
]

const PERMIT_CONFIG = {
  'approved':  { label:'Permits Approved', color:'#10b981', bg:'#f0fdf4' },
  'pending':   { label:'Permit Pending',   color:'#f59e0b', bg:'#fffbeb' },
  'no-permit': { label:'No Permit Yet',    color:C.muted,   bg:'#f4f4f4' },
}

function PermitBadge({ status }: { status: string }) {
  const s = PERMIT_CONFIG[status as keyof typeof PERMIT_CONFIG] || PERMIT_CONFIG['no-permit']
  return (
    <span style={{ display:'inline-flex', alignItems:'center', gap:4, backgroundColor:s.bg, color:s.color, fontSize:'9px', fontWeight:800, padding:'3px 9px', borderRadius:100, textTransform:'uppercase', letterSpacing:'0.07em', whiteSpace:'nowrap' }}>
      <FileCheck size={10}/>{s.label}
    </span>
  )
}

function BadgeChip({ label }: { label:string }) {
  const green = label === 'Permits Approved' || label === 'Serviced' || label === 'Verified'
  return (
    <span style={{ backgroundColor:green?C.mint:'rgba(15,23,42,0.85)', color:'white', fontSize:'9px', fontWeight:800, padding:'3px 9px', borderRadius:'4px', letterSpacing:'0.08em', textTransform:'uppercase', whiteSpace:'nowrap' }}>{label}</span>
  )
}

type Listing = typeof LISTINGS[0]

function LandCard({ item, locale, view }: { item:Listing; locale:string; view:'grid'|'list' }) {
  const { isFavorited, toggleFavorite } = useFavorites()
  const saved = isFavorited(item.id)
  const [hov,   setHov  ] = useState(false)

  if (view === 'list') return (
    <Link href={`/${locale}/listing/${item.id}`} style={{ textDecoration:'none' }}>
      <article onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
        style={{ backgroundColor:'white', borderRadius:18, overflow:'hidden', boxShadow:hov?'0 12px 36px rgba(0,0,0,0.1)':'0 2px 8px rgba(0,0,0,0.05)', border:`1px solid ${hov?C.mint:'rgba(0,0,0,0.06)'}`, transition:'all 0.3s', display:'flex', cursor:'pointer', marginBottom:14 }}>
        <div style={{ position:'relative', width:260, flexShrink:0, overflow:'hidden' }}>
          <img src={item.image} alt={item.title} style={{ width:'100%', height:'100%', objectFit:'cover', transition:'transform 0.5s', transform:hov?'scale(1.04)':'scale(1)' }} />
          <div style={{ position:'absolute', top:10, left:10, display:'flex', gap:5 }}>
            <BadgeChip label={item.badge} />
            {item.badge2 && <BadgeChip label={item.badge2} />}
          </div>
          <div style={{ position:'absolute', bottom:10, left:10 }}>
            <PermitBadge status={item.permit} />
          </div>
        </div>
        <div style={{ padding:'20px 24px', flex:1, display:'flex', flexDirection:'column', justifyContent:'space-between' }}>
          <div>
            <p style={{ fontSize:11, color:C.mint, fontWeight:800, textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:5 }}>{item.zone}</p>
            <h3 style={{ ...CB, fontSize:'16px', color:hov?C.mint:C.ink, marginBottom:5, transition:'color 0.2s', lineHeight:1.3 }}>{item.title}</h3>
            <div style={{ display:'flex', alignItems:'center', gap:5, marginBottom:10 }}>
              <MapPin size={12} color={C.muted}/><span style={{ fontSize:'12px', color:C.muted, fontWeight:600 }}>{item.location}</span>
            </div>
            <div style={{ display:'flex', gap:16, flexWrap:'wrap' }}>
              <span style={{ fontSize:'12px', color:'#475569', fontWeight:600, display:'flex', alignItems:'center', gap:4 }}><Maximize size={13} color={C.mint}/>{item.area.toLocaleString()}m²</span>
              <span style={{ fontSize:'12px', color:'#475569', fontWeight:600 }}>📐 {item.pricePerM2} MAD/m²</span>
              {item.serviced && <span style={{ fontSize:'12px', color:'#10b981', fontWeight:700 }}>⚡ Serviced</span>}
              {item.road && <span style={{ fontSize:'12px', color:'#475569', fontWeight:600 }}>🛣️ Road access</span>}
            </div>
          </div>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', paddingTop:14, borderTop:'1px solid #f1f5f9', marginTop:12 }}>
            <div>
              <span style={{ ...CB, fontSize:'22px', color:C.mint }}>{item.price} </span>
              <span style={{ fontSize:'12px', color:C.muted, fontWeight:600 }}>MAD</span>
            </div>
            <div style={{ display:'flex', gap:8 }}>
              <button onClick={e=>e.preventDefault()} style={{ padding:'9px 18px', borderRadius:100, backgroundColor:C.surface, color:C.ink, border:'none', fontSize:'12px', fontWeight:700, cursor:'pointer', fontFamily:"'Inter',sans-serif" }}>Message</button>
              <button onClick={e=>e.preventDefault()} style={{ padding:'9px 20px', borderRadius:100, backgroundColor:C.mint, color:'white', border:'none', fontSize:'12px', fontWeight:700, cursor:'pointer', display:'flex', alignItems:'center', gap:5, fontFamily:"'Inter',sans-serif" }}><Phone size={12}/>Contact</button>
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
        <div style={{ position:'relative', aspectRatio:'16/10', overflow:'hidden' }}>
          <img src={item.image} alt={item.title} style={{ width:'100%', height:'100%', objectFit:'cover', transition:'transform 0.6s', transform:hov?'scale(1.06)':'scale(1)' }} />
          <div style={{ position:'absolute', top:12, left:12, display:'flex', gap:5, flexWrap:'wrap' }}>
            <BadgeChip label={item.badge} />
            {item.badge2 && <BadgeChip label={item.badge2} />}
          </div>
          <button onClick={e=>{e.preventDefault();toggleFavorite(item.id)}}
            style={{ position:'absolute', top:12, right:12, width:34, height:34, borderRadius:'50%', backgroundColor:'rgba(255,255,255,0.9)', border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}>
            <Heart size={16} fill={saved?'#ef4444':'none'} color={saved?'#ef4444':'#6b7a76'}/>
          </button>
          <div style={{ position:'absolute', bottom:12, left:12 }}><PermitBadge status={item.permit} /></div>
          <div style={{ position:'absolute', bottom:12, right:12, backgroundColor:'rgba(22,29,27,0.8)', backdropFilter:'blur(8px)', padding:'4px 10px', borderRadius:7 }}>
            <span style={{ color:'white', fontSize:'11px', fontWeight:800 }}>{item.area.toLocaleString()}m²</span>
          </div>
        </div>
        <div style={{ padding:'16px 18px' }}>
          <p style={{ fontSize:10, color:C.mint, fontWeight:800, textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:4 }}>{item.zone}</p>
          <h3 style={{ ...CB, fontSize:'14px', color:hov?C.mint:C.ink, marginBottom:5, lineHeight:1.3, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap', transition:'color 0.2s' }}>{item.title}</h3>
          <div style={{ display:'flex', alignItems:'center', gap:5, marginBottom:10 }}>
            <MapPin size={11} color={C.muted}/><span style={{ fontSize:'11px', color:C.muted, fontWeight:600 }}>{item.location}</span>
          </div>
          <div style={{ display:'flex', gap:'10px', marginBottom:12, paddingTop:10, borderTop:'1px solid #f1f5f9', flexWrap:'wrap' }}>
            <span style={{ fontSize:'11px', color:'#475569', fontWeight:600, display:'flex', alignItems:'center', gap:3 }}><Maximize size={12} color={C.mint}/>{item.area.toLocaleString()}m²</span>
            <span style={{ fontSize:'11px', color:'#475569', fontWeight:600 }}>📐 {item.pricePerM2} MAD/m²</span>
            {item.serviced && <span style={{ fontSize:'11px', color:'#10b981', fontWeight:700 }}>⚡ Serviced</span>}
          </div>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
            <div>
              <span style={{ ...CB, fontSize:'18px', color:C.mint }}>{item.price} </span>
              <span style={{ fontSize:'10px', color:C.muted, fontWeight:600 }}>MAD</span>
            </div>
            <button onClick={e=>e.preventDefault()} style={{ padding:'8px 14px', borderRadius:100, backgroundColor:C.ink, color:'white', border:'none', fontSize:'12px', fontWeight:700, cursor:'pointer', transition:'background 0.2s', display:'flex', alignItems:'center', gap:5, fontFamily:"'Inter',sans-serif" }}
              onMouseEnter={e=>e.currentTarget.style.backgroundColor=C.mint}
              onMouseLeave={e=>e.currentTarget.style.backgroundColor=C.ink}>
              <Phone size={11}/>Contact
            </button>
          </div>
        </div>
      </article>
    </Link>
  )
}

export default function LandPlotsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale }             = React.use(params)
  const [zone,    setZone   ]  = useState<ZoneType>('all')
  const [permit,  setPermit ]  = useState<PermitStatus>('all')
  const [seller,  setSeller ]  = useState<'All Sellers'|'SouKni Agencies'|'Verified Owners'>('All Sellers')
  const [view,    setView   ]  = useState<'grid'|'list'>('grid')
  const [city,    setCity   ]  = useState('All Morocco')
  const [minArea, setMinArea]  = useState('')
  const [maxArea, setMaxArea]  = useState('')
  const [minPrice,setMinPrice] = useState('')
  const [maxPrice,setMaxPrice] = useState('')
  const [sort,    setSort   ]  = useState<'Newest'|'Price Low'|'Price High'|'Largest'|'Price/m²'>('Newest')
  const [page,    setPage   ]  = useState(1)
  const [hovCat,  setHovCat ]  = useState<string|null>(null)
  const [keyword, setKeyword]  = useState('')
  useEffect(() => { setPage(1) }, [zone, permit, city, minPrice, maxPrice, sort, keyword])

  const cities = ['All Morocco','Casablanca','Rabat','Marrakech','Tangier','Agadir','Fès','Meknès','Tanger Med Zone']

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
      badge: row.badge || 'Verified',
      badge2: null as string | null,
      title: row.title,
      zone: 'Residential',
      price: Math.round((row.price || 0) / 100).toLocaleString(),
      pricePerM2: Math.round((row.price || 0) / 100 / 500).toLocaleString(),
      area: 500,
      location: row.city,
      permit: 'approved' as 'approved'|'pending'|'no-permit',
      image: (row.images && row.images[0]) || LISTINGS[0].image,
      serviced: true,
      road: true,
    }
  }
  const hasRealData = dbListings.length > 0
  const sourceListings = hasRealData ? dbListings.map(mapDbRowToCard) : LISTINGS
  const filtered = sourceListings.filter(l => {
    if (zone !== 'all' && l.zone.toLowerCase() !== zone) return false
    if (permit !== 'all' && l.permit !== permit) return false
    if (keyword.trim() && !l.title.toLowerCase().includes(keyword.toLowerCase()) && !l.location.toLowerCase().includes(keyword.toLowerCase())) return false
    if (city !== 'All Morocco' && !l.location.toLowerCase().includes(city.toLowerCase())) return false
    const priceNum = Number(String(l.price).replace(/,/g, ''))
    if (minPrice.trim() && priceNum < Number(minPrice)) return false
    if (maxPrice.trim() && priceNum > Number(maxPrice)) return false
    return true
  }).sort((a, b) => {
    const priceA = Number(String(a.price).replace(/,/g, ''))
    const priceB = Number(String(b.price).replace(/,/g, ''))
    if (sort === 'Price Low') return priceA - priceB
    if (sort === 'Price High') return priceB - priceA
    if (sort === 'Largest') return b.area - a.area
    if (sort === 'Price/m²') return Number(String(a.pricePerM2).replace(/,/g,'')) - Number(String(b.pricePerM2).replace(/,/g,''))
    return 0 // Newest (default — no date field to sort by, preserve source order)
  })
  const PAGE_SIZE = 6
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  const stats = [
    { icon:'🌍', value:'2,410',  label:'Land Plots Available' },
    { icon:'📐', value:'450m²',  label:'Min Plot Size' },
    { icon:'🏙️', value:'12',     label:'Cities & Regions'     },
    { icon:'📋', value:'64%',    label:'With Approved Permits' },
  ]

  return (
    <div style={{ fontFamily:"'Inter',sans-serif", backgroundColor:C.surface, minHeight:'100vh' }}>

      {/* CINEMATIC HERO */}
      <section style={{ position:'relative', height:560, overflow:'hidden', display:'flex', alignItems:'center', justifyContent:'center' }}>
        <img src="https://images.pexels.com/photos/162553/excavator-construction-site-machine-162553.jpeg?auto=compress&w=1600" alt="Land & Plots Morocco"
          style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover' }} />
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top, rgba(15,23,42,0.95) 0%, rgba(15,23,42,0.5) 55%, rgba(15,23,42,0.15) 100%)' }} />
        <div style={{ position:'relative', zIndex:10, textAlign:'center', padding:'0 24px', maxWidth:800, width:'100%' }}>
          <div style={{ display:'inline-flex', alignItems:'center', gap:8, backgroundColor:'rgba(34,212,168,0.15)', border:'1px solid rgba(34,212,168,0.4)', borderRadius:100, padding:'7px 20px', marginBottom:22 }}>
            <span style={{ fontSize:14 }}>🌍</span>
            <span style={{ fontSize:11, fontWeight:800, color:C.mint, textTransform:'uppercase', letterSpacing:'0.16em' }}>SouKni Land &amp; Plots · Morocco</span>
          </div>
          <h1 style={{ ...UB, fontSize:'clamp(36px,6vw,70px)', color:'white', lineHeight:0.92, marginBottom:18, textTransform:'uppercase' }}>
            BUILD YOUR<br/><span style={{ color:C.mint }}>VISION</span><br/>FROM THE GROUND UP.
          </h1>
          <p style={{ fontSize:17, color:'rgba(255,255,255,0.7)', marginBottom:36, maxWidth:560, margin:'0 auto 36px', lineHeight:1.65 }}>
            Residential, commercial, agricultural &amp; coastal land — 2,410 verified plots across Morocco
          </p>
          <div style={{ display:'flex', alignItems:'stretch', backgroundColor:'rgba(255,255,255,0.12)', backdropFilter:'blur(24px)', border:'1px solid rgba(255,255,255,0.25)', borderRadius:100, overflow:'hidden', maxWidth:700, margin:'0 auto', boxShadow:'0 8px 32px rgba(0,0,0,0.25)' }}>
            <div style={{ display:'flex', flexDirection:'column', padding:'14px 22px', flex:'0 0 155px', borderRight:'1px solid rgba(255,255,255,0.15)', gap:2 }}>
              <span style={{ fontSize:9, fontWeight:800, color:'rgba(255,255,255,0.5)', textTransform:'uppercase', letterSpacing:'0.12em' }}>City / Region</span>
              <select value={city} onChange={e=>setCity(e.target.value)} style={{ backgroundColor:'transparent', border:'none', outline:'none', fontSize:14, fontWeight:700, color:'white', fontFamily:"'Inter',sans-serif", cursor:'pointer' }}>
                {cities.map(c=><option key={c} style={{ color:C.ink }}>{c}</option>)}
              </select>
            </div>
            <div style={{ display:'flex', flexDirection:'column', padding:'14px 22px', flex:'0 0 140px', borderRight:'1px solid rgba(255,255,255,0.15)', gap:2 }}>
              <span style={{ fontSize:9, fontWeight:800, color:'rgba(255,255,255,0.5)', textTransform:'uppercase', letterSpacing:'0.12em' }}>Zone Type</span>
              <select value={zone} onChange={e=>setZone(e.target.value as ZoneType)} style={{ backgroundColor:'transparent', border:'none', outline:'none', fontSize:14, fontWeight:700, color:'white', fontFamily:"'Inter',sans-serif", cursor:'pointer' }}>
                {['all','residential','commercial','agricultural','industrial','coastal','mixed-use'].map(z=><option key={z} value={z} style={{ color:C.ink }}>{z==='all'?'All Types':z.charAt(0).toUpperCase()+z.slice(1)}</option>)}
              </select>
            </div>
            <div style={{ display:'flex', flexDirection:'column', padding:'14px 22px', flex:1, borderRight:'1px solid rgba(255,255,255,0.15)', gap:2 }}>
              <span style={{ fontSize:9, fontWeight:800, color:'rgba(255,255,255,0.5)', textTransform:'uppercase', letterSpacing:'0.12em' }}>Keyword</span>
              <input value={keyword} onChange={e=>setKeyword(e.target.value)} placeholder="Zone, region, features..." style={{ backgroundColor:'transparent', border:'none', outline:'none', fontSize:14, fontWeight:600, color:'white', fontFamily:"'Inter',sans-serif", padding:0 }} />
            </div>
            <button style={{ backgroundColor:C.mint, color:'white', border:'none', padding:'0 28px', fontWeight:800, fontSize:14, cursor:'pointer', flexShrink:0, transition:'background 0.15s', display:'flex', alignItems:'center', gap:8 }}
              onMouseEnter={e=>e.currentTarget.style.backgroundColor=C.mintDk}
              onMouseLeave={e=>e.currentTarget.style.backgroundColor=C.mint}>
              <Search size={16}/> Search
            </button>
          </div>
        </div>
      </section>

      {/* FILTER HUB — 2 rows */}
      <div style={{ maxWidth:1440, margin:'-26px auto 0', padding:'0 40px', position:'relative', zIndex:30 }}>
        <div style={{ backgroundColor:'rgba(255,255,255,0.97)', backdropFilter:'blur(20px)', borderRadius:32, boxShadow:'0 8px 40px rgba(0,0,0,0.10)', border:'1px solid rgba(255,255,255,0.7)', overflow:'hidden' }}>

          {/* Row 1 */}
          <div style={{ display:'flex', alignItems:'center', borderBottom:'1px solid rgba(186,202,197,0.2)' }}>
            {[
              { label:'City / Region',   content:<select value={city} onChange={e=>setCity(e.target.value)} style={{ border:'none', outline:'none', fontSize:14, fontWeight:700, color:C.ink, backgroundColor:'transparent', cursor:'pointer', fontFamily:"'Inter',sans-serif" }}>{cities.map(c=><option key={c}>{c}</option>)}</select> },
              { label:'Zone Type',       content:<select value={zone} onChange={e=>setZone(e.target.value as ZoneType)} style={{ border:'none', outline:'none', fontSize:14, fontWeight:700, color:C.ink, backgroundColor:'transparent', cursor:'pointer', fontFamily:"'Inter',sans-serif" }}>{['all','residential','commercial','agricultural','industrial','coastal'].map(z=><option key={z} value={z}>{z==='all'?'All Zones':z.charAt(0).toUpperCase()+z.slice(1)}</option>)}</select> },
              { label:'Min Area (m²)',   content:<input type="number" value={minArea} onChange={e=>setMinArea(e.target.value)} placeholder="Any" style={{ border:'none', outline:'none', fontSize:14, fontWeight:700, color:C.ink, backgroundColor:'transparent', fontFamily:"'Inter',sans-serif", width:80 }} /> },
              { label:'Max Area (m²)',   content:<input type="number" value={maxArea} onChange={e=>setMaxArea(e.target.value)} placeholder="Any" style={{ border:'none', outline:'none', fontSize:14, fontWeight:700, color:C.ink, backgroundColor:'transparent', fontFamily:"'Inter',sans-serif", width:80 }} /> },
              { label:'Max Price (MAD)', content:<input type="number" value={maxPrice} onChange={e=>setMaxPrice(e.target.value)} placeholder="Any" style={{ border:'none', outline:'none', fontSize:14, fontWeight:700, color:C.ink, backgroundColor:'transparent', fontFamily:"'Inter',sans-serif", width:90 }} /> },
            ].map((f,i,arr)=>(
              <div key={f.label} style={{ flex:1, padding:'12px 20px', borderRight:i<arr.length-1?'1px solid rgba(186,202,197,0.2)':'none', display:'flex', flexDirection:'column', gap:2 }}>
                <span style={{ fontSize:9, textTransform:'uppercase', fontWeight:800, color:C.muted, letterSpacing:'0.1em' }}>{f.label}</span>
                {f.content}
              </div>
            ))}
            <div style={{ padding:'8px 12px', flexShrink:0 }}>
              <button style={{ backgroundColor:C.mint, color:'white', border:'none', padding:'13px 28px', borderRadius:100, cursor:'pointer', fontWeight:800, fontSize:14, display:'flex', alignItems:'center', gap:7, whiteSpace:'nowrap' }}
                onMouseEnter={e=>e.currentTarget.style.backgroundColor=C.mintDk}
                onMouseLeave={e=>e.currentTarget.style.backgroundColor=C.mint}>
                <Search size={15}/> SEARCH
              </button>
            </div>
          </div>

          {/* Row 2 — permit status filters */}
          <div style={{ display:'flex', alignItems:'center', gap:8, padding:'10px 20px', flexWrap:'wrap' }}>
            <span style={{ fontSize:10, fontWeight:800, color:C.muted, textTransform:'uppercase', letterSpacing:'0.1em', flexShrink:0 }}>Permit Status:</span>
            {([
              { key:'all',        label:'All Plots' },
              { key:'approved',   label:'Permits Approved' },
              { key:'pending',    label:'Permit Pending' },
              { key:'no-permit',  label:'No Permit' },
            ] as const).map(p=>(
              <button key={p.key} onClick={()=>setPermit(p.key)}
                style={{ padding:'7px 18px', borderRadius:100, border:`1.5px solid ${permit===p.key?C.mint:'rgba(186,202,197,0.4)'}`, backgroundColor:permit===p.key?C.mint:'white', color:permit===p.key?'white':C.muted, cursor:'pointer', fontSize:12, fontWeight:700, transition:'all 0.2s', whiteSpace:'nowrap', fontFamily:"'Inter',sans-serif" }}>
                {p.label}
              </button>
            ))}
            <div style={{ width:1, height:20, backgroundColor:'rgba(186,202,197,0.4)', margin:'0 4px' }} />
            <span style={{ fontSize:10, fontWeight:800, color:C.muted, textTransform:'uppercase', letterSpacing:'0.1em', flexShrink:0 }}>Features:</span>
            {['⚡ Serviced','🛣️ Road Access','🌊 Sea View','💧 Water Rights'].map(tag=>(
              <button key={tag} style={{ padding:'7px 14px', borderRadius:100, border:'1.5px solid rgba(186,202,197,0.4)', backgroundColor:'white', color:C.muted, cursor:'pointer', fontSize:11, fontWeight:700, transition:'all 0.2s', whiteSpace:'nowrap', fontFamily:"'Inter',sans-serif" }}
                onMouseEnter={e=>{e.currentTarget.style.borderColor=C.mint;e.currentTarget.style.color=C.mint}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor='rgba(186,202,197,0.4)';e.currentTarget.style.color=C.muted}}>
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth:1440, margin:'48px auto 0', padding:'0 40px 80px' }}>

        {/* BREADCRUMB */}
        <Breadcrumb
          items={[
            { label:'Home',        href:`/${locale}` },
            { label:'Property',    href:`/${locale}/property` },
            { label:'Lands & Plots', href:null },
          ]}
          mutedColor={C.muted}
          inkColor={C.ink}
          style={{ fontSize:11, marginBottom:32 }}
        />

        {/* STATS */}
        <section style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:16, marginBottom:56 }}>
          {stats.map(s=>(
            <div key={s.label} style={{ backgroundColor:'white', borderRadius:20, padding:'20px 22px', border:'1px solid rgba(186,202,197,0.2)', boxShadow:'0 2px 8px rgba(0,0,0,0.04)', display:'flex', alignItems:'center', gap:14 }}>
              <div style={{ width:46, height:46, borderRadius:14, backgroundColor:`${C.mint}15`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:22, flexShrink:0 }}>{s.icon}</div>
              <div>
                <p style={{ ...UB, fontSize:22, color:C.ink, marginBottom:2 }}>{s.value}</p>
                <p style={{ fontSize:12, color:C.muted, fontWeight:600 }}>{s.label}</p>
              </div>
            </div>
          ))}
        </section>

        {/* ZONE TYPE GRID */}
        <section style={{ marginBottom:64 }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:24 }}>
            <h2 style={{ ...UB, fontSize:30, color:C.ink }}>Browse by Zone Type</h2>
            <span style={{ fontSize:14, color:C.muted }}>2,410 plots across Morocco</span>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:16 }}>
            {LAND_CATS.map(cat=>(
              <Link key={cat.slug} href={`/${locale}/property/land-plots/${cat.slug}`} style={{ textDecoration:'none' }}>
                <div onMouseEnter={()=>setHovCat(cat.slug)} onMouseLeave={()=>setHovCat(null)}
                  style={{ position:'relative', borderRadius:22, overflow:'hidden', cursor:'pointer', transition:'transform 0.2s, box-shadow 0.2s', transform:hovCat===cat.slug?'scale(1.02)':'scale(1)', boxShadow:hovCat===cat.slug?'0 20px 48px rgba(0,0,0,0.18)':'0 4px 12px rgba(0,0,0,0.08)' }}>
                  <div style={{ aspectRatio:'4/3', overflow:'hidden' }}>
                    <img src={cat.image} alt={cat.label} style={{ width:'100%', height:'100%', objectFit:'cover', transition:'transform 0.5s', transform:hovCat===cat.slug?'scale(1.08)':'scale(1)' }} />
                  </div>
                  <div style={{ position:'absolute', inset:0, background:hovCat===cat.slug?'linear-gradient(to top,rgba(34,212,168,0.75),rgba(0,0,0,0.05))':'linear-gradient(to top,rgba(15,23,42,0.8),rgba(0,0,0,0.05))' }} />
                  <div style={{ position:'absolute', top:12, left:12, fontSize:22 }}>{cat.emoji}</div>
                  <div style={{ position:'absolute', bottom:0, left:0, right:0, padding:'14px 16px' }}>
                    <p style={{ ...UB, fontSize:15, color:'white', marginBottom:2 }}>{cat.label}</p>
                    <p style={{ fontSize:11, color:'rgba(255,255,255,0.7)', fontWeight:600 }}>{cat.count} plots · {cat.desc}</p>
                  </div>
                </div>
              </Link>
            ))}
            {/* View All */}
            <Link href={`/${locale}/property/land-plots`} style={{ textDecoration:'none' }}>
              <div onMouseEnter={()=>setHovCat('all')} onMouseLeave={()=>setHovCat(null)}
                style={{ borderRadius:22, overflow:'hidden', aspectRatio:'4/3', cursor:'pointer', transition:'transform 0.2s, box-shadow 0.2s', transform:hovCat==='all'?'scale(1.02)':'scale(1)', boxShadow:hovCat==='all'?'0 20px 48px rgba(0,0,0,0.18)':'0 4px 12px rgba(0,0,0,0.08)', background:hovCat==='all'?`linear-gradient(135deg,${C.mint},${C.mintDk})`:C.ink, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:8 }}>
                <ChevronRight size={28} color="white"/>
                <p style={{ ...UB, fontSize:15, color:'white' }}>View All</p>
                <p style={{ fontSize:11, color:'rgba(255,255,255,0.6)', fontWeight:600 }}>All zone types</p>
              </div>
            </Link>
          </div>
                </section>

        {/* IMMO PRO BANNER */}
        <section style={{ marginBottom:64 }}>
          <div style={{ position:'relative', height:210, borderRadius:32, overflow:'hidden', boxShadow:'0 20px 60px rgba(0,0,0,0.15)' }}>
            <img src="https://images.pexels.com/photos/2581922/pexels-photo-2581922.jpeg?auto=compress&w=1200" alt="Immo Pro" style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover' }} />
            <div style={{ position:'absolute', inset:0, background:'linear-gradient(to right,rgba(15,23,42,0.96) 0%,rgba(15,23,42,0.65) 60%,transparent)' }} />
            <div style={{ position:'absolute', inset:0, display:'flex', flexDirection:'column', justifyContent:'center', padding:'0 56px' }}>
              <span style={{ backgroundColor:C.mint, color:'white', fontSize:9, ...UB, padding:'4px 14px', borderRadius:100, textTransform:'uppercase', letterSpacing:'0.12em', display:'inline-block', marginBottom:12, width:'fit-content' }}>SouKni Immo Pro</span>
              <h2 style={{ ...UB, fontSize:'clamp(18px,2.5vw,28px)', color:'white', marginBottom:16, lineHeight:1.1 }}>List your land where serious<br/>developers and investors browse.</h2>
              <div style={{ display:'flex', gap:10 }}>
                <Link href={`/${locale}/post-ad`} style={{ textDecoration:'none' }}><button style={{ backgroundColor:'white', color:C.ink, border:'none', padding:'10px 24px', borderRadius:100, fontSize:12, ...UB, cursor:'pointer' }}>Post Free Ad</button></Link>
                <Link href={`/${locale}/diamond`} style={{ textDecoration:'none' }}><button style={{ backgroundColor:'transparent', color:'white', border:'1px solid rgba(255,255,255,0.35)', padding:'10px 24px', borderRadius:100, fontSize:12, fontWeight:700, cursor:'pointer' }}>Get Certified</button></Link>
              </div>
            </div>
          </div>
        </section>

        {/* LISTINGS */}
        <section style={{ marginBottom:64 }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:20, flexWrap:'wrap', gap:12 }}>
            <div>
              <h2 style={{ ...UB, fontSize:28, color:C.ink, marginBottom:4 }}>
                {zone==='all' ? 'All Land & Plots' : zone.charAt(0).toUpperCase()+zone.slice(1)+' Land'}
                {permit!=='all' ? ` — ${PERMIT_CONFIG[permit].label}` : ''}
              </h2>
              <p style={{ fontSize:14, color:C.mint, fontWeight:700 }}>{filtered.length} plots found across Morocco</p>
            </div>
            <div style={{ display:'flex', alignItems:'center', gap:10 }}>
              {/* Seller tabs */}
              <div style={{ display:'flex', gap:4, padding:'4px', backgroundColor:'#e8efec', borderRadius:100 }}>
                {(['All Sellers','SouKni Agencies','Verified Owners'] as const).map(tab=>(
                  <button key={tab} onClick={()=>setSeller(tab)}
                    style={{ padding:'7px 16px', borderRadius:100, fontSize:11, fontWeight:900, border:'none', cursor:'pointer', fontFamily:"'Inter',sans-serif", textTransform:'uppercase', letterSpacing:'0.05em', transition:'all 0.2s',
                      backgroundColor:seller===tab?C.ink:'transparent', color:seller===tab?'white':C.muted, boxShadow:seller===tab?'0 2px 8px rgba(0,0,0,0.15)':'none' }}>
                    {tab}
                  </button>
                ))}
              </div>
              {/* Sort */}
              <div style={{ display:'flex', gap:4, padding:'4px', backgroundColor:'#f4f4f4', borderRadius:100 }}>
                {(['Newest','Price Low','Price High','Largest','Price/m²'] as const).map(s=>(
                  <button key={s} onClick={()=>setSort(s)}
                    style={{ padding:'6px 12px', borderRadius:100, fontSize:10, fontWeight:800, border:'none', cursor:'pointer', fontFamily:"'Inter',sans-serif", transition:'all 0.2s',
                      backgroundColor:sort===s?C.ink:'transparent', color:sort===s?'white':C.muted }}>
                    {s}
                  </button>
                ))}
              </div>
              {/* Grid/List */}
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

          {filtered.length > 0 ? (
            view === 'grid' ? (
              <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:24, marginBottom:48 }}>
                {paginated.map(item => <LandCard key={item.id} item={item} locale={locale} view="grid" />)}
              </div>
            ) : (
              <div style={{ marginBottom:48 }}>
                {paginated.map(item => <LandCard key={item.id} item={item} locale={locale} view="list" />)}
              </div>
            )
          ) : (
            <div style={{ textAlign:'center', padding:'80px 0' }}>
              <span style={{ fontSize:48, display:'block', marginBottom:16 }}>🔍</span>
              <p style={{ fontSize:18, fontWeight:700, color:C.muted, marginBottom:16 }}>No plots match your filters.</p>
              <button onClick={()=>{ setZone('all'); setPermit('all') }}
                style={{ padding:'12px 28px', borderRadius:100, backgroundColor:C.mint, color:'white', border:'none', fontSize:14, fontWeight:700, cursor:'pointer' }}>Clear Filters</button>
            </div>
          )}
        </section>

        {/* PAGINATION */}
        <div style={{ display:'flex', justifyContent:'center', alignItems:'center', gap:10, marginBottom:64 }}>
          <button onClick={()=>setPage(Math.max(1,page-1))} disabled={page===1} style={{ width:44, height:44, borderRadius:12, backgroundColor:'white', border:'1px solid rgba(107,122,118,0.12)', cursor:page===1?'not-allowed':'pointer', opacity:page===1?0.4:1, display:'flex', alignItems:'center', justifyContent:'center', color:C.muted }}><ChevronLeft size={18}/></button>
          {Array.from({length:totalPages},(_,i)=>i+1).map(p=>(
            <button key={p} onClick={()=>setPage(p)} style={{ width:44, height:44, borderRadius:12, cursor:'pointer', fontSize:15, fontWeight:900, border:'1px solid', transition:'all 0.2s', backgroundColor:page===p?C.mint:'white', color:page===p?'white':C.muted, borderColor:page===p?C.mint:'rgba(107,122,118,0.12)', fontFamily:"'Inter',sans-serif" }}>{p}</button>
          ))}
          <button onClick={()=>setPage(Math.min(totalPages,page+1))} disabled={page>=totalPages} style={{ width:44, height:44, borderRadius:12, backgroundColor:'white', border:'1px solid rgba(107,122,118,0.12)', cursor:page>=totalPages?'not-allowed':'pointer', opacity:page>=totalPages?0.4:1, display:'flex', alignItems:'center', justifyContent:'center', color:C.muted }}><ChevronRight size={18}/></button>
        </div>

        {/* TRENDING */}
        <section style={{ marginBottom:64 }}>
          <h2 style={{ ...UB, fontSize:22, color:C.ink, marginBottom:20 }}>Trending Land Searches</h2>
          <div style={{ display:'flex', gap:10, flexWrap:'wrap' }}>
            {['Residential Plot Rabat','Commercial Land Casablanca','Farm Land Meknès','Industrial Zone Tanger','Coastal Land Agadir','Mixed Use Marrakech','Agricultural Plot Fès','Development Site','Beachfront Land','Building Plot Approved Permits','Large Agricultural','Free Zone Plot'].map(tag=>(
              <span key={tag} style={{ display:'inline-block', padding:'9px 18px', borderRadius:100, fontSize:13, fontWeight:700, backgroundColor:'white', color:C.ink, border:'1px solid rgba(186,202,197,0.4)', cursor:'pointer', transition:'all 0.15s' }}
                onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.backgroundColor=C.mint;(e.currentTarget as HTMLElement).style.color='white'}}
                onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.backgroundColor='white';(e.currentTarget as HTMLElement).style.color=C.ink}}>
                {tag}
              </span>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section style={{ borderRadius:40, background:`linear-gradient(135deg,${C.mint},${C.mintDk})`, padding:'56px 64px', display:'flex', alignItems:'center', justifyContent:'space-between', gap:40, flexWrap:'wrap', marginBottom:64 }}>
          <div>
            <h2 style={{ ...UB, fontSize:'clamp(24px,4vw,42px)', color:'white', marginBottom:12, lineHeight:1.05 }}>GOT LAND TO SELL?<br/>LIST IT FOR FREE.</h2>
            <p style={{ fontSize:15, color:'rgba(255,255,255,0.85)', maxWidth:480, lineHeight:1.7 }}>Reach Morocco's most serious land buyers and developers — post your plot in 2 minutes, completely free.</p>
            <div style={{ display:'flex', gap:12, marginTop:24 }}>
              <button style={{ backgroundColor:'white', color:C.mint, border:'none', padding:'12px 24px', borderRadius:100, fontWeight:800, fontSize:13, cursor:'pointer' }}>🍎 App Store</button>
              <button style={{ backgroundColor:'rgba(255,255,255,0.15)', color:'white', border:'1px solid rgba(255,255,255,0.4)', padding:'12px 24px', borderRadius:100, fontWeight:800, fontSize:13, cursor:'pointer' }}>▶ Google Play</button>
            </div>
          </div>
          <Link href={`/${locale}/post-ad`} style={{ textDecoration:'none' }}>
            <span style={{ display:'inline-block', backgroundColor:'white', color:C.mint, padding:'18px 40px', borderRadius:100, fontWeight:900, fontSize:15, cursor:'pointer', whiteSpace:'nowrap', ...UB, boxShadow:'0 8px 32px rgba(0,0,0,0.15)' }}>Post Free Ad →</span>
          </Link>
        </section>

        {/* BACK NAV */}
        <div style={{ borderTop:'1px solid rgba(186,202,197,0.3)', paddingTop:40 }}>
          <p style={{ fontSize:12, fontWeight:800, color:C.muted, textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:20, textAlign:'center' }}>Navigate Property</p>
          <div style={{ display:'flex', gap:10, justifyContent:'center', flexWrap:'wrap' }}>
            {[
              { label:'← For Sale',      href:`/${locale}/property/for-sale`     },
              { label:'← Commercial',    href:`/${locale}/property/commercial`    },
              { label:'← New Projects',  href:`/${locale}/property/new-projects`  },
              { label:'← Property Hub',  href:`/${locale}/property`               },
              { label:'← Home',          href:`/${locale}`                        },
            ].map((b,i)=>(
              <Link key={b.label} href={b.href}
                style={{ padding:'12px 22px', borderRadius:100, textDecoration:'none', fontSize:13, fontWeight:900, fontFamily:"'Inter',sans-serif", transition:'all 0.2s', display:'flex', alignItems:'center', gap:5,
                  backgroundColor: i===4 ? C.ink : 'white',
                  color:           i===4 ? 'white' : C.ink,
                  border:          i===4 ? 'none' : '1.5px solid rgba(186,202,197,0.4)' }}
                onMouseEnter={e=>{if(i<4){(e.currentTarget as HTMLElement).style.borderColor=C.mint;(e.currentTarget as HTMLElement).style.color=C.mint}else{(e.currentTarget as HTMLElement).style.backgroundColor=C.mint}}}
                onMouseLeave={e=>{if(i<4){(e.currentTarget as HTMLElement).style.borderColor='rgba(186,202,197,0.4)';(e.currentTarget as HTMLElement).style.color=C.ink}else{(e.currentTarget as HTMLElement).style.backgroundColor=C.ink}}}>
                {b.label}
              </Link>
            ))}
          </div>
        </div>

        <CategoryFooterNav
          backHref={`/${locale}/property`}
          backLabel="Back to All Property"
          inkColor={C.ink}
          mintDkColor={C.mintDk}
        />

      </div>
    </div>
  )
}
