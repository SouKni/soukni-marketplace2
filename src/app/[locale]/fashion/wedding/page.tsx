'use client'

import { useState } from 'react'
import React from 'react'
import Link from 'next/link'
import { FashionBreadcrumb, FashionFooter, FashionCrossNav, whatsappLink } from '@/components/ui/FashionPageWrapper'
import { Heart, Search, ChevronLeft, ChevronRight } from 'lucide-react'
import FashionFilterBar, { FilterState, DEFAULT_FILTERS } from '@/components/ui/FashionFilterBar'

const IMG = {
  hero:   'https://images.pexels.com/photos/2220316/pexels-photo-2220316.jpeg?auto=compress&w=1600',
  gown:   'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&w=600',
  tux:    'https://images.pexels.com/photos/5935748/pexels-photo-5935748.jpeg?auto=compress&w=600',
  heels:  'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&w=600',
  veil:   'https://images.pexels.com/photos/2220316/pexels-photo-2220316.jpeg?auto=compress&w=600',
  venue:  'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&w=1200',
  car:    'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&w=1200',
  expo:   'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&w=1200',
  a1:     'https://images.pexels.com/photos/2220316/pexels-photo-2220316.jpeg?auto=compress&w=600',
  tiara:  'https://images.pexels.com/photos/904350/pexels-photo-904350.jpeg?auto=compress&w=600',
}

type Badge = 'diamond' | 'pro' | 'verified'

function CardBadge({ badge }: { badge?: Badge }) {
  if (!badge) return null
  if (badge === 'diamond') return (
    <span style={{ backgroundColor:'#22d4a8', color:'white', fontSize:'9px', fontWeight:900, padding:'4px 10px', borderRadius:'100px', display:'inline-flex', alignItems:'center', gap:'3px', textTransform:'uppercase' as const, letterSpacing:'0.06em', whiteSpace:'nowrap' as const }}>◆ DIAMOND MEMBER</span>
  )
  if (badge === 'pro') return (
    <span style={{ backgroundColor:'#62fae3', color:'#00201c', fontSize:'9px', fontWeight:700, padding:'4px 10px', borderRadius:'100px', textTransform:'uppercase' as const, letterSpacing:'0.06em', whiteSpace:'nowrap' as const }}>✓ PRO SELLER</span>
  )
  return (
    <span style={{ backgroundColor:'#dde4e1', color:'#3c4a46', fontSize:'9px', fontWeight:700, padding:'4px 10px', borderRadius:'100px', display:'inline-flex', alignItems:'center', gap:'3px', textTransform:'uppercase' as const, letterSpacing:'0.06em', whiteSpace:'nowrap' as const }}>✓ VERIFIED</span>
  )
}

