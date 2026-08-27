'use client'

import { useEffect, useState } from 'react'
import { ArrowUp } from 'lucide-react'

// Mounted once in the locale layout so it appears on every page without
// per-page wiring. Sits bottom-left — SouKniConcierge owns bottom-right.
export default function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 480)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!visible) return null

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
      style={{
        position: 'fixed',
        bottom: 24,
        left: 24,
        zIndex: 400,
        width: 44,
        height: 44,
        borderRadius: '50%',
        backgroundColor: '#161d1b',
        color: '#22d4a8',
        border: 'none',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 8px 24px rgba(0,0,0,0.25)',
      }}
    >
      <ArrowUp size={18} />
    </button>
  )
}
