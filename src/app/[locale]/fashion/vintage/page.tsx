'use client'

import { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import React from 'react'
import { Heart, Search, ChevronDown, ChevronLeft, ChevronRight, SlidersHorizontal, MapPin, Plus } from 'lucide-react'
import { useListings } from '@/hooks/useListings'
import WhatsAppButton from '@/components/ui/WhatsAppButton'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ALL_CITIES, getNeighborhoods } from '@/data/moroccoLocations'
import { FashionBreadcrumb, FashionCrossNav } from '@/components/ui/FashionPageWrapper'
import CategoryFooterNav from '@/components/ui/CategoryFooterNav'
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
  hero:    'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&w=1600',
  v1:      'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&w=600',
  v2:      'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&w=600',
  v3:      'https://images.pexels.com/photos/2220316/pexels-photo-2220316.jpeg?auto=compress&w=600',
  v4:      'https://images.pexels.com/photos/5935748/pexels-photo-5935748.jpeg?auto=compress&w=600',
  bento1:  'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&w=900',
  bento2:  'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&w=600',
  bento3:  'https://images.pexels.com/photos/2220316/pexels-photo-2220316.jpeg?auto=compress&w=600',
  bento4:  'https://images.pexels.com/photos/5935748/pexels-photo-5935748.jpeg?auto=compress&w=600',
  immo:    'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&w=1200',
  autopro: 'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&w=1200',
  g1:      'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&w=400',
  g2:      'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&w=400',
  g3:      'https://images.pexels.com/photos/2220316/pexels-photo-2220316.jpeg?auto=compress&w=400',
  g4:      'https://images.pexels.com/photos/5935748/pexels-photo-5935748.jpeg?auto=compress&w=400',
  g5:      'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&w=400',
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

function FeaturedCard({ id, brand, title, price, location, img, badges, era, phone }: any) {
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
        {era && <div style={{ position:'absolute', bottom:'10px', right:'10px', backgroundColor:'rgba(22,29,27,0.75)', color:'white', fontSize:'9px', ...CB, padding:'4px 10px', borderRadius:'6px' }}>{era}</div>}
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
          <WhatsAppButton phone={phone} title={title} style={{ flex:1, padding:'10px', borderRadius:'12px', fontSize:'10px', ...CB, textTransform:'uppercase' as const }}>💬 WhatsApp</WhatsAppButton>
        </div>
      </div>
    </div>
  )
}

function GridCard({ id, brand, title, price, img, badge, era, phone }: any) {
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
        {era && <div style={{ position:'absolute', bottom:'8px', right:'8px', backgroundColor:'rgba(22,29,27,0.75)', color:'white', fontSize:'8px', ...CB, padding:'3px 8px', borderRadius:'5px' }}>{era}</div>}
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
          <WhatsAppButton phone={phone} title={title} style={{ flex:1, backgroundColor:C.mint, color:C.ink, padding:'7px', borderRadius:'10px', fontSize:'9px', ...CB, textTransform:'uppercase' as const }}>WhatsApp</WhatsAppButton>
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
  { brand:'Levi\'s Vintage',  title:'501 Original 1980s Selvedge',   price:1800,  location:'Souissi, Rabat',  img:I.v1, badges:['featured','diamond'],   era:'1980s' },
  { brand:'Hermès',           title:'Silk Carré Scarf — 1970s',      price:4500,  location:'Agdal, Rabat',    img:I.v2, badges:['featured','certified'], era:'1970s' },
  { brand:'Chanel',           title:'Classic Tweed Jacket 1990s',    price:28000, location:'Rabat Centre',    img:I.v3, badges:['featured','diamond'],   era:'1990s' },
  { brand:'Rolex',            title:'Submariner 5513 — 1968',        price:185000,location:'Hay Riad, Rabat', img:I.v4, badges:['featured','certified'], era:'1968' },
]

function makeGrid(count: number) {
  const brands = ['Levi\'s Vintage','Hermès','Chanel','Gucci','Dior','YSL','Balenciaga','Céline','Courrèges','Pucci','Biba','Marimekko']
  const titles = ['Denim Jacket 1970s','Silk Scarf 1960s','Tweed Suit 1980s','Bamboo Bag 1950s','New Look Dress 1947','Wrap Dress 1970s','Puffer 1980s','Logo Belt 1990s','Platform Shoe 1970s','Print Blouse 1960s','Shift Dress 1960s','Palazzo Pants 1970s']
  const imgs   = [I.g1,I.g2,I.g3,I.g4,I.g5]
  const eras   = ['1960s','1970s','1980s','1990s','1950s','1940s']
  const badges: BadgeT[] = ['certified','diamond','featured','new','certified']
  const sellers = ['SouKni Members','SouKni Pro','SouKni Members','SouKni Pro']
  const locs = ['Rabat','Casablanca','Marrakech','Fès','Tanger','Agadir','Meknès']
  return Array.from({length:count},(_,i)=>({
    brand: brands[i%brands.length],
    title: titles[i%titles.length],
    price: 400 + ((i*1973)%28000),
    img:   imgs[i%imgs.length],
    era:   eras[i%eras.length],
    badge: badges[i%badges.length],
    seller: sellers[i%sellers.length],
    discount: i%3===0 ? 10+((i*7)%30) : null,
    isNew: badges[i%badges.length]==='new' || i%5===0,
    location: locs[i%locs.length],
  }))
}

