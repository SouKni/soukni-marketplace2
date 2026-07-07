'use client'

import { useState, use } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  Plus, Eye, Heart, MessageCircle, MoreVertical, TrendingUp,
  Edit, Trash2, RefreshCw, Pause, Play, Sparkles, BarChart3
} from 'lucide-react'

type Locale = 'en' | 'fr' | 'ar' | 'es' | 'de'

const MY_ADS = [
  { id: 1, title: 'iPhone 15 Pro Max 256GB — Titanium Black', price: '12,500 MAD', image: 'https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&w=400', status: 'active', views: 847, favorites: 23, messages: 6, postedDate: '2 days ago', badge: 'Diamond' },
  { id: 2, title: 'MacBook Pro 14" M3 Pro 18GB/512GB', price: '24,800 MAD', image: 'https://images.pexels.com/photos/1229861/pexels-photo-1229861.jpeg?auto=compress&w=400', status: 'active', views: 412, favorites: 18, messages: 4, postedDate: '5 days ago', badge: 'Verified' },
  { id: 3, title: 'AirPods Pro 2nd Gen — Sealed Box', price: '1,850 MAD', image: 'https://images.pexels.com/photos/8000631/pexels-photo-8000631.jpeg?auto=compress&w=400', status: 'paused', views: 156, favorites: 7, messages: 1, postedDate: '1 week ago', badge: null },
  { id: 4, title: 'Samsung Galaxy Watch 6 Classic', price: '2,900 MAD', image: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&w=400', status: 'sold', views: 689, favorites: 31, messages: 12, postedDate: '3 weeks ago', badge: null },
  { id: 5, title: 'Sony WH-1000XM5 Headphones', price: '3,400 MAD', image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&w=400', status: 'expired', views: 234, favorites: 9, messages: 2, postedDate: '2 months ago', badge: null },
]

export default function MyAdsPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = use(params)
  const [tab, setTab] = useState<'all' | 'active' | 'paused' | 'sold' | 'expired'>('all')
  const [menuOpen, setMenuOpen] = useState<number | null>(null)

  const filtered = tab === 'all' ? MY_ADS : MY_ADS.filter(a => a.status === tab)

  const counts = {
    all: MY_ADS.length,
    active: MY_ADS.filter(a => a.status === 'active').length,
    paused: MY_ADS.filter(a => a.status === 'paused').length,
    sold: MY_ADS.filter(a => a.status === 'sold').length,
    expired: MY_ADS.filter(a => a.status === 'expired').length,
  }

  const totalViews = MY_ADS.reduce((s, a) => s + a.views, 0)
  const totalFavs = MY_ADS.reduce((s, a) => s + a.favorites, 0)
  const totalMsgs = MY_ADS.reduce((s, a) => s + a.messages, 0)

  const statusStyle: Record<string, { bg: string; color: string; label: string }> = {
    active: { bg: '#e6f9f3', color: '#0f9b8e', label: 'Active' },
    paused: { bg: '#fff4e0', color: '#b45309', label: 'Paused' },
    sold: { bg: '#161d1b', color: 'white', label: 'Sold' },
    expired: { bg: '#f1f1ef', color: '#6b7a76', label: 'Expired' },
  }

  return (
    <div style={{ background: '#f4fbf8', minHeight: '100vh', fontFamily: 'Hanken Grotesk, Inter, system-ui, sans-serif' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '32px 24px 80px' }}>

        {/* HEADER */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '28px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h1 style={{ fontSize: '28px', fontWeight: 800, color: '#161d1b', letterSpacing: '-0.02em', marginBottom: '4px' }}>My Ads</h1>
            <p style={{ fontSize: '14px', color: '#6b7a76' }}>Manage your listings and track their performance</p>
          </div>
          <Link href={`/${locale}/post-ad`} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#22d4a8', color: 'white', padding: '12px 22px', borderRadius: '12px', textDecoration: 'none', fontSize: '14px', fontWeight: 700 }}>
            <Plus size={17} /> Post New Ad
          </Link>
        </div>

        {/* STATS OVERVIEW */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px', marginBottom: '28px' }}>
          {[
            { icon: <BarChart3 size={18} color="#22d4a8" />, label: 'Total Ads', value: MY_ADS.length },
            { icon: <Eye size={18} color="#22d4a8" />, label: 'Total Views', value: totalViews.toLocaleString() },
            { icon: <Heart size={18} color="#22d4a8" />, label: 'Total Favorites', value: totalFavs },
            { icon: <MessageCircle size={18} color="#22d4a8" />, label: 'Total Messages', value: totalMsgs },
          ].map(s => (
            <div key={s.label} style={{ background: 'white', borderRadius: '18px', padding: '18px', border: '1px solid #e2eae6', display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: '#e6f9f3', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{s.icon}</div>
              <div>
                <p style={{ fontSize: '20px', fontWeight: 800, color: '#161d1b' }}>{s.value}</p>
                <p style={{ fontSize: '11px', color: '#6b7a76', fontWeight: 500 }}>{s.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* DIAMOND PROMO */}
        <div style={{ background: 'linear-gradient(135deg, #161d1b, #2b3230)', borderRadius: '20px', padding: '20px 24px', display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '28px' }}>
          <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'linear-gradient(135deg, #22d4a8, #0f9b8e)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Sparkles size={20} color="white" />
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: '14px', fontWeight: 800, color: 'white' }}>Get 5× more views with Diamond Boost</p>
            <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)' }}>Highlight any ad and reach more buyers instantly</p>
          </div>
          <button style={{ padding: '10px 20px', borderRadius: '10px', background: '#22d4a8', color: 'white', border: 'none', fontSize: '13px', fontWeight: 700, cursor: 'pointer', whiteSpace: 'nowrap', fontFamily: 'inherit' }}>
            Boost Ads
          </button>
        </div>

        {/* TABS */}
        <div style={{ display: 'flex', gap: '4px', background: 'white', padding: '4px', borderRadius: '14px', border: '1px solid #e2eae6', marginBottom: '20px', width: 'fit-content', overflowX: 'auto' }}>
          {(['all', 'active', 'paused', 'sold', 'expired'] as const).map(t => (
            <button key={t} onClick={() => setTab(t)}
              style={{ padding: '9px 18px', borderRadius: '10px', border: 'none', cursor: 'pointer', fontSize: '13px', fontWeight: 700, fontFamily: 'inherit', whiteSpace: 'nowrap', background: tab === t ? '#161d1b' : 'transparent', color: tab === t ? 'white' : '#6b7a76', transition: 'all 0.2s', textTransform: 'capitalize' }}>
              {t} ({counts[t]})
            </button>
          ))}
        </div>

        {/* ADS LIST */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {filtered.length === 0 && (
            <div style={{ background: 'white', borderRadius: '20px', padding: '60px 20px', textAlign: 'center', border: '1px solid #e2eae6' }}>
              <p style={{ fontSize: '15px', color: '#6b7a76' }}>No ads in this category yet.</p>
            </div>
          )}
          {filtered.map(ad => {
            const s = statusStyle[ad.status]
            return (
              <div key={ad.id} style={{ background: 'white', borderRadius: '18px', border: '1px solid #e2eae6', padding: '16px', display: 'flex', alignItems: 'center', gap: '16px', position: 'relative' }}>

                {/* Image */}
                <Link href={`/${locale}/listing/${ad.id}`} style={{ flexShrink: 0 }}>
                  <div style={{ width: '88px', height: '88px', borderRadius: '14px', overflow: 'hidden', position: 'relative' }}>
                    <img src={ad.image} alt={ad.title} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: ad.status === 'sold' || ad.status === 'expired' ? 0.5 : 1 }} />
                  </div>
                </Link>

                {/* Info */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <span style={{ fontSize: '10px', fontWeight: 700, padding: '3px 10px', borderRadius: '100px', background: s.bg, color: s.color, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{s.label}</span>
                    {ad.badge && <span style={{ fontSize: '10px', fontWeight: 700, padding: '3px 10px', borderRadius: '100px', background: '#f5ede0', color: '#161d1b' }}>{ad.badge}</span>}
                  </div>
                  <Link href={`/${locale}/listing/${ad.id}`} style={{ textDecoration: 'none' }}>
                    <p style={{ fontSize: '14px', fontWeight: 700, color: '#161d1b', marginBottom: '4px', lineHeight: 1.3, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{ad.title}</p>
                  </Link>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '15px', fontWeight: 800, color: '#22d4a8' }}>{ad.price}</span>
                    <span style={{ fontSize: '11px', color: '#6b7a76' }}>{ad.postedDate}</span>
                  </div>
                </div>

                {/* Stats */}
                <div style={{ display: 'flex', gap: '20px', flexShrink: 0 }}>
                  {[
                    { icon: <Eye size={14} color="#6b7a76" />, value: ad.views },
                    { icon: <Heart size={14} color="#6b7a76" />, value: ad.favorites },
                    { icon: <MessageCircle size={14} color="#6b7a76" />, value: ad.messages },
                  ].map((stat, i) => (
                    <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
                      {stat.icon}
                      <span style={{ fontSize: '12px', fontWeight: 700, color: '#161d1b' }}>{stat.value}</span>
                    </div>
                  ))}
                </div>

                {/* Actions */}
                <div style={{ position: 'relative', flexShrink: 0 }}>
                  <button onClick={() => setMenuOpen(menuOpen === ad.id ? null : ad.id)}
                    style={{ width: '36px', height: '36px', borderRadius: '10px', border: '1px solid #e2eae6', background: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <MoreVertical size={16} color="#6b7a76" />
                  </button>
                  {menuOpen === ad.id && (
                    <div style={{ position: 'absolute', top: '42px', right: 0, background: 'white', borderRadius: '14px', boxShadow: '0 8px 32px rgba(0,0,0,0.15)', border: '1px solid #e2eae6', overflow: 'hidden', minWidth: '180px', zIndex: 10 }}>
                      {[
                        { icon: <Edit size={14} />, label: 'Edit Ad', href: `/${locale}/account/edit-ad/${ad.id}` },
                        { icon: <TrendingUp size={14} />, label: 'Promote / Boost', href: `/${locale}/boost/${ad.id}` },
                        ad.status === 'active'
                          ? { icon: <Pause size={14} />, label: 'Pause Ad' }
                          : { icon: <Play size={14} />, label: 'Reactivate' },
                        { icon: <RefreshCw size={14} />, label: 'Mark as Sold' },
                        { icon: <Trash2 size={14} />, label: 'Delete', danger: true },
                      ].map((item: any) => (
                        <button key={item.label} onClick={() => setMenuOpen(null)}
                          style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '10px', padding: '11px 16px', border: 'none', background: 'white', cursor: 'pointer', fontSize: '13px', fontWeight: 600, color: item.danger ? '#ef4444' : '#161d1b', fontFamily: 'inherit', textAlign: 'left' }}
                          onMouseEnter={e => e.currentTarget.style.background = '#f4fbf8'}
                          onMouseLeave={e => e.currentTarget.style.background = 'white'}
                        >
                          {item.icon} {item.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
