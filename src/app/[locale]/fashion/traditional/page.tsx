'use client'

import { useState } from 'react'
import React from 'react'
import Link from 'next/link'
import { FashionBreadcrumb, FashionFooter, FashionCrossNav, whatsappLink } from '@/components/ui/FashionPageWrapper'
import { Heart, Search, ChevronDown, ChevronLeft, ChevronRight, SlidersHorizontal } from 'lucide-react'

const C = {
  mint:   '#22d4a8',
  mintDk: '#006c53',
  ink:    '#161d1b',
  surface:'#f4fbf8',
  cream:  '#f5ede0',
  muted:  '#6b7a76',
}
const UB: React.CSSProperties = { fontFamily:'Inter,sans-serif',            fontWeight:900, letterSpacing:'-0.05em' }
const CB: React.CSSProperties = { fontFamily:"'Hanken Grotesk',sans-serif", fontWeight:900, letterSpacing:'-0.03em' }

const I = {
  hero:    'https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&w=1600',
  takchita:'https://images.pexels.com/photos/2220316/pexels-photo-2220316.jpeg?auto=compress&w=600',
  djellaba:'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&w=600',
  gandoura:'https://images.pexels.com/photos/5935748/pexels-photo-5935748.jpeg?auto=compress&w=600',
  bridal:  'https://images.pexels.com/photos/2220316/pexels-photo-2220316.jpeg?auto=compress&w=600',
  designer:'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&w=900',
  kaftan:  'https://images.pexels.com/photos/5935748/pexels-photo-5935748.jpeg?auto=compress&w=600',
  belgha:  'https://images.pexels.com/photos/2220316/pexels-photo-2220316.jpeg?auto=compress&w=600',
  immo:    'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&w=1200',
  auto:    'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&w=1200',
  a1:      'https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&w=600',
  a2:      'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&w=600',
  a3:      'https://images.pexels.com/photos/2220316/pexels-photo-2220316.jpeg?auto=compress&w=600',
  a4:      'https://images.pexels.com/photos/5935748/pexels-photo-5935748.jpeg?auto=compress&w=600',
  s1:      'https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&w=80',
  s2:      'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&w=80',
  s3:      'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&w=80',
  s4:      'https://images.pexels.com/photos/1587009/pexels-photo-1587009.jpeg?auto=compress&w=80',
}

type BadgeT = 'diamond'|'verified'|'new'|'editor'

function Badge({ type }: { type: BadgeT }) {
  const map: Record<BadgeT,{bg:string;color:string;text:string}> = {
    diamond: { bg:C.mint,    color:C.ink,  text:'DIAMOND MEMBER'   },
    verified:{ bg:'#8d4f00', color:'white', text:'VERIFIED'         },
    new:     { bg:C.mint,    color:C.ink,  text:'NEW ARRIVAL'      },
    editor:  { bg:'#8d4f00', color:'white', text:"EDITOR'S CHOICE"  },
  }
  const s = map[type]
  return (
    <span style={{ backgroundColor:s.bg, color:s.color, fontSize:'9px', ...CB, padding:'5px 12px', borderRadius:'100px', textTransform:'uppercase' as const, letterSpacing:'0.08em' }}>
      {s.text}
    </span>
  )
}

function FeaturedCard({ badge, title, desc, price, seller, sellerImg, img }: any) {
  const [saved, setSaved] = useState(false)
  const [hov,   setHov  ] = useState(false)
  return (
    <div onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{ backgroundColor:'white', borderRadius:'28px', overflow:'hidden', border:`1px solid ${hov?C.mint:'rgba(186,202,197,0.12)'}`, boxShadow:hov?`0 24px 48px ${C.mint}18`:'0 2px 8px rgba(0,0,0,0.04)', transition:'all 0.3s', cursor:'pointer', display:'flex', flexDirection:'column' as const }}>
      <div style={{ position:'relative', height:'320px', overflow:'hidden', backgroundColor:C.cream }}>
        <img src={img} alt={title} style={{ width:'100%', height:'100%', objectFit:'cover', transition:'transform 0.5s', transform:hov?'scale(1.06)':'scale(1)' }} />
        {badge && <div style={{ position:'absolute', top:'14px', left:'14px', zIndex:10 }}><Badge type={badge} /></div>}
        <button onClick={e=>{e.stopPropagation();setSaved(!saved)}}
          style={{ position:'absolute', top:'12px', right:'12px', zIndex:10, width:'40px', height:'40px', borderRadius:'50%', backgroundColor:'rgba(255,255,255,0.82)', border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}>
          <Heart size={17} fill={saved?'#ef4444':'none'} color={saved?'#ef4444':C.muted} />
        </button>
      </div>
      <div style={{ padding:'22px 24px', flex:1, display:'flex', flexDirection:'column' as const }}>
        <h4 style={{ fontSize:'18px', ...CB, color:hov?C.mint:C.ink, marginBottom:'6px', transition:'color 0.2s' }}>{title}</h4>
        {desc && <p style={{ fontSize:'14px', color:C.muted, marginBottom:'10px', lineHeight:1.5 }}>{desc}</p>}
        <p style={{ fontSize:'22px', ...CB, color:C.mint, marginBottom:'16px' }}>{price.toLocaleString()} MAD</p>
        <div style={{ marginTop:'auto', display:'flex', alignItems:'center', justifyContent:'space-between', paddingTop:'16px', borderTop:'1px solid rgba(186,202,197,0.15)' }}>
          <div style={{ display:'flex', alignItems:'center', gap:'8px' }}>
            <img src={sellerImg} alt={seller} style={{ width:'34px', height:'34px', borderRadius:'50%', objectFit:'cover' }} />
            <span style={{ fontSize:'13px', ...CB, color:C.ink }}>{seller}</span>
          </div>
          <div style={{ display:'flex', gap:'8px' }}>
            <button style={{ padding:'9px 16px', border:`1px solid rgba(186,202,197,0.4)`, borderRadius:'12px', backgroundColor:'transparent', fontSize:'11px', ...CB, cursor:'pointer', color:C.ink, transition:'all 0.15s' }}
              onMouseEnter={e=>{e.currentTarget.style.backgroundColor=C.ink;e.currentTarget.style.color='white'}}
              onMouseLeave={e=>{e.currentTarget.style.backgroundColor='transparent';e.currentTarget.style.color=C.ink}}
            >Message</button>
            <button style={{ padding:'9px 16px', border:'none', borderRadius:'12px', backgroundColor:C.mint, fontSize:'11px', ...CB, cursor:'pointer', color:C.ink }}>WhatsApp</button>
          </div>
        </div>
      </div>
    </div>
  )
}

