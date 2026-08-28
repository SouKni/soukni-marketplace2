import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe/server'
import { BOOST_PLANS, BoostPlanKey, CURRENCY } from '@/lib/stripe/plans'
import { createServerSupabaseClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  if (!stripe) {
    return NextResponse.json({ error: 'Payments are not configured yet. Please try again later.' }, { status: 503 })
  }

  const body = await request.json().catch(() => null)
  const listingId = body?.listingId
  const planKey: BoostPlanKey = body?.planKey
  const locale = typeof body?.locale === 'string' ? body.locale : 'en'
  if (!listingId || !planKey || !BOOST_PLANS[planKey]) {
    return NextResponse.json({ error: 'listingId and a valid planKey are required' }, { status: 400 })
  }

  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Sign in required' }, { status: 401 })

  // Never trust a price from the client — always re-fetch the real listing
  // and re-look-up the plan price server-side.
  const { data: listing, error: listingErr } = await supabase
    .from('listings')
    .select('id, title, seller_id, status')
    .eq('id', listingId)
    .single()

  if (listingErr || !listing) return NextResponse.json({ error: 'Listing not found' }, { status: 404 })
  if (listing.seller_id !== user.id) return NextResponse.json({ error: 'You can only boost your own listings' }, { status: 403 })

  const plan = BOOST_PLANS[planKey]
  const origin = request.nextUrl.origin

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [{
        price_data: {
          currency: CURRENCY,
          product_data: { name: `${plan.name} — ${listing.title}` },
          unit_amount: Math.round(plan.price * 100),
        },
        quantity: 1,
      }],
      metadata: { type: 'boost', listingId, planKey, userId: user.id },
      success_url: `${origin}/${locale}/boost/${listingId}?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/${locale}/boost/${listingId}`,
    })
    return NextResponse.json({ url: session.url })
  } catch (e: any) {
    console.error('[checkout-boost] Stripe error:', e)
    return NextResponse.json({ error: e?.message || 'Could not start checkout' }, { status: 502 })
  }
}
