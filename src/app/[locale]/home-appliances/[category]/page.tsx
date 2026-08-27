'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { Heart, Search, MapPin, SlidersHorizontal, ChevronRight, ChevronLeft, Diamond, MessageCircle } from 'lucide-react'
import { useMarket } from '@/context/MarketContext'
import { useListings } from '@/hooks/useListings'
import WhatsAppButton from '@/components/ui/WhatsAppButton'

const C = { mint:'#22d4a8', mintDk:'#0f9b8e', ink:'#161d1b', surface:'#f4fbf8', muted:'#6b7a76' }
const UB = { fontFamily:"'Inter',sans-serif", fontWeight:900, letterSpacing:'-0.05em' } as const
const HK = { fontFamily:"'Hanken Grotesk',sans-serif", fontWeight:900, letterSpacing:'-0.03em' } as const

type Badge = 'diamond' | 'certified' | 'pro' | null

const CATEGORIES: Record<string, {
  label:string; hero:string; desc:string; count:string; image:string
  brands:string[]; priceRanges:string[]
}> = {
  'all-appliances': {
    label:'All Appliances',
    hero:'https://images.pexels.com/photos/6316068/pexels-photo-6316068.jpeg?auto=compress&w=1600',
    image:'https://images.pexels.com/photos/6316068/pexels-photo-6316068.jpeg?auto=compress&w=600',
    desc:'Browse every appliance category from every brand.',
    count:'4,910',
    brands:['Samsung','LG','Bosch','Breville','KitchenAid','Smeg','Dyson'],
    priceRanges:['Any Price','0 – 3,000 MAD','3,000 – 10,000 MAD','10,000 – 25,000 MAD','25,000+ MAD'],
  },
  'washing-machines': {
    label:'Washing Machines',
    hero:'https://images.pexels.com/photos/6865187/pexels-photo-6865187.jpeg?auto=compress&w=1600',
    image:'https://images.pexels.com/photos/6865187/pexels-photo-6865187.jpeg?auto=compress&w=600',
    desc:'Front-load, top-load, and smart washing machines.',
    count:'1,120',
    brands:['Samsung','LG','Bosch'],
    priceRanges:['Any Price','0 – 3,000 MAD','3,000 – 6,000 MAD','6,000 – 10,000 MAD','10,000+ MAD'],
  },
  'refrigerators': {
    label:'Refrigerators',
    hero:'https://images.pexels.com/photos/4700421/pexels-photo-4700421.jpeg?auto=compress&w=1600',
    image:'https://images.pexels.com/photos/4700421/pexels-photo-4700421.jpeg?auto=compress&w=600',
    desc:'Fridges, freezers, and smart family hubs.',
    count:'980',
    brands:['Samsung','LG','Bosch','Smeg'],
    priceRanges:['Any Price','0 – 5,000 MAD','5,000 – 12,000 MAD','12,000 – 25,000 MAD','25,000+ MAD'],
  },
  'kitchen-appliances': {
    label:'Kitchen Appliances',
    hero:'https://images.pexels.com/photos/324028/pexels-photo-324028.jpeg?auto=compress&w=1600',
    image:'https://images.pexels.com/photos/324028/pexels-photo-324028.jpeg?auto=compress&w=600',
    desc:'Mixers, ovens, air fryers, and small kitchen appliances.',
    count:'860',
    brands:['Breville','KitchenAid','Smeg'],
    priceRanges:['Any Price','0 – 1,500 MAD','1,500 – 4,000 MAD','4,000 – 8,000 MAD','8,000+ MAD'],
  },
  'air-conditioners': {
    label:'Air Conditioners',
    hero:'https://images.pexels.com/photos/4700422/pexels-photo-4700422.jpeg?auto=compress&w=1600',
    image:'https://images.pexels.com/photos/4700422/pexels-photo-4700422.jpeg?auto=compress&w=600',
    desc:'Split units and portable air conditioners.',
    count:'540',
    brands:['LG','Dyson'],
    priceRanges:['Any Price','0 – 3,000 MAD','3,000 – 6,000 MAD','6,000+ MAD'],
  },
  'vacuum-cleaners': {
    label:'Vacuum Cleaners',
    hero:'https://images.pexels.com/photos/4397899/pexels-photo-4397899.jpeg?auto=compress&w=1600',
    image:'https://images.pexels.com/photos/4397899/pexels-photo-4397899.jpeg?auto=compress&w=600',
    desc:'Cordless, robot, and traditional vacuum cleaners.',
    count:'610',
    brands:['Dyson'],
    priceRanges:['Any Price','0 – 2,000 MAD','2,000 – 5,000 MAD','5,000+ MAD'],
  },
  'coffee-machines': {
    label:'Coffee Machines',
    hero:'https://images.pexels.com/photos/4518651/pexels-photo-4518651.jpeg?auto=compress&w=1600',
    image:'https://images.pexels.com/photos/4518651/pexels-photo-4518651.jpeg?auto=compress&w=600',
    desc:'Espresso machines, pod machines, and coffee makers.',
    count:'340',
    brands:['Breville','Smeg'],
    priceRanges:['Any Price','0 – 1,000 MAD','1,000 – 3,000 MAD','3,000 – 6,000 MAD','6,000+ MAD'],
  },
}

