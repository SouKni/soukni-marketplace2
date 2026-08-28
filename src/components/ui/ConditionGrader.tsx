'use client'

import { useState, useRef } from 'react'
import { Camera, Check, RotateCcw, ShieldAlert, ShieldCheck, ShieldQuestion } from 'lucide-react'
import { CONDITION_FROM_DB } from '@/lib/categories'
import { resizeImage } from '@/lib/resizeImage'

const MINT = '#22d4a8'
const INK  = '#161d1b'
const MUTED = '#6b7a76'
const FONT = "'Inter', system-ui, sans-serif"

type Grading = {
  condition: string | null
  confidence: number
  flaws: string[]
  authenticityFlag: 'none' | 'uncertain' | 'concern'
  authenticityNote: string
  summary: string
}

const FLAG_STYLE: Record<string, { color: string; bg: string; icon: any; label: string }> = {
  none:      { color: '#16a34a', bg: '#f0fdf4', icon: ShieldCheck,   label: 'No concerns visible' },
  uncertain: { color: '#d97706', bg: '#fffbeb', icon: ShieldQuestion, label: 'Could not verify from this photo' },
  concern:   { color: '#dc2626', bg: '#fef2f2', icon: ShieldAlert,   label: 'Possible concern — review carefully' },
}

export default function ConditionGrader({ title, category, onApply }: {
  title?: string
  category?: string
  onApply?: (result: { condition: string; note: string }) => void
}) {
  const fileRef = useRef<HTMLInputElement>(null)
  const [image, setImage]     = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [grading, setGrading] = useState<Grading | null>(null)
  const [notice, setNotice]   = useState<string | null>(null)
  const [applied, setApplied] = useState(false)

  const handleFile = async (file: File) => {
    let dataUrl: string
    try {
      dataUrl = await resizeImage(file)
    } catch {
      setNotice('Could not read that photo — please try another one.')
      return
    }
    setImage(dataUrl)
    setGrading(null)
    setNotice(null)
    setApplied(false)
    setLoading(true)
    try {
      const res = await fetch('/api/verify-condition', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: dataUrl, title, category }),
      })
      const data = await res.json()
      if (data.grading) setGrading(data.grading)
      if (data.message) setNotice(data.message)
    } catch {
      setNotice('Condition check failed to reach the server. Please try again.')
    }
    setLoading(false)
  }

  const reset = () => { setImage(null); setGrading(null); setNotice(null); setApplied(false); if (fileRef.current) fileRef.current.value = '' }

  const apply = () => {
    if (!grading?.condition) return
    const note = [grading.summary, grading.flaws.length ? `Notable: ${grading.flaws.join(', ')}.` : null].filter(Boolean).join(' ')
    onApply?.({ condition: CONDITION_FROM_DB[grading.condition] || grading.condition, note })
    setApplied(true)
  }

  return (
    <div style={{ fontFamily: FONT }}>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={e => e.target.files?.[0] && handleFile(e.target.files[0])} />

      {!image ? (
        <div onClick={() => fileRef.current?.click()}
          style={{ border: `2px dashed ${MINT}`, borderRadius: '16px', padding: '24px', display: 'flex', alignItems: 'center', gap: '14px', cursor: 'pointer', background: '#f0fdf9' }}>
          <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: `linear-gradient(135deg, ${MINT}, #0f9b8e)`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Camera size={20} color="white" />
          </div>
          <div>
            <p style={{ fontSize: '13px', fontWeight: 900, color: INK, marginBottom: '2px' }}>Upload a close-up for AI condition check</p>
            <p style={{ fontSize: '11px', color: MUTED, fontWeight: 700 }}>Flags visible wear, damage, or authenticity concerns</p>
          </div>
        </div>
      ) : (
        <div>
          <div style={{ display: 'flex', gap: '14px', marginBottom: '14px' }}>
            <div style={{ width: '84px', height: '84px', borderRadius: '14px', overflow: 'hidden', background: '#e2eae6', flexShrink: 0 }}>
              <img src={image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ flex: 1 }}>
              {loading && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px', background: '#f0fdf9', borderRadius: '10px', height: '100%' }}>
                  <div style={{ width: '16px', height: '16px', borderRadius: '50%', border: `2px solid rgba(34,212,168,0.3)`, borderTopColor: MINT, animation: 'spin 0.8s linear infinite', flexShrink: 0 }} />
                  <p style={{ fontSize: '12px', fontWeight: 700, color: MUTED }}>Inspecting photo...</p>
                </div>
              )}
              {!loading && notice && !grading && (
                <div style={{ padding: '12px 14px', background: '#fff7ed', border: '1px solid #fdba74', borderRadius: '10px' }}>
                  <p style={{ fontSize: '11px', color: '#9a3412', fontWeight: 700, lineHeight: 1.5 }}>{notice}</p>
                </div>
              )}
              {!loading && grading && (
                <button onClick={reset} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 14px', borderRadius: '10px', border: '1.5px solid #e2eae6', background: 'white', fontSize: '12px', fontWeight: 900, cursor: 'pointer', fontFamily: FONT, color: INK }}>
                  <RotateCcw size={12} /> Try Another Photo
                </button>
              )}
            </div>
          </div>

          {grading && (
            <div>
              <div style={{ display: 'flex', gap: '10px', marginBottom: '12px' }}>
                <div style={{ flex: 1, padding: '12px', background: '#f0fdf9', borderRadius: '12px', textAlign: 'center' }}>
                  <p style={{ fontSize: '10px', fontWeight: 900, color: MUTED, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '4px' }}>Condition</p>
                  <p style={{ fontSize: '15px', fontWeight: 900, color: INK }}>{grading.condition ? CONDITION_FROM_DB[grading.condition] || grading.condition : 'Unclear'}</p>
                  <p style={{ fontSize: '10px', color: MUTED, fontWeight: 700 }}>{grading.confidence}% confident</p>
                </div>
                {(() => {
                  const flag = FLAG_STYLE[grading.authenticityFlag]
                  const Icon = flag.icon
                  return (
                    <div style={{ flex: 1, padding: '12px', background: flag.bg, borderRadius: '12px', textAlign: 'center' }}>
                      <Icon size={18} color={flag.color} style={{ marginBottom: '4px' }} />
                      <p style={{ fontSize: '11px', fontWeight: 900, color: flag.color }}>{flag.label}</p>
                    </div>
                  )
                })()}
              </div>

              <div style={{ padding: '12px 14px', background: '#f4fbf8', borderRadius: '12px', marginBottom: '10px' }}>
                <p style={{ fontSize: '12px', color: INK, fontWeight: 700, lineHeight: 1.5, marginBottom: grading.flaws.length ? '8px' : 0 }}>{grading.summary}</p>
                {grading.flaws.map((f, i) => (
                  <p key={i} style={{ fontSize: '11px', color: MUTED, fontWeight: 600, lineHeight: 1.5 }}>⚠ {f}</p>
                ))}
              </div>

              {grading.authenticityFlag !== 'none' && grading.authenticityNote && (
                <div style={{ padding: '10px 14px', background: FLAG_STYLE[grading.authenticityFlag].bg, borderRadius: '10px', marginBottom: '10px' }}>
                  <p style={{ fontSize: '11px', color: FLAG_STYLE[grading.authenticityFlag].color, fontWeight: 700, lineHeight: 1.5 }}>{grading.authenticityNote}</p>
                </div>
              )}

              <p style={{ fontSize: '10px', color: MUTED, fontWeight: 600, marginBottom: '10px', lineHeight: 1.4 }}>
                AI assessment is a guide only — not a guarantee of condition or authenticity.
              </p>

              {onApply && grading.condition && (
                <button onClick={apply} disabled={applied}
                  style={{ width: '100%', padding: '11px', borderRadius: '11px', background: applied ? '#e2eae6' : `linear-gradient(135deg, ${MINT}, #0f9b8e)`, border: 'none', color: applied ? MUTED : 'white', fontSize: '13px', fontWeight: 900, cursor: applied ? 'default' : 'pointer', fontFamily: FONT, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                  <Check size={14} /> {applied ? 'Applied to Listing' : 'Apply to Listing'}
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
