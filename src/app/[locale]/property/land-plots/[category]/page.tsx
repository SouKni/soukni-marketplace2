'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Search, ChevronRight, ChevronLeft, MapPin, Maximize, Phone, LayoutGrid, List, FileCheck, Heart } from 'lucide-react'
import { useParams } from 'next/navigation'
import { useListings } from '@/hooks/useListings'

const C = { mint:'#22d4a8', mintDk:'#0f9b8e', ink:'#161d1b', surface:'#f4fbf8', muted:'#6b7a76' }
const UB = { fontFamily:"'Inter',sans-serif", fontWeight:900, letterSpacing:'-0.05em' } as const
const CB = { fontFamily:"'Hanken Grotesk',sans-serif", fontWeight:900, letterSpacing:'-0.03em' } as const

const CAT_DATA: Record<string,{ label:string; hero:string; desc:string; count:string; emoji:string; priceRanges:string[] }> = {
  'residential':  { label:'Residential Land',   emoji:'🏠', hero:'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&w=1600',   desc:'Ready-to-build residential plots — serviced and approved across Morocco.',        count:'1,840', priceRanges:['Any Price','Under 500K MAD','500K–1.5M MAD','1.5M–4M MAD','4M+ MAD'] },
  'commercial':   { label:'Commercial Land',    emoji:'🏪', hero:'https://images.pexels.com/photos/1109561/pexels-photo-1109561.jpeg?auto=compress&w=1600',   desc:'Prime commercial plots on main roads and business zones.',                        count:'680',   priceRanges:['Any Price','Under 1M MAD','1M–5M MAD','5M–15M MAD','15M+ MAD'] },
  'agricultural': { label:'Agricultural Land',  emoji:'🌾', hero:'https://images.pexels.com/photos/1148955/pexels-photo-1148955.jpeg?auto=compress&w=1600',   desc:'Farms, orchards and irrigated agricultural land across Morocco.',                 count:'920',   priceRanges:['Any Price','Under 300K MAD','300K–1M MAD','1M–5M MAD','5M+ MAD'] },
  'industrial':   { label:'Industrial Land',    emoji:'🏭', hero:'https://images.pexels.com/photos/1595109/pexels-photo-1595109.jpeg?auto=compress&w=1600',   desc:'Factory sites, logistics zones and industrial plots with planning permission.',   count:'340',   priceRanges:['Any Price','Under 2M MAD','2M–8M MAD','8M–25M MAD','25M+ MAD'] },
  'coastal':      { label:'Coastal Land',       emoji:'🌊', hero:'https://images.pexels.com/photos/2872755/pexels-photo-2872755.jpeg?auto=compress&w=1600',   desc:'Beachfront and sea-view land — the rarest and most sought-after plots.',         count:'210',   priceRanges:['Any Price','Under 1M MAD','1M–5M MAD','5M–15M MAD','15M+ MAD'] },
  'mixed-use':    { label:'Mixed-Use Land',     emoji:'🌆', hero:'https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg?auto=compress&w=1600',   desc:'Development sites approved for residential and commercial mixed use.',           count:'420',   priceRanges:['Any Price','Under 2M MAD','2M–8M MAD','8M–25M MAD','25M+ MAD'] },
}

const DEFAULT = CAT_DATA['residential']

const ALL_CATS = [
  { label:'Residential',  slug:'residential',  emoji:'🏠' },
  { label:'Commercial',   slug:'commercial',   emoji:'🏪' },
  { label:'Agricultural', slug:'agricultural', emoji:'🌾' },
  { label:'Industrial',   slug:'industrial',   emoji:'🏭' },
  { label:'Coastal',      slug:'coastal',      emoji:'🌊' },
  { label:'Mixed Use',    slug:'mixed-use',    emoji:'🌆' },
]

const PERMIT_CONFIG = {
  'approved':  { label:'Permits Approved', color:'#10b981', bg:'#f0fdf4' },
  'pending':   { label:'Permit Pending',   color:'#f59e0b', bg:'#fffbeb' },
  'no-permit': { label:'No Permit Yet',    color:C.muted,   bg:'#f4f4f4' },
}

