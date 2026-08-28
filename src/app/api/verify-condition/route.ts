import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenAI, Type } from '@google/genai'

type Grading = {
  condition: string | null
  confidence: number
  flaws: string[]
  authenticityFlag: 'none' | 'uncertain' | 'concern'
  authenticityNote: string
  summary: string
}

const CONDITIONS = ['new', 'like_new', 'good', 'fair', 'for_parts']
const AUTHENTICITY_FLAGS = ['none', 'uncertain', 'concern']

const RESPONSE_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    condition: { type: Type.STRING, description: 'Visible condition rating, one of: new, like_new, good, fair, for_parts' },
    confidence: { type: Type.NUMBER, description: '0-100 confidence in this condition rating given only what is visible in the photo' },
    flaws: { type: Type.ARRAY, items: { type: Type.STRING }, description: 'Specific visible wear, damage or flaws (e.g. "scuff on bottom-left corner"). Empty array if none visible.' },
    authenticityFlag: { type: Type.STRING, description: 'One of: none, uncertain, concern. Use "concern" ONLY for a clearly visible, specific red flag (e.g. obviously misspelled brand text). Use "uncertain" when logos/materials/build quality cannot be verified from this angle/lighting. Default to "none" — do not speculate.' },
    authenticityNote: { type: Type.STRING, description: 'One cautious sentence explaining the authenticityFlag. Never make a definitive counterfeit accusation — only describe what is or is not visible.' },
    summary: { type: Type.STRING, description: 'One or two sentence overall condition summary a seller could paste into their listing description' },
  },
  required: ['condition', 'confidence', 'flaws', 'authenticityFlag', 'authenticityNote', 'summary'],
}

async function gradeWithGemini(apiKey: string, base64: string, mimeType: string, title?: string, category?: string): Promise<Grading> {
  const ai = new GoogleGenAI({ apiKey })
  const timeout = new Promise<never>((_, reject) => setTimeout(() => reject(new Error('Gemini request timed out')), 15000))

  const context = [title && `Item: ${title}`, category && `Category: ${category}`].filter(Boolean).join('. ')

  const call = ai.models.generateContent({
    model: 'gemini-3.6-flash',
    contents: [{
      role: 'user',
      parts: [
        { inlineData: { mimeType, data: base64 } },
        { text: `You are an objective, cautious condition inspector for a Moroccan marketplace (SouKni). Examine this close-up photo of an item a seller is about to list.${context ? ` ${context}.` : ''}

Rate only what you can actually see. Do not guess at damage or authenticity issues that aren't visible in this specific photo. Respond with the structured JSON only.` },
      ],
    }],
    config: { responseMimeType: 'application/json', responseSchema: RESPONSE_SCHEMA },
  })

  const response = await Promise.race([call, timeout])
  const text = response.text
  if (!text) throw new Error('Empty response from Gemini')
  const parsed = JSON.parse(text)
  if (!parsed.summary || typeof parsed.summary !== 'string') throw new Error('Malformed Gemini response')

  return {
    condition: CONDITIONS.includes(parsed.condition) ? parsed.condition : null,
    confidence: typeof parsed.confidence === 'number' ? Math.max(0, Math.min(100, parsed.confidence)) : 50,
    flaws: Array.isArray(parsed.flaws) ? parsed.flaws.slice(0, 8).filter((f: unknown) => typeof f === 'string') : [],
    authenticityFlag: AUTHENTICITY_FLAGS.includes(parsed.authenticityFlag) ? parsed.authenticityFlag : 'none',
    authenticityNote: parsed.authenticityNote || '',
    summary: parsed.summary,
  }
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null)
  const image: string | undefined = body?.image
  const title: string | undefined = typeof body?.title === 'string' ? body.title : undefined
  const category: string | undefined = typeof body?.category === 'string' ? body.category : undefined

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
      const grading = await gradeWithGemini(apiKey, base64, mimeType, title, category)
      return NextResponse.json({ grading, source: 'ai' })
    } catch (e) {
      console.error('[verify-condition] Gemini grading failed:', e)
    }
  }

  // No deterministic way to grade visible condition or authenticity from
  // pixels alone — same honest-unavailable pattern as visual-search and
  // quick-list, rather than fabricating a rating.
  return NextResponse.json({
    grading: null,
    source: 'unavailable',
    message: 'AI condition grading is temporarily unavailable. Please assess the condition yourself.',
  })
}
