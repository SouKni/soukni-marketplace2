'use client'
import React, { useState, useEffect, useMemo} from 'react'
import Link from 'next/link'
import Breadcrumb from '@/components/ui/Breadcrumb'
import { useParams } from 'next/navigation'
import { useListings } from '@/hooks/useListings'
import WhatsAppButton from '@/components/ui/WhatsAppButton'
import { Heart, Search, MapPin, SlidersHorizontal, ChevronRight, ChevronLeft, Diamond, MessageCircle } from 'lucide-react'
import { useMarket } from '@/context/MarketContext'

const C = { mint:'#22d4a8', mintDk:'#0f9b8e', ink:'#161d1b', surface:'#f4fbf8', muted:'#6b7a76' }
const UB = { fontFamily:"'Inter',sans-serif", fontWeight:900, letterSpacing:'-0.05em' } as const
const HK = { fontFamily:"'Hanken Grotesk',sans-serif", fontWeight:900, letterSpacing:'-0.03em' } as const

type Badge = 'diamond' | 'certified' | 'pro' | null

const IMGS = {
  hub:'https://images.pexels.com/photos/1090638/pexels-photo-1090638.jpeg?auto=compress&w=600',
  bulb:'https://images.pexels.com/photos/1090638/pexels-photo-1090638.jpeg?auto=compress&w=600',
  cam:'https://images.pexels.com/photos/892522/pexels-photo-892522.jpeg?auto=compress&w=600',
  speaker:'https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&w=600',
  plug:'https://images.pexels.com/photos/4526407/pexels-photo-4526407.jpeg?auto=compress&w=600',
  thermo:'https://images.pexels.com/photos/1090638/pexels-photo-1090638.jpeg?auto=compress&w=600',
  lock:'https://images.pexels.com/photos/892522/pexels-photo-892522.jpeg?auto=compress&w=600',
}

const CATEGORIES: Record<string,{ label:string; hero:string; image:string; desc:string; count:string; brands:string[]; priceRanges:string[] }> = {
  'all-smart-home': { label:'All Smart Home', hero:IMGS.hub, image:IMGS.hub, desc:'Browse every smart home category from every brand.', count:'1,560', brands:['Amazon','Philips','Ring','Google Nest','Sonos','TP-Link','August'], priceRanges:['Any Price','0 – 500 MAD','500 – 1,500 MAD','1,500 – 3,000 MAD','3,000+ MAD'] },
  'smart-speakers': { label:'Smart Speakers', hero:IMGS.speaker, image:IMGS.speaker, desc:'Voice assistants and smart speakers.', count:'420', brands:['Amazon','Google Nest','Sonos'], priceRanges:['Any Price','0 – 500 MAD','500 – 1,200 MAD','1,200 – 2,500 MAD','2,500+ MAD'] },
  'smart-lighting': { label:'Smart Lighting', hero:IMGS.bulb, image:IMGS.bulb, desc:'Smart bulbs, light strips, and lighting kits.', count:'380', brands:['Philips'], priceRanges:['Any Price','0 – 400 MAD','400 – 1,000 MAD','1,000 – 2,000 MAD','2,000+ MAD'] },
  'security-cameras': { label:'Security Cameras', hero:IMGS.cam, image:IMGS.cam, desc:'Video doorbells and indoor/outdoor security cameras.', count:'340', brands:['Ring','TP-Link'], priceRanges:['Any Price','0 – 800 MAD','800 – 2,000 MAD','2,000 – 4,000 MAD','4,000+ MAD'] },
  'smart-locks': { label:'Smart Locks', hero:IMGS.lock, image:IMGS.lock, desc:'Keyless entry and smart door locks.', count:'180', brands:['August'], priceRanges:['Any Price','0 – 1,000 MAD','1,000 – 2,000 MAD','2,000+ MAD'] },
  'thermostats': { label:'Thermostats', hero:IMGS.thermo, image:IMGS.thermo, desc:'Smart climate control for your home.', count:'150', brands:['Google Nest'], priceRanges:['Any Price','0 – 1,000 MAD','1,000 – 2,500 MAD','2,500+ MAD'] },
  'smart-plugs': { label:'Smart Plugs', hero:IMGS.plug, image:IMGS.plug, desc:'Smart plugs, switches, and outlet controllers.', count:'290', brands:['TP-Link'], priceRanges:['Any Price','0 – 300 MAD','300 – 700 MAD','700+ MAD'] },
}

const ALL_CATS = [
  { label:'All Smart Home', slug:'all-smart-home' },
  { label:'Smart Speakers', slug:'smart-speakers' },
  { label:'Smart Lighting', slug:'smart-lighting' },
  { label:'Security Cameras', slug:'security-cameras' },
  { label:'Smart Locks', slug:'smart-locks' },
  { label:'Thermostats', slug:'thermostats' },
  { label:'Smart Plugs', slug:'smart-plugs' },
]

