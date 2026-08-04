'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Sparkles, Send, X, Minimize2, Mic, Bot, ArrowRight, Loader, Zap } from 'lucide-react'

const MINT = '#22d4a8'
const INK  = '#161d1b'
const MUTED = '#6b7a76'
const SURFACE = '#f4fbf8'
const FONT = "'Inter', system-ui, sans-serif"

type Msg = { role: 'user' | 'assistant'; text: string; actions?: Action[] }
type Action = { label: string; href?: string; type: 'navigate' | 'suggest' }

const SUGGESTIONS = [
  '🔍 Find me an iPhone under 3000 MAD in Rabat',
  '📝 Help me write a great ad for my car',
  '💰 What\'s a fair price for a used MacBook Pro?',
  '📦 Where\'s my order from Sara?',
  '🌍 Translate my listing to Arabic',
  '🛡️ Is this seller trustworthy?',
]

export default function SouKniConcierge({ locale }: { locale: string }) {
  const router = useRouter()
  const [open, setOpen]         = useState(false)
  const [minimized, setMinimized] = useState(false)
  const [messages, setMessages] = useState<Msg[]>([])
  const [input, setInput]       = useState('')
  const [loading, setLoading]   = useState(false)
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages])

  const openWithGreeting = () => {
    setOpen(true)
    setMinimized(false)
    if (messages.length === 0) {
      setMessages([{
        role: 'assistant',
        text: "Hi! I'm your SouKni AI Concierge 🧞\n\nI can search listings, help you write ads, check prices, translate, track orders, and more — just tell me what you need in plain language.",
      }])
    }
  }

  const send = async (text?: string) => {
    const msg = text || input.trim()
    if (!msg) return
    const newMessages: Msg[] = [...messages, { role: 'user', text: msg }]
    setMessages(newMessages)
    setInput('')
    setLoading(true)

    try {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-6',
          max_tokens: 700,
          system: `You are the SouKni AI Concierge — an agentic assistant embedded across a Moroccan marketplace platform (like Amazon + Facebook Marketplace + a personal shopping agent combined).

You can help with:
- Searching listings (respond with a navigate action to /search?q=...)
- Writing/improving ad descriptions
- Price advice (give a realistic MAD price range)
- Translating text to French/Arabic/English
- Explaining how features work (Escrow, Diamond badge, Boost, etc)
- General marketplace advice for Morocco

When the user wants to DO something (search, post an ad, view orders, etc), include a navigate action.
Keep responses conversational, warm, and concise (2-4 sentences max unless giving detailed advice).
Use emoji naturally but don't overdo it.

Respond ONLY with valid JSON:
{
  "reply": "<your conversational response>",
  "actions": [{"label": "<button text>", "href": "<path like /search?q=iphone>", "type": "navigate"}]
}
If no action needed, use "actions": [].`,
          messages: newMessages.map(m => ({ role: m.role, content: m.text }))
        })
      })
      const data = await res.json()
      const text2 = data.content?.[0]?.text || '{}'
      const parsed = JSON.parse(text2.replace(/```json|```/g, '').trim())
      setMessages(prev => [...prev, { role: 'assistant', text: parsed.reply, actions: parsed.actions || [] }])
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', text: "Sorry, I couldn't process that. Try again?" }])
    }
    setLoading(false)
  }

  const executeAction = (action: Action) => {
    if (action.type === 'navigate' && action.href) {
      router.push(`/${locale}${action.href}`)
      setOpen(false)
    }
  }

  // Floating button (closed state)
  if (!open) return (
    <button onClick={openWithGreeting}
      style={{
        position: 'fixed', bottom: '24px', right: '24px', zIndex: 400,
        width: '60px', height: '60px', borderRadius: '50%',
        background: `linear-gradient(135deg, ${MINT}, #0f9b8e)`,
        border: 'none', cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: `0 8px 32px rgba(34,212,168,0.5)`,
        animation: 'concierge-float 3s ease-in-out infinite',
      }}>
      <Sparkles size={26} color="white" />
      <style>{`@keyframes concierge-float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }`}</style>
    </button>
  )

  // Minimized bar
  if (minimized) return (
    <button onClick={() => setMinimized(false)}
      style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 400, display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 20px', borderRadius: '100px', background: INK, border: 'none', cursor: 'pointer', boxShadow: '0 8px 24px rgba(0,0,0,0.25)' }}>
      <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: MINT, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Sparkles size={13} color="white" />
      </div>
      <span style={{ fontSize: '13px', fontWeight: 900, color: 'white', fontFamily: FONT }}>SouKni AI</span>
    </button>
  )

  return (
    <div style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 400, width: '380px', maxWidth: 'calc(100vw - 40px)', fontFamily: FONT }}>
      <div style={{ background: 'white', borderRadius: '24px', boxShadow: '0 24px 64px rgba(0,0,0,0.25)', overflow: 'hidden', border: '1px solid #e2eae6' }}>

        {/* Header */}
        <div style={{ background: `linear-gradient(135deg, ${INK}, #2b3230)`, padding: '16px 18px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(34,212,168,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Sparkles size={18} color={MINT} />
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: '14px', fontWeight: 900, color: 'white' }}>SouKni AI Concierge</p>
            <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: MINT }} /> Always here to help
            </p>
          </div>
          <button onClick={() => setMinimized(true)} style={{ width: '28px', height: '28px', borderRadius: '8px', border: 'none', background: 'rgba(255,255,255,0.1)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Minimize2 size={13} color="rgba(255,255,255,0.7)" />
          </button>
          <button onClick={() => setOpen(false)} style={{ width: '28px', height: '28px', borderRadius: '8px', border: 'none', background: 'rgba(255,255,255,0.1)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <X size={13} color="rgba(255,255,255,0.7)" />
          </button>
        </div>

        {/* Messages */}
        <div style={{ height: '400px', overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px', background: '#f9fafb' }}>
          {messages.map((m, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: m.role === 'user' ? 'flex-end' : 'flex-start', gap: '6px' }}>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-end', maxWidth: '90%' }}>
                {m.role === 'assistant' && (
                  <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: `linear-gradient(135deg, ${MINT}, #0f9b8e)`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Bot size={12} color="white" />
                  </div>
                )}
                <div style={{ padding: '10px 14px', borderRadius: m.role === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px', background: m.role === 'user' ? MINT : 'white', color: m.role === 'user' ? 'white' : INK, fontSize: '13px', fontWeight: 600, lineHeight: 1.5, whiteSpace: 'pre-wrap', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
                  {m.text}
                </div>
              </div>
              {/* Action buttons */}
              {m.actions && m.actions.length > 0 && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginLeft: '32px' }}>
                  {m.actions.map((a, j) => (
                    <button key={j} onClick={() => executeAction(a)}
                      style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: '7px 14px', borderRadius: '100px', background: MINT, border: 'none', color: 'white', fontSize: '12px', fontWeight: 900, cursor: 'pointer', fontFamily: FONT }}>
                      {a.label} <ArrowRight size={11} />
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
          {loading && (
            <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-end' }}>
              <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: `linear-gradient(135deg, ${MINT}, #0f9b8e)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Bot size={12} color="white" />
              </div>
              <div style={{ padding: '10px 14px', borderRadius: '16px 16px 16px 4px', background: 'white', display: 'flex', gap: '4px' }}>
                {[0,1,2].map(i => <div key={i} style={{ width: '6px', height: '6px', borderRadius: '50%', background: MUTED, animation: `concierge-bounce 0.8s ${i*0.15}s infinite alternate` }} />)}
              </div>
            </div>
          )}
          <div ref={endRef} />
        </div>

        {/* Suggestions (only if no user messages yet) */}
        {messages.length <= 1 && (
          <div style={{ padding: '10px 14px', background: 'white', borderTop: '1px solid #f4fbf8', display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {SUGGESTIONS.slice(0, 3).map(s => (
              <button key={s} onClick={() => send(s)}
                style={{ padding: '6px 12px', borderRadius: '100px', border: `1px solid ${MINT}`, background: '#f0fdf9', color: MINT, fontSize: '11px', fontWeight: 700, cursor: 'pointer', fontFamily: FONT }}>
                {s}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <div style={{ display: 'flex', gap: '8px', padding: '12px 14px', background: 'white', borderTop: '1px solid #e2eae6' }}>
          <input value={input} onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && send()}
            placeholder="Ask me anything..."
            style={{ flex: 1, padding: '10px 14px', borderRadius: '100px', border: '1.5px solid #e2eae6', fontSize: '13px', fontFamily: FONT, fontWeight: 700, color: INK, background: SURFACE, outline: 'none' }}
            onFocus={e => e.target.style.borderColor = MINT}
            onBlur={e => e.target.style.borderColor = '#e2eae6'}
          />
          <button onClick={() => send()} disabled={!input.trim() || loading}
            style={{ width: '38px', height: '38px', borderRadius: '50%', background: input.trim() ? MINT : '#e2eae6', border: 'none', cursor: input.trim() ? 'pointer' : 'not-allowed', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Send size={15} color={input.trim() ? 'white' : MUTED} />
          </button>
        </div>
      </div>
      <style>{`@keyframes concierge-bounce { from { transform: translateY(0) } to { transform: translateY(-4px) } }`}</style>
    </div>
  )
}
