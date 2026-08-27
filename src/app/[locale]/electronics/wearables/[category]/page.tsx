'use client'

import { useState, useEffect } from 'react'
import React from 'react'
import { Heart, Search, ChevronDown, ChevronLeft, ChevronRight, SlidersHorizontal, MapPin } from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useListings } from '@/hooks/useListings'
import WhatsAppButton from '@/components/ui/WhatsAppButton'

const C = { mint:'#22d4a8', mintDk:'#0f9b8e', ink:'#161d1b', surface:'#f4fbf8', cream:'#f5ede0', muted:'#6b7a76' }
const UB: React.CSSProperties = { fontFamily:'Inter,sans-serif', fontWeight:900, letterSpacing:'-0.05em' }
const CB: React.CSSProperties = { fontFamily:"'Hanken Grotesk',sans-serif", fontWeight:900, letterSpacing:'-0.03em' }

const CATS: Record<string,{ label:string; hero:string; desc:string; count:string; models:string[]; priceRanges:string[] }> = {
  'all-wearables': { label:'All Wearables', hero:'https://images.pexels.com/photos/393047/pexels-photo-393047.jpeg?auto=compress&w=1600', desc:'Browse the complete SouKni wearables collection.', count:'2,640',
    models:['Apple Watch Ultra 2','Galaxy Watch 6','Fitbit Charge 6','Garmin Fenix 7','Huawei Watch GT4'], priceRanges:['Any Price','0 – 800 MAD','800 – 2,000 MAD','2,000 – 5,000 MAD','5,000+ MAD'] },
  'smart-watches': { label:'Smart Watches', hero:'https://images.pexels.com/photos/393047/pexels-photo-393047.jpeg?auto=compress&w=1600', desc:'Full-featured smartwatches for fitness, calls, and apps.', count:'1,040',
    models:['Apple Watch Ultra 2','Apple Watch Series 9','Galaxy Watch 6 Classic','Pixel Watch 2','Huawei Watch GT4'], priceRanges:['Any Price','0 – 1,500 MAD','1,500 – 3,500 MAD','3,500 – 7,000 MAD','7,000+ MAD'] },
  'fitness-bands': { label:'Fitness Bands', hero:'https://images.pexels.com/photos/4162449/pexels-photo-4162449.jpeg?auto=compress&w=1600', desc:'Lightweight fitness trackers for step counts, sleep and heart rate.', count:'480',
    models:['Fitbit Charge 6','Xiaomi Smart Band 8','Honor Band 7','Amazfit Band 7'], priceRanges:['Any Price','0 – 400 MAD','400 – 800 MAD','800 – 1,500 MAD','1,500+ MAD'] },
  'apple-watch': { label:'Apple Watch', hero:'https://images.pexels.com/photos/393047/pexels-photo-393047.jpeg?auto=compress&w=1600', desc:'The full Apple Watch lineup — Ultra, Series and SE.', count:'620',
    models:['Apple Watch Ultra 2','Apple Watch Series 9','Apple Watch SE (2023)','Apple Watch Series 8'], priceRanges:['Any Price','0 – 2,000 MAD','2,000 – 4,000 MAD','4,000 – 7,000 MAD','7,000+ MAD'] },
  'samsung': { label:'Samsung', hero:'https://images.pexels.com/photos/4162449/pexels-photo-4162449.jpeg?auto=compress&w=1600', desc:'Galaxy Watch and Galaxy Fit series wearables.', count:'380',
    models:['Galaxy Watch 6 Classic','Galaxy Watch 6','Galaxy Watch FE','Galaxy Fit 3'], priceRanges:['Any Price','0 – 1,000 MAD','1,000 – 2,500 MAD','2,500 – 4,500 MAD','4,500+ MAD'] },
  'garmin': { label:'Garmin', hero:'https://images.pexels.com/photos/393047/pexels-photo-393047.jpeg?auto=compress&w=1600', desc:'Rugged GPS sports watches for serious athletes.', count:'220',
    models:['Fenix 7','Forerunner 965','Epix Pro','Instinct 2','Venu 3'], priceRanges:['Any Price','0 – 2,000 MAD','2,000 – 5,000 MAD','5,000 – 9,000 MAD','9,000+ MAD'] },
  'huawei': { label:'Huawei', hero:'https://images.pexels.com/photos/4162449/pexels-photo-4162449.jpeg?auto=compress&w=1600', desc:'Huawei Watch GT and Band series with long battery life.', count:'260',
    models:['Watch GT4','Watch Ultimate','Band 8','Watch Fit 3'], priceRanges:['Any Price','0 – 800 MAD','800 – 2,000 MAD','2,000 – 4,000 MAD','4,000+ MAD'] },
}

