'use client'

import React, { useState } from 'react'
import Link from 'next/link'

const categoryPills = [
  { label: 'Mathematics', count: '1.2k', active: true },
  { label: 'Languages', count: '840', active: false },
  { label: 'Music', count: '420', active: false },
  { label: 'Arts & Design', count: '310', active: false },
  { label: 'Sports', count: '215', active: false },
  { label: 'Professional Training', count: '560', active: false },
]

const listings = [
  {
    id: '1', category: 'Tutors & Classes • Mathematics',
    title: 'Premium Mathematics Tutoring - BAC & University',
    price: '250 MAD', priceUnit: '/ hr', priceHighlight: true,
    badges: [{ label: 'FEATURED', bg: '#161d1b', color: 'white' }, { label: 'VERIFIED', bg: '#006b5f', color: 'white' }],
    tags: ['Online & In-person', 'Advanced / BAC', '8+ Years Exp'],
    location: 'Maârif, Casablanca', time: '2 hours ago',
    image: 'https://images.pexels.com/photos/5905497/pexels-photo-5905497.jpeg?auto=compress&w=500',
  },
  {
    id: '2', category: 'Tutors & Classes • Languages',
    title: 'French Language Masterclass - DELF/DALF Prep',
    price: '180 MAD', priceUnit: '/ hr', priceHighlight: false,
    badges: [],
    tags: ['Group Sessions', 'All Levels'],
    location: 'Hay Riad, Rabat', time: '5 hours ago',
    image: 'https://images.pexels.com/photos/4144923/pexels-photo-4144923.jpeg?auto=compress&w=500',
  },
  {
    id: '3', category: 'Tutors & Classes • Science',
    title: 'Advanced Physics Coaching - Engineering Prep',
    price: '220 MAD', priceUnit: '/ hr', priceHighlight: true,
    badges: [{ label: 'FEATURED', bg: '#161d1b', color: 'white' }, { label: 'VERIFIED', bg: '#006b5f', color: 'white' }],
    tags: ['Online & In-person', 'Advanced / CPGE', '10+ Years Exp'],
    location: 'Maârif, Casablanca', time: '1 hour ago',
    image: 'https://images.pexels.com/photos/3862130/pexels-photo-3862130.jpeg?auto=compress&w=500',
  },
  {
    id: '4', category: 'Tutors & Classes • Languages',
    title: 'English Conversation Fluency - Business Pro',
    price: '150 MAD', priceUnit: '/ hr', priceHighlight: false,
    badges: [],
    tags: ['Online Only', 'Professional', 'Native Speaker'],
    location: 'Agdal, Rabat', time: '3 hours ago',
    image: 'https://images.pexels.com/photos/5212317/pexels-photo-5212317.jpeg?auto=compress&w=500',
  },
  {
    id: '5', category: 'Tutors & Classes • Music',
    title: 'Classical Guitar Lessons for All Ages',
    price: '200 MAD', priceUnit: '/ hr', priceHighlight: false,
    badges: [{ label: 'VERIFIED', bg: '#006b5f', color: 'white' }],
    tags: ['In-person', 'Beginner to Advanced', 'Conservatory Grad'],
    location: 'Hivernage, Marrakech', time: '4 hours ago',
    image: 'https://images.pexels.com/photos/1407322/pexels-photo-1407322.jpeg?auto=compress&w=500',
  },
  {
    id: '6', category: 'Tutors & Classes • Professional Training',
    title: 'Digital Marketing Certification Masterclass',
    price: '400 MAD', priceUnit: '/ hr', priceHighlight: true,
    badges: [{ label: 'FEATURED', bg: '#161d1b', color: 'white' }],
    tags: ['Online & In-person', 'Certification', 'Industry Expert'],
    location: 'Casablanca Finance City', time: '6 hours ago',
    image: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&w=500',
  },
]

