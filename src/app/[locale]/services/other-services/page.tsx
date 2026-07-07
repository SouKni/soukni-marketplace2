'use client'
import React, { useState } from 'react'
import Link from 'next/link'

const services = [
  { title: 'Professional Photography', category: 'Creative Services', price: '800 MAD/session', location: 'Casablanca', badge: 'Diamond Member', image: 'https://images.pexels.com/photos/1261731/pexels-photo-1261731.jpeg?auto=compress&w=500' },
  { title: 'Wedding DJ & Sound', category: 'Entertainment', price: '2,500 MAD/event', location: 'Rabat', badge: 'Verified', image: 'https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg?auto=compress&w=500' },
  { title: 'Catering & Events', category: 'Food & Beverage', price: '150 MAD/person', location: 'Marrakech', badge: 'Diamond Member', image: 'https://images.pexels.com/photos/2291367/pexels-photo-2291367.jpeg?auto=compress&w=500' },
  { title: 'Personal Fitness Coach', category: 'Health & Wellness', price: '300 MAD/session', location: 'Tangier', badge: 'Verified', image: 'https://images.pexels.com/photos/1552252/pexels-photo-1552252.jpeg?auto=compress&w=500' },
  { title: 'Interior Design Studio', category: 'Design', price: '5,000 MAD/project', location: 'Casablanca', badge: 'Diamond Member', image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&w=500' },
  { title: 'Mobile Car Wash', category: 'Automotive', price: '200 MAD/car', location: 'Rabat', badge: 'Verified', image: 'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&w=500' },
  { title: 'Private Chef Services', category: 'Food & Beverage', price: '1,200 MAD/day', location: 'Marrakech', badge: 'Diamond Member', image: 'https://images.pexels.com/photos/3218467/pexels-photo-3218467.jpeg?auto=compress&w=500' },
  { title: 'Language Translation', category: 'Professional', price: '400 MAD/hour', location: 'Casablanca', badge: 'Verified', image: 'https://images.pexels.com/photos/4126743/pexels-photo-4126743.jpeg?auto=compress&w=500' },
]

function ServiceCard({ item }: { item: typeof services[0] }) {
  const [liked, setLiked] = useState(false)
  const [hovered, setHovered] = useState(false)
  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{ backgroundColor: 'white', borderRadius: '24px', overflow: 'hidden', border: '1px solid rgba(186,202,197,0.3)', boxShadow: hovered ? '0 20px 40px rgba(0,0,0,0.1)' : '0 2px 8px rgba(0,0,0,0.04)', transition: 'all 0.3s' }}>
      <div style={{ position: 'relative', height: '200px', overflow: 'hidden' }}>
        <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s', transform: hovered ? 'scale(1.05)' : 'scale(1)' }} />
        <div style={{ position: 'absolute', top: '12px', left: '12px' }}>
          <span style={{ backgroundColor: item.badge === 'Diamond Member' ? '#2dd4bf' : '#2dd4bf', color: 'white', fontSize: '10px', fontWeight: 700, padding: '4px 10px', borderRadius: '100px', textTransform: 'uppercase' }}>{item.badge}</span>
        </div>
        <button onClick={() => setLiked(!liked)} style={{ position: 'absolute', top: '12px', right: '12px', width: '36px', height: '36px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.8)', border: 'none', cursor: 'pointer', fontSize: '16px', color: liked ? '#ba1a1a' : '#3c4a46' }}>{liked ? '♥' : '♡'}</button>
      </div>
      <div style={{ padding: '20px' }}>
        <p style={{ fontSize: '11px', color: '#2dd4bf', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>{item.category}</p>
        <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#161d1b', marginBottom: '8px' }}>{item.title}</h3>
        <p style={{ fontSize: '13px', color: '#6b7a76', marginBottom: '12px' }}>📍 {item.location}</p>
        <p style={{ fontSize: '18px', fontWeight: 700, color: '#2dd4bf', marginBottom: '16px' }}>{item.price}</p>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button style={{ flex: 1, backgroundColor: '#25D366', color: 'white', border: 'none', padding: '10px', borderRadius: '12px', fontWeight: 700, fontSize: '13px', cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>WhatsApp</button>
          <button style={{ flex: 1, backgroundColor: 'transparent', color: '#2dd4bf', border: '1px solid #2dd4bf', padding: '10px', borderRadius: '12px', fontWeight: 700, fontSize: '13px', cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>Message</button>
        </div>
      </div>
    </div>
  )
}

export default function OtherServicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = React.use(params)
  return (
    <div style={{ fontFamily: 'Inter, system-ui, sans-serif', backgroundColor: '#f4fbf8', minHeight: '100vh' }}>
      <section style={{ position: 'relative', height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        <img src="https://images.pexels.com/photos/1261731/pexels-photo-1261731.jpeg?auto=compress&w=1400" alt="Other Services" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0.2))' }} />
        <div style={{ position: 'relative', zIndex: 10, textAlign: 'center' }}>
          <h1 style={{ fontSize: '42px', fontWeight: 900, color: 'white', letterSpacing: '-0.03em', marginBottom: '8px' }}>Other Services</h1>
          <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.85)' }}>Discover trusted professionals across Morocco</p>
        </div>
      </section>
      <div style={{ maxWidth: '1280px', margin: '48px auto', padding: '0 40px' }}>
        <nav style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', marginBottom: '32px' }}>
          <Link href={`/${locale}`} style={{ color: '#2dd4bf', textDecoration: 'none', fontWeight: 600 }}>Home</Link>
          <span style={{ color: '#6b7a76' }}>›</span>
          <Link href={`/${locale}/community`} style={{ color: '#2dd4bf', textDecoration: 'none', fontWeight: 600 }}>Community</Link>
          <span style={{ color: '#6b7a76' }}>›</span>
          <span style={{ color: '#161d1b', fontWeight: 700 }}>Other Services</span>
        </nav>
        <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#161d1b', marginBottom: '32px' }}>All Services <span style={{ color: '#6b7a76', fontWeight: 400 }}>• {services.length} listings</span></h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
          {services.map((item, i) => <ServiceCard key={i} item={item} />)}
        </div>
      </div>
    </div>
  )
}
