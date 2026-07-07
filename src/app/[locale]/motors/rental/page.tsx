'use client'

import { useState } from 'react'
import React from 'react'
import { Heart, Search, MapPin, ChevronLeft, ChevronRight } from 'lucide-react'

const C = {
  mint:    '#22d4a8',
  ink:     '#161d1b',
  surface: '#f4fbf8',
  cream:   '#f5ede0',
  muted:   '#6b7a76',
}
const UB: React.CSSProperties  = { fontFamily:'Inter,sans-serif',            fontWeight:900, letterSpacing:'-0.05em' }
const CB: React.CSSProperties  = { fontFamily:"'Hanken Grotesk',sans-serif", fontWeight:900, letterSpacing:'-0.03em' }

const IMGS = {
  hero:       'https://images.pexels.com/photos/3764984/pexels-photo-3764984.jpeg?auto=compress&w=1600',
  range1:     'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&w=600',
  merc1:      'https://images.pexels.com/photos/3764984/pexels-photo-3764984.jpeg?auto=compress&w=600',
  tesla:      'https://images.pexels.com/photos/1035108/pexels-photo-1035108.jpeg?auto=compress&w=600',
  porsche:    'https://images.pexels.com/photos/2127039/pexels-photo-2127039.jpeg?auto=compress&w=600',
  volvo:      'https://images.pexels.com/photos/1149831/pexels-photo-1149831.jpeg?auto=compress&w=600',
  maserati:   'https://images.pexels.com/photos/337909/pexels-photo-337909.jpeg?auto=compress&w=600',
  defender:   'https://images.pexels.com/photos/1638459/pexels-photo-1638459.jpeg?auto=compress&w=600',
  audi1:      'https://images.pexels.com/photos/1007410/pexels-photo-1007410.jpeg?auto=compress&w=600',
  bmw1:       'https://images.pexels.com/photos/892522/pexels-photo-892522.jpeg?auto=compress&w=600',
  ferrari:    'https://images.pexels.com/photos/337909/pexels-photo-337909.jpeg?auto=compress&w=600',
  bentley:    'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&w=600',
  lambo:      'https://images.pexels.com/photos/2127039/pexels-photo-2127039.jpeg?auto=compress&w=600',
  rolls:      'https://images.pexels.com/photos/3764984/pexels-photo-3764984.jpeg?auto=compress&w=600',
  mclaren:    'https://images.pexels.com/photos/1149831/pexels-photo-1149831.jpeg?auto=compress&w=600',
  cayenne:    'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&w=600',
  motpro:     'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&w=1200',
  phone:      'https://images.pexels.com/photos/3764984/pexels-photo-3764984.jpeg?auto=compress&w=400',
}

type BadgeT = 'soukni'|'diamond'|'certified'
function CardBadge({ type }: { type: BadgeT }) {
  const map: Record<BadgeT,{bg:string;color:string;label:string}> = {
    soukni:    { bg:C.mint,  color:C.ink,  label:'SOUKNI CERTIFIED' },
    diamond:   { bg:C.ink,   color:C.mint, label:'◆ DIAMOND MEMBER' },
    certified: { bg:C.mint,  color:C.ink,  label:'SouKni Certified'  },
  }
  const s = map[type]
  return (
    <span style={{ backgroundColor:s.bg, color:s.color, fontSize:'8px', ...CB, padding:'4px 10px', borderRadius:'6px', textTransform:'uppercase' as const, letterSpacing:'0.08em', display:'inline-block', boxShadow:'0 2px 6px rgba(0,0,0,0.15)', whiteSpace:'nowrap' as const }}>
      {s.label}
    </span>
  )
}

interface Car { title:string; price:number; period?:string; img:string; badge:BadgeT; seats?:number; fuel?:string; location?:string }

