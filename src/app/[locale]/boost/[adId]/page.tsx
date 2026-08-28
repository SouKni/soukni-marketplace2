'use client'

import { useState, use, useEffect } from 'react'
import Link from 'next/link'
import { Zap, Eye, Heart, MessageCircle, Check, ChevronRight, ArrowRight, Shield, BarChart3 } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { getSupabaseClient } from '@/lib/supabase/client'
import { BOOST_PLANS, BoostPlanKey } from '@/lib/stripe/plans'

type Locale = 'en' | 'fr' | 'ar' | 'es' | 'de'

const MINT    = '#22d4a8'
const SURFACE = '#f4fbf8'
const INK     = '#161d1b'
const MUTED   = '#6b7a76'
const FONT    = "'Inter', system-ui, sans-serif"

const PLAN_STYLE: Record<BoostPlanKey, { emoji: string; color: string; bg: string; gradient: string; multiplier: number; popular?: boolean }> = {
  starter: { emoji: '⚡', color: '#0891b2', bg: '#e0f2fe', gradient: 'linear-gradient(135deg, #0891b2, #0e7490)', multiplier: 3 },
  pro:     { emoji: '🔥', color: '#ea580c', bg: '#ffedd5', gradient: 'linear-gradient(135deg, #ea580c, #dc2626)', multiplier: 7, popular: true },
  elite:   { emoji: '👑', color: '#7c3aed', bg: '#ede9fe', gradient: 'linear-gradient(135deg, #7c3aed, #6d28d9)', multiplier: 15 },
}

type DbListing = {
  id: string; title: string; price: number; currency: string; images: string[]
  category_slug: string | null; city: string | null; created_at: string; views: number | null
  seller_id: string; boosted: boolean | null; boosted_until: string | null; boost_tier: string | null
}

function categoryLabel(slug: string | null) {
  if (!slug) return 'Listing'
  return slug.split('-').map(w => w[0]?.toUpperCase() + w.slice(1)).join(' ')
}

