'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Bell, Heart, Menu, X, ChevronDown, Search } from 'lucide-react'
import CityPicker from '@/components/ui/CityPicker'
import { useRouter } from 'next/navigation'
import type { Locale } from '@/lib/types'
import { useMarket, type Currency } from '@/context/MarketContext'

const verticals = [
  { key: 'motors', slug: 'motors', label: { en: 'Motors', fr: 'Voitures', ar: 'سيارات', es: 'Motores', de: 'Motoren' } },
  { key: 'property', slug: 'property', label: { en: 'Property', fr: 'Immobilier', ar: 'عقارات', es: 'Propiedad', de: 'Immobilien' } },
  { key: 'vault', slug: 'vault', label: { en: 'The Vault', fr: 'Le Vault', ar: 'الخزنة', es: 'El Vault', de: 'Der Vault' } },
  { key: 'fashion', slug: 'fashion', label: { en: 'Fashion', fr: 'Mode', ar: 'موضة', es: 'Moda', de: 'Mode' } },
  { key: 'jobs', slug: 'jobs', label: { en: 'Jobs', fr: 'Emplois', ar: 'وظائف', es: 'Empleo', de: 'Jobs' } },
  { key: 'electronics', slug: 'electronics', label: { en: 'Mobiles & Electronics', fr: 'Électronique', ar: 'إلكترونيات', es: 'Electrónica', de: 'Elektronik' } },
  { key: 'services', slug: 'services', label: { en: 'Services', fr: 'Services', ar: 'خدمات', es: 'Servicios', de: 'Dienste' } },
]

const languages: { code: Locale; label: string }[] = [
  { code: 'en', label: 'English' },
  { code: 'fr', label: 'Français' },
  { code: 'ar', label: 'العربية' },
  { code: 'es', label: 'Español' },
  { code: 'de', label: 'Deutsch' },
]

const currencies: Currency[] = ['MAD', 'EUR', 'USD', 'GBP']

interface HeaderProps {
  locale: Locale
  currentSlug?: string
}

