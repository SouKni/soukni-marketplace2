'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Breadcrumb from '@/components/ui/Breadcrumb'
import CategoryFooterNav from '@/components/ui/CategoryFooterNav'
import { Heart, Search, MapPin, SlidersHorizontal, ChevronRight, Diamond, MessageCircle } from 'lucide-react'
import { useListings } from '@/hooks/useListings'
import WhatsAppButton from '@/components/ui/WhatsAppButton'
import { useMarket } from '@/context/MarketContext'

const I = {
  hero:    'https://images.pexels.com/photos/1571442/pexels-photo-1571442.jpeg?auto=compress&w=1600',
  tv1:     'https://images.pexels.com/photos/1571442/pexels-photo-1571442.jpeg?auto=compress&w=600',
  tv2:     'https://images.pexels.com/photos/6782570/pexels-photo-6782570.jpeg?auto=compress&w=600',
  tv3:     'https://images.pexels.com/photos/4009402/pexels-photo-4009402.jpeg?auto=compress&w=600',
  tv4:     'https://images.pexels.com/photos/1571442/pexels-photo-1571442.jpeg?auto=compress&w=600',
  tv5:     'https://images.pexels.com/photos/6782570/pexels-photo-6782570.jpeg?auto=compress&w=600',
  tv6:     'https://images.pexels.com/photos/4009402/pexels-photo-4009402.jpeg?auto=compress&w=600',
  tv7:     'https://images.pexels.com/photos/1571442/pexels-photo-1571442.jpeg?auto=compress&w=600',
  tv8:     'https://images.pexels.com/photos/6782570/pexels-photo-6782570.jpeg?auto=compress&w=600',
  lg:      'https://images.pexels.com/photos/1571442/pexels-photo-1571442.jpeg?auto=compress&w=600',
  samsung: 'https://images.pexels.com/photos/6782570/pexels-photo-6782570.jpeg?auto=compress&w=600',
  sony:    'https://images.pexels.com/photos/4009402/pexels-photo-4009402.jpeg?auto=compress&w=600',
  philips: 'https://images.pexels.com/photos/1571442/pexels-photo-1571442.jpeg?auto=compress&w=600',
  tcl:     'https://images.pexels.com/photos/6782570/pexels-photo-6782570.jpeg?auto=compress&w=600',
  hisense: 'https://images.pexels.com/photos/4009402/pexels-photo-4009402.jpeg?auto=compress&w=600',
  xiaomi:  'https://images.pexels.com/photos/1571442/pexels-photo-1571442.jpeg?auto=compress&w=600',
  immo:    'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&w=1200',
  auto:    'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&w=1200',
}

type Badge = 'diamond' | 'certified' | 'pro' | null
interface Listing { id:string; title:string; price:number; location:string; time:string; image:string; badge:Badge; phone?:string|null }

const featuredListings: Listing[] = [
  { id:'f1', badge:'diamond',   title:'LG OLED evo G4 77" 4K Smart TV 2024',        price:28500, location:'Casablanca', time:'Just now', image:I.lg },
  { id:'f2', badge:'certified', title:'Samsung Neo QLED 8K 75" QN900D',             price:42000, location:'Rabat',      time:'1h ago',   image:I.samsung },
  { id:'f3', badge:'pro',       title:'Sony Bravia XR A95L 65" OLED 4K',            price:32000, location:'Marrakech',  time:'2h ago',   image:I.sony },
  { id:'f4', badge:'diamond',   title:'LG OLED C4 55" 4K 120Hz Smart TV',           price:14500, location:'Tangier',    time:'3h ago',   image:I.tv4 },
]

const exclusiveListings: Listing[] = [
  { id:'e1', badge:'diamond',   title:'Samsung The Frame 85" QLED 4K Art TV',       price:38000, location:'Casablanca', time:'Just now', image:I.samsung },
  { id:'e2', badge:'certified', title:'Sony Bravia XR Z9K 8K Mini LED 75"',         price:65000, location:'Rabat',      time:'1h ago',   image:I.sony },
  { id:'e3', badge:'pro',       title:'LG OLED evo M4 97" Wireless 4K TV',          price:85000, location:'Agadir',     time:'2h ago',   image:I.lg },
  { id:'e4', badge:'diamond',   title:'Samsung Neo QLED 4K 65" QN95D',              price:18500, location:'Fès',        time:'3h ago',   image:I.tv1 },
]

