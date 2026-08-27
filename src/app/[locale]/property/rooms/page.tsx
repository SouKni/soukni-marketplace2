'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Heart, Search, ChevronRight, MapPin, Bed, Bath, Maximize, Phone, Wifi } from 'lucide-react'
import { useListings } from '@/hooks/useListings'
import Breadcrumb from '@/components/ui/Breadcrumb'
import CategoryFooterNav from '@/components/ui/CategoryFooterNav'

const C = { mint:'#22d4a8', mintDk:'#0f9b8e', ink:'#161d1b', surface:'#f4fbf8', muted:'#6b7a76' }
const UB = { fontFamily:"'Inter',sans-serif", fontWeight:900, letterSpacing:'-0.05em' } as const
const CB = { fontFamily:"'Hanken Grotesk',sans-serif", fontWeight:900, letterSpacing:'-0.03em' } as const

const ROOM_CATS = [
  { label:'Single Room',    slug:'single-room',    count:'3,840', image:'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&w=600' },
  { label:'Shared Room',    slug:'shared-room',    count:'2,110', image:'https://images.pexels.com/photos/1648776/pexels-photo-1648776.jpeg?auto=compress&w=600' },
  { label:'Master Bedroom', slug:'master-bedroom', count:'1,420', image:'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&w=600' },
  { label:'Studio',         slug:'studio',         count:'3,210', image:'https://images.pexels.com/photos/1918291/pexels-photo-1918291.jpeg?auto=compress&w=600' },
  { label:'Ensuite Room',   slug:'ensuite-room',   count:'980',   image:'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&w=600' },
  { label:'Hotel',          slug:'hotel',          count:'645',   image:'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&w=600' },
]

const listings = [
  { id:'rm1', badge:'Verified',    badge2:'Furnished',   title:'Private Room with Balcony — Agdal Rabat',       type:'Single Room',    price:'2,800', unit:'MAD/mo', location:'Rabat, Agdal',           area:18, image:'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&w=700', furnished:true },
  { id:'rm2', badge:'New Listing', badge2:'Bills Incl.', title:'Shared Room — Modern Colocation Centre Casa',   type:'Shared Room',    price:'1,400', unit:'MAD/mo', location:'Casablanca Centre',      area:14, image:'https://images.pexels.com/photos/1648776/pexels-photo-1648776.jpeg?auto=compress&w=700', furnished:true },
  { id:'rm3', badge:'Verified',    badge2:'Furnished',   title:'Master Bedroom — Luxury Villa Souissi Rabat',   type:'Master Bedroom', price:'5,200', unit:'MAD/mo', location:'Rabat, Souissi',         area:32, image:'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&w=700', furnished:true },
  { id:'rm4', badge:'Exclusive',   badge2:undefined,     title:'Ensuite Studio with Terrace — Gueliz Marrakech',type:'Ensuite Room',   price:'4,100', unit:'MAD/mo', location:'Marrakech, Gueliz',      area:28, image:'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&w=700', furnished:false },
  { id:'rm5', badge:'Verified',    badge2:'Furnished',   title:'Single Room — Quiet Residential Hay Riad',      type:'Single Room',    price:'2,100', unit:'MAD/mo', location:'Rabat, Hay Riad',        area:16, image:'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&w=700', furnished:true },
  { id:'rm6', badge:'New Listing', badge2:undefined,     title:'4-Bed Shared Flat — Near Tram Stop Hay Ryad',   type:'Shared Room',    price:'1,200', unit:'MAD/mo', location:'Rabat, Hay Ryad',        area:12, image:'https://images.pexels.com/photos/1648776/pexels-photo-1648776.jpeg?auto=compress&w=700', furnished:false },
]

