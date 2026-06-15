'use client'

import React, { useState } from 'react'
import Link from 'next/link'

const statsCards = [
  { icon: '🚗', label: 'Used Cars', count: '24,180', slug: 'cars' },
  { icon: '🚙', label: 'Rental Cars', count: '1,840', slug: 'rental' },
  { icon: '🔧', label: 'Parts & Accessories', count: '3,215', slug: 'accessories' },
  { icon: '🏍️', label: 'Moto & Scooters', count: '642', slug: 'motorcycles' },
  { icon: '🚛', label: 'Trucks & Vans', count: '195', slug: 'cars' },
  { icon: '🚜', label: 'Agro & Heavy', count: '84', slug: 'cars' },
]

const usedCars = [
  { title: 'BMW M4 Competition', price: '785k', unit: 'MAD', badge: 'Certified', badgeColor: 'rgba(0,107,95,0.9)', year: '2023', km: '12,500km', image: 'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&w=500' },
  { title: 'Land Rover Defender', price: '1.2M', unit: 'MAD', badge: 'Verified Diamond', badgeColor: '#8d4f00', year: '2024', km: '2,100km', image: 'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&w=500' },
  { title: 'Audi e-tron GT', price: '1.45M', unit: 'MAD', badge: null, year: '2024', km: 'Electric', image: 'https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg?auto=compress&w=500' },
  { title: 'Chevrolet Corvette', price: '640k', unit: 'MAD', badge: 'Diamond', badgeColor: 'rgba(0,107,95,0.9)', year: '2021', km: '45,000km', image: 'https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg?auto=compress&w=500' },
]

const rentalCars = [
  { title: 'Range Rover Vogue', price: '2,500', unit: 'MAD/day', badge: 'Certified', badgeColor: 'rgba(0,107,95,0.9)', location: 'Casablanca', year: '2024', image: 'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&w=500' },
  { title: 'Porsche 911 Carrera', price: '4,800', unit: 'MAD/day', badge: 'Verified Diamond', badgeColor: '#8d4f00', location: 'Marrakech', year: '2023', image: 'https://images.pexels.com/photos/1638459/pexels-photo-1638459.jpeg?auto=compress&w=500' },
  { title: 'Mercedes S-Class', price: '3,200', unit: 'MAD/day', badge: 'Certified', badgeColor: 'rgba(0,107,95,0.9)', location: 'Tangier', year: '2024', image: 'https://images.pexels.com/photos/120049/pexels-photo-120049.jpeg?auto=compress&w=500' },
  { title: 'Audi A6 Limousine', price: '1,200', unit: 'MAD/day', badge: null, location: 'Rabat', year: '2023', image: 'https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg?auto=compress&w=500' },
]

const parts = [
  { title: 'Brembo GT Braking System', price: '12,400', unit: 'MAD', badge: 'Certified', badgeColor: 'rgba(0,107,95,0.9)', cat: 'Performance', cond: 'Brand New', image: 'https://images.pexels.com/photos/4489749/pexels-photo-4489749.jpeg?auto=compress&w=500' },
  { title: 'Vossen HF-5 Wheels', price: '28,000', unit: 'MAD', badge: null, cat: 'Exterior', cond: 'Used (Excl)', image: 'https://images.pexels.com/photos/244553/pexels-photo-244553.jpeg?auto=compress&w=500' },
  { title: 'Garrett G-Series Turbo', price: '15,500', unit: 'MAD', badge: 'Certified', badgeColor: 'rgba(0,107,95,0.9)', cat: 'Engine', cond: 'New', image: 'https://images.pexels.com/photos/1482516/pexels-photo-1482516.jpeg?auto=compress&w=500' },
  { title: 'Akrapovic Titanium', price: '42,000', unit: 'MAD', badge: null, cat: 'Exhaust', cond: 'Brand New', image: 'https://images.pexels.com/photos/3807517/pexels-photo-3807517.jpeg?auto=compress&w=500' },
]

