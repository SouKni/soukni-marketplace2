import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenAI, Type } from '@google/genai'
import { createServerSupabaseClient } from '@/lib/supabase/server'

type PriceResult = { low: number; mid: number; high: number; reasoning: string; tips: string[]; source: 'ai' | 'fallback' }

// Deterministic fallback computed purely from real comparable active
// listings in the same category — same grounding approach as
// /api/price-oracle — rather than a guess with no real backing.
function fallbackPrice(comparablePrices: number[]): PriceResult {
  if (comparablePrices.length < 3) {
    return {
      low: 0, mid: 0, high: 0,
      reasoning: `Only ${comparablePrices.length} similar active listing${comparablePrices.length === 1 ? '' : 's'} found in this category — not enough to suggest a price confidently yet.`,
      tips: [],
      source: 'fallback',
    }
  }
  const sorted = [...comparablePrices].sort((a, b) => a - b)
  const avg = comparablePrices.reduce((s, p) => s + p, 0) / comparablePrices.length
  const low = Math.round(sorted[0])
  const high = Math.round(sorted[sorted.length - 1])
  const mid = Math.round(avg)
  return {
    low, mid, high,
    reasoning: `Based on ${comparablePrices.length} similar active listings, prices range from ${low.toLocaleString()} to ${high.toLocaleString()} MAD, averaging ${mid.toLocaleString()}.`,
    tips: [
      'Price near the average for a faster sale.',
      'Add clear photos to justify a higher price.',
      'Mention the condition honestly to build buyer trust.',
    ],
    source: 'fallback',
  }
}

const RESPONSE_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    low: { type: Type.NUMBER, description: 'Quick-sale price in MAD' },
    mid: { type: Type.NUMBER, description: 'Recommended fair price in MAD' },
    high: { type: Type.NUMBER, description: 'Max realistic price in MAD' },
    reasoning: { type: Type.STRING, description: 'Two sentences, grounded ONLY in the real comparable data given' },
    tips: { type: Type.ARRAY, items: { type: Type.STRING }, description: '2-3 short pricing tips' },
  },
  required: ['low', 'mid', 'high', 'reasoning'],
}

async function priceWithGemini(apiKey: string, title: string, categoryLabel: string, condition: string, city: string, comparablePrices: number[]): Promise<PriceResult> {
  const ai = new GoogleGenAI({ apiKey })
  const timeout = new Promise<never>((_, reject) => setTimeout(() => reject(new Error('Gemini request timed out')), 10000))

  const stats = comparablePrices.length > 0
    ? `${comparablePrices.length} comparable active listings in this category, prices: ${comparablePrices.map(p => Math.round(p)).join(', ')} MAD.`
    : 'No comparable active listings found in this category right now.'

  const call = ai.models.generateContent({
    model: 'gemini-3.6-flash',
    contents: `You are a Moroccan marketplace pricing expert for SouKni. Suggest a quick-sale, recommended, and max-value price in MAD for a new listing: "${title}" | Category: ${categoryLabel || 'General'} | Condition: ${condition || 'Unknown'} | City: ${city || 'Morocco'}.

Market data: ${stats}

Base your suggestion primarily on the real comparable prices given — do not invent sales history. Respond with the structured JSON only.`,
    config: { responseMimeType: 'application/json', responseSchema: RESPONSE_SCHEMA },
  })

  const response = await Promise.race([call, timeout])
  const text = response.text
  if (!text) throw new Error('Empty response from Gemini')
  const parsed = JSON.parse(text)
  if (typeof parsed.low !== 'number' || typeof parsed.mid !== 'number' || typeof parsed.high !== 'number' || !parsed.reasoning) {
    throw new Error('Malformed Gemini response')
  }
  return {
    low: Math.round(parsed.low),
    mid: Math.round(parsed.mid),
    high: Math.round(parsed.high),
    reasoning: parsed.reasoning,
    tips: Array.isArray(parsed.tips) ? parsed.tips.slice(0, 3) : [],
    source: 'ai',
  }
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null)
  const title: string | undefined = typeof body?.title === 'string' ? body.title.trim() : undefined
  if (!title) return NextResponse.json({ error: 'A title is required' }, { status: 400 })

  const categorySlug: string = typeof body?.categorySlug === 'string' ? body.categorySlug : ''
  const categoryLabel: string = typeof body?.categoryLabel === 'string' ? body.categoryLabel : ''
  const condition: string = typeof body?.condition === 'string' ? body.condition : ''
  const city: string = typeof body?.city === 'string' ? body.city : ''

  let comparablePrices: number[] = []
  if (categorySlug) {
    const supabase = await createServerSupabaseClient()
    const { data: comparables } = await supabase
      .from('listings')
      .select('price')
      .eq('category_slug', categorySlug)
      .eq('status', 'active')
      .limit(30)
    comparablePrices = (comparables || []).map(c => c.price / 100)
  }

  const apiKey = process.env.GEMINI_API_KEY
  if (apiKey) {
    try {
      const result = await priceWithGemini(apiKey, title, categoryLabel, condition, city, comparablePrices)
      return NextResponse.json(result)
    } catch (e) {
      console.error('[ai-price] Gemini call failed, falling back to deterministic estimate:', e)
    }
  }
  return NextResponse.json(fallbackPrice(comparablePrices))
}
