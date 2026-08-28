'use client'

import { useState, use, useRef, useEffect } from 'react'
import Link from 'next/link'
import Breadcrumb from '@/components/ui/Breadcrumb'
import { Camera, Upload, X, Check, Sparkles, AlertTriangle } from 'lucide-react'
import VoiceInput from '@/components/ui/VoiceInput'
import { useAuth } from '@/hooks/useAuth'
import { useListings } from '@/hooks/useListings'
import { getSupabaseClient } from '@/lib/supabase/client'
import { CATEGORIES, CONDITION_TO_DB, CONDITION_FROM_DB } from '@/lib/categories'
import { resizeImage } from '@/lib/resizeImage'

type Locale = 'en' | 'fr' | 'ar' | 'es' | 'de'

const MINT    = '#22d4a8'
const SURFACE = '#f4fbf8'
const INK     = '#161d1b'
const MUTED   = '#6b7a76'
const FONT    = "'Inter', system-ui, sans-serif"

const CITIES = ['Rabat', 'Casablanca', 'Marrakech', 'Fès', 'Tangier', 'Agadir', 'Meknès', 'Oujda', 'Kenitra', 'Tétouan', 'Settat', 'Laâyoune']
const CONDITIONS = ['New', 'Like New', 'Good', 'Fair', 'For Parts']

type Stage = 'upload' | 'analyzing' | 'review' | 'publishing' | 'published'

