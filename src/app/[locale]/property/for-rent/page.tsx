'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Heart, Search, ChevronRight, MapPin, Bed, Bath, Maximize, Phone } from 'lucide-react'
import { useListings } from '@/hooks/useListings'

const C = { mint:'#22d4a8', mintDk:'#0f9b8e', ink:'#161d1b', surface:'#f4fbf8', muted:'#6b7a76' }
const UB = { fontFamily:"'Inter',sans-serif", fontWeight:900, letterSpacing:'-0.05em' } as const
const CB = { fontFamily:"'Hanken Grotesk',sans-serif", fontWeight:900, letterSpacing:'-0.03em' } as const

const RENT_CATS = [
  { label:'Apartments',     slug:'apartments',    count:'6,840', image:'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&w=600' },
  { label:'Studios',        slug:'studios',        count:'3,210', image:'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&w=600' },
  { label:'Rooms',          slug:'rooms',          count:'4,180', image:'https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg?auto=compress&w=600' },
  { label:'Villas',         slug:'villas',          count:'1,420', image:'https://images.pexels.com/photos/2581922/pexels-photo-2581922.jpeg?auto=compress&w=600' },
  { label:'Daily Rentals',  slug:'daily-rentals',  count:'892',   image:'https://images.pexels.com/photos/2872755/pexels-photo-2872755.jpeg?auto=compress&w=600' },
  { label:'Vacation Homes', slug:'daily-rentals',  count:'540',   image:'https://images.pexels.com/photos/1458457/pexels-photo-1458457.jpeg?auto=compress&w=600' },
  { label:'Commercial',     slug:'commercial',     count:'1,640', image:'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&w=600' },
]

const MOCK_LISTINGS = [
  { id:'r1',  badge:'Verified',    badge2:'Available',  title:'Luxury 3BR Apartment — Sea View Terrace',      type:'Apartment', price:'18,500',  unit:'MAD/mo', location:'Casablanca, Corniche',        beds:3, baths:2, area:140, image:'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&w=700' },
  { id:'r2',  badge:'New Listing', badge2:undefined,    title:'Modern Studio — Fully Furnished Agdal',         type:'Studio',    price:'5,200',   unit:'MAD/mo', location:'Rabat, Agdal',               beds:1, baths:1, area:52,  image:'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&w=700' },
  { id:'r3',  badge:'Verified',    badge2:undefined,    title:'Elegant Villa with Private Pool & Garden',      type:'Villa',     price:'45,000',  unit:'MAD/mo', location:'Marrakech, Palmeraie',       beds:5, baths:4, area:420, image:'https://images.pexels.com/photos/2581922/pexels-photo-2581922.jpeg?auto=compress&w=700' },
  { id:'r4',  badge:'Exclusive',   badge2:undefined,    title:'Luxury Riad — Nightly Rental in Medina',       type:'Riad',      price:'2,800',   unit:'MAD/day',location:'Marrakech Medina',           beds:4, baths:3, area:220, image:'https://images.pexels.com/photos/440731/pexels-photo-440731.jpeg?auto=compress&w=700' },
  { id:'r5',  badge:'Verified',    badge2:'Furnished',  title:'Premium 2BR Apartment — Hay Riad Rabat',        type:'Apartment', price:'11,000',  unit:'MAD/mo', location:'Rabat, Hay Riad',            beds:2, baths:2, area:110, image:'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&w=700' },
  { id:'r6',  badge:'Exclusive',   badge2:undefined,    title:'Beachfront Penthouse — Tanger Corniche',        type:'Apartment', price:'32,000',  unit:'MAD/mo', location:'Tanger, Malabata',           beds:4, baths:3, area:280, image:'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&w=700' },
]

