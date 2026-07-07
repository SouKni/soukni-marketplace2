'use client'

import { useState, use } from 'react'
import Link from 'next/link'
import {
  Package, ChevronRight, Clock, Check, X, MessageCircle,
  MapPin, Star, AlertTriangle, Handshake, ArrowRight,
  Phone, Shield, RefreshCw, ChevronDown, Filter,
  TrendingUp, DollarSign, CheckCircle, XCircle, Eye
} from 'lucide-react'

type Locale = 'en' | 'fr' | 'ar' | 'es' | 'de'
type OrderTab = 'all' | 'active' | 'completed' | 'cancelled'
type OrderRole = 'buying' | 'selling'

const MINT    = '#22d4a8'
const CREAM   = '#f5ede0'
const SURFACE = '#f4fbf8'
const INK     = '#161d1b'
const MUTED   = '#6b7a76'
const FONT    = "'Inter', system-ui, sans-serif"

// ── Deal status flow ────────────────────────────────────────────
// offer_made → offer_accepted → meeting_set → item_inspected → completed
//                             ↘ offer_declined → cancelled
//                                              ↘ no_show → cancelled

type DealStatus =
  | 'offer_made'
  | 'offer_accepted'
  | 'meeting_set'
  | 'item_inspected'
  | 'completed'
  | 'offer_declined'
  | 'cancelled'
  | 'no_show'
  | 'disputed'

const STATUS_FLOW: { key: DealStatus; label: string; desc: string; color: string; bg: string }[] = [
  { key: 'offer_made',      label: 'Offer Made',       desc: 'Waiting for seller to respond', color: '#b45309', bg: '#fff4e0' },
  { key: 'offer_accepted',  label: 'Offer Accepted',   desc: 'Seller accepted — arrange meeting', color: MINT, bg: '#e6f9f3' },
  { key: 'meeting_set',     label: 'Meeting Set',      desc: 'Location and time agreed', color: '#7c3aed', bg: '#ede9fe' },
  { key: 'item_inspected',  label: 'Item Inspected',   desc: 'Inspection done — confirm payment', color: '#0891b2', bg: '#e0f2fe' },
  { key: 'completed',       label: 'Completed ✓',      desc: 'Deal done — leave a review', color: '#0f9b8e', bg: '#e6f9f3' },
  { key: 'offer_declined',  label: 'Declined',         desc: 'Seller declined your offer', color: '#dc2626', bg: '#fee2e2' },
  { key: 'cancelled',       label: 'Cancelled',        desc: 'Deal was cancelled', color: MUTED, bg: SURFACE },
  { key: 'no_show',         label: 'No Show',          desc: 'Other party did not show up', color: '#dc2626', bg: '#fee2e2' },
  { key: 'disputed',        label: 'Disputed',         desc: 'Issue raised — under review', color: '#dc2626', bg: '#fee2e2' },
]

