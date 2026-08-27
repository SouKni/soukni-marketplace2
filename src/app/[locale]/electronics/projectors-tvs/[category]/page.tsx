'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { Heart, Search, MapPin, SlidersHorizontal, ChevronRight, Diamond, MessageCircle, ChevronLeft } from 'lucide-react'
import { useMarket } from '@/context/MarketContext'
import { useListings } from '@/hooks/useListings'
import WhatsAppButton from '@/components/ui/WhatsAppButton'

const C = { mint:'#22d4a8', mintDk:'#0f9b8e', ink:'#161d1b', surface:'#f4fbf8', muted:'#6b7a76' }
const UB = { fontFamily:"'Inter',sans-serif", fontWeight:900, letterSpacing:'-0.05em' } as const
const HK = { fontFamily:"'Hanken Grotesk',sans-serif", fontWeight:900, letterSpacing:'-0.03em' } as const

const IMGS = {
  lg:      'https://images.pexels.com/photos/1571442/pexels-photo-1571442.jpeg?auto=compress&w=600',
  samsung: 'https://images.pexels.com/photos/6782570/pexels-photo-6782570.jpeg?auto=compress&w=600',
  sony:    'https://images.pexels.com/photos/4009402/pexels-photo-4009402.jpeg?auto=compress&w=600',
  philips: 'https://images.pexels.com/photos/1571442/pexels-photo-1571442.jpeg?auto=compress&w=600',
  tcl:     'https://images.pexels.com/photos/6782570/pexels-photo-6782570.jpeg?auto=compress&w=600',
  hisense: 'https://images.pexels.com/photos/4009402/pexels-photo-4009402.jpeg?auto=compress&w=600',
  xiaomi:  'https://images.pexels.com/photos/1571442/pexels-photo-1571442.jpeg?auto=compress&w=600',
}

const CATS: Record<string,{ label:string; hero:string; desc:string; count:string; models:string[]; priceRanges:string[] }> = {
  'all-tvs-projectors': { label:'All TVs & Projectors', hero:IMGS.lg, desc:'Browse the complete SouKni TVs and projectors collection.', count:'3,215',
    models:['OLED evo G4 77"','Neo QLED 8K 75"','Bravia XR A95L 65"','OLED+908 65"','EH-TW9400 4K Projector'], priceRanges:['Any Price','0 – 5,000 MAD','5,000 – 15,000 MAD','15,000 – 35,000 MAD','35,000+ MAD'] },
  'oled-tvs': { label:'OLED TVs', hero:IMGS.lg, desc:'OLED TVs with perfect blacks and stunning contrast.', count:'840',
    models:['LG OLED evo G4 77"','LG OLED C4 55"','Sony Bravia XR A95L 65"','Philips OLED+908 65"','LG OLED evo M4 97"'], priceRanges:['Any Price','0 – 10,000 MAD','10,000 – 25,000 MAD','25,000 – 50,000 MAD','50,000+ MAD'] },
  'qled-tvs': { label:'QLED TVs', hero:IMGS.samsung, desc:'QLED TVs with vivid colors and high brightness.', count:'920',
    models:['Samsung Neo QLED 8K QN900D','Samsung The Frame 85"','Samsung Neo QLED 4K QN95D','TCL QD-Mini LED C845'], priceRanges:['Any Price','0 – 6,000 MAD','6,000 – 15,000 MAD','15,000 – 30,000 MAD','30,000+ MAD'] },
  '8k-tvs': { label:'8K TVs', hero:IMGS.samsung, desc:'Ultra high-resolution 8K TVs for the future of viewing.', count:'180',
    models:['Samsung Neo QLED 8K QN900D','Samsung 98" QLED 4K QN900A','Sony Bravia XR Z9K 8K Mini LED'], priceRanges:['Any Price','0 – 30,000 MAD','30,000 – 60,000 MAD','60,000 – 100,000 MAD','100,000+ MAD'] },
  '4k-projectors': { label:'4K Projectors', hero:IMGS.hisense, desc:'Home cinema projectors with true 4K resolution.', count:'320',
    models:['Epson EH-TW9400','BenQ W2700 4K HDR','Sony VPL-VW290ES 4K SXRD','Hisense PX3-PRO Laser TV'], priceRanges:['Any Price','0 – 10,000 MAD','10,000 – 20,000 MAD','20,000 – 40,000 MAD','40,000+ MAD'] },
  'home-cinema': { label:'Home Cinema', hero:IMGS.sony, desc:'Complete home cinema setups and laser TVs.', count:'260',
    models:['Hisense PX3-PRO TriChroma Laser TV','Sony VPL-VW290ES','Epson EH-TW9400','BenQ W2700'], priceRanges:['Any Price','0 – 15,000 MAD','15,000 – 30,000 MAD','30,000 – 50,000 MAD','50,000+ MAD'] },
  'smart-tvs': { label:'Smart TVs', hero:IMGS.tcl, desc:'Smart TVs with built-in streaming and voice control.', count:'1,480',
    models:['TCL 55" C735 Google TV','Xiaomi TV Max 100"','LG NanoCell 55" NANO75','Samsung Crystal UHD 75"'], priceRanges:['Any Price','0 – 4,000 MAD','4,000 – 10,000 MAD','10,000 – 20,000 MAD','20,000+ MAD'] },
}

