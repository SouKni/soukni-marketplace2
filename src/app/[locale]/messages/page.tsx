'use client'

import { useState, use, useRef, useEffect, useCallback, useMemo, Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Search, Send, MoreVertical, Check, CheckCheck, Image as ImageIcon, Phone, MapPin, X, Smile, Paperclip, ArrowLeft, Bell, BellOff, Circle, Clock, Shield, Flag, Trash2, Archive, Star } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { useMessages } from '@/hooks/useMessages'
import { getSupabaseClient } from '@/lib/supabase/client'
import ReportModal, { ReportTargetType } from '@/components/ui/ReportModal'
import ReviewModal from '@/components/ui/ReviewModal'
import SpeakButton from '@/components/ui/SpeakButton'

type Locale = 'en' | 'fr' | 'ar' | 'es' | 'de'

const MINT    = '#22d4a8'
const SURFACE = '#f4fbf8'
const INK     = '#161d1b'
const MUTED   = '#6b7a76'
const FONT    = "'Inter', system-ui, sans-serif"

type Message = {
  id: string
  from: 'me' | 'them'
  text: string
  time: string
  read: boolean
  sending?: boolean
}

type Conversation = {
  id: string
  otherId: string
  name: string
  initials: string
  online: boolean
  lastSeen: string
  listingTitle: string
  listingImage: string
  listingPrice: string
  listingId: string
  lastMessage: string
  lastTime: string
  unread: number
  muted: boolean
  starred: boolean
}

// ── Raw shape returned by GET /api/messages ────────────────────────────────
type DbParty = { full_name: string; avatar_url: string | null; badge: string | null } | null
type DbConversation = {
  id: string
  listing_id: string | null
  buyer_id: string
  seller_id: string
  last_message: string | null
  last_message_at: string
  buyer_unread: number
  seller_unread: number
  listings: { title: string; images: string[]; price: number; currency: string } | null
  buyer: DbParty
  seller: DbParty
}

function initialsOf(name: string) {
  return name.trim().split(/\s+/).map(p => p[0]).slice(0, 2).join('').toUpperCase() || '?'
}

function timeAgoShort(iso: string) {
  const mins = Math.floor((Date.now() - new Date(iso).getTime()) / 60000)
  if (mins < 1)   return 'now'
  if (mins < 60)  return `${mins}m`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24)   return `${hrs}h`
  return `${Math.floor(hrs / 24)}d`
}

function formatMAD(centimes: number, currency: string) {
  return `${Math.round(centimes / 100).toLocaleString()} ${currency}`
}

const QUICK_REPLIES = [
  'Is this still available?',
  'Can you do a lower price?',
  'Where can we meet?',
  'What condition is it in?',
  'Can I see more photos?',
  'I can come today',
]

export default function MessagesPage({ params }: { params: Promise<{ locale: Locale }> }) {
  return (
    <Suspense fallback={null}>
      <MessagesPageInner params={params} />
    </Suspense>
  )
}

