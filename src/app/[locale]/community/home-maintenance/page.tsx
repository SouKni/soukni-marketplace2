'use client'

import React, { useState } from 'react'
import Link from 'next/link'

const categoryChips = [
  { label: 'Renovations & General Contracting', count: 577 },
  { label: 'Interior Design & Architects', count: 573 },
  { label: 'Painters', count: 567 },
  { label: 'Carpenters', count: 531 },
]

const listings = [
  {
    id: '1',
    title: 'Professional AC Repair & Maintenance | Fast 24/7 Service',
    subtitle: 'Home Maintenance • AC Maintenance & Repair',
    price: '250 MAD',
    badges: [{ label: 'Featured', color: '#001D3D', text: 'white' }, { label: '✓ Verified Business', color: '#2dd4bf', text: '#00574d' }],
    attributes: [
      { label: 'Provider', value: 'Licensed Pro' },
      { label: 'Emergency', value: '24/7 Available' },
      { label: 'Services', value: 'Gas Refill, Coil' },
      { label: 'Unit Type', value: 'Split, Central' },
    ],
    location: 'Maarif, Casablanca',
    time: '2 hours ago',
    image: 'https://images.pexels.com/photos/4246120/pexels-photo-4246120.jpeg?auto=compress&w=600',
  },
  {
    id: '2',
    title: 'Luxury Interior Painting & Decorative Plaster Services',
    subtitle: 'Home Maintenance • Painters & Decorators',
    price: '45 MAD/m²',
    badges: [{ label: 'Featured', color: '#001D3D', text: 'white' }, { label: '✓ Verified Business', color: '#2dd4bf', text: '#00574d' }],
    attributes: [
      { label: 'Work Type', value: 'Interior/Exterior' },
      { label: 'Experience', value: '15+ Years' },
      { label: 'Quality', value: 'Premium Finish' },
      { label: 'Timeline', value: 'On-time Guarantee' },
    ],
    location: 'Hivernage, Marrakech',
    time: '5 hours ago',
    image: 'https://images.pexels.com/photos/1669754/pexels-photo-1669754.jpeg?auto=compress&w=600',
  },
  {
    id: '3',
    title: 'Master Plumbing & Leak Detection Specialist',
    subtitle: 'Home Maintenance • Plumbing & Sanitations',
    price: '300 MAD',
    badges: [{ label: '✓ Verified Business', color: '#2dd4bf', text: '#00574d' }],
    attributes: [
      { label: 'Specialty', value: 'Leak Detection' },
      { label: 'Availability', value: 'Immediate Response' },
      { label: 'Equipment', value: 'Digital Tools' },
      { label: 'Warranty', value: '6 Months Labor' },
    ],
    location: 'Agdal, Rabat',
    time: 'Yesterday',
    image: 'https://images.pexels.com/photos/6306077/pexels-photo-6306077.jpeg?auto=compress&w=600',
  },
]

const subNav = ['Real Estate', 'Vehicles', 'Jobs', 'Services']

