'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Heart, MapPin, ChevronLeft, ChevronRight, ShieldCheck, MessageSquare, Phone } from 'lucide-react'

const subNav = ['Motors', 'Property', 'Jobs', 'Services', 'Fashion', 'Mobiles & Tablets', 'The Vault']

const categoryChips = [
  { label: 'Car/4x4 Parts', count: 354, active: true },
  { label: 'Apparel, Merchandise & Accessories', count: 28 },
  { label: 'Motorcycle Parts', count: 14 },
  { label: 'Trucks & Vans Parts', count: 4 },
  { label: 'Automotive Tools', count: 3 },
]

const products = [
  { id: 'p1', title: 'Heavy Duty Roof Rack', category: 'Car/4x4 Accessories', price: 1000, usage: 'Light Usage', condition: 'Excellent', location: 'Casablanca', ago: '2 hours ago', verified: true, featured: true, image: 'https://images.pexels.com/photos/3764984/pexels-photo-3764984.jpeg?auto=compress&w=600' },
  { id: 'p2', title: 'New 24" Forged Wheels', category: 'Wheels/Tires', price: 45000, usage: 'Brand New', condition: 'Perfect', location: 'Rabat', ago: '5 hours ago', verified: true, featured: true, image: 'https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg?auto=compress&w=600' },
  { id: 'p3', title: 'Performance Exhaust System', category: 'Engine Components', price: 8500, usage: 'Used', condition: 'Good', location: 'Marrakech', ago: '1 day ago', verified: false, featured: false, image: 'https://images.pexels.com/photos/1149831/pexels-photo-1149831.jpeg?auto=compress&w=600' },
  { id: 'p4', title: 'Android 13 Multimedia Player', category: 'Electronics', price: 2500, usage: 'Brand New', condition: 'Perfect', location: 'Casablanca', ago: '2 hours ago', verified: true, featured: false, image: 'https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg?auto=compress&w=600' },
  { id: 'p5', title: 'LED Headlight Kit Ultra-Bright', category: 'Lighting', price: 450, usage: 'Brand New', condition: 'Perfect', location: 'Rabat', ago: '5 hours ago', verified: true, featured: false, image: 'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&w=600' },
  { id: 'p6', title: 'Luxury Leather Seat Covers', category: 'Interior Accessories', price: 1200, usage: 'Brand New', condition: 'Perfect', location: 'Marrakech', ago: '1 day ago', verified: true, featured: false, image: 'https://images.pexels.com/photos/1429775/pexels-photo-1429775.jpeg?auto=compress&w=600' },
  { id: 'p7', title: 'Portable Digital Air Compressor', category: 'Tools', price: 350, usage: 'Brand New', condition: 'Perfect', location: 'Tangier', ago: '2 days ago', verified: true, featured: false, image: 'https://images.pexels.com/photos/3764984/pexels-photo-3764984.jpeg?auto=compress&w=600' },
  { id: 'p8', title: '4K Ultra HD Dash Cam', category: 'Electronics', price: 850, usage: 'Brand New', condition: 'Perfect', location: 'Casablanca', ago: '3 hours ago', verified: true, featured: false, image: 'https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg?auto=compress&w=600' },
  { id: 'p9', title: 'Aerodynamic Roof Box 450L', category: 'Accessories', price: 3200, usage: 'Brand New', condition: 'Perfect', location: 'Rabat', ago: '1 day ago', verified: true, featured: false, image: 'https://images.pexels.com/photos/1149831/pexels-photo-1149831.jpeg?auto=compress&w=600' },
  { id: 'p10', title: 'Custom Fit 5D Floor Mats', category: 'Interior Accessories', price: 600, usage: 'Brand New', condition: 'Perfect', location: 'Marrakech', ago: '2 days ago', verified: true, featured: false, image: 'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&w=600' },
  { id: 'p11', title: 'Real-time GPS Tracking Device', category: 'Security', price: 750, usage: 'Brand New', condition: 'Perfect', location: 'Casablanca', ago: '4 hours ago', verified: true, featured: false, image: 'https://images.pexels.com/photos/1429775/pexels-photo-1429775.jpeg?auto=compress&w=600' },
  { id: 'p12', title: 'High-Capacity Car Battery', category: 'Engine Components', price: 1400, usage: 'Brand New', condition: 'Perfect', location: 'Tangier', ago: '1 day ago', verified: true, featured: false, image: 'https://images.pexels.com/photos/3764984/pexels-photo-3764984.jpeg?auto=compress&w=600' },
  { id: 'p13', title: 'Aqua-Shield Premium Car Cover', category: 'Exterior Accessories', price: 850, usage: 'Brand New', condition: 'Perfect', location: 'Casablanca', ago: 'Just now', verified: true, featured: false, image: 'https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg?auto=compress&w=600' },
  { id: 'p14', title: 'Pro-Scan OBD2 Diagnostic Tool', category: 'Automotive Tools', price: 1200, usage: 'Brand New', condition: 'Perfect', location: 'Rabat', ago: 'Just now', verified: true, featured: false, image: 'https://images.pexels.com/photos/1149831/pexels-photo-1149831.jpeg?auto=compress&w=600' },
  { id: 'p15', title: 'Lumina Luxury Interior Fragrance', category: 'Interior Accessories', price: 250, usage: 'Brand New', condition: 'Perfect', location: 'Marrakech', ago: 'Just now', verified: true, featured: false, image: 'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&w=600' },
  { id: 'p16', title: 'Velo-Aero Premium Bike Rack', category: 'Car/4x4 Accessories', price: 3500, usage: 'Brand New', condition: 'Perfect', location: 'Casablanca', ago: 'Just now', verified: true, featured: false, image: 'https://images.pexels.com/photos/1429775/pexels-photo-1429775.jpeg?auto=compress&w=600' },
  { id: 'p17', title: 'Aero-Flex Pro Silicone Wipers', category: 'Exterior Accessories', price: 180, usage: 'Brand New', condition: 'Perfect', location: 'Tangier', ago: 'Just now', verified: true, featured: false, image: 'https://images.pexels.com/photos/3764984/pexels-photo-3764984.jpeg?auto=compress&w=600' },
  { id: 'p18', title: 'Auto-Clean Cordless Car Vacuum', category: 'Interior Accessories', price: 450, usage: 'Brand New', condition: 'Perfect', location: 'Casablanca', ago: 'Just now', verified: true, featured: false, image: 'https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg?auto=compress&w=600' },
  { id: 'p19', title: 'Voltrex Performance Brake Pads', category: 'Engine Components', price: 1100, usage: 'Brand New', condition: 'Perfect', location: 'Rabat', ago: 'Just now', verified: true, featured: false, image: 'https://images.pexels.com/photos/1149831/pexels-photo-1149831.jpeg?auto=compress&w=600' },
  { id: 'p20', title: 'Torque Master Pro Floor Jack', category: 'Automotive Tools', price: 1800, usage: 'Brand New', condition: 'Perfect', location: 'Casablanca', ago: 'Just now', verified: true, featured: false, image: 'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&w=600' },
  { id: 'p21', title: 'Spark-Go Portable Jump Starter', category: 'Engine Components', price: 950, usage: 'Brand New', condition: 'Perfect', location: 'Tangier', ago: 'Just now', verified: true, featured: false, image: 'https://images.pexels.com/photos/1429775/pexels-photo-1429775.jpeg?auto=compress&w=600' },
]

