import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe/server'
import { SUBSCRIPTION_PLANS, SubscriptionPlanKey, CURRENCY } from '@/lib/stripe/plans'
import { createServerSupabaseClient, createServiceClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  if (!stripe) {
    return NextResponse.json({ error: 'Payments are not configured yet. Please try again later.' }, { status: 503 })
  }

  const body = await request.json().catch(() => null)
  const planKey: SubscriptionPlanKey = body?.planKey
  const locale = typeof body?.locale === 'string' ? body.locale : 'en'
  if (!planKey || !SUBSCRIPTION_PLANS[planKey]) {
    return NextResponse.json({ error: 'A valid planKey is required' }, { status: 400 })
  }

  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Sign in required' }, { status: 401 })

  const { data: profile } = await supabase.from('profiles').select('stripe_customer_id, full_name').eq('id', user.id).single()

  const plan = SUBSCRIPTION_PLANS[planKey]
  const origin = request.nextUrl.origin

  try {
    // Reuse an existing Stripe customer for this user if we already have
    // one, rather than creating a duplicate customer on every subscribe
    // attempt.
    let customerId = profile?.stripe_customer_id || undefined
    if (!customerId) {
      const customer = await stripe.customers.create({
        email: user.email || undefined,
        name: profile?.full_name || undefined,
        metadata: { userId: user.id },
      })
      customerId = customer.id
      const service = await createServiceClient()
      await service.from('profiles').update({ stripe_customer_id: customerId }).eq('id', user.id)
    }

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      customer: customerId,
      line_items: [{
        price_data: {
          currency: CURRENCY,
          product_data: { name: plan.name },
          unit_amount: Math.round(plan.price * 100),
          recurring: { interval: 'month' },
        },
        quantity: 1,
      }],
      subscription_data: { trial_period_days: 7, metadata: { type: 'subscription', planKey, userId: user.id } },
      metadata: { type: 'subscription', planKey, userId: user.id },
      success_url: `${origin}/${locale}/diamond?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/${locale}/diamond`,
    })
    return NextResponse.json({ url: session.url })
  } catch (e: any) {
    console.error('[checkout-subscription] Stripe error:', e)
    return NextResponse.json({ error: e?.message || 'Could not start checkout' }, { status: 502 })
  }
}
