'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { MapPin, Heart, MessageCircle, Phone, Search, ChevronLeft, ChevronRight, ChevronDown, Sliders, Bookmark, Grid3x3, List, Diamond, Smartphone, Globe, Link2, Share2, Compass, Plus, MessageSquare, Menu, Building2, Factory, UtensilsCrossed, Warehouse, Store, BriefcaseBusiness, MoreHorizontal } from 'lucide-react'

const categoryPills = [
  { label: 'Business', icon: BriefcaseBusiness, active: true },
  { label: 'Factories', icon: Factory },
  { label: 'Restaurants', icon: UtensilsCrossed },
  { label: 'Warehouses', icon: Warehouse },
  { label: 'Retails', icon: Store },
  { label: 'Offices', icon: Building2 },
]

type Project = { id: string; title: string; location: string; image: string }
const newProjects: Project[] = [
  { id: 'p1', title: 'Bouregreg Valley Residences', location: 'Salé-Rabat Waterfront', image: 'https://images.pexels.com/photos/323775/pexels-photo-323775.jpeg?auto=compress&w=600' },
  { id: 'p2', title: 'Agdal Tech Plaza', location: 'Agdal, Rabat', image: 'https://images.pexels.com/photos/373912/pexels-photo-373912.jpeg?auto=compress&w=600' },
  { id: 'p3', title: 'Souissi Garden Towers', location: 'Souissi, Rabat', image: 'https://images.pexels.com/photos/280221/pexels-photo-280221.jpeg?auto=compress&w=600' },
  { id: 'p4', title: 'Riad Business District', location: 'Hay Riad, Rabat', image: 'https://images.pexels.com/photos/302769/pexels-photo-302769.jpeg?auto=compress&w=600' },
]

type Listing = { id: string; title: string; location: string; price: string; sqm?: string; tag?: string; image: string }

const row1: Listing[] = [
  { id: '1', title: 'Ocean View Penthouse Office', location: 'Marina District, Rabat', price: '45,000', sqm: '450 sqm', tag: 'Central Air', image: 'https://images.pexels.com/photos/260689/pexels-photo-260689.jpeg?auto=compress&w=600' },
  { id: '2', title: 'Agdal Medical Suite', location: 'Agdal-Riad, Rabat', price: '18,500', sqm: '120 sqm', tag: 'Clinic Ready', image: 'https://images.pexels.com/photos/247786/pexels-photo-247786.jpeg?auto=compress&w=600' },
  { id: '3', title: 'Flagship Retail Corner', location: 'Avenue Fal Ould Oumeir', price: '22,000', sqm: '85 sqm', tag: 'High Traffic', image: 'https://images.pexels.com/photos/1005638/pexels-photo-1005638.jpeg?auto=compress&w=600' },
  { id: '4', title: 'Technopolis Logistics Hub', location: 'Technopolis, Salé-Rabat', price: '110,000', sqm: '2,500 sqm', tag: 'Logistics A+', image: 'https://images.pexels.com/photos/236722/pexels-photo-236722.jpeg?auto=compress&w=600' },
]

const row2: Listing[] = [
  { id: '5', title: 'Creative Hub Studio', location: 'Hassan, Rabat', price: '12,500', image: 'https://images.pexels.com/photos/1170412/pexels-photo-1170412.jpeg?auto=compress&w=600' },
  { id: '6', title: 'Luxury Auto Showroom', location: 'Route de Casablanca, Rabat', price: '85,000', image: 'https://images.pexels.com/photos/3954402/pexels-photo-3954402.jpeg?auto=compress&w=600' },
  { id: '7', title: 'Secure Distribution Center', location: 'Akkari Industrial Zone', price: '35,000', image: 'https://images.pexels.com/photos/4481259/pexels-photo-4481259.jpeg?auto=compress&w=600' },
  { id: '8', title: 'Trendy High-Footfall Store', location: "Quartier de l'Océan, Rabat", price: '9,500', image: 'https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg?auto=compress&w=600' },
]