const IMGS: Record<string,string[]> = {
  'residential':  ['https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&w=500','https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&w=500'],
  'commercial':   ['https://images.pexels.com/photos/1109561/pexels-photo-1109561.jpeg?auto=compress&w=500','https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&w=500'],
  'agricultural': ['https://images.pexels.com/photos/1148955/pexels-photo-1148955.jpeg?auto=compress&w=500','https://images.pexels.com/photos/162553/excavator-construction-site-machine-162553.jpeg?auto=compress&w=500'],
  'industrial':   ['https://images.pexels.com/photos/1595109/pexels-photo-1595109.jpeg?auto=compress&w=500','https://images.pexels.com/photos/2219024/pexels-photo-2219024.jpeg?auto=compress&w=500'],
  'coastal':      ['https://images.pexels.com/photos/2872755/pexels-photo-2872755.jpeg?auto=compress&w=500','https://images.pexels.com/photos/1268871/pexels-photo-1268871.jpeg?auto=compress&w=500'],
  'mixed-use':    ['https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg?auto=compress&w=500','https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&w=500'],
}

function makeListings(cat: string, count: number) {
  const titles: Record<string,string[]> = {
    'residential':  ['Residential Plot Ready to Build','Corner Plot Near School','Flat Plot — Approved Plans','Serviced Plot City Edge','Quiet Suburban Plot','Plot Near New Development','Gated Compound Plot','Large Family Plot'],
    'commercial':   ['Highway Frontage Commercial Plot','Retail Corner Plot','Commercial Site City Centre','Business Zone Development Land','Showroom Plot Main Road','Commercial Strip Land','Mixed Commercial Plot','High-Footfall Retail Site'],
    'agricultural': ['Irrigated Farm Land 5 Ha','Olive Orchard with Well','Citrus Farm — Water Rights','Agricultural Land Canal Access','Fertile Plain Plot','Vineyard Land with Permit','Mixed Crop Agricultural Land','Greenhouse Farm Land'],
    'industrial':   ['Industrial Zone Plot with Permits','Logistics Land Near Port','Factory Site Free Zone','Light Industrial Unit Land','Warehouse Development Plot','Industrial Park Lot','Production Site Land','Bonded Zone Development Land'],
    'coastal':      ['Beachfront Plot — Direct Access','Sea View Hillside Land','Coastal Development Site','Cliffside Plot Ocean View','Marina Adjacent Land','Seafront Strip Plot','Dune-Side Coastal Land','Atlantic Coastal Plot'],
    'mixed-use':    ['Mixed-Use Development Site','Live-Work Zone Plot','City Centre Redevelopment Site','Mixed Residential Commercial Land','Urban Infill Plot','Transit-Oriented Development Site','Brownfield Mixed-Use Land','Downtown Mixed Plot'],
  }
  const locs: Record<string,string[]> = {
    'residential':  ['Rabat, Outskirts','Casablanca, Bouskoura','Marrakech, Route de Fès','Tangier, Tétouan Road','Agadir, Outskirts'],
    'commercial':   ['Casablanca, Nouaceur','Rabat, Route Nationale','Marrakech, Artère Principale','Tangier, Zone Commerciale','Agadir, Centre'],
    'agricultural': ['Meknès Region','Souss Plain, Agadir','Gharb Plain','Haouz Plain, Marrakech','Tadla Plain'],
    'industrial':   ['Tanger Free Zone','Casablanca, Ain Sebaa','Rabat, Zone Industrielle','Agadir, Zone Industrielle','Kenitra Free Zone'],
    'coastal':      ['Agadir Coastline','Asilah, Atlantic','Essaouira Coast','El Jadida Seafront','Tangier Bay'],
    'mixed-use':    ['Casablanca, Ain Sebaa','Rabat, Hay Riad','Marrakech, Gueliz','Tangier, Centre','Fès, Ville Nouvelle'],
  }
  const permits = ['approved','approved','pending','approved','no-permit','pending','approved','approved']
  const t    = titles[cat] || titles['residential']
  const l    = locs[cat]   || locs['residential']
  const imgs = IMGS[cat]   || IMGS['residential']
  const baseArea = cat==='agricultural'?5000:cat==='industrial'?2000:cat==='coastal'?800:400
  return Array.from({length:count},(_,i)=>({
    id:          `${cat}-${i}`,
    title:       t[i%t.length],
    area:        baseArea + ((i*1337)%(baseArea*8)),
    price:       (300000 + ((i*2731000)%(cat==='coastal'?20000000:cat==='industrial'?15000000:8000000))),
    location:    l[i%l.length],
    permit:      permits[i%permits.length] as 'approved'|'pending'|'no-permit',
    serviced:    i%3 !== 2,
    road:        i%4 !== 3,
    image:       imgs[i%imgs.length],
    badge:       i===0?'Verified':i===1?'Exclusive':i===2?'New Listing':'Verified',
    waterRights: cat==='agricultural' && i%2===0,
    seaView:     cat==='coastal',
  }))
}

