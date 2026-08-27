'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Heart, Search, MapPin, SlidersHorizontal, ChevronRight, Diamond, MessageCircle } from 'lucide-react'
import { useListings } from '@/hooks/useListings'
import WhatsAppButton from '@/components/ui/WhatsAppButton'
import { useMarket } from '@/context/MarketContext'

const C = { mint:'#22d4a8', mintDk:'#0f9b8e', ink:'#161d1b', surface:'#f4fbf8', muted:'#6b7a76' }
const UB = { fontFamily:"'Inter',sans-serif", fontWeight:900, letterSpacing:'-0.05em' } as const
const HK = { fontFamily:"'Hanken Grotesk',sans-serif", fontWeight:900, letterSpacing:'-0.03em' } as const

type Badge = 'diamond' | 'certified' | 'pro' | null
interface Listing { id:string; title:string; price:number; location:string; time:string; image:string; badge:Badge; brand:string; phone?:string|null }

const IMGS = {
  hero:     'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&w=1600',
  pioneer:  'https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&w=600',
  screen:   'https://images.pexels.com/photos/1229861/pexels-photo-1229861.jpeg?auto=compress&w=600',
  dashcam:  'https://images.pexels.com/photos/892522/pexels-photo-892522.jpeg?auto=compress&w=600',
  garmin:   'https://images.pexels.com/photos/1007410/pexels-photo-1007410.jpeg?auto=compress&w=600',
  jbl:      'https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&w=600',
  carplay:  'https://images.pexels.com/photos/2127039/pexels-photo-2127039.jpeg?auto=compress&w=600',
  kenwood:  'https://images.pexels.com/photos/1229861/pexels-photo-1229861.jpeg?auto=compress&w=600',
  charger:  'https://images.pexels.com/photos/4526407/pexels-photo-4526407.jpeg?auto=compress&w=600',
  immo:     'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&w=1200',
  auto:     'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&w=1200',
}

const featuredListings: Listing[] = [
  { id:'c1', badge:'diamond',  title:'Pioneer XDJ-XZ Professional Audio Hub',    price:24500, location:'Rabat, Agdal',   time:'Just now', image:IMGS.pioneer, brand:'Pioneer' },
  { id:'c2', badge:'pro',      title:'Android 13 12.1" Screen For Toyota',       price:4200,  location:'Rabat, Souissi', time:'1h ago',   image:IMGS.screen,  brand:'Generic' },
  { id:'c3', badge:'diamond',  title:'4K Dual Dash Cam with Night Vision',       price:2150,  location:'Rabat, Hassan',  time:'2h ago',   image:IMGS.dashcam, brand:'Generic' },
  { id:'c4', badge:'certified',title:'Garmin Overlander GPS & Off-Road Nav',     price:6800,  location:'Rabat, Hay Riad',time:'3h ago',   image:IMGS.garmin,  brand:'Garmin' },
]

const exclusiveListings: Listing[] = [
  { id:'x1', badge:'diamond',  title:'JBL Stage 3 Car Speakers',                 price:1200, location:'Rabat, Agdal',    time:'Just now', image:IMGS.jbl,     brand:'JBL' },
  { id:'x2', badge:'certified',title:'HD Rear View Backup Camera',               price:450,  location:'Rabat, Center',   time:'1h ago',   image:IMGS.dashcam, brand:'Generic' },
  { id:'x3', badge:'pro',      title:'Wireless CarPlay Adapter',                 price:650,  location:'Casablanca',      time:'2h ago',   image:IMGS.carplay, brand:'Generic' },
  { id:'x4', badge:'certified',title:'Kenwood DMX-7709S Digital Receiver',       price:3800, location:'Rabat, Souissi',  time:'3h ago',   image:IMGS.kenwood, brand:'Kenwood' },
]

