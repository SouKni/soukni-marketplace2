'use client'

import { useState } from 'react'
import React from 'react'
import { Heart, Search, MapPin, ChevronLeft, ChevronRight } from 'lucide-react'

/* ─── PALETTE ─────────────────────────────────────────────── */
const C = {
  mint:    '#22d4a8',
  ink:     '#161d1b',
  surface: '#f4fbf8',
  cream:   '#f5ede0',
  muted:   '#6b7a76',
}
const UB: React.CSSProperties = { fontFamily:'Inter,sans-serif',             fontWeight:900, letterSpacing:'-0.05em' }
const CB: React.CSSProperties = { fontFamily:"'Hanken Grotesk',sans-serif",  fontWeight:900, letterSpacing:'-0.03em' }

/* ─── IMAGES ──────────────────────────────────────────────── */
const IMG = {
  hero:    'https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg?auto=compress&w=1600',
  tractor1:'https://images.pexels.com/photos/2933243/pexels-photo-2933243.jpeg?auto=compress&w=600',
  tractor2:'https://images.pexels.com/photos/2933241/pexels-photo-2933241.jpeg?auto=compress&w=600',
  excavator:'https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg?auto=compress&w=600',
  dozer:   'https://images.pexels.com/photos/2101137/pexels-photo-2101137.jpeg?auto=compress&w=600',
  cement:  'https://images.pexels.com/photos/2566903/pexels-photo-2566903.jpeg?auto=compress&w=600',
  mixer:   'https://images.pexels.com/photos/2933243/pexels-photo-2933243.jpeg?auto=compress&w=600',
  roller:  'https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg?auto=compress&w=600',
  jcb:     'https://images.pexels.com/photos/2101137/pexels-photo-2101137.jpeg?auto=compress&w=600',
  combine: 'https://images.pexels.com/photos/2933241/pexels-photo-2933241.jpeg?auto=compress&w=600',
  case:    'https://images.pexels.com/photos/2933243/pexels-photo-2933243.jpeg?auto=compress&w=600',
  toyota:  'https://images.pexels.com/photos/2101137/pexels-photo-2101137.jpeg?auto=compress&w=600',
  jungheinrich:'https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg?auto=compress&w=600',
  indpro:  'https://images.pexels.com/photos/2566903/pexels-photo-2566903.jpeg?auto=compress&w=1400',
  volvo:   'https://images.pexels.com/photos/2566903/pexels-photo-2566903.jpeg?auto=compress&w=600',
  scania:  'https://images.pexels.com/photos/2933243/pexels-photo-2933243.jpeg?auto=compress&w=600',
  iveco:   'https://images.pexels.com/photos/2933241/pexels-photo-2933241.jpeg?auto=compress&w=600',
  goldhofer:'https://images.pexels.com/photos/2101137/pexels-photo-2101137.jpeg?auto=compress&w=600',
  liebherr:'https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg?auto=compress&w=600',
  caterpillar:'https://images.pexels.com/photos/2566903/pexels-photo-2566903.jpeg?auto=compress&w=600',
  jd:      'https://images.pexels.com/photos/2933241/pexels-photo-2933241.jpeg?auto=compress&w=600',
  caseW:   'https://images.pexels.com/photos/2933243/pexels-photo-2933243.jpeg?auto=compress&w=600',
  liebherr2:'https://images.pexels.com/photos/2101137/pexels-photo-2101137.jpeg?auto=compress&w=600',
  newH:    'https://images.pexels.com/photos/2933241/pexels-photo-2933241.jpeg?auto=compress&w=600',
  mercedesA:'https://images.pexels.com/photos/2566903/pexels-photo-2566903.jpeg?auto=compress&w=600',
  toyotaD: 'https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg?auto=compress&w=600',
  phone:   'https://images.pexels.com/photos/2101137/pexrot-photo-2101137.jpeg?auto=compress&w=400',
}

/* ─── BADGE ─────────────────────────────────────────────────── */
type BadgeT = 'soukni'|'diamond'|'certified'
function CardBadge({ type }: { type: BadgeT }) {
  const map: Record<BadgeT,{bg:string;color:string;label:string}> = {
    soukni:    { bg:C.mint, color:C.ink,  label:'SOUKNI CERTIFIED' },
    diamond:   { bg:C.ink,  color:C.mint, label:'◆ DIAMOND MEMBER'  },
    certified: { bg:C.mint, color:C.ink,  label:'SouKni Certified'  },
  }
  const s = map[type]
  return (
    <span style={{ backgroundColor:s.bg, color:s.color, fontSize:'8px', ...CB, padding:'4px 10px', borderRadius:'6px', textTransform:'uppercase' as const, letterSpacing:'0.08em', display:'inline-block', boxShadow:'0 2px 6px rgba(0,0,0,0.15)', whiteSpace:'nowrap' as const }}>
      {s.label}
    </span>
  )
}

