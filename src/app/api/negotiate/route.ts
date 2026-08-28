import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenAI, Type } from '@google/genai'
import { createServerSupabaseClient } from '@/lib/supabase/server'

type Role = 'buyer' | 'seller'

type Strategy = {
  suggestedPrice: number
  acceptableRange: { min: number; max: number }
  likelihood: 'low' | 'medium' | 'high'
  verdict: string
  reasoning: string
  talkingPoints: string[]
  openingMessage: string
  source: 'ai' | 'fallback'
}

const LIKELIHOODS = ['low', 'medium', 'high']

// Deterministic strategy computed purely from real comparable listings and
// the real numbers the caller gave us — no fabricated market history, no AI
// call. This is genuinely derivable (unlike, say, identifying a photo), so
// unlike our vision-dependent routes this fallback produces real advice,
// not just an "unavailable" state.
function fallbackStrategy(role: Role, title: string, askingPrice: number, amount: number, comparablePrices: number[], currency: string): Strategy {
  const hasComps = comparablePrices.length >= 3
  const avg = hasComps ? comparablePrices.reduce((s, p) => s + p, 0) / comparablePrices.length : askingPrice
  const marketFloor = Math.min(avg, askingPrice)

  if (role === 'buyer') {
    const suggestedPrice = Math.round(Math.min(askingPrice, Math.max(amount, marketFloor * 0.88)))
    const acceptableRange = { min: Math.round(marketFloor * 0.85), max: Math.round(Math.min(askingPrice, marketFloor * 1.05)) }
    const ratio = suggestedPrice / askingPrice
    const likelihood: Strategy['likelihood'] = ratio >= 0.95 ? 'high' : ratio >= 0.85 ? 'medium' : 'low'
    return {
      suggestedPrice,
      acceptableRange,
      likelihood,
      verdict: `Open at ${suggestedPrice.toLocaleString()} ${currency}`,
      reasoning: hasComps
        ? `Based on ${comparablePrices.length} comparable active listings averaging ${Math.round(avg).toLocaleString()} ${currency}, this asking price is ${askingPrice > avg ? 'above' : 'near'} market. Your budget of ${amount.toLocaleString()} ${currency} is ${amount >= suggestedPrice ? 'workable' : 'below a realistic opening offer'}.`
        : `Not enough comparable listings to judge the market precisely — this is a conservative estimate based on the asking price alone.`,
      talkingPoints: [
        'Mention you\'ve compared similar listings on the market.',
        'Be polite and specific about your budget.',
        'Ask if the price is flexible before naming your number.',
      ],
      openingMessage: `Hi! I'm interested in "${title}". Based on similar listings I've seen, would you consider ${suggestedPrice.toLocaleString()} ${currency}?`,
      source: 'fallback',
    }
  }

  // role === 'seller': `amount` is the offer they received from a buyer.
  // Clamp the floor to the asking price — a seller's floor can never sit
  // above their own asking price, even when the category's comparables
  // (a broad category can span very different items) skew high.
  const fairFloor = Math.min(Math.round(avg * 0.9), askingPrice)
  const suggestedPrice = Math.round(Math.max(amount, Math.min(askingPrice, avg)))
  const ratio = amount / askingPrice
  const likelihood: Strategy['likelihood'] = ratio >= 0.92 ? 'high' : ratio >= 0.8 ? 'medium' : 'low'
  const verdict = amount >= askingPrice * 0.97
    ? 'Accept — this is a strong offer'
    : amount >= fairFloor
      ? 'Counter slightly — still a reasonable offer'
      : 'Counter — below fair market value'
  return {
    suggestedPrice,
    acceptableRange: { min: fairFloor, max: askingPrice },
    likelihood,
    verdict,
    reasoning: hasComps
      ? `The offer of ${amount.toLocaleString()} ${currency} is ${Math.round(ratio * 100)}% of your asking price. Comparable active listings average ${Math.round(avg).toLocaleString()} ${currency}, so a fair floor is around ${fairFloor.toLocaleString()} ${currency}.`
      : `Not enough comparable listings to judge the market precisely — this is a conservative estimate based on your asking price alone.`,
    talkingPoints: [
      'Thank them for the offer before countering.',
      'Point to condition, features, or urgency that justify your price.',
      'Offer a small concession to close the deal faster.',
    ],
    openingMessage: `Thanks for your offer of ${amount.toLocaleString()} ${currency}! Based on similar listings, I could do ${suggestedPrice.toLocaleString()} ${currency} instead — does that work for you?`,
    source: 'fallback',
  }
}

