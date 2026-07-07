'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import {
  MapPin, ChevronRight, Heart, Share2, MessageCircle, Phone, Diamond, Check,
  Star, Shield, Clock, Eye, ChevronLeft, Flag, User
} from 'lucide-react'
import { useMarket } from '@/context/MarketContext'

const listing = {
  id: '1',
  category: 'Motors',
  subcategory: 'Used Cars',
  breadcrumbSlug: 'motors/cars',
  title: 'BMW M4 Competition — Carbon Pack, Low Mileage',
  price: 785000,
  badge: 'diamond' as 'diamond' | 'verified' | null,
  location: 'Casablanca, Maarif',
  postedTime: '2 hours ago',
  views: 1284,
  description:
    "Pristine BMW M4 Competition in immaculate condition, garage-kept since new. Full carbon exterior package, M Driver's Package included, and complete BMW service history with no accidents. This is a rare opportunity to own a true driver's car with the reliability of a daily.\n\nThe vehicle comes with two full sets of wheels (summer and winter), ceramic coating applied 3 months ago, and all original documentation. Recently serviced at an authorized BMW dealership — invoices available on request.",
  specs: [
    { label: 'Year', value: '2023' },
    { label: 'Mileage', value: '12,500 km' },
    { label: 'Fuel Type', value: 'Gasoline' },
    { label: 'Transmission', value: 'Automatic' },
    { label: 'Body Type', value: 'Coupe' },
    { label: 'Color', value: 'Isle of Man Green' },
    { label: 'Doors', value: '2' },
    { label: 'Condition', value: 'Excellent' },
  ],
  images: [
    'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&w=1200',
    'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&w=1200',
    'https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg?auto=compress&w=1200',
    'https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg?auto=compress&w=1200',
    'https://images.pexels.com/photos/1638459/pexels-photo-1638459.jpeg?auto=compress&w=1200',
  ],
  seller: {
    name: 'Yassine Benali',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&w=200',
    memberSince: '2021',
    rating: 4.8,
    reviews: 47,
    responseRate: '98%',
    responseTime: '~1 hour',
    verified: true,
  },
}

const similarListings = [
  { title: 'Mercedes-Benz GLE 63S', price: 1100000, location: 'Rabat', badge: 'diamond', image: 'https://images.pexels.com/photos/120049/pexels-photo-120049.jpeg?auto=compress&w=500' },
  { title: 'Porsche Cayenne Turbo', price: 980000, location: 'Casablanca', badge: 'diamond', image: 'https://images.pexels.com/photos/1638459/pexels-photo-1638459.jpeg?auto=compress&w=500' },
  { title: 'Audi e-tron GT Quattro', price: 1450000, location: 'Marrakech', badge: 'verified', image: 'https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg?auto=compress&w=500' },
  { title: 'Range Rover Autobiography', price: 1850000, location: 'Casablanca', badge: 'diamond', image: 'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&w=500' },
]

