'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Heart, Search, MapPin, Globe, DollarSign, Bell, User, ChevronDown, ChevronRight, MessageCircle, ShoppingCart, Gem, ArrowRight } from 'lucide-react'

const subCategories = ['Vintage Watches', 'Rare Coins', 'Fine Art', 'Moroccan Silver', 'Antique Furniture', 'Classic Cars']

const sellerFilters = ['All Sellers', 'Individuals', 'Businesses']

type Listing = {
  id: string; badge: string; badgeColor: string; eyebrow: string; price: string
  title: string; description: string; seller: string; image: string
}

const rareFinds: Listing[] = [
  { id: '1', badge: 'Verified Legacy', badgeColor: '#2dd4bf', eyebrow: 'Rolex Heritage', price: '345,000 MAD', title: '1974 Submariner Ref. 5513', description: "Exceptional 'Ghost Bezel' variant with original box and Moroccan papers.", seller: 'Rabat Jewels', image: 'https://images.pexels.com/photos/9978722/pexels-photo-9978722.jpeg?auto=compress&w=600' },
  { id: '2', badge: 'Museum Grade', badgeColor: '#8d4f00', eyebrow: 'Heritage Silver', price: '82,500 MAD', title: '19th Century Fes Teaset', description: "Authenticated 925 silver with the sultanate's royal hallmark. Pristine condition.", seller: 'Antique Vault', image: 'https://images.pexels.com/photos/6044266/pexels-photo-6044266.jpeg?auto=compress&w=600' },
  { id: '3', badge: 'NGC Certified', badgeColor: '#2dd4bf', eyebrow: 'Numismatics', price: '120,000 MAD', title: 'Almohad Gold Dinar', description: 'Extremely rare specimen from the 12th century. MS-64 certification grade.', seller: 'Heritage Coins', image: 'https://images.pexels.com/photos/8358148/pexels-photo-8358148.jpeg?auto=compress&w=600' },
  { id: '4', badge: 'Art House', badgeColor: '#8d4f00', eyebrow: 'Fine Art', price: '55,000 MAD', title: 'Dahbi: "Sahara Echo"', description: 'Original mixed media on canvas. Signed and dated 2024 by the artist.', seller: 'Rabat Modern', image: 'https://images.pexels.com/photos/1674049/pexels-photo-1674049.jpeg?auto=compress&w=600' },
]

const heritageItems = [
  { eyebrow: 'New Arrivals', eyebrowColor: '#8d4f00', title: 'Limited Edition Art Toys', price: 'From 4,200 MAD', cta: 'Explore Batch', ctaStyle: 'light', image: 'https://images.pexels.com/photos/1670977/pexels-photo-1670977.jpeg?auto=compress&w=600' },
  { eyebrow: 'Expert Services', eyebrowColor: '#2dd4bf', title: 'Horology Authentication', price: 'Standard: 1,500 MAD', cta: 'Book Service', ctaStyle: 'light', image: 'https://images.pexels.com/photos/9978722/pexels-photo-9978722.jpeg?auto=compress&w=600' },
  { eyebrow: 'Community', eyebrowColor: '#3cddc7', title: "The Collector's Circle", price: 'Weekly Events', cta: 'View Calendar', ctaStyle: 'dark', image: 'https://images.pexels.com/photos/6044226/pexels-photo-6044226.jpeg?auto=compress&w=600' },
]

