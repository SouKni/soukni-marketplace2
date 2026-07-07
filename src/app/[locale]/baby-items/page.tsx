'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Heart, Search, MapPin, Globe, DollarSign, Bell, User, ArrowUpDown, Bookmark, Users, UserCircle, BadgeCheck, Gem, MessageCircle, ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react'

const categoryPills = ['All Baby Items', 'Strollers & Prams', 'Nursery Furniture', 'Baby Clothing', 'Toys', 'Feeding & Nursing', 'Safety Gear']

const sellerFilters = [
  { label: 'All Sellers', icon: Users },
  { label: 'SouKni Members', icon: UserCircle },
  { label: 'SouKni Pro', icon: BadgeCheck },
]

type Listing = {
  id: string; title: string; category: string; price: string; location?: string; time?: string
  image: string; tags?: string[]; badges: ('Diamond Member' | 'Verified' | 'Premium')[]
}

const row1: Listing[] = [
  { id: '1', title: 'Designer Modular Stroller', category: 'Strollers & Prams', price: 'MAD 8,500', location: 'Rabat Agdal', time: '1 hour ago', image: 'https://images.pexels.com/photos/3661238/pexels-photo-3661238.jpeg?auto=compress&w=600', tags: ['Mint Edition', 'Lightweight'], badges: ['Verified', 'Premium'] },
  { id: '2', title: 'Smart Bluetooth Baby Swing', category: 'Toys & Gear', price: 'MAD 3,200', location: 'Rabat Center', time: '2 hours ago', image: 'https://images.pexels.com/photos/6849268/pexels-photo-6849268.jpeg?auto=compress&w=600', tags: ['High-Tech', 'New'], badges: ['Diamond Member'] },
  { id: '3', title: 'Convertible Oak Wood Crib', category: 'Nursery Furniture', price: 'MAD 5,400', location: 'Hay Riad', time: '5 hours ago', image: 'https://images.pexels.com/photos/3933281/pexels-photo-3933281.jpeg?auto=compress&w=600', tags: ['Solid Wood', '3-in-1'], badges: ['Verified'] },
  { id: '4', title: 'i-Size 360 Rotating Seat', category: 'Safety Gear', price: 'MAD 2,800', location: 'Souissi', time: 'Just now', image: 'https://images.pexels.com/photos/5589030/pexels-photo-5589030.jpeg?auto=compress&w=600', tags: ['ADAC Tested', 'Excellent'], badges: ['Diamond Member'] },
]