/* ─── VEHICLE CARD ──────────────────────────────────────────── */
interface Vehicle { title:string; price:number; img:string; badge:BadgeT; category?:string; year?:string }

function VehicleCard({ title, price, img, badge, category, year }: Vehicle) {
  const [hov, setHov] = useState(false)
  const [saved, setSaved] = useState(false)
  return (
    <article onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{ backgroundColor:'white', borderRadius:'24px', border:`1px solid ${hov?C.mint:'rgba(107,122,118,0.12)'}`, overflow:'hidden', boxShadow:hov?`0 16px 40px ${C.mint}20`:'0 2px 8px rgba(0,0,0,0.04)', transition:'all 0.3s', cursor:'pointer', display:'flex', flexDirection:'column' as const }}>
      <div style={{ position:'relative', aspectRatio:'4/3', overflow:'hidden', backgroundColor:C.cream }}>
        <img src={img} alt={title} style={{ width:'100%', height:'100%', objectFit:'cover', transition:'transform 0.6s', transform:hov?'scale(1.06)':'scale(1)' }} />
        <div style={{ position:'absolute', top:'10px', left:'10px', zIndex:10 }}><CardBadge type={badge} /></div>
        <button onClick={e=>{e.stopPropagation();setSaved(!saved)}} style={{ position:'absolute', top:'8px', right:'8px', zIndex:10, width:'30px', height:'30px', borderRadius:'50%', backgroundColor:'rgba(255,255,255,0.82)', backdropFilter:'blur(8px)', border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}>
          <Heart size={13} fill={saved?'#ef4444':'none'} color={saved?'#ef4444':C.muted} />
        </button>
      </div>
      <div style={{ padding:'14px 16px', flex:1, display:'flex', flexDirection:'column' as const }}>
        {(category||year) && (
          <div style={{ display:'flex', gap:'8px', marginBottom:'4px' }}>
            {category && <span style={{ fontSize:'9px', ...CB, color:C.muted, textTransform:'uppercase' as const, letterSpacing:'0.08em' }}>{category}</span>}
            {year     && <span style={{ fontSize:'9px', ...CB, color:C.muted }}>· {year}</span>}
          </div>
        )}
        <h4 style={{ fontSize:'13px', ...CB, color:hov?C.mint:C.ink, transition:'color 0.2s', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' as const, marginBottom:'6px' }}>{title}</h4>
        <p style={{ fontSize:'16px', ...CB, color:C.mint, marginBottom:'14px' }}>MAD {price.toLocaleString()}</p>
        <div style={{ marginTop:'auto', display:'flex', gap:'8px' }}>
          <button style={{ flex:1, border:`2px solid ${C.ink}`, color:C.ink, backgroundColor:'transparent', padding:'9px', borderRadius:'12px', fontSize:'9px', ...CB, textTransform:'uppercase' as const, cursor:'pointer', transition:'all 0.15s' }}
            onMouseEnter={e=>{e.currentTarget.style.backgroundColor=C.ink;e.currentTarget.style.color='white'}}
            onMouseLeave={e=>{e.currentTarget.style.backgroundColor='transparent';e.currentTarget.style.color=C.ink}}
          >CHAT</button>
          <button style={{ flex:1, backgroundColor:C.mint, color:C.ink, border:'none', padding:'9px', borderRadius:'12px', fontSize:'9px', ...CB, textTransform:'uppercase' as const, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', gap:'4px', transition:'filter 0.15s' }}
            onMouseEnter={e=>e.currentTarget.style.filter='brightness(1.08)'}
            onMouseLeave={e=>e.currentTarget.style.filter='brightness(1)'}
          >💬 WHATSAPP</button>
        </div>
      </div>
    </article>
  )
}

function SectionHead({ title, sub }: { title:string; sub?:string }) {
  return (
    <div style={{ marginBottom:'24px' }}>
      <h3 style={{ fontSize:'clamp(16px,2vw,20px)', ...UB, color:C.ink, textTransform:'uppercase' as const, marginBottom:sub?'6px':'0', lineHeight:1.2 }}>{title}</h3>
      {sub && <p style={{ fontSize:'13px', color:C.muted, fontFamily:'Inter,sans-serif', fontWeight:500 }}>{sub}</p>}
    </div>
  )
}

/* ─── DATA ──────────────────────────────────────────────────── */
const fresh: Vehicle[] = [
  { title:'Fendt 1050 Vario',        price:1800000, img:IMG.tractor1,  badge:'soukni',    category:'TRACTORS',  year:'2024' },
  { title:'John Deere 8R 410',       price:1350000, img:IMG.tractor2,  badge:'diamond',   category:'TRACTORS',  year:'2024' },
  { title:'Caterpillar 340 GC',      price:3800000, img:IMG.excavator, badge:'soukni',    category:'EXCAVATORS',year:'2024' },
  { title:'Komatsu D65EX Dozer',     price:1480000, img:IMG.dozer,     badge:'certified', category:'DOZERS',    year:'2024' },
]
const fleet: Vehicle[] = [
  { title:'Liebherr LTM 1100',       price:4200000, img:IMG.liebherr,  badge:'soukni',    category:'CRANES'   },
  { title:'Mercedes Arocs Mixer',    price:1350000, img:IMG.mixer,     badge:'diamond',   category:'MIXERS'   },
  { title:'Kalmar Reach Stacker',    price:2600000, img:IMG.roller,    badge:'soukni',    category:'FORKLIFTS'},
  { title:'JCB Telehandler',         price:580000,  img:IMG.jcb,       badge:'certified', category:'HANDLERS' },
]
const certifiedH: Vehicle[] = [
  { title:'New Holland CR11',        price:1400000, img:IMG.combine,   badge:'soukni',    category:'COMBINES' },
  { title:'Case IH Magnum 400',      price:1200000, img:IMG.case,      badge:'soukni',    category:'TRACTORS' },
  { title:'Toyota 32T Forklift',     price:165000,  img:IMG.toyota,    badge:'diamond',   category:'FORKLIFTS'},
  { title:'Jungheinrich Forklift',   price:270000,  img:IMG.jungheinrich,badge:'certified',category:'FORKLIFTS'},
]
const pro1: Vehicle[] = [
  { title:'Volvo FH16 750',          price:1400000, img:IMG.volvo,     badge:'diamond',   category:'TRUCKS'   },
  { title:'Scania 650S',             price:1100000, img:IMG.scania,    badge:'soukni',    category:'TRUCKS'   },
  { title:'IVECO S-Way CTM',         price:900000,  img:IMG.iveco,     badge:'soukni',    category:'TRUCKS'   },
  { title:'Goldhofer Trailer',       price:2200000, img:IMG.goldhofer, badge:'certified', category:'TRAILERS' },
]
const pro2: Vehicle[] = [
  { title:'Tadano Luxury Crane',     price:1400000, img:IMG.liebherr,  badge:'soukni',    category:'CRANES'   },
  { title:'Caterpillar 330 NC',      price:900000,  img:IMG.caterpillar,badge:'soukni',   category:'EXCAVATORS'},
  { title:'John Deere 8R 410',       price:1200000, img:IMG.jd,        badge:'diamond',   category:'TRACTORS' },
  { title:'Case IH Magnum 400',      price:880000,  img:IMG.caseW,     badge:'certified', category:'TRACTORS' },
]
const pro3: Vehicle[] = [
  { title:'Liebherr LTM Crane',      price:3800000, img:IMG.liebherr2, badge:'soukni',    category:'CRANES'   },
  { title:'New Holland CR11',        price:1500000, img:IMG.newH,      badge:'soukni',    category:'COMBINES' },
  { title:'Mercedes Arocs Mixer',    price:1100000, img:IMG.mercedesA, badge:'diamond',   category:'MIXERS'   },
  { title:'Toyota 32T Diesel',       price:195000,  img:IMG.toyotaD,   badge:'certified', category:'FORKLIFTS'},
]

const PILLS = ['ALL MACHINERY','HEAVY STENERS','TRACTORS','EXCAVATORS','FORKLIFTS','CRANES','AGRO MACHINERY']

export default function HeavyVehiclesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = React.use(params)
  const [pill, setPill]       = useState('ALL MACHINERY')
  const [seller, setSeller]   = useState('ALL SELLERS')
  const [diamond, setDiamond] = useState(true)
  const [page, setPage]       = useState(1)
  const [kw, setKw]           = useState('')

  return (
    <div style={{ ...UB, backgroundColor:C.surface, color:C.ink, minHeight:'100vh' }}>

      {/* ══ HERO ═══════════════════════════════════════════════ */}
      <section style={{ position:'relative', height:'420px', display:'flex', alignItems:'center', justifyContent:'center', overflow:'hidden' }}>
        <img src={IMG.hero} alt="Heavy Vehicles" style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover' }} />
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(to bottom, rgba(22,29,27,0.58) 0%, rgba(22,29,27,0.22) 65%, #f4fbf8 100%)' }} />
        <div style={{ position:'relative', zIndex:10, textAlign:'center' as const, maxWidth:'860px', padding:'0 24px', width:'100%' }}>
          <h1 style={{ fontSize:'clamp(32px,5vw,50px)', ...UB, color:'white', marginBottom:'32px', lineHeight:1.05, textShadow:'0 4px 24px rgba(0,0,0,0.4)' }}>
            New and Pre-Owned Heavy & Agro Vehicles in Rabat
          </h1>
          {/* transparent glassmorphic search */}
          <div style={{ backgroundColor:'rgba(255,255,255,0.14)', backdropFilter:'blur(16px)', border:'1px solid rgba(255,255,255,0.22)', borderRadius:'100px', padding:'8px', display:'flex', gap:'10px', alignItems:'center', maxWidth:'700px', margin:'0 auto' }}>
            <div style={{ flex:1, display:'flex', alignItems:'center', gap:'10px', backgroundColor:'rgba(255,255,255,0.12)', borderRadius:'100px', padding:'12px 20px' }}>
              <Search size={16} color="rgba(255,255,255,0.8)" />
              <input type="text" value={kw} onChange={e=>setKw(e.target.value)} placeholder="Search trucks, tractors, exc..."
                style={{ flex:1, background:'none', border:'none', outline:'none', color:'white', fontSize:'14px', ...UB, fontFamily:'Inter,sans-serif' }} />
            </div>
            <div style={{ display:'flex', alignItems:'center', gap:'6px', backgroundColor:'rgba(255,255,255,0.12)', borderRadius:'100px', padding:'12px 20px', cursor:'pointer' }}>
              <span style={{ fontSize:'13px', ...UB, color:'rgba(255,255,255,0.9)' }}>Rabat</span>
              <span style={{ color:'rgba(255,255,255,0.5)', fontSize:'12px' }}>▾</span>
            </div>
            <button style={{ backgroundColor:C.mint, color:C.ink, border:'none', padding:'13px 32px', borderRadius:'100px', fontSize:'11px', ...UB, textTransform:'uppercase' as const, letterSpacing:'0.12em', cursor:'pointer', flexShrink:0, transition:'filter 0.15s' }}
              onMouseEnter={e=>e.currentTarget.style.filter='brightness(1.08)'}
              onMouseLeave={e=>e.currentTarget.style.filter='brightness(1)'}
            >SEARCH</button>
          </div>
        </div>
      </section>

      {/* ══ TRANSPARENT FILTER BAR ═════════════════════════════ */}
      <div style={{ maxWidth:'1280px', margin:'-36px auto 36px', padding:'0 24px', position:'relative', zIndex:20 }}>
        <div style={{ backgroundColor:'rgba(255,255,255,0.38)', backdropFilter:'blur(20px)', border:'1px solid rgba(255,255,255,0.44)', borderRadius:'100px', boxShadow:'0 12px 40px rgba(0,0,0,0.08)', display:'flex', alignItems:'center', padding:'6px' }}>
          {[
            { label:'CITY',         val:'Rabat',                   flex:1   },
            { label:'TYPE',         val:'Tractors, Heavy Trucks...', flex:1.6 },
            { label:'CONDITION',    val:'New, Used, Certifie...',    flex:1.3 },
            { label:'PRICE (MAD)',  val:'Select Range',              flex:1   },
            { label:'SPECS',        val:'All Filters 🎚',            flex:1, btn:true },
          ].map((f,i,arr)=>(
            <div key={f.label} style={{ flex:f.flex, padding:'8px 20px', borderRight: i<arr.length-1?'1px solid rgba(255,255,255,0.4)':'none', cursor:'pointer' }}>
              <div style={{ fontSize:'8px', ...UB, textTransform:'uppercase' as const, letterSpacing:'0.14em', color:'rgba(22,29,27,0.55)', marginBottom:'3px' }}>{f.label}</div>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', gap:'6px' }}>
                <span style={{ fontSize:'13px', ...UB, color: f.btn?C.mint:C.ink, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' as const }}
                  
                >{f.val}</span>
                {!f.btn && <span style={{ color:C.mint, flexShrink:0, fontSize:'13px' }}>▾</span>}
              </div>
            </div>
          ))}
        </div>
      </div>

      <main style={{ maxWidth:'1280px', margin:'0 auto', padding:'0 24px 80px' }}>

        {/* ── BREADCRUMB ── */}
        <div style={{ marginBottom:'20px' }}>
          <nav style={{ display:'flex', alignItems:'center', gap:'6px', fontSize:'9px', ...UB, color:C.muted, textTransform:'uppercase' as const, letterSpacing:'0.14em', marginBottom:'14px' }}>
            {['Rabat','Heavy & Agro Vehicles'].map((c,i,arr)=>(
              <React.Fragment key={c}>
                <a href="#" style={{ color: i===arr.length-1 ? C.mint : C.muted, textDecoration:'none' }}>{c}</a>
                {i<arr.length-1 && <span style={{ opacity:0.4 }}>›</span>}
              </React.Fragment>
            ))}
          </nav>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', flexWrap:'wrap' as const, gap:'16px' }}>
            <h2 style={{ fontSize:'clamp(18px,2.5vw,26px)', ...UB, color:C.ink }}>INDUSTRIAL & AGRO MARKETPLACE RABAT</h2>
            <div style={{ display:'flex', gap:'10px' }}>
              {['SORT: DEFAULT','SAVE SEARCH 🔔'].map(b=>(
                <button key={b} style={{ backgroundColor:'white', border:'1px solid rgba(107,122,118,0.18)', padding:'9px 16px', borderRadius:'12px', fontSize:'9px', ...UB, textTransform:'uppercase' as const, letterSpacing:'0.1em', cursor:'pointer', color:C.ink, transition:'background 0.15s' }}
                  onMouseEnter={e=>e.currentTarget.style.backgroundColor=C.surface}
                  onMouseLeave={e=>e.currentTarget.style.backgroundColor='white'}
                >{b}</button>
              ))}
            </div>
          </div>
        </div>

        {/* ── SELLER TABS + PILLS ── */}
        <div style={{ display:'flex', gap:'8px', marginBottom:'16px', flexWrap:'wrap' as const }}>
          {['ALL SELLERS','SOUKNI MEMBERS','SOUKNI PRO'].map(tab=>(
            <button key={tab} onClick={()=>setSeller(tab)}
              style={{ padding:'10px 22px', borderRadius:'100px', fontSize:'9px', ...UB, textTransform:'uppercase' as const, letterSpacing:'0.1em', border:'none', cursor:'pointer', transition:'all 0.2s',
                backgroundColor: seller===tab ? C.mint : C.ink,
                color:           seller===tab ? C.ink  : 'white',
              }}
            >{tab}</button>
          ))}
        </div>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'16px', flexWrap:'wrap' as const, gap:'12px' }}>
          <div style={{ display:'flex', gap:'8px', overflowX:'auto' as const }}>
            {PILLS.map(p=>(
              <button key={p} onClick={()=>setPill(p)}
                style={{ whiteSpace:'nowrap' as const, padding:'9px 18px', borderRadius:'100px', fontSize:'9px', ...UB, textTransform:'uppercase' as const, letterSpacing:'0.1em', border:'1px solid', cursor:'pointer', transition:'all 0.2s',
                  backgroundColor: pill===p ? C.mint : 'white',
                  color:           pill===p ? C.ink  : C.muted,
                  borderColor:     pill===p ? C.mint : 'rgba(107,122,118,0.2)',
                }}
              >{p}</button>
            ))}
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:'10px', cursor:'pointer', flexShrink:0 }} onClick={()=>setDiamond(!diamond)}>
            <span style={{ fontSize:'9px', ...UB, color:C.muted, textTransform:'uppercase' as const, letterSpacing:'0.1em', whiteSpace:'nowrap' as const }}>SOUKNI DIAMOND CERTIFIED FIRST</span>
            <div style={{ width:'48px', height:'24px', borderRadius:'100px', backgroundColor: diamond?C.mint:'rgba(107,122,118,0.25)', position:'relative', transition:'background 0.25s' }}>
              <div style={{ position:'absolute', top:'3px', left: diamond?'27px':'3px', width:'18px', height:'18px', borderRadius:'50%', backgroundColor:C.ink, transition:'left 0.25s' }} />
            </div>
          </div>
        </div>

        {/* ── FRESH NEW LISTINGS ── */}
        <SectionHead title="FRESH NEW LISTINGS" sub="Latest high-performance machinery arrivals" />
        <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'16px', marginBottom:'56px' }}>
          {fresh.map((v,i)=><VehicleCard key={i} {...v} />)}
        </div>

        {/* ── INDUSTRIAL FLEET & SPECIAL EQUIPMENT ── */}
        <SectionHead title="INDUSTRIAL FLEET & SPECIAL EQUIPMENT" sub="Maximum capacity for large-scale operations" />
        <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'16px', marginBottom:'56px' }}>
          {fleet.map((v,i)=><VehicleCard key={i} {...v} />)}
        </div>

        {/* ── FEATURED CERTIFIED ── */}
        <SectionHead title="FEATURED SOUKNI CERTIFIED HEAVY VEHICLES" sub="Rigorous 150-point inspection for the industrial industry" />
        <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'16px', marginBottom:'56px' }}>
          {certifiedH.map((v,i)=><VehicleCard key={i} {...v} />)}
        </div>

        {/* ── INDUSTRIAL PRO BANNER ── */}
        <div style={{ position:'relative', borderRadius:'40px', overflow:'hidden', height:'340px', display:'flex', alignItems:'center', boxShadow:'0 24px 64px rgba(0,0,0,0.2)', marginBottom:'56px', cursor:'pointer' }}>
          <img src={IMG.indpro} alt="Industrial Pro" style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover', transition:'transform 0.7s' }}
            onMouseEnter={e=>e.currentTarget.style.transform='scale(1.04)'}
            onMouseLeave={e=>e.currentTarget.style.transform='scale(1)'}
          />
          <div style={{ position:'absolute', inset:0, backgroundColor:'rgba(22,29,27,0.62)' }} />
          <div style={{ position:'relative', zIndex:1, padding:'0 64px', maxWidth:'560px' }}>
            <h2 style={{ fontSize:'clamp(28px,3.5vw,42px)', ...UB, color:'white', marginBottom:'12px', lineHeight:1.05, textTransform:'uppercase' as const }}>SOUKNI INDUSTRIAL PRO</h2>
            <p style={{ fontSize:'17px', color:'rgba(255,255,255,0.8)', marginBottom:'28px', lineHeight:1.5 }}>The Ultimate Gold Standard for Industrial Fleet Procurement</p>
            <button style={{ backgroundColor:C.mint, color:C.ink, border:'none', padding:'16px 40px', borderRadius:'100px', fontSize:'10px', ...UB, textTransform:'uppercase' as const, letterSpacing:'0.12em', cursor:'pointer', transition:'transform 0.2s', boxShadow:`0 8px 24px ${C.mint}40` }}
              onMouseEnter={e=>e.currentTarget.style.transform='scale(1.04)'}
              onMouseLeave={e=>e.currentTarget.style.transform='scale(1)'}
            >EXPLORE PRO BENEFITS</button>
          </div>
        </div>

        {/* ── SOUKNI INDUSTRIAL PRO CHOICES ── */}
        <SectionHead title="SOUKNI INDUSTRIAL PRO CHOICES" />
        {[pro1, pro2, pro3].map((row,ri)=>(
          <div key={ri} style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'16px', marginBottom:'16px' }}>
            {row.map((v,j)=><VehicleCard key={j} {...v} />)}
          </div>
        ))}

        {/* ── DIAMOND CERTIFIED BANNER ── */}
        <div style={{ position:'relative', borderRadius:'40px', overflow:'hidden', padding:'56px 64px', display:'flex', alignItems:'center', justifyContent:'space-between', gap:'32px', marginTop:'32px', marginBottom:'48px', boxShadow:'0 16px 48px rgba(0,0,0,0.22)', flexWrap:'wrap' as const, minHeight:'280px' }}>
          <img src={IMG.hero} alt="bg" style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover', opacity:0.18 }} />
          <div style={{ position:'absolute', inset:0, backgroundColor:'rgba(22,29,27,0.88)' }} />
          {/* mint decoration circles */}
          <div style={{ position:'absolute', right:'-40px', bottom:'-40px', width:'280px', height:'280px', backgroundColor:`${C.mint}14`, borderRadius:'50%' }} />
          <div style={{ position:'absolute', right:'100px', top:'-60px', width:'180px', height:'180px', backgroundColor:`${C.mint}0a`, borderRadius:'50%' }} />
          <div style={{ position:'relative', zIndex:1, maxWidth:'520px' }}>
            <div style={{ display:'flex', gap:'10px', marginBottom:'20px', flexWrap:'wrap' as const }}>
              <span style={{ backgroundColor:C.mint, color:C.ink, fontSize:'9px', ...UB, padding:'5px 14px', borderRadius:'6px', textTransform:'uppercase' as const, letterSpacing:'0.1em', display:'flex', alignItems:'center', gap:'5px' }}>◆ EXCLUSIVE STATUS</span>
            </div>
            <h2 style={{ fontSize:'clamp(24px,3.5vw,38px)', ...UB, color:'white', marginBottom:'14px', lineHeight:1.05, textTransform:'uppercase' as const }}>BECOME A SOUKNI<br/>DIAMOND CERTIFIED<br/>MEMBER</h2>
            <p style={{ fontSize:'15px', color:'rgba(255,255,255,0.6)', lineHeight:1.65, maxWidth:'400px' }}>Unlock exclusive marketplace features for heavy machinery alerts and industrial rental providers.</p>
          </div>
          <button style={{ position:'relative', zIndex:1, backgroundColor:C.mint, color:C.ink, border:'none', padding:'18px 44px', borderRadius:'100px', fontSize:'10px', ...UB, textTransform:'uppercase' as const, letterSpacing:'0.12em', cursor:'pointer', boxShadow:`0 8px 24px ${C.mint}40`, transition:'transform 0.2s', whiteSpace:'nowrap' as const }}
            onMouseEnter={e=>e.currentTarget.style.transform='scale(1.04)'}
            onMouseLeave={e=>e.currentTarget.style.transform='scale(1)'}
          >GET CERTIFIED NOW</button>
        </div>

        {/* ── PAGINATION ── */}
        <div style={{ display:'flex', justifyContent:'center', alignItems:'center', gap:'10px', marginBottom:'80px' }}>
          <button style={{ width:'44px', height:'44px', borderRadius:'12px', backgroundColor:'white', border:'1px solid rgba(107,122,118,0.12)', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', color:C.muted, transition:'all 0.2s' }}
            onMouseEnter={e=>{e.currentTarget.style.backgroundColor=C.mint;e.currentTarget.style.color=C.ink}}
            onMouseLeave={e=>{e.currentTarget.style.backgroundColor='white';e.currentTarget.style.color=C.muted}}
          ><ChevronLeft size={18} /></button>
          {[1,2,3].map(p=>(
            <button key={p} onClick={()=>setPage(p)}
              style={{ width:'44px', height:'44px', borderRadius:'12px', cursor:'pointer', fontSize:'15px', ...UB, border:'1px solid', transition:'all 0.2s',
                backgroundColor: page===p ? C.mint : 'white',
                color:           page===p ? C.ink  : C.muted,
                borderColor:     page===p ? C.mint : 'rgba(107,122,118,0.12)',
              }}
            >{p}</button>
          ))}
          <span style={{ color:C.muted, padding:'0 4px' }}>…</span>
          <button style={{ width:'44px', height:'44px', borderRadius:'12px', backgroundColor:'white', border:'1px solid rgba(107,122,118,0.12)', cursor:'pointer', fontSize:'15px', ...UB, color:C.muted }}>7</button>
          <button style={{ width:'44px', height:'44px', borderRadius:'12px', backgroundColor:'white', border:'1px solid rgba(107,122,118,0.12)', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', color:C.muted, transition:'all 0.2s' }}
            onMouseEnter={e=>{e.currentTarget.style.backgroundColor=C.mint;e.currentTarget.style.color=C.ink}}
            onMouseLeave={e=>{e.currentTarget.style.backgroundColor='white';e.currentTarget.style.color=C.muted}}
          ><ChevronRight size={18} /></button>
        </div>

        {/* ── JOIN SOUKNI FAMILY ── */}
        <div style={{ backgroundColor:C.mint, borderRadius:'40px', padding:'56px 64px', display:'flex', alignItems:'center', justifyContent:'space-between', gap:'48px', position:'relative' as const, overflow:'hidden', flexWrap:'wrap' as const, boxShadow:`0 16px 48px ${C.mint}40` }}>
          <div style={{ position:'absolute', right:'-60px', bottom:'-60px', width:'300px', height:'300px', backgroundColor:'rgba(22,29,27,0.1)', borderRadius:'50%' }} />
          <div style={{ position:'relative', zIndex:1, maxWidth:'520px' }}>
            <h2 style={{ fontSize:'clamp(26px,3.5vw,38px)', ...UB, color:C.ink, marginBottom:'14px', lineHeight:1.05, textTransform:'uppercase' as const }}>JOIN THE SOUKNI FAMILY</h2>
            <p style={{ fontSize:'16px', color:`${C.ink}b3`, marginBottom:'32px', lineHeight:1.6 }}>Download our premium marketplace for real-time heavy machinery alerts and industrial marketplace deals.</p>
            <div style={{ display:'flex', flexDirection:'column' as const, gap:'12px' }}>
              {[{pre:'APPLE_',label:'App Store'},{pre:'PLAY_',label:'Google Play'}].map(app=>(
                <button key={app.label} style={{ height:'52px', minWidth:'200px', width:'fit-content', backgroundColor:C.ink, color:'white', border:'none', borderRadius:'14px', fontSize:'11px', ...UB, textTransform:'uppercase' as const, letterSpacing:'0.1em', cursor:'pointer', transition:'transform 0.15s', padding:'0 32px', display:'flex', alignItems:'center', gap:'10px' }}
                  onMouseEnter={e=>e.currentTarget.style.transform='scale(1.04)'}
                  onMouseLeave={e=>e.currentTarget.style.transform='scale(1)'}
                >
                  <span style={{ color:C.mint }}>{app.pre}</span> {app.label}
                </button>
              ))}
            </div>
          </div>
          {/* phone mockup */}
          <div style={{ position:'relative', zIndex:1, width:'200px', aspectRatio:'9/17', backgroundColor:C.ink, borderRadius:'40px', border:'6px solid rgba(255,255,255,0.2)', overflow:'hidden', boxShadow:'0 32px 80px rgba(0,0,0,0.28)', flexShrink:0 }}>
            <div style={{ width:'100%', height:'100%', display:'flex', flexDirection:'column' as const, alignItems:'center', justifyContent:'center', gap:'12px', padding:'24px' }}>
              <div style={{ width:'48px', height:'48px', borderRadius:'50%', backgroundColor:`${C.mint}22`, display:'flex', alignItems:'center', justifyContent:'center' }}>
                <span style={{ fontSize:'24px' }}>⬇</span>
              </div>
              {[1,2,3].map(n=>(
                <div key={n} style={{ width:'100%', height:'28px', backgroundColor:`${C.mint}18`, borderRadius:'8px' }} />
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* ══ FOOTER ═════════════════════════════════════════════ */}
      <footer style={{ backgroundColor:C.ink, color:'white', padding:'80px 24px 48px' }}>
        <div style={{ maxWidth:'1280px', margin:'0 auto' }}>
          {/* Industry updates strip */}
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'64px', padding:'28px 40px', backgroundColor:'rgba(255,255,255,0.04)', borderRadius:'20px', border:'1px solid rgba(255,255,255,0.08)', flexWrap:'wrap' as const, gap:'20px' }}>
            <div>
              <p style={{ fontSize:'9px', ...UB, color:C.muted, textTransform:'uppercase' as const, letterSpacing:'0.14em', marginBottom:'6px' }}>INDUSTRY UPDATES</p>
              <h4 style={{ fontSize:'18px', ...UB, color:'white' }}>Industrial Marketplace Rabat</h4>
            </div>
            <div style={{ display:'flex', gap:'12px', alignItems:'center' }}>
              <input type="email" placeholder="Enter your email" style={{ backgroundColor:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.12)', borderRadius:'12px', padding:'12px 20px', color:'white', fontSize:'13px', ...UB, fontFamily:'Inter,sans-serif', outline:'none', width:'260px' }} />
              <button style={{ backgroundColor:C.mint, color:C.ink, border:'none', padding:'13px 28px', borderRadius:'12px', fontSize:'10px', ...UB, textTransform:'uppercase' as const, letterSpacing:'0.12em', cursor:'pointer', whiteSpace:'nowrap' as const }}>SUBSCRIBE</button>
            </div>
          </div>

          {/* Main footer grid */}
          <div style={{ display:'grid', gridTemplateColumns:'1.4fr 1fr 1fr 1fr 1fr 1fr', gap:'36px', marginBottom:'64px' }}>
            <div>
              <div style={{ fontSize:'26px', ...UB, color:C.mint, marginBottom:'16px' }}>SouKni</div>
              <p style={{ fontSize:'9px', ...UB, color:C.muted, textTransform:'uppercase' as const, letterSpacing:'0.1em', lineHeight:1.9, maxWidth:'220px', marginBottom:'24px', opacity:0.75 }}>The Market in your Pocket</p>
              <div style={{ display:'flex', gap:'10px', marginBottom:'12px' }}>
                {['FB','IG','X'].map(s=>(
                  <div key={s} style={{ width:'34px', height:'34px', borderRadius:'50%', backgroundColor:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.1)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'9px', ...UB, color:C.muted, cursor:'pointer', transition:'all 0.2s' }}
                    onMouseEnter={e=>{(e.currentTarget as HTMLDivElement).style.backgroundColor=C.mint;(e.currentTarget as HTMLDivElement).style.color=C.ink}}
                    onMouseLeave={e=>{(e.currentTarget as HTMLDivElement).style.backgroundColor='rgba(255,255,255,0.06)';(e.currentTarget as HTMLDivElement).style.color=C.muted}}
                  >{s}</div>
                ))}
              </div>
            </div>
            {[
              { title:'MARKETPLACE', links:['Real Estate','Motors','Jobs','Services','The Vault'] },
              { title:'COMPANY',     links:['About Us','Careers','Legal'] },
              { title:'SUPPORT',     links:['Help Center','Safety Tips','Advertising'] },
              { title:'RESOURCES',   links:['Industry Tracker','Machinery Blog'] },
              { title:'APP DOWNLOADS', links:['__APP__'] },
            ].map(col=>(
              <div key={col.title}>
                <h5 style={{ fontSize:'9px', ...UB, color:C.mint, textTransform:'uppercase' as const, letterSpacing:'0.15em', marginBottom:'24px' }}>{col.title}</h5>
                {col.title === 'APP DOWNLOADS'
                  ? (
                    <div style={{ display:'flex', flexDirection:'column' as const, gap:'10px' }}>
                      {['APPLE_  App Store','PLAY_   Google Play'].map(app=>(
                        <div key={app} style={{ backgroundColor:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.1)', borderRadius:'10px', padding:'10px 14px', fontSize:'9px', ...UB, color:'white', textTransform:'uppercase' as const, letterSpacing:'0.1em', cursor:'pointer' }}>{app}</div>
                      ))}
                    </div>
                  )
                  : col.links.map(link=>(
                    <a key={link} href="#" style={{ display:'block', fontSize:'9px', ...UB, color:C.muted, textTransform:'uppercase' as const, letterSpacing:'0.1em', textDecoration:'none', marginBottom:'14px', transition:'color 0.15s' }}
                      onMouseEnter={e=>e.currentTarget.style.color=C.mint}
                      onMouseLeave={e=>e.currentTarget.style.color=C.muted}
                    >{link}</a>
                  ))
                }
              </div>
            ))}
          </div>
          <div style={{ borderTop:'1px solid rgba(255,255,255,0.06)', paddingTop:'28px', display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap' as const, gap:'12px' }}>
            <p style={{ fontSize:'9px', ...UB, color:C.muted, textTransform:'uppercase' as const, letterSpacing:'0.2em', opacity:0.4 }}>© 2026 SOUKNI MOROCCO</p>
            <div style={{ display:'flex', gap:'24px' }}>
              {['PRIVACY POLICY','TERMS','SITEMAP'].map(link=>(
                <a key={link} href="#" style={{ fontSize:'9px', ...UB, color:C.muted, textTransform:'uppercase' as const, letterSpacing:'0.14em', textDecoration:'none', opacity:0.4, transition:'opacity 0.15s' }}
                  onMouseEnter={e=>e.currentTarget.style.opacity='1'}
                  onMouseLeave={e=>e.currentTarget.style.opacity='0.4'}
                >{link}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
