'use client'

import { useState, useEffect } from 'react'
import React from 'react'
import Link from 'next/link'
import { useMarket } from '@/context/MarketContext'
import { Heart, Search, MapPin, ChevronDown, MessageCircle, Phone } from 'lucide-react'

/* ─── DATA ─────────────────────────────────────────────── */
const categoryPills = [
  'Toys', 'Strollers & Prams', 'Nursery Furniture', 'Baby Clothing', 'Safety Gear', 'View More +'
]

const row1: any[] = [
  { id: 't1', badge: 'diamond', title: 'Interactive Wooden Toy Set - Montessori Inspired', price: 850, location: 'Agdal, Rabat', time: '2h ago', image: 'https://images.pexels.com/photos/163036/mario-luigi-yoshi-figures-163036.jpeg?auto=compress&w=600' },
  { id: 't2', badge: 'verified', title: 'STEM AI Learning Robot - Future Gen Edition', price: 1200, location: 'Hassan, Rabat', time: '4h ago', image: 'https://images.pexels.com/photos/8566472/pexels-photo-8566472.jpeg?auto=compress&w=600' },
  { id: 't3', badge: null, title: 'Nordic Wooden Convertible Crib - Minimalist Design', price: 12500, location: 'Souissi, Rabat', time: '1d ago', image: 'https://images.pexels.com/photos/6996221/pexels-photo-6996221.jpeg?auto=compress&w=600' },
  { id: 't4', badge: null, title: 'Electronic Smart Baby Swing - High-Tech Comfort', price: 2400, location: 'Hay Riad, Rabat', time: '5h ago', image: 'https://images.pexels.com/photos/35537/child-children-girl-happy.jpg?auto=compress&w=600' },
]

const row2: any[] = [
  { id: 't5', badge: 'diamond', title: 'Convertible Luxury Car Seat - Max Safety', price: 5400, location: 'Agdal, Rabat', time: '12h ago', image: 'https://images.pexels.com/photos/1972464/pexels-photo-1972464.jpeg?auto=compress&w=600' },
  { id: 't6', badge: 'verified', title: 'Ergonomic Designer Baby Carrier - Charcoal', price: 1100, location: 'Hassan, Rabat', time: '1d ago', image: 'https://images.pexels.com/photos/35537/child-children-girl-happy.jpg?auto=compress&w=600' },
  { id: 't7', badge: 'diamond', title: 'Premium Wooden Convertible Crib - 2024 Edition', price: 3800, location: 'Hay Riad, Rabat', time: '2h ago', image: 'https://images.pexels.com/photos/6996221/pexels-photo-6996221.jpeg?auto=compress&w=600' },
  { id: 't8', badge: 'verified', title: 'STEM AI Learning Robot - Pro Series', price: 1200, location: 'Agdal, Rabat', time: '4h ago', image: 'https://images.pexels.com/photos/8566472/pexels-photo-8566472.jpeg?auto=compress&w=600' },
]

const row3: any[] = [
  { id: 't9', badge: 'diamond', title: 'Convertible Luxury Car Seat - Max Safety Plus', price: 5400, location: 'Agdal, Rabat', time: '12h ago', image: 'https://images.pexels.com/photos/1972464/pexels-photo-1972464.jpeg?auto=compress&w=600' },
  { id: 't10', badge: 'verified', title: 'Ergonomic Designer Baby Carrier - Midnight Black', price: 1100, location: 'Hassan, Rabat', time: '1d ago', image: 'https://images.pexels.com/photos/35537/child-children-girl-happy.jpg?auto=compress&w=600' },
  { id: 't11', badge: 'diamond', title: 'Premium Wooden Convertible Crib - Oak Edition', price: 3800, location: 'Hay Riad, Rabat', time: '2h ago', image: 'https://images.pexels.com/photos/6996221/pexels-photo-6996221.jpeg?auto=compress&w=600' },
  { id: 't12', badge: 'verified', title: 'STEM AI Learning Robot - Ultimate Pro', price: 1200, location: 'Agdal, Rabat', time: '4h ago', image: 'https://images.pexels.com/photos/8566472/pexels-photo-8566472.jpeg?auto=compress&w=600' },
]

