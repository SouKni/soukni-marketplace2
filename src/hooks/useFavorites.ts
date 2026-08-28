'use client'
import { useCallback, useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { getSupabaseClient } from '@/lib/supabase/client'
import { useStore } from '@/lib/store'

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

export type FavoriteListing = {
  favoriteId: string
  savedAt: string
  id: string
  title: string
  price: number
  currency: string
  category_slug: string
  city: string
  images: string[]
  badge: string | null
}

// Tracks the current user's favorited listing IDs and exposes toggle/check/list
// helpers. A logged-out user gets prompted to sign in instead of silently
// failing — toggleFavorite() never touches Supabase without a real user.
export function useFavorites() {
  const supabase = getSupabaseClient()
  const { user } = useStore()
  const router = useRouter()
  const pathname = usePathname()
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(new Set())

  useEffect(() => {
    if (!user) { setFavoriteIds(new Set()); return }
    let cancelled = false
    supabase
      .from('favorites')
      .select('listing_id')
      .eq('user_id', user.id)
      .then(({ data }) => {
        if (!cancelled && data) setFavoriteIds(new Set(data.map(r => r.listing_id)))
      })
    return () => { cancelled = true }
  }, [user?.id])

  const promptLogin = useCallback(() => {
    const goSignIn = window.confirm('Sign in to save listings to your favorites. Go to sign in now?')
    if (goSignIn) {
      const locale = pathname.split('/')[1] || 'en'
      router.push(`/${locale}/auth?next=${encodeURIComponent(pathname)}`)
    }
  }, [router, pathname])

  const isFavorited = useCallback((listingId: string | undefined | null) => !!listingId && favoriteIds.has(listingId), [favoriteIds])

  // Mock/demo data often carries a placeholder id (e.g. 'rd1') that isn't a
  // real listings.id — attempting to persist those would just fail the
  // insert's UUID check every time, so skip the network round-trip and the
  // flash-then-revert entirely rather than pretend it saved.
  const toggleFavorite = useCallback(async (listingId: string | undefined | null) => {
    if (!listingId || !UUID_RE.test(listingId)) return
    if (!user) { promptLogin(); return }
    const wasFavorited = favoriteIds.has(listingId)

    setFavoriteIds(prev => {
      const next = new Set(prev)
      wasFavorited ? next.delete(listingId) : next.add(listingId)
      return next
    })

    if (wasFavorited) {
      const { error } = await supabase.from('favorites').delete().eq('user_id', user.id).eq('listing_id', listingId)
      if (error) setFavoriteIds(prev => new Set(prev).add(listingId))
    } else {
      const { error } = await supabase.from('favorites').insert({ user_id: user.id, listing_id: listingId })
      if (error) setFavoriteIds(prev => { const next = new Set(prev); next.delete(listingId); return next })
    }
  }, [user, favoriteIds, promptLogin])

  const getFavorites = useCallback(async (): Promise<FavoriteListing[]> => {
    if (!user) return []
    const { data, error } = await supabase
      .from('favorites')
      .select('id, created_at, listing:listings(id, title, price, currency, category_slug, city, images, badge)')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    if (error || !data) return []

    return data
      .filter((row: any) => row.listing)
      .map((row: any) => ({
        favoriteId: row.id,
        savedAt: row.created_at,
        id: row.listing.id,
        title: row.listing.title,
        price: (row.listing.price || 0) / 100,
        currency: row.listing.currency || 'MAD',
        category_slug: row.listing.category_slug,
        city: row.listing.city,
        images: row.listing.images || [],
        badge: row.listing.badge,
      }))
  }, [user])

  return { isFavorited, toggleFavorite, getFavorites, isLoggedIn: !!user }
}
