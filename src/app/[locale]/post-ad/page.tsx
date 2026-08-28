'use client'

import { useState, use, useRef, useEffect } from 'react'
import Link from 'next/link'
import AiPhotoEnhancer from '@/components/ui/AiPhotoEnhancer'
import VideoUpload from '@/components/ui/VideoUpload'
import Breadcrumb from '@/components/ui/Breadcrumb'
import { ChevronRight, ChevronLeft, Check, Upload, X, MapPin, Tag, FileText, Camera, DollarSign, Eye, Sparkles, AlertTriangle } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { useListings } from '@/hooks/useListings'
import { getSupabaseClient } from '@/lib/supabase/client'
import { CATEGORIES, CONDITION_TO_DB } from '@/lib/categories'

type Locale = 'en' | 'fr' | 'ar' | 'es' | 'de'

const MINT    = '#22d4a8'
const SURFACE = '#f4fbf8'
const INK     = '#161d1b'
const MUTED   = '#6b7a76'
const FONT    = "'Inter', system-ui, sans-serif"

const STEPS = [
  { id: 1, label: 'Category',  icon: <Tag size={16} /> },
  { id: 2, label: 'Details',   icon: <FileText size={16} /> },
  { id: 3, label: 'Photos',    icon: <Camera size={16} /> },
  { id: 4, label: 'Price',     icon: <DollarSign size={16} /> },
  { id: 5, label: 'Review',    icon: <Eye size={16} /> },
]

const CONDITIONS  = ['New', 'Like New', 'Good', 'Fair', 'For Parts']
const CITIES      = ['Rabat', 'Casablanca', 'Marrakech', 'Fès', 'Tangier', 'Agadir', 'Meknès', 'Oujda', 'Kenitra', 'Tétouan', 'Settat', 'Laâyoune']
const CURRENCIES  = ['MAD', 'EUR', 'USD', 'GBP']