const ALL_CATS = [
  { label:'All Wearables', slug:'all-wearables' }, { label:'Smart Watches', slug:'smart-watches' }, { label:'Fitness Bands', slug:'fitness-bands' },
  { label:'Apple Watch', slug:'apple-watch' }, { label:'Samsung', slug:'samsung' }, { label:'Garmin', slug:'garmin' }, { label:'Huawei', slug:'huawei' },
]

const IMGS = [
  'https://images.pexels.com/photos/393047/pexels-photo-393047.jpeg?auto=compress&w=400',
  'https://images.pexels.com/photos/4162449/pexels-photo-4162449.jpeg?auto=compress&w=400',
  'https://images.pexels.com/photos/393047/pexels-photo-393047.jpeg?auto=compress&w=400',
  'https://images.pexels.com/photos/4162449/pexels-photo-4162449.jpeg?auto=compress&w=400',
]

type BadgeT = 'certified'|'diamond'|'featured'|'new'
function Badge({ type }: { type: BadgeT }) {
  const map: Record<BadgeT,{bg:string;color:string;label:string}> = {
    certified:{ bg:C.mint, color:C.ink, label:'SouKni Certified' }, diamond:{ bg:C.ink, color:C.mint, label:'◆ DIAMOND' },
    featured:{ bg:'#fbbf24', color:C.ink, label:'Featured' }, new:{ bg:C.mintDk, color:'white', label:'New Arrival' },
  }
  const s = map[type]
  return <span style={{ backgroundColor:s.bg, color:s.color, fontSize:'8px', ...CB, padding:'4px 10px', borderRadius:'6px', textTransform:'uppercase' as const, letterSpacing:'0.08em', display:'inline-block', boxShadow:'0 2px 6px rgba(0,0,0,0.15)', whiteSpace:'nowrap' as const }}>{s.label}</span>
}

