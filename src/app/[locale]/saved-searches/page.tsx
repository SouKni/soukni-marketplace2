'use client'

import { useState, use } from 'react'
import Link from 'next/link'
import { Bell, Search, ChevronRight, Plus, Trash2, Check, X, MapPin, Tag, SlidersHorizontal, TrendingDown, Zap, Clock } from 'lucide-react'

type Locale = 'en' | 'fr' | 'ar' | 'es' | 'de'

const MINT    = '#22d4a8'
const CREAM   = '#f5ede0'
const SURFACE = '#f4fbf8'
const INK     = '#161d1b'
const MUTED   = '#6b7a76'
const FONT    = "'Inter', system-ui, sans-serif"

type FrequencyKey = 'instant' | 'daily' | 'weekly'

type SavedSearch = {
  id: string
  query: string
  category: string
  city: string
  minPrice: number | null
  maxPrice: number | null
  condition: string | null
  frequency: FrequencyKey
  active: boolean
  createdAt: string
  newResults: number
  lastChecked: string
  totalFound: number
}

const MOCK_SEARCHES: SavedSearch[] = [
  { id: '1', query: 'iPhone 15 Pro', category: 'Electronics', city: 'Rabat', minPrice: null, maxPrice: 12000, condition: 'Like New', frequency: 'instant', active: true, createdAt: '3 days ago', newResults: 4, lastChecked: '10 min ago', totalFound: 23 },
  { id: '2', query: 'BMW Série 3', category: 'Motors', city: 'Casablanca', minPrice: 200000, maxPrice: 600000, condition: null, frequency: 'daily', active: true, createdAt: '1 week ago', newResults: 1, lastChecked: '2h ago', totalFound: 8 },
  { id: '3', query: 'Appartement Agdal', category: 'Property', city: 'Rabat', minPrice: null, maxPrice: 20000, condition: null, frequency: 'daily', active: false, createdAt: '2 weeks ago', newResults: 0, lastChecked: '1d ago', totalFound: 15 },
  { id: '4', query: 'MacBook Pro M3', category: 'Electronics', city: 'All Morocco', minPrice: null, maxPrice: 25000, condition: 'New', frequency: 'weekly', active: true, createdAt: '1 month ago', newResults: 0, lastChecked: '5d ago', totalFound: 6 },
]

const FREQUENCY_OPTIONS: { key: FrequencyKey; label: string; desc: string; icon: React.ReactNode }[] = [
  { key: 'instant', label: 'Instant', desc: 'Notified immediately', icon: <Zap size={14} color="#f59e0b" /> },
  { key: 'daily',   label: 'Daily',   desc: 'Once per day digest', icon: <Clock size={14} color={MINT} /> },
  { key: 'weekly',  label: 'Weekly',  desc: 'Weekly summary',      icon: <Bell size={14} color="#8b5cf6" /> },
]

const CATEGORIES = ['All Categories', 'Electronics', 'Motors', 'Property', 'Fashion', 'Home & Living', 'The Vault', 'Jobs', 'Services']
const CITIES     = ['All Morocco', 'Rabat', 'Casablanca', 'Marrakech', 'Fès', 'Tangier', 'Agadir']
const CONDITIONS = ['Any Condition', 'New', 'Like New', 'Good', 'Fair']

