'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { MapPin, Heart, Search, ChevronDown, ChevronLeft, ChevronRight, Bell, User, Bookmark, Users, ShieldCheck, Apple, PlayCircle, Compass, Car, Gem, Plus, SortAsc, BellRing } from 'lucide-react'

const navLinks = ['Motors', 'Property', 'Mobiles & Computers', 'The Vault', 'Home & Living', 'Fashion', 'Jobs', 'Services']

const brands = ['Apple', 'Samsung', 'Nokia', 'Huawei', 'Oppo', 'Xiaomi', 'Honor']

type Device = {
  id: string
  title: string
  price: string
  location: string
  time: string
  badge: 'DIAMOND MEMBER' | 'VERIFIED'
  image: string
}

const row1: Device[] = [
  { id: '1', title: 'iPhone 15 Pro - 256GB Titanium Blue', price: '11,500', location: 'Agdal, Rabat', time: 'Just Now', badge: 'DIAMOND MEMBER', image: 'https://images.pexels.com/photos/5813851/pexels-photo-5813851.jpeg?auto=compress&w=500' },
  { id: '2', title: 'Samsung S24 Ultra 512GB (New)', price: '12,200', location: 'Hay Riad, Rabat', time: '15 min ago', badge: 'VERIFIED', image: 'https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg?auto=compress&w=500' },
  { id: '3', title: 'Google Pixel 9 Pro - Mint Condition', price: '8,900', location: 'Hassan, Rabat', time: '2 hours ago', badge: 'DIAMOND MEMBER', image: 'https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg?auto=compress&w=500' },
  { id: '4', title: 'Sony Xperia 1 V - Multimedia King', price: '7,500', location: 'Souissi, Rabat', time: '5 hours ago', badge: 'VERIFIED', image: 'https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&w=500' },
]

const featuredMobiles: Device[] = [
  { id: '5', title: 'Google Pixel 9 Pro XL - 512GB', price: '10,900', location: 'Agdal, Rabat', time: 'Sponsored', badge: 'DIAMOND MEMBER', image: 'https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg?auto=compress&w=500' },
  { id: '6', title: 'Premium Foldable Phone - Mint', price: '14,500', location: 'Hay Riad, Rabat', time: 'Just Now', badge: 'VERIFIED', image: 'https://images.pexels.com/photos/5813851/pexels-photo-5813851.jpeg?auto=compress&w=500' },
  { id: '7', title: 'Samsung Galaxy S24 Ultra 1TB', price: '13,200', location: 'Souissi, Rabat', time: '1 hour ago', badge: 'DIAMOND MEMBER', image: 'https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg?auto=compress&w=500' },
  { id: '8', title: 'iPad Pro 13-inch M4 Chip', price: '15,800', location: 'Hassan, Rabat', time: '2 hours ago', badge: 'VERIFIED', image: 'https://images.pexels.com/photos/1334598/pexels-photo-1334598.jpeg?auto=compress&w=500' },
]

