'use client'

import { useState } from 'react'
import React from 'react'
import { Heart, Search, ChevronLeft, ChevronRight, MapPin, Ruler, BarChart2, Diamond } from 'lucide-react'

/* ─── PALETTE ─────────────────────────────────────────────── */
const C = {
  mint:    '#22d4a8',
  mintDk:  '#006c53',
  cream:   '#f5ede0',
  surface: '#f4fbf8',
  ink:     '#161d1b',
  muted:   '#6b7a76',
}

/* ─── TYPOGRAPHY ───────────────────────────────────────────── */
const UB: React.CSSProperties = { fontWeight:900, letterSpacing:'-0.05em' }

/* ─── IMAGES ──────────────────────────────────────────────── */
const IMG = {
  hero:    'https://images.pexels.com/photos/1470405/pexels-photo-1470405.jpeg?auto=compress&w=1600',
  top:     'https://images.pexels.com/photos/1838640/pexels-photo-1838640.jpeg?auto=compress&w=900',
  office:  'https://images.pexels.com/photos/380769/pexels-photo-380769.jpeg?auto=compress&w=600',
  exec:    'https://images.pexels.com/photos/1838640/pexels-photo-1838640.jpeg?auto=compress&w=600',
  promo:   'https://images.pexels.com/photos/325229/pexels-photo-325229.jpeg?auto=compress&w=1200',
  retail:  'https://images.pexels.com/photos/2079246/pexels-photo-2079246.jpeg?auto=compress&w=600',
  suite:   'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&w=400',
  clinic:  'https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg?auto=compress&w=400',
  logistics:'https://images.pexels.com/photos/4481259/pexels-photo-4481259.jpeg?auto=compress&w=700',
  heavy:   'https://images.pexels.com/photos/2226458/pexels-photo-2226458.jpeg?auto=compress&w=600',
  glassofc:'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&w=600',
  loghub:  'https://images.pexels.com/photos/4481259/pexels-photo-4481259.jpeg?auto=compress&w=600',
  medlab:  'https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg?auto=compress&w=600',
  phone:   'https://images.pexels.com/photos/380769/pexels-photo-380769.jpeg?auto=compress&w=400',
}

/* ─── BADGE ─────────────────────────────────────────────────── */
function Badge({ type }: { type: 'diamond'|'verified'|'certified' }) {
  if (type === 'diamond') return (
    <div style={{ display:'flex', gap:'6px' }}>
      <span style={{ backgroundColor:C.ink, color:C.mint, fontSize:'9px', ...UB, padding:'5px 10px', borderRadius:'8px', display:'inline-flex', alignItems:'center', gap:'4px', textTransform:'uppercase' as const, letterSpacing:'0.08em' }}>◆ DIAMOND</span>
      <span style={{ backgroundColor:C.mint, color:C.ink, fontSize:'9px', ...UB, padding:'5px 10px', borderRadius:'8px', display:'inline-flex', alignItems:'center', gap:'4px', textTransform:'uppercase' as const, letterSpacing:'0.08em' }}><span style={{ width:6, height:6, backgroundColor:C.ink, borderRadius:'50%', display:'inline-block' }} /> VERIFIED</span>
    </div>
  )
  return (
    <span style={{ backgroundColor:C.mint, color:C.ink, fontSize:'9px', ...UB, padding:'5px 10px', borderRadius:'8px', display:'inline-flex', alignItems:'center', gap:'4px', textTransform:'uppercase' as const, letterSpacing:'0.08em' }}><span style={{ width:6, height:6, backgroundColor:C.ink, borderRadius:'50%', display:'inline-block' }} /> CERTIFIED</span>
  )
}