const discoveryListings: Listing[] = [
  { id:'d1',  badge:'diamond',  title:'Baseus 160W Fast Car Charger',            price:320,  location:'Rabat, Hay Riad', time:'Just now', image:IMGS.charger, brand:'Baseus' },
  { id:'d2',  badge:'certified',title:'Alpine S-W10D4 10" Subwoofer',            price:1850, location:'Rabat, Center',   time:'1h ago',   image:IMGS.jbl,      brand:'Alpine' },
  { id:'d3',  badge:'diamond',  title:'OBD2 Diagnostic Scanner v2.1 Pro',        price:350,  location:'Casablanca',      time:'2h ago',   image:IMGS.charger,  brand:'Generic' },
  { id:'d4',  badge:'certified',title:'Dual-channel 4K Car Dash Cam',            price:2150, location:'Rabat, Hassan',   time:'3h ago',   image:IMGS.dashcam,  brand:'Generic' },
  { id:'d5',  badge:'certified',title:'GPS Real-time Tracker 4G + Cutoff',       price:850,  location:'Rabat Center',    time:'4h ago',   image:IMGS.garmin,   brand:'Garmin' },
  { id:'d6',  badge:'diamond',  title:'JBL Stage 3 Premium Speakers Set',        price:1200, location:'Rabat, Agdal',    time:'5h ago',   image:IMGS.jbl,      brand:'JBL' },
  { id:'d7',  badge:'certified',title:'Rear View Backup Camera 170° Wide',       price:450,  location:'Salé',            time:'6h ago',   image:IMGS.dashcam,  brand:'Generic' },
  { id:'d8',  badge:'pro',      title:'CarPlay Wireless Adapter for OEM',        price:650,  location:'Rabat Center',    time:'7h ago',   image:IMGS.carplay,  brand:'Generic' },
  { id:'d9',  badge:'diamond',  title:'Kenwood DMX-7709S Media Receiver',        price:3800, location:'Rabat, Souissi',  time:'8h ago',   image:IMGS.kenwood,  brand:'Kenwood' },
  { id:'d10', badge:'certified',title:'Alpine S-W10D4 Dual 4-Ohm Subwoofer',     price:1850, location:'Rabat Center',    time:'9h ago',   image:IMGS.jbl,      brand:'Alpine' },
  { id:'d11', badge:'pro',      title:'Baseus 160W QC5.0 Fast Charger',          price:320,  location:'Rabat, Hay Riad', time:'10h ago',  image:IMGS.charger,  brand:'Baseus' },
  { id:'d12', badge:'diamond',  title:'Pioneer Professional Audio Hub',          price:24500,location:'Rabat Center',    time:'11h ago',  image:IMGS.pioneer,  brand:'Pioneer' },
]

const brands = [
  { name:'Pioneer', count:'420', image:IMGS.pioneer },
  { name:'Sony',    count:'380', image:IMGS.screen },
  { name:'Kenwood', count:'290', image:IMGS.kenwood },
  { name:'JVC',     count:'210', image:IMGS.jbl },
  { name:'Alpine',  count:'340', image:IMGS.jbl },
  { name:'Garmin',  count:'260', image:IMGS.garmin },
  { name:'Baseus',  count:'480', image:IMGS.charger },
]

const pills = ['All Car Electronics','Android Screens','Dash Cams','Audio & Speakers','Navigation','Security Systems']
const pillSlugs: Record<string,string> = {
    'All Car Electronics':'all-car-electronics',
    'Android Screens':'android-screens',
    'Dash Cams':'dash-cams',
    'Audio & Speakers':'audio-speakers',
    'Navigation':'navigation',
    'Security Systems':'security-systems',
}

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
          <p style={{ fontSize:9, ...UB, color:C.mint, textTransform:'uppercase' as const, letterSpacing:'0.08em', marginBottom:3 }}>{item.brand}</p>
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

