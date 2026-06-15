'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Heart, Star, ChevronRight, MapPin } from 'lucide-react'
import React from 'react'

const categoryCards = [
  { icon: '🚛', label: 'Movers & Removals', count: '6,183', slug: 'services' },
  { icon: '🔧', label: 'Home Maintenance', count: '4,910', slug: 'home-maintenance' },
  { icon: '📚', label: 'Tutors & Classes', count: '996', slug: 'tutors' },
  { icon: '💼', label: 'Consultancy', count: '803', slug: 'consultants' },
  { icon: '🎉', label: 'Other Services', count: '752', slug: 'other-services' },
  { icon: '🧘', label: 'Wellness & Spa', count: '421', slug: 'other-services' },
]

const movers = [
  { title: 'Expert Home Relocation', rating: 5, reviews: 124, image: 'https://images.pexels.com/photos/4246120/pexels-photo-4246120.jpeg?auto=compress&w=600' },
  { title: 'Pro Team Removals', rating: 4.5, reviews: 89, image: 'https://images.pexels.com/photos/4246119/pexels-photo-4246119.jpeg?auto=compress&w=600' },
  { title: 'Swift Move Solutions', rating: 4, reviews: 215, image: 'https://images.pexels.com/photos/4246118/pexels-photo-4246118.jpeg?auto=compress&w=600' },
  { title: 'Careful Hands Logistics', rating: 5, reviews: 56, image: 'https://images.pexels.com/photos/4246120/pexels-photo-4246120.jpeg?auto=compress&w=600' },
]

const maintenance = [
  { title: 'Master Plumbing & Leakage', location: 'Casablanca Finance City', image: 'https://images.pexels.com/photos/8486972/pexels-photo-8486972.jpeg?auto=compress&w=600' },
  { title: 'Pristine Villa Cleaning', location: 'Marrakech Palmery', image: 'https://images.pexels.com/photos/4099467/pexels-photo-4099467.jpeg?auto=compress&w=600' },
  { title: 'Climate Control Experts', location: 'Rabat Agdal', image: 'https://images.pexels.com/photos/3810755/pexels-photo-3810755.jpeg?auto=compress&w=600' },
  { title: 'Smart Home Electricians', location: 'Tangier Marina', image: 'https://images.pexels.com/photos/8985454/pexels-photo-8985454.jpeg?auto=compress&w=600' },
]

