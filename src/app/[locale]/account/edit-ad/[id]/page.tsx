'use client'

import { useState, use, useRef, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ChevronLeft, ChevronRight, Check, Upload, X, MapPin, Tag, FileText, Camera, DollarSign, Eye, Sparkles, Save, AlertTriangle, Trash2, Pause, Play, RefreshCw } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { useListings } from '@/hooks/useListings'
import { getSupabaseClient } from '@/lib/supabase/client'

type Locale = 'en' | 'fr' | 'ar' | 'es' | 'de'

// Design system
const MINT    = '#22d4a8'
const CREAM   = '#f5ede0'
const SURFACE = '#f4fbf8'
const INK     = '#161d1b'
const MUTED   = '#6b7a76'
const FONT    = "'Inter', system-ui, sans-serif"

const STEPS = [
  { id: 1, label: 'Category',  icon: <Tag size={15} /> },
  { id: 2, label: 'Details',   icon: <FileText size={15} /> },
  { id: 3, label: 'Photos',    icon: <Camera size={15} /> },
  { id: 4, label: 'Price',     icon: <DollarSign size={15} /> },
  { id: 5, label: 'Review',    icon: <Eye size={15} /> },
]

const CATEGORIES = [
  {
    slug: 'motors',
    label: 'Motors',
    emoji: '🚗',
    subs: ['Used Cars', 'New Cars', 'Rental Cars', 'Parts & Accessories', 'Moto & Scooters', 'Trucks & Vans', 'Agro & Heavy', 'Car Services & Garages', 'Other Motors'],
  },
  {
    slug: 'property',
    label: 'Property',
    emoji: '🏠',
    subs: ['For Sale', 'For Rent', 'Rooms', 'Daily Rentals', 'Commercial', 'New Projects', 'Land for Sale', 'Vacation Properties', 'Other Property'],
  },
  {
    slug: 'mobiles-electronics',
    label: 'Mobiles & Electronics',
    emoji: '📱',
    subs: ['Mobiles', 'Tablets', 'Laptops', 'Desktops', 'Audio', 'Wearables', 'Cameras', 'Projectors & TVs', 'Car Electronics', 'Gaming', 'Accessories', 'Other Electronics'],
  },
  {
    slug: 'fashion',
    label: 'Fashion',
    emoji: '👗',
    subs: ["Women's Clothing", "Men's Clothing", 'Shoes', 'Bags', 'Jewelry & Watches', 'Traditional Wear', 'Sports & Activewear', 'Vintage & Thrift', 'Wedding & Eveningwear', 'Beauty & Grooming', 'Other Fashion'],
  },
  {
    slug: 'home-living',
    label: 'Home & Living',
    emoji: '🛋️',
    subs: ['Furniture', 'Outdoors & Gardens', 'Curtains & Textiles', 'Lighting', 'Traditionnel', 'Rugs & Carpets', 'Kitchen', 'Home Appliances', 'Decor', 'Tools & DIY', 'Other Home'],
  },
  {
    slug: 'vault',
    label: 'The Vault',
    emoji: '💎',
    subs: ['Jewelry & Watches', 'Musical Instruments', 'Home & Garden Antiques', 'Gaming Collectibles', 'Baby & Kids Items', 'Pets & Accessories', 'Tickets & Vouchers', 'Toys', 'Sports Equipment', 'Rare Collectibles', 'Art & Antiques', 'Other Vault'],
  },
  {
    slug: 'jobs',
    label: 'Jobs',
    emoji: '💼',
    subs: ['Real Estate Jobs', 'Restaurant & Hospitality', 'Construction', 'Marketing & Advertising', 'Customer Service', 'Security & Guard', 'Medical & Healthcare', 'Home Cleaning', 'Handyman & Technician', 'IT & Tech', 'Finance & Accounting', 'Education & Teaching', 'Other Jobs'],
  },
  {
    slug: 'community',
    label: 'Services',
    emoji: '🔧',
    subs: ['Movers & Removals', 'Home Maintenance', 'Tutors & Classes', 'Consultancy', 'Wellness & Spa', 'Pro Services', 'Beauty & Grooming', 'Car Services', 'Cleaning Services', 'Event Services', 'Other Services'],
  },
  {
    slug: 'baby-items',
    label: 'Baby & Kids',
    emoji: '🧸',
    subs: ['Baby Clothes', 'Toys', 'Strollers & Prams', 'Car Seats', 'Baby Gear', 'Kids Furniture', 'School Supplies', 'Other Baby & Kids'],
  },
  {
    slug: 'pets-accessories',
    label: 'Pets',
    emoji: '🐾',
    subs: ['Dogs', 'Cats', 'Birds', 'Fish & Aquarium', 'Reptiles', 'Pet Food', 'Pet Accessories', 'Vet Services', 'Other Pets'],
  },
  {
    slug: 'sports-equipment',
    label: 'Sports & Hobbies',
    emoji: '⚽',
    subs: ['Football', 'Fitness & Gym', 'Cycling', 'Martial Arts', 'Swimming', 'Tennis & Racket', 'Outdoor & Hiking', 'Musical Instruments', 'Books & Magazines', 'Art & Craft', 'Other Sports & Hobbies'],
  },
  {
    slug: 'other',
    label: 'Other',
    emoji: '📦',
    subs: ['Miscellaneous', 'Giveaway / Free Items', 'Other'],
  },
]

