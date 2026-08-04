'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Heart, Search, ChevronRight } from 'lucide-react'

const C = { mint:'#22d4a8', mintDk:'#0f9b8e', ink:'#161d1b', surface:'#f4fbf8', muted:'#6b7a76' }
const UB = { fontFamily:"'Inter',sans-serif", fontWeight:900, letterSpacing:'-0.05em' } as const

const categories = [
  { slug:'for-sale',              label:'For Sale',            count:'25,180', emoji:'🏢', image:'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&w=600' },
  { slug:'for-rent',              label:'For Rent',            count:'1,840',  emoji:'🏡', image:'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&w=600' },
  { slug:'rooms',                 label:'Rooms',               count:'3,215',  emoji:'🚪', image:'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&w=600' },
  { slug:'daily-rentals',         label:'Daily Rentals',       count:'642',    emoji:'🏖️', image:'https://images.pexels.com/photos/2872755/pexels-photo-2872755.jpeg?auto=compress&w=600' },
  { slug:'commercial',            label:'Commercial',          count:'1,195',  emoji:'🏪', image:'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&w=600' },
  { slug:'new-projects',          label:'New Projects',        count:'84',     emoji:'🏗️', image:'https://images.pexels.com/photos/1918291/pexels-photo-1918291.jpeg?auto=compress&w=600' },
  { slug:'land-plots',         label:'Lands & Plots',       count:'2,410',  emoji:'🌾', image:'https://images.pexels.com/photos/162553/excavator-construction-site-machine-162553.jpeg?auto=compress&w=600' },
  { slug:'commercial-properties', label:'Business Investment', count:'568',    emoji:'📈', image:'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&w=600' },
]

