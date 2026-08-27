'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { Search, ChevronRight, Heart } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useMarket } from '@/context/MarketContext'
import { useDictionary } from '@/lib/useDictionary'
import WhatsAppButton from '@/components/ui/WhatsAppButton'

const C = { mint:'#22d4a8', mintDk:'#0f9b8e', ink:'#161d1b', surface:'#f4fbf8', muted:'#6b7a76' }
const UB = { fontFamily:"'Inter',sans-serif", fontWeight:900, letterSpacing:'-0.05em' } as const

// categories array moved inside component to support translation

const usedCars = [
  { id:'uc1', title: 'BMW M4 Competition',        price: 785000,  location: 'Casablanca', time: 'Just now',    badge: 'diamond', year: '2023', km: '12,500 km', image: 'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&w=600' },
  { id:'uc2', title: 'Land Rover Defender 110',    price: 1200000, location: 'Rabat',      time: '1 hour ago',  badge: 'diamond', year: '2024', km: '2,100 km',  image: 'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&w=600' },
  { id:'uc3', title: 'Porsche Cayenne Turbo',      price: 980000,  location: 'Marrakech',  time: '2 hours ago', badge: 'diamond', year: '2023', km: '8,200 km',  image: 'https://images.pexels.com/photos/1638459/pexels-photo-1638459.jpeg?auto=compress&w=600' },
  { id:'uc4', title: 'Mercedes-Benz GLE 63S',      price: 1100000, location: 'Tangier',    time: '3 hours ago', badge: 'verified', year: '2022', km: '22,000 km', image: 'https://images.pexels.com/photos/120049/pexels-photo-120049.jpeg?auto=compress&w=600' },
]

const rentalCars = [
  { id:'rc1', title: 'Range Rover Vogue',   price: 2500, location: 'Casablanca', time: 'Just now',    badge: 'diamond', year: '2024', km: '/day', image: 'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&w=600' },
  { id:'rc2', title: 'Porsche 911 Carrera', price: 4800, location: 'Marrakech',  time: '1 hour ago',  badge: 'diamond', year: '2023', km: '/day', image: 'https://images.pexels.com/photos/1638459/pexels-photo-1638459.jpeg?auto=compress&w=600' },
  { id:'rc3', title: 'Tesla Model S Plaid', price: 3500, location: 'Rabat',      time: '2 hours ago', badge: 'diamond', year: '2024', km: '/day', image: 'https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg?auto=compress&w=600' },
  { id:'rc4', title: 'Lamborghini Urus',    price: 9200, location: 'Casablanca', time: '3 hours ago', badge: 'diamond', year: '2024', km: '/day', image: 'https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg?auto=compress&w=600' },
]

const motorcycles = [
  { id:'mt1', title: 'Ducati Panigale V4',        price: 245000, location: 'Casablanca', time: '1 hour ago',  badge: 'diamond',  year: '2023', km: '1,200 km',  image: 'https://images.pexels.com/photos/2607554/pexels-photo-2607554.jpeg?auto=compress&w=600' },
  { id:'mt2', title: 'Harley Davidson Iron 883',  price: 115000, location: 'Rabat',      time: '2 hours ago', badge: 'verified', year: '2021', km: '8,500 km',  image: 'https://images.pexels.com/photos/1413412/pexels-photo-1413412.jpeg?auto=compress&w=600' },
  { id:'mt3', title: 'BMW R 1250 GS',             price: 185000, location: 'Marrakech',  time: '3 hours ago', badge: 'verified', year: '2022', km: '12,000 km', image: 'https://images.pexels.com/photos/1715193/pexels-photo-1715193.jpeg?auto=compress&w=600' },
  { id:'mt4', title: 'KTM 1290 Super Duke R',     price: 245000, location: 'Tangier',    time: 'Just now',    badge: 'diamond',  year: '2024', km: '0 km',      image: 'https://images.pexels.com/photos/2519374/pexels-photo-2519374.jpeg?auto=compress&w=600' },
]

