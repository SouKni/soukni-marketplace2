'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Heart, ChevronLeft, ChevronRight, Bed, Bath, Maximize } from 'lucide-react'
const navLinks = ['Motors', 'Property', 'Jobs', 'Services', 'The Vault', 'Mobiles & Tablettes']
const listings = [
  { id: 'r1', type: 'PENTHOUSE', title: 'Luxury Penthouse with Mediterranean Views', price: '35,000', beds: 4, baths: 3, area: 320, photos: 15, verified: true, image: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&w=700' },
  { id: 'r2', type: 'RIAD', title: 'Traditional Luxury Riad in Marrakech Medina', price: '55,000', beds: 5, baths: 5, area: 450, photos: 20, verified: true, image: 'https://images.pexels.com/photos/2581922/pexels-photo-2581922.jpeg?auto=compress&w=700' },
  { id: 'r3', type: 'APARTMENT', title: 'Ultra-Modern Apartment in Casablanca Finance City', price: '22,000', beds: 3, baths: 2, area: 165, photos: 10, verified: true, image: 'https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg?auto=compress&w=700' },
  { id: 'r4', type: 'APARTMENT', title: 'Modern 2BR Apartment in Marina Casablanca', price: '12,500', beds: 2, baths: 2, area: 115, photos: 8, verified: true, image: 'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&w=700' },
  { id: 'r5', type: 'VILLA', title: 'Luxury Villa with Pool in Palmeraie', price: '45,000', beds: 5, baths: 4, area: 450, photos: 12, verified: false, image: 'https://images.pexels.com/photos/440731/pexels-photo-440731.jpeg?auto=compress&w=700' },
  { id: 'r6', type: 'APARTMENT', title: 'Modern 2BR Apartment in Marina Casablanca', price: '18,000', beds: 2, baths: 2, area: 125, photos: 12, verified: true, image: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&w=700' },
  { id: 'r7', type: 'RIAD', title: 'Authentic Luxury Riad in Marrakech Medina', price: '65,000', beds: 6, baths: 6, area: 520, photos: 24, verified: true, image: 'https://images.pexels.com/photos/2581922/pexels-photo-2581922.jpeg?auto=compress&w=700' },
  { id: 'r8', type: 'VILLA', title: 'Contemporary 4BR Villa in Palmeraie', price: '40,000', beds: 4, baths: 4, area: 480, photos: 18, verified: true, image: 'https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg?auto=compress&w=700' },
  { id: 'r9', type: 'DUPLEX', title: 'Luxury Beachfront Duplex in Agadir', price: '30,000', beds: 3, baths: 3, area: 210, photos: 12, verified: true, image: 'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&w=700' },
  { id: 'r10', type: 'VILLA', title: 'Premium 3-Bedroom Villa in Rabat (Hay Riad)', price: '45,000', beds: 4, baths: 4, area: 450, photos: 18, verified: true, image: 'https://images.pexels.com/photos/440731/pexels-photo-440731.jpeg?auto=compress&w=700' },
  { id: 'r11', type: 'RIAD', title: 'Charming Traditional Riad in Essaouira', price: '25,000', beds: 5, baths: 5, area: 380, photos: 20, verified: true, image: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&w=700' },
  { id: 'r12', type: 'APARTMENT', title: 'Modern 2-Bedroom Apartment in Marrakech (Gueliz)', price: '12,000', beds: 2, baths: 2, area: 115, photos: 10, verified: true, image: 'https://images.pexels.com/photos/2581922/pexels-photo-2581922.jpeg?auto=compress&w=700' },
]
function RentalCard({ prop }: { prop: typeof listings[0] }) {
  const [saved, setSaved] = useState(false)
  const [hovered, setHovered] = useState(false)
  return (
    <article onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} style={{ backgroundColor: 'white', borderRadius: '40px', overflow: 'hidden', border: '1px solid #f1f5f9', display: 'flex', boxShadow: hovered ? '0 20px 40px rgba(0,0,0,0.12)' : '0 2px 12px rgba(0,0,0,0.04)', transition: 'all 0.3s', cursor: 'pointer' }}>
      <div style={{ width: '33%', position: 'relative', overflow: 'hidden', flexShrink: 0, minHeight: '220px' }}>
        <img src={prop.image} alt={prop.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s', transform: hovered ? 'scale(1.07)' : 'scale(1)' }} />
        {prop.verified && <div style={{ position: 'absolute', top: '14px', left: '14px', backgroundColor: '#2dd4bf', color: 'white', fontSize: '9px', fontWeight: 800, padding: '3px 8px', borderRadius: '4px', letterSpacing: '0.08em', textTransform: 'uppercase', fontFamily: 'Inter, sans-serif' }}>VERIFIED</div>}
        <div style={{ position: 'absolute', bottom: '12px', right: '12px', backgroundColor: 'rgba(0,0,0,0.5)', color: 'white', fontSize: '11px', padding: '3px 8px', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '4px', fontFamily: 'Inter, sans-serif' }}>📷 1/{prop.photos}</div>
      </div>
      <div style={{ flex: 1, padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
            <h3 style={{ fontSize: '24px', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em', fontFamily: 'Inter, sans-serif' }}>{prop.price} MAD <span style={{ fontSize: '13px', fontWeight: 400, color: '#94a3b8' }}>/ month</span></h3>
            <button onClick={e => { e.stopPropagation(); setSaved(!saved) }} style={{ border: 'none', backgroundColor: 'transparent', cursor: 'pointer', padding: '4px' }}>
              <Heart size={22} fill={saved ? '#ef4444' : 'none'} color={saved ? '#ef4444' : '#94a3b8'} />
            </button>
          </div>
          <p style={{ fontSize: '12px', fontWeight: 700, color: '#2dd4bf', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '6px', fontFamily: 'Inter, sans-serif' }}>{prop.type}</p>
          <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#0f172a', marginBottom: '14px', fontFamily: 'Inter, sans-serif' }}>{prop.title}</h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '13px', color: '#64748b', fontFamily: 'Inter, sans-serif' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><Bed size={14} /> {prop.beds} Beds</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><Bath size={14} /> {prop.baths} Baths</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><Maximize size={14} /> {prop.area} m²</span>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '10px', marginTop: '16px' }}>
          <button style={{ flex: 1, border: '2px solid #e2e8f0', backgroundColor: 'transparent', color: '#0f172a', fontWeight: 700, fontSize: '14px', padding: '12px', borderRadius: '16px', cursor: 'pointer', fontFamily: 'Inter, sans-serif', transition: 'background 0.15s' }} onMouseEnter={e => e.currentTarget.style.backgroundColor = '#f8fafc'} onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}>MESSAGE</button>
          <button style={{ flex: 1.5, backgroundColor: '#2dd4bf', color: 'white', fontWeight: 700, fontSize: '14px', padding: '12px', borderRadius: '16px', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontFamily: 'Inter, sans-serif', transition: 'filter 0.15s' }} onMouseEnter={e => e.currentTarget.style.filter = 'brightness(1.07)'} onMouseLeave={e => e.currentTarget.style.filter = 'brightness(1)'}>💬 WhatsApp</button>
        </div>
      </div>
    </article>
  )
}
export default function PropertyForRentPage() {
  const [activeNav, setActiveNav] = useState('Property')
  const [activeFilter, setActiveFilter] = useState('All')
  const [currentPage, setCurrentPage] = useState(1)
  return (
    <div style={{ fontFamily: 'Inter, system-ui, sans-serif', backgroundColor: '#f4fbf8', minHeight: '100vh' }}>
      <header style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(255,255,255,0.82)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(45,212,191,0.1)', padding: '12px 32px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
            <Link href="/en" style={{ textDecoration: 'none', fontSize: '22px', fontWeight: 900, color: '#2dd4bf', letterSpacing: '-0.03em', fontFamily: 'Inter, sans-serif' }}>SouKni</Link>
            <nav style={{ display: 'flex', gap: '20px' }}>
              {navLinks.map(item => <a key={item} href="#" onClick={e => { e.preventDefault(); setActiveNav(item) }} style={{ fontSize: '13px', fontWeight: 600, color: activeNav === item ? '#2dd4bf' : '#0f172a', textDecoration: 'none', borderBottom: activeNav === item ? '2px solid #2dd4bf' : 'none', paddingBottom: activeNav === item ? '2px' : '0', fontFamily: 'Inter, sans-serif', transition: 'color 0.15s' }}>{item}</a>)}
            </nav>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button style={{ fontSize: '13px', fontWeight: 500, border: 'none', backgroundColor: 'transparent', cursor: 'pointer', color: '#64748b', fontFamily: 'Inter, sans-serif' }}>Notifications &nbsp; Favorites &nbsp; Login/sign up</button>
            <button style={{ backgroundColor: '#2dd4bf', color: 'white', border: 'none', padding: '10px 22px', borderRadius: '100px', fontSize: '13px', fontWeight: 700, cursor: 'pointer', fontFamily: 'Inter, sans-serif', boxShadow: '0 2px 12px rgba(45,212,191,0.3)' }}>Place Your FREE Ad</button>
          </div>
        </div>
      </header>
      <main style={{ maxWidth: '1280px', margin: '0 auto', padding: '24px 32px 80px' }}>
        <section style={{ marginBottom: '20px' }}>
          <nav style={{ fontSize: '11px', color: '#94a3b8', marginBottom: '8px', fontFamily: 'Inter, sans-serif' }}>
            <a href="#" style={{ color: '#94a3b8', textDecoration: 'none' }}>Home</a> &gt; <a href="#" style={{ color: '#94a3b8', textDecoration: 'none' }}>Property</a> &gt; <span style={{ color: '#0f172a' }}>Property for rent in Morocco</span>
          </nav>
          <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#0f172a', fontFamily: 'Inter, sans-serif' }}>Properties for Rent</h1>
        </section>
        <section style={{ backgroundColor: 'white', borderRadius: '16px', padding: '16px', boxShadow: '0 1px 8px rgba(0,0,0,0.04)', border: '1px solid #f1f5f9', marginBottom: '20px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '12px' }}>
            {[{ label: 'City', type: 'select', options: ['Casablanca', 'Marrakech', 'Rabat', 'Tangier'] }, { label: 'Neighborhood', type: 'input', placeholder: 'Search area...' }, { label: 'Property Type', type: 'select', options: ['All Residential', 'Apartment', 'Villa', 'Studio'] }, { label: 'Price Range', type: 'select', options: ['Any', 'Under 5,000 MAD', '5,000 - 10,000 MAD'] }, { label: 'Rooms', type: 'select', options: ['Any', '1+', '2+', '3+'] }].map((f, i) => (
              <div key={f.label}>
                <label style={{ display: 'block', fontSize: '9px', textTransform: 'uppercase', fontWeight: 700, color: '#94a3b8', marginBottom: '4px', marginLeft: '8px', letterSpacing: '0.1em', fontFamily: 'Inter, sans-serif' }}>{f.label}</label>
                {f.type === 'input' ? <input placeholder={f.placeholder} style={{ width: '100%', border: 'none', backgroundColor: '#eef5f2', borderRadius: '10px', padding: '9px 12px', fontSize: '13px', outline: 'none', fontFamily: 'Inter, sans-serif', boxSizing: 'border-box' }} /> : <select style={{ width: '100%', border: 'none', backgroundColor: '#eef5f2', borderRadius: '10px', padding: '9px 12px', fontSize: '13px', outline: 'none', fontFamily: 'Inter, sans-serif', cursor: 'pointer' }}>{f.options?.map(o => <option key={o}>{o}</option>)}</select>}
              </div>
            ))}
            <div style={{ display: 'flex', alignItems: 'flex-end' }}>
              <button style={{ width: '100%', height: '42px', backgroundColor: '#0f172a', color: 'white', border: 'none', borderRadius: '10px', fontSize: '13px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontFamily: 'Inter, sans-serif' }}>Filters ⚙</button>
            </div>
          </div>
        </section>
        <section style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ display: 'flex', gap: '8px' }}>
            {['All', 'Furnished', 'Unfurnished'].map(f => <button key={f} onClick={() => setActiveFilter(f)} style={{ padding: '7px 20px', borderRadius: '100px', backgroundColor: activeFilter === f ? '#2dd4bf' : 'white', color: activeFilter === f ? 'white' : '#0f172a', border: activeFilter === f ? 'none' : '1px solid #e2e8f0', fontSize: '13px', fontWeight: activeFilter === f ? 700 : 500, cursor: 'pointer', fontFamily: 'Inter, sans-serif', transition: 'all 0.15s' }}>{f}</button>)}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', fontWeight: 600, color: '#64748b', fontFamily: 'Inter, sans-serif' }}>
            <span>Show Verified Diamond Posts</span>
            <div style={{ width: '44px', height: '24px', backgroundColor: '#e2e8f0', borderRadius: '100px', cursor: 'pointer', position: 'relative', transition: 'background 0.2s' }}>
              <div style={{ position: 'absolute', left: '3px', top: '3px', width: '18px', height: '18px', backgroundColor: 'white', borderRadius: '50%', boxShadow: '0 1px 4px rgba(0,0,0,0.15)', transition: 'left 0.2s' }} />
            </div>
          </div>
        </section>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {listings.slice(0, 4).map(p => <RentalCard key={p.id} prop={p} />)}
          {/* Virtual Viewing Banner */}
          <div style={{ borderRadius: '32px', overflow: 'hidden', background: 'linear-gradient(135deg, #0f766e 0%, #2dd4bf 100%)', padding: '28px 36px', display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div style={{ fontSize: '48px' }}>🎥</div>
            <div>
              <div style={{ display: 'inline-flex', backgroundColor: 'rgba(255,255,255,0.2)', padding: '3px 12px', borderRadius: '100px', fontSize: '9px', fontWeight: 800, color: 'white', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '8px', fontFamily: 'Inter, sans-serif' }}>✓ Powered by SouKni AI</div>
              <h3 style={{ fontSize: '20px', fontWeight: 800, color: 'white', marginBottom: '4px', fontFamily: 'Inter, sans-serif' }}>Virtual Viewing — Experience Properties in 360°</h3>
              <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.85)', fontFamily: 'Inter, sans-serif' }}>Explore rental properties with immersive AI-powered tours from anywhere.</p>
            </div>
          </div>
          {listings.slice(4, 5).map(p => <RentalCard key={p.id} prop={p} />)}
          {/* Immo Pro Banner */}
          <div style={{ position: 'relative', borderRadius: '40px', overflow: 'hidden', minHeight: '440px', display: 'flex', alignItems: 'center' }}>
            <img src="https://images.pexels.com/photos/2581922/pexels-photo-2581922.jpeg?auto=compress&w=1400" alt="Immo Pro" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(rgba(0,0,0,0.2),rgba(0,0,0,0.2))' }} />
            <div style={{ position: 'absolute', top: '24px', left: '24px', backgroundColor: 'rgba(0,0,0,0.2)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.12)', padding: '4px 14px', borderRadius: '100px', fontSize: '9px', fontWeight: 700, color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: '0.2em', fontFamily: 'Inter, sans-serif' }}>ADVERTISEMENT</div>
            <div style={{ position: 'relative', zIndex: 10, padding: '0 48px' }}>
              <div style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '32px', padding: '40px 48px', maxWidth: '520px' }}>
                <h1 style={{ fontSize: '52px', fontWeight: 900, color: 'white', marginBottom: '16px', letterSpacing: '-0.03em', lineHeight: 1.1, fontFamily: 'Inter, sans-serif' }}>SouKni <span style={{ color: '#2dd4bf' }}>Immo Pro</span></h1>
                <p style={{ fontSize: '17px', color: 'rgba(255,255,255,0.9)', marginBottom: '32px', lineHeight: 1.7, fontFamily: 'Inter, sans-serif' }}>Exclusive luxury real estate management and expert maintenance for elite Moroccan properties. Experience peace of mind with our dedicated concierge services.</p>
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  <button style={{ backgroundColor: '#2dd4bf', color: '#0f172a', border: 'none', padding: '14px 28px', borderRadius: '12px', fontWeight: 700, fontSize: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontFamily: 'Inter, sans-serif', transition: 'all 0.2s' }} onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.04)'} onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>Explore Portfolio →</button>
                  <button style={{ border: '1px solid rgba(255,255,255,0.4)', backgroundColor: 'rgba(255,255,255,0)', color: 'white', padding: '14px 28px', borderRadius: '12px', fontWeight: 600, fontSize: '14px', cursor: 'pointer', backdropFilter: 'blur(8px)', fontFamily: 'Inter, sans-serif' }}>Contact Concierge</button>
                </div>
              </div>
            </div>
          </div>
          {listings.slice(5, 8).map(p => <RentalCard key={p.id} prop={p} />)}
          {/* Auto Pro Banner */}
          <div style={{ position: 'relative', borderRadius: '40px', overflow: 'hidden', minHeight: '440px', display: 'flex', alignItems: 'center' }}>
            <img src="https://images.pexels.com/photos/3764984/pexels-photo-3764984.jpeg?auto=compress&w=1400" alt="Auto Pro" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(rgba(0,0,0,0.2),rgba(0,0,0,0.2))' }} />
            <div style={{ position: 'absolute', top: '24px', left: '24px', backgroundColor: 'rgba(0,0,0,0.2)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.12)', padding: '4px 14px', borderRadius: '100px', fontSize: '9px', fontWeight: 700, color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: '0.2em', fontFamily: 'Inter, sans-serif' }}>ADVERTISEMENT</div>
            <div style={{ position: 'relative', zIndex: 10, padding: '0 48px' }}>
              <div style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '32px', padding: '40px 48px', maxWidth: '520px' }}>
                <h1 style={{ fontSize: '52px', fontWeight: 900, color: 'white', marginBottom: '16px', letterSpacing: '-0.03em', lineHeight: 1.1, fontFamily: 'Inter, sans-serif' }}>SouKni <span style={{ color: '#2dd4bf' }}>Auto Pro</span></h1>
                <p style={{ fontSize: '17px', color: 'rgba(255,255,255,0.9)', marginBottom: '32px', lineHeight: 1.7, fontFamily: 'Inter, sans-serif' }}>Experience the next level of automotive luxury. Discover our exclusive fleet of high-performance vehicles and rare exotics tailored for the elite.</p>
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  <button style={{ backgroundColor: '#2dd4bf', color: '#0f172a', border: 'none', padding: '14px 28px', borderRadius: '12px', fontWeight: 700, fontSize: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontFamily: 'Inter, sans-serif' }}>Explore Fleet →</button>
                  <button style={{ border: '1px solid rgba(255,255,255,0.4)', backgroundColor: 'transparent', color: 'white', padding: '14px 28px', borderRadius: '12px', fontWeight: 600, fontSize: '14px', cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>Contact Expert</button>
                </div>
              </div>
            </div>
          </div>
          {listings.slice(8).map(p => <RentalCard key={p.id} prop={p} />)}
          {/* Pagination */}
          <nav style={{ display: 'flex', justifyContent: 'center', marginTop: '32px', marginBottom: '48px' }}>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button style={{ width: '40px', height: '40px', borderRadius: '50%', border: '1px solid #e2e8f0', backgroundColor: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }} onMouseEnter={e => { e.currentTarget.style.borderColor = '#2dd4bf'; e.currentTarget.style.color = '#2dd4bf' }} onMouseLeave={e => { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.color = '#94a3b8' }}>
                <ChevronLeft size={16} color="#94a3b8" />
              </button>
              {[1, 2, 3, '...'].map((p, i) => <button key={i} onClick={() => typeof p === 'number' && setCurrentPage(p)} style={{ width: '40px', height: '40px', borderRadius: '50%', border: p === currentPage ? 'none' : '1px solid #e2e8f0', backgroundColor: p === currentPage ? '#2dd4bf' : 'transparent', color: p === currentPage ? 'white' : '#64748b', fontSize: '13px', fontWeight: p === currentPage ? 700 : 500, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>{p}</button>)}
              <button style={{ width: '40px', height: '40px', borderRadius: '50%', border: '1px solid #e2e8f0', backgroundColor: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }} onMouseEnter={e => { e.currentTarget.style.borderColor = '#2dd4bf' }} onMouseLeave={e => { e.currentTarget.style.borderColor = '#e2e8f0' }}>
                <ChevronRight size={16} color="#94a3b8" />
              </button>
            </div>
          </nav>
          {/* Diamond Seller */}
          <section style={{ position: 'relative', overflow: 'hidden', borderRadius: '32px', background: 'linear-gradient(135deg, #0f172a 0%, #134e4a 100%)', padding: '40px 48px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '32px', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 8px 40px rgba(0,0,0,0.2)' }}>
            <div style={{ position: 'absolute', top: 0, right: 0, width: '200px', height: '200px', background: 'rgba(45,212,191,0.06)', borderRadius: '50%', filter: 'blur(40px)' }} />
            <div style={{ position: 'absolute', bottom: 0, left: 0, width: '200px', height: '200px', background: 'rgba(45,212,191,0.06)', borderRadius: '50%', filter: 'blur(40px)' }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px', position: 'relative', zIndex: 1 }}>
              <div style={{ position: 'relative' }}>
                <div style={{ width: '72px', height: '72px', backgroundColor: 'rgba(45,212,191,0.15)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px' }}>💎</div>
                <div style={{ position: 'absolute', bottom: '-4px', right: '-4px', backgroundColor: '#2dd4bf', borderRadius: '50%', width: '22px', height: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #0f172a', fontSize: '10px' }}>✓</div>
              </div>
              <div style={{ maxWidth: '540px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <span style={{ backgroundColor: 'rgba(45,212,191,0.12)', color: '#2dd4bf', border: '1px solid rgba(45,212,191,0.25)', fontSize: '9px', fontWeight: 800, padding: '3px 12px', borderRadius: '100px', textTransform: 'uppercase', letterSpacing: '0.15em', fontFamily: 'Inter, sans-serif' }}>Diamond Seller</span>
                  <span style={{ fontSize: '9px', fontWeight: 700, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.15em', fontFamily: 'Inter, sans-serif' }}>Premium Feature</span>
                </div>
                <h2 style={{ fontSize: '32px', fontWeight: 900, color: 'white', marginBottom: '8px', letterSpacing: '-0.02em', fontFamily: 'Inter, sans-serif' }}>Become a Diamond Seller</h2>
                <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.78)', fontFamily: 'Inter, sans-serif', lineHeight: 1.6 }}>Get a Verified Account and increase your visibility by <span style={{ color: '#2dd4bf', fontWeight: 700 }}>10x</span>. Stand out to premium buyers across Morocco.</p>
              </div>
            </div>
            <button style={{ position: 'relative', zIndex: 1, backgroundColor: '#2dd4bf', color: '#0f172a', border: 'none', padding: '16px 36px', borderRadius: '14px', fontWeight: 800, fontSize: '15px', cursor: 'pointer', flexShrink: 0, display: 'flex', alignItems: 'center', gap: '10px', fontFamily: 'Inter, sans-serif', boxShadow: '0 4px 20px rgba(45,212,191,0.3)', transition: 'all 0.2s' }} onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.04)'} onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
              Get Verified Now →
            </button>
          </section>
        </div>
      </main>
      <footer style={{ backgroundColor: '#1e293b', color: '#d1d5db', paddingTop: '64px', paddingBottom: '32px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 32px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '40px', marginBottom: '48px', paddingBottom: '48px', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
            <div>
              <div style={{ fontSize: '26px', fontWeight: 900, color: 'white', marginBottom: '16px', fontFamily: 'Inter, sans-serif' }}>SouKni</div>
              <p style={{ fontSize: '13px', color: '#94a3b8', lineHeight: 1.7, maxWidth: '280px', fontFamily: 'Inter, sans-serif' }}>Morocco's leading marketplace for property, motors, and jobs. Find your next home in Casablanca, Marrakech or beyond.</p>
            </div>
            {[{ title: 'Properties', links: ['Apartments for Rent', 'Villas for Rent', 'Commercial Properties', 'New Projects'] }, { title: 'Quick Links', links: ['About Us', 'Contact Support', 'Safety Tips', 'Careers'] }, { title: 'Mobile Apps', isApps: true }].map(col => (
              <div key={col.title}>
                <h4 style={{ fontWeight: 700, fontSize: '11px', color: 'white', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.12em', fontFamily: 'Inter, sans-serif' }}>{col.title}</h4>
                {col.isApps ? <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>{['App Store', 'Google Play'].map(app => <div key={app} style={{ height: '40px', backgroundColor: '#374151', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 700, color: 'white', cursor: 'pointer', fontFamily: 'Inter, sans-serif', transition: 'background 0.15s' }} onMouseEnter={e => e.currentTarget.style.backgroundColor = '#4b5563'} onMouseLeave={e => e.currentTarget.style.backgroundColor = '#374151'}>{app}</div>)}</div> : col.links?.map(link => <a key={link} href="#" style={{ display: 'block', fontSize: '13px', color: '#94a3b8', textDecoration: 'none', marginBottom: '10px', fontFamily: 'Inter, sans-serif', transition: 'color 0.15s' }} onMouseEnter={e => e.currentTarget.style.color = '#2dd4bf'} onMouseLeave={e => e.currentTarget.style.color = '#94a3b8'}>{link}</a>)}
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', fontSize: '11px', color: '#475569', fontFamily: 'Inter, sans-serif' }}>© 2026 SouKni Morocco. All Rights Reserved.</div>
        </div>
      </footer>
    </div>
  )
}
