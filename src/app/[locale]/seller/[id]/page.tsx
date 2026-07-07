'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { MapPin, Star, Shield, MessageCircle, Phone, Heart, Diamond, Check, ChevronRight, Package, Clock } from 'lucide-react'
import { useMarket } from '@/context/MarketContext'

const seller = {
  id: '1',
  name: 'Yassine Benali',
  username: 'yassine-benali',
  avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&w=200',
  memberSince: 'March 2021',
  location: 'Casablanca, Maarif',
  bio: 'Trusted seller of premium vehicles and electronics in Casablanca. All items personally tested and accurately described. Fast response guaranteed.',
  badge: 'diamond' as 'diamond' | 'verified',
  rating: 4.9,
  reviews: 247,
  responseRate: '98%',
  responseTime: '~1 hour',
  totalSales: 84,
  activeListings: 9,
  verified: true,
}

const listings = [
  { id: '1', title: 'BMW M4 Competition — Carbon Pack', price: 785000, location: 'Casablanca', time: '2 hours ago', badge: 'diamond', image: 'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&w=600' },
  { id: '2', title: 'Land Rover Defender 110', price: 1200000, location: 'Casablanca', time: '1 day ago', badge: 'diamond', image: 'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&w=600' },
  { id: '3', title: 'Porsche Cayenne Turbo S', price: 980000, location: 'Casablanca', time: '2 days ago', badge: 'diamond', image: 'https://images.pexels.com/photos/1638459/pexels-photo-1638459.jpeg?auto=compress&w=600' },
  { id: '4', title: 'MacBook Pro 14" M3 Max', price: 28000, location: 'Casablanca', time: '3 days ago', badge: 'verified', image: 'https://images.pexels.com/photos/1229861/pexels-photo-1229861.jpeg?auto=compress&w=600' },
  { id: '5', title: 'iPhone 15 Pro Max 256GB', price: 12500, location: 'Casablanca', time: '4 days ago', badge: 'verified', image: 'https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&w=600' },
  { id: '6', title: 'Mercedes-Benz GLE 63S', price: 1100000, location: 'Casablanca', time: '5 days ago', badge: 'diamond', image: 'https://images.pexels.com/photos/120049/pexels-photo-120049.jpeg?auto=compress&w=600' },
]

const reviews = [
  { id: 1, author: 'Mehdi K.', initials: 'MK', rating: 5, date: 'Jun 2026', text: 'Excellent seller. Car was exactly as described, paperwork ready, smooth transaction. Highly recommend.', tags: ['Item as described', 'Smooth transaction', 'Very professional'], helpful: 12, category: 'Motors' },
  { id: 2, author: 'Sara B.', initials: 'SB', rating: 5, date: 'May 2026', text: 'Very professional, fast response, honest about the condition of the item. Would buy again.', tags: ['Fast response', 'Honest & trustworthy', 'Would buy again'], helpful: 8, category: 'Electronics' },
  { id: 3, author: 'Amine T.', initials: 'AT', rating: 4, date: 'Apr 2026', text: 'Good experience overall. Minor delay in response but resolved quickly. Item in great condition.', tags: ['Item as described', 'Fair price'], helpful: 5, category: 'Electronics' },
  { id: 4, author: 'Anonymous', initials: 'A', rating: 5, date: 'Mar 2026', text: 'Smooth and fast transaction. The item was in perfect condition exactly as shown in photos.', tags: ['Item as described', 'Smooth transaction'], helpful: 7, category: 'Property' },
  { id: 5, author: 'Karima R.', initials: 'KR', rating: 3, date: 'Feb 2026', text: 'Item was okay but the meeting was delayed twice. Communication could be better. Price was fair.', tags: ['Fair price'], helpful: 2, category: 'Fashion' },
]

const ratingBreakdown = [5,4,3,2,1].map(r => ({
  stars: r,
  count: reviews.filter(rv => rv.rating === r).length,
  pct: Math.round((reviews.filter(rv => rv.rating === r).length / reviews.length) * 100)
}))

function Stars({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <div style={{ display: 'flex', gap: '2px' }}>
      {[1,2,3,4,5].map(i => <Star key={i} size={size} fill={i <= Math.floor(rating) ? '#f59e0b' : 'none'} color="#f59e0b" />)}
    </div>
  )
}

