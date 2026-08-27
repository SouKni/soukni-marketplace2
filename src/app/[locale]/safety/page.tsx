'use client'

import { use } from 'react'
import Link from 'next/link'
import { Shield, AlertTriangle, CheckCircle, XCircle, MapPin, CreditCard, MessageCircle, Eye, Phone, Lock, Users, ChevronRight, ExternalLink } from 'lucide-react'
import Breadcrumb from '@/components/ui/Breadcrumb'

type Locale = 'en' | 'fr' | 'ar' | 'es' | 'de'

const HG = "'Hanken Grotesk', Inter, system-ui, sans-serif"

const TIPS = [
  {
    icon: <MapPin size={24} color="#22d4a8" />,
    title: 'Always Meet in Public',
    color: '#22d4a8',
    dos: [
      'Meet in busy, well-lit public places — shopping malls, cafés, police station car parks',
      'Bring a friend or family member when possible',
      'Tell someone where you\'re going and who you\'re meeting',
      'Meet during daylight hours for large transactions',
    ],
    donts: [
      'Never invite strangers to your home for a first meeting',
      'Never agree to meet in isolated or unfamiliar locations',
      'Never meet late at night for high-value items',
    ],
  },
  {
    icon: <CreditCard size={24} color="#22d4a8" />,
    title: 'Safe Payment Practices',
    color: '#22d4a8',
    dos: [
      'Pay cash on collection after inspecting the item in person',
      'Count and verify banknotes before completing the transaction',
      'Get a receipt or written confirmation for high-value items',
      'Use our in-app escrow service (coming soon) for extra protection',
    ],
    donts: [
      'Never send money via bank transfer before receiving the item',
      'Never pay via recharge cards, gift cards, or crypto to a stranger',
      'Never pay a "deposit" to reserve an item without a signed contract',
      'Never pay for something you haven\'t seen in person',
    ],
  },
  {
    icon: <Eye size={24} color="#22d4a8" />,
    title: 'Inspect Before You Pay',
    color: '#22d4a8',
    dos: [
      'Test electronics before paying — check screens, ports, cameras, battery',
      'Check vehicle history and take cars for a test drive',
      'Verify serial numbers match documents for phones and laptops',
      'Ask for original receipts, warranties, or import documents',
    ],
    donts: [
      'Never pay without physically inspecting the item first',
      'Never accept sealed boxes without checking the contents',
      'Never skip checking vehicle registration and ownership documents',
    ],
  },
  {
    icon: <MessageCircle size={24} color="#22d4a8" />,
    title: 'Communicate Safely',
    color: '#22d4a8',
    dos: [
      'Use SouKni\'s built-in messaging for a paper trail',
      'Keep all communication on the platform before you trust the seller',
      'Trust your instincts — if something feels off, walk away',
      'Report suspicious messages using the flag button',
    ],
    donts: [
      'Never share your bank account details via chat',
      'Never click suspicious links sent by sellers or buyers',
      'Never share your OTP or password with anyone, ever',
    ],
  },
  {
    icon: <Lock size={24} color="#22d4a8" />,
    title: 'Protect Your Account',
    color: '#22d4a8',
    dos: [
      'Use a strong, unique password for your SouKni account',
      'Enable two-factor authentication in Security settings',
      'Log out from shared devices',
      'Review active sessions regularly in your account settings',
    ],
    donts: [
      'Never share your login credentials with anyone',
      'Never use the same password across multiple websites',
      'SouKni will never ask for your password by phone or email',
    ],
  },
  {
    icon: <Users size={24} color="#22d4a8" />,
    title: 'Spot Scams & Fake Listings',
    color: '#22d4a8',
    dos: [
      'Look for the 💎 SouKni Certified badge — it means the seller\'s identity is verified',
      'Check the seller\'s profile, rating, and review history',
      'If the price seems too good to be true, it probably is',
      'Reverse-image search listing photos to check for copied content',
    ],
    donts: [
      'Never trust listings with vague descriptions or stock photos',
      'Never deal with sellers who refuse to meet in person',
      'Never accept "I\'m abroad, my agent will deliver" stories',
      'Never wire money internationally for local marketplace items',
    ],
  },
]

