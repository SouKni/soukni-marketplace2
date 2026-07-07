'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { Search, ChevronRight, MapPin, Heart, MessageCircle, Diamond, Star } from 'lucide-react'
import { useMarket } from '@/context/MarketContext'

const categories = [
  { label: 'Used Cars', count: '24,180', slug: 'cars', image: 'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&w=600' },
  { label: 'New Cars', count: '1,540', slug: 'new-cars', image: 'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&w=600' },
  { label: 'Rental Cars', count: '1,840', slug: 'rental', image: 'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&w=600' },
  { label: 'Parts & Accessories', count: '3,215', slug: 'accessories', image: 'https://images.pexels.com/photos/1149831/pexels-photo-1149831.jpeg?auto=compress&w=600' },
  { label: 'Moto & Scooters', count: '642', slug: 'motorcycles', image: 'https://images.pexels.com/photos/2607554/pexels-photo-2607554.jpeg?auto=compress&w=600' },
  { label: 'Trucks & Vans', count: '195', slug: 'trucks-vans', image: 'https://images.pexels.com/photos/2199293/pexels-photo-2199293.jpeg?auto=compress&w=600' },
  { label: 'Agro & Heavy', count: '84', slug: 'heavy-vehicles', image: 'https://images.pexels.com/photos/1595109/pexels-photo-1595109.jpeg?auto=compress&w=600' },
  { label: 'Car Services & Garages', count: '1,120', slug: 'car-services', image: 'https://images.pexels.com/photos/3807386/pexels-photo-3807386.jpeg?auto=compress&w=600' },
]

const usedCars = [
  { title: 'BMW M4 Competition', price: 785000, location: 'Casablanca', time: 'Just now', badge: 'diamond', year: '2023', km: '12,500 km', image: 'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&w=600' },
  { title: 'Land Rover Defender 110', price: 1200000, location: 'Rabat', time: '1 hour ago', badge: 'diamond', year: '2024', km: '2,100 km', image: 'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&w=600' },
  { title: 'Porsche Cayenne Turbo', price: 980000, location: 'Marrakech', time: '2 hours ago', badge: 'diamond', year: '2023', km: '8,200 km', image: 'https://images.pexels.com/photos/1638459/pexels-photo-1638459.jpeg?auto=compress&w=600' },
  { title: 'Mercedes-Benz GLE 63S', price: 1100000, location: 'Tangier', time: '3 hours ago', badge: 'verified', year: '2022', km: '22,000 km', image: 'https://images.pexels.com/photos/120049/pexels-photo-120049.jpeg?auto=compress&w=600' },
]

const rentalCars = [
  { title: 'Range Rover Vogue', price: 2500, location: 'Casablanca', time: 'Just now', badge: 'diamond', year: '2024', km: '/day', image: 'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&w=600' },
  { title: 'Porsche 911 Carrera', price: 4800, location: 'Marrakech', time: '1 hour ago', badge: 'diamond', year: '2023', km: '/day', image: 'https://images.pexels.com/photos/1638459/pexels-photo-1638459.jpeg?auto=compress&w=600' },
  { title: 'Tesla Model S Plaid', price: 3500, location: 'Rabat', time: '2 hours ago', badge: 'diamond', year: '2024', km: '/day', image: 'https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg?auto=compress&w=600' },
  { title: 'Lamborghini Urus', price: 9200, location: 'Casablanca', time: '3 hours ago', badge: 'diamond', year: '2024', km: '/day', image: 'https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg?auto=compress&w=600' },
]