function DiscoveryCard({ badge, title, price, location, time, img }: any) {
  const [saved, setSaved] = useState(false)
  const [hov,   setHov  ] = useState(false)
  return (
    <div onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{ backgroundColor:'white', borderRadius:'32px', padding:'12px', border:`1px solid ${hov?C.mint:'rgba(186,202,197,0.12)'}`, boxShadow:hov?`0 16px 40px ${C.mint}14`:'0 2px 8px rgba(0,0,0,0.04)', transition:'all 0.3s', cursor:'pointer' }}>
      <div style={{ position:'relative', height:'240px', borderRadius:'22px', overflow:'hidden', marginBottom:'16px', backgroundColor:C.cream }}>
        <img src={img} alt={title} style={{ width:'100%', height:'100%', objectFit:'cover', transition:'transform 0.5s', transform:hov?'scale(1.08)':'scale(1)' }} />
        {badge && <div style={{ position:'absolute', top:'12px', left:'12px', zIndex:10 }}><Badge type={badge as BadgeT} /></div>}
        <button onClick={e=>{e.stopPropagation();setSaved(!saved)}}
          style={{ position:'absolute', top:'10px', right:'10px', zIndex:10, width:'32px', height:'32px', borderRadius:'50%', backgroundColor:'rgba(255,255,255,0.85)', border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}>
          <Heart size={14} fill={saved?'#ef4444':'none'} color={saved?'#ef4444':C.muted} />
        </button>
      </div>
      <div style={{ padding:'0 6px' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'4px', gap:'8px' }}>
          <h4 style={{ fontSize:'16px', ...CB, color:hov?C.mint:C.ink, lineHeight:1.3, transition:'color 0.2s' }}>{title}</h4>
          <span style={{ fontSize:'16px', ...CB, color:C.mint, flexShrink:0 }}>{price.toLocaleString()} MAD</span>
        </div>
        <p style={{ fontSize:'12px', color:C.muted, ...CB, marginBottom:'14px' }}>{location} · {time}</p>
        <div style={{ display:'flex', gap:'8px' }}>
          <button style={{ flex:1, padding:'9px', borderRadius:'100px', border:`1px solid ${C.mint}`, backgroundColor:'transparent', color:C.ink, fontSize:'10px', ...CB, textTransform:'uppercase' as const, cursor:'pointer' }}>Message</button>
          <button style={{ flex:1, padding:'9px', borderRadius:'100px', backgroundColor:C.mint, border:'none', color:C.ink, fontSize:'10px', ...CB, textTransform:'uppercase' as const, cursor:'pointer' }}>💬 WhatsApp</button>
        </div>
      </div>
    </div>
  )
}

