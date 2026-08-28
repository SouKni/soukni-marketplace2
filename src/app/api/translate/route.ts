import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenAI, Type } from '@google/genai'

// Note: the unofficial free translate.googleapis.com web endpoint was tried
// as a possible no-key fallback and confirmed blocked from this environment
// ("automated queries" error) — it isn't a usable fallback layer, so
// translation here is Gemini-only with a clean "unavailable" state if the
// key is missing or the call fails, rather than pretending a translation
// happened.

const LANGUAGE_NAMES: Record<string, string> = {
  en: 'English',
  fr: 'French',
  ar: 'Arabic (Modern Standard Arabic for the title, Moroccan Darija tone acceptable for informal parts of the description)',
  es: 'Spanish',
  nl: 'Dutch',
  tzm: 'Tamazight (Amazigh/Berber, Morocco). This is a lower-resource language for AI translation — do your best and keep it natural.',
}

const RESPONSE_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    title: { type: Type.STRING },
    description: { type: Type.STRING },
  },
  required: ['title', 'description'],
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null)
  const { title, description, targetLang } = body || {}

  if (!title || typeof title !== 'string' || !targetLang || !LANGUAGE_NAMES[targetLang]) {
    return NextResponse.json({ error: 'title and a supported targetLang are required' }, { status: 400 })
  }

  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) {
    return NextResponse.json({ error: 'Translation is temporarily unavailable' }, { status: 503 })
  }

  try {
    const ai = new GoogleGenAI({ apiKey })
    const timeout = new Promise<never>((_, reject) => setTimeout(() => reject(new Error('Gemini request timed out')), 8000))

    const call = ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: `Translate this marketplace listing accurately to ${LANGUAGE_NAMES[targetLang]}. Keep it natural, not literal. Preserve the meaning and selling tone.

Title: "${title}"
Description: "${description || ''}"

Respond with the structured translation only.`,
      config: { responseMimeType: 'application/json', responseSchema: RESPONSE_SCHEMA },
    })

    const response = await Promise.race([call, timeout])
    const text = response.text
    if (!text) throw new Error('Empty response from Gemini')
    const parsed = JSON.parse(text)
    if (!parsed.title) throw new Error('Malformed Gemini response')

    return NextResponse.json({ title: parsed.title, description: parsed.description || '' })
  } catch (e) {
    console.error('[translate] Gemini call failed:', e)
    return NextResponse.json({ error: 'Translation is temporarily unavailable' }, { status: 503 })
  }
}
