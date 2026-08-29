import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenAI, Type } from '@google/genai'

type WriterResult = { title: string; description: string; source: 'ai' | 'fallback' }

const RESPONSE_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    title: { type: Type.STRING, description: 'Catchy marketplace listing title, max 80 characters' },
    description: { type: Type.STRING, description: '150-300 word professional sales description, grounded only in what the seller actually said' },
  },
  required: ['title', 'description'],
}

// Deterministic fallback: not a fabricated listing, just the seller's own
// words cleaned up — a genuinely reasonable emergency default rather than
// an "unavailable" dead end, since there's no real drafting to get wrong.
function fallbackWrite(prompt: string): WriterResult {
  const cleaned = prompt.trim()
  const title = (cleaned.charAt(0).toUpperCase() + cleaned.slice(1)).slice(0, 80)
  const description = cleaned.charAt(0).toUpperCase() + cleaned.slice(1)
  return { title, description, source: 'fallback' }
}

async function writeWithGemini(apiKey: string, prompt: string, category: string, city: string): Promise<WriterResult> {
  const ai = new GoogleGenAI({ apiKey })
  const timeout = new Promise<never>((_, reject) => setTimeout(() => reject(new Error('Gemini request timed out')), 10000))

  const call = ai.models.generateContent({
    model: 'gemini-3.6-flash',
    contents: `You are a marketplace copywriter for SouKni, a Moroccan classifieds site. Write a listing title and description from this seller's own description: "${prompt}"

Category: ${category || 'General'}. City: ${city || 'Morocco'}.

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
  return { title: parsed.title.slice(0, 80), description: parsed.description, source: 'ai' }
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null)
  const prompt: string | undefined = typeof body?.prompt === 'string' ? body.prompt.trim() : undefined
  if (!prompt) return NextResponse.json({ error: 'A description is required' }, { status: 400 })
  const category = typeof body?.category === 'string' ? body.category : ''
  const city = typeof body?.city === 'string' ? body.city : ''

  const apiKey = process.env.GEMINI_API_KEY
  if (apiKey) {
    try {
      const result = await writeWithGemini(apiKey, prompt, category, city)
      return NextResponse.json(result)
    } catch (e) {
      console.error('[ai-writer] Gemini call failed, falling back:', e)
    }
  }
  return NextResponse.json(fallbackWrite(prompt))
}
