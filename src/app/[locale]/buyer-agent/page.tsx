'use client'

import { useState, use, useEffect, useRef } from 'react'
import Link from 'next/link'
import Breadcrumb from '@/components/ui/Breadcrumb'
import MessageSellerButton from '@/components/ui/MessageSellerButton'
import { getSupabaseClient } from '@/lib/supabase/client'
import {
  Bot, Zap, Check, Clock, DollarSign, MapPin, Tag,
  ChevronRight, Play, Pause, X, ArrowRight, Sparkles,
  Search, MessageCircle, TrendingDown, Shield, Eye
} from 'lucide-react'

type Locale = 'en' | 'fr' | 'ar' | 'es' | 'de'

const MINT = '#22d4a8'
const INK  = '#161d1b'
const MUTED = '#6b7a76'
const SURFACE = '#f4fbf8'
const FONT = "'Inter', system-ui, sans-serif"

type AgentStep = {
  id: string
  action: string
  detail: string
  icon: string
  status: 'done' | 'active' | 'pending'
}

type MatchedListing = {
  id: string
  title: string
  price: number
  currency: string
  image: string
  sellerId: string
  sellerName: string
  sellerRating: number | null
  city: string | null
}

type ParsedFilters = {
  keywords: string
  maxPrice: number | null
  city: string | null
  source: 'ai' | 'fallback'
}