const expansionGrid: Device[] = [
  { id: '9', title: 'MacBook Pro M3 Max - 14" Space Black', price: '32,500', location: 'Hay Riad, Rabat', time: '5 min ago', badge: 'DIAMOND MEMBER', image: 'https://images.pexels.com/photos/303383/pexels-photo-303383.jpeg?auto=compress&w=500' },
  { id: '10', title: 'iPhone 15 Pro Max - 512GB Natural Titanium', price: '13,800', location: 'Agdal, Rabat', time: '12 min ago', badge: 'VERIFIED', image: 'https://images.pexels.com/photos/5813851/pexels-photo-5813851.jpeg?auto=compress&w=500' },
  { id: '11', title: 'iPad Pro 11-inch M4 - 256GB Wi-Fi', price: '11,200', location: 'Souissi, Rabat', time: '25 min ago', badge: 'DIAMOND MEMBER', image: 'https://images.pexels.com/photos/1334598/pexels-photo-1334598.jpeg?auto=compress&w=500' },
  { id: '12', title: 'Samsung Galaxy S24 Ultra - 256GB Titanium Gray', price: '10,500', location: 'Hassan, Rabat', time: '40 min ago', badge: 'VERIFIED', image: 'https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg?auto=compress&w=500' },
  { id: '13', title: 'Google Pixel 9 Pro - 128GB Obsidian', price: '9,200', location: 'Agdal, Rabat', time: '1 hour ago', badge: 'DIAMOND MEMBER', image: 'https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg?auto=compress&w=500' },
  { id: '14', title: 'Sony Xperia 1 V - 256GB Black', price: '7,800', location: 'Hay Riad, Rabat', time: '2 hours ago', badge: 'VERIFIED', image: 'https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&w=500' },
  { id: '15', title: 'Asus ROG Phone 8 Pro - 512GB Gaming', price: '12,900', location: 'Souissi, Rabat', time: '3 hours ago', badge: 'DIAMOND MEMBER', image: 'https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg?auto=compress&w=500' },
  { id: '16', title: 'Xiaomi 14 Ultra - 512GB Leica Camera', price: '11,400', location: 'Hassan, Rabat', time: '4 hours ago', badge: 'VERIFIED', image: 'https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&w=500' },
  { id: '17', title: 'OnePlus 12 - 512GB Flowy Emerald', price: '8,500', location: 'Agdal, Rabat', time: '5 hours ago', badge: 'DIAMOND MEMBER', image: 'https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg?auto=compress&w=500' },
  { id: '18', title: 'Surface Laptop 7 - Snapdragon X Elite', price: '18,900', location: 'Hay Riad, Rabat', time: '6 hours ago', badge: 'VERIFIED', image: 'https://images.pexels.com/photos/303383/pexels-photo-303383.jpeg?auto=compress&w=500' },
  { id: '19', title: 'Samsung Galaxy Tab S9 Ultra - 512GB', price: '9,800', location: 'Souissi, Rabat', time: '7 hours ago', badge: 'DIAMOND MEMBER', image: 'https://images.pexels.com/photos/1334598/pexels-photo-1334598.jpeg?auto=compress&w=500' },
  { id: '20', title: 'iPhone 14 Pro - 128GB Space Black', price: '8,200', location: 'Hassan, Rabat', time: '8 hours ago', badge: 'VERIFIED', image: 'https://images.pexels.com/photos/5813851/pexels-photo-5813851.jpeg?auto=compress&w=500' },
]

function DeviceCard({ d }: { d: Device }) {
  const [saved, setSaved] = useState(false)
  const isDiamond = d.badge === 'DIAMOND MEMBER'
  return (
    <article style={{ backgroundColor: 'rgba(244,251,248,0.7)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.4)', boxShadow: '0 8px 32px rgba(0,107,95,0.05)', borderRadius: '1.5rem', overflow: 'hidden', display: 'flex', flexDirection: 'column' as const, transition: 'transform 0.3s' }}
      onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
      onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
    >
      <div style={{ position: 'relative', aspectRatio: '4/5', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '12px', left: '12px', zIndex: 10 }}>
          <span style={{ backgroundColor: isDiamond ? '#2dd4bf' : '#62fae3', color: isDiamond ? 'white' : '#00201c', fontSize: '10px', fontWeight: 700, padding: '4px 10px', borderRadius: '100px', display: 'flex', alignItems: 'center', gap: '4px', boxShadow: '0 1px 3px rgba(0,0,0,0.15)', textTransform: 'uppercase' as const }}>
            {isDiamond ? '◆' : '✓'} {d.badge}
          </span>
        </div>
        <button onClick={() => setSaved(!saved)} style={{ position: 'absolute', top: '12px', right: '12px', zIndex: 10, width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'rgba(244,251,248,0.5)', backdropFilter: 'blur(8px)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: saved ? '#ba1a1a' : '#161d1b' }}>
          <Heart size={20} fill={saved ? '#ba1a1a' : 'none'} />
        </button>
        <img src={d.image} alt={d.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }}
          onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
        />
      </div>
      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column' as const, flex: 1 }}>
        <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#161d1b', lineHeight: 1.3, marginBottom: '8px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' as const, overflow: 'hidden' }}>{d.title}</h3>
        <div style={{ color: '#2dd4bf', fontWeight: 700, fontSize: '20px', marginBottom: '8px' }}>{d.price} DH</div>
        <p style={{ color: '#3c4a46', fontSize: '13px', marginBottom: '16px' }}>{d.location} • {d.time}</p>
        <div style={{ marginTop: 'auto', paddingTop: '16px', borderTop: '1px solid rgba(186,202,197,0.1)', display: 'flex', gap: '8px' }}>
          <button style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '10px', borderRadius: '12px', border: '1px solid #2dd4bf', color: '#2dd4bf', backgroundColor: 'transparent', cursor: 'pointer', fontSize: '13px', fontWeight: 600 }}>
            💬 Message
          </button>
          <button style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '10px', borderRadius: '12px', border: 'none', backgroundColor: '#2dd4bf', color: '#0f9b8e', cursor: 'pointer', fontSize: '13px', fontWeight: 600 }}>
            📞 WhatsApp
          </button>
        </div>
      </div>
    </article>
  )
}

