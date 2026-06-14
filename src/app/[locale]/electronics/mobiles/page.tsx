'use client'

import React, { useState } from 'react'
import Link from 'next/link'

const listings = [
  {
    id: '1', brand: 'Samsung', title: 'Galaxy Tab S9 Ultra', price: '4,500', condition: null,
    badges: [{ label: 'Featured', bg: '#2dd4bf', color: 'white' }, { label: 'Verified', bg: '#facc15', color: 'white' }],
    specs: [{ label: 'Age', value: '1 Year' }, { label: 'Model', value: 'S9 Ultra' }, { label: 'Storage', value: '512 GB' }, { label: 'Warranty', value: 'Yes' }],
    location: 'Casablanca', date: '12 June 2024', featured: true,
    image: 'https://images.pexels.com/photos/1334597/pexels-photo-1334597.jpeg?auto=compress&w=800',
  },
  {
    id: '2', brand: 'Apple', title: 'iPhone 15 Pro Max 256GB', price: '12,900', condition: 'New',
    badges: [{ label: 'New', bg: 'rgba(45,212,191,0.1)', color: '#2dd4bf', border: '1px solid rgba(45,212,191,0.2)' }],
    tags: ['Brand New', '256 GB', '1yr Warranty'],
    image: 'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&w=600',
  },
  {
    id: '3', brand: 'Huawei', title: 'Huawei Pura 70 Ultra + Watch', price: '6,400', condition: 'Used',
    badges: [{ label: 'Used', bg: 'rgba(229,231,235,0.8)', color: '#4b5563', border: '1px solid #e5e7eb' }],
    tags: ['1 Year Old', '512 GB'],
    image: 'https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg?auto=compress&w=600',
  },
  {
    id: '4', brand: 'Samsung', title: 'S24 Ultra Titanium Gray', price: '11,500', condition: null,
    badges: [{ label: 'Verified', bg: '#facc15', color: 'white' }],
    tags: ['Brand New', '512 GB', '2yr Warranty'],
    image: 'https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg?auto=compress&w=600',
    half: true,
  },
  {
    id: '5', brand: 'Apple', title: 'iPad Pro 13-inch (M4)', price: '14,900', condition: null,
    badges: [{ label: 'New', bg: '#2dd4bf', color: 'white' }],
    tags: ['Brand New', '1 TB'],
    image: 'https://images.pexels.com/photos/1334597/pexels-photo-1334597.jpeg?auto=compress&w=600',
    half: true,
  },
  {
    id: '6', brand: 'Google', title: 'Pixel 9 Pro XL Porcelain', price: '10,200', condition: null,
    badges: [{ label: 'Verified', bg: '#facc15', color: 'white' }],
    tags: ['New', '256 GB'],
    image: 'https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&w=600',
    wide: true,
  },
  {
    id: '7', brand: 'Apple', title: 'MacBook Pro 14" (M3 Max)', price: '32,500',
    badges: [{ label: 'Verified', bg: '#2dd4bf', color: 'white' }, { label: 'New', bg: 'rgba(45,212,191,0.1)', color: '#2dd4bf', border: '1px solid rgba(45,212,191,0.2)' }],
    tags: ['M3 Max', '36GB RAM', '1TB SSD'],
    image: 'https://images.pexels.com/photos/303383/pexels-photo-303383.jpeg?auto=compress&w=500',
  },
  {
    id: '8', brand: 'Sony', title: 'WH-1000XM5 Wireless', price: '3,450',
    badges: [{ label: 'Verified', bg: '#2dd4bf', color: 'white' }, { label: 'New', bg: 'rgba(45,212,191,0.1)', color: '#2dd4bf', border: '1px solid rgba(45,212,191,0.2)' }],
    tags: ['30h Battery', 'ANC'],
    image: 'https://images.pexels.com/photos/3945667/pexels-photo-3945667.jpeg?auto=compress&w=500',
  },
  {
    id: '9', brand: 'Nintendo', title: 'Switch OLED Model', price: '3,200',
    badges: [{ label: 'Verified', bg: '#2dd4bf', color: 'white' }, { label: 'Used', bg: 'rgba(229,231,235,0.8)', color: '#4b5563', border: '1px solid #e5e7eb' }],
    tags: ['64GB', 'OLED Screen'],
    image: 'https://images.pexels.com/photos/371924/pexels-photo-371924.jpeg?auto=compress&w=500',
  },
]

