'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Heart, Search, ChevronDown, MapPin, Globe, DollarSign, Bell, User, ArrowUpDown, Bookmark, Users, UserCircle, Building2 } from 'lucide-react'

const categoryPills = [
  { label: 'Guitars', count: 733 },
  { label: 'Pianos, Keyboards & Organs', count: 635 },
  { label: 'DJ & Recording Equipment', count: 385 },
  { label: 'Percussion', count: 163 },
  { label: 'String Instruments', count: 75 },
  { label: 'Other', count: 54 },
]

const sellerFilters = [
  { label: 'All Sellers', icon: Users },
  { label: 'Individuals', icon: UserCircle },
  { label: 'Businesses', icon: Building2 },
]

type Listing = {
  id: string; title: string; price: string; location: string; time: string
  image: string; badges: ('DIAMOND MEMBER' | 'VERIFIED')[]; tag?: 'NEW' | 'USED'; dots?: number
}

const featuredInstruments: Listing[] = [
  { id: '1', title: "Gibson Les Paul Standard '60s", price: '24,500 MAD', location: 'Agdal, Rabat', time: '2 hours ago', image: 'https://images.pexels.com/photos/1407322/pexels-photo-1407322.jpeg?auto=compress&w=600', badges: ['DIAMOND MEMBER'], tag: 'NEW' },
  { id: '2', title: 'Yamaha C3 Grand Piano', price: '85,000 MAD', location: 'Souissi, Rabat', time: 'Yesterday', image: 'https://images.pexels.com/photos/164821/pexels-photo-164821.jpeg?auto=compress&w=600', badges: ['VERIFIED'], tag: 'USED' },
  { id: '3', title: 'Pioneer XDJ-XZ Controller', price: '18,200 MAD', location: 'Hassan, Rabat', time: '5 hours ago', image: 'https://images.pexels.com/photos/1389429/pexels-photo-1389429.jpeg?auto=compress&w=600', badges: [], tag: 'NEW' },
  { id: '4', title: 'Pro Traditional Moroccan Oud', price: '4,500 MAD', location: 'Medina, Rabat', time: '3 days ago', image: 'https://images.pexels.com/photos/164745/pexels-photo-164745.jpeg?auto=compress&w=600', badges: [], tag: 'NEW' },
]

const traditionalInstruments: Listing[] = [
  { id: '5', title: 'Premium Moroccan Oud - Master Artisan Edition', price: '12,500 MAD', location: 'Fes Medina', time: 'Just now', image: 'https://images.pexels.com/photos/164745/pexels-photo-164745.jpeg?auto=compress&w=600', badges: ['DIAMOND MEMBER', 'VERIFIED'], dots: 3 },
  { id: '6', title: 'Traditional Gimbri - Hand-Carved Camel Skin', price: '4,200 MAD', location: 'Essaouira', time: '4 hours ago', image: 'https://images.pexels.com/photos/4087993/pexels-photo-4087993.jpeg?auto=compress&w=600', badges: ['DIAMOND MEMBER', 'VERIFIED'], dots: 2 },
  { id: '7', title: 'Professional Moroccan Bendir - Henna Pattern', price: '1,800 MAD', location: 'Marrakech', time: 'Yesterday', image: 'https://images.pexels.com/photos/4087994/pexels-photo-4087994.jpeg?auto=compress&w=600', badges: ['DIAMOND MEMBER', 'VERIFIED'], dots: 1 },
  { id: '8', title: 'High-Fidelity Qanun - Mother of Pearl Inlay', price: '18,500 MAD', location: 'Casablanca', time: '2 days ago', image: 'https://images.pexels.com/photos/4087992/pexels-photo-4087992.jpeg?auto=compress&w=600', badges: ['DIAMOND MEMBER', 'VERIFIED'], dots: 4 },
]

