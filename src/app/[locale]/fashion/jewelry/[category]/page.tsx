'use client'

import { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import React from 'react'
import { Heart, Search, ChevronDown, ChevronLeft, ChevronRight, SlidersHorizontal, MapPin } from 'lucide-react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { ALL_CITIES } from '@/data/moroccoLocations'
import { useListings } from '@/hooks/useListings'

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

const CATEGORIES: Record<string,{
  label:string; hero:string; desc:string; count:string;
  brands:string[]; priceRanges:string[]; emoji:string
}> = {
  'all-jewelry': {
    label:'All Jewelry', emoji:'💎',
    hero:'https://images.pexels.com/photos/1458867/pexels-photo-1458867.jpeg?auto=compress&w=1600',
    desc:'Browse the complete SouKni fine jewelry & watches collection.',
    count:'4,218',
    brands:['Cartier','Van Cleef & Arpels','Rolex','Bulgari','Tiffany & Co','Harry Winston','Chopard','Patek Philippe'],
    priceRanges:['Any Price','0 – 5,000 MAD','5,000 – 20,000 MAD','20,000 – 80,000 MAD','80,000 – 200,000 MAD','200,000+ MAD'],
  },
  'rings': {
    label:'Rings', emoji:'💍',
    hero:'https://images.pexels.com/photos/1458867/pexels-photo-1458867.jpeg?auto=compress&w=1600',
    desc:'Exquisite rings — from engagement solitaires to iconic fashion bands.',
    count:'1,284',
    brands:['Cartier','Tiffany & Co','Van Cleef & Arpels','Bulgari','Harry Winston','Graff','Piaget'],
    priceRanges:['Any Price','0 – 5,000 MAD','5,000 – 20,000 MAD','20,000 – 60,000 MAD','60,000 – 150,000 MAD','150,000+ MAD'],
  },
  'necklaces': {
    label:'Necklaces', emoji:'📿',
    hero:'https://images.pexels.com/photos/248077/pexels-photo-248077.jpeg?auto=compress&w=1600',
    desc:"Timeless necklaces and pendants from the world's finest maisons.",
    count:'976',
    brands:['Van Cleef & Arpels','Cartier','Tiffany & Co','Bulgari','Mikimoto','Chopard','Harry Winston'],
    priceRanges:['Any Price','0 – 5,000 MAD','5,000 – 25,000 MAD','25,000 – 80,000 MAD','80,000+ MAD'],
  },
  'watches': {
    label:'Watches', emoji:'⌚',
    hero:'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&w=1600',
    desc:'Iconic timepieces — from Rolex sports models to Patek Philippe complications.',
    count:'892',
    brands:['Rolex','Patek Philippe','Audemars Piguet','Richard Mille','Cartier','IWC','Omega','Jaeger-LeCoultre'],
    priceRanges:['Any Price','0 – 20,000 MAD','20,000 – 60,000 MAD','60,000 – 150,000 MAD','150,000 – 400,000 MAD','400,000+ MAD'],
  },
  'bracelets': {
    label:'Bracelets', emoji:'✨',
    hero:'https://images.pexels.com/photos/1395306/pexels-photo-1395306.jpeg?auto=compress&w=1600',
    desc:'Luxury bracelets from Love bangles to tennis diamonds.',
    count:'754',
    brands:['Cartier','Van Cleef & Arpels','Bulgari','Tiffany & Co','David Yurman','Chopard'],
    priceRanges:['Any Price','0 – 5,000 MAD','5,000 – 25,000 MAD','25,000 – 80,000 MAD','80,000+ MAD'],
  },
  'earrings': {
    label:'Earrings', emoji:'👂',
    hero:'https://images.pexels.com/photos/1413420/pexels-photo-1413420.jpeg?auto=compress&w=1600',
    desc:'Statement earrings from classic studs to dramatic chandeliers.',
    count:'312',
    brands:['Cartier','Chanel','Dior','Bulgari','Tiffany & Co','Van Cleef & Arpels','Piaget'],
    priceRanges:['Any Price','0 – 3,000 MAD','3,000 – 10,000 MAD','10,000 – 30,000 MAD','30,000+ MAD'],
  },
}

const ALL_CATS = [
  { label:'All Jewelry', slug:'all-jewelry', emoji:'💎' },
  { label:'Rings',       slug:'rings',       emoji:'💍' },
  { label:'Necklaces',   slug:'necklaces',   emoji:'📿' },
  { label:'Watches',     slug:'watches',     emoji:'⌚' },
  { label:'Bracelets',   slug:'bracelets',   emoji:'✨' },
  { label:'Earrings',    slug:'earrings',    emoji:'👂' },
]

const JEWELRY_IMGS = [
  'https://images.pexels.com/photos/1458867/pexels-photo-1458867.jpeg?auto=compress&w=400',
  'https://images.pexels.com/photos/248077/pexels-photo-248077.jpeg?auto=compress&w=400',
  'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&w=400',
  'https://images.pexels.com/photos/1395306/pexels-photo-1395306.jpeg?auto=compress&w=400',
  'https://images.pexels.com/photos/1413420/pexels-photo-1413420.jpeg?auto=compress&w=400',
]

type BadgeT = 'certified'|'diamond'|'featured'|'new'
function Badge({ type }: { type: BadgeT }) {
  const map: Record<BadgeT,{bg:string;color:string;label:string}> = {
    certified:{ bg:C.mint,   color:C.ink,  label:'SouKni Certified' },
    diamond:  { bg:C.ink,    color:C.mint, label:'◆ DIAMOND'        },
    featured: { bg:'#fbbf24',color:C.ink,  label:'Featured'         },
    new:      { bg:C.mint,   color:'white', label:'New Arrival'     },
  }
  const s = map[type]
  return (
    <span style={{ backgroundColor:s.bg, color:s.color, fontSize:'8px', ...CB, padding:'4px 10px', borderRadius:'6px', textTransform:'uppercase' as const, letterSpacing:'0.08em', display:'inline-block', boxShadow:'0 2px 6px rgba(0,0,0,0.15)', whiteSpace:'nowrap' as const }}>
      {s.label}
    </span>
  )
}

function ListingCard({ brand, title, price, location, condition, img, badge, metal }: any) {
  const [saved, setSaved] = useState(false)
  const [hov,   setHov  ] = useState(false)
  return (
    <article onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{ backgroundColor:'white', borderRadius:'24px', border:`1px solid ${hov?C.mint:'rgba(107,122,118,0.1)'}`, overflow:'hidden', boxShadow:hov?`0 20px 40px ${C.mint}18`:'0 2px 8px rgba(0,0,0,0.04)', transition:'all 0.3s', cursor:'pointer', display:'flex', flexDirection:'column' as const }}>
      <div style={{ position:'relative', aspectRatio:'1/1', overflow:'hidden', backgroundColor:C.cream }}>
        <img src={img} alt={title} style={{ width:'100%', height:'100%', objectFit:'cover', transition:'transform 0.6s', transform:hov?'scale(1.08)':'scale(1)' }} />
        <div style={{ position:'absolute', top:'10px', left:'10px', zIndex:10 }}><Badge type={badge} /></div>
        <button onClick={e=>{e.stopPropagation();setSaved(!saved)}}
          style={{ position:'absolute', top:'8px', right:'8px', zIndex:10, width:'32px', height:'32px', borderRadius:'50%', backgroundColor:'rgba(255,255,255,0.85)', border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}>
          <Heart size={14} fill={saved?'#ef4444':'none'} color={saved?'#ef4444':C.muted} />
        </button>
        {condition && (
          <div style={{ position:'absolute', bottom:'10px', left:'10px', zIndex:10, backgroundColor:'rgba(255,255,255,0.92)', padding:'3px 8px', borderRadius:'6px', fontSize:'9px', ...CB, color:C.mint, textTransform:'uppercase' as const }}>
            {condition}
          </div>
        )}
      </div>
      <div style={{ padding:'16px 18px', flex:1, display:'flex', flexDirection:'column' as const }}>
        <p style={{ fontSize:'9px', ...CB, color:C.mint, textTransform:'uppercase' as const, letterSpacing:'0.1em', marginBottom:'2px' }}>{brand}</p>
        <h4 style={{ fontSize:'14px', ...CB, color:hov?C.mint:C.ink, marginBottom:'4px', transition:'color 0.2s', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' as const }}>{title}</h4>
        {metal && <p style={{ fontSize:'10px', ...CB, color:C.muted, marginBottom:'2px' }}>{metal}</p>}
        <p style={{ fontSize:'18px', ...CB, color:C.mint, marginBottom:'6px' }}>{price.toLocaleString()} MAD</p>
        {location && <p style={{ fontSize:'10px', color:C.muted, ...CB, display:'flex', alignItems:'center', gap:'3px', marginBottom:'12px' }}><MapPin size={10}/>{location}</p>}
        <div style={{ marginTop:'auto', display:'flex', gap:'8px' }}>
          <button style={{ flex:1, border:`2px solid ${C.ink}`, color:C.ink, backgroundColor:'transparent', padding:'9px', borderRadius:'12px', fontSize:'10px', ...CB, textTransform:'uppercase' as const, cursor:'pointer', transition:'all 0.15s' }}
            onMouseEnter={e=>{e.currentTarget.style.backgroundColor=C.ink;e.currentTarget.style.color='white'}}
            onMouseLeave={e=>{e.currentTarget.style.backgroundColor='transparent';e.currentTarget.style.color=C.ink}}
          >Message</button>
          <a href="https://wa.me/212600000000?text=Hi%2C%20I%20found%20your%20jewelry%20listing%20on%20SouKni!" target="_blank" rel="noopener noreferrer"
            style={{ flex:1, backgroundColor:'#25D366', color:'white', border:'none', padding:'9px', borderRadius:'12px', fontSize:'10px', ...CB, textTransform:'uppercase' as const, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', gap:'4px', textDecoration:'none' }}>
            💬 WhatsApp
          </a>
        </div>
      </div>
    </article>
  )
}

function ListRowCard({ brand, title, price, location, condition, img, badge, metal }: any) {
  const [saved, setSaved] = useState(false)
  const [hov,   setHov  ] = useState(false)
  return (
    <article onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{ backgroundColor:'white', borderRadius:'20px', border:`1px solid ${hov?C.mint:'rgba(107,122,118,0.1)'}`, overflow:'hidden', boxShadow:hov?`0 12px 32px ${C.mint}18`:'0 2px 8px rgba(0,0,0,0.04)', transition:'all 0.3s', cursor:'pointer', display:'flex', height:'160px' }}>
      <div style={{ position:'relative', width:'160px', flexShrink:0, overflow:'hidden', backgroundColor:C.cream }}>
        <img src={img} alt={title} style={{ width:'100%', height:'100%', objectFit:'cover', transition:'transform 0.6s', transform:hov?'scale(1.08)':'scale(1)' }} />
        <div style={{ position:'absolute', top:'8px', left:'8px', zIndex:10 }}><Badge type={badge} /></div>
        {condition && <div style={{ position:'absolute', bottom:'8px', left:'8px', zIndex:10, backgroundColor:'rgba(255,255,255,0.92)', padding:'2px 7px', borderRadius:'6px', fontSize:'8px', ...CB, color:C.mint, textTransform:'uppercase' as const }}>{condition}</div>}
      </div>
      <div style={{ flex:1, padding:'16px 20px', display:'flex', flexDirection:'column' as const, justifyContent:'space-between', minWidth:0 }}>
        <div>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', gap:'12px' }}>
            <div style={{ minWidth:0 }}>
              <p style={{ fontSize:'9px', ...CB, color:C.mint, textTransform:'uppercase' as const, letterSpacing:'0.1em', marginBottom:'2px' }}>{brand}</p>
              <h4 style={{ fontSize:'15px', ...CB, color:hov?C.mint:C.ink, marginBottom:'4px', transition:'color 0.2s', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' as const }}>{title}</h4>
              {metal && <p style={{ fontSize:'10px', ...CB, color:C.muted }}>{metal}</p>}
            </div>
            <button onClick={e=>{e.stopPropagation();setSaved(!saved)}} style={{ flexShrink:0, width:'30px', height:'30px', borderRadius:'50%', backgroundColor:C.surface, border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}>
              <Heart size={13} fill={saved?'#ef4444':'none'} color={saved?'#ef4444':C.muted} />
            </button>
          </div>
          {location && <p style={{ fontSize:'10px', color:C.muted, ...CB, display:'flex', alignItems:'center', gap:'3px', marginTop:'6px' }}><MapPin size={10}/>{location}</p>}
        </div>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', gap:'12px' }}>
          <p style={{ fontSize:'20px', ...CB, color:C.mint }}>{price.toLocaleString()} MAD</p>
          <div style={{ display:'flex', gap:'8px' }}>
            <button style={{ border:`2px solid ${C.ink}`, color:C.ink, backgroundColor:'transparent', padding:'8px 16px', borderRadius:'10px', fontSize:'10px', ...CB, textTransform:'uppercase' as const, cursor:'pointer', transition:'all 0.15s' }}
              onMouseEnter={e=>{e.currentTarget.style.backgroundColor=C.ink;e.currentTarget.style.color='white'}}
              onMouseLeave={e=>{e.currentTarget.style.backgroundColor='transparent';e.currentTarget.style.color=C.ink}}
            >Message</button>
            <a href="https://wa.me/212600000000?text=Hi%2C%20I%20found%20your%20jewelry%20listing%20on%20SouKni!" target="_blank" rel="noopener noreferrer"
              style={{ backgroundColor:'#25D366', color:'white', border:'none', padding:'8px 16px', borderRadius:'10px', fontSize:'10px', ...CB, textTransform:'uppercase' as const, cursor:'pointer', textDecoration:'none', display:'flex', alignItems:'center' }}>
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </article>
  )
}

function makeListings(cat: string, count: number) {
  const titleMap: Record<string,string[]> = {
    'all-jewelry': ['Love Ring','Alhambra Necklace','Datejust 41','Love Bracelet','Serpenti Ring','Diamond Solitaire'],
    'rings':       ['Love Ring','Solitaire 1ct','Engagement Ring','Band Ring','Eternity Ring','Fashion Ring','Promise Ring'],
    'necklaces':   ['Alhambra Necklace','Diamond Pendant','Pearl Necklace','Gold Chain','Tennis Necklace','Choker'],
    'watches':     ['Datejust 41','Nautilus 5711','Royal Oak 15400','RM 011','Santos de Cartier','Speedmaster','Perpetual Calendar'],
    'bracelets':   ['Love Bracelet','Alhambra Bracelet','Serpenti Bracelet','Tennis Bracelet','T Wire Bracelet','Knot Bracelet'],
    'earrings':    ['Diamond Studs','Drop Earrings','Hoop Earrings','Chandelier Earrings','Pearl Studs','Gold Hoops'],
  }
  const metalMap: Record<string,string[]> = {
    'rings':       ['18K Yellow Gold','18K White Gold','Platinum','18K Rose Gold'],
    'necklaces':   ['18K Yellow Gold','18K White Gold','Platinum'],
    'watches':     ['Steel','18K Yellow Gold','18K White Gold','Two-Tone'],
    'bracelets':   ['18K Yellow Gold','18K White Gold','18K Rose Gold','Platinum'],
    'earrings':    ['18K Yellow Gold','18K White Gold','Platinum'],
    'all-jewelry': ['18K Yellow Gold','18K White Gold','Steel','Platinum'],
  }
  const cat_data = CATEGORIES[cat] || CATEGORIES['all-jewelry']
  const titles = titleMap[cat] || titleMap['all-jewelry']
  const metals = metalMap[cat] || metalMap['all-jewelry']
  const badges: BadgeT[] = ['certified','diamond','featured','new','certified','diamond']
  const locs  = ['Rabat','Casablanca','Marrakech','Fès','Tanger','Agadir','Meknès']
  const conds = ['Like New','New','Excellent','Pristine',undefined,undefined]
  const sellers = ['SouKni Members','SouKni Pro','SouKni Members','SouKni Pro']
  return Array.from({length:count},(_,i)=>({
    brand:     cat_data.brands[i%cat_data.brands.length],
    title:     `${titles[i%titles.length]} — ${['Diamond','Ruby','Emerald','Sapphire','Classic','Vintage'][i%6]}`,
    price:     5000 + ((i*3731)%280000),
    location:  locs[i%locs.length],
    condition: conds[i%conds.length],
    metal:     metals[i%metals.length],
    img:       JEWELRY_IMGS[i%JEWELRY_IMGS.length],
    badge:     badges[i%badges.length],
    seller:    sellers[i%sellers.length],
    discount:  i%3===0 ? 10+((i*7)%30) : null,
    isNew:     badges[i%badges.length]==='new' || i%5===0,
  }))
}

function DDrop({ label, value, options, open, setOpen, onChange, closeOthers, heroStyle }: any) {
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
        {options.map((opt:string)=>(
          <button key={opt} onClick={()=>{ onChange(opt); setOpen(false) }}
            style={{ width:'100%', padding:'10px 18px', background:'none', border:'none', cursor:'pointer', textAlign:'left' as const, fontSize:'13px', ...UB, color:opt===value?C.mint:C.ink, display:'flex', justifyContent:'space-between', alignItems:'center' }}
            onMouseEnter={e=>e.currentTarget.style.backgroundColor=C.surface}
            onMouseLeave={e=>e.currentTarget.style.backgroundColor='transparent'}
          >{opt}{opt===value&&<span style={{color:C.mint}}>✓</span>}</button>
        ))}
      </div>
    </>, document.body
  ) : null
  return (
    <div style={{ position:'relative', flex:1 }}>
      <button ref={btnRef} onClick={(e)=>{ e.stopPropagation(); if (closeOthers) closeOthers(); setOpen(!open) }}
        style={heroStyle
          ? { background:'none', border:'none', cursor:'pointer', padding:0, display:'flex', alignItems:'center', gap:'6px', color:'white', fontSize:'14px', ...UB }
          : { width:'100%', height:'100%', background:'none', border:'none', cursor:'pointer', padding:'0 22px', display:'flex', flexDirection:'column' as const, justifyContent:'center', textAlign:'left' as const }}>
        {heroStyle ? (
          <>{value} <ChevronDown size={14} style={{ flexShrink:0, transition:'transform 0.2s', transform:open?'rotate(180deg)':'rotate(0)' }} /></>
        ) : (
          <>
            <span style={{ fontSize:'9px', ...UB, textTransform:'uppercase' as const, letterSpacing:'0.14em', color:C.muted, marginBottom:'3px' }}>{label}</span>
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
              <span style={{ fontSize:'14px', ...UB, color:C.ink }}>{value}</span>
              <ChevronDown size={14} color={C.mint} style={{ flexShrink:0, transition:'transform 0.2s', transform:open?'rotate(180deg)':'rotate(0)' }} />
            </div>
          </>
        )}
      </button>
      {dropdown}
    </div>
  )
}

export default function JewelryCategoryPage() {
  const params   = useParams()
  const router   = useRouter()
  const locale   = (params?.locale as string) || 'en'
  const catSlug  = (params?.category as string) || 'all-jewelry'
  const catData  = CATEGORIES[catSlug] || CATEGORIES['all-jewelry']

  const [activeSeller, setActiveSeller] = useState('All Sellers')
  const [diamond,      setDiamond     ] = useState(true)
  const [gridView,     setGridView    ] = useState(true)
  const [page,         setPage        ] = useState(1)
  const [keyword,      setKeyword     ] = useState('')
  const [city,         setCity        ] = useState('Rabat')
  const [price,        setPrice       ] = useState('Any Price')
  const [sortBy,       setSortBy      ] = useState('Most Recent')
  const [sortOpen,     setSortOpen    ] = useState(false)
  const [activeBrand,  setActiveBrand ] = useState('All Brands')
  const [cityOpen,     setCityOpen    ] = useState(false)
  const [priceOpen,    setPriceOpen   ] = useState(false)
  const [showNewOnly,  setShowNewOnly ] = useState(false)
  const [showDiscount, setShowDiscount] = useState(false)

  const { fetchListings } = useListings()
  const [dbListings, setDbListings] = useState<any[]>([])

  useEffect(() => {
    const t = setTimeout(() => {
      fetchListings({
        category: 'fashion',
        sortBy: 'newest',
        limit: 24,
      }).then(rows => setDbListings(rows || []))
    }, 400)
    return () => clearTimeout(t)
  }, [])

  function mapDbRowToCard(row: any) {
    return {
      brand: row.brand || '',
      title: row.title,
      price: (row.price || 0) / 100,
      location: row.city,
      condition: row.condition || undefined,
      metal: row.metal || '',
      img: (row.images && row.images[0]) || JEWELRY_IMGS[0],
      badge: row.badge || 'certified',
      seller: row.seller || '',
      discount: null,
      isNew: row.badge === 'new',
    }
  }

  const hasRealData = dbListings.length > 0
  const listings = hasRealData ? dbListings.map(mapDbRowToCard) : makeListings(catSlug, 24)
  const cities   = ALL_CITIES

  function parsePriceRange(range: string): [number, number] {
    if (range === 'Any Price') return [0, Infinity]
    const nums = range.replace(/MAD/g,'').split('–').map(s=>parseInt(s.replace(/,/g,'').trim()))
    if (range.includes('+')) return [nums[0], Infinity]
    return [nums[0], nums[1]]
  }
  const [minP, maxP] = parsePriceRange(price)

  let filtered = listings.filter(item => {
    const matchesKeyword = keyword.trim()==='' || item.title.toLowerCase().includes(keyword.toLowerCase()) || item.brand.toLowerCase().includes(keyword.toLowerCase())
    const matchesPrice   = item.price >= minP && item.price <= maxP
    const matchesSeller  = activeSeller==='All Sellers' || item.seller===activeSeller
    const matchesBrand   = activeBrand==='All Brands' || item.brand===activeBrand
    const matchesNew     = !showNewOnly || item.isNew
    const matchesDiscount= !showDiscount || item.discount
    const matchesCity    = item.location === city
    return matchesKeyword && matchesPrice && matchesSeller && matchesBrand && matchesNew && matchesDiscount && matchesCity
  })

  if (diamond) {
    filtered = [...filtered].sort((a,b)=>{
      const rank = (b:string)=> b==='diamond'?2:b==='certified'?1:0
      return rank(b.badge) - rank(a.badge)
    })
  }
  if (sortBy === 'Price: Low to High') filtered = [...filtered].sort((a,b)=>a.price-b.price)
  if (sortBy === 'Price: High to Low') filtered = [...filtered].sort((a,b)=>b.price-a.price)

  return (
    <div style={{ ...UB, backgroundColor:C.surface, color:C.ink, minHeight:'100vh' }}>

      {/* HERO */}
      <section style={{ position:'relative', height:'360px', display:'flex', alignItems:'center', justifyContent:'center', overflow:'hidden' }}>
        <img src={catData.hero} alt={catData.label} style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover' }} />
        <div style={{ position:'absolute', inset:0, backgroundColor:'rgba(22,29,27,0.52)' }} />
        <div style={{ position:'relative', zIndex:10, textAlign:'center' as const, maxWidth:'860px', padding:'0 24px', width:'100%' }}>
          <p style={{ fontSize:'11px', ...UB, color:C.mint, textTransform:'uppercase' as const, letterSpacing:'0.2em', marginBottom:'12px' }}>FASHION › JEWELRY & WATCHES</p>
          <h1 style={{ fontSize:'clamp(32px,5vw,52px)', ...UB, color:'white', marginBottom:'16px', lineHeight:1.05, textShadow:'0 4px 20px rgba(0,0,0,0.4)' }}>
            {catData.emoji} {catData.label} in Rabat
          </h1>
          <p style={{ fontSize:'16px', color:'rgba(255,255,255,0.82)', marginBottom:'28px' }}>{catData.desc}</p>
          <div style={{ maxWidth:'620px', margin:'0 auto', backgroundColor:'rgba(255,255,255,0.12)', backdropFilter:'blur(12px)', border:'1px solid rgba(255,255,255,0.22)', borderRadius:'100px', padding:'6px', display:'flex', alignItems:'center', gap:'8px' }}>
            <div style={{ flex:1, display:'flex', alignItems:'center', gap:'8px', padding:'0 16px' }}>
              <Search size={16} color="rgba(255,255,255,0.7)" />
              <input type="text" value={keyword} onChange={e=>setKeyword(e.target.value)}
                onKeyDown={e=>{ if(e.key==='Enter') router.push(`/${locale}/search?q=${encodeURIComponent(keyword)}`) }}
                placeholder={`Search ${catData.label}...`}
                style={{ flex:1, background:'none', border:'none', outline:'none', color:'white', fontSize:'14px', ...UB, fontFamily:'Inter,sans-serif' }} />
            </div>
            <button onClick={()=>router.push(`/${locale}/search?q=${encodeURIComponent(keyword)}`)}
              style={{ backgroundColor:C.mint, color:C.ink, border:'none', padding:'12px 28px', borderRadius:'100px', fontSize:'11px', ...UB, textTransform:'uppercase' as const, letterSpacing:'0.1em', cursor:'pointer' }}>SEARCH</button>
          </div>
        </div>
      </section>

      {/* FILTER BAR */}
      <div style={{ maxWidth:'1280px', margin:'-36px auto 0', padding:'0 24px', position:'relative', zIndex:30 }}>
        <div style={{ backgroundColor:'rgba(255,255,255,0.97)', backdropFilter:'blur(16px)', border:'1px solid rgba(107,122,118,0.12)', borderRadius:'100px', boxShadow:'0 12px 40px rgba(0,0,0,0.08)', display:'flex', alignItems:'stretch', height:'68px' }}>
          <DDrop label="CITY" value={city} options={cities} open={cityOpen} setOpen={setCityOpen} onChange={setCity} closeOthers={()=>setPriceOpen(false)} />
          <div style={{ width:'1px', backgroundColor:'rgba(107,122,118,0.12)', margin:'12px 0' }} />
          <div style={{ flex:1.8, padding:'0 22px', display:'flex', flexDirection:'column' as const, justifyContent:'center' }}>
            <span style={{ fontSize:'9px', ...UB, textTransform:'uppercase' as const, letterSpacing:'0.14em', color:C.muted, marginBottom:'3px' }}>KEYWORD</span>
            <div style={{ display:'flex', alignItems:'center', gap:'8px' }}>
              <Search size={13} color={C.muted} />
              <input type="text" value={keyword} onChange={e=>setKeyword(e.target.value)} placeholder={`e.g. ${catData.brands[0]}, Diamond, 18K...`}
                style={{ flex:1, background:'none', border:'none', outline:'none', fontSize:'14px', ...UB, color:C.ink, fontFamily:'Inter,sans-serif' }} />
              {keyword && <button onClick={()=>setKeyword('')} style={{ background:'none', border:'none', cursor:'pointer', color:C.muted, fontSize:'16px' }}>✕</button>}
            </div>
          </div>
          <div style={{ width:'1px', backgroundColor:'rgba(107,122,118,0.12)', margin:'12px 0' }} />
          <DDrop label="PRICE (MAD)" value={price} options={catData.priceRanges} open={priceOpen} setOpen={setPriceOpen} onChange={setPrice} closeOthers={()=>setCityOpen(false)} />
          <div style={{ width:'1px', backgroundColor:'rgba(107,122,118,0.12)', margin:'12px 0' }} />
          <button style={{ display:'flex', alignItems:'center', gap:'10px', padding:'0 28px', background:'none', border:'none', cursor:'pointer', borderRadius:'0 100px 100px 0', flexShrink:0 }}>
            <SlidersHorizontal size={18} color={C.mint} />
            <span style={{ fontSize:'14px', ...UB, color:C.ink }}>Filters</span>
          </button>
        </div>
      </div>

      <main style={{ maxWidth:'1280px', margin:'0 auto', padding:'32px 24px 80px' }}>

        {/* BREADCRUMB */}
        <nav style={{ display:'flex', alignItems:'center', gap:'6px', fontSize:'10px', ...UB, color:C.muted, textTransform:'uppercase' as const, letterSpacing:'0.12em', marginBottom:'12px' }}>
          {[
            { label:'Rabat',              href:`/${locale}` },
            { label:'Fashion',            href:`/${locale}/fashion` },
            { label:'Jewelry & Watches',  href:`/${locale}/fashion/jewelry` },
            { label:catData.label,        href:null },
          ].map((c,i,arr)=>(
            <span key={c.label} style={{ display:'flex', alignItems:'center', gap:'6px' }}>
              {c.href
                ? <Link href={c.href} style={{ color:C.muted, textDecoration:'none' }} onMouseEnter={e=>e.currentTarget.style.color=C.mint} onMouseLeave={e=>e.currentTarget.style.color=C.muted}>{c.label}</Link>
                : <span style={{ color:C.ink }}>{c.label}</span>}
              {i<arr.length-1 && <span style={{ opacity:0.4 }}>›</span>}
            </span>
          ))}
        </nav>

        {/* SORT + SAVE */}
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', gap:'16px', marginBottom:'24px', flexWrap:'wrap' as const }}>
          <div>
            <h2 style={{ fontSize:'clamp(20px,2.5vw,28px)', ...UB, color:C.ink, marginBottom:'4px' }}>{catData.label} for Sale in Rabat</h2>
            <p style={{ fontSize:'14px', color:C.mint, ...CB }}>{catData.count} Ads</p>
          </div>
          <div style={{ display:'flex', gap:'10px' }}>
            <div style={{ position:'relative' }}>
              <button onClick={()=>setSortOpen(!sortOpen)} style={{ backgroundColor:'white', border:'1px solid rgba(107,122,118,0.18)', padding:'9px 16px', borderRadius:'12px', fontSize:'10px', ...UB, textTransform:'uppercase' as const, letterSpacing:'0.1em', cursor:'pointer', color:C.ink }}>↕ Sort: {sortBy}</button>
              {sortOpen && (
                <div style={{ position:'absolute', top:'calc(100% + 6px)', right:0, backgroundColor:'white', borderRadius:'14px', boxShadow:'0 12px 30px rgba(0,0,0,0.12)', border:'1px solid rgba(107,122,118,0.12)', zIndex:100, overflow:'hidden', minWidth:'180px' }}>
                  {['Most Recent','Price: Low to High','Price: High to Low'].map(opt=>(
                    <button key={opt} onClick={()=>{setSortBy(opt);setSortOpen(false)}} style={{ width:'100%', padding:'10px 16px', background:'none', border:'none', textAlign:'left' as const, fontSize:'11px', ...UB, color:sortBy===opt?C.mint:C.ink, cursor:'pointer' }}>{opt}</button>
                  ))}
                </div>
              )}
            </div>
            <button style={{ backgroundColor:'white', border:'1px solid rgba(107,122,118,0.18)', padding:'9px 16px', borderRadius:'12px', fontSize:'10px', ...UB, textTransform:'uppercase' as const, letterSpacing:'0.1em', cursor:'pointer', color:C.ink }}>🔖 Save Search</button>
          </div>
        </div>

        {/* SUB-CATEGORY PILLS */}
        <div style={{ display:'flex', gap:'10px', flexWrap:'wrap' as const, marginBottom:'20px' }}>
          {ALL_CATS.map(cat=>(
            <Link key={cat.slug} href={`/${locale}/fashion/jewelry/${cat.slug}`}
              style={{ padding:'10px 22px', borderRadius:'100px', fontSize:'11px', ...UB, textTransform:'uppercase' as const, letterSpacing:'0.1em', cursor:'pointer', border:'1px solid', textDecoration:'none', display:'inline-block',
                backgroundColor: catSlug===cat.slug?C.mint:'white', color: catSlug===cat.slug?C.ink:C.muted, borderColor: catSlug===cat.slug?C.mint:'rgba(186,202,197,0.4)' }}>
              {cat.emoji} {cat.label}
            </Link>
          ))}
        </div>

        {/* SELLER TABS + DIAMOND */}
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap' as const, gap:'14px', marginBottom:'20px' }}>
          <div style={{ display:'flex', gap:'4px', padding:'5px', backgroundColor:'#e8efec', borderRadius:'100px' }}>
            {['All Sellers','SouKni Members','SouKni Pro'].map(tab=>(
              <button key={tab} onClick={()=>setActiveSeller(tab)}
                style={{ padding:'10px 24px', borderRadius:'100px', fontSize:'11px', ...UB, textTransform:'uppercase' as const, letterSpacing:'0.1em', cursor:'pointer', border:'none',
                  backgroundColor: activeSeller===tab?C.ink:'transparent', color: activeSeller===tab?'white':C.muted }}
              >{tab}</button>
            ))}
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:'12px', cursor:'pointer' }} onClick={()=>setDiamond(!diamond)}>
            <span style={{ fontSize:'10px', ...UB, color:C.muted, textTransform:'uppercase' as const, letterSpacing:'0.1em' }}>Show SouKni Diamond Certified First</span>
            <div style={{ width:'52px', height:'26px', borderRadius:'100px', backgroundColor:diamond?C.mint:'rgba(107,122,118,0.25)', position:'relative' }}>
              <div style={{ position:'absolute', top:'3px', left:diamond?'29px':'3px', width:'20px', height:'20px', borderRadius:'50%', backgroundColor:C.ink, transition:'left 0.25s' }} />
            </div>
          </div>
        </div>

        {/* NEW ARRIVALS + GRID TOGGLE */}
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'32px' }}>
          <div style={{ display:'flex', gap:'10px' }}>
            <button onClick={()=>setShowNewOnly(!showNewOnly)}
              style={{ display:'flex', alignItems:'center', gap:'6px', padding:'9px 18px', borderRadius:'100px', border:`1px solid ${showNewOnly?C.mint:'rgba(107,122,118,0.2)'}`, backgroundColor:showNewOnly?`${C.mint}14`:'transparent', fontSize:'12px', ...UB, cursor:'pointer', color:showNewOnly?C.ink:C.muted }}
            >✨ New Arrivals</button>
            <button onClick={()=>setShowDiscount(!showDiscount)}
              style={{ display:'flex', alignItems:'center', gap:'6px', padding:'9px 18px', borderRadius:'100px', border:`1px solid ${showDiscount?C.mint:'rgba(107,122,118,0.2)'}`, backgroundColor:showDiscount?`${C.mint}14`:'transparent', fontSize:'12px', ...UB, cursor:'pointer', color:showDiscount?C.ink:C.muted }}
            >📉 Price Drop Alert</button>
          </div>
          <div style={{ display:'flex', gap:'4px', padding:'4px', backgroundColor:'white', borderRadius:'12px', border:'1px solid rgba(107,122,118,0.12)' }}>
            <button onClick={()=>setGridView(true)}  style={{ width:'36px', height:'36px', borderRadius:'8px', border:'none', cursor:'pointer', fontSize:'17px', backgroundColor:gridView?C.ink:'transparent', color:gridView?'white':C.muted }}>⊞</button>
            <button onClick={()=>setGridView(false)} style={{ width:'36px', height:'36px', borderRadius:'8px', border:'none', cursor:'pointer', fontSize:'17px', backgroundColor:!gridView?C.ink:'transparent', color:!gridView?'white':C.muted }}>☰</button>
          </div>
        </div>

        {/* BRAND FILTER */}
        <div style={{ backgroundColor:'white', borderRadius:'20px', padding:'20px 24px', marginBottom:'32px', border:'1px solid rgba(107,122,118,0.1)', boxShadow:'0 2px 8px rgba(0,0,0,0.04)' }}>
          <p style={{ fontSize:'9px', ...UB, color:C.muted, textTransform:'uppercase' as const, letterSpacing:'0.14em', marginBottom:'12px' }}>FILTER BY BRAND</p>
          <div style={{ display:'flex', gap:'8px', flexWrap:'wrap' as const }}>
            <button onClick={()=>setActiveBrand('All Brands')}
              style={{ padding:'7px 16px', borderRadius:'100px', fontSize:'10px', ...UB, border:`1px solid`, cursor:'pointer',
                backgroundColor: activeBrand==='All Brands'?C.mint:'transparent', color: activeBrand==='All Brands'?C.ink:C.muted, borderColor: activeBrand==='All Brands'?C.mint:'rgba(107,122,118,0.2)' }}>All Brands</button>
            {catData.brands.map(brand=>(
              <button key={brand} onClick={()=>setActiveBrand(brand)}
                style={{ padding:'7px 16px', borderRadius:'100px', fontSize:'10px', ...UB, border:`1px solid`, cursor:'pointer',
                  backgroundColor: activeBrand===brand?C.mint:'transparent', color: activeBrand===brand?C.ink:C.muted, borderColor: activeBrand===brand?C.mint:'rgba(107,122,118,0.2)' }}
              >{brand}</button>
            ))}
          </div>
        </div>

        {/* LISTINGS GRID */}
        <section style={{ marginBottom:'48px' }}>
          <p style={{ fontSize:'13px', color:C.muted, ...CB, marginBottom:'20px' }}>Showing {filtered.length} of {catData.count} results</p>
          {filtered.length === 0 ? (
            <p style={{ textAlign:'center' as const, color:C.muted, padding:'40px 0', fontSize:'14px', ...CB }}>No items match your filters. Try adjusting your search.</p>
          ) : gridView ? (
            <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'20px' }}>
              {filtered.map((item,i)=><ListingCard key={i} {...item} />)}
            </div>
          ) : (
            <div style={{ display:'flex', flexDirection:'column' as const, gap:'14px' }}>
              {filtered.map((item,i)=><ListRowCard key={i} {...item} />)}
            </div>
          )}
        </section>

        {/* PAGINATION */}
        <div style={{ display:'flex', justifyContent:'center', alignItems:'center', gap:'10px', marginBottom:'64px' }}>
          <button style={{ width:'44px', height:'44px', borderRadius:'12px', backgroundColor:'white', border:'1px solid rgba(107,122,118,0.12)', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', color:C.muted }}><ChevronLeft size={18} /></button>
          {[1,2,3,4,5].map(p=>(
            <button key={p} onClick={()=>setPage(p)}
              style={{ width:'44px', height:'44px', borderRadius:'12px', cursor:'pointer', fontSize:'15px', ...UB, border:'1px solid', backgroundColor:page===p?C.mint:'white', color:page===p?C.ink:C.muted, borderColor:page===p?C.mint:'rgba(107,122,118,0.12)' }}
            >{p}</button>
          ))}
          <span style={{ color:C.muted }}>…</span>
          <button style={{ width:'44px', height:'44px', borderRadius:'12px', backgroundColor:'white', border:'1px solid rgba(107,122,118,0.12)', cursor:'pointer', fontSize:'15px', ...UB, color:C.muted }}>16</button>
          <button style={{ width:'44px', height:'44px', borderRadius:'12px', backgroundColor:'white', border:'1px solid rgba(107,122,118,0.12)', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', color:C.muted }}><ChevronRight size={18} /></button>
        </div>

        {/* EXPLORE OTHER CATEGORIES */}
        <section style={{ marginBottom:'48px' }}>
          <h3 style={{ fontSize:'clamp(18px,2.5vw,24px)', ...UB, color:C.ink, textTransform:'uppercase' as const, marginBottom:'20px' }}>Explore Other Jewelry Categories</h3>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(5,1fr)', gap:'14px' }}>
            {ALL_CATS.filter(c=>c.slug!==catSlug).map(cat=>(
              <Link key={cat.slug} href={`/${locale}/fashion/jewelry/${cat.slug}`}
                style={{ backgroundColor:'white', borderRadius:'20px', padding:'24px 16px', textAlign:'center' as const, border:'1px solid rgba(107,122,118,0.1)', textDecoration:'none', display:'block' }}>
                <p style={{ fontSize:'28px', marginBottom:'8px' }}>{cat.emoji}</p>
                <p style={{ fontSize:'11px', ...UB, color:C.ink, textTransform:'uppercase' as const, letterSpacing:'0.08em' }}>{cat.label}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* BACK */}
        <div style={{ textAlign:'center' as const }}>
          <Link href={`/${locale}/fashion/jewelry`}
            style={{ display:'inline-flex', alignItems:'center', gap:'8px', padding:'16px 40px', borderRadius:'100px', backgroundColor:C.ink, color:'white', textDecoration:'none', fontSize:'12px', ...UB, textTransform:'uppercase' as const, letterSpacing:'0.1em' }}
          >← Back to All Jewelry</Link>
        </div>
      </main>
    </div>
  )
}
