'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { Heart, Search, ChevronRight, ChevronLeft, MapPin, Star, Users, Wifi, Waves, TreePine, Sun, Coffee, Car } from 'lucide-react'
import Breadcrumb from '@/components/ui/Breadcrumb'
import CategoryFooterNav from '@/components/ui/CategoryFooterNav'

const C = { mint:'#22d4a8', mintDk:'#0f9b8e', ink:'#161d1b', surface:'#f4fbf8', muted:'#6b7a76' }
const UB = { fontFamily:"'Inter',sans-serif", fontWeight:900, letterSpacing:'-0.05em' } as const
const CB = { fontFamily:"'Hanken Grotesk',sans-serif", fontWeight:900, letterSpacing:'-0.03em' } as const

const STAY_CATS = [
  { label:'Apartments',    slug:'apartments-daily',  count:'2,840', emoji:'🏙️', image:'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&w=600',    vibe:'City stays & modern flats' },
  { label:'Villas',        slug:'villas-daily',      count:'1,240', emoji:'🏡', image:'https://images.pexels.com/photos/2581922/pexels-photo-2581922.jpeg?auto=compress&w=600',    vibe:'Private pools & gardens' },
  { label:'Riads',         slug:'riads-daily',       count:'680',   emoji:'🕌', image:'https://images.pexels.com/photos/440731/pexels-photo-440731.jpeg?auto=compress&w=600',      vibe:'Moroccan soul & heritage' },
  { label:'Chalets',       slug:'chalets-daily',     count:'320',   emoji:'🏔️', image:'https://images.pexels.com/photos/1458457/pexels-photo-1458457.jpeg?auto=compress&w=600',   vibe:'Mountain & Atlas escapes' },
  { label:'Hostels',       slug:'hostels-daily',     count:'480',   emoji:'🎒', image:'https://images.pexels.com/photos/1648776/pexels-photo-1648776.jpeg?auto=compress&w=600',   vibe:'Social & budget-friendly' },
  { label:'Beach Houses',  slug:'beach-houses',      count:'560',   emoji:'🏖️', image:'https://images.pexels.com/photos/2872755/pexels-photo-2872755.jpeg?auto=compress&w=600',   vibe:'Beachfront & ocean views' },
  { label:'Desert Camps',  slug:'desert-camps',      count:'180',   emoji:'🏕️', image:'https://images.pexels.com/photos/2245436/pexels-photo-2245436.jpeg?auto=compress&w=600',   vibe:'Sahara nights & stargazing' },
]

const DESTINATIONS = [
  { city:'Marrakech',    count:'1,840 stays', image:'https://images.pexels.com/photos/440731/pexels-photo-440731.jpeg?auto=compress&w=500',    tag:'Most Popular' },
  { city:'Agadir',       count:'920 stays',   image:'https://images.pexels.com/photos/2872755/pexels-photo-2872755.jpeg?auto=compress&w=500',  tag:'Beach Escape' },
  { city:'Merzouga',     count:'180 stays',   image:'https://images.pexels.com/photos/2245436/pexels-photo-2245436.jpeg?auto=compress&w=500',  tag:'Desert Magic' },
  { city:'Ifrane',       count:'210 stays',   image:'https://images.pexels.com/photos/1458457/pexels-photo-1458457.jpeg?auto=compress&w=500',  tag:'Mountain Air' },
  { city:'Chefchaouen',  count:'340 stays',   image:'https://images.pexels.com/photos/1268871/pexels-photo-1268871.jpeg?auto=compress&w=500',  tag:'The Blue City' },
  { city:'Essaouira',    count:'280 stays',   image:'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&w=500',  tag:'Wind & Waves' },
]

const AMENITY_FILTERS = [
  { key:'pool',    label:'Swimming Pool', icon:<Waves size={14}/> },
  { key:'beach',   label:'Beach Access',  icon:<Sun size={14}/> },
  { key:'wifi',    label:'Free WiFi',     icon:<Wifi size={14}/> },
  { key:'nature',  label:'Nature & Hike', icon:<TreePine size={14}/> },
  { key:'bfast',   label:'Breakfast Incl.',icon:<Coffee size={14}/> },
  { key:'parking', label:'Free Parking',  icon:<Car size={14}/> },
]

