'use client'

import { useState, use } from 'react'
import Link from 'next/link'
import Breadcrumb from '@/components/ui/Breadcrumb'
import {
  Heart, MessageCircle, Share2, Bookmark, TrendingUp,
  MapPin, Star, Zap, Search, Bell, Plus, MoreHorizontal,
  ChevronRight, Sparkles, Users, ShoppingBag, Eye
} from 'lucide-react'

type Locale = 'en' | 'fr' | 'ar' | 'es' | 'de'

const MINT    = '#22d4a8'
const CREAM   = '#f5ede0'
const SURFACE = '#f4fbf8'
const INK     = '#161d1b'
const MUTED   = '#6b7a76'
const FONT    = "'Inter', system-ui, sans-serif"

type PostType = 'listing' | 'deal_alert' | 'sold' | 'community' | 'ai_pick'

type Post = {
  id:        string
  type:      PostType
  user:      { name: string; initials: string; badge: string | null; city: string; followers: number }
  content:   string
  listing?:  { title: string; price: string; image: string; id: string; category: string }
  tags:      string[]
  likes:     number
  comments:  number
  shares:    number
  saves:     number
  time:      string
  pinned?:   boolean
  aiPick?:   boolean
  dealAlert?: boolean
}

const FEED: Post[] = [
  {
    id: '1', type: 'ai_pick',
    user: { name: 'SouKni AI', initials: '🤖', badge: 'ai', city: 'Morocco', followers: 0 },
    content: "🔥 Today's hottest deal in Electronics — this iPhone 15 Pro Max is 2,000 MAD below market average and the seller has a 4.9 rating with 247 reviews. Won't last long!",
    listing: { title: 'iPhone 15 Pro Max 256GB', price: '12,500 MAD', image: 'https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&w=400', id: '1', category: 'Electronics' },
    tags: ['HotDeal', 'Electronics', 'iPhone'],
    likes: 234, comments: 47, shares: 89, saves: 156, time: '2 minutes ago', aiPick: true
  },
  {
    id: '2', type: 'listing',
    user: { name: 'Youssef Alami', initials: 'YA', badge: 'diamond', city: 'Rabat', followers: 1240 },
    content: "Just listed my BMW M4 Competition! Full options, only 12,000km, one owner. Serious buyers only please 🙏 Price is negotiable for quick sale.",
    listing: { title: 'BMW M4 Competition 2023', price: '785,000 MAD', image: 'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&w=400', id: '2', category: 'Motors' },
    tags: ['BMW', 'Motors', 'Rabat', 'LuxuryCars'],
    likes: 189, comments: 34, shares: 56, saves: 78, time: '15 minutes ago'
  },
  {
    id: '3', type: 'sold',
    user: { name: 'Sara Bennani', initials: 'SB', badge: 'certified', city: 'Casablanca', followers: 567 },
    content: "✅ SOLD in 3 hours! My MacBook Pro M3 found its new owner. Thank you SouKni community and the AI pricing tool that helped me price it right! 🎉",
    listing: { title: 'MacBook Pro 14" M3', price: '24,800 MAD', image: 'https://images.pexels.com/photos/1229861/pexels-photo-1229861.jpeg?auto=compress&w=400', id: '3', category: 'Electronics' },
    tags: ['Sold', 'SouKniWins', 'MacBook'],
    likes: 456, comments: 89, shares: 123, saves: 0, time: '1 hour ago'
  },
  {
    id: '4', type: 'community',
    user: { name: 'Karim Othmani', initials: 'KO', badge: null, city: 'Marrakech', followers: 234 },
    content: "Question for the community 🙋‍♂️ — is it better to sell my car privately on SouKni or go through a dealer? I have a 2021 Dacia Duster with 45k km. Heard you get 15-20% more selling private but takes longer. Thoughts?",
    tags: ['CarSelling', 'Advice', 'Community'],
    likes: 78, comments: 145, shares: 34, saves: 12, time: '2 hours ago'
  },
  {
    id: '5', type: 'deal_alert',
    user: { name: 'SouKni Deals', initials: '🔔', badge: 'ai', city: 'Morocco', followers: 0 },
    content: "💰 PRICE DROP ALERT — Patek Philippe Nautilus in Casablanca just dropped 50,000 MAD! Now at 1,800,000 MAD. Our AI says this is the best price in Morocco right now.",
    listing: { title: 'Patek Philippe Nautilus 5711', price: '1,800,000 MAD', image: 'https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&w=400', id: '5', category: 'The Vault' },
    tags: ['PriceDrop', 'TheVault', 'LuxuryWatch'],
    likes: 567, comments: 234, shares: 456, saves: 789, time: '3 hours ago', dealAlert: true
  },
  {
    id: '6', type: 'community',
    user: { name: 'Nadia El Fassi', initials: 'NF', badge: 'certified', city: 'Fès', followers: 892 },
    content: "Tips for buying a used car in Morocco 🚗\n\n1. Always check the carte grise history\n2. Take it to a mécanicien you trust before buying\n3. Check for accident history at the prefecture\n4. Never pay more than 30% deposit before paperwork\n5. Use SouKni Escrow for protection ✅\n\nSave this! You'll thank me later 🙏",
    tags: ['CarBuyingTips', 'Morocco', 'CarAdvice', 'Community'],
    likes: 1234, comments: 567, shares: 890, saves: 2341, time: '5 hours ago', pinned: true
  },
]

