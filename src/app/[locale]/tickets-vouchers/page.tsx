'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { Heart, Search, MapPin, ChevronRight, MessageCircle, Diamond, ShoppingCart, CheckCircle2 } from 'lucide-react'
import VaultFooter from '@/components/sections/VaultFooter'

const subCategories = ['All Tickets', 'Concerts', 'Festivals', 'Sports', 'Cinema', 'Theater', 'Wellness', 'Other']
const sellerFilters = ['All Sellers', 'SouKni Members', 'SouKni Pro']

const topPicks = [
  { id: '1', title: 'VIP Music Festival Tickets', desc: 'Global Harmony 2026 with full backstage access and lounge entry.', price: '1,200 MAD', badge: 'Diamond', image: 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&w=600' },
  { id: '2', title: 'Luxury Spa & Wellness Voucher', desc: 'Indulge & Rejuvenate. Includes 90-minute massage and full spa access.', price: '450 MAD', badge: 'Verified', image: 'https://images.pexels.com/photos/3865560/pexels-photo-3865560.jpeg?auto=compress&w=600' },
  { id: '3', title: 'Marrakech Hot Air Balloon Pass', desc: 'A breathtaking sunrise flight over the Atlas Mountains. Breakfast included.', price: '1,850 MAD', badge: null, image: 'https://images.pexels.com/photos/2245436/pexels-photo-2245436.jpeg?auto=compress&w=600' },
  { id: '4', title: '5-Star Hotel Weekend Stay', desc: 'The Grand Oasis Hotel. 5-star experience voucher for two nights stay.', price: '2,500 MAD', badge: 'Diamond', image: 'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&w=600' },
]

const recentlyAdded = [
  { id: '5', title: 'Fine Dining Omakase for Two', desc: "Limited edition dinner voucher at 'The Jade Room'. Valid 6 months.", price: '850 MAD', cta: 'Message', image: 'https://images.pexels.com/photos/2253643/pexels-photo-2253643.jpeg?auto=compress&w=600' },
  { id: '6', title: 'Ocean Adventure Jet-Ski Pass', desc: '1-hour full throttle experience at Rabat Marina. Safety gear included.', price: '350 MAD', cta: 'WhatsApp', urgent: true, image: 'https://images.pexels.com/photos/1430676/pexels-photo-1430676.jpeg?auto=compress&w=600' },
  { id: '7', title: 'Opera Royal - Gala Night', desc: 'Premium box seat for the season opening. Formal attire required.', price: '1,100 MAD', cta: 'Message', image: 'https://images.pexels.com/photos/1916820/pexels-photo-1916820.jpeg?auto=compress&w=600' },
  { id: '8', title: 'Holistic Detox Day Spa', desc: 'Full day detox program including mud bath and organic juice plan.', price: '550 MAD', cta: 'WhatsApp', image: 'https://images.pexels.com/photos/3865711/pexels-photo-3865711.jpeg?auto=compress&w=600' },
  { id: '9', title: 'Golf Royal Dar Es Salam Pass', desc: '18-hole green fee for one player. Valid weekdays only.', price: '600 MAD', cta: 'Message', image: 'https://images.pexels.com/photos/274133/pexels-photo-274133.jpeg?auto=compress&w=600' },
  { id: '10', title: 'Classic Car City Tour', desc: 'Private 2-hour tour of Rabat in a restored 1960s convertible.', price: '950 MAD', cta: 'WhatsApp', image: 'https://images.pexels.com/photos/2127733/pexels-photo-2127733.jpeg?auto=compress&w=600' },
  { id: '11', title: 'IMAX Family Package (4)', desc: '4 tickets for any movie + Large Popcorn and Drinks. Digital voucher.', price: '280 MAD', cta: 'Message', image: 'https://images.pexels.com/photos/7991475/pexels-photo-7991475.jpeg?auto=compress&w=600' },
  { id: '12', title: 'Rooftop Pool & Brunch Pass', desc: 'Exclusive access to the SkyBar pool plus unlimited Sunday Brunch.', price: '450 MAD', cta: 'WhatsApp', image: 'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&w=600' },
]

function TopPickCard({ item }: { item: typeof topPicks[0] }) {
  const [liked, setLiked] = useState(false)
  const [hovered, setHovered] = useState(false)
  return (
    <article onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{ backgroundColor: 'white', borderRadius: '40px', overflow: 'hidden', border: '1px solid #f1f5f9', boxShadow: hovered ? '0 20px 40px rgba(0,0,0,0.12)' : '0 2px 8px rgba(0,0,0,0.05)', transition: 'all 0.3s', transform: hovered ? 'translateY(-6px)' : 'translateY(0)' }}>
      <div style={{ position: 'relative', height: '220px', overflow: 'hidden' }}>
        <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s', transform: hovered ? 'scale(1.08)' : 'scale(1)' }} />
        {item.badge && (
          <div style={{ position: 'absolute', top: '14px', left: '14px' }}>
            <span style={{ background: item.badge === 'Diamond' ? 'linear-gradient(135deg, #2dd4bf, #2dd4bf)' : 'rgba(255,255,255,0.92)', backdropFilter: 'blur(8px)', color: item.badge === 'Diamond' ? 'white' : '#2dd4bf', fontSize: '9px', fontWeight: 800, padding: '4px 12px', borderRadius: '100px', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'flex', alignItems: 'center', gap: '4px' }}>
              {item.badge === 'Diamond' && <Diamond size={10} />} {item.badge}
            </span>
          </div>
        )}
        <button onClick={() => setLiked(!liked)} style={{ position: 'absolute', top: '14px', right: '14px', width: '36px', height: '36px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
          <Heart size={15} color={liked ? '#ef4444' : 'white'} fill={liked ? '#ef4444' : 'none'} />
        </button>
      </div>
      <div style={{ padding: '20px' }}>
        <h4 style={{ fontSize: '16px', fontWeight: 700, color: '#161d1b', marginBottom: '8px', lineHeight: 1.3 }}>{item.title}</h4>
        <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '16px', lineHeight: 1.5 }}>{item.desc}</p>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: '22px', fontWeight: 800, color: '#2dd4bf' }}>{item.price}</span>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button style={{ width: '40px', height: '40px', borderRadius: '50%', border: 'none', backgroundColor: '#eef5f2', color: '#0f172a', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'background 0.15s' }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(0,107,95,0.1)'} onMouseLeave={e => e.currentTarget.style.backgroundColor = '#eef5f2'}>
              <MessageCircle size={17} />
            </button>
            <button style={{ width: '40px', height: '40px', borderRadius: '50%', border: 'none', backgroundColor: '#2dd4bf', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,107,95,0.3)' }}>
              <ShoppingCart size={17} />
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}

function RecentCard({ item }: { item: typeof recentlyAdded[0] }) {
  const [hovered, setHovered] = useState(false)
  return (
    <article onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{ backgroundColor: 'white', borderRadius: '40px', overflow: 'hidden', border: '1px solid #f1f5f9', boxShadow: hovered ? '0 20px 40px rgba(0,0,0,0.1)' : '0 2px 8px rgba(0,0,0,0.04)', transition: 'all 0.3s' }}>
      <div style={{ position: 'relative', height: '200px', overflow: 'hidden' }}>
        <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s', transform: hovered ? 'scale(1.08)' : 'scale(1)' }} />
        {item.urgent && (
          <span style={{ position: 'absolute', bottom: '14px', right: '14px', backgroundColor: 'rgba(255,255,255,0.92)', color: '#8d4f00', fontSize: '9px', fontWeight: 800, padding: '4px 10px', borderRadius: '100px', textTransform: 'uppercase' }}>Urgent</span>
        )}
      </div>
      <div style={{ padding: '20px' }}>
        <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#161d1b', marginBottom: '8px' }}>{item.title}</h4>
        <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '16px', lineHeight: 1.5 }}>{item.desc}</p>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: '20px', fontWeight: 800, color: '#2dd4bf' }}>{item.price}</span>
          <button style={{ backgroundColor: item.cta === 'WhatsApp' ? '#25D366' : '#eef5f2', color: item.cta === 'WhatsApp' ? 'white' : '#2dd4bf', border: 'none', padding: '9px 18px', borderRadius: '100px', fontWeight: 700, fontSize: '12px', cursor: 'pointer' }}>{item.cta}</button>
        </div>
      </div>
    </article>
  )
}

