'use client'

import { useState } from 'react'
import React from 'react'
import { useMarket } from '@/context/MarketContext'
import { Heart, Search, MapPin, ChevronDown, ChevronLeft, ChevronRight, MessageCircle, SlidersHorizontal, Bookmark, ArrowUpDown, Zap, TrendingDown } from 'lucide-react'

/* ─── PRODUCT IMAGES ───────────────────────────────────────── */
const IMGS = {
  bose:      'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&w=600',
  sonos:     'https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&w=600',
  gopro:     'https://images.pexels.com/photos/1697912/pexels-photo-1697912.jpeg?auto=compress&w=600',
  logitech:  'https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg?auto=compress&w=600',
  airpurif:  'https://images.pexels.com/photos/7319303/pexels-photo-7319303.jpeg?auto=compress&w=600',
  magsafe:   'https://images.pexels.com/photos/4526467/pexels-photo-4526467.jpeg?auto=compress&w=600',
  ecoflow:   'https://images.pexels.com/photos/159397/solar-panel-array-power-sun-159397.jpeg?auto=compress&w=600',
  samsung:   'https://images.pexels.com/photos/1476321/pexels-photo-1476321.jpeg?auto=compress&w=600',
  belkin:    'https://images.pexels.com/photos/4526407/pexels-photo-4526407.jpeg?auto=compress&w=600',
  dualsense: 'https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&w=600',
  elgato:    'https://images.pexels.com/photos/1714209/pexels-photo-1714209.jpeg?auto=compress&w=600',
  tplink:    'https://images.pexels.com/photos/2881229/pexels-photo-2881229.jpeg?auto=compress&w=600',
  xiaomi:    'https://images.pexels.com/photos/7319303/pexels-photo-7319303.jpeg?auto=compress&w=600',
  canon:     'https://images.pexels.com/photos/1203819/pexels-photo-1203819.jpeg?auto=compress&w=600',
  richard:   'https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&w=600',
  necklace:  'https://images.pexels.com/photos/1413420/pexels-photo-1413420.jpeg?auto=compress&w=600',
  cartier:   'https://images.pexels.com/photos/2735970/pexels-photo-2735970.jpeg?auto=compress&w=600',
  patek:     'https://images.pexels.com/photos/280250/pexels-photo-280250.jpeg?auto=compress&w=600',
  ruby:      'https://images.pexels.com/photos/1448849/pexels-photo-1448849.jpeg?auto=compress&w=600',
  bulgari:   'https://images.pexels.com/photos/2735970/pexels-photo-2735970.jpeg?auto=compress&w=600',
  ap:        'https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&w=600',
  hero:      'https://images.pexels.com/photos/1714207/pexels-photo-1714207.jpeg?auto=compress&w=600',
}

/* ─── DATA ──────────────────────────────────────────────────── */
type BadgeType = 'diamond' | 'pro' | 'verified'

interface Product {
  id: string; badge: BadgeType; tag: string; location: string
  title: string; price: number; image: string; aspect?: string
}

const featuredPremium: Product[] = [
  { id:'f1', badge:'diamond', tag:'New', location:'Rabat, Agdal',   title:'Bose Noise Cancelling Headphones 700',          price:3850,  image:IMGS.bose,      aspect:'4/5' },
  { id:'f2', badge:'pro',     tag:'In Stock', location:'Rabat, Souissi', title:'Sonos Beam Gen 2 Premium Compact Soundbar',     price:5200,  image:IMGS.sonos,     aspect:'4/5' },
  { id:'f3', badge:'diamond', tag:'Flash Sale', location:'Rabat, Hassan', title:'GoPro HERO12 Black 5.3K Action Camera',         price:4150,  image:IMGS.gopro,     aspect:'4/5' },
  { id:'f4', badge:'verified',tag:'Top Choice', location:'Rabat, Hay Riad', title:'Logitech G915 TKL Wireless Mechanical Keyboard', price:2250,  image:IMGS.logitech,  aspect:'4/5' },
]

const newArrivals: Product[] = [
  { id:'n1', badge:'diamond', tag:'New',       location:'Rabat Center',  title:'Smart Air Purifier with HEPA Filter',        price:2450,  image:IMGS.airpurif,  aspect:'4/5' },
  { id:'n2', badge:'verified',tag:'Like New',  location:'Rabat Center',  title:'Apple MagSafe Duo Wireless Charger',         price:1250,  image:IMGS.magsafe,   aspect:'4/5' },
  { id:'n3', badge:'pro',     tag:'New',       location:'Témara',         title:'EcoFlow Delta 2 Portable Power Station',     price:9800,  image:IMGS.ecoflow,   aspect:'4/5' },
  { id:'n4', badge:'diamond', tag:'New',       location:'Rabat, Souissi', title:'Samsung T7 Shield 2TB Portable SSD',         price:1850,  image:IMGS.samsung,   aspect:'4/5' },
  { id:'n5', badge:'verified',tag:'Used',      location:'Rabat Center',   title:'Belkin 3-in-1 Wireless Charging Stand',      price:1150,  image:IMGS.belkin,    aspect:'4/5' },
  { id:'n6', badge:'diamond', tag:'New',       location:'Salé',           title:'DualSense Edge Wireless Controller',          price:2100,  image:IMGS.dualsense, aspect:'4/5' },
  { id:'n7', badge:'pro',     tag:'New',       location:'Rabat, Hay Riad',title:'Elgato Stream Deck MK.2 White',              price:1600,  image:IMGS.elgato,    aspect:'4/5' },
  { id:'n8', badge:'diamond', tag:'New',       location:'Rabat, Agdal',   title:'TP-Link Deco BE85 Mesh Wi-Fi 7',             price:4200,  image:IMGS.tplink,    aspect:'4/5' },
]

