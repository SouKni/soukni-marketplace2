'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { MapPin, Search, Heart, MessageCircle, Diamond, Star, ChevronRight } from 'lucide-react'

const subCategories = ['All Services', 'Mechanics', 'Tire Shops', 'Car Wash', 'Detailing', 'Body Repair', 'Oil Change']
const sellerFilters = ['All Sellers', 'SouKni Members', 'SouKni Pro']

const listings = [
  { title: 'Elite Auto Detailing — Full Package', price: 800, location: 'Casablanca', time: 'Just now', badge: 'diamond', rating: 4.9, reviews: 218, image: 'https://images.pexels.com/photos/3807386/pexels-photo-3807386.jpeg?auto=compress&w=600' },
  { title: 'Master Mechanics Garage', price: 350, location: 'Rabat', time: '1 hour ago', badge: 'diamond', rating: 4.8, reviews: 342, image: 'https://images.pexels.com/photos/3807517/pexels-photo-3807517.jpeg?auto=compress&w=600' },
  { title: 'ProTire Casablanca — All Brands', price: 450, location: 'Casablanca', time: '2 hours ago', badge: 'verified', rating: 4.7, reviews: 156, image: 'https://images.pexels.com/photos/3807386/pexels-photo-3807386.jpeg?auto=compress&w=600' },
  { title: 'Shine & Protect Car Wash', price: 150, location: 'Marrakech', time: '3 hours ago', badge: 'verified', rating: 4.6, reviews: 89, image: 'https://images.pexels.com/photos/3807517/pexels-photo-3807517.jpeg?auto=compress&w=600' },
  { title: 'AutoBody Experts Tangier', price: 1200, location: 'Tangier', time: '4 hours ago', badge: 'diamond', rating: 5.0, reviews: 67, image: 'https://images.pexels.com/photos/3807386/pexels-photo-3807386.jpeg?auto=compress&w=600' },
  { title: 'QuickLube Oil & Filter Service', price: 200, location: 'Rabat', time: '5 hours ago', badge: 'verified', rating: 4.5, reviews: 201, image: 'https://images.pexels.com/photos/3807517/pexels-photo-3807517.jpeg?auto=compress&w=600' },
  { title: 'Premium Window Tinting Studio', price: 600, location: 'Casablanca', time: '1 day ago', badge: 'diamond', rating: 4.9, reviews: 134, image: 'https://images.pexels.com/photos/3807386/pexels-photo-3807386.jpeg?auto=compress&w=600' },
  { title: 'AC Recharge & Diagnostics', price: 280, location: 'Agadir', time: '1 day ago', badge: 'verified', rating: 4.7, reviews: 98, image: 'https://images.pexels.com/photos/3807517/pexels-photo-3807517.jpeg?auto=compress&w=600' },
]

function Stars({ rating }: { rating: number }) {
  return (
    <div style={{ display: 'flex', gap: '1px' }}>
      {[1,2,3,4,5].map(i => <Star key={i} size={11} fill={i <= Math.floor(rating) ? '#f59e0b' : 'none'} color="#f59e0b" />)}
    </div>
  )
}