export default function BoostPage({ params }: { params: Promise<{ locale: Locale; adId: string }> }) {
  const { locale, adId } = use(params)
  const { user } = useAuth()
  const supabase = getSupabaseClient()

  const [listing, setListing] = useState<DbListing | null | undefined>(undefined) // undefined = loading, null = not found
  const [favCount, setFavCount] = useState(0)
  const [msgCount, setMsgCount] = useState(0)
  const [selectedPlan, setSelectedPlan] = useState<BoostPlanKey | null>(null)
  const [redirecting, setRedirecting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [confirming, setConfirming] = useState(false)
  const [hasSessionId, setHasSessionId] = useState(false)

  useEffect(() => {
    let cancelled = false
    supabase.from('listings').select('*').eq('id', adId).maybeSingle().then(async ({ data }) => {
      if (cancelled) return
      setListing(data ?? null)
      if (data) {
        const { data: convos } = await supabase.from('conversations').select('id').eq('listing_id', data.id)
        const { count: favs } = await supabase.from('favorites').select('*', { count: 'exact', head: true }).eq('listing_id', data.id)
        setFavCount(favs || 0)
        const convoIds = (convos || []).map(c => c.id)
        if (convoIds.length > 0) {
          const { count: msgs } = await supabase.from('messages').select('*', { count: 'exact', head: true }).in('conversation_id', convoIds)
          if (!cancelled) setMsgCount(msgs || 0)
        }
      }
    })
    return () => { cancelled = true }
  }, [adId])

  // After returning from Stripe, poll briefly for the webhook to have
  // applied the boost (it's usually near-instant, but never guaranteed to
  // beat the browser redirect) rather than trusting the redirect alone.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (!params.get('session_id')) return
    setHasSessionId(true)
    setConfirming(true)
    let attempts = 0
    const poll = setInterval(async () => {
      attempts++
      const { data } = await supabase.from('listings').select('*').eq('id', adId).single()
      if (data?.boosted) {
        setListing(data)
        setConfirming(false)
        clearInterval(poll)
      } else if (attempts >= 10) {
        setConfirming(false)
        clearInterval(poll)
      }
    }, 1500)
    return () => clearInterval(poll)
  }, [adId])

  const startCheckout = async (planKey: BoostPlanKey) => {
    setError(null)
    setRedirecting(true)
    try {
      const res = await fetch('/api/stripe/checkout-boost', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ listingId: adId, planKey, locale }),
      })
      const json = await res.json()
      if (!res.ok || !json.url) {
        setError(json.error || 'Could not start checkout')
        setRedirecting(false)
        return
      }
      window.location.href = json.url
    } catch {
      setError('Could not reach the payment server. Please try again.')
      setRedirecting(false)
    }
  }

  if (listing === undefined) {
    return <div style={{ background: SURFACE, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FONT }}>
      <p style={{ fontSize: '13px', fontWeight: 700, color: MUTED }}>Loading…</p>
    </div>
  }
  if (listing === null) {
    return <div style={{ background: SURFACE, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FONT, flexDirection: 'column', gap: '12px' }}>
      <p style={{ fontSize: '16px', fontWeight: 900, color: INK }}>Listing not found</p>
      <Link href={`/${locale}`} style={{ fontSize: '13px', fontWeight: 900, color: MINT, textDecoration: 'none' }}>Back to SouKni</Link>
    </div>
  }
  if (user && user.id !== listing.seller_id) {
    return <div style={{ background: SURFACE, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FONT, flexDirection: 'column', gap: '12px', textAlign: 'center', padding: '24px' }}>
      <p style={{ fontSize: '16px', fontWeight: 900, color: INK }}>You can only boost your own listings</p>
      <Link href={`/${locale}/listing/${adId}`} style={{ fontSize: '13px', fontWeight: 900, color: MINT, textDecoration: 'none' }}>Back to Listing</Link>
    </div>
  }

  const isCurrentlyBoosted = listing.boosted && listing.boosted_until && new Date(listing.boosted_until) > new Date()

  // Just returned from a successful Stripe payment and the webhook has
  // confirmed it in the database.
  if (!confirming && hasSessionId && isCurrentlyBoosted) {
    const tier = listing.boost_tier as BoostPlanKey | null
    const style = tier ? PLAN_STYLE[tier] : null
    const plan = tier ? BOOST_PLANS[tier] : null
    return (
      <div style={{ background: SURFACE, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 24px', fontFamily: FONT }}>
        <div style={{ maxWidth: '480px', width: '100%', textAlign: 'center' }}>
          <div style={{ width: '96px', height: '96px', borderRadius: '28px', background: style?.gradient || MINT, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', boxShadow: '0 16px 48px rgba(0,0,0,0.2)' }}>
            <span style={{ fontSize: '44px' }}>{style?.emoji || '⚡'}</span>
          </div>
          <h1 style={{ fontSize: '28px', fontWeight: 900, color: INK, letterSpacing: '-0.05em', marginBottom: '8px' }}>Your ad is now Boosted! 🎉</h1>
          <p style={{ fontSize: '14px', color: MUTED, fontWeight: 700, lineHeight: 1.7, marginBottom: '28px' }}>
            <strong style={{ color: INK }}>{plan?.name}</strong> is live until{' '}
            <strong style={{ color: INK }}>{new Date(listing.boosted_until!).toLocaleDateString()}</strong>.
          </p>
          <div style={{ display: 'flex', gap: '10px' }}>
            <Link href={`/${locale}/account/my-ads`} style={{ flex: 1, padding: '13px', borderRadius: '12px', border: '1.5px solid #e2eae6', color: INK, textDecoration: 'none', fontSize: '14px', fontWeight: 900, textAlign: 'center' }}>My Ads</Link>
            <Link href={`/${locale}/listing/${adId}`} style={{ flex: 1, padding: '13px', borderRadius: '12px', background: MINT, color: 'white', textDecoration: 'none', fontSize: '14px', fontWeight: 900, textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
              <Eye size={15} /> View Listing
            </Link>
          </div>
        </div>
      </div>
    )
  }

  if (confirming) {
    return <div style={{ background: SURFACE, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FONT, flexDirection: 'column', gap: '12px' }}>
      <div style={{ width: '32px', height: '32px', borderRadius: '50%', border: '3px solid #e2eae6', borderTopColor: MINT, animation: 'spin 0.8s linear infinite' }} />
      <p style={{ fontSize: '13px', fontWeight: 700, color: MUTED }}>Confirming your payment…</p>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  }

  const image = listing.images?.[0] || ''
  const price = `${Math.round(listing.price / 100).toLocaleString()} ${listing.currency}`
  const daysListed = Math.max(0, Math.floor((Date.now() - new Date(listing.created_at).getTime()) / 86400000))

  return (
    <div style={{ background: SURFACE, minHeight: '100vh', fontFamily: FONT }}>
      <div style={{ maxWidth: '760px', margin: '0 auto', padding: '32px 24px 80px' }}>

        <nav style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '24px' }}>
          <Link href={`/${locale}/account/my-ads`} style={{ fontSize: '13px', color: MUTED, textDecoration: 'none', fontWeight: 700 }}>My Ads</Link>
          <ChevronRight size={13} color={MUTED} />
          <span style={{ fontSize: '13px', fontWeight: 900, color: INK }}>Boost Ad</span>
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '28px' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'linear-gradient(135deg, #f59e0b, #ea580c)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Zap size={22} color="white" />
          </div>
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: 900, color: INK, letterSpacing: '-0.05em', marginBottom: '2px' }}>Boost Your Ad</h1>
            <p style={{ fontSize: '13px', color: MUTED, fontWeight: 700 }}>Get more views, more messages, sell faster</p>
          </div>
        </div>

        {isCurrentlyBoosted && (
          <div style={{ padding: '14px 20px', background: '#f0fdf9', border: `1.5px solid ${MINT}`, borderRadius: '16px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Zap size={16} color={MINT} />
            <p style={{ fontSize: '13px', fontWeight: 700, color: '#0f9b8e' }}>
              This ad is already boosted ({listing.boost_tier}) until {new Date(listing.boosted_until!).toLocaleDateString()}. You can still purchase another boost to extend it.
            </p>
          </div>
        )}

        {/* Ad being boosted */}
        <div style={{ display: 'flex', gap: '14px', padding: '16px', background: 'white', borderRadius: '18px', border: '1px solid #e2eae6', marginBottom: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
          {image && <img src={image} alt="" style={{ width: '72px', height: '72px', borderRadius: '12px', objectFit: 'cover', flexShrink: 0 }} />}
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ fontSize: '12px', color: MUTED, fontWeight: 700, marginBottom: '2px' }}>{categoryLabel(listing.category_slug)}{listing.city ? ` · ${listing.city}` : ''} · Listed {daysListed}d ago</p>
            <p style={{ fontSize: '14px', fontWeight: 900, color: INK, marginBottom: '4px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{listing.title}</p>
            <p style={{ fontSize: '16px', fontWeight: 900, color: MINT }}>{price}</p>
          </div>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexShrink: 0 }}>
            {[
              { icon: <Eye size={13} color={MUTED} />, value: listing.views || 0 },
              { icon: <Heart size={13} color={MUTED} />, value: favCount },
              { icon: <MessageCircle size={13} color={MUTED} />, value: msgCount },
            ].map((s, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2px' }}>{s.icon}</div>
                <p style={{ fontSize: '12px', fontWeight: 900, color: INK }}>{s.value}</p>
              </div>
            ))}
          </div>
        </div>

        {error && (
          <div style={{ padding: '14px 18px', background: '#fee2e2', border: '1px solid #fecaca', borderRadius: '14px', marginBottom: '20px' }}>
            <p style={{ fontSize: '13px', color: '#dc2626', fontWeight: 700 }}>{error}</p>
          </div>
        )}

        {/* Plans */}
        <div style={{ background: 'white', borderRadius: '24px', padding: '32px', border: '1px solid #e2eae6', boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 900, color: INK, letterSpacing: '-0.05em', marginBottom: '6px' }}>Choose a Boost Plan</h2>
          <p style={{ fontSize: '13px', color: MUTED, fontWeight: 700, marginBottom: '24px' }}>Real payment via Stripe Checkout — your boost activates as soon as it's confirmed.</p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '20px' }}>
            {(Object.keys(BOOST_PLANS) as BoostPlanKey[]).map(key => {
              const plan = BOOST_PLANS[key]
              const style = PLAN_STYLE[key]
              const isSelected = selectedPlan === key
              return (
                <button key={key} onClick={() => setSelectedPlan(key)}
                  style={{ display: 'flex', gap: '16px', padding: '20px', borderRadius: '18px', border: `2px solid ${isSelected ? style.color : style.popular ? `${style.color}40` : '#e2eae6'}`, background: isSelected ? style.bg : style.popular ? `${style.bg}60` : 'white', cursor: 'pointer', fontFamily: FONT, textAlign: 'left', transition: 'all 0.2s', position: 'relative' }}>
                  {style.popular && (
                    <div style={{ position: 'absolute', top: '12px', right: '-8px', background: style.gradient, color: 'white', fontSize: '9px', fontWeight: 900, padding: '4px 20px 4px 12px', borderRadius: '100px', textTransform: 'uppercase' }}>Most Popular</div>
                  )}
                  <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: style.gradient, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <span style={{ fontSize: '24px' }}>{style.emoji}</span>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                      <p style={{ fontSize: '16px', fontWeight: 900, color: INK }}>{plan.name}</p>
                      <span style={{ fontSize: '11px', fontWeight: 900, padding: '2px 8px', borderRadius: '100px', background: style.bg, color: style.color }}>{style.multiplier}× views · {plan.durationDays}d</span>
                    </div>
                    <p style={{ fontSize: '12px', color: MUTED, fontWeight: 700 }}>Top of {categoryLabel(listing.category_slug)} for {plan.durationDays} days</p>
                  </div>
                  <div style={{ textAlign: 'right', flexShrink: 0 }}>
                    <p style={{ fontSize: '24px', fontWeight: 900, color: style.color, letterSpacing: '-0.03em' }}>{plan.price}</p>
                    <p style={{ fontSize: '11px', color: MUTED, fontWeight: 700 }}>MAD</p>
                  </div>
                  {isSelected && <div style={{ position: 'absolute', top: '14px', left: '14px', width: '20px', height: '20px', borderRadius: '50%', background: style.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Check size={12} color="white" strokeWidth={3} /></div>}
                </button>
              )
            })}
          </div>

          {selectedPlan && (
            <div style={{ background: SURFACE, borderRadius: '16px', padding: '18px', border: '1px solid #e2eae6', marginBottom: '20px' }}>
              <p style={{ fontSize: '12px', fontWeight: 900, color: MUTED, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '12px' }}>📊 Projected Impact (based on real current stats)</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
                {[
                  { label: 'Views', current: listing.views || 0, icon: <Eye size={14} color={MINT} /> },
                  { label: 'Saves', current: favCount, icon: <Heart size={14} color="#ef4444" /> },
                  { label: 'Messages', current: msgCount, icon: <MessageCircle size={14} color="#8b5cf6" /> },
                ].map(m => (
                  <div key={m.label} style={{ background: 'white', borderRadius: '12px', padding: '14px', textAlign: 'center', border: '1px solid #e2eae6' }}>
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '6px' }}>{m.icon}</div>
                    <p style={{ fontSize: '11px', color: MUTED, fontWeight: 700, marginBottom: '4px' }}>{m.label}</p>
                    <p style={{ fontSize: '11px', color: MUTED, fontWeight: 700 }}>{m.current} → <strong style={{ color: INK, fontSize: '14px' }}>{Math.round(m.current * PLAN_STYLE[selectedPlan].multiplier)}+</strong></p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', padding: '10px 14px', background: '#f0fdf9', borderRadius: '10px', border: `1px solid ${MINT}` }}>
            <Shield size={14} color={MINT} />
            <p style={{ fontSize: '11px', color: '#0f9b8e', fontWeight: 700 }}>Secure checkout by Stripe — card details never touch our servers</p>
          </div>

          <button onClick={() => selectedPlan && startCheckout(selectedPlan)} disabled={!selectedPlan || redirecting}
            style={{ width: '100%', padding: '15px', borderRadius: '14px', background: selectedPlan ? (PLAN_STYLE[selectedPlan].gradient) : '#e2eae6', color: selectedPlan ? 'white' : MUTED, border: 'none', fontSize: '15px', fontWeight: 900, cursor: selectedPlan && !redirecting ? 'pointer' : 'not-allowed', fontFamily: FONT, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            {redirecting ? 'Redirecting to Stripe…' : selectedPlan ? <><Zap size={16} /> Pay {BOOST_PLANS[selectedPlan].price} MAD & Boost Now</> : 'Select a plan'}
          </button>
        </div>

        {/* Trust indicators */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginTop: '20px' }}>
          {[
            { icon: <Zap size={16} color="#f59e0b" />, label: 'Fast Activation', desc: 'Live once payment confirms' },
            { icon: <BarChart3 size={16} color={MINT} />, label: 'Real Listing Stats', desc: 'Based on your actual data' },
            { icon: <Shield size={16} color="#8b5cf6" />, label: 'Secure Payment', desc: 'Processed by Stripe' },
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
