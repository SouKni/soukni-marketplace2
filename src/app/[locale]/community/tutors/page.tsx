'use client'
import React, { useState } from 'react'
import Link from 'next/link'

const tutors = [
  { name: 'Dr. Amina Benali', subject: 'Mathematics & Physics', level: 'University Level', price: '250 MAD/hr', location: 'Casablanca', rating: 5, reviews: 142, badge: 'Diamond Member', image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&w=500' },
  { name: 'Prof. Youssef Alami', subject: 'Arabic & French Literature', level: 'High School', price: '180 MAD/hr', location: 'Rabat', rating: 4.5, reviews: 89, badge: 'Verified', image: 'https://images.pexels.com/photos/5668858/pexels-photo-5668858.jpeg?auto=compress&w=500' },
  { name: 'Sara Tazi', subject: 'English Language', level: 'All Levels', price: '200 MAD/hr', location: 'Marrakech', rating: 5, reviews: 203, badge: 'Diamond Member', image: 'https://images.pexels.com/photos/3760067/pexels-photo-3760067.jpeg?auto=compress&w=500' },
  { name: 'Karim Idrissi', subject: 'Computer Science', level: 'University Level', price: '300 MAD/hr', location: 'Tangier', rating: 4.5, reviews: 67, badge: 'Verified', image: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&w=500' },
  { name: 'Fatima Zahra', subject: 'Biology & Chemistry', level: 'High School', price: '220 MAD/hr', location: 'Casablanca', rating: 5, reviews: 118, badge: 'Diamond Member', image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&w=500' },
  { name: 'Omar Benjelloun', subject: 'Music & Piano', level: 'Beginner to Advanced', price: '350 MAD/hr', location: 'Rabat', rating: 5, reviews: 54, badge: 'Diamond Member', image: 'https://images.pexels.com/photos/5668858/pexels-photo-5668858.jpeg?auto=compress&w=500' },
  { name: 'Nadia El Fassi', subject: 'Art & Design', level: 'All Levels', price: '280 MAD/hr', location: 'Marrakech', rating: 4.5, reviews: 76, badge: 'Verified', image: 'https://images.pexels.com/photos/3760067/pexels-photo-3760067.jpeg?auto=compress&w=500' },
  { name: 'Hassan Moussaoui', subject: 'Spanish & German', level: 'All Levels', price: '190 MAD/hr', location: 'Casablanca', rating: 4.5, reviews: 91, badge: 'Verified', image: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&w=500' },
]

function TutorCard({ item }: { item: typeof tutors[0] }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{ backgroundColor: 'white', borderRadius: '24px', overflow: 'hidden', border: '1px solid rgba(186,202,197,0.3)', boxShadow: hovered ? '0 20px 40px rgba(0,0,0,0.1)' : '0 2px 8px rgba(0,0,0,0.04)', transition: 'all 0.3s' }}>
      <div style={{ position: 'relative', height: '200px', overflow: 'hidden' }}>
        <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s', transform: hovered ? 'scale(1.05)' : 'scale(1)' }} />
        <div style={{ position: 'absolute', top: '12px', left: '12px' }}>
          <span style={{ backgroundColor: item.badge === 'Diamond Member' ? '#006b5f' : '#2dd4bf', color: 'white', fontSize: '10px', fontWeight: 700, padding: '4px 10px', borderRadius: '100px', textTransform: 'uppercase' }}>{item.badge}</span>
        </div>
      </div>
      <div style={{ padding: '20px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#161d1b', marginBottom: '4px' }}>{item.name}</h3>
        <p style={{ fontSize: '13px', color: '#006b5f', fontWeight: 600, marginBottom: '4px' }}>{item.subject}</p>
        <p style={{ fontSize: '12px', color: '#6b7a76', marginBottom: '8px' }}>{item.level} • 📍 {item.location}</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '12px' }}>
          <span style={{ fontSize: '13px', color: '#f59e0b' }}>{'⭐'.repeat(Math.floor(item.rating))}</span>
          <span style={{ fontSize: '12px', color: '#6b7a76' }}>({item.reviews} reviews)</span>
        </div>
        <p style={{ fontSize: '18px', fontWeight: 700, color: '#006b5f', marginBottom: '16px' }}>{item.price}</p>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button style={{ flex: 1, backgroundColor: '#25D366', color: 'white', border: 'none', padding: '10px', borderRadius: '12px', fontWeight: 700, fontSize: '13px', cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>WhatsApp</button>
          <button style={{ flex: 1, backgroundColor: 'transparent', color: '#006b5f', border: '1px solid #006b5f', padding: '10px', borderRadius: '12px', fontWeight: 700, fontSize: '13px', cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>Message</button>
        </div>
      </div>
    </div>
  )
}

export default function TutorsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = React.use(params)
  return (
    <div style={{ fontFamily: 'Inter, system-ui, sans-serif', backgroundColor: '#f4fbf8', minHeight: '100vh' }}>
      <section style={{ position: 'relative', height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        <img src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&w=1400" alt="Tutors" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0.2))' }} />
        <div style={{ position: 'relative', zIndex: 10, textAlign: 'center' }}>
          <h1 style={{ fontSize: '42px', fontWeight: 900, color: 'white', letterSpacing: '-0.03em', marginBottom: '8px' }}>Tutors & Classes</h1>
          <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.85)' }}>Find expert tutors across Morocco</p>
        </div>
      </section>
      <div style={{ maxWidth: '1280px', margin: '48px auto', padding: '0 40px' }}>
        <nav style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', marginBottom: '32px' }}>
          <Link href={`/${locale}`} style={{ color: '#006b5f', textDecoration: 'none', fontWeight: 600 }}>Home</Link>
          <span style={{ color: '#6b7a76' }}>›</span>
          <Link href={`/${locale}/community`} style={{ color: '#006b5f', textDecoration: 'none', fontWeight: 600 }}>Community</Link>
          <span style={{ color: '#6b7a76' }}>›</span>
          <span style={{ color: '#161d1b', fontWeight: 700 }}>Tutors & Classes</span>
        </nav>
        <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#161d1b', marginBottom: '32px' }}>Available Tutors <span style={{ color: '#6b7a76', fontWeight: 400 }}>• {tutors.length} listings</span></h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
          {tutors.map((item, i) => <TutorCard key={i} item={item} />)}
        </div>
      </div>
    </div>
  )
}