const ALL_CATS = [
  { label:'All Appliances',     slug:'all-appliances'     },
  { label:'Washing Machines',   slug:'washing-machines'   },
  { label:'Refrigerators',      slug:'refrigerators'      },
  { label:'Kitchen Appliances', slug:'kitchen-appliances' },
  { label:'Air Conditioners',   slug:'air-conditioners'   },
  { label:'Vacuum Cleaners',    slug:'vacuum-cleaners'    },
  { label:'Coffee Machines',    slug:'coffee-machines'    },
]

function CertifiedBadge({ type }: { type: Badge }) {
  if (!type) return null
  if (type === 'diamond') return (
    <span style={{ position:'absolute', top:10, left:10, zIndex:2, background:'linear-gradient(135deg,#22d4a8,#0f9b8e)', color:'white', fontSize:'8px', ...UB, letterSpacing:'0.06em', padding:'3px 10px', borderRadius:100, display:'inline-flex', alignItems:'center', gap:3 }}>
      <Diamond size={8} /> SOUKNI CERTIFIED
    </span>
  )
  return (
    <span style={{ position:'absolute', top:10, left:10, zIndex:2, backgroundColor:'rgba(255,255,255,0.92)', color:C.mint, fontSize:'8px', ...UB, letterSpacing:'0.06em', padding:'3px 10px', borderRadius:100 }}>
      ✓ CERTIFIED
    </span>
  )
}

interface Listing { id:string; title:string; price:number; location:string; time:string; image:string; badge:Badge; brand:string; phone?:string|null }

function makeListings(catSlug: string, count: number): Listing[] {
  const cat = CATEGORIES[catSlug] || CATEGORIES['all-appliances']
  const titleMap: Record<string,string[]> = {
    'all-appliances':     ['EcoBubble Inverter Washer','Bespoke Family Hub Fridge','Neo QLED Smart TV','Barista Pro Espresso Machine','V15 Detect Vacuum'],
    'washing-machines':   ['EcoBubble 9kg Inverter Washer','AI DD 10kg Steam Washer','Series 8 HomeConnect Washer'],
    'refrigerators':      ['Bespoke Family Hub Fridge','InstaView Door-in-Door Fridge','Series 6 NoFrost Fridge','50s Style Refrigerator'],
    'kitchen-appliances': ['Barista Pro Espresso Machine','Artisan 4.8L Stand Mixer','Retro Series Toaster Set'],
    'air-conditioners':   ['DUAL Inverter Air Conditioner','Pure Cool Air Purifier'],
    'vacuum-cleaners':    ['V15 Detect Absolute Vacuum','Cordless Slim Vacuum'],
    'coffee-machines':    ['Barista Pro Espresso Machine','Retro Espresso Machine'],
  }
  const titles = titleMap[catSlug] || titleMap['all-appliances']
  const badges: Badge[] = ['diamond','certified','pro','diamond','certified']
  const locs   = ['Rabat, Souissi','Rabat, Agdal','Casablanca','Rabat, Hay Riad','Marrakech']
  return Array.from({length:count},(_,i)=>({
    id: `${catSlug}-${i}`,
    title: titles[i%titles.length],
    price: 800 + ((i*731)%24000),
    location: locs[i%locs.length],
    time: `${i+1}h ago`,
    image: cat.image,
    badge: badges[i%badges.length],
    brand: cat.brands[i % cat.brands.length],
  }))
}

