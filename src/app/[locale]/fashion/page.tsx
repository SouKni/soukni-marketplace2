'use client'

import React, { useState } from 'react'


const categoryPills = [
  'All Fashion', 'Handbags & Wallets', 'Shoes', 'Clothing',
  'Fragrances', 'Vintage & Highend', 'Wedding', 'Accessories',
]

const sellerFilters = ['All Sellers', 'SouKni Members', 'SouKni Pro']

const listings = [
  {
    id: '1', title: 'BRAND NEW Hermes Birkin 35', category: 'Handbags, Bags & Wallets',
    price: 'MAD 290,950', badge: 'Verified', badgeColor: '#006b5f',
    tags: ['Brand New', 'Flawless', 'Hermes'], location: 'Rabat Center', time: '2 hours ago',
    premium: true, photos: 7,
    image: 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&w=500',
  },
  {
    id: '2', title: 'Chanel Boy Medium Chevron', category: 'Handbags, Bags & Wallets',
    price: 'MAD 45,000', badge: 'Verified', badgeColor: '#006b5f',
    tags: ['Used', 'Good', 'Chanel'], location: 'Casablanca', time: '1 day ago',
    premium: true, photos: 5,
    image: 'https://images.pexels.com/photos/904350/pexels-photo-904350.jpeg?auto=compress&w=500',
  },
  {
    id: '3', title: 'Designer Wedding Dress', category: 'Wedding Apparel',
    price: 'MAD 8,500', badge: null,
    tags: ['1-2 years', 'Excellent'], location: 'Marrakech', time: '3 days ago',
    premium: false, photos: 3,
    image: 'https://images.pexels.com/photos/1488310/pexels-photo-1488310.jpeg?auto=compress&w=500',
  },
  {
    id: '4', title: 'Louis Vuitton OnTheGo MM', category: 'Handbags, Bags & Wallets',
    price: 'MAD 28,000', badge: 'Diamond Member', badgeColor: '#8d4f00',
    tags: ['0-1 month', 'Flawless', 'Louis Vuitton'], location: 'Tangier', time: 'Just now',
    premium: false, photos: 4,
    image: 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&w=500',
  },
  {
    id: '5', title: 'Gold & Emerald Artisan Watch', category: 'The Vault • Watches',
    price: 'MAD 125,000', badge: 'Diamond Member', badgeColor: '#8d4f00',
    tags: [], location: 'Rabat', time: 'Just now',
    premium: false, photos: 0,
    image: 'https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&w=500',
  },
  {
    id: '6', title: 'Silk & Lace Evening Gown', category: 'Fashion • Wedding',
    price: 'MAD 18,500', badge: 'Diamond Member', badgeColor: '#8d4f00',
    tags: [], location: 'Casablanca', time: '1 hour ago',
    premium: false, photos: 0,
    image: 'https://images.pexels.com/photos/1488310/pexels-photo-1488310.jpeg?auto=compress&w=500',
  },
  {
    id: '7', title: 'Heritage Leather Travel Trunk', category: 'The Vault • Accessories',
    price: 'MAD 32,000', badge: 'Diamond Member', badgeColor: '#8d4f00',
    tags: [], location: 'Marrakech', time: '2 hours ago',
    premium: false, photos: 0,
    image: 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&w=500',
  },
  {
    id: '8', title: 'Louis Vuitton OnTheGo MM', category: 'Handbags, Bags & Wallets',
    price: 'MAD 28,000', badge: 'Diamond Member', badgeColor: '#8d4f00',
    tags: [], location: 'Tangier', time: 'Just now',
    premium: false, photos: 0,
    image: 'https://images.pexels.com/photos/904350/pexels-photo-904350.jpeg?auto=compress&w=500',
  },
  {
    id: '9', title: 'Gold & Emerald Artisan Watch', category: 'The Vault • Watches',
    price: 'MAD 125,000', badge: 'Diamond Member', badgeColor: '#8d4f00',
    tags: [], location: 'Rabat', time: 'Just now',
    premium: false, photos: 0,
    image: 'https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&w=500',
  },
  {
    id: '10', title: 'Silk & Lace Evening Gown', category: 'Fashion • Wedding',
    price: 'MAD 18,500', badge: 'Diamond Member', badgeColor: '#8d4f00',
    tags: [], location: 'Casablanca', time: '1 hour ago',
    premium: false, photos: 0,
    image: 'https://images.pexels.com/photos/1488310/pexels-photo-1488310.jpeg?auto=compress&w=500',
  },
  {
    id: '11', title: 'Heritage Leather Travel Trunk', category: 'The Vault • Accessories',
    price: 'MAD 32,000', badge: 'Diamond Member', badgeColor: '#8d4f00',
    tags: [], location: 'Marrakech', time: '2 hours ago',
    premium: false, photos: 0,
    image: 'https://images.pexels.com/photos/904350/pexels-photo-904350.jpeg?auto=compress&w=500',
  },
  {
    id: '12', title: 'Louis Vuitton OnTheGo MM', category: 'Handbags, Bags & Wallets',
    price: 'MAD 28,000', badge: 'Diamond Member', badgeColor: '#8d4f00',
    tags: [], location: 'Tangier', time: 'Just now',
    premium: false, photos: 0,
    image: 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&w=500',
  },
  {
    id: '13', title: 'Gold & Emerald Artisan Watch', category: 'The Vault • Watches',
    price: 'MAD 125,000', badge: 'Diamond Member', badgeColor: '#8d4f00',
    tags: [], location: 'Rabat', time: 'Just now',
    premium: false, photos: 0,
    image: 'https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&w=500',
  },
  {
    id: '14', title: 'Silk & Lace Evening Gown', category: 'Fashion • Wedding',
    price: 'MAD 18,500', badge: 'Diamond Member', badgeColor: '#8d4f00',
    tags: [], location: 'Casablanca', time: '1 hour ago',
    premium: false, photos: 0,
    image: 'https://images.pexels.com/photos/1488310/pexels-photo-1488310.jpeg?auto=compress&w=500',
  },
  {
    id: '15', title: 'Heritage Leather Travel Trunk', category: 'The Vault • Accessories',
    price: 'MAD 32,000', badge: 'Diamond Member', badgeColor: '#8d4f00',
    tags: [], location: 'Marrakech', time: '2 hours ago',
    premium: false, photos: 0,
    image: 'https://images.pexels.com/photos/904350/pexels-photo-904350.jpeg?auto=compress&w=500',
  },
  {
    id: '16', title: 'Louis Vuitton OnTheGo MM', category: 'Handbags, Bags & Wallets',
    price: 'MAD 28,000', badge: 'Diamond Member', badgeColor: '#8d4f00',
    tags: [], location: 'Tangier', time: 'Just now',
    premium: false, photos: 0,
    image: 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&w=500',
  },
]

