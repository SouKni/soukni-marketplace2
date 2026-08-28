'use client'

import { useState, useEffect, use } from 'react'
import Link from 'next/link'
import { Heart, MapPin, Trash2, Grid, List, Search, ChevronRight } from 'lucide-react'
import Breadcrumb from '@/components/ui/Breadcrumb'
import { useFavorites, type FavoriteListing } from '@/hooks/useFavorites'

type Locale = 'en' | 'fr' | 'ar' | 'es' | 'de'

function timeAgo(iso: string) {
  const diffMs = Date.now() - new Date(iso).getTime()
  const days = Math.floor(diffMs / 86400000)
  if (days <= 0) return 'today'
  if (days === 1) return '1 day ago'
  if (days < 7) return `${days} days ago`
  const weeks = Math.floor(days / 7)
  if (weeks === 1) return '1 week ago'
  return `${weeks} weeks ago`
}

export default function FavoritesPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = use(params)
  const { getFavorites, toggleFavorite, isLoggedIn } = useFavorites()
  const [items, setItems] = useState<FavoriteListing[]>([])
  const [loading, setLoading] = useState(true)
  const [view, setView] = useState<'grid' | 'list'>('grid')
  const [search, setSearch] = useState('')

  useEffect(() => {
    getFavorites().then(rows => { setItems(rows); setLoading(false) })
  }, [isLoggedIn])

  const remove = async (id: string) => {
    setItems(prev => prev.filter(i => i.id !== id))
    await toggleFavorite(id)
  }

  const filtered = items.filter(i => i.title.toLowerCase().includes(search.toLowerCase()) || i.category_slug.toLowerCase().includes(search.toLowerCase()))

  return (
    <div style={{ background: '#f4fbf8', minHeight: '100vh', fontFamily: 'Hanken Grotesk, Inter, system-ui, sans-serif' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '32px 24px 80px' }}>

        {/* Breadcrumb */}
        <Breadcrumb items={[{ label: 'Home', href: `/${locale}` }, { label: 'Favorites' }]} style={{ marginBottom: 20, textTransform: 'none', fontSize: 13, letterSpacing: 'normal' }} />

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'linear-gradient(135deg, #ef4444, #dc2626)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Heart size={22} color="white" fill="white" />
            </div>
            <div>
              <h1 style={{ fontSize: '28px', fontWeight: 800, color: '#161d1b', letterSpacing: '-0.02em' }}>My Favorites</h1>
              <p style={{ fontSize: '14px', color: '#6b7a76' }}>{isLoggedIn && !loading ? `${items.length} saved listing${items.length !== 1 ? 's' : ''}` : ' '}</p>
            </div>
          </div>
        </div>

        {/* Not logged in */}
        {!isLoggedIn && !loading && (
          <div style={{ background: 'white', borderRadius: '24px', padding: '80px 20px', textAlign: 'center', border: '1px solid #e2eae6' }}>
            <div style={{ width: '72px', height: '72px', borderRadius: '20px', background: '#f5ede0', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
              <Heart size={32} color="#6b7a76" />
            </div>
            <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#161d1b', marginBottom: '8px' }}>Sign in to see your favorites</h2>
            <p style={{ fontSize: '14px', color: '#6b7a76', marginBottom: '24px', maxWidth: '320px', margin: '0 auto 24px' }}>
              Your saved listings are tied to your account — sign in to view them.
            </p>
            <Link href={`/${locale}/auth?next=${encodeURIComponent(`/${locale}/favorites`)}`} style={{ display: 'inline-block', background: '#22d4a8', color: 'white', padding: '12px 28px', borderRadius: '12px', textDecoration: 'none', fontSize: '14px', fontWeight: 700 }}>
              Sign In
            </Link>
          </div>
        )}

        {isLoggedIn && items.length > 0 && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'white', borderRadius: '12px', padding: '0 14px', height: '42px', border: '1px solid #e2eae6', flex: 1, maxWidth: '320px' }}>
              <Search size={15} color="#6b7a76" />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search your favorites..."
                style={{ flex: 1, border: 'none', background: 'transparent', outline: 'none', fontSize: '13px', fontFamily: 'inherit', color: '#161d1b' }} />
            </div>
            <div style={{ display: 'flex', gap: '4px', background: 'white', padding: '4px', borderRadius: '10px', border: '1px solid #e2eae6' }}>
              <button onClick={() => setView('grid')} style={{ width: '32px', height: '32px', borderRadius: '8px', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', background: view === 'grid' ? '#22d4a8' : 'transparent', color: view === 'grid' ? 'white' : '#6b7a76' }}>
                <Grid size={14} />
              </button>
              <button onClick={() => setView('list')} style={{ width: '32px', height: '32px', borderRadius: '8px', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', background: view === 'list' ? '#22d4a8' : 'transparent', color: view === 'list' ? 'white' : '#6b7a76' }}>
                <List size={14} />
              </button>
            </div>
          </div>
        )}

        {/* Empty state */}
        {isLoggedIn && !loading && items.length === 0 && (
          <div style={{ background: 'white', borderRadius: '24px', padding: '80px 20px', textAlign: 'center', border: '1px solid #e2eae6' }}>
            <div style={{ width: '72px', height: '72px', borderRadius: '20px', background: '#f5ede0', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
              <Heart size={32} color="#6b7a76" />
            </div>
            <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#161d1b', marginBottom: '8px' }}>No favorites yet</h2>
            <p style={{ fontSize: '14px', color: '#6b7a76', marginBottom: '24px', maxWidth: '320px', margin: '0 auto 24px' }}>
              Tap the heart icon on any listing to save it here for later.
            </p>
            <Link href={`/${locale}`} style={{ display: 'inline-block', background: '#22d4a8', color: 'white', padding: '12px 28px', borderRadius: '12px', textDecoration: 'none', fontSize: '14px', fontWeight: 700 }}>
              Browse Listings
            </Link>
          </div>
        )}

        {/* No search results */}
        {isLoggedIn && items.length > 0 && filtered.length === 0 && (
          <div style={{ background: 'white', borderRadius: '24px', padding: '60px 20px', textAlign: 'center', border: '1px solid #e2eae6' }}>
            <p style={{ fontSize: '15px', color: '#6b7a76' }}>No favorites match "{search}"</p>
          </div>
        )}

        {/* Grid/List */}
        {isLoggedIn && filtered.length > 0 && (
          <div style={{ display: 'grid', gridTemplateColumns: view === 'grid' ? 'repeat(3, 1fr)' : '1fr', gap: '16px' }}>
            {filtered.map(item => (
              <div key={item.id} style={{ background: 'white', borderRadius: '18px', overflow: 'hidden', border: '1px solid #e2eae6', display: view === 'list' ? 'flex' : 'block', position: 'relative', transition: 'all 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.borderColor = '#22d4a8'}
                onMouseLeave={e => e.currentTarget.style.borderColor = '#e2eae6'}
              >
                <Link href={`/${locale}/listing/${item.id}`} style={{ textDecoration: 'none', display: 'flex', flex: 1, flexDirection: view === 'list' ? 'row' : 'column' }}>
                  <div style={{ position: 'relative', aspectRatio: view === 'list' ? '1/1' : '4/3', width: view === 'list' ? '140px' : '100%', flexShrink: 0, overflow: 'hidden' }}>
                    <img src={item.images[0]} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    {item.badge && (
                      <span style={{ position: 'absolute', top: '10px', left: '10px', background: item.badge === 'diamond' ? '#22d4a8' : 'white', color: item.badge === 'diamond' ? 'white' : '#22d4a8', fontSize: '9px', fontWeight: 700, padding: '4px 10px', borderRadius: '100px', textTransform: 'uppercase' }}>
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <div style={{ padding: '14px', flex: 1 }}>
                    <p style={{ fontSize: '11px', color: '#6b7a76', marginBottom: '4px', fontWeight: 500 }}>{item.category_slug}</p>
                    <p style={{ fontSize: '13px', fontWeight: 700, color: '#161d1b', marginBottom: '6px', lineHeight: 1.3, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{item.title}</p>
                    <p style={{ fontSize: '16px', fontWeight: 800, color: '#22d4a8', marginBottom: '6px' }}>{item.price.toLocaleString()} {item.currency}</p>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <p style={{ fontSize: '11px', color: '#6b7a76', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <MapPin size={11} /> {item.city}
                      </p>
                      <p style={{ fontSize: '10px', color: '#6b7a76' }}>Saved {timeAgo(item.savedAt)}</p>
                    </div>
                  </div>
                </Link>

                {/* Remove button */}
                <button onClick={() => remove(item.id)}
                  style={{ position: 'absolute', top: view === 'list' ? '14px' : '10px', right: view === 'list' ? '14px' : '10px', width: '30px', height: '30px', borderRadius: '50%', background: 'rgba(255,255,255,0.95)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', transition: 'all 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#ef4444' }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.95)' }}
                >
                  <Trash2 size={14} color="#ef4444" className="trash-icon" style={{ pointerEvents: 'none' }} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
