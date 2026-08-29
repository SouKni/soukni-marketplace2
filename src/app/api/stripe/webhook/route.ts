import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { stripe } from '@/lib/stripe/server'
import { BOOST_PLANS, BoostPlanKey, SUBSCRIPTION_PLANS, SubscriptionPlanKey } from '@/lib/stripe/plans'
import { createServiceClient } from '@/lib/supabase/server'

// The webhook is the ONLY place that actually grants a boost or badge —
// never the client-side success redirect, which could be hit with a
// spoofed/guessed session_id. Stripe signs every event with
// STRIPE_WEBHOOK_SECRET so we can trust the payload once verified.

export async function POST(request: NextRequest) {
  if (!stripe) {
    return NextResponse.json({ error: 'Payments are not configured yet.' }, { status: 503 })
  }
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET
  if (!webhookSecret) {
    return NextResponse.json({ error: 'Webhook secret is not configured.' }, { status: 503 })
  }

  const rawBody = await request.text()
  const signature = request.headers.get('stripe-signature')
  if (!signature) return NextResponse.json({ error: 'Missing stripe-signature header' }, { status: 400 })

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret)
  } catch (e: any) {
    console.error('[stripe webhook] signature verification failed:', e.message)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  const supabase = await createServiceClient()

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        const type = session.metadata?.type

        if (type === 'boost') {
          const listingId = session.metadata!.listingId
          const planKey = session.metadata!.planKey as BoostPlanKey
          const userId = session.metadata!.userId
          const plan = BOOST_PLANS[planKey]
          if (!plan) { console.error('[stripe webhook] unknown boost planKey:', planKey); break }

          const startsAt = new Date()
          const endsAt = new Date(startsAt.getTime() + plan.durationDays * 86400000)

          const { error: listingErr } = await supabase.from('listings').update({
            boosted: true,
            boosted_until: endsAt.toISOString(),
            boost_tier: planKey,
          }).eq('id', listingId)
          if (listingErr) throw new Error(`listings update failed: ${listingErr.message}`)

          const { error: boostErr } = await supabase.from('boosts').insert({
            listing_id: listingId,
            user_id: userId,
            plan: planKey,
            amount_paid: session.amount_total,
            currency: session.currency,
            stripe_payment_id: typeof session.payment_intent === 'string' ? session.payment_intent : session.payment_intent?.id,
            starts_at: startsAt.toISOString(),
            ends_at: endsAt.toISOString(),
            active: true,
          })
          if (boostErr) throw new Error(`boosts insert failed: ${boostErr.message}`)
          console.log(`[stripe webhook] boosted listing ${listingId} with plan ${planKey} until ${endsAt.toISOString()}`)
        }

        if (type === 'subscription') {
          const planKey = session.metadata!.planKey as SubscriptionPlanKey
          const userId = session.metadata!.userId
          const plan = SUBSCRIPTION_PLANS[planKey]
          if (!plan) { console.error('[stripe webhook] unknown subscription planKey:', planKey); break }

          const { error: profileErr } = await supabase.from('profiles').update({
            badge: plan.badge,
            stripe_customer_id: typeof session.customer === 'string' ? session.customer : session.customer?.id,
            stripe_subscription_id: typeof session.subscription === 'string' ? session.subscription : session.subscription?.id,
          }).eq('id', userId)
          if (profileErr) throw new Error(`profiles update failed: ${profileErr.message}`)

          // Keep the pre-existing admin review dashboard's diamond_applications
          // table in sync — a paid subscription is treated as auto-approved
          // rather than requiring manual CIN review, since Stripe payment is
          // itself the verification signal for this self-serve flow.
          const { error: appErr } = await supabase.from('diamond_applications').insert({
            user_id: userId,
            plan: planKey,
            status: 'approved',
            stripe_sub_id: typeof session.subscription === 'string' ? session.subscription : session.subscription?.id,
            reviewed_at: new Date().toISOString(),
          })
          if (appErr) throw new Error(`diamond_applications insert failed: ${appErr.message}`)
          console.log(`[stripe webhook] granted ${plan.badge} badge to user ${userId}`)
        }
        break
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription
        const { error: cancelErr } = await supabase.from('profiles').update({ badge: null, stripe_subscription_id: null })
          .eq('stripe_subscription_id', subscription.id)
        if (cancelErr) throw new Error(`profiles cancellation update failed: ${cancelErr.message}`)
        console.log(`[stripe webhook] subscription ${subscription.id} cancelled, badge removed`)
        break
      }

      // A failed renewal does NOT immediately revoke the badge here —
      // Stripe's own dunning/retry schedule gets a chance to recover the
      // payment first, and customer.subscription.deleted (already handled
      // above) is what actually clears the badge once Stripe gives up. This
      // case's job is just to tell the user their card was declined so they
      // can fix it before that happens.
      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice
        const customerId = typeof invoice.customer === 'string' ? invoice.customer : invoice.customer?.id
        if (customerId) {
          const { data: profile, error: lookupErr } = await supabase.from('profiles').select('id').eq('stripe_customer_id', customerId).single()
          if (lookupErr) throw new Error(`profile lookup by stripe_customer_id failed: ${lookupErr.message}`)
          const { error: notifyErr } = await supabase.from('notifications').insert({
            user_id: profile.id,
            type: 'payment_failed',
            title: 'Payment failed',
            body: "We couldn't process your subscription payment. Please update your payment method to keep your badge.",
            href: '/diamond',
          })
          if (notifyErr) throw new Error(`notifications insert failed: ${notifyErr.message}`)
          console.log(`[stripe webhook] payment failed for customer ${customerId}, notified user ${profile.id}`)
        }
        break
      }

      case 'invoice.payment_succeeded': {
        const invoice = event.data.object as Stripe.Invoice
        const customerId = typeof invoice.customer === 'string' ? invoice.customer : invoice.customer?.id
        // Skip the very first invoice — that's the initial checkout, already
        // confirmed to the user via the success page and granted above by
        // checkout.session.completed. Only notify on actual renewals.
        if (customerId && invoice.billing_reason === 'subscription_cycle') {
          const { data: profile, error: lookupErr } = await supabase.from('profiles').select('id').eq('stripe_customer_id', customerId).single()
          if (lookupErr) throw new Error(`profile lookup by stripe_customer_id failed: ${lookupErr.message}`)
          const { error: notifyErr } = await supabase.from('notifications').insert({
            user_id: profile.id,
            type: 'payment_succeeded',
            title: 'Subscription renewed',
            body: 'Your subscription payment went through — thanks for being a SouKni member.',
            href: '/diamond',
          })
          if (notifyErr) throw new Error(`notifications insert failed: ${notifyErr.message}`)
          console.log(`[stripe webhook] renewal payment succeeded for customer ${customerId}`)
        }
        break
      }

      default:
        // Unhandled event types are fine to ignore.
        break
    }
  } catch (e) {
    console.error('[stripe webhook] handler error:', e)
    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 })
  }

  return NextResponse.json({ received: true })
}
