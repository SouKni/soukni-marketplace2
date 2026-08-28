'use client'

import { useState } from 'react'
import { X, Star } from 'lucide-react'
import { useStore } from '@/lib/store'
import { getSupabaseClient } from '@/lib/supabase/client'

type Props = {
  revieweeId: string
  listingId?: string | null
  open: boolean
  onClose: () => void
  onSubmitted?: () => void
}

// Star-rating + optional-comment modal that inserts a row into `reviews`.
// RLS only allows the insert when a real conversation exists between the two
// users — this surfaces that as a friendly message rather than a raw error.
export default function ReviewModal({ revieweeId, listingId, open, onClose, onSubmitted }: Props) {
  const { user } = useStore()
  const supabase = getSupabaseClient()
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [comment, setComment] = useState('')
  const [anonymous, setAnonymous] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [done, setDone] = useState(false)

  if (!open) return null

  const reset = () => { setRating(0); setHoverRating(0); setComment(''); setAnonymous(false); setError(null); setDone(false) }
  const handleClose = () => { reset(); onClose() }

  const handleSubmit = async () => {
    if (!user || rating === 0 || submitting) return
    setSubmitting(true)
    setError(null)
    const { error: insertError } = await supabase.from('reviews').insert({
      reviewer_id: user.id,
      reviewee_id: revieweeId,
      listing_id: listingId ?? null,
      rating,
      comment: comment.trim() || null,
      anonymous,
    })
    setSubmitting(false)
    if (insertError) {
      if (insertError.code === '23505') {
        setError("You've already reviewed this.")
      } else if (insertError.code === '42501' || insertError.message.includes('row-level security')) {
        setError('You can only review someone after messaging them.')
      } else {
        setError("Couldn't submit your review. Please try again.")
      }
      return
    }
    setDone(true)
    onSubmitted?.()
  }

  return (
    <div onClick={handleClose} style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(22,29,27,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: 16 }}>
      <div onClick={e => e.stopPropagation()} style={{ backgroundColor: 'white', borderRadius: 20, padding: 24, width: '100%', maxWidth: 420, boxShadow: '0 20px 60px rgba(0,0,0,0.25)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <h3 style={{ fontSize: 16, fontWeight: 900, color: '#161d1b', margin: 0 }}>Leave a review</h3>
          <button onClick={handleClose} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, display: 'flex' }}>
            <X size={18} color="#6b7a76" />
          </button>
        </div>

        {done ? (
          <div style={{ textAlign: 'center', padding: '16px 0' }}>
            <p style={{ fontSize: 14, fontWeight: 700, color: '#161d1b', marginBottom: 4 }}>Thanks, review posted!</p>
            <p style={{ fontSize: 12, color: '#6b7a76', marginBottom: 20 }}>It's now visible on this seller's profile.</p>
            <button onClick={handleClose} style={{ width: '100%', padding: '12px 0', borderRadius: 100, backgroundColor: '#161d1b', color: 'white', border: 'none', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>
              Close
            </button>
          </div>
        ) : (
          <>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginBottom: 20 }}>
              {[1, 2, 3, 4, 5].map(i => (
                <button key={i} onClick={() => setRating(i)} onMouseEnter={() => setHoverRating(i)} onMouseLeave={() => setHoverRating(0)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 2 }}>
                  <Star size={28} fill={i <= (hoverRating || rating) ? '#f59e0b' : 'none'} color="#f59e0b" />
                </button>
              ))}
            </div>

            <p style={{ fontSize: 12, fontWeight: 700, color: '#6b7a76', marginBottom: 8 }}>Comment (optional)</p>
            <textarea value={comment} onChange={e => setComment(e.target.value)} rows={3} maxLength={1000}
              placeholder="How was your experience?"
              style={{ width: '100%', padding: 10, borderRadius: 10, border: '1.5px solid #e2eae6', fontSize: 13, fontFamily: 'inherit', resize: 'vertical', marginBottom: 12, boxSizing: 'border-box' }} />

            <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, fontWeight: 600, color: '#161d1b', marginBottom: 16, cursor: 'pointer' }}>
              <input type="checkbox" checked={anonymous} onChange={e => setAnonymous(e.target.checked)} style={{ accentColor: '#22d4a8' }} />
              Post anonymously
            </label>

            {error && <p style={{ fontSize: 12, color: '#dc2626', fontWeight: 700, marginBottom: 12 }}>{error}</p>}

            <button onClick={handleSubmit} disabled={rating === 0 || submitting}
              style={{ width: '100%', padding: '12px 0', borderRadius: 100, backgroundColor: rating > 0 ? '#161d1b' : '#e2eae6', color: 'white', border: 'none', fontSize: 13, fontWeight: 700, cursor: rating > 0 && !submitting ? 'pointer' : 'not-allowed' }}>
              {submitting ? 'Submitting…' : 'Submit review'}
            </button>
          </>
        )}
      </div>
    </div>
  )
}
