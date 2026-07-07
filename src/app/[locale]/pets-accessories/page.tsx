'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Heart, Search, ChevronDown, MapPin, Globe, DollarSign, Bell, User, ArrowUpDown, Bookmark, Users, UserCircle, BadgeCheck, Truck, Gem, Phone, ShoppingBag, CalendarDays } from 'lucide-react'

const categoryPills = [
  { label: 'Dogs', count: 733 },
  { label: 'Cats', count: 635 },
  { label: 'Birds', count: 385 },
  { label: 'Exotic Birds', count: 163 },
  { label: 'Food & Accessories', count: 75 },
  { label: 'Other', count: 54 },
]

const sellerFilters = [
  { label: 'All Sellers', icon: Users },
  { label: 'Individuals', icon: UserCircle },
  { label: 'Businesses', icon: BadgeCheck },
]

type Listing = {
  id: string; title: string; price: string; unit?: string; location: string
  image: string; badge?: 'Diamond' | 'Verified' | 'Premium'
}

const dogs: Listing[] = [
  { id: '1', title: 'Golden Retriever Puppies', price: '8,500', location: 'Rabat, Agdal', image: 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&w=600', badge: 'Diamond' },
  { id: '2', title: 'French Bulldog Rare Blue', price: '12,000', location: 'Rabat, Hay Riad', image: 'https://images.pexels.com/photos/1591939/pexels-photo-1591939.jpeg?auto=compress&w=600', badge: 'Verified' },
  { id: '3', title: 'Labrador Enthusiast', price: '6,200', location: 'Rabat, Souissi', image: 'https://images.pexels.com/photos/1739660/pexels-photo-1739660.jpeg?auto=compress&w=600' },
  { id: '4', title: 'German Shepherd', price: '9,000', location: 'Rabat, Hassan', image: 'https://images.pexels.com/photos/1490908/pexels-photo-1490908.jpeg?auto=compress&w=600' },
]

const cats: Listing[] = [
  { id: '5', title: 'Persian Odd-Eye Elite', price: '7,800', location: 'Rabat, Harhoura', image: 'https://images.pexels.com/photos/1604894/pexels-photo-1604894.jpeg?auto=compress&w=600', badge: 'Premium' },
  { id: '6', title: 'Siamese Purebred', price: '4,500', location: 'Rabat, Center', image: 'https://images.pexels.com/photos/2071882/pexels-photo-2071882.jpeg?auto=compress&w=600' },
  { id: '7', title: 'Maine Coon Giant', price: '11,000', location: 'Rabat, Souissi', image: 'https://images.pexels.com/photos/1404819/pexels-photo-1404819.jpeg?auto=compress&w=600' },
  { id: '8', title: 'Bombay Panther Type', price: '5,200', location: 'Rabat, Agdal', image: 'https://images.pexels.com/photos/1543793/pexels-photo-1543793.jpeg?auto=compress&w=600' },
]

function ListingCard({ item }: { item: Listing }) {
  const [saved, setSaved] = useState(false)
  return (
    <div style={{ backgroundColor: 'white', borderRadius: '1.5rem', overflow: 'hidden', boxShadow: '0 1px 2px rgba(0,0,0,0.04)', border: '1px solid #e8efec', transition: 'box-shadow 0.4s' }}
      onMouseEnter={e => e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.12)'}
      onMouseLeave={e => e.currentTarget.style.boxShadow = '0 1px 2px rgba(0,0,0,0.04)'}
    >
      <div style={{ position: 'relative', height: '256px', overflow: 'hidden', backgroundColor: '#e8efec' }}>
        <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        {item.badge && (
          <div style={{ position: 'absolute', top: '16px', left: '16px', display: 'flex', flexDirection: 'column' as const, gap: '8px' }}>
            <span style={{
              backgroundColor: item.badge === 'Diamond' ? '#2dd4bf' : item.badge === 'Verified' ? '#2dd4bf' : 'rgba(255,255,255,0.4)',
              backdropFilter: item.badge === 'Premium' ? 'blur(8px)' : undefined,
              color: 'white', fontSize: '10px', fontWeight: 700, padding: '4px 12px', borderRadius: '100px', textTransform: 'uppercase' as const, letterSpacing: '0.1em',
            }}>{item.badge}</span>
          </div>
        )}
        <button onClick={() => setSaved(!saved)} style={{ position: 'absolute', top: '16px', right: '16px', width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(8px)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
          <Heart size={18} color="white" fill={saved ? '#ef4444' : 'none'} />
        </button>
      </div>
      <div style={{ padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px', gap: '8px' }}>
          <h3 style={{ fontWeight: 700, fontSize: '17px', color: '#161d1b', lineHeight: 1.3 }}>{item.title}</h3>
          <span style={{ color: '#2dd4bf', fontWeight: 700, fontSize: '17px', whiteSpace: 'nowrap' as const }}>{item.price} <span style={{ fontSize: '11px' }}>MAD</span></span>
        </div>
        <p style={{ color: '#3c4a46', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '16px' }}>
          <MapPin size={13} /> {item.location}
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          <button style={{ padding: '9px', border: '2px solid #2dd4bf', color: '#2dd4bf', backgroundColor: 'transparent', borderRadius: '12px', fontWeight: 700, fontSize: '13px', cursor: 'pointer' }}>Message</button>
          <button style={{ padding: '9px', border: 'none', backgroundColor: '#2dd4bf', color: 'white', borderRadius: '12px', fontWeight: 700, fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>💬 WhatsApp</button>
        </div>
      </div>
    </div>
  )
}

function ListingRow({ title, items, viewAllLabel, accent }: { title: string; items: Listing[]; viewAllLabel?: string; accent: string }) {
  return (
    <section style={{ marginBottom: '0' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#161d1b', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ width: '40px', height: '4px', backgroundColor: accent, borderRadius: '100px', display: 'inline-block' }} />
          {title}
        </h2>
        {viewAllLabel && <a href="#" style={{ color: '#2dd4bf', fontWeight: 700, fontSize: '14px', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}>{viewAllLabel} →</a>}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
        {items.map(item => <ListingCard key={item.id} item={item} />)}
      </div>
    </section>
  )
}

export default function PetsAccessoriesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = React.use(params)
  const [activePill, setActivePill] = useState('')
  const [activeSeller, setActiveSeller] = useState('All Sellers')

  return (
    <div style={{ fontFamily: 'Hanken Grotesk, Inter, sans-serif', backgroundColor: '#f4fbf8', color: '#161d1b', minHeight: '100vh' }}>


      {/* HERO */}
      <section style={{ position: 'relative', height: '85vh', minHeight: '600px', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
        <img src="https://images.pexels.com/photos/6816858/pexels-photo-6816858.jpeg?auto=compress&w=1600" alt="Pet showroom"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, #f4fbf8 0%, rgba(244,251,248,0.4) 50%, transparent 100%)' }} />
        <div style={{ position: 'relative', zIndex: 10, maxWidth: '1280px', margin: '0 auto', padding: '0 40px', width: '100%' }}>
          <div style={{ maxWidth: '600px' }}>
            <h1 style={{ fontSize: '52px', fontWeight: 700, color: '#2dd4bf', marginBottom: '24px', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
              The Market<br /><span style={{ color: '#8d4f00' }}>in your Pocket</span>
            </h1>
            <p style={{ fontSize: '18px', color: '#3c4a46', marginBottom: '48px', maxWidth: '420px', lineHeight: 1.6 }}>
              Discover premium pets and high-end accessories in Morocco's most trusted discovery hub. From Rabat to the world.
            </p>
            <div style={{ backgroundColor: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.4)', padding: '16px', borderRadius: '2rem', boxShadow: '0 25px 50px rgba(0,0,0,0.15)', display: 'flex', gap: '16px', alignItems: 'center' }}>
              <div style={{ flex: 1, position: 'relative' }}>
                <Search size={18} color="#6b7a76" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
                <input placeholder="Search for breeds, services..." style={{ width: '100%', padding: '16px 16px 16px 48px', backgroundColor: 'rgba(255,255,255,0.5)', border: 'none', borderRadius: '1rem', fontSize: '14px', outline: 'none', fontFamily: 'inherit' }} />
              </div>
              <button style={{ backgroundColor: '#2dd4bf', color: 'white', padding: '16px 40px', borderRadius: '1rem', fontWeight: 700, border: 'none', cursor: 'pointer', boxShadow: '0 10px 15px -3px rgba(0,107,95,0.2)' }}>Explore</button>
            </div>
          </div>
        </div>
      </section>

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 40px' }}>

        {/* FILTER BAR */}
        <div style={{ position: 'relative', zIndex: 20, marginTop: '-40px', marginBottom: '48px' }}>
          <div style={{ backgroundColor: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.4)', padding: '8px', borderRadius: '100px', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)', display: 'flex', alignItems: 'center' }}>
            {[
              { label: 'City', value: 'Rabat', select: true, options: ['Rabat', 'Casablanca', 'Tangier'] },
              { label: 'Category', value: 'All Pets', select: true, options: ['All Pets', 'Dogs', 'Cats'] },
              { label: 'Neighborhood', value: '', placeholder: 'Agdal...' },
              { label: 'Max Price', value: '', placeholder: '5,000 MAD' },
            ].map((f, i) => (
              <div key={f.label} style={{ flex: 1, padding: '12px 24px', borderRight: '1px solid rgba(186,202,197,0.3)' }}>
                <label style={{ display: 'block', fontSize: '9px', fontWeight: 700, color: '#6b7a76', textTransform: 'uppercase' as const, letterSpacing: '0.05em', marginBottom: '2px' }}>{f.label}</label>
                {f.select ? (
                  <select style={{ width: '100%', border: 'none', background: 'transparent', fontWeight: 700, fontSize: '14px', outline: 'none', fontFamily: 'inherit' }} defaultValue={f.value}>
                    {f.options!.map(o => <option key={o}>{o}</option>)}
                  </select>
                ) : (
                  <input placeholder={f.placeholder} style={{ width: '100%', border: 'none', background: 'transparent', fontWeight: 700, fontSize: '14px', outline: 'none', fontFamily: 'inherit' }} />
                )}
              </div>
            ))}
            <button style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 32px', backgroundColor: '#e8efec', borderRadius: '100px', border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: '14px', marginLeft: '8px', whiteSpace: 'nowrap' as const }}>
              ⚙ Filters
            </button>
          </div>
        </div>

        {/* BREADCRUMB */}
        <nav style={{ display: 'flex', gap: '8px', fontSize: '12px', color: '#3c4a46', marginBottom: '16px' }}>
          <Link href={`/${locale}`} style={{ color: '#3c4a46', textDecoration: 'none' }}>Home</Link><span>/</span>
          <Link href={`/${locale}/vault`} style={{ color: '#3c4a46', textDecoration: 'none' }}>The Vault</Link><span>/</span>
          <span style={{ fontWeight: 700, color: '#161d1b' }}>Pets &amp; Accessories</span>
        </nav>

        {/* TITLE + ACTIONS */}
        <div style={{ display: 'flex', flexWrap: 'wrap' as const, alignItems: 'center', justifyContent: 'space-between', gap: '16px', marginBottom: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px' }}>
            <h1 style={{ fontSize: '24px', fontWeight: 700 }}>New and Used Pets &amp; Accessories for sale in Rabat</h1>
            <span style={{ color: '#6b7a76', fontSize: '20px' }}>797 Ads</span>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', backgroundColor: 'white', border: '1px solid rgba(186,202,197,0.3)', borderRadius: '8px', fontSize: '14px', fontWeight: 700, cursor: 'pointer' }}>
              <ArrowUpDown size={14} /> Sort: Default
            </button>
            <button style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', backgroundColor: 'white', border: '1px solid rgba(186,202,197,0.3)', borderRadius: '8px', fontSize: '14px', fontWeight: 700, cursor: 'pointer' }}>
              <Bookmark size={14} /> Save Search
            </button>
          </div>
        </div>

        {/* CATEGORY PILLS */}
        <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: '12px', marginBottom: '24px' }}>
          {categoryPills.map(p => (
            <button key={p.label} onClick={() => setActivePill(p.label)}
              style={{ padding: '10px 24px', borderRadius: '100px', border: activePill === p.label ? '2px solid #2dd4bf' : '1px solid rgba(186,202,197,0.3)', backgroundColor: activePill === p.label ? '#e8efec' : 'white', fontSize: '14px', fontWeight: 700, cursor: 'pointer', whiteSpace: 'nowrap' as const }}>
              {p.label} <span style={{ color: '#6b7a76', fontWeight: 400 }}>({p.count})</span>
            </button>
          ))}
          <button style={{ padding: '10px 24px', borderRadius: '100px', border: '2px solid #2dd4bf', color: '#2dd4bf', fontWeight: 700, fontSize: '14px', backgroundColor: 'transparent', cursor: 'pointer' }}>View More</button>
        </div>

        {/* SELLER FILTERS */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '48px' }}>
          {sellerFilters.map(s => (
            <button key={s.label} onClick={() => setActiveSeller(s.label)}
              style={{
                display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 24px', borderRadius: '8px', fontSize: '14px', fontWeight: 700, cursor: 'pointer',
                backgroundColor: activeSeller === s.label ? 'rgba(0,107,95,0.1)' : 'white',
                border: activeSeller === s.label ? '1px solid rgba(0,107,95,0.2)' : '1px solid rgba(186,202,197,0.3)',
                color: activeSeller === s.label ? '#2dd4bf' : '#3c4a46',
              }}>
              <s.icon size={16} /> {s.label}
            </button>
          ))}
        </div>

        {/* ROW 1: NOBLE COMPANIONS (DOGS) */}
        <div style={{ marginBottom: '64px' }}>
          <ListingRow title="Noble Companions" items={dogs} viewAllLabel="View All" accent="#2dd4bf" />
        </div>

        {/* INTERSTITIAL BANNERS */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '16px', marginBottom: '64px' }}>
          <div style={{ position: 'relative', borderRadius: '1.5rem', overflow: 'hidden', backgroundColor: '#2dd4bf', padding: '48px', display: 'flex', flexDirection: 'column' as const, justifyContent: 'center', minHeight: '300px' }}>
            <div style={{ position: 'relative', zIndex: 1, maxWidth: '420px' }}>
              <h2 style={{ color: 'white', fontSize: '32px', fontWeight: 700, marginBottom: '16px', lineHeight: 1.2 }}>Elevate your experience with <span style={{ color: '#62fae3' }}>Diamond Membership</span></h2>
              <p style={{ color: 'rgba(98,250,227,0.8)', marginBottom: '32px', fontSize: '15px', lineHeight: 1.6 }}>Priority listings, verified badges, and exclusive networking for serious breeders and pet lovers.</p>
              <button style={{ backgroundColor: 'white', color: '#2dd4bf', padding: '16px 40px', borderRadius: '1rem', fontWeight: 700, border: 'none', cursor: 'pointer', width: 'fit-content' }}>Learn More</button>
            </div>
            <Gem size={220} color="white" style={{ position: 'absolute', right: '48px', top: '50%', transform: 'translateY(-50%)', opacity: 0.15 }} />
          </div>
          <div style={{ borderRadius: '1.5rem', backgroundColor: '#e6e2d9', padding: '32px', display: 'flex', flexDirection: 'column' as const, justifyContent: 'space-between', position: 'relative', overflow: 'hidden' }}>
            <div>
              <h3 style={{ fontWeight: 700, fontSize: '22px', color: '#484741', marginBottom: '8px' }}>SouKni Auto Pro</h3>
              <p style={{ color: '#605e58', fontSize: '14px', lineHeight: 1.5 }}>Secure pet transport services across Morocco. Safe, vetted, and air-conditioned.</p>
            </div>
            <button style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700, color: '#2dd4bf', background: 'none', border: 'none', cursor: 'pointer', fontSize: '14px', padding: 0 }}>
              Book Transport →
            </button>
            <Truck size={130} color="#161d1b" style={{ position: 'absolute', right: '-16px', bottom: '-16px', opacity: 0.08 }} />
          </div>
        </div>

        {/* ROW 2: ELEGANT FELINES (CATS) */}
        <div style={{ marginBottom: '64px' }}>
          <ListingRow title="Elegant Felines" items={cats} viewAllLabel="Browse All Cats" accent="#8d4f00" />
        </div>

        {/* ROW 3: EXOTICS & LIVING */}
        <div style={{ marginBottom: '64px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '32px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ width: '40px', height: '4px', backgroundColor: '#605e58', borderRadius: '100px', display: 'inline-block' }} />
            Exotics &amp; Living
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
            <div style={{ backgroundColor: 'white', borderRadius: '1.5rem', overflow: 'hidden', border: '1px solid #e8efec', boxShadow: '0 1px 2px rgba(0,0,0,0.04)' }}>
              <div style={{ position: 'relative', height: '288px' }}>
                <img src="https://images.pexels.com/photos/1170986/pexels-photo-1170986.jpeg?auto=compress&w=600" alt="Macaw" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <span style={{ position: 'absolute', top: '16px', left: '16px', backgroundColor: '#8d4f00', color: 'white', padding: '4px 16px', borderRadius: '100px', fontSize: '10px', fontWeight: 700, textTransform: 'uppercase' as const, letterSpacing: '0.1em' }}>Rare Find</span>
              </div>
              <div style={{ padding: '24px' }}>
                <h3 style={{ fontWeight: 700, fontSize: '20px', marginBottom: '8px' }}>Macaw Blue &amp; Gold (Tamed)</h3>
                <p style={{ color: '#3c4a46', fontSize: '14px', marginBottom: '16px', lineHeight: 1.5 }}>Professional hand-reared macaw. Extremely friendly and starting to talk.</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: '#2dd4bf', fontWeight: 700, fontSize: '24px' }}>15,500 <span style={{ fontSize: '11px' }}>MAD</span></span>
                  <button style={{ padding: '12px', borderRadius: '50%', backgroundColor: '#2dd4bf', border: 'none', cursor: 'pointer', display: 'flex' }}><Phone size={18} color="white" /></button>
                </div>
              </div>
            </div>
            <div style={{ backgroundColor: 'white', borderRadius: '1.5rem', overflow: 'hidden', border: '1px solid #e8efec', boxShadow: '0 1px 2px rgba(0,0,0,0.04)' }}>
              <div style={{ height: '288px' }}>
                <img src="https://images.pexels.com/photos/6755109/pexels-photo-6755109.jpeg?auto=compress&w=600" alt="Cat tower" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ padding: '24px' }}>
                <h3 style={{ fontWeight: 700, fontSize: '20px', marginBottom: '8px' }}>Zen Modern Cat Tower</h3>
                <p style={{ color: '#3c4a46', fontSize: '14px', marginBottom: '16px', lineHeight: 1.5 }}>Architectural design meets pet comfort. Sustainably sourced oak wood.</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: '#2dd4bf', fontWeight: 700, fontSize: '24px' }}>2,800 <span style={{ fontSize: '11px' }}>MAD</span></span>
                  <button style={{ padding: '12px', borderRadius: '50%', backgroundColor: '#2dd4bf', border: 'none', cursor: 'pointer', display: 'flex' }}><ShoppingBag size={18} color="white" /></button>
                </div>
              </div>
            </div>
            <div style={{ backgroundColor: 'white', borderRadius: '1.5rem', overflow: 'hidden', border: '1px solid #e8efec', boxShadow: '0 1px 2px rgba(0,0,0,0.04)' }}>
              <div style={{ height: '288px' }}>
                <img src="https://images.pexels.com/photos/6235233/pexels-photo-6235233.jpeg?auto=compress&w=600" alt="Grooming salon" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ padding: '24px' }}>
                <h3 style={{ fontWeight: 700, fontSize: '20px', marginBottom: '8px' }}>Paw &amp; Order Grooming Spa</h3>
                <p style={{ color: '#3c4a46', fontSize: '14px', marginBottom: '16px', lineHeight: 1.5 }}>Full spa treatment for your pets in the heart of Rabat. Booking essential.</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: '#2dd4bf', fontWeight: 700, fontSize: '17px' }}>From 350 <span style={{ fontSize: '11px', fontWeight: 400 }}>MAD / Session</span></span>
                  <button style={{ padding: '12px', borderRadius: '50%', backgroundColor: '#2dd4bf', border: 'none', cursor: 'pointer', display: 'flex' }}><CalendarDays size={18} color="white" /></button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* APP DOWNLOAD CTA */}
        <section style={{ borderRadius: '1.5rem', backgroundColor: '#dde4e1', padding: '48px', marginBottom: '64px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', alignItems: 'center', position: 'relative', zIndex: 1 }}>
            <div>
              <h2 style={{ fontSize: '36px', fontWeight: 700, color: '#2dd4bf', marginBottom: '24px' }}>Join the SouKni Family</h2>
              <p style={{ color: '#3c4a46', fontSize: '17px', marginBottom: '32px', lineHeight: 1.6 }}>Manage your ads, track favorites, and connect with breeders instantly with our mobile app.</p>
              <div style={{ display: 'flex', gap: '16px' }}>
                <div style={{ backgroundColor: '#161d1b', color: 'white', padding: '12px 20px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
                  <div>
                    <p style={{ fontSize: '9px', textTransform: 'uppercase' as const, opacity: 0.7, fontWeight: 700, margin: 0 }}>Download on the</p>
                    <p style={{ fontSize: '16px', fontWeight: 700, margin: 0 }}>App Store</p>
                  </div>
                </div>
                <div style={{ backgroundColor: '#161d1b', color: 'white', padding: '12px 20px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
                  <div>
                    <p style={{ fontSize: '9px', textTransform: 'uppercase' as const, opacity: 0.7, fontWeight: 700, margin: 0 }}>Get it on</p>
                    <p style={{ fontSize: '16px', fontWeight: 700, margin: 0 }}>Google Play</p>
                  </div>
                </div>
              </div>
            </div>
            <img src="https://images.pexels.com/photos/3756879/pexels-photo-3756879.jpeg?auto=compress&w=800" alt="App preview"
              style={{ width: '100%', height: '256px', objectFit: 'cover', borderRadius: '1.5rem', boxShadow: '0 25px 50px rgba(0,0,0,0.2)', transform: 'rotate(3deg)' }} />
          </div>
        </section>

      </div>

      {/* FOOTER */}
    </div>
  )
}
