'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Heart, Search, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Phone, MessageSquare, Star, CheckCircle } from 'lucide-react'

const subNav = ['Motors', 'Property', 'Jobs', 'Classifieds', 'Furniture & Garden', 'Mobiles & Tablets', 'Community']
const makes = [
  { label: 'Mercedes-Benz', count: 3437 },
  { label: 'Toyota', count: 2252 },
  { label: 'BMW', count: 2048 },
  { label: 'Nissan', count: 1707 },
  { label: 'Land Rover', count: 1333 },
]

const cars = [
  {
    id: 'c1', badge: 'CAR OF THE WEEK', badgeColor: '#2dd4bf', title: 'BMW X5 xDrive40i M Sport',
    subtitle: 'BMW X5 40i 2025 GCC specs', price: '319,990', priceColor: '#2dd4bf',
    specs: ['Petrol', '3.0L Engine', 'New', 'Automatic'],
    image: 'https://images.pexels.com/photos/3764984/pexels-photo-3764984.jpeg?auto=compress&w=700',
  },
  {
    id: 'c2', badge: 'PREMIUM', badgeColor: '#ffac5a', title: 'Jetour T2 Luxury',
    subtitle: 'Jetour T2 2025 GCC specs', price: '129,990', priceColor: '#0f172a',
    specs: ['Petrol', '2.0T Engine', 'New', '4WD'],
    image: 'https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg?auto=compress&w=700',
  },
  {
    id: 'c3', badge: null, title: '2024 Audi RS6 Avant',
    subtitle: 'Performance Edition', price: '1,450,000', priceColor: '#2dd4bf',
    specs: ['2024', 'Petrol', '500 KM', 'Auto'],
    image: 'https://images.pexels.com/photos/3764984/pexels-photo-3764984.jpeg?auto=compress&w=700',
  },
  {
    id: 'c4', badge: null, title: 'Range Rover Sport P400',
    subtitle: 'Dynamic SE 2024', price: '1,280,000', priceColor: '#2dd4bf',
    specs: ['2024', 'Hybrid', '1,200 KM', 'Auto'],
    image: 'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&w=700',
  },
  {
    id: 'c5', badge: null, title: 'Porsche 911 Carrera S',
    subtitle: '992 Generation', price: '1,650,000', priceColor: '#2dd4bf',
    specs: ['2023', 'Petrol', '4,500 KM', 'PDK'],
    image: 'https://images.pexels.com/photos/1149831/pexels-photo-1149831.jpeg?auto=compress&w=700',
  },
  {
    id: 'c6', badge: null, title: 'Mercedes-AMG G 63',
    subtitle: 'Magno Edition', price: '2,100,000', priceColor: '#2dd4bf',
    specs: ['2024', 'Petrol', '0 KM', 'Auto'],
    image: 'https://images.pexels.com/photos/1429775/pexels-photo-1429775.jpeg?auto=compress&w=700',
  },
  {
    id: 'c7', badge: null, title: 'Toyota Fortuner EXR',
    subtitle: 'NO CONVENIENCE FEES', price: '73,000', priceColor: '#0f172a',
    specs: ['Diesel', '2.7L Engine', 'Used', '7-Seater'],
    image: 'https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg?auto=compress&w=700',
  },
  {
    id: 'c8', badge: 'PREMIUM', badgeColor: '#ffac5a', badge2: 'NEW', badge2Color: '#2dd4bf',
    title: '2024 Mercedes-Benz G 63 AMG',
    subtitle: 'Magno Edition | 2024 | GCC Specs', price: '3,150,000', priceColor: '#2dd4bf',
    specs: ['2024', 'Petrol', '0 KM', 'Auto'],
    image: 'https://images.pexels.com/photos/3764984/pexels-photo-3764984.jpeg?auto=compress&w=700',
  },
  {
    id: 'c9', badge: 'FIRST OWNER', badgeColor: '#2dd4bf', title: 'Land Rover Defender 110',
    subtitle: 'P400 X-Dynamic HSE', price: '985,000', priceColor: '#2dd4bf',
    specs: ['2023', '12,400 KM', 'Auto', 'Petrol'],
    image: 'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&w=700',
  },
  {
    id: 'c10', badge: 'ORIGINAL PAINT', badgeColor: '#ffac5a', title: 'Tesla Model S Plaid',
    subtitle: 'Tri-Motor AWD 1020hp', price: '1,250,000', priceColor: '#2dd4bf',
    specs: ['2024', '0 KM', 'Auto', '⚡ Electric'],
    image: 'https://images.pexels.com/photos/1429775/pexels-photo-1429775.jpeg?auto=compress&w=700',
  },
  {
    id: 'c11', badge: null, title: 'Porsche Taycan Turbo S',
    subtitle: 'Performance Battery Plus', price: '1,420,000', priceColor: '#2dd4bf',
    specs: ['2022', '18,500 KM', 'Auto', '⚡ Electric'],
    image: 'https://images.pexels.com/photos/1149831/pexels-photo-1149831.jpeg?auto=compress&w=700',
  },
  {
    id: 'c12', badge: 'NEW', badgeColor: '#2dd4bf', title: 'Audi Q8 e-tron 55',
    subtitle: 'S-Line Quattro', price: '1,150,000', priceColor: '#2dd4bf',
    specs: ['2024', '0 KM', 'Auto', '⚡ Electric'],
    image: 'https://images.pexels.com/photos/3764984/pexels-photo-3764984.jpeg?auto=compress&w=700',
  },
]