function AccessoryCard({ product }: { product: typeof products[0] }) {
  const [saved, setSaved] = useState(false)
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: 'rgba(255,255,255,0.72)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: '1px solid rgba(255,255,255,0.45)',
        borderRadius: '24px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: hovered ? '0 16px 48px rgba(0,0,0,0.1)' : '0 12px 40px rgba(0,0,0,0.06)',
        transition: 'all 0.3s ease',
        transform: hovered ? 'translateY(-3px)' : 'translateY(0)',
        cursor: 'pointer',
      }}
    >
      {/* Image */}
      <div style={{ position: 'relative', aspectRatio: '4/3', overflow: 'hidden', backgroundColor: '#e8efec' }}>
        <img
          src={product.image}
          alt={product.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s', transform: hovered ? 'scale(1.06)' : 'scale(1)' }}
        />

        {/* Verified badge */}
        {product.verified && (
          <div style={{ position: 'absolute', top: '12px', left: '12px', backgroundColor: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(8px)', padding: '3px 10px', borderRadius: '100px', display: 'flex', alignItems: 'center', gap: '4px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
            <ShieldCheck size={12} color="#006b5f" fill="rgba(0,107,95,0.1)" />
            <span style={{ fontSize: '10px', fontWeight: 700, color: '#006b5f', textTransform: 'uppercase', letterSpacing: '0.05em', fontFamily: 'Inter, sans-serif' }}>Verified</span>
          </div>
        )}

        {/* Heart */}
        <button
          onClick={e => { e.stopPropagation(); setSaved(!saved) }}
          style={{ position: 'absolute', top: '10px', right: '10px', width: '36px', height: '36px', borderRadius: '50%', backgroundColor: 'rgba(0,0,0,0.2)', backdropFilter: 'blur(12px)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.2s' }}
          onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.4)'}
          onMouseLeave={e => e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.2)'}
        >
          <Heart size={15} fill={saved ? '#ef4444' : 'none'} color="white" />
        </button>

        {/* Dots */}
        <div style={{ position: 'absolute', bottom: '10px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '4px' }}>
          {[0, 1, 2].map(i => (
            <div key={i} style={{ width: i === 0 ? '8px' : '7px', height: i === 0 ? '8px' : '7px', borderRadius: '50%', backgroundColor: i === 0 ? 'white' : 'rgba(255,255,255,0.45)' }} />
          ))}
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px', flex: 1 }}>
        {/* Title + Featured */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px' }}>
          <div>
            <h3 style={{ fontSize: '17px', fontWeight: 600, color: '#161d1b', lineHeight: 1.25, marginBottom: '3px', fontFamily: 'Inter, sans-serif' }}>{product.title}</h3>
            <p style={{ fontSize: '12px', color: '#6b7a76', fontFamily: 'Inter, sans-serif' }}>{product.category}</p>
          </div>
          {product.featured && (
            <span style={{ backgroundColor: 'rgba(255,172,90,0.2)', color: '#8d4f00', fontSize: '9px', fontWeight: 700, padding: '3px 8px', borderRadius: '4px', textTransform: 'uppercase', letterSpacing: '0.08em', flexShrink: 0, fontFamily: 'Inter, sans-serif' }}>
              Featured
            </span>
          )}
        </div>

        {/* Price */}
        <div style={{ fontSize: '20px', fontWeight: 800, color: '#161d1b', fontFamily: 'Inter, sans-serif' }}>
          {product.price.toLocaleString()} <span style={{ fontSize: '13px', fontWeight: 400, color: '#6b7a76' }}>MAD</span>
        </div>

        {/* Spec tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          {[
            { label: 'Usage', value: product.usage },
            { label: 'Condition', value: product.condition },
          ].map(spec => (
            <div key={spec.label} style={{ backgroundColor: '#e8efec', padding: '4px 10px', borderRadius: '6px' }}>
              <span style={{ display: 'block', fontSize: '9px', color: '#6b7a76', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1px', fontFamily: 'Inter, sans-serif' }}>{spec.label}</span>
              <span style={{ fontSize: '12px', fontWeight: 600, color: '#161d1b', fontFamily: 'Inter, sans-serif' }}>{spec.value}</span>
            </div>
          ))}
        </div>

        {/* Location */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#6b7a76', paddingTop: '10px', borderTop: '1px solid rgba(186,202,197,0.2)', marginTop: 'auto' }}>
          <MapPin size={14} color="#6b7a76" />
          <span style={{ fontSize: '12px', fontFamily: 'Inter, sans-serif' }}>{product.location} • {product.ago}</span>
        </div>

        {/* Action buttons */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '4px' }}>
          <button style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', padding: '10px', borderRadius: '100px', backgroundColor: 'rgba(45,212,191,0.15)', color: '#006b5f', border: 'none', cursor: 'pointer', fontSize: '12px', fontWeight: 700, fontFamily: 'Inter, sans-serif', transition: 'background 0.15s' }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(45,212,191,0.28)'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = 'rgba(45,212,191,0.15)'}
          >
            <MessageSquare size={14} /> Chat
          </button>
          <button style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', padding: '10px', borderRadius: '100px', backgroundColor: '#e8efec', color: '#161d1b', border: 'none', cursor: 'pointer', fontSize: '12px', fontWeight: 700, fontFamily: 'Inter, sans-serif', transition: 'background 0.15s' }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#dde4e1'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = '#e8efec'}
          >
            <Phone size={14} /> Call
          </button>
        </div>
      </div>
    </div>
  )
}

function ImmoBanner() {
  return (
    <div style={{ width: '100%', borderRadius: '24px', overflow: 'hidden', position: 'relative', boxShadow: '0 8px 32px rgba(0,0,0,0.12)', cursor: 'pointer' }}>
      <img src="https://images.pexels.com/photos/2581922/pexels-photo-2581922.jpeg?auto=compress&w=1400" alt="SouKni Immo Pro" style={{ width: '100%', height: '260px', objectFit: 'cover', transition: 'transform 0.7s' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.42) 50%, transparent 100%)', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '40px 48px' }}>
        <h2 style={{ fontSize: '36px', fontWeight: 800, color: 'white', marginBottom: '8px', letterSpacing: '-0.02em', fontFamily: 'Inter, sans-serif' }}>SouKni Immo Pro</h2>
        <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.88)', maxWidth: '420px', marginBottom: '20px', lineHeight: 1.6, fontFamily: 'Inter, sans-serif' }}>Discover exclusive luxury properties and riads across Morocco with our premium real estate service.</p>
        <button style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: 'white', color: '#161d1b', border: 'none', padding: '12px 24px', borderRadius: '100px', fontSize: '13px', fontWeight: 700, cursor: 'pointer', width: 'fit-content', fontFamily: 'Inter, sans-serif' }}>
          Explore Properties →
        </button>
      </div>
    </div>
  )
}