function ListingCard({ item, locale }: { item: typeof listings[0], locale: string }) {
  const [saved, setSaved] = useState(false)
  const [hovered, setHovered] = useState(false)
  const { formatPrice } = useMarket()
  return (
    <Link href={`/${locale}/listing/${item.id}`} style={{ textDecoration: 'none' }}>
      <article onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
        style={{ backgroundColor: 'white', borderRadius: '24px', overflow: 'hidden', border: '1px solid #f1f5f9', boxShadow: hovered ? '0 16px 32px rgba(0,0,0,0.1)' : '0 2px 8px rgba(0,0,0,0.04)', transition: 'all 0.25s', cursor: 'pointer' }}>
        <div style={{ position: 'relative', aspectRatio: '4/3', overflow: 'hidden' }}>
          <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s', transform: hovered ? 'scale(1.06)' : 'scale(1)' }} />
          {item.badge === 'diamond' && (
            <span style={{ position: 'absolute', top: '12px', left: '12px', background: 'linear-gradient(135deg, #22d4a8, #0f9b8e)', color: 'white', fontSize: '9px', fontWeight: 800, padding: '4px 10px', borderRadius: '100px', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '3px' }}>
              <Diamond size={9} /> Diamond
            </span>
          )}
          {item.badge === 'verified' && (
            <span style={{ position: 'absolute', top: '12px', left: '12px', backgroundColor: 'rgba(255,255,255,0.92)', color: '#22d4a8', fontSize: '9px', fontWeight: 800, padding: '4px 10px', borderRadius: '100px', textTransform: 'uppercase' }}>Verified</span>
          )}
          <button onClick={e => { e.preventDefault(); setSaved(!saved) }}
            style={{ position: 'absolute', top: '12px', right: '12px', width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <Heart size={14} color={saved ? '#ef4444' : 'white'} fill={saved ? '#ef4444' : 'none'} />
          </button>
        </div>
        <div style={{ padding: '16px' }}>
          <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#161d1b', marginBottom: '8px', lineHeight: 1.3, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.title}</h3>
          <p style={{ fontSize: '17px', fontWeight: 800, color: '#22d4a8', marginBottom: '8px' }}>{formatPrice(item.price)}</p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '11px', color: '#6b7a76' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}><MapPin size={11} />{item.location}</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}><Clock size={11} />{item.time}</span>
          </div>
        </div>
      </article>
    </Link>
  )
}

