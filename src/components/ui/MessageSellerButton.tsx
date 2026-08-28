'use client'

import { useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useStore } from '@/lib/store'
import { useMessages } from '@/hooks/useMessages'

type Props = {
  /** The listing this conversation is about, if any (nullable — matches the DB column). */
  listingId?: string | null
  /** The seller's profile id. Renders nothing if missing — never a button that goes nowhere. */
  sellerId?: string | null
  style?: React.CSSProperties
  className?: string
  children?: React.ReactNode
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onClick' | 'style' | 'className' | 'children'>

// Starts (or resumes) a real conversation and navigates to it. Prompts
// logged-out users to sign in instead of silently failing. Renders nothing
// when there's no real seller to message, or when the viewer IS the seller.
export default function MessageSellerButton({ listingId, sellerId, style, className, children, ...rest }: Props) {
  const { user } = useStore()
  const { startConversation } = useMessages()
  const router = useRouter()
  const pathname = usePathname()
  const [loading, setLoading] = useState(false)

  if (!sellerId) return null
  if (user && user.id === sellerId) return null

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (!user) {
      const goSignIn = window.confirm('Sign in to message the seller. Go to sign in now?')
      if (goSignIn) {
        const locale = pathname.split('/')[1] || 'en'
        router.push(`/${locale}/auth?next=${encodeURIComponent(pathname)}`)
      }
      return
    }

    if (loading) return
    setLoading(true)
    const conversationId = await startConversation(listingId ?? null, sellerId)
    setLoading(false)

    if (conversationId) {
      const locale = pathname.split('/')[1] || 'en'
      router.push(`/${locale}/messages?c=${conversationId}`)
    }
  }

  return (
    <button onClick={handleClick} disabled={loading} className={className} style={{ cursor: loading ? 'wait' : 'pointer', ...style }} {...rest}>
      {children ?? 'Message'}
    </button>
  )
}
