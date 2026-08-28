'use client'

import { useState, use, useEffect, useRef, useMemo } from 'react'
import Link from 'next/link'
import {
  MapPin, Navigation, Home, Eye, ChevronRight,
  X, Filter, Layers, ZoomIn, Building, Star, Wifi
} from 'lucide-react'
import { getSupabaseClient } from '@/lib/supabase/client'

type Locale = 'en' | 'fr' | 'ar' | 'es' | 'de'

const MINT    = '#22d4a8'
const INK     = '#161d1b'
const MUTED   = '#6b7a76'
const SURFACE = '#f4fbf8'
const FONT    = "'Inter', system-ui, sans-serif"

// Real Moroccan city centers — used to turn a real GPS reading into the
// nearest city, since listings only carry a `city` text column (no
// latitude/longitude of their own to do true proximity math against).
const CITY_CENTERS: { name: string; lat: number; lng: number }[] = [
  { name: 'Rabat',      lat: 34.0209, lng: -6.8416 },
  { name: 'Casablanca', lat: 33.5731, lng: -7.5898 },
  { name: 'Marrakech',  lat: 31.6295, lng: -7.9811 },
  { name: 'Tanger',     lat: 35.7595, lng: -5.8340 },
  { name: 'Fes',        lat: 34.0331, lng: -5.0003 },
  { name: 'Agadir',     lat: 30.4278, lng: -9.5981 },
  { name: 'Meknes',     lat: 33.8935, lng: -5.5473 },
  { name: 'Oujda',      lat: 34.6814, lng: -1.9086 },
  { name: 'Kenitra',    lat: 34.2610, lng: -6.5802 },
  { name: 'Tetouan',    lat: 35.5785, lng: -5.3684 },
]

function haversineKm(lat1: number, lng1: number, lat2: number, lng2: number) {
  const R = 6371
  const dLat = (lat2 - lat1) * Math.PI / 180
  const dLng = (lng2 - lng1) * Math.PI / 180
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLng / 2) ** 2
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

function nearestCity(lat: number, lng: number) {
  let best = CITY_CENTERS[0], bestDist = Infinity
  for (const c of CITY_CENTERS) {
    const d = haversineKm(lat, lng, c.lat, c.lng)
    if (d < bestDist) { bestDist = d; best = c }
  }
  return { city: best.name, distanceKm: Math.round(bestDist) }
}

// Deterministic pseudo-scatter for AR bubble screen position — real
// listings don't carry precise coordinates relative to the viewer, so this
// only controls layout, never implies a measured distance/bearing.
function scatterFor(id: string, index: number) {
  let hash = 0
  for (let i = 0; i < id.length; i++) hash = (hash * 31 + id.charCodeAt(i)) | 0
  const angle = ((hash % 360) + 360) % 360
  const distanceY = 25 + (Math.abs(hash >> 8) % 45)
  return { angle, distanceY }
}

type DbListing = { id: string; title: string; price: number; currency: string; images: string[]; city: string | null; badge: string | null }
type NearbyItem = { id: string; title: string; price: string; badge: string | null; image: string; angle: number; distance_y: number }

