import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenAI, Type } from '@google/genai'

// Real Moroccan cities the marketplace actually uses — matched against both
// the AI's output and the deterministic fallback so a hallucinated or
// misspelled city never silently breaks the downstream Supabase query.
const KNOWN_CITIES = ['Rabat', 'Casablanca', 'Marrakech', 'Tanger', 'Tangier', 'Fes', 'Fès', 'Agadir', 'Meknes', 'Oujda', 'Kenitra', 'Tetouan']

function normalizeCity(city: string | null | undefined): string | null {
  if (!city) return null
  const match = KNOWN_CITIES.find(c => c.toLowerCase() === city.toLowerCase() || city.toLowerCase().includes(c.toLowerCase()))
  return match === 'Tangier' ? 'Tanger' : match === 'Fès' ? 'Fes' : match || null
}

// Deterministic keyword/regex parser — the guaranteed-to-work fallback when
// GEMINI_API_KEY is missing, invalid, or the API call fails/times out, so a
// buyer request never comes back empty-handed.
function fallbackParse(query: string) {
  const priceMatch = query.match(/(?:under|below|less than|moins de|max|budget of)\s*\$?(\d[\d,]*)\s*(?:mad|dh|dirhams?|dollars?|usd)?/i)
  const maxPrice = priceMatch ? parseInt(priceMatch[1].replace(/,/g, ''), 10) : null

  const cityMatch = KNOWN_CITIES.find(c => query.toLowerCase().includes(c.toLowerCase()))

  let keywords = query
  if (priceMatch) keywords = keywords.replace(priceMatch[0], '')
  if (cityMatch) keywords = keywords.replace(new RegExp(cityMatch, 'ig'), '')
  keywords = keywords
    .replace(/\b(in|under|below|less than|moins de|for|find me|looking for|i want|i need|a|an|the|max|budget of|mad|dh|dirhams?|dollars?|usd)\b/gi, '')
    .replace(/\$/g, '')
    .replace(/\s+/g, ' ')
    .trim()

  return {
    keywords: keywords || query,
    maxPrice,
    city: normalizeCity(cityMatch || null),
    source: 'fallback' as const,
  }
}

const RESPONSE_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    keywords: { type: Type.STRING, description: 'Core product/item search keywords only, e.g. "iphone 15", "sofa", "toyota". No filler words.' },
    maxPrice: { type: Type.NUMBER, description: 'Maximum budget as a plain number in MAD if one was mentioned (ignore currency symbols like $), otherwise omit', nullable: true },
    city: { type: Type.STRING, description: 'A Moroccan city mentioned in the request, otherwise omit', nullable: true },
  },
  required: ['keywords'],
}

async function parseWithGemini(query: string, apiKey: string) {
  const ai = new GoogleGenAI({ apiKey })
  const timeout = new Promise<never>((_, reject) => setTimeout(() => reject(new Error('Gemini request timed out')), 8000))

  const call = ai.models.generateContent({
    model: 'gemini-3.6-flash',
    contents: `Extract search filters from this marketplace buyer request. Respond with the structured JSON only.\n\nRequest: "${query}"`,
    config: { responseMimeType: 'application/json', responseSchema: RESPONSE_SCHEMA },
  })

  const response = await Promise.race([call, timeout])
  const text = response.text
  if (!text) throw new Error('Empty response from Gemini')

  const parsed = JSON.parse(text)
  if (!parsed.keywords || typeof parsed.keywords !== 'string') throw new Error('Malformed Gemini response')

  return {
    keywords: parsed.keywords,
    maxPrice: typeof parsed.maxPrice === 'number' ? parsed.maxPrice : null,
    city: normalizeCity(parsed.city),
    source: 'ai' as const,
  }
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null)
  const query = body?.query
  if (!query || typeof query !== 'string' || !query.trim()) {
    return NextResponse.json({ error: 'query is required' }, { status: 400 })
  }

  const apiKey = process.env.GEMINI_API_KEY
  if (apiKey) {
    try {
      const result = await parseWithGemini(query, apiKey)
      return NextResponse.json(result)
    } catch (e) {
      console.error('[buyer-agent] Gemini parse failed, falling back to deterministic parser:', e)
    }
  }

  return NextResponse.json(fallbackParse(query))
}
