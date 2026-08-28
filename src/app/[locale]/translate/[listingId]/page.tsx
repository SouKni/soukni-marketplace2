'use client'

import { useState, use, useEffect } from 'react'
import Link from 'next/link'
import { ChevronRight, Check, Globe, Sparkles, Copy, X } from 'lucide-react'
import { getSupabaseClient } from '@/lib/supabase/client'

type Locale = 'en' | 'fr' | 'ar' | 'es' | 'de'
type Lang = 'ar' | 'fr' | 'en' | 'es' | 'nl' | 'tzm'

const MINT    = '#22d4a8'
const SURFACE = '#f4fbf8'
const INK     = '#161d1b'
const MUTED   = '#6b7a76'
const FONT    = "'Inter', system-ui, sans-serif"

const LANGUAGES: { code: Lang; label: string; flag: string; rtl?: boolean }[] = [
  { code: 'ar',  label: 'العربية',   flag: '🇲🇦', rtl: true },
  { code: 'fr',  label: 'Français',  flag: '🇫🇷' },
  { code: 'en',  label: 'English',   flag: '🇬🇧' },
  { code: 'es',  label: 'Español',   flag: '🇪🇸' },
  { code: 'nl',  label: 'Nederlands', flag: '🇳🇱' },
  { code: 'tzm', label: 'Tamazight', flag: '🏔️' },
]

type DbListing = { id: string; title: string; description: string | null; price: number; currency: string; images: string[]; category_slug: string | null }

function categoryLabel(slug: string | null) {
  if (!slug) return 'Listing'
  return slug.split('-').map(w => w[0]?.toUpperCase() + w.slice(1)).join(' ')
}

