'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { MapPin, Search, Heart, MessageCircle, Diamond } from 'lucide-react'
import { useMarket } from '@/context/MarketContext'

const subCategories = ['All Trucks & Vans', 'Pickup Trucks', 'Cargo Vans', 'Box Trucks', 'Minibus', 'Refrigerated']
const sellerFilters = ['All Sellers', 'SouKni Members', 'SouKni Pro']

const listings = [
  { title: 'Toyota Hilux Double Cab', price: 385000, location: 'Casablanca', time: '1 hour ago', badge: 'diamond', year: '2023', km: '18,000 km', image: 'https://images.pexels.com/photos/2536639/pexels-photo-2536639.jpeg?auto=compress&w=600' },
  { title: 'Ford Transit Custom', price: 295000, location: 'Rabat', time: '2 hours ago', badge: 'verified', year: '2022', km: '34,500 km', image: 'https://images.pexels.com/photos/2199293/pexels-photo-2199293.jpeg?auto=compress&w=600' },
  { title: 'Mercedes Sprinter Cargo', price: 420000, location: 'Tangier', time: '3 hours ago', badge: 'diamond', year: '2024', km: '8,000 km', image: 'https://images.pexels.com/photos/2199293/pexels-photo-2199293.jpeg?auto=compress&w=600' },
  { title: 'Renault Master Refrigerated', price: 350000, location: 'Casablanca', time: 'Just now', badge: 'verified', year: '2023', km: '15,200 km', image: 'https://images.pexels.com/photos/2199293/pexels-photo-2199293.jpeg?auto=compress&w=600' },
  { title: 'Isuzu D-Max Pickup', price: 310000, location: 'Marrakech', time: '5 hours ago', badge: 'verified', year: '2022', km: '28,000 km', image: 'https://images.pexels.com/photos/2536639/pexels-photo-2536639.jpeg?auto=compress&w=600' },
  { title: 'Hyundai H350 Box Truck', price: 275000, location: 'Fès', time: '1 day ago', badge: 'diamond', year: '2023', km: '12,000 km', image: 'https://images.pexels.com/photos/2199293/pexels-photo-2199293.jpeg?auto=compress&w=600' },
  { title: 'Peugeot Boxer Minibus', price: 240000, location: 'Agadir', time: '1 day ago', badge: 'verified', year: '2022', km: '41,000 km', image: 'https://images.pexels.com/photos/2199293/pexels-photo-2199293.jpeg?auto=compress&w=600' },
  { title: 'Nissan Navara Double Cab', price: 365000, location: 'Rabat', time: '2 days ago', badge: 'diamond', year: '2023', km: '9,500 km', image: 'https://images.pexels.com/photos/2536639/pexels-photo-2536639.jpeg?auto=compress&w=600' },
]

