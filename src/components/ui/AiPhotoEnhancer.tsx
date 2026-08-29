'use client'

import { useState, useRef } from 'react'
import { Upload, Sparkles, RotateCcw, Check, Camera, ShieldAlert } from 'lucide-react'
import { resizeImage } from '@/lib/resizeImage'

const MINT = '#22d4a8'
const INK  = '#161d1b'
const MUTED = '#6b7a76'
const FONT = "'Inter', system-ui, sans-serif"

type Enhancement = 'auto' | 'remove_bg' | 'brighten' | 'sharpen' | 'compress'

type Assessment = {
  score: number
  strengths: string[]
  issues: string[]
  tip: string
}

export default function AiPhotoEnhancer({ onEnhanced }: { onEnhanced?: (url: string) => void }) {
  const [image, setImage]       = useState<string | null>(null)
  const [assessment, setAssessment] = useState<Assessment | null>(null)
  const [notice, setNotice]     = useState<string | null>(null)
  const [loading, setLoading]   = useState(false)
  const [enhancements, setEnhancements] = useState<Enhancement[]>(['auto'])
  const fileRef = useRef<HTMLInputElement>(null)

  const handleFile = async (file: File) => {
    if (!file.type.startsWith('image/')) return
    let dataUrl: string
    try {
      dataUrl = await resizeImage(file)
    } catch {
      setNotice('Could not read that photo — please try another one.')
      return
    }
    setImage(dataUrl)
    setAssessment(null)
    setNotice(null)
  }

  const enhance = async () => {
    if (!image) return
    setLoading(true)
    setNotice(null)
    try {
      const res = await fetch('/api/ai-photo-enhance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image }),
      })
      const data = await res.json()
      if (data.assessment) setAssessment(data.assessment)
      if (data.message) setNotice(data.message)
    } catch {
      setNotice('Photo quality assessment failed to reach the server. You can still use this photo as-is.')
    }
    setLoading(false)
  }

  const ENHANCE_OPTIONS: { key: Enhancement; label: string; emoji: string; desc: string }[] = [
    { key: 'auto',      label: 'Auto Enhance',   emoji: '✨', desc: 'AI adjusts everything automatically' },
    { key: 'brighten',  label: 'Brighten',        emoji: '☀️', desc: 'Fix dark or underexposed photos' },
    { key: 'sharpen',   label: 'Sharpen',         emoji: '🔍', desc: 'Make details crisp and clear' },
    { key: 'remove_bg', label: 'Remove Background', emoji: '🎭', desc: 'Clean white/neutral background' },
    { key: 'compress',  label: 'Compress',        emoji: '📦', desc: 'Optimise size for faster loading' },
  ]

  const toggle = (k: Enhancement) =>
    setEnhancements(prev => prev.includes(k) ? prev.filter(e => e !== k) : [...prev, k])

  return (
    <div style={{ fontFamily: FONT }}>
      <style>{`
        @keyframes spin { to { transform: rotate(360deg) } }
        @keyframes shimmer { 0%{background-position:-200%} 100%{background-position:200%} }
      `}</style>

      {!image ? (
        /* Upload zone */
        <div
          onClick={() => fileRef.current?.click()}
          onDragOver={e => e.preventDefault()}
          onDrop={e => { e.preventDefault(); const f = e.dataTransfer.files[0]; if(f) handleFile(f) }}
          style={{ border: `2px dashed ${MINT}`, borderRadius: '20px', padding: '48px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', cursor: 'pointer', background: '#f0fdf9', transition: 'all 0.2s' }}
          onMouseEnter={e => e.currentTarget.style.background = '#e6f9f3'}
          onMouseLeave={e => e.currentTarget.style.background = '#f0fdf9'}
        >
          <div style={{ width: '64px', height: '64px', borderRadius: '18px', background: `linear-gradient(135deg, ${MINT}, #0f9b8e)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Camera size={28} color="white" />
          </div>
          <p style={{ fontSize: '16px', fontWeight: 900, color: INK, letterSpacing: '-0.03em' }}>Drop your listing photo here</p>
          <p style={{ fontSize: '13px', color: MUTED, fontWeight: 700 }}>AI will enhance it automatically · JPG, PNG · Max 10MB</p>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center' }}>
            {['✨ Auto-enhance', '🎭 Remove background', '☀️ Fix lighting', '🔍 Sharpen'].map(f => (
              <span key={f} style={{ fontSize: '12px', fontWeight: 700, padding: '4px 12px', borderRadius: '100px', background: 'white', border: `1px solid ${MINT}`, color: MINT }}>{f}</span>
            ))}
          </div>
        </div>
      ) : !assessment && !notice ? (
        /* Enhancement options */
        <div>
          <div style={{ borderRadius: '16px', overflow: 'hidden', marginBottom: '16px', aspectRatio: '16/10', background: '#e2eae6', position: 'relative' }}>
            <img src={image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', top: '10px', right: '10px', display: 'flex', gap: '6px' }}>
              <button onClick={() => { setImage(null); fileRef.current && (fileRef.current.value = '') }}
                style={{ padding: '6px 12px', borderRadius: '10px', background: 'rgba(0,0,0,0.6)', border: 'none', color: 'white', fontSize: '12px', fontWeight: 700, cursor: 'pointer', fontFamily: FONT }}>
                Change photo
              </button>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '14px' }}>
            <p style={{ fontSize: '12px', fontWeight: 900, color: MUTED, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Enhancement Options</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
              {ENHANCE_OPTIONS.map(opt => (
                <button key={opt.key} onClick={() => toggle(opt.key)}
                  style={{ padding: '10px 8px', borderRadius: '12px', border: `1.5px solid ${enhancements.includes(opt.key) ? MINT : '#e2eae6'}`, background: enhancements.includes(opt.key) ? '#f0fdf9' : 'white', cursor: 'pointer', fontFamily: FONT, textAlign: 'center', position: 'relative' }}>
                  {enhancements.includes(opt.key) && (
                    <div style={{ position: 'absolute', top: '6px', right: '6px', width: '16px', height: '16px', borderRadius: '50%', background: MINT, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Check size={10} color="white" strokeWidth={3} />
                    </div>
                  )}
                  <p style={{ fontSize: '18px', marginBottom: '3px' }}>{opt.emoji}</p>
                  <p style={{ fontSize: '11px', fontWeight: 900, color: enhancements.includes(opt.key) ? MINT : INK }}>{opt.label}</p>
                </button>
              ))}
            </div>
          </div>

          <button onClick={enhance} disabled={loading}
            style={{ width: '100%', padding: '14px', borderRadius: '12px', background: loading ? '#e2eae6' : `linear-gradient(135deg, ${MINT}, #0f9b8e)`, border: 'none', color: loading ? MUTED : 'white', fontSize: '14px', fontWeight: 900, cursor: loading ? 'not-allowed' : 'pointer', fontFamily: FONT, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', boxShadow: loading ? 'none' : `0 4px 16px rgba(34,212,168,0.3)` }}>
            {loading
              ? <><div style={{ width: '16px', height: '16px', borderRadius: '50%', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: 'white', animation: 'spin 0.8s linear infinite' }} /> Analysing with AI...</>
              : <><Sparkles size={16} /> Enhance with AI</>
            }
          </button>
        </div>
      ) : (
        /* Assessment result — a real read on the photo as-is; nothing here
           implies the image itself was edited, since no real enhancement
           happens. */
        <div>
          <div style={{ borderRadius: '16px', overflow: 'hidden', marginBottom: '14px', aspectRatio: '16/10', position: 'relative', background: '#e2eae6' }}>
            <img src={image!} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            {assessment && (
              <div style={{ position: 'absolute', top: '10px', left: '10px', padding: '4px 10px', borderRadius: '100px', background: MINT, color: 'white', fontSize: '11px', fontWeight: 900 }}>
                Quality Score: {assessment.score}/100
              </div>
            )}
          </div>

          {notice && (
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', padding: '12px 14px', background: '#fff7ed', border: '1px solid #fdba74', borderRadius: '12px', marginBottom: '12px' }}>
              <ShieldAlert size={14} color="#9a3412" style={{ flexShrink: 0, marginTop: '1px' }} />
              <p style={{ fontSize: '12px', color: '#9a3412', fontWeight: 700, lineHeight: 1.5 }}>{notice}</p>
            </div>
          )}

          {assessment && (
            <>
              {assessment.strengths.length > 0 && (
                <div style={{ background: '#f0fdf9', borderRadius: '14px', padding: '14px', border: `1px solid ${MINT}`, marginBottom: '10px' }}>
                  <p style={{ fontSize: '12px', fontWeight: 900, color: MUTED, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '8px' }}>
                    What's working
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                    {assessment.strengths.map((s, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Check size={12} color={MINT} />
                        <span style={{ fontSize: '12px', color: '#0f9b8e', fontWeight: 700 }}>{s}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {assessment.issues.length > 0 && (
                <div style={{ background: '#fef2f2', borderRadius: '14px', padding: '14px', border: '1px solid #fecaca', marginBottom: '10px' }}>
                  <p style={{ fontSize: '12px', fontWeight: 900, color: '#b91c1c', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '8px' }}>
                    Worth fixing
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                    {assessment.issues.map((s, i) => (
                      <span key={i} style={{ fontSize: '12px', color: '#b91c1c', fontWeight: 700 }}>· {s}</span>
                    ))}
                  </div>
                </div>
              )}

              <p style={{ fontSize: '12px', color: MUTED, fontWeight: 700, lineHeight: 1.5, marginBottom: '14px' }}>💡 {assessment.tip}</p>
            </>
          )}

          {/* Actions */}
          <div style={{ display: 'flex', gap: '8px' }}>
            <button onClick={() => { setAssessment(null); setNotice(null) }}
              style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '11px 16px', borderRadius: '11px', border: '1.5px solid #e2eae6', background: 'white', fontSize: '13px', fontWeight: 900, cursor: 'pointer', fontFamily: FONT, color: INK }}>
              <RotateCcw size={14} /> Redo
            </button>
            <button onClick={() => onEnhanced?.(image!)}
              style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', padding: '11px', borderRadius: '11px', background: `linear-gradient(135deg, ${MINT}, #0f9b8e)`, border: 'none', color: 'white', fontSize: '13px', fontWeight: 900, cursor: 'pointer', fontFamily: FONT }}>
              <Check size={14} /> Use This Photo
            </button>
          </div>
        </div>
      )}
      <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={e => e.target.files?.[0] && handleFile(e.target.files[0])} />
    </div>
  )
}
