'use client'

import Link from 'next/link'
import type { Locale } from '@/lib/types'

const marketplace = ['Motors', 'Property', 'The Vault', 'Jobs', 'Services', 'Fashion', 'Electronics']
const company = ['About Us', 'Careers', 'Press', 'Sustainability', 'Legal']
const support = ['Help Center', 'Safety Tips', 'Trust & Safety', 'Contact Us']

export default function Footer({ locale }: { locale: Locale }) {
  return (
    <footer style={{ backgroundColor: '#7a7a7a', color: 'white', paddingTop: '64px', paddingBottom: '32px', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 40px' }}>

        {/* Top: Brand + Newsletter */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', marginBottom: '48px', paddingBottom: '48px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          <div>
            <div style={{ fontSize: '22px', fontWeight: 900, color: 'white', letterSpacing: '-0.04em', marginBottom: '8px' }}>soukni</div>
            <p style={{ fontSize: '16px', fontStyle: 'italic', color: 'rgba(255,255,255,0.7)', marginBottom: '20px' }}>The Market in your Pocket</p>
            <div style={{ display: 'flex', gap: '12px' }}>
              {['📘', '𝕏', '📸', '💼', '▶'].map((icon, i) => (
                <a key={i} href="#" style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', fontSize: '16px', transition: 'background 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(45,212,191,0.3)'}
                  onMouseLeave={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.08)'}
                >{icon}</a>
              ))}
            </div>
          </div>
          <div>
            <h4 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '16px' }}>Join our Newsletter</h4>
            <div style={{ display: 'flex', gap: '12px' }}>
              <input type="email" placeholder="Enter your email" style={{ flex: 1, backgroundColor: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '10px', padding: '12px 16px', color: 'white', fontSize: '14px', outline: 'none', fontFamily: 'Inter, sans-serif' }} />
              <button style={{ backgroundColor: '#2dd4bf', color: '#00201c', border: 'none', padding: '12px 24px', borderRadius: '10px', fontWeight: 700, fontSize: '14px', cursor: 'pointer', whiteSpace: 'nowrap' }}>Subscribe</button>
            </div>
          </div>
        </div>

        {/* Middle: Links */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr 1.2fr', gap: '32px', marginBottom: '48px' }}>
          {[
            { title: 'Marketplace', links: marketplace },
            { title: 'Company', links: company },
            { title: 'Support', links: support },
            { title: 'Resources', links: ['Market Trends', 'App Download', 'Advertising'] },
          ].map(({ title, links }) => (
            <div key={title}>
              <h5 style={{ color: 'white', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '11px', marginBottom: '16px' }}>{title}</h5>
              {links.map(link => (
                <a key={link} href="#" style={{ display: 'block', fontSize: '13px', color: 'rgba(255,255,255,0.6)', textDecoration: 'none', marginBottom: '10px', transition: 'color 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#2dd4bf'}
                  onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.6)'}
                >{link}</a>
              ))}
            </div>
          ))}

          {/* App Downloads */}
          <div>
            <h5 style={{ color: 'white', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '11px', marginBottom: '16px' }}>App Downloads</h5>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                { icon: '🍎', store: 'App Store', sub: 'Download on the' },
                { icon: '▶', store: 'Google Play', sub: 'Get it on' },
                { icon: '🛍', store: 'AppGallery', sub: 'Explore on' },
                { icon: '📱', store: 'Galaxy Store', sub: 'Available on' },
              ].map(({ icon, store, sub }) => (
                <a key={store} href="#" style={{ display: 'flex', alignItems: 'center', gap: '10px', backgroundColor: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', padding: '8px 12px', borderRadius: '10px', textDecoration: 'none', transition: 'background 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.12)'}
                  onMouseLeave={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.06)'}
                >
                  <span style={{ fontSize: '20px' }}>{icon}</span>
                  <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.4 }}>{sub}<br /><b style={{ fontSize: '12px', color: 'white' }}>{store}</b></span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ display: 'flex', gap: '24px', fontSize: '12px', color: 'rgba(255,255,255,0.4)' }}>
            {['Privacy Policy', 'Terms of Service', 'Cookies'].map(link => (
              <a key={link} href="#" style={{ color: 'rgba(255,255,255,0.4)', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.color = 'white'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.4)'}
              >{link}</a>
            ))}
          </div>
          <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)' }}>© 2026 SouKni Marketplace. All rights reserved.</span>
        </div>
      </div>
    </footer>
  )
}
