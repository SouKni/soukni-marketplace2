'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { MapPin, Heart, Search, ChevronDown, Sliders, MessageCircle, Globe, ChevronLeft, ChevronRight, Bell, User, Truck, Bookmark, Users, ShieldCheck, BadgeCheck, Diamond, Apple, PlayCircle, Store, Smartphone, Facebook, Instagram, Camera, Briefcase, Video, Compass, Car, Gem } from 'lucide-react'

const navLinks = ['Motors', 'Property', 'The Vault', 'Home & Living', 'Fashion', 'Jobs', 'Mobiles & Computers', 'Services']

const categoryPills = [
  { label: 'All Vehicles', active: true },
  { label: 'Panel Vans' },
  { label: 'Box Trucks' },
  { label: 'Pickups' },
  { label: 'Heavy Trucks' },
  { label: 'Electric Fleet' },
]

type Vehicle = {
  id: string
  title: string
  subtitle: string
  price: string
  location: string
  time: string
  badge: 'CERTIFIED' | 'DIAMOND MEMBER' | 'VERIFIED' | null
  isNew?: boolean
  image: string
}

const featuredVans: Vehicle[] = [
  { id: '1', title: '2024 Mercedes-Benz Sprinter', subtitle: 'Panel Van • High Roof', price: '450,000', location: 'Rabat', time: '2 hours ago', badge: 'CERTIFIED', isNew: true, image: 'https://images.pexels.com/photos/2399611/pexels-photo-2399611.jpeg?auto=compress&w=600' },
  { id: '2', title: '2024 Ford Transit Custom', subtitle: 'Panel Van • Fleet', price: '320,000', location: 'Casablanca', time: '1 day ago', badge: 'CERTIFIED', isNew: true, image: 'https://images.pexels.com/photos/2533092/pexels-photo-2533092.jpeg?auto=compress&w=600' },
  { id: '3', title: '2024 Volkswagen Crafter', subtitle: 'Box Truck • Professional', price: '395,000', location: 'Marrakech', time: '3 days ago', badge: null, image: 'https://images.pexels.com/photos/2244746/pexels-photo-2244746.jpeg?auto=compress&w=600' },
  { id: '4', title: '2024 Renault Master', subtitle: 'Panel Van • Diesel', price: '285,000', location: 'Tangier', time: 'Just now', badge: 'DIAMOND MEMBER', image: 'https://images.pexels.com/photos/2519374/pexels-photo-2519374.jpeg?auto=compress&w=600' },
]

const featuredTrucks: Vehicle[] = [
  { id: '5', title: '2024 Volvo FH16', subtitle: 'Heavy Duty • Midnight Black', price: '850,000', location: 'Casablanca', time: 'Just now', badge: 'DIAMOND MEMBER', image: 'https://images.pexels.com/photos/4391470/pexels-photo-4391470.jpeg?auto=compress&w=600' },
  { id: '6', title: '2024 Scania R500', subtitle: 'Arctic White • High Roof', price: '820,000', location: 'Tangier', time: 'Just now', badge: 'VERIFIED', image: 'https://images.pexels.com/photos/2199293/pexels-photo-2199293.jpeg?auto=compress&w=600' },
  { id: '7', title: '2024 SITRAK C7H', subtitle: 'Heavy Haulage • Fleet', price: '750,000', location: 'Rabat', time: 'Just now', badge: 'VERIFIED', image: 'https://images.pexels.com/photos/2199293/pexels-photo-2199293.jpeg?auto=compress&w=600' },
  { id: '8', title: '2024 Mercedes-Benz Arocs', subtitle: 'Construction • Heavy Duty', price: '790,000', location: 'Agadir', time: 'Just now', badge: 'DIAMOND MEMBER', image: 'https://images.pexels.com/photos/4391477/pexels-photo-4391477.jpeg?auto=compress&w=600' },
]

const extraRow1: Vehicle[] = [
  { id: '9', title: 'Heavy Duty Industrial Truck', subtitle: 'Logistics • Heavy Duty', price: '850,000', location: 'Casablanca', time: '2 hours ago', badge: 'DIAMOND MEMBER', image: 'https://images.pexels.com/photos/4391470/pexels-photo-4391470.jpeg?auto=compress&w=600' },
  { id: '10', title: 'Electric Sustainable Delivery Van', subtitle: 'Electric • Eco-Fleet', price: '520,000', location: 'Rabat', time: 'Just now', badge: 'DIAMOND MEMBER', image: 'https://images.pexels.com/photos/3964736/pexels-photo-3964736.jpeg?auto=compress&w=600' },
  { id: '11', title: 'Enterprise Grade Custom Van', subtitle: 'Fleet • Commercial', price: '310,000', location: 'Tangier', time: '1 hour ago', badge: 'DIAMOND MEMBER', image: 'https://images.pexels.com/photos/2533092/pexels-photo-2533092.jpeg?auto=compress&w=600' },
  { id: '12', title: 'High-Roof Logistical Transporter', subtitle: 'Transport • Heavy Load', price: '445,000', location: 'Fez', time: 'Just now', badge: 'DIAMOND MEMBER', image: 'https://images.pexels.com/photos/2399611/pexels-photo-2399611.jpeg?auto=compress&w=600' },
]

