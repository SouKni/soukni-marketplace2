'use client'

import { useState, use } from 'react'
import Link from 'next/link'
import { User, Mail, Phone, MapPin, Lock, Bell, Shield, ChevronRight, Camera, Check, Eye, EyeOff, Package, Heart, MessageCircle, Sparkles, LogOut, Globe, CreditCard, Trash2, AlertTriangle, BarChart3, RefreshCw } from 'lucide-react'

type Locale = 'en' | 'fr' | 'ar' | 'es' | 'de'
type Tab = 'profile' | 'security' | 'notifications' | 'billing'

export default function AccountPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = use(params)
  const [tab, setTab] = useState<Tab>('profile')
  const [saved, setSaved] = useState(false)
  const [showPass, setShowPass] = useState(false)
  const [showNewPass, setShowNewPass] = useState(false)

  // Profile fields
  const [fullName, setFullName] = useState('Youssef Alami')
  const [email, setEmail] = useState('youssef.alami@gmail.com')
  const [phone, setPhone] = useState('6 12 34 56 78')
  const [city, setCity] = useState('Rabat')
  const [bio, setBio] = useState('Trusted seller of premium electronics in Rabat. All items tested and accurately described.')
  const [username, setUsername] = useState('youssef-alami')

  // Security fields
  const [currentPass, setCurrentPass] = useState('')
  const [newPass, setNewPass] = useState('')

  // Notification preferences
  const [notifs, setNotifs] = useState({
    messages: true,
    favorites: true,
    priceDrops: true,
    newListings: false,
    promotions: false,
    sms: true,
    email: true,
    push: false,
  })

  const toggleNotif = (key: keyof typeof notifs) => setNotifs(p => ({ ...p, [key]: !p[key] }))

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  const TABS: { key: Tab; label: string; icon: React.ReactNode }[] = [
    { key: 'profile', label: 'Profile', icon: <User size={16} /> },
    { key: 'security', label: 'Security', icon: <Lock size={16} /> },
    { key: 'notifications', label: 'Notifications', icon: <Bell size={16} /> },
    { key: 'billing', label: 'Membership', icon: <Sparkles size={16} /> },
  ]

  const QUICK_LINKS = [
    { icon: <Package size={16} />, label: 'My Ads', count: '9 active', href: `/${locale}/account/my-ads` },
    { icon: <Heart size={16} />, label: 'Favorites', count: '6 saved', href: `/${locale}/favorites` },
    { icon: <MessageCircle size={16} />, label: 'Messages', count: '2 unread', href: `/${locale}/messages` },
    { icon: <Shield size={16} />, label: 'Trust Score', count: 'Diamond', href: '#' },
    { icon: <BarChart3 size={16} />, label: 'Analytics', count: 'View stats', href: `/${locale}/analytics` },
    { icon: <Package size={16} />, label: 'Bulk Import', count: 'For dealers', href: `/${locale}/bulk-import` },
  ]

  const InputRow = ({ label, icon, children }: { label: string; icon: React.ReactNode; children: React.ReactNode }) => (
    <div>
      <label style={{ fontSize: '12px', fontWeight: 700, color: '#161d1b', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '8px' }}>{label}</label>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#f4fbf8', border: '1.5px solid #e2eae6', borderRadius: '12px', padding: '0 14px', height: '48px' }}
        onFocus={e => (e.currentTarget.style.borderColor = '#22d4a8')}
        onBlur={e => (e.currentTarget.style.borderColor = '#e2eae6')}
      >
        <span style={{ color: '#6b7a76', flexShrink: 0 }}>{icon}</span>
        {children}
      </div>
    </div>
  )

  const Toggle = ({ on, onToggle, label, desc }: { on: boolean; onToggle: () => void; label: string; desc?: string }) => (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 0', borderBottom: '1px solid #f4fbf8' }}>
      <div>
        <p style={{ fontSize: '14px', fontWeight: 600, color: '#161d1b' }}>{label}</p>
        {desc && <p style={{ fontSize: '12px', color: '#6b7a76', marginTop: '2px' }}>{desc}</p>}
      </div>
      <div onClick={onToggle} style={{ width: '44px', height: '24px', borderRadius: '12px', background: on ? '#22d4a8' : '#e2eae6', position: 'relative', cursor: 'pointer', flexShrink: 0, transition: 'background 0.2s' }}>
        <div style={{ position: 'absolute', top: '2px', left: on ? '22px' : '2px', width: '20px', height: '20px', borderRadius: '50%', background: 'white', boxShadow: '0 1px 4px rgba(0,0,0,0.2)', transition: 'left 0.2s' }} />
      </div>
    </div>
  )

  return (
    <div style={{ background: '#f4fbf8', minHeight: '100vh', fontFamily: 'Hanken Grotesk, Inter, system-ui, sans-serif' }}>

      {/* Save toast */}
      {saved && (
        <div style={{ position: 'fixed', top: '90px', left: '50%', transform: 'translateX(-50%)', background: '#161d1b', color: 'white', padding: '12px 24px', borderRadius: '100px', fontSize: '13px', fontWeight: 600, zIndex: 1000, display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 8px 24px rgba(0,0,0,0.2)' }}>
          <Check size={14} color="#22d4a8" /> Changes saved successfully
        </div>
      )}

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '32px 24px 80px' }}>

        {/* Page title */}
        <h1 style={{ fontSize: '28px', fontWeight: 800, color: '#161d1b', letterSpacing: '-0.02em', marginBottom: '24px' }}>Account Settings</h1>

        <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: '24px', alignItems: 'start' }}>

          {/* LEFT SIDEBAR */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

            {/* Avatar card */}
            <div style={{ background: 'white', borderRadius: '20px', padding: '24px', border: '1px solid #e2eae6', textAlign: 'center' }}>
              <div style={{ position: 'relative', width: '80px', height: '80px', margin: '0 auto 12px' }}>
                <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'linear-gradient(135deg, #22d4a8, #0f9b8e)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ color: 'white', fontWeight: 800, fontSize: '28px' }}>YA</span>
                </div>
                <button style={{ position: 'absolute', bottom: 0, right: 0, width: '28px', height: '28px', borderRadius: '50%', background: '#161d1b', border: '2px solid white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Camera size={12} color="white" />
                </button>
              </div>
              <p style={{ fontSize: '15px', fontWeight: 800, color: '#161d1b', marginBottom: '2px' }}>{fullName}</p>
              <p style={{ fontSize: '12px', color: '#6b7a76', marginBottom: '10px' }}>@{username}</p>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'linear-gradient(135deg, #22d4a8, #0f9b8e)', color: 'white', fontSize: '11px', fontWeight: 700, padding: '5px 12px', borderRadius: '100px' }}>
                💎 Diamond Member
              </span>
            </div>

            {/* Quick links */}
            <div style={{ background: 'white', borderRadius: '20px', padding: '8px', border: '1px solid #e2eae6' }}>
              {QUICK_LINKS.map(l => (
                <Link key={l.label} href={l.href} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 14px', borderRadius: '12px', transition: 'background 0.15s' }}
                  onMouseEnter={e => e.currentTarget.style.background = '#f4fbf8'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <div style={{ width: '34px', height: '34px', borderRadius: '10px', background: '#f4fbf8', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#22d4a8', flexShrink: 0 }}>
                    {l.icon}
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: '13px', fontWeight: 700, color: '#161d1b' }}>{l.label}</p>
                    <p style={{ fontSize: '11px', color: '#6b7a76' }}>{l.count}</p>
                  </div>
                  <ChevronRight size={14} color="#6b7a76" />
                </Link>
              ))}
            </div>

            {/* Nav tabs */}
            <div style={{ background: 'white', borderRadius: '20px', padding: '8px', border: '1px solid #e2eae6' }}>
              {TABS.map(t => (
                <button key={t.key} onClick={() => setTab(t.key)}
                  style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '10px', padding: '11px 14px', borderRadius: '12px', border: 'none', cursor: 'pointer', fontFamily: 'inherit', background: tab === t.key ? '#161d1b' : 'transparent', color: tab === t.key ? 'white' : '#6b7a76', fontSize: '13px', fontWeight: 700, textAlign: 'left', transition: 'all 0.15s', marginBottom: '2px' }}>
                  {t.icon} {t.label}
                </button>
              ))}

              <div style={{ height: '1px', background: '#f4fbf8', margin: '8px 0' }} />

              <button style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '10px', padding: '11px 14px', borderRadius: '12px', border: 'none', cursor: 'pointer', fontFamily: 'inherit', background: 'transparent', color: '#ef4444', fontSize: '13px', fontWeight: 700, textAlign: 'left' }}>
                <LogOut size={16} /> Sign Out
              </button>
            </div>
          </div>

          {/* RIGHT PANEL */}
          <div style={{ background: 'white', borderRadius: '20px', padding: '32px', border: '1px solid #e2eae6' }}>

            {/* ── PROFILE TAB ── */}
            {tab === 'profile' && (
              <div>
                <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#161d1b', marginBottom: '4px' }}>Profile Information</h2>
                <p style={{ fontSize: '13px', color: '#6b7a76', marginBottom: '28px' }}>This information is visible to other users on your public profile.</p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '28px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                    <InputRow label="Full Name" icon={<User size={16} />}>
                      <input value={fullName} onChange={e => setFullName(e.target.value)}
                        style={{ flex: 1, border: 'none', outline: 'none', background: 'transparent', fontSize: '14px', fontFamily: 'inherit', color: '#161d1b' }} />
                    </InputRow>
                    <InputRow label="Username" icon={<span style={{ fontSize: '13px', fontWeight: 700, color: '#6b7a76' }}>@</span>}>
                      <input value={username} onChange={e => setUsername(e.target.value)}
                        style={{ flex: 1, border: 'none', outline: 'none', background: 'transparent', fontSize: '14px', fontFamily: 'inherit', color: '#161d1b' }} />
                    </InputRow>
                  </div>

                  <InputRow label="Email Address" icon={<Mail size={16} />}>
                    <input value={email} onChange={e => setEmail(e.target.value)} type="email"
                      style={{ flex: 1, border: 'none', outline: 'none', background: 'transparent', fontSize: '14px', fontFamily: 'inherit', color: '#161d1b' }} />
                    <span style={{ background: '#e6f9f3', color: '#0f9b8e', fontSize: '10px', fontWeight: 700, padding: '3px 8px', borderRadius: '100px', flexShrink: 0 }}>Verified</span>
                  </InputRow>

                  <InputRow label="Phone Number" icon={<Phone size={16} />}>
                    <span style={{ fontSize: '14px', fontWeight: 700, color: '#6b7a76', flexShrink: 0 }}>+212</span>
                    <input value={phone} onChange={e => setPhone(e.target.value)} type="tel"
                      style={{ flex: 1, border: 'none', outline: 'none', background: 'transparent', fontSize: '14px', fontFamily: 'inherit', color: '#161d1b' }} />
                  </InputRow>

                  <InputRow label="City" icon={<MapPin size={16} />}>
                    <select value={city} onChange={e => setCity(e.target.value)}
                      style={{ flex: 1, border: 'none', outline: 'none', background: 'transparent', fontSize: '14px', fontFamily: 'inherit', color: '#161d1b', cursor: 'pointer', appearance: 'none' }}>
                      {['Rabat', 'Casablanca', 'Marrakech', 'Fès', 'Tangier', 'Agadir', 'Oujda', 'Meknès'].map(c => (
                        <option key={c}>{c}</option>
                      ))}
                    </select>
                  </InputRow>

                  <div>
                    <label style={{ fontSize: '12px', fontWeight: 700, color: '#161d1b', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '8px' }}>Bio</label>
                    <textarea value={bio} onChange={e => setBio(e.target.value)} rows={3} maxLength={200}
                      style={{ width: '100%', padding: '12px 14px', borderRadius: '12px', border: '1.5px solid #e2eae6', fontSize: '14px', fontFamily: 'inherit', color: '#161d1b', background: '#f4fbf8', outline: 'none', resize: 'none', lineHeight: 1.6, boxSizing: 'border-box' }}
                      onFocus={e => e.target.style.borderColor = '#22d4a8'}
                      onBlur={e => e.target.style.borderColor = '#e2eae6'}
                    />
                    <p style={{ fontSize: '11px', color: '#6b7a76', marginTop: '4px', textAlign: 'right' }}>{bio.length}/200</p>
                  </div>
                </div>

                <button onClick={handleSave}
                  style={{ background: '#22d4a8', color: 'white', border: 'none', padding: '12px 28px', borderRadius: '12px', fontSize: '14px', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>
                  Save Changes
                </button>
              </div>
            )}

            {/* ── SECURITY TAB ── */}
            {tab === 'security' && (
              <div>
                <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#161d1b', marginBottom: '4px' }}>Security</h2>
                <p style={{ fontSize: '13px', color: '#6b7a76', marginBottom: '28px' }}>Keep your account safe and secure.</p>

                {/* Change password */}
                <div style={{ marginBottom: '28px' }}>
                  <h3 style={{ fontSize: '14px', fontWeight: 800, color: '#161d1b', marginBottom: '16px' }}>Change Password</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {[
                      { label: 'Current Password', value: currentPass, set: setCurrentPass, show: showPass, toggle: () => setShowPass(!showPass) },
                      { label: 'New Password', value: newPass, set: setNewPass, show: showNewPass, toggle: () => setShowNewPass(!showNewPass) },
                    ].map(({ label, value, set, show, toggle }) => (
                      <div key={label}>
                        <label style={{ fontSize: '12px', fontWeight: 700, color: '#161d1b', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '8px' }}>{label}</label>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#f4fbf8', border: '1.5px solid #e2eae6', borderRadius: '12px', padding: '0 14px', height: '48px' }}>
                          <Lock size={16} color="#6b7a76" />
                          <input type={show ? 'text' : 'password'} value={value} onChange={e => set(e.target.value)}
                            style={{ flex: 1, border: 'none', outline: 'none', background: 'transparent', fontSize: '14px', fontFamily: 'inherit', color: '#161d1b' }} />
                          <button onClick={toggle} style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#6b7a76', display: 'flex' }}>
                            {show ? <EyeOff size={16} /> : <Eye size={16} />}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {newPass.length > 0 && (
                    <div style={{ marginTop: '10px' }}>
                      <div style={{ display: 'flex', gap: '4px', marginBottom: '4px' }}>
                        {[1, 2, 3, 4].map(i => (
                          <div key={i} style={{ flex: 1, height: '3px', borderRadius: '2px', background: newPass.length >= i * 2 ? i <= 1 ? '#ef4444' : i <= 2 ? '#f59e0b' : '#22d4a8' : '#e2eae6' }} />
                        ))}
                      </div>
                      <p style={{ fontSize: '11px', color: '#6b7a76' }}>
                        {newPass.length < 4 ? 'Too weak' : newPass.length < 6 ? 'Weak' : newPass.length < 8 ? 'Good' : 'Strong'}
                      </p>
                    </div>
                  )}

                  <button onClick={handleSave} style={{ marginTop: '16px', background: '#22d4a8', color: 'white', border: 'none', padding: '11px 24px', borderRadius: '12px', fontSize: '14px', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>
                    Update Password
                  </button>
                </div>

                <div style={{ height: '1px', background: '#f4fbf8', marginBottom: '28px' }} />

                {/* 2FA */}
                <div style={{ marginBottom: '28px' }}>
                  <h3 style={{ fontSize: '14px', fontWeight: 800, color: '#161d1b', marginBottom: '8px' }}>Two-Factor Authentication</h3>
                  <p style={{ fontSize: '13px', color: '#6b7a76', marginBottom: '14px' }}>Add an extra layer of security with SMS or authenticator app verification.</p>
                  <button style={{ background: '#f4fbf8', color: '#161d1b', border: '1.5px solid #e2eae6', padding: '11px 20px', borderRadius: '12px', fontSize: '13px', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>
                    Enable 2FA
                  </button>
                </div>

                <div style={{ height: '1px', background: '#f4fbf8', marginBottom: '28px' }} />

                {/* Active sessions */}
                <div style={{ marginBottom: '28px' }}>
                  <h3 style={{ fontSize: '14px', fontWeight: 800, color: '#161d1b', marginBottom: '16px' }}>Active Sessions</h3>
                  {[
                    { device: 'MacBook Pro — Chrome', location: 'Rabat, Morocco', time: 'Current session', current: true },
                    { device: 'iPhone 15 — Safari', location: 'Rabat, Morocco', time: '2 hours ago', current: false },
                  ].map(s => (
                    <div key={s.device} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #f4fbf8' }}>
                      <div>
                        <p style={{ fontSize: '13px', fontWeight: 700, color: '#161d1b', marginBottom: '2px' }}>{s.device}</p>
                        <p style={{ fontSize: '11px', color: '#6b7a76' }}>{s.location} · {s.time}</p>
                      </div>
                      {s.current
                        ? <span style={{ fontSize: '11px', fontWeight: 700, color: '#22d4a8', background: '#e6f9f3', padding: '4px 10px', borderRadius: '100px' }}>Current</span>
                        : <button style={{ fontSize: '12px', fontWeight: 700, color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>Revoke</button>
                      }
                    </div>
                  ))}
                </div>

                <div style={{ height: '1px', background: '#f4fbf8', marginBottom: '24px' }} />

                {/* Danger zone */}
                <div style={{ background: '#fff5f5', borderRadius: '14px', padding: '20px', border: '1px solid #fecaca' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    <AlertTriangle size={16} color="#ef4444" />
                    <h3 style={{ fontSize: '14px', fontWeight: 800, color: '#ef4444' }}>Danger Zone</h3>
                  </div>
                  <p style={{ fontSize: '13px', color: '#6b7a76', marginBottom: '14px' }}>Permanently delete your account and all associated data. This cannot be undone.</p>
                  <button style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'white', color: '#ef4444', border: '1.5px solid #fecaca', padding: '10px 18px', borderRadius: '10px', fontSize: '13px', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>
                    <Trash2 size={14} /> Delete Account
                  </button>
                </div>
              </div>
            )}

            {/* ── NOTIFICATIONS TAB ── */}
            {tab === 'notifications' && (
              <div>
                <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#161d1b', marginBottom: '4px' }}>Notification Preferences</h2>
                <p style={{ fontSize: '13px', color: '#6b7a76', marginBottom: '28px' }}>Choose what you want to be notified about.</p>

                <h3 style={{ fontSize: '13px', fontWeight: 700, color: '#161d1b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>Activity</h3>
                <div style={{ marginBottom: '24px' }}>
                  <Toggle on={notifs.messages} onToggle={() => toggleNotif('messages')} label="New Messages" desc="When someone sends you a message" />
                  <Toggle on={notifs.favorites} onToggle={() => toggleNotif('favorites')} label="Saved Listings" desc="When someone saves your listing" />
                  <Toggle on={notifs.priceDrops} onToggle={() => toggleNotif('priceDrops')} label="Price Drops" desc="When a saved item drops in price" />
                  <Toggle on={notifs.newListings} onToggle={() => toggleNotif('newListings')} label="New Listings" desc="New items matching your searches" />
                </div>

                <h3 style={{ fontSize: '13px', fontWeight: 700, color: '#161d1b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>Marketing</h3>
                <div style={{ marginBottom: '24px' }}>
                  <Toggle on={notifs.promotions} onToggle={() => toggleNotif('promotions')} label="Promotions & Offers" desc="Diamond deals and seasonal promotions" />
                </div>

                <h3 style={{ fontSize: '13px', fontWeight: 700, color: '#161d1b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>Channels</h3>
                <div style={{ marginBottom: '28px' }}>
                  <Toggle on={notifs.email} onToggle={() => toggleNotif('email')} label="Email Notifications" desc={email} />
                  <Toggle on={notifs.sms} onToggle={() => toggleNotif('sms')} label="SMS Notifications" desc={`+212 ${phone}`} />
                  <Toggle on={notifs.push} onToggle={() => toggleNotif('push')} label="Push Notifications" desc="Browser and mobile push alerts" />
                </div>

                <button onClick={handleSave}
                  style={{ background: '#22d4a8', color: 'white', border: 'none', padding: '12px 28px', borderRadius: '12px', fontSize: '14px', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>
                  Save Preferences
                </button>
              </div>
            )}

            {/* ── BILLING / MEMBERSHIP TAB ── */}
            {tab === 'billing' && (
              <div>
                <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#161d1b', marginBottom: '4px' }}>Membership & Billing</h2>
                <p style={{ fontSize: '13px', color: '#6b7a76', marginBottom: '28px' }}>Manage your Diamond membership and payment methods.</p>

                {/* Current plan */}
                <div style={{ background: 'linear-gradient(135deg, #161d1b, #2b3230)', borderRadius: '20px', padding: '24px', marginBottom: '24px', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', top: '-20px', right: '-20px', width: '120px', height: '120px', borderRadius: '50%', background: 'rgba(34,212,168,0.1)' }} />
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(34,212,168,0.15)', color: '#22d4a8', fontSize: '11px', fontWeight: 700, padding: '5px 12px', borderRadius: '100px' }}>
                      💎 DIAMOND ACTIVE
                    </span>
                    <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)' }}>Renews Aug 1, 2026</span>
                  </div>
                  <p style={{ fontSize: '28px', fontWeight: 800, color: 'white', marginBottom: '4px' }}>299 MAD<span style={{ fontSize: '14px', fontWeight: 500, color: 'rgba(255,255,255,0.5)' }}>/month</span></p>
                  <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)' }}>Unlimited highlighted ads · Verified badge · Priority support</p>
                </div>

                {/* Benefits */}
                <div style={{ marginBottom: '24px' }}>
                  <h3 style={{ fontSize: '14px', fontWeight: 800, color: '#161d1b', marginBottom: '14px' }}>Your Diamond Benefits</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {[
                      'Unlimited ads with Diamond badge',
                      'Priority placement in search results',
                      'Verified seller checkmark',
                      'Advanced analytics dashboard',
                      'Dedicated account manager',
                      'Zero commission on sales',
                    ].map(b => (
                      <div key={b} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: '#e6f9f3', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          <Check size={11} color="#22d4a8" strokeWidth={3} />
                        </div>
                        <span style={{ fontSize: '13px', color: '#3c4a46' }}>{b}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ height: '1px', background: '#f4fbf8', marginBottom: '24px' }} />

                {/* Payment method */}
                <div style={{ marginBottom: '24px' }}>
                  <h3 style={{ fontSize: '14px', fontWeight: 800, color: '#161d1b', marginBottom: '14px' }}>Payment Method</h3>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', background: '#f4fbf8', borderRadius: '14px', border: '1.5px solid #e2eae6' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ width: '40px', height: '28px', background: '#161d1b', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <CreditCard size={16} color="white" />
                      </div>
                      <div>
                        <p style={{ fontSize: '13px', fontWeight: 700, color: '#161d1b' }}>•••• •••• •••• 4242</p>
                        <p style={{ fontSize: '11px', color: '#6b7a76' }}>Expires 09/27</p>
                      </div>
                    </div>
                    <button style={{ fontSize: '12px', fontWeight: 700, color: '#22d4a8', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>Update</button>
                  </div>
                </div>

                {/* Billing history */}
                <div>
                  <h3 style={{ fontSize: '14px', fontWeight: 800, color: '#161d1b', marginBottom: '14px' }}>Billing History</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                    {[
                      { date: 'Jul 1, 2026', amount: '299 MAD', status: 'Paid' },
                      { date: 'Jun 1, 2026', amount: '299 MAD', status: 'Paid' },
                      { date: 'May 1, 2026', amount: '299 MAD', status: 'Paid' },
                    ].map(h => (
                      <div key={h.date} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #f4fbf8' }}>
                        <div>
                          <p style={{ fontSize: '13px', fontWeight: 600, color: '#161d1b' }}>Diamond Membership</p>
                          <p style={{ fontSize: '11px', color: '#6b7a76' }}>{h.date}</p>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <span style={{ fontSize: '13px', fontWeight: 700, color: '#161d1b' }}>{h.amount}</span>
                          <span style={{ fontSize: '10px', fontWeight: 700, color: '#22d4a8', background: '#e6f9f3', padding: '3px 8px', borderRadius: '100px' }}>{h.status}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ marginTop: '24px' }}>
                  <button style={{ fontSize: '13px', fontWeight: 700, color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>
                    Cancel Membership
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
