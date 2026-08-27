'use client'

import { useState, useEffect } from 'react'
import { useListings } from '@/hooks/useListings'
import React from 'react'
import { Heart, Search, ChevronDown, ChevronLeft, ChevronRight, SlidersHorizontal, MapPin, Star } from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import Breadcrumb from '@/components/ui/Breadcrumb'
import CategoryFooterNav from '@/components/ui/CategoryFooterNav'

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
  models:string[]; priceRanges:string[]
}> = {
  'all-vehicles': {
    label:'All Vehicles',
    hero:'https://images.pexels.com/photos/3764984/pexels-photo-3764984.jpeg?auto=compress&w=1600',
    desc:'Browse every car available to rent from local owners across Morocco.',
    count:'1,992',
    models:['Range Rover Velar','Mercedes-Benz S-Class','Tesla Model 3','Porsche Cayenne','Volvo XC90','Maserati Ghibli'],
    priceRanges:['Any Price','0 – 1,000 MAD/day','1,000 – 2,500 MAD/day','2,500 – 5,000 MAD/day','5,000+ MAD/day'],
  },
  'suv': {
    label:'SUV',
    hero:'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&w=1600',
    desc:'Spacious SUVs for road trips, family travel, and off-road comfort.',
    count:'540',
    models:['Range Rover Velar','Porsche Cayenne Coupe','Volvo XC90','Land Rover Defender'],
    priceRanges:['Any Price','0 – 1,500 MAD/day','1,500 – 3,000 MAD/day','3,000 – 5,000 MAD/day','5,000+ MAD/day'],
  },
  'sedan': {
    label:'Sedan',
    hero:'https://images.pexels.com/photos/3764984/pexels-photo-3764984.jpeg?auto=compress&w=1600',
    desc:'Comfortable sedans for business trips and everyday driving.',
    count:'410',
    models:['Mercedes-Benz S-Class','Audi A8 L','BMW 5 Series','Tesla Model S'],
    priceRanges:['Any Price','0 – 1,200 MAD/day','1,200 – 2,500 MAD/day','2,500 – 4,000 MAD/day','4,000+ MAD/day'],
  },
  'luxury': {
    label:'Luxury',
    hero:'https://images.pexels.com/photos/337909/pexels-photo-337909.jpeg?auto=compress&w=1600',
    desc:'Exotic and prestige vehicles shared by private collectors.',
    count:'180',
    models:['Ferrari Panamera','Rolls-Royce Cullinan','Lamborghini Urus S','Bentley Bentayga'],
    priceRanges:['Any Price','0 – 5,000 MAD/day','5,000 – 9,000 MAD/day','9,000 – 15,000 MAD/day','15,000+ MAD/day'],
  },
  'economy': {
    label:'Economy',
    hero:'https://images.pexels.com/photos/1035108/pexels-photo-1035108.jpeg?auto=compress&w=1600',
    desc:'Budget-friendly, fuel-efficient cars for everyday needs.',
    count:'620',
    models:['Dacia Sandero','Renault Clio','Hyundai i20','Peugeot 208'],
    priceRanges:['Any Price','0 – 400 MAD/day','400 – 700 MAD/day','700 – 1,000 MAD/day','1,000+ MAD/day'],
  },
  'convertible': {
    label:'Convertible',
    hero:'https://images.pexels.com/photos/2127039/pexels-photo-2127039.jpeg?auto=compress&w=1600',
    desc:'Open-top cars for scenic drives along the coast.',
    count:'95',
    models:['BMW 4 Series Cabriolet','Mercedes-Benz SLC','Audi TT Roadster'],
    priceRanges:['Any Price','0 – 2,000 MAD/day','2,000 – 4,000 MAD/day','4,000+ MAD/day'],
  },
  'van': {
    label:'Van',
    hero:'https://images.pexels.com/photos/1007410/pexels-photo-1007410.jpeg?auto=compress&w=1600',
    desc:'Group and family vans for larger trips and airport transfers.',
    count:'147',
    models:['Mercedes-Benz V-Class','Volkswagen Caravelle','Peugeot Traveller'],
    priceRanges:['Any Price','0 – 1,000 MAD/day','1,000 – 1,800 MAD/day','1,800+ MAD/day'],
  },
}