const motorcycles = [
  { title: 'Ducati Panigale V4', price: '245k', unit: 'MAD', badge: 'Certified', badgeColor: 'rgba(0,107,95,0.9)', year: '2023', km: '1,200km', image: 'https://images.pexels.com/photos/2607554/pexels-photo-2607554.jpeg?auto=compress&w=500' },
  { title: 'Harley Davidson Iron 883', price: '115k', unit: 'MAD', badge: 'Verified Diamond', badgeColor: '#8d4f00', year: '2021', km: '8,500km', image: 'https://images.pexels.com/photos/1413412/pexels-photo-1413412.jpeg?auto=compress&w=500' },
  { title: 'BMW R 1250 GS', price: '185k', unit: 'MAD', badge: null, year: '2022', km: '12,000km', image: 'https://images.pexels.com/photos/1715193/pexels-photo-1715193.jpeg?auto=compress&w=500' },
  { title: 'KTM 1290 Super Duke R', price: '245,000', unit: 'MAD', badge: 'Diamond Member', badgeColor: '#8d4f00', year: '2024', km: '0 km', image: 'https://images.pexels.com/photos/2519374/pexels-photo-2519374.jpeg?auto=compress&w=500' },
]

const testimonials = [
  { text: "I've been using SouKni for 10 years, I've lost count of the cars I've bought and sold. It's become so addictive — planning the next car is both fast & fun.", name: 'Sean C.', avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&w=100' },
  { text: "SouKni revealed 4 accidents on a car the seller claimed had none. Saved me a huge mistake for less than 100 MAD.", name: 'Ed S.', avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&w=100' },
  { text: "Put my car up for sale on SouKni. Got a call within an hour and sold within the same day.", name: 'Hitesh U.', avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&w=100' },
]

function CardButtons() {
  return (
    <div style={{ display: 'flex', gap: '8px' }}>
      <button style={{ flex: 1, backgroundColor: 'rgba(45,212,191,0.1)', color: '#2dd4bf', border: 'none', padding: '12px', borderRadius: '12px', fontWeight: 700, fontSize: '13px', cursor: 'pointer', transition: 'all 0.15s' }}
        onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#2dd4bf'; e.currentTarget.style.color = 'white' }}
        onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'rgba(45,212,191,0.1)'; e.currentTarget.style.color = '#2dd4bf' }}
      >💬 Chat</button>
      <button style={{ flex: 1, backgroundColor: '#22c55e', color: 'white', border: 'none', padding: '12px', borderRadius: '12px', fontWeight: 700, fontSize: '13px', cursor: 'pointer', transition: 'background 0.15s' }}
        onMouseEnter={e => e.currentTarget.style.backgroundColor = '#16a34a'}
        onMouseLeave={e => e.currentTarget.style.backgroundColor = '#22c55e'}
      >📱 WhatsApp</button>
    </div>
  )
}

function CarCard({ item, type }: { item: any; type: 'car' | 'rental' | 'part' | 'moto' }) {
  const [liked, setLiked] = useState(false)
  const [hovered, setHovered] = useState(false)
  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{ backgroundColor: 'white', borderRadius: '32px', overflow: 'hidden', boxShadow: hovered ? '0 24px 48px rgba(0,0,0,0.12)' : '0 4px 16px rgba(0,0,0,0.06)', transition: 'all 0.3s', transform: hovered ? 'translateY(-6px)' : 'translateY(0)' }}
    >
      <div style={{ position: 'relative', aspectRatio: '4/3', overflow: 'hidden' }}>
        <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.7s', transform: hovered ? 'scale(1.08)' : 'scale(1)' }} />
        {item.badge && (
          <div style={{ position: 'absolute', top: '14px', left: '14px' }}>
            <span style={{ backgroundColor: item.badgeColor, color: 'white', fontSize: '10px', fontWeight: 700, padding: '4px 12px', borderRadius: '100px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{item.badge}</span>
          </div>
        )}
        <button onClick={() => setLiked(!liked)} style={{ position: 'absolute', top: '14px', right: '14px', backgroundColor: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(8px)', border: 'none', width: '34px', height: '34px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '15px', color: liked ? '#ef4444' : 'white', transition: 'all 0.2s' }}>
          {liked ? '♥' : '♡'}
        </button>
      </div>
      <div style={{ padding: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a', flex: 1, paddingRight: '8px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.title}</h3>
          <span style={{ color: '#2dd4bf', fontWeight: 800, fontSize: '16px', whiteSpace: 'nowrap' }}>{item.price} <span style={{ fontSize: '11px', fontWeight: 400, color: '#64748b' }}>{item.unit}</span></span>
        </div>
        <div style={{ display: 'flex', gap: '14px', fontSize: '12px', color: '#64748b', fontWeight: 600, marginBottom: '16px', paddingBottom: '16px', borderBottom: '1px solid #f1f5f9' }}>
          {type === 'car' || type === 'moto' ? (<><span>📅 {item.year}</span><span>{item.km}</span></>) :
           type === 'rental' ? (<><span>📍 {item.location}</span><span>📅 {item.year}</span></>) :
           (<><span>🏷️ {item.cat}</span><span>📦 {item.cond}</span></>)}
        </div>
        <CardButtons />
      </div>
    </div>
  )
}

function SectionHeader({ title, href, locale }: { title: string; href: string; locale: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px' }}>
      <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#0f172a' }}>{title}</h2>
      <Link href={`/${locale}/motors/${href}`} style={{ color: '#2dd4bf', fontSize: '13px', fontWeight: 700, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px', transition: 'gap 0.2s' }}
        onMouseEnter={e => e.currentTarget.style.gap = '8px'}
        onMouseLeave={e => e.currentTarget.style.gap = '4px'}
      >View all →</Link>
    </div>
  )
}

export default function MotorsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = React.use(params)

  return (
    <div style={{ fontFamily: 'Inter, system-ui, sans-serif', backgroundColor: '#f4fbf8', minHeight: '100vh' }}>

      {/* HERO */}
      <section style={{ position: 'relative', height: '460px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        <img src="https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&w=1400" alt="Motors Hero" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(15,23,42,0.7), rgba(0,0,0,0.1))' }} />
        <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', padding: '0 20px', maxWidth: '700px', width: '100%' }}>
          <h1 style={{ fontSize: '48px', fontWeight: 800, color: 'white', letterSpacing: '-0.02em', textShadow: '0 4px 20px rgba(0,0,0,0.3)', lineHeight: 1.1, marginBottom: '28px' }}>Find your dream engine</h1>
          <div style={{ width: '100%', background: 'rgba(255,255,255,0.72)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.4)', borderRadius: '100px', padding: '6px 6px 6px 24px', display: 'flex', alignItems: 'center', boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }}>
            <span style={{ fontSize: '18px', marginRight: '8px' }}>🔍</span>
            <input type="text" placeholder="Search motors, brands or models..." style={{ flex: 1, backgroundColor: 'transparent', border: 'none', outline: 'none', fontSize: '15px', color: '#0f172a', fontFamily: 'Inter, sans-serif' }} />
            <button style={{ backgroundColor: '#2dd4bf', color: 'white', border: 'none', padding: '12px 28px', borderRadius: '100px', fontWeight: 700, fontSize: '13px', cursor: 'pointer', transition: 'background 0.15s' }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = '#0f9b8e'}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = '#2dd4bf'}
            >Search</button>
          </div>
        </div>
      </section>

      {/* STATS CARDS — all clickable */}
      <section style={{ maxWidth: '1280px', margin: '-48px auto 0', padding: '0 24px', position: 'relative', zIndex: 20 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '14px' }}>
          {statsCards.map(card => (
            <Link key={card.label} href={`/${locale}/motors/${card.slug}`} style={{ textDecoration: 'none' }}>
              <div style={{ backgroundColor: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.4)', padding: '20px', borderRadius: '20px', boxShadow: '0 8px 24px rgba(0,0,0,0.06)', cursor: 'pointer', transition: 'all 0.2s', textAlign: 'center' }}
                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-3px)'; (e.currentTarget as HTMLDivElement).style.boxShadow = '0 12px 32px rgba(45,212,191,0.15)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLDivElement).style.boxShadow = '0 8px 24px rgba(0,0,0,0.06)' }}
              >
                <div style={{ fontSize: '24px', marginBottom: '8px' }}>{card.icon}</div>
                <p style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#64748b', marginBottom: '4px' }}>{card.label}</p>
                <p style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a' }}>{card.count}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* SELL BANNER */}
      <section style={{ maxWidth: '1280px', margin: '56px auto 0', padding: '0 24px' }}>
        <div style={{ backgroundColor: 'rgba(45,212,191,0.1)', borderRadius: '40px', padding: '48px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '32px', border: '1px solid rgba(45,212,191,0.25)' }}>
          <div>
            <h2 style={{ fontSize: '40px', fontWeight: 800, color: '#0f172a', marginBottom: '12px', letterSpacing: '-0.02em' }}>Sell your car in minutes</h2>
            <p style={{ fontSize: '17px', color: '#475569', maxWidth: '520px', lineHeight: 1.6 }}>Join Morocco's largest community of buyers and sellers. Get the best market value for your vehicle today.</p>
          </div>
          <button style={{ backgroundColor: '#2dd4bf', color: 'white', border: 'none', padding: '16px 36px', borderRadius: '100px', fontSize: '15px', fontWeight: 700, cursor: 'pointer', boxShadow: '0 8px 24px rgba(45,212,191,0.3)', transition: 'all 0.2s', whiteSpace: 'nowrap' }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#0f9b8e'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = '#2dd4bf'}
          >Post FREE Ad →</button>
        </div>
      </section>

      {/* CAR SECTIONS */}
      {[
        { title: 'Featured Used Cars', items: usedCars, type: 'car' as const, slug: 'cars' },
        { title: 'Featured Rental Cars', items: rentalCars, type: 'rental' as const, slug: 'rental' },
        { title: 'Featured Parts & Accessories', items: parts, type: 'part' as const, slug: 'accessories' },
        { title: 'Featured Motorcycles', items: motorcycles, type: 'moto' as const, slug: 'motorcycles' },
      ].map(section => (
        <section key={section.title} style={{ maxWidth: '1280px', margin: '0 auto', padding: '56px 24px 0' }}>
          <SectionHeader title={section.title} href={section.slug} locale={locale} />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
            {section.items.map(item => <CarCard key={item.title} item={item} type={section.type} />)}
          </div>
        </section>
      ))}

      {/* DIAMOND BANNER */}
      <section style={{ maxWidth: '1280px', margin: '56px auto 0', padding: '0 24px' }}>
        <div style={{ position: 'relative', height: '360px', borderRadius: '40px', overflow: 'hidden' }}>
          <img src="https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg?auto=compress&w=1400" alt="Diamond" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(15,23,42,0.5)' }} />
          <div style={{ position: 'relative', zIndex: 10, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '24px' }}>
            <h2 style={{ fontSize: '38px', fontWeight: 800, color: 'white', marginBottom: '24px', maxWidth: '640px', lineHeight: 1.2, letterSpacing: '-0.02em' }}>Become a SouKni Diamond Certified Member</h2>
            <button style={{ backgroundColor: '#2dd4bf', color: '#00201c', border: 'none', padding: '14px 36px', borderRadius: '100px', fontSize: '16px', fontWeight: 700, cursor: 'pointer', boxShadow: '0 8px 24px rgba(45,212,191,0.4)', transition: 'all 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.04)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
            >Get Certified Now</button>
          </div>
        </div>
      </section>

      {/* INSPECTION BANNER */}
      <section style={{ maxWidth: '1280px', margin: '40px auto 0', padding: '0 24px' }}>
        <div style={{ backgroundColor: 'rgba(255,220,192,0.3)', borderRadius: '40px', padding: '40px 48px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '32px', border: '1px solid rgba(255,172,90,0.2)' }}>
          <div>
            <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>Request SouKni <span style={{ color: '#ba1a1a' }}>Car Inspection</span></h2>
            <p style={{ fontSize: '16px', color: '#475569', marginBottom: '24px', lineHeight: 1.6 }}>Trusted by 10K+ car buyers across Morocco</p>
            <div style={{ display: 'flex', gap: '28px', flexWrap: 'wrap' }}>
              {[{ icon: '✅', title: '120–240', sub: 'Points Covered' }, { icon: '📍', title: 'Anywhere', sub: 'In Morocco' }, { icon: '📅', title: 'Same Day', sub: 'Inspection' }].map(item => (
                <div key={item.title} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '44px', height: '44px', borderRadius: '50%', backgroundColor: 'rgba(255,172,90,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>{item.icon}</div>
                  <div>
                    <p style={{ fontWeight: 700, color: '#0f172a', fontSize: '14px' }}>{item.title}</p>
                    <p style={{ fontSize: '12px', color: '#64748b' }}>{item.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button style={{ backgroundColor: '#ba1a1a', color: 'white', border: 'none', padding: '14px 32px', borderRadius: '12px', fontWeight: 700, fontSize: '15px', cursor: 'pointer', whiteSpace: 'nowrap', transition: 'opacity 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.9'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
          >Book Inspection</button>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{ maxWidth: '1280px', margin: '56px auto 0', padding: '0 24px 80px' }}>
        <h2 style={{ fontSize: '32px', fontWeight: 800, color: '#0f172a', marginBottom: '28px', letterSpacing: '-0.02em' }}>What our community says</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
          {testimonials.map(t => (
            <div key={t.name} style={{ backgroundColor: 'white', padding: '28px', borderRadius: '24px', boxShadow: '0 4px 16px rgba(0,0,0,0.06)' }}>
              <p style={{ fontSize: '14px', color: '#475569', lineHeight: 1.7, fontStyle: 'italic', marginBottom: '20px' }}>"{t.text}"</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <img src={t.avatar} alt={t.name} style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }} />
                <span style={{ fontWeight: 700, color: '#2dd4bf', fontSize: '14px' }}>{t.name}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