const row2: Listing[] = [
  { id: '5', title: 'Luxury Interactive Wooden Toy Set', category: 'Toys & Development', price: 'MAD 1,450', image: 'https://images.pexels.com/photos/3661193/pexels-photo-3661193.jpeg?auto=compress&w=600', badges: ['Diamond Member', 'Verified'] },
  { id: '6', title: 'Minimalist 4-in-1 High Chair', category: 'Feeding & Nursing', price: 'MAD 2,800', image: 'https://images.pexels.com/photos/3933273/pexels-photo-3933273.jpeg?auto=compress&w=600', badges: ['Diamond Member', 'Verified'] },
  { id: '7', title: 'Smart HD Baby Monitor', category: 'Safety Gear', price: 'MAD 1,950', image: 'https://images.pexels.com/photos/3933250/pexels-photo-3933250.jpeg?auto=compress&w=600', badges: ['Diamond Member', 'Verified'] },
  { id: '8', title: 'Designer Emerald Leather Diaper Bag', category: 'Fashion & Accessories', price: 'MAD 3,200', image: 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&w=600', badges: ['Diamond Member', 'Verified'] },
]

const row3: Listing[] = [
  { id: '9', title: 'Luxury Convertible Car Seat', category: 'Safety Gear', price: 'MAD 4,500', image: 'https://images.pexels.com/photos/5589041/pexels-photo-5589041.jpeg?auto=compress&w=600', badges: ['Diamond Member', 'Verified'] },
  { id: '10', title: 'Ergonomic Multi-Position Baby Carrier', category: 'Baby Gear', price: 'MAD 1,650', image: 'https://images.pexels.com/photos/3933264/pexels-photo-3933264.jpeg?auto=compress&w=600', badges: ['Diamond Member', 'Verified'] },
  { id: '11', title: 'Portable Electric Double Breast Pump', category: 'Feeding & Nursing', price: 'MAD 2,100', image: 'https://images.pexels.com/photos/3998016/pexels-photo-3998016.jpeg?auto=compress&w=600', badges: ['Diamond Member', 'Verified'] },
  { id: '12', title: 'Luxury Organic Cotton Bedding', category: 'Nursery & Bedding', price: 'MAD 950', image: 'https://images.pexels.com/photos/3933262/pexels-photo-3933262.jpeg?auto=compress&w=600', badges: ['Diamond Member', 'Verified'] },
]

const row4: Listing[] = [
  { id: '13', title: 'Premium Cotton Baby Set', category: 'Clothing & Layette', price: 'MAD 1,200', location: 'Rabat', time: 'Just now', image: 'https://images.pexels.com/photos/3993043/pexels-photo-3993043.jpeg?auto=compress&w=600', badges: ['Diamond Member'] },
  { id: '14', title: 'Montessori Activity Gym', category: 'Toys & Development', price: 'MAD 1,850', location: 'Casablanca', time: '1 hour ago', image: 'https://images.pexels.com/photos/3661230/pexels-photo-3661230.jpeg?auto=compress&w=600', badges: ['Diamond Member'] },
  { id: '15', title: 'Adjustable Modern High Chair', category: 'Feeding & Nursing', price: 'MAD 2,400', location: 'Marrakech', time: '2 hours ago', image: 'https://images.pexels.com/photos/3933277/pexels-photo-3933277.jpeg?auto=compress&w=600', badges: ['Diamond Member'] },
  { id: '16', title: 'Twin Deluxe Urban Stroller', category: 'Strollers & Prams', price: 'MAD 12,000', location: 'Tangier', time: 'Just now', image: 'https://images.pexels.com/photos/3661205/pexels-photo-3661205.jpeg?auto=compress&w=600', badges: ['Diamond Member'] },
]

function Badge({ type }: { type: 'Diamond Member' | 'Verified' | 'Premium' }) {
  const styles = {
    'Diamond Member': { color: '#8d4f00', icon: '💎' },
    Verified: { color: '#2dd4bf', icon: '✓' },
    Premium: { color: '#8d4f00', icon: '' },
  }[type]
  return (
    <span style={{ backgroundColor: 'rgba(244,251,248,0.9)', backdropFilter: 'blur(8px)', color: styles.color, fontSize: '11px', fontWeight: 700, padding: '4px 10px', borderRadius: '100px', textTransform: 'uppercase' as const, letterSpacing: '0.05em', display: 'inline-flex', alignItems: 'center', gap: '4px', boxShadow: '0 1px 2px rgba(0,0,0,0.06)' }}>
      {styles.icon} {type}
    </span>
  )
}

function ListingCard({ item }: { item: Listing }) {
  const [saved, setSaved] = useState(false)
  return (
    <article style={{ backgroundColor: 'rgba(244,251,248,0.7)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.4)', borderRadius: '2rem', overflow: 'hidden', display: 'flex', flexDirection: 'column' as const, transition: 'transform 0.3s' }}
      onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
      onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
    >
      <div style={{ position: 'relative', aspectRatio: '4/3', backgroundColor: '#e2eae7', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '8px', left: '8px', zIndex: 2, display: 'flex', flexDirection: 'column' as const, gap: '4px', alignItems: 'flex-start' }}>
          {item.badges.map(b => <Badge key={b} type={b} />)}
        </div>
        <button onClick={() => setSaved(!saved)} style={{ position: 'absolute', top: '8px', right: '8px', zIndex: 2, width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'rgba(244,251,248,0.5)', backdropFilter: 'blur(8px)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
          <Heart size={16} color={saved ? '#ba1a1a' : '#161d1b'} fill={saved ? '#ba1a1a' : 'none'} />
        </button>
        <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>
      <div style={{ padding: '16px', display: 'flex', flexDirection: 'column' as const, flex: 1 }}>
        <h3 style={{ fontSize: '13px', fontWeight: 700, color: '#161d1b', marginBottom: '4px', whiteSpace: 'nowrap' as const, overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.title}</h3>
        <p style={{ fontSize: '13px', color: '#3c4a46', marginBottom: '8px' }}>{item.category}</p>
        <div style={{ fontSize: '20px', fontWeight: 700, color: '#161d1b', marginBottom: '12px' }}>{item.price}</div>
        {item.tags && (
          <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: '8px', marginBottom: '16px' }}>
            {item.tags.map(t => <span key={t} style={{ backgroundColor: '#e8efec', color: '#3c4a46', fontSize: '11px', fontWeight: 500, padding: '4px 8px', borderRadius: '4px' }}>{t}</span>)}
          </div>
        )}
        {item.location && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: '#3c4a46', marginBottom: '16px' }}>
            <MapPin size={14} /><span>{item.location} • {item.time}</span>
          </div>
        )}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginTop: 'auto' }}>
          <button style={{ border: '1px solid #2dd4bf', color: '#2dd4bf', backgroundColor: 'transparent', padding: '8px', borderRadius: '100px', fontWeight: 600, fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
            <MessageCircle size={16} /> {item.location ? 'Chat' : 'Message'}
          </button>
          <button style={{ backgroundColor: '#25D366', color: 'white', border: 'none', padding: '8px', borderRadius: '100px', fontWeight: 600, fontSize: '13px', cursor: 'pointer' }}>WhatsApp</button>
        </div>
      </div>
    </article>
  )
}

