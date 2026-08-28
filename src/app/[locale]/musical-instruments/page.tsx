'use client'

import { useState, useMemo, useEffect } from 'react'
import React from 'react'
import { createPortal } from 'react-dom'
import { Heart, Search, ChevronDown, ChevronLeft, ChevronRight, SlidersHorizontal, MapPin, Plus } from 'lucide-react'
import Link from 'next/link'
import { useListings } from '@/hooks/useListings'
import WhatsAppButton from '@/components/ui/WhatsAppButton'
import Breadcrumb from '@/components/ui/Breadcrumb'
import { useFavorites } from '@/hooks/useFavorites'

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
  hero:   'https://images.pexels.com/photos/164938/pexels-photo-164938.jpeg?auto=compress&w=1600',
  g1:     'https://images.pexels.com/photos/164938/pexels-photo-164938.jpeg?auto=compress&w=400',
  g2:     'https://images.pexels.com/photos/1407322/pexels-photo-1407322.jpeg?auto=compress&w=400',
  g3:     'https://images.pexels.com/photos/995301/pexels-photo-995301.jpeg?auto=compress&w=400',
  g4:     'https://images.pexels.com/photos/1246437/pexels-photo-1246437.jpeg?auto=compress&w=400',
  g5:     'https://images.pexels.com/photos/2479312/pexels-photo-2479312.jpeg?auto=compress&w=400',
  bento1: 'https://images.pexels.com/photos/164938/pexels-photo-164938.jpeg?auto=compress&w=900',
  bento2: 'https://images.pexels.com/photos/1407322/pexels-photo-1407322.jpeg?auto=compress&w=600',
  bento3: 'https://images.pexels.com/photos/995301/pexels-photo-995301.jpeg?auto=compress&w=600',
  bento4: 'https://images.pexels.com/photos/1246437/pexels-photo-1246437.jpeg?auto=compress&w=600',
  immo:   'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&w=1200',
  auto:   'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&w=1200',
}

type BadgeT = 'certified'|'diamond'|'featured'|'new'
function Badge({ type }: { type: BadgeT }) {
  const map: Record<BadgeT,{bg:string;color:string;label:string}> = {
    certified:{ bg:C.mint,   color:C.ink,  label:'SouKni Certified' },
    diamond:  { bg:C.ink,    color:C.mint, label:'◆ DIAMOND'        },
    featured: { bg:'#fbbf24',color:C.ink,  label:'Featured'         },
    new:      { bg:C.mint, color:'white', label:'New Arrival'     },
  }
  const s = map[type]
  return (
    <span style={{ backgroundColor:s.bg, color:s.color, fontSize:'8px', ...CB, padding:'4px 10px', borderRadius:'6px', textTransform:'uppercase' as const, letterSpacing:'0.08em', display:'inline-block', boxShadow:'0 2px 6px rgba(0,0,0,0.15)', whiteSpace:'nowrap' as const }}>
      {s.label}
    </span>
  )
}

