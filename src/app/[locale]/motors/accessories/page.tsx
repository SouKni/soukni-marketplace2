'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { MapPin, Search } from 'lucide-react'
import { useMarket } from '@/context/MarketContext'

const subCategories = ['All Parts', 'Wheels & Tyres', 'Engine Parts', 'Exhaust', 'Suspension', 'Interior', 'Exterior', 'Electronics', 'View More']

const performance = [
  { title: 'Brembo GT Braking System', price: 12400, cat: 'Performance', cond: 'Brand New', location: 'Casablanca', time: '1 hour ago', badge: 'verified', image: 'https://images.pexels.com/photos/4489749/pexels-photo-4489749.jpeg?auto=compress&w=600' },
  { title: 'Garrett G-Series Turbo Kit', price: 15500, cat: 'Engine', cond: 'Brand New', location: 'Casablanca', time: '3 hours ago', badge: 'diamond', image: 'https://images.pexels.com/photos/1482516/pexels-photo-1482516.jpeg?auto=compress&w=600' },
  { title: 'Akrapovic Titanium Exhaust', price: 42000, cat: 'Exhaust', cond: 'Brand New', location: 'Marrakech', time: 'Just now', badge: 'diamond', image: 'https://images.pexels.com/photos/3807517/pexels-photo-3807517.jpeg?auto=compress&w=600' },
  { title: 'KW Coilover Suspension V3', price: 18500, cat: 'Suspension', cond: 'Brand New', location: 'Casablanca', time: '5 hours ago', badge: 'verified', image: 'https://images.pexels.com/photos/4489749/pexels-photo-4489749.jpeg?auto=compress&w=600' },
]

const wheels = [
  { title: 'Vossen HF-5 Forged Wheels', price: 28000, cat: 'Wheels', cond: 'Used (Excellent)', location: 'Rabat', time: '2 hours ago', badge: 'diamond', image: 'https://images.pexels.com/photos/244553/pexels-photo-244553.jpeg?auto=compress&w=600' },
  { title: 'HRE Performance Wheels Set', price: 35000, cat: 'Wheels', cond: 'Brand New', location: 'Tangier', time: '4 hours ago', badge: 'diamond', image: 'https://images.pexels.com/photos/244553/pexels-photo-244553.jpeg?auto=compress&w=600' },
  { title: 'Michelin Pilot Sport 5 Set', price: 8400, cat: 'Tyres', cond: 'Brand New', location: 'Agadir', time: '1 day ago', badge: 'verified', image: 'https://images.pexels.com/photos/1482516/pexels-photo-1482516.jpeg?auto=compress&w=600' },
  { title: 'BBS CH-R Gold Wheels 20"', price: 31000, cat: 'Wheels', cond: 'Brand New', location: 'Casablanca', time: '6 hours ago', badge: 'diamond', image: 'https://images.pexels.com/photos/244553/pexels-photo-244553.jpeg?auto=compress&w=600' },
]

const interior = [
  { title: 'Recaro Sport Seats Pair', price: 22000, cat: 'Interior', cond: 'Brand New', location: 'Rabat', time: '1 day ago', badge: 'verified', image: 'https://images.pexels.com/photos/3807517/pexels-photo-3807517.jpeg?auto=compress&w=600' },
  { title: 'Alcantara Steering Wheel', price: 4500, cat: 'Interior', cond: 'Brand New', location: 'Casablanca', time: '2 days ago', badge: 'verified', image: 'https://images.pexels.com/photos/1482516/pexels-photo-1482516.jpeg?auto=compress&w=600' },
  { title: 'Pioneer CarPlay Head Unit', price: 6800, cat: 'Electronics', cond: 'Brand New', location: 'Marrakech', time: '3 hours ago', badge: 'verified', image: 'https://images.pexels.com/photos/3807517/pexels-photo-3807517.jpeg?auto=compress&w=600' },
  { title: 'LED Interior Ambient Kit', price: 1200, cat: 'Electronics', cond: 'Brand New', location: 'Tangier', time: '5 hours ago', badge: 'verified', image: 'https://images.pexels.com/photos/4489749/pexels-photo-4489749.jpeg?auto=compress&w=600' },
]