// Extra section before final banners
const truckVans = [
  { id:'tv1', title: 'Mercedes Sprinter Cargo',   price: 420000, location: 'Casablanca', time: '30 min ago',  badge: 'diamond',  year: '2023', km: '15,000 km', image: 'https://images.pexels.com/photos/2199293/pexels-photo-2199293.jpeg?auto=compress&w=600' },
  { id:'tv2', title: 'Ford Transit Custom',       price: 285000, location: 'Rabat',      time: '2 hours ago', badge: 'verified', year: '2022', km: '32,000 km', image: 'https://images.pexels.com/photos/2199293/pexels-photo-2199293.jpeg?auto=compress&w=600' },
  { id:'tv3', title: 'Massey Ferguson Tractor',   price: 380000, location: 'Meknès',     time: '5 hours ago', badge: 'diamond',  year: '2021', km: '1,200 hrs', image: 'https://images.pexels.com/photos/1595109/pexels-photo-1595109.jpeg?auto=compress&w=600' },
  { id:'tv4', title: 'Volkswagen Crafter Van',    price: 310000, location: 'Tangier',    time: '1 day ago',   badge: 'verified', year: '2022', km: '28,500 km', image: 'https://images.pexels.com/photos/2199293/pexels-photo-2199293.jpeg?auto=compress&w=600' },
]

type MotorItem = typeof usedCars[0]

