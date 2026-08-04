'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { Heart, Search, ChevronDown, ChevronsLeft, ChevronLeft, ChevronRight, ChevronsRight, MapPin, Bed, Bath, Maximize, Phone } from 'lucide-react'

const C = { mint:'#22d4a8', mintDk:'#0f9b8e', ink:'#161d1b', surface:'#f4fbf8', muted:'#6b7a76' }
const UB = { fontFamily:"'Inter',sans-serif", fontWeight:900, letterSpacing:'-0.05em' } as const
const CB = { fontFamily:"'Hanken Grotesk',sans-serif", fontWeight:900, letterSpacing:'-0.03em' } as const

const ALL_CATS = [
  { label:'Apartments', slug:'apartments' }, { label:'Villas', slug:'villas' }, { label:'Riads', slug:'riads' },
  { label:'Studios', slug:'studios' }, { label:'Offices & Commercial', slug:'offices' }, { label:'Farmhouses', slug:'farmhouses' }, { label:'Land / Plots', slug:'land-plots' },
]

const listings = [
  { id:'st1', badge:'Verified', badge2:'Furnished', title:'Modern Furnished Studio — City Center', price:620000, location:'Casablanca, Maarif', baths:1, area:38, image:'https://images.pexels.com/photos/1743229/pexels-photo-1743229.jpeg?auto=compress&w=700' },
  { id:'st2', badge:'New', title:'Bright Studio Near Tramway', price:480000, location:'Rabat, Agdal', baths:1, area:32, image:'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&w=700' },
  { id:'st3', badge:'Verified', title:'Investment Studio — High Rental Yield', price:390000, location:'Marrakech Gueliz', baths:1, area:28, image:'https://images.pexels.com/photos/2581922/pexels-photo-2581922.jpeg?auto=compress&w=700' },
  { id:'st4', badge:'New Listing', title:'Student-Friendly Studio Near University', price:340000, location:'Rabat, Hay Riad', baths:1, area:26, image:'https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg?auto=compress&w=700' },
  { id:'st5', badge:'Verified', title:'Renovated Studio with Balcony', price:520000, location:'Tanger, Malabata', baths:1, area:35, image:'https://images.pexels.com/photos/440731/pexels-photo-440731.jpeg?auto=compress&w=700' },
  { id:'st6', badge:'Exclusive', title:'Sea View Studio Apartment', price:680000, location:'Casablanca Corniche', baths:1, area:40, image:'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&w=700' },
  { id:'st7', badge:'Verified', title:'Compact Studio Near Business District', price:560000, location:'Casablanca Finance City', baths:1, area:34, image:'https://images.pexels.com/photos/2581922/pexels-photo-2581922.jpeg?auto=compress&w=700' },
  { id:'st8', badge:'New', title:'Studio with Kitchenette — Ready to Move', price:410000, location:'Fès Ville Nouvelle', baths:1, area:30, image:'https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg?auto=compress&w=700' },
]


const newProjects = [
  { name:'Maarif Micro-Living', city:'Casablanca, Maarif', price:'From 350K MAD', image:'https://images.pexels.com/photos/1743229/pexels-photo-1743229.jpeg?auto=compress&w=200' },
  { name:'Agdal Smart Studios', city:'Agdal, Rabat',       price:'From 400K MAD', image:'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&w=200' },
]


function BadgeChip({ label }: { label: string }) {
  const isNavy = label === 'Pool' || label === 'New'
  return <span style={{ backgroundColor:isNavy?'rgba(15,23,42,0.8)':C.mint, color:'white', fontSize:9, fontWeight:800, padding:'3px 8px', borderRadius:4, letterSpacing:'0.08em', textTransform:'uppercase' as const }}>{label}</span>
}

