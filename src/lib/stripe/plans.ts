// Single source of truth for boost/subscription pricing — imported by the
// checkout API routes (to build the Stripe Checkout Session), the webhook
// (to know what to grant when a payment completes), and the pages (to
// render the options). Never let the client dictate a price: the server
// always re-looks-up the plan by key from here rather than trusting a
// price sent from the browser.

export type BoostPlanKey = 'starter' | 'pro' | 'elite'

export const BOOST_PLANS: Record<BoostPlanKey, { name: string; price: number; durationDays: number }> = {
  starter: { name: 'Starter Boost', price: 29, durationDays: 3 },
  pro:     { name: 'Pro Boost',     price: 69, durationDays: 7 },
  elite:   { name: 'Elite Boost',   price: 149, durationDays: 14 },
}

export type SubscriptionPlanKey = 'diamond' | 'pro'

export const SUBSCRIPTION_PLANS: Record<SubscriptionPlanKey, { name: string; price: number; badge: string }> = {
  diamond: { name: 'Diamond Membership', price: 299, badge: 'diamond' },
  pro:     { name: 'Pro Business Membership', price: 799, badge: 'pro' },
}

export const CURRENCY = 'mad'
