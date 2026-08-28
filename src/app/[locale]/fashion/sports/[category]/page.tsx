'use client'

import { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import React from 'react'
import { Heart, Search, ChevronDown, ChevronLeft, ChevronRight, SlidersHorizontal, MapPin } from 'lucide-react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { ALL_CITIES } from '@/data/moroccoLocations'
import { useListings } from '@/hooks/useListings'
import WhatsAppButton from '@/components/ui/WhatsAppButton'
import MessageSellerButton from '@/components/ui/MessageSellerButton'
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

const CATEGORIES: Record<string,{
  label:string; hero:string; desc:string; count:string;
  brands:string[]; priceRanges:string[]; emoji:string
}> = {
  'all-sports': {
    label:'All Sports', emoji:'⚡',
    hero:'https://images.pexels.com/photos/2294361/pexels-photo-2294361.jpeg?auto=compress&w=1600',
    desc:'Browse the complete SouKni sports & activewear collection.',
    count:'3,842',
    brands:['Nike','Adidas','Lululemon','Under Armour','Gymshark','Rapha','Asics','New Balance'],
    priceRanges:['Any Price','0 – 500 MAD','500 – 1,500 MAD','1,500 – 4,000 MAD','4,000+ MAD'],
  },
  'running': {
    label:'Running', emoji:'🏃',
    hero:'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&w=1600',
    desc:'Elite running gear — from race-day carbon shoes to everyday trainers.',
    count:'1,142',
    brands:['Nike','Adidas','Asics','New Balance','Brooks','Hoka','On Running','Saucony'],
    priceRanges:['Any Price','0 – 500 MAD','500 – 1,500 MAD','1,500 – 3,500 MAD','3,500+ MAD'],
  },
  'training': {
    label:'Training', emoji:'💪',
    hero:'https://images.pexels.com/photos/4162449/pexels-photo-4162449.jpeg?auto=compress&w=1600',
    desc:'Premium training gear for the gym, HIIT, and functional fitness.',
    count:'987',
    brands:['Nike','Adidas','Gymshark','Under Armour','Lululemon','Reebok','Puma','Fabletics'],
    priceRanges:['Any Price','0 – 300 MAD','300 – 800 MAD','800 – 2,000 MAD','2,000+ MAD'],
  },
  'yoga': {
    label:'Yoga', emoji:'🧘',
    hero:'https://images.pexels.com/photos/5935748/pexels-photo-5935748.jpeg?auto=compress&w=1600',
    desc:'Premium yoga and mindfulness activewear for every practice.',
    count:'654',
    brands:['Lululemon','Alo Yoga','Vuori','Manduka','Gaiam','Beyond Yoga','Spiritual Gangster'],
    priceRanges:['Any Price','0 – 400 MAD','400 – 1,000 MAD','1,000 – 2,500 MAD','2,500+ MAD'],
  },
  'cycling': {
    label:'Cycling', emoji:'🚴',
    hero:'https://images.pexels.com/photos/100582/pexels-photo-100582.jpeg?auto=compress&w=1600',
    desc:'Professional cycling apparel and accessories for road and trail.',
    count:'432',
    brands:['Rapha','Castelli','Assos','Pas Normal Studios','Specialized','Pearl Izumi','Café du Cycliste'],
    priceRanges:['Any Price','0 – 500 MAD','500 – 2,000 MAD','2,000 – 5,000 MAD','5,000+ MAD'],
  },
  'swimming': {
    label:'Swimming', emoji:'🏊',
    hero:'https://images.pexels.com/photos/863988/pexels-photo-863988.jpeg?auto=compress&w=1600',
    desc:"Competition and leisure swimwear from the world's top aquatic brands.",
    count:'312',
    brands:['Speedo','Arena','TYR','Dolfin','Aqua Sphere','Nike Swim','Adidas Swim'],
    priceRanges:['Any Price','0 – 200 MAD','200 – 600 MAD','600 – 1,500 MAD','1,500+ MAD'],
  },
  'team-sports': {
    label:'Team Sports', emoji:'⚽',
    hero:'https://images.pexels.com/photos/2294361/pexels-photo-2294361.jpeg?auto=compress&w=1600',
    desc:'Official and replica kits, boots, and accessories for team sports.',
    count:'315',
    brands:['Nike','Adidas','Puma','Under Armour','Hummel','Kappa','Le Coq Sportif'],
    priceRanges:['Any Price','0 – 300 MAD','300 – 800 MAD','800 – 2,000 MAD','2,000+ MAD'],
  },
}

const ALL_CATS = [
  { label:'All Sports',  slug:'all-sports',  emoji:'⚡' },
  { label:'Running',     slug:'running',     emoji:'🏃' },
  { label:'Training',    slug:'training',    emoji:'💪' },
  { label:'Yoga',        slug:'yoga',        emoji:'🧘' },
  { label:'Cycling',     slug:'cycling',     emoji:'🚴' },
  { label:'Swimming',    slug:'swimming',    emoji:'🏊' },
  { label:'Team Sports', slug:'team-sports', emoji:'⚽' },
]
const SPORT_IMGS = [
  'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&w=400',
  'https://images.pexels.com/photos/4162449/pexels-photo-4162449.jpeg?auto=compress&w=400',
  'https://images.pexels.com/photos/100582/pexels-photo-100582.jpeg?auto=compress&w=400',
  'https://images.pexels.com/photos/863988/pexels-photo-863988.jpeg?auto=compress&w=400',
  'https://images.pexels.com/photos/5935748/pexels-photo-5935748.jpeg?auto=compress&w=400',
]

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

function ListingCard({ id, brand, title, price, location, condition, img, badge, size, phone, sellerId }: any) {
  const { isFavorited, toggleFavorite } = useFavorites()
  const saved = isFavorited(id)
  const [hov,   setHov  ] = useState(false)
  return (
    <article onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{ backgroundColor:'white', borderRadius:'24px', border:`1px solid ${hov?C.mint:'rgba(107,122,118,0.1)'}`, overflow:'hidden', boxShadow:hov?`0 20px 40px ${C.mint}18`:'0 2px 8px rgba(0,0,0,0.04)', transition:'all 0.3s', cursor:'pointer', display:'flex', flexDirection:'column' as const }}>
      <div style={{ position:'relative', aspectRatio:'1/1', overflow:'hidden', backgroundColor:C.cream }}>
        <img src={img} alt={title} style={{ width:'100%', height:'100%', objectFit:'cover', transition:'transform 0.6s', transform:hov?'scale(1.08)':'scale(1)' }} />
        <div style={{ position:'absolute', top:'10px', left:'10px', zIndex:10 }}><Badge type={badge} /></div>
        <button onClick={e=>{e.stopPropagation();toggleFavorite(id)}}
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
        {size && <p style={{ fontSize:'10px', ...CB, color:C.muted, marginBottom:'2px' }}>Size: {size}</p>}
        <p style={{ fontSize:'18px', ...CB, color:C.mint, marginBottom:'6px' }}>{price.toLocaleString()} MAD</p>
        {location && <p style={{ fontSize:'10px', color:C.muted, ...CB, display:'flex', alignItems:'center', gap:'3px', marginBottom:'12px' }}><MapPin size={10}/>{location}</p>}
        <div style={{ marginTop:'auto', display:'flex', gap:'8px' }}>
          <MessageSellerButton listingId={id} sellerId={sellerId} style={{ flex:1, border:`2px solid ${C.ink}`, color:C.ink, backgroundColor:'transparent', padding:'9px', borderRadius:'12px', fontSize:'10px', ...CB, textTransform:'uppercase' as const, cursor:'pointer', transition:'all 0.15s' }}
            onMouseEnter={e=>{e.currentTarget.style.backgroundColor=C.ink;e.currentTarget.style.color='white'}}
            onMouseLeave={e=>{e.currentTarget.style.backgroundColor='transparent';e.currentTarget.style.color=C.ink}}
          >Message</MessageSellerButton>
          <WhatsAppButton phone={phone} title={title}
            style={{ flex:1, padding:'9px', borderRadius:'12px', fontSize:'10px', ...CB, textTransform:'uppercase' as const, gap:'4px' }}>
            💬 WhatsApp
          </WhatsAppButton>
        </div>
      </div>
    </article>
  )
}

