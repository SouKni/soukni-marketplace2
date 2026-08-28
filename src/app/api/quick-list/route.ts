import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenAI, Type } from '@google/genai'
import { CATEGORIES } from '@/lib/categories'

type Draft = {
  title: string
  description: string
  category: string | null
  condition: string | null
  suggestedPrice: number | null
  brand: string | null
}

const CATEGORY_SLUGS = CATEGORIES.map(c => c.slug)
const CONDITIONS = ['new', 'like_new', 'good', 'fair', 'for_parts']

const RESPONSE_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    title: { type: Type.STRING, description: 'Concise, catchy marketplace listing title for the item in the photo. Max 80 characters.' },
    description: { type: Type.STRING, description: 'Professional 3-5 sentence sales description highlighting the key specs, features and visible condition. Do not invent specs you cannot see or infer (e.g. storage size, model year) — describe generically if unsure.' },
    category: { type: Type.STRING, description: `Best-matching category slug, one of: ${CATEGORY_SLUGS.join(', ')}. Use "other" if none fit well.` },
    condition: { type: Type.STRING, description: 'Visible condition estimate, one of: new, like_new, good, fair, for_parts' },
    suggestedPrice: { type: Type.NUMBER, description: 'A reasonable estimated resale price in Moroccan Dirhams (MAD) for this item in this condition, as a whole number' },
    brand: { type: Type.STRING, nullable: true },
  },
  required: ['title', 'description', 'category', 'condition', 'suggestedPrice'],
}

async function generateWithGemini(apiKey: string, base64: string, mimeType: string): Promise<Draft> {
  const ai = new GoogleGenAI({ apiKey })
  const timeout = new Promise<never>((_, reject) => setTimeout(() => reject(new Error('Gemini request timed out')), 15000))

  const call = ai.models.generateContent({
    model: 'gemini-3.6-flash',
    contents: [{
      role: 'user',
      parts: [
        { inlineData: { mimeType, data: base64 } },
        { text: 'Generate a complete, ready-to-publish marketplace listing for the single main item in this photo, for SouKni, a Moroccan classifieds site. Respond with the structured JSON only.' },
      ],
    }],
    config: { responseMimeType: 'application/json', responseSchema: RESPONSE_SCHEMA },
  })

  const response = await Promise.race([call, timeout])
  const text = response.text
  if (!text) throw new Error('Empty response from Gemini')
  const parsed = JSON.parse(text)
  if (!parsed.title || typeof parsed.title !== 'string' || !parsed.description || typeof parsed.description !== 'string') {
    throw new Error('Malformed Gemini response')
  }

  return {
    title: parsed.title.slice(0, 80),
    description: parsed.description,
    category: CATEGORY_SLUGS.includes(parsed.category) ? parsed.category : null,
    condition: CONDITIONS.includes(parsed.condition) ? parsed.condition : null,
    suggestedPrice: typeof parsed.suggestedPrice === 'number' && parsed.suggestedPrice > 0 ? Math.round(parsed.suggestedPrice) : null,
    brand: parsed.brand || null,
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

  if (base64.length > 11_000_000) {
    return NextResponse.json({ error: 'Image is too large' }, { status: 413 })
  }

  const apiKey = process.env.GEMINI_API_KEY
  if (apiKey) {
    try {
      const draft = await generateWithGemini(apiKey, base64, mimeType)
      return NextResponse.json({ draft, source: 'ai' })
    } catch (e) {
      console.error('[quick-list] Gemini generation failed:', e)
    }
  }

  // There is no deterministic way to write a title/description/price from
  // pixels alone — unlike our other AI routes, no fallback here can produce
  // real content. Report clearly that AI drafting is unavailable so the
  // seller can still fill in the form manually around their uploaded photo,
  // rather than fabricating a generic listing.
  return NextResponse.json({
    draft: null,
    source: 'unavailable',
    message: 'AI listing generation is temporarily unavailable. You can still fill in the details yourself below.',
  })
}