function PermitBadge({ status }: { status: string }) {
  const s = PERMIT_CONFIG[status as keyof typeof PERMIT_CONFIG] || PERMIT_CONFIG['no-permit']
  return (
    <span style={{ display:'inline-flex', alignItems:'center', gap:4, backgroundColor:s.bg, color:s.color, fontSize:'9px', fontWeight:800, padding:'3px 9px', borderRadius:100, textTransform:'uppercase', letterSpacing:'0.07em', whiteSpace:'nowrap' }}>
      <FileCheck size={10}/>{s.label}
    </span>
  )
}

function LandCard({ item, locale, view }: { item:any; locale:string; view:'grid'|'list' }) {
  const [saved, setSaved] = useState(false)
  const [hov,   setHov  ] = useState(false)
  const pricePerM2 = Math.round(item.price / item.area).toLocaleString()

  if (view === 'list') return (
    <Link href={`/${locale}/listing/${item.id}`} style={{ textDecoration:'none' }}>
      <article onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
        style={{ backgroundColor:'white', borderRadius:18, overflow:'hidden', boxShadow:hov?'0 12px 36px rgba(0,0,0,0.1)':'0 2px 8px rgba(0,0,0,0.05)', border:`1px solid ${hov?C.mint:'rgba(0,0,0,0.06)'}`, transition:'all 0.3s', display:'flex', cursor:'pointer', marginBottom:14 }}>
        <div style={{ position:'relative', width:240, flexShrink:0, overflow:'hidden' }}>
          <img src={item.image} alt={item.title} style={{ width:'100%', height:'100%', objectFit:'cover', transition:'transform 0.5s', transform:hov?'scale(1.04)':'scale(1)' }} />
          <div style={{ position:'absolute', top:10, left:10 }}>
            <span style={{ backgroundColor:C.mint, color:'white', fontSize:'9px', fontWeight:800, padding:'3px 9px', borderRadius:'4px', textTransform:'uppercase' }}>{item.badge}</span>
          </div>
          <div style={{ position:'absolute', bottom:10, left:10 }}><PermitBadge status={item.permit} /></div>
        </div>
        <div style={{ padding:'18px 22px', flex:1, display:'flex', flexDirection:'column', justifyContent:'space-between' }}>
          <div>
            <h3 style={{ ...CB, fontSize:'15px', color:hov?C.mint:C.ink, marginBottom:5, transition:'color 0.2s' }}>{item.title}</h3>
            <div style={{ display:'flex', alignItems:'center', gap:5, marginBottom:8 }}>
              <MapPin size={12} color={C.muted}/><span style={{ fontSize:'12px', color:C.muted, fontWeight:600 }}>{item.location}</span>
            </div>
            <div style={{ display:'flex', gap:14, flexWrap:'wrap' }}>
              <span style={{ fontSize:'12px', color:'#475569', fontWeight:600, display:'flex', alignItems:'center', gap:4 }}><Maximize size={13} color={C.mint}/>{item.area.toLocaleString()}m²</span>
              <span style={{ fontSize:'12px', color:'#475569', fontWeight:600 }}>📐 {pricePerM2} MAD/m²</span>
              {item.serviced && <span style={{ fontSize:'12px', color:'#10b981', fontWeight:700 }}>⚡ Serviced</span>}
              {item.road     && <span style={{ fontSize:'12px', color:'#475569', fontWeight:600 }}>🛣️ Road access</span>}
              {item.waterRights && <span style={{ fontSize:'12px', color:'#3b82f6', fontWeight:700 }}>💧 Water rights</span>}
              {item.seaView  && <span style={{ fontSize:'12px', color:'#0ea5e9', fontWeight:700 }}>🌊 Sea view</span>}
            </div>
          </div>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', paddingTop:12, borderTop:'1px solid #f1f5f9', marginTop:12 }}>
            <div>
              <span style={{ ...CB, fontSize:'20px', color:C.mint }}>{item.price.toLocaleString()} </span>
              <span style={{ fontSize:'12px', color:C.muted, fontWeight:600 }}>MAD</span>
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
        style={{ backgroundColor:'white', borderRadius:24, overflow:'hidden', boxShadow:hov?'0 20px 48px rgba(0,0,0,0.12)':'0 2px 12px rgba(0,0,0,0.06)', border:`1px solid ${hov?C.mint:'rgba(0,0,0,0.06)'}`, transition:'all 0.3s', cursor:'pointer' }}>
        <div style={{ position:'relative', aspectRatio:'16/10', overflow:'hidden' }}>
          <img src={item.image} alt={item.title} style={{ width:'100%', height:'100%', objectFit:'cover', transition:'transform 0.6s', transform:hov?'scale(1.06)':'scale(1)' }} />
          <div style={{ position:'absolute', top:12, left:12 }}>
            <span style={{ backgroundColor:C.mint, color:'white', fontSize:'9px', fontWeight:800, padding:'3px 9px', borderRadius:'4px', textTransform:'uppercase' }}>{item.badge}</span>
          </div>
          <button onClick={e=>{e.preventDefault();setSaved(!saved)}} style={{ position:'absolute', top:12, right:12, width:32, height:32, borderRadius:'50%', backgroundColor:'rgba(255,255,255,0.9)', border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}>
            <Heart size={15} fill={saved?'#ef4444':'none'} color={saved?'#ef4444':'#6b7a76'}/>
          </button>
          <div style={{ position:'absolute', bottom:12, left:12 }}><PermitBadge status={item.permit} /></div>
          <div style={{ position:'absolute', bottom:12, right:12, backgroundColor:'rgba(22,29,27,0.8)', backdropFilter:'blur(8px)', padding:'4px 10px', borderRadius:7 }}>
            <span style={{ color:'white', fontSize:'11px', fontWeight:800 }}>{item.area.toLocaleString()}m²</span>
          </div>
        </div>
        <div style={{ padding:'14px 16px' }}>
          <h3 style={{ ...CB, fontSize:'14px', color:hov?C.mint:C.ink, marginBottom:5, lineHeight:1.3, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap', transition:'color 0.2s' }}>{item.title}</h3>
          <div style={{ display:'flex', alignItems:'center', gap:4, marginBottom:8 }}>
            <MapPin size={11} color={C.muted}/><span style={{ fontSize:'11px', color:C.muted, fontWeight:600 }}>{item.location}</span>
          </div>
          <div style={{ display:'flex', gap:8, marginBottom:10, paddingTop:8, borderTop:'1px solid #f1f5f9', flexWrap:'wrap' }}>
            <span style={{ fontSize:'11px', color:'#475569', fontWeight:600, display:'flex', alignItems:'center', gap:3 }}><Maximize size={11} color={C.mint}/>{item.area.toLocaleString()}m²</span>
            <span style={{ fontSize:'11px', color:'#475569', fontWeight:600 }}>📐 {pricePerM2}/m²</span>
            {item.serviced && <span style={{ fontSize:'11px', color:'#10b981', fontWeight:700 }}>⚡ Serviced</span>}
            {item.seaView  && <span style={{ fontSize:'11px', color:'#0ea5e9', fontWeight:700 }}>🌊 Sea view</span>}
          </div>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
            <div>
              <span style={{ ...CB, fontSize:'17px', color:C.mint }}>{item.price.toLocaleString()} </span>
              <span style={{ fontSize:'10px', color:C.muted, fontWeight:600 }}>MAD</span>
            </div>
            <button onClick={e=>e.preventDefault()} style={{ padding:'7px 13px', borderRadius:100, backgroundColor:C.ink, color:'white', border:'none', fontSize:'11px', fontWeight:700, cursor:'pointer', transition:'background 0.2s', fontFamily:"'Inter',sans-serif", display:'flex', alignItems:'center', gap:4 }}
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

export default function LandSubPage() {
  const params  = useParams()
  const locale  = (params?.locale   as string) || 'en'
  const catSlug = (params?.category as string) || 'residential'
  const data    = CAT_DATA[catSlug] || DEFAULT

  const [permit,  setPermit ] = useState<'all'|'approved'|'pending'|'no-permit'>('all')
  const [city,    setCity   ] = useState('All Morocco')
  const [minArea, setMinArea] = useState('')
  const [maxArea, setMaxArea] = useState('')
  const [price,   setPrice  ] = useState('Any Price')
  const [view,    setView   ] = useState<'grid'|'list'>('grid')
  const [sort,    setSort   ] = useState<'Newest'|'Price Low'|'Price High'|'Largest'|'Price/m²'>('Newest')
  const [page,    setPage   ] = useState(1)
  const [keyword, setKeyword] = useState('')

  const cities = ['All Morocco','Casablanca','Rabat','Marrakech','Tangier','Agadir','Fès','Meknès']

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
      area: 500,
      price: (row.price || 0) / 100,
      location: row.city,
      permit: undefined as 'approved'|'pending'|'no-permit'|undefined,
      serviced: true,
      road: true,
      image: (row.images && row.images[0]) || (IMGS[catSlug] || IMGS['residential'])[0],
      badge: row.badge || 'Verified',
      waterRights: false,
      seaView: false,
    }
  }
  const hasRealData = dbListings.length > 0
  const allListings = hasRealData ? dbListings.map(mapDbRowToCard) : makeListings(catSlug, 18)
  const listings    = allListings.filter(l => permit === 'all' ? true : l.permit === permit)

  return (
    <div style={{ fontFamily:"'Inter',sans-serif", backgroundColor:C.surface, minHeight:'100vh' }}>

      {/* HERO */}
      <section style={{ position:'relative', height:460, overflow:'hidden', display:'flex', alignItems:'center', justifyContent:'center' }}>
        <img src={data.hero} alt={data.label} style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover' }} />
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top, rgba(15,23,42,0.94) 0%, rgba(15,23,42,0.45) 60%, rgba(15,23,42,0.15) 100%)' }} />
        <div style={{ position:'relative', zIndex:10, textAlign:'center', padding:'0 24px', maxWidth:760, width:'100%' }}>
          <p style={{ fontSize:11, fontWeight:800, color:C.mint, textTransform:'uppercase', letterSpacing:'0.2em', marginBottom:14 }}>Property › Lands &amp; Plots</p>
          <h1 style={{ ...UB, fontSize:'clamp(34px,5.5vw,62px)', color:'white', lineHeight:0.95, marginBottom:12, textTransform:'uppercase' }}>
            {data.emoji} {data.label}
          </h1>
          <p style={{ fontSize:15, color:'rgba(255,255,255,0.7)', marginBottom:28, lineHeight:1.6 }}>{data.desc}</p>
          <div style={{ display:'flex', alignItems:'stretch', backgroundColor:'rgba(255,255,255,0.12)', backdropFilter:'blur(24px)', border:'1px solid rgba(255,255,255,0.25)', borderRadius:100, overflow:'hidden', maxWidth:640, margin:'0 auto' }}>
            <div style={{ display:'flex', flexDirection:'column', padding:'13px 20px', flex:'0 0 150px', borderRight:'1px solid rgba(255,255,255,0.15)', gap:1 }}>
              <span style={{ fontSize:9, fontWeight:800, color:'rgba(255,255,255,0.5)', textTransform:'uppercase', letterSpacing:'0.12em' }}>City</span>
              <select value={city} onChange={e=>setCity(e.target.value)} style={{ backgroundColor:'transparent', border:'none', outline:'none', fontSize:13, fontWeight:700, color:'white', fontFamily:"'Inter',sans-serif", cursor:'pointer' }}>
                {cities.map(c=><option key={c} style={{ color:C.ink }}>{c}</option>)}
              </select>
            </div>
            <div style={{ display:'flex', flexDirection:'column', padding:'13px 20px', flex:1, borderRight:'1px solid rgba(255,255,255,0.15)', gap:1 }}>
              <span style={{ fontSize:9, fontWeight:800, color:'rgba(255,255,255,0.5)', textTransform:'uppercase', letterSpacing:'0.12em' }}>Keyword</span>
              <input value={keyword} onChange={e=>setKeyword(e.target.value)} placeholder={`Search ${data.label.toLowerCase()}...`} style={{ backgroundColor:'transparent', border:'none', outline:'none', fontSize:13, fontWeight:600, color:'white', fontFamily:"'Inter',sans-serif", padding:0 }} />
            </div>
            <button style={{ backgroundColor:C.mint, color:'white', border:'none', padding:'0 28px', fontWeight:800, fontSize:14, cursor:'pointer', flexShrink:0, transition:'background 0.15s', display:'flex', alignItems:'center', gap:7 }}
              onMouseEnter={e=>e.currentTarget.style.backgroundColor=C.mintDk}
              onMouseLeave={e=>e.currentTarget.style.backgroundColor=C.mint}>
              <Search size={15}/> Search
            </button>
          </div>
        </div>
      </section>

      {/* FILTER HUB */}
      <div style={{ maxWidth:1440, margin:'-26px auto 0', padding:'0 40px', position:'relative', zIndex:30 }}>
        <div style={{ backgroundColor:'rgba(255,255,255,0.97)', backdropFilter:'blur(20px)', borderRadius:32, boxShadow:'0 8px 40px rgba(0,0,0,0.10)', border:'1px solid rgba(255,255,255,0.7)', overflow:'hidden' }}>
          <div style={{ display:'flex', alignItems:'center', borderBottom:'1px solid rgba(186,202,197,0.2)' }}>
            {[
              { label:'City', content:<select value={city} onChange={e=>setCity(e.target.value)} style={{ border:'none', outline:'none', fontSize:14, fontWeight:700, color:C.ink, backgroundColor:'transparent', cursor:'pointer', fontFamily:"'Inter',sans-serif" }}>{cities.map(c=><option key={c}>{c}</option>)}</select> },
              { label:'Min Area (m²)', content:<input type="number" value={minArea} onChange={e=>setMinArea(e.target.value)} placeholder="Any" style={{ border:'none', outline:'none', fontSize:14, fontWeight:700, color:C.ink, backgroundColor:'transparent', fontFamily:"'Inter',sans-serif", width:80 }} /> },
              { label:'Max Area (m²)', content:<input type="number" value={maxArea} onChange={e=>setMaxArea(e.target.value)} placeholder="Any" style={{ border:'none', outline:'none', fontSize:14, fontWeight:700, color:C.ink, backgroundColor:'transparent', fontFamily:"'Inter',sans-serif", width:80 }} /> },
              { label:'Price Range', content:<select value={price} onChange={e=>setPrice(e.target.value)} style={{ border:'none', outline:'none', fontSize:14, fontWeight:700, color:C.ink, backgroundColor:'transparent', cursor:'pointer', fontFamily:"'Inter',sans-serif" }}>{data.priceRanges.map(p=><option key={p}>{p}</option>)}</select> },
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
          <div style={{ display:'flex', alignItems:'center', gap:8, padding:'10px 20px', flexWrap:'wrap' }}>
            <span style={{ fontSize:10, fontWeight:800, color:C.muted, textTransform:'uppercase', letterSpacing:'0.1em', flexShrink:0 }}>Permit:</span>
            {([
              { key:'all',        label:'All Plots' },
              { key:'approved',   label:'Permits Approved' },
              { key:'pending',    label:'Permit Pending' },
              { key:'no-permit',  label:'No Permit' },
            ] as const).map(p=>(
              <button key={p.key} onClick={()=>setPermit(p.key)}
                style={{ padding:'7px 16px', borderRadius:100, border:`1.5px solid ${permit===p.key?C.mint:'rgba(186,202,197,0.4)'}`, backgroundColor:permit===p.key?C.mint:'white', color:permit===p.key?'white':C.muted, cursor:'pointer', fontSize:12, fontWeight:700, transition:'all 0.2s', whiteSpace:'nowrap', fontFamily:"'Inter',sans-serif" }}>
                {p.label}
              </button>
            ))}
            <div style={{ width:1, height:20, backgroundColor:'rgba(186,202,197,0.4)', margin:'0 4px' }} />
            {['⚡ Serviced','🛣️ Road Access','🌊 Sea View','💧 Water Rights'].map(tag=>(
              <button key={tag} style={{ padding:'7px 14px', borderRadius:100, border:'1.5px solid rgba(186,202,197,0.4)', backgroundColor:'white', color:C.muted, cursor:'pointer', fontSize:11, fontWeight:700, whiteSpace:'nowrap', fontFamily:"'Inter',sans-serif", transition:'all 0.15s' }}
                onMouseEnter={e=>{e.currentTarget.style.borderColor=C.mint;e.currentTarget.style.color=C.mint}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor='rgba(186,202,197,0.4)';e.currentTarget.style.color=C.muted}}>
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth:1440, margin:'40px auto 0', padding:'0 40px 80px' }}>

        {/* BREADCRUMB */}
        <nav style={{ display:'flex', alignItems:'center', gap:6, fontSize:11, fontWeight:700, color:C.muted, textTransform:'uppercase', letterSpacing:'0.07em', marginBottom:24 }}>
          {[
            { label:'Home',          href:`/${locale}` },
            { label:'Property',      href:`/${locale}/property` },
            { label:'Lands & Plots', href:`/${locale}/property/land-plots` },
            { label:data.label,      href:null },
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

        {/* TITLE + CONTROLS */}
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', gap:16, marginBottom:24, flexWrap:'wrap' }}>
          <div>
            <h1 style={{ ...UB, fontSize:'clamp(22px,3vw,32px)', color:C.ink, marginBottom:4 }}>{data.label} for Sale in Morocco</h1>
            <p style={{ fontSize:15, color:C.mint, fontWeight:700 }}>{data.count} plots · {permit!=='all'?PERMIT_CONFIG[permit].label:'All permit statuses'}</p>
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:10 }}>
            <div style={{ display:'flex', gap:4, padding:'4px', backgroundColor:'#f4f4f4', borderRadius:100 }}>
              {(['Newest','Price Low','Price High','Largest','Price/m²'] as const).map(s=>(
                <button key={s} onClick={()=>setSort(s)} style={{ padding:'6px 12px', borderRadius:100, fontSize:10, fontWeight:800, border:'none', cursor:'pointer', fontFamily:"'Inter',sans-serif", transition:'all 0.2s', backgroundColor:sort===s?C.ink:'transparent', color:sort===s?'white':C.muted }}>{s}</button>
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
            <Link key={cat.slug} href={`/${locale}/property/land-plots/${cat.slug}`}
              style={{ padding:'9px 18px', borderRadius:100, fontSize:12, fontWeight:800, border:`1.5px solid ${catSlug===cat.slug?C.mint:'rgba(186,202,197,0.4)'}`, backgroundColor:catSlug===cat.slug?C.mint:'white', color:catSlug===cat.slug?'white':C.muted, textDecoration:'none', transition:'all 0.15s', fontFamily:"'Inter',sans-serif", display:'flex', alignItems:'center', gap:5 }}
              onMouseEnter={e=>{if(catSlug!==cat.slug){(e.currentTarget as HTMLElement).style.borderColor=C.mint;(e.currentTarget as HTMLElement).style.color=C.mint}}}
              onMouseLeave={e=>{if(catSlug!==cat.slug){(e.currentTarget as HTMLElement).style.borderColor='rgba(186,202,197,0.4)';(e.currentTarget as HTMLElement).style.color=C.muted}}}>
              {cat.emoji} {cat.label}
            </Link>
          ))}
          <Link href={`/${locale}/property/land-plots`}
            style={{ padding:'9px 18px', borderRadius:100, fontSize:12, fontWeight:800, border:'1.5px solid rgba(186,202,197,0.4)', backgroundColor:'white', color:C.muted, textDecoration:'none', fontFamily:"'Inter',sans-serif" }}>
            + View All
          </Link>
        </div>

        <p style={{ fontSize:13, color:C.muted, fontWeight:600, marginBottom:20 }}>{listings.length} {data.label.toLowerCase()} plots found</p>

        {/* LISTINGS */}
        {listings.length > 0 ? (
          view === 'grid' ? (
            <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:24, marginBottom:48 }}>
              {listings.map(item => <LandCard key={item.id} item={item} locale={locale} view="grid" />)}
            </div>
          ) : (
            <div style={{ marginBottom:48 }}>
              {listings.map(item => <LandCard key={item.id} item={item} locale={locale} view="list" />)}
            </div>
          )
        ) : (
          <div style={{ textAlign:'center', padding:'80px 0' }}>
            <span style={{ fontSize:48, display:'block', marginBottom:16 }}>🔍</span>
            <p style={{ fontSize:18, fontWeight:700, color:C.muted, marginBottom:16 }}>No plots match your filters.</p>
            <button onClick={()=>setPermit('all')} style={{ padding:'12px 28px', borderRadius:100, backgroundColor:C.mint, color:'white', border:'none', fontSize:14, fontWeight:700, cursor:'pointer' }}>Clear Filters</button>
          </div>
        )}

        {/* PAGINATION */}
        <div style={{ display:'flex', justifyContent:'center', alignItems:'center', gap:10, marginBottom:64 }}>
          <button onClick={()=>setPage(Math.max(1,page-1))} style={{ width:44, height:44, borderRadius:12, backgroundColor:'white', border:'1px solid rgba(107,122,118,0.12)', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', color:C.muted }}><ChevronLeft size={18}/></button>
          {[1,2,3].map(p=>(
            <button key={p} onClick={()=>setPage(p)} style={{ width:44, height:44, borderRadius:12, cursor:'pointer', fontSize:15, fontWeight:900, border:'1px solid', transition:'all 0.2s', backgroundColor:page===p?C.mint:'white', color:page===p?'white':C.muted, borderColor:page===p?C.mint:'rgba(107,122,118,0.12)', fontFamily:"'Inter',sans-serif" }}>{p}</button>
          ))}
          <button onClick={()=>setPage(Math.min(5,page+1))} style={{ width:44, height:44, borderRadius:12, backgroundColor:'white', border:'1px solid rgba(107,122,118,0.12)', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', color:C.muted }}><ChevronRight size={18}/></button>
        </div>

        {/* EXPLORE OTHER ZONE TYPES */}
        <div style={{ borderTop:'1px solid rgba(186,202,197,0.3)', paddingTop:40 }}>
          <p style={{ fontSize:12, fontWeight:800, color:C.muted, textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:20, textAlign:'center' }}>Explore Other Zone Types</p>
          <div style={{ display:'flex', gap:10, justifyContent:'center', flexWrap:'wrap', marginBottom:24 }}>
            {ALL_CATS.filter(c=>c.slug!==catSlug).map(cat=>(
              <Link key={cat.slug} href={`/${locale}/property/land-plots/${cat.slug}`}
                style={{ padding:'10px 22px', borderRadius:100, fontSize:12, fontWeight:800, border:'1.5px solid rgba(186,202,197,0.4)', backgroundColor:'white', color:C.muted, textDecoration:'none', transition:'all 0.2s', fontFamily:"'Inter',sans-serif", display:'flex', alignItems:'center', gap:5 }}
                onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.borderColor=C.mint;(e.currentTarget as HTMLElement).style.color=C.mint}}
                onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.borderColor='rgba(186,202,197,0.4)';(e.currentTarget as HTMLElement).style.color=C.muted}}>
                {cat.emoji} {cat.label}
              </Link>
            ))}
          </div>
          <div style={{ display:'flex', gap:10, justifyContent:'center', flexWrap:'wrap' }}>
            {[
              { label:'← All Land & Plots', href:`/${locale}/property/land-plots`    },
              { label:'← Property Hub',     href:`/${locale}/property`               },
              { label:'← Home',             href:`/${locale}`                        },
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
      </div>
    </div>
  )
}