const row4: any[] = [
  { id: 't13', badge: 'diamond', title: 'Premium 4-in-1 High Chair - Natural Wood', price: 3200, location: 'Souissi, Rabat', time: '3h ago', image: 'https://images.pexels.com/photos/6996221/pexels-photo-6996221.jpeg?auto=compress&w=600' },
  { id: 't14', badge: 'verified', title: 'Electronic Smart Baby Swing - High-Tech', price: 2400, location: 'Hay Riad, Rabat', time: '5h ago', image: 'https://images.pexels.com/photos/35537/child-children-girl-happy.jpg?auto=compress&w=600' },
  { id: 't15', badge: 'diamond', title: 'Luxury Designer Baby Stroller - Mint', price: 4850, location: 'Agdal, Rabat', time: '1h ago', image: 'https://images.pexels.com/photos/1972464/pexels-photo-1972464.jpeg?auto=compress&w=600' },
  { id: 't16', badge: 'verified', title: 'Montessori Sensory Learning Set', price: 950, location: 'Hassan, Rabat', time: '6h ago', image: 'https://images.pexels.com/photos/163036/mario-luigi-yoshi-figures-163036.jpeg?auto=compress&w=600' },
]

/* ─── CARD ───────────────────────────────────────────────── */
function ToyCard({ item }: { item: any }) {
  const [saved, setSaved] = useState(false)
  const [hovered, setHovered] = useState(false)
  const { formatPrice } = useMarket()

  return (
    <article
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        backgroundColor: 'white',
        borderRadius: '24px',
        overflow: 'hidden',
        border: '1px solid rgba(186,202,197,0.2)',
        boxShadow: hovered ? '0 20px 40px rgba(0,0,0,0.12)' : '0 2px 8px rgba(0,0,0,0.04)',
        transition: 'all 0.3s',
        transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
        display: 'flex',
        flexDirection: 'column' as const,
        cursor: 'pointer',
      }}
    >
      {/* Image */}
      <div style={{ position: 'relative', aspectRatio: '1/1', overflow: 'hidden' }}>
        <img
          src={item.image} alt={item.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s', transform: hovered ? 'scale(1.06)' : 'scale(1)' }}
        />

        {/* Badge */}
        {item.badge === 'diamond' && (
          <div style={{ position: 'absolute', top: '14px', left: '14px', background: 'linear-gradient(135deg,#2dd4bf,#2dd4bf)', color: 'white', fontSize: '9px', fontWeight: 800, padding: '4px 10px', borderRadius: '100px', display: 'flex', alignItems: 'center', gap: '4px', textTransform: 'uppercase' as const, letterSpacing: '0.08em', boxShadow: '0 4px 12px rgba(0,107,95,0.3)' }}>
            💎 Diamond
          </div>
        )}
        {item.badge === 'verified' && (
          <div style={{ position: 'absolute', top: '14px', left: '14px', backgroundColor: '#0d9488', color: 'white', fontSize: '9px', fontWeight: 800, padding: '4px 10px', borderRadius: '100px', display: 'flex', alignItems: 'center', gap: '4px', textTransform: 'uppercase' as const, letterSpacing: '0.08em' }}>
            ✓ Verified
          </div>
        )}

        {/* Save */}
        <button
          onClick={e => { e.stopPropagation(); setSaved(!saved) }}
          style={{ position: 'absolute', top: '12px', right: '12px', width: '34px', height: '34px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.82)', backdropFilter: 'blur(8px)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <Heart size={16} fill={saved ? '#ef4444' : 'none'} color={saved ? '#ef4444' : '#161d1b'} />
        </button>
      </div>

      {/* Content */}
      <div style={{ padding: '18px', flex: 1, display: 'flex', flexDirection: 'column' as const }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px', gap: '8px' }}>
          <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#161d1b', lineHeight: 1.3, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical' as const, flex: 1 }}>{item.title}</h3>
          <span style={{ fontSize: '15px', fontWeight: 800, color: '#2dd4bf', whiteSpace: 'nowrap' as const }}>{formatPrice(item.price)}</span>
        </div>
        <p style={{ fontSize: '12px', color: '#6b7a76', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '3px' }}>
          <MapPin size={12} />{item.location} · {item.time}
        </p>

        {/* CTAs */}
        <div style={{ display: 'flex', gap: '8px', marginTop: 'auto' }}>
          <button
            style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', backgroundColor: 'rgba(45,212,191,0.12)', color: '#2dd4bf', border: 'none', padding: '10px', borderRadius: '100px', fontSize: '13px', fontWeight: 700, cursor: 'pointer', transition: 'all 0.15s' }}
            onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'rgba(45,212,191,0.25)' }}
            onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'rgba(45,212,191,0.12)' }}
          >
            <MessageCircle size={15} /> Message
          </button>
          <button
            style={{ width: '44px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(37,211,102,0.1)', color: '#25D366', border: 'none', borderRadius: '100px', cursor: 'pointer', transition: 'all 0.15s', flexShrink: 0 }}
            onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'rgba(37,211,102,0.22)' }}
            onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'rgba(37,211,102,0.1)' }}
          >
            <Phone size={16} />
          </button>
        </div>
      </div>
    </article>
  )
}