const ORDERS = [
  {
    id: 'TXN-2026-0041',
    role: 'buying' as OrderRole,
    status: 'offer_accepted' as DealStatus,
    listing: { id: 1, title: 'iPhone 15 Pro Max 256GB — Titanium Black', category: 'Electronics', image: 'https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&w=300' },
    askingPrice: 12500,
    offerPrice: 11800,
    agreedPrice: 12000,
    currency: 'MAD',
    counterpart: { name: 'Youssef Alami', initials: 'YA', phone: '+212 6 12 34 56 78', rating: 4.9, badge: 'Diamond', city: 'Rabat, Agdal' },
    timeline: [
      { date: 'Jul 2, 2026 — 10:24 AM', event: 'You sent an offer of 11,800 MAD', type: 'offer' },
      { date: 'Jul 2, 2026 — 10:45 AM', event: 'Seller countered at 12,000 MAD', type: 'counter' },
      { date: 'Jul 2, 2026 — 11:02 AM', event: 'You accepted 12,000 MAD', type: 'accepted' },
    ],
    meetingLocation: '',
    meetingTime: '',
    createdAt: '2 hours ago',
    expiresIn: '22 hours',
    reviewed: false,
  },
  {
    id: 'TXN-2026-0038',
    role: 'selling' as OrderRole,
    status: 'meeting_set' as DealStatus,
    listing: { id: 2, title: 'MacBook Pro 14" M3 Pro 18GB/512GB', category: 'Electronics', image: 'https://images.pexels.com/photos/1229861/pexels-photo-1229861.jpeg?auto=compress&w=300' },
    askingPrice: 24800,
    offerPrice: 23500,
    agreedPrice: 24000,
    currency: 'MAD',
    counterpart: { name: 'Sara Bennani', initials: 'SB', phone: '+212 6 98 76 54 32', rating: 4.7, badge: 'Certified', city: 'Casablanca, Maarif' },
    timeline: [
      { date: 'Jul 1, 2026 — 3:10 PM', event: 'Sara sent an offer of 23,500 MAD', type: 'offer' },
      { date: 'Jul 1, 2026 — 3:45 PM', event: 'You countered at 24,000 MAD', type: 'counter' },
      { date: 'Jul 1, 2026 — 4:02 PM', event: 'Sara accepted 24,000 MAD', type: 'accepted' },
      { date: 'Jul 1, 2026 — 4:20 PM', event: 'Meeting set: Agdal Mall, main entrance', type: 'meeting' },
    ],
    meetingLocation: 'Agdal Mall — Main Entrance, Rabat',
    meetingTime: 'Jul 4, 2026 at 3:00 PM',
    createdAt: '1 day ago',
    expiresIn: '',
    reviewed: false,
  },
  {
    id: 'TXN-2026-0029',
    role: 'buying' as OrderRole,
    status: 'completed' as DealStatus,
    listing: { id: 10, title: 'Sony WH-1000XM5 Headphones', category: 'Electronics', image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&w=300' },
    askingPrice: 3400,
    offerPrice: 3100,
    agreedPrice: 3200,
    currency: 'MAD',
    counterpart: { name: 'Karim Othmani', initials: 'KO', phone: '+212 6 55 44 33 22', rating: 4.8, badge: 'Certified', city: 'Rabat, Hay Riad' },
    timeline: [
      { date: 'Jun 25, 2026 — 11:00 AM', event: 'You sent an offer of 3,100 MAD', type: 'offer' },
      { date: 'Jun 25, 2026 — 11:30 AM', event: 'Karim accepted 3,100 MAD', type: 'accepted' },
      { date: 'Jun 25, 2026 — 12:00 PM', event: 'Meeting set: Starbucks Agdal', type: 'meeting' },
      { date: 'Jun 26, 2026 — 3:00 PM', event: 'Item inspected and payment made', type: 'inspected' },
      { date: 'Jun 26, 2026 — 3:15 PM', event: 'Deal completed — both parties confirmed', type: 'completed' },
    ],
    meetingLocation: 'Starbucks, Agdal, Rabat',
    meetingTime: 'Jun 26, 2026 at 3:00 PM',
    createdAt: '1 week ago',
    expiresIn: '',
    reviewed: true,
  },
  {
    id: 'TXN-2026-0021',
    role: 'selling' as OrderRole,
    status: 'cancelled' as DealStatus,
    listing: { id: 3, title: 'AirPods Pro 2nd Gen — Sealed Box', category: 'Electronics', image: 'https://images.pexels.com/photos/8000631/pexels-photo-8000631.jpeg?auto=compress&w=300' },
    askingPrice: 1850,
    offerPrice: 1600,
    agreedPrice: 0,
    currency: 'MAD',
    counterpart: { name: 'Anonymous Buyer', initials: 'AB', phone: '', rating: 0, badge: null, city: 'Rabat' },
    timeline: [
      { date: 'Jun 20, 2026 — 2:00 PM', event: 'Buyer sent an offer of 1,600 MAD', type: 'offer' },
      { date: 'Jun 20, 2026 — 2:45 PM', event: 'You declined the offer', type: 'declined' },
    ],
    meetingLocation: '',
    meetingTime: '',
    createdAt: '2 weeks ago',
    expiresIn: '',
    reviewed: false,
  },
]

type Order = typeof ORDERS[0]

const getStatusInfo = (s: DealStatus) => STATUS_FLOW.find(f => f.key === s) || STATUS_FLOW[6]

const PROGRESS_STEPS: DealStatus[] = ['offer_made', 'offer_accepted', 'meeting_set', 'item_inspected', 'completed']

export default function OrdersPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = use(params)
  const [tab, setTab]               = useState<OrderTab>('all')
  const [role, setRole]             = useState<OrderRole>('buying')
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [orders, setOrders]         = useState(ORDERS)
  const [toast, setToast]           = useState<string | null>(null)
  const [meetingInput, setMeetingInput] = useState('')
  const [meetingTimeInput, setMeetingTimeInput] = useState('')
  const [showMeetingForm, setShowMeetingForm] = useState(false)
  const [offerInput, setOfferInput] = useState('')
  const [showOfferForm, setShowOfferForm] = useState(false)

  const showToast = (msg: string) => {
    setToast(msg)
    setTimeout(() => setToast(null), 2500)
  }

  const updateOrderStatus = (id: string, status: DealStatus, extra?: Partial<Order>) => {
    setOrders(prev => prev.map(o =>
      o.id === id ? { ...o, status, ...extra } : o
    ))
    if (selectedOrder?.id === id) {
      setSelectedOrder(prev => prev ? { ...prev, status, ...extra } : null)
    }
  }

  const filteredOrders = orders.filter(o => {
    const matchRole = o.role === role
    const matchTab =
      tab === 'all'       ? true :
      tab === 'active'    ? ['offer_made','offer_accepted','meeting_set','item_inspected'].includes(o.status) :
      tab === 'completed' ? o.status === 'completed' :
      tab === 'cancelled' ? ['cancelled','offer_declined','no_show'].includes(o.status) :
      true
    return matchRole && matchTab
  })

  const stats = {
    active:    orders.filter(o => ['offer_made','offer_accepted','meeting_set','item_inspected'].includes(o.status)).length,
    completed: orders.filter(o => o.status === 'completed').length,
    totalValue: orders.filter(o => o.status === 'completed').reduce((s, o) => s + (o.agreedPrice || 0), 0),
  }

  const progressIndex = (status: DealStatus) => PROGRESS_STEPS.indexOf(status)

  // ── Shared UI ──────────────────────────────────────────────────

  const StatusPill = ({ status }: { status: DealStatus }) => {
    const s = getStatusInfo(status)
    return (
      <span style={{ fontSize: '10px', fontWeight: 900, padding: '4px 10px', borderRadius: '100px', background: s.bg, color: s.color, whiteSpace: 'nowrap', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
        {s.label}
      </span>
    )
  }

  const ActionButton = ({ label, icon, onClick, variant = 'primary' }: { label: string; icon: React.ReactNode; onClick: () => void; variant?: 'primary' | 'secondary' | 'danger' | 'ghost' }) => {
    const styles = {
      primary:   { bg: MINT,     color: 'white', border: 'none' },
      secondary: { bg: INK,      color: 'white', border: 'none' },
      danger:    { bg: '#fee2e2',color: '#dc2626', border: '1px solid #fecaca' },
      ghost:     { bg: SURFACE,  color: INK,    border: '1px solid #e2eae6' },
    }
    const s = styles[variant]
    return (
      <button onClick={onClick}
        style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '10px 18px', borderRadius: '10px', background: s.bg, color: s.color, border: s.border, fontSize: '13px', fontWeight: 900, cursor: 'pointer', fontFamily: FONT, transition: 'all 0.15s' }}>
        {icon} {label}
      </button>
    )
  }

  return (
    <div style={{ background: SURFACE, minHeight: '100vh', fontFamily: FONT }}>

      {/* TOAST */}
      {toast && (
        <div style={{ position: 'fixed', top: '90px', left: '50%', transform: 'translateX(-50%)', background: INK, color: 'white', padding: '12px 24px', borderRadius: '100px', fontSize: '13px', fontWeight: 900, zIndex: 1000, boxShadow: '0 8px 24px rgba(0,0,0,0.2)', letterSpacing: '-0.03em' }}>
          {toast}
        </div>
      )}

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 24px 80px' }}>

        {/* HEADER */}
        <div style={{ marginBottom: '28px' }}>
          <nav style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '12px' }}>
            <Link href={`/${locale}`} style={{ fontSize: '13px', color: MUTED, textDecoration: 'none', fontWeight: 700 }}>Home</Link>
            <ChevronRight size={13} color={MUTED} />
            <span style={{ fontSize: '13px', fontWeight: 900, color: INK }}>My Orders</span>
          </nav>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <h1 style={{ fontSize: '28px', fontWeight: 900, color: INK, letterSpacing: '-0.05em', marginBottom: '4px' }}>My Orders</h1>
              <p style={{ fontSize: '14px', color: MUTED, fontWeight: 700 }}>Track all your buying and selling deals</p>
            </div>
            <Link href={`/${locale}/post-ad`}
              style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 22px', borderRadius: '12px', background: MINT, color: 'white', textDecoration: 'none', fontSize: '14px', fontWeight: 900 }}>
              <Package size={16} /> Sell Something
            </Link>
          </div>
        </div>

        {/* STATS */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px', marginBottom: '28px' }}>
          {[
            { icon: <Clock size={18} color={MINT} />,       label: 'Active Deals',    value: stats.active,    sub: 'In progress' },
            { icon: <CheckCircle size={18} color={MINT} />, label: 'Completed',       value: stats.completed, sub: 'All time' },
            { icon: <DollarSign size={18} color={MINT} />,  label: 'Total Transacted',value: `${stats.totalValue.toLocaleString()} MAD`, sub: 'From completed deals' },
          ].map(s => (
            <div key={s.label} style={{ background: 'white', borderRadius: '16px', padding: '18px 20px', border: '1px solid #e2eae6', display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: SURFACE, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{s.icon}</div>
              <div>
                <p style={{ fontSize: '20px', fontWeight: 900, color: INK, letterSpacing: '-0.05em' }}>{s.value}</p>
                <p style={{ fontSize: '11px', color: MUTED, fontWeight: 700 }}>{s.label} · {s.sub}</p>
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: selectedOrder ? '1fr 420px' : '1fr', gap: '20px', alignItems: 'start' }}>

          {/* LEFT — ORDER LIST */}
          <div>
            {/* Role + Tab filters */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
              <div style={{ display: 'flex', gap: '4px', background: 'white', padding: '4px', borderRadius: '12px', border: '1px solid #e2eae6' }}>
                {(['buying', 'selling'] as OrderRole[]).map(r => (
                  <button key={r} onClick={() => { setRole(r); setSelectedOrder(null) }}
                    style={{ padding: '8px 20px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontSize: '13px', fontWeight: 900, fontFamily: FONT, background: role === r ? INK : 'transparent', color: role === r ? 'white' : MUTED, transition: 'all 0.15s', textTransform: 'capitalize' }}>
                    {r === 'buying' ? '🛍 Buying' : '📦 Selling'}
                  </button>
                ))}
              </div>
              <div style={{ display: 'flex', gap: '4px', background: 'white', padding: '4px', borderRadius: '12px', border: '1px solid #e2eae6' }}>
                {(['all', 'active', 'completed', 'cancelled'] as OrderTab[]).map(t => (
                  <button key={t} onClick={() => setTab(t)}
                    style={{ padding: '7px 14px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontSize: '12px', fontWeight: 900, fontFamily: FONT, background: tab === t ? MINT : 'transparent', color: tab === t ? 'white' : MUTED, transition: 'all 0.15s', textTransform: 'capitalize' }}>
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Order cards */}
            {filteredOrders.length === 0 ? (
              <div style={{ background: 'white', borderRadius: '20px', padding: '64px 20px', textAlign: 'center', border: '1px solid #e2eae6' }}>
                <div style={{ width: '60px', height: '60px', borderRadius: '18px', background: SURFACE, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                  <Package size={28} color={MUTED} />
                </div>
                <p style={{ fontSize: '16px', fontWeight: 900, color: INK, marginBottom: '6px', letterSpacing: '-0.05em' }}>No {tab} orders</p>
                <p style={{ fontSize: '13px', color: MUTED, fontWeight: 700 }}>
                  {role === 'buying' ? 'Start browsing listings to make your first offer' : 'Post an ad to start selling'}
                </p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {filteredOrders.map(order => {
                  const statusInfo = getStatusInfo(order.status)
                  const isActive = ['offer_made','offer_accepted','meeting_set','item_inspected'].includes(order.status)
                  const progress = progressIndex(order.status)

                  return (
                    <div key={order.id}
                      onClick={() => setSelectedOrder(selectedOrder?.id === order.id ? null : order)}
                      style={{ background: 'white', borderRadius: '18px', padding: '20px', border: `1.5px solid ${selectedOrder?.id === order.id ? MINT : '#e2eae6'}`, cursor: 'pointer', transition: 'all 0.2s' }}
                      onMouseEnter={e => { if (selectedOrder?.id !== order.id) e.currentTarget.style.borderColor = '#c0e8e0' }}
                      onMouseLeave={e => { if (selectedOrder?.id !== order.id) e.currentTarget.style.borderColor = '#e2eae6' }}
                    >
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                        {/* Image */}
                        <div style={{ position: 'relative', flexShrink: 0 }}>
                          <img src={order.listing.image} alt="" style={{ width: '72px', height: '72px', borderRadius: '12px', objectFit: 'cover' }} />
                          <div style={{ position: 'absolute', bottom: '-6px', right: '-6px', width: '22px', height: '22px', borderRadius: '50%', background: order.role === 'buying' ? '#ede9fe' : SURFACE, border: '2px solid white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px' }}>
                            {order.role === 'buying' ? '🛍' : '📦'}
                          </div>
                        </div>

                        {/* Info */}
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '8px', marginBottom: '4px' }}>
                            <p style={{ fontSize: '14px', fontWeight: 900, color: INK, lineHeight: 1.3, letterSpacing: '-0.03em', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '320px' }}>{order.listing.title}</p>
                            <StatusPill status={order.status} />
                          </div>
                          <p style={{ fontSize: '11px', color: MUTED, fontWeight: 700, marginBottom: '8px' }}>
                            {order.id} · {order.listing.category} · {order.createdAt}
                          </p>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
                            <div>
                              <p style={{ fontSize: '10px', color: MUTED, fontWeight: 700 }}>
                                {order.role === 'buying' ? 'Your offer' : 'Buyer offer'}
                              </p>
                              <p style={{ fontSize: '16px', fontWeight: 900, color: MINT, letterSpacing: '-0.03em' }}>
                                {order.agreedPrice > 0
                                  ? `${order.agreedPrice.toLocaleString()} MAD`
                                  : `${order.offerPrice.toLocaleString()} MAD`}
                              </p>
                            </div>
                            {order.agreedPrice > 0 && order.agreedPrice !== order.offerPrice && (
                              <div>
                                <p style={{ fontSize: '10px', color: MUTED, fontWeight: 700 }}>Asking price</p>
                                <p style={{ fontSize: '13px', fontWeight: 700, color: MUTED, textDecoration: 'line-through' }}>
                                  {order.askingPrice.toLocaleString()} MAD
                                </p>
                              </div>
                            )}
                            <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: `linear-gradient(135deg, ${MINT}, #0f9b8e)`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                <span style={{ color: 'white', fontWeight: 900, fontSize: '10px' }}>{order.counterpart.initials}</span>
                              </div>
                              <p style={{ fontSize: '12px', fontWeight: 700, color: INK }}>{order.counterpart.name}</p>
                            </div>
                          </div>

                          {/* Progress bar — only for active deals */}
                          {isActive && progress >= 0 && (
                            <div style={{ marginTop: '12px' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '0', marginBottom: '4px' }}>
                                {PROGRESS_STEPS.map((step, i) => (
                                  <div key={step} style={{ display: 'flex', alignItems: 'center', flex: i < PROGRESS_STEPS.length - 1 ? 1 : 'none' }}>
                                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: i <= progress ? MINT : '#e2eae6', flexShrink: 0, transition: 'background 0.3s' }} />
                                    {i < PROGRESS_STEPS.length - 1 && (
                                      <div style={{ flex: 1, height: '2px', background: i < progress ? MINT : '#e2eae6', transition: 'background 0.3s' }} />
                                    )}
                                  </div>
                                ))}
                              </div>
                              <p style={{ fontSize: '10px', color: MUTED, fontWeight: 700 }}>{statusInfo.desc}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>

          {/* RIGHT — ORDER DETAIL */}
          {selectedOrder && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', position: 'sticky', top: '24px' }}>

              {/* Header card */}
              <div style={{ background: 'white', borderRadius: '20px', padding: '24px', border: '1px solid #e2eae6' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: 900, color: INK, letterSpacing: '-0.05em' }}>Order Detail</h3>
                  <button onClick={() => setSelectedOrder(null)} style={{ width: '28px', height: '28px', borderRadius: '8px', border: '1px solid #e2eae6', background: SURFACE, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <X size={14} color={MUTED} />
                  </button>
                </div>

                {/* Listing preview */}
                <div style={{ display: 'flex', gap: '12px', marginBottom: '16px', padding: '12px', background: SURFACE, borderRadius: '12px' }}>
                  <img src={selectedOrder.listing.image} alt="" style={{ width: '56px', height: '56px', borderRadius: '10px', objectFit: 'cover', flexShrink: 0 }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: '13px', fontWeight: 900, color: INK, marginBottom: '2px', lineHeight: 1.3 }}>{selectedOrder.listing.title}</p>
                    <p style={{ fontSize: '11px', color: MUTED, fontWeight: 700, marginBottom: '4px' }}>{selectedOrder.id}</p>
                    <StatusPill status={selectedOrder.status} />
                  </div>
                </div>

                {/* Price breakdown */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: '14px', background: SURFACE, borderRadius: '12px', marginBottom: '16px' }}>
                  {[
                    { label: 'Asking price', value: `${selectedOrder.askingPrice.toLocaleString()} MAD`, muted: true },
                    { label: selectedOrder.role === 'buying' ? 'Your offer' : 'Buyer offer', value: `${selectedOrder.offerPrice.toLocaleString()} MAD`, muted: false },
                    { label: 'Agreed price', value: selectedOrder.agreedPrice > 0 ? `${selectedOrder.agreedPrice.toLocaleString()} MAD` : '—', muted: false, highlight: true },
                    { label: 'You saved', value: selectedOrder.agreedPrice > 0 ? `${(selectedOrder.askingPrice - selectedOrder.agreedPrice).toLocaleString()} MAD` : '—', muted: false, green: true },
                  ].map(row => (
                    <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '12px', color: MUTED, fontWeight: 700 }}>{row.label}</span>
                      <span style={{ fontSize: '13px', fontWeight: 900, color: row.green ? MINT : row.highlight ? INK : MUTED, textDecoration: row.muted ? 'line-through' : 'none' }}>
                        {row.value}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Meeting info */}
                {selectedOrder.meetingLocation && (
                  <div style={{ padding: '12px 14px', background: '#f0fdf9', borderRadius: '10px', border: `1px solid ${MINT}`, marginBottom: '14px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                      <MapPin size={13} color={MINT} />
                      <p style={{ fontSize: '12px', fontWeight: 900, color: INK }}>{selectedOrder.meetingLocation}</p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Clock size={13} color={MINT} />
                      <p style={{ fontSize: '12px', fontWeight: 700, color: MUTED }}>{selectedOrder.meetingTime}</p>
                    </div>
                  </div>
                )}

                {/* Actions based on status */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>

                  {/* Offer received — seller side */}
                  {selectedOrder.status === 'offer_made' && selectedOrder.role === 'selling' && (
                    <>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button onClick={() => { updateOrderStatus(selectedOrder.id, 'offer_accepted'); showToast('✓ Offer accepted — arrange a meeting') }}
                          style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', padding: '11px', borderRadius: '10px', background: MINT, color: 'white', border: 'none', cursor: 'pointer', fontSize: '13px', fontWeight: 900, fontFamily: FONT }}>
                          <Check size={14} /> Accept Offer
                        </button>
                        <button onClick={() => { updateOrderStatus(selectedOrder.id, 'offer_declined'); showToast('✕ Offer declined') }}
                          style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', padding: '11px', borderRadius: '10px', background: '#fee2e2', color: '#dc2626', border: 'none', cursor: 'pointer', fontSize: '13px', fontWeight: 900, fontFamily: FONT }}>
                          <X size={14} /> Decline
                        </button>
                      </div>
                      <button onClick={() => setShowOfferForm(!showOfferForm)}
                        style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', padding: '10px', borderRadius: '10px', background: SURFACE, color: INK, border: '1px solid #e2eae6', cursor: 'pointer', fontSize: '12px', fontWeight: 900, fontFamily: FONT }}>
                        <RefreshCw size={13} /> Counter Offer
                      </button>
                      {showOfferForm && (
                        <div style={{ padding: '12px', background: SURFACE, borderRadius: '10px', border: '1px solid #e2eae6' }}>
                          <p style={{ fontSize: '11px', fontWeight: 900, color: INK, marginBottom: '8px' }}>Your counter offer (MAD)</p>
                          <div style={{ display: 'flex', gap: '8px' }}>
                            <input value={offerInput} onChange={e => setOfferInput(e.target.value)} placeholder="e.g. 12200" type="number"
                              style={{ flex: 1, padding: '9px 12px', borderRadius: '8px', border: '1.5px solid #e2eae6', fontSize: '14px', fontFamily: FONT, fontWeight: 900, color: INK, background: 'white', outline: 'none' }}
                              onFocus={e => e.target.style.borderColor = MINT}
                              onBlur={e => e.target.style.borderColor = '#e2eae6'}
                            />
                            <button onClick={() => { if (offerInput) { showToast(`Counter offer of ${Number(offerInput).toLocaleString()} MAD sent`); setShowOfferForm(false); setOfferInput('') } }}
                              style={{ padding: '9px 16px', borderRadius: '8px', background: INK, color: 'white', border: 'none', cursor: 'pointer', fontSize: '12px', fontWeight: 900, fontFamily: FONT }}>
                              Send
                            </button>
                          </div>
                        </div>
                      )}
                    </>
                  )}

                  {/* Offer accepted — set meeting */}
                  {selectedOrder.status === 'offer_accepted' && (
                    <>
                      <button onClick={() => setShowMeetingForm(!showMeetingForm)}
                        style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '12px', borderRadius: '10px', background: MINT, color: 'white', border: 'none', cursor: 'pointer', fontSize: '13px', fontWeight: 900, fontFamily: FONT }}>
                        <MapPin size={14} /> Set Meeting Location & Time
                      </button>
                      {showMeetingForm && (
                        <div style={{ padding: '14px', background: SURFACE, borderRadius: '12px', border: '1px solid #e2eae6', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                          <div>
                            <p style={{ fontSize: '11px', fontWeight: 900, color: INK, marginBottom: '6px' }}>Location</p>
                            <input value={meetingInput} onChange={e => setMeetingInput(e.target.value)} placeholder="e.g. Agdal Mall — main entrance, Rabat"
                              style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1.5px solid #e2eae6', fontSize: '13px', fontFamily: FONT, fontWeight: 700, color: INK, background: 'white', outline: 'none', boxSizing: 'border-box' }}
                              onFocus={e => e.target.style.borderColor = MINT}
                              onBlur={e => e.target.style.borderColor = '#e2eae6'}
                            />
                          </div>
                          <div>
                            <p style={{ fontSize: '11px', fontWeight: 900, color: INK, marginBottom: '6px' }}>Date & Time</p>
                            <input value={meetingTimeInput} onChange={e => setMeetingTimeInput(e.target.value)} placeholder="e.g. Jul 5, 2026 at 3:00 PM"
                              style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1.5px solid #e2eae6', fontSize: '13px', fontFamily: FONT, fontWeight: 700, color: INK, background: 'white', outline: 'none', boxSizing: 'border-box' }}
                              onFocus={e => e.target.style.borderColor = MINT}
                              onBlur={e => e.target.style.borderColor = '#e2eae6'}
                            />
                          </div>
                          <button onClick={() => {
                            if (meetingInput && meetingTimeInput) {
                              updateOrderStatus(selectedOrder.id, 'meeting_set', { meetingLocation: meetingInput, meetingTime: meetingTimeInput })
                              showToast('📍 Meeting confirmed — both parties notified')
                              setShowMeetingForm(false)
                            }
                          }}
                            style={{ padding: '10px', borderRadius: '8px', background: MINT, color: 'white', border: 'none', cursor: 'pointer', fontSize: '13px', fontWeight: 900, fontFamily: FONT }}>
                            Confirm Meeting
                          </button>
                        </div>
                      )}
                    </>
                  )}

                  {/* Meeting set — confirm inspection */}
                  {selectedOrder.status === 'meeting_set' && (
                    <button onClick={() => { updateOrderStatus(selectedOrder.id, 'item_inspected'); showToast('✓ Item inspected — confirm payment to complete') }}
                      style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '12px', borderRadius: '10px', background: MINT, color: 'white', border: 'none', cursor: 'pointer', fontSize: '13px', fontWeight: 900, fontFamily: FONT }}>
                      <Eye size={14} /> Confirm Item Inspected
                    </button>
                  )}

                  {/* Item inspected — complete deal */}
                  {selectedOrder.status === 'item_inspected' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <button onClick={() => { updateOrderStatus(selectedOrder.id, 'completed'); showToast('🎉 Deal completed! Leave a review for your experience') }}
                        style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '12px', borderRadius: '10px', background: `linear-gradient(135deg, ${MINT}, #0f9b8e)`, color: 'white', border: 'none', cursor: 'pointer', fontSize: '14px', fontWeight: 900, fontFamily: FONT, boxShadow: `0 4px 16px rgba(34,212,168,0.3)` }}>
                        <Handshake size={16} /> Mark Deal as Complete
                      </button>
                      <button onClick={() => { updateOrderStatus(selectedOrder.id, 'disputed'); showToast('⚠ Dispute raised — our team will review within 24h') }}
                        style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', padding: '10px', borderRadius: '10px', background: '#fff4e0', color: '#b45309', border: '1px solid #fde68a', cursor: 'pointer', fontSize: '12px', fontWeight: 900, fontFamily: FONT }}>
                        <AlertTriangle size={13} /> Raise a Dispute
                      </button>
                    </div>
                  )}

                  {/* Completed — leave review */}
                  {selectedOrder.status === 'completed' && !selectedOrder.reviewed && (
                    <Link href={`/${locale}/review/${selectedOrder.id}`}
                      style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '12px', borderRadius: '10px', background: CREAM, color: INK, textDecoration: 'none', fontSize: '13px', fontWeight: 900, border: `1px solid ${CREAM}` }}>
                      <Star size={14} color="#f59e0b" fill="#f59e0b" /> Leave a Review
                    </Link>
                  )}
                </div>
              </div>

              {/* Counterpart card */}
              <div style={{ background: 'white', borderRadius: '20px', padding: '20px', border: '1px solid #e2eae6' }}>
                <h4 style={{ fontSize: '13px', fontWeight: 900, color: MUTED, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '14px' }}>
                  {selectedOrder.role === 'buying' ? 'Seller' : 'Buyer'}
                </h4>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
                  <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: `linear-gradient(135deg, ${MINT}, #0f9b8e)`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <span style={{ color: 'white', fontWeight: 900, fontSize: '14px' }}>{selectedOrder.counterpart.initials}</span>
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
                      <p style={{ fontSize: '14px', fontWeight: 900, color: INK }}>{selectedOrder.counterpart.name}</p>
                      {selectedOrder.counterpart.badge && (
                        <span style={{ fontSize: '9px', fontWeight: 900, padding: '2px 7px', borderRadius: '100px', background: MINT, color: 'white' }}>
                          {selectedOrder.counterpart.badge === 'Diamond' ? '💎' : '✓'} {selectedOrder.counterpart.badge}
                        </span>
                      )}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      {[1,2,3,4,5].map(i => <Star key={i} size={11} fill={i <= Math.floor(selectedOrder.counterpart.rating) ? '#f59e0b' : 'none'} color="#f59e0b" />)}
                      <span style={{ fontSize: '11px', color: MUTED, fontWeight: 700 }}>{selectedOrder.counterpart.rating > 0 ? selectedOrder.counterpart.rating : 'No rating yet'}</span>
                    </div>
                  </div>
                </div>

                {selectedOrder.counterpart.city && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '14px' }}>
                    <MapPin size={12} color={MUTED} />
                    <span style={{ fontSize: '12px', color: MUTED, fontWeight: 700 }}>{selectedOrder.counterpart.city}</span>
                  </div>
                )}

                <div style={{ display: 'flex', gap: '8px' }}>
                  <Link href={`/${locale}/messages`}
                    style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', padding: '10px', borderRadius: '10px', background: INK, color: 'white', textDecoration: 'none', fontSize: '12px', fontWeight: 900 }}>
                    <MessageCircle size={14} /> Message
                  </Link>
                  {selectedOrder.counterpart.phone && (
                    <a href={`https://wa.me/${selectedOrder.counterpart.phone.replace(/\s+/g,'').replace('+','')}`}
                      style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', padding: '10px', borderRadius: '10px', background: '#25D366', color: 'white', textDecoration: 'none', fontSize: '12px', fontWeight: 900 }}>
                      <Phone size={14} /> WhatsApp
                    </a>
                  )}
                </div>
              </div>

              {/* Timeline */}
              <div style={{ background: 'white', borderRadius: '20px', padding: '20px', border: '1px solid #e2eae6' }}>
                <h4 style={{ fontSize: '13px', fontWeight: 900, color: MUTED, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '16px' }}>Timeline</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                  {selectedOrder.timeline.map((event, i) => (
                    <div key={i} style={{ display: 'flex', gap: '12px', paddingBottom: i < selectedOrder.timeline.length - 1 ? '14px' : '0', position: 'relative' }}>
                      {i < selectedOrder.timeline.length - 1 && (
                        <div style={{ position: 'absolute', left: '9px', top: '20px', width: '2px', height: 'calc(100% - 4px)', background: '#e2eae6' }} />
                      )}
                      <div style={{ width: '20px', height: '20px', borderRadius: '50%', background:
                        event.type === 'completed' ? MINT :
                        event.type === 'accepted'  ? '#e6f9f3' :
                        event.type === 'meeting'   ? '#ede9fe' :
                        event.type === 'declined'  ? '#fee2e2' :
                        SURFACE,
                        border: `2px solid ${
                          event.type === 'completed' ? MINT :
                          event.type === 'accepted'  ? MINT :
                          event.type === 'meeting'   ? '#7c3aed' :
                          event.type === 'declined'  ? '#dc2626' :
                          '#e2eae6'
                        }`,
                        flexShrink: 0, zIndex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center'
                      }}>
                        {event.type === 'completed' && <Check size={10} color="white" strokeWidth={3} />}
                        {event.type === 'declined'  && <X size={10} color="#dc2626" strokeWidth={3} />}
                      </div>
                      <div style={{ flex: 1, paddingBottom: '2px' }}>
                        <p style={{ fontSize: '12px', fontWeight: 900, color: INK, marginBottom: '2px', lineHeight: 1.3 }}>{event.event}</p>
                        <p style={{ fontSize: '10px', color: MUTED, fontWeight: 700 }}>{event.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Safety reminder */}
              <div style={{ padding: '14px 16px', background: CREAM, borderRadius: '14px', border: `1px solid #e8d5c0`, display: 'flex', gap: '10px' }}>
                <Shield size={15} color="#b45309" style={{ flexShrink: 0, marginTop: '1px' }} />
                <p style={{ fontSize: '11px', color: '#6b4c2a', lineHeight: 1.5, fontWeight: 700 }}>
                  <strong>Safety reminder:</strong> Always meet in public, inspect before paying, and never send money in advance.
                  <Link href={`/${locale}/safety`} style={{ color: '#b45309', marginLeft: '4px' }}>Safety Tips →</Link>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
