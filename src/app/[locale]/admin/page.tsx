'use client'

import { useState, use } from 'react'
import Link from 'next/link'
import {
  LayoutDashboard, Users, Package, Shield, TrendingUp,
  AlertTriangle, Check, X, Eye, MessageCircle, Sparkles,
  ChevronRight, Search, Filter, MoreVertical, Ban,
  CheckCircle, Clock, DollarSign, ArrowUp, ArrowDown,
  Flag, Trash2, RefreshCw, Download, Bell, LogOut,
  Star, MapPin, Calendar, Building2
} from 'lucide-react'

type Locale = 'en' | 'fr' | 'ar' | 'es' | 'de'
type AdminTab = 'overview' | 'listings' | 'users' | 'diamond' | 'reports' | 'revenue'

const MINT    = '#22d4a8'
const CREAM   = '#f5ede0'
const SURFACE = '#f4fbf8'
const INK     = '#161d1b'
const MUTED   = '#6b7a76'
const FONT    = "'Inter', system-ui, sans-serif"

// ── Mock Data ──────────────────────────────────────────────────

const STATS = [
  { label: 'Total Users',      value: '24,831', change: '+12.4%', up: true,  icon: <Users size={18} color={MINT} /> },
  { label: 'Active Listings',  value: '187,294',change: '+8.7%',  up: true,  icon: <Package size={18} color={MINT} /> },
  { label: 'Diamond Members',  value: '3,412',  change: '+21.3%', up: true,  icon: <Sparkles size={18} color={MINT} /> },
  { label: 'Monthly Revenue',  value: '1.02M MAD', change: '+15.1%', up: true, icon: <DollarSign size={18} color={MINT} /> },
  { label: 'Reported Listings',value: '47',     change: '-8.2%',  up: false, icon: <Flag size={18} color="#f97316" /> },
  { label: 'Pending Diamond',  value: '23',     change: '+5',     up: false, icon: <Clock size={18} color="#f59e0b" /> },
]

const PENDING_LISTINGS = [
  { id: 1, title: 'Mercedes G-Class 2023 — Full Options', category: 'Motors', seller: 'Karim Benali', city: 'Casablanca', price: '1,850,000 MAD', image: 'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&w=200', flagged: false, reported: 0, postedAt: '10 min ago', status: 'pending' },
  { id: 2, title: 'Villa 500m² avec piscine — Marrakech Palmeraie', category: 'Property', seller: 'Sara Mansouri', city: 'Marrakech', price: '8,500,000 MAD', image: 'https://images.pexels.com/photos/1918291/pexels-photo-1918291.jpeg?auto=compress&w=200', flagged: true, reported: 3, postedAt: '25 min ago', status: 'pending' },
  { id: 3, title: 'iPhone 15 Pro Max — Lot of 10 units wholesale', category: 'Electronics', seller: 'Ahmed Tazi', city: 'Rabat', price: '95,000 MAD', image: 'https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&w=200', flagged: true, reported: 7, postedAt: '1h ago', status: 'pending' },
  { id: 4, title: 'Rolex Submariner 2024 — Brand New', category: 'The Vault', seller: 'Youssef Alami', city: 'Rabat', price: '320,000 MAD', image: 'https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&w=200', flagged: false, reported: 0, postedAt: '2h ago', status: 'pending' },
]

const ALL_LISTINGS = [
  { id: 5,  title: 'BMW M4 Competition — Carbon Pack', category: 'Motors',      seller: 'Amine Radi',     city: 'Casablanca', price: '785,000 MAD', status: 'active',   reported: 0,  views: 1284 },
  { id: 6,  title: 'Appartement 3Ch — Agdal Rabat',   category: 'Property',     seller: 'Nadia Fassi',    city: 'Rabat',       price: '25,000 MAD/mo',status: 'active',  reported: 0,  views: 847 },
  { id: 7,  title: 'iPhone 15 Pro Max 256GB',          category: 'Electronics',  seller: 'Youssef Alami',  city: 'Rabat',       price: '12,500 MAD',  status: 'active',   reported: 2,  views: 923 },
  { id: 8,  title: 'Faux Coran — Lot importé',         category: 'Other',        seller: 'Unknown User',   city: 'Fès',         price: '500 MAD',      status: 'flagged',  reported: 12, views: 34  },
  { id: 9,  title: 'Produit miracle minceur',          category: 'Health',       seller: 'Spam Account',   city: 'Casablanca', price: '299 MAD',      status: 'flagged',  reported: 8,  views: 156 },
  { id: 10, title: 'MacBook Pro 14" M3 Pro',           category: 'Electronics',  seller: 'Sara Bennani',   city: 'Rabat',       price: '24,800 MAD',  status: 'active',   reported: 0,  views: 412 },
]

const USERS = [
  { id: 1, name: 'Youssef Alami',   email: 'youssef@gmail.com',  phone: '+212 6 12 34 56 78', city: 'Rabat',       joined: 'Mar 2021', ads: 12, badge: 'Diamond', status: 'active',   reports: 0 },
  { id: 2, name: 'Sara Bennani',    email: 'sara@gmail.com',      phone: '+212 6 98 76 54 32', city: 'Casablanca',  joined: 'Jan 2022', ads: 5,  badge: 'Certified',status: 'active',   reports: 0 },
  { id: 3, name: 'Spam Account',    email: 'spam123@temp.com',    phone: '+212 7 00 00 00 00', city: 'Unknown',     joined: 'Jul 2026', ads: 34, badge: null,       status: 'flagged',  reports: 14},
  { id: 4, name: 'Karim Benali',    email: 'karim@hotmail.com',   phone: '+212 6 55 44 33 22', city: 'Marrakech',   joined: 'Jun 2020', ads: 28, badge: 'Pro',      status: 'active',   reports: 0 },
  { id: 5, name: 'Unknown User',    email: 'anon@temp.io',        phone: '+212 6 11 22 33 44', city: 'Fès',         joined: 'Jul 2026', ads: 8,  badge: null,       status: 'suspended',reports: 5 },
  { id: 6, name: 'Nadia El Fassi',  email: 'nadia@gmail.com',     phone: '+212 6 77 88 99 00', city: 'Rabat',       joined: 'Feb 2023', ads: 3,  badge: 'Certified',status: 'active',   reports: 0 },
]