function AutoPartsBanner() {
  return (
    <div style={{ width: '100%', borderRadius: '24px', overflow: 'hidden', position: 'relative', boxShadow: '0 8px 32px rgba(0,0,0,0.12)', cursor: 'pointer' }}>
      <img src="https://images.pexels.com/photos/3764984/pexels-photo-3764984.jpeg?auto=compress&w=1400" alt="Auto Parts Pro" style={{ width: '100%', height: '340px', objectFit: 'cover', transition: 'transform 0.7s' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.42) 50%, transparent 100%)', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '40px 56px' }}>
        <span style={{ fontSize: '11px', fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#2dd4bf', marginBottom: '10px', fontFamily: 'Inter, sans-serif' }}>SouKni Auto Parts Pro</span>
        <h2 style={{ fontSize: '40px', fontWeight: 800, color: 'white', marginBottom: '10px', letterSpacing: '-0.02em', maxWidth: '540px', fontFamily: 'Inter, sans-serif' }}>Precision Engineering, Premium Quality</h2>
        <p style={{ fontSize: '17px', color: 'rgba(255,255,255,0.88)', maxWidth: '480px', marginBottom: '24px', lineHeight: 1.6, fontFamily: 'Inter, sans-serif' }}>Unlock the full potential of your vehicle with Morocco's most exclusive selection of high-performance parts.</p>
        <button style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: '#2dd4bf', color: '#0f172a', border: 'none', padding: '14px 28px', borderRadius: '100px', fontSize: '13px', fontWeight: 700, cursor: 'pointer', width: 'fit-content', fontFamily: 'Inter, sans-serif' }}>
          Explore Pro Parts →
        </button>
      </div>
    </div>
  )
}