const MOCK_MORE_LISTINGS = [
  { id:'r7',  badge:'Verified',    badge2:undefined,    title:'Bright Studio — Centre Casablanca',             type:'Studio',    price:'3,800',   unit:'MAD/mo', location:'Casablanca Centre',          beds:1, baths:1, area:38,  image:'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&w=700' },
  { id:'r8',  badge:'New Listing', badge2:undefined,    title:'Family Apartment 4BR — Agadir Bord de Mer',     type:'Apartment', price:'22,000',  unit:'MAD/mo', location:'Agadir, Front de Mer',       beds:4, baths:2, area:160, image:'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&w=700' },
  { id:'r9',  badge:'Verified',    badge2:'Furnished',  title:'Cozy Room in Shared Villa — Gueliz',            type:'Room',      price:'2,200',   unit:'MAD/mo', location:'Marrakech, Gueliz',          area:22,  image:'https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg?auto=compress&w=700' },
  { id:'r10', badge:'Exclusive',   badge2:undefined,    title:'Commercial Space — Finance District',            type:'Commercial',price:'28,000',  unit:'MAD/mo', location:'Casablanca Finance City',    area:240, image:'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&w=700' },
  { id:'r11', badge:'Verified',    badge2:undefined,    title:'Atlas Mountain Glamping Suite — Weekly',        type:'Vacation',  price:'8,500',   unit:'MAD/wk', location:'Imlil, Haut Atlas',         beds:1, baths:1, area:45,  image:'https://images.pexels.com/photos/1458457/pexels-photo-1458457.jpeg?auto=compress&w=700' },
  { id:'r12', badge:'New Listing', badge2:'Pet Friendly',title:'Modern Villa — Long Term Rental Ifrane',       type:'Villa',     price:'15,000',  unit:'MAD/mo', location:'Ifrane, Moyen Atlas',        beds:3, baths:2, area:200, image:'https://images.pexels.com/photos/2581922/pexels-photo-2581922.jpeg?auto=compress&w=700' },
]

function BadgeChip({ label }: { label: string }) {
  const isGreen = label === 'Available' || label === 'Furnished' || label === 'Pet Friendly'
  return (
    <span style={{ backgroundColor: isGreen ? C.mint : 'rgba(15,23,42,0.85)', color:'white', fontSize:'9px', fontWeight:800, padding:'3px 8px', borderRadius:'4px', letterSpacing:'0.08em', textTransform:'uppercase' as const }}>{label}</span>
  )
}

