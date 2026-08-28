'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Camera, Search, X, ChevronRight } from 'lucide-react'
import { CATEGORIES, CONDITION_FROM_DB } from '@/lib/categories'
import { resizeImage } from '@/lib/resizeImage'

const MINT = '#22d4a8'
const INK  = '#161d1b'
const MUTED = '#6b7a76'
const FONT = "'Inter', system-ui, sans-serif"

type Analysis = {
  title: string
  category: string | null
  brand: string | null
  color: string | null
  condition: string | null
  material: string | null
  keywords: string
  confidence: number
}

type Result = {
  id: string
  title: string
  price: number
  currency: string
  image: string | null
  city: string | null
  condition: string | null
}

function categoryLabel(slug: string | null) {
  return CATEGORIES.find(c => c.slug === slug)?.label || null
}

export default function VisualSearch({ locale }: { locale: string }) {
  const router = useRouter()
  const [open, setOpen]           = useState(false)
  const [image, setImage]         = useState<string | null>(null)
  const [loading, setLoading]     = useState(false)
  const [analysis, setAnalysis]   = useState<Analysis | null>(null)
  const [results, setResults]     = useState<Result[]>([])
  const [notice, setNotice]       = useState<string | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  const handleFile = async (file: File) => {
    try {
      const dataUrl = await resizeImage(file)
      setImage(dataUrl)
      analyzeImage(dataUrl)
    } catch {
      setNotice('Could not read that photo — please try another one.')
    }
  }

  const analyzeImage = async (src: string) => {
    setLoading(true)
    setResults([])
    setAnalysis(null)
    setNotice(null)
    try {
      const res = await fetch('/api/visual-search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: src }),
      })
      const data = await res.json()
      if (data.analysis) setAnalysis(data.analysis)
      if (Array.isArray(data.results)) setResults(data.results)
      if (data.message) setNotice(data.message)
      else if (data.analysis && (!data.results || data.results.length === 0)) {
        setNotice(`No active listings matched "${data.analysis.title}" yet.`)
      }
    } catch {
      setNotice('Visual search failed to reach the server. Please try again.')
    }
    setLoading(false)
  }

  const reset = () => { setImage(null); setAnalysis(null); setResults([]); setNotice(null) }

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
                    analysis.title,
                    analysis.brand,
                    categoryLabel(analysis.category),
                    analysis.color,
                    analysis.condition ? CONDITION_FROM_DB[analysis.condition] : null,
                    `${analysis.confidence}% confident`,
                  ].filter(Boolean).map((tag, i) => (
                    <span key={i} style={{ fontSize: '12px', fontWeight: 900, padding: '4px 10px', borderRadius: '100px', background: 'white', border: `1px solid ${MINT}`, color: i === 0 ? INK : MUTED }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {notice && (
              <div style={{ padding: '12px 14px', background: '#fff7ed', border: '1px solid #fdba74', borderRadius: '12px', marginBottom: '14px' }}>
                <p style={{ fontSize: '12px', color: '#9a3412', fontWeight: 700, lineHeight: 1.5 }}>{notice}</p>
              </div>
            )}

            {results.length > 0 && (
              <div>
                <p style={{ fontSize: '13px', fontWeight: 900, color: INK, marginBottom: '10px' }}>
                  🔍 {results.length} matching listing{results.length === 1 ? '' : 's'} found
                </p>
                {results.map(r => (
                  <div key={r.id} onClick={() => { router.push(`/${locale}/listing/${r.id}`); setOpen(false) }}
                    style={{ display: 'flex', gap: '10px', padding: '10px', borderRadius: '12px', border: '1px solid #e2eae6', marginBottom: '8px', cursor: 'pointer', transition: 'border-color 0.15s' }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = MINT}
                    onMouseLeave={e => e.currentTarget.style.borderColor = '#e2eae6'}
                  >
                    {r.image ? (
                      <img src={r.image} alt="" style={{ width: '60px', height: '60px', borderRadius: '10px', objectFit: 'cover', flexShrink: 0 }} />
                    ) : (
                      <div style={{ width: '60px', height: '60px', borderRadius: '10px', background: '#e2eae6', flexShrink: 0 }} />
                    )}
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: '13px', fontWeight: 900, color: INK, marginBottom: '2px' }}>{r.title}</p>
                      <p style={{ fontSize: '13px', fontWeight: 900, color: MINT, marginBottom: '2px' }}>{Math.round(r.price / 100).toLocaleString()} {r.currency}</p>
                      <p style={{ fontSize: '11px', color: MUTED, fontWeight: 700 }}>📍 {r.city || 'Morocco'}</p>
                    </div>
                    <ChevronRight size={16} color={MUTED} style={{ flexShrink: 0, alignSelf: 'center' }} />
                  </div>
                ))}
                <button onClick={() => { router.push(`/${locale}/search?q=${encodeURIComponent(analysis?.keywords || '')}`); setOpen(false) }}
                  style={{ width: '100%', padding: '12px', borderRadius: '12px', background: INK, border: 'none', color: 'white', fontSize: '13px', fontWeight: 900, cursor: 'pointer', fontFamily: FONT, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', marginTop: '8px' }}>
                  <Search size={14} /> See all matches
                </button>
              </div>
            )}

            {!loading && analysis && results.length === 0 && (
              <button onClick={() => { router.push(`/${locale}/search?q=${encodeURIComponent(analysis?.keywords || '')}`); setOpen(false) }}
                style={{ width: '100%', padding: '12px', borderRadius: '12px', background: INK, border: 'none', color: 'white', fontSize: '13px', fontWeight: 900, cursor: 'pointer', fontFamily: FONT, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                <Search size={14} /> Browse "{analysis.keywords}" manually
              </button>
            )}

            {!loading && !analysis && notice && (
              <button onClick={() => { router.push(`/${locale}/search`); setOpen(false) }}
                style={{ width: '100%', padding: '12px', borderRadius: '12px', background: INK, border: 'none', color: 'white', fontSize: '13px', fontWeight: 900, cursor: 'pointer', fontFamily: FONT, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                <Search size={14} /> Search manually
              </button>
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