const discoveryListings: Listing[] = [
  { id:'d1',  badge:'diamond',   title:'Philips OLED+908 65" Ambilight TV',          price:22000, location:'Casablanca', time:'Just now', image:I.philips },
  { id:'d2',  badge:'certified', title:'TCL QD-Mini LED 85" C845 Google TV',         price:12500, location:'Rabat',      time:'1h ago',   image:I.tcl },
  { id:'d3',  badge:'pro',       title:'Hisense U8K 65" Mini-LED ULED 4K',           price:8900,  location:'Tangier',    time:'2h ago',   image:I.hisense },
  { id:'d4',  badge:'diamond',   title:'Xiaomi TV Max 100" 4K Ultra HD',             price:15000, location:'Marrakech',  time:'3h ago',   image:I.xiaomi },
  { id:'d5',  badge:'certified', title:'LG NanoCell 55" NANO75 4K Smart TV',         price:5800,  location:'Casablanca', time:'4h ago',   image:I.tv5 },
  { id:'d6',  badge:'diamond',   title:'Samsung Crystal UHD 75" TU8000',             price:7200,  location:'Rabat',      time:'5h ago',   image:I.tv6 },
  { id:'d7',  badge:'pro',       title:'Epson EH-TW9400 4K Pro Cinema Projector',   price:24500, location:'Agadir',     time:'6h ago',   image:I.tv7 },
  { id:'d8',  badge:'certified', title:'BenQ W2700 4K HDR Home Projector',           price:9800,  location:'Fès',        time:'7h ago',   image:I.tv8 },
  { id:'d9',  badge:'diamond',   title:'Sony VPL-VW290ES 4K SXRD Projector',        price:32000, location:'Casablanca', time:'8h ago',   image:I.tv1 },
  { id:'d10', badge:'certified', title:'TCL 55" C735 Mini LED QLED Google TV',       price:6500,  location:'Rabat',      time:'9h ago',   image:I.tcl },
  { id:'d11', badge:'pro',       title:'Hisense PX3-PRO 4K TriChroma Laser TV',     price:38000, location:'Marrakech',  time:'10h ago',  image:I.hisense },
  { id:'d12', badge:'diamond',   title:'Samsung 98" QLED 4K QN900A 8K Neo',         price:95000, location:'Casablanca', time:'11h ago',  image:I.samsung },
]

const brands = [
  { name:'LG',      count:'1,240', image:I.lg },
  { name:'Samsung', count:'2,180', image:I.samsung },
  { name:'Sony',    count:'890',   image:I.sony },
  { name:'Philips', count:'540',   image:I.philips },
  { name:'TCL',     count:'720',   image:I.tcl },
  { name:'Hisense', count:'480',   image:I.hisense },
  { name:'Xiaomi',  count:'320',   image:I.xiaomi },
]

const C = { mint:'#22d4a8', mintDk:'#0f9b8e', ink:'#161d1b', surface:'#f4fbf8', muted:'#6b7a76' }
const UB = { fontFamily:"'Inter',sans-serif", fontWeight:900, letterSpacing:'-0.05em' } as const
const HK = { fontFamily:"'Hanken Grotesk',sans-serif", fontWeight:900, letterSpacing:'-0.03em' } as const

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

