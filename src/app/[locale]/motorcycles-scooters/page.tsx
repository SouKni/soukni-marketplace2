'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { MapPin, Heart, Search, ChevronDown, Sliders, MessageCircle, Globe, ChevronLeft, ChevronRight, Bell, User, Bookmark, Users, ShieldCheck, BadgeCheck, Diamond, Apple, PlayCircle, Store, Smartphone, Facebook, Camera, Briefcase, Video, Compass, Car, Gem, Star } from 'lucide-react'

const navLinks = ['Motors', 'Property', 'The Vault', 'Home & Living', 'Fashion', 'Jobs', 'Mobiles & Computers', 'Services']

const categoryPills = [
  { label: 'All', active: true },
  { label: 'Sportbikes' },
  { label: 'Cruisers' },
  { label: 'Scooters' },
  { label: 'Adventure' },
  { label: 'Off-road' },
  { label: 'Custom' },
]

type Bike = {
  id: string
  title: string
  price: string
  location?: string
  year?: string
  km?: string
  badge?: 'DIAMOND MEMBER' | 'VERIFIED'
  image: string
}

const superbikes: Bike[] = [
  { id: '1', title: '2024 Ducati Panigale V4', price: '280,000', image: 'https://images.pexels.com/photos/2393816/pexels-photo-2393816.jpeg?auto=compress&w=600' },
  { id: '2', title: '2024 BMW S1000RR', price: '245,000', image: 'https://images.pexels.com/photos/2393835/pexels-photo-2393835.jpeg?auto=compress&w=600' },
  { id: '3', title: '2024 Kawasaki Ninja ZX-10R', price: '210,000', image: 'https://images.pexels.com/photos/1416382/pexels-photo-1416382.jpeg?auto=compress&w=600' },
  { id: '4', title: '2024 Yamaha YZF-R1', price: '195,000', image: 'https://images.pexels.com/photos/2393835/pexels-photo-2393835.jpeg?auto=compress&w=600' },
]

const urbanAdventure: Bike[] = [
  { id: '5', title: '2024 Honda X-ADV', price: '145,000', image: 'https://images.pexels.com/photos/2549942/pexels-photo-2549942.jpeg?auto=compress&w=600' },
  { id: '6', title: '2024 BMW R1250GS', price: '225,000', image: 'https://images.pexels.com/photos/1149831/pexels-photo-1149831.jpeg?auto=compress&w=600' },
  { id: '7', title: '2024 Vespa GTS 300', price: '85,000', image: 'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&w=600' },
  { id: '8', title: '2024 Triumph Tiger 900', price: '165,000', image: 'https://images.pexels.com/photos/2393835/pexels-photo-2393835.jpeg?auto=compress&w=600' },
]

const certifiedPreOwned: Bike[] = [
  { id: '9', title: '2024 Suzuki Hayabusa', price: '215,000', badge: 'DIAMOND MEMBER', image: 'https://images.pexels.com/photos/1416382/pexels-photo-1416382.jpeg?auto=compress&w=600' },
  { id: '10', title: '2024 Ducati Diavel V4', price: '285,000', badge: 'VERIFIED', image: 'https://images.pexels.com/photos/2393816/pexels-photo-2393816.jpeg?auto=compress&w=600' },
  { id: '11', title: '2023 Harley-Davidson Fat Boy 114', price: '260,000', badge: 'DIAMOND MEMBER', image: 'https://images.pexels.com/photos/2393816/pexels-photo-2393816.jpeg?auto=compress&w=600' },
  { id: '12', title: '2024 Triumph Rocket 3 Storm R', price: '310,000', badge: 'VERIFIED', image: 'https://images.pexels.com/photos/2393835/pexels-photo-2393835.jpeg?auto=compress&w=600' },
]

