'use client'

import { useState, use } from 'react'
import Link from 'next/link'
import { CheckCircle, Circle, ExternalLink, Copy, Check, Database, CreditCard, Mail, Phone, Image, Globe, Shield } from 'lucide-react'

type Locale = 'en' | 'fr' | 'ar' | 'es' | 'de'

const MINT    = '#22d4a8'
const SURFACE = '#f4fbf8'
const INK     = '#161d1b'
const MUTED   = '#6b7a76'
const FONT    = "'Inter', system-ui, sans-serif"

const STEPS = [
  {
    id: 1, icon: <Database size={20} color={MINT} />, service: 'Supabase',
    label: 'Database + Auth + Realtime',
    url: 'https://supabase.com',
    free: 'Free tier: 500MB DB, 50k MAU',
    color: '#3ecf8e',
    steps: [
      'Go to supabase.com → New Project',
      'Copy Project URL and anon key to .env.local',
      'Go to SQL Editor → paste contents of src/lib/supabase/schema.sql → Run',
      'Enable Google OAuth: Authentication → Providers → Google',
      'Enable Realtime: Database → Replication → Enable for messages, notifications tables',
    ],
    envKeys: ['NEXT_PUBLIC_SUPABASE_URL', 'NEXT_PUBLIC_SUPABASE_ANON_KEY', 'SUPABASE_SERVICE_ROLE_KEY'],
  },
  {
    id: 2, icon: <CreditCard size={20} color="#635bff" />, service: 'Stripe',
    label: 'Payments (Diamond, Boost, Escrow)',
    url: 'https://stripe.com',
    free: 'Free to set up, 2.9% + 30¢ per transaction',
    color: '#635bff',
    steps: [
      'Go to stripe.com → Create account',
      'Dashboard → API Keys → copy publishable + secret keys',
      'Install Stripe CLI → stripe listen --forward-to localhost:3000/api/payments/webhook',
      'Add MAD currency in Stripe Dashboard (Settings → Currencies)',
      'For Morocco: enable Stripe Payments with local bank support',
    ],
    envKeys: ['NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY', 'STRIPE_SECRET_KEY', 'STRIPE_WEBHOOK_SECRET'],
  },
  {
    id: 3, icon: <Mail size={20} color="#0070f3" />, service: 'Resend',
    label: 'Transactional Emails',
    url: 'https://resend.com',
    free: 'Free tier: 3,000 emails/month',
    color: '#0070f3',
    steps: [
      'Go to resend.com → Create account',
      'Add and verify your domain (soukni.com)',
      'Create API key → copy to .env.local',
      'Set FROM email to noreply@soukni.com',
    ],
    envKeys: ['RESEND_API_KEY', 'RESEND_FROM_EMAIL'],
  },
  {
    id: 4, icon: <Phone size={20} color="#ef4444" />, service: "Africa's Talking",
    label: 'SMS OTP for Morocco (+212)',
    url: 'https://africastalking.com',
    free: 'Pay per SMS ~0.05 MAD/SMS',
    color: '#ef4444',
    steps: [
      "Go to africastalking.com → Create account",
      "Create application → Get API key",
      "Register sender ID 'SouKni' (takes 2-3 days approval in Morocco)",
      "Top up account with test credits",
      "Copy API key and username to .env.local",
    ],
    envKeys: ['AT_API_KEY', 'AT_USERNAME', 'AT_SENDER_ID'],
  },
  {
    id: 5, icon: <Image size={20} color="#f97316" />, service: 'Cloudinary',
    label: 'Image CDN & Optimization',
    url: 'https://cloudinary.com',
    free: 'Free tier: 25GB storage, 25GB bandwidth/month',
    color: '#f97316',
    steps: [
      'Go to cloudinary.com → Create account',
      'Dashboard → copy Cloud Name, API Key, API Secret',
      'Settings → Upload → Enable auto-format and auto-quality',
      'Create upload preset named "soukni" (unsigned for client uploads)',
    ],
    envKeys: ['NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME', 'CLOUDINARY_API_KEY', 'CLOUDINARY_API_SECRET'],
  },
  {
    id: 6, icon: <Globe size={20} color={INK} />, service: 'Vercel',
    label: 'Deployment & Edge Functions',
    url: 'https://vercel.com',
    free: 'Free tier: unlimited personal projects',
    color: INK,
    steps: [
      'Push code to GitHub',
      'Go to vercel.com → Import repository',
      'Add all environment variables from .env.local',
      'Set NEXT_PUBLIC_APP_URL to your Vercel domain',
      'Enable Edge Runtime for middleware (automatic)',
    ],
    envKeys: ['NEXT_PUBLIC_APP_URL'],
  },
]

