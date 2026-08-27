'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Heart, Search, MapPin, ChevronRight, MessageCircle, Diamond, Check } from 'lucide-react'
import { useDictionary } from '@/lib/useDictionary'
import WhatsAppButton from '@/components/ui/WhatsAppButton'

const C = { mint:'#22d4a8', mintDk:'#0f9b8e', ink:'#161d1b', surface:'#f4fbf8', muted:'#6b7a76' }
const UB = { fontFamily:"'Inter',sans-serif", fontWeight:900, letterSpacing:'-0.05em' } as const

// categories moved inside component to support translation

const listings = [
  { id: '1', title: 'BRAND NEW Hermes Birkin 35', category: 'Handbags, Bags & Wallets', price: 'MAD 290,950', badge: 'Verified', location: 'Rabat Center', time: '2 hours ago', premium: true, image: 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&w=500' },
  { id: '2', title: 'Chanel Boy Medium Chevron', category: 'Handbags, Bags & Wallets', price: 'MAD 45,000', badge: 'Verified', location: 'Casablanca', time: '1 day ago', premium: true, image: 'https://images.pexels.com/photos/904350/pexels-photo-904350.jpeg?auto=compress&w=500' },
  { id: '3', title: 'Designer Wedding Dress', category: 'Wedding Apparel', price: 'MAD 8,500', badge: null, location: 'Marrakech', time: '3 days ago', premium: false, image: 'https://images.pexels.com/photos/1488310/pexels-photo-1488310.jpeg?auto=compress&w=500' },
  { id: '4', title: 'Louis Vuitton OnTheGo MM', category: 'Handbags, Bags & Wallets', price: 'MAD 28,000', badge: 'Diamond', location: 'Tangier', time: 'Just now', premium: false, image: 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&w=500' },
]

const newArrivals = [
  { id: '5', title: 'Gold & Emerald Artisan Watch', category: 'Timepieces', price: 'MAD 125,000', badge: 'Diamond', location: 'Rabat', time: 'Just now', premium: false, image: 'https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&w=500' },
  { id: '6', title: 'Silk & Lace Evening Gown', category: 'Wedding & Eveningwear', price: 'MAD 18,500', badge: 'Diamond', location: 'Casablanca', time: '1 hour ago', premium: false, image: 'https://images.pexels.com/photos/1488310/pexels-photo-1488310.jpeg?auto=compress&w=500' },
  { id: '7', title: 'Heritage Leather Travel Trunk', category: 'Leather Accessories', price: 'MAD 32,000', badge: 'Diamond', location: 'Marrakech', time: '2 hours ago', premium: false, image: 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&w=500' },
  { id: '8', title: 'Italian Designer Stilettos', category: 'Footwear', price: 'MAD 6,400', badge: 'Diamond', location: 'Rabat', time: '5h ago', premium: false, image: 'https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg?auto=compress&w=500' },
]

// Extra section — added before the final banners (previously missing 2 ads)
const moreFashion = [
  { id: '9',  title: 'Rolex Datejust 41 Steel',        category: 'Timepieces',              price: 'MAD 165,000', badge: 'Diamond', location: 'Casablanca', time: '4 hours ago', premium: true,  image: 'https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&w=500' },
  { id: '10', title: 'Caftan Marocain Brodé Main',      category: 'Traditional Wear',        price: 'MAD 4,200',   badge: 'Verified', location: 'Fès', time: '6 hours ago', premium: false, image: 'https://images.pexels.com/photos/2220316/pexels-photo-2220316.jpeg?auto=compress&w=500' },
  { id: '11', title: 'Gucci Ace Sneakers — Size 42',    category: 'Footwear',                price: 'MAD 5,800',   badge: null,       location: 'Rabat', time: '1 day ago', premium: false,  image: 'https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg?auto=compress&w=500' },
  { id: '12', title: 'Vintage Levi\'s Denim Jacket',    category: 'Vintage & Thrift',         price: 'MAD 650',     badge: null,       location: 'Marrakech', time: '2 days ago', premium: false, image: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&w=500' },
  { id: '13', title: 'Diamond Tennis Bracelet 18K',     category: 'Jewelry',                 price: 'MAD 78,000',  badge: 'Diamond', location: 'Casablanca', time: '3 days ago', premium: true, image: 'https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&w=500' },
  { id: '14', title: 'Nike Air Max Collector Edition',  category: 'Sports & Activewear',     price: 'MAD 2,400',   badge: 'Verified', location: 'Tangier', time: '4 days ago', premium: false, image: 'https://images.pexels.com/photos/2294361/pexels-photo-2294361.jpeg?auto=compress&w=500' },
  { id: '15', title: 'Prada Saffiano Leather Tote',     category: 'Handbags, Bags & Wallets', price: 'MAD 19,500', badge: 'Diamond', location: 'Rabat', time: '5 days ago', premium: false, image: 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&w=500' },
  { id: '16', title: 'Organic Skincare Gift Set',       category: 'Beauty & Grooming',        price: 'MAD 890',    badge: null,       location: 'Casablanca', time: '1 week ago', premium: false, image: 'https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&w=500' },
]

type Listing = typeof listings[0]

function FashionCard({ item, t }: { item: Listing; t: any }) {
  const [liked, setLiked] = useState(false)
  const [hovered, setHovered] = useState(false)
  return (
    <article onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{ backgroundColor: 'white', borderRadius: '24px', overflow: 'hidden', border: `1px solid ${hovered ? C.mint : 'rgba(186,202,197,0.2)'}`, boxShadow: hovered ? '0 20px 48px rgba(0,0,0,0.12)' : '0 2px 8px rgba(0,0,0,0.04)', transition: 'all 0.3s' }}>
      <div style={{ position: 'relative', aspectRatio: '4/3', overflow: 'hidden' }}>
        <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s', transform: hovered ? 'scale(1.06)' : 'scale(1)' }} />
        {item.badge && (
          <span style={{ position: 'absolute', top: '10px', left: '10px', background: item.badge === 'Diamond' ? `linear-gradient(135deg, ${C.mint}, ${C.mintDk})` : 'rgba(255,255,255,0.92)', backdropFilter: 'blur(8px)', color: item.badge === 'Diamond' ? 'white' : C.mint, fontSize: '8px', fontWeight: 900, padding: '3px 10px', borderRadius: '100px', textTransform: 'uppercase', letterSpacing: '0.07em', display: 'flex', alignItems: 'center', gap: '4px' }}>
            {item.badge === 'Diamond' ? <Diamond size={10} /> : <Check size={10} />} {item.badge === 'Diamond' ? t.common.diamond : t.common.verified}
          </span>
        )}
        <button onClick={() => setLiked(!liked)} style={{ position: 'absolute', top: '10px', right: '10px', width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
          <Heart size={14} color={liked ? '#ef4444' : 'white'} fill={liked ? '#ef4444' : 'none'} />
        </button>
        {item.premium && (
          <span style={{ position: 'absolute', bottom: '10px', right: '10px', backgroundColor: 'rgba(255,172,90,0.95)', color: '#2d1600', padding: '3px 10px', borderRadius: '100px', fontSize: '9px', fontWeight: 900, textTransform: 'uppercase' }}>{t.fashion.premium}</span>
        )}
      </div>
      <div style={{ padding: '16px 18px' }}>
        <p style={{ fontFamily:"'Hanken Grotesk',sans-serif", fontWeight: 900, letterSpacing: '-0.03em', fontSize: '9px', color: C.mint, textTransform: 'uppercase', marginBottom: '4px' } as any}>{item.category}</p>
        <h3 style={{ fontFamily:"'Hanken Grotesk',sans-serif", fontWeight: 900, letterSpacing: '-0.03em', fontSize: '14px', color: C.ink, marginBottom: '6px', lineHeight: 1.3, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.title}</h3>
        <div style={{ fontFamily:"'Hanken Grotesk',sans-serif", fontWeight: 900, letterSpacing: '-0.03em', fontSize: '18px', color: C.mint, marginBottom: '10px' }}>{item.price}</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: C.muted, fontSize: '11px', marginBottom: '12px' }}>
          <MapPin size={11} /> {item.location} • {item.time}
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button style={{ flex: 1, backgroundColor: C.surface, color: '#3c4a46', border: 'none', padding: '9px', borderRadius: '100px', fontWeight: 700, fontSize: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
            <MessageCircle size={13} /> {t.fashion.chat}
          </button>
          <WhatsAppButton phone={(item as any).phone} title={item.title} style={{ flex: 1, padding: '9px', borderRadius: '100px', fontWeight: 700, fontSize: '12px' }}>{t.common.whatsapp}</WhatsAppButton>
        </div>
      </div>
    </article>
  )
}

export default function FashionPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = React.use(params)
  const t = useDictionary(locale)
  const [keyword, setKeyword] = useState('')
  const [hovCat, setHovCat] = useState<string|null>(null)
  const categories = [
    { slug:'shoes',       label:t.fashion.catShoes,       count:'4,820', emoji:'👞', image:'https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg?auto=compress&w=600' },
    { slug:'bags',        label:t.fashion.catBags,        count:'3,290', emoji:'👜', image:'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&w=600' },
    { slug:'jewelry',     label:t.fashion.catJewelry,     count:'2,140', emoji:'💍', image:'https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&w=600' },
    { slug:'traditional', label:t.fashion.catTraditional, count:'1,680', emoji:'🧵', image:'https://images.pexels.com/photos/2220316/pexels-photo-2220316.jpeg?auto=compress&w=600' },
    { slug:'sports',      label:t.fashion.catSports,      count:'2,310', emoji:'👟', image:'https://images.pexels.com/photos/2294361/pexels-photo-2294361.jpeg?auto=compress&w=600' },
    { slug:'vintage',     label:t.fashion.catVintage,     count:'1,840', emoji:'🕰️', image:'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&w=600' },
    { slug:'wedding',     label:t.fashion.catWedding,     count:'920',   emoji:'👰', image:'https://images.pexels.com/photos/1488310/pexels-photo-1488310.jpeg?auto=compress&w=600' },
    { slug:'beauty',      label:t.fashion.catBeauty,      count:'1,580', emoji:'💄', image:'https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&w=600' },
  ]

  return (
    <div style={{ fontFamily:"'Inter',sans-serif", backgroundColor:C.surface, minHeight:'100vh' }}>

      {/* CINEMATIC HERO */}
      <section style={{ position:'relative', height:520, overflow:'hidden', display:'flex', alignItems:'center', justifyContent:'center' }}>
        <img src="https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&w=1600" alt="Fashion"
          style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover' }} />
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top,rgba(15,23,42,0.88),rgba(15,23,42,0.32))' }} />
        <div style={{ position:'relative', zIndex:10, textAlign:'center', padding:'0 24px', maxWidth:760, width:'100%' }}>
          <p style={{ fontSize:11, fontWeight:800, color:C.mint, textTransform:'uppercase' as const, letterSpacing:'0.2em', marginBottom:16 }}>{t.fashion.badge}</p>
          <h1 style={{ ...UB, fontSize:'clamp(36px,6vw,68px)', color:'white', lineHeight:1.0, marginBottom:20, textTransform:'uppercase' as const }}>
            {t.fashion.heroLine1}<br />{t.fashion.heroLine2}<br />{t.fashion.heroLine3}
          </h1>
          <p style={{ fontSize:16, color:'rgba(255,255,255,0.75)', marginBottom:32, maxWidth:520, margin:'0 auto 32px' }}>
            {t.fashion.heroSubtitle}
          </p>
          <div style={{ display:'flex', alignItems:'stretch', backgroundColor:'rgba(255,255,255,0.12)', backdropFilter:'blur(24px)', border:'1px solid rgba(255,255,255,0.25)', borderRadius:100, overflow:'hidden', maxWidth:680, margin:'0 auto', boxShadow:'0 8px 32px rgba(0,0,0,0.2)' }}>
            <div style={{ display:'flex', flexDirection:'column' as const, padding:'14px 22px', flex:'0 0 160px', borderRight:'1px solid rgba(255,255,255,0.2)', gap:2 }}>
              <span style={{ fontSize:9, fontWeight:800, color:'rgba(255,255,255,0.55)', textTransform:'uppercase' as const, letterSpacing:'0.12em' }}>{t.common.city}</span>
              <input placeholder="Rabat" style={{ backgroundColor:'transparent', border:'none', outline:'none', fontSize:14, fontWeight:600, color:'white', fontFamily:"'Inter',sans-serif", padding:0 }} />
            </div>
            <div style={{ display:'flex', flexDirection:'column' as const, padding:'14px 22px', flex:1, borderRight:'1px solid rgba(255,255,255,0.2)', gap:2 }}>
              <span style={{ fontSize:9, fontWeight:800, color:'rgba(255,255,255,0.55)', textTransform:'uppercase' as const, letterSpacing:'0.12em' }}>{t.common.keyword}</span>
              <input value={keyword} onChange={e=>setKeyword(e.target.value)} placeholder={t.fashion.keywordPlaceholder} style={{ backgroundColor:'transparent', border:'none', outline:'none', fontSize:14, fontWeight:600, color:'white', fontFamily:"'Inter',sans-serif", padding:0, width:'100%' }} />
            </div>
            <button style={{ backgroundColor:C.mint, color:'white', border:'none', padding:'0 32px', fontWeight:800, fontSize:14, cursor:'pointer', flexShrink:0, transition:'background 0.15s', display:'flex', alignItems:'center', gap:8 }}
              onMouseEnter={e=>e.currentTarget.style.backgroundColor=C.mintDk}
              onMouseLeave={e=>e.currentTarget.style.backgroundColor=C.mint}>
              <Search size={16} /> {t.common.search}
            </button>
          </div>
        </div>
      </section>

      {/* ADVANCED FILTER BAR */}
      <div style={{ maxWidth:1440, margin:'-26px auto 0', padding:'0 40px', position:'relative', zIndex:30 }}>
        <div style={{ backgroundColor:'rgba(255,255,255,0.95)', backdropFilter:'blur(20px)', borderRadius:100, padding:'8px 8px 8px 0', boxShadow:'0 8px 40px rgba(0,0,0,0.10)', border:'1px solid rgba(255,255,255,0.7)', display:'flex', alignItems:'center' }}>
          {[
            { label:t.common.city, val:'Rabat', w:1 },
            { label:t.common.keyword, val:t.fashion.keywordPlaceholder, w:2 },
            { label:t.common.category, val:t.fashion.allFashion, w:1 },
            { label:t.common.price, val:t.common.selectRange, w:1 },
          ].map((f,i)=>(
            <div key={f.label} style={{ flex:f.w, padding:'8px 20px', borderRight:i<3?'1px solid rgba(186,202,197,0.25)':'none', display:'flex', flexDirection:'column' as const, cursor:'pointer', gap:1 }}>
              <span style={{ fontSize:9, textTransform:'uppercase' as const, fontWeight:700, color:C.muted, letterSpacing:'0.1em' }}>{f.label}</span>
              <span style={{ fontSize:13, fontWeight:600, color:C.ink }}>{f.val}</span>
            </div>
          ))}
          <button style={{ backgroundColor:C.mint, color:'white', border:'none', padding:'12px 24px', borderRadius:100, cursor:'pointer', fontWeight:700, fontSize:13, flexShrink:0, marginLeft:8, display:'flex', alignItems:'center', gap:6 }}>
            <Search size={15} /> {t.common.search.toUpperCase()}
          </button>
        </div>
      </div>

      <div style={{ maxWidth:1440, margin:'48px auto 0', padding:'0 40px 80px' }}>

        {/* BREADCRUMB */}
        <nav style={{ display:'flex', alignItems:'center', gap:6, fontSize:11, fontWeight:700, color:C.muted, textTransform:'uppercase' as const, letterSpacing:'0.06em', marginBottom:32 }}>
          <Link href={`/${locale}`} style={{ color:C.muted, textDecoration:'none' }}>{t.common.home}</Link><span>›</span>
          <span style={{ color:C.ink }}>{t.fashion.badge}</span>
        </nav>

        {/* CATEGORY GRID */}
        <section style={{ marginBottom:64 }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:24 }}>
            <h2 style={{ ...UB, fontSize:28, color:C.ink }}>{t.common.browseByCategory}</h2>
            <span style={{ fontSize:14, color:C.muted }}>6,388 {t.common.totalListings}</span>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:16 }}>
            {categories.map(cat=>(
              <Link key={cat.slug} href={`/${locale}/fashion/${cat.slug}`} style={{ textDecoration:'none' }}>
                <div onMouseEnter={()=>setHovCat(cat.slug)} onMouseLeave={()=>setHovCat(null)}
                  style={{ position:'relative', borderRadius:24, overflow:'hidden', cursor:'pointer', transition:'transform 0.2s, box-shadow 0.2s', transform:hovCat===cat.slug?'scale(1.02)':'scale(1)', boxShadow:hovCat===cat.slug?'0 20px 48px rgba(0,0,0,0.15)':'0 2px 8px rgba(0,0,0,0.06)' }}>
                  <div style={{ aspectRatio:'4/3', overflow:'hidden' }}>
                    <img src={cat.image} alt={cat.label} style={{ width:'100%', height:'100%', objectFit:'cover', transition:'transform 0.5s', transform:hovCat===cat.slug?'scale(1.08)':'scale(1)' }} />
                  </div>
                  <div style={{ position:'absolute', inset:0, background:hovCat===cat.slug?'linear-gradient(to top,rgba(34,212,168,0.75),rgba(0,0,0,0.1))':'linear-gradient(to top,rgba(0,0,0,0.72),rgba(0,0,0,0.05))' }} />
                  <div style={{ position:'absolute', bottom:0, left:0, right:0, padding:'16px 18px' }}>
                    <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                      <div>
                        <p style={{ ...UB, fontSize:15, color:'white', marginBottom:3 }}>{cat.label}</p>
                        <p style={{ fontSize:11, color:'rgba(255,255,255,0.8)', fontWeight:600 }}>{cat.count} {t.common.ads}</p>
                      </div>
                      <div style={{ width:36, height:36, borderRadius:'50%', backgroundColor:'rgba(255,255,255,0.2)', backdropFilter:'blur(8px)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:18 }}>
                        {cat.emoji}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* DIAMOND SELLER BANNER */}
        <section style={{ marginBottom:64 }}>
          <div style={{ position:'relative', height:220, borderRadius:40, overflow:'hidden', cursor:'pointer', boxShadow:'0 20px 60px rgba(0,0,0,0.15)' }}>
            <img src="https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&w=1200" alt="Diamond Sellers"
              style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover' }} />
            <div style={{ position:'absolute', inset:0, background:'linear-gradient(to right,rgba(22,29,27,0.92) 0%,rgba(22,29,27,0.5) 60%,transparent)' }} />
            <div style={{ position:'absolute', inset:0, display:'flex', flexDirection:'column' as const, justifyContent:'center', padding:'0 56px' }}>
              <span style={{ backgroundColor:C.mint, color:'white', fontSize:9, ...UB, padding:'4px 14px', borderRadius:100, textTransform:'uppercase' as const, letterSpacing:'0.12em', display:'inline-block', marginBottom:14, width:'fit-content' }}>{t.fashion.diamondSellerBadge}</span>
              <h2 style={{ ...UB, fontSize:'clamp(20px,3vw,32px)', color:'white', marginBottom:20, lineHeight:1.1 }}>{t.fashion.diamondSellerTitle}<br/>{t.fashion.diamondSellerTitle2}</h2>
              <div style={{ display:'flex', gap:12 }}>
                <Link href={`/${locale}/diamond`} style={{ textDecoration:'none' }}>
                  <button style={{ backgroundColor:'white', color:C.ink, border:'none', padding:'11px 28px', borderRadius:100, fontSize:12, ...UB, cursor:'pointer' }}>{t.fashion.getStarted}</button>
                </Link>
                <button style={{ backgroundColor:'transparent', color:'white', border:'1px solid rgba(255,255,255,0.4)', padding:'11px 28px', borderRadius:100, fontSize:12, fontWeight:700, cursor:'pointer' }}>{t.common.learnMore}</button>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURED FASHION */}
        <section style={{ marginBottom:64 }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:24 }}>
            <h2 style={{ ...UB, fontSize:28, color:C.ink }}>{t.fashion.featuredTitle}</h2>
            <Link href={`/${locale}/fashion/bags`} style={{ color:C.mint, fontWeight:700, fontSize:13, textDecoration:'none', display:'flex', alignItems:'center', gap:4 }}>
              {t.common.viewAll} <ChevronRight size={14} />
            </Link>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:20 }}>
            {listings.map(item => <FashionCard key={item.id} item={item} t={t} />)}
          </div>
        </section>

        {/* AUTO PRO CROSS-PROMO BANNER */}
        <section style={{ marginBottom:64 }}>
          <div style={{ position:'relative', height:220, borderRadius:40, overflow:'hidden', cursor:'pointer', boxShadow:'0 20px 60px rgba(0,0,0,0.15)' }}>
            <img src="https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&w=1200" alt="Auto Pro"
              style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover' }} />
            <div style={{ position:'absolute', inset:0, background:'linear-gradient(to right,rgba(22,29,27,0.92) 0%,rgba(22,29,27,0.5) 60%,transparent)' }} />
            <div style={{ position:'absolute', inset:0, display:'flex', flexDirection:'column' as const, justifyContent:'center', padding:'0 56px' }}>
              <span style={{ backgroundColor:'#8d4f00', color:'white', fontSize:9, ...UB, padding:'4px 14px', borderRadius:100, textTransform:'uppercase' as const, letterSpacing:'0.12em', display:'inline-block', marginBottom:14, width:'fit-content' }}>{t.fashion.autoProBadge}</span>
              <h2 style={{ ...UB, fontSize:'clamp(20px,3vw,32px)', color:'white', marginBottom:20, lineHeight:1.1 }}>{t.fashion.autoProTitle}<br/>{t.fashion.autoProTitle2}</h2>
              <div style={{ display:'flex', gap:12 }}>
                <Link href={`/${locale}/motors`} style={{ textDecoration:'none' }}>
                  <button style={{ backgroundColor:'white', color:C.ink, border:'none', padding:'11px 28px', borderRadius:100, fontSize:12, ...UB, cursor:'pointer' }}>{t.fashion.exploreMotors}</button>
                </Link>
                <button style={{ backgroundColor:'transparent', color:'white', border:'1px solid rgba(255,255,255,0.4)', padding:'11px 28px', borderRadius:100, fontSize:12, fontWeight:700, cursor:'pointer' }}>{t.common.contactExpert}</button>
              </div>
            </div>
          </div>
        </section>

        {/* NEW ARRIVALS */}
        <section style={{ marginBottom:64 }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:24 }}>
            <h2 style={{ ...UB, fontSize:28, color:C.ink }}>{t.fashion.newArrivalsTitle}</h2>
            <span style={{ fontSize:14, color:C.muted }}>{t.fashion.updatedHourly}</span>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:20 }}>
            {newArrivals.map(item => <FashionCard key={item.id} item={item} t={t} />)}
          </div>
        </section>

        {/* TRENDING SEARCHES */}
        <section style={{ marginBottom:64 }}>
          <h2 style={{ ...UB, fontSize:22, color:C.ink, marginBottom:20 }}>{t.fashion.trendingTitle}</h2>
          <div style={{ display:'flex', gap:10, flexWrap:'wrap' as const }}>
            {['Hermès Birkin','Chanel Classic','Rolex Datejust','Caftan Marocain','Gucci Sneakers','Louis Vuitton','Vintage Denim','Diamond Jewelry','Evening Gown','Nike Air Max','Prada Bag','Skincare Set'].map(tag=>(
              <Link key={tag} href={`/${locale}/fashion/bags`} style={{ textDecoration:'none' }}>
                <span style={{ display:'inline-block', padding:'9px 18px', borderRadius:100, fontSize:13, fontWeight:700, backgroundColor:'white', color:C.ink, border:'1px solid rgba(186,202,197,0.4)', cursor:'pointer', transition:'all 0.15s' }}
                  onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.backgroundColor=C.mint;(e.currentTarget as HTMLElement).style.color='white'}}
                  onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.backgroundColor='white';(e.currentTarget as HTMLElement).style.color=C.ink}}>
                  {tag}
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* MORE FASHION FINDS — the extra section (8 items) added before the final banners */}
        <section style={{ marginBottom:64 }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:24 }}>
            <h2 style={{ ...UB, fontSize:28, color:C.ink }}>{t.fashion.moreFindsTitle}</h2>
            <span style={{ fontSize:14, color:C.muted }}>{t.fashion.handpickedWeek}</span>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:20 }}>
            {moreFashion.map(item => <FashionCard key={item.id} item={item} t={t} />)}
          </div>
        </section>

        {/* DIAMOND BANNER */}
        <section style={{ position:'relative', borderRadius:40, overflow:'hidden', marginBottom:48 }}>
          <img src="https://images.pexels.com/photos/1884581/pexels-photo-1884581.jpeg?auto=compress&w=1600" alt="Diamond"
            style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover' }} />
          <div style={{ position:'absolute', inset:0, background:'linear-gradient(135deg,rgba(15,23,42,0.96),rgba(15,23,42,0.7))' }} />
          <div style={{ position:'relative', zIndex:1, padding:'56px 64px', maxWidth:640 }}>
            <span style={{ display:'inline-flex', alignItems:'center', gap:6, background:`linear-gradient(135deg,${C.mint},${C.mintDk})`, color:'white', fontSize:9, ...UB, padding:'5px 16px', borderRadius:100, textTransform:'uppercase' as const, letterSpacing:'0.12em', marginBottom:20 }}>{t.common.diamondBadge}</span>
            <h2 style={{ ...UB, fontSize:'clamp(28px,4vw,48px)', color:'white', marginBottom:16, lineHeight:1.05 }}>{t.fashion.diamondTitle}</h2>
            <p style={{ fontSize:15, color:'rgba(255,255,255,0.72)', lineHeight:1.7, marginBottom:28 }}>{t.fashion.diamondSubtitle}</p>
            <div style={{ display:'flex', gap:12 }}>
              <Link href={`/${locale}/diamond`} style={{ textDecoration:'none' }}>
                <button style={{ backgroundColor:C.mint, color:'white', border:'none', padding:'13px 28px', borderRadius:100, fontSize:13, ...UB, cursor:'pointer' }}>{t.common.getVerifiedNow}</button>
              </Link>
              <button style={{ backgroundColor:'transparent', color:'white', border:'1px solid rgba(255,255,255,0.3)', padding:'13px 28px', borderRadius:100, fontSize:13, fontWeight:700, cursor:'pointer' }}>{t.common.learnMore}</button>
            </div>
          </div>
        </section>

        {/* JOIN THE SOUKNI FAMILY */}
        <section style={{ borderRadius:40, background:`linear-gradient(135deg,${C.mint},${C.mintDk})`, padding:'56px 64px', display:'flex', alignItems:'center', justifyContent:'space-between', gap:40, flexWrap:'wrap' as const }}>
          <div>
            <h2 style={{ ...UB, fontSize:'clamp(28px,4vw,44px)', color:'white', marginBottom:12, lineHeight:1.05 }}>{t.fashion.sellStyleTitle}</h2>
            <p style={{ fontSize:15, color:'rgba(255,255,255,0.85)', maxWidth:480, lineHeight:1.7 }}>{t.fashion.sellStyleSubtitle}</p>
            <div style={{ display:'flex', gap:12, marginTop:24 }}>
              <button style={{ backgroundColor:'white', color:C.mint, border:'none', padding:'12px 24px', borderRadius:100, fontWeight:800, fontSize:13, cursor:'pointer', display:'flex', alignItems:'center', gap:8 }}>🍎 {t.common.appStore}</button>
              <button style={{ backgroundColor:'rgba(255,255,255,0.15)', color:'white', border:'1px solid rgba(255,255,255,0.4)', padding:'12px 24px', borderRadius:100, fontWeight:800, fontSize:13, cursor:'pointer', display:'flex', alignItems:'center', gap:8 }}>▶ {t.common.googlePlay}</button>
            </div>
          </div>
          <Link href={`/${locale}/post-ad`} style={{ textDecoration:'none' }}>
            <span style={{ display:'inline-block', backgroundColor:'white', color:C.mint, padding:'16px 36px', borderRadius:100, fontWeight:900, fontSize:14, cursor:'pointer', whiteSpace:'nowrap' as const, ...UB }}>{t.common.postFreeAd}</span>
          </Link>
        </section>

      </div>
    </div>
  )
}
