'use client'

import { useState, use } from 'react'
import Link from 'next/link'
import { Mail, Phone, MapPin, MessageCircle, Clock, Send, Check, ChevronRight, Shield, Building2, AlertTriangle, Sparkles } from 'lucide-react'

type Locale = 'en' | 'fr' | 'ar' | 'es' | 'de'
type Topic = 'general' | 'safety' | 'billing' | 'listing' | 'account' | 'press' | 'business'

const HG = "'Hanken Grotesk', Inter, system-ui, sans-serif"

const TOPICS: { key: Topic; label: string; icon: React.ReactNode; email: string; response: string }[] = [
  { key: 'general',  label: 'General Question',    icon: <MessageCircle size={16} />, email: 'hello@soukni.com',    response: 'Within 24h' },
  { key: 'safety',   label: 'Safety / Report',     icon: <Shield size={16} />,        email: 'safety@soukni.com',  response: 'Within 2h' },
  { key: 'billing',  label: 'Billing & Payments',  icon: <Sparkles size={16} />,      email: 'billing@soukni.com', response: 'Within 24h' },
  { key: 'listing',  label: 'Listing Issue',        icon: <AlertTriangle size={16} />, email: 'ads@soukni.com',     response: 'Within 12h' },
  { key: 'account',  label: 'Account Problem',      icon: <Shield size={16} />,        email: 'support@soukni.com', response: 'Within 12h' },
  { key: 'press',    label: 'Press & Media',        icon: <Building2 size={16} />,     email: 'press@soukni.com',   response: 'Within 48h' },
  { key: 'business', label: 'Business Partnership', icon: <Building2 size={16} />,     email: 'partners@soukni.com',response: 'Within 48h' },
]

const OFFICES = [
  { city: 'Rabat', address: 'Avenue Mohammed V, Agdal\nRabat 10090, Morocco', phone: '+212 5 37 00 00 00', primary: true },
  { city: 'Casablanca', address: 'Boulevard Anfa, Maarif\nCasablanca 20100, Morocco', phone: '+212 5 22 00 00 00', primary: false },
]

