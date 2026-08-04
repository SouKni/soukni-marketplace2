'use client'

import { useState, use, useRef, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { Search, Send, MoreVertical, Check, CheckCheck, Image as ImageIcon, Phone, MapPin, X, Smile, Paperclip, ArrowLeft, Bell, BellOff, Circle, Clock, Shield, Flag, Trash2, Archive, Star } from 'lucide-react'

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
  id: number
  name: string
  initials: string
  online: boolean
  lastSeen: string
  listingTitle: string
  listingImage: string
  listingPrice: string
  listingId: number
  lastMessage: string
  lastTime: string
  unread: number
  muted: boolean
  starred: boolean
  messages: Message[]
}

const INITIAL_CONVERSATIONS: Conversation[] = [
  {
    id: 1, name: 'Sara Bennani', initials: 'SB', online: true, lastSeen: 'now',
    listingTitle: 'iPhone 15 Pro Max 256GB', listingImage: 'https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&w=200', listingPrice: '12,500 MAD', listingId: 1,
    lastMessage: 'Is this still available? Can we meet tomorrow?', lastTime: '2m', unread: 2, muted: false, starred: true,
    messages: [
      { id: '1', from: 'them', text: 'Hi! Is this iPhone still available?', time: '10:24 AM', read: true },
      { id: '2', from: 'me', text: "Yes still available! It's in mint condition.", time: '10:26 AM', read: true },
      { id: '3', from: 'them', text: 'Great! Can you do 11,800 MAD?', time: '10:30 AM', read: true },
      { id: '4', from: 'me', text: 'I can do 12,000 MAD final. Comes with original box and charger.', time: '10:32 AM', read: true },
      { id: '5', from: 'them', text: 'Is this still available? Can we meet tomorrow?', time: '10:45 AM', read: false },
    ]
  },
  {
    id: 2, name: 'Karim Othmani', initials: 'KO', online: false, lastSeen: '2 hours ago',
    listingTitle: 'MacBook Pro 14" M3', listingImage: 'https://images.pexels.com/photos/1229861/pexels-photo-1229861.jpeg?auto=compress&w=200', listingPrice: '24,800 MAD', listingId: 2,
    lastMessage: "Thanks for the quick reply 👍", lastTime: '1h', unread: 0, muted: false, starred: false,
    messages: [
      { id: '1', from: 'them', text: "What's the battery health on this?", time: '9:10 AM', read: true },
      { id: '2', from: 'me', text: '96% battery health, barely used.', time: '9:15 AM', read: true },
      { id: '3', from: 'them', text: "Thanks for the quick reply 👍", time: '9:18 AM', read: true },
    ]
  },
  {
    id: 3, name: 'Nadia El Fassi', initials: 'NF', online: true, lastSeen: 'now',
    listingTitle: 'Samsung Galaxy Watch 6', listingImage: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&w=200', listingPrice: '2,900 MAD', listingId: 3,
    lastMessage: 'Perfect, see you at 3pm at Agdal mall', lastTime: '3h', unread: 0, muted: true, starred: false,
    messages: [
      { id: '1', from: 'them', text: 'Hi, where can we meet?', time: '8:00 AM', read: true },
      { id: '2', from: 'me', text: 'Agdal mall works for me, near the main entrance', time: '8:05 AM', read: true },
      { id: '3', from: 'them', text: 'Perfect, see you at 3pm at Agdal mall', time: '8:06 AM', read: true },
    ]
  },
  {
    id: 4, name: 'Yassine Marrakchi', initials: 'YM', online: false, lastSeen: 'yesterday',
    listingTitle: 'Sony WH-1000XM5', listingImage: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&w=200', listingPrice: '3,400 MAD', listingId: 4,
    lastMessage: "Deal! I'll take it", lastTime: '1d', unread: 0, muted: false, starred: false,
    messages: [
      { id: '1', from: 'them', text: 'Last price?', time: 'Yesterday', read: true },
      { id: '2', from: 'me', text: '3,200 MAD final, comes with the case', time: 'Yesterday', read: true },
      { id: '3', from: 'them', text: "Deal! I'll take it", time: 'Yesterday', read: true },
    ]
  },
]

const QUICK_REPLIES = [
  'Is this still available?',
  'Can you do a lower price?',
  'Where can we meet?',
  'What condition is it in?',
  'Can I see more photos?',
  'I can come today',
]