function ProductCard({ title, price, location, badge, img, condTag, tall = false }: any) {
  const [saved, setSaved] = useState(false)
  const [hov, setHov] = useState(false)
  return (
    <article onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{ backgroundColor:'rgba(255,255,255,0.72)', backdropFilter:'blur(16px)', border:'1px solid rgba(255,255,255,0.42)', borderRadius:'40px', overflow:'hidden', display:'flex', flexDirection:'column' as const, boxShadow:hov?'0 20px 40px rgba(0,0,0,0.1)':'0 2px 8px rgba(0,0,0,0.04)', transition:'all 0.3s', cursor:'pointer' }}>
      <div style={{ position:'relative', aspectRatio: tall ? '4/5' : '1/1', overflow:'hidden', backgroundColor:'#d4dcd9' }}>
        <img src={img} alt={title} style={{ width:'100%', height:'100%', objectFit:'cover', transition:'transform 0.5s', transform:hov?'scale(1.1)':'scale(1)' }} />
        {badge && <div style={{ position:'absolute', top:'12px', left:'12px', zIndex:10 }}><CardBadge badge={badge} /></div>}
        {condTag && <div style={{ position:'absolute', bottom:'10px', left:'10px', zIndex:10, backgroundColor:'rgba(255,255,255,0.92)', padding:'3px 8px', borderRadius:'6px', fontSize:'9px', fontWeight:900, color:'#22d4a8', textTransform:'uppercase' as const }}>{condTag}</div>}
        <button onClick={e=>{e.stopPropagation();setSaved(!saved)}} style={{ position:'absolute', top:'10px', right:'10px', zIndex:10, width:'38px', height:'38px', borderRadius:'50%', backgroundColor:'rgba(255,255,255,0.82)', backdropFilter:'blur(8px)', border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}>
          <Heart size={16} fill={saved?'#ef4444':'none'} color={saved?'#ef4444':'#6b7a76'} />
        </button>
      </div>
      <div style={{ padding:'18px 20px', display:'flex', flexDirection:'column' as const, flex:1 }}>
        {location && (
          <div style={{ display:'flex', alignItems:'center', gap:'6px', marginBottom:'6px' }}>
            <span style={{ fontSize:'12px', fontWeight:900, color:'#22d4a8', textTransform:'uppercase' as const, letterSpacing:'0.06em' }}>{location.split(',')[0]}</span>
            <span style={{ width:'3px', height:'3px', borderRadius:'50%', backgroundColor:'#6b7a76' }} />
            <span style={{ fontSize:'12px', fontWeight:700, color:'#6b7a76' }}>{(location.split(',')[1] || 'Rabat').trim()}</span>
          </div>
        )}
        <h4 style={{ fontSize:'17px', fontWeight:700, color:hov?'#22d4a8':'#161d1b', marginBottom:'4px', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' as const, transition:'color 0.2s' }}>{title}</h4>
        <p style={{ fontSize:'22px', fontWeight:900, color:'#22d4a8', marginBottom:'14px' }}>{price.toLocaleString()} MAD</p>
        <div style={{ marginTop:'auto', display:'flex', gap:'8px', paddingTop:'14px', borderTop:'1px solid rgba(186,202,197,0.15)' }}>
          <button style={{ flex:1, padding:'10px', borderRadius:'14px', border:'1px solid rgba(186,202,197,0.4)', backgroundColor:'transparent', fontSize:'12px', fontWeight:700, cursor:'pointer', transition:'all 0.15s' }}
            onMouseEnter={e=>{e.currentTarget.style.backgroundColor='#22d4a8';e.currentTarget.style.color='white';e.currentTarget.style.borderColor='#22d4a8'}}
            onMouseLeave={e=>{e.currentTarget.style.backgroundColor='transparent';e.currentTarget.style.color='#161d1b';e.currentTarget.style.borderColor='rgba(186,202,197,0.4)'}}
          >Message</button>
          <button style={{ flex:1, padding:'10px', borderRadius:'14px', border:'none', backgroundColor:'rgba(37,211,102,0.12)', color:'#1a9e4a', fontSize:'12px', fontWeight:700, cursor:'pointer', transition:'all 0.15s' }}
            onMouseEnter={e=>{e.currentTarget.style.backgroundColor='#25D366';e.currentTarget.style.color='white'}}
            onMouseLeave={e=>{e.currentTarget.style.backgroundColor='rgba(37,211,102,0.12)';e.currentTarget.style.color='#1a9e4a'}}
          >WhatsApp</button>
        </div>
      </div>
    </article>
  )
}

/* ── BENTO CARD: self-contained with fixed image height ── */
function BentoCard({ img, title, price, badge, small = false, ctaCol = false }: {
  img: string; title: string; price: number; badge?: Badge; small?: boolean; ctaCol?: boolean
}) {
  const [saved, setSaved] = useState(false)
  const [hov, setHov] = useState(false)
  const imgH = small ? '160px' : ctaCol ? '200px' : '240px'
  return (
    <div onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{ backgroundColor:'rgba(255,255,255,0.78)', backdropFilter:'blur(16px)', border:'1px solid rgba(255,255,255,0.5)', borderRadius:'32px', overflow:'hidden', display:'flex', flexDirection:'column' as const, height:'100%', boxShadow:hov?'0 16px 40px rgba(0,0,0,0.1)':'0 2px 12px rgba(0,0,0,0.05)', transition:'all 0.3s', cursor:'pointer' }}>
      <div style={{ position:'relative', height:imgH, flexShrink:0, overflow:'hidden', backgroundColor:'#d4dcd9' }}>
        <img src={img} alt={title} style={{ width:'100%', height:'100%', objectFit:'cover', transition:'transform 0.5s', transform:hov?'scale(1.06)':'scale(1)' }} />
        <div style={{ position:'absolute', top:'10px', left:'10px' }}>
          {badge === 'diamond' && <span style={{ backgroundColor:'#22d4a8', color:'white', fontSize:'8px', fontWeight:900, padding:'3px 9px', borderRadius:'100px', display:'inline-flex', alignItems:'center', gap:'2px', textTransform:'uppercase' as const, letterSpacing:'0.05em', boxShadow:'0 2px 6px rgba(0,0,0,0.2)' }}>◆ DIAMOND {!small ? 'MEMBER' : ''}</span>}
          {badge === 'pro'     && <span style={{ backgroundColor:'#62fae3', color:'#00201c', fontSize:'8px', fontWeight:700, padding:'3px 9px', borderRadius:'100px', textTransform:'uppercase' as const, letterSpacing:'0.05em', boxShadow:'0 2px 6px rgba(0,0,0,0.1)' }}>✓ PRO SELLER</span>}
          {badge === 'verified'&& <span style={{ backgroundColor:'rgba(255,255,255,0.92)', color:'#3c4a46', fontSize:'8px', fontWeight:700, padding:'3px 9px', borderRadius:'100px', textTransform:'uppercase' as const, letterSpacing:'0.05em' }}>✓ VERIFIED</span>}
        </div>
        <button onClick={e=>{e.stopPropagation();setSaved(!saved)}} style={{ position:'absolute', top:'8px', right:'8px', width:'32px', height:'32px', borderRadius:'50%', backgroundColor:'rgba(255,255,255,0.85)', border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}>
          <Heart size={14} fill={saved?'#ef4444':'none'} color={saved?'#ef4444':'#6b7a76'} />
        </button>
      </div>
      <div style={{ padding: small ? '12px 14px' : '16px 18px', display:'flex', flexDirection:'column' as const, flex:1, justifyContent:'space-between' }}>
        <div>
          <h4 style={{ fontSize: small ? '13px' : '15px', fontWeight:700, color:hov?'#22d4a8':'#161d1b', marginBottom:'4px', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' as const, transition:'color 0.2s', lineHeight:1.3 }}>{title}</h4>
          <p style={{ fontSize: small ? '16px' : '18px', fontWeight:900, color:'#22d4a8', marginBottom: small ? '8px' : '12px' }}>{price.toLocaleString()} MAD</p>
        </div>
        <div style={{ display:'flex', gap:'6px' }}>
          <button style={{ flex:1, padding: small ? '6px 4px' : '8px 4px', borderRadius:'12px', border:'1px solid rgba(186,202,197,0.45)', backgroundColor:'transparent', fontSize:'11px', fontWeight:700, cursor:'pointer', textTransform:'uppercase' as const, letterSpacing:'0.04em', transition:'all 0.15s' }}
            onMouseEnter={e=>{e.currentTarget.style.backgroundColor='#22d4a8';e.currentTarget.style.color='white';e.currentTarget.style.borderColor='#22d4a8'}}
            onMouseLeave={e=>{e.currentTarget.style.backgroundColor='transparent';e.currentTarget.style.color='#161d1b';e.currentTarget.style.borderColor='rgba(186,202,197,0.45)'}}
          >Message</button>
          <button style={{ flex:1, padding: small ? '6px 4px' : '8px 4px', borderRadius:'12px', border:'none', backgroundColor:'#2dd4bf', color:'#0f9b8e', fontSize:'11px', fontWeight:700, cursor:'pointer', textTransform:'uppercase' as const, letterSpacing:'0.04em', transition:'filter 0.15s' }}
            onMouseEnter={e=>e.currentTarget.style.filter='brightness(1.08)'}
            onMouseLeave={e=>e.currentTarget.style.filter='brightness(1)'}
          >WhatsApp</button>
        </div>
      </div>
    </div>
  )
}

const featured = [
  { title:'Luxury White Lace Wedding Gown',  price:42500, location:'Designer, Agdal',   badge:'diamond'  as Badge, img:IMG.gown,  tall:true },
  { title:'Premium Black Three-Piece Tuxedo', price:12800, location:'Tailored, Souissi', badge:'pro'      as Badge, img:IMG.tux,   tall:true },
  { title:'Luxury Silver Bridal Heels',       price:6400,  location:'Crystal, Center',   badge:'diamond'  as Badge, img:IMG.heels, tall:true },
  { title:'Elegant Ivory Bridal Veil',        price:3200,  location:'Handmade, Hay Riad',badge:'verified' as Badge, img:IMG.veil,  tall:true },
]

const gridItems = [
  { title:'Vintage Satin Bridal Dress',     price:18500, location:'Rabat Center', img:IMG.a1,    condTag:'Like New' },
  { title:'Custom Velvet Groom Tux',        price:9200,  location:'Témara',       img:IMG.tux,   condTag:'New' },
  { title:'Designer Diamond Tiara',         price:15400, location:'Agdal',        img:IMG.tiara, condTag:'New' },
  { title:'Italian Silk Bridal Stiletto',   price:4800,  location:'Salé',         img:IMG.heels, condTag:'New' },
  { title:'Silk Mermaid Wedding Gown',      price:22000, location:'Souissi',      img:IMG.gown,  badge:'diamond'  as Badge },
  { title:'Midnight Blue Slim Fit Tuxedo',  price:8500,  location:'Agdal',        img:IMG.tux,   badge:'verified' as Badge },
  { title:'Crystal Embellished Bridal Veil',price:4800,  location:'Rabat Center', img:IMG.veil,  condTag:'NEW' },
  { title:'Ivory Satin Wedding Stilettos',  price:6200,  location:'Hay Riad',     img:IMG.heels, badge:'diamond'  as Badge },
  { title:'Vintage Lace Ballgown',          price:15500, location:'Agdal',        img:IMG.a1,    condTag:'USED' },
  { title:'Classic Black Wedding Suit',     price:7200,  location:'Souissi',      img:IMG.tux,   badge:'diamond'  as Badge },
  { title:'Pearl Inlaid Bridal Tiara',      price:12400, location:'Rabat Center', img:IMG.tiara, badge:'verified' as Badge },
  { title:'Silver Glitter Bridal Pumps',    price:5400,  location:'Hay Riad',     img:IMG.heels, condTag:'NEW' },
  { title:'Bohemian Lace Wedding Dress',    price:18900, location:'Souissi',      img:IMG.gown,  badge:'diamond'  as Badge },
  { title:'Charcoal Grey Three-Piece Suit', price:9800,  location:'Agdal',        img:IMG.tux,   condTag:'USED' },
  { title:'Cathedral Length Lace Veil',     price:5200,  location:'Rabat Center', img:IMG.veil,  badge:'verified' as Badge },
  { title:'Gold Leaf Bridal Hairpiece',     price:3800,  location:'Hay Riad',     img:IMG.tiara, condTag:'NEW',  badge:'diamond' as Badge },
]

export default function WeddingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = React.use(params)
  const [activePill, setActivePill] = useState('All Attire')
  const [activeSeller, setActiveSeller] = useState('All Sellers')
  const [diamond, setDiamond] = useState(true)
  const [page, setPage] = useState(1)
  const [kw, setKw] = useState('')
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS)
  const pills = ['All Attire','Bridal Gowns','Tuxedos','Accessories','Shoes','Jewelry','Decor']

  return (
    <div style={{ fontFamily:'Hanken Grotesk, Inter, sans-serif', backgroundColor:'#f4fbf8', color:'#161d1b' }}>

      {/* ── HERO ── */}
      <section style={{ position:'relative', height:'460px', display:'flex', alignItems:'center', justifyContent:'center', overflow:'hidden' }}>
        <img src={IMG.hero} alt="Wedding" style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover' }} />
        <div style={{ position:'absolute', inset:0, backgroundColor:'rgba(0,0,0,0.42)', backdropFilter:'blur(2px)' }} />
        <div style={{ position:'relative', zIndex:10, width:'100%', maxWidth:'860px', padding:'0 20px', textAlign:'center' as const }}>
          <h1 style={{ fontSize:'clamp(36px,5vw,52px)', fontWeight:900, color:'white', marginBottom:'36px', letterSpacing:'-0.02em', lineHeight:1.1, textShadow:'0 4px 20px rgba(0,0,0,0.4)', fontStyle:'italic' as const }}>
            "Find Your Perfect Wedding Masterpiece"
          </h1>
          <div style={{ backgroundColor:'rgba(255,255,255,0.12)', backdropFilter:'blur(12px)', border:'1px solid rgba(255,255,255,0.22)', borderRadius:'100px', padding:'8px', display:'flex', gap:'8px' }}>
            <div style={{ flex:1.5, display:'flex', alignItems:'center', backgroundColor:'rgba(244,251,248,0.85)', borderRadius:'100px', padding:'10px 20px', gap:'10px' }}>
              <Search size={18} color="#6b7a76" />
              <input type="text" value={kw} onChange={e=>setKw(e.target.value)} placeholder="Search bridal gowns, tuxedos..."
                style={{ flex:1, backgroundColor:'transparent', border:'none', outline:'none', fontSize:'15px', fontFamily:'Hanken Grotesk, sans-serif', color:'#161d1b' }} />
            </div>
            <div style={{ flex:1, display:'flex', alignItems:'center', backgroundColor:'rgba(244,251,248,0.85)', borderRadius:'100px', padding:'10px 20px', gap:'8px' }}>
              <span>📍</span>
              <span style={{ fontSize:'15px', fontWeight:600, color:'#161d1b' }}>All Morocco</span>
            </div>
            <button style={{ backgroundColor:'#22d4a8', color:'white', border:'none', padding:'12px 36px', borderRadius:'100px', fontWeight:700, fontSize:'15px', cursor:'pointer', whiteSpace:'nowrap' as const, transition:'filter 0.15s' }}
              onMouseEnter={e=>e.currentTarget.style.filter='brightness(1.1)'}
              onMouseLeave={e=>e.currentTarget.style.filter='brightness(1)'}
            >🔍 Search</button>
          </div>
        </div>
      </section>

        {/* ── FILTER BAR ── */}
        <div style={{ maxWidth:'1440px', margin:'-44px auto 28px', padding:'0 40px', position:'relative', zIndex:30 }}>
          <FashionFilterBar filters={filters} setFilters={setFilters} />
        </div>


      <div style={{ maxWidth:'1440px', margin:'0 auto', padding:'0 40px 80px' }}>

        {/* ── BREADCRUMB ── */}
        <div style={{ marginBottom:'24px' }}>
        <FashionBreadcrumb pageLabel="Wedding & Eveningwear" />
          <h2 style={{ fontSize:'22px', fontWeight:900, color:'#161d1b', marginBottom:'4px' }}>New and Used Wedding Attire & Accessories in Rabat</h2>
          <p style={{ fontSize:'15px', color:'#6b7a76', fontWeight:500 }}>1,248 Ads in Rabat District</p>
        </div>

        {/* ── CATEGORY PILLS ── */}
        <div style={{ display:'flex', gap:'10px', marginBottom:'28px', overflowX:'auto' as const, paddingBottom:'4px' }}>
          {[...pills,'View More ▾'].map(pill=>(
            <button key={pill} onClick={()=>setActivePill(pill)}
              style={{ whiteSpace:'nowrap' as const, padding:'10px 22px', borderRadius:'100px', fontSize:'13px', fontWeight:700, cursor:'pointer', transition:'all 0.2s', border:'1px solid',
                backgroundColor: activePill===pill ? '#22d4a8' : 'white',
                color: activePill===pill ? 'white' : '#161d1b',
                borderColor: activePill===pill ? '#22d4a8' : 'rgba(186,202,197,0.4)',
              }}
            >{pill}</button>
          ))}
        </div>

        {/* ── UTILITY BAR ── */}
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'14px 0', borderTop:'1px solid rgba(186,202,197,0.25)', borderBottom:'1px solid rgba(186,202,197,0.25)', marginBottom:'20px', flexWrap:'wrap' as const, gap:'12px' }}>
          <div style={{ display:'flex', gap:'8px' }}>
            {['All Sellers','SouKni Members','SouKni Pro'].map(tab=>(
              <button key={tab} onClick={()=>setActiveSeller(tab)}
                style={{ padding:'8px 20px', borderRadius:'100px', fontSize:'13px', fontWeight:700, cursor:'pointer', border:'none', transition:'all 0.2s',
                  backgroundColor: activeSeller===tab ? '#dde4e1' : 'transparent',
                  color: activeSeller===tab ? '#161d1b' : '#6b7a76',
                }}
              >{tab}</button>
            ))}
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:'20px', flexWrap:'wrap' as const }}>
            <div style={{ display:'flex', alignItems:'center', gap:'10px', cursor:'pointer' }} onClick={()=>setDiamond(!diamond)}>
              <span style={{ fontSize:'13px', fontWeight:700, color:'#6b7a76' }}>Show SouKni Diamond Verified First</span>
              <div style={{ width:'44px', height:'22px', borderRadius:'100px', backgroundColor: diamond?'#22d4a8':'#bacac5', position:'relative', transition:'background 0.25s' }}>
                <div style={{ position:'absolute', top:'2px', left: diamond?'24px':'2px', width:'18px', height:'18px', borderRadius:'50%', backgroundColor:'white', transition:'left 0.25s', boxShadow:'0 1px 3px rgba(0,0,0,0.15)' }} />
              </div>
            </div>
            <div style={{ display:'flex', gap:'8px', borderLeft:'1px solid rgba(186,202,197,0.3)', paddingLeft:'16px' }}>
              {[{icon:'↕',label:'Sort: Default'},{icon:'🔔',label:'Save Search'}].map(btn=>(
                <button key={btn.label} style={{ display:'flex', alignItems:'center', gap:'6px', padding:'8px 14px', borderRadius:'12px', border:'1px solid rgba(186,202,197,0.4)', backgroundColor:'#eef5f2', fontSize:'13px', fontWeight:700, cursor:'pointer', color:'#161d1b', transition:'background 0.15s' }}
                  onMouseEnter={e=>e.currentTarget.style.backgroundColor='#e2eae7'}
                  onMouseLeave={e=>e.currentTarget.style.backgroundColor='#eef5f2'}
                >{btn.icon} {btn.label}</button>
              ))}
            </div>
          </div>
        </div>

        {/* ── QUICK FILTERS ── */}
        <div style={{ display:'flex', gap:'10px', marginBottom:'40px' }}>
          {[{icon:'✨',label:'New Arrivals'},{icon:'📉',label:'Price Drop Alert'}].map(btn=>(
            <button key={btn.label} style={{ display:'flex', alignItems:'center', gap:'6px', padding:'8px 20px', borderRadius:'100px', border:'1px solid rgba(186,202,197,0.4)', backgroundColor:'transparent', fontSize:'13px', fontWeight:700, cursor:'pointer', color:'#6b7a76', transition:'all 0.15s' }}
              onMouseEnter={e=>{e.currentTarget.style.borderColor='#22d4a8';e.currentTarget.style.color='#22d4a8'}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor='rgba(186,202,197,0.4)';e.currentTarget.style.color='#6b7a76'}}
            >{btn.icon} {btn.label}</button>
          ))}
        </div>

        {/* ── FEATURED PREMIUM ── */}
        <section style={{ marginBottom:'48px' }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:'20px' }}>
            <h3 style={{ fontSize:'20px', fontWeight:900, color:'#22d4a8', textTransform:'uppercase' as const, letterSpacing:'0.04em' }}>Featured Premium Wedding Wear</h3>
            <a href="#" style={{ fontSize:'13px', fontWeight:700, color:'#22d4a8', textDecoration:'none' }}>View all Featured ›</a>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'16px' }}>
            {featured.map((item,i)=><ProductCard key={i} {...item} />)}
          </div>
        </section>

        {/* ── DUAL INTERSTITIALS ── */}
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'16px', marginBottom:'64px' }}>
          <div style={{ position:'relative', borderRadius:'40px', overflow:'hidden', padding:'40px', display:'flex', flexDirection:'column' as const, justifyContent:'center', minHeight:'280px', backgroundColor:'#22d4a8', boxShadow:'0 16px 40px rgba(0,107,95,0.25)' }}>
            <img src={IMG.venue} alt="" style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover', opacity:0.18 }} />
            <div style={{ position:'relative', zIndex:1, maxWidth:'320px' }}>
              <h2 style={{ fontSize:'32px', fontWeight:900, color:'white', marginBottom:'14px', lineHeight:1.2 }}>SouKni Immo Pro</h2>
              <p style={{ fontSize:'17px', color:'rgba(255,255,255,0.92)', marginBottom:'28px', lineHeight:1.6, fontWeight:500 }}>Find the perfect luxury venue for your Rabat wedding celebration.</p>
              <button style={{ backgroundColor:'white', color:'#22d4a8', border:'none', padding:'14px 32px', borderRadius:'100px', fontWeight:900, fontSize:'13px', cursor:'pointer', textTransform:'uppercase' as const, letterSpacing:'0.06em' }}>Explore Venues</button>
            </div>
          </div>
          <div style={{ position:'relative', borderRadius:'40px', overflow:'hidden', padding:'40px', display:'flex', flexDirection:'column' as const, justifyContent:'center', minHeight:'280px', backgroundColor:'#dde4e1', border:'2px solid rgba(0,107,95,0.18)' }}>
            <img src={IMG.car} alt="" style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover', opacity:0.1 }} />
            <div style={{ position:'relative', zIndex:1, maxWidth:'320px' }}>
              <span style={{ fontSize:'11px', fontWeight:700, color:'#22d4a8', textTransform:'uppercase' as const, letterSpacing:'0.15em', display:'block', marginBottom:'12px' }}>Wedding Solutions</span>
              <h2 style={{ fontSize:'32px', fontWeight:900, color:'#161d1b', marginBottom:'14px', lineHeight:1.2 }}>SouKni Auto Pro</h2>
              <p style={{ fontSize:'17px', color:'#6b7a76', marginBottom:'28px', lineHeight:1.6, fontWeight:500 }}>Arrive in style with our premium luxury wedding car rentals in Rabat.</p>
              <button style={{ backgroundColor:'#22d4a8', color:'white', border:'none', padding:'14px 32px', borderRadius:'100px', fontWeight:900, fontSize:'13px', cursor:'pointer', textTransform:'uppercase' as const, letterSpacing:'0.06em' }}>Rent a Classic</button>
            </div>
          </div>
        </div>

        {/* ── SOUKNI WEDDING COLLECTION BENTO ──
            Layout (4 cols, 2 rows each 380px = 760px total + 16px gap):
            [   LARGE (col 1-2, row 1-2)   ] [ TOP-L ]  [ RIGHT-TALL (row 1-2) ]
                                               [ BOT-L ]
        */}
        <section style={{ marginBottom:'64px' }}>
          <h2 style={{ fontSize:'40px', fontWeight:700, color:'#22d4a8', letterSpacing:'-0.02em', marginBottom:'24px' }}>SouKni Wedding Collection</h2>

          <div style={{
            display:'grid',
            gridTemplateColumns:'2fr 1fr 1fr',
            gridTemplateRows:'380px 380px',
            gap:'16px',
          }}>
            {/* LARGE CARD — spans col 1, rows 1+2 */}
            <div style={{ gridColumn:'1', gridRow:'1 / 3', backgroundColor:'rgba(255,255,255,0.72)', backdropFilter:'blur(16px)', border:'1px solid rgba(255,255,255,0.5)', borderRadius:'40px', overflow:'hidden', display:'flex', flexDirection:'column' as const, boxShadow:'0 4px 20px rgba(0,0,0,0.06)' }}>
              <div style={{ position:'relative', flex:1, overflow:'hidden', backgroundColor:'#d4dcd9', minHeight:0 }}>
                <img src={IMG.gown} alt="Wedding Gown" style={{ width:'100%', height:'100%', objectFit:'cover' }} />
                <div style={{ position:'absolute', top:'14px', left:'14px', zIndex:10 }}>
                  <span style={{ backgroundColor:'#22d4a8', color:'white', fontSize:'9px', fontWeight:900, padding:'4px 12px', borderRadius:'100px', display:'inline-flex', alignItems:'center', gap:'3px', textTransform:'uppercase' as const, boxShadow:'0 2px 8px rgba(0,0,0,0.2)' }}>◆ DIAMOND MEMBER</span>
                </div>
                <button style={{ position:'absolute', top:'12px', right:'12px', zIndex:10, width:'40px', height:'40px', borderRadius:'50%', backgroundColor:'rgba(255,255,255,0.85)', border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}>
                  <Heart size={17} color="#6b7a76" />
                </button>
              </div>
              <div style={{ padding:'22px 24px', backgroundColor:'rgba(255,255,255,0.95)', flexShrink:0 }}>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'16px' }}>
                  <div>
                    <h3 style={{ fontSize:'20px', fontWeight:700, color:'#161d1b', marginBottom:'4px' }}>Luxury White Lace Wedding Gown</h3>
                    <p style={{ fontSize:'13px', fontWeight:700, color:'#6b7a76' }}>Rabat, Agdal</p>
                  </div>
                  <p style={{ fontSize:'24px', fontWeight:900, color:'#22d4a8', whiteSpace:'nowrap' as const }}>42,500 MAD</p>
                </div>
                <div style={{ display:'flex', gap:'10px' }}>
                  <button style={{ flex:1, padding:'12px', borderRadius:'14px', border:'1px solid rgba(186,202,197,0.45)', backgroundColor:'transparent', fontSize:'13px', fontWeight:700, cursor:'pointer', textTransform:'uppercase' as const, transition:'all 0.15s' }}
                    onMouseEnter={e=>{e.currentTarget.style.backgroundColor='#22d4a8';e.currentTarget.style.color='white';e.currentTarget.style.borderColor='#22d4a8'}}
                    onMouseLeave={e=>{e.currentTarget.style.backgroundColor='transparent';e.currentTarget.style.color='#161d1b';e.currentTarget.style.borderColor='rgba(186,202,197,0.45)'}}
                  >Message</button>
                  <button style={{ flex:1, padding:'12px', borderRadius:'14px', border:'none', backgroundColor:'#2dd4bf', color:'#0f9b8e', fontSize:'13px', fontWeight:700, cursor:'pointer', textTransform:'uppercase' as const, transition:'filter 0.15s' }}
                    onMouseEnter={e=>e.currentTarget.style.filter='brightness(1.08)'}
                    onMouseLeave={e=>e.currentTarget.style.filter='brightness(1)'}
                  >WhatsApp</button>
                </div>
              </div>
            </div>

            {/* TOP-MIDDLE — col 2, row 1 */}
            <div style={{ gridColumn:'2', gridRow:'1', overflow:'hidden', borderRadius:'32px' }}>
              <BentoCard img={IMG.veil} title="Elegant Ivory Bridal Veil" price={3200} badge="verified" />
            </div>

            {/* RIGHT TALL — col 3, rows 1+2 */}
            <div style={{ gridColumn:'3', gridRow:'1 / 3', backgroundColor:'rgba(255,255,255,0.72)', backdropFilter:'blur(16px)', border:'1px solid rgba(255,255,255,0.5)', borderRadius:'40px', overflow:'hidden', display:'flex', flexDirection:'column' as const, boxShadow:'0 4px 20px rgba(0,0,0,0.06)' }}>
              <div style={{ position:'relative', flex:1, overflow:'hidden', backgroundColor:'#d4dcd9', minHeight:0 }}>
                <img src={IMG.tux} alt="Tuxedo" style={{ width:'100%', height:'100%', objectFit:'cover' }} />
                <div style={{ position:'absolute', top:'14px', left:'14px', zIndex:10 }}>
                  <span style={{ backgroundColor:'#62fae3', color:'#00201c', fontSize:'9px', fontWeight:700, padding:'4px 12px', borderRadius:'100px', textTransform:'uppercase' as const, boxShadow:'0 2px 8px rgba(0,0,0,0.1)' }}>✓ PRO SELLER</span>
                </div>
                <button style={{ position:'absolute', top:'12px', right:'12px', zIndex:10, width:'40px', height:'40px', borderRadius:'50%', backgroundColor:'rgba(255,255,255,0.85)', border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}>
                  <Heart size={17} color="#6b7a76" />
                </button>
              </div>
              <div style={{ padding:'18px 20px', backgroundColor:'rgba(255,255,255,0.95)', flexShrink:0 }}>
                <h3 style={{ fontSize:'17px', fontWeight:700, color:'#161d1b', marginBottom:'4px' }}>Premium Black Three-Piece Tuxedo</h3>
                <p style={{ fontSize:'13px', fontWeight:700, color:'#6b7a76', marginBottom:'8px' }}>Rabat, Souissi</p>
                <p style={{ fontSize:'20px', fontWeight:900, color:'#22d4a8', marginBottom:'12px' }}>12,800 MAD</p>
                <div style={{ display:'flex', flexDirection:'column' as const, gap:'8px' }}>
                  <button style={{ width:'100%', padding:'10px', borderRadius:'14px', border:'1px solid rgba(186,202,197,0.45)', backgroundColor:'transparent', fontSize:'13px', fontWeight:700, cursor:'pointer', textTransform:'uppercase' as const, transition:'all 0.15s' }}
                    onMouseEnter={e=>{e.currentTarget.style.backgroundColor='#22d4a8';e.currentTarget.style.color='white';e.currentTarget.style.borderColor='#22d4a8'}}
                    onMouseLeave={e=>{e.currentTarget.style.backgroundColor='transparent';e.currentTarget.style.color='#161d1b';e.currentTarget.style.borderColor='rgba(186,202,197,0.45)'}}
                  >Message</button>
                  <button style={{ width:'100%', padding:'10px', borderRadius:'14px', border:'none', backgroundColor:'#2dd4bf', color:'#0f9b8e', fontSize:'13px', fontWeight:700, cursor:'pointer', textTransform:'uppercase' as const, transition:'filter 0.15s' }}
                    onMouseEnter={e=>e.currentTarget.style.filter='brightness(1.08)'}
                    onMouseLeave={e=>e.currentTarget.style.filter='brightness(1)'}
                  >WhatsApp</button>
                </div>
              </div>
            </div>

            {/* BOTTOM-LEFT — col 2, row 2 */}
            <div style={{ gridColumn:'2', gridRow:'2', overflow:'hidden', borderRadius:'32px' }}>
              <BentoCard img={IMG.tiara} title="Limited Edition Diamond Tiara" price={15400} badge="diamond" />
            </div>

          </div>
        </section>

        {/* ── EXPO PRO BANNER ── */}
        <div style={{ position:'relative', borderRadius:'40px', overflow:'hidden', height:'380px', display:'flex', alignItems:'center', justifyContent:'center', boxShadow:'0 20px 60px rgba(0,0,0,0.15)', marginBottom:'64px' }}>
          <img src={IMG.expo} alt="Wedding Expo" style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover' }} />
          <div style={{ position:'absolute', inset:0, backgroundColor:'rgba(0,0,0,0.32)' }} />
          <div style={{ position:'relative', zIndex:1, maxWidth:'600px', padding:'0 20px', textAlign:'center' as const }}>
            <div style={{ backgroundColor:'rgba(255,255,255,0.12)', backdropFilter:'blur(12px)', border:'1px solid rgba(255,255,255,0.22)', padding:'40px 48px', borderRadius:'40px' }}>
              <h2 style={{ fontSize:'44px', fontWeight:900, color:'white', marginBottom:'16px', letterSpacing:'-0.02em' }}>SouKni Wedding Expo Pro</h2>
              <p style={{ fontSize:'18px', color:'rgba(255,255,255,0.92)', marginBottom:'28px', lineHeight:1.6, fontWeight:500 }}>Elevate your bridal business. Connect with thousands of high-end clients today.</p>
              <button style={{ backgroundColor:'#2dd4bf', color:'#0f9b8e', border:'none', padding:'16px 44px', borderRadius:'100px', fontWeight:900, fontSize:'13px', cursor:'pointer', textTransform:'uppercase' as const, letterSpacing:'0.1em' }}>Join the Expo</button>
            </div>
          </div>
        </div>

        {/* ── DISCOVERY GRID ── */}
        {[gridItems.slice(0,4),gridItems.slice(4,8),gridItems.slice(8,12),gridItems.slice(12,16)].map((row,ri)=>(
          <div key={ri} style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'16px', marginBottom:'16px' }}>
            {row.map((item,j)=><ProductCard key={j} {...item} />)}
          </div>
        ))}

        {/* ── PAGINATION ── */}
        <div style={{ display:'flex', justifyContent:'center', alignItems:'center', gap:'8px', margin:'48px 0 64px' }}>
          <button style={{ width:'40px', height:'40px', borderRadius:'50%', border:'1px solid rgba(186,202,197,0.4)', backgroundColor:'transparent', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', color:'#6b7a76' }}><ChevronLeft size={16}/></button>
          {[1,2,3].map(p=>(
            <button key={p} onClick={()=>setPage(p)} style={{ width:'40px', height:'40px', borderRadius:'50%', cursor:'pointer', fontSize:'14px', fontWeight:700, border:'1px solid', transition:'all 0.2s', backgroundColor:page===p?'#22d4a8':'transparent', color:page===p?'white':'#161d1b', borderColor:page===p?'#22d4a8':'rgba(186,202,197,0.4)' }}>{p}</button>
          ))}
          <span style={{ color:'#6b7a76' }}>...</span>
          <button style={{ width:'40px', height:'40px', borderRadius:'50%', border:'1px solid rgba(186,202,197,0.4)', backgroundColor:'transparent', cursor:'pointer', fontSize:'14px', fontWeight:700, color:'#161d1b' }}>42</button>
          <button style={{ width:'40px', height:'40px', borderRadius:'50%', border:'1px solid rgba(186,202,197,0.4)', backgroundColor:'transparent', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', color:'#6b7a76' }}><ChevronRight size={16}/></button>
        </div>

        {/* ── DIAMOND BANNER ── */}
        <div style={{ background:'linear-gradient(135deg,#22d4a8 0%,#2dd4bf 100%)', borderRadius:'40px', padding:'48px', textAlign:'center' as const, position:'relative' as const, overflow:'hidden', marginBottom:'48px', boxShadow:'0 20px 60px rgba(0,107,95,0.3)' }}>
          <div style={{ position:'absolute', inset:0, opacity:0.15 }}><img src={IMG.hero} alt="" style={{ width:'100%', height:'100%', objectFit:'cover' }} /></div>
          <div style={{ position:'relative', zIndex:1 }}>
            <h2 style={{ fontSize:'40px', fontWeight:900, color:'white', marginBottom:'14px', fontStyle:'italic' as const }}>Become a Diamond Member</h2>
            <p style={{ fontSize:'18px', color:'rgba(255,255,255,0.95)', maxWidth:'560px', margin:'0 auto 28px', lineHeight:1.7, fontWeight:500 }}>Enjoy zero listing fees, unlimited highlighted ads, and a dedicated account manager for your bridal boutique.</p>
            <button style={{ backgroundColor:'white', color:'#22d4a8', border:'none', padding:'16px 44px', borderRadius:'100px', fontWeight:900, fontSize:'13px', cursor:'pointer', textTransform:'uppercase' as const, letterSpacing:'0.1em' }}>Upgrade to Diamond</button>
          </div>
        </div>

        {/* ── JOIN SOUKNI ── */}
        <div style={{ position:'relative', borderRadius:'40px', overflow:'hidden', padding:'40px 48px', minHeight:'280px', backgroundColor:'#22d4a8', display:'flex', alignItems:'center', marginBottom:'40px' }}>
          <div style={{ position:'absolute', inset:0, opacity:0.28 }}><img src={IMG.hero} alt="" style={{ width:'100%', height:'100%', objectFit:'cover' }} /></div>
          <div style={{ position:'relative', zIndex:1, maxWidth:'480px' }}>
            <h2 style={{ fontSize:'36px', fontWeight:900, color:'white', marginBottom:'14px' }}>Join the SouKni Family</h2>
            <p style={{ fontSize:'17px', color:'rgba(255,255,255,0.92)', marginBottom:'28px', lineHeight:1.7, fontWeight:500 }}>Start selling your wedding items today for free and reach millions of couples in Morocco.</p>
            <button style={{ backgroundColor:'white', color:'#22d4a8', border:'none', padding:'14px 36px', borderRadius:'100px', fontWeight:900, fontSize:'13px', cursor:'pointer', textTransform:'uppercase' as const, letterSpacing:'0.06em' }}>Register as Individual</button>
          </div>
        </div>
      </div>

      {/* ── FOOTER ── */}
    </div>
  )
}