const motorcycles = [
  { title: 'Ducati Panigale V4', price: 245000, location: 'Casablanca', time: '1 hour ago', badge: 'diamond', year: '2023', km: '1,200 km', image: 'https://images.pexels.com/photos/2607554/pexels-photo-2607554.jpeg?auto=compress&w=600' },
  { title: 'Harley Davidson Iron 883', price: 115000, location: 'Rabat', time: '2 hours ago', badge: 'verified', year: '2021', km: '8,500 km', image: 'https://images.pexels.com/photos/1413412/pexels-photo-1413412.jpeg?auto=compress&w=600' },
  { title: 'BMW R 1250 GS', price: 185000, location: 'Marrakech', time: '3 hours ago', badge: 'verified', year: '2022', km: '12,000 km', image: 'https://images.pexels.com/photos/1715193/pexels-photo-1715193.jpeg?auto=compress&w=600' },
  { title: 'KTM 1290 Super Duke R', price: 245000, location: 'Tangier', time: 'Just now', badge: 'diamond', year: '2024', km: '0 km', image: 'https://images.pexels.com/photos/2519374/pexels-photo-2519374.jpeg?auto=compress&w=600' },
]

function ListingCard({ item, locale }: { item: typeof usedCars[0], locale: string }) {
  const [saved, setSaved] = useState(false)
  const [hovered, setHovered] = useState(false)
  const { formatPrice } = useMarket()
  return (
    <Link href={`/${locale}/listing/1`} style={{ textDecoration: 'none' }}>
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
          <div style={{ display: 'flex', gap: '14px', padding: '10px 0', borderTop: '1px solid #f1f5f9', borderBottom: '1px solid #f1f5f9', marginBottom: '12px' }}>
            <div><p style={{ fontSize: '9px', textTransform: 'uppercase', color: '#94a3b8', marginBottom: '2px' }}>Year</p><p style={{ fontSize: '12px', fontWeight: 700, color: '#161d1b' }}>{item.year}</p></div>
            <div><p style={{ fontSize: '9px', textTransform: 'uppercase', color: '#94a3b8', marginBottom: '2px' }}>Mileage</p><p style={{ fontSize: '12px', fontWeight: 700, color: '#161d1b' }}>{item.km}</p></div>
          </div>
          <div style={{ fontSize: '18px', fontWeight: 800, color: '#22d4a8', marginBottom: '10px' }}>{formatPrice(item.price)}</div>
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

export default function MotorsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = React.use(params)
  const [search, setSearch] = useState('')

  return (
    <div style={{ fontFamily: 'Inter, system-ui, sans-serif', backgroundColor: '#f4fbf8', minHeight: '100vh' }}>

      {/* CINEMATIC HERO + GLASSMORPHIC SEARCH HUB */}
      <section style={{ position: 'relative', height: '420px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        <img src="https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&w=1600" alt="SouKni Motors"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(15,23,42,0.88), rgba(15,23,42,0.35))' }} />
        <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', padding: '0 20px', maxWidth: '760px', width: '100%' }}>
          <h1 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 900, letterSpacing: '-0.05em', fontSize: '52px', color: 'white', marginBottom: '12px', lineHeight: 1.05 }}>Find your dream engine.</h1>
          <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.82)', marginBottom: '28px' }}>24,180+ verified listings across Morocco</p>
          <div style={{ display: 'flex', gap: '8px', backgroundColor: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.25)', borderRadius: '100px', padding: '8px 8px 8px 24px', maxWidth: '600px', margin: '0 auto' }}>
            <Search size={18} color="rgba(255,255,255,0.7)" style={{ flexShrink: 0, alignSelf: 'center' }} />
            <input value={search} onChange={e => setSearch(e.target.value)} type="text" placeholder="Search make, model, year..."
              style={{ flex: 1, backgroundColor: 'transparent', border: 'none', outline: 'none', fontSize: '15px', color: 'white', fontFamily: 'Inter, sans-serif', padding: '6px 8px' }} />
            <button style={{ backgroundColor: '#22d4a8', color: 'white', border: 'none', padding: '12px 26px', borderRadius: '100px', fontWeight: 700, fontSize: '13px', cursor: 'pointer', whiteSpace: 'nowrap' }}>Search</button>
          </div>
        </div>
      </section>

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>

        {/* CATEGORY IMAGE GRID — 4x2, overlapping hero */}
        <section style={{ marginTop: '-48px', position: 'relative', zIndex: 20, marginBottom: '48px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
            {categories.map(cat => (
              <Link key={cat.slug} href={`/${locale}/motors/${cat.slug}`} style={{ textDecoration: 'none' }}>
                <div style={{ position: 'relative', height: '150px', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 8px 32px rgba(0,0,0,0.12)', cursor: 'pointer', transition: 'transform 0.2s' }}
                  onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.transform = 'scale(1.03)'}
                  onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.transform = 'scale(1)'}>
                  <img src={cat.image} alt={cat.label} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.85), rgba(0,0,0,0.1))' }} />
                  <div style={{ position: 'absolute', bottom: '14px', left: '14px', right: '14px' }}>
                    <p style={{ fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, color: '#5ee8c8', marginBottom: '4px' }}>{cat.count} listings</p>
                    <p style={{ fontSize: '15px', fontWeight: 800, color: 'white', letterSpacing: '-0.02em' }}>{cat.label}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* STATS STRIP */}
        <section style={{ marginBottom: '48px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
            {[
              { value: '24,180', label: 'Active Listings' },
              { value: '4,200', label: 'Verified Sellers' },
              { value: '12', label: 'Cities Covered' },
              { value: '100%', label: 'Free to Post' },
            ].map(stat => (
              <div key={stat.label}>
                <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 900, letterSpacing: '-0.04em', fontSize: '38px', color: '#161d1b', marginBottom: '4px' }}>{stat.value}</p>
                <p style={{ fontSize: '12px', color: '#6b7a76', fontWeight: 600 }}>{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* DISCOVERY SECTIONS */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '56px', marginBottom: '64px' }}>

          <section>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
              <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#161d1b', letterSpacing: '-0.02em' }}>Featured Used Cars</h2>
              <Link href={`/${locale}/motors/cars`} style={{ color: '#22d4a8', fontWeight: 700, fontSize: '14px', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}>View all <ChevronRight size={15} /></Link>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
              {usedCars.map((item, i) => <ListingCard key={i} item={item} locale={locale} />)}
            </div>
          </section>

          <section>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
              <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#161d1b', letterSpacing: '-0.02em' }}>Rental Cars</h2>
              <Link href={`/${locale}/motors/rental`} style={{ color: '#22d4a8', fontWeight: 700, fontSize: '14px', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}>View all <ChevronRight size={15} /></Link>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
              {rentalCars.map((item, i) => <ListingCard key={i} item={item} locale={locale} />)}
            </div>
          </section>

          <section>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
              <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#161d1b', letterSpacing: '-0.02em' }}>Motorcycles &amp; Scooters</h2>
              <Link href={`/${locale}/motors/motorcycles`} style={{ color: '#22d4a8', fontWeight: 700, fontSize: '14px', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}>View all <ChevronRight size={15} /></Link>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
              {motorcycles.map((item, i) => <ListingCard key={i} item={item} locale={locale} />)}
            </div>
          </section>

        </div>

        {/* SELL BANNER */}
        <section style={{ marginBottom: '64px' }}>
          <div style={{ borderRadius: '40px', background: 'linear-gradient(135deg, #161d1b, #2b3230)', padding: '48px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '24px', flexWrap: 'wrap' }}>
            <div>
              <h2 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 900, letterSpacing: '-0.04em', fontSize: '36px', color: 'white', marginBottom: '10px', lineHeight: 1.1 }}>Sell your car in minutes.</h2>
              <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.65)', maxWidth: '480px', lineHeight: 1.6 }}>Join Morocco's largest community of buyers and sellers. Get the best market value for your vehicle today.</p>
            </div>
            <Link href={`/${locale}/post-ad`} style={{ textDecoration: 'none' }}>
              <span style={{ display: 'inline-block', backgroundColor: '#22d4a8', color: 'white', padding: '16px 36px', borderRadius: '100px', fontSize: '14px', fontWeight: 800, cursor: 'pointer', whiteSpace: 'nowrap' }}>Post FREE Ad →</span>
            </Link>
          </div>
        </section>

      </div>
    </div>
  )
}