function RentalCard({ title, price, period='/ Day', img, badge, seats, fuel, location }: Car) {
  const [hov, setHov] = useState(false)
  const [saved, setSaved] = useState(false)
  return (
    <article onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{ backgroundColor:'white', borderRadius:'28px', border:`1px solid ${hov?C.mint:'rgba(107,122,118,0.12)'}`, overflow:'hidden', boxShadow:hov?`0 16px 40px ${C.mint}20`:'0 2px 8px rgba(0,0,0,0.04)', transition:'all 0.3s', cursor:'pointer', display:'flex', flexDirection:'column' as const }}>
      <div style={{ position:'relative', aspectRatio:'16/10', overflow:'hidden', backgroundColor:C.cream }}>
        <img src={img} alt={title} style={{ width:'100%', height:'100%', objectFit:'cover', transition:'transform 0.6s', transform:hov?'scale(1.06)':'scale(1)' }} />
        <div style={{ position:'absolute', top:'12px', left:'12px', zIndex:10 }}><CardBadge type={badge} /></div>
        <button onClick={e=>{e.stopPropagation();setSaved(!saved)}} style={{ position:'absolute', top:'10px', right:'10px', zIndex:10, width:'32px', height:'32px', borderRadius:'50%', backgroundColor:'rgba(255,255,255,0.82)', backdropFilter:'blur(8px)', border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}>
          <Heart size={14} fill={saved?'#ef4444':'none'} color={saved?'#ef4444':C.muted} />
        </button>
      </div>
      <div style={{ padding:'18px 20px', flex:1, display:'flex', flexDirection:'column' as const }}>
        <h4 style={{ fontSize:'14px', ...CB, color:hov?C.mint:C.ink, transition:'color 0.2s', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' as const, marginBottom:'4px' }}>{title}</h4>
        <p style={{ fontSize:'18px', ...CB, color:C.mint, marginBottom:'8px' }}>MAD {price.toLocaleString()} <span style={{ fontSize:'11px', fontWeight:400, color:C.muted }}>{period}</span></p>
        {(seats||fuel||location) && (
          <div style={{ display:'flex', gap:'12px', marginBottom:'14px', flexWrap:'wrap' as const }}>
            {seats    && <span style={{ fontSize:'10px', ...CB, color:C.muted }}>👥 {seats} Seats</span>}
            {fuel     && <span style={{ fontSize:'10px', ...CB, color:C.muted }}>⛽ {fuel}</span>}
            {location && <span style={{ fontSize:'10px', ...CB, color:C.muted }}>📍 {location}</span>}
          </div>
        )}
        <div style={{ marginTop:'auto', display:'flex', gap:'8px', paddingTop:'14px', borderTop:'1px solid rgba(107,122,118,0.08)' }}>
          <button style={{ flex:1, border:`2px solid ${C.ink}`, color:C.ink, backgroundColor:'transparent', padding:'10px', borderRadius:'14px', fontSize:'10px', ...CB, textTransform:'uppercase' as const, cursor:'pointer', transition:'all 0.15s' }}
            onMouseEnter={e=>{e.currentTarget.style.backgroundColor=C.ink;e.currentTarget.style.color='white'}}
            onMouseLeave={e=>{e.currentTarget.style.backgroundColor='transparent';e.currentTarget.style.color=C.ink}}
          >CHAT</button>
          <button style={{ flex:1, backgroundColor:C.mint, color:C.ink, border:'none', padding:'10px', borderRadius:'14px', fontSize:'10px', ...CB, textTransform:'uppercase' as const, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', gap:'4px', transition:'filter 0.15s' }}
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
      <h3 style={{ fontSize:'clamp(16px,2vw,20px)', ...UB, color:C.ink, textTransform:'uppercase' as const, marginBottom:sub?'6px':'0' }}>{title}</h3>
      {sub && <p style={{ fontSize:'13px', color:C.muted, fontFamily:'Inter,sans-serif', fontWeight:500 }}>{sub}</p>}
    </div>
  )
}

const fresh: Car[] = [
  { title:'2024 Range Rover Velar',     price:2500, img:IMGS.range1,  badge:'soukni',    seats:5, fuel:'Hybrid',   location:'Agdal'    },
  { title:'2024 Mercedes-Benz S-Class', price:3100, img:IMGS.merc1,   badge:'diamond',   seats:5, fuel:'Petrol',   location:'Souissi'  },
  { title:'2024 Tesla Model 3 Plus',    price:1800, img:IMGS.tesla,   badge:'soukni',    seats:5, fuel:'Electric', location:'Hay Riad' },
  { title:'2024 Porsche Cayenne Coupe', price:4200, img:IMGS.porsche, badge:'certified', seats:5, fuel:'Petrol',   location:'Centre'   },
]
const exec: Car[] = [
  { title:'2024 Volvo XC',             price:1400, img:IMGS.volvo,    badge:'soukni',    seats:5, fuel:'Hybrid'  },
  { title:'2024 Maserati Ghibli',      price:2600, img:IMGS.maserati, badge:'diamond',   seats:5, fuel:'Petrol'  },
  { title:'2024 Land Rover Defender',  price:2800, img:IMGS.defender, badge:'soukni',    seats:7, fuel:'Diesel'  },
  { title:'2024 Audi 5E',              price:1600, img:IMGS.audi1,    badge:'certified', seats:5, fuel:'Electric'},
]
const certified: Car[] = [
  { title:'2024 Mercedes-Benz S-Class',price:3100, img:IMGS.merc1,    badge:'soukni',    seats:5, fuel:'Petrol' },
  { title:'2024 Range Rover Atlas',    price:3800, img:IMGS.range1,   badge:'soukni',    seats:5, fuel:'Hybrid' },
  { title:'2024 Porsche Cayenne Coupe',price:4200, img:IMGS.porsche,  badge:'diamond',   seats:5, fuel:'Petrol' },
  { title:'2024 Land Rover Defender',  price:2800, img:IMGS.defender, badge:'certified', seats:7, fuel:'Diesel' },
]
const pro1: Car[] = [
  { title:'2026 Ferrari Panamera',     price:12000, img:IMGS.ferrari,  badge:'diamond',   fuel:'Petrol' },
  { title:'2026 Rolls-Royce Cullinan', price:16500, img:IMGS.rolls,    badge:'soukni',    fuel:'Petrol' },
  { title:'2026 Lamborghini Urus S',   price:9500,  img:IMGS.lambo,    badge:'soukni',    fuel:'Petrol' },
  { title:'2026 Bentley Bentayga EWB', price:8000,  img:IMGS.bentley,  badge:'certified', fuel:'Hybrid' },
]
const pro2: Car[] = [
  { title:'2026 Aston Martin DB12',    price:7000, img:IMGS.maserati, badge:'soukni',    fuel:'Petrol' },
  { title:'2026 Maserati MC20',        price:5500, img:IMGS.merc1,    badge:'soukni',    fuel:'Petrol' },
  { title:'2026 McLaren Artura',       price:6800, img:IMGS.mclaren,  badge:'diamond',   fuel:'Hybrid' },
  { title:'2026 BMW X8',               price:4900, img:IMGS.bmw1,     badge:'certified', fuel:'Petrol' },
]
const pro3: Car[] = [
  { title:'2026 Audi RS Etron GT',     price:3700, img:IMGS.audi1,    badge:'soukni',    fuel:'Electric'},
  { title:'2026 Land Rover Defender',  price:2800, img:IMGS.defender, badge:'soukni',    fuel:'Diesel'  },
  { title:'2026 Porsche 911 Turbo S',  price:7800, img:IMGS.porsche,  badge:'diamond',   fuel:'Petrol'  },
  { title:'2026 Rolls-Royce Phantom',  price:6000, img:IMGS.rolls,    badge:'soukni',    fuel:'Petrol'  },
]
const after1: Car[] = [
  { title:'2024 Mercedes-Benz S-Class',price:3100, img:IMGS.merc1,   badge:'diamond',   fuel:'Petrol'   },
  { title:'2024 Audi A8 L',            price:2400, img:IMGS.audi1,   badge:'soukni',    fuel:'Petrol'   },
  { title:'2024 Tesla Model S Plaid',  price:2700, img:IMGS.tesla,   badge:'soukni',    fuel:'Electric' },
  { title:'2024 Lamborghini Urus S',   price:9500, img:IMGS.lambo,   badge:'diamond',   fuel:'Petrol'   },
]
const after2: Car[] = [
  { title:'2024 Bentley Bentayga EWB', price:8200, img:IMGS.bentley, badge:'soukni',    fuel:'Hybrid' },
  { title:'2024 Porsche Cayenne Coupe',price:4200, img:IMGS.cayenne, badge:'diamond',   fuel:'Petrol' },
  { title:'2024 Ferrari Portofino',    price:11000,img:IMGS.ferrari,  badge:'soukni',    fuel:'Petrol' },
  { title:'2024 Rolls-Royce Cullinan', price:16500,img:IMGS.rolls,   badge:'certified', fuel:'Petrol' },
]

const PILLS = ['ALL VEHICLES','SEDAN','SUV','CONVERTIBLE','LUXURY','UTILITY','PREMIUM']

export default function CarRentalPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = React.use(params)
  const [pill, setPill]       = useState('ALL VEHICLES')
  const [diamond, setDiamond] = useState(true)
  const [page, setPage]       = useState(1)
  const [kw, setKw]           = useState('')

  return (
    <div style={{ ...UB, backgroundColor:C.surface, color:C.ink, minHeight:'100vh' }}>

      {/* ── HERO ── */}
      <section style={{ position:'relative', height:'400px', display:'flex', alignItems:'center', justifyContent:'center', overflow:'hidden' }}>
        <img src={IMGS.hero} alt="Cars" style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover' }} />
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(to bottom, rgba(22,29,27,0.55) 0%, rgba(22,29,27,0.2) 60%, #f4fbf8 100%)' }} />
        <div style={{ position:'relative', zIndex:10, textAlign:'center' as const, maxWidth:'820px', padding:'0 24px', width:'100%' }}>
          <h1 style={{ fontSize:'clamp(34px,5.5vw,52px)', ...UB, color:'white', marginBottom:'32px', lineHeight:1, textShadow:'0 4px 24px rgba(0,0,0,0.4)' }}>Premium Car Rentals in Rabat</h1>
          <div style={{ backgroundColor:'rgba(255,255,255,0.16)', backdropFilter:'blur(16px)', border:'1px solid rgba(255,255,255,0.24)', borderRadius:'100px', padding:'8px', display:'flex', gap:'10px', alignItems:'center', maxWidth:'680px', margin:'0 auto' }}>
            <div style={{ flex:1, display:'flex', alignItems:'center', gap:'10px', backgroundColor:'rgba(255,255,255,0.14)', borderRadius:'100px', padding:'12px 22px' }}>
              <Search size={17} color="rgba(255,255,255,0.8)" />
              <input type="text" value={kw} onChange={e=>setKw(e.target.value)} placeholder="Search premium cars, SUV…"
                style={{ flex:1, background:'none', border:'none', outline:'none', color:'white', fontSize:'14px', ...UB, fontFamily:'Inter,sans-serif' }} />
            </div>
            <div style={{ display:'flex', alignItems:'center', gap:'8px', backgroundColor:'rgba(255,255,255,0.14)', borderRadius:'100px', padding:'12px 22px', cursor:'pointer' }}>
              <span style={{ fontSize:'13px', ...UB, color:'rgba(255,255,255,0.9)' }}>Rabat</span>
              <span style={{ color:'rgba(255,255,255,0.5)', fontSize:'12px' }}>▾</span>
            </div>
            <button style={{ backgroundColor:C.mint, color:C.ink, border:'none', padding:'14px 36px', borderRadius:'100px', fontSize:'11px', ...UB, textTransform:'uppercase' as const, letterSpacing:'0.12em', cursor:'pointer', flexShrink:0, transition:'filter 0.15s' }}
              onMouseEnter={e=>e.currentTarget.style.filter='brightness(1.08)'}
              onMouseLeave={e=>e.currentTarget.style.filter='brightness(1)'}
            >SEARCH</button>
          </div>
        </div>
      </section>

      {/* ── FILTER BAR ── */}
      <div style={{ maxWidth:'1280px', margin:'-36px auto 40px', padding:'0 24px', position:'relative', zIndex:20 }}>
        <div style={{ backgroundColor:'rgba(255,255,255,0.92)', backdropFilter:'blur(16px)', border:'1px solid rgba(107,122,118,0.12)', borderRadius:'100px', boxShadow:'0 12px 40px rgba(0,0,0,0.08)', display:'flex', alignItems:'center', padding:'6px' }}>
          {[
            { label:'CITY',          val:'Rabat',               flex:1   },
            { label:'RENTAL PERIOD', val:'Daily, Monthly...',   flex:1.3 },
            { label:'TYPE',          val:'SUVs, Sedans, Lux…',  flex:1.3 },
            { label:'PRICE (MAD)',   val:'Select Range',         flex:1   },
            { label:'SPECS',         val:'Select Range',         flex:1   },
          ].map((f,i,arr)=>(
            <div key={f.label} style={{ flex:f.flex, padding:'8px 20px', borderRight: i<arr.length-1?'1px solid rgba(107,122,118,0.12)':'none', cursor:'pointer' }}>
              <div style={{ fontSize:'8px', ...UB, textTransform:'uppercase' as const, letterSpacing:'0.14em', color:C.muted, marginBottom:'3px' }}>{f.label}</div>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', gap:'6px' }}>
                <span style={{ fontSize:'13px', ...UB, color:C.ink, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' as const }}>{f.val}</span>
                <span style={{ color:C.mint, flexShrink:0, fontSize:'13px' }}>▾</span>
              </div>
            </div>
          ))}
          <div style={{ padding:'6px 10px' }}>
            <button style={{ backgroundColor:C.mint, color:C.ink, border:'none', padding:'12px 24px', borderRadius:'100px', fontSize:'10px', ...UB, textTransform:'uppercase' as const, letterSpacing:'0.1em', cursor:'pointer' }}>ALL FILTERS 🎚</button>
          </div>
        </div>
      </div>

      <main style={{ maxWidth:'1280px', margin:'0 auto', padding:'0 24px 80px' }}>

        {/* ── BREADCRUMB + HEADING ── */}
        <div style={{ marginBottom:'24px' }}>
          <nav style={{ display:'flex', alignItems:'center', gap:'6px', fontSize:'9px', ...UB, color:C.muted, textTransform:'uppercase' as const, letterSpacing:'0.14em', marginBottom:'16px' }}>
            {['Rabat','Motors','Car Rental'].map((c,i,arr)=>(
              <React.Fragment key={c}>
                <a href="#" style={{ color: i===arr.length-1 ? C.mint : C.muted, textDecoration:'none' }}>{c}</a>
                {i<arr.length-1 && <span style={{ opacity:0.4 }}>›</span>}
              </React.Fragment>
            ))}
          </nav>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', flexWrap:'wrap' as const, gap:'16px' }}>
            <div>
              <h2 style={{ fontSize:'clamp(20px,2.5vw,28px)', ...UB, color:C.ink, marginBottom:'4px' }}>Premium Car Rentals in Rabat</h2>
              <span style={{ fontSize:'12px', ...UB, color:C.muted }}>1,992 LISTINGS</span>
            </div>
            <div style={{ display:'flex', gap:'10px' }}>
              {['SORT: POPULAR','SAVE SEARCH 🔔'].map(b=>(
                <button key={b} style={{ backgroundColor:'white', border:'1px solid rgba(107,122,118,0.18)', padding:'10px 18px', borderRadius:'14px', fontSize:'9px', ...UB, textTransform:'uppercase' as const, letterSpacing:'0.1em', cursor:'pointer', color:C.ink, transition:'background 0.15s' }}
                  onMouseEnter={e=>e.currentTarget.style.backgroundColor=C.surface}
                  onMouseLeave={e=>e.currentTarget.style.backgroundColor='white'}
                >{b}</button>
              ))}
            </div>
          </div>
        </div>

        {/* ── PILLS ── */}
        <div style={{ display:'flex', gap:'10px', overflowX:'auto' as const, paddingBottom:'6px', marginBottom:'20px' }}>
          {PILLS.map(p=>(
            <button key={p} onClick={()=>setPill(p)}
              style={{ whiteSpace:'nowrap' as const, padding:'12px 24px', borderRadius:'100px', fontSize:'9px', ...UB, textTransform:'uppercase' as const, letterSpacing:'0.12em', border:'none', cursor:'pointer', transition:'all 0.2s',
                backgroundColor: pill===p ? C.mint : C.ink,
                color:           pill===p ? C.ink  : 'white',
              }}
            >{p}</button>
          ))}
        </div>

        {/* ── DIAMOND TOGGLE ── */}
        <div style={{ display:'flex', justifyContent:'flex-end', alignItems:'center', gap:'12px', marginBottom:'40px', padding:'14px 20px', backgroundColor:'white', borderRadius:'18px', border:'1px solid rgba(107,122,118,0.1)' }}>
          <span style={{ fontSize:'9px', ...UB, color:C.muted, textTransform:'uppercase' as const, letterSpacing:'0.12em' }}>SHOW SOUKNI DIAMOND CERTIFIED FIRST</span>
          <div style={{ width:'52px', height:'26px', borderRadius:'100px', backgroundColor: diamond?C.mint:'rgba(107,122,118,0.25)', position:'relative', transition:'background 0.25s', cursor:'pointer' }} onClick={()=>setDiamond(!diamond)}>
            <div style={{ position:'absolute', top:'3px', left: diamond?'29px':'3px', width:'20px', height:'20px', borderRadius:'50%', backgroundColor:C.ink, transition:'left 0.25s' }} />
          </div>
        </div>

        {/* ── FRESH NEW LISTINGS ── */}
        <SectionHead title="FRESH NEW LISTINGS" sub="Discover our latest premium certified vehicles available today" />
        <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'20px', marginBottom:'64px' }}>
          {fresh.map((c,i)=><RentalCard key={i} {...c} />)}
        </div>

        {/* ── EXECUTIVE SUVS ── */}
        <SectionHead title="EXECUTIVE SUVS & PERFORMANCE SEDANS" sub="Luxury quality for every occasion" />
        <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'20px', marginBottom:'64px' }}>
          {exec.map((c,i)=><RentalCard key={i} {...c} />)}
        </div>

        {/* ── FEATURED CERTIFIED RENTALS ── */}
        <SectionHead title="FEATURED SOUKNI CERTIFIED CAR RENTALS" sub="Rigorously inspected, cleared for ultimate peace of mind" />
        <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'20px', marginBottom:'64px' }}>
          {certified.map((c,i)=><RentalCard key={i} {...c} />)}
        </div>

        {/* ── MOTORS PRO BANNER ── */}
        <div style={{ position:'relative', borderRadius:'40px', overflow:'hidden', height:'340px', display:'flex', alignItems:'center', boxShadow:'0 24px 64px rgba(0,0,0,0.2)', marginBottom:'64px', cursor:'pointer' }}>
          <img src={IMGS.motpro} alt="Motors Pro" style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover', transition:'transform 0.7s' }}
            onMouseEnter={e=>e.currentTarget.style.transform='scale(1.04)'}
            onMouseLeave={e=>e.currentTarget.style.transform='scale(1)'}
          />
          <div style={{ position:'absolute', inset:0, backgroundColor:'rgba(22,29,27,0.6)' }} />
          <div style={{ position:'relative', zIndex:1, padding:'0 64px', maxWidth:'560px' }}>
            <div style={{ backgroundColor:C.mint, color:C.ink, fontSize:'9px', ...UB, padding:'5px 14px', borderRadius:'6px', textTransform:'uppercase' as const, letterSpacing:'0.1em', display:'inline-block', marginBottom:'16px' }}>AUTO LISTED</div>
            <h2 style={{ fontSize:'clamp(28px,3.5vw,42px)', ...UB, color:'white', marginBottom:'12px', lineHeight:1.05 }}>SOUKNI MOTORS PRO</h2>
            <p style={{ fontSize:'16px', color:'rgba(255,255,255,0.82)', marginBottom:'28px', lineHeight:1.5 }}>The Gold Standard for Premium Car Rental Services</p>
            <button style={{ backgroundColor:C.mint, color:C.ink, border:'none', padding:'16px 40px', borderRadius:'100px', fontSize:'10px', ...UB, textTransform:'uppercase' as const, letterSpacing:'0.12em', cursor:'pointer', transition:'transform 0.2s' }}
              onMouseEnter={e=>e.currentTarget.style.transform='scale(1.04)'}
              onMouseLeave={e=>e.currentTarget.style.transform='scale(1)'}
            >EXPLORE SOUKNI MOTORS PRO</button>
          </div>
        </div>

        {/* ── PRO CHOICES ── */}
        <SectionHead title="SOUKNI PREMIUM PRO CHOICES" />
        {[pro1, pro2, pro3].map((row,ri)=>(
          <div key={ri} style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'20px', marginBottom:'20px' }}>
            {row.map((c,j)=><RentalCard key={j} {...c} />)}
          </div>
        ))}

        {/* ── DIAMOND CERTIFIED BANNER ── */}
        <div style={{ position:'relative', backgroundColor:C.ink, borderRadius:'40px', padding:'56px 64px', display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'48px', overflow:'hidden', boxShadow:'0 16px 48px rgba(0,0,0,0.25)', gap:'28px', flexWrap:'wrap' as const }}>
          <div style={{ position:'absolute', right:'-60px', bottom:'-60px', width:'320px', height:'320px', backgroundColor:`${C.mint}14`, borderRadius:'50%' }} />
          <div style={{ position:'absolute', right:'120px', top:'-80px', width:'200px', height:'200px', backgroundColor:`${C.mint}0a`, borderRadius:'50%' }} />
          <div style={{ position:'relative', zIndex:1, maxWidth:'520px' }}>
            <div style={{ backgroundColor:C.mint, color:C.ink, fontSize:'9px', ...UB, padding:'5px 14px', borderRadius:'6px', textTransform:'uppercase' as const, letterSpacing:'0.1em', display:'inline-flex', alignItems:'center', gap:'6px', marginBottom:'20px' }}>◆ AUTO LISTED</div>
            <h2 style={{ fontSize:'clamp(26px,3.5vw,40px)', ...UB, color:'white', marginBottom:'14px', lineHeight:1.05 }}>BECOME A SOUKNI<br/>DIAMOND CERTIFIED<br/>MEMBER</h2>
            <p style={{ fontSize:'16px', color:'rgba(255,255,255,0.6)', lineHeight:1.6, maxWidth:'420px' }}>Standard on listing placement and exclusive benefits for the premium car rental providers.</p>
          </div>
          <button style={{ position:'relative', zIndex:1, backgroundColor:C.mint, color:C.ink, border:'none', padding:'20px 48px', borderRadius:'100px', fontSize:'10px', ...UB, textTransform:'uppercase' as const, letterSpacing:'0.12em', cursor:'pointer', transition:'transform 0.2s', whiteSpace:'nowrap' as const }}
            onMouseEnter={e=>e.currentTarget.style.transform='scale(1.04)'}
            onMouseLeave={e=>e.currentTarget.style.transform='scale(1)'}
          >GET CERTIFIED NOW</button>
        </div>

        {/* ── AFTER-DIAMOND ROWS ── */}
        {[after1, after2].map((row,ri)=>(
          <div key={ri} style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'20px', marginBottom:'20px' }}>
            {row.map((c,j)=><RentalCard key={j} {...c} />)}
          </div>
        ))}

        {/* ── PAGINATION ── */}
        <div style={{ display:'flex', justifyContent:'center', alignItems:'center', gap:'10px', margin:'48px 0 80px' }}>
          <button style={{ width:'48px', height:'48px', borderRadius:'14px', backgroundColor:'white', border:'1px solid rgba(107,122,118,0.12)', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', color:C.muted, transition:'all 0.2s' }}
            onMouseEnter={e=>{e.currentTarget.style.backgroundColor=C.mint;e.currentTarget.style.color=C.ink}}
            onMouseLeave={e=>{e.currentTarget.style.backgroundColor='white';e.currentTarget.style.color=C.muted}}
          ><ChevronLeft size={20} /></button>
          {[1,2,3].map(p=>(
            <button key={p} onClick={()=>setPage(p)}
              style={{ width:'48px', height:'48px', borderRadius:'14px', cursor:'pointer', fontSize:'16px', ...UB, border:'1px solid', transition:'all 0.2s',
                backgroundColor: page===p ? C.mint : 'white',
                color:           page===p ? C.ink  : C.muted,
                borderColor:     page===p ? C.mint : 'rgba(107,122,118,0.12)',
              }}
            >{p}</button>
          ))}
          <span style={{ color:C.muted, padding:'0 4px' }}>…</span>
          <button style={{ width:'48px', height:'48px', borderRadius:'14px', backgroundColor:'white', border:'1px solid rgba(107,122,118,0.12)', cursor:'pointer', fontSize:'16px', ...UB, color:C.muted }}>6</button>
          <button style={{ width:'48px', height:'48px', borderRadius:'14px', backgroundColor:'white', border:'1px solid rgba(107,122,118,0.12)', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', color:C.muted, transition:'all 0.2s' }}
            onMouseEnter={e=>{e.currentTarget.style.backgroundColor=C.mint;e.currentTarget.style.color=C.ink}}
            onMouseLeave={e=>{e.currentTarget.style.backgroundColor='white';e.currentTarget.style.color=C.muted}}
          ><ChevronRight size={20} /></button>
        </div>

        {/* ── JOIN SOUKNI FAMILY ── */}
        <div style={{ backgroundColor:C.mint, borderRadius:'40px', padding:'64px', display:'flex', alignItems:'center', justifyContent:'space-between', gap:'48px', position:'relative' as const, overflow:'hidden', flexWrap:'wrap' as const }}>
          <div style={{ position:'absolute', right:'-80px', bottom:'-80px', width:'360px', height:'360px', backgroundColor:'rgba(22,29,27,0.08)', borderRadius:'50%' }} />
          <div style={{ position:'relative', zIndex:1, maxWidth:'520px' }}>
            <h2 style={{ fontSize:'clamp(26px,3.5vw,40px)', ...UB, color:C.ink, marginBottom:'14px', lineHeight:1.05 }}>JOIN THE SOUKNI FAMILY</h2>
            <p style={{ fontSize:'16px', color:`${C.ink}b3`, marginBottom:'32px', lineHeight:1.6 }}>Download our premium marketplace for real-time alerts and exclusive rental deals.</p>
            <div style={{ display:'flex', gap:'14px', flexWrap:'wrap' as const }}>
              {['APPLE_ App Store','PLAY_ Google Play'].map(app=>(
                <button key={app} style={{ height:'52px', minWidth:'160px', backgroundColor:C.ink, color:'white', border:'none', borderRadius:'14px', fontSize:'10px', ...UB, textTransform:'uppercase' as const, letterSpacing:'0.1em', cursor:'pointer', transition:'transform 0.15s' }}
                  onMouseEnter={e=>e.currentTarget.style.transform='scale(1.04)'}
                  onMouseLeave={e=>e.currentTarget.style.transform='scale(1)'}
                >{app}</button>
              ))}
            </div>
          </div>
          {/* Phone */}
          <div style={{ position:'relative', zIndex:1, width:'200px', aspectRatio:'9/17', backgroundColor:C.ink, borderRadius:'44px', border:'6px solid rgba(255,255,255,0.25)', overflow:'hidden', boxShadow:'0 32px 80px rgba(0,0,0,0.3)', flexShrink:0 }}>
            <img src={IMGS.phone} alt="App" style={{ width:'100%', height:'100%', objectFit:'cover', opacity:0.7 }} />
          </div>
        </div>
      </main>

      {/* ── FOOTER ── */}
      <footer style={{ backgroundColor:C.ink, color:'white', padding:'80px 24px 48px' }}>
        <div style={{ maxWidth:'1280px', margin:'0 auto' }}>
          <div style={{ display:'grid', gridTemplateColumns:'1.6fr 1fr 1fr 1fr 1fr', gap:'40px', marginBottom:'64px' }}>
            <div>
              <div style={{ fontSize:'28px', ...UB, color:C.mint, marginBottom:'18px' }}>SouKni</div>
              <p style={{ fontSize:'9px', ...UB, color:C.muted, textTransform:'uppercase' as const, letterSpacing:'0.1em', lineHeight:1.9, maxWidth:'240px', marginBottom:'24px', opacity:0.75 }}>The Market in your Pocket</p>
              <div style={{ display:'flex', gap:'10px' }}>
                {['FB','IG','X'].map(s=>(
                  <div key={s} style={{ width:'36px', height:'36px', borderRadius:'50%', backgroundColor:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.1)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'9px', ...UB, color:C.muted, cursor:'pointer', transition:'all 0.2s' }}
                    onMouseEnter={e=>{(e.currentTarget as HTMLDivElement).style.backgroundColor=C.mint;(e.currentTarget as HTMLDivElement).style.color=C.ink}}
                    onMouseLeave={e=>{(e.currentTarget as HTMLDivElement).style.backgroundColor='rgba(255,255,255,0.06)';(e.currentTarget as HTMLDivElement).style.color=C.muted}}
                  >{s}</div>
                ))}
              </div>
            </div>
            {[
              { title:'JOIN COMMUNITY', links:['__EMAIL__','SUBSCRIBE'] },
              { title:'MARKETPLACE',   links:['Real Estate','Motors','Jobs','Services','The Vault'] },
              { title:'COMPANY',       links:['About Us','Careers','Safety Tips','Advertising'] },
              { title:'APP DOWNLOADS', links:['APPLE_ App Store','PLAY_ Google Play'] },
            ].map(col=>(
              <div key={col.title}>
                <h5 style={{ fontSize:'9px', ...UB, color:C.mint, textTransform:'uppercase' as const, letterSpacing:'0.15em', marginBottom:'24px' }}>{col.title}</h5>
                {col.links.map((link,li)=>(
                  col.title==='JOIN COMMUNITY' && li===0
                    ? <input key={link} type="email" placeholder="Enter your email" style={{ width:'100%', backgroundColor:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.1)', borderRadius:'10px', padding:'10px 12px', color:'white', fontSize:'9px', ...UB, fontFamily:'Inter,sans-serif', outline:'none', marginBottom:'8px', boxSizing:'border-box' as const }} />
                    : col.title==='JOIN COMMUNITY' && li===1
                    ? <button key={link} style={{ width:'100%', backgroundColor:C.mint, color:C.ink, border:'none', padding:'10px', borderRadius:'10px', fontSize:'9px', ...UB, textTransform:'uppercase' as const, letterSpacing:'0.12em', cursor:'pointer' }}>SUBSCRIBE</button>
                    : <a key={link} href="#" style={{ display:'block', fontSize:'9px', ...UB, color:C.muted, textTransform:'uppercase' as const, letterSpacing:'0.1em', textDecoration:'none', marginBottom:'14px', transition:'color 0.15s' }}
                        onMouseEnter={e=>e.currentTarget.style.color=C.mint}
                        onMouseLeave={e=>e.currentTarget.style.color=C.muted}
                      >{link}</a>
                ))}
              </div>
            ))}
          </div>
          <div style={{ borderTop:'1px solid rgba(255,255,255,0.06)', paddingTop:'28px', textAlign:'center' as const, fontSize:'9px', ...UB, color:C.muted, textTransform:'uppercase' as const, letterSpacing:'0.22em', opacity:0.35 }}>
            © 2026 SOUKNI MOROCCO — ALL RIGHTS RESERVED
          </div>
        </div>
      </footer>
    </div>
  )
}
