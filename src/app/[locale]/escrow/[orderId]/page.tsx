'use client'

import { useState, use } from 'react'
import Link from 'next/link'
import { Shield, Lock, Check, ChevronRight, Clock, AlertTriangle, CreditCard, Smartphone, FileCheck, CheckCircle, ArrowRight, RefreshCw, Phone, X } from 'lucide-react'

type Locale = 'en' | 'fr' | 'ar' | 'es' | 'de'

const MINT    = '#22d4a8'
const CREAM   = '#f5ede0'
const SURFACE = '#f4fbf8'
const INK     = '#161d1b'
const MUTED   = '#6b7a76'
const FONT    = "'Inter', system-ui, sans-serif"

const MOCK_ESCROWS: Record<string, {
  id: string; listing: { title: string; image: string; price: number; currency: string }
  buyer: { name: string; initials: string }; seller: { name: string; initials: string }
  status: 'pending_payment' | 'funded' | 'item_shipped' | 'inspection' | 'released' | 'disputed' | 'refunded'
  createdAt: string; expiresAt: string; fee: number
}> = {
  'TXN-2026-0029': {
    id: 'TXN-2026-0029',
    listing: { title: 'Sony WH-1000XM5 Headphones', image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&w=300', price: 3200, currency: 'MAD' },
    buyer: { name: 'Youssef Alami', initials: 'YA' },
    seller: { name: 'Karim Othmani', initials: 'KO' },
    status: 'funded',
    createdAt: 'Jul 1, 2026', expiresAt: 'Jul 8, 2026', fee: 96,
  },
}

type EscrowStatus = 'pending_payment' | 'funded' | 'item_shipped' | 'inspection' | 'released' | 'disputed' | 'refunded'

const STATUS_STEPS: { key: EscrowStatus; label: string; desc: string }[] = [
  { key: 'pending_payment', label: 'Payment Pending', desc: 'Buyer deposits funds into escrow' },
  { key: 'funded',          label: 'Funds Secured',   desc: 'SouKni holds payment safely' },
  { key: 'item_shipped',    label: 'Item in Transit',  desc: 'Seller confirms item sent or meeting set' },
  { key: 'inspection',      label: 'Inspection Period',desc: 'Buyer has 48h to inspect and accept' },
  { key: 'released',        label: 'Payment Released', desc: 'Funds sent to seller — deal complete' },
]

export default function EscrowPage({ params }: { params: Promise<{ locale: Locale; orderId: string }> }) {
  const { locale, orderId } = use(params)
  const escrow = MOCK_ESCROWS[orderId] || MOCK_ESCROWS['TXN-2026-0029']

  const [status, setStatus]         = useState<EscrowStatus>(escrow.status)
  const [showDispute, setShowDispute] = useState(false)
  const [disputeReason, setDisputeReason] = useState('')
  const [toast, setToast]           = useState<string | null>(null)

  const currentStepIdx = STATUS_STEPS.findIndex(s => s.key === status)

  const showToast = (msg: string) => {
    setToast(msg)
    setTimeout(() => setToast(null), 2500)
  }

  const IDENTITY_STEPS = [
    { icon: <Phone size={18} color={MINT} />, title: 'Phone Verified', desc: '+212 6XX XX XX XX', done: true },
    { icon: <FileCheck size={18} color={MINT} />, title: 'CIN Verified', desc: 'Identity confirmed via Smile Identity', done: true },
    { icon: <Smartphone size={18} color={MINT} />, title: 'Selfie Check', desc: 'Liveness verification passed', done: true },
    { icon: <CreditCard size={18} color={MINT} />, title: 'Payment Method', desc: 'Moroccan bank card verified', done: true },
  ]

  return (
    <div style={{ background: SURFACE, minHeight: '100vh', fontFamily: FONT }}>

      {/* Toast */}
      {toast && (
        <div style={{ position: 'fixed', top: '90px', left: '50%', transform: 'translateX(-50%)', background: INK, color: 'white', padding: '12px 24px', borderRadius: '100px', fontSize: '13px', fontWeight: 900, zIndex: 1000, boxShadow: '0 8px 24px rgba(0,0,0,0.2)' }}>
          {toast}
        </div>
      )}

      <div style={{ maxWidth: '780px', margin: '0 auto', padding: '32px 24px 80px' }}>

        {/* Breadcrumb */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '24px' }}>
          <Link href={`/${locale}/orders`} style={{ fontSize: '13px', color: MUTED, textDecoration: 'none', fontWeight: 700 }}>Orders</Link>
          <ChevronRight size={13} color={MUTED} />
          <span style={{ fontSize: '13px', fontWeight: 900, color: INK }}>Escrow · {orderId}</span>
        </nav>

        {/* Hero */}
        <div style={{ background: `linear-gradient(135deg, ${INK}, #1a2e28)`, borderRadius: '24px', padding: '28px 32px', marginBottom: '24px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '-40px', right: '-40px', width: '160px', height: '160px', borderRadius: '50%', background: 'rgba(34,212,168,0.07)' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'rgba(34,212,168,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Shield size={24} color={MINT} />
            </div>
            <div>
              <p style={{ fontSize: '14px', fontWeight: 900, color: 'white', letterSpacing: '-0.03em', marginBottom: '2px' }}>SouKni Escrow Protection</p>
              <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', fontWeight: 700 }}>Payment secured · {escrow.id}</p>
            </div>
            <div style={{ marginLeft: 'auto', padding: '6px 14px', background: 'rgba(34,212,168,0.15)', borderRadius: '100px', border: '1px solid rgba(34,212,168,0.3)' }}>
              <span style={{ fontSize: '11px', fontWeight: 900, color: MINT, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                {status === 'funded' ? '🔒 Secured' : status === 'released' ? '✓ Complete' : '⏳ In Progress'}
              </span>
            </div>
          </div>

          {/* Listing + parties */}
          <div style={{ display: 'flex', gap: '14px', alignItems: 'center', padding: '14px', background: 'rgba(255,255,255,0.06)', borderRadius: '14px' }}>
            <img src={escrow.listing.image} alt="" style={{ width: '52px', height: '52px', borderRadius: '10px', objectFit: 'cover', flexShrink: 0 }} />
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: '13px', fontWeight: 900, color: 'white', marginBottom: '2px' }}>{escrow.listing.title}</p>
              <p style={{ fontSize: '15px', fontWeight: 900, color: MINT }}>{escrow.listing.price.toLocaleString()} {escrow.listing.currency}</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {/* Buyer */}
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: `linear-gradient(135deg, ${MINT}, #0f9b8e)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ color: 'white', fontWeight: 900, fontSize: '11px' }}>{escrow.buyer.initials}</span>
              </div>
              <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', fontWeight: 700 }}>→</span>
              {/* Seller */}
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ color: 'white', fontWeight: 900, fontSize: '11px' }}>{escrow.seller.initials}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Progress steps */}
        <div style={{ background: 'white', borderRadius: '20px', padding: '24px', border: '1px solid #e2eae6', marginBottom: '20px' }}>
          <h3 style={{ fontSize: '15px', fontWeight: 900, color: INK, marginBottom: '20px', letterSpacing: '-0.03em' }}>Escrow Progress</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0', position: 'relative' }}>
            {/* Vertical line */}
            <div style={{ position: 'absolute', left: '15px', top: '20px', bottom: '20px', width: '2px', background: '#e2eae6' }} />
            <div style={{ position: 'absolute', left: '15px', top: '20px', width: '2px', background: MINT, height: `${(currentStepIdx / (STATUS_STEPS.length - 1)) * 100}%`, transition: 'height 0.5s ease' }} />

            {STATUS_STEPS.map((s, i) => {
              const done    = i < currentStepIdx
              const active  = i === currentStepIdx
              const pending = i > currentStepIdx
              return (
                <div key={s.key} style={{ display: 'flex', gap: '16px', paddingBottom: i < STATUS_STEPS.length - 1 ? '20px' : '0', position: 'relative' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', border: `2px solid ${done || active ? MINT : '#e2eae6'}`, background: done ? MINT : active ? 'white' : 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, zIndex: 1, transition: 'all 0.3s' }}>
                    {done ? <Check size={14} color="white" strokeWidth={3} /> : active ? <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: MINT }} /> : <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#e2eae6' }} />}
                  </div>
                  <div style={{ flex: 1, paddingTop: '4px' }}>
                    <p style={{ fontSize: '14px', fontWeight: 900, color: pending ? MUTED : INK, marginBottom: '2px' }}>{s.label}</p>
                    <p style={{ fontSize: '12px', color: MUTED, fontWeight: 700 }}>{s.desc}</p>
                    {active && (
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '10px', fontWeight: 900, color: MINT, background: '#f0fdf9', padding: '3px 8px', borderRadius: '100px', marginTop: '4px', border: `1px solid ${MINT}` }}>
                        <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: MINT, animation: 'pulse 1s infinite' }} />
                        Current Status
                      </span>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Identity verification panel */}
        <div style={{ background: 'white', borderRadius: '20px', padding: '24px', border: '1px solid #e2eae6', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '15px', fontWeight: 900, color: INK, letterSpacing: '-0.03em', flex: 1 }}>Identity Verification (Smile Identity)</h3>
            <span style={{ fontSize: '10px', fontWeight: 900, padding: '3px 10px', borderRadius: '100px', background: '#e6f9f3', color: '#0f9b8e' }}>✓ Both parties verified</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            {IDENTITY_STEPS.map(step => (
              <div key={step.title} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px', background: SURFACE, borderRadius: '12px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#e6f9f3', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  {step.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: '12px', fontWeight: 900, color: INK }}>{step.title}</p>
                  <p style={{ fontSize: '10px', color: MUTED, fontWeight: 700 }}>{step.desc}</p>
                </div>
                {step.done && <Check size={14} color={MINT} />}
              </div>
            ))}
          </div>
          <div style={{ marginTop: '12px', padding: '10px 14px', background: '#f0fdf9', borderRadius: '10px', border: `1px solid ${MINT}`, display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
            <Lock size={13} color={MINT} style={{ flexShrink: 0, marginTop: '1px' }} />
            <p style={{ fontSize: '11px', color: '#0f9b8e', fontWeight: 700, lineHeight: 1.5 }}>
              Verification powered by Smile Identity. CIN data is encrypted and never stored beyond verification. Both parties have passed KYC checks.
            </p>
          </div>
        </div>

        {/* Fee breakdown */}
        <div style={{ background: 'white', borderRadius: '20px', padding: '24px', border: '1px solid #e2eae6', marginBottom: '20px' }}>
          <h3 style={{ fontSize: '15px', fontWeight: 900, color: INK, marginBottom: '16px', letterSpacing: '-0.03em' }}>Fee Breakdown</h3>
          {[
            { label: 'Item price', value: `${escrow.listing.price.toLocaleString()} MAD` },
            { label: 'Escrow service fee (3%)', value: `${escrow.fee} MAD` },
            { label: 'Buyer pays', value: `${(escrow.listing.price + escrow.fee).toLocaleString()} MAD`, bold: true },
            { label: 'Seller receives (after fee)', value: `${(escrow.listing.price - escrow.fee).toLocaleString()} MAD`, bold: true, green: true },
          ].map(row => (
            <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #f4fbf8' }}>
              <span style={{ fontSize: '13px', color: MUTED, fontWeight: row.bold ? 900 : 700 }}>{row.label}</span>
              <span style={{ fontSize: '14px', fontWeight: 900, color: row.green ? MINT : row.bold ? INK : MUTED }}>{row.value}</span>
            </div>
          ))}
          <p style={{ fontSize: '11px', color: MUTED, fontWeight: 700, marginTop: '12px', lineHeight: 1.5 }}>
            Funds held securely by SouKni · Released to seller after buyer confirms receipt · Fully refunded if item not delivered or not as described
          </p>
        </div>

        {/* Action buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {status === 'funded' && (
            <button onClick={() => { setStatus('item_shipped'); showToast('✓ Confirmed — inspection period started (48h)') }}
              style={{ width: '100%', padding: '14px', borderRadius: '14px', background: `linear-gradient(135deg, ${MINT}, #0f9b8e)`, color: 'white', border: 'none', fontSize: '15px', fontWeight: 900, cursor: 'pointer', fontFamily: FONT, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', boxShadow: `0 4px 20px rgba(34,212,168,0.3)` }}>
              <Check size={16} /> Confirm Item Received — Release Payment
            </button>
          )}
          {status === 'item_shipped' && (
            <button onClick={() => { setStatus('released'); showToast('🎉 Payment released to seller!') }}
              style={{ width: '100%', padding: '14px', borderRadius: '14px', background: `linear-gradient(135deg, ${MINT}, #0f9b8e)`, color: 'white', border: 'none', fontSize: '15px', fontWeight: 900, cursor: 'pointer', fontFamily: FONT, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              <CheckCircle size={16} /> Item OK — Release Payment to Seller
            </button>
          )}

          {status !== 'released' && status !== 'refunded' && status !== 'disputed' && (
            <button onClick={() => setShowDispute(true)}
              style={{ width: '100%', padding: '13px', borderRadius: '14px', background: '#fff5f5', color: '#ef4444', border: '1.5px solid #fecaca', fontSize: '14px', fontWeight: 900, cursor: 'pointer', fontFamily: FONT, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              <AlertTriangle size={15} /> Open a Dispute
            </button>
          )}

          {status === 'released' && (
            <div style={{ padding: '20px', background: '#f0fdf9', borderRadius: '14px', border: `1.5px solid ${MINT}`, textAlign: 'center' }}>
              <CheckCircle size={32} color={MINT} style={{ marginBottom: '10px' }} />
              <p style={{ fontSize: '16px', fontWeight: 900, color: INK, marginBottom: '4px' }}>Deal Complete! 🎉</p>
              <p style={{ fontSize: '13px', color: MUTED, fontWeight: 700 }}>Payment released · Funds arriving in 1-2 business days</p>
            </div>
          )}
        </div>
      </div>

      {/* Dispute modal */}
      {showDispute && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }} onClick={() => setShowDispute(false)} />
          <div style={{ position: 'relative', background: 'white', borderRadius: '24px', padding: '32px', maxWidth: '440px', width: '100%', boxShadow: '0 32px 80px rgba(0,0,0,0.2)' }}>
            <div style={{ width: '52px', height: '52px', borderRadius: '16px', background: '#fef2f2', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
              <AlertTriangle size={24} color="#ef4444" />
            </div>
            <h3 style={{ fontSize: '20px', fontWeight: 900, color: INK, marginBottom: '6px', letterSpacing: '-0.05em' }}>Open a Dispute</h3>
            <p style={{ fontSize: '13px', color: MUTED, fontWeight: 700, marginBottom: '20px', lineHeight: 1.5 }}>
              Our team will review your case within 24 hours. Payment remains held until the dispute is resolved.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
              {['Item not as described', 'Item not received', 'Item damaged in transit', 'Seller unresponsive', 'Other issue'].map(reason => (
                <button key={reason} onClick={() => setDisputeReason(reason)}
                  style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 14px', borderRadius: '10px', border: `1.5px solid ${disputeReason === reason ? '#ef4444' : '#e2eae6'}`, background: disputeReason === reason ? '#fff5f5' : 'white', cursor: 'pointer', fontFamily: FONT, fontSize: '13px', fontWeight: 700, color: disputeReason === reason ? '#ef4444' : INK, textAlign: 'left' }}>
                  <div style={{ width: '16px', height: '16px', borderRadius: '50%', border: `2px solid ${disputeReason === reason ? '#ef4444' : '#e2eae6'}`, background: disputeReason === reason ? '#ef4444' : 'white', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {disputeReason === reason && <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'white' }} />}
                  </div>
                  {reason}
                </button>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={() => setShowDispute(false)}
                style={{ flex: 1, padding: '12px', borderRadius: '12px', border: '1.5px solid #e2eae6', background: 'white', fontSize: '14px', fontWeight: 900, cursor: 'pointer', fontFamily: FONT, color: INK }}>
                Cancel
              </button>
              <button onClick={() => { if (!disputeReason) return; setStatus('disputed'); setShowDispute(false); showToast('⚠ Dispute opened — our team will review within 24h') }}
                disabled={!disputeReason}
                style={{ flex: 2, padding: '12px', borderRadius: '12px', background: disputeReason ? '#ef4444' : '#e2eae6', color: disputeReason ? 'white' : MUTED, border: 'none', fontSize: '14px', fontWeight: 900, cursor: disputeReason ? 'pointer' : 'not-allowed', fontFamily: FONT }}>
                Submit Dispute
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.5}}`}</style>
    </div>
  )
}