function PropertyCard({ prop }: { prop: typeof listings[0] }) {
  const [saved, setSaved]     = useState(false)
  const [hovered, setHovered] = useState(false)
  return (
    <article onMouseEnter={()=>setHovered(true)} onMouseLeave={()=>setHovered(false)}
      style={{ backgroundColor:'white', borderRadius:16, overflow:'hidden', border:hovered?'1px solid rgba(34,212,168,0.3)':'1px solid #f1f5f9', display:'flex', height:240, boxShadow:'0 4px 20px rgba(0,0,0,0.05)', transition:'all 0.3s', cursor:'pointer' }}>
      <div style={{ width:'40%', position:'relative', overflow:'hidden', flexShrink:0 }}>
        <img src={prop.image} alt={prop.title} style={{ width:'100%', height:'100%', objectFit:'cover', transition:'transform 0.5s', transform:hovered?'scale(1.1)':'scale(1)' }} />
        <div style={{ position:'absolute', top:12, left:12, display:'flex', gap:6 }}>
          <BadgeChip label={prop.badge} />
          {(prop as any).badge2 && <BadgeChip label={(prop as any).badge2} />}
        </div>
        <button onClick={e=>{e.stopPropagation();setSaved(!saved)}}
          style={{ position:'absolute', top:10, right:10, width:34, height:34, borderRadius:'50%', backgroundColor:'rgba(255,255,255,0.2)', backdropFilter:'blur(12px)', border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}>
          <Heart size={16} fill={saved?'#ef4444':'none'} color={saved?'#ef4444':'white'} />
        </button>
      </div>
      <div style={{ flex:1, padding:20, display:'flex', flexDirection:'column' as const, justifyContent:'space-between' }}>
        <div>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:6 }}>
            <h3 style={{ fontSize:22, fontWeight:800, color:C.ink, letterSpacing:'-0.02em' }}>{prop.price} MAD</h3>
            <span style={{ fontSize:11, color:C.muted, fontWeight:500 }}>Studio</span>
          </div>
          <h2 style={{ fontSize:15, fontWeight:500, color:hovered?C.mint:'#0f172a', marginBottom:6, whiteSpace:'nowrap' as const, overflow:'hidden', textOverflow:'ellipsis', transition:'color 0.15s' }}>{prop.title}</h2>
          <div style={{ display:'flex', alignItems:'center', gap:4, color:C.muted, fontSize:12, marginBottom:14 }}>
            <MapPin size={13} /> {prop.location}
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:20, fontSize:12, color:'#475569', borderTop:'1px solid #f1f5f9', paddingTop:12 }}>
            {prop.baths && <span style={{ display:'flex', alignItems:'center', gap:6 }}><Bath size={14} /> {prop.baths} Baths</span>}
            {prop.area && <span style={{ display:'flex', alignItems:'center', gap:6 }}><Maximize size={14} /> {prop.area} sqm</span>}
          </div>
        </div>
        <div style={{ display:'flex', gap:10, marginTop:12 }}>
          <button style={{ flex:1, display:'flex', alignItems:'center', justifyContent:'center', gap:6, border:'1px solid #e2e8f0', backgroundColor:'transparent', color:C.ink, fontWeight:700, fontSize:13, padding:10, borderRadius:10, cursor:'pointer' }}>
            <Phone size={14} /> Call
          </button>
          <button style={{ flex:1, display:'flex', alignItems:'center', justifyContent:'center', gap:6, backgroundColor:C.mint, color:'white', fontWeight:700, fontSize:13, padding:10, borderRadius:10, border:'none', cursor:'pointer' }}>
            💬 WhatsApp
          </button>
        </div>
      </div>
    </article>
  )
}

