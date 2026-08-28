'use client'

import { useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { Star } from 'lucide-react'
import { useStore } from '@/lib/store'
import ReviewModal from './ReviewModal'

type Props = {
  revieweeId: string
  listingId?: string | null
  style?: React.CSSProperties
  className?: string
  children?: React.ReactNode
  onSubmitted?: () => void
}

// Simple inline "Leave a review" trigger + its modal. Renders nothing when
// the viewer IS the reviewee — never a button that goes nowhere or lets you
// review yourself. Prompts sign-in when logged out.
export default function ReviewButton({ revieweeId, listingId, style, className, children, onSubmitted }: Props) {
  const { user } = useStore()
  const router = useRouter()
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  if (user && user.id === revieweeId) return null

  const handleClick = () => {
    if (!user) {
      const goSignIn = window.confirm('Sign in to leave a review. Go to sign in now?')
      if (goSignIn) {
        const locale = pathname.split('/')[1] || 'en'
        router.push(`/${locale}/auth?next=${encodeURIComponent(pathname)}`)
      }
      return
    }
    setOpen(true)
  }

  return (
    <>
      <button onClick={handleClick} className={className}
        style={{ cursor: 'pointer', background: 'none', border: 'none', display: 'flex', alignItems: 'center', gap: 6, ...style }}>
        {children ?? (<><Star size={13} /> Leave a Review</>)}
      </button>
      <ReviewModal revieweeId={revieweeId} listingId={listingId} open={open} onClose={() => setOpen(false)} onSubmitted={onSubmitted} />
    </>
  )
}