const TRENDING = ['#iPhone15', '#BMWMaroc', '#Appartement Rabat', '#Dacia', '#MacBook', '#SouKniDeals']

const STORIES = [
  { name: 'Your Story', initials: '+', bg: MINT, isAdd: true },
  { name: 'Youssef', initials: 'YA', bg: '#0891b2', badge: 'diamond' },
  { name: 'Sara', initials: 'SB', bg: '#7c3aed', badge: 'certified' },
  { name: 'Karim', initials: 'KO', bg: '#ea580c', badge: null },
  { name: 'Nadia', initials: 'NF', bg: '#0f9b8e', badge: 'certified' },
  { name: 'Hassan', initials: 'HI', bg: '#dc2626', badge: 'diamond' },
]

export default function FeedPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = use(params)
  const [liked, setLiked]   = useState<string[]>([])
  const [saved, setSaved]   = useState<string[]>([])
  const [feed, setFeed]     = useState<Post[]>(FEED)
  const [activeTab, setActiveTab] = useState<'forYou' | 'following' | 'nearby' | 'trending'>('forYou')
  const [composing, setComposing] = useState(false)
  const [postText, setPostText]   = useState('')

  const toggleLike = (id: string) => {
    setLiked(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id])
    setFeed(prev => prev.map(p => p.id === id ? { ...p, likes: p.likes + (liked.includes(id) ? -1 : 1) } : p))
  }

  const toggleSave = (id: string) =>
    setSaved(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id])

  const PostCard = ({ post }: { post: Post }) => {
    const isLiked = liked.includes(post.id)
    const isSaved = saved.includes(post.id)

    const badgeStyle = post.type === 'ai_pick' || post.user.badge === 'ai'
      ? { bg: '#f0fdf9', color: MINT, label: '🤖 AI' }
      : post.user.badge === 'diamond'
      ? { bg: '#e0f2fe', color: '#0891b2', label: '💎 Diamond' }
      : post.user.badge === 'certified'
      ? { bg: '#f0fdf9', color: MINT, label: '✓ Certified' }
      : null

    return (
      <div style={{ background: 'white', borderRadius: '20px', border: '1px solid #e2eae6', overflow: 'hidden', marginBottom: '12px' }}>

        {/* Pinned/AI badge */}
        {(post.pinned || post.aiPick || post.dealAlert) && (
          <div style={{ padding: '8px 16px', background: post.aiPick ? `linear-gradient(90deg, ${MINT}, #0f9b8e)` : post.dealAlert ? '#ef4444' : INK, display: 'flex', alignItems: 'center', gap: '6px' }}>
            {post.aiPick  && <Sparkles size={12} color="white" />}
            {post.dealAlert && <Zap size={12} color="white" />}
            {post.pinned  && <TrendingUp size={12} color="white" />}
            <span style={{ fontSize: '11px', fontWeight: 900, color: 'white' }}>
              {post.aiPick ? "AI Pick of the Day" : post.dealAlert ? "🔥 Price Drop Alert" : "📌 Community Guide"}
            </span>
          </div>
        )}

        <div style={{ padding: '16px' }}>
          {/* User header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: post.type === 'ai_pick' || post.type === 'deal_alert' ? `linear-gradient(135deg, ${MINT}, #0f9b8e)` : `linear-gradient(135deg, #${Math.floor(Math.random()*0xffffff).toString(16).padStart(6,'0')}, #${Math.floor(Math.random()*0xffffff).toString(16).padStart(6,'0')})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', flexShrink: 0 }}>
                {typeof post.user.initials === 'string' && post.user.initials.length <= 2
                  ? <span style={{ color: 'white', fontWeight: 900, fontSize: '14px' }}>{post.user.initials}</span>
                  : <span style={{ fontSize: '18px' }}>{post.user.initials}</span>
                }
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <p style={{ fontSize: '14px', fontWeight: 900, color: INK }}>{post.user.name}</p>
                  {badgeStyle && (
                    <span style={{ fontSize: '10px', fontWeight: 900, padding: '2px 7px', borderRadius: '100px', background: badgeStyle.bg, color: badgeStyle.color }}>
                      {badgeStyle.label}
                    </span>
                  )}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <MapPin size={10} color={MUTED} />
                  <span style={{ fontSize: '11px', color: MUTED, fontWeight: 700 }}>{post.user.city}</span>
                  <span style={{ fontSize: '11px', color: '#e2eae6' }}>·</span>
                  <span style={{ fontSize: '11px', color: MUTED, fontWeight: 700 }}>{post.time}</span>
                </div>
              </div>
            </div>
            <button style={{ width: '32px', height: '32px', borderRadius: '50%', border: 'none', background: SURFACE, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <MoreHorizontal size={16} color={MUTED} />
            </button>
          </div>

          {/* Content */}
          <p style={{ fontSize: '14px', color: INK, lineHeight: 1.6, fontWeight: 600, marginBottom: '12px', whiteSpace: 'pre-line' }}>{post.content}</p>

          {/* Listing card */}
          {post.listing && (
            <Link href={`/${locale}/listing/${post.listing.id}`} style={{ textDecoration: 'none', display: 'block', marginBottom: '12px' }}>
              <div style={{ borderRadius: '14px', overflow: 'hidden', border: '1px solid #e2eae6', display: 'flex', transition: 'border-color 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.borderColor = MINT}
                onMouseLeave={e => e.currentTarget.style.borderColor = '#e2eae6'}>
                <img src={post.listing.image} alt="" style={{ width: '100px', height: '80px', objectFit: 'cover', flexShrink: 0 }} />
                <div style={{ padding: '10px 14px', flex: 1 }}>
                  <p style={{ fontSize: '11px', color: MUTED, fontWeight: 700, marginBottom: '2px' }}>{post.listing.category}</p>
                  <p style={{ fontSize: '13px', fontWeight: 900, color: INK, marginBottom: '4px', lineHeight: 1.3 }}>{post.listing.title}</p>
                  <p style={{ fontSize: '15px', fontWeight: 900, color: MINT }}>{post.listing.price}</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', padding: '0 12px', flexShrink: 0 }}>
                  <ChevronRight size={16} color={MUTED} />
                </div>
              </div>
            </Link>
          )}

          {/* Tags */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '12px' }}>
            {post.tags.map(tag => (
              <span key={tag} style={{ fontSize: '12px', fontWeight: 900, color: MINT, cursor: 'pointer' }}>#{tag}</span>
            ))}
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', alignItems: 'center', paddingTop: '10px', borderTop: '1px solid #f4fbf8' }}>
            {[
              {
                icon: <Heart size={18} fill={isLiked ? '#ef4444' : 'none'} color={isLiked ? '#ef4444' : MUTED} />,
                count: post.likes + (isLiked && !liked.includes(post.id) ? 0 : 0),
                action: () => toggleLike(post.id),
                active: isLiked,
                color: '#ef4444'
              },
              { icon: <MessageCircle size={18} color={MUTED} />, count: post.comments, action: () => {}, active: false, color: '#0891b2' },
              { icon: <Share2 size={18} color={MUTED} />, count: post.shares, action: () => {}, active: false, color: '#7c3aed' },
            ].map((btn, i) => (
              <button key={i} onClick={btn.action}
                style={{ display: 'flex', alignItems: 'center', gap: '5px', flex: 1, justifyContent: 'center', padding: '6px', borderRadius: '10px', border: 'none', background: 'none', cursor: 'pointer', fontFamily: FONT, transition: 'background 0.15s' }}
                onMouseEnter={e => e.currentTarget.style.background = SURFACE}
                onMouseLeave={e => e.currentTarget.style.background = 'none'}
              >
                {btn.icon}
                <span style={{ fontSize: '13px', fontWeight: 700, color: MUTED }}>{btn.count.toLocaleString()}</span>
              </button>
            ))}
            <button onClick={() => toggleSave(post.id)}
              style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: '6px 10px', borderRadius: '10px', border: 'none', background: 'none', cursor: 'pointer', transition: 'background 0.15s' }}
              onMouseEnter={e => e.currentTarget.style.background = SURFACE}
              onMouseLeave={e => e.currentTarget.style.background = 'none'}
            >
              <Bookmark size={18} fill={isSaved ? MINT : 'none'} color={isSaved ? MINT : MUTED} />
              <span style={{ fontSize: '13px', fontWeight: 700, color: MUTED }}>{post.saves}</span>
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={{ background: SURFACE, minHeight: '100vh', fontFamily: FONT }}>
      <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.5}}`}</style>

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '24px', display: 'grid', gridTemplateColumns: '1fr 340px', gap: '24px' }}>

        {/* MAIN FEED */}
        <div>
          <Breadcrumb items={[{ label: 'Home', href: `/${locale}` }, { label: 'Community Feed' }]} style={{ marginBottom: 16, textTransform: 'none', fontSize: 13, letterSpacing: 'normal' }} />
          {/* Stories */}
          <div style={{ background: 'white', borderRadius: '20px', padding: '16px', border: '1px solid #e2eae6', marginBottom: '16px', overflowX: 'auto' }}>
            <div style={{ display: 'flex', gap: '14px', minWidth: 'max-content' }}>
              {STORIES.map((s, i) => (
                <button key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', background: 'none', border: 'none', cursor: 'pointer', fontFamily: FONT }}>
                  <div style={{ position: 'relative' }}>
                    <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: s.isAdd ? SURFACE : s.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', border: s.isAdd ? `2px dashed ${MINT}` : `3px solid ${MINT}` }}>
                      {s.isAdd
                        ? <Plus size={22} color={MINT} />
                        : <span style={{ color: 'white', fontWeight: 900, fontSize: '16px' }}>{s.initials}</span>
                      }
                    </div>
                    {s.badge === 'diamond' && <span style={{ position: 'absolute', bottom: '1px', right: '1px', fontSize: '12px' }}>💎</span>}
                    {s.badge === 'certified' && <span style={{ position: 'absolute', bottom: '1px', right: '1px', fontSize: '12px' }}>✓</span>}
                  </div>
                  <span style={{ fontSize: '11px', fontWeight: 700, color: INK, maxWidth: '56px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{s.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Compose */}
          <div style={{ background: 'white', borderRadius: '20px', padding: '16px', border: '1px solid #e2eae6', marginBottom: '16px' }}>
            {!composing ? (
              <button onClick={() => setComposing(true)}
                style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '12px', background: SURFACE, borderRadius: '100px', padding: '12px 16px', border: '1.5px solid #e2eae6', cursor: 'pointer', fontFamily: FONT }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: `linear-gradient(135deg, ${MINT}, #0f9b8e)`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <span style={{ color: 'white', fontWeight: 900, fontSize: '13px' }}>Y</span>
                </div>
                <span style={{ fontSize: '14px', color: MUTED, fontWeight: 700 }}>Share a deal, ask the community, or list an item...</span>
              </button>
            ) : (
              <div>
                <textarea value={postText} onChange={e => setPostText(e.target.value)}
                  placeholder="Share a deal, ask for advice, or let the community know about your listing..."
                  rows={4} autoFocus
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '14px', border: '1.5px solid #e2eae6', fontSize: '14px', fontFamily: FONT, fontWeight: 700, color: INK, background: SURFACE, outline: 'none', resize: 'none', lineHeight: 1.6, boxSizing: 'border-box', marginBottom: '12px' }}
                  onFocus={e => e.target.style.borderColor = MINT}
                  onBlur={e => e.target.style.borderColor = '#e2eae6'}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    {['📸 Photo', '🔗 Listing', '📍 Location'].map(btn => (
                      <button key={btn} style={{ padding: '6px 12px', borderRadius: '100px', border: '1px solid #e2eae6', background: 'white', fontSize: '12px', fontWeight: 700, color: MUTED, cursor: 'pointer', fontFamily: FONT }}>{btn}</button>
                    ))}
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button onClick={() => { setComposing(false); setPostText('') }}
                      style={{ padding: '8px 16px', borderRadius: '10px', border: '1px solid #e2eae6', background: 'white', fontSize: '13px', fontWeight: 900, color: MUTED, cursor: 'pointer', fontFamily: FONT }}>
                      Cancel
                    </button>
                    <button onClick={() => {
                      if (!postText.trim()) return
                      const newPost: Post = {
                        id: Date.now().toString(), type: 'community',
                        user: { name: 'You', initials: 'Y', badge: null, city: 'Rabat', followers: 0 },
                        content: postText, tags: [], likes: 0, comments: 0, shares: 0, saves: 0, time: 'Just now'
                      }
                      setFeed(prev => [newPost, ...prev])
                      setComposing(false); setPostText('')
                    }}
                      style={{ padding: '8px 20px', borderRadius: '10px', background: MINT, border: 'none', color: 'white', fontSize: '13px', fontWeight: 900, cursor: 'pointer', fontFamily: FONT }}>
                      Post
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Feed tabs */}
          <div style={{ display: 'flex', gap: '4px', background: 'white', padding: '4px', borderRadius: '14px', border: '1px solid #e2eae6', marginBottom: '16px' }}>
            {[
              { key: 'forYou', label: '✨ For You' },
              { key: 'following', label: '👥 Following' },
              { key: 'nearby', label: '📍 Nearby' },
              { key: 'trending', label: '🔥 Trending' },
            ].map(tab => (
              <button key={tab.key} onClick={() => setActiveTab(tab.key as any)}
                style={{ flex: 1, padding: '9px', borderRadius: '10px', border: 'none', cursor: 'pointer', fontSize: '12px', fontWeight: 900, fontFamily: FONT, background: activeTab === tab.key ? INK : 'transparent', color: activeTab === tab.key ? 'white' : MUTED, transition: 'all 0.15s' }}>
                {tab.label}
              </button>
            ))}
          </div>

          {/* Posts */}
          {feed.map(post => <PostCard key={post.id} post={post} />)}
        </div>

        {/* RIGHT SIDEBAR */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

          {/* Trending */}
          <div style={{ background: 'white', borderRadius: '20px', padding: '20px', border: '1px solid #e2eae6' }}>
            <h3 style={{ fontSize: '15px', fontWeight: 900, color: INK, letterSpacing: '-0.03em', marginBottom: '14px' }}>🔥 Trending in Morocco</h3>
            {TRENDING.map((tag, i) => (
              <div key={tag} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 0', borderBottom: i < TRENDING.length - 1 ? '1px solid #f4fbf8' : 'none', cursor: 'pointer' }}>
                <div>
                  <p style={{ fontSize: '11px', color: MUTED, fontWeight: 700, marginBottom: '1px' }}>Trending #{i + 1}</p>
                  <p style={{ fontSize: '13px', fontWeight: 900, color: MINT }}>{tag}</p>
                </div>
                <p style={{ fontSize: '11px', color: MUTED, fontWeight: 700 }}>{Math.floor(Math.random() * 9000 + 1000)} posts</p>
              </div>
            ))}
          </div>

          {/* AI Market Pulse */}
          <div style={{ background: `linear-gradient(135deg, ${INK}, #2b3230)`, borderRadius: '20px', padding: '20px', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: '-20px', right: '-20px', width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(34,212,168,0.1)' }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
              <Sparkles size={16} color={MINT} />
              <h3 style={{ fontSize: '14px', fontWeight: 900, color: 'white', letterSpacing: '-0.03em' }}>AI Market Pulse</h3>
            </div>
            {[
              { label: 'iPhones in Rabat', trend: 'up', pct: '+8%', desc: 'Prices rising this week' },
              { label: 'Cars Casablanca', trend: 'down', pct: '-3%', desc: 'Good time to buy' },
              { label: 'Property Marrakech', trend: 'up', pct: '+12%', desc: 'High demand season' },
            ].map(m => (
              <div key={m.label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                <div>
                  <p style={{ fontSize: '12px', fontWeight: 900, color: 'white', marginBottom: '1px' }}>{m.label}</p>
                  <p style={{ fontSize: '10px', color: 'rgba(255,255,255,0.4)', fontWeight: 700 }}>{m.desc}</p>
                </div>
                <span style={{ fontSize: '13px', fontWeight: 900, color: m.trend === 'up' ? '#ef4444' : MINT }}>
                  {m.pct}
                </span>
              </div>
            ))}
            <p style={{ fontSize: '10px', color: 'rgba(255,255,255,0.3)', fontWeight: 700, marginTop: '10px' }}>
              Updated every hour by SouKni AI
            </p>
          </div>

          {/* Who to follow */}
          <div style={{ background: 'white', borderRadius: '20px', padding: '20px', border: '1px solid #e2eae6' }}>
            <h3 style={{ fontSize: '15px', fontWeight: 900, color: INK, letterSpacing: '-0.03em', marginBottom: '14px' }}>👥 Top Sellers to Follow</h3>
            {[
              { name: 'Youssef Alami', initials: 'YA', city: 'Rabat', badge: 'diamond', sales: '84 sales' },
              { name: 'Sara Bennani', initials: 'SB', city: 'Casa', badge: 'certified', sales: '56 sales' },
              { name: 'Hassan Idrissi', initials: 'HI', city: 'Tanger', badge: 'diamond', sales: '127 sales' },
            ].map(u => (
              <div key={u.name} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: `linear-gradient(135deg, ${MINT}, #0f9b8e)`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <span style={{ color: 'white', fontWeight: 900, fontSize: '13px' }}>{u.initials}</span>
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: '13px', fontWeight: 900, color: INK }}>{u.name}</p>
                  <p style={{ fontSize: '11px', color: MUTED, fontWeight: 700 }}>{u.city} · {u.sales}</p>
                </div>
                <button style={{ padding: '6px 14px', borderRadius: '100px', border: `1.5px solid ${MINT}`, background: 'white', color: MINT, fontSize: '12px', fontWeight: 900, cursor: 'pointer', fontFamily: FONT }}>
                  Follow
                </button>
              </div>
            ))}
          </div>

          {/* Post Ad CTA */}
          <Link href={`/${locale}/post-ad`}
            style={{ background: `linear-gradient(135deg, ${MINT}, #0f9b8e)`, borderRadius: '18px', padding: '20px', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <ShoppingBag size={22} color="white" />
            </div>
            <div>
              <p style={{ fontSize: '14px', fontWeight: 900, color: 'white', marginBottom: '2px' }}>Ready to sell?</p>
              <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.75)', fontWeight: 700 }}>Post a free ad in 60 seconds</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}
