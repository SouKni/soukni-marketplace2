'use client'

import { useState, use } from 'react'
import Link from 'next/link'
import { Search, ChevronRight, MessageCircle, Mail, Phone, Shield, Package, CreditCard, User, Tag, AlertTriangle, ChevronDown, ChevronUp, Zap, Star } from 'lucide-react'
import Breadcrumb from '@/components/ui/Breadcrumb'

type Locale = 'en' | 'fr' | 'ar' | 'es' | 'de'

const CATEGORIES = [
  { icon: <Package size={20} color="#22d4a8" />, label: 'Buying & Selling', count: 12 },
  { icon: <User size={20} color="#22d4a8" />, label: 'Account & Profile', count: 8 },
  { icon: <Shield size={20} color="#22d4a8" />, label: 'Trust & Safety', count: 10 },
  { icon: <CreditCard size={20} color="#22d4a8" />, label: 'Payments & Diamond', count: 7 },
  { icon: <Tag size={20} color="#22d4a8" />, label: 'Listings & Ads', count: 9 },
  { icon: <AlertTriangle size={20} color="#22d4a8" />, label: 'Reporting Issues', count: 5 },
]

const FAQS = [
  {
    category: 'Buying & Selling',
    items: [
      { q: 'How do I post an ad on SouKni?', a: 'Click "Post FREE Ad" in the top navigation, choose your category, fill in the details, add photos, set a price and your contact information. Your ad goes live instantly after submission.' },
      { q: 'Is it really free to post an ad?', a: 'Yes — posting an ad on SouKni is completely free for individual sellers. Diamond and Pro memberships are optional paid upgrades that give your listings more visibility.' },
      { q: 'How do I contact a seller?', a: 'On any listing page you can send a message through our in-app chat, click WhatsApp to contact directly, or reveal the seller\'s phone number. We recommend using in-app messaging for safety.' },
      { q: 'Can I negotiate the price?', a: 'Yes. If a seller marks their item as "Negotiable" you can send them an offer through the messaging system. Always agree on a final price before meeting.' },
      { q: 'What are the safest ways to pay?', a: 'We recommend cash on collection after inspecting the item in person. Never send money in advance, never use wire transfers to strangers, and never pay before seeing the item.' },
    ]
  },
  {
    category: 'Account & Profile',
    items: [
      { q: 'How do I create an account?', a: 'Click "Login / Signup" in the header and choose "Create Account". You can sign up with your email address or continue with Google or your phone number.' },
      { q: 'How do I change my password?', a: 'Go to Account Settings → Security → Change Password. You\'ll need to enter your current password to set a new one.' },
      { q: 'Can I have multiple accounts?', a: 'No. SouKni\'s terms allow one personal account per person. Businesses should use a Pro Business account for team access.' },
      { q: 'How do I delete my account?', a: 'Go to Account Settings → Security → Danger Zone → Delete Account. This is permanent and will remove all your listings and data.' },
    ]
  },
  {
    category: 'Trust & Safety',
    items: [
      { q: 'What is Diamond verification?', a: 'Diamond verification confirms your phone number and national identity (CIN). Diamond sellers get a verified badge that signals to buyers that you\'re a real, trusted person in Morocco.' },
      { q: 'How do I report a suspicious listing?', a: 'On any listing page, scroll to the bottom and click "Report this listing". Choose a reason and submit. Our trust team reviews all reports within 24 hours.' },
      { q: 'What should I do if I was scammed?', a: 'Stop all contact with the seller. Report the listing immediately using the report button. Contact our safety team at safety@soukni.com. If money was involved, file a report with your local police.' },
      { q: 'Are all sellers on SouKni verified?', a: 'Not all sellers are Diamond verified — that\'s a paid upgrade. However, all users go through basic phone verification when signing up. Look for the Diamond or Verified badge for extra confidence.' },
    ]
  },
  {
    category: 'Payments & Diamond',
    items: [
      { q: 'How much does Diamond membership cost?', a: 'Diamond membership costs 299 MAD per month. Pro Business membership costs 799 MAD per month. Both include a 7-day free trial with no charge until the trial ends.' },
      { q: 'What payment methods do you accept?', a: 'We accept Visa, Mastercard, and major Moroccan bank cards. We do not currently accept cash payments for memberships.' },
      { q: 'How do I cancel my Diamond membership?', a: 'Go to Account Settings → Membership → Cancel Membership. Your badge stays active until the end of your current billing period.' },
      { q: 'Can I get a refund?', a: 'Refunds are handled case-by-case. If you were charged in error or experienced a technical issue, contact support@soukni.com within 48 hours of the charge.' },
    ]
  },
]

