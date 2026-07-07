'use client'

import React, { useState } from 'react'
import Link from 'next/link'

const categoryPills = [
  'All Jewelry & Watches', 'Watches', 'Necklaces', 'Rings',
  'Earrings', 'Bracelets', 'Vintage & Antique', 'Diamonds & Gems',
]

const sellerFilters = ['All Sellers', 'SouKni Members', 'SouKni Pro']

const listings = [
  {
    id: '1', title: 'Patek Philippe Nautilus 5711', category: 'Luxury Watches',
    price: 'MAD 1,850,000', badge: 'Diamond Member', badgeColor: '#8d4f00',
    tags: ['Brand New', 'Box & Papers'], location: 'Rabat Center', time: '2 hours ago',
    premium: true,
    image: 'https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&w=500',
  },
  {
    id: '2', title: '18K Gold Diamond Tennis Bracelet', category: 'Bracelets',
    price: 'MAD 95,000', badge: 'Verified', badgeColor: '#2dd4bf',
    tags: ['Excellent', '18K Gold'], location: 'Casablanca', time: '1 day ago',
    premium: true,
    image: 'https://images.pexels.com/photos/691046/pexels-photo-691046.jpeg?auto=compress&w=500',
  },
  {
    id: '3', title: 'Vintage Cartier Tank Watch', category: 'Vintage & Antique',
    price: 'MAD 68,500', badge: null, badgeColor: '#2dd4bf',
    tags: ['Vintage', 'Restored'], location: 'Marrakech', time: '3 days ago',
    premium: false,
    image: 'https://images.pexels.com/photos/277390/pexels-photo-277390.jpeg?auto=compress&w=500',
  },
  {
    id: '4', title: 'Emerald & Diamond Engagement Ring', category: 'Rings',
    price: 'MAD 145,000', badge: 'Diamond Member', badgeColor: '#8d4f00',
    tags: ['Brand New', 'Certified'], location: 'Tangier', time: 'Just now',
    premium: false,
    image: 'https://images.pexels.com/photos/265804/pexels-photo-265804.jpeg?auto=compress&w=500',
  },
  {
    id: '5', title: 'Rolex Submariner Date', category: 'Luxury Watches',
    price: 'MAD 215,000', badge: 'Diamond Member', badgeColor: '#8d4f00',
    tags: ['Excellent', 'Full Set'], location: 'Rabat', time: 'Just now',
    premium: false,
    image: 'https://images.pexels.com/photos/9978722/pexels-photo-9978722.jpeg?auto=compress&w=500',
  },
  {
    id: '6', title: 'Pearl & Gold Statement Necklace', category: 'Necklaces',
    price: 'MAD 22,500', badge: 'Verified', badgeColor: '#2dd4bf',
    tags: ['Handcrafted'], location: 'Casablanca', time: '1 hour ago',
    premium: false,
    image: 'https://images.pexels.com/photos/1413420/pexels-photo-1413420.jpeg?auto=compress&w=500',
  },
  {
    id: '7', title: 'Art Deco Sapphire Earrings', category: 'Vintage & Antique',
    price: 'MAD 38,000', badge: 'Diamond Member', badgeColor: '#8d4f00',
    tags: ['Vintage', 'Rare'], location: 'Marrakech', time: '2 hours ago',
    premium: false,
    image: 'https://images.pexels.com/photos/1413420/pexels-photo-1413420.jpeg?auto=compress&w=500',
  },
  {
    id: '8', title: 'Omega Speedmaster Moonwatch', category: 'Luxury Watches',
    price: 'MAD 92,000', badge: 'Verified', badgeColor: '#2dd4bf',
    tags: ['Brand New'], location: 'Fes', time: '4 hours ago',
    premium: false,
    image: 'https://images.pexels.com/photos/9978722/pexels-photo-9978722.jpeg?auto=compress&w=500',
  },
]

