'use client'

import Link from 'next/link'
import VoiceSearch from '@/components/sections/VoiceSearch'
import VisualSearch from '@/components/ui/VisualSearch'
import { useState, useEffect } from 'react'
import { Bell, Heart, Menu, X, ChevronDown, Search, User, MessageCircle } from 'lucide-react'
import CityPicker from '@/components/ui/CityPicker'
import { useRouter, usePathname } from 'next/navigation'
import type { Locale } from '@/lib/types'
import { useMarket, type Currency } from '@/context/MarketContext'
import { useStore } from '@/lib/store'
import { getSupabaseClient } from '@/lib/supabase/client'

const verticals = [
  { key: 'motors',      slug: 'motors',      label: { en: 'Motors',               fr: 'Voitures',        ar: 'سيارات',     es: 'Motores',    de: 'Motoren',    ber: 'ⵜⵉⴽⵕⴰⵙ'      } },
  { key: 'property',    slug: 'property',    label: { en: 'Property',             fr: 'Immobilier',      ar: 'عقارات',     es: 'Propiedad',  de: 'Immobilien', ber: 'ⵜⵉⵖⵔⵎⵜ'       } },
  { key: 'vault',       slug: 'vault',       label: { en: 'The Vault',            fr: 'Le Vault',        ar: 'الخزنة',     es: 'El Vault',   de: 'Der Vault',  ber: 'ⴰⵙⵎⴽⵍ'        } },
  { key: 'fashion',     slug: 'fashion',     label: { en: 'Fashion',              fr: 'Mode',            ar: 'موضة',       es: 'Moda',       de: 'Mode',       ber: 'ⵍⵍⵉⴱⴰⵙ'       } },
  { key: 'jobs',        slug: 'jobs',        label: { en: 'Jobs',                 fr: 'Emplois',         ar: 'وظائف',      es: 'Empleo',     de: 'Jobs',       ber: 'ⵜⵉⵡⵓⵔⵉⵡⵉⵏ'    } },
  { key: 'electronics', slug: 'electronics', label: { en: 'Mobiles & Electronics',fr: 'Électronique',    ar: 'إلكترونيات', es: 'Electrónica',de: 'Elektronik', ber: 'ⵜⵉⵎⵙⵙⵉⵢⵉⵏ'    } },
  { key: 'home-garden', slug: 'home-garden', label: { en: 'Home & Garden',        fr: 'Maison & Jardin', ar: 'منزل وحديقة',es: 'Hogar',      de: 'Haus',       ber: 'ⴰⵅⵅⴰⵎ ⴷ ⵓⵔⵜⵉ' } },
  { key: 'services',    slug: 'services',    label: { en: 'Services',             fr: 'Services',        ar: 'خدمات',      es: 'Servicios',  de: 'Dienste',    ber: 'ⵜⵉⵎⴰⵡⴰⵙⵉⵏ'    } },
]

const languages: { code: Locale; label: string }[] = [
  { code: 'en',  label: 'English'   },
  { code: 'fr',  label: 'Français'  },
  { code: 'ar',  label: 'العربية'   },
  { code: 'ber', label: 'ⵜⴰⵎⴰⵣⵉⵖⵜ'  },
  { code: 'es',  label: 'Español'   },
  { code: 'de',  label: 'Deutsch'   },
]

const shortCode: Record<Locale, string> = {
  en: 'EN', fr: 'FR', ar: 'ع', ber: 'ⵣ', es: 'ES', de: 'DE',
}

const currencies: Currency[] = ['MAD', 'EUR', 'USD', 'GBP']

interface HeaderProps {
  locale: Locale
  currentSlug?: string
}

