'use client'

import { useState, use, useEffect, useRef } from 'react'
import Link from 'next/link'
import {
  MapPin, Navigation, Home, Eye, ChevronRight,
  X, Filter, Layers, ZoomIn, Building, Star, Wifi
} from 'lucide-react'

type Locale = 'en' | 'fr' | 'ar' | 'es' | 'de'

const MINT    = '#22d4a8'
const INK     = '#161d1b'
const MUTED   = '#6b7a76'
const SURFACE = '#f4fbf8'
const FONT    = "'Inter', system-ui, sans-serif"

const NEARBY_PROPERTIES = [
  { id: '1', title: '3 Bedroom Apt — Agdal',      price: '18,500 MAD/mo', type: 'rent', distance: '120m', direction: 'ahead',         angle: 15,  distance_y: 30, badge: 'diamond', rating: 4.8, image: 'https://images.pexels.com/photos/1918291/pexels-photo-1918291.jpeg?auto=compress&w=300' },
  { id: '2', title: 'Studio — Hassan',              price: '4,200 MAD/mo',  type: 'rent', distance: '250m', direction: 'right',         angle: 85,  distance_y: 55, badge: null,      rating: 4.2, image: 'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&w=300' },
  { id: '3', title: 'Villa for Sale — Souissi',     price: '4.2M MAD',     type: 'sale', distance: '400m', direction: 'left',          angle: -60, distance_y: 65, badge: 'diamond', rating: 4.9, image: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&w=300' },
  { id: '4', title: '2 Bedroom — Hay Riad',        price: '9,800 MAD/mo',  type: 'rent', distance: '180m', direction: 'ahead-right',   angle: 35,  distance_y: 40, badge: 'certified', rating: 4.5, image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&w=300' },
  { id: '5', title: 'Commercial Space — Agdal',    price: '22,000 MAD/mo', type: 'rent', distance: '320m', direction: 'behind',        angle: 160, distance_y: 60, badge: null,      rating: 4.0, image: 'https://images.pexels.com/photos/269077/pexels-photo-269077.jpeg?auto=compress&w=300' },
]

export default function ARFinderPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = use(params)
  const [mode, setMode]           = useState<'ar' | 'map' | 'list'>('ar')
  const [selected, setSelected]   = useState<typeof NEARBY_PROPERTIES[0] | null>(null)
  const [filter, setFilter]       = useState<'all' | 'rent' | 'sale'>('all')
  const [maxPrice, setMaxPrice]   = useState(50000)
  const [hasCamera, setHasCamera] = useState(false)
  const [heading, setHeading]     = useState(0)
  const videoRef = useRef<HTMLVideoElement>(null)
  const streamRef = useRef<MediaStream | null>(null)

  const filtered = NEARBY_PROPERTIES.filter(p =>
    (filter === 'all' || p.type === filter)
  )

  useEffect(() => {
    // Device orientation for AR compass
    const handleOrientation = (e: DeviceOrientationEvent) => {
      if (e.alpha !== null) setHeading(e.alpha)
    }
    window.addEventListener('deviceorientation', handleOrientation)
    return () => window.removeEventListener('deviceorientation', handleOrientation)
  }, [])

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } }
      })
      streamRef.current = stream
      if (videoRef.current) videoRef.current.srcObject = stream
      setHasCamera(true)
    } catch {
      setHasCamera(false)
    }
  }

  useEffect(() => {
    if (mode === 'ar') startCamera()
    return () => { streamRef.current?.getTracks().forEach(t => t.stop()) }
  }, [mode])

  const typeColor = (type: string) => type === 'rent' ? '#0891b2' : '#7c3aed'

  return (
    <div style={{ background: INK, minHeight: '100vh', fontFamily: FONT, position: 'relative', overflow: 'hidden' }}>
      <style>{`
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.6} }
        @keyframes scan { 0%{top:0} 100%{top:100%} }
      `}</style>

      {/* AR CAMERA VIEW */}
      {mode === 'ar' && (
        <div style={{ position: 'relative', width: '100%', height: '100vh' }}>

          {/* Camera feed or simulated street */}
          {hasCamera ? (
            <video ref={videoRef} autoPlay playsInline muted style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            /* Simulated street background */
            <div style={{ width: '100%', height: '100%', background: 'linear-gradient(180deg, #87CEEB 0%, #98d4f0 40%, #9a8c6a 60%, #8a7a5a 100%)', position: 'relative', overflow: 'hidden' }}>
              {/* Sky */}
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, #5ba3c9 0%, #87ceeb 35%, #b8dfef 50%)' }} />
              {/* Buildings */}
              {[...Array(6)].map((_, i) => (
                <div key={i} style={{ position: 'absolute', bottom: '30%', left: `${i * 18 - 5}%`, width: `${12 + (i % 3) * 4}%`, height: `${25 + (i % 4) * 15}%`, background: `hsl(${210 + i*8}, 20%, ${45 + i*5}%)`, borderRadius: '2px 2px 0 0' }}>
                  {[...Array(3)].map((_, j) => (
                    <div key={j} style={{ position: 'absolute', top: `${20 + j*25}%`, left: '20%', right: '20%', height: '12%', display: 'flex', gap: '10%' }}>
                      <div style={{ flex: 1, background: `rgba(255,255,${Math.random() > 0.5 ? '200' : '0'},${Math.random() > 0.5 ? '0.8' : '0.1'})`, borderRadius: '1px' }} />
                      <div style={{ flex: 1, background: `rgba(255,255,${Math.random() > 0.5 ? '200' : '0'},${Math.random() > 0.5 ? '0.8' : '0.1'})`, borderRadius: '1px' }} />
                    </div>
                  ))}
                </div>
              ))}
              {/* Road */}
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '30%', background: '#555' }}>
                <div style={{ position: 'absolute', top: '40%', left: 0, right: 0, height: '6px', display: 'flex', gap: '20px', padding: '0 20px' }}>
                  {[...Array(8)].map((_, i) => <div key={i} style={{ flex: 1, background: '#ffff00', borderRadius: '2px', opacity: 0.8 }} />)}
                </div>
              </div>
              {/* Scan line */}
              <div style={{ position: 'absolute', left: 0, right: 0, height: '2px', background: `linear-gradient(90deg, transparent, ${MINT}, transparent)`, animation: 'scan 3s linear infinite', opacity: 0.6 }} />
              {/* Camera permission hint */}
              <div style={{ position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)', padding: '10px 20px', background: 'rgba(0,0,0,0.6)', borderRadius: '100px', textAlign: 'center' }}>
                <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.7)', fontWeight: 700 }}>Demo mode — Allow camera for real AR</p>
              </div>
            </div>
          )}

          {/* AR Property Bubbles */}
          {filtered.map((prop, i) => {
            const x = 50 + Math.sin((prop.angle * Math.PI) / 180) * 35
            const y = prop.distance_y
            return (
              <div key={prop.id}
                onClick={() => setSelected(prop)}
                style={{ position: 'absolute', left: `${x}%`, top: `${y}%`, transform: 'translate(-50%, -50%)', cursor: 'pointer', animation: `float ${2 + i * 0.3}s ease-in-out infinite`, zIndex: 10 }}>
                {/* Connector line */}
                <div style={{ position: 'absolute', bottom: '-20px', left: '50%', width: '2px', height: '20px', background: MINT, opacity: 0.6 }} />
                <div style={{ position: 'absolute', bottom: '-22px', left: '50%', transform: 'translateX(-50%)', width: '8px', height: '8px', borderRadius: '50%', background: MINT, boxShadow: `0 0 12px ${MINT}` }} />

                {/* Bubble */}
                <div style={{ background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(12px)', borderRadius: '16px', padding: '10px 14px', border: `2px solid ${prop.badge === 'diamond' ? MINT : 'rgba(255,255,255,0.5)'}`, boxShadow: `0 8px 32px rgba(0,0,0,0.3)`, minWidth: '160px', position: 'relative' }}>
                  {prop.badge && (
                    <span style={{ position: 'absolute', top: '-8px', right: '8px', fontSize: '10px', fontWeight: 900, padding: '2px 8px', borderRadius: '100px', background: MINT, color: 'white', textTransform: 'uppercase' }}>
                      {prop.badge === 'diamond' ? '💎' : '✓'} {prop.badge}
                    </span>
                  )}
                  <p style={{ fontSize: '11px', color: MUTED, fontWeight: 700, marginBottom: '2px' }}>📍 {prop.distance}</p>
                  <p style={{ fontSize: '12px', fontWeight: 900, color: INK, marginBottom: '4px', lineHeight: 1.3 }}>{prop.title}</p>
                  <p style={{ fontSize: '14px', fontWeight: 900, color: typeColor(prop.type) }}>{prop.price}</p>
                </div>
              </div>
            )
          })}

          {/* Top HUD */}
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, padding: '20px', background: 'linear-gradient(180deg, rgba(0,0,0,0.7), transparent)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: MINT, animation: 'pulse 1s infinite' }} />
                <span style={{ fontSize: '13px', fontWeight: 900, color: 'white' }}>AR Property Finder</span>
              </div>
              <div style={{ display: 'flex', gap: '6px' }}>
                {[
                  { key: 'ar',   label: '📷 AR' },
                  { key: 'map',  label: '🗺 Map' },
                  { key: 'list', label: '☰ List' },
                ].map(m => (
                  <button key={m.key} onClick={() => setMode(m.key as any)}
                    style={{ padding: '6px 12px', borderRadius: '100px', border: 'none', background: mode === m.key ? MINT : 'rgba(255,255,255,0.2)', color: 'white', fontSize: '12px', fontWeight: 900, cursor: 'pointer', fontFamily: FONT }}>
                    {m.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Compass */}
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '12px' }}>
              <div style={{ background: 'rgba(0,0,0,0.5)', borderRadius: '100px', padding: '6px 16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Navigation size={14} color={MINT} style={{ transform: `rotate(${heading}deg)`, transition: 'transform 0.3s' }} />
                <span style={{ fontSize: '12px', fontWeight: 900, color: 'white' }}>
                  {['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'][Math.round(heading / 45) % 8]}
                </span>
                <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', fontWeight: 700 }}>Agdal, Rabat</span>
              </div>
            </div>
          </div>

          {/* Bottom filters */}
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '20px', background: 'linear-gradient(0deg, rgba(0,0,0,0.8), transparent)' }}>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '12px', overflowX: 'auto' }}>
              {[
                { key: 'all',  label: '🏘 All Properties' },
                { key: 'rent', label: '🔑 For Rent' },
                { key: 'sale', label: '🏷 For Sale' },
              ].map(f => (
                <button key={f.key} onClick={() => setFilter(f.key as any)}
                  style={{ whiteSpace: 'nowrap', padding: '8px 16px', borderRadius: '100px', border: `1.5px solid ${filter === f.key ? MINT : 'rgba(255,255,255,0.3)'}`, background: filter === f.key ? MINT : 'rgba(255,255,255,0.1)', color: 'white', fontSize: '12px', fontWeight: 900, cursor: 'pointer', fontFamily: FONT }}>
                  {f.label}
                </button>
              ))}
            </div>
            <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', fontWeight: 700, textAlign: 'center' }}>
              {filtered.length} properties within 500m · Point camera around to explore
            </p>
          </div>
        </div>
      )}

      {/* LIST VIEW */}
      {mode === 'list' && (
        <div style={{ minHeight: '100vh', background: SURFACE }}>
          <div style={{ background: INK, padding: '20px 20px 16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <h1 style={{ fontSize: '20px', fontWeight: 900, color: 'white', letterSpacing: '-0.05em' }}>📍 Properties Near You</h1>
              <div style={{ display: 'flex', gap: '6px' }}>
                {[{ key: 'ar', label: '📷' }, { key: 'map', label: '🗺' }, { key: 'list', label: '☰' }].map(m => (
                  <button key={m.key} onClick={() => setMode(m.key as any)}
                    style={{ width: '36px', height: '36px', borderRadius: '10px', border: 'none', background: mode === m.key ? MINT : 'rgba(255,255,255,0.1)', color: 'white', fontSize: '14px', cursor: 'pointer', fontFamily: FONT }}>
                    {m.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div style={{ padding: '16px' }}>
            {NEARBY_PROPERTIES.map(prop => (
              <Link key={prop.id} href={`/${locale}/listing/${prop.id}`} style={{ textDecoration: 'none' }}>
                <div style={{ background: 'white', borderRadius: '16px', overflow: 'hidden', marginBottom: '12px', border: '1px solid #e2eae6', display: 'flex', transition: 'border-color 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = MINT}
                  onMouseLeave={e => e.currentTarget.style.borderColor = '#e2eae6'}
                >
                  <img src={prop.image} alt="" style={{ width: '100px', height: '90px', objectFit: 'cover', flexShrink: 0 }} />
                  <div style={{ padding: '12px 14px', flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px' }}>
                      <p style={{ fontSize: '13px', fontWeight: 900, color: INK, flex: 1 }}>{prop.title}</p>
                      <span style={{ fontSize: '10px', fontWeight: 900, padding: '2px 8px', borderRadius: '100px', background: typeColor(prop.type) + '20', color: typeColor(prop.type), flexShrink: 0, marginLeft: '6px' }}>
                        {prop.type}
                      </span>
                    </div>
                    <p style={{ fontSize: '14px', fontWeight: 900, color: MINT, marginBottom: '4px' }}>{prop.price}</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '11px', color: MUTED, fontWeight: 700, display: 'flex', alignItems: 'center', gap: '3px' }}>
                        <MapPin size={10} /> {prop.distance}
                      </span>
                      <span style={{ fontSize: '11px', color: '#f59e0b', fontWeight: 900, display: 'flex', alignItems: 'center', gap: '2px' }}>
                        ★ {prop.rating}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Selected property panel */}
      {selected && mode === 'ar' && (
        <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 100, padding: '20px', background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(12px)' }}>
          <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
            <img src={selected.image} alt="" style={{ width: '72px', height: '72px', borderRadius: '14px', objectFit: 'cover', flexShrink: 0 }} />
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: '15px', fontWeight: 900, color: 'white', marginBottom: '3px', lineHeight: 1.3 }}>{selected.title}</p>
              <p style={{ fontSize: '16px', fontWeight: 900, color: MINT, marginBottom: '4px' }}>{selected.price}</p>
              <div style={{ display: 'flex', gap: '6px' }}>
                <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', fontWeight: 700 }}>📍 {selected.distance}</span>
                <span style={{ fontSize: '11px', color: '#f59e0b', fontWeight: 900 }}>★ {selected.rating}</span>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flexShrink: 0 }}>
              <Link href={`/${locale}/listing/${selected.id}`}
                style={{ padding: '10px 18px', borderRadius: '12px', background: MINT, color: 'white', textDecoration: 'none', fontSize: '13px', fontWeight: 900, textAlign: 'center' }}>
                View →
              </Link>
              <button onClick={() => setSelected(null)}
                style={{ padding: '8px', borderRadius: '10px', background: 'rgba(255,255,255,0.1)', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.5)', fontFamily: FONT, fontSize: '12px', fontWeight: 700 }}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