export default function TranslatePage({ params }: { params: Promise<{ locale: Locale; listingId: string }> }) {
  const { locale, listingId } = use(params)
  const supabase = getSupabaseClient()

  const [listing, setListing] = useState<DbListing | null | undefined>(undefined) // undefined = loading, null = not found
  const [targetLang, setTargetLang]     = useState<Lang>('ar')
  const [loading, setLoading]           = useState(false)
  const [result, setResult]             = useState<{ title: string; description: string } | null>(null)
  const [error, setError]               = useState<string | null>(null)
  const [copied, setCopied]             = useState<'title' | 'desc' | null>(null)

  useEffect(() => {
    let cancelled = false
    supabase.from('listings').select('id, title, description, price, currency, images, category_slug').eq('id', listingId).maybeSingle()
      .then(({ data }) => { if (!cancelled) setListing(data ?? null) })
    return () => { cancelled = true }
  }, [listingId])

  const langLabel = LANGUAGES.find(l => l.code === targetLang)
  const isRTL     = langLabel?.rtl

  const translate = async () => {
    if (!listing) return
    setLoading(true)
    setResult(null)
    setError(null)
    try {
      const res = await fetch('/api/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: listing.title, description: listing.description || '', targetLang }),
      })
      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        setError(body.error || 'Translation is temporarily unavailable')
      } else {
        setResult(await res.json())
      }
    } catch {
      setError('Translation is temporarily unavailable — check your connection and try again')
    }
    setLoading(false)
  }

  const handleCopy = (type: 'title' | 'desc') => {
    const text = type === 'title' ? result?.title : result?.description
    navigator.clipboard?.writeText(text || '')
    setCopied(type)
    setTimeout(() => setCopied(null), 2000)
  }

  if (listing === undefined) {
    return (
      <div style={{ background: SURFACE, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FONT }}>
        <p style={{ fontSize: '13px', fontWeight: 700, color: MUTED }}>Loading…</p>
      </div>
    )
  }

  if (listing === null) {
    return (
      <div style={{ background: SURFACE, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FONT, flexDirection: 'column', gap: '12px', padding: '24px', textAlign: 'center' }}>
        <p style={{ fontSize: '16px', fontWeight: 900, color: INK }}>Listing not found</p>
        <Link href={`/${locale}`} style={{ fontSize: '13px', fontWeight: 900, color: MINT, textDecoration: 'none' }}>Back to SouKni</Link>
      </div>
    )
  }

  return (
    <div style={{ background: SURFACE, minHeight: '100vh', fontFamily: FONT }}>
      <div style={{ maxWidth: '860px', margin: '0 auto', padding: '32px 24px 80px' }}>

        {/* Breadcrumb */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '24px' }}>
          <Link href={`/${locale}/listing/${listingId}`} style={{ fontSize: '13px', color: MUTED, textDecoration: 'none', fontWeight: 700 }}>Listing</Link>
          <ChevronRight size={13} color={MUTED} />
          <span style={{ fontSize: '13px', fontWeight: 900, color: INK }}>AI Translate</span>
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '28px' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: `linear-gradient(135deg, ${MINT}, #0f9b8e)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Globe size={22} color="white" />
          </div>
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: 900, color: INK, letterSpacing: '-0.05em', marginBottom: '2px' }}>AI Multilingual Translation</h1>
            <p style={{ fontSize: '13px', color: MUTED, fontWeight: 700 }}>Reach more buyers by translating your listing</p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', alignItems: 'start' }}>

          {/* Original listing */}
          <div style={{ background: 'white', borderRadius: '20px', padding: '24px', border: '1px solid #e2eae6' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <span style={{ fontSize: '16px' }}>🇬🇧</span>
              <p style={{ fontSize: '13px', fontWeight: 900, color: MUTED, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Original</p>
            </div>
            <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
              {listing.images?.[0] && <img src={listing.images[0]} alt="" style={{ width: '52px', height: '52px', borderRadius: '10px', objectFit: 'cover', flexShrink: 0 }} />}
              <div>
                <p style={{ fontSize: '12px', color: MUTED, fontWeight: 700, marginBottom: '2px' }}>{categoryLabel(listing.category_slug)}</p>
                <p style={{ fontSize: '12px', fontWeight: 900, color: MINT }}>{Math.round(listing.price / 100).toLocaleString()} {listing.currency}</p>
              </div>
            </div>
            <p style={{ fontSize: '14px', fontWeight: 900, color: INK, marginBottom: '10px', lineHeight: 1.3 }}>{listing.title}</p>
            <p style={{ fontSize: '12px', color: MUTED, lineHeight: 1.7, fontWeight: 600, maxHeight: '160px', overflowY: 'auto', whiteSpace: 'pre-line' }}>{listing.description || 'No description provided.'}</p>
          </div>

          {/* Translation panel */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {/* Language selector */}
            <div style={{ background: 'white', borderRadius: '20px', padding: '20px', border: '1px solid #e2eae6' }}>
              <p style={{ fontSize: '12px', fontWeight: 900, color: INK, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '12px' }}>Translate to</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', marginBottom: '16px' }}>
                {LANGUAGES.map(l => (
                  <button key={l.code} onClick={() => { setTargetLang(l.code); setResult(null); setError(null) }}
                    style={{ padding: '10px 8px', borderRadius: '10px', border: `1.5px solid ${targetLang === l.code ? MINT : '#e2eae6'}`, background: targetLang === l.code ? '#f0fdf9' : 'white', cursor: 'pointer', fontFamily: FONT, textAlign: 'center', transition: 'all 0.15s' }}>
                    <p style={{ fontSize: '18px', marginBottom: '3px' }}>{l.flag}</p>
                    <p style={{ fontSize: '11px', fontWeight: 900, color: targetLang === l.code ? MINT : INK }}>{l.label}</p>
                  </button>
                ))}
              </div>
              <button onClick={translate} disabled={loading}
                style={{ width: '100%', padding: '13px', borderRadius: '12px', background: loading ? '#e2eae6' : `linear-gradient(135deg, ${MINT}, #0f9b8e)`, color: loading ? MUTED : 'white', border: 'none', fontSize: '14px', fontWeight: 900, cursor: loading ? 'not-allowed' : 'pointer', fontFamily: FONT, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', boxShadow: loading ? 'none' : `0 4px 16px rgba(34,212,168,0.3)` }}>
                {loading
                  ? <><span style={{ width: '14px', height: '14px', borderRadius: '50%', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: 'white', display: 'inline-block', animation: 'spin 0.8s linear infinite' }} /> Translating...</>
                  : <><Sparkles size={15} /> Translate to {langLabel?.label}</>
                }
              </button>
            </div>

            {error && (
              <div style={{ background: '#fee2e2', borderRadius: '14px', padding: '16px 20px', border: '1px solid #fecaca' }}>
                <p style={{ fontSize: '13px', color: '#dc2626', fontWeight: 700 }}>{error}</p>
              </div>
            )}

            {/* Translation result */}
            {result && (
              <div style={{ background: 'white', borderRadius: '20px', padding: '20px', border: `1.5px solid ${MINT}` }} dir={isRTL ? 'rtl' : 'ltr'}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                  <span style={{ fontSize: '16px' }}>{langLabel?.flag}</span>
                  <p style={{ fontSize: '13px', fontWeight: 900, color: MINT, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{langLabel?.label}</p>
                  <Check size={14} color={MINT} style={{ marginLeft: 'auto' }} />
                </div>

                {/* Translated title */}
                <div style={{ marginBottom: '14px', padding: '12px', background: SURFACE, borderRadius: '10px', position: 'relative' }}>
                  <p style={{ fontSize: '10px', fontWeight: 900, color: MUTED, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '6px' }}>Title</p>
                  <p style={{ fontSize: '14px', fontWeight: 900, color: INK, lineHeight: 1.4 }}>{result.title}</p>
                  <button onClick={() => handleCopy('title')}
                    style={{ position: 'absolute', top: '8px', right: isRTL ? 'auto' : '8px', left: isRTL ? '8px' : 'auto', width: '26px', height: '26px', borderRadius: '7px', background: copied === 'title' ? '#e6f9f3' : 'white', border: `1px solid ${copied === 'title' ? MINT : '#e2eae6'}`, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {copied === 'title' ? <Check size={11} color={MINT} /> : <Copy size={11} color={MUTED} />}
                  </button>
                </div>

                {/* Translated description */}
                <div style={{ padding: '12px', background: SURFACE, borderRadius: '10px', position: 'relative' }}>
                  <p style={{ fontSize: '10px', fontWeight: 900, color: MUTED, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '6px' }}>Description</p>
                  <p style={{ fontSize: '12px', color: '#3c4a46', lineHeight: 1.8, fontWeight: 600, maxHeight: '140px', overflowY: 'auto', whiteSpace: 'pre-line' }}>{result.description}</p>
                  <button onClick={() => handleCopy('desc')}
                    style={{ position: 'absolute', top: '8px', right: isRTL ? 'auto' : '8px', left: isRTL ? '8px' : 'auto', width: '26px', height: '26px', borderRadius: '7px', background: copied === 'desc' ? '#e6f9f3' : 'white', border: `1px solid ${copied === 'desc' ? MINT : '#e2eae6'}`, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {copied === 'desc' ? <Check size={11} color={MINT} /> : <Copy size={11} color={MUTED} />}
                  </button>
                </div>

                <p style={{ fontSize: '11px', color: MUTED, fontWeight: 700, marginTop: '10px', textAlign: 'center' }}>
                  AI-translated · Copy and paste into your listing
                </p>
              </div>
            )}
          </div>
        </div>

        <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      </div>
    </div>
  )
}
