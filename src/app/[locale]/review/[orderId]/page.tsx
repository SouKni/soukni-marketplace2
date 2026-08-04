'use client'

import { useState, use } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Star, ChevronRight, Check, Shield, Camera, Upload, X, ThumbsUp, AlertTriangle, ArrowRight } from 'lucide-react'

type Locale = 'en' | 'fr' | 'ar' | 'es' | 'de'

const MINT    = '#22d4a8'
const CREAM   = '#f5ede0'
const SURFACE = '#f4fbf8'
const INK     = '#161d1b'
const MUTED   = '#6b7a76'
const FONT    = "'Inter', system-ui, sans-serif"

// Mock order data — in production fetched by orderId
const MOCK_ORDERS: Record<string, {
  id: string
  listing: { title: string; image: string; category: string }
  counterpart: { name: string; initials: string; badge: string | null; rating: number; totalReviews: number }
  agreedPrice: number
  completedAt: string
  role: 'buying' | 'selling'
}> = {
  'TXN-2026-0029': {
    id: 'TXN-2026-0029',
    listing: { title: 'Sony WH-1000XM5 Headphones', image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&w=400', category: 'Electronics' },
    counterpart: { name: 'Karim Othmani', initials: 'KO', badge: 'Diamond', rating: 4.8, totalReviews: 34 },
    agreedPrice: 3200,
    completedAt: 'Jun 26, 2026',
    role: 'buying',
  },
  'TXN-2026-0041': {
    id: 'TXN-2026-0041',
    listing: { title: 'iPhone 15 Pro Max 256GB — Titanium Black', image: 'https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&w=400', category: 'Electronics' },
    counterpart: { name: 'Youssef Alami', initials: 'YA', badge: 'Diamond', rating: 4.9, totalReviews: 47 },
    agreedPrice: 12000,
    completedAt: 'Jul 2, 2026',
    role: 'buying',
  },
}

const TAGS_BY_RATING: Record<number, { positive: string[]; negative: string[] }> = {
  5: { positive: ['Item as described', 'Fast response', 'Great communication', 'Smooth transaction', 'Honest & trustworthy', 'Would buy again', 'Fair price', 'Very professional'], negative: [] },
  4: { positive: ['Item as described', 'Good communication', 'Fair price', 'Honest seller'], negative: ['Slight delay in response', 'Minor condition discrepancy'] },
  3: { positive: ['Item as described', 'Fair price'], negative: ['Slow response', 'Condition not as described', 'Late to meeting'] },
  2: { positive: [], negative: ['Slow response', 'Condition not as described', 'Late to meeting', 'Hard to negotiate', 'Misleading photos'] },
  1: { positive: [], negative: ['Item not as described', 'No show', 'Rude behaviour', 'Scam attempt', 'Fake item', 'Price changed last minute'] },
}

const STAR_LABELS = ['', 'Very Poor', 'Poor', 'Okay', 'Good', 'Excellent']

export default function ReviewPage({ params }: { params: Promise<{ locale: Locale; orderId: string }> }) {
  const { locale, orderId } = use(params)
  const router = useRouter()

  const order = MOCK_ORDERS[orderId] || MOCK_ORDERS['TXN-2026-0029']

  const [rating, setRating]           = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [comment, setComment]         = useState('')
  const [photos, setPhotos]           = useState<string[]>([])
  const [anonymous, setAnonymous]     = useState(false)
  const [submitted, setSubmitted]     = useState(false)
  const [step, setStep]               = useState<'rate' | 'details' | 'confirm'>('rate')

  const activeTags = rating > 0 ? [
    ...TAGS_BY_RATING[rating]?.positive || [],
    ...TAGS_BY_RATING[rating]?.negative || [],
  ] : []

  const toggleTag = (tag: string) =>
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    )

  const handlePhotoUpload = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/*'
    input.multiple = true
    input.onchange = e => {
      const files = Array.from((e.target as HTMLInputElement).files || [])
      files.forEach(f => {
        const reader = new FileReader()
        reader.onload = ev => setPhotos(prev => prev.length < 4 ? [...prev, ev.target?.result as string] : prev)
        reader.readAsDataURL(f)
      })
    }
    input.click()
  }

  const canProceedToDetails = rating > 0
  const canSubmit = rating > 0

  if (submitted) return (
    <div style={{ background: SURFACE, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 24px', fontFamily: FONT }}>
      <div style={{ maxWidth: '480px', width: '100%', textAlign: 'center' }}>
        <div style={{ width: '88px', height: '88px', borderRadius: '28px', background: `linear-gradient(135deg, ${MINT}, #0f9b8e)`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', boxShadow: `0 16px 48px rgba(34,212,168,0.3)` }}>
          <Check size={40} color="white" strokeWidth={2.5} />
        </div>
        <h1 style={{ fontSize: '28px', fontWeight: 900, color: INK, letterSpacing: '-0.05em', marginBottom: '10px' }}>Review Published!</h1>
        <p style={{ fontSize: '15px', color: MUTED, lineHeight: 1.7, marginBottom: '8px', fontWeight: 700 }}>
          Thank you for reviewing <strong style={{ color: INK }}>{order.counterpart.name}</strong>.
        </p>
        <p style={{ fontSize: '13px', color: MUTED, marginBottom: '32px', fontWeight: 700 }}>
          Your {rating}-star review helps build trust across the SouKni community.
        </p>

        {/* Review preview */}
        <div style={{ background: 'white', borderRadius: '20px', padding: '20px', border: '1px solid #e2eae6', marginBottom: '28px', textAlign: 'left' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: `linear-gradient(135deg, ${MINT}, #0f9b8e)`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <span style={{ color: 'white', fontWeight: 900, fontSize: '12px' }}>{anonymous ? 'A' : 'YA'}</span>
            </div>
            <div>
              <p style={{ fontSize: '13px', fontWeight: 900, color: INK }}>{anonymous ? 'Anonymous' : 'You'}</p>
              <div style={{ display: 'flex', gap: '2px' }}>
                {[1,2,3,4,5].map(i => <Star key={i} size={13} fill={i <= rating ? '#f59e0b' : 'none'} color="#f59e0b" />)}
              </div>
            </div>
          </div>
          {selectedTags.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '10px' }}>
              {selectedTags.map(tag => (
                <span key={tag} style={{ fontSize: '11px', fontWeight: 700, padding: '3px 10px', borderRadius: '100px', background: SURFACE, color: INK, border: '1px solid #e2eae6' }}>{tag}</span>
              ))}
            </div>
          )}
          {comment && <p style={{ fontSize: '13px', color: MUTED, lineHeight: 1.6, fontWeight: 700 }}>{comment}</p>}
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <Link href={`/${locale}/orders`}
            style={{ flex: 1, padding: '13px', borderRadius: '12px', border: '1.5px solid #e2eae6', color: INK, textDecoration: 'none', fontSize: '14px', fontWeight: 900, textAlign: 'center' }}>
            Back to Orders
          </Link>
          <Link href={`/${locale}`}
            style={{ flex: 1, padding: '13px', borderRadius: '12px', background: MINT, color: 'white', textDecoration: 'none', fontSize: '14px', fontWeight: 900, textAlign: 'center' }}>
            Home
          </Link>
        </div>
      </div>
    </div>
  )

  return (
    <div style={{ background: SURFACE, minHeight: '100vh', fontFamily: FONT }}>
      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '32px 24px 80px' }}>

        {/* Breadcrumb */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '24px' }}>
          <Link href={`/${locale}/orders`} style={{ fontSize: '13px', color: MUTED, textDecoration: 'none', fontWeight: 700 }}>Orders</Link>
          <ChevronRight size={13} color={MUTED} />
          <span style={{ fontSize: '13px', fontWeight: 900, color: INK }}>Leave a Review</span>
        </nav>

        {/* Step indicator */}
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '28px' }}>
          {[
            { key: 'rate',    label: 'Rate' },
            { key: 'details', label: 'Details' },
            { key: 'confirm', label: 'Confirm' },
          ].map((s, i, arr) => {
            const steps   = ['rate', 'details', 'confirm']
            const current = steps.indexOf(step)
            const idx     = steps.indexOf(s.key)
            const done    = idx < current
            const active  = idx === current
            return (
              <div key={s.key} style={{ display: 'flex', alignItems: 'center', flex: i < arr.length - 1 ? 1 : 'none' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 900, background: done ? MINT : active ? INK : '#e2eae6', color: done || active ? 'white' : MUTED, transition: 'all 0.3s' }}>
                    {done ? <Check size={14} strokeWidth={3} /> : idx + 1}
                  </div>
                  <span style={{ fontSize: '10px', fontWeight: 900, color: active ? INK : done ? MINT : MUTED }}>{s.label}</span>
                </div>
                {i < arr.length - 1 && (
                  <div style={{ flex: 1, height: '2px', background: done ? MINT : '#e2eae6', margin: '0 8px', marginBottom: '18px', transition: 'background 0.3s' }} />
                )}
              </div>
            )
          })}
        </div>

        <div style={{ background: 'white', borderRadius: '24px', padding: '32px', border: '1px solid #e2eae6', boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>

          {/* ── STEP: RATE ── */}
          {step === 'rate' && (
            <div>
              {/* Order context */}
              <div style={{ display: 'flex', gap: '14px', padding: '14px', background: SURFACE, borderRadius: '14px', marginBottom: '28px' }}>
                <img src={order.listing.image} alt="" style={{ width: '56px', height: '56px', borderRadius: '10px', objectFit: 'cover', flexShrink: 0 }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: '11px', fontWeight: 700, color: MUTED, marginBottom: '2px' }}>
                    {order.role === 'buying' ? 'You bought' : 'You sold'} · {order.completedAt}
                  </p>
                  <p style={{ fontSize: '13px', fontWeight: 900, color: INK, lineHeight: 1.3, marginBottom: '4px' }}>{order.listing.title}</p>
                  <p style={{ fontSize: '13px', fontWeight: 900, color: MINT }}>{order.agreedPrice.toLocaleString()} MAD</p>
                </div>
              </div>

              {/* Seller to rate */}
              <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                <div style={{ width: '72px', height: '72px', borderRadius: '22px', background: `linear-gradient(135deg, ${MINT}, #0f9b8e)`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px', boxShadow: `0 8px 24px rgba(34,212,168,0.25)` }}>
                  <span style={{ color: 'white', fontWeight: 900, fontSize: '24px' }}>{order.counterpart.initials}</span>
                </div>
                <h2 style={{ fontSize: '20px', fontWeight: 900, color: INK, letterSpacing: '-0.05em', marginBottom: '4px' }}>
                  How was your experience with
                </h2>
                <h2 style={{ fontSize: '22px', fontWeight: 900, color: MINT, letterSpacing: '-0.05em', marginBottom: '6px' }}>
                  {order.counterpart.name}?
                </h2>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', justifyContent: 'center' }}>
                  {order.counterpart.badge && (
                    <span style={{ fontSize: '10px', fontWeight: 900, padding: '3px 10px', borderRadius: '100px', background: MINT, color: 'white' }}>
                      💎 {order.counterpart.badge}
                    </span>
                  )}
                  <span style={{ fontSize: '12px', color: MUTED, fontWeight: 700 }}>{order.counterpart.totalReviews} reviews</span>
                </div>
              </div>

              {/* Star selector */}
              <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '12px' }}>
                  {[1,2,3,4,5].map(i => (
                    <button key={i}
                      onClick={() => { setRating(i); setSelectedTags([]) }}
                      onMouseEnter={() => setHoverRating(i)}
                      onMouseLeave={() => setHoverRating(0)}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', transition: 'transform 0.15s', transform: (hoverRating || rating) >= i ? 'scale(1.15)' : 'scale(1)' }}
                    >
                      <Star
                        size={40}
                        fill={(hoverRating || rating) >= i ? '#f59e0b' : 'none'}
                        color={(hoverRating || rating) >= i ? '#f59e0b' : '#e2eae6'}
                        style={{ transition: 'all 0.15s' }}
                      />
                    </button>
                  ))}
                </div>
                <p style={{ fontSize: '16px', fontWeight: 900, color: rating > 0 ? '#f59e0b' : MUTED, letterSpacing: '-0.03em', minHeight: '24px', transition: 'color 0.2s' }}>
                  {STAR_LABELS[hoverRating || rating] || 'Tap to rate'}
                </p>
              </div>

              {/* Quick tags */}
              {rating > 0 && activeTags.length > 0 && (
                <div style={{ marginBottom: '24px' }}>
                  <p style={{ fontSize: '12px', fontWeight: 900, color: MUTED, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '10px', textAlign: 'center' }}>
                    What stood out? (optional)
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center' }}>
                    {activeTags.map(tag => {
                      const isNegative = (TAGS_BY_RATING[rating]?.negative || []).includes(tag)
                      const selected = selectedTags.includes(tag)
                      return (
                        <button key={tag} onClick={() => toggleTag(tag)}
                          style={{ padding: '8px 16px', borderRadius: '100px', border: `1.5px solid ${selected ? (isNegative ? '#dc2626' : MINT) : '#e2eae6'}`, background: selected ? (isNegative ? '#fee2e2' : '#f0fdf9') : 'white', color: selected ? (isNegative ? '#dc2626' : '#0f9b8e') : INK, fontSize: '13px', fontWeight: 900, cursor: 'pointer', fontFamily: FONT, transition: 'all 0.15s' }}>
                          {tag}
                        </button>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ── STEP: DETAILS ── */}
          {step === 'details' && (
            <div>
              <h2 style={{ fontSize: '20px', fontWeight: 900, color: INK, letterSpacing: '-0.05em', marginBottom: '6px' }}>Add Details</h2>
              <p style={{ fontSize: '13px', color: MUTED, fontWeight: 700, marginBottom: '24px' }}>Help others make better decisions with a written review.</p>

              {/* Rating recap */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 16px', background: SURFACE, borderRadius: '12px', marginBottom: '20px' }}>
                <div style={{ display: 'flex', gap: '2px' }}>
                  {[1,2,3,4,5].map(i => <Star key={i} size={16} fill={i <= rating ? '#f59e0b' : 'none'} color="#f59e0b" />)}
                </div>
                <span style={{ fontSize: '14px', fontWeight: 900, color: INK }}>{STAR_LABELS[rating]}</span>
                <button onClick={() => setStep('rate')} style={{ marginLeft: 'auto', fontSize: '12px', fontWeight: 900, color: MINT, background: 'none', border: 'none', cursor: 'pointer', fontFamily: FONT }}>
                  Change
                </button>
              </div>

              {selectedTags.length > 0 && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '20px' }}>
                  {selectedTags.map(tag => (
                    <span key={tag} style={{ fontSize: '11px', fontWeight: 700, padding: '4px 12px', borderRadius: '100px', background: SURFACE, border: '1px solid #e2eae6', color: INK }}>
                      {tag} <button onClick={() => toggleTag(tag)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: MUTED, marginLeft: '2px', padding: 0, fontSize: '12px' }}>×</button>
                    </span>
                  ))}
                </div>
              )}

              {/* Written review */}
              <div style={{ marginBottom: '20px' }}>
                <label style={{ fontSize: '11px', fontWeight: 900, color: INK, textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', marginBottom: '8px' }}>
                  Written Review <span style={{ color: MUTED, fontWeight: 700, textTransform: 'none', letterSpacing: 0 }}>(optional)</span>
                </label>
                <textarea
                  value={comment} onChange={e => setComment(e.target.value)}
                  placeholder={rating >= 4
                    ? "Tell others what made this a great experience..."
                    : "Describe what could have been better..."}
                  rows={4} maxLength={500}
                  style={{ width: '100%', padding: '14px 16px', borderRadius: '12px', border: '1.5px solid #e2eae6', fontSize: '14px', fontFamily: FONT, fontWeight: 700, color: INK, background: SURFACE, outline: 'none', resize: 'none', lineHeight: 1.6, boxSizing: 'border-box', transition: 'border-color 0.2s' }}
                  onFocus={e => e.target.style.borderColor = MINT}
                  onBlur={e => e.target.style.borderColor = '#e2eae6'}
                />
                <p style={{ fontSize: '11px', color: MUTED, marginTop: '4px', textAlign: 'right', fontWeight: 700 }}>{comment.length}/500</p>
              </div>

              {/* Photo upload */}
              <div style={{ marginBottom: '20px' }}>
                <label style={{ fontSize: '11px', fontWeight: 900, color: INK, textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', marginBottom: '8px' }}>
                  Photos <span style={{ color: MUTED, fontWeight: 700, textTransform: 'none', letterSpacing: 0 }}>(optional — max 4)</span>
                </label>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  {photos.map((src, i) => (
                    <div key={i} style={{ position: 'relative', width: '72px', height: '72px', borderRadius: '10px', overflow: 'hidden' }}>
                      <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      <button onClick={() => setPhotos(prev => prev.filter((_, idx) => idx !== i))}
                        style={{ position: 'absolute', top: '4px', right: '4px', width: '20px', height: '20px', borderRadius: '50%', background: 'rgba(0,0,0,0.6)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <X size={11} color="white" />
                      </button>
                    </div>
                  ))}
                  {photos.length < 4 && (
                    <button onClick={handlePhotoUpload}
                      style={{ width: '72px', height: '72px', borderRadius: '10px', border: '2px dashed #e2eae6', background: SURFACE, cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '4px', fontFamily: FONT, transition: 'border-color 0.2s' }}
                      onMouseEnter={e => e.currentTarget.style.borderColor = MINT}
                      onMouseLeave={e => e.currentTarget.style.borderColor = '#e2eae6'}
                    >
                      <Camera size={18} color={MUTED} />
                      <span style={{ fontSize: '9px', fontWeight: 900, color: MUTED }}>Add</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Anonymous toggle */}
              <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', background: SURFACE, borderRadius: '12px', cursor: 'pointer', border: '1px solid #e2eae6', marginBottom: '24px' }}>
                <div>
                  <p style={{ fontSize: '13px', fontWeight: 900, color: INK }}>Post anonymously</p>
                  <p style={{ fontSize: '11px', color: MUTED, fontWeight: 700 }}>Your name won't be shown publicly</p>
                </div>
                <div onClick={() => setAnonymous(!anonymous)}
                  style={{ width: '44px', height: '24px', borderRadius: '12px', background: anonymous ? MINT : '#e2eae6', position: 'relative', flexShrink: 0, transition: 'background 0.2s', cursor: 'pointer' }}>
                  <div style={{ position: 'absolute', top: '2px', left: anonymous ? '22px' : '2px', width: '20px', height: '20px', borderRadius: '50%', background: 'white', transition: 'left 0.2s', boxShadow: '0 1px 4px rgba(0,0,0,0.2)' }} />
                </div>
              </label>

              {/* Guidelines */}
              <div style={{ padding: '14px 16px', background: CREAM, borderRadius: '12px', border: `1px solid #e8d5c0`, marginBottom: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <Shield size={14} color="#b45309" />
                  <p style={{ fontSize: '12px', fontWeight: 900, color: '#b45309' }}>Review Guidelines</p>
                </div>
                {['Be honest and factual', 'No personal attacks or insults', 'Only review actual transactions', 'Fake reviews may result in account suspension'].map(g => (
                  <div key={g} style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                    <Check size={11} color="#b45309" />
                    <span style={{ fontSize: '11px', color: '#6b4c2a', fontWeight: 700 }}>{g}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── STEP: CONFIRM ── */}
          {step === 'confirm' && (
            <div>
              <h2 style={{ fontSize: '20px', fontWeight: 900, color: INK, letterSpacing: '-0.05em', marginBottom: '6px' }}>Confirm Review</h2>
              <p style={{ fontSize: '13px', color: MUTED, fontWeight: 700, marginBottom: '24px' }}>Review this before publishing. You can't edit it after submitting.</p>

              {/* Preview */}
              <div style={{ background: SURFACE, borderRadius: '16px', padding: '20px', marginBottom: '20px', border: '1px solid #e2eae6' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: `linear-gradient(135deg, ${MINT}, #0f9b8e)`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <span style={{ color: 'white', fontWeight: 900, fontSize: '13px' }}>{anonymous ? 'A' : 'YA'}</span>
                  </div>
                  <div>
                    <p style={{ fontSize: '13px', fontWeight: 900, color: INK }}>{anonymous ? 'Anonymous' : 'Youssef A.'}</p>
                    <div style={{ display: 'flex', gap: '2px' }}>
                      {[1,2,3,4,5].map(i => <Star key={i} size={13} fill={i <= rating ? '#f59e0b' : 'none'} color="#f59e0b" />)}
                      <span style={{ fontSize: '11px', color: MUTED, fontWeight: 700, marginLeft: '4px' }}>· Just now</span>
                    </div>
                  </div>
                </div>

                {selectedTags.length > 0 && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '10px' }}>
                    {selectedTags.map(tag => (
                      <span key={tag} style={{ fontSize: '11px', fontWeight: 700, padding: '3px 10px', borderRadius: '100px', background: 'white', color: INK, border: '1px solid #e2eae6' }}>{tag}</span>
                    ))}
                  </div>
                )}

                {comment && <p style={{ fontSize: '13px', color: MUTED, lineHeight: 1.6, fontWeight: 700 }}>{comment}</p>}
                {!comment && !selectedTags.length && <p style={{ fontSize: '13px', color: MUTED, fontStyle: 'italic', fontWeight: 700 }}>No written comment added.</p>}

                {photos.length > 0 && (
                  <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
                    {photos.map((src, i) => (
                      <img key={i} src={src} alt="" style={{ width: '60px', height: '60px', borderRadius: '8px', objectFit: 'cover' }} />
                    ))}
                  </div>
                )}
              </div>

              {/* Who it's for */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 16px', background: SURFACE, borderRadius: '12px', marginBottom: '20px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: `linear-gradient(135deg, ${MINT}, #0f9b8e)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ color: 'white', fontWeight: 900, fontSize: '12px' }}>{order.counterpart.initials}</span>
                </div>
                <div>
                  <p style={{ fontSize: '12px', color: MUTED, fontWeight: 700 }}>Reviewing</p>
                  <p style={{ fontSize: '14px', fontWeight: 900, color: INK }}>{order.counterpart.name}</p>
                </div>
                <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
                  <p style={{ fontSize: '12px', color: MUTED, fontWeight: 700 }}>Their rating after</p>
                  <p style={{ fontSize: '14px', fontWeight: 900, color: INK }}>
                    {((order.counterpart.rating * order.counterpart.totalReviews + rating) / (order.counterpart.totalReviews + 1)).toFixed(1)} ⭐
                  </p>
                </div>
              </div>

              <div style={{ padding: '12px 16px', background: '#f0fdf9', borderRadius: '12px', border: `1px solid ${MINT}`, marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ThumbsUp size={14} color={MINT} />
                <p style={{ fontSize: '12px', color: '#0f9b8e', fontWeight: 700 }}>
                  Reviews are permanent and cannot be edited after submission.
                </p>
              </div>
            </div>
          )}

          {/* ── NAV BUTTONS ── */}
          <div style={{ display: 'flex', gap: '10px', marginTop: '28px', paddingTop: '20px', borderTop: '1px solid #e2eae6' }}>
            {step !== 'rate' && (
              <button onClick={() => setStep(step === 'confirm' ? 'details' : 'rate')}
                style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '12px 20px', borderRadius: '12px', border: '1.5px solid #e2eae6', background: 'white', color: INK, fontSize: '14px', fontWeight: 900, cursor: 'pointer', fontFamily: FONT }}>
                ← Back
              </button>
            )}

            {step === 'rate' && (
              <button onClick={() => canProceedToDetails && setStep('details')}
                style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '13px', borderRadius: '12px', background: canProceedToDetails ? MINT : '#e2eae6', color: canProceedToDetails ? 'white' : MUTED, border: 'none', fontSize: '14px', fontWeight: 900, cursor: canProceedToDetails ? 'pointer' : 'not-allowed', fontFamily: FONT, transition: 'all 0.2s' }}>
                Continue <ArrowRight size={15} />
              </button>
            )}

            {step === 'details' && (
              <button onClick={() => setStep('confirm')}
                style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '13px', borderRadius: '12px', background: MINT, color: 'white', border: 'none', fontSize: '14px', fontWeight: 900, cursor: 'pointer', fontFamily: FONT }}>
                Preview Review <ArrowRight size={15} />
              </button>
            )}

            {step === 'confirm' && (
              <button onClick={() => setSubmitted(true)}
                style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '13px', borderRadius: '12px', background: `linear-gradient(135deg, ${MINT}, #0f9b8e)`, color: 'white', border: 'none', fontSize: '14px', fontWeight: 900, cursor: 'pointer', fontFamily: FONT, boxShadow: `0 4px 16px rgba(34,212,168,0.3)` }}>
                <Check size={16} /> Publish Review
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