export default function ContactPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = use(params)
  const [topic, setTopic] = useState<Topic>('general')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const selectedTopic = TOPICS.find(t => t.key === topic)!

  const canSubmit = name.trim() && email.includes('@') && message.trim().length >= 10

  const handleSubmit = () => {
    if (!canSubmit) return
    setSubmitted(true)
  }

  const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
    <div>
      <label style={{ fontSize: '11px', fontWeight: 900, color: '#161d1b', textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', marginBottom: '8px' }}>{label}</label>
      {children}
    </div>
  )

  const inputStyle = {
    width: '100%', padding: '12px 16px', borderRadius: '12px',
    border: '1.5px solid #e2eae6', fontSize: '14px', fontFamily: HG,
    color: '#161d1b', background: '#f4fbf8', outline: 'none',
    boxSizing: 'border-box' as const, fontWeight: 700,
    transition: 'border-color 0.2s'
  }

  return (
    <div style={{ background: '#f4fbf8', minHeight: '100vh', fontFamily: HG }}>

      {/* HERO */}
      <div style={{ background: 'linear-gradient(160deg, #161d1b 0%, #1a2e28 100%)', padding: '56px 24px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.1, backgroundImage: 'radial-gradient(circle at 80% 30%, #22d4a8 0%, transparent 50%)' }} />
        <div style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <h1 style={{ fontSize: '44px', fontWeight: 900, color: 'white', letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: '14px' }}>
            Get in Touch
          </h1>
          <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.55)', lineHeight: 1.7 }}>
            We're a real team based in Morocco and we read every message. How can we help?
          </p>
        </div>
      </div>

      {/* BREADCRUMB */}
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '20px 24px 0' }}>
        <nav style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Link href={`/${locale}`} style={{ fontSize: '13px', color: '#6b7a76', textDecoration: 'none', fontWeight: 700 }}>Home</Link>
          <ChevronRight size={13} color="#6b7a76" />
          <span style={{ fontSize: '13px', fontWeight: 900, color: '#161d1b' }}>Contact Us</span>
        </nav>
      </div>

      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '40px 24px 80px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: '24px', alignItems: 'start' }}>

          {/* LEFT — FORM */}
          <div style={{ background: 'white', borderRadius: '24px', padding: '36px', border: '1px solid #e2eae6' }}>

            {!submitted ? (
              <>
                <h2 style={{ fontSize: '22px', fontWeight: 900, color: '#161d1b', letterSpacing: '-0.03em', marginBottom: '6px' }}>Send us a message</h2>
                <p style={{ fontSize: '13px', color: '#6b7a76', marginBottom: '28px' }}>We'll reply to {email || 'your email'} {selectedTopic.response.toLowerCase()}.</p>

                {/* Topic selector */}
                <Field label="What can we help with?">
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px', marginBottom: '24px' }}>
                    {TOPICS.map(t => (
                      <button key={t.key} onClick={() => setTopic(t.key)}
                        style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 14px', borderRadius: '10px', border: `1.5px solid ${topic === t.key ? '#22d4a8' : '#e2eae6'}`, background: topic === t.key ? '#f0fdf9' : 'white', cursor: 'pointer', fontFamily: HG, fontSize: '12px', fontWeight: 900, color: topic === t.key ? '#22d4a8' : '#161d1b', textAlign: 'left', transition: 'all 0.15s' }}>
                        <span style={{ color: topic === t.key ? '#22d4a8' : '#6b7a76' }}>{t.icon}</span>
                        {t.label}
                      </button>
                    ))}
                  </div>
                </Field>

                {/* Response time indicator */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 14px', background: '#f0fdf9', borderRadius: '10px', border: '1px solid #22d4a8', marginBottom: '24px' }}>
                  <Clock size={14} color="#22d4a8" />
                  <span style={{ fontSize: '12px', fontWeight: 900, color: '#161d1b' }}>Expected response for <em>{selectedTopic.label}</em>: </span>
                  <span style={{ fontSize: '12px', fontWeight: 900, color: '#22d4a8' }}>{selectedTopic.response}</span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                    <Field label="Your Name">
                      <input value={name} onChange={e => setName(e.target.value)} placeholder="Youssef Alami"
                        style={inputStyle}
                        onFocus={e => e.target.style.borderColor = '#22d4a8'}
                        onBlur={e => e.target.style.borderColor = '#e2eae6'}
                      />
                    </Field>
                    <Field label="Email Address">
                      <input value={email} onChange={e => setEmail(e.target.value)} placeholder="you@email.com" type="email"
                        style={inputStyle}
                        onFocus={e => e.target.style.borderColor = '#22d4a8'}
                        onBlur={e => e.target.style.borderColor = '#e2eae6'}
                      />
                    </Field>
                  </div>

                  <Field label="Your Message">
                    <textarea value={message} onChange={e => setMessage(e.target.value)}
                      placeholder="Tell us as much detail as possible so we can help you faster..."
                      rows={5} maxLength={1000}
                      style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.6, padding: '14px 16px' }}
                      onFocus={e => e.target.style.borderColor = '#22d4a8'}
                      onBlur={e => e.target.style.borderColor = '#e2eae6'}
                    />
                    <p style={{ fontSize: '11px', color: '#6b7a76', marginTop: '4px', textAlign: 'right', fontWeight: 700 }}>{message.length}/1000</p>
                  </Field>
                </div>

                <button onClick={handleSubmit}
                  style={{ width: '100%', padding: '14px', borderRadius: '12px', border: 'none', background: canSubmit ? '#22d4a8' : '#e2eae6', color: canSubmit ? 'white' : '#6b7a76', fontSize: '15px', fontWeight: 900, cursor: canSubmit ? 'pointer' : 'not-allowed', fontFamily: HG, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', letterSpacing: '-0.03em', transition: 'all 0.2s' }}>
                  <Send size={16} /> Send Message
                </button>

                <p style={{ fontSize: '11px', color: '#6b7a76', textAlign: 'center', marginTop: '12px', fontWeight: 700 }}>
                  We'll reply to {selectedTopic.email} — check your spam folder too.
                </p>
              </>
            ) : (
              <div style={{ textAlign: 'center', padding: '32px 0' }}>
                <div style={{ width: '72px', height: '72px', borderRadius: '22px', background: '#f0fdf9', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                  <Check size={32} color="#22d4a8" strokeWidth={2.5} />
                </div>
                <h2 style={{ fontSize: '24px', fontWeight: 900, color: '#161d1b', letterSpacing: '-0.03em', marginBottom: '10px' }}>Message Sent!</h2>
                <p style={{ fontSize: '14px', color: '#6b7a76', lineHeight: 1.7, marginBottom: '8px' }}>
                  Thanks <strong style={{ color: '#161d1b' }}>{name}</strong>! We've received your message about <strong style={{ color: '#161d1b' }}>{selectedTopic.label}</strong>.
                </p>
                <p style={{ fontSize: '13px', color: '#6b7a76', marginBottom: '28px' }}>
                  We'll reply to <strong style={{ color: '#161d1b' }}>{email}</strong> {selectedTopic.response.toLowerCase()}.
                </p>
                <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                  <button onClick={() => { setSubmitted(false); setName(''); setEmail(''); setMessage('') }}
                    style={{ padding: '11px 22px', borderRadius: '12px', border: '1.5px solid #e2eae6', background: 'white', fontSize: '13px', fontWeight: 900, cursor: 'pointer', fontFamily: HG, color: '#161d1b' }}>
                    Send Another
                  </button>
                  <Link href={`/${locale}`} style={{ padding: '11px 22px', borderRadius: '12px', background: '#22d4a8', color: 'white', textDecoration: 'none', fontSize: '13px', fontWeight: 900 }}>
                    Back to Home
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* RIGHT — INFO */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

            {/* Quick contact cards */}
            <div style={{ background: 'white', borderRadius: '20px', padding: '24px', border: '1px solid #e2eae6' }}>
              <h3 style={{ fontSize: '15px', fontWeight: 900, color: '#161d1b', letterSpacing: '-0.03em', marginBottom: '16px' }}>Quick Contact</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {[
                  { icon: <MessageCircle size={16} color="#22d4a8" />, label: 'Live Chat', sub: 'Avg. 5 min response', action: 'Start Chat', bg: '#22d4a8' },
                  { icon: <Mail size={16} color="#22d4a8" />, label: 'hello@soukni.com', sub: 'General inquiries', action: 'Email', bg: '#161d1b' },
                  { icon: <Phone size={16} color="#22d4a8" />, label: '+212 5 37 00 00 00', sub: 'Mon–Fri, 9am–6pm', action: 'Call', bg: '#161d1b' },
                ].map(c => (
                  <div key={c.label} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', background: '#f4fbf8', borderRadius: '12px', border: '1px solid #e2eae6' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#f0fdf9', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      {c.icon}
                    </div>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: '13px', fontWeight: 900, color: '#161d1b' }}>{c.label}</p>
                      <p style={{ fontSize: '11px', color: '#6b7a76', fontWeight: 700 }}>{c.sub}</p>
                    </div>
                    <button style={{ padding: '7px 14px', borderRadius: '8px', border: 'none', background: c.bg, color: 'white', fontSize: '11px', fontWeight: 900, cursor: 'pointer', fontFamily: HG, whiteSpace: 'nowrap' }}>
                      {c.action}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Offices */}
            <div style={{ background: 'white', borderRadius: '20px', padding: '24px', border: '1px solid #e2eae6' }}>
              <h3 style={{ fontSize: '15px', fontWeight: 900, color: '#161d1b', letterSpacing: '-0.03em', marginBottom: '16px' }}>Our Offices</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {OFFICES.map(o => (
                  <div key={o.city} style={{ padding: '14px', borderRadius: '12px', background: o.primary ? '#f0fdf9' : '#f4fbf8', border: `1.5px solid ${o.primary ? '#22d4a8' : '#e2eae6'}` }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                      <MapPin size={13} color="#22d4a8" />
                      <p style={{ fontSize: '13px', fontWeight: 900, color: '#161d1b' }}>{o.city} {o.primary && <span style={{ fontSize: '10px', fontWeight: 900, color: '#22d4a8', marginLeft: '4px' }}>HQ</span>}</p>
                    </div>
                    <p style={{ fontSize: '12px', color: '#6b7a76', lineHeight: 1.5, whiteSpace: 'pre-line', fontWeight: 700 }}>{o.address}</p>
                    <p style={{ fontSize: '12px', color: '#6b7a76', marginTop: '4px', fontWeight: 700 }}>{o.phone}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Hours */}
            <div style={{ background: 'white', borderRadius: '20px', padding: '24px', border: '1px solid #e2eae6' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
                <Clock size={16} color="#22d4a8" />
                <h3 style={{ fontSize: '15px', fontWeight: 900, color: '#161d1b', letterSpacing: '-0.03em' }}>Support Hours</h3>
              </div>
              {[
                { days: 'Monday – Friday', hours: '9:00 AM – 6:00 PM' },
                { days: 'Saturday', hours: '10:00 AM – 4:00 PM' },
                { days: 'Sunday', hours: 'Email only' },
                { days: 'Safety Team', hours: '7 days / 24h' },
              ].map(h => (
                <div key={h.days} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f4fbf8' }}>
                  <span style={{ fontSize: '12px', fontWeight: 700, color: '#6b7a76' }}>{h.days}</span>
                  <span style={{ fontSize: '12px', fontWeight: 900, color: '#161d1b' }}>{h.hours}</span>
                </div>
              ))}
              <div style={{ marginTop: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#22d4a8' }} />
                <span style={{ fontSize: '11px', fontWeight: 900, color: '#22d4a8' }}>Support team is online now</span>
              </div>
            </div>

            {/* Safety note */}
            <div style={{ background: '#fff8f0', borderRadius: '16px', padding: '16px', border: '1.5px solid #f97316', display: 'flex', gap: '10px' }}>
              <AlertTriangle size={16} color="#f97316" style={{ flexShrink: 0, marginTop: '1px' }} />
              <p style={{ fontSize: '12px', color: '#6b7a76', lineHeight: 1.5, fontWeight: 700 }}>
                <strong style={{ color: '#161d1b' }}>Safety reminder:</strong> SouKni will never ask for your password, OTP or bank details via phone, email or chat.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
