'use client'

import { useState, use, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { Clock, ChevronRight, TrendingUp, Shield, Users, Zap, Check, AlertTriangle, Crown, Gavel, Heart, Share2, Eye, ArrowUp, Star, Lock } from 'lucide-react'

type Locale = 'en' | 'fr' | 'ar' | 'es' | 'de'

const MINT    = '#22d4a8'
const CREAM   = '#f5ede0'
const SURFACE = '#f4fbf8'
const INK     = '#161d1b'
const MUTED   = '#6b7a76'
const FONT    = "'Inter', system-ui, sans-serif"

const MOCK_AUCTIONS: Record<string, {
  id: string; title: string; image: string; images: string[]
  category: string; city: string; condition: string
  description: string; seller: { name: string; initials: string; rating: number; certified: boolean }
  startPrice: number; reservePrice: number; currentBid: number; currency: string
  endsAt: Date; totalBids: number; watchers: number; views: number
}> = {
  '1': {
    id: '1',
    title: 'Patek Philippe Nautilus 5711 — Full Set 2023',
    image: 'https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&w=800',
    images: [
      'https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&w=800',
      'https://images.pexels.com/photos/3094799/pexels-photo-3094799.jpeg?auto=compress&w=800',
      'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&w=800',
    ],
    category: 'The Vault', city: 'Casablanca', condition: 'Like New',
    description: 'Extremely rare Patek Philippe Nautilus ref. 5711/1A-010 in stainless steel with blue dial. Full set including original box, papers, and two extra links. Purchased from authorised dealer in Geneva in 2023. Battery health 100%. A once-in-a-lifetime opportunity.',
    seller: { name: 'Hassan El Idrissi', initials: 'HI', rating: 4.9, certified: true },
    startPrice: 1500000, reservePrice: 1700000, currentBid: 1720000, currency: 'MAD',
    endsAt: new Date(Date.now() + 2 * 60 * 60 * 1000 + 34 * 60 * 1000 + 18 * 1000),
    totalBids: 14, watchers: 47, views: 892,
  },
  '10': {
    id: '10',
    title: 'BMW M4 Competition xDrive 2023 — Full Options',
    image: 'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&w=800',
    images: [
      'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&w=800',
      'https://images.pexels.com/photos/1638459/pexels-photo-1638459.jpeg?auto=compress&w=800',
    ],
    category: 'Motors', city: 'Rabat', condition: 'Like New',
    description: 'BMW M4 Competition xDrive 2023, 510hp, full options package. Carbon ceramic brakes, M Driver Package, BMW Individual paint. Only 8,500km. Full BMW service history.',
    seller: { name: 'Youssef Alami', initials: 'YA', rating: 4.8, certified: true },
    startPrice: 700000, reservePrice: 850000, currentBid: 862000, currency: 'MAD',
    endsAt: new Date(Date.now() + 23 * 60 * 60 * 1000 + 11 * 60 * 1000),
    totalBids: 7, watchers: 23, views: 445,
  },
}

const BID_HISTORY = [
  { bidder: 'K***m', amount: 1720000, time: '2 min ago', winning: true },
  { bidder: 'A***i', amount: 1700000, time: '15 min ago', winning: false },
  { bidder: 'S***n', amount: 1680000, time: '34 min ago', winning: false },
  { bidder: 'M***r', amount: 1650000, time: '1h ago', winning: false },
  { bidder: 'K***m', amount: 1620000, time: '1h 20m ago', winning: false },
]

function useCountdown(target: Date) {
  const [timeLeft, setTimeLeft] = useState({ h: 0, m: 0, s: 0, total: 0 })
  useEffect(() => {
    const tick = () => {
      const diff = Math.max(0, target.getTime() - Date.now())
      setTimeLeft({
        h: Math.floor(diff / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
        total: diff,
      })
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [target])
  return timeLeft
}

export default function AuctionPage({ params }: { params: Promise<{ locale: Locale; listingId: string }> }) {
  const { locale, listingId } = use(params)
  const auction = MOCK_AUCTIONS[listingId] || MOCK_AUCTIONS['1']
  const time    = useCountdown(auction.endsAt)

  const [activeImg, setActiveImg]       = useState(0)
  const [bidAmount, setBidAmount]       = useState('')
  const [bidHistory, setBidHistory]     = useState(BID_HISTORY)
  const [currentBid, setCurrentBid]     = useState(auction.currentBid)
  const [totalBids, setTotalBids]       = useState(auction.totalBids)
  const [watching, setWatching]         = useState(false)
  const [bidPlaced, setBidPlaced]       = useState(false)
  const [bidError, setBidError]         = useState('')
  const [showConfirm, setShowConfirm]   = useState(false)
  const [autoBid, setAutoBid]           = useState(false)
  const [maxAutoBid, setMaxAutoBid]     = useState('')

  const minBid      = currentBid + 5000
  const isUrgent    = time.total < 60 * 60 * 1000 // < 1 hour
  const isEnded     = time.total <= 0
  const isReserve   = currentBid >= auction.reservePrice
  const bidNum      = Number(bidAmount)
  const canBid      = bidNum >= minBid && !isEnded

  const quickBids = [minBid, minBid + 10000, minBid + 25000, minBid + 50000]

  const placeBid = useCallback(() => {
    if (!canBid) {
      setBidError(`Minimum bid is ${minBid.toLocaleString()} MAD`)
      return
    }
    setBidError('')
    setShowConfirm(false)
    setBidPlaced(true)
    const newBid = { bidder: 'You', amount: bidNum, time: 'Just now', winning: true }
    setBidHistory(prev => [newBid, ...prev.map(b => ({ ...b, winning: false }))])
    setCurrentBid(bidNum)
    setTotalBids(t => t + 1)
    setBidAmount('')
    setTimeout(() => setBidPlaced(false), 3000)
  }, [bidNum, canBid, minBid])

  const TimeBox = ({ value, label }: { value: number; label: string }) => (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
      <div style={{ minWidth: '56px', padding: '10px 12px', background: isUrgent ? '#ef4444' : INK, borderRadius: '12px', textAlign: 'center', boxShadow: isUrgent ? '0 4px 16px rgba(239,68,68,0.3)' : '0 4px 16px rgba(22,29,27,0.2)' }}>
        <span style={{ fontSize: '24px', fontWeight: 900, color: 'white', fontVariantNumeric: 'tabular-nums', letterSpacing: '-0.05em', display: 'block', lineHeight: 1 }}>
          {String(value).padStart(2, '0')}
        </span>
      </div>
      <span style={{ fontSize: '10px', fontWeight: 900, color: MUTED, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{label}</span>
    </div>
  )

  return (
    <div style={{ background: SURFACE, minHeight: '100vh', fontFamily: FONT }}>
      <style>{`
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.5} }
        @keyframes slideIn { from{transform:translateY(-8px);opacity:0} to{transform:translateY(0);opacity:1} }
        .bid-row { animation: slideIn 0.3s ease; }
      `}</style>

      {/* URGENT BANNER */}
      {isUrgent && !isEnded && (
        <div style={{ background: '#ef4444', padding: '10px', textAlign: 'center' }}>
          <p style={{ fontSize: '13px', fontWeight: 900, color: 'white', letterSpacing: '-0.03em', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            <AlertTriangle size={15} style={{ animation: 'pulse 1s infinite' }} />
            Auction ends in {time.h}h {time.m}m {time.s}s — Bid now!
          </p>
        </div>
      )}

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px 24px 80px' }}>

        {/* Breadcrumb */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '20px' }}>
          <Link href={`/${locale}`} style={{ fontSize: '13px', color: MUTED, textDecoration: 'none', fontWeight: 700 }}>Home</Link>
          <ChevronRight size={13} color={MUTED} />
          <Link href={`/${locale}/${auction.category.toLowerCase().replace(' ', '-')}`} style={{ fontSize: '13px', color: MUTED, textDecoration: 'none', fontWeight: 700 }}>{auction.category}</Link>
          <ChevronRight size={13} color={MUTED} />
          <span style={{ fontSize: '13px', fontWeight: 900, color: INK }}>Live Auction</span>
        </nav>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: '24px', alignItems: 'start' }}>

          {/* LEFT */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

            {/* Gallery */}
            <div style={{ background: 'white', borderRadius: '24px', overflow: 'hidden', border: '1px solid #e2eae6' }}>
              <div style={{ position: 'relative', aspectRatio: '16/10', overflow: 'hidden', background: SURFACE }}>
                <img src={auction.images[activeImg]} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'opacity 0.3s' }} />
                {/* Auction live badge */}
                <div style={{ position: 'absolute', top: '16px', left: '16px', display: 'flex', gap: '8px' }}>
                  {!isEnded ? (
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(239,68,68,0.9)', backdropFilter: 'blur(8px)', color: 'white', fontSize: '11px', fontWeight: 900, padding: '6px 12px', borderRadius: '100px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                      <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: 'white', animation: 'pulse 1s infinite', display: 'inline-block' }} />
                      Live Auction
                    </span>
                  ) : (
                    <span style={{ background: MUTED, color: 'white', fontSize: '11px', fontWeight: 900, padding: '6px 12px', borderRadius: '100px', textTransform: 'uppercase' }}>Ended</span>
                  )}
                  <span style={{ background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(8px)', color: INK, fontSize: '11px', fontWeight: 900, padding: '6px 12px', borderRadius: '100px' }}>
                    {auction.condition}
                  </span>
                </div>
                {/* Stats */}
                <div style={{ position: 'absolute', bottom: '16px', right: '16px', display: 'flex', gap: '6px' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'rgba(0,0,0,0.55)', color: 'white', fontSize: '11px', fontWeight: 900, padding: '5px 10px', borderRadius: '100px' }}>
                    <Eye size={11} /> {auction.views}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'rgba(0,0,0,0.55)', color: 'white', fontSize: '11px', fontWeight: 900, padding: '5px 10px', borderRadius: '100px' }}>
                    <Users size={11} /> {auction.watchers} watching
                  </span>
                </div>
              </div>
              {/* Thumbnails */}
              <div style={{ display: 'flex', gap: '8px', padding: '12px 16px' }}>
                {auction.images.map((img, i) => (
                  <button key={i} onClick={() => setActiveImg(i)}
                    style={{ width: '72px', height: '54px', borderRadius: '8px', overflow: 'hidden', border: `2px solid ${activeImg === i ? MINT : '#e2eae6'}`, cursor: 'pointer', padding: 0, flexShrink: 0 }}>
                    <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </button>
                ))}
              </div>
            </div>

            {/* Title & description */}
            <div style={{ background: 'white', borderRadius: '24px', padding: '28px', border: '1px solid #e2eae6' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px', marginBottom: '16px' }}>
                <h1 style={{ fontSize: '22px', fontWeight: 900, color: INK, letterSpacing: '-0.05em', lineHeight: 1.3 }}>{auction.title}</h1>
                <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
                  <button onClick={() => setWatching(!watching)}
                    style={{ width: '38px', height: '38px', borderRadius: '10px', border: `1.5px solid ${watching ? '#ef4444' : '#e2eae6'}`, background: watching ? '#fef2f2' : 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Heart size={16} color={watching ? '#ef4444' : MUTED} fill={watching ? '#ef4444' : 'none'} />
                  </button>
                  <button style={{ width: '38px', height: '38px', borderRadius: '10px', border: '1.5px solid #e2eae6', background: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Share2 size={16} color={MUTED} />
                  </button>
                </div>
              </div>
              <p style={{ fontSize: '14px', color: MUTED, lineHeight: 1.7, fontWeight: 600, whiteSpace: 'pre-line' }}>{auction.description}</p>
            </div>

            {/* Bid history */}
            <div style={{ background: 'white', borderRadius: '24px', padding: '24px', border: '1px solid #e2eae6' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 900, color: INK, letterSpacing: '-0.03em' }}>Bid History</h3>
                <span style={{ fontSize: '12px', fontWeight: 700, color: MUTED }}>{totalBids} bids total</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                {bidHistory.map((b, i) => (
                  <div key={i} className="bid-row" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0', borderBottom: i < bidHistory.length - 1 ? '1px solid #f4fbf8' : 'none' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: b.winning ? `linear-gradient(135deg, ${MINT}, #0f9b8e)` : SURFACE, border: b.winning ? 'none' : '1px solid #e2eae6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {b.winning ? <Crown size={14} color="white" /> : <span style={{ fontSize: '10px', fontWeight: 900, color: MUTED }}>{i + 1}</span>}
                      </div>
                      <div>
                        <p style={{ fontSize: '13px', fontWeight: 900, color: b.winning ? INK : MUTED }}>{b.bidder}</p>
                        <p style={{ fontSize: '11px', color: MUTED, fontWeight: 700 }}>{b.time}</p>
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <p style={{ fontSize: '15px', fontWeight: 900, color: b.winning ? MINT : INK }}>{b.amount.toLocaleString()} MAD</p>
                      {b.winning && <p style={{ fontSize: '10px', fontWeight: 900, color: MINT }}>Winning bid</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT — Bidding panel */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', position: 'sticky', top: '20px' }}>

            {/* Countdown */}
            <div style={{ background: isUrgent ? `linear-gradient(135deg, #ef4444, #dc2626)` : `linear-gradient(135deg, ${INK}, #2b3230)`, borderRadius: '20px', padding: '22px', textAlign: 'center' }}>
              <p style={{ fontSize: '11px', fontWeight: 900, color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '14px' }}>
                {isEnded ? 'Auction Ended' : isUrgent ? '⚡ Ending Soon!' : 'Time Remaining'}
              </p>
              {!isEnded ? (
                <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '14px' }}>
                  <TimeBox value={time.h} label="Hours" />
                  <span style={{ fontSize: '24px', fontWeight: 900, color: 'rgba(255,255,255,0.4)', alignSelf: 'center', marginBottom: '18px' }}>:</span>
                  <TimeBox value={time.m} label="Mins" />
                  <span style={{ fontSize: '24px', fontWeight: 900, color: 'rgba(255,255,255,0.4)', alignSelf: 'center', marginBottom: '18px' }}>:</span>
                  <TimeBox value={time.s} label="Secs" />
                </div>
              ) : (
                <p style={{ fontSize: '18px', fontWeight: 900, color: 'white', marginBottom: '14px' }}>This auction has closed</p>
              )}
              <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
                <div style={{ textAlign: 'center' }}>
                  <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', fontWeight: 700 }}>Total Bids</p>
                  <p style={{ fontSize: '18px', fontWeight: 900, color: 'white' }}>{totalBids}</p>
                </div>
                <div style={{ width: '1px', background: 'rgba(255,255,255,0.1)' }} />
                <div style={{ textAlign: 'center' }}>
                  <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', fontWeight: 700 }}>Watching</p>
                  <p style={{ fontSize: '18px', fontWeight: 900, color: 'white' }}>{auction.watchers + (watching ? 1 : 0)}</p>
                </div>
                <div style={{ width: '1px', background: 'rgba(255,255,255,0.1)' }} />
                <div style={{ textAlign: 'center' }}>
                  <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', fontWeight: 700 }}>Reserve</p>
                  <p style={{ fontSize: '18px', fontWeight: 900, color: isReserve ? MINT : '#f59e0b' }}>{isReserve ? '✓ Met' : 'Not met'}</p>
                </div>
              </div>
            </div>

            {/* Current bid */}
            <div style={{ background: 'white', borderRadius: '20px', padding: '22px', border: '1px solid #e2eae6' }}>
              <p style={{ fontSize: '11px', fontWeight: 900, color: MUTED, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '6px' }}>Current Winning Bid</p>
              <p style={{ fontSize: '36px', fontWeight: 900, color: MINT, letterSpacing: '-0.05em', marginBottom: '4px' }}>
                {currentBid.toLocaleString()} <span style={{ fontSize: '18px', fontWeight: 700, color: MUTED }}>MAD</span>
              </p>
              <p style={{ fontSize: '12px', color: MUTED, fontWeight: 700, marginBottom: '16px' }}>
                Started at {auction.startPrice.toLocaleString()} MAD · Min next bid: <strong style={{ color: INK }}>{minBid.toLocaleString()} MAD</strong>
              </p>

              {/* Reserve met indicator */}
              <div style={{ padding: '10px 14px', borderRadius: '10px', background: isReserve ? '#f0fdf9' : '#fff4e0', border: `1px solid ${isReserve ? MINT : '#fde68a'}`, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                {isReserve ? <Check size={14} color={MINT} /> : <AlertTriangle size={14} color="#b45309" />}
                <p style={{ fontSize: '12px', fontWeight: 700, color: isReserve ? '#0f9b8e' : '#b45309' }}>
                  {isReserve ? 'Reserve price met — this item WILL sell' : 'Reserve not yet met — seller may not sell below reserve'}
                </p>
              </div>

              {/* Bid success */}
              {bidPlaced && (
                <div style={{ padding: '12px 14px', background: '#f0fdf9', borderRadius: '12px', border: `1.5px solid ${MINT}`, marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px', animation: 'slideIn 0.3s ease' }}>
                  <Check size={16} color={MINT} />
                  <p style={{ fontSize: '13px', fontWeight: 900, color: '#0f9b8e' }}>Bid placed! You're currently winning 🎉</p>
                </div>
              )}

              {/* Quick bid buttons */}
              {!isEnded && (
                <>
                  <p style={{ fontSize: '11px', fontWeight: 900, color: MUTED, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '8px' }}>Quick Bid</p>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px', marginBottom: '14px' }}>
                    {quickBids.map(amount => (
                      <button key={amount} onClick={() => setBidAmount(amount.toString())}
                        style={{ padding: '10px', borderRadius: '10px', border: `1.5px solid ${bidAmount === amount.toString() ? MINT : '#e2eae6'}`, background: bidAmount === amount.toString() ? '#f0fdf9' : 'white', cursor: 'pointer', fontFamily: FONT, fontSize: '12px', fontWeight: 900, color: bidAmount === amount.toString() ? MINT : INK, transition: 'all 0.15s' }}>
                        {amount.toLocaleString()} MAD
                      </button>
                    ))}
                  </div>

                  {/* Custom bid input */}
                  <p style={{ fontSize: '11px', fontWeight: 900, color: MUTED, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '8px' }}>Or Enter Amount</p>
                  <div style={{ display: 'flex', gap: '8px', marginBottom: bidError ? '6px' : '14px' }}>
                    <input type="number" value={bidAmount} onChange={e => { setBidAmount(e.target.value); setBidError('') }}
                      placeholder={`Min: ${minBid.toLocaleString()}`} min={minBid}
                      style={{ flex: 1, padding: '12px 16px', borderRadius: '12px', border: `1.5px solid ${bidError ? '#ef4444' : '#e2eae6'}`, fontSize: '15px', fontFamily: FONT, fontWeight: 900, color: INK, background: SURFACE, outline: 'none' }}
                      onFocus={e => e.target.style.borderColor = MINT}
                      onBlur={e => e.target.style.borderColor = bidError ? '#ef4444' : '#e2eae6'}
                    />
                    <span style={{ display: 'flex', alignItems: 'center', padding: '12px 14px', background: SURFACE, borderRadius: '12px', border: '1.5px solid #e2eae6', fontSize: '13px', fontWeight: 900, color: MUTED, whiteSpace: 'nowrap' }}>MAD</span>
                  </div>
                  {bidError && <p style={{ fontSize: '12px', color: '#ef4444', fontWeight: 700, marginBottom: '10px' }}>⚠ {bidError}</p>}

                  {/* Auto-bid */}
                  <div style={{ padding: '14px', background: SURFACE, borderRadius: '12px', border: '1px solid #e2eae6', marginBottom: '14px' }}>
                    <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', marginBottom: autoBid ? '10px' : '0' }}>
                      <div>
                        <p style={{ fontSize: '13px', fontWeight: 900, color: INK }}>🤖 Auto-Bid</p>
                        <p style={{ fontSize: '11px', color: MUTED, fontWeight: 700 }}>We'll bid automatically up to your max</p>
                      </div>
                      <div onClick={() => setAutoBid(!autoBid)}
                        style={{ width: '40px', height: '22px', borderRadius: '11px', background: autoBid ? MINT : '#e2eae6', position: 'relative', cursor: 'pointer', transition: 'background 0.2s', flexShrink: 0 }}>
                        <div style={{ position: 'absolute', top: '2px', left: autoBid ? '20px' : '2px', width: '18px', height: '18px', borderRadius: '50%', background: 'white', transition: 'left 0.2s' }} />
                      </div>
                    </label>
                    {autoBid && (
                      <input type="number" value={maxAutoBid} onChange={e => setMaxAutoBid(e.target.value)}
                        placeholder="Your maximum bid (MAD)"
                        style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #e2eae6', fontSize: '13px', fontFamily: FONT, fontWeight: 700, color: INK, background: 'white', outline: 'none', boxSizing: 'border-box' }}
                        onFocus={e => e.target.style.borderColor = MINT}
                        onBlur={e => e.target.style.borderColor = '#e2eae6'}
                      />
                    )}
                  </div>

                  {/* Place bid button */}
                  <button onClick={() => canBid ? setShowConfirm(true) : setBidError(`Minimum bid is ${minBid.toLocaleString()} MAD`)}
                    style={{ width: '100%', padding: '15px', borderRadius: '14px', background: canBid ? `linear-gradient(135deg, ${MINT}, #0f9b8e)` : '#e2eae6', color: canBid ? 'white' : MUTED, border: 'none', fontSize: '16px', fontWeight: 900, cursor: canBid ? 'pointer' : 'not-allowed', fontFamily: FONT, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', boxShadow: canBid ? `0 4px 20px rgba(34,212,168,0.35)` : 'none', transition: 'all 0.2s' }}>
                    <Gavel size={18} />
                    {canBid ? `Place Bid — ${Number(bidAmount).toLocaleString()} MAD` : `Place Bid`}
                  </button>
                </>
              )}

              {isEnded && (
                <div style={{ padding: '20px', background: SURFACE, borderRadius: '14px', textAlign: 'center' }}>
                  <p style={{ fontSize: '16px', fontWeight: 900, color: INK, marginBottom: '4px' }}>Auction Closed</p>
                  <p style={{ fontSize: '13px', color: MUTED, fontWeight: 700 }}>Final price: <strong style={{ color: MINT }}>{currentBid.toLocaleString()} MAD</strong></p>
                </div>
              )}
            </div>

            {/* Seller */}
            <div style={{ background: 'white', borderRadius: '18px', padding: '18px', border: '1px solid #e2eae6' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: `linear-gradient(135deg, ${MINT}, #0f9b8e)`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <span style={{ color: 'white', fontWeight: 900, fontSize: '13px' }}>{auction.seller.initials}</span>
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <p style={{ fontSize: '14px', fontWeight: 900, color: INK }}>{auction.seller.name}</p>
                    {auction.seller.certified && <Shield size={13} color={MINT} />}
                  </div>
                  <div style={{ display: 'flex', gap: '2px' }}>
                    {[1,2,3,4,5].map(i => <Star key={i} size={11} fill={i <= auction.seller.rating ? '#f59e0b' : 'none'} color="#f59e0b" />)}
                    <span style={{ fontSize: '11px', color: MUTED, fontWeight: 700, marginLeft: '4px' }}>{auction.seller.rating}</span>
                  </div>
                </div>
              </div>
              <div style={{ padding: '10px 12px', background: '#f0fdf9', borderRadius: '10px', border: `1px solid ${MINT}`, display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Lock size={13} color={MINT} />
                <p style={{ fontSize: '11px', color: '#0f9b8e', fontWeight: 700 }}>Payment held in escrow until buyer confirms receipt</p>
              </div>
            </div>

            {/* Safety */}
            <div style={{ padding: '14px 16px', background: CREAM, borderRadius: '14px', border: '1px solid #e8d5c0' }}>
              <p style={{ fontSize: '11px', fontWeight: 900, color: '#b45309', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                <Shield size={13} /> Buyer Protection
              </p>
              <p style={{ fontSize: '11px', color: '#6b4c2a', fontWeight: 700, lineHeight: 1.5 }}>
                All auction payments go through SouKni Escrow. Funds released to seller only after you confirm the item is as described.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* BID CONFIRMATION MODAL */}
      {showConfirm && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }} onClick={() => setShowConfirm(false)} />
          <div style={{ position: 'relative', background: 'white', borderRadius: '24px', padding: '32px', maxWidth: '400px', width: '100%', boxShadow: '0 32px 80px rgba(0,0,0,0.2)' }}>
            <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: '#f0fdf9', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
              <Gavel size={26} color={MINT} />
            </div>
            <h3 style={{ fontSize: '20px', fontWeight: 900, color: INK, textAlign: 'center', marginBottom: '6px', letterSpacing: '-0.05em' }}>Confirm Your Bid</h3>
            <p style={{ fontSize: '13px', color: MUTED, textAlign: 'center', fontWeight: 700, marginBottom: '20px' }}>You are placing a binding bid on this auction</p>
            <div style={{ background: SURFACE, borderRadius: '14px', padding: '16px', marginBottom: '20px' }}>
              <p style={{ fontSize: '12px', color: MUTED, fontWeight: 700, marginBottom: '4px', textAlign: 'center' }}>Your bid</p>
              <p style={{ fontSize: '32px', fontWeight: 900, color: MINT, textAlign: 'center', letterSpacing: '-0.05em' }}>{Number(bidAmount).toLocaleString()} MAD</p>
              <p style={{ fontSize: '11px', color: MUTED, fontWeight: 700, textAlign: 'center', marginTop: '4px' }}>for: {auction.title.slice(0, 45)}...</p>
            </div>
            <p style={{ fontSize: '11px', color: '#b45309', fontWeight: 700, textAlign: 'center', marginBottom: '16px' }}>
              ⚠ By placing a bid, you commit to purchasing the item if you win
            </p>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={() => setShowConfirm(false)}
                style={{ flex: 1, padding: '13px', borderRadius: '12px', border: '1.5px solid #e2eae6', background: 'white', fontSize: '14px', fontWeight: 900, cursor: 'pointer', fontFamily: FONT, color: INK }}>
                Cancel
              </button>
              <button onClick={placeBid}
                style={{ flex: 2, padding: '13px', borderRadius: '12px', background: `linear-gradient(135deg, ${MINT}, #0f9b8e)`, color: 'white', border: 'none', fontSize: '14px', fontWeight: 900, cursor: 'pointer', fontFamily: FONT, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', boxShadow: `0 4px 16px rgba(34,212,168,0.3)` }}>
                <Gavel size={15} /> Confirm Bid
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