function ListingCard({ item }: { item: Listing }) {
  return (
    <div style={{ backgroundColor: 'white', borderRadius: '2rem', overflow: 'hidden', border: '1px solid rgba(186,202,197,0.2)', transition: 'all 0.5s' }}
      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 20px 40px -15px rgba(0,107,95,0.1)' }}
      onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none' }}
    >
      <div style={{ position: 'relative', aspectRatio: '4/5', overflow: 'hidden' }}>
        <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <span style={{ position: 'absolute', top: '16px', left: '16px', backgroundColor: item.badgeColor, color: 'white', fontSize: '10px', fontWeight: 700, padding: '4px 12px', borderRadius: '100px', textTransform: 'uppercase' as const, letterSpacing: '-0.02em' }}>{item.badge}</span>
        <div style={{ position: 'absolute', bottom: '16px', left: '16px', right: '16px' }}>
          <div style={{ backgroundColor: 'rgba(255,255,255,0.65)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.4)', padding: '8px 16px', borderRadius: '1rem', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)', display: 'inline-block' }}>
            <p style={{ fontSize: '10px', color: '#3c4a46', fontWeight: 700, textTransform: 'uppercase' as const, marginBottom: '2px' }}>{item.eyebrow}</p>
            <p style={{ fontSize: '18px', color: '#2dd4bf', fontWeight: 700 }}>{item.price}</p>
          </div>
        </div>
      </div>
      <div style={{ padding: '24px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '4px' }}>{item.title}</h3>
        <p style={{ color: '#3c4a46', fontSize: '14px', marginBottom: '16px', lineHeight: 1.5, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' as const, overflow: 'hidden' }}>{item.description}</p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '16px', borderTop: '1px solid rgba(186,202,197,0.2)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#e6e2d9' }} />
            <span style={{ fontSize: '13px', fontWeight: 700 }}>{item.seller}</span>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button style={{ width: '40px', height: '40px', borderRadius: '50%', border: '1px solid rgba(186,202,197,0.4)', backgroundColor: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}><MessageCircle size={18} /></button>
            <button style={{ width: '40px', height: '40px', borderRadius: '50%', border: 'none', backgroundColor: '#2dd4bf', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}><ShoppingCart size={18} /></button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function CollectiblesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = React.use(params)
  const [activeSub, setActiveSub] = useState('Vintage Watches')
  const [activeSeller, setActiveSeller] = useState('All Sellers')
  const [diamondFirst, setDiamondFirst] = useState(true)

  return (
    <div style={{ fontFamily: 'Hanken Grotesk, Inter, sans-serif', backgroundColor: '#f4fbf8', color: '#161d1b', minHeight: '100vh' }}>

      {/* HEADER LINE 1 */}
      <header style={{ position: 'sticky', top: 0, zIndex: 100, backgroundColor: 'rgba(244,251,248,0.8)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.4)' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 40px', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <Link href={`/${locale}`} style={{ fontSize: '28px', fontWeight: 700, color: '#2dd4bf', textDecoration: 'none', letterSpacing: '-0.02em' }}>SouKni</Link>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '11px', color: '#3c4a46', textTransform: 'uppercase' as const, letterSpacing: '0.05em' }}>Cities:</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '6px 14px', backgroundColor: 'white', borderRadius: '100px', border: '1px solid rgba(186,202,197,0.3)', cursor: 'pointer' }}>
                <span style={{ fontSize: '13px', fontWeight: 600 }}>Rabat</span>
                <ChevronDown size={16} color="#3c4a46" />
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <button style={{ backgroundColor: '#2dd4bf', color: 'white', padding: '10px 24px', borderRadius: '100px', fontWeight: 700, fontSize: '13px', border: 'none', cursor: 'pointer', textTransform: 'uppercase' as const, letterSpacing: '0.05em' }}>
              Concierge
            </button>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', color: '#3c4a46' }}>
              <span style={{ fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}>EN</span>
              <span style={{ fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}>MAD</span>
              <Heart size={20} style={{ cursor: 'pointer' }} />
              <div style={{ position: 'relative' }}>
                <Bell size={20} style={{ cursor: 'pointer' }} />
                <span style={{ position: 'absolute', top: '-1px', right: '-1px', width: '8px', height: '8px', backgroundColor: '#ba1a1a', borderRadius: '50%', border: '1px solid #f4fbf8' }} />
              </div>
              <User size={22} style={{ cursor: 'pointer' }} />
            </div>
          </div>
        </div>
        <nav style={{ borderTop: '1px solid rgba(0,0,0,0.05)' }}>
          <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 40px', height: '48px', display: 'flex', alignItems: 'center', gap: '32px' }}>
            {['Motors', 'Property', 'Jobs', 'Boutiques', 'Curated', 'Vintage'].map(item => (
              <span key={item} style={{ fontSize: '14px', color: '#3c4a46', cursor: 'pointer' }}>{item}</span>
            ))}
            <span style={{ fontSize: '14px', color: '#2dd4bf', fontWeight: 700, borderBottom: '2px solid #2dd4bf', height: '100%', display: 'flex', alignItems: 'center', cursor: 'pointer' }}>Collectibles</span>
          </div>
        </nav>
      </header>

      <main>
        {/* HERO */}
        <section style={{ position: 'relative', height: '614px', minHeight: '500px', display: 'flex', alignItems: 'flex-end', overflow: 'hidden' }}>
          <img src="https://images.pexels.com/photos/6044247/pexels-photo-6044247.jpeg?auto=compress&w=1600" alt="Heritage showroom" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #f4fbf8, rgba(244,251,248,0.4), transparent)' }} />
          <div style={{ position: 'relative', zIndex: 10, maxWidth: '1440px', margin: '0 auto', padding: '0 40px 48px', width: '100%' }}>
            <div style={{ maxWidth: '600px', backgroundColor: 'rgba(255,255,255,0.65)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.4)', borderRadius: '2.5rem', padding: '32px', boxShadow: '0 25px 50px rgba(0,0,0,0.2)' }}>
              <h1 style={{ fontSize: '48px', fontWeight: 700, color: '#2dd4bf', marginBottom: '8px', letterSpacing: '-0.02em' }}>Rabat Heritage Hub</h1>
              <p style={{ color: '#3c4a46', fontSize: '18px', marginBottom: '24px', lineHeight: 1.5 }}>Discover the most prestigious collectibles in the capital. From centuries-old Moroccan silver to modern horological masterpieces.</p>
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' as const }}>
                <button style={{ backgroundColor: '#2dd4bf', color: 'white', padding: '12px 32px', borderRadius: '100px', border: 'none', fontWeight: 700, fontSize: '14px', cursor: 'pointer', boxShadow: '0 10px 15px -3px rgba(0,107,95,0.2)' }}>Sell Your Collection</button>
                <button style={{ backgroundColor: 'rgba(221,228,225,0.6)', backdropFilter: 'blur(12px)', color: '#2dd4bf', padding: '12px 32px', borderRadius: '100px', border: '1px solid rgba(0,107,95,0.2)', fontWeight: 700, fontSize: '14px', cursor: 'pointer' }}>Browse Verified Finds</button>
              </div>
            </div>
          </div>
        </section>

        {/* STICKY FILTER BAR */}
        <div style={{ position: 'sticky', top: '128px', zIndex: 40, backgroundColor: 'rgba(244,251,248,0.9)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(186,202,197,0.3)', padding: '16px 0', boxShadow: '0 1px 2px rgba(0,0,0,0.04)' }}>
          <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 40px', display: 'flex', flexDirection: 'column' as const, gap: '16px' }}>

            {/* BREADCRUMB */}
            <nav style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#6b7a76', fontWeight: 500 }}>
              <a href="#" style={{ textDecoration: 'none', color: 'inherit' }}>Rabat</a><ChevronRight size={14} />
              <a href="#" style={{ textDecoration: 'none', color: 'inherit' }}>The Vault</a><ChevronRight size={14} />
              <span style={{ color: '#2dd4bf', fontWeight: 700 }}>Collectibles</span>
            </nav>

            {/* SUB-CATEGORY PILLS */}
            <div style={{ display: 'flex', gap: '8px', overflowX: 'auto' as const }}>
              {subCategories.map(c => (
                <button key={c} onClick={() => setActiveSub(c)}
                  style={{ whiteSpace: 'nowrap' as const, padding: '8px 20px', borderRadius: '100px', fontSize: '13px', fontWeight: 700, cursor: 'pointer', border: 'none',
                    backgroundColor: activeSub === c ? '#2dd4bf' : '#e2eae7', color: activeSub === c ? 'white' : '#3c4a46' }}>
                  {c}
                </button>
              ))}
              <button style={{ display: 'flex', alignItems: 'center', gap: '4px', whiteSpace: 'nowrap' as const, padding: '8px 20px', borderRadius: '100px', fontSize: '13px', fontWeight: 700, border: 'none', backgroundColor: '#e2eae7', color: '#3c4a46', cursor: 'pointer' }}>
                View More <ChevronDown size={16} />
              </button>
            </div>

            {/* RESULTS HEADER */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '8px', borderTop: '1px solid rgba(186,202,197,0.1)' }}>
              <span style={{ fontSize: '15px', fontWeight: 500, color: '#3c4a46' }}>5,372 curated items in Rabat</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '12px', fontWeight: 700, color: '#6b7a76', textTransform: 'uppercase' as const, letterSpacing: '0.05em' }}>Sort:</span>
                  <span style={{ fontSize: '13px', fontWeight: 700, color: '#2dd4bf', cursor: 'pointer' }}>Default</span>
                </div>
                <button style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#2dd4bf', fontWeight: 700, fontSize: '13px', background: 'none', border: 'none', cursor: 'pointer', padding: '8px 16px', borderRadius: '100px' }}>
                  <Heart size={18} /> Save Search
                </button>
              </div>
            </div>

            {/* SELLER FILTERS + TOGGLE */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' as const, gap: '16px' }}>
              <div style={{ display: 'flex', gap: '8px' }}>
                {sellerFilters.map(s => (
                  <button key={s} onClick={() => setActiveSeller(s)}
                    style={{ padding: '8px 20px', borderRadius: '100px', fontSize: '13px', fontWeight: 700, cursor: 'pointer', border: 'none',
                      backgroundColor: activeSeller === s ? '#2dd4bf' : '#e2eae7', color: activeSeller === s ? '#0f9b8e' : '#3c4a46' }}>
                    {s}
                  </button>
                ))}
              </div>
              <button onClick={() => setDiamondFirst(!diamondFirst)} style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'none', border: 'none', cursor: 'pointer' }}>
                <span style={{ fontSize: '13px', fontWeight: 700, color: '#3c4a46' }}>Show Diamond Verified First</span>
                <div style={{ width: '44px', height: '24px', borderRadius: '100px', backgroundColor: diamondFirst ? '#2dd4bf' : '#bacac5', position: 'relative', transition: 'background-color 0.2s' }}>
                  <div style={{ position: 'absolute', top: '2px', left: diamondFirst ? '22px' : '2px', width: '20px', height: '20px', borderRadius: '50%', backgroundColor: 'white', transition: 'left 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }} />
                </div>
              </button>
            </div>
          </div>
        </div>

        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 40px' }}>

          {/* RARE FINDS */}
          <section style={{ padding: '64px 0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '32px' }}>
              <div>
                <h2 style={{ fontSize: '36px', fontWeight: 700, color: '#2dd4bf', marginBottom: '4px' }}>Rare Finds</h2>
                <p style={{ color: '#3c4a46', fontSize: '15px' }}>Exceptional pieces currently surfacing in Rabat.</p>
              </div>
              <a href="#" style={{ color: '#2dd4bf', fontWeight: 700, fontSize: '14px', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}>View All <ArrowRight size={16} /></a>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '32px' }}>
              {rareFinds.map(item => <ListingCard key={item.id} item={item} />)}
            </div>
          </section>

          {/* DIAMOND BANNER */}
          <section style={{ padding: '32px 0' }}>
            <div style={{ position: 'relative', borderRadius: '2.5rem', overflow: 'hidden', backgroundColor: '#2b3230', padding: '48px', display: 'flex', flexWrap: 'wrap' as const, alignItems: 'center', gap: '48px' }}>
              <div style={{ position: 'absolute', top: 0, right: 0, width: '500px', height: '500px', background: 'radial-gradient(circle at top right, rgba(98,250,227,0.15), transparent 60%)' }} />
              <div style={{ flex: 1, minWidth: '300px', position: 'relative', zIndex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                  <Gem size={32} color="#62fae3" />
                  <span style={{ color: '#62fae3', fontSize: '13px', fontWeight: 700, textTransform: 'uppercase' as const, letterSpacing: '0.2em' }}>Private Access</span>
                </div>
                <h2 style={{ color: 'white', fontSize: '40px', fontWeight: 700, marginBottom: '16px' }}>SouKni Diamond</h2>
                <p style={{ color: '#bacac5', fontSize: '17px', maxWidth: '500px', lineHeight: 1.6 }}>Unlock first-look access to Rabat's rarest items 48 hours before the public. Enjoy 0% commission on sales and dedicated concierge authentication.</p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '12px', position: 'relative', zIndex: 1 }}>
                <button style={{ backgroundColor: '#2dd4bf', color: '#0f9b8e', padding: '16px 40px', borderRadius: '100px', border: 'none', fontWeight: 800, fontSize: '17px', cursor: 'pointer', boxShadow: '0 25px 50px rgba(0,0,0,0.3)' }}>Join Diamond Membership</button>
                <p style={{ textAlign: 'center' as const, color: '#bacac5', fontSize: '12px' }}>Starting from 2,500 MAD / Year</p>
              </div>
            </div>
          </section>

          {/* VERIFIED HERITAGE */}
          <section style={{ padding: '64px 0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
              <h2 style={{ fontSize: '36px', fontWeight: 700, color: '#2dd4bf' }}>Verified Heritage</h2>
              <div style={{ flex: 1, height: '1px', backgroundColor: 'rgba(186,202,197,0.3)' }} />
            </div>
            <div style={{ display: 'flex', gap: '32px', overflowX: 'auto' as const, paddingBottom: '16px' }}>
              {heritageItems.map(item => (
                <div key={item.title} style={{ minWidth: '400px', flexShrink: 0, backgroundColor: 'rgba(255,255,255,0.65)', backdropFilter: 'blur(16px)', border: '1px solid rgba(186,202,197,0.2)', borderRadius: '2.5rem', padding: '16px', display: 'flex', flexDirection: 'column' as const, gap: '16px' }}>
                  <div style={{ height: '256px', borderRadius: '2rem', overflow: 'hidden' }}>
                    <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div style={{ padding: '0 16px 16px' }}>
                    <span style={{ fontSize: '12px', fontWeight: 700, color: item.eyebrowColor, textTransform: 'uppercase' as const, letterSpacing: '0.1em' }}>{item.eyebrow}</span>
                    <h4 style={{ fontSize: '22px', fontWeight: 700, marginTop: '4px', marginBottom: '16px' }}>{item.title}</h4>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ color: '#2dd4bf', fontWeight: 800 }}>{item.price}</span>
                      <button style={{
                        padding: '8px 16px', borderRadius: '100px', fontSize: '13px', fontWeight: 700, border: 'none', cursor: 'pointer',
                        backgroundColor: item.ctaStyle === 'dark' ? '#2dd4bf' : '#dde4e1', color: item.ctaStyle === 'dark' ? 'white' : '#161d1b',
                      }}>{item.cta}</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

        </div>
      </main>

      {/* FOOTER */}
      <footer style={{ backgroundColor: '#dde4e1', borderTop: '1px solid rgba(186,202,197,0.2)', marginTop: '64px' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '64px 40px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
          <div>
            <h3 style={{ fontSize: '32px', fontWeight: 700, color: '#2dd4bf', marginBottom: '24px' }}>SouKni</h3>
            <p style={{ color: '#3c4a46', fontSize: '16px' }}>The Kingdom's premier marketplace for high-end luxury and verified heritage.</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '16px' }}>
            <h5 style={{ fontSize: '13px', fontWeight: 700, color: '#2dd4bf', textTransform: 'uppercase' as const, letterSpacing: '0.1em' }}>Discover</h5>
            {['Sustainability Charter', 'Concierge Services', 'Privacy Policy'].map(l => (
              <a key={l} href="#" style={{ color: '#3c4a46', textDecoration: 'none', fontSize: '13px', fontWeight: 600, textTransform: 'uppercase' as const, letterSpacing: '0.05em' }}>{l}</a>
            ))}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '16px' }}>
            <h5 style={{ fontSize: '13px', fontWeight: 700, color: '#2dd4bf', textTransform: 'uppercase' as const, letterSpacing: '0.1em' }}>Company</h5>
            {['Heritage & Craft', 'Global Shipping'].map(l => (
              <a key={l} href="#" style={{ color: '#3c4a46', textDecoration: 'none', fontSize: '13px', fontWeight: 600, textTransform: 'uppercase' as const, letterSpacing: '0.05em' }}>{l}</a>
            ))}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '24px' }}>
            <h5 style={{ fontSize: '13px', fontWeight: 700, color: '#2dd4bf', textTransform: 'uppercase' as const, letterSpacing: '0.1em' }}>Stay Inspired</h5>
            <div style={{ display: 'flex', gap: '8px' }}>
              <input placeholder="Join our journal" style={{ flex: 1, backgroundColor: '#eef5f2', border: 'none', borderRadius: '100px', padding: '10px 16px', outline: 'none', fontFamily: 'inherit', fontSize: '14px' }} />
              <button style={{ width: '40px', height: '40px', backgroundColor: '#2dd4bf', color: 'white', borderRadius: '50%', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '32px 40px', borderTop: '1px solid rgba(186,202,197,0.2)', textAlign: 'center' as const }}>
          <p style={{ color: '#3c4a46', fontSize: '13px', fontWeight: 500 }}>© 2026 SOUKNI LUXURY MARKETPLACE. ALL RIGHTS RESERVED.</p>
        </div>
      </footer>
    </div>
  )
}
