'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronLeft, ChevronRight, Phone, MapPin, ShieldCheck } from 'lucide-react'

const subNav = ['Motors', 'Property', 'Jobs', 'The Vault', 'Services', 'Mobiles & Tablets', 'Community']

const makes = [
  { label: 'Mercedes-Benz', count: 285 },
  { label: 'BMW', count: 165 },
  { label: 'Land Rover', count: 162, active: true },
  { label: 'Nissan', count: 175 },
  { label: 'Kia', count: 139 },
  { label: 'Hyundai', count: 128 },
]

const rentals = [
  {
    id: 'r1',
    badge: 'Premium', badgeColor: '#ffac5a', badgeText: '#744000',
    title: 'Land Rover', model: 'Range Rover Velar', trim: 'R-Dynamic SE',
    year: '2025', seats: '5 Seats', doors: '4 Doors', bags: '3 Bags',
    desc: 'V6 P340 | No Deposit* | Free Delivery* | 24/7 Roadside Assistance. Luxury and performance redefined for your comfort in Morocco.',
    dailyPrice: '399', dailyKm: '300 km included',
    monthlyPrice: '7,999', monthlyKm: '4500 km included',
    verified: true, location: 'Casablanca, Finance District', photos: 11,
    image: 'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&w=700',
  },
  {
    id: 'r2',
    badge: 'New Arrival', badgeColor: '#2dd4bf', badgeText: '#00574d',
    title: 'Mercedes-Benz', model: 'S-Class', trim: 'S 500',
    year: '2024', seats: '5 Seats', doors: null, bags: null,
    desc: 'Experience the pinnacle of luxury. Fully loaded with panoramic roof, Burmester sound, and executive seating. Chauffeur service available on request.',
    dailyPrice: '850', dailyKm: null,
    monthlyPrice: '18,500', monthlyKm: null,
    verified: false, location: null, photos: 8,
    image: 'https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg?auto=compress&w=700',
  },
  {
    id: 'r3',
    badge: null,
    title: 'BMW', model: 'X5 xDrive40i', trim: 'M Sport',
    year: '2025', seats: '5 Seats', doors: '4 Doors', bags: '4 Bags',
    desc: 'Experience the ultimate performance SUV. Fully loaded with premium features for your Moroccan adventure.',
    dailyPrice: '650', dailyKm: null,
    monthlyPrice: '14,500', monthlyKm: null,
    verified: false, location: null, photos: 6,
    image: 'https://images.pexels.com/photos/3764984/pexels-photo-3764984.jpeg?auto=compress&w=700',
  },
  {
    id: 'r4',
    badge: null,
    title: 'Audi', model: 'Q8', trim: 'S-Line',
    year: '2024', seats: '5 Seats', doors: '4 Doors', bags: null,
    desc: 'Sleek, powerful, and undeniably luxurious. The perfect companion for city drives and long journeys alike.',
    dailyPrice: '750', dailyKm: null,
    monthlyPrice: '16,000', monthlyKm: null,
    verified: false, location: null, photos: 7,
    image: 'https://images.pexels.com/photos/1429775/pexels-photo-1429775.jpeg?auto=compress&w=700',
  },
  {
    id: 'r5',
    badge: null,
    title: 'Range Rover', model: 'Sport', trim: null,
    year: '2025', seats: '5 Seats', doors: '4 Doors', bags: null,
    desc: 'Iconic capability meets modern luxury. Command the road in style and comfort across any terrain.',
    dailyPrice: '900', dailyKm: null,
    monthlyPrice: '21,000', monthlyKm: null,
    verified: false, location: null, photos: 9,
    image: 'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&w=700',
  },
  {
    id: 'r6',
    badge: 'Premium', badgeColor: '#ffac5a', badgeText: '#744000',
    title: 'Porsche', model: 'Cayenne Coupe', trim: null,
    year: '2024', seats: '5 Seats', doors: '4 Doors', bags: '3 Bags',
    desc: 'The ultimate performance SUV. Experience the thrill of Porsche engineering combined with everyday luxury and versatility.',
    dailyPrice: '1,200', dailyKm: null,
    monthlyPrice: '28,000', monthlyKm: null,
    verified: false, location: null, photos: 8,
    image: 'https://images.pexels.com/photos/1149831/pexels-photo-1149831.jpeg?auto=compress&w=700',
  },
  {
    id: 'r7',
    badge: null,
    title: 'Land Rover', model: 'Defender 110', trim: null,
    year: '2025', seats: '7 Seats', doors: '4 Doors', bags: '4 Bags',
    desc: 'Unstoppable capability. The Defender 110 is the ultimate explorer, offering space for seven and unmatched off-road performance.',
    dailyPrice: '1,100', dailyKm: null,
    monthlyPrice: '26,500', monthlyKm: null,
    verified: false, location: null, photos: 10,
    image: 'https://images.pexels.com/photos/3764984/pexels-photo-3764984.jpeg?auto=compress&w=700',
  },
  {
    id: 'r8',
    badge: null,
    title: 'Maserati', model: 'Levante', trim: null,
    year: '2024', seats: '5 Seats', doors: '4 Doors', bags: '3 Bags',
    desc: 'The Maserati of SUVs. Italian style meets grand touring comfort, delivering a unique blend of performance and elegance.',
    dailyPrice: '1,050', dailyKm: null,
    monthlyPrice: '25,000', monthlyKm: null,
    verified: false, location: null, photos: 7,
    image: 'https://images.pexels.com/photos/1429775/pexels-photo-1429775.jpeg?auto=compress&w=700',
  },
]

