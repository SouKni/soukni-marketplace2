'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Heart, Search, MapPin, ChevronRight, MessageCircle, Diamond, Check, Shield } from 'lucide-react'

const fashionCategories = [
  { label: 'Shoes', count: '4,820', slug: 'shoes', image: 'https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg?auto=compress&w=600' },
  { label: 'Bags', count: '3,290', slug: 'bags', image: 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&w=600' },
  { label: 'Jewelry', count: '2,140', slug: 'jewelry', image: 'https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&w=600' },
  { label: 'Traditional Wear', count: '1,680', slug: 'traditional', image: 'https://images.pexels.com/photos/2220316/pexels-photo-2220316.jpeg?auto=compress&w=600' },
  { label: 'Sports & Activewear', count: '2,310', slug: 'sports', image: 'https://images.pexels.com/photos/2294361/pexels-photo-2294361.jpeg?auto=compress&w=600' },
  { label: 'Vintage & Thrift', count: '1,840', slug: 'vintage', image: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&w=600' },
  { label: 'Wedding & Eveningwear', count: '920', slug: 'wedding', image: 'https://images.pexels.com/photos/1488310/pexels-photo-1488310.jpeg?auto=compress&w=600' },
  { label: 'Beauty & Grooming', count: '1,580', slug: 'beauty', image: 'https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&w=600' },
]

const listings = [
  { id: '1', title: 'BRAND NEW Hermes Birkin 35', category: 'Handbags, Bags & Wallets', price: 'MAD 290,950', badge: 'Verified', tags: ['Brand New', 'Flawless', 'Hermes'], location: 'Rabat Center', time: '2 hours ago', premium: true, photos: 7, image: 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&w=500' },
  { id: '2', title: 'Chanel Boy Medium Chevron', category: 'Handbags, Bags & Wallets', price: 'MAD 45,000', badge: 'Verified', tags: ['Used', 'Good', 'Chanel'], location: 'Casablanca', time: '1 day ago', premium: true, photos: 5, image: 'https://images.pexels.com/photos/904350/pexels-photo-904350.jpeg?auto=compress&w=500' },
  { id: '3', title: 'Designer Wedding Dress', category: 'Wedding Apparel', price: 'MAD 8,500', badge: null, tags: ['1-2 years', 'Excellent'], location: 'Marrakech', time: '3 days ago', premium: false, photos: 3, image: 'https://images.pexels.com/photos/1488310/pexels-photo-1488310.jpeg?auto=compress&w=500' },
  { id: '4', title: 'Louis Vuitton OnTheGo MM', category: 'Handbags, Bags & Wallets', price: 'MAD 28,000', badge: 'Diamond', tags: ['0-1 month', 'Flawless', 'Louis Vuitton'], location: 'Tangier', time: 'Just now', premium: false, photos: 4, image: 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&w=500' },
]

const newArrivals = [
  { id: '5', title: 'Gold & Emerald Artisan Watch', category: 'Timepieces', price: 'MAD 125,000', badge: 'Diamond', tags: [], location: 'Rabat', time: 'Just now', premium: false, photos: 0, image: 'https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&w=500' },
  { id: '6', title: 'Silk & Lace Evening Gown', category: 'Wedding & Eveningwear', price: 'MAD 18,500', badge: 'Diamond', tags: [], location: 'Casablanca', time: '1 hour ago', premium: false, photos: 0, image: 'https://images.pexels.com/photos/1488310/pexels-photo-1488310.jpeg?auto=compress&w=500' },
  { id: '7', title: 'Heritage Leather Travel Trunk', category: 'Leather Accessories', price: 'MAD 32,000', badge: 'Diamond', tags: [], location: 'Marrakech', time: '2 hours ago', premium: false, photos: 0, image: 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&w=500' },
  { id: '8', title: 'Italian Designer Stilettos', category: 'Footwear', price: 'MAD 6,400', badge: 'Diamond', tags: [], location: 'Rabat', time: '5h ago', premium: false, photos: 0, image: 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&w=500' },
]

type Listing = typeof listings[0]

function FashionCard({ item }: { item: Listing }) {
  const [liked, setLiked] = useState(false)
  const [hovered, setHovered] = useState(false)
  return (
    <article onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{ backgroundColor: 'white', borderRadius: '40px', overflow: 'hidden', border: '1px solid #f1f5f9', boxShadow: hovered ? '0 20px 40px rgba(0,0,0,0.12)' : '0 2px 8px rgba(0,0,0,0.04)', transition: 'all 0.3s' }}>
      <div style={{ position: 'relative', aspectRatio: '4/3', overflow: 'hidden' }}>
        <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s', transform: hovered ? 'scale(1.08)' : 'scale(1)' }} />
        {item.badge && (
          <span style={{ position: 'absolute', top: '14px', left: '14px', background: item.badge === 'Diamond' ? 'linear-gradient(135deg, #2dd4bf, #0f9b8e)' : 'rgba(255,255,255,0.92)', backdropFilter: 'blur(8px)', color: item.badge === 'Diamond' ? 'white' : '#2dd4bf', fontSize: '9px', fontWeight: 800, padding: '4px 12px', borderRadius: '100px', textTransform: 'uppercase', letterSpacing: '0.07em', display: 'flex', alignItems: 'center', gap: '4px' }}>
            {item.badge === 'Diamond' ? <Diamond size={10} /> : <Check size={10} />} {item.badge}
          </span>
        )}
        <button onClick={() => setLiked(!liked)} style={{ position: 'absolute', top: '14px', right: '14px', width: '34px', height: '34px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
          <Heart size={15} color={liked ? '#ef4444' : 'white'} fill={liked ? '#ef4444' : 'none'} />
        </button>
        {item.premium && (
          <span style={{ position: 'absolute', bottom: '12px', right: '12px', backgroundColor: 'rgba(255,172,90,0.95)', color: '#2d1600', padding: '3px 10px', borderRadius: '100px', fontSize: '10px', fontWeight: 800, textTransform: 'uppercase' }}>Premium</span>
        )}
      </div>
      <div style={{ padding: '20px' }}>
        <p style={{ fontSize: '9px', fontWeight: 700, color: '#2dd4bf', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '6px' }}>{item.category}</p>
        <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#161d1b', marginBottom: '10px', lineHeight: 1.3 }}>{item.title}</h3>
        <div style={{ fontSize: '19px', fontWeight: 800, color: '#2dd4bf', marginBottom: '14px' }}>{item.price}</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#6b7a76', fontSize: '11px', marginBottom: '14px' }}>
          <MapPin size={11} /> {item.location} • {item.time}
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button style={{ flex: 1, backgroundColor: '#eef5f2', color: '#3c4a46', border: 'none', padding: '10px', borderRadius: '100px', fontWeight: 700, fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
            <MessageCircle size={14} /> Chat
          </button>
          <button style={{ flex: 1, backgroundColor: '#25D366', color: 'white', border: 'none', padding: '10px', borderRadius: '100px', fontWeight: 700, fontSize: '13px', cursor: 'pointer' }}>WhatsApp</button>
        </div>
      </div>
    </article>
  )
}

export default function FashionPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = React.use(params)
  const [search, setSearch] = useState('')

  return (
    <div style={{ fontFamily: 'Inter, system-ui, sans-serif', backgroundColor: '#f4fbf8', minHeight: '100vh' }}>
      <main>
        {/* HERO */}
        <section style={{ position: 'relative', height: '440px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 16px' }}>
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(15,23,42,0.5), rgba(15,23,42,0.5)), url(https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&w=1600)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
          <div style={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: '720px', textAlign: 'center' }}>
            <h1 style={{ fontSize: '48px', fontWeight: 800, color: 'white', marginBottom: '8px', textShadow: '0 2px 20px rgba(0,0,0,0.3)', letterSpacing: '-0.02em', lineHeight: 1.1 }}>Curated High Fashion</h1>
            <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '16px', marginBottom: '28px' }}>6,388 verified listings across Morocco</p>
            <div style={{ background: 'rgba(255,255,255,0.72)', backdropFilter: 'blur(16px)', borderRadius: '100px', padding: '6px 6px 6px 24px', display: 'flex', alignItems: 'center', boxShadow: '0 20px 60px rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.35)' }}>
              <input value={search} onChange={e => setSearch(e.target.value)} type="text" placeholder="Search brands, items, styles..." style={{ flex: 1, backgroundColor: 'transparent', border: 'none', outline: 'none', padding: '10px 16px', fontSize: '15px', fontFamily: 'Inter, sans-serif', color: '#0f172a' }} />
              <button style={{ backgroundColor: '#2dd4bf', color: 'white', border: 'none', padding: '12px 28px', borderRadius: '100px', fontWeight: 700, fontSize: '13px', cursor: 'pointer', transition: 'background 0.15s' }} onMouseEnter={e => e.currentTarget.style.backgroundColor = '#0f9b8e'} onMouseLeave={e => e.currentTarget.style.backgroundColor = '#2dd4bf'}><Search size={18} /></button>
            </div>
          </div>
        </section>

        {/* CATEGORY GRID — real links */}
        <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px', marginTop: '-48px', position: 'relative', zIndex: 20 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
            {fashionCategories.map(cat => (
              <Link key={cat.slug} href={`/${locale}/fashion/${cat.slug}`} style={{ textDecoration: 'none' }}>
                <div style={{ position: 'relative', height: '180px', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 8px 32px rgba(0,0,0,0.1)', cursor: 'pointer', transition: 'transform 0.2s' }}
                  onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.transform = 'scale(1.04)'}
                  onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.transform = 'scale(1)'}>
                  <img src={cat.image} alt={cat.label} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.85), rgba(0,0,0,0.1))' }} />
                  <div style={{ position: 'absolute', bottom: '14px', left: '14px', right: '14px' }}>
                    <p style={{ fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, color: '#62fae3', marginBottom: '4px' }}>{cat.count} listings</p>
                    <p style={{ fontSize: '16px', fontWeight: 800, color: 'white', letterSpacing: '-0.01em' }}>{cat.label}</p>
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
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '48px 24px 0', display: 'flex', flexDirection: 'column', gap: '64px' }}>
          <section>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#0f172a' }}>Featured Fashion <span style={{ color: '#2dd4bf', fontSize: '16px', fontWeight: 400 }}>(Curated Excellence)</span></h2>
              <Link href={`/${locale}/fashion/bags`} style={{ color: '#2dd4bf', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px', textDecoration: 'none', fontSize: '14px' }}>View all <ChevronRight size={16} /></Link>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
              {listings.map(item => <FashionCard key={item.id} item={item} />)}
            </div>
          </section>
        </div>

        {/* AUTO PRO BANNER */}
        <section style={{ maxWidth: '1280px', margin: '64px auto 0', padding: '0 24px' }}>
          <div style={{ position: 'relative', height: '260px', borderRadius: '40px', overflow: 'hidden' }}>
            <img src="https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&w=1400" alt="SouKni Auto Pro" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(0,0,0,0.85), rgba(0,0,0,0.4), rgba(0,0,0,0))', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '48px' }}>
              <div style={{ maxWidth: '480px' }}>
                <span style={{ fontSize: '10px', fontWeight: 800, color: '#62fae3', textTransform: 'uppercase', letterSpacing: '0.15em', display: 'block', marginBottom: '10px' }}>Certified Services</span>
                <h2 style={{ color: 'white', fontSize: '32px', fontWeight: 800, marginBottom: '10px', letterSpacing: '-0.02em', lineHeight: 1.2 }}>SouKni Auto Pro</h2>
                <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '15px', marginBottom: '24px', lineHeight: 1.6 }}>The gold standard for premium automotive services across Morocco.</p>
                <Link href={`/${locale}/motors`} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: '#2dd4bf', color: '#00201c', padding: '12px 28px', borderRadius: '100px', fontWeight: 800, fontSize: '13px', textDecoration: 'none' }}>
                  Explore Motors <ChevronRight size={15} />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* MORE LISTINGS */}
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '64px 24px 0' }}>
          <section>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#0f172a' }}>New Arrivals</h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
              {newArrivals.map(item => <FashionCard key={item.id} item={item} />)}
            </div>
          </section>
        </div>

        {/* DIAMOND BANNER */}
        <section style={{ maxWidth: '1280px', margin: '64px auto 80px', padding: '0 24px' }}>
          <div style={{ position: 'relative', height: '320px', borderRadius: '40px', overflow: 'hidden' }}>
            <img src="https://images.pexels.com/photos/1884581/pexels-photo-1884581.jpeg?auto=compress&w=1600" alt="Diamond" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(0,0,0,0.8), rgba(0,0,0,0.2), transparent)', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 56px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                <Diamond size={28} color="#62fae3" />
                <span style={{ color: '#62fae3', fontSize: '13px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Exclusive Status</span>
              </div>
              <h2 style={{ color: 'white', fontSize: '32px', fontWeight: 800, marginBottom: '12px' }}>Become a SouKni Diamond Member</h2>
              <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '15px', marginBottom: '24px' }}>Get the Diamond Certified status and unlock exclusive benefits for premium sellers.</p>
              <button style={{ backgroundColor: '#2dd4bf', color: '#00201c', border: 'none', padding: '13px 32px', borderRadius: '100px', fontWeight: 800, fontSize: '13px', cursor: 'pointer', width: 'fit-content' }}>Get Verified Now</button>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