export default function AccessoriesPage() {
  const [activeSubNav, setActiveSubNav] = useState('Motors')
  const [currentPage, setCurrentPage] = useState(1)

  const row1 = products.slice(0, 3)
  const row2 = products.slice(3, 12)
  const row3 = products.slice(12, 21)

  return (
    <div style={{ fontFamily: 'Inter, system-ui, sans-serif', backgroundColor: '#f4fbf8', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

      {/* ── HEADER ── */}
      <header style={{ position: 'sticky', top: 0, zIndex: 50, backgroundColor: 'rgba(244,251,248,0.85)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.45)', boxShadow: '0 1px 12px rgba(0,0,0,0.04)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1440px', margin: '0 auto', width: '100%', padding: '14px 40px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <Link href="/en" style={{ textDecoration: 'none', fontSize: '28px', fontWeight: 800, color: '#006b5f', letterSpacing: '-0.03em', fontFamily: 'Inter, sans-serif' }}>SouKni</Link>
          <nav style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            {['Real Estate', 'Services', 'Mobiles', 'Jobs', 'Cars & Motorcycles'].map(item => (
              <a key={item} href="#" style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '0.04em', color: '#6b7a76', textDecoration: 'none', transition: 'color 0.15s', fontFamily: 'Inter, sans-serif' }}
                onMouseEnter={e => e.currentTarget.style.color = '#006b5f'}
                onMouseLeave={e => e.currentTarget.style.color = '#6b7a76'}
              >{item}</a>
            ))}
          </nav>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {['🔔', '♡'].map((icon, i) => (
            <button key={i} style={{ fontSize: '18px', border: 'none', backgroundColor: 'transparent', cursor: 'pointer', color: '#6b7a76', padding: '6px' }}>{icon}</button>
          ))}
          <div style={{ width: '32px', height: '32px', borderRadius: '50%', overflow: 'hidden', border: '1px solid rgba(186,202,197,0.4)', backgroundColor: '#e8efec' }}>
            <img src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&w=100" alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <a href="#" style={{ display: 'flex', alignItems: 'center', backgroundColor: '#006b5f', color: 'white', textDecoration: 'none', padding: '9px 20px', borderRadius: '100px', fontSize: '12px', fontWeight: 700, letterSpacing: '0.04em', fontFamily: 'Inter, sans-serif', transition: 'opacity 0.15s' }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.88'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
          >List Your Car</a>
        </div>
      </header>

      {/* Sub Nav */}
      <div style={{ backgroundColor: '#f4fbf8', borderBottom: '1px solid rgba(186,202,197,0.22)', position: 'sticky', top: '65px', zIndex: 40 }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 40px' }}>
          <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '32px', overflowX: 'auto', paddingTop: '12px', paddingBottom: '12px' }}>
            {subNav.map(item => (
              <button key={item} onClick={() => setActiveSubNav(item)} style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.04em', color: activeSubNav === item ? '#006b5f' : '#6b7a76', border: 'none', backgroundColor: 'transparent', cursor: 'pointer', whiteSpace: 'nowrap', transition: 'color 0.15s', fontFamily: 'Inter, sans-serif' }}
                onMouseEnter={e => e.currentTarget.style.color = '#006b5f'}
                onMouseLeave={e => { if (activeSubNav !== item) e.currentTarget.style.color = '#6b7a76' }}
              >{item}</button>
            ))}
          </nav>
        </div>
      </div>

      <main style={{ flex: 1, maxWidth: '1440px', margin: '0 auto', padding: '32px 40px 80px', width: '100%', display: 'flex', flexDirection: 'column', gap: '32px' }}>

        {/* Breadcrumbs + Header */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <nav style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#6b7a76', fontFamily: 'Inter, sans-serif' }}>
            {['Home', 'Motors', 'Auto Accessories & Parts'].map((crumb, i, arr) => (
              <span key={crumb} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <a href="#" style={{ color: i === arr.length - 1 ? '#161d1b' : '#6b7a76', textDecoration: 'none', fontWeight: i === arr.length - 1 ? 600 : 400 }}>{crumb}</a>
                {i < arr.length - 1 && <span>›</span>}
              </span>
            ))}
          </nav>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px' }}>
            <h1 style={{ fontSize: '22px', fontWeight: 700, color: '#161d1b', fontFamily: 'Inter, sans-serif', letterSpacing: '-0.01em' }}>Auto Accessories & Parts for sale in Morocco</h1>
            <span style={{ fontSize: '15px', color: '#6b7a76', fontFamily: 'Inter, sans-serif' }}>• 405 Ads</span>
          </div>
        </div>

        {/* Filter bar */}
        <div style={{ position: 'sticky', top: '113px', zIndex: 30, background: 'rgba(255,255,255,0.75)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.45)', borderRadius: '100px', padding: '6px 6px 6px 8px', display: 'flex', alignItems: 'center', gap: '4px', boxShadow: '0 8px 32px rgba(0,0,0,0.04)' }}>
          <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '4px' }}>
            {[
              { label: 'City', value: 'Select City' },
              { label: 'Category', value: 'Search' },
              { label: 'Price (MAD)', value: 'Select' },
              { label: 'Condition', value: 'Select' },
              { label: 'Usage', value: 'Select' },
            ].map((field, i) => (
              <button key={field.label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 16px', borderRadius: '100px', backgroundColor: '#f4fbf8', border: '1px solid rgba(186,202,197,0.35)', cursor: 'pointer', textAlign: 'left', transition: 'background 0.15s' }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = '#e8efec'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = '#f4fbf8'}
              >
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontSize: '9px', fontWeight: 700, color: '#6b7a76', textTransform: 'uppercase', letterSpacing: '0.1em', fontFamily: 'Inter, sans-serif' }}>{field.label}</span>
                  <span style={{ fontSize: '13px', fontWeight: 400, color: '#161d1b', fontFamily: 'Inter, sans-serif' }}>{field.value}</span>
                </div>
                <span style={{ color: '#6b7a76', fontSize: '16px' }}>▾</span>
              </button>
            ))}
          </div>
          <button style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', borderRadius: '100px', backgroundColor: '#f4fbf8', border: '1px solid rgba(186,202,197,0.35)', cursor: 'pointer', flexShrink: 0, transition: 'background 0.15s' }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#e8efec'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = '#f4fbf8'}
          >
            <span style={{ fontSize: '16px' }}>⚙️</span>
            <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
              <span style={{ fontSize: '9px', fontWeight: 700, color: '#6b7a76', textTransform: 'uppercase', letterSpacing: '0.1em', fontFamily: 'Inter, sans-serif' }}>Filters</span>
              <span style={{ fontSize: '13px', color: '#161d1b', fontFamily: 'Inter, sans-serif' }}>1 selected</span>
            </div>
          </button>
        </div>

        {/* Category chips */}
        <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '4px' }}>
          {categoryChips.map(chip => (
            <button key={chip.label} style={{
              whiteSpace: 'nowrap', padding: '8px 16px', borderRadius: '100px',
              border: chip.active ? '1px solid rgba(45,212,191,0.3)' : '1px solid #bacac5',
              backgroundColor: chip.active ? 'rgba(45,212,191,0.12)' : '#f4fbf8',
              color: chip.active ? '#006b5f' : '#6b7a76',
              fontSize: '12px', fontWeight: 700, cursor: 'pointer',
              transition: 'all 0.15s', fontFamily: 'Inter, sans-serif',
            }}>
              {chip.label} ({chip.count})
            </button>
          ))}
        </div>

        {/* ── MAIN GRID + BANNERS ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>

          {/* Row 1 — 3 cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
            {row1.map(p => <AccessoryCard key={p.id} product={p} />)}
          </div>

          {/* Immo Pro Banner */}
          <ImmoBanner />

          {/* Row 2 — 9 cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
            {row2.map(p => <AccessoryCard key={p.id} product={p} />)}
          </div>

          {/* Auto Parts Pro Banner */}
          <AutoPartsBanner />

          {/* Row 3 — 9 cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
            {row3.map(p => <AccessoryCard key={p.id} product={p} />)}
          </div>

          {/* Pagination */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}>
            <button style={{ width: '40px', height: '40px', borderRadius: '50%', border: '1px solid #bacac5', backgroundColor: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              <ChevronLeft size={16} color="#6b7a76" />
            </button>
            {[1, 2, 3, '...'].map((p, i) => (
              <button key={i} onClick={() => typeof p === 'number' && setCurrentPage(p)} style={{
                width: '40px', height: '40px', borderRadius: '50%',
                border: p === currentPage ? 'none' : '1px solid #bacac5',
                backgroundColor: p === currentPage ? '#006b5f' : 'transparent',
                color: p === currentPage ? 'white' : '#6b7a76',
                fontSize: '13px', fontWeight: p === currentPage ? 800 : 400,
                cursor: p === '...' ? 'default' : 'pointer',
                fontFamily: 'Inter, sans-serif', transition: 'all 0.15s',
              }}
              onMouseEnter={e => { if (p !== currentPage && p !== '...') e.currentTarget.style.backgroundColor = 'rgba(45,212,191,0.15)' }}
              onMouseLeave={e => { if (p !== currentPage) e.currentTarget.style.backgroundColor = 'transparent' }}
              >{p}</button>
            ))}
            <button style={{ width: '40px', height: '40px', borderRadius: '50%', border: '1px solid #bacac5', backgroundColor: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              <ChevronRight size={16} color="#6b7a76" />
            </button>
          </div>
        </div>

      </main>

      {/* ── DIAMOND SELLER BANNER ── */}
      <section style={{ background: 'linear-gradient(135deg, #1a252b 0%, #0f172a 100%)', padding: '64px 40px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.08, backgroundImage: 'radial-gradient(circle, white 0%, transparent 20%)' }} />
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '680px', margin: '0 auto' }}>
          <div style={{ fontSize: '52px', marginBottom: '16px', display: 'flex', justifyContent: 'center' }}>
            <span style={{ filter: 'drop-shadow(0 0 20px rgba(45,212,191,0.5))' }}>💎</span>
          </div>
          <h2 style={{ fontSize: '44px', fontWeight: 800, color: 'white', marginBottom: '14px', letterSpacing: '-0.02em', fontFamily: 'Inter, sans-serif' }}>Become a Diamond Seller</h2>
          <p style={{ fontSize: '17px', color: 'rgba(255,255,255,0.75)', lineHeight: 1.7, marginBottom: '32px', fontFamily: 'Inter, sans-serif' }}>
            Get a Verified Account, priority listing placement, and dedicated support to boost your sales by up to 3x.
          </p>
          <button style={{ backgroundColor: '#2dd4bf', color: '#0f172a', border: 'none', padding: '16px 40px', borderRadius: '100px', fontSize: '16px', fontWeight: 800, cursor: 'pointer', boxShadow: '0 8px 32px rgba(45,212,191,0.3)', transition: 'all 0.2s', fontFamily: 'Inter, sans-serif' }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.05)'; e.currentTarget.style.opacity = '0.92' }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.opacity = '1' }}
          >
            Get Verified Now
          </button>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ backgroundColor: '#7A7A7A', color: 'white', padding: '64px 40px 24px' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1fr', gap: '48px', marginBottom: '48px' }}>
            <div>
              <div style={{ fontSize: '26px', fontWeight: 900, color: 'white', marginBottom: '6px', fontFamily: 'Inter, sans-serif' }}>SouKni</div>
              <p style={{ fontSize: '16px', fontStyle: 'italic', color: 'rgba(255,255,255,0.8)', marginBottom: '12px', fontFamily: 'Inter, sans-serif' }}>"The Market in your Pocket"</p>
              <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.65)', lineHeight: 1.7, marginBottom: '20px', maxWidth: '280px', fontFamily: 'Inter, sans-serif' }}>Morocco's premium marketplace for real estate, motors, electronics and more.</p>
              <div style={{ display: 'flex', gap: '10px' }}>
                {['🌐', '📤'].map((icon, i) => (
                  <a key={i} href="#" style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', textDecoration: 'none' }}>
                    {icon}
                  </a>
                ))}
              </div>
            </div>
            {[
              { title: 'Marketplace', links: ['Real Estate', 'Motors', 'Jobs', 'Services', 'The Vault'] },
              { title: 'Company', links: ['About Us', 'Careers', 'Legal', 'Privacy Policy', 'Terms of Service'] },
            ].map(col => (
              <div key={col.title}>
                <h4 style={{ fontWeight: 700, fontSize: '18px', marginBottom: '20px', fontFamily: 'Inter, sans-serif' }}>{col.title}</h4>
                {col.links.map(link => (
                  <a key={link} href="#" style={{ display: 'block', fontSize: '14px', color: 'rgba(255,255,255,0.65)', textDecoration: 'none', marginBottom: '12px', fontFamily: 'Inter, sans-serif', transition: 'color 0.15s' }}
                    onMouseEnter={e => e.currentTarget.style.color = 'white'}
                    onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.65)'}
                  >{link}</a>
                ))}
              </div>
            ))}
            <div>
              <h4 style={{ fontWeight: 700, fontSize: '18px', marginBottom: '20px', fontFamily: 'Inter, sans-serif' }}>Download SouKni App</h4>
              {[{ icon: '📱', sub: 'Download on the', title: 'App Store' }, { icon: '▶', sub: 'Get it on', title: 'Google Play' }].map(app => (
                <a key={app.title} href="#" style={{ display: 'flex', alignItems: 'center', gap: '12px', backgroundColor: 'rgba(0,0,0,0.2)', padding: '12px 16px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.12)', textDecoration: 'none', marginBottom: '10px' }}>
                  <span style={{ fontSize: '24px' }}>{app.icon}</span>
                  <div>
                    <p style={{ fontSize: '9px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', letterSpacing: '0.1em', fontFamily: 'Inter, sans-serif' }}>{app.sub}</p>
                    <p style={{ fontSize: '14px', fontWeight: 700, color: 'white', fontFamily: 'Inter, sans-serif' }}>{app.title}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
            <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', fontFamily: 'Inter, sans-serif' }}>© 2026 SouKni. All rights reserved.</p>
            <div style={{ display: 'flex', gap: '20px' }}>
              {['Help Center', 'Contact Us'].map(link => (
                <a key={link} href="#" style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', textDecoration: 'none', fontFamily: 'Inter, sans-serif' }}>{link}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
