'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Heart, Search, MapPin, Globe, DollarSign, Bell, User, Sliders, MessageCircle, Gem, Truck, Navigation2, Building2, Banknote } from 'lucide-react'

const categoryPills = [
  { label: 'PC Gaming', count: '2.4k' },
  { label: 'Consoles', count: '1.8k' },
  { label: 'VR & AR', count: '450' },
  { label: 'Peripherals', count: '3.2k' },
  { label: 'Components', count: '1.1k' },
  { label: 'Retro Gaming', count: '800' },
]

type Listing = { id: string; title: string; price: string; location: string; time: string; image: string; badge?: 'Diamond Member' }

const featuredPowerhouses: Listing[] = [
  { id: '1', title: 'Titan Z Liquid 2026 Edition', price: '14,500', location: 'Hay Riad, Rabat', time: '2h ago', image: 'https://images.pexels.com/photos/1772123/pexels-photo-1772123.jpeg?auto=compress&w=600', badge: 'Diamond Member' },
  { id: '2', title: 'Quantum S5 Pro Console', price: '5,900', location: 'Agdal, Rabat', time: 'Just now', image: 'https://images.pexels.com/photos/3945683/pexels-photo-3945683.jpeg?auto=compress&w=600' },
  { id: '3', title: 'Aurora Ultra 49" OLED', price: '11,200', location: 'Oudayas, Rabat', time: '1d ago', image: 'https://images.pexels.com/photos/1029757/pexels-photo-1029757.jpeg?auto=compress&w=600', badge: 'Diamond Member' },
  { id: '4', title: 'Aethereal VR 8K Pro Kit', price: '8,400', location: 'Souissi, Rabat', time: '4h ago', image: 'https://images.pexels.com/photos/3945659/pexels-photo-3945659.jpeg?auto=compress&w=600' },
]

