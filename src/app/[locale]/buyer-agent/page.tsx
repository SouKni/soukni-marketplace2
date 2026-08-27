'use client'

import { useState, use, useEffect, useRef } from 'react'
import Link from 'next/link'
import Breadcrumb from '@/components/ui/Breadcrumb'
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
  time: string
  icon: string
  status: 'done' | 'active' | 'pending'
}

type Candidate = {
  id: string
  title: string
  price: number
  image: string
  seller: string
  matchScore: number
  city: string
  status: 'evaluating' | 'contacted' | 'negotiating' | 'rejected' | 'selected'
  negotiatedPrice?: number
}

const MOCK_CANDIDATES: Candidate[] = [
  { id: '1', title: 'iPhone 15 Pro Max 256GB — Mint', price: 12500, image: 'https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&w=300', seller: 'Sara B.', matchScore: 96, city: 'Rabat', status: 'selected', negotiatedPrice: 11200 },
  { id: '2', title: 'iPhone 15 Pro Max 256GB Titanium', price: 13200, image: 'https://images.pexels.com/photos/5750001/pexels-photo-5750001.jpeg?auto=compress&w=300', seller: 'Karim O.', matchScore: 91, city: 'Rabat', status: 'rejected' },
  { id: '3', title: 'iPhone 15 Pro Max 256GB Blue', price: 12800, image: 'https://images.pexels.com/photos/5750001/pexels-photo-5750001.jpeg?auto=compress&w=300', seller: 'Nadia F.', matchScore: 88, city: 'Rabat', status: 'rejected' },
]