const row3: Listing[] = [
  { id: '9', title: 'Premium Tech Hub Office', location: 'Hay Riad, Rabat', price: '28,000', sqm: '210 sqm', image: 'https://images.pexels.com/photos/380768/pexels-photo-380768.jpeg?auto=compress&w=600' },
  { id: '10', title: 'Luxury Boutique Unit', location: 'Agdal, Rabat', price: '15,500', sqm: '95 sqm', image: 'https://images.pexels.com/photos/342800/pexels-photo-342800.jpeg?auto=compress&w=600' },
  { id: '11', title: 'Smart Logistics Center', location: 'Technopolis, Rabat', price: '42,000', sqm: '1,200 sqm', image: 'https://images.pexels.com/photos/2760243/pexels-photo-2760243.jpeg?auto=compress&w=600' },
  { id: '12', title: 'Modern Co-working Floor', location: 'Hassan, Rabat', price: '19,000', sqm: '180 sqm', image: 'https://images.pexels.com/photos/1170412/pexels-photo-1170412.jpeg?auto=compress&w=600' },
]

const row4: Listing[] = [
  { id: '13', title: 'Flagship Auto Showroom', location: 'Route de Casablanca, Rabat', price: '95,000', sqm: '650 sqm', image: 'https://images.pexels.com/photos/3954402/pexels-photo-3954402.jpeg?auto=compress&w=600' },
  { id: '14', title: 'High-Footfall Corner Store', location: "Quartier de l'Océan, Rabat", price: '12,000', sqm: '110 sqm', image: 'https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg?auto=compress&w=600' },
  { id: '15', title: 'Executive Marina Suite', location: 'Marina District, Rabat', price: '35,000', sqm: '320 sqm', image: 'https://images.pexels.com/photos/260689/pexels-photo-260689.jpeg?auto=compress&w=600' },
  { id: '16', title: 'Modern Dental Clinic Space', location: 'Agdal-Riad, Rabat', price: '22,500', sqm: '145 sqm', image: 'https://images.pexels.com/photos/247786/pexels-photo-247786.jpeg?auto=compress&w=600' },
]

const row5: Listing[] = [
  { id: '17', title: 'Oceanfront Corporate Suite', location: 'Marina, Rabat', price: '55,000', image: 'https://images.pexels.com/photos/260689/pexels-photo-260689.jpeg?auto=compress&w=600' },
  { id: '18', title: 'Agdal Retail Flagship', location: 'Agdal, Rabat', price: '32,000', image: 'https://images.pexels.com/photos/1005638/pexels-photo-1005638.jpeg?auto=compress&w=600' },
  { id: '19', title: 'Industrial Logistics Park', location: 'Technopolis, Rabat', price: '120,000', image: 'https://images.pexels.com/photos/236722/pexels-photo-236722.jpeg?auto=compress&w=600' },
  { id: '20', title: 'Souissi Executive Villa', location: 'Souissi, Rabat', price: '48,000', image: 'https://images.pexels.com/photos/280221/pexels-photo-280221.jpeg?auto=compress&w=600' },
]

const row6: Listing[] = [
  { id: '21', title: 'Modern Tech Loft', location: 'Hassan, Rabat', price: '15,500', image: 'https://images.pexels.com/photos/1170412/pexels-photo-1170412.jpeg?auto=compress&w=600' },
  { id: '22', title: 'Luxury Car Gallery', location: 'Route de Casablanca, Rabat', price: '95,000', image: 'https://images.pexels.com/photos/3954402/pexels-photo-3954402.jpeg?auto=compress&w=600' },
  { id: '23', title: 'Smart Storage Hub', location: 'Akkari, Rabat', price: '28,000', image: 'https://images.pexels.com/photos/4481259/pexels-photo-4481259.jpeg?auto=compress&w=600' },
  { id: '24', title: 'Boutique Corner Shop', location: 'Ocean District, Rabat', price: '11,000', image: 'https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg?auto=compress&w=600' },
]

const row7: Listing[] = [
  { id: '25', title: 'Skyline Business Center', location: 'Hay Riad, Rabat', price: '65,000', image: 'https://images.pexels.com/photos/380768/pexels-photo-380768.jpeg?auto=compress&w=600' },
  { id: '26', title: 'Premium Medical Clinic', location: 'Agdal-Riad, Rabat', price: '24,500', image: 'https://images.pexels.com/photos/342800/pexels-photo-342800.jpeg?auto=compress&w=600' },
  { id: '27', title: 'Urban Co-working Space', location: 'Hassan, Rabat', price: '18,000', image: 'https://images.pexels.com/photos/2760243/pexels-photo-2760243.jpeg?auto=compress&w=600' },
  { id: '28', title: 'Marina Executive Office', location: 'Marina District, Rabat', price: '42,000', image: 'https://images.pexels.com/photos/1170412/pexels-photo-1170412.jpeg?auto=compress&w=600' },
]