export default function QuickListPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = use(params)
  const fileRef = useRef<HTMLInputElement>(null)
  const supabase = getSupabaseClient()
  const { user, loading: authLoading } = useAuth()
  const { createListing } = useListings()

  const [stage, setStage]           = useState<Stage>('upload')
  const [photoPreview, setPhotoPreview] = useState<string | null>(null)
  const [photoUrl, setPhotoUrl]     = useState<string | null>(null)
  const [photoUploading, setPhotoUploading] = useState(false)
  const [photoUploadError, setPhotoUploadError] = useState<string | null>(null)
  const [aiNotice, setAiNotice]     = useState<string | null>(null)

  const [title, setTitle]           = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory]     = useState('')
  const [condition, setCondition]   = useState('')
  const [price, setPrice]           = useState('')
  const [city, setCity]             = useState('')
  const [phone, setPhone]           = useState('')

  const [publishError, setPublishError] = useState<string | null>(null)
  const [createdListingId, setCreatedListingId] = useState<string | null>(null)

  useEffect(() => {
    if (!user) return
    if (user.phone) setPhone(user.phone.replace(/^\+?212/, '').trim())
    if (user.city) setCity(user.city)
  }, [user?.id])

  const selectedCat = CATEGORIES.find(c => c.slug === category)

  const handleFile = async (file: File) => {
    setPublishError(null)
    let dataUrl: string
    try {
      dataUrl = await resizeImage(file)
    } catch {
      setPublishError('Could not read that photo — please try another one.')
      return
    }
    setPhotoPreview(dataUrl)
    setStage('analyzing')
    setAiNotice(null)

    // Run AI drafting and the real photo upload in parallel — one produces
    // the listing content, the other produces the real image URL we'll
    // publish with. Neither blocks the other.
    const draftPromise = fetch('/api/quick-list', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ image: dataUrl }),
    }).then(r => r.json()).catch(() => ({ draft: null, source: 'unavailable', message: 'AI listing generation failed to reach the server.' }))

    setPhotoUploading(true)
    const formData = new FormData()
    formData.append('file', file)
    formData.append('type', 'listing')
    const uploadPromise = fetch('/api/upload', { method: 'POST', body: formData })
      .then(r => r.json())
      .catch(() => ({ error: 'Photo upload failed to reach the server.' }))

    const [draftResult, uploadResult] = await Promise.all([draftPromise, uploadPromise])

    if (uploadResult.url) setPhotoUrl(uploadResult.url)
    else setPhotoUploadError(uploadResult.error || 'Photo upload failed. You can still publish without it.')
    setPhotoUploading(false)

    if (draftResult.draft) {
      setTitle(draftResult.draft.title || '')
      setDescription(draftResult.draft.description || '')
      if (draftResult.draft.category) setCategory(draftResult.draft.category)
      if (draftResult.draft.condition) setCondition(CONDITION_FROM_DB[draftResult.draft.condition] || '')
      if (draftResult.draft.suggestedPrice) setPrice(String(draftResult.draft.suggestedPrice))
    }
    if (draftResult.message) setAiNotice(draftResult.message)

    setStage('review')
  }

  const handleVoice = async (transcript: string) => {
    if (!transcript.trim()) return
    setPublishError(null)
    setStage('analyzing')
    setAiNotice(null)

    const draftResult = await fetch('/api/quick-list', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ transcript }),
    }).then(r => r.json()).catch(() => ({ draft: null, source: 'unavailable', message: 'Listing generation failed to reach the server.' }))

    if (draftResult.draft) {
      setTitle(draftResult.draft.title || '')
      setDescription(draftResult.draft.description || '')
      if (draftResult.draft.category) setCategory(draftResult.draft.category)
      if (draftResult.draft.condition) setCondition(CONDITION_FROM_DB[draftResult.draft.condition] || '')
      if (draftResult.draft.suggestedPrice) setPrice(String(draftResult.draft.suggestedPrice))
    }
    if (draftResult.message) setAiNotice(draftResult.message)

    setStage('review')
  }

  const canPublish = title.trim().length >= 5 && category !== '' && city !== '' && price !== '' && phone.length >= 8

  const handlePublish = async () => {
    if (!user) {
      setPublishError('You must be signed in to post an ad.')
      return
    }
    setStage('publishing')
    setPublishError(null)
    try {
      const listing = await createListing({
        seller_id: user.id,
        title,
        description,
        category_slug: category,
        subcategory: null,
        condition: CONDITION_TO_DB[condition] || null,
        city,
        images: photoUrl ? [photoUrl] : [],
        price: Number(price || 0),
        currency: 'MAD',
        negotiable: false,
        hide_price: false,
        free_item: false,
      })
      await supabase.from('profiles').update({
        phone: phone ? `212${phone.replace(/\D/g, '')}` : null,
      }).eq('id', user.id)
      setCreatedListingId(listing?.id ?? null)
      setStage('published')
    } catch (e: any) {
      setPublishError(e?.message || 'Something went wrong publishing your ad. Please try again.')
      setStage('review')
    }
  }

  const reset = () => {
    setStage('upload'); setPhotoPreview(null); setPhotoUrl(null); setPhotoUploadError(null); setAiNotice(null)
    setTitle(''); setDescription(''); setCategory(''); setCondition(''); setPrice('')
    setPublishError(null); setCreatedListingId(null)
    if (fileRef.current) fileRef.current.value = ''
  }

  const Label = ({ children }: { children: React.ReactNode }) => (
    <p style={{ fontSize: '13px', fontWeight: 700, color: INK, marginBottom: '8px' }}>{children}</p>
  )

  if (stage === 'published') return (
    <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 20px', fontFamily: FONT }}>
      <div style={{ textAlign: 'center', maxWidth: '440px' }}>
        <div style={{ width: '80px', height: '80px', background: `linear-gradient(135deg, ${MINT}, #0f9b8e)`, borderRadius: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
          <Check size={40} color="white" strokeWidth={2.5} />
        </div>
        <h1 style={{ fontSize: '28px', fontWeight: 900, color: INK, marginBottom: '12px', letterSpacing: '-0.05em' }}>Your ad is live! ⚡</h1>
        <p style={{ fontSize: '15px', color: MUTED, lineHeight: 1.6, marginBottom: '28px', fontWeight: 700 }}>
          <strong style={{ color: INK }}>{title}</strong> was published in seconds.
        </p>
        <div style={{ display: 'flex', gap: '12px' }}>
          {createdListingId && (
            <Link href={`/${locale}/listing/${createdListingId}`} style={{ flex: 1, padding: '13px', borderRadius: '12px', border: '1.5px solid #e2eae6', color: INK, textDecoration: 'none', fontWeight: 700, fontSize: '14px', textAlign: 'center' }}>View My Ad</Link>
          )}
          <button onClick={reset} style={{ flex: 1, padding: '13px', borderRadius: '12px', background: MINT, color: 'white', border: 'none', fontWeight: 700, fontSize: '14px', cursor: 'pointer', fontFamily: FONT }}>
            List Another
          </button>
        </div>
      </div>
    </div>
  )

  return (
    <div style={{ background: SURFACE, minHeight: '100vh', fontFamily: FONT }}>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>

      <div style={{ background: 'white', borderBottom: '1px solid #e2eae6', padding: '20px 0' }}>
        <div style={{ maxWidth: '620px', margin: '0 auto', padding: '0 24px' }}>
          <Breadcrumb items={[{ label: 'Home', href: `/${locale}` }, { label: 'Quick List' }]} style={{ marginBottom: 12, textTransform: 'none', fontSize: 13, letterSpacing: 'normal' }} />
          <h1 style={{ fontSize: '22px', fontWeight: 900, color: INK, letterSpacing: '-0.05em' }}>⚡ Quick List</h1>
          <p style={{ fontSize: '13px', color: MUTED, fontWeight: 700, marginTop: '4px' }}>Snap a photo — AI drafts the rest. Full control before you publish.</p>
        </div>
      </div>

      <div style={{ maxWidth: '620px', margin: '32px auto', padding: '0 24px 80px' }}>
        <div style={{ background: 'white', borderRadius: '24px', padding: '32px', boxShadow: '0 4px 24px rgba(0,0,0,0.06)', border: '1px solid #e2eae6' }}>

          {stage === 'upload' && (
            <div>
              <input ref={fileRef} type="file" accept="image/*" capture="environment" style={{ display: 'none' }} onChange={e => e.target.files?.[0] && handleFile(e.target.files[0])} />
              <div onClick={() => fileRef.current?.click()}
                style={{ border: `2px dashed ${MINT}`, borderRadius: '20px', padding: '48px 24px', textAlign: 'center', cursor: 'pointer', background: '#f0fdf9' }}>
                <Camera size={44} color={MINT} style={{ marginBottom: '14px' }} />
                <p style={{ fontSize: '16px', fontWeight: 900, color: INK, marginBottom: '6px' }}>Take or upload a photo</p>
                <p style={{ fontSize: '13px', color: MUTED, fontWeight: 700 }}>AI will write the title, description and suggest a price</p>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '14px' }}>
                <button onClick={() => fileRef.current?.click()}
                  style={{ padding: '13px', borderRadius: '12px', background: MINT, border: 'none', color: 'white', fontSize: '14px', fontWeight: 900, cursor: 'pointer', fontFamily: FONT, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                  <Upload size={16} /> Upload Photo
                </button>
                <button onClick={() => fileRef.current?.click()}
                  style={{ padding: '13px', borderRadius: '12px', background: INK, border: 'none', color: 'white', fontSize: '14px', fontWeight: 900, cursor: 'pointer', fontFamily: FONT, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                  <Camera size={16} /> Take Photo
                </button>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: '18px 0' }}>
                <div style={{ flex: 1, height: '1px', background: '#e2eae6' }} />
                <span style={{ fontSize: '11px', color: MUTED, fontWeight: 700 }}>OR</span>
                <div style={{ flex: 1, height: '1px', background: '#e2eae6' }} />
              </div>
              <div style={{ textAlign: 'center' }}>
                <VoiceInput locale={locale} onResult={handleVoice} label="Describe it out loud" />
              </div>

              <p style={{ fontSize: '12px', color: MUTED, fontWeight: 700, marginTop: '18px', textAlign: 'center' }}>
                Prefer the full form? <Link href={`/${locale}/post-ad`} style={{ color: MINT, fontWeight: 900 }}>Post an ad manually</Link>
              </p>
            </div>
          )}

          {(stage === 'analyzing' || stage === 'review' || stage === 'publishing') && (
            <div>
              {photoPreview && (
                <div style={{ borderRadius: '16px', overflow: 'hidden', marginBottom: '18px', aspectRatio: '4/3', background: '#e2eae6', position: 'relative' }}>
                  <img src={photoPreview} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  {stage === 'review' && (
                    <button onClick={reset}
                      style={{ position: 'absolute', top: '10px', right: '10px', width: '30px', height: '30px', borderRadius: '50%', background: 'rgba(0,0,0,0.5)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <X size={14} color="white" />
                    </button>
                  )}
                </div>
              )}

              {stage === 'analyzing' && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '16px', background: '#f0fdf9', borderRadius: '12px' }}>
                  <div style={{ width: '18px', height: '18px', borderRadius: '50%', border: `2px solid rgba(34,212,168,0.3)`, borderTopColor: MINT, animation: 'spin 0.8s linear infinite', flexShrink: 0 }} />
                  <p style={{ fontSize: '13px', fontWeight: 700, color: MUTED }}>AI is writing your listing...</p>
                </div>
              )}

              {stage === 'review' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {aiNotice && (
                    <div style={{ padding: '12px 14px', background: '#fff7ed', border: '1px solid #fdba74', borderRadius: '12px' }}>
                      <p style={{ fontSize: '12px', color: '#9a3412', fontWeight: 700, lineHeight: 1.5 }}>{aiNotice}</p>
                    </div>
                  )}
                  {photoUploading && (
                    <p style={{ fontSize: '11px', color: MUTED, fontWeight: 700 }}>Uploading photo…</p>
                  )}
                  {photoUploadError && (
                    <div style={{ padding: '10px 14px', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '10px' }}>
                      <p style={{ fontSize: '11px', color: '#b91c1c', fontWeight: 700 }}>{photoUploadError}</p>
                    </div>
                  )}

                  <div>
                    <Label>Title *</Label>
                    <input value={title} onChange={e => setTitle(e.target.value)} maxLength={80}
                      style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #e2eae6', fontSize: '15px', color: INK, background: SURFACE, outline: 'none', fontFamily: FONT, fontWeight: 700, boxSizing: 'border-box' }} />
                  </div>

                  <div>
                    <Label>Description</Label>
                    <textarea value={description} onChange={e => setDescription(e.target.value)} rows={4} maxLength={2000}
                      style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #e2eae6', fontSize: '14px', color: INK, background: SURFACE, outline: 'none', fontFamily: FONT, fontWeight: 700, resize: 'vertical', boxSizing: 'border-box', lineHeight: 1.6 }} />
                  </div>

                  <div>
                    <Label>Category *</Label>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                      {CATEGORIES.map(cat => (
                        <button key={cat.slug} onClick={() => setCategory(cat.slug)}
                          style={{ padding: '8px 14px', borderRadius: '100px', border: `1.5px solid ${category === cat.slug ? MINT : '#e2eae6'}`, background: category === cat.slug ? MINT : 'white', color: category === cat.slug ? 'white' : INK, fontSize: '12px', fontWeight: 900, cursor: 'pointer', fontFamily: FONT }}>
                          {cat.emoji} {cat.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label>Condition</Label>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                      {CONDITIONS.map(c => (
                        <button key={c} onClick={() => setCondition(c)}
                          style={{ padding: '8px 16px', borderRadius: '100px', border: `1.5px solid ${condition === c ? MINT : '#e2eae6'}`, background: condition === c ? MINT : 'white', color: condition === c ? 'white' : INK, fontSize: '12px', fontWeight: 900, cursor: 'pointer', fontFamily: FONT }}>
                          {c}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                    <div>
                      <Label>Price (MAD) *</Label>
                      <input type="number" min="0" value={price} onChange={e => setPrice(e.target.value)}
                        style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #e2eae6', fontSize: '17px', fontWeight: 900, color: INK, background: SURFACE, outline: 'none', fontFamily: FONT, boxSizing: 'border-box' }} />
                    </div>
                    <div>
                      <Label>City *</Label>
                      <select value={city} onChange={e => setCity(e.target.value)}
                        style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #e2eae6', fontSize: '14px', fontFamily: FONT, fontWeight: 700, color: city ? INK : MUTED, background: SURFACE, outline: 'none', cursor: 'pointer', boxSizing: 'border-box' }}>
                        <option value="">Select city...</option>
                        {CITIES.map(c => <option key={c}>{c}</option>)}
                      </select>
                    </div>
                  </div>

                  <div>
                    <Label>Your Phone Number *</Label>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <div style={{ padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #e2eae6', background: SURFACE, fontSize: '14px', fontWeight: 900, color: INK, display: 'flex', alignItems: 'center', flexShrink: 0 }}>
                        🇲🇦 +212
                      </div>
                      <input type="tel" placeholder="6 12 34 56 78" value={phone} onChange={e => setPhone(e.target.value)}
                        style={{ flex: 1, padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #e2eae6', fontSize: '15px', fontFamily: FONT, fontWeight: 700, color: INK, background: SURFACE, outline: 'none', boxSizing: 'border-box' }} />
                    </div>
                  </div>

                  {publishError && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '14px 16px', borderRadius: '12px', background: '#fef2f2', border: '1.5px solid #fecaca' }}>
                      <AlertTriangle size={16} color="#ef4444" style={{ flexShrink: 0 }} />
                      <span style={{ fontSize: '13px', fontWeight: 700, color: '#b91c1c' }}>{publishError}</span>
                    </div>
                  )}

                  <button onClick={handlePublish} disabled={!canPublish}
                    style={{ width: '100%', padding: '15px', borderRadius: '14px', background: canPublish ? `linear-gradient(135deg, ${MINT}, #0f9b8e)` : '#e2eae6', color: canPublish ? 'white' : MUTED, border: 'none', fontSize: '15px', fontWeight: 900, cursor: canPublish ? 'pointer' : 'not-allowed', fontFamily: FONT, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                    <Sparkles size={16} /> Publish to SouKni
                  </button>
                </div>
              )}

              {stage === 'publishing' && (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', padding: '20px' }}>
                  <span style={{ width: '18px', height: '18px', borderRadius: '50%', border: `2.5px solid rgba(34,212,168,0.3)`, borderTopColor: MINT, display: 'inline-block', animation: 'spin 0.8s linear infinite' }} />
                  <span style={{ fontSize: '14px', fontWeight: 700, color: MUTED }}>Publishing...</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
