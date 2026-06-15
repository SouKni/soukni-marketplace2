'use client'
import React, { useState } from 'react'
import Link from 'next/link'

const listings = [
  { title: 'Skyline Executive Office', price: '45,000 MAD/mo', size: '450m²', type: 'Office', location: 'Casablanca Finance City', badge: 'Diamond Member', image: 'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&w=500' },
  { title: 'Luxury Boutique Retail Space', price: '32,000 MAD/mo', size: '120m²', type: 'Retail', location: 'Rabat, Souissi Mall', badge: 'Diamond Member', image: 'https://images.pexels.com/photos/1109561/pexels-photo-1109561.jpeg?auto=compress&w=500' },
  { title: 'Heritage Boutique Office', price: '28,500 MAD/mo', size: '210m²', type: 'Office', location: 'Marrakech, Hivernage', badge: 'Verified', image: 'https://images.pexels.com/photos/380769/pexels-photo-380769.jpeg?auto=compress&w=500' },
  { title: 'Logistics Hub Med-Zone', price: '85,000 MAD/mo', size: '1200m²', type: 'Warehouse', location: 'Tangier Med Zone', badge: 'Diamond Member', image: 'https://images.pexels.com/photos/2219024/pexels-photo-2219024.jpeg?auto=compress&w=500' },
  { title: 'Modern Co-Working Space', price: '15,000 MAD/mo', size: '300m²', type: 'Co-Working', location: 'Casablanca, Maarif', badge: 'Verified', image: 'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&w=500' },
  { title: 'Restaurant Premises Agdal', price: '22,000 MAD/mo', size: '180m²', type: 'Restaurant', location: 'Rabat, Agdal', badge: 'Verified', image: 'https://images.pexels.com/photos/1109561/pexels-photo-1109561.jpeg?auto=compress&w=500' },
  { title: 'Industrial Unit Ain Sebaa', price: '55,000 MAD/mo', size: '800m²', type: 'Industrial', location: 'Casablanca, Ain Sebaa', badge: 'Diamond Member', image: 'https://images.pexels.com/photos/2219024/pexels-photo-2219024.jpeg?auto=compress&w=500' },
  { title: 'Showroom Boulevard Zerktouni', price: '38,000 MAD/mo', size: '250m²', type: 'Showroom', location: 'Casablanca, Zerktouni', badge: 'Diamond Member', image: 'https://images.pexels.com/photos/380769/pexels-photo-380769.jpeg?auto=compress&w=500' },
]

function CommercialCard({ item }: { item: typeof listings[0] }) {
  const [liked, setLiked] = useState(false)
  const [hovered, setHovered] = useState(false)
  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{ backgroundColor: 'white', borderRadius: '24px', overflow: 'hidden', border: '1px solid rgba(186,202,197,0.3)', boxShadow: hovered ? '0 20px 40px rgba(0,0,0,0.1)' : '0 2px 8px rgba(0,0,0,0.04)', transition: 'all 0.3s' }}>
      <div style={{ position: 'relative', height: '200px', overflow: 'hidden' }}>
        <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s', transform: hovered ? 'scale(1.05)' : 'scale(1)' }} />
        <div style={{ position: 'absolute', top: '12px', left: '12px' }}>
          <span style={{ backgroundColor: item.badge === 'Diamond Member' ? '#006b5f' : '#2dd4bf', color: 'white', fontSize: '10px', fontWeight: 700, padding: '4px 10px', borderRadius: '100px', textTransform: 'uppercase' }}>{item.badge}</span>
        </div>
        <button onClick={() => setLiked(!liked)} style={{ position: 'absolute', top: '12px', right: '12px', width: '36px', height: '36px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.8)', border: 'none', cursor: 'pointer', fontSize: '16px', color: liked ? '#ba1a1a' : '#3c4a46' }}>{liked ? '♥' : '♡'}</button>
      </div>
      <div style={{ padding: '20px' }}>
        <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
          <span style={{ backgroundColor: '#e8efec', color: '#006b5f', fontSize: '11px', fontWeight: 700, padding: '3px 8px', borderRadius: '6px' }}>{item.type}</span>
          <span style={{ backgroundColor: '#e8efec', color: '#006b5f', fontSize: '11px', fontWeight: 700, padding: '3px 8px', borderRadius: '6px' }}>{item.size}</span>
        </div>
        <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#161d1b', marginBottom: '8px' }}>{item.title}</h3>
        <p style={{ fontSize: '13px', color: '#6b7a76', marginBottom: '12px' }}>📍 {item.location}</p>
        <p style={{ fontSize: '20px', fontWeight: 700, color: '#006b5f', marginBottom: '16px' }}>{item.price}</p>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button style={{ flex: 1, backgroundColor: '#25D366', color: 'white', border: 'none', padding: '10px', borderRadius: '12px', fontWeight: 700, fontSize: '13px', cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>WhatsApp</button>
          <button style={{ flex: 1, backgroundColor: 'transparent', color: '#006b5f', border: '1px solid #006b5f', padding: '10px', borderRadius: '12px', fontWeight: 700, fontSize: '13px', cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>Message</button>
        </div>
      </div>
    </div>
  )
}

export default function CommercialPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = React.use(params)
  return (
    <div style={{ fontFamily: 'Inter, system-ui, sans-serif', backgroundColor: '#f4fbf8', minHeight: '100vh' }}>
      <section style={{ position: 'relative', height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        <img src="https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&w=1400" alt="Commercial" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0.2))' }} />
        <div style={{ position: 'relative', zIndex: 10, textAlign: 'center' }}>
          <h1 style={{ fontSize: '42px', fontWeight: 900, color: 'white', letterSpacing: '-0.03em', marginBottom: '8px' }}>Commercial Properties</h1>
          <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.85)' }}>Premium commercial spaces across Morocco</p>
        </div>
      </section>
      <div style={{ maxWidth: '1280px', margin: '48px auto', padding: '0 40px' }}>
        <nav style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', marginBottom: '32px' }}>
          <Link href={`/${locale}`} style={{ color: '#006b5f', textDecoration: 'none', fontWeight: 600 }}>Home</Link>
          <span style={{ color: '#6b7a76' }}>›</span>
          <Link href={`/${locale}/property`} style={{ color: '#006b5f', textDecoration: 'none', fontWeight: 600 }}>Property</Link>
          <span style={{ color: '#6b7a76' }}>›</span>
          <span style={{ color: '#161d1b', fontWeight: 700 }}>Commercial</span>
        </nav>
        <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#161d1b', marginBottom: '32px' }}>Commercial Properties <span style={{ color: '#6b7a76', fontWeight: 400 }}>• {listings.length} listings</span></h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
          {listings.map((item, i) => <CommercialCard key={i} item={item} />)}
        </div>
      </div>
    </div>
  )
}