const gridListings = [
  {
    id: '7', category: 'Arts & Design',
    title: 'Professional Arabic Calligraphy',
    price: '200 MAD', priceHighlight: true,
    badges: [{ label: 'VERIFIED', bg: '#006b5f', color: 'white' }],
    tags: ['In-person', 'All Levels', 'Master Artist'],
    location: 'Marrakech',
    image: 'https://images.pexels.com/photos/4050315/pexels-photo-4050315.jpeg?auto=compress&w=400',
  },
  {
    id: '8', category: 'Technology',
    title: 'Full-Stack Web Development',
    price: '350 MAD', priceHighlight: true,
    badges: [{ label: 'FEATURED', bg: '#161d1b', color: 'white' }, { label: 'VERIFIED', bg: '#006b5f', color: 'white' }],
    tags: ['Online', 'Advanced', 'Senior Dev'],
    location: 'Casablanca',
    image: 'https://images.pexels.com/photos/1181271/pexels-photo-1181271.jpeg?auto=compress&w=400',
  },
  {
    id: '9', category: 'Arts & Design',
    title: 'Interior Design Fundamentals',
    price: '280 MAD', priceHighlight: false,
    badges: [{ label: 'VERIFIED', bg: '#006b5f', color: 'white' }],
    tags: ['Hybrid', 'Beginner', 'Pro Designer'],
    location: 'Rabat',
    image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&w=400',
  },
  {
    id: '10', category: 'Wellness',
    title: 'Yoga & Mindfulness Coach',
    price: '150 MAD', priceHighlight: false,
    badges: [{ label: 'FEATURED', bg: '#161d1b', color: 'white' }],
    tags: ['In-person', 'All Levels', 'Certified'],
    location: 'Agadir',
    image: 'https://images.pexels.com/photos/3822864/pexels-photo-3822864.jpeg?auto=compress&w=400',
  },
]

const subNav = ['Motors', 'Property', 'Jobs', 'The Vault', 'Services', 'Mobiles & Tablets', 'Community']

