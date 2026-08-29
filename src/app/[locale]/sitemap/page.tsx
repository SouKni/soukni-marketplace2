'use client'

import { use } from 'react'
import Link from 'next/link'
import { Map } from 'lucide-react'
import Breadcrumb from '@/components/ui/Breadcrumb'
import { CATEGORIES } from '@/lib/categories'

type Locale = 'en' | 'fr' | 'ar' | 'es' | 'de'

const MINT  = '#22d4a8'
const INK   = '#161d1b'
const MUTED = '#6b7a76'
const SURFACE = '#f4fbf8'

export default function SitemapPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = use(params)

  const groups: { title: string; links: { label: string; href: string }[] }[] = [
    {
      title: 'Marketplace',
      links: [
        { label: 'Home', href: `/${locale}` },
        { label: 'Search', href: `/${locale}/search` },
        ...CATEGORIES.map(c => ({ label: c.label, href: `/${locale}/${c.slug}` })),
        { label: 'Jobs', href: `/${locale}/jobs` },
        { label: 'Services', href: `/${locale}/services` },
      ],
    },
    {
      title: 'Your Account',
      links: [
        { label: 'My Account', href: `/${locale}/account` },
        { label: 'My Ads', href: `/${locale}/account/my-ads` },
        { label: 'Post an Ad', href: `/${locale}/post-ad` },
        { label: 'Quick List', href: `/${locale}/sell/quick` },
        { label: 'Messages', href: `/${locale}/messages` },
        { label: 'Favorites', href: `/${locale}/favorites` },
        { label: 'Notifications', href: `/${locale}/notifications` },
        { label: 'Diamond Membership', href: `/${locale}/diamond` },
      ],
    },
    {
      title: 'Company & Support',
      links: [
        { label: 'About Us', href: `/${locale}/about` },
        { label: 'Help Center', href: `/${locale}/help` },
        { label: 'Safety & Trust Center', href: `/${locale}/safety` },
        { label: 'Contact Us', href: `/${locale}/contact` },
      ],
    },
    {
      title: 'Legal',
      links: [
        { label: 'Terms of Service', href: `/${locale}/terms` },
        { label: 'Privacy Policy', href: `/${locale}/privacy` },
        { label: 'Cookie Policy', href: `/${locale}/privacy#cookies` },
      ],
    },
  ]

  return (
    <div style={{ background: SURFACE, minHeight: '100vh', fontFamily: 'Hanken Grotesk, Inter, system-ui, sans-serif' }}>
      <div style={{ maxWidth: '820px', margin: '0 auto', padding: '40px 24px 80px' }}>

        <Breadcrumb items={[{ label: 'Home', href: `/${locale}` }, { label: 'Sitemap' }]} style={{ marginBottom: 28, textTransform: 'none', fontSize: 13, letterSpacing: 'normal' }} />

        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '28px' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: `linear-gradient(135deg, ${MINT}, #0f9b8e)`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Map size={22} color="white" />
          </div>
          <div>
            <h1 style={{ fontSize: '30px', fontWeight: 800, color: INK, letterSpacing: '-0.02em' }}>Sitemap</h1>
            <p style={{ fontSize: '13px', color: MUTED, marginTop: '2px' }}>Every section of SouKni, in one place.</p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
          {groups.map(group => (
            <div key={group.title} style={{ background: 'white', borderRadius: '20px', padding: '24px', border: '1px solid #e2eae6' }}>
              <h2 style={{ fontSize: '13px', fontWeight: 800, color: MUTED, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '14px' }}>{group.title}</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '9px' }}>
                {group.links.map(link => (
                  <Link key={link.href + link.label} href={link.href}
                    style={{ fontSize: '14px', color: INK, textDecoration: 'none', fontWeight: 600 }}
                    onMouseEnter={e => e.currentTarget.style.color = MINT}
                    onMouseLeave={e => e.currentTarget.style.color = INK}>
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
