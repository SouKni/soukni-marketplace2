'use client'

import { useState } from 'react'
import { Handshake, X, Copy, Check, TrendingDown, TrendingUp } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import MessageSellerButton from '@/components/ui/MessageSellerButton'

const MINT = '#22d4a8'
const INK  = '#161d1b'
const MUTED = '#6b7a76'
const FONT = "'Inter', system-ui, sans-serif"

type Strategy = {
  suggestedPrice: number
  acceptableRange: { min: number; max: number }
  likelihood: 'low' | 'medium' | 'high'
  verdict: string
  reasoning: string
  talkingPoints: string[]
  openingMessage: string
  source: 'ai' | 'fallback'
}

const LIKELIHOOD_COLOR: Record<string, string> = { high: '#16a34a', medium: '#d97706', low: '#dc2626' }
const LIKELIHOOD_LABEL: Record<string, string> = { high: 'Likely to work', medium: 'Worth a try', low: 'A stretch' }

export default function NegotiationAdvisor({ listingId, sellerId, askingPrice, currency, title }: {
  listingId: string; sellerId: string | null; askingPrice: number; currency: string; title: string
}) {
  const { user } = useAuth()
  const isSeller = !!user && user.id === sellerId

  const [open, setOpen]         = useState(false)
  const [amount, setAmount]     = useState(() => isSeller ? '' : String(Math.round(askingPrice * 0.88)))
  const [loading, setLoading]   = useState(false)
  const [strategy, setStrategy] = useState<Strategy | null>(null)
  const [error, setError]       = useState<string | null>(null)
  const [copied, setCopied]     = useState(false)

  const getAdvice = async () => {
    const value = Number(amount)
    if (!value || value <= 0) return
    setLoading(true)
    setError(null)
    setStrategy(null)
    try {
      const res = await fetch('/api/negotiate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ listingId, role: isSeller ? 'seller' : 'buyer', amount: value }),
      })
      const data = await res.json()
      if (!res.ok) { setError(data.error || 'Could not get negotiation advice.'); return }
      setStrategy(data.strategy)
    } catch {
      setError('Could not reach the server. Please try again.')
    }
    setLoading(false)
  }

  const copyMessage = () => {
    if (!strategy) return
    navigator.clipboard.writeText(strategy.openingMessage).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  const reset = () => { setStrategy(null); setError(null); setCopied(false) }

  if (!open) return (
    <button onClick={() => setOpen(true)}
      style={{ width: '100%', padding: '13px 0', borderRadius: '100px', backgroundColor: '#f5f3ff', border: '1.5px solid #7c3aed', color: '#6d28d9', fontSize: '14px', fontWeight: 900, cursor: 'pointer', fontFamily: FONT, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
      <Handshake size={16} /> {isSeller ? 'AI Offer Advisor' : 'Get Negotiation Advice'}
    </button>
  )

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 500, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', fontFamily: FONT }}>
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)' }} onClick={() => { setOpen(false); reset() }} />
      <div style={{ position: 'relative', background: 'white', borderRadius: '28px', padding: '28px', maxWidth: '460px', width: '100%', boxShadow: '0 32px 80px rgba(0,0,0,0.3)', maxHeight: '85vh', overflowY: 'auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
          <div>
            <h2 style={{ fontSize: '19px', fontWeight: 900, color: INK, letterSpacing: '-0.05em', marginBottom: '2px' }}>🤝 AI Offer Advisor</h2>
            <p style={{ fontSize: '12px', color: MUTED, fontWeight: 700 }}>{title}</p>
          </div>
          <button onClick={() => { setOpen(false); reset() }}
            style={{ width: '32px', height: '32px', borderRadius: '50%', border: 'none', background: '#f4fbf8', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <X size={16} color={MUTED} />
          </button>
        </div>

        {!strategy ? (
          <div>
            <div style={{ padding: '12px 14px', background: '#f4fbf8', borderRadius: '12px', marginBottom: '16px', display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '12px', color: MUTED, fontWeight: 700 }}>Asking price</span>
              <span style={{ fontSize: '14px', color: INK, fontWeight: 900 }}>{askingPrice.toLocaleString()} {currency}</span>
            </div>

            <p style={{ fontSize: '13px', fontWeight: 700, color: INK, marginBottom: '8px' }}>
              {isSeller ? "What offer did the buyer make?" : "What's your target budget?"}
            </p>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '18px' }}>
              <input type="number" min="0" value={amount} onChange={e => setAmount(e.target.value)}
                placeholder={isSeller ? 'e.g. 800' : undefined}
                style={{ flex: 1, padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #e2eae6', fontSize: '17px', fontWeight: 900, color: INK, background: '#f4fbf8', outline: 'none', fontFamily: FONT }} />
              <div style={{ padding: '12px 14px', borderRadius: '12px', background: '#f4fbf8', display: 'flex', alignItems: 'center', fontSize: '13px', fontWeight: 900, color: MUTED }}>{currency}</div>
            </div>

            {error && (
              <div style={{ padding: '10px 14px', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '10px', marginBottom: '14px' }}>
                <p style={{ fontSize: '12px', color: '#b91c1c', fontWeight: 700 }}>{error}</p>
              </div>
            )}

            <button onClick={getAdvice} disabled={loading || !amount}
              style={{ width: '100%', padding: '13px', borderRadius: '12px', background: loading || !amount ? '#e2eae6' : 'linear-gradient(135deg, #7c3aed, #6d28d9)', color: loading || !amount ? MUTED : 'white', border: 'none', fontSize: '14px', fontWeight: 900, cursor: loading || !amount ? 'not-allowed' : 'pointer', fontFamily: FONT, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              {loading ? <><span style={{ width: '14px', height: '14px', borderRadius: '50%', border: '2px solid rgba(255,255,255,0.35)', borderTopColor: 'white', display: 'inline-block', animation: 'spin 0.8s linear infinite' }} /> Analysing market...</> : 'Get Advice'}
            </button>
          </div>
        ) : (
          <div>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '14px' }}>
              <div style={{ flex: 1, padding: '14px', background: '#f5f3ff', borderRadius: '14px', textAlign: 'center' }}>
                <p style={{ fontSize: '10px', fontWeight: 900, color: '#7c3aed', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '4px' }}>
                  {isSeller ? 'Suggested Counter' : 'Suggested Offer'}
                </p>
                <p style={{ fontSize: '22px', fontWeight: 900, color: INK, letterSpacing: '-0.03em' }}>{strategy.suggestedPrice.toLocaleString()}</p>
                <p style={{ fontSize: '10px', color: MUTED, fontWeight: 700 }}>{currency}</p>
              </div>
              <div style={{ flex: 1, padding: '14px', borderRadius: '14px', textAlign: 'center', background: `${LIKELIHOOD_COLOR[strategy.likelihood]}15` }}>
                <p style={{ fontSize: '10px', fontWeight: 900, color: LIKELIHOOD_COLOR[strategy.likelihood], textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '4px' }}>Likelihood</p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', marginTop: '6px' }}>
                  {strategy.likelihood === 'low' ? <TrendingDown size={16} color={LIKELIHOOD_COLOR.low} /> : <TrendingUp size={16} color={LIKELIHOOD_COLOR[strategy.likelihood]} />}
                  <p style={{ fontSize: '13px', fontWeight: 900, color: INK }}>{LIKELIHOOD_LABEL[strategy.likelihood]}</p>
                </div>
              </div>
            </div>

            <div style={{ padding: '12px 14px', background: '#f4fbf8', borderRadius: '12px', marginBottom: '12px' }}>
              <p style={{ fontSize: '13px', fontWeight: 900, color: INK, marginBottom: '4px' }}>{strategy.verdict}</p>
              <p style={{ fontSize: '12px', color: MUTED, fontWeight: 600, lineHeight: 1.5 }}>{strategy.reasoning}</p>
            </div>

            {strategy.talkingPoints.length > 0 && (
              <div style={{ marginBottom: '14px' }}>
                <p style={{ fontSize: '11px', fontWeight: 900, color: MUTED, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '8px' }}>Talking Points</p>
                {strategy.talkingPoints.map((tip, i) => (
                  <p key={i} style={{ fontSize: '12px', color: INK, fontWeight: 600, lineHeight: 1.6 }}>→ {tip}</p>
                ))}
              </div>
            )}

            <div style={{ padding: '14px', background: 'white', border: '1.5px solid #e2eae6', borderRadius: '14px', marginBottom: '14px' }}>
              <p style={{ fontSize: '11px', fontWeight: 900, color: MUTED, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '8px' }}>Ready to send</p>
              <p style={{ fontSize: '13px', color: INK, fontWeight: 600, lineHeight: 1.6, marginBottom: '10px' }}>{strategy.openingMessage}</p>
              <button onClick={copyMessage}
                style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 14px', borderRadius: '100px', border: `1.5px solid ${MINT}`, background: copied ? MINT : '#f0fdf9', color: copied ? 'white' : MINT, fontSize: '12px', fontWeight: 900, cursor: 'pointer', fontFamily: FONT }}>
                {copied ? <Check size={13} /> : <Copy size={13} />} {copied ? 'Copied!' : 'Copy Message'}
              </button>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={() => setStrategy(null)}
                style={{ flex: 1, padding: '12px', borderRadius: '12px', background: 'white', color: INK, border: '1.5px solid #e2eae6', fontSize: '13px', fontWeight: 900, cursor: 'pointer', fontFamily: FONT }}>
                Try Different Amount
              </button>
              {!isSeller && (
                <MessageSellerButton listingId={listingId} sellerId={sellerId}
                  style={{ flex: 1, padding: '12px', borderRadius: '12px', background: INK, color: 'white', border: 'none', fontSize: '13px', fontWeight: 900 }}>
                  Message Seller
                </MessageSellerButton>
              )}
            </div>
          </div>
        )}
        <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      </div>
    </div>
  )
}