const ALL_CATS = [
  { label:'All Vehicles', slug:'all-vehicles' },
  { label:'SUV',           slug:'suv'          },
  { label:'Sedan',         slug:'sedan'        },
  { label:'Luxury',        slug:'luxury'       },
  { label:'Economy',       slug:'economy'      },
  { label:'Convertible',   slug:'convertible'  },
  { label:'Van',           slug:'van'          },
]

const RENTAL_IMGS = [
  'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&w=400',
  'https://images.pexels.com/photos/3764984/pexels-photo-3764984.jpeg?auto=compress&w=400',
  'https://images.pexels.com/photos/1035108/pexels-photo-1035108.jpeg?auto=compress&w=400',
  'https://images.pexels.com/photos/2127039/pexels-photo-2127039.jpeg?auto=compress&w=400',
  'https://images.pexels.com/photos/337909/pexels-photo-337909.jpeg?auto=compress&w=400',
]

type BadgeT = 'trusted'|'instant'|'verified'|'new'
function Badge({ type }: { type: BadgeT }) {
  const map: Record<BadgeT,{bg:string;color:string;label:string}> = {
    trusted:  { bg:C.mint, color:C.ink,  label:'Trusted Host'   },
    instant:  { bg:C.ink,  color:C.mint, label:'Instant Book'   },
    verified: { bg:C.mint, color:C.ink,  label:'Verified Owner' },
    new:      { bg:C.mint, color:'white', label:'New Listing'   },
  }
  const s = map[type]
  return (
    <span style={{ backgroundColor:s.bg, color:s.color, fontSize:'8px', ...CB, padding:'4px 10px', borderRadius:'6px', textTransform:'uppercase' as const, letterSpacing:'0.08em', display:'inline-block', boxShadow:'0 2px 6px rgba(0,0,0,0.15)', whiteSpace:'nowrap' as const }}>
      {s.label}
    </span>
  )
}