const DIAMOND_APPLICATIONS = [
  { id: 1, name: 'Mouad Berrada',   type: 'Diamond',      email: 'mouad@gmail.com',    phone: '+212 6 33 44 55 66', city: 'Casablanca', applied: '2h ago',  cinUploaded: true, selfieUploaded: true,  businessDoc: false, status: 'pending' },
  { id: 2, name: 'Imane Chraibi',   type: 'Diamond',      email: 'imane@gmail.com',    phone: '+212 6 77 22 11 55', city: 'Rabat',       applied: '5h ago',  cinUploaded: true, selfieUploaded: true,  businessDoc: false, status: 'pending' },
  { id: 3, name: 'Atlas Immo SARL', type: 'Pro Business', email: 'atlas@immo.ma',      phone: '+212 5 22 00 11 22', city: 'Casablanca', applied: '1d ago',  cinUploaded: true, selfieUploaded: true,  businessDoc: true,  status: 'pending' },
  { id: 4, name: 'Tarik Senhaji',   type: 'Diamond',      email: 'tarik@hotmail.com',  phone: '+212 6 44 55 66 77', city: 'Fès',         applied: '1d ago',  cinUploaded: true, selfieUploaded: false, businessDoc: false, status: 'pending' },
  { id: 5, name: 'Leila Mernissi',  type: 'Diamond',      email: 'leila@gmail.com',    phone: '+212 6 88 99 00 11', city: 'Marrakech',   applied: '2d ago',  cinUploaded: true, selfieUploaded: true,  businessDoc: false, status: 'approved'},
  { id: 6, name: 'Fake ID Corp',    type: 'Diamond',      email: 'fake@temp.net',      phone: '+212 6 00 00 00 00', city: 'Unknown',     applied: '3d ago',  cinUploaded: true, selfieUploaded: false, businessDoc: false, status: 'rejected'},
]

const REPORTS = [
  { id: 1, listing: 'Faux Coran — Lot importé',        reporter: 'Ahmed Tazi',    reason: 'Prohibited content', count: 12, status: 'open',     priority: 'high',   date: '10 min ago' },
  { id: 2, listing: 'Produit miracle minceur 30 jours',reporter: 'Sara B.',       reason: 'Misleading/fraud',   count: 8,  status: 'open',     priority: 'high',   date: '1h ago' },
  { id: 3, listing: 'iPhone 15 Pro Max 256GB',          reporter: 'Karim O.',     reason: 'Fake product',       count: 2,  status: 'reviewing',priority: 'medium', date: '3h ago' },
  { id: 4, listing: 'Terrain 1000m² Bouskoura',        reporter: 'Nadia F.',     reason: 'Wrong price',        count: 1,  status: 'resolved', priority: 'low',    date: '1d ago' },
  { id: 5, listing: 'Villa à vendre Ain Diab',         reporter: 'Youssef A.',   reason: 'Already sold',       count: 1,  status: 'resolved', priority: 'low',    date: '2d ago' },
]

const REVENUE_DATA = [
  { month: 'Jan', diamond: 180000, pro: 45000 },
  { month: 'Feb', diamond: 195000, pro: 52000 },
  { month: 'Mar', diamond: 210000, pro: 58000 },
  { month: 'Apr', diamond: 225000, pro: 61000 },
  { month: 'May', diamond: 248000, pro: 67000 },
  { month: 'Jun', diamond: 271000, pro: 72000 },
  { month: 'Jul', diamond: 298000, pro: 78000 },
]

// ── Shared UI ──────────────────────────────────────────────────

