'use client'
import React, { useState, use } from 'react'
import Link from 'next/link'
import { Heart, Star, MapPin, Search, Diamond, Shield } from 'lucide-react'

const categoryCards = [
  { label: 'Movers & Removals', count: '6,183', slug: 'movers', image: 'https://images.pexels.com/photos/4246120/pexels-photo-4246120.jpeg?auto=compress&w=600' },
  { label: 'Home Maintenance', count: '4,910', slug: 'home-maintenance', image: 'https://images.pexels.com/photos/8486972/pexels-photo-8486972.jpeg?auto=compress&w=600' },
  { label: 'Tutors & Classes', count: '996', slug: 'tutors', image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&w=600' },
  { label: 'Consultancy', count: '803', slug: 'consultants', image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&w=600' },
  { label: 'Other Services', count: '752', slug: 'other-services', image: 'https://images.pexels.com/photos/1261731/pexels-photo-1261731.jpeg?auto=compress&w=600' },
  { label: 'Wellness & Spa', count: '421', slug: 'wellness-spa', image: 'https://images.pexels.com/photos/3865560/pexels-photo-3865560.jpeg?auto=compress&w=600' },
  { label: 'Pro Services', count: '1,240', slug: 'pro-services', image: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&w=600' },
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
      {[1, 2, 3, 4, 5].map(i => (
        <Star key={i} size={13} fill={i <= Math.floor(rating) ? '#f59e0b' : 'none'} color="#f59e0b" />
      ))}
    </div>
  )
}

function DiamondBadge() {
  return (
    <span style={{ background: 'linear-gradient(135deg, #2dd4bf, #0f9b8e)', color: 'white', fontSize: '9px', fontWeight: 700, padding: '4px 10px', borderRadius: '100px', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'flex', alignItems: 'center', gap: '4px' }}>
      <Diamond size={10} /> Diamond Member
    </span>
  )
}

function MoverCard({ item }: { item: typeof movers[0] }) {
  const [saved, setSaved] = useState(false)
  return (
    <div style={{ backgroundColor: 'white', border: '1px solid #f1f5f9', borderRadius: '40px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', transition: 'all 0.3s' }}>
      <div style={{ position: 'relative', aspectRatio: '4/3', overflow: 'hidden' }}>
        <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', top: '14px', left: '14px' }}><DiamondBadge /></div>
        <button onClick={e => { e.stopPropagation(); setSaved(!saved) }} style={{ position: 'absolute', top: '14px', right: '14px', width: '34px', height: '34px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
          <Heart size={15} color={saved ? '#ef4444' : 'white'} fill={saved ? '#ef4444' : 'none'} />
        </button>
      </div>
      <div style={{ padding: '20px' }}>
        <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>{item.title}</h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '16px' }}>
          <Stars rating={item.rating} />
          <span style={{ fontSize: '11px', color: '#64748b' }}>({item.reviews})</span>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button style={{ flex: 1, backgroundColor: '#25D366', color: 'white', border: 'none', padding: '10px', borderRadius: '100px', fontWeight: 700, fontSize: '13px', cursor: 'pointer' }}>WhatsApp</button>
          <button style={{ flex: 1, backgroundColor: 'transparent', color: '#2dd4bf', border: '1px solid #2dd4bf', padding: '10px', borderRadius: '100px', fontWeight: 700, fontSize: '13px', cursor: 'pointer' }}>Chat</button>
        </div>
      </div>
    </div>
  )
}

function ServiceCard({ item }: { item: { title: string; location?: string; desc?: string; image: string } }) {
  return (
    <div style={{ backgroundColor: 'white', border: '1px solid #f1f5f9', borderRadius: '40px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', transition: 'all 0.3s' }}>
      <div style={{ position: 'relative', aspectRatio: '4/3', overflow: 'hidden' }}>
        <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', top: '14px', left: '14px' }}><DiamondBadge /></div>
      </div>
      <div style={{ padding: '20px' }}>
        <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>{item.title}</h3>
        {item.location && (
          <p style={{ fontSize: '11px', color: '#64748b', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <MapPin size={11} />{item.location}
          </p>
        )}
        {item.desc && <p style={{ fontSize: '12px', color: '#64748b', marginBottom: '14px', lineHeight: 1.5 }}>{item.desc}</p>}
        <div style={{ display: 'flex', gap: '8px' }}>
          <button style={{ flex: 1, backgroundColor: '#25D366', color: 'white', border: 'none', padding: '10px', borderRadius: '100px', fontWeight: 700, fontSize: '13px', cursor: 'pointer' }}>WhatsApp</button>
          <button style={{ flex: 1, backgroundColor: 'transparent', color: '#2dd4bf', border: '1px solid #2dd4bf', padding: '10px', borderRadius: '100px', fontWeight: 700, fontSize: '13px', cursor: 'pointer' }}>Chat</button>
        </div>
      </div>
    </div>
  )
}

function SectionHeader({ label, title, href }: { label: string; title: string; href: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
      <div>
        <p style={{ fontSize: '11px', fontWeight: 700, color: '#2dd4bf', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '4px' }}>{label}</p>
        <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em' }}>{title}</h2>
      </div>
      <Link href={href} style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '13px', fontWeight: 600, color: '#2dd4bf', textDecoration: 'none' }}>
        View all →
      </Link>
    </div>
  )
}

// Inner component that uses hooks — receives locale as a plain string prop
function CommunityInner({ locale }: { locale: string }) {
  const [search, setSearch] = useState('')

  return (
    <div style={{ fontFamily: 'Inter, system-ui, sans-serif', backgroundColor: '#f4fbf8', minHeight: '100vh' }}>

      {/* HERO */}
      <div style={{ position: 'relative', height: '440px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 16px' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(15,23,42,0.5), rgba(15,23,42,0.5)), url(https://images.pexels.com/photos/4246120/pexels-photo-4246120.jpeg?auto=compress&w=1600)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div style={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: '720px', textAlign: 'center' }}>
          <h1 style={{ fontSize: '48px', fontWeight: 800, color: 'white', marginBottom: '8px', textShadow: '0 2px 20px rgba(0,0,0,0.3)', letterSpacing: '-0.02em', lineHeight: 1.1 }}>SouKni Services</h1>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '16px', marginBottom: '28px' }}>Trusted professionals for every need across Morocco</p>
          <div style={{ background: 'rgba(255,255,255,0.72)', backdropFilter: 'blur(16px)', borderRadius: '100px', padding: '6px 6px 6px 24px', display: 'flex', alignItems: 'center', boxShadow: '0 20px 60px rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.35)' }}>
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              type="text"
              placeholder="Search for any service..."
              style={{ flex: 1, backgroundColor: 'transparent', border: 'none', outline: 'none', padding: '10px 16px', fontSize: '15px', fontFamily: 'Inter, sans-serif', color: '#0f172a' }}
            />
            <button style={{ backgroundColor: '#2dd4bf', color: 'white', border: 'none', padding: '12px 28px', borderRadius: '100px', fontWeight: 700, fontSize: '13px', cursor: 'pointer' }}>
              <Search size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* CATEGORY GRID */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px', marginTop: '-48px', position: 'relative', zIndex: 20 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
          {categoryCards.map(cat => (
            <Link key={cat.slug} href={`/${locale}/community/${cat.slug}`} style={{ textDecoration: 'none' }}>
              <div style={{ position: 'relative', height: '160px', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 8px 32px rgba(0,0,0,0.1)', cursor: 'pointer' }}>
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
      </div>

      {/* TRUST BANNER */}
      <div style={{ maxWidth: '1280px', margin: '32px auto 0', padding: '0 24px' }}>
        <div style={{ backgroundColor: 'white', borderRadius: '24px', border: '1px solid #f1f5f9', padding: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ backgroundColor: 'rgba(45,212,191,0.1)', padding: '16px', borderRadius: '50%', flexShrink: 0 }}>
              <Shield size={28} color="#2dd4bf" />
            </div>
            <div>
              <h3 style={{ fontWeight: 700, fontSize: '17px', color: '#0f172a', marginBottom: '4px' }}>Are you a SouKni Diamond member yet?</h3>
              <p style={{ fontSize: '13px', color: '#64748b' }}>Get more visibility · Enhance your credibility in the Moroccan marketplace</p>
            </div>
          </div>
          <button style={{ border: '2px solid #e2e8f0', padding: '12px 32px', borderRadius: '100px', fontWeight: 700, color: '#0f172a', backgroundColor: 'transparent', cursor: 'pointer', fontSize: '13px', whiteSpace: 'nowrap' }}>
            Get Started
          </button>
        </div>
      </div>

      {/* DISCOVERY SECTIONS */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '48px 24px 80px', display: 'flex', flexDirection: 'column', gap: '64px' }}>

        {/* Movers */}
        <div>
          <SectionHeader label="Top Rated" title="Movers & Removals" href={`/${locale}/community/movers`} />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
            {movers.map((item, i) => <MoverCard key={i} item={item} />)}
          </div>
        </div>

        {/* Home Maintenance */}
        <div>
          <SectionHeader label="Trusted Professionals" title="Home Maintenance" href={`/${locale}/community/home-maintenance`} />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
            {maintenance.map((item, i) => <ServiceCard key={i} item={item} />)}
          </div>
        </div>

        {/* Consultants */}
        <div>
          <SectionHeader label="Expert Advisors" title="Consultancy Services" href={`/${locale}/community/consultants`} />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
            {consultants.map((item, i) => <ServiceCard key={i} item={item} />)}
          </div>
        </div>

      </div>

      {/* FOOTER */}
      <footer style={{ background: '#7A7A7A', color: 'rgba(255,255,255,0.6)', paddingTop: '64px', paddingBottom: '32px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 40px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '48px', marginBottom: '64px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                <div style={{ width: '40px', height: '40px', background: '#006b5f', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ color: 'white', fontWeight: 700, fontSize: '20px' }}>S</span>
                </div>
                <span style={{ fontSize: '24px', fontWeight: 700, color: 'white' }}>SouKni</span>
              </div>
              <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.8)', fontStyle: 'italic', marginBottom: '8px' }}>The Market in your Pocket</p>
              <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.6 }}>The leading premium marketplace in Morocco.</p>
            </div>
            {[
              { title: 'Marketplace', links: ['Motors', 'Property', 'Electronics', 'The Vault'] },
              { title: 'Support', links: ['About Us', 'Help Center', 'Safety Tips', 'Privacy Policy'] },
              { title: 'Community', links: ['Movers', 'Home Maintenance', 'Tutors', 'Consultancy'] },
            ].map(col => (
              <div key={col.title}>
                <h4 style={{ color: 'white', fontWeight: 700, marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '14px' }}>{col.title}</h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {col.links.map(l => <li key={l}><a href="#" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: '14px' }}>{l}</a></li>)}
                </ul>
              </div>
            ))}
          </div>
          <div style={{ paddingTop: '32px', borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.4)' }}>© 2026 SouKni - soukni.com</p>
            <div style={{ display: 'flex', gap: '32px' }}>
              {['Terms', 'Privacy', 'Cookies'].map(l => <a key={l} href="#" style={{ color: 'rgba(255,255,255,0.4)', fontSize: '14px', textDecoration: 'none' }}>{l}</a>)}
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

// Outer page component — unwraps params then renders inner
export default function CommunityPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = use(params)
  return <CommunityInner locale={locale} />
}
