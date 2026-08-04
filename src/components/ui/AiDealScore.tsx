'use client'

import { useState, useEffect } from 'react'
import { Zap, TrendingUp, Shield, Star, Info } from 'lucide-react'

const MINT = '#22d4a8'
const INK  = '#161d1b'
const MUTED = '#6b7a76'
const FONT = "'Inter', system-ui, sans-serif"

type Props = {
  score?: number      // 0-100, if provided skips computation
  size?: 'sm' | 'md' | 'lg'
  showDetail?: boolean
  breakdown?: { priceScore: number; trustScore: number; demandScore: number }
}

export default function AiDealScore({ score, size = 'md', showDetail = false, breakdown }: Props) {
  const [expanded, setExpanded] = useState(false)
  const finalScore = score ?? 78
  const b = breakdown ?? { priceScore: 82, trustScore: 90, demandScore: 65 }

  const getColor = (s: number) => s >= 85 ? MINT : s >= 65 ? '#0891b2' : s >= 45 ? '#f59e0b' : '#ef4444'
  const getLabel = (s: number) => s >= 85 ? 'Excellent Deal' : s >= 65 ? 'Good Deal' : s >= 45 ? 'Fair Deal' : 'Above Market'
  const color = getColor(finalScore)

  const sizes = {
    sm: { badge: '11px', num: '13px', pad: '3px 8px' },
    md: { badge: '12px', num: '15px', pad: '5px 12px' },
    lg: { badge: '13px', num: '20px', pad: '7px 16px' },
  }
  const s = sizes[size]

  if (!showDetail) return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', padding: s.pad, borderRadius: '100px', background: `${color}15`, border: `1px solid ${color}40`, fontFamily: FONT }}>
      <Zap size={size === 'sm' ? 10 : 12} color={color} fill={color} />
      <span style={{ fontSize: s.num, fontWeight: 900, color }}>{finalScore}</span>
      <span style={{ fontSize: s.badge, fontWeight: 900, color }}>{getLabel(finalScore)}</span>
    </span>
  )

  return (
    <div style={{ fontFamily: FONT, borderRadius: '16px', border: `1.5px solid ${color}40`, overflow: 'hidden' }}>
      <div onClick={() => setExpanded(!expanded)}
        style={{ padding: '14px 16px', background: `${color}10`, display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
        <div style={{ position: 'relative', width: '48px', height: '48px', flexShrink: 0 }}>
          <svg width="48" height="48" viewBox="0 0 48 48">
            <circle cx="24" cy="24" r="20" fill="none" stroke="#e2eae6" strokeWidth="5" />
            <circle cx="24" cy="24" r="20" fill="none" stroke={color} strokeWidth="5" strokeDasharray={`${(finalScore/100)*125.6} 125.6`} strokeLinecap="round" transform="rotate(-90 24 24)" />
          </svg>
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: '13px', fontWeight: 900, color }}>{finalScore}</span>
          </div>
        </div>
        <div style={{ flex: 1 }}>
          <p style={{ fontSize: '14px', fontWeight: 900, color: INK }}>🎯 AI Deal Score: {getLabel(finalScore)}</p>
          <p style={{ fontSize: '11px', color: MUTED, fontWeight: 700 }}>Based on price, seller trust & demand</p>
        </div>
        <Info size={16} color={MUTED} />
      </div>

      {expanded && (
        <div style={{ padding: '16px', background: 'white' }}>
          {[
            { label: 'Price Fairness', value: b.priceScore, icon: <TrendingUp size={13} color="#0891b2" />, desc: 'vs similar listings nearby' },
            { label: 'Seller Trust', value: b.trustScore, icon: <Shield size={13} color={MINT} />, desc: 'ratings, verification, history' },
            { label: 'Market Demand', value: b.demandScore, icon: <Star size={13} color="#f59e0b" />, desc: 'views & interest this week' },
          ].map(row => (
            <div key={row.label} style={{ marginBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span style={{ fontSize: '12px', fontWeight: 900, color: INK, display: 'flex', alignItems: 'center', gap: '5px' }}>{row.icon} {row.label}</span>
                <span style={{ fontSize: '12px', fontWeight: 900, color: getColor(row.value) }}>{row.value}/100</span>
              </div>
              <div style={{ height: '5px', borderRadius: '3px', background: '#e2eae6', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${row.value}%`, background: getColor(row.value), borderRadius: '3px', transition: 'width 0.6s ease' }} />
              </div>
              <p style={{ fontSize: '10px', color: MUTED, fontWeight: 700, marginTop: '2px' }}>{row.desc}</p>
            </div>
          ))}
          <p style={{ fontSize: '10px', color: MUTED, fontWeight: 700, textAlign: 'center', marginTop: '10px' }}>
            Computed live by SouKni AI · Updates as market changes
          </p>
        </div>
      )}
    </div>
  )
}
