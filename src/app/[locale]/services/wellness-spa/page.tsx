'use client'
import React, { useState, useMemo, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import Link from 'next/link'
import { Search, MapPin, Heart, MessageCircle, ChevronRight, Star, X } from 'lucide-react'
import { ALL_CITIES } from '@/data/moroccoLocations'

const HERO = 'https://images.pexels.com/photos/3757952/pexels-photo-3757952.jpeg?auto=compress&w=1600'

const SUBCATS = [
  { slug:'hammam-spa',    label:'Hammam & Spa',   image:'https://images.pexels.com/photos/3757952/pexels-photo-3757952.jpeg?auto=compress&w=600' },
  { slug:'massage',       label:'Massage',         image:'https://images.pexels.com/photos/3997989/pexels-photo-3997989.jpeg?auto=compress&w=600' },
  { slug:'yoga-pilates',  label:'Yoga & Pilates',  image:'https://images.pexels.com/photos/4056535/pexels-photo-4056535.jpeg?auto=compress&w=600' },
  { slug:'skincare',      label:'Skincare',        image:'https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&w=600' },
  { slug:'energy-healing',label:'Energy Healing',  image:'https://images.pexels.com/photos/3822621/pexels-photo-3822621.jpeg?auto=compress&w=600' },
]

const topChoices = [
  { id:'w1', title:'Royal Hammam & Argan Ritual — 3 Hours', price:680, location:'Marrakech', rating:4.9, reviews:118, image:'https://images.pexels.com/photos/3757952/pexels-photo-3757952.jpeg?auto=compress&w=800', desc:"Morocco's most indulgent hammam ritual. Kessa exfoliation, black soap scrub, rhassoul clay mask, argan oil massage and rose water rinse. Private suite, certified therapist. Available for couples." },
  { id:'w2', title:'Deep Tissue & Hot Stone Massage — 90 Min', price:450, location:'Casablanca', rating:4.9, reviews:94, image:'https://images.pexels.com/photos/3997989/pexels-photo-3997989.jpeg?auto=compress&w=800', desc:'Certified massage therapist combining deep tissue techniques with volcanic hot stone therapy. Tension release, muscle recovery and deep relaxation. Home visits and studio sessions available.' },
  { id:'w3', title:'Hydrafacial & LED Light Therapy — Luxury', price:890, location:'Rabat', rating:4.8, reviews:76, image:'https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&w=800', desc:'Medical-grade Hydrafacial with deep cleansing, exfoliation, extraction and hydration. Combined with LED light therapy for anti-ageing and brightening. Visible results after first session.' },
]

const bentoListings = [
  { id:'wb1', title:'Vinyasa Yoga — Private Session',        price:280, location:'Casablanca', image:'https://images.pexels.com/photos/4056535/pexels-photo-4056535.jpeg?auto=compress&w=600' },
  { id:'wb2', title:'Prenatal Massage — 60 Minutes',         price:350, location:'Rabat',      image:'https://images.pexels.com/photos/3997989/pexels-photo-3997989.jpeg?auto=compress&w=600' },
  { id:'wb3', title:'Reiki Healing & Chakra Balance',        price:320, location:'Marrakech',  image:'https://images.pexels.com/photos/3822621/pexels-photo-3822621.jpeg?auto=compress&w=600' },
  { id:'wb4', title:'Chemical Peel — Brightening Treatment', price:550, location:'Casablanca', image:'https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&w=600' },
  { id:'wb5', title:'Couple Hammam Package — 2 Hours',       price:900, location:'Marrakech',  image:'https://images.pexels.com/photos/3757952/pexels-photo-3757952.jpeg?auto=compress&w=600' },
]

const discoveryGrid = [
  { id:'wd1', title:'Yin Yoga — Evening Restore Class',      price:180, location:'Casablanca', image:'https://images.pexels.com/photos/4056535/pexels-photo-4056535.jpeg?auto=compress&w=400' },
  { id:'wd2', title:'Swedish Relaxation Massage',            price:320, location:'Rabat',      image:'https://images.pexels.com/photos/3997989/pexels-photo-3997989.jpeg?auto=compress&w=400' },
  { id:'wd3', title:'Sound Bath Healing — Group Session',    price:200, location:'Marrakech',  image:'https://images.pexels.com/photos/3822621/pexels-photo-3822621.jpeg?auto=compress&w=400' },
  { id:'wd4', title:'Anti-Ageing Collagen Facial',           price:480, location:'Casablanca', image:'https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&w=400' },
  { id:'wd5', title:'Traditional Ghassoul Clay Wrap',        price:380, location:'Fès',        image:'https://images.pexels.com/photos/3757952/pexels-photo-3757952.jpeg?auto=compress&w=400' },
  { id:'wd6', title:'Pilates Reformer — Private Class',      price:350, location:'Casablanca', image:'https://images.pexels.com/photos/4056535/pexels-photo-4056535.jpeg?auto=compress&w=400' },
  { id:'wd7', title:'Crystal Therapy & Aura Cleansing',      price:280, location:'Marrakech',  image:'https://images.pexels.com/photos/3822621/pexels-photo-3822621.jpeg?auto=compress&w=400' },
  { id:'wd8', title:"Men's Skincare & Facial",              price:420, location:'Casablanca', image:'https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&w=400' },
]

const BUDGETS = ['Any Budget','0-300 MAD','300-500 MAD','500-800 MAD','800+ MAD']
const AVAILABILITIES = ['Anytime','This Week','This Month','Urgent Same-Day']

function CertifiedBadge() {
  return <span style={{ display:'inline-flex', alignItems:'center', gap:'4px', background:'linear-gradient(135deg,#22d4a8,#0f9b8e)', color:'white', fontSize:'8px', fontWeight:900, padding:'3px 10px', borderRadius:'100px', textTransform:'uppercase' as const, letterSpacing:'0.08em' }}>✦ SOUKNI CERTIFIED</span>
}
function Stars({ rating }: { rating: number }) {
  return <div style={{ display:'flex', gap:'1px' }}>{[1,2,3,4,5].map(i=><Star key={i} size={11} fill={i<=Math.floor(rating)?'#f59e0b':'none'} color="#f59e0b" />)}</div>
}

function CityDDrop({ value, onChange, open, setOpen, closeOthers, heroStyle }: any) {
  const btnRef = useRef<HTMLButtonElement>(null)
  const [pos, setPos] = useState({top:0,left:0,width:0})
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])
  useEffect(() => {
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
        <button onClick={()=>{ onChange(''); setOpen(false) }}
          style={{ width:'100%', padding:'10px 18px', background:'none', border:'none', cursor:'pointer', textAlign:'left' as const, fontSize:'13px', fontWeight:600, color:value===''?'#22d4a8':'#161d1b', display:'flex', justifyContent:'space-between', alignItems:'center' }}
          onMouseEnter={e=>e.currentTarget.style.backgroundColor='#f4fbf8'}
          onMouseLeave={e=>e.currentTarget.style.backgroundColor='transparent'}
        >Any City{value===''&&<span style={{color:'#22d4a8'}}>✓</span>}</button>
        {ALL_CITIES.map((opt:string)=>(
          <button key={opt} onClick={()=>{ onChange(opt); setOpen(false) }}
            style={{ width:'100%', padding:'10px 18px', background:'none', border:'none', cursor:'pointer', textAlign:'left' as const, fontSize:'13px', fontWeight:600, color:opt===value?'#22d4a8':'#161d1b', display:'flex', justifyContent:'space-between', alignItems:'center' }}
            onMouseEnter={e=>e.currentTarget.style.backgroundColor='#f4fbf8'}
            onMouseLeave={e=>e.currentTarget.style.backgroundColor='transparent'}
          >{opt}{opt===value&&<span style={{color:'#22d4a8'}}>✓</span>}</button>
        ))}
      </div>
    </>, document.body
  ) : null
  return (
    <>
      <button ref={btnRef} onClick={(e)=>{ e.stopPropagation(); if (closeOthers) closeOthers(); setOpen(!open) }}
        style={heroStyle
          ? { background:'none', border:'none', cursor:'pointer', padding:0, display:'flex', flexDirection:'column' as const, gap:2, textAlign:'left' as const, width:'100%' }
          : { width:'100%', height:'100%', background:'none', border:'none', cursor:'pointer', display:'flex', flexDirection:'column' as const, justifyContent:'center', textAlign:'left' as const }}>
        <span style={heroStyle
          ? { fontSize:'9px', fontWeight:800, color:'rgba(255,255,255,0.6)', textTransform:'uppercase' as const, letterSpacing:'0.12em' }
          : { fontSize:'9px', fontWeight:700, color:'#6b7a76', textTransform:'uppercase' as const, letterSpacing:'0.1em', marginBottom:'1px' }}>City</span>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
          <span style={heroStyle
            ? { fontSize:'13px', fontWeight:600, color:'white' }
            : { fontSize:'13px', fontWeight:500, color: value ? '#161d1b' : '#6b7a76' }}>{value || 'Any city'}</span>
          {!heroStyle && <span style={{ color:'#22d4a8', fontSize:'10px', transition:'transform 0.2s', display:'inline-block', transform:open?'rotate(180deg)':'rotate(0)' }}>▾</span>}
        </div>
      </button>
      {dropdown}
    </>
  )
}

