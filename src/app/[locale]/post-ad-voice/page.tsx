'use client'

import { useState, use, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Breadcrumb from '@/components/ui/Breadcrumb'
import {
  Camera, Mic, MicOff, Check, X, Sparkles, ArrowRight,
  ChevronRight, RotateCcw, Upload, Loader, AlertTriangle
} from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { useListings } from '@/hooks/useListings'
import { CATEGORIES, CONDITION_TO_DB, matchCategory } from '@/lib/categories'

type Locale = 'en' | 'fr' | 'ar' | 'es' | 'de'

const MINT    = '#22d4a8'
const INK     = '#161d1b'
const MUTED   = '#6b7a76'
const SURFACE = '#f4fbf8'
const FONT    = "'Inter', system-ui, sans-serif"

type Stage = 'photo' | 'voice' | 'processing' | 'review' | 'success'

type ParsedAd = {
  title: string
  description: string
  category: string
  subcategory: string
  price: number | null
  condition: string
  city: string
  currency: string
}

export default function VoicePostAdPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = use(params)
  const router = useRouter()
  const fileRef = useRef<HTMLInputElement>(null)
  const recognitionRef = useRef<any>(null)

  const { user } = useAuth()
  const { createListing } = useListings()

  const [stage, setStage]         = useState<Stage>('photo')
  const [photos, setPhotos]       = useState<string[]>([])
  const [uploadingPhotos, setUploadingPhotos] = useState(false)
  const [listening, setListening] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [finalTranscript, setFinalTranscript] = useState('')
  const [parsed, setParsed]       = useState<ParsedAd | null>(null)
  const [categorySlug, setCategorySlug] = useState('')
  const [error, setError]         = useState('')
  const [publishing, setPublishing] = useState(false)
  const [createdListingId, setCreatedListingId] = useState<string | null>(null)

  const handlePhotos = async (files: FileList) => {
    const list = Array.from(files)
    if (!list.length) return
    setUploadingPhotos(true)
    for (const file of list) {
      if (photos.length >= 8) break
      const formData = new FormData()
      formData.append('file', file)
      formData.append('type', 'listing')
      try {
        const res = await fetch('/api/upload', { method: 'POST', body: formData })
        const data = await res.json()
        if (data.url) setPhotos(prev => prev.length < 8 ? [...prev, data.url] : prev)
      } catch {
        // upload failures are non-fatal — the ad can still publish without this photo
      }
    }
    setUploadingPhotos(false)
    if (fileRef.current) fileRef.current.value = ''
  }

  const startListening = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    if (!SpeechRecognition) {
      setError('Voice input not supported. Try Chrome browser.')
      return
    }
    const recognition = new SpeechRecognition()
    recognition.lang = 'fr-MA'
    recognition.continuous = true
    recognition.interimResults = true

    recognition.onstart  = () => setListening(true)
    recognition.onresult = (e: any) => {
      let final = ''
      let interim = ''
      for (let i = 0; i < e.results.length; i++) {
        if (e.results[i].isFinal) final += e.results[i][0].transcript
        else interim += e.results[i][0].transcript
      }
      setFinalTranscript(final)
      setTranscript(final + interim)
    }
    recognition.onerror = () => setListening(false)
    recognition.onend   = () => setListening(false)

    recognitionRef.current = recognition
    recognition.start()
  }

  const stopListening = () => {
    recognitionRef.current?.stop()
    setListening(false)
    if (transcript.trim()) processVoice()
  }

  const processVoice = async () => {
    setStage('processing')
    try {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-6',
          max_tokens: 800,
          messages: [{
            role: 'user',
            content: `You are SouKni's voice-to-listing AI for a Moroccan marketplace. The seller spoke this description of their item while looking at photos:

"${transcript}"

Extract a complete, professional listing. Categories available: ${CATEGORIES.map(c => c.label).join(', ')}.

Respond ONLY with valid JSON:
{
  "title": "<compelling title max 80 chars>",
  "description": "<professional description 100-250 words based on what they said, filling gaps naturally>",
  "category": "<best matching category, exactly one of the labels listed above>",
  "subcategory": "<specific subcategory>",
  "price": <number in MAD if mentioned, else null>,
  "condition": "<new|like_new|good|fair, best guess from context>",
  "city": "<city if mentioned, else null>",
  "currency": "MAD"
}`
          }]
        })
      })
      const data = await res.json()
      const text = data.content?.[0]?.text || '{}'
      const result = JSON.parse(text.replace(/```json|```/g, '').trim())
      setParsed(result)
      setCategorySlug(matchCategory(result.category)?.slug || '')
      setStage('review')
    } catch {
      setParsed({
        title: transcript.slice(0, 60),
        description: transcript,
        category: '', subcategory: '',
        price: null, condition: 'good', city: '', currency: 'MAD'
      })
      setCategorySlug('')
      setStage('review')
    }
  }

  const publish = async () => {
    if (!parsed) return
    if (!user) {
      setError('You must be signed in to post an ad.')
      return
    }
    if (!categorySlug) {
      setError('Please pick a category before publishing.')
      return
    }
    setPublishing(true)
    setError('')
    try {
      const listing = await createListing({
        seller_id: user.id,
        title: parsed.title,
        description: parsed.description,
        category_slug: categorySlug,
        subcategory: parsed.subcategory || '',
        condition: CONDITION_TO_DB[parsed.condition] || (['new', 'like_new', 'good', 'fair', 'for_parts'].includes(parsed.condition) ? parsed.condition : null),
        city: parsed.city || '',
        images: photos,
        price: Number(parsed.price || 0),
        currency: parsed.currency || 'MAD',
      })
      setCreatedListingId(listing?.id ?? null)
      setStage('success')
    } catch (e: any) {
      setError(e?.message || 'Something went wrong publishing your ad. Please try again.')
    } finally {
      setPublishing(false)
    }
  }

  const StageIndicator = () => {
    const stages = ['photo', 'voice', 'review']
    const idx = stages.indexOf(stage === 'processing' ? 'voice' : stage)
    return (
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '28px' }}>
        {[{ label: 'Photo', emoji: '📸' }, { label: 'Speak', emoji: '🎤' }, { label: 'Review', emoji: '✓' }].map((s, i, arr) => {
          const done = i < idx
          const active = i === idx
          return (
            <div key={s.label} style={{ display: 'flex', alignItems: 'center', flex: i < arr.length - 1 ? 1 : 'none' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '15px', background: done ? MINT : active ? INK : '#e2eae6', transition: 'all 0.3s' }}>
                  {done ? <Check size={16} color="white" strokeWidth={3} /> : s.emoji}
                </div>
                <span style={{ fontSize: '10px', fontWeight: 900, color: active ? INK : done ? MINT : MUTED }}>{s.label}</span>
              </div>
              {i < arr.length - 1 && <div style={{ flex: 1, height: '2px', background: done ? MINT : '#e2eae6', margin: '0 8px', marginBottom: '18px' }} />}
            </div>
          )
        })}
      </div>
    )
  }

  // SUCCESS
  if (stage === 'success') return (
    <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 20px', fontFamily: FONT }}>
      <div style={{ textAlign: 'center', maxWidth: '440px' }}>
        <div style={{ width: '80px', height: '80px', background: `linear-gradient(135deg, ${MINT}, #0f9b8e)`, borderRadius: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
          <Check size={40} color="white" strokeWidth={2.5} />
        </div>
        <h1 style={{ fontSize: '28px', fontWeight: 900, color: INK, marginBottom: '10px', letterSpacing: '-0.05em' }}>Posted by voice! 🎤</h1>
        <p style={{ fontSize: '15px', color: MUTED, fontWeight: 700, marginBottom: '28px' }}>
          <strong style={{ color: INK }}>{parsed?.title}</strong> is now live. No typing needed!
        </p>
        <div style={{ display: 'flex', gap: '10px' }}>
          {createdListingId ? (
            <Link href={`/${locale}/listing/${createdListingId}`} style={{ flex: 1, padding: '13px', borderRadius: '12px', border: '1.5px solid #e2eae6', color: INK, textDecoration: 'none', fontWeight: 900, fontSize: '14px', textAlign: 'center' }}>View My Ad</Link>
          ) : (
            <Link href={`/${locale}`} style={{ flex: 1, padding: '13px', borderRadius: '12px', border: '1.5px solid #e2eae6', color: INK, textDecoration: 'none', fontWeight: 900, fontSize: '14px', textAlign: 'center' }}>Home</Link>
          )}
          <button onClick={() => { setStage('photo'); setPhotos([]); setTranscript(''); setParsed(null); setCategorySlug(''); setCreatedListingId(null); setError('') }}
            style={{ flex: 1, padding: '13px', borderRadius: '12px', background: MINT, color: 'white', border: 'none', fontWeight: 900, fontSize: '14px', cursor: 'pointer', fontFamily: FONT }}>
            Post Another
          </button>
        </div>
      </div>
    </div>
  )

  return (
    <div style={{ background: SURFACE, minHeight: '100vh', fontFamily: FONT }}>
      <style>{`
        @keyframes pulse-ring { 0%{transform:scale(1);opacity:0.6} 100%{transform:scale(1.6);opacity:0} }
        @keyframes wave { 0%,100%{height:8px} 50%{height:28px} }
        @keyframes spin { to { transform: rotate(360deg) } }
      `}</style>

      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '32px 24px 80px' }}>

        {/* Header */}
        <Breadcrumb items={[{ label: 'Home', href: `/${locale}` }, { label: 'Post Ad', href: `/${locale}/post-ad` }, { label: 'Voice Mode 🎤' }]} style={{ marginBottom: 20, textTransform: 'none', fontSize: 13, letterSpacing: 'normal' }} />

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
          <div style={{ width: '44px', height: '44px', borderRadius: '13px', background: `linear-gradient(135deg, ${MINT}, #0f9b8e)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Mic size={20} color="white" />
          </div>
          <div>
            <h1 style={{ fontSize: '22px', fontWeight: 900, color: INK, letterSpacing: '-0.05em' }}>Post an Ad by Voice</h1>
            <p style={{ fontSize: '13px', color: MUTED, fontWeight: 700 }}>Take a photo, describe it, done in 30 seconds</p>
          </div>
        </div>

        <div style={{ background: 'white', borderRadius: '24px', padding: '32px', border: '1px solid #e2eae6', marginTop: '24px', boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
          <StageIndicator />

          {/* STAGE 1: PHOTO */}
          {stage === 'photo' && (
            <div>
              <h2 style={{ fontSize: '18px', fontWeight: 900, color: INK, marginBottom: '6px', letterSpacing: '-0.03em' }}>Take a photo of your item</h2>
              <p style={{ fontSize: '13px', color: MUTED, fontWeight: 700, marginBottom: '20px' }}>You can add up to 8 photos</p>

              <div onClick={() => !uploadingPhotos && fileRef.current?.click()}
                style={{ border: `2px dashed ${MINT}`, borderRadius: '18px', padding: '40px 24px', textAlign: 'center', cursor: uploadingPhotos ? 'not-allowed' : 'pointer', background: '#f0fdf9', marginBottom: '16px', opacity: uploadingPhotos ? 0.6 : 1 }}>
                <Camera size={36} color={MINT} style={{ marginBottom: '10px' }} />
                <p style={{ fontSize: '15px', fontWeight: 900, color: INK }}>{uploadingPhotos ? 'Uploading…' : photos.length === 0 ? 'Tap to take or upload photo' : `${photos.length} photo(s) added`}</p>
              </div>

              {photos.length > 0 && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', marginBottom: '20px' }}>
                  {photos.map((p, i) => (
                    <div key={i} style={{ position: 'relative', aspectRatio: '1/1', borderRadius: '10px', overflow: 'hidden' }}>
                      <img src={p} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      <button onClick={() => setPhotos(prev => prev.filter((_, idx) => idx !== i))}
                        style={{ position: 'absolute', top: '4px', right: '4px', width: '20px', height: '20px', borderRadius: '50%', background: 'rgba(0,0,0,0.6)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <X size={10} color="white" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <input ref={fileRef} type="file" accept="image/*" capture="environment" multiple style={{ display: 'none' }} onChange={e => e.target.files && handlePhotos(e.target.files)} />

              <button onClick={() => setStage('voice')} disabled={photos.length === 0}
                style={{ width: '100%', padding: '14px', borderRadius: '12px', background: photos.length > 0 ? MINT : '#e2eae6', color: photos.length > 0 ? 'white' : MUTED, border: 'none', fontSize: '15px', fontWeight: 900, cursor: photos.length > 0 ? 'pointer' : 'not-allowed', fontFamily: FONT, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                Continue to Voice <ArrowRight size={16} />
              </button>
            </div>
          )}

          {/* STAGE 2: VOICE */}
          {stage === 'voice' && (
            <div style={{ textAlign: 'center' }}>
              <h2 style={{ fontSize: '18px', fontWeight: 900, color: INK, marginBottom: '6px', letterSpacing: '-0.03em' }}>Describe your item</h2>
              <p style={{ fontSize: '13px', color: MUTED, fontWeight: 700, marginBottom: '24px' }}>Talk naturally — mention condition, price, and location</p>

              {/* Photo preview thumbnail */}
              <div style={{ display: 'flex', justifyContent: 'center', gap: '6px', marginBottom: '24px' }}>
                {photos.slice(0, 4).map((p, i) => (
                  <img key={i} src={p} alt="" style={{ width: '44px', height: '44px', borderRadius: '10px', objectFit: 'cover', border: '2px solid #e2eae6' }} />
                ))}
              </div>

              {!listening ? (
                <div style={{ margin: '20px auto' }}>
                  <button onClick={startListening}
                    style={{ width: '110px', height: '110px', borderRadius: '50%', background: `linear-gradient(135deg, ${MINT}, #0f9b8e)`, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 8px 32px rgba(34,212,168,0.4)`, margin: '0 auto' }}>
                    <Mic size={44} color="white" />
                  </button>
                  <p style={{ fontSize: '13px', color: MUTED, fontWeight: 700, marginTop: '16px' }}>Tap to start speaking</p>
                  {error && <p style={{ fontSize: '12px', color: '#ef4444', fontWeight: 700, marginTop: '10px' }}>{error}</p>}
                </div>
              ) : (
                <div style={{ margin: '20px auto' }}>
                  <div style={{ position: 'relative', width: '110px', height: '110px', margin: '0 auto 20px' }}>
                    {[1,2,3].map(i => <div key={i} style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: `2px solid ${MINT}`, animation: `pulse-ring 1.5s ease-out ${i*0.5}s infinite` }} />)}
                    <button onClick={stopListening}
                      style={{ width: '110px', height: '110px', borderRadius: '50%', background: '#ef4444', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', zIndex: 1 }}>
                      <MicOff size={44} color="white" />
                    </button>
                  </div>
                  <div style={{ display: 'flex', gap: '4px', justifyContent: 'center', alignItems: 'center', height: '36px', marginBottom: '16px' }}>
                    {[1,2,3,4,5,6,7,8].map(i => <div key={i} style={{ width: '4px', borderRadius: '2px', background: MINT, animation: `wave 0.8s ease-in-out ${i*0.1}s infinite` }} />)}
                  </div>
                  <p style={{ fontSize: '13px', color: MUTED, fontWeight: 700 }}>Tap the mic when you're done speaking</p>
                </div>
              )}

              {transcript && (
                <div style={{ marginTop: '20px', padding: '16px', background: SURFACE, borderRadius: '14px', textAlign: 'left' }}>
                  <p style={{ fontSize: '11px', fontWeight: 900, color: MUTED, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '6px' }}>What we heard:</p>
                  <p style={{ fontSize: '14px', color: INK, fontWeight: 700, lineHeight: 1.6, fontStyle: 'italic' }}>"{transcript}"</p>
                </div>
              )}

              <button onClick={() => setStage('photo')}
                style={{ marginTop: '16px', background: 'none', border: 'none', color: MUTED, fontSize: '13px', fontWeight: 700, cursor: 'pointer', fontFamily: FONT }}>
                ← Back to photos
              </button>
            </div>
          )}

          {/* STAGE 3: PROCESSING */}
          {stage === 'processing' && (
            <div style={{ textAlign: 'center', padding: '40px 0' }}>
              <div style={{ width: '64px', height: '64px', borderRadius: '50%', border: `3px solid #e2eae6`, borderTopColor: MINT, margin: '0 auto 20px', animation: 'spin 0.8s linear infinite' }} />
              <p style={{ fontSize: '16px', fontWeight: 900, color: INK, marginBottom: '6px' }}>AI is writing your listing...</p>
              <p style={{ fontSize: '13px', color: MUTED, fontWeight: 700 }}>Analyzing what you said</p>
            </div>
          )}

          {/* STAGE 4: REVIEW */}
          {stage === 'review' && parsed && (
            <div>
              <h2 style={{ fontSize: '18px', fontWeight: 900, color: INK, marginBottom: '6px', letterSpacing: '-0.03em' }}>✨ AI-Generated Listing</h2>
              <p style={{ fontSize: '13px', color: MUTED, fontWeight: 700, marginBottom: '20px' }}>Review and edit before publishing</p>

              <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
                <img src={photos[0]} alt="" style={{ width: '64px', height: '64px', borderRadius: '12px', objectFit: 'cover', flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <input value={parsed.title} onChange={e => setParsed({ ...parsed, title: e.target.value })}
                    style={{ width: '100%', fontSize: '15px', fontWeight: 900, color: INK, border: 'none', borderBottom: '2px solid #e2eae6', outline: 'none', padding: '4px 0', fontFamily: FONT, background: 'transparent' }} />
                  <div style={{ display: 'flex', gap: '8px', marginTop: '6px', alignItems: 'center' }}>
                    <select value={categorySlug} onChange={e => setCategorySlug(e.target.value)}
                      style={{ fontSize: '11px', fontWeight: 900, padding: '4px 8px', borderRadius: '100px', background: categorySlug ? '#f0fdf9' : '#fef2f2', color: categorySlug ? MINT : '#ef4444', border: 'none', fontFamily: FONT, cursor: 'pointer' }}>
                      <option value="">{parsed.category ? `AI guessed "${parsed.category}" — pick category` : 'Pick a category'}</option>
                      {CATEGORIES.map(c => <option key={c.slug} value={c.slug}>{c.emoji} {c.label}</option>)}
                    </select>
                    {parsed.subcategory && <span style={{ fontSize: '11px', fontWeight: 900, padding: '2px 8px', borderRadius: '100px', background: SURFACE, color: MUTED }}>{parsed.subcategory}</span>}
                  </div>
                </div>
              </div>

              <textarea value={parsed.description} onChange={e => setParsed({ ...parsed, description: e.target.value })}
                rows={5}
                style={{ width: '100%', padding: '12px 14px', borderRadius: '12px', border: '1.5px solid #e2eae6', fontSize: '13px', fontFamily: FONT, fontWeight: 600, color: INK, background: SURFACE, outline: 'none', resize: 'none', lineHeight: 1.6, boxSizing: 'border-box', marginBottom: '14px' }}
              />

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '20px' }}>
                <div>
                  <label style={{ fontSize: '10px', fontWeight: 900, color: MUTED, textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', marginBottom: '6px' }}>Price (MAD)</label>
                  <input type="number" value={parsed.price || ''} onChange={e => setParsed({ ...parsed, price: Number(e.target.value) })}
                    placeholder="Enter price"
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '10px', border: '1.5px solid #e2eae6', fontSize: '14px', fontFamily: FONT, fontWeight: 900, color: INK, background: SURFACE, outline: 'none', boxSizing: 'border-box' }} />
                </div>
                <div>
                  <label style={{ fontSize: '10px', fontWeight: 900, color: MUTED, textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', marginBottom: '6px' }}>City</label>
                  <input value={parsed.city} onChange={e => setParsed({ ...parsed, city: e.target.value })}
                    placeholder="Enter city"
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '10px', border: '1.5px solid #e2eae6', fontSize: '14px', fontFamily: FONT, fontWeight: 700, color: INK, background: SURFACE, outline: 'none', boxSizing: 'border-box' }} />
                </div>
              </div>

              {error && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 14px', borderRadius: '10px', background: '#fef2f2', border: '1.5px solid #fecaca', marginBottom: '14px' }}>
                  <AlertTriangle size={14} color="#ef4444" style={{ flexShrink: 0 }} />
                  <span style={{ fontSize: '12px', fontWeight: 700, color: '#b91c1c' }}>{error}</span>
                </div>
              )}

              <div style={{ display: 'flex', gap: '10px' }}>
                <button onClick={() => { setStage('voice'); setTranscript(''); setParsed(null); setError('') }} disabled={publishing}
                  style={{ padding: '13px 20px', borderRadius: '12px', border: '1.5px solid #e2eae6', background: 'white', fontSize: '14px', fontWeight: 900, cursor: publishing ? 'not-allowed' : 'pointer', fontFamily: FONT, color: INK, opacity: publishing ? 0.6 : 1 }}>
                  <RotateCcw size={14} style={{ display: 'inline', marginRight: '6px' }} /> Redo
                </button>
                <button onClick={publish} disabled={publishing}
                  style={{ flex: 1, padding: '13px', borderRadius: '12px', background: publishing ? MUTED : `linear-gradient(135deg, ${MINT}, #0f9b8e)`, border: 'none', color: 'white', fontSize: '15px', fontWeight: 900, cursor: publishing ? 'not-allowed' : 'pointer', fontFamily: FONT, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                  {publishing
                    ? <><span style={{ width: '15px', height: '15px', borderRadius: '50%', border: '2px solid rgba(255,255,255,0.35)', borderTopColor: 'white', display: 'inline-block', animation: 'spin 0.8s linear infinite' }} /> Publishing...</>
                    : <><Sparkles size={16} /> Publish Ad</>}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
