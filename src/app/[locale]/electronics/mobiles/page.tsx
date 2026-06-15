'use client'

import React, { useState } from 'react'
import Link from 'next/link'

const listings = [
  { id: '1', brand: 'Samsung', title: 'Galaxy Tab S9 Ultra', price: '4,500', badges: [{ label: 'Featured', bg: '#2dd4bf', color: 'white' }, { label: 'Verified', bg: '#facc15', color: 'white' }], specs: [{ label: 'Age', value: '1 Year' }, { label: 'Model', value: 'S9 Ultra' }, { label: 'Storage', value: '512 GB' }, { label: 'Warranty', value: 'Yes' }], location: 'Casablanca', date: '12 June 2024', image: 'https://images.pexels.com/photos/1334597/pexels-photo-1334597.jpeg?auto=compress&w=800' },
  { id: '2', brand: 'Apple', title: 'iPhone 15 Pro Max 256GB', price: '12,900', badges: [{ label: 'New', bg: 'rgba(45,212,191,0.1)', color: '#2dd4bf', border: '1px solid rgba(45,212,191,0.2)' }], tags: ['Brand New', '256 GB', '1yr Warranty'], image: 'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&w=600' },
  { id: '3', brand: 'Huawei', title: 'Huawei Pura 70 Ultra + Watch', price: '6,400', badges: [{ label: 'Used', bg: 'rgba(229,231,235,0.8)', color: '#4b5563', border: '1px solid #e5e7eb' }], tags: ['1 Year Old', '512 GB'], image: 'https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg?auto=compress&w=600' },
  { id: '4', brand: 'Samsung', title: 'S24 Ultra Titanium Gray', price: '11,500', badges: [{ label: 'Verified', bg: '#facc15', color: 'white' }], tags: ['Brand New', '512 GB', '2yr Warranty'], image: 'https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg?auto=compress&w=600' },
  { id: '5', brand: 'Apple', title: 'iPad Pro 13-inch (M4)', price: '14,900', badges: [{ label: 'New', bg: '#2dd4bf', color: 'white' }], tags: ['Brand New', '1 TB'], image: 'https://images.pexels.com/photos/1334597/pexels-photo-1334597.jpeg?auto=compress&w=600' },
  { id: '6', brand: 'Google', title: 'Pixel 9 Pro XL Porcelain', price: '10,200', badges: [{ label: 'Verified', bg: '#facc15', color: 'white' }], tags: ['New', '256 GB'], image: 'https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&w=600' },
  { id: '7', brand: 'Apple', title: 'MacBook Pro 14" (M3 Max)', price: '32,500', badges: [{ label: 'Verified', bg: '#2dd4bf', color: 'white' }], tags: ['M3 Max', '36GB RAM', '1TB SSD'], image: 'https://images.pexels.com/photos/303383/pexels-photo-303383.jpeg?auto=compress&w=500' },
  { id: '8', brand: 'Sony', title: 'WH-1000XM5 Wireless', price: '3,450', badges: [{ label: 'New', bg: 'rgba(45,212,191,0.1)', color: '#2dd4bf', border: '1px solid rgba(45,212,191,0.2)' }], tags: ['30h Battery', 'ANC'], image: 'https://images.pexels.com/photos/3945667/pexels-photo-3945667.jpeg?auto=compress&w=500' },
  { id: '9', brand: 'Nintendo', title: 'Switch OLED Model', price: '3,200', badges: [{ label: 'Used', bg: 'rgba(229,231,235,0.8)', color: '#4b5563', border: '1px solid #e5e7eb' }], tags: ['64GB', 'OLED Screen'], image: 'https://images.pexels.com/photos/371924/pexels-photo-371924.jpeg?auto=compress&w=500' },
]