function FreshCard({ title, price, location, time, img }: any) {
  const [saved, setSaved] = useState(false)
  const [hov,   setHov  ] = useState(false)
  return (
    <div onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{ backgroundColor:'white', padding:'12px', borderRadius:'32px', border:`1px solid ${hov?C.mint:'rgba(186,202,197,0.12)'}`, boxShadow:hov?`0 12px 32px ${C.mint}14`:'0 2px 8px rgba(0,0,0,0.04)', transition:'all 0.3s', cursor:'pointer' }}>
      <div style={{ position:'relative', height:'220px', borderRadius:'22px', overflow:'hidden', marginBottom:'16px', backgroundColor:C.cream }}>
        <img src={img} alt={title} style={{ width:'100%', height:'100%', objectFit:'cover', transition:'transform 0.5s', transform:hov?'scale(1.05)':'scale(1)' }} />
        <button onClick={e=>{e.stopPropagation();setSaved(!saved)}}
          style={{ position:'absolute', bottom:'10px', right:'10px', zIndex:10, width:'34px', height:'34px', borderRadius:'50%', backgroundColor:'rgba(255,255,255,0.9)', border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}>
          <Heart size={14} fill={saved?'#ef4444':'none'} color={saved?'#ef4444':C.muted} />
        </button>
      </div>
      <div style={{ padding:'0 8px' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', gap:'8px', marginBottom:'4px' }}>
          <h4 style={{ fontSize:'16px', ...CB, color:hov?C.mint:C.ink, transition:'color 0.2s', lineHeight:1.3 }}>{title}</h4>
          <span style={{ fontSize:'15px', ...CB, color:C.mint, flexShrink:0 }}>{price.toLocaleString()} MAD</span>
        </div>
        <p style={{ fontSize:'11px', color:C.muted, ...CB, marginBottom:'12px' }}>{location}</p>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', borderTop:`1px solid rgba(186,202,197,0.15)`, paddingTop:'12px' }}>
          <span style={{ fontSize:'9px', color:C.muted, ...CB, textTransform:'uppercase' as const, letterSpacing:'0.1em' }}>{time}</span>
          <div style={{ display:'flex', gap:'8px' }}>
            <span style={{ fontSize:'18px', cursor:'pointer' }}>✉️</span>
            <span style={{ fontSize:'18px', cursor:'pointer' }}>💬</span>
          </div>
        </div>
      </div>
    </div>
  )
}

const featuredItems = [
  { badge:'diamond' as BadgeT, title:'Royal Velvet Takchita',    desc:'Traditional Moroccan wedding attire with a modern finish.',  price:12500, seller:'Maison Couture',  sellerImg:I.s1, img:I.takchita },
  { badge:'editor'  as BadgeT, title:'Silk Emerald Djellaba',    desc:'Pure silk embroidery from the master Maalems of Fez.',       price:4800,  seller:"L'Artisan Rabat", sellerImg:I.s2, img:I.djellaba },
  { badge:undefined,           title:'Minimalist Linen Gandoura',desc:'Effortless elegance for contemporary Moroccan living.',      price:2400,  seller:'Modern Heritage', sellerImg:I.s3, img:I.gandoura },
  { badge:undefined,           title:'Bridal Pearl Takchita',    desc:'The ultimate statement piece for prestigious weddings.',     price:25000, seller:'Ziana Prestige',  sellerImg:I.s4, img:I.bridal   },
]

function makeRows(rows: Array<[string,string,number,string,string,string]>) {
  return rows.map(([badge,title,price,loc,time,img],i)=>({ id:i, badge, title, price, location:loc, time, img }))
}

const discRow1 = makeRows([
  ['diamond','Brocade Wedding Takchita',15800,'Rabat, Souissi','2h ago',I.a1],
  ['verified','Silk Satin Djellaba',    3200, 'Rabat, Agdal',  '5h ago',I.a2],
  ['diamond','Cotton Linen Gandoura',   1850, 'Rabat, Médina', '1h ago',I.a3],
  ['verified','Artisan Leather Belgha', 950,  'Rabat, Oulfa',  '8h ago',I.a4],
])
const discRow2 = makeRows([
  ['diamond','Embroidered Pink Djellaba',1400, 'Rabat, Hassan',   '12h ago',I.a1],
  ['verified',"Men's Royal Jabador",     4500, 'Rabat, Hay Riad', '3h ago', I.a2],
  ['diamond','Silk Thread Takchita',     22000,'Rabat, Souissi',  '2d ago', I.a3],
  ['verified','Modern Kaftan Jacket',    3850, 'Rabat, Agdal',    '6h ago', I.a4],
])
const discRow3 = makeRows([
  ['diamond','Velvet Royal Takchita',   12500,'Rabat, Souissi','2h ago',I.a1],
  ['verified','Filigree Gold Earrings', 3200, 'Rabat, Médina', '5h ago',I.a2],
  ['diamond','Medina Leather Slippers', 850,  'Rabat, Médina', '2h ago',I.a3],
  ['verified','Embossed Leather Bag',   1850, 'Rabat, Agdal',  '6h ago',I.a4],
])
const discRow4 = makeRows([
  ['diamond','Silk Emerald Djellaba',     4800, 'Rabat, Souissi','4h ago',I.a1],
  ['verified','Minimalist Linen Gandoura',2400, 'Rabat, Agdal',  '2h ago',I.a2],
  ['diamond','Bridal Pearl Takchita',     25000,'Rabat, Souissi','1d ago', I.a3],
  ['verified','Sofia Modern Kaftan',      3900, 'Rabat, Hay Riad','4h ago',I.a4],
])
const freshItems = [
  { title:'Linen Rose Djellaba',    price:1200, location:'Rabat, Agdal',    time:'2 hours ago', img:I.a1 },
  { title:'Modern Navy Jabador',    price:2150, location:'Rabat, Hay Riad', time:'4 hours ago', img:I.a2 },
  { title:'Filigree Gold Earrings', price:3200, location:'Rabat, Souissi',  time:'5 hours ago', img:I.a3 },
  { title:'Embossed Leather Bag',   price:1850, location:'Rabat, Médina',   time:'6 hours ago', img:I.a4 },
]

export default function TraditionalWearPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale }                      = React.use(params)
  const [activePill,   setActivePill  ] = useState('Kaftans')
  const [activeSeller, setActiveSeller] = useState('All Sellers')
  const [diamond,      setDiamond     ] = useState(true)
  const [gridView,     setGridView    ] = useState(true)
  const [page,         setPage        ] = useState(1)
  const [city,         setCity        ] = useState('Rabat')
  const [keyword,      setKeyword     ] = useState('')
  const [neighborhood, setNeighborhood] = useState('All Neighborhoods')
  const [price,        setPrice       ] = useState('0 - 50,000')
  const [cityOpen,     setCityOpen    ] = useState(false)
  const [neighOpen,    setNeighOpen   ] = useState(false)
  const [priceOpen,    setPriceOpen   ] = useState(false)
  const [filterOpen,   setFilterOpen  ] = useState(false)

  const cities = ['Rabat','Casablanca','Marrakech','Fès','Tanger','Agadir','Meknès','Oujda']
  const neighborhoods = ['All Neighborhoods','Agdal','Souissi','Hay Riad','Hassan','Médina','Océan','Aviation']
  const priceRanges = ['0 - 50,000','0 - 5,000','5,000 - 15,000','15,000 - 30,000','30,000 - 50,000','50,000+']
  const pills = ['Kaftans','Djellabas','Takchitas','Gandouras','Belgha','Accessories','View More +']

  function Dropdown({ label, value, options, open, setOpen, onChange }: any) {
    return (
      <div style={{ position:'relative', flex:1 }}>
        <button onClick={()=>{ setOpen(!open); setCityOpen(false); setNeighOpen(false); setPriceOpen(false) }}
          style={{ width:'100%', height:'100%', background:'none', border:'none', cursor:'pointer', padding:'0 22px', display:'flex', flexDirection:'column' as const, justifyContent:'center', textAlign:'left' as const }}>
          <span style={{ fontSize:'9px', ...UB, textTransform:'uppercase' as const, letterSpacing:'0.14em', color:C.muted, marginBottom:'3px' }}>{label}</span>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
            <span style={{ fontSize:'14px', ...UB, color:C.ink }}>{value}</span>
            <ChevronDown size={14} color={C.mint} style={{ flexShrink:0, transition:'transform 0.2s', transform:open?'rotate(180deg)':'rotate(0)' }} />
          </div>
        </button>
        {open && (
          <div style={{ position:'absolute', top:'calc(100% + 8px)', left:0, minWidth:'220px', backgroundColor:'white', borderRadius:'20px', boxShadow:'0 20px 60px rgba(0,0,0,0.12)', border:'1px solid rgba(107,122,118,0.12)', zIndex:200, overflow:'hidden', padding:'8px 0' }}>
            {options.map((opt: string)=>(
              <button key={opt} onClick={()=>{ onChange(opt); setOpen(false) }}
                style={{ width:'100%', padding:'12px 20px', background:'none', border:'none', cursor:'pointer', textAlign:'left' as const, fontSize:'14px', ...UB, color:opt===value?C.mint:C.ink, display:'flex', justifyContent:'space-between', alignItems:'center' }}
                onMouseEnter={e=>e.currentTarget.style.backgroundColor=C.surface}
                onMouseLeave={e=>e.currentTarget.style.backgroundColor='transparent'}
              >{opt}{opt===value&&<span style={{color:C.mint}}>✓</span>}</button>
            ))}
          </div>
        )}
      </div>
    )
  }

  return (
    <div style={{ ...UB, backgroundColor:C.surface, color:C.ink, minHeight:'100vh' }}>

      {/* ══ 1. HERO ══════════════════════════════════════════ */}
      <section style={{ position:'relative', height:'520px', display:'flex', alignItems:'center', justifyContent:'center', overflow:'hidden' }}>
        <img src={I.hero} alt="Traditional Wear" style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover' }} />
        <div style={{ position:'absolute', inset:0, backgroundColor:'rgba(0,0,0,0.42)' }} />
        <div style={{ position:'relative', zIndex:10, width:'100%', maxWidth:'1000px', padding:'0 40px', display:'flex', flexDirection:'column' as const, alignItems:'center', gap:'36px', textAlign:'center' as const }}>
          <h1 style={{ fontSize:'clamp(36px,5.5vw,60px)', ...UB, color:'white', lineHeight:1.05, textShadow:'0 4px 20px rgba(0,0,0,0.3)' }}>
            Find Exquisite Traditional Wear<br/>in Rabat
          </h1>
          <div style={{ width:'100%', maxWidth:'780px', backgroundColor:'rgba(255,255,255,0.12)', backdropFilter:'blur(12px)', border:'1px solid rgba(255,255,255,0.32)', borderRadius:'100px', padding:'10px', display:'flex', alignItems:'center', boxShadow:'0 24px 64px rgba(0,0,0,0.2)' }}>
            <div style={{ flex:1, display:'flex', flexDirection:'column' as const, padding:'6px 24px', borderRight:'1px solid rgba(255,255,255,0.22)', cursor:'pointer' }}>
              <span style={{ fontSize:'9px', ...UB, textTransform:'uppercase' as const, letterSpacing:'0.15em', color:'rgba(255,255,255,0.72)', marginBottom:'3px' }}>City</span>
              <div style={{ display:'flex', alignItems:'center', gap:'4px', color:'white', fontSize:'15px', ...UB }}>Rabat, Morocco <ChevronDown size={16} /></div>
            </div>
            <div style={{ flex:2, display:'flex', flexDirection:'column' as const, padding:'6px 24px' }}>
              <span style={{ fontSize:'9px', ...UB, textTransform:'uppercase' as const, letterSpacing:'0.15em', color:'rgba(255,255,255,0.72)', marginBottom:'3px' }}>Keyword</span>
              <input type="text" value={keyword} onChange={e=>setKeyword(e.target.value)} placeholder="Search for Kaftans, Djellabas, Gandouras..."
                style={{ backgroundColor:'transparent', border:'none', outline:'none', color:'white', fontSize:'15px', ...UB, fontFamily:'Inter,sans-serif' }} />
            </div>
            <button style={{ backgroundColor:C.mintDk, color:'white', border:'none', padding:'16px 44px', borderRadius:'100px', fontSize:'16px', ...UB, cursor:'pointer', transition:'filter 0.15s' }}
              onMouseEnter={e=>e.currentTarget.style.filter='brightness(1.1)'}
              onMouseLeave={e=>e.currentTarget.style.filter='brightness(1)'}
            >Search</button>
          </div>
        </div>
      </section>

      {/* ══ 2. ADVANCED FILTER BAR ═══════════════════════════ */}
      <div style={{ maxWidth:'1440px', margin:'-40px auto 0', padding:'0 40px', position:'relative', zIndex:30 }}>
        <div style={{ backgroundColor:'rgba(255,255,255,0.97)', backdropFilter:'blur(20px)', border:'1px solid rgba(186,202,197,0.25)', borderRadius:'100px', boxShadow:'0 20px 60px rgba(0,0,0,0.08)', display:'flex', alignItems:'stretch', height:'72px' }}>
          <Dropdown label="CITY" value={city} options={cities} open={cityOpen} setOpen={setCityOpen} onChange={setCity} />
          <div style={{ width:'1px', backgroundColor:'rgba(107,122,118,0.12)', margin:'12px 0' }} />
          {/* Keyword */}
          <div style={{ flex:1.6, padding:'0 22px', display:'flex', flexDirection:'column' as const, justifyContent:'center' }}>
            <span style={{ fontSize:'9px', ...UB, textTransform:'uppercase' as const, letterSpacing:'0.14em', color:C.muted, marginBottom:'3px' }}>KEYWORD</span>
            <div style={{ display:'flex', alignItems:'center', gap:'8px' }}>
              <Search size={13} color={C.muted} />
              <input type="text" value={keyword} onChange={e=>setKeyword(e.target.value)} placeholder="e.g. Kaftan, Djellaba..."
                style={{ flex:1, background:'none', border:'none', outline:'none', fontSize:'14px', ...UB, color:C.ink, fontFamily:'Inter,sans-serif' }} />
              {keyword && <button onClick={()=>setKeyword('')} style={{ background:'none', border:'none', cursor:'pointer', color:C.muted, fontSize:'16px' }}>✕</button>}
            </div>
          </div>
          <div style={{ width:'1px', backgroundColor:'rgba(107,122,118,0.12)', margin:'12px 0' }} />
          <Dropdown label="NEIGHBOURHOOD" value={neighborhood} options={neighborhoods} open={neighOpen} setOpen={setNeighOpen} onChange={setNeighborhood} />
          <div style={{ width:'1px', backgroundColor:'rgba(107,122,118,0.12)', margin:'12px 0' }} />
          <Dropdown label="PRICE (MAD)" value={price} options={priceRanges} open={priceOpen} setOpen={setPriceOpen} onChange={setPrice} />
          <div style={{ width:'1px', backgroundColor:'rgba(107,122,118,0.12)', margin:'12px 0' }} />
          <button onClick={()=>setFilterOpen(true)}
            style={{ display:'flex', alignItems:'center', gap:'10px', padding:'0 28px', background:'none', border:'none', cursor:'pointer', borderRadius:'0 100px 100px 0', transition:'background 0.15s', flexShrink:0 }}
            onMouseEnter={e=>e.currentTarget.style.backgroundColor=`${C.mint}14`}
            onMouseLeave={e=>e.currentTarget.style.backgroundColor='transparent'}
          >
            <SlidersHorizontal size={18} color={C.mint} />
            <span style={{ fontSize:'14px', ...UB, color:C.ink }}>Filters</span>
          </button>
        </div>
      </div>

      <div style={{ maxWidth:'1440px', margin:'0 auto', padding:'32px 40px 80px' }}>

        <FashionBreadcrumb pageLabel="Traditional Wear" />
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', gap:'16px', marginBottom:'24px', flexWrap:'wrap' as const }}>
          <div>
            <h2 style={{ fontSize:'clamp(20px,2.5vw,28px)', ...UB, color:C.ink, marginBottom:'4px' }}>New and Pre-Owned Traditional Wear for sale in Rabat</h2>
            <p style={{ fontSize:'14px', color:C.mint, ...CB }}>2,646 Ads in Rabat District</p>
          </div>
          <div style={{ display:'flex', gap:'10px' }}>
            {['↕ Sort: Default','🔖 Save Search'].map(b=>(
              <button key={b} style={{ backgroundColor:'white', border:'1px solid rgba(107,122,118,0.18)', padding:'9px 16px', borderRadius:'12px', fontSize:'10px', ...UB, textTransform:'uppercase' as const, letterSpacing:'0.1em', cursor:'pointer', color:C.ink, transition:'background 0.15s' }}
                onMouseEnter={e=>e.currentTarget.style.backgroundColor=C.surface}
                onMouseLeave={e=>e.currentTarget.style.backgroundColor='white'}
              >{b}</button>
            ))}
          </div>
        </div>

        {/* ══ 4. CATEGORY PILLS ════════════════════════════════ */}
        <div style={{ display:'flex', gap:'10px', flexWrap:'wrap' as const, marginBottom:'20px' }}>
          {pills.map(pill=>(
            <button key={pill} onClick={()=>setActivePill(pill)}
              style={{ padding:'10px 22px', borderRadius:'100px', fontSize:'11px', ...UB, textTransform:'uppercase' as const, letterSpacing:'0.1em', cursor:'pointer', transition:'all 0.2s', border:'1px solid',
                backgroundColor: activePill===pill ? C.mint  : 'white',
                color:           activePill===pill ? C.ink   : C.muted,
                borderColor:     activePill===pill ? C.mint  : 'rgba(186,202,197,0.4)',
              }}
            >{pill}</button>
          ))}
        </div>

        {/* ══ 5. SELLER TABS + DIAMOND TOGGLE ══════════════════ */}
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap' as const, gap:'14px', marginBottom:'20px' }}>
          <div style={{ display:'flex', gap:'4px', padding:'5px', backgroundColor:'#e8efec', borderRadius:'100px' }}>
            {['All Sellers','SouKni Members','SouKni Pro'].map(tab=>(
              <button key={tab} onClick={()=>setActiveSeller(tab)}
                style={{ padding:'10px 24px', borderRadius:'100px', fontSize:'11px', ...UB, textTransform:'uppercase' as const, letterSpacing:'0.1em', cursor:'pointer', border:'none', transition:'all 0.2s',
                  backgroundColor: activeSeller===tab ? C.ink   : 'transparent',
                  color:           activeSeller===tab ? 'white' : C.muted,
                  boxShadow:       activeSeller===tab ? '0 2px 8px rgba(0,0,0,0.15)' : 'none',
                }}
              >{tab}</button>
            ))}
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:'12px', cursor:'pointer' }} onClick={()=>setDiamond(!diamond)}>
            <span style={{ fontSize:'10px', ...UB, color:C.muted, textTransform:'uppercase' as const, letterSpacing:'0.1em' }}>Show SouKni Diamond Certified First</span>
            <div style={{ width:'52px', height:'26px', borderRadius:'100px', backgroundColor:diamond?C.mint:'rgba(107,122,118,0.25)', position:'relative', transition:'background 0.25s' }}>
              <div style={{ position:'absolute', top:'3px', left:diamond?'29px':'3px', width:'20px', height:'20px', borderRadius:'50%', backgroundColor:C.ink, transition:'left 0.25s' }} />
            </div>
          </div>
        </div>

        {/* ══ 6. NEW ARRIVALS + GRID TOGGLE ════════════════════ */}
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'40px' }}>
          <div style={{ display:'flex', gap:'10px' }}>
            {['✨ New Arrivals','📉 Price Drop Alert'].map(btn=>(
              <button key={btn}
                style={{ display:'flex', alignItems:'center', gap:'6px', padding:'9px 18px', borderRadius:'100px', border:'1px solid rgba(107,122,118,0.2)', backgroundColor:'transparent', fontSize:'12px', ...UB, cursor:'pointer', color:C.muted, transition:'all 0.15s' }}
                onMouseEnter={e=>{e.currentTarget.style.borderColor=C.mint;e.currentTarget.style.color=C.ink;e.currentTarget.style.backgroundColor=`${C.mint}0a`}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor='rgba(107,122,118,0.2)';e.currentTarget.style.color=C.muted;e.currentTarget.style.backgroundColor='transparent'}}
              >{btn}</button>
            ))}
          </div>
          <div style={{ display:'flex', gap:'4px', padding:'4px', backgroundColor:'white', borderRadius:'12px', border:'1px solid rgba(107,122,118,0.12)' }}>
            <button onClick={()=>setGridView(true)}  style={{ width:'36px', height:'36px', borderRadius:'8px', border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'17px', backgroundColor:gridView?C.ink:'transparent', color:gridView?'white':C.muted, transition:'all 0.2s' }}>⊞</button>
            <button onClick={()=>setGridView(false)} style={{ width:'36px', height:'36px', borderRadius:'8px', border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'17px', backgroundColor:!gridView?C.ink:'transparent', color:!gridView?'white':C.muted, transition:'all 0.2s' }}>☰</button>
          </div>
        </div>

        {/* ══ 7. FEATURED PREMIUM TRADITIONAL WEAR ════════════ */}
        <section style={{ marginBottom:'64px' }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'24px' }}>
            <div>
              <h3 style={{ fontSize:'clamp(18px,2.5vw,24px)', ...UB, color:C.ink, marginBottom:'4px' }}>Featured Premium Traditional Wear</h3>
              <p style={{ fontSize:'14px', color:C.muted }}>Hand-picked excellence from the heart of Rabat</p>
            </div>
            <a href="#" style={{ fontSize:'12px', ...UB, color:C.mint, textDecoration:'none' }}>Explore All →</a>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'20px' }}>
            {featuredItems.map((item,i)=><FeaturedCard key={i} {...item} />)}
          </div>
        </section>

        {/* ══ 8. IMMO PRO BANNER ══════════════════════════════ */}
        <section style={{ marginBottom:'64px' }}>
          <div style={{ position:'relative', height:'320px', borderRadius:'40px', overflow:'hidden', cursor:'pointer', boxShadow:'0 20px 60px rgba(0,0,0,0.15)' }}>
            <img src={I.immo} alt="Immo Pro" style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover' }} />
            <div style={{ position:'absolute', inset:0, background:'linear-gradient(to right, rgba(22,29,27,0.9) 0%, rgba(22,29,27,0.4) 65%, transparent)' }} />
            <div style={{ position:'absolute', inset:0, display:'flex', flexDirection:'column' as const, justifyContent:'center', padding:'0 64px' }}>
              <span style={{ backgroundColor:C.mintDk, color:'white', fontSize:'9px', ...UB, padding:'5px 14px', borderRadius:'100px', textTransform:'uppercase' as const, letterSpacing:'0.12em', display:'inline-block', marginBottom:'18px', width:'fit-content' }}>SouKni Immo Pro</span>
              <h2 style={{ fontSize:'clamp(28px,4vw,44px)', ...UB, color:'white', marginBottom:'24px', lineHeight:1.1 }}>Find Your Dream Villa<br/>in Rabat</h2>
              <button style={{ backgroundColor:'white', color:C.ink, border:'none', padding:'14px 32px', borderRadius:'100px', fontSize:'12px', ...UB, cursor:'pointer', width:'fit-content', transition:'all 0.2s' }}
                onMouseEnter={e=>{e.currentTarget.style.backgroundColor=C.mint}}
                onMouseLeave={e=>{e.currentTarget.style.backgroundColor='white'}}
              >Explore Listings</button>
            </div>
          </div>
        </section>

        {/* ══ 9. EXCLUSIVE DESIGNER COLLECTION (BENTO) ════════ */}
        <section style={{ marginBottom:'64px' }}>
          <h2 style={{ fontSize:'clamp(22px,3vw,32px)', ...UB, color:C.ink, marginBottom:'28px' }}>Exclusive Designer Collection</h2>
          <div style={{ display:'grid', gridTemplateColumns:'2fr 1fr', gap:'16px', height:'560px' }}>
            <div style={{ position:'relative', borderRadius:'32px', overflow:'hidden', cursor:'pointer' }}>
              <img src={I.designer} alt="Golden Zahra" style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover', transition:'transform 0.7s' }}
                onMouseEnter={e=>e.currentTarget.style.transform='scale(1.05)'}
                onMouseLeave={e=>e.currentTarget.style.transform='scale(1)'}
              />
              <div style={{ position:'absolute', inset:0, background:'linear-gradient(180deg, transparent 30%, rgba(0,0,0,0.85) 100%)' }} />
              <div style={{ position:'absolute', bottom:0, left:0, right:0, padding:'40px' }}>
                <span style={{ color:C.mint, fontSize:'10px', ...UB, textTransform:'uppercase' as const, letterSpacing:'0.2em', marginBottom:'12px', display:'block' }}>Designer of the Month</span>
                <h3 style={{ fontSize:'clamp(28px,3vw,40px)', ...UB, color:'white', marginBottom:'24px', lineHeight:1.15 }}>The Golden Zahra Collection</h3>
                <button style={{ backgroundColor:C.mintDk, color:'white', border:'none', padding:'14px 32px', borderRadius:'100px', fontSize:'11px', ...UB, cursor:'pointer' }}>View Exclusive Pieces</button>
              </div>
            </div>
            <div style={{ display:'flex', flexDirection:'column' as const, gap:'16px' }}>
              {[
                { img:I.kaftan, title:'Contemporary Kaftan', sub:'Modern cuts by Sofia El Arabi', price:3900 },
                { img:I.belgha, title:'Artisan Belgha',      sub:'Hand-stitched in the Old Medina', price:850 },
              ].map((item,i)=>{
                const [hov, setHov] = useState(false)
                return (
                  <div key={i} onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
                    style={{ flex:1, backgroundColor:'white', borderRadius:'24px', overflow:'hidden', border:`1px solid ${hov?C.mint:'rgba(186,202,197,0.12)'}`, transition:'all 0.3s', cursor:'pointer', display:'flex', flexDirection:'column' as const }}>
                    <div style={{ height:'180px', overflow:'hidden' }}>
                      <img src={item.img} alt={item.title} style={{ width:'100%', height:'100%', objectFit:'cover', transition:'transform 0.5s', transform:hov?'scale(1.05)':'scale(1)' }} />
                    </div>
                    <div style={{ padding:'18px 20px' }}>
                      <h4 style={{ fontSize:'17px', ...CB, color:hov?C.mint:C.ink, marginBottom:'3px', transition:'color 0.2s' }}>{item.title}</h4>
                      <p style={{ fontSize:'12px', color:C.muted, ...CB, marginBottom:'8px' }}>{item.sub}</p>
                      <span style={{ fontSize:'18px', ...CB, color:C.mint }}>{item.price.toLocaleString()} MAD</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ══ 10. AUTO PRO BANNER ══════════════════════════════ */}
        <section style={{ marginBottom:'64px' }}>
          <div style={{ position:'relative', height:'320px', borderRadius:'40px', overflow:'hidden', cursor:'pointer', boxShadow:'0 20px 60px rgba(0,0,0,0.15)' }}>
            <img src={I.auto} alt="Auto Pro" style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover' }} />
            <div style={{ position:'absolute', inset:0, background:'linear-gradient(to right, rgba(22,29,27,0.9) 0%, rgba(22,29,27,0.4) 65%, transparent)' }} />
            <div style={{ position:'absolute', inset:0, display:'flex', flexDirection:'column' as const, justifyContent:'center', padding:'0 64px' }}>
              <span style={{ backgroundColor:'#8d4f00', color:'white', fontSize:'9px', ...UB, padding:'5px 14px', borderRadius:'100px', textTransform:'uppercase' as const, letterSpacing:'0.12em', display:'inline-block', marginBottom:'18px', width:'fit-content' }}>SouKni Auto Pro</span>
              <h2 style={{ fontSize:'clamp(28px,4vw,44px)', ...UB, color:'white', marginBottom:'24px', lineHeight:1.1 }}>Premium Vehicles.<br/>Certified Sellers.</h2>
              <button style={{ backgroundColor:'white', color:C.ink, border:'none', padding:'14px 32px', borderRadius:'100px', fontSize:'12px', ...UB, cursor:'pointer', width:'fit-content' }}>Browse Inventory</button>
            </div>
          </div>
        </section>

        {/* ══ 11. DISCOVERY ROWS ═══════════════════════════════ */}
        <section style={{ marginBottom:'64px' }}>
          <h2 style={{ fontSize:'clamp(18px,2.5vw,24px)', ...UB, color:C.ink, marginBottom:'8px' }}>Exquisite Traditional Wear Discoveries</h2>
          <p style={{ fontSize:'14px', color:C.muted, marginBottom:'28px' }}>Discover Rabat's finest traditional fashion selections</p>
          <div style={{ display:'flex', flexDirection:'column' as const, gap:'16px' }}>
            {[discRow1,discRow2,discRow3,discRow4].map((row,ri)=>(
              <div key={ri} style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'16px' }}>
                {row.map((item:any)=><DiscoveryCard key={item.id} {...item} />)}
              </div>
            ))}
          </div>
        </section>

        {/* ══ 12. DIAMOND MEMBER BANNER ════════════════════════ */}
        <section style={{ marginBottom:'64px' }}>
          <div style={{ background:`linear-gradient(135deg, ${C.mintDk} 0%, ${C.mint} 100%)`, padding:'64px 72px', borderRadius:'48px', boxShadow:`0 24px 64px ${C.mint}30`, position:'relative' as const, overflow:'hidden', display:'flex', alignItems:'center', justifyContent:'space-between', gap:'40px', flexWrap:'wrap' as const }}>
            <div style={{ position:'absolute', right:'-80px', bottom:'-80px', width:'380px', height:'380px', backgroundColor:'rgba(255,255,255,0.1)', borderRadius:'50%', filter:'blur(60px)' }} />
            <div style={{ maxWidth:'600px', position:'relative', zIndex:1 }}>
              <h2 style={{ fontSize:'clamp(28px,4vw,44px)', ...UB, color:'white', marginBottom:'18px', lineHeight:1.15 }}>Become a Diamond Member</h2>
              <p style={{ fontSize:'18px', color:'rgba(255,255,255,0.9)', lineHeight:1.6 }}>Get priority listing placement, verified badges, and access to the SouKni Concierge service for exclusive fashion finds.</p>
            </div>
            <button style={{ backgroundColor:'white', color:C.mintDk, border:'none', padding:'18px 56px', borderRadius:'100px', fontSize:'14px', ...UB, cursor:'pointer', boxShadow:'0 8px 24px rgba(0,0,0,0.15)', transition:'transform 0.2s', position:'relative' as const, zIndex:1 }}
              onMouseEnter={e=>e.currentTarget.style.transform='scale(1.04)'}
              onMouseLeave={e=>e.currentTarget.style.transform='scale(1)'}
            >Learn More</button>
          </div>
        </section>

        {/* ══ 13. JUST ARRIVED ═════════════════════════════════ */}
        <section style={{ marginBottom:'64px' }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'28px' }}>
            <h2 style={{ fontSize:'clamp(18px,2.5vw,24px)', ...UB, color:C.ink }}>Just Arrived: Fresh New Listings</h2>
            <a href="#" style={{ fontSize:'12px', ...UB, color:C.mint, textDecoration:'none' }}>See All Recent</a>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'20px' }}>
            {freshItems.map((item,i)=><FreshCard key={i} {...item} />)}
          </div>
        </section>

        {/* ══ 14. PAGINATION ═══════════════════════════════════ */}
        <div style={{ display:'flex', justifyContent:'center', alignItems:'center', gap:'10px', marginBottom:'80px' }}>
          <button style={{ width:'44px', height:'44px', borderRadius:'12px', backgroundColor:'white', border:'1px solid rgba(107,122,118,0.12)', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', color:C.muted }}><ChevronLeft size={18} /></button>
          {[1,2,3].map(p=>(
            <button key={p} onClick={()=>setPage(p)}
              style={{ width:'44px', height:'44px', borderRadius:'12px', cursor:'pointer', fontSize:'15px', ...UB, border:'1px solid', transition:'all 0.2s',
                backgroundColor: page===p ? C.mint : 'white',
                color:           page===p ? C.ink  : C.muted,
                borderColor:     page===p ? C.mint : 'rgba(107,122,118,0.12)',
              }}
            >{p}</button>
          ))}
          <button style={{ width:'44px', height:'44px', borderRadius:'12px', backgroundColor:'white', border:'1px solid rgba(107,122,118,0.12)', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', color:C.muted }}><ChevronRight size={18} /></button>
        </div>

        {/* ══ 15. APP DOWNLOAD BANNER ══════════════════════════ */}
        <div style={{ backgroundColor:C.mint, borderRadius:'40px', padding:'56px 64px', display:'flex', alignItems:'center', justifyContent:'space-between', gap:'48px', position:'relative' as const, overflow:'hidden', flexWrap:'wrap' as const }}>
          <div style={{ position:'absolute', right:'-60px', bottom:'-60px', width:'300px', height:'300px', backgroundColor:'rgba(22,29,27,0.08)', borderRadius:'50%' }} />
          <div style={{ position:'relative', zIndex:1, maxWidth:'520px' }}>
            <h2 style={{ fontSize:'clamp(26px,3.5vw,40px)', ...UB, color:C.ink, marginBottom:'14px', lineHeight:1.05 }}>Download the App,<br/>Join The SouKni Family</h2>
            <p style={{ fontSize:'16px', color:`${C.ink}b3`, marginBottom:'32px', lineHeight:1.6 }}>Experience the future of Moroccan luxury commerce. Faster browsing, instant notifications, and exclusive app-only collections.</p>
            <div style={{ display:'flex', gap:'14px', flexWrap:'wrap' as const }}>
              {['📱 App Store','▶ Google Play'].map(app=>(
                <button key={app} style={{ height:'52px', minWidth:'160px', backgroundColor:C.ink, color:'white', border:'none', borderRadius:'14px', fontSize:'10px', ...UB, textTransform:'uppercase' as const, letterSpacing:'0.1em', cursor:'pointer', transition:'transform 0.15s' }}
                  onMouseEnter={e=>e.currentTarget.style.transform='scale(1.04)'}
                  onMouseLeave={e=>e.currentTarget.style.transform='scale(1)'}
                >{app}</button>
              ))}
            </div>
          </div>
          <div style={{ position:'relative', zIndex:1, width:'200px', aspectRatio:'9/17' as const, backgroundColor:C.ink, borderRadius:'40px', border:'6px solid rgba(255,255,255,0.2)', overflow:'hidden', boxShadow:'0 32px 80px rgba(0,0,0,0.28)', flexShrink:0 }}>
            <img src={I.a1} alt="App" style={{ width:'100%', height:'100%', objectFit:'cover', opacity:0.7 }} />
          </div>
        </div>
      </div>

      {/* ══ 16. FOOTER ═══════════════════════════════════════ */}
      <FashionFooter />

    </div>
  )
}