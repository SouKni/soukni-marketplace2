'use client'

import { useState, use, useRef } from 'react'
import Link from 'next/link'
import { ChevronRight, Download, Share2, Printer, Check, Smartphone, Eye, ExternalLink } from 'lucide-react'

type Locale = 'en' | 'fr' | 'ar' | 'es' | 'de'

const MINT    = '#22d4a8'
const SURFACE = '#f4fbf8'
const INK     = '#161d1b'
const MUTED   = '#6b7a76'
const FONT    = "'Inter', system-ui, sans-serif"

const MOCK_ADS: Record<string, { title: string; price: string; image: string; city: string; category: string }> = {
  '1': { title: 'iPhone 15 Pro Max 256GB — Titanium Black', price: '12,500 MAD', image: 'https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&w=400', city: 'Rabat', category: 'Electronics' },
  '2': { title: 'MacBook Pro 14" M3 Pro 18GB/512GB', price: '24,800 MAD', image: 'https://images.pexels.com/photos/1229861/pexels-photo-1229861.jpeg?auto=compress&w=400', city: 'Rabat', category: 'Electronics' },
  '3': { title: 'AirPods Pro 2nd Gen — Sealed Box', price: '1,850 MAD', image: 'https://images.pexels.com/photos/8000631/pexels-photo-8000631.jpeg?auto=compress&w=400', city: 'Rabat', category: 'Electronics' },
}

// Generate a simple SVG QR code pattern (decorative — in production use a real QR library)
const generateQRPattern = (size: number) => {
  const cells: { x: number; y: number }[] = []
  const modules = 21
  const cell = size / modules

  // Simulate QR code data pattern
  const pattern = [
    [1,1,1,1,1,1,1,0,1,0,1,0,1,1,1,1,1,1,1,0,0],
    [1,0,0,0,0,0,1,0,0,1,0,1,1,0,0,0,0,0,1,0,0],
    [1,0,1,1,1,0,1,0,1,0,1,0,1,0,1,1,1,0,1,0,0],
    [1,0,1,1,1,0,1,0,0,1,0,1,1,0,1,1,1,0,1,0,0],
    [1,0,1,1,1,0,1,0,1,0,1,0,1,0,1,1,1,0,1,0,0],
    [1,0,0,0,0,0,1,0,0,1,0,1,1,0,0,0,0,0,1,0,0],
    [1,1,1,1,1,1,1,0,1,0,1,0,1,1,1,1,1,1,1,0,0],
    [0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0],
    [1,1,0,1,0,1,1,1,0,0,1,0,1,1,0,1,0,1,1,1,0],
    [0,1,1,0,1,0,0,0,1,1,0,1,0,1,1,0,1,0,0,0,1],
    [1,0,1,1,0,1,1,0,0,0,1,0,1,0,1,1,0,1,1,0,0],
    [0,1,0,0,1,0,0,1,1,1,0,1,0,1,0,0,1,0,0,1,1],
    [1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1],
    [0,0,0,0,0,0,0,0,1,1,0,1,0,1,1,0,1,0,0,1,0],
    [1,1,1,1,1,1,1,0,0,0,1,0,1,0,1,1,0,1,1,0,0],
    [1,0,0,0,0,0,1,0,1,1,0,1,0,1,0,0,1,0,0,1,1],
    [1,0,1,1,1,0,1,1,0,0,1,0,1,0,1,1,0,1,1,0,0],
    [1,0,1,1,1,0,1,0,1,1,0,1,0,1,0,0,1,0,0,1,1],
    [1,0,1,1,1,0,1,0,0,0,1,0,1,0,1,1,0,1,1,0,0],
    [1,0,0,0,0,0,1,1,1,1,0,1,0,1,0,0,1,0,0,1,0],
    [1,1,1,1,1,1,1,0,0,0,1,0,1,0,1,1,0,1,1,0,0],
  ]

  pattern.forEach((row, y) => {
    row.forEach((val, x) => {
      if (val === 1) cells.push({ x, y })
    })
  })

  return { cells, modules, cell }
}

