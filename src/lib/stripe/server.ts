import Stripe from 'stripe'

// Graceful when STRIPE_SECRET_KEY isn't configured yet — callers check
// `stripe` for null and return a clear "payments not configured" response
// instead of throwing, matching the free-tier-first policy of never hard
// crashing when an optional paid-service key is absent.
export const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY)
  : null

export function requireStripe() {
  if (!stripe) throw new StripeNotConfiguredError()
  return stripe
}

export class StripeNotConfiguredError extends Error {
  constructor() {
    super('Payments are not configured yet — STRIPE_SECRET_KEY is missing.')
    this.name = 'StripeNotConfiguredError'
  }
}