function ListingCard({ listing }: { listing: typeof listings[0] }) {
  const [liked, setLiked] = useState(false)
  const [hovered, setHovered] = useState(false)

  return (
    <article
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        backgroundColor: 'white', borderRadius: '16px',
        border: '1px solid rgba(186,202,197,0.5)', padding: '16px',
        display: 'flex', flexDirection: 'row', gap: '24px',
        fontFamily: 'Inter, sans-serif',
        transition: 'all 0.3s',
        boxShadow: hovered ? '0 10px 25px -5px rgba(0,0,0,0.08)' : '0 1px 3px rgba(0,0,0,0.04)',
        transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
      }}
    >
      {/* Image */}
      <div style={{ width: '256px', height: '192px', borderRadius: '12px', overflow: 'hidden', position: 'relative', flexShrink: 0, backgroundColor: '#e8efec' }}>
        <img
          src={listing.image}
          alt={listing.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s', transform: hovered ? 'scale(1.05)' : 'scale(1)' }}
        />
        {listing.badges.length > 0 && (
          <div style={{ position: 'absolute', top: '12px', left: '12px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {listing.badges.map((badge, i) => (
              <span key={i} style={{ backgroundColor: badge.bg, color: badge.color, fontSize: '10px', fontWeight: 900, padding: '4px 10px', borderRadius: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                {badge.label}
              </span>
            ))}
          </div>
        )}
        <button
          onClick={() => setLiked(!liked)}
          style={{ position: 'absolute', top: '12px', right: '12px', backgroundColor: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(4px)', border: 'none', width: '36px', height: '36px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
        >
          <span style={{ color: liked ? '#ef4444' : '#161d1b' }}>{liked ? '♥' : '♡'}</span>
        </button>
      </div>

      {/* Content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '4px 0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
          <div style={{ flex: 1, paddingRight: '16px' }}>
            <p style={{ fontSize: '10px', color: '#006b5f', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 900, marginBottom: '4px' }}>{listing.category}</p>
            <a href="#" style={{ fontSize: '18px', fontWeight: 700, color: '#161d1b', textDecoration: 'none', lineHeight: 1.3, display: 'block', transition: 'color 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.color = '#006b5f'}
              onMouseLeave={e => e.currentTarget.style.color = '#161d1b'}
            >{listing.title}</a>
          </div>
          <div style={{ textAlign: 'right', flexShrink: 0 }}>
            <p style={{ fontSize: '22px', fontWeight: 900, color: listing.priceHighlight ? '#006b5f' : '#161d1b', whiteSpace: 'nowrap' }}>
              {listing.price} <span style={{ fontSize: '12px', fontWeight: 400, color: '#7A7A7A' }}>{listing.priceUnit}</span>
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
          {listing.tags.map((tag, i) => (
            <span key={i} style={{ backgroundColor: '#e8efec', padding: '6px 12px', borderRadius: '8px', fontSize: '12px', fontWeight: 700, color: '#3c4a46' }}>{tag}</span>
          ))}
        </div>

        <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '16px', borderTop: '1px solid rgba(186,202,197,0.2)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#6b7a76', fontWeight: 500 }}>
            <span style={{ fontSize: '14px' }}>📍</span>
            {listing.location} • {listing.time}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button style={{ padding: '10px', border: '1px solid #006b5f', color: '#006b5f', backgroundColor: 'transparent', borderRadius: '12px', cursor: 'pointer', fontSize: '16px', transition: 'background 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(45,212,191,0.1)'}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
            >📞</button>
            <button style={{ backgroundColor: '#006b5f', color: 'white', border: 'none', padding: '10px 28px', borderRadius: '12px', fontWeight: 900, fontSize: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontFamily: 'Inter, sans-serif', transition: 'all 0.2s', boxShadow: '0 4px 12px rgba(0,107,95,0.2)' }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,107,95,0.3)'; e.currentTarget.style.transform = 'scale(0.98)' }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,107,95,0.2)'; e.currentTarget.style.transform = 'scale(1)' }}
            >💬 Chat</button>
          </div>
        </div>
      </div>
    </article>
  )
}

function GridCard({ listing }: { listing: typeof gridListings[0] }) {
  const [liked, setLiked] = useState(false)
  const [hovered, setHovered] = useState(false)

  return (
    <article
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        backgroundColor: 'white', borderRadius: '16px',
        border: '1px solid rgba(186,202,197,0.5)', padding: '16px',
        display: 'flex', flexDirection: 'column', gap: '16px',
        fontFamily: 'Inter, sans-serif',
        transition: 'all 0.3s',
        boxShadow: hovered ? '0 10px 25px -5px rgba(0,0,0,0.08)' : '0 1px 3px rgba(0,0,0,0.04)',
        transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
      }}
    >
      <div style={{ width: '100%', height: '192px', borderRadius: '12px', overflow: 'hidden', position: 'relative', backgroundColor: '#e8efec' }}>
        <img
          src={listing.image}
          alt={listing.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s', transform: hovered ? 'scale(1.05)' : 'scale(1)' }}
        />
        {listing.badges.length > 0 && (
          <div style={{ position: 'absolute', top: '12px', left: '12px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {listing.badges.map((badge, i) => (
              <span key={i} style={{ backgroundColor: badge.bg, color: badge.color, fontSize: '10px', fontWeight: 900, padding: '4px 10px', borderRadius: '6px', textTransform: 'uppercase' }}>
                {badge.label}
              </span>
            ))}
          </div>
        )}
        <button
          onClick={() => setLiked(!liked)}
          style={{ position: 'absolute', top: '12px', right: '12px', backgroundColor: 'rgba(255,255,255,0.9)', border: 'none', width: '36px', height: '36px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
        >
          <span style={{ color: liked ? '#ef4444' : '#161d1b' }}>{liked ? '♥' : '♡'}</span>
        </button>
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
          <div style={{ flex: 1, paddingRight: '8px' }}>
            <p style={{ fontSize: '10px', color: '#006b5f', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 900, marginBottom: '4px' }}>{listing.category}</p>
            <a href="#" style={{ fontSize: '16px', fontWeight: 700, color: '#161d1b', textDecoration: 'none', lineHeight: 1.3, display: 'block' }}
              onMouseEnter={e => e.currentTarget.style.color = '#006b5f'}
              onMouseLeave={e => e.currentTarget.style.color = '#161d1b'}
            >{listing.title}</a>
          </div>
          <p style={{ fontSize: '18px', fontWeight: 900, color: listing.priceHighlight ? '#006b5f' : '#161d1b', whiteSpace: 'nowrap' }}>
            {listing.price} <span style={{ fontSize: '10px', fontWeight: 400, color: '#7A7A7A' }}>/ hr</span>
          </p>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '16px' }}>
          {listing.tags.map((tag, i) => (
            <span key={i} style={{ backgroundColor: '#e8efec', padding: '4px 8px', borderRadius: '6px', fontSize: '10px', fontWeight: 700, color: '#3c4a46' }}>{tag}</span>
          ))}
        </div>

        <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '16px', borderTop: '1px solid rgba(186,202,197,0.2)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '10px', color: '#6b7a76', fontWeight: 500 }}>
            <span>📍</span>{listing.location}
          </div>
          <div style={{ display: 'flex', gap: '6px' }}>
            <button style={{ padding: '8px', border: '1px solid #006b5f', color: '#006b5f', backgroundColor: 'transparent', borderRadius: '8px', cursor: 'pointer', fontSize: '14px' }}>📞</button>
            <button style={{ backgroundColor: '#006b5f', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '8px', fontWeight: 900, fontSize: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontFamily: 'Inter, sans-serif' }}>
              💬 Chat
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}

export default function TutorsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = React.use(params)
  const [currentPage, setCurrentPage] = useState(2)
  const [activeChip, setActiveChip] = useState('Mathematics')

  return (
    <div style={{ fontFamily: 'Inter, system-ui, sans-serif', backgroundColor: '#f4fbf8', minHeight: '100vh' }}>

      {/* HEADER */}
      <header style={{ backgroundColor: 'rgba(244,251,248,0.8)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(0,107,95,0.1)', position: 'sticky', top: 0, zIndex: 50, width: '100%' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 16px', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '32px', flex: 1 }}>
            <Link href={`/${locale}`} style={{ textDecoration: 'none' }}>
              <span style={{ fontSize: '24px', fontWeight: 900, color: '#006b5f', letterSpacing: '-0.03em' }}>SouKni</span>
            </Link>
            <div style={{ display: 'flex', gap: '8px', flex: 1, maxWidth: '640px' }}>
              <div style={{ width: '192px', padding: '8px 16px 8px 32px', borderRadius: '8px', border: '1px solid #bacac5', backgroundColor: '#f4fbf8', fontSize: '14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', position: 'relative' }}>
                <span style={{ position: 'absolute', left: '10px', color: '#006b5f' }}>📍</span>
                <span>Casablanca</span><span>▾</span>
              </div>
              <div style={{ flex: 1, position: 'relative' }}>
                <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#7A7A7A', fontSize: '16px' }}>🔍</span>
                <input
                  type="text"
                  placeholder="Search for tutors, courses..."
                  style={{ width: '100%', paddingLeft: '40px', paddingRight: '48px', paddingTop: '8px', paddingBottom: '8px', borderRadius: '8px', border: '1px solid #bacac5', backgroundColor: '#f4fbf8', fontSize: '14px', outline: 'none', fontFamily: 'Inter, sans-serif', boxSizing: 'border-box' }}
                />
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button style={{ padding: '8px', color: '#3c4a46', background: 'none', border: 'none', cursor: 'pointer', borderRadius: '50%', fontSize: '20px' }}>🔔</button>
            <button style={{ padding: '8px', color: '#3c4a46', background: 'none', border: 'none', cursor: 'pointer', borderRadius: '50%', fontSize: '20px' }}>♡</button>
            <button style={{ padding: '8px 12px', fontSize: '14px', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer', color: '#161d1b' }}>Sign up / Log in</button>
            <button style={{ backgroundColor: '#006b5f', color: 'white', padding: '8px 24px', borderRadius: '100px', fontSize: '14px', fontWeight: 700, border: 'none', cursor: 'pointer', fontFamily: 'Inter, sans-serif', boxShadow: '0 4px 12px rgba(0,107,95,0.2)' }}>Place your ad</button>
          </div>
        </div>
      </header>

      {/* SUB NAV */}
      <nav style={{ backgroundColor: 'white', borderBottom: '1px solid rgba(186,202,197,0.3)', overflowX: 'auto' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 16px', height: '48px', display: 'flex', alignItems: 'center', gap: '24px', whiteSpace: 'nowrap' }}>
          {subNav.map(item => (
            <a key={item} href="#" style={{ fontSize: '14px', fontWeight: 700, color: item === 'Community' ? '#006b5f' : '#161d1b', textDecoration: 'none', borderBottom: item === 'Community' ? '2px solid #006b5f' : '2px solid transparent', height: '100%', display: 'flex', alignItems: 'center', transition: 'color 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.color = '#006b5f'}
              onMouseLeave={e => e.currentTarget.style.color = item === 'Community' ? '#006b5f' : '#161d1b'}
            >{item}</a>
          ))}
        </div>
      </nav>

      <main style={{ maxWidth: '1280px', margin: '0 auto', padding: '32px 16px' }}>

        {/* FILTER BAR */}
        <div style={{ marginBottom: '32px', backgroundColor: 'white', borderRadius: '16px', boxShadow: '0 1px 4px rgba(0,0,0,0.06)', border: '1px solid rgba(186,202,197,0.5)', display: 'flex', alignItems: 'center', height: '64px', overflow: 'hidden' }}>
          {[
            { label: 'City', value: 'Casablanca', type: 'select' },
            { label: 'Keyword', placeholder: 'What are you looking for?', type: 'input' },
            { label: 'Neighborhood', placeholder: 'Enter location', type: 'text' },
            { label: 'Ads Posted', placeholder: 'Select', type: 'text' },
            { label: 'Filters', value: '1 selected', highlight: true, type: 'text' },
          ].map((field, i) => (
            <div key={i} style={{ flex: i === 1 ? 1.5 : 1, padding: '0 24px', borderRight: i < 4 ? '1px solid rgba(186,202,197,0.3)' : 'none', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', cursor: 'pointer', transition: 'background 0.15s' }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = '#eef5f2'}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              <label style={{ fontSize: '10px', fontWeight: 700, color: '#7A7A7A', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '2px', display: 'block' }}>{field.label}</label>
              {field.type === 'input' ? (
                <input type="text" placeholder={field.placeholder} style={{ border: 'none', padding: 0, fontSize: '14px', fontWeight: 500, outline: 'none', backgroundColor: 'transparent', fontFamily: 'Inter, sans-serif', width: '100%' }} />
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '14px', fontWeight: 700, color: field.highlight ? '#006b5f' : '#161d1b' }}>{field.value || field.placeholder}</span>
                  <span style={{ color: '#006b5f', fontSize: '14px' }}>▾</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* BREADCRUMBS */}
        <nav style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#7A7A7A' }}>
          <a href={`/${locale}`} style={{ color: '#7A7A7A', textDecoration: 'none' }}
            onMouseEnter={e => e.currentTarget.style.color = '#006b5f'}
            onMouseLeave={e => e.currentTarget.style.color = '#7A7A7A'}
          >Home</a>
          <span>›</span>
          <a href="#" style={{ color: '#7A7A7A', textDecoration: 'none' }}
            onMouseEnter={e => e.currentTarget.style.color = '#006b5f'}
            onMouseLeave={e => e.currentTarget.style.color = '#7A7A7A'}
          >Community</a>
          <span>›</span>
          <span style={{ color: '#161d1b', fontWeight: 700 }}>Tutors & Classes</span>
        </nav>

        {/* PAGE HEADER */}
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{ fontSize: '30px', fontWeight: 900, color: '#161d1b', marginBottom: '8px', letterSpacing: '-0.02em' }}>Home Tutors, Private Classes & Courses in Morocco</h1>
          <p style={{ fontSize: '16px', color: 'rgba(60,74,70,0.8)' }}>Discover top-rated educators and skill-building programs near you.</p>
        </div>

        {/* CATEGORY PILLS */}
        <div style={{ display: 'flex', overflowX: 'auto', gap: '12px', paddingBottom: '24px', marginBottom: '32px' }}>
          {categoryPills.map((pill) => (
            <button key={pill.label} onClick={() => setActiveChip(pill.label)} style={{ whiteSpace: 'nowrap', padding: '10px 24px', borderRadius: '100px', border: activeChip === pill.label ? '1px solid #006b5f' : '1px solid #bacac5', backgroundColor: activeChip === pill.label ? 'rgba(45,212,191,0.15)' : 'white', color: activeChip === pill.label ? '#006b5f' : '#161d1b', fontSize: '14px', fontWeight: 700, cursor: 'pointer', fontFamily: 'Inter, sans-serif', transition: 'all 0.15s' }}>
              {pill.label} ({pill.count})
            </button>
          ))}
        </div>

        {/* RESULTS COUNT */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(186,202,197,0.3)', paddingBottom: '16px', marginBottom: '24px' }}>
          <span style={{ fontSize: '14px', color: '#3c4a46', fontWeight: 500 }}>Showing <strong style={{ color: '#161d1b' }}>1,422 ads</strong></span>
          <button style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'none', border: 'none', cursor: 'pointer', fontSize: '12px', color: '#161d1b', fontWeight: 700, fontFamily: 'Inter, sans-serif' }}>
            <span style={{ color: '#7A7A7A' }}>Sort by:</span> Default ▾
          </button>
        </div>

        {/* LISTINGS */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '0' }}>
          {listings.slice(0, 2).map(l => <ListingCard key={l.id} listing={l} />)}
        </div>

        {/* BANNER 1 - Mobiles & Electro Pro */}
        <div style={{ position: 'relative', width: '100%', height: '400px', borderRadius: '24px', overflow: 'hidden', margin: '48px 0 32px', boxShadow: '0 20px 60px rgba(0,0,0,0.15)' }}>
          <img src="https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg?auto=compress&w=1400" alt="Mobiles & Electro" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', transform: 'scale(1.05)' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(22,29,27,0.8), rgba(22,29,27,0.4), transparent)' }} />
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', padding: '32px 64px' }}>
            <div style={{ backgroundColor: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(12px)', padding: '40px', borderRadius: '16px', maxWidth: '480px', boxShadow: '0 20px 60px rgba(0,0,0,0.15)', border: '1px solid rgba(255,255,255,0.5)' }}>
              <h2 style={{ fontSize: '28px', fontWeight: 900, color: '#161d1b', marginBottom: '16px', letterSpacing: '-0.02em' }}>SouKni Mobiles & Electro Pro</h2>
              <p style={{ fontSize: '15px', color: '#3c4a46', lineHeight: 1.6, marginBottom: '32px' }}>Unlock the latest premium tech and elite electronics. Our verified professional network ensures you get the best devices with expert support.</p>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <button style={{ backgroundColor: '#006b5f', color: 'white', border: 'none', padding: '14px 32px', borderRadius: '12px', fontWeight: 900, fontSize: '14px', cursor: 'pointer', fontFamily: 'Inter, sans-serif', boxShadow: '0 4px 14px rgba(0,107,95,0.25)', transition: 'all 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'scale(0.98)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                >Explore Tech</button>
                <button style={{ backgroundColor: 'transparent', color: '#161d1b', border: '2px solid #161d1b', padding: '14px 32px', borderRadius: '12px', fontWeight: 900, fontSize: '14px', cursor: 'pointer', fontFamily: 'Inter, sans-serif', transition: 'all 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#161d1b'; e.currentTarget.style.color = 'white' }}
                  onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#161d1b' }}
                >Contact Expert</button>
              </div>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '0' }}>
          {listings.slice(2).map(l => <ListingCard key={l.id} listing={l} />)}
        </div>

        {/* BANNER 2 - Immo Pro */}
        <div style={{ position: 'relative', width: '100%', height: '400px', borderRadius: '40px', overflow: 'hidden', margin: '48px 0 32px', boxShadow: '0 20px 60px rgba(0,0,0,0.15)' }}>
          <img src="https://images.pexels.com/photos/2581922/pexels-photo-2581922.jpeg?auto=compress&w=1400" alt="SouKni Immo Pro" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', transform: 'scale(1.05)' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(22,29,27,0.8), rgba(22,29,27,0.4), transparent)' }} />
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', padding: '32px 64px' }}>
            <div style={{ backgroundColor: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(12px)', padding: '40px', borderRadius: '16px', maxWidth: '480px', boxShadow: '0 20px 60px rgba(0,0,0,0.15)', border: '1px solid rgba(255,255,255,0.5)' }}>
              <h2 style={{ fontSize: '28px', fontWeight: 900, color: '#161d1b', marginBottom: '16px', letterSpacing: '-0.02em' }}>SouKni Immo Pro</h2>
              <p style={{ fontSize: '15px', color: '#3c4a46', lineHeight: 1.6, marginBottom: '32px' }}>Elevate your lifestyle with Morocco's most exclusive real estate portfolio. From historic Riads to modern beachfront villas.</p>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <button style={{ backgroundColor: '#006b5f', color: 'white', border: 'none', padding: '14px 32px', borderRadius: '12px', fontWeight: 900, fontSize: '14px', cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>Explore Properties</button>
                <button style={{ backgroundColor: 'transparent', color: '#161d1b', border: '2px solid #161d1b', padding: '14px 32px', borderRadius: '12px', fontWeight: 900, fontSize: '14px', cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>Contact Expert</button>
              </div>
            </div>
          </div>
        </div>

        {/* GRID LISTINGS */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '48px' }}>
          {gridListings.map(l => <GridCard key={l.id} listing={l} />)}
        </div>

        {/* PAGINATION */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '32px' }}>
          {[1, 2, 3].map(p => (
            <button key={p} onClick={() => setCurrentPage(p)} style={{ width: '48px', height: '48px', borderRadius: '12px', border: currentPage === p ? 'none' : '1px solid #bacac5', backgroundColor: currentPage === p ? '#006b5f' : 'transparent', color: currentPage === p ? 'white' : '#161d1b', fontWeight: 700, fontSize: '14px', cursor: 'pointer', fontFamily: 'Inter, sans-serif', boxShadow: currentPage === p ? '0 4px 12px rgba(0,107,95,0.3)' : 'none', transition: 'all 0.15s' }}>{p}</button>
          ))}
          <span style={{ width: '48px', height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#7A7A7A', fontWeight: 900 }}>...</span>
          <button style={{ width: '48px', height: '48px', borderRadius: '12px', border: '1px solid #bacac5', backgroundColor: 'transparent', color: '#161d1b', fontWeight: 700, fontSize: '14px', cursor: 'pointer', fontFamily: 'Inter, sans-serif', transition: 'all 0.15s' }}>48</button>
        </div>

      </main>

      {/* JOIN SOUKNI FAMILY BANNER */}
      <section style={{ backgroundColor: '#eef5f2', padding: '80px 16px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ backgroundColor: 'white', borderRadius: '40px', padding: '64px', boxShadow: '0 20px 60px rgba(0,0,0,0.06)', border: '1px solid rgba(186,202,197,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '48px', flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: '280px' }}>
              <h2 style={{ fontSize: '40px', fontWeight: 900, color: '#161d1b', marginBottom: '24px', letterSpacing: '-0.03em', textTransform: 'uppercase' }}>JOIN THE SOUKNI FAMILLY</h2>
              <p style={{ fontSize: '17px', color: '#3c4a46', lineHeight: 1.7, maxWidth: '480px' }}>Download the SouKni app to place 100% FREE ADS and discover the best educators and classes on the go.</p>
            </div>
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              {['🍎 App Store', '▶ Google Play', '🏪 AppGallery'].map(btn => (
                <button key={btn} style={{ backgroundColor: '#161d1b', color: 'white', border: 'none', padding: '14px 24px', borderRadius: '12px', fontWeight: 700, fontSize: '14px', cursor: 'pointer', fontFamily: 'Inter, sans-serif', transition: 'opacity 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
                  onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                >{btn}</button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ backgroundColor: '#7A7A7A', color: 'white', paddingTop: '80px', paddingBottom: '40px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 16px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr', gap: '40px', marginBottom: '64px' }}>
            <div>
              <a href="#" style={{ fontSize: '28px', fontWeight: 900, color: 'white', textDecoration: 'none', display: 'block', marginBottom: '24px' }}>SouKni</a>
              <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.8)', lineHeight: 1.7, marginBottom: '32px', maxWidth: '320px' }}>
                Morocco's premium community marketplace. Connecting talented educators, professional services, and high-end goods with discerning users across the Kingdom.
              </p>
              <div style={{ display: 'flex', gap: '12px' }}>
                {['🌐', '⇧', '@'].map((icon, i) => (
                  <a key={i} href="#" style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: '#dde4e1', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', fontSize: '16px', transition: 'all 0.2s' }}
                    onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#006b5f'; e.currentTarget.style.transform = 'translateY(-2px)' }}
                    onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#dde4e1'; e.currentTarget.style.transform = 'translateY(0)' }}
                  >{icon}</a>
                ))}
              </div>
            </div>
            {[
              { title: 'Company', links: ['About Us', 'Careers', 'Press', 'Contact'] },
              { title: 'Support', links: ['Help Center', 'Safety Tips', 'Trust & Safety', 'Ad Rules'] },
              { title: 'Legal', links: ['Terms of Use', 'Privacy Policy', 'Cookie Policy'] },
              { title: 'Top Cities', links: ['Casablanca', 'Rabat', 'Marrakech', 'Tangier'] },
            ].map(col => (
              <div key={col.title}>
                <h4 style={{ fontSize: '12px', fontWeight: 900, color: 'white', marginBottom: '20px', textTransform: 'uppercase', letterSpacing: '0.15em' }}>{col.title}</h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {col.links.map(link => (
                    <li key={link} style={{ marginBottom: '16px' }}>
                      <a href="#" style={{ fontSize: '14px', color: 'rgba(255,255,255,0.8)', textDecoration: 'none', fontWeight: 500, transition: 'color 0.15s' }}
                        onMouseEnter={e => e.currentTarget.style.color = '#2dd4bf'}
                        onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.8)'}
                      >{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div style={{ paddingTop: '40px', borderTop: '1px solid rgba(186,202,197,0.2)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
            <p style={{ fontSize: '10px', color: 'white', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.2em' }}>© 2026 SOUKNI MOROCCO. ALL RIGHTS RESERVED.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