export default function QRPage({ params }: { params: Promise<{ locale: Locale; adId: string }> }) {
  const { locale, adId } = use(params)
  const [copied, setCopied]   = useState(false)
  const [style, setStyle]     = useState<'minimal' | 'branded' | 'flyer'>('branded')
  const qrRef = useRef<SVGSVGElement>(null)

  const ad  = MOCK_ADS[adId] || MOCK_ADS['1']
  const url = `https://soukni.com/${locale}/listing/${adId}`

  const { cells, modules, cell } = generateQRPattern(200)

  const handleCopy = () => {
    navigator.clipboard?.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: ad.title, text: `Check out this listing on SouKni: ${ad.title}`, url })
    } else {
      handleCopy()
    }
  }

  return (
    <div style={{ background: SURFACE, minHeight: '100vh', fontFamily: FONT }}>
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '32px 24px 80px' }}>

        {/* Breadcrumb */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '24px' }}>
          <Link href={`/${locale}/account/my-ads`} style={{ fontSize: '13px', color: MUTED, textDecoration: 'none', fontWeight: 700 }}>My Ads</Link>
          <ChevronRight size={13} color={MUTED} />
          <span style={{ fontSize: '13px', fontWeight: 900, color: INK }}>QR Code</span>
        </nav>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '24px', alignItems: 'start' }}>

          {/* LEFT — Controls */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

            {/* Ad info */}
            <div style={{ background: 'white', borderRadius: '20px', padding: '20px', border: '1px solid #e2eae6' }}>
              <h2 style={{ fontSize: '20px', fontWeight: 900, color: INK, letterSpacing: '-0.05em', marginBottom: '16px' }}>QR Code for Your Ad</h2>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <img src={ad.image} alt="" style={{ width: '60px', height: '60px', borderRadius: '12px', objectFit: 'cover', flexShrink: 0 }} />
                <div>
                  <p style={{ fontSize: '13px', fontWeight: 900, color: INK, marginBottom: '3px', lineHeight: 1.3 }}>{ad.title}</p>
                  <p style={{ fontSize: '13px', fontWeight: 900, color: MINT, marginBottom: '3px' }}>{ad.price}</p>
                  <p style={{ fontSize: '11px', color: MUTED, fontWeight: 700 }}>{ad.category} · {ad.city}</p>
                </div>
              </div>
            </div>

            {/* Style selector */}
            <div style={{ background: 'white', borderRadius: '20px', padding: '20px', border: '1px solid #e2eae6' }}>
              <p style={{ fontSize: '13px', fontWeight: 900, color: INK, marginBottom: '14px', letterSpacing: '-0.03em' }}>QR Style</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {[
                  { key: 'minimal', label: 'Minimal', desc: 'Clean QR code only — for digital use', emoji: '⬛' },
                  { key: 'branded', label: 'Branded', desc: 'With SouKni logo and listing title', emoji: '💎' },
                  { key: 'flyer',   label: 'Print Flyer', desc: 'Full A5 flyer with photo, price and QR', emoji: '🖨️' },
                ].map(s => (
                  <button key={s.key} onClick={() => setStyle(s.key as any)}
                    style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '14px', borderRadius: '12px', border: `1.5px solid ${style === s.key ? MINT : '#e2eae6'}`, background: style === s.key ? '#f0fdf9' : 'white', cursor: 'pointer', fontFamily: FONT, textAlign: 'left', transition: 'all 0.15s' }}>
                    <span style={{ fontSize: '22px' }}>{s.emoji}</span>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: '14px', fontWeight: 900, color: style === s.key ? MINT : INK }}>{s.label}</p>
                      <p style={{ fontSize: '12px', color: MUTED, fontWeight: 700 }}>{s.desc}</p>
                    </div>
                    {style === s.key && (
                      <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: MINT, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <Check size={12} color="white" strokeWidth={3} />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Listing URL */}
            <div style={{ background: 'white', borderRadius: '20px', padding: '20px', border: '1px solid #e2eae6' }}>
              <p style={{ fontSize: '13px', fontWeight: 900, color: INK, marginBottom: '10px' }}>Listing URL</p>
              <div style={{ display: 'flex', gap: '8px' }}>
                <div style={{ flex: 1, padding: '10px 14px', background: SURFACE, borderRadius: '10px', border: '1px solid #e2eae6', fontSize: '12px', fontWeight: 700, color: MUTED, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {url}
                </div>
                <button onClick={handleCopy}
                  style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: '10px 14px', borderRadius: '10px', background: copied ? '#e6f9f3' : SURFACE, border: `1px solid ${copied ? MINT : '#e2eae6'}`, cursor: 'pointer', fontSize: '12px', fontWeight: 900, color: copied ? MINT : INK, fontFamily: FONT, transition: 'all 0.2s', whiteSpace: 'nowrap' }}>
                  {copied ? <><Check size={12} /> Copied!</> : 'Copy'}
                </button>
              </div>
            </div>

            {/* Use cases */}
            <div style={{ background: 'white', borderRadius: '20px', padding: '20px', border: '1px solid #e2eae6' }}>
              <p style={{ fontSize: '13px', fontWeight: 900, color: INK, marginBottom: '12px' }}>💡 How to use your QR code</p>
              {[
                { icon: '🖨️', text: 'Print on stickers and stick to the item' },
                { icon: '📱', text: 'Share the image on WhatsApp or Instagram' },
                { icon: '🪟', text: 'Tape on your car window or property gate' },
                { icon: '📄', text: 'Print the flyer and post it in your neighbourhood' },
              ].map((u, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                  <span style={{ fontSize: '16px' }}>{u.icon}</span>
                  <span style={{ fontSize: '12px', color: MUTED, fontWeight: 700 }}>{u.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — Preview + Actions */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', position: 'sticky', top: '24px' }}>

            {/* QR Preview */}
            <div style={{ background: 'white', borderRadius: '20px', padding: '24px', border: '1px solid #e2eae6', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

              {/* Minimal style */}
              {style === 'minimal' && (
                <div style={{ padding: '16px', background: 'white', borderRadius: '12px', boxShadow: '0 4px 16px rgba(0,0,0,0.08)' }}>
                  <svg ref={qrRef} width="200" height="200" viewBox="0 0 200 200" style={{ display: 'block' }}>
                    <rect width="200" height="200" fill="white" />
                    {cells.map((c, i) => (
                      <rect key={i} x={c.x * (200/modules)} y={c.y * (200/modules)} width={200/modules - 0.5} height={200/modules - 0.5} fill={INK} rx="0.5" />
                    ))}
                  </svg>
                </div>
              )}

              {/* Branded style */}
              {style === 'branded' && (
                <div style={{ padding: '20px', background: 'white', borderRadius: '16px', boxShadow: '0 4px 16px rgba(0,0,0,0.1)', width: '100%', maxWidth: '260px' }}>
                  {/* Logo */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', marginBottom: '14px' }}>
                    <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: MINT, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span style={{ color: 'white', fontWeight: 900, fontSize: '14px' }}>S</span>
                    </div>
                    <span style={{ fontSize: '18px', fontWeight: 900, color: INK, letterSpacing: '-0.05em' }}>SouKni</span>
                  </div>
                  {/* QR */}
                  <div style={{ padding: '12px', background: SURFACE, borderRadius: '12px', marginBottom: '12px', display: 'flex', justifyContent: 'center' }}>
                    <svg width="160" height="160" viewBox="0 0 200 200">
                      <rect width="200" height="200" fill={SURFACE} />
                      {cells.map((c, i) => (
                        <rect key={i} x={c.x * (200/modules)} y={c.y * (200/modules)} width={200/modules - 0.5} height={200/modules - 0.5} fill={INK} rx="0.5" />
                      ))}
                      {/* Center logo overlay */}
                      <rect x="84" y="84" width="32" height="32" fill="white" rx="4" />
                      <rect x="88" y="88" width="24" height="24" fill={MINT} rx="4" />
                      <text x="100" y="104" textAnchor="middle" fontSize="12" fill="white" fontWeight="900">S</text>
                    </svg>
                  </div>
                  {/* Title */}
                  <p style={{ fontSize: '11px', fontWeight: 900, color: INK, textAlign: 'center', lineHeight: 1.3, marginBottom: '4px' }}>{ad.title.slice(0, 40)}{ad.title.length > 40 ? '...' : ''}</p>
                  <p style={{ fontSize: '13px', fontWeight: 900, color: MINT, textAlign: 'center' }}>{ad.price}</p>
                  <p style={{ fontSize: '9px', color: MUTED, textAlign: 'center', marginTop: '8px', fontWeight: 700 }}>Scan to view on SouKni</p>
                </div>
              )}

              {/* Flyer style */}
              {style === 'flyer' && (
                <div style={{ background: 'white', borderRadius: '16px', boxShadow: '0 4px 16px rgba(0,0,0,0.1)', width: '100%', maxWidth: '260px', overflow: 'hidden' }}>
                  {/* Header */}
                  <div style={{ background: `linear-gradient(135deg, ${INK}, #2b3230)`, padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <div style={{ width: '22px', height: '22px', borderRadius: '6px', background: MINT, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span style={{ color: 'white', fontWeight: 900, fontSize: '11px' }}>S</span>
                    </div>
                    <span style={{ color: 'white', fontWeight: 900, fontSize: '14px', letterSpacing: '-0.05em' }}>SouKni</span>
                    <span style={{ marginLeft: 'auto', color: MINT, fontSize: '10px', fontWeight: 900 }}>FOR SALE</span>
                  </div>
                  {/* Photo */}
                  <img src={ad.image} alt="" style={{ width: '100%', height: '140px', objectFit: 'cover', display: 'block' }} />
                  {/* Content */}
                  <div style={{ padding: '14px 16px' }}>
                    <p style={{ fontSize: '12px', fontWeight: 900, color: INK, marginBottom: '4px', lineHeight: 1.3 }}>{ad.title}</p>
                    <p style={{ fontSize: '18px', fontWeight: 900, color: MINT, marginBottom: '10px', letterSpacing: '-0.03em' }}>{ad.price}</p>
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                      <div style={{ padding: '8px', background: SURFACE, borderRadius: '8px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <svg width="64" height="64" viewBox="0 0 200 200">
                          <rect width="200" height="200" fill={SURFACE} />
                          {cells.map((c, i) => (
                            <rect key={i} x={c.x * (200/modules)} y={c.y * (200/modules)} width={200/modules - 0.5} height={200/modules - 0.5} fill={INK} rx="0.5" />
                          ))}
                        </svg>
                      </div>
                      <div style={{ flex: 1 }}>
                        <p style={{ fontSize: '10px', fontWeight: 900, color: INK, marginBottom: '2px' }}>📱 Scan to contact</p>
                        <p style={{ fontSize: '9px', color: MUTED, fontWeight: 700, lineHeight: 1.4 }}>Point your camera at the QR code to view this listing on SouKni</p>
                      </div>
                    </div>
                  </div>
                  <div style={{ padding: '8px 16px 12px', background: SURFACE, textAlign: 'center' }}>
                    <p style={{ fontSize: '8px', color: MUTED, fontWeight: 700 }}>soukni.com · The Market in your Pocket 🇲🇦</p>
                  </div>
                </div>
              )}
            </div>

            {/* Action buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <button onClick={() => window.print()}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '13px', borderRadius: '12px', background: MINT, color: 'white', border: 'none', fontSize: '14px', fontWeight: 900, cursor: 'pointer', fontFamily: FONT }}>
                <Download size={16} /> Download QR Code
              </button>
              <button onClick={handleShare}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '13px', borderRadius: '12px', background: INK, color: 'white', border: 'none', fontSize: '14px', fontWeight: 900, cursor: 'pointer', fontFamily: FONT }}>
                <Share2 size={16} /> Share
              </button>
              <button onClick={() => window.print()}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '13px', borderRadius: '12px', background: 'white', color: INK, border: '1.5px solid #e2eae6', fontSize: '14px', fontWeight: 900, cursor: 'pointer', fontFamily: FONT }}>
                <Printer size={16} /> Print {style === 'flyer' ? 'Flyer' : 'QR Code'}
              </button>
              <Link href={`/${locale}/listing/${adId}`}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '12px', borderRadius: '12px', background: SURFACE, color: MUTED, border: '1px solid #e2eae6', textDecoration: 'none', fontSize: '13px', fontWeight: 900 }}>
                <Eye size={15} /> Preview Listing
              </Link>
            </div>

            {/* Stats */}
            <div style={{ background: 'white', borderRadius: '16px', padding: '18px', border: '1px solid #e2eae6' }}>
              <p style={{ fontSize: '12px', fontWeight: 900, color: MUTED, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '12px' }}>QR Code Scans</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                {[
                  { label: 'Total Scans', value: '47' },
                  { label: 'This Week', value: '12' },
                  { label: 'WhatsApp', value: '23' },
                  { label: 'Conversions', value: '3' },
                ].map(s => (
                  <div key={s.label} style={{ padding: '10px', background: SURFACE, borderRadius: '10px', textAlign: 'center' }}>
                    <p style={{ fontSize: '18px', fontWeight: 900, color: INK, letterSpacing: '-0.05em' }}>{s.value}</p>
                    <p style={{ fontSize: '10px', color: MUTED, fontWeight: 700 }}>{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