const RED_FLAGS = [
  'Seller refuses to meet in person',
  'Price is unrealistically low',
  'Asks you to pay via gift cards or crypto',
  'Photos look like stock images',
  'Urgent pressure to decide immediately',
  'Poor grammar or copy-paste replies',
  'Asks for your bank details via chat',
  'Profile created very recently with no reviews',
]

export default function SafetyPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = use(params)

  return (
    <div style={{ background: '#f4fbf8', minHeight: '100vh', fontFamily: HG }}>

      {/* HERO */}
      <div style={{ background: 'linear-gradient(160deg, #161d1b 0%, #1a2e28 100%)', padding: '64px 24px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.1, backgroundImage: 'radial-gradient(circle at 20% 50%, #22d4a8 0%, transparent 50%)' }} />
        <div style={{ maxWidth: '720px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <div style={{ width: '64px', height: '64px', borderRadius: '20px', background: 'rgba(34,212,168,0.15)', border: '1px solid rgba(34,212,168,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
            <Shield size={28} color="#22d4a8" />
          </div>
          <h1 style={{ fontSize: '44px', fontWeight: 900, color: 'white', letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: '16px' }}>
            Stay Safe on SouKni
          </h1>
          <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, maxWidth: '520px', margin: '0 auto 28px' }}>
            SouKni connects real people across Morocco. Follow these guidelines to buy and sell with confidence.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '24px', flexWrap: 'wrap' }}>
            {[
              { icon: <Shield size={15} />, text: 'SouKni Certified sellers' },
              { icon: <Eye size={15} />, text: '24/7 listing monitoring' },
              { icon: <Phone size={15} />, text: 'Safety team available' },
            ].map(b => (
              <div key={b.text} style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'rgba(255,255,255,0.6)', fontSize: '13px', fontWeight: 700 }}>
                <span style={{ color: '#22d4a8' }}>{b.icon}</span> {b.text}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* BREADCRUMB */}
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '20px 24px 0' }}>
        <Breadcrumb items={[{ label: 'Home', href: `/${locale}` }, { label: 'Help', href: `/${locale}/help` }, { label: 'Safety Tips' }]} style={{ textTransform: 'none', fontSize: 13, letterSpacing: 'normal', marginBottom: 0 }} />
      </div>

      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '40px 24px 80px' }}>

        {/* RED FLAGS BANNER */}
        <div style={{ background: '#fff5f0', border: '1.5px solid #f97316', borderRadius: '20px', padding: '24px 28px', marginBottom: '48px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <AlertTriangle size={20} color="#f97316" />
            <h2 style={{ fontSize: '16px', fontWeight: 900, color: '#f97316', letterSpacing: '-0.03em' }}>Red Flags — Walk Away Immediately</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
            {RED_FLAGS.map(flag => (
              <div key={flag} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <XCircle size={14} color="#f97316" style={{ flexShrink: 0 }} />
                <span style={{ fontSize: '13px', color: '#161d1b', fontWeight: 700 }}>{flag}</span>
              </div>
            ))}
          </div>
        </div>

        {/* TIPS SECTIONS */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '48px' }}>
          {TIPS.map(tip => (
            <div key={tip.title} style={{ background: 'white', borderRadius: '20px', padding: '28px', border: '1px solid #e2eae6' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: '#f0fdf9', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  {tip.icon}
                </div>
                <h3 style={{ fontSize: '18px', fontWeight: 900, color: '#161d1b', letterSpacing: '-0.03em' }}>{tip.title}</h3>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                {/* DOs */}
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '12px' }}>
                    <CheckCircle size={14} color="#22d4a8" />
                    <span style={{ fontSize: '11px', fontWeight: 900, color: '#22d4a8', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Do</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {tip.dos.map(d => (
                      <div key={d} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                        <div style={{ width: '16px', height: '16px', borderRadius: '50%', background: '#f0fdf9', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '1px' }}>
                          <CheckCircle size={10} color="#22d4a8" />
                        </div>
                        <span style={{ fontSize: '13px', color: '#3c4a46', lineHeight: 1.5, fontWeight: 600 }}>{d}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* DON'Ts */}
                <div style={{ background: '#fff8f6', borderRadius: '12px', padding: '14px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '12px' }}>
                    <XCircle size={14} color="#f97316" />
                    <span style={{ fontSize: '11px', fontWeight: 900, color: '#f97316', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Don't</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {tip.donts.map(d => (
                      <div key={d} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                        <XCircle size={12} color="#f97316" style={{ flexShrink: 0, marginTop: '2px' }} />
                        <span style={{ fontSize: '13px', color: '#6b7a76', lineHeight: 1.5, fontWeight: 600 }}>{d}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* SOUKNI CERTIFIED SECTION */}
        <div style={{ background: 'linear-gradient(135deg, #161d1b, #1a2e28)', borderRadius: '24px', padding: '36px', marginBottom: '32px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, opacity: 0.08, backgroundImage: 'radial-gradient(circle at 80% 50%, #22d4a8 0%, transparent 50%)' }} />
          <div style={{ position: 'relative', zIndex: 1, display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: '280px' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(34,212,168,0.15)', border: '1px solid rgba(34,212,168,0.3)', color: '#22d4a8', fontSize: '11px', fontWeight: 900, padding: '6px 14px', borderRadius: '100px', marginBottom: '16px', letterSpacing: '0.05em' }}>
                💎 SOUKNI CERTIFIED
              </div>
              <h3 style={{ fontSize: '22px', fontWeight: 900, color: 'white', letterSpacing: '-0.03em', marginBottom: '10px' }}>
                Buy with more confidence
              </h3>
              <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, marginBottom: '20px' }}>
                SouKni Certified sellers have had their phone, national ID (CIN), and identity verified by our trust team. Look for the 💎 badge on listings and profiles.
              </p>
              <Link href={`/${locale}/diamond`} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#22d4a8', color: 'white', padding: '11px 22px', borderRadius: '12px', textDecoration: 'none', fontSize: '13px', fontWeight: 900 }}>
                Get SouKni Certified <ExternalLink size={13} />
              </Link>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', minWidth: '200px' }}>
              {[
                '✓ Phone number verified',
                '✓ National ID (CIN) confirmed',
                '✓ Real selfie cross-checked',
                '✓ Address validated',
                '✓ No fraud history',
              ].map(item => (
                <div key={item} style={{ fontSize: '13px', fontWeight: 700, color: 'rgba(255,255,255,0.8)' }}>{item}</div>
              ))}
            </div>
          </div>
        </div>

        {/* REPORT + EMERGENCY */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div style={{ background: 'white', borderRadius: '20px', padding: '24px', border: '1px solid #e2eae6' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
              <AlertTriangle size={18} color="#f97316" />
              <h3 style={{ fontSize: '15px', fontWeight: 900, color: '#161d1b', letterSpacing: '-0.03em' }}>Report a Problem</h3>
            </div>
            <p style={{ fontSize: '13px', color: '#6b7a76', lineHeight: 1.6, marginBottom: '16px' }}>
              If you encounter a suspicious listing, fake seller, or scam attempt, report it immediately.
            </p>
            <Link href={`/${locale}/help`} style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#f97316', fontSize: '13px', fontWeight: 900, textDecoration: 'none' }}>
              Go to Help Center <ChevronRight size={14} />
            </Link>
          </div>
          <div style={{ background: '#f0fdf9', borderRadius: '20px', padding: '24px', border: '1.5px solid #22d4a8' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
              <Phone size={18} color="#22d4a8" />
              <h3 style={{ fontSize: '15px', fontWeight: 900, color: '#161d1b', letterSpacing: '-0.03em' }}>Safety Team</h3>
            </div>
            <p style={{ fontSize: '13px', color: '#6b7a76', lineHeight: 1.6, marginBottom: '16px' }}>
              Our safety team is available 7 days a week for urgent issues.
            </p>
            <a href="mailto:safety@soukni.com" style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#22d4a8', fontSize: '13px', fontWeight: 900, textDecoration: 'none' }}>
              safety@soukni.com <ExternalLink size={13} />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