export default function PostAdPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = use(params)
  const fileRef = useRef<HTMLInputElement>(null)
  const supabase = getSupabaseClient()
  const { user, loading: authLoading } = useAuth()
  const { createListing } = useListings()

  const [step, setStep]       = useState(1)
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [createdListingId, setCreatedListingId] = useState<string | null>(null)
  const [uploadingPhotos, setUploadingPhotos] = useState(false)
  const [showAllSubs, setShowAllSubs] = useState(false)

  // Step 1
  const [category, setCategory]       = useState('')
  const [subcategory, setSubcategory] = useState('')

  // Step 2
  const [title, setTitle]             = useState('')
  const [description, setDescription] = useState('')
  const [condition, setCondition]     = useState('')
  const [city, setCity]               = useState('')
  const [neighborhood, setNeighborhood] = useState('')

  // Step 3
  const [photos, setPhotos]           = useState<string[]>([])

  // Step 4
  const [price, setPrice]             = useState('')
  const [currency, setCurrency]       = useState('MAD')
  const [negotiable, setNegotiable]   = useState(false)
  const [freeItem, setFreeItem]       = useState(false)
  const [hidePrice, setHidePrice]     = useState(false)
  const [phone, setPhone]             = useState('')
  const [whatsapp, setWhatsapp]       = useState(false)

  // Prefill contact info from the signed-in seller's profile
  useEffect(() => {
    if (!user) return
    if (user.phone) setPhone(user.phone.replace(/^\+?212/, '').trim())
  }, [user?.id])

  // AI Writer
  const [aiWriterOpen, setAiWriterOpen]       = useState(false)
  const [aiWriterPrompt, setAiWriterPrompt]   = useState('')
  const [aiWriterLoading, setAiWriterLoading] = useState(false)
  const [aiWriterResult, setAiWriterResult]   = useState<{ title: string; description: string } | null>(null)

  // AI Price
  const [aiPriceOpen, setAiPriceOpen]       = useState(false)
  const [aiPriceLoading, setAiPriceLoading] = useState(false)
  const [aiPriceResult, setAiPriceResult]   = useState<{ low: number; mid: number; high: number; reasoning: string; tips: string[] } | null>(null)

  const selectedCat = CATEGORIES.find(c => c.slug === category)

  const canNext = () => {
    if (step === 1) return category !== '' && subcategory !== ''
    if (step === 2) return title.length >= 5 && city !== ''
    if (step === 3) return true
    if (step === 4) return (price !== '' || freeItem) && phone.length >= 8
    return true
  }

  const handlePhotos = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (!files.length) return
    setUploadingPhotos(true)
    setSubmitError(null)
    for (const f of files) {
      if (photos.length >= 12) break
      const formData = new FormData()
      formData.append('file', f)
      formData.append('type', 'listing')
      try {
        const res = await fetch('/api/upload', { method: 'POST', body: formData })
        const data = await res.json()
        if (data.url) setPhotos(prev => prev.length < 12 ? [...prev, data.url] : prev)
        else setSubmitError(data.error || 'Photo upload failed. You can still publish without it.')
      } catch {
        setSubmitError('Photo upload failed. You can still publish without it.')
      }
    }
    setUploadingPhotos(false)
    if (fileRef.current) fileRef.current.value = ''
  }

  const runAiWriter = async () => {
    if (!aiWriterPrompt.trim()) return
    setAiWriterLoading(true)
    setAiWriterResult(null)
    try {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-6',
          max_tokens: 1000,
          messages: [{ role: 'user', content: `You are a marketplace copywriter for SouKni Morocco. Generate a listing title and description from: "${aiWriterPrompt}". Category: ${selectedCat?.label || 'General'}. City: ${city || 'Morocco'}. Respond ONLY with JSON: {"title":"<max 80 chars>","description":"<150-300 words>"}` }]
        })
      })
      const data = await res.json()
      const text = data.content?.[0]?.text || ''
      const parsed = JSON.parse(text.replace(/```json|```/g, '').trim())
      setAiWriterResult(parsed)
    } catch {
      setAiWriterResult({ title: 'Error — please try again', description: '' })
    }
    setAiWriterLoading(false)
  }

  const runAiPrice = async () => {
    setAiPriceLoading(true)
    setAiPriceResult(null)
    try {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-6',
          max_tokens: 800,
          messages: [{ role: 'user', content: `You are a Moroccan marketplace pricing expert. Suggest prices in MAD for: "${title}" | Category: ${selectedCat?.label} | Condition: ${condition || 'Unknown'} | City: ${city || 'Morocco'}. Respond ONLY with JSON: {"low":<number>,"mid":<number>,"high":<number>,"reasoning":"<2 sentences>","tips":["<tip1>","<tip2>","<tip3>"]}` }]
        })
      })
      const data = await res.json()
      const text = data.content?.[0]?.text || ''
      const parsed = JSON.parse(text.replace(/```json|```/g, '').trim())
      setAiPriceResult(parsed)
    } catch {
      setAiPriceResult({ low: 0, mid: 0, high: 0, reasoning: 'Could not analyse — try again.', tips: [] })
    }
    setAiPriceLoading(false)
  }

  const handlePublish = async () => {
    if (!user) {
      setSubmitError('You must be signed in to post an ad.')
      return
    }
    setSubmitting(true)
    setSubmitError(null)
    try {
      const listing = await createListing({
        seller_id: user.id,
        title,
        description,
        category_slug: category,
        subcategory,
        condition: CONDITION_TO_DB[condition] || null,
        city,
        neighborhood,
        images: photos,
        price: freeItem ? 0 : Number(price || 0),
        currency,
        negotiable,
        hide_price: hidePrice,
        free_item: freeItem,
      })
      // `listings` has no phone/whatsapp columns — contact info lives on the
      // seller's profile (src/lib/supabase/schema.sql: public.profiles).
      await supabase.from('profiles').update({
        phone: phone ? `212${phone.replace(/\D/g, '')}` : null,
        whatsapp,
      }).eq('id', user.id)
      setCreatedListingId(listing?.id ?? null)
      setSubmitted(true)
    } catch (e: any) {
      setSubmitError(e?.message || 'Something went wrong publishing your ad. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const Label = ({ children }: { children: React.ReactNode }) => (
    <p style={{ fontSize: '13px', fontWeight: 700, color: INK, marginBottom: '8px', letterSpacing: '0.01em' }}>{children}</p>
  )

  const Input = ({ placeholder, value, onChange, type = 'text', maxLength }: {
    placeholder: string; value: string; onChange: (v: string) => void; type?: string; maxLength?: number
  }) => (
    <input type={type} placeholder={placeholder} value={value} maxLength={maxLength}
      onChange={e => onChange(e.target.value)}
      style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #e2eae6', fontSize: '15px', color: INK, background: SURFACE, outline: 'none', fontFamily: FONT, fontWeight: 700, boxSizing: 'border-box' }}
      onFocus={e => e.target.style.borderColor = MINT}
      onBlur={e => e.target.style.borderColor = '#e2eae6'}
    />
  )

  const Toggle = ({ on, onToggle, label }: { on: boolean; onToggle: () => void; label: string }) => (
    <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', background: SURFACE, borderRadius: '12px', border: '1.5px solid #e2eae6', cursor: 'pointer' }}>
      <span style={{ fontSize: '14px', fontWeight: 700, color: INK }}>{label}</span>
      <div onClick={onToggle} style={{ width: '44px', height: '24px', borderRadius: '12px', background: on ? MINT : '#e2eae6', position: 'relative', transition: 'background 0.2s', flexShrink: 0 }}>
        <div style={{ position: 'absolute', top: '2px', left: on ? '22px' : '2px', width: '20px', height: '20px', borderRadius: '50%', background: 'white', boxShadow: '0 1px 4px rgba(0,0,0,0.2)', transition: 'left 0.2s' }} />
      </div>
    </label>
  )

  if (submitted) return (
    <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 20px', fontFamily: FONT }}>
      <div style={{ textAlign: 'center', maxWidth: '480px' }}>
        <div style={{ width: '80px', height: '80px', background: `linear-gradient(135deg, ${MINT}, #0f9b8e)`, borderRadius: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
          <Check size={40} color="white" strokeWidth={2.5} />
        </div>
        <h1 style={{ fontSize: '32px', fontWeight: 900, color: INK, marginBottom: '12px', letterSpacing: '-0.05em' }}>Your ad is live! 🎉</h1>
        <p style={{ fontSize: '16px', color: MUTED, lineHeight: 1.6, marginBottom: '32px', fontWeight: 700 }}>
          <strong style={{ color: INK }}>{title}</strong> has been published.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '24px' }}>
          {[['Category', selectedCat?.label || category], ['City', city], ['Price', freeItem ? 'Free' : `${price} ${currency}`], ['Condition', condition || 'Not specified']].map(([l, v]) => (
            <div key={l} style={{ background: SURFACE, borderRadius: '12px', padding: '14px', textAlign: 'left' }}>
              <p style={{ fontSize: '11px', fontWeight: 700, color: MUTED, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '4px' }}>{l}</p>
              <p style={{ fontSize: '14px', fontWeight: 700, color: INK }}>{v}</p>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          {createdListingId ? (
            <Link href={`/${locale}/listing/${createdListingId}`} style={{ flex: 1, padding: '13px', borderRadius: '12px', border: '1.5px solid #e2eae6', color: INK, textDecoration: 'none', fontWeight: 700, fontSize: '14px', textAlign: 'center' }}>View My Ad</Link>
          ) : (
            <Link href={`/${locale}`} style={{ flex: 1, padding: '13px', borderRadius: '12px', border: '1.5px solid #e2eae6', color: INK, textDecoration: 'none', fontWeight: 700, fontSize: '14px', textAlign: 'center' }}>Home</Link>
          )}
          <button onClick={() => { setSubmitted(false); setCreatedListingId(null); setStep(1); setTitle(''); setDescription(''); setCategory(''); setSubcategory(''); setPhotos([]); setPrice(''); setCity(''); setNeighborhood(''); setCondition(''); setSubmitError(null) }}
            style={{ flex: 1, padding: '13px', borderRadius: '12px', background: MINT, color: 'white', border: 'none', fontWeight: 700, fontSize: '14px', cursor: 'pointer', fontFamily: FONT }}>
            Post Another
          </button>
        </div>
      </div>
    </div>
  )

  return (
    <div style={{ background: SURFACE, minHeight: '100vh', fontFamily: FONT }}>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>

      {/* HEADER */}
      <div style={{ background: 'white', borderBottom: '1px solid #e2eae6', padding: '20px 0' }}>
        <div style={{ maxWidth: '720px', margin: '0 auto', padding: '0 24px' }}>
          <Breadcrumb items={[{ label: 'Home', href: `/${locale}` }, { label: 'Post a Free Ad' }]} style={{ marginBottom: 20, textTransform: 'none', fontSize: 13, letterSpacing: 'normal' }} />
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {STEPS.map((s, i) => {
              const done = step > s.id; const active = step === s.id
              return (
                <div key={s.id} style={{ display: 'flex', alignItems: 'center', flex: i < STEPS.length - 1 ? 1 : 'none' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: done ? MINT : active ? INK : '#e2eae6', color: done || active ? 'white' : MUTED, fontWeight: 700, fontSize: '13px', flexShrink: 0 }}>
                      {done ? <Check size={16} strokeWidth={2.5} /> : s.icon}
                    </div>
                    <span style={{ fontSize: '11px', fontWeight: active ? 700 : 500, color: active ? INK : done ? MINT : MUTED, whiteSpace: 'nowrap' }}>{s.label}</span>
                  </div>
                  {i < STEPS.length - 1 && <div style={{ flex: 1, height: '2px', background: done ? MINT : '#e2eae6', margin: '0 8px', marginBottom: '22px' }} />}
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '720px', margin: '32px auto', padding: '0 24px 80px' }}>
        <div style={{ background: 'white', borderRadius: '24px', padding: '40px', boxShadow: '0 4px 24px rgba(0,0,0,0.06)', border: '1px solid #e2eae6' }}>

          {/* STEP 1 */}
          {step === 1 && (
            <div>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '16px', marginBottom: '28px', flexWrap: 'wrap' }}>
                <div>
                  <h2 style={{ fontSize: '24px', fontWeight: 900, color: INK, marginBottom: '6px', letterSpacing: '-0.05em' }}>What are you selling?</h2>
                  <p style={{ fontSize: '14px', color: MUTED, fontWeight: 700 }}>Choose the best category for your item.</p>
                </div>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  <a href={`/${locale}/sell/quick`}
                    style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 18px', borderRadius: '100px', background: INK, color: 'white', textDecoration: 'none', fontSize: '13px', fontWeight: 900, whiteSpace: 'nowrap' }}>
                    ⚡ Quick List with Photo
                  </a>
                  <a href={`/${locale}/post-ad-voice`}
                    style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 18px', borderRadius: '100px', background: 'linear-gradient(135deg, #22d4a8, #0f9b8e)', color: 'white', textDecoration: 'none', fontSize: '13px', fontWeight: 900, whiteSpace: 'nowrap', boxShadow: '0 4px 16px rgba(34,212,168,0.3)' }}>
                    🎤 Post by Voice Instead
                  </a>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginBottom: '28px' }}>
                {CATEGORIES.map(cat => (
                  <button key={cat.slug} onClick={() => { setCategory(cat.slug); setSubcategory(''); setShowAllSubs(false) }}
                    style={{ padding: '16px 12px', borderRadius: '16px', border: `2px solid ${category === cat.slug ? MINT : '#e2eae6'}`, background: category === cat.slug ? '#f0fdf9' : 'white', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', fontFamily: FONT }}>
                    <span style={{ fontSize: '28px' }}>{cat.emoji}</span>
                    <span style={{ fontSize: '11px', fontWeight: 900, color: category === cat.slug ? MINT : INK, textAlign: 'center' }}>{cat.label}</span>
                  </button>
                ))}
              </div>
              {selectedCat && (
                <div>
                  <Label>Subcategory</Label>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {(showAllSubs ? selectedCat.subs : selectedCat.subs.slice(0, 8)).map(sub => (
                      <button key={sub} onClick={() => setSubcategory(sub)}
                        style={{ padding: '8px 16px', borderRadius: '100px', border: `1.5px solid ${subcategory === sub ? MINT : '#e2eae6'}`, background: subcategory === sub ? MINT : 'white', color: subcategory === sub ? 'white' : INK, fontSize: '13px', fontWeight: 900, cursor: 'pointer', fontFamily: FONT }}>
                        {sub}
                      </button>
                    ))}
                    {selectedCat.subs.length > 8 && (
                      <button onClick={() => setShowAllSubs(!showAllSubs)}
                        style={{ padding: '8px 16px', borderRadius: '100px', border: '1.5px solid #e2eae6', background: 'transparent', color: MINT, fontSize: '13px', fontWeight: 900, cursor: 'pointer', fontFamily: FONT }}>
                        {showAllSubs ? '− Show Less' : `+ ${selectedCat.subs.length - 8} More`}
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <h2 style={{ fontSize: '24px', fontWeight: 900, color: INK, marginBottom: '6px', letterSpacing: '-0.05em' }}>Ad Details</h2>
                <p style={{ fontSize: '14px', color: MUTED, fontWeight: 700 }}>The more detail, the faster you'll sell.</p>
              </div>

              {/* Title + AI Writer */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <Label>Title *</Label>
                  <button onClick={() => { setAiWriterOpen(!aiWriterOpen); setAiWriterResult(null) }}
                    style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: '5px 12px', borderRadius: '100px', border: `1.5px solid ${MINT}`, background: aiWriterOpen ? MINT : '#f0fdf9', color: aiWriterOpen ? 'white' : MINT, fontSize: '11px', fontWeight: 900, cursor: 'pointer', fontFamily: FONT }}>
                    ✨ AI Write for me
                  </button>
                </div>
                <Input placeholder="e.g. iPhone 15 Pro Max 256GB — Mint Condition" value={title} onChange={setTitle} maxLength={80} />
                <p style={{ fontSize: '11px', color: MUTED, marginTop: '6px', fontWeight: 700 }}>{title.length}/80</p>

                {/* AI Writer Panel */}
                {aiWriterOpen && (
                  <div style={{ marginTop: '12px', padding: '18px', background: 'linear-gradient(135deg, #f0fdf9, #e6f9f3)', borderRadius: '16px', border: `1.5px solid ${MINT}` }}>
                    <p style={{ fontSize: '13px', fontWeight: 900, color: INK, marginBottom: '4px' }}>✨ AI Listing Writer</p>
                    <p style={{ fontSize: '11px', color: MUTED, fontWeight: 700, marginBottom: '12px' }}>Describe your item simply — we'll write a professional listing</p>
                    <textarea value={aiWriterPrompt} onChange={e => setAiWriterPrompt(e.target.value)}
                      placeholder="e.g. I'm selling my iPhone 15 Pro Max 256GB titanium black. Used 4 months, mint condition, battery 98%, original box included..."
                      rows={3}
                      style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1.5px solid #e2eae6', fontSize: '13px', fontFamily: FONT, fontWeight: 700, color: INK, background: 'white', outline: 'none', resize: 'none', lineHeight: 1.6, boxSizing: 'border-box', marginBottom: '10px' }}
                    />
                    {!aiWriterResult ? (
                      <button onClick={runAiWriter} disabled={aiWriterLoading || !aiWriterPrompt.trim()}
                        style={{ width: '100%', padding: '11px', borderRadius: '10px', background: aiWriterLoading || !aiWriterPrompt.trim() ? '#e2eae6' : MINT, color: aiWriterLoading || !aiWriterPrompt.trim() ? MUTED : 'white', border: 'none', fontSize: '13px', fontWeight: 900, cursor: aiWriterLoading || !aiWriterPrompt.trim() ? 'not-allowed' : 'pointer', fontFamily: FONT, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                        {aiWriterLoading ? <><span style={{ width: '14px', height: '14px', borderRadius: '50%', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: 'white', display: 'inline-block', animation: 'spin 0.8s linear infinite' }} /> Writing...</> : '✨ Generate Listing'}
                      </button>
                    ) : (
                      <div>
                        <div style={{ background: 'white', borderRadius: '10px', padding: '14px', marginBottom: '10px', border: '1px solid #e2eae6' }}>
                          <p style={{ fontSize: '10px', fontWeight: 900, color: MUTED, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '4px' }}>Title</p>
                          <p style={{ fontSize: '14px', fontWeight: 900, color: INK, marginBottom: '10px' }}>{aiWriterResult.title}</p>
                          <p style={{ fontSize: '10px', fontWeight: 900, color: MUTED, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '4px' }}>Description</p>
                          <p style={{ fontSize: '12px', color: '#3c4a46', lineHeight: 1.6, fontWeight: 600, maxHeight: '100px', overflowY: 'auto' }}>{aiWriterResult.description}</p>
                        </div>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <button onClick={() => { setTitle(aiWriterResult.title); setDescription(aiWriterResult.description); setAiWriterOpen(false); setAiWriterResult(null); setAiWriterPrompt('') }}
                            style={{ flex: 2, padding: '10px', borderRadius: '10px', background: MINT, color: 'white', border: 'none', fontSize: '13px', fontWeight: 900, cursor: 'pointer', fontFamily: FONT }}>
                            ✓ Use This
                          </button>
                          <button onClick={() => setAiWriterResult(null)}
                            style={{ flex: 1, padding: '10px', borderRadius: '10px', background: 'white', color: INK, border: '1.5px solid #e2eae6', fontSize: '13px', fontWeight: 900, cursor: 'pointer', fontFamily: FONT }}>
                            Try Again
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Description */}
              <div>
                <Label>Description</Label>
                <textarea value={description} onChange={e => setDescription(e.target.value)} rows={5} maxLength={2000}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #e2eae6', fontSize: '15px', color: INK, background: SURFACE, outline: 'none', fontFamily: FONT, fontWeight: 700, resize: 'vertical', boxSizing: 'border-box', lineHeight: 1.6 }}
                  onFocus={e => e.target.style.borderColor = MINT}
                  onBlur={e => e.target.style.borderColor = '#e2eae6'}
                />
                <p style={{ fontSize: '11px', color: MUTED, marginTop: '6px', fontWeight: 700 }}>{description.length}/2000</p>
              </div>

              {/* Condition */}
              <div>
                <Label>Condition</Label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {CONDITIONS.map(c => (
                    <button key={c} onClick={() => setCondition(c)}
                      style={{ padding: '8px 18px', borderRadius: '100px', border: `1.5px solid ${condition === c ? MINT : '#e2eae6'}`, background: condition === c ? MINT : 'white', color: condition === c ? 'white' : INK, fontSize: '13px', fontWeight: 900, cursor: 'pointer', fontFamily: FONT }}>
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              {/* City + Neighbourhood */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div>
                  <Label>City *</Label>
                  <select value={city} onChange={e => setCity(e.target.value)}
                    style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #e2eae6', fontSize: '15px', fontFamily: FONT, fontWeight: 700, color: city ? INK : MUTED, background: SURFACE, outline: 'none', cursor: 'pointer', appearance: 'none' }}
                    onFocus={e => e.target.style.borderColor = MINT}
                    onBlur={e => e.target.style.borderColor = '#e2eae6'}
                  >
                    <option value="">Select city...</option>
                    {CITIES.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <Label>Neighbourhood</Label>
                  <Input placeholder="e.g. Agdal, Maarif..." value={neighborhood} onChange={setNeighborhood} />
                </div>
              </div>
            </div>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <div>
              <h2 style={{ fontSize: '24px', fontWeight: 900, color: INK, marginBottom: '6px', letterSpacing: '-0.05em' }}>Add Photos</h2>
              <p style={{ fontSize: '14px', color: MUTED, marginBottom: '28px', fontWeight: 700 }}>Ads with photos get <strong style={{ color: INK }}>3× more views</strong>. Add up to 12.</p>
              <input ref={fileRef} type="file" accept="image/*" multiple style={{ display: 'none' }} onChange={handlePhotos} />
              <div onClick={() => photos.length < 12 && !uploadingPhotos && fileRef.current?.click()}
                style={{ border: `2px dashed ${MINT}`, borderRadius: '20px', padding: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', cursor: uploadingPhotos ? 'not-allowed' : 'pointer', background: '#f0fdf9', marginBottom: '20px', opacity: photos.length >= 12 || uploadingPhotos ? 0.5 : 1 }}>
                <div style={{ width: '56px', height: '56px', background: 'white', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Upload size={24} color={MINT} />
                </div>
                <p style={{ fontSize: '15px', fontWeight: 900, color: INK }}>{uploadingPhotos ? 'Uploading…' : photos.length === 0 ? 'Click to upload photos' : `Add more (${photos.length}/12)`}</p>
                <p style={{ fontSize: '12px', color: MUTED, fontWeight: 700 }}>JPG, PNG, WEBP — Max 10MB each</p>
              </div>
              {/* AI Photo Enhancer */}
              <div style={{ marginTop: '12px' }}>
                <p style={{ fontSize: '12px', fontWeight: 900, color: INK, marginBottom: '8px' }}>✨ Enhance with AI</p>
                <AiPhotoEnhancer onEnhanced={(url) => setPhotos(prev => [url, ...prev.slice(0, 11)])} />
              </div>

              {/* Video Upload */}
              <div style={{ marginTop: '16px' }}>
                <p style={{ fontSize: '12px', fontWeight: 900, color: INK, marginBottom: '8px' }}>🎥 Add a video (optional)</p>
                <VideoUpload />
              </div>
              {photos.length > 0 && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
                  {photos.map((src, i) => (
                    <div key={i} style={{ position: 'relative', aspectRatio: '1/1', borderRadius: '12px', overflow: 'hidden', border: `2px solid ${i === 0 ? MINT : '#e2eae6'}` }}>
                      <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      {i === 0 && <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: MINT, padding: '3px', textAlign: 'center' }}><span style={{ fontSize: '9px', fontWeight: 900, color: 'white', textTransform: 'uppercase' }}>Cover</span></div>}
                      <button onClick={() => setPhotos(prev => prev.filter((_, idx) => idx !== i))}
                        style={{ position: 'absolute', top: '6px', right: '6px', width: '24px', height: '24px', borderRadius: '50%', background: 'rgba(0,0,0,0.6)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <X size={12} color="white" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* STEP 4 */}
          {step === 4 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <h2 style={{ fontSize: '24px', fontWeight: 900, color: INK, marginBottom: '6px', letterSpacing: '-0.05em' }}>Price & Contact</h2>
                <p style={{ fontSize: '14px', color: MUTED, fontWeight: 700 }}>Set your price and how buyers reach you.</p>
              </div>

              <Toggle on={freeItem} onToggle={() => { setFreeItem(!freeItem); if (!freeItem) setPrice('') }} label="🎁  This item is FREE" />

              {!freeItem && (
                <div>
                  {/* Price label + AI button */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <Label>Price *</Label>
                    <button onClick={() => { setAiPriceOpen(!aiPriceOpen); if (!aiPriceOpen && !aiPriceResult) runAiPrice() }}
                      style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: '5px 12px', borderRadius: '100px', border: `1.5px solid ${MINT}`, background: aiPriceOpen ? MINT : '#f0fdf9', color: aiPriceOpen ? 'white' : MINT, fontSize: '11px', fontWeight: 900, cursor: 'pointer', fontFamily: FONT }}>
                      💰 AI Price Help
                    </button>
                  </div>

                  {/* AI Price Panel */}
                  {aiPriceOpen && (
                    <div style={{ padding: '18px', background: 'linear-gradient(135deg, #f0fdf9, #e6f9f3)', borderRadius: '16px', border: `1.5px solid ${MINT}`, marginBottom: '12px' }}>
                      <p style={{ fontSize: '13px', fontWeight: 900, color: INK, marginBottom: '4px' }}>💰 AI Price Suggestion</p>
                      <p style={{ fontSize: '11px', color: MUTED, fontWeight: 700, marginBottom: '14px' }}>Based on similar items sold in {city || 'Morocco'}</p>
                      {aiPriceLoading && (
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', padding: '20px', background: 'white', borderRadius: '12px' }}>
                          <span style={{ width: '18px', height: '18px', borderRadius: '50%', border: `2.5px solid rgba(34,212,168,0.3)`, borderTopColor: MINT, display: 'inline-block', animation: 'spin 0.8s linear infinite' }} />
                          <span style={{ fontSize: '13px', fontWeight: 700, color: MUTED }}>Analysing market prices...</span>
                        </div>
                      )}
                      {aiPriceResult && !aiPriceLoading && (
                        <div>
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginBottom: '14px' }}>
                            {[
                              { label: 'Quick Sale', price: aiPriceResult.low, color: '#0891b2', bg: '#e0f2fe' },
                              { label: '★ Recommended', price: aiPriceResult.mid, color: MINT, bg: '#f0fdf9' },
                              { label: 'Max Value', price: aiPriceResult.high, color: '#7c3aed', bg: '#ede9fe' },
                            ].map(tier => (
                              <button key={tier.label} onClick={() => { setPrice(tier.price.toString()); setAiPriceOpen(false) }}
                                style={{ padding: '14px 10px', borderRadius: '12px', border: `2px solid ${tier.color}30`, background: tier.bg, cursor: 'pointer', fontFamily: FONT, textAlign: 'center' }}>
                                <p style={{ fontSize: '10px', fontWeight: 900, color: tier.color, marginBottom: '4px' }}>{tier.label}</p>
                                <p style={{ fontSize: '18px', fontWeight: 900, color: INK, letterSpacing: '-0.03em' }}>{tier.price.toLocaleString()}</p>
                                <p style={{ fontSize: '10px', fontWeight: 700, color: MUTED }}>MAD · tap to use</p>
                              </button>
                            ))}
                          </div>
                          <div style={{ background: 'white', borderRadius: '10px', padding: '12px', marginBottom: '8px', border: '1px solid #e2eae6' }}>
                            <p style={{ fontSize: '12px', color: '#3c4a46', lineHeight: 1.6, fontWeight: 600, marginBottom: '8px' }}>{aiPriceResult.reasoning}</p>
                            {aiPriceResult.tips.map((tip, i) => (
                              <p key={i} style={{ fontSize: '11px', color: MUTED, fontWeight: 700, lineHeight: 1.4 }}>→ {tip}</p>
                            ))}
                          </div>
                          <button onClick={runAiPrice} style={{ width: '100%', padding: '8px', borderRadius: '10px', background: 'white', color: MINT, border: `1.5px solid ${MINT}`, fontSize: '12px', fontWeight: 900, cursor: 'pointer', fontFamily: FONT }}>
                            🔄 Refresh
                          </button>
                        </div>
                      )}
                    </div>
                  )}

                  <div style={{ display: 'flex', gap: '10px' }}>
                    <select value={currency} onChange={e => setCurrency(e.target.value)}
                      style={{ padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #e2eae6', fontSize: '15px', fontFamily: FONT, fontWeight: 900, color: INK, background: SURFACE, outline: 'none', cursor: 'pointer', flexShrink: 0 }}>
                      {CURRENCIES.map(c => <option key={c}>{c}</option>)}
                    </select>
                    <input type="number" placeholder="0" value={price} onChange={e => setPrice(e.target.value)} min="0"
                      style={{ flex: 1, padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #e2eae6', fontSize: '20px', fontWeight: 900, color: INK, background: SURFACE, outline: 'none', fontFamily: FONT }}
                      onFocus={e => e.target.style.borderColor = MINT}
                      onBlur={e => e.target.style.borderColor = '#e2eae6'}
                    />
                  </div>
                </div>
              )}

              <Toggle on={negotiable} onToggle={() => setNegotiable(!negotiable)} label="💬  Price is negotiable" />
              <Toggle on={hidePrice} onToggle={() => setHidePrice(!hidePrice)} label="🔒  Hide price (show 'Contact for price')" />

              <div style={{ height: '1px', background: '#e2eae6' }} />

              <div>
                <Label>Your Phone Number *</Label>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <div style={{ padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #e2eae6', background: SURFACE, fontSize: '14px', fontWeight: 900, color: INK, display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
                    🇲🇦 +212
                  </div>
                  <input type="tel" placeholder="6 12 34 56 78" value={phone} onChange={e => setPhone(e.target.value)}
                    style={{ flex: 1, padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #e2eae6', fontSize: '15px', fontFamily: FONT, fontWeight: 700, color: INK, background: SURFACE, outline: 'none' }}
                    onFocus={e => e.target.style.borderColor = MINT}
                    onBlur={e => e.target.style.borderColor = '#e2eae6'}
                  />
                </div>
              </div>

              <Toggle on={whatsapp} onToggle={() => setWhatsapp(!whatsapp)} label="💚  Enable WhatsApp contact" />

              <div style={{ background: 'linear-gradient(135deg, #f0fdf9, #e6f9f3)', borderRadius: '16px', padding: '18px', border: `1.5px solid ${MINT}`, display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{ width: '44px', height: '44px', background: `linear-gradient(135deg, ${MINT}, #0f9b8e)`, borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Sparkles size={20} color="white" />
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: '13px', fontWeight: 900, color: INK, marginBottom: '2px' }}>Get 10× more views with Diamond Boost</p>
                  <p style={{ fontSize: '12px', color: MUTED, fontWeight: 700 }}>Appear at the top of search results instantly</p>
                </div>
                <Link href={`/${locale}/diamond`} style={{ padding: '9px 16px', borderRadius: '10px', background: MINT, color: 'white', border: 'none', fontSize: '12px', fontWeight: 900, textDecoration: 'none' }}>
                  Upgrade
                </Link>
              </div>
            </div>
          )}

          {/* STEP 5 */}
          {step === 5 && (
            <div>
              <h2 style={{ fontSize: '24px', fontWeight: 900, color: INK, marginBottom: '6px', letterSpacing: '-0.05em' }}>Review Your Ad</h2>
              <p style={{ fontSize: '14px', color: MUTED, marginBottom: '28px', fontWeight: 700 }}>Check everything before publishing.</p>
              <div style={{ border: '1.5px solid #e2eae6', borderRadius: '20px', overflow: 'hidden', marginBottom: '20px' }}>
                <div style={{ aspectRatio: '16/9', background: photos[0] ? 'transparent' : SURFACE, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                  {photos[0] ? <img src={photos[0]} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <div style={{ textAlign: 'center', color: MUTED }}><Camera size={40} /><p style={{ marginTop: '8px', fontSize: '12px', fontWeight: 700 }}>No photo added</p></div>}
                  {photos.length > 1 && <div style={{ position: 'absolute', bottom: '12px', right: '12px', background: 'rgba(0,0,0,0.6)', color: 'white', fontSize: '11px', fontWeight: 900, padding: '4px 10px', borderRadius: '8px' }}>+{photos.length - 1} more</div>}
                </div>
                <div style={{ padding: '20px' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px', marginBottom: '10px' }}>
                    <h3 style={{ fontSize: '17px', fontWeight: 900, color: INK, lineHeight: 1.3 }}>{title || 'Your title'}</h3>
                    <p style={{ fontSize: '18px', fontWeight: 900, color: MINT, whiteSpace: 'nowrap' }}>{freeItem ? 'FREE' : price ? `${Number(price).toLocaleString()} ${currency}` : '—'}</p>
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {[selectedCat?.label, subcategory, condition, city && `📍 ${city}${neighborhood ? `, ${neighborhood}` : ''}`].filter(Boolean).map((tag, i) => (
                      <span key={i} style={{ fontSize: '11px', fontWeight: 700, padding: '3px 10px', borderRadius: '100px', background: SURFACE, color: INK, border: '1px solid #e2eae6' }}>{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
              <div style={{ background: SURFACE, borderRadius: '16px', padding: '18px', display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '16px' }}>
                {[['Category', `${selectedCat?.emoji} ${selectedCat?.label} → ${subcategory}`], ['Location', city ? `${city}${neighborhood ? `, ${neighborhood}` : ''}` : '—'], ['Condition', condition || '—'], ['Price', freeItem ? 'Free' : price ? `${Number(price).toLocaleString()} ${currency}${negotiable ? ' (negotiable)' : ''}` : '—'], ['Photos', `${photos.length} photo${photos.length !== 1 ? 's' : ''}`], ['Contact', `+212 ${phone}${whatsapp ? ' · WhatsApp ✓' : ''}`]].map(([l, v]) => (
                  <div key={l} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '10px', borderBottom: '1px solid #e2eae6' }}>
                    <span style={{ fontSize: '12px', color: MUTED, fontWeight: 700 }}>{l}</span>
                    <span style={{ fontSize: '12px', color: INK, fontWeight: 900, textAlign: 'right', maxWidth: '60%' }}>{v}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SUBMIT ERROR */}
          {submitError && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '14px 16px', borderRadius: '12px', background: '#fef2f2', border: '1.5px solid #fecaca', marginTop: '24px' }}>
              <AlertTriangle size={16} color="#ef4444" style={{ flexShrink: 0 }} />
              <span style={{ fontSize: '13px', fontWeight: 700, color: '#b91c1c' }}>{submitError}</span>
            </div>
          )}

          {/* NAV */}
          <div style={{ display: 'flex', gap: '12px', marginTop: submitError ? '16px' : '36px', paddingTop: '24px', borderTop: '1px solid #e2eae6' }}>
            {step > 1 && (
              <button onClick={() => setStep(s => s - 1)} disabled={submitting}
                style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '13px 24px', borderRadius: '12px', border: '1.5px solid #e2eae6', background: 'white', color: INK, fontSize: '14px', fontWeight: 900, cursor: submitting ? 'not-allowed' : 'pointer', fontFamily: FONT, opacity: submitting ? 0.6 : 1 }}>
                <ChevronLeft size={16} /> Back
              </button>
            )}
            <button onClick={() => { if (!canNext() || submitting) return; if (step < 5) setStep(s => s + 1); else handlePublish() }}
              disabled={!canNext() || submitting}
              style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '13px', borderRadius: '12px', border: 'none', background: !canNext() ? '#e2eae6' : submitting ? MUTED : (step === 5 ? `linear-gradient(135deg, ${MINT}, #0f9b8e)` : MINT), color: canNext() ? 'white' : MUTED, fontSize: '15px', fontWeight: 900, cursor: canNext() && !submitting ? 'pointer' : 'not-allowed', fontFamily: FONT }}>
              {submitting
                ? <><span style={{ width: '15px', height: '15px', borderRadius: '50%', border: '2px solid rgba(255,255,255,0.35)', borderTopColor: 'white', display: 'inline-block', animation: 'spin 0.8s linear infinite' }} /> Publishing...</>
                : step === 5 ? <><Sparkles size={16} /> Publish Ad Now</> : <>Continue <ChevronRight size={16} /></>}
            </button>
          </div>
        </div>

        {/* Tips */}
        <div style={{ marginTop: '16px', background: 'white', borderRadius: '16px', padding: '20px', border: '1px solid #e2eae6' }}>
          <p style={{ fontSize: '13px', fontWeight: 900, color: INK, marginBottom: '10px' }}>💡 Tips for a great ad</p>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {['Use a clear descriptive title', 'Add at least 3 high-quality photos', 'Be honest about the condition', 'Include your city for local buyers', 'Respond quickly to increase chances'].map(tip => (
              <li key={tip} style={{ fontSize: '12px', color: MUTED, display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700 }}>
                <Check size={12} color={MINT} strokeWidth={2.5} /> {tip}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