function AccessoryCard({ item }: { item: typeof performance[0] }) {
  const [saved, setSaved] = useState(false)
  const [hovered, setHovered] = useState(false)
  const { formatPrice } = useMarket()
  return (
    <article onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{ backgroundColor: 'white', borderRadius: '28px', overflow: 'hidden', boxShadow: hovered ? '0 20px 40px rgba(0,0,0,0.12)' : '0 4px 16px rgba(0,0,0,0.06)', border: '1px solid rgba(241,245,249,0.8)', transition: 'all 0.3s', display: 'flex', flexDirection: 'column', transform: hovered ? 'translateY(-4px)' : 'translateY(0)' }}>
      <div style={{ position: 'relative', height: '200px', overflow: 'hidden' }}>
        <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.7s', transform: hovered ? 'scale(1.1)' : 'scale(1)' }} />
        {item.badge === 'diamond' && (
          <div style={{ position: 'absolute', top: '12px', left: '12px', background: 'linear-gradient(135deg, #006b5f, #2dd4bf)', color: 'white', fontSize: '9px', fontWeight: 800, padding: '4px 12px', borderRadius: '100px', textTransform: 'uppercase', letterSpacing: '0.08em', boxShadow: '0 4px 12px rgba(45,212,191,0.4)' }}>💎 Diamond Member</div>
        )}
        {item.badge === 'verified' && (
          <div style={{ position: 'absolute', top: '12px', left: '12px', backgroundColor: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(8px)', color: '#006b5f', fontSize: '9px', fontWeight: 800, padding: '4px 12px', borderRadius: '100px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>✓ Verified</div>
        )}
        <button onClick={e => { e.stopPropagation(); setSaved(!saved) }}
          style={{ position: 'absolute', top: '12px', right: '12px', width: '36px', height: '36px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.3)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', transition: 'all 0.2s' }}
          onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'white' }}
          onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.2)' }}>
          {saved ? '❤️' : '🤍'}
        </button>
        <div style={{ position: 'absolute', bottom: '12px', left: '12px', backgroundColor: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(8px)', color: 'white', fontSize: '10px', fontWeight: 600, padding: '3px 10px', borderRadius: '100px' }}>{item.time}</div>
      </div>
      <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ fontSize: '9px', fontWeight: 800, color: '#2dd4bf', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '6px' }}>{item.cat}</div>
        <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a', marginBottom: '4px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.title}</h3>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <span style={{ fontSize: '20px', fontWeight: 800, color: '#006b5f' }}>{formatPrice(item.price)}</span>
          <span style={{ fontSize: '11px', color: '#64748b', backgroundColor: '#f1f5f9', padding: '2px 8px', borderRadius: '4px' }}>📦 {item.cond}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: '#94a3b8', borderTop: '1px solid #f8fafc', paddingTop: '12px', marginBottom: '14px' }}>
          <MapPin size={11} />{item.location}
        </div>
        <div style={{ display: 'flex', gap: '8px', marginTop: 'auto' }}>
          <button style={{ flex: 1, padding: '11px', borderRadius: '100px', border: '1px solid rgba(186,202,197,0.3)', backgroundColor: '#f4fbf8', color: '#3c4a46', fontWeight: 700, fontSize: '13px', cursor: 'pointer', transition: 'all 0.15s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
            onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#e8efec' }}
            onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#f4fbf8' }}>
            💬 Message
          </button>
          <button style={{ flex: 1, padding: '11px', borderRadius: '100px', border: 'none', backgroundColor: '#25D366', color: 'white', fontWeight: 700, fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', transition: 'opacity 0.15s' }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.88'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}>
            WhatsApp
          </button>
        </div>
      </div>
    </article>
  )
}

function SectionRow({ title, items }: { title: string, items: typeof performance }) {
  return (
    <section style={{ marginBottom: '56px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.01em' }}>{title}</h2>
        <a href="#" style={{ color: '#2dd4bf', fontWeight: 700, fontSize: '14px', textDecoration: 'none' }}>View All →</a>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
        {items.map((item, i) => <AccessoryCard key={i} item={item} />)}
      </div>
    </section>
  )
}

export default function AccessoriesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = React.use(params)
  const [activeCat, setActiveCat] = useState('All Parts')
  const [diamondFirst, setDiamondFirst] = useState(false)
  const [activeFilter, setActiveFilter] = useState('All')

  return (
    <div style={{ fontFamily: 'Inter, system-ui, sans-serif', backgroundColor: '#f4fbf8', minHeight: '100vh' }}>

      {/* HERO */}
      <section style={{ position: 'relative', height: '380px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        <img src="https://images.pexels.com/photos/4489749/pexels-photo-4489749.jpeg?auto=compress&w=1400" alt="Parts & Accessories"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(15,23,42,0.85), rgba(0,0,0,0.3))' }} />
        <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', padding: '0 20px', maxWidth: '700px', width: '100%' }}>
          <h1 style={{ fontSize: '48px', fontWeight: 900, color: 'white', letterSpacing: '-0.03em', marginBottom: '8px', lineHeight: 1.1 }}>Parts & Accessories</h1>
          <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.8)', marginBottom: '28px' }}>3,215 verified listings across Morocco</p>
          <div style={{ display: 'flex', gap: '8px', backgroundColor: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.25)', borderRadius: '100px', padding: '8px 8px 8px 24px', maxWidth: '560px', margin: '0 auto' }}>
            <Search size={18} color="rgba(255,255,255,0.7)" style={{ flexShrink: 0, alignSelf: 'center' }} />
            <input type="text" placeholder="Search brands, parts, accessories..."
              style={{ flex: 1, backgroundColor: 'transparent', border: 'none', outline: 'none', fontSize: '15px', color: 'white', fontFamily: 'Inter, sans-serif', padding: '6px 8px' }} />
            <button style={{ backgroundColor: '#2dd4bf', color: 'white', border: 'none', padding: '12px 24px', borderRadius: '100px', fontWeight: 700, fontSize: '13px', cursor: 'pointer', whiteSpace: 'nowrap' }}>Search</button>
          </div>
        </div>
      </section>

      {/* STATS */}
      <div style={{ maxWidth: '1280px', margin: '-40px auto 0', padding: '0 24px', position: 'relative', zIndex: 20 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
          {[{ label: 'Total Listings', value: '3,215' }, { label: 'Verified Sellers', value: '840' }, { label: 'Brands', value: '200+' }, { label: 'Cities', value: '12' }].map(s => (
            <div key={s.label} style={{ backgroundColor: 'white', borderRadius: '20px', padding: '20px 24px', boxShadow: '0 8px 32px rgba(0,0,0,0.08)', textAlign: 'center' }}>
              <p style={{ fontSize: '26px', fontWeight: 800, color: '#2dd4bf', marginBottom: '4px' }}>{s.value}</p>
              <p style={{ fontSize: '11px', fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '48px 24px 80px' }}>

        {/* BREADCRUMB */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#64748b', marginBottom: '32px' }}>
          <Link href={`/${locale}`} style={{ color: '#2dd4bf', textDecoration: 'none', fontWeight: 600 }}>Home</Link>
          <span>›</span>
          <Link href={`/${locale}/motors`} style={{ color: '#2dd4bf', textDecoration: 'none', fontWeight: 600 }}>Motors</Link>
          <span>›</span>
          <span style={{ color: '#0f172a', fontWeight: 700 }}>Parts & Accessories</span>
        </nav>

        {/* FILTER BAR */}
        <div style={{ backgroundColor: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.6)', borderRadius: '20px', padding: '8px', boxShadow: '0 4px 24px rgba(0,0,0,0.06)', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)' }}>
            {[{ label: 'City', val: 'All Morocco' }, { label: 'Keyword', val: 'Search brands...' }, { label: 'Price (MAD)', val: 'Any Range' }, { label: 'Condition', val: 'All' }, { label: 'Category', val: 'All Parts' }].map((f, i) => (
              <div key={f.label} style={{ padding: '10px 16px', borderRight: i < 4 ? '1px solid #f1f5f9' : 'none', display: 'flex', flexDirection: 'column', cursor: 'pointer' }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = '#f8fafc'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}>
                <span style={{ fontSize: '9px', textTransform: 'uppercase', fontWeight: 700, color: '#64748b', letterSpacing: '0.1em', marginBottom: '3px' }}>{f.label}</span>
                <span style={{ fontSize: '13px', fontWeight: 500, color: '#0f172a' }}>{f.val}</span>
              </div>
            ))}
          </div>
          <button style={{ backgroundColor: '#2dd4bf', color: 'white', border: 'none', padding: '14px 20px', borderRadius: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700, fontSize: '13px', flexShrink: 0 }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#0f9b8e'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = '#2dd4bf'}>
            <Search size={18} /> Find Parts
          </button>
        </div>

        {/* TITLE + SORT */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h1 style={{ fontSize: '22px', fontWeight: 800, color: '#0f172a' }}>
            New and Used Parts & Accessories in Morocco <span style={{ color: '#64748b', fontWeight: 400, fontSize: '16px' }}>3,215 Ads</span>
          </h1>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button style={{ border: '1px solid #e2e8f0', backgroundColor: 'white', padding: '8px 16px', borderRadius: '100px', fontSize: '13px', fontWeight: 500, color: '#64748b', cursor: 'pointer' }}>⇅ Sort: Default</button>
            <button style={{ border: '1px solid #e2e8f0', backgroundColor: 'white', padding: '8px 16px', borderRadius: '100px', fontSize: '13px', fontWeight: 500, color: '#64748b', cursor: 'pointer' }}>🔖 Save Search</button>
          </div>
        </div>

        {/* SUB-CATEGORY PILLS */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
          {subCategories.map(cat => (
            <button key={cat} onClick={() => setActiveCat(cat)}
              style={{ padding: '8px 20px', borderRadius: '100px', border: 'none', cursor: 'pointer', fontSize: '13px', fontWeight: 600, backgroundColor: activeCat === cat ? '#0f172a' : '#e8efec', color: activeCat === cat ? 'white' : '#161d1b', transition: 'all 0.15s', whiteSpace: 'nowrap' }}>
              {cat}
            </button>
          ))}
        </div>

        {/* FILTER ROW + DIAMOND TOGGLE */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '40px' }}>
          <div style={{ display: 'flex', gap: '8px' }}>
            {['All', 'Brand New', 'Used (Excellent)', 'Used (Good)'].map(f => (
              <button key={f} onClick={() => setActiveFilter(f)}
                style={{ padding: '6px 20px', borderRadius: '8px', backgroundColor: 'white', border: activeFilter === f ? '1px solid #2dd4bf' : '1px solid #e2e8f0', fontSize: '13px', fontWeight: 500, color: activeFilter === f ? '#2dd4bf' : '#0f172a', cursor: 'pointer' }}>{f}</button>
            ))}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>Show SouKni Diamond Verified First</span>
            <div onClick={() => setDiamondFirst(!diamondFirst)}
              style={{ width: '44px', height: '24px', borderRadius: '100px', backgroundColor: diamondFirst ? '#2dd4bf' : '#e2e8f0', cursor: 'pointer', position: 'relative', transition: 'background 0.2s' }}>
              <div style={{ position: 'absolute', top: '2px', left: diamondFirst ? '22px' : '2px', width: '20px', height: '20px', borderRadius: '50%', backgroundColor: 'white', transition: 'left 0.2s', boxShadow: '0 1px 4px rgba(0,0,0,0.2)' }} />
            </div>
          </div>
        </div>

        {/* SECTION ROWS */}
        <SectionRow title="Featured Performance Parts" items={performance} />

        {/* AUTO PRO BANNER */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '56px' }}>
          <div style={{ position: 'relative', height: '220px', borderRadius: '24px', overflow: 'hidden', background: 'linear-gradient(135deg, #006b5f, #2dd4bf)', display: 'flex', alignItems: 'center', padding: '40px' }}>
            <div style={{ position: 'absolute', right: '-10px', bottom: '-20px', fontSize: '120px', opacity: 0.1 }}>🔧</div>
            <div style={{ position: 'relative', zIndex: 1 }}>
              <span style={{ fontSize: '10px', fontWeight: 800, color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: '0.15em', display: 'block', marginBottom: '8px' }}>Certified Services</span>
              <h2 style={{ fontSize: '28px', fontWeight: 800, color: 'white', marginBottom: '8px', lineHeight: 1.2 }}>SouKni Auto Pro</h2>
              <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.8)', marginBottom: '20px' }}>Premium installation and diagnostic services across Morocco.</p>
              <button style={{ backgroundColor: 'white', color: '#006b5f', border: 'none', padding: '10px 24px', borderRadius: '100px', fontWeight: 700, fontSize: '13px', cursor: 'pointer' }}>Explore Services</button>
            </div>
          </div>
          <div style={{ position: 'relative', height: '220px', borderRadius: '24px', overflow: 'hidden', backgroundColor: '#0f172a', display: 'flex', alignItems: 'center', padding: '40px' }}>
            <div style={{ position: 'absolute', right: '-10px', bottom: '-20px', fontSize: '120px', opacity: 0.08 }}>💎</div>
            <div style={{ position: 'relative', zIndex: 1 }}>
              <span style={{ fontSize: '10px', fontWeight: 800, color: '#2dd4bf', textTransform: 'uppercase', letterSpacing: '0.15em', display: 'block', marginBottom: '8px' }}>Premium Access</span>
              <h2 style={{ fontSize: '28px', fontWeight: 800, color: 'white', marginBottom: '8px', lineHeight: 1.2 }}>Become a Diamond Member</h2>
              <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', marginBottom: '20px' }}>0% commission and unlimited priority listings on all parts.</p>
              <button style={{ backgroundColor: '#2dd4bf', color: '#00201c', border: 'none', padding: '10px 24px', borderRadius: '100px', fontWeight: 700, fontSize: '13px', cursor: 'pointer' }}>Join Now</button>
            </div>
          </div>
        </div>

        <SectionRow title="Featured Wheels & Tyres" items={wheels} />
        <SectionRow title="Featured Interior & Electronics" items={interior} />

        {/* DIAMOND BANNER */}
        <section style={{ borderRadius: '24px', background: 'linear-gradient(135deg, #2dd4bf 0%, #0f766e 100%)', padding: '40px 48px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '24px', marginBottom: '0' }}>
          <div>
            <h2 style={{ fontSize: '28px', fontWeight: 800, color: 'white', marginBottom: '8px', letterSpacing: '-0.02em' }}>Sell Your Parts — 100% Free</h2>
            <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.9)' }}>Reach thousands of buyers across Morocco. Post your listing in minutes.</p>
          </div>
          <button style={{ backgroundColor: 'white', color: '#006b5f', border: 'none', padding: '14px 32px', borderRadius: '12px', fontWeight: 800, fontSize: '15px', cursor: 'pointer', flexShrink: 0, whiteSpace: 'nowrap' }}>Post Free Ad →</button>
        </section>

      </div>
    </div>
  )
}
