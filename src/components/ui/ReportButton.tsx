'use client'

import { useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { Flag } from 'lucide-react'
import { useStore } from '@/lib/store'
import ReportModal, { ReportTargetType } from './ReportModal'

type Props = {
  targetType: ReportTargetType
  targetId: string
  style?: React.CSSProperties
  className?: string
  children?: React.ReactNode
}

// Simple inline "Report" trigger + its modal. Prompts sign-in when logged out.
export default function ReportButton({ targetType, targetId, style, className, children }: Props) {
  const { user } = useStore()
  const router = useRouter()
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const handleClick = () => {
    if (!user) {
      const goSignIn = window.confirm('Sign in to report this. Go to sign in now?')
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
        {children ?? (<><Flag size={13} /> Report</>)}
      </button>
      <ReportModal targetType={targetType} targetId={targetId} open={open} onClose={() => setOpen(false)} />
    </>
  )
}