export default function Header({ locale, currentSlug: currentSlugProp }: HeaderProps) {
  const pathname = usePathname()
  // Derive the path after /{locale}/ so language switching preserves the current page
  const computedSlug = pathname?.split('/').slice(2).join('/') || ''
  const currentSlug = currentSlugProp ?? computedSlug
  const [scrolled,    setScrolled   ] = useState(false)
  const [mobileOpen,  setMobileOpen ] = useState(false)
  const [langOpen,    setLangOpen   ] = useState(false)
  const [currOpen,    setCurrOpen   ] = useState(false)
  const [userOpen,    setUserOpen   ] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const { currency, setCurrency } = useMarket()
  const router = useRouter()
  const { user, unreadCount, setUnreadCount } = useStore()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/${locale}/search?q=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  // Real unread-message count for the header badge — sum of whichever
  // unread column applies to this user (buyer_unread if they're the buyer
  // on a thread, seller_unread if they're the seller), kept live via
  // Realtime on `conversations` rather than a manual refresh.
  useEffect(() => {
    if (!user) { setUnreadCount(0); return }
    const supabase = getSupabaseClient()

    const loadUnread = async () => {
      const { data } = await supabase
        .from('conversations')
        .select('buyer_id, seller_id, buyer_unread, seller_unread')
        .or(`buyer_id.eq.${user.id},seller_id.eq.${user.id}`)
      const total = (data || []).reduce((sum, c: any) =>
        sum + (c.buyer_id === user.id ? c.buyer_unread : c.seller_unread), 0)
      setUnreadCount(total)
    }
    loadUnread()

    const channel = supabase
      .channel(`header-unread:${user.id}`)
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'conversations' }, loadUnread)
      .subscribe()
    return () => { supabase.removeChannel(channel) }
  }, [user?.id])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close dropdowns on outside click
  useEffect(() => {
    const close = (e: MouseEvent) => {
      const t = e.target as HTMLElement
      if (!t.closest('[data-dropdown]')) {
        setLangOpen(false); setCurrOpen(false); setUserOpen(false)
      }
    }
    document.addEventListener('mousedown', close)
    return () => document.removeEventListener('mousedown', close)
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

        {/* ── ROW 1 — Logo / Search / Auth ── */}
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
              <CityPicker locale={locale} />
            </div>
          </div>

          {/* Search bar — no voice/camera here */}
          <form onSubmit={handleSearch} style={{ flex: 1, maxWidth: '460px', margin: '0 24px', display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: '#e8efec', borderRadius: '100px', padding: '0 14px', height: '38px' }}>
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

            {/* Language */}
            <div data-dropdown style={{ position: 'relative' }}>
              <button onClick={() => { setLangOpen(!langOpen); setCurrOpen(false); setUserOpen(false) }}
                style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '6px 10px', borderRadius: '8px', border: 'none', backgroundColor: 'transparent', cursor: 'pointer', fontSize: '12px', fontWeight: 700, color: '#6b7a76' }}>
                {shortCode[locale] ?? locale.toUpperCase()} <ChevronDown size={11} />
              </button>
              {langOpen && (
                <div style={{ position: 'absolute', top: 'calc(100% + 4px)', right: 0, backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: '12px', boxShadow: '0 8px 24px rgba(0,0,0,0.1)', overflow: 'hidden', minWidth: '140px', zIndex: 200 }}>
                  {languages.map(lang => (
                    <Link key={lang.code} href={`/${lang.code}${currentSlug ? `/${currentSlug}` : ''}`} onClick={() => setLangOpen(false)}
                      style={{ display: 'block', padding: '10px 16px', fontSize: '13px', fontWeight: lang.code === locale ? 700 : 500, color: lang.code === locale ? '#22d4a8' : '#0f172a', textDecoration: 'none', backgroundColor: lang.code === locale ? '#f0fdfa' : 'transparent' }}>
                      {lang.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Currency */}
            <div data-dropdown style={{ position: 'relative' }}>
              <button onClick={() => { setCurrOpen(!currOpen); setLangOpen(false); setUserOpen(false) }}
                style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '6px 10px', borderRadius: '8px', border: 'none', backgroundColor: 'transparent', cursor: 'pointer', fontSize: '12px', fontWeight: 700, color: '#6b7a76' }}>
                {currency} <ChevronDown size={11} />
              </button>
              {currOpen && (
                <div style={{ position: 'absolute', top: 'calc(100% + 4px)', right: 0, backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: '12px', boxShadow: '0 8px 24px rgba(0,0,0,0.1)', overflow: 'hidden', minWidth: '100px', zIndex: 200 }}>
                  {currencies.map(c => (
                    <button key={c} onClick={() => { setCurrency(c); setCurrOpen(false) }}
                      style={{ display: 'block', width: '100%', padding: '10px 16px', fontSize: '13px', fontWeight: c === currency ? 700 : 500, color: c === currency ? '#22d4a8' : '#0f172a', backgroundColor: c === currency ? '#f0fdfa' : 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left' }}>
                      {c}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div style={{ width: '1px', height: '18px', backgroundColor: '#e2e8f0', margin: '0 4px' }} />

            {/* Messages */}
            <Link href={`/${locale}/messages`} title="Messages"
              style={{ width: '36px', height: '36px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6b7a76', textDecoration: 'none', transition: 'all 0.15s', position: 'relative' }}
              onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'rgba(34,212,168,0.1)'; e.currentTarget.style.color = '#22d4a8' }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#6b7a76' }}>
              <MessageCircle size={17} />
              {unreadCount > 0 && (
                <span style={{ position: 'absolute', top: '2px', right: '2px', minWidth: '15px', height: '15px', padding: '0 3px', borderRadius: '100px', backgroundColor: '#ef4444', color: 'white', fontSize: '9px', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {unreadCount > 99 ? '99+' : unreadCount}
                </span>
              )}
            </Link>

            {/* Notifications */}
            <Link href={`/${locale}/notifications`} title="Notifications"
              style={{ width: '36px', height: '36px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6b7a76', textDecoration: 'none', transition: 'all 0.15s' }}
              onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'rgba(34,212,168,0.1)'; e.currentTarget.style.color = '#22d4a8' }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#6b7a76' }}>
              <Bell size={17} />
            </Link>

            {/* Favorites */}
            <Link href={`/${locale}/favorites`} title="Favorites"
              style={{ width: '36px', height: '36px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6b7a76', textDecoration: 'none', transition: 'all 0.15s' }}
              onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'rgba(34,212,168,0.1)'; e.currentTarget.style.color = '#22d4a8' }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#6b7a76' }}>
              <Heart size={17} />
            </Link>

            {/* User dropdown */}
            <div data-dropdown style={{ position: 'relative' }}>
              <button onClick={() => { setUserOpen(!userOpen); setLangOpen(false); setCurrOpen(false) }}
                style={{ width: '36px', height: '36px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6b7a76', backgroundColor: 'transparent', border: 'none', cursor: 'pointer', transition: 'all 0.15s' }}
                onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'rgba(34,212,168,0.1)'; e.currentTarget.style.color = '#22d4a8' }}
                onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#6b7a76' }}>
                <User size={17} />
              </button>
              {userOpen && (
                <div style={{ position: 'absolute', top: 'calc(100% + 4px)', right: 0, backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: '16px', boxShadow: '0 12px 40px rgba(0,0,0,0.12)', overflow: 'hidden', minWidth: '200px', zIndex: 200 }}>
                  {/* Account section */}
                  <div style={{ padding: '6px 0', borderBottom: '1px solid #f1f5f9' }}>
                    {[
                      { label: 'My Account',      href: `/${locale}/account`        },
                      { label: 'My Ads',          href: `/${locale}/account/my-ads` },
                      { label: 'Saved Searches',  href: `/${locale}/saved-searches` },
                      { label: 'Favorites',       href: `/${locale}/favorites`      },
                      { label: 'Messages',        href: `/${locale}/messages`       },
                      { label: 'Orders',          href: `/${locale}/orders`         },
                      { label: 'Analytics',       href: `/${locale}/analytics`      },
                    ].map(item => (
                      <Link key={item.label} href={item.href}
                        style={{ display: 'block', padding: '10px 18px', fontSize: '13px', fontWeight: 500, color: '#0f172a', textDecoration: 'none', transition: 'background 0.15s' }}
                        onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#f8fafc'; e.currentTarget.style.color = '#22d4a8' }}
                        onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#0f172a' }}>
                        {item.label}
                      </Link>
                    ))}
                  </div>
                  {/* Seller tools */}
                  <div style={{ padding: '6px 0', borderBottom: '1px solid #f1f5f9' }}>
                    <div style={{ padding: '6px 18px 4px', fontSize: '10px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Seller Tools</div>
                    {[
                      { label: 'Bulk Import',   href: `/${locale}/bulk-import`   },
                      { label: 'Buyer Agent',   href: `/${locale}/buyer-agent`   },
                      { label: 'Diamond',       href: `/${locale}/diamond`        },
                    ].map(item => (
                      <Link key={item.label} href={item.href}
                        style={{ display: 'block', padding: '10px 18px', fontSize: '13px', fontWeight: 500, color: '#0f172a', textDecoration: 'none', transition: 'background 0.15s' }}
                        onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#f8fafc'; e.currentTarget.style.color = '#22d4a8' }}
                        onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#0f172a' }}>
                        {item.label}
                      </Link>
                    ))}
                  </div>
                  {/* Auth */}
                  <div style={{ padding: '6px 0' }}>
                    <Link href={`/${locale}/auth`}
                      style={{ display: 'block', padding: '10px 18px', fontSize: '13px', fontWeight: 700, color: '#22d4a8', textDecoration: 'none' }}>
                      Login / Sign Up
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <div style={{ width: '1px', height: '18px', backgroundColor: '#e2e8f0', margin: '0 4px' }} />

            <Link href={`/${locale}/post-ad`}
              style={{ backgroundColor: '#22d4a8', color: 'white', padding: '9px 18px', borderRadius: '10px', fontSize: '11px', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', textDecoration: 'none', boxShadow: '0 4px 14px rgba(45,212,191,0.3)', transition: 'all 0.15s' }}
              onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#0f9b8e'; e.currentTarget.style.transform = 'scale(1.02)' }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#22d4a8'; e.currentTarget.style.transform = 'scale(1)' }}>
              POST FREE AD
            </Link>

            <button onClick={() => setMobileOpen(true)}
              style={{ width: '36px', height: '36px', borderRadius: '8px', border: '1px solid #e2e8f0', backgroundColor: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', marginLeft: '4px' }}>
              <Menu size={16} color="#334155" />
            </button>
          </div>
        </div>

        {/* ── ROW 2 — Category nav + Voice/Visual search ── */}
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '44px' }}>

          {/* Category links */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', overflowX: 'auto', flex: 1 }}>
            {verticals.map(v => {
              const label = v.label[locale] ?? v.label.en
              const isActive = currentSlug === v.slug || currentSlug.startsWith(v.slug + '/')
              return (
                <Link key={v.slug} href={`/${locale}/${v.slug}`}
                  style={{ textDecoration: 'none', padding: '6px 14px', fontSize: '12px', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: isActive ? '#22d4a8' : '#64748b', borderBottom: isActive ? '2px solid #22d4a8' : '2px solid transparent', height: '100%', display: 'flex', alignItems: 'center', whiteSpace: 'nowrap', transition: 'color 0.15s' }}
                  onMouseEnter={e => { if (!isActive) e.currentTarget.style.color = '#22d4a8' }}
                  onMouseLeave={e => { if (!isActive) e.currentTarget.style.color = '#64748b' }}>
                  {label}
                </Link>
              )
            })}
          </div>

          {/* Voice + Visual search — now live in Row 2 on the right */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0, marginLeft: '16px' }}>
            <VoiceSearch locale={locale} />
            <VisualSearch locale={locale} />
          </div>
        </div>
      </header>

      {/* ── MOBILE MENU ── */}
      {mobileOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 100 }}>
          <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)' }} onClick={() => setMobileOpen(false)} />
          <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '85vw', maxWidth: '360px', backgroundColor: '#f4fbf8', display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 24px', borderBottom: '1px solid #e2e8f0' }}>
              <span style={{ fontSize: '18px', fontWeight: 900, color: '#0f172a' }}>soukni</span>
              <button onClick={() => setMobileOpen(false)} style={{ border: 'none', backgroundColor: 'transparent', cursor: 'pointer' }}><X size={20} color="#334155" /></button>
            </div>

            {/* Language + Currency */}
            <div style={{ padding: '16px 24px', borderBottom: '1px solid #e2e8f0', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {languages.map(lang => (
                <Link key={lang.code} href={`/${lang.code}${currentSlug ? `/${currentSlug}` : ''}`} onClick={() => setMobileOpen(false)}
                  style={{ padding: '6px 12px', borderRadius: '100px', fontSize: '12px', fontWeight: 700, textDecoration: 'none', backgroundColor: lang.code === locale ? '#22d4a8' : '#e8efec', color: lang.code === locale ? 'white' : '#334155' }}>
                  {lang.code.toUpperCase()}
                </Link>
              ))}
              <div style={{ width: '1px', backgroundColor: '#e2e8f0' }} />
              {currencies.map(c => (
                <button key={c} onClick={() => setCurrency(c)}
                  style={{ padding: '6px 12px', borderRadius: '100px', fontSize: '12px', fontWeight: 700, cursor: 'pointer', border: 'none', backgroundColor: c === currency ? '#22d4a8' : '#e8efec', color: c === currency ? 'white' : '#334155' }}>
                  {c}
                </button>
              ))}
            </div>

            {/* Category nav */}
            <nav style={{ padding: '16px 24px', flex: 1 }}>
              <div style={{ fontSize: '10px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '12px' }}>Browse</div>
              {verticals.map(v => (
                <Link key={v.slug} href={`/${locale}/${v.slug}`} onClick={() => setMobileOpen(false)}
                  style={{ display: 'block', padding: '14px 0', fontSize: '16px', fontWeight: 700, color: '#0f172a', textDecoration: 'none', borderBottom: '1px solid #f1f5f9' }}>
                  {v.label[locale] ?? v.label.en}
                </Link>
              ))}

              {/* Account links in mobile */}
              <div style={{ fontSize: '10px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em', margin: '20px 0 12px' }}>Account</div>
              {[
                { label: 'My Account',     href: `/${locale}/account`        },
                { label: 'My Ads',         href: `/${locale}/account/my-ads` },
                { label: 'Messages',       href: `/${locale}/messages`       },
                { label: 'Orders',         href: `/${locale}/orders`         },
                { label: 'Favorites',      href: `/${locale}/favorites`      },
                { label: 'Notifications',  href: `/${locale}/notifications`  },
                { label: 'Saved Searches', href: `/${locale}/saved-searches` },
                { label: 'Analytics',      href: `/${locale}/analytics`      },
                { label: 'Diamond',        href: `/${locale}/diamond`        },
                { label: 'Buyer Agent',    href: `/${locale}/buyer-agent`    },
              ].map(item => (
                <Link key={item.label} href={item.href} onClick={() => setMobileOpen(false)}
                  style={{ display: 'block', padding: '12px 0', fontSize: '15px', fontWeight: 600, color: '#334155', textDecoration: 'none', borderBottom: '1px solid #f1f5f9' }}>
                  {item.label}
                </Link>
              ))}

              {/* Help */}
              <div style={{ fontSize: '10px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em', margin: '20px 0 12px' }}>Help</div>
              {[
                { label: 'Help Center', href: `/${locale}/help`    },
                { label: 'Safety',      href: `/${locale}/safety`  },
                { label: 'Contact',     href: `/${locale}/contact` },
              ].map(item => (
                <Link key={item.label} href={item.href} onClick={() => setMobileOpen(false)}
                  style={{ display: 'block', padding: '12px 0', fontSize: '15px', fontWeight: 600, color: '#334155', textDecoration: 'none', borderBottom: '1px solid #f1f5f9' }}>
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* CTAs */}
            <div style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <Link href={`/${locale}/post-ad`} onClick={() => setMobileOpen(false)}
                style={{ display: 'block', backgroundColor: '#22d4a8', color: 'white', padding: '14px', borderRadius: '12px', textAlign: 'center', fontSize: '13px', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', textDecoration: 'none' }}>
                POST FREE AD
              </Link>
              <Link href={`/${locale}/auth`} onClick={() => setMobileOpen(false)}
                style={{ display: 'block', backgroundColor: '#e8efec', color: '#0f172a', padding: '14px', borderRadius: '12px', textAlign: 'center', fontSize: '13px', fontWeight: 700, textDecoration: 'none' }}>
                Login / Sign Up
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
