'use client'

import React, { useState } from 'react'
import Link from 'next/link'

const categoryGrid = [
  { label: 'Luxury Motors', count: '9,420', image: 'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&w=500', href: '/en/motors' },
  { label: 'Real Estate', count: '3,150', image: 'https://images.pexels.com/photos/2581922/pexels-photo-2581922.jpeg?auto=compress&w=500', href: '/en/property' },
  { label: 'The Vault', count: '840', image: 'https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&w=500', href: '/en/vault' },
  { label: 'Electronics', count: '12,600', image: 'https://images.pexels.com/photos/303383/pexels-photo-303383.jpeg?auto=compress&w=500', href: '/en/electronics' },
  { label: 'Fashion', count: '5,800', image: 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&w=500', href: '/en/fashion' },
  { label: 'Home & Living', count: '7,200', image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&w=500', href: '/en/home' },
]

const motors = [
  { title: 'BMW M5 Competition', price: '1,250k MAD', badge: 'Diamond Member', meta: 'Casablanca • 2023 • 12k km', image: 'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&w=500' },
  { title: 'Ferrari F8 Tributo', price: '3,400k MAD', badge: 'Diamond Member', meta: 'Marrakech • 2024 • New', image: 'https://images.pexels.com/photos/1638459/pexels-photo-1638459.jpeg?auto=compress&w=500' },
  { title: 'Range Rover HSE', price: '1,850k MAD', badge: 'Diamond Member', meta: 'Rabat • 2022 • 35k km', image: 'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&w=500' },
  { title: 'Porsche Taycan Turbo', price: '2,100k MAD', badge: 'Diamond Member', meta: 'Tangier • 2023 • 5k km', image: 'https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg?auto=compress&w=500' },
]

const mobiles = [
  { title: 'iPhone 15 Pro Max, Titanium Gray, 256GB', price: '12,500 MAD', badge: 'Verified', meta: 'Casablanca • New', image: 'https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&w=500' },
  { title: 'Samsung Galaxy S24 Ultra, Titanium Black, 512GB', price: '11,800 MAD', badge: 'Verified', meta: 'Rabat • New', image: 'https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg?auto=compress&w=500' },
  { title: 'iPad Pro 13-inch (M4), Space Black, 256GB', price: '14,200 MAD', badge: 'Verified', meta: 'Tangier • New', image: 'https://images.pexels.com/photos/1334597/pexels-photo-1334597.jpeg?auto=compress&w=500' },
  { title: 'Google Pixel 9 Pro XL, Porcelain, 128GB', price: '10,500 MAD', badge: 'Verified', meta: 'Marrakech • New', image: 'https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg?auto=compress&w=500' },
]

const property = [
  { title: 'Luxury 5-Bedroom Villa, Marrakech Palmeraie', price: '12,500,000 MAD', badge: 'Diamond Member', meta: 'Marrakech • Sale', image: 'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&w=500' },
  { title: 'Modern 3-Bedroom Apartment, Casablanca Finance City', price: '25,000 MAD/mo', badge: 'Diamond Member', meta: 'Casablanca • Rent', image: 'https://images.pexels.com/photos/1918291/pexels-photo-1918291.jpeg?auto=compress&w=500' },
  { title: 'Traditional Heritage Riad, Rabat Medina', price: '8,900,000 MAD', badge: 'Diamond Member', meta: 'Rabat • Sale', image: 'https://images.pexels.com/photos/2872755/pexels-photo-2872755.jpeg?auto=compress&w=500' },
  { title: 'Premium Penthouse, Tangier Marina', price: '18,500 MAD/mo', badge: 'Diamond Member', meta: 'Tangier • Rent', image: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&w=500' },
]

const vault = [
  { title: 'Patek Philippe Nautilus', price: '1,850k MAD', image: 'https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&w=500' },
  { title: 'Hermès Birkin 35', price: '420k MAD', image: 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&w=500' },
  { title: 'Bronze Modernist Sculpture', price: '125k MAD', image: 'https://images.pexels.com/photos/3094799/pexels-photo-3094799.jpeg?auto=compress&w=500' },
  { title: 'The Macallan 30yr', price: '85k MAD', image: 'https://images.pexels.com/photos/3407777/pexels-photo-3407777.jpeg?auto=compress&w=500' },
]

const testimonials = [
  { text: 'Found my dream apartment in Rabat within 2 days of searching. The interface is miles ahead of anything else in Morocco. Premium experience all around.', author: 'Amine L., Rabat' },
  { text: 'Selling my Porsche was seamless. The Diamond Membership definitely works—I had three serious buyers within the first 24 hours. Highly recommended.', author: 'Sarah B., Casablanca' },
]

function ListingCard({ item, isVault }: { item: any, isVault?: boolean }) {
  const [liked, setLiked] = useState(false)
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        backgroundColor: '#f4fbf8', borderRadius: '40px', overflow: 'hidden',
        border: '1px solid rgba(221,228,225,0.3)',
        boxShadow: hovered ? '0 20px 40px rgba(0,0,0,0.1)' : '0 2px 8px rgba(0,0,0,0.04)',
        transition: 'all 0.3s', fontFamily: 'Inter, sans-serif',
        transform: hovered ? 'scale(0.99)' : 'scale(1)',
      }}
    >
      <div style={{ position: 'relative', height: isVault ? '256px' : '224px', overflow: 'hidden' }}>
        <img src={item.image} alt={item.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.7s', transform: hovered ? 'scale(1.1)' : 'scale(1)' }}
        />
        {item.badge && (
          <div style={{ position: 'absolute', top: '16px', left: '16px' }}>
            <span style={{ backgroundColor: '#006b5f', color: 'white', fontSize: '10px', fontWeight: 700, padding: '4px 10px', borderRadius: '100px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{item.badge}</span>
          </div>
        )}
        <button onClick={() => setLiked(!liked)}
          style={{ position: 'absolute', top: '16px', right: '16px', width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: '18px', color: liked ? '#ba1a1a' : '#3c4a46', transition: 'color 0.2s' }}
        >{liked ? '♥' : '♡'}</button>
      </div>
      <div style={{ padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px', gap: '8px' }}>
          <h4 style={{ fontSize: '17px', fontWeight: 700, color: '#161d1b', lineHeight: 1.3, letterSpacing: '-0.01em', flex: 1 }}>{item.title}</h4>
          <p style={{ color: isVault ? '#8d4f00' : '#006b5f', fontWeight: 700, fontSize: '17px', whiteSpace: 'nowrap' }}>{item.price}</p>
        </div>
        {item.meta && (
          <p style={{ fontSize: '13px', color: '#6b7a76', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '16px' }}>
            📍 {item.meta}
          </p>
        )}
        <div style={{ display: 'flex', gap: '8px', marginTop: item.meta ? '0' : '16px' }}>
          {isVault ? (
            <>
              <button style={{ flex: 1, backgroundColor: '#8d4f00', color: 'white', border: 'none', padding: '10px', borderRadius: '100px', fontWeight: 700, fontSize: '14px', cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>WhatsApp</button>
              <button style={{ width: '44px', height: '40px', border: '2px solid #8d4f00', color: '#8d4f00', backgroundColor: 'transparent', borderRadius: '100px', cursor: 'pointer', fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>✉</button>
            </>
          ) : (
            <>
              <button style={{ flex: 1, backgroundColor: '#006b5f', color: 'white', border: 'none', padding: '10px', borderRadius: '100px', fontWeight: 700, fontSize: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontFamily: 'Inter, sans-serif' }}>💬 WhatsApp</button>
              <button style={{ flex: 1, border: '2px solid #006b5f', color: '#006b5f', backgroundColor: 'transparent', padding: '10px', borderRadius: '100px', fontWeight: 700, fontSize: '14px', cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>Message</button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

function ListingRow({ title, subtitle, items, isVault, bg, viewAllColor }: {
  title: string
  subtitle: string
  items: any[]
  isVault?: boolean
  bg?: string
  viewAllColor?: string
}) {
  return (
    <section style={{ backgroundColor: bg || 'transparent', padding: '64px 0' }}>
      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 40px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '40px' }}>
          <div>
            <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#161d1b', marginBottom: '4px', letterSpacing: '-0.01em' }}>{title}</h2>
            <p style={{ fontSize: '16px', color: '#3c4a46' }}>{subtitle}</p>
          </div>
          <a href="#" style={{ color: viewAllColor || '#006b5f', fontWeight: 700, fontSize: '14px', textDecoration: 'none' }}>View All →</a>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '32px' }}>
          {items.map((item) => (
            <ListingCard key={item.title} item={item} isVault={isVault} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = React.use(params)
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <div style={{ fontFamily: 'Inter, system-ui, sans-serif', backgroundColor: '#f4fbf8', minHeight: '100vh' }}>

      {/* HERO */}
      <section style={{ position: 'relative', height: '560px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        <img src="https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&w=1400" alt="Hero"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0.2))' }} />
        <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', padding: '0 20px', maxWidth: '800px', width: '100%' }}>
          <h1 style={{ fontSize: '52px', fontWeight: 900, color: 'white', letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: '16px' }}>
            Morocco's Premium Marketplace
          </h1>
          <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.85)', marginBottom: '32px' }}>
            Buy and sell luxury motors, property, fashion, electronics and more.
          </p>
          <div style={{ display: 'flex', gap: '8px', maxWidth: '600px', margin: '0 auto', backgroundColor: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(20px)', borderRadius: '100px', padding: '8px' }}>
            <input
              type="text"
              placeholder="Search anything..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              style={{ flex: 1, backgroundColor: 'transparent', border: 'none', outline: 'none', padding: '10px 20px', fontSize: '16px', color: 'white', fontFamily: 'Inter, sans-serif' }}
            />
            <button style={{ backgroundColor: '#2dd4bf', color: '#00574d', border: 'none', padding: '12px 28px', borderRadius: '100px', fontWeight: 700, fontSize: '14px', cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>
              Search
            </button>
          </div>
        </div>
      </section>

      {/* CATEGORY GRID */}
      <section style={{ maxWidth: '1440px', margin: '0 auto', padding: '64px 40px' }}>
        <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#161d1b', marginBottom: '32px', letterSpacing: '-0.01em' }}>Browse by Category</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
          {categoryGrid.map((cat) => (
            <Link key={cat.label} href={`/${locale}${cat.href.replace('/en', '')}`} style={{ textDecoration: 'none' }}>
              <div style={{ position: 'relative', height: '200px', borderRadius: '24px', overflow: 'hidden', cursor: 'pointer' }}>
                <img src={cat.image} alt={cat.label}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0.2), rgba(0,0,0,0))' }} />
                <div style={{ position: 'absolute', bottom: '24px', left: '24px' }}>
                  <p style={{ color: '#62fae3', fontSize: '13px', fontWeight: 600, marginBottom: '4px', letterSpacing: '0.05em' }}>{cat.count} LISTINGS</p>
                  <h3 style={{ color: 'white', fontSize: '22px', fontWeight: 700, letterSpacing: '-0.01em' }}>{cat.label}</h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* LISTING ROWS */}
      <ListingRow title="Featured Motors" subtitle="The finest performance and luxury vehicles in Morocco" items={motors} bg="#eef5f2" />
      <ListingRow title="Featured Mobiles & Tablets" subtitle="Latest high-end devices and tech essentials." items={mobiles} bg="#ffffff" />
      <ListingRow title="Featured Property for Sale & Rent" subtitle="Premium residential and commercial opportunities." items={property} bg="#eef5f2" />

      {/* DIAMOND BANNER */}
      <section style={{ maxWidth: '1440px', margin: '0 auto', padding: '48px 40px' }}>
        <div style={{ position: 'relative', height: '192px', borderRadius: '40px', overflow: 'hidden', display: 'flex', alignItems: 'center', padding: '48px', background: 'linear-gradient(to right, #006b5f, #2dd4bf)' }}>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <h3 style={{ color: 'white', fontSize: '28px', fontWeight: 700, marginBottom: '8px', letterSpacing: '-0.02em' }}>Join the Elite. Become a Diamond Member.</h3>
            <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '16px', marginBottom: '16px' }}>Priority listings, exclusive vault access, and dedicated support.</p>
            <button style={{ backgroundColor: 'white', color: '#006b5f', border: 'none', padding: '12px 32px', borderRadius: '100px', fontWeight: 700, fontSize: '15px', cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>Explore Benefits</button>
          </div>
          <span style={{ position: 'absolute', right: '48px', fontSize: '120px', color: 'rgba(255,255,255,0.1)', lineHeight: 1, userSelect: 'none' as const }}>💎</span>
        </div>
      </section>

      {/* VAULT */}
      <ListingRow title="Trending in The Vault" subtitle="Rare collectibles, fine art, and horological masterpieces" items={vault} isVault bg="#f4fbf8" viewAllColor="#8d4f00" />

      {/* TRUST & APP */}
      <section style={{ backgroundColor: '#dde4e1', padding: '64px 0' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 40px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', alignItems: 'center' }}>
          <div style={{ backgroundColor: 'rgba(22,29,27,0.8)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '40px', padding: '48px', color: 'white' }}>
            <h2 style={{ fontSize: '36px', fontWeight: 700, marginBottom: '24px', letterSpacing: '-0.02em' }}>Join the SouKni Family.</h2>
            <p style={{ fontSize: '17px', marginBottom: '32px', opacity: 0.8, lineHeight: 1.6 }}>Buy and sell with confidence on Morocco's most trusted marketplace. Verified sellers, secure messaging, and 100% free ads.</p>
            <div style={{ display: 'flex', gap: '12px', marginBottom: '40px' }}>
              {['🍎 App Store', '▶ Google Play'].map(btn => (
                <button key={btn} style={{ backgroundColor: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: 'white', padding: '10px 20px', borderRadius: '12px', fontWeight: 600, fontSize: '14px', cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>{btn}</button>
              ))}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ display: 'flex' }}>
                {['#2dd4bf', '#e6e2d9', '#ffac5a'].map((color, i) => (
                  <div key={i} style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: color, border: '2px solid #006b5f', marginLeft: i > 0 ? '-16px' : '0' }} />
                ))}
              </div>
              <p style={{ fontSize: '13px', fontWeight: 600, letterSpacing: '0.05em' }}>Over 2M+ active Moroccans trust SouKni</p>
            </div>
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
              <span style={{ fontSize: '22px', fontWeight: 700, color: '#161d1b' }}>Excellent</span>
              <span style={{ fontSize: '20px' }}>⭐⭐⭐⭐⭐</span>
              <span style={{ color: '#6b7a76', fontSize: '15px' }}>Trustpilot</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {testimonials.map(t => (
                <div key={t.author} style={{ backgroundColor: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.4)', padding: '32px', borderRadius: '24px' }}>
                  <p style={{ fontSize: '15px', fontStyle: 'italic', color: '#3c4a46', marginBottom: '16px', lineHeight: 1.7 }}>"{t.text}"</p>
                  <p style={{ fontWeight: 700, color: '#161d1b', fontSize: '14px' }}>– {t.author}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