function GenericDDrop({ label, value, options, open, setOpen, onChange, closeOthers }: any) {
  const btnRef = useRef<HTMLButtonElement>(null)
  const [pos, setPos] = useState({top:0,left:0,width:0})
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])
  useEffect(() => {
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
      <div style={{ position:'fixed', top:pos.top, left:pos.left, minWidth:Math.max(pos.width,200), backgroundColor:'white', borderRadius:'16px', boxShadow:'0 16px 48px rgba(0,0,0,0.2)', border:'1px solid rgba(107,122,118,0.1)', zIndex:99999, padding:'6px 0' }}>
        {options.map((opt:string)=>(
          <button key={opt} onClick={()=>{ onChange(opt); setOpen(false) }}
            style={{ width:'100%', padding:'10px 18px', background:'none', border:'none', cursor:'pointer', textAlign:'left' as const, fontSize:'13px', fontWeight:600, color:opt===value?'#22d4a8':'#161d1b', display:'flex', justifyContent:'space-between', alignItems:'center' }}
            onMouseEnter={e=>e.currentTarget.style.backgroundColor='#f4fbf8'}
            onMouseLeave={e=>e.currentTarget.style.backgroundColor='transparent'}
          >{opt}{opt===value&&<span style={{color:'#22d4a8'}}>✓</span>}</button>
        ))}
      </div>
    </>, document.body
  ) : null
  return (
    <>
      <button ref={btnRef} onClick={(e)=>{ e.stopPropagation(); if (closeOthers) closeOthers(); setOpen(!open) }}
        style={{ width:'100%', height:'100%', background:'none', border:'none', cursor:'pointer', display:'flex', flexDirection:'column' as const, justifyContent:'center', textAlign:'left' as const }}>
        <span style={{ fontSize:'9px', fontWeight:700, color:'#6b7a76', textTransform:'uppercase' as const, letterSpacing:'0.1em', marginBottom:'1px' }}>{label}</span>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
          <span style={{ fontSize:'13px', fontWeight:500, color:'#161d1b' }}>{value}</span>
          <span style={{ color:'#22d4a8', fontSize:'10px', transition:'transform 0.2s', display:'inline-block', transform:open?'rotate(180deg)':'rotate(0)' }}>▾</span>
        </div>
      </button>
      {dropdown}
    </>
  )
}

