'use client'

import React, { useState } from 'react'
import Link from 'next/link'

const categoryPills = [
  { label: 'All', active: true },
  { label: 'Tailoring' },
  { label: 'Digital Signage' },
  { label: 'Business Support' },
  { label: 'Pet Services' },
  { label: 'Home & Garden' },
  { label: 'Logistics' },
]

const listings = [
  { id: '1', title: 'Tailor-made Kaftans & Djellabas', location: 'Casablanca, Maarif', price: 'From 1200 MAD', tags: ['Haute Couture', 'Fast Delivery'], badge: { label: 'Verified', color: 'rgba(0,107,95,0.9)', text: 'white' }, image: 'https://images.pexels.com/photos/5709661/pexels-photo-5709661.jpeg?auto=compress&w=400' },
  { id: '2', title: 'Digital Menu & Acrylic Displays', location: 'Rabat, Agdal', price: null, tags: ['Tech Design'], badge: { label: 'Featured', color: '#8d4f00', text: 'white' }, image: 'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&w=400' },
  { id: '3', title: 'Custom Pet Portraits', location: 'Marrakech, Medina', price: null, tags: ['Handmade'], badge: { label: 'Verified', color: 'rgba(0,107,95,0.9)', text: 'white' }, image: 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&w=400' },
  { id: '4', title: 'Business Setup & Legal Advisors', location: 'Tangier, Center', price: null, tags: ['Consultancy'], badge: { label: 'Featured', color: '#8d4f00', text: 'white' }, image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&w=400' },
  { id: '5', title: 'Immigration & Visa Consultants', location: 'Casablanca, Anfa', price: null, tags: ['Verified Agency'], badge: { label: 'Verified', color: 'rgba(0,107,95,0.9)', text: 'white' }, image: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&w=400' },
  { id: '6', title: 'School & Office Shuttle Service', location: 'Rabat, Souissi', price: null, tags: ['Safe & Reliable'], badge: { label: 'Featured', color: '#8d4f00', text: 'white' }, image: 'https://images.pexels.com/photos/1004409/pexels-photo-1004409.jpeg?auto=compress&w=400' },
  { id: '7', title: 'Luxury Pool Landscaping', location: 'Marrakech, Palmeraie', price: null, tags: ['Premium Care'], badge: { label: 'Verified', color: 'rgba(0,107,95,0.9)', text: 'white' }, image: 'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&w=400' },
  { id: '8', title: 'Professional Invoice Design', location: 'Casablanca, Sidi Maarouf', price: null, tags: ['Branding'], badge: { label: 'Featured', color: '#8d4f00', text: 'white' }, image: 'https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg?auto=compress&w=400' },
  { id: '9', title: 'Moroccan Interior Design & Decor', location: 'Casablanca, Anfa', price: null, tags: ['Modern Riad'], badge: { label: 'Verified', color: 'rgba(0,107,95,0.9)', text: 'white' }, image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&w=400' },
  { id: '10', title: 'Premium Wedding Photography', location: 'Marrakech, Medina', price: null, tags: ['Cinematic'], badge: { label: 'Featured', color: '#8d4f00', text: 'white' }, image: 'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&w=400' },
  { id: '11', title: 'Modern Arabic Calligraphy & Branding', location: 'Rabat, Agdal', price: null, tags: ['Digital Art'], badge: { label: 'Verified', color: 'rgba(0,107,95,0.9)', text: 'white' }, image: 'https://images.pexels.com/photos/4050315/pexels-photo-4050315.jpeg?auto=compress&w=400' },
  { id: '12', title: 'Expert Cybersecurity & IT Audit', location: 'Casablanca Finance City', price: null, tags: ['Enterprise'], badge: { label: 'Featured', color: '#8d4f00', text: 'white' }, image: 'https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&w=400' },
  { id: '13', title: 'Smart Home Security & Automation', location: 'Rabat, Hay Riad', price: null, tags: ['IoT Expert'], badge: { label: 'Verified', color: 'rgba(0,107,95,0.9)', text: 'white' }, image: 'https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg?auto=compress&w=400' },
  { id: '14', title: 'Gourmet Catering & Private Chef', location: 'Marrakech, Palmeraie', price: null, tags: ['Fine Dining'], badge: { label: 'Featured', color: '#8d4f00', text: 'white' }, image: 'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&w=400' },
  { id: '15', title: 'Luxury Car Detailing & Paint Protection', location: 'Marrakech, Gueliz', price: null, tags: ['Premium Care'], badge: { label: 'Verified', color: 'rgba(0,107,95,0.9)', text: 'white' }, image: 'https://images.pexels.com/photos/3764984/pexels-photo-3764984.jpeg?auto=compress&w=400' },
  { id: '16', title: 'Luxury Event Planning & Decor', location: 'Marrakech, Hivernage', price: null, tags: ['Corporate & Private'], badge: { label: 'Featured', color: '#8d4f00', text: 'white' }, badge2: { label: 'Verified', color: 'rgba(0,107,95,0.9)', text: 'white' }, rating: '5.0 (124 reviews)', image: 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&w=400' },
]

const subNav = ['Motors', 'Property', 'Jobs', 'The Vault', 'Community', 'Services']

function ServiceCard({ listing }: { listing: typeof listings[0] }) {
  const [liked, setLiked] = useState(false)
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        backgroundColor: 'rgba(255,255,255,0.7)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,0.4)',
        borderRadius: '40px',
        overflow: 'hidden',
        transition: 'all 0.3s',
        transform: hovered ? 'translateY(-8px)' : 'translateY(0)',
        boxShadow: hovered ? '0 20px 60px rgba(0,0,0,0.12)' : '0 2px 8px rgba(0,87,77,0.05)',
        fontFamily: 'Inter, sans-serif',
        cursor: 'pointer',
      }}
    >
      <div style={{ position: 'relative', height: '256px', overflow: 'hidden' }}>
        <img
          src={listing.image}
          alt={listing.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.7s', transform: hovered ? 'scale(1.1)' : 'scale(1)' }}
        />
        <div style={{ position: 'absolute', top: '16px', left: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ backgroundColor: listing.badge.color, color: listing.badge.text, fontSize: '10px', fontWeight: 700, padding: '4px 12px', borderRadius: '100px', backdropFilter: 'blur(8px)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            {listing.badge.label}
          </div>
          {(listing as any).badge2 && (
            <div style={{ backgroundColor: (listing as any).badge2.color, color: (listing as any).badge2.text, fontSize: '10px', fontWeight: 700, padding: '4px 12px', borderRadius: '100px', backdropFilter: 'blur(8px)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              {(listing as any).badge2.label}
            </div>
          )}
        </div>
        <button
          onClick={() => setLiked(!liked)}
          style={{ position: 'absolute', bottom: '16px', right: '16px', backgroundColor: liked ? 'rgba(239,68,68,0.8)' : 'rgba(0,0,0,0.4)', color: 'white', border: 'none', width: '36px', height: '36px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', backdropFilter: 'blur(8px)', transition: 'background 0.2s' }}
        >{liked ? '♥' : '♡'}</button>
      </div>

      <div style={{ padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#161d1b', lineHeight: 1.3, flex: 1, paddingRight: '8px' }}>{listing.title}</h3>
          {listing.price && <span style={{ color: '#006b5f', fontWeight: 700, fontSize: '13px', whiteSpace: 'nowrap' }}>{listing.price}</span>}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#6b7a76', fontSize: '13px', marginBottom: '16px' }}>
          <span style={{ fontSize: '14px' }}>📍</span>
          {listing.location}
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '24px' }}>
          {listing.tags.map((tag, i) => (
            <span key={i} style={{ backgroundColor: 'rgba(45,212,191,0.15)', color: '#00574d', padding: '4px 12px', borderRadius: '100px', fontSize: '11px', fontWeight: 700 }}>{tag}</span>
          ))}
          {(listing as any).rating && (
            <span style={{ color: '#8d4f00', fontSize: '11px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '2px' }}>⭐ {(listing as any).rating}</span>
          )}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          <button style={{ backgroundColor: '#e2eae7', color: '#3c4a46', border: 'none', padding: '10px', borderRadius: '12px', fontWeight: 700, fontSize: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontFamily: 'Inter, sans-serif', transition: 'background 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#bacac5'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = '#e2eae7'}
          >📞 Call</button>
          <button style={{ backgroundColor: '#006b5f', color: 'white', border: 'none', padding: '10px', borderRadius: '12px', fontWeight: 700, fontSize: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontFamily: 'Inter, sans-serif', transition: 'opacity 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.9'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
          >💬 Chat</button>
        </div>
      </div>
    </div>
  )
}

export default function OtherServicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = React.use(params)
  const [currentPage, setCurrentPage] = useState(1)
  const [activeCategory, setActiveCategory] = useState('All')

  const row1 = listings.slice(0, 2)
  const row2 = listings.slice(2, 6)
  const row3 = listings.slice(6, 8)
  const row4 = listings.slice(8, 16)

  return (
    <div style={{ fontFamily: 'Inter, system-ui, sans-serif', backgroundColor: '#f4fbf8', minHeight: '100vh' }}>

      {/* HEADER */}
      <header style={{ position: 'fixed', top: 0, width: '100%', zIndex: 50, backgroundColor: 'rgba(244,251,248,0.8)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.4)', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 40px', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
            <Link href={`/${locale}`} style={{ textDecoration: 'none' }}>
              <span style={{ fontSize: '22px', fontWeight: 700, color: '#006b5f', letterSpacing: '-0.02em' }}>ProHub Morocco</span>
            </Link>
            <nav style={{ display: 'flex', gap: '24px' }}>
              {subNav.map(item => (
                <a key={item} href="#" style={{ fontSize: '16px', color: item === 'Community' ? '#006b5f' : '#3c4a46', textDecoration: 'none', borderBottom: item === 'Community' ? '2px solid #006b5f' : '2px solid transparent', paddingBottom: '4px', transition: 'color 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#006b5f'}
                  onMouseLeave={e => e.currentTarget.style.color = item === 'Community' ? '#006b5f' : '#3c4a46'}
                >{item}</a>
              ))}
            </nav>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ display: 'flex', gap: '4px' }}>
              {['🔔', '♡', '💬', '👤'].map((icon, i) => (
                <button key={i} style={{ padding: '8px', background: 'none', border: 'none', cursor: 'pointer', fontSize: '18px', color: '#3c4a46', borderRadius: '50%', transition: 'background 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(45,212,191,0.1)'}
                  onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                >{icon}</button>
              ))}
            </div>
            <button style={{ backgroundColor: '#2dd4bf', color: '#00574d', border: 'none', padding: '10px 24px', borderRadius: '100px', fontWeight: 700, fontSize: '13px', cursor: 'pointer', fontFamily: 'Inter, sans-serif', boxShadow: '0 2px 8px rgba(45,212,191,0.3)', transition: 'transform 0.15s' }}
              onMouseEnter={e => e.currentTarget.style.transform = 'scale(0.97)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
            >Place Your Ad</button>
          </div>
        </div>
      </header>

      <main style={{ paddingTop: '96px', paddingBottom: '80px', maxWidth: '1440px', margin: '0 auto', padding: '96px 40px 80px' }}>

        {/* BREADCRUMBS */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#6b7a76', marginBottom: '32px' }}>
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
          <span style={{ color: '#161d1b', fontWeight: 600 }}>Other Services</span>
        </nav>

        {/* FILTER BAR */}
        <section style={{ backdropFilter: 'blur(20px)', backgroundColor: 'rgba(255,255,255,0.7)', border: '1px solid rgba(255,255,255,0.4)', padding: '24px', borderRadius: '40px', boxShadow: '0 20px 60px rgba(0,0,0,0.06)', marginBottom: '48px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr auto', gap: '16px', marginBottom: '32px' }}>
            {[
              { icon: '📍', placeholder: 'City: Casablanca', type: 'text' },
              { icon: '🔍', placeholder: 'Keyword: Tailoring...', type: 'text' },
              { icon: '🗺️', placeholder: 'Neighborhood', type: 'text' },
              { icon: '📅', placeholder: 'Ads Posted: Any', type: 'select', options: ['Ads Posted: Any', 'Last 24 Hours', 'Last 7 Days'] },
            ].map((field, i) => (
              <div key={i} style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', fontSize: '16px', color: '#6b7a76' }}>{field.icon}</span>
                {field.type === 'select' ? (
                  <select style={{ width: '100%', paddingLeft: '48px', paddingRight: '16px', paddingTop: '12px', paddingBottom: '12px', borderRadius: '12px', border: '1px solid rgba(186,202,197,0.3)', backgroundColor: '#eef5f2', outline: 'none', fontSize: '14px', color: '#161d1b', fontFamily: 'Inter, sans-serif', appearance: 'none' }}>
                    {field.options?.map(opt => <option key={opt}>{opt}</option>)}
                  </select>
                ) : (
                  <input type="text" placeholder={field.placeholder} style={{ width: '100%', paddingLeft: '48px', paddingRight: '16px', paddingTop: '12px', paddingBottom: '12px', borderRadius: '12px', border: '1px solid rgba(186,202,197,0.3)', backgroundColor: '#eef5f2', outline: 'none', fontSize: '14px', color: '#161d1b', fontFamily: 'Inter, sans-serif', boxSizing: 'border-box' }} />
                )}
              </div>
            ))}
            <button style={{ backgroundColor: '#006b5f', color: 'white', border: 'none', padding: '12px 24px', borderRadius: '12px', fontWeight: 700, fontSize: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', whiteSpace: 'nowrap', fontFamily: 'Inter, sans-serif', transition: 'background 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = '#00574d'}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = '#006b5f'}
            >⚙ Filters</button>
          </div>

          {/* Category Pills */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {categoryPills.map(pill => (
              <button key={pill.label} onClick={() => setActiveCategory(pill.label)} style={{ backgroundColor: activeCategory === pill.label ? '#006b5f' : 'rgba(221,228,225,0.5)', color: activeCategory === pill.label ? 'white' : '#3c4a46', border: activeCategory === pill.label ? 'none' : '1px solid rgba(186,202,197,0.2)', padding: '8px 22px', borderRadius: '100px', fontSize: '13px', fontWeight: 600, cursor: 'pointer', fontFamily: 'Inter, sans-serif', transition: 'all 0.15s', boxShadow: activeCategory === pill.label ? '0 4px 12px rgba(0,107,95,0.2)' : 'none' }}>
                {pill.label}
              </button>
            ))}
          </div>
        </section>

        {/* MAIN GRID */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '32px' }}>

          {/* Row 1: 2 cards + banner (spans 2) */}
          {row1.map(l => <ServiceCard key={l.id} listing={l} />)}

          {/* BANNER 1 - Electro Pro (spans 2 cols) */}
          <div style={{ gridColumn: 'span 2', position: 'relative', borderRadius: '40px', overflow: 'hidden', backgroundColor: '#006b5f', height: '100%', minHeight: '450px', cursor: 'pointer' }}>
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, #006b5f, rgba(0,107,95,0.6))', zIndex: 1 }} />
            <img src="https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg?auto=compress&w=800" alt="Electro Pro" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.6 }} />
            <div style={{ position: 'relative', zIndex: 2, padding: '48px', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', color: 'white', maxWidth: '380px' }}>
              <h2 style={{ fontSize: '36px', fontWeight: 700, marginBottom: '24px', lineHeight: 1.2, letterSpacing: '-0.02em' }}>SouKni Mobiles & Electro Pro</h2>
              <p style={{ fontSize: '18px', marginBottom: '32px', opacity: 0.9, lineHeight: 1.6 }}>Unlock verified professional sellers for high-end tech. Guaranteed quality, premium support.</p>
              <button style={{ backgroundColor: 'white', color: '#006b5f', border: 'none', padding: '14px 40px', borderRadius: '100px', fontWeight: 700, fontSize: '18px', cursor: 'pointer', width: 'fit-content', fontFamily: 'Inter, sans-serif', transition: 'all 0.2s', boxShadow: '0 4px 20px rgba(0,0,0,0.2)' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.05)'; e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.2)' }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.2)' }}
              >Explore Tech</button>
            </div>
          </div>

          {/* Row 2: 4 cards */}
          {row2.map(l => <ServiceCard key={l.id} listing={l} />)}

          {/* BANNER 2 - Immo Pro (spans 2 cols) */}
          <div style={{ gridColumn: 'span 2', position: 'relative', borderRadius: '40px', overflow: 'hidden', backgroundColor: '#161d1b', height: '450px', cursor: 'pointer' }}>
            <img src="https://images.pexels.com/photos/2581922/pexels-photo-2581922.jpeg?auto=compress&w=800" alt="Immo Pro" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.7 }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0.2))', zIndex: 1 }} />
            <div style={{ position: 'relative', zIndex: 2, padding: '48px', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', color: 'white' }}>
              <h2 style={{ fontSize: '48px', fontWeight: 700, marginBottom: '16px', letterSpacing: '-0.03em', lineHeight: 1.1 }}>SouKni Immo Pro</h2>
              <p style={{ fontSize: '18px', marginBottom: '24px', opacity: 0.8, maxWidth: '360px', lineHeight: 1.6 }}>Discover the finest Riads and villas with our certified agents. Luxury living redefined.</p>
              <button style={{ backgroundColor: '#2dd4bf', color: '#00574d', border: 'none', padding: '12px 32px', borderRadius: '100px', fontWeight: 700, fontSize: '15px', cursor: 'pointer', width: 'fit-content', fontFamily: 'Inter, sans-serif', boxShadow: '0 4px 16px rgba(0,0,0,0.3)', transition: 'transform 0.15s' }}
                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
              >Browse Properties</button>
            </div>
          </div>

          {/* Row 3: 2 cards */}
          {row3.map(l => <ServiceCard key={l.id} listing={l} />)}

          {/* Row 4: 8 more cards */}
          {row4.map(l => <ServiceCard key={l.id} listing={l} />)}

        </div>

        {/* PAGINATION */}
        <nav style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '16px', marginTop: '64px' }}>
          <button style={{ width: '48px', height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', backgroundColor: '#e2eae7', border: 'none', cursor: 'pointer', fontSize: '18px', transition: 'background 0.15s' }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#2dd4bf'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = '#e2eae7'}
          >‹</button>
          {[1, 2, 3].map(p => (
            <button key={p} onClick={() => setCurrentPage(p)} style={{ width: '48px', height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', border: 'none', backgroundColor: currentPage === p ? '#006b5f' : '#e2eae7', color: currentPage === p ? 'white' : '#161d1b', fontWeight: 700, fontSize: '15px', cursor: 'pointer', fontFamily: 'Inter, sans-serif', boxShadow: currentPage === p ? '0 4px 12px rgba(0,107,95,0.3)' : 'none', transition: 'all 0.15s' }}>{p}</button>
          ))}
          <span style={{ color: '#6b7a76' }}>...</span>
          <button style={{ width: '48px', height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', backgroundColor: '#e2eae7', border: 'none', cursor: 'pointer', fontSize: '15px', fontWeight: 700, fontFamily: 'Inter, sans-serif', transition: 'background 0.15s' }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#2dd4bf'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = '#e2eae7'}
          >48</button>
          <button style={{ width: '48px', height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', backgroundColor: '#e2eae7', border: 'none', cursor: 'pointer', fontSize: '18px', transition: 'background 0.15s' }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#2dd4bf'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = '#e2eae7'}
          >›</button>
        </nav>

        {/* APP DOWNLOAD BANNER */}
        <section style={{ marginTop: '96px', backdropFilter: 'blur(20px)', backgroundColor: 'rgba(255,255,255,0.7)', border: '1px solid rgba(255,255,255,0.4)', padding: '48px', borderRadius: '40px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '48px', flexWrap: 'wrap' }}>
            <div style={{ maxWidth: '560px' }}>
              <h2 style={{ fontSize: '48px', fontWeight: 700, color: '#006b5f', marginBottom: '24px', letterSpacing: '-0.03em' }}>Join the SouKni Family</h2>
              <p style={{ fontSize: '18px', color: '#3c4a46', marginBottom: '32px', lineHeight: 1.6 }}>Download the ProHub Morocco app for a smoother, faster discovery experience. Get real-time notifications for new services in your city.</p>
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                {[{ icon: '▶', label: 'Google Play', sub: 'Get it on' }, { icon: '🍎', label: 'App Store', sub: 'Download on the' }].map(btn => (
                  <button key={btn.label} style={{ backgroundColor: '#161d1b', color: 'white', border: 'none', padding: '16px 28px', borderRadius: '16px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px', fontFamily: 'Inter, sans-serif', transition: 'transform 0.15s' }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                  >
                    <span style={{ fontSize: '28px' }}>{btn.icon}</span>
                    <div style={{ textAlign: 'left' }}>
                      <div style={{ fontSize: '10px', opacity: 0.7, textTransform: 'uppercase', lineHeight: 1 }}>{btn.sub}</div>
                      <div style={{ fontSize: '18px', fontWeight: 700, lineHeight: 1.2 }}>{btn.label}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
            <div style={{ width: '288px', height: '384px', backgroundColor: 'rgba(45,212,191,0.15)', borderRadius: '40px', boxShadow: '0 20px 60px rgba(0,0,0,0.1)', transform: 'rotate(6deg)', border: '1px solid rgba(255,255,255,0.4)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px', textAlign: 'center' }}>
              <span style={{ fontSize: '80px', marginBottom: '16px' }}>🛡️</span>
              <h4 style={{ fontSize: '20px', fontWeight: 700, color: '#006b5f', marginBottom: '8px' }}>Verified Sellers</h4>
              <p style={{ fontSize: '13px', color: '#3c4a46' }}>Only the best for our community.</p>
            </div>
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer style={{ backgroundColor: '#605e58', color: 'white', paddingTop: '64px', paddingBottom: '48px' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 40px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '48px', marginBottom: '64px' }}>
            <div>
              <h3 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '24px' }}>ProHub Morocco</h3>
              <p style={{ fontSize: '15px', opacity: 0.7, lineHeight: 1.7, marginBottom: '24px', maxWidth: '320px' }}>The premium community marketplace for Morocco. Connecting services and needs since 2018.</p>
              <div style={{ display: 'flex', gap: '12px' }}>
                {['😊', '✉️', '🌐'].map((icon, i) => (
                  <a key={i} href="#" style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', fontSize: '18px', transition: 'background 0.2s' }}
                    onMouseEnter={e => e.currentTarget.style.backgroundColor = '#2dd4bf'}
                    onMouseLeave={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'}
                  >{icon}</a>
                ))}
              </div>
            </div>
            {[
              { title: 'Quick Links', links: ['About Us', 'Careers', 'Privacy Policy', 'Terms of Service'] },
              { title: 'Professional', links: ['Mobiles Pro', 'Immo Pro', 'Market Insights', 'Advertise with Us'] },
              { title: 'Support', links: ['Contact Support', 'Safety Tips', 'Help Center', 'Community Rules'] },
            ].map(col => (
              <div key={col.title}>
                <h4 style={{ fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', color: '#62fae3', marginBottom: '20px' }}>{col.title}</h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {col.links.map(link => (
                    <li key={link} style={{ marginBottom: '12px' }}>
                      <a href="#" style={{ fontSize: '15px', color: 'rgba(255,255,255,0.7)', textDecoration: 'none', transition: 'all 0.15s' }}
                        onMouseEnter={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.color = '#62fae3' }}
                        onMouseLeave={e => { e.currentTarget.style.opacity = '0.7'; e.currentTarget.style.color = 'rgba(255,255,255,0.7)' }}
                      >{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '32px', textAlign: 'center' }}>
            <p style={{ fontSize: '13px', opacity: 0.5 }}>© 2026 ProHub Morocco Community Services. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
