import { createServerSupabaseClient, createServiceClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'
import { ListingSchema } from '@/lib/validations/schemas'

// GET /api/listings — search listings
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const supabase = await createServerSupabaseClient()

  let query = supabase
    .from('listings')
    .select('*, profiles(full_name, avatar_url, badge, rating)')
    .eq('status', 'active')

  const q        = searchParams.get('q')
  const category = searchParams.get('category')
  const city     = searchParams.get('city')
  const minPrice = searchParams.get('minPrice')
  const maxPrice = searchParams.get('maxPrice')
  const sortBy   = searchParams.get('sortBy') || 'newest'
  const limit    = Number(searchParams.get('limit') || 20)
  const offset   = Number(searchParams.get('offset') || 0)

  if (q)        query = query.textSearch('search_vector', q, { type: 'websearch', config: 'french' })
  if (category) query = query.eq('category_slug', category)
  if (city)     query = query.eq('city', city)
  if (minPrice) query = query.gte('price', Number(minPrice) * 100)
  if (maxPrice) query = query.lte('price', Number(maxPrice) * 100)

  query = sortBy === 'price_asc'  ? query.order('price', { ascending: true })
        : sortBy === 'price_desc' ? query.order('price', { ascending: false })
        : query.order('boosted', { ascending: false }).order('created_at', { ascending: false })

  const { data, error, count } = await query.range(offset, offset + limit - 1)

  if (error) return NextResponse.json({ error: error.message }, { status: 400 })
  return NextResponse.json({ listings: data, total: count })
}

// POST /api/listings — create listing
export async function POST(request: NextRequest) {
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body   = await request.json()
  const parsed = ListingSchema.safeParse(body)
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })

  const { data, error } = await supabase
    .from('listings')
    .insert({ ...parsed.data, seller_id: user.id, price: Math.round((parsed.data.price || 0) * 100) })
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 400 })

  // Trigger notification to relevant saved searches (async, non-blocking)
  // In production: use Supabase Edge Functions or a queue

  return NextResponse.json({ listing: data }, { status: 201 })
}
