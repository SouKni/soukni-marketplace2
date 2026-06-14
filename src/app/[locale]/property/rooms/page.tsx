'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Heart, ChevronLeft, ChevronRight, Bell, Bookmark } from 'lucide-react'
const catNav = ['Motors', 'Property', 'Services', 'Jobs', 'The Vault', 'Mobiles & Computers', 'Community', 'View More...']
const roomPills = ['Single Room', 'Shared Room', 'Master Bedroom', 'Studio', 'Ensuite Room', 'Hotel', 'View More']
const listings = [
  { id: 'rm1', type: 'Master Bedroom in Luxury Apartment', price: '4,500', period: 'Monthly', area: '35 sqm', location: 'Hay Riad, Rabat', verified: true, image: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&w=700' },
  { id: 'rm2', type: 'Cozy Single Room with Study Desk', price: '2,800', period: 'Monthly', area: '18 sqm', location: 'Gauthier, Casablanca', verified: false, image: 'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&w=700' },
  { id: 'rm3', type: 'Premium Studio Room - Ensuite', price: '5,500', period: 'Monthly', area: '45 sqm', location: 'Hivernage, Marrakech', verified: true, image: 'https://images.pexels.com/photos/2581922/pexels-photo-2581922.jpeg?auto=compress&w=700' },
  { id: 'rm4', type: 'Shared Living - Mediterranean View', price: '3,200', period: 'Monthly', area: '25 sqm', location: 'Malabata, Tangier', verified: false, image: 'https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg?auto=compress&w=700' },
  { id: 'rm5', type: 'Penthouse Executive Office', price: '320,000', period: 'Yearly', area: '400 sqm', location: 'Premium View | Minimalist Design | Rabat Centre', verified: true, image: 'https://images.pexels.com/photos/440731/pexels-photo-440731.jpeg?auto=compress&w=700' },
  { id: 'rm6', type: 'Modern Medical Suite', price: '45,000', period: 'Monthly', area: '150 sqm', location: 'High-end Equipment | Clean Design | Rabat Agdal', verified: true, image: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&w=700' },
  { id: 'rm7', type: 'Luxury Retail Boutique', price: '55,000', period: 'Monthly', area: '180 sqm', location: 'Elegant Lighting | Prime Mall Location | Arribat Center Mall', verified: true, image: 'https://images.pexels.com/photos/2581922/pexels-photo-2581922.jpeg?auto=compress&w=700' },
  { id: 'rm8', type: 'Logistics Hub Warehouse', price: '140,000', period: 'Monthly', area: '2,500 sqm', location: 'Modern Architecture | Large Loading Bays | Technopolis Med Zone', verified: true, image: 'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&w=700' },
]
function RoomCard({ prop }: { prop: typeof listings[0] }) {
  const [saved, setSaved] = useState(false)
  const [hovered, setHovered] = useState(false)
  return (
    <article onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} style={{ backgroundColor: 'white', border: hovered ? '1px solid #2dd4bf' : '1px solid #e5e7eb', borderRadius: '12px', overflow: 'hidden', display: 'flex', boxShadow: hovered ? '0 4px 16px rgba(0,0,0,0.1)' : 'none', transition: 'all 0.2s', cursor: 'pointer' }}>
      <div style={{ width: '320px', height: '208px', flexShrink: 0, position: 'relative', backgroundColor: '#f3f4f6', overflow: 'hidden' }}>
        <img src={prop.image} alt={prop.type} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s', transform: hovered ? 'scale(1.06)' : 'scale(1)' }} />
        {prop.verified && (
          <div style={{ position: 'absolute', top: '8px', left: '8px', backgroundColor: 'rgba(255,255,255,0.92)', padding: '3px 8px', borderRadius: '4px', fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', display: 'flex', alignItems: 'center', gap: '4px', fontFamily: 'Inter, sans-serif' }}>
            <span style={{ width: '6px', height: '6px', backgroundColor: '#22c55e', borderRadius: '50%', display: 'inline-block' }} /> VERIFIED
          </div>
        )}
      </div>
      <div style={{ flex: 1, padding: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px' }}>
            <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#111827', fontFamily: 'Inter, sans-serif' }}>{prop.price} MAD <span style={{ fontSize: '13px', fontWeight: 500, color: '#6b7280' }}>{prop.period}</span></h3>
            <button onClick={e => { e.stopPropagation(); setSaved(!saved) }} style={{ border: 'none', backgroundColor: 'transparent', cursor: 'pointer', padding: '2px' }}>
              <Heart size={22} fill={saved ? '#ef4444' : 'none'} color={saved ? '#ef4444' : '#9ca3af'} />
            </button>
          </div>
          <p style={{ fontWeight: 700, color: '#374151', fontSize: '13px', marginBottom: '4px', fontFamily: 'Inter, sans-serif' }}>{prop.type}</p>
          <div style={{ fontSize: '13px', color: '#6b7280', marginBottom: '10px', fontFamily: 'Inter, sans-serif' }}>📏 {prop.area}</div>
          <p style={{ fontSize: '13px', color: '#6b7280', fontFamily: 'Inter, sans-serif', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{prop.location}</p>
        </div>
        <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
          <button style={{ flex: 1, border: '1px solid #e5e7eb', backgroundColor: 'transparent', color: '#333', padding: '9px', borderRadius: '6px', fontWeight: 700, fontSize: '13px', cursor: 'pointer', fontFamily: 'Inter, sans-serif', transition: 'background 0.15s' }} onMouseEnter={e => e.currentTarget.style.backgroundColor = '#f9fafb'} onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}>MESSAGE</button>
          <button style={{ flex: 1, backgroundColor: '#22c55e', color: 'white', border: 'none', padding: '9px', borderRadius: '6px', fontWeight: 700, fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontFamily: 'Inter, sans-serif', transition: 'background 0.15s' }} onMouseEnter={e => e.currentTarget.style.backgroundColor = '#16a34a'} onMouseLeave={e => e.currentTarget.style.backgroundColor = '#22c55e'}>💬 WhatsApp</button>
        </div>
      </div>
    </article>
  )
}
export default function RoomsForRentPage() {
  const [activeCat, setActiveCat] = useState('Property')
  const [activePill, setActivePill] = useState('Single Room')
  const [activeStatus, setActiveStatus] = useState('All')
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
              <button style={{ display: 'flex', alignItems: 'center', gap: '4px', border: 'none', backgroundColor: 'transparent', cursor: 'pointer', fontWeight: 700, color: '#111827', fontFamily: 'Inter, sans-serif', fontSize: '13px' }}>Rabat ▾</button>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ display: 'flex', gap: '4px' }}>
              {[Bell, Bookmark, Heart].map((Icon, i) => <button key={i} style={{ width: '32px', height: '32px', borderRadius: '50%', border: 'none', backgroundColor: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#4b5563' }} onMouseEnter={e => e.currentTarget.style.backgroundColor = '#f9fafb'} onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}><Icon size={20} /></button>)}
            </div>
            <button style={{ backgroundColor: '#14b8a6', color: 'white', border: 'none', padding: '9px 20px', borderRadius: '100px', fontSize: '13px', fontWeight: 600, cursor: 'pointer', fontFamily: 'Inter, sans-serif', boxShadow: '0 1px 4px rgba(0,0,0,0.1)' }} onMouseEnter={e => e.currentTarget.style.backgroundColor = '#0d9488'} onMouseLeave={e => e.currentTarget.style.backgroundColor = '#14b8a6'}>+ Place Your FREE Ad</button>
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
          {[{ label: 'Purpose', val: 'Rent' }, { label: 'Location', val: 'Enter location', isInput: true }, { label: 'Property Type', val: 'All in Commercial' }, { label: 'Price Range', val: 'Any' }, { label: 'Filters', val: 'Area / Size (sqft), Ameniti...', muted: true }].map((f, i) => (
            <div key={f.label} style={{ flex: f.isInput ? 1.5 : 1, padding: '0 16px', borderRight: i < 4 ? '1px solid #f1f5f9' : 'none' }}>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#111827', marginBottom: '4px', fontFamily: 'Inter, sans-serif' }}>{f.label}</label>
              {f.isInput ? <input type="text" placeholder={f.val} style={{ width: '100%', border: 'none', fontSize: '13px', outline: 'none', padding: 0, fontFamily: 'Inter, sans-serif', backgroundColor: 'transparent' }} /> : <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}><span style={{ fontSize: '13px', color: f.muted ? '#9ca3af' : '#374151', fontFamily: 'Inter, sans-serif' }}>{f.val}</span><span style={{ color: '#9ca3af', fontSize: '10px' }}>▾</span></div>}
            </div>
          ))}
        </div>
        {/* BREADCRUMBS & HEADING */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#6b7280', marginBottom: '16px', fontFamily: 'Inter, sans-serif' }}>
          🏠 <ChevronRight size={12} /> <span>Rooms for Rent in Rabat</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
          <h1 style={{ fontSize: '22px', fontWeight: 700, color: '#111827', fontFamily: 'Inter, sans-serif' }}>Rooms for Rent in Rabat <span style={{ color: '#6b7280', fontWeight: 400 }}>1,248 Ads</span></h1>
          <div style={{ display: 'flex', gap: '8px' }}>
            {[{ icon: '⇅', label: 'Sort: Popular' }, { icon: '🔖', label: 'Save Search' }].map(btn => <button key={btn.label} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 14px', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '13px', fontWeight: 500, backgroundColor: 'white', cursor: 'pointer', fontFamily: 'Inter, sans-serif' }} onMouseEnter={e => e.currentTarget.style.backgroundColor = '#f9fafb'} onMouseLeave={e => e.currentTarget.style.backgroundColor = 'white'}>{btn.icon} {btn.label}</button>)}
          </div>
        </div>
        {/* ROOM TYPE PILLS — BLACK */}
        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', marginBottom: '24px', paddingBottom: '4px' }}>
          {roomPills.map(pill => <button key={pill} onClick={() => setActivePill(pill)} style={{ whiteSpace: 'nowrap', padding: '8px 16px', borderRadius: '100px', backgroundColor: '#111827', border: '1px solid #111827', color: 'white', fontSize: '13px', fontWeight: pill === 'View More' ? 700 : 400, cursor: 'pointer', fontFamily: 'Inter, sans-serif', opacity: activePill === pill ? 1 : 0.82, transition: 'opacity 0.15s' }} onMouseEnter={e => e.currentTarget.style.opacity = '1'} onMouseLeave={e => e.currentTarget.style.opacity = activePill === pill ? '1' : '0.82'}>{pill}</button>)}
        </div>
        {/* STATUS TOGGLES */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ display: 'flex', border: '1px solid #e5e7eb', borderRadius: '8px', overflow: 'hidden' }}>
            {['All', 'Furnished', 'Unfurnished'].map((s, i) => <button key={s} onClick={() => setActiveStatus(s)} style={{ padding: '8px 24px', backgroundColor: activeStatus === s ? '#eff6ff' : 'white', color: activeStatus === s ? '#2563eb' : '#4b5563', fontWeight: activeStatus === s ? 700 : 500, fontSize: '13px', border: 'none', borderRight: i < 2 ? '1px solid #e5e7eb' : 'none', cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>{s}</button>)}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', fontWeight: 700, color: '#111827', fontFamily: 'Inter, sans-serif' }}>
            <span>Show SouKni Diamond Verified First</span>
            <div style={{ width: '40px', height: '20px', backgroundColor: '#e5e7eb', borderRadius: '100px', position: 'relative', cursor: 'pointer' }}>
              <div style={{ position: 'absolute', left: '2px', top: '2px', width: '16px', height: '16px', backgroundColor: 'white', borderRadius: '50%', boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }} />
            </div>
          </div>
        </div>
        {/* LISTING GRID */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <RoomCard prop={listings[0]} />
          {/* Valuation Banner */}
          <div style={{ background: 'linear-gradient(to right, #fff1f2, white)', border: '1px solid #fecdd3', borderRadius: '12px', padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ backgroundColor: '#ef4444', width: '48px', height: '48px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', flexShrink: 0 }}>📊</div>
              <div>
                <h4 style={{ fontWeight: 700, color: '#111827', fontSize: '14px', marginBottom: '2px', fontFamily: 'Inter, sans-serif' }}>What's your property worth today?</h4>
                <p style={{ fontSize: '12px', color: '#6b7280', fontFamily: 'Inter, sans-serif' }}>Get an instant <strong>SouKni Estimate</strong> report with accurate, data-driven property insights.</p>
              </div>
            </div>
            <button style={{ backgroundColor: '#ef4444', color: 'white', border: 'none', padding: '9px 16px', borderRadius: '6px', fontSize: '11px', fontWeight: 700, cursor: 'pointer', whiteSpace: 'nowrap', fontFamily: 'Inter, sans-serif' }}>Get Free Soukni Estimation</button>
          </div>
          <RoomCard prop={listings[1]} />
          {/* Diamond Seller Banner */}
          <div style={{ backgroundColor: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '12px', padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ backgroundColor: '#2563eb', width: '48px', height: '48px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', flexShrink: 0 }}>💎</div>
              <div>
                <h4 style={{ fontWeight: 700, color: '#111827', fontSize: '14px', marginBottom: '2px', fontFamily: 'Inter, sans-serif' }}>Looking to sell or rent your property?</h4>
                <p style={{ fontSize: '12px', color: '#6b7280', fontFamily: 'Inter, sans-serif' }}>Reach more buyers or renters through our certified agent network with SouKni Immo Pro.</p>
              </div>
            </div>
            <button style={{ backgroundColor: 'white', border: '1px solid #2563eb', color: '#2563eb', padding: '9px 16px', borderRadius: '6px', fontSize: '11px', fontWeight: 700, cursor: 'pointer', whiteSpace: 'nowrap', fontFamily: 'Inter, sans-serif' }}>Get Started Now</button>
          </div>
          <RoomCard prop={listings[2]} />
          {/* Immo Pro Cinematic Banner */}
          <div style={{ position: 'relative', borderRadius: '24px', overflow: 'hidden', height: '280px', cursor: 'pointer', marginTop: '8px' }}>
            <img src="https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&w=1400" alt="Immo Pro" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.42)', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '40px 48px' }}>
              <h2 style={{ fontSize: '32px', fontWeight: 800, color: 'white', marginBottom: '12px', maxWidth: '600px', letterSpacing: '-0.02em', fontFamily: 'Inter, sans-serif' }}>Elevate Your Business Presence with SouKni Immo Pro</h2>
              <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.9)', marginBottom: '24px', maxWidth: '480px', fontFamily: 'Inter, sans-serif' }}>Discover premium office spaces, retail storefronts, and industrial hubs tailored for growth.</p>
              <button style={{ backgroundColor: '#2dd4bf', color: 'white', border: 'none', padding: '12px 24px', borderRadius: '100px', fontWeight: 700, fontSize: '14px', cursor: 'pointer', alignSelf: 'flex-start', fontFamily: 'Inter, sans-serif' }} onMouseEnter={e => e.currentTarget.style.backgroundColor = '#0f9b8e'} onMouseLeave={e => e.currentTarget.style.backgroundColor = '#2dd4bf'}>Explore Pro Listings</button>
            </div>
          </div>
          <RoomCard prop={listings[3]} />
          {/* Diamond Certified Banner */}
          <div style={{ position: 'relative', background: 'linear-gradient(135deg, #0d9488 0%, #2dd4bf 100%)', borderRadius: '24px', overflow: 'hidden', padding: '28px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '24px', marginTop: '8px' }}>
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
                <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.9)', maxWidth: '480px', fontFamily: 'Inter, sans-serif' }}>Gain maximum visibility, exclusive insights, and the ultimate badge of trust on SouKni.</p>
              </div>
            </div>
            <button style={{ position: 'relative', zIndex: 1, backgroundColor: 'white', color: '#0d9488', border: 'none', padding: '12px 28px', borderRadius: '100px', fontWeight: 700, fontSize: '14px', cursor: 'pointer', flexShrink: 0, boxShadow: '0 4px 14px rgba(0,0,0,0.15)', fontFamily: 'Inter, sans-serif', whiteSpace: 'nowrap' }} onMouseEnter={e => e.currentTarget.style.backgroundColor = '#f0fdfa'} onMouseLeave={e => e.currentTarget.style.backgroundColor = 'white'}>Get Diamond Certified Now</button>
          </div>
          {listings.slice(4).map(p => <RoomCard key={p.id} prop={p} />)}
          {/* Pagination */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginTop: '32px', marginBottom: '48px' }}>
            <button style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: 'white', border: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'not-allowed', color: '#9ca3af' }}><ChevronLeft size={16} /></button>
            {[1, 2, 3, '...', 45].map((p, i) => <button key={i} onClick={() => typeof p === 'number' && p !== 45 && setCurrentPage(p)} style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: p === currentPage ? '#14b8a6' : 'white', border: p === currentPage ? 'none' : '1px solid #e5e7eb', color: p === currentPage ? 'white' : '#374151', fontWeight: p === currentPage ? 700 : 400, fontSize: '13px', cursor: p === '...' ? 'default' : 'pointer', fontFamily: 'Inter, sans-serif' }}>{p}</button>)}
            <button style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: 'white', border: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#374151' }} onMouseEnter={e => e.currentTarget.style.borderColor = '#14b8a6'} onMouseLeave={e => e.currentTarget.style.borderColor = '#e5e7eb'}><ChevronRight size={16} /></button>
          </div>
          {/* Join SouKni Family */}
          <section style={{ position: 'relative', backgroundColor: '#f0fdfa', border: '1px solid #ccfbf1', borderRadius: '24px', overflow: 'hidden', padding: '48px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '40px', marginBottom: '24px' }}>
            <div style={{ position: 'absolute', right: '-80px', bottom: '-80px', width: '256px', height: '256px', backgroundColor: 'rgba(45,212,191,0.1)', borderRadius: '50%', filter: 'blur(40px)' }} />
            <div style={{ flex: 1, position: 'relative', zIndex: 1 }}>
              <h2 style={{ fontSize: '32px', fontWeight: 800, color: '#111827', letterSpacing: '-0.02em', marginBottom: '14px', fontFamily: 'Inter, sans-serif' }}>Join the SouKni Family</h2>
              <p style={{ fontSize: '16px', color: '#4b5563', marginBottom: '28px', maxWidth: '480px', fontFamily: 'Inter, sans-serif', lineHeight: 1.7 }}>The Market in your Pocket. Experience the future of marketplace discovery on your mobile device.</p>
              <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
                {[{ label: 'App Store', icon: '📱' }, { label: 'Google Play', icon: '▶' }].map(app => <button key={app.label} style={{ display: 'flex', alignItems: 'center', gap: '10px', backgroundColor: '#111827', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '12px', cursor: 'pointer', fontFamily: 'Inter, sans-serif', transition: 'transform 0.2s' }} onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.04)'} onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}><span style={{ fontSize: '20px' }}>{app.icon}</span><span style={{ fontWeight: 700, fontSize: '13px' }}>{app.label}</span></button>)}
              </div>
            </div>
            <div style={{ flex: 1, display: 'flex', justifyContent: 'center', position: 'relative', zIndex: 1 }}>
              <div style={{ width: '200px', height: '200px', backgroundColor: 'rgba(45,212,191,0.12)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '72px' }}>📱</div>
            </div>
          </section>
        </div>
      </main>
      {/* FOOTER */}
      <footer style={{ backgroundColor: '#7A7A7A', color: 'white', paddingTop: '64px', paddingBottom: '32px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 16px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr', gap: '32px', marginBottom: '48px', paddingBottom: '48px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
            <div>
              <div style={{ fontSize: '24px', fontWeight: 800, color: 'white', marginBottom: '16px', fontFamily: 'Inter, sans-serif' }}>SouKni</div>
              <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.88)', lineHeight: 1.7, maxWidth: '280px', marginBottom: '20px', fontFamily: 'Inter, sans-serif' }}>Morocco's premium community marketplace. Connecting professional services and high-end goods with discerning users across the Kingdom.</p>
              <div style={{ display: 'flex', gap: '10px' }}>
                {['🌐', '📤', '@'].map((icon, i) => <button key={i} style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: 'rgba(255,255,255,0.18)', border: 'none', cursor: 'pointer', fontSize: '16px', color: 'white' }} onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.28)'} onMouseLeave={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.18)'}>{icon}</button>)}
              </div>
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