const BRAND_IMG: Record<string,string> = { Amazon:IMGS.hub, Philips:IMGS.bulb, Ring:IMGS.cam, 'Google Nest':IMGS.thermo, Sonos:IMGS.speaker, 'TP-Link':IMGS.plug, August:IMGS.lock }

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

function ListingCard({ item, locale }: { item:any; locale:string }) {
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
            <WhatsAppButton phone={item.phone} title={item.title} style={{ flex:1, padding:'8px 0', borderRadius:100, fontWeight:700, fontSize:11 }} />
          </div>
        </div>
      </article>
    </Link>
  )
}

function makeListings(catSlug: string, count: number) {
  const cat = CATEGORIES[catSlug] || CATEGORIES['all-smart-home']
  const titleMap: Record<string,string[]> = {
    'all-smart-home': ['Amazon Echo Show 10','Philips Hue Starter Kit','Ring Video Doorbell Pro 2','Google Nest Thermostat'],
    'smart-speakers': ['Amazon Echo Dot 5th Gen','Sonos One SL','Google Nest Mini'],
    'smart-lighting': ['Philips Hue Smart Bulb','Philips Hue Light Strip'],
    'security-cameras': ['Ring Stick Up Cam','TP-Link Tapo Camera','Ring Video Doorbell Pro'],
    'smart-locks': ['August Smart Lock Pro','August Wi-Fi Smart Lock'],
    'thermostats': ['Google Nest Learning Thermostat','Ecobee Smart Thermostat'],
    'smart-plugs': ['TP-Link Kasa Smart Plug 4-Pack','TP-Link Kasa Dimmer Switch'],
  }
  const titles = titleMap[catSlug] || titleMap['all-smart-home']
  const badges: Badge[] = ['diamond','certified','pro','diamond','certified']
  const locs = ['Rabat, Souissi','Rabat, Agdal','Casablanca','Rabat, Hay Riad','Marrakech']
  return Array.from({length:count},(_,i)=>({
    id: `${catSlug}-${i}`,
    title: titles[i%titles.length],
    price: 150 + ((i*731)%3500),
    location: locs[i%locs.length],
    time: `${i+1}h ago`,
    image: cat.image,
    badge: badges[i%badges.length],
    brand: cat.brands[i % cat.brands.length],
  }))
}