const allMainRows = [row1, row2, row3, row4, row5, row6, row7]

function ProjectCard({ project }: { project: Project }) {
  return (
    <div style={{ backgroundColor: 'white', borderRadius: '1.5rem', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.06)', border: '1px solid rgba(186,202,197,0.1)', transition: 'box-shadow 0.3s' }}
      onMouseEnter={e => e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.12)'}
      onMouseLeave={e => e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.06)'}
    >
      <div style={{ position: 'relative', aspectRatio: '4/3', overflow: 'hidden' }}>
        <img src={project.image} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', top: '16px', left: '16px', background: 'linear-gradient(135deg, #2dd4bf 0%, #3cddc7 100%)', color: 'white', padding: '4px 12px', borderRadius: '100px', fontSize: '10px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, display: 'flex', alignItems: 'center', gap: '4px' }}>
          <Diamond size={14} /> Diamond Member
        </div>
      </div>
      <div style={{ padding: '20px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#161d1b', marginBottom: '4px' }}>{project.title}</h3>
        <p style={{ fontSize: '14px', color: '#3c4a46', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '4px' }}>
          <MapPin size={16} /> {project.location}
        </p>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button style={{ flex: 1, border: '1px solid #bacac5', backgroundColor: 'transparent', color: '#3c4a46', padding: '8px', borderRadius: '12px', fontSize: '14px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            <MessageCircle size={18} /> Message
          </button>
          <button style={{ flex: 1, backgroundColor: '#2dd4bf', color: '#0f9b8e', padding: '8px', borderRadius: '12px', border: 'none', fontSize: '14px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            <Phone size={18} /> WhatsApp
          </button>
        </div>
      </div>
    </div>
  )
}

function ListingCard({ item }: { item: Listing }) {
  const [saved, setSaved] = useState(false)
  return (
    <div style={{ backgroundColor: 'white', borderRadius: '1.5rem', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.06)', border: '1px solid rgba(186,202,197,0.1)', transition: 'all 0.3s' }}
      onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.12)'; e.currentTarget.style.transform = 'translateY(-4px)' }}
      onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.06)'; e.currentTarget.style.transform = 'translateY(0)' }}
    >
      <div style={{ position: 'relative', aspectRatio: '4/3', overflow: 'hidden' }}>
        <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.7s' }}
          onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
        />
        <div style={{ position: 'absolute', top: '16px', left: '16px', background: 'linear-gradient(135deg, #2dd4bf 0%, #3cddc7 100%)', color: 'white', padding: '4px 12px', borderRadius: '100px', fontSize: '10px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, display: 'flex', alignItems: 'center', gap: '4px' }}>
          <Diamond size={14} /> Verified Member
        </div>
        <button onClick={() => setSaved(!saved)} style={{ position: 'absolute', top: '16px', right: '16px', backgroundColor: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(12px)', border: 'none', borderRadius: '50%', width: '36px', height: '36px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
          <Heart size={18} fill={saved ? 'white' : 'none'} />
        </button>
      </div>
      <div style={{ padding: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px', gap: '8px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#161d1b', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical' as const }}>{item.title}</h3>
          <div style={{ color: '#2dd4bf', fontWeight: 700, fontSize: '18px', whiteSpace: 'nowrap' as const }}>{item.price} MAD</div>
        </div>
        <p style={{ fontSize: '14px', color: '#3c4a46', marginBottom: item.sqm || item.tag ? '16px' : '16px', display: 'flex', alignItems: 'center', gap: '4px' }}>
          <MapPin size={16} /> {item.location}
        </p>
        {(item.sqm || item.tag) && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', color: '#3c4a46', fontSize: '12px', fontWeight: 600, marginBottom: '24px' }}>
            {item.tag && <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>● {item.tag}</span>}
            {item.sqm && <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>📐 {item.sqm}</span>}
          </div>
        )}
        <div style={{ display: 'flex', gap: '8px', marginTop: (item.sqm || item.tag) ? 0 : '8px' }}>
          <button style={{ flex: 1, backgroundColor: '#e2eae7', color: '#3c4a46', padding: '8px', borderRadius: '12px', border: 'none', fontSize: '14px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', transition: 'all 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#2dd4bf'; e.currentTarget.style.color = 'white' }}
            onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#e2eae7'; e.currentTarget.style.color = '#3c4a46' }}>
            <MessageCircle size={18} /> Message
          </button>
          <button style={{ flex: 1, backgroundColor: '#2dd4bf', color: '#0f9b8e', padding: '8px', borderRadius: '12px', border: 'none', fontSize: '14px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            <Phone size={18} /> WhatsApp
          </button>
        </div>
      </div>
    </div>
  )
}

function ListingGrid({ items, viewMode }: { items: Listing[], viewMode: 'grid' | 'list' }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: viewMode === 'grid' ? 'repeat(4,1fr)' : '1fr', gap: '16px', marginBottom: '16px' }}>
      {items.map(item => <ListingCard key={item.id} item={item} viewMode={viewMode} />)}
    </div>
  )
}

export default function CommercialPropertiesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = React.use(params)
  const [activeCategory, setActiveCategory] = useState('Business')
  const [diamondFirst, setDiamondFirst] = useState(true)
  const [activeStatus, setActiveStatus] = useState('ALL')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  return (
    <div style={{ fontFamily: 'Hanken Grotesk, Inter, sans-serif', backgroundColor: '#f4fbf8', color: '#161d1b', minHeight: '100vh', paddingBottom: '90px' }}>

      {/* ── HEADER ── */}
      <header style={{ backgroundColor: 'rgba(244,251,248,0.8)', backdropFilter: 'blur(20px)', position: 'sticky', top: 0, zIndex: 50, borderBottom: '1px solid rgba(255,255,255,0.4)', boxShadow: '0 1px 2px rgba(0,0,0,0.04)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 40px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
              <Link href={`/${locale}`} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '22px', fontWeight: 900, color: '#2dd4bf', letterSpacing: '-0.02em' }}>SouKni</span>
              </Link>
              <button style={{ backgroundColor: '#e2eae7', padding: '8px 16px', borderRadius: '100px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: 600, color: '#3c4a46', border: 'none', cursor: 'pointer' }}>
                <MapPin size={18} /> Cities: Rabat
              </button>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', color: '#3c4a46' }}>
                <Globe size={20} style={{ cursor: 'pointer' }} />
                <span style={{ fontSize: '18px', cursor: 'pointer' }}>💳</span>
                <Heart size={20} style={{ cursor: 'pointer' }} />
                <span style={{ position: 'relative', cursor: 'pointer' }}>🔔<span style={{ position: 'absolute', top: '-2px', right: '-2px', width: '8px', height: '8px', backgroundColor: '#ba1a1a', borderRadius: '50%', border: '2px solid #f4fbf8' }} /></span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <button style={{ fontSize: '13px', fontWeight: 600, color: '#3c4a46', background: 'none', border: 'none', cursor: 'pointer' }}>Log in</button>
                <button style={{ backgroundColor: '#2dd4bf', color: '#0f9b8e', padding: '10px 24px', borderRadius: '100px', fontWeight: 700, fontSize: '13px', border: 'none', cursor: 'pointer', boxShadow: '0 4px 12px rgba(45,212,191,0.3)', whiteSpace: 'nowrap' as const }}>
                  Place Your 100% FREE Ad
                </button>
              </div>
            </div>
          </div>
          {/* NAV */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: '32px', padding: '12px 0', borderTop: '1px solid rgba(186,202,197,0.2)' }}>
            <span style={{ fontSize: '13px', color: '#3c4a46', cursor: 'pointer', fontWeight: 600 }}>Motors</span>
            <span style={{ fontSize: '13px', color: '#2dd4bf', fontWeight: 700, borderBottom: '2px solid #2dd4bf', paddingBottom: '4px', cursor: 'pointer' }}>Property</span>
            {['Jobs', 'Classifieds', 'Community'].map(item => (
              <span key={item} style={{ fontSize: '13px', color: '#3c4a46', cursor: 'pointer', fontWeight: 600 }}>{item}</span>
            ))}
            <span style={{ fontSize: '13px', color: '#3c4a46', cursor: 'pointer', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>The Vault 🔒</span>
          </nav>
        </div>
      </header>

      {/* ── HERO ── */}
      <section style={{ position: 'relative', height: '480px', overflow: 'hidden' }}>
        <img src="https://images.pexels.com/photos/378570/pexels-photo-378570.jpeg?auto=compress&w=1600" alt="Rabat skyline" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #f4fbf8, transparent, rgba(0,0,0,0.2))' }} />
        <div style={{ position: 'relative', zIndex: 10, maxWidth: '1280px', margin: '0 auto', padding: '0 40px', height: '100%', display: 'flex', flexDirection: 'column' as const, justifyContent: 'center', alignItems: 'center' }}>
          <h1 style={{ color: 'white', fontSize: '48px', fontWeight: 700, textAlign: 'center' as const, marginBottom: '32px', textShadow: '0 4px 12px rgba(0,0,0,0.4)' }}>Find Your Business Home in Rabat</h1>
          <div style={{ width: '100%', maxWidth: '1100px', backgroundColor: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.4)', padding: '24px', borderRadius: '2rem', boxShadow: '0 25px 50px rgba(0,0,0,0.25)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 0 }}>
              {[
                { label: 'Purpose', value: 'Rent', type: 'select' },
                { label: 'Location', value: 'Search areas in Rabat...', type: 'input' },
                { label: 'Property Type', value: 'All Commercial', type: 'select' },
                { label: 'Price Range', value: 'Any MAD', type: 'text' },
              ].map((f, i) => (
                <div key={f.label} style={{ padding: '8px 16px', borderRight: '1px solid rgba(186,202,197,0.3)' }}>
                  <label style={{ display: 'block', fontSize: '10px', textTransform: 'uppercase' as const, letterSpacing: '0.08em', color: '#3c4a46', marginBottom: '4px', fontWeight: 700 }}>{f.label}</label>
                  {f.type === 'input'
                    ? <input placeholder={f.value} style={{ width: '100%', border: 'none', outline: 'none', background: 'transparent', fontWeight: 600, fontSize: '15px', fontFamily: 'inherit', color: '#161d1b' }} />
                    : f.type === 'select'
                    ? <select style={{ width: '100%', border: 'none', outline: 'none', background: 'transparent', fontWeight: 600, fontSize: '15px', fontFamily: 'inherit', cursor: 'pointer' }}><option>{f.value}</option></select>
                    : <div style={{ fontWeight: 600, fontSize: '15px' }}>{f.value}</div>
                  }
                </div>
              ))}
              <div style={{ padding: '8px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '10px', textTransform: 'uppercase' as const, letterSpacing: '0.08em', color: '#3c4a46', marginBottom: '4px', fontWeight: 700 }}>Advanced</label>
                  <span style={{ fontWeight: 600, fontSize: '15px' }}>Filters</span>
                </div>
                <button style={{ backgroundColor: '#2dd4bf', color: 'white', width: '48px', height: '48px', borderRadius: '50%', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 16px rgba(0,107,95,0.3)', flexShrink: 0 }}>
                  <Search size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 40px' }}>
        {/* CATEGORY PILLS */}
        <div style={{ marginTop: '-32px', position: 'relative', zIndex: 20, display: 'flex', gap: '12px', overflowX: 'auto' as const, paddingBottom: '16px' }}>
          {categoryPills.map(c => (
            <button key={c.label} onClick={() => setActiveCategory(c.label)}
              style={{ whiteSpace: 'nowrap' as const, padding: '10px 24px', borderRadius: '100px', fontSize: '13px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.08)', border: activeCategory === c.label ? 'none' : '1px solid #bacac5', backgroundColor: activeCategory === c.label ? '#2b3230' : 'white', color: activeCategory === c.label ? 'white' : '#161d1b' }}>
              <c.icon size={18} /> {c.label}
            </button>
          ))}
          <button style={{ whiteSpace: 'nowrap' as const, padding: '10px 24px', borderRadius: '100px', fontSize: '13px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.08)', border: 'none', backgroundColor: '#2b3230', color: 'white' }}>
            <MoreHorizontal size={18} /> View More
          </button>
        </div>

        {/* RESULTS HEADER */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px', borderBottom: '1px solid rgba(186,202,197,0.3)', paddingBottom: '16px', flexWrap: 'wrap' as const, gap: '16px' }}>
          <div>
            <h2 style={{ fontSize: '24px', fontWeight: 600 }}>Commercial Properties for Rent/Sale in Rabat</h2>
            <p style={{ fontSize: '16px', color: '#3c4a46' }}>25,186 Active Listings found in Rabat District</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap' as const }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', paddingRight: '24px', borderRight: '1px solid rgba(186,202,197,0.3)' }}>
              {['ALL', 'READY', 'OFF-PLAN'].map(s => (
                <button key={s} onClick={() => setActiveStatus(s)} style={{ padding: '6px 16px', borderRadius: '100px', fontSize: '13px', fontWeight: 600, cursor: 'pointer', border: activeStatus === s ? 'none' : '1px solid rgba(186,202,197,0.3)', backgroundColor: activeStatus === s ? '#2dd4bf' : 'white', color: activeStatus === s ? 'white' : '#3c4a46' }}>{s}</button>
              ))}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontSize: '13px', fontWeight: 600, color: '#3c4a46' }}>Show SouKni Diamond Verified First</span>
              <button onClick={() => setDiamondFirst(!diamondFirst)} style={{ position: 'relative', width: '44px', height: '24px', borderRadius: '100px', backgroundColor: diamondFirst ? '#2dd4bf' : '#dde4e1', border: 'none', cursor: 'pointer' }}>
                <div style={{ position: 'absolute', top: '2px', left: diamondFirst ? '22px' : '2px', width: '20px', height: '20px', borderRadius: '50%', backgroundColor: 'white', transition: 'left 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }} />
              </button>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', border: '1px solid rgba(186,202,197,0.3)', borderRadius: '8px', padding: '4px', backgroundColor: 'white' }}>
              <button onClick={() => setViewMode('grid')} style={{ padding: '6px', backgroundColor: viewMode === 'grid' ? '#e2eae7' : 'transparent', borderRadius: '6px', border: 'none', cursor: 'pointer', color: viewMode === 'grid' ? '#2dd4bf' : '#3c4a46', display: 'flex' }}><Grid3x3 size={20} /></button>
              <button onClick={() => setViewMode('list')} style={{ padding: '6px', backgroundColor: viewMode === 'list' ? '#e2eae7' : 'transparent', borderRadius: '6px', border: 'none', cursor: 'pointer', color: viewMode === 'list' ? '#2dd4bf' : '#3c4a46', display: 'flex' }}><List size={20} /></button>
            </div>
          </div>
        </div>

        {/* SORT BAR */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', backgroundColor: '#eef5f2', padding: '16px', borderRadius: '12px', border: '1px solid rgba(186,202,197,0.1)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: 'white', padding: '8px 16px', borderRadius: '8px', border: '1px solid rgba(186,202,197,0.3)', cursor: 'pointer' }}>
              <Sliders size={18} color="#3c4a46" /><span style={{ fontSize: '13px', fontWeight: 600 }}>Sort: Popular</span><ChevronDown size={18} color="#3c4a46" />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#3c4a46' }}>
              <ChevronLeft size={20} style={{ cursor: 'pointer' }} /><ChevronRight size={20} style={{ cursor: 'pointer' }} />
            </div>
          </div>
          <button style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#2dd4bf', fontWeight: 600, fontSize: '13px', background: 'none', border: 'none', cursor: 'pointer', padding: '8px 16px', borderRadius: '8px' }}>
            <Bookmark size={20} /> Save Search
          </button>
        </div>

        {/* NEW PROJECTS */}
        <section style={{ marginBottom: '48px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 600 }}>New Projects in Rabat</h2>
            <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#2dd4bf', fontWeight: 700, textDecoration: 'none' }}>View All →</a>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '16px' }}>
            {newProjects.map(p => <ProjectCard key={p.id} project={p} />)}
          </div>
        </section>

        {/* MAIN GRID + INTERLEAVED BANNERS */}
        <ListingGrid items={row1} viewMode={viewMode} />

        {/* DIAMOND BANNER */}
        <div style={{ margin: '32px 0' }}>
          <div style={{ backgroundColor: '#2dd4bf', borderRadius: '2.5rem', padding: '48px', minHeight: '220px', display: 'flex', flexDirection: 'column' as const, justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
            <span style={{ backgroundColor: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(8px)', color: 'white', fontSize: '10px', fontWeight: 700, textTransform: 'uppercase' as const, letterSpacing: '0.08em', padding: '4px 12px', borderRadius: '100px', border: '1px solid rgba(255,255,255,0.3)', display: 'inline-block', width: 'fit-content', marginBottom: '16px' }}>Limited Offer</span>
            <h2 style={{ color: 'white', fontSize: '32px', fontWeight: 700, marginBottom: '16px', maxWidth: '600px' }}>Upgrade to SouKni Diamond Membership</h2>
            <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '16px', marginBottom: '24px', maxWidth: '600px' }}>Get 5x more visibility, professional verification badge, and 24/7 dedicated support for your commercial listings.</p>
            <button style={{ backgroundColor: 'white', color: '#2dd4bf', padding: '12px 32px', borderRadius: '100px', fontWeight: 700, border: 'none', cursor: 'pointer', width: 'fit-content', boxShadow: '0 8px 16px rgba(0,0,0,0.15)', transition: 'transform 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
              Get Started Today
            </button>
          </div>
        </div>

        <ListingGrid items={row2} viewMode={viewMode} />
        <ListingGrid items={row3} viewMode={viewMode} />

        {/* APP DOWNLOAD BANNER */}
        <section style={{ margin: '32px 0 48px' }}>
          <div style={{ backgroundColor: '#e8efec', borderRadius: '2.5rem', overflow: 'hidden', border: '1px solid rgba(186,202,197,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '48px', gap: '32px', flexWrap: 'wrap' as const }}>
            <div style={{ flex: 1, minWidth: '320px' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: 'rgba(0,107,95,0.1)', color: '#2dd4bf', padding: '6px 16px', borderRadius: '100px', fontSize: '13px', fontWeight: 600, marginBottom: '24px' }}>
                <Smartphone size={18} /> Download the SouKni App
              </div>
              <h2 style={{ fontSize: '40px', fontWeight: 700, marginBottom: '16px', lineHeight: 1.2 }}>Join the SouKni Family</h2>
              <p style={{ fontSize: '18px', color: '#3c4a46', marginBottom: '32px', maxWidth: '420px' }}>Get the best commercial property deals delivered straight to your pocket. Faster, smarter, and always verified.</p>
              <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: '12px' }}>
                {[
                  { icon: '📱', top: 'Download on the', bottom: 'App Store' },
                  { icon: '▶', top: 'Get it on', bottom: 'Google Play' },
                  { icon: '⊞', top: 'Explore it on', bottom: 'AppGallery' },
                ].map(s => (
                  <button key={s.bottom} style={{ backgroundColor: 'black', color: 'white', padding: '10px 20px', borderRadius: '12px', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ fontSize: '24px' }}>{s.icon}</span>
                    <div style={{ textAlign: 'left' as const }}>
                      <p style={{ fontSize: '10px', textTransform: 'uppercase' as const, opacity: 0.7 }}>{s.top}</p>
                      <p style={{ fontSize: '14px', fontWeight: 700 }}>{s.bottom}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
            <div style={{ flex: 1, minWidth: '280px', display: 'flex', justifyContent: 'center' }}>
              <img src="https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&w=500" alt="SouKni App" style={{ width: '100%', maxWidth: '320px', borderRadius: '1.5rem', boxShadow: '0 25px 50px rgba(0,0,0,0.2)', transform: 'rotate(4deg)' }} />
            </div>
          </div>
        </section>

        <ListingGrid items={row4} viewMode={viewMode} />
        <ListingGrid items={row5} viewMode={viewMode} />
        <ListingGrid items={row6} viewMode={viewMode} />
        <ListingGrid items={row7} viewMode={viewMode} />

        {/* LOAD MORE */}
        <div style={{ display: 'flex', flexDirection: 'column' as const, alignItems: 'center', gap: '24px', marginTop: '64px', paddingTop: '32px', paddingBottom: '32px', borderTop: '1px solid rgba(186,202,197,0.3)' }}>
          <p style={{ color: '#3c4a46', fontSize: '16px' }}>You've viewed 28 of 25,186 properties</p>
          <button style={{ backgroundColor: '#e2eae7', color: '#2dd4bf', padding: '16px 48px', borderRadius: '100px', fontWeight: 700, border: 'none', cursor: 'pointer', boxShadow: '0 1px 3px rgba(0,0,0,0.06)', transition: 'all 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#2dd4bf'; e.currentTarget.style.color = 'white' }}
            onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#e2eae7'; e.currentTarget.style.color = '#2dd4bf' }}>
            Load More Listings
          </button>
        </div>
      </div>

      {/* ── FOOTER ── */}
      <footer style={{ backgroundColor: '#7A7A7A', color: 'white', padding: '64px 40px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '48px', marginBottom: '64px' }}>
            <div>
              <h3 style={{ fontSize: '24px', fontWeight: 600, marginBottom: '24px' }}>SouKni Rabat</h3>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '16px', marginBottom: '32px', lineHeight: 1.6 }}>The premier marketplace for commercial excellence in Morocco's capital. Connecting professionals with their ideal workspaces since 2018.</p>
              <div style={{ display: 'flex', gap: '16px' }}>
                <button style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.1)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}><Globe size={20} /></button>
                <button style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.1)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}><Link2 size={20} /></button>
                <button style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.1)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}><Share2 size={20} /></button>
              </div>
            </div>
            <div>
              <h4 style={{ fontSize: '13px', textTransform: 'uppercase' as const, letterSpacing: '0.08em', opacity: 0.6, marginBottom: '24px' }}>Company</h4>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column' as const, gap: '16px' }}>
                {['About Us', 'Careers', 'Press', 'Blog'].map(l => <li key={l}><a href="#" style={{ color: 'white', textDecoration: 'none', fontSize: '16px' }}>{l}</a></li>)}
              </ul>
            </div>
            <div>
              <h4 style={{ fontSize: '13px', textTransform: 'uppercase' as const, letterSpacing: '0.08em', opacity: 0.6, marginBottom: '24px' }}>Legal</h4>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column' as const, gap: '16px' }}>
                {['Terms of Service', 'Privacy Policy', 'Cookies Policy', 'Commercial Licenses'].map(l => <li key={l}><a href="#" style={{ color: 'white', textDecoration: 'none', fontSize: '16px' }}>{l}</a></li>)}
              </ul>
            </div>
            <div>
              <h4 style={{ fontSize: '13px', textTransform: 'uppercase' as const, letterSpacing: '0.08em', opacity: 0.6, marginBottom: '24px' }}>Mobile App</h4>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '16px', marginBottom: '24px' }}>Experience SouKni on the go. Available for iOS and Android.</p>
              <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '12px' }}>
                {[
                  { top: 'Download on the', bottom: 'App Store' },
                  { top: 'Get it on', bottom: 'Google Play' },
                ].map(s => (
                  <button key={s.bottom} style={{ backgroundColor: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '8px 16px', display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', color: 'white' }}>
                    <Smartphone size={24} />
                    <div style={{ textAlign: 'left' as const }}>
                      <p style={{ fontSize: '10px', textTransform: 'uppercase' as const, opacity: 0.6 }}>{s.top}</p>
                      <p style={{ fontSize: '14px', fontWeight: 700 }}>{s.bottom}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div style={{ paddingTop: '32px', borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', flexWrap: 'wrap' as const, justifyContent: 'space-between', alignItems: 'center', gap: '16px' }}>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px' }}>© 2026 SouKni Marketplace. Premium Property Solutions. All Rights Reserved.</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px', color: 'rgba(255,255,255,0.4)', fontSize: '13px' }}>
              <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Sitemap</a>
              <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Global Network</a>
              <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Support</a>
            </div>
          </div>
        </div>
      </footer>

      {/* ── MOBILE BOTTOM NAV ── */}
      <nav style={{ position: 'fixed', bottom: 0, left: 0, width: '100%', backgroundColor: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.4)', zIndex: 50, height: '80px', display: 'none', alignItems: 'center', justifyContent: 'space-around', borderRadius: '1.5rem 1.5rem 0 0', boxShadow: '0 -8px 24px rgba(0,0,0,0.1)' }} className="md:hidden">
        <div style={{ display: 'flex', flexDirection: 'column' as const, alignItems: 'center', gap: '4px', color: '#2dd4bf' }}>
          <Compass size={24} /><span style={{ fontSize: '10px' }}>Explore</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' as const, alignItems: 'center', gap: '4px', color: 'rgba(60,74,70,0.6)' }}>
          <Heart size={24} /><span style={{ fontSize: '10px' }}>Saved</span>
        </div>
        <div style={{ position: 'relative', top: '-24px' }}>
          <button style={{ width: '56px', height: '56px', backgroundColor: '#2dd4bf', color: 'white', borderRadius: '50%', border: '4px solid #f4fbf8', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 24px rgba(0,0,0,0.2)' }}>
            <Plus size={32} />
          </button>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' as const, alignItems: 'center', gap: '4px', color: 'rgba(60,74,70,0.6)' }}>
          <MessageSquare size={24} /><span style={{ fontSize: '10px' }}>Messages</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' as const, alignItems: 'center', gap: '4px', color: 'rgba(60,74,70,0.6)' }}>
          <Menu size={24} /><span style={{ fontSize: '10px' }}>Menu</span>
        </div>
      </nav>
    </div>
  )
}