const apartments = [
  { id:'ap1', title: 'Marina Waterfront View 2BR', price: '12,500', unit: 'MAD/mo', location: 'Casablanca', badges: ['Diamond', 'Verified'], attr1: { icon: '🛏️', label: '2 Beds' }, attr2: { icon: '🛁', label: '2 Baths' }, image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&w=500' },
  { id:'ap2', title: 'Villa Oasis Royale',         price: '45,000', unit: 'MAD/mo', location: 'Marrakech',  badges: [], attr1: { icon: '🛏️', label: '4 Beds' }, attr2: { icon: '🏊', label: 'Pool' }, image: 'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&w=500' },
  { id:'ap3', title: 'Artist Studio in Gauthier',  price: '6,800',  unit: 'MAD/mo', location: 'Casablanca', badges: ['Verified'], attr1: { icon: '🛏️', label: '1 Bed' }, attr2: { icon: '📐', label: '55m²' }, image: 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&w=500' },
  { id:'ap4', title: 'Industrial Chic Penthouse',  price: '18,200', unit: 'MAD/mo', location: 'Tangier',    badges: [], attr1: { icon: '🛏️', label: '3 Beds' }, attr2: { icon: '🏠', label: 'Duplex' }, image: 'https://images.pexels.com/photos/1918291/pexels-photo-1918291.jpeg?auto=compress&w=500' },
]

const villas = [
  { id:'vl1', title: 'Villa Oasis Royale',        price: '8,500,000',  unit: 'MAD', location: 'Marrakech, Palmeraie', badges: ['Diamond', 'Verified'], attr1: { icon: '🛏️', label: '5 Beds' }, attr2: { icon: '🏊', label: 'Pool' }, image: 'https://images.pexels.com/photos/2581922/pexels-photo-2581922.jpeg?auto=compress&w=500' },
  { id:'vl2', title: 'Beachfront Sanctuary',       price: '12,400,000', unit: 'MAD', location: 'Agadir',              badges: ['Diamond'], attr1: { icon: '🛏️', label: '4 Beds' }, attr2: { icon: '🌊', label: 'Ocean View' }, image: 'https://images.pexels.com/photos/1268871/pexels-photo-1268871.jpeg?auto=compress&w=500' },
  { id:'vl3', title: 'Embassy District Villa',     price: '9,200,000',  unit: 'MAD', location: 'Rabat, Hay Riad',     badges: ['Diamond'], attr1: { icon: '🛏️', label: '4 Beds' }, attr2: { icon: '🌿', label: 'Garden' }, image: 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&w=500' },
  { id:'vl4', title: 'Mediterranean Heights',      price: '7,800,000',  unit: 'MAD', location: 'Tangier',             badges: ['Diamond'], attr1: { icon: '🛏️', label: '3 Beds' }, attr2: { icon: '👁️', label: 'Panoramic' }, image: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&w=500' },
]

const vacations = [
  { id:'vc1', title: 'Historic Riad in Marrakech Medina', price: '1,800', unit: 'MAD/day', location: 'Marrakech Medina',  badges: ['Diamond'], attr1: { icon: '🏛️', label: 'Traditional' }, attr2: { icon: '🏊', label: 'Pool' }, image: 'https://images.pexels.com/photos/2872755/pexels-photo-2872755.jpeg?auto=compress&w=500' },
  { id:'vc2', title: 'Beachfront Oasis Tangier',          price: '2,200', unit: 'MAD/day', location: 'Tangier, Malabata', badges: ['Diamond'], attr1: { icon: '🌊', label: 'Sea View' }, attr2: { icon: '🏗️', label: 'Terrace' }, image: 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&w=500' },
  { id:'vc3', title: 'Luxury Desert Glamping',            price: '3,500', unit: 'MAD/day', location: 'Merzouga Dunes',   badges: ['Diamond'], attr1: { icon: '⛺', label: 'Premium' }, attr2: { icon: '🍽️', label: 'Full Board' }, image: 'https://images.pexels.com/photos/2245436/pexels-photo-2245436.jpeg?auto=compress&w=500' },
  { id:'vc4', title: 'Atlas Mountain Escape',             price: '4,200', unit: 'MAD/day', location: 'Imlil, Atlas',     badges: ['Diamond'], attr1: { icon: '🏊', label: 'Infinity Pool' }, attr2: { icon: '💆', label: 'Spa' }, image: 'https://images.pexels.com/photos/1458457/pexels-photo-1458457.jpeg?auto=compress&w=500' },
]

const commercial = [
  { id:'cm1', title: 'Skyline Executive Office',  price: '45,000', unit: 'MAD/mo', location: 'Casablanca Finance City', badges: ['Diamond', 'Verified'], attr1: { icon: '💼', label: 'Office' }, attr2: { icon: '📐', label: '450m²' }, image: 'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&w=500' },
  { id:'cm2', title: 'Luxury Boutique Retail',    price: '32,000', unit: 'MAD/mo', location: 'Rabat, Souissi Mall',     badges: ['Diamond', 'Verified'], attr1: { icon: '🏪', label: 'Retail' }, attr2: { icon: '📐', label: '120m²' }, image: 'https://images.pexels.com/photos/1109561/pexels-photo-1109561.jpeg?auto=compress&w=500' },
  { id:'cm3', title: 'Heritage Boutique Office',  price: '28,500', unit: 'MAD/mo', location: 'Marrakech, Hivernage',    badges: ['Diamond', 'Verified'], attr1: { icon: '💼', label: 'Office' }, attr2: { icon: '📐', label: '210m²' }, image: 'https://images.pexels.com/photos/380769/pexels-photo-380769.jpeg?auto=compress&w=500' },
  { id:'cm4', title: 'Logistics Hub Med-Zone',    price: '85,000', unit: 'MAD/mo', location: 'Tangier Med Zone',        badges: ['Diamond', 'Verified'], attr1: { icon: '🏭', label: 'Warehouse' }, attr2: { icon: '📐', label: '1200m²' }, image: 'https://images.pexels.com/photos/2219024/pexels-photo-2219024.jpeg?auto=compress&w=500' },
]

type PropItem = typeof apartments[0]

function PropertyCard({ item }: { item: PropItem }) {
  const [liked, setLiked] = useState(false)
  const [hovered, setHovered] = useState(false)
  return (
    <article onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{ backgroundColor: 'white', borderRadius: '24px', overflow: 'hidden', border: `1px solid ${hovered ? C.mint : 'rgba(186,202,197,0.2)'}`, boxShadow: hovered ? '0 20px 48px rgba(0,0,0,0.12)' : '0 2px 8px rgba(0,0,0,0.04)', transition: 'all 0.3s' }}>
      <div style={{ position: 'relative', aspectRatio: '4/3', overflow: 'hidden' }}>
        <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s', transform: hovered ? 'scale(1.06)' : 'scale(1)' }} />
        <div style={{ position: 'absolute', top: '10px', left: '10px', display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          {item.badges.includes('Diamond') && (
            <span style={{ background: `linear-gradient(135deg, ${C.mint}, ${C.mintDk})`, color: 'white', fontSize: '8px', fontWeight: 900, padding: '3px 10px', borderRadius: '100px', textTransform: 'uppercase', letterSpacing: '0.07em' }}>💎 Diamond</span>
          )}
          {item.badges.includes('Verified') && (
            <span style={{ backgroundColor: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(8px)', color: C.mint, fontSize: '8px', fontWeight: 900, padding: '3px 10px', borderRadius: '100px', textTransform: 'uppercase', letterSpacing: '0.07em' }}>✓ Verified</span>
          )}
        </div>
        <button onClick={() => setLiked(!liked)} style={{ position: 'absolute', top: '10px', right: '10px', width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
          <Heart size={14} color={liked ? '#ef4444' : 'white'} fill={liked ? '#ef4444' : 'none'} />
        </button>
        <div style={{ position: 'absolute', bottom: '10px', left: '10px', backgroundColor: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(8px)', padding: '5px 12px', borderRadius: '100px' }}>
          <span style={{ color: C.mint, fontSize: '13px', fontWeight: 900 }}>{item.price} </span>
          <span style={{ color: C.muted, fontSize: '10px' }}>{item.unit}</span>
        </div>
      </div>
      <div style={{ padding: '16px 18px' }}>
        <h3 style={{ fontFamily:"'Hanken Grotesk',sans-serif", fontWeight: 900, letterSpacing: '-0.03em', fontSize: '14px', color: C.ink, marginBottom: '6px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.title}</h3>
        <p style={{ fontSize: '11px', color: C.muted, marginBottom: '10px' }}>📍 {item.location}</p>
        <div style={{ display: 'flex', gap: '14px', borderTop: '1px solid #f1f5f9', paddingTop: '10px', marginBottom: '12px' }}>
          <span style={{ fontSize: '11px', color: '#475569', fontWeight: 600 }}>{item.attr1.icon} {item.attr1.label}</span>
          <span style={{ fontSize: '11px', color: '#475569', fontWeight: 600 }}>{item.attr2.icon} {item.attr2.label}</span>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button style={{ flex: 1, backgroundColor: C.surface, color: '#3c4a46', border: 'none', padding: '9px', borderRadius: '100px', fontWeight: 700, fontSize: '12px', cursor: 'pointer' }}>Message</button>
          <button style={{ flex: 1, backgroundColor: '#25D366', color: 'white', border: 'none', padding: '9px', borderRadius: '100px', fontWeight: 700, fontSize: '12px', cursor: 'pointer' }}>💬 WhatsApp</button>
        </div>
      </div>
    </article>
  )
}

export default function PropertyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = React.use(params)
  const [keyword, setKeyword] = useState('')
  const [hovCat, setHovCat] = useState<string|null>(null)

  return (
    <div style={{ fontFamily:"'Inter',sans-serif", backgroundColor:C.surface, minHeight:'100vh' }}>

      {/* CINEMATIC HERO */}
      <section style={{ position:'relative', height:520, overflow:'hidden', display:'flex', alignItems:'center', justifyContent:'center' }}>
        <img src="https://images.pexels.com/photos/2581922/pexels-photo-2581922.jpeg?auto=compress&w=1600" alt="Property"
          style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover' }} />
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top,rgba(15,23,42,0.88),rgba(15,23,42,0.32))' }} />
        <div style={{ position:'relative', zIndex:10, textAlign:'center', padding:'0 24px', maxWidth:760, width:'100%' }}>
          <p style={{ fontSize:11, fontWeight:800, color:C.mint, textTransform:'uppercase' as const, letterSpacing:'0.2em', marginBottom:16 }}>SouKni Property</p>
          <h1 style={{ ...UB, fontSize:'clamp(36px,6vw,68px)', color:'white', lineHeight:1.0, marginBottom:20, textTransform:'uppercase' as const }}>
            PREMIUM.<br />PROPERTY.<br />MOROCCO.
          </h1>
          <p style={{ fontSize:16, color:'rgba(255,255,255,0.75)', marginBottom:32, maxWidth:520, margin:'0 auto 32px' }}>
            Apartments, villas, vacation homes and commercial spaces
          </p>
          <div style={{ display:'flex', alignItems:'stretch', backgroundColor:'rgba(255,255,255,0.12)', backdropFilter:'blur(24px)', border:'1px solid rgba(255,255,255,0.25)', borderRadius:100, overflow:'hidden', maxWidth:680, margin:'0 auto', boxShadow:'0 8px 32px rgba(0,0,0,0.2)' }}>
            <div style={{ display:'flex', flexDirection:'column' as const, padding:'14px 22px', flex:'0 0 160px', borderRight:'1px solid rgba(255,255,255,0.2)', gap:2 }}>
              <span style={{ fontSize:9, fontWeight:800, color:'rgba(255,255,255,0.55)', textTransform:'uppercase' as const, letterSpacing:'0.12em' }}>City</span>
              <input placeholder="Rabat" style={{ backgroundColor:'transparent', border:'none', outline:'none', fontSize:14, fontWeight:600, color:'white', fontFamily:"'Inter',sans-serif", padding:0 }} />
            </div>
            <div style={{ display:'flex', flexDirection:'column' as const, padding:'14px 22px', flex:1, borderRight:'1px solid rgba(255,255,255,0.2)', gap:2 }}>
              <span style={{ fontSize:9, fontWeight:800, color:'rgba(255,255,255,0.55)', textTransform:'uppercase' as const, letterSpacing:'0.12em' }}>Keyword</span>
              <input value={keyword} onChange={e=>setKeyword(e.target.value)} placeholder="Apartment, villa, riad..." style={{ backgroundColor:'transparent', border:'none', outline:'none', fontSize:14, fontWeight:600, color:'white', fontFamily:"'Inter',sans-serif", padding:0, width:'100%' }} />
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
        <div style={{ backgroundColor:'rgba(255,255,255,0.95)', backdropFilter:'blur(20px)', borderRadius:100, padding:'8px 8px 8px 0', boxShadow:'0 8px 40px rgba(0,0,0,0.10)', border:'1px solid rgba(255,255,255,0.7)', display:'flex', alignItems:'center' }}>
          {[
            { label:'City', val:'Rabat', w:1 },
            { label:'Keyword', val:'Apartment, villa, riad...', w:2 },
            { label:'Type', val:'All Property', w:1 },
            { label:'Price (MAD)', val:'Select Range', w:1 },
          ].map((f,i)=>(
            <div key={f.label} style={{ flex:f.w, padding:'8px 20px', borderRight:i<3?'1px solid rgba(186,202,197,0.25)':'none', display:'flex', flexDirection:'column' as const, cursor:'pointer', gap:1 }}>
              <span style={{ fontSize:9, textTransform:'uppercase' as const, fontWeight:700, color:C.muted, letterSpacing:'0.1em' }}>{f.label}</span>
              <span style={{ fontSize:13, fontWeight:600, color:C.ink }}>{f.val}</span>
            </div>
          ))}
          <button style={{ backgroundColor:C.mint, color:'white', border:'none', padding:'12px 24px', borderRadius:100, cursor:'pointer', fontWeight:700, fontSize:13, flexShrink:0, marginLeft:8, display:'flex', alignItems:'center', gap:6 }}>
            <Search size={15} /> SEARCH
          </button>
        </div>
      </div>

      <div style={{ maxWidth:1440, margin:'48px auto 0', padding:'0 40px 80px' }}>

        {/* BREADCRUMB */}
        <nav style={{ display:'flex', alignItems:'center', gap:6, fontSize:11, fontWeight:700, color:C.muted, textTransform:'uppercase' as const, letterSpacing:'0.06em', marginBottom:32 }}>
          <Link href={`/${locale}`} style={{ color:C.muted, textDecoration:'none' }}>Home</Link><span>›</span>
          <span style={{ color:C.ink }}>Property</span>
        </nav>

        {/* CATEGORY GRID */}
        <section style={{ marginBottom:32 }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:24 }}>
            <h2 style={{ ...UB, fontSize:28, color:C.ink }}>Browse by Category</h2>
            <span style={{ fontSize:14, color:C.muted }}>34,134 total listings</span>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:16 }}>
            {categories.map(cat=>(
              <Link key={cat.slug} href={`/${locale}/property/${cat.slug}`} style={{ textDecoration:'none' }}>
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
                        <p style={{ fontSize:11, color:'rgba(255,255,255,0.8)', fontWeight:600 }}>{cat.count} ads</p>
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

        {/* AR/AI FINDER BANNER — right after category grid, same spot as reference */}
        <section style={{ marginBottom:64 }}>
          <div style={{ background: 'linear-gradient(135deg, #161d1b, #2b3230)', borderRadius: '24px', padding: '20px 28px', display: 'flex', alignItems: 'center', gap: '16px', overflow: 'hidden', position: 'relative' }}>
            <div style={{ position: 'absolute', right: '-20px', top: '-20px', width: '100px', height: '100px', borderRadius: '50%', background: 'rgba(34,212,168,0.08)' }} />
            <div style={{ fontSize: '40px' }}>📷</div>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: '15px', fontWeight: 900, color: 'white', marginBottom: '3px', letterSpacing: '-0.03em' }}>Walk the street, find apartments</p>
              <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.55)', fontWeight: 700 }}>Point your camera — see available properties overlaid in AR/AI</p>
            </div>
            <Link href={`/${locale}/ar-finder`}
              style={{ padding: '10px 20px', borderRadius: '12px', background: C.mint, color: 'white', textDecoration: 'none', fontSize: '13px', fontWeight: 900, whiteSpace: 'nowrap', flexShrink: 0, transition:'background 0.15s' }}
              onMouseEnter={e=>(e.currentTarget as HTMLElement).style.backgroundColor=C.mintDk}
              onMouseLeave={e=>(e.currentTarget as HTMLElement).style.backgroundColor=C.mint}>
              Try AR/AI →
            </Link>
          </div>
        </section>

        {/* DIAMOND CERTIFIED BANNER */}
        <section style={{ marginBottom:64 }}>
          <div style={{ position:'relative', height:220, borderRadius:40, overflow:'hidden', cursor:'pointer', boxShadow:'0 20px 60px rgba(0,0,0,0.15)' }}>
            <img src="https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&w=1200" alt="Diamond Certified"
              style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover' }} />
            <div style={{ position:'absolute', inset:0, background:'linear-gradient(to right,rgba(22,29,27,0.92) 0%,rgba(22,29,27,0.5) 60%,transparent)' }} />
            <div style={{ position:'absolute', inset:0, display:'flex', flexDirection:'column' as const, justifyContent:'center', padding:'0 56px' }}>
              <span style={{ backgroundColor:C.mint, color:'white', fontSize:9, ...UB, padding:'4px 14px', borderRadius:100, textTransform:'uppercase' as const, letterSpacing:'0.12em', display:'inline-block', marginBottom:14, width:'fit-content' }}>SouKni Immo Pro</span>
              <h2 style={{ ...UB, fontSize:'clamp(20px,3vw,32px)', color:'white', marginBottom:20, lineHeight:1.1 }}>List your luxury property<br/>where the elite browse.</h2>
              <div style={{ display:'flex', gap:12 }}>
                <Link href={`/${locale}/diamond`} style={{ textDecoration:'none' }}>
                  <button style={{ backgroundColor:'white', color:C.ink, border:'none', padding:'11px 28px', borderRadius:100, fontSize:12, ...UB, cursor:'pointer' }}>Get Certified</button>
                </Link>
                <button style={{ backgroundColor:'transparent', color:'white', border:'1px solid rgba(255,255,255,0.4)', padding:'11px 28px', borderRadius:100, fontSize:12, fontWeight:700, cursor:'pointer' }}>Contact Expert</button>
              </div>
            </div>
          </div>
        </section>

        {/* LUXURY APARTMENTS FOR RENT */}
        <section style={{ marginBottom:64 }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:24 }}>
            <div>
              <h2 style={{ ...UB, fontSize:28, color:C.ink, marginBottom:4 }}>Luxury Apartments for Rent</h2>
              <p style={{ fontSize:14, color:C.muted }}>Curated selection of Morocco's finest urban living.</p>
            </div>
            <Link href={`/${locale}/property/for-rent`} style={{ color:C.mint, fontWeight:700, fontSize:13, textDecoration:'none', display:'flex', alignItems:'center', gap:4 }}>
              View all <ChevronRight size={14} />
            </Link>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:20 }}>
            {apartments.map(item => <PropertyCard key={item.id} item={item} />)}
          </div>
        </section>

        {/* AUTO PRO CROSS-PROMO BANNER */}
        <section style={{ marginBottom:64 }}>
          <div style={{ position:'relative', height:220, borderRadius:40, overflow:'hidden', cursor:'pointer', boxShadow:'0 20px 60px rgba(0,0,0,0.15)' }}>
            <img src="https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&w=1200" alt="Auto Pro"
              style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover' }} />
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

        {/* PREMIUM VILLAS FOR SALE */}
        <section style={{ marginBottom:64 }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:24 }}>
            <div>
              <h2 style={{ ...UB, fontSize:28, color:C.ink, marginBottom:4 }}>Premium Villas for Sale</h2>
              <p style={{ fontSize:14, color:C.muted }}>Exclusive estates in Morocco's most prestigious locations.</p>
            </div>
            <Link href={`/${locale}/property/for-sale`} style={{ color:C.mint, fontWeight:700, fontSize:13, textDecoration:'none', display:'flex', alignItems:'center', gap:4 }}>
              View all <ChevronRight size={14} />
            </Link>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:20 }}>
            {villas.map(item => <PropertyCard key={item.id} item={item} />)}
          </div>
        </section>

        {/* TRENDING SEARCHES */}
        <section style={{ marginBottom:64 }}>
          <h2 style={{ ...UB, fontSize:22, color:C.ink, marginBottom:20 }}>Trending in Property</h2>
          <div style={{ display:'flex', gap:10, flexWrap:'wrap' as const }}>
            {['Villa Marrakech','Apartment Casablanca','Riad Medina','Beachfront Agadir','Studio Rabat','Commercial Space','New Projects','Hay Riad','Palmeraie','Ocean View','Penthouse','Investment Property'].map(tag=>(
              <Link key={tag} href={`/${locale}/property/for-sale`} style={{ textDecoration:'none' }}>
                <span style={{ display:'inline-block', padding:'9px 18px', borderRadius:100, fontSize:13, fontWeight:700, backgroundColor:'white', color:C.ink, border:'1px solid rgba(186,202,197,0.4)', cursor:'pointer', transition:'all 0.15s' }}
                  onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.backgroundColor=C.mint;(e.currentTarget as HTMLElement).style.color='white'}}
                  onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.backgroundColor='white';(e.currentTarget as HTMLElement).style.color=C.ink}}>
                  {tag}
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* FEATURED VACATION HOMES */}
        <section style={{ marginBottom:64 }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:24 }}>
            <div>
              <h2 style={{ ...UB, fontSize:28, color:C.ink, marginBottom:4 }}>Featured Vacation Homes</h2>
              <p style={{ fontSize:14, color:C.muted }}>Hand-picked short-term stays across Morocco.</p>
            </div>
            <Link href={`/${locale}/property/daily-rentals`} style={{ color:C.mint, fontWeight:700, fontSize:13, textDecoration:'none', display:'flex', alignItems:'center', gap:4 }}>
              View all <ChevronRight size={14} />
            </Link>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:20 }}>
            {vacations.map(item => <PropertyCard key={item.id} item={item} />)}
          </div>
        </section>

        {/* FEATURED COMMERCIAL PROPERTIES */}
        <section style={{ marginBottom:64 }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:24 }}>
            <div>
              <h2 style={{ ...UB, fontSize:28, color:C.ink, marginBottom:4 }}>Featured Commercial Properties</h2>
              <p style={{ fontSize:14, color:C.muted }}>Strategic business locations across Morocco.</p>
            </div>
            <Link href={`/${locale}/property/commercial`} style={{ color:C.mint, fontWeight:700, fontSize:13, textDecoration:'none', display:'flex', alignItems:'center', gap:4 }}>
              View all <ChevronRight size={14} />
            </Link>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:20 }}>
            {commercial.map(item => <PropertyCard key={item.id} item={item} />)}
          </div>
        </section>

        {/* DIAMOND BANNER */}
        <section style={{ position:'relative', borderRadius:40, overflow:'hidden', marginBottom:48 }}>
          <img src="https://images.pexels.com/photos/2581922/pexels-photo-2581922.jpeg?auto=compress&w=1600" alt="Diamond"
            style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover' }} />
          <div style={{ position:'absolute', inset:0, background:'linear-gradient(135deg,rgba(15,23,42,0.96),rgba(15,23,42,0.7))' }} />
          <div style={{ position:'relative', zIndex:1, padding:'56px 64px', maxWidth:640 }}>
            <span style={{ display:'inline-flex', alignItems:'center', gap:6, background:`linear-gradient(135deg,${C.mint},${C.mintDk})`, color:'white', fontSize:9, ...UB, padding:'5px 16px', borderRadius:100, textTransform:'uppercase' as const, letterSpacing:'0.12em', marginBottom:20 }}>✦ SOUKNI CERTIFIED</span>
            <h2 style={{ ...UB, fontSize:'clamp(28px,4vw,48px)', color:'white', marginBottom:16, lineHeight:1.05 }}>Become a Diamond Certified Member.</h2>
            <p style={{ fontSize:15, color:'rgba(255,255,255,0.72)', lineHeight:1.7, marginBottom:28 }}>Boost your trust score, get exclusive access to off-market listings, and enjoy priority support.</p>
            <div style={{ display:'flex', gap:12 }}>
              <Link href={`/${locale}/diamond`} style={{ textDecoration:'none' }}>
                <button style={{ backgroundColor:C.mint, color:'white', border:'none', padding:'13px 28px', borderRadius:100, fontSize:13, ...UB, cursor:'pointer' }}>Get Certified Now</button>
              </Link>
              <button style={{ backgroundColor:'transparent', color:'white', border:'1px solid rgba(255,255,255,0.3)', padding:'13px 28px', borderRadius:100, fontSize:13, fontWeight:700, cursor:'pointer' }}>Learn More</button>
            </div>
          </div>
        </section>

        {/* JOIN THE SOUKNI FAMILY */}
        <section style={{ borderRadius:40, background:`linear-gradient(135deg,${C.mint},${C.mintDk})`, padding:'56px 64px', display:'flex', alignItems:'center', justifyContent:'space-between', gap:40, flexWrap:'wrap' as const }}>
          <div>
            <h2 style={{ ...UB, fontSize:'clamp(28px,4vw,44px)', color:'white', marginBottom:12, lineHeight:1.05 }}>LIST YOUR PROPERTY TODAY</h2>
            <p style={{ fontSize:15, color:'rgba(255,255,255,0.85)', maxWidth:480, lineHeight:1.7 }}>Reach millions of serious buyers and renters across Morocco for free.</p>
            <div style={{ display:'flex', gap:12, marginTop:24 }}>
              <button style={{ backgroundColor:'white', color:C.mint, border:'none', padding:'12px 24px', borderRadius:100, fontWeight:800, fontSize:13, cursor:'pointer', display:'flex', alignItems:'center', gap:8 }}>🍎 App Store</button>
              <button style={{ backgroundColor:'rgba(255,255,255,0.15)', color:'white', border:'1px solid rgba(255,255,255,0.4)', padding:'12px 24px', borderRadius:100, fontWeight:800, fontSize:13, cursor:'pointer', display:'flex', alignItems:'center', gap:8 }}>▶ Google Play</button>
            </div>
          </div>
          <Link href={`/${locale}/post-ad`} style={{ textDecoration:'none' }}>
            <span style={{ display:'inline-block', backgroundColor:'white', color:C.mint, padding:'16px 36px', borderRadius:100, fontWeight:900, fontSize:14, cursor:'pointer', whiteSpace:'nowrap' as const, ...UB }}>Post Free Ad →</span>
          </Link>
        </section>

      </div>
    </div>
  )
}
