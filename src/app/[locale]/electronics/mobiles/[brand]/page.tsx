'use client'

import { useState, useEffect, useMemo } from 'react'
import React from 'react'
import { Heart, Search, ChevronDown, ChevronLeft, ChevronRight, SlidersHorizontal, MapPin } from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useListings } from '@/hooks/useListings'
import WhatsAppButton from '@/components/ui/WhatsAppButton'
import MessageSellerButton from '@/components/ui/MessageSellerButton'
import Breadcrumb from '@/components/ui/Breadcrumb'
import CategoryFooterNav from '@/components/ui/CategoryFooterNav'
import { useFavorites } from '@/hooks/useFavorites'

const C = {
  mint:   '#22d4a8',
  mintDk: '#0f9b8e',
  ink:    '#161d1b',
  surface:'#f4fbf8',
  cream:  '#f5ede0',
  muted:  '#6b7a76',
}
const UB: React.CSSProperties = { fontFamily:'Inter,sans-serif',            fontWeight:900, letterSpacing:'-0.05em' }
const CB: React.CSSProperties = { fontFamily:"'Hanken Grotesk',sans-serif", fontWeight:900, letterSpacing:'-0.03em' }

const BRANDS: Record<string,{ label:string; hero:string; desc:string; count:string; models:string[]; priceRanges:string[] }> = {
  'all-mobiles': {
    label:'All Mobiles',
    hero:'https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg?auto=compress&w=1600',
    desc:'Browse the complete SouKni mobile phones collection.',
    count:'6,840',
    models:['iPhone 15 Pro','Galaxy S24 Ultra','Pixel 8 Pro','Xiaomi 14','Mate 60 Pro','OnePlus 12'],
    priceRanges:['Any Price','0 – 2,000 MAD','2,000 – 5,000 MAD','5,000 – 10,000 MAD','10,000 – 18,000 MAD','18,000+ MAD'],
  },
  'apple': {
    label:'Apple',
    hero:'https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg?auto=compress&w=1600',
    desc:'iPhones from the latest Pro Max models to reliable older generations.',
    count:'2,140',
    models:['iPhone 15 Pro Max','iPhone 15 Pro','iPhone 15','iPhone 14 Pro','iPhone 14','iPhone 13','iPhone SE'],
    priceRanges:['Any Price','0 – 3,000 MAD','3,000 – 7,000 MAD','7,000 – 12,000 MAD','12,000 – 18,000 MAD','18,000+ MAD'],
  },
  'samsung': {
    label:'Samsung',
    hero:'https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg?auto=compress&w=1600',
    desc:'Galaxy S, Note, Z Fold and A-series phones at every budget.',
    count:'1,680',
    models:['Galaxy S24 Ultra','Galaxy S24+','Galaxy Z Fold 5','Galaxy Z Flip 5','Galaxy A54','Galaxy Note 20'],
    priceRanges:['Any Price','0 – 2,000 MAD','2,000 – 5,000 MAD','5,000 – 9,000 MAD','9,000 – 16,000 MAD','16,000+ MAD'],
  },
  'google': {
    label:'Google',
    hero:'https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg?auto=compress&w=1600',
    desc:'Pixel phones known for pure Android and best-in-class cameras.',
    count:'320',
    models:['Pixel 8 Pro','Pixel 8','Pixel 7a','Pixel Fold','Pixel 7 Pro','Pixel 6a'],
    priceRanges:['Any Price','0 – 2,000 MAD','2,000 – 5,000 MAD','5,000 – 9,000 MAD','9,000+ MAD'],
  },
  'xiaomi': {
    label:'Xiaomi',
    hero:'https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg?auto=compress&w=1600',
    desc:'High-performance Xiaomi and Redmi phones with great value.',
    count:'980',
    models:['Xiaomi 14 Ultra','Xiaomi 14','Redmi Note 13 Pro','Xiaomi 13T','Poco F6','Redmi 13C'],
    priceRanges:['Any Price','0 – 1,500 MAD','1,500 – 3,500 MAD','3,500 – 6,000 MAD','6,000+ MAD'],
  },
  'huawei': {
    label:'Huawei',
    hero:'https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg?auto=compress&w=1600',
    desc:'Huawei Mate and P-series phones with advanced camera systems.',
    count:'540',
    models:['Mate 60 Pro','P60 Pro','Mate X5 Fold','Nova 12','P50 Pro','Mate 50'],
    priceRanges:['Any Price','0 – 2,000 MAD','2,000 – 5,000 MAD','5,000 – 10,000 MAD','10,000+ MAD'],
  },
  'oneplus': {
    label:'OnePlus',
    hero:'https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg?auto=compress&w=1600',
    desc:'OnePlus flagship killers with fast charging and clean software.',
    count:'240',
    models:['OnePlus 12','OnePlus 12R','OnePlus Open','OnePlus 11','OnePlus Nord 3'],
    priceRanges:['Any Price','0 – 2,000 MAD','2,000 – 5,000 MAD','5,000 – 9,000 MAD','9,000+ MAD'],
  },
}

