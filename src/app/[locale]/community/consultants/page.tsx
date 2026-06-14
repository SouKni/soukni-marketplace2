'use client'

import React, { useState } from 'react'
import Link from 'next/link'

const specializationPills = [
  { label: 'All Specialties', active: true },
  { label: 'Visa Services', count: '1.2k' },
  { label: 'Loan & Financial Services', count: '840' },
  { label: 'Legal Advisors', count: '420' },
  { label: 'Translation', count: '310' },
  { label: 'Business Services', count: '215' },
  { label: 'Real Estate', count: '560' },
]

const featuredListings = [
  {
    id: '1', category: 'Business', title: 'Premium Strategic Business Consulting',
    price: '800 MAD', priceUnit: '/ hr',
    badges: [{ label: 'FEATURED', bg: '#8d4f00', color: 'white' }, { label: 'VERIFIED', bg: '#006b5f', color: 'white' }],
    tags: ['Online & In-person', '10+ Years Exp.'],
    image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&w=600',
  },
  {
    id: '2', category: 'Visa Consultancy', title: 'Global Visa & Immigration Firm',
    price: '1200 MAD', priceUnit: '/ service',
    badges: [{ label: 'VERIFIED', bg: '#006b5f', color: 'white' }],
    tags: ['Online', 'Expert Level'],
    image: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&w=600',
  },
  {
    id: '3', category: 'Financial', title: 'Corporate Financial Audit Group',
    price: '2500 MAD', priceUnit: '/ audit',
    badges: [],
    tags: ['15+ Years Exp.', 'Firm'],
    image: 'https://images.pexels.com/photos/6863183/pexels-photo-6863183.jpeg?auto=compress&w=600',
  },
  {
    id: '4', category: 'Translation', title: 'Multilingual Certified Translation',
    price: '150 MAD', priceUnit: '/ page',
    badges: [{ label: 'VERIFIED', bg: '#006b5f', color: 'white' }],
    tags: ['Quick Delivery', 'Certified'],
    image: 'https://images.pexels.com/photos/4050315/pexels-photo-4050315.jpeg?auto=compress&w=600',
  },
]