const moreListings = [
  { id:'rm7',  badge:'Verified',    badge2:'Furnished',   title:'Boutique Hotel Room — Medina View Fès',         type:'Hotel',          price:'890',  unit:'MAD/day',location:'Fès, Médina',            area:24, image:'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&w=700', furnished:true },
  { id:'rm8',  badge:'Exclusive',   badge2:'Furnished',   title:'Master Suite — Riad Luxury Marrakech',          type:'Master Bedroom', price:'6,500',unit:'MAD/mo', location:'Marrakech, Médina',      area:40, image:'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&w=700', furnished:true },
  { id:'rm9',  badge:'New Listing', badge2:undefined,     title:'Single Room Unfurnished — Student Area',        type:'Single Room',    price:'1,600',unit:'MAD/mo', location:'Casablanca, Maarif',     area:15, image:'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&w=700', furnished:false },
  { id:'rm10', badge:'Verified',    badge2:'Bills Incl.', title:'Colocation Premium 3 Colocataires — Agdal',    type:'Shared Room',    price:'1,800',unit:'MAD/mo', location:'Rabat, Agdal',           area:20, image:'https://images.pexels.com/photos/1648776/pexels-photo-1648776.jpeg?auto=compress&w=700', furnished:true },
  { id:'rm11', badge:'Verified',    badge2:'Furnished',   title:'Studio Meublé Tout Équipé — Tanger Marina',     type:'Studio',         price:'3,400',unit:'MAD/mo', location:'Tanger, Marina',         area:35, image:'https://images.pexels.com/photos/1918291/pexels-photo-1918291.jpeg?auto=compress&w=700', furnished:true },
  { id:'rm12', badge:'Exclusive',   badge2:undefined,     title:'Ensuite Room in Modern Villa — Ain Diab',       type:'Ensuite Room',   price:'3,800',unit:'MAD/mo', location:'Casablanca, Ain Diab',   area:22, image:'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&w=700', furnished:false },
]

function BadgeChip({ label }: { label: string }) {
  const isGreen = label === 'Furnished' || label === 'Bills Incl.' || label === 'Available'
  return (
    <span style={{ backgroundColor: isGreen ? C.mint : 'rgba(15,23,42,0.85)', color:'white', fontSize:'9px', fontWeight:800, padding:'3px 8px', borderRadius:'4px', letterSpacing:'0.08em', textTransform:'uppercase' as const }}>{label}</span>
  )
}