const CATS = [
  { label:'All Vintage',     slug:'all-vintage',    emoji:'🏺' },
  { label:'Clothing',        slug:'clothing',        emoji:'👗' },
  { label:'Accessories',     slug:'accessories',     emoji:'👜' },
  { label:'Watches',         slug:'watches',         emoji:'⌚' },
  { label:'Jewelry',         slug:'jewelry',         emoji:'💍' },
  { label:'Shoes',           slug:'shoes',           emoji:'👠' },
  { label:'Collectibles',    slug:'collectibles',    emoji:'🎭' },
]

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

export default function VintagePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale }                      = React.use(params)
  const router = useRouter()
  const [activeSeller, setActiveSeller] = useState('All Sellers')
  const [diamond,      setDiamond     ] = useState(true)
  const [gridView,     setGridView    ] = useState(true)
  const [page,         setPage        ] = useState(1)
  const [keyword,      setKeyword     ] = useState('')
  const [city,         setCity        ] = useState('Rabat')
  const [neighborhood, setNeighborhood] = useState('All Neighborhoods')
  const [price,        setPrice       ] = useState('Any Price')
  const [cityOpen,     setCityOpen    ] = useState(false)
  const [neighOpen,    setNeighOpen   ] = useState(false)
  const [priceOpen,    setPriceOpen   ] = useState(false)

  const cities        = ALL_CITIES
  const neighborhoods = ['All Neighborhoods', ...getNeighborhoods(city)]
  const priceRanges   = ['Any Price','0 – 500 MAD','500 – 2,000 MAD','2,000 – 8,000 MAD','8,000 – 30,000 MAD','30,000+ MAD']
  const [sortBy, setSortBy] = useState('Default')
  const [sortOpen, setSortOpen] = useState(false)
  const [showNewOnly, setShowNewOnly] = useState(false)
  const [showDiscount, setShowDiscount] = useState(false)
  const [heroCityOpen, setHeroCityOpen] = useState(false)

  function parsePriceRange(range: string): [number, number] {
    if (range === 'Any Price') return [0, Infinity]
    const nums = range.replace(/MAD/g,'').split('–').map(s=>parseInt(s.replace(/,/g,'').trim()))
    if (range.includes('+')) return [nums[0], Infinity]
    return [nums[0], nums[1]]
  }
  const [minP, maxP] = parsePriceRange(price)

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
      id: row.id,
      brand: row.brand || '',
      title: row.title,
      price: (row.price || 0) / 100,
      img: (row.images && row.images[0]) || I.g1,
      era: row.subcategory || '',
      badge: row.badge || 'certified',
      seller: row.seller || '',
      discount: null,
      isNew: row.badge === 'new',
      location: row.city,
      phone: row.profiles?.phone,
    }
  }

  const hasRealData = dbListings.length > 0
  const gridItems = hasRealData ? dbListings.map(mapDbRowToCard) : makeGrid(16)

  let filteredGrid = gridItems.filter(item => {
    const matchesKeyword = keyword.trim()==='' || item.title.toLowerCase().includes(keyword.toLowerCase()) || item.brand.toLowerCase().includes(keyword.toLowerCase())
    const matchesPrice = item.price >= minP && item.price <= maxP
    const matchesSeller = activeSeller==='All Sellers' || item.seller===activeSeller
    const matchesNew = !showNewOnly || item.isNew
    const matchesDiscount = !showDiscount || item.discount
    const matchesCity = item.location === city
    return matchesKeyword && matchesPrice && matchesSeller && matchesNew && matchesDiscount && matchesCity
  })
  if (diamond) {
    filteredGrid = [...filteredGrid].sort((a,b)=>{
      const rank = (b:string)=> b==='diamond'?2:b==='certified'?1:0
      return rank(b.badge) - rank(a.badge)
    })
  }
  if (sortBy === 'Price: Low to High') filteredGrid = [...filteredGrid].sort((a,b)=>a.price-b.price)
  if (sortBy === 'Price: High to Low') filteredGrid = [...filteredGrid].sort((a,b)=>b.price-a.price)

  return (
    <div style={{ ...UB, backgroundColor:C.surface, color:C.ink, minHeight:'100vh' }}>

      {/* ══ 1. HERO ══════════════════════════════════════════ */}
      <section style={{ position:'relative', height:'520px', display:'flex', alignItems:'center', justifyContent:'center', overflow:'hidden' }}>
        <img src={I.hero} alt="Vintage" style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover' }} />
        <div style={{ position:'absolute', inset:0, backgroundColor:'rgba(22,29,27,0.42)' }} />
        <div style={{ position:'relative', zIndex:10, textAlign:'center' as const, maxWidth:'960px', padding:'0 24px', width:'100%' }}>
          <h1 style={{ fontSize:'clamp(36px,6vw,64px)', ...UB, color:'white', marginBottom:'36px', lineHeight:1, textShadow:'0 4px 20px rgba(0,0,0,0.4)' }}>
            VINTAGE & THRIFT.<br/><span style={{ color:C.mint }}>TIMELESS STYLE IN RABAT.</span>
          </h1>
          <div style={{ maxWidth:'780px', margin:'0 auto', backgroundColor:'rgba(255,255,255,0.12)', backdropFilter:'blur(12px)', border:'1px solid rgba(255,255,255,0.22)', borderRadius:'100px', padding:'8px', display:'flex', alignItems:'center' }}>
            <div style={{ flex:1, padding:'0 28px', borderRight:'1px solid rgba(255,255,255,0.22)', display:'flex', flexDirection:'column' as const, gap:'2px' }}>
              <span style={{ fontSize:'9px', ...UB, color:'rgba(255,255,255,0.62)', textTransform:'uppercase' as const, letterSpacing:'0.15em' }}>CITY</span>
              <DDrop label="" value={city} options={cities} open={heroCityOpen} setOpen={setHeroCityOpen} onChange={(c:string)=>{setCity(c);setNeighborhood('All Neighborhoods')}} heroStyle />
            </div>
            <div style={{ flex:2, padding:'0 28px', display:'flex', flexDirection:'column' as const, gap:'2px' }}>
              <span style={{ fontSize:'9px', ...UB, color:'rgba(255,255,255,0.62)', textTransform:'uppercase' as const, letterSpacing:'0.15em' }}>KEYWORD</span>
              <input type="text" value={keyword} onChange={e=>setKeyword(e.target.value)}
                onKeyDown={e=>{ if(e.key==='Enter') router.push(`/${locale}/search?q=${encodeURIComponent(keyword)}`) }}
                placeholder="Search for eras, brands, styles..."
                style={{ backgroundColor:'transparent', border:'none', outline:'none', color:'white', fontSize:'14px', ...UB, fontFamily:'Inter,sans-serif', width:'100%' }} />
            </div>
            <button onClick={()=>router.push(`/${locale}/search?q=${encodeURIComponent(keyword)}`)}
              style={{ backgroundColor:C.mint, color:C.ink, border:'none', padding:'16px 44px', borderRadius:'100px', fontSize:'11px', ...UB, textTransform:'uppercase' as const, letterSpacing:'0.12em', cursor:'pointer', transition:'filter 0.15s' }}
              onMouseEnter={e=>e.currentTarget.style.filter='brightness(1.08)'}
              onMouseLeave={e=>e.currentTarget.style.filter='brightness(1)'}
            >SEARCH</button>
          </div>
        </div>
      </section>

      {/* ══ 2. ADVANCED FILTER BAR ═══════════════════════════ */}
      <div style={{ maxWidth:'1280px', margin:'-40px auto 0', padding:'0 24px', position:'relative', zIndex:30 }}>
        <div style={{ backgroundColor:'rgba(255,255,255,0.97)', backdropFilter:'blur(16px)', border:'1px solid rgba(107,122,118,0.12)', borderRadius:'100px', boxShadow:'0 12px 40px rgba(0,0,0,0.08)', display:'flex', alignItems:'stretch', height:'72px' }}>
          <DDrop label="CITY" value={city} options={cities} open={cityOpen} setOpen={setCityOpen} onChange={(c:string)=>{setCity(c);setNeighborhood('All Neighborhoods')}} closeOthers={()=>{setNeighOpen(false);setPriceOpen(false)}} />
          <div style={{ width:'1px', backgroundColor:'rgba(107,122,118,0.12)', margin:'12px 0' }} />
          <div style={{ flex:1.8, padding:'0 22px', display:'flex', flexDirection:'column' as const, justifyContent:'center' }}>
            <span style={{ fontSize:'9px', ...UB, textTransform:'uppercase' as const, letterSpacing:'0.14em', color:C.muted, marginBottom:'3px' }}>KEYWORD</span>
            <div style={{ display:'flex', alignItems:'center', gap:'8px' }}>
              <Search size={13} color={C.muted} />
              <input type="text" value={keyword} onChange={e=>setKeyword(e.target.value)}
                onKeyDown={e=>{ if(e.key==='Enter') router.push(`/${locale}/search?q=${encodeURIComponent(keyword)}`) }}
                placeholder="e.g. 1970s, Levi's, Hermès..."
                style={{ flex:1, background:'none', border:'none', outline:'none', fontSize:'14px', ...UB, color:C.ink, fontFamily:'Inter,sans-serif' }} />
              {keyword && <button onClick={()=>setKeyword('')} style={{ background:'none', border:'none', cursor:'pointer', color:C.muted, fontSize:'16px' }}>✕</button>}
            </div>
          </div>
          <div style={{ width:'1px', backgroundColor:'rgba(107,122,118,0.12)', margin:'12px 0' }} />
          <DDrop label="NEIGHBOURHOOD" value={neighborhood} options={neighborhoods} open={neighOpen} setOpen={setNeighOpen} onChange={setNeighborhood} closeOthers={()=>{setCityOpen(false);setPriceOpen(false)}} />
          <div style={{ width:'1px', backgroundColor:'rgba(107,122,118,0.12)', margin:'12px 0' }} />
          <DDrop label="PRICE (MAD)" value={price} options={priceRanges} open={priceOpen} setOpen={setPriceOpen} onChange={setPrice} closeOthers={()=>{setCityOpen(false);setNeighOpen(false)}} />
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
        <FashionBreadcrumb pageLabel="Vintage & Thrift" />
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', gap:'16px', marginBottom:'24px', flexWrap:'wrap' as const }}>
          <div>
            <h2 style={{ fontSize:'clamp(20px,2.5vw,28px)', ...UB, color:C.ink, marginBottom:'4px' }}>New and Pre-Owned Vintage & Thrift in Rabat</h2>
            <p style={{ fontSize:'14px', color:C.mint, ...CB }}>2,640 Ads in Rabat District</p>
          </div>
          <div style={{ display:'flex', gap:'10px' }}>
            <div style={{ position:'relative' }}>
              <button onClick={()=>setSortOpen(!sortOpen)} style={{ backgroundColor:'white', border:'1px solid rgba(107,122,118,0.18)', padding:'9px 16px', borderRadius:'12px', fontSize:'10px', ...UB, textTransform:'uppercase' as const, letterSpacing:'0.1em', cursor:'pointer', color:C.ink }}>↕ Sort: {sortBy}</button>
              {sortOpen && (
                <div style={{ position:'absolute', top:'calc(100% + 6px)', right:0, backgroundColor:'white', borderRadius:'14px', boxShadow:'0 12px 30px rgba(0,0,0,0.12)', border:'1px solid rgba(107,122,118,0.12)', zIndex:100, overflow:'hidden', minWidth:'180px' }}>
                  {['Default','Price: Low to High','Price: High to Low'].map(opt=>(
                    <button key={opt} onClick={()=>{setSortBy(opt);setSortOpen(false)}} style={{ width:'100%', padding:'10px 16px', background:'none', border:'none', textAlign:'left' as const, fontSize:'11px', ...UB, color:sortBy===opt?C.mint:C.ink, cursor:'pointer' }}>{opt}</button>
                  ))}
                </div>
              )}
            </div>
            <button style={{ backgroundColor:'white', border:'1px solid rgba(107,122,118,0.18)', padding:'9px 16px', borderRadius:'12px', fontSize:'10px', ...UB, textTransform:'uppercase' as const, letterSpacing:'0.1em', cursor:'pointer', color:C.ink }}>🔖 Save Search</button>
          </div>
        </div>

        {/* ══ 4. CATEGORY PILLS + VIEW MORE ════════════════════ */}
        <div style={{ display:'flex', gap:'10px', flexWrap:'wrap' as const, marginBottom:'20px', alignItems:'center' }}>
          {CATS.map(cat=>(
            <Link key={cat.slug} href={`/${locale}/fashion/vintage/${cat.slug}`}
              style={{ padding:'10px 22px', borderRadius:'100px', fontSize:'11px', ...UB, textTransform:'uppercase' as const, letterSpacing:'0.1em', cursor:'pointer', transition:'all 0.2s', border:'1px solid', textDecoration:'none', display:'inline-block',
                backgroundColor:'white', color:C.muted, borderColor:'rgba(186,202,197,0.4)',
              }}
              onMouseEnter={e=>{e.currentTarget.style.backgroundColor=C.mint;e.currentTarget.style.color=C.ink;e.currentTarget.style.borderColor=C.mint}}
              onMouseLeave={e=>{e.currentTarget.style.backgroundColor='white';e.currentTarget.style.color=C.muted;e.currentTarget.style.borderColor='rgba(186,202,197,0.4)'}}
            >{cat.emoji} {cat.label}</Link>
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
            <button onClick={()=>setShowNewOnly(!showNewOnly)}
              style={{ display:'flex', alignItems:'center', gap:'6px', padding:'9px 18px', borderRadius:'100px', border:`1px solid ${showNewOnly?C.mint:'rgba(107,122,118,0.2)'}`, backgroundColor:showNewOnly?`${C.mint}14`:'transparent', fontSize:'12px', ...UB, cursor:'pointer', color:showNewOnly?C.ink:C.muted }}
            >✨ New Arrivals</button>
            <button onClick={()=>setShowDiscount(!showDiscount)}
              style={{ display:'flex', alignItems:'center', gap:'6px', padding:'9px 18px', borderRadius:'100px', border:`1px solid ${showDiscount?C.mint:'rgba(107,122,118,0.2)'}`, backgroundColor:showDiscount?`${C.mint}14`:'transparent', fontSize:'12px', ...UB, cursor:'pointer', color:showDiscount?C.ink:C.muted }}
            >📉 Price Drop Alert</button>
          </div>
          <div style={{ display:'flex', gap:'4px', padding:'4px', backgroundColor:'white', borderRadius:'12px', border:'1px solid rgba(107,122,118,0.12)' }}>
            <button onClick={()=>setGridView(true)}  style={{ width:'36px', height:'36px', borderRadius:'8px', border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'17px', backgroundColor:gridView?C.ink:'transparent', color:gridView?'white':C.muted, transition:'all 0.2s' }}>⊞</button>
            <button onClick={()=>setGridView(false)} style={{ width:'36px', height:'36px', borderRadius:'8px', border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'17px', backgroundColor:!gridView?C.ink:'transparent', color:!gridView?'white':C.muted, transition:'all 0.2s' }}>☰</button>
          </div>
        </div>

        {/* ══ 7. FEATURED VINTAGE PICKS ════════════════════════ */}
        <section style={{ marginBottom:'48px' }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'24px' }}>
            <div>
              <h3 style={{ fontSize:'clamp(18px,2.5vw,24px)', ...UB, color:C.ink, textTransform:'uppercase' as const, marginBottom:'4px' }}>Featured Vintage Picks</h3>
              <p style={{ fontSize:'14px', color:C.muted }}>Rare authenticated vintage from the world's most iconic eras</p>
            </div>
            <a href="#" style={{ fontSize:'12px', ...UB, color:C.mint, textDecoration:'none' }}>View All Featured →</a>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'24px' }}>
            {featuredItems.map((item,i)=><FeaturedCard key={i} {...item} />)}
          </div>
        </section>

        {/* ══ 8. IMMO PRO BANNER ═══════════════════════════════ */}
        <section style={{ marginBottom:'64px' }}>
          <div style={{ backgroundColor:C.ink, borderRadius:'40px', padding:'56px 64px', display:'flex', alignItems:'center', justifyContent:'space-between', position:'relative' as const, overflow:'hidden', minHeight:'240px', boxShadow:'0 16px 48px rgba(0,0,0,0.2)', flexWrap:'wrap' as const, gap:'24px' }}>
            <div style={{ position:'absolute', right:'-48px', bottom:'-48px', width:'320px', height:'320px', backgroundColor:`${C.mint}18`, borderRadius:'50%' }} />
            <div style={{ position:'absolute', right:'120px', top:'-60px', width:'200px', height:'200px', backgroundColor:`${C.mint}0a`, borderRadius:'50%' }} />
            <div style={{ position:'relative', zIndex:1, maxWidth:'480px' }}>
              <p style={{ fontSize:'11px', ...UB, color:C.mint, textTransform:'uppercase' as const, letterSpacing:'0.15em', marginBottom:'16px' }}>SOUKNI IMMO PRO</p>
              <h2 style={{ fontSize:'clamp(24px,3.5vw,38px)', ...UB, color:'white', marginBottom:'20px', lineHeight:1.1 }}>List your luxury property where the elite browse.</h2>
              <button style={{ backgroundColor:C.mint, color:C.ink, border:'none', padding:'16px 40px', borderRadius:'100px', fontSize:'11px', ...UB, textTransform:'uppercase' as const, letterSpacing:'0.12em', cursor:'pointer', transition:'transform 0.2s' }}
                onMouseEnter={e=>e.currentTarget.style.transform='scale(1.04)'}
                onMouseLeave={e=>e.currentTarget.style.transform='scale(1)'}
              >Explore Properties</button>
            </div>
          </div>
        </section>

        {/* ══ 9. EXCLUSIVE VINTAGE COLLECTION BENTO ════════════ */}
        <section style={{ marginBottom:'64px' }}>
          <h3 style={{ fontSize:'clamp(20px,3vw,32px)', ...UB, color:C.ink, textTransform:'uppercase' as const, marginBottom:'32px' }}>Exclusive Vintage Collection</h3>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gridTemplateRows:'380px 380px', gap:'20px' }}>
            <div style={{ gridColumn:'1/3', gridRow:'1/3', backgroundColor:'white', borderRadius:'40px', overflow:'hidden', display:'flex', flexDirection:'column' as const, border:'1px solid rgba(107,122,118,0.1)' }}>
              <div style={{ flex:1, overflow:'hidden', position:'relative', minHeight:0 }}>
                <img src={I.bento1} alt="Vintage" style={{ width:'100%', height:'100%', objectFit:'cover' }} />
                <div style={{ position:'absolute', top:'20px', left:'20px' }}>
                  <span style={{ backgroundColor:C.ink, color:C.mint, fontSize:'10px', ...CB, padding:'7px 16px', borderRadius:'100px', textTransform:'uppercase' as const, letterSpacing:'0.1em' }}>◆ DIAMOND MEMBER</span>
                </div>
                <div style={{ position:'absolute', bottom:'20px', right:'20px', backgroundColor:'rgba(22,29,27,0.75)', color:'white', fontSize:'11px', ...CB, padding:'6px 14px', borderRadius:'8px' }}>1968</div>
              </div>
              <div style={{ padding:'24px 28px', flexShrink:0 }}>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'6px', gap:'12px' }}>
                  <div>
                    <p style={{ fontSize:'11px', ...CB, color:C.mint, textTransform:'uppercase' as const, letterSpacing:'0.1em', marginBottom:'3px' }}>ROLEX</p>
                    <h4 style={{ fontSize:'20px', ...CB, color:C.ink }}>Submariner Reference 5513</h4>
                  </div>
                  <span style={{ fontSize:'22px', ...CB, color:C.mint, flexShrink:0 }}>185,000 MAD</span>
                </div>
                <p style={{ fontSize:'13px', color:C.muted, ...CB, marginBottom:'16px' }}>1968 · Full set with original box & papers · Rabat, Souissi</p>
                <div style={{ display:'flex', gap:'10px' }}>
                  <button style={{ flex:1, border:`2px solid rgba(107,122,118,0.2)`, color:C.ink, backgroundColor:'transparent', padding:'12px', borderRadius:'16px', fontSize:'11px', ...CB, textTransform:'uppercase' as const, cursor:'pointer', transition:'all 0.15s' }}
                    onMouseEnter={e=>{e.currentTarget.style.borderColor=C.mint;e.currentTarget.style.backgroundColor=`${C.mint}14`}}
                    onMouseLeave={e=>{e.currentTarget.style.borderColor='rgba(107,122,118,0.2)';e.currentTarget.style.backgroundColor='transparent'}}
                  >Message</button>
                  <WhatsAppButton phone={undefined} title="" style={{ flex:1, backgroundColor:C.mint, color:C.ink, padding:'12px', borderRadius:'16px', fontSize:'11px', ...CB, textTransform:'uppercase' as const }}>💬 WhatsApp</WhatsAppButton>
                </div>
              </div>
            </div>
            <div style={{ gridColumn:'3', gridRow:'1', backgroundColor:'white', borderRadius:'32px', overflow:'hidden', display:'flex', flexDirection:'column' as const, border:'1px solid rgba(107,122,118,0.1)' }}>
              <div style={{ flex:1, overflow:'hidden', position:'relative', minHeight:0 }}>
                <img src={I.bento2} alt="Hermès Scarf" style={{ width:'100%', height:'100%', objectFit:'cover' }} />
                <div style={{ position:'absolute', top:'12px', left:'12px' }}>
                  <span style={{ backgroundColor:C.mint, color:C.ink, fontSize:'8px', ...CB, padding:'5px 12px', borderRadius:'100px', textTransform:'uppercase' as const }}>SOUKNI CERTIFIED</span>
                </div>
                <div style={{ position:'absolute', bottom:'10px', right:'10px', backgroundColor:'rgba(22,29,27,0.75)', color:'white', fontSize:'9px', ...CB, padding:'3px 8px', borderRadius:'5px' }}>1970s</div>
              </div>
              <div style={{ padding:'16px 18px', flexShrink:0 }}>
                <p style={{ fontSize:'9px', ...CB, color:C.mint, textTransform:'uppercase' as const, letterSpacing:'0.1em', marginBottom:'2px' }}>HERMÈS</p>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', gap:'6px', marginBottom:'10px' }}>
                  <h4 style={{ fontSize:'13px', ...CB, color:C.ink }}>Carré Silk Scarf 1970s</h4>
                  <span style={{ fontSize:'14px', ...CB, color:C.mint, flexShrink:0 }}>4,500 MAD</span>
                </div>
                <div style={{ display:'flex', gap:'6px' }}>
                  <button style={{ flex:1, border:`1px solid rgba(107,122,118,0.2)`, color:C.ink, backgroundColor:'transparent', padding:'8px', borderRadius:'12px', fontSize:'9px', ...CB, cursor:'pointer' }}>Message</button>
                  <WhatsAppButton phone={undefined} title="" style={{ flex:1, backgroundColor:C.mint, color:C.ink, padding:'8px', borderRadius:'12px', fontSize:'9px', ...CB }}>WhatsApp</WhatsAppButton>
                </div>
              </div>
            </div>
            <div style={{ gridColumn:'4', gridRow:'1', backgroundColor:'white', borderRadius:'32px', overflow:'hidden', display:'flex', flexDirection:'column' as const, border:'1px solid rgba(107,122,118,0.1)' }}>
              <div style={{ flex:1, overflow:'hidden', position:'relative', minHeight:0 }}>
                <img src={I.bento3} alt="Chanel" style={{ width:'100%', height:'100%', objectFit:'cover' }} />
                <div style={{ position:'absolute', top:'12px', left:'12px' }}>
                  <span style={{ backgroundColor:'#fbbf24', color:C.ink, fontSize:'8px', ...CB, padding:'5px 12px', borderRadius:'100px', textTransform:'uppercase' as const }}>Featured</span>
                </div>
                <div style={{ position:'absolute', bottom:'10px', right:'10px', backgroundColor:'rgba(22,29,27,0.75)', color:'white', fontSize:'9px', ...CB, padding:'3px 8px', borderRadius:'5px' }}>1990s</div>
              </div>
              <div style={{ padding:'16px 18px', flexShrink:0 }}>
                <p style={{ fontSize:'9px', ...CB, color:C.mint, textTransform:'uppercase' as const, letterSpacing:'0.1em', marginBottom:'2px' }}>CHANEL</p>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', gap:'6px', marginBottom:'10px' }}>
                  <h4 style={{ fontSize:'13px', ...CB, color:C.ink }}>Classic Tweed Jacket 1990s</h4>
                  <span style={{ fontSize:'14px', ...CB, color:C.mint, flexShrink:0 }}>28,000 MAD</span>
                </div>
                <div style={{ display:'flex', gap:'6px' }}>
                  <button style={{ flex:1, border:`1px solid rgba(107,122,118,0.2)`, color:C.ink, backgroundColor:'transparent', padding:'8px', borderRadius:'12px', fontSize:'9px', ...CB, cursor:'pointer' }}>Message</button>
                  <WhatsAppButton phone={undefined} title="" style={{ flex:1, backgroundColor:C.mint, color:C.ink, padding:'8px', borderRadius:'12px', fontSize:'9px', ...CB }}>WhatsApp</WhatsAppButton>
                </div>
              </div>
            </div>
            <div style={{ gridColumn:'3/5', gridRow:'2', backgroundColor:'white', borderRadius:'32px', overflow:'hidden', display:'flex', flexDirection:'row' as const, border:'1px solid rgba(107,122,118,0.1)' }}>
              <div style={{ width:'50%', overflow:'hidden', position:'relative' }}>
                <img src={I.bento4} alt="Levi's" style={{ width:'100%', height:'100%', objectFit:'cover' }} />
                <div style={{ position:'absolute', top:'12px', left:'12px' }}>
                  <span style={{ backgroundColor:C.mint, color:'white', fontSize:'8px', ...CB, padding:'5px 12px', borderRadius:'100px', textTransform:'uppercase' as const }}>New Arrival</span>
                </div>
                <div style={{ position:'absolute', bottom:'12px', right:'12px', backgroundColor:'rgba(22,29,27,0.75)', color:'white', fontSize:'9px', ...CB, padding:'3px 8px', borderRadius:'5px' }}>1980s</div>
              </div>
              <div style={{ flex:1, padding:'28px 32px', display:'flex', flexDirection:'column' as const, justifyContent:'center' }}>
                <p style={{ fontSize:'11px', ...CB, color:C.mint, textTransform:'uppercase' as const, letterSpacing:'0.1em', marginBottom:'6px' }}>LEVI'S VINTAGE</p>
                <h4 style={{ fontSize:'18px', ...CB, color:C.ink, marginBottom:'6px' }}>501 Original 1980s Selvedge Denim</h4>
                <p style={{ fontSize:'13px', color:C.muted, ...CB, marginBottom:'12px' }}>W32 L32 · Excellent condition · Original rivets intact</p>
                <span style={{ fontSize:'22px', ...CB, color:C.mint, marginBottom:'20px', display:'block' }}>1,800 MAD</span>
                <div style={{ display:'flex', gap:'10px' }}>
                  <button style={{ flex:1, border:`2px solid rgba(107,122,118,0.2)`, color:C.ink, backgroundColor:'transparent', padding:'12px', borderRadius:'16px', fontSize:'10px', ...CB, cursor:'pointer', transition:'border-color 0.15s' }}
                    onMouseEnter={e=>e.currentTarget.style.borderColor=C.mint}
                    onMouseLeave={e=>e.currentTarget.style.borderColor='rgba(107,122,118,0.2)'}
                  >Message</button>
                  <WhatsAppButton phone={undefined} title="" style={{ flex:1, backgroundColor:C.mint, color:C.ink, padding:'12px', borderRadius:'16px', fontSize:'10px', ...CB }}>💬 WhatsApp</WhatsAppButton>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══ 10. AUTO PRO BANNER ══════════════════════════════ */}
        <section style={{ marginBottom:'64px' }}>
          <div style={{ position:'relative', borderRadius:'40px', overflow:'hidden', height:'320px', display:'flex', alignItems:'center', boxShadow:'0 16px 48px rgba(0,0,0,0.15)', cursor:'pointer' }}>
            <img src={I.autopro} alt="Auto Pro" style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover' }} />
            <div style={{ position:'absolute', inset:0, backgroundColor:'rgba(22,29,27,0.58)' }} />
            <div style={{ position:'relative', zIndex:1, padding:'0 64px', maxWidth:'560px' }}>
              <p style={{ fontSize:'11px', ...UB, color:C.mint, textTransform:'uppercase' as const, letterSpacing:'0.15em', marginBottom:'14px' }}>SOUKNI AUTO PRO</p>
              <h2 style={{ fontSize:'clamp(26px,3.5vw,42px)', ...UB, color:'white', marginBottom:'18px', lineHeight:1.05 }}>Arrive in Vintage Style.</h2>
              <p style={{ fontSize:'17px', color:'rgba(255,255,255,0.9)', marginBottom:'28px', lineHeight:1.55 }}>Classic and luxury car rentals for Morocco's most discerning vintage enthusiasts.</p>
              <button style={{ backgroundColor:C.mint, color:C.ink, border:'none', padding:'16px 40px', borderRadius:'100px', fontSize:'11px', ...UB, textTransform:'uppercase' as const, letterSpacing:'0.12em', cursor:'pointer', transition:'transform 0.2s' }}
                onMouseEnter={e=>e.currentTarget.style.transform='scale(1.04)'}
                onMouseLeave={e=>e.currentTarget.style.transform='scale(1)'}
              >BECOME A PARTNER</button>
            </div>
          </div>
        </section>

        {/* ══ 11. PRO VINTAGE GRID ═════════════════════════════ */}
        <section style={{ marginBottom:'48px' }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'28px' }}>
            <h3 style={{ fontSize:'clamp(18px,2.5vw,24px)', ...UB, color:C.ink, textTransform:'uppercase' as const }}>Pro Vintage Discoveries</h3>
            <a href="#" style={{ fontSize:'12px', ...UB, color:C.mint, textDecoration:'none' }}>View All →</a>
          </div>
          {filteredGrid.length === 0 ? (
            <p style={{ textAlign:'center' as const, color:C.muted, padding:'40px 0', fontSize:'14px', ...CB }}>No items match your filters.</p>
          ) : gridView ? (
            <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'20px' }}>
              {filteredGrid.map((item,j)=><GridCard key={j} {...item} />)}
            </div>
          ) : (
            <div style={{ display:'flex', flexDirection:'column' as const, gap:'14px' }}>
              {filteredGrid.map((item,j)=>(
                <div key={j} style={{ display:'flex', backgroundColor:'white', borderRadius:'20px', border:'1px solid rgba(107,122,118,0.1)', overflow:'hidden', height:'140px' }}>
                  <img src={item.img} alt={item.title} style={{ width:'140px', height:'100%', objectFit:'cover' as const }} />
                  <div style={{ flex:1, padding:'16px 20px', display:'flex', flexDirection:'column' as const, justifyContent:'space-between' }}>
                    <div>
                      <p style={{ fontSize:'9px', ...CB, color:C.mint, textTransform:'uppercase' as const }}>{item.brand} · {item.era}</p>
                      <h4 style={{ fontSize:'15px', ...CB, color:C.ink }}>{item.title}</h4>
                    </div>
                    <p style={{ fontSize:'18px', ...CB, color:C.mint }}>{item.price.toLocaleString()} MAD</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* ══ 12. PAGINATION ═══════════════════════════════════ */}
        <div style={{ display:'flex', justifyContent:'center', alignItems:'center', gap:'10px', marginBottom:'64px' }}>
          <button style={{ width:'44px', height:'44px', borderRadius:'12px', backgroundColor:'white', border:'1px solid rgba(107,122,118,0.12)', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', color:C.muted }}><ChevronLeft size={18} /></button>
          {[1,2,3].map(p=>(
            <button key={p} onClick={()=>setPage(p)}
              style={{ width:'44px', height:'44px', borderRadius:'12px', cursor:'pointer', fontSize:'15px', ...UB, border:'1px solid', transition:'all 0.2s',
                backgroundColor: page===p?C.mint:'white', color:page===p?C.ink:C.muted, borderColor:page===p?C.mint:'rgba(107,122,118,0.12)',
              }}
            >{p}</button>
          ))}
          <span style={{ color:C.muted, padding:'0 4px' }}>…</span>
          <button style={{ width:'44px', height:'44px', borderRadius:'12px', backgroundColor:'white', border:'1px solid rgba(107,122,118,0.12)', cursor:'pointer', fontSize:'15px', ...UB, color:C.muted }}>10</button>
          <button style={{ width:'44px', height:'44px', borderRadius:'12px', backgroundColor:'white', border:'1px solid rgba(107,122,118,0.12)', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', color:C.muted }}><ChevronRight size={18} /></button>
        </div>

        {/* ══ 13. DIAMOND TRUST BANNER ═════════════════════════ */}
        <section style={{ marginBottom:'64px' }}>
          <div style={{ backgroundColor:C.mint, borderRadius:'40px', padding:'56px 64px', display:'flex', alignItems:'center', justifyContent:'space-between', boxShadow:`0 16px 48px ${C.mint}30`, flexWrap:'wrap' as const, gap:'28px' }}>
            <div style={{ maxWidth:'520px' }}>
              <p style={{ fontSize:'9px', ...UB, textTransform:'uppercase' as const, letterSpacing:'0.15em', color:'rgba(22,29,27,0.6)', marginBottom:'14px' }}>EXCLUSIVE PRIVILEGE</p>
              <h2 style={{ fontSize:'clamp(26px,3.5vw,40px)', ...UB, color:C.ink, marginBottom:'16px', lineHeight:1.05 }}>Unlock the Power of Diamond.</h2>
              <p style={{ fontSize:'17px', color:`${C.ink}b3`, lineHeight:1.6 }}>Priority placement, authentication services, and direct marketing tools. Sell your vintage pieces 5x faster.</p>
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
              <p style={{ fontSize:'17px', color:C.muted, marginBottom:'36px', maxWidth:'400px', lineHeight:1.6 }}>Get early alerts on rare vintage drops, authentication services, and exclusive thrift auctions.</p>
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

        <FashionCrossNav currentSlug="vintage" />
        <CategoryFooterNav backHref={`/${locale}/fashion`} backLabel="Back to All Fashion" inkColor={C.ink} mintDkColor={C.mintDk} />
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