function TruckCard({ item }: { item: typeof listings[0] }) {
  const [saved, setSaved] = useState(false)
  const [hovered, setHovered] = useState(false)
  const { formatPrice } = useMarket()
  return (
    <article onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{ backgroundColor: 'white', borderRadius: '40px', overflow: 'hidden', border: '1px solid #f1f5f9', boxShadow: hovered ? '0 20px 40px rgba(0,0,0,0.1)' : '0 2px 8px rgba(0,0,0,0.04)', transition: 'all 0.3s' }}>
      <div style={{ position: 'relative', aspectRatio: '4/3', overflow: 'hidden' }}>
        <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s', transform: hovered ? 'scale(1.08)' : 'scale(1)' }} />
        {item.badge === 'diamond' && (
          <span style={{ position: 'absolute', top: '14px', left: '14px', background: 'linear-gradient(135deg, #2dd4bf, #0f9b8e)', color: 'white', fontSize: '9px', fontWeight: 800, padding: '4px 12px', borderRadius: '100px', textTransform: 'uppercase', letterSpacing: '0.07em', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Diamond size={10} /> Diamond
          </span>
        )}
        {item.badge === 'verified' && (
          <span style={{ position: 'absolute', top: '14px', left: '14px', backgroundColor: 'rgba(255,255,255,0.92)', color: '#2dd4bf', fontSize: '9px', fontWeight: 800, padding: '4px 12px', borderRadius: '100px', textTransform: 'uppercase', letterSpacing: '0.07em' }}>Verified</span>
        )}
        <button onClick={() => setSaved(!saved)} style={{ position: 'absolute', top: '14px', right: '14px', width: '34px', height: '34px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
          <Heart size={15} color={saved ? '#ef4444' : 'white'} fill={saved ? '#ef4444' : 'none'} />
        </button>
      </div>
      <div style={{ padding: '20px' }}>
        <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#161d1b', marginBottom: '8px', lineHeight: 1.3 }}>{item.title}</h3>
        <div style={{ display: 'flex', gap: '16px', padding: '12px 0', borderTop: '1px solid #f1f5f9', borderBottom: '1px solid #f1f5f9', marginBottom: '14px' }}>
          <div>
            <p style={{ fontSize: '9px', textTransform: 'uppercase', color: '#94a3b8', marginBottom: '2px' }}>Year</p>
            <p style={{ fontSize: '13px', fontWeight: 700, color: '#161d1b' }}>{item.year}</p>
          </div>
          <div>
            <p style={{ fontSize: '9px', textTransform: 'uppercase', color: '#94a3b8', marginBottom: '2px' }}>Mileage</p>
            <p style={{ fontSize: '13px', fontWeight: 700, color: '#161d1b' }}>{item.km}</p>
          </div>
        </div>
        <div style={{ fontSize: '19px', fontWeight: 800, color: '#2dd4bf', marginBottom: '12px' }}>{formatPrice(item.price)}</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#6b7a76', fontSize: '11px', marginBottom: '14px' }}>
          <MapPin size={11} /> {item.location} • {item.time}
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button style={{ flex: 1, backgroundColor: '#eef5f2', color: '#3c4a46', border: 'none', padding: '10px', borderRadius: '100px', fontWeight: 700, fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
            <MessageCircle size={14} /> Chat
          </button>
          <button style={{ flex: 1, backgroundColor: '#25D366', color: 'white', border: 'none', padding: '10px', borderRadius: '100px', fontWeight: 700, fontSize: '13px', cursor: 'pointer' }}>WhatsApp</button>
        </div>
      </div>
    </article>
  )
}

export default function TrucksVansPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = React.use(params)
  const [activePill, setActivePill] = useState('All Trucks & Vans')
  const [activeSeller, setActiveSeller] = useState('All Sellers')
  const [diamondFirst, setDiamondFirst] = useState(false)

  return (
    <div style={{ fontFamily: 'Inter, system-ui, sans-serif', backgroundColor: '#f4fbf8', minHeight: '100vh' }}>

      {/* HERO */}
      <section style={{ position: 'relative', height: '380px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        <img src="https://images.pexels.com/photos/2199293/pexels-photo-2199293.jpeg?auto=compress&w=1600" alt="Trucks & Vans"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(15,23,42,0.85), rgba(0,0,0,0.3))' }} />
        <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', padding: '0 20px', maxWidth: '700px', width: '100%' }}>
          <h1 style={{ fontSize: '44px', fontWeight: 900, color: 'white', letterSpacing: '-0.03em', marginBottom: '10px', lineHeight: 1.1 }}>Trucks &amp; Vans in Morocco</h1>
          <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.8)', marginBottom: '28px' }}>195 verified listings across Morocco</p>
          <div style={{ display: 'flex', gap: '8px', backgroundColor: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.25)', borderRadius: '100px', padding: '8px 8px 8px 24px', maxWidth: '560px', margin: '0 auto' }}>
            <Search size={18} color="rgba(255,255,255,0.7)" style={{ flexShrink: 0, alignSelf: 'center' }} />
            <input type="text" placeholder="Search make, model..."
              style={{ flex: 1, backgroundColor: 'transparent', border: 'none', outline: 'none', fontSize: '15px', color: 'white', fontFamily: 'Inter, sans-serif', padding: '6px 8px' }} />
            <button style={{ backgroundColor: '#2dd4bf', color: 'white', border: 'none', padding: '12px 24px', borderRadius: '100px', fontWeight: 700, fontSize: '13px', cursor: 'pointer', whiteSpace: 'nowrap' }}>Search</button>
          </div>
        </div>
      </section>

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '48px 24px 80px' }}>

        {/* BREADCRUMB */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#64748b', marginBottom: '24px' }}>
          <Link href={`/${locale}`} style={{ color: '#2dd4bf', textDecoration: 'none', fontWeight: 600 }}>Home</Link>
          <span>›</span>
          <Link href={`/${locale}/motors`} style={{ color: '#2dd4bf', textDecoration: 'none', fontWeight: 600 }}>Motors</Link>
          <span>›</span>
          <span style={{ color: '#0f172a', fontWeight: 700 }}>Trucks &amp; Vans</span>
        </nav>

        {/* FILTER BAR */}
        <div style={{ backgroundColor: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.6)', borderRadius: '20px', padding: '8px', boxShadow: '0 4px 24px rgba(0,0,0,0.06)', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)' }}>
            {[{ label: 'City', val: 'All Morocco' }, { label: 'Keyword', val: 'Search make, model...' }, { label: 'Price (MAD)', val: 'Select range' }, { label: 'Year', val: 'Any Year' }, { label: 'Filters', val: '1 selected' }].map((f, i) => (
              <div key={f.label} style={{ padding: '10px 16px', borderRight: i < 4 ? '1px solid #f1f5f9' : 'none', display: 'flex', flexDirection: 'column', cursor: 'pointer' }}>
                <span style={{ fontSize: '9px', textTransform: 'uppercase', fontWeight: 700, color: '#64748b', letterSpacing: '0.1em', marginBottom: '3px' }}>{f.label}</span>
                <span style={{ fontSize: '13px', fontWeight: 500, color: '#0f172a' }}>{f.val}</span>
              </div>
            ))}
          </div>
          <button style={{ backgroundColor: '#2dd4bf', color: 'white', border: 'none', padding: '14px 20px', borderRadius: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700, fontSize: '13px', flexShrink: 0 }}>
            <Search size={18} /> Search
          </button>
        </div>

        {/* TITLE + SORT */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
          <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#0f172a' }}>
            Trucks &amp; Vans for sale in Morocco <span style={{ color: '#64748b', fontWeight: 400, fontSize: '16px' }}>195 Ads</span>
          </h2>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button style={{ border: '1px solid #e2e8f0', backgroundColor: 'white', padding: '8px 16px', borderRadius: '100px', fontSize: '13px', fontWeight: 500, color: '#64748b', cursor: 'pointer' }}>Sort: Default</button>
            <button style={{ border: '1px solid #e2e8f0', backgroundColor: 'white', padding: '8px 16px', borderRadius: '100px', fontSize: '13px', fontWeight: 500, color: '#64748b', cursor: 'pointer' }}>Save Search</button>
          </div>
        </div>

        {/* SELLER FILTERS */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '16px' }}>
          {sellerFilters.map(filter => (
            <button key={filter} onClick={() => setActiveSeller(filter)}
              style={{ padding: '9px 22px', borderRadius: '10px', border: activeSeller === filter ? 'none' : '1px solid #e2e8f0', backgroundColor: activeSeller === filter ? '#2dd4bf' : 'white', color: activeSeller === filter ? 'white' : '#3c4a46', fontSize: '13px', fontWeight: 600, cursor: 'pointer', transition: 'all 0.15s' }}>
              {filter}
            </button>
          ))}
        </div>

        {/* CATEGORY PILLS + DIAMOND TOGGLE */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '40px', flexWrap: 'wrap', gap: '16px' }}>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {subCategories.map(pill => (
              <button key={pill} onClick={() => setActivePill(pill)}
                style={{ padding: '8px 20px', borderRadius: '100px', border: 'none', cursor: 'pointer', fontSize: '13px', fontWeight: 600, backgroundColor: activePill === pill ? '#0f172a' : '#e8efec', color: activePill === pill ? 'white' : '#161d1b', transition: 'all 0.15s', whiteSpace: 'nowrap' }}>
                {pill}
              </button>
            ))}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a', whiteSpace: 'nowrap' }}>Show Diamond Verified First</span>
            <div onClick={() => setDiamondFirst(!diamondFirst)}
              style={{ width: '44px', height: '24px', borderRadius: '100px', backgroundColor: diamondFirst ? '#2dd4bf' : '#e2e8f0', cursor: 'pointer', position: 'relative', transition: 'background 0.2s', flexShrink: 0 }}>
              <div style={{ position: 'absolute', top: '2px', left: diamondFirst ? '22px' : '2px', width: '20px', height: '20px', borderRadius: '50%', backgroundColor: 'white', transition: 'left 0.2s', boxShadow: '0 1px 4px rgba(0,0,0,0.2)' }} />
            </div>
          </div>
        </div>

        {/* GRID */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '56px' }}>
          {listings.map((item, i) => <TruckCard key={i} item={item} />)}
        </div>

        {/* DIAMOND BANNER */}
        <section style={{ borderRadius: '40px', background: 'linear-gradient(135deg, #2dd4bf, #0f9b8e)', padding: '56px 48px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '40px', flexWrap: 'wrap' }}>
          <div style={{ maxWidth: '480px' }}>
            <span style={{ fontSize: '11px', fontWeight: 800, color: 'white', textTransform: 'uppercase', letterSpacing: '0.15em', opacity: 0.85, display: 'block', marginBottom: '10px' }}>Exclusive Status</span>
            <h2 style={{ fontSize: '32px', fontWeight: 800, color: 'white', marginBottom: '14px', letterSpacing: '-0.02em', lineHeight: 1.2 }}>Become a SouKni Diamond Member</h2>
            <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '16px', marginBottom: '24px', lineHeight: 1.6 }}>Get priority placement and a verified badge on every commercial vehicle you list.</p>
            <button style={{ backgroundColor: 'white', color: '#2dd4bf', border: 'none', padding: '14px 32px', borderRadius: '100px', fontWeight: 800, fontSize: '14px', cursor: 'pointer' }}>Get Verified Now</button>
          </div>
        </section>

      </div>
    </div>
  )
}
