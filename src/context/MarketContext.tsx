'use client'

import { ReactNode } from 'react'
import { useStore } from '@/lib/store'

export type Currency = 'MAD' | 'EUR' | 'USD' | 'GBP'

// Currency state lives in the Zustand store (src/lib/store/index.ts) so it
// persists across visits via localStorage. Because localStorage isn't
// available during server rendering, we guard on `hasHydrated` so both the
// server and the very first client render always show 'MAD' — matching
// exactly — and only switch to the visitor's saved currency once hydration
// has completed (a normal client-side update, not a mismatch).
export function useMarket() {
  const hasHydrated  = useStore((s) => s.hasHydrated)
  const rawCurrency  = useStore((s) => s.currency)
  const setCurrency  = useStore((s) => s.setCurrency)
  const rawFormatPrice = useStore((s) => s.formatPrice)

  const currency = hasHydrated ? rawCurrency : 'MAD'
  const formatPrice = (mad: number) => hasHydrated ? rawFormatPrice(mad) : `${mad.toLocaleString()} MAD`

  return { currency, setCurrency, formatPrice }
}

// Kept so the existing <MarketProvider> in layout.tsx keeps working untouched.
// It no longer holds its own state — just passes children through.
export function MarketProvider({ children }: { children: ReactNode }) {
  return <>{children}</>
}
