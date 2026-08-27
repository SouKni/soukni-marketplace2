'use client'

import { useState, use } from 'react'
import Link from 'next/link'
import { Check, Shield, Star, Zap, ChevronRight, Upload, Phone, Mail, CreditCard, ArrowRight, X, Camera, Building2, FileCheck, Lock, Users, TrendingUp, Award } from 'lucide-react'
import Breadcrumb from '@/components/ui/Breadcrumb'

type Locale = 'en' | 'fr' | 'ar' | 'es' | 'de'
type Step = 'landing' | 'choose-plan' | 'verify-phone' | 'verify-id' | 'verify-business' | 'payment' | 'success'
type Plan = 'diamond' | 'pro' | null

const PLANS = [
  {
    key: 'diamond' as Plan,
    name: 'Diamond',
    badge: '💎',
    price: 299,
    period: 'month',
    tagline: 'For individual sellers who want to stand out',
    color: '#22d4a8',
    dark: '#0f9b8e',
    features: [
      'Diamond verified badge on all listings',
      'Priority placement in search results',
      'Unlimited highlighted ads',
      'Phone & CIN identity verification',
      'Buyer trust score displayed',
      'Advanced listing analytics',
      'WhatsApp quick-contact button',
      'Cancel anytime',
    ],
    verificationSteps: ['Phone OTP', 'National ID (CIN)', 'Selfie check'],
    reviewTime: 'Instant — automated',
  },
  {
    key: 'pro' as Plan,
    name: 'Pro Business',
    badge: '🏢',
    price: 799,
    period: 'month',
    tagline: 'For agencies, dealers & established businesses',
    color: '#161d1b',
    dark: '#2b3230',
    features: [
      'Everything in Diamond',
      'Pro Business badge on all listings',
      'Business registration verification (RC)',
      'Tax ID verification (IF number)',
      'Business address verification',
      'Dedicated account manager',
      'Team member seats (up to 5)',
      'Bulk listing import tools',
      'Monthly performance reports',
    ],
    verificationSteps: ['Phone OTP', 'National ID (CIN)', 'Business docs (RC + IF)'],
    reviewTime: '24–48 hours manual review',
  },
]

const TRUST_STATS = [
  { value: '94%', label: 'of buyers prefer Diamond sellers', icon: <Star size={18} color="#22d4a8" /> },
  { value: '5×', label: 'more views on Diamond listings', icon: <TrendingUp size={18} color="#22d4a8" /> },
  { value: '3×', label: 'faster time to sell', icon: <Zap size={18} color="#22d4a8" /> },
  { value: '12K+', label: 'verified Diamond sellers', icon: <Users size={18} color="#22d4a8" /> },
]