function ListingCard({ item, locale, compact=false }: { item:Listing; locale:string; compact?:boolean }) {
  const [saved, setSaved] = useState(false)
  const [hov, setHov] = useState(false)
  const { formatPrice } = useMarket()
  return (
    <Link href={`/${locale}/listing/${item.id}`} style={{ textDecoration:'none', display:'block' }}>
      <article onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
        style={{ backgroundColor:'white', borderRadius:compact?20:28, overflow:'hidden', border:`1px solid ${hov?C.mint:'rgba(186,202,197,0.2)'}`, boxShadow:hov?'0 20px 48px rgba(0,0,0,0.12)':'0 2px 8px rgba(0,0,0,0.04)', transition:'all 0.3s', cursor:'pointer' }}>
        <div style={{ position:'relative', aspectRatio:'4/3', overflow:'hidden' }}>
          <img src={item.image} alt={item.title} style={{ width:'100%', height:'100%', objectFit:'cover', transition:'transform 0.5s', transform:hov?'scale(1.06)':'scale(1)' }} />
          <CertifiedBadge type={item.badge} />
          <button onClick={e=>{e.preventDefault();setSaved(!saved)}} style={{ position:'absolute', top:10, right:10, zIndex:2, width:30, height:30, borderRadius:'50%', backgroundColor:'rgba(255,255,255,0.15)', backdropFilter:'blur(8px)', border:'1px solid rgba(255,255,255,0.3)', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer' }}>
            <Heart size={13} color={saved?'#ef4444':'white'} fill={saved?'#ef4444':'none'} />
          </button>
        </div>
        <div style={{ padding:compact?'12px 14px':'16px 18px' }}>
          <p style={{ fontSize:10, color:C.muted, marginBottom:3, display:'flex', alignItems:'center', gap:3 }}><MapPin size={10} />{item.location} · {item.time}</p>
          <h4 style={{ ...HK, fontSize:compact?13:14, color:C.ink, marginBottom:6, lineHeight:1.3, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{item.title}</h4>
          <p style={{ ...HK, fontSize:compact?15:17, color:C.mint, marginBottom:10 }}>{formatPrice(item.price)}</p>
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

export default function ProjectorsTVsPage({ params }: { params: Promise<{ locale:string }> }) {
  const { locale } = React.use(params)
  const [activeSeller, setActiveSeller] = useState('All Sellers')
  const [diamondFirst, setDiamondFirst] = useState(true)
  const [activePill, setActivePill] = useState('All TVs & Projectors')
  const [activeBrand, setActiveBrand] = useState('LG')
  const [page, setPage] = useState(1)
  const [viewGrid, setViewGrid] = useState(true)
  const pills = [
    { label:'All TVs & Projectors', slug:'all-tvs-projectors' },
    { label:'OLED TVs',             slug:'oled-tvs'           },
    { label:'QLED TVs',             slug:'qled-tvs'           },
    { label:'8K TVs',               slug:'8k-tvs'             },
    { label:'4K Projectors',        slug:'4k-projectors'      },
    { label:'Home Cinema',          slug:'home-cinema'        },
    { label:'Smart TVs',            slug:'smart-tvs'          },
  ]
  const sellerTabs = ['All Sellers','SouKni Members','SouKni Pro']

  const { fetchListings } = useListings()
  const [dbListings, setDbListings] = useState<any[]>([])

  useEffect(() => {
    const t = setTimeout(() => {
      fetchListings({ category: 'electronics', sortBy: 'newest', limit: 24 }).then(rows => setDbListings(rows || []))
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

  const realMapped: Listing[] = dbListings.map(row => ({
    id: row.id,
    title: row.title,
    price: (row.price || 0) / 100,
    location: row.city || '',
    time: timeAgo(row.created_at),
    image: (row.images && row.images[0]) || I.hero,
    badge: (row.badge as Badge) || null,
    phone: row.profiles?.phone,
  }))
  const hasRealData = realMapped.length >= 4
  const displayFeatured  = hasRealData ? realMapped.slice(0, 4)  : featuredListings
  const displayExclusive = hasRealData ? realMapped.slice(4, 8)  : exclusiveListings
  const PAGE_SIZE = 12
  const discoveryPool = hasRealData ? realMapped.slice(8) : discoveryListings
  const totalPages = Math.max(1, Math.ceil(discoveryPool.length / PAGE_SIZE))
  const displayDiscovery = discoveryPool.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
  const exclusiveHero = displayExclusive[0] || exclusiveListings[0]

  return (
    <div style={{ fontFamily:"'Inter',sans-serif", backgroundColor:C.surface, minHeight:'100vh' }}>

      {/* CINEMATIC HERO */}
      <section style={{ position:'relative', height:480, overflow:'hidden', display:'flex', alignItems:'center', justifyContent:'center' }}>
        <img src={I.hero} alt="TVs & Projectors" style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover' }} />
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top,rgba(15,23,42,0.88),rgba(15,23,42,0.32))' }} />
        <div style={{ position:'relative', zIndex:10, textAlign:'center', padding:'0 24px', maxWidth:760, width:'100%' }}>
          <h1 style={{ ...UB, fontSize:'clamp(36px,6vw,64px)', color:'white', lineHeight:1.0, marginBottom:20, textTransform:'uppercase' as const }}>
            TVS &amp;<br />PROJECTORS IN RABAT.
          </h1>
          <div style={{ display:'flex', alignItems:'stretch', backgroundColor:'rgba(255,255,255,0.12)', backdropFilter:'blur(24px)', border:'1px solid rgba(255,255,255,0.25)', borderRadius:100, overflow:'hidden', maxWidth:680, margin:'0 auto', boxShadow:'0 8px 32px rgba(0,0,0,0.2)' }}>
            <div style={{ display:'flex', flexDirection:'column' as const, padding:'14px 22px', flex:'0 0 160px', borderRight:'1px solid rgba(255,255,255,0.2)', gap:2 }}>
              <span style={{ fontSize:9, fontWeight:800, color:'rgba(255,255,255,0.55)', textTransform:'uppercase' as const, letterSpacing:'0.12em' }}>City</span>
              <input placeholder="Rabat" style={{ backgroundColor:'transparent', border:'none', outline:'none', fontSize:14, fontWeight:600, color:'white', fontFamily:"'Inter',sans-serif", padding:0 }} />
            </div>
            <div style={{ display:'flex', flexDirection:'column' as const, padding:'14px 22px', flex:1, borderRight:'1px solid rgba(255,255,255,0.2)', gap:2 }}>
              <span style={{ fontSize:9, fontWeight:800, color:'rgba(255,255,255,0.55)', textTransform:'uppercase' as const, letterSpacing:'0.12em' }}>Keyword</span>
              <input placeholder="LG OLED, Samsung QLED, Sony Bravia..." style={{ backgroundColor:'transparent', border:'none', outline:'none', fontSize:14, fontWeight:600, color:'white', fontFamily:"'Inter',sans-serif", padding:0, width:'100%' }} />
            </div>
            <button style={{ backgroundColor:C.mint, color:'white', border:'none', padding:'0 32px', fontWeight:800, fontSize:14, cursor:'pointer', flexShrink:0, transition:'background 0.15s' }}
              onMouseEnter={e=>e.currentTarget.style.backgroundColor=C.mint}
              onMouseLeave={e=>e.currentTarget.style.backgroundColor=C.mint}>
              Search
            </button>
          </div>
        </div>
      </section>

      {/* ADVANCED FILTER BAR */}
      <div style={{ maxWidth:1440, margin:'-26px auto 0', padding:'0 40px', position:'relative', zIndex:30 }}>
        <div style={{ backgroundColor:'rgba(255,255,255,0.92)', backdropFilter:'blur(20px)', borderRadius:100, padding:'8px 8px 8px 0', boxShadow:'0 8px 40px rgba(0,0,0,0.10)', border:'1px solid rgba(255,255,255,0.7)', display:'flex', alignItems:'center' }}>
          {[
            { label:'City', val:'Casablanca', w:1 },
            { label:'Keyword', val:'LG, Samsung, Sony, Projector...', w:2 },
            { label:'Neighborhood', val:'All Neighborhoods', w:1 },
            { label:'Price (MAD)', val:'Select Range', w:1 },
          ].map((f,i)=>(
            <div key={f.label} style={{ flex:f.w, padding:'8px 20px', borderRight:i<3?'1px solid rgba(186,202,197,0.25)':'none', display:'flex', flexDirection:'column' as const, cursor:'pointer', gap:1 }}>
              <span style={{ fontSize:9, textTransform:'uppercase' as const, fontWeight:700, color:C.muted, letterSpacing:'0.1em' }}>{f.label}</span>
              <span style={{ fontSize:13, fontWeight:600, color:C.ink }}>{f.val}</span>
            </div>
          ))}
          <button style={{ display:'flex', alignItems:'center', gap:6, padding:'10px 18px', borderRadius:100, border:'1px solid rgba(186,202,197,0.3)', backgroundColor:'#eef5f2', fontSize:12, fontWeight:700, color:C.ink, cursor:'pointer', marginLeft:8, flexShrink:0 }}>
            <SlidersHorizontal size={14} /> All Filters
          </button>
          <button style={{ backgroundColor:C.mint, color:'white', border:'none', padding:'12px 24px', borderRadius:100, cursor:'pointer', fontWeight:700, fontSize:13, flexShrink:0, marginLeft:8, display:'flex', alignItems:'center', gap:6 }}>
            <Search size={15} /> SEARCH
          </button>
        </div>
      </div>

      <div style={{ maxWidth:1440, margin:'32px auto 0', padding:'0 40px 80px' }}>

        {/* BREADCRUMB */}
        <Breadcrumb
          items={[
            { label:'Home', href:`/${locale}` },
            { label:'Electronics', href:`/${locale}/electronics` },
            { label:'TVs &amp; Projectors' },
          ]}
          mutedColor={C.muted}
          inkColor={C.ink}
        />

        {/* TITLE + SORT/SAVE */}
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:4 }}>
          <h2 style={{ ...UB, fontSize:22, color:C.ink }}>New and Pre-Owned TVs &amp; Projectors in Rabat</h2>
          <div style={{ display:'flex', gap:8 }}>
            <button style={{ display:'flex', alignItems:'center', gap:6, padding:'8px 14px', borderRadius:12, border:'1px solid rgba(186,202,197,0.4)', backgroundColor:'#eef5f2', fontSize:12, fontWeight:700, cursor:'pointer', color:C.ink }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="3" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="13" y1="18" x2="21" y2="18"/></svg>
              Sort: Default
            </button>
            <button style={{ display:'flex', alignItems:'center', gap:6, padding:'8px 14px', borderRadius:12, border:'1px solid rgba(186,202,197,0.4)', backgroundColor:'#eef5f2', fontSize:12, fontWeight:700, cursor:'pointer', color:C.ink }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
              Save Search
            </button>
          </div>
        </div>
        <p style={{ fontSize:14, color:C.muted, marginBottom:16 }}>3,215 Ads in Rabat District</p>

        

        {/* PILLS */}
        <div style={{ display:'flex', gap:8, marginBottom:16, overflowX:'auto', paddingBottom:4 }}>
          {pills.map(cat=>(
            <Link key={cat.slug} href={`/${locale}/electronics/projectors-tvs/${cat.slug}`}
              style={{ padding:'8px 20px', borderRadius:100, fontSize:12, fontWeight:700, cursor:'pointer', whiteSpace:'nowrap' as const, transition:'all 0.15s', textDecoration:'none', display:'inline-block', backgroundColor:'#e8efec', color:'#3c4a46' }}
              onMouseEnter={e=>{e.currentTarget.style.backgroundColor=C.ink;e.currentTarget.style.color='white'}}
              onMouseLeave={e=>{e.currentTarget.style.backgroundColor='#e8efec';e.currentTarget.style.color='#3c4a46'}}
            >{cat.label}</Link>
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

        {/* QUICK FILTER CHIPS */}
        <div style={{ display:'flex', gap:8, marginBottom:28, flexWrap:'wrap' as const }}>
          {[
            { emoji:'✨', label:'New Arrivals', active:true },
            { emoji:'📉', label:'Price Drop Alert', active:false },
            { emoji:'🛍️', label:'Shop Sellers', active:false },
          ].map(chip=>(
            <button key={chip.label} style={{ display:'flex', alignItems:'center', gap:6, padding:'8px 16px', borderRadius:100, fontSize:12, fontWeight:700, cursor:'pointer', transition:'all 0.15s', border:chip.active?'none':'1px solid rgba(186,202,197,0.5)', backgroundColor:chip.active?C.ink:'white', color:chip.active?'white':'#3c4a46' }}>
              {chip.emoji} {chip.label}
            </button>
          ))}
        </div>

        {/* FEATURED */}
        <section style={{ marginBottom:48 }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:20 }}>
            <h2 style={{ ...UB, fontSize:13, color:C.ink, textTransform:'uppercase' as const, letterSpacing:'0.1em' }}>FEATURED PREMIUM TVS &amp; PROJECTORS</h2>
            <Link href={`/${locale}/electronics`} style={{ color:C.mint, fontWeight:700, fontSize:13, textDecoration:'none', display:'flex', alignItems:'center', gap:4 }}>View all Featured <ChevronRight size={14} /></Link>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:20 }}>
            {displayFeatured.map(item=><ListingCard key={item.id} item={item} locale={locale} />)}
          </div>
        </section>

        {/* IMMO PRO BANNER */}
        <section style={{ marginBottom:48 }}>
          <div style={{ position:'relative', height:220, borderRadius:40, overflow:'hidden', cursor:'pointer', boxShadow:'0 20px 60px rgba(0,0,0,0.15)' }}>
            <img src={I.immo} alt="Immo Pro" style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover' }} />
            <div style={{ position:'absolute', inset:0, background:'linear-gradient(to right,rgba(22,29,27,0.92) 0%,rgba(22,29,27,0.5) 60%,transparent)' }} />
            <div style={{ position:'absolute', inset:0, display:'flex', flexDirection:'column' as const, justifyContent:'center', padding:'0 56px' }}>
              <span style={{ backgroundColor:C.mint, color:'white', fontSize:9, ...UB, padding:'4px 14px', borderRadius:100, textTransform:'uppercase' as const, letterSpacing:'0.12em', display:'inline-block', marginBottom:14, width:'fit-content' }}>SouKni Immo Pro</span>
              <h2 style={{ ...UB, fontSize:'clamp(20px,3vw,32px)', color:'white', marginBottom:20, lineHeight:1.1 }}>List your luxury property<br/>where the elite browse.</h2>
              <div style={{ display:'flex', gap:12 }}>
                <Link href={`/${locale}/property`} style={{ textDecoration:'none' }}>
                  <button style={{ backgroundColor:'white', color:C.ink, border:'none', padding:'11px 28px', borderRadius:100, fontSize:12, ...UB, cursor:'pointer' }}>Explore Properties</button>
                </Link>
                <button style={{ backgroundColor:'transparent', color:'white', border:'1px solid rgba(255,255,255,0.4)', padding:'11px 28px', borderRadius:100, fontSize:12, fontWeight:700, cursor:'pointer' }}>Contact Expert</button>
              </div>
            </div>
          </div>
        </section>

        {/* EXCLUSIVE COLLECTION — CLEAN BENTO */}
        <section style={{ marginBottom:48 }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:20 }}>
            <h2 style={{ ...UB, fontSize:22, color:C.mint }}>Exclusive TVs &amp; Projectors Collection</h2>
            <Link href={`/${locale}/electronics`} style={{ color:C.mint, fontWeight:700, fontSize:13, textDecoration:'none', display:'flex', alignItems:'center', gap:4 }}>View all <ChevronRight size={14} /></Link>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'1.4fr 1fr', gridTemplateRows:'280px 280px', gap:16, marginBottom:16 }}>
            <div style={{ gridRow:'span 2' }}>
              <div style={{ height:'100%', borderRadius:32, overflow:'hidden', position:'relative', cursor:'pointer' }}
                onMouseEnter={e=>{const img=e.currentTarget.querySelector('img') as HTMLImageElement;if(img)img.style.transform='scale(1.06)'}}
                onMouseLeave={e=>{const img=e.currentTarget.querySelector('img') as HTMLImageElement;if(img)img.style.transform='scale(1)'}}>
                <img src={exclusiveHero.image} alt={exclusiveHero.title} style={{ width:'100%', height:'100%', objectFit:'cover', transition:'transform 0.6s' }} />
                <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top,rgba(0,0,0,0.85),rgba(0,0,0,0.05))' }} />
                <div style={{ position:'absolute', top:16, left:16 }}><span style={{ background:'linear-gradient(135deg,#22d4a8,#0f9b8e)', color:'white', fontSize:'8px', fontWeight:900, padding:'3px 10px', borderRadius:100, textTransform:'uppercase' as const, letterSpacing:'0.08em' }}>✦ SOUKNI CERTIFIED</span></div>
                <div style={{ position:'absolute', bottom:24, left:24, right:24 }}>
                  <p style={{ ...HK, fontSize:18, color:'white', marginBottom:8, lineHeight:1.2 }}>{exclusiveHero.title}</p>
                  <p style={{ ...HK, fontSize:22, color:C.mint, marginBottom:14 }}>{exclusiveHero.price.toLocaleString()} MAD</p>
                  <div style={{ display:'flex', gap:8 }}>
                    <button onClick={e=>e.preventDefault()} style={{ flex:1, backgroundColor:'rgba(255,255,255,0.15)', backdropFilter:'blur(8px)', color:'white', border:'1px solid rgba(255,255,255,0.3)', padding:'9px 0', borderRadius:100, fontWeight:700, fontSize:12, cursor:'pointer' }}>Chat</button>
                    <WhatsAppButton phone={exclusiveHero.phone} title={exclusiveHero.title} style={{ flex:1, padding:'9px 0', borderRadius:100, fontWeight:700, fontSize:12 }} />
                  </div>
                </div>
              </div>
            </div>
            <div style={{ borderRadius:24, overflow:'hidden', position:'relative', cursor:'pointer' }}
              onMouseEnter={e=>{const img=e.currentTarget.querySelector('img') as HTMLImageElement;if(img)img.style.transform='scale(1.06)'}}
              onMouseLeave={e=>{const img=e.currentTarget.querySelector('img') as HTMLImageElement;if(img)img.style.transform='scale(1)'}}>
              <img src={exclusiveListings[1].image} alt={exclusiveListings[1].title} style={{ width:'100%', height:'100%', objectFit:'cover', transition:'transform 0.6s' }} />
              <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top,rgba(0,0,0,0.8),rgba(0,0,0,0.05))' }} />
              <div style={{ position:'absolute', top:12, left:12 }}><span style={{ background:'linear-gradient(135deg,#22d4a8,#0f9b8e)', color:'white', fontSize:'8px', fontWeight:900, padding:'3px 8px', borderRadius:100, textTransform:'uppercase' as const }}>✦ CERTIFIED</span></div>
              <div style={{ position:'absolute', bottom:16, left:16, right:16 }}>
                <p style={{ ...HK, fontSize:14, color:'white', marginBottom:4 }}>{exclusiveListings[1].title}</p>
                <p style={{ ...HK, fontSize:17, color:C.mint }}>{exclusiveListings[1].price.toLocaleString()} MAD</p>
              </div>
            </div>
            <div style={{ borderRadius:24, overflow:'hidden', position:'relative', cursor:'pointer' }}
              onMouseEnter={e=>{const img=e.currentTarget.querySelector('img') as HTMLImageElement;if(img)img.style.transform='scale(1.06)'}}
              onMouseLeave={e=>{const img=e.currentTarget.querySelector('img') as HTMLImageElement;if(img)img.style.transform='scale(1)'}}>
              <img src={exclusiveListings[2].image} alt={exclusiveListings[2].title} style={{ width:'100%', height:'100%', objectFit:'cover', transition:'transform 0.6s' }} />
              <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top,rgba(0,0,0,0.8),rgba(0,0,0,0.05))' }} />
              <div style={{ position:'absolute', top:12, left:12 }}><span style={{ background:'linear-gradient(135deg,#22d4a8,#0f9b8e)', color:'white', fontSize:'8px', fontWeight:900, padding:'3px 8px', borderRadius:100, textTransform:'uppercase' as const }}>✦ CERTIFIED</span></div>
              <div style={{ position:'absolute', bottom:16, left:16, right:16 }}>
                <p style={{ ...HK, fontSize:14, color:'white', marginBottom:4 }}>{exclusiveListings[2].title}</p>
                <p style={{ ...HK, fontSize:17, color:C.mint }}>{exclusiveListings[2].price.toLocaleString()} MAD</p>
              </div>
            </div>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 }}>
            <ListingCard item={exclusiveListings[3]} locale={locale} compact />
            <div style={{ borderRadius:24, overflow:'hidden', position:'relative', cursor:'pointer', minHeight:200 }}>
              <img src={I.tv5} alt="Electro Pro" style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover' }} />
              <div style={{ position:'absolute', inset:0, background:'linear-gradient(135deg,rgba(22,29,27,0.92),rgba(22,29,27,0.4))' }} />
              <div style={{ position:'absolute', inset:0, display:'flex', flexDirection:'column' as const, justifyContent:'center', padding:'0 28px' }}>
                <span style={{ background:'linear-gradient(135deg,#22d4a8,#0f9b8e)', color:'white', fontSize:9, fontWeight:900, padding:'4px 12px', borderRadius:100, textTransform:'uppercase' as const, letterSpacing:'0.1em', display:'inline-block', marginBottom:10, width:'fit-content' }}>SouKni Electro Pro</span>
                <h3 style={{ ...UB, fontSize:18, color:'white', marginBottom:12, lineHeight:1.2 }}>Find your next<br/>certified TV today.</h3>
                <Link href={`/${locale}/electronics`} style={{ textDecoration:'none' }}>
                  <button style={{ backgroundColor:'white', color:C.ink, border:'none', padding:'9px 20px', borderRadius:100, fontSize:11, ...UB, cursor:'pointer' }}>Explore All</button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* AUTO PRO BANNER */}
        <section style={{ marginBottom:48 }}>
          <div style={{ position:'relative', height:220, borderRadius:40, overflow:'hidden', cursor:'pointer', boxShadow:'0 20px 60px rgba(0,0,0,0.15)' }}>
            <img src={I.auto} alt="Auto Pro" style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover' }} />
            <div style={{ position:'absolute', inset:0, background:'linear-gradient(to right,rgba(22,29,27,0.92) 0%,rgba(22,29,27,0.5) 60%,transparent)' }} />
            <div style={{ position:'absolute', inset:0, display:'flex', flexDirection:'column' as const, justifyContent:'center', padding:'0 56px' }}>
              <span style={{ backgroundColor:'#8d4f00', color:'white', fontSize:9, ...UB, padding:'4px 14px', borderRadius:100, textTransform:'uppercase' as const, letterSpacing:'0.12em', display:'inline-block', marginBottom:14, width:'fit-content' }}>SouKni Auto Pro</span>
              <h2 style={{ ...UB, fontSize:'clamp(20px,3vw,32px)', color:'white', marginBottom:20, lineHeight:1.1 }}>Premium Vehicles for<br/>the Elite Shopper.</h2>
              <div style={{ display:'flex', gap:12 }}>
                <Link href={`/${locale}/motors`} style={{ textDecoration:'none' }}>
                  <button style={{ backgroundColor:'white', color:C.ink, border:'none', padding:'11px 28px', borderRadius:100, fontSize:12, ...UB, cursor:'pointer' }}>Browse &amp; Explore</button>
                </Link>
                <button style={{ backgroundColor:'transparent', color:'white', border:'1px solid rgba(255,255,255,0.4)', padding:'11px 28px', borderRadius:100, fontSize:12, fontWeight:700, cursor:'pointer' }}>Contact Expert</button>
              </div>
            </div>
          </div>
        </section>

        {/* PRO DISCOVERY GRID */}
        <section style={{ marginBottom:48 }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:20 }}>
            <h2 style={{ ...UB, fontSize:20, color:C.ink }}>Pro TV &amp; Projector Discoveries</h2>
            <Link href={`/${locale}/electronics`} style={{ color:C.mint, fontWeight:700, fontSize:13, textDecoration:'none', display:'flex', alignItems:'center', gap:4 }}>View all <ChevronRight size={14} /></Link>
          </div>
          <div style={{ display:'flex', flexDirection:'column' as const, gap:16 }}>
            {[displayDiscovery.slice(0,4), displayDiscovery.slice(4,8), displayDiscovery.slice(8,12)].map((row,ri)=>(
              <div key={ri} style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:16 }}>
                {row.map(item=><ListingCard key={item.id} item={item} locale={locale} compact />)}
              </div>
            ))}
          </div>
        </section>

        {/* PAGINATION */}
        <div style={{ display:'flex', justifyContent:'center', alignItems:'center', gap:8, marginBottom:56 }}>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(p=>(
            <button key={p} onClick={()=>setPage(p)}
              style={{ width:36, height:36, borderRadius:10, border:page===p?'none':'1px solid #e2e8f0', backgroundColor:page===p?C.mint:'white', color:page===p?'white':C.ink, fontWeight:700, fontSize:13, cursor:'pointer' }}>
              {p}
            </button>
          ))}
          <button onClick={()=>setPage(p=>Math.min(totalPages,p+1))} disabled={page>=totalPages}
            style={{ padding:'0 16px', height:36, borderRadius:10, border:'1px solid #e2e8f0', backgroundColor:'white', color:C.ink, fontWeight:700, fontSize:13, cursor:page>=totalPages?'not-allowed':'pointer', display:'flex', alignItems:'center', gap:4, opacity:page>=totalPages?0.4:1 }}>
            Next <ChevronRight size={14} />
          </button>
        </div>

        {/* DIAMOND BANNER */}
        <section style={{ position:'relative', borderRadius:40, overflow:'hidden', marginBottom:40 }}>
          <img src={I.hero} alt="Diamond" style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover' }} />
          <div style={{ position:'absolute', inset:0, background:'linear-gradient(135deg,rgba(15,23,42,0.96),rgba(15,23,42,0.7))' }} />
          <div style={{ position:'relative', zIndex:1, padding:'56px 64px', maxWidth:640 }}>
            <span style={{ display:'inline-flex', alignItems:'center', gap:6, background:'linear-gradient(135deg,#22d4a8,#0f9b8e)', color:'white', fontSize:9, ...UB, padding:'5px 16px', borderRadius:100, textTransform:'uppercase' as const, letterSpacing:'0.12em', marginBottom:20 }}>✦ SOUKNI CERTIFIED</span>
            <h2 style={{ ...UB, fontSize:'clamp(28px,4vw,48px)', color:'white', marginBottom:16, lineHeight:1.05 }}>Unlock the Power of Diamond.</h2>
            <p style={{ fontSize:15, color:'rgba(255,255,255,0.72)', lineHeight:1.7, marginBottom:28 }}>Priority placement, boosted visibility, and full access to Morocco's most serious electronics buyers. Get started today.</p>
            <div style={{ display:'flex', gap:12 }}>
              <button style={{ backgroundColor:C.mint, color:'white', border:'none', padding:'13px 28px', borderRadius:100, fontSize:13, ...UB, cursor:'pointer' }}>Get Started</button>
              <button style={{ backgroundColor:'transparent', color:'white', border:'1px solid rgba(255,255,255,0.3)', padding:'13px 28px', borderRadius:100, fontSize:13, fontWeight:700, cursor:'pointer' }}>Learn More</button>
            </div>
          </div>
        </section>

        {/* JOIN THE SOUKNI FAMILY */}
        <section style={{ borderRadius:40, background:'linear-gradient(135deg,#22d4a8,#0f9b8e)', padding:'56px 64px', display:'flex', alignItems:'center', justifyContent:'space-between', gap:40, flexWrap:'wrap' as const }}>
          <div>
            <h2 style={{ ...UB, fontSize:'clamp(28px,4vw,44px)', color:'white', marginBottom:12, lineHeight:1.05 }}>JOIN THE SOUKNI FAMILY</h2>
            <p style={{ fontSize:15, color:'rgba(255,255,255,0.85)', maxWidth:480, lineHeight:1.7 }}>Get early access to new drops, exclusive member deals, and Morocco's finest TV listings.</p>
            <div style={{ display:'flex', gap:12, marginTop:24 }}>
              <button style={{ backgroundColor:'white', color:C.mint, border:'none', padding:'12px 24px', borderRadius:100, fontWeight:800, fontSize:13, cursor:'pointer', display:'flex', alignItems:'center', gap:8 }}>🍎 App Store</button>
              <button style={{ backgroundColor:'rgba(255,255,255,0.15)', color:'white', border:'1px solid rgba(255,255,255,0.4)', padding:'12px 24px', borderRadius:100, fontWeight:800, fontSize:13, cursor:'pointer', display:'flex', alignItems:'center', gap:8 }}>▶ Google Play</button>
            </div>
          </div>
          <Link href={`/${locale}/post-ad`} style={{ textDecoration:'none' }}>
            <span style={{ display:'inline-block', backgroundColor:'white', color:C.mint, padding:'16px 36px', borderRadius:100, fontWeight:900, fontSize:14, cursor:'pointer', whiteSpace:'nowrap' as const, ...UB }}>Post Free Ad →</span>
          </Link>
        </section>

        <CategoryFooterNav
          backHref={`/${locale}/electronics`}
          backLabel="Back to Electronics"
          inkColor={C.ink}
          mintDkColor={C.mintDk}
        />

      </div>
    </div>
  )
}
