'use client'

import React, { useState } from 'react'
import Link from 'next/link'

const categoryCards = [
  { icon: '🏢', label: 'For Sale', count: '25,180', slug: 'for-sale' },
  { icon: '🏡', label: 'For Rent', count: '1,840', slug: 'for-rent' },
  { icon: '🚪', label: 'Rooms', count: '3,215', slug: 'rooms' },
  { icon: '🏖️', label: 'Daily Rentals', count: '642', slug: 'daily-rentals' },
  { icon: '🏪', label: 'Commercial', count: '1,195', slug: 'commercial' },
  { icon: '🏗️', label: 'New Projects', count: '84', slug: 'new-projects' },
]

const apartments = [
  { title: 'Marina Waterfront View 2BR', price: '12,500', unit: 'MAD/mo', location: 'Casablanca', badges: ['Diamond Member', 'Verified'], attr1: { icon: '🛏️', label: '2 Beds' }, attr2: { icon: '🛁', label: '2 Baths' }, image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&w=500' },
  { title: 'Villa Oasis Royale', price: '45,000', unit: 'MAD/mo', location: 'Marrakech', badges: [], attr1: { icon: '🛏️', label: '4 Beds' }, attr2: { icon: '🏊', label: 'Pool' }, image: 'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&w=500' },
  { title: 'Artist Studio in Gauthier', price: '6,800', unit: 'MAD/mo', location: 'Casablanca', badges: ['Verified'], attr1: { icon: '🛏️', label: '1 Bed' }, attr2: { icon: '📐', label: '55m²' }, image: 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&w=500' },
  { title: 'Industrial Chic Penthouse', price: '18,200', unit: 'MAD/mo', location: 'Tangier', badges: [], attr1: { icon: '🛏️', label: '3 Beds' }, attr2: { icon: '🏠', label: 'Duplex' }, image: 'https://images.pexels.com/photos/1918291/pexels-photo-1918291.jpeg?auto=compress&w=500' },
]

const villas = [
  { title: 'Villa Oasis Royale', price: '8,500,000', unit: 'MAD', location: 'Marrakech, Palmeraie', badges: ['Diamond Member', 'Verified'], attr1: { icon: '🛏️', label: '5 Beds' }, attr2: { icon: '🏊', label: 'Pool' }, image: 'https://images.pexels.com/photos/2581922/pexels-photo-2581922.jpeg?auto=compress&w=500' },
  { title: 'Beachfront Sanctuary', price: '12,400,000', unit: 'MAD', location: 'Agadir', badges: ['Diamond Member'], attr1: { icon: '🛏️', label: '4 Beds' }, attr2: { icon: '🌊', label: 'Ocean View' }, image: 'https://images.pexels.com/photos/1268871/pexels-photo-1268871.jpeg?auto=compress&w=500' },
  { title: 'Embassy District Villa', price: '9,200,000', unit: 'MAD', location: 'Rabat, Hay Riad', badges: ['Diamond Member'], attr1: { icon: '🛏️', label: '4 Beds' }, attr2: { icon: '🌿', label: 'Garden' }, image: 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&w=500' },
  { title: 'Mediterranean Heights', price: '7,800,000', unit: 'MAD', location: 'Tangier', badges: ['Diamond Member'], attr1: { icon: '🛏️', label: '3 Beds' }, attr2: { icon: '👁️', label: 'Panoramic' }, image: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&w=500' },
]

const vacations = [
  { title: 'Historic Riad in Marrakech Medina', price: '1,800', unit: 'MAD/day', location: 'Marrakech Medina', badges: ['Diamond Member'], attr1: { icon: '🏛️', label: 'Traditional' }, attr2: { icon: '🏊', label: 'Pool' }, image: 'https://images.pexels.com/photos/2872755/pexels-photo-2872755.jpeg?auto=compress&w=500' },
  { title: 'Beachfront Oasis Tangier', price: '2,200', unit: 'MAD/day', location: 'Tangier, Malabata', badges: ['Diamond Member'], attr1: { icon: '🌊', label: 'Sea View' }, attr2: { icon: '🏗️', label: 'Terrace' }, image: 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&w=500' },
  { title: 'Luxury Desert Glamping', price: '3,500', unit: 'MAD/day', location: 'Merzouga Dunes', badges: ['Diamond Member'], attr1: { icon: '⛺', label: 'Premium' }, attr2: { icon: '🍽️', label: 'Full Board' }, image: 'https://images.pexels.com/photos/2245436/pexels-photo-2245436.jpeg?auto=compress&w=500' },
  { title: 'Atlas Mountain Escape', price: '4,200', unit: 'MAD/day', location: 'Imlil, Atlas', badges: ['Diamond Member'], attr1: { icon: '🏊', label: 'Infinity Pool' }, attr2: { icon: '💆', label: 'Spa' }, image: 'https://images.pexels.com/photos/1458457/pexels-photo-1458457.jpeg?auto=compress&w=500' },
]

const commercial = [
  { title: 'Skyline Executive Office', price: '45,000', unit: 'MAD/mo', location: 'Casablanca Finance City', badges: ['Diamond Member', 'Verified'], attr1: { icon: '💼', label: 'Office' }, attr2: { icon: '📐', label: '450m²' }, image: 'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&w=500' },
  { title: 'Luxury Boutique Retail', price: '32,000', unit: 'MAD/mo', location: 'Rabat, Souissi Mall', badges: ['Diamond Member', 'Verified'], attr1: { icon: '🏪', label: 'Retail' }, attr2: { icon: '📐', label: '120m²' }, image: 'https://images.pexels.com/photos/1109561/pexels-photo-1109561.jpeg?auto=compress&w=500' },
  { title: 'Heritage Boutique Office', price: '28,500', unit: 'MAD/mo', location: 'Marrakech, Hivernage', badges: ['Diamond Member', 'Verified'], attr1: { icon: '💼', label: 'Office' }, attr2: { icon: '📐', label: '210m²' }, image: 'https://images.pexels.com/photos/380769/pexels-photo-380769.jpeg?auto=compress&w=500' },
  { title: 'Logistics Hub Med-Zone', price: '85,000', unit: 'MAD/mo', location: 'Tangier Med Zone', badges: ['Diamond Member', 'Verified'], attr1: { icon: '🏭', label: 'Warehouse' }, attr2: { icon: '📐', label: '1200m²' }, image: 'https://images.pexels.com/photos/2219024/pexels-photo-2219024.jpeg?auto=compress&w=500' },
]

function PropertyCard({ item }: { item: typeof apartments[0] }) {
  const [liked, setLiked] = useState(false)
  const [hovered, setHovered] = useState(false)
  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{ backgroundColor: 'white', borderRadius: '28px', overflow: 'hidden', border: '1px solid #f1f5f9', boxShadow: hovered ? '0 20px 40px rgba(0,0,0,0.1)' : '0 2px 8px rgba(0,0,0,0.04)', transition: 'all 0.3s' }}>
      <div style={{ position: 'relative', height: '220px', overflow: 'hidden' }}>
        <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s', transform: hovered ? 'scale(1.06)' : 'scale(1)' }} />
        <div style={{ position: 'absolute', top: '14px', left: '14px', display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          {item.badges.includes('Diamond Member') && <span style={{ backgroundColor: 'rgba(45,212,191,0.15)', backdropFilter: 'blur(8px)', border: '1px solid rgba(45,212,191,0.3)', color: '#2dd4bf', fontSize: '10px', fontWeight: 700, padding: '4px 10px', borderRadius: '100px', textTransform: 'uppercase' }}>💎 Diamond</span>}
          {item.badges.includes('Verified') && <span style={{ backgroundColor: '#2dd4bf', color: 'white', fontSize: '10px', fontWeight: 700, padding: '4px 10px', borderRadius: '100px', textTransform: 'uppercase' }}>✓ Verified</span>}
        </div>
        <button onClick={() => setLiked(!liked)} style={{ position: 'absolute', top: '14px', right: '14px', width: '36px', height: '36px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(8px)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: '16px' }}>{liked ? '❤️' : '🤍'}</button>
        <div style={{ position: 'absolute', bottom: '14px', left: '14px', backgroundColor: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(8px)', padding: '6px 14px', borderRadius: '100px' }}>
          <span style={{ color: '#2dd4bf', fontSize: '16px', fontWeight: 800 }}>{item.price} </span>
          <span style={{ color: '#64748b', fontSize: '11px' }}>{item.unit}</span>
        </div>
      </div>
      <div style={{ padding: '20px' }}>
        <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a', marginBottom: '6px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.title}</h3>
        <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '12px' }}>📍 {item.location}</div>
        <div style={{ display: 'flex', gap: '14px', borderTop: '1px solid #f1f5f9', paddingTop: '12px', marginBottom: '16px' }}>
          <span style={{ fontSize: '12px', color: '#475569' }}>{item.attr1.icon} {item.attr1.label}</span>
          <span style={{ fontSize: '12px', color: '#475569' }}>{item.attr2.icon} {item.attr2.label}</span>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button style={{ flex: 1, border: '1px solid #e2e8f0', color: '#0f172a', backgroundColor: 'transparent', padding: '10px', borderRadius: '100px', fontWeight: 600, fontSize: '13px', cursor: 'pointer', transition: 'background 0.15s' }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#f8fafc'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
          >Message</button>
          <button style={{ flex: 1, backgroundColor: '#2dd4bf', color: 'white', border: 'none', padding: '10px', borderRadius: '100px', fontWeight: 600, fontSize: '13px', cursor: 'pointer', transition: 'background 0.15s' }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#0f9b8e'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = '#2dd4bf'}
          >💬 WhatsApp</button>
        </div>
      </div>
    </div>
  )
}

function SectionRow({ title, subtitle, items, slug, locale }: { title: string; subtitle: string; items: typeof apartments; slug: string; locale: string }) {
  return (
    <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px 56px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '24px' }}>
        <div>
          <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#0f172a', marginBottom: '4px' }}>{title}</h2>
          <p style={{ fontSize: '14px', color: '#64748b' }}>{subtitle}</p>
        </div>
        <Link href={`/${locale}/property/${slug}`} style={{ color: '#2dd4bf', fontWeight: 700, fontSize: '14px', textDecoration: 'none', transition: 'opacity 0.15s' }}
          onMouseEnter={e => e.currentTarget.style.opacity = '0.7'}
          onMouseLeave={e => e.currentTarget.style.opacity = '1'}
        >View all →</Link>
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
    <div style={{ fontFamily: 'Inter, system-ui, sans-serif', backgroundColor: '#f4fbf8', minHeight: '100vh' }}>

      {/* HERO */}
      <section style={{ position: 'relative', height: '460px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        <img src="https://images.pexels.com/photos/2581922/pexels-photo-2581922.jpeg?auto=compress&w=1400" alt="Property" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(15,23,42,0.7), rgba(0,0,0,0.15))' }} />
        <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', padding: '0 20px', maxWidth: '700px' }}>
          <h1 style={{ fontSize: '48px', fontWeight: 900, color: 'white', letterSpacing: '-0.02em', marginBottom: '12px', lineHeight: 1.1 }}>Premium Property in Morocco</h1>
          <p style={{ fontSize: '17px', color: 'rgba(255,255,255,0.85)', marginBottom: '24px' }}>Apartments, villas, vacation homes and commercial spaces</p>
          <div style={{ display: 'flex', gap: '8px', backgroundColor: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(16px)', borderRadius: '100px', padding: '6px 6px 6px 24px', border: '1px solid rgba(255,255,255,0.3)' }}>
            <input type="text" placeholder="Search properties..." style={{ flex: 1, backgroundColor: 'transparent', border: 'none', outline: 'none', padding: '10px 0', fontSize: '15px', color: 'white', fontFamily: 'Inter, sans-serif' }} />
            <button style={{ backgroundColor: '#2dd4bf', color: '#00201c', border: 'none', padding: '12px 28px', borderRadius: '100px', fontWeight: 700, fontSize: '13px', cursor: 'pointer', transition: 'background 0.15s' }}>Search</button>
          </div>
        </div>
      </section>

      {/* CATEGORY CARDS — all clickable */}
      <section style={{ maxWidth: '1280px', margin: '-40px auto 0', padding: '0 24px', position: 'relative', zIndex: 20 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '14px' }}>
          {categoryCards.map(cat => (
            <Link key={cat.label} href={`/${locale}/property/${cat.slug}`} style={{ textDecoration: 'none' }}>
              <div style={{ backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: '20px', padding: '20px 12px', textAlign: 'center', cursor: 'pointer', transition: 'all 0.2s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = '0 8px 24px rgba(45,212,191,0.15)'; (e.currentTarget as HTMLDivElement).style.borderColor = '#2dd4bf' }}
                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = 'none'; (e.currentTarget as HTMLDivElement).style.borderColor = '#e2e8f0' }}
              >
                <div style={{ fontSize: '28px', marginBottom: '8px' }}>{cat.icon}</div>
                <p style={{ fontSize: '12px', fontWeight: 700, color: '#0f172a', marginBottom: '4px' }}>{cat.label}</p>
                <p style={{ fontSize: '11px', color: '#2dd4bf', fontWeight: 600 }}>{cat.count}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* PROPERTY SECTIONS */}
      <div style={{ paddingTop: '56px' }}>
        <SectionRow title="Luxury Apartments for Rent" subtitle="Curated selection of Morocco's finest urban living." items={apartments} slug="for-rent" locale={locale} />
        <SectionRow title="Premium Villas for Sale" subtitle="Exclusive estates in Morocco's most prestigious locations." items={villas} slug="for-sale" locale={locale} />
        <SectionRow title="Featured Vacation Homes" subtitle="Hand-picked short-term stays across Morocco." items={vacations} slug="daily-rentals" locale={locale} />
        <SectionRow title="Featured Commercial Properties" subtitle="Strategic business locations across Morocco." items={commercial} slug="commercial" locale={locale} />
      </div>

      {/* DIAMOND BANNER */}
      <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px 80px' }}>
        <div style={{ background: 'linear-gradient(135deg, #2dd4bf 0%, #2dd4bf 100%)', borderRadius: '40px', padding: '56px', display: 'flex', alignItems: 'center', gap: '48px' }}>
          <div style={{ flex: 1 }}>
            <h2 style={{ fontSize: '36px', fontWeight: 800, color: 'white', marginBottom: '16px', letterSpacing: '-0.02em' }}>Become a Diamond Certified Member</h2>
            <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '16px', marginBottom: '28px', lineHeight: 1.6 }}>Boost your trust score, get exclusive access to off-market listings, and enjoy priority support.</p>
            <button style={{ backgroundColor: 'white', color: '#2dd4bf', border: 'none', padding: '14px 36px', borderRadius: '100px', fontWeight: 700, fontSize: '16px', cursor: 'pointer', transition: 'transform 0.15s' }}
              onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.03)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
            >Get Certified Now</button>
          </div>
          <div style={{ fontSize: '80px' }}>💎</div>
        </div>
      </section>
    </div>
  )
}
