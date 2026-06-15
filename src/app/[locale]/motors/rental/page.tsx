'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { MapPin } from 'lucide-react'
import { useMarket } from '@/context/MarketContext'

const listings = [
  { title: 'Range Rover Vogue', pricePerDay: 2500, location: 'Casablanca', badge: 'diamond', year: '2024', image: 'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&w=600' },
  { title: 'Porsche 911 Carrera', pricePerDay: 4800, location: 'Marrakech', badge: 'diamond', year: '2023', image: 'https://images.pexels.com/photos/1638459/pexels-photo-1638459.jpeg?auto=compress&w=600' },
  { title: 'Mercedes S-Class', pricePerDay: 3200, location: 'Tangier', badge: 'verified', year: '2024', image: 'https://images.pexels.com/photos/120049/pexels-photo-120049.jpeg?auto=compress&w=600' },
  { title: 'Audi A6 Limousine', pricePerDay: 1200, location: 'Rabat', badge: 'verified', year: '2023', image: 'https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg?auto=compress&w=600' },
  { title: 'BMW 7 Series', pricePerDay: 2800, location: 'Casablanca', badge: 'diamond', year: '2024', image: 'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&w=600' },
  { title: 'Tesla Model S Plaid', pricePerDay: 3500, location: 'Rabat', badge: 'diamond', year: '2024', image: 'https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg?auto=compress&w=600' },
  { title: 'Ferrari Roma', pricePerDay: 8500, location: 'Marrakech', badge: 'diamond', year: '2023', image: 'https://images.pexels.com/photos/1638459/pexels-photo-1638459.jpeg?auto=compress&w=600' },
  { title: 'Lamborghini Urus', pricePerDay: 9200, location: 'Casablanca', badge: 'diamond', year: '2024', image: 'https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg?auto=compress&w=600' },
]

function RentalCard({ item }: { item: typeof listings[0] }) {
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
        <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a', marginBottom: '4px' }}>{item.title}</h3>
        <div style={{ fontSize: '11px', color: '#64748b', marginBottom: '8px' }}>📅 {item.year}</div>
        <div style={{ fontSize: '18px', fontWeight: 800, color: '#2dd4bf', marginBottom: '4px' }}>{formatPrice(item.pricePerDay)}<span style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 400 }}>/day</span></div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: '#94a3b8', borderTop: '1px solid #f8fafc', paddingTop: '8px', marginBottom: '12px' }}><MapPin size={11} />{item.location}</div>
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

export default function RentalPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = React.use(params)
  return (
    <div style={{ fontFamily: 'Inter, system-ui, sans-serif', backgroundColor: '#f4fbf8', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '32px 24px 80px' }}>
        <nav style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#64748b', marginBottom: '24px' }}>
          <Link href={`/${locale}`} style={{ color: '#2dd4bf', textDecoration: 'none', fontWeight: 600 }}>Home</Link>
          <span>›</span>
          <Link href={`/${locale}/motors`} style={{ color: '#2dd4bf', textDecoration: 'none', fontWeight: 600 }}>Motors</Link>
          <span>›</span>
          <span style={{ color: '#0f172a', fontWeight: 700 }}>Rental Cars</span>
        </nav>
        <h1 style={{ fontSize: '32px', fontWeight: 800, color: '#0f172a', marginBottom: '8px' }}>Car Rental in Morocco</h1>
        <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '32px' }}>1,840 verified rental listings across Morocco</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
          {listings.map((item, i) => <RentalCard key={i} item={item} />)}
        </div>
      </div>
    </div>
  )
}
