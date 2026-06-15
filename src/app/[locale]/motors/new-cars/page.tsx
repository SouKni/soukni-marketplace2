'use client'
import React from 'react'
import Link from 'next/link'

export default function NewCarsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = React.use(params)
  return (
    <div style={{ fontFamily: 'Inter, system-ui, sans-serif', backgroundColor: '#f4fbf8', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '32px 24px 80px' }}>
        <nav style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#64748b', marginBottom: '24px' }}>
          <Link href={`/${locale}`} style={{ color: '#2dd4bf', textDecoration: 'none', fontWeight: 600 }}>Home</Link>
          <span>›</span>
          <Link href={`/${locale}/motors`} style={{ color: '#2dd4bf', textDecoration: 'none', fontWeight: 600 }}>Motors</Link>
          <span>›</span>
          <span style={{ color: '#0f172a', fontWeight: 700 }}>New Cars</span>
        </nav>
        <h1 style={{ fontSize: '32px', fontWeight: 800, color: '#0f172a', marginBottom: '8px' }}>New Cars in Morocco</h1>
        <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '32px' }}>Browse brand new vehicles from official dealers across Morocco</p>
        <div style={{ backgroundColor: 'white', borderRadius: '32px', padding: '64px', textAlign: 'center', border: '1px solid #f1f5f9' }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>🚗</div>
          <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>Coming Soon</h2>
          <p style={{ color: '#64748b' }}>New car listings from certified dealers are being added. Check back soon!</p>
          <Link href={`/${locale}/motors`} style={{ display: 'inline-block', marginTop: '24px', backgroundColor: '#2dd4bf', color: 'white', padding: '12px 28px', borderRadius: '100px', textDecoration: 'none', fontWeight: 700, fontSize: '14px' }}>← Back to Motors</Link>
        </div>
      </div>
    </div>
  )
}
