'use client'

import { useState, use } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Flag, ChevronRight, Check, Shield, AlertTriangle, Camera, X, ArrowRight, Clock, Eye, Phone } from 'lucide-react'

type Locale = 'en' | 'fr' | 'ar' | 'es' | 'de'

const MINT    = '#22d4a8'
const CREAM   = '#f5ede0'
const SURFACE = '#f4fbf8'
const INK     = '#161d1b'
const MUTED   = '#6b7a76'
const FONT    = "'Inter', system-ui, sans-serif"

// Mock listing data — in production fetched by listingId
const MOCK_LISTINGS: Record<string, { title: string; image: string; seller: string; category: string }> = {
  '1': { title: 'iPhone 15 Pro Max 256GB — Titanium Black', image: 'https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&w=300', seller: 'Youssef Alami', category: 'Electronics' },
  '2': { title: 'MacBook Pro 14" M3 Pro 18GB/512GB', image: 'https://images.pexels.com/photos/1229861/pexels-photo-1229861.jpeg?auto=compress&w=300', seller: 'Sara Bennani', category: 'Electronics' },
  '8': { title: 'BMW M4 Competition — Carbon Pack', image: 'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&w=300', seller: 'Karim Benali', category: 'Motors' },
}

type ReportCategory = {
  key: string
  label: string
  icon: string
  desc: string
  urgent: boolean
  subReasons: string[]
}

const REPORT_CATEGORIES: ReportCategory[] = [
  {
    key: 'prohibited',
    label: 'Prohibited Item',
    icon: '🚫',
    desc: 'Item is illegal or not allowed on SouKni',
    urgent: true,
    subReasons: ['Weapons or explosives', 'Illegal drugs or substances', 'Counterfeit / fake branded goods', 'Stolen property', 'Protected wildlife or animal products', 'Other prohibited item'],
  },
  {
    key: 'fraud',
    label: 'Scam or Fraud',
    icon: '⚠️',
    desc: 'Seller is attempting to scam buyers',
    urgent: true,
    subReasons: ['Asking for advance payment', 'Fake listing photos', 'Seller disappeared after payment', 'Phishing link in messages', 'Impersonating a legitimate business', 'Other scam'],
  },
  {
    key: 'misleading',
    label: 'Misleading Information',
    icon: '❌',
    desc: 'Item description or photos are inaccurate',
    urgent: false,
    subReasons: ['Wrong price displayed', 'Item condition misrepresented', 'Wrong category', 'Item already sold but still listed', 'Stolen or copied photos', 'Other misleading content'],
  },
  {
    key: 'duplicate',
    label: 'Duplicate Listing',
    icon: '📋',
    desc: 'This listing was posted multiple times',
    urgent: false,
    subReasons: ['Same item listed twice by same seller', 'Same item listed at different prices', 'Spam listings from same seller'],
  },
  {
    key: 'inappropriate',
    label: 'Inappropriate Content',
    icon: '🔞',
    desc: 'Content is offensive, adult, or harmful',
    urgent: true,
    subReasons: ['Adult or sexual content', 'Hateful or discriminatory language', 'Violence or graphic content', 'Offensive photos', 'Other inappropriate content'],
  },
  {
    key: 'wrong_price',
    label: 'Wrong Price',
    icon: '💰',
    desc: 'Price appears incorrect or bait-and-switch',
    urgent: false,
    subReasons: ['Price in wrong currency', 'Missing decimal point error', 'Bait-and-switch pricing', 'Hidden fees not disclosed'],
  },
  {
    key: 'other',
    label: 'Other Issue',
    icon: '📝',
    desc: 'Something else is wrong with this listing',
    urgent: false,
    subReasons: ['Technical issue with listing', 'Seller is unresponsive', 'Other'],
  },
]

type Step = 'category' | 'details' | 'contact' | 'submitted'

