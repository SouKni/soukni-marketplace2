'use client'

import { useState, useEffect } from 'react'
import React from 'react'
import Link from 'next/link'
import { useMarket } from '@/context/MarketContext'
import { Heart, ChevronDown, Search, MapPin } from 'lucide-react'

/* ─── DATA ─────────────────────────────────────────────── */
const macroCategories = [
  { icon: '🫧', label: 'Laundry', count: '1.2k+', color: '#2dd4bf' },
  { icon: '🧊', label: 'Refrigeration', count: '840', color: '#8d4f00' },
  { icon: '☕', label: 'Kitchen', count: '3.1k', color: '#605e58' },
  { icon: '🧹', label: 'Cleaning', count: '950', color: '#2dd4bf' },
  { icon: '⊞', label: 'View More', count: '', color: '#3c4a46' },
]

const washingMachines = [
  { id: 'w1', brand: 'Samsung', title: 'EcoBubble 9kg Inverter Platinum', price: 6200, location: 'Souissi, Rabat', badge: 'verified', badge2: 'diamond', image: 'https://images.pexels.com/photos/6865187/pexels-photo-6865187.jpeg?auto=compress&w=600' },
  { id: 'w2', brand: 'LG', title: 'AI DD 10kg Steam Refresh', price: 5800, location: 'Hay Riad, Rabat', badge: 'certified', image: 'https://images.pexels.com/photos/4700421/pexels-photo-4700421.jpeg?auto=compress&w=600' },
  { id: 'w3', brand: 'Bosch', title: 'Series 8 HomeConnect WiFi', price: 8500, location: 'Agdal, Rabat', badge: 'verified', image: 'https://images.pexels.com/photos/3321574/pexels-photo-3321574.jpeg?auto=compress&w=600' },
  { id: 'w4', brand: 'Samsung', title: 'Bespoke AI Series Black Onyx', price: 9200, location: 'Hassan, Rabat', badge: 'diamond', image: 'https://images.pexels.com/photos/4700422/pexels-photo-4700422.jpeg?auto=compress&w=600' },
]

const kitchenAppliances = [
  { id: 'k1', brand: 'Breville', title: 'Barista Pro Espresso Machine', price: 7400, tags: ['STAINLESS STEEL', '15 BAR'], image: 'https://images.pexels.com/photos/324028/pexels-photo-324028.jpeg?auto=compress&w=600' },
  { id: 'k2', brand: 'KitchenAid', title: 'Artisan 4.8L Stand Mixer', price: 4900, tags: ['HEAVY DUTY', 'VINTAGE RED'], image: 'https://images.pexels.com/photos/4518651/pexels-photo-4518651.jpeg?auto=compress&w=600' },
  { id: 'k3', brand: 'Ninja', title: 'Foodi Dual Zone Air Fryer', price: 2200, tags: ['DUAL BASKET', 'DIGITAL'], image: 'https://images.pexels.com/photos/4397899/pexels-photo-4397899.jpeg?auto=compress&w=600' },
  { id: 'k4', brand: 'Smeg', title: 'Retro Series Breakfast Set', price: 3100, tags: ['CREAM WHITE', 'RETRO DESIGN'], image: 'https://images.pexels.com/photos/6316068/pexels-photo-6316068.jpeg?auto=compress&w=600' },
]

