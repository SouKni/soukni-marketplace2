'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Heart, ChevronLeft, ChevronRight, Bell, Bookmark, Search, MapPin, Bed, ArrowRight } from 'lucide-react'
const catNav = ['Motors', 'Property', 'Jobs', 'Services', 'Mobiles & Computers', 'Community']
const statusPills = ['All Projects', 'Off-Plan', 'Ready', 'Featured']
const projects = [
  { id: 'p1', name: 'Binghatti Apex', status: 'Under Construction', badge: 'Featured', price: 'AED 950K', priceLabel: 'Launch Price', downPayment: '20% Down Payment', beds: 'Studio-1 beds', location: 'Binghatti Apex, JVC District 10, Jumeirah Village Circle', developer: 'Binghatti Developers', devInitials: 'BD', image: 'https://images.pexels.com/photos/2581922/pexels-photo-2581922.jpeg?auto=compress&w=800', thumb1: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&w=200', thumb2: 'https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg?auto=compress&w=200' },
  { id: 'p2', name: 'Project Maybach', status: 'Under Construction', badge: 'Featured', price: 'AED 1.4M', priceLabel: 'Launch Price', downPayment: '10% Down Payment', beds: 'Studio-3 beds', location: 'Project Maybach, Mercedes-Benz Places', developer: 'Binghatti Developers', devInitials: 'BD', image: 'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&w=800', thumb1: 'https://images.pexels.com/photos/440731/pexels-photo-440731.jpeg?auto=compress&w=200', thumb2: 'https://images.pexels.com/photos/2581922/pexels-photo-2581922.jpeg?auto=compress&w=200' },
  { id: 'p3', name: 'Anfa Sky Towers', status: 'New Launch', badge: 'Featured', price: 'MAD 1.8M', priceLabel: 'Launch Price', downPayment: '', beds: 'Studio - 3 beds', location: 'Casablanca Finance City', developer: 'CFC Developments', devInitials: 'CFC', image: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&w=800', thumb1: '', thumb2: '' },
  { id: 'p4', name: 'Taghazout Bay Resort', status: 'Selling Fast', badge: 'Featured', price: 'MAD 2.5M', priceLabel: 'From', downPayment: '', beds: '2 - 4 bed villas', location: 'Taghazout, Agadir', developer: 'Azur Properties', devInitials: 'AP', image: 'https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg?auto=compress&w=800', thumb1: '', thumb2: '' },
  { id: 'p5', name: 'Riad Enclave', status: 'Under Construction', badge: 'Featured', price: 'MAD 4.2M', priceLabel: 'From', downPayment: '', beds: '4 - 5 bed luxury villas', location: 'Hay Riad, Rabat', developer: 'Royal Estates', devInitials: 'RE', image: 'https://images.pexels.com/photos/440731/pexels-photo-440731.jpeg?auto=compress&w=800', thumb1: '', thumb2: '' },
]
function ProjectCard({ proj }: { proj: typeof projects[0] }) {
  const [saved, setSaved] = useState(false)
  const [hovered, setHovered] = useState(false)
  return (
    <article onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} style={{ backgroundColor: 'white', borderRadius: '12px', boxShadow: hovered ? '0 12px 32px rgba(0,0,0,0.08)' : '0 4px 24px rgba(0,0,0,0.04)', border: '1px solid rgba(186,202,197,0.2)', overflow: 'hidden', display: 'flex', transition: 'box-shadow 0.3s', cursor: 'pointer' }}>
      {/* IMAGE */}
      <div style={{ position: 'relative', width: '400px', flexShrink: 0, backgroundColor: '#e8efec', overflow: 'hidden' }}>
        <img src={proj.image} alt={proj.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s', transform: hovered ? 'scale(1.04)' : 'scale(1)', minHeight: '240px' }} />
        <div style={{ position: 'absolute', top: '14px', left: '14px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <span style={{ backgroundColor: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(8px)', color: '#161d1b', fontSize: '10px', fontWeight: 600, padding: '4px 12px', borderRadius: '100px', textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: 'Inter, sans-serif', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>{proj.status}</span>
        </div>
        <div style={{ position: 'absolute', top: '12px', right: '12px', backgroundColor: '#2dd4bf', color: 'white', width: '28px', height: '28px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}>✓</div>
        <div style={{ position: 'absolute', bottom: '14px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '4px' }}>
          <div style={{ width: '20px', height: '6px', backgroundColor: 'white', borderRadius: '100px' }} />
          {[1,2,3].map(i => <div key={i} style={{ width: '6px', height: '6px', backgroundColor: 'rgba(255,255,255,0.5)', borderRadius: '50%' }} />)}
        </div>
      </div>
      {/* CONTENT */}
      <div style={{ flex: 1, padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '16px' }}>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
            <h2 style={{ fontSize: '22px', fontWeight: 600, color: '#161d1b', letterSpacing: '-0.01em', fontFamily: 'Inter, sans-serif', lineHeight: 1.3 }}>{proj.name}</h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ backgroundColor: 'rgba(0,107,95,0.1)', color: '#006b5f', fontSize: '10px', fontWeight: 600, padding: '4px 8px', borderRadius: '4px', border: '1px solid rgba(0,107,95,0.2)', textTransform: 'uppercase', letterSpacing: '0.06em', fontFamily: 'Inter, sans-serif' }}>{proj.badge}</span>
              <button onClick={e => { e.stopPropagation(); setSaved(!saved) }} style={{ border: 'none', backgroundColor: 'transparent', cursor: 'pointer', padding: '2px' }}><Heart size={20} fill={saved ? '#ef4444' : 'none'} color={saved ? '#ef4444' : '#9ca3af'} /></button>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontSize: '15px', color: '#161d1b', fontFamily: 'Inter, sans-serif' }}>{proj.priceLabel}</span>
              <span style={{ fontSize: '22px', fontWeight: 700, color: '#006b5f', letterSpacing: '-0.02em', fontFamily: 'Inter, sans-serif' }}>{proj.price}</span>
            </div>
            {proj.downPayment && <><div style={{ width: '4px', height: '4px', backgroundColor: '#bacac5', borderRadius: '50%' }} /><span style={{ fontSize: '15px', color: '#3c4a46', fontFamily: 'Inter, sans-serif' }}>{proj.downPayment}</span></>}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#3c4a46', fontSize: '15px', marginBottom: '8px', fontFamily: 'Inter, sans-serif' }}>
            <Bed size={18} /> <span>{proj.beds}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#3c4a46', fontSize: '15px', marginBottom: '16px', fontFamily: 'Inter, sans-serif', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            <MapPin size={18} /> <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{proj.location}</span>
          </div>
          {(proj.thumb1 || proj.thumb2) && (
            <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
              {proj.thumb1 && <div style={{ width: '48px', height: '48px', borderRadius: '8px', overflow: 'hidden', border: '1px solid rgba(186,202,197,0.3)' }}><img src={proj.thumb1} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /></div>}
              {proj.thumb2 && <div style={{ width: '48px', height: '48px', borderRadius: '8px', overflow: 'hidden', border: '1px solid rgba(186,202,197,0.3)' }}><img src={proj.thumb2} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /></div>}
              <div style={{ width: '48px', height: '48px', borderRadius: '8px', backgroundColor: '#eef5f2', border: '1px solid rgba(186,202,197,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: 600, color: '#3c4a46', fontFamily: 'Inter, sans-serif' }}>+3</div>
            </div>
          )}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '16px', borderTop: '1px solid rgba(186,202,197,0.2)', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#e8efec', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(186,202,197,0.3)', fontSize: '12px', fontWeight: 600, color: '#3c4a46', fontFamily: 'Inter, sans-serif' }}>{proj.devInitials}</div>
            <div>
              <div style={{ fontSize: '11px', color: '#6b7a76', fontFamily: 'Inter, sans-serif', letterSpacing: '0.05em' }}>Developer</div>
              <div style={{ fontSize: '15px', fontWeight: 600, color: '#161d1b', fontFamily: 'Inter, sans-serif' }}>{proj.developer}</div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button style={{ display: 'flex', alignItems: 'center', gap: '6px', border: '1px solid #6b7a76', color: '#161d1b', backgroundColor: 'transparent', padding: '10px 20px', borderRadius: '100px', fontSize: '13px', fontWeight: 600, cursor: 'pointer', fontFamily: 'Inter, sans-serif', transition: 'background 0.15s' }} onMouseEnter={e => e.currentTarget.style.backgroundColor = '#eef5f2'} onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}>💬 Message</button>
            <button style={{ display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: '#2dd4bf', color: '#161d1b', border: 'none', padding: '10px 20px', borderRadius: '100px', fontSize: '13px', fontWeight: 600, cursor: 'pointer', fontFamily: 'Inter, sans-serif', boxShadow: '0 4px 12px rgba(45,212,191,0.25)', transition: 'all 0.15s' }} onMouseEnter={e => e.currentTarget.style.backgroundColor = '#0f9b8e'} onMouseLeave={e => e.currentTarget.style.backgroundColor = '#2dd4bf'}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
              WhatsApp
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}
function CinematicBanner({ title, sub, label, cta, image }: { title: string; sub: string; label: string; cta?: string; image: string }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} style={{ position: 'relative', width: '100%', height: '180px', borderRadius: '40px', overflow: 'hidden', boxShadow: '0 8px 32px rgba(0,0,0,0.15)', cursor: 'pointer' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, #2b3230, rgba(43,50,48,0.65), transparent)', zIndex: 1 }} />
      <img src={image} alt={title} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', mixBlendMode: 'overlay', opacity: 0.55, transition: 'transform 0.7s', transform: hovered ? 'scale(1.05)' : 'scale(1)' }} />
      <div style={{ position: 'relative', zIndex: 2, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 48px' }}>
        <div>
          <div style={{ fontSize: '11px', fontWeight: 600, color: '#3cddc7', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '6px', fontFamily: 'Inter, sans-serif' }}>{label}</div>
          <h3 style={{ fontSize: '32px', fontWeight: 700, color: 'white', marginBottom: '4px', letterSpacing: '-0.02em', fontFamily: 'Inter, sans-serif' }}>{title}</h3>
          <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.8)', fontFamily: 'Inter, sans-serif' }}>{sub}</p>
        </div>
        {cta && <button style={{ backgroundColor: '#006b5f', color: 'white', border: 'none', padding: '14px 28px', borderRadius: '100px', fontSize: '13px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontFamily: 'Inter, sans-serif', boxShadow: '0 8px 24px rgba(0,107,95,0.4)', flexShrink: 0, transition: 'all 0.2s' }} onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.04)'} onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>{cta} <ArrowRight size={16} /></button>}
      </div>
    </div>
  )
}
export default function NewProjectsPage() {
  const [activeCat, setActiveCat] = useState('Property')
  const [activeStatus, setActiveStatus] = useState('All Projects')
  const [currentPage, setCurrentPage] = useState(1)
  return (
    <div style={{ fontFamily: 'Inter, system-ui, sans-serif', backgroundColor: '#f4fbf8', minHeight: '100vh' }}>
      {/* HEADER */}
      <header style={{ position: 'sticky', top: 0, zIndex: 50, backgroundColor: 'rgba(244,251,248,0.85)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.45)', boxShadow: '0 1px 8px rgba(0,0,0,0.04)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '16px 40px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
              <Link href="/en" style={{ textDecoration: 'none', fontSize: '22px', fontWeight: 700, color: '#006b5f', letterSpacing: '-0.03em', fontFamily: 'Inter, sans-serif' }}>SouKni</Link>
              <button style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '13px', fontWeight: 600, color: '#3c4a46', backgroundColor: '#e8efec', padding: '4px 12px', borderRadius: '100px', border: '1px solid rgba(186,202,197,0.35)', cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>Rabat <span style={{ fontSize: '10px' }}>▾</span></button>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ display: 'flex', gap: '4px' }}>
                {[Bell, Bookmark, Heart].map((Icon, i) => <button key={i} style={{ width: '36px', height: '36px', borderRadius: '50%', border: 'none', backgroundColor: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#3c4a46', transition: 'background 0.15s' }} onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(45,212,191,0.12)'} onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}><Icon size={20} /></button>)}
              </div>
              <button style={{ fontSize: '13px', fontWeight: 500, color: '#3c4a46', border: 'none', backgroundColor: 'transparent', cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>Sign Up</button>
              <button style={{ backgroundColor: '#2dd4bf', color: 'white', border: 'none', padding: '9px 20px', borderRadius: '100px', fontSize: '13px', fontWeight: 600, cursor: 'pointer', fontFamily: 'Inter, sans-serif', boxShadow: '0 2px 8px rgba(45,212,191,0.3)' }}>Place Your FREE Ad</button>
            </div>
          </div>
          <nav style={{ display: 'flex', gap: '32px', borderTop: '1px solid rgba(186,202,197,0.15)', paddingTop: '10px' }}>
            {catNav.map(item => <a key={item} href="#" onClick={e => { e.preventDefault(); setActiveCat(item) }} style={{ fontSize: '13px', fontWeight: item === 'Property' ? 600 : 400, color: activeCat === item ? '#006b5f' : '#3c4a46', textDecoration: 'none', borderBottom: activeCat === item ? '2px solid #006b5f' : 'none', paddingBottom: activeCat === item ? '4px' : '0', fontFamily: 'Inter, sans-serif', transition: 'color 0.15s' }}>{item}</a>)}
          </nav>
        </div>
      </header>
      {/* ADVANCED FILTER BAR */}
      <div style={{ maxWidth: '1280px', margin: '24px auto 0', padding: '0 40px' }}>
        <div style={{ backgroundColor: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(12px)', borderRadius: '100px', border: '1px solid rgba(186,202,197,0.35)', boxShadow: '0 8px 32px rgba(0,0,0,0.06)', padding: '8px', display: 'flex', alignItems: 'center', overflowX: 'auto' }}>
          {[
            { label: 'Location', val: 'Enter location', icon: '📍' },
            { label: 'Property Type', val: 'All in Residential' },
            { label: 'Beds', val: 'Any' },
            { label: 'Project Completion', val: 'Select' },
            { label: 'Pre-Handover Payment', val: 'Select' },
            { label: 'Filters', val: 'Handover, Dev...' },
          ].map((f, i) => (
            <div key={f.label} style={{ flex: 1, minWidth: '140px', padding: '8px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderRight: i < 5 ? '1px solid rgba(186,202,197,0.2)' : 'none', cursor: 'pointer', borderRadius: '100px', transition: 'background 0.15s' }} onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(232,239,236,0.5)'} onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '10px', fontWeight: 600, color: '#3c4a46', textTransform: 'uppercase', letterSpacing: '0.1em', fontFamily: 'Inter, sans-serif' }}>{f.label}</span>
                <span style={{ fontSize: '15px', color: f.val === 'Enter location' || f.val === 'Any' || f.val === 'Select' || f.val === 'Handover, Dev...' ? 'rgba(60,74,70,0.6)' : '#161d1b', fontFamily: 'Inter, sans-serif' }}>{f.val}</span>
              </div>
              <span style={{ color: '#6b7a76', fontSize: '14px' }}>▾</span>
            </div>
          ))}
        </div>
      </div>
      <main style={{ maxWidth: '1280px', margin: '0 auto', padding: '32px 40px 80px' }}>
        {/* SEARCH + FILTER ROW */}
        <div style={{ backgroundColor: 'white', borderRadius: '100px', border: '1px solid rgba(186,202,197,0.3)', boxShadow: '0 8px 32px rgba(0,0,0,0.03)', padding: '8px', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '28px', backdropFilter: 'blur(12px)' }}>
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', borderRadius: '100px', cursor: 'text' }}>
            <Search size={18} color="#6b7a76" />
            <input type="text" placeholder="Location, community or building" style={{ border: 'none', outline: 'none', fontSize: '15px', color: '#161d1b', backgroundColor: 'transparent', fontFamily: 'Inter, sans-serif', width: '100%' }} />
          </div>
          <div style={{ width: '1px', height: '32px', backgroundColor: 'rgba(186,202,197,0.3)' }} />
          <div style={{ display: 'flex', gap: '8px', padding: '0 8px' }}>
            {['Purpose', 'Property Type', 'Price Range'].map(f => <button key={f} style={{ display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: 'white', padding: '8px 16px', borderRadius: '100px', border: '1px solid rgba(186,202,197,0.4)', fontSize: '13px', fontWeight: 600, color: '#161d1b', cursor: 'pointer', fontFamily: 'Inter, sans-serif', whiteSpace: 'nowrap' }}>{f} <span style={{ fontSize: '10px', color: '#6b7a76' }}>▾</span></button>)}
          </div>
          <button style={{ display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: 'rgba(45,212,191,0.12)', padding: '10px 20px', borderRadius: '100px', border: '1px solid rgba(45,212,191,0.4)', fontSize: '13px', fontWeight: 600, color: '#006b5f', cursor: 'pointer', fontFamily: 'Inter, sans-serif', marginLeft: 'auto' }}>⚙ Filters</button>
        </div>
        {/* BREADCRUMBS & TITLE */}
        <div style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#3c4a46', marginBottom: '8px', fontFamily: 'Inter, sans-serif' }}>
            🏠 <ChevronRight size={14} /> <span>Property</span> <ChevronRight size={14} /> <span style={{ color: '#161d1b' }}>New Projects in Rabat</span>
          </div>
          <h1 style={{ fontSize: '26px', fontWeight: 600, color: '#161d1b', letterSpacing: '-0.01em', fontFamily: 'Inter, sans-serif' }}>Latest New Projects in Rabat</h1>
        </div>
        {/* STATUS PILLS */}
        <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', marginBottom: '28px', paddingBottom: '4px' }}>
          {statusPills.map(pill => <button key={pill} onClick={() => setActiveStatus(pill)} style={{ whiteSpace: 'nowrap', padding: '9px 22px', borderRadius: '100px', backgroundColor: activeStatus === pill ? '#161d1b' : '#e8efec', color: activeStatus === pill ? '#f4fbf8' : '#161d1b', border: activeStatus === pill ? 'none' : '1px solid rgba(186,202,197,0.3)', fontSize: '13px', fontWeight: 600, cursor: 'pointer', fontFamily: 'Inter, sans-serif', transition: 'all 0.15s', boxShadow: activeStatus === pill ? '0 2px 8px rgba(0,0,0,0.15)' : 'none' }}>{pill}</button>)}
        </div>
        {/* LISTING GRID */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <ProjectCard proj={projects[0]} />
          <CinematicBanner title="SouKni Immo Pro" label="Exclusive Partner" sub="Elevate your listings to the gold standard. Discover premium tools for top agents." image="https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&w=1400" />
          <CinematicBanner title="SouKni Auto Pro" label="Exclusive Partner" sub="The Gold Standard for Luxury Motors. Discover premium tools for professional dealers." cta="Discover Exclusive Collections" image="https://images.pexels.com/photos/3764984/pexels-photo-3764984.jpeg?auto=compress&w=1400" />
          <ProjectCard proj={projects[1]} />
          <ProjectCard proj={projects[2]} />
          <CinematicBanner title="SouKni Auto Pro" label="Exclusive Partner" sub="The Gold Standard for Luxury Motors. Discover premium tools for professional dealers." cta="Discover Exclusive Collections" image="https://images.pexels.com/photos/3764984/pexels-photo-3764984.jpeg?auto=compress&w=1400" />
          <ProjectCard proj={projects[3]} />
          {/* PAGINATION */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '6px', margin: '16px 0' }}>
            <button style={{ width: '40px', height: '40px', borderRadius: '8px', border: '1px solid rgba(186,202,197,0.3)', backgroundColor: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#3c4a46' }} onMouseEnter={e => e.currentTarget.style.backgroundColor = '#e8efec'} onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}><ChevronLeft size={18} /></button>
            {[1, 2, 3, '...', 12].map((p, i) => <button key={i} onClick={() => typeof p === 'number' && p !== 12 && setCurrentPage(p)} style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: p === currentPage ? '#006b5f' : 'transparent', border: p === currentPage ? 'none' : '1px solid rgba(186,202,197,0.3)', color: p === currentPage ? 'white' : '#3c4a46', fontSize: '13px', fontWeight: p === currentPage ? 700 : 400, cursor: p === '...' ? 'default' : 'pointer', fontFamily: 'Inter, sans-serif', boxShadow: p === currentPage ? '0 2px 8px rgba(0,107,95,0.3)' : 'none' }} onMouseEnter={e => { if (p !== currentPage) e.currentTarget.style.backgroundColor = '#e8efec' }} onMouseLeave={e => { if (p !== currentPage) e.currentTarget.style.backgroundColor = 'transparent' }}>{p}</button>)}
            <button style={{ width: '40px', height: '40px', borderRadius: '8px', border: '1px solid rgba(186,202,197,0.3)', backgroundColor: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#3c4a46' }} onMouseEnter={e => e.currentTarget.style.backgroundColor = '#e8efec'} onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}><ChevronRight size={18} /></button>
          </div>
          <ProjectCard proj={projects[4]} />
          {/* LOAD MORE */}
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '16px' }}>
            <button style={{ display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: 'white', border: '1px solid rgba(186,202,197,0.5)', color: '#161d1b', padding: '12px 32px', borderRadius: '100px', fontSize: '13px', fontWeight: 600, cursor: 'pointer', fontFamily: 'Inter, sans-serif', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', transition: 'all 0.2s' }} onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#e8efec'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.08)' }} onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'white'; e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.04)' }}>Load More Projects <span>▾</span></button>
          </div>
        </div>
      </main>
      {/* DIAMOND SELLER BANNER */}
      <div style={{ maxWidth: '1280px', margin: '0 auto 48px', padding: '0 40px' }}>
        <div style={{ position: 'relative', borderRadius: '40px', overflow: 'hidden', background: 'linear-gradient(to right, #2dd4bf, #10b981)', padding: '32px 48px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '24px', boxShadow: '0 8px 32px rgba(45,212,191,0.25)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <div style={{ width: '56px', height: '56px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', flexShrink: 0 }}>💎</div>
            <div>
              <h2 style={{ fontSize: '26px', fontWeight: 700, color: 'white', marginBottom: '4px', fontFamily: 'Inter, sans-serif' }}>Become a Diamond Seller</h2>
              <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.9)', fontFamily: 'Inter, sans-serif' }}>Get a verified Account</p>
            </div>
          </div>
          <button style={{ backgroundColor: 'white', color: '#10b981', border: 'none', padding: '14px 32px', borderRadius: '100px', fontSize: '13px', fontWeight: 700, cursor: 'pointer', fontFamily: 'Inter, sans-serif', flexShrink: 0, boxShadow: '0 4px 16px rgba(0,0,0,0.12)', transition: 'all 0.2s' }} onMouseEnter={e => e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.15)'} onMouseLeave={e => e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.12)'}>Get Verified</button>
        </div>
      </div>
      {/* FOOTER */}
      <footer style={{ backgroundColor: '#7A7A7A', color: 'white', paddingTop: '64px', paddingBottom: '32px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 40px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1fr', gap: '40px', marginBottom: '48px', paddingBottom: '48px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
            <div>
              <div style={{ fontSize: '24px', fontWeight: 700, color: 'white', marginBottom: '14px', letterSpacing: '-0.03em', fontFamily: 'Inter, sans-serif' }}>SouKni</div>
              <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.8)', lineHeight: 1.7, maxWidth: '280px', marginBottom: '24px', fontFamily: 'Inter, sans-serif' }}>Morocco's premium marketplace for real estate, motors, electronics and more.</p>
            </div>
            {[
              { title: 'Marketplace', links: ['Real Estate', 'Motors', 'Jobs', 'Services', 'The Vault'] },
              { title: 'Company', links: ['About Us', 'Careers', 'Legal', 'Privacy Policy', 'Terms of Service'] },
              { title: 'Support', links: ['Help Center', 'Contact Us'] },
            ].map(col => (
              <div key={col.title}>
                <h4 style={{ fontSize: '18px', fontWeight: 700, color: 'white', marginBottom: '16px', fontFamily: 'Inter, sans-serif' }}>{col.title}</h4>
                {col.links.map(link => <a key={link} href="#" style={{ display: 'block', fontSize: '15px', color: 'rgba(255,255,255,0.7)', textDecoration: 'none', marginBottom: '10px', fontFamily: 'Inter, sans-serif', transition: 'color 0.15s' }} onMouseEnter={e => e.currentTarget.style.color = 'white'} onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.7)'}>{link}</a>)}
                {col.title === 'Support' && (
                  <div style={{ marginTop: '16px' }}>
                    <div style={{ fontSize: '11px', fontWeight: 600, color: 'rgba(255,255,255,0.55)', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '12px', fontFamily: 'Inter, sans-serif' }}>Download SouKni App</div>
                    {[{ icon: '🍎', sub: 'Download on the', title: 'App Store' }, { icon: '▶', sub: 'Get it on', title: 'Google Play' }].map(app => <a key={app.title} href="#" style={{ display: 'flex', alignItems: 'center', gap: '12px', backgroundColor: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '8px', padding: '10px 14px', textDecoration: 'none', marginBottom: '8px', transition: 'background 0.15s' }} onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.35)'} onMouseLeave={e => e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.2)'}><span style={{ fontSize: '22px' }}>{app.icon}</span><div><div style={{ fontSize: '9px', color: 'rgba(255,255,255,0.55)', textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: 'Inter, sans-serif' }}>{app.sub}</div><div style={{ fontSize: '14px', fontWeight: 700, color: 'white', fontFamily: 'Inter, sans-serif' }}>{app.title}</div></div></a>)}
                  </div>
                )}
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
            <div style={{ display: 'flex', gap: '20px' }}>
              {[{ icon: '🌐', label: 'English' }, { icon: '📤', label: 'Share' }].map(item => <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'rgba(255,255,255,0.6)', cursor: 'pointer', fontSize: '13px', fontFamily: 'Inter, sans-serif', transition: 'color 0.15s' }} onMouseEnter={e => e.currentTarget.style.color = 'white'} onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.6)'}><span>{item.icon}</span>{item.label}</div>)}
            </div>
            <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', fontFamily: 'Inter, sans-serif' }}>© 2026 SouKni Marketplace. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
