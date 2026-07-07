'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { Heart, Search, MapPin, ChevronRight, Shield } from 'lucide-react'
import { useMarket } from '@/context/MarketContext'

const vaultCategories = [
  { label: 'Jewelry & Watches', count: '3,214', slug: 'jewelry-watches', image: 'https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&w=600' },
  { label: 'Musical Instruments', count: '1,842', slug: 'musical-instruments', image: 'https://images.pexels.com/photos/1644616/pexels-photo-1644616.jpeg?auto=compress&w=600' },
  { label: 'Home & Garden', count: '2,719', slug: 'home-garden', image: 'https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg?auto=compress&w=600' },
  { label: 'Gaming', count: '4,103', slug: 'gaming', image: 'https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?auto=compress&w=600' },
  { label: 'Baby Items', count: '1,560', slug: 'baby-items', image: 'https://images.pexels.com/photos/3933250/pexels-photo-3933250.jpeg?auto=compress&w=600' },
  { label: 'Pets & Accessories', count: '980', slug: 'pets-accessories', image: 'https://images.pexels.com/photos/1490908/pexels-photo-1490908.jpeg?auto=compress&w=600' },
  { label: 'Tickets & Vouchers', count: '897', slug: 'tickets-vouchers', image: 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&w=600' },
  { label: 'Toys', count: '2,340', slug: 'toys', image: 'https://images.pexels.com/photos/163696/toy-car-toy-box-mini-cars-163696.jpeg?auto=compress&w=600' },
  { label: 'Home Appliances', count: '8,453', slug: 'home-appliances', image: 'https://images.pexels.com/photos/4108715/pexels-photo-4108715.jpeg?auto=compress&w=600' },
  { label: 'Sports Equipment', count: '3,760', slug: 'sports-equipment', image: 'https://images.pexels.com/photos/1552249/pexels-photo-1552249.jpeg?auto=compress&w=600' },
]

const categories = [
  { title: 'Home & Garden', slug: 'home-garden', items: [
    { price: 45000, title: 'Luxury teak outdoor lounge set with premium cushions', location: 'Marrakech, Palmeraie', time: '2 hours ago', image: 'https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg?auto=compress&w=600' },
    { price: 12500, title: 'Contemporary marble dining set with 4 velvet chairs', location: 'Casablanca, Anfa', time: '5 hours ago', image: 'https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg?auto=compress&w=600' },
    { price: 3400, title: 'High-end ergonomic executive leather office chair', location: 'Rabat, Agdal', time: '1 day ago', image: 'https://images.pexels.com/photos/1957478/pexels-photo-1957478.jpeg?auto=compress&w=600' },
    { price: 1850, title: 'Minimalist gold finish designer floor lamp', location: 'Tangier, Center', time: '45 min ago', image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&w=600' },
  ]},
  { title: 'Jewelry & Watches', slug: 'jewelry-watches', items: [
    { price: 189000, title: 'Patek Philippe Nautilus — Ref. 5711', location: 'Casablanca, Maarif', time: 'Just now', image: 'https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&w=600' },
    { price: 75000, title: 'Rolex Submariner Date — Ceramic Bezel', location: 'Rabat, Souissi', time: '1 hour ago', image: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&w=600' },
    { price: 24000, title: 'Cartier Love Bracelet — 18K Yellow Gold', location: 'Marrakech, Hivernage', time: '3 hours ago', image: 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&w=600' },
    { price: 18500, title: 'Van Cleef & Arpels Alhambra Necklace', location: 'Tangier, Malabata', time: '5 hours ago', image: 'https://images.pexels.com/photos/965989/pexels-photo-965989.jpeg?auto=compress&w=600' },
  ]},
]

function VaultCard({ item }: { item: { price: number; title: string; location: string; time: string; image: string } }) {
  const [saved, setSaved] = useState(false)
  const [hovered, setHovered] = useState(false)
  const { formatPrice } = useMarket()

  return (
    <article onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} style={{ backgroundColor: 'white', borderRadius: '40px', overflow: 'hidden', boxShadow: hovered ? '0 20px 40px rgba(0,0,0,0.12)' : '0 2px 8px rgba(0,0,0,0.04)', border: '1px solid #f1f5f9', transition: 'all 0.3s', display: 'flex', flexDirection: 'column', cursor: 'pointer' }}>
      <div style={{ position: 'relative', height: '224px', overflow: 'hidden' }}>
        <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s', transform: hovered ? 'scale(1.1)' : 'scale(1)' }} />
        <div style={{ position: 'absolute', top: '14px', left: '14px', zIndex: 2 }}>
          <span style={{ background: 'linear-gradient(135deg, #2dd4bf, #0d9488)', color: 'white', fontSize: '9px', fontWeight: 700, padding: '5px 12px', borderRadius: '100px', boxShadow: '0 4px 12px rgba(45,212,191,0.4)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Diamond Member</span>
        </div>
        <button onClick={e => { e.stopPropagation(); setSaved(!saved) }} style={{ position: 'absolute', bottom: '14px', right: '14px', zIndex: 2, backgroundColor: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(8px)', width: '36px', height: '36px', borderRadius: '50%', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}>
          <Heart size={16} fill={saved ? '#ef4444' : 'none'} color={saved ? '#ef4444' : '#0f172a'} />
        </button>
      </div>
      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginBottom: '6px' }}>
          <span style={{ fontSize: '22px', fontWeight: 700, color: '#2dd4bf' }}>{formatPrice(item.price)}</span>
        </div>
        <h4 style={{ fontWeight: 600, color: '#0f172a', marginBottom: '12px', fontSize: '15px', lineHeight: 1.4, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{item.title}</h4>
        <div style={{ marginTop: 'auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '11px', color: '#7A7A7A', borderTop: '1px solid #f8fafc', paddingTop: '14px', marginBottom: '14px' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><MapPin size={13} />{item.location}</span>
            <span>{item.time}</span>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button style={{ flex: 1, backgroundColor: 'rgba(45,212,191,0.1)', color: '#2dd4bf', border: 'none', fontWeight: 700, padding: '12px 8px', borderRadius: '12px', cursor: 'pointer', fontSize: '13px', transition: 'all 0.15s' }} onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#2dd4bf'; e.currentTarget.style.color = 'white' }} onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'rgba(45,212,191,0.1)'; e.currentTarget.style.color = '#2dd4bf' }}>Chat</button>
            <button style={{ flex: 1, backgroundColor: '#22c55e', color: 'white', border: 'none', fontWeight: 700, padding: '12px 8px', borderRadius: '12px', cursor: 'pointer', fontSize: '13px', transition: 'background 0.15s' }} onMouseEnter={e => e.currentTarget.style.backgroundColor = '#16a34a'} onMouseLeave={e => e.currentTarget.style.backgroundColor = '#22c55e'}>WhatsApp</button>
          </div>
        </div>
      </div>
    </article>
  )
}

export default function VaultPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = React.use(params)
  const [searchVal, setSearchVal] = useState('')

  return (
    <div style={{ fontFamily: 'Inter, system-ui, sans-serif', backgroundColor: '#f4fbf8', minHeight: '100vh' }}>
      <main>
        {/* HERO */}
        <section style={{ position: 'relative', height: '440px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 16px' }}>
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(15,23,42,0.42), rgba(15,23,42,0.42)), url(https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg?auto=compress&w=1600)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
          <div style={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: '720px', textAlign: 'center' }}>
            <h1 style={{ fontSize: '48px', fontWeight: 800, color: 'white', marginBottom: '8px', textShadow: '0 2px 20px rgba(0,0,0,0.3)', letterSpacing: '-0.02em', lineHeight: 1.1 }}>The Vault</h1>
            <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '16px', marginBottom: '28px' }}>Morocco's finest collectibles, lifestyle goods, and luxury pieces</p>
            <div style={{ background: 'rgba(255,255,255,0.72)', backdropFilter: 'blur(16px)', borderRadius: '100px', padding: '6px 6px 6px 24px', display: 'flex', alignItems: 'center', boxShadow: '0 20px 60px rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.35)' }}>
              <input value={searchVal} onChange={e => setSearchVal(e.target.value)} type="text" placeholder="Search for anything in The Vault..." style={{ flex: 1, backgroundColor: 'transparent', border: 'none', outline: 'none', padding: '10px 16px', fontSize: '15px', fontFamily: 'Inter, sans-serif', color: '#0f172a' }} />
              <button style={{ backgroundColor: '#2dd4bf', color: 'white', border: 'none', padding: '12px 28px', borderRadius: '100px', fontWeight: 700, fontSize: '13px', cursor: 'pointer', transition: 'background 0.15s' }} onMouseEnter={e => e.currentTarget.style.backgroundColor = '#0f9b8e'} onMouseLeave={e => e.currentTarget.style.backgroundColor = '#2dd4bf'}><Search size={18} /></button>
            </div>
          </div>
        </section>

        {/* CATEGORY GRID — real links to sub-pages */}
        <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px', marginTop: '-48px', position: 'relative', zIndex: 20 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px' }}>
            {vaultCategories.map(cat => (
              <Link key={cat.slug} href={`/${locale}/${cat.slug}`} style={{ textDecoration: 'none' }}>
                <div style={{ position: 'relative', height: '140px', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 8px 32px rgba(0,0,0,0.1)', cursor: 'pointer', transition: 'transform 0.2s' }}
                  onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.transform = 'scale(1.04)'}
                  onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.transform = 'scale(1)'}>
                  <img src={cat.image} alt={cat.label} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.85), rgba(0,0,0,0.1))' }} />
                  <div style={{ position: 'absolute', bottom: '12px', left: '12px', right: '12px' }}>
                    <p style={{ fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, color: '#62fae3', marginBottom: '4px' }}>{cat.count} listings</p>
                    <p style={{ fontSize: '14px', fontWeight: 800, color: 'white', letterSpacing: '-0.01em' }}>{cat.label}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* TRUST BANNER */}
        <section style={{ maxWidth: '1280px', margin: '32px auto 0', padding: '0 24px' }}>
          <div style={{ backgroundColor: 'white', borderRadius: '24px', border: '1px solid #f1f5f9', padding: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ backgroundColor: 'rgba(45,212,191,0.1)', padding: '16px', borderRadius: '50%', flexShrink: 0 }}><Shield size={28} color="#2dd4bf" /></div>
              <div>
                <h3 style={{ fontWeight: 700, fontSize: '17px', color: '#0f172a', marginBottom: '4px' }}>Are you a SouKni Diamond member yet?</h3>
                <p style={{ fontSize: '13px', color: '#64748b' }}>Get more visibility · Enhance your credibility in the Moroccan marketplace</p>
              </div>
            </div>
            <button style={{ border: '2px solid #e2e8f0', padding: '12px 32px', borderRadius: '100px', fontWeight: 700, color: '#0f172a', backgroundColor: 'transparent', cursor: 'pointer', fontSize: '13px', whiteSpace: 'nowrap' }} onMouseEnter={e => e.currentTarget.style.backgroundColor = '#f8fafc'} onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}>Get Started</button>
          </div>
        </section>

        {/* DISCOVERY SECTIONS */}
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '48px 24px 80px', display: 'flex', flexDirection: 'column', gap: '64px' }}>
          {categories.map(cat => (
            <section key={cat.title}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
                <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#0f172a' }}>{cat.title} <span style={{ color: '#2dd4bf', fontSize: '16px', fontWeight: 400 }}>(Featured)</span></h2>
                <Link href={`/${locale}/${cat.slug}`} style={{ color: '#2dd4bf', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px', textDecoration: 'none', fontSize: '14px' }}>View all <ChevronRight size={16} /></Link>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
                {cat.items.map((item, i) => <VaultCard key={i} item={item} />)}
              </div>
            </section>
          ))}
        </div>
      </main>
    </div>
  )
}
