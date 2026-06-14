'use client'

import React, { useState } from 'react'
import Link from 'next/link'

const navLinks = ['Motors', 'Property', 'The Vault', 'Services', 'Fashion', 'Jobs', 'Mobiles & Computers', 'Community']

const categoryCards = [
  { icon: '🏢', label: 'Apartments', count: '25,180' },
  { icon: '🏡', label: 'Villas', count: '1,840' },
  { icon: '🚪', label: 'Rooms', count: '3,215' },
  { icon: '🏖️', label: 'Vacation', count: '642' },
  { icon: '🏪', label: 'Commercial', count: '1,195' },
  { icon: '📅', label: 'Monthly', count: '84' },
]

const apartments = [
  { title: 'Marina Waterfront View 2BR', price: '12,500', unit: 'MAD/mo', location: 'Casablanca, Morocco', badges: ['Diamond Member', 'Verified'], attr1: { icon: '🛏️', label: '2 Beds' }, attr2: { icon: '🛁', label: '2 Baths' }, image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&w=500' },
  { title: 'Villa Oasis Royale', price: '45,000', unit: 'MAD/mo', location: 'Marrakech, Morocco', badges: [], attr1: { icon: '🛏️', label: '4 Beds' }, attr2: { icon: '🏊', label: 'Pool' }, image: 'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&w=500' },
  { title: 'Artist Studio in Gauthier', price: '6,800', unit: 'MAD/mo', location: 'Casablanca, Morocco', badges: ['Verified'], attr1: { icon: '🛏️', label: '1 Bed' }, attr2: { icon: '📐', label: '55m²' }, image: 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&w=500' },
  { title: 'Industrial Chic Penthouse', price: '18,200', unit: 'MAD/mo', location: 'Tangier, Morocco', badges: [], attr1: { icon: '🛏️', label: '3 Beds' }, attr2: { icon: '🏠', label: 'Duplex' }, image: 'https://images.pexels.com/photos/1918291/pexels-photo-1918291.jpeg?auto=compress&w=500' },
]

const villas = [
  { title: 'Villa Oasis Royale', price: '8,500,000', unit: 'MAD', location: 'Marrakech, Palmeraie', badges: ['Diamond Member', 'Verified'], attr1: { icon: '🛏️', label: '5 Beds' }, attr2: { icon: '🏊', label: 'Pool' }, image: 'https://images.pexels.com/photos/2581922/pexels-photo-2581922.jpeg?auto=compress&w=500' },
  { title: 'Beachfront Sanctuary', price: '12,400,000', unit: 'MAD', location: 'Agadir, Morocco', badges: ['Diamond Member'], attr1: { icon: '🛏️', label: '4 Beds' }, attr2: { icon: '🌊', label: 'Ocean View' }, image: 'https://images.pexels.com/photos/1268871/pexels-photo-1268871.jpeg?auto=compress&w=500' },
  { title: 'Embassy District Villa', price: '9,200,000', unit: 'MAD', location: 'Rabat, Hay Riad', badges: ['Diamond Member'], attr1: { icon: '🛏️', label: '4 Beds' }, attr2: { icon: '🌿', label: 'Garden' }, image: 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&w=500' },
  { title: 'Mediterranean Heights', price: '7,800,000', unit: 'MAD', location: 'Tangier, Morocco', badges: ['Diamond Member'], attr1: { icon: '🛏️', label: '3 Beds' }, attr2: { icon: '👁️', label: 'Panoramic View' }, image: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&w=500' },
]

const vacations = [
  { title: 'Historic Riad in Marrakech Medina', price: '1,800', unit: 'MAD/day', location: 'Marrakech Medina', badges: ['Diamond Member'], attr1: { icon: '🏛️', label: 'Traditional Courtyard' }, attr2: { icon: '🏊', label: 'Pool' }, image: 'https://images.pexels.com/photos/2872755/pexels-photo-2872755.jpeg?auto=compress&w=500' },
  { title: 'Beachfront Oasis Tangier', price: '2,200', unit: 'MAD/day', location: 'Tangier, Malabata', badges: ['Diamond Member'], attr1: { icon: '🌊', label: 'Panoramic Sea View' }, attr2: { icon: '🏗️', label: 'Terrace' }, image: 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&w=500' },
  { title: 'Luxury Desert Glamping', price: '3,500', unit: 'MAD/day', location: 'Merzouga Dunes', badges: ['Diamond Member'], attr1: { icon: '⛺', label: 'Premium Tents' }, attr2: { icon: '🍽️', label: 'Full Board' }, image: 'https://images.pexels.com/photos/2245436/pexels-photo-2245436.jpeg?auto=compress&w=500' },
  { title: 'Atlas Mountain Escape', price: '4,200', unit: 'MAD/day', location: 'Imlil, Atlas Mountains', badges: ['Diamond Member'], attr1: { icon: '🏊', label: 'Private Infinity Pool' }, attr2: { icon: '💆', label: 'Spa' }, image: 'https://images.pexels.com/photos/1458457/pexels-photo-1458457.jpeg?auto=compress&w=500' },
]

const commercial = [
  { title: 'Skyline Executive Penthouse', price: '45,000', unit: 'MAD/mo', location: 'Casablanca Finance City', badges: ['Diamond Member', 'Verified'], attr1: { icon: '💼', label: 'Office' }, attr2: { icon: '📐', label: '450m²' }, image: 'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&w=500' },
  { title: 'Luxury Boutique Retail', price: '32,000', unit: 'MAD/mo', location: 'Rabat, Souissi Mall', badges: ['Diamond Member', 'Verified'], attr1: { icon: '🏪', label: 'Retail' }, attr2: { icon: '📐', label: '120m²' }, image: 'https://images.pexels.com/photos/1109561/pexels-photo-1109561.jpeg?auto=compress&w=500' },
  { title: 'Heritage Boutique Office', price: '28,500', unit: 'MAD/mo', location: 'Marrakech, Hivernage', badges: ['Diamond Member', 'Verified'], attr1: { icon: '💼', label: 'Office' }, attr2: { icon: '📐', label: '210m²' }, image: 'https://images.pexels.com/photos/380769/pexels-photo-380769.jpeg?auto=compress&w=500' },
  { title: 'Logistics Hub Med-Zone', price: '85,000', unit: 'MAD/mo', location: 'Tangier Med Zone', badges: ['Diamond Member', 'Verified'], attr1: { icon: '🏭', label: 'Warehouse' }, attr2: { icon: '📐', label: '1200m²' }, image: 'https://images.pexels.com/photos/2219024/pexels-photo-2219024.jpeg?auto=compress&w=500' },
]

const virtualViewings = [
  { tag: '📹 VIDEO TOUR', title: 'The Glass House - Casablanca', cta: 'Start 3D Tour', image: 'https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg?auto=compress&w=500' },
  { tag: '360° VR READY', title: 'Atlas Modern Mansion', cta: 'Launch VR', image: 'https://images.pexels.com/photos/2062426/pexels-photo-2062426.jpeg?auto=compress&w=500' },
  { tag: '🚁 DRONE VIEW', title: 'Skyline Terrace Loft', cta: 'View Drone Footage', image: 'https://images.pexels.com/photos/2119713/pexels-photo-2119713.jpeg?auto=compress&w=500' },
]

const testimonials = [
  { text: '"Finding a luxury rental in Rabat used to be stressful. SouKni\'s Diamond Certification gave me the confidence to book my villa sight-unseen. The VR tour was 100% accurate."', name: 'Sofia B.', role: 'Diplomatic Housing Client', color: '#2dd4bf' },
  { text: '"As an agency, the Immo Pro tools have doubled our conversion rates. The 2026 AI matching algorithm is lightyears ahead of the competition."', name: 'Karim L.', role: 'Director, ImmoElite Agency', color: '#ffac5a' },
  { text: '"The mobile app experience is flawless. Finding property on the go in Casablanca has never been easier. Truly visionary design."', name: 'Youssef A.', role: 'Frequent Traveler', color: '#e6e2d9' },
]

function PropertyCard({ item }: { item: typeof apartments[0] }) {
  const [liked, setLiked] = useState(false)
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        backgroundColor: 'white', borderRadius: '32px', overflow: 'hidden',
        border: '1px solid rgba(186,202,197,0.1)',
        boxShadow: hovered ? '0 20px 40px rgba(0,0,0,0.1)' : '0 2px 8px rgba(0,0,0,0.04)',
        transition: 'all 0.3s', fontFamily: 'Inter, sans-serif',
      }}
    >
      <div style={{ position: 'relative', height: '220px', overflow: 'hidden' }}>
        <img src={item.image} alt={item.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s', transform: hovered ? 'scale(1.1)' : 'scale(1)' }}
        />
        {/* Badges */}
        <div style={{ position: 'absolute', top: '16px', left: '16px', display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          {item.badges.includes('Diamond Member') && (
            <span style={{ backgroundColor: 'rgba(45,212,191,0.15)', backdropFilter: 'blur(8px)', border: '1px solid rgba(45,212,191,0.3)', color: '#006b5f', fontSize: '10px', fontWeight: 700, padding: '4px 10px', borderRadius: '100px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Diamond Member</span>
          )}
          {item.badges.includes('Verified') && (
            <span style={{ backgroundColor: '#006b5f', color: 'white', fontSize: '10px', fontWeight: 700, padding: '4px 10px', borderRadius: '100px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Verified</span>
          )}
        </div>
        {/* Heart */}
        <button onClick={() => setLiked(!liked)}
          style={{ position: 'absolute', top: '16px', right: '16px', width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'rgba(244,251,248,0.6)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: '18px', color: liked ? '#ba1a1a' : '#3c4a46', border: 'none', transition: 'color 0.2s', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
        >{liked ? '♥' : '♡'}</button>
        {/* Price */}
        <div style={{ position: 'absolute', bottom: '16px', left: '16px', backgroundColor: 'rgba(244,251,248,0.6)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.4)', padding: '8px 16px', borderRadius: '100px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
          <span style={{ color: '#006b5f', fontSize: '18px', fontWeight: 700, lineHeight: 1 }}>{item.price} </span>
          <span style={{ color: '#6b7a76', fontSize: '12px', fontWeight: 400 }}>{item.unit}</span>
        </div>
      </div>
      <div style={{ padding: '24px' }}>
        <h3 style={{ fontSize: '17px', fontWeight: 600, color: '#161d1b', marginBottom: '8px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', letterSpacing: '-0.01em' }}>{item.title}</h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#3c4a46', marginBottom: '16px', fontSize: '13px' }}>
          <span>📍</span> <span>{item.location}</span>
        </div>
        <div style={{ display: 'flex', gap: '16px', borderTop: '1px solid rgba(186,202,197,0.1)', paddingTop: '16px', marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#3c4a46' }}>
            <span style={{ color: '#006b5f' }}>{item.attr1.icon}</span> {item.attr1.label}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#3c4a46' }}>
            <span style={{ color: '#006b5f' }}>{item.attr2.icon}</span> {item.attr2.label}
          </div>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button style={{ flex: 1, border: '1px solid #6b7a76', color: '#161d1b', backgroundColor: 'transparent', padding: '8px', borderRadius: '100px', fontWeight: 600, fontSize: '13px', cursor: 'pointer', fontFamily: 'Inter, sans-serif', transition: 'background 0.15s' }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#e8efec'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
          >Message</button>
          <button style={{ flex: 1, backgroundColor: '#2dd4bf', color: '#00574d', border: 'none', padding: '8px', borderRadius: '100px', fontWeight: 600, fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', fontFamily: 'Inter, sans-serif', transition: 'opacity 0.15s' }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.9'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
          >💬 WhatsApp</button>
        </div>
      </div>
    </div>
  )
}

function SectionRow({ title, subtitle, items }: { title: string, subtitle: string, items: typeof apartments }) {
  return (
    <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 40px 64px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '32px' }}>
        <div>
          <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#161d1b', marginBottom: '4px', letterSpacing: '-0.01em' }}>{title}</h2>
          <p style={{ fontSize: '15px', color: '#3c4a46' }}>{subtitle}</p>
        </div>
        <a href="#" style={{ color: '#006b5f', fontWeight: 700, fontSize: '14px', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px', transition: 'gap 0.2s' }}
          onMouseEnter={e => e.currentTarget.style.gap = '8px'}
          onMouseLeave={e => e.currentTarget.style.gap = '4px'}
        >View all →</a>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
        {items.map(item => <PropertyCard key={item.title} item={item} />)}
      </div>
    </section>
  )
}

export default function PropertyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = React.use(params)

  return (
    <div style={{ fontFamily: 'Inter, system-ui, sans-serif', backgroundColor: '#f4fbf8', minHeight: '100vh', overflowX: 'hidden' }}>

          <img src="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&w=1200" alt="Immo Pro" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.7s' }}
            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(0,107,95,0.8), rgba(0,107,95,0.2), transparent)', display: 'flex', alignItems: 'center', padding: '48px' }}>
            <div style={{ maxWidth: '480px' }}>
              <h2 style={{ fontSize: '36px', fontWeight: 700, color: 'white', marginBottom: '16px', letterSpacing: '-0.02em', lineHeight: 1.2 }}>SouKni Immo Pro</h2>
              <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '17px', marginBottom: '24px', lineHeight: 1.6 }}>Manage your portfolio with 2026 AI-driven insights and premium exposure.</p>
              <button style={{ backgroundColor: 'white', color: '#006b5f', border: 'none', padding: '12px 32px', borderRadius: '100px', fontWeight: 700, fontSize: '15px', cursor: 'pointer', fontFamily: 'Inter, sans-serif', boxShadow: '0 4px 16px rgba(0,0,0,0.15)', transition: 'background 0.15s' }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = '#2dd4bf'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = 'white'}
              >Start Managing Now</button>
            </div>
          </div>
        </div>
      </section>

      {/* PROPERTY SECTIONS */}
      <div style={{ paddingTop: '16px' }}>
        <SectionRow title="Luxury Apartments for Rent" subtitle="Curated selection of Morocco's finest urban living." items={apartments} />
        <SectionRow title="Premium Villas for Sale" subtitle="Exclusive estates in Morocco's most prestigious locations." items={villas} />
        <SectionRow title="Featured Vacation Homes & Apartments" subtitle="Experience the magic of Morocco in our hand-picked short-term stays." items={vacations} />
        <SectionRow title="Featured Commercial Properties" subtitle="Strategic business locations for growth and success across Morocco." items={commercial} />
      </div>

      {/* DIAMOND MEMBER BANNER */}
      <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 40px 64px' }}>
        <div style={{ background: 'linear-gradient(135deg, #006b5f 0%, #005047 100%)', borderRadius: '48px', padding: '64px', display: 'flex', alignItems: 'center', gap: '48px', overflow: 'hidden', position: 'relative', boxShadow: '0 20px 60px rgba(0,107,95,0.3)' }}>
          <div style={{ position: 'absolute', top: '-80px', right: '-80px', width: '320px', height: '320px', backgroundColor: 'rgba(62,221,199,0.15)', borderRadius: '50%', filter: 'blur(80px)' }} />
          <div style={{ flex: 1, zIndex: 1 }}>
            <h2 style={{ fontSize: '42px', fontWeight: 700, color: 'white', marginBottom: '24px', letterSpacing: '-0.02em', lineHeight: 1.15 }}>Join the SouKni Family and Become a Diamond Certified Member</h2>
            <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '18px', marginBottom: '32px', lineHeight: 1.6, maxWidth: '520px' }}>Boost your trust score, get exclusive access to off-market listings, and enjoy priority support from our luxury concierge team.</p>
            <button style={{ backgroundColor: '#2dd4bf', color: '#00574d', border: 'none', padding: '16px 40px', borderRadius: '100px', fontWeight: 700, fontSize: '18px', cursor: 'pointer', fontFamily: 'Inter, sans-serif', boxShadow: '0 8px 24px rgba(0,0,0,0.2)', transition: 'all 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.05)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.3)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.2)' }}
            >Get Certified Now</button>
          </div>
          <div style={{ flex: 1, display: 'flex', justifyContent: 'center', zIndex: 1 }}>
            <div style={{ position: 'relative' }}>
              <div style={{ width: '280px', height: '280px', backgroundColor: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(20px)', borderRadius: '48px', border: '1px solid rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '100px' }}>💎</div>
              <div style={{ position: 'absolute', bottom: '-24px', right: '-24px', backgroundColor: 'rgba(244,251,248,0.6)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.4)', padding: '16px', borderRadius: '16px', boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ color: '#006b5f', fontSize: '20px' }}>✅</span>
                  <span style={{ fontSize: '13px', fontWeight: 700, color: '#006b5f', letterSpacing: '0.05em' }}>PLATINUM LEVEL</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VIRTUAL VIEWINGS */}
      <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 40px 64px', textAlign: 'center' }}>
        <div style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '42px', fontWeight: 700, color: '#161d1b', marginBottom: '8px', letterSpacing: '-0.02em' }}>Revolutionary Virtual Viewings</h2>
          <p style={{ fontSize: '18px', color: '#3c4a46' }}>Tour Moroccan luxury from anywhere in the world with 360° immersion.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px' }}>
          {virtualViewings.map(v => (
            <div key={v.title} style={{ position: 'relative', borderRadius: '40px', overflow: 'hidden', aspectRatio: '4/5', cursor: 'pointer' }}>
              <img src={v.image} alt={v.title}
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }}
                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
              />
              <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.4)', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '32px', textAlign: 'left' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <span style={{ color: '#62fae3', fontSize: '13px', fontWeight: 600 }}>{v.tag}</span>
                </div>
                <h3 style={{ color: 'white', fontSize: '22px', fontWeight: 700, marginBottom: '16px', letterSpacing: '-0.01em' }}>{v.title}</h3>
                <button style={{ width: '100%', padding: '12px', backgroundColor: 'rgba(244,251,248,0.6)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.4)', borderRadius: '100px', color: '#006b5f', fontWeight: 700, fontSize: '14px', cursor: 'pointer', fontFamily: 'Inter, sans-serif', transition: 'background 0.15s' }}
                  onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(244,251,248,0.85)'}
                  onMouseLeave={e => e.currentTarget.style.backgroundColor = 'rgba(244,251,248,0.6)'}
                >{v.cta}</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TRUSTPILOT */}
      <section style={{ backgroundColor: '#e8efec', padding: '64px 0' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 40px', textAlign: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', marginBottom: '32px' }}>
            <div style={{ display: 'flex', gap: '4px', fontSize: '20px' }}>{'⭐⭐⭐⭐⭐'}</div>
            <span style={{ fontSize: '22px', fontWeight: 700, color: '#161d1b' }}>4.8 / 5 on TrustPilot</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px' }}>
            {testimonials.map(t => (
              <div key={t.name} style={{ backgroundColor: 'rgba(244,251,248,0.6)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.4)', padding: '32px', borderRadius: '32px', textAlign: 'left', boxShadow: '0 4px 16px rgba(0,0,0,0.04)' }}>
                <p style={{ fontSize: '15px', fontStyle: 'italic', color: '#3c4a46', marginBottom: '24px', lineHeight: 1.7 }}>{t.text}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: t.color }} />
                  <div>
                    <p style={{ fontWeight: 700, color: '#161d1b', fontSize: '15px' }}>{t.name}</p>
                    <p style={{ fontSize: '13px', color: '#6b7a76' }}>{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* APP DOWNLOAD */}
      <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '64px 40px' }}>
        <div style={{ backgroundColor: '#dde4e1', borderRadius: '48px', padding: '48px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', border: '1px solid rgba(186,202,197,0.2)', boxShadow: '0 20px 40px rgba(0,0,0,0.06)', overflow: 'hidden', position: 'relative' }}>
          <div style={{ flex: 1, zIndex: 1 }}>
            <h2 style={{ fontSize: '42px', fontWeight: 700, color: '#006b5f', marginBottom: '16px', letterSpacing: '-0.03em' }}>Take SouKni Everywhere</h2>
            <p style={{ fontSize: '17px', color: '#3c4a46', marginBottom: '32px', lineHeight: 1.6, maxWidth: '480px' }}>Download our 2026 PWA for haptic search, instant property alerts, and direct WhatsApp integration.</p>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              {[{ icon: '🍎', label: 'App Store', sub: 'Download on the' }, { icon: '▶', label: 'Google Play', sub: 'Get it on' }].map(btn => (
                <button key={btn.label} style={{ backgroundColor: '#161d1b', color: 'white', border: 'none', padding: '12px 24px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', fontFamily: 'Inter, sans-serif', transition: 'opacity 0.15s' }}
                  onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
                  onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                >
                  <span style={{ fontSize: '28px' }}>{btn.icon}</span>
                  <div style={{ textAlign: 'left' }}>
                    <p style={{ fontSize: '10px', opacity: 0.6, textTransform: 'uppercase', lineHeight: 1, marginBottom: '2px' }}>{btn.sub}</p>
                    <p style={{ fontWeight: 700, fontSize: '16px', lineHeight: 1.2 }}>{btn.label}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
          <div style={{ flex: 1, display: 'flex', justifyContent: 'center', position: 'relative', zIndex: 1 }}>
            <div style={{ width: '256px', height: '450px', backgroundColor: 'white', borderRadius: '48px', boxShadow: '0 20px 60px rgba(0,0,0,0.15)', border: '8px solid #161d1b', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, width: '100%', height: '24px', backgroundColor: '#161d1b', borderBottomLeftRadius: '12px', borderBottomRightRadius: '12px' }} />
              <div style={{ padding: '16px', paddingTop: '40px' }}>
                <div style={{ width: '100%', height: '128px', backgroundColor: 'rgba(45,212,191,0.1)', borderRadius: '16px', marginBottom: '16px', animation: 'pulse 2s infinite' }} />
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {['75%', '100%', '50%'].map((w, i) => (
                    <div key={i} style={{ width: w, height: '16px', backgroundColor: '#e8efec', borderRadius: '4px' }} />
                  ))}
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '48px' }}>
                  {[1, 2].map(i => <div key={i} style={{ height: '96px', backgroundColor: 'rgba(45,212,191,0.15)', borderRadius: '12px' }} />)}
                </div>
              </div>
            </div>
            {/* Ambient glow */}
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '100%', height: '100%', backgroundColor: 'rgba(0,107,95,0.08)', filter: 'blur(80px)', borderRadius: '50%', zIndex: -1 }} />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ backgroundColor: '#1a202c', paddingTop: '64px', paddingBottom: '48px', color: 'white' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 40px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1fr', gap: '48px', marginBottom: '64px' }}>
            <div>
              <h2 style={{ fontSize: '36px', fontWeight: 900, color: '#62fae3', marginBottom: '24px', letterSpacing: '-0.04em' }}>SouKni</h2>
              <p style={{ color: '#c9c6be', fontSize: '15px', lineHeight: 1.7, marginBottom: '24px', maxWidth: '280px' }}>Redefining real estate discovery through visionary design and premium technological integration since 2026.</p>
              <div style={{ display: 'flex', gap: '12px' }}>
                {['🌐', '✉️', '⇧'].map((icon, i) => (
                  <a key={i} href="#" style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', fontSize: '18px', transition: 'background 0.15s' }}
                    onMouseEnter={e => e.currentTarget.style.backgroundColor = '#006b5f'}
                    onMouseLeave={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'}
                  >{icon}</a>
                ))}
              </div>
            </div>
            {[
              { title: 'Company', links: ['About Us', 'Mobile Apps', 'Advertising', 'Market Trends'] },
              { title: 'Resources', links: ['Property Guide', 'Contact Support', 'Privacy Policy', 'Terms of Service'] },
            ].map(col => (
              <div key={col.title}>
                <h3 style={{ color: '#62fae3', fontWeight: 700, fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '24px' }}>{col.title}</h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {col.links.map(link => (
                    <li key={link} style={{ marginBottom: '16px' }}>
                      <a href="#" style={{ color: '#c9c6be', fontSize: '15px', textDecoration: 'none', transition: 'color 0.15s' }}
                        onMouseEnter={e => e.currentTarget.style.color = 'white'}
                        onMouseLeave={e => e.currentTarget.style.color = '#c9c6be'}
                      >{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div>
              <h3 style={{ color: '#62fae3', fontWeight: 700, fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '24px' }}>Newsletter</h3>
              <p style={{ color: '#c9c6be', fontSize: '15px', marginBottom: '16px', lineHeight: 1.6 }}>Get the latest off-market listings sent directly to you.</p>
              <div style={{ display: 'flex', gap: '8px' }}>
                <input type="email" placeholder="Email Address" style={{ flex: 1, backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '100px', padding: '10px 20px', color: 'white', fontSize: '14px', outline: 'none', fontFamily: 'Inter, sans-serif' }} />
                <button style={{ backgroundColor: '#006b5f', color: 'white', border: 'none', width: '44px', height: '44px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: '18px', flexShrink: 0, transition: 'opacity 0.15s' }}
                  onMouseEnter={e => e.currentTarget.style.opacity = '0.9'}
                  onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                >→</button>
              </div>
            </div>
          </div>
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
            <p style={{ color: '#c9c6be', fontSize: '13px' }}>© 2026 SouKni Properties. All rights reserved.</p>
            <div style={{ display: 'flex', gap: '32px' }}>
              {['Terms', 'Privacy', 'Cookies'].map(link => (
                <a key={link} href="#" style={{ color: '#c9c6be', fontSize: '13px', textDecoration: 'none', transition: 'color 0.15s' }}
                  onMouseEnter={e => e.currentTarget.style.color = 'white'}
                  onMouseLeave={e => e.currentTarget.style.color = '#c9c6be'}
                >{link}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* FAB (Mobile) */}
      <button style={{ position: 'fixed', bottom: '32px', right: '32px', backgroundColor: '#006b5f', color: 'white', border: 'none', width: '64px', height: '64px', borderRadius: '50%', boxShadow: '0 8px 24px rgba(0,107,95,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: '28px', zIndex: 101, transition: 'transform 0.15s' }}
        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
      >+</button>
    </div>
  )
}