const featuredStays = [
  { id:'d1', title:'Luxury Riad with Pool — Marrakech Medina',       type:'Riad',        price:2800, per:'night', guests:8,  rating:4.9, reviews:247, location:'Marrakech Medina',   amenities:['pool','wifi','bfast'],        image:'https://images.pexels.com/photos/440731/pexels-photo-440731.jpeg?auto=compress&w=600',    badge:'Guest Favourite' },
  { id:'d2', title:'Beachfront Villa — Private Access Agadir',        type:'Villa',       price:4200, per:'night', guests:10, rating:5.0, reviews:89,  location:'Agadir, Bord de Mer', amenities:['beach','pool','parking'],     image:'https://images.pexels.com/photos/2872755/pexels-photo-2872755.jpeg?auto=compress&w=600',   badge:'SouKni Select' },
  { id:'d3', title:'Sahara Luxury Camp — Merzouga Desert',            type:'Desert Camp', price:1800, per:'night', guests:2,  rating:4.8, reviews:156, location:'Merzouga, Sahara',   amenities:['bfast','nature'],             image:'https://images.pexels.com/photos/2245436/pexels-photo-2245436.jpeg?auto=compress&w=600',   badge:'Unique Stay' },
  { id:'d4', title:'Atlas Mountain Chalet — Infinity Pool View',      type:'Chalet',      price:3500, per:'night', guests:6,  rating:4.9, reviews:124, location:'Imlil, Haut Atlas',  amenities:['pool','nature','wifi'],       image:'https://images.pexels.com/photos/1458457/pexels-photo-1458457.jpeg?auto=compress&w=600',   badge:'Guest Favourite' },
  { id:'d5', title:'Designer Penthouse — Casablanca Sea View',        type:'Apartment',   price:1600, per:'night', guests:4,  rating:4.7, reviews:312, location:'Casablanca, Corniche',amenities:['wifi','parking'],             image:'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&w=600',   badge:'Superhost' },
  { id:'d6', title:'Blue City Riad — Chefchaouen Old Town',           type:'Riad',        price:1200, per:'night', guests:4,  rating:4.8, reviews:198, location:'Chefchaouen Médina',  amenities:['wifi','bfast','nature'],      image:'https://images.pexels.com/photos/1268871/pexels-photo-1268871.jpeg?auto=compress&w=600',   badge:'Guest Favourite' },
]

const weekendPicks = [
  { id:'w1', title:'Private Beachfront Villa — 5 Min Walk Beach',     type:'Villa',       price:5800, per:'2 nights', guests:12, rating:5.0, reviews:67,  location:'Agadir, Secteur Balnéaire', amenities:['beach','pool','wifi','parking'], image:'https://images.pexels.com/photos/2581922/pexels-photo-2581922.jpeg?auto=compress&w=600', badge:'Weekend Deal' },
  { id:'w2', title:'Authentic Sahara Experience — Full Board',         type:'Desert Camp', price:2800, per:'2 nights', guests:2,  rating:4.9, reviews:143, location:'Merzouga Dunes',            amenities:['bfast','nature'],               image:'https://images.pexels.com/photos/2245436/pexels-photo-2245436.jpeg?auto=compress&w=600', badge:'Weekend Deal' },
  { id:'w3', title:'Essaouira Sea Cottage — Wind & Waves',            type:'Beach House', price:1900, per:'2 nights', guests:4,  rating:4.7, reviews:89,  location:'Essaouira, Bord de Mer',    amenities:['beach','wifi','parking'],       image:'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&w=600', badge:'Weekend Deal' },
  { id:'w4', title:'Marrakech Riad — Breakfast & Hammam Incl.',       type:'Riad',        price:3200, per:'2 nights', guests:6,  rating:5.0, reviews:211, location:'Marrakech Médina',          amenities:['bfast','pool','wifi'],          image:'https://images.pexels.com/photos/440731/pexels-photo-440731.jpeg?auto=compress&w=600', badge:'Weekend Deal' },
]

type Stay = typeof featuredStays[0]

function Stars({ rating }: { rating: number }) {
  return (
    <div style={{ display:'flex', gap:1, alignItems:'center' }}>
      {[1,2,3,4,5].map(i=>(
        <Star key={i} size={11} fill={i<=Math.round(rating)?'#f59e0b':'none'} color="#f59e0b" strokeWidth={1.5} />
      ))}
    </div>
  )
}

function AmenityTag({ amenity }: { amenity: string }) {
  const map: Record<string,string> = { pool:'🏊', beach:'🏖️', wifi:'📶', nature:'🌿', bfast:'☕', parking:'🅿️' }
  return <span style={{ fontSize:10, fontWeight:700, color:C.muted }}>{map[amenity]}</span>
}

