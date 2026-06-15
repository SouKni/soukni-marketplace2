'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { MapPin, ChevronDown, Search } from 'lucide-react'
import { useMarket } from '@/context/MarketContext'

const listings = [
  { title: 'BMW M4 Competition', price: 785000, location: 'Casablanca', time: 'Just now', badge: 'diamond', year: '2023', km: '12,500 km', image: 'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&w=600' },
  { title: 'Land Rover Defender 110', price: 1200000, location: 'Rabat', time: '1 hour ago', badge: 'diamond', year: '2024', km: '2,100 km', image: 'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&w=600' },
  { title: 'Audi e-tron GT Quattro', price: 1450000, location: 'Marrakech', time: '2 hours ago', badge: 'verified', year: '2024', km: 'Electric', image: 'https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg?auto=compress&w=600' },
  { title: 'Chevrolet Corvette C8', price: 640000, location: 'Tangier', time: '3 hours ago', badge: 'verified', year: '2021', km: '45,000 km', image: 'https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg?auto=compress&w=600' },
  { title: 'Porsche Cayenne Turbo', price: 980000, location: 'Casablanca', time: '4 hours ago', badge: 'diamond', year: '2023', km: '8,200 km', image: 'https://images.pexels.com/photos/1638459/pexels-photo-1638459.jpeg?auto=compress&w=600' },
  { title: 'Mercedes-Benz GLE 63S', price: 1100000, location: 'Rabat', time: '5 hours ago', badge: 'diamond', year: '2022', km: '22,000 km', image: 'https://images.pexels.com/photos/120049/pexels-photo-120049.jpeg?auto=compress&w=600' },
  { title: 'Ferrari F8 Tributo', price: 3400000, location: 'Marrakech', time: '1 day ago', badge: 'diamond', year: '2024', km: '1,200 km', image: 'https://images.pexels.com/photos/1638459/pexels-photo-1638459.jpeg?auto=compress&w=600' },
  { title: 'Range Rover Autobiography', price: 1850000, location: 'Casablanca', time: '1 day ago', badge: 'diamond', year: '2023', km: '18,000 km', image: 'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&w=600' },
]

function CarCard({ item }: { item: typeof listings[0] }) {
  const [saved, setSaved] = useState(false)
  const [hovered, setHovered] = useState(false)
  const { formatPrice } = useMarket()
  return (
    <article onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{ backgroundColor: 'white', borderRadius: '28px', overflow: 'hidden', boxShadow: hovered ? '0 20px 40px rgba(0,0,0,0.1)' : '0 2px 8px rgba(0,0,0,0.04)', border: '1px solid #f1f5f9', transition: 'all 0.3s', display: 'flex', flexDirection: 'column' }}
    >
      <div style={{ position: 'relative', height: '200px', overflow: 'hidden' }}>
        <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s', transform: hovered ? 'scale(1.06)' : 'scale(1)' }} />
        {item.badge === 'diamond' && <div style={{ position: 'absolute', top: '12px', left: '12px', background: 'linear-gradient(135deg, #2dd4bf, #0d9488)', color: 'white', fontSize: '9px', fontWeight: 700, padding: '4px 10px', borderRadius: '100px', textTransform: 'uppercase' }}>💎 Diamond</div>}
        {item.badge === 'verified' && <div style={{ position: 'absolute', top: '12px', left: '12px', backgroundColor: 'rgba(255,255,255,0.9)', color: '#2dd4bf', fontSize: '9px', fontWeight: 700, padding: '4px 10px', borderRadius: '100px', textTransform: 'uppercase' }}>✓ Verified</div>}
        <button onClick={e => { e.stopPropagation(); setSaved(!saved) }} style={{ position: 'absolute', top: '12px', right: '12px', width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.9)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px' }}>{saved ? '❤️' : '🤍'}</button>
      </div>
      <div style={{ padding: '16px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a', marginBottom: '6px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.title}</h3>
        <div style={{ display: 'flex', gap: '12px', fontSize: '11px', color: '#64748b', marginBottom: '8px' }}>
          <span>📅 {item.year}</span><span>🛣️ {item.km}</span>
        </div>
        <div style={{ fontSize: '18px', fontWeight: 800, color: '#2dd4bf', marginBottom: '8px' }}>{formatPrice(item.price)}</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#94a3b8', borderTop: '1px solid #f8fafc', paddingTop: '8px', marginBottom: '12px' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}><MapPin size={11} />{item.location}</span>
          <span>{item.time}</span>
        </div>
        <div style={{ display: 'flex', gap: '8px', marginTop: 'auto' }}>
          <button style={{ flex: 1, padding: '10px', borderRadius: '10px', border: 'none', backgroundColor: 'rgba(45,212,191,0.1)', color: '#2dd4bf', fontWeight: 700, fontSize: '12px', cursor: 'pointer', transition: 'all 0.15s' }}
            onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#2dd4bf'; e.currentTarget.style.color = 'white' }}
            onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'rgba(45,212,191,0.1)'; e.currentTarget.style.color = '#2dd4bf' }}
          >💬 Chat</button>
          <button style={{ flex: 1, padding: '10px', borderRadius: '10px', border: 'none', backgroundColor: '#22c55e', color: 'white', fontWeight: 700, fontSize: '12px', cursor: 'pointer', transition: 'background 0.15s' }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#16a34a'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = '#22c55e'}
          >📱 WhatsApp</button>
        </div>
      </div>
    </article>
  )
}

export default function CarsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = React.use(params)
  return (
    <div style={{ fontFamily: 'Inter, system-ui, sans-serif', backgroundColor: '#f4fbf8', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '32px 24px 80px' }}>
        {/* Breadcrumb */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#64748b', marginBottom: '24px' }}>
          <Link href={`/${locale}`} style={{ color: '#2dd4bf', textDecoration: 'none', fontWeight: 600 }}>Home</Link>
          <span>›</span>
          <Link href={`/${locale}/motors`} style={{ color: '#2dd4bf', textDecoration: 'none', fontWeight: 600 }}>Motors</Link>
          <span>›</span>
          <span style={{ color: '#0f172a', fontWeight: 700 }}>Used Cars</span>
        </nav>
        <h1 style={{ fontSize: '32px', fontWeight: 800, color: '#0f172a', marginBottom: '8px' }}>Used Cars for Sale in Morocco</h1>
        <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '32px' }}>24,180 verified listings across Morocco</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
          {listings.map((item, i) => <CarCard key={i} item={item} />)}
        </div>
      </div>
    </div>
  )
}