export default function TicketsVouchersPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = React.use(params)
  const [activeCat, setActiveCat] = useState('All Tickets')
  const [activeSeller, setActiveSeller] = useState('All Sellers')
  const [diamondFirst, setDiamondFirst] = useState(false)

  return (
    <div style={{ fontFamily: 'Inter, system-ui, sans-serif', backgroundColor: '#f4fbf8', minHeight: '100vh' }}>

      {/* HERO */}
      <section style={{ position: 'relative', height: '420px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        <img src="https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&w=1600" alt="Tickets & Vouchers"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(15,23,42,0.85), rgba(0,0,0,0.3))' }} />
        <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', padding: '0 20px', maxWidth: '700px', width: '100%' }}>
          <h1 style={{ fontSize: '44px', fontWeight: 900, color: 'white', letterSpacing: '-0.03em', marginBottom: '28px', lineHeight: 1.1 }}>Tickets & Vouchers for sale in Rabat</h1>
          <div style={{ display: 'flex', gap: '8px', backgroundColor: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.25)', borderRadius: '100px', padding: '8px 8px 8px 24px', maxWidth: '560px', margin: '0 auto' }}>
            <Search size={18} color="rgba(255,255,255,0.7)" style={{ flexShrink: 0, alignSelf: 'center' }} />
            <input type="text" placeholder="Search for experiences, events..."
              style={{ flex: 1, backgroundColor: 'transparent', border: 'none', outline: 'none', fontSize: '15px', color: 'white', fontFamily: 'Inter, sans-serif', padding: '6px 8px' }} />
            <button style={{ backgroundColor: '#2dd4bf', color: 'white', border: 'none', padding: '12px 24px', borderRadius: '100px', fontWeight: 700, fontSize: '13px', cursor: 'pointer', whiteSpace: 'nowrap' }}>Search</button>
          </div>
        </div>
      </section>

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '48px 24px 80px' }}>

        {/* BREADCRUMB */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#64748b', marginBottom: '24px' }}>
          <Link href={`/${locale}`} style={{ color: '#2dd4bf', textDecoration: 'none', fontWeight: 600 }}>Home</Link>
          <span>›</span>
          <Link href={`/${locale}/vault`} style={{ color: '#2dd4bf', textDecoration: 'none', fontWeight: 600 }}>The Vault</Link>
          <span>›</span>
          <span style={{ color: '#0f172a', fontWeight: 700 }}>Tickets & Vouchers</span>
        </nav>

        {/* FILTER BAR */}
        <div style={{ backgroundColor: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.6)', borderRadius: '20px', padding: '8px', boxShadow: '0 4px 24px rgba(0,0,0,0.06)', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)' }}>
            {[{ label: 'City', val: 'Rabat' }, { label: 'Keyword', val: 'Search experiences...' }, { label: 'Neighborhood', val: 'Enter location' }, { label: 'Price (MAD)', val: 'Any Price' }, { label: 'Filters', val: '1 selected' }].map((f, i) => (
              <div key={f.label} style={{ padding: '10px 16px', borderRight: i < 4 ? '1px solid #f1f5f9' : 'none', display: 'flex', flexDirection: 'column', cursor: 'pointer' }}>
                <span style={{ fontSize: '9px', textTransform: 'uppercase', fontWeight: 700, color: '#64748b', letterSpacing: '0.1em', marginBottom: '3px' }}>{f.label}</span>
                <span style={{ fontSize: '13px', fontWeight: 500, color: '#0f172a' }}>{f.val}</span>
              </div>
            ))}
          </div>
          <button style={{ backgroundColor: '#2dd4bf', color: 'white', border: 'none', padding: '14px 20px', borderRadius: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700, fontSize: '13px', flexShrink: 0 }}>
            <Search size={18} /> Search
          </button>
        </div>

        {/* TITLE + SORT */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
          <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#0f172a' }}>
            New and Used Tickets & Vouchers for sale in Rabat <span style={{ color: '#64748b', fontWeight: 400, fontSize: '16px' }}>897 Ads</span>
          </h2>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button style={{ border: '1px solid #e2e8f0', backgroundColor: 'white', padding: '8px 16px', borderRadius: '100px', fontSize: '13px', fontWeight: 500, color: '#64748b', cursor: 'pointer' }}>Sort: Default</button>
            <button style={{ border: '1px solid #e2e8f0', backgroundColor: 'white', padding: '8px 16px', borderRadius: '100px', fontSize: '13px', fontWeight: 500, color: '#64748b', cursor: 'pointer' }}>Save Search</button>
          </div>
        </div>

        {/* SELLER FILTERS */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '24px' }}>
          {sellerFilters.map(f => (
            <button key={f} onClick={() => setActiveSeller(f)}
              style={{ padding: '9px 22px', borderRadius: '10px', border: activeSeller === f ? 'none' : '1px solid #e2e8f0', backgroundColor: activeSeller === f ? '#2dd4bf' : 'white', color: activeSeller === f ? 'white' : '#3c4a46', fontSize: '13px', fontWeight: 600, cursor: 'pointer', transition: 'all 0.15s' }}>{f}</button>
          ))}
        </div>

        {/* TOP PICKS */}
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <h3 style={{ fontSize: '24px', fontWeight: 800, color: '#161d1b', marginBottom: '4px' }}>Top Picks</h3>
            <p style={{ fontSize: '15px', color: '#64748b' }}>Handpicked premium experiences in Rabat</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <a href="#" style={{ color: '#2dd4bf', fontWeight: 700, fontSize: '14px', textDecoration: 'none' }}>View All</a>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>Show Diamond Verified First</span>
              <div onClick={() => setDiamondFirst(!diamondFirst)}
                style={{ width: '44px', height: '24px', borderRadius: '100px', backgroundColor: diamondFirst ? '#2dd4bf' : '#e2e8f0', cursor: 'pointer', position: 'relative', transition: 'background 0.2s' }}>
                <div style={{ position: 'absolute', top: '2px', left: diamondFirst ? '22px' : '2px', width: '20px', height: '20px', borderRadius: '50%', backgroundColor: 'white', transition: 'left 0.2s', boxShadow: '0 1px 4px rgba(0,0,0,0.2)' }} />
              </div>
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '20px' }}>
          {topPicks.map(item => <TopPickCard key={item.id} item={item} />)}
        </div>

        {/* SUB-CATEGORY PILLS */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '56px' }}>
          {subCategories.map(cat => (
            <button key={cat} onClick={() => setActiveCat(cat)}
              style={{ padding: '8px 22px', borderRadius: '100px', border: 'none', cursor: 'pointer', fontSize: '13px', fontWeight: 600, backgroundColor: activeCat === cat ? '#2dd4bf' : '#e8efec', color: activeCat === cat ? 'white' : '#161d1b', transition: 'all 0.15s', whiteSpace: 'nowrap' }}>
              {cat}
            </button>
          ))}
        </div>

        {/* DIAMOND MEMBERSHIP BANNER */}
        <section style={{ borderRadius: '40px', backgroundColor: '#161d1b', padding: '56px 48px', display: 'flex', alignItems: 'center', gap: '48px', marginBottom: '56px', position: 'relative', overflow: 'hidden', flexWrap: 'wrap' }}>
          <div style={{ position: 'absolute', top: '-80px', right: '-40px', width: '320px', height: '320px', borderRadius: '50%', background: 'rgba(45,212,191,0.08)', filter: 'blur(40px)' }} />
          <div style={{ position: 'relative', zIndex: 1, flex: '1 1 420px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
              <Diamond size={28} color="#ffac5a" />
              <span style={{ fontWeight: 800, fontSize: '20px', color: 'white', letterSpacing: '-0.01em' }}>Diamond Membership</span>
            </div>
            <h3 style={{ fontSize: '34px', fontWeight: 900, color: 'white', marginBottom: '24px', lineHeight: 1.2, letterSpacing: '-0.02em' }}>Sell Faster. Reach Higher.<br />Get Verified Status.</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '32px' }}>
              {['Unlimited Premium Ad Placements', 'Verified Seller Badge & Trust Profile', 'Dedicated 24/7 Concierge Support'].map(f => (
                <div key={f} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <CheckCircle2 size={18} color="#2dd4bf" />
                  <span style={{ color: 'rgba(255,255,255,0.9)', fontSize: '15px' }}>{f}</span>
                </div>
              ))}
            </div>
            <button style={{ backgroundColor: '#2dd4bf', color: '#00201c', border: 'none', padding: '14px 32px', borderRadius: '100px', fontWeight: 800, fontSize: '14px', cursor: 'pointer' }}>Upgrade Now</button>
          </div>
          <div style={{ position: 'relative', zIndex: 1, width: '320px', aspectRatio: '16/10', borderRadius: '24px', overflow: 'hidden', flexShrink: 0 }}>
            <img src="https://images.pexels.com/photos/210600/pexels-photo-210600.jpeg?auto=compress&w=600" alt="Diamond Card" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        </section>

        {/* RECENTLY ADDED */}
        <h3 style={{ fontSize: '24px', fontWeight: 800, color: '#161d1b', marginBottom: '28px' }}>Recently Added</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '56px' }}>
          {recentlyAdded.map(item => <RecentCard key={item.id} item={item} />)}
        </div>

        {/* AUTO PRO INTERSTITIAL */}
        <section style={{ backgroundColor: '#e8efec', borderRadius: '40px', padding: '48px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '40px', marginBottom: '56px', flexWrap: 'wrap' }}>
          <div style={{ maxWidth: '500px' }}>
            <h3 style={{ fontSize: '30px', fontWeight: 800, color: '#161d1b', marginBottom: '16px', letterSpacing: '-0.01em' }}>SouKni Auto Pro</h3>
            <p style={{ fontSize: '16px', color: '#3c4a46', marginBottom: '28px', lineHeight: 1.6 }}>Elevate your dealership. Reach thousands of potential buyers every day with our advanced listing tools and AI-driven buyer matching.</p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <Link href={`/${locale}/motors`} style={{ backgroundColor: '#2dd4bf', color: 'white', border: 'none', padding: '13px 28px', borderRadius: '100px', fontWeight: 700, fontSize: '14px', textDecoration: 'none' }}>Join Auto Pro</Link>
              <button style={{ border: '1px solid #6b7a76', color: '#161d1b', backgroundColor: 'transparent', padding: '13px 28px', borderRadius: '100px', fontWeight: 700, fontSize: '14px', cursor: 'pointer' }}>Learn More</button>
            </div>
          </div>
          <div style={{ width: '180px', height: '180px', borderRadius: '50%', backgroundColor: 'rgba(0,107,95,0.1)', flexShrink: 0 }} />
        </section>

        {/* APP DOWNLOAD */}
        <section style={{ background: 'linear-gradient(135deg, #2dd4bf 0%, #0f766e 100%)', borderRadius: '40px', padding: '56px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '40px', flexWrap: 'wrap' }}>
          <div style={{ maxWidth: '480px' }}>
            <h3 style={{ fontSize: '32px', fontWeight: 900, color: 'white', marginBottom: '16px', letterSpacing: '-0.02em' }}>Join the SouKni Family</h3>
            <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '17px', marginBottom: '28px', lineHeight: 1.6 }}>Download the app to get exclusive early access to the hottest ticket deals and local vouchers in Rabat.</p>
            <div style={{ display: 'flex', gap: '12px' }}>
              {[{ store: 'App Store', sub: 'Download on the' }, { store: 'Google Play', sub: 'Get it on' }].map(btn => (
                <button key={btn.store} style={{ backgroundColor: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.2)', color: 'white', padding: '12px 22px', borderRadius: '14px', cursor: 'pointer' }}>
                  <div style={{ textAlign: 'left' }}>
                    <p style={{ fontSize: '10px', opacity: 0.7, textTransform: 'uppercase', marginBottom: '2px' }}>{btn.sub}</p>
                    <p style={{ fontSize: '15px', fontWeight: 800 }}>{btn.store}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>

      </div>
    </div>
  )
}