export default function BuyerAgentPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = use(params)

  // Setup form
  const [stage, setStage]         = useState<'setup' | 'running' | 'complete'>('setup')
  const [itemWanted, setItemWanted] = useState('')
  const [maxBudget, setMaxBudget]   = useState('')
  const [city, setCity]             = useState('Rabat')
  const [priority, setPriority]     = useState<'price' | 'speed' | 'trust'>('price')
  const [autoApprove, setAutoApprove] = useState(false)

  // Running state
  const [steps, setSteps]           = useState<AgentStep[]>([])
  const [candidates, setCandidates] = useState<Candidate[]>([])
  const [currentAction, setCurrentAction] = useState('')
  const [needsApproval, setNeedsApproval] = useState(false)
  const [running, setRunning]       = useState(false)
  const stepsEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => { stepsEndRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [steps])

  const AGENT_SCRIPT: Omit<AgentStep, 'id' | 'time' | 'status'>[] = [
    { action: 'Searching marketplace', detail: `Looking for "${itemWanted}" in ${city} under ${maxBudget} MAD`, icon: '🔍' },
    { action: 'Found 12 matching listings', detail: 'Filtering by relevance, price, and seller trust score', icon: '📋' },
    { action: 'Shortlisted top 3 candidates', detail: 'Based on your priority: ' + priority, icon: '🎯' },
    { action: 'Analysing seller trust', detail: 'Checking ratings, reviews, and scam risk for each', icon: '🛡️' },
    { action: 'Messaging Sara B.', detail: 'Sending initial inquiry about iPhone availability', icon: '💬' },
    { action: 'Negotiating with Sara B.', detail: 'Proposing 11,200 MAD (10% below asking)', icon: '🤝' },
    { action: 'Seller responded', detail: 'Sara accepted 11,200 MAD — best match found!', icon: '✅' },
    { action: 'Ready for your approval', detail: 'Review the deal before I finalize it', icon: '👀' },
  ]

  const runAgent = async () => {
    setStage('running')
    setRunning(true)
    setSteps([])
    setCandidates([])

    for (let i = 0; i < AGENT_SCRIPT.length; i++) {
      await new Promise(r => setTimeout(r, 1400))
      const step = AGENT_SCRIPT[i]
      setCurrentAction(step.action)
      setSteps(prev => [
        ...prev.map(s => ({ ...s, status: 'done' as const })),
        { ...step, id: i.toString(), time: 'now', status: 'active' as const }
      ])

      if (i === 2) setCandidates(MOCK_CANDIDATES.map(c => ({ ...c, status: 'evaluating' as const })))
      if (i === 4) setCandidates(prev => prev.map(c => c.id === '1' ? { ...c, status: 'contacted' } : c))
      if (i === 5) setCandidates(prev => prev.map(c => c.id === '1' ? { ...c, status: 'negotiating' } : c))
      if (i === 6) setCandidates(prev => prev.map(c =>
        c.id === '1' ? { ...c, status: 'selected' } : { ...c, status: 'rejected' }
      ))
      if (i === AGENT_SCRIPT.length - 1) {
        setNeedsApproval(true)
        setRunning(false)
      }
    }
  }

  const approveDeal = () => {
    setNeedsApproval(false)
    setStage('complete')
  }

  const selectedCandidate = candidates.find(c => c.status === 'selected')

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
            <p style={{ fontSize: '13px', color: MUTED, fontWeight: 700 }}>Tell it what you want — it finds, negotiates, and buys for you</p>
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
                <label style={{ fontSize: '12px', fontWeight: 900, color: INK, textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', marginBottom: '8px' }}>Max Budget (MAD)</label>
                <input type="number" value={maxBudget} onChange={e => setMaxBudget(e.target.value)}
                  placeholder="e.g. 13000"
                  style={{ width: '100%', padding: '13px 16px', borderRadius: '12px', border: '1.5px solid #e2eae6', fontSize: '15px', fontFamily: FONT, fontWeight: 900, color: INK, background: SURFACE, outline: 'none', boxSizing: 'border-box' }}
                  onFocus={e => e.target.style.borderColor = '#7c3aed'}
                  onBlur={e => e.target.style.borderColor = '#e2eae6'}
                />
              </div>
              <div>
                <label style={{ fontSize: '12px', fontWeight: 900, color: INK, textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', marginBottom: '8px' }}>City</label>
                <input value={city} onChange={e => setCity(e.target.value)}
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

            {/* Autonomy level */}
            <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', background: SURFACE, borderRadius: '12px', border: '1.5px solid #e2eae6', cursor: 'pointer', marginBottom: '20px' }}>
              <div>
                <p style={{ fontSize: '13px', fontWeight: 900, color: INK }}>🚀 Full Autonomy Mode</p>
                <p style={{ fontSize: '11px', color: MUTED, fontWeight: 700 }}>{autoApprove ? 'Agent completes the deal automatically' : 'Agent asks for your approval before finalizing'}</p>
              </div>
              <div onClick={() => setAutoApprove(!autoApprove)}
                style={{ width: '44px', height: '24px', borderRadius: '12px', background: autoApprove ? '#7c3aed' : '#e2eae6', position: 'relative', flexShrink: 0, cursor: 'pointer', transition: 'background 0.2s' }}>
                <div style={{ position: 'absolute', top: '2px', left: autoApprove ? '22px' : '2px', width: '20px', height: '20px', borderRadius: '50%', background: 'white', transition: 'left 0.2s' }} />
              </div>
            </label>

            <button onClick={runAgent} disabled={!itemWanted || !maxBudget}
              style={{ width: '100%', padding: '15px', borderRadius: '14px', background: itemWanted && maxBudget ? `linear-gradient(135deg, #7c3aed, #6d28d9)` : '#e2eae6', color: itemWanted && maxBudget ? 'white' : MUTED, border: 'none', fontSize: '15px', fontWeight: 900, cursor: itemWanted && maxBudget ? 'pointer' : 'not-allowed', fontFamily: FONT, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', boxShadow: itemWanted && maxBudget ? '0 4px 20px rgba(124,58,237,0.3)' : 'none' }}>
              <Bot size={18} /> Activate AI Buyer Agent
            </button>

            <div style={{ marginTop: '16px', padding: '12px 14px', background: '#f5f3ff', borderRadius: '10px', display: 'flex', gap: '8px' }}>
              <Sparkles size={14} color="#7c3aed" style={{ flexShrink: 0, marginTop: '1px' }} />
              <p style={{ fontSize: '11px', color: '#6d28d9', fontWeight: 700, lineHeight: 1.5 }}>
                Your agent will search, evaluate sellers, negotiate prices, and either complete the purchase (if Full Autonomy is on) or present you the best deal to approve.
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
                <p style={{ fontSize: '13px', fontWeight: 900, color: 'white' }}>{running ? '🤖 Agent working...' : '✅ Agent finished'}</p>
                <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', fontWeight: 700 }}>{currentAction}</p>
              </div>
            </div>

            {/* Candidates being evaluated */}
            {candidates.length > 0 && (
              <div style={{ background: 'white', borderRadius: '18px', padding: '18px', border: '1px solid #e2eae6', marginBottom: '16px' }}>
                <p style={{ fontSize: '12px', fontWeight: 900, color: MUTED, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '12px' }}>Evaluating Candidates</p>
                {candidates.map(c => (
                  <div key={c.id} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px', borderRadius: '12px', background: c.status === 'selected' ? '#f0fdf9' : c.status === 'rejected' ? '#fafafa' : SURFACE, border: `1.5px solid ${c.status === 'selected' ? MINT : '#e2eae6'}`, marginBottom: '8px', opacity: c.status === 'rejected' ? 0.5 : 1, animation: 'agent-slide 0.4s ease' }}>
                    <img src={c.image} alt="" style={{ width: '44px', height: '44px', borderRadius: '10px', objectFit: 'cover', flexShrink: 0 }} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontSize: '12px', fontWeight: 900, color: INK, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.title}</p>
                      <p style={{ fontSize: '11px', color: MUTED, fontWeight: 700 }}>{c.seller} · {c.matchScore}% match</p>
                    </div>
                    <div style={{ textAlign: 'right', flexShrink: 0 }}>
                      {c.negotiatedPrice ? (
                        <>
                          <p style={{ fontSize: '10px', color: MUTED, textDecoration: 'line-through' }}>{c.price.toLocaleString()}</p>
                          <p style={{ fontSize: '13px', fontWeight: 900, color: MINT }}>{c.negotiatedPrice.toLocaleString()} MAD</p>
                        </>
                      ) : (
                        <p style={{ fontSize: '13px', fontWeight: 900, color: INK }}>{c.price.toLocaleString()} MAD</p>
                      )}
                    </div>
                    <span style={{ fontSize: '10px', fontWeight: 900, padding: '3px 8px', borderRadius: '100px', flexShrink: 0,
                      background: c.status === 'selected' ? MINT : c.status === 'rejected' ? '#e2eae6' : c.status === 'negotiating' ? '#f59e0b' : '#0891b2',
                      color: 'white' }}>
                      {c.status === 'selected' ? '✓ Selected' : c.status === 'rejected' ? 'Not chosen' : c.status === 'negotiating' ? 'Negotiating' : c.status === 'contacted' ? 'Contacted' : 'Evaluating'}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Activity log */}
            <div style={{ background: 'white', borderRadius: '18px', padding: '18px', border: '1px solid #e2eae6', maxHeight: '260px', overflowY: 'auto' }}>
              <p style={{ fontSize: '12px', fontWeight: 900, color: MUTED, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '12px' }}>Agent Activity Log</p>
              {steps.map((step, i) => (
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

            {/* Approval needed */}
            {needsApproval && selectedCandidate && (
              <div style={{ background: '#f0fdf9', borderRadius: '20px', padding: '24px', border: `1.5px solid ${MINT}`, marginTop: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                  <Sparkles size={20} color={MINT} />
                  <p style={{ fontSize: '16px', fontWeight: 900, color: INK, letterSpacing: '-0.03em' }}>Best deal found! Approve to complete</p>
                </div>
                <div style={{ display: 'flex', gap: '12px', marginBottom: '16px', padding: '14px', background: 'white', borderRadius: '14px' }}>
                  <img src={selectedCandidate.image} alt="" style={{ width: '56px', height: '56px', borderRadius: '12px', objectFit: 'cover', flexShrink: 0 }} />
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: '13px', fontWeight: 900, color: INK, marginBottom: '2px' }}>{selectedCandidate.title}</p>
                    <p style={{ fontSize: '11px', color: MUTED, fontWeight: 700 }}>Seller: {selectedCandidate.seller} · {selectedCandidate.city}</p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ fontSize: '11px', color: MUTED, textDecoration: 'line-through' }}>{selectedCandidate.price.toLocaleString()} MAD</p>
                    <p style={{ fontSize: '18px', fontWeight: 900, color: MINT }}>{selectedCandidate.negotiatedPrice?.toLocaleString()} MAD</p>
                    <p style={{ fontSize: '10px', color: MINT, fontWeight: 900 }}>Saved {((selectedCandidate.price - (selectedCandidate.negotiatedPrice||0))).toLocaleString()} MAD</p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button onClick={() => setStage('setup')}
                    style={{ padding: '12px 20px', borderRadius: '12px', border: '1.5px solid #e2eae6', background: 'white', fontSize: '13px', fontWeight: 900, cursor: 'pointer', fontFamily: FONT, color: INK }}>
                    Decline
                  </button>
                  <button onClick={approveDeal}
                    style={{ flex: 1, padding: '12px', borderRadius: '12px', background: `linear-gradient(135deg, ${MINT}, #0f9b8e)`, border: 'none', color: 'white', fontSize: '14px', fontWeight: 900, cursor: 'pointer', fontFamily: FONT, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                    <Check size={16} /> Approve & Complete Purchase
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* COMPLETE */}
        {stage === 'complete' && selectedCandidate && (
          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <div style={{ width: '80px', height: '80px', background: `linear-gradient(135deg, ${MINT}, #0f9b8e)`, borderRadius: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
              <Check size={40} color="white" strokeWidth={2.5} />
            </div>
            <h2 style={{ fontSize: '26px', fontWeight: 900, color: INK, marginBottom: '8px', letterSpacing: '-0.05em' }}>Deal Complete! 🎉</h2>
            <p style={{ fontSize: '14px', color: MUTED, fontWeight: 700, marginBottom: '28px' }}>
              Your AI agent found and negotiated this deal in <strong style={{ color: INK }}>47 seconds</strong>
            </p>
            <div style={{ background: 'white', borderRadius: '20px', padding: '20px', border: '1px solid #e2eae6', maxWidth: '400px', margin: '0 auto 24px', textAlign: 'left' }}>
              <div style={{ display: 'flex', gap: '12px', marginBottom: '14px' }}>
                <img src={selectedCandidate.image} alt="" style={{ width: '56px', height: '56px', borderRadius: '12px', objectFit: 'cover' }} />
                <div>
                  <p style={{ fontSize: '13px', fontWeight: 900, color: INK }}>{selectedCandidate.title}</p>
                  <p style={{ fontSize: '16px', fontWeight: 900, color: MINT }}>{selectedCandidate.negotiatedPrice?.toLocaleString()} MAD</p>
                </div>
              </div>
              <p style={{ fontSize: '12px', color: MUTED, fontWeight: 700 }}>
                Original price: {selectedCandidate.price.toLocaleString()} MAD · You saved {((selectedCandidate.price - (selectedCandidate.negotiatedPrice||0))).toLocaleString()} MAD ({Math.round((1-(selectedCandidate.negotiatedPrice||0)/selectedCandidate.price)*100)}%)
              </p>
            </div>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
              <button onClick={() => { setStage('setup'); setSteps([]); setCandidates([]); setNeedsApproval(false); setItemWanted(''); setMaxBudget('') }}
                style={{ padding: '12px 24px', borderRadius: '12px', border: '1.5px solid #e2eae6', background: 'white', fontSize: '14px', fontWeight: 900, cursor: 'pointer', fontFamily: FONT, color: INK }}>
                New Search
              </button>
              <Link href={`/${locale}/messages`}
                style={{ padding: '12px 24px', borderRadius: '12px', background: MINT, color: 'white', textDecoration: 'none', fontSize: '14px', fontWeight: 900 }}>
                Message Seller
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
