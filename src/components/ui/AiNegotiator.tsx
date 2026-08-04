'use client'

import { useState, useRef, useEffect } from 'react'
import { Send, Bot, User, ChevronDown, ChevronUp, Zap, Check, X } from 'lucide-react'

const MINT = '#22d4a8'
const INK  = '#161d1b'
const FONT = "'Inter', system-ui, sans-serif"

type Message = { role: 'ai' | 'user' | 'system'; text: string; time: string }

type Props = {
  listing: {
    title:    string
    price:    number
    currency: string
    seller:   string
    city:     string
    category: string
  }
  locale: string
}

export default function AiNegotiator({ listing, locale }: Props) {
  const [open, setOpen]           = useState(false)
  const [messages, setMessages]   = useState<Message[]>([])
  const [input, setInput]         = useState('')
  const [loading, setLoading]     = useState(false)
  const [negotiatedPrice, setNegotiatedPrice] = useState<number | null>(null)
  const [mode, setMode]           = useState<'setup' | 'chat' | 'deal'>('setup')
  const [targetPrice, setTargetPrice] = useState('')
  const [strategy, setStrategy]   = useState<'gentle' | 'firm' | 'aggressive'>('gentle')
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const startNegotiation = () => {
    const target = Number(targetPrice)
    if (!target || target >= listing.price) return

    const intro: Message = {
      role: 'ai',
      text: `I'll negotiate for you! 🤝\n\nYour target: **${target.toLocaleString()} ${listing.currency}** (${Math.round((1 - target/listing.price) * 100)}% below asking price)\n\nStrategy: **${strategy === 'gentle' ? 'Friendly & Respectful' : strategy === 'firm' ? 'Confident & Direct' : 'Assertive & Persistent'}**\n\nI'm ready to start. Should I send the first message to the seller?`,
      time: now()
    }
    setMessages([intro])
    setMode('chat')
  }

  const sendMessage = async (userMsg?: string) => {
    const msg = userMsg || input.trim()
    if (!msg) return

    const userMessage: Message = { role: 'user', text: msg, time: now() }
    const newMessages = [...messages, userMessage]
    setMessages(newMessages)
    setInput('')
    setLoading(true)

    try {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-6',
          max_tokens: 600,
          system: `You are SouKni's AI Price Negotiator. You help buyers negotiate better prices on a Moroccan marketplace.

Listing: "${listing.title}"
Listed price: ${listing.price} ${listing.currency}
Buyer's target: ${targetPrice} ${listing.currency}
Strategy: ${strategy}
Seller name: ${listing.seller}
Category: ${listing.category}
City: ${listing.city}

Your role:
1. Draft messages the buyer can send to the seller (in French or Arabic as appropriate for Morocco)
2. Analyze seller responses and suggest counter-strategies
3. Celebrate when a deal is reached
4. Be respectful and culturally appropriate for Morocco
5. Use Moroccan negotiation culture (respect, relationship-building, not too aggressive)
6. When user says "send this" — confirm the message to send
7. If a price is agreed, output JSON: {"deal": true, "price": <number>}

Keep responses concise and actionable.`,
          messages: newMessages.map(m => ({
            role: m.role === 'ai' ? 'assistant' : 'user',
            content: m.text
          }))
        })
      })
      const data = await res.json()
      const text = data.content?.[0]?.text || ''

      // Check if deal reached
      try {
        const dealMatch = text.match(/\{"deal":\s*true[^}]*\}/)
        if (dealMatch) {
          const deal = JSON.parse(dealMatch[0])
          setNegotiatedPrice(deal.price)
          setMode('deal')
        }
      } catch {}

      setMessages(prev => [...prev, { role: 'ai', text, time: now() }])
    } catch {
      setMessages(prev => [...prev, { role: 'ai', text: "Sorry, I couldn't connect. Try again.", time: now() }])
    }
    setLoading(false)
  }

  const now = () => new Date().toLocaleTimeString('en', { hour: '2-digit', minute: '2-digit' })

  const QUICK_ACTIONS = [
    'Send first offer message',
    'Seller said no — what now?',
    'They countered, what should I say?',
    'Accept and close the deal',
  ]

  return (
    <div style={{ fontFamily: FONT }}>
      {/* Trigger button */}
      <button onClick={() => setOpen(!open)}
        style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', borderRadius: '14px', border: `1.5px solid ${MINT}`, background: open ? '#f0fdf9' : 'white', cursor: 'pointer', fontFamily: FONT, transition: 'all 0.2s' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: `linear-gradient(135deg, ${MINT}, #0f9b8e)`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Bot size={18} color="white" />
          </div>
          <div style={{ textAlign: 'left' }}>
            <p style={{ fontSize: '13px', fontWeight: 900, color: INK, marginBottom: '1px' }}>🤖 AI Price Negotiator</p>
            <p style={{ fontSize: '11px', color: '#6b7a76', fontWeight: 700 }}>Let AI negotiate the best price for you</p>
          </div>
        </div>
        {open ? <ChevronUp size={16} color="#6b7a76" /> : <ChevronDown size={16} color="#6b7a76" />}
      </button>

      {open && (
        <div style={{ marginTop: '10px', border: '1px solid #e2eae6', borderRadius: '16px', overflow: 'hidden' }}>

          {/* Setup mode */}
          {mode === 'setup' && (
            <div style={{ padding: '20px' }}>
              <p style={{ fontSize: '14px', fontWeight: 900, color: INK, marginBottom: '4px', letterSpacing: '-0.03em' }}>
                Set your negotiation goal
              </p>
              <p style={{ fontSize: '12px', color: '#6b7a76', fontWeight: 700, marginBottom: '16px' }}>
                Listed at <strong style={{ color: MINT }}>{listing.price.toLocaleString()} {listing.currency}</strong>
              </p>

              {/* Target price */}
              <div style={{ marginBottom: '14px' }}>
                <label style={{ fontSize: '11px', fontWeight: 900, color: INK, textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', marginBottom: '6px' }}>
                  Your target price (MAD)
                </label>
                <input type="number" value={targetPrice} onChange={e => setTargetPrice(e.target.value)}
                  placeholder={`e.g. ${Math.round(listing.price * 0.85).toLocaleString()}`}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #e2eae6', fontSize: '15px', fontFamily: FONT, fontWeight: 900, color: INK, background: '#f4fbf8', outline: 'none', boxSizing: 'border-box' }}
                  onFocus={e => e.target.style.borderColor = MINT}
                  onBlur={e => e.target.style.borderColor = '#e2eae6'}
                />
                {targetPrice && Number(targetPrice) < listing.price && (
                  <p style={{ fontSize: '11px', color: MINT, fontWeight: 900, marginTop: '4px' }}>
                    Saving {(listing.price - Number(targetPrice)).toLocaleString()} MAD ({Math.round((1 - Number(targetPrice)/listing.price)*100)}% off)
                  </p>
                )}
              </div>

              {/* Strategy */}
              <div style={{ marginBottom: '16px' }}>
                <label style={{ fontSize: '11px', fontWeight: 900, color: INK, textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', marginBottom: '8px' }}>
                  Negotiation Style
                </label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  {[
                    { key: 'gentle',     emoji: '🤝', label: 'Friendly' },
                    { key: 'firm',       emoji: '💼', label: 'Firm' },
                    { key: 'aggressive', emoji: '⚡', label: 'Assertive' },
                  ].map(s => (
                    <button key={s.key} onClick={() => setStrategy(s.key as any)}
                      style={{ flex: 1, padding: '10px 8px', borderRadius: '10px', border: `1.5px solid ${strategy === s.key ? MINT : '#e2eae6'}`, background: strategy === s.key ? '#f0fdf9' : 'white', cursor: 'pointer', fontFamily: FONT, textAlign: 'center' }}>
                      <p style={{ fontSize: '18px', marginBottom: '2px' }}>{s.emoji}</p>
                      <p style={{ fontSize: '11px', fontWeight: 900, color: strategy === s.key ? MINT : INK }}>{s.label}</p>
                    </button>
                  ))}
                </div>
              </div>

              <button onClick={startNegotiation}
                disabled={!targetPrice || Number(targetPrice) >= listing.price}
                style={{ width: '100%', padding: '13px', borderRadius: '12px', background: targetPrice && Number(targetPrice) < listing.price ? `linear-gradient(135deg, ${MINT}, #0f9b8e)` : '#e2eae6', color: targetPrice && Number(targetPrice) < listing.price ? 'white' : '#6b7a76', border: 'none', fontSize: '14px', fontWeight: 900, cursor: targetPrice && Number(targetPrice) < listing.price ? 'pointer' : 'not-allowed', fontFamily: FONT }}>
                🤖 Start AI Negotiation
              </button>
            </div>
          )}

          {/* Chat mode */}
          {mode === 'chat' && (
            <div>
              {/* Messages */}
              <div style={{ height: '280px', overflowY: 'auto', padding: '16px', background: '#f9fafb', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {messages.map((m, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start', gap: '8px', alignItems: 'flex-end' }}>
                    {m.role === 'ai' && (
                      <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: `linear-gradient(135deg, ${MINT}, #0f9b8e)`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <Bot size={14} color="white" />
                      </div>
                    )}
                    <div style={{ maxWidth: '80%', padding: '10px 14px', borderRadius: m.role === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px', background: m.role === 'user' ? MINT : 'white', color: m.role === 'user' ? 'white' : INK, fontSize: '13px', fontWeight: 600, lineHeight: 1.5, boxShadow: '0 1px 4px rgba(0,0,0,0.06)', whiteSpace: 'pre-wrap' }}>
                      {m.text}
                    </div>
                  </div>
                ))}
                {loading && (
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-end' }}>
                    <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: `linear-gradient(135deg, ${MINT}, #0f9b8e)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Bot size={14} color="white" />
                    </div>
                    <div style={{ padding: '10px 14px', borderRadius: '16px 16px 16px 4px', background: 'white', display: 'flex', gap: '4px' }}>
                      {[0,1,2].map(i => <div key={i} style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#6b7a76', animation: `bounce 0.8s ${i*0.2}s infinite alternate` }} />)}
                    </div>
                  </div>
                )}
                <div ref={endRef} />
              </div>

              {/* Quick actions */}
              <div style={{ padding: '8px 12px', background: 'white', borderTop: '1px solid #e2eae6', display: 'flex', gap: '6px', overflowX: 'auto' }}>
                {QUICK_ACTIONS.map(a => (
                  <button key={a} onClick={() => sendMessage(a)}
                    style={{ whiteSpace: 'nowrap', padding: '5px 12px', borderRadius: '100px', border: `1px solid ${MINT}`, background: '#f0fdf9', color: MINT, fontSize: '11px', fontWeight: 900, cursor: 'pointer', fontFamily: FONT }}>
                    {a}
                  </button>
                ))}
              </div>

              {/* Input */}
              <div style={{ display: 'flex', gap: '8px', padding: '12px', background: 'white', borderTop: '1px solid #e2eae6' }}>
                <input value={input} onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && !e.shiftKey && sendMessage()}
                  placeholder="Ask AI what to say next..."
                  style={{ flex: 1, padding: '10px 14px', borderRadius: '100px', border: '1.5px solid #e2eae6', fontSize: '13px', fontFamily: FONT, fontWeight: 700, color: INK, background: '#f4fbf8', outline: 'none' }}
                  onFocus={e => e.target.style.borderColor = MINT}
                  onBlur={e => e.target.style.borderColor = '#e2eae6'}
                />
                <button onClick={() => sendMessage()}
                  disabled={!input.trim() || loading}
                  style={{ width: '40px', height: '40px', borderRadius: '50%', background: input.trim() ? MINT : '#e2eae6', border: 'none', cursor: input.trim() ? 'pointer' : 'not-allowed', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Send size={16} color={input.trim() ? 'white' : '#6b7a76'} />
                </button>
              </div>
            </div>
          )}

          {/* Deal mode */}
          {mode === 'deal' && negotiatedPrice && (
            <div style={{ padding: '28px', textAlign: 'center' }}>
              <div style={{ fontSize: '48px', marginBottom: '12px' }}>🎉</div>
              <h3 style={{ fontSize: '20px', fontWeight: 900, color: INK, marginBottom: '6px', letterSpacing: '-0.05em' }}>Deal Negotiated!</h3>
              <p style={{ fontSize: '13px', color: '#6b7a76', fontWeight: 700, marginBottom: '16px' }}>
                AI secured you a price of:
              </p>
              <p style={{ fontSize: '36px', fontWeight: 900, color: MINT, letterSpacing: '-0.05em', marginBottom: '4px' }}>
                {negotiatedPrice.toLocaleString()} MAD
              </p>
              <p style={{ fontSize: '13px', color: '#0f9b8e', fontWeight: 900, marginBottom: '20px' }}>
                You saved {(listing.price - negotiatedPrice).toLocaleString()} MAD ({Math.round((1 - negotiatedPrice/listing.price)*100)}% off)!
              </p>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button onClick={() => { setMode('setup'); setMessages([]); setNegotiatedPrice(null) }}
                  style={{ flex: 1, padding: '12px', borderRadius: '12px', border: '1.5px solid #e2eae6', background: 'white', fontSize: '13px', fontWeight: 900, cursor: 'pointer', fontFamily: FONT, color: INK }}>
                  Start Over
                </button>
                <button style={{ flex: 2, padding: '12px', borderRadius: '12px', background: `linear-gradient(135deg, ${MINT}, #0f9b8e)`, border: 'none', color: 'white', fontSize: '13px', fontWeight: 900, cursor: 'pointer', fontFamily: FONT }}>
                  Message Seller
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      <style>{`@keyframes bounce { from { transform: translateY(0) } to { transform: translateY(-4px) } }`}</style>
    </div>
  )
}