const discoveryRow: Bike[] = [
  { id: '13', title: '2024 Harley-Davidson Fat Boy', price: '260,000', image: 'https://images.pexels.com/photos/2393816/pexels-photo-2393816.jpeg?auto=compress&w=600' },
  { id: '14', title: '2024 KTM 1290 Super Duke', price: '185,000', image: 'https://images.pexels.com/photos/1149831/pexels-photo-1149831.jpeg?auto=compress&w=600' },
  { id: '15', title: '2024 Suzuki Hayabusa', price: '215,000', image: 'https://images.pexels.com/photos/1416382/pexels-photo-1416382.jpeg?auto=compress&w=600' },
  { id: '16', title: '2024 Indian Scout Rogue', price: '175,000', image: 'https://images.pexels.com/photos/2393816/pexels-photo-2393816.jpeg?auto=compress&w=600' },
  { id: '17', title: '2024 Aprilia RS 660', price: '135,000', image: 'https://images.pexels.com/photos/2393835/pexels-photo-2393835.jpeg?auto=compress&w=600' },
  { id: '18', title: '2024 Yamaha TMAX', price: '125,000', image: 'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&w=600' },
  { id: '19', title: '2024 Honda Gold Wing', price: '340,000', image: 'https://images.pexels.com/photos/2549942/pexels-photo-2549942.jpeg?auto=compress&w=600' },
  { id: '20', title: '2024 Royal Enfield Interceptor', price: '75,000', image: 'https://images.pexels.com/photos/1149831/pexels-photo-1149831.jpeg?auto=compress&w=600' },
]

const expandedRow1: Bike[] = [
  { id: '21', title: '2024 KTM RC 390', price: '72,000', year: '2024', km: '0 KM', location: 'Casablanca', badge: 'DIAMOND MEMBER', image: 'https://images.pexels.com/photos/1149831/pexels-photo-1149831.jpeg?auto=compress&w=600' },
  { id: '22', title: '2024 Honda CBR650R', price: '105,000', year: '2024', km: '500 KM', location: 'Rabat', badge: 'VERIFIED', image: 'https://images.pexels.com/photos/1416382/pexels-photo-1416382.jpeg?auto=compress&w=600' },
  { id: '23', title: '2023 Yamaha MT-09 SP', price: '132,000', year: '2023', km: '1,200 KM', location: 'Tangier', badge: 'DIAMOND MEMBER', image: 'https://images.pexels.com/photos/2393835/pexels-photo-2393835.jpeg?auto=compress&w=600' },
  { id: '24', title: '2024 Ducati Scrambler Icon', price: '118,000', year: '2024', km: '0 KM', location: 'Marrakech', badge: 'VERIFIED', image: 'https://images.pexels.com/photos/2393816/pexels-photo-2393816.jpeg?auto=compress&w=600' },
]

const expandedRow2: Bike[] = [
  { id: '25', title: '2024 BMW F900XR', price: '158,000', year: '2024', km: '0 KM', location: 'Casablanca', badge: 'DIAMOND MEMBER', image: 'https://images.pexels.com/photos/1149831/pexels-photo-1149831.jpeg?auto=compress&w=600' },
  { id: '26', title: '2023 Suzuki V-Strom 650', price: '98,000', year: '2023', km: '4,500 KM', location: 'Agadir', badge: 'VERIFIED', image: 'https://images.pexels.com/photos/2549942/pexels-photo-2549942.jpeg?auto=compress&w=600' },
  { id: '27', title: '2024 Kawasaki Z900', price: '112,000', year: '2024', km: '0 KM', location: 'Rabat', badge: 'DIAMOND MEMBER', image: 'https://images.pexels.com/photos/1416382/pexels-photo-1416382.jpeg?auto=compress&w=600' },
  { id: '28', title: '2024 Triumph Trident 660', price: '89,000', year: '2024', km: '150 KM', location: 'Casablanca', badge: 'VERIFIED', image: 'https://images.pexels.com/photos/2393835/pexels-photo-2393835.jpeg?auto=compress&w=600' },
]

