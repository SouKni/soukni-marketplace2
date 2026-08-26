'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Heart, Search, ChevronLeft, ChevronRight, MapPin, Maximize, Phone, Layers, TrendingUp, LayoutGrid, List } from 'lucide-react'
import { useParams } from 'next/navigation'
import { useListings } from '@/hooks/useListings'

const C = { mint:'#22d4a8', mintDk:'#0f9b8e', ink:'#161d1b', surface:'#f4fbf8', muted:'#6b7a76' }
const UB = { fontFamily:"'Inter',sans-serif", fontWeight:900, letterSpacing:'-0.05em' } as const
const CB = { fontFamily:"'Hanken Grotesk',sans-serif", fontWeight:900, letterSpacing:'-0.03em' } as const

const CAT_DATA: Record<string,{ label:string; hero:string; desc:string; count:string; areaUnit:string; priceRanges:string[] }> = {
  'offices':      { label:'Offices',             hero:'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&w=1600', desc:'Serviced desks to full headquarters — prime business addresses across Morocco.',       count:'2,840', areaUnit:'m²', priceRanges:['Any Price','Under 10K/mo','10K–30K/mo','30K–80K/mo','80K+/mo','Under 5M MAD','5M–20M MAD','20M+ MAD'] },
  'retail':       { label:'Retail & Shops',       hero:'https://images.pexels.com/photos/1109561/pexels-photo-1109561.jpeg?auto=compress&w=1600', desc:'High-street boutiques, mall units and neighbourhood shops for sale or rent.',           count:'1,920', areaUnit:'m²', priceRanges:['Any Price','Under 8K/mo','8K–25K/mo','25K–60K/mo','60K+/mo','Under 2M MAD','2M–10M MAD','10M+ MAD'] },
  'warehouses':   { label:'Warehouses',           hero:'https://images.pexels.com/photos/2219024/pexels-photo-2219024.jpeg?auto=compress&w=1600', desc:'Storage, logistics and distribution centres — industrial zones across Morocco.',         count:'680',   areaUnit:'m²', priceRanges:['Any Price','Under 20K/mo','20K–60K/mo','60K+/mo','Under 3M MAD','3M–15M MAD','15M+ MAD'] },
  'factories':    { label:'Factories',            hero:'https://images.pexels.com/photos/1595109/pexels-photo-1595109.jpeg?auto=compress&w=1600', desc:'Light and heavy manufacturing units in Moroccos industrial zones.',                     count:'340',   areaUnit:'m²', priceRanges:['Any Price','Under 50K/mo','50K–120K/mo','120K+/mo','Under 10M MAD','10M–50M MAD','50M+ MAD'] },
  'restaurants':  { label:'Restaurants & Food',   hero:'https://images.pexels.com/photos/380769/pexels-photo-380769.jpeg?auto=compress&w=1600',   desc:'Equipped kitchens, dining rooms and food court units — prime hospitality locations.',   count:'560',   areaUnit:'m²', priceRanges:['Any Price','Under 10K/mo','10K–30K/mo','30K+/mo','Under 1M MAD','1M–5M MAD','5M+ MAD'] },
  'hotels-comm':  { label:'Hotels & Guesthouses', hero:'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&w=1600',   desc:'Hospitality assets — from boutique riads to full hotel buildings for investors.',       count:'280',   areaUnit:'rooms', priceRanges:['Any Price','Under 5M MAD','5M–20M MAD','20M–80M MAD','80M+ MAD'] },
  'land-plots':   { label:'Land & Plots',         hero:'https://images.pexels.com/photos/162553/excavator-construction-site-machine-162553.jpeg?auto=compress&w=1600', desc:'Commercial development land, industrial plots and mixed-use zones.', count:'1,240', areaUnit:'m²', priceRanges:['Any Price','Under 2M MAD','2M–10M MAD','10M–50M MAD','50M+ MAD'] },
}

const DEFAULT = CAT_DATA['offices']

const ALL_CATS = [
  { label:'Offices',             slug:'offices'      },
  { label:'Retail & Shops',      slug:'retail'       },
  { label:'Warehouses',          slug:'warehouses'   },
  { label:'Factories',           slug:'factories'    },
  { label:'Restaurants & Food',  slug:'restaurants'  },
  { label:'Hotels & Guesthouses',slug:'hotels-comm'  },
  { label:'Land & Plots',        slug:'land-plots'   },
]

