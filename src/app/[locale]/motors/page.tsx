'use client'

import React, { useState } from 'react'
import Link from 'next/link'

const navLinks = ['Motors', 'Property', 'The Vault', 'Services', 'Fashion', 'Jobs', 'Mobiles & Computers', 'Community']

const statsCards = [
  { icon: '🚗', label: 'Used Cars', count: '24,180' },
  { icon: '🚙', label: 'Rental Cars', count: '1,840' },
  { icon: '🔧', label: 'Parts & Accessories', count: '3,215' },
  { icon: '🏍️', label: 'Moto & Scooters', count: '642' },
  { icon: '🚛', label: 'Trucks & Vans', count: '195' },
  { icon: '🚜', label: 'Agro & Heavy Vehicles', count: '84' },
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
  { text: "I've been using SouKni now for 10 years, I've literally lost count of the number cars I've bought and sold from it. Its become so addictive, I tend to log-on most days - planning the next car is both fast & fun.", name: 'Sean Cain', avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&w=100' },
  { text: "CarReport recently saved me a trip to Oman for a car I was seriously looking at where the friendly seller claimed \"no accidents\". However for 99 dirhams and 2 minutes online, CarReport revealed 4 accidents on the car's history.", name: 'Ed Surgeon', avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&w=100' },
  { text: "Put my Hyundai Coupe up for sale on @SouKni. Got a call within an hour and sold within the same day.", name: 'Hitesh Uchil', avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&w=100' },
]

function CardButtons() {
  return (
    <div style={{ display: 'flex', gap: '8px' }}>
      <button style={{ flex: 1, backgroundColor: '#e8efec', color: '#3c4a46', border: 'none', padding: '12px', borderRadius: '12px', fontWeight: 600, fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontFamily: 'Inter, sans-serif', transition: 'background 0.2s' }}
        onMouseEnter={e => e.currentTarget.style.backgroundColor = '#dde4e1'}
        onMouseLeave={e => e.currentTarget.style.backgroundColor = '#e8efec'}
      >💬 Chat</button>
      <button style={{ flex: 1, backgroundColor: 'rgba(37,211,102,0.1)', color: '#25D366', border: 'none', padding: '12px', borderRadius: '12px', fontWeight: 600, fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontFamily: 'Inter, sans-serif', transition: 'background 0.2s' }}
        onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(37,211,102,0.2)'}
        onMouseLeave={e => e.currentTarget.style.backgroundColor = 'rgba(37,211,102,0.1)'}
      >📱 WhatsApp</button>
    </div>
  )
}

function CarCard({ item, type }: { item: any, type: 'car' | 'rental' | 'part' | 'moto' }) {
  const [liked, setLiked] = useState(false)
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        backgroundColor: 'white', borderRadius: '32px', overflow: 'hidden',
        boxShadow: hovered ? '0 24px 48px rgba(22,29,27,0.12)' : '0 4px 16px rgba(22,29,27,0.06)',
        transition: 'all 0.3s', transform: hovered ? 'translateY(-8px)' : 'translateY(0)',
        fontFamily: 'Inter, sans-serif',
      }}
    >
      <div style={{ position: 'relative', aspectRatio: '4/3', overflow: 'hidden' }}>
        <img src={item.image} alt={item.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.7s', transform: hovered ? 'scale(1.1)' : 'scale(1)' }}
        />
        {item.badge && (
          <div style={{ position: 'absolute', top: '16px', left: '16px' }}>
            <span style={{ backgroundColor: item.badgeColor, color: 'white', fontSize: '10px', fontWeight: 700, padding: '4px 12px', borderRadius: '100px', textTransform: 'uppercase', letterSpacing: '0.1em', backdropFilter: 'blur(4px)', border: '1px solid rgba(255,255,255,0.2)' }}>
              {item.badge}
            </span>
          </div>
        )}
        <button onClick={() => setLiked(!liked)}
          style={{ position: 'absolute', top: '16px', right: '16px', backgroundColor: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(8px)', border: 'none', width: '36px', height: '36px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', color: liked ? '#ef4444' : 'white', transition: 'all 0.2s' }}
          onMouseEnter={e => e.currentTarget.style.backgroundColor = '#006b5f'}
          onMouseLeave={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.2)'}
        >{liked ? '♥' : '♡'}</button>
        {/* Slider dots */}
        <div style={{ position: 'absolute', bottom: '16px', left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: '4px' }}>
          <div style={{ height: '3px', width: '40%', backgroundColor: 'white', borderRadius: '100px' }} />
          <div style={{ height: '3px', width: '20%', backgroundColor: 'rgba(255,255,255,0.4)', borderRadius: '100px' }} />
          <div style={{ height: '3px', width: '20%', backgroundColor: 'rgba(255,255,255,0.4)', borderRadius: '100px' }} />
        </div>
      </div>
      <div style={{ padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#161d1b', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1, paddingRight: '8px' }}>{item.title}</h3>
          <span style={{ color: '#006b5f', fontWeight: 700, fontSize: '18px', whiteSpace: 'nowrap' }}>
            {item.price} <span style={{ fontSize: '12px', fontWeight: 400, color: '#6b7a76' }}>{item.unit}</span>
          </span>
        </div>
        <div style={{ display: 'flex', gap: '16px', fontSize: '13px', color: '#6b7a76', fontWeight: 600, marginBottom: '24px', paddingBottom: '24px', borderBottom: '1px solid rgba(186,202,197,0.3)' }}>
          {type === 'car' || type === 'moto' ? (
            <>
              <span>📅 {item.year}</span>
              <span>{type === 'moto' ? '🏍️' : '⚡'} {item.km}</span>
            </>
          ) : type === 'rental' ? (
            <>
              <span>📍 {item.location}</span>
              <span>📅 {item.year}</span>
            </>
          ) : (
            <>
              <span>🏷️ {item.cat}</span>
              <span>📦 {item.cond}</span>
            </>
          )}
        </div>
        <CardButtons />
      </div>
    </div>
  )
}

function SectionHeader({ title, href }: { title: string, href?: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
      <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#161d1b', letterSpacing: '-0.01em' }}>{title}</h2>
      <a href={href || '#'} style={{ color: '#006b5f', fontSize: '13px', fontWeight: 600, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px', transition: 'gap 0.2s' }}
        onMouseEnter={e => e.currentTarget.style.gap = '8px'}
        onMouseLeave={e => e.currentTarget.style.gap = '4px'}
      >View all →</a>
    </div>
  )
}

export default function MotorsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = React.use(params)

  return (
    <div style={{ fontFamily: 'Inter, system-ui, sans-serif', backgroundColor: '#f4fbf8', minHeight: '100vh' }}>

        {/* HERO */}
        <section style={{ position: 'relative', height: '480px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
          <img src="https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&w=1400" alt="Hero" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(22,29,27,0.6), rgba(0,0,0,0))' }} />
          <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', padding: '0 20px', maxWidth: '800px', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '32px' }}>
            <h1 style={{ fontSize: '48px', fontWeight: 700, color: 'white', letterSpacing: '-0.02em', textShadow: '0 4px 20px rgba(0,0,0,0.3)', lineHeight: 1.1 }}>Find your dream engine</h1>
            <div style={{ width: '100%', maxWidth: '640px', backgroundColor: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '100px', padding: '8px', display: 'flex', alignItems: 'center', gap: '16px', boxShadow: '0 24px 48px rgba(22,29,27,0.08)' }}>
              <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '16px', padding: '0 24px' }}>
                <span style={{ color: '#6b7a76', fontSize: '20px' }}>🔍</span>
                <input type="text" placeholder="Search for motors, brands or models..." style={{ flex: 1, backgroundColor: 'transparent', border: 'none', outline: 'none', fontSize: '15px', color: '#161d1b', fontFamily: 'Inter, sans-serif' }} />
              </div>
              <button style={{ backgroundColor: '#006b5f', color: 'white', border: 'none', padding: '12px 32px', borderRadius: '100px', fontWeight: 600, fontSize: '13px', cursor: 'pointer', fontFamily: 'Inter, sans-serif', transition: 'opacity 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.opacity = '0.9'}
                onMouseLeave={e => e.currentTarget.style.opacity = '1'}
              >Search</button>
            </div>
          </div>
        </section>

        {/* STATS CARDS */}
        <section style={{ maxWidth: '1280px', margin: '-48px auto 0', padding: '0 40px', position: 'relative', zIndex: 20 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '16px' }}>
            {statsCards.map((card) => (
              <div key={card.label} style={{ backgroundColor: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.4)', padding: '24px', borderRadius: '24px', boxShadow: '0 24px 48px rgba(22,29,27,0.06)', cursor: 'pointer', transition: 'transform 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.02)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
              >
                <div style={{ fontSize: '24px', marginBottom: '12px' }}>{card.icon}</div>
                <p style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#6b7a76', marginBottom: '4px' }}>{card.label}</p>
                <p style={{ fontSize: '22px', fontWeight: 700, color: '#161d1b', letterSpacing: '-0.01em' }}>{card.count}</p>
              </div>
            ))}
          </div>
        </section>

        {/* SELL YOUR CAR BANNER */}
        <section style={{ maxWidth: '1280px', margin: '64px auto 0', padding: '0 40px' }}>
          <div style={{ backgroundColor: 'rgba(45,212,191,0.15)', borderRadius: '40px', padding: '48px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '32px', border: '1px solid rgba(45,212,191,0.3)', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'relative', zIndex: 1 }}>
              <h2 style={{ fontSize: '48px', fontWeight: 700, color: '#006b5f', marginBottom: '16px', letterSpacing: '-0.03em' }}>Sell your car in minutes</h2>
              <p style={{ fontSize: '18px', color: '#3c4a46', maxWidth: '560px', lineHeight: 1.6 }}>Join Morocco's largest community of buyers and sellers. Get the best market value for your vehicle today.</p>
            </div>
            <button style={{ backgroundColor: '#006b5f', color: 'white', border: 'none', padding: '20px 40px', borderRadius: '100px', fontSize: '18px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px', fontFamily: 'Inter, sans-serif', boxShadow: '0 20px 40px rgba(0,107,95,0.2)', transition: 'all 0.3s', whiteSpace: 'nowrap', position: 'relative', zIndex: 1 }}
              onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#62fae3'; e.currentTarget.style.color = '#00201c' }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#006b5f'; e.currentTarget.style.color = 'white' }}
            >Post your Ad 100% Free →</button>
            <div style={{ position: 'absolute', right: '-80px', top: '-80px', width: '320px', height: '320px', backgroundColor: 'rgba(0,107,95,0.08)', borderRadius: '50%', filter: 'blur(40px)' }} />
          </div>
        </section>

        {/* CAR SECTIONS */}
        {[
          { title: 'Featured Used Cars', items: usedCars, type: 'car' as const },
          { title: 'Featured Rental Cars', items: rentalCars, type: 'rental' as const },
          { title: 'Featured Parts & Accessories', items: parts, type: 'part' as const },
          { title: 'Featured Motorcycles', items: motorcycles, type: 'moto' as const },
        ].map(section => (
          <section key={section.title} style={{ maxWidth: '1280px', margin: '0 auto', padding: '64px 40px 0' }}>
            <SectionHeader title={section.title} />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
              {section.items.map(item => <CarCard key={item.title} item={item} type={section.type} />)}
            </div>
          </section>
        ))}

        {/* DIAMOND MEMBER BANNER */}
        <section style={{ maxWidth: '1280px', margin: '64px auto 0', padding: '0 40px' }}>
          <div style={{ position: 'relative', height: '400px', borderRadius: '40px', overflow: 'hidden', boxShadow: '0 24px 48px rgba(22,29,27,0.1)' }}>
            <img src="https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg?auto=compress&w=1400" alt="Diamond" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.7s' }}
              onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
            />
            <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(22,29,27,0.45)', backdropFilter: 'blur(2px)' }} />
            <div style={{ position: 'relative', zIndex: 10, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '24px' }}>
              <h2 style={{ fontSize: '42px', fontWeight: 700, color: 'white', marginBottom: '32px', maxWidth: '700px', lineHeight: 1.2, letterSpacing: '-0.02em', textShadow: '0 4px 20px rgba(0,0,0,0.3)' }}>
                Join The SouKni Familly and Become a Diamond Certified Member
              </h2>
              <button style={{ backgroundColor: '#2dd4bf', color: '#00574d', border: 'none', padding: '16px 40px', borderRadius: '100px', fontSize: '18px', fontWeight: 700, cursor: 'pointer', fontFamily: 'Inter, sans-serif', boxShadow: '0 20px 40px rgba(0,0,0,0.2)', transition: 'all 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.05)'; e.currentTarget.style.boxShadow = '0 24px 48px rgba(0,0,0,0.3)' }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.2)' }}
              >Get Certified Now</button>
            </div>
            <div style={{ position: 'absolute', bottom: '24px', right: '32px', padding: '10px 20px', borderRadius: '100px', backgroundColor: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.2)' }}>
              <span style={{ color: 'white', fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.2em' }}>Premium 2026 Vision</span>
            </div>
          </div>
        </section>

        {/* CAR INSPECTION BANNER */}
        <section style={{ maxWidth: '1280px', margin: '64px auto 0', padding: '0 40px' }}>
          <div style={{ backgroundColor: 'rgba(255,220,192,0.3)', borderRadius: '40px', padding: '48px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '32px', border: '1px solid rgba(255,172,90,0.2)' }}>
            <div style={{ flex: 1 }}>
              <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#161d1b', marginBottom: '8px' }}>Request SouKni <span style={{ color: '#ba1a1a' }}>Car Inspection</span></h2>
              <p style={{ fontSize: '18px', color: '#3c4a46', marginBottom: '32px', lineHeight: 1.6 }}>Trusted by 10K+ car buyers, SouKni is Morocco's go-to platform</p>
              <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap' }}>
                {[
                  { icon: '✅', title: '120 - 240', sub: 'Points Covered' },
                  { icon: '📍', title: 'Inspect', sub: 'Anywhere!' },
                  { icon: '📅', title: 'Same Day', sub: 'Inspection' },
                ].map(item => (
                  <div key={item.title} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'rgba(255,172,90,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', color: '#8d4f00' }}>{item.icon}</div>
                    <div>
                      <p style={{ fontWeight: 700, color: '#161d1b', fontSize: '15px' }}>{item.title}</p>
                      <p style={{ fontSize: '13px', fontWeight: 600, color: '#6b7a76' }}>{item.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <button style={{ backgroundColor: '#ba1a1a', color: 'white', border: 'none', padding: '16px 40px', borderRadius: '12px', fontWeight: 700, fontSize: '16px', cursor: 'pointer', fontFamily: 'Inter, sans-serif', boxShadow: '0 8px 20px rgba(186,26,26,0.2)', transition: 'opacity 0.2s', whiteSpace: 'nowrap' }}
              onMouseEnter={e => e.currentTarget.style.opacity = '0.9'}
              onMouseLeave={e => e.currentTarget.style.opacity = '1'}
            >Book Inspection</button>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section style={{ maxWidth: '1280px', margin: '64px auto 0', padding: '0 40px' }}>
          <h2 style={{ fontSize: '48px', fontWeight: 700, color: '#161d1b', marginBottom: '32px', letterSpacing: '-0.03em' }}>Testimonials</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
            {testimonials.map(t => (
              <div key={t.name} style={{ backgroundColor: 'white', padding: '32px', borderRadius: '32px', boxShadow: '0 4px 16px rgba(22,29,27,0.06)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <p style={{ fontSize: '15px', color: '#3c4a46', lineHeight: 1.7, fontStyle: 'italic', marginBottom: '32px' }}>"{t.text}"</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <img src={t.avatar} alt={t.name} style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover' }} />
                  <span style={{ fontWeight: 700, color: '#006b5f', fontSize: '15px' }}>{t.name}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* APP DOWNLOAD */}
        <section style={{ maxWidth: '1280px', margin: '64px auto 0', padding: '0 40px 64px' }}>
          <div style={{ backgroundColor: '#e8efec', borderRadius: '40px', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '48px', gap: '32px' }}>
            <div style={{ flex: 1 }}>
              <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#161d1b', marginBottom: '8px' }}>Find amazing deals on the go.</h2>
              <p style={{ fontSize: '40px', fontWeight: 700, color: '#ba1a1a', marginBottom: '32px', letterSpacing: '-0.02em', lineHeight: 1.1 }}>Download the app now!</p>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
                {['🍎 App Store', '▶ Google Play', '🏪 AppGallery'].map(btn => (
                  <button key={btn} style={{ backgroundColor: 'black', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '10px', fontWeight: 600, fontSize: '13px', cursor: 'pointer', fontFamily: 'Inter, sans-serif', display: 'flex', alignItems: 'center', gap: '8px', transition: 'opacity 0.2s' }}
                    onMouseEnter={e => e.currentTarget.style.opacity = '0.8'}
                    onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                  >{btn}</button>
                ))}
              </div>
            </div>
            <div style={{ position: 'relative', height: '280px' }}>
              <img src="https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&w=300" alt="App" style={{ height: '100%', objectFit: 'contain', filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.2))' }} />
            </div>
          </div>
        </section>

      {/* FOOTER */}
      <footer style={{ backgroundColor: '#1a202c', color: 'rgba(255,255,255,0.8)', padding: '64px 0' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 40px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '48px', marginBottom: '48px' }}>
            <div>
              <div style={{ fontSize: '24px', fontWeight: 800, color: '#006b5f', letterSpacing: '-0.03em', marginBottom: '24px' }}>SouKni</div>
              <p style={{ fontSize: '15px', lineHeight: 1.7, marginBottom: '24px', maxWidth: '280px', color: 'rgba(255,255,255,0.6)' }}>Morocco's ultimate marketplace for motors, property, and more. Buy and sell with confidence on SouKni.</p>
              <div style={{ display: 'flex', gap: '12px' }}>
                {['⇧', '🌐', '✉️'].map((icon, i) => (
                  <a key={i} href="#" style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', fontSize: '18px', transition: 'background 0.2s' }}
                    onMouseEnter={e => e.currentTarget.style.backgroundColor = '#006b5f'}
                    onMouseLeave={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'}
                  >{icon}</a>
                ))}
              </div>
            </div>
            {[
              { title: 'Marketplace', links: ['Real Estate', 'Motors', 'Jobs', 'Services', 'The Vault'] },
              { title: 'Company', links: ['About Us', 'Careers', 'Legal', 'Privacy Policy', 'Terms of Service'] },
              { title: 'Support', links: ['Help Center', 'Safety Tips', 'Trust & Safety', 'Ad Rules', 'Top Cities'] },
            ].map(col => (
              <div key={col.title}>
                <h4 style={{ color: 'white', fontWeight: 700, fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '24px' }}>{col.title}</h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {col.links.map(link => (
                    <li key={link} style={{ marginBottom: '14px' }}>
                      <a href="#" style={{ fontSize: '15px', color: 'rgba(255,255,255,0.6)', textDecoration: 'none', transition: 'color 0.15s' }}
                        onMouseEnter={e => e.currentTarget.style.color = '#2dd4bf'}
                        onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.6)'}
                      >{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
            <p style={{ fontSize: '13px', fontWeight: 600, color: 'rgba(255,255,255,0.4)' }}>© 2026 SouKni. All rights reserved.</p>
            <div style={{ display: 'flex', gap: '24px', fontSize: '13px', color: 'rgba(255,255,255,0.4)' }}>
              <span>📍 Casablanca, Morocco</span>
              <span>🌐 English (US)</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
