'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Heart, Search, MapPin, Globe, Bell, User, ChevronDown, ChevronRight, ChevronLeft, MessageCircle, ArrowUpDown, Bookmark, Users, UserCircle, BadgeCheck, Sliders, Gem } from 'lucide-react'

const categoryPills = ['Home & Living', 'Furniture', 'Outdoors & Gardens', 'Curtains & Textiles', 'Lighting', 'Traditionnel', 'Rugs & Carpets']

type Listing = {
  id: string; badge: 'Verified' | 'Diamond Member' | null; badgeType?: 'verified' | 'diamond'
  title: string; category: string; price: string; location: string; timeAgo: string
  tags?: string[]; photoCount: number; image: string
}

const row1: Listing[] = [
  { id: '1', badge: 'Verified', badgeType: 'verified', title: 'Luxury Modern Modular Sofa', category: 'Furniture • Living Room', price: '45,000', location: 'Rabat Center', timeAgo: '2 hours ago', tags: ['Brand New', 'Weatherproof'], photoCount: 5, image: 'https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg?auto=compress&w=600' },
  { id: '2', badge: 'Verified', badgeType: 'verified', title: 'Designer Copper Coffee Table', category: 'Furniture • Decor', price: '12,500', location: 'Casablanca', timeAgo: '1 day ago', tags: ['New', 'Artisanal'], photoCount: 4, image: 'https://images.pexels.com/photos/1571459/pexels-photo-1571459.jpeg?auto=compress&w=600' },
  { id: '3', badge: null, title: 'Hand-woven Silk Moroccan Rug', category: 'Textiles • Artisan', price: '28,000', location: 'Marrakech', timeAgo: '3 days ago', tags: ['Mint Silk', 'Traditional'], photoCount: 3, image: 'https://images.pexels.com/photos/6312372/pexels-photo-6312372.jpeg?auto=compress&w=600' },
  { id: '4', badge: 'Diamond Member', badgeType: 'diamond', title: 'Minimalist Smart Floor Lamp', category: 'Lighting • Smart Home', price: '6,200', location: 'Tangier', timeAgo: 'Just now', tags: ['Gold Finish', 'Minimalist'], photoCount: 2, image: 'https://images.pexels.com/photos/1112598/pexels-photo-1112598.jpeg?auto=compress&w=600' },
]

const row2: Listing[] = [
  { id: '5', badge: 'Diamond Member', badgeType: 'diamond', title: 'Heritage Leather Artisanal Chest', category: 'The Vault • Furniture', price: '32,000', location: 'Marrakech', timeAgo: '2 hours ago', photoCount: 6, image: 'https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg?auto=compress&w=600' },
  { id: '6', badge: 'Diamond Member', badgeType: 'diamond', title: 'Bespoke Emerald Glass Chandelier', category: 'The Vault • Lighting', price: '85,000', location: 'Rabat', timeAgo: 'Just now', photoCount: 8, image: 'https://images.pexels.com/photos/1471999/pexels-photo-1471999.jpeg?auto=compress&w=600' },
  { id: '7', badge: 'Diamond Member', badgeType: 'diamond', title: 'Silk-Finish Designer Garden Sofa', category: 'Garden • Luxury Furniture', price: '18,500', location: 'Casablanca', timeAgo: '1 hour ago', photoCount: 5, image: 'https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg?auto=compress&w=600' },
  { id: '8', badge: 'Diamond Member', badgeType: 'diamond', title: 'Gold Accent Table Lamp', category: 'The Vault • Lighting', price: '4,800', location: 'Tangier', timeAgo: 'Just now', photoCount: 3, image: 'https://images.pexels.com/photos/1112598/pexels-photo-1112598.jpeg?auto=compress&w=600' },
]

