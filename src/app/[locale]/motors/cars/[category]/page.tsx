'use client'

import { useState } from 'react'
import React from 'react'
import { Heart, Search, ChevronDown, ChevronLeft, ChevronRight, SlidersHorizontal, MapPin } from 'lucide-react'
import Link from 'next/link'
import { useParams, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { useListings } from '@/hooks/useListings'
import { useMarket } from '@/context/MarketContext'

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
  brands:string[]; priceRanges:string[]
}> = {
  'all-cars': {
    label:'All Cars',
    hero:'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&w=1600',
    desc:'Browse the complete SouKni used car marketplace across Morocco.',
    count:'24,180',
    brands:['BMW','Mercedes-Benz','Audi','Porsche','Range Rover','Volkswagen','Toyota','Hyundai'],
    priceRanges:['Any Price','0 – 150,000 MAD','150,000 – 400,000 MAD','400,000 – 800,000 MAD','800,000 – 1,500,000 MAD','1,500,000+ MAD'],
  },
  'sedan': {
    label:'Sedan',
    hero:'https://images.pexels.com/photos/120049/pexels-photo-120049.jpeg?auto=compress&w=1600',
    desc:'Executive and sport sedans, from daily commuters to performance saloons.',
    count:'8,420',
    brands:['BMW','Mercedes-Benz','Audi','Toyota','Volkswagen','Hyundai','Renault'],
    priceRanges:['Any Price','0 – 100,000 MAD','100,000 – 300,000 MAD','300,000 – 600,000 MAD','600,000+ MAD'],
  },
  'suv': {
    label:'SUV',
    hero:'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&w=1600',
    desc:'Family and luxury SUVs built for Morocco\'s roads and terrain.',
    count:'6,910',
    brands:['Range Rover','Porsche','Mercedes-Benz','Toyota','Hyundai','Volkswagen'],
    priceRanges:['Any Price','0 – 200,000 MAD','200,000 – 500,000 MAD','500,000 – 1,000,000 MAD','1,000,000+ MAD'],
  },
  'coupe': {
    label:'Coupe',
    hero:'https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg?auto=compress&w=1600',
    desc:'Sporty two-door coupes and grand tourers for driving enthusiasts.',
    count:'1,240',
    brands:['BMW','Mercedes-Benz','Chevrolet','Audi','Porsche'],
    priceRanges:['Any Price','0 – 300,000 MAD','300,000 – 700,000 MAD','700,000 – 1,500,000 MAD','1,500,000+ MAD'],
  },
  'convertible': {
    label:'Convertible',
    hero:'https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg?auto=compress&w=1600',
    desc:'Open-top roadsters and cabriolets for Morocco\'s sunniest drives.',
    count:'384',
    brands:['BMW','Mercedes-Benz','Porsche','Audi'],
    priceRanges:['Any Price','0 – 300,000 MAD','300,000 – 800,000 MAD','800,000+ MAD'],
  },
  'electric': {
    label:'Electric',
    hero:'https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg?auto=compress&w=1600',
    desc:'Fully electric vehicles, from city hatchbacks to performance sedans.',
    count:'612',
    brands:['Audi','BMW','Mercedes-Benz','Hyundai','Renault'],
    priceRanges:['Any Price','0 – 250,000 MAD','250,000 – 600,000 MAD','600,000 – 1,200,000 MAD','1,200,000+ MAD'],
  },
  'pickup': {
    label:'Pickup',
    hero:'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&w=1600',
    desc:'Work-ready and off-road pickups for Morocco\'s terrain.',
    count:'1,850',
    brands:['Toyota','Ford','Volkswagen','Renault'],
    priceRanges:['Any Price','0 – 200,000 MAD','200,000 – 400,000 MAD','400,000 – 700,000 MAD','700,000+ MAD'],
  },
  'hatchback': {
    label:'Hatchback',
    hero:'https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg?auto=compress&w=1600',
    desc:'Compact and efficient hatchbacks for city driving.',
    count:'3,940',
    brands:['Volkswagen','Renault','Dacia','Hyundai','Toyota','Peugeot'],
    priceRanges:['Any Price','0 – 80,000 MAD','80,000 – 150,000 MAD','150,000 – 300,000 MAD','300,000+ MAD'],
  },
}

