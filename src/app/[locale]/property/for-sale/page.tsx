'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { Heart, Search, ChevronsLeft, ChevronLeft, ChevronRight, ChevronsRight, MapPin, Bed, Bath, Maximize, Phone } from 'lucide-react'

const listings = [
  { id: 'p1', badge: 'Verified', badge2: 'Ready', title: 'High ROI Modern Investment Lagoon View', type: 'Apartment', price: '2,450,000', location: 'Anfa Place, Casablanca', beds: 3, baths: 2, area: 125, image: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&w=700' },
  { id: 'p2', badge: 'New Listing', title: 'Stunning Beachfront Villa with Private Pool', type: 'Villa', price: '12,700,000', location: 'Malabata, Tangier', beds: 5, baths: 6, area: 450, image: 'https://images.pexels.com/photos/2581922/pexels-photo-2581922.jpeg?auto=compress&w=700' },
  { id: 'p3', badge: 'Verified', title: 'Modern Luxury Villa with Private Pool', type: 'Villa', price: '8,500,000', location: 'Marrakech, Palmeraie', beds: 4, baths: 4, area: 380, image: 'https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg?auto=compress&w=700' },
  { id: 'p4', badge: 'New', title: 'Ultra-Modern Apartment with Ocean View', type: 'Apartment', price: '4,200,000', location: 'Casablanca Finance City', beds: 2, baths: 2, area: 145, image: 'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&w=700' },
  { id: 'p5', badge: 'Exclusive', title: 'Traditional Luxury Riad in Medina', type: 'Riad', price: '6,750,000', location: 'Rabat Medina', beds: 6, baths: 5, area: 320, image: 'https://images.pexels.com/photos/440731/pexels-photo-440731.jpeg?auto=compress&w=700' },
  { id: 'p6', badge: 'Verified', title: 'Ultra-Modern Minimalist Apartment', type: 'Apartment', price: '5,200,000', location: 'Casablanca, Anfa District', beds: 2, baths: 2, area: 120, image: 'https://images.pexels.com/photos/2581922/pexels-photo-2581922.jpeg?auto=compress&w=700' },
  { id: 'p7', badge: 'Exclusive', title: 'Contemporary Oasis Villa', type: 'Villa', price: '11,800,000', location: 'Marrakech, Hivernage', beds: 5, baths: 6, area: 600, image: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&w=700' },
  { id: 'p8', badge: 'Exclusive', title: 'Luxury Beachfront Villa with Infinity Pool', type: 'Villa', price: '15,000,000', location: 'Agadir, Atlantic Coast', beds: 6, baths: 7, area: 850, image: 'https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg?auto=compress&w=700' },
  { id: 'p9', badge: 'Verified', title: 'Premium Retail Space in High-End Mall', type: 'Commercial', price: '4,500,000', location: 'Rabat, Souissi', area: 120, image: 'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&w=700' },
  { id: 'p10', badge: 'New Listing', title: 'Charming Traditional House', type: 'House', price: '2,800,000', location: 'Chefchaouen Medina', beds: 4, baths: 3, area: 210, image: 'https://images.pexels.com/photos/440731/pexels-photo-440731.jpeg?auto=compress&w=700' },
]

const newProjects = [
  { name: 'The Marina Heights', city: 'Casablanca Finance City', price: 'From 1.2M MAD', image: 'https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg?auto=compress&w=200' },
  { name: 'Atlas Green Resort', city: 'Marrakech, Palmeraie', price: 'From 3.5M MAD', image: 'https://images.pexels.com/photos/2581922/pexels-photo-2581922.jpeg?auto=compress&w=200' },
]

function BadgeChip({ label }: { label: string }) {
  const isNavy = label === 'Ready' || label === 'New'
  return (
    <span style={{ backgroundColor: isNavy ? 'rgba(15,23,42,0.8)' : '#22d4a8', color: 'white', fontSize: '9px', fontWeight: 800, padding: '3px 8px', borderRadius: '4px', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{label}</span>
  )
}

function PropertyCard({ prop }: { prop: typeof listings[0] }) {
  const [saved, setSaved] = useState(false)
  const [hovered, setHovered] = useState(false)
  return (
    <article onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{ backgroundColor: 'white', borderRadius: '16px', overflow: 'hidden', border: hovered ? '1px solid rgba(45,212,191,0.3)' : '1px solid #f1f5f9', display: 'flex', height: '240px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', transition: 'all 0.3s', cursor: 'pointer' }}>
      <div style={{ width: '40%', position: 'relative', overflow: 'hidden', flexShrink: 0 }}>
        <img src={prop.image} alt={prop.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s', transform: hovered ? 'scale(1.1)' : 'scale(1)' }} />
        <div style={{ position: 'absolute', top: '12px', left: '12px', display: 'flex', gap: '6px' }}>
          <BadgeChip label={prop.badge} />
          {(prop as any).badge2 && <BadgeChip label={(prop as any).badge2} />}
        </div>
        <button onClick={e => { e.stopPropagation(); setSaved(!saved) }}
          style={{ position: 'absolute', top: '10px', right: '10px', width: '34px', height: '34px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(12px)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Heart size={16} fill={saved ? '#ef4444' : 'none'} color={saved ? '#ef4444' : 'white'} />
        </button>
      </div>
      <div style={{ flex: 1, padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
            <h3 style={{ fontSize: '22px', fontWeight: 800, color: '#161d1b', letterSpacing: '-0.02em' }}>{prop.price} MAD</h3>
            <span style={{ fontSize: '11px', color: '#6b7a76', fontWeight: 500 }}>{prop.type}</span>
          </div>
          <h2 style={{ fontSize: '15px', fontWeight: 500, color: hovered ? '#22d4a8' : '#0f172a', marginBottom: '6px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', transition: 'color 0.15s' }}>{prop.title}</h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#6b7a76', fontSize: '12px', marginBottom: '14px' }}>
            <MapPin size={13} /> {prop.location}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', fontSize: '12px', color: '#475569', borderTop: '1px solid #f1f5f9', paddingTop: '12px' }}>
            {prop.beds && <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Bed size={14} /> {prop.beds} Beds</span>}
            {prop.baths && <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Bath size={14} /> {prop.baths} Baths</span>}
            {prop.area && <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Maximize size={14} /> {prop.area} sqm</span>}
          </div>
        </div>
        <div style={{ display: 'flex', gap: '10px', marginTop: '12px' }}>
          <button style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', border: '1px solid #e2e8f0', backgroundColor: 'transparent', color: '#161d1b', fontWeight: 700, fontSize: '13px', padding: '10px', borderRadius: '10px', cursor: 'pointer' }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#f8fafc'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}>
            <Phone size={14} /> Call
          </button>
          <button style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', backgroundColor: '#22d4a8', color: 'white', fontWeight: 700, fontSize: '13px', padding: '10px', borderRadius: '10px', border: 'none', cursor: 'pointer' }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#0f9b8e'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = '#22d4a8'}>
            💬 WhatsApp
          </button>
        </div>
      </div>
    </article>
  )
}

export default function PropertyForSalePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = React.use(params)
  const [currentPage, setCurrentPage] = useState(1)
  const [activeFilter, setActiveFilter] = useState('All')

  return (
    <div style={{ fontFamily: 'Inter, system-ui, sans-serif', backgroundColor: '#f4fbf8', minHeight: '100vh' }}>

      {/* CINEMATIC HERO */}
      <section style={{ position: 'relative', height: '380px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        <img src="https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&w=1600" alt="Properties for Sale in Morocco"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(15,23,42,0.88), rgba(15,23,42,0.35))' }} />
        <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', padding: '0 20px', maxWidth: '760px', width: '100%' }}>
          <h1 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 900, letterSpacing: '-0.05em', fontSize: '48px', color: 'white', marginBottom: '12px', lineHeight: 1.05 }}>Properties for Sale in Morocco</h1>
          <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.82)', marginBottom: '28px' }}>25,180 verified listings across Morocco</p>
          <div style={{ display: 'flex', backgroundColor: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.25)', borderRadius: '100px', padding: '6px 6px 6px 0', maxWidth: '640px', margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', padding: '0 20px', borderRight: '1px solid rgba(255,255,255,0.2)', gap: '8px', minWidth: '160px' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              <input type="text" placeholder="City" style={{ backgroundColor: 'transparent', border: 'none', outline: 'none', fontSize: '14px', color: 'white', fontFamily: 'Inter, sans-serif', width: '100px' }} />
            </div>
            <input type="text" placeholder="City, area or keyword..."
              style={{ flex: 1, backgroundColor: 'transparent', border: 'none', outline: 'none', fontSize: '14px', color: 'white', fontFamily: 'Inter, sans-serif', padding: '10px 16px' }} />
            <button style={{ backgroundColor: '#22d4a8', color: 'white', border: 'none', padding: '12px 26px', borderRadius: '100px', fontWeight: 700, fontSize: '13px', cursor: 'pointer', whiteSpace: 'nowrap' }}>Search</button>
          </div>
        </div>
      </section>

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '14px 24px', fontSize: '11px', color: '#6b7a76', display: 'flex', alignItems: 'center', gap: '6px' }}>
        <Link href={`/${locale}`} style={{ color: '#6b7a76', textDecoration: 'none' }}>Home</Link>
        <span>›</span>
        <Link href={`/${locale}/property`} style={{ color: '#6b7a76', textDecoration: 'none' }}>Property</Link>
        <span>›</span>
        <span style={{ color: '#161d1b', fontWeight: 600 }}>Property for sale in Morocco</span>
      </div>

      <main style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px 80px' }}>

        {/* TITLE + SEARCH BAR */}
        <section style={{ marginBottom: '28px' }}>
          <h1 style={{ fontSize: '22px', fontWeight: 800, color: '#161d1b', marginBottom: '14px' }}>
            Properties for sale in Morocco <span style={{ color: '#6b7a76', fontWeight: 400, fontSize: '16px' }}>12,450 Ads</span>
          </h1>
          <div style={{ backgroundColor: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(12px)', border: '1px solid white', padding: '8px', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
            <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)' }}>
              {[{ label: 'Property For', val: 'Buy' }, { label: 'Location', val: 'Casablanca...' }, { label: 'Property Type', val: 'All Residential' }, { label: 'Price Range', val: 'Any' }, { label: 'Beds', val: 'Any' }, { label: 'Filters', val: 'Baths, Area...' }].map((f, i) => (
                <div key={f.label} style={{ padding: '8px 16px', borderRight: i < 5 ? '1px solid #f1f5f9' : 'none', display: 'flex', flexDirection: 'column', cursor: 'pointer' }}
                  onMouseEnter={e => e.currentTarget.style.backgroundColor = '#f8fafc'}
                  onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}>
                  <span style={{ fontSize: '9px', textTransform: 'uppercase', fontWeight: 700, color: '#6b7a76', letterSpacing: '0.1em' }}>{f.label}</span>
                  <span style={{ fontSize: '13px', fontWeight: 500, color: '#161d1b', marginTop: '2px' }}>{f.val}</span>
                </div>
              ))}
            </div>
            <button style={{ backgroundColor: '#22d4a8', color: 'white', border: 'none', padding: '14px 16px', borderRadius: '12px', cursor: 'pointer', flexShrink: 0 }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = '#0f9b8e'}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = '#22d4a8'}>
              <Search size={22} color="white" />
            </button>
          </div>
          <div style={{ marginTop: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', gap: '8px' }}>
              {['All', 'Ready', 'Off-Plan'].map(f => (
                <button key={f} onClick={() => setActiveFilter(f)}
                  style={{ padding: '6px 20px', borderRadius: '100px', backgroundColor: 'white', border: activeFilter === f ? '1px solid #22d4a8' : '1px solid #e2e8f0', fontSize: '13px', fontWeight: 500, color: activeFilter === f ? '#22d4a8' : '#0f172a', cursor: 'pointer' }}>{f}</button>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '16px', fontSize: '13px' }}>
              <button style={{ border: 'none', backgroundColor: 'transparent', cursor: 'pointer', fontWeight: 500, color: '#6b7a76' }}>⇅ Sort: Popular</button>
              <button style={{ border: 'none', backgroundColor: 'transparent', cursor: 'pointer', fontWeight: 500, color: '#6b7a76' }}>🔖 Save Search</button>
            </div>
          </div>
        </section>

        {/* MAIN GRID + SIDEBAR */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '28px', alignItems: 'start' }}>

          {/* LISTINGS */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {listings.slice(0, 2).map(p => <PropertyCard key={p.id} prop={p} />)}

            {/* ESTIMATE BANNER */}
            <div style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', borderRadius: '16px', padding: '28px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', right: '-20px', bottom: '-20px', opacity: 0.08, fontSize: '120px' }}>📊</div>
              <div style={{ position: 'relative', zIndex: 1 }}>
                <h2 style={{ fontSize: '20px', fontWeight: 800, color: 'white', marginBottom: '6px' }}>What's your property worth today?</h2>
                <p style={{ fontSize: '13px', color: '#94a3b8', marginBottom: '16px', maxWidth: '420px', lineHeight: 1.6 }}>Get an instant SouKni Estimate with accurate, data-driven property insights.</p>
                <button style={{ backgroundColor: '#22d4a8', color: 'white', border: 'none', padding: '11px 24px', borderRadius: '8px', fontWeight: 700, fontSize: '13px', cursor: 'pointer' }}>Get Your Free Estimate →</button>
              </div>
            </div>

            {listings.slice(2, 7).map(p => <PropertyCard key={p.id} prop={p} />)}

            {/* VIRTUAL VIEWING BANNER */}
            <div style={{ borderRadius: '16px', overflow: 'hidden', border: '1px solid #f1f5f9' }}>
              <div style={{ background: 'linear-gradient(135deg, #0f9b8e 0%, #22d4a8 100%)', padding: '28px 32px', display: 'flex', alignItems: 'center', gap: '20px' }}>
                <div style={{ fontSize: '40px' }}>🎥</div>
                <div>
                  <div style={{ display: 'inline-flex', backgroundColor: 'rgba(255,255,255,0.2)', padding: '3px 10px', borderRadius: '100px', fontSize: '9px', fontWeight: 800, color: 'white', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px' }}>✓ Powered by SouKni AI</div>
                  <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'white', marginBottom: '4px' }}>Virtual Viewing Available</h3>
                  <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.85)' }}>Explore properties with immersive 360° tours and AI-powered videos.</p>
                </div>
              </div>
            </div>

            {/* IMMO PRO BANNER */}
            <div style={{ position: 'relative', borderRadius: '16px', overflow: 'hidden', height: '220px', cursor: 'pointer' }}>
              <img src="https://images.pexels.com/photos/2581922/pexels-photo-2581922.jpeg?auto=compress&w=1400" alt="Immo Pro" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(15,23,42,0.92) 0%, rgba(15,23,42,0.62) 60%, transparent 100%)', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '32px' }}>
                <div style={{ maxWidth: '380px' }}>
                  <h2 style={{ fontSize: '26px', fontWeight: 800, color: 'white', marginBottom: '8px' }}>SouKni Immo Pro</h2>
                  <p style={{ fontSize: '13px', color: '#cbd5e1', marginBottom: '18px', lineHeight: 1.6 }}>Boost your property visibility to over 2M monthly seekers.</p>
                  <button style={{ backgroundColor: '#22d4a8', color: '#161d1b', border: 'none', padding: '11px 24px', borderRadius: '8px', fontWeight: 700, fontSize: '13px', cursor: 'pointer' }}>Get Started Today</button>
                </div>
              </div>
            </div>

            {listings.slice(7).map(p => <PropertyCard key={p.id} prop={p} />)}

            {/* PAGINATION */}
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', marginTop: '12px' }}>
              <div style={{ display: 'flex', gap: '6px', marginRight: '16px' }}>
                {[ChevronsLeft, ChevronLeft].map((Icon, i) => (
                  <button key={i} style={{ width: '40px', height: '40px', borderRadius: '8px', border: '1px solid #e2e8f0', backgroundColor: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}><Icon size={15} color="#94a3b8" /></button>
                ))}
              </div>
              {[1,2,3,4,5,6,7,8,9,10].map(page => (
                <button key={page} onClick={() => setCurrentPage(page)}
                  style={{ width: '40px', height: '40px', borderRadius: '8px', border: page === currentPage ? 'none' : '1px solid #e2e8f0', backgroundColor: page === currentPage ? '#22d4a8' : 'white', color: page === currentPage ? 'white' : '#0f172a', fontSize: '13px', fontWeight: page === currentPage ? 700 : 500, cursor: 'pointer', boxShadow: page === currentPage ? '0 2px 8px rgba(45,212,191,0.3)' : 'none' }}>{page}</button>
              ))}
              <div style={{ display: 'flex', gap: '6px', marginLeft: '16px' }}>
                {[ChevronRight, ChevronsRight].map((Icon, i) => (
                  <button key={i} style={{ width: '40px', height: '40px', borderRadius: '8px', border: '1px solid #e2e8f0', backgroundColor: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}><Icon size={15} color="#94a3b8" /></button>
                ))}
              </div>
            </div>
          </div>

          {/* SIDEBAR */}
          <aside style={{ display: 'flex', flexDirection: 'column', gap: '20px', position: 'sticky', top: '114px' }}>
            <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '20px', border: '1px solid #f1f5f9', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h3 style={{ fontWeight: 800, color: '#161d1b', fontSize: '14px' }}>New Projects in Morocco</h3>
                <Link href={`/${locale}/property/new-projects`} style={{ color: '#22d4a8', fontSize: '12px', fontWeight: 600, textDecoration: 'none' }}>View All</Link>
              </div>
              {newProjects.map((proj, i) => (
                <div key={proj.name} style={{ display: 'flex', gap: '14px', cursor: 'pointer', paddingTop: i > 0 ? '14px' : '0', marginTop: i > 0 ? '14px' : '0', borderTop: i > 0 ? '1px solid #f1f5f9' : 'none' }}>
                  <div style={{ width: '72px', height: '72px', borderRadius: '10px', overflow: 'hidden', flexShrink: 0 }}>
                    <img src={proj.image} alt={proj.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div>
                    <h4 style={{ fontWeight: 700, fontSize: '13px', color: '#161d1b', marginBottom: '3px' }}>{proj.name}</h4>
                    <p style={{ fontSize: '11px', color: '#6b7a76', marginBottom: '6px' }}>{proj.city}</p>
                    <span style={{ fontSize: '12px', fontWeight: 700, color: '#161d1b' }}>{proj.price}</span>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ background: 'rgba(45,212,191,0.06)', border: '2px solid rgba(45,212,191,0.2)', borderRadius: '16px', padding: '20px' }}>
              <span style={{ backgroundColor: '#22d4a8', color: 'white', fontSize: '9px', fontWeight: 800, padding: '2px 8px', borderRadius: '4px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Pro Only</span>
              <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#161d1b', marginTop: '10px', marginBottom: '6px' }}>List Your Agency on SouKni</h3>
              <p style={{ fontSize: '12px', color: '#475569', marginBottom: '14px', lineHeight: 1.6 }}>Reach over 2M property seekers monthly in Morocco.</p>
              <button style={{ width: '100%', backgroundColor: '#0f172a', color: 'white', border: 'none', padding: '12px', borderRadius: '10px', fontWeight: 700, fontSize: '13px', cursor: 'pointer' }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = '#1e293b'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = '#0f172a'}>Get Started Today</button>
            </div>

            <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '20px', border: '1px solid #f1f5f9', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
              <h3 style={{ fontWeight: 800, color: '#161d1b', fontSize: '14px', marginBottom: '6px' }}>Get Price Alerts</h3>
              <p style={{ fontSize: '12px', color: '#6b7a76', marginBottom: '14px', lineHeight: 1.6 }}>We'll notify you when new properties matching your search are listed.</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <input type="email" placeholder="Enter your email" style={{ width: '100%', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '10px 14px', fontSize: '13px', outline: 'none', boxSizing: 'border-box' }} />
                <button style={{ width: '100%', backgroundColor: '#22d4a8', color: 'white', border: 'none', padding: '11px', borderRadius: '8px', fontWeight: 700, fontSize: '13px', cursor: 'pointer' }}
                  onMouseEnter={e => e.currentTarget.style.backgroundColor = '#0f9b8e'}
                  onMouseLeave={e => e.currentTarget.style.backgroundColor = '#22d4a8'}>Enable Alerts</button>
              </div>
            </div>
          </aside>
        </div>

        {/* DIAMOND BANNER */}
        <section style={{ marginTop: '40px', borderRadius: '16px', background: 'linear-gradient(135deg, #22d4a8 0%, #0f9b8e 100%)', padding: '40px 48px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '24px' }}>
          <div>
            <h2 style={{ fontSize: '28px', fontWeight: 800, color: 'white', marginBottom: '8px', letterSpacing: '-0.02em' }}>Become a Diamond Seller — Get a Verified Account</h2>
            <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.9)' }}>Unlock exclusive benefits and build ultimate trust with premium buyers.</p>
          </div>
          <button style={{ backgroundColor: 'white', color: '#22d4a8', border: 'none', padding: '14px 32px', borderRadius: '12px', fontWeight: 800, fontSize: '15px', cursor: 'pointer', flexShrink: 0, whiteSpace: 'nowrap' }}>Get Verified Now</button>
        </section>
      </main>
    </div>
  )
}
