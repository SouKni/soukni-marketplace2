import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenAI, Type } from '@google/genai'
import { createServerSupabaseClient } from '@/lib/supabase/server'
import { CATEGORIES } from '@/lib/categories'

type Analysis = {
  title: string
  category: string | null
  brand: string | null
  color: string | null
  condition: string | null
  material: string | null
  keywords: string
  confidence: number
}

const CATEGORY_SLUGS = CATEGORIES.map(c => c.slug)
const CONDITIONS = ['new', 'like_new', 'good', 'fair', 'for_parts']

const RESPONSE_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    title: { type: Type.STRING, description: 'Best short product title guess for the single main item in the photo, e.g. "iPhone 15 Pro Max"' },
    category: { type: Type.STRING, description: `Best-matching category slug, one of: ${CATEGORY_SLUGS.join(', ')}. Use "other" if none fit well.` },
    brand: { type: Type.STRING, nullable: true },
    color: { type: Type.STRING, nullable: true },
    condition: { type: Type.STRING, description: 'Visible condition estimate, one of: new, like_new, good, fair, for_parts', nullable: true },
    material: { type: Type.STRING, nullable: true },
    keywords: { type: Type.STRING, description: '2-4 word marketplace search query most likely to find this exact item. No filler words.' },
    confidence: { type: Type.NUMBER, description: '0-100 confidence this identification is correct' },
  },
  required: ['title', 'keywords', 'confidence'],
}

async function analyzeWithGemini(apiKey: string, base64: string, mimeType: string): Promise<Analysis> {
  const ai = new GoogleGenAI({ apiKey })
  const timeout = new Promise<never>((_, reject) => setTimeout(() => reject(new Error('Gemini request timed out')), 12000))

  const call = ai.models.generateContent({
    model: 'gemini-3.6-flash',
    contents: [{
      role: 'user',
      parts: [
        { inlineData: { mimeType, data: base64 } },
        { text: 'Identify the single main product in this photo for a Moroccan classifieds marketplace (SouKni). Respond with the structured JSON only.' },
      ],
    }],
    config: { responseMimeType: 'application/json', responseSchema: RESPONSE_SCHEMA },
  })

  const response = await Promise.race([call, timeout])
  const text = response.text
  if (!text) throw new Error('Empty response from Gemini')
  const parsed = JSON.parse(text)
  if (!parsed.title || typeof parsed.title !== 'string' || !parsed.keywords || typeof parsed.keywords !== 'string') {
    throw new Error('Malformed Gemini response')
  }

  return {
    title: parsed.title,
    category: CATEGORY_SLUGS.includes(parsed.category) ? parsed.category : null,
    brand: parsed.brand || null,
    color: parsed.color || null,
    condition: CONDITIONS.includes(parsed.condition) ? parsed.condition : null,
    material: parsed.material || null,
    keywords: parsed.keywords,
    confidence: typeof parsed.confidence === 'number' ? Math.max(0, Math.min(100, parsed.confidence)) : 60,
  }
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null)
  const image: string | undefined = body?.image
  if (!image || typeof image !== 'string') {
    return NextResponse.json({ error: 'An image data URL is required' }, { status: 400 })
  }

  const match = image.match(/^data:(image\/\w+);base64,(.+)$/)
  if (!match) return NextResponse.json({ error: 'Malformed image data' }, { status: 400 })
  const [, mimeType, base64] = match

  // Rough cap on decoded size to avoid abusive payloads / runaway Gemini cost.
  if (base64.length > 11_000_000) {
    return NextResponse.json({ error: 'Image is too large' }, { status: 413 })
  }

  const apiKey = process.env.GEMINI_API_KEY
  let analysis: Analysis | null = null
  if (apiKey) {
    try {
      analysis = await analyzeWithGemini(apiKey, base64, mimeType)
    } catch (e) {
      console.error('[visual-search] Gemini analysis failed:', e)
    }
  }

  // There is no deterministic way to identify an unlabeled photo without a
  // vision model — unlike our other AI routes, there's no honest fallback
  // that still "works." Report clearly that AI recognition is unavailable
  // rather than fabricating a guess or fake results.
  if (!analysis) {
    return NextResponse.json({
      analysis: null,
      results: [],
      source: 'unavailable',
      message: 'AI photo recognition is temporarily unavailable. Try describing the item in the search bar instead.',
    })
  }

  const supabase = await createServerSupabaseClient()
  const selectCols = 'id, title, price, currency, images, city, condition, category_slug'

  // OR-join each keyword so a multi-word AI guess (e.g. "Apple iPhone 8")
  // still surfaces real listings that only match on one strong term (e.g.
  // "iPhone") — an AND-of-all-words or single-phrase match is too strict
  // for a guess that can include a wrong or extra word.
  const orQuery = analysis.keywords.split(/\s+/).filter(w => w.length > 1).join(' OR ')

  const runSearch = (withCategory: boolean) => {
    let q = supabase.from('listings').select(selectCols).eq('status', 'active')
      .textSearch('search_vector', orQuery, { type: 'websearch', config: 'french' })
    if (withCategory && analysis!.category) q = q.eq('category_slug', analysis!.category)
    return q.order('boosted', { ascending: false }).order('created_at', { ascending: false }).limit(12)
  }

  let { data, error } = await runSearch(true)

  // A category-scoped search with zero hits is retried without the category
  // constraint — Gemini's category guess can be wrong even when the keyword
  // match itself would have found something.
  if (!error && (!data || data.length === 0) && analysis.category) {
    const retry = await runSearch(false)
    data = retry.data
    error = retry.error
  }

  if (error) {
    return NextResponse.json({ analysis, results: [], source: 'ai', error: error.message })
  }

  const results = (data || []).map(l => ({
    id: l.id,
    title: l.title,
    price: l.price,
    currency: l.currency,
    image: l.images?.[0] || null,
    city: l.city,
    condition: l.condition,
  }))

  return NextResponse.json({ analysis, results, source: 'ai' })
}
