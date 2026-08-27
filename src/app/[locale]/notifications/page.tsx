'use client'

import { useState, use, useEffect, useMemo } from 'react'
import Link from 'next/link'
import { Bell, BellOff, MessageCircle, Heart, TrendingDown, Tag, Shield, Sparkles, Check, Trash2, Settings, ChevronRight, X, Smartphone, Monitor, CheckCircle, Zap, Clock, AlertTriangle } from 'lucide-react'
import Breadcrumb from '@/components/ui/Breadcrumb'
import { useNotifications } from '@/hooks/useNotifications'

type Locale = 'en' | 'fr' | 'ar' | 'es' | 'de'

const MINT    = '#22d4a8'
const CREAM   = '#f5ede0'
const SURFACE = '#f4fbf8'
const INK     = '#161d1b'
const MUTED   = '#6b7a76'
const FONT    = "'Inter', system-ui, sans-serif"

type Filter = 'all' | 'unread' | 'messages' | 'activity' | 'system'

function iconForType(type: string): { icon: string; iconBg: string } {
  switch (type) {
    case 'message':  return { icon: '💬', iconBg: '#f0fdf9' }
    case 'favorite': return { icon: '❤️', iconBg: '#fef2f2' }
    case 'price':    return { icon: '📉', iconBg: '#ede9fe' }
    case 'system':   return { icon: '🔔', iconBg: '#fff4e0' }
    case 'activity': return { icon: '📊', iconBg: SURFACE }
    default:         return { icon: '🔔', iconBg: SURFACE }
  }
}

