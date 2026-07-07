'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Heart, Search, MapPin, Globe, Bell, User, ChevronDown, ChevronRight, ChevronLeft, MessageCircle, Gem, Smartphone, Laptop, Gamepad2, Headphones, Monitor, Tablet } from 'lucide-react'

const categoryPills = [
  { label: 'Smartphones', count: '12k+' },
  { label: 'Laptops', count: '8.4k' },
  { label: 'Computers', count: '4.2k' },
  { label: 'Gaming', count: '6.7k' },
  { label: 'Audio', count: '3.1k' },
  { label: 'Tablets', count: '2.8k' },
]

type Listing = {
  id: string; badge: 'Verified' | 'Diamond Pro' | 'Verified Shop' | 'Diamond Member' | null; badgeType?: 'verified' | 'diamond'
  title: string; category: string; price: string; location: string; timeAgo: string
  tags?: string[]; photoCount?: number; image: string | null; placeholderIcon?: any
  topAdLabel?: string
}

const smartphones: Listing[] = [
  { id: '1', badge: 'Verified', badgeType: 'verified', title: 'Samsung Galaxy S24 Ultra 512GB', category: 'Smartphones • Samsung', price: '11,500', location: 'Agdal, Rabat', timeAgo: '1 hour ago', tags: ['Like New', 'Titanium Gray'], photoCount: 6, topAdLabel: 'Top Ad', image: 'https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg?auto=compress&w=600' },
  { id: '2', badge: 'Diamond Pro', badgeType: 'diamond', title: 'iPhone 15 Pro Max 256GB Titanium', category: 'Smartphones • Apple', price: '13,800', location: 'Hay Riad, Rabat', timeAgo: '30 min ago', tags: ['Sealed Box', 'Warranty'], image: 'https://images.pexels.com/photos/1294886/pexels-photo-1294886.jpeg?auto=compress&w=600' },
  { id: '3', badge: null, title: 'Google Pixel 8 Pro 12GB RAM', category: 'Smartphones • Google', price: '8,900', location: 'Casablanca', timeAgo: '4 hours ago', tags: ['New', 'Bay Blue'], placeholderIcon: Smartphone, image: null },
  { id: '4', badge: null, title: 'OnePlus 12 5G Global Version', category: 'Smartphones • OnePlus', price: '7,200', location: 'Tangier', timeAgo: 'Just now', tags: ['16GB RAM', 'Mint'], placeholderIcon: Smartphone, image: null },
]

const laptops: Listing[] = [
  { id: '5', badge: 'Verified Shop', badgeType: 'verified', title: 'MacBook Pro 14" M3 Pro 18GB/512GB', category: 'Laptops • Apple', price: '21,500', location: 'Casablanca', timeAgo: '1 day ago', image: 'https://images.pexels.com/photos/303383/pexels-photo-303383.jpeg?auto=compress&w=600' },
  { id: '6', badge: null, title: 'ASUS ROG Zephyrus G14 RTX 4060', category: 'Gaming Laptops • ASUS', price: '17,900', location: 'Marrakech', timeAgo: '2 hours ago', image: 'https://images.pexels.com/photos/1229861/pexels-photo-1229861.jpeg?auto=compress&w=600' },
  { id: '7', badge: null, title: 'Sell your Tech here', category: '', price: '', location: '', timeAgo: '', placeholderIcon: Monitor, image: null },
  { id: '8', badge: null, title: '640+ more Laptops', category: '', price: '', location: '', timeAgo: '', placeholderIcon: Laptop, image: null },
]

