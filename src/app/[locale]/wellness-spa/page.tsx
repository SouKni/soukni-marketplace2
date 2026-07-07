'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Heart, Search, MapPin, Globe, DollarSign, Bell, User, ChevronDown, ArrowUpDown, Bookmark, Users, UserCircle, BadgeCheck, MessageCircle, Phone, Sliders, Car, Gem, Apple, PlayCircle, ShoppingBasket } from 'lucide-react'

const categoryPills = ['All Services', 'Beauty & Spa/Hammam', 'Counsellors & Therapists', 'Personal Trainer', 'Nutrition & Health Coach', 'Yoga Classes']

const sellerFilters = [
  { label: 'All Sellers', icon: Users },
  { label: 'SouKni Members', icon: UserCircle },
  { label: 'SouKni Pro', icon: BadgeCheck },
]

type Listing = { id: string; title: string; description: string; price: string; badge: 'Exclusive' | 'Diamond' | 'Verified' | 'New'; secondBadge?: 'Diamond'; image: string }

const featured: Listing[] = [
  { id: '1', title: 'Wellness Retreat Voucher', description: 'Full day access to luxury spa, private Hammam, and organic brunch.', price: '2,500 MAD', badge: 'Exclusive', secondBadge: 'Diamond', image: 'https://images.pexels.com/photos/3865558/pexels-photo-3865558.jpeg?auto=compress&w=600' },
  { id: '2', title: 'Sunset Balloon Flight', description: 'Exhilarating early morning or sunset flight with gourmet breakfast service.', price: '1,800 MAD', badge: 'Verified', image: 'https://images.pexels.com/photos/1646953/pexels-photo-1646953.jpeg?auto=compress&w=600' },
  { id: '3', title: 'Royal Moroccan Hammam', description: 'Traditional black soap scrub followed by rhassoul clay body wrap.', price: '650 MAD', badge: 'Diamond', image: 'https://images.pexels.com/photos/6628860/pexels-photo-6628860.jpeg?auto=compress&w=600' },
  { id: '4', title: 'Coastal Yoga Session', description: 'Guided meditation and sunrise flow on an exclusive seaside rooftop.', price: '300 MAD', badge: 'New', image: 'https://images.pexels.com/photos/3760275/pexels-photo-3760275.jpeg?auto=compress&w=600' },
]

const row2: Listing[] = [
  { id: '5', title: 'Deep Tissue Therapy', description: '90-minute intensive muscle recovery session with organic essential oils.', price: '450 MAD', badge: 'Diamond', image: 'https://images.pexels.com/photos/3865676/pexels-photo-3865676.jpeg?auto=compress&w=600' },
  { id: '6', title: 'Radiance Facial', description: 'Advanced vitamin C infusion for a natural, healthy glow.', price: '550 MAD', badge: 'Verified', image: 'https://images.pexels.com/photos/3373739/pexels-photo-3373739.jpeg?auto=compress&w=600' },
  { id: '7', title: 'Zen Aromatherapy', description: 'Relaxing full-body massage using premium Atlas cedarwood oils.', price: '400 MAD', badge: 'Diamond', image: 'https://images.pexels.com/photos/4465124/pexels-photo-4465124.jpeg?auto=compress&w=600' },
  { id: '8', title: 'Mindfulness Session', description: 'Group meditation class focused on stress reduction and clarity.', price: '200 MAD', badge: 'New', image: 'https://images.pexels.com/photos/3094230/pexels-photo-3094230.jpeg?auto=compress&w=600' },
]

const row3: Listing[] = [
  { id: '9', title: 'Hot Stone Ritual', description: 'Ancient healing technique using heated volcanic stones.', price: '700 MAD', badge: 'Verified', image: 'https://images.pexels.com/photos/3865792/pexels-photo-3865792.jpeg?auto=compress&w=600' },
  { id: '10', title: 'Luxury Manicure', description: 'Complete hand care with paraffin wax and premium polish.', price: '350 MAD', badge: 'Diamond', image: 'https://images.pexels.com/photos/3997390/pexels-photo-3997390.jpeg?auto=compress&w=600' },
  { id: '11', title: 'Seaweed Detox Wrap', description: 'Purifying body treatment using mineral-rich Atlantic seaweed.', price: '600 MAD', badge: 'Verified', image: 'https://images.pexels.com/photos/3865557/pexels-photo-3865557.jpeg?auto=compress&w=600' },
  { id: '12', title: 'Foot Reflexology', description: 'Targeted pressure point therapy for total body balance.', price: '300 MAD', badge: 'Diamond', image: 'https://images.pexels.com/photos/3865712/pexels-photo-3865712.jpeg?auto=compress&w=600' },
]

