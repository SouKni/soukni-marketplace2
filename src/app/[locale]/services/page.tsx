'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { Star, ChevronRight, MapPin, Search, Clock, ShieldCheck, MessageCircle, Diamond } from 'lucide-react'

const categories = [
  { label: 'Movers & Removals', count: '6,183', slug: 'movers', image: 'https://images.pexels.com/photos/4246120/pexels-photo-4246120.jpeg?auto=compress&w=600' },
  { label: 'Home Maintenance', count: '4,910', slug: 'home-maintenance', image: 'https://images.pexels.com/photos/8486972/pexels-photo-8486972.jpeg?auto=compress&w=600' },
  { label: 'Tutors & Classes', count: '996', slug: 'tutors', image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&w=600' },
  { label: 'Consultancy', count: '803', slug: 'consultants', image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&w=600' },
  { label: 'Wellness & Spa', count: '421', slug: 'wellness-spa', image: 'https://images.pexels.com/photos/3865560/pexels-photo-3865560.jpeg?auto=compress&w=600' },
  { label: 'Pro Services', count: '1,240', slug: 'pro-services', image: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&w=600' },
  { label: 'Beauty & Grooming', count: '1,580', slug: 'beauty-grooming', image: 'https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&w=600' },
  { label: 'Other Services', count: '752', slug: 'other-services', image: 'https://images.pexels.com/photos/1261731/pexels-photo-1261731.jpeg?auto=compress&w=600' },
]

const availableNow = [
  { name: 'Karim T.', service: 'Plumbing & Leakage', avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&w=200', responseTime: '~8 min', rating: 4.9 },
  { name: 'Salma R.', service: 'Home Cleaning', avatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&w=200', responseTime: '~12 min', rating: 5.0 },
  { name: 'Othmane D.', service: 'Electrician', avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&w=200', responseTime: '~5 min', rating: 4.8 },
  { name: 'Imane B.', service: 'Movers & Removals', avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&w=200', responseTime: '~15 min', rating: 4.7 },
  { name: 'Yassine K.', service: 'AC & Climate', avatar: 'https://images.pexels.com/photos/1300402/pexels-photo-1300402.jpeg?auto=compress&w=200', responseTime: '~10 min', rating: 4.9 },
]

const movers = [
  { title: 'Expert Home Relocation', provider: 'Hicham M.', avatar: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&w=200', rating: 5, reviews: 124, location: 'Casablanca', image: 'https://images.pexels.com/photos/4246120/pexels-photo-4246120.jpeg?auto=compress&w=600' },
  { title: 'Pro Team Removals', provider: 'Amal F.', avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&w=200', rating: 4.5, reviews: 89, location: 'Rabat', image: 'https://images.pexels.com/photos/4246119/pexels-photo-4246119.jpeg?auto=compress&w=600' },
  { title: 'Swift Move Solutions', provider: 'Bilal S.', avatar: 'https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg?auto=compress&w=200', rating: 4, reviews: 215, location: 'Marrakech', image: 'https://images.pexels.com/photos/4246118/pexels-photo-4246118.jpeg?auto=compress&w=600' },
  { title: 'Careful Hands Logistics', provider: 'Nour E.', avatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&w=200', rating: 5, reviews: 56, location: 'Tangier', image: 'https://images.pexels.com/photos/4246120/pexels-photo-4246120.jpeg?auto=compress&w=600' },
]

const maintenance = [
  { title: 'Master Plumbing & Leakage', provider: 'Karim T.', avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&w=200', rating: 4.9, reviews: 312, location: 'Casablanca Finance City', image: 'https://images.pexels.com/photos/8486972/pexels-photo-8486972.jpeg?auto=compress&w=600' },
  { title: 'Pristine Villa Cleaning', provider: 'Salma R.', avatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&w=200', rating: 5, reviews: 178, location: 'Marrakech Palmery', image: 'https://images.pexels.com/photos/4099467/pexels-photo-4099467.jpeg?auto=compress&w=600' },
  { title: 'Climate Control Experts', provider: 'Yassine K.', avatar: 'https://images.pexels.com/photos/1300402/pexels-photo-1300402.jpeg?auto=compress&w=200', rating: 4.8, reviews: 94, location: 'Rabat Agdal', image: 'https://images.pexels.com/photos/3810755/pexels-photo-3810755.jpeg?auto=compress&w=600' },
  { title: 'Smart Home Electricians', provider: 'Othmane D.', avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&w=200', rating: 4.7, reviews: 142, location: 'Tangier Marina', image: 'https://images.pexels.com/photos/8985454/pexels-photo-8985454.jpeg?auto=compress&w=600' },
]

function Stars({ rating, size = 13 }: { rating: number; size?: number }) {
  return (
    <div style={{ display: 'flex', gap: '1px' }}>
      {[1, 2, 3, 4, 5].map(i => <Star key={i} size={size} fill={i <= Math.floor(rating) ? '#f59e0b' : 'none'} color="#f59e0b" />)}
    </div>
  )
}

function AvailableCard({ p }: { p: typeof availableNow[0] }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{ flexShrink: 0, width: '220px', backgroundColor: 'white', borderRadius: '24px', border: '1px solid #f1f5f9', padding: '18px', boxShadow: hovered ? '0 12px 28px rgba(0,0,0,0.08)' : '0 1px 4px rgba(0,0,0,0.03)', transition: 'all 0.2s', cursor: 'pointer' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
        <div style={{ position: 'relative' }}>
          <img src={p.avatar} alt={p.name} style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', bottom: '-1px', right: '-1px', width: '11px', height: '11px', borderRadius: '50%', backgroundColor: '#22c55e', border: '2px solid white' }} />
        </div>
        <div>
          <p style={{ fontSize: '13px', fontWeight: 700, color: '#161d1b', fontFamily: 'Inter, sans-serif' }}>{p.name}</p>
          <p style={{ fontSize: '11px', color: '#6b7a76' }}>{p.service}</p>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: '#0d9c7a', fontWeight: 700 }}><Clock size={11} /> {p.responseTime}</span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '3px', fontSize: '11px', color: '#6b7a76', fontWeight: 600 }}><Star size={11} fill="#f59e0b" color="#f59e0b" /> {p.rating}</span>
      </div>
      <button style={{ width: '100%', backgroundColor: '#161d1b', color: 'white', border: 'none', padding: '10px', borderRadius: '100px', fontWeight: 700, fontSize: '12px', cursor: 'pointer' }}>Message</button>
    </div>
  )
}

function ProviderCard({ item }: { item: typeof movers[0] }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{ backgroundColor: 'white', border: '1px solid #f1f5f9', borderRadius: '32px', overflow: 'hidden', boxShadow: hovered ? '0 20px 40px rgba(0,0,0,0.1)' : '0 2px 8px rgba(0,0,0,0.04)', transition: 'all 0.3s' }}>
      <div style={{ position: 'relative', aspectRatio: '4/3', overflow: 'hidden' }}>
        <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s', transform: hovered ? 'scale(1.08)' : 'scale(1)' }} />
      </div>
      <div style={{ padding: '20px' }}>
        <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#161d1b', marginBottom: '12px', lineHeight: 1.3 }}>{item.title}</h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
          <img src={item.avatar} alt={item.provider} style={{ width: '26px', height: '26px', borderRadius: '50%', objectFit: 'cover' }} />
          <span style={{ fontSize: '12px', fontWeight: 600, color: '#3c4a46' }}>{item.provider}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '16px' }}>
          <Stars rating={item.rating} />
          <span style={{ fontSize: '11px', color: '#6b7a76' }}>({item.reviews})</span>
          <span style={{ fontSize: '11px', color: '#6b7a76', marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '3px' }}><MapPin size={11} />{item.location}</span>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button style={{ flex: 1, backgroundColor: '#25D366', color: 'white', border: 'none', padding: '10px', borderRadius: '100px', fontWeight: 700, fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
            <MessageCircle size={14} /> WhatsApp
          </button>
          <button style={{ flex: 1, backgroundColor: 'transparent', color: '#22d4a8', border: '1px solid #22d4a8', padding: '10px', borderRadius: '100px', fontWeight: 700, fontSize: '13px', cursor: 'pointer' }}>Chat</button>
        </div>
      </div>
    </div>
  )
}

export default function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = React.use(params)
  const [search, setSearch] = useState('')

  return (
    <div style={{ fontFamily: 'Inter, system-ui, sans-serif', backgroundColor: '#f4fbf8', minHeight: '100vh' }}>

      <section style={{ position: 'relative', height: '420px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        <img src="https://images.pexels.com/photos/4246120/pexels-photo-4246120.jpeg?auto=compress&w=1600" alt="SouKni Services"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(15,23,42,0.88), rgba(15,23,42,0.35))' }} />
        <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', padding: '0 20px', maxWidth: '760px', width: '100%' }}>
          <h1 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 900, letterSpacing: '-0.05em', fontSize: '52px', color: 'white', marginBottom: '12px', lineHeight: 1.05 }}>What do you need help with today?</h1>
          <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.82)', marginBottom: '28px' }}>9,200+ verified providers ready to respond across Morocco</p>

          <div style={{ display: 'flex', gap: '8px', backgroundColor: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.25)', borderRadius: '100px', padding: '8px 8px 8px 24px', maxWidth: '600px', margin: '0 auto' }}>
            <Search size={18} color="rgba(255,255,255,0.7)" style={{ flexShrink: 0, alignSelf: 'center' }} />
            <input value={search} onChange={e => setSearch(e.target.value)} type="text" placeholder="Plumber, mover, tutor, electrician..."
              style={{ flex: 1, backgroundColor: 'transparent', border: 'none', outline: 'none', fontSize: '15px', color: 'white', fontFamily: 'Inter, sans-serif', padding: '6px 8px' }} />
            <button style={{ backgroundColor: '#22d4a8', color: 'white', border: 'none', padding: '12px 26px', borderRadius: '100px', fontWeight: 700, fontSize: '13px', cursor: 'pointer', whiteSpace: 'nowrap' }}>Search</button>
          </div>
        </div>
      </section>

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>

        <section style={{ marginTop: '-48px', position: 'relative', zIndex: 20, marginBottom: '40px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
            {categories.map(cat => (
              <Link key={cat.slug} href={`/${locale}/services/${cat.slug}`} style={{ textDecoration: 'none' }}>
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

        <section style={{ backgroundColor: '#f5ede0', borderRadius: '32px', padding: '28px 28px 32px', marginBottom: '48px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '18px' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#22c55e' }} />
            <h2 style={{ fontSize: '15px', fontWeight: 800, color: '#161d1b' }}>Available Now</h2>
            <span style={{ fontSize: '12px', color: '#8a7a5c' }}>— providers ready to respond</span>
          </div>
          <div style={{ display: 'flex', gap: '14px', overflowX: 'auto', paddingBottom: '4px' }}>
            {availableNow.map((p, i) => <AvailableCard key={i} p={p} />)}
          </div>
        </section>

        <section style={{ marginBottom: '48px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
            {[
              { value: '9,200', label: 'Active Providers' },
              { value: '< 15 min', label: 'Avg. Response Time' },
              { value: '4.8', label: 'Avg. Rating' },
              { value: '12', label: 'Cities Covered' },
            ].map(stat => (
              <div key={stat.label}>
                <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 900, letterSpacing: '-0.04em', fontSize: '38px', color: '#161d1b', fontVariantNumeric: 'tabular-nums', marginBottom: '4px' }}>{stat.value}</p>
                <p style={{ fontSize: '12px', color: '#6b7a76', fontWeight: 600 }}>{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '56px', marginBottom: '64px' }}>
          <section>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
              <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#161d1b', letterSpacing: '-0.02em' }}>Movers &amp; Removals</h2>
              <Link href={`/${locale}/services/movers`} style={{ color: '#22d4a8', fontWeight: 700, fontSize: '14px', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}>View all <ChevronRight size={15} /></Link>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
              {movers.map((item, i) => <ProviderCard key={i} item={item} />)}
            </div>
          </section>

          <section>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
              <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#161d1b', letterSpacing: '-0.02em' }}>Home Maintenance</h2>
              <Link href={`/${locale}/services/home-maintenance`} style={{ color: '#22d4a8', fontWeight: 700, fontSize: '14px', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}>View all <ChevronRight size={15} /></Link>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
              {maintenance.map((item, i) => <ProviderCard key={i} item={item} />)}
            </div>
          </section>
        </div>

        <section style={{ marginBottom: '64px' }}>
          <div style={{ borderRadius: '40px', background: 'linear-gradient(135deg, #161d1b, #2b3230)', padding: '48px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '24px', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
              <div style={{ backgroundColor: 'rgba(34,212,168,0.15)', padding: '16px', borderRadius: '50%', flexShrink: 0 }}><ShieldCheck size={26} color="#5ee8c8" /></div>
              <div>
                <h3 style={{ fontWeight: 800, fontSize: '18px', color: 'white', marginBottom: '4px', letterSpacing: '-0.01em' }}>Every provider is identity-verified</h3>
                <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.65)' }}>Background-checked, rated by real customers, rebooked every day across Morocco.</p>
              </div>
            </div>
            <Link href={`/${locale}/post-ad`} style={{ textDecoration: 'none' }}>
              <span style={{ display: 'inline-block', backgroundColor: '#22d4a8', color: 'white', padding: '14px 30px', borderRadius: '100px', fontWeight: 800, fontSize: '13px', cursor: 'pointer', whiteSpace: 'nowrap' }}>Become a Provider</span>
            </Link>
          </div>
        </section>

      </div>
    </div>
  )
}