const navLinks = ['Motors', 'Property', 'Jobs', 'Services', 'Mobiles & Computers', 'The Vault']

function CardButtons() {
  return (
    <div style={{ display: 'flex', gap: '12px' }}>
      <button style={{ flex: 1, backgroundColor: '#2dd4bf', color: 'white', border: 'none', padding: '12px', borderRadius: '16px', fontWeight: 900, fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontFamily: 'Inter, sans-serif', transition: 'background 0.2s' }}
        onMouseEnter={e => e.currentTarget.style.backgroundColor = '#14b8a6'}
        onMouseLeave={e => e.currentTarget.style.backgroundColor = '#2dd4bf'}
      >📱 WhatsApp</button>
      <button style={{ flex: 1, backgroundColor: 'rgba(238,245,242,0.8)', color: '#2dd4bf', border: 'none', padding: '12px', borderRadius: '16px', fontWeight: 900, fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontFamily: 'Inter, sans-serif', transition: 'all 0.2s' }}
        onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#2dd4bf'; e.currentTarget.style.color = 'white' }}
        onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'rgba(238,245,242,0.8)'; e.currentTarget.style.color = '#2dd4bf' }}
      >💬 SouKni Chat</button>
    </div>
  )
}

function BadgeRow({ badges }: { badges: any[] }) {
  return (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      {badges.map((b, i) => (
        <span key={i} style={{ backgroundColor: b.bg, color: b.color, border: b.border || 'none', fontSize: '10px', fontWeight: 900, padding: '4px 12px', borderRadius: '100px', textTransform: 'uppercase', letterSpacing: '0.1em', backdropFilter: 'blur(4px)' }}>
          {b.label}
        </span>
      ))}
    </div>
  )
}

function TagRow({ tags }: { tags: string[] }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '24px' }}>
      {tags.map((tag, i) => (
        <span key={i} style={{ backgroundColor: '#eef5f2', color: '#4b5563', fontSize: '10px', fontWeight: 700, padding: '4px 12px', borderRadius: '100px' }}>{tag}</span>
      ))}
    </div>
  )
}

