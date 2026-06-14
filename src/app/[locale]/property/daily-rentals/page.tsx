'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Heart, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Bell, Bookmark } from 'lucide-react'
const catNav = ['Motors', 'Property', 'Services', 'Jobs', 'The Vault', 'Mobiles & Computers', 'Community', 'View More...']
const typePills = ['All', 'Villas', 'Riads', 'Apartments', 'Studios', 'Chalets', 'Camping', 'Guesthouse']
const listingsHorizontal = [
  { id: 'd1', type: 'Oceanfront Escape Villa - Beachfront Paradise', price: '2,450', location: '📍 Agadir, Founty', area: '📏 450 sqm', desc: 'Luxury villa with infinity pool and private beach access.', verified: true, image: 'https://images.pexels.com/photos/2581922/pexels-photo-2581922.jpeg?auto=compress&w=700' },
  { id: 'd2', type: 'Luxury Skyline Suite - Casablanca Business District', price: '1,100', location: '📍 Casablanca, Gauthier', area: '📏 120 sqm', desc: 'High-rise luxury suite with floor-to-ceiling windows and premium concierge.', verified: true, image: 'https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg?auto=compress&w=700' },
  { id: 'd3', type: 'Azure Coast Studio - Mediterranean Views', price: '650', location: '📍 Tangier, Malabata', area: '📏 65 sqm', desc: 'Modern studio ideal for solo travelers or couples, facing the Straits of Gibraltar.', verified: true, image: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&w=700' },
  { id: 'd4', type: 'Riad El-Fenn Heritage - Heart of the Medina', price: '1,800', location: '📍 Marrakech, Medina', area: '📏 350 sqm', desc: 'Exquisite 17th-century riad with a courtyard pool and panoramic terrace.', verified: true, image: 'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&w=700' },
  { id: 'd5', type: 'Contemporary Golf Villa - Marrakech', price: '3,200', location: '📍 Marrakech', area: '', desc: '', verified: true, image: 'https://images.pexels.com/photos/440731/pexels-photo-440731.jpeg?auto=compress&w=700' },
  { id: 'd6', type: 'Panoramic Ocean Penthouse - Rabat', price: '950', location: '📍 Rabat', area: '', desc: '', verified: true, image: 'https://images.pexels.com/photos/2581922/pexels-photo-2581922.jpeg?auto=compress&w=700' },
]
const listingsGrid = [
  { id: 'g1', type: 'Riad El-Fenn Heritage - Heart of the Medina', price: '1,800', location: '📍 Marrakech, Medina', image: 'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&w=600' },
  { id: 'g2', type: 'Contemporary Golf Villa - Palmeraie', price: '3,200', location: '📍 Marrakech, Palmeraie', image: 'https://images.pexels.com/photos/440731/pexels-photo-440731.jpeg?auto=compress&w=600' },
  { id: 'g3', type: 'Luxury Beachfront Duplex - Sunset Bay', price: '2,450', location: '📍 Agadir, Founty', image: 'https://images.pexels.com/photos/2581922/pexels-photo-2581922.jpeg?auto=compress&w=600' },
  { id: 'g4', type: 'Contemporary Studio - Tangier Bay', price: '850', location: '📍 Tangier, Malabata', image: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&w=600' },
]
function HorizontalCard({ prop }: { prop: typeof listingsHorizontal[0] }) {
  const [saved, setSaved] = useState(false)
  const [hovered, setHovered] = useState(false)
  return (
    <article onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} style={{ backgroundColor: 'white', border: hovered ? '1px solid #2dd4bf' : '1px solid #e5e7eb', borderRadius: '12px', overflow: 'hidden', display: 'flex', boxShadow: hovered ? '0 4px 16px rgba(0,0,0,0.1)' : 'none', transition: 'all 0.2s', cursor: 'pointer' }}>
      <div style={{ width: '320px', height: '208px', flexShrink: 0, position: 'relative', backgroundColor: '#f3f4f6', overflow: 'hidden' }}>
        <img src={prop.image} alt={prop.type} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s', transform: hovered ? 'scale(1.06)' : 'scale(1)' }} />
        {prop.verified && <div style={{ position: 'absolute', top: '8px', left: '8px', backgroundColor: 'rgba(255,255,255,0.92)', padding: '3px 8px', borderRadius: '4px', fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', display: 'flex', alignItems: 'center', gap: '4px', fontFamily: 'Inter, sans-serif' }}><span style={{ width: '6px', height: '6px', backgroundColor: '#22c55e', borderRadius: '50%', display: 'inline-block' }} />VERIFIED</div>}
      </div>
      <div style={{ flex: 1, padding: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px' }}>
            <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#111827', fontFamily: 'Inter, sans-serif' }}>{prop.price} MAD <span style={{ fontSize: '13px', fontWeight: 500, color: '#6b7280' }}>per day</span></h3>
            <button onClick={e => { e.stopPropagation(); setSaved(!saved) }} style={{ border: 'none', backgroundColor: 'transparent', cursor: 'pointer' }}><Heart size={22} fill={saved ? '#ef4444' : 'none'} color={saved ? '#ef4444' : '#9ca3af'} /></button>
          </div>
          <p style={{ fontWeight: 700, color: '#374151', fontSize: '13px', marginBottom: '4px', fontFamily: 'Inter, sans-serif' }}>{prop.type}</p>
          <div style={{ display: 'flex', gap: '16px', fontSize: '13px', color: '#6b7280', marginBottom: '8px', fontFamily: 'Inter, sans-serif' }}>
            <span>{prop.location}</span>{prop.area && <span>{prop.area}</span>}
          </div>
          {prop.desc && <p style={{ fontSize: '13px', color: '#6b7280', fontFamily: 'Inter, sans-serif', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{prop.desc}</p>}
        </div>
        <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
          <button style={{ flex: 1, border: '1px solid #e5e7eb', backgroundColor: 'transparent', color: '#333', padding: '9px', borderRadius: '6px', fontWeight: 700, fontSize: '13px', cursor: 'pointer', fontFamily: 'Inter, sans-serif' }} onMouseEnter={e => e.currentTarget.style.backgroundColor = '#f9fafb'} onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}>MESSAGE</button>
          <button style={{ flex: 1, backgroundColor: '#22c55e', color: 'white', border: 'none', padding: '9px', borderRadius: '6px', fontWeight: 700, fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontFamily: 'Inter, sans-serif' }} onMouseEnter={e => e.currentTarget.style.backgroundColor = '#16a34a'} onMouseLeave={e => e.currentTarget.style.backgroundColor = '#22c55e'}>💬 WhatsApp</button>
        </div>
      </div>
    </article>
  )
}
function GridCard({ prop }: { prop: typeof listingsGrid[0] }) {
  const [saved, setSaved] = useState(false)
  const [hovered, setHovered] = useState(false)
  return (
    <article onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} style={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '12px', overflow: 'hidden', display: 'flex', flexDirection: 'column', boxShadow: hovered ? '0 4px 16px rgba(0,0,0,0.1)' : 'none', transition: 'all 0.2s', cursor: 'pointer' }}>
      <div style={{ height: '208px', position: 'relative', backgroundColor: '#f3f4f6', overflow: 'hidden' }}>
        <img src={prop.image} alt={prop.type} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s', transform: hovered ? 'scale(1.06)' : 'scale(1)' }} />
        <div style={{ position: 'absolute', top: '8px', left: '8px', backgroundColor: 'rgba(255,255,255,0.92)', padding: '3px 8px', borderRadius: '4px', fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', display: 'flex', alignItems: 'center', gap: '4px', fontFamily: 'Inter, sans-serif' }}><span style={{ width: '6px', height: '6px', backgroundColor: '#22c55e', borderRadius: '50%', display: 'inline-block' }} />VERIFIED</div>
        <button onClick={e => { e.stopPropagation(); setSaved(!saved) }} style={{ position: 'absolute', top: '8px', right: '8px', border: 'none', backgroundColor: 'transparent', cursor: 'pointer', color: saved ? '#ef4444' : 'white', filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.5))' }}><Heart size={20} fill={saved ? '#ef4444' : 'none'} /></button>
        <div style={{ position: 'absolute', bottom: '8px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '4px' }}>{[0,1,2].map(i => <div key={i} style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: i === 0 ? 'white' : 'rgba(255,255,255,0.5)' }} />)}</div>
      </div>
      <div style={{ padding: '14px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#111827', marginBottom: '4px', fontFamily: 'Inter, sans-serif' }}>{prop.price} MAD <span style={{ fontSize: '11px', fontWeight: 500, color: '#6b7280' }}>/ day</span></h3>
          <p style={{ fontWeight: 700, color: '#374151', fontSize: '12px', marginBottom: '4px', fontFamily: 'Inter, sans-serif', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{prop.type}</p>
          <p style={{ fontSize: '11px', color: '#6b7280', fontFamily: 'Inter, sans-serif' }}>{prop.location}</p>
        </div>
        <div style={{ display: 'flex', gap: '8px', marginTop: '14px' }}>
          <button style={{ flex: 1, border: '1px solid #e5e7eb', backgroundColor: 'transparent', color: '#333', padding: '8px', borderRadius: '6px', fontWeight: 700, fontSize: '11px', cursor: 'pointer', fontFamily: 'Inter, sans-serif' }} onMouseEnter={e => e.currentTarget.style.backgroundColor = '#f9fafb'} onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}>MESSAGE</button>
          <button style={{ flex: 1, backgroundColor: '#14b8a6', color: 'white', border: 'none', padding: '8px', borderRadius: '6px', fontWeight: 700, fontSize: '11px', cursor: 'pointer', fontFamily: 'Inter, sans-serif' }} onMouseEnter={e => e.currentTarget.style.backgroundColor = '#0d9488'} onMouseLeave={e => e.currentTarget.style.backgroundColor = '#14b8a6'}>WhatsApp</button>
        </div>
      </div>
    </article>
  )
}
export default function DailyRentalsPage() {
  const [activeCat, setActiveCat] = useState('Property')
  const [activePill, setActivePill] = useState('All')
  const [currentPage, setCurrentPage] = useState(1)
  return (
    <div style={{ fontFamily: 'Inter, system-ui, sans-serif', backgroundColor: '#f9fafb', minHeight: '100vh' }}>
      {/* HEADER */}
      <header style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(255,255,255,0.82)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(229,231,235,0.5)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 16px', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <Link href="/en" style={{ textDecoration: 'none', fontSize: '22px', fontWeight: 700, color: '#0d9488', letterSpacing: '-0.04em', fontFamily: 'Inter, sans-serif' }}>SouKni</Link>
            <div style={{ display: 'flex', alignItems: 'center', fontSize: '13px', fontWeight: 500, color: '#4b5563', borderLeft: '1px solid #e5e7eb', paddingLeft: '20px', gap: '6px' }}>
              <span style={{ color: '#6b7280' }}>Cities:</span>
              <button style={{ border: 'none', backgroundColor: 'transparent', cursor: 'pointer', fontWeight: 700, color: '#111827', fontFamily: 'Inter, sans-serif', fontSize: '13px' }}>Rabat ▾</button>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ display: 'flex', gap: '4px' }}>
              {[Bell, Bookmark, Heart].map((Icon, i) => <button key={i} style={{ width: '32px', height: '32px', borderRadius: '50%', border: 'none', backgroundColor: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#4b5563' }} onMouseEnter={e => e.currentTarget.style.backgroundColor = '#f9fafb'} onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}><Icon size={20} /></button>)}
            </div>
            <button style={{ backgroundColor: '#14b8a6', color: 'white', border: 'none', padding: '9px 20px', borderRadius: '100px', fontSize: '13px', fontWeight: 600, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }} onMouseEnter={e => e.currentTarget.style.backgroundColor = '#0d9488'} onMouseLeave={e => e.currentTarget.style.backgroundColor = '#14b8a6'}>+ Place Your FREE Ad</button>
          </div>
        </div>
      </header>
      {/* CATEGORY NAV */}
      <nav style={{ backgroundColor: 'white', borderBottom: '1px solid #e5e7eb', overflowX: 'auto', whiteSpace: 'nowrap' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 16px', display: 'flex', gap: '32px' }}>
          {catNav.map(item => <a key={item} href="#" onClick={e => { e.preventDefault(); setActiveCat(item) }} style={{ display: 'inline-block', padding: '14px 0', borderBottom: activeCat === item ? '2px solid #14b8a6' : '2px solid transparent', fontSize: '13px', fontWeight: activeCat === item ? 700 : 500, color: activeCat === item ? '#14b8a6' : '#6b7280', textDecoration: 'none', transition: 'all 0.15s', fontFamily: 'Inter, sans-serif' }}>{item}</a>)}
        </div>
      </nav>
      <main style={{ maxWidth: '1280px', margin: '0 auto', padding: '24px 16px 80px' }}>
        {/* SEARCH BAR */}
        <div style={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '12px', boxShadow: '0 1px 4px rgba(0,0,0,0.04)', marginBottom: '24px', padding: '16px', display: 'flex', alignItems: 'center' }}>
          {[{ label: 'PURPOSE', val: 'Daily Rent' }, { label: 'LOCATION', val: 'Enter neighborhood or city', isInput: true }, { label: 'PROPERTY TYPE', val: 'All Properties' }, { label: 'PRICE RANGE', val: 'Any Price' }, { label: 'FILTERS', val: 'Amenities, Verified...', muted: true }].map((f, i) => (
            <div key={f.label} style={{ flex: f.isInput ? 1.5 : 1, padding: '0 16px', borderRight: i < 4 ? '1px solid #f1f5f9' : 'none' }}>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#111827', marginBottom: '4px', fontFamily: 'Inter, sans-serif' }}>{f.label}</label>
              {f.isInput ? <input type="text" placeholder={f.val} style={{ width: '100%', border: 'none', fontSize: '13px', outline: 'none', padding: 0, fontFamily: 'Inter, sans-serif', backgroundColor: 'transparent' }} /> : <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}><span style={{ fontSize: '13px', color: f.muted ? '#9ca3af' : '#374151', fontFamily: 'Inter, sans-serif' }}>{f.val}</span><span style={{ color: '#9ca3af', fontSize: '10px' }}>▾</span></div>}
            </div>
          ))}
        </div>
        {/* BREADCRUMBS */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#6b7280', marginBottom: '16px', fontFamily: 'Inter, sans-serif' }}>
          🏠 <ChevronRight size={12} /> <span>Property</span> <ChevronRight size={12} /> <span>Daily Short Term rentals</span>
        </div>
        {/* HEADING */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
          <h1 style={{ fontSize: '22px', fontWeight: 700, color: '#111827', fontFamily: 'Inter, sans-serif' }}>Daily Rentals in Rabat <span style={{ color: '#6b7280', fontWeight: 400 }}>842 Ads</span></h1>
          <div style={{ display: 'flex', gap: '8px' }}>
            {[{ icon: '⇅', label: 'Sort: Popular' }, { icon: '🔖', label: 'Save Search' }].map(btn => <button key={btn.label} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 14px', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '13px', fontWeight: 500, backgroundColor: 'white', cursor: 'pointer', fontFamily: 'Inter, sans-serif' }} onMouseEnter={e => e.currentTarget.style.backgroundColor = '#f9fafb'} onMouseLeave={e => e.currentTarget.style.backgroundColor = 'white'}>{btn.icon} {btn.label}</button>)}
          </div>
        </div>
        {/* TYPE PILLS — BLACK */}
        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', marginBottom: '24px', paddingBottom: '4px' }}>
          {typePills.map(pill => <button key={pill} onClick={() => setActivePill(pill)} style={{ whiteSpace: 'nowrap', padding: '8px 16px', borderRadius: '100px', backgroundColor: '#111827', border: '1px solid #111827', color: 'white', fontSize: '13px', fontWeight: 400, cursor: 'pointer', fontFamily: 'Inter, sans-serif', opacity: activePill === pill ? 1 : 0.8, transition: 'opacity 0.15s' }} onMouseEnter={e => e.currentTarget.style.opacity = '1'} onMouseLeave={e => e.currentTarget.style.opacity = activePill === pill ? '1' : '0.8'}>{pill}</button>)}
        </div>
        {/* LISTING FEED */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {listingsHorizontal.slice(0, 3).map(p => <HorizontalCard key={p.id} prop={p} />)}
          {/* Immo Pro Banner */}
          <div style={{ position: 'relative', borderRadius: '24px', overflow: 'hidden', height: '280px', marginTop: '8px', cursor: 'pointer' }}>
            <img src="https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&w=1400" alt="Immo Pro" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.42)', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '40px 48px' }}>
              <h2 style={{ fontSize: '30px', fontWeight: 800, color: 'white', marginBottom: '12px', maxWidth: '580px', letterSpacing: '-0.02em', fontFamily: 'Inter, sans-serif' }}>SouKni Immo Pro: The Gold Standard for Property Management</h2>
              <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.9)', marginBottom: '24px', maxWidth: '480px', fontFamily: 'Inter, sans-serif' }}>Trust our certified experts to manage your short-term rental portfolio with premium care and maximum yield.</p>
              <button style={{ backgroundColor: '#2dd4bf', color: 'white', border: 'none', padding: '12px 24px', borderRadius: '100px', fontWeight: 700, fontSize: '14px', cursor: 'pointer', alignSelf: 'flex-start', fontFamily: 'Inter, sans-serif' }} onMouseEnter={e => e.currentTarget.style.backgroundColor = '#0f9b8e'} onMouseLeave={e => e.currentTarget.style.backgroundColor = '#2dd4bf'}>Learn More</button>
            </div>
          </div>
          {listingsHorizontal.slice(3).map(p => <HorizontalCard key={p.id} prop={p} />)}
          {/* Diamond Certified Banner */}
          <div style={{ position: 'relative', background: 'linear-gradient(135deg, #0d9488 0%, #2dd4bf 100%)', borderRadius: '24px', overflow: 'hidden', padding: '32px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '24px', marginTop: '8px' }}>
            <div style={{ position: 'absolute', inset: 0, opacity: 0.1, pointerEvents: 'none' }}>
              <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path d="M0 0 L100 100 M100 0 L0 100" fill="none" stroke="white" strokeWidth="0.5" />
                <circle cx="50" cy="50" r="40" fill="none" stroke="white" strokeWidth="0.5" />
              </svg>
            </div>
            <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{ backgroundColor: 'rgba(255,255,255,0.2)', padding: '10px', borderRadius: '10px', backdropFilter: 'blur(8px)', fontSize: '26px' }}>🏆</div>
              <div>
                <h2 style={{ fontSize: '22px', fontWeight: 800, color: 'white', marginBottom: '4px', fontFamily: 'Inter, sans-serif' }}>Elevate to Diamond Certified Status</h2>
                <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.9)', maxWidth: '480px', fontFamily: 'Inter, sans-serif' }}>Gain maximum visibility, exclusive insights, and the ultimate badge of trust on SouKni for your luxury daily rentals.</p>
              </div>
            </div>
            <button style={{ position: 'relative', zIndex: 1, backgroundColor: 'white', color: '#0d9488', border: 'none', padding: '12px 28px', borderRadius: '100px', fontWeight: 700, fontSize: '14px', cursor: 'pointer', flexShrink: 0, fontFamily: 'Inter, sans-serif', whiteSpace: 'nowrap', boxShadow: '0 4px 14px rgba(0,0,0,0.15)' }} onMouseEnter={e => e.currentTarget.style.backgroundColor = '#f0fdfa'} onMouseLeave={e => e.currentTarget.style.backgroundColor = 'white'}>Get Diamond Certified Now</button>
          </div>
        </div>
        {/* 4-COLUMN GRID */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginTop: '40px', marginBottom: '40px' }}>
          {listingsGrid.map(p => <GridCard key={p.id} prop={p} />)}
        </div>
        {/* PAGINATION */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', paddingBottom: '48px' }}>
          <div style={{ display: 'flex', gap: '6px', marginRight: '16px' }}>
            {[ChevronsLeft, ChevronLeft].map((Icon, i) => <button key={i} style={{ width: '40px', height: '40px', borderRadius: '8px', border: '1px solid #e5e7eb', backgroundColor: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#374151' }} onMouseEnter={e => { e.currentTarget.style.borderColor = '#14b8a6'; e.currentTarget.style.color = '#14b8a6' }} onMouseLeave={e => { e.currentTarget.style.borderColor = '#e5e7eb'; e.currentTarget.style.color = '#374151' }}><Icon size={15} /></button>)}
          </div>
          {[1, 2, 3, '...', 45].map((p, i) => <button key={i} onClick={() => typeof p === 'number' && p !== 45 && setCurrentPage(p)} style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: p === currentPage ? '#2dd4bf' : 'white', border: p === currentPage ? 'none' : '1px solid #e5e7eb', color: p === currentPage ? 'white' : '#374151', fontSize: '13px', fontWeight: p === currentPage ? 700 : 400, cursor: p === '...' ? 'default' : 'pointer', fontFamily: 'Inter, sans-serif', boxShadow: p === currentPage ? '0 2px 8px rgba(45,212,191,0.4)' : 'none' }} onMouseEnter={e => { if (p !== currentPage && p !== '...') { e.currentTarget.style.backgroundColor = '#f0fdfa'; e.currentTarget.style.borderColor = '#14b8a6' } }} onMouseLeave={e => { if (p !== currentPage) { e.currentTarget.style.backgroundColor = 'white'; e.currentTarget.style.borderColor = '#e5e7eb' } }}>{p}</button>)}
          <div style={{ display: 'flex', gap: '6px', marginLeft: '16px' }}>
            {[ChevronRight, ChevronsRight].map((Icon, i) => <button key={i} style={{ width: '40px', height: '40px', borderRadius: '8px', border: '1px solid #e5e7eb', backgroundColor: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#374151' }} onMouseEnter={e => { e.currentTarget.style.borderColor = '#14b8a6'; e.currentTarget.style.color = '#14b8a6' }} onMouseLeave={e => { e.currentTarget.style.borderColor = '#e5e7eb'; e.currentTarget.style.color = '#374151' }}><Icon size={15} /></button>)}
          </div>
        </div>
        {/* JOIN SOUKNI FAMILY */}
        <section style={{ position: 'relative', backgroundColor: '#f0fdfa', border: '1px solid #ccfbf1', borderRadius: '24px', overflow: 'hidden', padding: '48px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '40px', marginBottom: '24px' }}>
          <div style={{ position: 'absolute', right: '-80px', bottom: '-80px', width: '256px', height: '256px', backgroundColor: 'rgba(45,212,191,0.1)', borderRadius: '50%', filter: 'blur(40px)' }} />
          <div style={{ flex: 1, position: 'relative', zIndex: 1 }}>
            <h2 style={{ fontSize: '32px', fontWeight: 800, color: '#111827', letterSpacing: '-0.02em', marginBottom: '14px', fontFamily: 'Inter, sans-serif' }}>Join the SouKni Family</h2>
            <p style={{ fontSize: '16px', color: '#4b5563', marginBottom: '28px', maxWidth: '480px', fontFamily: 'Inter, sans-serif', lineHeight: 1.7 }}>The Market in your Pocket. Experience the future of marketplace discovery on your mobile device.</p>
            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
              {[{ label: 'App Store', icon: '📱' }, { label: 'Google Play', icon: '▶' }].map(app => <button key={app.label} style={{ display: 'flex', alignItems: 'center', gap: '10px', backgroundColor: '#111827', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '12px', cursor: 'pointer', fontFamily: 'Inter, sans-serif', transition: 'transform 0.2s' }} onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.04)'} onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}><span style={{ fontSize: '20px' }}>{app.icon}</span><span style={{ fontWeight: 700, fontSize: '13px' }}>{app.label}</span></button>)}
            </div>
          </div>
          <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative', zIndex: 1 }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '100px', color: 'rgba(45,212,191,0.35)', lineHeight: 1 }}>📱</div>
              <p style={{ fontSize: '13px', color: '#6b7280', marginTop: '8px', fontFamily: 'Inter, sans-serif' }}>Scan to download the SouKni app</p>
            </div>
          </div>
        </section>
      </main>
      {/* FOOTER */}
      <footer style={{ backgroundColor: '#7A7A7A', color: 'white', paddingTop: '64px', paddingBottom: '32px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 16px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr', gap: '32px', marginBottom: '48px', paddingBottom: '48px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
            <div>
              <div style={{ fontSize: '22px', fontWeight: 700, color: 'white', letterSpacing: '-0.04em', marginBottom: '16px', fontFamily: 'Inter, sans-serif' }}>SouKni</div>
              <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.88)', lineHeight: 1.7, maxWidth: '280px', marginBottom: '20px', fontFamily: 'Inter, sans-serif' }}>Morocco's premium community marketplace. Connecting professional services and high-end goods with discerning users across the Kingdom.</p>
              <div style={{ display: 'flex', gap: '10px' }}>{['🌐', '📤', '@'].map((icon, i) => <button key={i} style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: 'rgba(255,255,255,0.18)', border: 'none', cursor: 'pointer', fontSize: '16px', color: 'white' }} onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.28)'} onMouseLeave={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.18)'}>{icon}</button>)}</div>
            </div>
            {[{ title: 'Company', links: ['About Us', 'Careers', 'Press', 'Contact'] }, { title: 'Support', links: ['Help Center', 'Safety Tips', 'Trust & Safety', 'Ad Rules'] }, { title: 'Legal', links: ['Terms of Use', 'Privacy Policy', 'Cookie Policy'] }, { title: 'Top Cities', links: ['Casablanca', 'Rabat', 'Marrakech', 'Tangier'] }].map(col => (
              <div key={col.title}>
                <h5 style={{ fontWeight: 700, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'white', marginBottom: '20px', fontFamily: 'Inter, sans-serif' }}>{col.title}</h5>
                {col.links.map(link => <a key={link} href="#" style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: 'rgba(255,255,255,0.88)', textDecoration: 'none', marginBottom: '14px', fontFamily: 'Inter, sans-serif' }} onMouseEnter={e => e.currentTarget.style.color = 'rgba(255,255,255,0.6)'} onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.88)'}>{link}</a>)}
              </div>
            ))}
          </div>
          <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.75)', fontFamily: 'Inter, sans-serif' }}>© 2026 SOUKNI MOROCCO. ALL RIGHTS RESERVED.</p>
        </div>
      </footer>
    </div>
  )
}
