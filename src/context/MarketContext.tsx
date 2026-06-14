'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

export type Currency = 'MAD' | 'EUR' | 'USD' | 'GBP'

const rates: Record<Currency, number> = {
  MAD: 1,
  EUR: 0.092,
  USD: 0.099,
  GBP: 0.079,
}

const symbols: Record<Currency, string> = {
  MAD: 'MAD',
  EUR: '€',
  USD: '$',
  GBP: '£',
}

interface MarketContextType {
  currency: Currency
  setCurrency: (c: Currency) => void
  formatPrice: (mad: number) => string
}

const MarketContext = createContext<MarketContextType>({
  currency: 'MAD',
  setCurrency: () => {},
  formatPrice: (n) => `${n.toLocaleString()} MAD`,
})

export function MarketProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrency] = useState<Currency>('MAD')

  const formatPrice = (mad: number) => {
    const converted = mad * rates[currency]
    const formatted = converted >= 1000
      ? converted.toLocaleString('en', { maximumFractionDigits: 0 })
      : converted.toLocaleString('en', { maximumFractionDigits: 2 })
    return `${symbols[currency]} ${formatted}`
  }

  return (
    <MarketContext.Provider value={{ currency, setCurrency, formatPrice }}>
      {children}
    </MarketContext.Provider>
  )
}

export const useMarket = () => useContext(MarketContext)