export default function SmartHomeCategoryPage() {
  const params = useParams()
  const locale = (params?.locale as string) || 'en'
  const catSlug = (params?.category as string) || 'all-smart-home'
  const cat = CATEGORIES[catSlug] || CATEGORIES['all-smart-home']

  const [activeSeller, setActiveSeller] = useState('All Sellers')
  const [diamondFirst, setDiamondFirst] = useState(true)
  const [activeBrand, setActiveBrand] = useState('')
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
      fetchListings({ category: 'electronics', sortBy: 'newest', limit: 16 }).then(rows => setDbListings(rows || []))
    }, 400)
    return () => clearTimeout(t)
  }, [])

  function timeAgo(iso: string) {
    const mins = Math.floor((Date.now() - new Date(iso).getTime()) / 60000)
    if (mins < 1) return 'Just now'
    if (mins < 60) return `${mins}m ago`
    const hrs = Math.floor(mins / 60)
    if (hrs < 24) return `${hrs}h ago`
    return `${Math.floor(hrs / 24)}d ago`
  }

  function mapDbRowToItem(row: any) {
    return {
      id: row.id,
      title: row.title,
      price: (row.price || 0) / 100,
      location: row.city || '',
      time: timeAgo(row.created_at),
      image: (row.images && row.images[0]) || cat.image,
      badge: (row.badge as Badge) || null,
      brand: row.brand || '',
      phone: row.profiles?.phone,
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
    const allListings = hasRealData ? dbListings.map(mapDbRowToItem) : makeListings(catSlug, 16)
    return allListings.filter((item: any) =>
      (keyword.trim() === '' ||
        item.title.toLowerCase().includes(keyword.toLowerCase()) ||
        (item.brand || '').toLowerCase().includes(keyword.toLowerCase())) &&
      (city === 'All Morocco' || !city || item.location.toLowerCase().includes(city.toLowerCase())) &&
      priceInRange(item.price, price) &&
      (!activeBrand || item.brand === activeBrand)
    )
  }, [hasRealData, dbListings, catSlug, keyword, city, price, activeBrand])

  const totalPages = Math.max(1, Math.ceil(filteredListings.length / PAGE_SIZE))
  const clampedPage = Math.min(page, totalPages)
  const listings = filteredListings.slice((clampedPage - 1) * PAGE_SIZE, clampedPage * PAGE_SIZE)

  useEffect(() => { setPage(1) }, [keyword, city, price])

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
          <p style={{ fontSize:11, ...UB, color:C.mint, textTransform:'uppercase' as const, letterSpacing:'0.15em', marginBottom:10 }}>ELECTRONICS › SMART HOME</p>
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
        <Breadcrumb
          items={[
            { label:'Home', href:`/${locale}` },
            { label:'Electronics', href:`/${locale}/electronics` },
            { label:'Smart Home', href:`/${locale}/electronics/smart-home` },
            { label:cat.label },
          ]}
          mutedColor={C.muted}
          inkColor={C.ink}
        />

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

        <div style={{ display:'flex', gap:8, margin:'20px 0', flexWrap:'wrap' as const }}>
          {ALL_CATS.map(c=>(
            <Link key={c.slug} href={`/${locale}/electronics/smart-home/${c.slug}`}
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

        <section style={{ marginBottom:32 }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:16 }}>
            <h2 style={{ ...UB, fontSize:16, color:C.ink, textTransform:'uppercase' as const, letterSpacing:'0.08em' }}>SHOP BY BRAND</h2>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:`repeat(${cat.brands.length},1fr)`, gap:12 }}>
            {cat.brands.map(brand=>(
              <button key={brand} onClick={()=>{setActiveBrand(activeBrand===brand?'':brand);setPage(1)}}
                style={{ position:'relative', borderRadius:20, overflow:'hidden', border:`2px solid ${activeBrand===brand?C.mint:'transparent'}`, cursor:'pointer', transition:'all 0.2s', background:'none', padding:0 }}>
                <div style={{ position:'relative', aspectRatio:'1/1', overflow:'hidden' }}>
                  <img src={BRAND_IMG[brand] || cat.image} alt={brand} style={{ width:'100%', height:'100%', objectFit:'cover', transition:'transform 0.4s', transform:activeBrand===brand?'scale(1.06)':'scale(1)' }} />
                  <div style={{ position:'absolute', inset:0, background:activeBrand===brand?'linear-gradient(to top,rgba(34,212,168,0.7),rgba(0,0,0,0.2))':'linear-gradient(to top,rgba(0,0,0,0.7),rgba(0,0,0,0.1))' }} />
                  <div style={{ position:'absolute', bottom:10, left:0, right:0, textAlign:'center' }}>
                    <p style={{ ...UB, fontSize:11, color:'white' }}>{brand}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </section>

        <section style={{ marginBottom:40 }}>
          <p style={{ fontSize:13, color:C.muted, marginBottom:16 }}>Showing {listings.length} of {filteredListings.length} results</p>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:20 }}>
            {listings.map(item=><ListingCard key={item.id} item={item} locale={locale} />)}
          </div>
        </section>

        <div style={{ display:'flex', justifyContent:'center', alignItems:'center', gap:8, marginBottom:48 }}>
          <button onClick={()=>setPage(p=>Math.max(1,p-1))} disabled={page<=1}
            style={{ width:36, height:36, borderRadius:10, border:'1px solid #e2e8f0', backgroundColor:'white', cursor:page<=1?'not-allowed':'pointer', display:'flex', alignItems:'center', justifyContent:'center', color:C.ink, opacity:page<=1?0.4:1 }}><ChevronLeft size={16} /></button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(p=>(
            <button key={p} onClick={()=>setPage(p)}
              style={{ width:36, height:36, borderRadius:10, border:page===p?'none':'1px solid #e2e8f0', backgroundColor:page===p?C.mint:'white', color:page===p?'white':C.ink, fontWeight:700, fontSize:13, cursor:'pointer' }}>
              {p}
            </button>
          ))}
          <button onClick={()=>setPage(p=>Math.min(totalPages,p+1))} disabled={page>=totalPages}
            style={{ width:36, height:36, borderRadius:10, border:'1px solid #e2e8f0', backgroundColor:'white', cursor:page>=totalPages?'not-allowed':'pointer', display:'flex', alignItems:'center', justifyContent:'center', color:C.ink, opacity:page>=totalPages?0.4:1 }}><ChevronRight size={16} /></button>
        </div>

        <section style={{ marginBottom:40 }}>
          <h3 style={{ ...UB, fontSize:16, color:C.ink, textTransform:'uppercase' as const, letterSpacing:'0.06em', marginBottom:16 }}>Explore Other Smart Home Categories</h3>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(6,1fr)', gap:12 }}>
            {ALL_CATS.filter(c=>c.slug!==catSlug).map(c=>(
              <Link key={c.slug} href={`/${locale}/electronics/smart-home/${c.slug}`}
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
          <Link href={`/${locale}/electronics/smart-home`}
            style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'14px 36px', borderRadius:100, backgroundColor:C.ink, color:'white', textDecoration:'none', fontSize:12, ...UB, textTransform:'uppercase' as const, letterSpacing:'0.1em' }}
          >Back to All Smart Home</Link>
        </div>
      </div>
    </div>
  )
}