function DeviceGrid({ devices }: { devices: Device[] }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '16px', marginBottom: '64px' }}>
      {devices.map(d => <DeviceCard key={d.id} d={d} />)}
    </div>
  )
}

export default function MobilesTabletsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = React.use(params)
  const [activeBrand, setActiveBrand] = useState('Apple')
  const [activeSeller, setActiveSeller] = useState('All Sellers')
  const [diamondFirst, setDiamondFirst] = useState(true)

  return (
    <div style={{ fontFamily: 'Hanken Grotesk, Inter, sans-serif', backgroundColor: '#f4fbf8', color: '#161d1b', minHeight: '100vh', paddingBottom: '90px' }}>

      {/* ── HEADER ── */}
      <nav style={{ backgroundColor: 'rgba(244,251,248,0.8)', backdropFilter: 'blur(20px)', borderTop: '4px solid rgba(0,107,95,0.1)', position: 'sticky', top: 0, zIndex: 50, boxShadow: '0 1px 2px rgba(0,0,0,0.04)' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '16px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <Link href={`/${locale}`} style={{ textDecoration: 'none' }}>
              <span style={{ fontSize: '22px', fontWeight: 900, color: '#2dd4bf', letterSpacing: '-0.02em' }}>SouKni</span>
            </Link>
            <div style={{ position: 'relative' }}>
              <select style={{ appearance: 'none' as const, backgroundColor: '#eef5f2', border: '1px solid rgba(186,202,197,0.3)', borderRadius: '100px', padding: '6px 28px 6px 16px', fontSize: '13px', fontWeight: 600, color: '#3c4a46', cursor: 'pointer', fontFamily: 'inherit' }}>
                <option>Cities: Rabat</option><option>Casablanca</option><option>Marrakech</option><option>Tangier</option>
              </select>
              <ChevronDown size={16} style={{ position: 'absolute', right: '8px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' as const, color: '#3c4a46' }} />
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <div style={{ display: 'flex', flexDirection: 'column' as const, alignItems: 'center', padding: '0 8px', cursor: 'pointer' }}>
                <span style={{ fontSize: '20px' }}>🌐</span>
                <span style={{ fontSize: '9px', color: 'rgba(60,74,70,0.7)' }}>FR / MAD</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' as const, alignItems: 'center', padding: '0 8px', cursor: 'pointer' }}>
                <Heart size={20} color="#3c4a46" />
                <span style={{ fontSize: '9px', color: 'rgba(60,74,70,0.7)' }}>Favorites</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' as const, alignItems: 'center', padding: '0 8px', cursor: 'pointer', position: 'relative' }}>
                <span style={{ position: 'relative' }}><Bell size={20} color="#3c4a46" /><span style={{ position: 'absolute', top: '-2px', right: '-2px', width: '6px', height: '6px', backgroundColor: '#ba1a1a', borderRadius: '50%', border: '2px solid #f4fbf8' }} /></span>
                <span style={{ fontSize: '9px', color: 'rgba(60,74,70,0.7)' }}>Notifications</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' as const, alignItems: 'center', padding: '0 16px', cursor: 'pointer', borderLeft: '1px solid rgba(186,202,197,0.2)', marginLeft: '8px' }}>
                <User size={20} color="#3c4a46" />
                <span style={{ fontSize: '11px', color: '#3c4a46' }}>Profile</span>
              </div>
              <button style={{ backgroundColor: '#2dd4bf', color: 'white', padding: '10px 24px', borderRadius: '100px', border: 'none', cursor: 'pointer', fontSize: '13px', fontWeight: 700, marginLeft: '8px', textTransform: 'uppercase' as const }}>
                Place your 100% FREE Ad
              </button>
            </div>
          </div>
        </div>
        <div style={{ borderTop: '1px solid rgba(186,202,197,0.2)' }}>
          <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 40px', display: 'flex', alignItems: 'center', gap: '32px', height: '48px' }}>
            {navLinks.map((l, i) => (
              <span key={l} style={{ fontSize: '13px', fontWeight: i === 2 ? 700 : 600, color: i === 2 ? '#2dd4bf' : '#3c4a46', cursor: 'pointer', borderBottom: i === 2 ? '2px solid #2dd4bf' : 'none', height: '100%', display: 'flex', alignItems: 'center', whiteSpace: 'nowrap' as const }}>{l}</span>
            ))}
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section style={{ position: 'relative', width: '100%', height: '500px', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '64px' }}>
        <img src="https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg?auto=compress&w=1600" alt="Tech Background" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.7 }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(244,251,248,0.4), rgba(244,251,248,0.2), #f4fbf8)' }} />
        <div style={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: '1440px', padding: '0 40px', display: 'flex', flexDirection: 'column' as const, alignItems: 'center' }}>
          <h1 style={{ fontSize: '48px', fontWeight: 700, color: '#161d1b', marginBottom: '24px', textAlign: 'center' as const }}>Discover Your Next Mobile Device in Rabat</h1>
          <div style={{ width: '100%', maxWidth: '720px', backgroundColor: 'rgba(244,251,248,0.7)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.4)', borderRadius: '2rem', padding: '8px', display: 'flex', gap: '8px', boxShadow: '0 8px 32px rgba(0,107,95,0.05)' }}>
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', backgroundColor: 'rgba(244,251,248,0.5)', borderRadius: '100px', padding: '0 16px' }}>
              <Search size={20} color="#3c4a46" style={{ marginRight: '12px' }} />
              <input placeholder="Search for iPhone 15 Pro, S24 Ultra..." style={{ border: 'none', outline: 'none', background: 'transparent', width: '100%', padding: '12px 0', fontFamily: 'inherit', fontSize: '15px' }} />
            </div>
            <div style={{ width: '1px', backgroundColor: 'rgba(186,202,197,0.3)' }} />
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', backgroundColor: 'rgba(244,251,248,0.5)', borderRadius: '100px', padding: '0 16px' }}>
              <MapPin size={20} color="#3c4a46" style={{ marginRight: '12px' }} />
              <select style={{ border: 'none', outline: 'none', background: 'transparent', width: '100%', padding: '12px 0', fontFamily: 'inherit', fontSize: '15px', appearance: 'none' as const, cursor: 'pointer' }}>
                <option>All Morocco</option><option>Rabat</option><option>Casablanca</option>
              </select>
              <ChevronDown size={20} color="#3c4a46" />
            </div>
            <button style={{ backgroundColor: '#2dd4bf', color: 'white', borderRadius: '100px', padding: '0 32px', border: 'none', cursor: 'pointer', fontSize: '13px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Search size={20} /> Search
            </button>
          </div>
        </div>
      </section>

      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 40px' }}>
        {/* SECONDARY FILTER BAR */}
        <div style={{ marginTop: '-112px', position: 'relative', zIndex: 20, marginBottom: '32px' }}>
          <div style={{ backgroundColor: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(12px)', border: '1px solid rgba(186,202,197,0.3)', borderRadius: '100px', boxShadow: '0 8px 24px rgba(0,0,0,0.08)', display: 'flex', alignItems: 'center', padding: '6px' }}>
            {[
              { label: 'CITY', value: 'Rabat', icon: ChevronDown },
              { label: 'KEYWORD', value: 'iPhone, Samsung...', isInput: true, flex: 2 },
              { label: 'CONDITION', value: 'Select', icon: ChevronDown },
              { label: 'PRICE (MAD)', value: 'Select', icon: ChevronDown },
              { label: 'FILTERS', value: 'All Filters', last: true },
            ].map((f, i) => (
              <div key={f.label} style={{ flex: f.flex || 1, display: 'flex', alignItems: 'center', padding: '0 16px', borderRight: f.last ? 'none' : '1px solid rgba(186,202,197,0.2)' }}>
                <div style={{ display: 'flex', flexDirection: 'column' as const, width: '100%' }}>
                  <span style={{ fontSize: '10px', fontWeight: 700, color: '#3c4a46', textTransform: 'uppercase' as const, letterSpacing: '0.05em', marginBottom: '2px' }}>{f.label}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    {f.isInput
                      ? <input placeholder={f.value} style={{ border: 'none', outline: 'none', background: 'transparent', width: '100%', fontFamily: 'inherit', fontSize: '15px', fontWeight: 500 }} />
                      : <span style={{ fontSize: '15px', fontWeight: 500, color: f.last ? '#161d1b' : 'rgba(60,74,70,0.7)', flex: 1 }}>{f.value}</span>
                    }
                    {f.icon && <f.icon size={18} color="#3c4a46" />}
                    {f.last && <span style={{ fontSize: '18px', color: '#3c4a46' }}>⚙</span>}
                    {f.isInput && <Search size={18} color="#2dd4bf" />}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* BREADCRUMBS */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: 'rgba(60,74,70,0.7)', marginBottom: '24px' }}>
          <span style={{ cursor: 'pointer' }}>Rabat</span><ChevronRight size={14} />
          <span style={{ cursor: 'pointer' }}>Vault</span><ChevronRight size={14} />
          <span style={{ cursor: 'pointer' }}>Electronics</span><ChevronRight size={14} />
          <span style={{ color: '#3c4a46', fontWeight: 500 }}>Mobiles</span>
        </nav>

        {/* TITLE + BRAND PILLS + STATUS TAGS + SELLER FILTERS */}
        <div style={{ marginBottom: '32px' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap' as const, justifyContent: 'space-between', alignItems: 'flex-end', gap: '16px', marginBottom: '32px' }}>
            <div>
              <h1 style={{ fontSize: '24px', fontWeight: 700, color: '#161d1b' }}>New and Used Mobile Phones in Rabat</h1>
              <p style={{ color: '#3c4a46', marginTop: '4px' }}>5,876 Ads in Rabat</p>
              {/* BRAND PILLS */}
              <div style={{ display: 'flex', gap: '12px', overflowX: 'auto' as const, paddingBottom: '8px', marginTop: '16px' }}>
                {[...brands, 'View More...'].map(b => (
                  <button key={b} onClick={() => setActiveBrand(b)}
                    style={{ whiteSpace: 'nowrap' as const, padding: '10px 24px', borderRadius: '100px', fontSize: '13px', fontWeight: 600, cursor: 'pointer', border: activeBrand === b ? 'none' : '1px solid rgba(186,202,197,0.3)', backgroundColor: activeBrand === b ? '#2dd4bf' : '#e8efec', color: activeBrand === b ? 'white' : '#161d1b', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    {b} {b === 'View More...' && <ChevronDown size={16} />}
                  </button>
                ))}
              </div>
              {/* STATUS TAGS + DIAMOND TOGGLE */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '12px', flexWrap: 'wrap' as const }}>
                <span style={{ color: '#2dd4bf', fontSize: '13px', fontWeight: 600, backgroundColor: 'rgba(45,212,191,0.2)', padding: '4px 12px', borderRadius: '100px' }}>New Arrivals</span>
                <span style={{ color: '#605e58', fontSize: '13px', fontWeight: 600, backgroundColor: 'rgba(230,226,217,0.5)', padding: '4px 12px', borderRadius: '100px' }}>Price Drop Alert</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginLeft: '8px', paddingLeft: '12px', borderLeft: '1px solid rgba(186,202,197,0.2)' }}>
                  <span style={{ fontSize: '13px', fontWeight: 600, color: '#3c4a46' }}>Show Diamond Verified First</span>
                  <button onClick={() => setDiamondFirst(!diamondFirst)} style={{ position: 'relative', width: '36px', height: '20px', borderRadius: '100px', backgroundColor: diamondFirst ? '#2dd4bf' : '#dde4e1', border: 'none', cursor: 'pointer' }}>
                    <div style={{ position: 'absolute', top: '2px', left: diamondFirst ? '18px' : '2px', width: '16px', height: '16px', borderRadius: '50%', backgroundColor: 'white', transition: 'left 0.2s', boxShadow: '0 1px 2px rgba(0,0,0,0.2)' }} />
                  </button>
                </div>
              </div>
              {/* SELLER FILTERS */}
              <div style={{ display: 'flex', gap: '12px', marginTop: '16px', flexWrap: 'wrap' as const }}>
                {[
                  { label: 'All Sellers', icon: Users },
                  { label: 'SouKni Members', icon: User },
                  { label: 'SouKni Pro', icon: ShieldCheck },
                ].map(s => (
                  <button key={s.label} onClick={() => setActiveSeller(s.label)}
                    style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 20px', borderRadius: '100px', fontSize: '13px', fontWeight: 600, cursor: 'pointer', backgroundColor: activeSeller === s.label ? 'rgba(45,212,191,0.3)' : '#e8efec', color: activeSeller === s.label ? '#0f9b8e' : '#3c4a46', border: activeSeller === s.label ? '1px solid rgba(0,107,95,0.2)' : '1px solid rgba(186,202,197,0.3)' }}>
                    <s.icon size={18} /> {s.label}
                  </button>
                ))}
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <button style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', backgroundColor: '#eef5f2', border: '1px solid rgba(186,202,197,0.3)', borderRadius: '12px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>
                <SortAsc size={18} /> Sort: Featured
              </button>
              <button style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', backgroundColor: '#eef5f2', border: '1px solid rgba(186,202,197,0.3)', borderRadius: '12px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>
                <BellRing size={18} /> Save Search
              </button>
            </div>
          </div>
        </div>

        {/* ROW 1: INITIAL GRID */}
        <DeviceGrid devices={row1} />

        {/* FEATURED MOBILES */}
        <section style={{ marginBottom: '64px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 600 }}>Featured Mobiles</h2>
            <a href="#" style={{ color: '#2dd4bf', fontSize: '13px', fontWeight: 600, textDecoration: 'none' }}>View All</a>
          </div>
          <DeviceGrid devices={featuredMobiles} />
        </section>

        {/* INTERSTITIAL BANNERS: Auto Pro + Immo Pro */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '64px' }}>
          <div style={{ height: '192px', borderRadius: '1.5rem', overflow: 'hidden', position: 'relative', cursor: 'pointer' }}>
            <img src="https://images.pexels.com/photos/3954422/pexels-photo-3954422.jpeg?auto=compress&w=800" alt="SouKni Auto Pro" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.7s' }}
              onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
            />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(0,0,0,0.6), transparent)', display: 'flex', flexDirection: 'column' as const, justifyContent: 'center', padding: '32px' }}>
              <h4 style={{ color: 'white', fontSize: '24px', fontWeight: 700, marginBottom: '4px' }}>SouKni Auto Pro</h4>
              <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '13px', marginBottom: '16px' }}>Sell your car 3x faster with our pro suite.</p>
              <button style={{ width: 'fit-content', backgroundColor: 'white', color: '#161d1b', padding: '8px 24px', borderRadius: '100px', border: 'none', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>Learn More</button>
            </div>
          </div>
          <div style={{ height: '192px', borderRadius: '1.5rem', overflow: 'hidden', position: 'relative', cursor: 'pointer' }}>
            <img src="https://images.pexels.com/photos/1370704/pexels-photo-1370704.jpeg?auto=compress&w=800" alt="SouKni Immo Pro" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.7s' }}
              onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
            />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(0,0,0,0.6), transparent)', display: 'flex', flexDirection: 'column' as const, justifyContent: 'center', padding: '32px' }}>
              <h4 style={{ color: 'white', fontSize: '24px', fontWeight: 700, marginBottom: '4px' }}>SouKni Immo Pro</h4>
              <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '13px', marginBottom: '16px' }}>Real Estate tools for the modern agent.</p>
              <button style={{ width: 'fit-content', backgroundColor: 'white', color: '#161d1b', padding: '8px 24px', borderRadius: '100px', border: 'none', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>Get Started</button>
            </div>
          </div>
        </div>

        {/* JOIN THE SOUKNI FAMILY BANNER */}
        <section style={{ marginBottom: '64px' }}>
          <div style={{ background: 'linear-gradient(to right, #2dd4bf, #2dd4bf)', borderRadius: '3rem', padding: '48px', position: 'relative', overflow: 'hidden', display: 'flex', flexWrap: 'wrap' as const, alignItems: 'center', justifyContent: 'space-between', gap: '32px' }}>
            <div style={{ position: 'relative', zIndex: 10, maxWidth: '560px' }}>
              <h2 style={{ color: 'white', fontSize: '40px', fontWeight: 700, marginBottom: '16px' }}>Join the SouKni Family</h2>
              <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '18px', marginBottom: '32px' }}>Download our app to get the best experience, instant notifications, and exclusive local deals right in your pocket.</p>
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' as const }}>
                <button style={{ backgroundColor: 'white', color: '#2dd4bf', padding: '16px 40px', borderRadius: '100px', border: 'none', fontWeight: 700, cursor: 'pointer', boxShadow: '0 8px 16px rgba(0,0,0,0.15)' }}>Get Started Now</button>
                <button style={{ backgroundColor: 'rgba(98,250,227,0.2)', color: 'white', padding: '16px 40px', borderRadius: '100px', border: '1px solid rgba(255,255,255,0.3)', fontWeight: 700, cursor: 'pointer', backdropFilter: 'blur(8px)' }}>View Benefits</button>
              </div>
            </div>
            <div style={{ position: 'relative', zIndex: 10, display: 'none' }}>
              <div style={{ aspectRatio: '1/1', backgroundColor: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '1.5rem', padding: '24px', transform: 'rotate(6deg)', display: 'flex', flexDirection: 'column' as const, alignItems: 'center', justifyContent: 'center', textAlign: 'center' as const, width: '200px' }}>
                <div style={{ fontSize: '48px', marginBottom: '16px' }}>💎</div>
                <div style={{ color: 'white', fontWeight: 700, fontSize: '32px' }}>10X</div>
                <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px', fontWeight: 600 }}>MORE VISIBILITY</div>
              </div>
            </div>
            <div style={{ position: 'absolute', right: '-80px', bottom: '-80px', width: '384px', height: '384px', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '50%', filter: 'blur(60px)' }} />
          </div>
        </section>

        {/* EXPANSION GRID: 12 cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '16px', marginBottom: '40px' }}>
          {expansionGrid.map(d => <DeviceCard key={d.id} d={d} />)}
        </div>

        {/* PAGINATION */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', margin: '40px 0' }}>
          <button style={{ width: '40px', height: '40px', borderRadius: '50%', border: '1px solid rgba(186,202,197,0.3)', backgroundColor: 'transparent', color: '#161d1b', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><ChevronLeft size={20} /></button>
          <button style={{ width: '40px', height: '40px', borderRadius: '50%', border: 'none', backgroundColor: '#2dd4bf', color: '#0f9b8e', fontWeight: 700, fontSize: '13px', cursor: 'pointer' }}>1</button>
          {[2, 3].map(n => (
            <button key={n} style={{ width: '40px', height: '40px', borderRadius: '50%', border: '1px solid rgba(186,202,197,0.3)', backgroundColor: 'transparent', color: '#161d1b', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>{n}</button>
          ))}
          <span style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(60,74,70,0.7)', fontSize: '13px' }}>...</span>
          <button style={{ width: '40px', height: '40px', borderRadius: '50%', border: '1px solid rgba(186,202,197,0.3)', backgroundColor: 'transparent', color: '#161d1b', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>12</button>
          <button style={{ width: '40px', height: '40px', borderRadius: '50%', border: '1px solid rgba(186,202,197,0.3)', backgroundColor: 'transparent', color: '#161d1b', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><ChevronRight size={20} /></button>
        </div>
      </div>

      {/* ── ELECTRO PRO BANNER ── */}
      <section style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 40px', marginBottom: '64px' }}>
        <div style={{ position: 'relative', width: '100%', height: '320px', borderRadius: '3rem', overflow: 'hidden' }}>
          <img src="https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg?auto=compress&w=1200" alt="SouKni Electro Pro" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.7s' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(0,0,0,0.7), rgba(0,0,0,0.4), transparent)' }} />
          <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column' as const, justifyContent: 'center', alignItems: 'flex-start', padding: '0 64px', gap: '8px' }}>
            <div style={{ display: 'flex', flexDirection: 'column' as const }}>
              <h2 style={{ color: 'white', fontSize: '48px', fontWeight: 700, marginBottom: '8px', letterSpacing: '-0.02em' }}>SouKni Electro Pro</h2>
              <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '18px', maxWidth: '560px' }}>The Gold Standard for Premium Electronics &amp; Tech Solutions.</p>
            </div>
            <button style={{ marginTop: '16px', backgroundColor: '#2dd4bf', color: '#0f9b8e', padding: '16px 40px', borderRadius: '100px', border: 'none', fontWeight: 700, fontSize: '13px', cursor: 'pointer', boxShadow: '0 8px 16px rgba(0,0,0,0.2)', textTransform: 'uppercase' as const, letterSpacing: '0.05em' }}>
              Discover Pro Benefits
            </button>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}

      {/* ── MOBILE BOTTOM NAV ── */}
      <nav style={{ position: 'fixed', bottom: 0, left: 0, width: '100%', backgroundColor: 'rgba(244,251,248,0.7)', backdropFilter: 'blur(40px)', borderTop: '1px solid rgba(255,255,255,0.2)', zIndex: 50, display: 'none', alignItems: 'center', justifyContent: 'space-around', padding: '12px 16px', borderRadius: '12px 12px 0 0', boxShadow: '0 -8px 24px rgba(0,0,0,0.05)' }} className="md:hidden">
        <div style={{ display: 'flex', flexDirection: 'column' as const, alignItems: 'center', color: '#3c4a46' }}>
          <Compass size={22} /><span style={{ fontSize: '10px' }}>Discover</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' as const, alignItems: 'center', color: '#2dd4bf', backgroundColor: 'rgba(45,212,191,0.3)', borderRadius: '100px', padding: '4px 16px' }}>
          <Search size={22} /><span style={{ fontSize: '10px' }}>Search</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' as const, alignItems: 'center', color: '#3c4a46' }}>
          <Car size={22} /><span style={{ fontSize: '10px' }}>Motors</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' as const, alignItems: 'center', color: '#3c4a46' }}>
          <Gem size={22} /><span style={{ fontSize: '10px' }}>Vault</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' as const, alignItems: 'center', color: '#3c4a46' }}>
          <User size={22} /><span style={{ fontSize: '10px' }}>Profile</span>
        </div>
      </nav>
    </div>
  )
}