function ListingCard({ item, locale }: { item:Listing; locale:string }) {
  const [saved, setSaved] = useState(false)
  const [hov, setHov] = useState(false)
  const { formatPrice } = useMarket()
  return (
    <Link href={`/${locale}/listing/${item.id}`} style={{ textDecoration:'none', display:'block' }}>
      <article onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
        style={{ backgroundColor:'white', borderRadius:24, overflow:'hidden', border:`1px solid ${hov?C.mint:'rgba(186,202,197,0.2)'}`, boxShadow:hov?'0 20px 48px rgba(0,0,0,0.12)':'0 2px 8px rgba(0,0,0,0.04)', transition:'all 0.3s', cursor:'pointer' }}>
        <div style={{ position:'relative', aspectRatio:'4/3', overflow:'hidden' }}>
          <img src={item.image} alt={item.title} style={{ width:'100%', height:'100%', objectFit:'cover', transition:'transform 0.5s', transform:hov?'scale(1.06)':'scale(1)' }} />
          <CertifiedBadge type={item.badge} />
          <button onClick={e=>{e.preventDefault();setSaved(!saved)}} style={{ position:'absolute', top:10, right:10, zIndex:2, width:30, height:30, borderRadius:'50%', backgroundColor:'rgba(255,255,255,0.15)', backdropFilter:'blur(8px)', border:'1px solid rgba(255,255,255,0.3)', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer' }}>
            <Heart size={13} color={saved?'#ef4444':'white'} fill={saved?'#ef4444':'none'} />
          </button>
        </div>
        <div style={{ padding:'16px 18px' }}>
          <p style={{ fontSize:9, ...UB, color:C.mint, textTransform:'uppercase' as const, letterSpacing:'0.08em', marginBottom:3 }}>{item.brand}</p>
          <p style={{ fontSize:10, color:C.muted, marginBottom:3, display:'flex', alignItems:'center', gap:3 }}><MapPin size={10} />{item.location} · {item.time}</p>
          <h4 style={{ ...HK, fontSize:14, color:C.ink, marginBottom:6, lineHeight:1.3, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{item.title}</h4>
          <p style={{ ...HK, fontSize:17, color:C.mint, marginBottom:10 }}>{formatPrice(item.price)}</p>
          <div style={{ display:'flex', gap:6 }}>
            <button onClick={e=>e.preventDefault()} style={{ flex:1, backgroundColor:'#eef5f2', color:'#3c4a46', border:'none', padding:'8px 0', borderRadius:100, fontWeight:700, fontSize:11, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', gap:4 }}>
              <MessageCircle size={11} /> Chat
            </button>
            <WhatsAppButton phone={item.phone} title={item.title} style={{ flex:1, padding:'8px 0', borderRadius:100, fontSize:11 }} />
          </div>
        </div>
      </article>
    </Link>
  )
}

export default function HomeAppliancesCategoryPage() {
  const params = useParams()
  const locale = (params?.locale as string) || 'en'
  const catSlug = (params?.category as string) || 'all-appliances'
  const cat = CATEGORIES[catSlug] || CATEGORIES['all-appliances']

  const [activeSeller, setActiveSeller] = useState('All Sellers')
  const [diamondFirst, setDiamondFirst] = useState(true)
  const [activeBrand, setActiveBrand] = useState('All Brands')
  const [page, setPage] = useState(1)
  const [keyword, setKeyword] = useState('')
  const [city, setCity] = useState('All Morocco')
  const [price, setPrice] = useState('Any Price')
  const [cityOpen, setCityOpen] = useState(false)
  const [priceOpen, setPriceOpen] = useState(false)

  const cities = ['All Morocco','Casablanca','Rabat','Marrakech','Fès','Tanger','Agadir']

  const { fetchListings } = useListings()
  const [dbListings, setDbListings] = useState<any[]>([])

  useEffect(() => {
    const t = setTimeout(() => {
      fetchListings({ category: 'home-appliances', sortBy: 'newest', limit: 16 }).then(rows => setDbListings(rows || []))
    }, 400)
    return () => clearTimeout(t)
  }, [])

  function mapDbRowToListing(row: any): Listing {
    const badge: Badge = row.badge === 'diamond' || row.badge === 'certified' || row.badge === 'pro' ? row.badge : 'certified'
    return {
      id: row.id,
      title: row.title,
      price: (row.price || 0) / 100,
      location: row.city || '',
      time: 'Recently',
      image: (row.images && row.images[0]) || cat.image,
      badge,
      brand: row.brand || '',
      phone: row.profiles?.phone,
    }
  }

  const hasRealData = dbListings.length > 0
  const listings = hasRealData ? dbListings.map(mapDbRowToListing) : makeListings(catSlug, 16)

  function DDrop({ label, value, options, open, setOpen, onChange }: any) {
    return (
      <div style={{ position:'relative', flex:1 }}>
        <button onClick={()=>{ setOpen(!open); setCityOpen(false); setPriceOpen(false) }}
          style={{ width:'100%', height:'100%', background:'none', border:'none', cursor:'pointer', padding:'0 20px', display:'flex', flexDirection:'column' as const, justifyContent:'center', textAlign:'left' as const }}>
          <span style={{ fontSize:9, ...UB, textTransform:'uppercase' as const, letterSpacing:'0.12em', color:C.muted, marginBottom:2 }}>{label}</span>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
            <span style={{ fontSize:13, fontWeight:700, color:C.ink }}>{value}</span>
            <ChevronRight size={13} color={C.mint} style={{ flexShrink:0, transform:open?'rotate(90deg)':'rotate(0)', transition:'transform 0.2s' }} />
          </div>
        </button>
        {open && (
          <div style={{ position:'absolute', top:'calc(100% + 8px)', left:0, minWidth:200, backgroundColor:'white', borderRadius:16, boxShadow:'0 20px 60px rgba(0,0,0,0.12)', border:'1px solid rgba(186,202,197,0.2)', zIndex:200, overflow:'hidden', padding:'6px 0' }}>
            {options.map((opt:string)=>(
              <button key={opt} onClick={()=>{ onChange(opt); setOpen(false) }}
                style={{ width:'100%', padding:'10px 18px', background:'none', border:'none', cursor:'pointer', textAlign:'left' as const, fontSize:13, fontWeight:600, color:opt===value?C.mint:C.ink }}>
                {opt}
              </button>
            ))}
          </div>
        )}
      </div>
    )
  }

  return (
    <div style={{ fontFamily:"'Inter',sans-serif", backgroundColor:C.surface, minHeight:'100vh' }}>

      <section style={{ position:'relative', height:340, overflow:'hidden', display:'flex', alignItems:'center', justifyContent:'center' }}>
        <img src={cat.hero} alt={cat.label} style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover' }} />
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top,rgba(15,23,42,0.88),rgba(15,23,42,0.32))' }} />
        <div style={{ position:'relative', zIndex:10, textAlign:'center', padding:'0 24px', maxWidth:760, width:'100%' }}>
          <p style={{ fontSize:11, ...UB, color:C.mint, textTransform:'uppercase' as const, letterSpacing:'0.15em', marginBottom:10 }}>THE VAULT › HOME APPLIANCES</p>
          <h1 style={{ ...UB, fontSize:'clamp(28px,5vw,48px)', color:'white', lineHeight:1.05, marginBottom:14, textTransform:'uppercase' as const }}>{cat.label} in Morocco</h1>
          <p style={{ fontSize:15, color:'rgba(255,255,255,0.82)' }}>{cat.desc}</p>
        </div>
      </section>

      <div style={{ maxWidth:1440, margin:'-26px auto 0', padding:'0 40px', position:'relative', zIndex:30 }}>
        <div style={{ backgroundColor:'rgba(255,255,255,0.92)', backdropFilter:'blur(20px)', borderRadius:100, padding:'8px', boxShadow:'0 8px 40px rgba(0,0,0,0.10)', border:'1px solid rgba(255,255,255,0.7)', display:'flex', alignItems:'stretch', height:64 }}>
          <DDrop label="City" value={city} options={cities} open={cityOpen} setOpen={setCityOpen} onChange={setCity} />
          <div style={{ width:1, backgroundColor:'rgba(186,202,197,0.25)', margin:'10px 0' }} />
          <div style={{ flex:1.6, padding:'0 20px', display:'flex', flexDirection:'column' as const, justifyContent:'center' }}>
            <span style={{ fontSize:9, ...UB, textTransform:'uppercase' as const, letterSpacing:'0.12em', color:C.muted, marginBottom:2 }}>Keyword</span>
            <div style={{ display:'flex', alignItems:'center', gap:8 }}>
              <Search size={13} color={C.muted} />
              <input value={keyword} onChange={e=>setKeyword(e.target.value)} placeholder={`Search ${cat.label}...`} style={{ flex:1, background:'none', border:'none', outline:'none', fontSize:13, fontWeight:600, color:C.ink, fontFamily:"'Inter',sans-serif" }} />
            </div>
          </div>
          <div style={{ width:1, backgroundColor:'rgba(186,202,197,0.25)', margin:'10px 0' }} />
          <DDrop label="Price (MAD)" value={price} options={cat.priceRanges} open={priceOpen} setOpen={setPriceOpen} onChange={setPrice} />
          <div style={{ width:1, backgroundColor:'rgba(186,202,197,0.25)', margin:'10px 0' }} />
          <button style={{ display:'flex', alignItems:'center', gap:8, padding:'0 24px', background:'none', border:'none', cursor:'pointer', flexShrink:0 }}>
            <SlidersHorizontal size={15} color={C.mint} />
            <span style={{ fontSize:13, fontWeight:700, color:C.ink }}>Filters</span>
          </button>
        </div>
      </div>

      <div style={{ maxWidth:1440, margin:'32px auto 0', padding:'0 40px 80px' }}>

        <nav style={{ display:'flex', alignItems:'center', gap:6, fontSize:11, fontWeight:700, color:C.muted, textTransform:'uppercase' as const, letterSpacing:'0.06em', marginBottom:16 }}>
          <Link href={`/${locale}`} style={{ color:C.muted, textDecoration:'none' }}>Home</Link><span>›</span>
          <Link href={`/${locale}/vault`} style={{ color:C.muted, textDecoration:'none' }}>The Vault</Link><span>›</span>
          <Link href={`/${locale}/home-appliances`} style={{ color:C.muted, textDecoration:'none' }}>Home Appliances</Link><span>›</span>
          <span style={{ color:C.ink }}>{cat.label}</span>
        </nav>

        <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', gap:16, flexWrap:'wrap' as const, marginBottom:4 }}>
          <div>
            <h2 style={{ ...UB, fontSize:22, color:C.ink, marginBottom:4 }}>{cat.label} for Sale</h2>
            <p style={{ fontSize:14, color:C.muted }}>{cat.count} Ads across Morocco</p>
          </div>
          <div style={{ display:'flex', gap:8 }}>
            <button style={{ padding:'8px 14px', borderRadius:12, border:'1px solid rgba(186,202,197,0.4)', backgroundColor:'#eef5f2', fontSize:12, fontWeight:700, cursor:'pointer', color:C.ink }}>Sort: Default</button>
            <button style={{ padding:'8px 14px', borderRadius:12, border:'1px solid rgba(186,202,197,0.4)', backgroundColor:'#eef5f2', fontSize:12, fontWeight:700, cursor:'pointer', color:C.ink }}>Save Search</button>
          </div>
        </div>

        {/* SUB-CATEGORY PILLS */}
        <div style={{ display:'flex', gap:8, margin:'20px 0', flexWrap:'wrap' as const }}>
          {ALL_CATS.map(c=>(
            <Link key={c.slug} href={`/${locale}/home-appliances/${c.slug}`}
              style={{ padding:'8px 20px', borderRadius:100, fontSize:12, fontWeight:700, cursor:'pointer', whiteSpace:'nowrap' as const, transition:'all 0.15s', textDecoration:'none', display:'inline-block',
                backgroundColor: catSlug===c.slug ? C.ink : '#e8efec',
                color:           catSlug===c.slug ? 'white' : '#3c4a46',
              }}>
              {c.label}
            </Link>
          ))}
        </div>

        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'12px 0', borderTop:'1px solid rgba(186,202,197,0.25)', borderBottom:'1px solid rgba(186,202,197,0.25)', marginBottom:20, flexWrap:'wrap' as const, gap:10 }}>
          <div style={{ display:'flex', gap:6 }}>
            {['All Sellers','SouKni Members','SouKni Pro'].map(tab=>(
              <button key={tab} onClick={()=>setActiveSeller(tab)}
                style={{ padding:'7px 18px', borderRadius:100, fontSize:12, fontWeight:700, cursor:'pointer', border:'none', backgroundColor:activeSeller===tab?'#dde4e1':'transparent', color:activeSeller===tab?C.ink:C.muted }}>
                {tab}
              </button>
            ))}
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:8, cursor:'pointer' }} onClick={()=>setDiamondFirst(!diamondFirst)}>
            <span style={{ fontSize:12, fontWeight:700, color:C.muted }}>Show SouKni Diamond Verified First</span>
            <div style={{ width:40, height:20, borderRadius:100, backgroundColor:diamondFirst?C.mint:'#bacac5', position:'relative', transition:'background 0.25s' }}>
              <div style={{ position:'absolute', top:2, left:diamondFirst?22:2, width:16, height:16, borderRadius:'50%', backgroundColor:'white', transition:'left 0.25s' }} />
            </div>
          </div>
        </div>

        {/* FILTER BY BRAND — plain pills, no photos */}
        <div style={{ backgroundColor:'white', borderRadius:20, padding:'18px 22px', marginBottom:28, border:'1px solid rgba(186,202,197,0.2)' }}>
          <p style={{ fontSize:9, ...UB, color:C.muted, textTransform:'uppercase' as const, letterSpacing:'0.12em', marginBottom:12 }}>FILTER BY BRAND</p>
          <div style={{ display:'flex', gap:8, flexWrap:'wrap' as const }}>
            <button onClick={()=>setActiveBrand('All Brands')}
              style={{ padding:'7px 16px', borderRadius:100, fontSize:11, fontWeight:700, border:'1px solid', cursor:'pointer', transition:'all 0.15s',
                backgroundColor: activeBrand==='All Brands'?C.mint:'transparent',
                color:           activeBrand==='All Brands'?'white':C.muted,
                borderColor:     activeBrand==='All Brands'?C.mint:'rgba(186,202,197,0.4)',
              }}>All Brands</button>
            {cat.brands.map(b=>(
              <button key={b} onClick={()=>setActiveBrand(b)}
                style={{ padding:'7px 16px', borderRadius:100, fontSize:11, fontWeight:700, border:'1px solid', cursor:'pointer', transition:'all 0.15s',
                  backgroundColor: activeBrand===b?C.mint:'transparent',
                  color:           activeBrand===b?'white':C.muted,
                  borderColor:     activeBrand===b?C.mint:'rgba(186,202,197,0.4)',
                }}>{b}</button>
            ))}
          </div>
        </div>

        <section style={{ marginBottom:40 }}>
          <p style={{ fontSize:13, color:C.muted, marginBottom:16 }}>Showing {listings.length} of {cat.count} results</p>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:20 }}>
            {listings.map(item=><ListingCard key={item.id} item={item} locale={locale} />)}
          </div>
        </section>

        <div style={{ display:'flex', justifyContent:'center', alignItems:'center', gap:8, marginBottom:48 }}>
          <button style={{ width:36, height:36, borderRadius:10, border:'1px solid #e2e8f0', backgroundColor:'white', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', color:C.ink }}><ChevronLeft size={16} /></button>
          {[1,2,3].map(p=>(
            <button key={p} onClick={()=>setPage(p)}
              style={{ width:36, height:36, borderRadius:10, border:page===p?'none':'1px solid #e2e8f0', backgroundColor:page===p?C.mint:'white', color:page===p?'white':C.ink, fontWeight:700, fontSize:13, cursor:'pointer' }}>
              {p}
            </button>
          ))}
          <button style={{ width:36, height:36, borderRadius:10, border:'1px solid #e2e8f0', backgroundColor:'white', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', color:C.ink }}><ChevronRight size={16} /></button>
        </div>

        <section style={{ marginBottom:40 }}>
          <h3 style={{ ...UB, fontSize:16, color:C.ink, textTransform:'uppercase' as const, letterSpacing:'0.06em', marginBottom:16 }}>Explore Other Appliance Types</h3>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(6,1fr)', gap:12 }}>
            {ALL_CATS.filter(c=>c.slug!==catSlug).map(c=>(
              <Link key={c.slug} href={`/${locale}/home-appliances/${c.slug}`}
                style={{ backgroundColor:'white', borderRadius:16, padding:'18px 12px', textAlign:'center' as const, border:'1px solid rgba(186,202,197,0.25)', textDecoration:'none', transition:'all 0.2s', display:'block' }}
                onMouseEnter={e=>{e.currentTarget.style.borderColor=C.mint}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor='rgba(186,202,197,0.25)'}}
              >
                <p style={{ fontSize:12, ...UB, color:C.ink }}>{c.label}</p>
              </Link>
            ))}
          </div>
        </section>

        <div style={{ textAlign:'center' as const }}>
          <Link href={`/${locale}/home-appliances`}
            style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'14px 36px', borderRadius:100, backgroundColor:C.ink, color:'white', textDecoration:'none', fontSize:12, ...UB, textTransform:'uppercase' as const, letterSpacing:'0.1em' }}
          >Back to All Home Appliances</Link>
        </div>
      </div>
    </div>
  )
}
