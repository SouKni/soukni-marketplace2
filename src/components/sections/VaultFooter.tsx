'use client'
import Link from 'next/link'
import { Send } from 'lucide-react'
import type { Locale } from '@/lib/types'

interface VaultFooterProps {
  locale: Locale
}

export default function VaultFooter({ locale }: VaultFooterProps) {
  return (
    <footer style={{ backgroundColor: '#7A7A7A', color: 'white', padding: '64px 40px 32px' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>

        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr 1fr 1.2fr', gap: '40px', marginBottom: '48px' }}>

          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
              <div style={{ width: '32px', height: '32px', backgroundColor: '#2dd4bf', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ color: 'white', fontWeight: 900, fontSize: '14px' }}>S</span>
              </div>
              <span style={{ fontSize: '20px', fontWeight: 700 }}>SouKni</span>
            </div>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px', lineHeight: 1.6, marginBottom: '20px' }}>Morocco's leading marketplace for buying and selling cars, property, fashion, electronics and rare collectibles in The Vault.</p>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px', lineHeight: 1.6 }}>Hay Riad, Avenue Annakhil<br />Rabat, Morocco</p>
          </div>

          {/* Vault Categories */}
          <div>
            <h4 style={{ fontWeight: 700, marginBottom: '20px', textTransform: 'uppercase', fontSize: '12px', color: 'rgba(255,255,255,0.6)', letterSpacing: '0.1em' }}>The Vault</h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '14px', listStyle: 'none', padding: 0 }}>
              <li><Link href={`/${locale}/jewelry-watches`} style={{ color: 'rgba(255,255,255,0.85)', textDecoration: 'none' }}>Jewelry & Watches</Link></li>
              <li><Link href={`/${locale}/musical-instruments`} style={{ color: 'rgba(255,255,255,0.85)', textDecoration: 'none' }}>Musical Instruments</Link></li>
              <li><Link href={`/${locale}/home-garden`} style={{ color: 'rgba(255,255,255,0.85)', textDecoration: 'none' }}>Home & Garden</Link></li>
              <li><Link href={`/${locale}/gaming`} style={{ color: 'rgba(255,255,255,0.85)', textDecoration: 'none' }}>Gaming</Link></li>
              <li><Link href={`/${locale}/baby-items`} style={{ color: 'rgba(255,255,255,0.85)', textDecoration: 'none' }}>Baby Items</Link></li>
              <li><Link href={`/${locale}/pets-accessories`} style={{ color: 'rgba(255,255,255,0.85)', textDecoration: 'none' }}>Pets & Accessories</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 style={{ fontWeight: 700, marginBottom: '20px', textTransform: 'uppercase', fontSize: '12px', color: 'rgba(255,255,255,0.6)', letterSpacing: '0.1em' }}>Company</h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '14px', listStyle: 'none', padding: 0 }}>
              {['About Us', 'Careers', 'Press', 'Blog'].map(l => (
                <li key={l}><a href="#" style={{ color: 'rgba(255,255,255,0.85)', textDecoration: 'none' }}>{l}</a></li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 style={{ fontWeight: 700, marginBottom: '20px', textTransform: 'uppercase', fontSize: '12px', color: 'rgba(255,255,255,0.6)', letterSpacing: '0.1em' }}>Support</h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '14px', listStyle: 'none', padding: 0 }}>
              {['Help Center', 'Safety Tips', 'Contact Us', 'Buyer Protection'].map(l => (
                <li key={l}><a href="#" style={{ color: 'rgba(255,255,255,0.85)', textDecoration: 'none' }}>{l}</a></li>
              ))}
            </ul>
            <p style={{ color: '#62fae3', fontWeight: 700, fontSize: '13px', marginTop: '16px' }}>+212 (0) 537 000 000</p>
          </div>

          {/* Newsletter + App */}
          <div>
            <h4 style={{ fontWeight: 700, marginBottom: '20px', textTransform: 'uppercase', fontSize: '12px', color: 'rgba(255,255,255,0.6)', letterSpacing: '0.1em' }}>Stay Updated</h4>
            <div style={{ display: 'flex', marginBottom: '20px' }}>
              <input placeholder="Email address" style={{ flex: 1, backgroundColor: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '100px 0 0 100px', padding: '11px 14px', color: 'white', outline: 'none', fontFamily: 'inherit', fontSize: '13px', minWidth: 0 }} />
              <button style={{ backgroundColor: '#2dd4bf', border: 'none', borderRadius: '0 100px 100px 0', padding: '11px 16px', cursor: 'pointer', display: 'flex', alignItems: 'center', flexShrink: 0 }}>
                <Send size={16} color="#00201c" />
              </button>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <div style={{ backgroundColor: 'rgba(0,0,0,0.25)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '8px', padding: '8px 12px', fontSize: '11px', fontWeight: 700, flex: 1, textAlign: 'center' }}>App Store</div>
              <div style={{ backgroundColor: 'rgba(0,0,0,0.25)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '8px', padding: '8px 12px', fontSize: '11px', fontWeight: 700, flex: 1, textAlign: 'center' }}>Google Play</div>
            </div>
          </div>
        </div>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.15)', paddingTop: '24px', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '16px' }}>
          <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)' }}>© 2026 SouKni Morocco. All rights reserved.</p>
          <div style={{ display: 'flex', gap: '24px' }}>
            {['Privacy Policy', 'Terms of Service', 'Cookies'].map(l => (
              <a key={l} href="#" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none', fontSize: '13px' }}>{l}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