export default function BabyItemsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = React.use(params)
  const [activePill, setActivePill] = useState('All Baby Items')
  const [activeSeller, setActiveSeller] = useState('All Sellers')

  return (
    <div style={{ fontFamily: 'Hanken Grotesk, Inter, sans-serif', backgroundColor: '#f4fbf8', color: '#161d1b', minHeight: '100vh' }}>


      <main>
        {/* HERO */}
        <section style={{ position: 'relative', height: '500px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', marginBottom: '64px' }}>
          <img src="https://images.pexels.com/photos/3661238/pexels-photo-3661238.jpeg?auto=compress&w=1600" alt="Baby showroom" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.7 }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(244,251,248,0.4), rgba(244,251,248,0.2), #f4fbf8)' }} />
          <div style={{ position: 'relative', zIndex: 10, maxWidth: '1440px', width: '100%', padding: '0 40px', display: 'flex', flexDirection: 'column' as const, alignItems: 'center' }}>
            <h1 style={{ fontSize: '48px', fontWeight: 700, marginBottom: '24px', textAlign: 'center' as const, letterSpacing: '-0.02em' }}>Curated Baby &amp; Kids Essentials</h1>
            <div style={{ backgroundColor: 'rgba(244,251,248,0.7)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.4)', borderRadius: '3rem', padding: '8px', display: 'flex', gap: '8px', width: '100%', maxWidth: '700px' }}>
              <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '12px', backgroundColor: 'rgba(244,251,248,0.5)', borderRadius: '100px', padding: '12px 16px' }}>
                <Search size={18} color="#3c4a46" />
                <input placeholder="Search strollers, cribs, toys..." style={{ border: 'none', outline: 'none', background: 'transparent', width: '100%', fontFamily: 'inherit', fontSize: '14px' }} />
              </div>
              <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: 'rgba(244,251,248,0.5)', borderRadius: '100px', padding: '12px 16px' }}>
                <MapPin size={18} color="#3c4a46" />
                <select style={{ border: 'none', outline: 'none', background: 'transparent', width: '100%', fontFamily: 'inherit', fontSize: '14px' }} defaultValue="All Morocco">
                  <option>All Morocco</option><option>Casablanca</option><option>Rabat</option><option>Marrakech</option>
                </select>
              </div>
              <button style={{ backgroundColor: '#2dd4bf', color: 'white', padding: '12px 32px', borderRadius: '100px', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px', whiteSpace: 'nowrap' as const }}>
                <Search size={16} /> Search
              </button>
            </div>
          </div>
        </section>

        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 40px' }}>

          {/* FILTER BAR */}
          <section style={{ marginTop: '-48px', marginBottom: '32px', position: 'relative', zIndex: 20 }}>
            <div style={{ backgroundColor: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(8px)', border: '1px solid rgba(186,202,197,0.3)', borderRadius: '100px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.08)', padding: '6px', display: 'flex', alignItems: 'center', overflowX: 'auto' as const }}>
              {[
                { label: 'City', value: 'Rabat' },
                { label: 'Keyword', value: 'Search baby items...', flex: 2 },
                { label: 'Neighborhood', value: 'Enter location' },
                { label: 'Price (MAD)', value: 'Select' },
                { label: 'Filters', value: '1 selected' },
              ].map((f, i) => (
                <div key={f.label} style={{ flex: f.flex || 1, minWidth: '130px', padding: '8px 16px', borderRight: i < 4 ? '1px solid rgba(186,202,197,0.2)' : 'none' }}>
                  <div style={{ fontSize: '9px', fontWeight: 700, color: '#3c4a46', textTransform: 'uppercase' as const, letterSpacing: '0.05em' }}>{f.label}</div>
                  <div style={{ fontSize: '13px', color: '#161d1b', fontWeight: 500 }}>{f.value}</div>
                </div>
              ))}
            </div>
          </section>

          {/* BREADCRUMB */}
          <nav style={{ display: 'flex', gap: '8px', fontSize: '13px', color: 'rgba(60,74,70,0.7)', marginBottom: '24px' }}>
            <Link href={`/${locale}`} style={{ textDecoration: 'none', color: 'inherit' }}>Home</Link><span>›</span>
            <Link href={`/${locale}/vault`} style={{ textDecoration: 'none', color: 'inherit' }}>The Vault</Link><span>›</span>
            <span style={{ color: '#161d1b' }}>Essentials</span>
          </nav>

          {/* TITLE + ACTIONS */}
          <div style={{ display: 'flex', flexWrap: 'wrap' as const, justifyContent: 'space-between', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 700 }}>New and Used Baby Items for sale in Rabat • <span style={{ color: 'rgba(60,74,70,0.7)', fontWeight: 500 }}>4,120 Ads</span></h2>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', border: '1px solid rgba(186,202,197,0.3)', borderRadius: '4px', fontSize: '13px', fontWeight: 600, backgroundColor: 'transparent', cursor: 'pointer' }}><ArrowUpDown size={16} /> Sort: Default</button>
              <button style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', border: '1px solid rgba(186,202,197,0.3)', borderRadius: '4px', fontSize: '13px', fontWeight: 600, backgroundColor: 'transparent', cursor: 'pointer' }}><Bookmark size={16} /> Save Search</button>
            </div>
          </div>

          {/* SELLER FILTERS */}
          <div style={{ display: 'flex', gap: '12px', marginBottom: '32px' }}>
            {sellerFilters.map(s => (
              <button key={s.label} onClick={() => setActiveSeller(s.label)}
                style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', borderRadius: '8px', fontSize: '14px', fontWeight: 600, cursor: 'pointer',
                  backgroundColor: activeSeller === s.label ? 'rgba(45,212,191,0.15)' : '#eef5f2',
                  border: activeSeller === s.label ? '1px solid #2dd4bf' : '1px solid rgba(186,202,197,0.3)',
                  color: activeSeller === s.label ? '#2dd4bf' : '#3c4a46' }}>
                <s.icon size={18} /> {s.label}
              </button>
            ))}
          </div>

          {/* CATEGORY PILLS */}
          <div style={{ display: 'flex', gap: '12px', overflowX: 'auto' as const, marginBottom: '32px' }}>
            {categoryPills.map(p => (
              <button key={p} onClick={() => setActivePill(p)}
                style={{ whiteSpace: 'nowrap' as const, padding: '10px 20px', borderRadius: '100px', fontSize: '14px', fontWeight: 600, cursor: 'pointer', border: activePill === p ? 'none' : '1px solid rgba(186,202,197,0.3)',
                  backgroundColor: activePill === p ? '#2dd4bf' : '#e8efec', color: activePill === p ? 'white' : '#161d1b' }}>
                {p}
              </button>
            ))}
            <button style={{ whiteSpace: 'nowrap' as const, padding: '10px 20px', borderRadius: '100px', fontSize: '14px', fontWeight: 600, border: '1px solid rgba(186,202,197,0.3)', backgroundColor: '#e8efec', color: '#161d1b', display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}>
              View More <ChevronDown size={16} />
            </button>
          </div>

          {/* ROW 1 */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '32px' }}>
            {row1.map(item => <ListingCard key={item.id} item={item} />)}
          </div>

          {/* AUTO PRO BANNER */}
          <section style={{ marginBottom: '64px' }}>
            <div style={{ position: 'relative', height: '320px', borderRadius: '2.5rem', overflow: 'hidden' }}>
              <img src="https://images.pexels.com/photos/3786091/pexels-photo-3786091.jpeg?auto=compress&w=1400" alt="SouKni Auto Pro" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(0,0,0,0.8), rgba(0,0,0,0.4), transparent)' }} />
              <div style={{ position: 'relative', zIndex: 1, height: '100%', display: 'flex', flexDirection: 'column' as const, justifyContent: 'center', padding: '0 64px', maxWidth: '550px' }}>
                <h2 style={{ color: 'white', fontSize: '36px', fontWeight: 700, marginBottom: '8px', letterSpacing: '-0.02em' }}>SouKni Auto Pro</h2>
                <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '18px', marginBottom: '32px' }}>The Gold Standard for Premium Automotive Services</p>
                <button style={{ backgroundColor: '#2dd4bf', color: '#0f9b8e', padding: '16px 32px', borderRadius: '100px', border: 'none', fontWeight: 600, fontSize: '13px', textTransform: 'uppercase' as const, cursor: 'pointer', width: 'fit-content' }}>Explore Motors</button>
              </div>
            </div>
          </section>

          {/* ROW 2 + 3 (8 cards) */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '16px' }}>
            {row2.map(item => <ListingCard key={item.id} item={item} />)}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '64px' }}>
            {row3.map(item => <ListingCard key={item.id} item={item} />)}
          </div>

          {/* ROW 4 (4 cards) */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '40px' }}>
            {row4.map(item => <ListingCard key={item.id} item={item} />)}
          </div>

          {/* PAGINATION */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', marginBottom: '64px' }}>
            <button style={{ width: '40px', height: '40px', borderRadius: '50%', border: '1px solid rgba(186,202,197,0.3)', backgroundColor: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><ChevronLeft size={18} /></button>
            <button style={{ width: '40px', height: '40px', borderRadius: '50%', border: 'none', backgroundColor: '#2dd4bf', color: '#0f9b8e', fontWeight: 600, fontSize: '14px', cursor: 'pointer' }}>1</button>
            {['2', '3'].map(n => (
              <button key={n} style={{ width: '40px', height: '40px', borderRadius: '50%', border: '1px solid rgba(186,202,197,0.3)', backgroundColor: 'transparent', fontWeight: 600, fontSize: '14px', cursor: 'pointer' }}>{n}</button>
            ))}
            <span style={{ width: '40px', textAlign: 'center' as const, color: 'rgba(60,74,70,0.7)' }}>...</span>
            <button style={{ width: '40px', height: '40px', borderRadius: '50%', border: '1px solid rgba(186,202,197,0.3)', backgroundColor: 'transparent', fontWeight: 600, fontSize: '14px', cursor: 'pointer' }}>12</button>
            <button style={{ width: '40px', height: '40px', borderRadius: '50%', border: '1px solid rgba(186,202,197,0.3)', backgroundColor: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><ChevronRight size={18} /></button>
          </div>
        </div>

        {/* DIAMOND BANNER */}
        <section style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 40px', marginBottom: '64px' }}>
          <div style={{ position: 'relative', height: '320px', borderRadius: '2.5rem', overflow: 'hidden' }}>
            <img src="https://images.pexels.com/photos/3933250/pexels-photo-3933250.jpeg?auto=compress&w=1400" alt="Diamond Member" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(0,0,0,0.6), rgba(0,0,0,0.3), transparent)' }} />
            <div style={{ position: 'absolute', top: '16px', right: '16px', backgroundColor: 'rgba(244,251,248,0.7)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.2)', padding: '8px 16px', borderRadius: '100px' }}>
              <span style={{ color: 'white', fontSize: '11px', textTransform: 'uppercase' as const, letterSpacing: '0.1em', fontWeight: 600 }}>Diamond Certified</span>
            </div>
            <div style={{ position: 'relative', zIndex: 1, height: '100%', display: 'flex', flexDirection: 'column' as const, justifyContent: 'center', padding: '0 64px', maxWidth: '600px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                <Gem size={28} color="#62fae3" />
                <span style={{ color: '#62fae3', fontSize: '12px', fontWeight: 600, textTransform: 'uppercase' as const, letterSpacing: '0.1em' }}>Exclusive Status</span>
              </div>
              <h2 style={{ color: 'white', fontSize: '36px', fontWeight: 700, marginBottom: '8px', letterSpacing: '-0.02em' }}>Become a SouKni Diamond Member</h2>
              <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '18px', marginBottom: '32px' }}>Get the Diamond Certified status and unlock exclusive benefits for premium baby item sellers.</p>
              <button style={{ backgroundColor: '#2dd4bf', color: 'white', padding: '16px 32px', borderRadius: '100px', border: 'none', fontWeight: 600, fontSize: '13px', textTransform: 'uppercase' as const, cursor: 'pointer', width: 'fit-content' }}>Get Verified Now</button>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
    </div>
  )
}