export default function DiamondPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = use(params)
  const [step, setStep] = useState<Step>('landing')
  const [plan, setPlan] = useState<Plan>(null)

  // Phone verification
  const [phone, setPhone] = useState('')
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [otpSent, setOtpSent] = useState(false)
  const [otpVerified, setOtpVerified] = useState(false)

  // ID verification
  const [cinFront, setCinFront] = useState<string | null>(null)
  const [cinBack, setCinBack] = useState<string | null>(null)
  const [selfie, setSelfie] = useState<string | null>(null)

  // Business verification
  const [rcNumber, setRcNumber] = useState('')
  const [ifNumber, setIfNumber] = useState('')
  const [businessDoc, setBusinessDoc] = useState<string | null>(null)

  // Payment
  const [cardNumber, setCardNumber] = useState('')
  const [cardExpiry, setCardExpiry] = useState('')
  const [cardCvc, setCardCvc] = useState('')
  const [cardName, setCardName] = useState('')

  const selectedPlan = PLANS.find(p => p.key === plan)

  const handleOtpChange = (i: number, val: string) => {
    if (!/^\d*$/.test(val)) return
    const next = [...otp]
    next[i] = val.slice(-1)
    setOtp(next)
    if (val && i < 5) {
      const el = document.getElementById(`otp-${i + 1}`)
      el?.focus()
    }
    if (next.every(d => d !== '') && next.join('') === '123456') {
      setOtpVerified(true)
    }
  }

  const handleFileUpload = (setter: (v: string) => void) => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/*,application/pdf'
    input.onchange = e => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (!file) return
      const reader = new FileReader()
      reader.onload = ev => setter(ev.target?.result as string)
      reader.readAsDataURL(file)
    }
    input.click()
  }

  const canProceedId = cinFront && cinBack && selfie
  const canProceedBusiness = rcNumber.length >= 4 && ifNumber.length >= 4

  const formatCard = (v: string) => v.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim().slice(0, 19)
  const formatExpiry = (v: string) => v.replace(/\D/g, '').replace(/(\d{2})(\d)/, '$1/$2').slice(0, 5)

  // ── shared UI ──────────────────────────────────────────────────

  const StepIndicator = ({ steps, current }: { steps: string[]; current: number }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0', marginBottom: '32px' }}>
      {steps.map((s, i) => {
        const done = i < current
        const active = i === current
        return (
          <div key={s} style={{ display: 'flex', alignItems: 'center', flex: i < steps.length - 1 ? 1 : 'none' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: done ? '#22d4a8' : active ? '#161d1b' : '#e2eae6', color: done || active ? 'white' : '#6b7a76', fontSize: '12px', fontWeight: 700, flexShrink: 0 }}>
                {done ? <Check size={14} strokeWidth={3} /> : i + 1}
              </div>
              <span style={{ fontSize: '10px', fontWeight: active ? 700 : 500, color: active ? '#161d1b' : done ? '#22d4a8' : '#6b7a76', whiteSpace: 'nowrap' }}>{s}</span>
            </div>
            {i < steps.length - 1 && <div style={{ flex: 1, height: '2px', background: done ? '#22d4a8' : '#e2eae6', margin: '0 6px', marginBottom: '18px', transition: 'background 0.3s' }} />}
          </div>
        )
      })}
    </div>
  )

  const UploadBox = ({ label, value, onUpload, icon }: { label: string; value: string | null; onUpload: () => void; icon: React.ReactNode }) => (
    <button onClick={onUpload}
      style={{ width: '100%', padding: '20px', borderRadius: '14px', border: `2px dashed ${value ? '#22d4a8' : '#e2eae6'}`, background: value ? '#f0fdf9' : '#f4fbf8', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', fontFamily: 'inherit', transition: 'all 0.2s' }}>
      {value
        ? <><Check size={24} color="#22d4a8" /><span style={{ fontSize: '12px', fontWeight: 700, color: '#22d4a8' }}>Uploaded ✓</span></>
        : <>{icon}<span style={{ fontSize: '12px', fontWeight: 600, color: '#6b7a76', textAlign: 'center' }}>{label}</span></>
      }
    </button>
  )

  // ── LANDING ────────────────────────────────────────────────────
  if (step === 'landing') return (
    <div style={{ background: '#f4fbf8', minHeight: '100vh', fontFamily: 'Hanken Grotesk, Inter, system-ui, sans-serif' }}>

      {/* HERO */}
      <div style={{ background: 'linear-gradient(160deg, #161d1b 0%, #1a2e28 50%, #0f3d35 100%)', padding: '80px 24px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.12, backgroundImage: 'radial-gradient(circle at 15% 50%, #22d4a8 0%, transparent 45%), radial-gradient(circle at 85% 20%, #22d4a8 0%, transparent 40%)' }} />
        <div style={{ position: 'absolute', bottom: '-60px', left: '50%', transform: 'translateX(-50%)', width: '600px', height: '600px', borderRadius: '50%', background: 'rgba(34,212,168,0.04)', border: '1px solid rgba(34,212,168,0.08)' }} />

        <div style={{ maxWidth: '860px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(34,212,168,0.12)', border: '1px solid rgba(34,212,168,0.25)', color: '#22d4a8', fontSize: '12px', fontWeight: 700, padding: '8px 18px', borderRadius: '100px', marginBottom: '24px', letterSpacing: '0.05em' }}>
            💎 SOUKNI DIAMOND MEMBERSHIP
          </span>
          <h1 style={{ fontSize: '52px', fontWeight: 800, color: 'white', letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: '20px' }}>
            Sell Faster.<br />
            <span style={{ color: '#22d4a8' }}>Be Trusted.</span>
          </h1>
          <p style={{ fontSize: '17px', color: 'rgba(255,255,255,0.65)', lineHeight: 1.7, maxWidth: '540px', margin: '0 auto 40px' }}>
            Get verified, stand out from 500K+ listings, and reach serious buyers faster with SouKni's trust system.
          </p>
          <button onClick={() => setStep('choose-plan')}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: '#22d4a8', color: 'white', border: 'none', padding: '16px 36px', borderRadius: '14px', fontSize: '15px', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', boxShadow: '0 8px 32px rgba(34,212,168,0.35)', transition: 'all 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.03)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
          >
            Get Verified Now <ArrowRight size={17} />
          </button>
          <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.35)', marginTop: '14px' }}>No commitment · Cancel anytime · 7-day free trial</p>
        </div>
      </div>

      {/* TRUST STATS */}
      <div style={{ maxWidth: '1000px', margin: '-28px auto 0', padding: '0 24px', position: 'relative', zIndex: 10 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px' }}>
          {TRUST_STATS.map(s => (
            <div key={s.label} style={{ background: 'white', borderRadius: '18px', padding: '20px', border: '1px solid #e2eae6', boxShadow: '0 4px 20px rgba(0,0,0,0.06)', textAlign: 'center' }}>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '8px' }}>{s.icon}</div>
              <p style={{ fontSize: '24px', fontWeight: 800, color: '#161d1b', marginBottom: '4px' }}>{s.value}</p>
              <p style={{ fontSize: '11px', color: '#6b7a76', lineHeight: 1.4 }}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* HOW VERIFICATION WORKS */}
      <div style={{ maxWidth: '1000px', margin: '64px auto', padding: '0 24px' }}>
        <Breadcrumb items={[{ label: 'Home', href: `/${locale}` }, { label: 'Diamond Membership' }]} style={{ marginBottom: 24, textTransform: 'none', fontSize: 13, letterSpacing: 'normal', justifyContent: 'center' }} />
        <h2 style={{ fontSize: '28px', fontWeight: 800, color: '#161d1b', textAlign: 'center', marginBottom: '8px', letterSpacing: '-0.02em' }}>How Verification Works</h2>
        <p style={{ fontSize: '14px', color: '#6b7a76', textAlign: 'center', marginBottom: '40px' }}>Three steps to becoming a trusted seller on SouKni</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
          {[
            { step: '01', icon: <Phone size={24} color="#22d4a8" />, title: 'Phone Verification', desc: 'We send a 6-digit OTP to your Moroccan number (+212). Instant, automated, takes 30 seconds.', time: '30 seconds', badge: 'Instant' },
            { step: '02', icon: <FileCheck size={24} color="#22d4a8" />, title: 'National ID (CIN)', desc: 'Upload front and back of your Carte Nationale d\'Identité, plus a quick selfie to confirm it\'s you.', time: '2 minutes', badge: 'Automated' },
            { step: '03', icon: <Shield size={24} color="#22d4a8" />, title: 'Final Approval', desc: 'Our system cross-checks your documents. Diamond badge activates immediately after approval.', time: '< 1 minute', badge: 'Diamond Active' },
          ].map(s => (
            <div key={s.step} style={{ background: 'white', borderRadius: '20px', padding: '28px', border: '1px solid #e2eae6' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                <span style={{ fontSize: '36px', fontWeight: 800, color: '#f4fbf8', letterSpacing: '-0.03em' }}>{s.step}</span>
                <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: '#f0fdf9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{s.icon}</div>
              </div>
              <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#161d1b', marginBottom: '8px' }}>{s.title}</h3>
              <p style={{ fontSize: '13px', color: '#6b7a76', lineHeight: 1.6, marginBottom: '14px' }}>{s.desc}</p>
              <span style={{ fontSize: '10px', fontWeight: 700, color: '#22d4a8', background: '#f0fdf9', padding: '4px 10px', borderRadius: '100px' }}>{s.badge}</span>
            </div>
          ))}
        </div>
      </div>

      {/* PLANS PREVIEW */}
      <div style={{ maxWidth: '1000px', margin: '0 auto 64px', padding: '0 24px' }}>
        <h2 style={{ fontSize: '28px', fontWeight: 800, color: '#161d1b', textAlign: 'center', marginBottom: '8px', letterSpacing: '-0.02em' }}>Choose Your Plan</h2>
        <p style={{ fontSize: '14px', color: '#6b7a76', textAlign: 'center', marginBottom: '40px' }}>Start with Diamond, upgrade to Pro when your business grows</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          {PLANS.map(p => (
            <div key={p.key} style={{ background: 'white', borderRadius: '24px', padding: '32px', border: `2px solid ${p.key === 'diamond' ? '#22d4a8' : '#e2eae6'}`, position: 'relative', overflow: 'hidden' }}>
              {p.key === 'diamond' && (
                <span style={{ position: 'absolute', top: '20px', right: '20px', background: '#22d4a8', color: 'white', fontSize: '10px', fontWeight: 700, padding: '4px 10px', borderRadius: '100px' }}>MOST POPULAR</span>
              )}
              <div style={{ fontSize: '32px', marginBottom: '8px' }}>{p.badge}</div>
              <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#161d1b', marginBottom: '4px' }}>{p.name}</h3>
              <p style={{ fontSize: '13px', color: '#6b7a76', marginBottom: '16px' }}>{p.tagline}</p>
              <p style={{ fontSize: '30px', fontWeight: 800, color: '#161d1b', marginBottom: '4px' }}>
                {p.price} MAD<span style={{ fontSize: '14px', fontWeight: 500, color: '#6b7a76' }}>/month</span>
              </p>
              <div style={{ height: '1px', background: '#f4fbf8', margin: '16px 0' }} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '24px' }}>
                {p.features.slice(0, 5).map(f => (
                  <div key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                    <Check size={14} color="#22d4a8" style={{ marginTop: '2px', flexShrink: 0 }} />
                    <span style={{ fontSize: '13px', color: '#3c4a46' }}>{f}</span>
                  </div>
                ))}
                {p.features.length > 5 && <p style={{ fontSize: '12px', color: '#6b7a76', marginLeft: '22px' }}>+{p.features.length - 5} more benefits</p>}
              </div>
              <button onClick={() => { setPlan(p.key); setStep('choose-plan') }}
                style={{ width: '100%', padding: '13px', borderRadius: '12px', border: 'none', background: p.key === 'diamond' ? '#22d4a8' : '#161d1b', color: 'white', fontSize: '14px', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                Get {p.name} <ArrowRight size={15} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <div style={{ maxWidth: '700px', margin: '0 auto 80px', padding: '0 24px' }}>
        <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#161d1b', textAlign: 'center', marginBottom: '28px' }}>Common Questions</h2>
        {[
          { q: 'Is my ID data safe?', a: 'Yes. All documents are encrypted, stored securely, and never shared with buyers. We only use them to verify your identity once.' },
          { q: 'How long does verification take?', a: 'Diamond verification is mostly automated and takes under 5 minutes. Pro Business verification requires manual review within 24-48 hours.' },
          { q: 'Can I cancel anytime?', a: 'Yes. Cancel anytime from your account settings. Your badge remains active until the end of your billing period.' },
          { q: 'What if my verification is rejected?', a: 'We\'ll tell you exactly why and give you a chance to resubmit with corrected documents. Common issues: blurry photos or expired ID.' },
        ].map((f, i) => (
          <div key={i} style={{ padding: '16px 0', borderBottom: '1px solid #e2eae6' }}>
            <p style={{ fontSize: '14px', fontWeight: 700, color: '#161d1b', marginBottom: '6px' }}>{f.q}</p>
            <p style={{ fontSize: '13px', color: '#6b7a76', lineHeight: 1.6 }}>{f.a}</p>
          </div>
        ))}
      </div>
    </div>
  )

  // ── CHOOSE PLAN ────────────────────────────────────────────────
  if (step === 'choose-plan') return (
    <div style={{ background: '#f4fbf8', minHeight: '100vh', fontFamily: 'Hanken Grotesk, Inter, system-ui, sans-serif' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 24px 80px' }}>
        <button onClick={() => setStep('landing')} style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'none', border: 'none', color: '#6b7a76', fontSize: '13px', fontWeight: 600, cursor: 'pointer', marginBottom: '24px', fontFamily: 'inherit' }}>
          <ChevronRight size={14} style={{ transform: 'rotate(180deg)' }} /> Back
        </button>

        <h1 style={{ fontSize: '28px', fontWeight: 800, color: '#161d1b', marginBottom: '6px' }}>Choose your plan</h1>
        <p style={{ fontSize: '14px', color: '#6b7a76', marginBottom: '32px' }}>Both plans include a 7-day free trial. No charge until trial ends.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '32px' }}>
          {PLANS.map(p => (
            <button key={p.key} onClick={() => setPlan(p.key)}
              style={{ padding: '24px', borderRadius: '20px', border: `2px solid ${plan === p.key ? '#22d4a8' : '#e2eae6'}`, background: plan === p.key ? '#f0fdf9' : 'white', cursor: 'pointer', textAlign: 'left', fontFamily: 'inherit', transition: 'all 0.2s', position: 'relative' }}>
              {plan === p.key && <div style={{ position: 'absolute', top: '16px', right: '16px', width: '22px', height: '22px', borderRadius: '50%', background: '#22d4a8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Check size={13} color="white" strokeWidth={3} /></div>}
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>{p.badge}</div>
              <p style={{ fontSize: '16px', fontWeight: 800, color: '#161d1b', marginBottom: '2px' }}>{p.name}</p>
              <p style={{ fontSize: '20px', fontWeight: 800, color: plan === p.key ? '#22d4a8' : '#161d1b', marginBottom: '4px' }}>{p.price} MAD<span style={{ fontSize: '12px', fontWeight: 500, color: '#6b7a76' }}>/mo</span></p>
              <p style={{ fontSize: '12px', color: '#6b7a76' }}>{p.tagline}</p>
            </button>
          ))}
        </div>

        {selectedPlan && (
          <div style={{ background: 'white', borderRadius: '16px', padding: '20px', border: '1px solid #e2eae6', marginBottom: '24px' }}>
            <p style={{ fontSize: '13px', fontWeight: 700, color: '#161d1b', marginBottom: '12px' }}>Verification required for {selectedPlan.name}:</p>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {selectedPlan.verificationSteps.map((s, i) => (
                <span key={s} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 600, color: '#161d1b', background: '#f4fbf8', padding: '6px 12px', borderRadius: '100px', border: '1px solid #e2eae6' }}>
                  <span style={{ width: '16px', height: '16px', borderRadius: '50%', background: '#22d4a8', color: 'white', fontSize: '9px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{i + 1}</span>
                  {s}
                </span>
              ))}
            </div>
            <p style={{ fontSize: '11px', color: '#6b7a76', marginTop: '10px' }}>⏱ Review time: {selectedPlan.reviewTime}</p>
          </div>
        )}

        <button onClick={() => plan && setStep('verify-phone')}
          style={{ width: '100%', padding: '14px', borderRadius: '14px', border: 'none', background: plan ? '#22d4a8' : '#e2eae6', color: plan ? 'white' : '#6b7a76', fontSize: '15px', fontWeight: 700, cursor: plan ? 'pointer' : 'not-allowed', fontFamily: 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
          Start Verification <ArrowRight size={16} />
        </button>
      </div>
    </div>
  )

  // ── PHONE VERIFY ───────────────────────────────────────────────
  if (step === 'verify-phone') return (
    <div style={{ background: '#f4fbf8', minHeight: '100vh', fontFamily: 'Hanken Grotesk, Inter, system-ui, sans-serif' }}>
      <div style={{ maxWidth: '520px', margin: '0 auto', padding: '40px 24px 80px' }}>
        <StepIndicator steps={['Phone', 'Identity', 'Payment']} current={0} />

        <div style={{ background: 'white', borderRadius: '24px', padding: '36px', border: '1px solid #e2eae6' }}>
          <div style={{ width: '52px', height: '52px', borderRadius: '16px', background: '#f0fdf9', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
            <Phone size={24} color="#22d4a8" />
          </div>
          <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#161d1b', marginBottom: '6px' }}>Verify your phone</h2>
          <p style={{ fontSize: '13px', color: '#6b7a76', marginBottom: '24px' }}>We'll send a 6-digit code to your Moroccan number.</p>

          {!otpSent ? (
            <>
              <label style={{ fontSize: '12px', fontWeight: 700, color: '#161d1b', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '8px' }}>Phone Number</label>
              <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                <div style={{ padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #e2eae6', background: '#f4fbf8', fontSize: '14px', fontWeight: 700, color: '#161d1b', display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
                  🇲🇦 +212
                </div>
                <input value={phone} onChange={e => setPhone(e.target.value.replace(/\D/g, '').slice(0, 9))}
                  placeholder="6 12 34 56 78" type="tel"
                  style={{ flex: 1, padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #e2eae6', fontSize: '15px', fontFamily: 'inherit', color: '#161d1b', background: '#f4fbf8', outline: 'none' }}
                  onFocus={e => e.target.style.borderColor = '#22d4a8'}
                  onBlur={e => e.target.style.borderColor = '#e2eae6'}
                />
              </div>
              <button onClick={() => phone.length >= 9 && setOtpSent(true)}
                style={{ width: '100%', padding: '13px', borderRadius: '12px', background: phone.length >= 9 ? '#22d4a8' : '#e2eae6', color: phone.length >= 9 ? 'white' : '#6b7a76', border: 'none', fontSize: '14px', fontWeight: 700, cursor: phone.length >= 9 ? 'pointer' : 'not-allowed', fontFamily: 'inherit' }}>
                Send Code
              </button>
            </>
          ) : !otpVerified ? (
            <>
              <p style={{ fontSize: '13px', color: '#6b7a76', marginBottom: '20px' }}>Enter the code sent to <strong style={{ color: '#161d1b' }}>+212 {phone}</strong><br /><span style={{ fontSize: '11px' }}>Hint: use 123456 for demo</span></p>
              <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', justifyContent: 'center' }}>
                {otp.map((d, i) => (
                  <input key={i} id={`otp-${i}`} value={d} onChange={e => handleOtpChange(i, e.target.value)}
                    maxLength={1} inputMode="numeric"
                    style={{ width: '48px', height: '56px', textAlign: 'center', fontSize: '22px', fontWeight: 800, borderRadius: '12px', border: `2px solid ${d ? '#22d4a8' : '#e2eae6'}`, background: d ? '#f0fdf9' : '#f4fbf8', outline: 'none', fontFamily: 'inherit', color: '#161d1b' }}
                  />
                ))}
              </div>
              <button onClick={() => { setOtp(['', '', '', '', '', '']); setOtpSent(false) }}
                style={{ display: 'block', margin: '0 auto', background: 'none', border: 'none', color: '#22d4a8', fontSize: '13px', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>
                Resend code
              </button>
            </>
          ) : (
            <div style={{ textAlign: 'center', padding: '16px 0' }}>
              <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: '#f0fdf9', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
                <Check size={28} color="#22d4a8" />
              </div>
              <p style={{ fontSize: '16px', fontWeight: 800, color: '#161d1b', marginBottom: '4px' }}>Phone Verified! ✓</p>
              <p style={{ fontSize: '13px', color: '#6b7a76', marginBottom: '20px' }}>+212 {phone} confirmed</p>
              <button onClick={() => setStep('verify-id')}
                style={{ width: '100%', padding: '13px', borderRadius: '12px', background: '#22d4a8', color: 'white', border: 'none', fontSize: '14px', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                Continue to ID Verification <ArrowRight size={15} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )

  // ── ID VERIFY ──────────────────────────────────────────────────
  if (step === 'verify-id') return (
    <div style={{ background: '#f4fbf8', minHeight: '100vh', fontFamily: 'Hanken Grotesk, Inter, system-ui, sans-serif' }}>
      <div style={{ maxWidth: '560px', margin: '0 auto', padding: '40px 24px 80px' }}>
        <StepIndicator steps={['Phone', 'Identity', 'Payment']} current={1} />

        <div style={{ background: 'white', borderRadius: '24px', padding: '36px', border: '1px solid #e2eae6' }}>
          <div style={{ width: '52px', height: '52px', borderRadius: '16px', background: '#f0fdf9', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
            <FileCheck size={24} color="#22d4a8" />
          </div>
          <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#161d1b', marginBottom: '6px' }}>Identity Verification</h2>
          <p style={{ fontSize: '13px', color: '#6b7a76', marginBottom: '24px' }}>Upload your Carte Nationale d'Identité (CIN) and a selfie. Your data is encrypted and never shared.</p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
            <div>
              <p style={{ fontSize: '11px', fontWeight: 700, color: '#161d1b', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>CIN — Front</p>
              <UploadBox label="Upload front side" value={cinFront} onUpload={() => handleFileUpload(v => setCinFront(v))} icon={<Upload size={20} color="#6b7a76" />} />
            </div>
            <div>
              <p style={{ fontSize: '11px', fontWeight: 700, color: '#161d1b', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>CIN — Back</p>
              <UploadBox label="Upload back side" value={cinBack} onUpload={() => handleFileUpload(v => setCinBack(v))} icon={<Upload size={20} color="#6b7a76" />} />
            </div>
          </div>

          <div style={{ marginBottom: '24px' }}>
            <p style={{ fontSize: '11px', fontWeight: 700, color: '#161d1b', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Selfie with your CIN</p>
            <UploadBox label="Take or upload a selfie holding your CIN" value={selfie} onUpload={() => handleFileUpload(v => setSelfie(v))} icon={<Camera size={20} color="#6b7a76" />} />
          </div>

          <div style={{ background: '#f5ede0', borderRadius: '12px', padding: '14px 16px', marginBottom: '24px', display: 'flex', gap: '10px' }}>
            <Lock size={16} color="#6b7a76" style={{ flexShrink: 0, marginTop: '1px' }} />
            <p style={{ fontSize: '12px', color: '#6b7a76', lineHeight: 1.5 }}>
              Your documents are encrypted with AES-256. They are used only for identity verification and permanently deleted after 30 days.
            </p>
          </div>

          {plan === 'pro' && (
            <div style={{ marginBottom: '24px', padding: '16px', background: '#f4fbf8', borderRadius: '12px', border: '1px solid #e2eae6' }}>
              <p style={{ fontSize: '13px', fontWeight: 700, color: '#161d1b', marginBottom: '12px' }}>Business Documents (Pro)</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {[
                  { label: 'RC Number', value: rcNumber, set: setRcNumber, placeholder: 'Registre de Commerce number' },
                  { label: 'IF Number', value: ifNumber, set: setIfNumber, placeholder: 'Identifiant Fiscal number' },
                ].map(f => (
                  <div key={f.label}>
                    <label style={{ fontSize: '11px', fontWeight: 700, color: '#161d1b', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '6px' }}>{f.label}</label>
                    <input value={f.value} onChange={e => f.set(e.target.value)} placeholder={f.placeholder}
                      style={{ width: '100%', padding: '11px 14px', borderRadius: '10px', border: '1.5px solid #e2eae6', fontSize: '14px', fontFamily: 'inherit', color: '#161d1b', background: 'white', outline: 'none', boxSizing: 'border-box' }}
                      onFocus={e => e.target.style.borderColor = '#22d4a8'}
                      onBlur={e => e.target.style.borderColor = '#e2eae6'}
                    />
                  </div>
                ))}
                <div>
                  <p style={{ fontSize: '11px', fontWeight: 700, color: '#161d1b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px' }}>Business Registration Doc</p>
                  <UploadBox label="Upload RC or attestation PDF" value={businessDoc} onUpload={() => handleFileUpload(v => setBusinessDoc(v))} icon={<Building2 size={20} color="#6b7a76" />} />
                </div>
              </div>
            </div>
          )}

          <button
            onClick={() => (plan === 'diamond' ? canProceedId : canProceedId && canProceedBusiness) && setStep('payment')}
            style={{ width: '100%', padding: '13px', borderRadius: '12px', background: canProceedId ? '#22d4a8' : '#e2eae6', color: canProceedId ? 'white' : '#6b7a76', border: 'none', fontSize: '14px', fontWeight: 700, cursor: canProceedId ? 'pointer' : 'not-allowed', fontFamily: 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            Continue to Payment <ArrowRight size={15} />
          </button>
        </div>
      </div>
    </div>
  )

  // ── PAYMENT ────────────────────────────────────────────────────
  if (step === 'payment') return (
    <div style={{ background: '#f4fbf8', minHeight: '100vh', fontFamily: 'Hanken Grotesk, Inter, system-ui, sans-serif' }}>
      <div style={{ maxWidth: '560px', margin: '0 auto', padding: '40px 24px 80px' }}>
        <StepIndicator steps={['Phone', 'Identity', 'Payment']} current={2} />

        <div style={{ background: 'white', borderRadius: '24px', padding: '36px', border: '1px solid #e2eae6' }}>
          <div style={{ width: '52px', height: '52px', borderRadius: '16px', background: '#f0fdf9', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
            <CreditCard size={24} color="#22d4a8" />
          </div>
          <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#161d1b', marginBottom: '6px' }}>Payment Details</h2>
          <p style={{ fontSize: '13px', color: '#6b7a76', marginBottom: '24px' }}>Your 7-day free trial starts today. You won't be charged until {new Date(Date.now() + 7 * 86400000).toLocaleDateString('en-GB', { day: 'numeric', month: 'long' })}.</p>

          {/* Order summary */}
          <div style={{ background: '#f4fbf8', borderRadius: '14px', padding: '16px', marginBottom: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <p style={{ fontSize: '14px', fontWeight: 700, color: '#161d1b' }}>{selectedPlan?.badge} {selectedPlan?.name} Membership</p>
                <p style={{ fontSize: '12px', color: '#6b7a76' }}>7-day free trial, then monthly</p>
              </div>
              <p style={{ fontSize: '18px', fontWeight: 800, color: '#161d1b' }}>{selectedPlan?.price} MAD/mo</p>
            </div>
            <div style={{ height: '1px', background: '#e2eae6', margin: '12px 0' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '13px', color: '#6b7a76' }}>Due today</span>
              <span style={{ fontSize: '14px', fontWeight: 800, color: '#22d4a8' }}>FREE (trial)</span>
            </div>
          </div>

          {/* Card form */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '24px' }}>
            <div>
              <label style={{ fontSize: '11px', fontWeight: 700, color: '#161d1b', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '8px' }}>Name on Card</label>
              <input value={cardName} onChange={e => setCardName(e.target.value)} placeholder="Youssef Alami"
                style={{ width: '100%', padding: '12px 14px', borderRadius: '12px', border: '1.5px solid #e2eae6', fontSize: '14px', fontFamily: 'inherit', color: '#161d1b', background: '#f4fbf8', outline: 'none', boxSizing: 'border-box' }}
                onFocus={e => e.target.style.borderColor = '#22d4a8'}
                onBlur={e => e.target.style.borderColor = '#e2eae6'}
              />
            </div>
            <div>
              <label style={{ fontSize: '11px', fontWeight: 700, color: '#161d1b', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '8px' }}>Card Number</label>
              <input value={cardNumber} onChange={e => setCardNumber(formatCard(e.target.value))} placeholder="1234 5678 9012 3456" maxLength={19}
                style={{ width: '100%', padding: '12px 14px', borderRadius: '12px', border: '1.5px solid #e2eae6', fontSize: '14px', fontFamily: 'inherit', color: '#161d1b', background: '#f4fbf8', outline: 'none', boxSizing: 'border-box', letterSpacing: '0.05em' }}
                onFocus={e => e.target.style.borderColor = '#22d4a8'}
                onBlur={e => e.target.style.borderColor = '#e2eae6'}
              />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              {[
                { label: 'Expiry', value: cardExpiry, set: (v: string) => setCardExpiry(formatExpiry(v)), placeholder: 'MM/YY', max: 5 },
                { label: 'CVC', value: cardCvc, set: (v: string) => setCardCvc(v.replace(/\D/g, '').slice(0, 3)), placeholder: '•••', max: 3 },
              ].map(f => (
                <div key={f.label}>
                  <label style={{ fontSize: '11px', fontWeight: 700, color: '#161d1b', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '8px' }}>{f.label}</label>
                  <input value={f.value} onChange={e => f.set(e.target.value)} placeholder={f.placeholder} maxLength={f.max}
                    style={{ width: '100%', padding: '12px 14px', borderRadius: '12px', border: '1.5px solid #e2eae6', fontSize: '14px', fontFamily: 'inherit', color: '#161d1b', background: '#f4fbf8', outline: 'none', boxSizing: 'border-box' }}
                    onFocus={e => e.target.style.borderColor = '#22d4a8'}
                    onBlur={e => e.target.style.borderColor = '#e2eae6'}
                  />
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
            <Lock size={13} color="#6b7a76" />
            <p style={{ fontSize: '11px', color: '#6b7a76' }}>Secured by 256-bit SSL encryption. Cancel anytime.</p>
          </div>

          <button
            onClick={() => cardName && cardNumber.length === 19 && cardExpiry.length === 5 && cardCvc.length === 3 && setStep('success')}
            style={{ width: '100%', padding: '14px', borderRadius: '12px', background: '#22d4a8', color: 'white', border: 'none', fontSize: '15px', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            <Award size={17} /> Start Free Trial
          </button>
        </div>
      </div>
    </div>
  )

  // ── SUCCESS ────────────────────────────────────────────────────
  if (step === 'success') return (
    <div style={{ background: '#f4fbf8', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 24px', fontFamily: 'Hanken Grotesk, Inter, system-ui, sans-serif' }}>
      <div style={{ maxWidth: '500px', width: '100%', textAlign: 'center' }}>
        <div style={{ width: '100px', height: '100px', borderRadius: '28px', background: 'linear-gradient(135deg, #22d4a8, #0f9b8e)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', boxShadow: '0 16px 48px rgba(34,212,168,0.35)' }}>
          <span style={{ fontSize: '48px' }}>{selectedPlan?.badge}</span>
        </div>
        <h1 style={{ fontSize: '32px', fontWeight: 800, color: '#161d1b', marginBottom: '12px', letterSpacing: '-0.02em' }}>
          You're now {selectedPlan?.name}! 🎉
        </h1>
        <p style={{ fontSize: '15px', color: '#6b7a76', lineHeight: 1.6, marginBottom: '32px', maxWidth: '380px', margin: '0 auto 32px' }}>
          Your verified badge is now live on all your listings. Buyers can see you're a trusted seller on SouKni.
        </p>

        <div style={{ background: 'white', borderRadius: '20px', padding: '24px', border: '1px solid #e2eae6', marginBottom: '24px', textAlign: 'left' }}>
          {[
            { icon: <Check size={15} color="#22d4a8" />, text: `${selectedPlan?.badge} ${selectedPlan?.name} badge active on all listings` },
            { icon: <Check size={15} color="#22d4a8" />, text: 'Phone number verified ✓' },
            { icon: <Check size={15} color="#22d4a8" />, text: 'Identity verified ✓' },
            { icon: <Check size={15} color="#22d4a8" />, text: '7-day free trial started — no charge until Aug 9' },
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 0', borderBottom: i < 3 ? '1px solid #f4fbf8' : 'none' }}>
              <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#f0fdf9', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{item.icon}</div>
              <span style={{ fontSize: '13px', color: '#161d1b', fontWeight: 500 }}>{item.text}</span>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <Link href={`/${locale}/account/my-ads`} style={{ flex: 1, padding: '13px', borderRadius: '12px', border: '1.5px solid #e2eae6', color: '#161d1b', textDecoration: 'none', fontSize: '14px', fontWeight: 700, textAlign: 'center' }}>
            View My Ads
          </Link>
          <Link href={`/${locale}`} style={{ flex: 1, padding: '13px', borderRadius: '12px', background: '#22d4a8', color: 'white', textDecoration: 'none', fontSize: '14px', fontWeight: 700, textAlign: 'center' }}>
            Go to Home
          </Link>
        </div>
      </div>
    </div>
  )

  return null
}