function ListingCard({ item }: { item: typeof listings[0] }) {
  const [liked, setLiked] = useState(false)
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        backgroundColor: 'white', borderRadius: '20px', overflow: 'hidden',
        border: '1px solid rgba(226,232,240,0.8)',
        boxShadow: hovered ? '0 12px 40px rgba(45,212,191,0.12), 0 4px 16px rgba(0,0,0,0.08)' : '0 2px 8px rgba(0,0,0,0.04)',
        transform: hovered ? 'translateY(-3px)' : 'translateY(0)',
        transition: 'all 0.3s ease', cursor: 'pointer', fontFamily: 'Inter, sans-serif',
      }}
    >
      <div style={{ position: 'relative', paddingTop: '75%', overflow: 'hidden', backgroundColor: '#f1f5f9' }}>
        <img src={item.image} alt={item.title}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s', transform: hovered ? 'scale(1.05)' : 'scale(1)' }}
        />
        {item.premium && (
          <div style={{ position: 'absolute', top: '12px', left: '12px', backgroundColor: '#2dd4bf', color: 'white', fontSize: '9px', fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase', padding: '3px 8px', borderRadius: '100px' }}>
            Premium
          </div>
        )}
        {item.badge && (
          <div style={{ position: 'absolute', top: item.premium ? '34px' : '12px', left: '12px', backgroundColor: item.badgeColor, color: 'white', fontSize: '9px', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '3px 8px', borderRadius: '100px' }}>
            {item.badge}
          </div>
        )}
        <button onClick={() => setLiked(!liked)}
          style={{ position: 'absolute', top: '12px', right: '12px', width: '34px', height: '34px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(8px)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.12)', fontSize: '15px', color: liked ? '#ef4444' : '#64748b' }}
        >{liked ? '♥' : '♡'}</button>
      </div>

      <div style={{ padding: '14px 16px 16px' }}>
        <span style={{ fontSize: '9px', fontWeight: 800, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#2dd4bf' }}>
          {item.category}
        </span>
        <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a', margin: '4px 0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {item.title}
        </h3>
        <p style={{ fontSize: '11px', color: '#94a3b8', marginBottom: '10px' }}>📍 {item.location} · {item.time}</p>

        {item.tags.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: '6px', marginBottom: '12px' }}>
            {item.tags.map(tag => (
              <span key={tag} style={{ backgroundColor: '#eef5f2', color: '#3c4a46', fontSize: '10px', fontWeight: 700, padding: '3px 8px', borderRadius: '100px' }}>{tag}</span>
            ))}
          </div>
        )}

        <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '14px' }}>
          <span style={{ fontSize: '17px', fontWeight: 900, color: '#2dd4bf', letterSpacing: '-0.01em' }}>{item.price}</span>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button style={{ flex: 1, backgroundColor: '#2dd4bf', color: 'white', border: 'none', padding: '10px', borderRadius: '100px', fontWeight: 700, fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>💬 WhatsApp</button>
          <button style={{ flex: 1, border: '2px solid #2dd4bf', color: '#2dd4bf', backgroundColor: 'transparent', padding: '10px', borderRadius: '100px', fontWeight: 700, fontSize: '13px', cursor: 'pointer' }}>Message</button>
        </div>
      </div>
    </div>
  )
}