const proGamingGear: Listing[] = [
  { id: '5', title: 'Apex Wireless Pro Headset', price: '1,850', location: 'Hassan, Rabat', time: '3h ago', image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&w=600', badge: 'Diamond Member' },
  { id: '6', title: 'Vortex Elite Ergonomic Chair', price: '4,200', location: 'Agdal, Rabat', time: '6h ago', image: 'https://images.pexels.com/photos/2249528/pexels-photo-2249528.jpeg?auto=compress&w=600' },
  { id: '7', title: 'Zenith RGB Mechanical Keyboard', price: '950', location: 'Souissi, Rabat', time: '1d ago', image: 'https://images.pexels.com/photos/2115257/pexels-photo-2115257.jpeg?auto=compress&w=600' },
  { id: '8', title: 'Phantom 360Hz Gaming Monitor', price: '6,700', location: 'Hay Riad, Rabat', time: '2d ago', image: 'https://images.pexels.com/photos/4523011/pexels-photo-4523011.jpeg?auto=compress&w=600', badge: 'Diamond Member' },
]

const nextGenEcosystem: Listing[] = [
  { id: '9', title: 'Nova X Series Console Bundle', price: '7,300', location: 'Medina, Rabat', time: 'Just now', image: 'https://images.pexels.com/photos/3945656/pexels-photo-3945656.jpeg?auto=compress&w=600', badge: 'Diamond Member' },
  { id: '10', title: 'Helix Mixed-Reality Headset', price: '9,800', location: 'Agdal, Rabat', time: '5h ago', image: 'https://images.pexels.com/photos/8721318/pexels-photo-8721318.jpeg?auto=compress&w=600' },
  { id: '11', title: 'Pulse Pro Streaming Deck', price: '2,400', location: 'Hassan, Rabat', time: '8h ago', image: 'https://images.pexels.com/photos/4009401/pexels-photo-4009401.jpeg?auto=compress&w=600' },
  { id: '12', title: 'Orbit Handheld Gaming Console', price: '3,650', location: 'Souissi, Rabat', time: '1d ago', image: 'https://images.pexels.com/photos/3945654/pexels-photo-3945654.jpeg?auto=compress&w=600', badge: 'Diamond Member' },
]

function ListingCard({ item }: { item: Listing }) {
  const [saved, setSaved] = useState(false)
  return (
    <div style={{ backgroundColor: 'white', borderRadius: '3rem', overflow: 'hidden', boxShadow: '0 1px 2px rgba(0,0,0,0.04)', transition: 'all 0.4s', cursor: 'pointer' }}
      onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 25px 50px rgba(0,0,0,0.15)'; e.currentTarget.style.transform = 'translateY(-6px)' }}
      onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 1px 2px rgba(0,0,0,0.04)'; e.currentTarget.style.transform = 'translateY(0)' }}
    >
      <div style={{ position: 'relative', aspectRatio: '4/5', overflow: 'hidden' }}>
        <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        {item.badge && (
          <span style={{ position: 'absolute', top: '16px', left: '16px', backgroundColor: 'rgba(0,107,95,0.9)', backdropFilter: 'blur(8px)', color: 'white', fontSize: '10px', fontWeight: 700, padding: '4px 12px', borderRadius: '100px', textTransform: 'uppercase' as const, letterSpacing: '-0.02em' }}>{item.badge}</span>
        )}
        <button onClick={() => setSaved(!saved)} style={{ position: 'absolute', top: '16px', right: '16px', width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
          <Heart size={18} color={saved ? '#ef4444' : '#3c4a46'} fill={saved ? '#ef4444' : 'none'} />
        </button>
      </div>
      <div style={{ padding: '24px', display: 'flex', flexDirection: 'column' as const, gap: '12px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#161d1b', lineHeight: 1.3, whiteSpace: 'nowrap' as const, overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '65%' }}>{item.title}</h3>
          <span style={{ color: '#2dd4bf', fontWeight: 700, fontSize: '18px', whiteSpace: 'nowrap' as const }}>{item.price} <span style={{ fontSize: '12px', fontWeight: 400, color: '#3c4a46' }}>MAD</span></span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#3c4a46', fontSize: '12px' }}>
          <MapPin size={14} /><span>{item.location}</span><span style={{ margin: '0 2px' }}>•</span><span>{item.time}</span>
        </div>
        <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
          <button style={{ flex: 1, backgroundColor: '#2dd4bf', color: 'white', height: '44px', borderRadius: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: '13px' }}>
            <MessageCircle size={16} /> Message
          </button>
          <button style={{ width: '44px', height: '44px', border: '1px solid #2dd4bf', color: '#2dd4bf', borderRadius: '50%', backgroundColor: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            💬
          </button>
        </div>
      </div>
    </div>
  )
}

function ListingRow({ eyebrow, title, items, viewAllLabel }: { eyebrow: string; title: string; items: Listing[]; viewAllLabel: string }) {
  return (
    <section style={{ marginBottom: '64px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '32px' }}>
        <div>
          <span style={{ color: '#2dd4bf', fontSize: '13px', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase' as const }}>{eyebrow}</span>
          <h2 style={{ fontSize: '28px', fontWeight: 700, color: '#161d1b', marginTop: '8px' }}>{title}</h2>
        </div>
        <a href="#" style={{ color: '#2dd4bf', fontWeight: 600, fontSize: '14px', textDecoration: 'none', borderBottom: '1px solid rgba(0,107,95,0.3)', paddingBottom: '4px' }}>{viewAllLabel} →</a>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
        {items.map(item => <ListingCard key={item.id} item={item} />)}
      </div>
    </section>
  )
}

export default function GamingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = React.use(params)
  const [activePill, setActivePill] = useState('PC Gaming')
  const [diamondFirst, setDiamondFirst] = useState(true)

  return (
    <div style={{ fontFamily: 'Hanken Grotesk, Inter, sans-serif', backgroundColor: '#f4fbf8', color: '#161d1b', minHeight: '100vh' }}>


      <main>
        {/* HERO */}
        <section style={{ position: 'relative', height: '70vh', minHeight: '500px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
          <img src="https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?auto=compress&w=1600" alt="Gaming showroom" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.3), transparent, rgba(244,251,248,0.9))' }} />
          <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', maxWidth: '900px', padding: '0 20px' }}>
            <h1 style={{ color: 'white', fontSize: '48px', fontWeight: 700, marginBottom: '32px', letterSpacing: '-0.02em', textShadow: '0 8px 24px rgba(0,0,0,0.4)' }}>The Market in your Pocket</h1>
            <div style={{ backgroundColor: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.4)', borderRadius: '100px', padding: '8px', display: 'flex', alignItems: 'center', maxWidth: '600px', margin: '0 auto', boxShadow: '0 25px 50px rgba(0,0,0,0.2)' }}>
              <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '12px', padding: '0 24px', borderRight: '1px solid rgba(0,0,0,0.1)' }}>
                <Search size={18} color="#2dd4bf" />
                <input placeholder="Search for premium gear..." style={{ border: 'none', outline: 'none', background: 'transparent', width: '100%', fontFamily: 'inherit', fontSize: '14px' }} />
              </div>
              <button style={{ backgroundColor: '#2dd4bf', color: 'white', padding: '12px 32px', borderRadius: '100px', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: '14px' }}>Explore</button>
            </div>
          </div>
        </section>

        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 40px' }}>

          {/* FILTER BAR */}
          <section style={{ position: 'relative', zIndex: 20, marginTop: '-64px', marginBottom: '48px' }}>
            <div style={{ backgroundColor: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.4)', borderRadius: '3rem', padding: '24px', display: 'flex', flexWrap: 'wrap' as const, alignItems: 'center', gap: '24px', boxShadow: '0 24px 48px -12px rgba(22,29,27,0.08)' }}>
              {[
                { label: 'City', icon: Navigation2, value: 'Rabat (All)' },
                { label: 'Neighborhood', icon: Building2, value: 'Agdal & Hay Riad' },
                { label: 'Price Range', icon: Banknote, value: 'Any Price' },
              ].map(f => (
                <div key={f.label} style={{ flex: 1, minWidth: '160px', display: 'flex', flexDirection: 'column' as const, gap: '4px' }}>
                  <label style={{ fontSize: '11px', color: '#3c4a46', textTransform: 'uppercase' as const, letterSpacing: '0.1em', marginLeft: '4px' }}>{f.label}</label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: '#eef5f2', padding: '10px 16px', borderRadius: '12px', cursor: 'pointer' }}>
                    <f.icon size={18} color="#2dd4bf" />
                    <span style={{ fontSize: '13px', fontWeight: 600 }}>{f.value}</span>
                  </div>
                </div>
              ))}
              <button style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: '#2dd4bf', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', cursor: 'pointer', boxShadow: '0 10px 15px -3px rgba(0,107,95,0.2)', flexShrink: 0 }}>
                <Sliders size={18} />
              </button>
            </div>
          </section>

          {/* CATEGORY PILLS + TOGGLE */}
          <section style={{ display: 'flex', flexWrap: 'wrap' as const, alignItems: 'center', justifyContent: 'space-between', gap: '16px', marginBottom: '48px' }}>
            <div style={{ display: 'flex', gap: '12px', overflowX: 'auto' as const }}>
              {categoryPills.map(p => (
                <button key={p.label} onClick={() => setActivePill(p.label)}
                  style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 24px', borderRadius: '100px', fontSize: '14px', fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap' as const, border: 'none',
                    backgroundColor: activePill === p.label ? '#2dd4bf' : 'rgba(221,228,225,0.5)', color: activePill === p.label ? 'white' : '#3c4a46' }}>
                  {p.label} <span style={{ opacity: 0.8 }}>({p.count})</span>
                </button>
              ))}
            </div>
            <button onClick={() => setDiamondFirst(!diamondFirst)} style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'none', border: 'none', cursor: 'pointer' }}>
              <span style={{ fontSize: '13px', fontWeight: 600, color: '#3c4a46', whiteSpace: 'nowrap' as const }}>Show Diamond Verified First</span>
              <div style={{ width: '44px', height: '24px', borderRadius: '100px', backgroundColor: diamondFirst ? '#2dd4bf' : '#dde4e1', position: 'relative', transition: 'background-color 0.2s' }}>
                <div style={{ position: 'absolute', top: '2px', left: diamondFirst ? '22px' : '2px', width: '20px', height: '20px', borderRadius: '50%', backgroundColor: 'white', transition: 'left 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }} />
              </div>
            </button>
          </section>

          {/* ROW 1 */}
          <ListingRow eyebrow="Market Selection" title="Featured Powerhouses" items={featuredPowerhouses} viewAllLabel="View All Deals" />

          {/* BANNERS */}
          <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '64px' }}>
            <div style={{ position: 'relative', height: '240px', borderRadius: '3rem', overflow: 'hidden', boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}>
              <img src="https://images.pexels.com/photos/2885320/pexels-photo-2885320.jpeg?auto=compress&w=800" alt="SouKni Auto Pro" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(28,28,28,0.85), transparent)' }} />
              <div style={{ position: 'relative', zIndex: 1, height: '100%', display: 'flex', flexDirection: 'column' as const, justifyContent: 'center', padding: '32px', gap: '8px', maxWidth: '280px' }}>
                <span style={{ color: '#2dd4bf', fontSize: '12px', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase' as const }}>SouKni Services</span>
                <h3 style={{ color: 'white', fontSize: '24px', fontWeight: 700 }}>SouKni Auto Pro</h3>
                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px' }}>Verified delivery and installation for premium gear.</p>
                <button style={{ marginTop: '8px', backgroundColor: 'white', color: '#161d1b', padding: '10px 24px', borderRadius: '100px', border: 'none', fontWeight: 600, fontSize: '13px', cursor: 'pointer', width: 'fit-content' }}>Upgrade Now</button>
              </div>
              <Truck size={120} color="white" style={{ position: 'absolute', right: '24px', bottom: '24px', opacity: 0.08 }} />
            </div>
            <div style={{ position: 'relative', height: '240px', borderRadius: '3rem', overflow: 'hidden', border: '2px solid rgba(0,107,95,0.2)', backgroundColor: 'rgba(0,107,95,0.06)', display: 'flex', flexDirection: 'column' as const, alignItems: 'center', justifyContent: 'center', textAlign: 'center' as const, gap: '16px', padding: '24px' }}>
              <div style={{ width: '64px', height: '64px', backgroundColor: '#2dd4bf', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 20px 25px -5px rgba(0,107,95,0.3)' }}>
                <Gem size={32} color="white" />
              </div>
              <h3 style={{ fontSize: '24px', fontWeight: 700 }}>Diamond Membership</h3>
              <p style={{ color: '#3c4a46', fontSize: '14px', maxWidth: '320px' }}>Boost your sales by 4x with premium placement &amp; dedicated support.</p>
              <button style={{ backgroundColor: '#2dd4bf', color: 'white', padding: '12px 32px', borderRadius: '100px', border: 'none', fontWeight: 600, fontSize: '14px', cursor: 'pointer', boxShadow: '0 10px 15px -3px rgba(0,107,95,0.2)' }}>Learn More</button>
            </div>
          </section>

          {/* ROW 2 */}
          <ListingRow eyebrow="Pro Setup" title="Pro Gaming Gear" items={proGamingGear} viewAllLabel="View All Gear" />

          {/* ROW 3 */}
          <ListingRow eyebrow="Future Forward" title="Next-Gen Ecosystem" items={nextGenEcosystem} viewAllLabel="View All Consoles" />

          {/* PAGINATION */}
          <section style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', marginBottom: '64px' }}>
            {['1', '2', '3', '...', '42', '›'].map((p, i) => (
              <button key={i} style={{
                minWidth: '40px', height: '40px', borderRadius: '50%', border: 'none', cursor: 'pointer', fontSize: '14px', fontWeight: 600, padding: '0 8px',
                backgroundColor: p === '1' ? '#2dd4bf' : 'transparent', color: p === '1' ? 'white' : '#3c4a46',
              }}>{p}</button>
            ))}
          </section>

        </div>
      </main>

      {/* FOOTER */}
    </div>
  )
}
