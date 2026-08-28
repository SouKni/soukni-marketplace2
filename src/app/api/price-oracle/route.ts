import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenAI, Type } from '@google/genai'
import { createServerSupabaseClient } from '@/lib/supabase/server'

type Verdict = {
  recommendation: 'buy_now' | 'wait' | 'fair'
  verdict: string
  reasoning: string
  confidence: number
  suggestedMin: number | null
  suggestedMax: number | null
  source: 'ai' | 'fallback'
}

// Deterministic fallback: a real verdict computed purely from real comparable
// listings currently on the marketplace — no fabricated history, no AI call.
function fallbackVerdict(price: number, comparablePrices: number[]): Verdict {
  if (comparablePrices.length < 3) {
    return {
      recommendation: 'fair',
      verdict: 'Not enough comparable listings to judge the price yet',
      reasoning: `Only ${comparablePrices.length} similar active listing${comparablePrices.length === 1 ? '' : 's'} found in this category, which isn't enough to compare confidently.`,
      confidence: 30,
      suggestedMin: null,
      suggestedMax: null,
      source: 'fallback',
    }
  }

  const avg = comparablePrices.reduce((s, p) => s + p, 0) / comparablePrices.length
  const sorted = [...comparablePrices].sort((a, b) => a - b)
  const min = sorted[0]
  const max = sorted[sorted.length - 1]
  const ratio = price / avg

  let recommendation: Verdict['recommendation'] = 'fair'
  let verdict = 'Priced fairly for this category'
  if (ratio <= 0.85) { recommendation = 'buy_now'; verdict = 'Priced below the market — good time to buy' }
  else if (ratio >= 1.15) { recommendation = 'wait'; verdict = 'Priced above similar listings — you may find a better deal' }

  return {
    recommendation,
    verdict,
    reasoning: `Compared against ${comparablePrices.length} similar active listings averaging ${Math.round(avg).toLocaleString()} (range ${Math.round(min).toLocaleString()}–${Math.round(max).toLocaleString()}). This listing is priced ${Math.round((ratio - 1) * 100)}% ${ratio >= 1 ? 'above' : 'below'} that average.`,
    confidence: 65,
    suggestedMin: Math.round(min),
    suggestedMax: Math.round(max),
    source: 'fallback',
  }
}

const RESPONSE_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    recommendation: { type: Type.STRING, description: 'One of: buy_now, wait, fair' },
    verdict: { type: Type.STRING, description: 'One short sentence verdict' },
    reasoning: { type: Type.STRING, description: 'Two sentences explaining the reasoning, grounded in the comparable listings provided' },
    confidence: { type: Type.NUMBER, description: 'Confidence 40-95' },
    suggestedMin: { type: Type.NUMBER, description: 'Suggested fair-price range minimum, in the same currency as the listing' },
    suggestedMax: { type: Type.NUMBER, description: 'Suggested fair-price range maximum' },
  },
  required: ['recommendation', 'verdict', 'reasoning', 'confidence'],
}

async function askGemini(apiKey: string, listing: any, comparablePrices: number[]): Promise<Verdict> {
  const ai = new GoogleGenAI({ apiKey })
  const timeout = new Promise<never>((_, reject) => setTimeout(() => reject(new Error('Gemini request timed out')), 8000))

  const stats = comparablePrices.length > 0
    ? `${comparablePrices.length} comparable active listings in the same category, prices: ${comparablePrices.map(p => Math.round(p)).join(', ')} ${listing.currency}.`
    : 'No comparable active listings found in this category right now.'

  const call = ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: `You are a marketplace pricing analyst for a Morocco classifieds site. Assess whether this listing's price is fair based ONLY on the real comparable listings given — do not invent historical price trends.

Listing: "${listing.title}"
Category: ${listing.category_slug}
Condition: ${listing.condition || 'not specified'}
City: ${listing.city || 'not specified'}
Current price: ${listing.price} ${listing.currency}

Market data: ${stats}

Respond with the structured verdict only.`,
    config: { responseMimeType: 'application/json', responseSchema: RESPONSE_SCHEMA },
  })

  const response = await Promise.race([call, timeout])
  const text = response.text
  if (!text) throw new Error('Empty response from Gemini')
  const parsed = JSON.parse(text)
  if (!parsed.verdict || !parsed.recommendation) throw new Error('Malformed Gemini response')

  return {
    recommendation: ['buy_now', 'wait', 'fair'].includes(parsed.recommendation) ? parsed.recommendation : 'fair',
    verdict: parsed.verdict,
    reasoning: parsed.reasoning || '',
    confidence: typeof parsed.confidence === 'number' ? Math.max(0, Math.min(100, parsed.confidence)) : 60,
    suggestedMin: typeof parsed.suggestedMin === 'number' ? parsed.suggestedMin : null,
    suggestedMax: typeof parsed.suggestedMax === 'number' ? parsed.suggestedMax : null,
    source: 'ai',
  }
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null)
  const listingId = body?.listingId
  if (!listingId || typeof listingId !== 'string') {
    return NextResponse.json({ error: 'listingId is required' }, { status: 400 })
  }

  const supabase = await createServerSupabaseClient()
  const { data: listing, error: listingErr } = await supabase
    .from('listings')
    .select('id, title, price, currency, category_slug, condition, city, status, images')
    .eq('id', listingId)
    .single()

  if (listingErr || !listing) {
    return NextResponse.json({ error: 'Listing not found' }, { status: 404 })
  }

  const { data: comparables } = await supabase
    .from('listings')
    .select('price')
    .eq('category_slug', listing.category_slug)
    .eq('status', 'active')
    .neq('id', listingId)
    .limit(30)

  const comparablePrices = (comparables || []).map(c => c.price)
  const priceInUnits = listing.price / 100
  const comparablePricesInUnits = comparablePrices.map(p => p / 100)

  const apiKey = process.env.GEMINI_API_KEY
  let verdict: Verdict
  if (apiKey) {
    try {
      verdict = await askGemini(apiKey, { ...listing, price: priceInUnits }, comparablePricesInUnits)
    } catch (e) {
      console.error('[price-oracle] Gemini call failed, falling back to deterministic verdict:', e)
      verdict = fallbackVerdict(priceInUnits, comparablePricesInUnits)
    }
  } else {
    verdict = fallbackVerdict(priceInUnits, comparablePricesInUnits)
  }

  return NextResponse.json({
    listing: { id: listing.id, title: listing.title, price: priceInUnits, currency: listing.currency, category_slug: listing.category_slug, condition: listing.condition, city: listing.city, image: listing.images?.[0] || null },
    comparableCount: comparablePrices.length,
    verdict,
  })
}
