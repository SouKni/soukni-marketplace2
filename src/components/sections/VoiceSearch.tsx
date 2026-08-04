'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Mic, MicOff, X, Loader } from 'lucide-react'

const MINT = '#22d4a8'
const INK  = '#161d1b'
const FONT = "'Inter', system-ui, sans-serif"

type VoiceState = 'idle' | 'listening' | 'processing' | 'result' | 'error'

const EXAMPLES = [
  'iPhone 13 noir à Témara moins de 3000 dirhams',
  'Appartement 2 chambres à Agdal Rabat',
  'BMW Série 3 2020 moins de 250000 MAD',
  'MacBook Pro M3 neuf Casablanca',
]

export default function VoiceSearch({ locale }: { locale: string }) {
  const router = useRouter()
  const [open, setOpen]         = useState(false)
  const [state, setState]       = useState<VoiceState>('idle')
  const [transcript, setTranscript] = useState('')
  const [parsed, setParsed]     = useState<any>(null)
  const [error, setError]       = useState('')
  const recognitionRef          = useRef<any>(null)
  const exampleIdx              = useRef(0)
  const [example, setExample]   = useState(EXAMPLES[0])

  // Cycle through examples
  useEffect(() => {
    if (!open) return
    const id = setInterval(() => {
      exampleIdx.current = (exampleIdx.current + 1) % EXAMPLES.length
      setExample(EXAMPLES[exampleIdx.current])
    }, 3000)
    return () => clearInterval(id)
  }, [open])

  const startListening = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    if (!SpeechRecognition) {
      setError('Voice search not supported in this browser. Try Chrome.')
      setState('error')
      return
    }

    const recognition = new SpeechRecognition()
    recognition.lang = 'fr-MA' // Moroccan French — also understands Arabic & Darija
    recognition.continuous = false
    recognition.interimResults = true
    recognition.maxAlternatives = 1

    recognition.onstart  = () => setState('listening')
    recognition.onresult = (e: any) => {
      const t = Array.from(e.results).map((r: any) => r[0].transcript).join('')
      setTranscript(t)
      if (e.results[0].isFinal) {
        setState('processing')
        parseVoiceQuery(t)
      }
    }
    recognition.onerror = (e: any) => {
      setError(`Could not hear you clearly. Try again.`)
      setState('error')
    }
    recognition.onend = () => {
      if (state === 'listening') setState('idle')
    }

    recognitionRef.current = recognition
    recognition.start()
  }

  const stopListening = () => {
    recognitionRef.current?.stop()
    setState('idle')
  }

  const parseVoiceQuery = async (text: string) => {
    try {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-6',
          max_tokens: 500,
          messages: [{
            role: 'user',
            content: `You are SouKni's voice search parser for a Moroccan marketplace.
Parse this voice query into structured search parameters.
Query: "${text}"

Extract: item, category, city, maxPrice (number in MAD), condition, keywords.
Categories: Motors, Property, Electronics, Fashion, Jobs, Services, The Vault, Home & Living, Baby & Kids, Pets, Sports

Respond ONLY with valid JSON:
{
  "query": "<main search term>",
  "category": "<category or null>",
  "city": "<city or null>",
  "maxPrice": <number or null>,
  "condition": "<new|like_new|good|null>",
  "summary": "<one sentence natural language summary of what was searched>"
}`
          }]
        })
      })
      const data = await res.json()
      const text2 = data.content?.[0]?.text || '{}'
      const result = JSON.parse(text2.replace(/```json|```/g, '').trim())
      setParsed(result)
      setState('result')
    } catch {
      // Fallback: just search the raw transcript
      setParsed({ query: text, summary: `Searching for: ${text}` })
      setState('result')
    }
  }

  const executeSearch = () => {
    if (!parsed) return
    const params = new URLSearchParams()
    if (parsed.query)    params.set('q', parsed.query)
    if (parsed.category) params.set('category', parsed.category)
    if (parsed.city)     params.set('city', parsed.city)
    if (parsed.maxPrice) params.set('maxPrice', parsed.maxPrice.toString())
    if (parsed.condition)params.set('condition', parsed.condition)
    setOpen(false)
    setState('idle')
    setTranscript('')
    setParsed(null)
    router.push(`/${locale}/search?${params.toString()}`)
  }

  const reset = () => {
    setState('idle')
    setTranscript('')
    setParsed(null)
    setError('')
  }

  if (!open) return (
    <button
      onClick={() => setOpen(true)}
      title="Voice Search"
      style={{ width: '36px', height: '36px', borderRadius: '50%', border: `1.5px solid ${MINT}`, background: '#f0fdf9', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s', flexShrink: 0 }}
      onMouseEnter={e => { e.currentTarget.style.background = MINT; (e.currentTarget.querySelector('svg') as any).style.color = 'white' }}
      onMouseLeave={e => { e.currentTarget.style.background = '#f0fdf9'; (e.currentTarget.querySelector('svg') as any).style.color = MINT }}
    >
      <Mic size={16} color={MINT} />
    </button>
  )

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 500, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', fontFamily: FONT }}>
      {/* Backdrop */}
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)' }} onClick={() => { setOpen(false); stopListening(); reset() }} />

      {/* Modal */}
      <div style={{ position: 'relative', background: 'white', borderRadius: '28px', padding: '36px 32px', maxWidth: '520px', width: '100%', boxShadow: '0 32px 80px rgba(0,0,0,0.3)', textAlign: 'center' }}>
        <style>{`
          @keyframes pulse-ring {
            0% { transform: scale(1); opacity: 0.6; }
            100% { transform: scale(1.6); opacity: 0; }
          }
          @keyframes wave {
            0%, 100% { height: 8px; }
            50% { height: 32px; }
          }
        `}</style>

        {/* Close */}
        <button onClick={() => { setOpen(false); stopListening(); reset() }}
          style={{ position: 'absolute', top: '16px', right: '16px', width: '32px', height: '32px', borderRadius: '50%', border: 'none', background: '#f4fbf8', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <X size={16} color="#6b7a76" />
        </button>

        {/* Header */}
        <p style={{ fontSize: '13px', fontWeight: 900, color: '#6b7a76', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>
          🎤 SouKni Voice Search
        </p>
        <h2 style={{ fontSize: '22px', fontWeight: 900, color: INK, letterSpacing: '-0.05em', marginBottom: '6px', lineHeight: 1.2 }}>
          {state === 'idle'       && 'What are you looking for?'}
          {state === 'listening'  && 'Listening...'}
          {state === 'processing' && 'Understanding your search...'}
          {state === 'result'     && 'Found it! 🎯'}
          {state === 'error'      && 'Try Again'}
        </h2>

        {/* Mic button */}
        {(state === 'idle' || state === 'error') && (
          <div style={{ margin: '28px auto', position: 'relative', width: '100px', height: '100px' }}>
            <button onClick={startListening}
              style={{ width: '100px', height: '100px', borderRadius: '50%', background: `linear-gradient(135deg, ${MINT}, #0f9b8e)`, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 8px 32px rgba(34,212,168,0.4)`, transition: 'transform 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
            >
              <Mic size={36} color="white" />
            </button>
          </div>
        )}

        {/* Listening animation */}
        {state === 'listening' && (
          <div style={{ margin: '28px auto' }}>
            <div style={{ position: 'relative', width: '100px', height: '100px', margin: '0 auto 20px' }}>
              {[1,2,3].map(i => (
                <div key={i} style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: `2px solid ${MINT}`, animation: `pulse-ring 1.5s ease-out ${i * 0.5}s infinite` }} />
              ))}
              <button onClick={stopListening}
                style={{ width: '100px', height: '100px', borderRadius: '50%', background: '#ef4444', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', zIndex: 1 }}>
                <MicOff size={36} color="white" />
              </button>
            </div>
            {/* Sound wave bars */}
            <div style={{ display: 'flex', gap: '4px', justifyContent: 'center', alignItems: 'center', height: '40px' }}>
              {[1,2,3,4,5,6,7,8].map(i => (
                <div key={i} style={{ width: '4px', borderRadius: '2px', background: MINT, animation: `wave 0.8s ease-in-out ${i * 0.1}s infinite` }} />
              ))}
            </div>
            {transcript && (
              <p style={{ fontSize: '16px', fontWeight: 700, color: INK, marginTop: '16px', minHeight: '24px', fontStyle: 'italic' }}>
                "{transcript}"
              </p>
            )}
          </div>
        )}

        {/* Processing */}
        {state === 'processing' && (
          <div style={{ margin: '28px auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '50%', border: `3px solid #e2eae6`, borderTopColor: MINT, animation: 'spin 0.8s linear infinite' }} />
            <p style={{ fontSize: '14px', fontWeight: 700, color: '#6b7a76', fontStyle: 'italic' }}>"{transcript}"</p>
          </div>
        )}

        {/* Result */}
        {state === 'result' && parsed && (
          <div style={{ margin: '20px 0' }}>
            <div style={{ background: '#f0fdf9', borderRadius: '16px', padding: '18px', marginBottom: '16px', textAlign: 'left', border: `1.5px solid ${MINT}` }}>
              <p style={{ fontSize: '12px', fontWeight: 900, color: '#6b7a76', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '10px' }}>Understood as:</p>
              <p style={{ fontSize: '15px', fontWeight: 900, color: INK, marginBottom: '12px', lineHeight: 1.4 }}>"{parsed.summary}"</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {parsed.query    && <span style={{ fontSize: '12px', fontWeight: 900, padding: '4px 12px', borderRadius: '100px', background: 'white', border: `1px solid ${MINT}`, color: INK }}>🔍 {parsed.query}</span>}
                {parsed.category && <span style={{ fontSize: '12px', fontWeight: 900, padding: '4px 12px', borderRadius: '100px', background: 'white', border: '1px solid #e2eae6', color: '#6b7a76' }}>📂 {parsed.category}</span>}
                {parsed.city     && <span style={{ fontSize: '12px', fontWeight: 900, padding: '4px 12px', borderRadius: '100px', background: 'white', border: '1px solid #e2eae6', color: '#6b7a76' }}>📍 {parsed.city}</span>}
                {parsed.maxPrice && <span style={{ fontSize: '12px', fontWeight: 900, padding: '4px 12px', borderRadius: '100px', background: 'white', border: '1px solid #e2eae6', color: '#6b7a76' }}>💰 Max {parsed.maxPrice.toLocaleString()} MAD</span>}
                {parsed.condition&& <span style={{ fontSize: '12px', fontWeight: 900, padding: '4px 12px', borderRadius: '100px', background: 'white', border: '1px solid #e2eae6', color: '#6b7a76' }}>✨ {parsed.condition}</span>}
              </div>
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={reset}
                style={{ flex: 1, padding: '12px', borderRadius: '12px', border: '1.5px solid #e2eae6', background: 'white', fontSize: '14px', fontWeight: 900, cursor: 'pointer', fontFamily: FONT, color: INK }}>
                Try Again
              </button>
              <button onClick={executeSearch}
                style={{ flex: 2, padding: '12px', borderRadius: '12px', background: `linear-gradient(135deg, ${MINT}, #0f9b8e)`, border: 'none', color: 'white', fontSize: '14px', fontWeight: 900, cursor: 'pointer', fontFamily: FONT, boxShadow: `0 4px 16px rgba(34,212,168,0.3)` }}>
                Search Now →
              </button>
            </div>
          </div>
        )}

        {/* Error */}
        {state === 'error' && (
          <p style={{ fontSize: '13px', color: '#ef4444', fontWeight: 700, marginBottom: '16px' }}>{error}</p>
        )}

        {/* Example hint */}
        {state === 'idle' && (
          <div style={{ marginTop: '8px' }}>
            <p style={{ fontSize: '12px', color: '#6b7a76', fontWeight: 700, marginBottom: '6px' }}>Try saying:</p>
            <p style={{ fontSize: '13px', color: INK, fontWeight: 700, fontStyle: 'italic', transition: 'all 0.3s', minHeight: '20px' }}>
              "{example}"
            </p>
            <p style={{ fontSize: '11px', color: '#6b7a76', fontWeight: 700, marginTop: '12px' }}>
              Speaks French, Arabic, Darija & English 🇲🇦
            </p>
          </div>
        )}
        <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
      </div>
    </div>
  )
}