const gridRow1: Product[] = [
  { id:'g1', badge:'diamond', tag:'New',      location:'Rabat Center',   title:'Xiaomi Smart Air Purifier 4 Pro',           price:2450,  image:IMGS.xiaomi },
  { id:'g2', badge:'pro',     tag:'New',      location:'Témara',          title:'EcoFlow Delta 2 Portable Power Station',    price:9800,  image:IMGS.ecoflow },
  { id:'g3', badge:'verified',tag:'New',      location:'Rabat, Agdal',    title:'TP-Link Deco BE85 Mesh Wi-Fi 7 Router',     price:4200,  image:IMGS.tplink },
  { id:'g4', badge:'diamond', tag:'New',      location:'Salé',            title:'DualSense Edge Wireless Controller PS5',    price:2100,  image:IMGS.dualsense },
  { id:'g5', badge:'verified',tag:'Like New', location:'Rabat Center',    title:'Apple MagSafe Duo Wireless Charger',        price:1250,  image:IMGS.magsafe },
  { id:'g6', badge:'diamond', tag:'New',      location:'Rabat, Souissi',  title:'Samsung T7 Shield 2TB Portable SSD',        price:1850,  image:IMGS.samsung },
  { id:'g7', badge:'verified',tag:'Used',     location:'Rabat Center',    title:'Belkin 3-in-1 Wireless Charging Stand',     price:1150,  image:IMGS.belkin },
  { id:'g8', badge:'pro',     tag:'New',      location:'Rabat, Hay Riad', title:'Elgato Stream Deck MK.2 Production Hub',    price:1600,  image:IMGS.elgato },
]

const gridRow2: Product[] = [
  { id:'h1', badge:'verified',tag:'New', location:'Rabat, Agdal',    title:'Canon EOS R1',         price:85000,    image:IMGS.canon },
  { id:'h2', badge:'diamond', tag:'New', location:'Rabat, Souissi',  title:'Richard Mille McLaren',price:1200000,  image:IMGS.richard },
  { id:'h3', badge:'verified',tag:'New', location:'Rabat Center',    title:'Pink Pearl Necklace',  price:12000,    image:IMGS.necklace },
  { id:'h4', badge:'pro',     tag:'New', location:'Rabat, Hay Riad', title:'Cartier Panthère',     price:95000,    image:IMGS.cartier },
]

const gridRow3: Product[] = [
  { id:'j1', badge:'diamond', tag:'New', location:'Rabat, Souissi',  title:'Patek Philippe',       price:1450000,  image:IMGS.patek },
  { id:'j2', badge:'verified',tag:'New', location:'Rabat Center',    title:'Ruby Brooch',          price:45000,    image:IMGS.ruby },
  { id:'j3', badge:'pro',     tag:'New', location:'Rabat, Agdal',    title:'Bulgari Serpenti',     price:185000,   image:IMGS.bulgari },
  { id:'j4', badge:'diamond', tag:'New', location:'Rabat, Hay Riad', title:'AP Royal Oak Ghost',   price:540000,   image:IMGS.ap },
]

/* ─── BADGE ─────────────────────────────────────────────────── */
function Badge({ type }: { type: BadgeType }) {
  if (type === 'diamond') return (
    <span style={{ backgroundColor:'#2dd4bf', color:'white', fontSize:'9px', fontWeight:900, padding:'4px 10px', borderRadius:'100px', display:'flex', alignItems:'center', gap:'3px', textTransform:'uppercase' as const, letterSpacing:'0.06em', boxShadow:'0 2px 8px rgba(0,107,95,0.3)' }}>
      ◆ Diamond Member
    </span>
  )
  if (type === 'pro') return (
    <span style={{ backgroundColor:'#62fae3', color:'#00201c', fontSize:'9px', fontWeight:700, padding:'4px 10px', borderRadius:'100px', display:'flex', alignItems:'center', gap:'3px', textTransform:'uppercase' as const, letterSpacing:'0.06em' }}>
      ✓ Pro Seller
    </span>
  )
  return (
    <span style={{ backgroundColor:'#dde4e1', color:'#3c4a46', fontSize:'9px', fontWeight:700, padding:'4px 10px', borderRadius:'100px', display:'flex', alignItems:'center', gap:'3px', textTransform:'uppercase' as const, letterSpacing:'0.06em' }}>
      ✓ Verified
    </span>
  )
}

