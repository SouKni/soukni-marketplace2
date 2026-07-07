'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { Star } from 'lucide-react'

const movers = [
  { title: 'Expert Home Relocation', category: 'Full-Service Moving', price: '1,800 MAD/move', location: 'Casablanca', rating: 5, reviews: 124, badge: 'Diamond Member', image: 'https://images.pexels.com/photos/4246120/pexels-photo-4246120.jpeg?auto=compress&w=600' },
  { title: 'Pro Team Removals', category: 'Office & Home Moves', price: '1,400 MAD/move', location: 'Rabat', rating: 4.5, reviews: 89, badge: 'Verified', image: 'https://images.pexels.com/photos/4246119/pexels-photo-4246119.jpeg?auto=compress&w=600' },
  { title: 'Swift Move Solutions', category: 'Long Distance Moving', price: '2,200 MAD/move', location: 'Marrakech', rating: 4, reviews: 215, badge: 'Verified', image: 'https://images.pexels.com/photos/4246118/pexels-photo-4246118.jpeg?auto=compress&w=600' },
  { title: 'Careful Hands Logistics', category: 'Fragile & Antique Moving', price: '2,600 MAD/move', location: 'Tangier', rating: 5, reviews: 56, badge: 'Diamond Member', image: 'https://images.pexels.com/photos/4246120/pexels-photo-4246120.jpeg?auto=compress&w=600' },
  { title: 'City Express Movers', category: 'Same-Day Moving', price: '900 MAD/move', location: 'Fes', rating: 4.5, reviews: 142, badge: 'Verified', image: 'https://images.pexels.com/photos/4246119/pexels-photo-4246119.jpeg?auto=compress&w=600' },
  { title: 'Atlas Furniture Movers', category: 'Furniture Disassembly', price: '1,100 MAD/move', location: 'Agadir', rating: 4, reviews: 73, badge: 'Verified', image: 'https://images.pexels.com/photos/4246118/pexels-photo-4246118.jpeg?auto=compress&w=600' },
  { title: 'National Relocation Co.', category: 'Cross-City Moving', price: '3,500 MAD/move', location: 'Casablanca', rating: 5, reviews: 198, badge: 'Diamond Member', image: 'https://images.pexels.com/photos/4246120/pexels-photo-4246120.jpeg?auto=compress&w=600' },
  { title: 'QuickPack Storage & Move', category: 'Storage + Moving', price: '1,600 MAD/move', location: 'Rabat', rating: 4.5, reviews: 110, badge: 'Verified', image: 'https://images.pexels.com/photos/4246119/pexels-photo-4246119.jpeg?auto=compress&w=600' },
]

function MoverCard({ item }: { item: typeof movers[0] }) {
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
        <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#161d1b', marginBottom: '6px' }}>{item.title}</h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '8px' }}>
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} size={13} fill={i < Math.round(item.rating) ? '#f5b400' : 'none'} color="#f5b400" />
          ))}
          <span style={{ fontSize: '12px', color: '#6b7a76', marginLeft: '4px' }}>({item.reviews})</span>
        </div>
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

export default function MoversPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = React.use(params)
  return (
    <div style={{ fontFamily: 'Inter, system-ui, sans-serif', backgroundColor: '#f4fbf8', minHeight: '100vh' }}>
      <section style={{ position: 'relative', height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        <img src="https://images.pexels.com/photos/4246120/pexels-photo-4246120.jpeg?auto=compress&w=1400" alt="Movers & Removals" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0.2))' }} />
        <div style={{ position: 'relative', zIndex: 10, textAlign: 'center' }}>
          <h1 style={{ fontSize: '42px', fontWeight: 900, color: 'white', letterSpacing: '-0.03em', marginBottom: '8px' }}>Movers & Removals</h1>
          <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.85)' }}>Trusted relocation specialists across Morocco</p>
        </div>
      </section>
      <div style={{ maxWidth: '1280px', margin: '48px auto', padding: '0 40px' }}>
        <nav style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', marginBottom: '32px' }}>
          <Link href={`/${locale}`} style={{ color: '#2dd4bf', textDecoration: 'none', fontWeight: 600 }}>Home</Link>
          <span style={{ color: '#6b7a76' }}>›</span>
          <Link href={`/${locale}/community`} style={{ color: '#2dd4bf', textDecoration: 'none', fontWeight: 600 }}>Services</Link>
          <span style={{ color: '#6b7a76' }}>›</span>
          <span style={{ color: '#161d1b', fontWeight: 700 }}>Movers & Removals</span>
        </nav>
        <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#161d1b', marginBottom: '32px' }}>All Movers & Removals <span style={{ color: '#6b7a76', fontWeight: 400 }}>• {movers.length} listings</span></h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
          {movers.map((item, i) => <MoverCard key={i} item={item} />)}
        </div>
      </div>
    </div>
  )
}
