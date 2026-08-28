'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { MapPin, Star, Shield, MessageCircle, Phone, Heart, Diamond, Check, ChevronRight, Package, Clock } from 'lucide-react'
import { useMarket } from '@/context/MarketContext'
import { getSupabaseClient } from '@/lib/supabase/client'
import { useFavorites } from '@/hooks/useFavorites'

type DbProfile = {
  id: string; full_name: string | null; username: string | null; avatar_url: string | null
  bio: string | null; phone: string | null; city: string | null; neighborhood: string | null
  badge: string | null; verified_at: string | null; response_rate: number | null; response_time: string | null
  total_sales: number | null; rating: number | null; review_count: number | null; created_at: string
}
type DbListing = { id: string; title: string; price: number; city: string | null; created_at: string; images: string[]; badge: string | null }
type DbReview = { id: string; rating: number; comment: string | null; anonymous: boolean; created_at: string; reviewer: { full_name: string | null } | null }

type ListingCardItem = { id: string; title: string; price: number; location: string; time: string; badge: string | null; image: string }

function monthYear(iso: string) {
  return new Date(iso).toLocaleDateString('en', { month: 'long', year: 'numeric' })
}

function timeAgo(iso: string) {
  const mins = Math.floor((Date.now() - new Date(iso).getTime()) / 60000)
  if (mins < 60)  return `${Math.max(1, mins)} minute${mins === 1 ? '' : 's'} ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24)   return `${hrs} hour${hrs === 1 ? '' : 's'} ago`
  const days = Math.floor(hrs / 24)
  if (days < 30)  return `${days} day${days === 1 ? '' : 's'} ago`
  return `${Math.floor(days / 30)} month${Math.floor(days / 30) === 1 ? '' : 's'} ago`
}

function Stars({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <div style={{ display: 'flex', gap: '2px' }}>
      {[1,2,3,4,5].map(i => <Star key={i} size={size} fill={i <= Math.floor(rating) ? '#f59e0b' : 'none'} color="#f59e0b" />)}
    </div>
  )
}

function ListingCard({ item, locale }: { item: ListingCardItem, locale: string }) {
  const { isFavorited, toggleFavorite } = useFavorites()
  const saved = isFavorited(item.id)
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
          <button onClick={e => { e.preventDefault(); toggleFavorite(item.id) }}
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
  const { locale, id } = React.use(params)
  const [showPhone, setShowPhone] = useState(false)
  const supabase = getSupabaseClient()

  const [seller, setSeller]       = useState<DbProfile | null>(null)
  const [rawListings, setRawListings] = useState<DbListing[]>([])
  const [activeCount, setActiveCount] = useState(0)
  const [rawReviews, setRawReviews]   = useState<DbReview[]>([])
  const [loading, setLoading]     = useState(true)

  useEffect(() => {
    setLoading(true)
    Promise.all([
      supabase.from('profiles').select('*').eq('id', id).single(),
      supabase.from('listings').select('id,title,price,city,created_at,images,badge').eq('seller_id', id).eq('status', 'active').order('created_at', { ascending: false }).limit(6),
      supabase.from('listings').select('id', { count: 'exact', head: true }).eq('seller_id', id).eq('status', 'active'),
      supabase.from('reviews').select('*, reviewer:profiles!reviewer_id(full_name)').eq('reviewee_id', id).order('created_at', { ascending: false }),
    ]).then(([profileRes, listingsRes, countRes, reviewsRes]) => {
      setSeller((profileRes.data as DbProfile) || null)
      setRawListings((listingsRes.data as DbListing[]) || [])
      setActiveCount(countRes.count || 0)
      setRawReviews((reviewsRes.data as unknown as DbReview[]) || [])
      setLoading(false)
    })
  }, [id])

  const listings: ListingCardItem[] = rawListings.map(l => ({
    id: l.id,
    title: l.title,
    price: Math.round(l.price / 100),
    location: l.city || '',
    time: timeAgo(l.created_at),
    badge: l.badge,
    image: l.images?.[0] || '',
  }))

  const reviews = rawReviews.map(r => {
    const author = r.anonymous ? 'Anonymous' : (r.reviewer?.full_name || 'SouKni User')
    return {
      id: r.id,
      author,
      initials: author[0]?.toUpperCase() || '?',
      rating: r.rating,
      date: new Date(r.created_at).toLocaleDateString('en', { month: 'short', year: 'numeric' }),
      text: r.comment || '',
    }
  })

  if (loading) {
    return (
      <div style={{ fontFamily: 'Inter, system-ui, sans-serif', backgroundColor: '#f4fbf8', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ fontSize: '13px', fontWeight: 700, color: '#6b7a76' }}>Loading seller profile…</p>
      </div>
    )
  }

  if (!seller) {
    return (
      <div style={{ fontFamily: 'Inter, system-ui, sans-serif', backgroundColor: '#f4fbf8', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
        <p style={{ fontSize: '18px', fontWeight: 900, color: '#161d1b' }}>Seller not found</p>
        <Link href={`/${locale}`} style={{ fontSize: '13px', fontWeight: 700, color: '#22d4a8', textDecoration: 'none' }}>Back home</Link>
      </div>
    )
  }

  const sellerName = seller.full_name || 'SouKni User'
  const sellerLocation = [seller.city, seller.neighborhood].filter(Boolean).join(', ')

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
                <img src={seller.avatar_url || 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&w=200'} alt={sellerName} style={{ width: '88px', height: '88px', borderRadius: '50%', objectFit: 'cover', border: '3px solid #f4fbf8' }} />
                {seller.badge === 'diamond' && (
                  <div style={{ position: 'absolute', bottom: '0', right: '0', width: '26px', height: '26px', borderRadius: '50%', background: 'linear-gradient(135deg, #22d4a8, #0f9b8e)', border: '2px solid white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Diamond size={12} color="white" />
                  </div>
                )}
              </div>

              <h1 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 900, letterSpacing: '-0.03em', fontSize: '22px', color: '#161d1b', marginBottom: '4px' }}>{sellerName}</h1>
              <p style={{ fontSize: '12px', color: '#6b7a76', marginBottom: '12px' }}>@{seller.username || 'soukni-user'}</p>

              {seller.badge === 'diamond' && (
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', background: 'linear-gradient(135deg, #22d4a8, #0f9b8e)', color: 'white', fontSize: '11px', fontWeight: 800, padding: '5px 14px', borderRadius: '100px', marginBottom: '16px' }}>
                  <Diamond size={11} /> Diamond Member
                </span>
              )}

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', marginBottom: '20px', paddingBottom: '20px', borderBottom: '1px solid #f1f5f9' }}>
                <Stars rating={seller.rating || 0} size={15} />
                <span style={{ fontWeight: 700, fontSize: '14px', color: '#161d1b' }}>{(seller.rating || 0).toFixed(1)}</span>
                <span style={{ fontSize: '12px', color: '#6b7a76' }}>({seller.review_count || 0} reviews)</span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '20px' }}>
                {[
                  { label: 'Response Rate', value: seller.response_rate != null ? `${seller.response_rate}%` : '—' },
                  { label: 'Response Time', value: seller.response_time || '—' },
                  { label: 'Total Sales', value: `${seller.total_sales || 0}` },
                  { label: 'Active Listings', value: `${activeCount}` },
                ].map(stat => (
                  <div key={stat.label} style={{ backgroundColor: '#f4fbf8', borderRadius: '14px', padding: '12px' }}>
                    <p style={{ fontSize: '9px', textTransform: 'uppercase', color: '#94a3b8', fontWeight: 700, marginBottom: '4px', letterSpacing: '0.08em' }}>{stat.label}</p>
                    <p style={{ fontSize: '16px', fontWeight: 800, color: '#161d1b' }}>{stat.value}</p>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', justifyContent: 'center', fontSize: '12px', color: '#6b7a76', marginBottom: '20px' }}>
                <MapPin size={13} />{sellerLocation || 'Morocco'} · Member since {monthYear(seller.created_at)}
              </div>

              <p style={{ fontSize: '13px', color: '#3c4a46', lineHeight: 1.7, marginBottom: '24px', textAlign: 'left' }}>{seller.bio || 'This seller hasn’t added a bio yet.'}</p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <a href={seller.phone ? `https://wa.me/212${seller.phone.replace(/\D/g, '')}` : undefined}
                  style={{ backgroundColor: '#25D366', color: 'white', border: 'none', padding: '13px', borderRadius: '100px', fontWeight: 700, fontSize: '14px', cursor: seller.phone ? 'pointer' : 'not-allowed', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', textDecoration: 'none', opacity: seller.phone ? 1 : 0.5 }}>
                  <MessageCircle size={16} /> WhatsApp
                </a>
                <Link href={`/${locale}/messages`} style={{ backgroundColor: '#eef5f2', color: '#3c4a46', border: 'none', padding: '13px', borderRadius: '100px', fontWeight: 700, fontSize: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', textDecoration: 'none' }}>
                  <MessageCircle size={16} /> Send Message
                </Link>
                <button onClick={() => setShowPhone(true)} disabled={!seller.phone} style={{ backgroundColor: 'transparent', color: '#22d4a8', border: '2px solid #22d4a8', padding: '12px', borderRadius: '100px', fontWeight: 700, fontSize: '14px', cursor: seller.phone ? 'pointer' : 'not-allowed', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', opacity: seller.phone ? 1 : 0.5 }}>
                  <Phone size={15} /> {showPhone && seller.phone ? `+212 ${seller.phone}` : seller.phone ? 'Show Phone Number' : 'No phone on file'}
                </button>
              </div>
            </div>

            {/* Trust badge */}
            {seller.verified_at && (
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
            )}

          </div>

          {/* RIGHT — LISTINGS + REVIEWS */}
          <div>

            {/* Active listings */}
            <div style={{ marginBottom: '48px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                <div>
                  <h2 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 900, letterSpacing: '-0.03em', fontSize: '22px', color: '#161d1b', marginBottom: '2px' }}>Active Listings</h2>
                  <p style={{ fontSize: '13px', color: '#6b7a76' }}>{activeCount} listings currently available</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: '#eef5f2', padding: '8px 14px', borderRadius: '100px' }}>
                  <Package size={14} color="#22d4a8" />
                  <span style={{ fontSize: '12px', fontWeight: 700, color: '#161d1b' }}>{activeCount} active</span>
                </div>
              </div>

              {listings.length === 0 ? (
                <p style={{ fontSize: '13px', color: '#6b7a76' }}>No active listings right now.</p>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
                  {listings.map(item => <ListingCard key={item.id} item={item} locale={locale} />)}
                </div>
              )}
            </div>

            {/* Reviews */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                <div>
                  <h2 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 900, letterSpacing: '-0.03em', fontSize: '22px', color: '#161d1b', marginBottom: '2px' }}>Reviews</h2>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Stars rating={seller.rating || 0} size={14} />
                    <span style={{ fontSize: '13px', fontWeight: 700, color: '#161d1b' }}>{(seller.rating || 0).toFixed(1)}</span>
                    <span style={{ fontSize: '13px', color: '#6b7a76' }}>· {seller.review_count || 0} reviews</span>
                  </div>
                </div>
              </div>

              {reviews.length === 0 && (
                <p style={{ fontSize: '13px', color: '#6b7a76' }}>No reviews yet.</p>
              )}
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