const professionalGear: Listing[] = [
  { id: '9', title: 'Fender American Professional II Stratocaster', price: '18,500 MAD', location: 'Rabat', time: 'Just now', image: 'https://images.pexels.com/photos/1407322/pexels-photo-1407322.jpeg?auto=compress&w=600', badges: ['VERIFIED'], dots: 2 },
  { id: '10', title: 'Roland V-Drums TD-27KV2 Electronic Kit', price: '32,000 MAD', location: 'Casablanca', time: '3 hours ago', image: 'https://images.pexels.com/photos/1571360/pexels-photo-1571360.jpeg?auto=compress&w=600', badges: ['VERIFIED'], dots: 2 },
  { id: '11', title: 'Focusrite Scarlett 18i20 Audio Interface', price: '4,200 MAD', location: 'Marrakech', time: 'Yesterday', image: 'https://images.pexels.com/photos/3784221/pexels-photo-3784221.jpeg?auto=compress&w=600', badges: ['VERIFIED'], dots: 1 },
  { id: '12', title: 'Shure SM7B Cardioid Dynamic Microphone', price: '3,800 MAD', location: 'Agdal, Rabat', time: '5 hours ago', image: 'https://images.pexels.com/photos/3784224/pexels-photo-3784224.jpeg?auto=compress&w=600', badges: ['VERIFIED'], dots: 1 },
]

const studioProduction: Listing[] = [
  { id: '13', title: 'Nord Stage 4 88-Key Stage Keyboard', price: '45,000 MAD', location: 'Souissi, Rabat', time: 'Just now', image: 'https://images.pexels.com/photos/210764/pexels-photo-210764.jpeg?auto=compress&w=600', badges: ['DIAMOND MEMBER'], dots: 2 },
  { id: '14', title: 'Marshall JCM800 2203 & 1960A Stack', price: '22,000 MAD', location: 'Hassan, Rabat', time: '2 days ago', image: 'https://images.pexels.com/photos/1407322/pexels-photo-1407322.jpeg?auto=compress&w=600', badges: ['VERIFIED'], dots: 1 },
  { id: '15', title: 'KRK Rokit 7 G5 Studio Monitors (Pair)', price: '5,400 MAD', location: 'Fes', time: 'Yesterday', image: 'https://images.pexels.com/photos/3784221/pexels-photo-3784221.jpeg?auto=compress&w=600', badges: ['VERIFIED'], dots: 1 },
  { id: '16', title: 'Akai Professional MPC Live II Standalone', price: '12,500 MAD', location: 'Tangier', time: '4 hours ago', image: 'https://images.pexels.com/photos/1389429/pexels-photo-1389429.jpeg?auto=compress&w=600', badges: ['VERIFIED'], dots: 2 },
]

function ListingCard({ item }: { item: Listing }) {
  const [saved, setSaved] = useState(false)
  return (
    <article style={{ backgroundColor: 'white', borderRadius: '2.5rem', overflow: 'hidden', border: '1px solid #f1f5f9', transition: 'box-shadow 0.3s', cursor: 'pointer' }}
      onMouseEnter={e => e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0,0,0,0.1)'}
      onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
    >
      <div style={{ position: 'relative', height: '256px', overflow: 'hidden' }}>
        <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', top: '16px', left: '16px', display: 'flex', flexDirection: 'column' as const, gap: '4px' }}>
          {item.badges.includes('DIAMOND MEMBER') && (
            <span style={{ backgroundColor: '#facc15', color: '#000', fontSize: '10px', fontWeight: 700, padding: '4px 8px', borderRadius: '4px', width: 'fit-content' }}>DIAMOND MEMBER</span>
          )}
          {item.badges.includes('VERIFIED') && (
            <span style={{ backgroundColor: '#2563eb', color: 'white', fontSize: '10px', fontWeight: 700, padding: '4px 8px', borderRadius: '4px', width: 'fit-content' }}>VERIFIED</span>
          )}
        </div>
        {item.tag && (
          <span style={{ position: 'absolute', top: '16px', right: '52px', backgroundColor: '#f3f4f6', fontSize: '10px', fontWeight: 700, padding: '4px 8px', borderRadius: '4px' }}>{item.tag}</span>
        )}
        <button onClick={() => setSaved(!saved)} style={{ position: 'absolute', top: '14px', right: '14px', background: 'none', border: 'none', cursor: 'pointer' }}>
          <Heart size={22} color="white" fill={saved ? '#ef4444' : 'rgba(0,0,0,0.3)'} style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.4))' }} />
        </button>
        {item.dots && (
          <div style={{ position: 'absolute', bottom: '14px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '4px' }}>
            {Array.from({ length: item.dots }).map((_, i) => (
              <div key={i} style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: i === 0 ? 'white' : 'rgba(255,255,255,0.5)' }} />
            ))}
          </div>
        )}
      </div>
      <div style={{ padding: '20px' }}>
        <h3 style={{ fontSize: '17px', fontWeight: 700, marginBottom: '6px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.title}</h3>
        <p style={{ fontSize: '22px', fontWeight: 900, color: '#2dd4bf', marginBottom: '14px' }}>{item.price}</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#6b7280', marginBottom: '20px' }}>
          <MapPin size={13} />
          <span>{item.location} · {item.time}</span>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button style={{ flex: 1, border: '1px solid #e5e7eb', color: '#374151', fontWeight: 700, fontSize: '13px', padding: '9px', borderRadius: '12px', backgroundColor: 'white', cursor: 'pointer' }}>MESSAGE</button>
          <button style={{ flex: 1, backgroundColor: '#2dd4bf', color: 'white', fontWeight: 700, fontSize: '13px', padding: '9px', borderRadius: '12px', border: 'none', cursor: 'pointer' }}>WhatsApp</button>
        </div>
      </div>
    </article>
  )
}

