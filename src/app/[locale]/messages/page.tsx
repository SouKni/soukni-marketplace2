'use client'

import { useState, use } from 'react'
import { Search, Send, MoreVertical, Check, CheckCheck, Image as ImageIcon, Phone, MapPin } from 'lucide-react'

type Locale = 'en' | 'fr' | 'ar' | 'es' | 'de'

const CONVERSATIONS = [
  {
    id: 1, name: 'Sara Bennani', initials: 'SB', online: true,
    listingTitle: 'iPhone 15 Pro Max 256GB', listingImage: 'https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&w=200', listingPrice: '12,500 MAD',
    lastMessage: 'Is this still available? Can we meet tomorrow?', lastTime: '2m', unread: 2,
    messages: [
      { from: 'them', text: 'Hi! Is this iPhone still available?', time: '10:24 AM' },
      { from: 'me', text: 'Yes, still available! It\'s in mint condition.', time: '10:26 AM' },
      { from: 'them', text: 'Great! Can you do 11,800 MAD?', time: '10:30 AM' },
      { from: 'me', text: 'I can do 12,000 MAD final price, includes original box and charger.', time: '10:32 AM' },
      { from: 'them', text: 'Is this still available? Can we meet tomorrow?', time: '10:45 AM' },
    ]
  },
  {
    id: 2, name: 'Karim Othmani', initials: 'KO', online: false,
    listingTitle: 'MacBook Pro 14" M3', listingImage: 'https://images.pexels.com/photos/1229861/pexels-photo-1229861.jpeg?auto=compress&w=200', listingPrice: '24,800 MAD',
    lastMessage: 'Thanks for the quick reply 👍', lastTime: '1h', unread: 0,
    messages: [
      { from: 'them', text: 'What\'s the battery health on this?', time: '9:10 AM' },
      { from: 'me', text: '96% battery health, barely used.', time: '9:15 AM' },
      { from: 'them', text: 'Thanks for the quick reply 👍', time: '9:18 AM' },
    ]
  },
  {
    id: 3, name: 'Nadia El Fassi', initials: 'NF', online: true,
    listingTitle: 'Samsung Galaxy Watch 6', listingImage: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&w=200', listingPrice: '2,900 MAD',
    lastMessage: 'Perfect, see you at 3pm at Agdal mall', lastTime: '3h', unread: 0,
    messages: [
      { from: 'them', text: 'Hi, where can we meet?', time: '8:00 AM' },
      { from: 'me', text: 'Agdal mall works for me, near the main entrance', time: '8:05 AM' },
      { from: 'them', text: 'Perfect, see you at 3pm at Agdal mall', time: '8:06 AM' },
    ]
  },
  {
    id: 4, name: 'Yassine Marrakchi', initials: 'YM', online: false,
    listingTitle: 'Sony WH-1000XM5', listingImage: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&w=200', listingPrice: '3,400 MAD',
    lastMessage: 'Deal! I\'ll take it', lastTime: '1d', unread: 0,
    messages: [
      { from: 'them', text: 'Last price?', time: 'Yesterday' },
      { from: 'me', text: '3,200 MAD final, comes with the case', time: 'Yesterday' },
      { from: 'them', text: 'Deal! I\'ll take it', time: 'Yesterday' },
    ]
  },
]