const ALL_CATS = [
  { label:'All Cars',     slug:'all-cars'    },
  { label:'Sedan',        slug:'sedan'       },
  { label:'SUV',          slug:'suv'         },
  { label:'Coupe',        slug:'coupe'       },
  { label:'Convertible',  slug:'convertible' },
  { label:'Electric',     slug:'electric'    },
  { label:'Pickup',       slug:'pickup'      },
  { label:'Hatchback',    slug:'hatchback'   },
]

const CAR_IMGS = [
  'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&w=400',
  'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&w=400',
  'https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg?auto=compress&w=400',
  'https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg?auto=compress&w=400',
  'https://images.pexels.com/photos/1638459/pexels-photo-1638459.jpeg?auto=compress&w=400',
]

type BadgeT = 'certified'|'diamond'|'featured'|'new'
function Badge({ type }: { type: BadgeT }) {
  const map: Record<BadgeT,{bg:string;color:string;label:string}> = {
    certified:{ bg:C.mint,   color:C.ink,  label:'SouKni Certified' },
    diamond:  { bg:C.ink,    color:C.mint, label:'Diamond Member'   },
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

function ListingCard({ brand, title, price, location, condition, img, badge, year, formatPrice, id, locale }: any) {
  const [saved, setSaved] = useState(false)
  const [hov,   setHov  ] = useState(false)
  const CardTag: any = id ? Link : 'div'
  const cardProps: any = id ? { href: `/${locale}/listing/${id}` } : {}
  return (
    <CardTag {...cardProps} onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{ backgroundColor:'white', borderRadius:'24px', border:`1px solid ${hov?C.mint:'rgba(107,122,118,0.1)'}`, overflow:'hidden', boxShadow:hov?`0 20px 40px ${C.mint}18`:'0 2px 8px rgba(0,0,0,0.04)', transition:'all 0.3s', cursor:'pointer', display:'flex', flexDirection:'column' as const, textDecoration:'none' }}>
      <div style={{ position:'relative', aspectRatio:'1/1', overflow:'hidden', backgroundColor:C.cream }}>
        <img src={img} alt={title} style={{ width:'100%', height:'100%', objectFit:'cover', transition:'transform 0.6s', transform:hov?'scale(1.08)':'scale(1)' }} />
        <div style={{ position:'absolute', top:'10px', left:'10px', zIndex:10 }}><Badge type={badge} /></div>
        <button onClick={e=>{e.stopPropagation();setSaved(!saved)}}
          style={{ position:'absolute', top:'8px', right:'8px', zIndex:10, width:'32px', height:'32px', borderRadius:'50%', backgroundColor:'rgba(255,255,255,0.85)', border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}>
          <Heart size={14} fill={saved?'#ef4444':'none'} color={saved?'#ef4444':C.muted} />
        </button>
        {condition && <div style={{ position:'absolute', bottom:'10px', left:'10px', zIndex:10, backgroundColor:'rgba(255,255,255,0.92)', padding:'3px 8px', borderRadius:'6px', fontSize:'9px', ...CB, color:C.mint, textTransform:'uppercase' as const }}>{condition}</div>}
      </div>
      <div style={{ padding:'16px 18px', flex:1, display:'flex', flexDirection:'column' as const }}>
        <p style={{ fontSize:'9px', ...CB, color:C.mint, textTransform:'uppercase' as const, letterSpacing:'0.1em', marginBottom:'2px' }}>{brand}</p>
        <h4 style={{ fontSize:'14px', ...CB, color:hov?C.mint:C.ink, marginBottom:'4px', transition:'color 0.2s', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' as const }}>{title}</h4>
        {year && <p style={{ fontSize:'10px', ...CB, color:C.muted, marginBottom:'2px' }}>Year: {year}</p>}
        <p style={{ fontSize:'18px', ...CB, color:C.mint, marginBottom:'6px' }}>{formatPrice(price)}</p>
        {location && <p style={{ fontSize:'10px', color:C.muted, ...CB, display:'flex', alignItems:'center', gap:'3px', marginBottom:'12px' }}><MapPin size={10}/>{location}</p>}
        <div style={{ marginTop:'auto', display:'flex', gap:'8px' }}>
          <button style={{ flex:1, border:`2px solid ${C.ink}`, color:C.ink, backgroundColor:'transparent', padding:'9px', borderRadius:'12px', fontSize:'10px', ...CB, textTransform:'uppercase' as const, cursor:'pointer', transition:'all 0.15s' }}
            onMouseEnter={e=>{e.currentTarget.style.backgroundColor=C.ink;e.currentTarget.style.color='white'}}
            onMouseLeave={e=>{e.currentTarget.style.backgroundColor='transparent';e.currentTarget.style.color=C.ink}}
          >Message</button>
          <a href="https://wa.me/212600000000?text=Hi%2C%20I%20found%20your%20car%20listing%20on%20SouKni!" target="_blank" rel="noopener noreferrer"
            style={{ flex:1, backgroundColor:'#25D366', color:'white', border:'none', padding:'9px', borderRadius:'12px', fontSize:'10px', ...CB, textTransform:'uppercase' as const, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', gap:'4px', textDecoration:'none' }}>
            WhatsApp
          </a>
        </div>
      </div>
    </CardTag>
  )
}

function makeListings(cat: string, count: number) {
  const titleMap: Record<string,string[]> = {
    'all-cars':    ['3 Series Sedan','GLE Coupe','Cayenne Turbo','Corvette Stingray','Defender 110','Tucson Hybrid'],
    'sedan':       ['3 Series Sedan','C-Class Sedan','A4 Sedan','Camry Hybrid','Passat Executive','Elantra Sport','Talisman Initiale'],
    'suv':         ['X5 xDrive','GLE SUV','Q7 Quattro','Land Cruiser Prado','Velar Dynamic','Tiguan R-Line'],
    'coupe':       ['4 Series Coupe','C-Class Coupe','TT Coupe','Corvette Stingray','911 Carrera'],
    'convertible': ['4 Series Cabriolet','SLC Roadster','TT Roadster','911 Cabriolet'],
    'electric':    ['i4 eDrive','EQE Electric','e-tron GT','Ioniq 6','Zoe E-Tech'],
    'pickup':      ['Hilux Double Cab','Ranger Wildtrak','Amarok V6','Duster Pickup'],
    'hatchback':   ['Golf GTI','Clio RS','Sandero Stepway','i20 Hatchback','208 GT Line'],
  }
  const cat_data = CATEGORIES[cat] || CATEGORIES['all-cars']
  const titles = titleMap[cat] || titleMap['all-cars']
  const badges: BadgeT[] = ['certified','diamond','featured','new','certified','diamond']
  const years  = ['2026','2025','2024','2023','2022','2021','2020']
  const locs   = ['Casablanca, Maarif','Rabat, Agdal','Marrakech, Gueliz','Tanger, Centre','Casablanca, Ain Diab']
  const conds  = ['Excellent','Like New','Good','Very Good',undefined,undefined]
  const colors = ['Black','White','Grey','Blue','Red','Silver']
  return Array.from({length:count},(_,i)=>({
    brand:     cat_data.brands[i%cat_data.brands.length],
    title:     `${titles[i%titles.length]} — ${colors[i%colors.length]}`,
    price:     80000 + ((i*27310)%900000),
    location:  locs[i%locs.length],
    year:      years[i%years.length],
    condition: conds[i%conds.length],
    img:       CAR_IMGS[i%CAR_IMGS.length],
    badge:     badges[i%badges.length],
  }))
}

export default function CarsCategoryPage() {
  const params   = useParams()
  const locale   = (params?.locale as string) || 'en'
  const catSlug  = (params?.category as string) || 'all-cars'
  const catData  = CATEGORIES[catSlug] || CATEGORIES['all-cars']
  const { formatPrice } = useMarket()

  const searchParams = useSearchParams()
  const [activeSeller, setActiveSeller] = useState('All Sellers')
  const [diamond,      setDiamond     ] = useState(true)
  const [gridView,     setGridView    ] = useState(true)
  const [page,         setPage        ] = useState(1)
  const [makeModel,    setMakeModel   ] = useState(searchParams?.get('q') || '')
  const [city,         setCity        ] = useState(searchParams?.get('city') || 'All Morocco')
  const [price,        setPrice       ] = useState('Any Price')
  const [sortBy,       setSortBy      ] = useState('Most Recent')
  const [activeBrand,  setActiveBrand ] = useState('All Brands')
  const [cityOpen,     setCityOpen    ] = useState(false)
  const [priceOpen,    setPriceOpen   ] = useState(false)

  const cities = ['All Morocco','Casablanca','Rabat','Marrakech','Fès','Tanger','Agadir','Meknès']
  const PRICE_MAP: Record<string,{min?:number;max?:number}> = {
    'Any Price': {},
    'Under 100,000 MAD': { max: 100000 },
    '100,000 – 300,000 MAD': { min: 100000, max: 300000 },
    '300,000 – 700,000 MAD': { min: 300000, max: 700000 },
    '700,000+ MAD': { min: 700000 },
  }
  const SORT_MAP: Record<string,'newest'|'price_asc'|'price_desc'> = {
    'Most Recent': 'newest',
    'Price: Low to High': 'price_asc',
    'Price: High to Low': 'price_desc',
  }

  const { fetchListings, loading } = useListings()
  const [dbListings, setDbListings] = useState<any[]>([])
  const [searchTrigger, setSearchTrigger] = useState(0)
  const LIMIT = 24

  useEffect(() => {
    const t = setTimeout(() => {
      const priceFilter = PRICE_MAP[price] || {}
      fetchListings({
        category: 'motors',
        query: makeModel || undefined,
        city: city !== 'All Morocco' ? city : undefined,
        minPrice: priceFilter.min,
        maxPrice: priceFilter.max,
        sortBy: SORT_MAP[sortBy] || 'newest',
        limit: LIMIT,
        offset: (page - 1) * LIMIT,
      }).then(rows => setDbListings(rows || []))
    }, 400)
    return () => clearTimeout(t)
  }, [makeModel, city, price, sortBy, page, searchTrigger])

  function mapDbRowToCard(row: any) {
    return {
      brand: row.make || row.brand || '',
      title: row.title,
      price: (row.price || 0) / 100,
      location: row.city,
      condition: row.condition || 'Used',
      img: (row.images && row.images[0]) || CAR_IMGS[0],
      badge: row.badge || 'verified',
      year: row.year || '',
      id: row.id,
    }
  }

  const hasRealData = dbListings.length > 0
  const listings = hasRealData ? dbListings.map(mapDbRowToCard) : makeListings(catSlug, 24)

  function DDrop({ label, value, options, open, setOpen, onChange }: any) {
    return (
      <div style={{ position:'relative', flex:1 }}>
        <button onClick={()=>{ setOpen(!open); setCityOpen(false); setPriceOpen(false) }}
          style={{ width:'100%', height:'100%', background:'none', border:'none', cursor:'pointer', padding:'0 22px', display:'flex', flexDirection:'column' as const, justifyContent:'center', textAlign:'left' as const }}>
          <span style={{ fontSize:'9px', ...UB, textTransform:'uppercase' as const, letterSpacing:'0.14em', color:C.muted, marginBottom:'3px' }}>{label}</span>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
            <span style={{ fontSize:'14px', ...UB, color:C.ink }}>{value}</span>
            <ChevronDown size={14} color={C.mint} style={{ flexShrink:0, transition:'transform 0.2s', transform:open?'rotate(180deg)':'rotate(0)' }} />
          </div>
        </button>
        {open && (
          <div style={{ position:'absolute', top:'calc(100% + 8px)', left:0, minWidth:'220px', backgroundColor:'white', borderRadius:'20px', boxShadow:'0 20px 60px rgba(0,0,0,0.12)', border:'1px solid rgba(107,122,118,0.12)', zIndex:200, overflow:'hidden', padding:'8px 0' }}>
            {options.map((opt:string)=>(
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

      {/* ══ HERO ══════════════════════════════════════════════ */}
      <section style={{ position:'relative', height:'360px', display:'flex', alignItems:'center', justifyContent:'center', overflow:'hidden' }}>
        <img src={catData.hero} alt={catData.label} style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover' }} />
        <div style={{ position:'absolute', inset:0, backgroundColor:'rgba(22,29,27,0.52)' }} />
        <div style={{ position:'relative', zIndex:10, textAlign:'center' as const, maxWidth:'860px', padding:'0 24px', width:'100%' }}>
          <p style={{ fontSize:'11px', ...UB, color:C.mint, textTransform:'uppercase' as const, letterSpacing:'0.2em', marginBottom:'12px' }}>MOTORS › USED CARS</p>
          <h1 style={{ fontSize:'clamp(32px,5vw,52px)', ...UB, color:'white', marginBottom:'16px', lineHeight:1.05, textShadow:'0 4px 20px rgba(0,0,0,0.4)' }}>
            {catData.label} in Morocco
          </h1>
          <p style={{ fontSize:'16px', color:'rgba(255,255,255,0.82)', marginBottom:'28px' }}>{catData.desc}</p>
          <div style={{ maxWidth:'620px', margin:'0 auto', backgroundColor:'rgba(255,255,255,0.12)', backdropFilter:'blur(12px)', border:'1px solid rgba(255,255,255,0.22)', borderRadius:'100px', padding:'6px', display:'flex', alignItems:'center', gap:'8px' }}>
            <div style={{ flex:1, display:'flex', alignItems:'center', gap:'8px', padding:'0 16px' }}>
              <Search size={16} color="rgba(255,255,255,0.7)" />
              <input type="text" value={makeModel} onChange={e=>setMakeModel(e.target.value)} placeholder={`Search ${catData.label}...`}
                style={{ flex:1, background:'none', border:'none', outline:'none', color:'white', fontSize:'14px', ...UB, fontFamily:'Inter,sans-serif' }} />
            </div>
            <button style={{ backgroundColor:C.mint, color:C.ink, border:'none', padding:'12px 28px', borderRadius:'100px', fontSize:'11px', ...UB, textTransform:'uppercase' as const, letterSpacing:'0.1em', cursor:'pointer' }}>SEARCH</button>
          </div>
        </div>
      </section>

      {/* ══ FILTER BAR ════════════════════════════════════════ */}
      <div style={{ maxWidth:'1280px', margin:'-36px auto 0', padding:'0 24px', position:'relative', zIndex:30 }}>
        <div style={{ backgroundColor:'rgba(255,255,255,0.97)', backdropFilter:'blur(16px)', border:'1px solid rgba(107,122,118,0.12)', borderRadius:'100px', boxShadow:'0 12px 40px rgba(0,0,0,0.08)', display:'flex', alignItems:'stretch', height:'68px' }}>
          <DDrop label="CITY" value={city} options={cities} open={cityOpen} setOpen={setCityOpen} onChange={setCity} />
          <div style={{ width:'1px', backgroundColor:'rgba(107,122,118,0.12)', margin:'12px 0' }} />
          <div style={{ flex:1.8, padding:'0 22px', display:'flex', flexDirection:'column' as const, justifyContent:'center' }}>
            <span style={{ fontSize:'9px', ...UB, textTransform:'uppercase' as const, letterSpacing:'0.14em', color:C.muted, marginBottom:'3px' }}>MAKE & MODEL</span>
            <div style={{ display:'flex', alignItems:'center', gap:'8px' }}>
              <Search size={13} color={C.muted} />
              <input type="text" value={makeModel} onChange={e=>setMakeModel(e.target.value)} placeholder={`e.g. ${catData.brands[0]}...`}
                style={{ flex:1, background:'none', border:'none', outline:'none', fontSize:'14px', ...UB, color:C.ink, fontFamily:'Inter,sans-serif' }} />
              {makeModel && <button onClick={()=>setMakeModel('')} style={{ background:'none', border:'none', cursor:'pointer', color:C.muted, fontSize:'16px' }}>✕</button>}
            </div>
          </div>
          <div style={{ width:'1px', backgroundColor:'rgba(107,122,118,0.12)', margin:'12px 0' }} />
          <DDrop label="PRICE (MAD)" value={price} options={catData.priceRanges} open={priceOpen} setOpen={setPriceOpen} onChange={setPrice} />
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

        {/* ══ BREADCRUMB ════════════════════════════════════════ */}
        <nav style={{ display:'flex', alignItems:'center', gap:'6px', fontSize:'10px', ...UB, color:C.muted, textTransform:'uppercase' as const, letterSpacing:'0.12em', marginBottom:'12px' }}>
          {[
            { label:'Home',       href:`/${locale}` },
            { label:'Motors',     href:`/${locale}/motors` },
            { label:'Used Cars',  href:`/${locale}/motors/cars` },
            { label:catData.label, href:null },
          ].map((c,i,arr)=>(
            <span key={c.label} style={{ display:'flex', alignItems:'center', gap:'6px' }}>
              {c.href
                ? <Link href={c.href} style={{ color:C.muted, textDecoration:'none', transition:'color 0.15s' }}
                    onMouseEnter={e=>e.currentTarget.style.color=C.mint}
                    onMouseLeave={e=>e.currentTarget.style.color=C.muted}
                  >{c.label}</Link>
                : <span style={{ color:C.ink }}>{c.label}</span>}
              {i<arr.length-1 && <span style={{ opacity:0.4 }}>›</span>}
            </span>
          ))}
        </nav>

        {/* ══ TITLE + SORT ══════════════════════════════════════ */}
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', gap:'16px', marginBottom:'24px', flexWrap:'wrap' as const }}>
          <div>
            <h2 style={{ fontSize:'clamp(20px,2.5vw,28px)', ...UB, color:C.ink, marginBottom:'4px' }}>{catData.label} for Sale in Morocco</h2>
            <p style={{ fontSize:'14px', color:C.mint, ...CB }}>{catData.count} Ads</p>
          </div>
          <div style={{ display:'flex', gap:'10px', alignItems:'center' }}>
            <select value={sortBy} onChange={e=>setSortBy(e.target.value)}
              style={{ backgroundColor:'white', border:'1px solid rgba(107,122,118,0.18)', padding:'9px 16px', borderRadius:'12px', fontSize:'10px', ...UB, textTransform:'uppercase' as const, letterSpacing:'0.1em', cursor:'pointer', color:C.ink, outline:'none' }}>
              {['Most Recent','Price: Low to High','Price: High to Low','Most Popular'].map(s=><option key={s}>{s}</option>)}
            </select>
            <button style={{ backgroundColor:'white', border:'1px solid rgba(107,122,118,0.18)', padding:'9px 16px', borderRadius:'12px', fontSize:'10px', ...UB, textTransform:'uppercase' as const, letterSpacing:'0.1em', cursor:'pointer', color:C.ink }}>Save Search</button>
          </div>
        </div>

        {/* ══ SUB-CATEGORY PILLS ════════════════════════════════ */}
        <div style={{ display:'flex', gap:'10px', flexWrap:'wrap' as const, marginBottom:'20px' }}>
          {ALL_CATS.map(cat=>(
            <Link key={cat.slug} href={`/${locale}/motors/cars/${cat.slug}`}
              style={{ padding:'10px 22px', borderRadius:'100px', fontSize:'11px', ...UB, textTransform:'uppercase' as const, letterSpacing:'0.1em', cursor:'pointer', transition:'all 0.2s', border:'1px solid', textDecoration:'none', display:'inline-block',
                backgroundColor: catSlug===cat.slug ? C.mint  : 'white',
                color:           catSlug===cat.slug ? C.ink   : C.muted,
                borderColor:     catSlug===cat.slug ? C.mint  : 'rgba(186,202,197,0.4)',
              }}
              onMouseEnter={e=>{if(catSlug!==cat.slug){e.currentTarget.style.borderColor=C.mint;e.currentTarget.style.color=C.ink}}}
              onMouseLeave={e=>{if(catSlug!==cat.slug){e.currentTarget.style.borderColor='rgba(186,202,197,0.4)';e.currentTarget.style.color=C.muted}}}
            >{cat.label}</Link>
          ))}
        </div>

        {/* ══ SELLER TABS + DIAMOND ══════════════════════════════ */}
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

        {/* ══ NEW ARRIVALS + GRID TOGGLE ════════════════════════ */}
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'32px' }}>
          <div style={{ display:'flex', gap:'10px' }}>
            {['New Arrivals','Price Drop Alert'].map(btn=>(
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

        {/* ══ BRAND FILTER ══════════════════════════════════════ */}
        <div style={{ backgroundColor:'white', borderRadius:'20px', padding:'20px 24px', marginBottom:'32px', border:'1px solid rgba(107,122,118,0.1)', boxShadow:'0 2px 8px rgba(0,0,0,0.04)' }}>
          <p style={{ fontSize:'9px', ...UB, color:C.muted, textTransform:'uppercase' as const, letterSpacing:'0.14em', marginBottom:'12px' }}>FILTER BY MAKE</p>
          <div style={{ display:'flex', gap:'8px', flexWrap:'wrap' as const }}>
            <button onClick={()=>setActiveBrand('All Brands')}
              style={{ padding:'7px 16px', borderRadius:'100px', fontSize:'10px', ...UB, border:`1px solid`, cursor:'pointer', transition:'all 0.15s',
                backgroundColor: activeBrand==='All Brands'?C.mint:'transparent',
                color:           activeBrand==='All Brands'?C.ink:C.muted,
                borderColor:     activeBrand==='All Brands'?C.mint:'rgba(107,122,118,0.2)',
              }}>All Makes</button>
            {catData.brands.map(brand=>(
              <button key={brand} onClick={()=>setActiveBrand(brand)}
                style={{ padding:'7px 16px', borderRadius:'100px', fontSize:'10px', ...UB, border:`1px solid`, cursor:'pointer', transition:'all 0.15s',
                  backgroundColor: activeBrand===brand?C.mint:'transparent',
                  color:           activeBrand===brand?C.ink:C.muted,
                  borderColor:     activeBrand===brand?C.mint:'rgba(107,122,118,0.2)',
                }}
                onMouseEnter={e=>{if(activeBrand!==brand){e.currentTarget.style.borderColor=C.mint;e.currentTarget.style.color=C.ink}}}
                onMouseLeave={e=>{if(activeBrand!==brand){e.currentTarget.style.borderColor='rgba(107,122,118,0.2)';e.currentTarget.style.color=C.muted}}}
              >{brand}</button>
            ))}
          </div>
        </div>

        {/* ══ LISTINGS GRID ═════════════════════════════════════ */}
        <section style={{ marginBottom:'48px' }}>
          <p style={{ fontSize:'13px', color:C.muted, ...CB, marginBottom:'20px' }}>Showing {listings.length} of {catData.count} results</p>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'20px' }}>
            {listings.map((item,i)=><ListingCard key={item.id||i} {...item} formatPrice={formatPrice} locale={locale} />)}
          </div>
        </section>

        {/* ══ PAGINATION ════════════════════════════════════════ */}
        <div style={{ display:'flex', justifyContent:'center', alignItems:'center', gap:'10px', marginBottom:'64px' }}>
          <button style={{ width:'44px', height:'44px', borderRadius:'12px', backgroundColor:'white', border:'1px solid rgba(107,122,118,0.12)', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', color:C.muted }}><ChevronLeft size={18} /></button>
          {[1,2,3,4,5].map(p=>(
            <button key={p} onClick={()=>setPage(p)}
              style={{ width:'44px', height:'44px', borderRadius:'12px', cursor:'pointer', fontSize:'15px', ...UB, border:'1px solid', transition:'all 0.2s',
                backgroundColor: page===p?C.mint:'white', color:page===p?C.ink:C.muted, borderColor:page===p?C.mint:'rgba(107,122,118,0.12)',
              }}
            >{p}</button>
          ))}
          <span style={{ color:C.muted }}>…</span>
          <button style={{ width:'44px', height:'44px', borderRadius:'12px', backgroundColor:'white', border:'1px solid rgba(107,122,118,0.12)', cursor:'pointer', fontSize:'15px', ...UB, color:C.muted }}>8</button>
          <button style={{ width:'44px', height:'44px', borderRadius:'12px', backgroundColor:'white', border:'1px solid rgba(107,122,118,0.12)', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', color:C.muted }}><ChevronRight size={18} /></button>
        </div>

        {/* ══ EXPLORE OTHER CATEGORIES ══════════════════════════ */}
        <section style={{ marginBottom:'48px' }}>
          <h3 style={{ fontSize:'clamp(18px,2.5vw,24px)', ...UB, color:C.ink, textTransform:'uppercase' as const, marginBottom:'20px' }}>Explore Other Car Categories</h3>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(5,1fr)', gap:'14px' }}>
            {ALL_CATS.filter(c=>c.slug!==catSlug).map(cat=>(
              <Link key={cat.slug} href={`/${locale}/motors/cars/${cat.slug}`}
                style={{ backgroundColor:'white', borderRadius:'20px', padding:'24px 16px', textAlign:'center' as const, border:'1px solid rgba(107,122,118,0.1)', textDecoration:'none', transition:'all 0.2s', display:'block' }}
                onMouseEnter={e=>{e.currentTarget.style.borderColor=C.mint;e.currentTarget.style.boxShadow=`0 8px 24px ${C.mint}18`}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor='rgba(107,122,118,0.1)';e.currentTarget.style.boxShadow='none'}}
              >
                <p style={{ fontSize:'12px', ...UB, color:C.ink, textTransform:'uppercase' as const, letterSpacing:'0.08em' }}>{cat.label}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* ══ BACK TO ALL CARS ══════════════════════════════════ */}
        <div style={{ textAlign:'center' as const }}>
          <Link href={`/${locale}/motors/cars`}
            style={{ display:'inline-flex', alignItems:'center', gap:'8px', padding:'16px 40px', borderRadius:'100px', backgroundColor:C.ink, color:'white', textDecoration:'none', fontSize:'12px', ...UB, textTransform:'uppercase' as const, letterSpacing:'0.1em', transition:'background 0.2s' }}
            onMouseEnter={e=>e.currentTarget.style.backgroundColor=C.mint}
            onMouseLeave={e=>e.currentTarget.style.backgroundColor=C.ink}
          >Back to All Cars</Link>
        </div>
      </main>
    </div>
  )
}
