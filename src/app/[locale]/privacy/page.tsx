'use client'

import { use } from 'react'
import Link from 'next/link'
import { ChevronRight, ShieldCheck } from 'lucide-react'
import Breadcrumb from '@/components/ui/Breadcrumb'

type Locale = 'en' | 'fr' | 'ar' | 'es' | 'de'

const SECTIONS = [
  {
    title: '1. Information We Collect',
    body: `We collect information you provide directly, such as your name, email, phone number, and listing content when you create an account or post an ad.

We also automatically collect certain data when you use SouKni, including device information, IP address, browser type, and usage patterns through cookies and similar technologies.`
  },
  {
    title: '2. How We Use Your Information',
    body: `We use your data to: provide and improve our services, facilitate transactions between buyers and sellers, send service-related notifications, prevent fraud and abuse, and personalize your experience on the Platform.

We do not sell your personal information to third parties for marketing purposes.`
  },
  {
    title: '3. Information Sharing',
    body: `Your contact details (phone number, name) are shared with other users only when you choose to enable contact options on your listings or initiate a conversation.

We may share data with service providers who help operate SouKni (hosting, payment processing, analytics) under strict confidentiality agreements, and with law enforcement when legally required.`
  },
  {
    title: '4. Cookies & Tracking',
    body: `SouKni uses cookies to keep you logged in, remember your preferences (such as language and currency), and analyze site traffic. You can control cookie settings through your browser, though disabling cookies may limit some features.`
  },
  {
    title: '5. Data Security',
    body: `We implement industry-standard security measures including encryption, secure servers, and access controls to protect your personal information. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.`
  },
  {
    title: '6. Your Rights',
    body: `You have the right to access, correct, or delete your personal data at any time through your account settings. You may also request a copy of your data or object to certain processing activities by contacting our support team.`
  },
  {
    title: '7. Data Retention',
    body: `We retain your personal information for as long as your account is active or as needed to provide services. Listing data may be retained for a reasonable period after deletion for fraud prevention and legal compliance purposes.`
  },
  {
    title: '8. Children\'s Privacy',
    body: `SouKni is not intended for users under 18 years of age. We do not knowingly collect personal information from minors. If we become aware that a minor has provided us with personal data, we will delete it promptly.`
  },
  {
    title: '9. Third-Party Links',
    body: `SouKni may contain links to third-party websites (such as social media or payment providers). We are not responsible for the privacy practices of these external sites.`
  },
  {
    title: '10. Changes to This Policy',
    body: `We may update this Privacy Policy periodically. We will notify users of significant changes via email or a prominent notice on the Platform. Continued use after changes constitutes acceptance.`
  },
  {
    title: '11. Contact Us',
    body: `For privacy-related questions or to exercise your data rights, please contact us at privacy@soukni.com or through our Help Center.`
  },
]

export default function PrivacyPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = use(params)

  return (
    <div style={{ background: '#f4fbf8', minHeight: '100vh', fontFamily: 'Hanken Grotesk, Inter, system-ui, sans-serif' }}>
      <div style={{ maxWidth: '820px', margin: '0 auto', padding: '40px 24px 80px' }}>

        <Breadcrumb items={[{ label: 'Home', href: `/${locale}` }, { label: 'Privacy Policy' }]} style={{ marginBottom: 28, textTransform: 'none', fontSize: 13, letterSpacing: 'normal' }} />

        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '12px' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'linear-gradient(135deg, #22d4a8, #0f9b8e)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <ShieldCheck size={22} color="white" />
          </div>
          <div>
            <h1 style={{ fontSize: '30px', fontWeight: 800, color: '#161d1b', letterSpacing: '-0.02em' }}>Privacy Policy</h1>
            <p style={{ fontSize: '13px', color: '#6b7a76', marginTop: '2px' }}>Last updated: June 2026</p>
          </div>
        </div>

        <p style={{ fontSize: '14px', color: '#6b7a76', lineHeight: 1.7, marginBottom: '32px', padding: '16px 20px', background: '#f5ede0', borderRadius: '14px' }}>
          Your privacy matters to us. This policy explains what data we collect, how we use it, and the choices you have.
        </p>

        <div style={{ background: 'white', borderRadius: '24px', padding: '32px', border: '1px solid #e2eae6', display: 'flex', flexDirection: 'column', gap: '28px' }}>
          {SECTIONS.map(s => (
            <div key={s.title}>
              <h2 style={{ fontSize: '16px', fontWeight: 800, color: '#161d1b', marginBottom: '10px' }}>{s.title}</h2>
              <p style={{ fontSize: '14px', color: '#3c4a46', lineHeight: 1.75, whiteSpace: 'pre-line' }}>{s.body}</p>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginTop: '32px' }}>
          <Link href={`/${locale}/terms`} style={{ fontSize: '13px', fontWeight: 700, color: '#22d4a8', textDecoration: 'none' }}>Terms of Service</Link>
          <span style={{ color: '#e2eae6' }}>·</span>
          <Link href={`/${locale}/about`} style={{ fontSize: '13px', fontWeight: 700, color: '#22d4a8', textDecoration: 'none' }}>About Us</Link>
        </div>
      </div>
    </div>
  )
}