function TopCard({ item, locale }: { item: typeof topChoices[0], locale: string }) {
  const [saved, setSaved] = useState(false)
  const [hov, setHov] = useState(false)
  return (
    <Link href={`/${locale}/listing/${item.id}`} style={{ textDecoration:'none' }}>
      <div onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
        style={{ display:'flex', backgroundColor:'white', borderRadius:'40px', overflow:'hidden', border:`1px solid ${hov?'#22d4a8':'#f1f5f9'}`, boxShadow:hov?'0 20px 48px rgba(0,0,0,0.12)':'0 2px 12px rgba(0,0,0,0.05)', transition:'all 0.3s', marginBottom:'16px' }}>
        <div style={{ position:'relative', width:'280px', flexShrink:0, overflow:'hidden' }}>
          <img src={item.image} alt={item.title} style={{ width:'100%', height:'100%', objectFit:'cover', transition:'transform 0.6s', transform:hov?'scale(1.06)':'scale(1)' }} />
          <div style={{ position:'absolute', top:'16px', left:'16px' }}><CertifiedBadge /></div>
          <button onClick={e=>{e.preventDefault();setSaved(!saved)}} style={{ position:'absolute', top:'16px', right:'16px', width:'32px', height:'32px', borderRadius:'50%', backgroundColor:'rgba(255,255,255,0.2)', border:'1px solid rgba(255,255,255,0.3)', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer' }}>
            <Heart size={14} color={saved?'#ef4444':'white'} fill={saved?'#ef4444':'none'} />
          </button>
        </div>
        <div style={{ flex:1, padding:'28px 32px', display:'flex', flexDirection:'column' as const, justifyContent:'space-between' }}>
          <div>
            <div style={{ display:'flex', alignItems:'center', gap:'8px', marginBottom:'10px' }}><Stars rating={item.rating} /><span style={{ fontWeight:900, fontSize:'13px', color:'#161d1b' }}>{item.rating}</span><span style={{ fontSize:'12px', color:'#6b7a76' }}>({item.reviews} reviews)</span></div>
            <h3 style={{ fontWeight:900, letterSpacing:'-0.05em', fontSize:'20px', color:'#161d1b', marginBottom:'10px', lineHeight:1.2 }}>{item.title}</h3>
            <p style={{ fontSize:'13px', color:'#6b7a76', lineHeight:1.7, marginBottom:'16px' }}>{item.desc}</p>
            <p style={{ fontSize:'12px', color:'#6b7a76', display:'flex', alignItems:'center', gap:'4px' }}><MapPin size={12} />{item.location}</p>
          </div>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginTop:'20px' }}>
            <span style={{ fontWeight:900, fontSize:'24px', color:'#22d4a8' }}>{item.price.toLocaleString()} MAD</span>
            <div style={{ display:'flex', gap:'8px' }}>
              <button onClick={e=>e.preventDefault()} style={{ padding:'10px 20px', borderRadius:'100px', border:'1px solid #22d4a8', backgroundColor:'transparent', color:'#22d4a8', fontWeight:700, fontSize:'12px', cursor:'pointer', display:'flex', alignItems:'center', gap:'5px' }}><MessageCircle size={13} />Message</button>
              <button onClick={e=>e.preventDefault()} style={{ padding:'10px 20px', borderRadius:'100px', border:'none', backgroundColor:'#25D366', color:'white', fontWeight:700, fontSize:'12px', cursor:'pointer' }}>WhatsApp</button>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

function DiscoCard({ item, locale }: { item: typeof discoveryGrid[0], locale: string }) {
  const [saved, setSaved] = useState(false)
  const [hov, setHov] = useState(false)
  return (
    <Link href={`/${locale}/listing/${item.id}`} style={{ textDecoration:'none' }}>
      <div onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
        style={{ display:'flex', backgroundColor:'white', borderRadius:'24px', overflow:'hidden', border:`1px solid ${hov?'#22d4a8':'#f1f5f9'}`, boxShadow:hov?'0 16px 32px rgba(0,0,0,0.1)':'0 2px 8px rgba(0,0,0,0.04)', transition:'all 0.25s' }}>
        <div style={{ position:'relative', width:'160px', flexShrink:0, overflow:'hidden' }}>
          <img src={item.image} alt={item.title} style={{ width:'100%', height:'100%', objectFit:'cover', transition:'transform 0.5s', transform:hov?'scale(1.06)':'scale(1)' }} />
          <div style={{ position:'absolute', top:'8px', left:'8px' }}><CertifiedBadge /></div>
        </div>
        <div style={{ flex:1, padding:'16px 20px', display:'flex', flexDirection:'column' as const, justifyContent:'space-between' }}>
          <div>
            <p style={{ fontSize:'11px', color:'#6b7a76', marginBottom:'4px', display:'flex', alignItems:'center', gap:'3px' }}><MapPin size={10} />{item.location}</p>
            <h4 style={{ fontWeight:900, letterSpacing:'-0.05em', fontSize:'14px', color:'#161d1b', marginBottom:'8px', lineHeight:1.3 }}>{item.title}</h4>
            <p style={{ fontWeight:900, fontSize:'18px', color:'#22d4a8' }}>{item.price.toLocaleString()} MAD</p>
          </div>
          <div style={{ display:'flex', gap:'6px', marginTop:'12px' }}>
            <button onClick={e=>{e.preventDefault();setSaved(!saved)}} style={{ flex:1, backgroundColor:saved?'#22d4a8':'#eef5f2', color:saved?'white':'#3c4a46', border:'none', padding:'8px', borderRadius:'100px', fontWeight:700, fontSize:'11px', cursor:'pointer', transition:'all 0.2s' }}>{saved?'Saved':'Message'}</button>
            <button onClick={e=>e.preventDefault()} style={{ flex:1, backgroundColor:'#25D366', color:'white', border:'none', padding:'8px', borderRadius:'100px', fontWeight:700, fontSize:'11px', cursor:'pointer' }}>WhatsApp</button>
          </div>
        </div>
      </div>
    </Link>
  )
}

function GridDiscoCard({ item, locale }: { item: typeof discoveryGrid[0], locale: string }) {
  const [saved, setSaved] = useState(false)
  const [hov, setHov] = useState(false)
  return (
    <Link href={`/${locale}/listing/${item.id}`} style={{ textDecoration:'none' }}>
      <div onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
        style={{ backgroundColor:'white', borderRadius:'20px', overflow:'hidden', border:`1px solid ${hov?'#22d4a8':'#f1f5f9'}`, boxShadow:hov?'0 16px 32px rgba(0,0,0,0.1)':'0 2px 8px rgba(0,0,0,0.04)', transition:'all 0.25s' }}>
        <div style={{ position:'relative', aspectRatio:'1/1', overflow:'hidden' }}>
          <img src={item.image} alt={item.title} style={{ width:'100%', height:'100%', objectFit:'cover', transition:'transform 0.5s', transform:hov?'scale(1.06)':'scale(1)' }} />
          <div style={{ position:'absolute', top:'10px', left:'10px' }}><CertifiedBadge /></div>
          <button onClick={e=>{e.preventDefault();setSaved(!saved)}} style={{ position:'absolute', top:'8px', right:'8px', width:'30px', height:'30px', borderRadius:'50%', backgroundColor:'rgba(255,255,255,0.85)', border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}>
            <Heart size={13} fill={saved?'#ef4444':'none'} color={saved?'#ef4444':'#6b7a76'} />
          </button>
        </div>
        <div style={{ padding:'14px 16px' }}>
          <p style={{ fontSize:'11px', color:'#6b7a76', marginBottom:'4px', display:'flex', alignItems:'center', gap:'3px' }}><MapPin size={10} />{item.location}</p>
          <h4 style={{ fontWeight:900, letterSpacing:'-0.03em', fontSize:'13px', color:'#161d1b', marginBottom:'8px', lineHeight:1.3, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' as const }}>{item.title}</h4>
          <p style={{ fontWeight:900, fontSize:'16px', color:'#22d4a8', marginBottom:'10px' }}>{item.price.toLocaleString()} MAD</p>
          <div style={{ display:'flex', gap:'6px' }}>
            <button onClick={e=>e.preventDefault()} style={{ flex:1, backgroundColor:'#eef5f2', color:'#3c4a46', border:'none', padding:'7px', borderRadius:'100px', fontWeight:700, fontSize:'10px', cursor:'pointer' }}>Message</button>
            <button onClick={e=>e.preventDefault()} style={{ flex:1, backgroundColor:'#25D366', color:'white', border:'none', padding:'7px', borderRadius:'100px', fontWeight:700, fontSize:'10px', cursor:'pointer' }}>WhatsApp</button>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default function WellnessSpaPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = React.use(params)

  const [heroCity, setHeroCity] = useState('')
  const [heroKeyword, setHeroKeyword] = useState('')
  const [applied, setApplied] = useState({ city:'', keyword:'' })

  const [budget, setBudget] = useState('Any Budget')
  const [availability, setAvailability] = useState('Anytime')
  const [budgetOpen, setBudgetOpen] = useState(false)
  const [availOpen, setAvailOpen] = useState(false)
  const [heroCityOpen, setHeroCityOpen] = useState(false)
  const [cityOpen, setCityOpen] = useState(false)

  const [tab, setTab] = useState('All')
  const [diamond, setDiamond] = useState(true)
  const [page, setPage] = useState(1)
  const [grid, setGrid] = useState(true)
  const [chip, setChip] = useState('New Arrivals')

  function applySearch() {
    setApplied({ city: heroCity, keyword: heroKeyword })
    setBudgetOpen(false); setAvailOpen(false)
  }
  function clearAll() {
    setHeroCity(''); setHeroKeyword('')
    setApplied({ city:'', keyword:'' })
    setBudget('Any Budget'); setAvailability('Anytime')
  }

  const filtered = useMemo(() => {
    let list = discoveryGrid.filter(item => {
      const mc = !applied.city    || item.location.toLowerCase().includes(applied.city.toLowerCase())
      const mk = !applied.keyword || item.title.toLowerCase().includes(applied.keyword.toLowerCase())
      const mb = budget === 'Any Budget'      ? true
               : budget === '0-300 MAD'       ? item.price <= 300
               : budget === '300-500 MAD'     ? item.price > 300 && item.price <= 500
               : budget === '500-800 MAD'     ? item.price > 500 && item.price <= 800
               : item.price > 800
      return mc && mk && mb
    })
    if (chip === 'Best Price') list = [...list].sort((a,b)=>a.price-b.price)
    if (chip === 'Top Rated')  list = [...list].sort((a,b)=>b.price-a.price)
    return list
  }, [applied, budget, chip])
  const hasFilters = applied.city || applied.keyword || budget !== 'Any Budget' || availability !== 'Anytime'

  return (
    <div style={{ fontFamily:'Inter, sans-serif', backgroundColor:'#f4fbf8', minHeight:'100vh' }}>
      <section style={{ position:'relative', height:'400px', overflow:'hidden', display:'flex', alignItems:'center', justifyContent:'center' }}>
        <img src={HERO} alt="Wellness & Spa" style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover' }} />
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top,rgba(15,23,42,0.88),rgba(15,23,42,0.4))' }} />
        <div style={{ position:'relative', zIndex:10, textAlign:'center', padding:'0 20px', maxWidth:'760px', width:'100%' }}>
          <p style={{ fontSize:'11px', fontWeight:800, color:'#22d4a8', textTransform:'uppercase' as const, letterSpacing:'0.2em', marginBottom:'12px' }}>SOUKNI SERVICES</p>
          <h1 style={{ fontWeight:900, letterSpacing:'-0.05em', fontSize:'clamp(28px,5vw,52px)', color:'white', marginBottom:'12px', lineHeight:1.05 }}>Wellness & Spa</h1>
          <p style={{ fontSize:'15px', color:'rgba(255,255,255,0.82)', marginBottom:'28px' }}>Hammam, massage, yoga, skincare and energy healing across Morocco</p>
          <div style={{ display:'flex', alignItems:'stretch', backgroundColor:'rgba(255,255,255,0.12)', backdropFilter:'blur(24px)', border:'1px solid rgba(255,255,255,0.25)', borderRadius:'100px', overflow:'hidden', maxWidth:'620px', margin:'0 auto' }}>
            <div style={{ padding:'12px 20px', flex:'0 0 160px', borderRight:'1px solid rgba(255,255,255,0.2)' }}>
              <CityDDrop value={heroCity} onChange={setHeroCity} open={heroCityOpen} setOpen={setHeroCityOpen} heroStyle />
            </div>
            <div style={{ display:'flex', flexDirection:'column' as const, padding:'12px 20px', flex:1, borderRight:'1px solid rgba(255,255,255,0.2)', gap:'2px' }}>
              <span style={{ fontSize:'9px', fontWeight:800, color:'rgba(255,255,255,0.6)', textTransform:'uppercase' as const, letterSpacing:'0.12em' }}>Keyword</span>
              <div style={{ display:'flex', alignItems:'center', gap:'6px' }}>
                <input value={heroKeyword} onChange={e=>setHeroKeyword(e.target.value)} onKeyDown={e=>e.key==='Enter'&&applySearch()} placeholder="Hammam, massage, yoga, facial..." style={{ backgroundColor:'transparent', border:'none', outline:'none', fontSize:'13px', fontWeight:600, color:'white', padding:0, flex:1 }} />
                {heroKeyword && <button onClick={()=>setHeroKeyword('')} style={{ background:'none', border:'none', cursor:'pointer', color:'rgba(255,255,255,0.6)', display:'flex' }}><X size={13}/></button>}
              </div>
            </div>
            <button onClick={applySearch} style={{ backgroundColor:'#22d4a8', color:'white', border:'none', padding:'0 28px', fontWeight:800, fontSize:'13px', cursor:'pointer', display:'flex', alignItems:'center', gap:'6px', flexShrink:0, transition:'background 0.15s' }}
              onMouseEnter={e=>e.currentTarget.style.backgroundColor='#0f9b8e'} onMouseLeave={e=>e.currentTarget.style.backgroundColor='#22d4a8'}>
              <Search size={15} /> Search
            </button>
          </div>
          {(heroCity||heroKeyword) && !applied.keyword && !applied.city &&
            <p style={{ marginTop:'10px', fontSize:'12px', color:'rgba(255,255,255,0.55)' }}>Press Search or hit Enter to filter results</p>
          }
        </div>
      </section>

      <div style={{ maxWidth:'1440px', margin:'-24px auto 0', padding:'0 40px', position:'relative', zIndex:30 }}>
        <div style={{ backgroundColor:'rgba(255,255,255,0.97)', backdropFilter:'blur(16px)', border:'1px solid rgba(107,122,118,0.12)', borderRadius:'100px', boxShadow:'0 8px 40px rgba(0,0,0,0.12)', display:'flex', alignItems:'stretch', height:'68px' }}>
          <div style={{ position:'relative', flex:1, padding:'0 22px', borderRight:'1px solid rgba(186,202,197,0.3)' }}>
            <CityDDrop value={heroCity} onChange={setHeroCity} open={cityOpen} setOpen={setCityOpen} closeOthers={()=>{setBudgetOpen(false);setAvailOpen(false)}} />
          </div>
          <div style={{ flex:2, padding:'0 22px', borderRight:'1px solid rgba(186,202,197,0.3)', display:'flex', flexDirection:'column' as const, justifyContent:'center', gap:'2px' }}>
            <span style={{ fontSize:'9px', fontWeight:700, color:'#6b7a76', textTransform:'uppercase' as const, letterSpacing:'0.1em' }}>KEYWORD</span>
            <div style={{ display:'flex', alignItems:'center', gap:'8px' }}>
              <Search size={12} color="#6b7a76" />
              <input value={heroKeyword} onChange={e=>setHeroKeyword(e.target.value)} onKeyDown={e=>e.key==='Enter'&&applySearch()} placeholder="Hammam, massage, yoga, facial..." style={{ fontSize:'14px', fontWeight:600, color:'#161d1b', border:'none', outline:'none', background:'none', flex:1 }} />
              {heroKeyword && <button onClick={()=>{setHeroKeyword('');setApplied(p=>({...p,keyword:''}))}} style={{ background:'none', border:'none', cursor:'pointer', color:'#6b7a76', display:'flex' }}><X size={13}/></button>}
            </div>
          </div>
          <div style={{ position:'relative', flex:1, padding:'0 22px', borderRight:'1px solid rgba(186,202,197,0.3)' }}>
            <GenericDDrop label="BUDGET" value={budget} options={BUDGETS} open={budgetOpen} setOpen={setBudgetOpen} onChange={setBudget} closeOthers={()=>{setCityOpen(false);setAvailOpen(false)}} />
          </div>
          <div style={{ position:'relative', flex:1, padding:'0 22px' }}>
            <GenericDDrop label="AVAILABILITY" value={availability} options={AVAILABILITIES} open={availOpen} setOpen={setAvailOpen} onChange={setAvailability} closeOthers={()=>{setCityOpen(false);setBudgetOpen(false)}} />
          </div>
          <button onClick={applySearch} style={{ backgroundColor:'#22d4a8', color:'white', border:'none', padding:'0 28px', borderRadius:'0 100px 100px 0', fontWeight:800, fontSize:'13px', cursor:'pointer', display:'flex', alignItems:'center', gap:'8px', flexShrink:0 }}
            onMouseEnter={e=>e.currentTarget.style.backgroundColor='#0f9b8e'} onMouseLeave={e=>e.currentTarget.style.backgroundColor='#22d4a8'}>
            <Search size={16} /> SEARCH
          </button>
        </div>
      </div>

      <div style={{ maxWidth:'1440px', margin:'28px auto 0', padding:'0 40px 64px' }}>
        <nav style={{ display:'flex', alignItems:'center', gap:'6px', fontSize:'11px', fontWeight:700, color:'#6b7a76', textTransform:'uppercase' as const, letterSpacing:'0.06em', marginBottom:'8px' }}>
          <Link href={`/${locale}`} style={{ color:'#6b7a76', textDecoration:'none' }}>Home</Link><span>›</span>
          <Link href={`/${locale}/services`} style={{ color:'#6b7a76', textDecoration:'none' }}>Services</Link><span>›</span>
          <span style={{ color:'#161d1b' }}>Wellness & Spa</span>
        </nav>

        <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', marginBottom:'16px', flexWrap:'wrap' as const, gap:'12px' }}>
          <div>
            <h2 style={{ fontWeight:900, letterSpacing:'-0.05em', fontSize:'22px', color:'#161d1b', marginBottom:'4px' }}>Wellness & Spa in Morocco</h2>
            <p style={{ fontSize:'14px', color:'#6b7a76' }}>
              {filtered.length} service{filtered.length!==1?'s':''} found
              {applied.keyword && <span style={{ color:'#22d4a8' }}> for "{applied.keyword}"</span>}
              {applied.city    && <span style={{ color:'#6b7a76' }}> in {applied.city}</span>}
            </p>
          </div>
          <div style={{ display:'flex', gap:'8px', flexWrap:'wrap' as const, alignItems:'center' }}>
            {applied.city && (
              <span style={{ display:'inline-flex', alignItems:'center', gap:'6px', padding:'5px 12px', borderRadius:'100px', backgroundColor:'#22d4a8', color:'white', fontSize:'12px', fontWeight:700 }}>
                {applied.city}
                <button onClick={()=>{setApplied(p=>({...p,city:''}));setHeroCity('')}} style={{ background:'none', border:'none', cursor:'pointer', color:'white', display:'flex', padding:0 }}><X size={11}/></button>
              </span>
            )}
            {applied.keyword && (
              <span style={{ display:'inline-flex', alignItems:'center', gap:'6px', padding:'5px 12px', borderRadius:'100px', backgroundColor:'#22d4a8', color:'white', fontSize:'12px', fontWeight:700 }}>
                "{applied.keyword}"
                <button onClick={()=>{setApplied(p=>({...p,keyword:''}));setHeroKeyword('')}} style={{ background:'none', border:'none', cursor:'pointer', color:'white', display:'flex', padding:0 }}><X size={11}/></button>
              </span>
            )}
            {budget !== 'Any Budget' && (
              <span style={{ display:'inline-flex', alignItems:'center', gap:'6px', padding:'5px 12px', borderRadius:'100px', backgroundColor:'#161d1b', color:'white', fontSize:'12px', fontWeight:700 }}>
                {budget}
                <button onClick={()=>setBudget('Any Budget')} style={{ background:'none', border:'none', cursor:'pointer', color:'white', display:'flex', padding:0 }}><X size={11}/></button>
              </span>
            )}
            {hasFilters && (
              <button onClick={clearAll} style={{ padding:'5px 14px', borderRadius:'100px', border:'1px solid #ef4444', backgroundColor:'white', fontSize:'12px', fontWeight:700, cursor:'pointer', color:'#ef4444' }}>Clear All</button>
            )}
          </div>
        </div>

        <section style={{ marginBottom:'32px' }}>
          <h2 style={{ fontWeight:900, fontSize:'14px', color:'#161d1b', textTransform:'uppercase' as const, letterSpacing:'0.1em', marginBottom:'16px' }}>BROWSE BY TREATMENT</h2>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(5,1fr)', gap:'12px' }}>
            {SUBCATS.map(sub=>(
              <Link key={sub.slug} href={`/${locale}/services/wellness-spa/${sub.slug}`} style={{ textDecoration:'none' }}>
                <div style={{ position:'relative', borderRadius:'20px', overflow:'hidden', cursor:'pointer', transition:'transform 0.2s', aspectRatio:'1/1' }}
                  onMouseEnter={e=>(e.currentTarget as HTMLDivElement).style.transform='scale(1.04)'}
                  onMouseLeave={e=>(e.currentTarget as HTMLDivElement).style.transform='scale(1)'}>
                  <img src={sub.image} alt={sub.label} style={{ width:'100%', height:'100%', objectFit:'cover' }} />
                  <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top,rgba(0,0,0,0.82),rgba(0,0,0,0.1))' }} />
                  <div style={{ position:'absolute', bottom:'10px', left:'10px', right:'10px' }}>
                    <p style={{ fontSize:'11px', fontWeight:800, color:'white', lineHeight:1.2, textTransform:'uppercase' as const, letterSpacing:'0.06em' }}>{sub.label}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'12px 0', borderTop:'1px solid rgba(186,202,197,0.25)', borderBottom:'1px solid rgba(186,202,197,0.25)', marginBottom:'16px', flexWrap:'wrap' as const, gap:'10px' }}>
          <div style={{ display:'flex', gap:'4px', padding:'4px', backgroundColor:'#e8efec', borderRadius:'100px' }}>
            {['All','Online','In-Person','Home Visit'].map(t=>(
              <button key={t} onClick={()=>setTab(t)} style={{ padding:'8px 20px', borderRadius:'100px', fontSize:'11px', fontWeight:700, cursor:'pointer', border:'none', transition:'all 0.2s',
                backgroundColor:tab===t?'#161d1b':'transparent', color:tab===t?'white':'#6b7a76',
                boxShadow:tab===t?'0 2px 8px rgba(0,0,0,0.15)':'none' }}>{t}</button>
            ))}
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:'16px' }}>
            <div style={{ display:'flex', alignItems:'center', gap:'8px', cursor:'pointer' }} onClick={()=>setDiamond(!diamond)}>
              <span style={{ fontSize:'12px', fontWeight:700, color:'#6b7a76' }}>Diamond Verified First</span>
              <div style={{ width:'40px', height:'20px', borderRadius:'100px', backgroundColor:diamond?'#22d4a8':'#bacac5', position:'relative', transition:'background 0.25s' }}>
                <div style={{ position:'absolute', top:'2px', left:diamond?'22px':'2px', width:'16px', height:'16px', borderRadius:'50%', backgroundColor:'white', transition:'left 0.25s' }} />
              </div>
            </div>
            <div style={{ display:'flex', gap:'6px' }}>
              <button onClick={()=>setGrid(true)} style={{ width:'34px', height:'34px', display:'flex', alignItems:'center', justifyContent:'center', borderRadius:'8px', border:'none', cursor:'pointer', backgroundColor:grid?'#161d1b':'#e8efec', color:grid?'white':'#161d1b' }}><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg></button>
              <button onClick={()=>setGrid(false)} style={{ width:'34px', height:'34px', display:'flex', alignItems:'center', justifyContent:'center', borderRadius:'8px', border:'none', cursor:'pointer', backgroundColor:!grid?'#161d1b':'#e8efec', color:!grid?'white':'#161d1b' }}><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg></button>
            </div>
          </div>
        </div>

        <div style={{ display:'flex', gap:'8px', marginBottom:'32px', flexWrap:'wrap' as const }}>
          {['New Arrivals','Top Rated','Best Price'].map(c=>(
            <button key={c} onClick={()=>setChip(c)}
              style={{ padding:'8px 18px', borderRadius:'100px', fontSize:'12px', fontWeight:700, cursor:'pointer', border:chip===c?'none':'1px solid rgba(186,202,197,0.5)', backgroundColor:chip===c?'#161d1b':'white', color:chip===c?'white':'#3c4a46', transition:'all 0.15s' }}
              onMouseEnter={e=>{if(chip!==c){e.currentTarget.style.borderColor='#22d4a8';e.currentTarget.style.color='#161d1b'}}}
              onMouseLeave={e=>{if(chip!==c){e.currentTarget.style.borderColor='rgba(186,202,197,0.5)';e.currentTarget.style.color='#3c4a46'}}}
            >{c}</button>
          ))}
        </div>

        <section style={{ marginBottom:'40px' }}>
          <h2 style={{ fontSize:'13px', fontWeight:900, color:'#161d1b', textTransform:'uppercase' as const, letterSpacing:'0.1em', marginBottom:'20px' }}>SOUKNI TOP CHOICES</h2>
          {topChoices.map(item=><TopCard key={item.id} item={item} locale={locale} />)}
        </section>

        <div style={{ borderRadius:'40px', overflow:'hidden', marginBottom:'40px', background:'linear-gradient(135deg,#161d1b,#1a2e28)', padding:'40px 48px', display:'grid', gridTemplateColumns:'1fr 1fr', gap:'40px', alignItems:'center' }}>
          <div>
            <p style={{ fontSize:'10px', fontWeight:700, color:'#22d4a8', textTransform:'uppercase' as const, letterSpacing:'0.15em', marginBottom:'8px' }}>SouKni Immo Pro</p>
            <h3 style={{ fontWeight:900, letterSpacing:'-0.05em', fontSize:'28px', color:'white', marginBottom:'12px', lineHeight:1.1 }}>List your luxury property where Morocco's elite browse.</h3>
            <Link href={`/${locale}/property`} style={{ textDecoration:'none' }}><button style={{ backgroundColor:'#22d4a8', color:'white', border:'none', padding:'11px 24px', borderRadius:'100px', fontWeight:700, fontSize:'12px', cursor:'pointer' }}>Explore Properties</button></Link>
          </div>
          <div style={{ position:'relative', height:'200px', borderRadius:'24px', overflow:'hidden' }}>
            <img src="https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&w=800" alt="Property" style={{ width:'100%', height:'100%', objectFit:'cover', opacity:0.7 }} />
          </div>
        </div>

        <section style={{ marginBottom:'40px' }}>
          <h2 style={{ fontWeight:900, letterSpacing:'-0.05em', fontSize:'22px', color:'#22d4a8', marginBottom:'16px' }}>SouKni Wellness Collection</h2>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'16px', marginBottom:'16px' }}>
            {bentoListings.slice(0,3).map(item=>(
              <Link key={item.id} href={`/${locale}/listing/${item.id}`} style={{ textDecoration:'none' }}>
                <div style={{ position:'relative', height:'220px', borderRadius:'28px', overflow:'hidden', cursor:'pointer', transition:'transform 0.2s' }} onMouseEnter={e=>(e.currentTarget as HTMLDivElement).style.transform='scale(1.02)'} onMouseLeave={e=>(e.currentTarget as HTMLDivElement).style.transform='scale(1)'}>
                  <img src={item.image} alt={item.title} style={{ width:'100%', height:'100%', objectFit:'cover' }} />
                  <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top,rgba(0,0,0,0.85),rgba(0,0,0,0.05))' }} />
                  <div style={{ position:'absolute', top:'12px', left:'12px' }}><CertifiedBadge /></div>
                  <div style={{ position:'absolute', bottom:'16px', left:'16px', right:'16px' }}>
                    <h3 style={{ fontWeight:900, fontSize:'14px', color:'white', marginBottom:'4px', lineHeight:1.3 }}>{item.title}</h3>
                    <p style={{ fontWeight:900, fontSize:'16px', color:'#22d4a8' }}>{item.price.toLocaleString()} MAD</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'16px' }}>
            {bentoListings.slice(3).map(item=>(
              <Link key={item.id} href={`/${locale}/listing/${item.id}`} style={{ textDecoration:'none' }}>
                <div style={{ position:'relative', height:'200px', borderRadius:'28px', overflow:'hidden', cursor:'pointer', transition:'transform 0.2s' }} onMouseEnter={e=>(e.currentTarget as HTMLDivElement).style.transform='scale(1.02)'} onMouseLeave={e=>(e.currentTarget as HTMLDivElement).style.transform='scale(1)'}>
                  <img src={item.image} alt={item.title} style={{ width:'100%', height:'100%', objectFit:'cover' }} />
                  <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top,rgba(0,0,0,0.85),rgba(0,0,0,0.05))' }} />
                  <div style={{ position:'absolute', top:'12px', left:'12px' }}><CertifiedBadge /></div>
                  <div style={{ position:'absolute', bottom:'16px', left:'16px', right:'16px' }}>
                    <h3 style={{ fontWeight:900, fontSize:'15px', color:'white', marginBottom:'4px' }}>{item.title}</h3>
                    <p style={{ fontWeight:900, fontSize:'17px', color:'#22d4a8' }}>{item.price.toLocaleString()} MAD</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section style={{ marginBottom:'40px' }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'20px' }}>
            <h2 style={{ fontWeight:900, letterSpacing:'-0.05em', fontSize:'20px', color:'#161d1b' }}>
              {filtered.length > 0 ? `${filtered.length} More Wellness & Spa Services` : 'No results found'}
            </h2>
            <Link href="#" style={{ color:'#22d4a8', fontWeight:700, fontSize:'13px', textDecoration:'none', display:'flex', alignItems:'center', gap:'3px' }}>View all <ChevronRight size={14} /></Link>
          </div>
          {filtered.length === 0 ? (
            <div style={{ textAlign:'center' as const, padding:'60px 20px', backgroundColor:'white', borderRadius:'24px', border:'1px solid rgba(107,122,118,0.1)' }}>
              <p style={{ fontSize:'18px', fontWeight:700, color:'#161d1b', marginBottom:'8px' }}>No services match your search</p>
              <p style={{ fontSize:'14px', color:'#6b7a76', marginBottom:'20px' }}>Try a different city, keyword or budget range</p>
              <button onClick={clearAll} style={{ padding:'11px 28px', borderRadius:'100px', backgroundColor:'#22d4a8', color:'white', border:'none', fontWeight:700, fontSize:'13px', cursor:'pointer' }}>Clear Filters</button>
            </div>
          ) : (
            <div style={{ display:'grid', gridTemplateColumns:grid?'repeat(4,1fr)':'1fr', gap:'16px' }}>
              {filtered.map(item=> grid
                ? <GridDiscoCard key={item.id} item={item} locale={locale} />
                : <DiscoCard key={item.id} item={item} locale={locale} />
              )}
            </div>
          )}
        </section>

        <div style={{ display:'flex', justifyContent:'center', alignItems:'center', gap:'8px', marginBottom:'48px' }}>
          {[1,2,3,4].map(p=><button key={p} onClick={()=>setPage(p)} style={{ width:'36px', height:'36px', borderRadius:'10px', border:page===p?'none':'1px solid #e2e8f0', backgroundColor:page===p?'#22d4a8':'white', color:page===p?'white':'#161d1b', fontWeight:700, fontSize:'13px', cursor:'pointer' }}>{p}</button>)}
        </div>

        <section style={{ borderRadius:'40px', background:'linear-gradient(135deg,#22d4a8,#0f9b8e)', padding:'56px 48px', display:'flex', alignItems:'center', justifyContent:'space-between', gap:'40px', flexWrap:'wrap' as const, marginBottom:'48px' }}>
          <div>
            <h2 style={{ fontWeight:900, letterSpacing:'-0.05em', fontSize:'36px', color:'white', marginBottom:'10px', lineHeight:1.05 }}>JOIN THE SOUKNI FAMILY</h2>
            <p style={{ fontSize:'15px', color:'rgba(255,255,255,0.85)', maxWidth:'480px', lineHeight:1.7 }}>List your wellness or spa service for free and reach thousands of clients across Morocco.</p>
            <div style={{ display:'flex', gap:'12px', marginTop:'24px' }}>
              <button style={{ backgroundColor:'white', color:'#0f9b8e', border:'none', padding:'12px 24px', borderRadius:'100px', fontWeight:800, fontSize:'13px', cursor:'pointer' }}>App Store</button>
              <button style={{ backgroundColor:'rgba(255,255,255,0.2)', color:'white', border:'1px solid rgba(255,255,255,0.4)', padding:'12px 24px', borderRadius:'100px', fontWeight:800, fontSize:'13px', cursor:'pointer' }}>Google Play</button>
            </div>
          </div>
          <Link href={`/${locale}/post-ad`} style={{ textDecoration:'none' }}>
            <span style={{ display:'inline-block', backgroundColor:'white', color:'#0f9b8e', padding:'16px 36px', borderRadius:'100px', fontWeight:900, fontSize:'14px', cursor:'pointer', whiteSpace:'nowrap' as const }}>Post Free Ad →</span>
          </Link>
        </section>

        <div style={{ textAlign:'center' as const }}>
          <Link href={`/${locale}/services`}
            style={{ display:'inline-flex', alignItems:'center', gap:'8px', padding:'14px 40px', borderRadius:'100px', backgroundColor:'#161d1b', color:'white', textDecoration:'none', fontSize:'12px', fontWeight:700, textTransform:'uppercase' as const, letterSpacing:'0.1em', transition:'background 0.2s' }}
            onMouseEnter={e=>e.currentTarget.style.backgroundColor='#22d4a8'}
            onMouseLeave={e=>e.currentTarget.style.backgroundColor='#161d1b'}>
            ← Back to All Services
          </Link>
        </div>

      </div>
    </div>
  )
}