function ServiceCard({ item }: { item: typeof listings[0] }) {
  const [saved, setSaved] = useState(false)
  const [hovered, setHovered] = useState(false)
  return (
    <Link href="#" style={{ textDecoration: 'none' }}>
      <article onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
        style={{ backgroundColor: 'white', borderRadius: '32px', overflow: 'hidden', border: '1px solid #f1f5f9', boxShadow: hovered ? '0 20px 40px rgba(0,0,0,0.1)' : '0 2px 8px rgba(0,0,0,0.04)', transition: 'all 0.3s', cursor: 'pointer' }}>
        <div style={{ position: 'relative', aspectRatio: '4/3', overflow: 'hidden' }}>
          <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s', transform: hovered ? 'scale(1.08)' : 'scale(1)' }} />
          {item.badge === 'diamond' && (
            <span style={{ position: 'absolute', top: '14px', left: '14px', background: 'linear-gradient(135deg, #22d4a8, #0f9b8e)', color: 'white', fontSize: '9px', fontWeight: 800, padding: '4px 12px', borderRadius: '100px', textTransform: 'uppercase', letterSpacing: '0.07em', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Diamond size={9} /> Diamond
            </span>
          )}
          {item.badge === 'verified' && (
            <span style={{ position: 'absolute', top: '14px', left: '14px', backgroundColor: 'rgba(255,255,255,0.92)', color: '#22d4a8', fontSize: '9px', fontWeight: 800, padding: '4px 12px', borderRadius: '100px', textTransform: 'uppercase' }}>Verified</span>
          )}
          <button onClick={e => { e.preventDefault(); setSaved(!saved) }} style={{ position: 'absolute', top: '14px', right: '14px', width: '34px', height: '34px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <Heart size={15} color={saved ? '#ef4444' : 'white'} fill={saved ? '#ef4444' : 'none'} />
          </button>
        </div>
        <div style={{ padding: '18px' }}>
          <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#161d1b', marginBottom: '8px', lineHeight: 1.3 }}>{item.title}</h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px' }}>
            <Stars rating={item.rating} />
            <span style={{ fontSize: '11px', color: '#6b7a76' }}>({item.reviews})</span>
          </div>
          <div style={{ fontSize: '18px', fontWeight: 800, color: '#22d4a8', marginBottom: '10px' }}>from {item.price} MAD</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#6b7a76', fontSize: '11px', marginBottom: '12px' }}>
            <MapPin size={11} /> {item.location} • {item.time}
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button onClick={e => e.preventDefault()} style={{ flex: 1, backgroundColor: '#eef5f2', color: '#3c4a46', border: 'none', padding: '9px', borderRadius: '100px', fontWeight: 700, fontSize: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px' }}>
              <MessageCircle size={13} /> Chat
            </button>
            <button onClick={e => e.preventDefault()} style={{ flex: 1, backgroundColor: '#25D366', color: 'white', border: 'none', padding: '9px', borderRadius: '100px', fontWeight: 700, fontSize: '12px', cursor: 'pointer' }}>WhatsApp</button>
          </div>
        </div>
      </article>
    </Link>
  )
}

export default function CarServicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = React.use(params)
  const [activePill, setActivePill] = useState('All Services')
  const [activeSeller, setActiveSeller] = useState('All Sellers')
  const [diamondFirst, setDiamondFirst] = useState(false)

  return (
    <div style={{ fontFamily: 'Inter, system-ui, sans-serif', backgroundColor: '#f4fbf8', minHeight: '100vh' }}>

      <section style={{ position: 'relative', height: '380px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        <img src="https://images.pexels.com/photos/3807386/pexels-photo-3807386.jpeg?auto=compress&w=1600" alt="Car Services"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(15,23,42,0.88), rgba(15,23,42,0.35))' }} />
        <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', padding: '0 20px', maxWidth: '700px', width: '100%' }}>
          <h1 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 900, letterSpacing: '-0.05em', fontSize: '48px', color: 'white', marginBottom: '12px', lineHeight: 1.05 }}>Car Services &amp; Garages</h1>
          <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.82)', marginBottom: '28px' }}>1,120 verified service providers across Morocco</p>
          <div style={{ display: 'flex', gap: '8px', backgroundColor: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.25)', borderRadius: '100px', padding: '8px 8px 8px 24px', maxWidth: '560px', margin: '0 auto' }}>
            <Search size={18} color="rgba(255,255,255,0.7)" style={{ flexShrink: 0, alignSelf: 'center' }} />
            <input type="text" placeholder="Search mechanics, car wash, detailing..."
              style={{ flex: 1, backgroundColor: 'transparent', border: 'none', outline: 'none', fontSize: '15px', color: 'white', fontFamily: 'Inter, sans-serif', padding: '6px 8px' }} />
            <button style={{ backgroundColor: '#22d4a8', color: 'white', border: 'none', padding: '12px 24px', borderRadius: '100px', fontWeight: 700, fontSize: '13px', cursor: 'pointer' }}>Search</button>
          </div>
        </div>
      </section>

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '48px 24px 80px' }}>

        <nav style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#64748b', marginBottom: '24px' }}>
          <Link href={`/${locale}`} style={{ color: '#22d4a8', textDecoration: 'none', fontWeight: 600 }}>Home</Link>
          <span>›</span>
          <Link href={`/${locale}/motors`} style={{ color: '#22d4a8', textDecoration: 'none', fontWeight: 600 }}>Motors</Link>
          <span>›</span>
          <span style={{ color: '#161d1b', fontWeight: 700 }}>Car Services &amp; Garages</span>
        </nav>

        <div style={{ backgroundColor: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.6)', borderRadius: '20px', padding: '8px', boxShadow: '0 4px 24px rgba(0,0,0,0.06)', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)' }}>
            {[{ label: 'City', val: 'All Morocco' }, { label: 'Service Type', val: 'All Services' }, { label: 'Price Range', val: 'Any Range' }, { label: 'Rating', val: 'Any Rating' }].map((f, i) => (
              <div key={f.label} style={{ padding: '10px 16px', borderRight: i < 3 ? '1px solid #f1f5f9' : 'none', display: 'flex', flexDirection: 'column', cursor: 'pointer' }}>
                <span style={{ fontSize: '9px', textTransform: 'uppercase', fontWeight: 700, color: '#64748b', letterSpacing: '0.1em', marginBottom: '3px' }}>{f.label}</span>
                <span style={{ fontSize: '13px', fontWeight: 500, color: '#0f172a' }}>{f.val}</span>
              </div>
            ))}
          </div>
          <button style={{ backgroundColor: '#22d4a8', color: 'white', border: 'none', padding: '14px 20px', borderRadius: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700, fontSize: '13px', flexShrink: 0 }}>
            <Search size={18} /> Search
          </button>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#161d1b', letterSpacing: '-0.02em' }}>
            Car Services in Morocco <span style={{ color: '#6b7a76', fontWeight: 400, fontSize: '15px' }}>1,120 listings</span>
          </h2>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button style={{ border: '1px solid #e2e8f0', backgroundColor: 'white', padding: '8px 16px', borderRadius: '100px', fontSize: '13px', fontWeight: 500, color: '#64748b', cursor: 'pointer' }}>Sort: Default</button>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '10px', marginBottom: '16px' }}>
          {sellerFilters.map(filter => (
            <button key={filter} onClick={() => setActiveSeller(filter)}
              style={{ padding: '9px 22px', borderRadius: '10px', border: activeSeller === filter ? 'none' : '1px solid #e2e8f0', backgroundColor: activeSeller === filter ? '#22d4a8' : 'white', color: activeSeller === filter ? 'white' : '#3c4a46', fontSize: '13px', fontWeight: 600, cursor: 'pointer', transition: 'all 0.15s' }}>
              {filter}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {subCategories.map(pill => (
              <button key={pill} onClick={() => setActivePill(pill)}
                style={{ padding: '8px 20px', borderRadius: '100px', border: 'none', cursor: 'pointer', fontSize: '13px', fontWeight: 600, backgroundColor: activePill === pill ? '#161d1b' : '#e8efec', color: activePill === pill ? 'white' : '#161d1b', transition: 'all 0.15s' }}>
                {pill}
              </button>
            ))}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '13px', fontWeight: 700, color: '#161d1b', whiteSpace: 'nowrap' }}>Diamond Verified First</span>
            <div onClick={() => setDiamondFirst(!diamondFirst)}
              style={{ width: '44px', height: '24px', borderRadius: '100px', backgroundColor: diamondFirst ? '#22d4a8' : '#e2e8f0', cursor: 'pointer', position: 'relative', transition: 'background 0.2s', flexShrink: 0 }}>
              <div style={{ position: 'absolute', top: '2px', left: diamondFirst ? '22px' : '2px', width: '20px', height: '20px', borderRadius: '50%', backgroundColor: 'white', transition: 'left 0.2s', boxShadow: '0 1px 4px rgba(0,0,0,0.2)' }} />
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '56px' }}>
          {listings.map((item, i) => <ServiceCard key={i} item={item} />)}
        </div>

        <section style={{ borderRadius: '40px', background: 'linear-gradient(135deg, #161d1b, #2b3230)', padding: '48px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '24px', flexWrap: 'wrap' }}>
          <div>
            <h2 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 900, letterSpacing: '-0.04em', fontSize: '32px', color: 'white', marginBottom: '10px', lineHeight: 1.1 }}>List your garage on SouKni.</h2>
            <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.65)', maxWidth: '480px', lineHeight: 1.6 }}>Reach thousands of car owners looking for trusted mechanics and services across Morocco.</p>
          </div>
          <Link href={`/${locale}/post-ad`} style={{ textDecoration: 'none' }}>
            <span style={{ display: 'inline-block', backgroundColor: '#22d4a8', color: 'white', padding: '14px 32px', borderRadius: '100px', fontWeight: 800, fontSize: '14px', cursor: 'pointer', whiteSpace: 'nowrap' }}>Get Listed Free →</span>
          </Link>
        </section>

      </div>
    </div>
  )
}
