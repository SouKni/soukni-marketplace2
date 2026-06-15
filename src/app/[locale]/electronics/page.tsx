'use client'

import { useState } from 'react'
import { MapPin, ChevronDown, Search } from 'lucide-react'
import { useMarket } from '@/context/MarketContext'

const subCategories = [
  { icon: '📱', label: 'Mobiles', count: '9,318', slug: 'mobiles' },
  { icon: '💻', label: 'Laptops', count: '4,210' },
  { icon: '📺', label: 'TVs', count: '2,840' },
  { icon: '🎧', label: 'Audio', count: '1,930' },
  { icon: '📷', label: 'Cameras', count: '1,120' },
  { icon: '🖨️', label: 'Printers', count: '860' },
  { icon: '🎮', label: 'Gaming', count: '3,400' },
  { icon: '⌚', label: 'Wearables', count: '1,540' },
  { icon: '🔌', label: 'Accessories', count: '6,200' },
  { icon: '🖥️', label: 'Desktops', count: '980' },
]

const listings = [
  { title: 'iPhone 15 Pro Max — Titanium, 256GB', category: 'Mobiles', price: 12500, location: 'Casablanca', time: '20 min ago', badge: 'verified', image: 'https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&w=600' },
  { title: 'Samsung Galaxy S24 Ultra — 512GB', category: 'Mobiles', price: 11800, location: 'Rabat', time: '1 hour ago', badge: 'verified', image: 'https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg?auto=compress&w=600' },
  { title: '2024 MacBook Pro 14" M3 Max', category: 'Laptops', price: 28000, location: 'Casablanca', time: 'Just now', badge: 'diamond', image: 'https://images.pexels.com/photos/1229861/pexels-photo-1229861.jpeg?auto=compress&w=600' },
  { title: 'Sony 75" 8K OLED Smart TV', category: 'TVs', price: 32000, location: 'Marrakech', time: '2 hours ago', badge: 'diamond', image: 'https://images.pexels.com/photos/1571442/pexels-photo-1571442.jpeg?auto=compress&w=600' },
  { title: 'iPad Pro 13" M4 — 256GB + Pencil', category: 'Tablets', price: 14200, location: 'Tangier', time: '3 hours ago', badge: 'verified', image: 'https://images.pexels.com/photos/1334597/pexels-photo-1334597.jpeg?auto=compress&w=600' },
  { title: 'Sony A7R V Full-Frame Mirrorless', category: 'Cameras', price: 32000, location: 'Rabat', time: '4 hours ago', badge: 'diamond', image: 'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&w=600' },
  { title: 'PS5 + 3 Controllers + 8 Games', category: 'Gaming', price: 8500, location: 'Casablanca', time: '5 hours ago', badge: null, image: 'https://images.pexels.com/photos/3945683/pexels-photo-3945683.jpeg?auto=compress&w=600' },
  { title: 'Apple Watch Ultra 2 — Titanium', category: 'Wearables', price: 7200, location: 'Marrakech', time: '1 day ago', badge: 'verified', image: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&w=600' },
  { title: 'Bose QC Ultra Headphones', category: 'Audio', price: 3800, location: 'Tangier', time: '6 hours ago', badge: null, image: 'https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&w=600' },
  { title: 'Google Pixel 9 Pro XL — 128GB', category: 'Mobiles', price: 10500, location: 'Fès', time: '2 hours ago', badge: 'verified', image: 'https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg?auto=compress&w=600' },
  { title: 'Dell XPS 15 — i9, RTX 4070', category: 'Laptops', price: 22000, location: 'Casablanca', time: '3 hours ago', badge: 'diamond', image: 'https://images.pexels.com/photos/303383/pexels-photo-303383.jpeg?auto=compress&w=600' },
  { title: 'DJI Mavic 3 Pro Drone — Fly More', category: 'Cameras', price: 18500, location: 'Agadir', time: '1 day ago', badge: 'diamond', image: 'https://images.pexels.com/photos/1392595/pexels-photo-1392595.jpeg?auto=compress&w=600' },
]

type Listing = typeof listings[0]

function ElectronicsCard({ item }: { item: Listing }) {
  const [hovered, setHovered] = useState(false)
  const [saved, setSaved] = useState(false)
  const { formatPrice } = useMarket()

  return (
    <article
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ backgroundColor: 'white', borderRadius: '32px', overflow: 'hidden', boxShadow: hovered ? '0 20px 40px rgba(0,0,0,0.1)' : '0 2px 8px rgba(0,0,0,0.04)', border: '1px solid #f1f5f9', transition: 'all 0.3s', display: 'flex', flexDirection: 'column', cursor: 'pointer' }}
    >
      <div style={{ position: 'relative', height: '200px', overflow: 'hidden' }}>
        <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s', transform: hovered ? 'scale(1.08)' : 'scale(1)' }} />
        {item.badge === 'diamond' && (
          <div style={{ position: 'absolute', top: '12px', left: '12px', background: 'linear-gradient(135deg, #2dd4bf, #0d9488)', color: 'white', fontSize: '9px', fontWeight: 700, padding: '4px 10px', borderRadius: '100px', textTransform: 'uppercase', letterSpacing: '0.06em', boxShadow: '0 4px 12px rgba(45,212,191,0.4)' }}>
            💎 Diamond Member
          </div>
        )}
        {item.badge === 'verified' && (
          <div style={{ position: 'absolute', top: '12px', left: '12px', backgroundColor: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(8px)', color: '#2dd4bf', fontSize: '9px', fontWeight: 700, padding: '4px 10px', borderRadius: '100px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            ✓ Verified
          </div>
        )}
        <button
          onClick={e => { e.stopPropagation(); setSaved(!saved) }}
          style={{ position: 'absolute', top: '12px', right: '12px', width: '34px', height: '34px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(8px)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '15px' }}
        >{saved ? '❤️' : '🤍'}</button>
      </div>

      <div style={{ padding: '18px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ fontSize: '9px', fontWeight: 700, color: '#2dd4bf', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '6px' }}>{item.category}</div>
        <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a', marginBottom: '10px', lineHeight: 1.3, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{item.title}</h3>
        <div style={{ fontSize: '20px', fontWeight: 800, color: '#2dd4bf', letterSpacing: '-0.02em', marginBottom: '10px' }}>{formatPrice(item.price)}</div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '11px', color: '#94a3b8', borderTop: '1px solid #f8fafc', paddingTop: '10px', marginBottom: '14px' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><MapPin size={11} />{item.location}</span>
          <span>{item.time}</span>
        </div>
        <div style={{ display: 'flex', gap: '8px', marginTop: 'auto' }}>
          <button style={{ flex: 1, padding: '10px 8px', borderRadius: '12px', border: 'none', backgroundColor: 'rgba(45,212,191,0.1)', color: '#2dd4bf', fontWeight: 700, fontSize: '13px', cursor: 'pointer', transition: 'all 0.15s' }}
            onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#2dd4bf'; e.currentTarget.style.color = 'white' }}
            onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'rgba(45,212,191,0.1)'; e.currentTarget.style.color = '#2dd4bf' }}
          >💬 Chat</button>
          <button style={{ flex: 1, padding: '10px 8px', borderRadius: '12px', border: 'none', backgroundColor: '#22c55e', color: 'white', fontWeight: 700, fontSize: '13px', cursor: 'pointer', transition: 'background 0.15s' }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#16a34a'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = '#22c55e'}
          >📱 WhatsApp</button>
        </div>
      </div>
    </article>
  )
}

export default function ElectronicsPage() {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')

  return (
    <div style={{ fontFamily: 'Inter, system-ui, sans-serif', backgroundColor: '#f4fbf8', minHeight: '100vh' }}>

      {/* HERO */}
      <section style={{ position: 'relative', height: '460px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 16px', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(15,23,42,0.6), rgba(15,23,42,0.6)), url(https://images.pexels.com/photos/1229861/pexels-photo-1229861.jpeg?auto=compress&w=1600)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div style={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: '720px', textAlign: 'center' }}>
          <h1 style={{ fontSize: '48px', fontWeight: 800, color: 'white', marginBottom: '8px', letterSpacing: '-0.02em', lineHeight: 1.1, textShadow: '0 2px 20px rgba(0,0,0,0.3)' }}>Mobiles & Electronics</h1>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '16px', marginBottom: '28px' }}>Morocco's largest marketplace for tech — 38,000+ verified listings</p>
          <div style={{ background: 'rgba(255,255,255,0.72)', backdropFilter: 'blur(16px)', borderRadius: '100px', padding: '6px 6px 6px 24px', display: 'flex', alignItems: 'center', boxShadow: '0 20px 60px rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.35)' }}>
            <Search size={18} color="#64748b" style={{ flexShrink: 0 }} />
            <input value={search} onChange={e => setSearch(e.target.value)} type="text" placeholder="Search phones, laptops, TVs..." style={{ flex: 1, backgroundColor: 'transparent', border: 'none', outline: 'none', padding: '10px 16px', fontSize: '15px', fontFamily: 'Inter, sans-serif', color: '#0f172a' }} />
            <button style={{ backgroundColor: '#2dd4bf', color: 'white', border: 'none', padding: '12px 28px', borderRadius: '100px', fontWeight: 700, fontSize: '13px', cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.08em', transition: 'background 0.15s' }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = '#0f9b8e'}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = '#2dd4bf'}
            >Search</button>
          </div>
        </div>
      </section>

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>

        {/* STATS */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginTop: '-48px', position: 'relative', zIndex: 10, marginBottom: '40px' }}>
          {[{ label: 'Total Listings', value: '38,400' }, { label: 'Verified Sellers', value: '4,200' }, { label: 'Brands', value: '150+' }, { label: 'Cities', value: '12' }].map(s => (
            <div key={s.label} style={{ backgroundColor: 'white', borderRadius: '20px', padding: '20px 24px', boxShadow: '0 8px 32px rgba(0,0,0,0.08)', textAlign: 'center' }}>
              <p style={{ fontSize: '26px', fontWeight: 800, color: '#2dd4bf', marginBottom: '4px', letterSpacing: '-0.02em' }}>{s.value}</p>
              <p style={{ fontSize: '11px', fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{s.label}</p>
            </div>
          ))}
        </div>

        {/* SUB-CATEGORY PILLS */}
        <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '8px', marginBottom: '32px', scrollbarWidth: 'none' }}>
          <button onClick={() => setActiveCategory('All')} style={{ whiteSpace: 'nowrap', padding: '10px 20px', borderRadius: '100px', fontSize: '13px', fontWeight: 700, border: 'none', cursor: 'pointer', flexShrink: 0, backgroundColor: activeCategory === 'All' ? '#2dd4bf' : 'white', color: activeCategory === 'All' ? 'white' : '#64748b', boxShadow: activeCategory === 'All' ? '0 4px 14px rgba(45,212,191,0.35)' : '0 1px 4px rgba(0,0,0,0.06)', transition: 'all 0.15s' }}>
            All Electronics
          </button>
          {subCategories.map(cat => (
            <button key={cat.label} onClick={() => setActiveCategory(cat.label)} style={{ whiteSpace: 'nowrap', padding: '10px 20px', borderRadius: '100px', fontSize: '13px', fontWeight: 700, border: 'none', cursor: 'pointer', flexShrink: 0, backgroundColor: activeCategory === cat.label ? '#2dd4bf' : 'white', color: activeCategory === cat.label ? 'white' : '#64748b', boxShadow: activeCategory === cat.label ? '0 4px 14px rgba(45,212,191,0.35)' : '0 1px 4px rgba(0,0,0,0.06)', transition: 'all 0.15s' }}>
              {cat.icon} {cat.label} <span style={{ opacity: 0.6, fontSize: '11px' }}>({cat.count})</span>
            </button>
          ))}
        </div>

        {/* FILTERS */}
        <div style={{ backgroundColor: 'white', borderRadius: '20px', padding: '16px 24px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', border: '1px solid #f1f5f9', marginBottom: '32px', display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
          {[{ label: 'City', value: 'All Morocco' }, { label: 'Condition', value: 'All' }, { label: 'Price', value: 'Any Range' }, { label: 'Brand', value: 'All Brands' }].map(f => (
            <div key={f.label} style={{ display: 'flex', flexDirection: 'column', gap: '2px', borderRight: '1px solid #f1f5f9', paddingRight: '16px' }}>
              <span style={{ fontSize: '9px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.12em' }}>{f.label}</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}>
                <span style={{ fontSize: '14px', fontWeight: 600, color: '#0f172a' }}>{f.value}</span>
                <ChevronDown size={14} color="#94a3b8" />
              </div>
            </div>
          ))}
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '13px', color: '#64748b' }}>38,400 listings found</span>
            <button style={{ padding: '8px 16px', borderRadius: '10px', border: '1px solid #e2e8f0', backgroundColor: 'white', fontSize: '13px', fontWeight: 600, color: '#334155', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
              Sort: Newest <ChevronDown size={13} />
            </button>
          </div>
        </div>

        {/* SECTION TITLE */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
          <div>
            <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#0f172a', marginBottom: '4px' }}>Discover Premium Tech</h2>
            <p style={{ fontSize: '14px', color: '#64748b' }}>38,400 curated listings across Morocco</p>
          </div>
          <button style={{ color: '#2dd4bf', fontWeight: 700, fontSize: '14px', background: 'none', border: 'none', cursor: 'pointer' }}>View All →</button>
        </div>

        {/* GRID */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px', marginBottom: '48px' }}>
          {listings.slice(0, 4).map((item, i) => <ElectronicsCard key={i} item={item} />)}
        </div>

        {/* PROMO BANNER */}
        <div style={{ position: 'relative', height: '280px', borderRadius: '40px', overflow: 'hidden', marginBottom: '48px' }}>
          <img src="https://images.pexels.com/photos/303383/pexels-photo-303383.jpeg?auto=compress&w=1600" alt="Tech Pro" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(0,0,0,0.85), rgba(0,0,0,0.2), transparent)', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 56px' }}>
            <h2 style={{ color: 'white', fontSize: '32px', fontWeight: 800, marginBottom: '8px', letterSpacing: '-0.02em' }}>SouKni Electro Pro</h2>
            <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '15px', marginBottom: '20px' }}>Certified dealers, warranty guaranteed, premium tech at your fingertips</p>
            <button style={{ backgroundColor: '#2dd4bf', color: '#00201c', border: 'none', padding: '12px 28px', borderRadius: '100px', fontWeight: 700, fontSize: '13px', cursor: 'pointer', width: 'fit-content', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Explore Pro Deals</button>
          </div>
        </div>

        {/* GRID ROW 2 */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px', marginBottom: '48px' }}>
          {listings.slice(4, 8).map((item, i) => <ElectronicsCard key={i} item={item} />)}
        </div>

        {/* GRID ROW 3 */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px', marginBottom: '64px' }}>
          {listings.slice(8, 12).map((item, i) => <ElectronicsCard key={i} item={item} />)}
        </div>

        {/* PAGINATION */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '80px' }}>
          {['‹', '1', '2', '3', '...', '12', '›'].map((p, i) => (
            <button key={i} style={{ width: '40px', height: '40px', borderRadius: '50%', border: p === '1' ? 'none' : '1px solid #e2e8f0', backgroundColor: p === '1' ? '#2dd4bf' : 'white', color: p === '1' ? 'white' : '#334155', fontSize: '14px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.15s' }}
              onMouseEnter={e => { if (p !== '1') e.currentTarget.style.backgroundColor = '#f0fdfa' }}
              onMouseLeave={e => { if (p !== '1') e.currentTarget.style.backgroundColor = 'white' }}
            >{p}</button>
          ))}
        </div>

        {/* DIAMOND BANNER */}
        <div style={{ position: 'relative', height: '320px', borderRadius: '40px', overflow: 'hidden', marginBottom: '64px' }}>
          <img src="https://images.pexels.com/photos/1229861/pexels-photo-1229861.jpeg?auto=compress&w=1600" alt="Diamond" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(0,0,0,0.8), rgba(0,0,0,0.2), transparent)', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 56px' }}>
            <span style={{ color: '#2dd4bf', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '12px' }}>💎 Exclusive Status</span>
            <h2 style={{ color: 'white', fontSize: '32px', fontWeight: 800, marginBottom: '12px', letterSpacing: '-0.02em', lineHeight: 1.2 }}>Become a SouKni Diamond Member</h2>
            <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '15px', marginBottom: '24px' }}>Unlock priority listings, verified badge, and exclusive buyer access.</p>
            <button style={{ backgroundColor: '#2dd4bf', color: '#00201c', border: 'none', padding: '13px 32px', borderRadius: '100px', fontWeight: 800, fontSize: '13px', cursor: 'pointer', width: 'fit-content', textTransform: 'uppercase', letterSpacing: '0.1em', boxShadow: '0 8px 24px rgba(45,212,191,0.4)' }}>Get Verified Now</button>
          </div>
        </div>
      </div>
    </div>
  )
}