function RentalCard({ item, locale }: { item: typeof MOCK_LISTINGS[0]; locale: string }) {
  const [saved, setSaved] = useState(false)
  const [hov,   setHov  ] = useState(false)
  return (
    <Link href={`/${locale}/listing/${item.id}`} style={{ textDecoration:'none' }}>
      <article onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
        style={{ backgroundColor:'white', borderRadius:'20px', overflow:'hidden', boxShadow:hov?'0 20px 48px rgba(0,0,0,0.13)':'0 2px 12px rgba(0,0,0,0.06)', border:`1px solid ${hov?C.mint:'rgba(0,0,0,0.06)'}`, transition:'all 0.3s', cursor:'pointer' }}>
        <div style={{ position:'relative', aspectRatio:'16/10', overflow:'hidden' }}>
          <img src={item.image} alt={item.title} style={{ width:'100%', height:'100%', objectFit:'cover', transition:'transform 0.6s', transform:hov?'scale(1.06)':'scale(1)' }} />
          <div style={{ position:'absolute', top:'12px', left:'12px', display:'flex', gap:'6px' }}>
            <BadgeChip label={item.badge} />
            {item.badge2 && <BadgeChip label={item.badge2} />}
          </div>
          <button onClick={e=>{e.preventDefault();setSaved(!saved)}}
            style={{ position:'absolute', top:'10px', right:'10px', width:'34px', height:'34px', borderRadius:'50%', backgroundColor:'rgba(255,255,255,0.9)', border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', boxShadow:'0 2px 8px rgba(0,0,0,0.15)' }}>
            <Heart size={16} fill={saved?'#ef4444':'none'} color={saved?'#ef4444':'#6b7a76'} />
          </button>
          <div style={{ position:'absolute', bottom:'12px', left:'12px', backgroundColor:'rgba(22,29,27,0.75)', backdropFilter:'blur(8px)', padding:'4px 10px', borderRadius:'6px' }}>
            <span style={{ color:'white', fontSize:'11px', fontWeight:700 }}>{item.type}</span>
          </div>
        </div>
        <div style={{ padding:'16px 18px' }}>
          <h3 style={{ ...CB, fontSize:'15px', color:hov?C.mint:C.ink, marginBottom:'6px', lineHeight:1.3, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' as const, transition:'color 0.2s' }}>{item.title}</h3>
          <div style={{ display:'flex', alignItems:'center', gap:'5px', marginBottom:'10px' }}>
            <MapPin size={12} color={C.muted} />
            <span style={{ fontSize:'12px', color:C.muted, fontWeight:600 }}>{item.location}</span>
          </div>
          <div style={{ display:'flex', gap:'16px', marginBottom:'14px', paddingTop:'10px', borderTop:'1px solid #f1f5f9' }}>
            {(item as any).beds  && <span style={{ display:'flex', alignItems:'center', gap:'4px', fontSize:'12px', color:'#475569', fontWeight:600 }}><Bed  size={13} color={C.mint}/>{(item as any).beds} beds</span>}
            {(item as any).baths && <span style={{ display:'flex', alignItems:'center', gap:'4px', fontSize:'12px', color:'#475569', fontWeight:600 }}><Bath size={13} color={C.mint}/>{(item as any).baths} baths</span>}
            {item.area  && <span style={{ display:'flex', alignItems:'center', gap:'4px', fontSize:'12px', color:'#475569', fontWeight:600 }}><Maximize size={13} color={C.mint}/>{item.area}m²</span>}
          </div>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
            <div>
              <span style={{ ...CB, fontSize:'20px', color:C.mint }}>{item.price} </span>
              <span style={{ fontSize:'12px', color:C.muted, fontWeight:600 }}>MAD/{(item as any).unit?.replace('MAD/','') || 'mo'}</span>
            </div>
            <button onClick={e=>e.preventDefault()} style={{ display:'flex', alignItems:'center', gap:'6px', padding:'8px 16px', borderRadius:'100px', backgroundColor:C.ink, color:'white', border:'none', fontSize:'12px', fontWeight:700, cursor:'pointer', transition:'background 0.2s' }}
              onMouseEnter={e=>e.currentTarget.style.backgroundColor=C.mint}
              onMouseLeave={e=>e.currentTarget.style.backgroundColor=C.ink}>
              <Phone size={12} /> Contact
            </button>
          </div>
        </div>
      </article>
    </Link>
  )
}

export default function ForRentPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale }             = React.use(params)
  const [keyword, setKeyword]  = useState('')
  const [city,    setCity   ]  = useState('All Morocco')
  const [type,    setType   ]  = useState('All Types')
  const [maxP,    setMaxP   ]  = useState('')
  const [beds,    setBeds   ]  = useState('Any')
  const [hovCat,  setHovCat ]  = useState<string|null>(null)

  const cities  = ['All Morocco','Casablanca','Rabat','Marrakech','Tangier','Agadir','Fès','Meknès']
  const types   = ['All Types','Apartment','Studio','Room','Villa','Vacation Home','Commercial']
  const bedOpts = ['Any','1+','2+','3+','4+','5+']

  const { fetchListings } = useListings()
  const [dbListings, setDbListings] = useState<any[]>([])

  useEffect(() => {
    const t = setTimeout(() => {
      fetchListings({
        category: 'property',
        listing_type: 'rent',
        sortBy: 'newest',
        limit: 24,
      }).then(rows => setDbListings(rows || []))
    }, 400)
    return () => clearTimeout(t)
  }, [])

  function mapDbRowToCard(row: any) {
    const priceNum = Math.round((row.price || 0) / 100)
    return {
      id: row.id,
      badge: row.badge || 'Verified',
      badge2: undefined as string | undefined,
      title: row.title,
      type: row.subcategory || '',
      price: priceNum.toLocaleString(),
      unit: 'MAD/mo',
      location: row.city || '',
      beds: row.bedrooms || undefined,
      baths: row.bathrooms || undefined,
      area: row.area || undefined,
      image: (row.images && row.images[0]) || MOCK_LISTINGS[0].image,
    }
  }

  const hasRealData = dbListings.length > 0
  const realListings = hasRealData ? dbListings.map(mapDbRowToCard) : []
  const listings = hasRealData ? realListings.slice(0, 6) : MOCK_LISTINGS
  const moreListings = hasRealData ? realListings.slice(6) : MOCK_MORE_LISTINGS

  return (
    <div style={{ fontFamily:"'Inter',sans-serif", backgroundColor:C.surface, minHeight:'100vh' }}>

      {/* CINEMATIC HERO */}
      <section style={{ position:'relative', height:560, overflow:'hidden', display:'flex', alignItems:'center', justifyContent:'center' }}>
        <img src="https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&w=1600" alt="Property for Rent Morocco"
          style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover' }} />
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top, rgba(15,23,42,0.92) 0%, rgba(15,23,42,0.4) 60%, rgba(15,23,42,0.2) 100%)' }} />
        <div style={{ position:'relative', zIndex:10, textAlign:'center', padding:'0 24px', maxWidth:800, width:'100%' }}>
          <div style={{ display:'inline-flex', alignItems:'center', gap:8, backgroundColor:'rgba(34,212,168,0.15)', border:'1px solid rgba(34,212,168,0.4)', borderRadius:100, padding:'6px 18px', marginBottom:20 }}>
            <div style={{ width:8, height:8, borderRadius:'50%', backgroundColor:C.mint }} />
            <span style={{ fontSize:11, fontWeight:800, color:C.mint, textTransform:'uppercase', letterSpacing:'0.18em' }}>SouKni Property · For Rent</span>
          </div>
          <h1 style={{ ...UB, fontSize:'clamp(38px,6vw,72px)', color:'white', lineHeight:0.95, marginBottom:16, textTransform:'uppercase' }}>
            YOUR PERFECT<br/><span style={{ color:C.mint }}>RENTAL HOME</span><br/>AWAITS.
          </h1>
          <p style={{ fontSize:17, color:'rgba(255,255,255,0.72)', marginBottom:36, maxWidth:540, margin:'0 auto 36px', lineHeight:1.6 }}>
            16,700+ verified rentals across Morocco — apartments, studios, villas, riads and more
          </p>
          <div style={{ display:'flex', alignItems:'stretch', backgroundColor:'rgba(255,255,255,0.1)', backdropFilter:'blur(24px)', border:'1px solid rgba(255,255,255,0.2)', borderRadius:100, overflow:'hidden', maxWidth:720, margin:'0 auto', boxShadow:'0 8px 32px rgba(0,0,0,0.3)' }}>
            <div style={{ display:'flex', flexDirection:'column', padding:'14px 22px', flex:'0 0 150px', borderRight:'1px solid rgba(255,255,255,0.15)', gap:2 }}>
              <span style={{ fontSize:9, fontWeight:800, color:'rgba(255,255,255,0.5)', textTransform:'uppercase', letterSpacing:'0.12em' }}>City</span>
              <select value={city} onChange={e=>setCity(e.target.value)} style={{ backgroundColor:'transparent', border:'none', outline:'none', fontSize:14, fontWeight:700, color:'white', fontFamily:"'Inter',sans-serif", cursor:'pointer' }}>
                {cities.map(c=><option key={c} style={{ color:C.ink }}>{c}</option>)}
              </select>
            </div>
            <div style={{ display:'flex', flexDirection:'column', padding:'14px 22px', flex:1, borderRight:'1px solid rgba(255,255,255,0.15)', gap:2 }}>
              <span style={{ fontSize:9, fontWeight:800, color:'rgba(255,255,255,0.5)', textTransform:'uppercase', letterSpacing:'0.12em' }}>Keyword</span>
              <input value={keyword} onChange={e=>setKeyword(e.target.value)} placeholder="Area, features, furnished..." style={{ backgroundColor:'transparent', border:'none', outline:'none', fontSize:14, fontWeight:600, color:'white', fontFamily:"'Inter',sans-serif", padding:0 }} />
            </div>
            <div style={{ display:'flex', flexDirection:'column', padding:'14px 22px', flex:'0 0 130px', borderRight:'1px solid rgba(255,255,255,0.15)', gap:2 }}>
              <span style={{ fontSize:9, fontWeight:800, color:'rgba(255,255,255,0.5)', textTransform:'uppercase', letterSpacing:'0.12em' }}>Type</span>
              <select value={type} onChange={e=>setType(e.target.value)} style={{ backgroundColor:'transparent', border:'none', outline:'none', fontSize:14, fontWeight:700, color:'white', fontFamily:"'Inter',sans-serif", cursor:'pointer' }}>
                {types.map(t=><option key={t} style={{ color:C.ink }}>{t}</option>)}
              </select>
            </div>
            <button style={{ backgroundColor:C.mint, color:'white', border:'none', padding:'0 32px', fontWeight:800, fontSize:14, cursor:'pointer', flexShrink:0, transition:'background 0.15s', display:'flex', alignItems:'center', gap:8 }}
              onMouseEnter={e=>e.currentTarget.style.backgroundColor=C.mintDk}
              onMouseLeave={e=>e.currentTarget.style.backgroundColor=C.mint}>
              <Search size={16} /> Search
            </button>
          </div>
        </div>
      </section>

      {/* ADVANCED FILTER BAR */}
      <div style={{ maxWidth:1440, margin:'-26px auto 0', padding:'0 40px', position:'relative', zIndex:30 }}>
        <div style={{ backgroundColor:'rgba(255,255,255,0.97)', backdropFilter:'blur(20px)', borderRadius:100, padding:'8px 8px 8px 0', boxShadow:'0 8px 40px rgba(0,0,0,0.12)', border:'1px solid rgba(255,255,255,0.8)', display:'flex', alignItems:'center' }}>
          {[
            { label:'City', content: <select value={city} onChange={e=>setCity(e.target.value)} style={{ border:'none', outline:'none', fontSize:14, fontWeight:700, color:C.ink, fontFamily:"'Inter',sans-serif", backgroundColor:'transparent', cursor:'pointer' }}>{cities.map(c=><option key={c}>{c}</option>)}</select> },
            { label:'Max Price (MAD/mo)', content: <input type="number" value={maxP} onChange={e=>setMaxP(e.target.value)} placeholder="Any" style={{ border:'none', outline:'none', fontSize:14, fontWeight:700, color:C.ink, fontFamily:"'Inter',sans-serif", backgroundColor:'transparent', width:'100%' }} /> },
            { label:'Type', content: <select value={type} onChange={e=>setType(e.target.value)} style={{ border:'none', outline:'none', fontSize:14, fontWeight:700, color:C.ink, fontFamily:"'Inter',sans-serif", backgroundColor:'transparent', cursor:'pointer' }}>{types.map(t=><option key={t}>{t}</option>)}</select> },
            { label:'Bedrooms', content: <select value={beds} onChange={e=>setBeds(e.target.value)} style={{ border:'none', outline:'none', fontSize:14, fontWeight:700, color:C.ink, fontFamily:"'Inter',sans-serif", backgroundColor:'transparent', cursor:'pointer' }}>{bedOpts.map(b=><option key={b}>{b}</option>)}</select> },
          ].map((f,i)=>(
            <div key={f.label} style={{ flex:1, padding:'8px 20px', borderRight:i<3?'1px solid rgba(186,202,197,0.25)':'none', display:'flex', flexDirection:'column', cursor:'pointer', gap:2 }}>
              <span style={{ fontSize:9, textTransform:'uppercase', fontWeight:700, color:C.muted, letterSpacing:'0.1em' }}>{f.label}</span>
              {f.content}
            </div>
          ))}
          <button style={{ backgroundColor:C.mint, color:'white', border:'none', padding:'12px 28px', borderRadius:100, cursor:'pointer', fontWeight:700, fontSize:13, flexShrink:0, marginLeft:8, display:'flex', alignItems:'center', gap:6 }}>
            <Search size={15} /> SEARCH
          </button>
        </div>
      </div>

      <div style={{ maxWidth:1440, margin:'48px auto 0', padding:'0 40px 80px' }}>

        {/* BREADCRUMB */}
        <nav style={{ display:'flex', alignItems:'center', gap:6, fontSize:11, fontWeight:700, color:C.muted, textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:32 }}>
          <Link href={`/${locale}`}          style={{ color:C.muted, textDecoration:'none' }}>Home</Link><span>›</span>
          <Link href={`/${locale}/property`}  style={{ color:C.muted, textDecoration:'none' }}>Property</Link><span>›</span>
          <span style={{ color:C.ink }}>For Rent</span>
        </nav>

        {/* SUBCATEGORY HUB GRID */}
        <section style={{ marginBottom:64 }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:24 }}>
            <div>
              <h2 style={{ ...UB, fontSize:32, color:C.ink, marginBottom:6 }}>Properties For Rent</h2>
              <p style={{ fontSize:15, color:C.muted }}>Browse by rental type — 16,724 listings across Morocco</p>
            </div>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:16 }}>
            {RENT_CATS.map(cat=>(
              <Link key={cat.label} href={`/${locale}/property/${cat.slug}`} style={{ textDecoration:'none' }}>
                <div onMouseEnter={()=>setHovCat(cat.label)} onMouseLeave={()=>setHovCat(null)}
                  style={{ position:'relative', borderRadius:20, overflow:'hidden', cursor:'pointer', transition:'transform 0.2s, box-shadow 0.2s', transform:hovCat===cat.label?'scale(1.02)':'scale(1)', boxShadow:hovCat===cat.label?'0 20px 48px rgba(0,0,0,0.18)':'0 2px 8px rgba(0,0,0,0.06)' }}>
                  <div style={{ aspectRatio:'3/2', overflow:'hidden' }}>
                    <img src={cat.image} alt={cat.label} style={{ width:'100%', height:'100%', objectFit:'cover', transition:'transform 0.5s', transform:hovCat===cat.label?'scale(1.08)':'scale(1)' }} />
                  </div>
                  <div style={{ position:'absolute', inset:0, background:hovCat===cat.label?'linear-gradient(to top,rgba(34,212,168,0.8),rgba(0,0,0,0.05))':'linear-gradient(to top,rgba(15,23,42,0.82),rgba(0,0,0,0.05))' }} />
                  <div style={{ position:'absolute', bottom:0, left:0, right:0, padding:'16px 18px' }}>
                    <p style={{ ...UB, fontSize:16, color:'white', marginBottom:3 }}>{cat.label}</p>
                    <p style={{ fontSize:11, color:'rgba(255,255,255,0.75)', fontWeight:600 }}>{cat.count} listings</p>
                  </div>
                </div>
              </Link>
            ))}
            {/* View More tile */}
            <Link href={`/${locale}/property`} style={{ textDecoration:'none' }}>
              <div onMouseEnter={()=>setHovCat('more')} onMouseLeave={()=>setHovCat(null)}
                style={{ position:'relative', borderRadius:20, overflow:'hidden', cursor:'pointer', aspectRatio:'3/2', transition:'transform 0.2s, box-shadow 0.2s', transform:hovCat==='more'?'scale(1.02)':'scale(1)', boxShadow:hovCat==='more'?'0 20px 48px rgba(0,0,0,0.18)':'0 2px 8px rgba(0,0,0,0.06)', background:hovCat==='more'?`linear-gradient(135deg,${C.mint},${C.mintDk})`:C.ink, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:8 }}>
                <ChevronRight size={28} color="white" />
                <p style={{ ...UB, fontSize:15, color:'white' }}>View More</p>
                <p style={{ fontSize:11, color:'rgba(255,255,255,0.65)', fontWeight:600 }}>All rentals</p>
              </div>
            </Link>
          </div>
        </section>

        {/* TENANT TRUST BANNER */}
        <section style={{ marginBottom:64 }}>
          <div style={{ position:'relative', height:200, borderRadius:32, overflow:'hidden', boxShadow:'0 20px 60px rgba(0,0,0,0.15)' }}>
            <img src="https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&w=1200" alt="Tenant Trust" style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover' }} />
            <div style={{ position:'absolute', inset:0, background:'linear-gradient(to right,rgba(15,23,42,0.95) 0%,rgba(15,23,42,0.6) 60%,transparent)' }} />
            <div style={{ position:'absolute', inset:0, display:'flex', flexDirection:'column', justifyContent:'center', padding:'0 56px' }}>
              <span style={{ backgroundColor:C.mint, color:'white', fontSize:9, ...UB, padding:'4px 14px', borderRadius:100, textTransform:'uppercase', letterSpacing:'0.12em', display:'inline-block', marginBottom:12, width:'fit-content' }}>SouKni Tenant Protect</span>
              <h2 style={{ ...UB, fontSize:'clamp(18px,2.5vw,28px)', color:'white', marginBottom:16, lineHeight:1.1 }}>Rent with confidence —<br/>every listing verified by SouKni.</h2>
              <div style={{ display:'flex', gap:10 }}>
                <Link href={`/${locale}/safety`} style={{ textDecoration:'none' }}>
                  <button style={{ backgroundColor:'white', color:C.ink, border:'none', padding:'10px 24px', borderRadius:100, fontSize:12, ...UB, cursor:'pointer' }}>Learn More</button>
                </Link>
                <Link href={`/${locale}/escrow/1`} style={{ textDecoration:'none' }}>
                  <button style={{ backgroundColor:'transparent', color:'white', border:'1px solid rgba(255,255,255,0.35)', padding:'10px 24px', borderRadius:100, fontSize:12, fontWeight:700, cursor:'pointer' }}>SouKni Escrow</button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURED RENTALS */}
        <section style={{ marginBottom:64 }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:28 }}>
            <div>
              <h2 style={{ ...UB, fontSize:28, color:C.ink, marginBottom:4 }}>Featured Rentals</h2>
              <p style={{ fontSize:14, color:C.muted }}>Premium verified listings — move-in ready</p>
            </div>
            <div style={{ display:'flex', gap:8 }}>
              {['All','Apartment','Studio','Villa','Room'].map(t=>(
                <button key={t} onClick={()=>setType(t==='All'?'All Types':t)}
                  style={{ padding:'8px 18px', borderRadius:100, fontSize:12, fontWeight:700, border:`1.5px solid ${type===(t==='All'?'All Types':t)?C.mint:'rgba(186,202,197,0.4)'}`, backgroundColor:type===(t==='All'?'All Types':t)?C.mint:'white', color:type===(t==='All'?'All Types':t)?'white':C.muted, cursor:'pointer', transition:'all 0.15s', fontFamily:"'Inter',sans-serif" }}>
                  {t}
                </button>
              ))}
            </div>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:24 }}>
            {listings.map(item => <RentalCard key={item.id} item={item} locale={locale} />)}
          </div>
        </section>

        {/* VACATION HOMES BANNER */}
        <section style={{ marginBottom:64 }}>
          <div style={{ background:`linear-gradient(135deg, ${C.ink}, #2b3230)`, borderRadius:32, padding:'40px 48px', display:'flex', alignItems:'center', gap:40, flexWrap:'wrap' }}>
            <div style={{ flex:1, minWidth:280 }}>
              <span style={{ display:'inline-block', backgroundColor:`${C.mint}20`, color:C.mint, fontSize:10, fontWeight:800, padding:'4px 14px', borderRadius:100, textTransform:'uppercase', letterSpacing:'0.12em', marginBottom:14 }}>Daily & Weekly Rentals</span>
              <h2 style={{ ...UB, fontSize:'clamp(22px,3vw,36px)', color:'white', marginBottom:10, lineHeight:1.05 }}>Riads, Villas &<br/>Vacation Homes</h2>
              <p style={{ fontSize:14, color:'rgba(255,255,255,0.55)', lineHeight:1.7, marginBottom:20 }}>Perfect short-term stays — Marrakech riads, Atlas chalets, Agadir beachfront and more.</p>
              <Link href={`/${locale}/property/daily-rentals`} style={{ textDecoration:'none' }}>
                <button style={{ backgroundColor:C.mint, color:'white', border:'none', padding:'12px 28px', borderRadius:100, fontSize:13, ...UB, cursor:'pointer' }}>Explore Stays</button>
              </Link>
            </div>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:12 }}>
              {[
                { label:'Marrakech Riads', count:'420 stays', img:'https://images.pexels.com/photos/440731/pexels-photo-440731.jpeg?auto=compress&w=300' },
                { label:'Agadir Beach',    count:'284 stays', img:'https://images.pexels.com/photos/2872755/pexels-photo-2872755.jpeg?auto=compress&w=300' },
                { label:'Atlas Chalets',   count:'156 stays', img:'https://images.pexels.com/photos/1458457/pexels-photo-1458457.jpeg?auto=compress&w=300' },
                { label:'Tangier Luxury',  count:'198 stays', img:'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&w=300' },
              ].map(d=>(
                <div key={d.label} style={{ borderRadius:12, overflow:'hidden', position:'relative', height:90, cursor:'pointer' }}>
                  <img src={d.img} alt={d.label} style={{ width:'100%', height:'100%', objectFit:'cover' }} />
                  <div style={{ position:'absolute', inset:0, background:'rgba(15,23,42,0.55)', display:'flex', flexDirection:'column', justifyContent:'flex-end', padding:'8px 10px' }}>
                    <p style={{ fontSize:11, fontWeight:800, color:'white' }}>{d.label}</p>
                    <p style={{ fontSize:9, color:C.mint, fontWeight:700 }}>{d.count}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* MORE LISTINGS */}
        <section style={{ marginBottom:64 }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:28 }}>
            <div>
              <h2 style={{ ...UB, fontSize:28, color:C.ink, marginBottom:4 }}>More Rentals</h2>
              <p style={{ fontSize:14, color:C.muted }}>Fresh listings added every day</p>
            </div>
            <Link href={`/${locale}/property/apartments`} style={{ color:C.mint, fontWeight:700, fontSize:13, textDecoration:'none', display:'flex', alignItems:'center', gap:4 }}>
              View all <ChevronRight size={14} />
            </Link>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:24 }}>
            {moreListings.map(item => <RentalCard key={item.id} item={item as any} locale={locale} />)}
          </div>
        </section>

        {/* TRENDING */}
        <section style={{ marginBottom:64 }}>
          <h2 style={{ ...UB, fontSize:22, color:C.ink, marginBottom:20 }}>Trending Rental Searches</h2>
          <div style={{ display:'flex', gap:10, flexWrap:'wrap' }}>
            {['Studio Rabat Agdal','Appartement Casablanca','Villa Marrakech','Riad Médina','Furnished Apartment','Colocation Rabat','Daily Rental Agadir','Beachfront Rental','Long-Term Ifrane','Pet Friendly','Rooftop Terrace','Near Tramway'].map(tag=>(
              <Link key={tag} href={`/${locale}/property/apartments`} style={{ textDecoration:'none' }}>
                <span style={{ display:'inline-block', padding:'9px 18px', borderRadius:100, fontSize:13, fontWeight:700, backgroundColor:'white', color:C.ink, border:'1px solid rgba(186,202,197,0.4)', cursor:'pointer', transition:'all 0.15s' }}
                  onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.backgroundColor=C.mint;(e.currentTarget as HTMLElement).style.color='white'}}
                  onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.backgroundColor='white';(e.currentTarget as HTMLElement).style.color=C.ink}}>
                  {tag}
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* DIAMOND BANNER */}
        <section style={{ position:'relative', borderRadius:40, overflow:'hidden', marginBottom:48 }}>
          <img src="https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&w=1600" alt="Diamond" style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover' }} />
          <div style={{ position:'absolute', inset:0, background:'linear-gradient(135deg,rgba(15,23,42,0.97),rgba(15,23,42,0.7))' }} />
          <div style={{ position:'relative', zIndex:1, padding:'64px 72px', maxWidth:660 }}>
            <span style={{ display:'inline-flex', alignItems:'center', gap:6, background:`linear-gradient(135deg,${C.mint},${C.mintDk})`, color:'white', fontSize:9, ...UB, padding:'5px 16px', borderRadius:100, textTransform:'uppercase', letterSpacing:'0.12em', marginBottom:22 }}>✦ SOUKNI DIAMOND</span>
            <h2 style={{ ...UB, fontSize:'clamp(28px,4vw,48px)', color:'white', marginBottom:16, lineHeight:1.05 }}>Landlord? Get Diamond<br/>and fill your unit faster.</h2>
            <p style={{ fontSize:15, color:'rgba(255,255,255,0.65)', lineHeight:1.8, marginBottom:28, maxWidth:480 }}>Priority placement in search results, verified badge that tenants trust, and a dedicated account manager — the fastest way to rent your property in Morocco.</p>
            <div style={{ display:'flex', gap:14 }}>
              <Link href={`/${locale}/diamond`} style={{ textDecoration:'none' }}>
                <button style={{ backgroundColor:C.mint, color:'white', border:'none', padding:'14px 32px', borderRadius:100, fontSize:14, ...UB, cursor:'pointer', boxShadow:`0 4px 20px ${C.mint}50` }}>Get Certified Now</button>
              </Link>
              <button style={{ backgroundColor:'transparent', color:'white', border:'1px solid rgba(255,255,255,0.25)', padding:'14px 32px', borderRadius:100, fontSize:14, fontWeight:700, cursor:'pointer' }}>Learn More</button>
            </div>
          </div>
        </section>

        {/* JOIN CTA */}
        <section style={{ borderRadius:40, background:`linear-gradient(135deg,${C.mint},${C.mintDk})`, padding:'56px 64px', display:'flex', alignItems:'center', justifyContent:'space-between', gap:40, flexWrap:'wrap' }}>
          <div>
            <h2 style={{ ...UB, fontSize:'clamp(28px,4vw,44px)', color:'white', marginBottom:12, lineHeight:1.05 }}>LIST YOUR RENTAL TODAY</h2>
            <p style={{ fontSize:15, color:'rgba(255,255,255,0.85)', maxWidth:480, lineHeight:1.7 }}>Reach thousands of tenants across Morocco — post your rental listing free in under 2 minutes.</p>
            <div style={{ display:'flex', gap:12, marginTop:24 }}>
              <button style={{ backgroundColor:'white', color:C.mint, border:'none', padding:'12px 24px', borderRadius:100, fontWeight:800, fontSize:13, cursor:'pointer' }}>🍎 App Store</button>
              <button style={{ backgroundColor:'rgba(255,255,255,0.15)', color:'white', border:'1px solid rgba(255,255,255,0.4)', padding:'12px 24px', borderRadius:100, fontWeight:800, fontSize:13, cursor:'pointer' }}>▶ Google Play</button>
            </div>
          </div>
          <Link href={`/${locale}/post-ad`} style={{ textDecoration:'none' }}>
            <span style={{ display:'inline-block', backgroundColor:'white', color:C.mint, padding:'18px 40px', borderRadius:100, fontWeight:900, fontSize:15, cursor:'pointer', whiteSpace:'nowrap', ...UB, boxShadow:'0 8px 32px rgba(0,0,0,0.15)' }}>Post Free Ad →</span>
          </Link>
        </section>

      </div>
    </div>
  )
}
