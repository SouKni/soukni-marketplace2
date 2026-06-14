'use client'

import React, { useState } from 'react'
import Link from 'next/link'

const categoryTabs = [
  { label: 'Movers & Packers', count: 4460, active: true },
  { label: 'Deep Cleaning & Disinfection Services', count: 1195, active: false },
  { label: 'Storage Services', count: 171, active: false },
]

const sellerFilters = [
  { label: 'All Sellers', icon: '👥', active: true },
  { label: 'Individuals', icon: '👤', active: false },
  { label: 'Businesses', icon: '✅', active: false },
]

const featuredListings = [
  {
    id: '1',
    title: 'Professional Home Movers and Packers Company in Rabat, Cheap',
    subtitle: 'Movers & Removals • Movers & Packers',
    badges: [{ label: 'FEATURED', color: '#1d4ed8' }, { label: 'VERIFIED BUSINESS', color: '#2dd4bf' }],
    attributes: [
      { label: 'Move Type', value: 'Local (Within same...' },
      { label: 'Insurance Provided', value: 'Full Value Protecti...' },
      { label: 'Property Size', value: '1 - 2 Bedroom Apa...' },
      { label: 'Service Inclusions', value: 'Packing Materials ...' },
    ],
    location: 'Agdal, Rabat',
    date: '11 June 2026',
    image: 'https://images.pexels.com/photos/4246120/pexels-photo-4246120.jpeg?auto=compress&w=400',
  },
  {
    id: '2',
    title: '🚚 Affordable Trusted Local Relocation Specialists Near You Rabat',
    subtitle: 'Movers & Removals • Movers & Packers',
    badges: [{ label: 'FEATURED', color: '#1d4ed8' }, { label: 'VERIFIED BUSINESS', color: '#2dd4bf' }],
    attributes: [
      { label: 'Move Type', value: 'Local (Within same...' },
      { label: 'Insurance Provided', value: 'Available on Requ...' },
      { label: 'Property Size', value: 'Any Size Property' },
      { label: 'Service Inclusions', value: 'Packing & Loading' },
    ],
    location: 'Hay Riad, Rabat',
    date: '10 June 2026',
    image: 'https://images.pexels.com/photos/7464229/pexels-photo-7464229.jpeg?auto=compress&w=400',
  },
]

const gridListings = [
  {
    id: '3',
    title: 'Expert Home Maintenance & Plumbing',
    subtitle: 'Home Services • Plumbing & Repair',
    badges: [{ label: 'VERIFIED BUSINESS', color: '#2dd4bf' }],
    attributes: [
      { label: 'Service Type', value: 'Emergency & Routine' },
      { label: 'Starting Price', value: 'From 250 MAD', highlight: true },
    ],
    location: 'Agdal, Rabat',
    image: 'https://images.pexels.com/photos/6306077/pexels-photo-6306077.jpeg?auto=compress&w=400',
  },
  {
    id: '4',
    title: 'Professional Academic Tutoring',
    subtitle: 'Education • Private Tutoring',
    badges: [{ label: 'VERIFIED BUSINESS', color: '#2dd4bf' }],
    attributes: [
      { label: 'Level', value: 'Primary & Secondary' },
      { label: 'Rate', value: '150 MAD/hr', highlight: true },
    ],
    location: 'Gauthier, Casablanca',
    image: 'https://images.pexels.com/photos/5905497/pexels-photo-5905497.jpeg?auto=compress&w=400',
  },
  {
    id: '5',
    title: 'Luxury Event Planning & Design',
    subtitle: 'Events • Wedding & Corporate',
    badges: [{ label: 'VERIFIED BUSINESS', color: '#2dd4bf' }],
    attributes: [
      { label: 'Service', value: 'Full Planning & Decor' },
      { label: 'Pricing', value: 'On Request', highlight: true },
    ],
    location: 'Hivernage, Marrakech',
    image: 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&w=400',
  },
  {
    id: '6',
    title: 'Elite IT Support & Computer Repair',
    subtitle: 'Tech Services • IT Support',
    badges: [{ label: 'VERIFIED BUSINESS', color: '#2dd4bf' }],
    attributes: [
      { label: 'Service', value: 'Hardware & Software' },
      { label: 'Starting Price', value: 'From 300 MAD', highlight: true },
    ],
    location: 'Technopolis, Rabat',
    image: 'https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&w=400',
  },
]

