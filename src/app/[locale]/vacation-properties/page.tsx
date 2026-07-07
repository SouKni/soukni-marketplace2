'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { MapPin, Heart, Eye, CalendarCheck, Search, ChevronDown, MapPinned, Diamond, Smartphone, Globe, Link2, Share2, Compass, Plus, MessageSquare, Menu, Compass as TravelIcon, Castle, Waves, Building, BedDouble, HomeIcon, MoreHorizontal, Bed, Wifi, Car, ThermometerSnowflake, ChefHat, History } from 'lucide-react'

const categoryPills = [
  { label: 'All', icon: TravelIcon, active: true },
  { label: 'Riads', icon: Castle },
  { label: 'Villas', icon: Waves },
  { label: 'Apartments', icon: Building },
  { label: 'Hotels', icon: BedDouble },
  { label: 'Bungalows', icon: HomeIcon },
]

type Listing = { id: string; title: string; location: string; price: string; badge: string; amenities?: string[]; image: string }

const row1: Listing[] = [
  { id: '1', title: 'Grand Heritage Riad', location: 'Rabat Medina', price: '2,450', badge: 'Verified Riad', amenities: ['5 Beds', 'Free Wifi'], image: 'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&w=600' },
  { id: '2', title: 'Hay Riad Modern Oasis', location: 'Hay Riad, Rabat', price: '5,800', badge: 'Diamond Villa', amenities: ['Private Pool', 'Parking'], image: 'https://images.pexels.com/photos/53610/large-home-residential-house-architecture-53610.jpeg?auto=compress&w=600' },
  { id: '3', title: 'Ocean Skyline Duplex', location: 'Marina, Rabat', price: '1,850', badge: 'Verified Member', amenities: ['Sea View', 'Full Kitchen'], image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&w=600' },
  { id: '4', title: 'Oudayas Cliff Studio', location: 'Les Oudayas', price: '950', badge: 'Verified Member', amenities: ['Historic', 'AC'], image: 'https://images.pexels.com/photos/210264/pexels-photo-210264.jpeg?auto=compress&w=600' },
]

const row2: Listing[] = [
  { id: '5', title: 'Agdal Chic Apartment', location: 'Agdal, Rabat', price: '1,200', badge: 'Certified Member', image: 'https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg?auto=compress&w=600' },
  { id: '6', title: 'Boutique Guest House', location: 'Rabat Medina', price: '1,500', badge: 'Certified Member', image: 'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&w=600' },
  { id: '7', title: 'Coastal Modern Villa', location: 'Harhoura, Rabat', price: '7,200', badge: 'Certified Member', image: 'https://images.pexels.com/photos/53610/large-home-residential-house-architecture-53610.jpeg?auto=compress&w=600' },
  { id: '8', title: 'Hassan View Loft', location: 'Hassan District', price: '1,100', badge: 'Certified Member', image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&w=600' },
]

const row3: Listing[] = [
  { id: '9', title: 'Artist Sanctuary Riad', location: 'Rabat Medina', price: '3,200', badge: 'Verified Member', image: 'https://images.pexels.com/photos/210264/pexels-photo-210264.jpeg?auto=compress&w=600' },
  { id: '10', title: 'Luxury Penthouse Marina', location: 'Marina District', price: '2,950', badge: 'Verified Member', image: 'https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg?auto=compress&w=600' },
  { id: '11', title: 'Minimalist Garden Villa', location: 'Hay Riad, Rabat', price: '4,500', badge: 'Verified Member', image: 'https://images.pexels.com/photos/53610/large-home-residential-house-architecture-53610.jpeg?auto=compress&w=600' },
  { id: '12', title: 'Urban Studio Retreat', location: 'Agdal, Rabat', price: '850', badge: 'Verified Member', image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&w=600' },
]

function ListingCard({ item }: { item: Listing }) {
  const [saved, setSaved] = useState(false)
  return (
    <div style={{ backgroundColor: 'white', borderRadius: '1.5rem', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.06)', border: '1px solid rgba(186,202,197,0.1)', transition: 'all 0.3s' }}
      onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.12)'; e.currentTarget.style.transform = 'translateY(-4px)' }}
      onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.06)'; e.currentTarget.style.transform = 'translateY(0)' }}
    >
      <div style={{ position: 'relative', aspectRatio: '4/3', overflow: 'hidden' }}>
        <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.7s' }}
          onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
        />
        <div style={{ position: 'absolute', top: '16px', left: '16px', background: 'linear-gradient(135deg, #006b5f 0%, #3cddc7 100%)', color: 'white', padding: '4px 12px', borderRadius: '100px', fontSize: '10px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, display: 'flex', alignItems: 'center', gap: '4px' }}>
          <Diamond size={14} /> {item.badge}
        </div>
        <button onClick={() => setSaved(!saved)} style={{ position: 'absolute', top: '16px', right: '16px', backgroundColor: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(12px)', border: 'none', borderRadius: '50%', width: '36px', height: '36px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
          <Heart size={18} fill={saved ? 'white' : 'none'} />
        </button>
      </div>
      <div style={{ padding: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px', gap: '8px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#161d1b', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical' as const }}>{item.title}</h3>
          <div style={{ color: '#006b5f', fontWeight: 700, fontSize: '16px', whiteSpace: 'nowrap' as const, lineHeight: 1.2 }}>{item.price} MAD<br /><span style={{ fontSize: '11px', fontWeight: 400, color: '#3c4a46' }}>/ Night</span></div>
        </div>
        <p style={{ fontSize: '14px', color: '#3c4a46', marginBottom: item.amenities ? '16px' : '16px', display: 'flex', alignItems: 'center', gap: '4px' }}>
          <MapPin size={16} /> {item.location}
        </p>
        {item.amenities && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', color: '#3c4a46', fontSize: '12px', fontWeight: 600, marginBottom: '24px' }}>
            {item.amenities.map(a => <span key={a} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>● {a}</span>)}
          </div>
        )}
        <div style={{ display: 'flex', gap: '8px', marginTop: item.amenities ? 0 : '8px' }}>
          <button style={{ flex: 1, backgroundColor: '#e2eae7', color: '#3c4a46', padding: '8px', borderRadius: '12px', border: 'none', fontSize: '14px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', transition: 'all 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#006b5f'; e.currentTarget.style.color = 'white' }}
            onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#e2eae7'; e.currentTarget.style.color = '#3c4a46' }}>
            <Eye size={18} /> View Deal
          </button>
          <button style={{ flex: 1, backgroundColor: '#2dd4bf', color: '#00574d', padding: '8px', borderRadius: '12px', border: 'none', fontSize: '14px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            <CalendarCheck size={18} /> Book Now
          </button>
        </div>
      </div>
    </div>
  )
}

function ListingGrid({ items }: { items: Listing[] }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '16px', marginBottom: '16px' }}>
      {items.map(item => <ListingCard key={item.id} item={item} />)}
    </div>
  )
}

export default function VacationPropertiesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = React.use(params)
  const [activeCategory, setActiveCategory] = useState('All')
  const [diamondFirst, setDiamondFirst] = useState(true)
  const [activeStatus, setActiveStatus] = useState('ALL')

  return (
    <div style={{ fontFamily: 'Hanken Grotesk, Inter, sans-serif', backgroundColor: '#f4fbf8', color: '#161d1b', minHeight: '100vh', paddingBottom: '90px' }}>

      {/* ── HEADER ── */}
      <header style={{ backgroundColor: 'rgba(244,251,248,0.8)', backdropFilter: 'blur(20px)', position: 'sticky', top: 0, zIndex: 50, borderBottom: '1px solid rgba(255,255,255,0.4)', boxShadow: '0 1px 2px rgba(0,0,0,0.04)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 40px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
              <Link href={`/${locale}`} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '22px', fontWeight: 900, color: '#006b5f', letterSpacing: '-0.02em' }}>SouKni</span>
              </Link>
              <button style={{ backgroundColor: '#e2eae7', padding: '8px 16px', borderRadius: '100px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: 600, color: '#3c4a46', border: 'none', cursor: 'pointer' }}>
                <MapPin size={18} /> Cities: Rabat
              </button>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', color: '#3c4a46' }}>
                <Globe size={20} style={{ cursor: 'pointer' }} />
                <span style={{ fontSize: '18px', cursor: 'pointer' }}>💳</span>
                <Heart size={20} style={{ cursor: 'pointer' }} />
                <span style={{ position: 'relative', cursor: 'pointer' }}>🔔<span style={{ position: 'absolute', top: '-2px', right: '-2px', width: '8px', height: '8px', backgroundColor: '#ba1a1a', borderRadius: '50%', border: '2px solid #f4fbf8' }} /></span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <button style={{ fontSize: '13px', fontWeight: 600, color: '#3c4a46', background: 'none', border: 'none', cursor: 'pointer' }}>Log in</button>
                <button style={{ backgroundColor: '#2dd4bf', color: '#00574d', padding: '10px 24px', borderRadius: '100px', fontWeight: 700, fontSize: '13px', border: 'none', cursor: 'pointer', boxShadow: '0 4px 12px rgba(45,212,191,0.3)', whiteSpace: 'nowrap' as const }}>
                  Place Your 100% FREE Ad
                </button>
              </div>
            </div>
          </div>
          {/* NAV */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: '32px', padding: '12px 0', borderTop: '1px solid rgba(186,202,197,0.2)' }}>
            <span style={{ fontSize: '13px', color: '#3c4a46', cursor: 'pointer', fontWeight: 600 }}>Motors</span>
            <span style={{ fontSize: '13px', color: '#006b5f', fontWeight: 700, borderBottom: '2px solid #006b5f', paddingBottom: '4px', cursor: 'pointer' }}>Property</span>
            {['Jobs', 'Classifieds', 'Community'].map(item => (
              <span key={item} style={{ fontSize: '13px', color: '#3c4a46', cursor: 'pointer', fontWeight: 600 }}>{item}</span>
            ))}
            <span style={{ fontSize: '13px', color: '#3c4a46', cursor: 'pointer', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>The Vault 🔒</span>
          </nav>
        </div>
      </header>

      {/* ── HERO ── */}
      <section style={{ position: 'relative', height: '520px', overflow: 'hidden' }}>
        <img src="https://images.pexels.com/photos/53610/large-home-residential-house-architecture-53610.jpeg?auto=compress&w=1600" alt="Luxury vacation home" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #f4fbf8, transparent, rgba(0,0,0,0.3))' }} />
        <div style={{ position: 'relative', zIndex: 10, maxWidth: '1280px', margin: '0 auto', padding: '0 40px', height: '100%', display: 'flex', flexDirection: 'column' as const, justifyContent: 'center', alignItems: 'center' }}>
          <h1 style={{ color: 'white', fontSize: '48px', fontWeight: 700, textAlign: 'center' as const, marginBottom: '32px', textShadow: '0 4px 12px rgba(0,0,0,0.5)' }}>Experience Luxury Living in Rabat</h1>
          <div style={{ width: '100%', maxWidth: '1100px', backgroundColor: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.4)', borderRadius: '100px', boxShadow: '0 25px 50px rgba(0,0,0,0.2)', display: 'flex', alignItems: 'center', padding: '8px' }}>
            <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'repeat(5,1fr)' }}>
              {[
                { label: 'LOCATION', value: 'Cities', icon: MapPin, rounded: 'left' },
                { label: 'CHECK IN', value: 'Add Dates', icon: '📅' },
                { label: 'CHECK OUT', value: 'Add Dates', icon: '📅' },
                { label: 'GUEST', value: 'Select', icon: '👥' },
                { label: 'FILTERS', value: 'Price, Beds...', icon: '⚙' },
              ].map((f, i) => (
                <div key={f.label} style={{ padding: '4px 32px', borderRight: i < 4 ? '1px solid rgba(186,202,197,0.2)' : 'none', cursor: 'pointer' }}>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase' as const, letterSpacing: '0.08em', color: '#3c4a46', marginBottom: '2px' }}>{f.label}</label>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '16px', fontWeight: i === 0 ? 600 : 400, color: i === 0 ? '#161d1b' : 'rgba(60,74,70,0.6)' }}>{f.value}</span>
                    {typeof f.icon === 'string' ? <span style={{ fontSize: '18px', opacity: 0.4 }}>{f.icon}</span> : <MapPin size={20} color="#006b5f" />}
                  </div>
                </div>
              ))}
            </div>
            <button style={{ backgroundColor: '#006b5f', color: 'white', width: '56px', height: '56px', borderRadius: '50%', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 16px rgba(0,107,95,0.3)', flexShrink: 0, marginLeft: '8px', marginRight: '4px' }}>
              <Search size={26} />
            </button>
          </div>
        </div>
      </section>

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 40px' }}>
        {/* CATEGORY PILLS */}
        <div style={{ marginTop: '-32px', position: 'relative', zIndex: 20, display: 'flex', gap: '12px', overflowX: 'auto' as const, paddingBottom: '16px' }}>
          {categoryPills.map(c => (
            <button key={c.label} onClick={() => setActiveCategory(c.label)}
              style={{ whiteSpace: 'nowrap' as const, padding: '10px 24px', borderRadius: '100px', fontSize: '13px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.08)', border: activeCategory === c.label ? 'none' : '1px solid #bacac5', backgroundColor: activeCategory === c.label ? '#2b3230' : 'white', color: activeCategory === c.label ? 'white' : '#161d1b' }}>
              <c.icon size={18} /> {c.label}
            </button>
          ))}
          <button style={{ whiteSpace: 'nowrap' as const, padding: '10px 24px', borderRadius: '100px', fontSize: '13px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.08)', border: 'none', backgroundColor: '#2b3230', color: 'white' }}>
            <MoreHorizontal size={18} /> View More
          </button>
        </div>

        {/* RESULTS HEADER */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px', borderBottom: '1px solid rgba(186,202,197,0.3)', paddingBottom: '16px', flexWrap: 'wrap' as const, gap: '16px' }}>
          <div>
            <h2 style={{ fontSize: '24px', fontWeight: 600 }}>Vacation Properties in Rabat</h2>
            <p style={{ fontSize: '16px', color: '#3c4a46' }}>1,972 Exclusive Homes &amp; Hotels found in Rabat</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap' as const }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', paddingRight: '24px', borderRight: '1px solid rgba(186,202,197,0.3)' }}>
              {['ALL', 'HOTELS', 'HOMES'].map(s => (
                <button key={s} onClick={() => setActiveStatus(s)} style={{ padding: '6px 16px', borderRadius: '100px', fontSize: '13px', fontWeight: 600, cursor: 'pointer', border: activeStatus === s ? 'none' : '1px solid rgba(186,202,197,0.3)', backgroundColor: activeStatus === s ? '#006b5f' : 'white', color: activeStatus === s ? 'white' : '#3c4a46' }}>{s}</button>
              ))}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontSize: '13px', fontWeight: 600, color: '#3c4a46' }}>SouKni Diamond Certified First</span>
              <button onClick={() => setDiamondFirst(!diamondFirst)} style={{ position: 'relative', width: '44px', height: '24px', borderRadius: '100px', backgroundColor: diamondFirst ? '#006b5f' : '#dde4e1', border: 'none', cursor: 'pointer' }}>
                <div style={{ position: 'absolute', top: '2px', left: diamondFirst ? '22px' : '2px', width: '20px', height: '20px', borderRadius: '50%', backgroundColor: 'white', transition: 'left 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }} />
              </button>
            </div>
          </div>
        </div>

        {/* SORT BAR */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', backgroundColor: '#eef5f2', padding: '16px', borderRadius: '12px', border: '1px solid rgba(186,202,197,0.1)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: 'white', padding: '8px 16px', borderRadius: '8px', border: '1px solid rgba(186,202,197,0.3)', cursor: 'pointer' }}>
            <span style={{ fontSize: '13px', fontWeight: 600 }}>Sort: Recommended</span><ChevronDown size={18} color="#3c4a46" />
          </div>
          <button style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#006b5f', fontWeight: 600, fontSize: '13px', background: 'none', border: 'none', cursor: 'pointer', padding: '8px 16px', borderRadius: '8px' }}>
            <MapPinned size={20} /> Show on Map
          </button>
        </div>

        {/* MAIN GRID */}
        <ListingGrid items={row1} />

        {/* DIAMOND BANNER */}
        <div style={{ margin: '32px 0' }}>
          <div style={{ backgroundColor: '#006b5f', borderRadius: '2.5rem', padding: '48px', minHeight: '220px', display: 'flex', flexDirection: 'column' as const, justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
            <span style={{ backgroundColor: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(8px)', color: 'white', fontSize: '10px', fontWeight: 700, textTransform: 'uppercase' as const, letterSpacing: '0.08em', padding: '4px 12px', borderRadius: '100px', border: '1px solid rgba(255,255,255,0.3)', display: 'inline-block', width: 'fit-content', marginBottom: '16px' }}>SouKni Certified</span>
            <h2 style={{ color: 'white', fontSize: '32px', fontWeight: 700, marginBottom: '16px', maxWidth: '600px' }}>Upgrade to SouKni FREE Diamond Certified Membership</h2>
            <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '16px', marginBottom: '24px', maxWidth: '600px' }}>List your vacation property as a Diamond Member and get 5x more bookings with professional verification.</p>
            <button style={{ backgroundColor: 'white', color: '#006b5f', padding: '12px 32px', borderRadius: '100px', fontWeight: 700, border: 'none', cursor: 'pointer', width: 'fit-content', boxShadow: '0 8px 16px rgba(0,0,0,0.15)', transition: 'transform 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
              Become Diamond Member
            </button>
          </div>
        </div>

        <ListingGrid items={row2} />
        <ListingGrid items={row3} />

        {/* APP DOWNLOAD BANNER */}
        <section style={{ margin: '32px 0 48px' }}>
          <div style={{ backgroundColor: '#e8efec', borderRadius: '2.5rem', overflow: 'hidden', border: '1px solid rgba(186,202,197,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '48px', gap: '32px', flexWrap: 'wrap' as const }}>
            <div style={{ flex: 1, minWidth: '320px' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: 'rgba(0,107,95,0.1)', color: '#006b5f', padding: '6px 16px', borderRadius: '100px', fontSize: '13px', fontWeight: 600, marginBottom: '24px' }}>
                <Smartphone size={18} /> Download the SouKni App
              </div>
              <h2 style={{ fontSize: '40px', fontWeight: 700, marginBottom: '16px', lineHeight: 1.2 }}>Join the SouKni Family</h2>
              <p style={{ fontSize: '18px', color: '#3c4a46', marginBottom: '32px', maxWidth: '420px' }}>Get the best vacation rental deals delivered straight to your pocket. Faster, smarter, and always verified.</p>
              <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: '12px' }}>
                {[
                  { icon: '📱', top: 'Download on the', bottom: 'App Store' },
                  { icon: '▶', top: 'Get it on', bottom: 'Google Play' },
                  { icon: '⊞', top: 'Explore it on', bottom: 'AppGallery' },
                ].map(s => (
                  <button key={s.bottom} style={{ backgroundColor: 'black', color: 'white', padding: '10px 20px', borderRadius: '12px', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ fontSize: '24px' }}>{s.icon}</span>
                    <div style={{ textAlign: 'left' as const }}>
                      <p style={{ fontSize: '10px', textTransform: 'uppercase' as const, opacity: 0.7 }}>{s.top}</p>
                      <p style={{ fontSize: '14px', fontWeight: 700 }}>{s.bottom}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
            <div style={{ flex: 1, minWidth: '280px', display: 'flex', justifyContent: 'center' }}>
              <img src="https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&w=500" alt="SouKni App" style={{ width: '100%', maxWidth: '320px', borderRadius: '1.5rem', boxShadow: '0 25px 50px rgba(0,0,0,0.2)', transform: 'rotate(4deg)' }} />
            </div>
          </div>
        </section>

        {/* LOAD MORE */}
        <div style={{ display: 'flex', flexDirection: 'column' as const, alignItems: 'center', gap: '24px', marginTop: '64px', paddingTop: '32px', paddingBottom: '32px', borderTop: '1px solid rgba(186,202,197,0.3)' }}>
          <p style={{ color: '#3c4a46', fontSize: '16px' }}>You've viewed 12 of 1,245 vacation properties</p>
          <button style={{ backgroundColor: '#e2eae7', color: '#006b5f', padding: '16px 48px', borderRadius: '100px', fontWeight: 700, border: 'none', cursor: 'pointer', boxShadow: '0 1px 3px rgba(0,0,0,0.06)', transition: 'all 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#006b5f'; e.currentTarget.style.color = 'white' }}
            onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#e2eae7'; e.currentTarget.style.color = '#006b5f' }}>
            Load More Properties
          </button>
        </div>
      </div>

      {/* ── FOOTER ── */}
      <footer style={{ backgroundColor: '#7A7A7A', color: 'white', padding: '64px 40px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '48px', marginBottom: '64px' }}>
            <div>
              <h3 style={{ fontSize: '24px', fontWeight: 600, marginBottom: '24px' }}>SouKni Rabat</h3>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '16px', marginBottom: '32px', lineHeight: 1.6 }}>The premier marketplace for luxury vacation stays in Morocco's capital. Connecting travelers with unique Rabat experiences since 2018.</p>
              <div style={{ display: 'flex', gap: '16px' }}>
                <button style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.1)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}><Globe size={20} /></button>
                <button style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.1)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}><Link2 size={20} /></button>
                <button style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.1)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}><Share2 size={20} /></button>
              </div>
            </div>
            <div>
              <h4 style={{ fontSize: '13px', textTransform: 'uppercase' as const, letterSpacing: '0.08em', opacity: 0.6, marginBottom: '24px' }}>Company</h4>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column' as const, gap: '16px' }}>
                {['About Us', 'Careers', 'Press', 'Blog'].map(l => <li key={l}><a href="#" style={{ color: 'white', textDecoration: 'none', fontSize: '16px' }}>{l}</a></li>)}
              </ul>
            </div>
            <div>
              <h4 style={{ fontSize: '13px', textTransform: 'uppercase' as const, letterSpacing: '0.08em', opacity: 0.6, marginBottom: '24px' }}>Legal</h4>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column' as const, gap: '16px' }}>
                {['Terms of Service', 'Privacy Policy', 'Cookies Policy', 'Rental Licenses'].map(l => <li key={l}><a href="#" style={{ color: 'white', textDecoration: 'none', fontSize: '16px' }}>{l}</a></li>)}
              </ul>
            </div>
            <div>
              <h4 style={{ fontSize: '13px', textTransform: 'uppercase' as const, letterSpacing: '0.08em', opacity: 0.6, marginBottom: '24px' }}>Mobile App</h4>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '16px', marginBottom: '24px' }}>Experience SouKni on the go. Available for iOS and Android.</p>
              <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '12px' }}>
                {[
                  { top: 'Download on the', bottom: 'App Store' },
                  { top: 'Get it on', bottom: 'Google Play' },
                ].map(s => (
                  <button key={s.bottom} style={{ backgroundColor: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '8px 16px', display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', color: 'white' }}>
                    <Smartphone size={24} />
                    <div style={{ textAlign: 'left' as const }}>
                      <p style={{ fontSize: '10px', textTransform: 'uppercase' as const, opacity: 0.6 }}>{s.top}</p>
                      <p style={{ fontSize: '14px', fontWeight: 700 }}>{s.bottom}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div style={{ paddingTop: '32px', borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', flexWrap: 'wrap' as const, justifyContent: 'space-between', alignItems: 'center', gap: '16px' }}>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px' }}>© 2026 SouKni Marketplace. Premium Vacation Rentals. All Rights Reserved.</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px', color: 'rgba(255,255,255,0.4)', fontSize: '13px' }}>
              <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Sitemap</a>
              <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Global Network</a>
              <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Support</a>
            </div>
          </div>
        </div>
      </footer>

      {/* ── MOBILE BOTTOM NAV ── */}
      <nav style={{ position: 'fixed', bottom: 0, left: 0, width: '100%', backgroundColor: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.4)', zIndex: 50, height: '80px', display: 'none', alignItems: 'center', justifyContent: 'space-around', borderRadius: '1.5rem 1.5rem 0 0', boxShadow: '0 -8px 24px rgba(0,0,0,0.1)' }} className="md:hidden">
        <div style={{ display: 'flex', flexDirection: 'column' as const, alignItems: 'center', gap: '4px', color: '#006b5f' }}>
          <Compass size={24} /><span style={{ fontSize: '10px' }}>Explore</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' as const, alignItems: 'center', gap: '4px', color: 'rgba(60,74,70,0.6)' }}>
          <Heart size={24} /><span style={{ fontSize: '10px' }}>Saved</span>
        </div>
        <div style={{ position: 'relative', top: '-24px' }}>
          <button style={{ width: '56px', height: '56px', backgroundColor: '#006b5f', color: 'white', borderRadius: '50%', border: '4px solid #f4fbf8', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 24px rgba(0,0,0,0.2)' }}>
            <Plus size={32} />
          </button>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' as const, alignItems: 'center', gap: '4px', color: 'rgba(60,74,70,0.6)' }}>
          <MessageSquare size={24} /><span style={{ fontSize: '10px' }}>Messages</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' as const, alignItems: 'center', gap: '4px', color: 'rgba(60,74,70,0.6)' }}>
          <Menu size={24} /><span style={{ fontSize: '10px' }}>Menu</span>
        </div>
      </nav>
    </div>
  )
}
