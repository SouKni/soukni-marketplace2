'use client'

import { useState, use } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  Zap, TrendingUp, Eye, Star, Crown, Check,
  ChevronRight, ArrowRight, Sparkles, Clock,
  BarChart3, Users, Heart, MessageCircle,
  CreditCard, Shield, X, Calendar, Flame
} from 'lucide-react'

type Locale = 'en' | 'fr' | 'ar' | 'es' | 'de'

const MINT    = '#22d4a8'
const CREAM   = '#f5ede0'
const SURFACE = '#f4fbf8'
const INK     = '#161d1b'
const MUTED   = '#6b7a76'
const FONT    = "'Inter', system-ui, sans-serif"

const MOCK_ADS: Record<string, {
  id: string; title: string; price: string; image: string
  category: string; city: string; views: number; favorites: number
  messages: number; daysListed: number; status: string
}> = {
  '1': { id: '1', title: 'iPhone 15 Pro Max 256GB — Titanium Black', price: '12,500 MAD', image: 'https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&w=400', category: 'Electronics', city: 'Rabat', views: 847, favorites: 23, messages: 6, daysListed: 2, status: 'active' },
  '2': { id: '2', title: 'MacBook Pro 14" M3 Pro 18GB/512GB', price: '24,800 MAD', image: 'https://images.pexels.com/photos/1229861/pexels-photo-1229861.jpeg?auto=compress&w=400', category: 'Electronics', city: 'Rabat', views: 412, favorites: 18, messages: 4, daysListed: 5, status: 'active' },
  '3': { id: '3', title: 'AirPods Pro 2nd Gen — Sealed Box', price: '1,850 MAD', image: 'https://images.pexels.com/photos/8000631/pexels-photo-8000631.jpeg?auto=compress&w=400', category: 'Electronics', city: 'Rabat', views: 156, favorites: 7, messages: 1, daysListed: 7, status: 'paused' },
}

type BoostPlan = {
  key: string
  name: string
  emoji: string
  price: number
  duration: number
  durationLabel: string
  multiplier: string
  color: string
  bg: string
  gradient: string
  popular: boolean
  features: string[]
  badge: string
}

const BOOST_PLANS: BoostPlan[] = [
  {
    key: 'starter',
    name: 'Starter Boost',
    emoji: '⚡',
    price: 29,
    duration: 3,
    durationLabel: '3 days',
    multiplier: '3×',
    color: '#0891b2',
    bg: '#e0f2fe',
    gradient: 'linear-gradient(135deg, #0891b2, #0e7490)',
    popular: false,
    badge: 'Good start',
    features: [
      'Top of category for 3 days',
      '3× more views estimated',
      'Highlighted border on listing card',
      'Priority in search results',
    ],
  },
  {
    key: 'pro',
    name: 'Pro Boost',
    emoji: '🔥',
    price: 69,
    duration: 7,
    durationLabel: '7 days',
    multiplier: '7×',
    color: '#ea580c',
    bg: '#ffedd5',
    gradient: 'linear-gradient(135deg, #ea580c, #dc2626)',
    popular: true,
    badge: 'Most Popular',
    features: [
      'Top of category for 7 days',
      '7× more views estimated',
      'Fire 🔥 badge on listing',
      'Featured on homepage',
      'Priority WhatsApp visibility',
      'SMS alert to nearby buyers',
    ],
  },
  {
    key: 'elite',
    name: 'Elite Boost',
    emoji: '👑',
    price: 149,
    duration: 14,
    durationLabel: '14 days',
    multiplier: '15×',
    color: '#7c3aed',
    bg: '#ede9fe',
    gradient: 'linear-gradient(135deg, #7c3aed, #6d28d9)',
    popular: false,
    badge: 'Maximum Power',
    features: [
      'Top of ALL categories for 14 days',
      '15× more views estimated',
      'Crown 👑 badge on listing',
      'Featured on homepage daily',
      'Push notification to 500+ buyers',
      'Social media promotion',
      'Dedicated placement in search',
      'Priority customer support',
    ],
  },
]