/* ─── TALL CARD (featured/arrivals — 4:5 aspect) ──────────── */
function TallCard({ item }: { item: Product }) {
  const [saved, setSaved] = useState(false)
  const [hov, setHov] = useState(false)
  return (
    <article onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{ backgroundColor:'rgba(255,255,255,0.72)', backdropFilter:'blur(16px)', border:'1px solid rgba(255,255,255,0.45)', borderRadius:'40px', overflow:'hidden', boxShadow:hov?'0 20px 40px rgba(0,0,0,0.1)':'0 4px 16px rgba(0,107,95,0.05)', transition:'all 0.3s', transform:hov?'translateY(-4px)':'none', display:'flex', flexDirection:'column' as const, cursor:'pointer' }}>
      <div style={{ position:'relative', aspectRatio:'4/5', overflow:'hidden', backgroundColor:'#d4dcd9' }}>
        <img src={item.image} alt={item.title} style={{ width:'100%', height:'100%', objectFit:'cover', transition:'transform 0.5s', transform:hov?'scale(1.1)':'scale(1)' }} />
        <div style={{ position:'absolute', top:'12px', left:'12px', zIndex:10 }}><Badge type={item.badge} /></div>
        <button onClick={e=>{e.stopPropagation();setSaved(!saved)}} style={{ position:'absolute', top:'10px', right:'10px', zIndex:10, width:'38px', height:'38px', borderRadius:'50%', backgroundColor:'rgba(255,255,255,0.85)', backdropFilter:'blur(8px)', border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}>
          <Heart size={16} fill={saved?'#ef4444':'none'} color={saved?'#ef4444':'#161d1b'} />
        </button>
      </div>
      <div style={{ padding:'20px', flex:1, display:'flex', flexDirection:'column' as const }}>
        <div style={{ display:'flex', alignItems:'center', gap:'6px', marginBottom:'8px' }}>
          <span style={{ fontSize:'12px', fontWeight:700, color:'#2dd4bf' }}>{item.tag}</span>
          <span style={{ width:'4px', height:'4px', borderRadius:'50%', backgroundColor:'#6b7a76' }} />
          <span style={{ fontSize:'12px', color:'#6b7a76' }}>{item.location}</span>
        </div>
        <h3 style={{ fontSize:'18px', fontWeight:600, color:hov?'#2dd4bf':'#161d1b', marginBottom:'8px', lineHeight:1.35, transition:'color 0.2s', display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical' as const, overflow:'hidden', minHeight:'48px' }}>{item.title}</h3>
        <p style={{ fontSize:'22px', fontWeight:800, color:'#2dd4bf', marginBottom:'16px' }}>{item.price.toLocaleString()} MAD</p>
        <div style={{ marginTop:'auto', paddingTop:'16px', borderTop:'1px solid rgba(186,202,197,0.15)', display:'flex', gap:'8px' }}>
          <button style={{ flex:1, backgroundColor:'#e8efec', border:'none', padding:'10px', borderRadius:'14px', fontSize:'12px', fontWeight:700, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', gap:'6px', color:'#161d1b', transition:'background 0.15s' }}
            onMouseEnter={e=>e.currentTarget.style.backgroundColor='rgba(0,107,95,0.1)'}
            onMouseLeave={e=>e.currentTarget.style.backgroundColor='#e8efec'}
          >💬 Message</button>
          <button style={{ flex:1, backgroundColor:'rgba(37,211,102,0.1)', border:'none', padding:'10px', borderRadius:'14px', fontSize:'12px', fontWeight:700, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', gap:'6px', color:'#25D366', transition:'background 0.15s' }}
            onMouseEnter={e=>e.currentTarget.style.backgroundColor='rgba(37,211,102,0.2)'}
            onMouseLeave={e=>e.currentTarget.style.backgroundColor='rgba(37,211,102,0.1)'}
          >📞 WhatsApp</button>
        </div>
      </div>
    </article>
  )
}

/* ─── SQUARE CARD (grid rows) ──────────────────────────────── */
function SquareCard({ item }: { item: Product }) {
  const [saved, setSaved] = useState(false)
  const [hov, setHov] = useState(false)
  return (
    <article onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{ backgroundColor:'rgba(255,255,255,0.72)', backdropFilter:'blur(16px)', border:'1px solid rgba(186,202,197,0.35)', borderRadius:'40px', overflow:'hidden', boxShadow:hov?'0 12px 30px rgba(0,0,0,0.08)':'0 2px 8px rgba(0,107,95,0.04)', transition:'all 0.3s', transform:hov?'translateY(-4px)':'none', display:'flex', flexDirection:'column' as const, cursor:'pointer' }}>
      <div style={{ position:'relative', aspectRatio:'1/1', overflow:'hidden', backgroundColor:'#d4dcd9' }}>
        <img src={item.image} alt={item.title} style={{ width:'100%', height:'100%', objectFit:'cover', transition:'transform 0.5s', transform:hov?'scale(1.05)':'scale(1)' }} />
        <div style={{ position:'absolute', bottom:'8px', left:'8px', backgroundColor:'rgba(255,255,255,0.85)', backdropFilter:'blur(6px)', padding:'3px 8px', borderRadius:'6px' }}>
          <span style={{ fontSize:'9px', fontWeight:700, color:'#2dd4bf', textTransform:'uppercase' as const }}>{item.tag}</span>
        </div>
        <button onClick={e=>{e.stopPropagation();setSaved(!saved)}} style={{ position:'absolute', top:'8px', right:'8px', width:'32px', height:'32px', borderRadius:'50%', backgroundColor:'rgba(255,255,255,0.85)', border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}>
          <Heart size={14} fill={saved?'#ef4444':'none'} color={saved?'#ef4444':'#3c4a46'} />
        </button>
      </div>
      <div style={{ padding:'20px', flex:1, display:'flex', flexDirection:'column' as const }}>
        <h4 style={{ fontSize:'16px', fontWeight:700, color:hov?'#2dd4bf':'#161d1b', marginBottom:'4px', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' as const, transition:'color 0.2s' }}>{item.title}</h4>
        <p style={{ fontSize:'12px', color:'#6b7a76', marginBottom:'10px' }}>{item.location}</p>
        <p style={{ fontSize:'18px', fontWeight:900, color:'#2dd4bf', marginBottom:'12px' }}>{item.price.toLocaleString()} MAD</p>
        <div style={{ marginTop:'auto', display:'flex', gap:'8px' }}>
          <button style={{ flex:1, padding:'8px', borderRadius:'10px', border:'1px solid rgba(186,202,197,0.5)', backgroundColor:'transparent', fontSize:'12px', fontWeight:700, cursor:'pointer', color:'#161d1b', transition:'background 0.15s' }}
            onMouseEnter={e=>e.currentTarget.style.backgroundColor='#e8efec'}
            onMouseLeave={e=>e.currentTarget.style.backgroundColor='transparent'}
          >Message</button>
          <button style={{ flex:1, padding:'8px', borderRadius:'10px', backgroundColor:'rgba(0,107,95,0.08)', border:'none', fontSize:'12px', fontWeight:700, cursor:'pointer', color:'#2dd4bf', transition:'background 0.15s' }}
            onMouseEnter={e=>e.currentTarget.style.backgroundColor='rgba(0,107,95,0.15)'}
            onMouseLeave={e=>e.currentTarget.style.backgroundColor='rgba(0,107,95,0.08)'}
          >Call</button>
        </div>
      </div>
    </article>
  )
}

/* ─── PAGE ──────────────────────────────────────────────────── */
export default function AccessoriesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = React.use(params)
  const [activeBrand, setActiveBrand] = useState('All Brands')
  const [activeSeller, setActiveSeller] = useState('All Sellers (4,812)')
  const [diamondFirst, setDiamondFirst] = useState(true)
  const [page, setPage] = useState(1)
  const [keyword, setKeyword] = useState('')

  const brands = ['All Brands','Bose','Sony','JBL','GoPro','Logitech','Samsung','Apple','Sennheiser']
  const categoryCards = [
    { icon:'🎧', label:'Headphones' },
    { icon:'🔊', label:'Soundbars' },
    { icon:'📷', label:'Action Cams' },
    { icon:'🎮', label:'Gaming Gear' },
    { icon:'🔋', label:'Portable Power' },
  ]

  return (
    <div style={{ fontFamily:'Hanken Grotesk, Inter, sans-serif', backgroundColor:'#f4fbf8', minHeight:'100vh', color:'#161d1b' }}>

      {/* ── HERO ── */}
      <section style={{ position:'relative', width:'100%', height:'400px', display:'flex', alignItems:'center', justifyContent:'center', overflow:'hidden' }}>
        <img src={IMGS.hero} alt="Electronics Hero"
          style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover', opacity:0.6 }}
        />
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(180deg, transparent 0%, rgba(244,251,248,0.4) 50%, #f4fbf8 100%)' }} />
        <div style={{ position:'relative', zIndex:10, width:'100%', maxWidth:'900px', padding:'0 40px', display:'flex', flexDirection:'column' as const, alignItems:'center' }}>
          <h1 style={{ fontSize:'48px', fontWeight:700, color:'white', marginBottom:'28px', textAlign:'center', letterSpacing:'-0.02em', lineHeight:1.1, textShadow:'0 2px 12px rgba(0,0,0,0.3)' }}>
            Discover Your Best Accessories in Rabat
          </h1>
          {/* Hero search */}
          <div style={{ width:'100%', backgroundColor:'rgba(255,255,255,0.12)', backdropFilter:'blur(12px)', border:'1px solid rgba(255,255,255,0.35)', borderRadius:'48px', padding:'8px', display:'flex', gap:'8px' }}>
            <div style={{ flex:1, display:'flex', alignItems:'center', backgroundColor:'rgba(244,251,248,0.55)', borderRadius:'100px', padding:'0 20px', transition:'background 0.2s' }}>
              <Search size={20} color="#6b7a76" style={{ marginRight:'10px', flexShrink:0 }} />
              <input type="text" value={keyword} onChange={e=>setKeyword(e.target.value)} placeholder="Search for headphones, gaming gear, chargers..."
                style={{ flex:1, backgroundColor:'transparent', border:'none', outline:'none', fontSize:'16px', fontFamily:'Hanken Grotesk, sans-serif', color:'#161d1b', padding:'14px 0' }}
              />
            </div>
            <div style={{ flex:1, display:'flex', alignItems:'center', backgroundColor:'rgba(244,251,248,0.55)', borderRadius:'100px', padding:'0 20px' }}>
              <MapPin size={20} color="#6b7a76" style={{ marginRight:'10px', flexShrink:0 }} />
              <select style={{ flex:1, backgroundColor:'transparent', border:'none', outline:'none', fontSize:'16px', fontFamily:'Hanken Grotesk, sans-serif', color:'#161d1b', cursor:'pointer', padding:'14px 0', appearance:'none' as const }}>
                <option>All Morocco</option>
                <option selected>Rabat</option>
                <option>Casablanca</option>
              </select>
              <ChevronDown size={18} color="#6b7a76" />
            </div>
            <button style={{ backgroundColor:'#2dd4bf', color:'white', border:'none', padding:'14px 36px', borderRadius:'100px', fontWeight:700, fontSize:'14px', cursor:'pointer', display:'flex', alignItems:'center', gap:'8px', transition:'all 0.2s' }}
              onMouseEnter={e=>e.currentTarget.style.backgroundColor='#2dd4bf'}
              onMouseLeave={e=>e.currentTarget.style.backgroundColor='#2dd4bf'}
            ><Search size={18} /> Search</button>
          </div>
        </div>
      </section>

      {/* ── ADVANCED FILTER BAR ── */}
      <div style={{ maxWidth:'1440px', margin:'-40px auto 28px', padding:'0 40px', position:'relative', zIndex:20 }}>
        <div style={{ backgroundColor:'rgba(255,255,255,0.85)', backdropFilter:'blur(16px)', border:'1px solid rgba(186,202,197,0.35)', borderRadius:'100px', boxShadow:'0 8px 32px rgba(0,107,95,0.06)', display:'flex', alignItems:'center', padding:'6px 6px' }}>
          {[
            { label:'CITY', val:'Rabat', type:'select' },
            { label:'KEYWORD', val:'Gaming, Audio, Smart Home...', type:'input' },
            { label:'CONDITION', val:'Select', type:'select' },
            { label:'PRICE (MAD)', val:'Select', type:'select' },
            { label:'FILTERS', val:'All Filters', type:'tune' },
          ].map((f, i, arr) => (
            <React.Fragment key={f.label}>
              <div style={{ flex: f.type==='input' ? 2 : 1, padding:'8px 16px', borderRight: i < arr.length-1 ? '1px solid rgba(186,202,197,0.25)' : 'none' }}>
                <div style={{ fontSize:'9px', fontWeight:700, textTransform:'uppercase' as const, letterSpacing:'0.12em', color:'#6b7a76', marginBottom:'3px' }}>{f.label}</div>
                {f.type === 'input'
                  ? <div style={{ display:'flex', alignItems:'center', gap:'6px' }}>
                      <input type="text" placeholder={f.val} style={{ flex:1, backgroundColor:'transparent', border:'none', outline:'none', fontSize:'15px', fontFamily:'Hanken Grotesk, sans-serif', color:'#161d1b' }} />
                      <Search size={16} color="#2dd4bf" />
                    </div>
                  : f.type === 'tune'
                  ? <div style={{ display:'flex', alignItems:'center', gap:'6px', cursor:'pointer' }}>
                      <span style={{ fontSize:'15px', color:'#161d1b' }}>{f.val}</span>
                      <SlidersHorizontal size={16} color="#6b7a76" />
                    </div>
                  : <div style={{ display:'flex', alignItems:'center', gap:'4px', cursor:'pointer' }}>
                      <span style={{ fontSize:'15px', color: f.val==='Rabat'?'#161d1b':'rgba(22,29,27,0.5)' }}>{f.val}</span>
                      <ChevronDown size={16} color="#6b7a76" />
                    </div>
                }
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>

      <div style={{ maxWidth:'1440px', margin:'0 auto', padding:'0 40px' }}>

        {/* ── BREADCRUMB ── */}
        <nav style={{ display:'flex', alignItems:'center', gap:'6px', fontSize:'13px', color:'rgba(60,74,70,0.7)', marginBottom:'20px' }}>
          {['Rabat','Vault','Electronics','Accessories'].map((crumb, i, arr) => (
            <React.Fragment key={crumb}>
              {i < arr.length-1
                ? <><a href="#" style={{ color:'rgba(60,74,70,0.7)', textDecoration:'none', transition:'color 0.15s' }} onMouseEnter={e=>e.currentTarget.style.color='#2dd4bf'} onMouseLeave={e=>e.currentTarget.style.color='rgba(60,74,70,0.7)'}>{crumb}</a><span style={{ fontSize:'14px' }}>›</span></>
                : <span style={{ fontWeight:600, color:'#161d1b' }}>{crumb}</span>
              }
            </React.Fragment>
          ))}
        </nav>

        {/* ── TITLE + SORT ── */}
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', gap:'16px', marginBottom:'16px', flexWrap:'wrap' as const }}>
          <div>
            <h1 style={{ fontSize:'24px', fontWeight:600, color:'#161d1b', letterSpacing:'-0.01em', marginBottom:'4px' }}>New and Used Electronic Accessories in Rabat</h1>
            <p style={{ fontSize:'16px', color:'#6b7a76' }}>4,812 Ads in Rabat District</p>
          </div>
          <div style={{ display:'flex', gap:'10px' }}>
            {[{icon:<ArrowUpDown size={16}/>, label:'Sort: Default'},{icon:<Bookmark size={16}/>, label:'Save Search'}].map(btn=>(
              <button key={btn.label} style={{ display:'flex', alignItems:'center', gap:'6px', padding:'10px 18px', borderRadius:'14px', border:'1px solid rgba(186,202,197,0.4)', backgroundColor:'#eef5f2', cursor:'pointer', fontSize:'13px', fontWeight:600, color:'#161d1b', transition:'background 0.15s' }}
                onMouseEnter={e=>e.currentTarget.style.backgroundColor='#e2eae7'}
                onMouseLeave={e=>e.currentTarget.style.backgroundColor='#eef5f2'}
              >{btn.icon}{btn.label}</button>
            ))}
          </div>
        </div>

        {/* ── CATEGORY ICON GRID ── */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(5,1fr)', gap:'16px', marginBottom:'28px' }}>
          {categoryCards.map(cat=>(
            <a key={cat.label} href="#" style={{ backgroundColor:'white', padding:'24px', borderRadius:'40px', display:'flex', flexDirection:'column' as const, alignItems:'center', gap:'12px', border:'1px solid rgba(186,202,197,0.25)', textDecoration:'none', boxShadow:'0 2px 8px rgba(0,0,0,0.04)', transition:'all 0.2s' }}
              onMouseEnter={e=>{(e.currentTarget as HTMLAnchorElement).style.borderColor='rgba(0,107,95,0.4)';(e.currentTarget as HTMLAnchorElement).style.transform='translateY(-2px)'}}
              onMouseLeave={e=>{(e.currentTarget as HTMLAnchorElement).style.borderColor='rgba(186,202,197,0.25)';(e.currentTarget as HTMLAnchorElement).style.transform='none'}}
            >
              <span style={{ fontSize:'40px' }}>{cat.icon}</span>
              <span style={{ fontSize:'13px', fontWeight:700, color:'#161d1b' }}>{cat.label}</span>
            </a>
          ))}
        </div>

        {/* ── BRAND PILLS ── */}
        <div style={{ display:'flex', gap:'10px', overflowX:'auto' as const, paddingBottom:'8px', marginBottom:'8px' }}>
          {brands.map(brand=>(
            <button key={brand} onClick={()=>setActiveBrand(brand)}
              style={{ whiteSpace:'nowrap' as const, padding:'10px 22px', borderRadius:'100px', fontSize:'13px', fontWeight:600, border:'1px solid', cursor:'pointer', transition:'all 0.15s',
                backgroundColor: activeBrand===brand ? '#2dd4bf' : '#e8efec',
                color: activeBrand===brand ? 'white' : '#161d1b',
                borderColor: activeBrand===brand ? '#2dd4bf' : 'rgba(186,202,197,0.4)',
                boxShadow: activeBrand===brand ? '0 2px 8px rgba(0,107,95,0.25)' : 'none',
              }}
            >{brand}</button>
          ))}
          <button style={{ whiteSpace:'nowrap' as const, padding:'10px 16px', borderRadius:'100px', fontSize:'13px', fontWeight:700, border:'none', backgroundColor:'transparent', cursor:'pointer', color:'#2dd4bf', display:'flex', alignItems:'center', gap:'4px' }}>
            View More <ChevronDown size={16} />
          </button>
        </div>

        {/* ── DISCOVERY CONTROLS ── */}
        <div style={{ padding:'16px 0', borderTop:'1px solid rgba(186,202,197,0.25)', marginBottom:'32px' }}>
          {/* Row 1: New Arrivals + Price Drop + Diamond */}
          <div style={{ display:'flex', alignItems:'center', gap:'14px', marginBottom:'14px', flexWrap:'wrap' as const }}>
            <span style={{ backgroundColor:'rgba(45,212,191,0.15)', color:'#2dd4bf', fontSize:'13px', fontWeight:600, padding:'6px 14px', borderRadius:'100px', display:'flex', alignItems:'center', gap:'4px' }}>
              <Zap size={14} /> New Arrivals
            </span>
            <span style={{ backgroundColor:'rgba(96,94,88,0.1)', color:'#605e58', fontSize:'13px', fontWeight:600, padding:'6px 14px', borderRadius:'100px', display:'flex', alignItems:'center', gap:'4px' }}>
              <TrendingDown size={14} /> Price Drop Alert
            </span>
            <div style={{ width:'1px', height:'16px', backgroundColor:'rgba(186,202,197,0.4)' }} />
            <div style={{ display:'flex', alignItems:'center', gap:'8px', cursor:'pointer' }} onClick={()=>setDiamondFirst(!diamondFirst)}>
              <span style={{ fontSize:'13px', fontWeight:600, color:'#6b7a76' }}>Show Diamond Verified First</span>
              <div style={{ width:'36px', height:'20px', borderRadius:'100px', backgroundColor:diamondFirst?'#2dd4bf':'#bacac5', position:'relative', transition:'background 0.25s' }}>
                <div style={{ position:'absolute', top:'2px', left:diamondFirst?'18px':'2px', width:'16px', height:'16px', borderRadius:'50%', backgroundColor:'white', transition:'left 0.25s' }} />
              </div>
            </div>
          </div>
          {/* Row 2: Seller tabs + sort */}
          <div style={{ display:'flex', alignItems:'center', gap:'10px', flexWrap:'wrap' as const }}>
            {['All Sellers (4,812)','SouKni Members (3,110)','SouKni Pro (1,702)'].map(tab=>(
              <button key={tab} onClick={()=>setActiveSeller(tab)}
                style={{ display:'flex', alignItems:'center', gap:'6px', padding:'8px 16px', borderRadius:'100px', fontSize:'13px', fontWeight:600, cursor:'pointer', transition:'all 0.15s', border:'1px solid',
                  backgroundColor: activeSeller===tab ? 'rgba(45,212,191,0.18)' : '#e8efec',
                  borderColor: activeSeller===tab ? '#2dd4bf' : 'rgba(186,202,197,0.4)',
                  color: activeSeller===tab ? '#2dd4bf' : '#6b7a76',
                }}
              >{tab==='All Sellers (4,812)'?'👥':tab.includes('Members')?'👤':'🛡'} {tab}</button>
            ))}
            <div style={{ marginLeft:'auto', display:'flex', gap:'10px' }}>
              {[{icon:<ArrowUpDown size={15}/>, label:'Sort: Featured'},{icon:<Bookmark size={15}/>, label:'Save Search'}].map(btn=>(
                <button key={btn.label} style={{ display:'flex', alignItems:'center', gap:'6px', padding:'8px 16px', borderRadius:'100px', border:'1px solid rgba(186,202,197,0.4)', backgroundColor:'#eef5f2', cursor:'pointer', fontSize:'13px', fontWeight:600, color:'#161d1b', transition:'background 0.15s' }}
                  onMouseEnter={e=>e.currentTarget.style.backgroundColor='#e2eae7'}
                  onMouseLeave={e=>e.currentTarget.style.backgroundColor='#eef5f2'}
                >{btn.icon}{btn.label}</button>
              ))}
            </div>
          </div>
        </div>

        {/* ── FEATURED PREMIUM ELECTRONICS ── */}
        <div style={{ marginBottom:'48px' }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'24px' }}>
            <h2 style={{ fontSize:'24px', fontWeight:700, color:'#2dd4bf', letterSpacing:'-0.01em' }}>Featured Premium Electronics</h2>
            <a href="#" style={{ fontSize:'13px', fontWeight:700, color:'#2dd4bf', textDecoration:'none', display:'flex', alignItems:'center', gap:'4px' }}>View all Featured <ChevronRight size={16} /></a>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'16px' }}>
            {featuredPremium.map(item=><TallCard key={item.id} item={item} />)}
          </div>
        </div>

        {/* ── NEW ARRIVALS ── */}
        <div style={{ marginBottom:'48px' }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'24px' }}>
            <h2 style={{ fontSize:'24px', fontWeight:700, color:'#2dd4bf', letterSpacing:'-0.01em' }}>New Arrivals in Rabat</h2>
            <a href="#" style={{ fontSize:'13px', fontWeight:700, color:'#2dd4bf', textDecoration:'none', display:'flex', alignItems:'center', gap:'4px' }}>View all New <ChevronRight size={16} /></a>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'16px' }}>
            {newArrivals.map(item=><TallCard key={item.id} item={item} />)}
          </div>
        </div>

        {/* ── DUAL BANNERS: Join SouKni + Electro Pro ── */}
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'16px', marginBottom:'48px' }}>
          {/* Join SouKni Family */}
          <div style={{ position:'relative', borderRadius:'40px', overflow:'hidden', padding:'40px', display:'flex', flexDirection:'column' as const, justifyContent:'center', minHeight:'300px', backgroundColor:'#2dd4bf' }}>
            <img src={IMGS.hero} alt="" style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover', opacity:0.3 }} />
            <div style={{ position:'relative', zIndex:1, maxWidth:'340px' }}>
              <h2 style={{ fontSize:'36px', fontWeight:700, color:'white', marginBottom:'16px', letterSpacing:'-0.02em', lineHeight:1.2 }}>Join the SouKni Family</h2>
              <p style={{ fontSize:'18px', color:'rgba(255,255,255,0.9)', marginBottom:'28px', lineHeight:1.6 }}>Start selling your tech items today for free and reach millions of buyers in Morocco.</p>
              <button style={{ backgroundColor:'white', color:'#2dd4bf', border:'none', padding:'16px 32px', borderRadius:'100px', fontWeight:900, fontSize:'13px', cursor:'pointer', letterSpacing:'0.08em', textTransform:'uppercase' as const, boxShadow:'0 8px 24px rgba(0,0,0,0.15)', transition:'transform 0.2s' }}
                onMouseEnter={e=>e.currentTarget.style.transform='scale(1.04)'}
                onMouseLeave={e=>e.currentTarget.style.transform='scale(1)'}
              >Register as Individual</button>
            </div>
          </div>
          {/* Electro Pro */}
          <div style={{ position:'relative', borderRadius:'40px', overflow:'hidden', padding:'40px', display:'flex', flexDirection:'column' as const, justifyContent:'center', minHeight:'300px', backgroundColor:'#dde4e1', border:'2px solid rgba(0,107,95,0.18)' }}>
            <img src={IMGS.hero} alt="" style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover', opacity:0.2 }} />
            <div style={{ position:'relative', zIndex:1, maxWidth:'340px' }}>
              <div style={{ fontSize:'11px', fontWeight:900, color:'#2dd4bf', textTransform:'uppercase' as const, letterSpacing:'0.15em', marginBottom:'12px' }}>Solutions for agents</div>
              <h2 style={{ fontSize:'36px', fontWeight:700, color:'#161d1b', marginBottom:'16px', letterSpacing:'-0.02em', lineHeight:1.2 }}>SouKni Electro Pro</h2>
              <p style={{ fontSize:'18px', color:'#6b7a76', marginBottom:'28px', lineHeight:1.6 }}>Boost your electronics store visibility with our premium listing dashboard and analytics.</p>
              <button style={{ backgroundColor:'#2dd4bf', color:'white', border:'none', padding:'16px 32px', borderRadius:'100px', fontWeight:900, fontSize:'13px', cursor:'pointer', letterSpacing:'0.08em', textTransform:'uppercase' as const, boxShadow:'0 8px 24px rgba(0,107,95,0.25)', transition:'transform 0.2s' }}
                onMouseEnter={e=>e.currentTarget.style.transform='scale(1.04)'}
                onMouseLeave={e=>e.currentTarget.style.transform='scale(1)'}
              >Discover Pro Tools</button>
            </div>
          </div>
        </div>

        {/* ── GRID ROW 1 (8 square cards) ── */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'16px', marginBottom:'48px' }}>
          {gridRow1.map(item=><SquareCard key={item.id} item={item} />)}
        </div>

        {/* ── GRID ROW 2 (4 square cards — cameras & timepieces) ── */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'16px', marginBottom:'16px' }}>
          {gridRow2.map(item=><SquareCard key={item.id} item={item} />)}
        </div>

        {/* ── GRID ROW 3 (4 more) ── */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'16px', marginBottom:'48px' }}>
          {gridRow3.map(item=><SquareCard key={item.id} item={item} />)}
        </div>

        {/* ── PAGINATION ── */}
        <div style={{ display:'flex', justifyContent:'center', alignItems:'center', gap:'8px', marginBottom:'64px' }}>
          <button style={{ width:'40px', height:'40px', borderRadius:'50%', border:'1px solid rgba(186,202,197,0.4)', backgroundColor:'transparent', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', color:'#6b7a76' }}><ChevronLeft size={18} /></button>
          {[1,2,3].map(p=>(
            <button key={p} onClick={()=>setPage(p)}
              style={{ width:'40px', height:'40px', borderRadius:'50%', border:'1px solid', cursor:'pointer', fontSize:'13px', fontWeight:700, transition:'all 0.15s',
                backgroundColor: page===p ? '#2dd4bf' : 'transparent',
                color: page===p ? 'white' : '#161d1b',
                borderColor: page===p ? '#2dd4bf' : 'rgba(186,202,197,0.4)',
                boxShadow: page===p ? '0 2px 8px rgba(0,107,95,0.3)' : 'none',
              }}
            >{p}</button>
          ))}
          <span style={{ padding:'0 4px', color:'rgba(22,29,27,0.4)', fontSize:'16px' }}>...</span>
          <button style={{ width:'40px', height:'40px', borderRadius:'50%', border:'1px solid rgba(186,202,197,0.4)', backgroundColor:'transparent', cursor:'pointer', fontSize:'13px', fontWeight:700, color:'#161d1b' }}>21</button>
          <button style={{ width:'40px', height:'40px', borderRadius:'50%', border:'1px solid rgba(186,202,197,0.4)', backgroundColor:'transparent', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', color:'#6b7a76' }}><ChevronRight size={18} /></button>
        </div>

        {/* ── BECOME DIAMOND MEMBER BANNER ── */}
        <div style={{ position:'relative', borderRadius:'40px', overflow:'hidden', padding:'48px', textAlign:'center', background:'linear-gradient(135deg, #2dd4bf 0%, #2dd4bf 100%)', marginBottom:'16px', boxShadow:'0 20px 60px rgba(0,107,95,0.25)' }}>
          <img src={IMGS.hero} alt="" style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover', opacity:0.2 }} />
          <div style={{ position:'relative', zIndex:1 }}>
            <h2 style={{ fontSize:'40px', fontWeight:700, color:'white', marginBottom:'16px', letterSpacing:'-0.02em', lineHeight:1.15 }}>Become a Diamond Member</h2>
            <p style={{ fontSize:'18px', color:'rgba(255,255,255,0.92)', marginBottom:'28px', maxWidth:'640px', margin:'0 auto 28px', lineHeight:1.7 }}>Enjoy zero listing fees, unlimited highlighted ads, and a dedicated account manager for your tech business.</p>
            <button style={{ backgroundColor:'white', color:'#2dd4bf', border:'none', padding:'16px 40px', borderRadius:'100px', fontWeight:900, fontSize:'13px', cursor:'pointer', letterSpacing:'0.1em', textTransform:'uppercase' as const, boxShadow:'0 8px 24px rgba(0,0,0,0.15)', transition:'transform 0.2s' }}
              onMouseEnter={e=>e.currentTarget.style.transform='scale(1.05)'}
              onMouseLeave={e=>e.currentTarget.style.transform='scale(1)'}
            >Upgrade to Diamond</button>
          </div>
        </div>

        {/* ── ELECTRO PRO SYNERGY BANNER ── */}
        <div style={{ position:'relative', width:'100%', height:'320px', borderRadius:'40px', overflow:'hidden', marginBottom:'64px' }}>
          <img src={IMGS.hero} alt="SouKni Electro Pro"
            style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover', transition:'transform 0.7s' }}
            onMouseEnter={e=>e.currentTarget.style.transform='scale(1.05)'}
            onMouseLeave={e=>e.currentTarget.style.transform='scale(1)'}
          />
          <div style={{ position:'absolute', inset:0, background:'linear-gradient(to right, rgba(0,0,0,0.72), rgba(0,0,0,0.42) 55%, transparent)', display:'flex', alignItems:'center', justifyContent:'space-between', padding:'0 64px' }}>
            <div style={{ maxWidth:'580px' }}>
              <span style={{ fontSize:'11px', fontWeight:900, color:'#3cddc7', textTransform:'uppercase' as const, letterSpacing:'0.2em', display:'block', marginBottom:'16px' }}>Premier Partnership</span>
              <h2 style={{ fontSize:'48px', fontWeight:700, color:'white', marginBottom:'8px', letterSpacing:'-0.02em', lineHeight:1.1 }}>SouKni Electro Pro</h2>
              <p style={{ fontSize:'18px', color:'rgba(255,255,255,0.9)', lineHeight:1.6 }}>The Gold Standard for Electronics & Accessories in Rabat.</p>
            </div>
            <button style={{ backgroundColor:'#2dd4bf', color:'#0f9b8e', border:'none', padding:'16px 36px', borderRadius:'100px', fontWeight:700, fontSize:'13px', cursor:'pointer', letterSpacing:'0.08em', textTransform:'uppercase' as const, boxShadow:'0 8px 24px rgba(45,212,191,0.35)', transition:'filter 0.2s', whiteSpace:'nowrap' as const }}
              onMouseEnter={e=>e.currentTarget.style.filter='brightness(1.08)'}
              onMouseLeave={e=>e.currentTarget.style.filter='brightness(1)'}
            >Discover Pro Benefits</button>
          </div>
        </div>

      </div>

      {/* ── FOOTER ── */}
    </div>
  )
}