function ListingCard({ item, locale, t }: { item: MotorItem; locale: string; t: any }) {
  const [saved, setSaved] = useState(false)
  const [hovered, setHovered] = useState(false)
  const { formatPrice } = useMarket()
  return (
    <Link href={`/${locale}/listing/${item.id}`} style={{ textDecoration: 'none' }}>
      <article onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
        style={{ backgroundColor: 'white', borderRadius: '24px', overflow: 'hidden', border: `1px solid ${hovered ? C.mint : 'rgba(186,202,197,0.2)'}`, boxShadow: hovered ? '0 20px 48px rgba(0,0,0,0.12)' : '0 2px 8px rgba(0,0,0,0.04)', transition: 'all 0.3s', cursor: 'pointer' }}>
        <div style={{ position: 'relative', aspectRatio: '4/3', overflow: 'hidden' }}>
          <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s', transform: hovered ? 'scale(1.06)' : 'scale(1)' }} />
          {item.badge === 'diamond' && (
            <span style={{ position: 'absolute', top: '10px', left: '10px', background: `linear-gradient(135deg, ${C.mint}, ${C.mintDk})`, color: 'white', fontSize: '8px', fontWeight: 900, padding: '3px 10px', borderRadius: '100px', textTransform: 'uppercase', letterSpacing: '0.07em' }}>💎 {t.common.diamond}</span>
          )}
          {item.badge === 'verified' && (
            <span style={{ position: 'absolute', top: '10px', left: '10px', backgroundColor: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(8px)', color: C.mint, fontSize: '8px', fontWeight: 900, padding: '3px 10px', borderRadius: '100px', textTransform: 'uppercase', letterSpacing: '0.07em' }}>✓ {t.common.verified}</span>
          )}
          <button onClick={e => { e.preventDefault(); setSaved(!saved) }} style={{ position: 'absolute', top: '10px', right: '10px', width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <Heart size={14} color={saved ? '#ef4444' : 'white'} fill={saved ? '#ef4444' : 'none'} />
          </button>
        </div>
        <div style={{ padding: '16px 18px' }}>
          <h3 style={{ fontFamily:"'Hanken Grotesk',sans-serif", fontWeight: 900, letterSpacing: '-0.03em', fontSize: '14px', color: C.ink, marginBottom: '8px', lineHeight: 1.3, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.title}</h3>
          <div style={{ display: 'flex', gap: '14px', padding: '10px 0', borderTop: '1px solid #f1f5f9', borderBottom: '1px solid #f1f5f9', marginBottom: '10px' }}>
            <div><p style={{ fontSize: '9px', textTransform: 'uppercase', color: '#94a3b8', marginBottom: '2px' }}>{t.common.year}</p><p style={{ fontSize: '12px', fontWeight: 700, color: C.ink }}>{item.year}</p></div>
            <div><p style={{ fontSize: '9px', textTransform: 'uppercase', color: '#94a3b8', marginBottom: '2px' }}>{t.common.mileage}</p><p style={{ fontSize: '12px', fontWeight: 700, color: C.ink }}>{item.km}</p></div>
          </div>
          <div style={{ fontFamily:"'Hanken Grotesk',sans-serif", fontWeight: 900, letterSpacing: '-0.03em', fontSize: '18px', color: C.mint, marginBottom: '8px' }}>{formatPrice(item.price)}</div>
          <p style={{ fontSize: '11px', color: C.muted, marginBottom: '12px' }}>📍 {item.location} • {item.time}</p>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button onClick={e => e.preventDefault()} style={{ flex: 1, backgroundColor: C.surface, color: '#3c4a46', border: 'none', padding: '9px', borderRadius: '100px', fontWeight: 700, fontSize: '12px', cursor: 'pointer' }}>{t.common.chat}</button>
            <WhatsAppButton phone={(item as any).phone} title={item.title} style={{ flex: 1, padding: '9px', borderRadius: '100px', fontWeight: 700, fontSize: '12px' }}>💬 {t.common.whatsapp}</WhatsAppButton>
          </div>
        </div>
      </article>
    </Link>
  )
}

export default function MotorsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = React.use(params)
  const router = useRouter()
  const t = useDictionary(locale)
  const categories = [
    { slug:'cars',            label:t.motors.catUsedCars,      count:'24,180', emoji:'🚗', image:'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&w=600' },
    { slug:'new-cars',        label:t.motors.catNewCars,        count:'1,540',  emoji:'🆕', image:'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&w=600' },
    { slug:'rental',          label:t.motors.catRental,         count:'1,840',  emoji:'🔑', image:'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&w=600' },
    { slug:'accessories',     label:t.motors.catAccessories,    count:'3,215',  emoji:'🔧', image:'https://images.pexels.com/photos/1149831/pexels-photo-1149831.jpeg?auto=compress&w=600' },
    { slug:'motorcycles',     label:t.motors.catMotorcycles,    count:'642',    emoji:'🏍️', image:'https://images.pexels.com/photos/2607554/pexels-photo-2607554.jpeg?auto=compress&w=600' },
    { slug:'trucks-vans',     label:t.motors.catTrucksVans,     count:'195',    emoji:'🚚', image:'https://images.pexels.com/photos/2199293/pexels-photo-2199293.jpeg?auto=compress&w=600' },
    { slug:'heavy-vehicles',  label:t.motors.catHeavyVehicles,  count:'84',     emoji:'🚜', image:'https://images.pexels.com/photos/1595109/pexels-photo-1595109.jpeg?auto=compress&w=600' },
    { slug:'car-services',    label:t.motors.catCarServices,    count:'1,120',  emoji:'🛠️', image:'https://images.pexels.com/photos/3807386/pexels-photo-3807386.jpeg?auto=compress&w=600' },
  ]
  const [keyword, setKeyword] = useState('')
  const [city, setCity] = useState('')
  const [hovCat, setHovCat] = useState<string|null>(null)

  function goSearch() {
    const params = new URLSearchParams()
    if (keyword) params.set('q', keyword)
    if (city) params.set('city', city)
    router.push(`/${locale}/motors/cars${params.toString() ? '?' + params.toString() : ''}`)
  }

  return (
    <div style={{ fontFamily:"'Inter',sans-serif", backgroundColor:C.surface, minHeight:'100vh' }}>

      {/* CINEMATIC HERO */}
      <section style={{ position:'relative', height:520, overflow:'hidden', display:'flex', alignItems:'center', justifyContent:'center' }}>
        <img src="https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&w=1600" alt="Motors"
          style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover' }} />
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top,rgba(15,23,42,0.88),rgba(15,23,42,0.32))' }} />
        <div style={{ position:'relative', zIndex:10, textAlign:'center', padding:'0 24px', maxWidth:760, width:'100%' }}>
          <p style={{ fontSize:11, fontWeight:800, color:C.mint, textTransform:'uppercase' as const, letterSpacing:'0.2em', marginBottom:16 }}>{t.motors.badge}</p>
          <h1 style={{ ...UB, fontSize:'clamp(36px,6vw,68px)', color:'white', lineHeight:1.0, marginBottom:20, textTransform:'uppercase' as const }}>
            {t.motors.heroLine1}<br />{t.motors.heroLine2}<br />{t.motors.heroLine3}
          </h1>
          <p style={{ fontSize:16, color:'rgba(255,255,255,0.75)', marginBottom:32, maxWidth:520, margin:'0 auto 32px' }}>
            {t.motors.heroSubtitle}
          </p>
          <div style={{ display:'flex', alignItems:'stretch', backgroundColor:'rgba(255,255,255,0.12)', backdropFilter:'blur(24px)', border:'1px solid rgba(255,255,255,0.25)', borderRadius:100, overflow:'hidden', maxWidth:680, margin:'0 auto', boxShadow:'0 8px 32px rgba(0,0,0,0.2)' }}>
            <div style={{ display:'flex', flexDirection:'column' as const, padding:'14px 22px', flex:'0 0 160px', borderRight:'1px solid rgba(255,255,255,0.2)', gap:2 }}>
              <span style={{ fontSize:9, fontWeight:800, color:'rgba(255,255,255,0.55)', textTransform:'uppercase' as const, letterSpacing:'0.12em' }}>{t.common.city}</span>
              <input value={city} onChange={e=>setCity(e.target.value)} placeholder={t.locations.allMorocco} style={{ backgroundColor:'transparent', border:'none', outline:'none', fontSize:14, fontWeight:600, color:'white', fontFamily:"'Inter',sans-serif", padding:0 }} />
            </div>
            <div style={{ display:'flex', flexDirection:'column' as const, padding:'14px 22px', flex:1, borderRight:'1px solid rgba(255,255,255,0.2)', gap:2 }}>
              <span style={{ fontSize:9, fontWeight:800, color:'rgba(255,255,255,0.55)', textTransform:'uppercase' as const, letterSpacing:'0.12em' }}>{t.common.keyword}</span>
              <input value={keyword} onChange={e=>setKeyword(e.target.value)} onKeyDown={e=>e.key==='Enter'&&goSearch()} placeholder={t.motors.keywordPlaceholder} style={{ backgroundColor:'transparent', border:'none', outline:'none', fontSize:14, fontWeight:600, color:'white', fontFamily:"'Inter',sans-serif", padding:0, width:'100%' }} />
            </div>
            <button onClick={goSearch} style={{ backgroundColor:C.mint, color:'white', border:'none', padding:'0 32px', fontWeight:800, fontSize:14, cursor:'pointer', flexShrink:0, transition:'background 0.15s', display:'flex', alignItems:'center', gap:8 }}
              onMouseEnter={e=>e.currentTarget.style.backgroundColor=C.mintDk}
              onMouseLeave={e=>e.currentTarget.style.backgroundColor=C.mint}>
              <Search size={16} /> {t.common.search}
            </button>
          </div>
        </div>
      </section>

      {/* ADVANCED FILTER BAR — right under hero */}
      <div style={{ maxWidth:1440, margin:'-26px auto 0', padding:'0 40px', position:'relative', zIndex:30 }}>
        <div style={{ backgroundColor:'rgba(255,255,255,0.95)', backdropFilter:'blur(20px)', borderRadius:100, padding:'8px 8px 8px 0', boxShadow:'0 8px 40px rgba(0,0,0,0.10)', border:'1px solid rgba(255,255,255,0.7)', display:'flex', alignItems:'center' }}>
          {[
            { label:t.common.city, val:'Rabat', w:1 },
            { label:t.common.keyword, val:t.motors.keywordPlaceholder, w:2 },
            { label:t.common.category, val:t.common.allMotors, w:1 },
            { label:t.common.price, val:t.common.selectRange, w:1 },
          ].map((f,i)=>(
            <div key={f.label} style={{ flex:f.w, padding:'8px 20px', borderRight:i<3?'1px solid rgba(186,202,197,0.25)':'none', display:'flex', flexDirection:'column' as const, cursor:'pointer', gap:1 }}>
              <span style={{ fontSize:9, textTransform:'uppercase' as const, fontWeight:700, color:C.muted, letterSpacing:'0.1em' }}>{f.label}</span>
              <span style={{ fontSize:13, fontWeight:600, color:C.ink }}>{f.val}</span>
            </div>
          ))}
          <button style={{ backgroundColor:C.mint, color:'white', border:'none', padding:'12px 24px', borderRadius:100, cursor:'pointer', fontWeight:700, fontSize:13, flexShrink:0, marginLeft:8, display:'flex', alignItems:'center', gap:6 }}>
            <Search size={15} /> {t.common.search.toUpperCase()}
          </button>
        </div>
      </div>

      <div style={{ maxWidth:1440, margin:'48px auto 0', padding:'0 40px 80px' }}>

        {/* BREADCRUMB */}
        <nav style={{ display:'flex', alignItems:'center', gap:6, fontSize:11, fontWeight:700, color:C.muted, textTransform:'uppercase' as const, letterSpacing:'0.06em', marginBottom:32 }}>
          <Link href={`/${locale}`} style={{ color:C.muted, textDecoration:'none' }}>{t.common.home}</Link><span>›</span>
          <span style={{ color:C.ink }}>{t.motors.badge}</span>
        </nav>

        {/* CATEGORY GRID */}
        <section style={{ marginBottom:64 }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:24 }}>
            <h2 style={{ ...UB, fontSize:28, color:C.ink }}>{t.common.browseByCategory}</h2>
            <span style={{ fontSize:14, color:C.muted }}>32,816 {t.common.totalListings}</span>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:16 }}>
            {categories.map(cat=>(
              <Link key={cat.slug} href={`/${locale}/motors/${cat.slug}`} style={{ textDecoration:'none' }}>
                <div onMouseEnter={()=>setHovCat(cat.slug)} onMouseLeave={()=>setHovCat(null)}
                  style={{ position:'relative', borderRadius:24, overflow:'hidden', cursor:'pointer', transition:'transform 0.2s, box-shadow 0.2s', transform:hovCat===cat.slug?'scale(1.02)':'scale(1)', boxShadow:hovCat===cat.slug?'0 20px 48px rgba(0,0,0,0.15)':'0 2px 8px rgba(0,0,0,0.06)' }}>
                  <div style={{ aspectRatio:'4/3', overflow:'hidden' }}>
                    <img src={cat.image} alt={cat.label} style={{ width:'100%', height:'100%', objectFit:'cover', transition:'transform 0.5s', transform:hovCat===cat.slug?'scale(1.08)':'scale(1)' }} />
                  </div>
                  <div style={{ position:'absolute', inset:0, background:hovCat===cat.slug?'linear-gradient(to top,rgba(34,212,168,0.75),rgba(0,0,0,0.1))':'linear-gradient(to top,rgba(0,0,0,0.72),rgba(0,0,0,0.05))' }} />
                  <div style={{ position:'absolute', bottom:0, left:0, right:0, padding:'16px 18px' }}>
                    <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                      <div>
                        <p style={{ ...UB, fontSize:15, color:'white', marginBottom:3 }}>{cat.label}</p>
                        <p style={{ fontSize:11, color:'rgba(255,255,255,0.8)', fontWeight:600 }}>{cat.count} {t.common.ads}</p>
                      </div>
                      <div style={{ width:36, height:36, borderRadius:'50%', backgroundColor:'rgba(255,255,255,0.2)', backdropFilter:'blur(8px)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:18 }}>
                        {cat.emoji}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* AUTO PRO BANNER */}
        <section style={{ marginBottom:64 }}>
          <div style={{ position:'relative', height:220, borderRadius:40, overflow:'hidden', cursor:'pointer', boxShadow:'0 20px 60px rgba(0,0,0,0.15)' }}>
            <img src="https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&w=1200" alt="Auto Pro"
              style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover' }} />
            <div style={{ position:'absolute', inset:0, background:'linear-gradient(to right,rgba(22,29,27,0.92) 0%,rgba(22,29,27,0.5) 60%,transparent)' }} />
            <div style={{ position:'absolute', inset:0, display:'flex', flexDirection:'column' as const, justifyContent:'center', padding:'0 56px' }}>
              <span style={{ backgroundColor:'#8d4f00', color:'white', fontSize:9, ...UB, padding:'4px 14px', borderRadius:100, textTransform:'uppercase' as const, letterSpacing:'0.12em', display:'inline-block', marginBottom:14, width:'fit-content' }}>{t.motors.autoProBadge}</span>
              <h2 style={{ ...UB, fontSize:'clamp(20px,3vw,32px)', color:'white', marginBottom:20, lineHeight:1.1 }}>{t.motors.autoProTitle}<br/>{t.motors.autoProTitle2}</h2>
              <div style={{ display:'flex', gap:12 }}>
                <Link href={`/${locale}/diamond`} style={{ textDecoration:'none' }}>
                  <button style={{ backgroundColor:'white', color:C.ink, border:'none', padding:'11px 28px', borderRadius:100, fontSize:12, ...UB, cursor:'pointer' }}>{t.common.getCertified}</button>
                </Link>
                <button style={{ backgroundColor:'transparent', color:'white', border:'1px solid rgba(255,255,255,0.4)', padding:'11px 28px', borderRadius:100, fontSize:12, fontWeight:700, cursor:'pointer' }}>{t.common.contactExpert}</button>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURED USED CARS */}
        <section style={{ marginBottom:64 }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:24 }}>
            <h2 style={{ ...UB, fontSize:28, color:C.ink }}>{t.motors.featuredUsedCars}</h2>
            <Link href={`/${locale}/motors/cars`} style={{ color:C.mint, fontWeight:700, fontSize:13, textDecoration:'none', display:'flex', alignItems:'center', gap:4 }}>
              {t.common.viewAll} <ChevronRight size={14} />
            </Link>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:20 }}>
            {usedCars.map(item => <ListingCard key={item.id} item={item} locale={locale} t={t} />)}
          </div>
        </section>

        {/* PROPERTY CROSS-PROMO BANNER */}
        <section style={{ marginBottom:64 }}>
          <div style={{ position:'relative', height:220, borderRadius:40, overflow:'hidden', cursor:'pointer', boxShadow:'0 20px 60px rgba(0,0,0,0.15)' }}>
            <img src="https://images.pexels.com/photos/2581922/pexels-photo-2581922.jpeg?auto=compress&w=1200" alt="Property"
              style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover' }} />
            <div style={{ position:'absolute', inset:0, background:'linear-gradient(to right,rgba(22,29,27,0.92) 0%,rgba(22,29,27,0.5) 60%,transparent)' }} />
            <div style={{ position:'absolute', inset:0, display:'flex', flexDirection:'column' as const, justifyContent:'center', padding:'0 56px' }}>
              <span style={{ backgroundColor:C.mint, color:'white', fontSize:9, ...UB, padding:'4px 14px', borderRadius:100, textTransform:'uppercase' as const, letterSpacing:'0.12em', display:'inline-block', marginBottom:14, width:'fit-content' }}>{t.motors.immoProBadge}</span>
              <h2 style={{ ...UB, fontSize:'clamp(20px,3vw,32px)', color:'white', marginBottom:20, lineHeight:1.1 }}>{t.motors.immoProTitle}<br/>{t.motors.immoProTitle2}</h2>
              <div style={{ display:'flex', gap:12 }}>
                <Link href={`/${locale}/property`} style={{ textDecoration:'none' }}>
                  <button style={{ backgroundColor:'white', color:C.ink, border:'none', padding:'11px 28px', borderRadius:100, fontSize:12, ...UB, cursor:'pointer' }}>{t.motors.exploreProperties}</button>
                </Link>
                <button style={{ backgroundColor:'transparent', color:'white', border:'1px solid rgba(255,255,255,0.4)', padding:'11px 28px', borderRadius:100, fontSize:12, fontWeight:700, cursor:'pointer' }}>{t.common.contactExpert}</button>
              </div>
            </div>
          </div>
        </section>

        {/* RENTAL CARS */}
        <section style={{ marginBottom:64 }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:24 }}>
            <h2 style={{ ...UB, fontSize:28, color:C.ink }}>{t.motors.rentalCars}</h2>
            <Link href={`/${locale}/motors/rental`} style={{ color:C.mint, fontWeight:700, fontSize:13, textDecoration:'none', display:'flex', alignItems:'center', gap:4 }}>
              {t.common.viewAll} <ChevronRight size={14} />
            </Link>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:20 }}>
            {rentalCars.map(item => <ListingCard key={item.id} item={item} locale={locale} t={t} />)}
          </div>
        </section>

        {/* TRENDING SEARCHES */}
        <section style={{ marginBottom:64 }}>
          <h2 style={{ ...UB, fontSize:22, color:C.ink, marginBottom:20 }}>{t.motors.trendingTitle}</h2>
          <div style={{ display:'flex', gap:10, flexWrap:'wrap' as const }}>
            {['BMW M4','Land Rover Defender','Porsche Cayenne','Dacia Duster','Tesla Model S','Harley Davidson','Range Rover','Mercedes GLE','KTM Duke','Ford Transit','Ducati Panigale','Toyota Hilux'].map(tag=>(
              <Link key={tag} href={`/${locale}/motors/cars`} style={{ textDecoration:'none' }}>
                <span style={{ display:'inline-block', padding:'9px 18px', borderRadius:100, fontSize:13, fontWeight:700, backgroundColor:'white', color:C.ink, border:'1px solid rgba(186,202,197,0.4)', cursor:'pointer', transition:'all 0.15s' }}
                  onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.backgroundColor=C.mint;(e.currentTarget as HTMLElement).style.color='white'}}
                  onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.backgroundColor='white';(e.currentTarget as HTMLElement).style.color=C.ink}}>
                  {tag}
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* MOTORCYCLES & SCOOTERS */}
        <section style={{ marginBottom:64 }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:24 }}>
            <h2 style={{ ...UB, fontSize:28, color:C.ink }}>{t.motors.motorcycles}</h2>
            <Link href={`/${locale}/motors/motorcycles`} style={{ color:C.mint, fontWeight:700, fontSize:13, textDecoration:'none', display:'flex', alignItems:'center', gap:4 }}>
              {t.common.viewAll} <ChevronRight size={14} />
            </Link>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:20 }}>
            {motorcycles.map(item => <ListingCard key={item.id} item={item} locale={locale} t={t} />)}
          </div>
        </section>

        {/* TRUCKS, VANS & HEAVY VEHICLES — extra section before final banners */}
        <section style={{ marginBottom:64 }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:24 }}>
            <h2 style={{ ...UB, fontSize:28, color:C.ink }}>{t.motors.trucksVans}</h2>
            <Link href={`/${locale}/motors/trucks-vans`} style={{ color:C.mint, fontWeight:700, fontSize:13, textDecoration:'none', display:'flex', alignItems:'center', gap:4 }}>
              {t.common.viewAll} <ChevronRight size={14} />
            </Link>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:20 }}>
            {truckVans.map(item => <ListingCard key={item.id} item={item} locale={locale} t={t} />)}
          </div>
        </section>

        {/* DIAMOND BANNER */}
        <section style={{ position:'relative', borderRadius:40, overflow:'hidden', marginBottom:48 }}>
          <img src="https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&w=1600" alt="Diamond"
            style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover' }} />
          <div style={{ position:'absolute', inset:0, background:'linear-gradient(135deg,rgba(15,23,42,0.96),rgba(15,23,42,0.7))' }} />
          <div style={{ position:'relative', zIndex:1, padding:'56px 64px', maxWidth:640 }}>
            <span style={{ display:'inline-flex', alignItems:'center', gap:6, background:`linear-gradient(135deg,${C.mint},${C.mintDk})`, color:'white', fontSize:9, ...UB, padding:'5px 16px', borderRadius:100, textTransform:'uppercase' as const, letterSpacing:'0.12em', marginBottom:20 }}>{t.common.diamondBadge}</span>
            <h2 style={{ ...UB, fontSize:'clamp(28px,4vw,48px)', color:'white', marginBottom:16, lineHeight:1.05 }}>{t.motors.diamondTitle}</h2>
            <p style={{ fontSize:15, color:'rgba(255,255,255,0.72)', lineHeight:1.7, marginBottom:28 }}>{t.motors.diamondSubtitle}</p>
            <div style={{ display:'flex', gap:12 }}>
              <Link href={`/${locale}/diamond`} style={{ textDecoration:'none' }}>
                <button style={{ backgroundColor:C.mint, color:'white', border:'none', padding:'13px 28px', borderRadius:100, fontSize:13, ...UB, cursor:'pointer' }}>{t.common.getVerifiedNow}</button>
              </Link>
              <button style={{ backgroundColor:'transparent', color:'white', border:'1px solid rgba(255,255,255,0.3)', padding:'13px 28px', borderRadius:100, fontSize:13, fontWeight:700, cursor:'pointer' }}>{t.common.learnMore}</button>
            </div>
          </div>
        </section>

        {/* JOIN THE SOUKNI FAMILY */}
        <section style={{ borderRadius:40, background:`linear-gradient(135deg,${C.mint},${C.mintDk})`, padding:'56px 64px', display:'flex', alignItems:'center', justifyContent:'space-between', gap:40, flexWrap:'wrap' as const }}>
          <div>
            <h2 style={{ ...UB, fontSize:'clamp(28px,4vw,44px)', color:'white', marginBottom:12, lineHeight:1.05 }}>{t.motors.sellCarTitle}</h2>
            <p style={{ fontSize:15, color:'rgba(255,255,255,0.85)', maxWidth:480, lineHeight:1.7 }}>{t.motors.sellCarSubtitle}</p>
            <div style={{ display:'flex', gap:12, marginTop:24 }}>
              <button style={{ backgroundColor:'white', color:C.mint, border:'none', padding:'12px 24px', borderRadius:100, fontWeight:800, fontSize:13, cursor:'pointer', display:'flex', alignItems:'center', gap:8 }}>🍎 {t.common.appStore}</button>
              <button style={{ backgroundColor:'rgba(255,255,255,0.15)', color:'white', border:'1px solid rgba(255,255,255,0.4)', padding:'12px 24px', borderRadius:100, fontWeight:800, fontSize:13, cursor:'pointer', display:'flex', alignItems:'center', gap:8 }}>▶ {t.common.googlePlay}</button>
            </div>
          </div>
          <Link href={`/${locale}/post-ad`} style={{ textDecoration:'none' }}>
            <span style={{ display:'inline-block', backgroundColor:'white', color:C.mint, padding:'16px 36px', borderRadius:100, fontWeight:900, fontSize:14, cursor:'pointer', whiteSpace:'nowrap' as const, ...UB }}>{t.common.postFreeAd}</span>
          </Link>
        </section>

      </div>
    </div>
  )
}
