import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

type User = {
  id: string
  email: string
  full_name: string
  avatar_url: string | null
  badge: string | null
  city: string | null
  phone: string | null
}

type Currency = 'MAD' | 'EUR' | 'USD' | 'GBP'

const RATES: Record<Currency, number> = { MAD: 1, EUR: 0.092, USD: 0.099, GBP: 0.079 }
const SYMBOLS: Record<Currency, string> = { MAD: 'MAD', EUR: '€', USD: '$', GBP: '£' }

type Store = {
  // Auth
  user:        User | null
  setUser:     (user: User | null) => void

  // Currency
  currency:    Currency
  setCurrency: (c: Currency) => void
  formatPrice: (mad: number) => string

  // UI
  locale:      string
  setLocale:   (l: string) => void

  // Notifications
  unreadCount: number
  setUnreadCount: (n: number) => void

  // Onboarding
  onboardingDone: boolean
  setOnboardingDone: (done: boolean) => void

  // Hydration guard (prevents SSR/client mismatch on persisted fields)
  hasHydrated: boolean
  setHasHydrated: (v: boolean) => void

  // Search
  recentSearches: string[]
  addRecentSearch: (q: string) => void
  clearRecentSearches: () => void
}

export const useStore = create<Store>()(
  persist(
    (set, get) => ({
      user:        null,
      setUser:     (user) => set({ user }),

      currency:    'MAD',
      setCurrency: (currency) => set({ currency }),
      formatPrice: (mad: number) => {
        const { currency } = get()
        const converted = mad * RATES[currency]
        const formatted = converted >= 1000
          ? converted.toLocaleString('fr-MA', { maximumFractionDigits: 0 })
          : converted.toLocaleString('fr-MA', { maximumFractionDigits: 2 })
        return `${SYMBOLS[currency]} ${formatted}`
      },

      locale:      'en',
      setLocale:   (locale) => set({ locale }),

      unreadCount:    0,
      setUnreadCount: (n) => set({ unreadCount: n }),

      onboardingDone: false,
      setOnboardingDone: (done) => set({ onboardingDone: done }),

      hasHydrated: false,
      setHasHydrated: (v) => set({ hasHydrated: v }),

      recentSearches: [],
      addRecentSearch: (q) => set(s => ({
        recentSearches: [q, ...s.recentSearches.filter(r => r !== q)].slice(0, 8)
      })),
      clearRecentSearches: () => set({ recentSearches: [] }),
    }),
    {
      name:    'soukni-store',
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({
        currency:       s.currency,
        locale:         s.locale,
        onboardingDone: s.onboardingDone,
        recentSearches: s.recentSearches,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true)
      },
    }
  )
)