function ListRowCard({ id, brand, title, price, location, condition, img, badge, size, phone, sellerId }: any) {
  const { isFavorited, toggleFavorite } = useFavorites()
  const saved = isFavorited(id)
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
              {size && <p style={{ fontSize:'10px', ...CB, color:C.muted }}>Size: {size}</p>}
            </div>
            <button onClick={e=>{e.stopPropagation();toggleFavorite(id)}} style={{ flexShrink:0, width:'30px', height:'30px', borderRadius:'50%', backgroundColor:C.surface, border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}>
              <Heart size={13} fill={saved?'#ef4444':'none'} color={saved?'#ef4444':C.muted} />
            </button>
          </div>
          {location && <p style={{ fontSize:'10px', color:C.muted, ...CB, display:'flex', alignItems:'center', gap:'3px', marginTop:'6px' }}><MapPin size={10}/>{location}</p>}
        </div>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', gap:'12px' }}>
          <p style={{ fontSize:'20px', ...CB, color:C.mint }}>{price.toLocaleString()} MAD</p>
          <div style={{ display:'flex', gap:'8px' }}>
            <MessageSellerButton listingId={id} sellerId={sellerId} style={{ border:`2px solid ${C.ink}`, color:C.ink, backgroundColor:'transparent', padding:'8px 16px', borderRadius:'10px', fontSize:'10px', ...CB, textTransform:'uppercase' as const, cursor:'pointer', transition:'all 0.15s' }}
              onMouseEnter={e=>{e.currentTarget.style.backgroundColor=C.ink;e.currentTarget.style.color='white'}}
              onMouseLeave={e=>{e.currentTarget.style.backgroundColor='transparent';e.currentTarget.style.color=C.ink}}
            >Message</MessageSellerButton>
            <WhatsAppButton phone={phone} title={title}
              style={{ padding:'8px 16px', borderRadius:'10px', fontSize:'10px', ...CB, textTransform:'uppercase' as const }}>
              WhatsApp
            </WhatsAppButton>
          </div>
        </div>
      </div>
    </article>
  )
}