function ListingCard({ listing }: { listing: typeof listings[0] }) {
  const [liked, setLiked] = useState(false)
  const [hovered, setHovered] = useState(false)

  return (
    <article
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        backgroundColor: 'white',
        borderRadius: '32px',
        overflow: 'hidden',
        border: '1px solid #dde4e1',
        display: 'flex',
        flexDirection: 'row',
        fontFamily: 'Inter, sans-serif',
        boxShadow: hovered ? '0 20px 60px rgba(0,107,95,0.08)' : '0 1px 4px rgba(0,0,0,0.04)',
        transition: 'all 0.3s',
      }}
    >
      {/* Image */}
      <div style={{ width: '33%', position: 'relative', minHeight: '280px', overflow: 'hidden', flexShrink: 0 }}>
        <img
          src={listing.image}
          alt={listing.title}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.7s', transform: hovered ? 'scale(1.08)' : 'scale(1)' }}
        />
        {/* Badges */}
        <div style={{ position: 'absolute', top: '16px', left: '16px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {listing.badges.map((badge, i) => (
            <span key={i} style={{ backgroundColor: badge.color, color: badge.text, fontSize: '10px', fontWeight: 900, padding: '4px 10px', borderRadius: '100px', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              {badge.label}
            </span>
          ))}
        </div>
        {/* Heart */}
        <button
          onClick={() => setLiked(!liked)}
          style={{ position: 'absolute', top: '16px', right: '16px', width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'rgba(244,251,248,0.75)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: '18px', transition: 'background 0.2s' }}
          onMouseEnter={e => e.currentTarget.style.backgroundColor = 'white'}
          onMouseLeave={e => e.currentTarget.style.backgroundColor = 'rgba(244,251,248,0.75)'}
        >
          <span style={{ color: liked ? '#ef4444' : '#006b5f' }}>{liked ? '♥' : '♡'}</span>
        </button>
      </div>

      {/* Content */}
      <div style={{ flex: 1, padding: '32px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          {/* Title + Price */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px', gap: '16px' }}>
            <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#161d1b', lineHeight: 1.3, cursor: 'pointer', transition: 'color 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.color = '#006b5f'}
              onMouseLeave={e => e.currentTarget.style.color = '#161d1b'}
            >{listing.title}</h3>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', color: '#006b5f', flexShrink: 0 }}>
              <span style={{ fontSize: '11px', fontWeight: 700 }}>FROM</span>
              <span style={{ fontSize: '24px', fontWeight: 800, letterSpacing: '-0.02em' }}>{listing.price}</span>
            </div>
          </div>

          <p style={{ fontSize: '13px', color: '#6b7a76', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            {listing.subtitle}
          </p>

          {/* Attribute grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '32px' }}>
            {listing.attributes.map((attr, i) => (
              <div key={i} style={{ backgroundColor: '#eef5f2', padding: '12px', borderRadius: '12px', border: '1px solid #bacac5' }}>
                <span style={{ display: 'block', fontSize: '10px', color: '#6b7a76', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.08em', marginBottom: '4px' }}>{attr.label}</span>
                <span style={{ fontSize: '13px', fontWeight: 700, color: '#161d1b' }}>{attr.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '24px', borderTop: '1px solid #dde4e1' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#6b7a76', fontSize: '13px' }}>
            <span style={{ color: '#bacac5', fontSize: '16px' }}>📍</span>
            {listing.location} • {listing.time}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button style={{ backgroundColor: '#dde4e1', color: '#161d1b', border: 'none', padding: '10px 22px', borderRadius: '100px', fontWeight: 700, fontSize: '13px', cursor: 'pointer', fontFamily: 'Inter, sans-serif', transition: 'background 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = '#bacac5'}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = '#dde4e1'}
            >View Profile</button>
            <button style={{ backgroundColor: '#006b5f', color: 'white', border: 'none', padding: '10px 28px', borderRadius: '100px', fontWeight: 700, fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontFamily: 'Inter, sans-serif', boxShadow: '0 4px 14px rgba(0,107,95,0.3)', transition: 'all 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.04)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)' }}
            >💬 Chat Now</button>
          </div>
        </div>
      </div>
    </article>
  )
}

export default function HomeMaintenancePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = React.use(params)
  const [currentPage, setCurrentPage] = useState(1)
  const [activeChip, setActiveChip] = useState('All Sellers')
  const [showMore, setShowMore] = useState(false)

  return (
    <div style={{ fontFamily: 'Inter, system-ui, sans-serif', backgroundColor: '#f4fbf8', minHeight: '100vh' }}>

      {/* HEADER */}
      <header style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, backgroundColor: 'rgba(244,251,248,0.75)', backdropFilter: 'blur(16px)', borderBottom: '1px solid #dde4e1', height: '72px', display: 'flex', alignItems: 'center' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Link href={`/${locale}`} style={{ textDecoration: 'none' }}>
                <span style={{ fontSize: '18px', fontWeight: 800, color: '#006b5f', letterSpacing: '-0.02em' }}>Marketplace</span>
              </Link>
              <button style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '13px', color: '#3c4a46', background: 'none', border: 'none', cursor: 'pointer' }}>
                Morocco ▾
              </button>
            </div>
            <nav style={{ display: 'flex', gap: '24px' }}>
              {subNav.map((item) => (
                <a key={item} href="#" style={{ fontSize: '14px', fontWeight: 600, color: item === 'Services' ? '#006b5f' : '#3c4a46', textDecoration: item === 'Services' ? 'underline' : 'none', textUnderlineOffset: '4px', transition: 'color 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#006b5f'}
                  onMouseLeave={e => e.currentTarget.style.color = item === 'Services' ? '#006b5f' : '#3c4a46'}
                >{item}</a>
              ))}
            </nav>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <div style={{ display: 'flex', gap: '16px', color: '#3c4a46', fontSize: '20px' }}>
              <span style={{ cursor: 'pointer' }}>🔔</span>
              <span style={{ cursor: 'pointer' }}>♡</span>
              <span style={{ cursor: 'pointer' }}>💬</span>
            </div>
            <div style={{ width: '1px', height: '32px', backgroundColor: '#bacac5' }} />
            <button style={{ fontSize: '14px', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer', color: '#161d1b', transition: 'color 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.color = '#006b5f'}
              onMouseLeave={e => e.currentTarget.style.color = '#161d1b'}
            >Log in or sign up</button>
            <button style={{ backgroundColor: '#006b5f', color: 'white', border: 'none', padding: '10px 24px', borderRadius: '100px', fontWeight: 700, fontSize: '14px', cursor: 'pointer', boxShadow: '0 4px 14px rgba(0,107,95,0.25)', transition: 'transform 0.15s', fontFamily: 'Inter, sans-serif' }}
              onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.02)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
            >Place an Ad</button>
          </div>
        </div>
      </header>

      <main style={{ paddingTop: '96px', paddingBottom: '80px', maxWidth: '1440px', margin: '0 auto', padding: '96px 40px 80px' }}>

        {/* BREADCRUMBS */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '32px', fontSize: '13px', color: '#6b7a76' }}>
          <a href={`/${locale}`} style={{ color: '#6b7a76', textDecoration: 'none' }}
            onMouseEnter={e => e.currentTarget.style.color = '#006b5f'}
            onMouseLeave={e => e.currentTarget.style.color = '#6b7a76'}
          >Home</a>
          <span>›</span>
          <a href="#" style={{ color: '#6b7a76', textDecoration: 'none' }}
            onMouseEnter={e => e.currentTarget.style.color = '#006b5f'}
            onMouseLeave={e => e.currentTarget.style.color = '#6b7a76'}
          >Community</a>
          <span>›</span>
          <span style={{ color: '#161d1b', fontWeight: 700 }}>Home Maintenance</span>
        </nav>

        {/* PAGE HEADER */}
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h1 style={{ fontSize: '40px', fontWeight: 800, color: '#161d1b', letterSpacing: '-0.02em', marginBottom: '8px' }}>Home Maintenance in Morocco</h1>
            <p style={{ color: '#6b7a76', fontSize: '16px' }}>Discover 4,866 verified service professionals</p>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            {['⇅ Sort: Default', '🔖 Save Search'].map(btn => (
              <button key={btn} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', backgroundColor: '#eef5f2', border: '1px solid #bacac5', borderRadius: '12px', fontSize: '13px', fontWeight: 700, cursor: 'pointer', color: '#161d1b', fontFamily: 'Inter, sans-serif', transition: 'all 0.15s' }}
                onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#e8efec'; e.currentTarget.style.borderColor = '#006b5f' }}
                onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#eef5f2'; e.currentTarget.style.borderColor = '#bacac5' }}
              >{btn}</button>
            ))}
          </div>
        </div>

        {/* FILTER BAR */}
        <div style={{ backgroundColor: 'rgba(244,251,248,0.75)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.4)', padding: '16px', borderRadius: '40px', display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '40px', boxShadow: '0 10px 30px -10px rgba(0,107,95,0.08)', flexWrap: 'wrap' }}>
          {[
            { icon: '📍', label: 'City', placeholder: 'Casablanca (New)' },
            { icon: '🔍', label: 'Keyword', placeholder: 'What are you looking for?' },
            { icon: '🏠', label: 'Neighborhood', placeholder: 'Enter location' },
          ].map((field, i) => (
            <div key={i} style={{ flex: i === 1 ? 2 : 1, minWidth: '180px', backgroundColor: 'white', borderRadius: '100px', padding: '12px 20px', border: '1px solid #bacac5', display: 'flex', alignItems: 'center', gap: '10px', transition: 'border-color 0.2s' }}
              onFocus={() => {}}
            >
              <span style={{ fontSize: '18px', color: '#006b5f' }}>{field.icon}</span>
              <div style={{ flex: 1 }}>
                <span style={{ display: 'block', fontSize: '10px', fontWeight: 700, color: '#6b7a76', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{field.label}</span>
                <input
                  type="text"
                  placeholder={field.placeholder}
                  style={{ border: 'none', padding: 0, fontSize: '14px', fontWeight: 700, color: '#161d1b', width: '100%', outline: 'none', backgroundColor: 'transparent', fontFamily: 'Inter, sans-serif' }}
                />
              </div>
            </div>
          ))}
          <button style={{ backgroundColor: '#006b5f', color: 'white', border: 'none', width: '56px', height: '56px', borderRadius: '50%', fontSize: '20px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: '0 4px 14px rgba(0,107,95,0.3)', transition: 'transform 0.15s' }}
            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
          >🔍</button>
        </div>

        {/* CATEGORY CHIPS */}
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '10px', marginBottom: '48px' }}>
          {['All Sellers', 'Individuals', '✅ Businesses'].map((chip) => (
            <button key={chip} onClick={() => setActiveChip(chip)} style={{ padding: '10px 22px', borderRadius: '100px', fontWeight: 700, fontSize: '14px', border: 'none', cursor: 'pointer', fontFamily: 'Inter, sans-serif', backgroundColor: activeChip === chip ? '#006b5f' : '#e2eae7', color: activeChip === chip ? 'white' : '#3c4a46', transition: 'all 0.15s', boxShadow: activeChip === chip ? '0 4px 12px rgba(0,107,95,0.2)' : 'none' }}>
              {chip}
            </button>
          ))}
          <div style={{ width: '1px', height: '32px', backgroundColor: '#bacac5', margin: '0 4px' }} />
          {categoryChips.map((chip) => (
            <button key={chip.label} style={{ padding: '10px 20px', borderRadius: '100px', fontSize: '13px', border: '1px solid #bacac5', backgroundColor: '#eef5f2', color: '#3c4a46', cursor: 'pointer', fontFamily: 'Inter, sans-serif', transition: 'all 0.15s', fontWeight: 500 }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#006b5f'; e.currentTarget.style.color = '#006b5f' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = '#bacac5'; e.currentTarget.style.color = '#3c4a46' }}
            >{chip.label} ({chip.count})</button>
          ))}
          <button onClick={() => setShowMore(!showMore)} style={{ padding: '10px 20px', borderRadius: '100px', fontSize: '13px', border: 'none', backgroundColor: 'transparent', color: '#006b5f', cursor: 'pointer', fontFamily: 'Inter, sans-serif', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
            {showMore ? 'View Less −' : 'View More +'}
          </button>
        </div>

        {/* LISTINGS */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginBottom: '64px' }}>

          {listings.slice(0, 2).map(listing => <ListingCard key={listing.id} listing={listing} />)}

          {/* IMMO PRO BANNER */}
          <div style={{ position: 'relative', width: '100%', height: '300px', borderRadius: '48px', overflow: 'hidden', marginBottom: '16px', boxShadow: '0 20px 60px rgba(0,0,0,0.12)' }}>
            <img src="https://images.pexels.com/photos/2581922/pexels-photo-2581922.jpeg?auto=compress&w=1400" alt="SouKni Immo Pro" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(0,0,0,0.82), rgba(0,0,0,0.4), transparent)' }} />
            <div style={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '48px', maxWidth: '600px' }}>
              <span style={{ color: '#62fae3', fontWeight: 900, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.25em', marginBottom: '16px', display: 'block' }}>ADVERTISEMENT</span>
              <h2 style={{ fontSize: '38px', fontWeight: 800, color: 'white', marginBottom: '16px', lineHeight: 1.15, letterSpacing: '-0.02em' }}>SouKni Immo Pro</h2>
              <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '16px', marginBottom: '32px', lineHeight: 1.6 }}>Exclusive luxury real estate management and expert maintenance for elite Moroccan properties.</p>
              <button style={{ backgroundColor: '#62fae3', color: '#00201c', border: 'none', padding: '14px 36px', borderRadius: '100px', fontWeight: 700, fontSize: '14px', cursor: 'pointer', display: 'inline-block', alignSelf: 'flex-start', transition: 'transform 0.15s', fontFamily: 'Inter, sans-serif' }}
                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.04)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
              >Explore Portfolio</button>
            </div>
          </div>

          {listings.slice(2).map(listing => <ListingCard key={listing.id} listing={listing} />)}

        </div>

        {/* PAGINATION */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
          <button style={{ width: '48px', height: '48px', borderRadius: '12px', border: '1px solid #bacac5', backgroundColor: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', transition: 'background 0.15s' }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#eef5f2'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
          >‹</button>
          {[1, 2, 3].map(p => (
            <button key={p} onClick={() => setCurrentPage(p)} style={{ width: '48px', height: '48px', borderRadius: '12px', border: currentPage === p ? 'none' : '1px solid #bacac5', backgroundColor: currentPage === p ? '#006b5f' : 'transparent', color: currentPage === p ? 'white' : '#161d1b', fontWeight: 700, cursor: 'pointer', fontSize: '14px', fontFamily: 'Inter, sans-serif', boxShadow: currentPage === p ? '0 4px 14px rgba(0,107,95,0.3)' : 'none', transition: 'all 0.15s' }}>{p}</button>
          ))}
          <span style={{ padding: '0 8px', color: '#bacac5' }}>...</span>
          <button style={{ width: '48px', height: '48px', borderRadius: '12px', border: '1px solid #bacac5', backgroundColor: 'transparent', cursor: 'pointer', fontSize: '14px', fontWeight: 700, fontFamily: 'Inter, sans-serif', transition: 'background 0.15s' }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#eef5f2'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
          >122</button>
          <button style={{ width: '48px', height: '48px', borderRadius: '12px', border: '1px solid #bacac5', backgroundColor: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', transition: 'background 0.15s' }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#eef5f2'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
          >›</button>
        </div>

      </main>

      {/* FOOTER */}
      <footer style={{ backgroundColor: '#dde4e1', borderTop: '1px solid #bacac5', paddingTop: '64px', paddingBottom: '48px' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 40px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1fr', gap: '40px', marginBottom: '48px' }}>
            <div>
              <h4 style={{ fontSize: '18px', fontWeight: 900, color: '#161d1b', marginBottom: '20px' }}>Marketplace</h4>
              <p style={{ fontSize: '14px', color: '#3c4a46', lineHeight: 1.7, maxWidth: '240px' }}>The most trusted professional services platform in Morocco. Connect with experts for all your home needs.</p>
            </div>
            {[
              { title: 'About Us', links: ['Our Story', 'Help & Support', 'Careers', 'Sitemap'] },
              { title: 'Legal', links: ['Terms of Service', 'Privacy Policy', 'Cookie Policy'] },
              { title: 'Connect', links: ['Facebook', 'Instagram', 'LinkedIn'] },
            ].map(col => (
              <div key={col.title}>
                <h5 style={{ fontSize: '11px', fontWeight: 700, color: '#7A7A7A', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '20px' }}>{col.title}</h5>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {col.links.map(link => (
                    <li key={link} style={{ marginBottom: '14px' }}>
                      <a href="#" style={{ fontSize: '14px', color: '#3c4a46', textDecoration: 'none', transition: 'color 0.15s' }}
                        onMouseEnter={e => e.currentTarget.style.color = '#161d1b'}
                        onMouseLeave={e => e.currentTarget.style.color = '#3c4a46'}
                      >{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div style={{ borderTop: '1px solid #bacac5', paddingTop: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
            <p style={{ fontSize: '13px', color: '#6b7a76' }}>© 2026 Marketplace Inc. All rights reserved.</p>
            <div style={{ display: 'flex', gap: '24px' }}>
              <span style={{ fontSize: '13px', color: '#7A7A7A' }}>Language: Français</span>
              <span style={{ fontSize: '13px', color: '#7A7A7A' }}>Currency: MAD</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