function FeaturedCard({ listing }: { listing: typeof listings[0] }) {
  const [liked, setLiked] = useState(false)
  const [hovered, setHovered] = useState(false)

  return (
    <article
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        backgroundColor: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(8px)',
        border: '1px solid rgba(45,212,191,0.1)', borderRadius: '40px', overflow: 'hidden',
        display: 'flex', flexDirection: 'column',
        boxShadow: hovered ? '0 20px 60px rgba(45,212,191,0.1)' : '0 2px 8px rgba(0,0,0,0.04)',
        transition: 'all 0.3s', fontFamily: 'Inter, sans-serif',
      }}
    >
      <div style={{ position: 'relative', height: '400px', overflow: 'hidden', backgroundColor: '#f1f5f9' }}>
        <img src={listing.image} alt={listing.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.7s', transform: hovered ? 'scale(1.05)' : 'scale(1)' }}
        />
        <div style={{ position: 'absolute', top: '24px', left: '24px' }}><BadgeRow badges={listing.badges} /></div>
        <button onClick={() => setLiked(!liked)}
          style={{ position: 'absolute', top: '24px', right: '24px', padding: '12px', backgroundColor: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(4px)', borderRadius: '50%', border: 'none', cursor: 'pointer', fontSize: '18px', color: liked ? '#ef4444' : '#9ca3af', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', transition: 'color 0.2s' }}
        >{liked ? '♥' : '♡'}</button>
      </div>
      <div style={{ padding: '32px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '16px' }}>
            <div>
              <p style={{ fontSize: '11px', fontWeight: 700, color: '#2dd4bf', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '4px' }}>{listing.brand}</p>
              <h2 style={{ fontSize: '28px', fontWeight: 900, color: '#111827', letterSpacing: '-0.02em', lineHeight: 1.2 }}>{listing.title}</h2>
            </div>
            <div style={{ fontSize: '28px', fontWeight: 900, color: '#2dd4bf', whiteSpace: 'nowrap', paddingLeft: '16px' }}>
              {listing.price} <span style={{ fontSize: '14px' }}>MAD</span>
            </div>
          </div>
          {listing.specs && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '32px', backgroundColor: 'rgba(238,245,242,0.5)', padding: '24px', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.4)' }}>
              {listing.specs.map((spec, i) => (
                <div key={i}>
                  <div style={{ fontSize: '10px', color: '#9ca3af', textTransform: 'uppercase', fontWeight: 700, marginBottom: '4px' }}>{spec.label}</div>
                  <div style={{ fontSize: '14px', fontWeight: 900, color: '#1f2937' }}>{spec.value}</div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #f3f4f6', paddingTop: '24px', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#9ca3af', fontStyle: 'italic' }}>
              <span style={{ color: '#2dd4bf' }}>📍</span>
              {listing.location} • {listing.date}
            </div>
          </div>
          <CardButtons />
        </div>
      </div>
    </article>
  )
}

function StandardCard({ listing, style: extraStyle }: { listing: any, style?: React.CSSProperties }) {
  const [liked, setLiked] = useState(false)
  const [hovered, setHovered] = useState(false)

  return (
    <article
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        backgroundColor: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(8px)',
        border: '1px solid rgba(229,231,235,1)', borderRadius: '40px', overflow: 'hidden',
        display: 'flex', flexDirection: 'column',
        boxShadow: hovered ? '0 20px 40px rgba(0,0,0,0.08)' : '0 1px 4px rgba(0,0,0,0.04)',
        transition: 'all 0.3s', fontFamily: 'Inter, sans-serif',
        ...extraStyle,
      }}
    >
      <div style={{ position: 'relative', height: '256px', backgroundColor: '#f9fafb', overflow: 'hidden' }}>
        <img src={listing.image} alt={listing.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s', transform: hovered ? 'scale(1.05)' : 'scale(1)' }}
        />
        <div style={{ position: 'absolute', top: '16px', left: '16px' }}><BadgeRow badges={listing.badges} /></div>
        <button onClick={() => setLiked(!liked)}
          style={{ position: 'absolute', top: '16px', right: '16px', padding: '10px', backgroundColor: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(4px)', borderRadius: '50%', border: 'none', cursor: 'pointer', fontSize: '16px', color: liked ? '#ef4444' : '#9ca3af', boxShadow: '0 1px 4px rgba(0,0,0,0.1)', transition: 'color 0.2s' }}
        >{liked ? '♥' : '♡'}</button>
      </div>
      <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          <p style={{ fontSize: '10px', fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '4px' }}>{listing.brand}</p>
          <h2 style={{ fontSize: '18px', fontWeight: 900, color: '#111827', marginBottom: '8px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{listing.title}</h2>
          <div style={{ fontSize: '22px', fontWeight: 900, color: '#2dd4bf', marginBottom: '16px' }}>{listing.price} <span style={{ fontSize: '12px', textTransform: 'uppercase' }}>mad</span></div>
          {listing.tags && <TagRow tags={listing.tags} />}
        </div>
        <CardButtons />
      </div>
    </article>
  )
}

export default function MobilesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = React.use(params)
  const [currentPage, setCurrentPage] = useState(1)
  const [activeSeller, setActiveSeller] = useState('All Sellers')

  return (
    <div style={{ fontFamily: 'Inter, system-ui, sans-serif', backgroundColor: '#f4fbf8', minHeight: '100vh' }}>

      {/* HEADER */}
      <header style={{ backgroundColor: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(45,212,191,0.1)', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '64px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
              <Link href={`/${locale}`} style={{ textDecoration: 'none' }}>
                <span style={{ fontSize: '22px', fontWeight: 900, color: '#2dd4bf', letterSpacing: '-0.05em' }}>SOUKNI</span>
              </Link>
              <nav style={{ display: 'flex', gap: '24px' }}>
                {navLinks.map(item => (
                  <a key={item} href="#" style={{ fontSize: '14px', fontWeight: 600, color: item === 'Mobiles & Computers' ? '#2dd4bf' : '#374151', textDecoration: 'none', borderBottom: item === 'Mobiles & Computers' ? '2px solid #2dd4bf' : '2px solid transparent', paddingBottom: '2px', transition: 'color 0.2s' }}
                    onMouseEnter={e => e.currentTarget.style.color = '#2dd4bf'}
                    onMouseLeave={e => e.currentTarget.style.color = item === 'Mobiles & Computers' ? '#2dd4bf' : '#374151'}
                  >{item}</a>
                ))}
              </nav>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <button style={{ color: '#7A7A7A', background: 'none', border: 'none', cursor: 'pointer', fontSize: '20px' }}>🔔</button>
              <button style={{ backgroundColor: '#2dd4bf', color: 'white', border: 'none', padding: '8px 18px', borderRadius: '8px', fontWeight: 700, fontSize: '13px', cursor: 'pointer', fontFamily: 'Inter, sans-serif', transition: 'background 0.2s', boxShadow: '0 1px 4px rgba(45,212,191,0.2)' }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = '#14b8a6'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = '#2dd4bf'}
              >Place Your Ad</button>
            </div>
          </div>
        </div>
      </header>

      {/* FILTER BAR */}
      <div style={{ backgroundColor: 'white', borderBottom: '1px solid #f3f4f6', padding: '16px 0', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 32px', display: 'grid', gridTemplateColumns: '1fr 2fr 1fr 1fr 1fr', gap: '12px' }}>
          {[
            { label: 'City', type: 'select', options: ['Casablanca', 'Rabat', 'Marrakech'] },
            { label: 'Keyword', type: 'input', placeholder: 'Search for mobiles, tablets...' },
            { label: 'Neighborhood', type: 'input', placeholder: 'Enter location' },
            { label: 'Price (MAD)', type: 'select', options: ['Select', '0 - 1000', '1000 - 5000'] },
            { label: 'Filters', type: 'static', value: '1 Filter Selected' },
          ].map((field, i) => (
            <div key={i}>
              <label style={{ display: 'block', fontSize: '10px', textTransform: 'uppercase', fontWeight: 700, color: '#9ca3af', marginBottom: '4px' }}>{field.label}</label>
              {field.type === 'select' ? (
                <select style={{ width: '100%', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '8px', fontSize: '14px', outline: 'none', fontFamily: 'Inter, sans-serif', backgroundColor: 'white' }}>
                  {field.options?.map(opt => <option key={opt}>{opt}</option>)}
                </select>
              ) : field.type === 'input' ? (
                <input type="text" placeholder={field.placeholder} style={{ width: '100%', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '8px', fontSize: '14px', outline: 'none', fontFamily: 'Inter, sans-serif', boxSizing: 'border-box' }} />
              ) : (
                <button style={{ width: '100%', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '8px', fontSize: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'white', cursor: 'pointer', fontFamily: 'Inter, sans-serif', color: '#4b5563' }}>
                  {field.value} <span>▾</span>
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      <main style={{ maxWidth: '1280px', margin: '0 auto', padding: '32px' }}>

        {/* TITLE */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
          <h1 style={{ fontSize: '24px', fontWeight: 900, color: '#111827', letterSpacing: '-0.02em' }}>
            Mobiles & Tablets in Rabat <span style={{ color: '#9ca3af', fontWeight: 400, fontSize: '16px', marginLeft: '8px' }}>— 5,475 Ads</span>
          </h1>
          <div style={{ display: 'flex', gap: '12px' }}>
            {['⇅ Sort Default', '🔖 Save Search'].map(btn => (
              <button key={btn} style={{ fontSize: '14px', fontWeight: 600, color: '#374151', backgroundColor: 'white', border: '1px solid #e5e7eb', padding: '8px 16px', borderRadius: '100px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontFamily: 'Inter, sans-serif', transition: 'background 0.15s' }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = '#f9fafb'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = 'white'}
              >{btn}</button>
            ))}
          </div>
        </div>

        {/* SELLER TABS */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '32px' }}>
          {['All Sellers', 'Individuals', 'Businesses'].map(tab => (
            <button key={tab} onClick={() => setActiveSeller(tab)} style={{ padding: '10px 24px', borderRadius: '100px', fontSize: '14px', fontWeight: 700, border: 'none', cursor: 'pointer', fontFamily: 'Inter, sans-serif', transition: 'all 0.15s', backgroundColor: activeSeller === tab ? '#2dd4bf' : 'white', color: activeSeller === tab ? 'white' : '#4b5563', boxShadow: activeSeller === tab ? '0 4px 12px rgba(45,212,191,0.2)' : '0 1px 3px rgba(0,0,0,0.06)', borderWidth: activeSeller === tab ? 0 : 1, borderStyle: 'solid', borderColor: '#f3f4f6' }}>
              {tab}
            </button>
          ))}
        </div>

        {/* BENTO GRID */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '24px' }}>

          {/* Featured: col-span-8, row-span-2 */}
          <div style={{ gridColumn: 'span 8' }}>
            <FeaturedCard listing={listings[0]} />
          </div>

          {/* Standard: col-span-4 */}
          <div style={{ gridColumn: 'span 4', display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <StandardCard listing={listings[1]} />
            <StandardCard listing={listings[2]} />
          </div>

          {/* Full-width: Electro Pro Banner */}
          <div style={{ gridColumn: 'span 12', position: 'relative', height: '350px', borderRadius: '40px', overflow: 'hidden', border: '1px solid rgba(45,212,191,0.2)', boxShadow: '0 20px 60px rgba(45,212,191,0.1)' }}>
            <img src="https://images.pexels.com/photos/1029757/pexels-photo-1029757.jpeg?auto=compress&w=1400" alt="Electro Pro" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 1s' }}
              onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
            />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(0,0,0,0.6), rgba(0,0,0,0.1))' }} />
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', padding: '48px' }}>
              <div style={{ backgroundColor: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.2)', padding: '40px', borderRadius: '24px', maxWidth: '480px' }}>
                <span style={{ color: '#2dd4bf', fontWeight: 900, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.2em', display: 'block', marginBottom: '16px' }}>Official Partnership</span>
                <h2 style={{ fontSize: '36px', fontWeight: 900, color: 'white', marginBottom: '12px', letterSpacing: '-0.03em' }}>SouKni Electro Pro</h2>
                <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '17px', marginBottom: '32px', lineHeight: 1.6, fontWeight: 500 }}>Experience the gold standard for premium technology and verified electronics.</p>
                <button style={{ backgroundColor: '#2dd4bf', color: 'white', border: 'none', padding: '14px 36px', borderRadius: '100px', fontWeight: 900, fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.1em', cursor: 'pointer', fontFamily: 'Inter, sans-serif', boxShadow: '0 8px 24px rgba(45,212,191,0.3)', transition: 'transform 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                >Discover Premium</button>
              </div>
            </div>
          </div>

          {/* 2 half cards */}
          <div style={{ gridColumn: 'span 6' }}><StandardCard listing={listings[3]} /></div>
          <div style={{ gridColumn: 'span 6' }}><StandardCard listing={listings[4]} /></div>

          {/* Wide card (8) + verify banner (4) */}
          <div style={{ gridColumn: 'span 8' }}><StandardCard listing={listings[5]} /></div>
          <div style={{ gridColumn: 'span 4', backgroundColor: 'white', border: '2px solid rgba(45,212,191,0.1)', borderRadius: '40px', padding: '32px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', boxShadow: '0 8px 24px rgba(45,212,191,0.05)' }}>
            <div style={{ width: '64px', height: '64px', backgroundColor: 'rgba(45,212,191,0.1)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px', fontSize: '28px' }}>🛡️</div>
            <h4 style={{ fontSize: '18px', fontWeight: 900, color: '#111827', lineHeight: 1.3, marginBottom: '8px' }}>Verify your SouKni account</h4>
            <p style={{ fontSize: '14px', color: '#6b7280', fontWeight: 500, marginBottom: '24px', lineHeight: 1.5 }}>Gain instant trust, get more visibility and boost your sales with our 'Verified' badge.</p>
            <button style={{ width: '100%', backgroundColor: '#2dd4bf', color: 'white', border: 'none', padding: '14px', borderRadius: '100px', fontWeight: 900, fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.1em', cursor: 'pointer', fontFamily: 'Inter, sans-serif', boxShadow: '0 4px 12px rgba(45,212,191,0.2)', transition: 'background 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = '#14b8a6'}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = '#2dd4bf'}
            >Get Verified Now</button>
          </div>

          {/* Auto Pro Banner */}
          <div style={{ gridColumn: 'span 12', position: 'relative', height: '350px', borderRadius: '40px', overflow: 'hidden', border: '1px solid #f3f4f6' }}>
            <img src="https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&w=1400" alt="Auto Pro" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 1s' }}
              onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
            />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to left, rgba(0,0,0,0.6), rgba(0,0,0,0.1))' }} />
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', padding: '48px' }}>
              <div style={{ backgroundColor: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.2)', padding: '40px', borderRadius: '24px', maxWidth: '480px', textAlign: 'right' }}>
                <span style={{ color: '#2dd4bf', fontWeight: 900, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.2em', display: 'block', marginBottom: '16px' }}>Automotive Excellence</span>
                <h2 style={{ fontSize: '36px', fontWeight: 900, color: 'white', marginBottom: '12px', letterSpacing: '-0.03em' }}>SouKni Auto Pro</h2>
                <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '17px', marginBottom: '32px', lineHeight: 1.6, fontWeight: 500 }}>The Gold Standard for premium automotive services and luxury vehicles.</p>
                <button style={{ backgroundColor: 'white', color: '#111827', border: 'none', padding: '14px 36px', borderRadius: '100px', fontWeight: 900, fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.1em', cursor: 'pointer', fontFamily: 'Inter, sans-serif', boxShadow: '0 8px 24px rgba(0,0,0,0.2)', transition: 'all 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#2dd4bf'; e.currentTarget.style.color = 'white' }}
                  onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'white'; e.currentTarget.style.color = '#111827' }}
                >Explore Collection</button>
              </div>
            </div>
          </div>

          {/* Last 3 cards */}
          {listings.slice(6).map(l => (
            <div key={l.id} style={{ gridColumn: 'span 4' }}><StandardCard listing={l} /></div>
          ))}

        </div>

        {/* PAGINATION */}
        <div style={{ marginTop: '48px', display: 'flex', justifyContent: 'center' }}>
          <nav style={{ display: 'inline-flex', backgroundColor: 'white', boxShadow: '0 4px 12px rgba(45,212,191,0.05)', padding: '8px', borderRadius: '100px', gap: '4px', border: '1px solid #f3f4f6' }}>
            <button style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', color: '#9ca3af', background: 'none', border: 'none', borderRadius: '100px', cursor: 'pointer', transition: 'color 0.15s' }}
              onMouseEnter={e => e.currentTarget.style.color = '#2dd4bf'}
              onMouseLeave={e => e.currentTarget.style.color = '#9ca3af'}
            >‹</button>
            {[1, 2, 3].map(p => (
              <button key={p} onClick={() => setCurrentPage(p)} style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: currentPage === p ? 900 : 700, backgroundColor: currentPage === p ? '#2dd4bf' : 'transparent', color: currentPage === p ? 'white' : '#4b5563', border: 'none', borderRadius: '100px', cursor: 'pointer', fontFamily: 'Inter, sans-serif', boxShadow: currentPage === p ? '0 4px 12px rgba(45,212,191,0.2)' : 'none', transition: 'all 0.15s' }}>{p}</button>
            ))}
            <span style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9ca3af', fontSize: '14px' }}>...</span>
            <button style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', color: '#9ca3af', background: 'none', border: 'none', borderRadius: '100px', cursor: 'pointer', transition: 'color 0.15s' }}
              onMouseEnter={e => e.currentTarget.style.color = '#2dd4bf'}
              onMouseLeave={e => e.currentTarget.style.color = '#9ca3af'}
            >›</button>
          </nav>
        </div>

      </main>

      {/* APP DOWNLOAD */}
      <section style={{ backgroundColor: '#2dd4bf', padding: '64px 0', marginTop: '64px', overflow: 'hidden' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '48px', flexWrap: 'wrap' }}>
          <div>
            <h2 style={{ fontSize: '52px', fontWeight: 900, color: 'white', marginBottom: '16px', letterSpacing: '-0.04em', lineHeight: 1.1 }}>Join the<br/>SouKni Family</h2>
            <p style={{ color: '#99f6e4', fontSize: '20px', maxWidth: '480px', fontWeight: 500, opacity: 0.9, lineHeight: 1.6, marginBottom: '40px' }}>Download our premium mobile experience for real-time alerts and exclusive marketplace deals.</p>
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              {[{ icon: '🍎', label: 'App Store', sub: 'Download on the' }, { icon: '▶', label: 'Google Play', sub: 'Get it on' }].map(btn => (
                <button key={btn.label} style={{ backgroundColor: 'black', border: '1px solid rgba(255,255,255,0.1)', padding: '12px 24px', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', transition: 'all 0.2s', color: 'white' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.transform = 'translateY(0)' }}
                >
                  <span style={{ fontSize: '28px' }}>{btn.icon}</span>
                  <div style={{ textAlign: 'left' }}>
                    <div style={{ fontSize: '10px', opacity: 0.7, textTransform: 'uppercase', lineHeight: 1 }}>{btn.sub}</div>
                    <div style={{ fontSize: '17px', fontWeight: 700, lineHeight: 1.3 }}>{btn.label}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
          <div style={{ width: '288px', height: '480px', backgroundColor: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(24px)', borderRadius: '48px', border: '12px solid rgba(255,255,255,0.2)', boxShadow: '0 20px 60px rgba(0,0,0,0.15)' }} />
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ backgroundColor: '#7A7A7A', color: 'white', padding: '64px 0' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 32px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '4fr 2fr 2fr 2fr 2fr', gap: '48px', marginBottom: '64px' }}>
            <div>
              <div style={{ fontSize: '24px', fontWeight: 900, color: '#2dd4bf', letterSpacing: '-0.05em', marginBottom: '24px' }}>SOUKNI</div>
              <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.8)', lineHeight: 1.7, marginBottom: '32px', maxWidth: '280px' }}>Morocco's leading destination for tech, automotive, and lifestyle trade. Built for safety, speed, and reliability.</p>
              <div style={{ display: 'flex', gap: '12px' }}>
                <a href="#" style={{ fontSize: '20px', color: 'rgba(255,255,255,0.7)', textDecoration: 'none', transition: 'color 0.15s' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#2dd4bf'}
                  onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.7)'}
                >📘</a>
              </div>
            </div>
            {[
              { title: 'Company', links: ['About Us', 'Careers', 'SouKni Pro'] },
              { title: 'Support', links: ['Help Center', 'Safety Tips', 'Contact Us'] },
              { title: 'Legal', links: ['Terms of Use', 'Privacy Policy'] },
              { title: 'Social', links: ['Facebook'] },
            ].map(col => (
              <div key={col.title}>
                <h4 style={{ fontWeight: 700, textTransform: 'uppercase', fontSize: '12px', letterSpacing: '0.15em', marginBottom: '24px' }}>{col.title}</h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {col.links.map(link => (
                    <li key={link} style={{ marginBottom: '16px' }}>
                      <a href="#" style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)', textDecoration: 'none', transition: 'color 0.15s' }}
                        onMouseEnter={e => e.currentTarget.style.color = 'white'}
                        onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.7)'}
                      >{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
            <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)' }}>© 2026 SouKni Marketplace. All rights reserved.</p>
            <div style={{ display: 'flex', gap: '24px' }}>
              {['Privacy', 'Terms', 'Cookies'].map(link => (
                <a key={link} href="#" style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', textDecoration: 'none', transition: 'color 0.15s' }}
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