export default function BuyerAgentPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = use(params)
  const supabase = getSupabaseClient()

  // Setup form
  const [stage, setStage]         = useState<'setup' | 'running' | 'results'>('setup')
  const [itemWanted, setItemWanted] = useState('')
  const [maxBudget, setMaxBudget]   = useState('')
  const [city, setCity]             = useState('')
  const [priority, setPriority]     = useState<'price' | 'speed' | 'trust'>('price')

  // Running/results state
  const [steps, setSteps]           = useState<AgentStep[]>([])
  const [results, setResults]       = useState<MatchedListing[]>([])
  const [parsedFilters, setParsedFilters] = useState<ParsedFilters | null>(null)
  const [running, setRunning]       = useState(false)
  const [searchError, setSearchError] = useState<string | null>(null)
  const stepsEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => { stepsEndRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [steps])

  const addStep = (id: string, action: string, detail: string, icon: string) => {
    setSteps(prev => [...prev.map(s => ({ ...s, status: 'done' as const })), { id, action, detail, icon, status: 'active' as const }])
  }

  // Real flow: parse the natural-language request via /api/buyer-agent
  // (Gemini, with a deterministic regex fallback if the API key is missing
  // or the call fails), then run an actual Supabase search with the parsed
  // filters and return real matching listings — no scripted fake dialogue.
  const runAgent = async () => {
    setStage('running')
    setRunning(true)
    setSteps([])
    setResults([])
    setSearchError(null)

    addStep('parse', 'Understanding your request', `Reading "${itemWanted}"`, '🧠')

    let filters: ParsedFilters
    try {
      const res = await fetch('/api/buyer-agent', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ query: itemWanted }) })
      filters = await res.json()
    } catch {
      filters = { keywords: itemWanted, maxPrice: null, city: null, source: 'fallback' }
    }
    // explicit form fields win over what the AI/parser inferred
    if (maxBudget) filters.maxPrice = Number(maxBudget)
    if (city) filters.city = city
    setParsedFilters(filters)

    addStep('parsed', filters.source === 'ai' ? 'Understood via AI' : 'Understood via keyword match',
      `Searching for "${filters.keywords}"${filters.city ? ` in ${filters.city}` : ''}${filters.maxPrice ? ` under ${filters.maxPrice.toLocaleString()} MAD` : ''}`, '🔍')

    let query = supabase.from('listings').select('*, profiles(id, full_name, rating)').eq('status', 'active')
    if (filters.keywords) query = query.or(`title.ilike.%${filters.keywords}%,description.ilike.%${filters.keywords}%`)
    if (filters.city) query = query.eq('city', filters.city)
    if (filters.maxPrice) query = query.lte('price', filters.maxPrice * 100)
    if (priority === 'price') query = query.order('price', { ascending: true })
    else if (priority === 'speed') query = query.order('created_at', { ascending: false })
    query = query.limit(24)

    const { data, error } = await query

    if (error) {
      setSearchError(error.message)
      setRunning(false)
      return
    }

    let matched: MatchedListing[] = (data || []).map((l: any) => ({
      id: l.id,
      title: l.title,
      price: l.price,
      currency: l.currency,
      image: l.images?.[0] || '',
      sellerId: l.seller_id,
      sellerName: l.profiles?.full_name || 'SouKni User',
      sellerRating: l.profiles?.rating ?? null,
      city: l.city,
    }))

    if (priority === 'trust') {
      matched = [...matched].sort((a, b) => (b.sellerRating || 0) - (a.sellerRating || 0))
    }

    addStep('found', matched.length > 0 ? `Found ${matched.length} real match${matched.length === 1 ? '' : 'es'}` : 'No matches found',
      matched.length > 0 ? `Ranked by ${priority === 'price' ? 'lowest price' : priority === 'speed' ? 'newest first' : 'seller rating'}` : 'Try a broader search or different city', '📋')

    setResults(matched)
    setRunning(false)
    setStage('results')
  }

  return (
    <div style={{ background: SURFACE, minHeight: '100vh', fontFamily: FONT }}>
      <style>{`
        @keyframes agent-pulse { 0%,100%{opacity:1} 50%{opacity:0.5} }
        @keyframes agent-spin { to { transform: rotate(360deg) } }
        @keyframes agent-slide { from{opacity:0;transform:translateX(-10px)} to{opacity:1;transform:translateX(0)} }
      `}</style>

      <div style={{ maxWidth: '760px', margin: '0 auto', padding: '32px 24px 80px' }}>

        <Breadcrumb items={[{ label: 'Home', href: `/${locale}` }, { label: 'AI Buyer Agent' }]} style={{ marginBottom: 20, textTransform: 'none', fontSize: 13, letterSpacing: 'normal' }} />

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '4px' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: `linear-gradient(135deg, #7c3aed, #6d28d9)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Bot size={22} color="white" />
          </div>
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: 900, color: INK, letterSpacing: '-0.05em' }}>AI Buyer Agent</h1>
            <p style={{ fontSize: '13px', color: MUTED, fontWeight: 700 }}>Describe what you want in plain language — it searches real listings for you</p>
          </div>
        </div>

        {/* SETUP */}
        {stage === 'setup' && (
          <div style={{ background: 'white', borderRadius: '24px', padding: '28px', border: '1px solid #e2eae6', marginTop: '24px' }}>
            <div style={{ marginBottom: '18px' }}>
              <label style={{ fontSize: '12px', fontWeight: 900, color: INK, textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', marginBottom: '8px' }}>What are you looking for?</label>
              <input value={itemWanted} onChange={e => setItemWanted(e.target.value)}
                placeholder="e.g. iPhone 15 Pro Max 256GB, mint condition"
                style={{ width: '100%', padding: '13px 16px', borderRadius: '12px', border: '1.5px solid #e2eae6', fontSize: '15px', fontFamily: FONT, fontWeight: 700, color: INK, background: SURFACE, outline: 'none', boxSizing: 'border-box' }}
                onFocus={e => e.target.style.borderColor = '#7c3aed'}
                onBlur={e => e.target.style.borderColor = '#e2eae6'}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '18px' }}>
              <div>
                <label style={{ fontSize: '12px', fontWeight: 900, color: INK, textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', marginBottom: '8px' }}>Max Budget, MAD (optional)</label>
                <input type="number" value={maxBudget} onChange={e => setMaxBudget(e.target.value)}
                  placeholder="Leave blank to let it infer from your request"
                  style={{ width: '100%', padding: '13px 16px', borderRadius: '12px', border: '1.5px solid #e2eae6', fontSize: '15px', fontFamily: FONT, fontWeight: 900, color: INK, background: SURFACE, outline: 'none', boxSizing: 'border-box' }}
                  onFocus={e => e.target.style.borderColor = '#7c3aed'}
                  onBlur={e => e.target.style.borderColor = '#e2eae6'}
                />
              </div>
              <div>
                <label style={{ fontSize: '12px', fontWeight: 900, color: INK, textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', marginBottom: '8px' }}>City (optional)</label>
                <input value={city} onChange={e => setCity(e.target.value)}
                  placeholder="Leave blank to let it infer from your request"
                  style={{ width: '100%', padding: '13px 16px', borderRadius: '12px', border: '1.5px solid #e2eae6', fontSize: '15px', fontFamily: FONT, fontWeight: 700, color: INK, background: SURFACE, outline: 'none', boxSizing: 'border-box' }}
                  onFocus={e => e.target.style.borderColor = '#7c3aed'}
                  onBlur={e => e.target.style.borderColor = '#e2eae6'}
                />
              </div>
            </div>

            <div style={{ marginBottom: '18px' }}>
              <label style={{ fontSize: '12px', fontWeight: 900, color: INK, textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', marginBottom: '8px' }}>Priority</label>
              <div style={{ display: 'flex', gap: '8px' }}>
                {[
                  { key: 'price', emoji: '💰', label: 'Best Price' },
                  { key: 'speed', emoji: '⚡', label: 'Fastest Deal' },
                  { key: 'trust', emoji: '🛡️', label: 'Most Trusted' },
                ].map(p => (
                  <button key={p.key} onClick={() => setPriority(p.key as any)}
                    style={{ flex: 1, padding: '12px 8px', borderRadius: '12px', border: `1.5px solid ${priority === p.key ? '#7c3aed' : '#e2eae6'}`, background: priority === p.key ? '#f5f3ff' : 'white', cursor: 'pointer', fontFamily: FONT, textAlign: 'center' }}>
                    <p style={{ fontSize: '18px', marginBottom: '3px' }}>{p.emoji}</p>
                    <p style={{ fontSize: '11px', fontWeight: 900, color: priority === p.key ? '#7c3aed' : INK }}>{p.label}</p>
                  </button>
                ))}
              </div>
            </div>

            <button onClick={runAgent} disabled={!itemWanted.trim()}
              style={{ width: '100%', padding: '15px', borderRadius: '14px', background: itemWanted.trim() ? `linear-gradient(135deg, #7c3aed, #6d28d9)` : '#e2eae6', color: itemWanted.trim() ? 'white' : MUTED, border: 'none', fontSize: '15px', fontWeight: 900, cursor: itemWanted.trim() ? 'pointer' : 'not-allowed', fontFamily: FONT, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', boxShadow: itemWanted.trim() ? '0 4px 20px rgba(124,58,237,0.3)' : 'none' }}>
              <Bot size={18} /> Search with AI
            </button>

            <div style={{ marginTop: '16px', padding: '12px 14px', background: '#f5f3ff', borderRadius: '10px', display: 'flex', gap: '8px' }}>
              <Sparkles size={14} color="#7c3aed" style={{ flexShrink: 0, marginTop: '1px' }} />
              <p style={{ fontSize: '11px', color: '#6d28d9', fontWeight: 700, lineHeight: 1.5 }}>
                It reads your request, searches real listings on SouKni, and ranks them by your priority. You message the seller yourself from the results — it doesn't negotiate or buy on your behalf.
              </p>
            </div>
          </div>
        )}

        {/* RUNNING */}
        {(stage === 'running') && (
          <div style={{ marginTop: '24px' }}>

            {/* Live status bar */}
            <div style={{ background: `linear-gradient(135deg, ${INK}, #2b3230)`, borderRadius: '18px', padding: '16px 20px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              {running && <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#7c3aed', animation: 'agent-pulse 1s infinite', flexShrink: 0 }} />}
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: '13px', fontWeight: 900, color: 'white' }}>{running ? '🤖 Searching...' : '✅ Done'}</p>
                <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', fontWeight: 700 }}>{steps[steps.length - 1]?.detail || ''}</p>
              </div>
            </div>

            {/* Activity log — real steps: what was actually parsed and queried */}
            <div style={{ background: 'white', borderRadius: '18px', padding: '18px', border: '1px solid #e2eae6' }}>
              <p style={{ fontSize: '12px', fontWeight: 900, color: MUTED, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '12px' }}>Agent Activity Log</p>
              {steps.map((step) => (
                <div key={step.id} style={{ display: 'flex', gap: '10px', marginBottom: '12px', animation: 'agent-slide 0.3s ease', opacity: step.status === 'done' ? 0.6 : 1 }}>
                  <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: step.status === 'active' ? '#f5f3ff' : SURFACE, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '14px' }}>
                    {step.icon}
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: '12px', fontWeight: 900, color: INK }}>{step.action}</p>
                    <p style={{ fontSize: '11px', color: MUTED, fontWeight: 700 }}>{step.detail}</p>
                  </div>
                </div>
              ))}
              <div ref={stepsEndRef} />
            </div>

            {searchError && (
              <div style={{ marginTop: '16px', padding: '14px 16px', background: '#fee2e2', borderRadius: '12px', border: '1px solid #fecaca' }}>
                <p style={{ fontSize: '13px', color: '#dc2626', fontWeight: 700 }}>Search failed: {searchError}</p>
              </div>
            )}
          </div>
        )}

        {/* RESULTS — real matching listings, ranked by the chosen priority.
            No fake negotiation or auto-purchase: you message the seller
            yourself via the real messaging system. */}
        {stage === 'results' && (
          <div style={{ marginTop: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <p style={{ fontSize: '13px', fontWeight: 900, color: INK }}>
                {results.length} result{results.length === 1 ? '' : 's'}{parsedFilters ? ` for "${parsedFilters.keywords}"` : ''}
              </p>
              <button onClick={() => { setStage('setup'); setSteps([]); setResults([]); setItemWanted(''); setMaxBudget(''); setCity('') }}
                style={{ padding: '8px 16px', borderRadius: '10px', border: '1.5px solid #e2eae6', background: 'white', fontSize: '12px', fontWeight: 900, cursor: 'pointer', fontFamily: FONT, color: INK }}>
                New Search
              </button>
            </div>

            {results.length === 0 ? (
              <div style={{ background: 'white', borderRadius: '20px', padding: '48px 24px', border: '1px solid #e2eae6', textAlign: 'center' }}>
                <Search size={28} color={MUTED} style={{ marginBottom: '12px' }} />
                <p style={{ fontSize: '14px', fontWeight: 900, color: INK, marginBottom: '4px' }}>No matching listings found</p>
                <p style={{ fontSize: '13px', color: MUTED, fontWeight: 700 }}>Try a broader description, or remove the city/budget filters.</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {results.map(r => (
                  <div key={r.id} style={{ background: 'white', borderRadius: '16px', padding: '14px', border: '1px solid #e2eae6', display: 'flex', gap: '14px', alignItems: 'center' }}>
                    <img src={r.image} alt="" style={{ width: '64px', height: '64px', borderRadius: '12px', objectFit: 'cover', flexShrink: 0 }} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontSize: '13px', fontWeight: 900, color: INK, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{r.title}</p>
                      <p style={{ fontSize: '15px', fontWeight: 900, color: MINT, marginBottom: '2px' }}>{Math.round(r.price / 100).toLocaleString()} {r.currency}</p>
                      <p style={{ fontSize: '11px', color: MUTED, fontWeight: 700 }}>
                        {r.sellerName}{r.sellerRating ? ` · ★ ${r.sellerRating}` : ''}{r.city ? ` · ${r.city}` : ''}
                      </p>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flexShrink: 0 }}>
                      <Link href={`/${locale}/listing/${r.id}`}
                        style={{ padding: '9px 16px', borderRadius: '10px', background: SURFACE, border: '1px solid #e2eae6', color: INK, textDecoration: 'none', fontSize: '12px', fontWeight: 900, textAlign: 'center' }}>
                        View
                      </Link>
                      <MessageSellerButton listingId={r.id} sellerId={r.sellerId}
                        style={{ padding: '9px 16px', borderRadius: '10px', background: MINT, color: 'white', fontSize: '12px', fontWeight: 900 }}>
                        Message
                      </MessageSellerButton>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