function SimpleBikeCard({ b }: { b: Bike }) {
  return (
    <article style={{ backgroundColor: 'rgba(244,251,248,0.7)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.4)', borderRadius: '0.75rem', overflow: 'hidden', display: 'flex', flexDirection: 'column' as const, transition: 'transform 0.3s' }}
      onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
      onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
    >
      <div style={{ position: 'relative', aspectRatio: '4/3', width: '100%', backgroundColor: '#e2eae7', overflow: 'hidden' }}>
        <img src={b.image} alt={b.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }}
          onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
        />
      </div>
      <div style={{ padding: '16px', display: 'flex', flexDirection: 'column' as const, flex: 1 }}>
        <h3 style={{ fontSize: '13px', fontWeight: 600, color: '#161d1b', marginBottom: '8px', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical' as const }}>{b.title}</h3>
        <div style={{ fontSize: '20px', fontWeight: 700, color: '#161d1b', marginBottom: '12px' }}>MAD {b.price}</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginTop: 'auto' }}>
          <button style={{ border: '1px solid #006b5f', color: '#006b5f', backgroundColor: 'transparent', fontSize: '13px', fontWeight: 600, padding: '8px', borderRadius: '100px', cursor: 'pointer' }}>Chat</button>
          <button style={{ backgroundColor: '#25D366', color: 'white', border: 'none', fontSize: '13px', fontWeight: 600, padding: '8px', borderRadius: '100px', cursor: 'pointer' }}>WhatsApp</button>
        </div>
      </div>
    </article>
  )
}

function BadgedBikeCard({ b, ctaLabel = 'Chat' }: { b: Bike; ctaLabel?: string }) {
  const [saved, setSaved] = useState(false)
  return (
    <article style={{ backgroundColor: 'rgba(244,251,248,0.7)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.4)', borderRadius: '0.75rem', overflow: 'hidden', display: 'flex', flexDirection: 'column' as const, transition: 'transform 0.3s' }}
      onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
      onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
    >
      <div style={{ position: 'relative', aspectRatio: '4/3', width: '100%', backgroundColor: '#e2eae7', overflow: 'hidden' }}>
        {b.badge && (
          <div style={{ position: 'absolute', top: '8px', left: '8px', zIndex: 10, backgroundColor: '#006b5f', color: 'white', fontSize: '10px', fontWeight: 700, padding: '4px 8px', borderRadius: '100px', boxShadow: '0 1px 3px rgba(0,0,0,0.15)' }}>
            {b.badge}
          </div>
        )}
        <button onClick={() => setSaved(!saved)} style={{ position: 'absolute', top: '8px', right: '8px', zIndex: 10, width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(8px)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: saved ? '#ba1a1a' : '#3c4a46' }}>
          <Heart size={18} fill={saved ? '#ba1a1a' : 'none'} />
        </button>
        <img src={b.image} alt={b.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }}
          onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
        />
      </div>
      <div style={{ padding: '16px', display: 'flex', flexDirection: 'column' as const, flex: 1 }}>
        <h3 style={{ fontSize: '13px', fontWeight: 600, color: '#161d1b', marginBottom: '4px', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical' as const }}>{b.title}</h3>
        {(b.year || b.km || b.location) && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: 'rgba(60,74,70,0.7)', marginBottom: '4px' }}>
            {b.year && <span>{b.year}</span>}{b.year && <span>•</span>}
            {b.km && <span>{b.km}</span>}{b.km && <span>•</span>}
            {b.location && <span>{b.location}</span>}
          </div>
        )}
        <div style={{ fontSize: '20px', fontWeight: 700, color: '#006b5f', marginBottom: '12px' }}>MAD {b.price}</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginTop: 'auto' }}>
          <button style={{ border: '1px solid #006b5f', color: '#006b5f', backgroundColor: 'transparent', fontSize: '13px', fontWeight: 600, padding: '8px', borderRadius: '100px', cursor: 'pointer' }}>{ctaLabel}</button>
          <button style={{ backgroundColor: '#25D366', color: 'white', border: 'none', fontSize: '13px', fontWeight: 600, padding: '8px', borderRadius: '100px', cursor: 'pointer' }}>WhatsApp</button>
        </div>
      </div>
    </article>
  )
}

