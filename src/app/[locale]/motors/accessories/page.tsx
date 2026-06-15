'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { MapPin } from 'lucide-react'
import { useMarket } from '@/context/MarketContext'

const listings = [
  { title: 'Brembo GT Braking System', price: 12400, cat: 'Performance', cond: 'Brand New', location: 'Casablanca', time: '1 hour ago', badge: 'verified', image: 'https://images.pexels.com/photos/4489749/pexels-photo-4489749.jpeg?auto=compress&w=600' },
  { title: 'Vossen HF-5 Forged Wheels', price: 28000, cat: 'Exterior', cond: 'Used (Excellent)', location: 'Rabat', time: '2 hours ago', badge: 'diamond', image: 'https://images.pexels.com/photos/244553/pexels-photo-244553.jpeg?auto=compress&w=600' },
  { title: 'Garrett G-Series Turbo', price: 15500, cat: 'Engine', cond: 'Brand New', location: 'Casablanca', time: '3 hours ago', badge: 'verified', image: 'https://images.pexels.com/photos/1482516/pexels-photo-1482516.jpeg?auto=compress&w=600' },
  { title: 'Akrapovic Titanium Exhaust', price: 42000, cat: 'Exhaust', cond: 'Brand New', location: 'Marrakech', time: 'Just now', badge: 'diamond', image: 'https://images.pexels.com/photos/3807517/pexels-photo-3807517.jpeg?auto=compress&w=600' },
  { title: 'HRE Performance Wheels Set', price: 35000, cat: 'Exterior', cond: 'Brand New', location: 'Tangier', time: '4 hours ago', badge: 'diamond', image: 'https://images.pexels.com/photos/244553/pexels-photo-244553.jpeg?auto=compress&w=600' },
  { title: 'KW Coilover Suspension V3', price: 18500, cat: 'Suspension', cond: 'Brand New', location: 'Casablanca', time: '5 hours ago', badge: 'verified', image: 'https://images.pexels.com/photos/4489749/pexels-photo-4489749.jpeg?auto=compress&w=600' },
  { title: 'Recaro Sport Seats Pair', price: 22000, cat: 'Interior', cond: 'Brand New', location: 'Rabat', time: '1 day ago', badge: 'verified', image: 'https://images.pexels.com/photos/3807517/pexels-photo-3807517.jpeg?auto=compress&w=600' },
  { title: 'Michelin Pilot Sport 5 Set', price: 8400, cat: 'Tyres', cond: 'Brand New', location: 'Agadir', time: '1 day ago', badge: 'verified', image: 'https://images.pexels.com/photos/1482516/pexels-photo-1482516.jpeg?auto=compress&w=600' },
]

function AccessoryCard({ item }: { item: typeof listings[0] }) {
  const [saved, setSaved] = useState(false)
  const [hovered, setHovered] = useState(false)
  const { formatPrice } = useMarket()
  return (
    <article onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{ backgroundColor: 'white', borderRadius: '28px', overflow: 'hidden', boxShadow: hovered ? '0 20px 40px rgba(0,0,0,0.1)' : '0 2px 8px rgba(0,0,0,0.04)', border: '1px solid #f1f5f9', transition: 'all 0.3s', display: 'flex', flexDirection: 'column' }}>
      <div style={{ position: 'relative', height: '180px', overflow: 'hidden' }}>
        <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s', transform: hovered ? 'scale(1.06)' : 'scale(1)' }} />
        {item.badge === 'diamond' && <div style={{ position: 'absolute', top: '12px', left: '12px', background: 'linear-gradient(135deg, #2dd4bf, #0d9488)', color: 'white', fontSize: '9px', fontWeight: 700, padding: '4px 10px', borderRadius: '100px', textTransform: 'uppercase' }}>💎 Diamond</div>}
        {item.badge === 'verified' && <div style={{ position: 'absolute', top: '12px', left: '12px', backgroundColor: 'rgba(255,255,255,0.9)', color: '#2dd4bf', fontSize: '9px', fontWeight: 700, padding: '4px 10px', borderRadius: '100px', textTransform: 'uppercase' }}>✓ Verified</div>}
        <button onClick={e => { e.stopPropagation(); setSaved(!saved) }} style={{ position: 'absolute', top: '12px', right: '12px', width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.9)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px' }}>{saved ? '❤️' : '🤍'}</button>
      </div>
      <div style={{ padding: '16px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ fontSize: '9px', fontWeight: 700, color: '#2dd4bf', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '4px' }}>{item.cat}</div>
        <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a', marginBottom: '4px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.title}</h3>
        <div style={{ fontSize: '11px', color: '#64748b', marginBottom: '8px' }}>📦 {item.cond}</div>
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

export default function AccessoriesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = React.use(params)
  return (
    <div style={{ fontFamily: 'Inter, system-ui, sans-serif', backgroundColor: '#f4fbf8', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '32px 24px 80px' }}>
        <nav style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#64748b', marginBottom: '24px' }}>
          <Link href={`/${locale}`} style={{ color: '#2dd4bf', textDecoration: 'none', fontWeight: 600 }}>Home</Link>
          <span>›</span>
          <Link href={`/${locale}/motors`} style={{ color: '#2dd4bf', textDecoration: 'none', fontWeight: 600 }}>Motors</Link>
          <span>›</span>
          <span style={{ color: '#0f172a', fontWeight: 700 }}>Parts & Accessories</span>
        </nav>
        <h1 style={{ fontSize: '32px', fontWeight: 800, color: '#0f172a', marginBottom: '8px' }}>Car Parts & Accessories in Morocco</h1>
        <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '32px' }}>3,215 verified listings across Morocco</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
          {listings.map((item, i) => <AccessoryCard key={i} item={item} />)}
        </div>
      </div>
    </div>
  )
}