const IMGS = [
  'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&w=500',
  'https://images.pexels.com/photos/1109561/pexels-photo-1109561.jpeg?auto=compress&w=500',
  'https://images.pexels.com/photos/2219024/pexels-photo-2219024.jpeg?auto=compress&w=500',
  'https://images.pexels.com/photos/380769/pexels-photo-380769.jpeg?auto=compress&w=500',
  'https://images.pexels.com/photos/1595109/pexels-photo-1595109.jpeg?auto=compress&w=500',
]

function makeListings(cat: string, propFor: string) {
  const titles: Record<string,string[]> = {
    'offices':     ['Open-Plan HQ Floor — Finance District','Serviced Office Suite','Co-working Flexible Desks','Executive Suite — Sea View','Modern Open Office','Private Office 6 Pax','Corporate HQ Building','Glass Tower Floor 14'],
    'retail':      ['Prime Boutique Unit — City Centre','High-Street Shop Ground Floor','Mall Anchor Unit','Corner Shop Busy Junction','Designer Showroom','Supermarket Unit Large','Street-Level Gallery Space','Luxury Retail Suite'],
    'warehouses':  ['Logistics Hub — Port Zone','Cold Storage Warehouse','Distribution Centre','Cross-Dock Facility','Light Industrial Unit','High-Bay Warehouse','Bonded Warehouse Zone','Dry Storage Unit'],
    'factories':   ['Light Manufacturing Plant','Agro-Industrial Unit','Textile Factory Floor','Food Processing Unit','Auto Parts Workshop','Plastic Injection Unit','Bottling Plant Complete','Assembly Line Facility'],
    'restaurants': ['Fully Equipped Restaurant','Ghost Kitchen Unit','Café-Bar Ground Floor','Fine Dining Space','Fast Food Unit Mall','Beach Café with Terrace','Rooftop Bar Space','Catering Central Kitchen'],
    'hotels-comm': ['Boutique Hotel 18 Rooms','Guesthouse Medina View','Riad Investment 12 Rooms','Budget Hotel 40 Rooms','Aparthotel Block','Luxury Villa Hotel 8 Suites','Eco-Lodge 15 Rooms','Business Hotel City Centre'],
    'land-plots':  ['Commercial Plot Zone Industrielle','Development Land 5,000m²','Mixed-Use Plot City Centre','Retail Development Site','Industrial Land Port Zone','Agricultural & Commercial Land','Corner Plot Main Road','Building Plot Approved Plans'],
  }
  const locs   = ['Casablanca Finance City','Rabat, Agdal','Marrakech, Gueliz','Tangier Med Zone','Agadir, Zone Industrielle','Casablanca, Ain Sebaa','Fès, Zone Industrielle','Rabat, Hay Riad']
  const t      = titles[cat] || titles['offices']
  const data   = CAT_DATA[cat] || DEFAULT
  const badges = ['Verified','New Listing','Exclusive','Verified','Verified']
  const yields = [null, 6.8, null, 7.2, 8.1, null, 5.9, null]
  return Array.from({length:24},(_,i)=>({
    id:        `${cat}-${i}`,
    title:     t[i%t.length],
    price:     cat === 'land-plots' ? `${(2000+((i*4731)%48000)).toLocaleString()},000` : cat === 'hotels-comm' ? `${(5+((i*3)%75)).toLocaleString()},000,000` : propFor==='For Rent'||i%2===0 ? (15000+((i*1873)%85000)).toLocaleString() : `${(1+((i*2)%24)).toLocaleString()},000,000`,
    unit:      cat==='land-plots'||cat==='hotels-comm'||i%2!==0 ? 'MAD' : 'MAD/mo',
    location:  locs[i%locs.length],
    area:      cat==='hotels-comm' ? `${8+((i*3)%52)} rooms` : `${(80+((i*137)%3800)).toLocaleString()}${data.areaUnit}`,
    floor:     ['offices','retail','restaurants'].includes(cat) ? (i%4===0?'GF':i%4===1?'2nd':i%4===2?'5th':'10th') : null,
    parking:   cat!=='land-plots' ? (5+((i*7)%50)) : null,
    yield_pct: yields[i%yields.length],
    image:     IMGS[i%IMGS.length],
    badge:     badges[i%badges.length],
    badge2:    i%2===0 ? 'For Rent' : 'For Sale',
    diamond:   i%5===0,
  })).filter(l => propFor==='All' ? true : l.badge2===propFor)
}