function SimpleGrid({ bikes }: { bikes: Bike[] }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '16px', marginBottom: '32px' }}>
      {bikes.map(b => <SimpleBikeCard key={b.id} b={b} />)}
    </div>
  )
}

function BadgedGrid({ bikes, ctaLabel }: { bikes: Bike[]; ctaLabel?: string }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '16px', marginBottom: '32px' }}>
      {bikes.map(b => <BadgedBikeCard key={b.id} b={b} ctaLabel={ctaLabel} />)}
    </div>
  )
}

export default function MotorcyclesScootersPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = React.use(params)
  const [activeCategory, setActiveCategory] = useState('All')
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
        <img src="https://images.pexels.com/photos/2393816/pexels-photo-2393816.jpeg?auto=compress&w=1600" alt="Motorcycles & Scooters" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(244,251,248,0.4), rgba(244,251,248,0.2), #f4fbf8)' }} />
        <div style={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: '1440px', margin: '0 auto', padding: '0 40px', display: 'flex', flexDirection: 'column' as const, alignItems: 'center' }}>
          <h1 style={{ fontSize: '44px', fontWeight: 700, color: '#161d1b', marginBottom: '24px', textAlign: 'center' as const, textShadow: '0 2px 8px rgba(244,251,248,0.5)', maxWidth: '800px' }}>New and Pre-Owned Motorcycles &amp; Scooters for sale in Morocco</h1>
          <div style={{ width: '100%', maxWidth: '720px', backgroundColor: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.4)', borderRadius: '2rem', padding: '8px', display: 'flex', gap: '8px', boxShadow: '0 8px 32px rgba(0,107,95,0.05)' }}>
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', backgroundColor: 'rgba(244,251,248,0.5)', borderRadius: '100px', padding: '0 16px' }}>
              <Search size={20} color="#3c4a46" style={{ marginRight: '12px' }} />
              <input placeholder="Search bikes, scooters, or gear..." style={{ border: 'none', outline: 'none', background: 'transparent', width: '100%', padding: '12px 0', fontFamily: 'inherit', fontSize: '15px' }} />
            </div>
            <div style={{ width: '1px', backgroundColor: 'rgba(186,202,197,0.3)' }} />
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', backgroundColor: 'rgba(244,251,248,0.5)', borderRadius: '100px', padding: '0 16px' }}>
              <MapPin size={20} color="#3c4a46" style={{ marginRight: '12px' }} />
              <select style={{ border: 'none', outline: 'none', background: 'transparent', width: '100%', padding: '12px 0', fontFamily: 'inherit', fontSize: '15px', appearance: 'none' as const, cursor: 'pointer' }}>
                <option>All Morocco</option><option>Casablanca</option><option>Rabat</option>
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
              { label: 'City', value: 'All Morocco', icon: ChevronDown },
              { label: 'Make/Model', value: 'Search brands...', icon: Search, flex: 1.5 },
              { label: 'Engine Size (CC)', value: 'Any CC', icon: undefined, emoji: '⚡' },
              { label: 'Price Range', value: 'Select', icon: ChevronDown },
              { label: 'Filters', value: 'All Filters', icon: Sliders, last: true },
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
          <span style={{ cursor: 'pointer' }}>Home</span><ChevronRight size={16} />
          <span style={{ cursor: 'pointer' }}>Motors</span><ChevronRight size={16} />
          <span style={{ color: '#161d1b' }}>Motorcycles &amp; Scooters</span>
        </nav>

        {/* RESULTS HEADER */}
        <div style={{ display: 'flex', flexWrap: 'wrap' as const, justifyContent: 'space-between', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 600 }}>Motorcycles &amp; Scooters in Morocco • <span style={{ color: 'rgba(60,74,70,0.7)', fontWeight: 500 }}>2,972 listings</span></h2>
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
        </div>

        {/* FEATURED SUPERBIKES */}
        <div style={{ display: 'flex', flexWrap: 'wrap' as const, justifyContent: 'space-between', alignItems: 'flex-end', gap: '16px', marginBottom: '32px' }}>
          <div>
            <h2 style={{ fontSize: '24px', fontWeight: 600 }}>Featured High-Performance Superbikes</h2>
            <p style={{ fontSize: '16px', color: '#3c4a46', marginTop: '4px' }}>Top-tier speed and precision engineering</p>
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
        <SimpleGrid bikes={superbikes} />

        {/* PREMIUM SCOOTERS & ADVENTURE */}
        <div style={{ display: 'flex', flexWrap: 'wrap' as const, justifyContent: 'space-between', alignItems: 'flex-end', gap: '16px', marginTop: '48px', marginBottom: '32px' }}>
          <div>
            <h2 style={{ fontSize: '24px', fontWeight: 600 }}>Premium Scooters &amp; Adventure Motorcycles</h2>
            <p style={{ fontSize: '16px', color: '#3c4a46', marginTop: '4px' }}>Versatile rides for city streets and beyond</p>
          </div>
          <button style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', borderRadius: '100px', border: '1px solid rgba(186,202,197,0.5)', backgroundColor: '#eef5f2', fontSize: '13px', fontWeight: 600, color: '#161d1b', cursor: 'pointer' }}>
            <Sliders size={18} /> Sort: Default
          </button>
        </div>
        <SimpleGrid bikes={urbanAdventure} />

        {/* FEATURED CERTIFIED PRE-OWNED */}
        <div style={{ display: 'flex', flexWrap: 'wrap' as const, justifyContent: 'space-between', alignItems: 'flex-end', gap: '16px', marginTop: '48px', marginBottom: '32px' }}>
          <div>
            <h2 style={{ fontSize: '24px', fontWeight: 600 }}>Featured Certified Pre-Owned Motorcycles</h2>
            <p style={{ fontSize: '16px', color: '#3c4a46', marginTop: '4px' }}>Rigorous inspections for ultimate peace of mind</p>
          </div>
          <button style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', borderRadius: '100px', border: '1px solid rgba(186,202,197,0.5)', backgroundColor: '#eef5f2', fontSize: '13px', fontWeight: 600, color: '#161d1b', cursor: 'pointer' }}>
            <Sliders size={18} /> Sort: Default
          </button>
        </div>
        <BadgedGrid bikes={certifiedPreOwned} />

        {/* MOTO PRO BANNER */}
        <section style={{ marginBottom: '32px' }}>
          <div style={{ position: 'relative', width: '100%', height: '400px', borderRadius: '40px', overflow: 'hidden' }}>
            <img src="https://images.pexels.com/photos/2393835/pexels-photo-2393835.jpeg?auto=compress&w=1200" alt="SouKni Moto Pro" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.7s' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(0,0,0,0.8), rgba(0,0,0,0.4), transparent)', display: 'flex', flexDirection: 'column' as const, justifyContent: 'center', padding: '0 64px' }}>
              <div style={{ maxWidth: '560px' }}>
                <h2 style={{ color: 'white', fontSize: '48px', fontWeight: 700, marginBottom: '8px', letterSpacing: '-0.02em' }}>SouKni Moto Pro</h2>
                <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '18px', marginBottom: '32px' }}>The Gold Standard for Premium Motorcycles Services</p>
                <button style={{ backgroundColor: '#2dd4bf', color: '#00574d', padding: '16px 32px', borderRadius: '100px', border: 'none', fontWeight: 700, fontSize: '13px', cursor: 'pointer', textTransform: 'uppercase' as const, letterSpacing: '0.05em' }}>
                  Explore SouKni Moto Pro
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* DISCOVERY ROW (8 cards) */}
        <SimpleGrid bikes={discoveryRow.slice(0, 4)} />
        <SimpleGrid bikes={discoveryRow.slice(4, 8)} />
      </div>

      {/* DIAMOND MEMBER FOOTER BANNER */}
      <section style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 40px', marginBottom: '32px' }}>
        <div style={{ position: 'relative', width: '100%', height: '400px', borderRadius: '40px', overflow: 'hidden' }}>
          <img src="https://images.pexels.com/photos/1149831/pexels-photo-1149831.jpeg?auto=compress&w=1200" alt="Diamond Member Banner" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(0,0,0,0.6), rgba(0,0,0,0.3), transparent)', display: 'flex', flexDirection: 'column' as const, justifyContent: 'center', padding: '0 64px' }}>
            <div style={{ maxWidth: '560px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                <Diamond size={32} color="#62fae3" />
                <span style={{ color: '#62fae3', fontSize: '13px', fontWeight: 600, textTransform: 'uppercase' as const, letterSpacing: '0.1em' }}>Exclusive Status</span>
              </div>
              <h2 style={{ color: 'white', fontSize: '40px', fontWeight: 700, marginBottom: '8px', letterSpacing: '-0.02em' }}>Become a SouKni Diamond Certified Member</h2>
              <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '18px', marginBottom: '32px' }}>Get the Diamond Certified status and unlock exclusive benefits for premium motorcycle sellers.</p>
              <button style={{ backgroundColor: '#006b5f', color: 'white', padding: '16px 32px', borderRadius: '100px', border: 'none', fontWeight: 700, fontSize: '13px', cursor: 'pointer', textTransform: 'uppercase' as const, letterSpacing: '0.05em' }}>
                Get Certified Now
              </button>
            </div>
          </div>
        </div>
      </section>

      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 40px' }}>
        {/* EXPANDED GRID: 2 more rows (8 ads) */}
        <BadgedGrid bikes={expandedRow1} ctaLabel="MESSAGE" />
        <BadgedGrid bikes={expandedRow2} ctaLabel="MESSAGE" />

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

        {/* APP DOWNLOAD BANNER */}
        <section style={{ marginBottom: '64px' }}>
          <div style={{ position: 'relative', background: 'linear-gradient(to right, #006b5f, #2dd4bf)', borderRadius: '2.5rem', overflow: 'hidden', padding: '48px', display: 'flex', flexWrap: 'wrap' as const, alignItems: 'center', justifyContent: 'space-between', gap: '32px', boxShadow: '0 25px 50px rgba(0,0,0,0.15)' }}>
            <div style={{ flex: 1, minWidth: '320px', textAlign: 'center' as const, maxWidth: '600px' }}>
              <h2 style={{ color: 'white', fontSize: '40px', fontWeight: 700, marginBottom: '16px', letterSpacing: '-0.02em' }}>Join the SouKni Family</h2>
              <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '18px', marginBottom: '32px' }}>Download our premium mobile experience for real-time alerts and exclusive marketplace deals.</p>
              <div style={{ display: 'flex', flexWrap: 'wrap' as const, justifyContent: 'center', gap: '16px' }}>
                <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '12px', backgroundColor: 'white', color: '#006b5f', padding: '12px 24px', borderRadius: '12px', textDecoration: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}>
                  <Apple size={28} />
                  <div style={{ textAlign: 'left' as const, lineHeight: 1.2 }}>
                    <div style={{ fontSize: '10px', textTransform: 'uppercase' as const, fontWeight: 700, opacity: 0.7 }}>Download on the</div>
                    <div style={{ fontSize: '16px', fontWeight: 700 }}>App Store</div>
                  </div>
                </a>
                <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '12px', backgroundColor: 'white', color: '#006b5f', padding: '12px 24px', borderRadius: '12px', textDecoration: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}>
                  <PlayCircle size={28} />
                  <div style={{ textAlign: 'left' as const, lineHeight: 1.2 }}>
                    <div style={{ fontSize: '10px', textTransform: 'uppercase' as const, fontWeight: 700, opacity: 0.7 }}>Get it on</div>
                    <div style={{ fontSize: '16px', fontWeight: 700 }}>Google Play</div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* ── FOOTER ── */}
      <footer style={{ backgroundColor: '#7A7A7A', padding: '64px 0' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 40px' }}>
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
