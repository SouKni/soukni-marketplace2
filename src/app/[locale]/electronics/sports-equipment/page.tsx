'use client'

import { useState, useEffect } from 'react'
import React from 'react'
import Link from 'next/link'
import { useMarket } from '@/context/MarketContext'
import { Heart, Search, MapPin, ChevronDown } from 'lucide-react'

/* ─── TYPES ─────────────────────────────────────────────── */
type BadgeType = 'featured' | 'verified' | 'diamond' | 'certified'

interface Listing {
  id: string
  brand: string
  title: string
  price: number
  location: string
  time?: string
  badges: BadgeType[]
  image: string
  dots?: number
}

/* ─── DATA ─────────────────────────────────────────────── */
const quickCategories = [
  { icon: '🚴', label: 'Bicycles', count: '420+', active: true },
  { icon: '⚡', label: 'Gym Gear', count: '850+', active: false },
  { icon: '🎾', label: 'Padel & Tennis', count: '120+', active: false },
  { icon: '🌊', label: 'Water Sports', count: '95+', active: false },
  { icon: '⊞', label: 'View More', count: '', active: false },
]

const featuredAds: Listing[] = [
  { id: 'f1', brand: 'Specialized', title: 'Specialized Epic World Cup - Carbon MTB 2024', price: 72500, location: 'Souissi, Rabat', badges: ['featured', 'verified', 'diamond'], image: 'https://images.pexels.com/photos/100582/pexels-photo-100582.jpeg?auto=compress&w=600', dots: 3 },
  { id: 'f2', brand: 'Technogym', title: 'Technogym MyRun - Smart Home Treadmill', price: 31000, location: 'Agdal, Rabat', badges: ['featured', 'verified', 'diamond'], image: 'https://images.pexels.com/photos/1954524/pexels-photo-1954524.jpeg?auto=compress&w=600', dots: 2 },
  { id: 'f3', brand: 'DJI', title: 'DJI Mavic 3 Pro - Professional Cinema Drone', price: 28500, location: 'Hay Riad, Rabat', badges: ['featured', 'verified'], image: 'https://images.pexels.com/photos/1392595/pexels-photo-1392595.jpeg?auto=compress&w=600', dots: 2 },
  { id: 'f4', brand: 'Concept2', title: 'Concept2 BikeErg with PM5 Monitor', price: 19200, location: 'Rabat Centre', badges: ['featured', 'verified'], image: 'https://images.pexels.com/photos/416978/pexels-photo-416978.jpeg?auto=compress&w=600', dots: 2 },
  { id: 'f5', brand: 'Peloton', title: 'Peloton Bike+ - Ultimate Indoor Cycling', price: 38000, location: 'Harhoura, Rabat', badges: ['featured', 'verified', 'diamond'], image: 'https://images.pexels.com/photos/2261477/pexels-photo-2261477.jpeg?auto=compress&w=600', dots: 3 },
  { id: 'f6', brand: 'GoPro', title: 'GoPro HERO12 Black Creator Edition - Full Vlogging Kit', price: 6500, location: 'Agdal, Rabat', badges: ['featured', 'verified'], image: 'https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg?auto=compress&w=600', dots: 2 },
  { id: 'f7', brand: 'Matrix', title: 'Matrix Performance Plus Treadmill', price: 45000, location: 'Souissi, Rabat', badges: ['featured', 'verified', 'diamond'], image: 'https://images.pexels.com/photos/1954524/pexels-photo-1954524.jpeg?auto=compress&w=600', dots: 2 },
  { id: 'f8', brand: 'Insta360', title: 'Insta360 ONE RS - 1-Inch 360 Edition', price: 5800, location: 'Rabat Centre', badges: ['featured', 'verified'], image: 'https://images.pexels.com/photos/3945683/pexels-photo-3945683.jpeg?auto=compress&w=600', dots: 2 },
]

const proSports: Listing[] = [
  { id: 'ps1', brand: 'Specialized', title: 'S-Works Tarmac SL7 - Dura-Ace Di2, Carbon Fiber Frame', price: 65000, location: 'Souissi, Rabat', badges: ['verified', 'diamond'], image: 'https://images.pexels.com/photos/100582/pexels-photo-100582.jpeg?auto=compress&w=600', dots: 3 },
  { id: 'ps2', brand: 'Bullpadel', title: 'Bullpadel Vertex 04 2024 - Professional Power Racket', price: 3800, location: 'Agdal, Rabat', badges: ['verified'], image: 'https://images.pexels.com/photos/1752757/pexels-photo-1752757.jpeg?auto=compress&w=600', dots: 2 },
]

