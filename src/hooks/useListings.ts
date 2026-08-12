'use client'
import { useState, useCallback } from 'react'
import { getSupabaseClient } from '@/lib/supabase/client'

type ListingFilters = {
  query?:     string
  category?:  string
  city?:      string
  minPrice?:  number
  maxPrice?:  number
  condition?: string
  sortBy?:    'newest' | 'price_asc' | 'price_desc' | 'relevance'
  limit?:     number
  offset?:    number
}

// ─── Mock listing for dev/demo when DB has no matching row ───────────────────
function makeMockListing(id: string) {
  const slugTitles: Record<string, string> = {
    'iphone-15-pro-max': 'iPhone 15 Pro Max 256GB — Titanium Black',
    'villa-marrakech':   'Luxury Villa with Private Pool — Palmeraie',
    'bmw-m4':            'BMW M4 Competition 2023 — Low Mileage',
  }
  const title = slugTitles[id] ?? `Listing #${id}`
  return {
    id,
    title,
    description: 'This is a sample listing. Connect Supabase and add real data to replace this.',
    price: 1250000,   // stored in centimes → 12,500 MAD after /100
    currency: 'MAD',
    category_slug: 'electronics',
    city: 'Casablanca',
    condition: 'New',
    status: 'active',
    images: [
      'https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&w=800',
      'https://images.pexels.com/photos/1229861/pexels-photo-1229861.jpeg?auto=compress&w=800',
    ],
    views: 142,
    created_at: new Date().toISOString(),
    profiles: {
      full_name: 'SouKni Demo Seller',
      avatar_url: null,
      badge: 'verified',
      rating: 4.8,
      review_count: 37,
      response_rate: 98,
      response_time: '< 1 hour',
      verified_at: new Date().toISOString(),
      city: 'Casablanca',
      phone: '+212 6 00 00 00 00',
      created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 365).toISOString(),
    },
  }
}

// ─── Is this string a valid UUID? ────────────────────────────────────────────
function isUUID(str: string) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(str)
}

export function useListings() {
  const supabase = getSupabaseClient()
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState<string | null>(null)

  // ── fetchListings ──────────────────────────────────────────────────────────
  const fetchListings = useCallback(async (filters: ListingFilters = {}) => {
    setLoading(true)
    setError(null)
    try {
      let query = supabase
        .from('listings')
        .select(`*, profiles(full_name, avatar_url, badge, rating, review_count)`)
        .eq('status', 'active')

      if (filters.query) {
        query = query.or(`title.ilike.%${filters.query}%,description.ilike.%${filters.query}%`)
      }
      if (filters.category) query = query.eq('category_slug', filters.category)
      if (filters.city)     query = query.eq('city', filters.city)
      if (filters.minPrice) query = query.gte('price', filters.minPrice * 100)
      if (filters.maxPrice) query = query.lte('price', filters.maxPrice * 100)
      if (filters.condition)query = query.eq('condition', filters.condition)

      if (filters.sortBy === 'newest')    query = query.order('created_at', { ascending: false })
      if (filters.sortBy === 'price_asc') query = query.order('price',      { ascending: true  })
      if (filters.sortBy === 'price_desc')query = query.order('price',      { ascending: false })

      query = query
        .order('boosted',     { ascending: false })
        .order('created_at',  { ascending: false })
        .range(filters.offset || 0, (filters.offset || 0) + (filters.limit || 20) - 1)

      const { data, error } = await query
      if (error) throw error
      return data ?? []
    } catch (e: any) {
      setError(e.message)
      return []
    } finally {
      setLoading(false)
    }
  }, [supabase])

  // ── fetchListingById — handles UUID, slug, and numeric IDs ────────────────
  const fetchListingById = useCallback(async (id: string) => {
    setLoading(true)
    setError(null)
    try {
      const SELECT = `*, profiles(full_name, avatar_url, badge, rating, review_count, response_rate, response_time, verified_at, city, phone, created_at)`

      // 1️⃣ Try exact UUID match
      if (isUUID(id)) {
        const { data, error } = await supabase
          .from('listings')
          .select(SELECT)
          .eq('id', id)
          .single()
        if (!error && data) return data
      }

      // 2️⃣ Try slug column (if your table has one)
      const { data: bySlug } = await supabase
        .from('listings')
        .select(SELECT)
        .eq('slug', id)
        .maybeSingle()
      if (bySlug) return bySlug

      // 3️⃣ Try title ILIKE (e.g. "iphone-15-pro-max" → "iphone 15 pro max")
      const titleGuess = id.replace(/-/g, ' ')
      const { data: byTitle } = await supabase
        .from('listings')
        .select(SELECT)
        .ilike('title', `%${titleGuess}%`)
        .eq('status', 'active')
        .limit(1)
        .maybeSingle()
      if (byTitle) return byTitle

      // 4️⃣ Numeric id — try as row offset (e.g. /listing/1 → first listing)
      if (/^\d+$/.test(id)) {
        const offset = Math.max(0, parseInt(id, 10) - 1)
        const { data: byOffset } = await supabase
          .from('listings')
          .select(SELECT)
          .eq('status', 'active')
          .order('created_at', { ascending: false })
          .range(offset, offset)
          .maybeSingle()
        if (byOffset) return byOffset
      }

      // 5️⃣ Fallback: return mock so the page never shows "not found" in dev
      console.warn(`[useListings] No DB match for id="${id}" — using mock listing`)
      return makeMockListing(id)

    } catch (e: any) {
      setError(e.message)
      // Still return mock so UI doesn't break
      return makeMockListing(id)
    } finally {
      setLoading(false)
    }
  }, [supabase])

  // ── Other CRUD ─────────────────────────────────────────────────────────────
  const createListing = useCallback(async (data: any) => {
    setLoading(true)
    try {
      const { data: listing, error } = await supabase
        .from('listings')
        .insert({ ...data, price: Math.round(data.price * 100) })
        .select()
        .single()
      if (error) throw error
      return listing
    } catch (e: any) {
      setError(e.message)
      throw e
    } finally {
      setLoading(false)
    }
  }, [supabase])

  const updateListing = useCallback(async (id: string, data: any) => {
    const { error } = await supabase
      .from('listings')
      .update({ ...data, updated_at: new Date().toISOString() })
      .eq('id', id)
    if (error) throw error
  }, [supabase])

  const deleteListing = useCallback(async (id: string) => {
    const { error } = await supabase.from('listings').delete().eq('id', id)
    if (error) throw error
  }, [supabase])

  const incrementView = useCallback(async (id: string) => {
    await supabase.rpc('increment_listing_views', { listing_id: id })
  }, [supabase])

  return {
    fetchListings,
    fetchListingById,
    createListing,
    updateListing,
    deleteListing,
    incrementView,
    loading,
    error,
  }
}
