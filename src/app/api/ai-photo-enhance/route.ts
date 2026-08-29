import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenAI, Type } from '@google/genai'

type Assessment = {
  score: number
  strengths: string[]
  issues: string[]
  tip: string
}

const RESPONSE_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    score: { type: Type.NUMBER, description: 'Overall photo quality for a marketplace listing, 1-100 — considers lighting, framing, background, clarity and appeal' },
    strengths: { type: Type.ARRAY, items: { type: Type.STRING }, description: 'What is genuinely good about this specific photo. Empty array if nothing stands out.' },
    issues: { type: Type.ARRAY, items: { type: Type.STRING }, description: 'Specific visible problems (e.g. "background is cluttered", "image is slightly blurry"). Empty array if none.' },
    tip: { type: Type.STRING, description: 'One short, actionable tip for a better listing photo' },
  },
  required: ['score', 'strengths', 'issues', 'tip'],
}

async function assessWithGemini(apiKey: string, base64: string, mimeType: string): Promise<Assessment> {
  const ai = new GoogleGenAI({ apiKey })
  const timeout = new Promise<never>((_, reject) => setTimeout(() => reject(new Error('Gemini request timed out')), 15000))

  const call = ai.models.generateContent({
    model: 'gemini-3.6-flash',
    contents: [{
      role: 'user',
      parts: [
        { inlineData: { mimeType, data: base64 } },
        { text: 'You are a photography quality reviewer for SouKni, a Moroccan marketplace. Assess this product photo as it actually is — do not assume any editing or enhancement has been applied. Respond with the structured JSON only.' },
      ],
    }],
    config: { responseMimeType: 'application/json', responseSchema: RESPONSE_SCHEMA },
  })

  const response = await Promise.race([call, timeout])
  const text = response.text
  if (!text) throw new Error('Empty response from Gemini')
  const parsed = JSON.parse(text)
  if (typeof parsed.score !== 'number' || !parsed.tip) throw new Error('Malformed Gemini response')

  return {
    score: Math.max(1, Math.min(100, Math.round(parsed.score))),
    strengths: Array.isArray(parsed.strengths) ? parsed.strengths.slice(0, 5).filter((s: unknown) => typeof s === 'string') : [],
    issues: Array.isArray(parsed.issues) ? parsed.issues.slice(0, 5).filter((s: unknown) => typeof s === 'string') : [],
    tip: parsed.tip,
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
      const assessment = await assessWithGemini(apiKey, base64, mimeType)
      return NextResponse.json({ assessment, source: 'ai' })
    } catch (e) {
      console.error('[ai-photo-enhance] Gemini assessment failed:', e)
    }
  }

  // There is no deterministic way to judge photo quality from pixels
  // alone — same as visual-search and quick-list's photo path, a missing
  // or failed Gemini call gets an honest "unavailable" state, never a
  // fabricated score.
  return NextResponse.json({
    assessment: null,
    source: 'unavailable',
    message: 'Photo quality assessment is temporarily unavailable — you can still use this photo as-is.',
  })
}
