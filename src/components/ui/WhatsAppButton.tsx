'use client'

import { MessageCircle } from 'lucide-react'
import { buildWhatsAppLink, listingWhatsAppMessage } from '@/lib/whatsapp'

type Props = {
  /** Seller's phone, however it's stored on file (may include spaces/dashes/country code). */
  phone?: string | null
  /** The listing's title, used to pre-fill "Hi, I found your listing '...' on SouKni!" */
  title: string
  /** Renders a compact circular icon button instead of the default pill. */
  iconOnly?: boolean
  /** Icon size, only used when iconOnly. */
  iconSize?: number
  style?: React.CSSProperties
  className?: string
  children?: React.ReactNode
}

// Renders nothing when there's no usable phone number — never a button that
// goes nowhere. Opens a real WhatsApp chat pre-filled with a message
// referencing the specific listing.
export default function WhatsAppButton({ phone, title, iconOnly = false, iconSize = 15, style, className, children }: Props) {
  const href = buildWhatsAppLink(phone, listingWhatsAppMessage(title))
  if (!href) return null

  const baseStyle: React.CSSProperties = iconOnly
    ? { width: '34px', height: '34px', borderRadius: '50%' }
    : { padding: '8px 16px', borderRadius: '100px', fontSize: '12px' }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={e => e.stopPropagation()}
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '6px',
        backgroundColor: '#25D366',
        color: 'white',
        border: 'none',
        textDecoration: 'none',
        cursor: 'pointer',
        fontWeight: 700,
        fontFamily: 'inherit',
        ...baseStyle,
        ...style,
      }}
    >
      {children ?? (iconOnly ? <MessageCircle size={iconSize} /> : 'WhatsApp')}
    </a>
  )
}
