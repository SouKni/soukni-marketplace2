'use client'

import React, { useState } from 'react'
import Link from 'next/link'

const filterFields = [
  { label: 'City', value: 'Casablanca', key: 'city' },
  { label: 'Make', value: 'Search Brand', key: 'make' },
  { label: 'Price Range', value: 'Any Price', key: 'price' },
  { label: 'Fuel Type', value: 'Select', key: 'fuel' },
  { label: 'Filters', value: 'Filter Selected', key: 'filters' },
]

const brandPills = [
  { name: 'Mercedes-Benz', count: 385 },
  { name: 'BMW', count: 148 },
  { name: 'Land Rover', count: 162, active: true },
  { name: 'Nissan', count: 170 },
  { name: 'Kia', count: 138 },
  { name: 'Hyundai', count: 138 },
]

const listings = [
  { id: '1', make: 'Land Rover', model: 'Defender 110', year: 2024, km: '0 km', fuel: 'Gasoline', transmission: 'Automatic', price: '1,245,000', monthlyFinance: '14,200', badge: 'Premium', badgeColor: '#f97316', verified: true, description: 'Experience ultimate luxury and capability with the all-new Defender. Perfect for Casablanca streets or desert adventures.', image: 'https://images.pexels.com/photos/2533092/pexels-photo-2533092.jpeg?auto=compress&w=800', showFinance: true },
  { id: '2', make: 'BMW', model: 'X5 xDrive40i M Sport', year: 2024, km: '0 km', fuel: 'Hybrid', transmission: 'Casablanca', price: '980,000', monthlyFinance: null, badge: null, badgeColor: '', verified: false, sponsored: true, description: 'The ultimate performance SUV. Fully loaded with premium features for your Moroccan adventure.', image: 'https://images.pexels.com/photos/3764984/pexels-photo-3764984.jpeg?auto=compress&w=800', showFinance: false },
  { id: '3', make: 'Mercedes-Benz', model: 'EQS 450+', year: 2024, km: '0 km', fuel: 'Electric', transmission: '650km Range', price: '1,550,000', monthlyFinance: null, badge: 'New Arrival', badgeColor: '#2dd4bf', verified: false, description: 'Future-forward luxury. Zero emissions, maximum comfort. The pinnacle of the electric era.', image: 'https://images.pexels.com/photos/1149831/pexels-photo-1149831.jpeg?auto=compress&w=800', showFinance: false },
  { id: '4', make: 'GAC', model: 'EMKOO GS', year: 2026, km: '0 km', fuel: 'Left Hand', transmission: 'GCC Specs', price: '77,999', monthlyFinance: null, badge: 'Car of the Week', badgeColor: '#f97316', verified: true, description: 'GCC | GAC EMKOO | Agency Warranty 5 Years or 150,000 KM. Modern design meets exceptional performance.', image: 'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&w=800', showFinance: false },
  { id: '5', make: 'Range Rover', model: 'Velar R-Dynamic', year: 2025, km: '0 km', fuel: 'Gasoline', transmission: 'Automatic', price: '845,000', monthlyFinance: null, badge: null, badgeColor: '', verified: true, description: 'The most refined and capable mid-size SUV. R-Dynamic styling with cutting-edge technology.', image: 'https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg?auto=compress&w=800', showFinance: false },
  { id: '6', make: 'Audi', model: 'RS Q8 2024', year: 2024, km: '0 km', fuel: 'Gasoline', transmission: 'Automatic', price: '1,650,000', monthlyFinance: null, badge: null, badgeColor: '', verified: true, description: 'The ultimate performance SUV from Audi Sport. Unmatched power meets everyday versatility.', image: 'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&w=800', showFinance: false },
  { id: '7', make: 'Porsche', model: '911 Turbo S 2024', year: 2024, km: '0 km', fuel: 'Gasoline', transmission: 'Automatic', price: '2,450,000', monthlyFinance: null, badge: null, badgeColor: '', verified: true, description: 'The benchmark for everyday supercars. Experience the pinnacle of German engineering.', image: 'https://images.pexels.com/photos/2533092/pexels-photo-2533092.jpeg?auto=compress&w=800', showFinance: false },
  { id: '8', make: 'Maserati', model: 'Grecale Trofeo 2024', year: 2024, km: '0 km', fuel: 'Gasoline', transmission: 'Automatic', price: '1,350,000', monthlyFinance: null, badge: null, badgeColor: '', verified: true, description: 'Italian elegance meets high-performance SUV capability. The Everyday Exceptional.', image: 'https://images.pexels.com/photos/3764984/pexels-photo-3764984.jpeg?auto=compress&w=800', showFinance: false },
]