export default function StudiosPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = React.use(params)
  const [currentPage,  setCurrentPage]  = useState(1)
  const [activeSeller, setActiveSeller] = useState('All Sellers')
  const [activeFilter, setActiveFilter] = useState('All')
  const [keyword, setKeyword]           = useState('')
  const [city, setCity]                 = useState('Casablanca')
  const [propertyType, setPropertyType] = useState('All Studios')
  const [price, setPrice]               = useState('Any Price')
  const [beds, setBeds]                 = useState('Any')
  const [cityOpen, setCityOpen]         = useState(false)
  const [typeOpen, setTypeOpen]         = useState(false)
  const [priceOpen, setPriceOpen]       = useState(false)
  const [bedsOpen, setBedsOpen]         = useState(false)
  const [propertyFor, setPropertyFor]   = useState('Buy or Sell')
  const [location, setLocation]         = useState('Cities & Neighbourhoods')
  const [filters, setFilters]           = useState('Baths, Area...')
  const [forOpen, setForOpen]           = useState(false)
  const [locOpen, setLocOpen]           = useState(false)
  const [filtOpen, setFiltOpen]         = useState(false)

  const cities        = ['Casablanca','Rabat','Marrakech','Tanger','Fès','Agadir']
  const propertyTypes = ['All Studios','City Center Studio','Furnished Studio','Investment Studio','Student Studio']
  const priceRanges   = ['Any Price','0 – 400,000 MAD','400,000 – 700,000 MAD','700,000 – 1M MAD','1M+ MAD']
  const bedOptions    = ['Studio Only']

  function DDrop({ label, value, options, open, setOpen, onChange }: any) {
    return (
      <div style={{ position:'relative', flex:1 }}>
        <button onClick={()=>{ setOpen(!open); setCityOpen(false); setTypeOpen(false); setPriceOpen(false); setBedsOpen(false); setForOpen(false); setLocOpen(false); setFiltOpen(false) }}
          style={{ width:'100%', height:'100%', background:'none', border:'none', cursor:'pointer', padding:'0 22px', display:'flex', flexDirection:'column' as const, justifyContent:'center', textAlign:'left' as const }}>
          <span style={{ fontSize:9, ...UB, textTransform:'uppercase' as const, letterSpacing:'0.14em', color:C.muted, marginBottom:3 }}>{label}</span>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
            <span style={{ fontSize:14, ...UB, color:C.ink }}>{value}</span>
            <ChevronDown size={14} color={C.mint} style={{ flexShrink:0, transition:'transform 0.2s', transform:open?'rotate(180deg)':'rotate(0)' }} />
          </div>
        </button>
        {open && (
          <div style={{ position:'absolute', top:'calc(100% + 8px)', left:0, minWidth:200, backgroundColor:'white', borderRadius:20, boxShadow:'0 20px 60px rgba(0,0,0,0.12)', border:'1px solid rgba(107,122,118,0.12)', zIndex:200, overflow:'hidden', padding:'8px 0' }}>
            {options.map((opt:string)=>(
              <button key={opt} onClick={()=>{ onChange(opt); setOpen(false) }}
                style={{ width:'100%', padding:'12px 20px', background:'none', border:'none', cursor:'pointer', textAlign:'left' as const, fontSize:14, ...UB, color:opt===value?C.mint:C.ink, display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                {opt}{opt===value&&<span style={{color:C.mint}}>✓</span>}</button>
            ))}
          </div>
        )}
      </div>
    )
  }

  return (
    <div style={{ ...UB, backgroundColor:C.surface, color:C.ink, minHeight:'100vh' }}>
      <section style={{ position:'relative', height:520, display:'flex', alignItems:'center', justifyContent:'center', overflow:'hidden' }}>
        <img src="https://images.pexels.com/photos/1743229/pexels-photo-1743229.jpeg?auto=compress&w=1600" alt="Studios" style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover' }} />
        <div style={{ position:'absolute', inset:0, backgroundColor:'rgba(22,29,27,0.48)' }} />
        <div style={{ position:'relative', zIndex:10, textAlign:'center' as const, maxWidth:960, padding:'0 24px', width:'100%' }}>
          <h1 style={{ fontSize:'clamp(36px,6vw,64px)', ...UB, color:'white', marginBottom:36, lineHeight:1, textShadow:'0 4px 20px rgba(0,0,0,0.4)' }}>
            STUDIOS.<br/><span style={{ color:C.mint }}>COMPACT CITY LIVING.</span>
          </h1>
          <div style={{ maxWidth:780, margin:'0 auto', backgroundColor:'rgba(255,255,255,0.12)', backdropFilter:'blur(12px)', border:'1px solid rgba(255,255,255,0.22)', borderRadius:100, padding:8, display:'flex', alignItems:'center' }}>
            <div style={{ flex:1, padding:'0 28px', borderRight:'1px solid rgba(255,255,255,0.22)', display:'flex', flexDirection:'column' as const, gap:2 }}>
              <span style={{ fontSize:9, ...UB, color:'rgba(255,255,255,0.62)', textTransform:'uppercase' as const, letterSpacing:'0.15em' }}>CITY</span>
              <div style={{ display:'flex', alignItems:'center', gap:6, color:'white', fontSize:14, ...UB }}>Marrakech <ChevronDown size={14} /></div>
            </div>
            <div style={{ flex:2, padding:'0 28px', display:'flex', flexDirection:'column' as const, gap:2 }}>
              <span style={{ fontSize:9, ...UB, color:'rgba(255,255,255,0.62)', textTransform:'uppercase' as const, letterSpacing:'0.15em' }}>KEYWORD</span>
              <input type="text" value={keyword} onChange={e=>setKeyword(e.target.value)} placeholder="Pool, garden, gated community..."
                style={{ backgroundColor:'transparent', border:'none', outline:'none', color:'white', fontSize:14, ...UB, fontFamily:"'Inter',sans-serif", width:'100%' }} />
            </div>
            <button style={{ backgroundColor:C.mint, color:'white', border:'none', padding:'16px 44px', borderRadius:100, fontSize:11, ...UB, textTransform:'uppercase' as const, letterSpacing:'0.12em', cursor:'pointer' }}>SEARCH</button>
          </div>
        </div>
      </section>

      <div style={{ maxWidth:1280, margin:'-40px auto 0', padding:'0 24px', position:'relative', zIndex:30 }}>
        <div style={{ backgroundColor:'rgba(255,255,255,0.97)', backdropFilter:'blur(16px)', border:'1px solid rgba(107,122,118,0.12)', borderRadius:100, boxShadow:'0 12px 40px rgba(0,0,0,0.08)', display:'flex', alignItems:'stretch', height:72 }}>
          <DDrop label="LOCATION" value={location} options={['Cities & Neighbourhoods','Marrakech','Casablanca','Rabat','Agadir','Tanger','Fès']} open={locOpen} setOpen={setLocOpen} onChange={setLocation} />
          <div style={{ width:1, backgroundColor:'rgba(107,122,118,0.12)', margin:'12px 0' }} />
          <DDrop label="PROPERTY FOR" value={propertyFor} options={['Buy or Sell','Buy','Sell']} open={forOpen} setOpen={setForOpen} onChange={setPropertyFor} />
          <div style={{ width:1, backgroundColor:'rgba(107,122,118,0.12)', margin:'12px 0' }} />
          <DDrop label="PROPERTY TYPE" value={propertyType} options={propertyTypes} open={typeOpen} setOpen={setTypeOpen} onChange={setPropertyType} />
          <div style={{ width:1, backgroundColor:'rgba(107,122,118,0.12)', margin:'12px 0' }} />
          <DDrop label="PRICE RANGE" value={price} options={priceRanges} open={priceOpen} setOpen={setPriceOpen} onChange={setPrice} />
          <div style={{ width:1, backgroundColor:'rgba(107,122,118,0.12)', margin:'12px 0' }} />
          <DDrop label="BEDS" value={beds} options={bedOptions} open={bedsOpen} setOpen={setBedsOpen} onChange={setBeds} />
          <div style={{ width:1, backgroundColor:'rgba(107,122,118,0.12)', margin:'12px 0' }} />
          <DDrop label="FILTERS" value={filters} options={['Baths, Area...','1+ Bath','2+ Baths','3+ Baths']} open={filtOpen} setOpen={setFiltOpen} onChange={setFilters} />
          <div style={{ width:1, backgroundColor:'rgba(107,122,118,0.12)', margin:'12px 0' }} />
          <button style={{ backgroundColor:C.mint, color:'white', border:'none', padding:'0 32px', cursor:'pointer', borderRadius:'0 100px 100px 0', flexShrink:0, display:'flex', alignItems:'center', gap:8 }}>
            <Search size={18} /> <span style={{ fontSize:12, ...UB }}>SEARCH</span>
          </button>
        </div>
      </div>

      <main style={{ maxWidth:1280, margin:'0 auto', padding:'32px 24px 80px' }}>
        <nav style={{ display:'flex', alignItems:'center', gap:6, fontSize:10, ...UB, color:C.muted, textTransform:'uppercase' as const, letterSpacing:'0.12em', marginBottom:12 }}>
          {['Rabat','Property','Villas'].map((c,i,arr)=>(
            <React.Fragment key={c}>
              {i<arr.length-1
                ? <><Link href={i===0?`/${locale}`:`/${locale}/property`} style={{ color:C.muted, textDecoration:'none' }}>{c}</Link><span style={{ opacity:0.4 }}>›</span></>
                : <span style={{ color:C.ink }}>{c}</span>}
            </React.Fragment>
          ))}
        </nav>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', gap:16, marginBottom:24, flexWrap:'wrap' as const }}>
          <div>
            <h2 style={{ fontSize:'clamp(20px,2.5vw,28px)', ...UB, color:C.ink, marginBottom:4 }}>Studios for Sale in Morocco</h2>
            <p style={{ fontSize:14, color:C.mint, ...CB }}>4,640 Ads</p>
          </div>
          <div style={{ display:'flex', gap:10 }}>
            {['↕ Sort: Popular','🔖 Save Search'].map(b=>(
              <button key={b} style={{ backgroundColor:'white', border:'1px solid rgba(107,122,118,0.18)', padding:'9px 16px', borderRadius:12, fontSize:10, ...UB, textTransform:'uppercase' as const, letterSpacing:'0.1em', cursor:'pointer', color:C.ink }}>{b}</button>
            ))}
          </div>
        </div>

        <div style={{ display:'flex', gap:10, flexWrap:'wrap' as const, marginBottom:20 }}>
          {ALL_CATS.map(cat=>(
            <Link key={cat.slug} href={`/${locale}/property/${cat.slug}`}
              style={{ padding:'10px 22px', borderRadius:100, fontSize:11, ...UB, textTransform:'uppercase' as const, letterSpacing:'0.1em', cursor:'pointer', border:'1px solid', textDecoration:'none', display:'inline-block',
                backgroundColor: cat.slug==='studios' ? C.mint : 'white', color: cat.slug==='studios' ? 'white' : C.muted, borderColor: cat.slug==='studios' ? C.mint : 'rgba(186,202,197,0.4)' }}>
              {cat.label}
            </Link>
          ))}
          <Link href={`/${locale}/property`} style={{ padding:'10px 22px', borderRadius:100, fontSize:11, ...UB, textTransform:'uppercase' as const, letterSpacing:'0.1em', cursor:'pointer', border:`1px solid ${C.mint}`, backgroundColor:'transparent', color:C.mint, textDecoration:'none', display:'inline-block' }}>+ View More</Link>
        </div>

        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap' as const, gap:14, marginBottom:32 }}>
          <div style={{ display:'flex', gap:4, padding:5, backgroundColor:'#e8efec', borderRadius:100 }}>
            {['All Sellers','SouKni Agencies','Verified Owners'].map(tab=>(
              <button key={tab} onClick={()=>setActiveSeller(tab)}
                style={{ padding:'10px 24px', borderRadius:100, fontSize:11, ...UB, textTransform:'uppercase' as const, letterSpacing:'0.1em', cursor:'pointer', border:'none',
                  backgroundColor: activeSeller===tab ? C.ink : 'transparent', color: activeSeller===tab ? 'white' : C.muted }}>{tab}</button>
            ))}
          </div>
          <div style={{ display:'flex', gap:8 }}>
            {['All','Ready','Off-Plan'].map(f=>(
              <button key={f} onClick={()=>setActiveFilter(f)}
                style={{ padding:'8px 20px', borderRadius:100, backgroundColor:'white', border:activeFilter===f?`1px solid ${C.mint}`:'1px solid #e2e8f0', fontSize:12, fontWeight:600, color:activeFilter===f?C.mint:'#0f172a', cursor:'pointer' }}>{f}</button>
            ))}
          </div>
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'1fr 320px', gap:28, alignItems:'start' }}>
          <div style={{ display:'flex', flexDirection:'column' as const, gap:20 }}>
            {listings.slice(0,2).map(p=><PropertyCard key={p.id} prop={p} />)}
            <div style={{ background:'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', borderRadius:16, padding:'28px 32px', display:'flex', alignItems:'center', justifyContent:'space-between', position:'relative', overflow:'hidden' }}>
              <div style={{ position:'absolute', right:-20, bottom:-20, opacity:0.08, fontSize:120 }}>📊</div>
              <div style={{ position:'relative', zIndex:1 }}>
                <h2 style={{ fontSize:20, fontWeight:800, color:'white', marginBottom:6 }}>What's your studio worth today?</h2>
                <p style={{ fontSize:13, color:'#94a3b8', marginBottom:16, maxWidth:420, lineHeight:1.6 }}>Get an instant SouKni Estimate with accurate, data-driven property insights.</p>
                <button style={{ backgroundColor:C.mint, color:'white', border:'none', padding:'11px 24px', borderRadius:8, fontWeight:700, fontSize:13, cursor:'pointer' }}>Get Your Free Estimate →</button>
              </div>
            </div>
            {listings.slice(2,6).map(p=><PropertyCard key={p.id} prop={p} />)}
            <div style={{ borderRadius:16, overflow:'hidden', border:'1px solid #f1f5f9' }}>
              <div style={{ background:'linear-gradient(135deg, #0f9b8e 0%, #22d4a8 100%)', padding:'28px 32px', display:'flex', alignItems:'center', gap:20 }}>
                <div style={{ fontSize:40 }}>🎥</div>
                <div>
                  <div style={{ display:'inline-flex', backgroundColor:'rgba(255,255,255,0.2)', padding:'3px 10px', borderRadius:100, fontSize:9, fontWeight:800, color:'white', textTransform:'uppercase' as const, letterSpacing:'0.1em', marginBottom:8 }}>✓ Powered by SouKni AI</div>
                  <h3 style={{ fontSize:18, fontWeight:800, color:'white', marginBottom:4 }}>Virtual Viewing Available</h3>
                  <p style={{ fontSize:13, color:'rgba(255,255,255,0.85)' }}>Explore studios with immersive 360° tours and AI-powered videos.</p>
                </div>
              </div>
            </div>
            <div style={{ position:'relative', borderRadius:16, overflow:'hidden', height:220, cursor:'pointer' }}>
              <img src="https://images.pexels.com/photos/2581922/pexels-photo-2581922.jpeg?auto=compress&w=1400" alt="Immo Pro" style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover' }} />
              <div style={{ position:'absolute', inset:0, background:'linear-gradient(to right, rgba(15,23,42,0.92) 0%, rgba(15,23,42,0.62) 60%, transparent 100%)', display:'flex', flexDirection:'column' as const, justifyContent:'center', padding:32 }}>
                <div style={{ maxWidth:380 }}>
                  <h2 style={{ fontSize:26, fontWeight:800, color:'white', marginBottom:8 }}>SouKni Immo Pro</h2>
                  <p style={{ fontSize:13, color:'#cbd5e1', marginBottom:18, lineHeight:1.6 }}>Boost your studio listings to over 2M monthly seekers.</p>
                  <button style={{ backgroundColor:C.mint, color:C.ink, border:'none', padding:'11px 24px', borderRadius:8, fontWeight:700, fontSize:13, cursor:'pointer' }}>Get Started Today</button>
                </div>
              </div>
            </div>
            {listings.slice(6).map(p=><PropertyCard key={p.id} prop={p} />)}
            <div style={{ display:'flex', justifyContent:'center', alignItems:'center', gap:8, marginTop:12 }}>
              <div style={{ display:'flex', gap:6, marginRight:16 }}>
                {[ChevronsLeft, ChevronLeft].map((Icon,i)=>(
                  <button key={i} style={{ width:40, height:40, borderRadius:8, border:'1px solid #e2e8f0', backgroundColor:'white', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer' }}><Icon size={15} color="#94a3b8" /></button>
                ))}
              </div>
              {[1,2,3,4,5,6,7,8,9,10].map(page=>(
                <button key={page} onClick={()=>setCurrentPage(page)}
                  style={{ width:40, height:40, borderRadius:8, border:page===currentPage?'none':'1px solid #e2e8f0', backgroundColor:page===currentPage?C.mint:'white', color:page===currentPage?'white':'#0f172a', fontSize:13, fontWeight:page===currentPage?700:500, cursor:'pointer', boxShadow:page===currentPage?'0 2px 8px rgba(45,212,191,0.3)':'none' }}>{page}</button>
              ))}
              <div style={{ display:'flex', gap:6, marginLeft:16 }}>
                {[ChevronRight, ChevronsRight].map((Icon,i)=>(
                  <button key={i} style={{ width:40, height:40, borderRadius:8, border:'1px solid #e2e8f0', backgroundColor:'white', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer' }}><Icon size={15} color="#94a3b8" /></button>
                ))}
              </div>
            </div>
          </div>

          <aside style={{ display:'flex', flexDirection:'column' as const, gap:20, position:'sticky', top:114 }}>
            <div style={{ backgroundColor:'white', borderRadius:16, padding:20, border:'1px solid #f1f5f9', boxShadow:'0 4px 20px rgba(0,0,0,0.05)' }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:20 }}>
                <h3 style={{ fontWeight:800, color:C.ink, fontSize:14 }}>New Studio Developments</h3>
                <Link href={`/${locale}/property/new-projects`} style={{ color:C.mint, fontSize:12, fontWeight:600, textDecoration:'none' }}>View All</Link>
              </div>
              {newProjects.map((proj,i)=>(
                <div key={proj.name} style={{ display:'flex', gap:14, cursor:'pointer', paddingTop:i>0?14:0, marginTop:i>0?14:0, borderTop:i>0?'1px solid #f1f5f9':'none' }}>
                  <div style={{ width:72, height:72, borderRadius:10, overflow:'hidden', flexShrink:0 }}>
                    <img src={proj.image} alt={proj.name} style={{ width:'100%', height:'100%', objectFit:'cover' }} />
                  </div>
                  <div>
                    <h4 style={{ fontWeight:700, fontSize:13, color:C.ink, marginBottom:3 }}>{proj.name}</h4>
                    <p style={{ fontSize:11, color:C.muted, marginBottom:6 }}>{proj.city}</p>
                    <span style={{ fontSize:12, fontWeight:700, color:C.ink }}>{proj.price}</span>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ background:'rgba(34,212,168,0.06)', border:'2px solid rgba(34,212,168,0.2)', borderRadius:16, padding:20 }}>
              <span style={{ backgroundColor:C.mint, color:'white', fontSize:9, fontWeight:800, padding:'2px 8px', borderRadius:4, textTransform:'uppercase' as const, letterSpacing:'0.1em' }}>Pro Only</span>
              <h3 style={{ fontSize:18, fontWeight:800, color:C.ink, marginTop:10, marginBottom:6 }}>List Your Agency on SouKni</h3>
              <p style={{ fontSize:12, color:'#475569', marginBottom:14, lineHeight:1.6 }}>Reach over 2M studio seekers monthly in Morocco.</p>
              <button style={{ width:'100%', backgroundColor:'#0f172a', color:'white', border:'none', padding:12, borderRadius:10, fontWeight:700, fontSize:13, cursor:'pointer' }}>Get Started Today</button>
            </div>
            <div style={{ backgroundColor:'white', borderRadius:16, padding:20, border:'1px solid #f1f5f9', boxShadow:'0 4px 20px rgba(0,0,0,0.05)' }}>
              <h3 style={{ fontWeight:800, color:C.ink, fontSize:14, marginBottom:6 }}>Get Price Alerts</h3>
              <p style={{ fontSize:12, color:C.muted, marginBottom:14, lineHeight:1.6 }}>We'll notify you when new studios matching your search are listed.</p>
              <div style={{ display:'flex', flexDirection:'column' as const, gap:10 }}>
                <input type="email" placeholder="Enter your email" style={{ width:'100%', border:'1px solid #e2e8f0', borderRadius:8, padding:'10px 14px', fontSize:13, outline:'none', boxSizing:'border-box' }} />
                <button style={{ width:'100%', backgroundColor:C.mint, color:'white', border:'none', padding:11, borderRadius:8, fontWeight:700, fontSize:13, cursor:'pointer' }}>Enable Alerts</button>
              </div>
            </div>
          </aside>
        </div>

        <section style={{ marginTop:40, borderRadius:16, background:'linear-gradient(135deg, #22d4a8 0%, #0f9b8e 100%)', padding:'40px 48px', display:'flex', alignItems:'center', justifyContent:'space-between', gap:24, flexWrap:'wrap' as const }}>
          <div>
            <h2 style={{ fontSize:28, fontWeight:800, color:'white', marginBottom:8, letterSpacing:'-0.02em' }}>Become a Diamond Seller — Get a Verified Account</h2>
            <p style={{ fontSize:15, color:'rgba(255,255,255,0.9)' }}>Unlock exclusive benefits and build ultimate trust with premium buyers.</p>
          </div>
          <button style={{ backgroundColor:'white', color:C.mint, border:'none', padding:'14px 32px', borderRadius:12, fontWeight:800, fontSize:15, cursor:'pointer', flexShrink:0, whiteSpace:'nowrap' as const }}>Get Verified Now</button>
        </section>
      </main>
    </div>
  )
}