const ADD_ONS = [
  { key: 'urgent', label: '🚨 Urgent Sale Badge', desc: 'Signals buyers you need a quick sale', price: 19, icon: <Flame size={16} color="#ef4444" /> },
  { key: 'featured_photo', label: '📸 Photo Enhancement', desc: 'AI-enhanced cover photo for more clicks', price: 15, icon: <Star size={16} color="#f59e0b" /> },
  { key: 'refresh', label: '🔄 Daily Refresh', desc: 'Re-listed as new every 24h during boost', price: 25, icon: <Clock size={16} color={MINT} /> },
  { key: 'social', label: '📱 Social Share', desc: 'Shared on SouKni Instagram & TikTok', price: 35, icon: <Users size={16} color="#8b5cf6" /> },
]

type Step = 'select' | 'addons' | 'payment' | 'success'

export default function BoostPage({ params }: { params: Promise<{ locale: Locale; adId: string }> }) {
  const { locale, adId } = use(params)
  const router = useRouter()

  const ad = MOCK_ADS[adId] || MOCK_ADS['1']

  const [step, setStep]           = useState<Step>('select')
  const [selectedPlan, setSelectedPlan] = useState<BoostPlan | null>(null)
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([])
  const [cardNumber, setCardNumber] = useState('')
  const [cardExpiry, setCardExpiry] = useState('')
  const [cardCvc, setCardCvc]     = useState('')
  const [cardName, setCardName]   = useState('')
  const [processing, setProcessing] = useState(false)

  const toggleAddOn = (key: string) =>
    setSelectedAddOns(prev => prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key])

  const addOnTotal = ADD_ONS.filter(a => selectedAddOns.includes(a.key)).reduce((s, a) => s + a.price, 0)
  const total = (selectedPlan?.price || 0) + addOnTotal

  const formatCard  = (v: string) => v.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim().slice(0, 19)
  const formatExpiry = (v: string) => v.replace(/\D/g, '').replace(/(\d{2})(\d)/, '$1/$2').slice(0, 5)

  const canPay = cardName && cardNumber.length === 19 && cardExpiry.length === 5 && cardCvc.length === 3

  const handlePay = () => {
    if (!canPay) return
    setProcessing(true)
    setTimeout(() => { setProcessing(false); setStep('success') }, 2000)
  }

  const projectedViews = Math.round(ad.views * Number(selectedPlan?.multiplier?.replace('×', '') || 1))

  // ── STEP INDICATOR ─────────────────────────────────────────────
  const StepBar = () => {
    const steps = ['select', 'addons', 'payment']
    const curr  = steps.indexOf(step)
    return (
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '28px' }}>
        {[{ label: 'Plan' }, { label: 'Add-ons' }, { label: 'Pay' }].map((s, i, arr) => {
          const done   = i < curr
          const active = i === curr
          return (
            <div key={s.label} style={{ display: 'flex', alignItems: 'center', flex: i < arr.length - 1 ? 1 : 'none' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 900, background: done ? MINT : active ? INK : '#e2eae6', color: done || active ? 'white' : MUTED, transition: 'all 0.3s' }}>
                  {done ? <Check size={14} strokeWidth={3} /> : i + 1}
                </div>
                <span style={{ fontSize: '10px', fontWeight: 900, color: active ? INK : done ? MINT : MUTED }}>{s.label}</span>
              </div>
              {i < arr.length - 1 && <div style={{ flex: 1, height: '2px', background: done ? MINT : '#e2eae6', margin: '0 8px', marginBottom: '18px', transition: 'background 0.3s' }} />}
            </div>
          )
        })}
      </div>
    )
  }

  // ── SUCCESS ─────────────────────────────────────────────────────
  if (step === 'success') return (
    <div style={{ background: SURFACE, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 24px', fontFamily: FONT }}>
      <div style={{ maxWidth: '520px', width: '100%', textAlign: 'center' }}>

        {/* Animated badge */}
        <div style={{ width: '96px', height: '96px', borderRadius: '28px', background: selectedPlan?.gradient, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', boxShadow: `0 16px 48px rgba(0,0,0,0.2)` }}>
          <span style={{ fontSize: '44px' }}>{selectedPlan?.emoji}</span>
        </div>

        <h1 style={{ fontSize: '28px', fontWeight: 900, color: INK, letterSpacing: '-0.05em', marginBottom: '8px' }}>
          Your ad is now Boosted! 🎉
        </h1>
        <p style={{ fontSize: '14px', color: MUTED, fontWeight: 700, lineHeight: 1.7, marginBottom: '28px' }}>
          <strong style={{ color: INK }}>{selectedPlan?.name}</strong> is now live for{' '}
          <strong style={{ color: INK }}>{selectedPlan?.durationLabel}</strong>.
          Your listing is now at the top of {ad.category}.
        </p>

        {/* Stats projection */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '24px' }}>
          {[
            { icon: <Eye size={16} color={MINT} />, label: 'Est. Views', value: `${projectedViews.toLocaleString()}+`, sub: `vs ${ad.views} now` },
            { icon: <Heart size={16} color="#ef4444" />, label: 'Est. Saves', value: `${Math.round(ad.favorites * Number(selectedPlan?.multiplier?.replace('×', '') || 1))}+`, sub: `vs ${ad.favorites} now` },
            { icon: <MessageCircle size={16} color="#8b5cf6" />, label: 'Est. Messages', value: `${Math.round(ad.messages * Number(selectedPlan?.multiplier?.replace('×', '') || 1))}+`, sub: `vs ${ad.messages} now` },
          ].map(s => (
            <div key={s.label} style={{ background: 'white', borderRadius: '14px', padding: '16px', border: '1px solid #e2eae6' }}>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '6px' }}>{s.icon}</div>
              <p style={{ fontSize: '18px', fontWeight: 900, color: INK, letterSpacing: '-0.03em' }}>{s.value}</p>
              <p style={{ fontSize: '10px', color: MUTED, fontWeight: 700, marginTop: '2px' }}>{s.label}</p>
              <p style={{ fontSize: '10px', color: MINT, fontWeight: 900 }}>{s.sub}</p>
            </div>
          ))}
        </div>

        {/* Boost summary */}
        <div style={{ background: 'white', borderRadius: '18px', padding: '20px', border: '1px solid #e2eae6', marginBottom: '20px', textAlign: 'left' }}>
          <div style={{ display: 'flex', gap: '12px', marginBottom: '14px', paddingBottom: '14px', borderBottom: '1px solid #f4fbf8' }}>
            <img src={ad.image} alt="" style={{ width: '52px', height: '52px', borderRadius: '10px', objectFit: 'cover', flexShrink: 0 }} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontSize: '12px', color: MUTED, fontWeight: 700, marginBottom: '2px' }}>{ad.category} · {ad.city}</p>
              <p style={{ fontSize: '13px', fontWeight: 900, color: INK, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{ad.title}</p>
              <p style={{ fontSize: '13px', fontWeight: 900, color: MINT }}>{ad.price}</p>
            </div>
          </div>
          {[
            ['Plan', `${selectedPlan?.emoji} ${selectedPlan?.name}`],
            ['Duration', selectedPlan?.durationLabel || ''],
            ['Boost Badge', selectedPlan?.emoji + ' Active'],
            ['Expires', new Date(Date.now() + (selectedPlan?.duration || 7) * 86400000).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })],
            ['Total Paid', `${total} MAD`],
          ].map(([label, value]) => (
            <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid #f4fbf8' }}>
              <span style={{ fontSize: '12px', color: MUTED, fontWeight: 700 }}>{label}</span>
              <span style={{ fontSize: '12px', fontWeight: 900, color: INK }}>{value}</span>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <Link href={`/${locale}/account/my-ads`}
            style={{ flex: 1, padding: '13px', borderRadius: '12px', border: '1.5px solid #e2eae6', color: INK, textDecoration: 'none', fontSize: '14px', fontWeight: 900, textAlign: 'center' }}>
            My Ads
          </Link>
          <Link href={`/${locale}/listing/${adId}`}
            style={{ flex: 1, padding: '13px', borderRadius: '12px', background: MINT, color: 'white', textDecoration: 'none', fontSize: '14px', fontWeight: 900, textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
            <Eye size={15} /> View Listing
          </Link>
        </div>
      </div>
    </div>
  )

  return (
    <div style={{ background: SURFACE, minHeight: '100vh', fontFamily: FONT }}>
      <div style={{ maxWidth: '760px', margin: '0 auto', padding: '32px 24px 80px' }}>

        {/* Breadcrumb */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '24px' }}>
          <Link href={`/${locale}/account/my-ads`} style={{ fontSize: '13px', color: MUTED, textDecoration: 'none', fontWeight: 700 }}>My Ads</Link>
          <ChevronRight size={13} color={MUTED} />
          <span style={{ fontSize: '13px', fontWeight: 900, color: INK }}>Boost Ad</span>
        </nav>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '28px' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'linear-gradient(135deg, #f59e0b, #ea580c)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Zap size={22} color="white" />
          </div>
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: 900, color: INK, letterSpacing: '-0.05em', marginBottom: '2px' }}>Boost Your Ad</h1>
            <p style={{ fontSize: '13px', color: MUTED, fontWeight: 700 }}>Get more views, more messages, sell faster</p>
          </div>
        </div>

        {/* Ad being boosted */}
        <div style={{ display: 'flex', gap: '14px', padding: '16px', background: 'white', borderRadius: '18px', border: '1px solid #e2eae6', marginBottom: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
          <img src={ad.image} alt="" style={{ width: '72px', height: '72px', borderRadius: '12px', objectFit: 'cover', flexShrink: 0 }} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ fontSize: '12px', color: MUTED, fontWeight: 700, marginBottom: '2px' }}>{ad.category} · {ad.city} · Listed {ad.daysListed}d ago</p>
            <p style={{ fontSize: '14px', fontWeight: 900, color: INK, marginBottom: '4px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{ad.title}</p>
            <p style={{ fontSize: '16px', fontWeight: 900, color: MINT }}>{ad.price}</p>
          </div>
          {/* Current performance */}
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexShrink: 0 }}>
            {[
              { icon: <Eye size={13} color={MUTED} />, value: ad.views },
              { icon: <Heart size={13} color={MUTED} />, value: ad.favorites },
              { icon: <MessageCircle size={13} color={MUTED} />, value: ad.messages },
            ].map((s, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2px' }}>{s.icon}</div>
                <p style={{ fontSize: '12px', fontWeight: 900, color: INK }}>{s.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FORM */}
        <div style={{ background: 'white', borderRadius: '24px', padding: '32px', border: '1px solid #e2eae6', boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
          <StepBar />

          {/* ── STEP 1: SELECT PLAN ── */}
          {step === 'select' && (
            <div>
              <h2 style={{ fontSize: '20px', fontWeight: 900, color: INK, letterSpacing: '-0.05em', marginBottom: '6px' }}>Choose a Boost Plan</h2>
              <p style={{ fontSize: '13px', color: MUTED, fontWeight: 700, marginBottom: '24px' }}>All plans include top placement and more visibility. Cancel anytime.</p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '28px' }}>
                {BOOST_PLANS.map(plan => (
                  <button key={plan.key} onClick={() => setSelectedPlan(plan)}
                    style={{ display: 'flex', gap: '16px', padding: '20px', borderRadius: '18px', border: `2px solid ${selectedPlan?.key === plan.key ? plan.color : plan.popular ? `${plan.color}40` : '#e2eae6'}`, background: selectedPlan?.key === plan.key ? plan.bg : plan.popular ? `${plan.bg}60` : 'white', cursor: 'pointer', fontFamily: FONT, textAlign: 'left', transition: 'all 0.2s', position: 'relative', overflow: 'hidden' }}>

                    {/* Popular ribbon */}
                    {plan.popular && (
                      <div style={{ position: 'absolute', top: '12px', right: '-8px', background: plan.gradient, color: 'white', fontSize: '9px', fontWeight: 900, padding: '4px 20px 4px 12px', borderRadius: '100px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                        {plan.badge}
                      </div>
                    )}

                    {/* Emoji */}
                    <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: plan.gradient, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: `0 4px 12px ${plan.color}40` }}>
                      <span style={{ fontSize: '24px' }}>{plan.emoji}</span>
                    </div>

                    {/* Info */}
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                        <p style={{ fontSize: '16px', fontWeight: 900, color: INK }}>{plan.name}</p>
                        <span style={{ fontSize: '11px', fontWeight: 900, padding: '2px 8px', borderRadius: '100px', background: plan.bg, color: plan.color }}>
                          {plan.multiplier} views · {plan.durationLabel}
                        </span>
                      </div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '0' }}>
                        {plan.features.slice(0, 3).map(f => (
                          <span key={f} style={{ fontSize: '11px', fontWeight: 700, color: MUTED, display: 'flex', alignItems: 'center', gap: '3px' }}>
                            <Check size={10} color={plan.color} strokeWidth={3} /> {f}
                          </span>
                        ))}
                        {plan.features.length > 3 && <span style={{ fontSize: '11px', fontWeight: 700, color: plan.color }}>+{plan.features.length - 3} more</span>}
                      </div>
                    </div>

                    {/* Price */}
                    <div style={{ textAlign: 'right', flexShrink: 0 }}>
                      <p style={{ fontSize: '24px', fontWeight: 900, color: plan.color, letterSpacing: '-0.03em' }}>{plan.price}</p>
                      <p style={{ fontSize: '11px', color: MUTED, fontWeight: 700 }}>MAD</p>
                    </div>

                    {/* Selected check */}
                    {selectedPlan?.key === plan.key && (
                      <div style={{ position: 'absolute', top: '14px', left: '14px', width: '20px', height: '20px', borderRadius: '50%', background: plan.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Check size={12} color="white" strokeWidth={3} />
                      </div>
                    )}
                  </button>
                ))}
              </div>

              {/* Projected impact */}
              {selectedPlan && (
                <div style={{ background: SURFACE, borderRadius: '16px', padding: '18px', border: '1px solid #e2eae6', marginBottom: '8px' }}>
                  <p style={{ fontSize: '12px', fontWeight: 900, color: MUTED, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '12px' }}>
                    📊 Projected Impact for Your Ad
                  </p>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
                    {[
                      { label: 'Views', current: ad.views, projected: Math.round(ad.views * Number(selectedPlan.multiplier.replace('×', ''))), icon: <Eye size={14} color={MINT} /> },
                      { label: 'Saves', current: ad.favorites, projected: Math.round(ad.favorites * Number(selectedPlan.multiplier.replace('×', ''))), icon: <Heart size={14} color="#ef4444" /> },
                      { label: 'Messages', current: ad.messages, projected: Math.round(ad.messages * Number(selectedPlan.multiplier.replace('×', ''))), icon: <MessageCircle size={14} color="#8b5cf6" /> },
                    ].map(m => (
                      <div key={m.label} style={{ background: 'white', borderRadius: '12px', padding: '14px', textAlign: 'center', border: '1px solid #e2eae6' }}>
                        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '6px' }}>{m.icon}</div>
                        <p style={{ fontSize: '11px', color: MUTED, fontWeight: 700, marginBottom: '4px' }}>{m.label}</p>
                        <p style={{ fontSize: '11px', color: MUTED, fontWeight: 700 }}>{m.current} → <strong style={{ color: INK, fontSize: '14px' }}>{m.projected}+</strong></p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ── STEP 2: ADD-ONS ── */}
          {step === 'addons' && (
            <div>
              <h2 style={{ fontSize: '20px', fontWeight: 900, color: INK, letterSpacing: '-0.05em', marginBottom: '6px' }}>Power-ups</h2>
              <p style={{ fontSize: '13px', color: MUTED, fontWeight: 700, marginBottom: '24px' }}>Add optional extras to your {selectedPlan?.name}. All are optional.</p>

              {/* Selected plan recap */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 16px', borderRadius: '14px', border: `1.5px solid ${selectedPlan?.color}`, background: selectedPlan?.bg, marginBottom: '20px' }}>
                <span style={{ fontSize: '24px' }}>{selectedPlan?.emoji}</span>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: '14px', fontWeight: 900, color: INK }}>{selectedPlan?.name}</p>
                  <p style={{ fontSize: '12px', color: MUTED, fontWeight: 700 }}>{selectedPlan?.durationLabel} · {selectedPlan?.multiplier} views boost</p>
                </div>
                <p style={{ fontSize: '18px', fontWeight: 900, color: selectedPlan?.color }}>{selectedPlan?.price} MAD</p>
              </div>

              {/* Add-ons */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
                {ADD_ONS.map(addon => {
                  const selected = selectedAddOns.includes(addon.key)
                  return (
                    <button key={addon.key} onClick={() => toggleAddOn(addon.key)}
                      style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '16px', borderRadius: '14px', border: `1.5px solid ${selected ? MINT : '#e2eae6'}`, background: selected ? '#f0fdf9' : 'white', cursor: 'pointer', fontFamily: FONT, textAlign: 'left', transition: 'all 0.15s' }}>
                      <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: SURFACE, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        {addon.icon}
                      </div>
                      <div style={{ flex: 1 }}>
                        <p style={{ fontSize: '14px', fontWeight: 900, color: INK, marginBottom: '2px' }}>{addon.label}</p>
                        <p style={{ fontSize: '12px', color: MUTED, fontWeight: 700 }}>{addon.desc}</p>
                      </div>
                      <div style={{ textAlign: 'right', flexShrink: 0 }}>
                        <p style={{ fontSize: '15px', fontWeight: 900, color: selected ? MINT : INK }}>+{addon.price} MAD</p>
                      </div>
                      <div style={{ width: '22px', height: '22px', borderRadius: '6px', border: `2px solid ${selected ? MINT : '#e2eae6'}`, background: selected ? MINT : 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'all 0.15s' }}>
                        {selected && <Check size={13} color="white" strokeWidth={3} />}
                      </div>
                    </button>
                  )
                })}
              </div>

              {/* Order summary */}
              <div style={{ background: SURFACE, borderRadius: '14px', padding: '16px', border: '1px solid #e2eae6' }}>
                <p style={{ fontSize: '12px', fontWeight: 900, color: MUTED, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '12px' }}>Order Summary</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '13px', color: MUTED, fontWeight: 700 }}>{selectedPlan?.name}</span>
                    <span style={{ fontSize: '13px', fontWeight: 900, color: INK }}>{selectedPlan?.price} MAD</span>
                  </div>
                  {ADD_ONS.filter(a => selectedAddOns.includes(a.key)).map(a => (
                    <div key={a.key} style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: '13px', color: MUTED, fontWeight: 700 }}>{a.label}</span>
                      <span style={{ fontSize: '13px', fontWeight: 900, color: INK }}>+{a.price} MAD</span>
                    </div>
                  ))}
                </div>
                <div style={{ paddingTop: '10px', borderTop: '1px solid #e2eae6', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '15px', fontWeight: 900, color: INK }}>Total</span>
                  <span style={{ fontSize: '20px', fontWeight: 900, color: MINT, letterSpacing: '-0.03em' }}>{total} MAD</span>
                </div>
              </div>
            </div>
          )}

          {/* ── STEP 3: PAYMENT ── */}
          {step === 'payment' && (
            <div>
              <h2 style={{ fontSize: '20px', fontWeight: 900, color: INK, letterSpacing: '-0.05em', marginBottom: '6px' }}>Payment</h2>
              <p style={{ fontSize: '13px', color: MUTED, fontWeight: 700, marginBottom: '24px' }}>Your boost goes live immediately after payment.</p>

              {/* Order recap */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', background: SURFACE, borderRadius: '14px', border: '1px solid #e2eae6', marginBottom: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontSize: '22px' }}>{selectedPlan?.emoji}</span>
                  <div>
                    <p style={{ fontSize: '13px', fontWeight: 900, color: INK }}>{selectedPlan?.name}{selectedAddOns.length > 0 ? ` + ${selectedAddOns.length} add-on${selectedAddOns.length > 1 ? 's' : ''}` : ''}</p>
                    <p style={{ fontSize: '11px', color: MUTED, fontWeight: 700 }}>{selectedPlan?.durationLabel} · Starts immediately</p>
                  </div>
                </div>
                <p style={{ fontSize: '20px', fontWeight: 900, color: MINT }}>{total} MAD</p>
              </div>

              {/* Card form */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '20px' }}>
                <div>
                  <label style={{ fontSize: '11px', fontWeight: 900, color: INK, textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', marginBottom: '8px' }}>Name on Card</label>
                  <input value={cardName} onChange={e => setCardName(e.target.value)} placeholder="Youssef Alami"
                    style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #e2eae6', fontSize: '14px', fontFamily: FONT, fontWeight: 700, color: INK, background: SURFACE, outline: 'none', boxSizing: 'border-box', transition: 'border-color 0.2s' }}
                    onFocus={e => e.target.style.borderColor = MINT}
                    onBlur={e => e.target.style.borderColor = '#e2eae6'}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '11px', fontWeight: 900, color: INK, textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', marginBottom: '8px' }}>Card Number</label>
                  <input value={cardNumber} onChange={e => setCardNumber(formatCard(e.target.value))} placeholder="1234 5678 9012 3456" maxLength={19}
                    style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #e2eae6', fontSize: '14px', fontFamily: FONT, fontWeight: 700, color: INK, background: SURFACE, outline: 'none', boxSizing: 'border-box', letterSpacing: '0.05em', transition: 'border-color 0.2s' }}
                    onFocus={e => e.target.style.borderColor = MINT}
                    onBlur={e => e.target.style.borderColor = '#e2eae6'}
                  />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  {[
                    { label: 'Expiry', value: cardExpiry, set: (v: string) => setCardExpiry(formatExpiry(v)), placeholder: 'MM/YY', max: 5 },
                    { label: 'CVC', value: cardCvc, set: (v: string) => setCardCvc(v.replace(/\D/g, '').slice(0, 3)), placeholder: '•••', max: 3 },
                  ].map(f => (
                    <div key={f.label}>
                      <label style={{ fontSize: '11px', fontWeight: 900, color: INK, textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', marginBottom: '8px' }}>{f.label}</label>
                      <input value={f.value} onChange={e => f.set(e.target.value)} placeholder={f.placeholder} maxLength={f.max}
                        style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #e2eae6', fontSize: '14px', fontFamily: FONT, fontWeight: 700, color: INK, background: SURFACE, outline: 'none', boxSizing: 'border-box', transition: 'border-color 0.2s' }}
                        onFocus={e => e.target.style.borderColor = MINT}
                        onBlur={e => e.target.style.borderColor = '#e2eae6'}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Security badge */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px', padding: '10px 14px', background: '#f0fdf9', borderRadius: '10px', border: `1px solid ${MINT}` }}>
                <Shield size={14} color={MINT} />
                <p style={{ fontSize: '11px', color: '#0f9b8e', fontWeight: 700 }}>256-bit SSL encryption · Payments processed securely · No recurring charges</p>
              </div>

              {/* Pay button */}
              <button onClick={handlePay}
                disabled={!canPay || processing}
                style={{ width: '100%', padding: '15px', borderRadius: '14px', background: canPay ? `linear-gradient(135deg, ${selectedPlan?.color}, ${selectedPlan?.color}cc)` : '#e2eae6', color: canPay ? 'white' : MUTED, border: 'none', fontSize: '15px', fontWeight: 900, cursor: canPay ? 'pointer' : 'not-allowed', fontFamily: FONT, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', boxShadow: canPay ? `0 4px 20px ${selectedPlan?.color}40` : 'none', transition: 'all 0.2s' }}>
                {processing ? (
                  <>
                    <div style={{ width: '16px', height: '16px', borderRadius: '50%', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: 'white', animation: 'spin 0.8s linear infinite' }} />
                    Processing...
                  </>
                ) : (
                  <>
                    <Zap size={16} /> Pay {total} MAD & Boost Now
                  </>
                )}
              </button>
              <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
            </div>
          )}

          {/* ── NAV BUTTONS ── */}
          {step !== 'payment' && (
            <div style={{ display: 'flex', gap: '10px', marginTop: '28px', paddingTop: '20px', borderTop: '1px solid #e2eae6' }}>
              {step === 'addons' && (
                <button onClick={() => setStep('select')}
                  style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '12px 20px', borderRadius: '12px', border: '1.5px solid #e2eae6', background: 'white', color: INK, fontSize: '14px', fontWeight: 900, cursor: 'pointer', fontFamily: FONT }}>
                  ← Back
                </button>
              )}
              <button
                onClick={() => {
                  if (step === 'select' && selectedPlan) setStep('addons')
                  else if (step === 'addons') setStep('payment')
                }}
                disabled={step === 'select' && !selectedPlan}
                style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '13px', borderRadius: '12px', background: (step === 'select' && !selectedPlan) ? '#e2eae6' : MINT, color: (step === 'select' && !selectedPlan) ? MUTED : 'white', border: 'none', fontSize: '14px', fontWeight: 900, cursor: (step === 'select' && !selectedPlan) ? 'not-allowed' : 'pointer', fontFamily: FONT, transition: 'all 0.2s' }}>
                {step === 'addons' ? 'Continue to Payment' : 'Choose Add-ons'} <ArrowRight size={15} />
              </button>
            </div>
          )}

          {step === 'payment' && (
            <div style={{ marginTop: '16px' }}>
              <button onClick={() => setStep('addons')}
                style={{ background: 'none', border: 'none', color: MUTED, fontSize: '13px', fontWeight: 700, cursor: 'pointer', fontFamily: FONT, display: 'flex', alignItems: 'center', gap: '4px' }}>
                ← Back to add-ons
              </button>
            </div>
          )}
        </div>

        {/* Trust indicators */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginTop: '20px' }}>
          {[
            { icon: <Zap size={16} color="#f59e0b" />, label: 'Instant Activation', desc: 'Live within 60 seconds' },
            { icon: <BarChart3 size={16} color={MINT} />, label: 'Real-time Stats', desc: 'Track your boost live' },
            { icon: <Shield size={16} color="#8b5cf6" />, label: 'Money-back', desc: 'If boost fails to deliver' },
          ].map(t => (
            <div key={t.label} style={{ background: 'white', borderRadius: '14px', padding: '16px', border: '1px solid #e2eae6', textAlign: 'center' }}>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '6px' }}>{t.icon}</div>
              <p style={{ fontSize: '12px', fontWeight: 900, color: INK, marginBottom: '2px' }}>{t.label}</p>
              <p style={{ fontSize: '11px', color: MUTED, fontWeight: 700 }}>{t.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