const ALL_CATS = [
  { label:'All TVs & Projectors', slug:'all-tvs-projectors' }, { label:'OLED TVs', slug:'oled-tvs' }, { label:'QLED TVs', slug:'qled-tvs' },
  { label:'8K TVs', slug:'8k-tvs' }, { label:'4K Projectors', slug:'4k-projectors' }, { label:'Home Cinema', slug:'home-cinema' }, { label:'Smart TVs', slug:'smart-tvs' },
]

const brands = [
  { name:'LG',      count:'1,240', image:IMGS.lg },
  { name:'Samsung', count:'2,180', image:IMGS.samsung },
  { name:'Sony',    count:'890',   image:IMGS.sony },
  { name:'Philips', count:'540',   image:IMGS.philips },
  { name:'TCL',     count:'720',   image:IMGS.tcl },
  { name:'Hisense', count:'480',   image:IMGS.hisense },
  { name:'Xiaomi',  count:'320',   image:IMGS.xiaomi },
]

type Badge = 'diamond' | 'certified' | 'pro' | null
interface Listing { id:string; title:string; price:number; location:string; time:string; image:string; badge:Badge; phone?:string|null }

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

function ListingCard({ item, locale }: { item:Listing; locale:string }) {
  const [saved, setSaved] = useState(false)
  const [hov, setHov] = useState(false)
  const { formatPrice } = useMarket()
  return (
    <Link href={`/${locale}/listing/${item.id}`} style={{ textDecoration:'none', display:'block' }}>
      <article onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
        style={{ backgroundColor:'white', borderRadius:28, overflow:'hidden', border:`1px solid ${hov?C.mint:'rgba(186,202,197,0.2)'}`, boxShadow:hov?'0 20px 48px rgba(0,0,0,0.12)':'0 2px 8px rgba(0,0,0,0.04)', transition:'all 0.3s', cursor:'pointer' }}>
        <div style={{ position:'relative', aspectRatio:'4/3', overflow:'hidden' }}>
          <img src={item.image} alt={item.title} style={{ width:'100%', height:'100%', objectFit:'cover', transition:'transform 0.5s', transform:hov?'scale(1.06)':'scale(1)' }} />
          <CertifiedBadge type={item.badge} />
          <button onClick={e=>{e.preventDefault();setSaved(!saved)}} style={{ position:'absolute', top:10, right:10, zIndex:2, width:30, height:30, borderRadius:'50%', backgroundColor:'rgba(255,255,255,0.15)', backdropFilter:'blur(8px)', border:'1px solid rgba(255,255,255,0.3)', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer' }}>
            <Heart size={13} color={saved?'#ef4444':'white'} fill={saved?'#ef4444':'none'} />
          </button>
        </div>
        <div style={{ padding:'16px 18px' }}>
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

function makeListings(cat: string, count: number): Listing[] {
  const cd = CATS[cat] || CATS['all-tvs-projectors']
  const imgs = [IMGS.lg, IMGS.samsung, IMGS.sony, IMGS.philips, IMGS.tcl, IMGS.hisense]
  const badges: Badge[] = ['diamond','certified','pro','diamond','certified']
  const locs = ['Casablanca','Rabat','Marrakech','Tangier','Fès','Agadir']
  const times = ['Just now','1h ago','2h ago','3h ago','5h ago','1d ago']
  return Array.from({length:count},(_,i)=>({
    id: `${cat}-${i}`, title: cd.models[i%cd.models.length], price: 3800 + ((i*2731)%42000),
    location: locs[i%locs.length], time: times[i%times.length], image: imgs[i%imgs.length], badge: badges[i%badges.length],
  }))
}

export default function ProjectorsTVsCategoryPage() {
  const params = useParams()
  const locale = (params?.locale as string) || 'en'
  const catSlug = (params?.category as string) || 'all-tvs-projectors'
  const catData = CATS[catSlug] || CATS['all-tvs-projectors']

  const [activeSeller, setActiveSeller] = useState('All Sellers')
  const [diamondFirst, setDiamondFirst] = useState(true)
  const [activeBrand, setActiveBrand] = useState('LG')
  const [page, setPage] = useState(1)
  const [viewGrid, setViewGrid] = useState(true)
  const [keyword, setKeyword] = useState('')

  const { fetchListings } = useListings()
  const [dbListings, setDbListings] = useState<any[]>([])

  useEffect(() => {
    const t = setTimeout(() => {
      fetchListings({ category: 'electronics', sortBy: 'newest', limit: 24 }).then(rows => setDbListings(rows || []))
    }, 400)
    return () => clearTimeout(t)
  }, [])

  function timeAgoLocal(iso: string) {
    const mins = Math.floor((Date.now() - new Date(iso).getTime()) / 60000)
    if (mins < 1) return 'Just now'
    if (mins < 60) return `${mins}m ago`
    const hrs = Math.floor(mins / 60)
    if (hrs < 24) return `${hrs}h ago`
    return `${Math.floor(hrs / 24)}d ago`
  }

  const realMapped: Listing[] = dbListings.map(row => ({
    id: row.id,
    title: row.title,
    price: (row.price || 0) / 100,
    location: row.city || '',
    time: timeAgoLocal(row.created_at),
    image: (row.images && row.images[0]) || IMGS.lg,
    badge: (row.badge as Badge) || null,
    phone: row.profiles?.phone,
  }))
  const hasRealData = realMapped.length > 0
  const listings = hasRealData ? realMapped : makeListings(catSlug, 24)
  const sellerTabs = ['All Sellers','SouKni Members','SouKni Pro']

  return (
    <div style={{ fontFamily:"'Inter',sans-serif", backgroundColor:C.surface, minHeight:'100vh' }}>

      {/* CINEMATIC HERO */}
      <section style={{ position:'relative', height:480, overflow:'hidden', display:'flex', alignItems:'center', justifyContent:'center' }}>
        <img src={catData.hero} alt={catData.label} style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover' }} />
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top,rgba(15,23,42,0.88),rgba(15,23,42,0.32))' }} />
        <div style={{ position:'relative', zIndex:10, textAlign:'center', padding:'0 24px', maxWidth:760, width:'100%' }}>
          <p style={{ fontSize:11, ...UB, color:C.mint, textTransform:'uppercase' as const, letterSpacing:'0.2em', marginBottom:14 }}>ELECTRONICS › TVS & PROJECTORS</p>
          <h1 style={{ ...UB, fontSize:'clamp(32px,5vw,52px)', color:'white', lineHeight:1.05, marginBottom:16, textTransform:'uppercase' as const }}>{catData.label}</h1>
          <p style={{ fontSize:15, color:'rgba(255,255,255,0.82)', marginBottom:28 }}>{catData.desc}</p>
          <div style={{ display:'flex', alignItems:'stretch', backgroundColor:'rgba(255,255,255,0.12)', backdropFilter:'blur(24px)', border:'1px solid rgba(255,255,255,0.25)', borderRadius:100, overflow:'hidden', maxWidth:680, margin:'0 auto', boxShadow:'0 8px 32px rgba(0,0,0,0.2)' }}>
            <div style={{ display:'flex', flexDirection:'column' as const, padding:'14px 22px', flex:1, gap:2 }}>
              <span style={{ fontSize:9, fontWeight:800, color:'rgba(255,255,255,0.55)', textTransform:'uppercase' as const, letterSpacing:'0.12em' }}>Keyword</span>
              <input value={keyword} onChange={e=>setKeyword(e.target.value)} placeholder={`Search ${catData.label}...`} style={{ backgroundColor:'transparent', border:'none', outline:'none', fontSize:14, fontWeight:600, color:'white', fontFamily:"'Inter',sans-serif", padding:0, width:'100%' }} />
            </div>
            <button style={{ backgroundColor:C.mint, color:'white', border:'none', padding:'0 32px', fontWeight:800, fontSize:14, cursor:'pointer', flexShrink:0 }}>Search</button>
          </div>
        </div>
      </section>

      <div style={{ maxWidth:1440, margin:'32px auto 0', padding:'0 40px 80px' }}>

        {/* BREADCRUMB */}
        <nav style={{ display:'flex', alignItems:'center', gap:6, fontSize:11, fontWeight:700, color:C.muted, textTransform:'uppercase' as const, letterSpacing:'0.06em', marginBottom:8 }}>
          <Link href={`/${locale}`} style={{ color:C.muted, textDecoration:'none' }}>Home</Link><span>›</span>
          <Link href={`/${locale}/electronics`} style={{ color:C.muted, textDecoration:'none' }}>Electronics</Link><span>›</span>
          <Link href={`/${locale}/electronics/projectors-tvs`} style={{ color:C.muted, textDecoration:'none' }}>TVs & Projectors</Link><span>›</span>
          <span style={{ color:C.ink }}>{catData.label}</span>
        </nav>

        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:4 }}>
          <h2 style={{ ...UB, fontSize:22, color:C.ink }}>{catData.label} in Rabat</h2>
          <div style={{ display:'flex', gap:8 }}>
            <button style={{ display:'flex', alignItems:'center', gap:6, padding:'8px 14px', borderRadius:12, border:'1px solid rgba(186,202,197,0.4)', backgroundColor:'#eef5f2', fontSize:12, fontWeight:700, cursor:'pointer', color:C.ink }}>Sort: Default</button>
            <button style={{ display:'flex', alignItems:'center', gap:6, padding:'8px 14px', borderRadius:12, border:'1px solid rgba(186,202,197,0.4)', backgroundColor:'#eef5f2', fontSize:12, fontWeight:700, cursor:'pointer', color:C.ink }}>Save Search</button>
          </div>
        </div>
        <p style={{ fontSize:14, color:C.muted, marginBottom:16 }}>{catData.count} Ads in Rabat District</p>

        {/* BRAND HUB */}
        <section style={{ marginBottom:32 }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:16 }}>
            <h2 style={{ ...UB, fontSize:16, color:C.ink, textTransform:'uppercase' as const, letterSpacing:'0.08em' }}>SHOP BY BRAND</h2>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(7,1fr)', gap:12 }}>
            {brands.map(brand=>(
              <Link key={brand.name} href={`/${locale}/electronics/projectors-tvs/${catSlug}/${brand.name.toLowerCase().replace(/\s+/g,'-').replace(/[^a-z0-9-]/g,'')}`} style={{ textDecoration:'none' }}>
                <div style={{ position:'relative', aspectRatio:'1/1', overflow:'hidden', borderRadius:20, border:`2px solid ${activeBrand===brand.name?C.mint:'transparent'}`, cursor:'pointer', transition:'all 0.2s' }}
                  onMouseEnter={e=>{(e.currentTarget as HTMLDivElement).style.borderColor=C.mint}}
                  onMouseLeave={e=>{(e.currentTarget as HTMLDivElement).style.borderColor=activeBrand===brand.name?C.mint:'transparent'}}>
                  <img src={brand.image} alt={brand.name} style={{ width:'100%', height:'100%', objectFit:'cover', transition:'transform 0.4s' }} />
                  <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top,rgba(0,0,0,0.75),rgba(0,0,0,0.1))' }} />
                  <div style={{ position:'absolute', bottom:10, left:0, right:0, textAlign:'center' as const }}>
                    <p style={{ ...UB, fontSize:13, color:'white', marginBottom:2 }}>{brand.name}</p>
                    <p style={{ fontSize:9, color:'rgba(255,255,255,0.8)', fontWeight:600 }}>{brand.count} ads</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* PILLS */}
        <div style={{ display:'flex', gap:8, marginBottom:16, overflowX:'auto', paddingBottom:4 }}>
          {ALL_CATS.map(cat=>(
            <Link key={cat.slug} href={`/${locale}/electronics/projectors-tvs/${cat.slug}`}
              style={{ padding:'8px 20px', borderRadius:100, fontSize:12, fontWeight:700, cursor:'pointer', whiteSpace:'nowrap' as const, transition:'all 0.15s', textDecoration:'none', display:'inline-block',
                backgroundColor: catSlug===cat.slug ? C.ink : '#e8efec', color: catSlug===cat.slug ? 'white' : '#3c4a46' }}>
              {cat.label}
            </Link>
          ))}
        </div>

        {/* UTILITY BAR */}
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'12px 0', borderTop:'1px solid rgba(186,202,197,0.25)', borderBottom:'1px solid rgba(186,202,197,0.25)', marginBottom:16, flexWrap:'wrap' as const, gap:10 }}>
          <div style={{ display:'flex', gap:6 }}>
            {sellerTabs.map(tab=>(
              <button key={tab} onClick={()=>setActiveSeller(tab)}
                style={{ padding:'7px 18px', borderRadius:100, fontSize:12, fontWeight:700, cursor:'pointer', border:'none', backgroundColor:activeSeller===tab?'#dde4e1':'transparent', color:activeSeller===tab?C.ink:C.muted }}>
                {tab}
              </button>
            ))}
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:16 }}>
            <div style={{ display:'flex', alignItems:'center', gap:8, cursor:'pointer' }} onClick={()=>setDiamondFirst(!diamondFirst)}>
              <span style={{ fontSize:12, fontWeight:700, color:C.muted }}>Show SouKni Diamond Verified First</span>
              <div style={{ width:40, height:20, borderRadius:100, backgroundColor:diamondFirst?C.mint:'#bacac5', position:'relative', transition:'background 0.25s' }}>
                <div style={{ position:'absolute', top:2, left:diamondFirst?22:2, width:16, height:16, borderRadius:'50%', backgroundColor:'white', transition:'left 0.25s', boxShadow:'0 1px 3px rgba(0,0,0,0.15)' }} />
              </div>
            </div>
            <div style={{ display:'flex', gap:6 }}>
              <button onClick={()=>setViewGrid(true)} style={{ width:34, height:34, display:'flex', alignItems:'center', justifyContent:'center', borderRadius:8, border:'none', cursor:'pointer', backgroundColor:viewGrid?C.ink:'#e8efec', color:viewGrid?'white':C.ink }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
              </button>
              <button onClick={()=>setViewGrid(false)} style={{ width:34, height:34, display:'flex', alignItems:'center', justifyContent:'center', borderRadius:8, border:'none', cursor:'pointer', backgroundColor:!viewGrid?C.ink:'#e8efec', color:!viewGrid?'white':C.ink }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
              </button>
            </div>
          </div>
        </div>

        {/* LISTINGS */}
        <section style={{ marginBottom:48 }}>
          <p style={{ fontSize:13, color:C.muted, ...HK, marginBottom:20 }}>Showing {listings.length} of {catData.count} results</p>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:20 }}>
            {listings.map(item=><ListingCard key={item.id} item={item} locale={locale} />)}
          </div>
        </section>

        {/* PAGINATION */}
        <div style={{ display:'flex', justifyContent:'center', alignItems:'center', gap:10, marginBottom:64 }}>
          <button style={{ width:44, height:44, borderRadius:12, backgroundColor:'white', border:'1px solid rgba(107,122,118,0.12)', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', color:C.muted }}><ChevronLeft size={18} /></button>
          {[1,2,3,4,5].map(p=>(
            <button key={p} onClick={()=>setPage(p)} style={{ width:44, height:44, borderRadius:12, cursor:'pointer', fontSize:15, ...UB, border:'1px solid', backgroundColor:page===p?C.mint:'white', color:page===p?'white':C.muted, borderColor:page===p?C.mint:'rgba(107,122,118,0.12)' }}>{p}</button>
          ))}
          <span style={{ color:C.muted }}>…</span>
          <button style={{ width:44, height:44, borderRadius:12, backgroundColor:'white', border:'1px solid rgba(107,122,118,0.12)', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', color:C.muted }}><ChevronRight size={18} /></button>
        </div>

        {/* EXPLORE OTHER CATEGORIES */}
        <section style={{ marginBottom:48 }}>
          <h3 style={{ ...UB, fontSize:16, color:C.ink, textTransform:'uppercase' as const, letterSpacing:'0.08em', marginBottom:20 }}>Explore Other Categories</h3>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(6,1fr)', gap:12 }}>
            {ALL_CATS.filter(c=>c.slug!==catSlug).map(c=>(
              <Link key={c.slug} href={`/${locale}/electronics/projectors-tvs/${c.slug}`}
                style={{ backgroundColor:'white', borderRadius:16, padding:'18px 14px', textAlign:'center' as const, border:'1px solid rgba(107,122,118,0.1)', textDecoration:'none', display:'block' }}>
                <p style={{ fontSize:11, ...UB, color:C.ink, textTransform:'uppercase' as const, letterSpacing:'0.06em' }}>{c.label}</p>
              </Link>
            ))}
          </div>
        </section>

        <div style={{ textAlign:'center' as const }}>
          <Link href={`/${locale}/electronics/projectors-tvs`} style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'16px 40px', borderRadius:100, backgroundColor:C.ink, color:'white', textDecoration:'none', fontSize:12, ...UB, textTransform:'uppercase' as const, letterSpacing:'0.1em' }}>← Back to All TVs & Projectors</Link>
        </div>
      </div>
    </div>
  )
}