const Badge = ({ label, color, bg }: { label: string; color: string; bg: string }) => (
  <span style={{ fontSize: '10px', fontWeight: 900, padding: '3px 10px', borderRadius: '100px', background: bg, color, textTransform: 'uppercase', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>
    {label}
  </span>
)

const statusBadge = (status: string) => {
  const map: Record<string, { color: string; bg: string }> = {
    active:    { color: '#0f9b8e', bg: '#e6f9f3' },
    pending:   { color: '#b45309', bg: '#fff4e0' },
    flagged:   { color: '#dc2626', bg: '#fee2e2' },
    suspended: { color: 'white',   bg: INK       },
    approved:  { color: '#0f9b8e', bg: '#e6f9f3' },
    rejected:  { color: '#dc2626', bg: '#fee2e2' },
    open:      { color: '#dc2626', bg: '#fee2e2' },
    reviewing: { color: '#b45309', bg: '#fff4e0' },
    resolved:  { color: '#0f9b8e', bg: '#e6f9f3' },
  }
  const s = map[status] || { color: MUTED, bg: SURFACE }
  return <Badge label={status} color={s.color} bg={s.bg} />
}

const priorityBadge = (p: string) => {
  const map: Record<string, { color: string; bg: string }> = {
    high:   { color: '#dc2626', bg: '#fee2e2' },
    medium: { color: '#b45309', bg: '#fff4e0' },
    low:    { color: MUTED,     bg: SURFACE   },
  }
  const s = map[p] || { color: MUTED, bg: SURFACE }
  return <Badge label={p} color={s.color} bg={s.bg} />
}

export default function AdminPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = use(params)
  const [tab, setTab] = useState<AdminTab>('overview')
  const [search, setSearch] = useState('')
  const [listingFilter, setListingFilter] = useState('all')
  const [userFilter, setUserFilter] = useState('all')
  const [diamondFilter, setDiamondFilter] = useState('pending')
  const [reportFilter, setReportFilter] = useState('open')
  const [toast, setToast] = useState<string | null>(null)

  // Application states
  const [listings, setListings]   = useState(ALL_LISTINGS)
  const [users, setUsers]         = useState(USERS)
  const [applications, setApplications] = useState(DIAMOND_APPLICATIONS)
  const [reports, setReports]     = useState(REPORTS)
  const [pendingListings, setPendingListings] = useState(PENDING_LISTINGS)

  const showToast = (msg: string) => {
    setToast(msg)
    setTimeout(() => setToast(null), 2500)
  }

  const approveListing = (id: number) => {
    setPendingListings(prev => prev.filter(l => l.id !== id))
    showToast('✓ Listing approved and published')
  }

  const rejectListing = (id: number) => {
    setPendingListings(prev => prev.filter(l => l.id !== id))
    showToast('✕ Listing rejected and removed')
  }

  const approveApplication = (id: number) => {
    setApplications(prev => prev.map(a => a.id === id ? { ...a, status: 'approved' } : a))
    showToast('💎 Diamond application approved')
  }

  const rejectApplication = (id: number) => {
    setApplications(prev => prev.map(a => a.id === id ? { ...a, status: 'rejected' } : a))
    showToast('✕ Application rejected')
  }

  const suspendUser = (id: number) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, status: 'suspended' } : u))
    showToast('⚠ User suspended')
  }

  const resolveReport = (id: number) => {
    setReports(prev => prev.map(r => r.id === id ? { ...r, status: 'resolved' } : r))
    showToast('✓ Report marked as resolved')
  }

  const removeListing = (id: number) => {
    setListings(prev => prev.filter(l => l.id !== id))
    showToast('✕ Listing removed from platform')
  }

  const NAV_TABS: { key: AdminTab; label: string; icon: React.ReactNode; alert?: number }[] = [
    { key: 'overview',  label: 'Overview',         icon: <LayoutDashboard size={16} /> },
    { key: 'listings',  label: 'Listings',         icon: <Package size={16} />,   alert: pendingListings.length },
    { key: 'users',     label: 'Users',            icon: <Users size={16} /> },
    { key: 'diamond',   label: 'Diamond / Certified', icon: <Sparkles size={16} />, alert: applications.filter(a => a.status === 'pending').length },
    { key: 'reports',   label: 'Reports',          icon: <Flag size={16} />,      alert: reports.filter(r => r.status === 'open').length },
    { key: 'revenue',   label: 'Revenue',          icon: <DollarSign size={16} /> },
  ]

  const maxRevenue = Math.max(...REVENUE_DATA.map(d => d.diamond + d.pro))

  return (
    <div style={{ background: SURFACE, minHeight: '100vh', fontFamily: FONT }}>

      {/* TOAST */}
      {toast && (
        <div style={{ position: 'fixed', top: '20px', left: '50%', transform: 'translateX(-50%)', background: INK, color: 'white', padding: '12px 24px', borderRadius: '100px', fontSize: '13px', fontWeight: 900, zIndex: 1000, boxShadow: '0 8px 24px rgba(0,0,0,0.2)', letterSpacing: '-0.03em' }}>
          {toast}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', minHeight: '100vh' }}>

        {/* SIDEBAR */}
        <aside style={{ background: INK, display: 'flex', flexDirection: 'column', padding: '0', position: 'sticky', top: 0, height: '100vh' }}>
          {/* Logo */}
          <div style={{ padding: '24px 20px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: MINT, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ color: 'white', fontWeight: 900, fontSize: '18px' }}>S</span>
              </div>
              <div>
                <p style={{ color: 'white', fontWeight: 900, fontSize: '16px', letterSpacing: '-0.05em' }}>SouKni</p>
                <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Admin Console</p>
              </div>
            </div>
          </div>

          {/* Nav */}
          <nav style={{ flex: 1, padding: '16px 12px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {NAV_TABS.map(t => (
              <button key={t.key} onClick={() => setTab(t.key)}
                style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', borderRadius: '10px', border: 'none', cursor: 'pointer', fontFamily: FONT, background: tab === t.key ? MINT : 'transparent', color: tab === t.key ? 'white' : 'rgba(255,255,255,0.5)', fontSize: '13px', fontWeight: 900, textAlign: 'left', transition: 'all 0.15s', position: 'relative' }}>
                {t.icon}
                <span style={{ flex: 1 }}>{t.label}</span>
                {t.alert && t.alert > 0 && (
                  <span style={{ background: tab === t.key ? 'rgba(255,255,255,0.3)' : '#ef4444', color: 'white', fontSize: '10px', fontWeight: 900, borderRadius: '100px', minWidth: '18px', height: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 4px' }}>
                    {t.alert}
                  </span>
                )}
              </button>
            ))}
          </nav>

          {/* Bottom */}
          <div style={{ padding: '16px 12px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', marginBottom: '4px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: MINT, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span style={{ color: 'white', fontWeight: 900, fontSize: '12px' }}>AD</span>
              </div>
              <div>
                <p style={{ color: 'white', fontSize: '12px', fontWeight: 900 }}>Admin User</p>
                <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '10px', fontWeight: 700 }}>Super Admin</p>
              </div>
            </div>
            <Link href={`/${locale}`}
              style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 12px', borderRadius: '8px', color: 'rgba(255,255,255,0.4)', fontSize: '12px', fontWeight: 700, textDecoration: 'none', transition: 'color 0.15s' }}>
              <LogOut size={14} /> Exit to Site
            </Link>
          </div>
        </aside>

        {/* MAIN */}
        <main style={{ padding: '32px', overflowY: 'auto' }}>

          {/* Top bar */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
            <div>
              <h1 style={{ fontSize: '24px', fontWeight: 900, color: INK, letterSpacing: '-0.05em', marginBottom: '2px' }}>
                {NAV_TABS.find(t => t.key === tab)?.label}
              </h1>
              <p style={{ fontSize: '12px', color: MUTED, fontWeight: 700 }}>
                {new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
              </p>
            </div>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <button style={{ width: '36px', height: '36px', borderRadius: '10px', border: '1px solid #e2eae6', background: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                <Bell size={16} color={MUTED} />
                <div style={{ position: 'absolute', top: '6px', right: '6px', width: '8px', height: '8px', borderRadius: '50%', background: '#ef4444', border: '2px solid white' }} />
              </button>
              <button style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 16px', borderRadius: '10px', border: '1px solid #e2eae6', background: 'white', cursor: 'pointer', fontSize: '12px', fontWeight: 900, color: INK, fontFamily: FONT }}>
                <Download size={13} /> Export
              </button>
            </div>
          </div>

          {/* ── OVERVIEW ── */}
          {tab === 'overview' && (
            <div>
              {/* Stat cards */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px', marginBottom: '28px' }}>
                {STATS.map(s => (
                  <div key={s.label} style={{ background: 'white', borderRadius: '16px', padding: '20px', border: '1px solid #e2eae6' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                      <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: SURFACE, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {s.icon}
                      </div>
                      <span style={{ fontSize: '11px', fontWeight: 900, color: s.up ? '#0f9b8e' : '#ef4444', display: 'flex', alignItems: 'center', gap: '3px' }}>
                        {s.up ? <ArrowUp size={11} /> : <ArrowDown size={11} />} {s.change}
                      </span>
                    </div>
                    <p style={{ fontSize: '22px', fontWeight: 900, color: INK, letterSpacing: '-0.05em', marginBottom: '2px' }}>{s.value}</p>
                    <p style={{ fontSize: '12px', color: MUTED, fontWeight: 700 }}>{s.label}</p>
                  </div>
                ))}
              </div>

              {/* Pending review + Recent reports */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>

                {/* Listings needing review */}
                <div style={{ background: 'white', borderRadius: '20px', padding: '24px', border: '1px solid #e2eae6' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                    <h3 style={{ fontSize: '14px', fontWeight: 900, color: INK, letterSpacing: '-0.05em' }}>Needs Review</h3>
                    <button onClick={() => setTab('listings')} style={{ fontSize: '12px', fontWeight: 900, color: MINT, background: 'none', border: 'none', cursor: 'pointer', fontFamily: FONT }}>See all →</button>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {pendingListings.slice(0, 3).map(l => (
                      <div key={l.id} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px', background: SURFACE, borderRadius: '10px' }}>
                        <img src={l.image} alt="" style={{ width: '40px', height: '40px', borderRadius: '8px', objectFit: 'cover', flexShrink: 0 }} />
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <p style={{ fontSize: '12px', fontWeight: 900, color: INK, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{l.title}</p>
                          <p style={{ fontSize: '11px', color: MUTED, fontWeight: 700 }}>{l.category} · {l.postedAt}</p>
                        </div>
                        {l.flagged && <Flag size={13} color="#ef4444" />}
                        <div style={{ display: 'flex', gap: '4px' }}>
                          <button onClick={() => approveListing(l.id)} style={{ width: '28px', height: '28px', borderRadius: '8px', background: '#e6f9f3', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Check size={13} color="#0f9b8e" />
                          </button>
                          <button onClick={() => rejectListing(l.id)} style={{ width: '28px', height: '28px', borderRadius: '8px', background: '#fee2e2', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <X size={13} color="#dc2626" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Open reports */}
                <div style={{ background: 'white', borderRadius: '20px', padding: '24px', border: '1px solid #e2eae6' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                    <h3 style={{ fontSize: '14px', fontWeight: 900, color: INK, letterSpacing: '-0.05em' }}>Open Reports</h3>
                    <button onClick={() => setTab('reports')} style={{ fontSize: '12px', fontWeight: 900, color: MINT, background: 'none', border: 'none', cursor: 'pointer', fontFamily: FONT }}>See all →</button>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {reports.filter(r => r.status === 'open').map(r => (
                      <div key={r.id} style={{ padding: '10px 12px', background: SURFACE, borderRadius: '10px', border: '1px solid #e2eae6' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                          <p style={{ fontSize: '12px', fontWeight: 900, color: INK, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '180px' }}>{r.listing}</p>
                          {priorityBadge(r.priority)}
                        </div>
                        <p style={{ fontSize: '11px', color: MUTED, fontWeight: 700 }}>{r.reason} · {r.count} report{r.count !== 1 ? 's' : ''}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── LISTINGS ── */}
          {tab === 'listings' && (
            <div>
              {/* Pending section */}
              {pendingListings.length > 0 && (
                <div style={{ marginBottom: '28px' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: 900, color: INK, letterSpacing: '-0.05em', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Clock size={16} color="#f59e0b" /> Awaiting Review
                    <span style={{ background: '#fff4e0', color: '#b45309', fontSize: '11px', fontWeight: 900, padding: '2px 8px', borderRadius: '100px' }}>{pendingListings.length}</span>
                  </h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '14px' }}>
                    {pendingListings.map(l => (
                      <div key={l.id} style={{ background: 'white', borderRadius: '16px', padding: '16px', border: `1.5px solid ${l.flagged ? '#fecaca' : '#e2eae6'}`, display: 'flex', gap: '14px' }}>
                        <img src={l.image} alt="" style={{ width: '80px', height: '80px', borderRadius: '12px', objectFit: 'cover', flexShrink: 0 }} />
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '6px', marginBottom: '4px' }}>
                            <p style={{ fontSize: '13px', fontWeight: 900, color: INK, lineHeight: 1.3, flex: 1 }}>{l.title}</p>
                            {l.flagged && (
                              <span style={{ background: '#fee2e2', color: '#dc2626', fontSize: '9px', fontWeight: 900, padding: '2px 6px', borderRadius: '100px', whiteSpace: 'nowrap', flexShrink: 0 }}>
                                {l.reported} reports
                              </span>
                            )}
                          </div>
                          <p style={{ fontSize: '11px', color: MUTED, fontWeight: 700, marginBottom: '2px' }}>{l.category} · {l.city} · {l.postedAt}</p>
                          <p style={{ fontSize: '13px', fontWeight: 900, color: MINT, marginBottom: '10px' }}>{l.price}</p>
                          <p style={{ fontSize: '11px', color: MUTED, fontWeight: 700, marginBottom: '10px' }}>by {l.seller}</p>
                          <div style={{ display: 'flex', gap: '6px' }}>
                            <button onClick={() => approveListing(l.id)}
                              style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', padding: '7px', borderRadius: '8px', background: '#e6f9f3', border: 'none', cursor: 'pointer', fontSize: '11px', fontWeight: 900, color: '#0f9b8e', fontFamily: FONT }}>
                              <Check size={12} /> Approve
                            </button>
                            <button onClick={() => rejectListing(l.id)}
                              style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', padding: '7px', borderRadius: '8px', background: '#fee2e2', border: 'none', cursor: 'pointer', fontSize: '11px', fontWeight: 900, color: '#dc2626', fontFamily: FONT }}>
                              <X size={12} /> Reject
                            </button>
                            <Link href={`/${locale}/listing/${l.id}`} target="_blank"
                              style={{ width: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '8px', background: SURFACE, border: '1px solid #e2eae6', color: MUTED, textDecoration: 'none' }}>
                              <Eye size={12} />
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* All listings */}
              <div style={{ background: 'white', borderRadius: '20px', border: '1px solid #e2eae6', overflow: 'hidden' }}>
                <div style={{ padding: '16px 20px', borderBottom: '1px solid #e2eae6', display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                  <h3 style={{ fontSize: '14px', fontWeight: 900, color: INK, flex: 1 }}>All Listings</h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: SURFACE, borderRadius: '8px', padding: '6px 12px', border: '1px solid #e2eae6' }}>
                    <Search size={13} color={MUTED} />
                    <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search listings..."
                      style={{ border: 'none', background: 'transparent', outline: 'none', fontSize: '12px', fontFamily: FONT, fontWeight: 700, color: INK, width: '160px' }} />
                  </div>
                  {['all', 'active', 'flagged'].map(f => (
                    <button key={f} onClick={() => setListingFilter(f)}
                      style={{ padding: '6px 14px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontSize: '12px', fontWeight: 900, fontFamily: FONT, background: listingFilter === f ? INK : SURFACE, color: listingFilter === f ? 'white' : MUTED, textTransform: 'capitalize' }}>
                      {f}
                    </button>
                  ))}
                </div>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ background: SURFACE }}>
                      {['Listing', 'Category', 'Seller', 'Price', 'Views', 'Reports', 'Status', 'Actions'].map(h => (
                        <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontSize: '10px', fontWeight: 900, color: MUTED, textTransform: 'uppercase', letterSpacing: '0.06em', whiteSpace: 'nowrap' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {listings
                      .filter(l => listingFilter === 'all' || l.status === listingFilter)
                      .filter(l => !search || l.title.toLowerCase().includes(search.toLowerCase()))
                      .map((l, i) => (
                        <tr key={l.id} style={{ borderTop: '1px solid #f4fbf8', background: i % 2 === 0 ? 'white' : 'rgba(244,251,248,0.3)' }}>
                          <td style={{ padding: '12px 16px', maxWidth: '200px' }}>
                            <p style={{ fontSize: '12px', fontWeight: 900, color: INK, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{l.title}</p>
                            <p style={{ fontSize: '10px', color: MUTED, fontWeight: 700 }}>{l.city}</p>
                          </td>
                          <td style={{ padding: '12px 16px' }}><span style={{ fontSize: '11px', fontWeight: 700, color: MUTED }}>{l.category}</span></td>
                          <td style={{ padding: '12px 16px' }}><span style={{ fontSize: '12px', fontWeight: 700, color: INK }}>{l.seller}</span></td>
                          <td style={{ padding: '12px 16px' }}><span style={{ fontSize: '12px', fontWeight: 900, color: MINT }}>{l.price}</span></td>
                          <td style={{ padding: '12px 16px' }}><span style={{ fontSize: '12px', fontWeight: 700, color: INK }}>{l.views.toLocaleString()}</span></td>
                          <td style={{ padding: '12px 16px' }}>
                            <span style={{ fontSize: '12px', fontWeight: 900, color: l.reported > 0 ? '#dc2626' : MUTED }}>
                              {l.reported > 0 ? `⚠ ${l.reported}` : '—'}
                            </span>
                          </td>
                          <td style={{ padding: '12px 16px' }}>{statusBadge(l.status)}</td>
                          <td style={{ padding: '12px 16px' }}>
                            <div style={{ display: 'flex', gap: '4px' }}>
                              <Link href={`/${locale}/listing/${l.id}`} style={{ width: '26px', height: '26px', borderRadius: '6px', background: SURFACE, border: '1px solid #e2eae6', display: 'flex', alignItems: 'center', justifyContent: 'center', color: MUTED, textDecoration: 'none' }}>
                                <Eye size={12} />
                              </Link>
                              <button onClick={() => removeListing(l.id)} style={{ width: '26px', height: '26px', borderRadius: '6px', background: '#fee2e2', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Trash2 size={12} color="#dc2626" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ── USERS ── */}
          {tab === 'users' && (
            <div style={{ background: 'white', borderRadius: '20px', border: '1px solid #e2eae6', overflow: 'hidden' }}>
              <div style={{ padding: '16px 20px', borderBottom: '1px solid #e2eae6', display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                <h3 style={{ fontSize: '14px', fontWeight: 900, color: INK, flex: 1 }}>All Users</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: SURFACE, borderRadius: '8px', padding: '6px 12px', border: '1px solid #e2eae6' }}>
                  <Search size={13} color={MUTED} />
                  <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search users..."
                    style={{ border: 'none', background: 'transparent', outline: 'none', fontSize: '12px', fontFamily: FONT, fontWeight: 700, color: INK, width: '160px' }} />
                </div>
                {['all', 'active', 'flagged', 'suspended'].map(f => (
                  <button key={f} onClick={() => setUserFilter(f)}
                    style={{ padding: '6px 14px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontSize: '12px', fontWeight: 900, fontFamily: FONT, background: userFilter === f ? INK : SURFACE, color: userFilter === f ? 'white' : MUTED, textTransform: 'capitalize' }}>
                    {f}
                  </button>
                ))}
              </div>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: SURFACE }}>
                    {['User', 'Contact', 'City', 'Joined', 'Ads', 'Badge', 'Reports', 'Status', 'Actions'].map(h => (
                      <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontSize: '10px', fontWeight: 900, color: MUTED, textTransform: 'uppercase', letterSpacing: '0.06em', whiteSpace: 'nowrap' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {users
                    .filter(u => userFilter === 'all' || u.status === userFilter)
                    .filter(u => !search || u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()))
                    .map((u, i) => (
                      <tr key={u.id} style={{ borderTop: '1px solid #f4fbf8', background: i % 2 === 0 ? 'white' : 'rgba(244,251,248,0.3)' }}>
                        <td style={{ padding: '12px 14px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: `linear-gradient(135deg, ${MINT}, #0f9b8e)`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                              <span style={{ color: 'white', fontWeight: 900, fontSize: '10px' }}>{u.name.split(' ').map(n => n[0]).join('').slice(0, 2)}</span>
                            </div>
                            <p style={{ fontSize: '12px', fontWeight: 900, color: INK, whiteSpace: 'nowrap' }}>{u.name}</p>
                          </div>
                        </td>
                        <td style={{ padding: '12px 14px' }}>
                          <p style={{ fontSize: '11px', color: INK, fontWeight: 700 }}>{u.email}</p>
                          <p style={{ fontSize: '10px', color: MUTED, fontWeight: 700 }}>{u.phone}</p>
                        </td>
                        <td style={{ padding: '12px 14px' }}><span style={{ fontSize: '11px', color: MUTED, fontWeight: 700 }}>{u.city}</span></td>
                        <td style={{ padding: '12px 14px' }}><span style={{ fontSize: '11px', color: MUTED, fontWeight: 700 }}>{u.joined}</span></td>
                        <td style={{ padding: '12px 14px' }}><span style={{ fontSize: '12px', fontWeight: 900, color: INK }}>{u.ads}</span></td>
                        <td style={{ padding: '12px 14px' }}>
                          {u.badge ? (
                            <span style={{ fontSize: '10px', fontWeight: 900, padding: '3px 8px', borderRadius: '100px', background: u.badge === 'Diamond' || u.badge === 'Pro' ? MINT : '#e6f9f3', color: 'white', textTransform: 'uppercase' }}>
                              {u.badge === 'Diamond' ? '💎' : u.badge === 'Pro' ? '🏢' : '✓'} {u.badge}
                            </span>
                          ) : <span style={{ fontSize: '11px', color: MUTED, fontWeight: 700 }}>—</span>}
                        </td>
                        <td style={{ padding: '12px 14px' }}>
                          <span style={{ fontSize: '12px', fontWeight: 900, color: u.reports > 0 ? '#dc2626' : MUTED }}>
                            {u.reports > 0 ? `⚠ ${u.reports}` : '—'}
                          </span>
                        </td>
                        <td style={{ padding: '12px 14px' }}>{statusBadge(u.status)}</td>
                        <td style={{ padding: '12px 14px' }}>
                          <div style={{ display: 'flex', gap: '4px' }}>
                            <Link href={`/${locale}/seller/${u.id}`}
                              style={{ width: '26px', height: '26px', borderRadius: '6px', background: SURFACE, border: '1px solid #e2eae6', display: 'flex', alignItems: 'center', justifyContent: 'center', color: MUTED, textDecoration: 'none' }}>
                              <Eye size={12} />
                            </Link>
                            {u.status !== 'suspended' && (
                              <button onClick={() => suspendUser(u.id)}
                                style={{ width: '26px', height: '26px', borderRadius: '6px', background: '#fee2e2', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Ban size={12} color="#dc2626" />
                              </button>
                            )}
                            {u.status === 'suspended' && (
                              <button onClick={() => setUsers(prev => prev.map(usr => usr.id === u.id ? { ...usr, status: 'active' } : usr))}
                                style={{ width: '26px', height: '26px', borderRadius: '6px', background: '#e6f9f3', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Check size={12} color="#0f9b8e" />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          )}

          {/* ── DIAMOND / CERTIFIED ── */}
          {tab === 'diamond' && (
            <div>
              <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
                {['pending', 'approved', 'rejected'].map(f => (
                  <button key={f} onClick={() => setDiamondFilter(f)}
                    style={{ padding: '8px 18px', borderRadius: '10px', border: 'none', cursor: 'pointer', fontSize: '13px', fontWeight: 900, fontFamily: FONT, background: diamondFilter === f ? INK : 'white', color: diamondFilter === f ? 'white' : MUTED, border: `1px solid ${diamondFilter === f ? 'transparent' : '#e2eae6'}`, textTransform: 'capitalize', transition: 'all 0.15s' }}>
                    {f} ({applications.filter(a => a.status === f).length})
                  </button>
                ))}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {applications.filter(a => a.status === diamondFilter).map(app => (
                  <div key={app.id} style={{ background: 'white', borderRadius: '18px', padding: '20px', border: `1.5px solid ${app.status === 'pending' ? '#e2eae6' : app.status === 'approved' ? MINT : '#fecaca'}` }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap' }}>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1 }}>
                        <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: `linear-gradient(135deg, ${MINT}, #0f9b8e)`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          <span style={{ color: 'white', fontWeight: 900, fontSize: '14px' }}>{app.name.split(' ').map(n => n[0]).join('').slice(0, 2)}</span>
                        </div>
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
                            <p style={{ fontSize: '14px', fontWeight: 900, color: INK }}>{app.name}</p>
                            <span style={{ fontSize: '10px', fontWeight: 900, padding: '2px 8px', borderRadius: '100px', background: app.type === 'Diamond' ? '#e6f9f3' : CREAM, color: app.type === 'Diamond' ? '#0f9b8e' : INK }}>
                              {app.type === 'Diamond' ? '💎' : '🏢'} {app.type}
                            </span>
                          </div>
                          <p style={{ fontSize: '11px', color: MUTED, fontWeight: 700 }}>{app.email} · {app.phone}</p>
                          <p style={{ fontSize: '11px', color: MUTED, fontWeight: 700 }}>{app.city} · Applied {app.applied}</p>
                        </div>
                      </div>

                      {/* Document checks */}
                      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                        {[
                          { label: 'CIN Upload', ok: app.cinUploaded },
                          { label: 'Selfie', ok: app.selfieUploaded },
                          { label: 'Business Doc', ok: app.businessDoc, skip: app.type === 'Diamond' },
                        ].map(d => (
                          !d.skip && (
                            <div key={d.label} style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: '5px 10px', borderRadius: '8px', background: d.ok ? '#e6f9f3' : '#fee2e2', border: `1px solid ${d.ok ? '#22d4a8' : '#fecaca'}` }}>
                              {d.ok ? <Check size={11} color="#0f9b8e" /> : <X size={11} color="#dc2626" />}
                              <span style={{ fontSize: '10px', fontWeight: 900, color: d.ok ? '#0f9b8e' : '#dc2626' }}>{d.label}</span>
                            </div>
                          )
                        ))}
                      </div>

                      {/* Actions */}
                      {app.status === 'pending' && (
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <button onClick={() => approveApplication(app.id)}
                            style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '9px 18px', borderRadius: '10px', background: MINT, color: 'white', border: 'none', cursor: 'pointer', fontSize: '12px', fontWeight: 900, fontFamily: FONT }}>
                            <Check size={13} /> Approve
                          </button>
                          <button onClick={() => rejectApplication(app.id)}
                            style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '9px 18px', borderRadius: '10px', background: '#fee2e2', color: '#dc2626', border: 'none', cursor: 'pointer', fontSize: '12px', fontWeight: 900, fontFamily: FONT }}>
                            <X size={13} /> Reject
                          </button>
                          <button style={{ width: '36px', height: '36px', borderRadius: '10px', background: SURFACE, border: '1px solid #e2eae6', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Eye size={14} color={MUTED} />
                          </button>
                        </div>
                      )}
                      {app.status !== 'pending' && statusBadge(app.status)}
                    </div>

                    {/* Missing docs warning */}
                    {app.status === 'pending' && (!app.cinUploaded || !app.selfieUploaded) && (
                      <div style={{ marginTop: '12px', padding: '10px 12px', background: '#fff4e0', borderRadius: '10px', border: '1px solid #fde68a', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <AlertTriangle size={13} color="#b45309" />
                        <p style={{ fontSize: '11px', fontWeight: 900, color: '#b45309' }}>
                          Missing documents — approval blocked until all docs uploaded.
                        </p>
                      </div>
                    )}
                  </div>
                ))}

                {applications.filter(a => a.status === diamondFilter).length === 0 && (
                  <div style={{ background: 'white', borderRadius: '18px', padding: '48px', textAlign: 'center', border: '1px solid #e2eae6' }}>
                    <p style={{ fontSize: '14px', color: MUTED, fontWeight: 700 }}>No {diamondFilter} applications</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ── REPORTS ── */}
          {tab === 'reports' && (
            <div>
              <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
                {['open', 'reviewing', 'resolved'].map(f => (
                  <button key={f} onClick={() => setReportFilter(f)}
                    style={{ padding: '8px 18px', borderRadius: '10px', border: `1px solid ${reportFilter === f ? 'transparent' : '#e2eae6'}`, cursor: 'pointer', fontSize: '13px', fontWeight: 900, fontFamily: FONT, background: reportFilter === f ? INK : 'white', color: reportFilter === f ? 'white' : MUTED, textTransform: 'capitalize' }}>
                    {f} ({reports.filter(r => r.status === f).length})
                  </button>
                ))}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {reports.filter(r => r.status === reportFilter).map(r => (
                  <div key={r.id} style={{ background: 'white', borderRadius: '16px', padding: '18px 20px', border: `1.5px solid ${r.priority === 'high' ? '#fecaca' : '#e2eae6'}`, display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
                    <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: r.priority === 'high' ? '#fee2e2' : r.priority === 'medium' ? '#fff4e0' : SURFACE, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Flag size={16} color={r.priority === 'high' ? '#dc2626' : r.priority === 'medium' ? '#b45309' : MUTED} />
                    </div>
                    <div style={{ flex: 1, minWidth: '200px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '3px' }}>
                        <p style={{ fontSize: '13px', fontWeight: 900, color: INK }}>{r.listing}</p>
                        {priorityBadge(r.priority)}
                      </div>
                      <p style={{ fontSize: '11px', color: MUTED, fontWeight: 700 }}>
                        Reason: <strong style={{ color: INK }}>{r.reason}</strong> · {r.count} report{r.count !== 1 ? 's' : ''} · Reported by {r.reporter} · {r.date}
                      </p>
                    </div>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      {statusBadge(r.status)}
                      {r.status !== 'resolved' && (
                        <>
                          <button onClick={() => resolveReport(r.id)}
                            style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: '7px 14px', borderRadius: '8px', background: '#e6f9f3', border: 'none', cursor: 'pointer', fontSize: '11px', fontWeight: 900, color: '#0f9b8e', fontFamily: FONT }}>
                            <Check size={12} /> Resolve
                          </button>
                          <button onClick={() => removeListing(r.id)}
                            style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: '7px 14px', borderRadius: '8px', background: '#fee2e2', border: 'none', cursor: 'pointer', fontSize: '11px', fontWeight: 900, color: '#dc2626', fontFamily: FONT }}>
                            <Trash2 size={12} /> Remove Listing
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                ))}
                {reports.filter(r => r.status === reportFilter).length === 0 && (
                  <div style={{ background: 'white', borderRadius: '16px', padding: '48px', textAlign: 'center', border: '1px solid #e2eae6' }}>
                    <CheckCircle size={32} color={MINT} style={{ marginBottom: '12px' }} />
                    <p style={{ fontSize: '14px', color: MUTED, fontWeight: 700 }}>No {reportFilter} reports — all clear!</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ── REVENUE ── */}
          {tab === 'revenue' && (
            <div>
              {/* Revenue summary */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px', marginBottom: '28px' }}>
                {[
                  { label: 'Total MRR',     value: '1,021,000 MAD', sub: '+15.1% vs last month', color: MINT },
                  { label: 'Diamond MRR',   value: '854,000 MAD',   sub: '3,412 active members', color: INK },
                  { label: 'Pro Business',  value: '167,000 MAD',   sub: '209 active businesses', color: '#8b5cf6' },
                ].map(s => (
                  <div key={s.label} style={{ background: 'white', borderRadius: '16px', padding: '20px', border: '1px solid #e2eae6' }}>
                    <p style={{ fontSize: '12px', color: MUTED, fontWeight: 700, marginBottom: '6px' }}>{s.label}</p>
                    <p style={{ fontSize: '24px', fontWeight: 900, color: s.color, letterSpacing: '-0.05em', marginBottom: '4px' }}>{s.value}</p>
                    <p style={{ fontSize: '11px', color: MUTED, fontWeight: 700 }}>{s.sub}</p>
                  </div>
                ))}
              </div>

              {/* Bar chart */}
              <div style={{ background: 'white', borderRadius: '20px', padding: '24px', border: '1px solid #e2eae6', marginBottom: '20px' }}>
                <h3 style={{ fontSize: '14px', fontWeight: 900, color: INK, marginBottom: '20px', letterSpacing: '-0.05em' }}>Monthly Revenue Breakdown (MAD)</h3>
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: '12px', height: '180px' }}>
                  {REVENUE_DATA.map(d => {
                    const total   = d.diamond + d.pro
                    const dHeight = (d.diamond / maxRevenue) * 160
                    const pHeight = (d.pro     / maxRevenue) * 160
                    return (
                      <div key={d.month} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px', width: '100%' }}>
                          <div style={{ width: '100%', height: `${pHeight}px`, background: '#8b5cf6', borderRadius: '4px 4px 0 0', opacity: 0.7 }} />
                          <div style={{ width: '100%', height: `${dHeight}px`, background: MINT, borderRadius: d.pro > 0 ? '0' : '4px 4px 0 0' }} />
                        </div>
                        <p style={{ fontSize: '10px', fontWeight: 900, color: MUTED }}>{d.month}</p>
                      </div>
                    )
                  })}
                </div>
                <div style={{ display: 'flex', gap: '16px', marginTop: '16px', paddingTop: '16px', borderTop: '1px solid #f4fbf8' }}>
                  {[{ color: MINT, label: 'Diamond MRR' }, { color: '#8b5cf6', label: 'Pro Business MRR' }].map(l => (
                    <div key={l.label} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <div style={{ width: '12px', height: '12px', borderRadius: '3px', background: l.color }} />
                      <span style={{ fontSize: '11px', fontWeight: 700, color: MUTED }}>{l.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Billing table */}
              <div style={{ background: 'white', borderRadius: '20px', border: '1px solid #e2eae6', overflow: 'hidden' }}>
                <div style={{ padding: '16px 20px', borderBottom: '1px solid #e2eae6', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <h3 style={{ fontSize: '14px', fontWeight: 900, color: INK }}>Recent Transactions</h3>
                  <button style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '7px 14px', borderRadius: '8px', border: '1px solid #e2eae6', background: 'white', fontSize: '12px', fontWeight: 900, color: INK, cursor: 'pointer', fontFamily: FONT }}>
                    <Download size={12} /> Export CSV
                  </button>
                </div>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ background: SURFACE }}>
                      {['User', 'Plan', 'Amount', 'Date', 'Status'].map(h => (
                        <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontSize: '10px', fontWeight: 900, color: MUTED, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { user: 'Youssef Alami',   plan: '💎 Diamond',      amount: '299 MAD', date: 'Jul 1, 2026',  status: 'paid' },
                      { user: 'Atlas Immo SARL', plan: '🏢 Pro Business', amount: '799 MAD', date: 'Jul 1, 2026',  status: 'paid' },
                      { user: 'Sara Bennani',    plan: '💎 Diamond',      amount: '299 MAD', date: 'Jun 28, 2026', status: 'paid' },
                      { user: 'Karim Benali',    plan: '🏢 Pro Business', amount: '799 MAD', date: 'Jun 25, 2026', status: 'paid' },
                      { user: 'Mouad Berrada',   plan: '💎 Diamond',      amount: '299 MAD', date: 'Jun 20, 2026', status: 'failed' },
                    ].map((t, i) => (
                      <tr key={i} style={{ borderTop: '1px solid #f4fbf8' }}>
                        <td style={{ padding: '12px 16px', fontSize: '13px', fontWeight: 900, color: INK }}>{t.user}</td>
                        <td style={{ padding: '12px 16px', fontSize: '12px', fontWeight: 700, color: MUTED }}>{t.plan}</td>
                        <td style={{ padding: '12px 16px', fontSize: '13px', fontWeight: 900, color: MINT }}>{t.amount}</td>
                        <td style={{ padding: '12px 16px', fontSize: '12px', fontWeight: 700, color: MUTED }}>{t.date}</td>
                        <td style={{ padding: '12px 16px' }}>{statusBadge(t.status)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