function CardButtons() {
  return (
    <div style={{ display: 'flex', gap: '10px' }}>
      <button style={{ flex: 1, backgroundColor: '#2dd4bf', color: 'white', border: 'none', padding: '11px', borderRadius: '12px', fontWeight: 700, fontSize: '13px', cursor: 'pointer', transition: 'background 0.15s' }}
        onMouseEnter={e => e.currentTarget.style.backgroundColor = '#0f9b8e'}
        onMouseLeave={e => e.currentTarget.style.backgroundColor = '#2dd4bf'}
      >📱 WhatsApp</button>
      <button style={{ flex: 1, backgroundColor: 'rgba(45,212,191,0.08)', color: '#2dd4bf', border: 'none', padding: '11px', borderRadius: '12px', fontWeight: 700, fontSize: '13px', cursor: 'pointer', transition: 'all 0.15s' }}
        onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#2dd4bf'; e.currentTarget.style.color = 'white' }}
        onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'rgba(45,212,191,0.08)'; e.currentTarget.style.color = '#2dd4bf' }}
      >💬 Chat</button>
    </div>
  )
}

function BadgeRow({ badges }: { badges: any[] }) {
  return (
    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
      {badges.map((b, i) => <span key={i} style={{ backgroundColor: b.bg, color: b.color, border: b.border || 'none', fontSize: '9px', fontWeight: 800, padding: '3px 10px', borderRadius: '100px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{b.label}</span>)}
    </div>
  )
}

function FeaturedCard({ listing }: { listing: typeof listings[0] }) {
  const [liked, setLiked] = useState(false)
  const [hovered, setHovered] = useState(false)
  return (
    <article onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{ backgroundColor: 'white', border: '1px solid rgba(45,212,191,0.1)', borderRadius: '32px', overflow: 'hidden', display: 'flex', flexDirection: 'column', boxShadow: hovered ? '0 20px 60px rgba(45,212,191,0.1)' : '0 2px 8px rgba(0,0,0,0.04)', transition: 'all 0.3s' }}>
      <div style={{ position: 'relative', height: '360px', overflow: 'hidden', backgroundColor: '#f1f5f9' }}>
        <img src={listing.image} alt={listing.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s', transform: hovered ? 'scale(1.04)' : 'scale(1)' }} />
        <div style={{ position: 'absolute', top: '20px', left: '20px' }}><BadgeRow badges={listing.badges} /></div>
        <button onClick={() => setLiked(!liked)} style={{ position: 'absolute', top: '20px', right: '20px', padding: '10px', backgroundColor: 'rgba(255,255,255,0.9)', borderRadius: '50%', border: 'none', cursor: 'pointer', fontSize: '16px', color: liked ? '#ef4444' : '#9ca3af' }}>{liked ? '♥' : '♡'}</button>
      </div>
      <div style={{ padding: '28px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          <p style={{ fontSize: '10px', fontWeight: 700, color: '#2dd4bf', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '4px' }}>{listing.brand}</p>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
            <h2 style={{ fontSize: '22px', fontWeight: 900, color: '#111827', letterSpacing: '-0.02em', lineHeight: 1.2 }}>{listing.title}</h2>
            <div style={{ fontSize: '22px', fontWeight: 900, color: '#2dd4bf', whiteSpace: 'nowrap', paddingLeft: '12px' }}>{listing.price} <span style={{ fontSize: '12px' }}>MAD</span></div>
          </div>
          {listing.specs && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '20px', backgroundColor: 'rgba(45,212,191,0.05)', padding: '20px', borderRadius: '16px' }}>
              {listing.specs.map((spec, i) => (
                <div key={i}>
                  <div style={{ fontSize: '9px', color: '#9ca3af', textTransform: 'uppercase', fontWeight: 700, marginBottom: '3px' }}>{spec.label}</div>
                  <div style={{ fontSize: '13px', fontWeight: 800, color: '#1f2937' }}>{spec.value}</div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div>
          <div style={{ fontSize: '11px', color: '#9ca3af', paddingTop: '16px', borderTop: '1px solid #f3f4f6', marginBottom: '12px' }}>📍 {listing.location} • {listing.date}</div>
          <CardButtons />
        </div>
      </div>
    </article>
  )
}

function StandardCard({ listing }: { listing: any }) {
  const [liked, setLiked] = useState(false)
  const [hovered, setHovered] = useState(false)
  return (
    <article onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '28px', overflow: 'hidden', display: 'flex', flexDirection: 'column', boxShadow: hovered ? '0 16px 40px rgba(0,0,0,0.08)' : '0 1px 4px rgba(0,0,0,0.04)', transition: 'all 0.3s' }}>
      <div style={{ position: 'relative', height: '220px', backgroundColor: '#f9fafb', overflow: 'hidden' }}>
        <img src={listing.image} alt={listing.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s', transform: hovered ? 'scale(1.05)' : 'scale(1)' }} />
        <div style={{ position: 'absolute', top: '14px', left: '14px' }}><BadgeRow badges={listing.badges} /></div>
        <button onClick={() => setLiked(!liked)} style={{ position: 'absolute', top: '14px', right: '14px', padding: '8px', backgroundColor: 'rgba(255,255,255,0.9)', borderRadius: '50%', border: 'none', cursor: 'pointer', fontSize: '14px', color: liked ? '#ef4444' : '#9ca3af' }}>{liked ? '♥' : '♡'}</button>
      </div>
      <div style={{ padding: '18px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          <p style={{ fontSize: '9px', fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '3px' }}>{listing.brand}</p>
          <h2 style={{ fontSize: '15px', fontWeight: 800, color: '#111827', marginBottom: '6px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{listing.title}</h2>
          <div style={{ fontSize: '20px', fontWeight: 900, color: '#2dd4bf', marginBottom: '10px' }}>{listing.price} <span style={{ fontSize: '11px', textTransform: 'uppercase', color: '#9ca3af', fontWeight: 400 }}>MAD</span></div>
          {listing.tags && <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '16px' }}>{listing.tags.map((t: string, i: number) => <span key={i} style={{ backgroundColor: '#f0fdfa', color: '#0d9488', fontSize: '9px', fontWeight: 700, padding: '3px 8px', borderRadius: '100px' }}>{t}</span>)}</div>}
        </div>
        <CardButtons />
      </div>
    </article>
  )
}

export default function MobilesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = React.use(params)
  const [activeSeller, setActiveSeller] = useState('All Sellers')

  return (
    <div style={{ fontFamily: 'Inter, system-ui, sans-serif', backgroundColor: '#f4fbf8', minHeight: '100vh' }}>
      <main style={{ maxWidth: '1280px', margin: '0 auto', padding: '32px 24px 80px' }}>

        {/* Breadcrumb */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#64748b', marginBottom: '24px' }}>
          <Link href={`/${locale}`} style={{ color: '#2dd4bf', textDecoration: 'none', fontWeight: 600 }}>Home</Link>
          <span>›</span>
          <Link href={`/${locale}/electronics`} style={{ color: '#2dd4bf', textDecoration: 'none', fontWeight: 600 }}>Electronics</Link>
          <span>›</span>
          <span style={{ color: '#0f172a', fontWeight: 700 }}>Mobiles & Tablets</span>
        </nav>

        {/* Title + Sort */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: 900, color: '#111827', letterSpacing: '-0.02em' }}>
            Mobiles & Tablets in Morocco <span style={{ color: '#9ca3af', fontWeight: 400, fontSize: '16px' }}>— 5,475 Ads</span>
          </h1>
          <div style={{ display: 'flex', gap: '10px' }}>
            {['⇅ Sort Default', '🔖 Save Search'].map(btn => (
              <button key={btn} style={{ fontSize: '13px', fontWeight: 600, color: '#374151', backgroundColor: 'white', border: '1px solid #e5e7eb', padding: '8px 16px', borderRadius: '100px', cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>{btn}</button>
            ))}
          </div>
        </div>

        {/* Seller Tabs */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '28px' }}>
          {['All Sellers', 'Individuals', 'Businesses'].map(tab => (
            <button key={tab} onClick={() => setActiveSeller(tab)} style={{ padding: '9px 22px', borderRadius: '100px', fontSize: '13px', fontWeight: 700, border: 'none', cursor: 'pointer', fontFamily: 'Inter, sans-serif', transition: 'all 0.15s', backgroundColor: activeSeller === tab ? '#2dd4bf' : 'white', color: activeSeller === tab ? 'white' : '#4b5563', boxShadow: activeSeller === tab ? '0 4px 12px rgba(45,212,191,0.25)' : '0 1px 3px rgba(0,0,0,0.06)' }}>{tab}</button>
          ))}
        </div>

        {/* BENTO GRID */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '20px' }}>
          <div style={{ gridColumn: 'span 8' }}><FeaturedCard listing={listings[0]} /></div>
          <div style={{ gridColumn: 'span 4', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <StandardCard listing={listings[1]} />
            <StandardCard listing={listings[2]} />
          </div>

          {/* Electro Pro Banner */}
          <div style={{ gridColumn: 'span 12', position: 'relative', height: '300px', borderRadius: '32px', overflow: 'hidden' }}>
            <img src="https://images.pexels.com/photos/1029757/pexels-photo-1029757.jpeg?auto=compress&w=1400" alt="Electro Pro" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(0,0,0,0.65), rgba(0,0,0,0.1))' }} />
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', padding: '40px' }}>
              <div style={{ backgroundColor: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.2)', padding: '32px', borderRadius: '20px', maxWidth: '440px' }}>
                <span style={{ color: '#2dd4bf', fontWeight: 800, fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.2em', display: 'block', marginBottom: '12px' }}>Official Partnership</span>
                <h2 style={{ fontSize: '28px', fontWeight: 900, color: 'white', marginBottom: '10px', letterSpacing: '-0.02em' }}>SouKni Electro Pro</h2>
                <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '15px', marginBottom: '24px', lineHeight: 1.6 }}>The gold standard for premium technology and verified electronics.</p>
                <button style={{ backgroundColor: '#2dd4bf', color: 'white', border: 'none', padding: '12px 28px', borderRadius: '100px', fontWeight: 800, fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.08em', cursor: 'pointer' }}>Discover Premium</button>
              </div>
            </div>
          </div>

          <div style={{ gridColumn: 'span 6' }}><StandardCard listing={listings[3]} /></div>
          <div style={{ gridColumn: 'span 6' }}><StandardCard listing={listings[4]} /></div>
          <div style={{ gridColumn: 'span 8' }}><StandardCard listing={listings[5]} /></div>
          <div style={{ gridColumn: 'span 4', backgroundColor: 'white', border: '2px solid rgba(45,212,191,0.12)', borderRadius: '28px', padding: '28px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
            <div style={{ fontSize: '36px', marginBottom: '16px' }}>🛡️</div>
            <h4 style={{ fontSize: '17px', fontWeight: 800, color: '#111827', marginBottom: '8px' }}>Verify your SouKni account</h4>
            <p style={{ fontSize: '13px', color: '#6b7280', marginBottom: '20px', lineHeight: 1.5 }}>Gain trust, get more visibility and boost your sales with our Verified badge.</p>
            <button style={{ width: '100%', backgroundColor: '#2dd4bf', color: 'white', border: 'none', padding: '12px', borderRadius: '100px', fontWeight: 800, fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.08em', cursor: 'pointer' }}>Get Verified Now</button>
          </div>

          {listings.slice(6).map(l => <div key={l.id} style={{ gridColumn: 'span 4' }}><StandardCard listing={l} /></div>)}
        </div>

        {/* Pagination */}
        <div style={{ marginTop: '40px', display: 'flex', justifyContent: 'center' }}>
          <nav style={{ display: 'inline-flex', backgroundColor: 'white', padding: '6px', borderRadius: '100px', gap: '4px', border: '1px solid #f3f4f6' }}>
            {['‹', '1', '2', '3', '...', '›'].map((p, i) => (
              <button key={i} style={{ width: '38px', height: '38px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: p === '1' ? 900 : 600, backgroundColor: p === '1' ? '#2dd4bf' : 'transparent', color: p === '1' ? 'white' : '#4b5563', border: 'none', borderRadius: '100px', cursor: 'pointer' }}>{p}</button>
            ))}
          </nav>
        </div>
      </main>
    </div>
  )
}