export default function ReportPage({ params }: { params: Promise<{ locale: Locale; listingId: string }> }) {
  const { locale, listingId } = use(params)
  const router = useRouter()

  const listing = MOCK_LISTINGS[listingId] || MOCK_LISTINGS['1']

  const [step, setStep]               = useState<Step>('category')
  const [category, setCategory]       = useState<ReportCategory | null>(null)
  const [subReason, setSubReason]     = useState('')
  const [description, setDescription] = useState('')
  const [evidence, setEvidence]       = useState<string[]>([])
  const [contactEmail, setContactEmail] = useState('')
  const [wantsFollowUp, setWantsFollowUp] = useState(false)
  const [anonymous, setAnonymous]     = useState(false)
  const [reportId]                    = useState(`RPT-${Math.random().toString(36).slice(2,8).toUpperCase()}`)

  const handlePhotoUpload = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/*'
    input.multiple = true
    input.onchange = e => {
      const files = Array.from((e.target as HTMLInputElement).files || [])
      files.forEach(f => {
        const reader = new FileReader()
        reader.onload = ev => setEvidence(prev => prev.length < 4 ? [...prev, ev.target?.result as string] : prev)
        reader.readAsDataURL(f)
      })
    }
    input.click()
  }

  const canProceedToDetails = category !== null && subReason !== ''
  const canSubmit = category !== null && subReason !== ''

  const StepIndicator = () => {
    const steps = ['category', 'details', 'contact']
    const current = steps.indexOf(step)
    return (
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '28px' }}>
        {[{ label: 'Reason' }, { label: 'Details' }, { label: 'Contact' }].map((s, i, arr) => {
          const done   = i < current
          const active = i === current
          return (
            <div key={s.label} style={{ display: 'flex', alignItems: 'center', flex: i < arr.length - 1 ? 1 : 'none' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 900, background: done ? MINT : active ? '#ef4444' : '#e2eae6', color: done || active ? 'white' : MUTED, transition: 'all 0.3s' }}>
                  {done ? <Check size={14} strokeWidth={3} /> : i + 1}
                </div>
                <span style={{ fontSize: '10px', fontWeight: 900, color: active ? '#ef4444' : done ? MINT : MUTED }}>{s.label}</span>
              </div>
              {i < arr.length - 1 && (
                <div style={{ flex: 1, height: '2px', background: done ? MINT : '#e2eae6', margin: '0 8px', marginBottom: '18px', transition: 'background 0.3s' }} />
              )}
            </div>
          )
        })}
      </div>
    )
  }

  // ── SUBMITTED ─────────────────────────────────────────────────
  if (step === 'submitted') return (
    <div style={{ background: SURFACE, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 24px', fontFamily: FONT }}>
      <div style={{ maxWidth: '520px', width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ width: '80px', height: '80px', borderRadius: '24px', background: '#fee2e2', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
            <Check size={36} color="#ef4444" strokeWidth={2.5} />
          </div>
          <h1 style={{ fontSize: '26px', fontWeight: 900, color: INK, letterSpacing: '-0.05em', marginBottom: '8px' }}>Report Submitted</h1>
          <p style={{ fontSize: '14px', color: MUTED, fontWeight: 700, marginBottom: '4px' }}>Reference: <strong style={{ color: INK }}>{reportId}</strong></p>
          <p style={{ fontSize: '13px', color: MUTED, fontWeight: 700 }}>Our Trust & Safety team will review this within {category?.urgent ? '2 hours' : '24 hours'}.</p>
        </div>

        {/* What happens next */}
        <div style={{ background: 'white', borderRadius: '20px', padding: '24px', border: '1px solid #e2eae6', marginBottom: '20px' }}>
          <h3 style={{ fontSize: '14px', fontWeight: 900, color: INK, marginBottom: '16px', letterSpacing: '-0.03em' }}>What happens next</h3>
          {[
            { icon: <Eye size={15} color={MINT} />, title: 'Review', desc: 'Our team reviews your report and the listing', time: category?.urgent ? 'Within 2 hours' : 'Within 24 hours' },
            { icon: <Shield size={15} color={MINT} />, title: 'Action', desc: 'If the report is valid, the listing will be removed or the seller warned', time: 'After review' },
            { icon: <Phone size={15} color={MINT} />, title: 'Update', desc: wantsFollowUp ? `We'll email you at ${contactEmail}` : 'No follow-up requested', time: 'After action' },
          ].map(step => (
            <div key={step.title} style={{ display: 'flex', gap: '12px', marginBottom: '14px', paddingBottom: '14px', borderBottom: '1px solid #f4fbf8' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: SURFACE, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                {step.icon}
              </div>
              <div>
                <p style={{ fontSize: '13px', fontWeight: 900, color: INK, marginBottom: '2px' }}>{step.title}</p>
                <p style={{ fontSize: '12px', color: MUTED, fontWeight: 700, marginBottom: '2px' }}>{step.desc}</p>
                <p style={{ fontSize: '11px', color: MINT, fontWeight: 900 }}>{step.time}</p>
              </div>
            </div>
          ))}

          {/* Report summary */}
          <div style={{ background: SURFACE, borderRadius: '12px', padding: '14px' }}>
            <p style={{ fontSize: '11px', fontWeight: 900, color: MUTED, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '8px' }}>Your Report</p>
            <p style={{ fontSize: '13px', fontWeight: 900, color: INK, marginBottom: '2px' }}>{category?.icon} {category?.label}</p>
            <p style={{ fontSize: '12px', color: MUTED, fontWeight: 700, marginBottom: '2px' }}>{subReason}</p>
            {description && <p style={{ fontSize: '12px', color: MUTED, fontWeight: 700, fontStyle: 'italic' }}>"{description.slice(0, 80)}{description.length > 80 ? '...' : ''}"</p>}
          </div>
        </div>

        {/* Safety tips */}
        <div style={{ background: CREAM, borderRadius: '16px', padding: '16px', border: '1px solid #e8d5c0', marginBottom: '20px', display: 'flex', gap: '10px' }}>
          <AlertTriangle size={15} color="#b45309" style={{ flexShrink: 0, marginTop: '1px' }} />
          <div>
            <p style={{ fontSize: '12px', fontWeight: 900, color: '#b45309', marginBottom: '4px' }}>While we review your report</p>
            <p style={{ fontSize: '12px', color: '#6b4c2a', fontWeight: 700, lineHeight: 1.5 }}>
              Do not send any money or personal information to this seller. If you're in danger, contact local authorities immediately.
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <Link href={`/${locale}`}
            style={{ flex: 1, padding: '13px', borderRadius: '12px', border: '1.5px solid #e2eae6', color: INK, textDecoration: 'none', fontSize: '14px', fontWeight: 900, textAlign: 'center' }}>
            Back to Home
          </Link>
          <Link href={`/${locale}/safety`}
            style={{ flex: 1, padding: '13px', borderRadius: '12px', background: MINT, color: 'white', textDecoration: 'none', fontSize: '14px', fontWeight: 900, textAlign: 'center' }}>
            Safety Tips
          </Link>
        </div>
      </div>
    </div>
  )

  return (
    <div style={{ background: SURFACE, minHeight: '100vh', fontFamily: FONT }}>
      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '32px 24px 80px' }}>

        {/* Breadcrumb */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '24px' }}>
          <Link href={`/${locale}`} style={{ fontSize: '13px', color: MUTED, textDecoration: 'none', fontWeight: 700 }}>Home</Link>
          <ChevronRight size={13} color={MUTED} />
          <Link href={`/${locale}/listing/${listingId}`} style={{ fontSize: '13px', color: MUTED, textDecoration: 'none', fontWeight: 700 }}>Listing</Link>
          <ChevronRight size={13} color={MUTED} />
          <span style={{ fontSize: '13px', fontWeight: 900, color: '#ef4444' }}>Report</span>
        </nav>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '28px' }}>
          <div style={{ width: '44px', height: '44px', borderRadius: '13px', background: '#fee2e2', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Flag size={20} color="#ef4444" />
          </div>
          <div>
            <h1 style={{ fontSize: '22px', fontWeight: 900, color: INK, letterSpacing: '-0.05em', marginBottom: '2px' }}>Report Listing</h1>
            <p style={{ fontSize: '12px', color: MUTED, fontWeight: 700 }}>Help keep SouKni safe for everyone</p>
          </div>
        </div>

        {/* Listing being reported */}
        <div style={{ display: 'flex', gap: '12px', padding: '14px', background: 'white', borderRadius: '14px', border: '1px solid #e2eae6', marginBottom: '24px' }}>
          <img src={listing.image} alt="" style={{ width: '52px', height: '52px', borderRadius: '10px', objectFit: 'cover', flexShrink: 0 }} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ fontSize: '11px', color: MUTED, fontWeight: 700, marginBottom: '2px' }}>{listing.category} · by {listing.seller}</p>
            <p style={{ fontSize: '13px', fontWeight: 900, color: INK, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{listing.title}</p>
          </div>
        </div>

        <div style={{ background: 'white', borderRadius: '24px', padding: '32px', border: '1px solid #e2eae6', boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
          <StepIndicator />

          {/* ── STEP 1: CATEGORY ── */}
          {step === 'category' && (
            <div>
              <h2 style={{ fontSize: '18px', fontWeight: 900, color: INK, letterSpacing: '-0.05em', marginBottom: '6px' }}>What's the issue?</h2>
              <p style={{ fontSize: '13px', color: MUTED, fontWeight: 700, marginBottom: '20px' }}>Select the main reason for your report.</p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
                {REPORT_CATEGORIES.map(cat => (
                  <button key={cat.key} onClick={() => { setCategory(cat); setSubReason('') }}
                    style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 16px', borderRadius: '14px', border: `1.5px solid ${category?.key === cat.key ? '#ef4444' : '#e2eae6'}`, background: category?.key === cat.key ? '#fff5f5' : 'white', cursor: 'pointer', fontFamily: FONT, textAlign: 'left', transition: 'all 0.15s', position: 'relative' }}>
                    <span style={{ fontSize: '22px', flexShrink: 0 }}>{cat.icon}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
                        <p style={{ fontSize: '14px', fontWeight: 900, color: INK }}>{cat.label}</p>
                        {cat.urgent && (
                          <span style={{ fontSize: '9px', fontWeight: 900, padding: '2px 7px', borderRadius: '100px', background: '#fee2e2', color: '#ef4444', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                            Urgent
                          </span>
                        )}
                      </div>
                      <p style={{ fontSize: '12px', color: MUTED, fontWeight: 700 }}>{cat.desc}</p>
                    </div>
                    {category?.key === cat.key && (
                      <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <Check size={12} color="white" strokeWidth={3} />
                      </div>
                    )}
                  </button>
                ))}
              </div>

              {/* Sub-reason */}
              {category && (
                <div style={{ marginTop: '4px', padding: '16px', background: SURFACE, borderRadius: '14px', border: '1px solid #e2eae6' }}>
                  <p style={{ fontSize: '12px', fontWeight: 900, color: INK, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '12px' }}>
                    Be more specific
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {category.subReasons.map(reason => (
                      <button key={reason} onClick={() => setSubReason(reason)}
                        style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 14px', borderRadius: '10px', border: `1.5px solid ${subReason === reason ? '#ef4444' : '#e2eae6'}`, background: subReason === reason ? '#fff5f5' : 'white', cursor: 'pointer', fontFamily: FONT, textAlign: 'left', fontSize: '13px', fontWeight: 700, color: subReason === reason ? '#ef4444' : INK, transition: 'all 0.15s' }}>
                        <div style={{ width: '16px', height: '16px', borderRadius: '50%', border: `2px solid ${subReason === reason ? '#ef4444' : '#e2eae6'}`, background: subReason === reason ? '#ef4444' : 'white', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.15s' }}>
                          {subReason === reason && <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'white' }} />}
                        </div>
                        {reason}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ── STEP 2: DETAILS ── */}
          {step === 'details' && (
            <div>
              <h2 style={{ fontSize: '18px', fontWeight: 900, color: INK, letterSpacing: '-0.05em', marginBottom: '6px' }}>Add Details</h2>
              <p style={{ fontSize: '13px', color: MUTED, fontWeight: 700, marginBottom: '20px' }}>More information helps us act faster and more accurately.</p>

              {/* Selected reason recap */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 14px', background: '#fff5f5', borderRadius: '12px', border: '1px solid #fecaca', marginBottom: '20px' }}>
                <span style={{ fontSize: '18px' }}>{category?.icon}</span>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: '12px', fontWeight: 900, color: '#ef4444' }}>{category?.label}</p>
                  <p style={{ fontSize: '12px', color: MUTED, fontWeight: 700 }}>{subReason}</p>
                </div>
                <button onClick={() => setStep('category')} style={{ fontSize: '11px', fontWeight: 900, color: MINT, background: 'none', border: 'none', cursor: 'pointer', fontFamily: FONT }}>
                  Change
                </button>
              </div>

              {/* Description */}
              <div style={{ marginBottom: '20px' }}>
                <label style={{ fontSize: '11px', fontWeight: 900, color: INK, textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', marginBottom: '8px' }}>
                  Describe the issue <span style={{ color: MUTED, fontWeight: 700, textTransform: 'none', letterSpacing: 0 }}>(optional but helpful)</span>
                </label>
                <textarea
                  value={description} onChange={e => setDescription(e.target.value)}
                  placeholder={category?.key === 'fraud' ? 'e.g. The seller asked me to pay via bank transfer before seeing the item, then stopped responding...' : category?.key === 'misleading' ? 'e.g. The listing says the item is new but photos show visible wear and scratches...' : 'Describe what you observed...'}
                  rows={5} maxLength={1000}
                  style={{ width: '100%', padding: '14px 16px', borderRadius: '12px', border: '1.5px solid #e2eae6', fontSize: '14px', fontFamily: FONT, fontWeight: 700, color: INK, background: SURFACE, outline: 'none', resize: 'none', lineHeight: 1.6, boxSizing: 'border-box', transition: 'border-color 0.2s' }}
                  onFocus={e => e.target.style.borderColor = '#ef4444'}
                  onBlur={e => e.target.style.borderColor = '#e2eae6'}
                />
                <p style={{ fontSize: '11px', color: MUTED, marginTop: '4px', textAlign: 'right', fontWeight: 700 }}>{description.length}/1000</p>
              </div>

              {/* Evidence upload */}
              <div style={{ marginBottom: '20px' }}>
                <label style={{ fontSize: '11px', fontWeight: 900, color: INK, textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', marginBottom: '8px' }}>
                  Evidence / Screenshots <span style={{ color: MUTED, fontWeight: 700, textTransform: 'none', letterSpacing: 0 }}>(optional — max 4)</span>
                </label>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  {evidence.map((src, i) => (
                    <div key={i} style={{ position: 'relative', width: '80px', height: '80px', borderRadius: '10px', overflow: 'hidden', border: '1px solid #e2eae6' }}>
                      <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      <button onClick={() => setEvidence(prev => prev.filter((_, idx) => idx !== i))}
                        style={{ position: 'absolute', top: '4px', right: '4px', width: '20px', height: '20px', borderRadius: '50%', background: 'rgba(0,0,0,0.6)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <X size={11} color="white" />
                      </button>
                    </div>
                  ))}
                  {evidence.length < 4 && (
                    <button onClick={handlePhotoUpload}
                      style={{ width: '80px', height: '80px', borderRadius: '10px', border: '2px dashed #e2eae6', background: SURFACE, cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '4px', fontFamily: FONT, transition: 'border-color 0.2s' }}
                      onMouseEnter={e => e.currentTarget.style.borderColor = '#ef4444'}
                      onMouseLeave={e => e.currentTarget.style.borderColor = '#e2eae6'}
                    >
                      <Camera size={20} color={MUTED} />
                      <span style={{ fontSize: '9px', fontWeight: 900, color: MUTED }}>Add</span>
                    </button>
                  )}
                </div>
                <p style={{ fontSize: '11px', color: MUTED, fontWeight: 700, marginTop: '6px' }}>Screenshots of suspicious messages or misleading photos are very helpful</p>
              </div>

              {/* Urgent notice */}
              {category?.urgent && (
                <div style={{ padding: '14px', background: '#fff5f5', borderRadius: '12px', border: '1px solid #fecaca', display: 'flex', gap: '10px', marginBottom: '8px' }}>
                  <AlertTriangle size={15} color="#ef4444" style={{ flexShrink: 0, marginTop: '1px' }} />
                  <p style={{ fontSize: '12px', color: '#ef4444', fontWeight: 700, lineHeight: 1.5 }}>
                    This is marked as <strong>urgent</strong>. Our team will review within 2 hours. Do not send any payment or personal data to this seller while we investigate.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* ── STEP 3: CONTACT ── */}
          {step === 'contact' && (
            <div>
              <h2 style={{ fontSize: '18px', fontWeight: 900, color: INK, letterSpacing: '-0.05em', marginBottom: '6px' }}>Contact & Privacy</h2>
              <p style={{ fontSize: '13px', color: MUTED, fontWeight: 700, marginBottom: '20px' }}>Optionally provide your contact info for follow-up.</p>

              {/* Anonymous toggle */}
              <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', background: SURFACE, borderRadius: '12px', border: '1px solid #e2eae6', cursor: 'pointer', marginBottom: '16px' }}>
                <div>
                  <p style={{ fontSize: '13px', fontWeight: 900, color: INK }}>Submit anonymously</p>
                  <p style={{ fontSize: '11px', color: MUTED, fontWeight: 700 }}>The reported seller will never know who reported them</p>
                </div>
                <div onClick={() => setAnonymous(!anonymous)}
                  style={{ width: '44px', height: '24px', borderRadius: '12px', background: anonymous ? MINT : '#e2eae6', position: 'relative', flexShrink: 0, cursor: 'pointer', transition: 'background 0.2s' }}>
                  <div style={{ position: 'absolute', top: '2px', left: anonymous ? '22px' : '2px', width: '20px', height: '20px', borderRadius: '50%', background: 'white', transition: 'left 0.2s', boxShadow: '0 1px 4px rgba(0,0,0,0.2)' }} />
                </div>
              </label>

              {/* Follow-up toggle */}
              <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', background: SURFACE, borderRadius: '12px', border: '1px solid #e2eae6', cursor: 'pointer', marginBottom: wantsFollowUp ? '12px' : '20px' }}>
                <div>
                  <p style={{ fontSize: '13px', fontWeight: 900, color: INK }}>Notify me of the outcome</p>
                  <p style={{ fontSize: '11px', color: MUTED, fontWeight: 700 }}>We'll email you when action is taken</p>
                </div>
                <div onClick={() => setWantsFollowUp(!wantsFollowUp)}
                  style={{ width: '44px', height: '24px', borderRadius: '12px', background: wantsFollowUp ? MINT : '#e2eae6', position: 'relative', flexShrink: 0, cursor: 'pointer', transition: 'background 0.2s' }}>
                  <div style={{ position: 'absolute', top: '2px', left: wantsFollowUp ? '22px' : '2px', width: '20px', height: '20px', borderRadius: '50%', background: 'white', transition: 'left 0.2s', boxShadow: '0 1px 4px rgba(0,0,0,0.2)' }} />
                </div>
              </label>

              {wantsFollowUp && (
                <div style={{ marginBottom: '20px' }}>
                  <label style={{ fontSize: '11px', fontWeight: 900, color: INK, textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', marginBottom: '8px' }}>Your Email</label>
                  <input value={contactEmail} onChange={e => setContactEmail(e.target.value)} type="email" placeholder="your@email.com"
                    style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #e2eae6', fontSize: '14px', fontFamily: FONT, fontWeight: 700, color: INK, background: SURFACE, outline: 'none', boxSizing: 'border-box', transition: 'border-color 0.2s' }}
                    onFocus={e => e.target.style.borderColor = MINT}
                    onBlur={e => e.target.style.borderColor = '#e2eae6'}
                  />
                </div>
              )}

              {/* Full report summary */}
              <div style={{ background: SURFACE, borderRadius: '14px', padding: '16px', marginBottom: '16px', border: '1px solid #e2eae6' }}>
                <p style={{ fontSize: '11px', fontWeight: 900, color: MUTED, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '12px' }}>Report Summary</p>
                {[
                  ['Listing', listing.title.slice(0, 40) + '...'],
                  ['Category', `${category?.icon} ${category?.label}`],
                  ['Reason', subReason],
                  ['Evidence', evidence.length > 0 ? `${evidence.length} file(s) attached` : 'None'],
                  ['Anonymous', anonymous ? 'Yes' : 'No'],
                  ['Follow-up', wantsFollowUp && contactEmail ? contactEmail : 'No'],
                  ['Priority', category?.urgent ? '🔴 Urgent (2h review)' : '🟡 Standard (24h review)'],
                ].map(([label, value]) => (
                  <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '6px 0', borderBottom: '1px solid #e2eae6' }}>
                    <span style={{ fontSize: '11px', color: MUTED, fontWeight: 700, flexShrink: 0, marginRight: '12px' }}>{label}</span>
                    <span style={{ fontSize: '11px', fontWeight: 900, color: INK, textAlign: 'right' }}>{value}</span>
                  </div>
                ))}
              </div>

              {/* Privacy note */}
              <div style={{ padding: '12px 14px', background: '#f0fdf9', borderRadius: '10px', border: `1px solid ${MINT}`, display: 'flex', gap: '8px' }}>
                <Shield size={13} color={MINT} style={{ flexShrink: 0, marginTop: '1px' }} />
                <p style={{ fontSize: '11px', color: '#0f9b8e', fontWeight: 700, lineHeight: 1.5 }}>
                  Your identity is protected. The reported seller will never know you filed this report, even if they're not removed.
                </p>
              </div>
            </div>
          )}

          {/* ── NAV BUTTONS ── */}
          <div style={{ display: 'flex', gap: '10px', marginTop: '28px', paddingTop: '20px', borderTop: '1px solid #e2eae6' }}>
            {step !== 'category' && (
              <button onClick={() => setStep(step === 'contact' ? 'details' : 'category')}
                style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '12px 20px', borderRadius: '12px', border: '1.5px solid #e2eae6', background: 'white', color: INK, fontSize: '14px', fontWeight: 900, cursor: 'pointer', fontFamily: FONT }}>
                ← Back
              </button>
            )}

            {step === 'category' && (
              <button onClick={() => canProceedToDetails && setStep('details')}
                style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '13px', borderRadius: '12px', background: canProceedToDetails ? '#ef4444' : '#e2eae6', color: canProceedToDetails ? 'white' : MUTED, border: 'none', fontSize: '14px', fontWeight: 900, cursor: canProceedToDetails ? 'pointer' : 'not-allowed', fontFamily: FONT, transition: 'all 0.2s' }}>
                Continue <ArrowRight size={15} />
              </button>
            )}

            {step === 'details' && (
              <button onClick={() => setStep('contact')}
                style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '13px', borderRadius: '12px', background: '#ef4444', color: 'white', border: 'none', fontSize: '14px', fontWeight: 900, cursor: 'pointer', fontFamily: FONT }}>
                Continue <ArrowRight size={15} />
              </button>
            )}

            {step === 'contact' && (
              <button onClick={() => setStep('submitted')}
                style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '13px', borderRadius: '12px', background: '#ef4444', color: 'white', border: 'none', fontSize: '15px', fontWeight: 900, cursor: 'pointer', fontFamily: FONT, boxShadow: '0 4px 16px rgba(239,68,68,0.3)' }}>
                <Flag size={16} /> Submit Report
              </button>
            )}
          </div>
        </div>

        {/* Footer note */}
        <p style={{ textAlign: 'center', fontSize: '12px', color: MUTED, fontWeight: 700, marginTop: '20px', lineHeight: 1.6 }}>
          False reports may result in account restrictions.{' '}
          <Link href={`/${locale}/terms`} style={{ color: MINT, textDecoration: 'none' }}>Terms of Service</Link>
        </p>
      </div>
    </div>
  )
}
