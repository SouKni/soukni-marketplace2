'use client'

import { useState, use } from 'react'
import Link from 'next/link'
import { BarChart3, TrendingUp, TrendingDown, Eye, Heart, MessageCircle, ChevronRight, Calendar, MapPin, Clock, Star, Zap, Users, DollarSign, ArrowUp, ArrowDown, Package, Share2, ExternalLink, Download } from 'lucide-react'

type Locale = 'en' | 'fr' | 'ar' | 'es' | 'de'

const MINT    = '#22d4a8'
const CREAM   = '#f5ede0'
const SURFACE = '#f4fbf8'
const INK     = '#161d1b'
const MUTED   = '#6b7a76'
const FONT    = "'Inter', system-ui, sans-serif"

type Period = '7d' | '30d' | '90d'

// ── Mock data ────────────────────────────────────────────────

const DAILY_VIEWS = {
  '7d': [
    { day: 'Mon', views: 42, messages: 2, saves: 3 },
    { day: 'Tue', views: 67, messages: 4, saves: 5 },
    { day: 'Wed', views: 51, messages: 3, saves: 4 },
    { day: 'Thu', views: 89, messages: 6, saves: 7 },
    { day: 'Fri', views: 134, messages: 9, saves: 11 },
    { day: 'Sat', views: 156, messages: 12, saves: 14 },
    { day: 'Sun', views: 98, messages: 7, saves: 8 },
  ],
  '30d': [
    { day: 'W1', views: 320, messages: 18, saves: 22 },
    { day: 'W2', views: 445, messages: 26, saves: 31 },
    { day: 'W3', views: 389, messages: 22, saves: 28 },
    { day: 'W4', views: 637, messages: 41, saves: 47 },
  ],
  '90d': [
    { day: 'Jan', views: 1240, messages: 72, saves: 89 },
    { day: 'Feb', views: 1580, messages: 94, saves: 112 },
    { day: 'Mar', views: 2140, messages: 128, saves: 156 },
  ],
}