function ListingRow({ title, items, showViewAll }: { title: string; items: Listing[]; showViewAll?: boolean }) {
  return (
    <div style={{ marginBottom: '64px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
        <h2 style={{ fontSize: '21px', fontWeight: 700 }}>{title}</h2>
        {showViewAll && <a href="#" style={{ color: '#2dd4bf', fontWeight: 700, fontSize: '14px', textDecoration: 'none' }}>View All</a>}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
        {items.map(item => <ListingCard key={item.id} item={item} />)}
      </div>
    </div>
  )
}

export default function MusicalInstrumentsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = React.use(params)
  const [activePill, setActivePill] = useState('')
  const [activeSeller, setActiveSeller] = useState('All Sellers')

  return (
    <div style={{ fontFamily: 'Hanken Grotesk, Inter, sans-serif', backgroundColor: '#eef5f2', color: '#0f172a', minHeight: '100vh' }}>


      <main style={{ maxWidth: '1280px', margin: '0 auto', padding: '32px 16px' }}>

        {/* HERO */}
        <section style={{ position: 'relative', width: '100%', height: '500px', borderRadius: '2.5rem', overflow: 'hidden', marginBottom: '64px', display: 'flex', flexDirection: 'column' as const, alignItems: 'center', justifyContent: 'center' }}>
          <img src="https://images.pexels.com/photos/3784221/pexels-photo-3784221.jpeg?auto=compress&w=1400" alt="Musical Instrument Showroom"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.4)' }} />
          <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', padding: '0 16px', width: '100%', maxWidth: '900px' }}>
            <h2 style={{ color: 'white', fontSize: '52px', fontWeight: 700, marginBottom: '32px', letterSpacing: '-0.02em', textShadow: '0 4px 16px rgba(0,0,0,0.3)' }}>The Market in your Pocket</h2>
            <div style={{ position: 'relative', maxWidth: '600px', margin: '0 auto' }}>
              <input type="text" placeholder="Search instruments..."
                style={{ width: '100%', backgroundColor: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.3)', borderRadius: '2.5rem', padding: '20px 32px', color: 'white', fontSize: '17px', outline: 'none', fontFamily: 'inherit' }} />
              <button style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', backgroundColor: '#2dd4bf', padding: '12px', borderRadius: '50%', border: 'none', cursor: 'pointer', display: 'flex' }}>
                <Search size={24} color="white" />
              </button>
            </div>
          </div>
        </section>

        {/* BREADCRUMB */}
        <nav style={{ display: 'flex', gap: '8px', fontSize: '12px', color: '#6b7280', marginBottom: '8px' }}>
          <Link href={`/${locale}`} style={{ color: '#2563eb', textDecoration: 'none' }}>Home</Link><span>/</span>
          <Link href={`/${locale}/vault`} style={{ color: '#2563eb', textDecoration: 'none' }}>The Vault</Link><span>/</span>
          <span style={{ color: '#9ca3af' }}>Musical Instruments</span>
        </nav>

        {/* FILTER BAR */}
        <div style={{ width: '100%', borderRadius: '2.5rem', padding: '8px', display: 'flex', flexWrap: 'wrap' as const, alignItems: 'center', gap: '8px', border: '1px solid #e5e7eb', backgroundColor: 'white', boxShadow: '0 8px 32px rgba(0,0,0,0.05)', marginBottom: '32px' }}>
          <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', width: '100%' }}>
            <div style={{ padding: '12px 24px', borderRight: '1px solid #f3f4f6' }}>
              <label style={{ display: 'block', fontSize: '10px', fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase' as const }}>City</label>
              <select style={{ border: 'none', fontSize: '14px', fontWeight: 600, background: 'transparent', outline: 'none', fontFamily: 'inherit', width: '100%' }}>
                <option>Rabat</option><option>Casablanca</option><option>Marrakech</option>
              </select>
            </div>
            <div style={{ padding: '12px 24px', borderRight: '1px solid #f3f4f6' }}>
              <label style={{ display: 'block', fontSize: '10px', fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase' as const }}>Keyword</label>
              <input placeholder="Search instruments..." style={{ border: 'none', fontSize: '14px', fontWeight: 600, background: 'transparent', outline: 'none', fontFamily: 'inherit', width: '100%' }} />
            </div>
            <div style={{ padding: '12px 24px', borderRight: '1px solid #f3f4f6' }}>
              <label style={{ display: 'block', fontSize: '10px', fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase' as const }}>Neighborhood</label>
              <input placeholder="Enter location" style={{ border: 'none', fontSize: '14px', fontWeight: 600, background: 'transparent', outline: 'none', fontFamily: 'inherit', width: '100%' }} />
            </div>
            <div style={{ padding: '12px 24px' }}>
              <label style={{ display: 'block', fontSize: '10px', fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase' as const }}>Price (MAD)</label>
              <select style={{ border: 'none', fontSize: '14px', fontWeight: 600, background: 'transparent', outline: 'none', fontFamily: 'inherit', width: '100%' }}>
                <option>Any Price</option><option>Under 1000</option><option>1000 - 5000</option>
              </select>
            </div>
          </div>
          <button style={{ backgroundColor: '#2dd4bf', color: 'white', padding: '16px 32px', borderRadius: '2.5rem', fontWeight: 700, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', whiteSpace: 'nowrap' as const }}>
            <Search size={18} /> Search
          </button>
        </div>

        {/* TITLE + SORT */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap' as const, gap: '16px', marginBottom: '24px' }}>
          <h1 style={{ fontSize: '24px', fontWeight: 700 }}>
            New and Used Musical Instruments for sale in Rabat <span style={{ color: '#9ca3af', fontWeight: 400, marginLeft: '8px' }}>797 Ads</span>
          </h1>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button style={{ border: '1px solid #e5e7eb', backgroundColor: 'white', padding: '8px 16px', borderRadius: '8px', fontSize: '14px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
              <ArrowUpDown size={16} /> Sort: Default
            </button>
            <button style={{ border: '1px solid #e5e7eb', backgroundColor: 'white', padding: '8px 16px', borderRadius: '8px', fontSize: '14px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
              <Bookmark size={16} /> Save Search
            </button>
          </div>
        </div>

        {/* CATEGORY PILLS */}
        <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: '8px', marginBottom: '32px' }}>
          {categoryPills.map(p => (
            <button key={p.label} onClick={() => setActivePill(p.label)}
              style={{ padding: '8px 20px', borderRadius: '100px', border: activePill === p.label ? '2px solid #2dd4bf' : '1px solid #e5e7eb', backgroundColor: activePill === p.label ? '#f4fbf8' : 'white', fontSize: '14px', fontWeight: 500, cursor: 'pointer', color: activePill === p.label ? '#2dd4bf' : '#0f172a' }}>
              {p.label} <span style={{ color: '#9ca3af', fontWeight: 400 }}>({p.count})</span>
            </button>
          ))}
          <button style={{ padding: '8px 20px', borderRadius: '100px', border: '2px solid #2dd4bf', color: '#2dd4bf', fontWeight: 700, fontSize: '14px', backgroundColor: 'transparent', cursor: 'pointer' }}>View More</button>
        </div>

        {/* SELLER FILTERS */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '40px' }}>
          {sellerFilters.map(s => (
            <button key={s.label} onClick={() => setActiveSeller(s.label)}
              style={{
                display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', borderRadius: '8px', fontSize: '14px', cursor: 'pointer',
                fontWeight: activeSeller === s.label ? 700 : 600,
                backgroundColor: activeSeller === s.label ? '#eff6ff' : 'white',
                border: activeSeller === s.label ? '1px solid #bfdbfe' : '1px solid #e5e7eb',
                color: activeSeller === s.label ? '#1d4ed8' : '#374151',
              }}>
              <s.icon size={16} /> {s.label}
            </button>
          ))}
        </div>

        {/* FEATURED MUSICAL INSTRUMENTS */}
        <ListingRow title="Featured Musical Instruments" items={featuredInstruments} />

        {/* FEATURED TRADITIONAL INSTRUMENTS */}
        <ListingRow title="Featured Traditional Instruments" items={traditionalInstruments} showViewAll />

        {/* TWO BANNERS */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '64px' }}>
          <div style={{ background: 'linear-gradient(to right, #1e3a8a, #1d4ed8)', borderRadius: '2.5rem', padding: '40px', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <h2 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '8px' }}>SouKni Auto Pro</h2>
              <p style={{ color: '#bfdbfe', marginBottom: '24px' }}>Dedicated solutions for professional car dealers.</p>
              <button style={{ backgroundColor: 'white', color: '#1e3a8a', fontWeight: 700, padding: '12px 32px', borderRadius: '100px', border: 'none', cursor: 'pointer' }}>Learn More</button>
            </div>
          </div>
          <div style={{ background: 'linear-gradient(to right, #f59e0b, #fb923c)', borderRadius: '2.5rem', padding: '40px', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <h2 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '8px' }}>Diamond Membership</h2>
              <p style={{ color: '#fef3c7', marginBottom: '24px' }}>Boost your sales with priority listing placements.</p>
              <button style={{ backgroundColor: '#111827', color: 'white', fontWeight: 700, padding: '12px 32px', borderRadius: '100px', border: 'none', cursor: 'pointer' }}>Get Started</button>
            </div>
          </div>
        </div>

        {/* FEATURED PROFESSIONAL GEAR */}
        <ListingRow title="Featured Professional Gear" items={professionalGear} showViewAll />

        {/* PREMIUM STUDIO & PRODUCTION */}
        <ListingRow title="Premium Studio & Production" items={studioProduction} showViewAll />

        {/* APP DOWNLOAD BANNER */}
        <section style={{ marginBottom: '80px' }}>
          <div style={{ position: 'relative', borderRadius: '2.5rem', overflow: 'hidden', backgroundColor: '#2dd4bf', minHeight: '400px', display: 'flex', alignItems: 'center' }}>
            <img src="https://images.pexels.com/photos/3756879/pexels-photo-3756879.jpeg?auto=compress&w=1400" alt="Join the SouKni Family"
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{ position: 'relative', zIndex: 10, padding: '64px', maxWidth: '600px' }}>
              <h2 style={{ color: 'white', fontSize: '44px', fontWeight: 700, marginBottom: '16px', letterSpacing: '-0.02em' }}>Join the SouKni Family</h2>
              <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '18px', marginBottom: '32px', maxWidth: '420px' }}>Download our premium mobile experience for real-time alerts and exclusive marketplace deals.</p>
              <div style={{ display: 'flex', gap: '16px' }}>
                <div style={{ backgroundColor: 'black', color: 'white', padding: '10px 20px', borderRadius: '10px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>Download on the App Store</div>
                <div style={{ backgroundColor: 'black', color: 'white', padding: '10px 20px', borderRadius: '10px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>Get it on Google Play</div>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* FOOTER */}
    </div>
  )
}