function RentalCard({ rental }: { rental: typeof rentals[0] }) {
  const [saved, setSaved] = useState(false)
  const [imgHovered, setImgHovered] = useState(false)

  return (
    <article style={{
      backgroundColor: 'rgba(255,255,255,0.85)',
      borderRadius: '32px',
      padding: '20px',
      display: 'flex',
      gap: '32px',
      border: '1px solid transparent',
      boxShadow: '0 2px 12px rgba(0,107,95,0.04)',
      transition: 'all 0.3s ease',
    }}
    onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 20px 48px rgba(0,107,95,0.1)'; e.currentTarget.style.borderColor = 'rgba(45,212,191,0.12)' }}
    onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,107,95,0.04)'; e.currentTarget.style.borderColor = 'transparent' }}
    >
      {/* Image */}
      <div
        style={{ position: 'relative', width: '380px', flexShrink: 0, borderRadius: '24px', overflow: 'hidden', cursor: 'pointer', minHeight: '260px' }}
        onMouseEnter={() => setImgHovered(true)}
        onMouseLeave={() => setImgHovered(false)}
      >
        <img
          src={rental.image}
          alt={rental.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.7s', transform: imgHovered ? 'scale(1.06)' : 'scale(1)', position: 'absolute', inset: 0 }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 60%)', opacity: 0.65 }} />

        {/* Top controls */}
        <div style={{ position: 'absolute', top: '14px', right: '14px', display: 'flex', gap: '8px' }}>
          <button style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.28)', backdropFilter: 'blur(12px)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px' }}>📤</button>
          <button onClick={() => setSaved(!saved)} style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.28)', backdropFilter: 'blur(12px)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px' }}>
            {saved ? '❤️' : '🤍'}
          </button>
        </div>

        {/* Badge */}
        {rental.badge && (
          <div style={{ position: 'absolute', top: '14px', left: '14px', backgroundColor: rental.badgeColor, color: rental.badgeText, fontSize: '10px', fontWeight: 800, padding: '4px 10px', borderRadius: '100px', letterSpacing: '0.05em', fontFamily: 'Inter, sans-serif' }}>
            {rental.badge.toUpperCase()}
          </div>
        )}

        {/* Photo count */}
        <div style={{ position: 'absolute', bottom: '14px', left: '14px', backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)', color: 'white', fontSize: '11px', padding: '4px 10px', borderRadius: '100px', display: 'flex', alignItems: 'center', gap: '4px', fontFamily: 'Inter, sans-serif' }}>
          📷 {rental.photos}
        </div>

        {/* Dots */}
        <div style={{ position: 'absolute', bottom: '14px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '5px' }}>
          {[0,1,2,3].map(i => (
            <div key={i} style={{ width: i === 0 ? '8px' : '6px', height: i === 0 ? '8px' : '6px', borderRadius: '50%', backgroundColor: i === 0 ? 'white' : 'rgba(255,255,255,0.4)' }} />
          ))}
        </div>
      </div>

      {/* Content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', paddingTop: '4px', paddingBottom: '4px' }}>
        <div>
          {/* Title row */}
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '8px' }}>
            <h3 style={{ fontSize: '22px', fontWeight: 700, color: '#161d1b', fontFamily: 'Inter, sans-serif', lineHeight: 1.3 }}>
              {rental.title}
              <span style={{ color: '#6b7a76', fontWeight: 400 }}> • </span>
              {rental.model}
              {rental.trim && <><span style={{ color: '#6b7a76', fontWeight: 400 }}> • </span>{rental.trim}</>}
            </h3>
            {rental.badge === 'Premium' && (
              <span style={{ backgroundColor: rental.badgeColor, color: rental.badgeText, fontSize: '10px', fontWeight: 800, padding: '4px 12px', borderRadius: '100px', letterSpacing: '0.08em', flexShrink: 0, fontFamily: 'Inter, sans-serif' }}>
                PREMIUM
              </span>
            )}
          </div>

          {/* Specs row */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginBottom: '14px', color: '#3c4a46', fontSize: '13px', fontFamily: 'Inter, sans-serif' }}>
            {[
              { icon: '📅', label: rental.year },
              { icon: '👤', label: rental.seats },
              rental.doors && { icon: '🚪', label: rental.doors },
              rental.bags && { icon: '🛍️', label: rental.bags },
            ].filter(Boolean).map((spec: any, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <span style={{ color: '#2dd4bf', fontSize: '16px' }}>{spec.icon}</span>
                <span style={{ fontWeight: 600 }}>{spec.label}</span>
              </div>
            ))}
          </div>

          {/* Description */}
          <p style={{ fontSize: '15px', color: 'rgba(60,74,70,0.85)', lineHeight: 1.7, marginBottom: '20px', fontFamily: 'Inter, sans-serif' }}>
            {rental.desc}
          </p>

          {/* Pricing grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '20px' }}>
            <div style={{ backgroundColor: 'rgba(238,245,242,0.6)', padding: '16px', borderRadius: '20px', border: '1px solid rgba(186,202,197,0.25)' }}>
              <p style={{ fontSize: '9px', fontWeight: 800, color: 'rgba(60,74,70,0.55)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '4px', fontFamily: 'Inter, sans-serif' }}>Daily Rent</p>
              <p style={{ fontSize: '22px', fontWeight: 800, color: '#2dd4bf', lineHeight: 1, fontFamily: 'Inter, sans-serif' }}>
                {rental.dailyPrice} MAD <span style={{ fontSize: '12px', color: '#6b7a76', fontWeight: 400 }}>/day</span>
              </p>
              {rental.dailyKm && <p style={{ fontSize: '11px', color: 'rgba(107,122,118,0.75)', marginTop: '3px', fontFamily: 'Inter, sans-serif' }}>{rental.dailyKm}</p>}
            </div>
            <div style={{ backgroundColor: 'rgba(238,245,242,0.6)', padding: '16px', borderRadius: '20px', border: '1px solid rgba(186,202,197,0.25)' }}>
              <p style={{ fontSize: '9px', fontWeight: 800, color: 'rgba(60,74,70,0.55)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '4px', fontFamily: 'Inter, sans-serif' }}>Monthly Rent</p>
              <p style={{ fontSize: '22px', fontWeight: 800, color: '#161d1b', lineHeight: 1, fontFamily: 'Inter, sans-serif' }}>
                {rental.monthlyPrice} MAD <span style={{ fontSize: '12px', color: '#6b7a76', fontWeight: 400 }}>/mo</span>
              </p>
              {rental.monthlyKm && <p style={{ fontSize: '11px', color: 'rgba(107,122,118,0.75)', marginTop: '3px', fontFamily: 'Inter, sans-serif' }}>{rental.monthlyKm}</p>}
            </div>
          </div>

          {/* Trust indicators */}
          {(rental.verified || rental.location) && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', fontSize: '13px', color: '#3c4a46', marginBottom: '20px', fontFamily: 'Inter, sans-serif' }}>
              {rental.verified && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <ShieldCheck size={16} color="#2dd4bf" fill="rgba(45,212,191,0.15)" />
                  <span>Verified Dealer</span>
                </div>
              )}
              {rental.location && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <MapPin size={16} color="#2dd4bf" />
                  <span>{rental.location}</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Action buttons */}
        <div style={{ display: 'flex', gap: '12px' }}>
          <button style={{
            flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
            backgroundColor: 'white', border: '2px solid rgba(45,212,191,0.5)',
            color: '#006b5f', fontWeight: 700, fontSize: '14px',
            padding: '14px', borderRadius: '14px', cursor: 'pointer',
            transition: 'all 0.2s', fontFamily: 'Inter, sans-serif',
          }}
          onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'rgba(45,212,191,0.08)' }}
          onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'white' }}
          >
            <Phone size={16} /> Show Phone
          </button>
          <button style={{
            flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
            backgroundColor: '#25D366', color: 'white',
            fontWeight: 700, fontSize: '14px',
            padding: '14px', borderRadius: '14px', cursor: 'pointer',
            border: 'none', boxShadow: '0 8px 24px rgba(37,211,102,0.25)',
            transition: 'opacity 0.2s', fontFamily: 'Inter, sans-serif',
          }}
          onMouseEnter={e => e.currentTarget.style.opacity = '0.9'}
          onMouseLeave={e => e.currentTarget.style.opacity = '1'}
          >
            💬 WhatsApp
          </button>
        </div>
      </div>
    </article>
  )
}