export default function SavedSearchesPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = use(params)

  const [searches, setSearches]     = useState<SavedSearch[]>(MOCK_SEARCHES)
  const [showCreate, setShowCreate] = useState(false)
  const [toast, setToast]           = useState<string | null>(null)

  // New search form
  const [newQuery, setNewQuery]         = useState('')
  const [newCategory, setNewCategory]   = useState('All Categories')
  const [newCity, setNewCity]           = useState('All Morocco')
  const [newMinPrice, setNewMinPrice]   = useState('')
  const [newMaxPrice, setNewMaxPrice]   = useState('')
  const [newCondition, setNewCondition] = useState('Any Condition')
  const [newFrequency, setNewFrequency] = useState<FrequencyKey>('daily')

  const showToast = (msg: string) => {
    setToast(msg)
    setTimeout(() => setToast(null), 2500)
  }

  const toggleActive = (id: string) => {
    setSearches(prev => prev.map(s => s.id === id ? { ...s, active: !s.active } : s))
    const s = searches.find(s => s.id === id)
    showToast(s?.active ? '🔕 Alert paused' : '🔔 Alert activated')
  }

  const deleteSearch = (id: string) => {
    setSearches(prev => prev.filter(s => s.id !== id))
    showToast('✕ Saved search deleted')
  }

  const updateFrequency = (id: string, freq: FrequencyKey) => {
    setSearches(prev => prev.map(s => s.id === id ? { ...s, frequency: freq } : s))
    showToast(`📅 Alerts set to ${freq}`)
  }

  const createSearch = () => {
    if (!newQuery.trim()) return
    const newSearch: SavedSearch = {
      id: Date.now().toString(),
      query: newQuery,
      category: newCategory === 'All Categories' ? 'All' : newCategory,
      city: newCity,
      minPrice: newMinPrice ? Number(newMinPrice) : null,
      maxPrice: newMaxPrice ? Number(newMaxPrice) : null,
      condition: newCondition === 'Any Condition' ? null : newCondition,
      frequency: newFrequency,
      active: true,
      createdAt: 'Just now',
      newResults: 0,
      lastChecked: 'Just now',
      totalFound: Math.floor(Math.random() * 50),
    }
    setSearches(prev => [newSearch, ...prev])
    setShowCreate(false)
    setNewQuery('')
    setNewCategory('All Categories')
    setNewCity('All Morocco')
    setNewMinPrice('')
    setNewMaxPrice('')
    setNewCondition('Any Condition')
    setNewFrequency('daily')
    showToast('🔔 Saved search created — we\'ll alert you of new matches!')
  }

  const freqColor: Record<FrequencyKey, string> = {
    instant: '#f59e0b',
    daily:   MINT,
    weekly:  '#8b5cf6',
  }

  const totalNew = searches.reduce((s, sr) => s + (sr.active ? sr.newResults : 0), 0)

  const inputStyle = {
    width: '100%', padding: '10px 14px', borderRadius: '10px',
    border: '1.5px solid #e2eae6', fontSize: '13px',
    fontFamily: FONT, fontWeight: 700, color: INK,
    background: SURFACE, outline: 'none',
    boxSizing: 'border-box' as const, transition: 'border-color 0.2s'
  }

  return (
    <div style={{ background: SURFACE, minHeight: '100vh', fontFamily: FONT }}>

      {/* Toast */}
      {toast && (
        <div style={{ position: 'fixed', top: '90px', left: '50%', transform: 'translateX(-50%)', background: INK, color: 'white', padding: '12px 24px', borderRadius: '100px', fontSize: '13px', fontWeight: 900, zIndex: 1000, boxShadow: '0 8px 24px rgba(0,0,0,0.2)', letterSpacing: '-0.03em', whiteSpace: 'nowrap' }}>
          {toast}
        </div>
      )}

      <div style={{ maxWidth: '760px', margin: '0 auto', padding: '32px 24px 80px' }}>

        {/* Breadcrumb */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '20px' }}>
          <Link href={`/${locale}`} style={{ fontSize: '13px', color: MUTED, textDecoration: 'none', fontWeight: 700 }}>Home</Link>
          <ChevronRight size={13} color={MUTED} />
          <span style={{ fontSize: '13px', fontWeight: 900, color: INK }}>Saved Searches</span>
        </nav>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '13px', background: 'linear-gradient(135deg, #22d4a8, #0f9b8e)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
              <Bell size={20} color="white" />
              {totalNew > 0 && (
                <div style={{ position: 'absolute', top: '-4px', right: '-4px', width: '18px', height: '18px', borderRadius: '50%', background: '#ef4444', border: '2px solid #f4fbf8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: '9px', fontWeight: 900, color: 'white' }}>{totalNew}</span>
                </div>
              )}
            </div>
            <div>
              <h1 style={{ fontSize: '24px', fontWeight: 900, color: INK, letterSpacing: '-0.05em', marginBottom: '2px' }}>Saved Searches</h1>
              <p style={{ fontSize: '13px', color: MUTED, fontWeight: 700 }}>
                {searches.filter(s => s.active).length} active alerts
                {totalNew > 0 && <span style={{ color: MINT, marginLeft: '6px' }}>· {totalNew} new matches</span>}
              </p>
            </div>
          </div>
          <button onClick={() => setShowCreate(!showCreate)}
            style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '11px 20px', borderRadius: '12px', background: MINT, color: 'white', border: 'none', fontSize: '13px', fontWeight: 900, cursor: 'pointer', fontFamily: FONT }}>
            <Plus size={15} /> New Alert
          </button>
        </div>

        {/* CREATE FORM */}
        {showCreate && (
          <div style={{ background: 'white', borderRadius: '20px', padding: '24px', border: `1.5px solid ${MINT}`, marginBottom: '20px', boxShadow: '0 4px 24px rgba(34,212,168,0.1)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 900, color: INK, letterSpacing: '-0.05em' }}>Create New Alert</h3>
              <button onClick={() => setShowCreate(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex' }}>
                <X size={18} color={MUTED} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {/* Keyword */}
              <div>
                <label style={{ fontSize: '11px', fontWeight: 900, color: INK, textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', marginBottom: '6px' }}>Keyword *</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', ...inputStyle, height: '42px', width: 'auto' }}>
                  <Search size={15} color={MUTED} />
                  <input value={newQuery} onChange={e => setNewQuery(e.target.value)} placeholder="e.g. iPhone 15 Pro, BMW, Appartement Agdal..."
                    style={{ flex: 1, border: 'none', background: 'transparent', outline: 'none', fontSize: '13px', fontFamily: FONT, fontWeight: 700, color: INK }}
                    onFocus={e => (e.target.parentElement!.style.borderColor = MINT)}
                    onBlur={e => (e.target.parentElement!.style.borderColor = '#e2eae6')}
                  />
                </div>
              </div>

              {/* Category + City */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ fontSize: '11px', fontWeight: 900, color: INK, textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', marginBottom: '6px' }}>Category</label>
                  <select value={newCategory} onChange={e => setNewCategory(e.target.value)} style={{ ...inputStyle, appearance: 'none' as const }}
                    onFocus={e => e.target.style.borderColor = MINT}
                    onBlur={e => e.target.style.borderColor = '#e2eae6'}
                  >
                    {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: '11px', fontWeight: 900, color: INK, textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', marginBottom: '6px' }}>City</label>
                  <select value={newCity} onChange={e => setNewCity(e.target.value)} style={{ ...inputStyle, appearance: 'none' as const }}
                    onFocus={e => e.target.style.borderColor = MINT}
                    onBlur={e => e.target.style.borderColor = '#e2eae6'}
                  >
                    {CITIES.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
              </div>

              {/* Price range + Condition */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ fontSize: '11px', fontWeight: 900, color: INK, textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', marginBottom: '6px' }}>Min Price (MAD)</label>
                  <input type="number" value={newMinPrice} onChange={e => setNewMinPrice(e.target.value)} placeholder="0" style={inputStyle}
                    onFocus={e => e.target.style.borderColor = MINT}
                    onBlur={e => e.target.style.borderColor = '#e2eae6'}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '11px', fontWeight: 900, color: INK, textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', marginBottom: '6px' }}>Max Price (MAD)</label>
                  <input type="number" value={newMaxPrice} onChange={e => setNewMaxPrice(e.target.value)} placeholder="Any" style={inputStyle}
                    onFocus={e => e.target.style.borderColor = MINT}
                    onBlur={e => e.target.style.borderColor = '#e2eae6'}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '11px', fontWeight: 900, color: INK, textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', marginBottom: '6px' }}>Condition</label>
                  <select value={newCondition} onChange={e => setNewCondition(e.target.value)} style={{ ...inputStyle, appearance: 'none' as const }}
                    onFocus={e => e.target.style.borderColor = MINT}
                    onBlur={e => e.target.style.borderColor = '#e2eae6'}
                  >
                    {CONDITIONS.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
              </div>

              {/* Frequency */}
              <div>
                <label style={{ fontSize: '11px', fontWeight: 900, color: INK, textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', marginBottom: '8px' }}>Alert Frequency</label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  {FREQUENCY_OPTIONS.map(f => (
                    <button key={f.key} onClick={() => setNewFrequency(f.key)}
                      style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', padding: '10px 8px', borderRadius: '10px', border: `1.5px solid ${newFrequency === f.key ? freqColor[f.key] : '#e2eae6'}`, background: newFrequency === f.key ? `${freqColor[f.key]}15` : 'white', cursor: 'pointer', fontFamily: FONT, transition: 'all 0.15s' }}>
                      {f.icon}
                      <span style={{ fontSize: '12px', fontWeight: 900, color: newFrequency === f.key ? freqColor[f.key] : INK }}>{f.label}</span>
                      <span style={{ fontSize: '10px', fontWeight: 700, color: MUTED, textAlign: 'center' }}>{f.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              <button onClick={createSearch}
                disabled={!newQuery.trim()}
                style={{ width: '100%', padding: '12px', borderRadius: '12px', background: newQuery.trim() ? MINT : '#e2eae6', color: newQuery.trim() ? 'white' : MUTED, border: 'none', fontSize: '14px', fontWeight: 900, cursor: newQuery.trim() ? 'pointer' : 'not-allowed', fontFamily: FONT, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', transition: 'all 0.2s' }}>
                <Bell size={15} /> Create Alert
              </button>
            </div>
          </div>
        )}

        {/* EMPTY STATE */}
        {searches.length === 0 && (
          <div style={{ background: 'white', borderRadius: '20px', padding: '64px 20px', textAlign: 'center', border: '1px solid #e2eae6' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '18px', background: SURFACE, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
              <Bell size={28} color={MUTED} />
            </div>
            <p style={{ fontSize: '16px', fontWeight: 900, color: INK, marginBottom: '6px', letterSpacing: '-0.03em' }}>No saved searches yet</p>
            <p style={{ fontSize: '13px', color: MUTED, fontWeight: 700, marginBottom: '20px' }}>Search for something and click "Save Search" to get alerts</p>
            <Link href={`/${locale}/search`} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '11px 22px', borderRadius: '10px', background: MINT, color: 'white', textDecoration: 'none', fontSize: '13px', fontWeight: 900 }}>
              <Search size={14} /> Start Searching
            </Link>
          </div>
        )}

        {/* SEARCH LIST */}
        {searches.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {searches.map(s => (
              <div key={s.id} style={{ background: 'white', borderRadius: '18px', border: `1.5px solid ${s.active && s.newResults > 0 ? MINT : '#e2eae6'}`, overflow: 'hidden', transition: 'border-color 0.2s' }}>

                {/* New results banner */}
                {s.active && s.newResults > 0 && (
                  <div style={{ background: `linear-gradient(90deg, ${MINT}, #0f9b8e)`, padding: '8px 18px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Zap size={13} color="white" />
                    <span style={{ fontSize: '12px', fontWeight: 900, color: 'white' }}>
                      {s.newResults} new result{s.newResults !== 1 ? 's' : ''} since your last check
                    </span>
                    <Link href={`/${locale}/search?q=${encodeURIComponent(s.query)}`}
                      style={{ marginLeft: 'auto', fontSize: '11px', fontWeight: 900, color: 'white', textDecoration: 'none', opacity: 0.85, display: 'flex', alignItems: 'center', gap: '4px' }}>
                      View all <ChevronRight size={12} />
                    </Link>
                  </div>
                )}

                <div style={{ padding: '18px 20px' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px' }}>

                    {/* Search info */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px', flexWrap: 'wrap' }}>
                        <Link href={`/${locale}/search?q=${encodeURIComponent(s.query)}`}
                          style={{ fontSize: '15px', fontWeight: 900, color: INK, letterSpacing: '-0.03em', textDecoration: 'none' }}>
                          🔍 {s.query}
                        </Link>
                        {!s.active && <span style={{ fontSize: '10px', fontWeight: 900, padding: '2px 8px', borderRadius: '100px', background: '#f4fbf8', color: MUTED, border: '1px solid #e2eae6' }}>Paused</span>}
                      </div>

                      {/* Filters */}
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '10px' }}>
                        {[
                          s.category !== 'All' && { icon: <Tag size={10} />, label: s.category },
                          { icon: <MapPin size={10} />, label: s.city },
                          (s.minPrice || s.maxPrice) && { icon: null, label: `${s.minPrice ? s.minPrice.toLocaleString() : '0'} – ${s.maxPrice ? s.maxPrice.toLocaleString() : '∞'} MAD` },
                          s.condition && { icon: null, label: s.condition },
                        ].filter(Boolean).map((tag: any, i) => (
                          <span key={i} style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', fontWeight: 700, padding: '3px 9px', borderRadius: '100px', background: SURFACE, color: MUTED, border: '1px solid #e2eae6' }}>
                            {tag.icon} {tag.label}
                          </span>
                        ))}
                      </div>

                      {/* Meta */}
                      <p style={{ fontSize: '11px', color: MUTED, fontWeight: 700 }}>
                        {s.totalFound} total matches · Created {s.createdAt} · Last checked {s.lastChecked}
                      </p>
                    </div>

                    {/* Controls */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '10px', flexShrink: 0 }}>
                      {/* Active toggle */}
                      <div onClick={() => toggleActive(s.id)}
                        style={{ width: '44px', height: '24px', borderRadius: '12px', background: s.active ? MINT : '#e2eae6', position: 'relative', cursor: 'pointer', transition: 'background 0.2s', flexShrink: 0 }}>
                        <div style={{ position: 'absolute', top: '2px', left: s.active ? '22px' : '2px', width: '20px', height: '20px', borderRadius: '50%', background: 'white', transition: 'left 0.2s', boxShadow: '0 1px 4px rgba(0,0,0,0.2)' }} />
                      </div>

                      {/* Delete */}
                      <button onClick={() => deleteSearch(s.id)}
                        style={{ width: '30px', height: '30px', borderRadius: '8px', background: '#fee2e2', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.15s' }}
                        onMouseEnter={e => e.currentTarget.style.background = '#fecaca'}
                        onMouseLeave={e => e.currentTarget.style.background = '#fee2e2'}
                      >
                        <Trash2 size={13} color="#ef4444" />
                      </button>
                    </div>
                  </div>

                  {/* Frequency selector */}
                  <div style={{ display: 'flex', gap: '6px', paddingTop: '12px', borderTop: '1px solid #f4fbf8' }}>
                    <span style={{ fontSize: '11px', fontWeight: 700, color: MUTED, marginRight: '4px', display: 'flex', alignItems: 'center' }}>Alert frequency:</span>
                    {FREQUENCY_OPTIONS.map(f => (
                      <button key={f.key} onClick={() => updateFrequency(s.id, f.key)}
                        style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '4px 10px', borderRadius: '100px', border: `1.5px solid ${s.frequency === f.key ? freqColor[f.key] : '#e2eae6'}`, background: s.frequency === f.key ? `${freqColor[f.key]}15` : 'white', cursor: 'pointer', fontFamily: FONT, fontSize: '11px', fontWeight: 900, color: s.frequency === f.key ? freqColor[f.key] : MUTED, transition: 'all 0.15s' }}>
                        {f.icon} {f.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Info card */}
        <div style={{ background: 'white', borderRadius: '16px', padding: '18px 20px', border: '1px solid #e2eae6', marginTop: '20px', display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: SURFACE, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <TrendingDown size={18} color={MINT} />
          </div>
          <div>
            <p style={{ fontSize: '13px', fontWeight: 900, color: INK, marginBottom: '4px' }}>Price Drop Alerts</p>
            <p style={{ fontSize: '12px', color: MUTED, fontWeight: 700, lineHeight: 1.5 }}>
              Save any item from a listing page and we'll alert you automatically if the price drops. No setup needed.
              {' '}<Link href={`/${locale}/favorites`} style={{ color: MINT, fontWeight: 900, textDecoration: 'none' }}>View Favorites →</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
