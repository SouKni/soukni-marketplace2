'use client'

import { useState, useCallback } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { Heart, ChevronLeft, ChevronRight, BadgeCheck, User, Building2, Store } from 'lucide-react'
import Link from 'next/link'
import type { Listing, Locale } from '@/lib/types'

interface ListingCardProps {
  listing: Listing
  locale: Locale
  dict: { save: string; viewDetails: string; mad: string }
}

export default function ListingCard({ listing, locale, dict }: ListingCardProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })
  const [currentIndex, setCurrentIndex] = useState(0)
  const [saved, setSaved] = useState(false)
  const [hovered, setHovered] = useState(false)

  const scrollPrev = useCallback((e: React.MouseEvent) => {
    e.preventDefault(); e.stopPropagation()
    if (!emblaApi) return
    emblaApi.scrollPrev()
    setCurrentIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  const scrollNext = useCallback((e: React.MouseEvent) => {
    e.preventDefault(); e.stopPropagation()
    if (!emblaApi) return
    emblaApi.scrollNext()
    setCurrentIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  const sellerIcon = listing.seller?.type === 'agent'
    ? <Building2 size={10} color="#2dd4bf" />
    : listing.seller?.type === 'dealer'
    ? <Store size={10} color="#94a3b8" />
    : <User size={10} color="#94a3b8" />

  return (
    <Link href={`/${locale}/listing/${listing.id}`} style={{ textDecoration: 'none', display: 'block' }}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          borderRadius: '20px',
          overflow: 'hidden',
          backgroundColor: 'white',
          border: '1px solid rgba(226,232,240,0.8)',
          boxShadow: hovered ? '0 12px 40px rgba(45,212,191,0.12), 0 4px 16px rgba(0,0,0,0.08)' : '0 2px 8px rgba(0,0,0,0.04)',
          transform: hovered ? 'translateY(-3px)' : 'translateY(0)',
          transition: 'all 0.3s ease',
          cursor: 'pointer',
        }}
      >
        {/* IMAGE SLIDER */}
        <div style={{ position: 'relative', paddingTop: '75%', overflow: 'hidden', backgroundColor: '#f1f5f9' }}>
          <div ref={emblaRef} style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
            <div style={{ display: 'flex', height: '100%' }}>
              {listing.images.map((src, i) => (
                <div key={i} style={{ flex: '0 0 100%', minWidth: 0, height: '100%', position: 'relative' }}>
                  <img
                    src={src}
                    alt={`${listing.title} ${i + 1}`}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s ease', transform: hovered ? 'scale(1.04)' : 'scale(1)' }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Gradient */}
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.3) 0%, transparent 60%)', opacity: hovered ? 1 : 0, transition: 'opacity 0.3s', pointerEvents: 'none' }} />

          {/* Prev/Next arrows */}
          {listing.images.length > 1 && hovered && (
            <>
              <button onClick={scrollPrev} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', width: '30px', height: '30px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.92)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.15)', zIndex: 2 }}>
                <ChevronLeft size={14} color="#0f172a" />
              </button>
              <button onClick={scrollNext} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', width: '30px', height: '30px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.92)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.15)', zIndex: 2 }}>
                <ChevronRight size={14} color="#0f172a" />
              </button>
            </>
          )}

          {/* Save button */}
          <button onClick={e => { e.preventDefault(); e.stopPropagation(); setSaved(!saved) }} style={{ position: 'absolute', top: '12px', right: '12px', width: '34px', height: '34px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(8px)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.12)', zIndex: 2, transition: 'transform 0.2s' }}>
            <Heart size={14} fill={saved ? '#ef4444' : 'none'} color={saved ? '#ef4444' : '#64748b'} />
          </button>

          {/* Premium badge */}
          {listing.isPremium && (
            <div style={{ position: 'absolute', top: '12px', left: '12px', backgroundColor: '#2dd4bf', color: 'white', fontSize: '9px', fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase', padding: '3px 8px', borderRadius: '100px', zIndex: 2, fontFamily: 'Inter, sans-serif' }}>
              Premium
            </div>
          )}

          {/* Dots */}
          {listing.images.length > 1 && (
            <div style={{ position: 'absolute', bottom: '10px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '4px', zIndex: 2 }}>
              {listing.images.map((_, i) => (
                <button key={i} onClick={e => { e.preventDefault(); e.stopPropagation(); emblaApi?.scrollTo(i); setCurrentIndex(i) }} style={{ width: i === currentIndex ? '16px' : '6px', height: '6px', borderRadius: '3px', border: 'none', cursor: 'pointer', backgroundColor: i === currentIndex ? 'white' : 'rgba(255,255,255,0.45)', transition: 'all 0.3s', padding: 0 }} />
              ))}
            </div>
          )}
        </div>

        {/* CONTENT */}
        <div style={{ padding: '14px 16px 16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
            <span style={{ fontSize: '9px', fontWeight: 800, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#2dd4bf', fontFamily: 'Inter, sans-serif' }}>
              {listing.category}
            </span>
            {listing.isVerified && <BadgeCheck size={14} color="#2dd4bf" />}
          </div>

          <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a', marginBottom: '4px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontFamily: 'Inter, sans-serif', letterSpacing: '-0.01em' }}>
            {listing.title}
          </h3>

          <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '10px' }}>
            {sellerIcon}
            <span style={{ fontSize: '11px', color: '#94a3b8', fontFamily: 'Inter, sans-serif' }}>
              {listing.location}{listing.year ? ` · ${listing.year}` : ''}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
            <span style={{ fontSize: '18px', fontWeight: 900, color: '#2dd4bf', letterSpacing: '-0.02em', fontFamily: 'Inter, sans-serif' }}>
              {listing.price.toLocaleString()}
            </span>
            <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#94a3b8', fontFamily: 'Inter, sans-serif' }}>
              MAD
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}