export default function SellerProfilePage({ params }: { params: Promise<{ locale: string; id: string }> }) {
  const [helpfulVotes, setHelpfulVotes] = React.useState<number[]>([])
  const [reviewFilter, setReviewFilter] = React.useState<number | 'all'>('all')
  const { locale } = React.use(params)
  const [showPhone, setShowPhone] = useState(false)

  return (
    <div style={{ fontFamily: 'Inter, system-ui, sans-serif', backgroundColor: '#f4fbf8', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '32px 24px 80px' }}>

        {/* BREADCRUMB */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#6b7a76', marginBottom: '24px' }}>
          <Link href={`/${locale}`} style={{ color: '#22d4a8', textDecoration: 'none', fontWeight: 600 }}>Home</Link>
          <span>›</span>
          <span style={{ color: '#161d1b', fontWeight: 700 }}>Seller Profile</span>
        </nav>

        <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: '32px', alignItems: 'start' }}>

          {/* LEFT — SELLER CARD (sticky) */}
          <div style={{ position: 'sticky', top: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>

            {/* Main profile card */}
            <div style={{ backgroundColor: 'white', borderRadius: '32px', padding: '28px', border: '1px solid #f1f5f9', boxShadow: '0 4px 16px rgba(0,0,0,0.06)', textAlign: 'center' }}>
              <div style={{ position: 'relative', width: '88px', height: '88px', margin: '0 auto 16px' }}>
                <img src={seller.avatar} alt={seller.name} style={{ width: '88px', height: '88px', borderRadius: '50%', objectFit: 'cover', border: '3px solid #f4fbf8' }} />
                {seller.badge === 'diamond' && (
                  <div style={{ position: 'absolute', bottom: '0', right: '0', width: '26px', height: '26px', borderRadius: '50%', background: 'linear-gradient(135deg, #22d4a8, #0f9b8e)', border: '2px solid white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Diamond size={12} color="white" />
                  </div>
                )}
              </div>

              <h1 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 900, letterSpacing: '-0.03em', fontSize: '22px', color: '#161d1b', marginBottom: '4px' }}>{seller.name}</h1>
              <p style={{ fontSize: '12px', color: '#6b7a76', marginBottom: '12px' }}>@{seller.username}</p>

              {seller.badge === 'diamond' && (
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', background: 'linear-gradient(135deg, #22d4a8, #0f9b8e)', color: 'white', fontSize: '11px', fontWeight: 800, padding: '5px 14px', borderRadius: '100px', marginBottom: '16px' }}>
                  <Diamond size={11} /> Diamond Member
                </span>
              )}

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', marginBottom: '20px', paddingBottom: '20px', borderBottom: '1px solid #f1f5f9' }}>
                <Stars rating={seller.rating} size={15} />
                <span style={{ fontWeight: 700, fontSize: '14px', color: '#161d1b' }}>{seller.rating}</span>
                <span style={{ fontSize: '12px', color: '#6b7a76' }}>({seller.reviews} reviews)</span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '20px' }}>
                {[
                  { label: 'Response Rate', value: seller.responseRate },
                  { label: 'Response Time', value: seller.responseTime },
                  { label: 'Total Sales', value: `${seller.totalSales}` },
                  { label: 'Active Listings', value: `${seller.activeListings}` },
                ].map(stat => (
                  <div key={stat.label} style={{ backgroundColor: '#f4fbf8', borderRadius: '14px', padding: '12px' }}>
                    <p style={{ fontSize: '9px', textTransform: 'uppercase', color: '#94a3b8', fontWeight: 700, marginBottom: '4px', letterSpacing: '0.08em' }}>{stat.label}</p>
                    <p style={{ fontSize: '16px', fontWeight: 800, color: '#161d1b' }}>{stat.value}</p>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', justifyContent: 'center', fontSize: '12px', color: '#6b7a76', marginBottom: '20px' }}>
                <MapPin size={13} />{seller.location} · Member since {seller.memberSince}
              </div>

              <p style={{ fontSize: '13px', color: '#3c4a46', lineHeight: 1.7, marginBottom: '24px', textAlign: 'left' }}>{seller.bio}</p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <button style={{ backgroundColor: '#25D366', color: 'white', border: 'none', padding: '13px', borderRadius: '100px', fontWeight: 700, fontSize: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                  <MessageCircle size={16} /> WhatsApp
                </button>
                <button style={{ backgroundColor: '#eef5f2', color: '#3c4a46', border: 'none', padding: '13px', borderRadius: '100px', fontWeight: 700, fontSize: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                  <MessageCircle size={16} /> Send Message
                </button>
                <button onClick={() => setShowPhone(true)} style={{ backgroundColor: 'transparent', color: '#22d4a8', border: '2px solid #22d4a8', padding: '12px', borderRadius: '100px', fontWeight: 700, fontSize: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                  <Phone size={15} /> {showPhone ? '+212 6 61 23 45 67' : 'Show Phone Number'}
                </button>
              </div>
            </div>

            {/* Trust badge */}
            <div style={{ backgroundColor: 'white', borderRadius: '20px', padding: '18px', border: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ backgroundColor: '#eef5f2', padding: '10px', borderRadius: '12px', flexShrink: 0 }}>
                <Shield size={20} color="#22d4a8" />
              </div>
              <div>
                <p style={{ fontSize: '13px', fontWeight: 700, color: '#161d1b', marginBottom: '2px' }}>Verified Seller</p>
                <p style={{ fontSize: '11px', color: '#6b7a76' }}>Identity confirmed by SouKni team</p>
              </div>
              <Check size={16} color="#22d4a8" style={{ marginLeft: 'auto', flexShrink: 0 }} />
            </div>

          </div>

          {/* RIGHT — LISTINGS + REVIEWS */}
          <div>

            {/* Active listings */}
            <div style={{ marginBottom: '48px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                <div>
                  <h2 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 900, letterSpacing: '-0.03em', fontSize: '22px', color: '#161d1b', marginBottom: '2px' }}>Active Listings</h2>
                  <p style={{ fontSize: '13px', color: '#6b7a76' }}>{seller.activeListings} listings currently available</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: '#eef5f2', padding: '8px 14px', borderRadius: '100px' }}>
                  <Package size={14} color="#22d4a8" />
                  <span style={{ fontSize: '12px', fontWeight: 700, color: '#161d1b' }}>{seller.activeListings} active</span>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
                {listings.map(item => <ListingCard key={item.id} item={item} locale={locale} />)}
              </div>
            </div>

            {/* Reviews */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                <div>
                  <h2 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 900, letterSpacing: '-0.03em', fontSize: '22px', color: '#161d1b', marginBottom: '2px' }}>Reviews</h2>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Stars rating={seller.rating} size={14} />
                    <span style={{ fontSize: '13px', fontWeight: 700, color: '#161d1b' }}>{seller.rating}</span>
                    <span style={{ fontSize: '13px', color: '#6b7a76' }}>· {seller.reviews} reviews</span>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {reviews.map((review, i) => (
                  <div key={i} style={{ backgroundColor: 'white', borderRadius: '20px', padding: '22px', border: '1px solid #f1f5f9' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'linear-gradient(135deg, #22d4a8, #0f9b8e)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <span style={{ color: 'white', fontSize: '12px', fontWeight: 800 }}>{review.author[0]}</span>
                        </div>
                        <div>
                          <p style={{ fontSize: '13px', fontWeight: 700, color: '#161d1b' }}>{review.author}</p>
                          <p style={{ fontSize: '11px', color: '#6b7a76' }}>{review.date}</p>
                        </div>
                      </div>
                      <Stars rating={review.rating} size={13} />
                    </div>
                    <p style={{ fontSize: '13px', color: '#3c4a46', lineHeight: 1.7 }}>{review.text}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