const RESPONSE_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    suggestedPrice: { type: Type.NUMBER, description: 'The price to propose next, in the same currency as the listing' },
    acceptableRangeMin: { type: Type.NUMBER },
    acceptableRangeMax: { type: Type.NUMBER },
    likelihood: { type: Type.STRING, description: 'One of: low, medium, high' },
    verdict: { type: Type.STRING, description: 'One short sentence verdict' },
    reasoning: { type: Type.STRING, description: 'Two sentences of reasoning grounded ONLY in the real data given' },
    talkingPoints: { type: Type.ARRAY, items: { type: Type.STRING }, description: '2-4 short negotiation talking points' },
    openingMessage: { type: Type.STRING, description: 'A short, polite, ready-to-send chat message putting the suggested price to the other party' },
  },
  required: ['suggestedPrice', 'likelihood', 'verdict', 'reasoning', 'openingMessage'],
}

async function askGemini(apiKey: string, role: Role, title: string, askingPrice: number, amount: number, comparablePrices: number[], currency: string): Promise<Strategy> {
  const ai = new GoogleGenAI({ apiKey })
  const timeout = new Promise<never>((_, reject) => setTimeout(() => reject(new Error('Gemini request timed out')), 8000))

  const stats = comparablePrices.length > 0
    ? `${comparablePrices.length} comparable active listings, prices: ${comparablePrices.map(p => Math.round(p)).join(', ')} ${currency}.`
    : 'No comparable active listings found right now.'

  const situation = role === 'buyer'
    ? `You are advising a BUYER on what to offer for "${title}", asking price ${askingPrice.toLocaleString()} ${currency}. Their target budget is ${amount.toLocaleString()} ${currency}.`
    : `You are advising a SELLER of "${title}" (asking price ${askingPrice.toLocaleString()} ${currency}) on how to respond to a buyer's offer of ${amount.toLocaleString()} ${currency}.`

  const call = ai.models.generateContent({
    model: 'gemini-3.6-flash',
    contents: `You are a fair, pragmatic negotiation advisor for a Moroccan classifieds marketplace (SouKni). ${situation}

Market data: ${stats}

Base your advice ONLY on the real numbers given — do not invent sales history or comparable prices beyond what's listed. Respond with the structured JSON only.`,
    config: { responseMimeType: 'application/json', responseSchema: RESPONSE_SCHEMA },
  })

  const response = await Promise.race([call, timeout])
  const text = response.text
  if (!text) throw new Error('Empty response from Gemini')
  const parsed = JSON.parse(text)
  if (typeof parsed.suggestedPrice !== 'number' || !parsed.verdict || !parsed.openingMessage) {
    throw new Error('Malformed Gemini response')
  }

  return {
    suggestedPrice: Math.round(parsed.suggestedPrice),
    acceptableRange: {
      min: typeof parsed.acceptableRangeMin === 'number' ? Math.round(parsed.acceptableRangeMin) : Math.round(parsed.suggestedPrice * 0.9),
      max: typeof parsed.acceptableRangeMax === 'number' ? Math.round(parsed.acceptableRangeMax) : Math.round(parsed.suggestedPrice * 1.1),
    },
    likelihood: LIKELIHOODS.includes(parsed.likelihood) ? parsed.likelihood : 'medium',
    verdict: parsed.verdict,
    reasoning: parsed.reasoning || '',
    talkingPoints: Array.isArray(parsed.talkingPoints) ? parsed.talkingPoints.slice(0, 4) : [],
    openingMessage: parsed.openingMessage,
    source: 'ai',
  }
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null)
  const listingId = body?.listingId
  const role: Role = body?.role === 'seller' ? 'seller' : 'buyer'
  const amount = Number(body?.amount)

  if (!listingId || typeof listingId !== 'string') {
    return NextResponse.json({ error: 'listingId is required' }, { status: 400 })
  }
  if (!amount || amount <= 0) {
    return NextResponse.json({ error: role === 'buyer' ? 'A target budget is required' : 'The offer amount is required' }, { status: 400 })
  }

  const supabase = await createServerSupabaseClient()
  const { data: listing, error: listingErr } = await supabase
    .from('listings')
    .select('id, title, price, currency, category_slug, condition, city, status, negotiable')
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

  const comparablePrices = (comparables || []).map(c => c.price / 100)
  const askingPrice = listing.price / 100

  const apiKey = process.env.GEMINI_API_KEY
  let strategy: Strategy
  if (apiKey) {
    try {
      strategy = await askGemini(apiKey, role, listing.title, askingPrice, amount, comparablePrices, listing.currency)
    } catch (e) {
      console.error('[negotiate] Gemini call failed, falling back to deterministic strategy:', e)
      strategy = fallbackStrategy(role, listing.title, askingPrice, amount, comparablePrices, listing.currency)
    }
  } else {
    strategy = fallbackStrategy(role, listing.title, askingPrice, amount, comparablePrices, listing.currency)
  }

  return NextResponse.json({
    listing: { id: listing.id, title: listing.title, askingPrice, currency: listing.currency, negotiable: listing.negotiable },
    role,
    amount,
    comparableCount: comparablePrices.length,
    strategy,
  })
}