function BadgeChip({ label }: { label: string }) {
  const green = label==='For Rent'||label==='Verified'
  return <span style={{ backgroundColor:green?C.mint:label==='For Sale'?C.ink:'rgba(15,23,42,0.85)', color:'white', fontSize:'9px', fontWeight:800, padding:'3px 9px', borderRadius:'4px', letterSpacing:'0.08em', textTransform:'uppercase' as const, whiteSpace:'nowrap' as const }}>{label}</span>
}

function CommCard({ item, locale, view }: { item:any; locale:string; view:'grid'|'list' }) {
  const [saved, setSaved] = useState(false)
  const [hov,   setHov  ] = useState(false)

  if (view === 'list') return (
    <Link href={`/${locale}/listing/${item.id}`} style={{ textDecoration:'none' }}>
      <article onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
        style={{ backgroundColor:'white', borderRadius:'16px', overflow:'hidden', boxShadow:hov?'0 12px 36px rgba(0,0,0,0.1)':'0 2px 8px rgba(0,0,0,0.05)', border:`1px solid ${hov?C.mint:'rgba(0,0,0,0.06)'}`, transition:'all 0.3s', display:'flex', cursor:'pointer', marginBottom:14 }}>
        <div style={{ position:'relative', width:220, flexShrink:0, overflow:'hidden' }}>
          <img src={item.image} alt={item.title} style={{ width:'100%', height:'100%', objectFit:'cover', transition:'transform 0.5s', transform:hov?'scale(1.04)':'scale(1)' }} />
          <div style={{ position:'absolute', top:10, left:10, display:'flex', gap:6 }}>
            <BadgeChip label={item.badge} />
            <BadgeChip label={item.badge2} />
          </div>
          {item.yield_pct && (
            <div style={{ position:'absolute', bottom:10, left:10, backgroundColor:`${C.mint}f0`, padding:'4px 10px', borderRadius:8, display:'flex', alignItems:'center', gap:4 }}>
              <TrendingUp size={11} color="white" />
              <span style={{ fontSize:'11px', fontWeight:800, color:'white' }}>{item.yield_pct}% yield</span>
            </div>
          )}
        </div>
        <div style={{ padding:'18px 22px', flex:1, display:'flex', flexDirection:'column', justifyContent:'space-between' }}>
          <div>
            <h3 style={{ ...CB, fontSize:'15px', color:hov?C.mint:C.ink, marginBottom:6, transition:'color 0.2s' }}>{item.title}</h3>
            <div style={{ display:'flex', alignItems:'center', gap:5, marginBottom:8 }}>
              <MapPin size={12} color={C.muted}/><span style={{ fontSize:'12px', color:C.muted, fontWeight:600 }}>{item.location}</span>
            </div>
            <div style={{ display:'flex', gap:14, flexWrap:'wrap' }}>
              <span style={{ fontSize:'12px', color:'#475569', fontWeight:600, display:'flex', alignItems:'center', gap:4 }}><Maximize size={13} color={C.mint}/>{item.area}</span>
              {item.floor && <span style={{ fontSize:'12px', color:'#475569', fontWeight:600, display:'flex', alignItems:'center', gap:4 }}><Layers size={13} color={C.mint}/>Floor: {item.floor}</span>}
              {item.parking && <span style={{ fontSize:'12px', color:'#475569', fontWeight:600 }}>🅿️ {item.parking} spaces</span>}
            </div>
          </div>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginTop:14, paddingTop:12, borderTop:'1px solid #f1f5f9' }}>
            <div>
              <span style={{ ...CB, fontSize:'20px', color:C.mint }}>{item.price} </span>
              <span style={{ fontSize:'12px', color:C.muted, fontWeight:600 }}>{item.unit.includes('/')?item.unit:'MAD'}</span>
            </div>
            <div style={{ display:'flex', gap:8 }}>
              <button onClick={e=>e.preventDefault()} style={{ padding:'8px 16px', borderRadius:100, backgroundColor:C.surface, color:C.ink, border:'none', fontSize:'12px', fontWeight:700, cursor:'pointer', fontFamily:"'Inter',sans-serif" }}>Message</button>
              <button onClick={e=>e.preventDefault()} style={{ padding:'8px 16px', borderRadius:100, backgroundColor:C.mint, color:'white', border:'none', fontSize:'12px', fontWeight:700, cursor:'pointer', display:'flex', alignItems:'center', gap:5, fontFamily:"'Inter',sans-serif" }}><Phone size={12}/>Contact</button>
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
          <div style={{ position:'absolute', top:'10px', left:'10px', display:'flex', gap:'5px', flexWrap:'wrap' }}>
            <BadgeChip label={item.badge} />
            <BadgeChip label={item.badge2} />
          </div>
          <button onClick={e=>{e.preventDefault();setSaved(!saved)}}
            style={{ position:'absolute', top:'10px', right:'10px', width:'32px', height:'32px', borderRadius:'50%', backgroundColor:'rgba(255,255,255,0.9)', border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}>
            <Heart size={15} fill={saved?'#ef4444':'none'} color={saved?'#ef4444':'#6b7a76'} />
          </button>
          {item.yield_pct && (
            <div style={{ position:'absolute', bottom:'10px', left:'10px', background:`linear-gradient(135deg,${C.mint},${C.mintDk})`, padding:'4px 10px', borderRadius:'7px', display:'flex', alignItems:'center', gap:4 }}>
              <TrendingUp size={11} color="white"/>
              <span style={{ color:'white', fontSize:'10px', fontWeight:800 }}>{item.yield_pct}% yield</span>
            </div>
          )}
        </div>
        <div style={{ padding:'14px 16px' }}>
          <h3 style={{ ...CB, fontSize:'13px', color:hov?C.mint:C.ink, marginBottom:'5px', lineHeight:1.3, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' as const, transition:'color 0.2s' }}>{item.title}</h3>
          <div style={{ display:'flex', alignItems:'center', gap:'4px', marginBottom:'8px' }}>
            <MapPin size={11} color={C.muted}/>
            <span style={{ fontSize:'11px', color:C.muted, fontWeight:600 }}>{item.location}</span>
          </div>
          <div style={{ display:'flex', gap:'10px', marginBottom:'10px', paddingTop:'8px', borderTop:'1px solid #f1f5f9', flexWrap:'wrap' }}>
            <span style={{ fontSize:'11px', color:'#475569', fontWeight:600, display:'flex', alignItems:'center', gap:3 }}><Maximize size={11} color={C.mint}/>{item.area}</span>
            {item.floor && <span style={{ fontSize:'11px', color:'#475569', fontWeight:600, display:'flex', alignItems:'center', gap:3 }}><Layers size={11} color={C.mint}/>{item.floor}</span>}
            {item.parking && <span style={{ fontSize:'11px', color:'#475569', fontWeight:600 }}>🅿️{item.parking}</span>}
          </div>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
            <div>
              <span style={{ ...CB, fontSize:'17px', color:C.mint }}>{item.price} </span>
              <span style={{ fontSize:'10px', color:C.muted, fontWeight:600 }}>{item.unit.includes('/')?item.unit:'MAD'}</span>
            </div>
            <button onClick={e=>e.preventDefault()} style={{ padding:'7px 13px', borderRadius:'100px', backgroundColor:C.ink, color:'white', border:'none', fontSize:'11px', fontWeight:700, cursor:'pointer', transition:'background 0.2s', fontFamily:"'Inter',sans-serif", display:'flex', alignItems:'center', gap:4 }}
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

export default function CommercialSubPage() {
  const params  = useParams()
  const locale  = (params?.locale   as string) || 'en'
  const catSlug = (params?.category as string) || 'offices'
  const data    = CAT_DATA[catSlug] || DEFAULT

  const [propFor,    setPropFor   ] = useState<'All'|'For Sale'|'For Rent'>('All')
  const [city,       setCity      ] = useState('All Morocco')
  const [priceRange, setPriceRange] = useState('Any Price')
  const [minArea,    setMinArea   ] = useState('')
  const [maxArea,    setMaxArea   ] = useState('')
  const [seller,     setSeller    ] = useState<'All Sellers'|'SouKni Agencies'|'Verified Owners'>('All Sellers')
  const [view,       setView      ] = useState<'grid'|'list'>('grid')
  const [page,       setPage      ] = useState(1)
  const [keyword,    setKeyword   ] = useState('')

  const cities  = ['All Morocco','Casablanca','Rabat','Marrakech','Tangier','Agadir','Fès','Meknès']

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
      price: Math.round((row.price || 0) / 100).toLocaleString(),
      unit: 'MAD',
      location: row.city,
      area: '',
      floor: null,
      parking: null,
      yield_pct: null,
      image: (row.images && row.images[0]) || IMGS[0],
      badge: row.badge || 'Verified',
      badge2: undefined,
      diamond: false,
    }
  }
  const hasRealDataAll = dbListings.length > 0
  const filteredReal = dbListings.map(mapDbRowToCard).filter(l => propFor === 'All' ? true : l.badge2 === propFor)
  const listings = hasRealDataAll ? filteredReal : makeListings(catSlug, propFor)

  return (
    <div style={{ fontFamily:"'Inter',sans-serif", backgroundColor:C.surface, minHeight:'100vh' }}>

      {/* HERO */}
      <section style={{ position:'relative', height:460, overflow:'hidden', display:'flex', alignItems:'center', justifyContent:'center' }}>
        <img src={data.hero} alt={data.label} style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover' }} />
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top, rgba(15,23,42,0.94) 0%, rgba(15,23,42,0.45) 60%, rgba(15,23,42,0.15) 100%)' }} />
        <div style={{ position:'relative', zIndex:10, textAlign:'center', padding:'0 24px', maxWidth:780, width:'100%' }}>
          <p style={{ fontSize:11, fontWeight:800, color:C.mint, textTransform:'uppercase', letterSpacing:'0.2em', marginBottom:14 }}>Property › Commercial</p>
          <h1 style={{ ...UB, fontSize:'clamp(34px,5.5vw,62px)', color:'white', lineHeight:0.95, marginBottom:12, textTransform:'uppercase' }}>
            {data.label}
          </h1>
          <p style={{ fontSize:15, color:'rgba(255,255,255,0.7)', marginBottom:28, lineHeight:1.6 }}>{data.desc}</p>
          <div style={{ display:'flex', alignItems:'stretch', backgroundColor:'rgba(255,255,255,0.1)', backdropFilter:'blur(24px)', border:'1px solid rgba(255,255,255,0.2)', borderRadius:100, overflow:'hidden', maxWidth:640, margin:'0 auto' }}>
            <div style={{ display:'flex', flexDirection:'column', padding:'12px 20px', flex:'0 0 150px', borderRight:'1px solid rgba(255,255,255,0.15)', gap:1 }}>
              <span style={{ fontSize:8, fontWeight:800, color:'rgba(255,255,255,0.5)', textTransform:'uppercase', letterSpacing:'0.12em' }}>City</span>
              <select value={city} onChange={e=>setCity(e.target.value)} style={{ backgroundColor:'transparent', border:'none', outline:'none', fontSize:13, fontWeight:700, color:'white', fontFamily:"'Inter',sans-serif", cursor:'pointer' }}>
                {cities.map(c=><option key={c} style={{ color:C.ink }}>{c}</option>)}
              </select>
            </div>
            <div style={{ display:'flex', flexDirection:'column', padding:'12px 20px', flex:1, borderRight:'1px solid rgba(255,255,255,0.15)', gap:1 }}>
              <span style={{ fontSize:8, fontWeight:800, color:'rgba(255,255,255,0.5)', textTransform:'uppercase', letterSpacing:'0.12em' }}>Keyword</span>
              <input value={keyword} onChange={e=>setKeyword(e.target.value)} placeholder="Area, building, zone..." style={{ backgroundColor:'transparent', border:'none', outline:'none', fontSize:13, fontWeight:600, color:'white', fontFamily:"'Inter',sans-serif", padding:0 }} />
            </div>
            <button style={{ backgroundColor:C.mint, color:'white', border:'none', padding:'0 28px', fontWeight:800, fontSize:14, cursor:'pointer', flexShrink:0, transition:'background 0.15s', display:'flex', alignItems:'center', gap:6 }}
              onMouseEnter={e=>e.currentTarget.style.backgroundColor=C.mintDk}
              onMouseLeave={e=>e.currentTarget.style.backgroundColor=C.mint}>
              <Search size={15}/> SEARCH
            </button>
          </div>
        </div>
      </section>

      {/* STICKY RICH FILTER BAR */}
      <div style={{ backgroundColor:'white', borderBottom:'1px solid rgba(186,202,197,0.3)', boxShadow:'0 4px 24px rgba(0,0,0,0.06)', position:'sticky', top:0, zIndex:40 }}>
        <div style={{ maxWidth:1440, margin:'0 auto', padding:'0 40px', display:'flex', alignItems:'center', height:72 }}>
          {[
            { label:'LOCATION',     content:<select value={city} onChange={e=>setCity(e.target.value)} style={{ border:'none', outline:'none', fontSize:14, fontWeight:700, color:C.ink, fontFamily:"'Inter',sans-serif", backgroundColor:'transparent', cursor:'pointer' }}>{cities.map(c=><option key={c}>{c}</option>)}</select> },
            { label:'PROPERTY FOR', content:<select value={propFor} onChange={e=>setPropFor(e.target.value as any)} style={{ border:'none', outline:'none', fontSize:14, fontWeight:700, color:C.ink, fontFamily:"'Inter',sans-serif", backgroundColor:'transparent', cursor:'pointer' }}>{['All','For Sale','For Rent'].map(o=><option key={o}>{o}</option>)}</select> },
            { label:'PRICE RANGE',  content:<select value={priceRange} onChange={e=>setPriceRange(e.target.value)} style={{ border:'none', outline:'none', fontSize:14, fontWeight:700, color:C.ink, fontFamily:"'Inter',sans-serif", backgroundColor:'transparent', cursor:'pointer' }}>{data.priceRanges.map(o=><option key={o}>{o}</option>)}</select> },
            { label:`MIN AREA (${data.areaUnit})`, content:<input type="number" value={minArea} onChange={e=>setMinArea(e.target.value)} placeholder="Any" style={{ border:'none', outline:'none', fontSize:14, fontWeight:700, color:C.ink, fontFamily:"'Inter',sans-serif", backgroundColor:'transparent', width:80 }} /> },
            { label:`MAX AREA (${data.areaUnit})`, content:<input type="number" value={maxArea} onChange={e=>setMaxArea(e.target.value)} placeholder="Any" style={{ border:'none', outline:'none', fontSize:14, fontWeight:700, color:C.ink, fontFamily:"'Inter',sans-serif", backgroundColor:'transparent', width:80 }} /> },
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
        <nav style={{ display:'flex', alignItems:'center', gap:6, fontSize:11, fontWeight:700, color:C.muted, textTransform:'uppercase', letterSpacing:'0.07em', marginBottom:24 }}>
          {[
            { label:'Home',       href:`/${locale}` },
            { label:'Property',   href:`/${locale}/property` },
            { label:'Commercial', href:`/${locale}/property/commercial` },
            { label:data.label,   href:null },
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

        {/* TITLE ROW */}
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', gap:16, marginBottom:20, flexWrap:'wrap' }}>
          <div>
            <h1 style={{ ...UB, fontSize:'clamp(22px,3vw,32px)', color:C.ink, marginBottom:4 }}>{data.label} — For Sale &amp; For Rent in Morocco</h1>
            <p style={{ fontSize:15, color:C.mint, fontWeight:700 }}>{data.count} listings · {propFor !== 'All' ? propFor : 'Sale & Rent'}</p>
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:10 }}>
            <button style={{ padding:'9px 18px', borderRadius:100, border:'1px solid rgba(186,202,197,0.4)', backgroundColor:'white', fontSize:12, fontWeight:700, color:C.ink, cursor:'pointer', fontFamily:"'Inter',sans-serif" }}>↕ Sort: Popular</button>
            <button style={{ padding:'9px 18px', borderRadius:100, border:'1px solid rgba(186,202,197,0.4)', backgroundColor:'white', fontSize:12, fontWeight:700, color:C.ink, cursor:'pointer', fontFamily:"'Inter',sans-serif" }}>🔖 Save Search</button>
          </div>
        </div>

        {/* CATEGORY PILLS */}
        <div style={{ display:'flex', gap:10, flexWrap:'wrap', marginBottom:20 }}>
          {ALL_CATS.map(cat=>(
            <Link key={cat.slug} href={`/${locale}/property/commercial/${cat.slug}`}
              style={{ padding:'9px 20px', borderRadius:100, fontSize:11, fontWeight:900, border:`1.5px solid ${catSlug===cat.slug?C.mint:'rgba(186,202,197,0.4)'}`, backgroundColor:catSlug===cat.slug?C.mint:'white', color:catSlug===cat.slug?'white':C.muted, textDecoration:'none', transition:'all 0.15s', fontFamily:"'Inter',sans-serif", textTransform:'uppercase', letterSpacing:'0.06em' }}
              onMouseEnter={e=>{if(catSlug!==cat.slug){(e.currentTarget as HTMLElement).style.borderColor=C.mint;(e.currentTarget as HTMLElement).style.color=C.ink}}}
              onMouseLeave={e=>{if(catSlug!==cat.slug){(e.currentTarget as HTMLElement).style.borderColor='rgba(186,202,197,0.4)';(e.currentTarget as HTMLElement).style.color=C.muted}}}>
              {cat.label}
            </Link>
          ))}
          <Link href={`/${locale}/property/commercial`}
            style={{ padding:'9px 20px', borderRadius:100, fontSize:11, fontWeight:900, border:'1.5px solid rgba(186,202,197,0.4)', backgroundColor:'white', color:C.muted, textDecoration:'none', fontFamily:"'Inter',sans-serif", textTransform:'uppercase', letterSpacing:'0.06em' }}>
            + View More
          </Link>
        </div>

        {/* SELLER TABS + FOR SALE/RENT + VIEW TOGGLE */}
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:12, marginBottom:24 }}>
          <div style={{ display:'flex', gap:4, padding:'4px', backgroundColor:'#e8efec', borderRadius:100 }}>
            {(['All Sellers','SouKni Agencies','Verified Owners'] as const).map(tab=>(
              <button key={tab} onClick={()=>setSeller(tab)}
                style={{ padding:'9px 20px', borderRadius:100, fontSize:11, fontWeight:900, border:'none', cursor:'pointer', fontFamily:"'Inter',sans-serif", textTransform:'uppercase', letterSpacing:'0.06em', transition:'all 0.2s',
                  backgroundColor:seller===tab?C.ink:'transparent', color:seller===tab?'white':C.muted, boxShadow:seller===tab?'0 2px 8px rgba(0,0,0,0.15)':'none' }}>
                {tab}
              </button>
            ))}
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:10 }}>
            {/* For Sale / For Rent / All */}
            <div style={{ display:'flex', gap:6 }}>
              {(['All','For Sale','For Rent'] as const).map(f=>(
                <button key={f} onClick={()=>setPropFor(f)}
                  style={{ padding:'8px 18px', borderRadius:100, fontSize:12, fontWeight:700, border:`1.5px solid ${propFor===f?C.mint:'rgba(186,202,197,0.4)'}`, backgroundColor:propFor===f?C.mint:'white', color:propFor===f?'white':C.muted, cursor:'pointer', transition:'all 0.15s', fontFamily:"'Inter',sans-serif" }}>
                  {f}
                </button>
              ))}
            </div>
            {/* Grid/List */}
            <div style={{ display:'flex', gap:2, padding:'3px', backgroundColor:'white', borderRadius:10, border:'1px solid rgba(186,202,197,0.3)' }}>
              <button onClick={()=>setView('grid')} style={{ width:36, height:36, borderRadius:8, border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', backgroundColor:view==='grid'?C.ink:'transparent', transition:'all 0.2s' }}>
                <LayoutGrid size={16} color={view==='grid'?'white':C.muted}/>
              </button>
              <button onClick={()=>setView('list')} style={{ width:36, height:36, borderRadius:8, border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', backgroundColor:view==='list'?C.ink:'transparent', transition:'all 0.2s' }}>
                <List size={16} color={view==='list'?'white':C.muted}/>
              </button>
            </div>
          </div>
        </div>

        {/* RESULTS COUNT */}
        <p style={{ fontSize:13, color:C.muted, fontWeight:600, marginBottom:20 }}>
          Showing {listings.length} of {data.count} {data.label.toLowerCase()} listings
          {propFor !== 'All' ? ` · ${propFor}` : ''}{seller !== 'All Sellers' ? ` · ${seller}` : ''}
        </p>

        {/* LISTINGS */}
        {listings.length > 0 ? (
          view === 'grid' ? (
            <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:24, marginBottom:48 }}>
              {listings.map(item => <CommCard key={item.id} item={item} locale={locale} view="grid" />)}
            </div>
          ) : (
            <div style={{ marginBottom:48 }}>
              {listings.map(item => <CommCard key={item.id} item={item} locale={locale} view="list" />)}
            </div>
          )
        ) : (
          <div style={{ textAlign:'center', padding:'80px 0' }}>
            <p style={{ fontSize:18, fontWeight:700, color:C.muted, marginBottom:16 }}>No listings found for current filters.</p>
            <button onClick={()=>{ setPropFor('All'); setSeller('All Sellers') }}
              style={{ padding:'12px 28px', borderRadius:100, backgroundColor:C.mint, color:'white', border:'none', fontSize:14, fontWeight:700, cursor:'pointer' }}>Clear Filters</button>
          </div>
        )}

        {/* PAGINATION */}
        <div style={{ display:'flex', justifyContent:'center', alignItems:'center', gap:10, marginBottom:64 }}>
          <button onClick={()=>setPage(Math.max(1,page-1))} style={{ width:44, height:44, borderRadius:12, backgroundColor:'white', border:'1px solid rgba(107,122,118,0.12)', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', color:C.muted }}><ChevronLeft size={18}/></button>
          {[1,2,3,4,5].map(p=>(
            <button key={p} onClick={()=>setPage(p)} style={{ width:44, height:44, borderRadius:12, cursor:'pointer', fontSize:15, fontWeight:900, border:'1px solid', transition:'all 0.2s', backgroundColor:page===p?C.mint:'white', color:page===p?'white':C.muted, borderColor:page===p?C.mint:'rgba(107,122,118,0.12)', fontFamily:"'Inter',sans-serif" }}>{p}</button>
          ))}
          <span style={{ color:C.muted, fontWeight:700 }}>…</span>
          <button style={{ width:44, height:44, borderRadius:12, backgroundColor:'white', border:'1px solid rgba(107,122,118,0.12)', cursor:'pointer', fontSize:14, fontWeight:700, color:C.muted }}>10</button>
          <button onClick={()=>setPage(Math.min(10,page+1))} style={{ width:44, height:44, borderRadius:12, backgroundColor:'white', border:'1px solid rgba(107,122,118,0.12)', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', color:C.muted }}><ChevronRight size={18}/></button>
        </div>

        {/* EXPLORE OTHER TYPES */}
        <div style={{ borderTop:'1px solid rgba(186,202,197,0.3)', paddingTop:40 }}>
          <p style={{ fontSize:12, fontWeight:800, color:C.muted, textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:20, textAlign:'center' }}>Explore Other Commercial Property Types</p>
          <div style={{ display:'flex', gap:10, justifyContent:'center', flexWrap:'wrap', marginBottom:24 }}>
            {ALL_CATS.filter(c=>c.slug!==catSlug).map(cat=>(
              <Link key={cat.slug} href={`/${locale}/property/commercial/${cat.slug}`}
                style={{ padding:'10px 22px', borderRadius:100, fontSize:12, fontWeight:900, border:'1.5px solid rgba(186,202,197,0.4)', backgroundColor:'white', color:C.muted, textDecoration:'none', transition:'all 0.2s', fontFamily:"'Inter',sans-serif", textTransform:'uppercase', letterSpacing:'0.06em' }}
                onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.borderColor=C.mint;(e.currentTarget as HTMLElement).style.color=C.mint}}
                onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.borderColor='rgba(186,202,197,0.4)';(e.currentTarget as HTMLElement).style.color=C.muted}}>
                {cat.label}
              </Link>
            ))}
          </div>

          {/* BACK BUTTONS */}
          <div style={{ display:'flex', gap:10, justifyContent:'center', flexWrap:'wrap' }}>
            {[
              { label:'← Commercial Hub', href:`/${locale}/property/commercial` },
              { label:'← For Sale',       href:`/${locale}/property/for-sale`   },
              { label:'← For Rent',       href:`/${locale}/property/for-rent`   },
              { label:'← Property Hub',   href:`/${locale}/property`            },
              { label:'← Home',           href:`/${locale}`                     },
            ].map((b,i)=>(
              <Link key={b.label} href={b.href}
                style={{ padding:'12px 24px', borderRadius:100, textDecoration:'none', fontSize:13, fontWeight:900, fontFamily:"'Inter',sans-serif", transition:'all 0.2s', display:'flex', alignItems:'center', gap:6,
                  border:`1.5px solid ${i===4?'none':'rgba(186,202,197,0.4)'}`,
                  backgroundColor: i===4 ? C.ink : 'white',
                  color: i===4 ? 'white' : C.ink }}
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
