'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { MapPin } from 'lucide-react'
import { useMarket } from '@/context/MarketContext'

const listings = [
  { title: 'Ducati Panigale V4', price: 245000, location: 'Casablanca', time: '1 hour ago', badge: 'diamond', year: '2023', km: '1,200 km', image: 'https://images.pexels.com/photos/2607554/pexels-photo-2607554.jpeg?auto=compress&w=600' },
  { title: 'Harley Davidson Iron 883', price: 115000, location: 'Rabat', time: '2 hours ago', badge: 'diamond', year: '2021', km: '8,500 km', image: 'https://images.pexels.com/photos/1413412/pexels-photo-1413412.jpeg?auto=compress&w=600' },
  { title: 'BMW R 1250 GS', price: 185000, location: 'Marrakech', time: '3 hours ago', badge: 'verified', year: '2022', km: '12,000 km', image: 'https://images.pexels.com/photos/1715193/pexels-photo-1715193.jpeg?auto=compress&w=600' },
  { title: 'KTM 1290 Super Duke R', price: 245000, location: 'Tangier', time: 'Just now', badge: 'diamond', year: '2024', km: '0 km', image: 'https://images.pexels.com/photos/2519374/pexels-photo-2519374.jpeg?auto=compress&w=600' },
  { title: 'Honda CBR 1000RR', price: 130000, location: 'Casablanca', time: '5 hours ago', badge: 'verified', year: '2022', km: '6,400 km', image: 'https://images.pexels.com/photos/2607554/pexels-photo-2607554.jpeg?auto=compress&w=600' },
  { title: 'Yamaha MT-09 SP', price: 95000, location: 'Fès', time: '1 day ago', badge: 'verified', year: '2023', km: '3,200 km', image: 'https://images.pexels.com/photos/1715193/pexels-photo-1715193.jpeg?auto=compress&w=600' },
  { title: 'Kawasaki Ninja ZX-10R', price: 165000, location: 'Agadir', time: '1 day ago', badge: 'diamond', year: '2024', km: '0 km', image: 'https://images.pexels.com/photos/2519374/pexels-photo-2519374.jpeg?auto=compress&w=600' },
  { title: 'Triumph Speed Triple', price: 145000, location: 'Rabat', time: '2 days ago', badge: 'verified', year: '2022', km: '9,800 km', image: 'https://images.pexels.com/photos/1413412/pexels-photo-1413412.jpeg?auto=compress&w=600' },
]

function MotoCard({ item }: { item: typeof listings[0] }) {
  const [saved, setSaved] = useState(false)
  const [hovered, setHovered] = useState(false)
  const { formatPrice } = useMarket()
  return (
    <article onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{ backgroundColor: 'white', borderRadius: '28px', overflow: 'hidden', boxShadow: hovered ? '0 20px 40px rgba(0,0,0,0.1)' : '0 2px 8px rgba(0,0,0,0.04)', border: '1px solid #f1f5f9', transition: 'all 0.3s', display: 'flex', flexDirection: 'column' }}>
      <div style={{ position: 'relative', height: '200px', overflow: 'hidden' }}>
        <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s', transform: hovered ? 'scale(1.06)' : 'scale(1)' }} />
        {item.badge === 'diamond' && <div style={{ position: 'absolute', top: '12px', left: '12px', background: 'linear-gradient(135deg, #2dd4bf, #0d9488)', color: 'white', fontSize: '9px', fontWeight: 700, padding: '4px 10px', borderRadius: '100px', textTransform: 'uppercase' }}>💎 Diamond</div>}
        {item.badge === 'verified' && <div style={{ position: 'absolute', top: '12px', left: '12px', backgroundColor: 'rgba(255,255,255,0.9)', color: '#2dd4bf', fontSize: '9px', fontWeight: 700, padding: '4px 10px', borderRadius: '100px', textTransform: 'uppercase' }}>✓ Verified</div>}
        <button onClick={e => { e.stopPropagation(); setSaved(!saved) }} style={{ position: 'absolute', top: '12px', right: '12px', width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.9)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px' }}>{saved ? '❤️' : '🤍'}</button>
      </div>
      <div style={{ padding: '16px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a', marginBottom: '6px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.title}</h3>
        <div style={{ display: 'flex', gap: '12px', fontSize: '11px', color: '#64748b', marginBottom: '8px' }}><span>📅 {item.year}</span><span>🏍️ {item.km}</span></div>
        <div style={{ fontSize: '18px', fontWeight: 800, color: '#2dd4bf', marginBottom: '8px' }}>{formatPrice(item.price)}</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#94a3b8', borderTop: '1px solid #f8fafc', paddingTop: '8px', marginBottom: '12px' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}><MapPin size={11} />{item.location}</span><span>{item.time}</span>
        </div>
        <div style={{ display: 'flex', gap: '8px', marginTop: 'auto' }}>
          <button style={{ flex: 1, padding: '10px', borderRadius: '10px', border: 'none', backgroundColor: 'rgba(45,212,191,0.1)', color: '#2dd4bf', fontWeight: 700, fontSize: '12px', cursor: 'pointer', transition: 'all 0.15s' }}
            onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#2dd4bf'; e.currentTarget.style.color = 'white' }}
            onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'rgba(45,212,191,0.1)'; e.currentTarget.style.color = '#2dd4bf' }}
          >💬 Chat</button>
          <button style={{ flex: 1, padding: '10px', borderRadius: '10px', border: 'none', backgroundColor: '#22c55e', color: 'white', fontWeight: 700, fontSize: '12px', cursor: 'pointer' }}>📱 WhatsApp</button>
        </div>
      </div>
    </article>
  )
}

export default function MotorcyclesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = React.use(params)
  return (
    <div style={{ fontFamily: 'Inter, system-ui, sans-serif', backgroundColor: '#f4fbf8', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '32px 24px 80px' }}>
        <nav style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#64748b', marginBottom: '24px' }}>
          <Link href={`/${locale}`} style={{ color: '#2dd4bf', textDecoration: 'none', fontWeight: 600 }}>Home</Link>
          <span>›</span>
          <Link href={`/${locale}/motors`} style={{ color: '#2dd4bf', textDecoration: 'none', fontWeight: 600 }}>Motors</Link>
          <span>›</span>
          <span style={{ color: '#0f172a', fontWeight: 700 }}>Motorcycles</span>
        </nav>
        <h1 style={{ fontSize: '32px', fontWeight: 800, color: '#0f172a', marginBottom: '8px' }}>Motorcycles & Scooters in Morocco</h1>
        <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '32px' }}>642 verified listings across Morocco</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
          {listings.map((item, i) => <MotoCard key={i} item={item} />)}
        </div>
      </div>
    </div>
  )
}