const CONDITIONS  = ['New', 'Like New', 'Good', 'Fair', 'For Parts']
const CITIES      = ['Rabat', 'Casablanca', 'Marrakech', 'Fès', 'Tangier', 'Agadir', 'Meknès', 'Oujda', 'Kenitra', 'Tétouan', 'Settat', 'Laâyoune']
const CURRENCIES  = ['MAD', 'EUR', 'USD', 'GBP']

// `listings.condition` is a lowercase/underscore DB enum; the form shows human labels.
const CONDITION_TO_DB: Record<string, string> = { 'New': 'new', 'Like New': 'like_new', 'Good': 'good', 'Fair': 'fair', 'For Parts': 'for_parts' }
const CONDITION_FROM_DB: Record<string, string> = { new: 'New', like_new: 'Like New', good: 'Good', fair: 'Fair', for_parts: 'For Parts' }

export default function EditAdPage({
  params,
}: {
  params: Promise<{ locale: Locale; id: string }>
}) {
  const { locale, id } = use(params)
  const router = useRouter()
  const fileRef = useRef<HTMLInputElement>(null)
  const supabase = getSupabaseClient()
  const { user, loading: authLoading } = useAuth()
  const { fetchListingById, updateListing, deleteListing } = useListings()

  const [loadingAd, setLoadingAd] = useState(true)
  const [notFound, setNotFound]   = useState(false)
  const [uploading, setUploading] = useState(false)

  const [step, setStep]           = useState(1)
  const [saved, setSaved]         = useState(false)
  const [showDelete, setShowDelete] = useState(false)
  const [showStatus, setShowStatus] = useState(false)

  // Step 1
  const [category, setCategory]       = useState('')
  const [subcategory, setSubcategory] = useState('')
  const [showAllSubs, setShowAllSubs] = useState(false)

  // Step 2
  const [title, setTitle]           = useState('')
  const [description, setDescription] = useState('')
  const [condition, setCondition]   = useState('')
  const [city, setCity]             = useState('')
  const [neighborhood, setNeighborhood] = useState('')

  // Step 3
  const [photos, setPhotos] = useState<string[]>([])

  // Step 4
  const [price, setPrice]           = useState('')
  const [currency, setCurrency]     = useState('MAD')
  const [negotiable, setNegotiable] = useState(false)
  const [freeItem, setFreeItem]     = useState(false)
  const [hidePrice, setHidePrice]   = useState(false)
  const [phone, setPhone]           = useState('')
  const [whatsapp, setWhatsapp]     = useState(false)

  const [status, setStatus]         = useState('active')

  // Fetch the real listing and confirm the signed-in user owns it
  useEffect(() => {
    if (!user) return
    let cancelled = false
    setLoadingAd(true)
    fetchListingById(id).then((row: any) => {
      if (cancelled) return
      if (!row || row.seller_id !== user.id) { setNotFound(true); setLoadingAd(false); return }
      setTitle(row.title || '')
      setDescription(row.description || '')
      setCategory(row.category_slug || '')
      setSubcategory(row.subcategory || '')
      setCondition(CONDITION_FROM_DB[row.condition] || '')
      setCity(row.city || '')
      setNeighborhood(row.neighborhood || '')
      setPhotos(row.images || [])
      setPrice(row.price ? String(Math.round(row.price / 100)) : '')
      setCurrency(row.currency || 'MAD')
      setNegotiable(!!row.negotiable)
      setFreeItem(!!row.free_item)
      setHidePrice(!!row.hide_price)
      setPhone(row.profiles?.phone || user.phone || '')
      setWhatsapp(!!row.profiles?.whatsapp)
      setStatus(row.status || 'active')
      setLoadingAd(false)
    })
    return () => { cancelled = true }
  }, [id, user?.id])

  const selectedCat = CATEGORIES.find(c => c.slug === category)

  if (authLoading || (user && loadingAd)) {
    return (
      <div style={{ background: SURFACE, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FONT }}>
        <p style={{ fontSize: '13px', fontWeight: 700, color: MUTED }}>Loading ad…</p>
      </div>
    )
  }

  if (!user) {
    return (
      <div style={{ background: SURFACE, minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '10px', fontFamily: FONT }}>
        <p style={{ fontSize: '16px', fontWeight: 900, color: INK }}>Sign in to edit this ad</p>
        <Link href={`/${locale}/auth`} style={{ fontSize: '13px', fontWeight: 900, color: MINT, textDecoration: 'none' }}>Sign in</Link>
      </div>
    )
  }

  if (notFound) return (
    <div style={{ background: SURFACE, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FONT }}>
      <div style={{ textAlign: 'center' }}>
        <p style={{ fontSize: '40px', marginBottom: '12px' }}>🔍</p>
        <p style={{ fontSize: '18px', fontWeight: 900, color: INK, marginBottom: '8px', letterSpacing: '-0.05em' }}>Ad not found</p>
        <p style={{ fontSize: '14px', color: MUTED, marginBottom: '24px' }}>This ad doesn't exist or you don't have permission to edit it.</p>
        <Link href={`/${locale}/account/my-ads`}
          style={{ padding: '12px 24px', borderRadius: '12px', background: MINT, color: 'white', textDecoration: 'none', fontSize: '14px', fontWeight: 900 }}>
          Back to My Ads
        </Link>
      </div>
    </div>
  )

  const canNext = () => {
    if (step === 1) return category !== '' && subcategory !== ''
    if (step === 2) return title.length >= 5 && city !== ''
    if (step === 3) return true
    if (step === 4) return (price !== '' || freeItem) && phone.length >= 8
    return true
  }

  const handlePhotos = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (!files.length) return
    setUploading(true)
    for (const f of files) {
      if (photos.length >= 12) break
      const formData = new FormData()
      formData.append('file', f)
      formData.append('type', 'listing')
      const res = await fetch('/api/upload', { method: 'POST', body: formData })
      const data = await res.json()
      if (data.url) setPhotos(prev => prev.length < 12 ? [...prev, data.url] : prev)
    }
    setUploading(false)
    if (fileRef.current) fileRef.current.value = ''
  }

  const removePhoto = (i: number) => setPhotos(prev => prev.filter((_, idx) => idx !== i))

  const handleSave = async () => {
    setSaved(true)
    await updateListing(id, {
      title,
      description,
      category_slug: category,
      subcategory,
      condition: CONDITION_TO_DB[condition] || null,
      city,
      neighborhood,
      images: photos,
      price: freeItem ? 0 : Math.round(Number(price || 0) * 100),
      currency,
      negotiable,
      free_item: freeItem,
      hide_price: hidePrice,
      status,
    })
    await supabase.from('profiles').update({ phone, whatsapp }).eq('id', user.id)
    setTimeout(() => { setSaved(false); router.push(`/${locale}/account/my-ads`) }, 1800)
  }

  const handleDelete = async () => {
    setShowDelete(false)
    await deleteListing(id)
    router.push(`/${locale}/account/my-ads`)
  }

  // ── shared UI ──────────────────────────────────────────────────

  const Label = ({ children }: { children: React.ReactNode }) => (
    <p style={{ fontSize: '11px', fontWeight: 900, color: INK, marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{children}</p>
  )

  const Input = ({ placeholder, value, onChange, type = 'text', maxLength }: {
    placeholder: string; value: string; onChange: (v: string) => void; type?: string; maxLength?: number
  }) => (
    <input
      type={type} placeholder={placeholder} value={value} maxLength={maxLength}
      onChange={e => onChange(e.target.value)}
      style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: `1.5px solid #e2eae6`, fontSize: '14px', color: INK, background: SURFACE, outline: 'none', fontFamily: FONT, fontWeight: 700, boxSizing: 'border-box', transition: 'border-color 0.2s' }}
      onFocus={e => e.target.style.borderColor = MINT}
      onBlur={e => e.target.style.borderColor = '#e2eae6'}
    />
  )

  const Toggle = ({ on, onToggle, label }: { on: boolean; onToggle: () => void; label: string }) => (
    <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', background: SURFACE, borderRadius: '12px', border: '1.5px solid #e2eae6', cursor: 'pointer' }}>
      <span style={{ fontSize: '14px', fontWeight: 700, color: INK }}>{label}</span>
      <div onClick={onToggle} style={{ width: '44px', height: '24px', borderRadius: '12px', background: on ? MINT : '#e2eae6', position: 'relative', transition: 'background 0.2s', flexShrink: 0 }}>
        <div style={{ position: 'absolute', top: '2px', left: on ? '22px' : '2px', width: '20px', height: '20px', borderRadius: '50%', background: 'white', boxShadow: '0 1px 4px rgba(0,0,0,0.2)', transition: 'left 0.2s' }} />
      </div>
    </label>
  )

  const statusConfig: Record<string, { label: string; bg: string; color: string; icon: React.ReactNode }> = {
    active:  { label: 'Active',   bg: '#e6f9f3', color: '#0f9b8e', icon: <Play size={13} /> },
    paused:  { label: 'Paused',   bg: '#fff4e0', color: '#b45309', icon: <Pause size={13} /> },
    sold:    { label: 'Sold',     bg: INK,       color: 'white',   icon: <Check size={13} /> },
    expired: { label: 'Expired',  bg: '#f1f1ef', color: MUTED,     icon: <RefreshCw size={13} /> },
  }

  return (
    <div style={{ background: SURFACE, minHeight: '100vh', fontFamily: FONT }}>

      {/* SAVED TOAST */}
      {saved && (
        <div style={{ position: 'fixed', top: '90px', left: '50%', transform: 'translateX(-50%)', background: INK, color: 'white', padding: '12px 24px', borderRadius: '100px', fontSize: '13px', fontWeight: 900, zIndex: 1000, display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 8px 24px rgba(0,0,0,0.2)', letterSpacing: '-0.03em' }}>
          <Check size={15} color={MINT} /> Changes saved — redirecting to My Ads
        </div>
      )}

      {/* DELETE CONFIRM MODAL */}
      {showDelete && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }} onClick={() => setShowDelete(false)} />
          <div style={{ position: 'relative', background: 'white', borderRadius: '24px', padding: '32px', width: '100%', maxWidth: '420px', boxShadow: '0 32px 80px rgba(0,0,0,0.2)' }}>
            <div style={{ width: '52px', height: '52px', borderRadius: '16px', background: '#fef2f2', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
              <Trash2 size={24} color="#ef4444" />
            </div>
            <h3 style={{ fontSize: '20px', fontWeight: 900, color: INK, marginBottom: '8px', letterSpacing: '-0.05em' }}>Delete this ad?</h3>
            <p style={{ fontSize: '13px', color: MUTED, marginBottom: '8px', lineHeight: 1.6 }}>
              You're about to permanently delete:
            </p>
            <p style={{ fontSize: '13px', fontWeight: 900, color: INK, marginBottom: '24px', padding: '10px 14px', background: SURFACE, borderRadius: '10px', border: '1px solid #e2eae6' }}>
              "{title}"
            </p>
            <p style={{ fontSize: '12px', color: '#ef4444', fontWeight: 700, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <AlertTriangle size={13} /> This action cannot be undone.
            </p>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={() => setShowDelete(false)}
                style={{ flex: 1, padding: '12px', borderRadius: '12px', border: '1.5px solid #e2eae6', background: 'white', fontSize: '14px', fontWeight: 900, cursor: 'pointer', fontFamily: FONT, color: INK }}>
                Cancel
              </button>
              <button onClick={handleDelete}
                style={{ flex: 1, padding: '12px', borderRadius: '12px', border: 'none', background: '#ef4444', color: 'white', fontSize: '14px', fontWeight: 900, cursor: 'pointer', fontFamily: FONT }}>
                Delete Ad
              </button>
            </div>
          </div>
        </div>
      )}

      {/* STATUS MODAL */}
      {showStatus && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }} onClick={() => setShowStatus(false)} />
          <div style={{ position: 'relative', background: 'white', borderRadius: '24px', padding: '32px', width: '100%', maxWidth: '380px', boxShadow: '0 32px 80px rgba(0,0,0,0.2)' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 900, color: INK, marginBottom: '6px', letterSpacing: '-0.05em' }}>Change Ad Status</h3>
            <p style={{ fontSize: '13px', color: MUTED, marginBottom: '20px' }}>Choose the new status for this listing.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {Object.entries(statusConfig).map(([key, cfg]) => (
                <button key={key} onClick={() => { setStatus(key); setShowStatus(false) }}
                  style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 16px', borderRadius: '12px', border: `1.5px solid ${status === key ? MINT : '#e2eae6'}`, background: status === key ? '#f0fdf9' : 'white', cursor: 'pointer', fontFamily: FONT, textAlign: 'left', transition: 'all 0.15s' }}>
                  <span style={{ padding: '6px', borderRadius: '8px', background: cfg.bg, color: cfg.color, display: 'flex' }}>{cfg.icon}</span>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: '14px', fontWeight: 900, color: INK }}>{cfg.label}</p>
                    <p style={{ fontSize: '11px', color: MUTED, fontWeight: 700 }}>
                      {key === 'active' ? 'Visible to all buyers'
                        : key === 'paused' ? 'Hidden from search, not deleted'
                        : key === 'sold' ? 'Mark as completed sale'
                        : 'Renew to make it active again'}
                    </p>
                  </div>
                  {status === key && <Check size={15} color={MINT} />}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* PAGE HEADER */}
      <div style={{ background: 'white', borderBottom: '1px solid #e2eae6', padding: '20px 0' }}>
        <div style={{ maxWidth: '720px', margin: '0 auto', padding: '0 24px' }}>

          {/* Breadcrumb */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '20px', flexWrap: 'wrap' }}>
            <Link href={`/${locale}`} style={{ fontSize: '13px', color: MUTED, textDecoration: 'none', fontWeight: 700 }}>Home</Link>
            <ChevronRight size={13} color={MUTED} />
            <Link href={`/${locale}/account/my-ads`} style={{ fontSize: '13px', color: MUTED, textDecoration: 'none', fontWeight: 700 }}>My Ads</Link>
            <ChevronRight size={13} color={MUTED} />
            <span style={{ fontSize: '13px', fontWeight: 900, color: INK }}>Edit Ad</span>
          </div>

          {/* Title row + status + actions */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <h1 style={{ fontSize: '20px', fontWeight: 900, color: INK, letterSpacing: '-0.05em', marginBottom: '4px' }}>Edit Ad</h1>
              <p style={{ fontSize: '12px', color: MUTED, fontWeight: 700, maxWidth: '320px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{title}</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {/* Status badge — clickable */}
              <button onClick={() => setShowStatus(true)}
                style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '7px 14px', borderRadius: '100px', border: `1.5px solid ${MINT}`, background: '#f0fdf9', cursor: 'pointer', fontFamily: FONT, fontSize: '12px', fontWeight: 900, color: MINT }}>
                {statusConfig[status]?.icon}
                {statusConfig[status]?.label}
                <ChevronRight size={12} style={{ transform: 'rotate(90deg)' }} />
              </button>
              <button onClick={() => setShowDelete(true)}
                style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '7px 14px', borderRadius: '100px', border: '1.5px solid #fecaca', background: '#fef2f2', cursor: 'pointer', fontFamily: FONT, fontSize: '12px', fontWeight: 900, color: '#ef4444' }}>
                <Trash2 size={12} /> Delete
              </button>
            </div>
          </div>

          {/* Step progress */}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {STEPS.map((s, i) => {
              const done   = step > s.id
              const active = step === s.id
              return (
                <div key={s.id} style={{ display: 'flex', alignItems: 'center', flex: i < STEPS.length - 1 ? 1 : 'none' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px' }}>
                    <button onClick={() => setStep(s.id)}
                      style={{ width: '34px', height: '34px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', cursor: 'pointer', fontFamily: FONT, fontWeight: 900, fontSize: '12px', background: done ? MINT : active ? INK : '#e2eae6', color: done || active ? 'white' : MUTED, transition: 'all 0.3s', flexShrink: 0 }}>
                      {done ? <Check size={14} strokeWidth={3} /> : s.icon}
                    </button>
                    <span style={{ fontSize: '10px', fontWeight: active ? 900 : 700, color: active ? INK : done ? MINT : MUTED, whiteSpace: 'nowrap' }}>{s.label}</span>
                  </div>
                  {i < STEPS.length - 1 && <div style={{ flex: 1, height: '2px', background: done ? MINT : '#e2eae6', margin: '0 6px', marginBottom: '18px', transition: 'background 0.3s' }} />}
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* FORM BODY */}
      <div style={{ maxWidth: '720px', margin: '28px auto', padding: '0 24px 80px' }}>
        <div style={{ background: 'white', borderRadius: '24px', padding: '36px', boxShadow: '0 4px 24px rgba(0,0,0,0.06)', border: '1px solid #e2eae6' }}>

          {/* ── STEP 1: CATEGORY ── */}
          {step === 1 && (
            <div>
              <h2 style={{ fontSize: '22px', fontWeight: 900, color: INK, marginBottom: '6px', letterSpacing: '-0.05em' }}>Category</h2>
              <p style={{ fontSize: '13px', color: MUTED, marginBottom: '24px', fontWeight: 700 }}>Change the category if needed.</p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginBottom: '24px' }}>
                {CATEGORIES.map(cat => (
                  <button key={cat.slug} onClick={() => { setCategory(cat.slug); setSubcategory(''); setShowAllSubs(false) }}
                    style={{ padding: '16px 12px', borderRadius: '16px', border: `2px solid ${category === cat.slug ? MINT : '#e2eae6'}`, background: category === cat.slug ? '#f0fdf9' : 'white', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', transition: 'all 0.2s', fontFamily: FONT }}>
                    <span style={{ fontSize: '26px' }}>{cat.emoji}</span>
                    <span style={{ fontSize: '11px', fontWeight: 900, color: category === cat.slug ? MINT : INK, textAlign: 'center', lineHeight: 1.3 }}>{cat.label}</span>
                  </button>
                ))}
              </div>

              {selectedCat && (
                <div>
                  <Label>Subcategory</Label>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {(showAllSubs ? selectedCat.subs : selectedCat.subs.slice(0, 8)).map(sub => (
                      <button key={sub} onClick={() => setSubcategory(sub)}
                        style={{ padding: '8px 16px', borderRadius: '100px', border: `1.5px solid ${subcategory === sub ? MINT : '#e2eae6'}`, background: subcategory === sub ? MINT : 'white', color: subcategory === sub ? 'white' : INK, fontSize: '13px', fontWeight: 900, cursor: 'pointer', transition: 'all 0.15s', fontFamily: FONT }}>
                        {sub}
                      </button>
                    ))}
                    {selectedCat.subs.length > 8 && (
                      <button onClick={() => setShowAllSubs(!showAllSubs)}
                        style={{ padding: '8px 16px', borderRadius: '100px', border: `1.5px solid #e2eae6`, background: 'transparent', color: MINT, fontSize: '13px', fontWeight: 900, cursor: 'pointer', fontFamily: FONT, display: 'flex', alignItems: 'center', gap: '4px' }}>
                        {showAllSubs ? '− Show Less' : `+ ${selectedCat.subs.length - 8} More`}
                      </button>
                    )}
                  </div>
                  {subcategory && (
                    <p style={{ fontSize: '12px', color: MINT, fontWeight: 900, marginTop: '10px' }}>
                      ✓ Selected: {subcategory}
                    </p>
                  )}
                </div>
              )}
            </div>
          )}

          {/* ── STEP 2: DETAILS ── */}
          {step === 2 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <h2 style={{ fontSize: '22px', fontWeight: 900, color: INK, marginBottom: '6px', letterSpacing: '-0.05em' }}>Ad Details</h2>
                <p style={{ fontSize: '13px', color: MUTED, fontWeight: 700 }}>Update your title, description, and location.</p>
              </div>

              <div>
                <Label>Title *</Label>
                <Input placeholder="e.g. iPhone 15 Pro Max 256GB — Mint Condition" value={title} onChange={setTitle} maxLength={80} />
                <p style={{ fontSize: '11px', color: MUTED, marginTop: '5px', fontWeight: 700 }}>{title.length}/80</p>
              </div>

              <div>
                <Label>Description</Label>
                <textarea value={description} onChange={e => setDescription(e.target.value)} rows={6} maxLength={2000}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #e2eae6', fontSize: '14px', color: INK, background: SURFACE, outline: 'none', fontFamily: FONT, fontWeight: 700, resize: 'vertical', boxSizing: 'border-box', lineHeight: 1.6, transition: 'border-color 0.2s' }}
                  onFocus={e => e.target.style.borderColor = MINT}
                  onBlur={e => e.target.style.borderColor = '#e2eae6'}
                />
                <p style={{ fontSize: '11px', color: MUTED, marginTop: '5px', fontWeight: 700 }}>{description.length}/2000</p>
              </div>

              <div>
                <Label>Condition</Label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {CONDITIONS.map(c => (
                    <button key={c} onClick={() => setCondition(c)}
                      style={{ padding: '8px 18px', borderRadius: '100px', border: `1.5px solid ${condition === c ? MINT : '#e2eae6'}`, background: condition === c ? MINT : 'white', color: condition === c ? 'white' : INK, fontSize: '13px', fontWeight: 900, cursor: 'pointer', transition: 'all 0.15s', fontFamily: FONT }}>
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div>
                  <Label>City *</Label>
                  <select value={city} onChange={e => setCity(e.target.value)}
                    style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #e2eae6', fontSize: '14px', fontFamily: FONT, fontWeight: 700, color: city ? INK : MUTED, background: SURFACE, outline: 'none', cursor: 'pointer', appearance: 'none', transition: 'border-color 0.2s' }}
                    onFocus={e => e.target.style.borderColor = MINT}
                    onBlur={e => e.target.style.borderColor = '#e2eae6'}
                  >
                    <option value="">Select city...</option>
                    {CITIES.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <Label>Neighbourhood</Label>
                  <Input placeholder="e.g. Agdal, Maarif..." value={neighborhood} onChange={setNeighborhood} />
                </div>
              </div>
            </div>
          )}

          {/* ── STEP 3: PHOTOS ── */}
          {step === 3 && (
            <div>
              <h2 style={{ fontSize: '22px', fontWeight: 900, color: INK, marginBottom: '6px', letterSpacing: '-0.05em' }}>Photos</h2>
              <p style={{ fontSize: '13px', color: MUTED, marginBottom: '24px', fontWeight: 700 }}>Add, remove or reorder your photos. First photo is the cover.</p>

              <input ref={fileRef} type="file" accept="image/*" multiple style={{ display: 'none' }} onChange={handlePhotos} />

              {/* Upload zone */}
              <div onClick={() => photos.length < 12 && !uploading && fileRef.current?.click()}
                style={{ border: `2px dashed ${photos.length < 12 ? MINT : '#e2eae6'}`, borderRadius: '20px', padding: '32px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', cursor: photos.length < 12 && !uploading ? 'pointer' : 'not-allowed', background: '#f0fdf9', marginBottom: '16px', transition: 'all 0.2s', opacity: photos.length >= 12 || uploading ? 0.5 : 1 }}>
                <div style={{ width: '48px', height: '48px', background: 'white', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 4px 12px rgba(34,212,168,0.2)` }}>
                  <Upload size={22} color={MINT} />
                </div>
                <p style={{ fontSize: '14px', fontWeight: 900, color: INK, letterSpacing: '-0.03em' }}>
                  {uploading ? 'Uploading…' : photos.length === 0 ? 'Add photos' : `Add more (${photos.length}/12)`}
                </p>
                <p style={{ fontSize: '12px', color: MUTED, fontWeight: 700 }}>JPG, PNG, WEBP — max 10MB each</p>
              </div>

              {photos.length > 0 && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
                  {photos.map((src, i) => (
                    <div key={i} style={{ position: 'relative', aspectRatio: '1/1', borderRadius: '12px', overflow: 'hidden', border: `2px solid ${i === 0 ? MINT : '#e2eae6'}` }}>
                      <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      {i === 0 && (
                        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: MINT, padding: '3px', textAlign: 'center' }}>
                          <span style={{ fontSize: '9px', fontWeight: 900, color: 'white', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Cover</span>
                        </div>
                      )}
                      <button onClick={() => removePhoto(i)}
                        style={{ position: 'absolute', top: '6px', right: '6px', width: '24px', height: '24px', borderRadius: '50%', background: 'rgba(0,0,0,0.6)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <X size={12} color="white" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ── STEP 4: PRICE ── */}
          {step === 4 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <h2 style={{ fontSize: '22px', fontWeight: 900, color: INK, marginBottom: '6px', letterSpacing: '-0.05em' }}>Price & Contact</h2>
                <p style={{ fontSize: '13px', color: MUTED, fontWeight: 700 }}>Update your price and contact preferences.</p>
              </div>

              <Toggle on={freeItem} onToggle={() => { setFreeItem(!freeItem); if (!freeItem) setPrice('') }} label="🎁  This item is FREE" />

              {!freeItem && (
                <div>
                  <Label>Price *</Label>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <select value={currency} onChange={e => setCurrency(e.target.value)}
                      style={{ padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #e2eae6', fontSize: '14px', fontFamily: FONT, fontWeight: 900, color: INK, background: SURFACE, outline: 'none', cursor: 'pointer', flexShrink: 0 }}>
                      {CURRENCIES.map(c => <option key={c}>{c}</option>)}
                    </select>
                    <input type="number" placeholder="0" value={price} onChange={e => setPrice(e.target.value)} min="0"
                      style={{ flex: 1, padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #e2eae6', fontSize: '20px', fontWeight: 900, color: INK, background: SURFACE, outline: 'none', fontFamily: FONT, transition: 'border-color 0.2s' }}
                      onFocus={e => e.target.style.borderColor = MINT}
                      onBlur={e => e.target.style.borderColor = '#e2eae6'}
                    />
                  </div>
                </div>
              )}

              <Toggle on={negotiable} onToggle={() => setNegotiable(!negotiable)} label="💬  Price is negotiable" />
              <Toggle on={hidePrice} onToggle={() => setHidePrice(!hidePrice)} label="🔒  Hide price (show 'Contact for price')" />

              <div style={{ height: '1px', background: '#e2eae6' }} />

              <div>
                <Label>Phone Number *</Label>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <div style={{ padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #e2eae6', background: SURFACE, fontSize: '14px', fontWeight: 900, color: INK, display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
                    🇲🇦 +212
                  </div>
                  <input type="tel" placeholder="6 12 34 56 78" value={phone} onChange={e => setPhone(e.target.value)}
                    style={{ flex: 1, padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #e2eae6', fontSize: '14px', fontFamily: FONT, fontWeight: 700, color: INK, background: SURFACE, outline: 'none', transition: 'border-color 0.2s' }}
                    onFocus={e => e.target.style.borderColor = MINT}
                    onBlur={e => e.target.style.borderColor = '#e2eae6'}
                  />
                </div>
              </div>

              <Toggle on={whatsapp} onToggle={() => setWhatsapp(!whatsapp)} label="💚  Enable WhatsApp contact" />

              {/* Boost upsell */}
              <div style={{ background: `linear-gradient(135deg, ${SURFACE}, #e6f9f3)`, borderRadius: '16px', padding: '18px', border: `1.5px solid ${MINT}`, display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{ width: '44px', height: '44px', background: `linear-gradient(135deg, ${MINT}, #0f9b8e)`, borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Sparkles size={20} color="white" />
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: '13px', fontWeight: 900, color: INK, marginBottom: '2px', letterSpacing: '-0.03em' }}>Boost this ad with Diamond</p>
                  <p style={{ fontSize: '12px', color: MUTED, fontWeight: 700 }}>Get 10× more views and appear at the top of results.</p>
                </div>
                <Link href={`/${locale}/diamond`}
                  style={{ padding: '9px 16px', borderRadius: '10px', background: MINT, color: 'white', border: 'none', fontSize: '12px', fontWeight: 900, cursor: 'pointer', textDecoration: 'none', whiteSpace: 'nowrap' }}>
                  Upgrade
                </Link>
              </div>
            </div>
          )}

          {/* ── STEP 5: REVIEW ── */}
          {step === 5 && (
            <div>
              <h2 style={{ fontSize: '22px', fontWeight: 900, color: INK, marginBottom: '6px', letterSpacing: '-0.05em' }}>Review Changes</h2>
              <p style={{ fontSize: '13px', color: MUTED, marginBottom: '24px', fontWeight: 700 }}>Check everything looks right before saving.</p>

              {/* Preview card */}
              <div style={{ border: '1.5px solid #e2eae6', borderRadius: '20px', overflow: 'hidden', marginBottom: '20px' }}>
                <div style={{ aspectRatio: '16/9', background: photos[0] ? 'transparent' : SURFACE, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {photos[0]
                    ? <img src={photos[0]} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    : <div style={{ textAlign: 'center', color: MUTED }}><Camera size={36} /><p style={{ marginTop: '8px', fontSize: '12px', fontWeight: 700 }}>No photo</p></div>
                  }
                  {photos.length > 1 && (
                    <div style={{ position: 'absolute', bottom: '12px', right: '12px', background: 'rgba(0,0,0,0.6)', color: 'white', fontSize: '11px', fontWeight: 900, padding: '4px 10px', borderRadius: '8px' }}>
                      +{photos.length - 1} more
                    </div>
                  )}
                </div>
                <div style={{ padding: '20px' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px', marginBottom: '10px' }}>
                    <h3 style={{ fontSize: '17px', fontWeight: 900, color: INK, lineHeight: 1.3, letterSpacing: '-0.03em' }}>{title || 'Your title'}</h3>
                    <p style={{ fontSize: '18px', fontWeight: 900, color: MINT, whiteSpace: 'nowrap' }}>
                      {freeItem ? 'FREE' : price ? `${Number(price).toLocaleString()} ${currency}` : '—'}
                    </p>
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {[selectedCat?.label, subcategory, condition, city && `📍 ${city}${neighborhood ? `, ${neighborhood}` : ''}`].filter(Boolean).map((tag, i) => (
                      <span key={i} style={{ fontSize: '11px', fontWeight: 700, padding: '3px 10px', borderRadius: '100px', background: SURFACE, color: INK, border: '1px solid #e2eae6' }}>{tag}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Summary */}
              <div style={{ background: SURFACE, borderRadius: '16px', padding: '18px', display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
                {[
                  ['Category', `${selectedCat?.emoji} ${selectedCat?.label} → ${subcategory}`],
                  ['Location', city ? `${city}${neighborhood ? `, ${neighborhood}` : ''}` : '—'],
                  ['Condition', condition || '—'],
                  ['Price', freeItem ? 'Free' : price ? `${Number(price).toLocaleString()} ${currency}${negotiable ? ' (negotiable)' : ''}` : '—'],
                  ['Photos', `${photos.length} photo${photos.length !== 1 ? 's' : ''}`],
                  ['Status', statusConfig[status]?.label],
                  ['Contact', `+212 ${phone}${whatsapp ? ' · WhatsApp ✓' : ''}`],
                ].map(([label, value]) => (
                  <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '10px', borderBottom: '1px solid #e2eae6' }}>
                    <span style={{ fontSize: '12px', color: MUTED, fontWeight: 700 }}>{label}</span>
                    <span style={{ fontSize: '12px', color: INK, fontWeight: 900, textAlign: 'right', maxWidth: '60%' }}>{value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── NAV BUTTONS ── */}
          <div style={{ display: 'flex', gap: '10px', marginTop: '32px', paddingTop: '24px', borderTop: '1px solid #e2eae6' }}>
            {step > 1 && (
              <button onClick={() => setStep(s => s - 1)}
                style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '12px 20px', borderRadius: '12px', border: '1.5px solid #e2eae6', background: 'white', color: INK, fontSize: '14px', fontWeight: 900, cursor: 'pointer', fontFamily: FONT }}>
                <ChevronLeft size={15} /> Back
              </button>
            )}

            {step < 5 ? (
              <button onClick={() => canNext() && setStep(s => s + 1)}
                style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '12px 20px', borderRadius: '12px', border: 'none', background: canNext() ? MINT : '#e2eae6', color: canNext() ? 'white' : MUTED, fontSize: '14px', fontWeight: 900, cursor: canNext() ? 'pointer' : 'not-allowed', fontFamily: FONT, transition: 'all 0.2s' }}>
                Continue <ChevronRight size={15} />
              </button>
            ) : (
              <button onClick={handleSave}
                style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '12px 20px', borderRadius: '12px', border: 'none', background: `linear-gradient(135deg, ${MINT}, #0f9b8e)`, color: 'white', fontSize: '15px', fontWeight: 900, cursor: 'pointer', fontFamily: FONT, boxShadow: `0 4px 16px rgba(34,212,168,0.35)` }}>
                <Save size={16} /> Save Changes
              </button>
            )}
          </div>
        </div>

        {/* Tips card */}
        <div style={{ marginTop: '14px', background: 'white', borderRadius: '16px', padding: '18px', border: '1px solid #e2eae6' }}>
          <p style={{ fontSize: '12px', fontWeight: 900, color: INK, marginBottom: '10px', letterSpacing: '-0.03em' }}>💡 Quick edit tips</p>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '7px' }}>
            {[
              'You can click any step number to jump directly to it',
              'Changes are only saved when you click "Save Changes" on step 5',
              'Pausing hides your ad without deleting it',
              'Updating photos: first photo is always the cover image',
            ].map(tip => (
              <li key={tip} style={{ fontSize: '12px', color: MUTED, display: 'flex', alignItems: 'flex-start', gap: '7px', fontWeight: 700 }}>
                <Check size={12} color={MINT} style={{ marginTop: '1px', flexShrink: 0 }} /> {tip}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
