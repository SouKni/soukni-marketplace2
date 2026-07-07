'use client'

import { useState, use } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  Check, ChevronRight, MapPin, Tag, Bell,
  Heart, Package, Shield, Sparkles, ArrowRight,
  Camera, Search, MessageCircle, Star, Zap,
  Home, Car, Smartphone, Briefcase, ShoppingBag,
  ChevronLeft, X
} from 'lucide-react'

type Locale = 'en' | 'fr' | 'ar' | 'es' | 'de'

const MINT    = '#22d4a8'
const CREAM   = '#f5ede0'
const SURFACE = '#f4fbf8'
const INK     = '#161d1b'
const MUTED   = '#6b7a76'
const FONT    = "'Inter', system-ui, sans-serif"

const CITIES = [
  'Rabat', 'Casablanca', 'Marrakech', 'Fès', 'Tangier',
  'Agadir', 'Meknès', 'Oujda', 'Kenitra', 'Tétouan',
  'Settat', 'El Jadida', 'Laâyoune', 'Beni Mellal', 'Nador',
]

const INTERESTS = [
  { key: 'motors',       label: 'Motors & Cars',      emoji: '🚗', icon: <Car size={20} /> },
  { key: 'property',     label: 'Property',            emoji: '🏠', icon: <Home size={20} /> },
  { key: 'electronics',  label: 'Electronics',         emoji: '📱', icon: <Smartphone size={20} /> },
  { key: 'fashion',      label: 'Fashion',             emoji: '👗', icon: <ShoppingBag size={20} /> },
  { key: 'jobs',         label: 'Jobs',                emoji: '💼', icon: <Briefcase size={20} /> },
  { key: 'vault',        label: 'Luxury & Vault',      emoji: '💎', icon: <Sparkles size={20} /> },
  { key: 'home-living',  label: 'Home & Living',       emoji: '🛋️', icon: <Home size={20} /> },
  { key: 'sports',       label: 'Sports & Hobbies',    emoji: '⚽', icon: <Star size={20} /> },
  { key: 'community',    label: 'Services',            emoji: '🔧', icon: <Shield size={20} /> },
  { key: 'baby',         label: 'Baby & Kids',         emoji: '🧸', icon: <Heart size={20} /> },
]

const GOALS = [
  { key: 'buy',     label: 'Mostly Buying',     desc: 'Find great deals near me',       emoji: '🛍️' },
  { key: 'sell',    label: 'Mostly Selling',    desc: 'Post ads and sell my items',     emoji: '📦' },
  { key: 'both',    label: 'Both',              desc: 'Buy and sell regularly',         emoji: '🔄' },
  { key: 'browse',  label: 'Just Browsing',     desc: 'Exploring what SouKni offers',  emoji: '👀' },
]

const NOTIFICATION_PREFS = [
  { key: 'messages',    label: 'New messages',          desc: 'When someone contacts you',     default: true },
  { key: 'price_drops', label: 'Price drops',           desc: 'On items you\'ve saved',        default: true },
  { key: 'new_listings',label: 'New matching listings', desc: 'Based on your interests',       default: false },
  { key: 'promotions',  label: 'Deals & promotions',    desc: 'Special SouKni offers',         default: false },
]

type Step = 'welcome' | 'city' | 'interests' | 'goal' | 'notifications' | 'profile' | 'done'

const STEPS: Step[] = ['welcome', 'city', 'interests', 'goal', 'notifications', 'profile', 'done']