const ALL_BRANDS = [
  { label:'All Mobiles', slug:'all-mobiles' },
  { label:'Apple',       slug:'apple'       },
  { label:'Samsung',     slug:'samsung'     },
  { label:'Google',      slug:'google'      },
  { label:'Xiaomi',      slug:'xiaomi'      },
  { label:'Huawei',      slug:'huawei'      },
  { label:'OnePlus',     slug:'oneplus'     },
]

const IMGS = [
  'https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg?auto=compress&w=400',
  'https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg?auto=compress&w=400',
  'https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg?auto=compress&w=400',
  'https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg?auto=compress&w=400',
]

type BadgeT = 'certified'|'diamond'|'featured'|'new'
function Badge({ type }: { type: BadgeT }) {
  const map: Record<BadgeT,{bg:string;color:string;label:string}> = {
    certified:{ bg:C.mint,   color:C.ink,  label:'SouKni Certified' },
    diamond:  { bg:C.ink,    color:C.mint, label:'◆ DIAMOND'        },
    featured: { bg:'#fbbf24',color:C.ink,  label:'Featured'         },
    new:      { bg:C.mintDk, color:'white', label:'New Arrival'     },
  }
  const s = map[type]
  return <span style={{ backgroundColor:s.bg, color:s.color, fontSize:'8px', ...CB, padding:'4px 10px', borderRadius:'6px', textTransform:'uppercase' as const, letterSpacing:'0.08em', display:'inline-block', boxShadow:'0 2px 6px rgba(0,0,0,0.15)', whiteSpace:'nowrap' as const }}>{s.label}</span>
}

