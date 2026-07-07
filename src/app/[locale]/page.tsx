'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Search, MapPin, ChevronRight, Star } from 'lucide-react'
import CityPicker from '@/components/ui/CityPicker'
import { useRouter } from 'next/navigation'

const categories = [
  { label: 'Motors', count: '24,180', icon: '🚗', slug: 'motors', image: 'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&w=600', color: '#2dd4bf' },
  { label: 'Electronics', count: '38,400', icon: '📱', slug: 'electronics', image: 'https://images.pexels.com/photos/303383/pexels-photo-303383.jpeg?auto=compress&w=600', color: '#2dd4bf' },
  { label: 'Fashion', count: '6,388', icon: '👗', slug: 'fashion', image: 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&w=600', color: '#2dd4bf' },
  { label: 'Property', count: '12,450', icon: '🏡', slug: 'property', image: 'https://images.pexels.com/photos/2581922/pexels-photo-2581922.jpeg?auto=compress&w=600', color: '#2dd4bf' },
]

const bentoStack = [
  { label: 'Home &amp; Living', count: '9,200', icon: '🛋️', slug: 'home-living', image: 'https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg?auto=compress&w=600' },
  { label: 'New Cars', count: '1,540', icon: '🚙', slug: 'motors/new-cars', image: 'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&w=600' },
]

const stats = [
  { value: '2M+', label: 'Active Users' },
  { value: '91K+', label: 'Listings' },
  { value: '12', label: 'Cities' },
  { value: '100%', label: 'Free to Post' },
]

const motors = [
  { title: 'BMW M5 Competition', price: '1,250,000 MAD', badge: 'Diamond', meta: 'Casablanca • 2023 • 12k km', image: 'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&w=500' },
  { title: 'Ferrari F8 Tributo', price: '3,400,000 MAD', badge: 'Diamond', meta: 'Marrakech • 2024 • New', image: 'https://images.pexels.com/photos/1638459/pexels-photo-1638459.jpeg?auto=compress&w=500' },
  { title: 'Range Rover Defender', price: '1,850,000 MAD', badge: 'Verified', meta: 'Rabat • 2022 • 35k km', image: 'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&w=500' },
  { title: 'Porsche Taycan Turbo', price: '2,100,000 MAD', badge: 'Diamond', meta: 'Tangier • 2023 • 5k km', image: 'https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg?auto=compress&w=500' },
]

const property = [
  { title: 'Luxury Villa, Marrakech Palmeraie', price: '12,500,000 MAD', badge: 'Diamond', meta: 'Marrakech • For Sale', image: 'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&w=500' },
  { title: 'Modern Apartment, Casablanca CFC', price: '25,000 MAD/mo', badge: 'Diamond', meta: 'Casablanca • For Rent', image: 'https://images.pexels.com/photos/1918291/pexels-photo-1918291.jpeg?auto=compress&w=500' },
  { title: 'Heritage Riad, Rabat Medina', price: '8,900,000 MAD', badge: 'Verified', meta: 'Rabat • For Sale', image: 'https://images.pexels.com/photos/2872755/pexels-photo-2872755.jpeg?auto=compress&w=500' },
  { title: 'Premium Penthouse, Tangier Marina', price: '18,500 MAD/mo', badge: 'Diamond', meta: 'Tangier • For Rent', image: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&w=500' },
]

const electronics = [
  { title: 'iPhone 15 Pro Max, 256GB', price: '12,500 MAD', badge: 'Verified', meta: 'Casablanca • New', image: 'https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&w=500' },
  { title: 'Samsung Galaxy S24 Ultra', price: '11,800 MAD', badge: 'Verified', meta: 'Rabat • New', image: 'https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg?auto=compress&w=500' },
  { title: 'MacBook Pro 14" M3 Max', price: '28,000 MAD', badge: 'Diamond', meta: 'Casablanca • New', image: 'https://images.pexels.com/photos/1229861/pexels-photo-1229861.jpeg?auto=compress&w=500' },
  { title: 'iPad Pro 13" M4, 256GB', price: '14,200 MAD', badge: 'Verified', meta: 'Tangier • New', image: 'https://images.pexels.com/photos/1334597/pexels-photo-1334597.jpeg?auto=compress&w=500' },
]

const vault = [
  { title: 'Patek Philippe Nautilus 5711', price: '1,850,000 MAD', meta: 'Casablanca', image: 'https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&w=500' },
  { title: 'Hermès Birkin 35 — Togo Gold', price: '420,000 MAD', meta: 'Rabat', image: 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&w=500' },
  { title: 'Rolex Daytona Panda Dial', price: '680,000 MAD', meta: 'Marrakech', image: 'https://images.pexels.com/photos/3094799/pexels-photo-3094799.jpeg?auto=compress&w=500' },
  { title: 'The Macallan 30yr Fine Oak', price: '85,000 MAD', meta: 'Tangier', image: 'https://images.pexels.com/photos/3407777/pexels-photo-3407777.jpeg?auto=compress&w=500' },
]

const testimonials = [
  { text: 'Found my dream apartment in Rabat within 2 days. The interface is miles ahead of anything else in Morocco.', author: 'Amine L.', city: 'Rabat', initials: 'AL', color: '#2dd4bf' },
  { text: 'Selling my Porsche was seamless. Diamond Membership works — three serious buyers within 24 hours.', author: 'Sarah B.', city: 'Casablanca', initials: 'SB', color: '#ffac5a' },
  { text: 'SouKni is the only marketplace I trust. Verified sellers and instant WhatsApp contact. Perfect.', author: 'Karim M.', city: 'Marrakech', initials: 'KM', color: '#e6e2d9' },
]

function ListingCard({ item, isVault, locale }: { item: any, isVault?: boolean, locale: string }) {
  const [liked, setLiked] = useState(false)
  const [hovered, setHovered] = useState(false)
  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{ backgroundColor: 'white', borderRadius: '24px', overflow: 'hidden', border: '1px solid rgba(186,202,197,0.2)', boxShadow: hovered ? '0 24px 48px rgba(0,0,0,0.12)' : '0 4px 16px rgba(0,0,0,0.06)', transition: 'all 0.3s', transform: hovered ? 'translateY(-6px)' : 'translateY(0)', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ position: 'relative', height: isVault ? '240px' : '200px', overflow: 'hidden' }}>
        <img src={item.image} alt={item.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.7s', transform: hovered ? 'scale(1.08)' : 'scale(1)' }} />
        {item.badge && (
          <div style={{ position: 'absolute', top: '14px', left: '14px' }}>
            <span style={{ background: item.badge === 'Diamond' ? 'linear-gradient(135deg, #2dd4bf, #2dd4bf)' : 'rgba(255,255,255,0.92)', backdropFilter: 'blur(8px)', color: item.badge === 'Diamond' ? 'white' : '#2dd4bf', fontSize: '9px', fontWeight: 800, padding: '4px 12px', borderRadius: '100px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              {item.badge === 'Diamond' ? '💎 ' : '✓ '}{item.badge}
            </span>
          </div>
        )}
        <button onClick={() => setLiked(!liked)}
          style={{ position: 'absolute', top: '14px', right: '14px', width: '36px', height: '36px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: '16px', color: liked ? '#ef4444' : 'white', transition: 'all 0.2s' }}>
          {liked ? '♥' : '♡'}
        </button>
      </div>
      <div style={{ padding: '20px' }}>
        <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a', marginBottom: '6px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', letterSpacing: '-0.01em' }}>{item.title}</h4>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <p style={{ fontSize: '18px', fontWeight: 800, color: isVault ? '#8d4f00' : '#2dd4bf', letterSpacing: '-0.01em' }}>{item.price}</p>
          {item.meta && <p style={{ fontSize: '11px', color: '#64748b', display: 'flex', alignItems: 'center', gap: '3px' }}><MapPin size={10} />{item.meta}</p>}
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button style={{ flex: 1, backgroundColor: '#25D366', color: 'white', border: 'none', padding: '10px', borderRadius: '100px', fontWeight: 700, fontSize: '13px', cursor: 'pointer', fontFamily: 'Inter, sans-serif', transition: 'opacity 0.15s' }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.88'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}>
            WhatsApp
          </button>
          <button style={{ flex: 1, border: isVault ? '1.5px solid #8d4f00' : '1.5px solid #2dd4bf', color: isVault ? '#8d4f00' : '#2dd4bf', backgroundColor: 'transparent', padding: '10px', borderRadius: '100px', fontWeight: 700, fontSize: '13px', cursor: 'pointer', fontFamily: 'Inter, sans-serif', transition: 'background 0.15s' }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = isVault ? 'rgba(141,79,0,0.06)' : 'rgba(0,107,95,0.06)'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}>
            Message
          </button>
        </div>
      </div>
    </div>
  )
}

function SectionRow({ title, subtitle, items, isVault, bg, href, locale }: {
  title: string, subtitle: string, items: any[], isVault?: boolean, bg?: string, href: string, locale: string
}) {
  return (
    <section style={{ backgroundColor: bg || 'transparent', padding: '72px 0' }}>
      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 40px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '40px' }}>
          <div>
            <h2 style={{ fontSize: '28px', fontWeight: 800, color: '#0f172a', marginBottom: '6px', letterSpacing: '-0.02em' }}>{title}</h2>
            <p style={{ fontSize: '16px', color: '#64748b' }}>{subtitle}</p>
          </div>
          <Link href={`/${locale}${href}`} style={{ display: 'flex', alignItems: 'center', gap: '6px', color: isVault ? '#8d4f00' : '#2dd4bf', fontWeight: 700, fontSize: '14px', textDecoration: 'none', transition: 'gap 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.gap = '10px'}
            onMouseLeave={e => e.currentTarget.style.gap = '6px'}>
            View All <ChevronRight size={16} />
          </Link>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
          {items.map((item, i) => <ListingCard key={i} item={item} isVault={isVault} locale={locale} />)}
        </div>
      </div>
    </section>
  )
}

export default function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = React.use(params)
  const router = useRouter()

  const handleSearch = () => {
    if (searchQuery.trim()) {
      const categoryParam = activeTab !== 'All' ? `&category=${activeTab.toLowerCase()}` : ''
      router.push(`/${locale}/search?q=${encodeURIComponent(searchQuery.trim())}${categoryParam}`)
    }
  }
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState('All')
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div style={{ fontFamily: 'Inter, system-ui, sans-serif', backgroundColor: '#f4fbf8', minHeight: '100vh' }}>

      {/* ── HERO ── */}
      <section style={{ position: 'relative', height: '620px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'visible' }}>
        <img src="https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&w=1600" alt="Hero"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', transform: 'scale(1.05)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(0,107,95,0.85) 0%, rgba(0,0,0,0.6) 50%, rgba(0,0,0,0.4) 100%)' }} />

        <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', padding: '0 20px', maxWidth: '860px', width: '100%' }}>
          {/* Badge */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: 'rgba(45,212,191,0.15)', backdropFilter: 'blur(12px)', border: '1px solid rgba(45,212,191,0.3)', borderRadius: '100px', padding: '6px 16px', marginBottom: '24px' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#2dd4bf', animation: 'pulse 2s infinite' }} />
            <span style={{ fontSize: '12px', fontWeight: 700, color: '#62fae3', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Morocco's #1 Premium Marketplace</span>
          </div>

          <h1 style={{ fontSize: '60px', fontWeight: 900, color: 'white', letterSpacing: '-0.04em', lineHeight: 1.05, marginBottom: '20px' }}>
            The Market in<br />
            <span style={{ color: '#2dd4bf' }}>your Pocket</span>
          </h1>
          <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.8)', marginBottom: '40px', lineHeight: 1.6, maxWidth: '560px', margin: '0 auto 40px' }}>
            Buy and sell luxury motors, premium property, fashion, electronics and rare collectibles across Morocco.
          </p>

          {/* Search tabs */}
          <div style={{ maxWidth: '720px', margin: '0 auto', position: 'relative', zIndex: 50 }}>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '12px', justifyContent: 'center' }}>
              {['All', 'Motors', 'Property', 'Electronics', 'Fashion'].map(tab => (
                <button key={tab} onClick={() => setActiveTab(tab)}
                  style={{ padding: '6px 16px', borderRadius: '100px', border: 'none', cursor: 'pointer', fontSize: '12px', fontWeight: 700, letterSpacing: '0.05em', backgroundColor: activeTab === tab ? '#2dd4bf' : 'rgba(255,255,255,0.15)', backdropFilter: 'blur(12px)', color: activeTab === tab ? '#00201c' : 'white', transition: 'all 0.15s' }}>
                  {tab}
                </button>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '0', backgroundColor: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(24px)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '20px', padding: '8px', boxShadow: '0 24px 64px rgba(0,0,0,0.2)' }}>
              <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 20px', borderRight: '1px solid rgba(255,255,255,0.15)' }}>
                <Search size={18} color="rgba(255,255,255,0.6)" style={{ flexShrink: 0 }} />
                <input type="text" placeholder={`Search ${activeTab === 'All' ? 'anything' : activeTab.toLowerCase()}...`}
                  value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleSearch()}
                  style={{ flex: 1, backgroundColor: 'transparent', border: 'none', outline: 'none', fontSize: '16px', color: 'white', fontFamily: 'Inter, sans-serif' }} />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', padding: '12px 20px', borderRight: '1px solid rgba(255,255,255,0.15)' }}>
                <CityPicker light placeholder="All Morocco" />
              </div>
              <button onClick={handleSearch} style={{ backgroundColor: '#2dd4bf', color: '#00201c', border: 'none', padding: '14px 32px', borderRadius: '14px', fontWeight: 800, fontSize: '14px', cursor: 'pointer', fontFamily: 'Inter, sans-serif', letterSpacing: '0.05em', transition: 'all 0.15s', whiteSpace: 'nowrap' }}
                onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#0f9b8e'; e.currentTarget.style.transform = 'scale(1.02)' }}
                onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#2dd4bf'; e.currentTarget.style.transform = 'scale(1)' }}>
                Search
              </button>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{ position: 'absolute', bottom: '32px', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', opacity: scrolled ? 0 : 1, transition: 'opacity 0.3s' }}>
          <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Scroll to explore</span>
          <div style={{ width: '24px', height: '40px', border: '2px solid rgba(255,255,255,0.3)', borderRadius: '100px', display: 'flex', justifyContent: 'center', paddingTop: '6px' }}>
            <div style={{ width: '4px', height: '8px', backgroundColor: '#2dd4bf', borderRadius: '100px' }} />
          </div>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <div style={{ backgroundColor: '#2dd4bf', padding: '0' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 40px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)' }}>
          {stats.map((s, i) => (
            <div key={s.label} style={{ padding: '28px 32px', textAlign: 'center', borderRight: i < 3 ? '1px solid rgba(255,255,255,0.1)' : 'none' }}>
              <p style={{ fontSize: '36px', fontWeight: 900, color: '#62fae3', letterSpacing: '-0.03em', marginBottom: '4px' }}>{s.value}</p>
              <p style={{ fontSize: '13px', fontWeight: 600, color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── CATEGORY GRID ── */}
      <section style={{ maxWidth: '1440px', margin: '0 auto', padding: '80px 40px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '40px' }}>
          <div>
            <p style={{ fontSize: '12px', fontWeight: 700, color: '#2dd4bf', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '8px' }}>What are you looking for?</p>
            <h2 style={{ fontSize: '36px', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em' }}>Browse by Category</h2>
          </div>
          <p style={{ fontSize: '14px', color: '#64748b' }}>91,000+ active listings across Morocco</p>
        </div>

        {/* ROW 1 — Motors (big, left) + 2x2 grid of Electronics/Fashion/Property/Services (right) */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gridTemplateRows: '496px', gap: '16px', marginBottom: '16px' }}>
          <Link href={`/${locale}/motors`} style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
            <div style={{ position: 'relative', height: '100%', borderRadius: '24px', overflow: 'hidden', cursor: 'pointer' }}
              onMouseEnter={e => { const img = e.currentTarget.querySelector('img') as HTMLImageElement; if (img) img.style.transform = 'scale(1.08)' }}
              onMouseLeave={e => { const img = e.currentTarget.querySelector('img') as HTMLImageElement; if (img) img.style.transform = 'scale(1)' }}>
              <img src={categories[0].image} alt="Motors"
                style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s ease' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 60%, rgba(0,0,0,0) 100%)' }} />
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '32px' }}>
                <p style={{ color: '#62fae3', fontSize: '13px', fontWeight: 700, marginBottom: '6px', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{categories[0].count} listings</p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <h3 style={{ color: 'white', fontSize: '32px', fontWeight: 800, letterSpacing: '-0.02em' }}>Motors</h3>
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <ChevronRight size={20} color="white" />
                  </div>
                </div>
              </div>
              <div style={{ position: 'absolute', top: '20px', left: '20px', fontSize: '28px' }}>🚗</div>
            </div>
          </Link>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 1fr', gap: '16px', height: '496px' }}>
            {[categories[1], categories[2], categories[3], { label: 'Services', count: '9,200', icon: '🔧', slug: 'community', image: 'https://images.pexels.com/photos/4246120/pexels-photo-4246120.jpeg?auto=compress&w=600' }].map(cat => (
              <Link key={cat.slug} href={`/${locale}/${cat.slug}`} style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
                <div style={{ position: 'relative', height: '100%', borderRadius: '24px', overflow: 'hidden', cursor: 'pointer' }}
                  onMouseEnter={e => { const img = e.currentTarget.querySelector('img') as HTMLImageElement; if (img) img.style.transform = 'scale(1.08)' }}
                  onMouseLeave={e => { const img = e.currentTarget.querySelector('img') as HTMLImageElement; if (img) img.style.transform = 'scale(1)' }}>
                  <img src={cat.image} alt={cat.label}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s ease' }} />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0.1))' }} />
                  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '18px' }}>
                    <p style={{ color: '#62fae3', fontSize: '10px', fontWeight: 700, marginBottom: '4px', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{cat.count} listings</p>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <h3 style={{ color: 'white', fontSize: '18px', fontWeight: 800, letterSpacing: '-0.02em' }}>{cat.label}</h3>
                      <div style={{ width: '30px', height: '30px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <ChevronRight size={14} color="white" />
                      </div>
                    </div>
                  </div>
                  <div style={{ position: 'absolute', top: '14px', left: '14px', fontSize: '18px' }}>{cat.icon}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* ROW 2 — Home & Living + New Cars, side by side */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '220px', gap: '16px', height: '220px', marginBottom: '16px' }}>
          {bentoStack.map(cat => (
            <Link key={cat.slug} href={`/${locale}/${cat.slug}`} style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
              <div style={{ position: 'relative', height: '100%', borderRadius: '24px', overflow: 'hidden', cursor: 'pointer' }}
                onMouseEnter={e => { const img = e.currentTarget.querySelector('img') as HTMLImageElement; if (img) img.style.transform = 'scale(1.08)' }}
                onMouseLeave={e => { const img = e.currentTarget.querySelector('img') as HTMLImageElement; if (img) img.style.transform = 'scale(1)' }}>
                <img src={cat.image} alt={cat.label}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s ease' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0.1))' }} />
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '22px' }}>
                  <p style={{ color: '#62fae3', fontSize: '11px', fontWeight: 700, marginBottom: '5px', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{cat.count} listings</p>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <h3 style={{ color: 'white', fontSize: '22px', fontWeight: 800, letterSpacing: '-0.02em' }} dangerouslySetInnerHTML={{ __html: cat.label }} />
                    <div style={{ width: '34px', height: '34px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <ChevronRight size={16} color="white" />
                    </div>
                  </div>
                </div>
                <div style={{ position: 'absolute', top: '18px', left: '18px', fontSize: '22px' }}>{cat.icon}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── IMMO PRO BANNER ── */}
      <section style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 40px 72px' }}>
        <div style={{ position: 'relative', borderRadius: '32px', overflow: 'hidden', height: '280px' }}>
          <img src="https://images.pexels.com/photos/2581922/pexels-photo-2581922.jpeg?auto=compress&w=1400" alt="Immo Pro"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(0,107,95,0.92) 0%, rgba(0,107,95,0.6) 50%, rgba(0,0,0,0) 100%)' }} />
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', padding: '48px' }}>
            <div style={{ maxWidth: '480px' }}>
              <span style={{ fontSize: '10px', fontWeight: 800, color: '#62fae3', textTransform: 'uppercase', letterSpacing: '0.15em', display: 'block', marginBottom: '12px' }}>SouKni Immo Pro</span>
              <h2 style={{ fontSize: '36px', fontWeight: 800, color: 'white', marginBottom: '12px', letterSpacing: '-0.02em', lineHeight: 1.2 }}>Premium Property in Morocco</h2>
              <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '16px', marginBottom: '28px', lineHeight: 1.6 }}>Luxury villas, riads, penthouse apartments and commercial spaces across all major cities.</p>
              <Link href={`/${locale}/property`} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: 'white', color: '#2dd4bf', padding: '14px 28px', borderRadius: '100px', fontWeight: 800, fontSize: '14px', textDecoration: 'none', transition: 'all 0.15s' }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = '#62fae3'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = 'white'}>
                Explore Property <ChevronRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <SectionRow title="Featured Property" subtitle="Premium residential and commercial opportunities" items={property} bg="#f4fbf8" href="/property" locale={locale} />
      <SectionRow title="Mobiles & Electronics" subtitle="Latest high-end devices and tech essentials" items={electronics} bg="#f8fafc" href="/electronics" locale={locale} />

      {/* ── DIAMOND BANNER ── */}
      <section style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 40px 72px' }}>
        <div style={{ position: 'relative', borderRadius: '32px', overflow: 'hidden', background: 'linear-gradient(135deg, #2dd4bf 0%, #0f766e 50%, #2dd4bf 100%)', padding: '64px 56px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '40px' }}>
          <div style={{ position: 'absolute', top: '-60px', right: '120px', fontSize: '280px', opacity: 0.06, lineHeight: 1, userSelect: 'none' }}>💎</div>
          <div style={{ position: 'relative', zIndex: 1, maxWidth: '560px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: '100px', padding: '6px 14px', marginBottom: '20px' }}>
              <span style={{ fontSize: '14px' }}>💎</span>
              <span style={{ fontSize: '11px', fontWeight: 800, color: 'white', textTransform: 'uppercase', letterSpacing: '0.12em' }}>Exclusive Status</span>
            </div>
            <h2 style={{ fontSize: '40px', fontWeight: 900, color: 'white', marginBottom: '16px', letterSpacing: '-0.03em', lineHeight: 1.1 }}>Become a SouKni Diamond Member</h2>
            <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '17px', marginBottom: '32px', lineHeight: 1.6 }}>Priority listings, exclusive vault access, verified badge, and dedicated support. Sell 5x faster and reach premium buyers first.</p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button style={{ backgroundColor: 'white', color: '#2dd4bf', border: 'none', padding: '14px 32px', borderRadius: '100px', fontWeight: 800, fontSize: '15px', cursor: 'pointer', fontFamily: 'Inter, sans-serif', transition: 'all 0.15s' }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = '#62fae3'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = 'white'}>
                Get Verified Now
              </button>
              <button style={{ backgroundColor: 'transparent', color: 'white', border: '2px solid rgba(255,255,255,0.4)', padding: '14px 32px', borderRadius: '100px', fontWeight: 700, fontSize: '15px', cursor: 'pointer', fontFamily: 'Inter, sans-serif', transition: 'all 0.15s' }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'white'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)'}>
                Learn More
              </button>
            </div>
          </div>
          <div style={{ position: 'relative', zIndex: 1, display: 'flex', gap: '16px', flexShrink: 0 }}>
            {[{ icon: '🏆', title: 'Priority', desc: 'Top placement on all searches' }, { icon: '✅', title: 'Verified', desc: 'Trusted badge on your profile' }, { icon: '📊', title: 'Analytics', desc: 'Track views and inquiries' }].map(f => (
              <div key={f.title} style={{ backgroundColor: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '20px', padding: '24px 20px', textAlign: 'center', width: '130px' }}>
                <div style={{ fontSize: '28px', marginBottom: '10px' }}>{f.icon}</div>
                <p style={{ fontSize: '13px', fontWeight: 800, color: 'white', marginBottom: '4px' }}>{f.title}</p>
                <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.65)', lineHeight: 1.4 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── THE VAULT ── */}
      <SectionRow title="Trending in The Vault" subtitle="Rare collectibles, fine watches, and horological masterpieces" items={vault} isVault bg="#0f172a" href="/vault" locale={locale} />

      {/* ── TESTIMONIALS ── */}
      <section style={{ backgroundColor: '#eef5f2', padding: '80px 0' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 40px' }}>
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <p style={{ fontSize: '12px', fontWeight: 700, color: '#2dd4bf', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '12px' }}>What our community says</p>
            <h2 style={{ fontSize: '36px', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: '16px' }}>Trusted by 2M+ Moroccans</h2>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              {[1,2,3,4,5].map(i => <Star key={i} size={20} fill="#f59e0b" color="#f59e0b" />)}
              <span style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a', marginLeft: '8px' }}>4.9/5</span>
              <span style={{ fontSize: '14px', color: '#64748b' }}>on Trustpilot · 12,000+ reviews</span>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
            {testimonials.map((t, i) => (
              <div key={i} style={{ backgroundColor: 'white', borderRadius: '24px', padding: '32px', border: '1px solid rgba(186,202,197,0.2)', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', transform: i === 1 ? 'scale(1.03)' : 'scale(1)', position: 'relative', zIndex: i === 1 ? 2 : 1 }}>
                <div style={{ display: 'flex', gap: '4px', marginBottom: '20px' }}>
                  {[1,2,3,4,5].map(s => <Star key={s} size={14} fill="#f59e0b" color="#f59e0b" />)}
                </div>
                <p style={{ fontSize: '15px', color: '#3c4a46', fontStyle: 'italic', lineHeight: 1.7, marginBottom: '24px' }}>"{t.text}"</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div style={{ width: '44px', height: '44px', borderRadius: '50%', backgroundColor: t.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: 800, color: '#0f172a' }}>{t.initials}</div>
                  <div>
                    <p style={{ fontWeight: 700, color: '#0f172a', fontSize: '14px' }}>{t.author}</p>
                    <p style={{ fontSize: '12px', color: '#64748b' }}>{t.city}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── APP DOWNLOAD ── */}
      <section style={{ background: 'linear-gradient(135deg, #2dd4bf 0%, #0f766e 100%)', padding: '80px 0', overflow: 'hidden', position: 'relative' }}>
        <div style={{ position: 'absolute', top: '-100px', right: '-100px', width: '400px', height: '400px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.05)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-80px', left: '-80px', width: '300px', height: '300px', borderRadius: '50%', backgroundColor: 'rgba(0,0,0,0.05)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 40px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'center' }}>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <p style={{ fontSize: '12px', fontWeight: 800, color: 'rgba(255,255,255,0.7)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '16px' }}>Join the SouKni Family</p>
            <h2 style={{ fontSize: '48px', fontWeight: 900, color: 'white', letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: '20px' }}>
              The Market in<br />your Pocket
            </h2>
            <p style={{ fontSize: '17px', color: 'rgba(255,255,255,0.85)', marginBottom: '40px', lineHeight: 1.6, maxWidth: '420px' }}>
              Get real-time alerts, instant WhatsApp contact, and manage your listings from anywhere across Morocco.
            </p>
            <div style={{ display: 'flex', gap: '12px', marginBottom: '48px' }}>
              {[{ icon: '🍎', store: 'App Store', sub: 'Download on the' }, { icon: '▶', store: 'Google Play', sub: 'Get it on' }].map(btn => (
                <button key={btn.store} style={{ display: 'flex', alignItems: 'center', gap: '12px', backgroundColor: 'rgba(0,0,0,0.3)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.2)', color: 'white', padding: '14px 24px', borderRadius: '16px', cursor: 'pointer', fontFamily: 'Inter, sans-serif', transition: 'all 0.15s' }}
                  onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.5)'}
                  onMouseLeave={e => e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.3)'}>
                  <span style={{ fontSize: '28px' }}>{btn.icon}</span>
                  <div style={{ textAlign: 'left' }}>
                    <p style={{ fontSize: '10px', opacity: 0.7, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '2px' }}>{btn.sub}</p>
                    <p style={{ fontSize: '16px', fontWeight: 800 }}>{btn.store}</p>
                  </div>
                </button>
              ))}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ display: 'flex' }}>
                {['#2dd4bf', '#e6e2d9', '#ffac5a', '#f4fbf8'].map((color, i) => (
                  <div key={i} style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: color, border: '2px solid rgba(255,255,255,0.4)', marginLeft: i > 0 ? '-12px' : '0' }} />
                ))}
              </div>
              <p style={{ fontSize: '13px', fontWeight: 700, color: 'rgba(255,255,255,0.9)' }}>2M+ Moroccans already on SouKni</p>
            </div>
          </div>

          {/* Phone mockup */}
          <div style={{ position: 'relative', zIndex: 1, display: 'flex', justifyContent: 'center' }}>
            <div style={{ position: 'relative', width: '280px', height: '560px' }}>
              <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '52px', filter: 'blur(40px)', transform: 'scale(0.9) translateY(20px)' }} />
              <div style={{ position: 'relative', width: '280px', height: '560px', backgroundColor: '#0f172a', borderRadius: '48px', border: '8px solid rgba(255,255,255,0.15)', overflow: 'hidden', boxShadow: '0 40px 80px rgba(0,0,0,0.3)' }}>
                <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '100px', height: '24px', backgroundColor: '#0f172a', borderBottomLeftRadius: '16px', borderBottomRightRadius: '16px', zIndex: 10 }} />
                <div style={{ padding: '40px 20px 20px', backgroundColor: '#2dd4bf', height: '160px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                  <p style={{ fontSize: '10px', color: 'rgba(255,255,255,0.6)', marginBottom: '4px' }}>soukni</p>
                  <p style={{ fontSize: '16px', fontWeight: 800, color: 'white', marginBottom: '12px' }}>Good morning! 👋</p>
                  <div style={{ backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: '100px', padding: '8px 14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Search size={12} color="rgba(255,255,255,0.6)" />
                    <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.6)' }}>Search anything...</span>
                  </div>
                </div>
                <div style={{ padding: '16px', backgroundColor: '#f4fbf8' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '12px' }}>
                    {['🚗 Motors', '🏡 Property', '📱 Electronics', '💎 Vault'].map(item => (
                      <div key={item} style={{ backgroundColor: 'white', borderRadius: '12px', padding: '10px', fontSize: '10px', fontWeight: 700, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '6px' }}>{item}</div>
                    ))}
                  </div>
                  {[{ h: '80px', w: '100%', bg: '#e8efec', r: '12px' }, { h: '60px', w: '100%', bg: '#e8efec', r: '12px' }].map((box, i) => (
                    <div key={i} style={{ height: box.h, width: box.w, backgroundColor: box.bg, borderRadius: box.r, marginBottom: '8px' }} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
