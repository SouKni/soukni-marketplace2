'use client'

import { useState } from 'react'
import React from 'react'
import { Heart, Search, ChevronLeft, ChevronRight } from 'lucide-react'

/* ─── LOCKED PALETTE ─────────────────────────────────────── */
const C = {
  mint:    '#22d4a8',
  mintDk:  '#006b5f',
  cream:   '#f5ede0',
  surface: '#f4fbf8',
  ink:     '#161d1b',
  muted:   '#6b7a76',
}

const IMG = {
  hero:    'https://images.pexels.com/photos/162539/architecture-building-amsterdam-blue-162539.jpeg?auto=compress&w=1600',
  logistics:'https://images.pexels.com/photos/2226458/pexels-photo-2226458.jpeg?auto=compress&w=600',
  factory: 'https://images.pexels.com/photos/162568/factory-industry-pollution-environment-162568.jpeg?auto=compress&w=600',
  warehouse:'https://images.pexels.com/photos/4481259/pexels-photo-4481259.jpeg?auto=compress&w=600',
  clinic:  'https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg?auto=compress&w=600',
  immo:    'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&w=900',
  auto:    'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&w=900',
  nexus:   'https://images.pexels.com/photos/2226458/pexels-photo-2226458.jpeg?auto=compress&w=900',
  datacenter:'https://images.pexels.com/photos/325229/pexels-photo-325229.jpeg?auto=compress&w=600',
  artisan: 'https://images.pexels.com/photos/3760529/pexels-photo-3760529.jpeg?auto=compress&w=600',
  ecofactory:'https://images.pexels.com/photos/9875441/pexels-photo-9875441.jpeg?auto=compress&w=600',
  expo:    'https://images.pexels.com/photos/2226458/pexels-photo-2226458.jpeg?auto=compress&w=1400',
  glass:   'https://images.pexels.com/photos/325229/pexels-photo-325229.jpeg?auto=compress&w=1400',
  bizphone:'https://images.pexels.com/photos/2226458/pexels-photo-2226458.jpeg?auto=compress&w=600',
  g1: 'https://images.pexels.com/photos/2226458/pexels-photo-2226458.jpeg?auto=compress&w=400',
  g2: 'https://images.pexels.com/photos/162568/factory-industry-pollution-environment-162568.jpeg?auto=compress&w=400',
  g3: 'https://images.pexels.com/photos/4481259/pexels-photo-4481259.jpeg?auto=compress&w=400',
  g4: 'https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg?auto=compress&w=400',
}

type Badge = 'diamond' | 'pro' | 'verified'

function CardBadge({ badge }: { badge?: Badge }) {
  if (!badge) return null
  if (badge === 'diamond') return (
    <span style={{ backgroundColor:C.mint, color:'white', fontSize:'9px', fontWeight:900, padding:'4px 10px', borderRadius:'100px', display:'inline-flex', alignItems:'center', gap:'3px', textTransform:'uppercase' as const, letterSpacing:'0.06em', whiteSpace:'nowrap' as const, boxShadow:'0 2px 6px rgba(0,0,0,0.15)' }}>◆ DIAMOND MEMBER</span>
  )
  if (badge === 'pro') return (
    <span style={{ backgroundColor:C.mint, color:C.ink, fontSize:'9px', fontWeight:700, padding:'4px 10px', borderRadius:'100px', textTransform:'uppercase' as const, letterSpacing:'0.06em', whiteSpace:'nowrap' as const, boxShadow:'0 2px 6px rgba(0,0,0,0.1)' }}>✓ PRO SELLER</span>
  )
  return (
    <span style={{ backgroundColor:'#dde4e1', color:'#3c4a46', fontSize:'9px', fontWeight:700, padding:'4px 10px', borderRadius:'100px', display:'inline-flex', alignItems:'center', gap:'3px', textTransform:'uppercase' as const, letterSpacing:'0.06em', whiteSpace:'nowrap' as const }}>✓ VERIFIED</span>
  )
}