const consultants = [
  { title: 'Elite Business Advisors', desc: 'Strategic consulting for Casablanca start-ups and SMEs.', image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&w=600' },
  { title: 'Legal Compliance Experts', desc: 'Professional legal and corporate advisory services in Rabat.', image: 'https://images.pexels.com/photos/5668858/pexels-photo-5668858.jpeg?auto=compress&w=600' },
  { title: 'Wealth Management Hub', desc: 'Personalized financial planning and investment consulting.', image: 'https://images.pexels.com/photos/3760067/pexels-photo-3760067.jpeg?auto=compress&w=600' },
  { title: 'Digital Transformation Lab', desc: 'Helping Moroccan businesses transition to the digital era.', image: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&w=600' },
]

function Stars({ rating }: { rating: number }) {
  return (
    <div style={{ display: 'flex', gap: '2px' }}>
      {[1,2,3,4,5].map(i => <Star key={i} size={13} fill={i <= Math.floor(rating) ? '#f59e0b' : 'none'} color="#f59e0b" />)}
    </div>
  )
}

function DiamondBadge() {
  return <span style={{ background: 'linear-gradient(135deg, #2dd4bf, #0d9488)', color: 'white', fontSize: '9px', fontWeight: 700, padding: '4px 10px', borderRadius: '100px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>💎 Diamond Member</span>
}

function MoverCard({ item }: { item: typeof movers[0] }) {
  const [saved, setSaved] = useState(false)
  const [hovered, setHovered] = useState(false)
  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{ backgroundColor: 'white', border: '1px solid #f1f5f9', borderRadius: '28px', overflow: 'hidden', boxShadow: hovered ? '0 20px 40px rgba(0,0,0,0.1)' : '0 2px 8px rgba(0,0,0,0.04)', transition: 'all 0.3s' }}>
      <div style={{ position: 'relative', height: '200px', overflow: 'hidden' }}>
        <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s', transform: hovered ? 'scale(1.06)' : 'scale(1)' }} />
        <div style={{ position: 'absolute', top: '12px', left: '12px' }}><DiamondBadge /></div>
        <button onClick={e => { e.stopPropagation(); setSaved(!saved) }} style={{ position: 'absolute', top: '12px', right: '12px', backgroundColor: 'rgba(255,255,255,0.9)', border: 'none', width: '34px', height: '34px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px' }}>{saved ? '❤️' : '🤍'}</button>
      </div>
      <div style={{ padding: '18px' }}>
        <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a', marginBottom: '6px' }}>{item.title}</h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '14px' }}>
          <Stars rating={item.rating} />
          <span style={{ fontSize: '11px', color: '#64748b' }}>({item.reviews})</span>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button style={{ flex: 1, backgroundColor: '#22c55e', color: 'white', border: 'none', padding: '10px', borderRadius: '10px', fontWeight: 700, fontSize: '13px', cursor: 'pointer' }}>📱 WhatsApp</button>
          <button style={{ flex: 1, backgroundColor: 'transparent', color: '#2dd4bf', border: '1px solid #2dd4bf', padding: '10px', borderRadius: '10px', fontWeight: 700, fontSize: '13px', cursor: 'pointer' }}>💬 Chat</button>
        </div>
      </div>
    </div>
  )
}

function ServiceCard({ item }: { item: { title: string; location?: string; desc?: string; image: string } }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{ backgroundColor: 'white', border: '1px solid #f1f5f9', borderRadius: '28px', overflow: 'hidden', boxShadow: hovered ? '0 20px 40px rgba(0,0,0,0.1)' : '0 2px 8px rgba(0,0,0,0.04)', transition: 'all 0.3s' }}>
      <div style={{ position: 'relative', height: '200px', overflow: 'hidden' }}>
        <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s', transform: hovered ? 'scale(1.06)' : 'scale(1)' }} />
        <div style={{ position: 'absolute', top: '12px', left: '12px' }}><DiamondBadge /></div>
      </div>
      <div style={{ padding: '18px' }}>
        <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a', marginBottom: '4px' }}>{item.title}</h3>
        {item.location && <p style={{ fontSize: '11px', color: '#64748b', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '3px' }}><MapPin size={11} />{item.location}</p>}
        {item.desc && <p style={{ fontSize: '12px', color: '#64748b', marginBottom: '12px', lineHeight: 1.5 }}>{item.desc}</p>}
        <div style={{ display: 'flex', gap: '8px' }}>
          <button style={{ flex: 1, backgroundColor: '#22c55e', color: 'white', border: 'none', padding: '10px', borderRadius: '10px', fontWeight: 700, fontSize: '13px', cursor: 'pointer' }}>📱 WhatsApp</button>
          <button style={{ flex: 1, backgroundColor: 'transparent', color: '#2dd4bf', border: '1px solid #2dd4bf', padding: '10px', borderRadius: '10px', fontWeight: 700, fontSize: '13px', cursor: 'pointer' }}>💬 Chat</button>
        </div>
      </div>
    </div>
  )
}