/* ─── PAGE ───────────────────────────────────────────────── */
export default function ToysPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = React.use(params)
  const [scrolled, setScrolled] = useState(false)
  const [activePill, setActivePill] = useState('Toys')
  const [activeSeller, setActiveSeller] = useState('All Sellers')
  const [diamondFirst, setDiamondFirst] = useState(false)
  const [keyword, setKeyword] = useState('')

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <div style={{ fontFamily: 'Inter,system-ui,sans-serif', backgroundColor: '#f4fbf8', minHeight: '100vh' }}>

      {/* ── HERO ── */}
      <section style={{ position: 'relative', height: '460px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        <img
          src="https://images.pexels.com/photos/163036/mario-luigi-yoshi-figures-163036.jpeg?auto=compress&w=1600"
          alt="Premium Toys"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(244,251,248,0.1), rgba(244,251,248,0.4) 80%, #f4fbf8)' }} />

        {/* Hero content */}
        <div style={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: '800px', padding: '0 24px', textAlign: 'center' }}>
          <h1 style={{ fontSize: '48px', fontWeight: 800, color: '#161d1b', marginBottom: '28px', letterSpacing: '-0.02em', lineHeight: 1.1, textShadow: '0 2px 8px rgba(255,255,255,0.8)' }}>
            Discover Premium Toys in <span style={{ color: '#2dd4bf', fontStyle: 'italic' }}>Rabat</span>
          </h1>

          {/* Glassmorphic search */}
          <div style={{ backgroundColor: 'rgba(244,251,248,0.7)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.4)', borderRadius: '100px', padding: '6px', display: 'flex', alignItems: 'center', boxShadow: '0 10px 30px rgba(0,107,95,0.08)', gap: '0' }}>
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 20px' }}>
              <Search size={20} color="#2dd4bf" />
              <input
                type="text" value={keyword} onChange={e => setKeyword(e.target.value)}
                placeholder="I'm looking for..."
                style={{ flex: 1, backgroundColor: 'transparent', border: 'none', outline: 'none', fontSize: '15px', fontFamily: 'Inter,sans-serif', color: '#161d1b' }}
              />
            </div>
            <div style={{ width: '1px', height: '28px', backgroundColor: 'rgba(186,202,197,0.4)' }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 20px' }}>
              <MapPin size={18} color="#2dd4bf" />
              <span style={{ fontSize: '15px', fontWeight: 600, color: '#161d1b' }}>Rabat</span>
            </div>
            <button style={{ backgroundColor: '#2dd4bf', color: 'white', border: 'none', padding: '14px 32px', borderRadius: '100px', fontWeight: 700, fontSize: '14px', cursor: 'pointer', transition: 'all 0.2s', whiteSpace: 'nowrap' as const }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,107,95,0.3)' }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none' }}
            >Search Now</button>
          </div>
        </div>
      </section>

      {/* ── FILTER CARD ── */}
      <div style={{ maxWidth: '1440px', margin: '-40px auto 0', padding: '0 40px', position: 'relative', zIndex: 30 }}>
        <div style={{ backgroundColor: 'rgba(244,251,248,0.85)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.5)', borderRadius: '32px', padding: '24px 28px', boxShadow: '0 10px 32px rgba(0,107,95,0.07)' }}>

          {/* Unified filter bar */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', backgroundColor: '#eef5f2', borderRadius: '100px', border: '1px solid rgba(186,202,197,0.3)', marginBottom: '20px', overflow: 'hidden' }}>
            {[
              { label: 'Neighborhood', val: 'Agdal, Rabat', icon: '📍' },
              { label: 'Price Range', val: '0 - 5000 MAD', icon: '💰' },
              { label: 'Condition', val: 'Brand New', icon: '✨' },
              { label: 'Age Group', val: '2-5 Years', icon: '🧒' },
            ].map((f, i, arr) => (
              <div key={f.label} style={{ padding: '12px 20px', borderRight: i < arr.length - 1 ? '1px solid rgba(186,202,197,0.3)' : 'none', cursor: 'pointer' }}>
                <div style={{ fontSize: '9px', fontWeight: 700, textTransform: 'uppercase' as const, letterSpacing: '0.12em', color: 'rgba(60,74,70,0.6)', marginBottom: '4px' }}>{f.label}</div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '14px', fontWeight: 600, color: '#161d1b' }}>{f.val}</span>
                  <span style={{ fontSize: '16px' }}>{f.icon}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Category pills */}
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' as const }}>
            {categoryPills.map(pill => (
              <button
                key={pill}
                onClick={() => setActivePill(pill)}
                style={{
                  padding: '10px 20px', borderRadius: '100px', fontSize: '13px', fontWeight: 700, border: 'none', cursor: 'pointer', transition: 'all 0.15s',
                  backgroundColor: activePill === pill ? '#2dd4bf' : '#e8efec',
                  color: activePill === pill ? 'white' : '#3c4a46',
                  display: 'flex', alignItems: 'center', gap: '4px',
                }}
              >
                {pill}
                {pill === 'View More +' && <ChevronDown size={14} />}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── RESULT BAR ── */}
      <div style={{ maxWidth: '1440px', margin: '20px auto 0', padding: '0 40px' }}>
        <div style={{ backgroundColor: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(16px)', border: '1px solid rgba(186,202,197,0.2)', borderRadius: '100px', padding: '8px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>

          {/* Diamond toggle */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', paddingLeft: '8px', cursor: 'pointer' }} onClick={() => setDiamondFirst(!diamondFirst)}>
            <div style={{ width: '40px', height: '20px', borderRadius: '100px', backgroundColor: diamondFirst ? '#2dd4bf' : '#dde4e1', position: 'relative', transition: 'background 0.25s' }}>
              <div style={{ position: 'absolute', top: '2px', left: diamondFirst ? '22px' : '2px', width: '16px', height: '16px', borderRadius: '50%', backgroundColor: 'white', boxShadow: '0 1px 4px rgba(0,0,0,0.2)', transition: 'left 0.25s' }} />
            </div>
            <span style={{ fontSize: '13px', fontWeight: 600, color: '#3c4a46' }}>Show Diamond Verified First</span>
          </div>

          {/* Seller pills */}
          <div style={{ display: 'flex', gap: '2px', backgroundColor: '#eef5f2', padding: '4px', borderRadius: '100px' }}>
            {['All Sellers', 'SouKni Members', 'SouKni Pro'].map(tab => (
              <button key={tab} onClick={() => setActiveSeller(tab)}
                style={{ padding: '8px 20px', borderRadius: '100px', fontSize: '13px', fontWeight: 700, border: 'none', cursor: 'pointer', transition: 'all 0.15s', backgroundColor: activeSeller === tab ? '#2dd4bf' : 'transparent', color: activeSeller === tab ? 'white' : '#6b7a76' }}
              >{tab}</button>
            ))}
          </div>

          {/* Sort + Save */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <button style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 16px', borderRadius: '100px', border: 'none', backgroundColor: 'transparent', cursor: 'pointer', fontSize: '13px', fontWeight: 600, color: '#6b7a76', transition: 'background 0.15s' }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = '#e8efec'}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
            >⇅ Sort: Default <ChevronDown size={14} /></button>
            <div style={{ width: '1px', height: '20px', backgroundColor: 'rgba(186,202,197,0.3)' }} />
            <button style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 16px', borderRadius: '100px', border: 'none', backgroundColor: 'transparent', cursor: 'pointer', fontSize: '13px', fontWeight: 600, color: '#6b7a76', transition: 'background 0.15s' }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = '#e8efec'}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
            >🔖 Save Search</button>
          </div>
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <main style={{ maxWidth: '1440px', margin: '0 auto', padding: '40px 40px 80px' }}>

        {/* Section title */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px', paddingBottom: '16px', borderBottom: '1px solid rgba(186,202,197,0.2)' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#161d1b' }}>New and Used Toys for sale in Rabat</h2>
        </div>

        {/* Row 1 */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '16px', marginBottom: '16px' }}>
          {row1.map(item => <ToyCard key={item.id} item={item} />)}
        </div>

        {/* Row 2 */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '16px', marginBottom: '40px' }}>
          {row2.map(item => <ToyCard key={item.id} item={item} />)}
        </div>

        {/* ── AUTO PRO BANNER ── */}
        <div style={{ position: 'relative', height: '240px', borderRadius: '32px', overflow: 'hidden', marginBottom: '40px', cursor: 'pointer' }}>
          <img
            src="https://images.pexels.com/photos/1619317/pexels-photo-1619317.jpeg?auto=compress&w=1600"
            alt="SouKni Auto Pro"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.7s' }}
            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.04)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(28,28,23,0.92), rgba(28,28,23,0.4), transparent)', display: 'flex', alignItems: 'center', padding: '40px' }}>
            <div style={{ maxWidth: '420px', color: 'white' }}>
              <span style={{ backgroundColor: '#2dd4bf', color: 'white', fontSize: '9px', fontWeight: 800, padding: '4px 10px', borderRadius: '100px', textTransform: 'uppercase' as const, letterSpacing: '0.12em', display: 'inline-block', marginBottom: '12px' }}>Pro Feature</span>
              <h2 style={{ fontSize: '28px', fontWeight: 800, marginBottom: '8px', lineHeight: 1.2 }}>SouKni Auto Pro</h2>
              <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '20px', fontSize: '14px', lineHeight: 1.6 }}>Manage your toy inventory like a showroom expert with advanced analytics and bulk uploads.</p>
              <button style={{ backgroundColor: 'white', color: '#161d1b', border: 'none', padding: '12px 28px', borderRadius: '100px', fontWeight: 700, fontSize: '14px', cursor: 'pointer', transition: 'all 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#2dd4bf'; e.currentTarget.style.color = 'white' }}
                onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'white'; e.currentTarget.style.color = '#161d1b' }}
              >Discover Pro</button>
            </div>
          </div>
        </div>

        {/* Row 3 */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '16px', marginBottom: '40px' }}>
          {row3.map(item => <ToyCard key={item.id} item={item} />)}
        </div>

        {/* ── DIAMOND BANNER ── */}
        <div style={{ position: 'relative', borderRadius: '32px', overflow: 'hidden', marginBottom: '40px', background: 'linear-gradient(135deg, #2dd4bf 0%, #2dd4bf 60%, #e8efec 100%)', padding: '56px 48px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ maxWidth: '520px', color: 'white', position: 'relative', zIndex: 1 }}>
            <h2 style={{ fontSize: '36px', fontWeight: 800, marginBottom: '16px', lineHeight: 1.2, letterSpacing: '-0.02em' }}>Become a SouKni Diamond Member</h2>
            <p style={{ fontSize: '16px', opacity: 0.92, marginBottom: '28px', lineHeight: 1.7 }}>Boost your sales with priority placement, verified badges, and 10× more visibility for your premium listings.</p>
            <button style={{ backgroundColor: 'white', color: '#2dd4bf', border: 'none', padding: '14px 36px', borderRadius: '100px', fontWeight: 800, fontSize: '15px', cursor: 'pointer', transition: 'all 0.2s', boxShadow: '0 8px 24px rgba(0,0,0,0.15)' }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
            >Upgrade Now</button>
          </div>
          <div style={{ position: 'absolute', right: '60px', top: '50%', transform: 'translateY(-50%)', fontSize: '160px', opacity: 0.15, lineHeight: 1, userSelect: 'none' as const }}>💎</div>
        </div>

        {/* Row 4 */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '16px', marginBottom: '48px' }}>
          {row4.map(item => <ToyCard key={item.id} item={item} />)}
        </div>

        {/* ── JOIN SOUKNI FAMILY ── */}
        <div style={{ backgroundColor: '#e8efec', borderRadius: '32px', padding: '48px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '40px', marginBottom: '0' }}>
          <div style={{ flex: 1 }}>
            <h2 style={{ fontSize: '28px', fontWeight: 800, color: '#161d1b', marginBottom: '12px', letterSpacing: '-0.01em' }}>Join the SouKni Family</h2>
            <p style={{ fontSize: '16px', color: '#6b7a76', lineHeight: 1.6 }}>Experience the marketplace on the go. Download our app for instant alerts, secure chats, and easy listing management.</p>
          </div>
          <div style={{ display: 'flex', gap: '14px', flexShrink: 0 }}>
            {[
              { icon: '🍎', store: 'App Store', sub: 'Download on the' },
              { icon: '▶', store: 'Google Play', sub: 'Get it on' },
            ].map(btn => (
              <button key={btn.store} style={{ backgroundColor: '#1c1c17', color: 'white', border: 'none', padding: '14px 24px', borderRadius: '18px', display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', transition: 'opacity 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
                onMouseLeave={e => e.currentTarget.style.opacity = '1'}
              >
                <span style={{ fontSize: '26px' }}>{btn.icon}</span>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: '9px', opacity: 0.6, textTransform: 'uppercase' as const, letterSpacing: '0.1em', lineHeight: 1 }}>{btn.sub}</div>
                  <div style={{ fontSize: '17px', fontWeight: 700, lineHeight: 1.3 }}>{btn.store}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </main>

      {/* ── FOOTER ── */}
      <footer style={{ backgroundColor: '#7a7a7a', color: 'white', paddingTop: '64px', paddingBottom: '32px', fontFamily: 'Inter,sans-serif' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 40px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1fr', gap: '48px', marginBottom: '48px', paddingBottom: '48px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>

            {/* Brand */}
            <div>
              <div style={{ fontSize: '28px', fontWeight: 900, color: '#2dd4bf', letterSpacing: '-0.03em', marginBottom: '16px' }}>SouKni</div>
              <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.7, maxWidth: '260px', marginBottom: '24px' }}>The premier marketplace for premium and pre-owned luxury items in Morocco. Connecting discerning buyers and sellers since 2024.</p>
              <div style={{ display: 'flex', gap: '10px' }}>
                {['📘', '📸'].map((icon, i) => (
                  <a key={i} href="#" style={{ width: '38px', height: '38px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', textDecoration: 'none', transition: 'background 0.15s' }}
                    onMouseEnter={e => e.currentTarget.style.backgroundColor = '#2dd4bf'}
                    onMouseLeave={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.08)'}
                  >{icon}</a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h5 style={{ fontWeight: 700, color: 'white', marginBottom: '20px', fontSize: '15px' }}>Quick Links</h5>
              {['How it works', 'Pricing Plans', 'Trust & Safety', 'Help Center'].map(link => (
                <a key={link} href="#" style={{ display: 'block', fontSize: '13px', color: 'rgba(255,255,255,0.65)', textDecoration: 'none', marginBottom: '12px', transition: 'color 0.15s' }}
                  onMouseEnter={e => e.currentTarget.style.color = 'white'}
                  onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.65)'}
                >{link}</a>
              ))}
            </div>

            {/* Categories */}
            <div>
              <h5 style={{ fontWeight: 700, color: 'white', marginBottom: '20px', fontSize: '15px' }}>Categories</h5>
              {['Educational Toys', 'Vehicles & Cars', 'Electronics', 'Collectibles'].map(link => (
                <a key={link} href="#" style={{ display: 'block', fontSize: '13px', color: 'rgba(255,255,255,0.65)', textDecoration: 'none', marginBottom: '12px', transition: 'color 0.15s' }}
                  onMouseEnter={e => e.currentTarget.style.color = 'white'}
                  onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.65)'}
                >{link}</a>
              ))}
            </div>

            {/* Newsletter */}
            <div>
              <h5 style={{ fontWeight: 700, color: 'white', marginBottom: '20px', fontSize: '15px' }}>Newsletter</h5>
              <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.65)', marginBottom: '16px', lineHeight: 1.6 }}>Stay updated with the latest luxury arrivals.</p>
              <div style={{ display: 'flex', gap: '8px' }}>
                <input type="email" placeholder="Your email" style={{ flex: 1, backgroundColor: 'rgba(255,255,255,0.08)', border: 'none', borderRadius: '100px', padding: '10px 16px', fontSize: '13px', color: 'white', outline: 'none', fontFamily: 'Inter,sans-serif' }} />
                <button style={{ backgroundColor: '#2dd4bf', border: 'none', width: '40px', height: '40px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>→</button>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' as const, gap: '12px' }}>
            <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)' }}>© 2026 SouKni Morocco. All rights reserved.</p>
            <div style={{ display: 'flex', gap: '24px', fontSize: '11px', color: 'rgba(255,255,255,0.4)' }}>
              {['Privacy Policy', 'Terms of Service', 'Cookie Settings'].map(link => (
                <a key={link} href="#" style={{ color: 'rgba(255,255,255,0.4)', textDecoration: 'none', transition: 'color 0.15s' }}
                  onMouseEnter={e => e.currentTarget.style.color = 'white'}
                  onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.4)'}
                >{link}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* ── MOBILE BOTTOM NAV ── */}
      <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 50, backgroundColor: 'rgba(244,251,248,0.85)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.4)', borderTop: '1px solid rgba(186,202,197,0.2)', padding: '12px 24px 28px', display: 'flex', justifyContent: 'space-around', alignItems: 'center', borderRadius: '28px 28px 0 0' }}>
        {[
          { icon: '🧭', label: 'Explore', active: true },
          { icon: '❤️', label: 'Saved', active: false },
          { icon: null, label: 'Sell', active: false, isCenter: true },
          { icon: '💬', label: 'Chats', active: false },
          { icon: '👤', label: 'Account', active: false },
        ].map(item => (
          <div key={item.label} style={{ display: 'flex', flexDirection: 'column' as const, alignItems: 'center', gap: '2px', cursor: 'pointer', marginTop: item.isCenter ? '-28px' : '0' }}>
            {item.isCenter ? (
              <div style={{ width: '52px', height: '52px', borderRadius: '50%', backgroundColor: '#2dd4bf', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', color: 'white', boxShadow: '0 4px 16px rgba(0,107,95,0.3)', border: '3px solid #f4fbf8' }}>+</div>
            ) : (
              <span style={{ fontSize: '20px' }}>{item.icon}</span>
            )}
            <span style={{ fontSize: '9px', fontWeight: 700, color: item.active ? '#2dd4bf' : '#6b7a76', textTransform: 'uppercase' as const, letterSpacing: '0.05em' }}>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