function ProductCard({ title, price, location, badge, img, tag, tall = false }: any) {
  const [saved, setSaved] = useState(false)
  const [hov, setHov] = useState(false)
  return (
    <article onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{ backgroundColor:'rgba(255,255,255,0.72)', backdropFilter:'blur(16px)', border:'1px solid rgba(255,255,255,0.42)', borderRadius:'40px', overflow:'hidden', display:'flex', flexDirection:'column' as const, boxShadow:hov?'0 20px 40px rgba(0,0,0,0.1)':'0 2px 8px rgba(0,0,0,0.04)', transition:'all 0.3s', cursor:'pointer' }}>
      <div style={{ position:'relative', aspectRatio: tall ? '4/5' : '1/1', overflow:'hidden', backgroundColor:'#d4dcd9' }}>
        <img src={img} alt={title} style={{ width:'100%', height:'100%', objectFit:'cover', transition:'transform 0.5s', transform:hov?'scale(1.08)':'scale(1)' }} />
        {badge && <div style={{ position:'absolute', top:'12px', left:'12px', zIndex:10 }}><CardBadge badge={badge} /></div>}
        {tag && <div style={{ position:'absolute', bottom:'10px', left:'10px', zIndex:10, backgroundColor:'rgba(255,255,255,0.92)', padding:'3px 8px', borderRadius:'6px', fontSize:'9px', fontWeight:900, color:C.mint, textTransform:'uppercase' as const }}>{tag}</div>}
        <button onClick={e=>{e.stopPropagation();setSaved(!saved)}} style={{ position:'absolute', top:'10px', right:'10px', zIndex:10, width:'38px', height:'38px', borderRadius:'50%', backgroundColor:'rgba(255,255,255,0.82)', backdropFilter:'blur(8px)', border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}>
          <Heart size={16} fill={saved?'#ef4444':'none'} color={saved?'#ef4444':C.muted} />
        </button>
      </div>
      <div style={{ padding:'18px 20px', display:'flex', flexDirection:'column' as const, flex:1 }}>
        {location && (
          <div style={{ display:'flex', alignItems:'center', gap:'6px', marginBottom:'6px' }}>
            <span style={{ fontSize:'12px', fontWeight:900, color:C.mint, textTransform:'uppercase' as const, letterSpacing:'0.06em' }}>{location.split(',')[0]}</span>
            <span style={{ width:'3px', height:'3px', borderRadius:'50%', backgroundColor:C.muted }} />
            <span style={{ fontSize:'12px', fontWeight:700, color:C.muted }}>{(location.split(',')[1]||'Rabat').trim()}</span>
          </div>
        )}
        <h4 style={{ fontSize:'17px', fontWeight:700, color:hov?C.mint:C.ink, marginBottom:'4px', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' as const, transition:'color 0.2s' }}>{title}</h4>
        <p style={{ fontSize:'21px', fontWeight:900, color:C.mint, marginBottom:'14px' }}>{price.toLocaleString()} MAD</p>
        <div style={{ marginTop:'auto', display:'flex', gap:'8px', paddingTop:'14px', borderTop:'1px solid rgba(186,202,197,0.15)' }}>
          <button style={{ flex:1, padding:'10px', borderRadius:'14px', border:'1px solid rgba(186,202,197,0.4)', backgroundColor:'transparent', fontSize:'12px', fontWeight:700, cursor:'pointer', transition:'all 0.15s' }}
            onMouseEnter={e=>{e.currentTarget.style.backgroundColor=C.mint;e.currentTarget.style.color='white';e.currentTarget.style.borderColor=C.mint}}
            onMouseLeave={e=>{e.currentTarget.style.backgroundColor='transparent';e.currentTarget.style.color=C.ink;e.currentTarget.style.borderColor='rgba(186,202,197,0.4)'}}
          >Message</button>
          <button style={{ flex:1, padding:'10px', borderRadius:'14px', border:'none', backgroundColor:'rgba(34,212,168,0.14)', color:'#0d7a5f', fontSize:'12px', fontWeight:700, cursor:'pointer', transition:'all 0.15s' }}
            onMouseEnter={e=>{e.currentTarget.style.backgroundColor=C.mint;e.currentTarget.style.color='white'}}
            onMouseLeave={e=>{e.currentTarget.style.backgroundColor='rgba(34,212,168,0.14)';e.currentTarget.style.color='#0d7a5f'}}
          >WhatsApp</button>
        </div>
      </div>
    </article>
  )
}

const featured = [
  { title:'Prime Logistics Hub Center',     price:4250000,  location:'Logistics, Agdal',   badge:'diamond'  as Badge, img:IMG.logistics, tall:true },
  { title:'Strategic Manufacturing Plant',  price:12800000, location:'Industrial, Souissi', badge:'pro'      as Badge, img:IMG.factory,    tall:true },
  { title:'High-Cap Distribution Center',   price:6400000,  location:'Warehouse, Center',   badge:'diamond'  as Badge, img:IMG.warehouse,  tall:true },
  { title:'Fully Equipped Medical Clinic',  price:3200000,  location:'Clinic, Hay Riad',    badge:'verified' as Badge, img:IMG.clinic,     tall:true },
]

const titles = ['Standard Logistics Warehouse','Heavy Industrial Factory','Logistics Cold Storage','Corporate Office Complex','Commercial Asset','Industrial Asset']
const locs = ['Rabat Center','Rabat, Souissi','Rabat, Agdal','Rabat, Hay Riad']
const gridImgs = [IMG.g1, IMG.g2, IMG.g3, IMG.g4]
function seededPrice(i: number) { return 1200000 + ((i * 731) % 17000000) }
const gridItems = Array.from({ length:16 }, (_,i) => ({
  title: i < 4 ? titles[i] : `${titles[i%6]} #${i+1}`,
  price: seededPrice(i),
  location: locs[i % 4],
  img: gridImgs[i % 4],
  badge: i % 3 === 0 ? 'diamond' as Badge : i % 5 === 0 ? 'verified' as Badge : undefined,
  tag: i % 3 === 0 ? undefined : i % 4 === 1 ? 'NEW' : 'Industrial',
}))

export default function BusinessPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = React.use(params)
  const [activePill, setActivePill] = useState('All Sectors')
  const [activeSeller, setActiveSeller] = useState('All Sellers')
  const [diamond, setDiamond] = useState(true)
  const [page, setPage] = useState(1)
  const [kw, setKw] = useState('')
  const pills = ['All Sectors','Logistics & Warehousing','Industrial Facilities','Medical & Clinics','Retail Spaces','Corporate Offices']

  return (
    <div style={{ fontFamily:'Hanken Grotesk, Inter, sans-serif', backgroundColor:C.surface, color:C.ink }}>

      {/* ── HERO ── */}
      <section style={{ position:'relative', height:'460px', display:'flex', alignItems:'center', justifyContent:'center', overflow:'hidden' }}>
        <img src={IMG.hero} alt="Industrial" style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover' }} />
        <div style={{ position:'absolute', inset:0, backgroundColor:'rgba(0,0,0,0.42)', backdropFilter:'blur(2px)' }} />
        <div style={{ position:'relative', zIndex:10, width:'100%', maxWidth:'860px', padding:'0 20px', textAlign:'center' as const }}>
          <h1 style={{ fontSize:'clamp(32px,4.6vw,46px)', fontWeight:900, color:'white', marginBottom:'36px', letterSpacing:'-0.02em', lineHeight:1.15, textShadow:'0 4px 20px rgba(0,0,0,0.4)', fontStyle:'italic' as const }}>
            "Strategic Assets. Prime Industrial<br/>Opportunities in Rabat."
          </h1>
          {/* TRANSPARENT search bar */}
          <div style={{ backgroundColor:'rgba(255,255,255,0.1)', backdropFilter:'blur(10px)', border:'1px solid rgba(255,255,255,0.25)', borderRadius:'100px', padding:'8px', display:'flex', gap:'8px' }}>
            <div style={{ flex:1.5, display:'flex', alignItems:'center', backgroundColor:'rgba(255,255,255,0.12)', borderRadius:'100px', padding:'10px 20px', gap:'10px' }}>
              <Search size={18} color="rgba(255,255,255,0.8)" />
              <input type="text" value={kw} onChange={e=>setKw(e.target.value)} placeholder="Search for warehouses, factories, logistics hubs..."
                style={{ flex:1, backgroundColor:'transparent', border:'none', outline:'none', fontSize:'15px', fontFamily:'Hanken Grotesk, sans-serif', color:'white' }}
              />
            </div>
            <div style={{ flex:1, display:'flex', alignItems:'center', backgroundColor:'rgba(255,255,255,0.12)', borderRadius:'100px', padding:'10px 20px', gap:'8px' }}>
              <span style={{ fontSize:'16px' }}>📍</span>
              <span style={{ fontSize:'15px', fontWeight:600, color:'white' }}>Rabat</span>
            </div>
            <button style={{ backgroundColor:C.mint, color:'white', border:'none', padding:'12px 36px', borderRadius:'100px', fontWeight:700, fontSize:'15px', cursor:'pointer', display:'flex', alignItems:'center', gap:'6px', transition:'filter 0.15s', whiteSpace:'nowrap' as const }}
              onMouseEnter={e=>e.currentTarget.style.filter='brightness(1.1)'}
              onMouseLeave={e=>e.currentTarget.style.filter='brightness(1)'}
            >🔍 Search</button>
          </div>
        </div>
      </section>

      {/* ── ADVANCED FILTER BAR (TRANSPARENT) ── */}
      <div style={{ maxWidth:'1440px', margin:'-32px auto 28px', padding:'0 40px', position:'relative', zIndex:20 }}>
        <div style={{ backgroundColor:'rgba(255,255,255,0.35)', backdropFilter:'blur(16px)', border:'1px solid rgba(255,255,255,0.4)', borderRadius:'100px', boxShadow:'0 20px 40px rgba(0,0,0,0.1)', display:'flex', alignItems:'center', padding:'6px' }}>
          {[
            { label:'CITY', val:'Rabat', sel:true },
            { label:'KEYWORD', val:'Factory, Logistics...', inp:true },
            { label:'AREA', val:'Sidi Bouknadel', sel:true },
            { label:'BUDGET (MAD)', val:'Select Range', sel:true },
            { label:'FILTERS', val:'All Filters', icon:'🎚' },
          ].map((f,i,arr)=>(
            <React.Fragment key={f.label}>
              <div style={{ flex: f.inp ? 1.5 : 1, padding:'8px 22px', borderRight: i<arr.length-1 ? '1px solid rgba(255,255,255,0.4)' : 'none', cursor:'pointer' }}>
                <div style={{ fontSize:'9px', fontWeight:700, textTransform:'uppercase' as const, letterSpacing:'0.12em', color:'rgba(22,29,27,0.65)', marginBottom:'2px' }}>{f.label}</div>
                {f.inp
                  ? <div style={{ display:'flex', alignItems:'center', gap:'6px', fontSize:'15px', fontWeight:600, color:'rgba(22,29,27,0.55)' }}>{f.val} <Search size={14} color={C.mint} /></div>
                  : <div style={{ display:'flex', alignItems:'center', gap:'4px', fontSize:'15px', fontWeight:700, color: f.icon?C.ink:'rgba(22,29,27,0.7)' }}>
                      {f.icon && <span>{f.icon}</span>}{f.val} {f.sel && <span style={{ fontSize:'16px', color:C.muted }}>▾</span>}
                    </div>
                }
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>

      <div style={{ maxWidth:'1440px', margin:'0 auto', padding:'0 40px 80px' }}>

        {/* ── BREADCRUMB + HEADER ── */}
        <div style={{ marginBottom:'28px' }}>
          <nav style={{ display:'flex', alignItems:'center', gap:'6px', fontSize:'12px', fontWeight:700, color:'rgba(107,122,118,0.72)', textTransform:'uppercase' as const, letterSpacing:'0.06em', marginBottom:'12px' }}>
            {['Rabat','The Vault','Business & Factories'].map((c,i,arr)=>(
              <React.Fragment key={c}>
                {i<arr.length-1
                  ? <><a href="#" style={{ color:'rgba(107,122,118,0.72)', textDecoration:'none' }} onMouseEnter={e=>e.currentTarget.style.color=C.mint} onMouseLeave={e=>e.currentTarget.style.color='rgba(107,122,118,0.72)'}>{c}</a><span>›</span></>
                  : <span style={{ color:C.ink }}>{c}</span>
                }
              </React.Fragment>
            ))}
          </nav>
          <h2 style={{ fontSize:'22px', fontWeight:900, color:C.ink, marginBottom:'4px' }}>Industrial Assets & Business for sale in Rabat</h2>
          <p style={{ fontSize:'15px', color:C.muted, fontWeight:500 }}>842 Ads in Rabat District</p>
        </div>

        {/* ── CATEGORY PILLS ── */}
        <div style={{ display:'flex', gap:'10px', marginBottom:'36px', overflowX:'auto' as const, paddingBottom:'4px' }}>
          {[...pills,'View More ▾'].map(pill=>(
            <button key={pill} onClick={()=>setActivePill(pill)}
              style={{ whiteSpace:'nowrap' as const, padding:'10px 22px', borderRadius:'100px', fontSize:'13px', fontWeight:700, cursor:'pointer', transition:'all 0.2s', border:'1px solid',
                backgroundColor: activePill===pill ? C.mint : 'white',
                color: activePill===pill ? 'white' : C.ink,
                borderColor: activePill===pill ? C.mint : 'rgba(186,202,197,0.4)',
                boxShadow: activePill===pill ? '0 2px 8px rgba(0,107,95,0.2)' : 'none',
              }}
            >{pill}</button>
          ))}
        </div>

        {/* ── UTILITY BAR ── */}
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'14px 0', borderTop:'1px solid rgba(186,202,197,0.25)', borderBottom:'1px solid rgba(186,202,197,0.25)', marginBottom:'48px', flexWrap:'wrap' as const, gap:'12px' }}>
          <div style={{ display:'flex', gap:'8px' }}>
            {['All Sellers','SouKni Members','SouKni Pro'].map(tab=>(
              <button key={tab} onClick={()=>setActiveSeller(tab)}
                style={{ padding:'8px 20px', borderRadius:'100px', fontSize:'13px', fontWeight:700, cursor:'pointer', transition:'all 0.2s', border:'none',
                  backgroundColor: activeSeller===tab ? '#dde4e1' : 'transparent',
                  color: activeSeller===tab ? C.ink : C.muted,
                }}
              >{tab}</button>
            ))}
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:'20px', flexWrap:'wrap' as const }}>
            <div style={{ display:'flex', alignItems:'center', gap:'10px', cursor:'pointer' }} onClick={()=>setDiamond(!diamond)}>
              <span style={{ fontSize:'13px', fontWeight:700, color:C.muted }}>Show SouKni Diamond Verified First</span>
              <div style={{ width:'44px', height:'22px', borderRadius:'100px', backgroundColor: diamond?C.mint:'#bacac5', position:'relative', transition:'background 0.25s' }}>
                <div style={{ position:'absolute', top:'2px', left: diamond?'24px':'2px', width:'18px', height:'18px', borderRadius:'50%', backgroundColor:'white', transition:'left 0.25s', boxShadow:'0 1px 3px rgba(0,0,0,0.15)' }} />
              </div>
            </div>
            <div style={{ display:'flex', gap:'8px', borderLeft:'1px solid rgba(186,202,197,0.3)', paddingLeft:'16px' }}>
              {[{icon:'↕',label:'Sort: Default'},{icon:'🔔',label:'Save Search'}].map(btn=>(
                <button key={btn.label} style={{ display:'flex', alignItems:'center', gap:'6px', padding:'8px 14px', borderRadius:'12px', border:'1px solid rgba(186,202,197,0.4)', backgroundColor:'#eef5f2', fontSize:'13px', fontWeight:700, cursor:'pointer', color:C.ink, transition:'background 0.15s' }}
                  onMouseEnter={e=>e.currentTarget.style.backgroundColor='#e2eae7'}
                  onMouseLeave={e=>e.currentTarget.style.backgroundColor='#eef5f2'}
                >{btn.icon} {btn.label}</button>
              ))}
            </div>
          </div>
        </div>

        {/* ── FEATURED INDUSTRIAL ASSETS ── */}
        <section style={{ marginBottom:'48px' }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:'20px' }}>
            <h3 style={{ fontSize:'20px', fontWeight:900, color:C.mint, textTransform:'uppercase' as const, letterSpacing:'0.04em' }}>Featured Industrial Assets</h3>
            <a href="#" style={{ fontSize:'13px', fontWeight:700, color:C.mint, textDecoration:'none', display:'flex', alignItems:'center', gap:'4px' }}>View all Featured ›</a>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'16px' }}>
            {featured.map((item,i)=><ProductCard key={i} {...item} />)}
          </div>
        </section>

        {/* ── DUAL INTERSTITIALS ── */}
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'16px', marginBottom:'64px' }}>
          <div style={{ position:'relative', borderRadius:'40px', overflow:'hidden', padding:'40px', display:'flex', flexDirection:'column' as const, justifyContent:'center', minHeight:'280px', backgroundColor:C.mint, boxShadow:'0 16px 40px rgba(0,107,95,0.25)' }}>
            <img src={IMG.immo} alt="Immo" style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover', opacity:0.18 }} />
            <div style={{ position:'relative', zIndex:1, maxWidth:'320px' }}>
              <h2 style={{ fontSize:'32px', fontWeight:900, color:'white', marginBottom:'14px', letterSpacing:'-0.02em', lineHeight:1.2 }}>SouKni Immo Pro</h2>
              <p style={{ fontSize:'17px', color:'rgba(255,255,255,0.92)', marginBottom:'28px', lineHeight:1.6, fontWeight:500 }}>Find the perfect luxury venue for your Rabat corporate events.</p>
              <button style={{ backgroundColor:'white', color:C.mint, border:'none', padding:'14px 32px', borderRadius:'100px', fontWeight:900, fontSize:'13px', cursor:'pointer', textTransform:'uppercase' as const, letterSpacing:'0.06em', transition:'transform 0.2s', boxShadow:'0 8px 24px rgba(0,0,0,0.2)' }}
                onMouseEnter={e=>e.currentTarget.style.transform='scale(1.05)'}
                onMouseLeave={e=>e.currentTarget.style.transform='scale(1)'}
              >Explore Venues</button>
            </div>
          </div>
          <div style={{ position:'relative', borderRadius:'40px', overflow:'hidden', padding:'40px', display:'flex', flexDirection:'column' as const, justifyContent:'center', minHeight:'280px', backgroundColor:'#dde4e1', border:'2px solid rgba(0,107,95,0.18)', boxShadow:'0 16px 40px rgba(0,0,0,0.06)' }}>
            <img src={IMG.auto} alt="Auto" style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover', opacity:0.1 }} />
            <div style={{ position:'relative', zIndex:1, maxWidth:'320px' }}>
              <span style={{ fontSize:'11px', fontWeight:700, color:C.mint, textTransform:'uppercase' as const, letterSpacing:'0.15em', display:'block', marginBottom:'12px' }}>Fleet Solutions</span>
              <h2 style={{ fontSize:'32px', fontWeight:900, color:C.ink, marginBottom:'14px', letterSpacing:'-0.02em', lineHeight:1.2 }}>SouKni Auto Pro</h2>
              <p style={{ fontSize:'17px', color:C.muted, marginBottom:'28px', lineHeight:1.6, fontWeight:500 }}>Arrive in style with our premium luxury corporate rentals in Rabat.</p>
              <button style={{ backgroundColor:C.mint, color:'white', border:'none', padding:'14px 32px', borderRadius:'100px', fontWeight:900, fontSize:'13px', cursor:'pointer', textTransform:'uppercase' as const, letterSpacing:'0.06em', transition:'transform 0.2s', boxShadow:'0 8px 24px rgba(0,107,95,0.2)' }}
                onMouseEnter={e=>e.currentTarget.style.transform='scale(1.05)'}
                onMouseLeave={e=>e.currentTarget.style.transform='scale(1)'}
              >Rent a Classic</button>
            </div>
          </div>
        </div>

        {/* ── SOUKNI BUSINESS COLLECTION (bento like image 2) ── */}
        <section style={{ marginBottom:'40px' }}>
          <h2 style={{ fontSize:'32px', fontWeight:700, color:C.ink, letterSpacing:'-0.02em', marginBottom:'28px' }}>SouKni Business Collection</h2>

          <div style={{ display:'grid', gridTemplateColumns:'1.4fr 1fr', gap:'16px', marginBottom:'16px' }}>
            {/* LARGE LEFT — flagship card with overlay caption */}
            <div style={{ position:'relative', borderRadius:'28px', overflow:'hidden', height:'480px', cursor:'pointer' }}>
              <img src={IMG.nexus} alt="Rabat Industrial Nexus" style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover', transition:'transform 0.7s' }}
                onMouseEnter={e=>e.currentTarget.style.transform='scale(1.05)'}
                onMouseLeave={e=>e.currentTarget.style.transform='scale(1)'}
              />
              <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.1) 55%, transparent 100%)' }} />
              <div style={{ position:'absolute', bottom:0, left:0, right:0, padding:'32px' }}>
                <span style={{ backgroundColor:C.mint, color:'#0d3d2f', fontSize:'11px', fontWeight:700, padding:'5px 16px', borderRadius:'100px', display:'inline-block', marginBottom:'16px' }}>Flagship Estate</span>
                <h3 style={{ fontSize:'30px', fontWeight:700, color:'white', marginBottom:'8px', letterSpacing:'-0.01em' }}>Rabat Industrial Nexus</h3>
                <p style={{ fontSize:'16px', color:'rgba(255,255,255,0.85)' }}>Comprehensive 25,000m² manufacturing complex</p>
              </div>
            </div>

            {/* RIGHT COLUMN — Data Center Park top, two-up below */}
            <div style={{ display:'grid', gridTemplateRows:'1fr 1fr', gap:'16px' }}>
              <div style={{ position:'relative', borderRadius:'28px', overflow:'hidden', cursor:'pointer' }}>
                <img src={IMG.datacenter} alt="Data Center Park" style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover', transition:'transform 0.7s' }}
                  onMouseEnter={e=>e.currentTarget.style.transform='scale(1.08)'}
                  onMouseLeave={e=>e.currentTarget.style.transform='scale(1)'}
                />
                <div style={{ position:'absolute', inset:0, backgroundColor:'rgba(0,0,0,0.32)' }} />
                <div style={{ position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center' }}>
                  <h4 style={{ fontSize:'24px', fontWeight:700, color:'white', letterSpacing:'-0.01em' }}>Data Center Park</h4>
                </div>
              </div>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'16px' }}>
                {[
                  { img:IMG.artisan, label:'Artisan Clusters' },
                  { img:IMG.ecofactory, label:'Eco-Factory Hub' },
                ].map((c,i)=>(
                  <div key={i} style={{ position:'relative', borderRadius:'24px', overflow:'hidden', cursor:'pointer' }}>
                    <img src={c.img} alt={c.label} style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover', transition:'transform 0.7s' }}
                      onMouseEnter={e=>e.currentTarget.style.transform='scale(1.08)'}
                      onMouseLeave={e=>e.currentTarget.style.transform='scale(1)'}
                    />
                    <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top, rgba(0,0,0,0.6), transparent 60%)' }} />
                    <div style={{ position:'absolute', bottom:'16px', left:'16px' }}>
                      <h5 style={{ fontSize:'15px', fontWeight:700, color:'white' }}>{c.label}</h5>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Elevate Your Portfolio strip */}
          <div style={{ position:'relative', borderRadius:'32px', overflow:'hidden', minHeight:'220px', display:'flex', alignItems:'center', cursor:'pointer' }}>
            <img src={IMG.glass} alt="Glass building" style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover' }} />
            <div style={{ position:'absolute', inset:0, background:`linear-gradient(120deg, ${C.mint}cc 0%, rgba(34,212,168,0.55) 70%)` }} />
            <div style={{ position:'relative', zIndex:1, padding:'48px 56px', maxWidth:'620px' }}>
              <h3 style={{ fontSize:'32px', fontWeight:700, color:'white', marginBottom:'16px', letterSpacing:'-0.01em' }}>Elevate Your Portfolio with SouKni Immo Pro</h3>
              <p style={{ fontSize:'17px', color:'rgba(255,255,255,0.9)', marginBottom:'24px', lineHeight:1.6 }}>Exclusive data, priority listings, and a dedicated account manager for industrial giants.</p>
              <button style={{ backgroundColor:'white', color:C.mint, border:'none', padding:'14px 32px', borderRadius:'100px', fontWeight:700, fontSize:'14px', cursor:'pointer', transition:'transform 0.2s' }}
                onMouseEnter={e=>e.currentTarget.style.transform='scale(1.05)'}
                onMouseLeave={e=>e.currentTarget.style.transform='scale(1)'}
              >Join Immo Pro</button>
            </div>
          </div>
        </section>

        {/* ── EXPO PRO BANNER ── */}
        <div style={{ position:'relative', borderRadius:'40px', overflow:'hidden', height:'380px', display:'flex', alignItems:'center', justifyContent:'center', boxShadow:'0 20px 60px rgba(0,0,0,0.15)', marginBottom:'64px' }}>
          <img src={IMG.expo} alt="Industrial Expo" style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover' }} />
          <div style={{ position:'absolute', inset:0, backgroundColor:'rgba(0,0,0,0.32)' }} />
          <div style={{ position:'relative', zIndex:1, maxWidth:'600px', padding:'0 20px', textAlign:'center' as const }}>
            <div style={{ backgroundColor:'rgba(255,255,255,0.12)', backdropFilter:'blur(12px)', border:'1px solid rgba(255,255,255,0.22)', padding:'40px 48px', borderRadius:'40px' }}>
              <h2 style={{ fontSize:'40px', fontWeight:900, color:'white', marginBottom:'16px', letterSpacing:'-0.02em' }}>SouKni Industrial Expo Pro</h2>
              <p style={{ fontSize:'18px', color:'rgba(255,255,255,0.92)', marginBottom:'28px', lineHeight:1.6, fontWeight:500 }}>Elevate your industrial business. Connect with thousands of high-end corporate clients today.</p>
              <button style={{ backgroundColor:C.mint, color:'#0d3d2f', border:'none', padding:'16px 44px', borderRadius:'100px', fontWeight:900, fontSize:'13px', cursor:'pointer', textTransform:'uppercase' as const, letterSpacing:'0.1em', transition:'transform 0.2s', boxShadow:'0 8px 24px rgba(34,212,168,0.35)' }}
                onMouseEnter={e=>e.currentTarget.style.transform='scale(1.05)'}
                onMouseLeave={e=>e.currentTarget.style.transform='scale(1)'}
              >Join the Expo</button>
            </div>
          </div>
        </div>

        {/* ── PROFESSIONAL INDUSTRIAL DISCOVERIES ── */}
        <h2 style={{ fontSize:'24px', fontWeight:900, color:C.mint, marginBottom:'28px' }}>Professional Industrial Discoveries</h2>
        {[gridItems.slice(0,4), gridItems.slice(4,8), gridItems.slice(8,12), gridItems.slice(12,16)].map((row,ri)=>(
          <div key={ri} style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'16px', marginBottom:'16px' }}>
            {row.map((item,j)=><ProductCard key={j} {...item} />)}
          </div>
        ))}

        {/* ── PAGINATION ── */}
        <div style={{ display:'flex', justifyContent:'center', alignItems:'center', gap:'8px', margin:'48px 0 64px' }}>
          <button style={{ width:'40px', height:'40px', borderRadius:'50%', border:'1px solid rgba(186,202,197,0.4)', backgroundColor:'transparent', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', color:C.muted, transition:'background 0.2s' }}
            onMouseEnter={e=>e.currentTarget.style.backgroundColor='#e2eae7'}
            onMouseLeave={e=>e.currentTarget.style.backgroundColor='transparent'}
          ><ChevronLeft size={16} /></button>
          {[1,2,3].map(p=>(
            <button key={p} onClick={()=>setPage(p)}
              style={{ width:'40px', height:'40px', borderRadius:'50%', cursor:'pointer', fontSize:'14px', fontWeight:700, border:'1px solid', transition:'all 0.2s',
                backgroundColor: page===p ? C.mint : 'transparent',
                color: page===p ? 'white' : C.ink,
                borderColor: page===p ? C.mint : 'rgba(186,202,197,0.4)',
              }}
            >{p}</button>
          ))}
          <span style={{ color:C.muted }}>...</span>
          <button style={{ width:'40px', height:'40px', borderRadius:'50%', border:'1px solid rgba(186,202,197,0.4)', backgroundColor:'transparent', cursor:'pointer', fontSize:'14px', fontWeight:700, color:C.ink }}>42</button>
          <button style={{ width:'40px', height:'40px', borderRadius:'50%', border:'1px solid rgba(186,202,197,0.4)', backgroundColor:'transparent', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', color:C.muted, transition:'background 0.2s' }}
            onMouseEnter={e=>e.currentTarget.style.backgroundColor='#e2eae7'}
            onMouseLeave={e=>e.currentTarget.style.backgroundColor='transparent'}
          ><ChevronRight size={16} /></button>
        </div>

        {/* ── DIAMOND MEMBER BANNER ── */}
        <div style={{ background:`linear-gradient(135deg, ${C.mint} 0%, ${C.mint} 100%)`, borderRadius:'40px', padding:'48px', textAlign:'center' as const, position:'relative' as const, overflow:'hidden', marginBottom:'48px', boxShadow:'0 20px 60px rgba(0,107,95,0.3)' }}>
          <div style={{ position:'absolute', inset:0, opacity:0.18 }}>
            <img src={IMG.hero} alt="" style={{ width:'100%', height:'100%', objectFit:'cover' }} />
          </div>
          <div style={{ position:'relative', zIndex:1 }}>
            <h2 style={{ fontSize:'40px', fontWeight:900, color:'white', marginBottom:'14px', letterSpacing:'-0.02em', fontStyle:'italic' as const }}>Become a Diamond Member</h2>
            <p style={{ fontSize:'18px', color:'rgba(255,255,255,0.95)', marginBottom:'28px', maxWidth:'560px', margin:'0 auto 28px', lineHeight:1.7, fontWeight:500 }}>Enjoy zero listing fees, unlimited highlighted ads, and a dedicated account manager for your industrial business.</p>
            <button style={{ backgroundColor:'white', color:C.mint, border:'none', padding:'16px 44px', borderRadius:'100px', fontWeight:900, fontSize:'13px', cursor:'pointer', textTransform:'uppercase' as const, letterSpacing:'0.1em', transition:'transform 0.2s', boxShadow:'0 8px 24px rgba(0,0,0,0.2)' }}
              onMouseEnter={e=>e.currentTarget.style.transform='scale(1.05)'}
              onMouseLeave={e=>e.currentTarget.style.transform='scale(1)'}
            >Upgrade to Diamond</button>
          </div>
        </div>

        {/* ── JOIN SOUKNI FAMILY ── */}
        <div style={{ position:'relative', borderRadius:'40px', overflow:'hidden', padding:'40px 48px', display:'flex', flexDirection:'column' as const, justifyContent:'center', minHeight:'280px', backgroundColor:C.mint, boxShadow:'0 16px 40px rgba(0,107,95,0.25)', marginBottom:'40px' }}>
          <div style={{ position:'absolute', inset:0, opacity:0.3 }}>
            <img src={IMG.hero} alt="" style={{ width:'100%', height:'100%', objectFit:'cover' }} />
          </div>
          <div style={{ position:'relative', zIndex:1, maxWidth:'480px' }}>
            <h2 style={{ fontSize:'36px', fontWeight:900, color:'white', marginBottom:'14px', letterSpacing:'-0.02em' }}>Join the SouKni Family</h2>
            <p style={{ fontSize:'17px', color:'rgba(255,255,255,0.92)', marginBottom:'28px', lineHeight:1.7, fontWeight:500 }}>Start selling your business assets today for free and reach millions of professionals in Morocco.</p>
            <button style={{ backgroundColor:'white', color:C.mint, border:'none', padding:'14px 36px', borderRadius:'100px', fontWeight:900, fontSize:'13px', cursor:'pointer', textTransform:'uppercase' as const, letterSpacing:'0.06em', transition:'transform 0.2s', boxShadow:'0 8px 24px rgba(0,0,0,0.2)' }}
              onMouseEnter={e=>e.currentTarget.style.transform='scale(1.05)'}
              onMouseLeave={e=>e.currentTarget.style.transform='scale(1)'}
            >Register as Individual</button>
          </div>
        </div>
      </div>

      {/* ── FOOTER ── */}
      <footer style={{ backgroundColor:'#7a7a7a', color:'white', padding:'64px 40px 32px' }}>
        <div style={{ maxWidth:'1440px', margin:'0 auto' }}>
          <div style={{ display:'grid', gridTemplateColumns:'2fr 1fr 1fr 1fr', gap:'48px', marginBottom:'48px', paddingBottom:'48px', borderBottom:'1px solid rgba(255,255,255,0.12)' }}>
            <div>
              <div style={{ display:'flex', alignItems:'center', gap:'10px', marginBottom:'14px' }}>
                <div style={{ width:'40px', height:'40px', backgroundColor:C.mint, borderRadius:'10px', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'20px', fontWeight:900, color:'white', boxShadow:'0 4px 12px rgba(0,107,95,0.3)' }}>S</div>
                <span style={{ fontSize:'24px', fontWeight:900, letterSpacing:'-0.02em' }}>SouKni</span>
              </div>
              <p style={{ fontSize:'16px', fontWeight:700, color:'rgba(255,255,255,0.82)', fontStyle:'italic' as const, marginBottom:'12px' }}>The Market in your Pocket</p>
              <p style={{ fontSize:'14px', color:'rgba(255,255,255,0.7)', lineHeight:1.7, marginBottom:'20px', maxWidth:'320px' }}>The leading premium marketplace in Morocco for finding the best deals on new and used items, from strategic business assets to high-end real estate.</p>
              <div style={{ display:'flex', gap:'10px' }}>
                {['🌐','@'].map((icon,i)=>(
                  <div key={i} style={{ width:'40px', height:'40px', borderRadius:'50%', backgroundColor:'rgba(255,255,255,0.1)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'18px', cursor:'pointer', transition:'background 0.15s' }}
                    onMouseEnter={e=>(e.currentTarget as HTMLDivElement).style.backgroundColor=C.mint}
                    onMouseLeave={e=>(e.currentTarget as HTMLDivElement).style.backgroundColor='rgba(255,255,255,0.1)'}
                  >{icon}</div>
                ))}
              </div>
            </div>
            {[
              { title:'Marketplace', links:['Motors','Property','Business & Factories','The Vault'] },
              { title:'Support',     links:['About Us','Help Center','Safety Tips','Privacy Policy'] },
            ].map(col=>(
              <div key={col.title}>
                <h3 style={{ fontWeight:900, color:'white', textTransform:'uppercase' as const, letterSpacing:'0.12em', fontSize:'13px', marginBottom:'20px' }}>{col.title}</h3>
                {col.links.map(link=>(
                  <a key={link} href="#" style={{ display:'block', fontSize:'14px', fontWeight:700, color:'rgba(255,255,255,0.62)', textDecoration:'none', marginBottom:'12px', transition:'color 0.15s' }}
                    onMouseEnter={e=>e.currentTarget.style.color='white'}
                    onMouseLeave={e=>e.currentTarget.style.color='rgba(255,255,255,0.62)'}
                  >{link}</a>
                ))}
              </div>
            ))}
            <div>
              <h3 style={{ fontWeight:900, color:'white', textTransform:'uppercase' as const, letterSpacing:'0.12em', fontSize:'13px', marginBottom:'20px' }}>GET THE APP</h3>
              <div style={{ display:'flex', flexDirection:'column' as const, gap:'10px' }}>
                {[{icon:'▶',label:'Google Play'},{icon:'💻',label:'App Store'}].map(app=>(
                  <button key={app.label} style={{ backgroundColor:'#0f172a', color:'white', border:'1px solid rgba(255,255,255,0.12)', borderRadius:'14px', padding:'12px 16px', display:'flex', alignItems:'center', gap:'12px', cursor:'pointer', transition:'filter 0.15s', boxShadow:'0 4px 12px rgba(0,0,0,0.2)' }}
                    onMouseEnter={e=>e.currentTarget.style.filter='brightness(1.2)'}
                    onMouseLeave={e=>e.currentTarget.style.filter='brightness(1)'}
                  >
                    <span style={{ fontSize:'28px' }}>{app.icon}</span>
                    <div style={{ textAlign:'left' as const }}>
                      <div style={{ fontSize:'8px', fontWeight:900, opacity:0.6, textTransform:'uppercase' as const, letterSpacing:'0.1em' }}>GET IT ON</div>
                      <div style={{ fontSize:'16px', fontWeight:900, lineHeight:1.2 }}>{app.label}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap' as const, gap:'12px' }}>
            <p style={{ fontSize:'12px', color:'rgba(255,255,255,0.42)', fontWeight:700 }}>© 2026 SouKni Marketplace. All rights reserved. Designed for Rabat</p>
            <div style={{ display:'flex', gap:'24px' }}>
              {['Cookie Policy','Site Map'].map(link=>(
                <a key={link} href="#" style={{ fontSize:'12px', color:'rgba(255,255,255,0.42)', textDecoration:'none', fontWeight:700, transition:'color 0.15s' }}
                  onMouseEnter={e=>e.currentTarget.style.color='white'}
                  onMouseLeave={e=>e.currentTarget.style.color='rgba(255,255,255,0.42)'}
                >{link}</a>
              ))}
              <div style={{ display:'flex', alignItems:'center', gap:'6px' }}>
                <div style={{ width:'6px', height:'6px', borderRadius:'50%', backgroundColor:C.mint }} />
                <span style={{ fontSize:'10px', color:'rgba(255,255,255,0.42)', textTransform:'uppercase' as const, letterSpacing:'0.15em', fontWeight:700 }}>System Operational</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
