'use client'

import { useState, useEffect } from 'react'
import { Shield, AlertTriangle, Check, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react'

const MINT = '#22d4a8'
const FONT = "'Inter', system-ui, sans-serif"

type RiskLevel = 'safe' | 'low' | 'medium' | 'high' | 'critical'

type ScamResult = {
  risk:       RiskLevel
  score:      number   // 0-100
  flags:      string[]
  tips:       string[]
  verdict:    string
  confidence: number
}

type Props = {
  listing: {
    title:       string
    description: string
    price:       number
    city:        string
    category:    string
    seller?:     { rating?: number; reviews?: number; memberSince?: string }
  }
  locale: string
}

const RISK_CONFIG: Record<RiskLevel, { label: string; color: string; bg: string; icon: string }> = {
  safe:     { label: 'Safe to proceed',    color: '#0f9b8e', bg: '#f0fdf9', icon: '✅' },
  low:      { label: 'Low risk',           color: '#22d4a8', bg: '#f0fdf9', icon: '🟢' },
  medium:   { label: 'Proceed with care', color: '#b45309', bg: '#fff4e0', icon: '🟡' },
  high:     { label: 'High risk — be careful', color: '#dc2626', bg: '#fff5f5', icon: '🔴' },
  critical: { label: 'Likely scam — avoid', color: '#7f1d1d', bg: '#fef2f2', icon: '🚨' },
}

export default function ScamDetector({ listing, locale }: Props) {
  const [result, setResult]   = useState<ScamResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const [ran, setRan]         = useState(false)

  // Auto-run on mount
  useEffect(() => {
    if (!ran) { analyze(); setRan(true) }
  }, [])

  const analyze = async () => {
    setLoading(true)
    try {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-6',
          max_tokens: 800,
          messages: [{
            role: 'user',
            content: `You are SouKni's AI anti-scam system for a Moroccan marketplace. Analyze this listing for fraud signals.

Listing:
- Title: "${listing.title}"
- Description: "${listing.description?.slice(0, 500) || 'No description'}"
- Price: ${listing.price} MAD
- City: ${listing.city}
- Category: ${listing.category}
- Seller rating: ${listing.seller?.rating || 'unknown'} (${listing.seller?.reviews || 0} reviews)
- Member since: ${listing.seller?.memberSince || 'unknown'}

Common Moroccan marketplace scams:
- Prices WAY below market (phone for 500 MAD, car for 5000 MAD)
- Asking for advance payment / deposit via virement
- Seller outside Morocco asking to ship
- Too good to be true luxury items
- New account with no reviews selling expensive items
- Description copied from official brand website
- Pressure to decide quickly
- Request to communicate outside platform

Respond ONLY with valid JSON:
{
  "risk": "safe|low|medium|high|critical",
  "score": <0-100 risk score>,
  "flags": ["<specific red flag if any>"],
  "tips": ["<safety tip>", "<safety tip>"],
  "verdict": "<one clear sentence verdict>",
  "confidence": <50-99>
}`
          }]
        })
      })
      const data = await res.json()
      const text = data.content?.[0]?.text || '{}'
      const parsed = JSON.parse(text.replace(/```json|```/g, '').trim())
      setResult(parsed)
    } catch {
      setResult({
        risk: 'low', score: 15,
        flags: [],
        tips: ['Always meet in a public place', 'Never pay before seeing the item'],
        verdict: 'Could not fully analyse — use standard safety precautions.',
        confidence: 50,
      })
    }
    setLoading(false)
  }

  if (loading) return (
    <div style={{ padding: '14px 16px', background: '#f4fbf8', borderRadius: '14px', border: '1px solid #e2eae6', display: 'flex', alignItems: 'center', gap: '10px', fontFamily: FONT }}>
      <div style={{ width: '20px', height: '20px', borderRadius: '50%', border: `2px solid #e2eae6`, borderTopColor: MINT, animation: 'spin 0.8s linear infinite', flexShrink: 0 }} />
      <p style={{ fontSize: '12px', fontWeight: 700, color: '#6b7a76' }}>AI scanning for scam signals...</p>
      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
    </div>
  )

  if (!result) return null

  const config = RISK_CONFIG[result.risk]

  return (
    <div style={{ borderRadius: '16px', border: `1.5px solid ${result.risk === 'safe' || result.risk === 'low' ? MINT : result.risk === 'medium' ? '#fde68a' : '#fecaca'}`, overflow: 'hidden', fontFamily: FONT }}>

      {/* Header */}
      <div style={{ background: config.bg, padding: '14px 16px', display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }} onClick={() => setExpanded(!expanded)}>
        <Shield size={18} color={config.color} style={{ flexShrink: 0 }} />
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
            <p style={{ fontSize: '13px', fontWeight: 900, color: config.color }}>{config.icon} {config.label}</p>
            <span style={{ fontSize: '10px', fontWeight: 900, padding: '2px 7px', borderRadius: '100px', background: 'white', color: config.color, border: `1px solid ${config.color}30` }}>
              AI Score: {result.score}/100
            </span>
          </div>
          <p style={{ fontSize: '12px', color: '#6b7a76', fontWeight: 700 }}>{result.verdict}</p>
        </div>
        {expanded ? <ChevronUp size={16} color={config.color} /> : <ChevronDown size={16} color={config.color} />}
      </div>

      {/* Expanded details */}
      {expanded && (
        <div style={{ padding: '16px', background: 'white', borderTop: `1px solid ${config.color}20` }}>

          {/* Risk bar */}
          <div style={{ marginBottom: '14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
              <span style={{ fontSize: '11px', fontWeight: 900, color: '#6b7a76', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Risk Level</span>
              <span style={{ fontSize: '11px', fontWeight: 900, color: config.color }}>{result.score}%</span>
            </div>
            <div style={{ height: '6px', borderRadius: '3px', background: '#e2eae6', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${result.score}%`, borderRadius: '3px', background: result.score < 30 ? MINT : result.score < 60 ? '#f59e0b' : '#ef4444', transition: 'width 0.6s ease' }} />
            </div>
          </div>

          {/* Red flags */}
          {result.flags.length > 0 && (
            <div style={{ marginBottom: '12px' }}>
              <p style={{ fontSize: '11px', fontWeight: 900, color: '#dc2626', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '6px' }}>⚠ Red Flags Detected</p>
              {result.flags.map((flag, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', marginBottom: '5px' }}>
                  <AlertTriangle size={12} color="#dc2626" style={{ flexShrink: 0, marginTop: '1px' }} />
                  <p style={{ fontSize: '12px', color: '#7f1d1d', fontWeight: 700, lineHeight: 1.4 }}>{flag}</p>
                </div>
              ))}
            </div>
          )}

          {/* No flags */}
          {result.flags.length === 0 && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', padding: '10px 12px', background: '#f0fdf9', borderRadius: '10px' }}>
              <Check size={14} color={MINT} />
              <p style={{ fontSize: '12px', color: '#0f9b8e', fontWeight: 700 }}>No red flags detected in this listing</p>
            </div>
          )}

          {/* Safety tips */}
          <div>
            <p style={{ fontSize: '11px', fontWeight: 900, color: '#6b7a76', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '6px' }}>Safety Tips</p>
            {result.tips.map((tip, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', marginBottom: '5px' }}>
                <Check size={12} color={MINT} style={{ flexShrink: 0, marginTop: '1px' }} />
                <p style={{ fontSize: '12px', color: '#3c4a46', fontWeight: 700, lineHeight: 1.4 }}>{tip}</p>
              </div>
            ))}
          </div>

          {/* Confidence */}
          <div style={{ marginTop: '12px', paddingTop: '12px', borderTop: '1px solid #f4fbf8', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <p style={{ fontSize: '10px', color: '#6b7a76', fontWeight: 700 }}>AI confidence: {result.confidence}%</p>
            <button onClick={analyze}
              style={{ fontSize: '11px', fontWeight: 900, color: MINT, background: 'none', border: 'none', cursor: 'pointer', fontFamily: FONT }}>
              Re-analyze
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