export default function SetupPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = use(params)
  const [completed, setCompleted] = useState<number[]>([])
  const [copied, setCopied]       = useState<string | null>(null)

  const toggle = (id: number) =>
    setCompleted(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id])

  const copyKey = (key: string) => {
    navigator.clipboard?.writeText(key)
    setCopied(key)
    setTimeout(() => setCopied(null), 2000)
  }

  const pct = Math.round((completed.length / STEPS.length) * 100)

  return (
    <div style={{ background: SURFACE, minHeight: '100vh', fontFamily: FONT }}>
      <div style={{ maxWidth: '860px', margin: '0 auto', padding: '32px 24px 80px' }}>

        {/* Header */}
        <div style={{ marginBottom: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
            <Shield size={28} color={MINT} />
            <h1 style={{ fontSize: '28px', fontWeight: 900, color: INK, letterSpacing: '-0.05em' }}>
              SouKni Infrastructure Setup
            </h1>
          </div>
          <p style={{ fontSize: '14px', color: MUTED, fontWeight: 700, marginBottom: '16px' }}>
            Connect all backend services to make SouKni fully production-ready
          </p>

          {/* Progress */}
          <div style={{ background: 'white', borderRadius: '14px', padding: '16px 20px', border: '1px solid #e2eae6', display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ flex: 1, height: '8px', background: '#e2eae6', borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${pct}%`, background: `linear-gradient(90deg, ${MINT}, #0f9b8e)`, borderRadius: '4px', transition: 'width 0.4s ease' }} />
            </div>
            <span style={{ fontSize: '14px', fontWeight: 900, color: pct === 100 ? MINT : INK, whiteSpace: 'nowrap' }}>
              {completed.length}/{STEPS.length} connected
            </span>
          </div>
        </div>

        {/* Schema note */}
        <div style={{ background: '#f0fdf9', borderRadius: '14px', padding: '14px 18px', border: `1.5px solid ${MINT}`, marginBottom: '24px', display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
          <Database size={16} color={MINT} style={{ flexShrink: 0, marginTop: '1px' }} />
          <div>
            <p style={{ fontSize: '13px', fontWeight: 900, color: INK, marginBottom: '3px' }}>
              Database schema ready at <code style={{ background: '#e6f9f3', padding: '1px 6px', borderRadius: '4px', fontSize: '12px' }}>src/lib/supabase/schema.sql</code>
            </p>
            <p style={{ fontSize: '12px', color: MUTED, fontWeight: 700 }}>
              13 tables, full-text search, RLS policies, realtime triggers, rating auto-update — all ready to paste into Supabase SQL Editor.
            </p>
          </div>
        </div>

        {/* Service cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {STEPS.map(step => {
            const done = completed.includes(step.id)
            return (
              <div key={step.id} style={{ background: 'white', borderRadius: '20px', padding: '24px', border: `1.5px solid ${done ? MINT : '#e2eae6'}`, transition: 'border-color 0.2s' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '16px', marginBottom: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: `${step.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      {step.icon}
                    </div>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
                        <h3 style={{ fontSize: '16px', fontWeight: 900, color: INK, letterSpacing: '-0.03em' }}>{step.service}</h3>
                        <a href={step.url} target="_blank" rel="noopener noreferrer"
                          style={{ display: 'flex', alignItems: 'center', gap: '3px', fontSize: '11px', color: MINT, textDecoration: 'none', fontWeight: 700 }}>
                          {step.url.replace('https://', '')} <ExternalLink size={10} />
                        </a>
                      </div>
                      <p style={{ fontSize: '12px', color: MUTED, fontWeight: 700 }}>{step.label} · <span style={{ color: '#0f9b8e' }}>{step.free}</span></p>
                    </div>
                  </div>
                  <button onClick={() => toggle(step.id)}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', flexShrink: 0 }}>
                    {done
                      ? <CheckCircle size={24} color={MINT} />
                      : <Circle size={24} color="#e2eae6" />
                    }
                  </button>
                </div>

                {/* Steps */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '14px' }}>
                  {step.steps.map((s, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                      <span style={{ fontSize: '10px', fontWeight: 900, color: MINT, background: '#f0fdf9', width: '18px', height: '18px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '1px' }}>{i+1}</span>
                      <span style={{ fontSize: '12px', color: MUTED, fontWeight: 700, lineHeight: 1.5 }}>{s}</span>
                    </div>
                  ))}
                </div>

                {/* Env keys */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {step.envKeys.map(key => (
                    <button key={key} onClick={() => copyKey(key)}
                      style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '4px 10px', borderRadius: '6px', background: SURFACE, border: '1px solid #e2eae6', cursor: 'pointer', fontFamily: 'monospace', fontSize: '11px', fontWeight: 700, color: copied === key ? MINT : INK, transition: 'all 0.15s' }}>
                      {copied === key ? <Check size={10} color={MINT} /> : <Copy size={10} color={MUTED} />}
                      {key}
                    </button>
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        {/* Realtime reminder */}
        <div style={{ marginTop: '24px', background: `linear-gradient(135deg, ${INK}, #2b3230)`, borderRadius: '20px', padding: '24px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '-20px', right: '-20px', width: '100px', height: '100px', borderRadius: '50%', background: 'rgba(34,212,168,0.08)' }} />
          <p style={{ fontSize: '12px', fontWeight: 900, color: MINT, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>🔔 Supabase Realtime Reminder</p>
          <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.8)', fontWeight: 700, lineHeight: 1.6, marginBottom: '12px' }}>
            Real-time chat is already wired in <code style={{ background: 'rgba(255,255,255,0.1)', padding: '1px 6px', borderRadius: '4px' }}>src/hooks/useMessages.ts</code>.
            Once Supabase is connected, it works automatically — the hook subscribes to postgres_changes on the messages table.
          </p>
          <div style={{ background: 'rgba(34,212,168,0.1)', borderRadius: '10px', padding: '12px 14px', border: '1px solid rgba(34,212,168,0.2)' }}>
            <code style={{ fontSize: '11px', color: MINT, fontFamily: 'monospace', display: 'block', lineHeight: 1.8 }}>
              {`supabase.channel('messages:' + conversationId)`}<br />
              {`  .on('postgres_changes', { event: 'INSERT', ... }, payload => {`}<br />
              {`    setMessages(prev => [...prev, payload.new])`}<br />
              {`  }).subscribe()`}
            </code>
          </div>
          <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', fontWeight: 700, marginTop: '10px' }}>
            The setTimeout simulation in messages/page.tsx is the only file to update — zero other UI changes needed.
          </p>
        </div>

        {pct === 100 && (
          <div style={{ marginTop: '20px', background: '#f0fdf9', borderRadius: '18px', padding: '24px', border: `1.5px solid ${MINT}`, textAlign: 'center' }}>
            <p style={{ fontSize: '24px', marginBottom: '8px' }}>🎉</p>
            <h3 style={{ fontSize: '18px', fontWeight: 900, color: INK, marginBottom: '6px', letterSpacing: '-0.05em' }}>All services connected!</h3>
            <p style={{ fontSize: '13px', color: MUTED, fontWeight: 700, marginBottom: '16px' }}>SouKni is production-ready. Time to deploy.</p>
            <a href="https://vercel.com/new" target="_blank" rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 28px', borderRadius: '12px', background: INK, color: 'white', textDecoration: 'none', fontSize: '14px', fontWeight: 900 }}>
              Deploy to Vercel <ExternalLink size={14} />
            </a>
          </div>
        )}
      </div>
    </div>
  )
}