export default function CarElectronicsPage({ params }: { params: Promise<{ locale:string }> }) {
  const { locale } = React.use(params)
  const [activeSeller, setActiveSeller] = useState('All Sellers')
  const [diamondFirst, setDiamondFirst] = useState(true)
  const [activePill, setActivePill] = useState('All Car Electronics')
  const [activeBrand, setActiveBrand] = useState('')
  const [page, setPage] = useState(1)
  const [viewGrid, setViewGrid] = useState(true)
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
    image: (row.images && row.images[0]) || IMGS.hero,
    badge: (row.badge as Badge) || null,
    phone: row.profiles?.phone,
    brand: row.brand || '',
  }))
  const hasRealData = realMapped.length >= 4
  const displayFeatured  = hasRealData ? realMapped.slice(0, 4)  : featuredListings
  const displayExclusive = hasRealData ? realMapped.slice(4, 8)  : exclusiveListings
  const displayDiscovery = hasRealData ? realMapped.slice(8, 20) : discoveryListings

  return (
    <div style={{ fontFamily:"'Inter',sans-serif", backgroundColor:C.surface, minHeight:'100vh' }}>

      <section style={{ position:'relative', height:480, overflow:'hidden', display:'flex', alignItems:'center', justifyContent:'center' }}>
        <img src={IMGS.hero} alt="Car Electronics" style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover' }} />
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top,rgba(15,23,42,0.88),rgba(15,23,42,0.32))' }} />
        <div style={{ position:'relative', zIndex:10, textAlign:'center', padding:'0 24px', maxWidth:760, width:'100%' }}>
          <h1 style={{ ...UB, fontSize:'clamp(36px,6vw,64px)', color:'white', lineHeight:1.0, marginBottom:20, textTransform:'uppercase' as const }}>
            CAR ELECTRONICS<br />IN RABAT.
          </h1>
          <div style={{ display:'flex', alignItems:'stretch', backgroundColor:'rgba(255,255,255,0.12)', backdropFilter:'blur(24px)', border:'1px solid rgba(255,255,255,0.25)', borderRadius:100, overflow:'hidden', maxWidth:680, margin:'0 auto', boxShadow:'0 8px 32px rgba(0,0,0,0.2)' }}>
            <div style={{ display:'flex', flexDirection:'column' as const, padding:'14px 22px', flex:'0 0 160px', borderRight:'1px solid rgba(255,255,255,0.2)', gap:2 }}>
              <span style={{ fontSize:9, fontWeight:800, color:'rgba(255,255,255,0.55)', textTransform:'uppercase' as const, letterSpacing:'0.12em' }}>City</span>
              <input placeholder="Rabat" style={{ backgroundColor:'transparent', border:'none', outline:'none', fontSize:14, fontWeight:600, color:'white', fontFamily:"'Inter',sans-serif", padding:0 }} />
            </div>
            <div style={{ display:'flex', flexDirection:'column' as const, padding:'14px 22px', flex:1, borderRight:'1px solid rgba(255,255,255,0.2)', gap:2 }}>
              <span style={{ fontSize:9, fontWeight:800, color:'rgba(255,255,255,0.55)', textTransform:'uppercase' as const, letterSpacing:'0.12em' }}>Keyword</span>
              <input placeholder="Android screen, dash cam, subwoofer..." style={{ backgroundColor:'transparent', border:'none', outline:'none', fontSize:14, fontWeight:600, color:'white', fontFamily:"'Inter',sans-serif", padding:0, width:'100%' }} />
            </div>
            <button style={{ backgroundColor:C.mint, color:'white', border:'none', padding:'0 32px', fontWeight:800, fontSize:14, cursor:'pointer', flexShrink:0 }}>Search</button>
          </div>
        </div>
      </section>

      <div style={{ maxWidth:1440, margin:'-26px auto 0', padding:'0 40px', position:'relative', zIndex:30 }}>
        <div style={{ backgroundColor:'rgba(255,255,255,0.92)', backdropFilter:'blur(20px)', borderRadius:100, padding:'8px 8px 8px 0', boxShadow:'0 8px 40px rgba(0,0,0,0.10)', border:'1px solid rgba(255,255,255,0.7)', display:'flex', alignItems:'center' }}>
          {[
            { label:'City', val:'Rabat', w:1 },
            { label:'Keyword', val:'Android screen, dash cam...', w:2 },
            { label:'Condition', val:'Select', w:1 },
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

        <nav style={{ display:'flex', alignItems:'center', gap:6, fontSize:11, fontWeight:700, color:C.muted, textTransform:'uppercase' as const, letterSpacing:'0.06em', marginBottom:8 }}>
          <Link href={`/${locale}`} style={{ color:C.muted, textDecoration:'none' }}>Home</Link><span>›</span>
          <Link href={`/${locale}/electronics`} style={{ color:C.muted, textDecoration:'none' }}>Electronics</Link><span>›</span>
          <span style={{ color:C.ink }}>Car Electronics</span>
        </nav>

        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:4 }}>
          <h2 style={{ ...UB, fontSize:22, color:C.ink }}>New and Used Car Electronics in Rabat</h2>
          <div style={{ display:'flex', gap:8 }}>
            <button style={{ display:'flex', alignItems:'center', gap:6, padding:'8px 14px', borderRadius:12, border:'1px solid rgba(186,202,197,0.4)', backgroundColor:'#eef5f2', fontSize:12, fontWeight:700, cursor:'pointer', color:C.ink }}>Sort: Default</button>
            <button style={{ display:'flex', alignItems:'center', gap:6, padding:'8px 14px', borderRadius:12, border:'1px solid rgba(186,202,197,0.4)', backgroundColor:'#eef5f2', fontSize:12, fontWeight:700, cursor:'pointer', color:C.ink }}>Save Search</button>
          </div>
        </div>
        <p style={{ fontSize:14, color:C.muted, marginBottom:16 }}>2,415 Ads in Rabat District</p>

        <section style={{ marginBottom:32 }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:16 }}>
            <h2 style={{ ...UB, fontSize:16, color:C.ink, textTransform:'uppercase' as const, letterSpacing:'0.08em' }}>SHOP BY BRAND</h2>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(7,1fr)', gap:12 }}>
            {brands.map(brand=>(
              <button key={brand.name} onClick={()=>setActiveBrand(activeBrand===brand.name?'':brand.name)}
                style={{ position:'relative', borderRadius:20, overflow:'hidden', border:`2px solid ${activeBrand===brand.name?C.mint:'transparent'}`, cursor:'pointer', transition:'all 0.2s', background:'none', padding:0 }}>
                <div style={{ position:'relative', aspectRatio:'1/1', overflow:'hidden' }}>
                  <img src={brand.image} alt={brand.name} style={{ width:'100%', height:'100%', objectFit:'cover', transition:'transform 0.4s', transform:activeBrand===brand.name?'scale(1.06)':'scale(1)' }} />
                  <div style={{ position:'absolute', inset:0, background:activeBrand===brand.name?'linear-gradient(to top,rgba(34,212,168,0.7),rgba(0,0,0,0.2))':'linear-gradient(to top,rgba(0,0,0,0.7),rgba(0,0,0,0.1))' }} />
                  <div style={{ position:'absolute', bottom:10, left:0, right:0, textAlign:'center' }}>
                    <p style={{ ...UB, fontSize:12, color:'white', marginBottom:2 }}>{brand.name}</p>
                    <p style={{ fontSize:9, color:'rgba(255,255,255,0.8)', fontWeight:600 }}>{brand.count} ads</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </section>

        <div style={{ display:'flex', gap:8, marginBottom:16, overflowX:'auto', paddingBottom:4 }}>
          {pills.map(p=>(
            <Link key={p} href={`/${locale}/electronics/car-electronics/${pillSlugs[p]}`}
              style={{ padding:'8px 20px', borderRadius:100, fontSize:12, fontWeight:700, cursor:'pointer', whiteSpace:'nowrap' as const, transition:'all 0.15s', textDecoration:'none', display:'inline-block', backgroundColor:'#e8efec', color:'#3c4a46' }}
              onMouseEnter={e=>{e.currentTarget.style.backgroundColor=C.ink;e.currentTarget.style.color='white'}}
              onMouseLeave={e=>{e.currentTarget.style.backgroundColor='#e8efec';e.currentTarget.style.color='#3c4a46'}}
            >{p}</Link>
          ))}
        </div>

        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'12px 0', borderTop:'1px solid rgba(186,202,197,0.25)', borderBottom:'1px solid rgba(186,202,197,0.25)', marginBottom:28, flexWrap:'wrap' as const, gap:10 }}>
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
                <div style={{ position:'absolute', top:2, left:diamondFirst?22:2, width:16, height:16, borderRadius:'50%', backgroundColor:'white', transition:'left 0.25s' }} />
              </div>
            </div>
            <div style={{ display:'flex', gap:6 }}>
              <button onClick={()=>setViewGrid(true)} style={{ width:34, height:34, display:'flex', alignItems:'center', justifyContent:'center', borderRadius:8, border:'none', cursor:'pointer', backgroundColor:viewGrid?C.ink:'#e8efec', color:viewGrid?'white':C.ink }}>⊞</button>
              <button onClick={()=>setViewGrid(false)} style={{ width:34, height:34, display:'flex', alignItems:'center', justifyContent:'center', borderRadius:8, border:'none', cursor:'pointer', backgroundColor:!viewGrid?C.ink:'#e8efec', color:!viewGrid?'white':C.ink }}>☰</button>
            </div>
          </div>
        </div>

        <div style={{ display:'flex', gap:8, marginBottom:28, flexWrap:'wrap' as const }}>
          {[
            { emoji:'✨', label:'New Arrivals', active:true },
            { emoji:'📉', label:'Price Drop Alert', active:false },
          ].map(chip=>(
            <button key={chip.label} style={{ display:'flex', alignItems:'center', gap:6, padding:'8px 16px', borderRadius:100, fontSize:12, fontWeight:700, cursor:'pointer', border:chip.active?'none':'1px solid rgba(186,202,197,0.5)', backgroundColor:chip.active?C.ink:'white', color:chip.active?'white':'#3c4a46' }}>
              {chip.emoji} {chip.label}
            </button>
          ))}
        </div>

        <section style={{ marginBottom:48 }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:20 }}>
            <h2 style={{ ...UB, fontSize:13, color:C.ink, textTransform:'uppercase' as const, letterSpacing:'0.1em' }}>FEATURED PREMIUM CAR TECH</h2>
            <Link href={`/${locale}/electronics`} style={{ color:C.mint, fontWeight:700, fontSize:13, textDecoration:'none', display:'flex', alignItems:'center', gap:4 }}>View all Featured <ChevronRight size={14} /></Link>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:20 }}>
            {displayFeatured.map(item=><ListingCard key={item.id} item={item} locale={locale} />)}
          </div>
        </section>

        <section style={{ marginBottom:48 }}>
          <div style={{ position:'relative', height:220, borderRadius:40, overflow:'hidden', cursor:'pointer', boxShadow:'0 20px 60px rgba(0,0,0,0.15)' }}>
            <img src={IMGS.immo} alt="Immo Pro" style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover' }} />
            <div style={{ position:'absolute', inset:0, background:'linear-gradient(to right,rgba(22,29,27,0.92) 0%,rgba(22,29,27,0.5) 60%,transparent)' }} />
            <div style={{ position:'absolute', inset:0, display:'flex', flexDirection:'column' as const, justifyContent:'center', padding:'0 56px' }}>
              <span style={{ backgroundColor:C.mint, color:'white', fontSize:9, ...UB, padding:'4px 14px', borderRadius:100, textTransform:'uppercase' as const, letterSpacing:'0.12em', display:'inline-block', marginBottom:14, width:'fit-content' }}>SouKni Auto Pro</span>
              <h2 style={{ ...UB, fontSize:'clamp(20px,3vw,32px)', color:'white', marginBottom:20, lineHeight:1.1 }}>Certified installers.<br/>Guaranteed fit.</h2>
              <Link href={`/${locale}/motors`} style={{ textDecoration:'none' }}>
                <button style={{ backgroundColor:'white', color:C.ink, border:'none', padding:'11px 28px', borderRadius:100, fontSize:12, ...UB, cursor:'pointer' }}>Explore Pro Deals</button>
              </Link>
            </div>
          </div>
        </section>

        <section style={{ marginBottom:48 }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:20 }}>
            <h2 style={{ ...UB, fontSize:22, color:C.mint }}>Exclusive Car Tech Collection</h2>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:16 }}>
            {displayExclusive.map(item=><ListingCard key={item.id} item={item} locale={locale} compact />)}
          </div>
        </section>

        <section style={{ marginBottom:48 }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:20 }}>
            <h2 style={{ ...UB, fontSize:20, color:C.ink }}>Pro Car Tech Discoveries</h2>
          </div>
          <div style={{ display:'flex', flexDirection:'column' as const, gap:16 }}>
            {[displayDiscovery.slice(0,4), displayDiscovery.slice(4,8), displayDiscovery.slice(8,12)].map((row,ri)=>(
              <div key={ri} style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:16 }}>
                {row.map(item=><ListingCard key={item.id} item={item} locale={locale} compact />)}
              </div>
            ))}
          </div>
        </section>

        <div style={{ display:'flex', justifyContent:'center', alignItems:'center', gap:8, marginBottom:56 }}>
          {[1,2,3,4].map(p=>(
            <button key={p} onClick={()=>setPage(p)}
              style={{ width:36, height:36, borderRadius:10, border:page===p?'none':'1px solid #e2e8f0', backgroundColor:page===p?C.mint:'white', color:page===p?'white':C.ink, fontWeight:700, fontSize:13, cursor:'pointer' }}>
              {p}
            </button>
          ))}
        </div>

        <section style={{ position:'relative', borderRadius:40, overflow:'hidden', marginBottom:40 }}>
          <img src={IMGS.hero} alt="Diamond" style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover' }} />
          <div style={{ position:'absolute', inset:0, background:'linear-gradient(135deg,rgba(15,23,42,0.96),rgba(15,23,42,0.7))' }} />
          <div style={{ position:'relative', zIndex:1, padding:'56px 64px', maxWidth:640 }}>
            <h2 style={{ ...UB, fontSize:'clamp(28px,4vw,48px)', color:'white', marginBottom:16, lineHeight:1.05 }}>Become a SouKni Diamond Member.</h2>
            <p style={{ fontSize:15, color:'rgba(255,255,255,0.72)', lineHeight:1.7, marginBottom:28 }}>Unlock priority listings, verified badge, and exclusive buyer access.</p>
            <Link href={`/${locale}/diamond`} style={{ textDecoration:'none' }}>
              <button style={{ backgroundColor:C.mint, color:'white', border:'none', padding:'13px 28px', borderRadius:100, fontSize:13, ...UB, cursor:'pointer' }}>Get Verified Now</button>
            </Link>
          </div>
        </section>

        <section style={{ borderRadius:40, background:'linear-gradient(135deg,#22d4a8,#0f9b8e)', padding:'56px 64px', display:'flex', alignItems:'center', justifyContent:'space-between', gap:40, flexWrap:'wrap' as const }}>
          <div>
            <h2 style={{ ...UB, fontSize:'clamp(28px,4vw,44px)', color:'white', marginBottom:12, lineHeight:1.05 }}>SELL YOUR CAR TECH TODAY</h2>
            <p style={{ fontSize:15, color:'rgba(255,255,255,0.85)', maxWidth:480, lineHeight:1.7 }}>Post for free and reach millions of buyers across Morocco.</p>
          </div>
          <Link href={`/${locale}/post-ad`} style={{ textDecoration:'none' }}>
            <span style={{ display:'inline-block', backgroundColor:'white', color:C.mint, padding:'16px 36px', borderRadius:100, fontWeight:900, fontSize:14, cursor:'pointer', whiteSpace:'nowrap' as const, ...UB }}>Post Free Ad →</span>
          </Link>
        </section>

      </div>
    </div>
  )
}
