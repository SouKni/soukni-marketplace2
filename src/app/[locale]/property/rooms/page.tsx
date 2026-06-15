'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { Heart, ChevronsLeft, ChevronLeft, ChevronRight, ChevronsRight, MapPin, Bed, Bath, Maximize, Phone } from 'lucide-react'

const subCategories = ['Single Room', 'Shared Room', 'Master Bedroom', 'Studio', 'Ensuite Room', 'Hotel', 'View More']

const listings = [
  { id: 'ro1', badge: 'Verified', title: 'Bright Single Room in Gauthier', type: 'Single Room', price: '2,500', unit: 'MAD/mo', location: 'Casablanca, Gauthier', beds: 1, baths: 1, area: 18, image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&w=700' },
  { id: 'ro2', badge: 'Diamond', title: 'Master Bedroom with Private Bathroom', type: 'Master Bedroom', price: '4,200', unit: 'MAD/mo', location: 'Rabat, Agdal', beds: 1, baths: 1, area: 25, image: 'https://images.pexels.com/photos/1918291/pexels-photo-1918291.jpeg?auto=compress&w=700' },
  { id: 'ro3', badge: 'New', title: 'Shared Room Near Hassan II Mosque', type: 'Shared Room', price: '1,800', unit: 'MAD/mo', location: 'Casablanca, Ain Diab', beds: 1, baths: 1, area: 15, image: 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&w=700' },
  { id: 'ro4', badge: 'Verified', title: 'Modern Studio Apartment Hivernage', type: 'Studio', price: '5,500', unit: 'MAD/mo', location: 'Marrakech, Hivernage', beds: 1, baths: 1, area: 35, image: 'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&w=700' },
  { id: 'ro5', badge: 'Diamond', title: 'Ensuite Room in Luxury Villa', type: 'Ensuite Room', price: '6,000', unit: 'MAD/mo', location: 'Tangier, Malabata', beds: 1, baths: 1, area: 28, image: 'https://images.pexels.com/photos/2581922/pexels-photo-2581922.jpeg?auto=compress&w=700' },
  { id: 'ro6', badge: 'Verified', title: 'Cozy Room Near University', type: 'Single Room', price: '1,500', unit: 'MAD/mo', location: 'Fès, Ville Nouvelle', beds: 1, baths: 1, area: 14, image: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&w=700' },
  { id: 'ro7', badge: 'New', title: 'Furnished Studio City Center', type: 'Studio', price: '4,800', unit: 'MAD/mo', location: 'Casablanca, Centre Ville', beds: 1, baths: 1, area: 32, image: 'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&w=700' },
  { id: 'ro8', badge: 'Diamond', title: 'Premium Hotel Suite Long Stay', type: 'Hotel', price: '8,500', unit: 'MAD/mo', location: 'Marrakech, Medina', beds: 1, baths: 1, area: 45, image: 'https://images.pexels.com/photos/440731/pexels-photo-440731.jpeg?auto=compress&w=700' },
]

const newProjects = [
  { name: 'The Marina Heights', city: 'Casablanca Finance City', price: 'From 1.2M MAD', image: 'https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg?auto=compress&w=200' },
  { name: 'Atlas Green Resort', city: 'Marrakech, Palmeraie', price: 'From 3.5M MAD', image: 'https://images.pexels.com/photos/2581922/pexels-photo-2581922.jpeg?auto=compress&w=200' },
]

function BadgeChip({ label }: { label: string }) {
  const isNavy = label === 'New'
  const isGold = label === 'Diamond'
  return <span style={{ backgroundColor: isNavy ? 'rgba(15,23,42,0.8)' : isGold ? '#8d4f00' : '#2dd4bf', color: 'white', fontSize: '9px', fontWeight: 800, padding: '3px 8px', borderRadius: '4px', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{label}</span>
}

function RoomCard({ prop }: { prop: typeof listings[0] }) {
  const [saved, setSaved] = useState(false)
  const [hovered, setHovered] = useState(false)
  return (
    <article onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{ backgroundColor: 'white', borderRadius: '16px', overflow: 'hidden', border: hovered ? '1px solid rgba(45,212,191,0.3)' : '1px solid #f1f5f9', display: 'flex', height: '240px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', transition: 'all 0.3s', cursor: 'pointer' }}>
      <div style={{ width: '40%', position: 'relative', overflow: 'hidden', flexShrink: 0 }}>
        <img src={prop.image} alt={prop.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s', transform: hovered ? 'scale(1.1)' : 'scale(1)' }} />
        <div style={{ position: 'absolute', top: '12px', left: '12px' }}><BadgeChip label={prop.badge} /></div>
        <button onClick={e => { e.stopPropagation(); setSaved(!saved) }}
          style={{ position: 'absolute', top: '10px', right: '10px', width: '34px', height: '34px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(12px)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Heart size={16} fill={saved ? '#ef4444' : 'none'} color={saved ? '#ef4444' : 'white'} />
        </button>
      </div>
      <div style={{ flex: 1, padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
            <h3 style={{ fontSize: '22px', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em' }}>{prop.price} <span style={{ fontSize: '13px', fontWeight: 400, color: '#64748b' }}>{prop.unit}</span></h3>
            <span style={{ fontSize: '11px', color: '#64748b', fontWeight: 500 }}>{prop.type}</span>
          </div>
          <h2 style={{ fontSize: '15px', fontWeight: 500, color: hovered ? '#2dd4bf' : '#0f172a', marginBottom: '6px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', transition: 'color 0.15s' }}>{prop.title}</h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#64748b', fontSize: '12px', marginBottom: '14px' }}>
            <MapPin size={13} /> {prop.location}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', fontSize: '12px', color: '#475569', borderTop: '1px solid #f1f5f9', paddingTop: '12px' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Bed size={14} /> {prop.beds} Bed</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Bath size={14} /> {prop.baths} Bath</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Maximize size={14} /> {prop.area} sqm</span>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '10px', marginTop: '12px' }}>
          <button style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', border: '1px solid #e2e8f0', backgroundColor: 'transparent', color: '#0f172a', fontWeight: 700, fontSize: '13px', padding: '10px', borderRadius: '10px', cursor: 'pointer' }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#f8fafc'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}>
            <Phone size={14} /> Call
          </button>
          <button style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', backgroundColor: '#2dd4bf', color: 'white', fontWeight: 700, fontSize: '13px', padding: '10px', borderRadius: '10px', border: 'none', cursor: 'pointer' }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#0f9b8e'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = '#2dd4bf'}>
            💬 WhatsApp
          </button>
        </div>
      </div>
    </article>
  )
}

export default function RoomsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = React.use(params)
  const [currentPage, setCurrentPage] = useState(1)
  const [activeFilter, setActiveFilter] = useState('All')
  const [activeCat, setActiveCat] = useState('Single Room')
  const [diamondFirst, setDiamondFirst] = useState(false)

  return (
    <div style={{ fontFamily: 'Inter, system-ui, sans-serif', backgroundColor: '#f4fbf8', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '14px 24px', fontSize: '11px', color: '#64748b', display: 'flex', alignItems: 'center', gap: '6px' }}>
        <Link href={`/${locale}`} style={{ color: '#64748b', textDecoration: 'none' }}>Home</Link>
        <span>›</span>
        <Link href={`/${locale}/property`} style={{ color: '#64748b', textDecoration: 'none' }}>Property</Link>
        <span>›</span>
        <span style={{ color: '#0f172a', fontWeight: 600 }}>Rooms for Rent</span>
      </div>

      <main style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px 80px' }}>
        <section style={{ marginBottom: '28px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
            <h1 style={{ fontSize: '22px', fontWeight: 800, color: '#0f172a' }}>
              Rooms for Rent in Morocco <span style={{ color: '#64748b', fontWeight: 400, fontSize: '16px' }}>1,248 Ads</span>
            </h1>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button style={{ border: '1px solid #e2e8f0', backgroundColor: 'white', padding: '8px 16px', borderRadius: '8px', fontSize: '13px', fontWeight: 500, color: '#64748b', cursor: 'pointer' }}>⇅ Sort: Popular</button>
              <button style={{ border: '1px solid #e2e8f0', backgroundColor: 'white', padding: '8px 16px', borderRadius: '8px', fontSize: '13px', fontWeight: 500, color: '#64748b', cursor: 'pointer' }}>🔖 Save Search</button>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px', marginBottom: '14px', flexWrap: 'wrap' }}>
            {subCategories.map(cat => (
              <button key={cat} onClick={() => setActiveCat(cat)}
                style={{ padding: '8px 20px', borderRadius: '100px', border: 'none', cursor: 'pointer', fontSize: '13px', fontWeight: 600, backgroundColor: activeCat === cat ? '#0f172a' : '#e8efec', color: activeCat === cat ? 'white' : '#161d1b', transition: 'all 0.15s' }}>
                {cat}
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', gap: '8px' }}>
              {['All', 'Furnished', 'Unfurnished'].map(f => (
                <button key={f} onClick={() => setActiveFilter(f)}
                  style={{ padding: '6px 20px', borderRadius: '8px', backgroundColor: 'white', border: activeFilter === f ? '1px solid #2dd4bf' : '1px solid #e2e8f0', fontSize: '13px', fontWeight: 500, color: activeFilter === f ? '#2dd4bf' : '#0f172a', cursor: 'pointer' }}>{f}</button>
              ))}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>Show SouKni Diamond Verified First</span>
              <div onClick={() => setDiamondFirst(!diamondFirst)}
                style={{ width: '44px', height: '24px', borderRadius: '100px', backgroundColor: diamondFirst ? '#2dd4bf' : '#e2e8f0', cursor: 'pointer', position: 'relative', transition: 'background 0.2s' }}>
                <div style={{ position: 'absolute', top: '2px', left: diamondFirst ? '22px' : '2px', width: '20px', height: '20px', borderRadius: '50%', backgroundColor: 'white', transition: 'left 0.2s', boxShadow: '0 1px 4px rgba(0,0,0,0.2)' }} />
              </div>
            </div>
          </div>
        </section>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '28px', alignItems: 'start' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {listings.map(p => <RoomCard key={p.id} prop={p} />)}
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', marginTop: '12px' }}>
              <div style={{ display: 'flex', gap: '6px', marginRight: '16px' }}>
                {[ChevronsLeft, ChevronLeft].map((Icon, i) => (
                  <button key={i} style={{ width: '40px', height: '40px', borderRadius: '8px', border: '1px solid #e2e8f0', backgroundColor: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}><Icon size={15} color="#94a3b8" /></button>
                ))}
              </div>
              {[1,2,3,4,5].map(page => (
                <button key={page} onClick={() => setCurrentPage(page)}
                  style={{ width: '40px', height: '40px', borderRadius: '8px', border: page === currentPage ? 'none' : '1px solid #e2e8f0', backgroundColor: page === currentPage ? '#2dd4bf' : 'white', color: page === currentPage ? 'white' : '#0f172a', fontSize: '13px', fontWeight: page === currentPage ? 700 : 500, cursor: 'pointer' }}>{page}</button>
              ))}
              <div style={{ display: 'flex', gap: '6px', marginLeft: '16px' }}>
                {[ChevronRight, ChevronsRight].map((Icon, i) => (
                  <button key={i} style={{ width: '40px', height: '40px', borderRadius: '8px', border: '1px solid #e2e8f0', backgroundColor: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}><Icon size={15} color="#94a3b8" /></button>
                ))}
              </div>
            </div>
          </div>

          <aside style={{ display: 'flex', flexDirection: 'column', gap: '20px', position: 'sticky', top: '114px' }}>
            <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '20px', border: '1px solid #f1f5f9', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h3 style={{ fontWeight: 800, color: '#0f172a', fontSize: '14px' }}>New Projects in Morocco</h3>
                <Link href={`/${locale}/property/new-projects`} style={{ color: '#2dd4bf', fontSize: '12px', fontWeight: 600, textDecoration: 'none' }}>View All</Link>
              </div>
              {newProjects.map((proj, i) => (
                <div key={proj.name} style={{ display: 'flex', gap: '14px', cursor: 'pointer', paddingTop: i > 0 ? '14px' : '0', marginTop: i > 0 ? '14px' : '0', borderTop: i > 0 ? '1px solid #f1f5f9' : 'none' }}>
                  <div style={{ width: '72px', height: '72px', borderRadius: '10px', overflow: 'hidden', flexShrink: 0 }}>
                    <img src={proj.image} alt={proj.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div>
                    <h4 style={{ fontWeight: 700, fontSize: '13px', color: '#0f172a', marginBottom: '3px' }}>{proj.name}</h4>
                    <p style={{ fontSize: '11px', color: '#64748b', marginBottom: '6px' }}>{proj.city}</p>
                    <span style={{ fontSize: '12px', fontWeight: 700, color: '#0f172a' }}>{proj.price}</span>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ background: 'rgba(45,212,191,0.06)', border: '2px solid rgba(45,212,191,0.2)', borderRadius: '16px', padding: '20px' }}>
              <span style={{ backgroundColor: '#2dd4bf', color: 'white', fontSize: '9px', fontWeight: 800, padding: '2px 8px', borderRadius: '4px', textTransform: 'uppercase' }}>Pro Only</span>
              <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', marginTop: '10px', marginBottom: '6px' }}>List Your Agency on SouKni</h3>
              <p style={{ fontSize: '12px', color: '#475569', marginBottom: '14px', lineHeight: 1.6 }}>Reach over 2M property seekers monthly in Morocco.</p>
              <button style={{ width: '100%', backgroundColor: '#0f172a', color: 'white', border: 'none', padding: '12px', borderRadius: '10px', fontWeight: 700, fontSize: '13px', cursor: 'pointer' }}>Get Started Today</button>
            </div>
            <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '20px', border: '1px solid #f1f5f9', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
              <h3 style={{ fontWeight: 800, color: '#0f172a', fontSize: '14px', marginBottom: '6px' }}>Get Price Alerts</h3>
              <p style={{ fontSize: '12px', color: '#64748b', marginBottom: '14px', lineHeight: 1.6 }}>Be first to know when rooms matching your search are listed.</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <input type="email" placeholder="Enter your email" style={{ width: '100%', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '10px 14px', fontSize: '13px', outline: 'none', boxSizing: 'border-box' }} />
                <button style={{ width: '100%', backgroundColor: '#2dd4bf', color: 'white', border: 'none', padding: '11px', borderRadius: '8px', fontWeight: 700, fontSize: '13px', cursor: 'pointer' }}>Enable Alerts</button>
              </div>
            </div>
          </aside>
        </div>

        <section style={{ marginTop: '40px', borderRadius: '16px', background: 'linear-gradient(135deg, #2dd4bf 0%, #0f766e 100%)', padding: '40px 48px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '24px' }}>
          <div>
            <h2 style={{ fontSize: '28px', fontWeight: 800, color: 'white', marginBottom: '8px' }}>Become a Diamond Seller — Get a Verified Account</h2>
            <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.9)' }}>Unlock exclusive benefits and build ultimate trust with premium buyers.</p>
          </div>
          <button style={{ backgroundColor: 'white', color: '#2dd4bf', border: 'none', padding: '14px 32px', borderRadius: '12px', fontWeight: 800, fontSize: '15px', cursor: 'pointer', flexShrink: 0, whiteSpace: 'nowrap' }}>Get Verified Now</button>
        </section>
      </main>
    </div>
  )
}