const extraRow2: Vehicle[] = [
  { id: '13', title: '2024 Mercedes-Benz Sprinter', subtitle: 'High Roof • Arctic White', price: '485,000', location: 'Casablanca', time: '4 hours ago', badge: 'CERTIFIED', image: 'https://images.pexels.com/photos/2399611/pexels-photo-2399611.jpeg?auto=compress&w=600' },
  { id: '14', title: '2024 Ford Transit Custom', subtitle: 'Magnetic Grey • Modern Fleet', price: '315,000', location: 'Tangier', time: '6 hours ago', badge: 'DIAMOND MEMBER', image: 'https://images.pexels.com/photos/2533092/pexels-photo-2533092.jpeg?auto=compress&w=600' },
  { id: '15', title: '2024 Volkswagen Crafter', subtitle: 'Metallic Silver • High Capacity', price: '425,000', location: 'Rabat', time: '2 hours ago', badge: 'CERTIFIED', image: 'https://images.pexels.com/photos/2244746/pexels-photo-2244746.jpeg?auto=compress&w=600' },
  { id: '16', title: '2024 Renault Master', subtitle: 'Mineral White • Heavy Load', price: '295,000', location: 'Marrakech', time: '8 hours ago', badge: 'DIAMOND MEMBER', image: 'https://images.pexels.com/photos/2519374/pexels-photo-2519374.jpeg?auto=compress&w=600' },
]

const extraRow3: Vehicle[] = [
  { id: '17', title: '2024 Ford Transit Custom', subtitle: 'Magnetic Grey • Cargo Pro', price: '330,000', location: 'Casablanca', time: '12 hours ago', badge: 'CERTIFIED', image: 'https://images.pexels.com/photos/2533092/pexels-photo-2533092.jpeg?auto=compress&w=600' },
  { id: '18', title: '2024 Mercedes-Benz Sprinter', subtitle: 'Arctic White • Premium Grade', price: '495,000', location: 'Tangier', time: 'Just now', badge: 'DIAMOND MEMBER', image: 'https://images.pexels.com/photos/2399611/pexels-photo-2399611.jpeg?auto=compress&w=600' },
  { id: '19', title: '2024 Renault Master', subtitle: 'Mineral White • Delivery Pro', price: '275,000', location: 'Rabat', time: '1 day ago', badge: 'CERTIFIED', image: 'https://images.pexels.com/photos/2519374/pexels-photo-2519374.jpeg?auto=compress&w=600' },
  { id: '20', title: '2024 Volkswagen Crafter', subtitle: 'Metallic Silver • Logistics Spec', price: '410,000', location: 'Marrakech', time: '2 days ago', badge: 'DIAMOND MEMBER', image: 'https://images.pexels.com/photos/2244746/pexels-photo-2244746.jpeg?auto=compress&w=600' },
]