const testimonials = [
  { text: 'Excellent service. Found my dream car in less than a week. The verified badge gave me peace of mind.', name: 'Ahmed B.', city: 'Casablanca' },
  { text: 'The mobile app is so smooth. Contacting sellers via WhatsApp is a game changer for the Moroccan market.', name: 'Sara K.', city: 'Marrakech' },
  { text: 'Transparent pricing and great filters. Highly recommended for anyone looking for new car imports.', name: 'Yassine L.', city: 'Rabat' },
]

const subNav = ['Motors', 'Property', 'Jobs', 'The Vault', 'Services', 'Mobiles & Tablets', 'Community']

function NewCarCard({ listing }: { listing: typeof listings[0] }) {
  const [liked, setLiked] = useState(false)
  const [hovered, setHovered] = useState(false)

  return (
    <article
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        backgroundColor: 'white',
        borderRadius: '40px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'row',
        border: hovered ? '1px solid rgba(45,212,191,0.3)' : '1px solid #e2e8f0',
        boxShadow: hovered ? '0 8px 30px rgba(45,212,191,0.15)' : '0 1px 4px rgba(0,0,0,0.05)',
        transition: 'all 0.2s',
        fontFamily: 'Inter, sans-serif',
      }}
    >
      {/* Image */}
      <div style={{ position: 'relative', width: '40%', minHeight: '280px', flexShrink: 0, overflow: 'hidden' }}>
        <img
          src={listing.image}
          alt={`${listing.make} ${listing.model}`}
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s', transform: hovered ? 'scale(1.04)' : 'scale(1)', position: 'absolute', inset: 0 }}
        />
        {listing.badge && (
          <div style={{ position: 'absolute', top: '16px', left: '16px' }}>
            <span style={{ backgroundColor: listing.badgeColor, color: 'white', fontSize: '10px', fontWeight: 800, padding: '4px 10px', borderRadius: '6px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              {listing.badge}
            </span>
          </div>
        )}
        <div style={{ position: 'absolute', top: '16px', right: '16px', display: 'flex', gap: '8px' }}>
          <button
            onClick={() => setLiked(!liked)}
            style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: 'rgba(0,0,0,0.2)', backdropFilter: 'blur(8px)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}
          >
            <svg width="16" height="16" fill={liked ? '#ef4444' : 'none'} stroke={liked ? '#ef4444' : 'white'} viewBox="0 0 24 24"><path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
        </div>
        <div style={{ position: 'absolute', bottom: '16px', left: '16px', display: 'flex', gap: '4px' }}>
          {[0,1,2].map(i => <div key={i} style={{ width: i===0?'16px':'6px', height: '6px', borderRadius: '3px', backgroundColor: i===0?'white':'rgba(255,255,255,0.4)' }} />)}
        </div>
      </div>

      {/* Content */}
      <div style={{ flex: 1, padding: '32px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
            <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em' }}>
              {listing.make} • {listing.model}
            </h2>
            {listing.verified && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#2dd4bf' }}>
                <svg width="18" height="18" fill="#2dd4bf" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/></svg>
                <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Verified</span>
              </div>
            )}
          </div>

          <div style={{ display: 'flex', gap: '16px', fontSize: '12px', color: '#94a3b8', marginBottom: '16px', flexWrap: 'wrap' }}>
            <span>{listing.year}</span><span>•</span><span>{listing.km}</span><span>•</span><span>{listing.fuel}</span><span>•</span><span>{listing.transmission}</span>
          </div>

          <p style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.7, marginBottom: '24px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
            {listing.description}
          </p>

          {listing.showFinance ? (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '32px' }}>
              <div style={{ backgroundColor: '#f4fbf8', padding: '16px', borderRadius: '16px' }}>
                <span style={{ display: 'block', fontSize: '10px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '4px' }}>Selling Price</span>
                <span style={{ fontSize: '20px', fontWeight: 800, color: '#2dd4bf' }}>{listing.price} <span style={{ fontSize: '12px' }}>MAD</span></span>
              </div>
              <div style={{ backgroundColor: '#f4fbf8', padding: '16px', borderRadius: '16px' }}>
                <span style={{ display: 'block', fontSize: '10px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '4px' }}>Monthly Finance</span>
                <span style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a' }}>{listing.monthlyFinance} <span style={{ fontSize: '12px' }}>MAD/mo</span></span>
              </div>
            </div>
          ) : (
            <div style={{ backgroundColor: '#f4fbf8', padding: '16px', borderRadius: '16px', display: 'inline-block', marginBottom: '32px' }}>
              <span style={{ display: 'block', fontSize: '10px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '4px' }}>Price</span>
              <span style={{ fontSize: '20px', fontWeight: 800, color: '#2dd4bf' }}>{listing.price} <span style={{ fontSize: '12px' }}>MAD</span></span>
            </div>
          )}
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <button style={{ flex: 1, padding: '12px', border: '2px solid #2dd4bf', color: '#2dd4bf', backgroundColor: 'transparent', borderRadius: '12px', fontSize: '13px', fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s', fontFamily: 'Inter, sans-serif' }}
            onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#2dd4bf'; e.currentTarget.style.color = 'white' }}
            onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#2dd4bf' }}
          >
            💬 SouKni Message
          </button>
          <button style={{ flex: 1, padding: '12px', border: 'none', backgroundColor: '#25D366', color: 'white', borderRadius: '12px', fontSize: '13px', fontWeight: 700, cursor: 'pointer', transition: 'opacity 0.2s', fontFamily: 'Inter, sans-serif' }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.9'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
          >
            📱 WhatsApp
          </button>
        </div>
      </div>
    </article>
  )
}

export default function NewCarsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = React.use(params)
  const [currentPage, setCurrentPage] = useState(1)
  const [activeSubNav, setActiveSubNav] = useState('Motors')

  return (
    <div style={{ fontFamily: 'Inter, system-ui, sans-serif', backgroundColor: '#f4fbf8', minHeight: '100vh' }}>

      {/* HEADER */}
      <header style={{ position: 'sticky', top: 0, zIndex: 50, backgroundColor: 'rgba(244,251,248,0.92)', backdropFilter: 'blur(16px)', borderBottom: '1px solid #d4dcd9' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '12px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ backgroundColor: '#2dd4bf', width: '40px', height: '40px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ color: 'white', fontWeight: 900, fontSize: '18px' }}>S</span>
              </div>
              <span style={{ fontSize: '22px', fontWeight: 900, color: '#0f172a', letterSpacing: '-0.02em' }}>
                SouKni <span style={{ color: '#2dd4bf' }}>Auto Pro</span>
              </span>
            </div>
            <nav style={{ display: 'flex', gap: '24px' }}>
              {['Insurance', 'Auto Pro', 'Finance', 'New Vehicles'].map((item, i) => (
                <a key={item} href="#" style={{ fontSize: '13px', fontWeight: 500, color: i === 1 ? '#2dd4bf' : '#475569', textDecoration: i === 1 ? 'underline' : 'none', textUnderlineOffset: '6px', transition: 'color 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#2dd4bf'}
                  onMouseLeave={e => e.currentTarget.style.color = i === 1 ? '#2dd4bf' : '#475569'}
                >{item}</a>
              ))}
            </nav>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button style={{ padding: '8px', backgroundColor: 'transparent', border: 'none', cursor: 'pointer', fontSize: '20px' }}>🔔</button>
            <button style={{ padding: '8px', backgroundColor: 'transparent', border: 'none', cursor: 'pointer', fontSize: '20px' }}>♡</button>
            <button style={{ backgroundColor: '#0f172a', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '100px', fontSize: '13px', fontWeight: 700, cursor: 'pointer', transition: 'background 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = '#2dd4bf'}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = '#0f172a'}
            >List Your Car</button>
          </div>
        </div>

        {/* Sub nav */}
        <div style={{ borderTop: '1px solid #d4dcd9', backgroundColor: 'rgba(255,255,255,0.5)' }}>
          <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 24px', display: 'flex', justifyContent: 'center', gap: '40px' }}>
            {subNav.map(item => (
              <button key={item} onClick={() => setActiveSubNav(item)} style={{ padding: '10px 0', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', border: 'none', backgroundColor: 'transparent', cursor: 'pointer', color: activeSubNav === item ? '#0f172a' : '#94a3b8', borderBottom: activeSubNav === item ? '2px solid #2dd4bf' : '2px solid transparent', transition: 'all 0.15s' }}>
                {item}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main style={{ maxWidth: '1440px', margin: '0 auto', padding: '32px 24px' }}>

        {/* BREADCRUMBS */}
        <nav style={{ display: 'flex', gap: '8px', fontSize: '12px', color: '#94a3b8', marginBottom: '24px', alignItems: 'center' }}>
          <a href={`/${locale}`} style={{ color: '#94a3b8', textDecoration: 'none' }}>Home</a>
          <span>›</span>
          <a href={`/${locale}/motors`} style={{ color: '#94a3b8', textDecoration: 'none' }}>Motors</a>
          <span>›</span>
          <span style={{ color: '#0f172a', fontWeight: 600 }}>New Cars</span>
        </nav>

        {/* FILTER BAR */}
        <section style={{ backgroundColor: 'rgba(255,255,255,0.6)', padding: '24px', borderRadius: '40px', border: '1px solid white', marginBottom: '32px', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px' }}>
            {filterFields.map(field => (
              <div key={field.key}>
                <label style={{ display: 'block', fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#94a3b8', marginBottom: '6px' }}>{field.label}</label>
                <div style={{ backgroundColor: '#f4fbf8', borderRadius: '8px', padding: '8px 12px', fontSize: '13px', color: '#0f172a', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}>
                  <span>{field.value}</span>
                  <svg width="14" height="14" fill="none" stroke="#94a3b8" viewBox="0 0 24 24"><path d="M19 9l-7 7-7-7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* LIST STATS */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em' }}>New Cars for Sale in Morocco</h1>
            <span style={{ backgroundColor: 'rgba(45,212,191,0.1)', color: '#2dd4bf', fontSize: '11px', fontWeight: 800, padding: '3px 10px', borderRadius: '100px' }}>3,580 Ads</span>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            {['⇅ Sort: Default', '🔖 Save Search'].map(btn => (
              <button key={btn} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', fontWeight: 600, backgroundColor: 'white', padding: '8px 16px', borderRadius: '8px', boxShadow: '0 1px 4px rgba(0,0,0,0.06)', border: '1px solid #e2e8f0', cursor: 'pointer', color: '#0f172a', fontFamily: 'Inter, sans-serif' }}>{btn}</button>
            ))}
          </div>
        </div>

        {/* BRAND PILLS */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '40px', overflowX: 'auto', paddingBottom: '4px' }}>
          {brandPills.map(brand => (
            <button key={brand.name} style={{ whiteSpace: 'nowrap', padding: '8px 16px', borderRadius: '100px', fontSize: '12px', fontWeight: 500, border: '1px solid #e2e8f0', backgroundColor: brand.active ? '#2dd4bf' : 'white', color: brand.active ? 'white' : '#0f172a', cursor: 'pointer', transition: 'all 0.15s', fontFamily: 'Inter, sans-serif' }}>
              {brand.name} ({brand.count})
            </button>
          ))}
          <button style={{ whiteSpace: 'nowrap', padding: '8px 16px', borderRadius: '100px', fontSize: '12px', fontWeight: 700, backgroundColor: '#f1f5f9', border: 'none', color: '#0f172a', cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>
            View All Brands
          </button>
        </div>

        {/* LISTINGS */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

          <NewCarCard listing={listings[0]} />

          {/* BANNER 1 - Immo Pro */}
          <section style={{ position: 'relative', height: '240px', borderRadius: '40px', overflow: 'hidden', cursor: 'pointer' }}>
            <img src="https://images.pexels.com/photos/2581922/pexels-photo-2581922.jpeg?auto=compress&w=1400" alt="SouKni Immo Pro" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(15,23,42,0.5)', backdropFilter: 'blur(2px)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '32px' }}>
              <span style={{ fontSize: '10px', fontWeight: 800, color: '#2dd4bf', textTransform: 'uppercase', letterSpacing: '0.3em', marginBottom: '16px' }}>SouKni Immo Pro</span>
              <h2 style={{ fontSize: '28px', fontWeight: 800, color: 'white', marginBottom: '20px', letterSpacing: '-0.02em' }}>Elevate Your Lifestyle with SouKni Immo Pro</h2>
              <button style={{ backgroundColor: '#2dd4bf', color: '#0f172a', border: 'none', padding: '12px 32px', borderRadius: '100px', fontWeight: 700, fontSize: '14px', cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>Explore Real Estate</button>
            </div>
          </section>

          {listings.slice(1, 4).map(l => <NewCarCard key={l.id} listing={l} />)}

          {/* BANNER 2 - Insurance */}
          <section style={{ borderRadius: '40px', overflow: 'hidden', padding: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', cursor: 'pointer', background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)' }}>
            <div style={{ backgroundColor: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(12px)', padding: '28px 40px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.3)', maxWidth: '600px' }}>
              <span style={{ fontSize: '10px', fontWeight: 800, color: '#2dd4bf', textTransform: 'uppercase', letterSpacing: '0.3em', display: 'block', marginBottom: '8px' }}>Partenaire Officiel</span>
              <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#0f172a', marginBottom: '16px', letterSpacing: '-0.01em' }}>Assurez votre nouveau vehicule au meilleur prix</h2>
              <button style={{ backgroundColor: '#2dd4bf', color: 'white', border: 'none', padding: '10px 28px', borderRadius: '100px', fontWeight: 700, fontSize: '13px', cursor: 'pointer', boxShadow: '0 4px 14px rgba(45,212,191,0.3)', fontFamily: 'Inter, sans-serif' }}>Obtenir mon devis</button>
            </div>
          </section>

          {listings.slice(4).map(l => <NewCarCard key={l.id} listing={l} />)}
        </div>

        {/* PAGINATION */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', margin: '64px 0' }}>
          <button style={{ width: '40px', height: '40px', borderRadius: '50%', border: '1px solid #e2e8f0', backgroundColor: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px' }}>‹</button>
          {[1,2,3].map(p => (
            <button key={p} onClick={() => setCurrentPage(p)} style={{ width: '40px', height: '40px', borderRadius: '50%', border: currentPage===p ? 'none' : '1px solid #e2e8f0', backgroundColor: currentPage===p ? '#2dd4bf' : 'transparent', color: currentPage===p ? 'white' : '#0f172a', fontWeight: 700, cursor: 'pointer', fontSize: '13px', fontFamily: 'Inter, sans-serif' }}>{p}</button>
          ))}
          <span style={{ margin: '0 8px', opacity: 0.3 }}>...</span>
          <button style={{ width: '40px', height: '40px', borderRadius: '50%', border: '1px solid #e2e8f0', backgroundColor: 'transparent', cursor: 'pointer', fontSize: '13px', fontFamily: 'Inter, sans-serif' }}>48</button>
          <button style={{ width: '40px', height: '40px', borderRadius: '50%', border: '1px solid #e2e8f0', backgroundColor: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px' }}>›</button>
        </div>

        {/* TESTIMONIALS */}
        <section style={{ backgroundColor: 'rgba(255,255,255,0.4)', padding: '48px', borderRadius: '40px', border: '1px solid white', marginBottom: '64px' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h3 style={{ fontSize: '24px', fontWeight: 800, color: '#0f172a', marginBottom: '8px', letterSpacing: '-0.02em' }}>Ils nous ont fait confiance</h3>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
              {[...Array(5)].map((_,i) => <div key={i} style={{ width: '22px', height: '22px', backgroundColor: '#22c55e', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '11px' }}>★</div>)}
              <span style={{ fontSize: '13px', fontWeight: 600, marginLeft: '8px', color: '#0f172a' }}>Trustpilot</span>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
            {testimonials.map((t, i) => (
              <div key={i} style={{ backgroundColor: 'white', padding: '24px', borderRadius: '24px', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
                <p style={{ fontSize: '13px', fontStyle: 'italic', color: '#64748b', lineHeight: 1.7, marginBottom: '20px' }}>"{t.text}"</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'rgba(45,212,191,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: '#2dd4bf', fontSize: '16px' }}>{t.name[0]}</div>
                  <div>
                    <p style={{ fontWeight: 700, color: '#0f172a', fontSize: '13px', marginBottom: '2px' }}>{t.name}</p>
                    <p style={{ fontSize: '10px', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.05em' }}>{t.city}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* APP DOWNLOAD */}
        <section style={{ backgroundColor: 'white', border: '1px solid #e2e8f0', padding: '40px', borderRadius: '40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '32px', marginBottom: '40px' }}>
          <div>
            <h2 style={{ fontSize: '28px', fontWeight: 800, color: '#0f172a', marginBottom: '8px', letterSpacing: '-0.02em' }}>Find amazing deals on the go.</h2>
            <p style={{ fontSize: '16px', color: '#2dd4bf', fontWeight: 600, marginBottom: '24px' }}>Download the app now!</p>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              {['🍎 App Store', '▶ Google Play', '🏪 AppGallery'].map(store => (
                <button key={store} style={{ backgroundColor: '#0f172a', color: 'white', border: 'none', padding: '10px 18px', borderRadius: '10px', fontWeight: 700, fontSize: '12px', cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>{store}</button>
              ))}
            </div>
          </div>
          <div style={{ fontSize: '80px', lineHeight: 1 }}>📱</div>
        </section>

      </main>

      {/* FOOTER */}
      <footer style={{ backgroundColor: '#7A7A7A', padding: '64px 24px 32px' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1fr', gap: '40px', marginBottom: '48px' }}>
            <div>
              <div style={{ fontSize: '24px', fontWeight: 900, color: 'white', marginBottom: '8px', letterSpacing: '-0.02em' }}>SouKni<span style={{ color: '#2dd4bf' }}>.</span></div>
              <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, marginBottom: '8px' }}>"The Market in your Pocket"</p>
              <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.7 }}>Morocco's premium marketplace for real estate, motors, electronics and more.</p>
            </div>
            {[
              { title: 'Marketplace', links: ['Real Estate', 'Motors', 'Jobs', 'Services', 'The Vault'] },
              { title: 'Company', links: ['About Us', 'Careers', 'Legal', 'Privacy Policy', 'Terms of Service'] },
              { title: 'Support', links: ['Help Center', 'Contact Us', 'Safety Tips', 'Fraud Awareness'] },
            ].map(col => (
              <div key={col.title}>
                <h4 style={{ fontWeight: 700, color: 'white', marginBottom: '20px', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{col.title}</h4>
                {col.links.map(link => (
                  <a key={link} href="#" style={{ display: 'block', fontSize: '13px', color: 'rgba(255,255,255,0.6)', textDecoration: 'none', marginBottom: '10px', transition: 'color 0.15s' }}
                    onMouseEnter={e => e.currentTarget.style.color = '#2dd4bf'}
                    onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.6)'}
                  >{link}</a>
                ))}
              </div>
            ))}
          </div>
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
            <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)' }}>© 2026 SouKni. All rights reserved.</p>
            <div style={{ display: 'flex', gap: '24px' }}>
              {['Help Center', 'Contact Us'].map(link => (
                <a key={link} href="#" style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', textDecoration: 'none' }}
                  onMouseEnter={e => e.currentTarget.style.color = 'white'}
                  onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.4)'}
                >{link}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