const gaming: Listing[] = [
  { id: '9', badge: 'Diamond Member', badgeType: 'diamond', title: 'PlayStation 5 Slim 1TB + 2 Controllers', category: 'Consoles • Sony', price: '5,400', location: 'Rabat', timeAgo: 'Just now', image: 'https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&w=600' },
  { id: '10', badge: null, title: 'Sony WH-1000XM5 Noise Cancelling', category: 'Audio • Headphones', price: '3,200', location: 'Casablanca', timeAgo: '3 hours ago', image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&w=600' },
  { id: '11', badge: null, title: 'Nintendo Switch OLED Edition', category: 'Consoles • Nintendo', price: '3,800', location: 'Marrakech', timeAgo: '5 hours ago', placeholderIcon: Gamepad2, image: null },
  { id: '12', badge: null, title: 'AirPods Pro (2nd Gen) USB-C', category: 'Audio • Apple', price: '2,600', location: 'Rabat', timeAgo: '2 hours ago', placeholderIcon: Headphones, image: null },
]

function BadgePill({ badge, type }: { badge: string; type?: string }) {
  const isDiamond = type === 'diamond'
  return (
    <div style={{ position: 'absolute', top: '8px', left: '8px', zIndex: 10, backgroundColor: 'rgba(244,251,248,0.9)', backdropFilter: 'blur(12px)', padding: '4px 10px', borderRadius: '100px', display: 'flex', alignItems: 'center', gap: '4px', boxShadow: '0 1px 2px rgba(0,0,0,0.06)' }}>
      <span style={{ fontSize: '12px', color: isDiamond ? '#8d4f00' : '#006b5f' }}>{isDiamond ? '◆' : '✓'}</span>
      <span style={{ fontSize: '11px', color: isDiamond ? '#8d4f00' : '#006b5f', fontWeight: 700, textTransform: 'uppercase' as const, letterSpacing: '0.05em' }}>{badge}</span>
    </div>
  )
}

function TechCard({ item, isPlaceholder }: { item: Listing; isPlaceholder?: boolean }) {
  const [saved, setSaved] = useState(false)
  if (isPlaceholder) {
    const Icon = item.placeholderIcon
    return (
      <div style={{ backgroundColor: 'rgba(244,251,248,0.7)', backdropFilter: 'blur(16px)', border: '2px dashed rgba(186,202,197,0.3)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '280px' }}>
        <div style={{ textAlign: 'center' as const, padding: '32px' }}>
          {Icon && <Icon size={48} color="rgba(186,202,197,0.5)" style={{ margin: '0 auto 8px' }} />}
          <p style={{ fontSize: '13px', color: '#6b7a76', fontWeight: 600 }}>{item.title}</p>
        </div>
      </div>
    )
  }
  return (
    <article style={{ backgroundColor: 'rgba(244,251,248,0.7)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.4)', borderRadius: '12px', overflow: 'hidden', display: 'flex', flexDirection: 'column' as const, boxShadow: '0 8px 32px rgba(0,107,95,0.05)', transition: 'transform 0.3s' }}
      onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
      onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
    >
      <div style={{ position: 'relative', aspectRatio: '4/3', overflow: 'hidden', backgroundColor: 'rgba(221,228,225,0.1)' }}>
        {item.badge && <BadgePill badge={item.badge} type={item.badgeType} />}
        {item.topAdLabel && (
          <span style={{ position: 'absolute', top: '8px', right: item.badge ? '8px' : 'unset', left: item.badge ? 'unset' : '8px', zIndex: 10, backgroundColor: 'rgba(255,172,90,0.2)', color: '#744000', padding: '2px 8px', borderRadius: '4px', fontSize: '10px', fontWeight: 700, textTransform: 'uppercase' as const, border: '1px solid rgba(255,172,90,0.3)' }}>{item.topAdLabel}</span>
        )}
        <button onClick={() => setSaved(!saved)} style={{ position: 'absolute', top: '8px', right: '8px', zIndex: 10, width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'rgba(244,251,248,0.5)', backdropFilter: 'blur(12px)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Heart size={16} color={saved ? '#ba1a1a' : '#161d1b'} fill={saved ? '#ba1a1a' : 'none'} />
        </button>
        {item.image
          ? <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }}
              onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
            />
          : <div style={{ width: '100%', height: '100%', backgroundColor: 'rgba(186,202,197,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {item.placeholderIcon && React.createElement(item.placeholderIcon, { size: 48, color: 'rgba(186,202,197,0.5)' })}
            </div>
        }
        {item.photoCount && (
          <div style={{ position: 'absolute', bottom: '8px', left: '8px', zIndex: 10, backgroundColor: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)', color: 'white', padding: '2px 8px', borderRadius: '4px', fontSize: '11px', display: 'flex', alignItems: 'center', gap: '4px' }}>
            🖼 {item.photoCount}
          </div>
        )}
      </div>
      <div style={{ padding: '16px', display: 'flex', flexDirection: 'column' as const, flex: 1 }}>
        <h3 style={{ fontSize: '13px', fontWeight: 600, color: '#161d1b', lineHeight: 1.3, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical' as const, marginBottom: '4px' }}>{item.title}</h3>
        <p style={{ fontSize: '13px', color: '#3c4a46', marginBottom: '8px' }}>{item.category}</p>
        <div style={{ fontSize: '20px', fontWeight: 700, color: '#161d1b', marginBottom: '12px' }}>MAD {item.price}</div>
        {item.tags && (
          <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: '8px', marginBottom: '16px' }}>
            {item.tags.map(t => <span key={t} style={{ backgroundColor: '#e8efec', padding: '4px 8px', borderRadius: '4px', fontSize: '11px', color: '#3c4a46', fontWeight: 500 }}>{t}</span>)}
          </div>
        )}
        <div style={{ display: 'flex', alignItems: 'center', fontSize: '12px', color: '#3c4a46', marginBottom: '16px', gap: '4px' }}>
          <MapPin size={14} color="#006b5f" /> {item.location} • {item.timeAgo}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginTop: 'auto' }}>
          <button style={{ border: '1px solid #006b5f', color: '#006b5f', backgroundColor: 'transparent', padding: '8px', borderRadius: '100px', fontSize: '13px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
            <MessageCircle size={14} /> Chat
          </button>
          <button style={{ backgroundColor: '#25D366', color: 'white', border: 'none', padding: '8px', borderRadius: '100px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>WhatsApp</button>
        </div>
      </div>
    </article>
  )
}

export default function MobilesElectronicsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = React.use(params)
  const [activePill, setActivePill] = useState('Smartphones')
  const [currentPage, setCurrentPage] = useState(1)

  return (
    <div style={{ fontFamily: 'Hanken Grotesk, Inter, sans-serif', backgroundColor: '#f4fbf8', color: '#161d1b', minHeight: '100vh', paddingBottom: '64px' }}>

      {/* ── HEADER ── */}
      <nav style={{ display: 'flex', flexDirection: 'column' as const, backgroundColor: 'rgba(244,251,248,0.8)', backdropFilter: 'blur(20px)', borderTop: '4px solid rgba(0,107,95,0.1)', position: 'sticky', top: 0, zIndex: 50, boxShadow: '0 1px 2px rgba(0,0,0,0.04)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 40px', maxWidth: '1440px', margin: '0 auto', width: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <Link href={`/${locale}`} style={{ textDecoration: 'none' }}>
              <span style={{ fontSize: '22px', fontWeight: 900, color: '#006b5f', letterSpacing: '-0.02em' }}>SouKni</span>
            </Link>
            <select style={{ appearance: 'none', backgroundColor: '#eef5f2', border: '1px solid rgba(186,202,197,0.3)', borderRadius: '100px', padding: '6px 32px 6px 12px', fontSize: '13px', cursor: 'pointer', fontFamily: 'inherit' }}>
              <option>Cities: Rabat</option><option>Casablanca</option><option>Marrakech</option>
            </select>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            {[
              { icon: '🌐', label: 'Languages (FR, ES, AR, EN)' },
              { icon: '💳', label: 'Currency (MAD, EUR, GBP, USD)' },
              { icon: '♡', label: 'Favorites' },
              { icon: '🔔', label: 'Notifications' },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column' as const, alignItems: 'center', cursor: 'pointer', padding: '0 8px' }}>
                <span style={{ fontSize: '20px' }}>{item.icon}</span>
                <span style={{ fontSize: '10px', color: '#3c4a46', whiteSpace: 'nowrap' as const }}>{item.label}</span>
              </div>
            ))}
            <div style={{ display: 'flex', flexDirection: 'column' as const, alignItems: 'center', cursor: 'pointer', padding: '0 16px', borderLeft: '1px solid rgba(186,202,197,0.2)', marginLeft: '8px' }}>
              <User size={22} color="#3c4a46" />
              <span style={{ fontSize: '11px', color: '#3c4a46' }}>Login / Sign up</span>
            </div>
            <button style={{ backgroundColor: '#006b5f', color: 'white', padding: '10px 24px', borderRadius: '100px', fontWeight: 600, fontSize: '13px', border: 'none', cursor: 'pointer', textTransform: 'uppercase' as const, marginLeft: '8px', whiteSpace: 'nowrap' as const }}>
              Place your 100% FREE Ad
            </button>
          </div>
        </div>
        <div style={{ borderTop: '1px solid rgba(186,202,197,0.2)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '32px', height: '48px', padding: '0 40px', maxWidth: '1440px', margin: '0 auto' }}>
            {['Motors', 'Property', 'The Vault', 'Home & Living', 'Fashion', 'Jobs'].map(item => (
              <span key={item} style={{ fontSize: '13px', color: '#3c4a46', cursor: 'pointer', fontWeight: 600, letterSpacing: '0.05em', whiteSpace: 'nowrap' as const }}>{item}</span>
            ))}
            <span style={{ fontSize: '13px', color: '#006b5f', fontWeight: 700, borderBottom: '2px solid #006b5f', height: '100%', display: 'flex', alignItems: 'center', cursor: 'pointer', whiteSpace: 'nowrap' as const }}>Mobiles &amp; Computers</span>
            <span style={{ fontSize: '13px', color: '#3c4a46', cursor: 'pointer', fontWeight: 600 }}>Services</span>
          </div>
        </div>
      </nav>

      <main style={{ width: '100%' }}>

        {/* ── HERO ── */}
        <section style={{ position: 'relative', width: '100%', height: '500px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', backgroundColor: 'rgba(221,228,225,0.2)', marginBottom: '64px' }}>
          <img src="https://images.pexels.com/photos/1029757/pexels-photo-1029757.jpeg?auto=compress&w=1600" alt="Tech showroom" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.7 }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(244,251,248,0.4), rgba(244,251,248,0.2), #f4fbf8)' }} />
          <div style={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: '1440px', padding: '0 40px', display: 'flex', flexDirection: 'column' as const, alignItems: 'center' }}>
            <h1 style={{ fontSize: '48px', fontWeight: 700, color: '#161d1b', marginBottom: '24px', textAlign: 'center' as const, textShadow: '0 4px 8px rgba(244,251,248,0.8)', letterSpacing: '-0.02em' }}>Premium Mobiles &amp; Electronics</h1>
            <div style={{ width: '100%', maxWidth: '800px', backgroundColor: 'rgba(244,251,248,0.7)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.4)', boxShadow: '0 8px 32px rgba(0,107,95,0.05)', borderRadius: '2.5rem', padding: '8px', display: 'flex', gap: '8px' }}>
              <div style={{ flex: 1, display: 'flex', alignItems: 'center', backgroundColor: 'rgba(244,251,248,0.5)', borderRadius: '100px', padding: '12px 16px' }}>
                <Search size={20} color="#3c4a46" style={{ marginRight: '12px', flexShrink: 0 }} />
                <input placeholder="Search smartphones, laptops, gadgets..." style={{ background: 'transparent', border: 'none', outline: 'none', width: '100%', fontSize: '16px', fontFamily: 'inherit' }} />
              </div>
              <div style={{ width: '1px', backgroundColor: 'rgba(186,202,197,0.3)', margin: '8px 0' }} />
              <div style={{ flex: 1, display: 'flex', alignItems: 'center', backgroundColor: 'rgba(244,251,248,0.5)', borderRadius: '100px', padding: '12px 16px' }}>
                <MapPin size={20} color="#3c4a46" style={{ marginRight: '12px', flexShrink: 0 }} />
                <select style={{ background: 'transparent', border: 'none', outline: 'none', width: '100%', fontSize: '16px', fontFamily: 'inherit', cursor: 'pointer' }}>
                  <option>All Morocco</option><option>Rabat</option><option>Casablanca</option>
                </select>
              </div>
              <button style={{ backgroundColor: '#006b5f', color: 'white', borderRadius: '100px', padding: '16px 32px', fontWeight: 600, fontSize: '13px', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                🔍 Search
              </button>
            </div>
          </div>
        </section>

        {/* ── FILTER BAR ── */}
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 40px' }}>
          <div style={{ backgroundColor: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(12px)', border: '1px solid rgba(186,202,197,0.3)', borderRadius: '2.5rem', boxShadow: '0 4px 16px rgba(0,0,0,0.06)', display: 'flex', alignItems: 'center', padding: '6px', marginTop: '-32px', marginBottom: '32px', overflowX: 'auto' as const }}>
            {[
              { label: 'City', value: 'Rabat', type: 'select' },
              { label: 'Keyword', value: 'e.g. iPhone 15 Pro Max...', type: 'input', flex: 2 },
              { label: 'Condition', value: 'Any Condition', type: 'select' },
              { label: 'Price (MAD)', value: 'Select', type: 'select' },
              { label: 'Filters', value: 'Electronics Spec', type: 'select' },
            ].map((f, i) => (
              <div key={f.label} style={{ flex: (f as any).flex || 1, minWidth: i === 1 ? '200px' : '120px', padding: '8px 16px', borderRight: i < 4 ? '1px solid rgba(186,202,197,0.2)' : 'none' }}>
                <div style={{ fontSize: '10px', fontWeight: 700, color: '#3c4a46', textTransform: 'uppercase' as const, letterSpacing: '0.08em' }}>{f.label}</div>
                {f.type === 'input'
                  ? <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><input placeholder={f.value} style={{ border: 'none', outline: 'none', background: 'transparent', fontSize: '15px', width: '100%', fontFamily: 'inherit', padding: '4px 0' }} /><Search size={16} color="#006b5f" /></div>
                  : <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><span style={{ fontSize: '15px', fontWeight: 500, color: '#161d1b' }}>{f.value}</span><ChevronDown size={16} color="#3c4a46" /></div>
                }
              </div>
            ))}
          </div>

          {/* BREADCRUMB */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'rgba(60,74,70,0.7)', marginBottom: '24px' }}>
            <a href="#" style={{ textDecoration: 'none', color: 'inherit' }}>Rabat</a>
            <ChevronRight size={16} />
            <span style={{ color: '#161d1b' }}>Mobiles &amp; Electronics</span>
          </nav>

          {/* CATEGORY PILLS */}
          <div style={{ display: 'flex', overflowX: 'auto' as const, gap: '12px', paddingBottom: '16px', marginBottom: '32px' }}>
            {categoryPills.map(c => (
              <button key={c.label} onClick={() => setActivePill(c.label)}
                style={{ whiteSpace: 'nowrap' as const, padding: '10px 20px', borderRadius: '100px', fontSize: '13px', fontWeight: 600, cursor: 'pointer', border: '1px solid rgba(186,202,197,0.3)', backgroundColor: activePill === c.label ? '#006b5f' : '#e8efec', color: activePill === c.label ? 'white' : '#161d1b', display: 'flex', alignItems: 'center', gap: '8px', transition: 'all 0.2s' }}>
                {c.label} <span style={{ fontSize: '10px', opacity: 0.7 }}>{c.count}</span>
              </button>
            ))}
            <button style={{ display: 'flex', alignItems: 'center', gap: '4px', whiteSpace: 'nowrap' as const, padding: '10px 20px', borderRadius: '100px', fontSize: '13px', fontWeight: 600, cursor: 'pointer', border: '1px solid rgba(186,202,197,0.3)', backgroundColor: '#e8efec' }}>
              View More <ChevronDown size={16} />
            </button>
          </div>

          {/* ── SECTION 1: FEATURED SMARTPHONES ── */}
          <div style={{ marginBottom: '48px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '32px' }}>
              <div>
                <h2 style={{ fontSize: '24px', fontWeight: 600, color: '#161d1b' }}>Featured Smartphones</h2>
                <p style={{ fontSize: '16px', color: '#3c4a46', marginTop: '4px' }}>High-end flagship devices in Rabat</p>
              </div>
              <button style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', border: '1px solid rgba(186,202,197,0.5)', borderRadius: '100px', fontSize: '13px', fontWeight: 600, backgroundColor: '#eef5f2', cursor: 'pointer' }}>Sort</button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '16px' }}>
              {smartphones.map(item => <TechCard key={item.id} item={item} isPlaceholder={!item.image && !item.badge} />)}
            </div>
          </div>

          {/* ── AUTO PRO BANNER ── */}
          <section style={{ marginBottom: '48px' }}>
            <div style={{ position: 'relative', width: '100%', height: '400px', borderRadius: '2.5rem', overflow: 'hidden' }}>
              <img src="https://images.pexels.com/photos/3806288/pexels-photo-3806288.jpeg?auto=compress&w=1400" alt="SouKni Auto Pro" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.7s' }}
                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
              />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(0,0,0,0.8), rgba(0,0,0,0.4), transparent)', display: 'flex', flexDirection: 'column' as const, justifyContent: 'center', padding: '0 64px' }}>
                <div style={{ maxWidth: '480px' }}>
                  <h2 style={{ color: 'white', fontSize: '40px', fontWeight: 700, marginBottom: '8px', letterSpacing: '-0.02em' }}>SouKni Auto Pro</h2>
                  <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '18px', marginBottom: '32px' }}>The Gold Standard for Premium Automotive Services</p>
                  <button style={{ backgroundColor: '#2dd4bf', color: '#00574d', padding: '16px 32px', borderRadius: '100px', fontWeight: 600, fontSize: '13px', border: 'none', cursor: 'pointer', textTransform: 'uppercase' as const, letterSpacing: '0.08em' }}>
                    Explore Motors
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* ── SECTION 2: COMPUTERS & LAPTOPS ── */}
          <div style={{ marginBottom: '48px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '32px' }}>
              <div>
                <h2 style={{ fontSize: '24px', fontWeight: 600, color: '#161d1b' }}>Featured Computers &amp; Laptops</h2>
                <p style={{ fontSize: '16px', color: '#3c4a46', marginTop: '4px' }}>Professional workstations and ultrabooks</p>
              </div>
              <a href="#" style={{ color: '#006b5f', fontSize: '13px', fontWeight: 600, textDecoration: 'none' }}>View All</a>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '16px' }}>
              {laptops.map(item => (
                item.title === 'Sell your Tech here' || item.title === '640+ more Laptops'
                  ? <TechCard key={item.id} item={item} isPlaceholder={true} />
                  : <TechCard key={item.id} item={item} />
              ))}
            </div>
          </div>

          {/* ── SECTION 3: PRO GAMING & AUDIO ── */}
          <div style={{ marginBottom: '48px' }}>
            <div style={{ marginBottom: '32px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: 600, color: '#161d1b' }}>Pro Gaming &amp; Audio</h2>
              <p style={{ fontSize: '16px', color: '#3c4a46', marginTop: '4px' }}>Premium peripherals and high-fidelity sound</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '16px' }}>
              {gaming.map(item => <TechCard key={item.id} item={item} isPlaceholder={!item.image && !item.badge} />)}
            </div>
          </div>

          {/* PAGINATION */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', margin: '40px 0' }}>
            <button style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', border: '1px solid rgba(186,202,197,0.3)', backgroundColor: 'transparent', cursor: 'pointer' }}><ChevronLeft size={20} /></button>
            {[1, 2, 3].map(p => (
              <button key={p} onClick={() => setCurrentPage(p)} style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', border: currentPage === p ? 'none' : '1px solid rgba(186,202,197,0.3)', backgroundColor: currentPage === p ? '#2dd4bf' : 'transparent', color: currentPage === p ? '#00574d' : '#161d1b', fontWeight: 600, fontSize: '13px', cursor: 'pointer' }}>{p}</button>
            ))}
            <span style={{ width: '40px', textAlign: 'center' as const, color: 'rgba(60,74,70,0.7)', fontSize: '13px' }}>...</span>
            <button style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', border: '1px solid rgba(186,202,197,0.3)', backgroundColor: 'transparent', cursor: 'pointer', fontSize: '13px', fontWeight: 600 }}>42</button>
            <button style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', border: '1px solid rgba(186,202,197,0.3)', backgroundColor: 'transparent', cursor: 'pointer' }}><ChevronRight size={20} /></button>
          </div>
        </div>

        {/* ── DIAMOND MEMBER BANNER ── */}
        <section style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 40px 64px' }}>
          <div style={{ position: 'relative', width: '100%', height: '400px', borderRadius: '2.5rem', overflow: 'hidden' }}>
            <img src="https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&w=1400" alt="Diamond Member" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.7s' }}
              onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
            />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(0,0,0,0.6), rgba(0,0,0,0.3), transparent)', display: 'flex', flexDirection: 'column' as const, justifyContent: 'center', padding: '0 64px' }}>
              <div style={{ maxWidth: '560px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                  <Gem size={32} color="#3cddc7" />
                  <span style={{ color: '#3cddc7', fontSize: '13px', fontWeight: 600, textTransform: 'uppercase' as const, letterSpacing: '0.15em' }}>Exclusive Status</span>
                </div>
                <h2 style={{ color: 'white', fontSize: '40px', fontWeight: 700, marginBottom: '8px', letterSpacing: '-0.02em' }}>Become a SouKni Diamond Member</h2>
                <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '18px', marginBottom: '32px', lineHeight: 1.6 }}>Unlock exclusive benefits for premium electronics vendors and get verified.</p>
                <button style={{ backgroundColor: '#006b5f', color: 'white', padding: '16px 32px', borderRadius: '100px', fontWeight: 600, fontSize: '13px', border: 'none', cursor: 'pointer', textTransform: 'uppercase' as const, letterSpacing: '0.08em' }}>
                  Get Verified Now
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ── FOOTER ── */}
      <footer style={{ backgroundColor: '#7a7a7a', color: 'white', padding: '64px 40px', width: '100%' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', marginBottom: '48px', paddingBottom: '48px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
            <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '16px' }}>
              <span style={{ fontSize: '24px', fontWeight: 900, letterSpacing: '-0.02em' }}>SouKni</span>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '18px', fontStyle: 'italic' }}>The Market in your Pocket</p>
              <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
                {['📘', '✕', '📷'].map((icon, i) => (
                  <a key={i} href="#" style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', fontSize: '16px' }}>{icon}</a>
                ))}
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '16px' }}>
              <h4 style={{ fontSize: '22px', fontWeight: 600 }}>Join Tech Insights</h4>
              <div style={{ display: 'flex', gap: '12px' }}>
                <input placeholder="Enter your email" style={{ flex: 1, backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '12px 16px', color: 'white', outline: 'none', fontFamily: 'inherit', fontSize: '14px' }} />
                <button style={{ backgroundColor: '#2dd4bf', color: '#00201c', fontWeight: 700, padding: '12px 32px', borderRadius: '8px', border: 'none', cursor: 'pointer', whiteSpace: 'nowrap' as const }}>Subscribe</button>
              </div>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', marginBottom: '48px' }}>
            {[
              { title: 'Marketplace', links: ['Motors', 'Mobiles & Electronics', 'Property', 'The Vault'] },
              { title: 'Support', links: ['Help Center', 'Safety Tips', 'Contact Us'] },
            ].map(col => (
              <div key={col.title} style={{ display: 'flex', flexDirection: 'column' as const, gap: '16px' }}>
                <h5 style={{ fontWeight: 700, fontSize: '13px', textTransform: 'uppercase' as const, letterSpacing: '0.08em' }}>{col.title}</h5>
                <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column' as const, gap: '8px' }}>
                  {col.links.map(l => <li key={l}><a href="#" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: '14px' }}>{l}</a></li>)}
                </ul>
              </div>
            ))}
          </div>
          <div style={{ paddingTop: '32px', borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', flexWrap: 'wrap' as const, justifyContent: 'center', gap: '24px' }}>
            {['Privacy Policy', 'Terms of Service', '© 2026 SouKni Marketplace. All rights reserved.'].map(l => (
              <a key={l} href="#" style={{ color: 'rgba(255,255,255,0.4)', textDecoration: 'none', fontSize: '12px' }}>{l}</a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  )
}
