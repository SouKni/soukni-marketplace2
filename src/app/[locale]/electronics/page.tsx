'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { Heart, Search, MapPin, ChevronRight, MessageCircle, Diamond, Check, Shield } from 'lucide-react'
import { useMarket } from '@/context/MarketContext'

const electronicsCategories = [
  { label: 'Mobiles', count: '9,318', slug: 'mobiles', image: 'https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&w=600' },
  { label: 'Tablets', count: '2,140', slug: 'tablets', image: 'https://images.pexels.com/photos/1334597/pexels-photo-1334597.jpeg?auto=compress&w=600' },
  { label: 'Laptops', count: '4,210', slug: 'laptops', image: 'https://images.pexels.com/photos/1229861/pexels-photo-1229861.jpeg?auto=compress&w=600' },
  { label: 'Desktops', count: '980', slug: 'desktops', image: 'https://images.pexels.com/photos/303383/pexels-photo-303383.jpeg?auto=compress&w=600' },
  { label: 'Audio', count: '1,930', slug: 'audio', image: 'https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&w=600' },
  { label: 'Wearables', count: '1,540', slug: 'wearables', image: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&w=600' },
  { label: 'Cameras', count: '1,120', slug: 'cameras', image: 'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&w=600' },
  { label: 'Projectors & TVs', count: '2,840', slug: 'projectors-tvs', image: 'https://images.pexels.com/photos/1571442/pexels-photo-1571442.jpeg?auto=compress&w=600' },
  { label: 'Accessories', count: '6,200', slug: 'accessories', image: 'https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&w=600' },
  { label: 'Car Electronics', count: '1,420', slug: 'car-electronics', image: 'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&w=600' },
]

const listings = [
  { title: 'iPhone 15 Pro Max — Titanium, 256GB', category: 'Mobiles', price: 12500, location: 'Casablanca', time: '20 min ago', badge: 'verified', image: 'https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&w=600' },
  { title: 'Samsung Galaxy S24 Ultra — 512GB', category: 'Mobiles', price: 11800, location: 'Rabat', time: '1 hour ago', badge: 'verified', image: 'https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg?auto=compress&w=600' },
  { title: '2024 MacBook Pro 14" M3 Max', category: 'Laptops', price: 28000, location: 'Casablanca', time: 'Just now', badge: 'diamond', image: 'https://images.pexels.com/photos/1229861/pexels-photo-1229861.jpeg?auto=compress&w=600' },
  { title: 'Sony 75" 8K OLED Smart TV', category: 'TVs', price: 32000, location: 'Marrakech', time: '2 hours ago', badge: 'diamond', image: 'https://images.pexels.com/photos/1571442/pexels-photo-1571442.jpeg?auto=compress&w=600' },
]

const moreListings = [
  { title: 'iPad Pro 13" M4 — 256GB + Pencil', category: 'Tablets', price: 14200, location: 'Tangier', time: '3 hours ago', badge: 'verified', image: 'https://images.pexels.com/photos/1334597/pexels-photo-1334597.jpeg?auto=compress&w=600' },
  { title: 'Sony A7R V Full-Frame Mirrorless', category: 'Cameras', price: 32000, location: 'Rabat', time: '4 hours ago', badge: 'diamond', image: 'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&w=600' },
  { title: 'PS5 + 3 Controllers + 8 Games', category: 'Gaming', price: 8500, location: 'Casablanca', time: '5 hours ago', badge: null, image: 'https://images.pexels.com/photos/3945683/pexels-photo-3945683.jpeg?auto=compress&w=600' },
  { title: 'Apple Watch Ultra 2 — Titanium', category: 'Wearables', price: 7200, location: 'Marrakech', time: '1 day ago', badge: 'verified', image: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&w=600' },
  { title: 'Bose QC Ultra Headphones', category: 'Audio', price: 3800, location: 'Tangier', time: '6 hours ago', badge: null, image: 'https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&w=600' },
  { title: 'Google Pixel 9 Pro XL — 128GB', category: 'Mobiles', price: 10500, location: 'Fès', time: '2 hours ago', badge: 'verified', image: 'https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg?auto=compress&w=600' },
  { title: 'Dell XPS 15 — i9, RTX 4070', category: 'Laptops', price: 22000, location: 'Casablanca', time: '3 hours ago', badge: 'diamond', image: 'https://images.pexels.com/photos/303383/pexels-photo-303383.jpeg?auto=compress&w=600' },
  { title: 'DJI Mavic 3 Pro Drone — Fly More', category: 'Cameras', price: 18500, location: 'Agadir', time: '1 day ago', badge: 'diamond', image: 'https://images.pexels.com/photos/1392595/pexels-photo-1392595.jpeg?auto=compress&w=600' },
]

type Listing = typeof listings[0]

function ElectronicsCard({ item, locale }: { item: Listing, locale: string }) {
  const [hovered, setHovered] = useState(false)
  const [saved, setSaved] = useState(false)
  const { formatPrice } = useMarket()

  return (
    <Link href={`/${locale}/listing/1`} style={{ textDecoration: 'none' }}>
    <article onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{ backgroundColor: 'white', borderRadius: '40px', overflow: 'hidden', boxShadow: hovered ? '0 20px 40px rgba(0,0,0,0.12)' : '0 2px 8px rgba(0,0,0,0.04)', border: '1px solid #f1f5f9', transition: 'all 0.3s', display: 'flex', flexDirection: 'column', cursor: 'pointer' }}>
      <div style={{ position: 'relative', height: '224px', overflow: 'hidden' }}>
        <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s', transform: hovered ? 'scale(1.1)' : 'scale(1)' }} />
        {item.badge === 'diamond' && (
          <div style={{ position: 'absolute', top: '14px', left: '14px', zIndex: 2 }}>
            <span style={{ background: 'linear-gradient(135deg, #2dd4bf, #0d9488)', color: 'white', fontSize: '9px', fontWeight: 700, padding: '5px 12px', borderRadius: '100px', boxShadow: '0 4px 12px rgba(45,212,191,0.4)', textTransform: 'uppercase', letterSpacing: '0.06em', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Diamond size={10} /> Diamond Member
            </span>
          </div>
        )}
        {item.badge === 'verified' && (
          <div style={{ position: 'absolute', top: '14px', left: '14px', zIndex: 2 }}>
            <span style={{ backgroundColor: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(8px)', color: '#2dd4bf', fontSize: '9px', fontWeight: 700, padding: '5px 12px', borderRadius: '100px', textTransform: 'uppercase', letterSpacing: '0.06em', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Check size={10} /> Verified
            </span>
          </div>
        )}
        <button onClick={e => { e.stopPropagation(); setSaved(!saved) }} style={{ position: 'absolute', bottom: '14px', right: '14px', zIndex: 2, backgroundColor: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(8px)', width: '36px', height: '36px', borderRadius: '50%', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}>
          <Heart size={16} fill={saved ? '#ef4444' : 'none'} color={saved ? '#ef4444' : '#0f172a'} />
        </button>
      </div>
      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <p style={{ fontSize: '9px', fontWeight: 700, color: '#2dd4bf', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '8px' }}>{item.category}</p>
        <h4 style={{ fontWeight: 600, color: '#0f172a', marginBottom: '10px', fontSize: '15px', lineHeight: 1.4, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{item.title}</h4>
        <div style={{ marginTop: 'auto' }}>
          <span style={{ fontSize: '22px', fontWeight: 700, color: '#2dd4bf', display: 'block', marginBottom: '10px' }}>{formatPrice(item.price)}</span>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '11px', color: '#7A7A7A', borderTop: '1px solid #f8fafc', paddingTop: '14px', marginBottom: '14px' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><MapPin size={13} />{item.location}</span>
            <span>{item.time}</span>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button style={{ flex: 1, backgroundColor: 'rgba(45,212,191,0.1)', color: '#2dd4bf', border: 'none', fontWeight: 700, padding: '12px 8px', borderRadius: '12px', cursor: 'pointer', fontSize: '13px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', transition: 'all 0.15s' }}
              onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#2dd4bf'; e.currentTarget.style.color = 'white' }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'rgba(45,212,191,0.1)'; e.currentTarget.style.color = '#2dd4bf' }}>
              <MessageCircle size={14} /> Chat
            </button>
            <button style={{ flex: 1, backgroundColor: '#22c55e', color: 'white', border: 'none', fontWeight: 700, padding: '12px 8px', borderRadius: '12px', cursor: 'pointer', fontSize: '13px', transition: 'background 0.15s' }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = '#16a34a'}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = '#22c55e'}>WhatsApp</button>
          </div>
        </div>
      </div>
    </article>
    </Link>
  )
}

export default function ElectronicsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = React.use(params)
  const [search, setSearch] = useState('')

  return (
    <div style={{ fontFamily: 'Inter, system-ui, sans-serif', backgroundColor: '#f4fbf8', minHeight: '100vh' }}>
      <main>
        {/* HERO */}
        <section style={{ position: 'relative', height: '440px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 16px' }}>
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(15,23,42,0.45), rgba(15,23,42,0.45)), url(https://images.pexels.com/photos/1229861/pexels-photo-1229861.jpeg?auto=compress&w=1600)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
          <div style={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: '720px', textAlign: 'center' }}>
            <h1 style={{ fontSize: '48px', fontWeight: 800, color: 'white', marginBottom: '8px', textShadow: '0 2px 20px rgba(0,0,0,0.3)', letterSpacing: '-0.02em', lineHeight: 1.1 }}>Mobiles &amp; Electronics</h1>
            <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '16px', marginBottom: '28px' }}>Morocco's largest marketplace for tech — 38,000+ verified listings</p>
            <div style={{ background: 'rgba(255,255,255,0.72)', backdropFilter: 'blur(16px)', borderRadius: '100px', padding: '6px 6px 6px 24px', display: 'flex', alignItems: 'center', boxShadow: '0 20px 60px rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.35)' }}>
              <input value={search} onChange={e => setSearch(e.target.value)} type="text" placeholder="Search phones, laptops, TVs..." style={{ flex: 1, backgroundColor: 'transparent', border: 'none', outline: 'none', padding: '10px 16px', fontSize: '15px', fontFamily: 'Inter, sans-serif', color: '#0f172a' }} />
              <button style={{ backgroundColor: '#2dd4bf', color: 'white', border: 'none', padding: '12px 28px', borderRadius: '100px', fontWeight: 700, fontSize: '13px', cursor: 'pointer', transition: 'background 0.15s' }} onMouseEnter={e => e.currentTarget.style.backgroundColor = '#0f9b8e'} onMouseLeave={e => e.currentTarget.style.backgroundColor = '#2dd4bf'}><Search size={18} /></button>
            </div>
          </div>
        </section>

        {/* CATEGORY GRID — real links */}
        <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px', marginTop: '-48px', position: 'relative', zIndex: 20 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px' }}>
            {electronicsCategories.map(cat => (
              <Link key={cat.slug} href={`/${locale}/electronics/${cat.slug}`} style={{ textDecoration: 'none' }}>
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
                <h3 style={{ fontWeight: 700, fontSize: '17px', color: '#0f172a', marginBottom: '4px' }}>SouKni Electro Pro — Certified Dealers</h3>
                <p style={{ fontSize: '13px', color: '#64748b' }}>Warranty guaranteed · Premium tech at your fingertips</p>
              </div>
            </div>
            <button style={{ border: '2px solid #e2e8f0', padding: '12px 32px', borderRadius: '100px', fontWeight: 700, color: '#0f172a', backgroundColor: 'transparent', cursor: 'pointer', fontSize: '13px', whiteSpace: 'nowrap' }} onMouseEnter={e => e.currentTarget.style.backgroundColor = '#f8fafc'} onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}>Explore Pro Deals</button>
          </div>
        </section>

        {/* DISCOVERY SECTIONS */}
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '48px 24px 0', display: 'flex', flexDirection: 'column', gap: '64px' }}>
          <section>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#0f172a' }}>Discover Premium Tech <span style={{ color: '#2dd4bf', fontSize: '16px', fontWeight: 400 }}>(Featured)</span></h2>
              <Link href={`/${locale}/electronics/mobiles`} style={{ color: '#2dd4bf', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px', textDecoration: 'none', fontSize: '14px' }}>View all <ChevronRight size={16} /></Link>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
              {listings.map((item, i) => <ElectronicsCard key={i} item={item} locale={locale} />)}
            </div>
          </section>
        </div>

        {/* PROMO BANNER */}
        <section style={{ maxWidth: '1280px', margin: '64px auto 0', padding: '0 24px' }}>
          <div style={{ position: 'relative', height: '280px', borderRadius: '40px', overflow: 'hidden' }}>
            <img src="https://images.pexels.com/photos/303383/pexels-photo-303383.jpeg?auto=compress&w=1600" alt="Electro Pro" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(0,0,0,0.85), rgba(0,0,0,0.2), transparent)', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 56px' }}>
              <h2 style={{ color: 'white', fontSize: '32px', fontWeight: 800, marginBottom: '8px' }}>SouKni Electro Pro</h2>
              <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '15px', marginBottom: '20px' }}>Certified dealers, warranty guaranteed, premium tech at your fingertips</p>
              <button style={{ backgroundColor: '#2dd4bf', color: '#00201c', border: 'none', padding: '12px 28px', borderRadius: '100px', fontWeight: 700, fontSize: '13px', cursor: 'pointer', width: 'fit-content' }}>Explore Pro Deals</button>
            </div>
          </div>
        </section>

        {/* MORE LISTINGS */}
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '64px 24px 0' }}>
          <section>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#0f172a' }}>Recently Added</h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
              {moreListings.map((item, i) => <ElectronicsCard key={i} item={item} locale={locale} />)}
            </div>
          </section>
        </div>

        {/* DIAMOND BANNER */}
        <section style={{ maxWidth: '1280px', margin: '64px auto 80px', padding: '0 24px' }}>
          <div style={{ position: 'relative', height: '320px', borderRadius: '40px', overflow: 'hidden' }}>
            <img src="https://images.pexels.com/photos/1229861/pexels-photo-1229861.jpeg?auto=compress&w=1600" alt="Diamond" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(0,0,0,0.8), rgba(0,0,0,0.2), transparent)', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 56px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                <Diamond size={28} color="#62fae3" />
                <span style={{ color: '#62fae3', fontSize: '13px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Exclusive Status</span>
              </div>
              <h2 style={{ color: 'white', fontSize: '32px', fontWeight: 800, marginBottom: '12px' }}>Become a SouKni Diamond Member</h2>
              <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '15px', marginBottom: '24px' }}>Unlock priority listings, verified badge, and exclusive buyer access.</p>
              <button style={{ backgroundColor: '#2dd4bf', color: '#00201c', border: 'none', padding: '13px 32px', borderRadius: '100px', fontWeight: 800, fontSize: '13px', cursor: 'pointer', width: 'fit-content' }}>Get Verified Now</button>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
