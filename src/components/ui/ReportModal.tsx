'use client'

import { useState } from 'react'
import { X, Flag } from 'lucide-react'
import { useStore } from '@/lib/store'
import { getSupabaseClient } from '@/lib/supabase/client'

export type ReportTargetType = 'listing' | 'user' | 'message'

const REASONS: { value: string; label: string }[] = [
  { value: 'scam', label: 'Scam or fraud' },
  { value: 'inappropriate', label: 'Inappropriate content' },
  { value: 'spam', label: 'Spam' },
  { value: 'fake', label: 'Fake listing or profile' },
  { value: 'other', label: 'Other' },
]

type Props = {
  targetType: ReportTargetType
  targetId: string
  open: boolean
  onClose: () => void
}

// Reason-picker + optional-details modal that inserts a row into `reports`.
// Never reveals report counts or other reporters' info — just a thanks toast.
export default function ReportModal({ targetType, targetId, open, onClose }: Props) {
  const { user } = useStore()
  const supabase = getSupabaseClient()
  const [reason, setReason] = useState('')
  const [details, setDetails] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [done, setDone] = useState(false)

  if (!open) return null

  const reset = () => { setReason(''); setDetails(''); setError(null); setDone(false) }
  const handleClose = () => { reset(); onClose() }

  const handleSubmit = async () => {
    if (!user || !reason || submitting) return
    setSubmitting(true)
    setError(null)
    const { error: insertError } = await supabase.from('reports').insert({
      reporter_id: user.id,
      target_type: targetType,
      target_id: targetId,
      reason,
      details: details.trim() || null,
    })
    setSubmitting(false)
    if (insertError) {
      setError(insertError.message.includes('already reported') || insertError.message.includes('Too many reports')
        ? insertError.message
        : "Couldn't submit your report. Please try again.")
      return
    }
    setDone(true)
  }

  return (
    <div onClick={handleClose} style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(22,29,27,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: 16 }}>
      <div onClick={e => e.stopPropagation()} style={{ backgroundColor: 'white', borderRadius: 20, padding: 24, width: '100%', maxWidth: 420, boxShadow: '0 20px 60px rgba(0,0,0,0.25)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Flag size={16} color="#ef4444" />
            <h3 style={{ fontSize: 16, fontWeight: 900, color: '#161d1b', margin: 0 }}>Report {targetType}</h3>
          </div>
          <button onClick={handleClose} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, display: 'flex' }}>
            <X size={18} color="#6b7a76" />
          </button>
        </div>

        {done ? (
          <div style={{ textAlign: 'center', padding: '16px 0' }}>
            <p style={{ fontSize: 14, fontWeight: 700, color: '#161d1b', marginBottom: 4 }}>Thanks, we'll review this.</p>
            <p style={{ fontSize: 12, color: '#6b7a76', marginBottom: 20 }}>Our team looks at every report.</p>
            <button onClick={handleClose} style={{ width: '100%', padding: '12px 0', borderRadius: 100, backgroundColor: '#161d1b', color: 'white', border: 'none', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>
              Close
            </button>
          </div>
        ) : (
          <>
            <p style={{ fontSize: 12, fontWeight: 700, color: '#6b7a76', marginBottom: 8 }}>Reason</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 16 }}>
              {REASONS.map(r => (
                <label key={r.value} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 12px', borderRadius: 10, border: `1.5px solid ${reason === r.value ? '#22d4a8' : '#e2eae6'}`, backgroundColor: reason === r.value ? '#f0fdf9' : 'white', cursor: 'pointer', fontSize: 13, fontWeight: 600, color: '#161d1b' }}>
                  <input type="radio" name="report-reason" value={r.value} checked={reason === r.value} onChange={() => setReason(r.value)} style={{ accentColor: '#22d4a8' }} />
                  {r.label}
                </label>
              ))}
            </div>

            <p style={{ fontSize: 12, fontWeight: 700, color: '#6b7a76', marginBottom: 8 }}>Details (optional)</p>
            <textarea value={details} onChange={e => setDetails(e.target.value)} rows={3} maxLength={1000}
              placeholder="Anything that would help us review this…"
              style={{ width: '100%', padding: 10, borderRadius: 10, border: '1.5px solid #e2eae6', fontSize: 13, fontFamily: 'inherit', resize: 'vertical', marginBottom: 16, boxSizing: 'border-box' }} />

            {error && <p style={{ fontSize: 12, color: '#dc2626', fontWeight: 700, marginBottom: 12 }}>{error}</p>}

            <button onClick={handleSubmit} disabled={!reason || submitting}
              style={{ width: '100%', padding: '12px 0', borderRadius: 100, backgroundColor: reason ? '#161d1b' : '#e2eae6', color: 'white', border: 'none', fontSize: 13, fontWeight: 700, cursor: reason && !submitting ? 'pointer' : 'not-allowed' }}>
              {submitting ? 'Submitting…' : 'Submit report'}
            </button>
          </>
        )}
      </div>
    </div>
  )
}