function ImmoBanner() {
  return (
    <section style={{ position: 'relative', width: '100%', height: '380px', borderRadius: '32px', overflow: 'hidden', cursor: 'pointer' }}>
      <img src="https://images.pexels.com/photos/2581922/pexels-photo-2581922.jpeg?auto=compress&w=1400" alt="Immo Pro" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.7s' }} />
      <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.32)' }} />
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '32px' }}>
        <div style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '24px', padding: '40px 48px', maxWidth: '600px', textAlign: 'center' }}>
          <p style={{ fontSize: '11px', fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#62fae3', marginBottom: '12px', fontFamily: 'Inter, sans-serif' }}>SouKni Immo Pro</p>
          <h2 style={{ fontSize: '28px', fontWeight: 800, color: 'white', marginBottom: '12px', letterSpacing: '-0.02em', fontFamily: 'Inter, sans-serif' }}>Elevate Your Lifestyle with SouKni Immo Pro</h2>
          <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.88)', marginBottom: '24px', fontFamily: 'Inter, sans-serif' }}>Discover Morocco's most exclusive villas, riads, and luxury apartments.</p>
          <button style={{ backgroundColor: '#2dd4bf', color: 'white', border: 'none', padding: '14px 32px', borderRadius: '100px', fontWeight: 700, fontSize: '14px', cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>
            Explore Real Estate
          </button>
        </div>
      </div>
    </section>
  )
}

function RentalProBanner() {
  return (
    <section style={{ position: 'relative', width: '100%', height: '380px', borderRadius: '32px', overflow: 'hidden', cursor: 'pointer' }}>
      <img src="https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&w=1400" alt="Rental Pro" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
      <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.32)' }} />
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '32px' }}>
        <div style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '24px', padding: '40px 48px', maxWidth: '600px', textAlign: 'center' }}>
          <p style={{ fontSize: '11px', fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#62fae3', marginBottom: '12px', fontFamily: 'Inter, sans-serif' }}>SouKni Auto Rental Pro</p>
          <h2 style={{ fontSize: '28px', fontWeight: 800, color: 'white', marginBottom: '12px', letterSpacing: '-0.02em', fontFamily: 'Inter, sans-serif' }}>Elevate Your Journey with SouKni Auto Rental Pro</h2>
          <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.88)', marginBottom: '24px', fontFamily: 'Inter, sans-serif' }}>Discover Morocco's most exclusive fleet of luxury vehicles for rent.</p>
          <button style={{ backgroundColor: '#2dd4bf', color: 'white', border: 'none', padding: '14px 32px', borderRadius: '100px', fontWeight: 700, fontSize: '14px', cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>
            Explore Luxury Fleet
          </button>
        </div>
      </div>
    </section>
  )
}

export default function CarRentalPage() {
  const [activeSubNav, setActiveSubNav] = useState('Motors')
  const [currentPage, setCurrentPage] = useState(1)

  return (
    <div style={{ fontFamily: 'Inter, system-ui, sans-serif', backgroundColor: '#f4fbf8', minHeight: '100vh' }}>

      {/* ── HEADER ── */}
      <header style={{ position: 'sticky', top: 0, zIndex: 50, backgroundColor: 'rgba(244,251,248,0.85)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.45)', boxShadow: '0 1px 12px rgba(0,0,0,0.04)' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '14px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
            <Link href="/en" style={{ textDecoration: 'none', fontSize: '24px', fontWeight: 800, color: '#006b5f', letterSpacing: '-0.03em', fontFamily: 'Inter, sans-serif' }}>
              SouKni Rentals
            </Link>
            <nav style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
              {['INSURANCE', 'RENTAL PRO', 'FINANCE', 'NEW VEHICLES'].map((item, i) => (
                <a key={item} href="#" style={{
                  fontSize: '12px', fontWeight: 700, letterSpacing: '0.05em',
                  color: i === 1 ? '#006b5f' : '#6b7a76',
                  textDecoration: 'none',
                  borderBottom: i === 1 ? '2px solid #2dd4bf' : 'none',
                  paddingBottom: i === 1 ? '2px' : '0',
                  transition: 'color 0.15s', fontFamily: 'Inter, sans-serif',
                }}
                onMouseEnter={e => { if (i !== 1) e.currentTarget.style.color = '#006b5f' }}
                onMouseLeave={e => { if (i !== 1) e.currentTarget.style.color = '#6b7a76' }}
                >{item}</a>
              ))}
            </nav>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            {['🔔', '♡'].map((icon, i) => (
              <button key={i} style={{ fontSize: '18px', border: 'none', backgroundColor: 'transparent', cursor: 'pointer', color: '#6b7a76', padding: '6px' }}>{icon}</button>
            ))}
            <button style={{ backgroundColor: '#006b5f', color: 'white', border: 'none', padding: '10px 22px', borderRadius: '100px', fontSize: '12px', fontWeight: 700, cursor: 'pointer', letterSpacing: '0.05em', boxShadow: '0 4px 16px rgba(0,107,95,0.25)', fontFamily: 'Inter, sans-serif' }}>
              List Your Car
            </button>
          </div>
        </div>
      </header>

      <main style={{ maxWidth: '1440px', margin: '0 auto', padding: '32px 40px 80px' }}>

        {/* Category nav */}
        <nav style={{ marginBottom: '28px', borderBottom: '1px solid rgba(186,202,197,0.25)', paddingBottom: '16px', display: 'flex', justifyContent: 'center', gap: '32px', overflowX: 'auto' }}>
          {subNav.map(item => (
            <button key={item} onClick={() => setActiveSubNav(item)} style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.04em', color: activeSubNav === item ? '#006b5f' : '#6b7a76', border: 'none', backgroundColor: 'transparent', cursor: 'pointer', whiteSpace: 'nowrap', transition: 'color 0.15s', fontFamily: 'Inter, sans-serif' }}
              onMouseEnter={e => e.currentTarget.style.color = '#006b5f'}
              onMouseLeave={e => { if (activeSubNav !== item) e.currentTarget.style.color = '#6b7a76' }}
            >{item}</button>
          ))}
        </nav>

        {/* Filter bar */}
        <div style={{ backgroundColor: 'rgba(255,255,255,0.65)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.45)', borderRadius: '100px', padding: '6px 4px', display: 'flex', alignItems: 'center', marginBottom: '24px', boxShadow: '0 4px 16px rgba(0,107,95,0.06)' }}>
          {[
            { label: 'City', value: 'Casablanca' },
            { label: 'Make', value: 'Search Brand' },
            { label: 'Price (MAD)', value: 'Any Price' },
            { label: 'Rental Options', value: 'Select' },
            { label: 'Filters', value: 'filter selected' },
          ].map((field, i) => (
            <div key={field.label} style={{ flex: 1, padding: '10px 20px', borderRight: i < 4 ? '1px solid rgba(186,202,197,0.3)' : 'none', cursor: 'pointer', borderRadius: '100px', transition: 'background 0.15s' }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.8)'}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              <p style={{ fontSize: '9px', fontWeight: 800, color: 'rgba(60,74,70,0.55)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '3px', fontFamily: 'Inter, sans-serif' }}>{field.label}</p>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '14px', fontWeight: 500, color: '#161d1b', fontFamily: 'Inter, sans-serif' }}>{field.value}</span>
                <span style={{ color: '#2dd4bf', fontSize: '16px' }}>▾</span>
              </div>
            </div>
          ))}
        </div>

        {/* Breadcrumbs */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#6b7a76', marginBottom: '24px', fontFamily: 'Inter, sans-serif' }}>
          {['Home', 'Motors', 'Car Rental'].map((crumb, i, arr) => (
            <span key={crumb} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <a href="#" style={{ color: i === arr.length - 1 ? '#161d1b' : '#6b7a76', textDecoration: 'none', fontWeight: i === arr.length - 1 ? 600 : 400, transition: 'color 0.15s' }}>{crumb}</a>
              {i < arr.length - 1 && <span style={{ fontSize: '14px' }}>›</span>}
            </span>
          ))}
        </nav>

        {/* Title */}
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h1 style={{ fontSize: '36px', fontWeight: 800, color: '#161d1b', letterSpacing: '-0.02em', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '12px', fontFamily: 'Inter, sans-serif' }}>
              Cars for Rent in Morocco
              <span style={{ backgroundColor: 'rgba(45,212,191,0.15)', color: '#00574d', fontSize: '12px', fontWeight: 800, padding: '4px 14px', borderRadius: '100px', border: '1px solid rgba(45,212,191,0.25)', fontFamily: 'Inter, sans-serif' }}>
                2,319 Ads
              </span>
            </h1>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            {['⇅ Sort: Default', '🔖 Save Search'].map(btn => (
              <button key={btn} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '9px 16px', backgroundColor: '#e2eae7', borderRadius: '10px', border: 'none', fontSize: '12px', fontWeight: 700, color: '#161d1b', cursor: 'pointer', fontFamily: 'Inter, sans-serif', transition: 'background 0.15s' }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = '#dde4e1'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = '#e2eae7'}
              >{btn}</button>
            ))}
          </div>
        </div>

        {/* Make pills */}
        <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', marginBottom: '36px', paddingBottom: '4px' }}>
          {makes.map(make => (
            <button key={make.label} style={{
              whiteSpace: 'nowrap', padding: '9px 18px', borderRadius: '100px',
              border: make.active ? '1px solid #2dd4bf' : '1px solid #bacac5',
              backgroundColor: make.active ? 'rgba(45,212,191,0.1)' : 'white',
              color: make.active ? '#006b5f' : '#161d1b',
              fontSize: '12px', fontWeight: 700, cursor: 'pointer',
              transition: 'all 0.15s', fontFamily: 'Inter, sans-serif',
            }}
            onMouseEnter={e => { if (!make.active) { e.currentTarget.style.borderColor = '#2dd4bf'; e.currentTarget.style.color = '#006b5f' } }}
            onMouseLeave={e => { if (!make.active) { e.currentTarget.style.borderColor = '#bacac5'; e.currentTarget.style.color = '#161d1b' } }}
            >
              {make.label} <span style={{ opacity: 0.5, fontWeight: 400 }}>({make.count})</span>
            </button>
          ))}
          <button style={{ whiteSpace: 'nowrap', padding: '9px 18px', borderRadius: '100px', backgroundColor: '#e8efec', border: 'none', fontSize: '12px', fontWeight: 700, color: '#161d1b', cursor: 'pointer', transition: 'background 0.15s', fontFamily: 'Inter, sans-serif' }}>
            View All Brands
          </button>
        </div>

        {/* ── LISTING + BANNERS ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <RentalCard rental={rentals[0]} />
          <RentalCard rental={rentals[1]} />
          <ImmoBanner />
          <RentalCard rental={rentals[2]} />
          <RentalCard rental={rentals[3]} />
          <RentalCard rental={rentals[4]} />
          <RentalProBanner />
          <RentalCard rental={rentals[5]} />
          <RentalCard rental={rentals[6]} />
          <RentalCard rental={rentals[7]} />
        </div>

        {/* ── PAGINATION ── */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', marginTop: '48px' }}>
          <button style={{ width: '48px', height: '48px', borderRadius: '50%', border: '1px solid #bacac5', backgroundColor: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'background 0.15s' }}>
            <ChevronLeft size={18} color="#6b7a76" />
          </button>
          {[1, 2, 3, '...', 48].map((page, i) => (
            <button key={i} onClick={() => typeof page === 'number' && setCurrentPage(page)} style={{
              width: '48px', height: '48px', borderRadius: '50%',
              border: page === currentPage ? 'none' : '1px solid #bacac5',
              backgroundColor: page === currentPage ? '#006b5f' : 'transparent',
              color: page === currentPage ? 'white' : '#6b7a76',
              fontSize: '14px', fontWeight: page === currentPage ? 800 : 400,
              cursor: page === '...' ? 'default' : 'pointer',
              fontFamily: 'Inter, sans-serif', transition: 'all 0.15s',
            }}
            onMouseEnter={e => { if (page !== currentPage && page !== '...') e.currentTarget.style.backgroundColor = 'rgba(45,212,191,0.15)' }}
            onMouseLeave={e => { if (page !== currentPage) e.currentTarget.style.backgroundColor = 'transparent' }}
            >{page}</button>
          ))}
          <button style={{ width: '48px', height: '48px', borderRadius: '50%', border: '1px solid #bacac5', backgroundColor: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <ChevronRight size={18} color="#6b7a76" />
          </button>
        </div>

        {/* ── APP DOWNLOAD CTA ── */}
        <div style={{ marginTop: '64px', background: 'linear-gradient(135deg, #006b5f 0%, #2dd4bf 100%)', borderRadius: '32px', padding: '48px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '32px', flexWrap: 'wrap' }}>
          <div>
            <p style={{ fontSize: '11px', fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)', marginBottom: '10px', fontFamily: 'Inter, sans-serif' }}>Get the App</p>
            <h3 style={{ fontSize: '32px', fontWeight: 800, color: 'white', marginBottom: '8px', letterSpacing: '-0.02em', fontFamily: 'Inter, sans-serif' }}>The Market in your Pocket</h3>
            <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.8)', marginBottom: '24px', fontFamily: 'Inter, sans-serif' }}>Download now and rent your dream car in seconds.</p>
            <div style={{ display: 'flex', gap: '12px' }}>
              {[{ icon: '📱', sub: 'Download on the', title: 'App Store' }, { icon: '▶', sub: 'Get it on', title: 'Google Play' }].map(app => (
                <a key={app.title} href="#" style={{ display: 'flex', alignItems: 'center', gap: '10px', backgroundColor: 'rgba(0,0,0,0.25)', padding: '12px 20px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.2)', textDecoration: 'none', transition: 'background 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.4)'}
                  onMouseLeave={e => e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.25)'}
                >
                  <span style={{ fontSize: '24px' }}>{app.icon}</span>
                  <div>
                    <p style={{ fontSize: '9px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)', letterSpacing: '0.1em', fontFamily: 'Inter, sans-serif' }}>{app.sub}</p>
                    <p style={{ fontSize: '14px', fontWeight: 700, color: 'white', fontFamily: 'Inter, sans-serif' }}>{app.title}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
          <div style={{ fontSize: '100px', lineHeight: 1 }}>🚗</div>
        </div>

      </main>

      {/* ── FOOTER ── */}
      <footer style={{ backgroundColor: '#7A7A7A', color: 'white', padding: '64px 40px 24px' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1fr', gap: '48px', marginBottom: '48px' }}>
            <div>
              <div style={{ fontSize: '24px', fontWeight: 900, color: 'white', marginBottom: '6px', fontFamily: 'Inter, sans-serif' }}>SouKni</div>
              <p style={{ fontSize: '16px', fontStyle: 'italic', color: 'rgba(255,255,255,0.85)', marginBottom: '12px', fontFamily: 'Inter, sans-serif' }}>"The Market in your Pocket"</p>
              <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.7, marginBottom: '20px', maxWidth: '280px', fontFamily: 'Inter, sans-serif' }}>Morocco's premium marketplace for real estate, motors, electronics and more.</p>
              <div style={{ display: 'flex', gap: '10px' }}>
                {['🌐', '📤'].map((icon, i) => (
                  <a key={i} href="#" style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', textDecoration: 'none', transition: 'background 0.2s' }}
                    onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.28)'}
                    onMouseLeave={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.15)'}
                  >{icon}</a>
                ))}
              </div>
            </div>
            {[
              { title: 'Marketplace', links: ['Real Estate', 'Motors', 'Jobs', 'Services', 'The Vault'] },
              { title: 'Company', links: ['About Us', 'Careers', 'Legal', 'Privacy Policy', 'Terms of Service'] },
            ].map(col => (
              <div key={col.title}>
                <h4 style={{ fontWeight: 700, fontSize: '18px', color: 'white', marginBottom: '24px', fontFamily: 'Inter, sans-serif' }}>{col.title}</h4>
                {col.links.map(link => (
                  <a key={link} href="#" style={{ display: 'block', fontSize: '14px', color: 'rgba(255,255,255,0.72)', textDecoration: 'none', marginBottom: '14px', fontFamily: 'Inter, sans-serif', transition: 'color 0.15s' }}
                    onMouseEnter={e => e.currentTarget.style.color = 'white'}
                    onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.72)'}
                  >{link}</a>
                ))}
              </div>
            ))}
            <div>
              <h4 style={{ fontWeight: 700, fontSize: '18px', color: 'white', marginBottom: '24px', fontFamily: 'Inter, sans-serif' }}>Download SouKni App</h4>
              {[{ icon: '📱', sub: 'Download on the', title: 'App Store' }, { icon: '▶', sub: 'Get it on', title: 'Google Play' }].map(app => (
                <a key={app.title} href="#" style={{ display: 'flex', alignItems: 'center', gap: '14px', backgroundColor: 'rgba(0,0,0,0.25)', padding: '14px 18px', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.12)', textDecoration: 'none', marginBottom: '10px', transition: 'background 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.4)'}
                  onMouseLeave={e => e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.25)'}
                >
                  <span style={{ fontSize: '28px' }}>{app.icon}</span>
                  <div>
                    <p style={{ fontSize: '9px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', letterSpacing: '0.1em', fontFamily: 'Inter, sans-serif' }}>{app.sub}</p>
                    <p style={{ fontSize: '16px', fontWeight: 700, color: 'white', fontFamily: 'Inter, sans-serif' }}>{app.title}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
            <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.45)', fontFamily: 'Inter, sans-serif' }}>© 2026 SouKni Motors Marketplace. All rights reserved.</p>
            <div style={{ display: 'flex', gap: '24px' }}>
              {['Help Center', 'Contact Us'].map(link => (
                <a key={link} href="#" style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontFamily: 'Inter, sans-serif', transition: 'color 0.15s' }}
                  onMouseEnter={e => e.currentTarget.style.color = 'white'}
                  onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.6)'}
                >{link}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