const testimonials = [
  { name: 'Christophe Farnault', ago: 'Il y a 49 minutes', stars: 5, title: 'Mise en ligne facile et gratuite', text: 'Mise en ligne facile et gratuite, nombreuses vues ayant au final...' },
  { name: 'GIMENEZ Didier', ago: 'Il y a 2 heures', stars: 5, title: 'Site très utile et pratique', text: 'Site très utile et pratique pour vendre sa voiture' },
  { name: 'Jean Michel ODIC', ago: 'Il y a 3 heures', stars: 4, title: "Tout d'abord je vous remercie ...", text: "Tout d'abord je vous remercie pour ce service gratuit. Votre site est trè..." },
  { name: 'J D', ago: 'Il y a 3 heures', stars: 5, title: 'très bon site utilisé depuis plu...', text: 'très bon site utilisé depuis plus de 10 années' },
]

function CarCard({ car }: { car: typeof cars[0] }) {
  const [saved, setSaved] = useState(false)
  const [hovered, setHovered] = useState(false)

  return (
    <article
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: 'rgba(255,255,255,0.75)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: '1px solid rgba(255,255,255,0.45)',
        borderRadius: '40px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: hovered ? '0 24px 48px rgba(107,122,118,0.18)' : '0 4px 16px rgba(107,122,118,0.08)',
        transition: 'box-shadow 0.3s ease, transform 0.3s ease',
        transform: hovered ? 'translateY(-3px)' : 'translateY(0)',
        cursor: 'pointer',
      }}
    >
      {/* Image */}
      <div style={{ position: 'relative', height: '220px', overflow: 'hidden', backgroundColor: '#e8efec' }}>
        <img
          src={car.image}
          alt={car.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.7s ease', transform: hovered ? 'scale(1.06)' : 'scale(1)' }}
        />
        {/* Badges */}
        <div style={{ position: 'absolute', top: '14px', left: '14px', display: 'flex', gap: '6px' }}>
          {car.badge && (
            <span style={{ backgroundColor: car.badgeColor || '#2dd4bf', color: car.badgeColor === '#ffac5a' ? '#2d1600' : 'white', fontSize: '10px', fontWeight: 800, padding: '4px 10px', borderRadius: '100px', letterSpacing: '0.05em', fontFamily: 'Inter, sans-serif', boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}>
              {car.badge}
            </span>
          )}
          {(car as any).badge2 && (
            <span style={{ backgroundColor: (car as any).badge2Color, color: 'white', fontSize: '10px', fontWeight: 800, padding: '4px 10px', borderRadius: '100px', letterSpacing: '0.05em', fontFamily: 'Inter, sans-serif' }}>
              {(car as any).badge2}
            </span>
          )}
        </div>
        {/* Heart */}
        <button
          onClick={e => { e.stopPropagation(); setSaved(!saved) }}
          style={{ position: 'absolute', top: '14px', right: '14px', width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.3)', backdropFilter: 'blur(12px)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.2s' }}
          onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.65)'}
          onMouseLeave={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.3)'}
        >
          <Heart size={18} fill={saved ? '#ef4444' : 'none'} color={saved ? '#ef4444' : '#0f172a'} />
        </button>
      </div>

      {/* Content */}
      <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        {/* Title + Price */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px', gap: '12px' }}>
          <div style={{ flex: 1 }}>
            <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#161d1b', lineHeight: 1.2, marginBottom: '4px', fontFamily: 'Inter, sans-serif', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{car.title}</h3>
            <p style={{ fontSize: '13px', color: '#6b7a76', fontFamily: 'Inter, sans-serif' }}>{car.subtitle}</p>
          </div>
          <div style={{ textAlign: 'right', flexShrink: 0 }}>
            <div style={{ fontSize: '28px', fontWeight: 800, color: car.priceColor, lineHeight: 1, letterSpacing: '-0.02em', fontFamily: 'Inter, sans-serif' }}>{car.price}</div>
            <div style={{ fontSize: '10px', fontWeight: 700, color: '#6b7a76', textTransform: 'uppercase', letterSpacing: '0.1em', fontFamily: 'Inter, sans-serif' }}>MAD</div>
          </div>
        </div>

        {/* Spec tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '20px' }}>
          {car.specs.map(spec => (
            <span key={spec} style={{ padding: '3px 10px', backgroundColor: '#e8efec', color: '#3c4a46', fontSize: '10px', fontWeight: 700, borderRadius: '4px', textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: 'Inter, sans-serif' }}>
              {spec}
            </span>
          ))}
        </div>

        {/* Action buttons */}
        <div style={{ display: 'flex', gap: '8px', marginTop: 'auto' }}>
          {[
            { icon: '📞', label: 'Call', color: '#006b5f' },
            { icon: '💬', label: 'WhatsApp', color: '#25D366' },
            { icon: '✉️', label: 'Message', color: '#605e58' },
          ].map(btn => (
            <button key={btn.label} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px', padding: '9px 4px', borderRadius: '100px', border: '1px solid rgba(186,202,197,0.4)', backgroundColor: '#f4fbf8', fontSize: '11px', fontWeight: 700, color: '#161d1b', cursor: 'pointer', transition: 'background 0.15s', fontFamily: 'Inter, sans-serif' }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = '#dde4e1'}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = '#f4fbf8'}
            >
              <span style={{ fontSize: '14px' }}>{btn.icon}</span>
              {btn.label}
            </button>
          ))}
        </div>
      </div>
    </article>
  )
}

export default function CarsPage() {
  const [activeSubNav, setActiveSubNav] = useState('Motors')
  const [currentPage, setCurrentPage] = useState(1)
  const [searchMake, setSearchMake] = useState('')
  const totalPages = 10

  return (
    <div style={{ fontFamily: 'Inter, system-ui, sans-serif', backgroundColor: '#f4fbf8', minHeight: '100vh' }}>

      {/* ── HEADER ── */}
      <header style={{ position: 'sticky', top: 0, zIndex: 50, backgroundColor: 'white', borderBottom: '1px solid rgba(186,202,197,0.35)' }}>
        {/* Top row */}
        <div style={{ maxWidth: '1600px', margin: '0 auto', padding: '14px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <Link href="/en" style={{ textDecoration: 'none', fontSize: '26px', fontWeight: 800, color: '#006b5f', letterSpacing: '-0.03em', fontFamily: 'Inter, sans-serif' }}>
              SouKni
            </Link>
            <button style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '13px', fontWeight: 600, color: '#3c4a46', border: 'none', backgroundColor: 'transparent', cursor: 'pointer' }}>
              Casablanca ▾
            </button>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '28px' }}>
            {['Auctions', 'Sell', 'Finance'].map(item => (
              <a key={item} href="#" style={{ fontSize: '15px', fontWeight: 600, color: '#3c4a46', textDecoration: 'none', transition: 'color 0.15s' }}
                onMouseEnter={e => e.currentTarget.style.color = '#006b5f'}
                onMouseLeave={e => e.currentTarget.style.color = '#3c4a46'}
              >{item}</a>
            ))}
            <div style={{ position: 'relative' }}>
              <Search size={15} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#6b7a76' }} />
              <input
                type="text"
                placeholder="Search makes, models..."
                style={{ paddingLeft: '36px', paddingRight: '16px', paddingTop: '8px', paddingBottom: '8px', borderRadius: '100px', backgroundColor: '#eef5f2', border: '1px solid rgba(186,202,197,0.35)', fontSize: '13px', color: '#161d1b', outline: 'none', width: '220px', fontFamily: 'Inter, sans-serif' }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {['🔔', '♡'].map((icon, i) => (
              <button key={i} style={{ padding: '8px', border: 'none', backgroundColor: 'transparent', cursor: 'pointer', fontSize: '18px', transition: 'opacity 0.15s' }}>
                {icon}
              </button>
            ))}
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', overflow: 'hidden', border: '1px solid rgba(186,202,197,0.35)', backgroundColor: '#e8efec' }}>
              <img src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&w=100" alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <button style={{ backgroundColor: '#006b5f', color: 'white', border: 'none', padding: '9px 20px', borderRadius: '100px', fontSize: '12px', fontWeight: 800, cursor: 'pointer', letterSpacing: '0.05em', fontFamily: 'Inter, sans-serif' }}>
              100% FREE ADS
            </button>
          </div>
        </div>

        {/* Sub nav */}
        <div style={{ borderTop: '1px solid rgba(186,202,197,0.25)', backgroundColor: 'white' }}>
          <div style={{ maxWidth: '1600px', margin: '0 auto', padding: '0 40px', display: 'flex', gap: '32px', overflowX: 'auto' }}>
            {subNav.map(item => (
              <button key={item} onClick={() => setActiveSubNav(item)} style={{ padding: '10px 0', fontSize: '13px', fontWeight: 600, border: 'none', backgroundColor: 'transparent', cursor: 'pointer', whiteSpace: 'nowrap', color: activeSubNav === item ? '#161d1b' : '#6b7a76', borderBottom: activeSubNav === item ? '2px solid #2dd4bf' : '2px solid transparent', transition: 'all 0.15s', fontFamily: 'Inter, sans-serif' }}>
                {item}
              </button>
            ))}
          </div>
        </div>
      </header>

      <div style={{ maxWidth: '1600px', margin: '0 auto', padding: '32px 40px', display: 'flex', flexDirection: 'column', gap: '24px' }}>

        {/* Breadcrumbs */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#6b7a76', fontFamily: 'Inter, sans-serif' }}>
          {['Home', 'Motors', 'Cars & 4x4'].map((crumb, i, arr) => (
            <span key={crumb} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <a href="#" style={{ color: i === arr.length - 1 ? '#161d1b' : '#6b7a76', textDecoration: 'none', fontWeight: i === arr.length - 1 ? 600 : 400 }}>{crumb}</a>
              {i < arr.length - 1 && <span>›</span>}
            </span>
          ))}
        </div>

        {/* Page header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h1 style={{ fontSize: '44px', fontWeight: 800, color: '#161d1b', marginBottom: '10px', letterSpacing: '-0.02em', fontFamily: 'Inter, sans-serif' }}>Cars for Sale</h1>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', backgroundColor: 'rgba(45,212,191,0.12)', color: '#006b5f', padding: '4px 12px', borderRadius: '100px', fontSize: '11px', fontWeight: 800, marginBottom: '8px', fontFamily: 'Inter, sans-serif' }}>
              ✓ 100% FREE ADS
            </div>
            <p style={{ fontSize: '16px', color: '#6b7a76', fontFamily: 'Inter, sans-serif' }}>19,875 Ads available in Morocco</p>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            {[
              { icon: '⇅', label: 'Sort: Default' },
              { icon: '♡', label: 'Save Search', primary: true },
            ].map(btn => (
              <button key={btn.label} style={{
                display: 'flex', alignItems: 'center', gap: '6px',
                padding: '9px 18px', borderRadius: '100px',
                background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(16px)',
                border: '1px solid rgba(255,255,255,0.45)',
                fontSize: '13px', fontWeight: 600,
                color: btn.primary ? '#006b5f' : '#161d1b',
                cursor: 'pointer', fontFamily: 'Inter, sans-serif',
                boxShadow: '0 4px 16px rgba(107,122,118,0.08)',
              }}>
                {btn.icon} {btn.label}
              </button>
            ))}
          </div>
        </div>

        {/* Filter bar */}
        <div style={{ backgroundColor: 'white', border: '1px solid rgba(186,202,197,0.35)', borderRadius: '12px', boxShadow: '0 2px 12px rgba(107,122,118,0.06)', display: 'flex', flexWrap: 'nowrap', overflow: 'hidden', divideX: 'true' }}>
          {[
            { label: 'City', value: 'Casablanca', hasValue: true },
            { label: 'Make And Model', value: '', placeholder: 'Search Make, Model, or Trim', isInput: true },
            { label: 'Price Range', value: '', placeholder: 'Select' },
            { label: 'Year', value: '', placeholder: 'Select' },
            { label: 'Kilometers', value: '', placeholder: 'Select' },
            { label: 'Filters', value: '', placeholder: 'Regional Specs, Keyword...' },
          ].map((field, i) => (
            <div key={field.label} style={{ flex: field.isInput ? 2 : 1, minWidth: field.isInput ? '180px' : '100px', padding: '10px 16px', borderRight: i < 5 ? '1px solid rgba(186,202,197,0.35)' : 'none', cursor: 'pointer', transition: 'background 0.15s' }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = '#eef5f2'}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              <label style={{ display: 'block', fontSize: '9px', fontWeight: 800, color: '#605e58', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '2px', fontFamily: 'Inter, sans-serif' }}>{field.label}</label>
              {field.isInput ? (
                <input type="text" placeholder={field.placeholder} style={{ width: '100%', border: 'none', backgroundColor: 'transparent', fontSize: '13px', fontWeight: 500, color: '#161d1b', outline: 'none', padding: 0, fontFamily: 'Inter, sans-serif' }} />
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '13px', fontWeight: field.hasValue ? 600 : 400, color: field.hasValue ? '#161d1b' : 'rgba(107,122,118,0.7)', fontFamily: 'Inter, sans-serif' }}>
                    {field.hasValue ? field.value : field.placeholder}
                  </span>
                  <span style={{ fontSize: '14px', color: '#605e58' }}>▾</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Make pills */}
        <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '4px' }}>
          {makes.map(make => (
            <button key={make.label} style={{ whiteSpace: 'nowrap', padding: '8px 16px', borderRadius: '100px', border: '1px solid rgba(186,202,197,0.35)', backgroundColor: '#f4fbf8', fontSize: '13px', fontWeight: 600, color: '#161d1b', cursor: 'pointer', transition: 'background 0.15s', fontFamily: 'Inter, sans-serif' }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = '#dde4e1'}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = '#f4fbf8'}
            >
              {make.label} <span style={{ color: '#6b7a76', fontWeight: 400 }}>({make.count.toLocaleString()})</span>
            </button>
          ))}
          <button style={{ whiteSpace: 'nowrap', padding: '8px 16px', borderRadius: '100px', border: '1px solid rgba(186,202,197,0.35)', backgroundColor: '#f4fbf8', fontSize: '13px', fontWeight: 600, color: '#2dd4bf', cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>
            View More
          </button>
        </div>

        {/* ── BENTO GRID ── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }}>

          {/* First 2 cards */}
          {cars.slice(0, 2).map(car => <CarCard key={car.id} car={car} />)}

          {/* SouKni Immo Pro Banner — full width */}
          <div style={{ gridColumn: '1 / -1', borderRadius: '40px', overflow: 'hidden', height: '360px', position: 'relative', cursor: 'pointer' }}>
            <img src="https://images.pexels.com/photos/2581922/pexels-photo-2581922.jpeg?auto=compress&w=1400" alt="SouKni Immo Pro" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.7s', }} />
            <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.42)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '32px' }}>
              <h2 style={{ fontSize: '44px', fontWeight: 800, color: 'white', marginBottom: '10px', letterSpacing: '-0.02em', fontFamily: 'Inter, sans-serif' }}>SouKni Immo Pro</h2>
              <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.88)', marginBottom: '28px', fontFamily: 'Inter, sans-serif' }}>Discover the Soul of Moroccan Living — Our Riad Collection</p>
              <a href="/en/real-estate" style={{ display: 'inline-block', padding: '14px 32px', borderRadius: '100px', background: 'rgba(255,255,255,0.18)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.35)', color: 'white', fontWeight: 700, fontSize: '14px', textDecoration: 'none', transition: 'background 0.2s', fontFamily: 'Inter, sans-serif' }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.28)'}
                onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.18)'}
              >
                Explore Now
              </a>
            </div>
          </div>

          {/* Next 4 cards */}
          {cars.slice(2, 6).map(car => <CarCard key={car.id} car={car} />)}

          {/* Insurance Banner — full width */}
          <div style={{ gridColumn: '1 / -1', borderRadius: '40px', overflow: 'hidden', cursor: 'pointer', position: 'relative' }}>
            <div style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #0f4c3a 100%)', padding: '40px 48px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderRadius: '40px' }}>
              <div>
                <div style={{ fontSize: '11px', fontWeight: 800, color: '#2dd4bf', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '8px', fontFamily: 'Inter, sans-serif' }}>Partenaire Officiel</div>
                <h3 style={{ fontSize: '32px', fontWeight: 800, color: 'white', marginBottom: '6px', letterSpacing: '-0.02em', fontFamily: 'Inter, sans-serif' }}>Votre tarif en 3 minutes</h3>
                <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.65)', fontFamily: 'Inter, sans-serif' }}>Assurance auto dès 199 MAD/mois</p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '42px', fontWeight: 900, color: '#2dd4bf', fontFamily: 'Inter, sans-serif' }}>199</div>
                  <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', fontFamily: 'Inter, sans-serif' }}>MAD/mois</div>
                </div>
                <button style={{ backgroundColor: '#2dd4bf', color: 'white', border: 'none', padding: '14px 28px', borderRadius: '14px', fontSize: '14px', fontWeight: 800, cursor: 'pointer', fontFamily: 'Inter, sans-serif', letterSpacing: '0.05em' }}>
                  Obtenir un devis →
                </button>
              </div>
            </div>
          </div>

          {/* Last 6 cards */}
          {cars.slice(6, 12).map(car => <CarCard key={car.id} car={car} />)}

        </div>

        {/* ── PAGINATION ── */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', margin: '16px 0' }}>
          <div style={{ display: 'flex', gap: '6px', marginRight: '24px' }}>
            {[ChevronsLeft, ChevronLeft].map((Icon, i) => (
              <button key={i} style={{ width: '40px', height: '40px', borderRadius: '8px', border: '1px solid rgba(186,202,197,0.35)', backgroundColor: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'background 0.15s' }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = '#dde4e1'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                <Icon size={16} color="#6b7a76" />
              </button>
            ))}
          </div>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <button key={page} onClick={() => setCurrentPage(page)} style={{
              width: '40px', height: '40px', borderRadius: '8px',
              border: page === currentPage ? 'none' : '1px solid rgba(186,202,197,0.35)',
              backgroundColor: page === currentPage ? '#2b3230' : 'transparent',
              color: page === currentPage ? 'white' : '#6b7a76',
              fontSize: '14px', fontWeight: page === currentPage ? 700 : 400,
              cursor: 'pointer', transition: 'all 0.15s', fontFamily: 'Inter, sans-serif',
            }}
            onMouseEnter={e => { if (page !== currentPage) e.currentTarget.style.backgroundColor = '#dde4e1' }}
            onMouseLeave={e => { if (page !== currentPage) e.currentTarget.style.backgroundColor = 'transparent' }}
            >{page}</button>
          ))}

          <div style={{ display: 'flex', gap: '6px', marginLeft: '24px' }}>
            {[ChevronRight, ChevronsRight].map((Icon, i) => (
              <button key={i} style={{ width: '40px', height: '40px', borderRadius: '8px', border: '1px solid rgba(186,202,197,0.35)', backgroundColor: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'background 0.15s' }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = '#dde4e1'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                <Icon size={16} color="#6b7a76" />
              </button>
            ))}
          </div>
        </div>

        {/* ── TRUSTPILOT / TESTIMONIALS ── */}
        <section style={{ backgroundColor: 'white', borderRadius: '40px', padding: '48px 40px', margin: '8px 0' }}>
          <h2 style={{ fontSize: '40px', fontWeight: 800, color: '#161d1b', textAlign: 'center', marginBottom: '40px', letterSpacing: '-0.02em', fontFamily: 'Inter, sans-serif' }}>
            Ils nous ont fait confiance
          </h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button style={{ width: '40px', height: '40px', borderRadius: '50%', border: '1px solid rgba(186,202,197,0.35)', backgroundColor: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }}>
              <ChevronLeft size={16} color="#6b7a76" />
            </button>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', flex: 1 }}>
              {testimonials.map((t, i) => (
                <div key={i} style={{ backgroundColor: '#eef5f2', padding: '20px', borderRadius: '12px', border: '1px solid rgba(186,202,197,0.25)', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', gap: '2px' }}>
                      {[1,2,3,4,5].map(s => (
                        <Star key={s} size={14} fill={s <= t.stars ? '#2dd4bf' : 'none'} color="#2dd4bf" />
                      ))}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', fontWeight: 600, color: '#6b7a76', fontFamily: 'Inter, sans-serif' }}>
                      <CheckCircle size={12} color="#6b7a76" /> Vérifié
                    </div>
                  </div>
                  <h4 style={{ fontWeight: 700, color: '#161d1b', fontSize: '13px', fontFamily: 'Inter, sans-serif' }}>{t.title}</h4>
                  <p style={{ fontSize: '12px', color: '#6b7a76', lineHeight: 1.6, fontFamily: 'Inter, sans-serif' }}>{t.text}</p>
                  <div style={{ marginTop: 'auto', paddingTop: '12px', borderTop: '1px solid rgba(186,202,197,0.2)' }}>
                    <p style={{ fontSize: '11px', fontWeight: 700, color: '#605e58', fontFamily: 'Inter, sans-serif' }}>
                      {t.name}, <span style={{ fontWeight: 400, opacity: 0.7 }}>{t.ago}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <button style={{ width: '40px', height: '40px', borderRadius: '50%', border: '1px solid rgba(186,202,197,0.35)', backgroundColor: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }}>
              <ChevronRight size={16} color="#6b7a76" />
            </button>
          </div>

          {/* Trustpilot footer */}
          <div style={{ marginTop: '32px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <p style={{ fontSize: '13px', color: '#6b7a76', fontFamily: 'Inter, sans-serif' }}>
              Une note de <strong style={{ color: '#161d1b' }}>4.4</strong> sur 5 sur la base de{' '}
              <a href="#" style={{ color: '#161d1b', fontWeight: 700, textDecoration: 'underline' }}>19 827 avis</a>.
              Nos avis 4 et 5 étoiles.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#2dd4bf', fontWeight: 700, fontSize: '14px', fontFamily: 'Inter, sans-serif' }}>
              <Star size={16} fill="#2dd4bf" color="#2dd4bf" /> Trustpilot
            </div>
          </div>
        </section>

      </div>

      {/* ── FOOTER ── */}
      <footer style={{ backgroundColor: '#7A7A7A', color: 'white', padding: '64px 40px 24px' }}>
        <div style={{ maxWidth: '1600px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1fr', gap: '48px', marginBottom: '48px' }}>
            <div>
              <div style={{ fontSize: '26px', fontWeight: 900, color: 'white', marginBottom: '8px', letterSpacing: '-0.02em', fontFamily: 'Inter, sans-serif' }}>SouKni</div>
              <p style={{ fontSize: '14px', fontStyle: 'italic', color: 'rgba(255,255,255,0.8)', marginBottom: '12px', fontFamily: 'Inter, sans-serif' }}>"The Market in your Pocket"</p>
              <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.7, marginBottom: '20px', fontFamily: 'Inter, sans-serif' }}>Morocco's premium marketplace for real estate, motors, electronics and more.</p>
              <div style={{ display: 'flex', gap: '10px' }}>
                {['🌐', '📤'].map((icon, i) => (
                  <a key={i} href="#" style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', textDecoration: 'none', transition: 'background 0.2s' }}
                    onMouseEnter={e => e.currentTarget.style.backgroundColor = '#2dd4bf'}
                    onMouseLeave={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'}
                  >{icon}</a>
                ))}
              </div>
            </div>
            {[
              { title: 'Marketplace', links: ['Real Estate', 'Motors', 'Jobs', 'Services', 'Classifieds'] },
              { title: 'Company', links: ['About Us', 'Careers', 'Legal', 'Privacy Policy', 'Terms of Service'] },
            ].map(col => (
              <div key={col.title}>
                <h4 style={{ fontWeight: 700, fontSize: '16px', color: 'white', marginBottom: '20px', fontFamily: 'Inter, sans-serif' }}>{col.title}</h4>
                {col.links.map(link => (
                  <a key={link} href="#" style={{ display: 'block', fontSize: '14px', color: 'rgba(255,255,255,0.65)', textDecoration: 'none', marginBottom: '14px', fontFamily: 'Inter, sans-serif', transition: 'color 0.15s' }}
                    onMouseEnter={e => e.currentTarget.style.color = 'white'}
                    onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.65)'}
                  >{link}</a>
                ))}
              </div>
            ))}
            <div>
              <h4 style={{ fontWeight: 700, fontSize: '16px', color: 'white', marginBottom: '20px', fontFamily: 'Inter, sans-serif' }}>Experience</h4>
              {[
                { icon: '📱', sub: 'Download on the', title: 'App Store' },
                { icon: '▶', sub: 'Get it on', title: 'Google Play' },
              ].map(app => (
                <a key={app.title} href="#" style={{ display: 'flex', alignItems: 'center', gap: '12px', backgroundColor: 'rgba(0,0,0,0.2)', padding: '12px 16px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', textDecoration: 'none', marginBottom: '10px', transition: 'background 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.4)'}
                  onMouseLeave={e => e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.2)'}
                >
                  <span style={{ fontSize: '24px' }}>{app.icon}</span>
                  <div>
                    <p style={{ fontSize: '9px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', letterSpacing: '0.1em', fontFamily: 'Inter, sans-serif' }}>{app.sub}</p>
                    <p style={{ fontSize: '13px', fontWeight: 700, color: 'white', fontFamily: 'Inter, sans-serif' }}>{app.title}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
            <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.45)', fontFamily: 'Inter, sans-serif' }}>© 2026 SouKni Motors Marketplace. All rights reserved.</p>
            <div style={{ display: 'flex', gap: '20px' }}>
              {['Help Center', 'Contact Us'].map(link => (
                <a key={link} href="#" style={{ fontSize: '12px', color: 'rgba(255,255,255,0.45)', textDecoration: 'none', fontFamily: 'Inter, sans-serif', transition: 'color 0.15s' }}
                  onMouseEnter={e => e.currentTarget.style.color = 'white'}
                  onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.45)'}
                >{link}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
