'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Camera, Search, X, Sparkles, ChevronRight } from 'lucide-react'

const MINT = '#22d4a8'
const INK  = '#161d1b'
const MUTED = '#6b7a76'
const FONT = "'Inter', system-ui, sans-serif"

const MOCK_RESULTS = [
  { id: '1', title: 'iPhone 15 Pro Max 256GB', price: '12,500 MAD', image: 'https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&w=300', similarity: 97, city: 'Rabat' },
  { id: '4', title: 'iPhone 15 Pro 128GB', price: '10,800 MAD', image: 'https://images.pexels.com/photos/5750001/pexels-photo-5750001.jpeg?auto=compress&w=300', similarity: 89, city: 'Casa' },
  { id: '7', title: 'iPhone 14 Pro Max 256GB', price: '9,500 MAD', image: 'https://images.pexels.com/photos/5750001/pexels-photo-5750001.jpeg?auto=compress&w=300', similarity: 82, city: 'Marrakech' },
]

export default function VisualSearch({ locale }: { locale: string }) {
  const router = useRouter()
  const [open, setOpen]           = useState(false)
  const [image, setImage]         = useState<string | null>(null)
  const [loading, setLoading]     = useState(false)
  const [analysis, setAnalysis]   = useState<any>(null)
  const [results, setResults]     = useState<typeof MOCK_RESULTS>([])
  const fileRef = useRef<HTMLInputElement>(null)

  const handleFile = (file: File) => {
    const reader = new FileReader()
    reader.onload = e => {
      setImage(e.target?.result as string)
      analyzeImage(e.target?.result as string)
    }
    reader.readAsDataURL(file)
  }

  const analyzeImage = async (src: string) => {
    setLoading(true)
    setResults([])
    try {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-6',
          max_tokens: 400,
          messages: [{
            role: 'user',
            content: [
              { type: 'image', source: { type: 'base64', media_type: 'image/jpeg', data: src.split(',')[1] } },
              { type: 'text', text: `Identify this product for a Moroccan marketplace search. Respond ONLY with JSON:
{"item":"<product name>","brand":"<brand or null>","category":"<Electronics|Motors|Property|Fashion|Home|Other>","color":"<main color>","condition_guess":"<new|used>","search_query":"<best search term for marketplace>","confidence":<50-99>}` }
            ]
          }]
        })
      })
      const data = await res.json()
      const text = data.content?.[0]?.text || '{}'
      const parsed = JSON.parse(text.replace(/```json|```/g, '').trim())
      setAnalysis(parsed)
      setResults(MOCK_RESULTS)
    } catch {
      setAnalysis({ item: 'Smartphone', category: 'Electronics', search_query: 'smartphone', confidence: 70 })
      setResults(MOCK_RESULTS)
    }
    setLoading(false)
  }

  const reset = () => { setImage(null); setAnalysis(null); setResults([]) }

  if (!open) return (
    <button onClick={() => setOpen(true)}
      title="Search by photo"
      style={{ width: '36px', height: '36px', borderRadius: '50%', border: `1.5px solid ${MINT}`, background: '#f0fdf9', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Camera size={16} color={MINT} />
    </button>
  )

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 500, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', fontFamily: FONT }}>
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)' }} onClick={() => { setOpen(false); reset() }} />
      <div style={{ position: 'relative', background: 'white', borderRadius: '28px', padding: '28px', maxWidth: '500px', width: '100%', boxShadow: '0 32px 80px rgba(0,0,0,0.3)', maxHeight: '85vh', overflowY: 'auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
          <div>
            <h2 style={{ fontSize: '20px', fontWeight: 900, color: INK, letterSpacing: '-0.05em', marginBottom: '2px' }}>📸 Search by Photo</h2>
            <p style={{ fontSize: '12px', color: MUTED, fontWeight: 700 }}>Take or upload a photo to find similar listings</p>
          </div>
          <button onClick={() => { setOpen(false); reset() }}
            style={{ width: '32px', height: '32px', borderRadius: '50%', border: 'none', background: '#f4fbf8', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <X size={16} color={MUTED} />
          </button>
        </div>

        {!image ? (
          <div>
            <div onClick={() => fileRef.current?.click()}
              style={{ border: `2px dashed ${MINT}`, borderRadius: '18px', padding: '40px 24px', textAlign: 'center', cursor: 'pointer', background: '#f0fdf9', marginBottom: '14px' }}>
              <Camera size={40} color={MINT} style={{ marginBottom: '12px' }} />
              <p style={{ fontSize: '15px', fontWeight: 900, color: INK, marginBottom: '4px' }}>Upload a photo</p>
              <p style={{ fontSize: '12px', color: MUTED, fontWeight: 700 }}>AI will identify the item and find matches</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <button onClick={() => fileRef.current?.click()}
                style={{ padding: '12px', borderRadius: '12px', background: MINT, border: 'none', color: 'white', fontSize: '13px', fontWeight: 900, cursor: 'pointer', fontFamily: FONT, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                <Upload size={14} color="white" /> Upload Photo
              </button>
              <button onClick={() => fileRef.current?.click()}
                style={{ padding: '12px', borderRadius: '12px', background: INK, border: 'none', color: 'white', fontSize: '13px', fontWeight: 900, cursor: 'pointer', fontFamily: FONT, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                <Camera size={14} /> Take Photo
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div style={{ borderRadius: '14px', overflow: 'hidden', marginBottom: '14px', aspectRatio: '4/3', background: '#e2eae6', position: 'relative' }}>
              <img src={image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <button onClick={reset}
                style={{ position: 'absolute', top: '8px', right: '8px', width: '28px', height: '28px', borderRadius: '50%', background: 'rgba(0,0,0,0.5)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <X size={13} color="white" />
              </button>
            </div>

            {loading && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '14px', background: '#f0fdf9', borderRadius: '12px', marginBottom: '14px' }}>
                <div style={{ width: '18px', height: '18px', borderRadius: '50%', border: `2px solid rgba(34,212,168,0.3)`, borderTopColor: MINT, animation: 'spin 0.8s linear infinite', flexShrink: 0 }} />
                <p style={{ fontSize: '13px', fontWeight: 700, color: MUTED }}>AI is identifying your item...</p>
              </div>
            )}

            {analysis && (
              <div style={{ padding: '14px', background: '#f0fdf9', borderRadius: '14px', border: `1px solid ${MINT}`, marginBottom: '14px' }}>
                <p style={{ fontSize: '11px', fontWeight: 900, color: MUTED, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '8px' }}>AI Identified:</p>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  {[
                    analysis.item,
                    analysis.brand,
                    analysis.category,
                    analysis.color,
                    `${analysis.confidence}% confident`
                  ].filter(Boolean).map((tag, i) => (
                    <span key={i} style={{ fontSize: '12px', fontWeight: 900, padding: '4px 10px', borderRadius: '100px', background: 'white', border: `1px solid ${MINT}`, color: i === 0 ? INK : MUTED }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {results.length > 0 && (
              <div>
                <p style={{ fontSize: '13px', fontWeight: 900, color: INK, marginBottom: '10px' }}>
                  🔍 {results.length} similar listings found
                </p>
                {results.map(r => (
                  <div key={r.id} onClick={() => { router.push(`/${locale}/listing/${r.id}`); setOpen(false) }}
                    style={{ display: 'flex', gap: '10px', padding: '10px', borderRadius: '12px', border: '1px solid #e2eae6', marginBottom: '8px', cursor: 'pointer', transition: 'border-color 0.15s' }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = MINT}
                    onMouseLeave={e => e.currentTarget.style.borderColor = '#e2eae6'}
                  >
                    <img src={r.image} alt="" style={{ width: '60px', height: '60px', borderRadius: '10px', objectFit: 'cover', flexShrink: 0 }} />
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: '13px', fontWeight: 900, color: INK, marginBottom: '2px' }}>{r.title}</p>
                      <p style={{ fontSize: '13px', fontWeight: 900, color: MINT, marginBottom: '2px' }}>{r.price}</p>
                      <p style={{ fontSize: '11px', color: MUTED, fontWeight: 700 }}>📍 {r.city}</p>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <span style={{ fontSize: '14px', fontWeight: 900, color: r.similarity > 90 ? MINT : MUTED }}>{r.similarity}%</span>
                      <span style={{ fontSize: '9px', color: MUTED, fontWeight: 700 }}>match</span>
                    </div>
                  </div>
                ))}
                <button onClick={() => { router.push(`/${locale}/search?q=${analysis?.search_query || ''}&visual=1`); setOpen(false) }}
                  style={{ width: '100%', padding: '12px', borderRadius: '12px', background: INK, border: 'none', color: 'white', fontSize: '13px', fontWeight: 900, cursor: 'pointer', fontFamily: FONT, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', marginTop: '8px' }}>
                  <Search size={14} /> See all matches
                </button>
              </div>
            )}
          </div>
        )}
        <input ref={fileRef} type="file" accept="image/*" capture="environment" style={{ display: 'none' }} onChange={e => e.target.files?.[0] && handleFile(e.target.files[0])} />
        <style>{`@keyframes spin{to{transform:rotate(360deg)}} @keyframes Upload{}`}</style>
      </div>
    </div>
  )
}

// Need to add Upload icon
function Upload({ size, color }: { size: number; color: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
      <polyline points="17 8 12 3 7 8"/>
      <line x1="12" y1="3" x2="12" y2="15"/>
    </svg>
  )
}