const POPULAR = [
  'How to post a free ad',
  'How to contact a seller',
  'What is Diamond verification',
  'How to cancel membership',
  'Report a scam or fraud',
  'How to delete my account',
]

export default function HelpPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = use(params)
  const [search, setSearch] = useState('')
  const [openItem, setOpenItem] = useState<string | null>(null)
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  const toggle = (q: string) => setOpenItem(openItem === q ? null : q)

  const allFaqs = FAQS.flatMap(f => f.items.map(item => ({ ...item, category: f.category })))

  const searchResults = search.trim()
    ? allFaqs.filter(f => f.q.toLowerCase().includes(search.toLowerCase()) || f.a.toLowerCase().includes(search.toLowerCase()))
    : null

  const displayFaqs = activeCategory
    ? FAQS.filter(f => f.category === activeCategory)
    : FAQS

  return (
    <div style={{ background: '#f4fbf8', minHeight: '100vh', fontFamily: 'Hanken Grotesk, Inter, system-ui, sans-serif' }}>

      {/* HERO */}
      <div style={{ background: 'linear-gradient(160deg, #161d1b 0%, #1a2e28 100%)', padding: '56px 24px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.1, backgroundImage: 'radial-gradient(circle at 30% 50%, #22d4a8 0%, transparent 50%)' }} />
        <div style={{ maxWidth: '640px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <h1 style={{ fontSize: '36px', fontWeight: 800, color: 'white', letterSpacing: '-0.02em', marginBottom: '10px' }}>How can we help you?</h1>
          <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.55)', marginBottom: '28px' }}>Search our Help Center or browse categories below</p>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'white', borderRadius: '14px', padding: '6px 6px 6px 18px', boxShadow: '0 8px 32px rgba(0,0,0,0.2)' }}>
            <Search size={17} color="#6b7a76" />
            <input
              value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search for answers..."
              style={{ flex: 1, border: 'none', outline: 'none', fontSize: '15px', fontFamily: 'inherit', color: '#161d1b', padding: '8px 0' }}
            />
            {search && (
              <button onClick={() => setSearch('')} style={{ border: 'none', background: 'none', cursor: 'pointer', display: 'flex', padding: '4px' }}>
                <Search size={14} color="#6b7a76" />
              </button>
            )}
            <button style={{ background: '#22d4a8', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '10px', fontSize: '13px', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', whiteSpace: 'nowrap' }}>
              Search
            </button>
          </div>

          {/* Popular searches */}
          {!search && (
            <div style={{ marginTop: '16px', display: 'flex', flexWrap: 'wrap', gap: '6px', justifyContent: 'center' }}>
              <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', fontWeight: 600, marginRight: '4px' }}>Popular:</span>
              {POPULAR.map(p => (
                <button key={p} onClick={() => setSearch(p)}
                  style={{ padding: '4px 12px', borderRadius: '100px', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.7)', fontSize: '11px', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.15s' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
                >
                  {p}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '40px 24px 80px' }}>

        <Breadcrumb items={[{ label: 'Home', href: `/${locale}` }, { label: 'Help Center' }]} style={{ marginBottom: 24, textTransform: 'none', fontSize: 13, letterSpacing: 'normal' }} />

        {/* SEARCH RESULTS */}
        {searchResults !== null && (
          <div style={{ marginBottom: '40px' }}>
            <p style={{ fontSize: '14px', color: '#6b7a76', marginBottom: '16px' }}>
              {searchResults.length} result{searchResults.length !== 1 ? 's' : ''} for <strong style={{ color: '#161d1b' }}>"{search}"</strong>
            </p>
            {searchResults.length === 0 ? (
              <div style={{ background: 'white', borderRadius: '20px', padding: '48px', textAlign: 'center', border: '1px solid #e2eae6' }}>
                <p style={{ fontSize: '15px', fontWeight: 700, color: '#161d1b', marginBottom: '8px' }}>No results found</p>
                <p style={{ fontSize: '13px', color: '#6b7a76', marginBottom: '20px' }}>Try different keywords or contact our support team.</p>
                <button onClick={() => setSearch('')} style={{ padding: '10px 24px', borderRadius: '10px', background: '#22d4a8', color: 'white', border: 'none', fontSize: '13px', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>
                  Clear Search
                </button>
              </div>
            ) : (
              <div style={{ background: 'white', borderRadius: '20px', border: '1px solid #e2eae6', overflow: 'hidden' }}>
                {searchResults.map((item, i) => (
                  <div key={item.q} style={{ borderBottom: i < searchResults.length - 1 ? '1px solid #f4fbf8' : 'none' }}>
                    <button onClick={() => toggle(item.q)}
                      style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 24px', border: 'none', background: 'transparent', cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left', gap: '16px' }}>
                      <div>
                        <p style={{ fontSize: '11px', fontWeight: 700, color: '#22d4a8', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>{item.category}</p>
                        <p style={{ fontSize: '14px', fontWeight: 700, color: '#161d1b' }}>{item.q}</p>
                      </div>
                      {openItem === item.q ? <ChevronUp size={16} color="#6b7a76" /> : <ChevronDown size={16} color="#6b7a76" />}
                    </button>
                    {openItem === item.q && (
                      <div style={{ padding: '0 24px 18px', borderTop: '1px solid #f4fbf8' }}>
                        <p style={{ fontSize: '14px', color: '#3c4a46', lineHeight: 1.7 }}>{item.a}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {!searchResults && (
          <>
            {/* CATEGORIES */}
            <div style={{ marginBottom: '40px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#161d1b', marginBottom: '16px', letterSpacing: '-0.02em' }}>Browse by Category</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
                {CATEGORIES.map(cat => (
                  <button key={cat.label} onClick={() => setActiveCategory(activeCategory === cat.label ? null : cat.label)}
                    style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '16px', borderRadius: '16px', border: `1.5px solid ${activeCategory === cat.label ? '#22d4a8' : '#e2eae6'}`, background: activeCategory === cat.label ? '#f0fdf9' : 'white', cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left', transition: 'all 0.2s' }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = '#22d4a8'}
                    onMouseLeave={e => { if (activeCategory !== cat.label) e.currentTarget.style.borderColor = '#e2eae6' }}
                  >
                    <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: '#f0fdf9', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      {cat.icon}
                    </div>
                    <div>
                      <p style={{ fontSize: '13px', fontWeight: 700, color: '#161d1b', marginBottom: '2px' }}>{cat.label}</p>
                      <p style={{ fontSize: '11px', color: '#6b7a76' }}>{cat.count} articles</p>
                    </div>
                  </button>
                ))}
              </div>
              {activeCategory && (
                <button onClick={() => setActiveCategory(null)}
                  style={{ marginTop: '10px', background: 'none', border: 'none', color: '#22d4a8', fontSize: '12px', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>
                  ← Show all categories
                </button>
              )}
            </div>

            {/* FAQ ACCORDION */}
            <div style={{ marginBottom: '48px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#161d1b', marginBottom: '16px', letterSpacing: '-0.02em' }}>
                {activeCategory ? activeCategory : 'Frequently Asked Questions'}
              </h2>

              {displayFaqs.map(section => (
                <div key={section.category} style={{ marginBottom: '24px' }}>
                  {!activeCategory && (
                    <p style={{ fontSize: '12px', fontWeight: 700, color: '#22d4a8', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '10px' }}>{section.category}</p>
                  )}
                  <div style={{ background: 'white', borderRadius: '20px', border: '1px solid #e2eae6', overflow: 'hidden' }}>
                    {section.items.map((item, i) => (
                      <div key={item.q} style={{ borderBottom: i < section.items.length - 1 ? '1px solid #f4fbf8' : 'none' }}>
                        <button onClick={() => toggle(`${section.category}-${item.q}`)}
                          style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', border: 'none', background: openItem === `${section.category}-${item.q}` ? '#f0fdf9' : 'transparent', cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left', gap: '16px', transition: 'background 0.15s' }}>
                          <p style={{ fontSize: '14px', fontWeight: 700, color: '#161d1b' }}>{item.q}</p>
                          {openItem === `${section.category}-${item.q}`
                            ? <ChevronUp size={16} color="#22d4a8" style={{ flexShrink: 0 }} />
                            : <ChevronDown size={16} color="#6b7a76" style={{ flexShrink: 0 }} />
                          }
                        </button>
                        {openItem === `${section.category}-${item.q}` && (
                          <div style={{ padding: '0 20px 16px', background: '#f0fdf9' }}>
                            <p style={{ fontSize: '13px', color: '#3c4a46', lineHeight: 1.75 }}>{item.a}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* CONTACT SUPPORT */}
        <div style={{ background: 'white', borderRadius: '24px', padding: '32px', border: '1px solid #e2eae6' }}>
          <div style={{ textAlign: 'center', marginBottom: '28px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#161d1b', marginBottom: '6px' }}>Still need help?</h2>
            <p style={{ fontSize: '13px', color: '#6b7a76' }}>Our support team is available 7 days a week</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px' }}>
            {[
              { icon: <MessageCircle size={20} color="#22d4a8" />, title: 'Live Chat', desc: 'Chat with us now', sub: 'Avg. response: 5 min', action: 'Start Chat', primary: true },
              { icon: <Mail size={20} color="#22d4a8" />, title: 'Email Support', desc: 'support@soukni.com', sub: 'Response within 24h', action: 'Send Email', primary: false },
              { icon: <Phone size={20} color="#22d4a8" />, title: 'Phone Support', desc: '+212 5 37 00 00 00', sub: 'Mon–Fri, 9am–6pm', action: 'Call Now', primary: false },
            ].map(c => (
              <div key={c.title} style={{ background: '#f4fbf8', borderRadius: '16px', padding: '20px', textAlign: 'center', border: '1px solid #e2eae6' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
                  {c.icon}
                </div>
                <p style={{ fontSize: '14px', fontWeight: 800, color: '#161d1b', marginBottom: '2px' }}>{c.title}</p>
                <p style={{ fontSize: '12px', color: '#6b7a76', marginBottom: '2px' }}>{c.desc}</p>
                <p style={{ fontSize: '11px', color: '#22d4a8', marginBottom: '14px', fontWeight: 600 }}>{c.sub}</p>
                <button style={{ width: '100%', padding: '9px', borderRadius: '10px', border: 'none', background: c.primary ? '#22d4a8' : '#161d1b', color: 'white', fontSize: '12px', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>
                  {c.action}
                </button>
              </div>
            ))}
          </div>

          {/* Safety tip */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '20px', padding: '14px 16px', background: '#f5ede0', borderRadius: '12px' }}>
            <Zap size={16} color="#f97316" style={{ flexShrink: 0 }} />
            <p style={{ fontSize: '12px', color: '#6b7a76', lineHeight: 1.5 }}>
              <strong style={{ color: '#161d1b' }}>Safety reminder:</strong> SouKni will never ask for your password, OTP code, or bank details via chat, email or phone. If someone does, it's a scam.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
