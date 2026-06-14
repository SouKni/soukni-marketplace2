'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Heart, Search, ChevronsLeft, ChevronLeft, ChevronRight, ChevronsRight, Bell, MapPin, Bed, Bath, Maximize, Phone } from 'lucide-react'
const catNav = ['Motors', 'Property', 'Jobs', 'Classifieds', 'Furniture & Garden', 'Mobiles & Tablets', 'Community']
const listings = [
  { id: 'p1', badge: 'Verified', badge2: 'Ready', title: 'High ROI Modern Investment Lagoon View', type: 'Apartment', price: '2,450,000', location: 'Anfa Place, Casablanca', beds: 3, baths: 2, area: 125, image: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&w=700' },
  { id: 'p2', badge: 'New Listing', title: 'Stunning Beachfront Villa with Private Pool', type: 'Villa', price: '12,700,000', location: 'Malabata, Tangier', beds: 5, baths: 6, area: 450, image: 'https://images.pexels.com/photos/2581922/pexels-photo-2581922.jpeg?auto=compress&w=700' },
  { id: 'p3', badge: 'Verified', title: 'Modern Luxury Villa with Private Pool', type: 'Villa', price: '8,500,000', location: 'Marrakech, Palmeraie', beds: 4, baths: 4, area: 380, image: 'https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg?auto=compress&w=700' },
  { id: 'p4', badge: 'New', title: 'Ultra-Modern Apartment with Ocean View', type: 'Apartment', price: '4,200,000', location: 'Casablanca Finance City', beds: 2, baths: 2, area: 145, image: 'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&w=700' },
  { id: 'p5', badge: 'Exclusive', title: 'Traditional Luxury Riad in Medina', type: 'Riad', price: '6,750,000', location: 'Rabat Medina', beds: 6, baths: 5, area: 320, image: 'https://images.pexels.com/photos/440731/pexels-photo-440731.jpeg?auto=compress&w=700' },
  { id: 'p6', badge: 'Verified', title: 'Ultra-Modern Minimalist Apartment', type: 'Apartment', price: '5,200,000', location: 'Casablanca, Anfa District', beds: 2, baths: 2, area: 120, image: 'https://images.pexels.com/photos/2581922/pexels-photo-2581922.jpeg?auto=compress&w=700' },
  { id: 'p7', badge: 'Exclusive', title: 'Contemporary Oasis Villa', type: 'Villa', price: '11,800,000', location: 'Marrakech, Hivernage', beds: 5, baths: 6, area: 600, image: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&w=700' },
  { id: 'p8', badge: 'Exclusive', title: 'Luxury Beachfront Villa with Infinity Pool', type: 'Villa', price: '15,000,000', location: 'Agadir, Atlantic Coast', beds: 6, baths: 7, area: 850, image: 'https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg?auto=compress&w=700' },
  { id: 'p9', badge: 'Verified', title: 'Premium Retail Space in High-End Mall', type: 'Commercial', price: '4,500,000', location: 'Rabat, Souissi', area: 120, image: 'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&w=700' },
  { id: 'p10', badge: 'New Listing', title: 'Charming Traditional House (Chefchaouen)', type: 'House', price: '2,800,000', location: 'Chefchaouen Medina', beds: 4, baths: 3, area: 210, image: 'https://images.pexels.com/photos/440731/pexels-photo-440731.jpeg?auto=compress&w=700' },
]
const newProjects = [
  { name: 'The Marina Heights', city: 'Casablanca Finance City', price: 'From 1.2M MAD', image: 'https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg?auto=compress&w=200' },
  { name: 'Atlas Green Resort', city: 'Marrakech, Palmeraie', price: 'From 3.5M MAD', image: 'https://images.pexels.com/photos/2581922/pexels-photo-2581922.jpeg?auto=compress&w=200' },
]
function BadgeChip({ label }: { label: string }) {
  const isMint = ['Verified','Exclusive','EXCLUSIVE','VERIFIED','New Listing','NEW LISTING'].includes(label)
  const isNavy = label === 'Ready' || label === 'New'
  return <span style={{ backgroundColor: isNavy ? 'rgba(15,23,42,0.8)' : '#2dd4bf', color: 'white', fontSize: '9px', fontWeight: 800, padding: '3px 8px', borderRadius: '4px', letterSpacing: '0.08em', textTransform: 'uppercase', fontFamily: 'Inter, sans-serif' }}>{label}</span>
}
function PropertyCard({ prop }: { prop: typeof listings[0] }) {
  const [saved, setSaved] = useState(false)
  const [hovered, setHovered] = useState(false)
  return (
    <article onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} style={{ backgroundColor: 'white', borderRadius: '16px', overflow: 'hidden', border: hovered ? '1px solid rgba(45,212,191,0.3)' : '1px solid #f1f5f9', display: 'flex', height: '240px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', transition: 'all 0.3s', cursor: 'pointer' }}>
      <div style={{ width: '40%', position: 'relative', overflow: 'hidden', flexShrink: 0 }}>
        <img src={prop.image} alt={prop.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s', transform: hovered ? 'scale(1.1)' : 'scale(1)' }} />
        <div style={{ position: 'absolute', top: '12px', left: '12px', display: 'flex', gap: '6px' }}>
          <BadgeChip label={prop.badge} />
          {(prop as any).badge2 && <BadgeChip label={(prop as any).badge2} />}
        </div>
        <button onClick={e => { e.stopPropagation(); setSaved(!saved) }} style={{ position: 'absolute', top: '10px', right: '10px', width: '34px', height: '34px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(12px)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Heart size={16} fill={saved ? '#ef4444' : 'none'} color={saved ? '#ef4444' : 'white'} />
        </button>
        <div style={{ position: 'absolute', bottom: '10px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '4px' }}>
          {[0,1,2].map(i => <div key={i} style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: i === 0 ? 'white' : 'rgba(255,255,255,0.5)' }} />)}
        </div>
      </div>
      <div style={{ flex: 1, padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
            <h3 style={{ fontSize: '22px', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em', fontFamily: 'Inter, sans-serif' }}>{prop.price} MAD</h3>
            <span style={{ fontSize: '11px', color: '#64748b', fontWeight: 500, fontFamily: 'Inter, sans-serif' }}>{prop.type}</span>
          </div>
          <h2 style={{ fontSize: '15px', fontWeight: 500, color: hovered ? '#2dd4bf' : '#0f172a', marginBottom: '6px', fontFamily: 'Inter, sans-serif', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', transition: 'color 0.15s' }}>{prop.title}</h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#64748b', fontSize: '12px', marginBottom: '14px', fontFamily: 'Inter, sans-serif' }}>
            <MapPin size={13} /> {prop.location}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', fontSize: '12px', color: '#475569', borderTop: '1px solid #f1f5f9', paddingTop: '12px' }}>
            {prop.beds && <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontFamily: 'Inter, sans-serif' }}><Bed size={14} /> {prop.beds} Beds</span>}
            {prop.baths && <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontFamily: 'Inter, sans-serif' }}><Bath size={14} /> {prop.baths} Baths</span>}
            {prop.area && <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontFamily: 'Inter, sans-serif' }}><Maximize size={14} /> {prop.area} sqm</span>}
          </div>
        </div>
        <div style={{ display: 'flex', gap: '10px', marginTop: '12px' }}>
          <button style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', border: '1px solid #e2e8f0', backgroundColor: 'transparent', color: '#0f172a', fontWeight: 700, fontSize: '13px', padding: '10px', borderRadius: '10px', cursor: 'pointer', fontFamily: 'Inter, sans-serif' }} onMouseEnter={e => e.currentTarget.style.backgroundColor = '#f8fafc'} onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}>
            <Phone size={14} /> Call
          </button>
          <button style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', backgroundColor: '#2dd4bf', color: 'white', fontWeight: 700, fontSize: '13px', padding: '10px', borderRadius: '10px', border: 'none', cursor: 'pointer', fontFamily: 'Inter, sans-serif' }} onMouseEnter={e => e.currentTarget.style.backgroundColor = '#0f9b8e'} onMouseLeave={e => e.currentTarget.style.backgroundColor = '#2dd4bf'}>
            💬 WhatsApp
          </button>
        </div>
      </div>
    </article>
  )
}
export default function PropertyForSalePage() {
  const [activeCat, setActiveCat] = useState('Property')
  const [currentPage, setCurrentPage] = useState(1)
  const [activeFilter, setActiveFilter] = useState('All')
  return (
    <div style={{ fontFamily: 'Inter, system-ui, sans-serif', backgroundColor: '#f4fbf8', minHeight: '100vh' }}>
      <header style={{ position: 'sticky', top: 0, zIndex: 50, backgroundColor: 'rgba(255,255,255,0.82)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.45)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px', height: '56px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <Link href="/en" style={{ textDecoration: 'none', fontSize: '22px', fontWeight: 900, color: '#2dd4bf', letterSpacing: '-0.03em', fontFamily: 'Inter, sans-serif' }}>SouKni</Link>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#64748b', cursor: 'pointer', fontSize: '13px', fontWeight: 500 }}><MapPin size={14} /> Casablanca</div>
          </div>
          <div style={{ flex: 1, maxWidth: '480px', margin: '0 32px', position: 'relative' }}>
            <input type="text" placeholder="Search for property, cars, jobs..." style={{ width: '100%', backgroundColor: 'rgba(100,116,139,0.08)', border: 'none', borderRadius: '100px', padding: '8px 16px 8px 38px', fontSize: '13px', outline: 'none', fontFamily: 'Inter, sans-serif', boxSizing: 'border-box' }} />
            <Search size={15} style={{ position: 'absolute', left: '13px', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button style={{ border: 'none', backgroundColor: 'transparent', cursor: 'pointer', color: '#64748b', padding: '6px' }}><Bell size={20} /></button>
            <button style={{ border: 'none', backgroundColor: 'transparent', cursor: 'pointer', color: '#64748b', padding: '6px' }}><Heart size={20} /></button>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#e2e8f0', border: '1px solid #cbd5e1', overflow: 'hidden' }}>
              <img src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&w=100" alt="User" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <button style={{ backgroundColor: '#2dd4bf', color: 'white', border: 'none', padding: '9px 20px', borderRadius: '8px', fontSize: '13px', fontWeight: 600, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>Post Your Ad</button>
          </div>
        </div>
        <nav style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px', borderTop: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '40px', height: '48px' }}>
          {catNav.map(item => <a key={item} href="#" onClick={e => { e.preventDefault(); setActiveCat(item) }} style={{ textDecoration: 'none', fontSize: '13px', fontWeight: 500, color: activeCat === item ? '#2dd4bf' : '#64748b', borderBottom: activeCat === item ? '2px solid #2dd4bf' : '2px solid transparent', height: '100%', display: 'flex', alignItems: 'center', gap: '4px', transition: 'color 0.15s', fontFamily: 'Inter, sans-serif' }}>{item}{item === 'Motors' && <span style={{ backgroundColor: 'rgba(45,212,191,0.12)', color: '#2dd4bf', fontSize: '9px', fontWeight: 800, padding: '1px 5px', borderRadius: '4px' }}>NEW</span>}</a>)}
        </nav>
      </header>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '14px 24px', fontSize: '11px', color: '#64748b', display: 'flex', alignItems: 'center', gap: '6px', fontFamily: 'Inter, sans-serif' }}>
        {['Home', 'Property', 'Property for sale in Morocco'].map((c, i, arr) => <span key={c} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><a href="#" style={{ color: i === arr.length-1 ? '#0f172a' : '#64748b', textDecoration: 'none', fontWeight: i === arr.length-1 ? 600 : 400 }}>{c}</a>{i < arr.length-1 && <span>›</span>}</span>)}
      </div>
      <main style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px 80px' }}>
        <section style={{ marginBottom: '28px' }}>
          <h1 style={{ fontSize: '22px', fontWeight: 800, color: '#0f172a', marginBottom: '14px', fontFamily: 'Inter, sans-serif' }}>Properties for sale in Morocco <span style={{ color: '#64748b', fontWeight: 400, fontSize: '16px' }}>12,450 Ads</span></h1>
          <div style={{ backgroundColor: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(12px)', border: '1px solid white', padding: '8px', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
            <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)' }}>
              {[{ label: 'Property For', val: 'Buy' }, { label: 'Location', val: 'Casablanca...' }, { label: 'Property Type', val: 'All Residential' }, { label: 'Price Range', val: 'Any' }, { label: 'Beds', val: 'Any' }, { label: 'Filters', val: 'Baths, Area...' }].map((f, i) => (
                <div key={f.label} style={{ padding: '8px 16px', borderRight: i < 5 ? '1px solid #f1f5f9' : 'none', display: 'flex', flexDirection: 'column', cursor: 'pointer', transition: 'background 0.15s' }} onMouseEnter={e => e.currentTarget.style.backgroundColor = '#f8fafc'} onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}>
                  <span style={{ fontSize: '9px', textTransform: 'uppercase', fontWeight: 700, color: '#64748b', letterSpacing: '0.1em', fontFamily: 'Inter, sans-serif' }}>{f.label}</span>
                  <span style={{ fontSize: '13px', fontWeight: 500, color: '#0f172a', fontFamily: 'Inter, sans-serif', marginTop: '2px' }}>{f.val}</span>
                </div>
              ))}
            </div>
            <button style={{ backgroundColor: '#2dd4bf', color: 'white', border: 'none', padding: '14px 16px', borderRadius: '12px', cursor: 'pointer', flexShrink: 0 }} onMouseEnter={e => e.currentTarget.style.backgroundColor = '#0f9b8e'} onMouseLeave={e => e.currentTarget.style.backgroundColor = '#2dd4bf'}>
              <Search size={22} color="white" />
            </button>
          </div>
          <div style={{ marginTop: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', gap: '8px' }}>
              {['All', 'Ready', 'Off-Plan'].map(f => <button key={f} onClick={() => setActiveFilter(f)} style={{ padding: '6px 20px', borderRadius: '100px', backgroundColor: 'white', border: activeFilter === f ? '1px solid #2dd4bf' : '1px solid #e2e8f0', fontSize: '13px', fontWeight: 500, color: activeFilter === f ? '#2dd4bf' : '#0f172a', cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>{f}</button>)}
            </div>
            <div style={{ display: 'flex', gap: '16px', fontSize: '13px' }}>
              <button style={{ border: 'none', backgroundColor: 'transparent', cursor: 'pointer', fontWeight: 500, color: '#64748b', fontFamily: 'Inter, sans-serif' }}>⇅ Sort: Popular</button>
              <button style={{ border: 'none', backgroundColor: 'transparent', cursor: 'pointer', fontWeight: 500, color: '#64748b', fontFamily: 'Inter, sans-serif' }}>🔖 Save Search</button>
            </div>
          </div>
        </section>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '28px', alignItems: 'start' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {listings.slice(0, 2).map(p => <PropertyCard key={p.id} prop={p} />)}
            <div style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', borderRadius: '16px', padding: '28px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', overflow: 'hidden', position: 'relative' }}>
              <div style={{ position: 'absolute', right: '-20px', bottom: '-20px', opacity: 0.08, fontSize: '120px' }}>📊</div>
              <div style={{ position: 'relative', zIndex: 1 }}>
                <h2 style={{ fontSize: '20px', fontWeight: 800, color: 'white', marginBottom: '6px', fontFamily: 'Inter, sans-serif' }}>What's your property worth today?</h2>
                <p style={{ fontSize: '13px', color: '#94a3b8', marginBottom: '16px', maxWidth: '420px', lineHeight: 1.6, fontFamily: 'Inter, sans-serif' }}>Get an instant SouKni Estimate report with accurate, data-driven property insights for the Moroccan market.</p>
                <button style={{ backgroundColor: '#2dd4bf', color: 'white', border: 'none', padding: '11px 24px', borderRadius: '8px', fontWeight: 700, fontSize: '13px', cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>Get Your Free Estimate &gt;</button>
              </div>
            </div>
            {listings.slice(2, 7).map(p => <PropertyCard key={p.id} prop={p} />)}
            <div style={{ borderRadius: '16px', overflow: 'hidden', border: '1px solid #f1f5f9' }}>
              <div style={{ background: 'linear-gradient(135deg, #0f766e 0%, #2dd4bf 100%)', padding: '28px 32px', display: 'flex', alignItems: 'center', gap: '20px' }}>
                <div style={{ fontSize: '40px' }}>🎥</div>
                <div>
                  <div style={{ display: 'inline-flex', backgroundColor: 'rgba(255,255,255,0.2)', padding: '3px 10px', borderRadius: '100px', fontSize: '9px', fontWeight: 800, color: 'white', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px', fontFamily: 'Inter, sans-serif' }}>✓ Powered by SouKni AI</div>
                  <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'white', marginBottom: '4px', fontFamily: 'Inter, sans-serif' }}>Virtual Viewing Available</h3>
                  <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.85)', fontFamily: 'Inter, sans-serif' }}>Explore these properties with immersive 360° tours and AI-powered videos.</p>
                </div>
              </div>
            </div>
            <div style={{ position: 'relative', borderRadius: '16px', overflow: 'hidden', height: '220px', cursor: 'pointer' }}>
              <img src="https://images.pexels.com/photos/2581922/pexels-photo-2581922.jpeg?auto=compress&w=1400" alt="Immo Pro" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(15,23,42,0.92) 0%, rgba(15,23,42,0.62) 60%, transparent 100%)', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '32px' }}>
                <div style={{ position: 'relative', zIndex: 1, maxWidth: '380px' }}>
                  <h2 style={{ fontSize: '26px', fontWeight: 800, color: 'white', marginBottom: '8px', fontFamily: 'Inter, sans-serif' }}>SouKni Immo Pro</h2>
                  <p style={{ fontSize: '13px', color: '#cbd5e1', marginBottom: '18px', lineHeight: 1.6, fontFamily: 'Inter, sans-serif' }}>Boost your property visibility to over 2M monthly seekers. Professional tools for real estate experts.</p>
                  <button style={{ backgroundColor: '#2dd4bf', color: '#0f172a', border: 'none', padding: '11px 24px', borderRadius: '8px', fontWeight: 700, fontSize: '13px', cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>Get Started Today</button>
                </div>
              </div>
            </div>
            {listings.slice(7).map(p => <PropertyCard key={p.id} prop={p} />)}
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', marginTop: '12px' }}>
              <div style={{ display: 'flex', gap: '6px', marginRight: '16px' }}>
                {[ChevronsLeft, ChevronLeft].map((Icon, i) => <button key={i} style={{ width: '40px', height: '40px', borderRadius: '8px', border: '1px solid #e2e8f0', backgroundColor: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}><Icon size={15} color="#94a3b8" /></button>)}
              </div>
              {[1,2,3,4,5,6,7,8,9,10].map(page => <button key={page} onClick={() => setCurrentPage(page)} style={{ width: '40px', height: '40px', borderRadius: '8px', border: page === currentPage ? 'none' : '1px solid #e2e8f0', backgroundColor: page === currentPage ? '#2dd4bf' : 'white', color: page === currentPage ? 'white' : '#0f172a', fontSize: '13px', fontWeight: page === currentPage ? 700 : 500, cursor: 'pointer', fontFamily: 'Inter, sans-serif', boxShadow: page === currentPage ? '0 2px 8px rgba(45,212,191,0.3)' : 'none' }}>{page}</button>)}
              <div style={{ display: 'flex', gap: '6px', marginLeft: '16px' }}>
                {[ChevronRight, ChevronsRight].map((Icon, i) => <button key={i} style={{ width: '40px', height: '40px', borderRadius: '8px', border: '1px solid #e2e8f0', backgroundColor: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}><Icon size={15} color="#94a3b8" /></button>)}
              </div>
            </div>
          </div>
          <aside style={{ display: 'flex', flexDirection: 'column', gap: '20px', position: 'sticky', top: '114px' }}>
            <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '20px', border: '1px solid #f1f5f9', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h3 style={{ fontWeight: 800, color: '#0f172a', fontSize: '14px', fontFamily: 'Inter, sans-serif' }}>New Projects in Morocco</h3>
                <a href="#" style={{ color: '#2dd4bf', fontSize: '12px', fontWeight: 600, textDecoration: 'none', fontFamily: 'Inter, sans-serif' }}>View All</a>
              </div>
              {newProjects.map((proj, i) => <div key={proj.name} style={{ display: 'flex', gap: '14px', cursor: 'pointer', paddingTop: i > 0 ? '14px' : '0', marginTop: i > 0 ? '14px' : '0', borderTop: i > 0 ? '1px solid #f1f5f9' : 'none' }}><div style={{ width: '72px', height: '72px', borderRadius: '10px', overflow: 'hidden', flexShrink: 0 }}><img src={proj.image} alt={proj.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /></div><div><h4 style={{ fontWeight: 700, fontSize: '13px', color: '#0f172a', marginBottom: '3px', fontFamily: 'Inter, sans-serif' }}>{proj.name}</h4><p style={{ fontSize: '11px', color: '#64748b', marginBottom: '6px', fontFamily: 'Inter, sans-serif' }}>{proj.city}</p><span style={{ fontSize: '12px', fontWeight: 700, color: '#0f172a', fontFamily: 'Inter, sans-serif' }}>{proj.price}</span></div></div>)}
            </div>
            <div style={{ background: 'rgba(45,212,191,0.06)', border: '2px solid rgba(45,212,191,0.2)', borderRadius: '16px', padding: '20px' }}>
              <span style={{ backgroundColor: '#2dd4bf', color: 'white', fontSize: '9px', fontWeight: 800, padding: '2px 8px', borderRadius: '4px', textTransform: 'uppercase', letterSpacing: '0.1em', fontFamily: 'Inter, sans-serif' }}>Pro Only</span>
              <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', marginTop: '10px', marginBottom: '6px', fontFamily: 'Inter, sans-serif' }}>List Your Agency on SouKni</h3>
              <p style={{ fontSize: '12px', color: '#475569', marginBottom: '14px', fontFamily: 'Inter, sans-serif', lineHeight: 1.6 }}>Reach over 2M property seekers monthly in Morocco.</p>
              <button style={{ width: '100%', backgroundColor: '#0f172a', color: 'white', border: 'none', padding: '12px', borderRadius: '10px', fontWeight: 700, fontSize: '13px', cursor: 'pointer', fontFamily: 'Inter, sans-serif' }} onMouseEnter={e => e.currentTarget.style.backgroundColor = '#1e293b'} onMouseLeave={e => e.currentTarget.style.backgroundColor = '#0f172a'}>Get Started Today</button>
            </div>
            <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '20px', border: '1px solid #f1f5f9', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
              <h3 style={{ fontWeight: 800, color: '#0f172a', fontSize: '14px', marginBottom: '6px', fontFamily: 'Inter, sans-serif' }}>Get Price Alerts</h3>
              <p style={{ fontSize: '12px', color: '#64748b', marginBottom: '14px', fontFamily: 'Inter, sans-serif', lineHeight: 1.6 }}>We'll notify you when new properties matching your search are listed.</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <input type="email" placeholder="Enter your email" style={{ width: '100%', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '10px 14px', fontSize: '13px', outline: 'none', fontFamily: 'Inter, sans-serif', boxSizing: 'border-box' }} />
                <button style={{ width: '100%', backgroundColor: '#2dd4bf', color: 'white', border: 'none', padding: '11px', borderRadius: '8px', fontWeight: 700, fontSize: '13px', cursor: 'pointer', fontFamily: 'Inter, sans-serif' }} onMouseEnter={e => e.currentTarget.style.backgroundColor = '#0f9b8e'} onMouseLeave={e => e.currentTarget.style.backgroundColor = '#2dd4bf'}>Enable Alerts</button>
              </div>
            </div>
          </aside>
        </div>
        <section style={{ marginTop: '40px', position: 'relative', overflow: 'hidden', borderRadius: '16px', background: 'linear-gradient(135deg, #2dd4bf 0%, #0f766e 100%)', padding: '40px 48px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '24px' }}>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <h2 style={{ fontSize: '28px', fontWeight: 800, color: 'white', marginBottom: '8px', letterSpacing: '-0.02em', fontFamily: 'Inter, sans-serif' }}>Become a Diamond Seller — Get a Verified Account</h2>
            <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.9)', fontFamily: 'Inter, sans-serif' }}>Unlock exclusive benefits and build ultimate trust with premium buyers.</p>
          </div>
          <button style={{ position: 'relative', zIndex: 1, backgroundColor: 'white', color: '#2dd4bf', border: 'none', padding: '14px 32px', borderRadius: '12px', fontWeight: 800, fontSize: '15px', cursor: 'pointer', flexShrink: 0, fontFamily: 'Inter, sans-serif', whiteSpace: 'nowrap' }}>Get Verified Now</button>
        </section>
      </main>
      <footer style={{ backgroundColor: '#262626', color: 'white', paddingTop: '64px', paddingBottom: '32px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr', gap: '32px', marginBottom: '48px', paddingBottom: '48px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <div>
              <div style={{ fontSize: '26px', fontWeight: 900, color: 'white', marginBottom: '16px', fontFamily: 'Inter, sans-serif' }}>SouKni</div>
              <p style={{ fontSize: '13px', color: '#94a3b8', lineHeight: 1.7, maxWidth: '280px', marginBottom: '20px', fontFamily: 'Inter, sans-serif' }}>SouKni is Morocco's premier property and automotive marketplace connecting buyers and sellers through a seamless digital experience.</p>
              <div style={{ display: 'flex', gap: '10px' }}>
                {['FB', 'TW', 'IG'].map(s => <a key={s} href="#" style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 700, color: '#94a3b8', textDecoration: 'none' }} onMouseEnter={e => e.currentTarget.style.backgroundColor = '#2dd4bf'} onMouseLeave={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.06)'}>{s}</a>)}
              </div>
            </div>
            {[{ title: 'Marketplace', links: ['Property for Sale', 'Property for Rent', 'Motors', 'Classifieds', 'Jobs'] }, { title: 'Popular Cities', links: ['Casablanca', 'Marrakech', 'Tangier', 'Rabat', 'Agadir'] }, { title: 'Company', links: ['About Us', 'Contact Support', 'Trust & Safety', 'Terms of Use', 'Privacy Policy'] }].map(col => <div key={col.title}><h4 style={{ fontWeight: 700, fontSize: '15px', color: 'white', marginBottom: '20px', fontFamily: 'Inter, sans-serif' }}>{col.title}</h4>{col.links.map(link => <a key={link} href="#" style={{ display: 'block', fontSize: '13px', color: '#94a3b8', textDecoration: 'none', marginBottom: '12px', fontFamily: 'Inter, sans-serif' }} onMouseEnter={e => e.currentTarget.style.color = '#2dd4bf'} onMouseLeave={e => e.currentTarget.style.color = '#94a3b8'}>{link}</a>)}</div>)}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
            <p style={{ fontSize: '11px', color: '#475569', fontFamily: 'Inter, sans-serif' }}>© 2026 SouKni Morocco. All rights reserved.</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px', color: '#475569', fontFamily: 'Inter, sans-serif' }}>
              <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: '#2dd4bf', display: 'inline-block' }} /> Systems Operational
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