export default function ARFinderPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = use(params)
  const supabase = getSupabaseClient()
  const [mode, setMode]           = useState<'ar' | 'map' | 'list'>('ar')
  const [selected, setSelected]   = useState<NearbyItem | null>(null)
  const [hasCamera, setHasCamera] = useState(false)
  const [heading, setHeading]     = useState(0)
  const videoRef = useRef<HTMLVideoElement>(null)
  const streamRef = useRef<MediaStream | null>(null)

  // Real geolocation → nearest known city → real Supabase query
  const [locStatus, setLocStatus] = useState<'locating' | 'granted' | 'denied' | 'unsupported'>('locating')
  const [detectedCity, setDetectedCity] = useState<string | null>(null)
  const [listings, setListings] = useState<DbListing[] | null>(null)

  useEffect(() => {
    if (!('geolocation' in navigator)) { setLocStatus('unsupported'); return }
    navigator.geolocation.getCurrentPosition(
      pos => {
        const { city } = nearestCity(pos.coords.latitude, pos.coords.longitude)
        setDetectedCity(city)
        setLocStatus('granted')
      },
      () => setLocStatus('denied'),
      { enableHighAccuracy: false, timeout: 10000 }
    )
  }, [])

  useEffect(() => {
    // While locating, wait; once resolved (granted or not), run the real
    // query — filtered to the detected city when we have one, otherwise a
    // general "nearby" fallback across all active listings.
    if (locStatus === 'locating') return
    let cancelled = false
    let query = supabase.from('listings').select('id, title, price, currency, images, city, badge').eq('status', 'active')
    if (detectedCity) query = query.eq('city', detectedCity)
    query.order('boosted', { ascending: false }).order('created_at', { ascending: false }).limit(20)
      .then(({ data }) => { if (!cancelled) setListings(data || []) })
    return () => { cancelled = true }
  }, [locStatus, detectedCity])

  const filtered: NearbyItem[] = useMemo(() => (listings || []).map((l, i) => {
    const { angle, distanceY } = scatterFor(l.id, i)
    return {
      id: l.id,
      title: l.title,
      price: `${Math.round(l.price / 100).toLocaleString()} ${l.currency}`,
      badge: l.badge,
      image: l.images?.[0] || '',
      angle, distance_y: distanceY,
    }
  }), [listings])

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
                  <p style={{ fontSize: '11px', color: MUTED, fontWeight: 700, marginBottom: '2px' }}>📍 {detectedCity || 'Nearby'}</p>
                  <p style={{ fontSize: '12px', fontWeight: 900, color: INK, marginBottom: '4px', lineHeight: 1.3 }}>{prop.title}</p>
                  <p style={{ fontSize: '14px', fontWeight: 900, color: MINT }}>{prop.price}</p>
                </div>
              </div>
            )
          })}

          {/* Top HUD */}
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, padding: '20px', background: 'linear-gradient(180deg, rgba(0,0,0,0.7), transparent)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: MINT, animation: 'pulse 1s infinite' }} />
                <span style={{ fontSize: '13px', fontWeight: 900, color: 'white' }}>AR Finder</span>
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
                <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', fontWeight: 700 }}>
                  {locStatus === 'locating' ? 'Locating…' : detectedCity || 'Location unavailable'}
                </span>
              </div>
            </div>

            {(locStatus === 'denied' || locStatus === 'unsupported') && (
              <div style={{ marginTop: '10px', padding: '10px 14px', background: 'rgba(0,0,0,0.6)', borderRadius: '12px', textAlign: 'center' }}>
                <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.8)', fontWeight: 700 }}>
                  {locStatus === 'denied' ? 'Location access denied — showing listings from across the marketplace instead.' : "Your browser doesn't support location — showing listings from across the marketplace instead."}
                </p>
              </div>
            )}
          </div>

          {/* Bottom summary */}
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '20px', background: 'linear-gradient(0deg, rgba(0,0,0,0.8), transparent)' }}>
            <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', fontWeight: 700, textAlign: 'center' }}>
              {listings === null ? 'Loading nearby listings…' : `${filtered.length} listing${filtered.length === 1 ? '' : 's'} ${detectedCity ? `in ${detectedCity}` : 'nearby'} · Point camera around to explore`}
            </p>
          </div>
        </div>
      )}

      {/* LIST VIEW */}
      {mode === 'list' && (
        <div style={{ minHeight: '100vh', background: SURFACE }}>
          <div style={{ background: INK, padding: '20px 20px 16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <h1 style={{ fontSize: '20px', fontWeight: 900, color: 'white', letterSpacing: '-0.05em' }}>📍 Listings Near You</h1>
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
            {listings === null ? (
              <p style={{ textAlign: 'center', fontSize: '13px', fontWeight: 700, color: MUTED, padding: '32px' }}>Loading nearby listings…</p>
            ) : filtered.length === 0 ? (
              <p style={{ textAlign: 'center', fontSize: '13px', fontWeight: 700, color: MUTED, padding: '32px' }}>No active listings found {detectedCity ? `in ${detectedCity}` : 'nearby'} right now.</p>
            ) : filtered.map(prop => (
              <Link key={prop.id} href={`/${locale}/listing/${prop.id}`} style={{ textDecoration: 'none' }}>
                <div style={{ background: 'white', borderRadius: '16px', overflow: 'hidden', marginBottom: '12px', border: '1px solid #e2eae6', display: 'flex', transition: 'border-color 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = MINT}
                  onMouseLeave={e => e.currentTarget.style.borderColor = '#e2eae6'}
                >
                  <img src={prop.image} alt="" style={{ width: '100px', height: '90px', objectFit: 'cover', flexShrink: 0 }} />
                  <div style={{ padding: '12px 14px', flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px' }}>
                      <p style={{ fontSize: '13px', fontWeight: 900, color: INK, flex: 1 }}>{prop.title}</p>
                      {prop.badge && (
                        <span style={{ fontSize: '10px', fontWeight: 900, padding: '2px 8px', borderRadius: '100px', background: `${MINT}20`, color: MINT, flexShrink: 0, marginLeft: '6px', textTransform: 'uppercase' }}>
                          {prop.badge}
                        </span>
                      )}
                    </div>
                    <p style={{ fontSize: '14px', fontWeight: 900, color: MINT, marginBottom: '4px' }}>{prop.price}</p>
                    <span style={{ fontSize: '11px', color: MUTED, fontWeight: 700, display: 'flex', alignItems: 'center', gap: '3px' }}>
                      <MapPin size={10} /> {detectedCity || 'Morocco'}
                    </span>
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
                <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', fontWeight: 700 }}>📍 {detectedCity || 'Nearby'}</span>
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