export default function MessagesPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = use(params)
  const messagesEndRef  = useRef<HTMLDivElement>(null)
  const inputRef        = useRef<HTMLInputElement>(null)

  const [conversations, setConversations] = useState<Conversation[]>(INITIAL_CONVERSATIONS)
  const [activeId, setActiveId]           = useState<number>(1)
  const [draft, setDraft]                 = useState('')
  const [search, setSearch]               = useState('')
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(null)
  const [theyTyping, setTheyTyping]       = useState(false)
  const [showMenu, setShowMenu]           = useState(false)
  const [showQuickReplies, setShowQuickReplies] = useState(false)
  const [showMobileChat, setShowMobileChat] = useState(false)
  const [emojiOpen, setEmojiOpen]         = useState(false)

  const EMOJIS = ['😊','👍','❤️','🙏','✅','😂','🔥','💯','👋','🤝','💰','📦']

  const active = conversations.find(c => c.id === activeId)!

  const filtered = conversations.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.listingTitle.toLowerCase().includes(search.toLowerCase())
  )

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [active?.messages, theyTyping])

  // Mark messages as read when switching conversations
  useEffect(() => {
    setConversations(prev => prev.map(c =>
      c.id === activeId
        ? { ...c, unread: 0, messages: c.messages.map(m => ({ ...m, read: true })) }
        : c
    ))
  }, [activeId])

  // Simulate "they are typing" when user types
  const handleDraftChange = (val: string) => {
    setDraft(val)
    if (typingTimeout) clearTimeout(typingTimeout)
    // Simulate reply typing after user sends
  }

  const sendMessage = useCallback(() => {
    if (!draft.trim()) return
    const newMsg: Message = {
      id: Date.now().toString(),
      from: 'me',
      text: draft.trim(),
      time: new Date().toLocaleTimeString('en', { hour: '2-digit', minute: '2-digit' }),
      read: false,
      sending: true,
    }

    // Optimistic update
    setConversations(prev => prev.map(c =>
      c.id === activeId
        ? { ...c, messages: [...c.messages, newMsg], lastMessage: draft.trim(), lastTime: 'now' }
        : c
    ))
    setDraft('')
    setShowQuickReplies(false)
    setEmojiOpen(false)

    // Simulate "sent" confirmation after 500ms
    setTimeout(() => {
      setConversations(prev => prev.map(c =>
        c.id === activeId
          ? { ...c, messages: c.messages.map(m => m.id === newMsg.id ? { ...m, sending: false } : m) }
          : c
      ))
    }, 500)

    // Simulate "they are typing" after 1.5s
    setTimeout(() => setTheyTyping(true), 1500)

    // Simulate reply after 3s
    setTimeout(() => {
      setTheyTyping(false)
      const replies = [
        'Got it, thanks!',
        'Sounds good! When are you available?',
        'Can we meet in Agdal?',
        'OK perfect 👍',
        'Let me check and get back to you',
        'That works for me!',
      ]
      const reply: Message = {
        id: (Date.now() + 1).toString(),
        from: 'them',
        text: replies[Math.floor(Math.random() * replies.length)],
        time: new Date().toLocaleTimeString('en', { hour: '2-digit', minute: '2-digit' }),
        read: false,
      }
      setConversations(prev => prev.map(c =>
        c.id === activeId
          ? { ...c, messages: [...c.messages, reply], lastMessage: reply.text, lastTime: 'now', unread: 0 }
          : c
      ))
    }, 3000)
  }, [draft, activeId])

  const switchConvo = (id: number) => {
    setActiveId(id)
    setShowMobileChat(true)
    setTheyTyping(false)
    setDraft('')
    setShowQuickReplies(false)
    inputRef.current?.focus()
  }

  const toggleMute = (id: number) => {
    setConversations(prev => prev.map(c => c.id === id ? { ...c, muted: !c.muted } : c))
    setShowMenu(false)
  }

  const toggleStar = (id: number) => {
    setConversations(prev => prev.map(c => c.id === id ? { ...c, starred: !c.starred } : c))
  }

  const deleteConvo = (id: number) => {
    setConversations(prev => prev.filter(c => c.id !== id))
    if (activeId === id && conversations.length > 1) {
      setActiveId(conversations.find(c => c.id !== id)?.id || 0)
    }
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
                    { icon: <Star size={14} />, label: active.starred ? 'Unstar' : 'Star Conversation', action: () => { toggleStar(activeId); setShowMenu(false) } },
                    { icon: active.muted ? <Bell size={14} /> : <BellOff size={14} />, label: active.muted ? 'Unmute' : 'Mute Notifications', action: () => toggleMute(activeId) },
                    { icon: <Shield size={14} />, label: 'Block & Report', action: () => setShowMenu(false), danger: false },
                    { icon: <Trash2 size={14} />, label: 'Delete Conversation', action: () => deleteConvo(activeId), danger: true },
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

          {active.messages.map((msg, i) => {
            const isMe   = msg.from === 'me'
            const showAvatar = !isMe && (i === 0 || active.messages[i-1].from !== 'them')
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
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span style={{ fontSize: '10px', color: MUTED, fontWeight: 700 }}>{msg.time}</span>
                    {isMe && (
                      msg.sending
                        ? <Clock size={10} color={MUTED} />
                        : msg.read
                          ? <CheckCheck size={12} color={MINT} />
                          : <Check size={12} color={MUTED} />
                    )}
                  </div>
                </div>
              </div>
            )
          })}

          {/* Typing indicator */}
          {theyTyping && (
            <div className="msg-bubble" style={{ display: 'flex', alignItems: 'flex-end', gap: '8px' }}>
              <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: `linear-gradient(135deg, ${MINT}, #0f9b8e)`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span style={{ color: 'white', fontWeight: 900, fontSize: '10px' }}>{active.initials}</span>
              </div>
              <div style={{ padding: '12px 18px', borderRadius: '18px 18px 18px 4px', background: 'white', boxShadow: '0 1px 4px rgba(0,0,0,0.06)', display: 'flex', gap: '4px', alignItems: 'center' }}>
                {[0,1,2].map(i => (
                  <span key={i} className="typing-dot" style={{ width: '7px', height: '7px', borderRadius: '50%', background: MUTED, display: 'inline-block', animationDelay: `${i * 0.2}s` }} />
                ))}
              </div>
            </div>
          )}

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
          <input ref={inputRef} value={draft} onChange={e => handleDraftChange(e.target.value)}
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
      </div>
    </div>
  )
}