function ListingCard({ brand, title, price, location, condition, img, badge, phone }: any) {
  const [saved, setSaved] = useState(false)
  const [hov, setHov] = useState(false)
  return (
    <article onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{ backgroundColor:'white', borderRadius:'24px', border:`1px solid ${hov?C.mint:'rgba(107,122,118,0.1)'}`, overflow:'hidden', boxShadow:hov?`0 20px 40px ${C.mint}18`:'0 2px 8px rgba(0,0,0,0.04)', transition:'all 0.3s', cursor:'pointer', display:'flex', flexDirection:'column' as const }}>
      <div style={{ position:'relative', aspectRatio:'1/1', overflow:'hidden', backgroundColor:C.cream }}>
        <img src={img} alt={title} style={{ width:'100%', height:'100%', objectFit:'cover', transition:'transform 0.6s', transform:hov?'scale(1.08)':'scale(1)' }} />
        <div style={{ position:'absolute', top:'10px', left:'10px', zIndex:10 }}><Badge type={badge} /></div>
        <button onClick={e=>{e.stopPropagation();setSaved(!saved)}} style={{ position:'absolute', top:'8px', right:'8px', zIndex:10, width:'32px', height:'32px', borderRadius:'50%', backgroundColor:'rgba(255,255,255,0.85)', border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}>
          <Heart size={14} fill={saved?'#ef4444':'none'} color={saved?'#ef4444':C.muted} />
        </button>
        {condition && <div style={{ position:'absolute', bottom:'10px', left:'10px', zIndex:10, backgroundColor:'rgba(255,255,255,0.92)', padding:'3px 8px', borderRadius:'6px', fontSize:'9px', ...CB, color:C.mintDk, textTransform:'uppercase' as const }}>{condition}</div>}
      </div>
      <div style={{ padding:'16px 18px', flex:1, display:'flex', flexDirection:'column' as const }}>
        <p style={{ fontSize:'9px', ...CB, color:C.mint, textTransform:'uppercase' as const, letterSpacing:'0.1em', marginBottom:'2px' }}>{brand}</p>
        <h4 style={{ fontSize:'14px', ...CB, color:hov?C.mint:C.ink, marginBottom:'4px', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' as const }}>{title}</h4>
        <p style={{ fontSize:'18px', ...CB, color:C.mint, marginBottom:'6px' }}>{price.toLocaleString()} MAD</p>
        {location && <p style={{ fontSize:'10px', color:C.muted, ...CB, display:'flex', alignItems:'center', gap:'3px', marginBottom:'12px' }}><MapPin size={10}/>{location}</p>}
        <div style={{ marginTop:'auto', display:'flex', gap:'8px' }}>
          <button style={{ flex:1, border:`2px solid ${C.ink}`, color:C.ink, backgroundColor:'transparent', padding:'9px', borderRadius:'12px', fontSize:'10px', ...CB, textTransform:'uppercase' as const, cursor:'pointer' }}
            onMouseEnter={e=>{e.currentTarget.style.backgroundColor=C.ink;e.currentTarget.style.color='white'}} onMouseLeave={e=>{e.currentTarget.style.backgroundColor='transparent';e.currentTarget.style.color=C.ink}}>Message</button>
          <WhatsAppButton phone={phone} title={title}
            style={{ flex:1, padding:'9px', borderRadius:'12px', fontSize:'10px', ...CB, textTransform:'uppercase' as const }}>💬 WhatsApp</WhatsAppButton>
        </div>
      </div>
    </article>
  )
}

function makeListings(cat: string, count: number) {
  const cd = CATS[cat] || CATS['all-wearables']
  const brands = ['Apple','Samsung','Garmin','Huawei','Fitbit','Xiaomi','Google','Amazfit']
  const badges: BadgeT[] = ['certified','diamond','featured','new','certified','diamond']
  const locs = ['Rabat, Agdal','Rabat, Souissi','Casablanca','Rabat, Hay Riad','Rabat, Centre']
  const conds = ['Like New','Excellent','Good','New',undefined,undefined]
  return Array.from({length:count},(_,i)=>({
    brand: brands[i%brands.length], title: cd.models[i%cd.models.length], price: 350 + ((i*1973)%9000),
    location: locs[i%locs.length], condition: conds[i%conds.length], img: IMGS[i%IMGS.length], badge: badges[i%badges.length],
  }))
}

export default function WearablesCategoryPage() {
  const params = useParams()
  const locale = (params?.locale as string) || 'en'
  const catSlug = (params?.category as string) || 'all-wearables'
  const catData = CATS[catSlug] || CATS['all-wearables']

  const [activeSeller, setActiveSeller] = useState('All Sellers')
  const [diamond, setDiamond] = useState(true)
  const [gridView, setGridView] = useState(true)
  const [page, setPage] = useState(1)
  const [keyword, setKeyword] = useState('')
  const [city, setCity] = useState('Rabat')
  const [price, setPrice] = useState('Any Price')
  const [sortBy, setSortBy] = useState('Most Recent')
  const [activeBrand, setActiveBrand] = useState('All Brands')
  const [cityOpen, setCityOpen] = useState(false)
  const [priceOpen, setPriceOpen] = useState(false)


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
      brand:     row.brand || '',
      title:     row.title,
      price:     (row.price || 0) / 100,
      location:  row.city || '',
      condition: row.condition || 'Used',
      img:       (row.images && row.images[0]) || IMGS[0],
      badge:     (row.badge && VALID_BADGES.includes(row.badge) ? row.badge : 'certified') as BadgeT,
      phone:     row.profiles?.phone,
    }
  }

  const hasRealData = dbListings.length > 0
  const listings = hasRealData ? dbListings.map(mapDbRowToCard) : makeListings(catSlug, 24)
  const cities = ['Rabat','Casablanca','Marrakech','Fès','Tanger','Agadir','Meknès']
  const brandsList = ['Apple','Samsung','Garmin','Huawei','Fitbit','Xiaomi','Google']
  const brandTiles = [
    { name:'Apple', image:'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&w=600', count:'780' },
    { name:'Samsung', image:'https://images.pexels.com/photos/1476321/pexels-photo-1476321.jpeg?auto=compress&w=600', count:'560' },
    { name:'Garmin', image:'https://images.pexels.com/photos/1007410/pexels-photo-1007410.jpeg?auto=compress&w=600', count:'420' },
    { name:'Huawei', image:'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&w=600', count:'350' },
    { name:'Fitbit', image:'https://images.pexels.com/photos/1476321/pexels-photo-1476321.jpeg?auto=compress&w=600', count:'310' },
    { name:'Xiaomi', image:'https://images.pexels.com/photos/1007410/pexels-photo-1007410.jpeg?auto=compress&w=600', count:'290' },
    { name:'Google', image:'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&w=600', count:'240' },
    { name:'Amazfit', image:'https://images.pexels.com/photos/1476321/pexels-photo-1476321.jpeg?auto=compress&w=600', count:'180' },
  ]

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
                style={{ width:'100%', padding:'12px 20px', background:'none', border:'none', cursor:'pointer', textAlign:'left' as const, fontSize:'14px', ...UB, color:opt===value?C.mint:C.ink, display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                {opt}{opt===value&&<span style={{color:C.mint}}>✓</span>}</button>
            ))}
          </div>
        )}
      </div>
    )
  }

  return (
    <div style={{ ...UB, backgroundColor:C.surface, color:C.ink, minHeight:'100vh' }}>
      <section style={{ position:'relative', height:'360px', display:'flex', alignItems:'center', justifyContent:'center', overflow:'hidden' }}>
        <img src={catData.hero} alt={catData.label} style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover' }} />
        <div style={{ position:'absolute', inset:0, backgroundColor:'rgba(22,29,27,0.52)' }} />
        <div style={{ position:'relative', zIndex:10, textAlign:'center' as const, maxWidth:'860px', padding:'0 24px', width:'100%' }}>
          <p style={{ fontSize:'11px', ...UB, color:C.mint, textTransform:'uppercase' as const, letterSpacing:'0.2em', marginBottom:'12px' }}>ELECTRONICS › WEARABLES</p>
          <h1 style={{ fontSize:'clamp(32px,5vw,52px)', ...UB, color:'white', marginBottom:'16px', lineHeight:1.05, textShadow:'0 4px 20px rgba(0,0,0,0.4)' }}>{catData.label} in Rabat</h1>
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

      <div style={{ maxWidth:'1280px', margin:'-36px auto 0', padding:'0 24px', position:'relative', zIndex:30 }}>
        <div style={{ backgroundColor:'rgba(255,255,255,0.97)', backdropFilter:'blur(16px)', border:'1px solid rgba(107,122,118,0.12)', borderRadius:'100px', boxShadow:'0 12px 40px rgba(0,0,0,0.08)', display:'flex', alignItems:'stretch', height:'68px' }}>
          <DDrop label="CITY" value={city} options={cities} open={cityOpen} setOpen={setCityOpen} onChange={setCity} />
          <div style={{ width:'1px', backgroundColor:'rgba(107,122,118,0.12)', margin:'12px 0' }} />
          <div style={{ flex:1.8, padding:'0 22px', display:'flex', flexDirection:'column' as const, justifyContent:'center' }}>
            <span style={{ fontSize:'9px', ...UB, textTransform:'uppercase' as const, letterSpacing:'0.14em', color:C.muted, marginBottom:'3px' }}>KEYWORD</span>
            <div style={{ display:'flex', alignItems:'center', gap:'8px' }}>
              <Search size={13} color={C.muted} />
              <input type="text" value={keyword} onChange={e=>setKeyword(e.target.value)} placeholder={`e.g. ${catData.models[0]}...`}
                style={{ flex:1, background:'none', border:'none', outline:'none', fontSize:'14px', ...UB, color:C.ink, fontFamily:'Inter,sans-serif' }} />
              {keyword && <button onClick={()=>setKeyword('')} style={{ background:'none', border:'none', cursor:'pointer', color:C.muted, fontSize:'16px' }}>✕</button>}
            </div>
          </div>
          <div style={{ width:'1px', backgroundColor:'rgba(107,122,118,0.12)', margin:'12px 0' }} />
          <DDrop label="PRICE (MAD)" value={price} options={catData.priceRanges} open={priceOpen} setOpen={setPriceOpen} onChange={setPrice} />
          <div style={{ width:'1px', backgroundColor:'rgba(107,122,118,0.12)', margin:'12px 0' }} />
          <button style={{ display:'flex', alignItems:'center', gap:'10px', padding:'0 28px', background:'none', border:'none', cursor:'pointer', borderRadius:'0 100px 100px 0', flexShrink:0 }}>
            <SlidersHorizontal size={18} color={C.mint} /><span style={{ fontSize:'14px', ...UB, color:C.ink }}>Filters</span>
          </button>
        </div>
      </div>

      <main style={{ maxWidth:'1280px', margin:'0 auto', padding:'32px 24px 80px' }}>
        <nav style={{ display:'flex', alignItems:'center', gap:'6px', fontSize:'10px', ...UB, color:C.muted, textTransform:'uppercase' as const, letterSpacing:'0.12em', marginBottom:'12px' }}>
          {[{label:'Rabat',href:`/${locale}`},{label:'Electronics',href:`/${locale}/electronics`},{label:'Wearables',href:`/${locale}/electronics/wearables`},{label:catData.label,href:null}].map((c,i,arr)=>(
            <span key={c.label} style={{ display:'flex', alignItems:'center', gap:'6px' }}>
              {c.href ? <Link href={c.href} style={{ color:C.muted, textDecoration:'none' }}>{c.label}</Link> : <span style={{ color:C.ink }}>{c.label}</span>}
              {i<arr.length-1 && <span style={{ opacity:0.4 }}>›</span>}
            </span>
          ))}
        </nav>

        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', gap:'16px', marginBottom:'24px', flexWrap:'wrap' as const }}>
          <div>
            <h2 style={{ fontSize:'clamp(20px,2.5vw,28px)', ...UB, color:C.ink, marginBottom:'4px' }}>{catData.label} for Sale in Rabat</h2>
            <p style={{ fontSize:'14px', color:C.mint, ...CB }}>{catData.count} Ads</p>
          </div>
          <div style={{ display:'flex', gap:'10px', alignItems:'center' }}>
            <select value={sortBy} onChange={e=>setSortBy(e.target.value)} style={{ backgroundColor:'white', border:'1px solid rgba(107,122,118,0.18)', padding:'9px 16px', borderRadius:'12px', fontSize:'10px', ...UB, textTransform:'uppercase' as const, letterSpacing:'0.1em', cursor:'pointer', color:C.ink, outline:'none' }}>
              {['Most Recent','Price: Low to High','Price: High to Low','Most Popular'].map(s=><option key={s}>{s}</option>)}
            </select>
            <button style={{ backgroundColor:'white', border:'1px solid rgba(107,122,118,0.18)', padding:'9px 16px', borderRadius:'12px', fontSize:'10px', ...UB, textTransform:'uppercase' as const, letterSpacing:'0.1em', cursor:'pointer', color:C.ink }}>🔖 Save Search</button>
          </div>
        </div>

        <div style={{ display:'flex', gap:'10px', flexWrap:'wrap' as const, marginBottom:'20px' }}>
          {ALL_CATS.map(cat=>(
            <Link key={cat.slug} href={`/${locale}/electronics/wearables/${cat.slug}`}
              style={{ padding:'10px 22px', borderRadius:'100px', fontSize:'11px', ...UB, textTransform:'uppercase' as const, letterSpacing:'0.1em', cursor:'pointer', border:'1px solid', textDecoration:'none', display:'inline-block',
                backgroundColor: catSlug===cat.slug?C.mint:'white', color: catSlug===cat.slug?C.ink:C.muted, borderColor: catSlug===cat.slug?C.mint:'rgba(186,202,197,0.4)' }}>
              {cat.label}
            </Link>
          ))}
        </div>

        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap' as const, gap:'14px', marginBottom:'20px' }}>
          <div style={{ display:'flex', gap:'4px', padding:'5px', backgroundColor:'#e8efec', borderRadius:'100px' }}>
            {['All Sellers','SouKni Members','SouKni Pro'].map(tab=>(
              <button key={tab} onClick={()=>setActiveSeller(tab)}
                style={{ padding:'10px 24px', borderRadius:'100px', fontSize:'11px', ...UB, textTransform:'uppercase' as const, letterSpacing:'0.1em', cursor:'pointer', border:'none',
                  backgroundColor: activeSeller===tab?C.ink:'transparent', color: activeSeller===tab?'white':C.muted }}>{tab}</button>
            ))}
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:'12px', cursor:'pointer' }} onClick={()=>setDiamond(!diamond)}>
            <span style={{ fontSize:'10px', ...UB, color:C.muted, textTransform:'uppercase' as const, letterSpacing:'0.1em' }}>Show SouKni Diamond Certified First</span>
            <div style={{ width:'52px', height:'26px', borderRadius:'100px', backgroundColor:diamond?C.mint:'rgba(107,122,118,0.25)', position:'relative' }}>
              <div style={{ position:'absolute', top:'3px', left:diamond?'29px':'3px', width:'20px', height:'20px', borderRadius:'50%', backgroundColor:C.ink, transition:'left 0.25s' }} />
            </div>
          </div>
        </div>

        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'32px' }}>
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
            <button onClick={()=>setGridView(true)} style={{ width:'36px', height:'36px', borderRadius:'8px', border:'none', cursor:'pointer', fontSize:'17px', backgroundColor:gridView?C.ink:'transparent', color:gridView?'white':C.muted }}>⊞</button>
            <button onClick={()=>setGridView(false)} style={{ width:'36px', height:'36px', borderRadius:'8px', border:'none', cursor:'pointer', fontSize:'17px', backgroundColor:!gridView?C.ink:'transparent', color:!gridView?'white':C.muted }}>☰</button>
          </div>
        </div>

        <section style={{ marginBottom:32 }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:16 }}>
            <h2 style={{ ...UB, fontSize:16, color:C.ink, textTransform:'uppercase' as const, letterSpacing:'0.08em' }}>SHOP BY BRAND</h2>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:`repeat(${Math.min(brandTiles.length,7)},1fr)`, gap:12 }}>
            {brandTiles.map(brand=>(
              <Link key={brand.name} href={`/${locale}/electronics/wearables/${catSlug}/${brand.name.toLowerCase().replace(/\s+/g,'-').replace(/[^a-z0-9-]/g,'')}`} style={{ textDecoration:'none' }}>
                <div style={{ position:'relative', aspectRatio:'1/1', overflow:'hidden', borderRadius:20, border:`2px solid ${activeBrand===brand.name?C.mint:'transparent'}`, cursor:'pointer', transition:'all 0.2s' }}
                  onMouseEnter={e=>{(e.currentTarget as HTMLDivElement).style.borderColor=C.mint}}
                  onMouseLeave={e=>{(e.currentTarget as HTMLDivElement).style.borderColor=activeBrand===brand.name?C.mint:'transparent'}}>
                  <img src={brand.image} alt={brand.name} style={{ width:'100%', height:'100%', objectFit:'cover', transition:'transform 0.4s' }} />
                  <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top,rgba(0,0,0,0.75),rgba(0,0,0,0.1))' }} />
                  <div style={{ position:'absolute', bottom:10, left:0, right:0, textAlign:'center' as const }}>
                    <p style={{ ...UB, fontSize:11, color:'white', marginBottom:2 }}>{brand.name}</p>
                    <p style={{ fontSize:9, color:'rgba(255,255,255,0.8)', fontWeight:600 }}>{brand.count} ads</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section style={{ marginBottom:'48px' }}>
          <p style={{ fontSize:'13px', color:C.muted, ...CB, marginBottom:'20px' }}>Showing {listings.length} of {catData.count} results</p>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'20px' }}>
            {listings.map((item,i)=><ListingCard key={i} {...item} />)}
          </div>
        </section>

        <div style={{ display:'flex', justifyContent:'center', alignItems:'center', gap:'10px', marginBottom:'64px' }}>
          <button style={{ width:'44px', height:'44px', borderRadius:'12px', backgroundColor:'white', border:'1px solid rgba(107,122,118,0.12)', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', color:C.muted }}><ChevronLeft size={18} /></button>
          {[1,2,3,4,5].map(p=>(
            <button key={p} onClick={()=>setPage(p)} style={{ width:'44px', height:'44px', borderRadius:'12px', cursor:'pointer', fontSize:'15px', ...UB, border:'1px solid', backgroundColor:page===p?C.mint:'white', color:page===p?C.ink:C.muted, borderColor:page===p?C.mint:'rgba(107,122,118,0.12)' }}>{p}</button>
          ))}
          <span style={{ color:C.muted }}>…</span>
          <button style={{ width:'44px', height:'44px', borderRadius:'12px', backgroundColor:'white', border:'1px solid rgba(107,122,118,0.12)', cursor:'pointer', fontSize:'15px', ...UB, color:C.muted }}>10</button>
          <button style={{ width:'44px', height:'44px', borderRadius:'12px', backgroundColor:'white', border:'1px solid rgba(107,122,118,0.12)', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', color:C.muted }}><ChevronRight size={18} /></button>
        </div>

        <section style={{ marginBottom:'48px' }}>
          <h3 style={{ fontSize:'clamp(18px,2.5vw,24px)', ...UB, color:C.ink, textTransform:'uppercase' as const, marginBottom:'20px' }}>Explore Other Categories</h3>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'14px' }}>
            {ALL_CATS.filter(c=>c.slug!==catSlug).slice(0,8).map(c=>(
              <Link key={c.slug} href={`/${locale}/electronics/wearables/${c.slug}`}
                style={{ backgroundColor:'white', borderRadius:'20px', padding:'20px 16px', textAlign:'center' as const, border:'1px solid rgba(107,122,118,0.1)', textDecoration:'none', display:'block' }}>
                <p style={{ fontSize:'11px', ...UB, color:C.ink, textTransform:'uppercase' as const, letterSpacing:'0.08em' }}>{c.label}</p>
              </Link>
            ))}
          </div>
        </section>

        <div style={{ textAlign:'center' as const }}>
          <Link href={`/${locale}/electronics/wearables`} style={{ display:'inline-flex', alignItems:'center', gap:'8px', padding:'16px 40px', borderRadius:'100px', backgroundColor:C.ink, color:'white', textDecoration:'none', fontSize:'12px', ...UB, textTransform:'uppercase' as const, letterSpacing:'0.1em' }}>← Back to All Wearables</Link>
        </div>
      </main>
    </div>
  )
}