function ListingCard({ id, brand, title, price, location, condition, img, badge, storage, phone, sellerId }: any) {
  const { isFavorited, toggleFavorite } = useFavorites()
  const saved = isFavorited(id)
  const [hov,   setHov  ] = useState(false)
  return (
    <article onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{ backgroundColor:'white', borderRadius:'24px', border:`1px solid ${hov?C.mint:'rgba(107,122,118,0.1)'}`, overflow:'hidden', boxShadow:hov?`0 20px 40px ${C.mint}18`:'0 2px 8px rgba(0,0,0,0.04)', transition:'all 0.3s', cursor:'pointer', display:'flex', flexDirection:'column' as const }}>
      <div style={{ position:'relative', aspectRatio:'1/1', overflow:'hidden', backgroundColor:C.cream }}>
        <img src={img} alt={title} style={{ width:'100%', height:'100%', objectFit:'cover', transition:'transform 0.6s', transform:hov?'scale(1.08)':'scale(1)' }} />
        <div style={{ position:'absolute', top:'10px', left:'10px', zIndex:10 }}><Badge type={badge} /></div>
        <button onClick={e=>{e.stopPropagation();toggleFavorite(id)}} style={{ position:'absolute', top:'8px', right:'8px', zIndex:10, width:'32px', height:'32px', borderRadius:'50%', backgroundColor:'rgba(255,255,255,0.85)', border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}>
          <Heart size={14} fill={saved?'#ef4444':'none'} color={saved?'#ef4444':C.muted} />
        </button>
        {condition && <div style={{ position:'absolute', bottom:'10px', left:'10px', zIndex:10, backgroundColor:'rgba(255,255,255,0.92)', padding:'3px 8px', borderRadius:'6px', fontSize:'9px', ...CB, color:C.mintDk, textTransform:'uppercase' as const }}>{condition}</div>}
      </div>
      <div style={{ padding:'16px 18px', flex:1, display:'flex', flexDirection:'column' as const }}>
        <p style={{ fontSize:'9px', ...CB, color:C.mint, textTransform:'uppercase' as const, letterSpacing:'0.1em', marginBottom:'2px' }}>{brand}</p>
        <h4 style={{ fontSize:'14px', ...CB, color:hov?C.mint:C.ink, marginBottom:'4px', transition:'color 0.2s', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' as const }}>{title}</h4>
        {storage && <p style={{ fontSize:'10px', ...CB, color:C.muted, marginBottom:'2px' }}>{storage}</p>}
        <p style={{ fontSize:'18px', ...CB, color:C.mint, marginBottom:'6px' }}>{price.toLocaleString()} MAD</p>
        {location && <p style={{ fontSize:'10px', color:C.muted, ...CB, display:'flex', alignItems:'center', gap:'3px', marginBottom:'12px' }}><MapPin size={10}/>{location}</p>}
        <div style={{ marginTop:'auto', display:'flex', gap:'8px' }}>
          <MessageSellerButton listingId={id} sellerId={sellerId} style={{ flex:1, border:`2px solid ${C.ink}`, color:C.ink, backgroundColor:'transparent', padding:'9px', borderRadius:'12px', fontSize:'10px', ...CB, textTransform:'uppercase' as const }}>Message</MessageSellerButton>
          <WhatsAppButton phone={phone} title={title}
            style={{ flex:1, padding:'9px', borderRadius:'12px', fontSize:'10px', ...CB, textTransform:'uppercase' as const }}>
            💬 WhatsApp
          </WhatsAppButton>
        </div>
      </div>
    </article>
  )
}

function makeListings(brand: string, count: number) {
  const bd = BRANDS[brand] || BRANDS['all-mobiles']
  const badges: BadgeT[] = ['certified','diamond','featured','new','certified','diamond']
  const locs  = ['Rabat, Agdal','Rabat, Souissi','Casablanca','Rabat, Hay Riad','Rabat, Centre']
  const conds = ['Like New','Excellent','Good','Very Good',undefined,undefined]
  const storages = ['64GB','128GB','256GB','512GB','1TB']
  return Array.from({length:count},(_,i)=>({
    brand:     bd.label,
    title:     bd.models[i%bd.models.length],
    price:     1200 + ((i*1973)%15000),
    location:  locs[i%locs.length],
    condition: conds[i%conds.length],
    storage:   storages[i%storages.length],
    img:       IMGS[i%IMGS.length],
    badge:     badges[i%badges.length],
  }))
}

export default function MobileBrandPage() {
  const params    = useParams()
  const locale    = (params?.locale as string) || 'en'
  const brandSlug = (params?.brand as string) || 'all-mobiles'
  const brandData = BRANDS[brandSlug] || BRANDS['all-mobiles']

  const [activeSeller, setActiveSeller] = useState('All Sellers')
  const [diamond,      setDiamond     ] = useState(true)
  const [gridView,     setGridView    ] = useState(true)
  const [page,         setPage        ] = useState(1)
  const [keyword,      setKeyword     ] = useState('')
  const [city,         setCity        ] = useState('Rabat')
  const [price,        setPrice       ] = useState('Any Price')
  const [sortBy,       setSortBy      ] = useState('Most Recent')
  const [activeModel,  setActiveModel ] = useState('All Models')
  const [cityOpen,     setCityOpen    ] = useState(false)
  const [priceOpen,    setPriceOpen   ] = useState(false)

  const { fetchListings } = useListings()
  const [dbListings, setDbListings] = useState<any[]>([])

  useEffect(() => {
    const t = setTimeout(() => {
      fetchListings({ category: 'electronics', sortBy: 'newest', limit: 24 }).then(rows => setDbListings(rows || []))
    }, 400)
    return () => clearTimeout(t)
  }, [])

  function mapDbRowToCard(row: any) {
    const VALID_BADGES = ['certified', 'diamond', 'featured', 'new']
    return {
      id:        row.id,
      brand:     row.brand || brandData.label,
      title:     row.title,
      price:     (row.price || 0) / 100,
      location:  row.city || '',
      condition: row.condition || 'Used',
      storage:   row.storage || '',
      img:       (row.images && row.images[0]) || IMGS[0],
      badge:     (row.badge && VALID_BADGES.includes(row.badge) ? row.badge : 'certified') as BadgeT,
      phone:     row.profiles?.phone,
      sellerId:  row.seller_id,
    }
  }

  const hasRealData = dbListings.length > 0

  function priceInRange(itemPrice: number, rangeLabel: string) {
    if (!rangeLabel || rangeLabel.startsWith('Any')) return true
    const nums = rangeLabel.replace(/,/g, '').match(/\d+/g)?.map(Number) || []
    if (rangeLabel.includes('+')) return itemPrice >= nums[0]
    if (nums.length === 2) return itemPrice >= nums[0] && itemPrice <= nums[1]
    return true
  }

  const PAGE_SIZE = 12

  const filteredListings = useMemo(() => {
    const allListings = hasRealData ? dbListings.map(mapDbRowToCard) : makeListings(brandSlug, 24)
    let items = allListings.filter((item: any) =>
      (keyword.trim() === '' ||
        item.title.toLowerCase().includes(keyword.toLowerCase()) ||
        item.brand.toLowerCase().includes(keyword.toLowerCase())) &&
      (!city || item.location.toLowerCase().includes(city.toLowerCase())) &&
      priceInRange(item.price, price) &&
      (activeModel === 'All Models' || item.title === activeModel)
    )
    if (sortBy === 'Price: Low to High') items = [...items].sort((a: any, b: any) => a.price - b.price)
    if (sortBy === 'Price: High to Low') items = [...items].sort((a: any, b: any) => b.price - a.price)
    return items
  }, [hasRealData, dbListings, brandSlug, keyword, city, price, activeModel, sortBy])

  const totalPages = Math.max(1, Math.ceil(filteredListings.length / PAGE_SIZE))
  const clampedPage = Math.min(page, totalPages)
  const listings = filteredListings.slice((clampedPage - 1) * PAGE_SIZE, clampedPage * PAGE_SIZE)

  useEffect(() => { setPage(1) }, [keyword, city, price, sortBy])
  const cities   = ['Rabat','Casablanca','Marrakech','Fès','Tanger','Agadir','Meknès']

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

      {/* HERO */}
      <section style={{ position:'relative', height:'360px', display:'flex', alignItems:'center', justifyContent:'center', overflow:'hidden' }}>
        <img src={brandData.hero} alt={brandData.label} style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover' }} />
        <div style={{ position:'absolute', inset:0, backgroundColor:'rgba(22,29,27,0.52)' }} />
        <div style={{ position:'relative', zIndex:10, textAlign:'center' as const, maxWidth:'860px', padding:'0 24px', width:'100%' }}>
          <p style={{ fontSize:'11px', ...UB, color:C.mint, textTransform:'uppercase' as const, letterSpacing:'0.2em', marginBottom:'12px' }}>ELECTRONICS › MOBILES</p>
          <h1 style={{ fontSize:'clamp(32px,5vw,52px)', ...UB, color:'white', marginBottom:'16px', lineHeight:1.05, textShadow:'0 4px 20px rgba(0,0,0,0.4)' }}>{brandData.label} Phones in Rabat</h1>
          <p style={{ fontSize:'16px', color:'rgba(255,255,255,0.82)', marginBottom:'28px' }}>{brandData.desc}</p>
          <div style={{ maxWidth:'620px', margin:'0 auto', backgroundColor:'rgba(255,255,255,0.12)', backdropFilter:'blur(12px)', border:'1px solid rgba(255,255,255,0.22)', borderRadius:'100px', padding:'6px', display:'flex', alignItems:'center', gap:'8px' }}>
            <div style={{ flex:1, display:'flex', alignItems:'center', gap:'8px', padding:'0 16px' }}>
              <Search size={16} color="rgba(255,255,255,0.7)" />
              <input type="text" value={keyword} onChange={e=>setKeyword(e.target.value)} placeholder={`Search ${brandData.label} models...`}
                style={{ flex:1, background:'none', border:'none', outline:'none', color:'white', fontSize:'14px', ...UB, fontFamily:'Inter,sans-serif' }} />
            </div>
            <button style={{ backgroundColor:C.mint, color:C.ink, border:'none', padding:'12px 28px', borderRadius:'100px', fontSize:'11px', ...UB, textTransform:'uppercase' as const, letterSpacing:'0.1em', cursor:'pointer' }}>SEARCH</button>
          </div>
        </div>
      </section>

      {/* FILTER BAR */}
      <div style={{ maxWidth:'1280px', margin:'-36px auto 0', padding:'0 24px', position:'relative', zIndex:30 }}>
        <div style={{ backgroundColor:'rgba(255,255,255,0.97)', backdropFilter:'blur(16px)', border:'1px solid rgba(107,122,118,0.12)', borderRadius:'100px', boxShadow:'0 12px 40px rgba(0,0,0,0.08)', display:'flex', alignItems:'stretch', height:'68px' }}>
          <DDrop label="CITY" value={city} options={cities} open={cityOpen} setOpen={setCityOpen} onChange={setCity} />
          <div style={{ width:'1px', backgroundColor:'rgba(107,122,118,0.12)', margin:'12px 0' }} />
          <div style={{ flex:1.8, padding:'0 22px', display:'flex', flexDirection:'column' as const, justifyContent:'center' }}>
            <span style={{ fontSize:'9px', ...UB, textTransform:'uppercase' as const, letterSpacing:'0.14em', color:C.muted, marginBottom:'3px' }}>KEYWORD</span>
            <div style={{ display:'flex', alignItems:'center', gap:'8px' }}>
              <Search size={13} color={C.muted} />
              <input type="text" value={keyword} onChange={e=>setKeyword(e.target.value)} placeholder={`e.g. ${brandData.models[0]}...`}
                style={{ flex:1, background:'none', border:'none', outline:'none', fontSize:'14px', ...UB, color:C.ink, fontFamily:'Inter,sans-serif' }} />
              {keyword && <button onClick={()=>setKeyword('')} style={{ background:'none', border:'none', cursor:'pointer', color:C.muted, fontSize:'16px' }}>✕</button>}
            </div>
          </div>
          <div style={{ width:'1px', backgroundColor:'rgba(107,122,118,0.12)', margin:'12px 0' }} />
          <DDrop label="PRICE (MAD)" value={price} options={brandData.priceRanges} open={priceOpen} setOpen={setPriceOpen} onChange={setPrice} />
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

        {/* BREADCRUMB */}
        <Breadcrumb
          items={[
            { label:'Rabat', href:`/${locale}` },
            { label:'Electronics', href:`/${locale}/electronics` },
            { label:'Mobiles', href:`/${locale}/electronics/mobiles` },
            { label:brandData.label },
          ]}
          mutedColor={C.muted}
          inkColor={C.ink}
        />

        {/* TITLE + SORT */}
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', gap:'16px', marginBottom:'24px', flexWrap:'wrap' as const }}>
          <div>
            <h2 style={{ fontSize:'clamp(20px,2.5vw,28px)', ...UB, color:C.ink, marginBottom:'4px' }}>{brandData.label} Phones for Sale in Rabat</h2>
            <p style={{ fontSize:'14px', color:C.mint, ...CB }}>{brandData.count} Ads</p>
          </div>
          <div style={{ display:'flex', gap:'10px', alignItems:'center' }}>
            <select value={sortBy} onChange={e=>setSortBy(e.target.value)}
              style={{ backgroundColor:'white', border:'1px solid rgba(107,122,118,0.18)', padding:'9px 16px', borderRadius:'12px', fontSize:'10px', ...UB, textTransform:'uppercase' as const, letterSpacing:'0.1em', cursor:'pointer', color:C.ink, outline:'none' }}>
              {['Most Recent','Price: Low to High','Price: High to Low','Most Popular'].map(s=><option key={s}>{s}</option>)}
            </select>
            <button style={{ backgroundColor:'white', border:'1px solid rgba(107,122,118,0.18)', padding:'9px 16px', borderRadius:'12px', fontSize:'10px', ...UB, textTransform:'uppercase' as const, letterSpacing:'0.1em', cursor:'pointer', color:C.ink }}>🔖 Save Search</button>
          </div>
        </div>

        {/* BRAND PILLS */}
        <div style={{ display:'flex', gap:'10px', flexWrap:'wrap' as const, marginBottom:'20px' }}>
          {ALL_BRANDS.map(b=>(
            <Link key={b.slug} href={`/${locale}/electronics/mobiles/${b.slug}`}
              style={{ padding:'10px 22px', borderRadius:'100px', fontSize:'11px', ...UB, textTransform:'uppercase' as const, letterSpacing:'0.1em', cursor:'pointer', transition:'all 0.2s', border:'1px solid', textDecoration:'none', display:'inline-block',
                backgroundColor: brandSlug===b.slug ? C.mint  : 'white',
                color:           brandSlug===b.slug ? C.ink   : C.muted,
                borderColor:     brandSlug===b.slug ? C.mint  : 'rgba(186,202,197,0.4)',
              }}
              onMouseEnter={e=>{if(brandSlug!==b.slug){e.currentTarget.style.borderColor=C.mint;e.currentTarget.style.color=C.ink}}}
              onMouseLeave={e=>{if(brandSlug!==b.slug){e.currentTarget.style.borderColor='rgba(186,202,197,0.4)';e.currentTarget.style.color=C.muted}}}
            >{b.label}</Link>
          ))}
        </div>

        {/* SELLER TABS + DIAMOND */}
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

        {/* GRID TOGGLE */}
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'32px' }}>
          <div style={{ display:'flex', gap:'10px' }}>
            {['✨ New Arrivals','📉 Price Drop Alert'].map(btn=>(
              <button key={btn} style={{ display:'flex', alignItems:'center', gap:'6px', padding:'9px 18px', borderRadius:'100px', border:'1px solid rgba(107,122,118,0.2)', backgroundColor:'transparent', fontSize:'12px', ...UB, cursor:'pointer', color:C.muted, transition:'all 0.15s' }}
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

        {/* MODEL FILTER */}
        <div style={{ backgroundColor:'white', borderRadius:'20px', padding:'20px 24px', marginBottom:'32px', border:'1px solid rgba(107,122,118,0.1)' }}>
          <p style={{ fontSize:'9px', ...UB, color:C.muted, textTransform:'uppercase' as const, letterSpacing:'0.14em', marginBottom:'12px' }}>FILTER BY MODEL</p>
          <div style={{ display:'flex', gap:'8px', flexWrap:'wrap' as const }}>
            <button onClick={()=>setActiveModel('All Models')}
              style={{ padding:'7px 16px', borderRadius:'100px', fontSize:'10px', ...UB, border:`1px solid`, cursor:'pointer', transition:'all 0.15s', backgroundColor:activeModel==='All Models'?C.mint:'transparent', color:activeModel==='All Models'?C.ink:C.muted, borderColor:activeModel==='All Models'?C.mint:'rgba(107,122,118,0.2)' }}>All Models</button>
            {brandData.models.map(model=>(
              <button key={model} onClick={()=>setActiveModel(model)}
                style={{ padding:'7px 16px', borderRadius:'100px', fontSize:'10px', ...UB, border:`1px solid`, cursor:'pointer', transition:'all 0.15s', backgroundColor:activeModel===model?C.mint:'transparent', color:activeModel===model?C.ink:C.muted, borderColor:activeModel===model?C.mint:'rgba(107,122,118,0.2)' }}
                onMouseEnter={e=>{if(activeModel!==model){e.currentTarget.style.borderColor=C.mint;e.currentTarget.style.color=C.ink}}}
                onMouseLeave={e=>{if(activeModel!==model){e.currentTarget.style.borderColor='rgba(107,122,118,0.2)';e.currentTarget.style.color=C.muted}}}
              >{model}</button>
            ))}
          </div>
        </div>

        {/* LISTINGS */}
        <section style={{ marginBottom:'48px' }}>
          <p style={{ fontSize:'13px', color:C.muted, ...CB, marginBottom:'20px' }}>Showing {listings.length} of {filteredListings.length} results</p>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'20px' }}>
            {listings.map((item,i)=><ListingCard key={i} {...item} />)}
          </div>
        </section>

        {/* PAGINATION */}
        <div style={{ display:'flex', justifyContent:'center', alignItems:'center', gap:'10px', marginBottom:'64px' }}>
          <button onClick={()=>setPage(p=>Math.max(1,p-1))} disabled={page<=1}
            style={{ width:'44px', height:'44px', borderRadius:'12px', backgroundColor:'white', border:'1px solid rgba(107,122,118,0.12)', cursor:page<=1?'not-allowed':'pointer', display:'flex', alignItems:'center', justifyContent:'center', color:C.muted, opacity:page<=1?0.4:1 }}><ChevronLeft size={18} /></button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(p=>(
            <button key={p} onClick={()=>setPage(p)} style={{ width:'44px', height:'44px', borderRadius:'12px', cursor:'pointer', fontSize:'15px', ...UB, border:'1px solid', transition:'all 0.2s', backgroundColor:page===p?C.mint:'white', color:page===p?C.ink:C.muted, borderColor:page===p?C.mint:'rgba(107,122,118,0.12)' }}>{p}</button>
          ))}
          <button onClick={()=>setPage(p=>Math.min(totalPages,p+1))} disabled={page>=totalPages}
            style={{ width:'44px', height:'44px', borderRadius:'12px', backgroundColor:'white', border:'1px solid rgba(107,122,118,0.12)', cursor:page>=totalPages?'not-allowed':'pointer', display:'flex', alignItems:'center', justifyContent:'center', color:C.muted, opacity:page>=totalPages?0.4:1 }}><ChevronRight size={18} /></button>
        </div>

        <CategoryFooterNav
          relatedTitle="Explore Other Brands"
          related={ALL_BRANDS.filter(b=>b.slug!==brandSlug).map(b=>({ label:b.label, href:`/${locale}/electronics/mobiles/${b.slug}` }))}
          backHref={`/${locale}/electronics/mobiles`}
          backLabel="Back to All Mobiles"
          inkColor={C.ink}
          mintDkColor={C.mintDk}
        />

      </main>
    </div>
  )
}