const optics: Listing[] = [
  { id: 'o1', brand: 'Matrix', title: 'Matrix T50 Commercial Treadmill - Professional Grade', price: 42500, location: 'Harhoura', time: '2h ago', badges: ['verified'], image: 'https://images.pexels.com/photos/1954524/pexels-photo-1954524.jpeg?auto=compress&w=600', dots: 3 },
  { id: 'o2', brand: 'Technogym', title: 'Technogym Skillrow - Indoor Rower with Resistance', price: 28900, location: 'Rabat Centre', time: '5h ago', badges: ['certified'], image: 'https://images.pexels.com/photos/416978/pexels-photo-416978.jpeg?auto=compress&w=600', dots: 2 },
  { id: 'o3', brand: 'Concept2', title: 'Concept2 Model D Rower with PM5 Monitor - Like New', price: 18500, location: 'Hay Riad', time: '1d ago', badges: ['verified'], image: 'https://images.pexels.com/photos/2261477/pexels-photo-2261477.jpeg?auto=compress&w=600', dots: 2 },
  { id: 'o4', brand: 'Peloton', title: 'Peloton Bike+ with 24" Rotating HD Touchscreen', price: 35000, location: 'Sale', time: '3h ago', badges: ['diamond'], image: 'https://images.pexels.com/photos/2261477/pexels-photo-2261477.jpeg?auto=compress&w=600', dots: 2 },
  { id: 'o5', brand: 'Leica', title: 'Leica Geovid Pro 32 Rangefinder - Ultra Compact', price: 32500, location: 'Rabat Centre', time: '2h ago', badges: ['diamond'], image: 'https://images.pexels.com/photos/1752757/pexels-photo-1752757.jpeg?auto=compress&w=600', dots: 3 },
  { id: 'o6', brand: 'Swarovski', title: 'Swarovski NL Pure 10x42 Binoculars - Elite Field View', price: 28900, location: 'Hay Riad', time: '5h ago', badges: ['verified'], image: 'https://images.pexels.com/photos/3945683/pexels-photo-3945683.jpeg?auto=compress&w=600', dots: 2 },
  { id: 'o7', brand: 'Zeiss', title: 'Zeiss Victory Harpia 95 Spotting Scope - Pro Optics', price: 42000, location: 'Agdal', time: '1d ago', badges: ['diamond'], image: 'https://images.pexels.com/photos/1392595/pexels-photo-1392595.jpeg?auto=compress&w=600', dots: 2 },
  { id: 'o8', brand: 'Garmin', title: 'Garmin MARQ Athlete (Gen 2) - Luxury Performance Watch', price: 18500, location: 'Souissi', time: '3h ago', badges: ['verified'], image: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&w=600', dots: 2 },
  { id: 'o9', brand: 'Oakley', title: 'Oakley Kato Prizm Sapphire - Performance Eyewear', price: 3200, location: 'Rabat Centre', time: '6h ago', badges: ['verified'], image: 'https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg?auto=compress&w=600', dots: 2 },
  { id: 'o10', brand: 'Nightforce', title: 'Nightforce ATACR 7-35x56 F1 - Tactical Long Range', price: 45000, location: 'Hay Riad', time: '12h ago', badges: ['diamond'], image: 'https://images.pexels.com/photos/1392595/pexels-photo-1392595.jpeg?auto=compress&w=600', dots: 3 },
  { id: 'o11', brand: 'Trijicon', title: 'Trijicon RMR Type 2 Red Dot - Rugged Optics', price: 6500, location: 'Rabat Centre', time: '8h ago', badges: ['verified'], image: 'https://images.pexels.com/photos/3945683/pexels-photo-3945683.jpeg?auto=compress&w=600', dots: 2 },
  { id: 'o12', brand: 'Shimano', title: 'Shimano Stella SW C Saltwater Reel - Elite Grade', price: 12800, location: 'Harhoura', time: '1h ago', badges: ['diamond'], image: 'https://images.pexels.com/photos/1752757/pexels-photo-1752757.jpeg?auto=compress&w=600', dots: 3 },
]

const actionAdventure: Listing[] = [
  { id: 'a1', brand: 'GoPro', title: 'GoPro HERO12 Black - 5.3K HDR Video', price: 5200, location: 'Rabat', badges: ['verified'], image: 'https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg?auto=compress&w=600' },
  { id: 'a2', brand: 'DJI', title: 'DJI Osmo Action 4 - Standard Combo', price: 3800, location: 'Temara', badges: ['verified'], image: 'https://images.pexels.com/photos/1392595/pexels-photo-1392595.jpeg?auto=compress&w=600' },
  { id: 'a3', brand: 'Insta360', title: 'Insta360 X3 Waterproof 360 Action Cam', price: 4900, location: 'Rabat', badges: ['verified'], image: 'https://images.pexels.com/photos/3945683/pexels-photo-3945683.jpeg?auto=compress&w=600' },
  { id: 'a4', brand: 'DJI', title: 'DJI Mavic 3 Pro - Triple Camera System', price: 24500, location: 'Harhoura', badges: ['verified'], image: 'https://images.pexels.com/photos/1392595/pexels-photo-1392595.jpeg?auto=compress&w=600' },
]

/* ─── BADGE CHIP ─────────────────────────────────────────── */
function BadgeChip({ type }: { type: BadgeType }) {
  const styles: Record<BadgeType, React.CSSProperties> = {
    featured: { backgroundColor: '#0f172a', color: 'white' },
    verified: { backgroundColor: '#2dd4bf', color: 'white' },
    diamond: { backgroundColor: '#f59e0b', color: 'white' },
    certified: { backgroundColor: '#94a3b8', color: 'white' },
  }
  const labels: Record<BadgeType, string> = {
    featured: 'Featured',
    verified: 'Verified',
    diamond: '💎 Diamond',
    certified: 'Certified',
  }
  return (
    <span style={{
      ...styles[type],
      fontSize: '9px', fontWeight: 800, padding: '3px 8px',
      borderRadius: '100px', textTransform: 'uppercase' as const,
      letterSpacing: '0.08em', fontFamily: 'Inter,sans-serif',
      whiteSpace: 'nowrap' as const,
    }}>{labels[type]}</span>
  )
}

/* ─── LISTING CARD ───────────────────────────────────────── */
function ListingCard({ item, compact = false }: { item: Listing; compact?: boolean }) {
  const [saved, setSaved] = useState(false)
  const [hovered, setHovered] = useState(false)
  const { formatPrice } = useMarket()

  return (
    <article
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        backgroundColor: 'white', borderRadius: '40px', overflow: 'hidden',
        border: '1px solid #f1f5f9',
        boxShadow: hovered ? '0 20px 40px rgba(0,0,0,0.1)' : '0 2px 8px rgba(0,0,0,0.04)',
        transition: 'all 0.3s', cursor: 'pointer', position: 'relative' as const,
        padding: '16px', display: 'flex', flexDirection: 'column' as const,
      }}
    >
      {/* Badges */}
      <div style={{ position: 'absolute', top: '24px', left: '24px', zIndex: 10, display: 'flex', flexDirection: 'column' as const, gap: '4px' }}>
        <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' as const }}>
          {item.badges.includes('featured') && <BadgeChip type="featured" />}
          {item.badges.includes('verified') && <BadgeChip type="verified" />}
          {item.badges.includes('certified') && <BadgeChip type="certified" />}
        </div>
        {item.badges.includes('diamond') && <BadgeChip type="diamond" />}
      </div>

      {/* Save */}
      <button
        onClick={e => { e.stopPropagation(); setSaved(!saved) }}
        style={{ position: 'absolute', top: '24px', right: '24px', zIndex: 10, width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <Heart size={20} fill={saved ? '#ef4444' : 'none'} color={saved ? '#ef4444' : '#9ca3af'} />
      </button>

      {/* Image */}
      <div style={{ aspectRatio: '1/1', borderRadius: '28px', overflow: 'hidden', marginBottom: '16px', backgroundColor: '#f8fafc' }}>
        <img
          src={item.image} alt={item.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s', transform: hovered ? 'scale(1.06)' : 'scale(1)' }}
        />
        {/* Dots */}
        {item.dots && (
          <div style={{ position: 'absolute', bottom: '80px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '5px' }}>
            {Array.from({ length: item.dots }).map((_, i) => (
              <div key={i} style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: i === 0 ? '#2dd4bf' : '#d1d5db' }} />
            ))}
          </div>
        )}
      </div>

      {/* Content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' as const }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px' }}>
          <span style={{ fontSize: '10px', fontWeight: 700, color: '#6b7280', textTransform: 'uppercase' as const, letterSpacing: '0.1em', fontFamily: 'Inter,sans-serif' }}>{item.brand}</span>
          <span style={{ fontSize: compact ? '13px' : '14px', fontWeight: 800, color: '#2dd4bf', fontFamily: 'Inter,sans-serif', whiteSpace: 'nowrap' as const }}>{formatPrice(item.price)}</span>
        </div>
        <h4 style={{ fontSize: compact ? '12px' : '14px', fontWeight: 700, color: '#1f2937', marginBottom: '6px', lineHeight: 1.35, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' as const, overflow: 'hidden', fontFamily: 'Inter,sans-serif' }}>{item.title}</h4>
        <div style={{ display: 'flex', alignItems: 'center', fontSize: '10px', color: '#6b7280', marginBottom: '14px', gap: '3px', fontFamily: 'Inter,sans-serif' }}>
          <MapPin size={11} />
          {item.location}{item.time ? ` • ${item.time}` : ''}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginTop: 'auto' }}>
          <button style={{ border: '1px solid #2dd4bf', color: '#2dd4bf', backgroundColor: 'transparent', padding: '8px 4px', borderRadius: '100px', fontSize: '11px', fontWeight: 700, cursor: 'pointer', fontFamily: 'Inter,sans-serif', transition: 'all 0.15s' }}
            onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#2dd4bf'; e.currentTarget.style.color = 'white' }}
            onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#2dd4bf' }}
          >Message</button>
          <button style={{ backgroundColor: '#25D366', color: 'white', border: 'none', padding: '8px 4px', borderRadius: '100px', fontSize: '11px', fontWeight: 700, cursor: 'pointer', fontFamily: 'Inter,sans-serif', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', transition: 'filter 0.15s' }}
            onMouseEnter={e => e.currentTarget.style.filter = 'brightness(1.08)'}
            onMouseLeave={e => e.currentTarget.style.filter = 'brightness(1)'}
          >WhatsApp</button>
        </div>
      </div>
    </article>
  )
}

/* ─── SECTION HEADER ─────────────────────────────────────── */
function SectionHeader({ title, subtitle, href, locale }: { title: string; subtitle?: string; href: string; locale: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '20px' }}>
      <div>
        <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#1f2937', fontFamily: 'Inter,sans-serif', marginBottom: subtitle ? '2px' : '0' }}>{title}</h3>
        {subtitle && <p style={{ fontSize: '12px', color: '#6b7280', fontFamily: 'Inter,sans-serif' }}>{subtitle}</p>}
      </div>
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
      onClick={onToggle}
      style={{ display: 'flex', alignItems: 'center', gap: '10px', backgroundColor: '#f4fbf8', border: '1px solid #e2e8f0', padding: '8px 16px', borderRadius: '100px', cursor: 'pointer', userSelect: 'none' as const }}
    >
      <span style={{ fontSize: '13px', color: '#374151', fontFamily: 'Inter,sans-serif', fontWeight: 500 }}>Show Diamond Verified First</span>
      <div style={{ width: '40px', height: '20px', borderRadius: '100px', backgroundColor: enabled ? '#2dd4bf' : '#d1d5db', position: 'relative', transition: 'background 0.25s', flexShrink: 0 }}>
        <div style={{ position: 'absolute', top: '2px', left: enabled ? '22px' : '2px', width: '16px', height: '16px', borderRadius: '50%', backgroundColor: 'white', boxShadow: '0 1px 4px rgba(0,0,0,0.2)', transition: 'left 0.25s' }} />
      </div>
    </div>
  )
}

/* ─── PAGE ───────────────────────────────────────────────── */
export default function SportsEquipmentPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = React.use(params)
  const [activeCategory, setActiveCategory] = useState('Bicycles')
  const [activeSeller, setActiveSeller] = useState('All Sellers')
  const [diamondFirst, setDiamondFirst] = useState(true)
  const [keyword, setKeyword] = useState('')

  return (
    <div style={{ fontFamily: 'Inter,system-ui,sans-serif', backgroundColor: '#f4fbf8', minHeight: '100vh' }}>

      {/* ── HERO ── */}
      <section style={{ position: 'relative', height: '480px', width: '100%', overflow: 'hidden' }}>
        <img
          src="https://images.pexels.com/photos/1552249/pexels-photo-1552249.jpeg?auto=compress&w=1600"
          alt="Sports Equipment Hero"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.68)' }}
        />
        <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.25)' }} />
        <div style={{ position: 'relative', zIndex: 10, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 24px', textAlign: 'center' }}>
          <h1 style={{ fontSize: '48px', fontWeight: 800, color: 'white', marginBottom: '28px', letterSpacing: '-0.02em', lineHeight: 1.1, textShadow: '0 4px 20px rgba(0,0,0,0.3)', fontFamily: 'Inter,sans-serif' }}>
            Elite Sports Equipment.<br />
            <span style={{ color: '#2dd4bf' }}>Premium Athletes in Rabat.</span>
          </h1>
          {/* Glassmorphic search */}
          <div style={{ width: '100%', maxWidth: '700px', backgroundColor: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '100px', padding: '6px 6px 6px 24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Search size={22} color="rgba(255,255,255,0.7)" style={{ flexShrink: 0 }} />
            <input
              type="text" value={keyword} onChange={e => setKeyword(e.target.value)}
              placeholder="Search premium sports gear..."
              style={{ flex: 1, backgroundColor: 'transparent', border: 'none', outline: 'none', fontSize: '16px', color: 'white', fontFamily: 'Inter,sans-serif' }}
            />
            <button style={{ backgroundColor: '#2dd4bf', color: 'white', border: 'none', padding: '12px 32px', borderRadius: '100px', fontWeight: 700, fontSize: '14px', cursor: 'pointer', flexShrink: 0, transition: 'filter 0.15s' }}
              onMouseEnter={e => e.currentTarget.style.filter = 'brightness(1.1)'}
              onMouseLeave={e => e.currentTarget.style.filter = 'brightness(1)'}
            >Search</button>
          </div>
        </div>
      </section>

      <main style={{ maxWidth: '1440px', margin: '0 auto', padding: '32px 40px 80px' }}>

        {/* ── QUICK CATEGORY FILTER ── */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px', gap: '16px', flexWrap: 'wrap' as const }}>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' as const, overflowX: 'auto' as const }}>
            {quickCategories.map(cat => (
              <div
                key={cat.label}
                onClick={() => cat.label !== 'View More' && setActiveCategory(cat.label)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '14px',
                  backgroundColor: activeCategory === cat.label ? 'white' : '#f4fbf8',
                  padding: '14px 20px 14px 14px', borderRadius: '20px',
                  border: activeCategory === cat.label ? '1px solid rgba(45,212,191,0.3)' : '1px solid #e2e8f0',
                  boxShadow: activeCategory === cat.label ? '0 4px 16px rgba(45,212,191,0.12)' : 'none',
                  cursor: 'pointer', transition: 'all 0.2s', minWidth: '160px',
                }}
              >
                <div style={{ width: '44px', height: '44px', borderRadius: '50%', backgroundColor: activeCategory === cat.label ? 'rgba(45,212,191,0.12)' : '#e8efec', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', flexShrink: 0 }}>
                  {cat.icon}
                </div>
                <div>
                  <p style={{ fontSize: '11px', color: '#6b7280', fontFamily: 'Inter,sans-serif', marginBottom: '1px' }}>{cat.label}</p>
                  {cat.count && <p style={{ fontSize: '18px', fontWeight: 800, color: activeCategory === cat.label ? '#2dd4bf' : '#1f2937', fontFamily: 'Inter,sans-serif', lineHeight: 1 }}>{cat.count}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── FILTER BAR ── */}
        <div style={{ backgroundColor: '#f4fbf8', borderRadius: '100px', border: '1px solid #e2e8f0', padding: '6px', display: 'flex', alignItems: 'center', marginBottom: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
          {[
            { label: 'City', value: 'Rabat', isSelect: true },
            { label: 'Keyword', value: 'What are you looking for?', isInput: true },
            { label: 'Neighborhood', value: 'Enter location', isInput: true },
            { label: 'Price (MAD)', value: 'Select', isSelect: true },
          ].map((f, i, arr) => (
            <React.Fragment key={f.label}>
              <div style={{ flex: f.isInput && i === 1 ? 2 : 1, padding: '8px 16px', cursor: 'pointer' }}>
                <label style={{ display: 'block', fontSize: '9px', textTransform: 'uppercase' as const, fontWeight: 700, color: '#9ca3af', marginBottom: '2px', letterSpacing: '0.1em', fontFamily: 'Inter,sans-serif' }}>{f.label}</label>
                {f.isInput
                  ? <input type="text" placeholder={f.value} style={{ width: '100%', border: 'none', backgroundColor: 'transparent', padding: 0, fontSize: '13px', outline: 'none', fontFamily: 'Inter,sans-serif', color: '#1f2937' }} />
                  : <select style={{ width: '100%', border: 'none', backgroundColor: 'transparent', padding: 0, fontSize: '13px', fontWeight: 600, outline: 'none', fontFamily: 'Inter,sans-serif', color: '#1f2937', cursor: 'pointer' }}>
                      <option>{f.value}</option>
                    </select>
                }
              </div>
              {i < arr.length - 1 && <div style={{ width: '1px', height: '32px', backgroundColor: '#e2e8f0', flexShrink: 0 }} />}
            </React.Fragment>
          ))}
          <div style={{ width: '1px', height: '32px', backgroundColor: '#e2e8f0', flexShrink: 0, margin: '0 4px' }} />
          <div style={{ padding: '8px 16px', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, color: '#2dd4bf', fontFamily: 'Inter,sans-serif', whiteSpace: 'nowrap' as const }}>1 filter selected</span>
            <div style={{ backgroundColor: '#f1f5f9', padding: '6px', borderRadius: '8px' }}>
              <ChevronDown size={16} color="#6b7280" />
            </div>
          </div>
        </div>

        {/* ── SECTION TITLE + SELLER PILLS ── */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap' as const, gap: '12px' }}>
          <div>
            <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#1f2937', fontFamily: 'Inter,sans-serif', marginBottom: '12px' }}>
              New and Used Sports Equipment for sale in Rabat{' '}
              <span style={{ color: '#9ca3af', fontWeight: 400, fontSize: '18px' }}>- 2,140 Ads</span>
            </h2>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' as const }}>
              {['All Sellers', 'SouKni Members', 'SouKni Pro'].map(tab => (
                <button key={tab} onClick={() => setActiveSeller(tab)}
                  style={{ padding: '6px 16px', borderRadius: '100px', fontSize: '13px', fontWeight: 600, border: 'none', cursor: 'pointer', fontFamily: 'Inter,sans-serif', transition: 'all 0.15s', backgroundColor: activeSeller === tab ? '#1f2937' : '#f1f5f9', color: activeSeller === tab ? 'white' : '#4b5563' }}
                >{tab}</button>
              ))}
              <DiamondToggle enabled={diamondFirst} onToggle={() => setDiamondFirst(!diamondFirst)} />
            </div>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            {['⇅ Sort: Default', '🔖 Save Search'].map(btn => (
              <button key={btn} style={{ display: 'flex', alignItems: 'center', gap: '6px', border: '1px solid #e2e8f0', borderRadius: '100px', padding: '8px 16px', fontSize: '13px', fontWeight: 500, backgroundColor: 'white', cursor: 'pointer', fontFamily: 'Inter,sans-serif', transition: 'background 0.15s' }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = '#f8fafc'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = 'white'}
              >{btn}</button>
            ))}
          </div>
        </div>

        {/* ── FEATURED ADS (2 rows × 4 cols) ── */}
        <section style={{ marginBottom: '48px' }}>
          <SectionHeader title="Featured Ads" href="electronics/sports-equipment" locale={locale} />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
            {featuredAds.map(item => <ListingCard key={item.id} item={item} />)}
          </div>
        </section>

        {/* ── PRO SPORTS SELECTION ── */}
        <section style={{ marginBottom: '48px' }}>
          <SectionHeader title="Pro Sports Selection" href="electronics/sports-equipment" locale={locale} />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
            {proSports.map(item => <ListingCard key={item.id} item={item} />)}

            {/* Concierge bento block — spans 2 cols */}
            <div style={{ gridColumn: 'span 2', position: 'relative', borderRadius: '40px', overflow: 'hidden', minHeight: '340px' }}>
              <img
                src="https://images.pexels.com/photos/1552249/pexels-photo-1552249.jpeg?auto=compress&w=800"
                alt="Pro Sports Concierge"
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.7s' }}
                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
              />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)' }} />
              <div style={{ position: 'absolute', bottom: '24px', left: '24px', right: '24px', backgroundColor: 'rgba(255,255,255,0.88)', backdropFilter: 'blur(8px)', padding: '24px', borderRadius: '24px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#1f2937', marginBottom: '8px', fontFamily: 'Inter,sans-serif' }}>Pro Sports Sourcing Concierge</h3>
                <p style={{ fontSize: '13px', color: '#4b5563', marginBottom: '16px', lineHeight: 1.6, fontFamily: 'Inter,sans-serif' }}>Whether you're offloading premium gear or hunting for a professional setup, our experts handle the sourcing and verification for you.</p>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button style={{ backgroundColor: '#2dd4bf', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '100px', fontSize: '12px', fontWeight: 700, cursor: 'pointer', fontFamily: 'Inter,sans-serif' }}>Post Your Gear</button>
                  <button style={{ backgroundColor: 'rgba(255,255,255,0.6)', border: '1px solid #e2e8f0', color: '#1f2937', padding: '10px 20px', borderRadius: '100px', fontSize: '12px', fontWeight: 700, cursor: 'pointer', fontFamily: 'Inter,sans-serif' }}>Request Sourcing</button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── IMMO PRO BANNER ── */}
        <section style={{ marginBottom: '48px', position: 'relative', height: '300px', borderRadius: '40px', overflow: 'hidden' }}>
          <img
            src="https://images.pexels.com/photos/2581922/pexels-photo-2581922.jpeg?auto=compress&w=1600"
            alt="SouKni Immo Pro"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 1s' }}
            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.08)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
          />
          <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.22)' }} />
          <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '48px' }}>
            <span style={{ color: '#2dd4bf', fontWeight: 700, fontSize: '11px', textTransform: 'uppercase' as const, letterSpacing: '0.2em', marginBottom: '12px', fontFamily: 'Inter,sans-serif' }}>SouKni Immo Pro</span>
            <h2 style={{ color: 'white', fontSize: '38px', fontWeight: 800, marginBottom: '24px', letterSpacing: '-0.02em', lineHeight: 1.15, maxWidth: '500px', fontFamily: 'Inter,sans-serif' }}>
              List your property where the<br />elite browse.
            </h2>
            <button style={{ backgroundColor: 'white', color: '#1f2937', border: 'none', padding: '12px 28px', borderRadius: '100px', fontWeight: 700, fontSize: '14px', cursor: 'pointer', width: 'fit-content', fontFamily: 'Inter,sans-serif', transition: 'all 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#2dd4bf'; e.currentTarget.style.color = 'white' }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'white'; e.currentTarget.style.color = '#1f2937' }}
            >Explore Properties</button>
          </div>
        </section>

        {/* ── PRO OPTICS & STABILIZERS (3 rows × 4 cols) ── */}
        <section style={{ marginBottom: '48px' }}>
          <SectionHeader title="Pro Optics & Stabilizers" subtitle="Elite glass and precision control for every shot." href="electronics/sports-equipment" locale={locale} />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
            {optics.map(item => <ListingCard key={item.id} item={item} compact />)}
          </div>
        </section>

        {/* ── DIAMOND MEMBERSHIP BANNER ── */}
        <section style={{ marginBottom: '48px', borderRadius: '40px', overflow: 'hidden', padding: '56px 64px', background: 'linear-gradient(135deg, #0d9488 0%, #2dd4bf 100%)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '32px', position: 'relative' as const }}>
          {/* Abstract shapes */}
          <div style={{ position: 'absolute', right: '180px', top: '50%', transform: 'translateY(-50%)', width: '200px', height: '200px', border: '8px solid rgba(255,255,255,0.1)', borderRadius: '40px', rotate: '12deg', pointerEvents: 'none' as const }} />
          <div style={{ position: 'absolute', right: '240px', top: '20%', width: '80px', height: '80px', backgroundColor: 'rgba(255,255,255,0.06)', borderRadius: '50%', pointerEvents: 'none' as const }} />

          <div style={{ maxWidth: '560px', position: 'relative', zIndex: 1 }}>
            <span style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase' as const, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.8)', display: 'block', marginBottom: '16px', fontFamily: 'Inter,sans-serif' }}>Exclusive Privilege</span>
            <h2 style={{ fontSize: '36px', fontWeight: 800, color: 'white', marginBottom: '16px', letterSpacing: '-0.02em', lineHeight: 1.2, fontFamily: 'Inter,sans-serif' }}>
              Unlock the Power of Diamond Membership.
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '16px', marginBottom: '28px', lineHeight: 1.7, fontFamily: 'Inter,sans-serif' }}>
              Priority placement, verified trust status, and direct WhatsApp marketing tools to sell 5× faster in the Rabat premium market.
            </p>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' as const }}>
              <button style={{ backgroundColor: 'white', color: '#0d9488', border: 'none', padding: '13px 32px', borderRadius: '100px', fontWeight: 800, fontSize: '14px', cursor: 'pointer', fontFamily: 'Inter,sans-serif', transition: 'transform 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.04)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
              >Get Diamond Status</button>
              <button style={{ backgroundColor: 'rgba(255,255,255,0.2)', color: 'white', border: '1px solid rgba(255,255,255,0.3)', padding: '13px 32px', borderRadius: '100px', fontWeight: 700, fontSize: '14px', cursor: 'pointer', fontFamily: 'Inter,sans-serif', transition: 'background 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.3)'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.2)'}
              >Learn More</button>
            </div>
          </div>
        </section>

        {/* ── ACTION & ADVENTURE CAPTURE ── */}
        <section style={{ marginBottom: '48px' }}>
          <SectionHeader title="Action & Adventure Capture" href="electronics/sports-equipment" locale={locale} />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
            {actionAdventure.map(item => <ListingCard key={item.id} item={item} compact />)}
          </div>
        </section>

        {/* ── JOIN SOUKNI FAMILY ── */}
        <section style={{ borderRadius: '40px', overflow: 'hidden', backgroundColor: '#2dd4bf', padding: '56px 64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '48px' }}>
          <div style={{ maxWidth: '520px' }}>
            <h2 style={{ fontSize: '48px', fontWeight: 900, color: 'white', marginBottom: '20px', letterSpacing: '-0.03em', lineHeight: 1.1, fontFamily: 'Inter,sans-serif' }}>
              Join the<br />SouKni Family
            </h2>
            <p style={{ fontSize: '17px', color: 'rgba(255,255,255,0.85)', marginBottom: '36px', lineHeight: 1.7, fontFamily: 'Inter,sans-serif' }}>
              Download our premium mobile experience for real-time alerts and exclusive marketplace deals.
            </p>
            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' as const }}>
              {[
                { icon: '🍎', store: 'App Store', sub: 'Download on the' },
                { icon: '▶', store: 'Google Play', sub: 'Get it on' },
              ].map(btn => (
                <button key={btn.store} style={{ backgroundColor: '#0f172a', color: 'white', border: '1px solid rgba(255,255,255,0.1)', padding: '12px 20px', borderRadius: '14px', display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', fontFamily: 'Inter,sans-serif', transition: 'opacity 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
                  onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                >
                  <span style={{ fontSize: '26px' }}>{btn.icon}</span>
                  <div style={{ textAlign: 'left' }}>
                    <div style={{ fontSize: '9px', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase' as const, letterSpacing: '0.1em', lineHeight: 1 }}>{btn.sub}</div>
                    <div style={{ fontSize: '16px', fontWeight: 700, lineHeight: 1.3 }}>{btn.store}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Phone mockup */}
          <div style={{ flexShrink: 0, width: '300px' }}>
            <div style={{ backgroundColor: '#0f172a', width: '220px', margin: '0 auto', aspectRatio: '9/16', borderRadius: '48px', border: '8px solid #1e293b', boxShadow: '0 20px 60px rgba(0,0,0,0.3)', overflow: 'hidden', position: 'relative' as const }}>
              <div style={{ backgroundColor: 'white', height: '100%', padding: '16px' }}>
                <div style={{ height: '20px', width: '60%', backgroundColor: '#f1f5f9', borderRadius: '100px', marginBottom: '16px' }} />
                <div style={{ height: '100px', backgroundColor: 'rgba(45,212,191,0.15)', borderRadius: '20px', marginBottom: '16px' }} />
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div style={{ height: '70px', backgroundColor: '#f8fafc', borderRadius: '14px' }} />
                  <div style={{ height: '70px', backgroundColor: '#f8fafc', borderRadius: '14px' }} />
                </div>
              </div>
              <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '80px', height: '20px', backgroundColor: '#1e293b', borderRadius: '0 0 14px 14px' }} />
            </div>
          </div>
        </section>
      </main>

      {/* ── GREY FOOTER ── */}
      <footer style={{ backgroundColor: '#7a7a7a', color: 'white', paddingTop: '64px', paddingBottom: '32px', fontFamily: 'Inter,sans-serif' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 40px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1fr', gap: '48px', marginBottom: '48px', paddingBottom: '48px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                <div style={{ width: '40px', height: '40px', backgroundColor: '#2dd4bf', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '20px', color: 'white' }}>S</div>
                <span style={{ fontSize: '22px', fontWeight: 900, color: 'white' }}>SouKni</span>
              </div>
              <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.7, maxWidth: '260px', marginBottom: '20px' }}>The Market in your Pocket — Morocco's premium marketplace for sports, automotive, and lifestyle.</p>
              <div style={{ display: 'flex', gap: '10px' }}>
                {['FB', 'IG', 'TW'].map(s => (
                  <a key={s} href="#" style={{ width: '38px', height: '38px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 700, color: 'rgba(255,255,255,0.7)', textDecoration: 'none', transition: 'background 0.15s' }}
                    onMouseEnter={e => e.currentTarget.style.backgroundColor = '#2dd4bf'}
                    onMouseLeave={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.08)'}
                  >{s}</a>
                ))}
              </div>
            </div>
            {[
              { title: 'Marketplace', links: ['Real Estate', 'Motors', 'Jobs', 'Services', 'The Vault', 'Classifieds'] },
              { title: 'Company', links: ['About Us', 'Careers', 'Legal', 'Privacy Policy', 'Terms of Service'] },
              { title: 'Experience', links: ['Help Center', 'Trust & Safety', 'Diamond Membership', 'Contact Support', 'App Download'] },
            ].map(col => (
              <div key={col.title}>
                <h5 style={{ fontWeight: 700, fontSize: '15px', color: 'white', marginBottom: '20px' }}>{col.title}</h5>
                {col.links.map(link => (
                  <a key={link} href="#" style={{ display: 'block', fontSize: '13px', color: 'rgba(255,255,255,0.65)', textDecoration: 'none', marginBottom: '12px', transition: 'color 0.15s' }}
                    onMouseEnter={e => e.currentTarget.style.color = '#2dd4bf'}
                    onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.65)'}
                  >{link}</a>
                ))}
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' as const, gap: '12px' }}>
            <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)' }}>© 2026 SouKni Morocco. All rights reserved. Premium Marketplace for Moroccan Athletes.</p>
            <div style={{ display: 'flex', gap: '20px', fontSize: '11px', color: 'rgba(255,255,255,0.4)' }}>
              <span>🌐 English (FR/AR Available)</span>
              <span>💎 Diamond Certified Platform</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