const subNav = ['Motors', 'Property', 'Jobs', 'Services', 'Community']

function FeaturedCard({ listing }: { listing: typeof featuredListings[0] }) {
  const [liked, setLiked] = useState(false)
  const [hovered, setHovered] = useState(false)

  return (
    <article
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        backgroundColor: 'white', borderRadius: '40px', padding: '32px',
        border: '1px solid #f1f5f9', display: 'flex', flexDirection: 'row',
        gap: '32px', position: 'relative', fontFamily: 'Inter, sans-serif',
        boxShadow: hovered ? '0 20px 40px rgba(0,0,0,0.08)' : '0 1px 4px rgba(0,0,0,0.04)',
        transition: 'box-shadow 0.2s',
      }}
    >
      {/* Content */}
      <div style={{ flex: 1 }}>
        {/* Badges */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '12px', flexWrap: 'wrap' }}>
          {listing.badges.map((badge, i) => (
            <span key={i} style={{ backgroundColor: badge.color, color: 'white', fontSize: '10px', fontWeight: 800, padding: '3px 8px', borderRadius: '4px', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              {badge.label}
            </span>
          ))}
        </div>

        <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', marginBottom: '4px', textTransform: 'uppercase', lineHeight: 1.3 }}>{listing.title}</h3>
        <p style={{ fontSize: '13px', color: '#94a3b8', marginBottom: '24px', fontWeight: 500 }}>{listing.subtitle}</p>

        {/* Attributes */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '32px' }}>
          {listing.attributes.map((attr, i) => (
            <div key={i} style={{ backgroundColor: '#f8fafc', padding: '12px', borderRadius: '12px', border: '1px solid #f1f5f9' }}>
              <p style={{ fontSize: '10px', color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '4px' }}>{attr.label}</p>
              <p style={{ fontSize: '13px', fontWeight: 600, color: '#1e293b' }}>{attr.value}</p>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#94a3b8', fontSize: '13px' }}>
            <span style={{ color: '#2dd4bf' }}>📍</span>
            {listing.location} • {listing.date}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', fontSize: '20px' }}>⇧</button>
            <button onClick={() => setLiked(!liked)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '20px', color: liked ? '#ef4444' : '#94a3b8' }}>♡</button>
            <button style={{ backgroundColor: '#eff6ff', color: '#2563eb', border: 'none', padding: '10px 28px', borderRadius: '12px', fontWeight: 700, fontSize: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontFamily: 'Inter, sans-serif', transition: 'background 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = '#dbeafe'}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = '#eff6ff'}
            >
              💬 Chat
            </button>
          </div>
        </div>
      </div>

      {/* Image */}
      <div style={{ width: '240px', flexShrink: 0 }}>
        <img
          src={listing.image}
          alt={listing.title}
          style={{ width: '100%', height: '240px', objectFit: 'cover', borderRadius: '24px' }}
        />
      </div>
    </article>
  )
}

function GridCard({ listing }: { listing: typeof gridListings[0] }) {
  const [hovered, setHovered] = useState(false)

  return (
    <article
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        backgroundColor: 'white', borderRadius: '40px', padding: '32px',
        border: '1px solid #f1f5f9', display: 'flex', flexDirection: 'column', gap: '24px',
        fontFamily: 'Inter, sans-serif',
        boxShadow: hovered ? '0 20px 40px rgba(0,0,0,0.08)' : '0 1px 4px rgba(0,0,0,0.04)',
        transition: 'box-shadow 0.2s',
      }}
    >
      <div style={{ flex: 1 }}>
        {/* Badges */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '12px', flexWrap: 'wrap' }}>
          {listing.badges.map((badge, i) => (
            <span key={i} style={{ backgroundColor: badge.color, color: 'white', fontSize: '10px', fontWeight: 800, padding: '3px 8px', borderRadius: '4px', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              {badge.label}
            </span>
          ))}
        </div>

        <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#0f172a', marginBottom: '4px', textTransform: 'uppercase', lineHeight: 1.3 }}>{listing.title}</h3>
        <p style={{ fontSize: '13px', color: '#94a3b8', marginBottom: '24px', fontWeight: 500 }}>{listing.subtitle}</p>

        {/* Attributes */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '32px' }}>
          {listing.attributes.map((attr, i) => (
            <div key={i} style={{ backgroundColor: '#f8fafc', padding: '12px', borderRadius: '12px', border: '1px solid #f1f5f9' }}>
              <p style={{ fontSize: '10px', color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '4px' }}>{attr.label}</p>
              <p style={{ fontSize: '13px', fontWeight: 600, color: attr.highlight ? '#2dd4bf' : '#1e293b' }}>{attr.value}</p>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#94a3b8', fontSize: '13px' }}>
            <span style={{ color: '#2dd4bf' }}>📍</span>
            {listing.location}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', fontSize: '20px' }}>⇧</button>
            <button style={{ backgroundColor: '#2dd4bf', color: 'white', border: 'none', padding: '10px 28px', borderRadius: '12px', fontWeight: 700, fontSize: '14px', cursor: 'pointer', fontFamily: 'Inter, sans-serif', transition: 'background 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = '#0f9b8e'}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = '#2dd4bf'}
            >
              Chat
            </button>
          </div>
        </div>
      </div>

      {/* Image */}
      <div style={{ width: '100%', height: '180px', overflow: 'hidden', borderRadius: '24px' }}>
        <img src={listing.image} alt={listing.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>
    </article>
  )
}

export default function CommunityServicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = React.use(params)
  const [activeTab, setActiveTab] = useState(0)
  const [activeSeller, setActiveSeller] = useState(0)
  const [activeSubNav, setActiveSubNav] = useState('Community')

  return (
    <div style={{ fontFamily: 'Inter, system-ui, sans-serif', backgroundColor: '#f4fbf8', minHeight: '100vh' }}>

      {/* HEADER */}
      <header style={{ position: 'sticky', top: 0, zIndex: 50, backgroundColor: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '16px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
            <Link href={`/${locale}`} style={{ textDecoration: 'none' }}>
              <span style={{ fontSize: '22px', fontWeight: 800, color: '#1a202c', letterSpacing: '-0.02em' }}>SouKni</span>
            </Link>
            <nav style={{ display: 'flex', gap: '24px' }}>
              {subNav.map((item) => (
                <a key={item} href="#" onClick={() => setActiveSubNav(item)} style={{ fontSize: '14px', fontWeight: 500, color: activeSubNav === item ? '#2dd4bf' : '#64748b', textDecoration: activeSubNav === item ? 'underline' : 'none', textUnderlineOffset: '4px', transition: 'color 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#2dd4bf'}
                  onMouseLeave={e => e.currentTarget.style.color = activeSubNav === item ? '#2dd4bf' : '#64748b'}
                >{item}</a>
              ))}
            </nav>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div style={{ display: 'flex', gap: '16px', color: '#64748b' }}>
              <button style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '20px' }}>🔔</button>
              <button style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '20px' }}>♡</button>
            </div>
            <a href="#" style={{ fontSize: '14px', fontWeight: 600, color: '#1e293b', textDecoration: 'none' }}>Log in or sign up</a>
            <button style={{ backgroundColor: '#1a202c', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '8px', fontSize: '13px', fontWeight: 700, cursor: 'pointer', transition: 'background 0.2s', fontFamily: 'Inter, sans-serif' }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = '#2dd4bf'}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = '#1a202c'}
            >Place Your FREE Ad</button>
          </div>
        </div>
      </header>

      <main style={{ maxWidth: '1280px', margin: '0 auto', padding: '32px 24px' }}>

        {/* BREADCRUMBS */}
        <nav style={{ display: 'flex', gap: '8px', fontSize: '13px', color: '#94a3b8', marginBottom: '24px', alignItems: 'center' }}>
          <a href={`/${locale}`} style={{ color: '#94a3b8', textDecoration: 'none' }}
            onMouseEnter={e => e.currentTarget.style.color = '#2dd4bf'}
            onMouseLeave={e => e.currentTarget.style.color = '#94a3b8'}
          >Rabat</a>
          <span>›</span>
          <a href="#" style={{ color: '#94a3b8', textDecoration: 'none' }}
            onMouseEnter={e => e.currentTarget.style.color = '#2dd4bf'}
            onMouseLeave={e => e.currentTarget.style.color = '#94a3b8'}
          >Community</a>
          <span>›</span>
          <span style={{ color: '#475569', fontWeight: 600 }}>Movers & Removals</span>
        </nav>

        {/* FILTER BAR */}
        <section style={{ backgroundColor: 'white', borderRadius: '16px', border: '1px solid #f1f5f9', marginBottom: '32px', overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', borderTop: '1px solid #f1f5f9' }}>
            {[
              { label: 'City', type: 'select', options: ['Rabat', 'Casablanca', 'Marrakech'] },
              { label: 'Keyword', type: 'input', placeholder: 'Search community...' },
              { label: 'Neighborhood', type: 'input', placeholder: 'Enter location' },
              { label: 'Ads Posted', type: 'select', options: ['Anytime', 'Last 24 Hours', 'Last 7 Days'] },
              { label: 'Filters', type: 'static', value: '1 filter selected' },
            ].map((field, i) => (
              <div key={i} style={{ padding: '16px', borderRight: i < 4 ? '1px solid #f1f5f9' : 'none' }}>
                <label style={{ display: 'block', fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#94a3b8', marginBottom: '4px' }}>{field.label}</label>
                {field.type === 'select' ? (
                  <select style={{ border: 'none', padding: 0, fontSize: '14px', fontWeight: 500, color: '#1e293b', width: '100%', outline: 'none', backgroundColor: 'transparent', fontFamily: 'Inter, sans-serif' }}>
                    {field.options?.map(opt => <option key={opt}>{opt}</option>)}
                  </select>
                ) : field.type === 'input' ? (
                  <input type="text" placeholder={field.placeholder} style={{ border: 'none', padding: 0, fontSize: '14px', fontWeight: 500, color: '#1e293b', width: '100%', outline: 'none', backgroundColor: 'transparent', fontFamily: 'Inter, sans-serif' }} />
                ) : (
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}>
                    <span style={{ fontSize: '14px', fontWeight: 500, color: '#1e293b' }}>{field.value}</span>
                    <span style={{ color: '#94a3b8' }}>▾</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* TITLE + SORT */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
          <h2 style={{ fontSize: '28px', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em' }}>
            House Shifting Services and Movers & Removals{' '}
            <span style={{ fontSize: '20px', fontWeight: 400, color: '#94a3b8', marginLeft: '8px' }}>5,827 Ads</span>
          </h2>
          <div style={{ display: 'flex', gap: '12px' }}>
            {['⇅ Sort: Default', '🔖 Save Search'].map(btn => (
              <button key={btn} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '13px', fontWeight: 600, cursor: 'pointer', color: '#1e293b', fontFamily: 'Inter, sans-serif', transition: 'border-color 0.15s' }}
                onMouseEnter={e => e.currentTarget.style.borderColor = '#2dd4bf'}
                onMouseLeave={e => e.currentTarget.style.borderColor = '#e2e8f0'}
              >{btn}</button>
            ))}
          </div>
        </div>

        {/* CATEGORY TABS */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '32px', flexWrap: 'wrap' }}>
          {categoryTabs.map((tab, i) => (
            <button key={i} onClick={() => setActiveTab(i)} style={{ padding: '10px 20px', borderRadius: '100px', fontSize: '14px', fontWeight: i === activeTab ? 700 : 500, border: i === activeTab ? '1px solid #2dd4bf' : '1px solid #e2e8f0', backgroundColor: 'white', color: i === activeTab ? '#2dd4bf' : '#64748b', cursor: 'pointer', transition: 'all 0.15s', fontFamily: 'Inter, sans-serif' }}>
              {tab.label} ({tab.count.toLocaleString()})
            </button>
          ))}
        </div>

        {/* SELLER FILTERS */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '32px' }}>
          {sellerFilters.map((filter, i) => (
            <button key={i} onClick={() => setActiveSeller(i)} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 20px', borderRadius: '8px', fontSize: '13px', fontWeight: 700, border: i === activeSeller ? 'none' : '1px solid #e2e8f0', backgroundColor: i === activeSeller ? '#eff6ff' : 'white', color: i === activeSeller ? '#2563eb' : '#64748b', cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>
              {filter.icon} {filter.label}
            </button>
          ))}
        </div>

        {/* LISTINGS */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

          {/* Featured cards */}
          {featuredListings.map(listing => <FeaturedCard key={listing.id} listing={listing} />)}

          {/* IMMO PRO BANNER */}
          <section style={{ position: 'relative', borderRadius: '40px', height: '320px', overflow: 'hidden', cursor: 'pointer', margin: '8px 0' }}>
            <img src="https://images.pexels.com/photos/2581922/pexels-photo-2581922.jpeg?auto=compress&w=1400" alt="SouKni Immo Pro" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(26,32,44,0.85), rgba(26,32,44,0.4), transparent)' }} />
            <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '48px', maxWidth: '600px' }}>
              <span style={{ color: '#2dd4bf', fontWeight: 700, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '12px' }}>SouKni Immo Pro</span>
              <h2 style={{ fontSize: '34px', fontWeight: 800, color: 'white', marginBottom: '16px', lineHeight: 1.2, letterSpacing: '-0.02em' }}>Elevate Your Lifestyle in Morocco's Finest Riads</h2>
              <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '16px', marginBottom: '32px', lineHeight: 1.6 }}>Exclusive access to premium properties and luxury living spaces across the Kingdom.</p>
              <button style={{ backgroundColor: '#2dd4bf', color: '#1a202c', border: 'none', padding: '14px 32px', borderRadius: '12px', fontWeight: 700, fontSize: '14px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '8px', alignSelf: 'flex-start', fontFamily: 'Inter, sans-serif', transition: 'background 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = 'white'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = '#2dd4bf'}
              >
                Discover Luxury Living →
              </button>
            </div>
          </section>

          {/* Grid cards */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            {gridListings.map(listing => <GridCard key={listing.id} listing={listing} />)}
          </div>

        </div>
        {/* PAGINATION */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", margin: "48px 0 32px" }}>
          <button style={{ width: "40px", height: "40px", borderRadius: "50%", border: "1px solid #e2e8f0", backgroundColor: "transparent", cursor: "pointer", fontSize: "16px", fontFamily: "Inter, sans-serif" }}>‹‹</button>
          <button style={{ width: "40px", height: "40px", borderRadius: "50%", border: "1px solid #e2e8f0", backgroundColor: "transparent", cursor: "pointer", fontSize: "16px", fontFamily: "Inter, sans-serif" }}>‹</button>
          {[1,2,3,4,5].map(p => (
            <button key={p} style={{ width: "40px", height: "40px", borderRadius: "50%", border: p === 1 ? "none" : "1px solid #e2e8f0", backgroundColor: p === 1 ? "#2dd4bf" : "transparent", color: p === 1 ? "white" : "#1e293b", fontWeight: p === 1 ? 700 : 400, cursor: "pointer", fontSize: "13px", fontFamily: "Inter, sans-serif" }}>{p}</button>
          ))}
          <span style={{ margin: "0 4px", opacity: 0.4 }}>...</span>
          <button style={{ width: "40px", height: "40px", borderRadius: "50%", border: "1px solid #e2e8f0", backgroundColor: "transparent", cursor: "pointer", fontSize: "13px", fontFamily: "Inter, sans-serif" }}>48</button>
          <button style={{ width: "40px", height: "40px", borderRadius: "50%", border: "1px solid #e2e8f0", backgroundColor: "transparent", cursor: "pointer", fontSize: "16px", fontFamily: "Inter, sans-serif" }}>›</button>
          <button style={{ width: "40px", height: "40px", borderRadius: "50%", border: "1px solid #e2e8f0", backgroundColor: "transparent", cursor: "pointer", fontSize: "16px", fontFamily: "Inter, sans-serif" }}>››</button>
        </div>
      </main>

      {/* FOOTER */}
      <footer style={{ backgroundColor: '#1a202c', color: '#94a3b8', padding: '64px 24px 32px', marginTop: '80px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1fr', gap: '48px', marginBottom: '64px' }}>
            <div>
              <h3 style={{ color: 'white', fontSize: '20px', fontWeight: 800, marginBottom: '24px', letterSpacing: '-0.02em' }}>SouKni</h3>
              <p style={{ fontSize: '13px', lineHeight: 1.7, marginBottom: '24px' }}>SouKni is Morocco's leading classifieds platform. Connecting buyers and sellers Everyday.</p>
              <div style={{ display: 'flex', gap: '12px' }}>
                {['📘', '📸'].map((icon, i) => (
                  <a key={i} href="#" style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#2d3748', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', fontSize: '18px', transition: 'background 0.2s' }}
                    onMouseEnter={e => e.currentTarget.style.backgroundColor = '#2dd4bf'}
                    onMouseLeave={e => e.currentTarget.style.backgroundColor = '#2d3748'}
                  >{icon}</a>
                ))}
              </div>
            </div>
            {[
              { title: 'Company', links: ['About Us', 'Advertising', 'Careers', 'Legal Hub'] },
              { title: 'Cities', links: ['Rabat', 'Casa Blanca', 'Tangier', 'Marakesh'] },
              { title: 'Support', links: ['Help Center', 'Contact Us', 'Safety Tips'] },
            ].map(col => (
              <div key={col.title}>
                <h4 style={{ color: 'white', fontWeight: 700, marginBottom: '24px', fontSize: '14px', letterSpacing: '0.05em' }}>{col.title}</h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {col.links.map(link => (
                    <li key={link} style={{ marginBottom: '16px' }}>
                      <a href="#" style={{ fontSize: '13px', color: '#94a3b8', textDecoration: 'none', transition: 'color 0.15s' }}
                        onMouseEnter={e => e.currentTarget.style.color = '#2dd4bf'}
                        onMouseLeave={e => e.currentTarget.style.color = '#94a3b8'}
                      >{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div style={{ borderTop: '1px solid #2d3748', paddingTop: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
            <p style={{ fontSize: '12px' }}>© SouKni.com 2026, All Rights Reserved.</p>
            <div style={{ display: 'flex', gap: '24px' }}>
              {['Privacy Policy', 'Terms of Use', 'Cookie Policy'].map(link => (
                <a key={link} href="#" style={{ fontSize: '12px', color: '#94a3b8', textDecoration: 'none', transition: 'color 0.15s' }}
                  onMouseEnter={e => e.currentTarget.style.color = 'white'}
                  onMouseLeave={e => e.currentTarget.style.color = '#94a3b8'}
                >{link}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