function MessagesPageInner({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = use(params)
  const messagesEndRef  = useRef<HTMLDivElement>(null)
  const inputRef        = useRef<HTMLInputElement>(null)
  const supabase        = getSupabaseClient()

  const { user } = useAuth()
  const searchParams = useSearchParams()
  const deepLinkedId = searchParams.get('c')
  const [rawConversations, setRawConversations] = useState<DbConversation[]>([])
  const [loadingConvos, setLoadingConvos]  = useState(true)
  const [activeId, setActiveId]           = useState<string | null>(null)
  const [draft, setDraft]                 = useState('')
  const [search, setSearch]               = useState('')
  const [showMenu, setShowMenu]           = useState(false)
  const [showQuickReplies, setShowQuickReplies] = useState(false)
  const [showMobileChat, setShowMobileChat] = useState(false)
  const [emojiOpen, setEmojiOpen]         = useState(false)
  // muted/starred have no backing column on `conversations` — kept as
  // local-only UI state until the schema grows one (see audit notes).
  const [mutedIds, setMutedIds]     = useState<Set<string>>(new Set())
  const [starredIds, setStarredIds] = useState<Set<string>>(new Set())
  const [reportTarget, setReportTarget] = useState<{ type: ReportTargetType; id: string } | null>(null)
  const [reviewTarget, setReviewTarget] = useState<string | null>(null)

  const EMOJIS = ['😊','👍','❤️','🙏','✅','😂','🔥','💯','👋','🤝','💰','📦']

  // Fetch the conversation list for the signed-in user
  useEffect(() => {
    if (!user) { setRawConversations([]); setLoadingConvos(false); return }
    setLoadingConvos(true)
    fetch('/api/messages')
      .then(r => r.json())
      .then(d => {
        const convos: DbConversation[] = d.conversations || []
        setRawConversations(convos)
        setActiveId(prev => prev ?? (deepLinkedId && convos.some(c => c.id === deepLinkedId) ? deepLinkedId : convos[0]?.id ?? null))
      })
      .finally(() => setLoadingConvos(false))
  }, [user])

  const conversations: Conversation[] = useMemo(() => rawConversations.map(c => {
    const isBuyer = user?.id === c.buyer_id
    const other   = isBuyer ? c.seller : c.buyer
    const name    = other?.full_name || 'SouKni User'
    return {
      id: c.id,
      otherId: isBuyer ? c.seller_id : c.buyer_id,
      name,
      initials: initialsOf(name),
      online: false,
      lastSeen: 'Recently active',
      listingTitle: c.listings?.title || 'Listing',
      listingImage: c.listings?.images?.[0] || '',
      listingPrice: c.listings ? formatMAD(c.listings.price, c.listings.currency) : '',
      listingId: c.listing_id || '',
      lastMessage: c.last_message || '',
      lastTime: timeAgoShort(c.last_message_at),
      unread: isBuyer ? c.buyer_unread : c.seller_unread,
      muted: mutedIds.has(c.id),
      starred: starredIds.has(c.id),
    }
  }), [rawConversations, user, mutedIds, starredIds])

  const active = conversations.find(c => c.id === activeId)

  const filtered = conversations.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.listingTitle.toLowerCase().includes(search.toLowerCase())
  )

  const { messages: dbMessages, sendMessage: sendMessageDb, markRead: markMessagesRead } = useMessages(activeId || undefined)

  const messages: Message[] = useMemo(() => dbMessages.map((m: any) => ({
    id: m.id,
    from: m.sender_id === user?.id ? 'me' : 'them',
    text: m.text,
    time: new Date(m.created_at).toLocaleTimeString('en', { hour: '2-digit', minute: '2-digit' }),
    read: !!m.read,
  })), [dbMessages, user])

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages.length])

  // Mark messages read + zero the unread badge when switching conversations
  useEffect(() => {
    if (!activeId || !user) return
    markMessagesRead()
    const convo = rawConversations.find(c => c.id === activeId)
    if (!convo) return
    const isBuyer = user.id === convo.buyer_id
    const field = isBuyer ? 'buyer_unread' : 'seller_unread'
    if ((convo as any)[field] > 0) {
      supabase.from('conversations').update({ [field]: 0 }).eq('id', activeId).then(() => {
        setRawConversations(prev => prev.map(c => c.id === activeId ? { ...c, [field]: 0 } : c))
      })
    }
  }, [activeId, user])

  const sendMessage = useCallback(() => {
    if (!draft.trim() || !activeId) return
    const text = draft.trim()
    setDraft('')
    setShowQuickReplies(false)
    setEmojiOpen(false)
    sendMessageDb(text).then(() => {
      setRawConversations(prev => prev.map(c =>
        c.id === activeId ? { ...c, last_message: text, last_message_at: new Date().toISOString() } : c
      ))
    })
  }, [draft, activeId, sendMessageDb])

  const switchConvo = (id: string) => {
    setActiveId(id)
    setShowMobileChat(true)
    setDraft('')
    setShowQuickReplies(false)
    inputRef.current?.focus()
  }

  const toggleMute = (id: string) => {
    setMutedIds(prev => { const next = new Set(prev); next.has(id) ? next.delete(id) : next.add(id); return next })
    setShowMenu(false)
  }

  const toggleStar = (id: string) => {
    setStarredIds(prev => { const next = new Set(prev); next.has(id) ? next.delete(id) : next.add(id); return next })
  }

  const deleteConvo = (id: string) => {
    supabase.from('conversations').delete().eq('id', id).then(() => {
      setRawConversations(prev => prev.filter(c => c.id !== id))
      if (activeId === id) {
        const remaining = rawConversations.filter(c => c.id !== id)
        setActiveId(remaining[0]?.id ?? null)
      }
    })
    setShowMenu(false)
  }

  const totalUnread = conversations.reduce((s, c) => s + c.unread, 0)

  return (
    <div style={{ background: SURFACE, height: 'calc(100vh - 112px)', display: 'flex', fontFamily: FONT }}>
      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes typing { 0%,60%,100% { transform: translateY(0); } 30% { transform: translateY(-4px); } }
        .msg-bubble { animation: fadeIn 0.2s ease; }
        .typing-dot { animation: typing 1.2s infinite; display: inline-block; }
        .typing-dot:nth-child(2) { animation-delay: 0.2s; }
        .typing-dot:nth-child(3) { animation-delay: 0.4s; }
        .convo-row:hover { background: #f0fdf9 !important; }
        .send-btn:hover { transform: scale(1.05); }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #e2eae6; border-radius: 4px; }
      `}</style>

      {/* ── LEFT: CONVERSATION LIST ─────────────────────── */}
      <div style={{ width: '340px', borderRight: '1px solid #e2eae6', display: 'flex', flexDirection: 'column', background: 'white', flexShrink: 0 }}>

        {/* Header */}
        <div style={{ padding: '16px', borderBottom: '1px solid #e2eae6' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h1 style={{ fontSize: '18px', fontWeight: 900, color: INK, letterSpacing: '-0.05em' }}>Messages</h1>
              {totalUnread > 0 && (
                <span style={{ background: '#ef4444', color: 'white', fontSize: '10px', fontWeight: 900, borderRadius: '100px', minWidth: '18px', height: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 5px' }}>
                  {totalUnread}
                </span>
              )}
            </div>
            <button onClick={() => {}} style={{ width: '32px', height: '32px', borderRadius: '10px', border: '1px solid #e2eae6', background: SURFACE, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <MoreVertical size={14} color={MUTED} />
            </button>
          </div>

          {/* Search */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: SURFACE, borderRadius: '12px', padding: '0 12px', height: '38px', border: '1px solid #e2eae6' }}>
            <Search size={14} color={MUTED} />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search conversations..."
              style={{ flex: 1, border: 'none', background: 'transparent', outline: 'none', fontSize: '13px', fontFamily: FONT, fontWeight: 700, color: INK }} />
            {search && <button onClick={() => setSearch('')} style={{ border: 'none', background: 'none', cursor: 'pointer', display: 'flex' }}><X size={12} color={MUTED} /></button>}
          </div>
        </div>

        {/* Starred section */}
        {conversations.some(c => c.starred) && (
          <div style={{ padding: '8px 16px 0' }}>
            <p style={{ fontSize: '10px', fontWeight: 900, color: MUTED, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '6px' }}>⭐ Starred</p>
            <div style={{ display: 'flex', gap: '8px', paddingBottom: '10px', borderBottom: '1px solid #f4fbf8', overflowX: 'auto' }}>
              {conversations.filter(c => c.starred).map(c => (
                <button key={c.id} onClick={() => switchConvo(c.id)}
                  style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}>
                  <div style={{ position: 'relative' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: `linear-gradient(135deg, ${MINT}, #0f9b8e)`, display: 'flex', alignItems: 'center', justifyContent: 'center', border: activeId === c.id ? `2px solid ${MINT}` : '2px solid transparent' }}>
                      <span style={{ color: 'white', fontWeight: 900, fontSize: '14px' }}>{c.initials}</span>
                    </div>
                    {c.online && <div style={{ position: 'absolute', bottom: '1px', right: '1px', width: '10px', height: '10px', borderRadius: '50%', background: MINT, border: '2px solid white' }} />}
                  </div>
                  <span style={{ fontSize: '10px', fontWeight: 700, color: INK, maxWidth: '44px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.name.split(' ')[0]}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Conversation list */}
        <div style={{ flex: 1, overflowY: 'auto' }}>
          {filtered.length === 0 && (
            <div style={{ padding: '40px 20px', textAlign: 'center' }}>
              <p style={{ fontSize: '14px', color: MUTED, fontWeight: 700 }}>No conversations found</p>
            </div>
          )}
          {filtered.map(c => (
            <button key={c.id} onClick={() => switchConvo(c.id)}
              className="convo-row"
              style={{ width: '100%', display: 'flex', gap: '12px', padding: '14px 16px', border: 'none', borderBottom: '1px solid #f4fbf8', cursor: 'pointer', textAlign: 'left', fontFamily: FONT, background: activeId === c.id ? '#f0fdf9' : 'white', transition: 'background 0.15s' }}>

              {/* Avatar */}
              <div style={{ position: 'relative', flexShrink: 0 }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: `linear-gradient(135deg, ${MINT}, #0f9b8e)`, display: 'flex', alignItems: 'center', justifyContent: 'center', border: activeId === c.id ? `2px solid ${MINT}` : '2px solid transparent' }}>
                  <span style={{ color: 'white', fontWeight: 900, fontSize: '16px' }}>{c.initials}</span>
                </div>
                {c.online && <div style={{ position: 'absolute', bottom: '1px', right: '1px', width: '12px', height: '12px', borderRadius: '50%', background: MINT, border: '2px solid white' }} />}
              </div>

              {/* Content */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <p style={{ fontSize: '14px', fontWeight: 900, color: INK }}>{c.name}</p>
                    {c.starred && <Star size={11} fill="#f59e0b" color="#f59e0b" />}
                    {c.muted && <BellOff size={11} color={MUTED} />}
                  </div>
                  <span style={{ fontSize: '11px', color: c.unread > 0 ? MINT : MUTED, fontWeight: c.unread > 0 ? 900 : 700 }}>{c.lastTime}</span>
                </div>
                <p style={{ fontSize: '12px', color: c.unread > 0 ? INK : MUTED, fontWeight: c.unread > 0 ? 700 : 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', marginBottom: '3px' }}>{c.lastMessage}</p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <p style={{ fontSize: '11px', color: MUTED, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', flex: 1, fontWeight: 600 }}>📦 {c.listingTitle}</p>
                  {c.unread > 0 && (
                    <span style={{ background: MINT, color: 'white', fontSize: '10px', fontWeight: 900, borderRadius: '100px', minWidth: '18px', height: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 4px', flexShrink: 0, marginLeft: '6px' }}>
                      {c.unread}
                    </span>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* ── RIGHT: CHAT WINDOW ─────────────────────────── */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        {!user ? (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
            <p style={{ fontSize: '15px', fontWeight: 900, color: INK }}>Sign in to view your messages</p>
            <Link href={`/${locale}/auth`} style={{ fontSize: '13px', fontWeight: 900, color: MINT, textDecoration: 'none' }}>Sign in</Link>
          </div>
        ) : loadingConvos ? (
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <p style={{ fontSize: '13px', fontWeight: 700, color: MUTED }}>Loading conversations…</p>
          </div>
        ) : !active ? (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
            <p style={{ fontSize: '15px', fontWeight: 900, color: INK }}>No conversations yet</p>
            <p style={{ fontSize: '13px', fontWeight: 700, color: MUTED }}>Messages with buyers and sellers will show up here.</p>
          </div>
        ) : (
        <>
        {/* Chat header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 20px', borderBottom: '1px solid #e2eae6', background: 'white' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button onClick={() => setShowMobileChat(false)} style={{ display: 'none', border: 'none', background: 'none', cursor: 'pointer' }}>
              <ArrowLeft size={18} color={INK} />
            </button>
            <div style={{ position: 'relative' }}>
              <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: `linear-gradient(135deg, ${MINT}, #0f9b8e)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ color: 'white', fontWeight: 900, fontSize: '14px' }}>{active.initials}</span>
              </div>
              {active.online && <div style={{ position: 'absolute', bottom: '1px', right: '1px', width: '11px', height: '11px', borderRadius: '50%', background: MINT, border: '2px solid white' }} />}
            </div>
            <div>
              <p style={{ fontSize: '15px', fontWeight: 900, color: INK, letterSpacing: '-0.03em' }}>{active.name}</p>
              <p style={{ fontSize: '11px', color: active.online ? MINT : MUTED, fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                {active.online ? <><Circle size={7} fill={MINT} color={MINT} /> Online</> : <><Clock size={10} /> {active.lastSeen}</>}
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
            <a href={`tel:+212600000000`}
              style={{ width: '36px', height: '36px', borderRadius: '10px', border: '1px solid #e2eae6', background: SURFACE, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', color: INK }}>
              <Phone size={15} />
            </a>
            <div style={{ position: 'relative' }}>
              <button onClick={() => setShowMenu(!showMenu)}
                style={{ width: '36px', height: '36px', borderRadius: '10px', border: '1px solid #e2eae6', background: SURFACE, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <MoreVertical size={15} color={MUTED} />
              </button>
              {showMenu && (
                <div style={{ position: 'absolute', top: '42px', right: 0, background: 'white', borderRadius: '14px', boxShadow: '0 8px 32px rgba(0,0,0,0.15)', border: '1px solid #e2eae6', overflow: 'hidden', minWidth: '180px', zIndex: 20 }}>
                  {[
                    { icon: <Star size={14} />, label: active.starred ? 'Unstar' : 'Star Conversation', action: () => { toggleStar(active.id); setShowMenu(false) } },
                    { icon: active.muted ? <Bell size={14} /> : <BellOff size={14} />, label: active.muted ? 'Unmute' : 'Mute Notifications', action: () => toggleMute(active.id) },
                    { icon: <Star size={14} />, label: 'Leave a Review', action: () => { setReviewTarget(active.otherId); setShowMenu(false) }, danger: false },
                    { icon: <Shield size={14} />, label: 'Report this user', action: () => { setReportTarget({ type: 'user', id: active.otherId }); setShowMenu(false) }, danger: false },
                    { icon: <Trash2 size={14} />, label: 'Delete Conversation', action: () => deleteConvo(active.id), danger: true },
                  ].map(item => (
                    <button key={item.label} onClick={item.action}
                      style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '10px', padding: '11px 16px', border: 'none', background: 'white', cursor: 'pointer', fontSize: '13px', fontWeight: 600, color: item.danger ? '#ef4444' : INK, fontFamily: FONT, textAlign: 'left' }}
                      onMouseEnter={e => e.currentTarget.style.background = SURFACE}
                      onMouseLeave={e => e.currentTarget.style.background = 'white'}
                    >
                      {item.icon} {item.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Listing context strip */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 20px', background: '#f0fdf9', borderBottom: '1px solid #e2eae6' }}>
          <img src={active.listingImage} alt="" style={{ width: '38px', height: '38px', borderRadius: '8px', objectFit: 'cover', flexShrink: 0 }} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ fontSize: '12px', fontWeight: 900, color: INK, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{active.listingTitle}</p>
            <p style={{ fontSize: '12px', fontWeight: 900, color: MINT }}>{active.listingPrice}</p>
          </div>
          <Link href={`/${locale}/listing/${active.listingId}`}
            style={{ fontSize: '11px', fontWeight: 900, color: MINT, textDecoration: 'none', whiteSpace: 'nowrap', padding: '5px 10px', borderRadius: '8px', border: `1px solid ${MINT}`, background: 'white' }}>
            View Ad
          </Link>
        </div>

        {/* Messages area */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px', background: SURFACE }}
          onClick={() => { setShowMenu(false); setEmojiOpen(false) }}>

          {/* Date separator */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', margin: '4px 0' }}>
            <div style={{ flex: 1, height: '1px', background: '#e2eae6' }} />
            <span style={{ fontSize: '10px', fontWeight: 700, color: MUTED }}>Today</span>
            <div style={{ flex: 1, height: '1px', background: '#e2eae6' }} />
          </div>

          {messages.map((msg, i) => {
            const isMe   = msg.from === 'me'
            const showAvatar = !isMe && (i === 0 || messages[i-1].from !== 'them')
            return (
              <div key={msg.id} className="msg-bubble" style={{ display: 'flex', justifyContent: isMe ? 'flex-end' : 'flex-start', alignItems: 'flex-end', gap: '8px' }}>
                {!isMe && (
                  <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: showAvatar ? `linear-gradient(135deg, ${MINT}, #0f9b8e)` : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    {showAvatar && <span style={{ color: 'white', fontWeight: 900, fontSize: '10px' }}>{active.initials}</span>}
                  </div>
                )}
                <div style={{ maxWidth: '68%', display: 'flex', flexDirection: 'column', alignItems: isMe ? 'flex-end' : 'flex-start', gap: '3px' }}>
                  <div style={{
                    padding: '10px 14px',
                    borderRadius: isMe ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                    background: isMe ? MINT : 'white',
                    color: isMe ? 'white' : INK,
                    fontSize: '14px',
                    lineHeight: 1.5,
                    fontWeight: 600,
                    boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
                    opacity: msg.sending ? 0.7 : 1,
                    transition: 'opacity 0.3s'
                  }}>
                    {msg.text}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '10px', color: MUTED, fontWeight: 700 }}>{msg.time}</span>
                    <SpeakButton id={msg.id} text={msg.text} locale={locale} color={MUTED} />
                    {isMe && (
                      msg.sending
                        ? <Clock size={10} color={MUTED} />
                        : msg.read
                          ? <CheckCheck size={12} color={MINT} />
                          : <Check size={12} color={MUTED} />
                    )}
                    {!isMe && (
                      <button onClick={() => setReportTarget({ type: 'message', id: msg.id })}
                        title="Report this message"
                        style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', opacity: 0.5 }}>
                        <Flag size={10} color={MUTED} />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )
          })}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick replies */}
        {showQuickReplies && (
          <div style={{ background: 'white', borderTop: '1px solid #e2eae6', padding: '10px 16px', display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            {QUICK_REPLIES.map(qr => (
              <button key={qr} onClick={() => setDraft(qr)}
                style={{ padding: '6px 12px', borderRadius: '100px', border: `1px solid ${MINT}`, background: '#f0fdf9', color: MINT, fontSize: '12px', fontWeight: 700, cursor: 'pointer', fontFamily: FONT }}>
                {qr}
              </button>
            ))}
          </div>
        )}

        {/* Emoji picker */}
        {emojiOpen && (
          <div style={{ background: 'white', borderTop: '1px solid #e2eae6', padding: '10px 16px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {EMOJIS.map(e => (
              <button key={e} onClick={() => setDraft(d => d + e)}
                style={{ fontSize: '22px', background: 'none', border: 'none', cursor: 'pointer', padding: '4px', borderRadius: '8px', lineHeight: 1 }}
                onMouseEnter={ev => ev.currentTarget.style.background = SURFACE}
                onMouseLeave={ev => ev.currentTarget.style.background = 'none'}
              >{e}</button>
            ))}
          </div>
        )}

        {/* Composer */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 16px', borderTop: '1px solid #e2eae6', background: 'white' }}>
          <button onClick={() => { setShowQuickReplies(!showQuickReplies); setEmojiOpen(false) }}
            style={{ width: '36px', height: '36px', borderRadius: '10px', border: '1px solid #e2eae6', background: showQuickReplies ? MINT : SURFACE, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Smile size={16} color={showQuickReplies ? 'white' : MUTED} />
          </button>
          <button onClick={() => { setEmojiOpen(!emojiOpen); setShowQuickReplies(false) }}
            style={{ width: '36px', height: '36px', borderRadius: '10px', border: '1px solid #e2eae6', background: emojiOpen ? MINT : SURFACE, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Paperclip size={16} color={emojiOpen ? 'white' : MUTED} />
          </button>
          <input ref={inputRef} value={draft} onChange={e => setDraft(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage() } }}
            placeholder="Type a message..."
            style={{ flex: 1, padding: '11px 16px', borderRadius: '100px', border: '1.5px solid #e2eae6', outline: 'none', fontSize: '14px', fontFamily: FONT, fontWeight: 600, color: INK, background: SURFACE, transition: 'border-color 0.2s' }}
            onFocus={e => e.target.style.borderColor = MINT}
            onBlur={e => e.target.style.borderColor = '#e2eae6'}
          />
          <button onClick={sendMessage} className="send-btn"
            style={{ width: '42px', height: '42px', borderRadius: '50%', border: 'none', background: draft.trim() ? MINT : '#e2eae6', cursor: draft.trim() ? 'pointer' : 'not-allowed', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'all 0.2s', boxShadow: draft.trim() ? `0 4px 12px rgba(34,212,168,0.35)` : 'none' }}>
            <Send size={17} color={draft.trim() ? 'white' : MUTED} style={{ marginLeft: '2px' }} />
          </button>
        </div>
        </>
        )}
      </div>
      {reportTarget && (
        <ReportModal targetType={reportTarget.type} targetId={reportTarget.id} open={true} onClose={() => setReportTarget(null)} />
      )}
      {reviewTarget && (
        <ReviewModal revieweeId={reviewTarget} open={true} onClose={() => setReviewTarget(null)} />
      )}
    </div>
  )
}
