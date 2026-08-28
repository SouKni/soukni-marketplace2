'use client'

import { useState, use, useEffect } from 'react'
import Link from 'next/link'
import { ChevronRight, TrendingUp, TrendingDown, Zap, Clock, Sparkles, ArrowRight } from 'lucide-react'

type Locale = 'en' | 'fr' | 'ar' | 'es' | 'de'

const MINT = '#22d4a8'
const INK  = '#161d1b'
const MUTED = '#6b7a76'
const SURFACE = '#f4fbf8'
const FONT = "'Inter', system-ui, sans-serif"

type OracleResponse = {
  listing: { id: string; title: string; price: number; currency: string; category_slug: string | null; condition: string | null; city: string | null; image: string | null }
  comparableCount: number
  verdict: {
    recommendation: 'buy_now' | 'wait' | 'fair'
    verdict: string
    reasoning: string
    confidence: number
    suggestedMin: number | null
    suggestedMax: number | null
    source: 'ai' | 'fallback'
  }
}

function categoryLabel(slug: string | null) {
  if (!slug) return 'Listing'
  return slug.split('-').map(w => w[0]?.toUpperCase() + w.slice(1)).join(' ')
}

export default function PriceOraclePage({ params }: { params: Promise<{ locale: Locale; listingId: string }> }) {
  const { locale, listingId } = use(params)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)
  const [data, setData] = useState<OracleResponse | null>(null)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    fetch('/api/price-oracle', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ listingId }) })
      .then(async r => {
        if (r.status === 404) { if (!cancelled) setNotFound(true); return null }
        return r.json()
      })
      .then(json => { if (!cancelled && json) setData(json) })
      .catch(() => { if (!cancelled) setNotFound(true) })
      .finally(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  }, [listingId])

  if (notFound) {
    return (
      <div style={{ background: SURFACE, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FONT, flexDirection: 'column', gap: '12px', padding: '24px', textAlign: 'center' }}>
        <p style={{ fontSize: '16px', fontWeight: 900, color: INK }}>Listing not found</p>
        <Link href={`/${locale}`} style={{ fontSize: '13px', fontWeight: 900, color: MINT, textDecoration: 'none' }}>Back to SouKni</Link>
      </div>
    )
  }

  const { listing, verdict, comparableCount } = data || {}

  return (
    <div style={{ background: SURFACE, minHeight: '100vh', fontFamily: FONT }}>
      <div style={{ maxWidth: '720px', margin: '0 auto', padding: '32px 24px 80px' }}>

        <nav style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '20px' }}>
          <Link href={`/${locale}/listing/${listingId}`} style={{ fontSize: '13px', color: MUTED, textDecoration: 'none', fontWeight: 700 }}>Listing</Link>
          <ChevronRight size={13} color={MUTED} />
          <span style={{ fontSize: '13px', fontWeight: 900, color: INK }}>AI Price Oracle</span>
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: `linear-gradient(135deg, #7c3aed, #6d28d9)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Sparkles size={22} color="white" />
          </div>
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: 900, color: INK, letterSpacing: '-0.05em' }}>AI Price Oracle</h1>
            <p style={{ fontSize: '13px', color: MUTED, fontWeight: 700 }}>Is this listing priced fairly against the real market right now?</p>
          </div>
        </div>

        {/* Item */}
        {listing && (
          <div style={{ display: 'flex', gap: '14px', padding: '16px', background: 'white', borderRadius: '18px', border: '1px solid #e2eae6', marginBottom: '20px' }}>
            {listing.image && <img src={listing.image} alt="" style={{ width: '64px', height: '64px', borderRadius: '12px', objectFit: 'cover', flexShrink: 0 }} />}
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: '12px', color: MUTED, fontWeight: 700, marginBottom: '2px' }}>
                {categoryLabel(listing.category_slug)}{listing.city ? ` · ${listing.city}` : ''}{listing.condition ? ` · ${listing.condition.replace('_', ' ')}` : ''}
              </p>
              <p style={{ fontSize: '14px', fontWeight: 900, color: INK, marginBottom: '2px' }}>{listing.title}</p>
              <p style={{ fontSize: '18px', fontWeight: 900, color: MINT }}>{listing.price.toLocaleString()} {listing.currency}</p>
            </div>
          </div>
        )}

        {/* Recommendation */}
        {loading ? (
          <div style={{ padding: '40px', background: 'white', borderRadius: '20px', border: '1px solid #e2eae6', textAlign: 'center', marginBottom: '20px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', border: `3px solid #e2eae6`, borderTopColor: '#7c3aed', margin: '0 auto 12px', animation: 'spin 0.8s linear infinite' }} />
            <p style={{ fontSize: '13px', fontWeight: 700, color: MUTED }}>Comparing against real listings in this category…</p>
          </div>
        ) : verdict && (
          <div style={{ padding: '20px 24px', borderRadius: '20px', background: verdict.recommendation === 'wait' ? '#fff4e0' : verdict.recommendation === 'buy_now' ? '#f0fdf9' : SURFACE, border: `1.5px solid ${verdict.recommendation === 'wait' ? '#f59e0b' : verdict.recommendation === 'buy_now' ? MINT : '#e2eae6'}`, marginBottom: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
              <span style={{ fontSize: '28px' }}>{verdict.recommendation === 'wait' ? '⏳' : verdict.recommendation === 'buy_now' ? '🎯' : '⚖️'}</span>
              <div>
                <p style={{ fontSize: '17px', fontWeight: 900, color: verdict.recommendation === 'wait' ? '#b45309' : verdict.recommendation === 'buy_now' ? '#0f9b8e' : INK, letterSpacing: '-0.03em' }}>
                  {verdict.verdict}
                </p>
                <p style={{ fontSize: '11px', color: MUTED, fontWeight: 700 }}>
                  {verdict.source === 'ai' ? 'AI' : 'Market'} confidence: {verdict.confidence}% · based on {comparableCount} comparable listing{comparableCount === 1 ? '' : 's'}
                </p>
              </div>
            </div>
            <p style={{ fontSize: '14px', color: INK, fontWeight: 700, lineHeight: 1.6 }}>{verdict.reasoning}</p>
          </div>
        )}

        {/* Comparable range — real, from actual active listings in the same
            category. No fabricated price-history chart: this app doesn't
            track price changes over time, only the current listed price. */}
        {!loading && verdict && verdict.suggestedMin != null && verdict.suggestedMax != null && (
          <div style={{ background: 'white', borderRadius: '20px', padding: '24px', border: '1px solid #e2eae6', marginBottom: '20px' }}>
            <h3 style={{ fontSize: '15px', fontWeight: 900, color: INK, letterSpacing: '-0.03em', marginBottom: '16px' }}>Comparable Listings Right Now</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: '11px', color: MUTED, fontWeight: 700, marginBottom: '4px' }}>Market range ({comparableCount} listings)</p>
                <p style={{ fontSize: '20px', fontWeight: 900, color: INK, letterSpacing: '-0.03em' }}>
                  {verdict.suggestedMin.toLocaleString()} – {verdict.suggestedMax.toLocaleString()} {listing?.currency}
                </p>
              </div>
              <div style={{ width: '2px', height: '36px', background: '#e2eae6' }} />
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: '11px', color: MUTED, fontWeight: 700, marginBottom: '4px' }}>This listing</p>
                <p style={{ fontSize: '20px', fontWeight: 900, color: MINT, letterSpacing: '-0.03em' }}>
                  {listing?.price.toLocaleString()} {listing?.currency}
                </p>
              </div>
            </div>
          </div>
        )}

        <Link href={`/${locale}/listing/${listingId}`}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '14px', borderRadius: '14px', background: MINT, color: 'white', textDecoration: 'none', fontSize: '14px', fontWeight: 900 }}>
          Back to Listing <ArrowRight size={16} />
        </Link>

        <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      </div>
    </div>
  )
}