export default function MessagesPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = use(params)
  const [activeId, setActiveId] = useState(CONVERSATIONS[0].id)
  const [draft, setDraft] = useState('')
  const [search, setSearch] = useState('')

  const active = CONVERSATIONS.find(c => c.id === activeId)!
  const filtered = CONVERSATIONS.filter(c => c.name.toLowerCase().includes(search.toLowerCase()))

  const [localMessages, setLocalMessages] = useState(active.messages)

  const handleSend = () => {
    if (!draft.trim()) return
    setLocalMessages(prev => [...prev, { from: 'me', text: draft, time: 'Now' }])
    setDraft('')
  }

  const switchConvo = (id: number) => {
    setActiveId(id)
    setLocalMessages(CONVERSATIONS.find(c => c.id === id)!.messages)
  }

  return (
    <div style={{ background: '#f4fbf8', minHeight: '100vh', fontFamily: 'Hanken Grotesk, Inter, system-ui, sans-serif' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px' }}>

        <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#161d1b', marginBottom: '20px', letterSpacing: '-0.02em' }}>Messages</h1>

        <div style={{ display: 'grid', gridTemplateColumns: '340px 1fr', height: '640px', background: 'white', borderRadius: '24px', border: '1px solid #e2eae6', overflow: 'hidden', boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>

          {/* CONVERSATIONS LIST */}
          <div style={{ borderRight: '1px solid #e2eae6', display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '16px', borderBottom: '1px solid #e2eae6' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#f4fbf8', borderRadius: '12px', padding: '0 14px', height: '40px' }}>
                <Search size={15} color="#6b7a76" />
                <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search conversations..."
                  style={{ flex: 1, border: 'none', background: 'transparent', outline: 'none', fontSize: '13px', fontFamily: 'inherit', color: '#161d1b' }} />
              </div>
            </div>

            <div style={{ flex: 1, overflowY: 'auto' }}>
              {filtered.map(c => (
                <button key={c.id} onClick={() => switchConvo(c.id)}
                  style={{ width: '100%', display: 'flex', gap: '12px', padding: '14px 16px', border: 'none', borderBottom: '1px solid #f4fbf8', cursor: 'pointer', textAlign: 'left', fontFamily: 'inherit', background: activeId === c.id ? '#f0fdf9' : 'white', transition: 'background 0.15s' }}
                >
                  <div style={{ position: 'relative', flexShrink: 0 }}>
                    <div style={{ width: '46px', height: '46px', borderRadius: '50%', background: 'linear-gradient(135deg, #22d4a8, #0f9b8e)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span style={{ color: 'white', fontWeight: 700, fontSize: '14px' }}>{c.initials}</span>
                    </div>
                    {c.online && <div style={{ position: 'absolute', bottom: 0, right: 0, width: '12px', height: '12px', borderRadius: '50%', background: '#22d4a8', border: '2px solid white' }} />}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2px' }}>
                      <p style={{ fontSize: '13px', fontWeight: 700, color: '#161d1b' }}>{c.name}</p>
                      <span style={{ fontSize: '11px', color: '#6b7a76' }}>{c.lastTime}</span>
                    </div>
                    <p style={{ fontSize: '12px', color: c.unread > 0 ? '#161d1b' : '#6b7a76', fontWeight: c.unread > 0 ? 600 : 400, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', marginBottom: '4px' }}>{c.lastMessage}</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <p style={{ fontSize: '11px', color: '#6b7a76', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>📦 {c.listingTitle}</p>
                      {c.unread > 0 && (
                        <span style={{ background: '#22d4a8', color: 'white', fontSize: '10px', fontWeight: 700, borderRadius: '100px', minWidth: '16px', height: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, padding: '0 4px' }}>{c.unread}</span>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* ACTIVE CHAT */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>

            {/* Chat header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 20px', borderBottom: '1px solid #e2eae6' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, #22d4a8, #0f9b8e)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ color: 'white', fontWeight: 700, fontSize: '13px' }}>{active.initials}</span>
                </div>
                <div>
                  <p style={{ fontSize: '14px', fontWeight: 700, color: '#161d1b' }}>{active.name}</p>
                  <p style={{ fontSize: '11px', color: active.online ? '#22d4a8' : '#6b7a76', fontWeight: 600 }}>{active.online ? '● Online' : 'Offline'}</p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button style={{ width: '36px', height: '36px', borderRadius: '10px', border: '1px solid #e2eae6', background: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Phone size={15} color="#6b7a76" />
                </button>
                <button style={{ width: '36px', height: '36px', borderRadius: '10px', border: '1px solid #e2eae6', background: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <MoreVertical size={15} color="#6b7a76" />
                </button>
              </div>
            </div>

            {/* Listing context strip */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 20px', background: '#f4fbf8', borderBottom: '1px solid #e2eae6' }}>
              <img src={active.listingImage} alt="" style={{ width: '36px', height: '36px', borderRadius: '8px', objectFit: 'cover' }} />
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: '12px', fontWeight: 700, color: '#161d1b' }}>{active.listingTitle}</p>
                <p style={{ fontSize: '12px', fontWeight: 700, color: '#22d4a8' }}>{active.listingPrice}</p>
              </div>
              <button style={{ fontSize: '11px', fontWeight: 700, color: '#22d4a8', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>View Ad</button>
            </div>

            {/* Messages */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {localMessages.map((m, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: m.from === 'me' ? 'flex-end' : 'flex-start' }}>
                  <div style={{ maxWidth: '70%', display: 'flex', flexDirection: 'column', alignItems: m.from === 'me' ? 'flex-end' : 'flex-start' }}>
                    <div style={{
                      padding: '10px 14px', borderRadius: m.from === 'me' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                      background: m.from === 'me' ? '#22d4a8' : '#f4fbf8', color: m.from === 'me' ? 'white' : '#161d1b',
                      fontSize: '13px', lineHeight: 1.5
                    }}>
                      {m.text}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
                      <span style={{ fontSize: '10px', color: '#6b7a76' }}>{m.time}</span>
                      {m.from === 'me' && <CheckCheck size={12} color="#22d4a8" />}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Composer */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '14px 20px', borderTop: '1px solid #e2eae6' }}>
              <button style={{ width: '38px', height: '38px', borderRadius: '10px', border: '1px solid #e2eae6', background: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <ImageIcon size={16} color="#6b7a76" />
              </button>
              <input
                value={draft} onChange={e => setDraft(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSend()}
                placeholder="Type a message..."
                style={{ flex: 1, padding: '11px 16px', borderRadius: '100px', border: '1.5px solid #e2eae6', outline: 'none', fontSize: '13px', fontFamily: 'inherit', color: '#161d1b' }}
              />
              <button onClick={handleSend}
                style={{ width: '38px', height: '38px', borderRadius: '10px', border: 'none', background: '#22d4a8', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Send size={15} color="white" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
