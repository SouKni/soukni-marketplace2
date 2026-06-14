'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Heart, ChevronLeft, ChevronRight, Mail } from 'lucide-react'
const navLinks = ['Motors', 'Property', 'Jobs', 'Mobiles & Tablettes', 'Services']
const searchTabs = ['SALE', 'RENT', 'NEW CONSTRUCTIONS', 'COMMERCIAL & OFFICES', 'VACATION HOMES', 'LAND']
const categories = [
  { label: 'Apartment for Sale', image: 'https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg?auto=compress&w=600' },
  { label: 'Villa for Sale', image: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&w=600' },
  { label: 'Commercial for Sale', image: 'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&w=600' },
  { label: 'Land for Sale', image: 'https://images.pexels.com/photos/440731/pexels-photo-440731.jpeg?auto=compress&w=600' },
]
const vacationProps = [
  { title: 'Agadir Beachfront Villa', city: 'Agadir', price: '3,500', unit: '/ night', beds: 4, baths: 3, feature: 'Infinity Pool', image: 'https://images.pexels.com/photos/2581922/pexels-photo-2581922.jpeg?auto=compress&w=600' },
  { title: 'Traditional Blue House', city: 'Chefchaouen', price: '1,200', unit: '/ night', beds: 3, baths: 2, feature: 'Cinematic View', image: 'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&w=600' },
  { title: 'Luxury Desert Lodge', city: 'Merzouga', price: '4,200', unit: '/ night', beds: 2, baths: 1, feature: 'Sahara Dunes', image: 'https://images.pexels.com/photos/440731/pexels-photo-440731.jpeg?auto=compress&w=600' },
  { title: 'Atlas Mountain Chalet', city: 'Imlil', price: '2,800', unit: '/ night', beds: 5, baths: 4, feature: 'Snowy Peaks', image: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&w=600' },
]
const featuredProps = [
  { title: 'Modern Villa with Pool in Anfa Superior', price: '4,500,000', beds: 4, baths: 3, area: 320, featured: true, image: 'https://images.pexels.com/photos/2581922/pexels-photo-2581922.jpeg?auto=compress&w=600' },
  { title: 'Chic Apartment Hivernage district', price: '1,850,000', beds: 2, baths: 2, area: 110, image: 'https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg?auto=compress&w=600' },
  { title: 'Restored Riad in Marrakech Medina', price: '3,200,000', beds: 5, baths: 4, area: 240, image: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&w=600' },
  { title: 'Modern Commercial Space Hay Riad', price: '5,500,000', beds: 0, baths: 2, area: 450, image: 'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&w=600' },
]
const rentalProps = [
  { title: 'Luxury Modern Apartment', city: 'Anfa, Casablanca', price: '12,500', unit: '/ month', beds: 3, baths: 2, area: 140, image: 'https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg?auto=compress&w=600' },
  { title: 'Contemporary Villa with Pool', city: 'Palmeraie, Marrakech', price: '48,000', unit: '/ month', beds: 5, baths: 4, area: 450, image: 'https://images.pexels.com/photos/2581922/pexels-photo-2581922.jpeg?auto=compress&w=600' },
  { title: 'Premium Ocean-View Penthouse', city: 'Malabata, Tangier', price: '22,000', unit: '/ month', beds: 4, baths: 3, area: 210, image: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&w=600' },
  { title: 'Renovated Traditional Riad', city: 'Medina, Fes', price: '15,000', unit: '/ month', beds: 6, baths: 6, area: 320, image: 'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&w=600' },
]
const neighborhoods = [
  { name: 'Anfa, Casablanca', desc: 'Luxury living in the heart of Casa.', image: 'https://images.pexels.com/photos/2581922/pexels-photo-2581922.jpeg?auto=compress&w=700' },
  { name: 'Founty, Agadir', image: 'https://images.pexels.com/photos/440731/pexels-photo-440731.jpeg?auto=compress&w=700' },
  { name: 'Agdal, Rabat', image: 'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&w=700' },
  { name: 'Palmeraie, Marrakech', image: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&w=700' },
  { name: 'Tangier City Center', image: 'https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg?auto=compress&w=700' },
]
const testimonials = [
  { name: 'Yassine B.', text: '"Found our dream apartment in Casablanca in just 3 days. The filters are incredibly precise!"' },
  { name: 'Mariam K.', text: '"Selling through SouKni was seamless. High quality leads and professional interface."' },
  { name: 'Hassan M.', text: '"Best real estate portal in the Moroccan market. Very easy to use on mobile."' },
]
function PropCard({ prop, type = 'sale' }: { prop: any; type?: string }) {
  const [saved, setSaved] = useState(false)
  const [hovered, setHovered] = useState(false)
  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} style={{ backgroundColor: 'white', borderRadius: '16px', overflow: 'hidden', border: '1px solid #f3f4f6', boxShadow: hovered ? '0 20px 40px rgba(0,0,0,0.12)' : '0 1px 4px rgba(0,0,0,0.04)', transition: 'all 0.3s', cursor: 'pointer', transform: hovered ? 'translateY(-2px)' : 'translateY(0)' }}>
      <div style={{ position: 'relative', height: '200px', overflow: 'hidden' }}>
        <img src={prop.image} alt={prop.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s', transform: hovered ? 'scale(1.05)' : 'scale(1)' }} />
        {prop.featured && <div style={{ position: 'absolute', top: '10px', left: '10px', backgroundColor: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(8px)', padding: '3px 10px', borderRadius: '6px', fontSize: '10px', fontWeight: 700, color: '#374151', textTransform: 'uppercase', fontFamily: 'Inter, sans-serif' }}>Featured</div>}
        {(type === 'rental' || type === 'vacation') && <div style={{ position: 'absolute', top: '10px', left: '10px', backgroundColor: '#2dd4bf', color: 'white', padding: '3px 10px', borderRadius: '6px', fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', fontFamily: 'Inter, sans-serif' }}>Verified</div>}
        <button onClick={e => { e.stopPropagation(); setSaved(!saved) }} style={{ position: 'absolute', top: '8px', right: '8px', width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.85)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Heart size={14} fill={saved ? '#ef4444' : 'none'} color={saved ? '#ef4444' : '#6b7280'} />
        </button>
      </div>
      <div style={{ padding: '14px' }}>
        <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#111827', marginBottom: '3px', fontFamily: 'Inter, sans-serif' }}>{prop.price} MAD {prop.unit && <span style={{ fontSize: '11px', fontWeight: 400, color: '#9ca3af' }}>{prop.unit}</span>}</h3>
        <p style={{ fontSize: '12px', fontWeight: 600, color: '#1f2937', marginBottom: '3px', fontFamily: 'Inter, sans-serif', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{prop.title}</p>
        {prop.city && <p style={{ fontSize: '11px', color: '#9ca3af', marginBottom: '10px', fontFamily: 'Inter, sans-serif' }}>{prop.city}</p>}
        <div style={{ display: 'flex', gap: '10px', fontSize: '11px', color: '#9ca3af', marginBottom: '12px', fontFamily: 'Inter, sans-serif' }}>
          {prop.beds !== undefined && <span><strong style={{ color: '#1f2937' }}>{prop.beds}</strong> Beds</span>}
          {prop.baths !== undefined && <span><strong style={{ color: '#1f2937' }}>{prop.baths}</strong> Baths</span>}
          {prop.area && <span><strong style={{ color: '#1f2937' }}>{prop.area}</strong> m²</span>}
          {prop.feature && <span><strong style={{ color: '#1f2937' }}>{prop.feature}</strong></span>}
        </div>
        <div style={{ display: 'flex', gap: '8px', paddingTop: '10px', borderTop: '1px solid #f3f4f6' }}>
          <button style={{ flex: 1, backgroundColor: type === 'sale' ? '#f0fdfa' : '#2dd4bf', color: type === 'sale' ? '#0f766e' : 'white', border: 'none', padding: '8px', borderRadius: '8px', fontSize: '12px', fontWeight: 700, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>💬 WhatsApp</button>
          <button style={{ padding: '8px 10px', border: '1px solid #d1fae5', backgroundColor: 'transparent', color: '#0f766e', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}><Mail size={14} /></button>
        </div>
      </div>
    </div>
  )
}
export default function RealEstatePage() {
  const [activeTab, setActiveTab] = useState('SALE')
  const [activeNav, setActiveNav] = useState('Property')
  return (
    <div style={{ fontFamily: 'Inter, system-ui, sans-serif', backgroundColor: 'white', color: '#374151' }}>
      <header style={{ position: 'sticky', top: 0, zIndex: 50, backgroundColor: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '12px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
            <Link href="/en" style={{ textDecoration: 'none', fontSize: '22px', fontWeight: 900, color: '#0f766e', letterSpacing: '-0.03em', fontFamily: 'Inter, sans-serif' }}>SouKni</Link>
            <nav style={{ display: 'flex', gap: '20px' }}>
              {navLinks.map(item => <a key={item} href="#" onClick={e => { e.preventDefault(); setActiveNav(item) }} style={{ fontSize: '13px', fontWeight: 500, color: activeNav === item ? '#2dd4bf' : '#4b5563', textDecoration: 'none', borderBottom: activeNav === item ? '2px solid #2dd4bf' : 'none', paddingBottom: activeNav === item ? '2px' : '0', fontFamily: 'Inter, sans-serif' }}>{item}</a>)}
            </nav>
          </div>
          <button style={{ backgroundColor: '#2dd4bf', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '8px', fontSize: '13px', fontWeight: 700, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>Place Your FREE Ad</button>
        </div>
      </header>
      <section style={{ position: 'relative', height: '560px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        <img src="https://images.pexels.com/photos/2581922/pexels-photo-2581922.jpeg?auto=compress&w=1600" alt="Hero" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.38) 0%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0.55) 100%)' }} />
        <div style={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: '900px', padding: '0 24px' }}>
          <h1 style={{ fontSize: '42px', fontWeight: 800, color: '#2dd4bf', textAlign: 'center', marginBottom: '24px', fontFamily: 'Inter, sans-serif' }}>Join The SouKni Family</h1>
          <div style={{ backgroundColor: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(12px)', padding: '12px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.2)' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '12px', padding: '4px' }}>
              {searchTabs.map(tab => <button key={tab} onClick={() => setActiveTab(tab)} style={{ backgroundColor: activeTab === tab ? 'white' : 'transparent', color: activeTab === tab ? '#111827' : 'white', border: 'none', padding: '8px 16px', borderRadius: '10px', fontSize: '11px', fontWeight: 700, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>{tab}</button>)}
            </div>
            <div style={{ backgroundColor: 'white', padding: '20px 24px', borderRadius: '12px', boxShadow: '0 8px 32px rgba(0,0,0,0.15)' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '12px', alignItems: 'end' }}>
                {[{ label: 'City', placeholder: 'Select City' }, { label: 'Neighborhood', placeholder: 'Select' }, { label: 'Property Type', placeholder: 'All Types' }, { label: 'Price Range', placeholder: 'Any Price' }, { label: 'Rooms', placeholder: 'Any' }, { label: 'Filters', placeholder: 'More Filters' }].map((f, i) => (
                  <div key={f.label} style={{ borderLeft: i > 0 ? '1px solid #e5e7eb' : 'none', paddingLeft: i > 0 ? '12px' : '0' }}>
                    <label style={{ display: 'block', fontSize: '9px', fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '4px', fontFamily: 'Inter, sans-serif' }}>{f.label}</label>
                    <select style={{ width: '100%', border: 'none', fontSize: '12px', fontWeight: 600, color: '#111827', outline: 'none', backgroundColor: 'transparent', fontFamily: 'Inter, sans-serif' }}><option>{f.placeholder}</option></select>
                  </div>
                ))}
                <button style={{ backgroundColor: '#2dd4bf', color: 'white', border: 'none', height: '40px', borderRadius: '8px', fontWeight: 700, fontSize: '13px', cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>Search</button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '40px 32px 0', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ backgroundColor: 'white', border: '1px solid #f3f4f6', borderRadius: '16px', padding: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ backgroundColor: '#f0fdfa', padding: '14px', borderRadius: '10px', fontSize: '24px' }}>✓</div>
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#111827', marginBottom: '3px', fontFamily: 'Inter, sans-serif' }}>Know Your Property Value Instantly with SouKni <span style={{ color: '#2dd4bf' }}>Estimation</span></h3>
              <p style={{ fontSize: '13px', color: '#9ca3af', fontFamily: 'Inter, sans-serif' }}>Generate a report with reliable property valuations and insights.</p>
            </div>
          </div>
          <button style={{ backgroundColor: '#2dd4bf', color: 'white', border: 'none', padding: '11px 24px', borderRadius: '10px', fontWeight: 700, fontSize: '12px', cursor: 'pointer', whiteSpace: 'nowrap', fontFamily: 'Inter, sans-serif' }}>Get Your SouKni Estimation</button>
        </div>
        <div style={{ backgroundColor: '#f4fbf8', border: '1px solid #d1fae5', borderRadius: '16px', padding: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '20px' }}>
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#111827', marginBottom: '3px', fontFamily: 'Inter, sans-serif' }}>Looking to sell or rent your home? Let Soukni Immo Pro help you!</h3>
            <p style={{ fontSize: '13px', color: '#9ca3af', fontFamily: 'Inter, sans-serif' }}>Reach more buyers or renters through an expert agent.</p>
          </div>
          <button style={{ backgroundColor: 'white', color: '#0f766e', border: '1px solid #d1fae5', padding: '11px 24px', borderRadius: '10px', fontWeight: 700, fontSize: '12px', cursor: 'pointer', whiteSpace: 'nowrap', fontFamily: 'Inter, sans-serif' }}>Get started now</button>
        </div>
      </section>
      <section style={{ maxWidth: '1280px', margin: '24px auto', padding: '0 32px' }}>
        <div style={{ position: 'relative', borderRadius: '20px', overflow: 'hidden', height: '260px' }}>
          <img src="https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&w=1400" alt="Immo Pro" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(19,78,74,0.65), transparent)', display: 'flex', alignItems: 'center', padding: '40px' }}>
            <div style={{ maxWidth: '380px' }}>
              <h2 style={{ fontSize: '26px', fontWeight: 800, color: 'white', marginBottom: '10px', fontFamily: 'Inter, sans-serif' }}>Are you a Real Estate Professional?</h2>
              <p style={{ fontSize: '14px', color: 'rgba(240,253,250,0.9)', marginBottom: '18px', fontFamily: 'Inter, sans-serif' }}>Discover SouKni Pro — The #1 tool for agents and developers in Morocco.</p>
              <button style={{ backgroundColor: 'white', color: '#134e4a', border: 'none', padding: '11px 24px', borderRadius: '10px', fontWeight: 700, fontSize: '13px', cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>Join Immo Pro</button>
            </div>
          </div>
        </div>
      </section>
      <section style={{ maxWidth: '1280px', margin: '0 auto 40px', padding: '0 32px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#111827', fontFamily: 'Inter, sans-serif' }}>Popular Categories</h2>
          <div style={{ display: 'flex', gap: '8px' }}>
            {[ChevronLeft, ChevronRight].map((Icon, i) => <button key={i} style={{ width: '34px', height: '34px', borderRadius: '50%', border: '1px solid #e5e7eb', backgroundColor: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon size={15} color="#374151" /></button>)}
          </div>
        </div>
        <div style={{ display: 'flex', gap: '16px', overflowX: 'auto', paddingBottom: '8px' }}>
          {categories.map(cat => <div key={cat.label} style={{ minWidth: '240px', cursor: 'pointer' }}><div style={{ position: 'relative', height: '170px', borderRadius: '14px', overflow: 'hidden' }}><img src={cat.image} alt={cat.label} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /><div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.22)' }} /><div style={{ position: 'absolute', bottom: '12px', left: '12px', color: 'white', fontWeight: 700, fontSize: '15px', fontFamily: 'Inter, sans-serif' }}>{cat.label}</div></div></div>)}
        </div>
      </section>
      <section style={{ maxWidth: '1280px', margin: '0 auto 40px', padding: '0 32px' }}>
        <div style={{ position: 'relative', borderRadius: '20px', overflow: 'hidden', backgroundColor: '#f4fbf8', border: '1px solid #d1fae5', display: 'flex', alignItems: 'center', minHeight: '200px' }}>
          <div style={{ flex: 1, padding: '40px', zIndex: 10 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', backgroundColor: '#f0fdfa', padding: '4px 12px', borderRadius: '100px', marginBottom: '12px' }}><span style={{ fontSize: '10px', fontWeight: 700, color: '#0f766e', textTransform: 'uppercase', letterSpacing: '0.1em', fontFamily: 'Inter, sans-serif' }}>Powered by SouKni AI</span></div>
            <h2 style={{ fontSize: '26px', fontWeight: 800, color: '#111827', marginBottom: '10px', fontFamily: 'Inter, sans-serif' }}>Virtual Viewing</h2>
            <p style={{ fontSize: '15px', color: '#6b7280', marginBottom: '20px', maxWidth: '420px', lineHeight: 1.7, fontFamily: 'Inter, sans-serif' }}>Explore properties with immersive interactive tours and AI-powered 360° videos from the comfort of your home.</p>
            <div style={{ display: 'flex', gap: '20px' }}>
              {[{ icon: '🎥', label: 'View listings with Videos' }, { icon: '360°', label: 'View listings with 360 views' }].map(l => <a key={l.label} href="#" style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#0f766e', fontWeight: 700, fontSize: '13px', textDecoration: 'none', fontFamily: 'Inter, sans-serif' }}><span>{l.icon}</span>{l.label}</a>)}
            </div>
          </div>
          <div style={{ width: '45%', position: 'absolute', right: 0, top: 0, bottom: 0, overflow: 'hidden' }}>
            <img src="https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&w=800" alt="Virtual" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.9 }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, #f4fbf8, transparent)' }} />
          </div>
        </div>
      </section>
      <section style={{ maxWidth: '1280px', margin: '0 auto 40px', padding: '0 32px' }}>
        <div style={{ marginBottom: '20px' }}><h2 style={{ fontSize: '20px', fontWeight: 800, color: '#111827', fontFamily: 'Inter, sans-serif' }}>Vacation Properties</h2><p style={{ fontSize: '13px', color: '#9ca3af', fontFamily: 'Inter, sans-serif' }}>Curated listings for short-term stays</p></div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>{vacationProps.map(p => <PropCard key={p.title} prop={p} type="vacation" />)}</div>
      </section>
      <section style={{ maxWidth: '1280px', margin: '0 auto 40px', padding: '0 32px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#111827', marginBottom: '16px', fontFamily: 'Inter, sans-serif' }}>Popular Neighborhoods in Morocco</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gridTemplateRows: 'repeat(2, 180px)', gap: '10px', height: '370px' }}>
          <div style={{ gridColumn: '1', gridRow: '1 / 3', position: 'relative', borderRadius: '14px', overflow: 'hidden', cursor: 'pointer' }}>
            <img src={neighborhoods[0].image} alt={neighborhoods[0].name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)', padding: '14px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}><h3 style={{ color: 'white', fontWeight: 700, fontSize: '16px', fontFamily: 'Inter, sans-serif' }}>{neighborhoods[0].name}</h3>{neighborhoods[0].desc && <p style={{ color: '#d1d5db', fontSize: '12px', fontFamily: 'Inter, sans-serif' }}>{neighborhoods[0].desc}</p>}</div>
          </div>
          <div style={{ gridColumn: '2', gridRow: '1', position: 'relative', borderRadius: '14px', overflow: 'hidden', cursor: 'pointer' }}><img src={neighborhoods[1].image} alt={neighborhoods[1].name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /><div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.35)', padding: '12px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}><h3 style={{ color: 'white', fontWeight: 700, fontSize: '13px', fontFamily: 'Inter, sans-serif' }}>{neighborhoods[1].name}</h3></div></div>
          <div style={{ gridColumn: '3 / 5', gridRow: '1', position: 'relative', borderRadius: '14px', overflow: 'hidden', cursor: 'pointer' }}><img src={neighborhoods[2].image} alt={neighborhoods[2].name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /><div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.35)', padding: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}><h3 style={{ color: 'white', fontWeight: 700, fontSize: '16px', fontFamily: 'Inter, sans-serif' }}>{neighborhoods[2].name}</h3></div></div>
          <div style={{ gridColumn: '2', gridRow: '2', position: 'relative', borderRadius: '14px', overflow: 'hidden', cursor: 'pointer' }}><img src={neighborhoods[3].image} alt={neighborhoods[3].name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /><div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.35)', padding: '12px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}><h3 style={{ color: 'white', fontWeight: 700, fontSize: '13px', fontFamily: 'Inter, sans-serif' }}>{neighborhoods[3].name}</h3></div></div>
          <div style={{ gridColumn: '3 / 5', gridRow: '2', position: 'relative', borderRadius: '14px', overflow: 'hidden', cursor: 'pointer' }}><img src={neighborhoods[4].image} alt={neighborhoods[4].name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /><div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.35)', padding: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}><h3 style={{ color: 'white', fontWeight: 700, fontSize: '16px', fontFamily: 'Inter, sans-serif' }}>{neighborhoods[4].name}</h3></div></div>
        </div>
      </section>
      <section style={{ maxWidth: '1280px', margin: '0 auto 40px', padding: '0 32px' }}>
        <div style={{ marginBottom: '20px' }}><h2 style={{ fontSize: '20px', fontWeight: 800, color: '#111827', fontFamily: 'Inter, sans-serif' }}>Rental Properties</h2><p style={{ fontSize: '13px', color: '#9ca3af', fontFamily: 'Inter, sans-serif' }}>Curated listings from Diamond Renters</p></div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>{rentalProps.map(p => <PropCard key={p.title} prop={p} type="rental" />)}</div>
      </section>
      <section style={{ maxWidth: '1280px', margin: '0 auto 40px', padding: '0 32px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '20px' }}><div><h2 style={{ fontSize: '20px', fontWeight: 800, color: '#111827', fontFamily: 'Inter, sans-serif' }}>Featured Properties</h2><p style={{ fontSize: '13px', color: '#9ca3af', fontFamily: 'Inter, sans-serif' }}>Curated listings from Diamond sellers</p></div><a href="#" style={{ color: '#2dd4bf', fontWeight: 700, fontSize: '13px', textDecoration: 'none', fontFamily: 'Inter, sans-serif' }}>See more →</a></div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>{featuredProps.map(p => <PropCard key={p.title} prop={p} type="sale" />)}</div>
      </section>
      <section style={{ backgroundColor: '#f9fafb', padding: '48px 32px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ marginBottom: '10px', fontSize: '18px', fontWeight: 700, color: '#2dd4bf', fontFamily: 'Inter, sans-serif' }}>★ Google Apps</div>
          <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#111827', marginBottom: '24px', fontFamily: 'Inter, sans-serif' }}>Excellent — 4.9 out of 5 based on 2879 reviews</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
            {testimonials.map((t, i) => <div key={i} style={{ backgroundColor: 'white', padding: '20px', borderRadius: '14px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', textAlign: 'left' }}><div style={{ color: '#fbbf24', fontSize: '14px', marginBottom: '10px' }}>★★★★★</div><p style={{ fontSize: '13px', color: '#6b7280', fontStyle: 'italic', marginBottom: '12px', lineHeight: 1.7, fontFamily: 'Inter, sans-serif' }}>{t.text}</p><div style={{ fontWeight: 700, fontSize: '12px', color: '#111827', fontFamily: 'Inter, sans-serif' }}>{t.name}</div></div>)}
          </div>
        </div>
      </section>
      <section style={{ maxWidth: '1280px', margin: '40px auto', padding: '0 32px' }}>
        <div style={{ position: 'relative', overflow: 'hidden', borderRadius: '18px', background: 'linear-gradient(135deg, #134e4a 0%, #0f766e 100%)', padding: '44px 56px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '24px' }}>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', backgroundColor: '#2dd4bf', color: 'white', padding: '4px 12px', borderRadius: '100px', fontSize: '10px', fontWeight: 800, marginBottom: '14px', letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: 'Inter, sans-serif' }}>💎 Diamond Seller</div>
            <h2 style={{ fontSize: '32px', fontWeight: 800, color: 'white', marginBottom: '10px', letterSpacing: '-0.02em', fontFamily: 'Inter, sans-serif' }}>Become a Diamond Seller</h2>
            <p style={{ fontSize: '15px', color: 'rgba(240,253,250,0.88)', fontFamily: 'Inter, sans-serif' }}>Get a Verified Account, priority listing placement, and dedicated support to boost your sales by up to 4X.</p>
          </div>
          <button style={{ position: 'relative', zIndex: 1, backgroundColor: 'white', color: '#134e4a', border: 'none', padding: '14px 32px', borderRadius: '12px', fontWeight: 800, fontSize: '15px', cursor: 'pointer', flexShrink: 0, fontFamily: 'Inter, sans-serif' }}>Get Verified Now</button>
        </div>
      </section>
      <footer style={{ backgroundColor: '#374151', color: '#d1d5db', paddingTop: '56px', paddingBottom: '28px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 32px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr', gap: '28px', marginBottom: '40px', paddingBottom: '40px', borderBottom: '1px solid #4b5563' }}>
            <div>
              <div style={{ fontSize: '26px', fontWeight: 900, color: 'white', marginBottom: '12px', fontFamily: 'Inter, sans-serif' }}>SouKni</div>
              <p style={{ fontSize: '13px', color: '#9ca3af', lineHeight: 1.7, maxWidth: '240px', marginBottom: '16px', fontFamily: 'Inter, sans-serif' }}>The largest real estate marketplace in Morocco. Trusted by millions to find their next home.</p>
              <div style={{ display: 'flex', gap: '8px' }}>{['X', 'IG', 'YT', 'FB'].map(s => <a key={s} href="#" style={{ backgroundColor: '#4b5563', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 700, color: '#d1d5db', textDecoration: 'none' }}>{s}</a>)}</div>
            </div>
            {[{ title: 'Properties', links: ['Casablanca', 'Marrakech', 'Rabat', 'Tangier', 'Agadir'] }, { title: 'Company', links: ['About Us', 'Careers', 'Media', 'Blog'] }, { title: 'Support', links: ['Help Center', 'Privacy Policy', 'Terms of Use', 'Safety Tips'] }, { title: 'Languages', links: ['French', 'Arabic', 'English'] }].map(col => <div key={col.title}><h4 style={{ fontWeight: 700, fontSize: '13px', color: 'white', marginBottom: '14px', fontFamily: 'Inter, sans-serif' }}>{col.title}</h4>{col.links.map(link => <a key={link} href="#" style={{ display: 'block', fontSize: '12px', color: '#9ca3af', textDecoration: 'none', marginBottom: '8px', fontFamily: 'Inter, sans-serif' }} onMouseEnter={e => e.currentTarget.style.color = 'white'} onMouseLeave={e => e.currentTarget.style.color = '#9ca3af'}>{link}</a>)}</div>)}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <p style={{ fontSize: '11px', color: '#6b7280', fontFamily: 'Inter, sans-serif' }}>© 2026 SouKni Property. All Rights Reserved.</p>
            <div style={{ display: 'flex', gap: '14px' }}>{['Sitemap', 'Cookies'].map(l => <a key={l} href="#" style={{ fontSize: '11px', color: '#6b7280', textDecoration: 'none', fontFamily: 'Inter, sans-serif' }}>{l}</a>)}</div>
          </div>
        </div>
      </footer>
    </div>
  )
}