function ProductCard({ item }: { item: typeof listings[0] }) {
  const [liked, setLiked] = useState(false)
  const [hovered, setHovered] = useState(false)

  return (
    <article
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        backgroundColor: 'rgba(244,251,248,0.7)', backdropFilter: 'blur(16px)',
        border: '1px solid rgba(255,255,255,0.4)', boxShadow: '0 8px 32px rgba(0,107,95,0.05)',
        borderRadius: '12px', overflow: 'hidden', display: 'flex', flexDirection: 'column',
        fontFamily: 'Inter, sans-serif',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        transition: 'all 0.3s',
      }}
    >
      {/* Image */}
      <div style={{ position: 'relative', aspectRatio: '4/3', overflow: 'hidden', backgroundColor: '#e2eae7' }}>
        <img src={item.image} alt={item.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s', transform: hovered ? 'scale(1.05)' : 'scale(1)' }}
        />
        {/* Badge */}
        {item.badge && (
          <div style={{ position: 'absolute', top: '8px', left: '8px', backgroundColor: 'rgba(244,251,248,0.9)', backdropFilter: 'blur(8px)', padding: '4px 10px', borderRadius: '100px', display: 'flex', alignItems: 'center', gap: '4px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
            {item.badge === 'Diamond Member'
              ? <span style={{ fontSize: '12px', color: '#8d4f00' }}>💎</span>
              : <span style={{ fontSize: '12px', color: '#006b5f' }}>✓</span>
            }
            <span style={{ fontSize: '11px', fontWeight: 700, color: item.badge === 'Diamond Member' ? '#8d4f00' : '#006b5f', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{item.badge}</span>
          </div>
        )}
        {/* Heart */}
        <button onClick={() => setLiked(!liked)}
          style={{ position: 'absolute', top: '8px', right: '8px', width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'rgba(244,251,248,0.5)', backdropFilter: 'blur(8px)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: '16px', color: liked ? '#ba1a1a' : '#3c4a46', transition: 'color 0.2s' }}
        >{liked ? '♥' : '♡'}</button>
        {/* Photo count */}
        {item.photos > 0 && (
          <div style={{ position: 'absolute', bottom: '8px', left: '8px', backgroundColor: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)', color: 'white', padding: '2px 8px', borderRadius: '4px', fontSize: '11px', display: 'flex', alignItems: 'center', gap: '4px' }}>
            🖼 {item.photos}
          </div>
        )}
      </div>

      {/* Content */}
      <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px', gap: '8px' }}>
          <h3 style={{ fontSize: '13px', fontWeight: 600, color: '#161d1b', lineHeight: 1.3, letterSpacing: '0.05em', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1, transition: 'color 0.2s', cursor: 'pointer' }}
            onMouseEnter={e => e.currentTarget.style.color = '#006b5f'}
            onMouseLeave={e => e.currentTarget.style.color = '#161d1b'}
          >{item.title}</h3>
          {item.premium && (
            <span style={{ backgroundColor: 'rgba(255,172,90,0.2)', color: '#744000', border: '1px solid rgba(255,172,90,0.3)', padding: '2px 6px', borderRadius: '4px', fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', flexShrink: 0 }}>Premium</span>
          )}
        </div>
        <p style={{ fontSize: '13px', color: '#6b7a76', marginBottom: '8px' }}>{item.category}</p>
        <div style={{ fontSize: '20px', fontWeight: 700, color: '#161d1b', marginBottom: '12px' }}>{item.price}</div>

        {item.tags.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '16px' }}>
            {item.tags.map(tag => (
              <span key={tag} style={{ backgroundColor: '#e8efec', color: '#3c4a46', padding: '4px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 500 }}>{tag}</span>
            ))}
          </div>
        )}

        <div style={{ display: 'flex', alignItems: 'center', color: '#6b7a76', fontSize: '12px', marginBottom: '16px', marginTop: 'auto' }}>
          📍 {item.location} • {item.time}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
          <button style={{ border: '1px solid #006b5f', color: '#006b5f', backgroundColor: 'transparent', padding: '8px', borderRadius: '100px', fontWeight: 600, fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', fontFamily: 'Inter, sans-serif', transition: 'background 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(0,107,95,0.05)'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
          >💬 Chat</button>
          <button style={{ backgroundColor: '#25D366', color: 'white', border: 'none', padding: '8px', borderRadius: '100px', fontWeight: 600, fontSize: '13px', cursor: 'pointer', fontFamily: 'Inter, sans-serif', transition: 'background 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#1ebe5d'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = '#25D366'}
          >WhatsApp</button>
        </div>
      </div>
    </article>
  )
}

export default function FashionPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = React.use(params)
  const [activePill, setActivePill] = useState('All Fashion')
  const [activeSeller, setActiveSeller] = useState('All Sellers')
  const [currentPage, setCurrentPage] = useState(1)

  // Split listings: first 4 before banner, rest after
  const row1 = listings.slice(0, 4)
  const rest = listings.slice(4)

  return (
    <div style={{ fontFamily: 'Inter, system-ui, sans-serif', backgroundColor: '#f4fbf8', minHeight: '100vh', paddingBottom: '0' }}>

      {/* HEADER */}
      {/* HERO */}
      <section style={{ position: 'relative', height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', backgroundColor: 'rgba(221,228,225,0.2)' }}>
        <img src="https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&w=1400" alt="Fashion Hero"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', opacity: 0.7, mixBlendMode: 'multiply' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(244,251,248,0.4), rgba(244,251,248,0.2), #f4fbf8)' }} />
        <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', padding: '0 20px', maxWidth: '800px', width: '100%' }}>
          <h1 style={{ fontSize: '48px', fontWeight: 700, color: '#161d1b', marginBottom: '24px', letterSpacing: '-0.02em', lineHeight: 1.1 }}>Curated High Fashion</h1>
          {/* Search bar */}
          <div style={{ backgroundColor: 'rgba(244,251,248,0.7)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.4)', boxShadow: '0 8px 32px rgba(0,107,95,0.05)', borderRadius: '40px', padding: '8px', display: 'flex', alignItems: 'center', gap: '8px', maxWidth: '700px', margin: '0 auto' }}>
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', backgroundColor: 'rgba(244,251,248,0.5)', borderRadius: '100px', padding: '12px 20px', gap: '12px' }}>
              <span style={{ color: '#6b7a76', fontSize: '18px' }}>🔍</span>
              <input type="text" placeholder="Search brands, items, styles..." style={{ flex: 1, backgroundColor: 'transparent', border: 'none', outline: 'none', fontSize: '16px', color: '#161d1b', fontFamily: 'Inter, sans-serif' }} />
            </div>
            <div style={{ display: 'none' }} />
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', backgroundColor: 'rgba(244,251,248,0.5)', borderRadius: '100px', padding: '12px 20px', gap: '12px' }}>
              <span style={{ color: '#6b7a76', fontSize: '18px' }}>📍</span>
              <select style={{ flex: 1, backgroundColor: 'transparent', border: 'none', outline: 'none', fontSize: '16px', color: '#161d1b', fontFamily: 'Inter, sans-serif', appearance: 'none', cursor: 'pointer' }}>
                <option>All Morocco</option>
                <option>Casablanca</option>
                <option>Rabat</option>
              </select>
            </div>
            <button style={{ backgroundColor: '#006b5f', color: 'white', border: 'none', borderRadius: '100px', padding: '12px 32px', fontWeight: 600, fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontFamily: 'Inter, sans-serif', transition: 'background 0.15s' }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = '#00574d'}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = '#006b5f'}
            >🔍 Search</button>
          </div>
        </div>
      </section>

      {/* ADVANCED FILTER BAR */}
      <div style={{ maxWidth: '1440px', margin: '-48px auto 32px', padding: '0 40px', position: 'relative', zIndex: 20 }}>
        <div style={{ backgroundColor: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(12px)', border: '1px solid rgba(186,202,197,0.3)', borderRadius: '100px', boxShadow: '0 4px 16px rgba(0,0,0,0.06)', display: 'flex', alignItems: 'center', padding: '6px' }}>
          {[
            { label: 'City', value: 'Rabat', type: 'text' },
            { label: 'Keyword', placeholder: 'Search anything in fashion...', type: 'input' },
            { label: 'Neighborhood', placeholder: 'Enter location', type: 'input' },
            { label: 'Price (MAD)', value: 'Select', type: 'text' },
            { label: 'Filters', value: '1 filter selected', type: 'text' },
          ].map((field, i) => (
            <div key={i} style={{ flex: i === 1 ? 2 : 1, padding: '10px 20px', borderRight: i < 4 ? '1px solid rgba(186,202,197,0.2)' : 'none' }}>
              <span style={{ display: 'block', fontSize: '10px', fontWeight: 700, color: '#6b7a76', textTransform: 'uppercase' as const, letterSpacing: '0.1em', marginBottom: '2px' }}>{field.label}</span>
              {field.type === 'input' ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <input type="text" placeholder={field.placeholder} style={{ flex: 1, backgroundColor: 'transparent', border: 'none', outline: 'none', fontSize: '15px', color: '#161d1b', fontFamily: 'Inter, sans-serif' }} />
                  <span style={{ color: '#006b5f', fontSize: '16px' }}>{i === 1 ? '🔍' : '📍'}</span>
                </div>
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '15px', color: field.value === 'Select' || field.value === '1 filter selected' ? 'rgba(60,74,70,0.7)' : '#161d1b' }}>{field.value}</span>
                  <span style={{ color: '#6b7a76', fontSize: '14px' }}>▾</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 40px' }}>

        {/* BREADCRUMBS */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'rgba(60,74,70,0.7)', marginBottom: '24px' }}>
          <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}
            onMouseEnter={e => e.currentTarget.style.color = '#006b5f'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(60,74,70,0.7)'}
          >Rabat</a>
          <span>›</span>
          <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}
            onMouseEnter={e => e.currentTarget.style.color = '#006b5f'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(60,74,70,0.7)'}
          >The Vault</a>
          <span>›</span>
          <span style={{ color: '#161d1b' }}>Clothing & Accessories</span>
        </nav>

        {/* TITLE + ACTIONS */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
          <h2 style={{ fontSize: '22px', fontWeight: 600, color: '#161d1b', letterSpacing: '-0.01em' }}>
            New and Used Clothing & Accessories for sale in Rabat • <span style={{ color: 'rgba(60,74,70,0.7)', fontWeight: 400 }}>6,388 Ads</span>
          </h2>
          <div style={{ display: 'flex', gap: '12px' }}>
            {['⇅ Sort: Default', '🔖 Save Search'].map(btn => (
              <button key={btn} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', border: '1px solid rgba(186,202,197,0.3)', borderRadius: '4px', backgroundColor: 'transparent', fontSize: '13px', fontWeight: 600, color: '#161d1b', cursor: 'pointer', fontFamily: 'Inter, sans-serif', transition: 'background 0.15s' }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = '#e8efec'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
              >{btn}</button>
            ))}
          </div>
        </div>

        {/* SELLER FILTERS */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
          {sellerFilters.map(filter => (
            <button key={filter} onClick={() => setActiveSeller(filter)} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', borderRadius: '8px', border: activeSeller === filter ? '1px solid #006b5f' : '1px solid rgba(186,202,197,0.3)', backgroundColor: activeSeller === filter ? 'rgba(45,212,191,0.15)' : '#eef5f2', color: activeSeller === filter ? '#006b5f' : '#3c4a46', fontSize: '13px', fontWeight: 600, cursor: 'pointer', fontFamily: 'Inter, sans-serif', transition: 'all 0.15s' }}>
              {filter === 'All Sellers' ? '👥' : filter === 'SouKni Members' ? '👤' : '✓'} {filter}
            </button>
          ))}
        </div>

        {/* CATEGORY PILLS */}
        <div style={{ display: 'flex', gap: '12px', overflowX: 'auto' as const, paddingBottom: '16px', marginBottom: '32px' }}>
          {categoryPills.map(pill => (
            <button key={pill} onClick={() => setActivePill(pill)} style={{ whiteSpace: 'nowrap' as const, padding: '10px 20px', borderRadius: '100px', border: activePill === pill ? 'none' : '1px solid rgba(186,202,197,0.3)', backgroundColor: activePill === pill ? '#006b5f' : '#e8efec', color: activePill === pill ? 'white' : '#161d1b', fontSize: '13px', fontWeight: 600, cursor: 'pointer', fontFamily: 'Inter, sans-serif', transition: 'all 0.15s', boxShadow: activePill === pill ? '0 2px 8px rgba(0,107,95,0.2)' : 'none' }}>
              {pill}
            </button>
          ))}
          <button style={{ whiteSpace: 'nowrap' as const, padding: '10px 20px', borderRadius: '100px', border: '1px solid rgba(186,202,197,0.3)', backgroundColor: '#e8efec', color: '#161d1b', fontSize: '13px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontFamily: 'Inter, sans-serif' }}>
            View More ▾
          </button>
        </div>

        {/* SECTION HEADER */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '32px', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#161d1b', marginBottom: '4px', letterSpacing: '-0.01em' }}>Discover Premium Fashion</h2>
            <p style={{ fontSize: '16px', color: '#3c4a46' }}>6,388 curated items available in Rabat</p>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            {['⇅ Sort: Default', '⚙ Filters (1)'].map(btn => (
              <button key={btn} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 16px', border: '1px solid rgba(186,202,197,0.5)', borderRadius: '100px', backgroundColor: '#eef5f2', fontSize: '13px', fontWeight: 600, color: '#161d1b', cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>{btn}</button>
            ))}
          </div>
        </div>

        {/* GRID - Row 1 (4 cards) */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '0' }}>
          {row1.map(item => <ProductCard key={item.id} item={item} />)}
        </div>

        {/* AUTO PRO BANNER */}
        <div style={{ margin: '32px 0', position: 'relative', borderRadius: '40px', overflow: 'hidden', height: '300px' }}>
          <img src="https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&w=1400" alt="SouKni Auto Pro"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.7s' }}
            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(0,0,0,0.8), rgba(0,0,0,0.4), rgba(0,0,0,0))', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '48px' }}>
            <div style={{ maxWidth: '480px' }}>
              <h2 style={{ color: 'white', fontSize: '36px', fontWeight: 700, marginBottom: '8px', letterSpacing: '-0.02em', lineHeight: 1.2 }}>SouKni Auto Pro</h2>
              <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '18px', marginBottom: '32px', lineHeight: 1.6 }}>The Gold Standard for Premium Automotive Services</p>
              <button style={{ backgroundColor: '#2dd4bf', color: '#00574d', border: 'none', padding: '16px 32px', borderRadius: '100px', fontWeight: 700, fontSize: '13px', cursor: 'pointer', fontFamily: 'Inter, sans-serif', textTransform: 'uppercase' as const, letterSpacing: '0.1em', transition: 'opacity 0.15s' }}
                onMouseEnter={e => e.currentTarget.style.opacity = '0.9'}
                onMouseLeave={e => e.currentTarget.style.opacity = '1'}
              >Explore Motors</button>
            </div>
          </div>
        </div>

        {/* GRID - Remaining rows */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '40px' }}>
          {rest.map(item => <ProductCard key={item.id + '_r'} item={item} />)}
        </div>

        {/* PAGINATION */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', marginBottom: '64px' }}>
          <button style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', border: '1px solid rgba(186,202,197,0.3)', backgroundColor: 'transparent', cursor: 'pointer', fontSize: '18px', transition: 'background 0.15s' }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#e8efec'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
          >‹</button>
          {[1, 2, 3].map(p => (
            <button key={p} onClick={() => setCurrentPage(p)} style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', border: 'none', backgroundColor: currentPage === p ? '#2dd4bf' : 'transparent', color: currentPage === p ? '#00574d' : '#161d1b', fontWeight: 600, fontSize: '13px', cursor: 'pointer', fontFamily: 'Inter, sans-serif', boxShadow: currentPage === p ? '0 2px 8px rgba(45,212,191,0.2)' : 'none', transition: 'all 0.15s' }}>{p}</button>
          ))}
          <span style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(60,74,70,0.7)', fontSize: '13px' }}>...</span>
          <button style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', border: '1px solid rgba(186,202,197,0.3)', backgroundColor: 'transparent', cursor: 'pointer', fontSize: '13px', fontWeight: 600, fontFamily: 'Inter, sans-serif', transition: 'background 0.15s' }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#e8efec'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
          >12</button>
          <button style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', border: '1px solid rgba(186,202,197,0.3)', backgroundColor: 'transparent', cursor: 'pointer', fontSize: '18px', transition: 'background 0.15s' }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#e8efec'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
          >›</button>
        </div>

      </div>

      {/* DIAMOND MEMBER BANNER */}
      <section style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 40px 64px' }}>
        <div style={{ position: 'relative', borderRadius: '40px', overflow: 'hidden', height: '300px' }}>
          <img src="https://images.pexels.com/photos/1884581/pexels-photo-1884581.jpeg?auto=compress&w=1400" alt="Diamond"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.7s' }}
            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(0,0,0,0.6), rgba(0,0,0,0.3), rgba(0,0,0,0))', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '64px' }}>
            <div style={{ maxWidth: '480px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                <span style={{ fontSize: '28px', color: '#62fae3' }}>💎</span>
                <span style={{ color: '#62fae3', fontSize: '13px', fontWeight: 600, textTransform: 'uppercase' as const, letterSpacing: '0.2em' }}>Exclusive Status</span>
              </div>
              <h2 style={{ color: 'white', fontSize: '36px', fontWeight: 700, marginBottom: '8px', letterSpacing: '-0.02em', lineHeight: 1.2 }}>Become a SouKni Diamond Member</h2>
              <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '18px', marginBottom: '32px', lineHeight: 1.6 }}>Get the Diamond Certified status and unlock exclusive benefits for premium sellers.</p>
              <button style={{ backgroundColor: '#006b5f', color: 'white', border: 'none', padding: '16px 32px', borderRadius: '100px', fontWeight: 700, fontSize: '13px', cursor: 'pointer', fontFamily: 'Inter, sans-serif', textTransform: 'uppercase' as const, letterSpacing: '0.1em', transition: 'opacity 0.15s' }}
                onMouseEnter={e => e.currentTarget.style.opacity = '0.9'}
                onMouseLeave={e => e.currentTarget.style.opacity = '1'}
              >Get Verified Now</button>
            </div>
          </div>
          <div style={{ position: 'absolute', top: '16px', right: '16px', backgroundColor: 'rgba(244,251,248,0.7)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.2)', padding: '8px 16px', borderRadius: '100px' }}>
            <span style={{ color: 'white', fontSize: '11px', fontWeight: 600, textTransform: 'uppercase' as const, letterSpacing: '0.2em' }}>Diamond Certified</span>
          </div>
        </div>
      </section>
    </div>

  )
}