const moroccanRow: Listing[] = [
  { id: '9', badge: 'Diamond Member', badgeType: 'diamond', title: 'Hand-carved Cedar Console Table', category: 'Furniture • Traditional', price: '18,500', location: 'Fez', timeAgo: 'Just now', photoCount: 4, image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&w=600' },
  { id: '10', badge: 'Diamond Member', badgeType: 'diamond', title: 'Artisanal Copper Floor Lamp', category: 'Lighting • Traditional', price: '4,200', location: 'Marrakech', timeAgo: 'Just now', photoCount: 3, image: 'https://images.pexels.com/photos/1112598/pexels-photo-1112598.jpeg?auto=compress&w=600' },
  { id: '11', badge: 'Diamond Member', badgeType: 'diamond', title: 'Emerald Embroidered Leather Pouf', category: 'Decor • Traditional', price: '1,200', location: 'Rabat', timeAgo: 'Just now', photoCount: 2, image: 'https://images.pexels.com/photos/6444256/pexels-photo-6444256.jpeg?auto=compress&w=600' },
  { id: '12', badge: 'Diamond Member', badgeType: 'diamond', title: 'Hand-painted Geometric Ceramic Plates', category: 'Kitchen • Traditional', price: '850', location: 'Safi', timeAgo: 'Just now', photoCount: 5, image: 'https://images.pexels.com/photos/1207918/pexels-photo-1207918.jpeg?auto=compress&w=600' },
]

function BadgePill({ badge, type }: { badge: string; type?: string }) {
  const isDiamond = type === 'diamond'
  return (
    <div style={{ position: 'absolute', top: '8px', left: '8px', zIndex: 10, backgroundColor: 'rgba(244,251,248,0.9)', backdropFilter: 'blur(12px)', padding: '4px 10px', borderRadius: '100px', display: 'flex', alignItems: 'center', gap: '4px', boxShadow: '0 1px 2px rgba(0,0,0,0.06)' }}>
      <span style={{ fontSize: '12px' }}>{isDiamond ? '◆' : '✓'}</span>
      <span style={{ fontSize: '11px', color: isDiamond ? '#8d4f00' : '#006b5f', fontWeight: 700, textTransform: 'uppercase' as const, letterSpacing: '0.05em' }}>{badge}</span>
    </div>
  )
}

function ProductCard({ item }: { item: Listing }) {
  const [saved, setSaved] = useState(false)
  return (
    <article style={{ backgroundColor: 'rgba(244,251,248,0.7)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.4)', borderRadius: '12px', overflow: 'hidden', display: 'flex', flexDirection: 'column' as const, boxShadow: '0 8px 32px rgba(0,107,95,0.05)', transition: 'transform 0.3s' }}
      onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
      onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
    >
      <div style={{ position: 'relative', aspectRatio: '4/3', overflow: 'hidden', backgroundColor: '#e2eae7' }}>
        {item.badge && <BadgePill badge={item.badge} type={item.badgeType} />}
        <button onClick={() => setSaved(!saved)} style={{ position: 'absolute', top: '8px', right: '8px', zIndex: 10, width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'rgba(244,251,248,0.5)', backdropFilter: 'blur(12px)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Heart size={16} color={saved ? '#ba1a1a' : '#161d1b'} fill={saved ? '#ba1a1a' : 'none'} />
        </button>
        <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }}
          onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
        />
        <div style={{ position: 'absolute', bottom: '8px', left: '8px', zIndex: 10, backgroundColor: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)', color: 'white', padding: '2px 8px', borderRadius: '4px', fontSize: '11px', display: 'flex', alignItems: 'center', gap: '4px' }}>
          🖼 {item.photoCount}
        </div>
      </div>
      <div style={{ padding: '16px', display: 'flex', flexDirection: 'column' as const, flex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px', gap: '8px' }}>
          <h3 style={{ fontSize: '13px', fontWeight: 600, color: '#161d1b', lineHeight: 1.3, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical' as const }}>{item.title}</h3>
          {item.tags && <span style={{ backgroundColor: 'rgba(255,172,90,0.2)', color: '#744000', padding: '2px 8px', borderRadius: '4px', fontSize: '10px', fontWeight: 700, textTransform: 'uppercase' as const, border: '1px solid rgba(255,172,90,0.3)', flexShrink: 0 }}>Premium</span>}
        </div>
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
          <button style={{ backgroundColor: '#25D366', color: 'white', border: 'none', padding: '8px', borderRadius: '100px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>
            WhatsApp
          </button>
        </div>
      </div>
    </article>
  )
}

export default function HomeLivingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = React.use(params)
  const [activePill, setActivePill] = useState('Home & Living')
  const [activeSeller, setActiveSeller] = useState('All Sellers')
  const [diamondFirst, setDiamondFirst] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)

  return (
    <div style={{ fontFamily: 'Hanken Grotesk, Inter, sans-serif', backgroundColor: '#f4fbf8', color: '#161d1b', minHeight: '100vh', paddingBottom: '64px' }}>

      {/* ── HEADER LINE 1 ── */}
      <nav style={{ display: 'flex', flexDirection: 'column' as const, backgroundColor: 'rgba(244,251,248,0.8)', backdropFilter: 'blur(20px)', borderTop: '4px solid rgba(0,107,95,0.1)', position: 'sticky', top: 0, zIndex: 50, boxShadow: '0 1px 2px rgba(0,0,0,0.04)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 40px', maxWidth: '1440px', margin: '0 auto', width: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <Link href={`/${locale}`} style={{ textDecoration: 'none' }}>
              <span style={{ fontSize: '22px', fontWeight: 900, color: '#006b5f', letterSpacing: '-0.02em' }}>SouKni</span>
            </Link>
            <select style={{ appearance: 'none', backgroundColor: '#eef5f2', border: '1px solid rgba(186,202,197,0.3)', borderRadius: '100px', padding: '6px 32px 6px 12px', fontSize: '13px', color: '#3c4a46', cursor: 'pointer', fontFamily: 'inherit' }}>
              <option>Cities: Rabat</option><option>Casablanca</option><option>Marrakech</option>
            </select>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {[
              { icon: Globe, label: 'Languages (FR, ES, AR, EN)' },
              { icon: null, label: 'Currency (MAD, EUR, GBP, USD)' },
              { icon: Heart, label: 'Favorites' },
              { icon: Bell, label: 'Notifications' },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column' as const, alignItems: 'center', cursor: 'pointer', padding: '0 8px' }}>
                <div style={{ width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {i === 0 && <Globe size={22} color="#3c4a46" />}
                  {i === 1 && <span style={{ fontSize: '20px' }}>💳</span>}
                  {i === 2 && <Heart size={22} color="#3c4a46" />}
                  {i === 3 && <Bell size={22} color="#3c4a46" />}
                </div>
                <span style={{ fontSize: '10px', color: '#3c4a46', whiteSpace: 'nowrap' as const }}>{item.label}</span>
              </div>
            ))}
            <div style={{ display: 'flex', flexDirection: 'column' as const, alignItems: 'center', cursor: 'pointer', padding: '0 16px', borderLeft: '1px solid rgba(186,202,197,0.2)', marginLeft: '8px' }}>
              <User size={22} color="#3c4a46" />
              <span style={{ fontSize: '11px', color: '#3c4a46' }}>Login / Sign up</span>
            </div>
            <button style={{ backgroundColor: '#006b5f', color: 'white', padding: '10px 24px', borderRadius: '100px', fontWeight: 600, fontSize: '13px', border: 'none', cursor: 'pointer', textTransform: 'uppercase' as const, letterSpacing: '0.02em', marginLeft: '8px', whiteSpace: 'nowrap' as const }}>
              Place your 100% FREE Ad
            </button>
          </div>
        </div>

        {/* NAV ROW */}
        <div style={{ borderTop: '1px solid rgba(186,202,197,0.2)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '32px', height: '48px', padding: '0 40px', maxWidth: '1440px', margin: '0 auto' }}>
            {['Motors', 'Property', 'The Vault'].map(item => (
              <Link key={item} href={`/${locale}`} style={{ fontSize: '13px', color: '#3c4a46', textDecoration: 'none', fontWeight: 600, letterSpacing: '0.05em' }}>{item}</Link>
            ))}
            <span style={{ fontSize: '13px', color: '#006b5f', fontWeight: 700, borderBottom: '2px solid #006b5f', height: '100%', display: 'flex', alignItems: 'center', cursor: 'pointer' }}>Home &amp; Living</span>
            {['Fashion', 'Jobs', 'Mobiles & Computers', 'Services'].map(item => (
              <span key={item} style={{ fontSize: '13px', color: '#3c4a46', cursor: 'pointer', whiteSpace: 'nowrap' as const, fontWeight: 600, letterSpacing: '0.05em' }}>{item}</span>
            ))}
          </div>
        </div>
      </nav>

      <main style={{ width: '100%' }}>

        {/* ── HERO ── */}
        <section style={{ position: 'relative', width: '100%', height: '500px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', backgroundColor: 'rgba(221,228,225,0.2)', marginBottom: '64px' }}>
          <img src="https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&w=1600" alt="Home showroom" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.7, mixBlendMode: 'multiply' as const }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(244,251,248,0.4), rgba(244,251,248,0.2), #f4fbf8)' }} />
          <div style={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: '1440px', padding: '0 40px', display: 'flex', flexDirection: 'column' as const, alignItems: 'center' }}>
            <h1 style={{ fontSize: '48px', fontWeight: 700, color: '#161d1b', marginBottom: '24px', textAlign: 'center' as const, textShadow: '0 4px 8px rgba(244,251,248,0.8)' }}>Curated Home &amp; Living</h1>
            <div style={{ width: '100%', maxWidth: '800px', backgroundColor: 'rgba(244,251,248,0.7)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.4)', boxShadow: '0 8px 32px rgba(0,107,95,0.05)', borderRadius: '3rem', padding: '8px', display: 'flex', flexDirection: 'row' as const, gap: '8px' }}>
              <div style={{ flex: 1, display: 'flex', alignItems: 'center', backgroundColor: 'rgba(244,251,248,0.5)', borderRadius: '100px', padding: '12px 16px', border: '1px solid transparent' }}>
                <Search size={20} color="#3c4a46" style={{ marginRight: '12px', flexShrink: 0 }} />
                <input placeholder="Search furniture, decor, artisans..." style={{ background: 'transparent', border: 'none', outline: 'none', width: '100%', fontSize: '16px', fontFamily: 'inherit', color: '#161d1b' }} />
              </div>
              <div style={{ width: '1px', backgroundColor: 'rgba(186,202,197,0.3)', margin: '8px 0' }} />
              <div style={{ flex: 1, display: 'flex', alignItems: 'center', backgroundColor: 'rgba(244,251,248,0.5)', borderRadius: '100px', padding: '12px 16px' }}>
                <MapPin size={20} color="#3c4a46" style={{ marginRight: '12px', flexShrink: 0 }} />
                <select style={{ background: 'transparent', border: 'none', outline: 'none', width: '100%', fontSize: '16px', fontFamily: 'inherit', cursor: 'pointer' }}>
                  <option>All Morocco</option><option>Casablanca</option><option>Rabat</option><option>Marrakech</option>
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
          <div style={{ backgroundColor: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(12px)', border: '1px solid rgba(186,202,197,0.3)', borderRadius: '100px', boxShadow: '0 4px 16px rgba(0,0,0,0.06)', display: 'flex', alignItems: 'center', padding: '6px', marginTop: '-32px', marginBottom: '32px' }}>
            {[
              { label: 'City', value: 'Rabat' },
              { label: 'Keyword', value: 'Search anything in home & living...', isInput: true },
              { label: 'Neighborhood', value: 'Enter location', isInput: true },
              { label: 'Price (MAD)', value: 'Select' },
              { label: 'Filters', value: '1 filter selected' },
            ].map((f, i) => (
              <div key={f.label} style={{ flex: f.isInput ? 2 : 1, padding: '8px 16px', borderRight: i < 4 ? '1px solid rgba(186,202,197,0.2)' : 'none' }}>
                <div style={{ fontSize: '10px', fontWeight: 700, color: '#3c4a46', textTransform: 'uppercase' as const, letterSpacing: '0.08em' }}>{f.label}</div>
                {f.isInput
                  ? <input placeholder={f.value} style={{ border: 'none', outline: 'none', background: 'transparent', fontSize: '15px', width: '100%', color: '#161d1b', fontFamily: 'inherit', padding: '4px 0' }} />
                  : <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><span style={{ fontSize: '15px', fontWeight: 500, color: '#3c4a46' }}>{f.value}</span><ChevronDown size={16} color="#3c4a46" /></div>
                }
              </div>
            ))}
          </div>

          {/* BREADCRUMB */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'rgba(60,74,70,0.7)', marginBottom: '24px' }}>
            <a href="#" style={{ textDecoration: 'none', color: 'inherit' }}>Rabat</a>
            <ChevronRight size={16} />
            <a href="#" style={{ textDecoration: 'none', color: 'inherit' }}>The Vault</a>
            <ChevronRight size={16} />
            <span style={{ color: '#161d1b' }}>Home &amp; Living</span>
          </nav>

          {/* RESULTS HEADER */}
          <div style={{ display: 'flex', flexWrap: 'wrap' as const, justifyContent: 'space-between', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 600, color: '#161d1b', letterSpacing: '-0.01em' }}>
              Premium Home &amp; Living for sale in Rabat • <span style={{ color: '#6b7a76', fontWeight: 400 }}>6,388 Ads</span>
            </h2>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', border: '1px solid rgba(186,202,197,0.3)', borderRadius: '4px', fontSize: '13px', fontWeight: 600, backgroundColor: 'transparent', cursor: 'pointer' }}><ArrowUpDown size={16} /> Sort: Default</button>
              <button style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', border: '1px solid rgba(186,202,197,0.3)', borderRadius: '4px', fontSize: '13px', fontWeight: 600, backgroundColor: 'transparent', cursor: 'pointer' }}><Bookmark size={16} /> Save Search</button>
            </div>
          </div>

          {/* SELLER FILTERS + DIAMOND TOGGLE */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px', flexWrap: 'wrap' as const }}>
            {[
              { label: 'All Sellers', icon: Users },
              { label: 'SouKni Members', icon: UserCircle },
              { label: 'SouKni Pro', icon: BadgeCheck },
            ].map(s => (
              <button key={s.label} onClick={() => setActiveSeller(s.label)}
                style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', borderRadius: '8px', fontSize: '13px', fontWeight: 600, cursor: 'pointer', border: activeSeller === s.label ? '1px solid #006b5f' : '1px solid rgba(186,202,197,0.3)', backgroundColor: activeSeller === s.label ? 'rgba(45,212,191,0.3)' : '#eef5f2', color: activeSeller === s.label ? '#006b5f' : '#3c4a46' }}>
                <s.icon size={18} /> {s.label}
              </button>
            ))}
            <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '12px', backgroundColor: '#eef5f2', border: '1px solid rgba(186,202,197,0.3)', padding: '8px 16px', borderRadius: '8px' }}>
              <span style={{ fontSize: '13px', fontWeight: 600, color: '#3c4a46' }}>Show SouKni Diamond Verified First</span>
              <button onClick={() => setDiamondFirst(!diamondFirst)} style={{ position: 'relative', width: '44px', height: '24px', borderRadius: '100px', backgroundColor: diamondFirst ? '#006b5f' : '#dde4e1', border: 'none', cursor: 'pointer', flexShrink: 0 }}>
                <div style={{ position: 'absolute', top: '2px', left: diamondFirst ? '22px' : '2px', width: '20px', height: '20px', borderRadius: '50%', backgroundColor: 'white', transition: 'left 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }} />
              </button>
            </div>
          </div>

          {/* CATEGORY PILLS */}
          <div style={{ display: 'flex', overflowX: 'auto' as const, gap: '12px', paddingBottom: '16px', marginBottom: '32px' }}>
            {categoryPills.map(c => (
              <button key={c} onClick={() => setActivePill(c)}
                style={{ whiteSpace: 'nowrap' as const, padding: '10px 20px', borderRadius: '100px', fontSize: '13px', fontWeight: 600, cursor: 'pointer', border: '1px solid rgba(186,202,197,0.3)', backgroundColor: activePill === c ? '#006b5f' : '#e8efec', color: activePill === c ? 'white' : '#161d1b', transition: 'all 0.2s' }}>
                {c}
              </button>
            ))}
            <button style={{ display: 'flex', alignItems: 'center', gap: '4px', whiteSpace: 'nowrap' as const, padding: '10px 20px', borderRadius: '100px', fontSize: '13px', fontWeight: 600, cursor: 'pointer', border: '1px solid rgba(186,202,197,0.3)', backgroundColor: '#e8efec', color: '#161d1b' }}>
              View More <ChevronDown size={16} />
            </button>
          </div>

          {/* DISCOVER PREMIUM INTERIOR HEADER */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '32px', flexWrap: 'wrap' as const, gap: '16px' }}>
            <div>
              <h2 style={{ fontSize: '24px', fontWeight: 600, color: '#161d1b' }}>Discover Premium Interior</h2>
              <p style={{ fontSize: '16px', color: '#3c4a46', marginTop: '4px' }}>6,388 curated items available in Rabat</p>
            </div>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', border: '1px solid rgba(186,202,197,0.5)', borderRadius: '100px', fontSize: '13px', fontWeight: 600, backgroundColor: '#eef5f2', cursor: 'pointer' }}><ArrowUpDown size={16} /> Sort: Default</button>
              <button style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', border: '1px solid rgba(186,202,197,0.5)', borderRadius: '100px', fontSize: '13px', fontWeight: 600, backgroundColor: '#eef5f2', cursor: 'pointer' }}><Sliders size={16} /> Filters (1)</button>
            </div>
          </div>

          {/* DISCOVERY GRID ROW 1 */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '16px', marginBottom: '32px' }}>
            {row1.map(item => <ProductCard key={item.id} item={item} />)}
          </div>

          {/* AUTO PRO BANNER — full width in grid */}
          <section style={{ marginBottom: '32px' }}>
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

          {/* DISCOVERY GRID ROW 2 */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '16px', marginBottom: '48px' }}>
            {row2.map(item => <ProductCard key={item.id} item={item} />)}
          </div>

          {/* FEATURED TRADITIONAL MOROCCAN FURNITURE */}
          <div style={{ marginBottom: '48px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '32px' }}>
              <div>
                <h2 style={{ fontSize: '24px', fontWeight: 600, color: '#161d1b' }}>Featured Traditional Moroccan Furniture</h2>
                <p style={{ fontSize: '16px', color: '#3c4a46', marginTop: '4px' }}>Handcrafted excellence from local artisans</p>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '16px' }}>
              {moroccanRow.map(item => <ProductCard key={item.id} item={item} />)}
            </div>
          </div>

          {/* PAGINATION */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', margin: '40px 0' }}>
            <button style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', border: '1px solid rgba(186,202,197,0.3)', backgroundColor: 'transparent', cursor: 'pointer' }}><ChevronLeft size={20} /></button>
            {[1, 2, 3].map(p => (
              <button key={p} onClick={() => setCurrentPage(p)} style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', border: currentPage === p ? 'none' : '1px solid rgba(186,202,197,0.3)', backgroundColor: currentPage === p ? '#2dd4bf' : 'transparent', color: currentPage === p ? '#00574d' : '#161d1b', fontWeight: 600, fontSize: '13px', cursor: 'pointer' }}>{p}</button>
            ))}
            <span style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(60,74,70,0.7)', fontSize: '13px' }}>...</span>
            <button style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', border: '1px solid rgba(186,202,197,0.3)', backgroundColor: 'transparent', cursor: 'pointer', fontSize: '13px', fontWeight: 600 }}>12</button>
            <button style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', border: '1px solid rgba(186,202,197,0.3)', backgroundColor: 'transparent', cursor: 'pointer' }}><ChevronRight size={20} /></button>
          </div>
        </div>

        {/* ── DIAMOND MEMBER BANNER ── */}
        <section style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 40px 64px' }}>
          <div style={{ position: 'relative', width: '100%', height: '400px', borderRadius: '2.5rem', overflow: 'hidden' }}>
            <img src="https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&w=1400" alt="Diamond Member" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.7s' }}
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
                <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '18px', marginBottom: '32px', lineHeight: 1.6 }}>Get the Diamond Certified status and unlock exclusive benefits for premium home sellers.</p>
                <button style={{ backgroundColor: '#006b5f', color: 'white', padding: '16px 32px', borderRadius: '100px', fontWeight: 600, fontSize: '13px', border: 'none', cursor: 'pointer', textTransform: 'uppercase' as const, letterSpacing: '0.08em' }}>
                  Get Verified Now
                </button>
              </div>
            </div>
            <div style={{ position: 'absolute', top: '16px', right: '16px', backgroundColor: 'rgba(244,251,248,0.7)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.2)', padding: '8px 16px', borderRadius: '100px' }}>
              <span style={{ color: 'white', fontSize: '11px', fontWeight: 600, textTransform: 'uppercase' as const, letterSpacing: '0.15em' }}>Diamond Certified</span>
            </div>
          </div>
        </section>
      </main>

      {/* ── FOOTER ── */}
      <footer style={{ backgroundColor: '#7a7a7a', color: 'white', padding: '64px 40px', width: '100%' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
          {/* Top: Brand + Newsletter */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', marginBottom: '48px', paddingBottom: '48px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
            <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '16px' }}>
              <span style={{ fontSize: '24px', fontWeight: 900, color: 'white', letterSpacing: '-0.02em' }}>SouKni</span>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '18px', fontStyle: 'italic' }}>The Market in your Pocket</p>
              <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
                {['📘', '✕', '📷', '💼', '▶'].map((icon, i) => (
                  <a key={i} href="#" style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', fontSize: '16px' }}>{icon}</a>
                ))}
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '16px' }}>
              <h4 style={{ fontSize: '22px', fontWeight: 600 }}>Join our Newsletter</h4>
              <div style={{ display: 'flex', gap: '12px' }}>
                <input placeholder="Enter your email" style={{ flex: 1, backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '12px 16px', color: 'white', outline: 'none', fontFamily: 'inherit', fontSize: '14px' }} />
                <button style={{ backgroundColor: '#2dd4bf', color: '#00201c', fontWeight: 700, padding: '12px 32px', borderRadius: '8px', border: 'none', cursor: 'pointer', whiteSpace: 'nowrap' as const }}>Subscribe</button>
              </div>
            </div>
          </div>

          {/* Directory */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr', gap: '32px', marginBottom: '48px' }}>
            {[
              { title: 'Marketplace', links: ['Motors', 'Property', 'The Vault', 'Jobs', 'Services', 'Fashion', 'Home & Living'] },
              { title: 'Company', links: ['About Us', 'Careers', 'Press', 'Sustainability', 'Legal'] },
              { title: 'Support', links: ['Help Center', 'Safety Tips', 'Trust & Safety', 'Contact Us'] },
              { title: 'Resources', links: ['Market Trends', 'App Download', 'Advertising'] },
            ].map(col => (
              <div key={col.title} style={{ display: 'flex', flexDirection: 'column' as const, gap: '16px' }}>
                <h5 style={{ fontWeight: 700, fontSize: '13px', textTransform: 'uppercase' as const, letterSpacing: '0.08em' }}>{col.title}</h5>
                <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column' as const, gap: '8px' }}>
                  {col.links.map(l => <li key={l}><a href="#" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: '14px' }}>{l}</a></li>)}
                </ul>
              </div>
            ))}
            <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '16px' }}>
              <h5 style={{ fontWeight: 700, fontSize: '13px', textTransform: 'uppercase' as const, letterSpacing: '0.08em' }}>App Downloads</h5>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                {[
                  { icon: '🍎', label: 'Download on the', store: 'App Store' },
                  { icon: '▶', label: 'Get it on', store: 'Google Play' },
                  { icon: '🛒', label: 'Explore on', store: 'AppGallery' },
                  { icon: '📱', label: 'Available on', store: 'Galaxy Store' },
                ].map(s => (
                  <a key={s.store} href="#" style={{ display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '8px', borderRadius: '8px', textDecoration: 'none', transition: 'background 0.2s' }}>
                    <span style={{ fontSize: '20px' }}>{s.icon}</span>
                    <span style={{ fontSize: '10px', lineHeight: 1.3, color: 'rgba(255,255,255,0.8)' }}>{s.label}<br /><strong style={{ fontSize: '12px' }}>{s.store}</strong></span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom */}
          <div style={{ paddingTop: '32px', borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', flexWrap: 'wrap' as const, justifyContent: 'center', gap: '24px' }}>
            {['Privacy Policy', 'Terms of Service', 'Cookies', '© 2026 SouKni Marketplace. All rights reserved.'].map(l => (
              <a key={l} href="#" style={{ color: 'rgba(255,255,255,0.4)', textDecoration: 'none', fontSize: '12px' }}>{l}</a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  )
}
