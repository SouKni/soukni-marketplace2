'use client'

import { use } from 'react'
import Link from 'next/link'
import { ChevronRight, FileText } from 'lucide-react'

type Locale = 'en' | 'fr' | 'ar' | 'es' | 'de'

const SECTIONS = [
  {
    title: '1. Acceptance of Terms',
    body: `By accessing or using SouKni ("the Platform"), you agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree to these terms, please do not use the Platform.

SouKni reserves the right to modify these terms at any time. Continued use of the Platform after changes constitutes acceptance of the revised terms.`
  },
  {
    title: '2. Eligibility',
    body: `You must be at least 18 years old to create an account and post listings on SouKni. By using the Platform, you represent that you meet this requirement and that all information you provide is accurate and current.`
  },
  {
    title: '3. User Accounts',
    body: `You are responsible for maintaining the confidentiality of your account credentials and for all activities under your account. Notify us immediately of any unauthorized use of your account.

Each user may only maintain one active account unless explicitly approved by SouKni for business purposes (Pro accounts).`
  },
  {
    title: '4. Posting Listings',
    body: `All listings must be accurate, truthful, and comply with Moroccan law. Prohibited items include but are not limited to: weapons, illegal drugs, counterfeit goods, stolen property, and items violating intellectual property rights.

SouKni reserves the right to remove any listing that violates these terms without prior notice. Repeated violations may result in account suspension or termination.`
  },
  {
    title: '5. Transactions Between Users',
    body: `SouKni is a platform that connects buyers and sellers. We are not a party to any transaction between users and do not guarantee the quality, safety, or legality of items listed.

Users are solely responsible for verifying the legitimacy of listings and counterparties before completing any transaction. We strongly recommend meeting in public places and inspecting items before payment.`
  },
  {
    title: '6. Diamond Membership & Paid Services',
    body: `SouKni offers optional paid features including Diamond Membership, ad boosts, and featured listings. These services are subject to separate pricing terms displayed at the time of purchase.

Subscriptions auto-renew unless cancelled before the renewal date. Refunds are handled on a case-by-case basis in accordance with our refund policy.`
  },
  {
    title: '7. Prohibited Conduct',
    body: `Users may not: harass or threaten other users, post fraudulent listings, manipulate ratings or reviews, scrape or copy Platform data, or attempt to circumvent SouKni's fee structure by conducting off-platform transactions initiated through the Platform.`
  },
  {
    title: '8. Intellectual Property',
    body: `All content on SouKni, including the logo, design, and software, is the property of SouKni and protected by Moroccan and international intellectual property law. Users retain ownership of content they post but grant SouKni a license to display it on the Platform.`
  },
  {
    title: '9. Limitation of Liability',
    body: `SouKni is provided "as is" without warranties of any kind. To the maximum extent permitted by law, SouKni shall not be liable for any indirect, incidental, or consequential damages arising from your use of the Platform.`
  },
  {
    title: '10. Termination',
    body: `SouKni reserves the right to suspend or terminate any account that violates these Terms of Service, at our sole discretion and without prior notice.`
  },
  {
    title: '11. Governing Law',
    body: `These Terms are governed by the laws of the Kingdom of Morocco. Any disputes arising from the use of SouKni shall be subject to the exclusive jurisdiction of the courts of Rabat.`
  },
  {
    title: '12. Contact Us',
    body: `For questions regarding these Terms of Service, please contact us through our Help Center or at legal@soukni.com.`
  },
]

export default function TermsPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = use(params)

  return (
    <div style={{ background: '#f4fbf8', minHeight: '100vh', fontFamily: 'Hanken Grotesk, Inter, system-ui, sans-serif' }}>
      <div style={{ maxWidth: '820px', margin: '0 auto', padding: '40px 24px 80px' }}>

        {/* Breadcrumb */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '28px' }}>
          <Link href={`/${locale}`} style={{ fontSize: '13px', color: '#6b7a76', textDecoration: 'none' }}>Home</Link>
          <ChevronRight size={13} color="#6b7a76" />
          <span style={{ fontSize: '13px', fontWeight: 700, color: '#161d1b' }}>Terms of Service</span>
        </nav>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '12px' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'linear-gradient(135deg, #22d4a8, #0f9b8e)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <FileText size={22} color="white" />
          </div>
          <div>
            <h1 style={{ fontSize: '30px', fontWeight: 800, color: '#161d1b', letterSpacing: '-0.02em' }}>Terms of Service</h1>
            <p style={{ fontSize: '13px', color: '#6b7a76', marginTop: '2px' }}>Last updated: June 2026</p>
          </div>
        </div>

        <p style={{ fontSize: '14px', color: '#6b7a76', lineHeight: 1.7, marginBottom: '32px', padding: '16px 20px', background: '#f5ede0', borderRadius: '14px' }}>
          Please read these Terms of Service carefully before using SouKni. They govern your access to and use of our marketplace platform.
        </p>

        {/* Sections */}
        <div style={{ background: 'white', borderRadius: '24px', padding: '32px', border: '1px solid #e2eae6', display: 'flex', flexDirection: 'column', gap: '28px' }}>
          {SECTIONS.map(s => (
            <div key={s.title}>
              <h2 style={{ fontSize: '16px', fontWeight: 800, color: '#161d1b', marginBottom: '10px' }}>{s.title}</h2>
              <p style={{ fontSize: '14px', color: '#3c4a46', lineHeight: 1.75, whiteSpace: 'pre-line' }}>{s.body}</p>
            </div>
          ))}
        </div>

        {/* Footer links */}
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginTop: '32px' }}>
          <Link href={`/${locale}/privacy`} style={{ fontSize: '13px', fontWeight: 700, color: '#22d4a8', textDecoration: 'none' }}>Privacy Policy</Link>
          <span style={{ color: '#e2eae6' }}>·</span>
          <Link href={`/${locale}/about`} style={{ fontSize: '13px', fontWeight: 700, color: '#22d4a8', textDecoration: 'none' }}>About Us</Link>
        </div>
      </div>
    </div>
  )
}