function FeaturedCard({ id, brand, title, price, location, img, badges, condition, phone }: any) {
  const [hov, setHov]     = useState(false)
  const { isFavorited, toggleFavorite } = useFavorites()
  const saved = isFavorited(id)
  return (
    <div onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{ backgroundColor:'white', borderRadius:'24px', border:`1px solid ${hov?C.mint:'rgba(107,122,118,0.1)'}`, boxShadow:hov?`0 20px 40px ${C.mint}18`:'0 2px 8px rgba(0,0,0,0.04)', overflow:'hidden', transition:'all 0.3s', cursor:'pointer' }}>
      <div style={{ position:'relative', aspectRatio:'1/1', overflow:'hidden', backgroundColor:C.cream }}>
        <img src={img} alt={title} style={{ width:'100%', height:'100%', objectFit:'cover', transition:'transform 0.7s', transform:hov?'scale(1.1)':'scale(1)' }} />
        <div style={{ position:'absolute', top:'12px', left:'12px', display:'flex', flexDirection:'column' as const, gap:'5px' }}>
          {badges?.map((b:string)=><Badge key={b} type={b as BadgeT} />)}
        </div>
        <button onClick={e=>{e.stopPropagation();toggleFavorite(id)}} style={{ position:'absolute', top:'10px', right:'10px', width:'32px', height:'32px', borderRadius:'50%', backgroundColor:'rgba(255,255,255,0.85)', border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}>
          <Heart size={14} fill={saved?'#ef4444':'none'} color={saved?'#ef4444':C.muted} />
        </button>
        {condition && <div style={{ position:'absolute', bottom:'10px', left:'10px', backgroundColor:'rgba(255,255,255,0.92)', padding:'3px 8px', borderRadius:'6px', fontSize:'9px', ...CB, color:C.mint, textTransform:'uppercase' as const }}>{condition}</div>}
      </div>
      <div style={{ padding:'18px 20px' }}>
        <p style={{ fontSize:'9px', ...CB, color:C.mint, textTransform:'uppercase' as const, letterSpacing:'0.1em', marginBottom:'3px' }}>{brand}</p>
        <h4 style={{ fontSize:'14px', ...CB, color:hov?C.mint:C.ink, marginBottom:'4px', transition:'color 0.2s', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' as const }}>{title}</h4>
        <p style={{ fontSize:'20px', ...CB, color:C.mint, marginBottom:'4px' }}>{price.toLocaleString()} MAD</p>
        {location && <p style={{ fontSize:'10px', color:C.muted, ...CB, display:'flex', alignItems:'center', gap:'3px', marginBottom:'14px' }}><MapPin size={10}/>{location}</p>}
        <div style={{ display:'flex', gap:'8px' }}>
          <button style={{ flex:1, border:`2px solid ${C.mint}`, color:C.ink, backgroundColor:'transparent', padding:'10px', borderRadius:'12px', fontSize:'10px', ...CB, textTransform:'uppercase' as const, cursor:'pointer', transition:'all 0.15s' }}
            onMouseEnter={e=>e.currentTarget.style.backgroundColor=C.mint}
            onMouseLeave={e=>e.currentTarget.style.backgroundColor='transparent'}
          >Message</button>
          <WhatsAppButton phone={phone} title={title} style={{ flex:1, padding:'10px', borderRadius:'12px', fontSize:'10px', textTransform:'uppercase' as const }}>💬 WhatsApp</WhatsAppButton>
        </div>
      </div>
    </div>
  )
}

function GridCard({ id, brand, title, price, img, badge, condition, phone }: any) {
  const { isFavorited, toggleFavorite } = useFavorites()
  const saved = isFavorited(id)
  const [hov,   setHov  ] = useState(false)
  return (
    <div onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{ backgroundColor:'white', borderRadius:'28px', border:`1px solid ${hov?C.mint:'rgba(107,122,118,0.1)'}`, boxShadow:hov?`0 16px 40px ${C.mint}18`:'0 2px 8px rgba(0,0,0,0.04)', overflow:'hidden', transition:'all 0.3s', cursor:'pointer' }}>
      <div style={{ position:'relative', aspectRatio:'1/1', overflow:'hidden', backgroundColor:C.cream }}>
        <img src={img} alt={title} style={{ width:'100%', height:'100%', objectFit:'cover', transition:'transform 0.7s', transform:hov?'scale(1.1)':'scale(1)' }} />
        <div style={{ position:'absolute', top:'10px', left:'10px' }}><Badge type={badge as BadgeT} /></div>
        <button onClick={e=>{e.stopPropagation();toggleFavorite(id)}} style={{ position:'absolute', top:'8px', right:'8px', width:'28px', height:'28px', borderRadius:'50%', backgroundColor:'rgba(255,255,255,0.85)', border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}>
          <Heart size={12} fill={saved?'#ef4444':'none'} color={saved?'#ef4444':C.muted} />
        </button>
        {condition && <div style={{ position:'absolute', bottom:'8px', left:'8px', backgroundColor:'rgba(255,255,255,0.92)', padding:'2px 6px', borderRadius:'5px', fontSize:'8px', ...CB, color:C.mint, textTransform:'uppercase' as const }}>{condition}</div>}
      </div>
      <div style={{ padding:'14px 16px' }}>
        <p style={{ fontSize:'9px', ...CB, color:C.muted, textTransform:'uppercase' as const, letterSpacing:'0.08em', marginBottom:'2px' }}>{brand}</p>
        <h4 style={{ fontSize:'12px', ...CB, color:hov?C.mint:C.ink, marginBottom:'8px', transition:'color 0.2s', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' as const }}>{title}</h4>
        <p style={{ fontSize:'14px', ...CB, color:C.mint, marginBottom:'10px' }}>{price.toLocaleString()} MAD</p>
        <div style={{ display:'flex', gap:'6px' }}>
          <button style={{ flex:1, border:`1px solid rgba(107,122,118,0.2)`, color:C.muted, backgroundColor:'transparent', padding:'7px', borderRadius:'10px', fontSize:'9px', ...CB, textTransform:'uppercase' as const, cursor:'pointer', transition:'all 0.15s' }}
            onMouseEnter={e=>{e.currentTarget.style.borderColor=C.mint;e.currentTarget.style.color=C.mint}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor='rgba(107,122,118,0.2)';e.currentTarget.style.color=C.muted}}
          >Message</button>
          <WhatsAppButton phone={phone} title={title} style={{ flex:1, backgroundColor:C.mint, color:C.ink, padding:'7px', borderRadius:'10px', fontSize:'9px', textTransform:'uppercase' as const }}>WhatsApp</WhatsAppButton>
        </div>
      </div>
    </div>
  )
}

function BentoSideCard({ img, title, sub, price }: { img:string; title:string; sub:string; price:number }) {
  const [hov, setHov] = useState(false)
  return (
    <div onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{ flex:1, backgroundColor:'white', borderRadius:'24px', overflow:'hidden', border:`1px solid ${hov?C.mint:'rgba(186,202,197,0.12)'}`, transition:'all 0.3s', cursor:'pointer', display:'flex', flexDirection:'column' as const }}>
      <div style={{ height:'180px', overflow:'hidden' }}>
        <img src={img} alt={title} style={{ width:'100%', height:'100%', objectFit:'cover', transition:'transform 0.5s', transform:hov?'scale(1.05)':'scale(1)' }} />
      </div>
      <div style={{ padding:'18px 20px' }}>
        <h4 style={{ fontSize:'17px', ...CB, color:hov?C.mint:C.ink, marginBottom:'3px', transition:'color 0.2s' }}>{title}</h4>
        <p style={{ fontSize:'12px', color:C.muted, ...CB, marginBottom:'8px' }}>{sub}</p>
        <span style={{ fontSize:'18px', ...CB, color:C.mint }}>{price.toLocaleString()} MAD</span>
      </div>
    </div>
  )
}

const featuredItems = [
  { brand:'Gibson',   title:'Les Paul Standard 2019 Sunburst', price:18500, location:'Agdal, Rabat',    img:I.g1, badges:['featured','diamond'],   condition:'Excellent' },
  { brand:'Steinway', title:'Model M Grand Piano Ebony',       price:285000,location:'Souissi, Rabat',  img:I.g2, badges:['featured','certified'], condition:'Like New'  },
  { brand:'Yamaha',   title:'C7X Concert Grand Piano',         price:165000,location:'Rabat Centre',    img:I.g3, badges:['featured','diamond'],   condition:'Good'      },
  { brand:'Martin',   title:'D-28 Acoustic Guitar 1972',       price:32000, location:'Hay Riad, Rabat', img:I.g4, badges:['featured','new'],       condition:'Very Good' },
]

function makeGrid(count: number) {
  const brands = ['Gibson','Fender','Yamaha','Roland','Steinway','Martin','Taylor','Ibanez','Pearl','DW','Korg','Shure']
  const titles = ['Les Paul Classic','Stratocaster American','DGX-670 Digital','FP-90X Stage Piano','Baby Grand','000-15M Acoustic','Academy 12 Grand','RG550 Genesis','Export Rock','Collector Series','PA4X Pro','SM58 Vocal']
  const imgs   = [I.g1,I.g2,I.g3,I.g4,I.g5]
  const conds  = ['Like New','Excellent','Good','Very Good',undefined]
  const badges: BadgeT[] = ['certified','diamond','featured','new','certified']
  return Array.from({length:count},(_,i)=>({
    brand:     brands[i%brands.length],
    title:     titles[i%titles.length],
    price:     1200 + ((i*2731)%45000),
    img:       imgs[i%imgs.length],
    condition: conds[i%conds.length],
    badge:     badges[i%badges.length],
  }))
}
const gridItems = makeGrid(16)

const CATS = [
  { label:'All Instruments', slug:'all-instruments' },
  { label:'Guitars',         slug:'guitars'         },
  { label:'Pianos & Keys',   slug:'pianos'          },
  { label:'Drums & Perc.',   slug:'drums'           },
  { label:'Wind & Brass',    slug:'wind'            },
  { label:'String & Bowed',  slug:'strings'         },
  { label:'Traditional',     slug:'traditional'     },
  { label:'Studio & DJ',     slug:'studio'          },
]


function DDrop({ label, value, options, open, setOpen, onChange, heroStyle }: any) {
  const btnRef = React.useRef<HTMLButtonElement>(null)
  const [pos, setPos] = React.useState({ top:0, left:0, width:0 })
  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => { setMounted(true) }, [])
  React.useEffect(() => {
    if (!open) return
    const measure = () => {
      if (btnRef.current) {
        const rect = btnRef.current.getBoundingClientRect()
        setPos({ top: rect.bottom + 8, left: rect.left, width: rect.width })
      }
    }
    measure()
    const closeOnScroll = () => setOpen(false)
    window.addEventListener('scroll', closeOnScroll, true)
    window.addEventListener('resize', measure)
    return () => {
      window.removeEventListener('scroll', closeOnScroll, true)
      window.removeEventListener('resize', measure)
    }
  }, [open])

  const dropdown = open && mounted ? createPortal(
    <>
      <div onClick={()=>setOpen(false)} style={{ position:'fixed', inset:0, zIndex:99998 }} />
      <div style={{ position:'fixed', top:pos.top, left:pos.left, minWidth:Math.max(pos.width,200), maxHeight:'320px', overflowY:'auto' as const, backgroundColor:'white', borderRadius:'16px', boxShadow:'0 16px 48px rgba(0,0,0,0.2)', border:'1px solid rgba(107,122,118,0.1)', zIndex:99999, padding:'6px 0' }}>
        {options.map((opt:string)=>(
          <button key={opt} onClick={()=>{ onChange(opt); setOpen(false) }}
            style={{ width:'100%', padding:'10px 18px', background:'none', border:'none', cursor:'pointer', textAlign:'left' as const, fontSize:'13px', fontFamily:'Inter,sans-serif', fontWeight:900, color:opt===value?'#22d4a8':'#161d1b', display:'flex', justifyContent:'space-between', alignItems:'center' }}
            onMouseEnter={e=>e.currentTarget.style.backgroundColor='#f4fbf8'}
            onMouseLeave={e=>e.currentTarget.style.backgroundColor='transparent'}
          >{opt}{opt===value&&<span style={{color:'#22d4a8'}}>✓</span>}</button>
        ))}
      </div>
    </>, document.body
  ) : null

  return (
    <div style={{ position:'relative', flex:1 }}>
      <button ref={btnRef} onClick={(e)=>{ e.stopPropagation(); setOpen(!open) }}
        style={heroStyle
          ? { background:'none', border:'none', cursor:'pointer', padding:0, display:'flex', alignItems:'center', gap:'6px', color:'white', fontSize:'14px', fontFamily:'Inter,sans-serif', fontWeight:900 }
          : { width:'100%', height:'100%', background:'none', border:'none', cursor:'pointer', padding:'0 22px', display:'flex', flexDirection:'column' as const, justifyContent:'center', textAlign:'left' as const }}>
        {heroStyle ? (
          <>{value} <ChevronDown size={14} style={{ flexShrink:0, transition:'transform 0.2s', transform:open?'rotate(180deg)':'rotate(0)' }} /></>
        ) : (
          <>
            <span style={{ fontSize:'9px', fontFamily:'Inter,sans-serif', fontWeight:900, letterSpacing:'0.14em', textTransform:'uppercase' as const, color:'#6b7a76', marginBottom:'3px' }}>{label}</span>
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
              <span style={{ fontSize:'14px', fontFamily:'Inter,sans-serif', fontWeight:900, color:'#161d1b' }}>{value}</span>
              <ChevronDown size={14} color="#22d4a8" style={{ flexShrink:0, transition:'transform 0.2s', transform:open?'rotate(180deg)':'rotate(0)' }} />
            </div>
          </>
        )}
      </button>
      {dropdown}
    </div>
  )
}

export default function MusicalInstrumentsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale }                      = React.use(params)
  const [activeSeller, setActiveSeller] = useState('All Sellers')
  const [diamond,      setDiamond     ] = useState(true)
  const [gridView,     setGridView    ] = useState(true)
  const [page,         setPage        ] = useState(1)
  const [keyword,      setKeyword     ] = useState('')
  const [city,         setCity        ] = useState('Rabat')
  const [neighborhood, setNeighborhood] = useState('All Neighborhoods')
  const [price,        setPrice       ] = useState('Any Price')
  const [cityOpen,     setCityOpen    ] = useState(false)
  const [heroCityOpen, setHeroCityOpen] = useState(false)
  const [neighOpen,    setNeighOpen   ] = useState(false)
  const [priceOpen,    setPriceOpen   ] = useState(false)
  const [applied, setApplied]         = useState({ keyword:'' })

  function applySearch() {
    setApplied({ keyword })
    setTimeout(() => {
      document.getElementById('instruments-results')?.scrollIntoView({ behavior:'smooth', block:'start' })
    }, 50)
  }

  const { fetchListings } = useListings()
  const [dbListings, setDbListings] = useState<any[]>([])

  useEffect(() => {
    const t = setTimeout(() => {
      fetchListings({ category: 'musical-instruments', sortBy: 'newest', limit: 20 }).then(rows => setDbListings(rows || []))
    }, 400)
    return () => clearTimeout(t)
  }, [])

  const realFeaturedItems = dbListings.length >= 4 ? dbListings.slice(0, 4).map(row => ({
    id:        row.id,
    brand:     row.brand || '',
    title:     row.title,
    price:     (row.price || 0) / 100,
    location:  row.city || '',
    img:       (row.images && row.images[0]) || I.g1,
    badges:    row.badge ? [row.badge] : ['certified'],
    condition: row.condition || undefined,
    phone:     row.profiles?.phone,
  })) : featuredItems

  const realGridItems = dbListings.length >= 20 ? dbListings.slice(4, 20).map(row => ({
    id:        row.id,
    brand:     row.brand || '',
    title:     row.title,
    price:     (row.price || 0) / 100,
    img:       (row.images && row.images[0]) || I.g1,
    condition: row.condition || undefined,
    badge:     row.badge || 'certified',
    phone:     row.profiles?.phone,
  })) : gridItems

  const filteredItems = React.useMemo(() => {
    let items = [...realGridItems]
    if (applied.keyword.trim()) {
      items = items.filter(item =>
        item.title.toLowerCase().includes(applied.keyword.toLowerCase()) ||
        item.brand.toLowerCase().includes(applied.keyword.toLowerCase())
      )
    }
    if (city && city !== 'Rabat') {
      items = items.filter(item => (item as any).location && (item as any).location.toLowerCase().includes(city.toLowerCase()))
    }
    if (activeSeller !== 'All Sellers') {
      items = items.filter(item => (item as any).seller === activeSeller)
    }
    if (diamond) {
      items = [...items].sort((a,b)=>{ const r=(x:string)=>x==='diamond'?2:x==='certified'?1:0; return r(b.badge)-r(a.badge) })
    }
    if (price !== 'Any Price') {
      const nums = price.replace(/,/g,'').match(/\d+/g)?.map(Number) || []
      items = items.filter(item => price.includes('+') ? item.price >= nums[0] : item.price >= nums[0] && item.price <= nums[1])
    }
    return items
  }, [applied, activeSeller, diamond, city, price, realGridItems])

  const PAGE_SIZE = 12
  const totalPages = Math.max(1, Math.ceil(filteredItems.length / PAGE_SIZE))
  const paginatedItems = filteredItems.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
  React.useEffect(() => { setPage(1) }, [filteredItems])

  const cities        = ['Rabat','Casablanca','Marrakech','Fès','Tanger','Agadir','Meknès']
  const neighborhoodMap: Record<string,string[]> = {
    'Rabat':       ['All Neighborhoods','Agdal','Hay Riad','Hassan','Souissi','Médina','Océan','Aviation'],
    'Casablanca':  ['All Neighborhoods','Maârif','Anfa','Gauthier','Racine','Palmier','Ain Diab','Bourgogne','Belvédère'],
    'Marrakech':   ['All Neighborhoods','Guéliz','Hivernage','Médina','Palmeraie','Daoudiate','Targa','Agdal'],
    'Fès':         ['All Neighborhoods','Médina','Ville Nouvelle','Narjiss','Bensouda','Atlas','Oued Fès'],
    'Tanger':      ['All Neighborhoods','Malabata','Marshan','Boukhalef','Centre Ville','Médina','Kasbah'],
    'Agadir':      ['All Neighborhoods','Talborjt','Secteur Touristique','Founty','Anza','Bensergao'],
    'Meknès':      ['All Neighborhoods','Hamria','Ismaïlia','Marjane','Médina','Bassatine'],
  }
  const neighborhoods = neighborhoodMap[city] || ['All Neighborhoods']
  const priceRanges   = ['Any Price','0 – 1,000 MAD','1,000 – 5,000 MAD','5,000 – 20,000 MAD','20,000 – 80,000 MAD','80,000+ MAD']

  // DDrop defined outside component


  return (
    <div style={{ ...UB, backgroundColor:C.surface, color:C.ink, minHeight:'100vh' }}>

      {/* ══ 1. HERO ══════════════════════════════════════════ */}
      <section style={{ position:'relative', height:'520px', display:'flex', alignItems:'center', justifyContent:'center', overflow:'hidden' }}>
        <img src={I.hero} alt="Musical Instruments" style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover' }} />
        <div style={{ position:'absolute', inset:0, backgroundColor:'rgba(22,29,27,0.52)' }} />
        <div style={{ position:'relative', zIndex:10, textAlign:'center' as const, maxWidth:'960px', padding:'0 24px', width:'100%' }}>
          <h1 style={{ fontSize:'clamp(36px,6vw,64px)', ...UB, color:'white', marginBottom:'36px', lineHeight:1, textShadow:'0 4px 20px rgba(0,0,0,0.4)' }}>
            MUSICAL INSTRUMENTS.<br/><span style={{ color:C.mint }}>PLAY YOUR BEST IN RABAT.</span>
          </h1>
          <div style={{ maxWidth:'780px', margin:'0 auto', backgroundColor:'rgba(255,255,255,0.12)', backdropFilter:'blur(12px)', border:'1px solid rgba(255,255,255,0.22)', borderRadius:'100px', padding:'8px', display:'flex', alignItems:'center' }}>
            <div style={{ flex:1, padding:'0 28px', borderRight:'1px solid rgba(255,255,255,0.22)', display:'flex', flexDirection:'column' as const, gap:'2px' }}>
              <span style={{ fontSize:'9px', ...UB, color:'rgba(255,255,255,0.62)', textTransform:'uppercase' as const, letterSpacing:'0.15em' }}>CITY</span>
              <DDrop label="" value={city} options={cities} open={heroCityOpen} setOpen={setHeroCityOpen}
                onChange={(v:string)=>{setCity(v);setNeighborhood('All Neighborhoods')}} heroStyle />
            </div>
            <div style={{ flex:2, padding:'0 28px', display:'flex', flexDirection:'column' as const, gap:'2px' }}>
              <span style={{ fontSize:'9px', ...UB, color:'rgba(255,255,255,0.62)', textTransform:'uppercase' as const, letterSpacing:'0.15em' }}>KEYWORD</span>
              <input type="text" value={keyword} onChange={e=>setKeyword(e.target.value)} onKeyDown={e=>e.key==='Enter'&&applySearch()} placeholder="Search brands, models, instruments..."
                style={{ backgroundColor:'transparent', border:'none', outline:'none', color:'white', fontSize:'14px', ...UB, fontFamily:'Inter,sans-serif', width:'100%' }} />
            </div>
            <button onClick={applySearch} style={{ backgroundColor:C.mint, color:C.ink, border:'none', padding:'16px 44px', borderRadius:'100px', fontSize:'11px', ...UB, textTransform:'uppercase' as const, letterSpacing:'0.12em', cursor:'pointer', transition:'filter 0.15s' }}
              onMouseEnter={e=>e.currentTarget.style.filter='brightness(1.08)'}
              onMouseLeave={e=>e.currentTarget.style.filter='brightness(1)'}
            >SEARCH</button>
          </div>
        </div>
      </section>

      {/* ══ 2. FILTER BAR ════════════════════════════════════ */}
      <div style={{ maxWidth:'1280px', margin:'-40px auto 0', padding:'0 24px', position:'relative', zIndex:30 }}>
        <div style={{ backgroundColor:'rgba(255,255,255,0.97)', backdropFilter:'blur(16px)', border:'1px solid rgba(107,122,118,0.12)', borderRadius:'100px', boxShadow:'0 12px 40px rgba(0,0,0,0.08)', display:'flex', alignItems:'stretch', height:'72px', overflow:'visible' }}>
          <DDrop label="CITY" value={city} options={cities} open={cityOpen} setOpen={setCityOpen} onChange={(v:string)=>{setCity(v);setNeighborhood('All Neighborhoods')}} />
          <div style={{ width:'1px', backgroundColor:'rgba(107,122,118,0.12)', margin:'12px 0' }} />
          <div style={{ flex:1.8, padding:'0 22px', display:'flex', flexDirection:'column' as const, justifyContent:'center' }}>
            <span style={{ fontSize:'9px', ...UB, textTransform:'uppercase' as const, letterSpacing:'0.14em', color:C.muted, marginBottom:'3px' }}>KEYWORD</span>
            <div style={{ display:'flex', alignItems:'center', gap:'8px' }}>
              <Search size={13} color={C.muted} />
              <input type="text" value={keyword} onChange={e=>setKeyword(e.target.value)} placeholder="e.g. Gibson, Yamaha, Grand Piano..."
                style={{ flex:1, background:'none', border:'none', outline:'none', fontSize:'14px', ...UB, color:C.ink, fontFamily:'Inter,sans-serif' }} />
              {keyword && <button onClick={()=>setKeyword('')} style={{ background:'none', border:'none', cursor:'pointer', color:C.muted, fontSize:'16px' }}>✕</button>}
            </div>
          </div>
          <div style={{ width:'1px', backgroundColor:'rgba(107,122,118,0.12)', margin:'12px 0' }} />
          <DDrop label="NEIGHBOURHOOD" value={neighborhood} options={neighborhoods} open={neighOpen} setOpen={setNeighOpen} onChange={setNeighborhood} />
          <div style={{ width:'1px', backgroundColor:'rgba(107,122,118,0.12)', margin:'12px 0' }} />
          <DDrop label="PRICE (MAD)" value={price} options={priceRanges} open={priceOpen} setOpen={setPriceOpen} onChange={setPrice} />
          <div style={{ width:'1px', backgroundColor:'rgba(107,122,118,0.12)', margin:'12px 0' }} />
          <button style={{ display:'flex', alignItems:'center', gap:'10px', padding:'0 28px', background:'none', border:'none', cursor:'pointer', borderRadius:'0 100px 100px 0', transition:'background 0.15s', flexShrink:0 }}
            onMouseEnter={e=>e.currentTarget.style.backgroundColor=`${C.mint}14`}
            onMouseLeave={e=>e.currentTarget.style.backgroundColor='transparent'}
          >
            <SlidersHorizontal size={18} color={C.mint} />
            <span style={{ fontSize:'14px', ...UB, color:C.ink }}>Filters</span>
          </button>
        </div>
      </div>

      <main style={{ maxWidth:'1280px', margin:'0 auto', padding:'32px 24px 80px' }}>

        {/* ══ 3. BREADCRUMB + TITLE + SORT ═════════════════════ */}
        <Breadcrumb
          items={[
            { label:'Home', href:`/${locale}` },
            { label:'The Vault', href:`/${locale}/vault` },
            { label:'Musical Instruments' },
          ]}
          mutedColor={C.muted}
          inkColor={C.ink}
        />
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', gap:'16px', marginBottom:'24px', flexWrap:'wrap' as const }}>
          <div>
            <h2 style={{ fontSize:'clamp(20px,2.5vw,28px)', ...UB, color:C.ink, marginBottom:'4px' }}>New and Pre-Owned Musical Instruments in Rabat</h2>
            <p style={{ fontSize:'14px', color:C.mint, ...CB }}>2,318 Ads in Rabat District</p>
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

        {/* ══ 4. CATEGORY PILLS + VIEW MORE ════════════════════ */}
        <div style={{ display:'flex', gap:'10px', flexWrap:'wrap' as const, marginBottom:'20px', alignItems:'center' }}>
          {CATS.map(cat=>(
            <Link key={cat.slug} href={`/${locale}/musical-instruments/${cat.slug}`}
              style={{ padding:'10px 22px', borderRadius:'100px', fontSize:'11px', ...UB, textTransform:'uppercase' as const, letterSpacing:'0.1em', cursor:'pointer', transition:'all 0.2s', border:'1px solid', textDecoration:'none', display:'inline-block',
                backgroundColor:'white', color:C.muted, borderColor:'rgba(186,202,197,0.4)',
              }}
              onMouseEnter={e=>{e.currentTarget.style.backgroundColor=C.mint;e.currentTarget.style.color=C.ink;e.currentTarget.style.borderColor=C.mint}}
              onMouseLeave={e=>{e.currentTarget.style.backgroundColor='white';e.currentTarget.style.color=C.muted;e.currentTarget.style.borderColor='rgba(186,202,197,0.4)'}}
            >{cat.label}</Link>
          ))}
          <button style={{ display:'flex', alignItems:'center', gap:'6px', padding:'10px 22px', borderRadius:'100px', fontSize:'11px', ...UB, textTransform:'uppercase' as const, letterSpacing:'0.1em', cursor:'pointer', transition:'all 0.2s', border:`1px solid ${C.mint}`, backgroundColor:'transparent', color:C.mint }}
            onMouseEnter={e=>{e.currentTarget.style.backgroundColor=C.mint;e.currentTarget.style.color=C.ink}}
            onMouseLeave={e=>{e.currentTarget.style.backgroundColor='transparent';e.currentTarget.style.color=C.mint}}
          ><Plus size={14} /> View More</button>
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

        {/* ══ 7. FEATURED PREMIUM INSTRUMENTS ══════════════════ */}
        <section style={{ marginBottom:'48px' }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'24px' }}>
            <div>
              <h3 style={{ fontSize:'clamp(18px,2.5vw,24px)', ...UB, color:C.ink, textTransform:'uppercase' as const, marginBottom:'4px' }}>Featured Premium Instruments</h3>
              <p style={{ fontSize:'14px', color:C.muted }}>Hand-picked professional gear from the world's top makers</p>
            </div>
            <a href="#" style={{ fontSize:'12px', ...UB, color:C.mint, textDecoration:'none' }}>View All Featured →</a>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'24px' }}>
            {realFeaturedItems.map((item,i)=><FeaturedCard key={i} {...item} />)}
          </div>
        </section>

        {/* ══ 8. IMMO PRO BANNER ═══════════════════════════════ */}
        <section style={{ marginBottom:'64px' }}>
          <div style={{ backgroundColor:C.ink, borderRadius:'40px', padding:'56px 64px', display:'flex', alignItems:'center', justifyContent:'space-between', position:'relative' as const, overflow:'hidden', minHeight:'240px', boxShadow:'0 16px 48px rgba(0,0,0,0.2)', flexWrap:'wrap' as const, gap:'24px' }}>
            <div style={{ position:'absolute', right:'-48px', bottom:'-48px', width:'320px', height:'320px', backgroundColor:`${C.mint}18`, borderRadius:'50%' }} />
            <div style={{ position:'absolute', right:'120px', top:'-60px', width:'200px', height:'200px', backgroundColor:`${C.mint}0a`, borderRadius:'50%' }} />
            <div style={{ position:'relative', zIndex:1, maxWidth:'480px' }}>
              <p style={{ fontSize:'11px', ...UB, color:C.mint, textTransform:'uppercase' as const, letterSpacing:'0.15em', marginBottom:'16px' }}>SOUKNI IMMO PRO</p>
              <h2 style={{ fontSize:'clamp(24px,3.5vw,38px)', ...UB, color:'white', marginBottom:'20px', lineHeight:1.1 }}>Find the perfect rehearsal space or studio in Rabat.</h2>
              <button style={{ backgroundColor:C.mint, color:C.ink, border:'none', padding:'16px 40px', borderRadius:'100px', fontSize:'11px', ...UB, textTransform:'uppercase' as const, letterSpacing:'0.12em', cursor:'pointer', transition:'transform 0.2s' }}
                onMouseEnter={e=>e.currentTarget.style.transform='scale(1.04)'}
                onMouseLeave={e=>e.currentTarget.style.transform='scale(1)'}
              >Explore Spaces</button>
            </div>
          </div>
        </section>

        {/* ══ 9. EXCLUSIVE COLLECTION BENTO ════════════════════ */}
        <section style={{ marginBottom:'64px' }}>
          <h3 style={{ fontSize:'clamp(20px,3vw,32px)', ...UB, color:C.ink, textTransform:'uppercase' as const, marginBottom:'32px' }}>Exclusive Instruments Collection</h3>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gridTemplateRows:'380px 380px', gap:'20px' }}>
            <div style={{ gridColumn:'1/3', gridRow:'1/3', backgroundColor:'white', borderRadius:'40px', overflow:'hidden', display:'flex', flexDirection:'column' as const, border:'1px solid rgba(107,122,118,0.1)' }}>
              <div style={{ flex:1, overflow:'hidden', position:'relative', minHeight:0 }}>
                <img src={I.bento1} alt="Gibson Les Paul" style={{ width:'100%', height:'100%', objectFit:'cover' }} />
                <div style={{ position:'absolute', top:'20px', left:'20px' }}>
                  <span style={{ backgroundColor:C.ink, color:C.mint, fontSize:'10px', ...CB, padding:'7px 16px', borderRadius:'100px', textTransform:'uppercase' as const, letterSpacing:'0.1em' }}>◆ DIAMOND MEMBER</span>
                </div>
              </div>
              <div style={{ padding:'24px 28px', flexShrink:0 }}>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'6px', gap:'12px' }}>
                  <div>
                    <p style={{ fontSize:'11px', ...CB, color:C.mint, textTransform:'uppercase' as const, letterSpacing:'0.1em', marginBottom:'3px' }}>GIBSON</p>
                    <h4 style={{ fontSize:'20px', ...CB, color:C.ink }}>Les Paul Standard 1959 Reissue</h4>
                  </div>
                  <span style={{ fontSize:'22px', ...CB, color:C.mint, flexShrink:0 }}>38,500 MAD</span>
                </div>
                <p style={{ fontSize:'13px', color:C.muted, ...CB, marginBottom:'16px' }}>Sunburst · Excellent condition · Original case · Rabat, Agdal</p>
                <div style={{ display:'flex', gap:'10px' }}>
                  <button style={{ flex:1, border:`2px solid rgba(107,122,118,0.2)`, color:C.ink, backgroundColor:'transparent', padding:'12px', borderRadius:'16px', fontSize:'11px', ...CB, textTransform:'uppercase' as const, cursor:'pointer', transition:'all 0.15s' }}
                    onMouseEnter={e=>{e.currentTarget.style.borderColor=C.mint;e.currentTarget.style.backgroundColor=`${C.mint}14`}}
                    onMouseLeave={e=>{e.currentTarget.style.borderColor='rgba(107,122,118,0.2)';e.currentTarget.style.backgroundColor='transparent'}}
                  >Message</button>
                  <WhatsAppButton phone={undefined} title="Les Paul Standard 1959 Reissue" style={{ flex:1, backgroundColor:C.mint, color:C.ink, padding:'12px', borderRadius:'16px', fontSize:'11px', textTransform:'uppercase' as const }}>💬 WhatsApp</WhatsAppButton>
                </div>
              </div>
            </div>
            <div style={{ gridColumn:'3', gridRow:'1', backgroundColor:'white', borderRadius:'32px', overflow:'hidden', display:'flex', flexDirection:'column' as const, border:'1px solid rgba(107,122,118,0.1)' }}>
              <div style={{ flex:1, overflow:'hidden', position:'relative', minHeight:0 }}>
                <img src={I.bento2} alt="Steinway" style={{ width:'100%', height:'100%', objectFit:'cover' }} />
                <div style={{ position:'absolute', top:'12px', left:'12px' }}>
                  <span style={{ backgroundColor:C.mint, color:C.ink, fontSize:'8px', ...CB, padding:'5px 12px', borderRadius:'100px', textTransform:'uppercase' as const }}>SOUKNI CERTIFIED</span>
                </div>
              </div>
              <div style={{ padding:'16px 18px', flexShrink:0 }}>
                <p style={{ fontSize:'9px', ...CB, color:C.mint, textTransform:'uppercase' as const, letterSpacing:'0.1em', marginBottom:'2px' }}>STEINWAY & SONS</p>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', gap:'6px', marginBottom:'10px' }}>
                  <h4 style={{ fontSize:'13px', ...CB, color:C.ink }}>Model M Baby Grand Piano</h4>
                  <span style={{ fontSize:'14px', ...CB, color:C.mint, flexShrink:0 }}>285,000 MAD</span>
                </div>
                <div style={{ display:'flex', gap:'6px' }}>
                  <button style={{ flex:1, border:`1px solid rgba(107,122,118,0.2)`, color:C.ink, backgroundColor:'transparent', padding:'8px', borderRadius:'12px', fontSize:'9px', ...CB, cursor:'pointer', transition:'border-color 0.15s' }}
                    onMouseEnter={e=>e.currentTarget.style.borderColor=C.mint}
                    onMouseLeave={e=>e.currentTarget.style.borderColor='rgba(107,122,118,0.2)'}
                  >Message</button>
                  <WhatsAppButton phone={undefined} title="Model M Baby Grand Piano" style={{ flex:1, backgroundColor:C.mint, color:C.ink, padding:'8px', borderRadius:'12px', fontSize:'9px' }}>WhatsApp</WhatsAppButton>
                </div>
              </div>
            </div>
            <div style={{ gridColumn:'4', gridRow:'1', backgroundColor:'white', borderRadius:'32px', overflow:'hidden', display:'flex', flexDirection:'column' as const, border:'1px solid rgba(107,122,118,0.1)' }}>
              <div style={{ flex:1, overflow:'hidden', position:'relative', minHeight:0 }}>
                <img src={I.bento3} alt="Fender" style={{ width:'100%', height:'100%', objectFit:'cover' }} />
                <div style={{ position:'absolute', top:'12px', left:'12px' }}>
                  <span style={{ backgroundColor:'#fbbf24', color:C.ink, fontSize:'8px', ...CB, padding:'5px 12px', borderRadius:'100px', textTransform:'uppercase' as const }}>Featured</span>
                </div>
              </div>
              <div style={{ padding:'16px 18px', flexShrink:0 }}>
                <p style={{ fontSize:'9px', ...CB, color:C.mint, textTransform:'uppercase' as const, letterSpacing:'0.1em', marginBottom:'2px' }}>FENDER</p>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', gap:'6px', marginBottom:'10px' }}>
                  <h4 style={{ fontSize:'13px', ...CB, color:C.ink }}>Custom Shop Stratocaster 1963</h4>
                  <span style={{ fontSize:'14px', ...CB, color:C.mint, flexShrink:0 }}>42,000 MAD</span>
                </div>
                <div style={{ display:'flex', gap:'6px' }}>
                  <button style={{ flex:1, border:`1px solid rgba(107,122,118,0.2)`, color:C.ink, backgroundColor:'transparent', padding:'8px', borderRadius:'12px', fontSize:'9px', ...CB, cursor:'pointer', transition:'border-color 0.15s' }}
                    onMouseEnter={e=>e.currentTarget.style.borderColor=C.mint}
                    onMouseLeave={e=>e.currentTarget.style.borderColor='rgba(107,122,118,0.2)'}
                  >Message</button>
                  <WhatsAppButton phone={undefined} title="Custom Shop Stratocaster 1963" style={{ flex:1, backgroundColor:C.mint, color:C.ink, padding:'8px', borderRadius:'12px', fontSize:'9px' }}>WhatsApp</WhatsAppButton>
                </div>
              </div>
            </div>
            <div style={{ gridColumn:'3/5', gridRow:'2', backgroundColor:'white', borderRadius:'32px', overflow:'hidden', display:'flex', flexDirection:'row' as const, border:'1px solid rgba(107,122,118,0.1)' }}>
              <div style={{ width:'50%', overflow:'hidden', position:'relative' }}>
                <img src={I.bento4} alt="Martin" style={{ width:'100%', height:'100%', objectFit:'cover' }} />
                <div style={{ position:'absolute', top:'12px', left:'12px' }}>
                  <span style={{ backgroundColor:C.mint, color:'white', fontSize:'8px', ...CB, padding:'5px 12px', borderRadius:'100px', textTransform:'uppercase' as const }}>New Arrival</span>
                </div>
              </div>
              <div style={{ flex:1, padding:'28px 32px', display:'flex', flexDirection:'column' as const, justifyContent:'center' }}>
                <p style={{ fontSize:'11px', ...CB, color:C.mint, textTransform:'uppercase' as const, letterSpacing:'0.1em', marginBottom:'6px' }}>MARTIN</p>
                <h4 style={{ fontSize:'18px', ...CB, color:C.ink, marginBottom:'6px' }}>D-28 Authentic 1937 Acoustic</h4>
                <p style={{ fontSize:'13px', color:C.muted, ...CB, marginBottom:'12px' }}>Adirondack Spruce · Aged toner · Hide glue construction · Original case</p>
                <span style={{ fontSize:'22px', ...CB, color:C.mint, marginBottom:'20px', display:'block' }}>32,000 MAD</span>
                <div style={{ display:'flex', gap:'10px' }}>
                  <button style={{ flex:1, border:`2px solid rgba(107,122,168,0.2)`, color:C.ink, backgroundColor:'transparent', padding:'12px', borderRadius:'16px', fontSize:'10px', ...CB, cursor:'pointer', transition:'border-color 0.15s' }}
                    onMouseEnter={e=>e.currentTarget.style.borderColor=C.mint}
                    onMouseLeave={e=>e.currentTarget.style.borderColor='rgba(107,122,118,0.2)'}
                  >Message</button>
                  <WhatsAppButton phone={undefined} title="D-28 Authentic 1937 Acoustic" style={{ flex:1, backgroundColor:C.mint, color:C.ink, padding:'12px', borderRadius:'16px', fontSize:'10px' }}>💬 WhatsApp</WhatsAppButton>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══ 10. AUTO PRO BANNER ══════════════════════════════ */}
        <section style={{ marginBottom:'64px' }}>
          <div style={{ position:'relative', borderRadius:'40px', overflow:'hidden', height:'320px', display:'flex', alignItems:'center', boxShadow:'0 16px 48px rgba(0,0,0,0.15)', cursor:'pointer' }}>
            <img src={I.auto} alt="Auto Pro" style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover' }} />
            <div style={{ position:'absolute', inset:0, backgroundColor:'rgba(22,29,27,0.58)' }} />
            <div style={{ position:'relative', zIndex:1, padding:'0 64px', maxWidth:'560px' }}>
              <p style={{ fontSize:'11px', ...UB, color:C.mint, textTransform:'uppercase' as const, letterSpacing:'0.15em', marginBottom:'14px' }}>SOUKNI AUTO PRO</p>
              <h2 style={{ fontSize:'clamp(26px,3.5vw,42px)', ...UB, color:'white', marginBottom:'18px', lineHeight:1.05 }}>Transport your instruments in luxury.</h2>
              <p style={{ fontSize:'17px', color:'rgba(255,255,255,0.9)', marginBottom:'28px', lineHeight:1.55 }}>Premium vehicle rentals for musicians touring across Morocco.</p>
              <button style={{ backgroundColor:C.mint, color:C.ink, border:'none', padding:'16px 40px', borderRadius:'100px', fontSize:'11px', ...UB, textTransform:'uppercase' as const, letterSpacing:'0.12em', cursor:'pointer', transition:'transform 0.2s' }}
                onMouseEnter={e=>e.currentTarget.style.transform='scale(1.04)'}
                onMouseLeave={e=>e.currentTarget.style.transform='scale(1)'}
              >BECOME A PARTNER</button>
            </div>
          </div>
        </section>

        {/* ══ 11. INSTRUMENTS GRID ═════════════════════════════ */}
        <section style={{ marginBottom:'48px' }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'28px' }}>
            <h3 style={{ fontSize:'clamp(18px,2.5vw,24px)', ...UB, color:C.ink, textTransform:'uppercase' as const }}>All Instrument Discoveries</h3>
            <a href="#" style={{ fontSize:'12px', ...UB, color:C.mint, textDecoration:'none' }}>View All →</a>
          </div>
          {filteredItems.length === 0 ? (
            <div style={{ textAlign:'center' as const, padding:'60px 20px', backgroundColor:'white', borderRadius:'24px', border:'1px solid rgba(107,122,118,0.1)' }}>
              <p style={{ fontSize:'18px', ...UB, color:C.ink, marginBottom:'8px' }}>No instruments found</p>
              <p style={{ fontSize:'14px', color:C.muted, marginBottom:'20px' }}>Try a different keyword or clear your filters</p>
              <button onClick={()=>{setKeyword('');setApplied({keyword:''})}}
                style={{ padding:'11px 28px', borderRadius:'100px', backgroundColor:C.mint, color:C.ink, border:'none', ...UB, fontSize:'13px', cursor:'pointer' }}>Clear Search</button>
            </div>
          ) : gridView ? (
            <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'20px' }}>
              {paginatedItems.map((item,j)=><GridCard key={j} {...item} />)}
            </div>
          ) : (
            <div style={{ display:'flex', flexDirection:'column' as const, gap:'14px' }}>
              {paginatedItems.map((item,j)=>(
                <div key={j} style={{ display:'flex', backgroundColor:'white', borderRadius:'20px', border:'1px solid rgba(107,122,118,0.1)', overflow:'hidden', height:'140px' }}>
                  <img src={item.img} alt={item.title} style={{ width:'140px', height:'100%', objectFit:'cover' as const, flexShrink:0 }} />
                  <div style={{ flex:1, padding:'16px 20px', display:'flex', flexDirection:'column' as const, justifyContent:'space-between' }}>
                    <div>
                      <p style={{ fontSize:'9px', ...CB, color:C.mint, textTransform:'uppercase' as const }}>{item.brand}</p>
                      <h4 style={{ fontSize:'15px', ...CB, color:C.ink }}>{item.title}</h4>
                    </div>
                    <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                      <p style={{ fontSize:'18px', ...CB, color:C.mint }}>{item.price.toLocaleString()} MAD</p>
                      <div style={{ display:'flex', gap:'8px' }}>
                        <button style={{ padding:'8px 16px', borderRadius:'10px', border:`1px solid ${C.ink}`, backgroundColor:'transparent', color:C.ink, fontSize:'10px', cursor:'pointer' }}>Message</button>
                        <WhatsAppButton phone={(item as any).phone} title={item.title} style={{ padding:'8px 16px', borderRadius:'10px', fontSize:'10px' }} />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* ══ 12. PAGINATION ═══════════════════════════════════ */}
        <div style={{ display:'flex', justifyContent:'center', alignItems:'center', gap:'10px', marginBottom:'64px' }}>
          <button onClick={()=>setPage(p=>Math.max(1,p-1))} disabled={page<=1}
            style={{ width:'44px', height:'44px', borderRadius:'12px', backgroundColor:'white', border:'1px solid rgba(107,122,118,0.12)', cursor:page<=1?'not-allowed':'pointer', opacity:page<=1?0.4:1, display:'flex', alignItems:'center', justifyContent:'center', color:C.muted }}><ChevronLeft size={18} /></button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(p=>(
            <button key={p} onClick={()=>setPage(p)}
              style={{ width:'44px', height:'44px', borderRadius:'12px', cursor:'pointer', fontSize:'15px', ...UB, border:'1px solid', transition:'all 0.2s',
                backgroundColor: page===p?C.mint:'white', color:page===p?C.ink:C.muted, borderColor:page===p?C.mint:'rgba(107,122,118,0.12)',
              }}
            >{p}</button>
          ))}
          <button onClick={()=>setPage(p=>Math.min(totalPages,p+1))} disabled={page>=totalPages}
            style={{ width:'44px', height:'44px', borderRadius:'12px', backgroundColor:'white', border:'1px solid rgba(107,122,118,0.12)', cursor:page>=totalPages?'not-allowed':'pointer', opacity:page>=totalPages?0.4:1, display:'flex', alignItems:'center', justifyContent:'center', color:C.muted }}><ChevronRight size={18} /></button>
        </div>

        {/* ══ 13. DIAMOND TRUST BANNER ═════════════════════════ */}
        <section style={{ marginBottom:'64px' }}>
          <div style={{ backgroundColor:C.mint, borderRadius:'40px', padding:'56px 64px', display:'flex', alignItems:'center', justifyContent:'space-between', boxShadow:`0 16px 48px ${C.mint}30`, flexWrap:'wrap' as const, gap:'28px' }}>
            <div style={{ maxWidth:'520px' }}>
              <p style={{ fontSize:'9px', ...UB, textTransform:'uppercase' as const, letterSpacing:'0.15em', color:'rgba(22,29,27,0.6)', marginBottom:'14px' }}>EXCLUSIVE PRIVILEGE</p>
              <h2 style={{ fontSize:'clamp(26px,3.5vw,40px)', ...UB, color:C.ink, marginBottom:'16px', lineHeight:1.05 }}>Unlock the Power of Diamond.</h2>
              <p style={{ fontSize:'17px', color:`${C.ink}b3`, lineHeight:1.6 }}>Priority placement, SouKni Certified status, and direct marketing tools. Sell your instruments 5x faster.</p>
            </div>
            <div style={{ display:'flex', gap:'14px', flexWrap:'wrap' as const }}>
              <button style={{ backgroundColor:C.ink, color:'white', border:'none', padding:'18px 44px', borderRadius:'100px', fontSize:'11px', ...UB, textTransform:'uppercase' as const, letterSpacing:'0.12em', cursor:'pointer', transition:'transform 0.2s' }}
                onMouseEnter={e=>e.currentTarget.style.transform='scale(1.04)'}
                onMouseLeave={e=>e.currentTarget.style.transform='scale(1)'}
              >Get Status</button>
              <button style={{ backgroundColor:'transparent', color:C.ink, border:`2px solid rgba(22,29,27,0.2)`, padding:'18px 44px', borderRadius:'100px', fontSize:'11px', ...UB, textTransform:'uppercase' as const, letterSpacing:'0.12em', cursor:'pointer', transition:'all 0.2s' }}
                onMouseEnter={e=>e.currentTarget.style.backgroundColor='rgba(22,29,27,0.06)'}
                onMouseLeave={e=>e.currentTarget.style.backgroundColor='transparent'}
              >Learn More</button>
            </div>
          </div>
        </section>

        {/* ══ 14. APP BANNER ═══════════════════════════════════ */}
        <section style={{ marginBottom:'64px' }}>
          <div style={{ backgroundColor:C.cream, borderRadius:'40px', height:'440px', position:'relative' as const, overflow:'hidden', display:'flex', alignItems:'center', padding:'0 64px', border:'1px solid rgba(107,122,118,0.1)' }}>
            <div style={{ position:'relative', zIndex:1, maxWidth:'480px' }}>
              <h2 style={{ fontSize:'clamp(36px,5vw,56px)', ...UB, color:C.ink, marginBottom:'20px', lineHeight:1, letterSpacing:'-0.05em' }}>JOIN THE<br/>SOUKNI FAMILY</h2>
              <p style={{ fontSize:'17px', color:C.muted, marginBottom:'36px', maxWidth:'400px', lineHeight:1.6 }}>Get early alerts on rare instrument drops, exclusive dealer partnerships, and musician community events.</p>
              <div style={{ display:'flex', gap:'14px', flexWrap:'wrap' as const }}>
                {['📱 App Store','▶ Google Play'].map(app=>(
                  <button key={app} style={{ height:'52px', minWidth:'160px', backgroundColor:C.ink, color:'white', border:'none', borderRadius:'14px', fontSize:'10px', ...UB, textTransform:'uppercase' as const, letterSpacing:'0.1em', cursor:'pointer', transition:'transform 0.15s' }}
                    onMouseEnter={e=>e.currentTarget.style.transform='scale(1.04)'}
                    onMouseLeave={e=>e.currentTarget.style.transform='scale(1)'}
                  >{app}</button>
                ))}
              </div>
            </div>
            <div style={{ position:'absolute', right:'80px', bottom:'-40px', width:'320px', height:'500px', backgroundColor:'white', borderRadius:'56px', boxShadow:'0 32px 80px rgba(0,0,0,0.18)', border:'8px solid #f5ede0', padding:'20px', display:'flex', flexDirection:'column' as const, gap:'16px' }}>
              <div style={{ backgroundColor:C.surface, borderRadius:'100px', height:'32px' }} />
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'12px', flex:1 }}>
                <div style={{ backgroundColor:C.surface, borderRadius:'16px' }} />
                <div style={{ backgroundColor:C.surface, borderRadius:'16px' }} />
                <div style={{ backgroundColor:C.surface, borderRadius:'16px', gridColumn:'span 2' }} />
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ══ 15. FOOTER ═══════════════════════════════════════ */}
      <footer style={{ backgroundColor:C.ink, color:'white', padding:'64px 24px 32px' }}>
        <div style={{ maxWidth:'1280px', margin:'0 auto' }}>
          <div style={{ display:'grid', gridTemplateColumns:'2fr 1fr 1fr 1fr', gap:'48px', marginBottom:'48px', paddingBottom:'48px', borderBottom:'1px solid rgba(255,255,255,0.12)' }}>
            <div>
              <Link href={`/${locale}`} style={{ textDecoration:'none' }}>
                <div style={{ fontSize:'28px', ...UB, color:C.mint, marginBottom:'12px', cursor:'pointer' }}>SouKni</div>
              </Link>
              <p style={{ fontSize:'14px', ...CB, color:'rgba(255,255,255,0.82)', fontStyle:'italic', marginBottom:'20px' }}>The Market in your Pocket</p>
              <div style={{ display:'flex', gap:'10px' }}>
                {[{s:'FB',h:'https://facebook.com'},{s:'IG',h:'https://instagram.com'},{s:'X',h:'https://x.com'}].map(({s,h})=>(
                  <a key={s} href={h} target="_blank" rel="noopener noreferrer"
                    style={{ width:'38px', height:'38px', borderRadius:'50%', backgroundColor:'rgba(255,255,255,0.08)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'10px', ...UB, color:'rgba(255,255,255,0.6)', textDecoration:'none', transition:'all 0.15s' }}
                    onMouseEnter={e=>{e.currentTarget.style.backgroundColor=C.mint;e.currentTarget.style.color=C.ink}}
                    onMouseLeave={e=>{e.currentTarget.style.backgroundColor='rgba(255,255,255,0.08)';e.currentTarget.style.color='rgba(255,255,255,0.6)'}}
                  >{s}</a>
                ))}
              </div>
            </div>
            {[
              { title:'Marketplace', links:[{l:'Motors',h:`/${locale}/motors`},{l:'Property',h:`/${locale}/property`},{l:'Fashion',h:`/${locale}/fashion`},{l:'The Vault',h:`/${locale}/vault`}] },
              { title:'Company',     links:[{l:'About Us',h:`/${locale}/about`},{l:'Careers',h:`/${locale}/jobs`},{l:'Press Kit',h:`/${locale}/about`}] },
              { title:'Support',     links:[{l:'Help Center',h:`/${locale}/community`},{l:'Safety Center',h:`/${locale}/community`},{l:'Contact',h:`/${locale}/community`}] },
            ].map(col=>(
              <div key={col.title}>
                <h4 style={{ fontSize:'10px', ...UB, textTransform:'uppercase' as const, letterSpacing:'0.15em', color:C.mint, marginBottom:'20px' }}>{col.title}</h4>
                {col.links.map(({l,h})=>(
                  <Link key={l} href={h} style={{ display:'block', fontSize:'13px', ...CB, color:'rgba(255,255,255,0.65)', textDecoration:'none', marginBottom:'12px', transition:'color 0.15s' }}
                    onMouseEnter={e=>e.currentTarget.style.color='white'}
                    onMouseLeave={e=>e.currentTarget.style.color='rgba(255,255,255,0.65)'}
                  >{l}</Link>
                ))}
              </div>
            ))}
          </div>
          <div style={{ textAlign:'center' as const, fontSize:'10px', ...UB, color:'rgba(255,255,255,0.35)', textTransform:'uppercase' as const, letterSpacing:'0.2em' }}>
            © 2026 SOUKNI MOROCCO — ALL RIGHTS RESERVED
          </div>
        </div>
      </footer>
    </div>
  )
}
