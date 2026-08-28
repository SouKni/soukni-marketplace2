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

// Deterministic parser for the voice-input path — unlike the photo path,
// a spoken/typed description is text we can genuinely parse without AI,
// so (like buyer-agent) we give it a real fallback instead of an
// "unavailable" state.
const CONDITION_KEYWORDS: [RegExp, string][] = [
  [/\b(brand new|new)\b/i, 'new'],
  [/\b(like new|excellent|mint)\b/i, 'like_new'],
  [/\bgood\b/i, 'good'],
  [/\b(fair|used|okay|ok)\b/i, 'fair'],
  [/\b(for parts|broken|not working|damaged)\b/i, 'for_parts'],
]

function fallbackParseTranscript(transcript: string): Draft {
  const priceMatch = transcript.match(/(\d[\d,]*)\s*(mad|dh|dirhams?|dollars?|usd)\b/i)
  const suggestedPrice = priceMatch ? parseInt(priceMatch[1].replace(/,/g, ''), 10) : null

  const conditionEntry = CONDITION_KEYWORDS.find(([re]) => re.test(transcript))
  const condition = conditionEntry ? conditionEntry[1] : null

  // Only match on the distinctive top-level category label, never on
  // subcategory names — several subs are generic English phrases ("For
  // Sale", "For Rent", "Other Motors") that would false-positive-match
  // completely unrelated transcripts (e.g. "for sale a used bicycle"
  // matching Property's "For Sale" subcategory).
  const categoryEntry = CATEGORIES.find(c => transcript.toLowerCase().includes(c.label.toLowerCase()))

  let title = transcript
  if (priceMatch) title = title.replace(priceMatch[0], '')
  if (conditionEntry) title = title.replace(conditionEntry[0], '')
  title = title
    .replace(/\b(selling|for sale|i'm|im|condition)\b/gi, '')
    .replace(/\s*,\s*/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
  title = (title.charAt(0).toUpperCase() + title.slice(1)).slice(0, 80) || transcript.slice(0, 80)

  return {
    title,
    description: transcript.charAt(0).toUpperCase() + transcript.slice(1),
    category: categoryEntry?.slug || null,
    condition,
    suggestedPrice,
    brand: null,
  }
}

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

async function generateWithGeminiText(apiKey: string, transcript: string): Promise<Draft> {
  const ai = new GoogleGenAI({ apiKey })
  const timeout = new Promise<never>((_, reject) => setTimeout(() => reject(new Error('Gemini request timed out')), 10000))

  const call = ai.models.generateContent({
    model: 'gemini-3.6-flash',
    contents: `Generate a complete, ready-to-publish marketplace listing for SouKni, a Moroccan classifieds site, from this seller's spoken description: "${transcript}"

Only use details actually stated or clearly implied — do not invent specs. Respond with the structured JSON only.`,
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
  const transcript: string | undefined = typeof body?.transcript === 'string' ? body.transcript.trim() : undefined

  if (transcript) {
    const apiKey = process.env.GEMINI_API_KEY
    if (apiKey) {
      try {
        const draft = await generateWithGeminiText(apiKey, transcript)
        return NextResponse.json({ draft, source: 'ai' })
      } catch (e) {
        console.error('[quick-list] Gemini text generation failed, falling back to deterministic parser:', e)
      }
    }
    return NextResponse.json({ draft: fallbackParseTranscript(transcript), source: 'fallback' })
  }

  if (!image || typeof image !== 'string') {
    return NextResponse.json({ error: 'An image data URL or transcript is required' }, { status: 400 })
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
