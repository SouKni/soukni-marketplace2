export type Locale = 'en' | 'fr' | 'ar' | 'es' | 'de'

export interface Listing {
  id: string
  title: string
  price: number
  currency: string
  category: string
  location: string
  year?: number
  images: string[]
  isPremium?: boolean
  isVerified?: boolean
  badge?: 'diamond' | 'verified' | 'certified' | null
  seller?: {
    name: string
    type: 'owner' | 'agent' | 'dealer'
    rating?: number
  }
}

export interface Dictionary {
  nav: Record<string, string>
  homepage: Record<string, string>
  listing: Record<string, string>
  currencies: { base: string; secondary: string[] }
}
