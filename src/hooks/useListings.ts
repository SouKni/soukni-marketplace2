'use client'
import { useState, useCallback } from 'react'
import { getSupabaseClient } from '@/lib/supabase/client'

type ListingFilters = {
  query?:    string
  category?: string
  city?:     string
  minPrice?: number
  maxPrice?: number
  condition?: string
  sortBy?:   'newest' | 'price_asc' | 'price_desc' | 'relevance'
  limit?:    number
  offset?:   number
}

export function useListings() {
  const supabase = getSupabaseClient()
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState<string | null>(null)

  const fetchListings = useCallback(async (filters: ListingFilters = {}) => {
    setLoading(true)
    setError(null)
    try {
      let query = supabase
        .from('listings')
        .select(`*, profiles(full_name, avatar_url, badge, rating, review_count)`)
        .eq('status', 'active')

      if (filters.query) {
        // Full-text search with fuzzy fallback
        query = query.textSearch('search_vector', filters.query, { type: 'websearch', config: 'french' })
      }
      if (filters.category) query = query.eq('category_slug', filters.category)
      if (filters.city)     query = query.eq('city', filters.city)
      if (filters.minPrice) query = query.gte('price', filters.minPrice * 100)
      if (filters.maxPrice) query = query.lte('price', filters.maxPrice * 100)
      if (filters.condition)query = query.eq('condition', filters.condition)

      // Sorting
      if (filters.sortBy === 'newest')    query = query.order('created_at', { ascending: false })
      if (filters.sortBy === 'price_asc') query = query.order('price', { ascending: true })
      if (filters.sortBy === 'price_desc')query = query.order('price', { ascending: false })
      // Boost boosted listings
      query = query.order('boosted', { ascending: false }).order('created_at', { ascending: false })

      query = query.range(filters.offset || 0, (filters.offset || 0) + (filters.limit || 20) - 1)

      const { data, error } = await query
      if (error) throw error
      return data
    } catch (e: any) {
      setError(e.message)
      return []
    } finally {
      setLoading(false)
    }
  }, [supabase])

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

  const fetchListingById = useCallback(async (id: string) => {
    setLoading(true)
    setError(null)
    try {
      const { data, error } = await supabase
        .from('listings')
        .select(`*, profiles(full_name, avatar_url, badge, rating, review_count, response_rate, response_time, verified_at, city, phone, created_at)`)
        .eq('id', id)
        .single()
      if (error) throw error
      return data
    } catch (e: any) {
      setError(e.message)
      return null
    } finally {
      setLoading(false)
    }
  }, [supabase])

  return { fetchListings, createListing, updateListing, deleteListing, incrementView, fetchListingById, loading, error }
}