function timeAgo(iso: string): string {
  const mins = Math.floor((Date.now() - new Date(iso).getTime()) / 60000)
  if (mins < 1)  return 'just now'
  if (mins < 60) return `${mins} minute${mins === 1 ? '' : 's'} ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24)  return `${hrs} hour${hrs === 1 ? '' : 's'} ago`
  const days = Math.floor(hrs / 24)
  return `${days} day${days === 1 ? '' : 's'} ago`
}

const FILTER_TABS: { key: Filter; label: string }[] = [
  { key: 'all',      label: 'All' },
  { key: 'unread',   label: 'Unread' },
  { key: 'messages', label: 'Messages' },
  { key: 'activity', label: 'Activity' },
  { key: 'system',   label: 'System' },
]

type PushStatus = 'unknown' | 'granted' | 'denied' | 'unsupported'

export default function NotificationsPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = use(params)
  const { notifications: dbNotifications, markRead: markReadDb, markAllRead: markAllReadDb } = useNotifications()
  const [filter, setFilter]       = useState<Filter>('all')
  const [dismissedIds, setDismissedIds] = useState<Set<string>>(new Set())
  const [pushStatus, setPushStatus] = useState<PushStatus>('unknown')
  const [showPushBanner, setShowPushBanner] = useState(true)
  const [pushRequesting, setPushRequesting] = useState(false)
  const [testSent, setTestSent]   = useState(false)

  // Check push notification permission on mount
  useEffect(() => {
    if (!('Notification' in window)) {
      setPushStatus('unsupported')
      return
    }
    setPushStatus(Notification.permission as PushStatus)
    if (Notification.permission === 'granted') setShowPushBanner(false)
  }, [])

  const requestPushPermission = async () => {
    if (!('Notification' in window)) return
    setPushRequesting(true)
    try {
      const permission = await Notification.requestPermission()
      setPushStatus(permission as PushStatus)
      if (permission === 'granted') {
        setShowPushBanner(false)
        // Send a real test notification
        new Notification('🎉 SouKni Notifications Enabled!', {
          body: "You'll now receive alerts for messages, price drops, and more.",
          icon: '/favicon.ico',
        })
        setTestSent(true)
      }
    } catch (e) {
      console.error(e)
    }
    setPushRequesting(false)
  }

  const sendTestNotification = () => {
    if (pushStatus !== 'granted') return
    new Notification('💬 New message from Sara Bennani', {
      body: 'Is the iPhone still available? Can we meet tomorrow?',
      icon: '/favicon.ico',
      tag: 'test-message',
    })
  }

  const items = useMemo(() => dbNotifications
    .filter(n => !dismissedIds.has(n.id))
    .map(n => ({
      id:    n.id as string,
      type:  n.type as string,
      read:  !!n.read,
      time:  timeAgo(n.created_at),
      title: n.title as string,
      body:  n.body as string,
      href:  (n.href as string) || '/',
      avatar: null as string | null,
      avatarBg: undefined as string | undefined,
      ...iconForType(n.type),
    })), [dbNotifications, dismissedIds])

  const markAllRead   = () => markAllReadDb()
  const markRead      = (id: string) => markReadDb(id)
  const removeItem    = (id: string) => setDismissedIds(prev => new Set(prev).add(id))
  const clearAll      = () => setDismissedIds(new Set(dbNotifications.map(n => n.id)))

  const filtered = items.filter(n => {
    if (filter === 'all')      return true
    if (filter === 'unread')   return !n.read
    if (filter === 'messages') return n.type === 'message'
    if (filter === 'activity') return ['activity','favorite','price'].includes(n.type)
    if (filter === 'system')   return n.type === 'system'
    return true
  })

  const unreadCount = items.filter(n => !n.read).length

  return (
    <div style={{ background: SURFACE, minHeight: '100vh', fontFamily: FONT }}>
      <div style={{ maxWidth: '740px', margin: '0 auto', padding: '32px 24px 80px' }}>

        <Breadcrumb items={[{ label: 'Home', href: `/${locale}` }, { label: 'Notifications' }]} style={{ marginBottom: 20, textTransform: 'none', fontSize: 13, letterSpacing: 'normal' }} />

        {/* Push notification banner */}
        {showPushBanner && pushStatus !== 'denied' && pushStatus !== 'unsupported' && pushStatus !== 'granted' && (
          <div style={{ background: `linear-gradient(135deg, ${INK}, #2b3230)`, borderRadius: '20px', padding: '20px 24px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '16px', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: '-20px', right: '-20px', width: '120px', height: '120px', borderRadius: '50%', background: 'rgba(34,212,168,0.08)' }} />
            <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'rgba(34,212,168,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Bell size={22} color={MINT} />
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: '14px', fontWeight: 900, color: 'white', marginBottom: '3px', letterSpacing: '-0.03em' }}>Enable Push Notifications</p>
              <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.55)', fontWeight: 700 }}>Get instant alerts for messages, price drops, and new matching listings</p>
            </div>
            <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
              <button onClick={requestPushPermission} disabled={pushRequesting}
                style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '10px 18px', borderRadius: '10px', background: MINT, color: 'white', border: 'none', fontSize: '13px', fontWeight: 900, cursor: pushRequesting ? 'not-allowed' : 'pointer', fontFamily: FONT, whiteSpace: 'nowrap' }}>
                {pushRequesting ? (
                  <><span style={{ width: '12px', height: '12px', borderRadius: '50%', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: 'white', display: 'inline-block', animation: 'spin 0.8s linear infinite' }} /> Enabling...</>
                ) : (
                  <><Zap size={13} /> Enable Now</>
                )}
              </button>
              <button onClick={() => setShowPushBanner(false)}
                style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(255,255,255,0.08)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <X size={14} color="rgba(255,255,255,0.5)" />
              </button>
            </div>
          </div>
        )}

        {/* Push enabled success */}
        {pushStatus === 'granted' && testSent && (
          <div style={{ background: '#f0fdf9', borderRadius: '16px', padding: '14px 18px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px', border: `1px solid ${MINT}` }}>
            <CheckCircle size={18} color={MINT} />
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: '13px', fontWeight: 900, color: INK }}>Push notifications enabled! ✓</p>
              <p style={{ fontSize: '11px', color: MUTED, fontWeight: 700 }}>You'll receive alerts even when SouKni is in the background</p>
            </div>
            <button onClick={sendTestNotification}
              style={{ padding: '7px 14px', borderRadius: '8px', background: MINT, color: 'white', border: 'none', fontSize: '11px', fontWeight: 900, cursor: 'pointer', fontFamily: FONT, whiteSpace: 'nowrap' }}>
              Send Test
            </button>
          </div>
        )}

        {/* Push denied */}
        {pushStatus === 'denied' && (
          <div style={{ background: '#fff8f0', borderRadius: '16px', padding: '14px 18px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px', border: '1px solid #fde68a' }}>
            <AlertTriangle size={16} color="#b45309" />
            <div>
              <p style={{ fontSize: '13px', fontWeight: 900, color: INK }}>Notifications are blocked</p>
              <p style={{ fontSize: '11px', color: MUTED, fontWeight: 700 }}>Enable them in your browser settings: Settings → Notifications → soukni.com → Allow</p>
            </div>
          </div>
        )}

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '13px', background: `linear-gradient(135deg, ${MINT}, #0f9b8e)`, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', boxShadow: `0 4px 16px rgba(34,212,168,0.3)` }}>
              <Bell size={20} color="white" />
              {unreadCount > 0 && (
                <div style={{ position: 'absolute', top: '-4px', right: '-4px', width: '18px', height: '18px', borderRadius: '50%', background: '#ef4444', border: '2px solid #f4fbf8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: '9px', fontWeight: 900, color: 'white' }}>{unreadCount}</span>
                </div>
              )}
            </div>
            <div>
              <h1 style={{ fontSize: '24px', fontWeight: 900, color: INK, letterSpacing: '-0.05em' }}>Notifications</h1>
              {unreadCount > 0 && <p style={{ fontSize: '12px', color: MUTED, fontWeight: 700 }}>{unreadCount} unread</p>}
            </div>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            {unreadCount > 0 && (
              <button onClick={markAllRead}
                style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 14px', borderRadius: '10px', border: '1px solid #e2eae6', background: 'white', fontSize: '12px', fontWeight: 900, color: INK, cursor: 'pointer', fontFamily: FONT }}>
                <Check size={13} color={MINT} /> Mark all read
              </button>
            )}
            <Link href={`/${locale}/account`}
              style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 14px', borderRadius: '10px', border: '1px solid #e2eae6', background: 'white', fontSize: '12px', fontWeight: 900, color: INK, textDecoration: 'none' }}>
              <Settings size={13} /> Settings
            </Link>
          </div>
        </div>

        {/* Filter tabs */}
        <div style={{ display: 'flex', gap: '4px', background: 'white', padding: '4px', borderRadius: '14px', border: '1px solid #e2eae6', marginBottom: '20px', overflowX: 'auto' }}>
          {FILTER_TABS.map(t => {
            const count = t.key === 'unread' ? unreadCount
              : t.key === 'all' ? items.length
              : items.filter(n => t.key === 'messages' ? n.type === 'message' : t.key === 'activity' ? ['activity','favorite','price'].includes(n.type) : n.type === 'system').length
            return (
              <button key={t.key} onClick={() => setFilter(t.key)}
                style={{ padding: '8px 16px', borderRadius: '10px', border: 'none', cursor: 'pointer', fontSize: '13px', fontWeight: 900, fontFamily: FONT, whiteSpace: 'nowrap', background: filter === t.key ? INK : 'transparent', color: filter === t.key ? 'white' : MUTED, transition: 'all 0.15s' }}>
                {t.label} {count > 0 && <span style={{ fontSize: '10px', opacity: 0.7 }}>({count})</span>}
              </button>
            )
          })}
        </div>

        {/* Notifications list */}
        <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
        {filtered.length === 0 ? (
          <div style={{ background: 'white', borderRadius: '20px', padding: '64px 20px', textAlign: 'center', border: '1px solid #e2eae6' }}>
            <div style={{ width: '60px', height: '60px', borderRadius: '18px', background: SURFACE, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
              <Bell size={26} color={MUTED} />
            </div>
            <p style={{ fontSize: '16px', fontWeight: 900, color: INK, marginBottom: '6px', letterSpacing: '-0.03em' }}>
              {filter === 'all' ? 'No notifications yet' : `No ${filter} notifications`}
            </p>
            <p style={{ fontSize: '13px', color: MUTED, fontWeight: 700 }}>We'll notify you when something happens.</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {filtered.map(n => (
              <div key={n.id}
                style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', padding: '16px', borderRadius: '16px', background: n.read ? 'white' : '#f0fdf9', border: `1px solid ${n.read ? '#e2eae6' : MINT}`, position: 'relative', transition: 'all 0.2s', cursor: 'pointer' }}
                onClick={() => markRead(n.id)}
                onMouseEnter={e => { if (n.read) e.currentTarget.style.borderColor = MINT }}
                onMouseLeave={e => { if (n.read) e.currentTarget.style.borderColor = '#e2eae6' }}
              >
                {!n.read && <div style={{ position: 'absolute', top: '18px', left: '7px', width: '6px', height: '6px', borderRadius: '50%', background: MINT }} />}

                {/* Avatar or icon */}
                <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: n.avatar ? n.avatarBg : n.iconBg || SURFACE, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: n.icon ? '20px' : '14px' }}>
                  {n.avatar
                    ? <span style={{ color: 'white', fontWeight: 900, fontSize: '14px' }}>{n.avatar}</span>
                    : n.icon
                  }
                </div>

                {/* Content */}
                <Link href={`/${locale}${n.href}`} style={{ flex: 1, textDecoration: 'none', minWidth: 0 }}>
                  <p style={{ fontSize: '13px', fontWeight: n.read ? 600 : 900, color: INK, marginBottom: '3px', lineHeight: 1.3, letterSpacing: '-0.02em' }}>{n.title}</p>
                  <p style={{ fontSize: '12px', color: MUTED, lineHeight: 1.5, marginBottom: '5px', fontWeight: 600 }}>{n.body}</p>
                  <p style={{ fontSize: '11px', color: n.read ? MUTED : MINT, fontWeight: 700 }}>{n.time}</p>
                </Link>

                {/* Actions */}
                <div style={{ display: 'flex', gap: '4px', flexShrink: 0 }}>
                  {!n.read && (
                    <button onClick={e => { e.stopPropagation(); markRead(n.id) }}
                      style={{ width: '28px', height: '28px', borderRadius: '8px', border: 'none', background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: MUTED }}
                      onMouseEnter={e => e.currentTarget.style.background = SURFACE}
                      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                    >
                      <Check size={13} />
                    </button>
                  )}
                  <button onClick={e => { e.stopPropagation(); removeItem(n.id) }}
                    style={{ width: '28px', height: '28px', borderRadius: '8px', border: 'none', background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: MUTED }}
                    onMouseEnter={e => { e.currentTarget.style.background = '#fef2f2'; (e.currentTarget as HTMLElement).style.color = '#ef4444' }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = MUTED }}
                  >
                    <X size={13} />
                  </button>
                </div>
              </div>
            ))}

            {items.length > 0 && (
              <button onClick={clearAll}
                style={{ display: 'flex', alignItems: 'center', gap: '6px', margin: '12px auto 0', background: 'none', border: 'none', color: MUTED, fontSize: '12px', fontWeight: 700, cursor: 'pointer', fontFamily: FONT }}>
                <Trash2 size={13} /> Clear all notifications
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