export default function CommunityPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = React.use(params)
  const [search, setSearch] = useState('')

  return (
    <div style={{ fontFamily: 'Inter, system-ui, sans-serif', backgroundColor: '#f4fbf8', minHeight: '100vh' }}>

      {/* HERO */}
      <section style={{ position: 'relative', height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        <img src="https://images.pexels.com/photos/4246120/pexels-photo-4246120.jpeg?auto=compress&w=1400" alt="Community" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(15,23,42,0.7), rgba(0,0,0,0.2))' }} />
        <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', padding: '0 20px', maxWidth: '700px' }}>
          <h1 style={{ fontSize: '44px', fontWeight: 900, color: 'white', letterSpacing: '-0.02em', marginBottom: '12px', lineHeight: 1.1 }}>SouKni Community Services</h1>
          <p style={{ fontSize: '17px', color: 'rgba(255,255,255,0.85)', marginBottom: '24px' }}>Find trusted professionals across Morocco</p>
          <div style={{ display: 'flex', gap: '8px', backgroundColor: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(16px)', borderRadius: '100px', padding: '6px 6px 6px 24px', border: '1px solid rgba(255,255,255,0.3)' }}>
            <input type="text" placeholder="Search services..." value={search} onChange={e => setSearch(e.target.value)}
              style={{ flex: 1, backgroundColor: 'transparent', border: 'none', outline: 'none', padding: '10px 0', fontSize: '15px', color: 'white', fontFamily: 'Inter, sans-serif' }} />
            <button style={{ backgroundColor: '#2dd4bf', color: '#00201c', border: 'none', padding: '12px 28px', borderRadius: '100px', fontWeight: 700, fontSize: '13px', cursor: 'pointer' }}>Search</button>
          </div>
        </div>
      </section>

      {/* CATEGORY CARDS — all clickable */}
      <section style={{ maxWidth: '1280px', margin: '-40px auto 0', padding: '0 24px', position: 'relative', zIndex: 20 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '14px' }}>
          {categoryCards.map(cat => (
            <Link key={cat.label} href={`/${locale}/community/${cat.slug}`} style={{ textDecoration: 'none' }}>
              <div style={{ backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: '20px', padding: '20px 12px', textAlign: 'center', cursor: 'pointer', transition: 'all 0.2s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = '0 8px 24px rgba(45,212,191,0.15)'; (e.currentTarget as HTMLDivElement).style.borderColor = '#2dd4bf' }}
                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = 'none'; (e.currentTarget as HTMLDivElement).style.borderColor = '#e2e8f0' }}
              >
                <div style={{ fontSize: '28px', marginBottom: '8px' }}>{cat.icon}</div>
                <p style={{ fontSize: '12px', fontWeight: 700, color: '#0f172a', marginBottom: '4px' }}>{cat.label}</p>
                <p style={{ fontSize: '11px', color: '#2dd4bf', fontWeight: 600 }}>{cat.count}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '56px 24px 80px' }}>

        {/* DIAMOND BANNER */}
        <div style={{ background: 'linear-gradient(135deg, #006b5f 0%, #2dd4bf 100%)', borderRadius: '32px', padding: '40px 48px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '56px' }}>
          <div>
            <h2 style={{ fontSize: '28px', fontWeight: 800, color: 'white', marginBottom: '10px', letterSpacing: '-0.02em' }}>Become a SouKni Diamond Member</h2>
            <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.85)', lineHeight: 1.6 }}>Boost your visibility, earn trust, and get a verified badge that stands out.</p>
          </div>
          <button style={{ backgroundColor: 'white', color: '#006b5f', border: 'none', padding: '14px 32px', borderRadius: '100px', fontWeight: 700, fontSize: '15px', cursor: 'pointer', whiteSpace: 'nowrap' }}>Get Verified Now</button>
        </div>

        {/* MOVERS */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
          <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#0f172a' }}>Featured Movers & Removals</h2>
          <Link href={`/${locale}/community/services`} style={{ color: '#2dd4bf', fontWeight: 700, textDecoration: 'none', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '4px' }}>View All <ChevronRight size={15} /></Link>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '56px' }}>
          {movers.map((item, i) => <MoverCard key={i} item={item} />)}
        </div>

        {/* HOME MAINTENANCE */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
          <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#0f172a' }}>Premium Home Maintenance</h2>
          <Link href={`/${locale}/community/home-maintenance`} style={{ color: '#2dd4bf', fontWeight: 700, textDecoration: 'none', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '4px' }}>View All <ChevronRight size={15} /></Link>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '56px' }}>
          {maintenance.map((item, i) => <ServiceCard key={i} item={item} />)}
        </div>

        {/* CONSULTANTS */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
          <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#0f172a' }}>Expert Consultants & Firms</h2>
          <Link href={`/${locale}/community/consultants`} style={{ color: '#2dd4bf', fontWeight: 700, textDecoration: 'none', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '4px' }}>View All <ChevronRight size={15} /></Link>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
          {consultants.map((item, i) => <ServiceCard key={i} item={item} />)}
        </div>
      </div>
    </div>
  )
}
