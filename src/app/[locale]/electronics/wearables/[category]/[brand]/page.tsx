'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { Search, Heart, MapPin } from 'lucide-react'
import WhatsAppButton from '@/components/ui/WhatsAppButton'

const C = {
  mint:'#22d4a8', ink:'#161d1b', surface:'#f4fbf8',
  cream:'#f5ede0', muted:'#6b7a76',
}
const UB: React.CSSProperties = { fontFamily:'Inter,sans-serif', fontWeight:900, letterSpacing:'-0.05em' }
const CB: React.CSSProperties = { fontFamily:"'Hanken Grotesk',sans-serif", fontWeight:900, letterSpacing:'-0.03em' }

const BRAND_DATA: Record<string,{ label:string; hero:string; desc:string; models:string[]; priceRanges:string[] }> = {
  'apple': {
    label:'Apple Wearables',
    hero:'https://images.pexels.com/photos/1714207/pexels-photo-1714207.jpeg?auto=compress&w=1600',
    desc:'Apple Watch, AirPods and Apple wearable technology in Morocco',
    models:['Apple Watch Series 10','Apple Watch Ultra 2','Apple Watch SE 2','AirPods Pro 2','AirPods 4','AirPods Max','Vision Pro','MagSafe Band'],
    priceRanges:['Any Price','0–800 MAD','800–2500 MAD','2500–6000 MAD','6000+ MAD'],
  },
  'samsung': {
    label:'Samsung Wearables',
    hero:'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&w=1600',
    desc:'Samsung Galaxy Watch, Galaxy Buds and wearables in Morocco',
    models:['Galaxy Watch 7','Galaxy Watch Ultra','Galaxy Watch FE','Galaxy Buds 3 Pro','Galaxy Buds 3','Galaxy Buds 2 Pro','Galaxy Ring','Galaxy Fit 3'],
    priceRanges:['Any Price','0–600 MAD','600–2000 MAD','2000–5000 MAD','5000+ MAD'],
  },
  'garmin': {
    label:'Garmin Wearables',
    hero:'https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&w=1600',
    desc:'Garmin Fenix, Forerunner, Vivoactive and GPS watches in Morocco',
    models:['Fenix 8','Fenix 7X','Forerunner 965','Forerunner 265','Vivoactive 5','Venu 3','Epix Pro','Instinct 2X'],
    priceRanges:['Any Price','0–1000 MAD','1000–3000 MAD','3000–7000 MAD','7000+ MAD'],
  },
  'huawei': {
    label:'Huawei Wearables',
    hero:'https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg?auto=compress&w=1600',
    desc:'Huawei Watch GT, Band and FreeBuds wearables in Morocco',
    models:['Watch GT 4','Watch GT 4 Pro','Watch Fit 3','Band 9','FreeBuds Pro 3','FreeBuds 6i','Watch Ultimate','Band 8'],
    priceRanges:['Any Price','0–500 MAD','500–1500 MAD','1500–4000 MAD','4000+ MAD'],
  },
  'fitbit': {
    label:'Fitbit Wearables',
    hero:'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&w=1600',
    desc:'Fitbit Sense, Versa, Charge and fitness trackers in Morocco',
    models:['Sense 2','Versa 4','Charge 6','Inspire 3','Pixel Watch 3','Fitbit Luxe','Ace 3','Aria Air Scale'],
    priceRanges:['Any Price','0–400 MAD','400–1200 MAD','1200–3000 MAD','3000+ MAD'],
  },
  'xiaomi': {
    label:'Xiaomi Wearables',
    hero:'https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&w=1600',
    desc:'Xiaomi Smart Band, Redmi Watch and Mi wearables in Morocco',
    models:['Smart Band 9 Pro','Smart Band 9','Redmi Watch 5','Redmi Watch 4','Buds 5 Pro','Buds 5','Watch S4','Watch S3'],
    priceRanges:['Any Price','0–200 MAD','200–600 MAD','600–1500 MAD','1500+ MAD'],
  },
  'google': {
    label:'Google Wearables',
    hero:'https://images.pexels.com/photos/1714207/pexels-photo-1714207.jpeg?auto=compress&w=1600',
    desc:'Google Pixel Watch and Pixel Buds wearables in Morocco',
    models:['Pixel Watch 3','Pixel Watch 2','Pixel Buds Pro 2','Pixel Buds A-Series','Pixel Watch 3 XL','Pixel Buds Pro'],
    priceRanges:['Any Price','0–600 MAD','600–2000 MAD','2000–4500 MAD','4500+ MAD'],
  },
  'amazfit': {
    label:'Amazfit Wearables',
    hero:'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&w=1600',
    desc:'Amazfit GTR, GTS, T-Rex and fitness smartwatches in Morocco',
    models:['GTR 4','GTS 4','T-Rex Ultra','Falcon','Balance','Bip 5','Band 7','Pop 3R'],
    priceRanges:['Any Price','0–300 MAD','300–900 MAD','900–2500 MAD','2500+ MAD'],
  },
}