export default function JewelryWatchesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = React.use(params)
  const [activePill, setActivePill] = useState('All Jewelry & Watches')
  const [activeSeller, setActiveSeller] = useState('All Sellers')

  return (
    <div style={{ fontFamily: 'Inter, system-ui, sans-serif', backgroundColor: '#f4fbf8', minHeight: '100vh' }}>

      {/* HERO */}
      <section style={{ position: 'relative', height: '380px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        <img src="https://images.pexels.com/photos/691046/pexels-photo-691046.jpeg?auto=compress&w=1400" alt="Jewelry & Watches"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.75), rgba(0,0,0,0.25))' }} />
        <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', padding: '0 20px', maxWidth: '760px', width: '100%' }}>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '12px', fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '12px' }}>
            Find Exquisite Pieces in Morocco
          </p>
          <h1 style={{ fontSize: '40px', fontWeight: 900, color: 'white', letterSpacing: '-0.02em', lineHeight: 1.15, marginBottom: '24px' }}>
            Jewelry &amp; Watches
          </h1>
          <div style={{ display: 'flex', gap: '8px', backgroundColor: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(20px)', borderRadius: '100px', padding: '8px', border: '1px solid rgba(255,255,255,0.3)' }}>
            <input
              type="text"
              placeholder="Search watches, rings, necklaces..."
              style={{ flex: 1, backgroundColor: 'transparent', border: 'none', outline: 'none', padding: '10px 20px', fontSize: '15px', color: 'white' }}
            />
            <button style={{ backgroundColor: '#2dd4bf', color: '#0f9b8e', border: 'none', padding: '12px 28px', borderRadius: '100px', fontWeight: 700, fontSize: '14px', cursor: 'pointer' }}>
              Search
            </button>
          </div>
        </div>
      </section>

      {/* FILTER BAR */}
      <section style={{ backgroundColor: 'white', borderBottom: '1px solid #eef5f2', padding: '16px 0', position: 'sticky', top: 0, zIndex: 40 }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '24px' }}>
          <Link href={`/${locale}`} style={{ fontSize: '22px', fontWeight: 900, color: '#0f172a', letterSpacing: '-0.02em', textDecoration: 'none' }}>
            Sou<span style={{ color: '#2dd4bf' }}>Kni</span>
          </Link>
          <div style={{ display: 'flex', gap: '6px', flex: 1, maxWidth: '900px', backgroundColor: '#f4fbf8', border: '1px solid #eef5f2', borderRadius: '100px', padding: '6px' }}>
            <div style={{ flex: 1, padding: '8px 16px', borderRight: '1px solid #dde4e1' }}>
              <p style={{ fontSize: '9px', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em' }}>City</p>
              <p style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>Rabat</p>
            </div>
            <div style={{ flex: 2, padding: '8px 16px' }}>
              <p style={{ fontSize: '9px', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Keyword</p>
              <input placeholder="Search jewelry & watches..." style={{ border: 'none', outline: 'none', background: 'transparent', fontSize: '13px', width: '100%', fontFamily: 'Inter, sans-serif' }} />
            </div>
          </div>
          <button style={{ backgroundColor: '#2dd4bf', color: '#0f9b8e', border: 'none', padding: '12px 24px', borderRadius: '100px', fontWeight: 700, fontSize: '13px', cursor: 'pointer', whiteSpace: 'nowrap' as const }}>
            + Place your FREE Ad
          </button>
        </div>
      </section>

      <main style={{ maxWidth: '1440px', margin: '0 auto', padding: '40px' }}>

        {/* Breadcrumb + Title */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#6b7a76', marginBottom: '12px' }}>
          <Link href={`/${locale}`} style={{ color: '#6b7a76', textDecoration: 'none' }}>Home</Link>
          <span>›</span>
          <Link href={`/${locale}/vault`} style={{ color: '#6b7a76', textDecoration: 'none' }}>The Vault</Link>
          <span>›</span>
          <span style={{ color: '#0f172a', fontWeight: 600 }}>Jewelry &amp; Watches</span>
        </nav>

        <div style={{ display: 'flex', flexWrap: 'wrap' as const, alignItems: 'center', justifyContent: 'space-between', gap: '16px', marginBottom: '28px' }}>
          <h2 style={{ fontSize: '26px', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.01em' }}>
            New &amp; Used Jewelry &amp; Watches for sale in Rabat <span style={{ color: '#6b7a76', fontWeight: 500 }}>· 3,214 Ads</span>
          </h2>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '10px 16px', borderRadius: '12px', border: '1px solid #dde4e1', background: 'white', fontSize: '13px', fontWeight: 600, color: '#0f172a', cursor: 'pointer' }}>↕ Sort: Default</button>
            <button style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '10px 16px', borderRadius: '12px', border: '1px solid #dde4e1', background: 'white', fontSize: '13px', fontWeight: 600, color: '#0f172a', cursor: 'pointer' }}>🔖 Save Search</button>
          </div>
        </div>

        {/* Seller filters */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
          {sellerFilters.map(s => (
            <button key={s} onClick={() => setActiveSeller(s)}
              style={{
                padding: '10px 22px', borderRadius: '12px', fontSize: '13px', fontWeight: 700, cursor: 'pointer',
                border: activeSeller === s ? 'none' : '1px solid #dde4e1',
                backgroundColor: activeSeller === s ? '#2dd4bf' : 'white',
                color: activeSeller === s ? '#0f9b8e' : '#3c4a46',
              }}
            >{s}</button>
          ))}
        </div>

        {/* Category pills */}
        <div style={{ display: 'flex', gap: '10px', overflowX: 'auto' as const, paddingBottom: '8px', marginBottom: '32px' }}>
          {categoryPills.map(p => (
            <button key={p} onClick={() => setActivePill(p)}
              style={{
                padding: '10px 20px', borderRadius: '100px', fontSize: '13px', fontWeight: 700, cursor: 'pointer', whiteSpace: 'nowrap' as const,
                border: activePill === p ? 'none' : '1px solid #dde4e1',
                backgroundColor: activePill === p ? '#2dd4bf' : '#eef5f2',
                color: activePill === p ? '#0f9b8e' : '#3c4a46',
              }}
            >{p}</button>
          ))}
        </div>

        {/* FEATURED GRID */}
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '24px' }}>
          <div>
            <span style={{ fontSize: '11px', fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#2dd4bf' }}>Curated Excellence</span>
            <h3 style={{ fontSize: '24px', fontWeight: 800, color: '#0f172a', marginTop: '4px' }}>Featured Jewelry &amp; Watches</h3>
          </div>
          <p style={{ fontSize: '14px', color: '#6b7a76' }}>Showing 1,180 luxury listings</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px', marginBottom: '56px' }}>
          {listings.slice(0, 4).map(item => <ListingCard key={item.id} item={item} />)}
        </div>

        {/* AUTO PRO BANNER */}
        <div style={{ position: 'relative', height: '280px', borderRadius: '40px', overflow: 'hidden', marginBottom: '56px' }}>
          <img src="https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&w=1400" alt="SouKni Auto Pro"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(0,0,0,0.8), rgba(0,0,0,0.4), transparent)' }} />
          <div style={{ position: 'relative', zIndex: 1, height: '100%', display: 'flex', alignItems: 'center', padding: '0 56px', maxWidth: '480px' }}>
            <div>
              <h4 style={{ fontSize: '34px', fontWeight: 800, color: 'white', marginBottom: '12px', letterSpacing: '-0.02em' }}>SouKni Auto Pro</h4>
              <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '15px', marginBottom: '24px', lineHeight: 1.6 }}>Discover the pinnacle of automotive luxury with our verified professional sellers.</p>
              <button style={{ backgroundColor: '#2dd4bf', color: '#0f9b8e', border: 'none', padding: '14px 30px', borderRadius: '100px', fontWeight: 700, fontSize: '14px', cursor: 'pointer' }}>Explore Inventory →</button>
            </div>
          </div>
        </div>

        {/* NEW ARRIVALS GRID */}
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '24px' }}>
          <div>
            <span style={{ fontSize: '11px', fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#2dd4bf' }}>Premium Selection</span>
            <h3 style={{ fontSize: '24px', fontWeight: 800, color: '#0f172a', marginTop: '4px' }}>New Arrivals</h3>
          </div>
          <p style={{ fontSize: '14px', color: '#6b7a76' }}>12 new premium listings</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px', marginBottom: '56px' }}>
          {listings.slice(4, 8).map(item => <ListingCard key={item.id} item={item} />)}
        </div>

        {/* DIAMOND BANNER */}
        <div style={{ position: 'relative', borderRadius: '40px', overflow: 'hidden', background: 'linear-gradient(to right, #2dd4bf, #2dd4bf)', padding: '56px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '40px', marginBottom: '56px' }}>
          <div style={{ position: 'relative', zIndex: 1, maxWidth: '560px' }}>
            <span style={{ backgroundColor: 'rgba(255,255,255,0.2)', color: 'white', fontSize: '11px', fontWeight: 800, padding: '6px 16px', borderRadius: '100px', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '20px', display: 'inline-block' }}>Exclusive Access</span>
            <h2 style={{ color: 'white', fontSize: '32px', fontWeight: 800, marginBottom: '16px', letterSpacing: '-0.02em' }}>Unlock the Power of Diamond Membership</h2>
            <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '15px', marginBottom: '28px', lineHeight: 1.6 }}>Maximize your reach, gain priority placement, and showcase your luxury listings with the most prestigious badge in Morocco's marketplace.</p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button style={{ backgroundColor: 'white', color: '#2dd4bf', border: 'none', padding: '14px 30px', borderRadius: '100px', fontWeight: 700, fontSize: '14px', cursor: 'pointer' }}>Get Started</button>
              <button style={{ backgroundColor: 'transparent', border: '1px solid rgba(255,255,255,0.4)', color: 'white', padding: '14px 30px', borderRadius: '100px', fontWeight: 700, fontSize: '14px', cursor: 'pointer' }}>Learn More</button>
            </div>
          </div>
          <div style={{ width: '180px', height: '220px', backgroundColor: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(20px)', borderRadius: '32px', display: 'flex', flexDirection: 'column' as const, alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <span style={{ fontSize: '56px', marginBottom: '12px' }}>💎</span>
            <p style={{ color: 'white', fontWeight: 800, fontSize: '18px', letterSpacing: '0.05em' }}>DIAMOND</p>
            <div style={{ width: '36px', height: '2px', backgroundColor: 'rgba(255,255,255,0.5)', margin: '10px 0' }} />
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Premium Status</p>
          </div>
        </div>

      </main>
    </div>
  )
}
