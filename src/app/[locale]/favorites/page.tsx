'use client'

import { useState, use } from 'react'
import Link from 'next/link'
import { Heart, MapPin, Trash2, Grid, List, Search, ChevronRight } from 'lucide-react'

type Locale = 'en' | 'fr' | 'ar' | 'es' | 'de'

const FAVORITES = [
  { id: 1, title: 'iPhone 15 Pro Max 256GB Titanium Black', price: '12,500 MAD', category: 'Electronics', city: 'Rabat', image: 'https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&w=500', badge: 'Diamond', savedDate: '2 days ago' },
  { id: 2, title: 'BMW M4 Competition — Carbon Pack, Low Mileage', price: '785,000 MAD', category: 'Motors', city: 'Casablanca', image: 'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&w=500', badge: 'Diamond', savedDate: '4 days ago' },
  { id: 3, title: 'Modern Apartment, Casablanca CFC', price: '25,000 MAD/mo', category: 'Property', city: 'Casablanca', image: 'https://images.pexels.com/photos/1918291/pexels-photo-1918291.jpeg?auto=compress&w=500', badge: 'Diamond', savedDate: '1 week ago' },
  { id: 4, title: 'Patek Philippe Nautilus 5711', price: '1,850,000 MAD', category: 'The Vault', city: 'Casablanca', image: 'https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&w=500', badge: 'Diamond', savedDate: '1 week ago' },
  { id: 5, title: 'MacBook Pro 14" M3 Pro 18GB/512GB', price: '24,800 MAD', category: 'Electronics', city: 'Rabat', image: 'https://images.pexels.com/photos/1229861/pexels-photo-1229861.jpeg?auto=compress&w=500', badge: 'Verified', savedDate: '2 weeks ago' },
  { id: 6, title: 'Sony WH-1000XM5 Headphones', price: '3,400 MAD', category: 'Electronics', city: 'Rabat', image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&w=500', badge: null, savedDate: '3 weeks ago' },
]

export default function FavoritesPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = use(params)
  const [items, setItems] = useState(FAVORITES)
  const [view, setView] = useState<'grid' | 'list'>('grid')
  const [search, setSearch] = useState('')

  const remove = (id: number) => setItems(prev => prev.filter(i => i.id !== id))

  const filtered = items.filter(i => i.title.toLowerCase().includes(search.toLowerCase()) || i.category.toLowerCase().includes(search.toLowerCase()))

  return (
    <div style={{ background: '#f4fbf8', minHeight: '100vh', fontFamily: 'Hanken Grotesk, Inter, system-ui, sans-serif' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '32px 24px 80px' }}>

        {/* Breadcrumb */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '20px' }}>
          <Link href={`/${locale}`} style={{ fontSize: '13px', color: '#6b7a76', textDecoration: 'none' }}>Home</Link>
          <ChevronRight size={13} color="#6b7a76" />
          <span style={{ fontSize: '13px', fontWeight: 700, color: '#161d1b' }}>Favorites</span>
        </nav>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'linear-gradient(135deg, #ef4444, #dc2626)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Heart size={22} color="white" fill="white" />
            </div>
            <div>
              <h1 style={{ fontSize: '28px', fontWeight: 800, color: '#161d1b', letterSpacing: '-0.02em' }}>My Favorites</h1>
              <p style={{ fontSize: '14px', color: '#6b7a76' }}>{items.length} saved listing{items.length !== 1 ? 's' : ''}</p>
            </div>
          </div>
        </div>

        {items.length > 0 && (
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
        {items.length === 0 && (
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
        {items.length > 0 && filtered.length === 0 && (
          <div style={{ background: 'white', borderRadius: '24px', padding: '60px 20px', textAlign: 'center', border: '1px solid #e2eae6' }}>
            <p style={{ fontSize: '15px', color: '#6b7a76' }}>No favorites match "{search}"</p>
          </div>
        )}

        {/* Grid/List */}
        {filtered.length > 0 && (
          <div style={{ display: 'grid', gridTemplateColumns: view === 'grid' ? 'repeat(3, 1fr)' : '1fr', gap: '16px' }}>
            {filtered.map(item => (
              <div key={item.id} style={{ background: 'white', borderRadius: '18px', overflow: 'hidden', border: '1px solid #e2eae6', display: view === 'list' ? 'flex' : 'block', position: 'relative', transition: 'all 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.borderColor = '#22d4a8'}
                onMouseLeave={e => e.currentTarget.style.borderColor = '#e2eae6'}
              >
                <Link href={`/${locale}/listing/${item.id}`} style={{ textDecoration: 'none', display: 'flex', flex: 1, flexDirection: view === 'list' ? 'row' : 'column' }}>
                  <div style={{ position: 'relative', aspectRatio: view === 'list' ? '1/1' : '4/3', width: view === 'list' ? '140px' : '100%', flexShrink: 0, overflow: 'hidden' }}>
                    <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    {item.badge && (
                      <span style={{ position: 'absolute', top: '10px', left: '10px', background: item.badge === 'Diamond' ? '#22d4a8' : 'white', color: item.badge === 'Diamond' ? 'white' : '#22d4a8', fontSize: '9px', fontWeight: 700, padding: '4px 10px', borderRadius: '100px', textTransform: 'uppercase' }}>
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <div style={{ padding: '14px', flex: 1 }}>
                    <p style={{ fontSize: '11px', color: '#6b7a76', marginBottom: '4px', fontWeight: 500 }}>{item.category}</p>
                    <p style={{ fontSize: '13px', fontWeight: 700, color: '#161d1b', marginBottom: '6px', lineHeight: 1.3, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{item.title}</p>
                    <p style={{ fontSize: '16px', fontWeight: 800, color: '#22d4a8', marginBottom: '6px' }}>{item.price}</p>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <p style={{ fontSize: '11px', color: '#6b7a76', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <MapPin size={11} /> {item.city}
                      </p>
                      <p style={{ fontSize: '10px', color: '#6b7a76' }}>Saved {item.savedDate}</p>
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