const gridListings1 = [
  { id: '5', category: 'Legal', title: 'Expert Legal Advisory', sub: 'Casablanca • 12+ Years Exp.', price: '1000 MAD / hr', image: 'https://images.pexels.com/photos/5668858/pexels-photo-5668858.jpeg?auto=compress&w=400' },
  { id: '6', category: 'HR', title: 'Corporate HR Strategy', sub: 'Workshop Style • Online', price: '3500 MAD / session', image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&w=400' },
  { id: '7', category: 'Technology', title: 'IT & Tech Solutions Firm', sub: 'Software Audit • Professional', price: '5000 MAD / project', image: 'https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&w=400' },
  { id: '8', category: 'Real Estate', title: 'Premium Investment Consulting', sub: 'Luxury Market • Expert', price: '2000 MAD / hr', image: 'https://images.pexels.com/photos/1546168/pexels-photo-1546168.jpeg?auto=compress&w=400' },
]

const gridListings2 = [
  { id: '9', category: 'Business', title: 'Elite Business Consulting', sub: 'Strategy & Growth • 15+ Years', price: '4500 MAD / day', image: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&w=400' },
  { id: '10', category: 'Technology', title: 'Digital Transformation Expert', sub: 'Tech Integration • AI Specialist', price: '1200 MAD / hr', image: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&w=400' },
  { id: '11', category: 'Financial', title: 'Financial Risk Management', sub: 'Certified • Global Standards', price: '2800 MAD / audit', emoji: '🏦' },
  { id: '12', category: 'Logistics', title: 'Logistics & Supply Chain Pro', sub: 'Efficiency Expert • Casablanca', price: '1500 MAD / hr', emoji: '🚚' },
]

const gridListings3 = [
  { id: '13', category: 'Marketing', title: 'Marketing & Growth Agency', sub: 'Full Service • Verified', price: '6000 MAD / month', emoji: '📢' },
  { id: '14', category: 'Architecture', title: 'Architecture & Design Lead', sub: 'High-End Projects • Rabat', price: '3000 MAD / consult', emoji: '🏗️' },
  { id: '15', category: 'Technology', title: 'Cyber Security Consultant', sub: 'System Hardening • Expert Level', price: '2500 MAD / hr', emoji: '🔒' },
  { id: '16', category: 'HR', title: 'HR Recruitment Specialist', sub: 'Professional • Fast Delivery', price: '800 MAD / candidate', emoji: '🔍' },
]

const macroNav = ['Motors', 'Property', 'Jobs', 'Electronics', 'Community']

function FeaturedCard({ listing }: { listing: typeof featuredListings[0] }) {
  const [liked, setLiked] = useState(false)
  const [hovered, setHovered] = useState(false)

  return (
    <article
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        backgroundColor: 'white', borderRadius: '40px', overflow: 'hidden',
        border: '1px solid rgba(186,202,197,0.2)',
        boxShadow: hovered ? '0 20px 40px rgba(0,107,95,0.08)' : '0 2px 8px rgba(0,0,0,0.04)',
        transition: 'all 0.3s', display: 'flex', flexDirection: 'column',
        fontFamily: 'Inter, sans-serif',
      }}
    >
      <div style={{ position: 'relative', height: '256px', overflow: 'hidden' }}>
        <img src={listing.image} alt={listing.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s', transform: hovered ? 'scale(1.05)' : 'scale(1)' }}
        />
        <div style={{ position: 'absolute', top: '16px', left: '16px', display: 'flex', gap: '8px' }}>
          {listing.badges.map((b, i) => (
            <span key={i} style={{ backgroundColor: b.bg, color: b.color, fontSize: '12px', fontWeight: 700, padding: '4px 12px', borderRadius: '100px', boxShadow: '0 2px 8px rgba(0,0,0,0.15)', letterSpacing: '0.03em' }}>{b.label}</span>
          ))}
        </div>
        <button onClick={() => setLiked(!liked)}
          style={{ position: 'absolute', top: '16px', right: '16px', padding: '8px', backgroundColor: 'rgba(255,255,255,0.3)', backdropFilter: 'blur(8px)', borderRadius: '50%', border: 'none', cursor: 'pointer', color: liked ? '#ef4444' : 'white', fontSize: '18px', transition: 'color 0.2s' }}
        >{liked ? '♥' : '♡'}</button>
      </div>
      <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
          <span style={{ color: '#006b5f', fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{listing.category}</span>
          <span style={{ fontWeight: 700, fontSize: '20px', color: '#161d1b' }}>{listing.price} <span style={{ fontSize: '14px', fontWeight: 400, color: '#6b7a76' }}>{listing.priceUnit}</span></span>
        </div>
        <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#161d1b', marginBottom: '16px', lineHeight: 1.3, transition: 'color 0.2s', cursor: 'pointer' }}
          onMouseEnter={e => e.currentTarget.style.color = '#006b5f'}
          onMouseLeave={e => e.currentTarget.style.color = '#161d1b'}
        >{listing.title}</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '24px' }}>
          {listing.tags.map((tag, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#3c4a46', fontSize: '13px', fontWeight: 600 }}>
              <span style={{ color: '#006b5f', fontSize: '14px' }}>✓</span> {tag}
            </div>
          ))}
        </div>
        <div style={{ marginTop: 'auto', display: 'flex', gap: '12px' }}>
          <button style={{ flex: 1, backgroundColor: '#006b5f', color: 'white', border: 'none', padding: '12px', borderRadius: '16px', fontWeight: 700, fontSize: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontFamily: 'Inter, sans-serif', transition: 'filter 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.filter = 'brightness(1.1)'}
            onMouseLeave={e => e.currentTarget.style.filter = 'brightness(1)'}
          >💬 Chat</button>
          <button style={{ flex: 1, backgroundColor: 'transparent', color: '#006b5f', border: '2px solid #006b5f', padding: '12px', borderRadius: '16px', fontWeight: 700, fontSize: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontFamily: 'Inter, sans-serif', transition: 'background 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(0,107,95,0.05)'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
          >📱 WHATSAPP</button>
        </div>
      </div>
    </article>
  )
}

function SmallCard({ listing }: { listing: typeof gridListings1[0] }) {
  const [hovered, setHovered] = useState(false)

  return (
    <article
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        backgroundColor: 'white', borderRadius: '32px', overflow: 'hidden',
        border: '1px solid rgba(186,202,197,0.15)',
        boxShadow: hovered ? '0 10px 25px rgba(0,0,0,0.06)' : '0 1px 4px rgba(0,0,0,0.04)',
        transition: 'all 0.3s', display: 'flex', flexDirection: 'column',
        fontFamily: 'Inter, sans-serif',
      }}
    >
      <div style={{ height: '192px', position: 'relative', backgroundColor: '#eef5f2', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        {listing.image ? (
          <img src={listing.image} alt={listing.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s', transform: hovered ? 'scale(1.05)' : 'scale(1)' }} />
        ) : (
          <span style={{ fontSize: '56px', opacity: 0.25, color: '#006b5f' }}>{listing.emoji}</span>
        )}
      </div>
      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <span style={{ color: '#006b5f', fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px', display: 'block' }}>{listing.category}</span>
        <h4 style={{ fontWeight: 700, color: '#161d1b', marginBottom: '6px', lineHeight: 1.3, fontSize: '15px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', minHeight: '40px' }}>{listing.title}</h4>
        <p style={{ color: '#6b7a76', fontSize: '12px', marginBottom: '16px' }}>{listing.sub}</p>
        <div style={{ marginTop: 'auto' }}>
          <p style={{ color: '#006b5f', fontWeight: 700, marginBottom: '16px', fontSize: '14px' }}>{listing.price}</p>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button style={{ flex: 1, padding: '8px', backgroundColor: 'rgba(0,107,95,0.08)', color: '#006b5f', border: 'none', borderRadius: '12px', cursor: 'pointer', fontSize: '18px', transition: 'all 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#006b5f'; e.currentTarget.style.color = 'white' }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'rgba(0,107,95,0.08)'; e.currentTarget.style.color = '#006b5f' }}
            >💬</button>
            <button style={{ flex: 1, padding: '8px', border: '1px solid rgba(0,107,95,0.2)', color: '#006b5f', backgroundColor: 'transparent', borderRadius: '12px', cursor: 'pointer', fontSize: '18px', transition: 'background 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(0,107,95,0.05)'}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
            >📞</button>
          </div>
        </div>
      </div>
    </article>
  )
}

export default function ConsultantsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = React.use(params)
  const [currentPage, setCurrentPage] = useState(1)
  const [activeSpecialty, setActiveSpecialty] = useState('All Specialties')

  return (
    <div style={{ fontFamily: 'Inter, system-ui, sans-serif', backgroundColor: '#f4fbf8', minHeight: '100vh' }}>

      {/* HEADER */}
      <header style={{ backgroundColor: 'rgba(244,251,248,0.8)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(255,255,255,0.4)', boxShadow: '0 1px 4px rgba(0,0,0,0.06)', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 40px', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
            <Link href={`/${locale}`} style={{ textDecoration: 'none' }}>
              <span style={{ fontSize: '32px', fontWeight: 700, color: '#006b5f', letterSpacing: '-0.03em' }}>SouKni</span>
            </Link>
            <nav style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
              {['Consultants', 'Firms'].map((item, i) => (
                <a key={item} href="#" style={{ fontSize: '13px', fontWeight: 600, color: i === 0 ? '#006b5f' : '#3c4a46', textDecoration: 'none', borderBottom: i === 0 ? '2px solid #006b5f' : '2px solid transparent', height: '80px', display: 'flex', alignItems: 'center', transition: 'color 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#006b5f'}
                  onMouseLeave={e => e.currentTarget.style.color = i === 0 ? '#006b5f' : '#3c4a46'}
                >{item}</a>
              ))}
            </nav>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button style={{ backgroundColor: '#006b5f', color: 'white', border: 'none', padding: '10px 24px', borderRadius: '100px', fontSize: '13px', fontWeight: 700, cursor: 'pointer', fontFamily: 'Inter, sans-serif', boxShadow: '0 4px 12px rgba(0,107,95,0.2)', transition: 'all 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.opacity = '0.9'}
              onMouseLeave={e => e.currentTarget.style.opacity = '1'}
            >List your Service For FREE</button>
            <div style={{ display: 'flex', gap: '4px' }}>
              {['🔔', '♡', '👤'].map((icon, i) => (
                <button key={i} style={{ padding: '8px', background: 'none', border: 'none', cursor: 'pointer', borderRadius: '50%', fontSize: '18px', color: '#3c4a46', transition: 'background 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(45,212,191,0.1)'}
                  onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                >{icon}</button>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* MACRO CATEGORY BAR */}
      <div style={{ backgroundColor: '#eef5f2', borderBottom: '1px solid rgba(186,202,197,0.2)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '16px 40px', display: 'flex', gap: '32px', overflowX: 'auto' }}>
          {[{ icon: '🚗', label: 'Motors' }, { icon: '🏠', label: 'Property' }, { icon: '💼', label: 'Jobs' }, { icon: '📱', label: 'Electronics' }, { icon: '👥', label: 'Community' }].map((item) => (
            <a key={item.label} href="#" style={{ whiteSpace: 'nowrap', fontSize: '13px', fontWeight: 600, color: item.label === 'Community' ? '#006b5f' : '#3c4a46', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px', transition: 'color 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.color = '#006b5f'}
              onMouseLeave={e => e.currentTarget.style.color = item.label === 'Community' ? '#006b5f' : '#3c4a46'}
            >{item.icon} {item.label}</a>
          ))}
        </div>
      </div>

      <main style={{ maxWidth: '1280px', margin: '0 auto', padding: '32px 40px' }}>

        {/* BREADCRUMBS */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'rgba(60,74,70,0.6)', marginBottom: '24px' }}>
          <span>Home</span><span>›</span>
          <span>Community</span><span>›</span>
          <span style={{ fontWeight: 700, color: '#161d1b' }}>Consultants</span>
        </nav>

        {/* FILTER BAR */}
        <div style={{ backgroundColor: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(12px)', borderRadius: '100px', border: '1px solid rgba(186,202,197,0.2)', boxShadow: '0 8px 32px rgba(0,107,95,0.05)', marginBottom: '40px', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
          {[
            { label: 'City', type: 'select', options: ['Casablanca', 'Marrakech', 'Rabat', 'Tangier'] },
            { label: 'Keyword', type: 'input', placeholder: 'Search consultants, firms, skills...' },
            { label: 'Neighborhood', type: 'input', placeholder: 'Enter location' },
            { label: 'Ads Posted', type: 'select', options: ['Select', 'Last 24h', 'Last 7 days'] },
            { label: 'Filters', type: 'static', value: '1 filter selected' },
          ].map((field, i) => (
            <div key={i} style={{ flex: i === 1 ? 2 : 1, padding: '16px 24px', borderRight: i < 4 ? '1px solid rgba(186,202,197,0.2)' : 'none' }}>
              <label style={{ display: 'block', fontWeight: 700, color: '#161d1b', fontSize: '13px', marginBottom: '4px' }}>{field.label}</label>
              {field.type === 'select' ? (
                <select style={{ width: '100%', backgroundColor: 'transparent', border: 'none', padding: 0, fontSize: '16px', color: '#161d1b', outline: 'none', fontFamily: 'Inter, sans-serif', cursor: 'pointer' }}>
                  {field.options?.map(opt => <option key={opt}>{opt}</option>)}
                </select>
              ) : field.type === 'input' ? (
                <input type="text" placeholder={field.placeholder} style={{ width: '100%', backgroundColor: 'transparent', border: 'none', padding: 0, fontSize: '16px', outline: 'none', fontFamily: 'Inter, sans-serif' }} />
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
                  <span style={{ fontSize: '16px', color: '#161d1b' }}>{field.value}</span>
                  <span style={{ color: '#161d1b' }}>▾</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* SPECIALIZATION PILLS */}
        <div style={{ display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '16px', marginBottom: '40px' }}>
          {specializationPills.map((pill) => (
            <button key={pill.label} onClick={() => setActiveSpecialty(pill.label)} style={{ height: '48px', padding: '0 24px', borderRadius: '100px', fontSize: '14px', fontWeight: 700, whiteSpace: 'nowrap', cursor: 'pointer', fontFamily: 'Inter, sans-serif', transition: 'all 0.15s', border: pill.label === activeSpecialty ? '2px solid #2dd4bf' : '2px solid rgba(186,202,197,0.3)', backgroundColor: pill.label === activeSpecialty ? '#2dd4bf' : 'white', color: pill.label === activeSpecialty ? '#006b5f' : '#161d1b' }}>
              {pill.label} {pill.count && <span style={{ fontWeight: 400, fontSize: '12px', opacity: 0.6 }}>({pill.count})</span>}
            </button>
          ))}
        </div>

        {/* FEATURED GRID ROW 1 */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '64px' }}>
          {featuredListings.slice(0, 2).map(l => <FeaturedCard key={l.id} listing={l} />)}
        </div>

        {/* BANNER 1 - Electro Pro */}
        <section style={{ position: 'relative', height: '300px', borderRadius: '48px', overflow: 'hidden', marginBottom: '64px', cursor: 'pointer' }}>
          <img src="https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg?auto=compress&w=1400" alt="Electro Pro" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.5)' }} />
          <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '48px' }}>
            <span style={{ fontSize: '13px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.2em', color: 'white', marginBottom: '16px', opacity: 0.8 }}>New Arrivals</span>
            <h2 style={{ fontSize: '36px', fontWeight: 700, color: 'white', lineHeight: 1.2, marginBottom: '24px', letterSpacing: '-0.02em' }}>Mobiles & Electro Pro:<br/>The Future in Your Hands</h2>
            <button style={{ width: 'fit-content', backgroundColor: '#2dd4bf', color: '#00574d', border: 'none', padding: '12px 32px', borderRadius: '100px', fontWeight: 700, fontSize: '14px', cursor: 'pointer', fontFamily: 'Inter, sans-serif', transition: 'filter 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.filter = 'brightness(1.1)'}
              onMouseLeave={e => e.currentTarget.style.filter = 'brightness(1)'}
            >Shop Latest Tech</button>
          </div>
        </section>

        {/* FEATURED GRID ROW 2 */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '64px' }}>
          {featuredListings.slice(2, 4).map(l => <FeaturedCard key={l.id} listing={l} />)}
        </div>

        {/* BANNER 2 - Immo Pro */}
        <section style={{ position: 'relative', height: '450px', borderRadius: '48px', overflow: 'hidden', marginBottom: '64px', cursor: 'pointer', boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }}>
          <img src="https://images.pexels.com/photos/2581922/pexels-photo-2581922.jpeg?auto=compress&w=1400" alt="Immo Pro" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.65), rgba(0,0,0,0.1), transparent)' }} />
          <div style={{ position: 'absolute', bottom: 0, left: 0, padding: '64px' }}>
            <h2 style={{ fontSize: '52px', fontWeight: 700, color: 'white', marginBottom: '16px', letterSpacing: '-0.03em' }}>Elevate Your Lifestyle</h2>
            <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.9)', maxWidth: '520px', marginBottom: '32px', lineHeight: 1.6 }}>Discover premium investment opportunities in Morocco's most exclusive districts.</p>
            <button style={{ backgroundColor: 'white', color: '#161d1b', border: 'none', padding: '16px 40px', borderRadius: '100px', fontWeight: 700, fontSize: '15px', cursor: 'pointer', fontFamily: 'Inter, sans-serif', transition: 'all 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#2dd4bf'; e.currentTarget.style.color = '#00574d' }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'white'; e.currentTarget.style.color = '#161d1b' }}
            >Explore Immo Pro</button>
          </div>
        </section>

        {/* SMALL GRID 1 */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '64px' }}>
          {gridListings1.map(l => <SmallCard key={l.id} listing={l} />)}
        </div>

        {/* SMALL GRID 2 */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '64px' }}>
          {gridListings2.map(l => <SmallCard key={l.id} listing={l} />)}
        </div>

        {/* SMALL GRID 3 */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '64px' }}>
          {gridListings3.map(l => <SmallCard key={l.id} listing={l} />)}
        </div>

        {/* PAGINATION */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', marginBottom: '64px' }}>
          <button style={{ width: '48px', height: '48px', borderRadius: '12px', border: '1px solid rgba(186,202,197,0.3)', backgroundColor: 'transparent', cursor: 'pointer', fontSize: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.15s' }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#2dd4bf20'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
          >‹</button>
          {[1, 2, 3].map(p => (
            <button key={p} onClick={() => setCurrentPage(p)} style={{ width: '48px', height: '48px', borderRadius: '12px', border: currentPage === p ? 'none' : '1px solid rgba(186,202,197,0.3)', backgroundColor: currentPage === p ? '#006b5f' : 'transparent', color: currentPage === p ? 'white' : '#161d1b', fontWeight: 700, fontSize: '14px', cursor: 'pointer', fontFamily: 'Inter, sans-serif', transition: 'all 0.15s', boxShadow: currentPage === p ? '0 4px 12px rgba(0,107,95,0.3)' : 'none' }}>{p}</button>
          ))}
          <span style={{ padding: '0 8px', color: '#6b7a76' }}>...</span>
          <button style={{ width: '48px', height: '48px', borderRadius: '12px', border: '1px solid rgba(186,202,197,0.3)', backgroundColor: 'transparent', cursor: 'pointer', fontSize: '14px', fontWeight: 700, fontFamily: 'Inter, sans-serif' }}>48</button>
          <button style={{ width: '48px', height: '48px', borderRadius: '12px', border: '1px solid rgba(186,202,197,0.3)', backgroundColor: 'transparent', cursor: 'pointer', fontSize: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.15s' }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#2dd4bf20'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
          >›</button>
        </div>

        {/* JOIN FAMILY BANNER */}
        <div style={{ backgroundColor: '#006b5f', borderRadius: '48px', padding: '48px', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', gap: '24px', marginBottom: '0' }}>
          <div style={{ position: 'absolute', right: '-80px', bottom: '-80px', width: '300px', height: '300px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.08)' }} />
          <div style={{ position: 'absolute', top: '0', right: '25%', width: '200px', height: '200px', borderRadius: '50%', backgroundColor: 'rgba(45,212,191,0.15)' }} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <h2 style={{ fontSize: '48px', fontWeight: 700, color: 'white', marginBottom: '16px', letterSpacing: '-0.03em' }}>JOIN THE SOUKNI FAMILY</h2>
            <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.9)', marginBottom: '40px', maxWidth: '640px', lineHeight: 1.6 }}>
              Get the best experience on mobile. Find consultants, firms, and professionals faster with our dedicated app.
            </p>
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              {['🍎 App Store', '▶ Google Play', '🏪 AppGallery'].map(btn => (
                <button key={btn} style={{ backgroundColor: 'rgba(0,0,0,0.3)', color: 'white', border: '1px solid rgba(255,255,255,0.15)', padding: '12px 24px', borderRadius: '12px', fontWeight: 600, fontSize: '14px', cursor: 'pointer', fontFamily: 'Inter, sans-serif', transition: 'background 0.2s', display: 'flex', alignItems: 'center', gap: '8px' }}
                  onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.5)'}
                  onMouseLeave={e => e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.3)'}
                >{btn}</button>
              ))}
            </div>
          </div>
        </div>

      </main>

      {/* FOOTER */}
      <footer style={{ backgroundColor: '#605e58', borderTop: '1px solid rgba(186,202,197,0.2)', paddingTop: '64px', paddingBottom: '48px', marginTop: '64px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 40px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '48px', marginBottom: '64px' }}>
            <div>
              <h3 style={{ color: '#f4fbf8', fontWeight: 900, fontSize: '20px', marginBottom: '24px' }}>SouKni Morocco</h3>
              <p style={{ color: 'rgba(230,226,217,0.8)', fontSize: '15px', lineHeight: 1.7, marginBottom: '24px' }}>The leading marketplace for Elite Professional services and premium goods in the Kingdom.</p>
              <div style={{ display: 'flex', gap: '12px' }}>
                {['📘', '✉️'].map((icon, i) => (
                  <a key={i} href="#" style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', fontSize: '18px', transition: 'background 0.2s' }}
                    onMouseEnter={e => e.currentTarget.style.backgroundColor = '#006b5f'}
                    onMouseLeave={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'}
                  >{icon}</a>
                ))}
              </div>
            </div>
            {[
              { title: 'Company', links: ['About Us', 'Advertising', 'Careers', 'Privacy Policy'] },
              { title: 'Support', links: ['Help Center', 'Contact Us', 'Safety Center', 'Terms of Service'] },
              { title: 'Specializations', links: ['Business & Financial', 'Legal & Compliance', 'IT & Technology', 'Real Estate Consulting'] },
            ].map(col => (
              <div key={col.title}>
                <h4 style={{ color: 'white', fontWeight: 700, marginBottom: '24px', fontSize: '14px' }}>{col.title}</h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {col.links.map(link => (
                    <li key={link} style={{ marginBottom: '16px' }}>
                      <a href="#" style={{ color: 'rgba(230,226,217,0.8)', textDecoration: 'none', fontSize: '15px', transition: 'color 0.15s' }}
                        onMouseEnter={e => e.currentTarget.style.color = 'white'}
                        onMouseLeave={e => e.currentTarget.style.color = 'rgba(230,226,217,0.8)'}
                      >{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
            <p style={{ color: 'rgba(230,226,217,0.6)', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700 }}>© 2026 SouKni Morocco. All Rights Reserved.</p>
            <div style={{ display: 'flex', gap: '32px' }}>
              {['Sitemap', 'Cookies'].map(link => (
                <a key={link} href="#" style={{ color: 'rgba(230,226,217,0.6)', textDecoration: 'none', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600, transition: 'color 0.15s' }}
                  onMouseEnter={e => e.currentTarget.style.color = 'white'}
                  onMouseLeave={e => e.currentTarget.style.color = 'rgba(230,226,217,0.6)'}
                >{link}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
