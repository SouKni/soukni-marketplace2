'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Heart, Search, MapPin, Globe, DollarSign, Bell, User, ArrowUpDown, Bookmark, Users, UserCircle, BadgeCheck, ChevronDown, MessageCircle, Gem, Lightbulb, Sprout, Send, ChevronRight } from 'lucide-react'

const subCategories = ['Interior', 'Garden', 'Textiles', 'Lighting', 'Artisans']

const sellerFilters = [
  { label: 'All Sellers', icon: Users },
  { label: 'Individuals', icon: UserCircle },
  { label: 'Businesses', icon: BadgeCheck },
]

type Listing = { id: string; title: string; category: string; price: string; location: string; image: string; badge: 'Diamond' | 'Verified' }

const row1: Listing[] = [
  { id: '1', title: 'Luxury Garden Sofa Set', category: 'Furniture', price: '14,500', location: 'Rabat, Souissi', image: 'https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg?auto=compress&w=600', badge: 'Verified' },
  { id: '2', title: 'Atlas Professional Series Grill', category: 'Outdoor Kitchen', price: '8,900', location: 'Rabat, Souissi', image: 'https://images.pexels.com/photos/1857518/pexels-photo-1857518.jpeg?auto=compress&w=600', badge: 'Diamond' },
  { id: '3', title: 'Convertible Modern Daybed', category: 'Exterior', price: '6,250', location: 'Rabat, Souissi', image: 'https://images.pexels.com/photos/3637739/pexels-photo-3637739.jpeg?auto=compress&w=600', badge: 'Verified' },
  { id: '4', title: 'Hand-Carved Terracotta Planter', category: 'Artisan Pottery', price: '1,200', location: 'Rabat, Souissi', image: 'https://images.pexels.com/photos/1408221/pexels-photo-1408221.jpeg?auto=compress&w=600', badge: 'Verified' },
]

const row2: Listing[] = [
  { id: '5', title: 'Luxury Modular Outdoor Sofa', category: 'Furniture', price: '18,500', location: 'Rabat, Souissi', image: 'https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg?auto=compress&w=600', badge: 'Diamond' },
  { id: '6', title: 'High-End Cantilever Umbrella', category: 'Outdoor Shade', price: '4,200', location: 'Rabat, Souissi', image: 'https://images.pexels.com/photos/1290141/pexels-photo-1290141.jpeg?auto=compress&w=600', badge: 'Verified' },
  { id: '7', title: 'Designer Copper Fire Pit', category: 'Outdoor Heating', price: '7,800', location: 'Rabat, Souissi', image: 'https://images.pexels.com/photos/1809644/pexels-photo-1809644.jpeg?auto=compress&w=600', badge: 'Diamond' },
  { id: '8', title: 'Handcrafted Ceramic Vases (Set of 3)', category: 'Decor', price: '1,450', location: 'Marrakech, Medina', image: 'https://images.pexels.com/photos/1207918/pexels-photo-1207918.jpeg?auto=compress&w=600', badge: 'Diamond' },
]

const row3: Listing[] = [
  { id: '9', title: 'Modern Outdoor Dining Set', category: 'Furniture', price: '12,900', location: 'Rabat, Souissi', image: 'https://images.pexels.com/photos/1788218/pexels-photo-1788218.jpeg?auto=compress&w=600', badge: 'Diamond' },
  { id: '10', title: 'Robotic Lawn Mower Pro', category: 'Garden Tech', price: '15,200', location: 'Casablanca, Bouskoura', image: 'https://images.pexels.com/photos/8412381/pexels-photo-8412381.jpeg?auto=compress&w=600', badge: 'Verified' },
  { id: '11', title: 'Premium Leather Pouf', category: 'Decor', price: '850', location: 'Casablanca, Anfa', image: 'https://images.pexels.com/photos/6444256/pexels-photo-6444256.jpeg?auto=compress&w=600', badge: 'Diamond' },
  { id: '12', title: 'Luxury Outdoor Egg Chair', category: 'Furniture', price: '3,600', location: 'Tangier, Malabata', image: 'https://images.pexels.com/photos/6312368/pexels-photo-6312368.jpeg?auto=compress&w=600', badge: 'Diamond' },
]