export default function Header({ locale, currentSlug }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const [currOpen, setCurrOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const { currency, setCurrency } = useMarket()
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/${locale}/search?q=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <header style={{
        position: 'sticky', top: 0, zIndex: 50, width: '100%',
        backgroundColor: scrolled ? 'rgba(244,251,248,0.97)' : 'rgba(244,251,248,0.85)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255,255,255,0.6)',
        boxShadow: scrolled ? '0 2px 20px rgba(0,0,0,0.06)' : 'none',
        transition: 'all 0.3s ease',
        fontFamily: 'Inter, sans-serif',
      }}>
        {/* Row 1 */}
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '60px', borderBottom: '1px solid rgba(221,228,225,0.4)' }}>

          {/* Logo + City */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <Link href={`/${locale}`} style={{ textDecoration: 'none' }}>
              <div>
                <div style={{ fontSize: '18px', fontWeight: 900, color: '#0f172a', letterSpacing: '-0.02em' }}>soukni</div>
                <div style={{ fontSize: '7px', fontWeight: 800, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#22d4a8', marginTop: '1px' }}>marketplace</div>
              </div>
            </Link>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '5px 12px', borderRadius: '100px', backgroundColor: '#e8efec', fontSize: '12px', fontWeight: 600, color: '#3c4a46', position: 'relative', zIndex: 100 }}>
              <CityPicker placeholder="All Morocco" />
            </div>
          </div>

          {/* Search bar */}
          <form onSubmit={handleSearch} style={{ flex: 1, maxWidth: '420px', margin: '0 24px', display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: '#e8efec', borderRadius: '100px', padding: '0 14px', height: '38px' }}>
            <Search size={15} color="#6b7a76" />
            <input
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search SouKni..."
              style={{ flex: 1, border: 'none', outline: 'none', background: 'transparent', fontSize: '13px', fontFamily: 'inherit', color: '#0f172a' }}
            />
          </form>

          {/* Right utilities */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>

            {/* Language switcher */}
            <div style={{ position: 'relative' }}>
              <button onClick={() => { setLangOpen(!langOpen); setCurrOpen(false) }} style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '6px 10px', borderRadius: '8px', border: 'none', backgroundColor: 'transparent', cursor: 'pointer', fontSize: '12px', fontWeight: 700, color: '#6b7a76', textTransform: 'uppercase' }}>
                {locale} <ChevronDown size={11} />
              </button>
              {langOpen && (
                <div style={{ position: 'absolute', top: '100%', right: 0, backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: '12px', boxShadow: '0 8px 24px rgba(0,0,0,0.1)', overflow: 'hidden', minWidth: '140px', zIndex: 100, marginTop: '4px' }}>
                  {languages.map(lang => (
                    <Link key={lang.code} href={`/${lang.code}${currentSlug ? `/${currentSlug}` : ''}`} onClick={() => setLangOpen(false)} style={{ display: 'block', padding: '10px 16px', fontSize: '13px', fontWeight: lang.code === locale ? 700 : 500, color: lang.code === locale ? '#22d4a8' : '#0f172a', textDecoration: 'none', backgroundColor: lang.code === locale ? '#f0fdfa' : 'transparent', transition: 'background 0.15s' }}
                      onMouseEnter={e => { if (lang.code !== locale) e.currentTarget.style.backgroundColor = '#f8fafc' }}
                      onMouseLeave={e => { if (lang.code !== locale) e.currentTarget.style.backgroundColor = 'transparent' }}
                    >
                      {lang.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Currency switcher */}
            <div style={{ position: 'relative' }}>
              <button onClick={() => { setCurrOpen(!currOpen); setLangOpen(false) }} style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '6px 10px', borderRadius: '8px', border: 'none', backgroundColor: 'transparent', cursor: 'pointer', fontSize: '12px', fontWeight: 700, color: '#6b7a76' }}>
                {currency} <ChevronDown size={11} />
              </button>
              {currOpen && (
                <div style={{ position: 'absolute', top: '100%', right: 0, backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: '12px', boxShadow: '0 8px 24px rgba(0,0,0,0.1)', overflow: 'hidden', minWidth: '100px', zIndex: 100, marginTop: '4px' }}>
                  {currencies.map(c => (
                    <button key={c} onClick={() => { setCurrency(c); setCurrOpen(false) }} style={{ display: 'block', width: '100%', padding: '10px 16px', fontSize: '13px', fontWeight: c === currency ? 700 : 500, color: c === currency ? '#22d4a8' : '#0f172a', backgroundColor: c === currency ? '#f0fdfa' : 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left', transition: 'background 0.15s' }}
                      onMouseEnter={e => { if (c !== currency) e.currentTarget.style.backgroundColor = '#f8fafc' }}
                      onMouseLeave={e => { if (c !== currency) e.currentTarget.style.backgroundColor = 'transparent' }}
                    >{c}</button>
                  ))}
                </div>
              )}
            </div>

            <div style={{ width: '1px', height: '18px', backgroundColor: '#e2e8f0', margin: '0 4px' }} />

            {/* Icons */}
            {[{ icon: <Bell size={17} />, label: 'Notifications', href: `/${locale}/notifications` }, { icon: <Heart size={17} />, label: 'Favorites', href: `/${locale}/favorites` }].map(({ icon, label, href }) => (
              <Link key={label} href={href} title={label} style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6b7a76', transition: 'all 0.15s', textDecoration: 'none' }}
                onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'rgba(34,212,168,0.1)'; e.currentTarget.style.color = '#22d4a8' }}
                onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#6b7a76' }}
              >{icon}</Link>
            ))}

            <div style={{ width: '1px', height: '18px', backgroundColor: '#e2e8f0', margin: '0 4px' }} />

            <Link href={`/${locale}/auth`} style={{ fontSize: '13px', fontWeight: 700, color: '#334155', textDecoration: 'none', padding: '6px 10px', transition: 'color 0.15s' }}
              onMouseEnter={e => e.currentTarget.style.color = '#22d4a8'}
              onMouseLeave={e => e.currentTarget.style.color = '#334155'}
            >Login / Signup</Link>

            <Link href={`/${locale}/post-ad`} style={{ backgroundColor: '#22d4a8', color: 'white', padding: '9px 18px', borderRadius: '10px', fontSize: '11px', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', textDecoration: 'none', boxShadow: '0 4px 14px rgba(45,212,191,0.3)', transition: 'all 0.15s' }}
              onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#0f9b8e'; e.currentTarget.style.transform = 'scale(1.02)' }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#22d4a8'; e.currentTarget.style.transform = 'scale(1)' }}
            >Post FREE Ad</Link>

            <button onClick={() => setMobileOpen(true)} style={{ width: '36px', height: '36px', borderRadius: '8px', border: '1px solid #e2e8f0', backgroundColor: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', marginLeft: '4px' }}>
              <Menu size={16} color="#334155" />
            </button>
          </div>
        </div>

        {/* Row 2 — Nav */}
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 40px', display: 'flex', alignItems: 'center', gap: '4px', height: '44px', overflowX: 'auto' }}>
          {verticals.map(v => {
            const label = v.label[locale] ?? v.label.en
            const isActive = currentSlug === v.slug
            return (
              <Link key={v.slug} href={`/${locale}/${v.slug}`} style={{ textDecoration: 'none', padding: '6px 14px', fontSize: '12px', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: isActive ? '#22d4a8' : '#64748b', borderBottom: isActive ? '2px solid #22d4a8' : '2px solid transparent', height: '100%', display: 'flex', alignItems: 'center', whiteSpace: 'nowrap', transition: 'color 0.15s' }}
                onMouseEnter={e => { if (!isActive) e.currentTarget.style.color = '#22d4a8' }}
                onMouseLeave={e => { if (!isActive) e.currentTarget.style.color = '#64748b' }}
              >{label}</Link>
            )
          })}
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 100 }}>
          <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)' }} onClick={() => setMobileOpen(false)} />
          <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '85vw', maxWidth: '360px', backgroundColor: '#f4fbf8', display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 24px', borderBottom: '1px solid #e2e8f0' }}>
              <span style={{ fontSize: '18px', fontWeight: 900, color: '#0f172a' }}>soukni</span>
              <button onClick={() => setMobileOpen(false)} style={{ border: 'none', backgroundColor: 'transparent', cursor: 'pointer' }}><X size={20} color="#334155" /></button>
            </div>

            {/* Mobile language + currency */}
            <div style={{ padding: '16px 24px', borderBottom: '1px solid #e2e8f0', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              {languages.map(lang => (
                <Link key={lang.code} href={`/${lang.code}${currentSlug ? `/${currentSlug}` : ''}`} onClick={() => setMobileOpen(false)} style={{ padding: '6px 12px', borderRadius: '100px', fontSize: '12px', fontWeight: 700, textDecoration: 'none', backgroundColor: lang.code === locale ? '#22d4a8' : '#e8efec', color: lang.code === locale ? 'white' : '#334155' }}>{lang.code.toUpperCase()}</Link>
              ))}
              <div style={{ width: '1px', backgroundColor: '#e2e8f0' }} />
              {currencies.map(c => (
                <button key={c} onClick={() => { setCurrency(c); }} style={{ padding: '6px 12px', borderRadius: '100px', fontSize: '12px', fontWeight: 700, border: 'none', cursor: 'pointer', backgroundColor: c === currency ? '#22d4a8' : '#e8efec', color: c === currency ? 'white' : '#334155' }}>{c}</button>
              ))}
            </div>

            <nav style={{ padding: '16px 24px', flex: 1 }}>
              {verticals.map(v => (
                <Link key={v.slug} href={`/${locale}/${v.slug}`} onClick={() => setMobileOpen(false)} style={{ display: 'block', padding: '14px 0', fontSize: '16px', fontWeight: 700, color: '#0f172a', textDecoration: 'none', borderBottom: '1px solid #f1f5f9' }}>
                  {v.label[locale] ?? v.label.en}
                </Link>
              ))}
            </nav>
            <div style={{ padding: '20px 24px' }}>
              <Link href={`/${locale}/post-ad`} style={{ display: 'block', backgroundColor: '#22d4a8', color: 'white', padding: '14px', borderRadius: '12px', textAlign: 'center', fontSize: '13px', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', textDecoration: 'none' }}>
                Post FREE Ad
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