function StayCard({ stay, locale }: { stay: Stay; locale: string }) {
  const [saved, setSaved] = useState(false)
  const [hov,   setHov  ] = useState(false)
  return (
    <Link href={`/${locale}/listing/${stay.id}`} style={{ textDecoration:'none' }}>
      <article onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
        style={{ backgroundColor:'white', borderRadius:24, overflow:'hidden', boxShadow:hov?'0 20px 48px rgba(0,0,0,0.12)':'0 2px 12px rgba(0,0,0,0.06)', border:`1px solid ${hov?C.mint:'rgba(0,0,0,0.06)'}`, transition:'all 0.3s', cursor:'pointer' }}>
        <div style={{ position:'relative', aspectRatio:'4/3', overflow:'hidden' }}>
          <img src={stay.image} alt={stay.title} style={{ width:'100%', height:'100%', objectFit:'cover', transition:'transform 0.6s', transform:hov?'scale(1.06)':'scale(1)' }} />
          <div style={{ position:'absolute', top:12, left:12 }}>
            <span style={{ backgroundColor:stay.badge==='SouKni Select'?C.ink:stay.badge==='Unique Stay'?'#7c3aed':C.mint, color:'white', fontSize:'9px', fontWeight:800, padding:'4px 10px', borderRadius:100, textTransform:'uppercase', letterSpacing:'0.07em', whiteSpace:'nowrap' }}>
              {stay.badge==='Guest Favourite'?'❤️ ':''}
              {stay.badge==='SouKni Select'?'✦ ':''}
              {stay.badge}
            </span>
          </div>
          <button onClick={e=>{e.preventDefault();setSaved(!saved)}}
            style={{ position:'absolute', top:12, right:12, width:34, height:34, borderRadius:'50%', backgroundColor:'rgba(255,255,255,0.9)', border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', boxShadow:'0 2px 8px rgba(0,0,0,0.15)' }}>
            <Heart size={16} fill={saved?'#ef4444':'none'} color={saved?'#ef4444':'#6b7a76'} />
          </button>
          <div style={{ position:'absolute', bottom:12, left:12, backgroundColor:'rgba(22,29,27,0.75)', backdropFilter:'blur(8px)', padding:'4px 10px', borderRadius:6 }}>
            <span style={{ color:'white', fontSize:'11px', fontWeight:700 }}>{stay.type}</span>
          </div>
          <div style={{ position:'absolute', bottom:12, right:12, display:'flex', gap:5 }}>
            {stay.amenities.map(a=>(
              <div key={a} style={{ width:26, height:26, borderRadius:'50%', backgroundColor:'rgba(255,255,255,0.92)', display:'flex', alignItems:'center', justifyContent:'center' }}>
                <AmenityTag amenity={a} />
              </div>
            ))}
          </div>
        </div>
        <div style={{ padding:'16px 18px' }}>
          <h3 style={{ ...CB, fontSize:'14px', color:hov?C.mint:C.ink, marginBottom:6, lineHeight:1.3, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap', transition:'color 0.2s' }}>{stay.title}</h3>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:8 }}>
            <div style={{ display:'flex', alignItems:'center', gap:5 }}>
              <MapPin size={11} color={C.muted} />
              <span style={{ fontSize:'11px', color:C.muted, fontWeight:600 }}>{stay.location}</span>
            </div>
            <div style={{ display:'flex', alignItems:'center', gap:4 }}>
              <Stars rating={stay.rating} />
              <span style={{ fontSize:'11px', color:C.muted, fontWeight:600 }}>({stay.reviews})</span>
            </div>
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:12, paddingTop:10, borderTop:'1px solid #f1f5f9', justifyContent:'space-between' }}>
            <div style={{ display:'flex', alignItems:'center', gap:6 }}>
              <Users size={12} color={C.muted} />
              <span style={{ fontSize:'11px', color:C.muted, fontWeight:600 }}>Up to {stay.guests} guests</span>
            </div>
            <div style={{ textAlign:'right' }}>
              <span style={{ ...CB, fontSize:'18px', color:C.mint }}>{stay.price.toLocaleString()} </span>
              <span style={{ fontSize:'11px', color:C.muted, fontWeight:600 }}>MAD / {stay.per}</span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  )
}

export default function DailyRentalsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale }                = React.use(params)
  const [checkin,  setCheckin ]   = useState('')
  const [checkout, setCheckout]   = useState('')
  const [guests,   setGuests  ]   = useState('2 guests')
  const [city,     setCity    ]   = useState('Anywhere in Morocco')
  const [activeAmenities, setActiveAmenities] = useState<string[]>([])
  const [hovCat,   setHovCat  ]   = useState<string|null>(null)
  const [priceMax, setPriceMax]   = useState('Any')
  const [activeTab,setActiveTab]  = useState<'featured'|'weekend'|'longweekend'>('featured')

  const cities = ['Anywhere in Morocco','Marrakech','Agadir','Casablanca','Essaouira','Chefchaouen','Merzouga','Ifrane','Fès','Tanger','Rabat','Ouarzazate']

  const toggleAmenity = (key: string) =>
    setActiveAmenities(prev => prev.includes(key) ? prev.filter(a=>a!==key) : [...prev, key])

  const baseStays = activeTab === 'weekend' ? weekendPicks : featuredStays
  const stays = baseStays.filter(s => {
    const mc = city === 'Anywhere in Morocco' || s.location.toLowerCase().includes(city.toLowerCase())
    const priceCap = /^\d/.test(priceMax) ? Number(priceMax.replace(/[^\d]/g, '')) : null
    const mp = priceCap === null || s.price <= priceCap
    return mc && mp
  })

  return (
    <div style={{ fontFamily:"'Inter',sans-serif", backgroundColor:'#fff', minHeight:'100vh' }}>

      {/* IMMERSIVE HERO — full-bleed vacation energy */}
      <section style={{ position:'relative', height:640, overflow:'hidden', display:'flex', alignItems:'center', justifyContent:'center' }}>
        <img src="https://images.pexels.com/photos/2872755/pexels-photo-2872755.jpeg?auto=compress&w=1600" alt="Vacation Rentals Morocco"
          style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover' }} />
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top, rgba(15,23,42,0.85) 0%, rgba(15,23,42,0.2) 50%, rgba(15,23,42,0.05) 100%)' }} />

        <div style={{ position:'relative', zIndex:10, textAlign:'center', padding:'0 24px', maxWidth:840, width:'100%' }}>
          <div style={{ display:'inline-flex', alignItems:'center', gap:8, backgroundColor:'rgba(255,255,255,0.15)', backdropFilter:'blur(12px)', border:'1px solid rgba(255,255,255,0.3)', borderRadius:100, padding:'8px 20px', marginBottom:24 }}>
            <Sun size={14} color={C.mint} />
            <span style={{ fontSize:12, fontWeight:800, color:'white', letterSpacing:'0.12em' }}>ESCAPE. EXPLORE. UNWIND.</span>
            <Sun size={14} color={C.mint} />
          </div>
          <h1 style={{ ...UB, fontSize:'clamp(40px,7vw,80px)', color:'white', lineHeight:0.9, marginBottom:20, textTransform:'uppercase' }}>
            YOUR PERFECT<br/><span style={{ color:C.mint }}>MOROCCAN</span><br/>GETAWAY.
          </h1>
          <p style={{ fontSize:18, color:'rgba(255,255,255,0.8)', marginBottom:40, maxWidth:540, margin:'0 auto 40px', lineHeight:1.65 }}>
            Riads, villas, desert camps & beach houses — 6,300+ unique stays across Morocco
          </p>

          {/* GLASSMORPHIC SEARCH — same as all other hub pages */}
          <div style={{ display:'flex', alignItems:'stretch', backgroundColor:'rgba(255,255,255,0.12)', backdropFilter:'blur(24px)', border:'1px solid rgba(255,255,255,0.25)', borderRadius:100, overflow:'hidden', maxWidth:680, margin:'0 auto', boxShadow:'0 8px 32px rgba(0,0,0,0.2)' }}>
            <div style={{ display:'flex', flexDirection:'column', padding:'14px 22px', flex:'0 0 160px', borderRight:'1px solid rgba(255,255,255,0.2)', gap:2 }}>
              <span style={{ fontSize:9, fontWeight:800, color:'rgba(255,255,255,0.55)', textTransform:'uppercase', letterSpacing:'0.12em' }}>Destination</span>
              <select value={city} onChange={e=>setCity(e.target.value)} style={{ backgroundColor:'transparent', border:'none', outline:'none', fontSize:14, fontWeight:700, color:'white', fontFamily:"'Inter',sans-serif", cursor:'pointer' }}>
                {cities.map(c=><option key={c} style={{ color:C.ink }}>{c}</option>)}
              </select>
            </div>
            <div style={{ display:'flex', flexDirection:'column', padding:'14px 22px', flex:1, borderRight:'1px solid rgba(255,255,255,0.2)', gap:2 }}>
              <span style={{ fontSize:9, fontWeight:800, color:'rgba(255,255,255,0.55)', textTransform:'uppercase', letterSpacing:'0.12em' }}>Keyword</span>
              <input placeholder="Riad, villa, beach house..." style={{ backgroundColor:'transparent', border:'none', outline:'none', fontSize:14, fontWeight:600, color:'white', fontFamily:"'Inter',sans-serif", padding:0 }} />
            </div>
            <button style={{ backgroundColor:C.mint, color:'white', border:'none', padding:'0 32px', fontWeight:800, fontSize:14, cursor:'pointer', flexShrink:0, transition:'background 0.15s', display:'flex', alignItems:'center', gap:8 }}
              onMouseEnter={e=>e.currentTarget.style.backgroundColor=C.mintDk}
              onMouseLeave={e=>e.currentTarget.style.backgroundColor=C.mint}>
              <Search size={16}/> Search
            </button>
          </div>
        </div>
      </section>

      {/* FILTER HUB BAR — clean 2-row design */}
      <div style={{ maxWidth:1440, margin:'-26px auto 0', padding:'0 40px', position:'relative', zIndex:30 }}>
        <div style={{ backgroundColor:'rgba(255,255,255,0.97)', backdropFilter:'blur(20px)', borderRadius:32, boxShadow:'0 8px 40px rgba(0,0,0,0.10)', border:'1px solid rgba(255,255,255,0.7)', overflow:'hidden' }}>

          {/* Row 1: main filters */}
          <div style={{ display:'flex', alignItems:'center', borderBottom:'1px solid rgba(186,202,197,0.2)' }}>
            <div style={{ flex:'0 0 160px', padding:'12px 20px', borderRight:'1px solid rgba(186,202,197,0.2)', display:'flex', flexDirection:'column', gap:1 }}>
              <span style={{ fontSize:9, textTransform:'uppercase', fontWeight:800, color:C.muted, letterSpacing:'0.1em' }}>Destination</span>
              <select value={city} onChange={e=>setCity(e.target.value)} style={{ border:'none', outline:'none', fontSize:14, fontWeight:700, color:C.ink, backgroundColor:'transparent', cursor:'pointer', fontFamily:"'Inter',sans-serif" }}>
                {cities.map(c=><option key={c}>{c}</option>)}
              </select>
            </div>
            <div style={{ flex:'0 0 148px', padding:'12px 20px', borderRight:'1px solid rgba(186,202,197,0.2)', display:'flex', flexDirection:'column', gap:1 }}>
              <span style={{ fontSize:9, textTransform:'uppercase', fontWeight:800, color:C.muted, letterSpacing:'0.1em' }}>Check-in</span>
              <input type="date" value={checkin} onChange={e=>setCheckin(e.target.value)} style={{ border:'none', outline:'none', fontSize:13, fontWeight:700, color:checkin?C.ink:C.muted, backgroundColor:'transparent', fontFamily:"'Inter',sans-serif", cursor:'pointer', width:'100%' }} />
            </div>
            <div style={{ flex:'0 0 148px', padding:'12px 20px', borderRight:'1px solid rgba(186,202,197,0.2)', display:'flex', flexDirection:'column', gap:1 }}>
              <span style={{ fontSize:9, textTransform:'uppercase', fontWeight:800, color:C.muted, letterSpacing:'0.1em' }}>Check-out</span>
              <input type="date" value={checkout} onChange={e=>setCheckout(e.target.value)} style={{ border:'none', outline:'none', fontSize:13, fontWeight:700, color:checkout?C.ink:C.muted, backgroundColor:'transparent', fontFamily:"'Inter',sans-serif", cursor:'pointer', width:'100%' }} />
            </div>
            <div style={{ flex:'0 0 140px', padding:'12px 20px', borderRight:'1px solid rgba(186,202,197,0.2)', display:'flex', flexDirection:'column', gap:1 }}>
              <span style={{ fontSize:9, textTransform:'uppercase', fontWeight:800, color:C.muted, letterSpacing:'0.1em' }}>Guests</span>
              <select value={guests} onChange={e=>setGuests(e.target.value)} style={{ border:'none', outline:'none', fontSize:14, fontWeight:700, color:C.ink, backgroundColor:'transparent', cursor:'pointer', fontFamily:"'Inter',sans-serif" }}>
                {['1 guest','2 guests','3 guests','4 guests','5 guests','6+ guests','8+ guests','10+ guests'].map(g=><option key={g}>{g}</option>)}
              </select>
            </div>
            <div style={{ flex:1, padding:'12px 20px', display:'flex', flexDirection:'column', gap:1 }}>
              <span style={{ fontSize:9, textTransform:'uppercase', fontWeight:800, color:C.muted, letterSpacing:'0.1em' }}>Max Price / Night</span>
              <select value={priceMax} onChange={e=>setPriceMax(e.target.value)} style={{ border:'none', outline:'none', fontSize:14, fontWeight:700, color:C.ink, backgroundColor:'transparent', cursor:'pointer', fontFamily:"'Inter',sans-serif" }}>
                {['Any price','500 MAD','1,000 MAD','2,000 MAD','5,000 MAD','10,000 MAD'].map(p=><option key={p}>{p}</option>)}
              </select>
            </div>
            <div style={{ padding:'8px 12px', flexShrink:0 }}>
              <button style={{ backgroundColor:C.mint, color:'white', border:'none', padding:'13px 28px', borderRadius:100, cursor:'pointer', fontWeight:800, fontSize:14, display:'flex', alignItems:'center', gap:7, whiteSpace:'nowrap' }}
                onMouseEnter={e=>e.currentTarget.style.backgroundColor=C.mintDk}
                onMouseLeave={e=>e.currentTarget.style.backgroundColor=C.mint}>
                <Search size={15}/> SEARCH
              </button>
            </div>
          </div>

          {/* Row 2: amenity filters — no emojis, clean pills */}
          <div style={{ display:'flex', alignItems:'center', gap:8, padding:'10px 20px', flexWrap:'wrap' }}>
            <span style={{ fontSize:10, fontWeight:800, color:C.muted, textTransform:'uppercase', letterSpacing:'0.1em', flexShrink:0 }}>Amenities:</span>
            {AMENITY_FILTERS.map(f=>(
              <button key={f.key} onClick={()=>toggleAmenity(f.key)}
                style={{ padding:'7px 18px', borderRadius:100, border:`1.5px solid ${activeAmenities.includes(f.key)?C.mint:'rgba(186,202,197,0.4)'}`, backgroundColor:activeAmenities.includes(f.key)?C.mint:'white', color:activeAmenities.includes(f.key)?'white':C.muted, cursor:'pointer', fontSize:12, fontWeight:700, transition:'all 0.2s', whiteSpace:'nowrap', fontFamily:"'Inter',sans-serif" }}>
                {f.label}
              </button>
            ))}
            {(activeAmenities.length > 0) && (
              <button onClick={()=>setActiveAmenities([])}
                style={{ padding:'7px 14px', borderRadius:100, border:'1.5px solid rgba(186,202,197,0.4)', backgroundColor:'white', color:C.muted, cursor:'pointer', fontSize:11, fontWeight:700, fontFamily:"'Inter',sans-serif", transition:'all 0.2s' }}
                onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.borderColor='#ef4444';(e.currentTarget as HTMLElement).style.color='#ef4444'}}
                onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.borderColor='rgba(186,202,197,0.4)';(e.currentTarget as HTMLElement).style.color=C.muted}}>
                Clear ✕
              </button>
            )}
          </div>

        </div>
      </div>

      <div style={{ maxWidth:1440, margin:'0 auto', padding:'48px 40px 80px' }}>

        {/* BREADCRUMB */}
        <Breadcrumb
          items={[
            { label:'Home',     href:`/${locale}` },
            { label:'Property', href:`/${locale}/property` },
            { label:'Daily Rentals & Vacation', href:null },
          ]}
          mutedColor={C.muted}
          inkColor={C.ink}
          style={{ fontSize:11, marginBottom:40 }}
        />

        {/* STAY TYPE GRID */}
        <section style={{ marginBottom:72 }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:28 }}>
            <div>
              <h2 style={{ ...UB, fontSize:32, color:C.ink, marginBottom:6 }}>What kind of stay?</h2>
              <p style={{ fontSize:16, color:C.muted }}>Every kind of escape — 6,300+ unique stays across Morocco</p>
            </div>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:16 }}>
            {STAY_CATS.map(cat=>(
              <Link key={cat.slug} href={`/${locale}/property/daily-rentals/${cat.slug}`} style={{ textDecoration:'none' }}>
                <div onMouseEnter={()=>setHovCat(cat.slug)} onMouseLeave={()=>setHovCat(null)}
                  style={{ position:'relative', borderRadius:24, overflow:'hidden', cursor:'pointer', transition:'transform 0.25s, box-shadow 0.25s', transform:hovCat===cat.slug?'scale(1.03)':'scale(1)', boxShadow:hovCat===cat.slug?'0 24px 56px rgba(0,0,0,0.2)':'0 4px 12px rgba(0,0,0,0.08)' }}>
                  <div style={{ aspectRatio:'4/3', overflow:'hidden' }}>
                    <img src={cat.image} alt={cat.label} style={{ width:'100%', height:'100%', objectFit:'cover', transition:'transform 0.6s', transform:hovCat===cat.slug?'scale(1.1)':'scale(1)' }} />
                  </div>
                  <div style={{ position:'absolute', inset:0, background:hovCat===cat.slug?'linear-gradient(to top,rgba(34,212,168,0.82),rgba(0,0,0,0.05))':'linear-gradient(to top,rgba(15,23,42,0.78),rgba(0,0,0,0.05))' }} />
                  <div style={{ position:'absolute', top:14, left:14 }}>
                    <span style={{ fontSize:28 }}>{cat.emoji}</span>
                  </div>
                  <div style={{ position:'absolute', bottom:0, left:0, right:0, padding:'18px 18px' }}>
                    <p style={{ ...UB, fontSize:17, color:'white', marginBottom:3 }}>{cat.label}</p>
                    <p style={{ fontSize:12, color:'rgba(255,255,255,0.75)', fontWeight:600, marginBottom:2 }}>{cat.count} stays</p>
                    <p style={{ fontSize:11, color:'rgba(255,255,255,0.55)', fontWeight:600, fontStyle:'italic' }}>{cat.vibe}</p>
                  </div>
                </div>
              </Link>
            ))}
            {/* View More */}
            <Link href={`/${locale}/property`} style={{ textDecoration:'none' }}>
              <div onMouseEnter={()=>setHovCat('more')} onMouseLeave={()=>setHovCat(null)}
                style={{ position:'relative', borderRadius:24, overflow:'hidden', cursor:'pointer', aspectRatio:'4/3', transition:'transform 0.25s, box-shadow 0.25s', transform:hovCat==='more'?'scale(1.03)':'scale(1)', boxShadow:hovCat==='more'?'0 24px 56px rgba(0,0,0,0.2)':'0 4px 12px rgba(0,0,0,0.08)', background:hovCat==='more'?`linear-gradient(135deg,${C.mint},${C.mintDk})`:C.ink, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:10 }}>
                <span style={{ fontSize:32 }}>🗺️</span>
                <p style={{ ...UB, fontSize:16, color:'white' }}>View More</p>
                <p style={{ fontSize:12, color:'rgba(255,255,255,0.6)', fontWeight:600 }}>Explore all stays</p>
              </div>
            </Link>
          </div>
        </section>

        {/* FEATURED STAYS WITH TABS */}
        <section style={{ marginBottom:72 }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:28, flexWrap:'wrap', gap:12 }}>
            <div>
              <h2 style={{ ...UB, fontSize:30, color:C.ink, marginBottom:4 }}>
                {activeTab==='featured' ? '✨ Featured Stays' : '🌙 Weekend Deals'}
              </h2>
              <p style={{ fontSize:14, color:C.muted }}>
                {activeTab==='featured' ? 'Hand-picked by our team — the best of Morocco' : '2-night packages — book now, escape soon'}
              </p>
            </div>
            <div style={{ display:'flex', gap:4, padding:'4px', backgroundColor:'#f4f4f4', borderRadius:100 }}>
              {[
                { key:'featured',    label:'Featured' },
                { key:'weekend',     label:'Weekend Deals' },
                { key:'longweekend', label:'Last Minute' },
              ].map(tab=>(
                <button key={tab.key} onClick={()=>setActiveTab(tab.key as any)}
                  style={{ padding:'9px 20px', borderRadius:100, fontSize:12, fontWeight:800, border:'none', cursor:'pointer', fontFamily:"'Inter',sans-serif", transition:'all 0.2s',
                    backgroundColor:activeTab===tab.key?C.ink:'transparent', color:activeTab===tab.key?'white':C.muted, boxShadow:activeTab===tab.key?'0 2px 8px rgba(0,0,0,0.15)':'none' }}>
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:24 }}>
            {stays.map(stay => <StayCard key={stay.id} stay={stay} locale={locale} />)}
          </div>
        </section>

        {/* DESTINATION GRID */}
        <section style={{ marginBottom:72 }}>
          <div style={{ marginBottom:28 }}>
            <h2 style={{ ...UB, fontSize:30, color:C.ink, marginBottom:6 }}>Where do you want to go? 🗺️</h2>
            <p style={{ fontSize:16, color:C.muted }}>Morocco's most loved destinations — tap to explore</p>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:16 }}>
            {DESTINATIONS.map(d=>(
              <Link key={d.city} href={`/${locale}/property/daily-rentals/apartments-daily`} style={{ textDecoration:'none' }}>
                <div style={{ position:'relative', borderRadius:20, overflow:'hidden', cursor:'pointer', aspectRatio:'3/2', transition:'transform 0.2s, box-shadow 0.2s' }}
                  onMouseEnter={e=>{e.currentTarget.style.transform='scale(1.02)';e.currentTarget.style.boxShadow='0 20px 48px rgba(0,0,0,0.18)'}}
                  onMouseLeave={e=>{e.currentTarget.style.transform='scale(1)';e.currentTarget.style.boxShadow='0 4px 12px rgba(0,0,0,0.08)'}}>
                  <img src={d.image} alt={d.city} style={{ width:'100%', height:'100%', objectFit:'cover', transition:'transform 0.5s' }} />
                  <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top,rgba(15,23,42,0.82),rgba(0,0,0,0.05))' }} />
                  <div style={{ position:'absolute', top:14, right:14, backgroundColor:C.mint, padding:'4px 12px', borderRadius:100 }}>
                    <span style={{ fontSize:10, fontWeight:800, color:'white' }}>{d.tag}</span>
                  </div>
                  <div style={{ position:'absolute', bottom:0, left:0, right:0, padding:'18px 20px' }}>
                    <p style={{ ...UB, fontSize:20, color:'white', marginBottom:4 }}>{d.city}</p>
                    <p style={{ fontSize:12, color:'rgba(255,255,255,0.7)', fontWeight:600 }}>{d.count}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* EXPERIENCE BANNER */}
        <section style={{ marginBottom:72 }}>
          <div style={{ background:`linear-gradient(135deg, ${C.ink}, #2b3230)`, borderRadius:40, padding:'52px 60px', display:'flex', alignItems:'center', gap:48, flexWrap:'wrap', position:'relative', overflow:'hidden' }}>
            <div style={{ position:'absolute', right:'-40px', top:'-40px', width:300, height:300, borderRadius:'50%', background:`radial-gradient(circle, ${C.mint}15, transparent)` }} />
            <div style={{ flex:1, minWidth:280, position:'relative', zIndex:1 }}>
              <span style={{ display:'inline-block', backgroundColor:`${C.mint}20`, color:C.mint, fontSize:10, fontWeight:800, padding:'5px 16px', borderRadius:100, textTransform:'uppercase', letterSpacing:'0.12em', marginBottom:16 }}>
                🌟 SouKni Experiences
              </span>
              <h2 style={{ ...UB, fontSize:'clamp(24px,3.5vw,40px)', color:'white', marginBottom:12, lineHeight:1.05 }}>
                More than a stay.<br/>An experience.
              </h2>
              <p style={{ fontSize:15, color:'rgba(255,255,255,0.6)', lineHeight:1.8, marginBottom:24 }}>
                Sahara camel treks, Marrakech cooking classes, Atlas hikes, surf lessons in Taghazout — add experiences to your stay and make memories that last.
              </p>
              <div style={{ display:'flex', gap:12 }}>
                <Link href={`/${locale}/property/daily-rentals/desert-camps`} style={{ textDecoration:'none' }}>
                  <button style={{ backgroundColor:C.mint, color:'white', border:'none', padding:'13px 28px', borderRadius:100, fontSize:13, ...UB, cursor:'pointer' }}>Explore Experiences</button>
                </Link>
                <Link href={`/${locale}/property/daily-rentals/villas-daily`} style={{ textDecoration:'none' }}>
                  <button style={{ backgroundColor:'rgba(255,255,255,0.1)', color:'white', border:'1px solid rgba(255,255,255,0.3)', padding:'13px 28px', borderRadius:100, fontSize:13, fontWeight:700, cursor:'pointer' }}>View Villas</button>
                </Link>
              </div>
            </div>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:12, position:'relative', zIndex:1 }}>
              {[
                { emoji:'🐪', label:'Sahara Camel Trek',   sub:'From 800 MAD/day' },
                { emoji:'🏄', label:'Surf Lesson Taghazout',sub:'From 350 MAD/hr' },
                { emoji:'🍳', label:'Marrakech Cooking',   sub:'From 450 MAD/pp' },
                { emoji:'🥾', label:'Atlas Hike & Guide',  sub:'From 600 MAD/day' },
              ].map(x=>(
                <div key={x.label} style={{ backgroundColor:'rgba(255,255,255,0.07)', borderRadius:16, padding:'16px 18px', cursor:'pointer', transition:'all 0.2s', border:'1px solid rgba(255,255,255,0.1)' }}
                  onMouseEnter={e=>{e.currentTarget.style.backgroundColor='rgba(34,212,168,0.12)';e.currentTarget.style.borderColor=`${C.mint}40`}}
                  onMouseLeave={e=>{e.currentTarget.style.backgroundColor='rgba(255,255,255,0.07)';e.currentTarget.style.borderColor='rgba(255,255,255,0.1)'}}>
                  <span style={{ fontSize:24, display:'block', marginBottom:8 }}>{x.emoji}</span>
                  <p style={{ fontSize:12, fontWeight:800, color:'white', marginBottom:4 }}>{x.label}</p>
                  <p style={{ fontSize:11, color:C.mint, fontWeight:700 }}>{x.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TRENDING SEARCHES */}
        <section style={{ marginBottom:72 }}>
          <h2 style={{ ...UB, fontSize:24, color:C.ink, marginBottom:20 }}>Popular Searches 🔥</h2>
          <div style={{ display:'flex', gap:10, flexWrap:'wrap' }}>
            {['Riad with Pool Marrakech','Beachfront Villa Agadir','Desert Camp Merzouga','Weekend Escape Chefchaouen','Mountain Chalet Ifrane','Blue City Stay','Surf Camp Taghazout','Private Pool Villa','Luxury Riad Fès','Beach House Essaouira','Sahara Experience','Family Villa Morocco'].map(tag=>(
              <Link key={tag} href={`/${locale}/property/daily-rentals/villas-daily`} style={{ textDecoration:'none' }}>
                <span style={{ display:'inline-block', padding:'10px 20px', borderRadius:100, fontSize:13, fontWeight:700, backgroundColor:'white', color:C.ink, border:'1px solid rgba(186,202,197,0.4)', cursor:'pointer', transition:'all 0.15s', boxShadow:'0 2px 6px rgba(0,0,0,0.04)' }}
                  onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.backgroundColor=C.mint;(e.currentTarget as HTMLElement).style.color='white';(e.currentTarget as HTMLElement).style.borderColor=C.mint}}
                  onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.backgroundColor='white';(e.currentTarget as HTMLElement).style.color=C.ink;(e.currentTarget as HTMLElement).style.borderColor='rgba(186,202,197,0.4)'}}>
                  {tag}
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* HOST CTA */}
        <section style={{ borderRadius:40, background:`linear-gradient(135deg,${C.mint},${C.mintDk})`, padding:'60px 64px', display:'flex', alignItems:'center', justifyContent:'space-between', gap:40, flexWrap:'wrap', marginBottom:64 }}>
          <div>
            <h2 style={{ ...UB, fontSize:'clamp(26px,4vw,44px)', color:'white', marginBottom:12, lineHeight:1.05 }}>GOT A PROPERTY?<br/>HOST IT ON SOUKNI.</h2>
            <p style={{ fontSize:15, color:'rgba(255,255,255,0.85)', maxWidth:480, lineHeight:1.7 }}>Join thousands of hosts earning extra income by sharing their homes, riads and villas with travellers across Morocco.</p>
            <div style={{ display:'flex', gap:12, marginTop:24 }}>
              <button style={{ backgroundColor:'white', color:C.mint, border:'none', padding:'12px 24px', borderRadius:100, fontWeight:800, fontSize:13, cursor:'pointer' }}>🍎 App Store</button>
              <button style={{ backgroundColor:'rgba(255,255,255,0.15)', color:'white', border:'1px solid rgba(255,255,255,0.4)', padding:'12px 24px', borderRadius:100, fontWeight:800, fontSize:13, cursor:'pointer' }}>▶ Google Play</button>
            </div>
          </div>
          <Link href={`/${locale}/post-ad`} style={{ textDecoration:'none' }}>
            <span style={{ display:'inline-block', backgroundColor:'white', color:C.mint, padding:'18px 40px', borderRadius:100, fontWeight:900, fontSize:15, cursor:'pointer', whiteSpace:'nowrap', ...UB, boxShadow:'0 8px 32px rgba(0,0,0,0.15)' }}>
              List Your Property →
            </span>
          </Link>
        </section>

        {/* BACK NAVIGATION */}
        <div style={{ borderTop:'1px solid rgba(186,202,197,0.3)', paddingTop:40 }}>
          <p style={{ fontSize:12, fontWeight:800, color:C.muted, textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:20, textAlign:'center' }}>Navigate Property</p>
          <div style={{ display:'flex', gap:10, justifyContent:'center', flexWrap:'wrap' }}>
            {[
              { label:'← For Rent',     href:`/${locale}/property/for-rent` },
              { label:'← Property Hub', href:`/${locale}/property`          },
              { label:'← Home',         href:`/${locale}`                   },
            ].map((b,i)=>(
              <Link key={b.label} href={b.href}
                style={{ padding:'12px 28px', borderRadius:100, textDecoration:'none', fontSize:13, fontWeight:900, fontFamily:"'Inter',sans-serif", transition:'all 0.2s', display:'flex', alignItems:'center', gap:6,
                  backgroundColor: i===2 ? C.ink : 'white',
                  color:           i===2 ? 'white' : C.ink,
                  border:          i===2 ? 'none' : '1.5px solid rgba(186,202,197,0.4)' }}
                onMouseEnter={e=>{if(i<2){(e.currentTarget as HTMLElement).style.borderColor=C.mint;(e.currentTarget as HTMLElement).style.color=C.mint}else{(e.currentTarget as HTMLElement).style.backgroundColor=C.mint}}}
                onMouseLeave={e=>{if(i<2){(e.currentTarget as HTMLElement).style.borderColor='rgba(186,202,197,0.4)';(e.currentTarget as HTMLElement).style.color=C.ink}else{(e.currentTarget as HTMLElement).style.backgroundColor=C.ink}}}>
                {b.label}
              </Link>
            ))}
          </div>
        </div>

        <CategoryFooterNav
          backHref={`/${locale}/property`}
          backLabel="Back to All Property"
          inkColor={C.ink}
          mintDkColor={C.mintDk}
        />

      </div>
    </div>
  )
}