const entertainment = [
  { id: 'e1', brand: 'Samsung', title: 'Neo QLED 85" 8K Flagship', price: 45900, location: 'Hay Riad, Rabat', badge: 'verified', badge2: 'diamond', image: 'https://images.pexels.com/photos/6782570/pexels-photo-6782570.jpeg?auto=compress&w=600' },
  { id: 'e2', brand: 'B&O', title: 'Beosound Theatre Soundbar', price: 38500, location: 'Souissi, Rabat', badge: 'certified', image: 'https://images.pexels.com/photos/1488463/pexels-photo-1488463.jpeg?auto=compress&w=600' },
  { id: 'e3', brand: 'LG', title: 'CineBeam 4K Laser Projector', price: 24900, location: 'Agdal, Rabat', badge: 'verified', image: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&w=600' },
  { id: 'e4', brand: 'Apple', title: 'Studio Display 27-inch 5K', price: 19500, location: 'Hassan, Rabat', badge: 'diamond', image: 'https://images.pexels.com/photos/1029757/pexels-photo-1029757.jpeg?auto=compress&w=600' },
]

const refrigeration = [
  { id: 'f1', brand: 'Samsung', title: 'Bespoke Family Hub Smart Refrigerator', price: 24500, location: 'Hay Riad, Rabat', badge: 'verified', badge2: 'diamond', image: 'https://images.pexels.com/photos/3689334/pexels-photo-3689334.jpeg?auto=compress&w=600' },
  { id: 'f2', brand: 'LG', title: 'InstaView Door-in-Door Side-by-Side', price: 22900, location: 'Souissi, Rabat', badge: 'certified', image: 'https://images.pexels.com/photos/3935346/pexels-photo-3935346.jpeg?auto=compress&w=600' },
  { id: 'f3', brand: 'Vinotemp', title: '50-Bottle Dual-Zone Wine Refrigerator', price: 12500, location: 'Agdal, Rabat', badge: 'verified', image: 'https://images.pexels.com/photos/3407777/pexels-photo-3407777.jpeg?auto=compress&w=600' },
  { id: 'f4', brand: 'Bosch', title: 'Series 6 NoFrost Bottom Freezer', price: 9800, location: 'Hassan, Rabat', badge: 'diamond', image: 'https://images.pexels.com/photos/3689334/pexels-photo-3689334.jpeg?auto=compress&w=600' },
]

/* ─── BADGE ─────────────────────────────────────────────── */
function Badge({ type }: { type: string }) {
  if (type === 'diamond') return (
    <span style={{ background: 'linear-gradient(135deg,#ffb875,#8d4f00)', color: 'white', fontSize: '9px', fontWeight: 800, padding: '3px 9px', borderRadius: '100px', letterSpacing: '0.08em', textTransform: 'uppercase' as const, display: 'inline-flex', alignItems: 'center', gap: '3px', fontFamily: 'Inter,sans-serif' }}>
      💎 Diamond
    </span>
  )
  if (type === 'verified') return (
    <span style={{ backgroundColor: '#2dd4bf', color: 'white', fontSize: '9px', fontWeight: 800, padding: '3px 9px', borderRadius: '100px', letterSpacing: '0.08em', textTransform: 'uppercase' as const, fontFamily: 'Inter,sans-serif' }}>
      Verified
    </span>
  )
  return (
    <span style={{ backgroundColor: 'rgba(255,255,255,0.82)', backdropFilter: 'blur(8px)', color: '#0f172a', fontSize: '9px', fontWeight: 800, padding: '3px 9px', borderRadius: '100px', border: '1px solid rgba(255,255,255,0.4)', letterSpacing: '0.08em', textTransform: 'uppercase' as const, fontFamily: 'Inter,sans-serif' }}>
      Certified
    </span>
  )
}

/* ─── STANDARD LISTING CARD (for washing machines, entertainment, refrigeration) ── */
function ListingCard({ item }: { item: any }) {
  const [saved, setSaved] = useState(false)
  const [hovered, setHovered] = useState(false)
  const { formatPrice } = useMarket()

  return (
    <article
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        backgroundColor: 'white', borderRadius: '40px', overflow: 'hidden',
        border: '1px solid rgba(186,202,197,0.2)',
        boxShadow: hovered ? '0 20px 40px rgba(0,0,0,0.12)' : '0 2px 8px rgba(0,0,0,0.04)',
        transition: 'all 0.3s', cursor: 'pointer',
      }}
    >
      <div style={{ position: 'relative', aspectRatio: '1/1', overflow: 'hidden' }}>
        <img
          src={item.image} alt={item.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s', transform: hovered ? 'scale(1.08)' : 'scale(1)' }}
        />
        <div style={{ position: 'absolute', top: '14px', left: '14px', display: 'flex', gap: '5px' }}>
          {item.badge && <Badge type={item.badge} />}
          {item.badge2 && <Badge type={item.badge2} />}
        </div>
        <button
          onClick={e => { e.stopPropagation(); setSaved(!saved) }}
          style={{ position: 'absolute', top: '12px', right: '12px', width: '34px', height: '34px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.82)', backdropFilter: 'blur(8px)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <Heart size={15} fill={saved ? '#ef4444' : 'none'} color={saved ? '#ef4444' : '#0f172a'} />
        </button>
      </div>
      <div style={{ padding: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
          <span style={{ fontSize: '10px', fontWeight: 800, color: '#6b7a76', textTransform: 'uppercase' as const, letterSpacing: '0.12em', fontFamily: 'Inter,sans-serif' }}>{item.brand}</span>
          <span style={{ fontSize: '16px', fontWeight: 800, color: '#2dd4bf', fontFamily: 'Inter,sans-serif' }}>{formatPrice(item.price)}</span>
        </div>
        <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a', marginBottom: '6px', lineHeight: 1.3, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' as const, fontFamily: 'Inter,sans-serif' }}>{item.title}</h3>
        {item.location && (
          <p style={{ fontSize: '12px', color: '#6b7a76', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '3px', fontFamily: 'Inter,sans-serif' }}>
            <MapPin size={12} /> {item.location}
          </p>
        )}
        <div style={{ display: 'flex', gap: '8px' }}>
          <button style={{ flex: 1, padding: '10px', borderRadius: '100px', border: '1px solid #2dd4bf', color: '#2dd4bf', backgroundColor: 'transparent', fontWeight: 700, fontSize: '13px', cursor: 'pointer', fontFamily: 'Inter,sans-serif', transition: 'background 0.15s' }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(0,107,95,0.06)'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
          >Message</button>
          <button style={{ flex: 1, padding: '10px', borderRadius: '100px', backgroundColor: '#25D366', color: 'white', border: 'none', fontWeight: 700, fontSize: '13px', cursor: 'pointer', fontFamily: 'Inter,sans-serif', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px', transition: 'filter 0.15s' }}
            onMouseEnter={e => e.currentTarget.style.filter = 'brightness(1.08)'}
            onMouseLeave={e => e.currentTarget.style.filter = 'brightness(1)'}
          >💬 WhatsApp</button>
        </div>
      </div>
    </article>
  )
}

/* ─── KITCHEN CARD (portrait ratio, Request Details CTA) ── */
function KitchenCard({ item }: { item: any }) {
  const [hovered, setHovered] = useState(false)
  const { formatPrice } = useMarket()

  return (
    <article
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        backgroundColor: 'white', borderRadius: '40px', overflow: 'hidden',
        border: '1px solid rgba(186,202,197,0.2)',
        boxShadow: hovered ? '0 20px 40px rgba(0,0,0,0.12)' : '0 2px 8px rgba(0,0,0,0.04)',
        transition: 'all 0.3s', cursor: 'pointer',
      }}
    >
      <div style={{ position: 'relative', aspectRatio: '4/5', overflow: 'hidden' }}>
        <img
          src={item.image} alt={item.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s', transform: hovered ? 'scale(1.08)' : 'scale(1)' }}
        />
      </div>
      <div style={{ padding: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
          <span style={{ fontSize: '10px', fontWeight: 800, color: '#6b7a76', textTransform: 'uppercase' as const, letterSpacing: '0.12em', fontFamily: 'Inter,sans-serif' }}>{item.brand}</span>
          <span style={{ fontSize: '16px', fontWeight: 800, color: '#2dd4bf', fontFamily: 'Inter,sans-serif' }}>{formatPrice(item.price)}</span>
        </div>
        <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a', marginBottom: '16px', lineHeight: 1.3, fontFamily: 'Inter,sans-serif' }}>{item.title}</h3>
        {item.tags && (
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' as const, marginBottom: '20px' }}>
            {item.tags.map((tag: string) => (
              <span key={tag} style={{ backgroundColor: '#e8efec', padding: '4px 10px', borderRadius: '100px', fontSize: '9px', fontWeight: 700, color: '#3c4a46', fontFamily: 'Inter,sans-serif' }}>{tag}</span>
            ))}
          </div>
        )}
        <button style={{ width: '100%', backgroundColor: '#2dd4bf', color: 'white', border: 'none', padding: '12px', borderRadius: '100px', fontWeight: 700, fontSize: '14px', cursor: 'pointer', fontFamily: 'Inter,sans-serif', transition: 'filter 0.15s' }}
          onMouseEnter={e => e.currentTarget.style.filter = 'brightness(1.1)'}
          onMouseLeave={e => e.currentTarget.style.filter = 'brightness(1)'}
        >Request Details</button>
      </div>
    </article>
  )
}

/* ─── SECTION HEADER ─────────────────────────────────────── */
function SectionHeader({ title, href, locale }: { title: string; href: string; locale: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px' }}>
      <h3 style={{ fontSize: '22px', fontWeight: 700, color: '#161d1b', fontFamily: 'Inter,sans-serif', letterSpacing: '-0.01em' }}>{title}</h3>
      <Link href={`/${locale}/${href}`} style={{ color: '#2dd4bf', fontWeight: 700, fontSize: '13px', textDecoration: 'none', transition: 'opacity 0.15s' }}
        onMouseEnter={e => e.currentTarget.style.opacity = '0.7'}
        onMouseLeave={e => e.currentTarget.style.opacity = '1'}
      >View All</Link>
    </div>
  )
}

/* ─── DIAMOND TOGGLE ─────────────────────────────────────── */
function DiamondToggle({ enabled, onToggle }: { enabled: boolean; onToggle: () => void }) {
  return (
    <div
      style={{ display: 'flex', alignItems: 'center', gap: '12px', backgroundColor: '#e8efec', padding: '12px 20px', borderRadius: '100px', cursor: 'pointer', userSelect: 'none' as const }}
      onClick={onToggle}
    >
      <span style={{ fontSize: '13px', fontWeight: 600, color: '#3c4a46', fontFamily: 'Inter,sans-serif' }}>Show Diamond Verified First</span>
      <div style={{ width: '44px', height: '24px', borderRadius: '100px', backgroundColor: enabled ? '#2dd4bf' : '#bacac5', position: 'relative', transition: 'background 0.25s', flexShrink: 0 }}>
        <div style={{ position: 'absolute', top: '2px', left: enabled ? '22px' : '2px', width: '20px', height: '20px', borderRadius: '50%', backgroundColor: 'white', boxShadow: '0 1px 4px rgba(0,0,0,0.2)', transition: 'left 0.25s' }} />
      </div>
    </div>
  )
}

/* ─── PAGE ───────────────────────────────────────────────── */
export default function HomeAppliancesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = React.use(params)
  const [scrolled, setScrolled] = useState(false)
  const [activeCategory, setActiveCategory] = useState('Laundry')
  const [activeSeller, setActiveSeller] = useState('All Sellers')
  const [diamondFirst, setDiamondFirst] = useState(true)
  const [keyword, setKeyword] = useState('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div style={{ fontFamily: 'Inter,system-ui,sans-serif', backgroundColor: '#f4fbf8', minHeight: '100vh' }}>

      {/* ── HERO ── */}
      <section style={{ position: 'relative', height: '400px', width: '100%', overflow: 'hidden', marginBottom: '48px' }}>
        <img
          src="https://images.pexels.com/photos/1599791/pexels-photo-1599791.jpeg?auto=compress&w=1600"
          alt="Home Appliances Hero"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.72)' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.5))' }} />
        <div style={{ position: 'relative', zIndex: 10, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 24px' }}>
          <h2 style={{ fontSize: '48px', fontWeight: 800, color: 'white', marginBottom: '28px', textAlign: 'center', letterSpacing: '-0.02em', lineHeight: 1.1, textShadow: '0 4px 20px rgba(0,0,0,0.3)', fontFamily: 'Inter,sans-serif' }}>
            Elite Home Appliances.<br />
            <span style={{ color: '#62fae3' }}>Effortless Living in Rabat.</span>
          </h2>
          {/* Glassmorphic search */}
          <div style={{ width: '100%', maxWidth: '680px', backgroundColor: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '100px', padding: '6px' }}>
            <div style={{ display: 'flex', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '100px', padding: '10px 20px' }}>
              <Search size={20} color="rgba(255,255,255,0.7)" style={{ flexShrink: 0 }} />
              <input
                type="text"
                value={keyword}
                onChange={e => setKeyword(e.target.value)}
                placeholder="Search for washing machines, fridges, or espresso makers..."
                style={{ flex: 1, backgroundColor: 'transparent', border: 'none', outline: 'none', fontSize: '15px', color: 'white', fontFamily: 'Inter,sans-serif', padding: '0 16px' }}
              />
              <button style={{ backgroundColor: '#2dd4bf', color: 'white', border: 'none', padding: '10px 28px', borderRadius: '100px', fontWeight: 700, fontSize: '13px', cursor: 'pointer', flexShrink: 0, transition: 'filter 0.15s' }}
                onMouseEnter={e => e.currentTarget.style.filter = 'brightness(1.1)'}
                onMouseLeave={e => e.currentTarget.style.filter = 'brightness(1)'}
              >Search</button>
            </div>
          </div>
        </div>
      </section>

      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 40px' }}>

        {/* ── MACRO CATEGORY + DIAMOND TOGGLE ── */}
        <section style={{ marginBottom: '40px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap' as const }}>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' as const }}>
              {macroCategories.map(cat => (
                <div
                  key={cat.label}
                  onClick={() => cat.label !== 'View More' && setActiveCategory(cat.label)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '14px',
                    backgroundColor: activeCategory === cat.label ? 'white' : '#eef5f2',
                    padding: '14px 24px 14px 16px', borderRadius: '100px',
                    border: activeCategory === cat.label ? '1px solid rgba(0,107,95,0.3)' : '1px solid rgba(186,202,197,0.2)',
                    boxShadow: activeCategory === cat.label ? '0 8px 24px rgba(0,107,95,0.1)' : 'none',
                    cursor: 'pointer', transition: 'all 0.2s',
                  }}
                  onMouseEnter={e => { if (activeCategory !== cat.label) (e.currentTarget as HTMLDivElement).style.backgroundColor = 'white' }}
                  onMouseLeave={e => { if (activeCategory !== cat.label) (e.currentTarget as HTMLDivElement).style.backgroundColor = '#eef5f2' }}
                >
                  <div style={{ width: '44px', height: '44px', borderRadius: '50%', backgroundColor: activeCategory === cat.label ? 'rgba(0,107,95,0.12)' : 'rgba(186,202,197,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', transition: 'transform 0.2s', flexShrink: 0 }}>
                    {cat.icon}
                  </div>
                  <div>
                    <p style={{ fontSize: '11px', fontWeight: 600, color: '#6b7a76', fontFamily: 'Inter,sans-serif', marginBottom: '2px' }}>{cat.label}</p>
                    {cat.count && <p style={{ fontSize: '20px', fontWeight: 800, color: cat.color, fontFamily: 'Inter,sans-serif', lineHeight: 1 }}>{cat.count}</p>}
                  </div>
                </div>
              ))}
            </div>
            <DiamondToggle enabled={diamondFirst} onToggle={() => setDiamondFirst(!diamondFirst)} />
          </div>
        </section>

        {/* ── UNIFIED FILTER BAR ── */}
        <section style={{ marginBottom: '40px' }}>
          <div style={{ backgroundColor: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.4)', borderRadius: '100px', boxShadow: '0 8px 32px rgba(0,0,0,0.06)', padding: '6px', display: 'flex', alignItems: 'center' }}>
            {[
              { label: 'City', value: 'Rabat', icon: <ChevronDown size={18} color="#2dd4bf" /> },
              { label: 'Keyword', value: 'Search anything in electronics...', isInput: true, icon: <Search size={18} color="#6b7a76" /> },
              { label: 'Neighborhood', value: 'Enter location', icon: <MapPin size={18} color="#6b7a76" /> },
              { label: 'Price (MAD)', value: 'Select', icon: <ChevronDown size={18} color="#6b7a76" /> },
              { label: 'Filters', value: '1 filter selected', icon: null, isActive: true },
            ].map((field, i, arr) => (
              <React.Fragment key={field.label}>
                <div
                  style={{ flex: field.isInput ? 2 : 1, padding: '10px 20px', display: 'flex', flexDirection: 'column', gap: '2px', cursor: 'pointer', borderRadius: '100px', transition: 'background 0.15s' }}
                  onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.backgroundColor = 'rgba(0,107,95,0.04)'}
                  onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.backgroundColor = 'transparent'}
                >
                  <span style={{ fontSize: '10px', fontWeight: 700, color: '#6b7a76', textTransform: 'uppercase' as const, letterSpacing: '0.1em', fontFamily: 'Inter,sans-serif' }}>{field.label}</span>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    {field.isInput ? (
                      <input
                        type="text"
                        placeholder={field.value}
                        style={{ flex: 1, backgroundColor: 'transparent', border: 'none', outline: 'none', fontSize: '15px', fontFamily: 'Inter,sans-serif', color: '#161d1b', padding: 0 }}
                      />
                    ) : (
                      <span style={{ fontSize: '15px', fontWeight: field.isActive ? 700 : 400, color: field.isActive ? '#2dd4bf' : '#161d1b', fontFamily: 'Inter,sans-serif' }}>{field.value}</span>
                    )}
                    {field.icon && <span style={{ flexShrink: 0 }}>{field.icon}</span>}
                    {field.isActive && <span style={{ fontSize: '18px', color: '#2dd4bf' }}>🎚</span>}
                  </div>
                </div>
                {i < arr.length - 1 && <div style={{ width: '1px', height: '40px', backgroundColor: 'rgba(186,202,197,0.4)', flexShrink: 0 }} />}
              </React.Fragment>
            ))}
          </div>
        </section>

        {/* ── BREADCRUMB + TITLE + SELLER TABS ── */}
        <section style={{ marginBottom: '32px' }}>
          {/* Breadcrumb */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#6b7a76', marginBottom: '16px', fontFamily: 'Inter,sans-serif' }}>
            <Link href={`/${locale}`} style={{ color: '#6b7a76', textDecoration: 'none', transition: 'color 0.15s' }} onMouseEnter={e => e.currentTarget.style.color = '#2dd4bf'} onMouseLeave={e => e.currentTarget.style.color = '#6b7a76'}>Home</Link>
            <span style={{ color: '#bacac5' }}>›</span>
            <Link href={`/${locale}/vault`} style={{ color: '#6b7a76', textDecoration: 'none', transition: 'color 0.15s' }} onMouseEnter={e => e.currentTarget.style.color = '#2dd4bf'} onMouseLeave={e => e.currentTarget.style.color = '#6b7a76'}>The Vault</Link>
            <span style={{ color: '#bacac5' }}>›</span>
            <span style={{ color: '#3c4a46', fontWeight: 600 }}>Home Appliances</span>
          </nav>

          {/* Title row */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', flexWrap: 'wrap' as const, gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px' }}>
              <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#161d1b', fontFamily: 'Inter,sans-serif' }}>New and Used Home Appliances for sale in Rabat</h2>
              <span style={{ fontSize: '16px', color: '#6b7a76' }}>• 8,597 Ads</span>
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              {['⇅ Sort: Default', '🔖 Save Search'].map(btn => (
                <button key={btn} style={{ display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: '#e8efec', padding: '8px 16px', borderRadius: '10px', fontSize: '13px', fontWeight: 700, color: '#161d1b', border: 'none', cursor: 'pointer', fontFamily: 'Inter,sans-serif', transition: 'background 0.15s' }}
                  onMouseEnter={e => e.currentTarget.style.backgroundColor = '#dde4e1'}
                  onMouseLeave={e => e.currentTarget.style.backgroundColor = '#e8efec'}
                >{btn}</button>
              ))}
            </div>
          </div>

          {/* Seller tabs */}
          <div style={{ display: 'flex', gap: '10px' }}>
            {['All Sellers', 'SouKni Members', 'SouKni Pro'].map(tab => (
              <button key={tab} onClick={() => setActiveSeller(tab)}
                style={{ padding: '8px 20px', borderRadius: '10px', fontSize: '13px', fontWeight: 700, border: activeSeller === tab ? 'none' : '1px solid rgba(186,202,197,0.6)', backgroundColor: activeSeller === tab ? '#2dd4bf' : 'transparent', color: activeSeller === tab ? 'white' : '#3c4a46', cursor: 'pointer', fontFamily: 'Inter,sans-serif', transition: 'all 0.15s' }}
              >{tab}</button>
            ))}
          </div>
        </section>

        {/* ── WASHING MACHINES ── */}
        <section style={{ marginBottom: '64px' }}>
          <SectionHeader title="Featured Washing Machines" href="electronics/home-appliances" locale={locale} />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
            {washingMachines.map(item => <ListingCard key={item.id} item={item} />)}
          </div>
        </section>

        {/* ── STRATEGIC BANNER: IMMO PRO ── */}
        <section style={{ marginBottom: '64px' }}>
          <div style={{ position: 'relative', borderRadius: '40px', overflow: 'hidden', height: '300px', cursor: 'pointer' }}>
            <img
              src="https://images.pexels.com/photos/2872755/pexels-photo-2872755.jpeg?auto=compress&w=1600"
              alt="SouKni Immo Pro"
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.5)', transition: 'transform 0.7s' }}
              onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
            />
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', padding: '48px' }}>
              <div style={{ maxWidth: '480px', position: 'relative', zIndex: 1 }}>
                <p style={{ color: '#2dd4bf', fontWeight: 700, fontSize: '11px', textTransform: 'uppercase' as const, letterSpacing: '0.2em', marginBottom: '12px', fontFamily: 'Inter,sans-serif' }}>SouKni Immo Pro</p>
                <h3 style={{ fontSize: '36px', fontWeight: 800, color: 'white', marginBottom: '20px', letterSpacing: '-0.02em', lineHeight: 1.2, fontFamily: 'Inter,sans-serif' }}>List your property where the elite browse.</h3>
                <button style={{ backgroundColor: 'white', color: '#2dd4bf', border: 'none', padding: '12px 28px', borderRadius: '100px', fontWeight: 700, fontSize: '14px', cursor: 'pointer', fontFamily: 'Inter,sans-serif', transition: 'all 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#2dd4bf'; e.currentTarget.style.color = 'white' }}
                  onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'white'; e.currentTarget.style.color = '#2dd4bf' }}
                >Explore Properties</button>
              </div>
            </div>
          </div>
        </section>

        {/* ── SMALL KITCHEN EXCELLENCE ── */}
        <section style={{ marginBottom: '64px' }}>
          <SectionHeader title="Small Kitchen Excellence" href="electronics/home-appliances" locale={locale} />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
            {kitchenAppliances.map(item => <KitchenCard key={item.id} item={item} />)}
          </div>
        </section>

        {/* ── ELITE HOME ENTERTAINMENT ── */}
        <section style={{ marginBottom: '64px' }}>
          <SectionHeader title="Elite Home Entertainment" href="electronics/home-appliances" locale={locale} />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
            {entertainment.map(item => <ListingCard key={item.id} item={item} />)}
          </div>
        </section>

        {/* ── PREMIUM REFRIGERATION ── */}
        <section style={{ marginBottom: '64px' }}>
          <SectionHeader title="Premium Refrigeration Excellence" href="electronics/home-appliances" locale={locale} />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
            {refrigeration.map(item => <ListingCard key={item.id} item={item} />)}
          </div>
        </section>

        {/* ── DIAMOND MEMBER BANNER ── */}
        <section style={{ marginBottom: '80px' }}>
          <div style={{ position: 'relative', borderRadius: '40px', overflow: 'hidden', padding: '56px', background: 'linear-gradient(135deg, #2dd4bf 0%, #2dd4bf 100%)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '40px', boxShadow: '0 20px 60px rgba(0,107,95,0.2)' }}>
            <div style={{ maxWidth: '560px', position: 'relative', zIndex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'rgba(255,255,255,0.8)', fontWeight: 700, marginBottom: '16px', fontSize: '12px', textTransform: 'uppercase' as const, letterSpacing: '0.15em', fontFamily: 'Inter,sans-serif' }}>
                💎 EXCLUSIVE PRIVILEGE
              </div>
              <h3 style={{ fontSize: '36px', fontWeight: 800, color: 'white', marginBottom: '20px', letterSpacing: '-0.02em', lineHeight: 1.2, fontFamily: 'Inter,sans-serif' }}>
                Unlock the Power of Diamond Membership.
              </h3>
              <p style={{ fontSize: '17px', color: 'rgba(255,255,255,0.9)', marginBottom: '32px', lineHeight: 1.7, fontFamily: 'Inter,sans-serif' }}>
                Priority placement, verified trust status, and direct WhatsApp marketing tools to sell 5× faster in the Rabat premium market.
              </p>
              <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' as const }}>
                <button style={{ backgroundColor: 'white', color: '#2dd4bf', border: 'none', padding: '14px 36px', borderRadius: '100px', fontWeight: 800, fontSize: '15px', cursor: 'pointer', fontFamily: 'Inter,sans-serif', boxShadow: '0 8px 24px rgba(0,0,0,0.15)', transition: 'transform 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.04)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                >Get Diamond Status</button>
                <button style={{ backgroundColor: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)', color: 'white', border: '1px solid rgba(255,255,255,0.3)', padding: '14px 36px', borderRadius: '100px', fontWeight: 700, fontSize: '15px', cursor: 'pointer', fontFamily: 'Inter,sans-serif', transition: 'background 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.25)'}
                  onMouseLeave={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.15)'}
                >Learn More</button>
              </div>
            </div>
            {/* Diamond icon decoration */}
            <div style={{ position: 'relative', width: '280px', height: '280px', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: '50%' }} />
              <div style={{ width: '200px', height: '200px', backgroundColor: 'rgba(255,255,255,0.12)', borderRadius: '40px', transform: 'rotate(12deg)', border: '3px solid rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '80px' }}>
                💎
              </div>
            </div>
          </div>
        </section>

        {/* ── APP DOWNLOAD ── */}
        <section style={{ marginBottom: '80px' }}>
          <div style={{ backgroundColor: '#e8efec', borderRadius: '40px', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '48px', gap: '40px' }}>
            <div style={{ flex: 1 }}>
              <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#161d1b', marginBottom: '8px', fontFamily: 'Inter,sans-serif' }}>Find amazing deals on the go.</h2>
              <p style={{ fontSize: '38px', fontWeight: 800, color: '#ba1a1a', marginBottom: '28px', letterSpacing: '-0.02em', lineHeight: 1.1, fontFamily: 'Inter,sans-serif' }}>Download the app now!</p>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' as const }}>
                {['🍎 App Store', '▶ Google Play', '🛍 AppGallery'].map(btn => (
                  <button key={btn} style={{ backgroundColor: '#0f172a', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '12px', fontWeight: 600, fontSize: '13px', cursor: 'pointer', fontFamily: 'Inter,sans-serif', display: 'flex', alignItems: 'center', gap: '8px', transition: 'opacity 0.15s' }}
                    onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
                    onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                  >{btn}</button>
                ))}
              </div>
            </div>
            <div style={{ position: 'relative', height: '260px', flexShrink: 0 }}>
              <img
                src="https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&w=300"
                alt="SouKni App"
                style={{ height: '100%', objectFit: 'contain', filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.2))' }}
              />
            </div>
          </div>
        </section>
      </div>

      {/* ── GREY FOOTER (matching site footer) ── */}
    </div>
  )
}