function ListingCard({ owner, title, price, location, feature, img, badge, rating }: any) {
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
        {feature && <div style={{ position:'absolute', bottom:'10px', left:'10px', zIndex:10, backgroundColor:'rgba(255,255,255,0.92)', padding:'3px 8px', borderRadius:'6px', fontSize:'9px', ...CB, color:C.mint, textTransform:'uppercase' as const }}>{feature}</div>}
      </div>
      <div style={{ padding:'16px 18px', flex:1, display:'flex', flexDirection:'column' as const }}>
        <h4 style={{ fontSize:'14px', ...CB, color:hov?C.mint:C.ink, marginBottom:'4px', transition:'color 0.2s', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' as const }}>{title}</h4>
        <div style={{ display:'flex', alignItems:'center', gap:'5px', marginBottom:'6px' }}>
          <span style={{ fontSize:'10px', ...CB, color:C.muted }}>{owner}</span>
          <span style={{ display:'flex', alignItems:'center', gap:'2px', fontSize:'10px', color:'#f59e0b', ...CB }}><Star size={9} fill="#f59e0b" />{rating.toFixed(1)}</span>
        </div>
        <p style={{ fontSize:'18px', ...CB, color:C.mint, marginBottom:'6px' }}>MAD {price.toLocaleString()}<span style={{ fontSize:'10px', fontWeight:400, color:C.muted }}> /day</span></p>
        {location && <p style={{ fontSize:'10px', color:C.muted, ...CB, display:'flex', alignItems:'center', gap:'3px', marginBottom:'12px' }}><MapPin size={10}/>{location}</p>}
        <div style={{ marginTop:'auto', display:'flex', gap:'8px' }}>
          <button style={{ flex:1, border:`2px solid ${C.ink}`, color:C.ink, backgroundColor:'transparent', padding:'9px', borderRadius:'12px', fontSize:'10px', ...CB, textTransform:'uppercase' as const, cursor:'pointer', transition:'all 0.15s' }}
            onMouseEnter={e=>{e.currentTarget.style.backgroundColor=C.ink;e.currentTarget.style.color='white'}}
            onMouseLeave={e=>{e.currentTarget.style.backgroundColor='transparent';e.currentTarget.style.color=C.ink}}
          >Message</button>
          <button style={{ flex:1, backgroundColor:C.mint, color:C.ink, border:'none', padding:'9px', borderRadius:'12px', fontSize:'10px', ...CB, textTransform:'uppercase' as const, cursor:'pointer' }}>Book Now</button>
        </div>
      </div>
    </article>
  )
}

function makeListings(cat: string, count: number) {
  const cat_data = CATEGORIES[cat] || CATEGORIES['all-vehicles']
  const owners = ['Yassine B.','Sara M.','Amine K.','Nadia R.','Karim T.','Hamza E.','Mehdi S.','Salma A.']
  const badges: BadgeT[] = ['verified','instant','trusted','new','verified','instant']
  const locs   = ['Casablanca','Rabat','Marrakech','Tangier','Agadir']
  const feats  = ['Automatic','GPS Included','Unlimited Mileage','Delivery Available',undefined,undefined]
  return Array.from({length:count},(_,i)=>({
    owner:    owners[i%owners.length],
    title:    cat_data.models[i%cat_data.models.length],
    price:    300 + ((i*731)%9000),
    location: locs[i%locs.length],
    feature:  feats[i%feats.length],
    img:      RENTAL_IMGS[i%RENTAL_IMGS.length],
    badge:    badges[i%badges.length],
    rating:   4.5 + ((i%5)*0.1),
  }))
}

export default function RentalCategoryPage() {
  const params   = useParams()
  const locale   = (params?.locale as string) || 'en'
  const catSlug  = (params?.category as string) || 'all-vehicles'
  const catData  = CATEGORIES[catSlug] || CATEGORIES['all-vehicles']

  const [activeSeller, setActiveSeller] = useState('All Hosts')
  const [verified,     setVerified    ] = useState(true)
  const [gridView,     setGridView    ] = useState(true)
  const [page,         setPage        ] = useState(1)
  const [keyword,      setKeyword     ] = useState('')
  const [city,         setCity        ] = useState('All')
  const [price,        setPrice       ] = useState('Any Price')
  const [sortBy,       setSortBy      ] = useState('Most Recent')
  const [activeFeature,setActiveFeature] = useState('All Features')
  const [cityOpen,     setCityOpen    ] = useState(false)
  const [priceOpen,    setPriceOpen   ] = useState(false)

  const { fetchListings } = useListings()
  const [dbListings, setDbListings] = useState<any[]>([])
  useEffect(() => {
    const t = setTimeout(() => {
      fetchListings({ category: 'motors', sortBy: 'newest', limit: 24 }).then(rows => setDbListings(rows || []))
    }, 400)
    return () => clearTimeout(t)
  }, [])
  function mapDbRowToCard(row: any) {
    return {
      owner: row.profiles?.full_name || '',
      title: row.title,
      price: (row.price || 0) / 100,
      location: row.city,
      feature: undefined,
      img: (row.images && row.images[0]) || RENTAL_IMGS[0],
      badge: row.badge || 'verified',
      rating: row.profiles?.rating || 4.5,
    }
  }
  const hasRealData = dbListings.length > 0
  const listingsAll = hasRealData ? dbListings.map(mapDbRowToCard) : makeListings(catSlug, 24)

  function priceInRange(itemPrice: number, rangeLabel: string) {
    if (!rangeLabel || rangeLabel === 'Select' || rangeLabel.startsWith('Any')) return true
    const nums = rangeLabel.replace(/,/g, '').match(/\d+/g)?.map(Number) || []
    if (rangeLabel.includes('+')) return itemPrice >= nums[0]
    if (nums.length === 2) return itemPrice >= nums[0] && itemPrice <= nums[1]
    return true
  }

  const filteredListings = listingsAll.filter((item: any) => {
    const mk = keyword.trim()==='' ||
      (item.title || '').toLowerCase().includes(keyword.toLowerCase()) ||
      (item.owner || '').toLowerCase().includes(keyword.toLowerCase())
    const mp = priceInRange(item.price, price)
    return mk && mp
  })

  const PAGE_SIZE = 8
  const totalPages = Math.max(1, Math.ceil(filteredListings.length / PAGE_SIZE))
  const listings = filteredListings.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  useEffect(() => { setPage(1) }, [keyword, price])
  const cities   = ['All','Casablanca','Rabat','Marrakech','Fès','Tanger','Agadir','Meknès']
  const features = ['Automatic','GPS Included','Child Seat Available','Unlimited Mileage','Delivery Available']

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
          <p style={{ fontSize:'11px', ...UB, color:C.mint, textTransform:'uppercase' as const, letterSpacing:'0.2em', marginBottom:'12px' }}>MOTORS › CAR RENTAL</p>
          <h1 style={{ fontSize:'clamp(32px,5vw,52px)', ...UB, color:'white', marginBottom:'16px', lineHeight:1.05, textShadow:'0 4px 20px rgba(0,0,0,0.4)' }}>
            {catData.label} Rentals in Morocco
          </h1>
          <p style={{ fontSize:'16px', color:'rgba(255,255,255,0.82)', marginBottom:'28px' }}>{catData.desc}</p>
          <div style={{ maxWidth:'620px', margin:'0 auto', backgroundColor:'rgba(255,255,255,0.12)', backdropFilter:'blur(12px)', border:'1px solid rgba(255,255,255,0.22)', borderRadius:'100px', padding:'6px', display:'flex', alignItems:'center', gap:'8px' }}>
            <div style={{ flex:1, display:'flex', alignItems:'center', gap:'8px', padding:'0 16px' }}>
              <Search size={16} color="rgba(255,255,255,0.7)" />
              <input type="text" value={keyword} onChange={e=>setKeyword(e.target.value)} placeholder={`Search ${catData.label}...`}
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
            <span style={{ fontSize:'9px', ...UB, textTransform:'uppercase' as const, letterSpacing:'0.14em', color:C.muted, marginBottom:'3px' }}>SEARCH</span>
            <div style={{ display:'flex', alignItems:'center', gap:'8px' }}>
              <Search size={13} color={C.muted} />
              <input type="text" value={keyword} onChange={e=>setKeyword(e.target.value)} placeholder={`e.g. ${catData.models[0]}...`}
                style={{ flex:1, background:'none', border:'none', outline:'none', fontSize:'14px', ...UB, color:C.ink, fontFamily:'Inter,sans-serif' }} />
              {keyword && <button onClick={()=>setKeyword('')} style={{ background:'none', border:'none', cursor:'pointer', color:C.muted, fontSize:'16px' }}>✕</button>}
            </div>
          </div>
          <div style={{ width:'1px', backgroundColor:'rgba(107,122,118,0.12)', margin:'12px 0' }} />
          <DDrop label="PRICE (MAD/DAY)" value={price} options={catData.priceRanges} open={priceOpen} setOpen={setPriceOpen} onChange={setPrice} />
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
        <Breadcrumb
          items={[
            { label:'Home', href:`/${locale}` },
            { label:'Motors', href:`/${locale}/motors` },
            { label:'Car Rental', href:`/${locale}/motors/rental` },
            { label:catData.label },
          ]}
          mutedColor={C.muted}
          inkColor={C.ink}
          style={{ fontSize:'10px', ...UB, letterSpacing:'0.12em', marginBottom:'12px' }}
        />

        {/* ══ TITLE + SORT ══════════════════════════════════════ */}
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', gap:'16px', marginBottom:'24px', flexWrap:'wrap' as const }}>
          <div>
            <h2 style={{ fontSize:'clamp(20px,2.5vw,28px)', ...UB, color:C.ink, marginBottom:'4px' }}>{catData.label} Rentals from Local Owners</h2>
            <p style={{ fontSize:'14px', color:C.mint, ...CB }}>{catData.count} Listings</p>
          </div>
          <div style={{ display:'flex', gap:'10px', alignItems:'center' }}>
            <select value={sortBy} onChange={e=>setSortBy(e.target.value)}
              style={{ backgroundColor:'white', border:'1px solid rgba(107,122,118,0.18)', padding:'9px 16px', borderRadius:'12px', fontSize:'10px', ...UB, textTransform:'uppercase' as const, letterSpacing:'0.1em', cursor:'pointer', color:C.ink, outline:'none' }}>
              {['Most Recent','Price: Low to High','Price: High to Low','Top Rated'].map(s=><option key={s}>{s}</option>)}
            </select>
            <button style={{ backgroundColor:'white', border:'1px solid rgba(107,122,118,0.18)', padding:'9px 16px', borderRadius:'12px', fontSize:'10px', ...UB, textTransform:'uppercase' as const, letterSpacing:'0.1em', cursor:'pointer', color:C.ink }}>Save Search</button>
          </div>
        </div>

        {/* ══ SUB-CATEGORY PILLS ════════════════════════════════ */}
        <div style={{ display:'flex', gap:'10px', flexWrap:'wrap' as const, marginBottom:'20px' }}>
          {ALL_CATS.map(cat=>(
            <Link key={cat.slug} href={`/${locale}/motors/rental/${cat.slug}`}
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

        {/* ══ HOST TABS + VERIFIED ══════════════════════════════ */}
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap' as const, gap:'14px', marginBottom:'20px' }}>
          <div style={{ display:'flex', gap:'4px', padding:'5px', backgroundColor:'#e8efec', borderRadius:'100px' }}>
            {['All Hosts','SouKni Members','SouKni Pro'].map(tab=>(
              <button key={tab} onClick={()=>setActiveSeller(tab)}
                style={{ padding:'10px 24px', borderRadius:'100px', fontSize:'11px', ...UB, textTransform:'uppercase' as const, letterSpacing:'0.1em', cursor:'pointer', border:'none', transition:'all 0.2s',
                  backgroundColor: activeSeller===tab ? C.ink   : 'transparent',
                  color:           activeSeller===tab ? 'white' : C.muted,
                  boxShadow:       activeSeller===tab ? '0 2px 8px rgba(0,0,0,0.15)' : 'none',
                }}
              >{tab}</button>
            ))}
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:'12px', cursor:'pointer' }} onClick={()=>setVerified(!verified)}>
            <span style={{ fontSize:'10px', ...UB, color:C.muted, textTransform:'uppercase' as const, letterSpacing:'0.1em' }}>Show Verified Owners First</span>
            <div style={{ width:'52px', height:'26px', borderRadius:'100px', backgroundColor:verified?C.mint:'rgba(107,122,118,0.25)', position:'relative', transition:'background 0.25s' }}>
              <div style={{ position:'absolute', top:'3px', left:verified?'29px':'3px', width:'20px', height:'20px', borderRadius:'50%', backgroundColor:C.ink, transition:'left 0.25s' }} />
            </div>
          </div>
        </div>

        {/* ══ NEW LISTINGS + GRID TOGGLE ════════════════════════ */}
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'32px' }}>
          <div style={{ display:'flex', gap:'10px' }}>
            {['New Listings','Instant Book Only'].map(btn=>(
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

        {/* ══ FEATURES FILTER ═══════════════════════════════════ */}
        <div style={{ backgroundColor:'white', borderRadius:'20px', padding:'20px 24px', marginBottom:'32px', border:'1px solid rgba(107,122,118,0.1)', boxShadow:'0 2px 8px rgba(0,0,0,0.04)' }}>
          <p style={{ fontSize:'9px', ...UB, color:C.muted, textTransform:'uppercase' as const, letterSpacing:'0.14em', marginBottom:'12px' }}>FILTER BY FEATURES</p>
          <div style={{ display:'flex', gap:'8px', flexWrap:'wrap' as const }}>
            <button onClick={()=>setActiveFeature('All Features')}
              style={{ padding:'7px 16px', borderRadius:'100px', fontSize:'10px', ...UB, border:`1px solid`, cursor:'pointer', transition:'all 0.15s',
                backgroundColor: activeFeature==='All Features'?C.mint:'transparent',
                color:           activeFeature==='All Features'?C.ink:C.muted,
                borderColor:     activeFeature==='All Features'?C.mint:'rgba(107,122,118,0.2)',
              }}>All Features</button>
            {features.map(f=>(
              <button key={f} onClick={()=>setActiveFeature(f)}
                style={{ padding:'7px 16px', borderRadius:'100px', fontSize:'10px', ...UB, border:`1px solid`, cursor:'pointer', transition:'all 0.15s',
                  backgroundColor: activeFeature===f?C.mint:'transparent',
                  color:           activeFeature===f?C.ink:C.muted,
                  borderColor:     activeFeature===f?C.mint:'rgba(107,122,118,0.2)',
                }}
                onMouseEnter={e=>{if(activeFeature!==f){e.currentTarget.style.borderColor=C.mint;e.currentTarget.style.color=C.ink}}}
                onMouseLeave={e=>{if(activeFeature!==f){e.currentTarget.style.borderColor='rgba(107,122,118,0.2)';e.currentTarget.style.color=C.muted}}}
              >{f}</button>
            ))}
          </div>
        </div>

        {/* ══ LISTINGS GRID ═════════════════════════════════════ */}
        <section style={{ marginBottom:'48px' }}>
          <p style={{ fontSize:'13px', color:C.muted, ...CB, marginBottom:'20px' }}>Showing {listings.length} of {catData.count} results</p>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'20px' }}>
            {listings.map((item,i)=><ListingCard key={i} {...item} />)}
          </div>
        </section>

        {/* ══ PAGINATION ════════════════════════════════════════ */}
        <div style={{ display:'flex', justifyContent:'center', alignItems:'center', gap:'10px', marginBottom:'64px' }}>
          <button onClick={()=>setPage(p=>Math.max(1,p-1))} disabled={page<=1} style={{ width:'44px', height:'44px', borderRadius:'12px', backgroundColor:'white', border:'1px solid rgba(107,122,118,0.12)', cursor:page<=1?'not-allowed':'pointer', opacity:page<=1?0.4:1, display:'flex', alignItems:'center', justifyContent:'center', color:C.muted }}><ChevronLeft size={18} /></button>
          {Array.from({length:totalPages},(_,i)=>i+1).map(p=>(
            <button key={p} onClick={()=>setPage(p)}
              style={{ width:'44px', height:'44px', borderRadius:'12px', cursor:'pointer', fontSize:'15px', ...UB, border:'1px solid', transition:'all 0.2s',
                backgroundColor: page===p?C.mint:'white', color:page===p?C.ink:C.muted, borderColor:page===p?C.mint:'rgba(107,122,118,0.12)',
              }}
            >{p}</button>
          ))}          <button style={{ width:'44px', height:'44px', borderRadius:'12px', backgroundColor:'white', border:'1px solid rgba(107,122,118,0.12)', cursor:'pointer', fontSize:'15px', ...UB, color:C.muted }}>6</button>
          <button onClick={()=>setPage(p=>Math.min(totalPages,p+1))} disabled={page>=totalPages} style={{ width:'44px', height:'44px', borderRadius:'12px', backgroundColor:'white', border:'1px solid rgba(107,122,118,0.12)', cursor:page>=totalPages?'not-allowed':'pointer', opacity:page>=totalPages?0.4:1, display:'flex', alignItems:'center', justifyContent:'center', color:C.muted }}><ChevronRight size={18} /></button>
        </div>

        {/* ══ EXPLORE OTHER CATEGORIES + BACK ══════════════════════════ */}
        <CategoryFooterNav
          relatedTitle="Explore Other Vehicle Types"
          related={ALL_CATS.filter(c=>c.slug!==catSlug).map(cat=>({ label:cat.label, href:`/${locale}/motors/rental/${cat.slug}` }))}
          backHref={`/${locale}/motors/rental`}
          backLabel="Back to All Vehicles"
          inkColor={C.ink}
          mintDkColor={C.mint}
        />
      </main>
    </div>
  )
}