const LOCS = ['Rabat','Casablanca','Marrakech','Tangier','Agadir','Fès','Meknès','Kenitra']
const IMGS = [
  'https://images.pexels.com/photos/1714207/pexels-photo-1714207.jpeg?auto=compress&w=400',
  'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&w=400',
  'https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&w=400',
  'https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg?auto=compress&w=400',
]
const CONDITIONS = ['Like New','New','Excellent','Good','Fair']
const BADGES: Array<'certified'|'diamond'|'featured'|'new'> = ['certified','diamond','featured','new','certified','diamond']

function Badge({ type }: { type:'certified'|'diamond'|'featured'|'new' }) {
  const map = {
    certified:{ bg:C.mint, color:C.ink, label:'SouKni Certified' },
    diamond:  { bg:C.ink,  color:C.mint,label:'✦ DIAMOND' },
    featured: { bg:'#fbbf24',color:C.ink,label:'Featured' },
    new:      { bg:C.mint, color:'white',label:'New Arrival' },
  }
  const s = map[type]
  return <span style={{ backgroundColor:s.bg, color:s.color, fontSize:'8px', ...CB, padding:'4px 10px', borderRadius:'6px', textTransform:'uppercase' as const, letterSpacing:'0.08em', display:'inline-block' }}>{s.label}</span>
}