export default function WelcomePage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = use(params)
  const router = useRouter()

  const [step, setStep]             = useState<Step>('welcome')
  const [city, setCity]             = useState('')
  const [citySearch, setCitySearch] = useState('')
  const [interests, setInterests]   = useState<string[]>([])
  const [goal, setGoal]             = useState('')
  const [notifPrefs, setNotifPrefs] = useState<Record<string, boolean>>(
    Object.fromEntries(NOTIFICATION_PREFS.map(n => [n.key, n.default]))
  )
  const [displayName, setDisplayName] = useState('')
  const [avatar, setAvatar]         = useState<string | null>(null)
  const [bio, setBio]               = useState('')

  const stepIndex   = STEPS.indexOf(step)
  const totalSteps  = STEPS.length - 2 // exclude welcome and done from progress
  const progress    = Math.max(0, stepIndex - 1) // welcome = 0

  const toggleInterest = (key: string) =>
    setInterests(prev => prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key])

  const toggleNotif = (key: string) =>
    setNotifPrefs(prev => ({ ...prev, [key]: !prev[key] }))

  const next = () => {
    const idx = STEPS.indexOf(step)
    if (idx < STEPS.length - 1) setStep(STEPS[idx + 1])
  }

  const back = () => {
    const idx = STEPS.indexOf(step)
    if (idx > 0) setStep(STEPS[idx - 1])
  }

  const handleAvatarUpload = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/*'
    input.onchange = e => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (!file) return
      const reader = new FileReader()
      reader.onload = ev => setAvatar(ev.target?.result as string)
      reader.readAsDataURL(file)
    }
    input.click()
  }

  const filteredCities = CITIES.filter(c =>
    c.toLowerCase().includes(citySearch.toLowerCase())
  )

  // ── PROGRESS BAR ───────────────────────────────────────────────
  const ProgressBar = () => (
    step !== 'welcome' && step !== 'done' ? (
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: '#e2eae6', borderRadius: '100px' }}>
        <div style={{ height: '100%', width: `${(progress / totalSteps) * 100}%`, background: `linear-gradient(90deg, ${MINT}, #0f9b8e)`, borderRadius: '100px', transition: 'width 0.4s ease' }} />
      </div>
    ) : null
  )

  // ── SKIP BUTTON ────────────────────────────────────────────────
  const SkipBtn = () => (
    step !== 'welcome' && step !== 'done' ? (
      <button onClick={() => router.push(`/${locale}`)}
        style={{ position: 'absolute', top: '24px', right: '24px', background: 'none', border: 'none', color: MUTED, fontSize: '13px', fontWeight: 700, cursor: 'pointer', fontFamily: FONT, display: 'flex', alignItems: 'center', gap: '4px' }}>
        Skip <X size={14} />
      </button>
    ) : null
  )

  // ── STEP: WELCOME ───────────────────────────────────────────────
  if (step === 'welcome') return (
    <div style={{ minHeight: '100vh', background: `linear-gradient(160deg, ${INK} 0%, #1a2e28 50%, #0f3d35 100%)`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 24px', fontFamily: FONT, position: 'relative', overflow: 'hidden' }}>

      {/* Background decoration */}
      <div style={{ position: 'absolute', top: '-100px', right: '-100px', width: '400px', height: '400px', borderRadius: '50%', background: 'rgba(34,212,168,0.06)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '-80px', left: '-80px', width: '300px', height: '300px', borderRadius: '50%', background: 'rgba(34,212,168,0.04)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: '30%', left: '10%', width: '150px', height: '150px', borderRadius: '50%', background: 'rgba(34,212,168,0.03)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: '480px', width: '100%', textAlign: 'center', position: 'relative', zIndex: 1 }}>

        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '48px' }}>
          <div style={{ width: '52px', height: '52px', borderRadius: '16px', background: MINT, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 8px 32px rgba(34,212,168,0.4)` }}>
            <span style={{ color: 'white', fontWeight: 900, fontSize: '26px', letterSpacing: '-0.05em' }}>S</span>
          </div>
          <span style={{ fontSize: '32px', fontWeight: 900, color: 'white', letterSpacing: '-0.05em' }}>SouKni</span>
        </div>

        {/* Hero text */}
        <h1 style={{ fontSize: '44px', fontWeight: 900, color: 'white', letterSpacing: '-0.05em', lineHeight: 1.1, marginBottom: '16px' }}>
          Welcome to<br /><span style={{ color: MINT }}>Morocco's Market</span>
        </h1>
        <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, marginBottom: '48px', fontWeight: 700 }}>
          Buy, sell and discover amazing deals across Morocco. Let's set up your experience in 2 minutes.
        </p>

        {/* Feature pills */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center', marginBottom: '48px' }}>
          {[
            { icon: '🔍', label: 'Smart Search' },
            { icon: '💬', label: 'Direct Chat' },
            { icon: '🔔', label: 'Price Alerts' },
            { icon: '💎', label: 'Certified Sellers' },
            { icon: '📍', label: 'Near You' },
            { icon: '🆓', label: 'Free to Post' },
          ].map(f => (
            <span key={f.label} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 16px', borderRadius: '100px', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.8)', fontSize: '13px', fontWeight: 700 }}>
              {f.icon} {f.label}
            </span>
          ))}
        </div>

        <button onClick={next}
          style={{ width: '100%', padding: '18px', borderRadius: '16px', background: MINT, color: 'white', border: 'none', fontSize: '16px', fontWeight: 900, cursor: 'pointer', fontFamily: FONT, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', boxShadow: `0 8px 32px rgba(34,212,168,0.35)`, letterSpacing: '-0.03em', marginBottom: '16px' }}>
          Get Started <ArrowRight size={18} />
        </button>

        <Link href={`/${locale}`}
          style={{ display: 'block', textAlign: 'center', color: 'rgba(255,255,255,0.4)', fontSize: '13px', fontWeight: 700, textDecoration: 'none' }}>
          Skip setup and browse →
        </Link>
      </div>
    </div>
  )

  // ── STEP: DONE ──────────────────────────────────────────────────
  if (step === 'done') return (
    <div style={{ minHeight: '100vh', background: `linear-gradient(160deg, ${INK} 0%, #0f3d35 100%)`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 24px', fontFamily: FONT }}>
      <div style={{ maxWidth: '520px', width: '100%', textAlign: 'center' }}>

        {/* Success animation */}
        <div style={{ position: 'relative', width: '120px', height: '120px', margin: '0 auto 32px' }}>
          <div style={{ width: '120px', height: '120px', borderRadius: '50%', background: `linear-gradient(135deg, ${MINT}, #0f9b8e)`, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 16px 48px rgba(34,212,168,0.4)` }}>
            <Check size={52} color="white" strokeWidth={2.5} />
          </div>
          {/* Decorative rings */}
          <div style={{ position: 'absolute', inset: '-12px', borderRadius: '50%', border: '1px solid rgba(34,212,168,0.3)' }} />
          <div style={{ position: 'absolute', inset: '-24px', borderRadius: '50%', border: '1px solid rgba(34,212,168,0.15)' }} />
        </div>

        <h1 style={{ fontSize: '36px', fontWeight: 900, color: 'white', letterSpacing: '-0.05em', marginBottom: '12px' }}>
          You're all set! 🎉
        </h1>
        <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, marginBottom: '40px', fontWeight: 700 }}>
          {displayName ? `Welcome, ${displayName}! ` : 'Welcome! '}Your SouKni experience is personalised and ready. Here's what you can do next:
        </p>

        {/* Next actions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '36px' }}>
          {[
            { icon: <Search size={18} color={MINT} />, label: 'Browse listings', desc: city ? `Explore deals in ${city}` : 'Find great deals near you', href: `/${locale}`, primary: true },
            { icon: <Package size={18} color={MINT} />, label: 'Post your first ad', desc: 'Free to post, sell in minutes', href: `/${locale}/post-ad`, primary: false },
            { icon: <Sparkles size={18} color={MINT} />, label: 'Get SouKni Certified', desc: 'Build trust, sell 5× faster', href: `/${locale}/diamond`, primary: false },
          ].map(action => (
            <Link key={action.label} href={action.href}
              style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '16px 20px', borderRadius: '16px', background: action.primary ? MINT : 'rgba(255,255,255,0.06)', border: `1px solid ${action.primary ? 'transparent' : 'rgba(255,255,255,0.1)'}`, textDecoration: 'none', transition: 'all 0.2s' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: action.primary ? 'rgba(255,255,255,0.2)' : 'rgba(34,212,168,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                {action.icon}
              </div>
              <div style={{ flex: 1, textAlign: 'left' }}>
                <p style={{ fontSize: '14px', fontWeight: 900, color: action.primary ? 'white' : 'rgba(255,255,255,0.9)', marginBottom: '2px' }}>{action.label}</p>
                <p style={{ fontSize: '12px', color: action.primary ? 'rgba(255,255,255,0.75)' : 'rgba(255,255,255,0.45)', fontWeight: 700 }}>{action.desc}</p>
              </div>
              <ChevronRight size={16} color={action.primary ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.3)'} />
            </Link>
          ))}
        </div>

        {/* Setup summary */}
        <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '16px', padding: '16px 20px', border: '1px solid rgba(255,255,255,0.08)', textAlign: 'left' }}>
          <p style={{ fontSize: '11px', fontWeight: 900, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '12px' }}>Your Setup</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {[
              { label: 'Location', value: city || 'All Morocco' },
              { label: 'Interests', value: interests.length > 0 ? `${interests.length} categories selected` : 'All categories' },
              { label: 'Goal', value: GOALS.find(g => g.key === goal)?.label || 'Not specified' },
              { label: 'Notifications', value: `${Object.values(notifPrefs).filter(Boolean).length} enabled` },
            ].map(s => (
              <div key={s.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', fontWeight: 700 }}>{s.label}</span>
                <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.8)', fontWeight: 900, display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Check size={11} color={MINT} /> {s.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )

  // ── INNER STEPS ─────────────────────────────────────────────────
  return (
    <div style={{ minHeight: '100vh', background: SURFACE, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 24px', fontFamily: FONT }}>
      <div style={{ maxWidth: '560px', width: '100%', position: 'relative' }}>

        {/* Progress + Skip */}
        <div style={{ background: 'white', borderRadius: '24px', padding: '32px', border: '1px solid #e2eae6', boxShadow: '0 4px 32px rgba(0,0,0,0.06)', position: 'relative', overflow: 'hidden' }}>
          <ProgressBar />
          <SkipBtn />

          {/* Step counter */}
          <p style={{ fontSize: '11px', fontWeight: 900, color: MUTED, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '20px', marginTop: '8px' }}>
            Step {progress} of {totalSteps}
          </p>

          {/* ── CITY ── */}
          {step === 'city' && (
            <div>
              <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: '#f0fdf9', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                <MapPin size={22} color={MINT} />
              </div>
              <h2 style={{ fontSize: '24px', fontWeight: 900, color: INK, letterSpacing: '-0.05em', marginBottom: '6px' }}>Where are you based?</h2>
              <p style={{ fontSize: '14px', color: MUTED, fontWeight: 700, marginBottom: '20px' }}>We'll show you listings and sellers near you first.</p>

              {/* Search */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: SURFACE, borderRadius: '12px', padding: '0 14px', height: '46px', border: '1.5px solid #e2eae6', marginBottom: '14px', transition: 'border-color 0.2s' }}
                onFocus={e => e.currentTarget.style.borderColor = MINT}
                onBlur={e => e.currentTarget.style.borderColor = '#e2eae6'}
              >
                <Search size={16} color={MUTED} />
                <input value={citySearch} onChange={e => setCitySearch(e.target.value)} placeholder="Search city..."
                  style={{ flex: 1, border: 'none', background: 'transparent', outline: 'none', fontSize: '14px', fontFamily: FONT, fontWeight: 700, color: INK }} />
              </div>

              {/* City grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', maxHeight: '280px', overflowY: 'auto', paddingRight: '4px' }}>
                <button onClick={() => setCity('')}
                  style={{ padding: '10px', borderRadius: '10px', border: `1.5px solid ${city === '' ? MINT : '#e2eae6'}`, background: city === '' ? '#f0fdf9' : 'white', cursor: 'pointer', fontFamily: FONT, fontSize: '12px', fontWeight: 900, color: city === '' ? MINT : INK, transition: 'all 0.15s' }}>
                  🇲🇦 All Morocco
                </button>
                {filteredCities.map(c => (
                  <button key={c} onClick={() => setCity(c)}
                    style={{ padding: '10px', borderRadius: '10px', border: `1.5px solid ${city === c ? MINT : '#e2eae6'}`, background: city === c ? '#f0fdf9' : 'white', cursor: 'pointer', fontFamily: FONT, fontSize: '12px', fontWeight: 900, color: city === c ? MINT : INK, transition: 'all 0.15s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
                    {city === c && <Check size={11} strokeWidth={3} color={MINT} />} {c}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ── INTERESTS ── */}
          {step === 'interests' && (
            <div>
              <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: '#f0fdf9', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                <Heart size={22} color={MINT} />
              </div>
              <h2 style={{ fontSize: '24px', fontWeight: 900, color: INK, letterSpacing: '-0.05em', marginBottom: '6px' }}>What interests you?</h2>
              <p style={{ fontSize: '14px', color: MUTED, fontWeight: 700, marginBottom: '20px' }}>
                Pick at least one. We'll personalise your feed and alerts.
                {interests.length > 0 && <span style={{ color: MINT, marginLeft: '6px' }}>{interests.length} selected</span>}
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
                {INTERESTS.map(interest => {
                  const selected = interests.includes(interest.key)
                  return (
                    <button key={interest.key} onClick={() => toggleInterest(interest.key)}
                      style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 16px', borderRadius: '14px', border: `1.5px solid ${selected ? MINT : '#e2eae6'}`, background: selected ? '#f0fdf9' : 'white', cursor: 'pointer', fontFamily: FONT, textAlign: 'left', transition: 'all 0.15s', position: 'relative' }}>
                      <span style={{ fontSize: '24px', flexShrink: 0 }}>{interest.emoji}</span>
                      <span style={{ fontSize: '13px', fontWeight: 900, color: selected ? MINT : INK }}>{interest.label}</span>
                      {selected && (
                        <div style={{ position: 'absolute', top: '8px', right: '8px', width: '18px', height: '18px', borderRadius: '50%', background: MINT, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <Check size={11} color="white" strokeWidth={3} />
                        </div>
                      )}
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          {/* ── GOAL ── */}
          {step === 'goal' && (
            <div>
              <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: '#f0fdf9', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                <Tag size={22} color={MINT} />
              </div>
              <h2 style={{ fontSize: '24px', fontWeight: 900, color: INK, letterSpacing: '-0.05em', marginBottom: '6px' }}>What's your main goal?</h2>
              <p style={{ fontSize: '14px', color: MUTED, fontWeight: 700, marginBottom: '24px' }}>Help us tailor your experience perfectly.</p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {GOALS.map(g => (
                  <button key={g.key} onClick={() => setGoal(g.key)}
                    style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '18px', borderRadius: '16px', border: `1.5px solid ${goal === g.key ? MINT : '#e2eae6'}`, background: goal === g.key ? '#f0fdf9' : 'white', cursor: 'pointer', fontFamily: FONT, textAlign: 'left', transition: 'all 0.2s' }}>
                    <span style={{ fontSize: '32px', flexShrink: 0 }}>{g.emoji}</span>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: '15px', fontWeight: 900, color: goal === g.key ? MINT : INK, marginBottom: '2px' }}>{g.label}</p>
                      <p style={{ fontSize: '12px', color: MUTED, fontWeight: 700 }}>{g.desc}</p>
                    </div>
                    <div style={{ width: '22px', height: '22px', borderRadius: '50%', border: `2px solid ${goal === g.key ? MINT : '#e2eae6'}`, background: goal === g.key ? MINT : 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'all 0.15s' }}>
                      {goal === g.key && <Check size={13} color="white" strokeWidth={3} />}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ── NOTIFICATIONS ── */}
          {step === 'notifications' && (
            <div>
              <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: '#f0fdf9', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                <Bell size={22} color={MINT} />
              </div>
              <h2 style={{ fontSize: '24px', fontWeight: 900, color: INK, letterSpacing: '-0.05em', marginBottom: '6px' }}>Stay in the loop</h2>
              <p style={{ fontSize: '14px', color: MUTED, fontWeight: 700, marginBottom: '24px' }}>Choose what notifications you'd like to receive. You can always change this later.</p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
                {NOTIFICATION_PREFS.map(notif => (
                  <label key={notif.key} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', borderRadius: '14px', border: `1.5px solid ${notifPrefs[notif.key] ? MINT : '#e2eae6'}`, background: notifPrefs[notif.key] ? '#f0fdf9' : 'white', cursor: 'pointer', transition: 'all 0.15s' }}>
                    <div>
                      <p style={{ fontSize: '14px', fontWeight: 900, color: INK, marginBottom: '2px' }}>{notif.label}</p>
                      <p style={{ fontSize: '12px', color: MUTED, fontWeight: 700 }}>{notif.desc}</p>
                    </div>
                    <div onClick={() => toggleNotif(notif.key)}
                      style={{ width: '44px', height: '24px', borderRadius: '12px', background: notifPrefs[notif.key] ? MINT : '#e2eae6', position: 'relative', flexShrink: 0, cursor: 'pointer', transition: 'background 0.2s' }}>
                      <div style={{ position: 'absolute', top: '2px', left: notifPrefs[notif.key] ? '22px' : '2px', width: '20px', height: '20px', borderRadius: '50%', background: 'white', transition: 'left 0.2s', boxShadow: '0 1px 4px rgba(0,0,0,0.2)' }} />
                    </div>
                  </label>
                ))}
              </div>

              <div style={{ padding: '12px 14px', background: CREAM, borderRadius: '12px', border: '1px solid #e8d5c0', display: 'flex', gap: '8px' }}>
                <Shield size={14} color="#b45309" style={{ flexShrink: 0, marginTop: '1px' }} />
                <p style={{ fontSize: '11px', color: '#6b4c2a', fontWeight: 700, lineHeight: 1.5 }}>
                  We respect your privacy. You can change these preferences anytime in{' '}
                  <strong>Account → Notifications</strong>.
                </p>
              </div>
            </div>
          )}

          {/* ── PROFILE ── */}
          {step === 'profile' && (
            <div>
              <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: '#f0fdf9', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                <Sparkles size={22} color={MINT} />
              </div>
              <h2 style={{ fontSize: '24px', fontWeight: 900, color: INK, letterSpacing: '-0.05em', marginBottom: '6px' }}>Almost done!</h2>
              <p style={{ fontSize: '14px', color: MUTED, fontWeight: 700, marginBottom: '24px' }}>Add a name and photo to build trust with other users. Optional but recommended.</p>

              {/* Avatar upload */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '24px' }}>
                <button onClick={handleAvatarUpload}
                  style={{ position: 'relative', width: '88px', height: '88px', borderRadius: '50%', border: `3px solid ${avatar ? MINT : '#e2eae6'}`, background: avatar ? 'transparent' : SURFACE, cursor: 'pointer', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '8px', transition: 'border-color 0.2s' }}>
                  {avatar
                    ? <img src={avatar} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    : <Camera size={28} color={MUTED} />
                  }
                  <div style={{ position: 'absolute', bottom: '0', right: '0', width: '26px', height: '26px', borderRadius: '50%', background: MINT, border: '2px solid white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Camera size={12} color="white" />
                  </div>
                </button>
                <p style={{ fontSize: '12px', color: MUTED, fontWeight: 700 }}>{avatar ? 'Tap to change photo' : 'Tap to add photo'}</p>
              </div>

              {/* Name + Bio */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div>
                  <label style={{ fontSize: '11px', fontWeight: 900, color: INK, textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', marginBottom: '8px' }}>
                    Display Name <span style={{ color: MUTED, fontWeight: 700, textTransform: 'none', letterSpacing: 0 }}>(optional)</span>
                  </label>
                  <input value={displayName} onChange={e => setDisplayName(e.target.value)} placeholder="e.g. Youssef A."
                    style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #e2eae6', fontSize: '14px', fontFamily: FONT, fontWeight: 700, color: INK, background: SURFACE, outline: 'none', boxSizing: 'border-box', transition: 'border-color 0.2s' }}
                    onFocus={e => e.target.style.borderColor = MINT}
                    onBlur={e => e.target.style.borderColor = '#e2eae6'}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '11px', fontWeight: 900, color: INK, textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', marginBottom: '8px' }}>
                    Short Bio <span style={{ color: MUTED, fontWeight: 700, textTransform: 'none', letterSpacing: 0 }}>(optional)</span>
                  </label>
                  <textarea value={bio} onChange={e => setBio(e.target.value)} placeholder="e.g. Trusted electronics seller in Rabat. All items tested." rows={3} maxLength={150}
                    style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #e2eae6', fontSize: '14px', fontFamily: FONT, fontWeight: 700, color: INK, background: SURFACE, outline: 'none', resize: 'none', lineHeight: 1.6, boxSizing: 'border-box', transition: 'border-color 0.2s' }}
                    onFocus={e => e.target.style.borderColor = MINT}
                    onBlur={e => e.target.style.borderColor = '#e2eae6'}
                  />
                  <p style={{ fontSize: '11px', color: MUTED, marginTop: '4px', textAlign: 'right', fontWeight: 700 }}>{bio.length}/150</p>
                </div>
              </div>

              {/* Trust boost tip */}
              <div style={{ marginTop: '16px', padding: '12px 14px', background: '#f0fdf9', borderRadius: '12px', border: `1px solid ${MINT}`, display: 'flex', gap: '8px' }}>
                <Zap size={14} color={MINT} style={{ flexShrink: 0, marginTop: '1px' }} />
                <p style={{ fontSize: '11px', color: '#0f9b8e', fontWeight: 700, lineHeight: 1.5 }}>
                  Sellers with a profile photo get <strong>3× more messages</strong>. Buyers trust real faces.
                </p>
              </div>
            </div>
          )}

          {/* ── NAV BUTTONS ── */}
          <div style={{ display: 'flex', gap: '10px', marginTop: '28px', paddingTop: '20px', borderTop: '1px solid #e2eae6' }}>
            {step !== 'city' && (
              <button onClick={back}
                style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '12px 18px', borderRadius: '12px', border: '1.5px solid #e2eae6', background: 'white', color: INK, fontSize: '14px', fontWeight: 900, cursor: 'pointer', fontFamily: FONT }}>
                <ChevronLeft size={15} /> Back
              </button>
            )}
            <button onClick={next}
              style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '13px', borderRadius: '12px', background: MINT, color: 'white', border: 'none', fontSize: '14px', fontWeight: 900, cursor: 'pointer', fontFamily: FONT, letterSpacing: '-0.03em', transition: 'all 0.2s' }}>
              {step === 'profile' ? (
                <><Sparkles size={15} /> Finish Setup</>
              ) : step === 'city' ? (
                <>{city ? `Continue with ${city}` : 'Continue'} <ArrowRight size={15} /></>
              ) : step === 'interests' ? (
                <>{interests.length > 0 ? `Continue (${interests.length} selected)` : 'Continue'} <ArrowRight size={15} /></>
              ) : (
                <>Continue <ArrowRight size={15} /></>
              )}
            </button>
          </div>
        </div>

        {/* Dot indicators */}
        {step !== 'welcome' && step !== 'done' && (
          <div style={{ display: 'flex', gap: '6px', justifyContent: 'center', marginTop: '20px' }}>
            {['city', 'interests', 'goal', 'notifications', 'profile'].map(s => (
              <div key={s} style={{ width: s === step ? '20px' : '6px', height: '6px', borderRadius: '3px', background: s === step ? MINT : '#e2eae6', transition: 'all 0.3s' }} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