const row4: Listing[] = [
  { id: '13', title: 'Brass Hand-Punched Lantern', category: 'Lighting', price: '1,200', location: 'Fes, Ville Nouvelle', image: 'https://images.pexels.com/photos/1112598/pexels-photo-1112598.jpeg?auto=compress&w=600', badge: 'Verified' },
  { id: '14', title: 'Teak Sun Loungers (Pair)', category: 'Furniture', price: '9,500', location: 'Agadir, Marina', image: 'https://images.pexels.com/photos/261411/pexels-photo-261411.jpeg?auto=compress&w=600', badge: 'Verified' },
  { id: '15', title: 'Smart Indoor Herb Garden', category: 'Garden Tech', price: '1,800', location: 'Rabat, Souissi', image: 'https://images.pexels.com/photos/4503267/pexels-photo-4503267.jpeg?auto=compress&w=600', badge: 'Diamond' },
  { id: '16', title: 'Handcrafted Wall Decor', category: 'Decor', price: '1,100', location: 'Rabat, Agdal', image: 'https://images.pexels.com/photos/6312372/pexels-photo-6312372.jpeg?auto=compress&w=600', badge: 'Verified' },
]

function ListingCard({ item }: { item: Listing }) {
  const [saved, setSaved] = useState(false)
  return (
    <div style={{ backgroundColor: 'white', borderRadius: '1.5rem', overflow: 'hidden', boxShadow: '0 10px 30px -10px rgba(0,107,95,0.1)', border: '1px solid #e8efec', transition: 'transform 0.3s' }}
      onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-8px)'}
      onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
    >
      <div style={{ position: 'relative', height: '256px', overflow: 'hidden' }}>
        <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', top: '16px', left: '16px' }}>
          <span style={{
            backgroundColor: item.badge === 'Diamond' ? '#2dd4bf' : '#3cddc7',
            color: '#0f9b8e', fontSize: '12px', fontWeight: 700, padding: '6px 12px', borderRadius: '100px', display: 'flex', alignItems: 'center', gap: '4px', boxShadow: '0 1px 2px rgba(0,0,0,0.06)',
          }}>{item.badge === 'Diamond' ? '💎 DIAMOND' : '✓ VERIFIED'}</span>
        </div>
        <button onClick={() => setSaved(!saved)} style={{ position: 'absolute', top: '16px', right: '16px', width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'rgba(244,251,248,0.7)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
          <Heart size={18} color="#2dd4bf" fill={saved ? '#2dd4bf' : 'none'} />
        </button>
      </div>
      <div style={{ padding: '24px' }}>
        <p style={{ color: '#3c4a46', fontSize: '11px', fontWeight: 600, textTransform: 'uppercase' as const, letterSpacing: '0.08em', marginBottom: '4px' }}>{item.location}</p>
        <h3 style={{ fontWeight: 700, fontSize: '18px', color: '#161d1b', marginBottom: '16px', whiteSpace: 'nowrap' as const, overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.title}</h3>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
          <div>
            <span style={{ color: '#2dd4bf', fontWeight: 700, fontSize: '24px' }}>{item.price}</span>
            <span style={{ color: '#3c4a46', fontSize: '13px', fontWeight: 600, marginLeft: '4px' }}>MAD</span>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button style={{ width: '40px', height: '40px', borderRadius: '50%', border: '1px solid rgba(186,202,197,0.3)', backgroundColor: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#2dd4bf' }}>
              <MessageCircle size={18} />
            </button>
            <button style={{ width: '40px', height: '40px', borderRadius: '50%', border: 'none', backgroundColor: '#2dd4bf', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#0f9b8e' }}>
              💬
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function ListingGrid({ items }: { items: Listing[] }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '64px' }}>
      {items.map(item => <ListingCard key={item.id} item={item} />)}
    </div>
  )
}

export default function HomeGardenPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = React.use(params)
  const [activeSub, setActiveSub] = useState('Garden')
  const [activeSeller, setActiveSeller] = useState('All Sellers')

  return (
    <div style={{ fontFamily: 'Hanken Grotesk, Inter, sans-serif', backgroundColor: '#f4fbf8', color: '#161d1b', minHeight: '100vh' }}>


      <main>
        {/* HERO */}
        <section style={{ position: 'relative', height: '65vh', minHeight: '480px', paddingTop: '112px', overflow: 'hidden' }}>
          <img src="https://images.pexels.com/photos/1268871/pexels-photo-1268871.jpeg?auto=compress&w=1600" alt="Outdoor living" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.3)' }} />
          <div style={{ position: 'relative', zIndex: 10, height: '100%', display: 'flex', flexDirection: 'column' as const, alignItems: 'center', justifyContent: 'center', padding: '0 40px' }}>
            <h1 style={{ color: 'white', fontSize: '48px', fontWeight: 700, marginBottom: '40px', textAlign: 'center' as const, textShadow: '0 4px 16px rgba(0,0,0,0.3)' }}>Curated Home &amp; Garden</h1>
            <div style={{ width: '100%', maxWidth: '700px' }}>
              <div style={{ display: 'flex', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(12px)', borderRadius: '100px', padding: '6px', border: '1px solid rgba(255,255,255,0.3)', boxShadow: '0 25px 50px rgba(0,0,0,0.2)' }}>
                <Search size={20} color="white" style={{ marginLeft: '20px', flexShrink: 0 }} />
                <input placeholder="Search for artisans, lighting, or gardens..." style={{ flex: 1, border: 'none', outline: 'none', background: 'transparent', color: 'white', padding: '14px 16px', fontFamily: 'inherit', fontSize: '14px' }} />
                <button style={{ backgroundColor: '#2dd4bf', color: 'white', padding: '14px 36px', borderRadius: '100px', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: '13px', whiteSpace: 'nowrap' as const }}>Explore</button>
              </div>
            </div>
          </div>
        </section>

        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 40px' }}>

          {/* FILTER BAR */}
          <section style={{ marginTop: '-40px', position: 'relative', zIndex: 20, marginBottom: '24px' }}>
            <div style={{ backgroundColor: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(12px)', border: '1px solid white', borderRadius: '100px', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)', padding: '8px', display: 'flex', alignItems: 'center' }}>
              {[
                { label: 'City', value: 'All Cities', select: true },
                { label: 'Keyword', value: 'What are you looking for?', flex: 1.5 },
                { label: 'Neighborhood', value: 'All Districts', select: true },
                { label: 'Price (MAD)', value: 'Max Price' },
              ].map((f, i) => (
                <div key={f.label} style={{ flex: f.flex || 1, padding: '8px 24px', borderRight: '1px solid rgba(186,202,197,0.3)' }}>
                  <label style={{ display: 'block', fontSize: '10px', fontWeight: 700, color: '#3c4a46', textTransform: 'uppercase' as const }}>{f.label}</label>
                  <span style={{ fontSize: '14px', fontWeight: 500, color: i === 1 ? 'rgba(60,74,70,0.4)' : '#161d1b' }}>{f.value}</span>
                </div>
              ))}
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '0 24px' }}>
                <span style={{ fontSize: '13px', fontWeight: 600, color: '#3c4a46', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>⚙ Filters</span>
                <button style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: '#2dd4bf', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 10px 15px -3px rgba(0,107,95,0.3)' }}>
                  <Search size={18} color="white" />
                </button>
              </div>
            </div>
          </section>

          {/* BREADCRUMB */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#3c4a46', padding: '16px 0 8px' }}>
            <Link href={`/${locale}`} style={{ textDecoration: 'none', color: 'inherit' }}>Home</Link><ChevronRight size={14} />
            <Link href={`/${locale}/vault`} style={{ textDecoration: 'none', color: 'inherit' }}>The Vault</Link><ChevronRight size={14} />
            <span style={{ color: '#2dd4bf', fontWeight: 600 }}>Home &amp; Garden</span>
          </nav>

          {/* SUB-CATEGORY PILLS */}
          <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: '12px', padding: '16px 0' }}>
            {subCategories.map(c => (
              <button key={c} onClick={() => setActiveSub(c)}
                style={{ padding: '8px 24px', borderRadius: '100px', fontSize: '14px', fontWeight: 600, cursor: 'pointer', border: 'none',
                  backgroundColor: activeSub === c ? '#2dd4bf' : '#eef5f2', color: activeSub === c ? 'white' : '#161d1b' }}>
                {c}
              </button>
            ))}
            <button style={{ padding: '8px 24px', borderRadius: '100px', fontSize: '14px', fontWeight: 600, border: 'none', backgroundColor: '#eef5f2', color: '#161d1b', display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}>
              View More <ChevronDown size={16} />
            </button>
          </div>

          {/* RESULTS HEADER */}
          <div style={{ display: 'flex', flexWrap: 'wrap' as const, justifyContent: 'space-between', alignItems: 'center', gap: '16px', padding: '16px 0' }}>
            <span style={{ color: '#3c4a46', fontSize: '15px' }}>New and Used Home &amp; Garden Items for sale in Rabat • 1,127 Ads</span>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', border: '1px solid rgba(186,202,197,0.3)', borderRadius: '8px', fontSize: '13px', fontWeight: 600, backgroundColor: 'transparent', cursor: 'pointer' }}><ArrowUpDown size={16} /> Sort: Default</button>
              <button style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', border: '1px solid rgba(186,202,197,0.3)', borderRadius: '8px', fontSize: '13px', fontWeight: 600, backgroundColor: 'transparent', cursor: 'pointer' }}><Bookmark size={16} /> Save Search</button>
            </div>
          </div>

          {/* SELLER FILTERS */}
          <div style={{ display: 'flex', gap: '12px', padding: '16px 0 32px' }}>
            {sellerFilters.map(s => (
              <button key={s.label} onClick={() => setActiveSeller(s.label)}
                style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 24px', borderRadius: '100px', fontSize: '14px', fontWeight: 600, cursor: 'pointer',
                  backgroundColor: activeSeller === s.label ? '#2dd4bf' : 'transparent',
                  border: activeSeller === s.label ? 'none' : '1px solid rgba(186,202,197,0.3)',
                  color: activeSeller === s.label ? 'white' : '#161d1b' }}>
                <s.icon size={16} /> {s.label}
              </button>
            ))}
          </div>

          {/* ROW 1: Featured Selection */}
          <div style={{ marginBottom: '0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#2dd4bf' }}>Featured Selection</h2>
              <a href="#" style={{ color: '#2dd4bf', fontWeight: 600, fontSize: '14px', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}>See All →</a>
            </div>
            <ListingGrid items={row1} />
          </div>

          {/* AUTO PRO BANNER */}
          <section style={{ marginBottom: '64px' }}>
            <div style={{ position: 'relative', borderRadius: '1.5rem', overflow: 'hidden', height: '192px', backgroundColor: '#2dd4bf', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 48px' }}>
              <div style={{ maxWidth: '420px' }}>
                <span style={{ display: 'inline-block', backgroundColor: 'rgba(255,255,255,0.2)', color: 'white', padding: '4px 12px', borderRadius: '100px', fontSize: '12px', fontWeight: 600, marginBottom: '12px' }}>Partner Promotion</span>
                <h3 style={{ color: 'white', fontSize: '24px', fontWeight: 700, marginBottom: '8px' }}>SouKni Auto Pro</h3>
                <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '14px' }}>Upgrade your lifestyle. Professional car delivery services now available in the hub.</p>
              </div>
              <button style={{ backgroundColor: 'white', color: '#2dd4bf', padding: '14px 32px', borderRadius: '100px', border: 'none', fontWeight: 700, fontSize: '13px', cursor: 'pointer', whiteSpace: 'nowrap' as const }}>Learn More</button>
            </div>
          </section>

          {/* ROW 2, 3, 4 */}
          <ListingGrid items={row2} />
          <ListingGrid items={row3} />
          <ListingGrid items={row4} />

          {/* SMALL CATEGORY TEASERS */}
          <section style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '16px', marginBottom: '64px' }}>
            <div style={{ position: 'relative', borderRadius: '1.5rem', overflow: 'hidden', height: '320px' }}>
              <img src="https://images.pexels.com/photos/6045236/pexels-photo-6045236.jpeg?auto=compress&w=800" alt="Artisanal Textiles" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)' }} />
              <div style={{ position: 'absolute', bottom: '32px', left: '32px', color: 'white', maxWidth: '320px' }}>
                <h4 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '8px' }}>Artisanal Textiles</h4>
                <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '14px', marginBottom: '16px' }}>Directly sourced from the Atlas Mountains.</p>
                <button style={{ backgroundColor: '#2dd4bf', color: '#0f9b8e', padding: '8px 24px', borderRadius: '100px', border: 'none', fontWeight: 700, fontSize: '13px', cursor: 'pointer' }}>Explore Collection</button>
              </div>
            </div>
            <div style={{ backgroundColor: 'white', borderRadius: '1.5rem', boxShadow: '0 10px 30px -10px rgba(0,107,95,0.1)', border: '1px solid #e8efec', padding: '24px', display: 'flex', flexDirection: 'column' as const, justifyContent: 'space-between' }}>
              <div>
                <Lightbulb size={48} color="#2dd4bf" style={{ marginBottom: '16px' }} />
                <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '8px' }}>Statement Lighting</h3>
                <p style={{ color: '#3c4a46', fontSize: '14px' }}>Bespoke lanterns and modern architectural light fixtures.</p>
              </div>
              <span style={{ color: '#2dd4bf', fontWeight: 700, marginTop: '16px' }}>From 2,400 MAD</span>
            </div>
            <div style={{ backgroundColor: 'white', borderRadius: '1.5rem', boxShadow: '0 10px 30px -10px rgba(0,107,95,0.1)', border: '1px solid #e8efec', padding: '24px', display: 'flex', flexDirection: 'column' as const, justifyContent: 'space-between' }}>
              <div>
                <Sprout size={48} color="#2dd4bf" style={{ marginBottom: '16px' }} />
                <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '8px' }}>Garden Design</h3>
                <p style={{ color: '#3c4a46', fontSize: '14px' }}>Consult with our masters for your dream oasis.</p>
              </div>
              <span style={{ color: '#2dd4bf', fontWeight: 700, marginTop: '16px' }}>Consultation: 500 MAD</span>
            </div>
          </section>

          {/* DIAMOND MEMBERSHIP BANNER */}
          <section style={{ marginBottom: '64px' }}>
            <div style={{ backgroundColor: '#161d1b', color: 'white', borderRadius: '1.5rem', padding: '40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 25px 50px rgba(0,0,0,0.3)', flexWrap: 'wrap' as const, gap: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
                <div style={{ width: '80px', height: '80px', borderRadius: '1rem', background: 'linear-gradient(135deg, #ffac5a, #8d4f00)', display: 'flex', alignItems: 'center', justifyContent: 'center', transform: 'rotate(3deg)', flexShrink: 0 }}>
                  <Gem size={40} color="white" />
                </div>
                <div>
                  <h3 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '4px' }}>Diamond Membership</h3>
                  <p style={{ color: 'rgba(255,255,255,0.6)' }}>Verified sellers, priority support, and exclusive artisan early access.</p>
                </div>
              </div>
              <button style={{ backgroundColor: 'white', color: '#161d1b', padding: '16px 32px', borderRadius: '100px', border: 'none', fontWeight: 700, fontSize: '13px', cursor: 'pointer', whiteSpace: 'nowrap' as const }}>Verify My Account</button>
            </div>
          </section>

          {/* APP DOWNLOAD CTA */}
          <section style={{ marginBottom: '64px' }}>
            <div style={{ backgroundColor: '#e2eae7', borderRadius: '1.5rem', padding: '48px', display: 'flex', flexWrap: 'wrap' as const, alignItems: 'center', gap: '32px' }}>
              <div style={{ flex: 1, minWidth: '280px' }}>
                <h3 style={{ fontSize: '32px', fontWeight: 700, color: '#2dd4bf', marginBottom: '16px' }}>Join the SouKni Family</h3>
                <p style={{ color: '#3c4a46', fontSize: '17px', marginBottom: '32px', maxWidth: '500px' }}>Get real-time updates on new artisan drops, message sellers instantly, and track your custom orders directly from your phone.</p>
                <div style={{ display: 'flex', gap: '16px' }}>
                  <button style={{ backgroundColor: '#161d1b', color: 'white', padding: '14px 28px', borderRadius: '100px', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px' }}>📱 App Store</button>
                  <button style={{ backgroundColor: '#161d1b', color: 'white', padding: '14px 28px', borderRadius: '100px', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px' }}>▶ Play Store</button>
                </div>
              </div>
            </div>
          </section>

        </div>
      </main>

      {/* FOOTER */}
    </div>
  )
}