function ListingCard({ model, price, location, condition, img, badge }: any) {
  const [saved, setSaved] = useState(false)
  const [hov, setHov]     = useState(false)
  return (
    <article onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{ backgroundColor:'white', borderRadius:24, border:`1px solid ${hov?C.mint:'rgba(107,122,118,0.1)'}`, overflow:'hidden', transition:'all 0.3s', cursor:'pointer', boxShadow:hov?'0 20px 40px rgba(34,212,168,0.12)':'0 2px 8px rgba(0,0,0,0.04)' }}>
      <div style={{ position:'relative', aspectRatio:'1/1', overflow:'hidden', backgroundColor:C.cream }}>
        <img src={img} alt={model} style={{ width:'100%', height:'100%', objectFit:'cover', transition:'transform 0.5s', transform:hov?'scale(1.08)':'scale(1)' }} />
        <div style={{ position:'absolute', top:10, left:10 }}><Badge type={badge} /></div>
        <button onClick={e=>{e.stopPropagation();setSaved(!saved)}}
          style={{ position:'absolute', top:8, right:8, width:32, height:32, borderRadius:'50%', backgroundColor:'rgba(255,255,255,0.85)', border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}>
          <Heart size={14} fill={saved?'#ef4444':'none'} color={saved?'#ef4444':C.muted} />
        </button>
        {condition && <div style={{ position:'absolute', bottom:8, left:8, backgroundColor:'rgba(255,255,255,0.92)', padding:'3px 8px', borderRadius:6, fontSize:'9px', ...CB, color:C.mint }}>{condition}</div>}
      </div>
      <div style={{ padding:'14px 16px' }}>
        <h4 style={{ fontSize:14, ...CB, color:C.ink, marginBottom:4, lineHeight:1.3, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' as const }}>{model}</h4>
        <p style={{ fontSize:18, ...CB, color:C.mint, marginBottom:6 }}>{price.toLocaleString()} MAD</p>
        {location && <p style={{ display:'flex', alignItems:'center', gap:3, fontSize:'10px', color:C.muted, marginBottom:12 }}><MapPin size={10}/>{location}</p>}
        <div style={{ display:'flex', gap:8 }}>
          <button style={{ flex:1, border:`2px solid ${C.ink}`, color:C.ink, backgroundColor:'transparent', padding:'9px', borderRadius:12, fontSize:'10px', ...CB, textTransform:'uppercase' as const, cursor:'pointer', transition:'all 0.15s' }}
            onMouseEnter={e=>{e.currentTarget.style.backgroundColor=C.ink;e.currentTarget.style.color='white'}}
            onMouseLeave={e=>{e.currentTarget.style.backgroundColor='transparent';e.currentTarget.style.color=C.ink}}>
            Message
          </button>
          <WhatsAppButton phone={undefined} title={model}
            style={{ flex:1, padding:'9px', borderRadius:12, fontSize:'10px', ...CB, textTransform:'uppercase' as const }} />
        </div>
      </div>
    </article>
  )
}

export default function WearablesBrandPage() {
  const params    = useParams()
  const locale    = (params?.locale   as string) || 'en'
  const category  = (params?.category as string) || 'all-wearables'
  const brandSlug = (params?.brand    as string) || 'apple'

  const brandData = BRAND_DATA[brandSlug] || BRAND_DATA['apple']

  const [keyword, setKeyword]       = useState('')
  const [city, setCity]             = useState('')
  const [price, setPrice]           = useState(brandData.priceRanges[0])
  const [priceOpen, setPriceOpen]   = useState(false)
  const [condition, setCondition]   = useState('All')
  const [condOpen, setCondOpen]     = useState(false)
  const [sortBy, setSortBy]         = useState('Most Recent')
  const [pg, setPg]                 = useState(1)
  const [gridView, setGridView]     = useState(true)
  const [diamond, setDiamond]       = useState(true)
  const [activeModel, setActiveModel] = useState('All Models')

  const listings = Array.from({ length:24 }, (_,i) => ({
    model:     brandData.models[i % brandData.models.length],
    price:     300 + ((i*1973) % 9000),
    location:  LOCS[i % LOCS.length],
    condition: CONDITIONS[i % CONDITIONS.length],
    img:       IMGS[i % IMGS.length],
    badge:     BADGES[i % BADGES.length],
  })).filter(item => {
    const mk = !keyword     || item.model.toLowerCase().includes(keyword.toLowerCase())
    const mc = !city        || item.location.toLowerCase().includes(city.toLowerCase())
    const mm = activeModel === 'All Models' || item.model === activeModel
    return mk && mc && mm
  })

  return (
    <div style={{ ...UB, backgroundColor:C.surface, color:C.ink, minHeight:'100vh' }}>

      {/* HERO */}
      <section style={{ position:'relative', height:360, display:'flex', alignItems:'center', justifyContent:'center', overflow:'hidden' }}>
        <img src={brandData.hero} alt={brandData.label} style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover' }} />
        <div style={{ position:'absolute', inset:0, backgroundColor:'rgba(22,29,27,0.65)' }} />
        <div style={{ position:'relative', zIndex:10, textAlign:'center' as const, maxWidth:760, padding:'0 24px', width:'100%' }}>
          <p style={{ fontSize:11, ...UB, color:C.mint, textTransform:'uppercase' as const, letterSpacing:'0.2em', marginBottom:12 }}>WEARABLES › {brandData.label.toUpperCase()}</p>
          <h1 style={{ fontSize:'clamp(32px,5vw,52px)', ...UB, color:'white', marginBottom:12, lineHeight:1.05 }}>{brandData.label}</h1>
          <p style={{ fontSize:15, color:'rgba(255,255,255,0.8)', marginBottom:28 }}>{brandData.desc}</p>
          <div style={{ maxWidth:580, margin:'0 auto', backgroundColor:'rgba(255,255,255,0.12)', backdropFilter:'blur(12px)', borderRadius:100, border:'1px solid rgba(255,255,255,0.22)', display:'flex', alignItems:'center', gap:8, padding:'6px 6px 6px 16px' }}>
            <Search size={15} color="rgba(255,255,255,0.6)" />
            <input value={keyword} onChange={e=>setKeyword(e.target.value)} placeholder={`Search ${brandData.label}...`}
              style={{ flex:1, background:'none', border:'none', outline:'none', color:'white', fontSize:14, ...UB, fontFamily:'Inter,sans-serif' }} />
            {keyword && <button onClick={()=>setKeyword('')} style={{ background:'none', border:'none', cursor:'pointer', color:'rgba(255,255,255,0.6)', fontSize:16 }}>×</button>}
            <button style={{ backgroundColor:C.mint, color:C.ink, border:'none', padding:'10px 24px', borderRadius:100, fontSize:11, ...UB, textTransform:'uppercase' as const, letterSpacing:'0.1em', cursor:'pointer', transition:'background 0.15s' }}
              onMouseEnter={e=>e.currentTarget.style.backgroundColor='#0f9b8e'} onMouseLeave={e=>e.currentTarget.style.backgroundColor=C.mint}>
              SEARCH
            </button>
          </div>
        </div>
      </section>

      {/* FILTER BAR */}
      <div style={{ maxWidth:1280, margin:'-28px auto 0', padding:'0 24px', position:'relative', zIndex:30 }}>
        <div style={{ backgroundColor:'rgba(255,255,255,0.97)', backdropFilter:'blur(16px)', border:'1px solid rgba(107,122,118,0.12)', borderRadius:100, boxShadow:'0 12px 40px rgba(0,0,0,0.08)', display:'flex', alignItems:'stretch', height:68 }}>
          <div style={{ flex:1, padding:'0 20px', borderRight:'1px solid rgba(186,202,197,0.3)', display:'flex', flexDirection:'column' as const, justifyContent:'center', gap:2 }}>
            <span style={{ fontSize:9, ...UB, textTransform:'uppercase' as const, letterSpacing:'0.14em', color:C.muted }}>CITY</span>
            <input value={city} onChange={e=>setCity(e.target.value)} placeholder="Any city"
              style={{ fontSize:14, ...UB, color:C.ink, border:'none', outline:'none', background:'none', width:'100%' }} />
          </div>
          <div style={{ flex:2, padding:'0 20px', borderRight:'1px solid rgba(186,202,197,0.3)', display:'flex', flexDirection:'column' as const, justifyContent:'center', gap:2 }}>
            <span style={{ fontSize:9, ...UB, textTransform:'uppercase' as const, letterSpacing:'0.14em', color:C.muted }}>KEYWORD</span>
            <div style={{ display:'flex', alignItems:'center', gap:8 }}>
              <Search size={13} color={C.muted} />
              <input value={keyword} onChange={e=>setKeyword(e.target.value)} placeholder={`${brandData.label} model...`}
                style={{ flex:1, background:'none', border:'none', outline:'none', fontSize:14, ...UB, color:C.ink }} />
              {keyword && <button onClick={()=>setKeyword('')} style={{ background:'none', border:'none', cursor:'pointer', color:C.muted, fontSize:16 }}>×</button>}
            </div>
          </div>
          <div style={{ position:'relative', flex:1, borderRight:'1px solid rgba(186,202,197,0.3)' }}>
            <button onClick={()=>{setPriceOpen(!priceOpen);setCondOpen(false)}}
              style={{ width:'100%', height:'100%', background:'none', border:'none', cursor:'pointer', padding:'0 20px', display:'flex', flexDirection:'column' as const, justifyContent:'center', textAlign:'left' as const }}>
              <span style={{ fontSize:9, ...UB, textTransform:'uppercase' as const, letterSpacing:'0.14em', color:C.muted, marginBottom:2 }}>PRICE</span>
              <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                <span style={{ fontSize:14, ...UB, color:price===brandData.priceRanges[0]?C.muted:C.ink }}>{price}</span>
                <span style={{ color:C.mint, fontSize:10, transform:priceOpen?'rotate(180deg)':'rotate(0)', transition:'transform 0.2s', display:'inline-block' }}>▾</span>
              </div>
            </button>
            {priceOpen && (
              <div style={{ position:'absolute', top:'calc(100% + 8px)', left:0, minWidth:220, backgroundColor:'white', borderRadius:20, boxShadow:'0 20px 60px rgba(0,0,0,0.12)', border:'1px solid rgba(107,122,118,0.12)', zIndex:200, padding:'8px 0' }}>
                {brandData.priceRanges.map(p=>(
                  <button key={p} onClick={()=>{setPrice(p);setPriceOpen(false)}}
                    style={{ width:'100%', padding:'11px 20px', background:'none', border:'none', cursor:'pointer', textAlign:'left' as const, fontSize:14, ...UB, color:price===p?C.mint:C.ink, display:'flex', justifyContent:'space-between' }}
                    onMouseEnter={e=>e.currentTarget.style.backgroundColor=C.surface} onMouseLeave={e=>e.currentTarget.style.backgroundColor='transparent'}>
                    {p}{price===p&&<span style={{color:C.mint}}>✓</span>}
                  </button>
                ))}
              </div>
            )}
          </div>
          <div style={{ position:'relative', flex:1, borderRight:'1px solid rgba(186,202,197,0.3)' }}>
            <button onClick={()=>{setCondOpen(!condOpen);setPriceOpen(false)}}
              style={{ width:'100%', height:'100%', background:'none', border:'none', cursor:'pointer', padding:'0 20px', display:'flex', flexDirection:'column' as const, justifyContent:'center', textAlign:'left' as const }}>
              <span style={{ fontSize:9, ...UB, textTransform:'uppercase' as const, letterSpacing:'0.14em', color:C.muted, marginBottom:2 }}>CONDITION</span>
              <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                <span style={{ fontSize:14, ...UB, color:condition==='All'?C.muted:C.ink }}>{condition==='All'?'Any Condition':condition}</span>
                <span style={{ color:C.mint, fontSize:10, transform:condOpen?'rotate(180deg)':'rotate(0)', transition:'transform 0.2s', display:'inline-block' }}>▾</span>
              </div>
            </button>
            {condOpen && (
              <div style={{ position:'absolute', top:'calc(100% + 8px)', left:0, minWidth:200, backgroundColor:'white', borderRadius:20, boxShadow:'0 20px 60px rgba(0,0,0,0.12)', border:'1px solid rgba(107,122,118,0.12)', zIndex:200, padding:'8px 0' }}>
                {['All','Like New','New','Excellent','Good','Fair'].map(cond=>(
                  <button key={cond} onClick={()=>{setCondition(cond);setCondOpen(false)}}
                    style={{ width:'100%', padding:'11px 20px', background:'none', border:'none', cursor:'pointer', textAlign:'left' as const, fontSize:14, ...UB, color:condition===cond?C.mint:C.ink, display:'flex', justifyContent:'space-between' }}
                    onMouseEnter={e=>e.currentTarget.style.backgroundColor=C.surface} onMouseLeave={e=>e.currentTarget.style.backgroundColor='transparent'}>
                    {cond==='All'?'Any Condition':cond}{condition===cond&&<span style={{color:C.mint}}>✓</span>}
                  </button>
                ))}
              </div>
            )}
          </div>
          <button style={{ backgroundColor:C.mint, color:C.ink, border:'none', padding:'0 28px', borderRadius:'0 100px 100px 0', fontWeight:800, fontSize:13, cursor:'pointer', display:'flex', alignItems:'center', gap:8, flexShrink:0, transition:'background 0.15s' }}
            onMouseEnter={e=>e.currentTarget.style.backgroundColor='#0f9b8e'} onMouseLeave={e=>e.currentTarget.style.backgroundColor=C.mint}>
            <Search size={16} /> SEARCH
          </button>
        </div>
      </div>

      <main style={{ maxWidth:1280, margin:'0 auto', padding:'32px 24px 80px' }}>
        <nav style={{ display:'flex', alignItems:'center', gap:6, fontSize:10, ...UB, color:C.muted, textTransform:'uppercase' as const, letterSpacing:'0.12em', marginBottom:12 }}>
          {[
            { label:'Home',         href:`/${locale}` },
            { label:'Electronics',  href:`/${locale}/electronics` },
            { label:'Wearables',    href:`/${locale}/electronics/wearables` },
            { label:'All Wearables',href:`/${locale}/electronics/wearables/${category}` },
            { label:brandData.label,href:null },
          ].map((b,i,arr)=>(
            <span key={b.label} style={{ display:'flex', alignItems:'center', gap:6 }}>
              {b.href ? <Link href={b.href} style={{ color:C.muted, textDecoration:'none' }} onMouseEnter={e=>e.currentTarget.style.color=C.mint} onMouseLeave={e=>e.currentTarget.style.color=C.muted}>{b.label}</Link>
                      : <span style={{ color:C.ink }}>{b.label}</span>}
              {i<arr.length-1 && <span style={{ opacity:0.4 }}>›</span>}
            </span>
          ))}
        </nav>

        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', gap:16, marginBottom:24, flexWrap:'wrap' as const }}>
          <div>
            <h2 style={{ fontSize:'clamp(20px,2.5vw,28px)', ...UB, color:C.ink, marginBottom:4 }}>{brandData.label} in Morocco</h2>
            <p style={{ fontSize:14, color:C.mint, ...CB }}>{listings.length} listings found</p>
          </div>
          <div style={{ display:'flex', gap:10 }}>
            <select value={sortBy} onChange={e=>setSortBy(e.target.value)}
              style={{ backgroundColor:'white', border:'1px solid rgba(107,122,118,0.18)', padding:'9px 16px', borderRadius:12, fontSize:10, ...UB, textTransform:'uppercase' as const, letterSpacing:'0.1em', cursor:'pointer', color:C.ink, outline:'none' }}>
              {['Most Recent','Price: Low to High','Price: High to Low','Most Popular'].map(s=><option key={s}>{s}</option>)}
            </select>
          </div>
        </div>

        <div style={{ display:'flex', gap:8, flexWrap:'wrap' as const, marginBottom:20 }}>
          {['All Models', ...brandData.models].map(m=>(
            <button key={m} onClick={()=>setActiveModel(m)}
              style={{ padding:'7px 16px', borderRadius:100, fontSize:11, ...UB, border:'1px solid', cursor:'pointer', transition:'all 0.15s',
                backgroundColor:activeModel===m?C.mint:'transparent', color:activeModel===m?C.ink:C.muted, borderColor:activeModel===m?C.mint:'rgba(186,202,197,0.3)' }}
              onMouseEnter={e=>{if(activeModel!==m){e.currentTarget.style.borderColor=C.mint;e.currentTarget.style.color=C.ink}}}
              onMouseLeave={e=>{if(activeModel!==m){e.currentTarget.style.borderColor='rgba(186,202,197,0.3)';e.currentTarget.style.color=C.muted}}}>
              {m}
            </button>
          ))}
        </div>

        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'12px 0', borderTop:'1px solid rgba(186,202,197,0.25)', borderBottom:'1px solid rgba(186,202,197,0.25)', marginBottom:24, flexWrap:'wrap' as const, gap:10 }}>
          <div style={{ display:'flex', gap:4, padding:4, backgroundColor:'#e8efec', borderRadius:100 }}>
            {['All Sellers','SouKni Members','SouKni Pro'].map(t=>(
              <button key={t} style={{ padding:'8px 20px', borderRadius:100, fontSize:11, ...UB, textTransform:'uppercase' as const, cursor:'pointer', border:'none', backgroundColor:'transparent', color:C.muted }}>{t}</button>
            ))}
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:12 }}>
            <div style={{ display:'flex', alignItems:'center', gap:8, cursor:'pointer' }} onClick={()=>setDiamond(!diamond)}>
              <span style={{ fontSize:10, ...UB, color:C.muted, textTransform:'uppercase' as const, letterSpacing:'0.1em' }}>Diamond Certified First</span>
              <div style={{ width:52, height:26, borderRadius:100, backgroundColor:diamond?C.mint:'rgba(107,122,118,0.2)', position:'relative', transition:'background 0.25s' }}>
                <div style={{ position:'absolute', top:3, left:diamond?29:3, width:20, height:20, borderRadius:'50%', backgroundColor:C.ink, transition:'left 0.25s' }} />
              </div>
            </div>
            <div style={{ display:'flex', gap:4 }}>
              <button onClick={()=>setGridView(true)} style={{ width:36, height:36, borderRadius:8, border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', backgroundColor:gridView?C.ink:'transparent', color:gridView?'white':C.muted, transition:'all 0.2s' }}>⊞</button>
              <button onClick={()=>setGridView(false)} style={{ width:36, height:36, borderRadius:8, border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', backgroundColor:!gridView?C.ink:'transparent', color:!gridView?'white':C.muted, transition:'all 0.2s' }}>≡</button>
            </div>
          </div>
        </div>

        {listings.length === 0 ? (
          <div style={{ textAlign:'center' as const, padding:'80px 20px' }}>
            <p style={{ fontSize:20, ...UB, color:C.ink, marginBottom:8 }}>No {brandData.label} listings found</p>
            <p style={{ fontSize:14, color:C.muted, marginBottom:20 }}>Try clearing your filters</p>
            <button onClick={()=>{setKeyword('');setCity('');setPrice(brandData.priceRanges[0]);setCondition('All');setActiveModel('All Models')}}
              style={{ padding:'11px 28px', borderRadius:100, backgroundColor:C.mint, color:C.ink, border:'none', ...UB, fontSize:13, cursor:'pointer' }}>
              Clear Filters
            </button>
          </div>
        ) : (
          <div style={{ display:'grid', gridTemplateColumns:gridView?'repeat(4,1fr)':'1fr', gap:20, marginBottom:48 }}>
            {listings.map((item,i)=><ListingCard key={i} {...item} />)}
          </div>
        )}

        <div style={{ display:'flex', justifyContent:'center', alignItems:'center', gap:10, marginBottom:48 }}>
          {[1,2,3,4,5].map(p=>(
            <button key={p} onClick={()=>setPg(p)} style={{ width:44, height:44, borderRadius:12, cursor:'pointer', fontSize:15, ...UB, border:'1px solid', transition:'all 0.2s',
              backgroundColor:pg===p?C.mint:'white', color:pg===p?C.ink:C.muted, borderColor:pg===p?C.mint:'rgba(107,122,118,0.12)' }}>{p}</button>
          ))}
        </div>

        <div style={{ textAlign:'center' as const }}>
          <Link href={`/${locale}/electronics/wearables/${category}`}
            style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'14px 40px', borderRadius:100, backgroundColor:C.ink, color:'white', textDecoration:'none', fontSize:12, ...UB, textTransform:'uppercase' as const, letterSpacing:'0.1em', transition:'background 0.2s' }}
            onMouseEnter={e=>e.currentTarget.style.backgroundColor=C.mint} onMouseLeave={e=>e.currentTarget.style.backgroundColor=C.ink}>
            ← Back to All Wearables
          </Link>
        </div>
      </main>
    </div>
  )
}
