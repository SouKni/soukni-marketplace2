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

const MOCK_ITEM = {
  title: 'iPhone 15 Pro Max 256GB', currentPrice: 12500, image: 'https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&w=400',
  category: 'Electronics', city: 'Rabat'
}

const HISTORICAL = [
  { month: 'Feb', price: 14200 }, { month: 'Mar', price: 13800 }, { month: 'Apr', price: 13500 },
  { month: 'May', price: 13100 }, { month: 'Jun', price: 12800 }, { month: 'Jul', price: 12500 },
]
const FORECAST = [
  { month: 'Aug', price: 12100, confidence: 82 }, { month: 'Sep', price: 11700, confidence: 74 },
  { month: 'Oct', price: 11400, confidence: 63 },
]

export default function PriceOraclePage({ params }: { params: Promise<{ locale: Locale; listingId: string }> }) {
  const { locale, listingId } = use(params)
  const [loading, setLoading]   = useState(true)
  const [analysis, setAnalysis] = useState<{ verdict: string; recommendation: 'buy_now' | 'wait'; reasoning: string; confidence: number } | null>(null)

  useEffect(() => {
    fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 400,
        messages: [{
          role: 'user',
          content: `You are a marketplace pricing forecaster for Morocco. Product: "${MOCK_ITEM.title}", current price ${MOCK_ITEM.currentPrice} MAD.
Historical prices (last 6 months, declining trend): ${HISTORICAL.map(h => h.price).join(', ')} MAD.
This typically happens with electronics as newer models release.

Respond ONLY with JSON: {"verdict":"<one sentence>","recommendation":"buy_now|wait","reasoning":"<2 sentences explaining why>","confidence":<60-95>}`
        }]
      })
    }).then(r => r.json()).then(data => {
      try {
        const text = data.content?.[0]?.text || '{}'
        setAnalysis(JSON.parse(text.replace(/```json|```/g, '').trim()))
      } catch {
        setAnalysis({ verdict: 'Prices trending down — waiting may save money', recommendation: 'wait', reasoning: 'This item has dropped consistently over 6 months as newer models release. Expect further decreases.', confidence: 78 })
      }
      setLoading(false)
    }).catch(() => {
      setAnalysis({ verdict: 'Prices trending down — waiting may save money', recommendation: 'wait', reasoning: 'This item has dropped consistently over 6 months.', confidence: 78 })
      setLoading(false)
    })
  }, [])

  const allData = [...HISTORICAL, ...FORECAST]
  const maxP = Math.max(...allData.map(d => d.price))
  const minP = Math.min(...allData.map(d => d.price)) - 500
  const range = maxP - minP
  const w = 600, h = 220, pad = 30
  const toX = (i: number) => pad + (i / (allData.length - 1)) * (w - pad * 2)
  const toY = (p: number) => h - pad - ((p - minP) / range) * (h - pad * 2)

  const histPath = HISTORICAL.map((d, i) => `${i === 0 ? 'M' : 'L'} ${toX(i)} ${toY(d.price)}`).join(' ')
  const forecastPath = [HISTORICAL[HISTORICAL.length-1], ...FORECAST].map((d, i) =>
    `${i === 0 ? 'M' : 'L'} ${toX(HISTORICAL.length - 1 + i)} ${toY(d.price)}`
  ).join(' ')

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
            <p style={{ fontSize: '13px', color: MUTED, fontWeight: 700 }}>Should you buy now or wait for a better price?</p>
          </div>
        </div>

        {/* Item */}
        <div style={{ display: 'flex', gap: '14px', padding: '16px', background: 'white', borderRadius: '18px', border: '1px solid #e2eae6', marginBottom: '20px' }}>
          <img src={MOCK_ITEM.image} alt="" style={{ width: '64px', height: '64px', borderRadius: '12px', objectFit: 'cover', flexShrink: 0 }} />
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: '12px', color: MUTED, fontWeight: 700, marginBottom: '2px' }}>{MOCK_ITEM.category} · {MOCK_ITEM.city}</p>
            <p style={{ fontSize: '14px', fontWeight: 900, color: INK, marginBottom: '2px' }}>{MOCK_ITEM.title}</p>
            <p style={{ fontSize: '18px', fontWeight: 900, color: MINT }}>{MOCK_ITEM.currentPrice.toLocaleString()} MAD</p>
          </div>
        </div>

        {/* Recommendation */}
        {loading ? (
          <div style={{ padding: '40px', background: 'white', borderRadius: '20px', border: '1px solid #e2eae6', textAlign: 'center', marginBottom: '20px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', border: `3px solid #e2eae6`, borderTopColor: '#7c3aed', margin: '0 auto 12px', animation: 'spin 0.8s linear infinite' }} />
            <p style={{ fontSize: '13px', fontWeight: 700, color: MUTED }}>AI analysing 6 months of price data...</p>
          </div>
        ) : analysis && (
          <div style={{ padding: '20px 24px', borderRadius: '20px', background: analysis.recommendation === 'wait' ? '#fff4e0' : '#f0fdf9', border: `1.5px solid ${analysis.recommendation === 'wait' ? '#f59e0b' : MINT}`, marginBottom: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
              <span style={{ fontSize: '28px' }}>{analysis.recommendation === 'wait' ? '⏳' : '🎯'}</span>
              <div>
                <p style={{ fontSize: '17px', fontWeight: 900, color: analysis.recommendation === 'wait' ? '#b45309' : '#0f9b8e', letterSpacing: '-0.03em' }}>
                  {analysis.recommendation === 'wait' ? 'Wait for a better price' : 'Buy Now — Good Time!'}
                </p>
                <p style={{ fontSize: '11px', color: MUTED, fontWeight: 700 }}>AI confidence: {analysis.confidence}%</p>
              </div>
            </div>
            <p style={{ fontSize: '14px', color: INK, fontWeight: 700, lineHeight: 1.6 }}>{analysis.reasoning}</p>
          </div>
        )}

        {/* Chart */}
        <div style={{ background: 'white', borderRadius: '20px', padding: '24px', border: '1px solid #e2eae6', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '15px', fontWeight: 900, color: INK, letterSpacing: '-0.03em' }}>Price History & Forecast</h3>
            <div style={{ display: 'flex', gap: '12px' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', fontWeight: 700, color: MUTED }}>
                <div style={{ width: '12px', height: '2px', background: INK }} /> Actual
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', fontWeight: 700, color: MUTED }}>
                <div style={{ width: '12px', height: '2px', background: '#7c3aed', backgroundImage: 'repeating-linear-gradient(90deg, #7c3aed 0, #7c3aed 4px, transparent 4px, transparent 8px)' }} /> AI Forecast
              </span>
            </div>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={{ minWidth: '400px', width: '100%' }}>
              {[0, 0.25, 0.5, 0.75, 1].map(t => {
                const y = pad + t * (h - pad * 2)
                const val = Math.round(maxP - t * range)
                return (
                  <g key={t}>
                    <line x1={pad} y1={y} x2={w-pad} y2={y} stroke="#f1f5f9" strokeWidth="1" />
                    <text x={pad-6} y={y+4} textAnchor="end" fontSize="9" fill={MUTED} fontWeight="700">{(val/1000).toFixed(1)}k</text>
                  </g>
                )
              })}
              {/* Historical line */}
              <path d={histPath} fill="none" stroke={INK} strokeWidth="2.5" strokeLinecap="round" />
              {/* Forecast line dashed */}
              <path d={forecastPath} fill="none" stroke="#7c3aed" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="6,4" />
              {/* Points */}
              {HISTORICAL.map((d, i) => (
                <g key={i}>
                  <circle cx={toX(i)} cy={toY(d.price)} r="4" fill="white" stroke={INK} strokeWidth="2" />
                  <text x={toX(i)} y={h-6} textAnchor="middle" fontSize="9" fill={MUTED} fontWeight="700">{d.month}</text>
                </g>
              ))}
              {FORECAST.map((d, i) => (
                <g key={i}>
                  <circle cx={toX(HISTORICAL.length + i)} cy={toY(d.price)} r="4" fill="white" stroke="#7c3aed" strokeWidth="2" />
                  <text x={toX(HISTORICAL.length + i)} y={h-6} textAnchor="middle" fontSize="9" fill="#7c3aed" fontWeight="700">{d.month}</text>
                  <text x={toX(HISTORICAL.length + i)} y={toY(d.price)-10} textAnchor="middle" fontSize="9" fill="#7c3aed" fontWeight="900">{(d.price/1000).toFixed(1)}k</text>
                </g>
              ))}
            </svg>
          </div>
        </div>

        {/* Forecast breakdown */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginBottom: '20px' }}>
          {FORECAST.map(f => (
            <div key={f.month} style={{ padding: '14px', background: 'white', borderRadius: '14px', border: '1px solid #e2eae6', textAlign: 'center' }}>
              <p style={{ fontSize: '11px', color: MUTED, fontWeight: 700, marginBottom: '4px' }}>{f.month} 2026</p>
              <p style={{ fontSize: '16px', fontWeight: 900, color: '#7c3aed', letterSpacing: '-0.03em' }}>{f.price.toLocaleString()}</p>
              <p style={{ fontSize: '10px', color: MUTED, fontWeight: 700 }}>MAD · {f.confidence}% confidence</p>
            </div>
          ))}
        </div>

        <Link href={`/${locale}/listing/${listingId}`}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '14px', borderRadius: '14px', background: MINT, color: 'white', textDecoration: 'none', fontSize: '14px', fontWeight: 900 }}>
          Back to Listing <ArrowRight size={16} />
        </Link>

        <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      </div>
    </div>
  )
}