/* ─── ANCHOR LISTING (horizontal full-width) ──────────────── */
function AnchorListing({ price, period, title, sqft, location, desc, img, badge, dark=false }: any) {
  const [saved, setSaved] = useState(false)
  const [hov, setHov] = useState(false)
  return (
    <article onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{ backgroundColor: dark ? C.ink : 'white', border: dark ? 'none' : `2px solid ${hov ? C.mint : 'rgba(107,122,118,0.12)'}`, borderRadius:'28px', overflow:'hidden', display:'flex', flexDirection:'row' as const, boxShadow: hov ? '0 20px 40px rgba(34,212,168,0.08)' : '0 2px 8px rgba(0,0,0,0.04)', transition:'all 0.3s', cursor:'pointer' }}>
      <div style={{ width:'400px', flexShrink:0, position:'relative', overflow:'hidden', backgroundColor:C.cream }}>
        <img src={img} alt={title} style={{ width:'100%', height:'100%', objectFit:'cover', transition:'transform 0.5s', transform:hov?'scale(1.05)':'scale(1)', minHeight:'220px' }} />
        <div style={{ position:'absolute', top:'14px', left:'14px', zIndex:10 }}>
          {badge === 'diamond' ? <Badge type="diamond" /> : <Badge type="certified" />}
        </div>
      </div>
      <div style={{ padding:'36px 40px', flex:1, display:'flex', flexDirection:'column' as const, justifyContent:'space-between' }}>
        <div>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'14px' }}>
            <h3 style={{ fontSize:'clamp(22px,2.5vw,30px)', ...UB, color: dark?'white':C.ink }}>{price.toLocaleString()} MAD <span style={{ fontSize:'13px', fontWeight:400, color: dark ? 'rgba(255,255,255,0.55)' : C.muted }}>/ {period}</span></h3>
            <button onClick={e=>{e.stopPropagation();setSaved(!saved)}} style={{ border:'none', backgroundColor:'transparent', cursor:'pointer', padding:'4px', color: saved?'#ef4444':C.muted, transition:'color 0.2s' }}>
              <Heart size={26} fill={saved?'#ef4444':'none'} />
            </button>
          </div>
          <p style={{ fontSize:'12px', ...UB, color: dark?C.mint:C.mintDk, textTransform:'uppercase' as const, letterSpacing:'0.1em', marginBottom:'12px' }}>{title}</p>
          <div style={{ display:'flex', gap:'24px', marginBottom:'16px' }}>
            {sqft && <span style={{ fontSize:'13px', ...UB, color: dark?'rgba(255,255,255,0.55)':C.muted, display:'flex', alignItems:'center', gap:'6px' }}><Ruler size={16} /> {sqft} SQFT</span>}
            <span style={{ fontSize:'13px', ...UB, color: dark?'rgba(255,255,255,0.55)':C.muted, display:'flex', alignItems:'center', gap:'6px' }}><MapPin size={16} /> {location}</span>
          </div>
          {desc && <p style={{ fontSize:'16px', color: dark?'rgba(255,255,255,0.65)':C.muted, lineHeight:1.65, display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical' as const, overflow:'hidden' }}>{desc}</p>}
        </div>
        <div style={{ display:'flex', gap:'14px', marginTop:'28px' }}>
          <button style={{ flex:1, border:`2px solid ${dark?'white':C.ink}`, color: dark?'white':C.ink, backgroundColor:'transparent', padding:'16px', borderRadius:'18px', fontSize:'13px', ...UB, cursor:'pointer', transition:'all 0.2s' }}
            onMouseEnter={e=>{e.currentTarget.style.backgroundColor= dark?'white':C.ink; e.currentTarget.style.color= dark?C.ink:'white'}}
            onMouseLeave={e=>{e.currentTarget.style.backgroundColor='transparent'; e.currentTarget.style.color= dark?'white':C.ink}}
          >MESSAGE</button>
          <button style={{ flex:1, backgroundColor:C.mint, color:C.ink, border:'none', padding:'16px', borderRadius:'18px', fontSize:'13px', ...UB, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', gap:'6px', transition:'all 0.2s', boxShadow:'0 6px 20px rgba(34,212,168,0.2)' }}
            onMouseEnter={e=>e.currentTarget.style.filter='brightness(1.08)'}
            onMouseLeave={e=>e.currentTarget.style.filter='brightness(1)'}
          >💬 WHATSAPP</button>
        </div>
      </div>
    </article>
  )
}

/* ─── BENTO CARD ─────────────────────────────────────────────── */
function BentoCard({ img, price, period, title, location, wide=false, dark=false }: any) {
  const [hov, setHov] = useState(false)
  return (
    <article onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{ backgroundColor: dark ? C.ink : 'white', border:`1px solid ${dark ? 'transparent' : 'rgba(107,122,118,0.12)'}`, borderRadius:'28px', overflow:'hidden', display:'flex', flexDirection: (wide&&!dark) ? 'row' as const : 'column' as const, boxShadow:hov?'0 16px 32px rgba(0,0,0,0.1)':'0 2px 8px rgba(0,0,0,0.04)', transition:'all 0.3s', cursor:'pointer', gridColumn: wide ? 'span 2' : 'span 1' }}>
      <div style={{ width: (wide&&!dark) ? '50%' : '100%', height: wide&&dark ? '260px' : '180px', flexShrink:0, overflow:'hidden', backgroundColor:C.cream, position:'relative' }}>
        <img src={img} alt={title} style={{ width:'100%', height:'100%', objectFit:'cover', transition:'transform 0.5s', transform:hov?'scale(1.05)':'scale(1)' }} />
        <div style={{ position:'absolute', top:'12px', left:'12px' }}><Badge type="certified" /></div>
      </div>
      <div style={{ padding: wide&&dark ? '28px 32px' : '18px 20px', display:'flex', flexDirection:'column' as const, justifyContent:'space-between', flex:1 }}>
        <div>
          <h3 style={{ fontSize: wide&&dark ? '26px' : '18px', ...UB, color: dark?'white':C.ink, marginBottom:'4px' }}>{price.toLocaleString()} MAD <span style={{ fontSize:'10px', fontWeight:400, color: dark?'rgba(255,255,255,0.55)':C.muted }}>/ {period}</span></h3>
          <p style={{ fontSize:'9px', ...UB, color: dark?C.mint:C.mintDk, textTransform:'uppercase' as const, letterSpacing:'0.1em', marginBottom:'4px' }}>{title}</p>
          {location && <p style={{ fontSize:'11px', ...UB, color: dark?'rgba(255,255,255,0.45)':C.muted }}>{location}</p>}
        </div>
        <div style={{ display:'flex', gap:'8px', marginTop:'14px' }}>
          <button style={{ flex:1, border:`1px solid ${dark?'white':C.ink}`, color: dark?'white':C.ink, backgroundColor:'transparent', padding:'9px', borderRadius:'14px', fontSize:'11px', ...UB, cursor:'pointer', transition:'all 0.15s' }}
            onMouseEnter={e=>{e.currentTarget.style.backgroundColor= dark?'white':C.ink; e.currentTarget.style.color= dark?C.ink:'white'}}
            onMouseLeave={e=>{e.currentTarget.style.backgroundColor='transparent'; e.currentTarget.style.color= dark?'white':C.ink}}
          >MESSAGE</button>
          <button style={{ flex:1, backgroundColor:C.mint, color:C.ink, border:'none', padding:'9px', borderRadius:'14px', fontSize:'11px', ...UB, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', gap:'4px' }}>💬 {wide&&dark ? 'WHATSAPP' : ''}</button>
        </div>
      </div>
    </article>
  )
}

export default function CommercialPropertyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = React.use(params)
  const [purpose, setPurpose] = useState('Rent')
  const [activeCat, setActiveCat] = useState('BUSINESS')
  const [activeStatus, setActiveStatus] = useState('ALL')
  const [diamond, setDiamond] = useState(true)
  const [page, setPage] = useState(1)
  const [cityKw, setCityKw] = useState('')
  const [kw, setKw] = useState('')

  const cats = [
    { label:'BUSINESS', count:5459 },
    { label:'FACTORIES', count:2671 },
    { label:'RESTAURANTS', count:2251 },
    { label:'WAREHOUSES', count:1975 },
    { label:'RETAILS', count:1869 },
    { label:'OFFICES', count:1336 },
  ]

  return (
    <div style={{ fontFamily:'Inter, sans-serif', backgroundColor:C.surface, color:C.ink }}>

      {/* ── CINEMATIC HERO ── */}
      <section style={{ position:'relative', height:'480px', display:'flex', alignItems:'center', justifyContent:'center', overflow:'hidden' }}>
        <img src={IMG.hero} alt="Moroccan Cityscape" style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover' }} />
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.2) 50%, #f4fbf8 100%)' }} />
        <div style={{ position:'relative', zIndex:10, width:'100%', maxWidth:'860px', padding:'0 24px' }}>
          <div style={{ textAlign:'center' as const, marginBottom:'36px' }}>
            <h2 style={{ fontSize:'clamp(36px,6vw,56px)', ...UB, color:'white', marginBottom:'12px', textShadow:'0 4px 20px rgba(0,0,0,0.4)', lineHeight:1.05 }}>Find Your Business Home</h2>
            <p style={{ fontSize:'18px', color:'rgba(255,255,255,0.9)', fontWeight:500 }}>The most exclusive commercial properties in the Kingdom.</p>
          </div>
          {/* transparent hero search */}
          <div style={{ backgroundColor:'rgba(255,255,255,0.15)', backdropFilter:'blur(20px)', border:'1px solid rgba(255,255,255,0.22)', borderRadius:'100px', padding:'8px', display:'flex', gap:'8px', alignItems:'center' }}>
            <div style={{ flex:1, display:'flex', alignItems:'center', backgroundColor:'rgba(255,255,255,0.12)', borderRadius:'100px', padding:'14px 22px', gap:'10px', border:'1px solid rgba(255,255,255,0.12)' }}>
              <MapPin size={18} color={C.mint} />
              <div style={{ display:'flex', flexDirection:'column' as const }}>
                <span style={{ fontSize:'9px', ...UB, color:C.mint, textTransform:'uppercase' as const, letterSpacing:'0.12em', marginBottom:'2px' }}>City</span>
                <input type="text" value={cityKw} onChange={e=>setCityKw(e.target.value)} placeholder="Casablanca, Rabat..."
                  style={{ backgroundColor:'transparent', border:'none', outline:'none', fontSize:'14px', fontWeight:700, color:'white', fontFamily:'Inter, sans-serif' }}
                />
              </div>
            </div>
            <div style={{ flex:1, display:'flex', alignItems:'center', backgroundColor:'rgba(255,255,255,0.12)', borderRadius:'100px', padding:'14px 22px', gap:'10px', border:'1px solid rgba(255,255,255,0.12)' }}>
              <Search size={18} color={C.mint} />
              <div style={{ display:'flex', flexDirection:'column' as const, flex:1 }}>
                <span style={{ fontSize:'9px', ...UB, color:C.mint, textTransform:'uppercase' as const, letterSpacing:'0.12em', marginBottom:'2px' }}>Keyword</span>
                <input type="text" value={kw} onChange={e=>setKw(e.target.value)} placeholder="Office, Warehouse..."
                  style={{ backgroundColor:'transparent', border:'none', outline:'none', fontSize:'14px', fontWeight:700, color:'white', fontFamily:'Inter, sans-serif', width:'100%' }}
                />
              </div>
            </div>
            <button style={{ backgroundColor:C.mint, color:C.ink, border:'none', padding:'18px 44px', borderRadius:'100px', fontSize:'18px', ...UB, cursor:'pointer', transition:'all 0.2s', boxShadow:'0 8px 24px rgba(34,212,168,0.3)', whiteSpace:'nowrap' as const }}
              onMouseEnter={e=>e.currentTarget.style.filter='brightness(1.08)'}
              onMouseLeave={e=>e.currentTarget.style.filter='brightness(1)'}
            >SEARCH</button>
          </div>
        </div>
      </section>

      <main style={{ maxWidth:'1200px', margin:'0 auto', padding:'0 24px 80px' }}>

        {/* ── UNIFIED PROPERTY FILTER BAR ── */}
        <div style={{ backgroundColor:'rgba(255,255,255,0.85)', backdropFilter:'blur(12px)', border:'1px solid rgba(107,122,118,0.12)', borderRadius:'100px', padding:'8px', display:'flex', alignItems:'center', marginBottom:'32px', boxShadow:'0 8px 28px rgba(0,0,0,0.07)' }}>
          {[
            { label:'PURPOSE', val:'Rent', sel:true, flex:1 },
            { label:'LOCATION', val:'Enter location', inp:true, flex:1 },
            { label:'PROPERTY TYPE', val:'All in Commercial', sel:true, flex:1 },
            { label:'PRICE RANGE', val:'Any', sel:true, flex:1 },
            { label:'FILTERS', val:'Area / Size (sqft), Ameniti...', sel:true, flex:1.5 },
          ].map((f,i,arr)=>(
            <div key={f.label} style={{ flex:f.flex, padding:'8px 22px', borderRight: i<arr.length-1 ? '1px solid rgba(107,122,118,0.12)' : 'none', display:'flex', flexDirection:'column' as const, cursor:'pointer' }}>
              <span style={{ fontSize:'9px', ...UB, color:C.muted, textTransform:'uppercase' as const, letterSpacing:'0.12em', marginBottom:'4px' }}>{f.label}</span>
              {f.inp
                ? <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                    <input type="text" placeholder="Enter location" style={{ border:'none', outline:'none', fontSize:'13px', ...UB, color:C.ink, fontFamily:'Inter, sans-serif', backgroundColor:'transparent', flex:1 }} />
                    <MapPin size={14} color={C.mint} />
                  </div>
                : <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                    <span style={{ fontSize:'13px', ...UB, color: f.label==='FILTERS' ? 'rgba(107,122,118,0.5)' : C.ink, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' as const }}>{f.val}</span>
                    <span style={{ color:C.mint, fontSize:'16px', flexShrink:0 }}>▾</span>
                  </div>
              }
            </div>
          ))}
        </div>

        {/* ── BREADCRUMBS + HEADING ── */}
        <div style={{ marginBottom:'28px' }}>
          <div style={{ display:'flex', alignItems:'center', gap:'6px', fontSize:'11px', ...UB, color:C.muted, textTransform:'uppercase' as const, letterSpacing:'0.12em', marginBottom:'16px' }}>
            🏠 <span style={{ color:C.muted }}>›</span> <span>Rabat &gt; Property</span> <span style={{ color:C.muted }}>›</span> <span style={{ color:C.mintDk }}>Commercial properties</span>
          </div>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', flexWrap:'wrap' as const, gap:'16px' }}>
            <div>
              <h1 style={{ fontSize:'clamp(24px,4vw,36px)', ...UB, color:C.ink, marginBottom:'6px' }}>Commercial Properties for Rent in Rabat</h1>
              <p style={{ fontSize:'13px', ...UB, color:C.muted, textTransform:'uppercase' as const, letterSpacing:'0.08em' }}>5,186 ACTIVE LISTINGS</p>
            </div>
            <div style={{ display:'flex', gap:'12px' }}>
              {[{icon:'↕', label:'SORT: POPULAR'},{icon:'🔖', label:'SAVE SEARCH'}].map(btn=>(
                <button key={btn.label} style={{ display:'flex', alignItems:'center', gap:'6px', padding:'12px 20px', backgroundColor:'white', border:'1px solid rgba(107,122,118,0.18)', borderRadius:'14px', fontSize:'11px', ...UB, cursor:'pointer', transition:'background 0.15s', color:C.ink }}
                  onMouseEnter={e=>e.currentTarget.style.backgroundColor=C.surface}
                  onMouseLeave={e=>e.currentTarget.style.backgroundColor='white'}
                >{btn.icon} {btn.label}</button>
              ))}
            </div>
          </div>
        </div>

        {/* ── BLACK CATEGORY PILLS ── */}
        <div style={{ display:'flex', gap:'10px', overflowX:'auto' as const, paddingBottom:'6px', marginBottom:'28px' }}>
          {cats.map(c=>(
            <button key={c.label} onClick={()=>setActiveCat(c.label)}
              style={{ padding:'12px 22px', borderRadius:'100px', fontSize:'11px', ...UB, cursor:'pointer', whiteSpace:'nowrap' as const, transition:'all 0.2s',
                backgroundColor: activeCat===c.label ? C.mint : C.ink,
                color: activeCat===c.label ? C.ink : 'white',
                border: 'none',
              }}
            >{c.label} <span style={{ opacity:0.55 }}>({c.count.toLocaleString()})</span></button>
          ))}
          <button style={{ padding:'12px 22px', borderRadius:'100px', fontSize:'11px', ...UB, cursor:'pointer', whiteSpace:'nowrap' as const, backgroundColor:'white', color:C.ink, border:`2px solid ${C.ink}`, transition:'all 0.2s' }}
            onMouseEnter={e=>{e.currentTarget.style.backgroundColor=C.ink;e.currentTarget.style.color='white'}}
            onMouseLeave={e=>{e.currentTarget.style.backgroundColor='white';e.currentTarget.style.color=C.ink}}
          >VIEW ALL</button>
        </div>

        {/* ── STATUS TOGGLES + DIAMOND ── */}
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap' as const, gap:'16px', marginBottom:'36px' }}>
          <div style={{ display:'flex', padding:'4px', backgroundColor:'rgba(107,122,118,0.06)', borderRadius:'18px' }}>
            {['ALL','FURNISHED','UNFURNISHED'].map(s=>(
              <button key={s} onClick={()=>setActiveStatus(s)}
                style={{ padding:'12px 28px', borderRadius:'14px', fontSize:'11px', ...UB, cursor:'pointer', border:'none', transition:'all 0.2s',
                  backgroundColor: activeStatus===s ? C.mint : 'transparent',
                  color: activeStatus===s ? C.ink : C.muted,
                  boxShadow: activeStatus===s ? '0 2px 8px rgba(34,212,168,0.2)' : 'none',
                }}
              >{s}</button>
            ))}
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:'12px', padding:'12px 20px', backgroundColor:`${C.mint}0d`, border:`1px solid ${C.mint}30`, borderRadius:'18px', cursor:'pointer' }} onClick={()=>setDiamond(!diamond)}>
            <span style={{ fontSize:'13px', ...UB, color:C.mintDk }}>SOUKNI DIAMOND VERIFIED FIRST</span>
            <div style={{ width:'48px', height:'24px', borderRadius:'100px', backgroundColor: diamond?C.mint:'#bacac5', position:'relative', transition:'background 0.25s', flexShrink:0 }}>
              <div style={{ position:'absolute', top:'3px', right: diamond?'3px':'auto', left: diamond?'auto':'3px', width:'18px', height:'18px', borderRadius:'50%', backgroundColor:C.ink, transition:'all 0.25s' }} />
            </div>
          </div>
        </div>

        {/* ── TOP PICKS HEADER ── */}
        <section style={{ marginBottom:'28px' }}>
          <div style={{ display:'flex', alignItems:'center', gap:'16px', marginBottom:'20px' }}>
            <h2 style={{ fontSize:'22px', ...UB, color:C.ink }}>SouKni Top Picks</h2>
            <div style={{ flex:1, height:'1px', backgroundColor:'rgba(107,122,118,0.12)' }} />
          </div>

          {/* FLAGSHIP LISTING */}
          <article style={{ backgroundColor:'white', border:`2px solid ${C.mint}`, borderRadius:'28px', overflow:'hidden', display:'flex', flexDirection:'row' as const, boxShadow:'0 8px 32px rgba(34,212,168,0.12)', marginBottom:'20px', cursor:'pointer' }}>
            <div style={{ width:'480px', flexShrink:0, position:'relative', overflow:'hidden', backgroundColor:C.cream }}>
              <img src={IMG.top} alt="Flagship" style={{ width:'100%', height:'100%', objectFit:'cover', minHeight:'280px' }} />
              <div style={{ position:'absolute', top:'14px', left:'14px', zIndex:10 }}><Badge type="diamond" /></div>
            </div>
            <div style={{ padding:'40px', flex:1, display:'flex', flexDirection:'column' as const, justifyContent:'space-between' }}>
              <div>
                <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'16px' }}>
                  <h3 style={{ fontSize:'32px', ...UB, color:C.ink }}>5,500,000 MAD <span style={{ fontSize:'13px', fontWeight:400, color:C.muted }}>/ YEARLY</span></h3>
                  <button style={{ border:'none', background:'transparent', cursor:'pointer', color:C.muted }}><Heart size={28} /></button>
                </div>
                <p style={{ fontSize:'12px', ...UB, color:C.mintDk, textTransform:'uppercase' as const, letterSpacing:'0.1em', marginBottom:'16px' }}>Flagship Retail & Office Complex</p>
                <div style={{ display:'flex', gap:'24px', marginBottom:'16px' }}>
                  <span style={{ fontSize:'13px', ...UB, color:C.muted, display:'flex', alignItems:'center', gap:'6px' }}><Ruler size={16} /> 8,450 SQFT</span>
                  <span style={{ fontSize:'13px', ...UB, color:C.muted, display:'flex', alignItems:'center', gap:'6px' }}><MapPin size={16} /> AGDAL, RABAT</span>
                </div>
                <p style={{ fontSize:'17px', color:C.muted, lineHeight:1.7 }}>A landmark commercial opportunity in the heart of Agdal. Featuring triple-height ceilings, premium glass frontage, and state-of-the-art security systems. Perfect for international headquarters or luxury retail.</p>
              </div>
              <div style={{ display:'flex', gap:'14px', marginTop:'32px' }}>
                <button style={{ flex:1, border:`2px solid ${C.ink}`, color:C.ink, backgroundColor:'transparent', padding:'18px', borderRadius:'18px', fontSize:'13px', ...UB, cursor:'pointer', transition:'all 0.2s' }}
                  onMouseEnter={e=>{e.currentTarget.style.backgroundColor=C.ink;e.currentTarget.style.color='white'}}
                  onMouseLeave={e=>{e.currentTarget.style.backgroundColor='transparent';e.currentTarget.style.color=C.ink}}
                >MESSAGE</button>
                <button style={{ flex:1, backgroundColor:C.mint, color:C.ink, border:'none', padding:'18px', borderRadius:'18px', fontSize:'13px', ...UB, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', gap:'8px', boxShadow:'0 6px 20px rgba(34,212,168,0.25)' }}>💬 WHATSAPP</button>
              </div>
            </div>
          </article>

          <AnchorListing price={349000} period="YEARLY" title="Office" sqft="1,727" location="WIFAK" desc="Premium fully furnished office space located in Hayat Business Avenue Mohamed V. Modern amenities included." img={IMG.office} badge="certified" />
        </section>

        {/* ── VALUATION BANNER ── */}
        <div style={{ backgroundColor:C.ink, borderRadius:'28px', padding:'36px 40px', display:'flex', alignItems:'center', justifyContent:'space-between', gap:'24px', marginBottom:'20px', flexWrap:'wrap' as const }}>
          <div style={{ display:'flex', alignItems:'center', gap:'28px' }}>
            <div style={{ width:'72px', height:'72px', backgroundColor:C.mint, borderRadius:'18px', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
              <BarChart2 size={36} color={C.ink} />
            </div>
            <div>
              <h4 style={{ fontSize:'22px', ...UB, color:'white', marginBottom:'6px' }}>What's your property worth today?</h4>
              <p style={{ fontSize:'15px', color:'rgba(255,255,255,0.6)' }}>Get an instant <strong style={{ color:C.mint }}>SouKni Estimate</strong> report with accurate, data-driven property insights.</p>
            </div>
          </div>
          <button style={{ backgroundColor:'white', color:C.ink, border:'none', padding:'18px 36px', borderRadius:'18px', fontSize:'13px', ...UB, cursor:'pointer', whiteSpace:'nowrap' as const, transition:'all 0.2s' }}
            onMouseEnter={e=>e.currentTarget.style.backgroundColor=C.mint}
            onMouseLeave={e=>e.currentTarget.style.backgroundColor='white'}
          >GET FREE ESTIMATION</button>
        </div>

        <div style={{ marginBottom:'20px' }}>
          <AnchorListing price={960750} period="YEARLY" title="Executive Office" sqft="3,554" location="BUSINESS CENTRE 5" desc="High Floor A-Grade corporate suite in Rabat's most prestigious business hub." img={IMG.exec} badge="certified" />
        </div>

        {/* ── IMMO PRO PROMO BANNER ── */}
        <div style={{ position:'relative', borderRadius:'28px', overflow:'hidden', height:'380px', marginBottom:'20px', cursor:'pointer', boxShadow:'0 16px 48px rgba(0,0,0,0.2)' }}>
          <img src={IMG.promo} alt="SouKni Immo Pro" style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover' }} />
          <div style={{ position:'absolute', inset:0, background:'linear-gradient(to right, rgba(22,29,27,0.9) 0%, transparent 70%)' }} />
          <div style={{ position:'absolute', inset:0, display:'flex', flexDirection:'column' as const, justifyContent:'center', padding:'64px' }}>
            <h2 style={{ fontSize:'clamp(28px,4vw,44px)', ...UB, color:'white', marginBottom:'20px', maxWidth:'520px', lineHeight:1.1 }}>Elevate Your Business Presence with SouKni Immo Pro</h2>
            <p style={{ fontSize:'18px', color:'rgba(255,255,255,0.8)', marginBottom:'36px', maxWidth:'420px', lineHeight:1.6 }}>Discover premium office spaces, retail storefronts, and industrial hubs tailored for rapid growth.</p>
            <button style={{ backgroundColor:C.mint, color:C.ink, border:'none', padding:'18px 40px', borderRadius:'100px', fontSize:'17px', ...UB, cursor:'pointer', width:'fit-content', boxShadow:`0 8px 24px ${C.mint}40`, transition:'transform 0.2s' }}
              onMouseEnter={e=>e.currentTarget.style.transform='scale(1.05)'}
              onMouseLeave={e=>e.currentTarget.style.transform='scale(1)'}
            >EXPLORE PRO LISTINGS</button>
          </div>
        </div>

        {/* ── BENTO GRID (4 cards) ── */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'16px', marginBottom:'20px' }}>
          <BentoCard img={IMG.retail} price={60000} period="MONTHLY" title="Retail Storefront • ANFA PLACE" wide />
          <BentoCard img={IMG.suite}  price={1200000} period="YEARLY" title="Executive Suite • CASABLANCA" location="Casablanca" />
          <BentoCard img={IMG.clinic} price={450000}  period="YEARLY" title="Medical Clinic • RABAT" location="Rabat" />
        </div>

        {/* ── DARK WIDE CARD ── */}
        <div style={{ marginBottom:'20px' }}>
          <AnchorListing price={2500000} period="YEARLY" title="Logistics Hub • TANGIER MED ZONE" sqft="12,500" location="TANGIER MED" desc="Modern industrial warehouse with high ceilings. Optimized for large-scale logistics." img={IMG.logistics} badge="certified" dark />
        </div>

        {/* ── DIAMOND CTA BANNER ── */}
        <div style={{ backgroundColor:C.mint, borderRadius:'28px', padding:'48px 56px', display:'flex', alignItems:'center', justifyContent:'space-between', gap:'32px', marginBottom:'32px', position:'relative' as const, overflow:'hidden', boxShadow:`0 12px 40px ${C.mint}30` }}>
          <div style={{ position:'absolute', inset:0, opacity:0.08, pointerEvents:'none' }}>
            <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d="M0 0 L100 100 M100 0 L0 100" stroke={C.ink} strokeWidth="0.5" fill="none" />
              <circle cx="50" cy="50" r="40" stroke={C.ink} strokeWidth="0.5" fill="none" />
            </svg>
          </div>
          <div style={{ position:'relative', zIndex:1, display:'flex', alignItems:'center', gap:'24px' }}>
            <div style={{ backgroundColor:C.ink, padding:'16px', borderRadius:'18px', flexShrink:0 }}>
              <Diamond size={44} color={C.mint} />
            </div>
            <div>
              <h2 style={{ fontSize:'clamp(24px,3vw,40px)', ...UB, color:C.ink, marginBottom:'10px' }}>Elevate to Diamond Certified</h2>
              <p style={{ fontSize:'18px', color:'rgba(22,29,27,0.75)', maxWidth:'520px', lineHeight:1.6 }}>Gain maximum visibility, exclusive market insights, and the ultimate badge of trust on SouKni.</p>
            </div>
          </div>
          <button style={{ backgroundColor:C.ink, color:'white', border:'none', padding:'22px 48px', borderRadius:'100px', fontSize:'18px', ...UB, cursor:'pointer', whiteSpace:'nowrap' as const, transition:'transform 0.2s', boxShadow:'0 8px 24px rgba(0,0,0,0.25)', position:'relative' as const, zIndex:1 }}
            onMouseEnter={e=>e.currentTarget.style.transform='scale(1.05)'}
            onMouseLeave={e=>e.currentTarget.style.transform='scale(1)'}
          >GET CERTIFIED NOW</button>
        </div>

        {/* ── MORE LISTINGS ── */}
        <div style={{ display:'flex', flexDirection:'column' as const, gap:'16px', marginBottom:'32px' }}>
          <AnchorListing price={15000}    period="DAILY"  title="Heavy Equipment Rental" sqft="N/A" location="TANGIER MED" desc="2024 Caterpillar 320 Hydraulic Excavator available for long-term industrial projects. High efficiency and low hours." img={IMG.heavy} badge="certified" />
          <AnchorListing price={1850000}  period="YEARLY" title="Executive Suite" sqft="4,200" location="CASABLANCA FINANCE CITY" desc="Luxury modern glass office penthouse with panoramic city views. Minimalist interior design with high-end finishes." img={IMG.glassofc} badge="certified" />
          <AnchorListing price={4200000}  period="YEARLY" title="Logistics Hub" sqft="12,500" location="TANGIER MED ZONE" desc="Modern industrial warehouse with high ceilings and organized shelving. Optimized for large-scale logistics operations." img={IMG.loghub} badge="certified" />
          <AnchorListing price={650000}   period="YEARLY" title="Healthcare Innovation" sqft="N/A" location="RABAT TECHNO-PARK" desc="State-of-the-art medical laboratory facility. Bright, airy, and equipped for specialized clinical research." img={IMG.medlab} badge="certified" />
        </div>

        {/* ── PAGINATION ── */}
        <div style={{ display:'flex', justifyContent:'center', alignItems:'center', gap:'10px', margin:'48px 0 64px' }}>
          <button style={{ width:'52px', height:'52px', borderRadius:'14px', backgroundColor:'white', border:'1px solid rgba(107,122,118,0.12)', cursor:'not-allowed', display:'flex', alignItems:'center', justifyContent:'center', color:C.muted }}><ChevronLeft size={20} /></button>
          {[1,2,3].map(p=>(
            <button key={p} onClick={()=>setPage(p)}
              style={{ width:'52px', height:'52px', borderRadius:'14px', cursor:'pointer', fontSize:'17px', ...UB, border:'1px solid', transition:'all 0.2s',
                backgroundColor: page===p ? C.mint : 'white',
                color: page===p ? C.ink : C.muted,
                borderColor: page===p ? C.mint : 'rgba(107,122,118,0.12)',
              }}
            >{p}</button>
          ))}
          <span style={{ padding:'0 12px', color:C.muted, fontSize:'17px', ...UB }}>...</span>
          <button style={{ width:'52px', height:'52px', borderRadius:'14px', backgroundColor:'white', border:'1px solid rgba(107,122,118,0.12)', cursor:'pointer', fontSize:'17px', ...UB, color:C.muted, transition:'all 0.15s' }}
            onMouseEnter={e=>{e.currentTarget.style.borderColor=C.mint;e.currentTarget.style.color=C.ink}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor='rgba(107,122,118,0.12)';e.currentTarget.style.color=C.muted}}
          >45</button>
          <button style={{ width:'52px', height:'52px', borderRadius:'14px', backgroundColor:'white', border:'1px solid rgba(107,122,118,0.12)', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', color:C.ink, transition:'all 0.15s' }}
            onMouseEnter={e=>e.currentTarget.style.backgroundColor=C.mint}
            onMouseLeave={e=>e.currentTarget.style.backgroundColor='white'}
          ><ChevronRight size={20} /></button>
        </div>

        {/* ── JOIN SOUKNI FAMILY ── */}
        <section style={{ backgroundColor:C.cream, borderRadius:'28px', padding:'56px 64px', display:'flex', alignItems:'center', justifyContent:'space-between', gap:'48px', overflow:'hidden', position:'relative' as const, flexWrap:'wrap' as const }}>
          <div style={{ flex:1, zIndex:1 }}>
            <h2 style={{ fontSize:'clamp(32px,5vw,48px)', ...UB, color:C.ink, marginBottom:'20px' }}>Join the SouKni Family</h2>
            <p style={{ fontSize:'20px', color:C.muted, marginBottom:'44px', maxWidth:'480px', lineHeight:1.6 }}>The Market in your Pocket. Experience the future of marketplace discovery on your mobile device.</p>
            <div style={{ display:'flex', gap:'20px', flexWrap:'wrap' as const }}>
              {[{label:'App Store'},{label:'Google Play'}].map(app=>(
                <button key={app.label} style={{ backgroundColor:C.ink, color:'white', border:'none', padding:'14px 32px', borderRadius:'14px', fontSize:'14px', ...UB, cursor:'pointer', transition:'background 0.2s', display:'flex', alignItems:'center', gap:'10px' }}
                  onMouseEnter={e=>e.currentTarget.style.backgroundColor=C.mintDk}
                  onMouseLeave={e=>e.currentTarget.style.backgroundColor=C.ink}
                >{app.label === 'App Store' ? '📱' : '▶'} {app.label}</button>
              ))}
            </div>
          </div>
          <div style={{ position:'relative', zIndex:1 }}>
            <div style={{ width:'260px', aspectRatio:'9/16', backgroundColor:C.ink, borderRadius:'48px', border:`8px solid ${C.ink}`, overflow:'hidden', boxShadow:'0 24px 60px rgba(0,0,0,0.25)', position:'relative' }}>
              <img src={IMG.phone} alt="App" style={{ width:'100%', height:'100%', objectFit:'cover', opacity:0.82 }} />
            </div>
            <div style={{ position:'absolute', right:'-48px', top:'-48px', width:'240px', height:'240px', backgroundColor:`${C.mint}22`, borderRadius:'50%', filter:'blur(48px)' }} />
          </div>
        </section>
      </main>

      {/* ── FOOTER (dark ink) ── */}
      <footer style={{ backgroundColor:C.ink, color:'white', padding:'80px 24px 44px' }}>
        <div style={{ maxWidth:'1200px', margin:'0 auto' }}>
          <div style={{ display:'grid', gridTemplateColumns:'2fr 1fr 1fr 1fr 1fr', gap:'48px', marginBottom:'64px' }}>
            <div>
              <div style={{ fontSize:'36px', ...UB, color:C.mint, marginBottom:'24px' }}>SouKni</div>
              <p style={{ fontSize:'14px', color:'rgba(255,255,255,0.6)', lineHeight:1.7, maxWidth:'280px', marginBottom:'32px' }}>Morocco's premium community marketplace. Connecting professional services and high-end goods with discerning users across the Kingdom.</p>
              <div style={{ display:'flex', gap:'12px' }}>
                {['🌐','🔗','✉️'].map((icon,i)=>(
                  <div key={i} style={{ width:'44px', height:'44px', borderRadius:'12px', backgroundColor:'rgba(255,255,255,0.06)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'20px', cursor:'pointer', transition:'background 0.15s' }}
                    onMouseEnter={e=>(e.currentTarget as HTMLDivElement).style.backgroundColor=C.mint}
                    onMouseLeave={e=>(e.currentTarget as HTMLDivElement).style.backgroundColor='rgba(255,255,255,0.06)'}
                  >{icon}</div>
                ))}
              </div>
            </div>
            {[
              { title:'Company', links:['About Us','Careers','Press','Contact'] },
              { title:'Support',  links:['Help Center','Safety Tips','Trust & Safety','Ad Rules'] },
              { title:'Legal',    links:['Terms of Use','Privacy Policy','Cookie Policy'] },
              { title:'Top Cities', links:['Casablanca','Rabat','Marrakech','Tangier'] },
            ].map(col=>(
              <div key={col.title}>
                <h5 style={{ fontSize:'9px', ...UB, color:C.mint, textTransform:'uppercase' as const, letterSpacing:'0.15em', marginBottom:'24px' }}>{col.title}</h5>
                {col.links.map(link=>(
                  <a key={link} href="#" style={{ display:'block', fontSize:'14px', ...UB, color:'rgba(255,255,255,0.7)', textDecoration:'none', marginBottom:'14px', transition:'color 0.15s' }}
                    onMouseEnter={e=>e.currentTarget.style.color=C.mint}
                    onMouseLeave={e=>e.currentTarget.style.color='rgba(255,255,255,0.7)'}
                  >{link}</a>
                ))}
              </div>
            ))}
          </div>
          <div style={{ borderTop:'1px solid rgba(255,255,255,0.06)', paddingTop:'32px', display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap' as const, gap:'12px' }}>
            <p style={{ fontSize:'10px', ...UB, letterSpacing:'0.25em', textTransform:'uppercase' as const, color:'rgba(255,255,255,0.28)' }}>© 2026 SOUKNI MOROCCO. ALL RIGHTS RESERVED.</p>
            <div style={{ display:'flex', gap:'28px' }}>
              {['English','Français','العربية'].map((lang,i)=>(
                <span key={lang} style={{ fontSize:'10px', ...UB, letterSpacing:'0.12em', textTransform:'uppercase' as const, color:'rgba(255,255,255,0.28)', cursor: i===0 ? 'default' : 'pointer', transition:'color 0.15s' }}
                  onMouseEnter={e=>{ if(i!==0)(e.currentTarget as HTMLSpanElement).style.color=C.mint }}
                  onMouseLeave={e=>(e.currentTarget as HTMLSpanElement).style.color='rgba(255,255,255,0.28)'}
                >{lang}</span>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