function makeListings(cat: string, count: number) {
  const titleMap: Record<string,string[]> = {
    'all-sports':  ['Dri-FIT Tee','Ultraboost 22','Align Legging','Bib Shorts II','Vital Seamless','Kayano 29'],
    'running':     ['Vaporfly 3','Ultraboost 22','Kayano 29','Fresh Foam 1080','Cloudflow 3','Kinvara 13'],
    'training':    ['Dri-FIT Tee','Rush Compression','Vital Seamless','Flex Essential','Power Fleece','Pro Shorts'],
    'yoga':        ['Align Legging','Flow Y Bra','Restore Tank','Warrior Top','Clarity Legging','Elevate Shorts'],
    'cycling':     ['Pro Team Bib II','Climber Shorts','Core Jersey','Festive 500 Kit','Training Jacket','Base Layer'],
    'swimming':    ['Fastskin Elite','Powerskin R-EVO+','Flexback Suit','Diamond Splice','Aviator Suit','Comp Jammers'],
    'team-sports': ['Dri-FIT Kit','Tiro Training','teamFINAL Jersey','PowerTrain Shirt','FBT Kit','Match Shorts'],
  }
  const cat_data = CATEGORIES[cat] || CATEGORIES['all-sports']
  const titles = titleMap[cat] || titleMap['all-sports']
  const badges: BadgeT[] = ['certified','diamond','featured','new','certified','diamond']
  const sizes  = ['XS','S','M','L','XL','XXL']
  const locs   = ['Rabat','Casablanca','Marrakech','Fès','Tanger','Agadir','Meknès']
  const conds  = ['Like New','New','Excellent','Good',undefined,undefined]
  const colors = ['Black','White','Navy','Red','Green','Grey']
  const sellers = ['SouKni Members','SouKni Pro','SouKni Members','SouKni Pro']
  return Array.from({length:count},(_,i)=>({
    brand:     cat_data.brands[i%cat_data.brands.length],
    title:     `${titles[i%titles.length]} — ${colors[i%colors.length]}`,
    price:     250 + ((i*1373)%4200),
    location:  locs[i%locs.length],
    size:      sizes[i%sizes.length],
    condition: conds[i%conds.length],
    img:       SPORT_IMGS[i%SPORT_IMGS.length],
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

export default function SportsCategoryPage() {
  const params   = useParams()
  const router   = useRouter()
  const locale   = (params?.locale as string) || 'en'
  const catSlug  = (params?.category as string) || 'all-sports'
  const catData  = CATEGORIES[catSlug] || CATEGORIES['all-sports']

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
      id: row.id,
      brand: row.brand || '',
      title: row.title,
      price: (row.price || 0) / 100,
      location: row.city,
      size: row.size || '',
      condition: row.condition || undefined,
      img: (row.images && row.images[0]) || SPORT_IMGS[0],
      badge: row.badge || 'certified',
      seller: row.seller || '',
      discount: null,
      isNew: row.badge === 'new',
      phone: row.profiles?.phone,
      sellerId: row.seller_id,
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

  const PAGE_SIZE = 12
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const clampedPage = Math.min(page, totalPages)
  const pagedFiltered = filtered.slice((clampedPage - 1) * PAGE_SIZE, clampedPage * PAGE_SIZE)

  return (
    <div style={{ ...UB, backgroundColor:C.surface, color:C.ink, minHeight:'100vh' }}>

      {/* HERO */}
      <section style={{ position:'relative', height:'360px', display:'flex', alignItems:'center', justifyContent:'center', overflow:'hidden' }}>
        <img src={catData.hero} alt={catData.label} style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover' }} />
        <div style={{ position:'absolute', inset:0, backgroundColor:'rgba(22,29,27,0.52)' }} />
        <div style={{ position:'relative', zIndex:10, textAlign:'center' as const, maxWidth:'860px', padding:'0 24px', width:'100%' }}>
          <p style={{ fontSize:'11px', ...UB, color:C.mint, textTransform:'uppercase' as const, letterSpacing:'0.2em', marginBottom:'12px' }}>FASHION › SPORTS & ACTIVEWEAR</p>
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
              <input type="text" value={keyword} onChange={e=>setKeyword(e.target.value)} placeholder={`e.g. ${catData.brands[0]}, Size M...`}
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
            { label:'Home',               href:`/${locale}` },
            { label:'Fashion',            href:`/${locale}/fashion` },
            { label:'Sports & Activewear',href:`/${locale}/fashion/sports` },
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
        <div style={{ display:'flex', justifyContent:'flex-end', gap:'10px', marginBottom:'20px' }}>
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

        {/* SELLER TABS + DIAMOND */}
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap' as const, gap:'14px', marginBottom:'20px' }}>
          <div style={{ display:'flex', gap:'4px', padding:'5px', backgroundColor:'#e8efec', borderRadius:'100px' }}>
            {['All Sellers','SouKni Members','SouKni Pro'].map(tab=>(
              <button key={tab} onClick={()=>setActiveSeller(tab)}
                style={{ padding:'10px 24px', borderRadius:'100px', fontSize:'11px', ...UB, textTransform:'uppercase' as const, letterSpacing:'0.1em', cursor:'pointer', border:'none',
                  backgroundColor: activeSeller===tab ? C.ink : 'transparent', color: activeSeller===tab ? 'white' : C.muted }}
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
              {pagedFiltered.map((item,i)=><ListingCard key={i} {...item} />)}
            </div>
          ) : (
            <div style={{ display:'flex', flexDirection:'column' as const, gap:'14px' }}>
              {pagedFiltered.map((item,i)=><ListRowCard key={i} {...item} />)}
            </div>
          )}
        </section>

        {/* PAGINATION */}
        <div style={{ display:'flex', justifyContent:'center', alignItems:'center', gap:'10px', marginBottom:'64px' }}>
          <button onClick={()=>setPage(p=>Math.max(1,p-1))} disabled={clampedPage<=1}
            style={{ width:'44px', height:'44px', borderRadius:'12px', backgroundColor:'white', border:'1px solid rgba(107,122,118,0.12)', cursor:clampedPage<=1?'not-allowed':'pointer', opacity:clampedPage<=1?0.4:1, display:'flex', alignItems:'center', justifyContent:'center', color:C.muted }}><ChevronLeft size={18} /></button>
          {Array.from({length:totalPages},(_,i)=>i+1).map(p=>(
            <button key={p} onClick={()=>setPage(p)}
              style={{ width:'44px', height:'44px', borderRadius:'12px', cursor:'pointer', fontSize:'15px', ...UB, border:'1px solid', backgroundColor:clampedPage===p?C.mint:'white', color:clampedPage===p?C.ink:C.muted, borderColor:clampedPage===p?C.mint:'rgba(107,122,118,0.12)' }}
            >{p}</button>
          ))}
          <button onClick={()=>setPage(p=>Math.min(totalPages,p+1))} disabled={clampedPage>=totalPages}
            style={{ width:'44px', height:'44px', borderRadius:'12px', backgroundColor:'white', border:'1px solid rgba(107,122,118,0.12)', cursor:clampedPage>=totalPages?'not-allowed':'pointer', opacity:clampedPage>=totalPages?0.4:1, display:'flex', alignItems:'center', justifyContent:'center', color:C.muted }}><ChevronRight size={18} /></button>
        </div>

        {/* EXPLORE OTHER CATEGORIES */}
        <section style={{ marginBottom:'48px' }}>
          <h3 style={{ fontSize:'clamp(18px,2.5vw,24px)', ...UB, color:C.ink, textTransform:'uppercase' as const, marginBottom:'20px' }}>Explore Other Sport Categories</h3>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(6,1fr)', gap:'14px' }}>
            {ALL_CATS.filter(c=>c.slug!==catSlug).map(cat=>(
              <Link key={cat.slug} href={`/${locale}/fashion/sports/${cat.slug}`}
                style={{ backgroundColor:'white', borderRadius:'20px', padding:'20px 16px', textAlign:'center' as const, border:'1px solid rgba(107,122,118,0.1)', textDecoration:'none', display:'block' }}>
                <p style={{ fontSize:'24px', marginBottom:'6px' }}>{cat.emoji}</p>
                <p style={{ fontSize:'10px', ...UB, color:C.ink, textTransform:'uppercase' as const, letterSpacing:'0.08em' }}>{cat.label}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* BACK */}
        <div style={{ textAlign:'center' as const }}>
          <Link href={`/${locale}/fashion/sports`}
            style={{ display:'inline-flex', alignItems:'center', gap:'8px', padding:'16px 40px', borderRadius:'100px', backgroundColor:C.ink, color:'white', textDecoration:'none', fontSize:'12px', ...UB, textTransform:'uppercase' as const, letterSpacing:'0.1em' }}
          >← Back to All Sports</Link>
        </div>
      </main>
    </div>
  )
}