function RoomCard({ item, locale }: { item: typeof listings[0]; locale: string }) {
  const [saved, setSaved] = useState(false)
  const [hov,   setHov  ] = useState(false)
  return (
    <Link href={`/${locale}/listing/${item.id}`} style={{ textDecoration:'none' }}>
      <article onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
        style={{ backgroundColor:'white', borderRadius:'20px', overflow:'hidden', boxShadow:hov?'0 20px 48px rgba(0,0,0,0.13)':'0 2px 12px rgba(0,0,0,0.06)', border:`1px solid ${hov?C.mint:'rgba(0,0,0,0.06)'}`, transition:'all 0.3s', cursor:'pointer' }}>
        <div style={{ position:'relative', aspectRatio:'16/10', overflow:'hidden' }}>
          <img src={item.image} alt={item.title} style={{ width:'100%', height:'100%', objectFit:'cover', transition:'transform 0.6s', transform:hov?'scale(1.06)':'scale(1)' }} />
          <div style={{ position:'absolute', top:'12px', left:'12px', display:'flex', gap:'6px', flexWrap:'wrap' }}>
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
          {item.furnished && (
            <div style={{ position:'absolute', bottom:'12px', right:'12px', backgroundColor:C.mint, padding:'4px 10px', borderRadius:'6px', display:'flex', alignItems:'center', gap:4 }}>
              <Wifi size={10} color="white" />
              <span style={{ color:'white', fontSize:'10px', fontWeight:700 }}>Furnished</span>
            </div>
          )}
        </div>
        <div style={{ padding:'16px 18px' }}>
          <h3 style={{ ...CB, fontSize:'14px', color:hov?C.mint:C.ink, marginBottom:'6px', lineHeight:1.3, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' as const, transition:'color 0.2s' }}>{item.title}</h3>
          <div style={{ display:'flex', alignItems:'center', gap:'5px', marginBottom:'10px' }}>
            <MapPin size={12} color={C.muted} />
            <span style={{ fontSize:'12px', color:C.muted, fontWeight:600 }}>{item.location}</span>
          </div>
          <div style={{ display:'flex', gap:'16px', marginBottom:'14px', paddingTop:'10px', borderTop:'1px solid #f1f5f9' }}>
            <span style={{ display:'flex', alignItems:'center', gap:'4px', fontSize:'12px', color:'#475569', fontWeight:600 }}><Maximize size={13} color={C.mint}/>{item.area}m²</span>
            <span style={{ display:'flex', alignItems:'center', gap:'4px', fontSize:'12px', color:'#475569', fontWeight:600 }}>{item.furnished ? '🛋️ Furnished' : '📦 Unfurnished'}</span>
          </div>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
            <div>
              <span style={{ ...CB, fontSize:'20px', color:C.mint }}>{item.price} </span>
              <span style={{ fontSize:'12px', color:C.muted, fontWeight:600 }}>MAD/{item.unit.replace('MAD/','')}</span>
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

export default function RoomsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale }                   = React.use(params)
  const [keyword, setKeyword]        = useState('')
  const [city,    setCity   ]        = useState('All Morocco')
  const [furnish, setFurnish]        = useState<'All'|'Furnished'|'Unfurnished'>('All')
  const [maxP,    setMaxP   ]        = useState('')
  const [hovCat,  setHovCat ]        = useState<string|null>(null)

  const cities = ['All Morocco','Casablanca','Rabat','Marrakech','Tangier','Agadir','Fès','Meknès']

  const { fetchListings } = useListings()
  const [dbListings, setDbListings] = useState<any[]>([])
  useEffect(() => {
    const t = setTimeout(() => {
      fetchListings({ category: 'property', sortBy: 'newest', limit: 24 }).then(rows => setDbListings(rows || []))
    }, 400)
    return () => clearTimeout(t)
  }, [])
  function mapDbRowToCard(row: any) {
    return {
      id: row.id,
      badge: row.badge || 'Verified',
      badge2: undefined as string | undefined,
      title: row.title,
      type: row.subcategory || '',
      price: Math.round((row.price || 0) / 100).toLocaleString(),
      unit: 'MAD/mo',
      location: row.city,
      area: 20,
      image: (row.images && row.images[0]) || listings[0].image,
      furnished: true,
    }
  }
  const hasRealData = dbListings.length > 0
  const realCards = dbListings.map(mapDbRowToCard)
  const sourceListings     = hasRealData ? realCards.slice(0, 6) : listings
  const sourceMoreListings = hasRealData ? realCards.slice(6)    : moreListings

  const matchesKeyword = (l: any) => keyword.trim() === '' ||
    l.title.toLowerCase().includes(keyword.toLowerCase()) ||
    l.location.toLowerCase().includes(keyword.toLowerCase())
  const matchesCity = (l: any) => city === 'All Morocco' || l.location.toLowerCase().includes(city.toLowerCase())
  const matchesMaxPrice = (l: any) => {
    if (!maxP.trim()) return true
    const num = Number(String(l.price).replace(/,/g, ''))
    return num <= Number(maxP)
  }
  const filteredListings     = sourceListings.filter(l => (furnish === 'All' ? true : furnish === 'Furnished' ? l.furnished : !l.furnished) && matchesKeyword(l) && matchesCity(l) && matchesMaxPrice(l))
  const filteredMoreListings = sourceMoreListings.filter(l => (furnish === 'All' ? true : furnish === 'Furnished' ? l.furnished : !l.furnished) && matchesKeyword(l) && matchesCity(l) && matchesMaxPrice(l))

  return (
    <div style={{ fontFamily:"'Inter',sans-serif", backgroundColor:C.surface, minHeight:'100vh' }}>

      {/* CINEMATIC HERO */}
      <section style={{ position:'relative', height:520, overflow:'hidden', display:'flex', alignItems:'center', justifyContent:'center' }}>
        <img src="https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&w=1600" alt="Rooms for Rent Morocco"
          style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover' }} />
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top, rgba(15,23,42,0.92) 0%, rgba(15,23,42,0.4) 60%, rgba(15,23,42,0.2) 100%)' }} />
        <div style={{ position:'relative', zIndex:10, textAlign:'center', padding:'0 24px', maxWidth:800, width:'100%' }}>
          <div style={{ display:'inline-flex', alignItems:'center', gap:8, backgroundColor:'rgba(34,212,168,0.15)', border:'1px solid rgba(34,212,168,0.4)', borderRadius:100, padding:'6px 18px', marginBottom:20 }}>
            <div style={{ width:8, height:8, borderRadius:'50%', backgroundColor:C.mint }} />
            <span style={{ fontSize:11, fontWeight:800, color:C.mint, textTransform:'uppercase', letterSpacing:'0.18em' }}>SouKni Property · Rooms</span>
          </div>
          <h1 style={{ ...UB, fontSize:'clamp(36px,6vw,68px)', color:'white', lineHeight:0.95, marginBottom:16, textTransform:'uppercase' }}>
            FIND YOUR<br/><span style={{ color:C.mint }}>PERFECT ROOM</span><br/>IN MOROCCO.
          </h1>
          <p style={{ fontSize:16, color:'rgba(255,255,255,0.72)', marginBottom:36, maxWidth:540, margin:'0 auto 36px', lineHeight:1.6 }}>
            8,205 verified rooms for rent — single, shared, ensuite, studios and hotels
          </p>
          <div style={{ display:'flex', alignItems:'stretch', backgroundColor:'rgba(255,255,255,0.1)', backdropFilter:'blur(24px)', border:'1px solid rgba(255,255,255,0.2)', borderRadius:100, overflow:'hidden', maxWidth:680, margin:'0 auto', boxShadow:'0 8px 32px rgba(0,0,0,0.3)' }}>
            <div style={{ display:'flex', flexDirection:'column', padding:'14px 22px', flex:'0 0 150px', borderRight:'1px solid rgba(255,255,255,0.15)', gap:2 }}>
              <span style={{ fontSize:9, fontWeight:800, color:'rgba(255,255,255,0.5)', textTransform:'uppercase', letterSpacing:'0.12em' }}>City</span>
              <select value={city} onChange={e=>setCity(e.target.value)} style={{ backgroundColor:'transparent', border:'none', outline:'none', fontSize:14, fontWeight:700, color:'white', fontFamily:"'Inter',sans-serif", cursor:'pointer' }}>
                {cities.map(c=><option key={c} style={{ color:C.ink }}>{c}</option>)}
              </select>
            </div>
            <div style={{ display:'flex', flexDirection:'column', padding:'14px 22px', flex:1, borderRight:'1px solid rgba(255,255,255,0.15)', gap:2 }}>
              <span style={{ fontSize:9, fontWeight:800, color:'rgba(255,255,255,0.5)', textTransform:'uppercase', letterSpacing:'0.12em' }}>Keyword</span>
              <input value={keyword} onChange={e=>setKeyword(e.target.value)} placeholder="Area, building, features..." style={{ backgroundColor:'transparent', border:'none', outline:'none', fontSize:14, fontWeight:600, color:'white', fontFamily:"'Inter',sans-serif", padding:0 }} />
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
            { label:'City', content:<select value={city} onChange={e=>setCity(e.target.value)} style={{ border:'none', outline:'none', fontSize:14, fontWeight:700, color:C.ink, fontFamily:"'Inter',sans-serif", backgroundColor:'transparent', cursor:'pointer' }}>{cities.map(c=><option key={c}>{c}</option>)}</select> },
            { label:'Keyword', content:<input value={keyword} onChange={e=>setKeyword(e.target.value)} placeholder="Area, room type..." style={{ border:'none', outline:'none', fontSize:14, fontWeight:700, color:C.ink, fontFamily:"'Inter',sans-serif", backgroundColor:'transparent', width:'100%' }} /> },
            { label:'Max Price (MAD/mo)', content:<input type="number" value={maxP} onChange={e=>setMaxP(e.target.value)} placeholder="Any" style={{ border:'none', outline:'none', fontSize:14, fontWeight:700, color:C.ink, fontFamily:"'Inter',sans-serif", backgroundColor:'transparent', width:'100%' }} /> },
          ].map((f,i)=>(
            <div key={f.label} style={{ flex:i===1?2:1, padding:'8px 20px', borderRight:i<2?'1px solid rgba(186,202,197,0.25)':'none', display:'flex', flexDirection:'column', cursor:'pointer', gap:2 }}>
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
        <Breadcrumb
          items={[
            { label:'Home', href:`/${locale}` },
            { label:'Property', href:`/${locale}/property` },
            { label:'For Rent', href:`/${locale}/property/for-rent` },
            { label:'Rooms' },
          ]}
          mutedColor={C.muted}
          inkColor={C.ink}
          style={{ marginBottom:32 }}
        />

        {/* SUBCATEGORY HUB GRID */}
        <section style={{ marginBottom:48 }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:24 }}>
            <div>
              <h2 style={{ ...UB, fontSize:32, color:C.ink, marginBottom:6 }}>Rooms for Rent</h2>
              <p style={{ fontSize:15, color:C.muted }}>8,205 verified rooms across Morocco</p>
            </div>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:16 }}>
            {ROOM_CATS.map(cat=>(
              <Link key={cat.slug} href={`/${locale}/property/rooms/${cat.slug}`} style={{ textDecoration:'none' }}>
                <div onMouseEnter={()=>setHovCat(cat.slug)} onMouseLeave={()=>setHovCat(null)}
                  style={{ position:'relative', borderRadius:20, overflow:'hidden', cursor:'pointer', transition:'transform 0.2s, box-shadow 0.2s', transform:hovCat===cat.slug?'scale(1.02)':'scale(1)', boxShadow:hovCat===cat.slug?'0 20px 48px rgba(0,0,0,0.18)':'0 2px 8px rgba(0,0,0,0.06)' }}>
                  <div style={{ aspectRatio:'3/2', overflow:'hidden' }}>
                    <img src={cat.image} alt={cat.label} style={{ width:'100%', height:'100%', objectFit:'cover', transition:'transform 0.5s', transform:hovCat===cat.slug?'scale(1.08)':'scale(1)' }} />
                  </div>
                  <div style={{ position:'absolute', inset:0, background:hovCat===cat.slug?'linear-gradient(to top,rgba(34,212,168,0.8),rgba(0,0,0,0.05))':'linear-gradient(to top,rgba(15,23,42,0.82),rgba(0,0,0,0.05))' }} />
                  <div style={{ position:'absolute', bottom:0, left:0, right:0, padding:'16px 18px' }}>
                    <p style={{ ...UB, fontSize:16, color:'white', marginBottom:3 }}>{cat.label}</p>
                    <p style={{ fontSize:11, color:'rgba(255,255,255,0.75)', fontWeight:600 }}>{cat.count} listings</p>
                  </div>
                </div>
              </Link>
            ))}
            {/* View More tile */}
            <Link href={`/${locale}/property/for-rent`} style={{ textDecoration:'none' }}>
              <div onMouseEnter={()=>setHovCat('more')} onMouseLeave={()=>setHovCat(null)}
                style={{ position:'relative', borderRadius:20, overflow:'hidden', cursor:'pointer', aspectRatio:'3/2', transition:'transform 0.2s, box-shadow 0.2s', transform:hovCat==='more'?'scale(1.02)':'scale(1)', boxShadow:hovCat==='more'?'0 20px 48px rgba(0,0,0,0.18)':'0 2px 8px rgba(0,0,0,0.06)', background:hovCat==='more'?`linear-gradient(135deg,${C.mint},${C.mintDk})`:C.ink, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:8 }}>
                <ChevronRight size={28} color="white" />
                <p style={{ ...UB, fontSize:15, color:'white' }}>View More</p>
                <p style={{ fontSize:11, color:'rgba(255,255,255,0.65)', fontWeight:600 }}>All rentals</p>
              </div>
            </Link>
          </div>
        </section>

        {/* FURNISHED / UNFURNISHED FILTER + FEATURED */}
        <section style={{ marginBottom:64 }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:28 }}>
            <div>
              <h2 style={{ ...UB, fontSize:28, color:C.ink, marginBottom:4 }}>Featured Rooms</h2>
              <p style={{ fontSize:14, color:C.muted }}>Verified listings — available now</p>
            </div>
            {/* ALL / FURNISHED / UNFURNISHED buttons */}
            <div style={{ display:'flex', gap:8 }}>
              {(['All','Furnished','Unfurnished'] as const).map(f=>(
                <button key={f} onClick={()=>setFurnish(f)}
                  style={{ padding:'9px 20px', borderRadius:100, fontSize:12, fontWeight:700, border:`1.5px solid ${furnish===f?C.mint:'rgba(186,202,197,0.4)'}`, backgroundColor:furnish===f?C.mint:'white', color:furnish===f?'white':C.muted, cursor:'pointer', transition:'all 0.15s', fontFamily:"'Inter',sans-serif" }}>
                  {f}
                </button>
              ))}
            </div>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:24 }}>
            {filteredListings.slice(0,6).map(item => <RoomCard key={item.id} item={item} locale={locale} />)}
          </div>
        </section>

        {/* COLOC BANNER */}
        <section style={{ marginBottom:64 }}>
          <div style={{ background:`linear-gradient(135deg, ${C.ink}, #2b3230)`, borderRadius:32, padding:'40px 48px', display:'flex', alignItems:'center', gap:40, flexWrap:'wrap' }}>
            <div style={{ flex:1, minWidth:280 }}>
              <span style={{ display:'inline-block', backgroundColor:`${C.mint}20`, color:C.mint, fontSize:10, fontWeight:800, padding:'4px 14px', borderRadius:100, textTransform:'uppercase', letterSpacing:'0.12em', marginBottom:14 }}>Colocation & Shared Living</span>
              <h2 style={{ ...UB, fontSize:'clamp(22px,3vw,34px)', color:'white', marginBottom:10, lineHeight:1.05 }}>Find Your<br/>Perfect Flatmates</h2>
              <p style={{ fontSize:14, color:'rgba(255,255,255,0.55)', lineHeight:1.7, marginBottom:20 }}>Morocco's largest colocation community — students, young professionals and expats welcome.</p>
              <Link href={`/${locale}/property/rooms/shared-room`} style={{ textDecoration:'none' }}>
                <button style={{ backgroundColor:C.mint, color:'white', border:'none', padding:'12px 28px', borderRadius:100, fontSize:13, ...UB, cursor:'pointer' }}>Browse Shared Rooms</button>
              </Link>
            </div>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:10 }}>
              {[
                { city:'Rabat',       count:'1,240 rooms', img:'https://images.pexels.com/photos/1648776/pexels-photo-1648776.jpeg?auto=compress&w=200' },
                { city:'Casablanca',  count:'1,870 rooms', img:'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&w=200' },
                { city:'Marrakech',   count:'640 rooms',   img:'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&w=200' },
              ].map(d=>(
                <div key={d.city} style={{ borderRadius:12, overflow:'hidden', position:'relative', height:100, cursor:'pointer', minWidth:120 }}>
                  <img src={d.img} alt={d.city} style={{ width:'100%', height:'100%', objectFit:'cover' }} />
                  <div style={{ position:'absolute', inset:0, background:'rgba(15,23,42,0.55)', display:'flex', flexDirection:'column', justifyContent:'flex-end', padding:'8px 10px' }}>
                    <p style={{ fontSize:12, fontWeight:800, color:'white' }}>{d.city}</p>
                    <p style={{ fontSize:10, color:C.mint, fontWeight:700 }}>{d.count}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* MORE ROOMS */}
        <section style={{ marginBottom:64 }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:28 }}>
            <div>
              <h2 style={{ ...UB, fontSize:28, color:C.ink, marginBottom:4 }}>More Rooms Available</h2>
              <p style={{ fontSize:14, color:C.muted }}>Updated daily — move in soon</p>
            </div>
            <div style={{ display:'flex', gap:8 }}>
              {(['All','Furnished','Unfurnished'] as const).map(f=>(
                <button key={f} onClick={()=>setFurnish(f)}
                  style={{ padding:'7px 16px', borderRadius:100, fontSize:11, fontWeight:700, border:`1.5px solid ${furnish===f?C.mint:'rgba(186,202,197,0.4)'}`, backgroundColor:furnish===f?C.mint:'white', color:furnish===f?'white':C.muted, cursor:'pointer', transition:'all 0.15s', fontFamily:"'Inter',sans-serif" }}>
                  {f}
                </button>
              ))}
            </div>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:24 }}>
            {filteredMoreListings.map(item => <RoomCard key={item.id} item={item} locale={locale} />)}
          </div>
        </section>

        {/* TRENDING */}
        <section style={{ marginBottom:64 }}>
          <h2 style={{ ...UB, fontSize:22, color:C.ink, marginBottom:20 }}>Trending Room Searches</h2>
          <div style={{ display:'flex', gap:10, flexWrap:'wrap' }}>
            {['Single Room Rabat','Chambre Meublée Casa','Colocation Agdal','Studio Marrakech','Chambre Étudiant','Ensuite Tanger','Hotel Nightly','Chambre Bills Inclus','Master Bedroom','Short Term','Near University','Near Tramway'].map(tag=>(
              <Link key={tag} href={`/${locale}/property/rooms/single-room`} style={{ textDecoration:'none' }}>
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
          <img src="https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&w=1600" alt="Diamond" style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover' }} />
          <div style={{ position:'absolute', inset:0, background:'linear-gradient(135deg,rgba(15,23,42,0.97),rgba(15,23,42,0.7))' }} />
          <div style={{ position:'relative', zIndex:1, padding:'64px 72px', maxWidth:660 }}>
            <span style={{ display:'inline-flex', alignItems:'center', gap:6, background:`linear-gradient(135deg,${C.mint},${C.mintDk})`, color:'white', fontSize:9, ...UB, padding:'5px 16px', borderRadius:100, textTransform:'uppercase', letterSpacing:'0.12em', marginBottom:22 }}>✦ SOUKNI DIAMOND</span>
            <h2 style={{ ...UB, fontSize:'clamp(26px,4vw,44px)', color:'white', marginBottom:16, lineHeight:1.05 }}>Got a Room to Rent?<br/>Get Diamond — Fill It Fast.</h2>
            <p style={{ fontSize:15, color:'rgba(255,255,255,0.65)', lineHeight:1.8, marginBottom:28, maxWidth:480 }}>Priority placement, verified badge tenants trust, and instant boost across SouKni's network. The fastest way to fill your room in Morocco.</p>
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
            <h2 style={{ ...UB, fontSize:'clamp(26px,4vw,40px)', color:'white', marginBottom:12, lineHeight:1.05 }}>LIST YOUR ROOM TODAY</h2>
            <p style={{ fontSize:15, color:'rgba(255,255,255,0.85)', maxWidth:480, lineHeight:1.7 }}>Reach thousands of tenants across Morocco — post your room for free in under 2 minutes.</p>
            <div style={{ display:'flex', gap:12, marginTop:24 }}>
              <button style={{ backgroundColor:'white', color:C.mint, border:'none', padding:'12px 24px', borderRadius:100, fontWeight:800, fontSize:13, cursor:'pointer' }}>🍎 App Store</button>
              <button style={{ backgroundColor:'rgba(255,255,255,0.15)', color:'white', border:'1px solid rgba(255,255,255,0.4)', padding:'12px 24px', borderRadius:100, fontWeight:800, fontSize:13, cursor:'pointer' }}>▶ Google Play</button>
            </div>
          </div>
          <Link href={`/${locale}/post-ad`} style={{ textDecoration:'none' }}>
            <span style={{ display:'inline-block', backgroundColor:'white', color:C.mint, padding:'18px 40px', borderRadius:100, fontWeight:900, fontSize:15, cursor:'pointer', whiteSpace:'nowrap', ...UB }}>Post Free Ad →</span>
          </Link>
        </section>

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