function BadgePill({ badge }: { badge: Vehicle['badge'] }) {
  if (!badge) return null
  if (badge === 'DIAMOND MEMBER') {
    return (
      <div style={{ position: 'absolute', top: '8px', left: '8px', zIndex: 10, backgroundColor: 'rgba(244,251,248,0.9)', backdropFilter: 'blur(8px)', padding: '4px 10px', borderRadius: '100px', display: 'flex', alignItems: 'center', gap: '4px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        <Gem size={14} color="#8d4f00" />
        <span style={{ fontSize: '11px', fontWeight: 700, color: '#8d4f00', textTransform: 'uppercase' as const, letterSpacing: '0.03em' }}>Diamond Member</span>
      </div>
    )
  }
  return (
    <div style={{ position: 'absolute', top: '8px', left: '8px', zIndex: 10, backgroundColor: 'rgba(244,251,248,0.9)', backdropFilter: 'blur(8px)', padding: '4px 10px', borderRadius: '100px', display: 'flex', alignItems: 'center', gap: '4px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
      <BadgeCheck size={14} color="#006b5f" />
      <span style={{ fontSize: '11px', fontWeight: 700, color: '#006b5f', textTransform: 'uppercase' as const, letterSpacing: '0.03em' }}>{badge}</span>
    </div>
  )
}

function VehicleCard({ v, ctaLabel = 'Chat' }: { v: Vehicle; ctaLabel?: string }) {
  const [saved, setSaved] = useState(false)
  return (
    <article style={{ backgroundColor: 'rgba(244,251,248,0.7)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.4)', borderRadius: '0.75rem', overflow: 'hidden', display: 'flex', flexDirection: 'column' as const, transition: 'transform 0.3s' }}
      onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
      onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
    >
      <div style={{ position: 'relative', aspectRatio: '4/3', width: '100%', backgroundColor: '#e2eae7', overflow: 'hidden' }}>
        <BadgePill badge={v.badge} />
        <button onClick={() => setSaved(!saved)} style={{ position: 'absolute', top: '8px', right: '8px', zIndex: 10, width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'rgba(244,251,248,0.5)', backdropFilter: 'blur(8px)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: saved ? '#ba1a1a' : '#161d1b' }}>
          <Heart size={18} fill={saved ? '#ba1a1a' : 'none'} />
        </button>
        <img src={v.image} alt={v.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }}
          onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
        />
      </div>
      <div style={{ padding: '16px', display: 'flex', flexDirection: 'column' as const, flex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px', gap: '8px' }}>
          <h3 style={{ fontSize: '13px', fontWeight: 600, color: '#161d1b', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical' as const }}>{v.title}</h3>
          {v.isNew && <span style={{ backgroundColor: 'rgba(255,172,90,0.2)', color: '#744000', padding: '2px 8px', borderRadius: '4px', fontSize: '10px', fontWeight: 700, textTransform: 'uppercase' as const, letterSpacing: '0.03em', border: '1px solid rgba(255,172,90,0.3)', flexShrink: 0 }}>New</span>}
        </div>
        <p style={{ fontSize: '13px', color: '#3c4a46', marginBottom: '8px' }}>{v.subtitle}</p>
        <div style={{ fontSize: '20px', fontWeight: 700, color: '#161d1b', marginBottom: '12px' }}>MAD {v.price}</div>
        <div style={{ display: 'flex', alignItems: 'center', fontSize: '12px', color: '#3c4a46', marginBottom: '16px' }}>
          <MapPin size={14} style={{ marginRight: '4px' }} />
          <span>{v.location} • {v.time}</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginTop: 'auto' }}>
          <button style={{ border: '1px solid #006b5f', color: '#006b5f', backgroundColor: 'transparent', fontSize: '13px', fontWeight: 600, padding: '8px', borderRadius: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', cursor: 'pointer' }}>
            <MessageCircle size={16} /> {ctaLabel}
          </button>
          <button style={{ backgroundColor: '#25D366', color: 'white', border: 'none', fontSize: '13px', fontWeight: 600, padding: '8px', borderRadius: '100px', cursor: 'pointer' }}>
            WhatsApp
          </button>
        </div>
      </div>
    </article>
  )
}

function VehicleGrid({ vehicles, ctaLabel }: { vehicles: Vehicle[]; ctaLabel?: string }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '16px', marginBottom: '32px' }}>
      {vehicles.map(v => <VehicleCard key={v.id} v={v} ctaLabel={ctaLabel} />)}
    </div>
  )
}

export default function TrucksVansPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = React.use(params)
  const [activeCategory, setActiveCategory] = useState('All Vehicles')
  const [activeSeller, setActiveSeller] = useState('All Sellers')
  const [diamondFirst, setDiamondFirst] = useState(true)

  return (
    <div style={{ fontFamily: 'Hanken Grotesk, Inter, sans-serif', backgroundColor: '#f4fbf8', color: '#161d1b', minHeight: '100vh', paddingBottom: '90px' }}>

      {/* ── HEADER ── */}
      <nav style={{ backgroundColor: 'rgba(244,251,248,0.8)', backdropFilter: 'blur(20px)', borderTop: '4px solid rgba(0,107,95,0.1)', position: 'sticky', top: 0, zIndex: 50, boxShadow: '0 1px 2px rgba(0,0,0,0.04)' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '16px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <Link href={`/${locale}`} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '22px', fontWeight: 900, color: '#006b5f', letterSpacing: '-0.02em' }}>SouKni</span>
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
              {[
                { icon: Globe, label: 'Languages (FR, ES, AR, EN)' },
                { icon: undefined, label: 'Currency (MAD, EUR, GBP, USD)', emoji: '💳' },
                { icon: Heart, label: 'Favorites' },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', flexDirection: 'column' as const, alignItems: 'center', padding: '0 8px', cursor: 'pointer' }}>
                  {item.icon ? <item.icon size={20} color="#3c4a46" /> : <span style={{ fontSize: '18px' }}>{item.emoji}</span>}
                  <span style={{ fontSize: '9px', color: 'rgba(60,74,70,0.7)', whiteSpace: 'nowrap' as const }}>{item.label}</span>
                </div>
              ))}
              <div style={{ display: 'flex', flexDirection: 'column' as const, alignItems: 'center', padding: '0 8px', cursor: 'pointer', position: 'relative' }}>
                <span style={{ position: 'relative' }}><Bell size={20} color="#3c4a46" /><span style={{ position: 'absolute', top: '-2px', right: '-2px', width: '6px', height: '6px', backgroundColor: '#ba1a1a', borderRadius: '50%', border: '2px solid #f4fbf8' }} /></span>
                <span style={{ fontSize: '9px', color: 'rgba(60,74,70,0.7)' }}>Notifications</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' as const, alignItems: 'center', padding: '0 16px', cursor: 'pointer', borderLeft: '1px solid rgba(186,202,197,0.2)', marginLeft: '8px' }}>
                <User size={20} color="#3c4a46" />
                <span style={{ fontSize: '11px', color: '#3c4a46' }}>Login / Sign up</span>
              </div>
              <button style={{ backgroundColor: '#006b5f', color: 'white', padding: '10px 24px', borderRadius: '100px', border: 'none', cursor: 'pointer', fontSize: '13px', fontWeight: 700, marginLeft: '8px', textTransform: 'uppercase' as const }}>
                Place your 100% FREE Ad
              </button>
            </div>
          </div>
        </div>
        <div style={{ borderTop: '1px solid rgba(186,202,197,0.2)' }}>
          <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 40px', display: 'flex', alignItems: 'center', gap: '32px', height: '48px' }}>
            {navLinks.map((l, i) => (
              <span key={l} style={{ fontSize: '13px', fontWeight: i === 0 ? 700 : 600, color: i === 0 ? '#006b5f' : '#3c4a46', cursor: 'pointer', borderBottom: i === 0 ? '2px solid #006b5f' : 'none', height: '100%', display: 'flex', alignItems: 'center' }}>{l}</span>
            ))}
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section style={{ position: 'relative', height: '500px', width: '100%', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <img src="https://images.pexels.com/photos/1429775/pexels-photo-1429775.jpeg?auto=compress&w=1600" alt="Curated Commercial Transport" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(244,251,248,0.4), rgba(244,251,248,0.2), #f4fbf8)' }} />
        <div style={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: '1440px', margin: '0 auto', padding: '0 40px', display: 'flex', flexDirection: 'column' as const, alignItems: 'center' }}>
          <h1 style={{ fontSize: '48px', fontWeight: 700, color: '#161d1b', marginBottom: '24px', textAlign: 'center' as const, textShadow: '0 2px 8px rgba(244,251,248,0.5)' }}>Curated Commercial Transport</h1>
          <div style={{ width: '100%', maxWidth: '720px', backgroundColor: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.4)', borderRadius: '2rem', padding: '8px', display: 'flex', gap: '8px', boxShadow: '0 8px 32px rgba(0,107,95,0.05)' }}>
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', backgroundColor: 'rgba(244,251,248,0.5)', borderRadius: '100px', padding: '0 16px' }}>
              <Search size={20} color="#3c4a46" style={{ marginRight: '12px' }} />
              <input placeholder="Search trucks, vans, or fleet vehicles..." style={{ border: 'none', outline: 'none', background: 'transparent', width: '100%', padding: '12px 0', fontFamily: 'inherit', fontSize: '15px' }} />
            </div>
            <div style={{ width: '1px', backgroundColor: 'rgba(186,202,197,0.3)' }} />
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', backgroundColor: 'rgba(244,251,248,0.5)', borderRadius: '100px', padding: '0 16px' }}>
              <MapPin size={20} color="#3c4a46" style={{ marginRight: '12px' }} />
              <select style={{ border: 'none', outline: 'none', background: 'transparent', width: '100%', padding: '12px 0', fontFamily: 'inherit', fontSize: '15px', appearance: 'none' as const, cursor: 'pointer' }}>
                <option>All Morocco</option><option>Casablanca</option><option>Rabat</option><option>Marrakech</option><option>Tangier</option>
              </select>
              <ChevronDown size={20} color="#3c4a46" style={{ pointerEvents: 'none' as const }} />
            </div>
            <button style={{ backgroundColor: '#006b5f', color: 'white', borderRadius: '100px', padding: '0 32px', border: 'none', cursor: 'pointer', fontSize: '13px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Search size={20} /> Search
            </button>
          </div>
        </div>
      </section>

      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 40px' }}>
        {/* SECONDARY FILTER PILL BAR */}
        <div style={{ marginTop: '-48px', position: 'relative', zIndex: 20, marginBottom: '32px' }}>
          <div style={{ backgroundColor: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(12px)', border: '1px solid rgba(186,202,197,0.3)', borderRadius: '40px', boxShadow: '0 8px 24px rgba(0,0,0,0.08)', display: 'flex', alignItems: 'center', padding: '6px' }}>
            {[
              { label: 'Cities', value: 'Rabat', icon: ChevronDown },
              { label: 'Makes & Models', value: 'Search anything...', icon: Search, flex: 1.5 },
              { label: 'Years', value: 'Any year', icon: undefined, emoji: '📅' },
              { label: 'Kilometers', value: 'Select range', icon: undefined, emoji: '📏' },
              { label: 'Price (MAD)', value: 'Select', icon: ChevronDown },
              { label: 'Filters', value: '1 selected', icon: Sliders, last: true },
            ].map((f, i) => (
              <div key={f.label} style={{ flex: f.flex || 1, display: 'flex', alignItems: 'center', padding: '0 24px', borderRight: f.last ? 'none' : '1px solid rgba(186,202,197,0.2)' }}>
                <div style={{ display: 'flex', flexDirection: 'column' as const, width: '100%' }}>
                  <span style={{ fontSize: '10px', fontWeight: 700, color: '#3c4a46', textTransform: 'uppercase' as const, letterSpacing: '0.05em', marginBottom: '2px' }}>{f.label}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '15px', fontWeight: 500, color: '#161d1b' }}>{f.value}</span>
                    {f.icon && <f.icon size={18} color="#2dd4bf" />}
                    {f.emoji && <span style={{ fontSize: '16px', opacity: 0.7 }}>{f.emoji}</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* BREADCRUMBS */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'rgba(60,74,70,0.7)', marginBottom: '24px' }}>
          <span style={{ cursor: 'pointer' }}>Rabat</span><ChevronRight size={16} />
          <span style={{ cursor: 'pointer' }}>Motors</span><ChevronRight size={16} />
          <span style={{ color: '#161d1b' }}>Commercial Vehicles</span>
        </nav>

        {/* RESULTS HEADER */}
        <div style={{ display: 'flex', flexWrap: 'wrap' as const, justifyContent: 'space-between', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 600 }}>Trucks &amp; Vans for sale in Rabat • <span style={{ color: 'rgba(60,74,70,0.7)', fontWeight: 500 }}>2,972 listings</span></h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', borderRadius: '6px', border: '1px solid rgba(186,202,197,0.3)', backgroundColor: 'transparent', fontSize: '13px', fontWeight: 600, color: '#161d1b', cursor: 'pointer' }}>
              <ChevronDown size={18} /> Sort: Default
            </button>
            <button style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', borderRadius: '6px', border: '1px solid rgba(186,202,197,0.3)', backgroundColor: 'transparent', fontSize: '13px', fontWeight: 600, color: '#161d1b', cursor: 'pointer' }}>
              <Bookmark size={18} /> Save Search
            </button>
          </div>
        </div>

        {/* SELLER FILTER TOGGLE BAR */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px', flexWrap: 'wrap' as const }}>
          {[
            { label: 'All Sellers', icon: Users },
            { label: 'SouKni Members', icon: User },
            { label: 'SouKni Pro', icon: ShieldCheck },
          ].map(s => (
            <button key={s.label} onClick={() => setActiveSeller(s.label)}
              style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', borderRadius: '8px', fontSize: '13px', fontWeight: 600, cursor: 'pointer', border: activeSeller === s.label ? '1px solid #006b5f' : '1px solid rgba(186,202,197,0.3)', backgroundColor: activeSeller === s.label ? 'rgba(45,212,191,0.15)' : '#eef5f2', color: activeSeller === s.label ? '#006b5f' : '#3c4a46' }}>
              <s.icon size={20} /> {s.label}
            </button>
          ))}
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '12px', backgroundColor: '#eef5f2', border: '1px solid rgba(186,202,197,0.3)', padding: '8px 16px', borderRadius: '8px' }}>
            <span style={{ fontSize: '13px', fontWeight: 600, color: '#3c4a46' }}>Show Diamond Certified First</span>
            <button onClick={() => setDiamondFirst(!diamondFirst)} style={{ position: 'relative', width: '44px', height: '24px', borderRadius: '100px', backgroundColor: diamondFirst ? '#006b5f' : '#dde4e1', border: 'none', cursor: 'pointer' }}>
              <div style={{ position: 'absolute', top: '2px', left: diamondFirst ? '22px' : '2px', width: '20px', height: '20px', borderRadius: '50%', backgroundColor: 'white', transition: 'left 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }} />
            </button>
          </div>
        </div>

        {/* CATEGORY PILLS */}
        <div style={{ display: 'flex', gap: '12px', overflowX: 'auto' as const, paddingBottom: '16px', marginBottom: '32px' }}>
          {categoryPills.map(c => (
            <button key={c.label} onClick={() => setActiveCategory(c.label)}
              style={{ whiteSpace: 'nowrap' as const, padding: '10px 20px', borderRadius: '100px', fontSize: '13px', fontWeight: 600, cursor: 'pointer', boxShadow: activeCategory === c.label ? '0 1px 3px rgba(0,0,0,0.1)' : 'none', border: activeCategory === c.label ? 'none' : '1px solid rgba(186,202,197,0.3)', backgroundColor: activeCategory === c.label ? '#006b5f' : '#e8efec', color: activeCategory === c.label ? 'white' : '#161d1b' }}>
              {c.label}
            </button>
          ))}
          <button style={{ whiteSpace: 'nowrap' as const, padding: '10px 20px', borderRadius: '100px', fontSize: '13px', fontWeight: 600, cursor: 'pointer', border: '1px solid rgba(186,202,197,0.3)', backgroundColor: '#e8efec', color: '#161d1b', display: 'flex', alignItems: 'center', gap: '4px' }}>
            View More <ChevronDown size={18} />
          </button>
        </div>

        {/* FEATURED COMMERCIAL VANS */}
        <div style={{ display: 'flex', flexWrap: 'wrap' as const, justifyContent: 'space-between', alignItems: 'flex-end', gap: '16px', marginBottom: '32px' }}>
          <div>
            <h2 style={{ fontSize: '24px', fontWeight: 600 }}>Featured Commercial Vans</h2>
            <p style={{ fontSize: '16px', color: '#3c4a46', marginTop: '4px' }}>2,450 professional listings in Rabat</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', borderRadius: '100px', border: '1px solid rgba(186,202,197,0.5)', backgroundColor: '#eef5f2', fontSize: '13px', fontWeight: 600, color: '#161d1b', cursor: 'pointer' }}>
              <Sliders size={18} /> Sort: Default
            </button>
            <button style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', borderRadius: '100px', border: '1px solid rgba(186,202,197,0.5)', backgroundColor: '#eef5f2', fontSize: '13px', fontWeight: 600, color: '#161d1b', cursor: 'pointer' }}>
              <Sliders size={18} /> Filters (1)
            </button>
          </div>
        </div>
        <VehicleGrid vehicles={featuredVans} />

        {/* FEATURED HEAVY TRUCKS */}
        <div style={{ display: 'flex', flexWrap: 'wrap' as const, justifyContent: 'space-between', alignItems: 'flex-end', gap: '16px', marginTop: '48px', marginBottom: '32px' }}>
          <div>
            <h2 style={{ fontSize: '24px', fontWeight: 600 }}>Featured Heavy Trucks</h2>
            <p style={{ fontSize: '16px', color: '#3c4a46', marginTop: '4px' }}>Premium heavy-duty transport solutions</p>
          </div>
          <button style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', borderRadius: '100px', border: '1px solid rgba(186,202,197,0.5)', backgroundColor: '#eef5f2', fontSize: '13px', fontWeight: 600, color: '#161d1b', cursor: 'pointer' }}>
            <Sliders size={18} /> Sort: Default
          </button>
        </div>
        <VehicleGrid vehicles={featuredTrucks} ctaLabel="Message" />

        {/* AUTO PRO BANNER */}
        <section style={{ marginBottom: '32px' }}>
          <div style={{ position: 'relative', width: '100%', height: '400px', borderRadius: '40px', overflow: 'hidden' }}>
            <img src="https://images.pexels.com/photos/4391470/pexels-photo-4391470.jpeg?auto=compress&w=1200" alt="SouKni Auto Pro" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.7s' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(0,0,0,0.8), rgba(0,0,0,0.4), transparent)', display: 'flex', flexDirection: 'column' as const, justifyContent: 'center', padding: '0 64px' }}>
              <div style={{ maxWidth: '560px' }}>
                <h2 style={{ color: 'white', fontSize: '48px', fontWeight: 700, marginBottom: '8px', letterSpacing: '-0.02em' }}>SouKni Auto Pro</h2>
                <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '18px', marginBottom: '32px' }}>The Gold Standard for Premium Automotive Services</p>
                <button style={{ backgroundColor: '#2dd4bf', color: '#00574d', padding: '16px 32px', borderRadius: '100px', border: 'none', fontWeight: 700, fontSize: '13px', cursor: 'pointer', textTransform: 'uppercase' as const, letterSpacing: '0.05em' }}>
                  Explore Motors
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* EXTRA DISCOVERY ROWS */}
        <VehicleGrid vehicles={extraRow1} />
        <VehicleGrid vehicles={extraRow2} ctaLabel="Message" />
        <VehicleGrid vehicles={extraRow3} ctaLabel="Message" />

        {/* PAGINATION */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', margin: '40px 0' }}>
          <button style={{ width: '40px', height: '40px', borderRadius: '50%', border: '1px solid rgba(186,202,197,0.3)', backgroundColor: 'transparent', color: '#161d1b', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><ChevronLeft size={20} /></button>
          <button style={{ width: '40px', height: '40px', borderRadius: '50%', border: 'none', backgroundColor: '#2dd4bf', color: '#00574d', fontWeight: 700, fontSize: '13px', cursor: 'pointer' }}>1</button>
          {[2, 3].map(n => (
            <button key={n} style={{ width: '40px', height: '40px', borderRadius: '50%', border: '1px solid rgba(186,202,197,0.3)', backgroundColor: 'transparent', color: '#161d1b', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>{n}</button>
          ))}
          <span style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(60,74,70,0.7)', fontSize: '13px' }}>...</span>
          <button style={{ width: '40px', height: '40px', borderRadius: '50%', border: '1px solid rgba(186,202,197,0.3)', backgroundColor: 'transparent', color: '#161d1b', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>12</button>
          <button style={{ width: '40px', height: '40px', borderRadius: '50%', border: '1px solid rgba(186,202,197,0.3)', backgroundColor: 'transparent', color: '#161d1b', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><ChevronRight size={20} /></button>
        </div>
      </div>

      {/* DIAMOND MEMBER FOOTER BANNER */}
      <section style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 40px', marginBottom: '64px' }}>
        <div style={{ position: 'relative', width: '100%', height: '400px', borderRadius: '40px', overflow: 'hidden' }}>
          <img src="https://images.pexels.com/photos/2199293/pexels-photo-2199293.jpeg?auto=compress&w=1200" alt="Diamond Member Banner" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(0,0,0,0.6), rgba(0,0,0,0.3), transparent)', display: 'flex', flexDirection: 'column' as const, justifyContent: 'center', padding: '0 64px' }}>
            <div style={{ maxWidth: '560px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                <Diamond size={32} color="#62fae3" />
                <span style={{ color: '#62fae3', fontSize: '13px', fontWeight: 600, textTransform: 'uppercase' as const, letterSpacing: '0.1em' }}>Exclusive Status</span>
              </div>
              <h2 style={{ color: 'white', fontSize: '48px', fontWeight: 700, marginBottom: '8px', letterSpacing: '-0.02em' }}>Become a SouKni Diamond Certified Member</h2>
              <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '18px', marginBottom: '32px' }}>Get the Diamond Certified status and unlock exclusive benefits for premium commercial transport sellers.</p>
              <button style={{ backgroundColor: '#006b5f', color: 'white', padding: '16px 32px', borderRadius: '100px', border: 'none', fontWeight: 700, fontSize: '13px', cursor: 'pointer', textTransform: 'uppercase' as const, letterSpacing: '0.05em' }}>
                Get Certified Now
              </button>
            </div>
          </div>
          <div style={{ position: 'absolute', top: '16px', right: '16px', backgroundColor: 'rgba(244,251,248,0.3)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.2)', padding: '8px 16px', borderRadius: '100px' }}>
            <span style={{ color: 'white', fontSize: '11px', fontWeight: 600, textTransform: 'uppercase' as const, letterSpacing: '0.1em' }}>Diamond Certified</span>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ backgroundColor: '#7A7A7A', padding: '64px 0' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 40px' }}>
          {/* TOP: BRANDING + NEWSLETTER */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', marginBottom: '48px', paddingBottom: '48px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
            <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '16px' }}>
              <span style={{ fontSize: '24px', fontWeight: 900, color: 'white', alignSelf: 'flex-start' }}>SouKni</span>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '18px', fontStyle: 'italic' as const }}>The Market in your Pocket</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '16px' }}>
                {[Facebook, Globe, Camera, Briefcase, Video].map((Icon, i) => (
                  <a key={i} href="#" style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', textDecoration: 'none' }}><Icon size={20} /></a>
                ))}
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '16px' }}>
              <h4 style={{ color: 'white', fontSize: '24px', fontWeight: 600 }}>Join our Newsletter</h4>
              <div style={{ display: 'flex', gap: '12px' }}>
                <input placeholder="Enter your email" type="email" style={{ flex: 1, backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '12px 16px', color: 'white', outline: 'none', fontFamily: 'inherit' }} />
                <button style={{ backgroundColor: '#2dd4bf', color: '#00201c', fontWeight: 700, padding: '12px 32px', borderRadius: '8px', border: 'none', cursor: 'pointer' }}>Subscribe</button>
              </div>
            </div>
          </div>

          {/* MIDDLE: DIRECTORY + APPS */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr', gap: '32px', marginBottom: '48px' }}>
            <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '16px' }}>
              <h5 style={{ color: 'white', fontWeight: 700, textTransform: 'uppercase' as const, letterSpacing: '0.05em', fontSize: '13px' }}>Marketplace</h5>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column' as const, gap: '8px' }}>
                {['Motors', 'Property', 'The Vault', 'Jobs', 'Services', 'Fashion', 'Home & Living'].map(l => <li key={l}><a href="#" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: '14px' }}>{l}</a></li>)}
              </ul>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '16px' }}>
              <h5 style={{ color: 'white', fontWeight: 700, textTransform: 'uppercase' as const, letterSpacing: '0.05em', fontSize: '13px' }}>Company</h5>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column' as const, gap: '8px' }}>
                {['About Us', 'Careers', 'Press', 'Sustainability', 'Legal'].map(l => <li key={l}><a href="#" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: '14px' }}>{l}</a></li>)}
              </ul>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '16px' }}>
              <h5 style={{ color: 'white', fontWeight: 700, textTransform: 'uppercase' as const, letterSpacing: '0.05em', fontSize: '13px' }}>Support</h5>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column' as const, gap: '8px' }}>
                {['Help Center', 'Safety Tips', 'Trust & Safety', 'Contact Us'].map(l => <li key={l}><a href="#" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: '14px' }}>{l}</a></li>)}
              </ul>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '16px' }}>
              <h5 style={{ color: 'white', fontWeight: 700, textTransform: 'uppercase' as const, letterSpacing: '0.05em', fontSize: '13px' }}>Resources</h5>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column' as const, gap: '8px' }}>
                {['Market Trends', 'App Download', 'Advertising'].map(l => <li key={l}><a href="#" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: '14px' }}>{l}</a></li>)}
              </ul>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '16px' }}>
              <h5 style={{ color: 'white', fontWeight: 700, textTransform: 'uppercase' as const, letterSpacing: '0.05em', fontSize: '13px' }}>App Downloads</h5>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '8px' }}>
                {[
                  { icon: Apple, top: 'Download on the', bottom: 'App Store' },
                  { icon: PlayCircle, top: 'Get it on', bottom: 'Google Play' },
                  { icon: Store, top: 'Explore on', bottom: 'AppGallery' },
                  { icon: Smartphone, top: 'Available on', bottom: 'Galaxy Store' },
                ].map(a => (
                  <a key={a.bottom} href="#" style={{ display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '8px', borderRadius: '8px', textDecoration: 'none', color: 'white' }}>
                    <a.icon size={20} color="rgba(255,255,255,0.8)" />
                    <span style={{ fontSize: '10px', lineHeight: 1.3 }}>{a.top}<br /><b style={{ fontSize: '12px' }}>{a.bottom}</b></span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* BOTTOM */}
          <div style={{ paddingTop: '32px', borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', flexWrap: 'wrap' as const, justifyContent: 'center', gap: '24px' }}>
            <a href="#" style={{ color: 'rgba(255,255,255,0.4)', textDecoration: 'none', fontSize: '12px' }}>Privacy Policy</a>
            <a href="#" style={{ color: 'rgba(255,255,255,0.4)', textDecoration: 'none', fontSize: '12px' }}>Terms of Service</a>
            <a href="#" style={{ color: 'rgba(255,255,255,0.4)', textDecoration: 'none', fontSize: '12px' }}>Cookies</a>
            <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '12px' }}>© 2026 SouKni Marketplace. All rights reserved.</span>
          </div>
        </div>
      </footer>

      {/* ── MOBILE BOTTOM NAV ── */}
      <nav style={{ position: 'fixed', bottom: 0, left: 0, width: '100%', backgroundColor: 'rgba(244,251,248,0.7)', backdropFilter: 'blur(40px)', borderTop: '1px solid rgba(255,255,255,0.2)', zIndex: 50, display: 'none', alignItems: 'center', justifyContent: 'space-around', padding: '12px 16px', borderRadius: '12px 12px 0 0', boxShadow: '0 -8px 24px rgba(0,0,0,0.05)' }} className="md:hidden">
        <div style={{ display: 'flex', flexDirection: 'column' as const, alignItems: 'center', color: '#3c4a46' }}>
          <Compass size={22} /><span style={{ fontSize: '10px' }}>Discover</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' as const, alignItems: 'center', color: '#006b5f', backgroundColor: 'rgba(45,212,191,0.3)', borderRadius: '100px', padding: '4px 16px' }}>
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
