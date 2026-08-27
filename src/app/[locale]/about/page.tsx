'use client'

import { use } from 'react'
import Link from 'next/link'
import { ChevronRight, MapPin, Users, Package, Shield, Heart, Sparkles } from 'lucide-react'
import Breadcrumb from '@/components/ui/Breadcrumb'

type Locale = 'en' | 'fr' | 'ar' | 'es' | 'de'

const STATS = [
  { value: '2M+', label: 'Active Users' },
  { value: '500K+', label: 'Listings' },
  { value: '50+', label: 'Cities' },
  { value: '2021', label: 'Founded' },
]

const VALUES = [
  { icon: <Shield size={22} color="white" />, title: 'Trust & Safety', text: 'Every Diamond seller is verified. We actively monitor listings to keep our marketplace honest and secure.' },
  { icon: <Heart size={22} color="white" />, title: 'Community First', text: "We're built for Moroccans, by people who understand the local market — from Tangier to Laâyoune." },
  { icon: <Sparkles size={22} color="white" />, title: 'Always Improving', text: 'New features ship constantly based on what our buyers and sellers actually need, not assumptions.' },
]

const TEAM = [
  { name: 'Founder & CEO', initials: 'FC' },
  { name: 'Head of Product', initials: 'HP' },
  { name: 'Head of Trust & Safety', initials: 'TS' },
  { name: 'Head of Growth', initials: 'HG' },
]

export default function AboutPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = use(params)

  return (
    <div style={{ background: '#f4fbf8', minHeight: '100vh', fontFamily: 'Hanken Grotesk, Inter, system-ui, sans-serif' }}>

      {/* HERO */}
      <div style={{ background: 'linear-gradient(135deg, #161d1b 0%, #2b3230 100%)', padding: '64px 24px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.15, backgroundImage: 'radial-gradient(circle at 20% 30%, #22d4a8 0%, transparent 50%), radial-gradient(circle at 80% 70%, #22d4a8 0%, transparent 50%)' }} />
        <div style={{ maxWidth: '780px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <span style={{ display: 'inline-block', background: 'rgba(34,212,168,0.15)', color: '#22d4a8', fontSize: '12px', fontWeight: 700, padding: '6px 16px', borderRadius: '100px', marginBottom: '20px', letterSpacing: '0.05em' }}>
            ABOUT SOUKNI
          </span>
          <h1 style={{ fontSize: '40px', fontWeight: 800, color: 'white', letterSpacing: '-0.03em', lineHeight: 1.15, marginBottom: '16px' }}>
            Morocco's Marketplace,<br />Built for Trust
          </h1>
          <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.7, maxWidth: '560px', margin: '0 auto' }}>
            SouKni connects buyers and sellers across Morocco — from cars and real estate to electronics, fashion, and rare collectibles — with a simple promise: real listings, real people, real trust.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 24px 80px' }}>

        {/* Breadcrumb */}
        <Breadcrumb items={[{ label: 'Home', href: `/${locale}` }, { label: 'About Us' }]} style={{ margin: '24px 0', position: 'relative', zIndex: 10, textTransform: 'none', fontSize: 13, letterSpacing: 'normal' }} />

        {/* STATS */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px', marginBottom: '48px', marginTop: '-32px' }}>
          {STATS.map(s => (
            <div key={s.label} style={{ background: 'white', borderRadius: '20px', padding: '24px 16px', textAlign: 'center', border: '1px solid #e2eae6', boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
              <p style={{ fontSize: '26px', fontWeight: 800, color: '#22d4a8', letterSpacing: '-0.02em' }}>{s.value}</p>
              <p style={{ fontSize: '12px', color: '#6b7a76', fontWeight: 600, marginTop: '4px' }}>{s.label}</p>
            </div>
          ))}
        </div>

        {/* STORY */}
        <div style={{ background: 'white', borderRadius: '24px', padding: '36px', border: '1px solid #e2eae6', marginBottom: '32px' }}>
          <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#161d1b', marginBottom: '16px', letterSpacing: '-0.02em' }}>Our Story</h2>
          <p style={{ fontSize: '14px', color: '#3c4a46', lineHeight: 1.8, marginBottom: '14px' }}>
            SouKni started with a simple frustration: buying and selling online in Morocco felt clunky, untrustworthy, and outdated. Fake listings, unresponsive sellers, and clunky interfaces made what should be exciting — finding your next car, home, or treasure — feel like a chore.
          </p>
          <p style={{ fontSize: '14px', color: '#3c4a46', lineHeight: 1.8, marginBottom: '14px' }}>
            We built SouKni — "The Market in Your Pocket" — to fix that. A marketplace that feels as premium as the items on it, where Diamond-verified sellers stand out, where every listing tells a real story, and where buyers can trust what they see.
          </p>
          <p style={{ fontSize: '14px', color: '#3c4a46', lineHeight: 1.8 }}>
            Today, SouKni serves communities across more than 50 Moroccan cities — from Rabat's Agdal to Marrakech's Gueliz — connecting people around what they value most.
          </p>
        </div>

        {/* VALUES */}
        <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#161d1b', marginBottom: '20px', letterSpacing: '-0.02em' }}>What We Stand For</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '48px' }}>
          {VALUES.map(v => (
            <div key={v.title} style={{ background: 'white', borderRadius: '20px', padding: '24px', border: '1px solid #e2eae6' }}>
              <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'linear-gradient(135deg, #22d4a8, #0f9b8e)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '14px' }}>
                {v.icon}
              </div>
              <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#161d1b', marginBottom: '8px' }}>{v.title}</h3>
              <p style={{ fontSize: '13px', color: '#6b7a76', lineHeight: 1.6 }}>{v.text}</p>
            </div>
          ))}
        </div>

        {/* TEAM */}
        <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#161d1b', marginBottom: '20px', letterSpacing: '-0.02em' }}>Built by a Moroccan Team</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '48px' }}>
          {TEAM.map(t => (
            <div key={t.name} style={{ background: 'white', borderRadius: '20px', padding: '24px 16px', textAlign: 'center', border: '1px solid #e2eae6' }}>
              <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'linear-gradient(135deg, #22d4a8, #0f9b8e)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
                <span style={{ color: 'white', fontWeight: 800, fontSize: '16px' }}>{t.initials}</span>
              </div>
              <p style={{ fontSize: '13px', fontWeight: 700, color: '#161d1b' }}>{t.name}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ background: 'linear-gradient(135deg, #161d1b, #2b3230)', borderRadius: '24px', padding: '40px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '22px', fontWeight: 800, color: 'white', marginBottom: '12px' }}>Join the SouKni Community</h2>
          <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.65)', marginBottom: '24px', maxWidth: '440px', margin: '0 auto 24px' }}>
            Start buying and selling on Morocco's most trusted marketplace today.
          </p>
          <Link href={`/${locale}/auth`} style={{ display: 'inline-block', background: '#22d4a8', color: 'white', padding: '13px 32px', borderRadius: '12px', textDecoration: 'none', fontSize: '14px', fontWeight: 700 }}>
            Create Free Account
          </Link>
        </div>
      </div>
    </div>
  )
}