const LISTINGS = [
  { id: 1, title: 'iPhone 15 Pro Max 256GB', price: '12,500 MAD', image: 'https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&w=200', views: 847, messages: 23, saves: 31, conversionRate: 2.7, trend: 'up', trendPct: 18, status: 'active', daysListed: 2, badge: 'Diamond' },
  { id: 2, title: 'MacBook Pro 14" M3 Pro', price: '24,800 MAD', image: 'https://images.pexels.com/photos/1229861/pexels-photo-1229861.jpeg?auto=compress&w=200', views: 412, messages: 11, saves: 18, conversionRate: 2.7, trend: 'up', trendPct: 8, status: 'active', daysListed: 5, badge: 'Certified' },
  { id: 3, title: 'AirPods Pro 2nd Gen', price: '1,850 MAD', image: 'https://images.pexels.com/photos/8000631/pexels-photo-8000631.jpeg?auto=compress&w=200', views: 156, messages: 4, saves: 7, conversionRate: 2.6, trend: 'down', trendPct: 12, status: 'paused', daysListed: 7, badge: null },
  { id: 4, title: 'Samsung Galaxy Watch 6', price: '2,900 MAD', image: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&w=200', views: 689, messages: 18, saves: 24, conversionRate: 2.6, trend: 'up', trendPct: 34, status: 'sold', daysListed: 21, badge: null },
]

const TRAFFIC_SOURCES = [
  { label: 'Direct Search', pct: 42, color: MINT },
  { label: 'Category Browse', pct: 28, color: '#0891b2' },
  { label: 'Homepage Featured', pct: 16, color: '#7c3aed' },
  { label: 'WhatsApp Share', pct: 9, color: '#25D366' },
  { label: 'Other', pct: 5, color: MUTED },
]

const CITY_BREAKDOWN = [
  { city: 'Rabat', views: 312, pct: 37 },
  { city: 'Casablanca', views: 248, pct: 29 },
  { city: 'Marrakech', views: 127, pct: 15 },
  { city: 'Tangier', views: 93, pct: 11 },
  { city: 'Other', views: 67, pct: 8 },
]

const PEAK_HOURS = [
  { hour: '6am', val: 12 }, { hour: '8am', val: 34 }, { hour: '10am', val: 67 },
  { hour: '12pm', val: 89 }, { hour: '2pm', val: 78 }, { hour: '4pm', val: 92 },
  { hour: '6pm', val: 134 }, { hour: '8pm', val: 156 }, { hour: '10pm', val: 98 },
  { hour: '12am', val: 45 },
]

const TIPS = [
  { icon: '📸', title: 'Add more photos', desc: 'Listings with 5+ photos get 3× more messages. Your top ad has only 2.', action: 'Edit Ad', href: '/account/edit-ad/1', priority: 'high' },
  { icon: '🕕', title: 'Post on Friday evenings', desc: 'Your listings get 68% more views on Fri 6-9pm. Schedule updates then.', action: null, href: null, priority: 'medium' },
  { icon: '💰', title: 'Lower iPhone price slightly', desc: 'Similar iPhones sold at 11,800-12,200 MAD. A small drop could close the deal.', action: 'Adjust Price', href: '/account/edit-ad/1', priority: 'high' },
  { icon: '💎', title: 'Boost your MacBook listing', desc: "It's getting good views but few messages. A Diamond Boost could push it to top.", action: 'Boost Now', href: '/boost/2', priority: 'medium' },
]

export default function AnalyticsPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = use(params)
  const [period, setPeriod]   = useState<Period>('7d')
  const [metric, setMetric]   = useState<'views' | 'messages' | 'saves'>('views')
  const [activeTab, setActiveTab] = useState<'overview' | 'listings' | 'audience' | 'tips'>('overview')

  const data = DAILY_VIEWS[period]
  const maxVal = Math.max(...data.map(d => d[metric]))

  const totals = {
    views:    data.reduce((s, d) => s + d.views, 0),
    messages: data.reduce((s, d) => s + d.messages, 0),
    saves:    data.reduce((s, d) => s + d.saves, 0),
  }

  const peakDay  = data.reduce((a, b) => b.views > a.views ? b : a, data[0])
  const peakHour = PEAK_HOURS.reduce((a, b) => b.val > a.val ? b : a, PEAK_HOURS[0])

  // ── Shared UI ──────────────────────────────────────────────

  const StatCard = ({ label, value, sub, icon, trend, trendUp }: {
    label: string; value: string | number; sub: string
    icon: React.ReactNode; trend?: string; trendUp?: boolean
  }) => (
    <div style={{ background: 'white', borderRadius: '18px', padding: '20px', border: '1px solid #e2eae6', display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ width: '38px', height: '38px', borderRadius: '11px', background: SURFACE, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{icon}</div>
        {trend && (
          <span style={{ display: 'flex', alignItems: 'center', gap: '3px', fontSize: '12px', fontWeight: 900, color: trendUp ? '#0f9b8e' : '#ef4444' }}>
            {trendUp ? <ArrowUp size={12} /> : <ArrowDown size={12} />} {trend}
          </span>
        )}
      </div>
      <p style={{ fontSize: '26px', fontWeight: 900, color: INK, letterSpacing: '-0.05em', lineHeight: 1 }}>{value}</p>
      <div>
        <p style={{ fontSize: '13px', fontWeight: 900, color: INK, marginBottom: '2px' }}>{label}</p>
        <p style={{ fontSize: '11px', color: MUTED, fontWeight: 700 }}>{sub}</p>
      </div>
    </div>
  )

  return (
    <div style={{ background: SURFACE, minHeight: '100vh', fontFamily: FONT }}>
      <style>{`@keyframes growBar { from { height: 0 } }`}</style>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '32px 24px 80px' }}>

        {/* HEADER */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '28px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <nav style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
              <Link href={`/${locale}/account`} style={{ fontSize: '13px', color: MUTED, textDecoration: 'none', fontWeight: 700 }}>Account</Link>
              <ChevronRight size={13} color={MUTED} />
              <span style={{ fontSize: '13px', fontWeight: 900, color: INK }}>Analytics</span>
            </nav>
            <h1 style={{ fontSize: '28px', fontWeight: 900, color: INK, letterSpacing: '-0.05em', marginBottom: '4px' }}>Seller Analytics</h1>
            <p style={{ fontSize: '14px', color: MUTED, fontWeight: 700 }}>Track your listing performance and grow faster</p>
          </div>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            {/* Period selector */}
            <div style={{ display: 'flex', gap: '4px', background: 'white', padding: '4px', borderRadius: '12px', border: '1px solid #e2eae6' }}>
              {(['7d', '30d', '90d'] as Period[]).map(p => (
                <button key={p} onClick={() => setPeriod(p)}
                  style={{ padding: '7px 14px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontSize: '12px', fontWeight: 900, fontFamily: FONT, background: period === p ? INK : 'transparent', color: period === p ? 'white' : MUTED, transition: 'all 0.15s' }}>
                  {p === '7d' ? '7 days' : p === '30d' ? '30 days' : '90 days'}
                </button>
              ))}
            </div>
            <button style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '9px 16px', borderRadius: '10px', border: '1px solid #e2eae6', background: 'white', fontSize: '12px', fontWeight: 900, color: INK, cursor: 'pointer', fontFamily: FONT }}>
              <Download size={13} /> Export
            </button>
          </div>
        </div>

        {/* TABS */}
        <div style={{ display: 'flex', gap: '4px', background: 'white', padding: '4px', borderRadius: '14px', border: '1px solid #e2eae6', marginBottom: '24px', width: 'fit-content' }}>
          {[
            { key: 'overview',  label: '📊 Overview' },
            { key: 'listings',  label: '📦 Listings' },
            { key: 'audience',  label: '👥 Audience' },
            { key: 'tips',      label: '💡 AI Tips' },
          ].map(t => (
            <button key={t.key} onClick={() => setActiveTab(t.key as any)}
              style={{ padding: '9px 18px', borderRadius: '10px', border: 'none', cursor: 'pointer', fontSize: '13px', fontWeight: 900, fontFamily: FONT, background: activeTab === t.key ? INK : 'transparent', color: activeTab === t.key ? 'white' : MUTED, transition: 'all 0.15s' }}>
              {t.label}
            </button>
          ))}
        </div>

        {/* ── OVERVIEW ── */}
        {activeTab === 'overview' && (
          <div>
            {/* KPI cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px', marginBottom: '24px' }}>
              <StatCard label="Total Views"    value={totals.views.toLocaleString()}    sub={`${period} period`}  icon={<Eye size={18} color={MINT} />}            trend="+18%" trendUp={true} />
              <StatCard label="Messages"       value={totals.messages.toLocaleString()} sub="From buyers"          icon={<MessageCircle size={18} color="#0891b2" />} trend="+12%" trendUp={true} />
              <StatCard label="Saves"          value={totals.saves.toLocaleString()}    sub="Favourited listings"  icon={<Heart size={18} color="#ef4444" />}         trend="+24%" trendUp={true} />
              <StatCard label="Response Rate"  value="98%"                             sub="Avg. 47 min response" icon={<Zap size={18} color="#f59e0b" />}           trend="+3%" trendUp={true} />
            </div>

            {/* Chart */}
            <div style={{ background: 'white', borderRadius: '20px', padding: '24px', border: '1px solid #e2eae6', marginBottom: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                <h3 style={{ fontSize: '15px', fontWeight: 900, color: INK, letterSpacing: '-0.03em' }}>
                  {metric === 'views' ? 'Views' : metric === 'messages' ? 'Messages' : 'Saves'} over time
                </h3>
                <div style={{ display: 'flex', gap: '4px', background: SURFACE, padding: '3px', borderRadius: '10px' }}>
                  {(['views', 'messages', 'saves'] as const).map(m => (
                    <button key={m} onClick={() => setMetric(m)}
                      style={{ padding: '5px 12px', borderRadius: '7px', border: 'none', cursor: 'pointer', fontSize: '11px', fontWeight: 900, fontFamily: FONT, textTransform: 'capitalize', background: metric === m ? 'white' : 'transparent', color: metric === m ? INK : MUTED, boxShadow: metric === m ? '0 1px 4px rgba(0,0,0,0.08)' : 'none' }}>
                      {m}
                    </button>
                  ))}
                </div>
              </div>

              {/* Bar chart */}
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px', height: '160px', padding: '0 4px' }}>
                {data.map((d, i) => {
                  const val = d[metric]
                  const h   = maxVal > 0 ? (val / maxVal) * 140 : 0
                  const isPeak = d.day === peakDay.day
                  return (
                    <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', height: '160px', justifyContent: 'flex-end' }}>
                      <span style={{ fontSize: '9px', fontWeight: 900, color: isPeak ? MINT : 'transparent', marginBottom: '-4px' }}>{val}</span>
                      <div style={{ width: '100%', height: `${h}px`, borderRadius: '6px 6px 0 0', background: isPeak ? MINT : '#e2eae6', transition: 'height 0.5s ease, background 0.2s', cursor: 'default', minHeight: '4px' }}
                        onMouseEnter={e => { if (!isPeak) e.currentTarget.style.background = `${MINT}80` }}
                        onMouseLeave={e => { if (!isPeak) e.currentTarget.style.background = '#e2eae6' }}
                      />
                      <span style={{ fontSize: '10px', fontWeight: 700, color: MUTED }}>{d.day}</span>
                    </div>
                  )
                })}
              </div>

              {/* Peak insight */}
              <div style={{ marginTop: '16px', padding: '12px 14px', background: '#f0fdf9', borderRadius: '12px', border: `1px solid ${MINT}`, display: 'flex', alignItems: 'center', gap: '10px' }}>
                <TrendingUp size={16} color={MINT} />
                <p style={{ fontSize: '12px', color: '#0f9b8e', fontWeight: 700 }}>
                  <strong>{peakDay.day}</strong> was your best day with <strong>{peakDay.views} views</strong>. Your listings perform 68% better on weekends.
                </p>
              </div>
            </div>

            {/* Best + worst performers */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div style={{ background: 'white', borderRadius: '18px', padding: '20px', border: '1px solid #e2eae6' }}>
                <h3 style={{ fontSize: '14px', fontWeight: 900, color: INK, marginBottom: '14px', letterSpacing: '-0.03em' }}>🏆 Top Performer</h3>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <img src={LISTINGS[0].image} alt="" style={{ width: '52px', height: '52px', borderRadius: '10px', objectFit: 'cover', flexShrink: 0 }} />
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: '13px', fontWeight: 900, color: INK, marginBottom: '3px', lineHeight: 1.3 }}>{LISTINGS[0].title}</p>
                    <p style={{ fontSize: '12px', fontWeight: 900, color: MINT, marginBottom: '6px' }}>{LISTINGS[0].price}</p>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      {[{ icon: <Eye size={11} />, val: LISTINGS[0].views }, { icon: <MessageCircle size={11} />, val: LISTINGS[0].messages }, { icon: <Heart size={11} />, val: LISTINGS[0].saves }].map((s, i) => (
                        <span key={i} style={{ display: 'flex', alignItems: 'center', gap: '3px', fontSize: '11px', color: MUTED, fontWeight: 700 }}>{s.icon} {s.val}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div style={{ background: 'white', borderRadius: '18px', padding: '20px', border: '1px solid #e2eae6' }}>
                <h3 style={{ fontSize: '14px', fontWeight: 900, color: INK, marginBottom: '14px', letterSpacing: '-0.03em' }}>⚠️ Needs Attention</h3>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <img src={LISTINGS[2].image} alt="" style={{ width: '52px', height: '52px', borderRadius: '10px', objectFit: 'cover', flexShrink: 0, opacity: 0.7 }} />
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: '13px', fontWeight: 900, color: INK, marginBottom: '3px', lineHeight: 1.3 }}>{LISTINGS[2].title}</p>
                    <p style={{ fontSize: '12px', fontWeight: 900, color: MUTED, marginBottom: '6px' }}>{LISTINGS[2].price}</p>
                    <p style={{ fontSize: '11px', color: '#ef4444', fontWeight: 700 }}>↓ 12% views this week — consider a price drop or boost</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── LISTINGS ── */}
        {activeTab === 'listings' && (
          <div style={{ background: 'white', borderRadius: '20px', border: '1px solid #e2eae6', overflow: 'hidden' }}>
            <div style={{ padding: '16px 20px', borderBottom: '1px solid #e2eae6' }}>
              <h3 style={{ fontSize: '15px', fontWeight: 900, color: INK }}>Performance per Listing</h3>
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: SURFACE }}>
                  {['Listing', 'Status', 'Views', 'Messages', 'Saves', 'Conversion', 'Trend', 'Actions'].map(h => (
                    <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontSize: '10px', fontWeight: 900, color: MUTED, textTransform: 'uppercase', letterSpacing: '0.06em', whiteSpace: 'nowrap' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {LISTINGS.map((l, i) => (
                  <tr key={l.id} style={{ borderTop: '1px solid #f4fbf8', background: i % 2 === 0 ? 'white' : 'rgba(244,251,248,0.3)' }}>
                    <td style={{ padding: '14px 16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <img src={l.image} alt="" style={{ width: '40px', height: '40px', borderRadius: '8px', objectFit: 'cover', flexShrink: 0, opacity: l.status === 'sold' ? 0.5 : 1 }} />
                        <div>
                          <p style={{ fontSize: '12px', fontWeight: 900, color: INK, maxWidth: '180px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{l.title}</p>
                          <p style={{ fontSize: '11px', fontWeight: 900, color: MINT }}>{l.price}</p>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '14px 16px' }}>
                      <span style={{ fontSize: '10px', fontWeight: 900, padding: '3px 9px', borderRadius: '100px', textTransform: 'uppercase', background: l.status === 'active' ? '#e6f9f3' : l.status === 'sold' ? INK : '#fff4e0', color: l.status === 'active' ? '#0f9b8e' : l.status === 'sold' ? 'white' : '#b45309' }}>
                        {l.status}
                      </span>
                    </td>
                    <td style={{ padding: '14px 16px' }}>
                      <div style={{ display: 'flex', flex: 1, alignItems: 'center', gap: '6px' }}>
                        <div style={{ width: '48px', height: '4px', borderRadius: '2px', background: '#e2eae6', overflow: 'hidden' }}>
                          <div style={{ height: '100%', width: `${(l.views / 900) * 100}%`, background: MINT, borderRadius: '2px' }} />
                        </div>
                        <span style={{ fontSize: '12px', fontWeight: 900, color: INK }}>{l.views}</span>
                      </div>
                    </td>
                    <td style={{ padding: '14px 16px' }}><span style={{ fontSize: '13px', fontWeight: 900, color: INK }}>{l.messages}</span></td>
                    <td style={{ padding: '14px 16px' }}><span style={{ fontSize: '13px', fontWeight: 900, color: INK }}>{l.saves}</span></td>
                    <td style={{ padding: '14px 16px' }}>
                      <span style={{ fontSize: '12px', fontWeight: 900, color: l.conversionRate > 2 ? '#0f9b8e' : MUTED }}>{l.conversionRate}%</span>
                    </td>
                    <td style={{ padding: '14px 16px' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '3px', fontSize: '12px', fontWeight: 900, color: l.trend === 'up' ? '#0f9b8e' : '#ef4444' }}>
                        {l.trend === 'up' ? <ArrowUp size={12} /> : <ArrowDown size={12} />} {l.trendPct}%
                      </span>
                    </td>
                    <td style={{ padding: '14px 16px' }}>
                      <div style={{ display: 'flex', gap: '6px' }}>
                        <Link href={`/${locale}/listing/${l.id}`}
                          style={{ width: '28px', height: '28px', borderRadius: '7px', background: SURFACE, border: '1px solid #e2eae6', display: 'flex', alignItems: 'center', justifyContent: 'center', color: MUTED, textDecoration: 'none' }}>
                          <Eye size={13} />
                        </Link>
                        <Link href={`/${locale}/boost/${l.id}`}
                          style={{ width: '28px', height: '28px', borderRadius: '7px', background: '#fff4e0', border: '1px solid #fde68a', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#b45309', textDecoration: 'none' }}>
                          <Zap size={13} />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* ── AUDIENCE ── */}
        {activeTab === 'audience' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>

            {/* Traffic sources */}
            <div style={{ background: 'white', borderRadius: '20px', padding: '24px', border: '1px solid #e2eae6' }}>
              <h3 style={{ fontSize: '15px', fontWeight: 900, color: INK, marginBottom: '20px', letterSpacing: '-0.03em' }}>Traffic Sources</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {TRAFFIC_SOURCES.map(s => (
                  <div key={s.label}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                      <span style={{ fontSize: '13px', fontWeight: 700, color: INK }}>{s.label}</span>
                      <span style={{ fontSize: '13px', fontWeight: 900, color: s.color }}>{s.pct}%</span>
                    </div>
                    <div style={{ height: '6px', borderRadius: '3px', background: '#e2eae6', overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${s.pct}%`, background: s.color, borderRadius: '3px', transition: 'width 0.6s ease' }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* City breakdown */}
            <div style={{ background: 'white', borderRadius: '20px', padding: '24px', border: '1px solid #e2eae6' }}>
              <h3 style={{ fontSize: '15px', fontWeight: 900, color: INK, marginBottom: '20px', letterSpacing: '-0.03em' }}>Viewers by City</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {CITY_BREAKDOWN.map(c => (
                  <div key={c.city} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', width: '100px', flexShrink: 0 }}>
                      <MapPin size={12} color={MUTED} />
                      <span style={{ fontSize: '13px', fontWeight: 700, color: INK }}>{c.city}</span>
                    </div>
                    <div style={{ flex: 1, height: '6px', borderRadius: '3px', background: '#e2eae6', overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${c.pct}%`, background: MINT, borderRadius: '3px', transition: 'width 0.6s ease' }} />
                    </div>
                    <span style={{ fontSize: '12px', fontWeight: 900, color: MUTED, width: '36px', textAlign: 'right' }}>{c.views}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Peak hours heatmap */}
            <div style={{ background: 'white', borderRadius: '20px', padding: '24px', border: '1px solid #e2eae6', gridColumn: '1 / -1' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                <h3 style={{ fontSize: '15px', fontWeight: 900, color: INK, letterSpacing: '-0.03em' }}>Peak Viewing Hours</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 12px', background: '#f0fdf9', borderRadius: '10px', border: `1px solid ${MINT}` }}>
                  <Clock size={13} color={MINT} />
                  <span style={{ fontSize: '12px', fontWeight: 900, color: '#0f9b8e' }}>Best time to post: <strong>{peakHour.hour}</strong></span>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px', height: '100px' }}>
                {PEAK_HOURS.map((h, i) => {
                  const maxH = Math.max(...PEAK_HOURS.map(p => p.val))
                  const pct  = (h.val / maxH) * 80
                  const isPeak = h.hour === peakHour.hour
                  return (
                    <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', height: '100px', justifyContent: 'flex-end' }}>
                      <div style={{ width: '100%', height: `${pct}px`, borderRadius: '4px 4px 0 0', background: isPeak ? MINT : '#e2eae6', transition: 'height 0.5s', minHeight: '4px' }} />
                      <span style={{ fontSize: '9px', fontWeight: 700, color: isPeak ? MINT : MUTED, whiteSpace: 'nowrap' }}>{h.hour}</span>
                    </div>
                  )
                })}
              </div>
              <p style={{ fontSize: '12px', color: MUTED, fontWeight: 700, marginTop: '12px', textAlign: 'center' }}>
                Evening hours (6–10pm) drive <strong style={{ color: INK }}>48% of all your views</strong>. Post updates and new ads before 6pm for maximum exposure.
              </p>
            </div>

            {/* Device breakdown */}
            <div style={{ background: 'white', borderRadius: '20px', padding: '24px', border: '1px solid #e2eae6' }}>
              <h3 style={{ fontSize: '15px', fontWeight: 900, color: INK, marginBottom: '16px', letterSpacing: '-0.03em' }}>Device Breakdown</h3>
              <div style={{ display: 'flex', gap: '16px' }}>
                {[{ label: 'Mobile', pct: 74, icon: '📱' }, { label: 'Desktop', pct: 21, icon: '💻' }, { label: 'Tablet', pct: 5, icon: '📲' }].map(d => (
                  <div key={d.label} style={{ flex: 1, textAlign: 'center', padding: '16px', background: SURFACE, borderRadius: '14px' }}>
                    <p style={{ fontSize: '24px', marginBottom: '4px' }}>{d.icon}</p>
                    <p style={{ fontSize: '20px', fontWeight: 900, color: INK, letterSpacing: '-0.05em' }}>{d.pct}%</p>
                    <p style={{ fontSize: '11px', color: MUTED, fontWeight: 700 }}>{d.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Engagement */}
            <div style={{ background: 'white', borderRadius: '20px', padding: '24px', border: '1px solid #e2eae6' }}>
              <h3 style={{ fontSize: '15px', fontWeight: 900, color: INK, marginBottom: '16px', letterSpacing: '-0.03em' }}>Engagement Rates</h3>
              {[
                { label: 'View → Save rate',    val: '3.8%',  good: true },
                { label: 'View → Message rate', val: '2.7%',  good: true },
                { label: 'Avg. time on listing', val: '1m 24s', good: true },
                { label: 'Return visitor rate',  val: '12%',   good: false },
              ].map(e => (
                <div key={e.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #f4fbf8' }}>
                  <span style={{ fontSize: '13px', color: MUTED, fontWeight: 700 }}>{e.label}</span>
                  <span style={{ fontSize: '14px', fontWeight: 900, color: e.good ? '#0f9b8e' : '#b45309' }}>{e.val}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── AI TIPS ── */}
        {activeTab === 'tips' && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '16px 20px', background: `linear-gradient(135deg, ${INK}, #2b3230)`, borderRadius: '18px', marginBottom: '20px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(34,212,168,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Zap size={20} color={MINT} />
              </div>
              <div>
                <p style={{ fontSize: '14px', fontWeight: 900, color: 'white', letterSpacing: '-0.03em', marginBottom: '2px' }}>AI-Powered Growth Recommendations</p>
                <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', fontWeight: 700 }}>Personalised based on your listing performance data</p>
              </div>
              <span style={{ marginLeft: 'auto', fontSize: '11px', fontWeight: 900, padding: '4px 10px', borderRadius: '100px', background: 'rgba(34,212,168,0.15)', color: MINT }}>
                {TIPS.length} suggestions
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {TIPS.map((tip, i) => (
                <div key={i} style={{ background: 'white', borderRadius: '18px', padding: '20px 24px', border: `1.5px solid ${tip.priority === 'high' ? MINT : '#e2eae6'}`, display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <span style={{ fontSize: '28px', flexShrink: 0 }}>{tip.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                      <p style={{ fontSize: '14px', fontWeight: 900, color: INK, letterSpacing: '-0.03em' }}>{tip.title}</p>
                      <span style={{ fontSize: '9px', fontWeight: 900, padding: '2px 8px', borderRadius: '100px', background: tip.priority === 'high' ? '#f0fdf9' : CREAM, color: tip.priority === 'high' ? MINT : '#b45309', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        {tip.priority}
                      </span>
                    </div>
                    <p style={{ fontSize: '13px', color: MUTED, fontWeight: 700, lineHeight: 1.5 }}>{tip.desc}</p>
                  </div>
                  {tip.action && tip.href && (
                    <Link href={`/${locale}${tip.href}`}
                      style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '10px 18px', borderRadius: '10px', background: tip.priority === 'high' ? MINT : INK, color: 'white', textDecoration: 'none', fontSize: '12px', fontWeight: 900, whiteSpace: 'nowrap', flexShrink: 0 }}>
                      {tip.action} <ExternalLink size={11} />
                    </Link>
                  )}
                </div>
              ))}
            </div>

            {/* Weekly summary */}
            <div style={{ background: CREAM, borderRadius: '18px', padding: '20px 24px', marginTop: '20px', border: '1px solid #e8d5c0' }}>
              <p style={{ fontSize: '13px', fontWeight: 900, color: INK, marginBottom: '6px' }}>📅 Weekly Performance Summary</p>
              <p style={{ fontSize: '12px', color: '#6b4c2a', fontWeight: 700, lineHeight: 1.6 }}>
                This week your listings had <strong>{totals.views} views</strong>, <strong>{totals.messages} messages</strong> and <strong>{totals.saves} saves</strong>.
                Your top performer is the iPhone 15 Pro Max with a 18% view increase.
                Consider boosting the AirPods listing which dropped 12% in visibility.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