export default function ListingDetailPage({ params }: { params: Promise<{ locale: string; id: string }> }) {
  const { locale } = React.use(params)
  const { formatPrice } = useMarket()
  const [activeImage, setActiveImage] = useState(0)
  const [saved, setSaved] = useState(false)
  const [showPhone, setShowPhone] = useState(false)

  return (
    <div style={{ fontFamily: 'Inter, system-ui, sans-serif', backgroundColor: '#f4fbf8', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '32px 24px 80px' }}>

        <nav style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#64748b', marginBottom: '24px', flexWrap: 'wrap' }}>
          <Link href={`/${locale}`} style={{ color: '#2dd4bf', textDecoration: 'none', fontWeight: 600 }}>Home</Link>
          <span>›</span>
          <Link href={`/${locale}/${listing.breadcrumbSlug}`} style={{ color: '#2dd4bf', textDecoration: 'none', fontWeight: 600 }}>{listing.category}</Link>
          <span>›</span>
          <Link href={`/${locale}/${listing.breadcrumbSlug}`} style={{ color: '#2dd4bf', textDecoration: 'none', fontWeight: 600 }}>{listing.subcategory}</Link>
          <span>›</span>
          <span style={{ color: '#0f172a', fontWeight: 700, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '280px' }}>{listing.title}</span>
        </nav>

        <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: '32px', alignItems: 'start' }}>

          <div>
            <div style={{ backgroundColor: 'white', borderRadius: '32px', overflow: 'hidden', border: '1px solid #f1f5f9', marginBottom: '24px' }}>
              <div style={{ position: 'relative', aspectRatio: '16/10', overflow: 'hidden', backgroundColor: '#0f172a' }}>
                <img src={listing.images[activeImage]} alt={listing.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                {listing.badge === 'diamond' && (
                  <span style={{ position: 'absolute', top: '18px', left: '18px', background: 'linear-gradient(135deg, #2dd4bf, #0f9b8e)', color: 'white', fontSize: '11px', fontWeight: 800, padding: '6px 16px', borderRadius: '100px', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'flex', alignItems: 'center', gap: '5px', boxShadow: '0 4px 16px rgba(0,0,0,0.2)' }}>
                    <Diamond size={12} /> Diamond Member
                  </span>
                )}
                <div style={{ position: 'absolute', top: '18px', right: '18px', display: 'flex', gap: '8px' }}>
                  <button onClick={() => setSaved(!saved)} style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                    <Heart size={18} color={saved ? '#ef4444' : 'white'} fill={saved ? '#ef4444' : 'none'} />
                  </button>
                  <button style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                    <Share2 size={17} color="white" />
                  </button>
                </div>
                <button onClick={() => setActiveImage(i => (i - 1 + listing.images.length) % listing.images.length)}
                  style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.85)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <ChevronLeft size={20} color="#0f172a" />
                </button>
                <button onClick={() => setActiveImage(i => (i + 1) % listing.images.length)}
                  style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.85)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <ChevronRight size={20} color="#0f172a" />
                </button>
                <div style={{ position: 'absolute', bottom: '16px', right: '16px', backgroundColor: 'rgba(0,0,0,0.6)', color: 'white', fontSize: '12px', fontWeight: 600, padding: '4px 12px', borderRadius: '100px' }}>
                  {activeImage + 1} / {listing.images.length}
                </div>
              </div>
              <div style={{ display: 'flex', gap: '8px', padding: '12px', overflowX: 'auto' }}>
                {listing.images.map((img, i) => (
                  <button key={i} onClick={() => setActiveImage(i)}
                    style={{ flexShrink: 0, width: '80px', height: '60px', borderRadius: '10px', overflow: 'hidden', border: i === activeImage ? '2px solid #2dd4bf' : '2px solid transparent', padding: 0, cursor: 'pointer', opacity: i === activeImage ? 1 : 0.6, transition: 'all 0.15s' }}>
                    <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </button>
                ))}
              </div>
            </div>

            <div style={{ backgroundColor: 'white', borderRadius: '32px', padding: '28px', border: '1px solid #f1f5f9', marginBottom: '24px' }}>
              <h1 style={{ fontSize: '26px', fontWeight: 800, color: '#0f172a', marginBottom: '12px', lineHeight: 1.3, letterSpacing: '-0.01em' }}>{listing.title}</h1>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap', marginBottom: '20px', fontSize: '13px', color: '#64748b' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><MapPin size={14} /> {listing.location}</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Clock size={14} /> Posted {listing.postedTime}</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Eye size={14} /> {listing.views.toLocaleString()} views</span>
              </div>
              <div style={{ fontSize: '34px', fontWeight: 800, color: '#2dd4bf', marginBottom: '4px' }}>{formatPrice(listing.price)}</div>
            </div>

            <div style={{ backgroundColor: 'white', borderRadius: '32px', padding: '28px', border: '1px solid #f1f5f9', marginBottom: '24px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', marginBottom: '20px' }}>Key Details</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
                {listing.specs.map(spec => (
                  <div key={spec.label}>
                    <p style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#94a3b8', fontWeight: 700, marginBottom: '4px' }}>{spec.label}</p>
                    <p style={{ fontSize: '14px', fontWeight: 700, color: '#161d1b' }}>{spec.value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ backgroundColor: 'white', borderRadius: '32px', padding: '28px', border: '1px solid #f1f5f9', marginBottom: '24px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', marginBottom: '16px' }}>Description</h2>
              {listing.description.split('\n\n').map((para, i) => (
                <p key={i} style={{ fontSize: '14px', color: '#3c4a46', lineHeight: 1.8, marginBottom: i < listing.description.split('\n\n').length - 1 ? '16px' : 0 }}>{para}</p>
              ))}
            </div>

            <div style={{ backgroundColor: '#eef5f2', borderRadius: '24px', padding: '20px 24px', display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
              <Shield size={20} color="#2dd4bf" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <p style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a', marginBottom: '4px' }}>Stay safe while trading</p>
                <p style={{ fontSize: '12px', color: '#64748b', lineHeight: 1.6 }}>Meet in a public place, inspect the item before paying, and never wire money in advance. SouKni never asks for payment outside the platform.</p>
              </div>
            </div>
          </div>

          <div style={{ position: 'sticky', top: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ backgroundColor: 'white', borderRadius: '32px', padding: '28px', border: '1px solid #f1f5f9', boxShadow: '0 8px 32px rgba(0,0,0,0.06)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '20px' }}>
                <Link href={`/${locale}/seller/1`} style={{ textDecoration: 'none', flexShrink: 0 }}>
                  <img src={listing.seller.avatar} alt={listing.seller.name} style={{ width: '56px', height: '56px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #eef5f2', cursor: 'pointer' }} />
                </Link>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Link href={`/${locale}/seller/1`} style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a', textDecoration: 'none' }}>{listing.seller.name}</Link>
                    {listing.seller.verified && <Check size={14} color="#2dd4bf" style={{ backgroundColor: 'rgba(45,212,191,0.15)', borderRadius: '50%', padding: '2px' }} />}
                  </div>
                  <p style={{ fontSize: '12px', color: '#94a3b8' }}>Member since {listing.seller.memberSince}</p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '20px', paddingBottom: '20px', borderBottom: '1px solid #f1f5f9' }}>
                <Star size={15} fill="#f59e0b" color="#f59e0b" />
                <span style={{ fontWeight: 700, fontSize: '14px', color: '#0f172a' }}>{listing.seller.rating}</span>
                <span style={{ fontSize: '12px', color: '#94a3b8' }}>({listing.seller.reviews} reviews)</span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '24px' }}>
                <div style={{ backgroundColor: '#f4fbf8', borderRadius: '14px', padding: '12px' }}>
                  <p style={{ fontSize: '9px', textTransform: 'uppercase', color: '#94a3b8', fontWeight: 700, marginBottom: '4px' }}>Response Rate</p>
                  <p style={{ fontSize: '15px', fontWeight: 800, color: '#161d1b' }}>{listing.seller.responseRate}</p>
                </div>
                <div style={{ backgroundColor: '#f4fbf8', borderRadius: '14px', padding: '12px' }}>
                  <p style={{ fontSize: '9px', textTransform: 'uppercase', color: '#94a3b8', fontWeight: 700, marginBottom: '4px' }}>Response Time</p>
                  <p style={{ fontSize: '15px', fontWeight: 800, color: '#161d1b' }}>{listing.seller.responseTime}</p>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <button style={{ backgroundColor: '#25D366', color: 'white', border: 'none', padding: '14px', borderRadius: '100px', fontWeight: 700, fontSize: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                  <MessageCircle size={17} /> Message on WhatsApp
                </button>
                <button style={{ backgroundColor: '#eef5f2', color: '#3c4a46', border: 'none', padding: '14px', borderRadius: '100px', fontWeight: 700, fontSize: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                  <MessageCircle size={17} /> Chat on SouKni
                </button>
                <button onClick={() => setShowPhone(true)} style={{ backgroundColor: 'transparent', color: '#2dd4bf', border: '2px solid #2dd4bf', padding: '13px', borderRadius: '100px', fontWeight: 700, fontSize: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                  <Phone size={16} /> {showPhone ? '+212 6 61 23 45 67' : 'Show Phone Number'}
                </button>
              </div>
            </div>

            <button style={{ backgroundColor: 'transparent', border: 'none', color: '#94a3b8', fontSize: '12px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', justifyContent: 'center', padding: '4px' }}>
              <Flag size={13} /> <Link href={`/${locale}/report/${listing.id}`} style={{ color: "#7A7A7A", textDecoration: "none" }}>Report this listing</Link>
            </button>
          </div>
        </div>

        <section style={{ marginTop: '56px' }}>
          <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#0f172a', marginBottom: '24px' }}>Similar Listings</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
            {similarListings.map((item, i) => (
              <Link key={i} href={`/${locale}/listing/${i + 2}`} style={{ textDecoration: 'none' }}>
                <article style={{ backgroundColor: 'white', borderRadius: '32px', overflow: 'hidden', border: '1px solid #f1f5f9', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', transition: 'all 0.2s', cursor: 'pointer' }}
                  onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 16px 32px rgba(0,0,0,0.1)'; e.currentTarget.style.transform = 'translateY(-4px)' }}
                  onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.04)'; e.currentTarget.style.transform = 'translateY(0)' }}>
                  <div style={{ position: 'relative', aspectRatio: '4/3', overflow: 'hidden' }}>
                    <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    {item.badge === 'diamond' && (
                      <span style={{ position: 'absolute', top: '12px', left: '12px', background: 'linear-gradient(135deg, #2dd4bf, #0f9b8e)', color: 'white', fontSize: '9px', fontWeight: 800, padding: '4px 10px', borderRadius: '100px', textTransform: 'uppercase' }}>Diamond</span>
                    )}
                    {item.badge === 'verified' && (
                      <span style={{ position: 'absolute', top: '12px', left: '12px', backgroundColor: 'rgba(255,255,255,0.92)', color: '#2dd4bf', fontSize: '9px', fontWeight: 800, padding: '4px 10px', borderRadius: '100px', textTransform: 'uppercase' }}>Verified</span>
                    )}
                  </div>
                  <div style={{ padding: '16px' }}>
                    <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#161d1b', marginBottom: '8px', lineHeight: 1.3, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.title}</h3>
                    <p style={{ fontSize: '17px', fontWeight: 800, color: '#2dd4bf', marginBottom: '8px' }}>{formatPrice(item.price)}</p>
                    <p style={{ fontSize: '11px', color: '#6b7a76', display: 'flex', alignItems: 'center', gap: '4px' }}><MapPin size={11} /> {item.location}</p>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </section>

      </div>
    </div>
  )
}