const row4: Listing[] = [
  { id: '13', title: 'Vinyasa Flow Workshop', description: 'Dynamic 2-hour workshop for intermediate practitioners.', price: '250 MAD', badge: 'Verified', image: 'https://images.pexels.com/photos/3823039/pexels-photo-3823039.jpeg?auto=compress&w=600' },
  { id: '14', title: 'Royal Pedicure', description: 'Exfoliating scrub and massage followed by professional styling.', price: '380 MAD', badge: 'Diamond', image: 'https://images.pexels.com/photos/3997389/pexels-photo-3997389.jpeg?auto=compress&w=600' },
  { id: '15', title: 'Traditional Thai Massage', description: 'Ancient stretching and pressure point therapy for flexibility.', price: '500 MAD', badge: 'Verified', image: 'https://images.pexels.com/photos/3865677/pexels-photo-3865677.jpeg?auto=compress&w=600' },
  { id: '16', title: 'Anti-Aging Lift', description: 'Premium collagen-boosting treatment for firm, youthful skin.', price: '850 MAD', badge: 'Diamond', image: 'https://images.pexels.com/photos/3764568/pexels-photo-3764568.jpeg?auto=compress&w=600' },
]

function ListingCard({ item }: { item: Listing }) {
  const [saved, setSaved] = useState(false)
  return (
    <div style={{ backgroundColor: 'white', borderRadius: '2rem', overflow: 'hidden', boxShadow: '0 1px 2px rgba(0,0,0,0.04)', border: '1px solid rgba(186,202,197,0.1)', transition: 'box-shadow 0.5s' }}
      onMouseEnter={e => e.currentTarget.style.boxShadow = '0 24px 48px -12px rgba(0,107,95,0.08)'}
      onMouseLeave={e => e.currentTarget.style.boxShadow = '0 1px 2px rgba(0,0,0,0.04)'}
    >
      <div style={{ position: 'relative', aspectRatio: '4/5', overflow: 'hidden' }}>
        <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', top: '16px', left: '16px', display: 'flex', gap: '8px' }}>
          <span style={{
            backgroundColor: item.badge === 'Diamond' || item.secondBadge === 'Diamond' ? 'rgba(255,255,255,0.7)' : '#2dd4bf',
            backdropFilter: item.badge === 'Diamond' ? 'blur(16px)' : undefined,
            color: item.badge === 'Diamond' ? '#2dd4bf' : 'white',
            fontSize: '10px', fontWeight: 700, padding: '4px 12px', borderRadius: '100px', textTransform: 'uppercase' as const, letterSpacing: '0.05em', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
          }}>{item.badge}</span>
          {item.secondBadge && (
            <span style={{ backgroundColor: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(16px)', color: '#2dd4bf', fontSize: '10px', fontWeight: 700, padding: '4px 12px', borderRadius: '100px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}>{item.secondBadge}</span>
          )}
        </div>
        <button onClick={() => setSaved(!saved)} style={{ position: 'absolute', top: '16px', right: '16px', width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(16px)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
          <Heart size={18} color="#2dd4bf" fill={saved ? '#2dd4bf' : 'none'} />
        </button>
      </div>
      <div style={{ padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px', gap: '8px' }}>
          <h3 style={{ fontSize: '20px', fontWeight: 600, color: '#161d1b' }}>{item.title}</h3>
          <span style={{ color: '#2dd4bf', fontWeight: 700, whiteSpace: 'nowrap' as const }}>{item.price}</span>
        </div>
        <p style={{ color: '#3c4a46', fontSize: '15px', marginBottom: '24px', lineHeight: 1.6, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' as const, overflow: 'hidden' }}>{item.description}</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', paddingTop: '16px', borderTop: '1px solid rgba(186,202,197,0.2)' }}>
          <button style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', color: '#2dd4bf', backgroundColor: 'rgba(45,212,191,0.1)', border: 'none', padding: '8px', borderRadius: '12px', cursor: 'pointer' }}>
            <MessageCircle size={20} />
          </button>
          <button style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', color: '#25D366', backgroundColor: 'rgba(37,211,102,0.08)', border: 'none', padding: '8px', borderRadius: '12px', cursor: 'pointer' }}>
            <Phone size={18} fill="#25D366" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default function WellnessSpaPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = React.use(params)
  const [activePill, setActivePill] = useState('All Services')
  const [activeSeller, setActiveSeller] = useState('All Sellers')
  const [diamondFirst, setDiamondFirst] = useState(true)

  return (
    <div style={{ fontFamily: 'Hanken Grotesk, Inter, sans-serif', backgroundColor: '#f4fbf8', color: '#161d1b', minHeight: '100vh' }}>

      {/* HEADER LINE 1 */}
      <header style={{ position: 'sticky', top: 0, zIndex: 100, backgroundColor: 'rgba(244,251,248,0.8)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.4)' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 40px', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
            <Link href={`/${locale}`} style={{ fontSize: '26px', fontWeight: 700, color: '#2dd4bf', textDecoration: 'none', letterSpacing: '-0.02em' }}>SouKni</Link>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#3c4a46' }}>
              <span style={{ fontSize: '14px' }}>Cities:</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '6px 16px', backgroundColor: 'rgba(45,212,191,0.2)', border: '1px solid rgba(0,107,95,0.2)', borderRadius: '100px', color: '#2dd4bf', fontWeight: 600, cursor: 'pointer' }}>
                Rabat <ChevronDown size={16} />
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <button style={{ backgroundColor: '#2dd4bf', color: 'white', padding: '10px 24px', borderRadius: '100px', fontWeight: 600, border: 'none', cursor: 'pointer', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
              Place your 100% FREE Ad
            </button>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', color: '#3c4a46' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}><Globe size={20} /><span style={{ fontSize: '13px' }}>EN</span></div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}><DollarSign size={20} /><span style={{ fontSize: '13px' }}>MAD</span></div>
              <Heart size={20} style={{ cursor: 'pointer' }} />
              <Bell size={20} style={{ cursor: 'pointer' }} />
              <User size={22} style={{ cursor: 'pointer' }} />
            </div>
          </div>
        </div>
      </header>

      {/* HEADER LINE 2 */}
      <nav style={{ backgroundColor: 'white', borderBottom: '1px solid rgba(186,202,197,0.1)' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '16px 40px', display: 'flex', alignItems: 'center', gap: '32px', overflowX: 'auto' as const }}>
          {['Motors', 'Property', 'The Vault'].map(item => (
            <span key={item} style={{ fontSize: '14px', color: '#3c4a46', cursor: 'pointer', whiteSpace: 'nowrap' as const }}>{item}</span>
          ))}
          <span style={{ fontSize: '14px', color: '#2dd4bf', fontWeight: 600, borderBottom: '2px solid #2dd4bf', paddingBottom: '4px', cursor: 'pointer', whiteSpace: 'nowrap' as const }}>Wellness &amp; Spa</span>
          {['Mobiles & Electronics', 'Fashion'].map(item => (
            <span key={item} style={{ fontSize: '14px', color: '#3c4a46', cursor: 'pointer', whiteSpace: 'nowrap' as const }}>{item}</span>
          ))}
        </div>
      </nav>

      <main style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 40px' }}>

        {/* HERO */}
        <section style={{ marginTop: '32px', position: 'relative', height: '500px', borderRadius: '3rem', overflow: 'hidden', boxShadow: '0 25px 50px rgba(0,0,0,0.25)' }}>
          <img src="https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg?auto=compress&w=1600" alt="Moroccan spa courtyard" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.2)' }} />
          <div style={{ position: 'relative', zIndex: 10, height: '100%', display: 'flex', flexDirection: 'column' as const, alignItems: 'center', justifyContent: 'center', padding: '0 24px', textAlign: 'center' as const }}>
            <h1 style={{ color: 'white', fontSize: '48px', fontWeight: 700, marginBottom: '32px', textShadow: '0 4px 16px rgba(0,0,0,0.3)' }}>Rejuvenate Your Senses</h1>
            <div style={{ width: '100%', maxWidth: '700px', backgroundColor: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '100px', padding: '8px', display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 25px 50px rgba(0,0,0,0.25)' }}>
              <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '12px', padding: '0 24px' }}>
                <Search size={18} color="#2dd4bf" />
                <input placeholder="Search for Hamman, Massage, or Yoga retreats..." style={{ border: 'none', outline: 'none', background: 'transparent', width: '100%', color: 'white', fontFamily: 'inherit', fontSize: '14px', padding: '12px 0' }} />
              </div>
              <button style={{ backgroundColor: '#2dd4bf', color: 'white', height: '48px', padding: '0 32px', borderRadius: '100px', border: 'none', cursor: 'pointer', fontWeight: 600 }}>Explore</button>
            </div>
          </div>
        </section>

        {/* FILTER BAR */}
        <section style={{ marginTop: '32px' }}>
          <div style={{ backgroundColor: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.4)', borderRadius: '100px', boxShadow: '0 24px 48px -12px rgba(0,107,95,0.08)', padding: '16px', display: 'flex', alignItems: 'center' }}>
            {[
              { label: 'City', value: 'Rabat' },
              { label: 'Keyword', value: 'Search services...', muted: true },
              { label: 'Neighborhood', value: 'All areas', muted: true },
              { label: 'Price (MAD)', value: 'Any price', muted: true },
            ].map((f, i) => (
              <div key={f.label} style={{ flex: 1, padding: '0 24px', borderRight: '1px solid rgba(186,202,197,0.3)', display: 'flex', flexDirection: 'column' as const }}>
                <span style={{ fontSize: '10px', textTransform: 'uppercase' as const, color: '#6b7a76', fontWeight: 700, letterSpacing: '0.05em' }}>{f.label}</span>
                <span style={{ fontWeight: f.muted ? 400 : 600, color: f.muted ? 'rgba(107,122,118,0.6)' : '#161d1b' }}>{f.value}</span>
              </div>
            ))}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '0 24px' }}>
              <button style={{ backgroundColor: '#2dd4bf', color: 'white', width: '48px', height: '48px', borderRadius: '50%', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Search size={18} />
              </button>
              <button style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'none', border: 'none', cursor: 'pointer', color: '#3c4a46', fontWeight: 600 }}>
                <Sliders size={18} /> Filters
              </button>
            </div>
          </div>
        </section>

        {/* RESULTS HEADER */}
        <div style={{ marginTop: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(186,202,197,0.1)', paddingBottom: '16px', flexWrap: 'wrap' as const, gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#3c4a46', fontWeight: 600 }}>
            <span>Wellness &amp; Spa in Rabat</span>
            <span style={{ color: '#6b7a76', fontWeight: 400 }}>• 124 Ads</span>
          </div>
          <div style={{ display: 'flex', gap: '16px' }}>
            <button style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', borderRadius: '100px', border: '1px solid rgba(186,202,197,0.3)', backgroundColor: 'transparent', color: '#3c4a46', cursor: 'pointer', fontSize: '14px' }}>
              <ArrowUpDown size={16} /> Sort: Default
            </button>
            <button style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', borderRadius: '100px', border: '1px solid rgba(186,202,197,0.3)', backgroundColor: 'transparent', color: '#2dd4bf', cursor: 'pointer', fontSize: '14px' }}>
              <Bookmark size={16} /> Save Search
            </button>
          </div>
        </div>

        {/* CATEGORY PILLS */}
        <div style={{ marginTop: '48px', display: 'flex', gap: '12px', overflowX: 'auto' as const, paddingBottom: '8px' }}>
          {categoryPills.map(c => (
            <button key={c} onClick={() => setActivePill(c)}
              style={{ whiteSpace: 'nowrap' as const, padding: '12px 24px', borderRadius: '100px', fontSize: '14px', fontWeight: 700, cursor: 'pointer',
                backgroundColor: activePill === c ? 'rgba(45,212,191,0.15)' : 'white', border: activePill === c ? '1px solid rgba(255,255,255,0.3)' : '1px solid rgba(186,202,197,0.3)',
                color: activePill === c ? '#2dd4bf' : '#3c4a46' }}>
              {c}
            </button>
          ))}
          <button style={{ display: 'flex', alignItems: 'center', gap: '4px', whiteSpace: 'nowrap' as const, padding: '12px 24px', borderRadius: '100px', fontSize: '14px', fontWeight: 600, border: '1px solid rgba(186,202,197,0.3)', backgroundColor: 'white', color: '#3c4a46', cursor: 'pointer' }}>
            View More <ChevronDown size={16} />
          </button>
        </div>

        {/* SELLER FILTERS + TOGGLE */}
        <div style={{ marginTop: '32px', display: 'flex', flexWrap: 'wrap' as const, justifyContent: 'space-between', alignItems: 'center', gap: '16px' }}>
          <div style={{ display: 'flex', gap: '12px' }}>
            {sellerFilters.map(s => (
              <button key={s.label} onClick={() => setActiveSeller(s.label)}
                style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 24px', borderRadius: '100px', fontSize: '13px', fontWeight: 700, cursor: 'pointer',
                  backgroundColor: activeSeller === s.label ? 'rgba(45,212,191,0.15)' : 'white', border: activeSeller === s.label ? 'none' : '1px solid rgba(186,202,197,0.3)',
                  color: activeSeller === s.label ? '#2dd4bf' : '#3c4a46' }}>
                <s.icon size={16} /> {s.label}
              </button>
            ))}
          </div>
          <button onClick={() => setDiamondFirst(!diamondFirst)} style={{ display: 'flex', alignItems: 'center', gap: '16px', backgroundColor: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(12px)', padding: '8px 24px', borderRadius: '100px', border: '1px solid rgba(186,202,197,0.2)', boxShadow: '0 1px 2px rgba(0,0,0,0.04)', cursor: 'pointer' }}>
            <span style={{ fontSize: '13px', color: '#3c4a46', fontWeight: 600 }}>Show SouKni Diamond Verified First</span>
            <div style={{ width: '40px', height: '20px', borderRadius: '100px', backgroundColor: diamondFirst ? '#2dd4bf' : '#bacac5', position: 'relative' }}>
              <div style={{ position: 'absolute', top: '2px', left: diamondFirst ? '22px' : '2px', width: '16px', height: '16px', borderRadius: '50%', backgroundColor: 'white', transition: 'left 0.2s', boxShadow: '0 1px 2px rgba(0,0,0,0.2)' }} />
            </div>
          </button>
        </div>

        {/* ROW 1: FEATURED */}
        <section style={{ marginTop: '48px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
            {featured.map(item => <ListingCard key={item.id} item={item} />)}
          </div>
        </section>

        {/* INTERSTITIAL BANNERS */}
        <section style={{ marginTop: '64px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div style={{ background: 'linear-gradient(135deg, #2dd4bf, #2dd4bf)', borderRadius: '2.5rem', padding: '40px', color: 'white', height: '288px', display: 'flex', flexDirection: 'column' as const, justifyContent: 'space-between', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'relative', zIndex: 1 }}>
              <span style={{ backgroundColor: 'rgba(255,255,255,0.2)', fontSize: '10px', padding: '4px 12px', borderRadius: '100px', fontWeight: 700, textTransform: 'uppercase' as const, letterSpacing: '0.05em' }}>New Partnership</span>
              <h2 style={{ fontSize: '36px', fontWeight: 700, marginTop: '16px' }}>SouKni Auto Pro</h2>
              <p style={{ opacity: 0.9, maxWidth: '320px', marginTop: '8px' }}>Arrive at your wellness retreat in style. Exclusive chauffeur services for Diamond members.</p>
            </div>
            <button style={{ position: 'relative', zIndex: 1, backgroundColor: 'white', color: '#2dd4bf', padding: '12px 32px', borderRadius: '100px', border: 'none', fontWeight: 700, cursor: 'pointer', width: 'fit-content' }}>Learn More</button>
            <Car size={200} color="white" style={{ position: 'absolute', right: '-40px', bottom: '-40px', opacity: 0.2, transform: 'rotate(12deg)' }} />
          </div>
          <div style={{ backgroundColor: '#2dd4bf', borderRadius: '2.5rem', padding: '40px', color: 'white', height: '288px', display: 'flex', flexDirection: 'column' as const, justifyContent: 'space-between', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'relative', zIndex: 1 }}>
              <span style={{ backgroundColor: 'rgba(255,255,255,0.2)', fontSize: '10px', padding: '4px 12px', borderRadius: '100px', fontWeight: 700, textTransform: 'uppercase' as const, letterSpacing: '0.05em' }}>Upgrade Now</span>
              <h2 style={{ fontSize: '36px', fontWeight: 700, marginTop: '16px' }}>Diamond Membership</h2>
              <p style={{ opacity: 0.9, maxWidth: '320px', marginTop: '8px' }}>Unlock early access, zero commission on vouchers, and priority concierge support.</p>
            </div>
            <button style={{ position: 'relative', zIndex: 1, backgroundColor: 'white', color: '#2dd4bf', padding: '12px 32px', borderRadius: '100px', border: 'none', fontWeight: 700, cursor: 'pointer', width: 'fit-content' }}>Get Verified</button>
            <Gem size={200} color="white" style={{ position: 'absolute', right: '-40px', bottom: '-40px', opacity: 0.2, transform: 'rotate(12deg)' }} />
          </div>
        </section>

        {/* ROW 2, 3, 4 */}
        <section style={{ marginTop: '48px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
          {row2.map(item => <ListingCard key={item.id} item={item} />)}
        </section>
        <section style={{ marginTop: '16px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
          {row3.map(item => <ListingCard key={item.id} item={item} />)}
        </section>
        <section style={{ marginTop: '16px', marginBottom: '64px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
          {row4.map(item => <ListingCard key={item.id} item={item} />)}
        </section>

        {/* APP DOWNLOAD CTA */}
        <section style={{ marginBottom: '64px' }}>
          <div style={{ background: 'linear-gradient(135deg, #2dd4bf, #2dd4bf)', borderRadius: '3rem', overflow: 'hidden', position: 'relative', height: '400px', boxShadow: '0 25px 50px rgba(0,0,0,0.25)' }}>
            <div style={{ position: 'relative', zIndex: 10, display: 'grid', gridTemplateColumns: '1fr 1fr', height: '100%' }}>
              <div style={{ display: 'flex', flexDirection: 'column' as const, justifyContent: 'center', padding: '64px', color: 'white' }}>
                <span style={{ fontSize: '12px', textTransform: 'uppercase' as const, letterSpacing: '0.3em', fontWeight: 700, opacity: 0.9, marginBottom: '16px' }}>Join the SouKni Family</span>
                <h2 style={{ fontSize: '40px', fontWeight: 700, marginBottom: '24px' }}>Download the SouKni App</h2>
                <p style={{ opacity: 0.9, fontSize: '18px', marginBottom: '32px', maxWidth: '420px', lineHeight: 1.6 }}>Experience Morocco's finest luxury marketplace at your fingertips. Exclusive early access, personalized concierge, and seamless bookings.</p>
                <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: '12px' }}>
                  <div style={{ backgroundColor: 'rgba(0,0,0,0.2)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.2)', padding: '12px 24px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
                    <Apple size={20} />
                    <div><p style={{ fontSize: '9px', textTransform: 'uppercase' as const, margin: 0 }}>Download on the</p><p style={{ fontWeight: 700, margin: 0 }}>App Store</p></div>
                  </div>
                  <div style={{ backgroundColor: 'rgba(0,0,0,0.2)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.2)', padding: '12px 24px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
                    <PlayCircle size={20} />
                    <div><p style={{ fontSize: '9px', textTransform: 'uppercase' as const, margin: 0 }}>Get it on</p><p style={{ fontWeight: 700, margin: 0 }}>Google Play</p></div>
                  </div>
                  <div style={{ backgroundColor: 'rgba(0,0,0,0.2)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.2)', padding: '12px 24px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
                    <ShoppingBasket size={20} />
                    <div><p style={{ fontSize: '9px', textTransform: 'uppercase' as const, margin: 0 }}>Explore on</p><p style={{ fontWeight: 700, margin: 0 }}>AppGallery</p></div>
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
                <div style={{ width: '288px', height: '480px', backgroundColor: 'white', borderRadius: '3rem', border: '8px solid black', boxShadow: '0 25px 50px rgba(0,0,0,0.4)', overflow: 'hidden', transform: 'translateY(80px) rotate(-5deg)' }}>
                  <img src="https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg?auto=compress&w=400" alt="App preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer style={{ backgroundColor: '#7A7A7A', padding: '80px 40px', color: 'white' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '48px' }}>
          <div>
            <h3 style={{ fontSize: '24px', fontWeight: 700, color: '#2dd4bf', marginBottom: '24px' }}>SouKni</h3>
            <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '15px', marginBottom: '32px', lineHeight: 1.6 }}>Morocco's premier marketplace for curated luxury experiences and artisanal heritage.</p>
          </div>
          <div>
            <h4 style={{ fontSize: '13px', fontWeight: 700, textTransform: 'uppercase' as const, letterSpacing: '0.1em', marginBottom: '24px' }}>Quick Links</h4>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column' as const, gap: '16px' }}>
              {['Sustainability Charter', 'Concierge Services', 'Privacy Policy', 'Heritage & Craft', 'Global Shipping'].map(l => (
                <li key={l}><a href="#" style={{ color: 'rgba(255,255,255,0.9)', textDecoration: 'none', fontSize: '14px' }}>{l}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 style={{ fontSize: '13px', fontWeight: 700, textTransform: 'uppercase' as const, letterSpacing: '0.1em', marginBottom: '24px' }}>Categories</h4>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column' as const, gap: '16px' }}>
              {['Luxury Real Estate', 'Art & Antiques', 'Rare Timepieces', 'Wellness & Spa', 'Automotive'].map(l => (
                <li key={l}><a href="#" style={{ color: 'rgba(255,255,255,0.9)', textDecoration: 'none', fontSize: '14px' }}>{l}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 style={{ fontSize: '13px', fontWeight: 700, textTransform: 'uppercase' as const, letterSpacing: '0.1em', marginBottom: '24px' }}>Newsletter</h4>
            <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '14px', marginBottom: '16px' }}>Stay updated with the latest luxury arrivals.</p>
            <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '12px' }}>
              <input placeholder="Email address" style={{ backgroundColor: 'white', border: '1px solid rgba(186,202,197,0.3)', borderRadius: '100px', padding: '12px 24px', outline: 'none', fontFamily: 'inherit' }} />
              <button style={{ backgroundColor: '#2dd4bf', color: 'white', fontWeight: 700, padding: '12px', borderRadius: '100px', border: 'none', cursor: 'pointer' }}>Subscribe</button>
            </div>
          </div>
        </div>
        <div style={{ maxWidth: '1440px', margin: '64px auto 0', paddingTop: '32px', borderTop: '1px solid rgba(186,202,197,0.2)', display: 'flex', flexWrap: 'wrap' as const, justifyContent: 'space-between', alignItems: 'center', gap: '16px' }}>
          <span style={{ color: 'rgba(255,255,255,0.9)', fontSize: '13px', textTransform: 'uppercase' as const, letterSpacing: '0.05em' }}>© 2026 SouKni Luxury Marketplace. All rights reserved.</span>
          <div style={{ display: 'flex', gap: '32px' }}>
            {['Terms', 'Security', 'Accessibility'].map(l => (
              <a key={l} href="#" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '13px', textTransform: 'uppercase' as const, letterSpacing: '0.05em' }}>{l}</a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  )
}
