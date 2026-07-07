'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { FashionBreadcrumb, FashionFooter, whatsappLink } from '@/components/ui/FashionPageWrapper'
import { Heart, MapPin, MessageCircle, Diamond, ChevronRight } from 'lucide-react'
import FashionFilterBar, { FilterState, DEFAULT_FILTERS } from '@/components/ui/FashionFilterBar'
import { useMarket } from '@/context/MarketContext'

const HERO = 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&w=1600'

const featuredListings = [
  { id:'vf1', title:'Levi\'s 501 Vintage 1980s',      price:1800,  location:'Casablanca', time:'Just now',  badge:'diamond', image:'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&w=600' },
  { id:'vf2', title:'Chanel Tweed Jacket 1990s',      price:28000, location:'Rabat',      time:'1h ago',    badge:'pro',     image:'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&w=600' },
  { id:'vf3', title:'Hermès Silk Scarf Vintage',      price:8500,  location:'Marrakech',  time:'2h ago',    badge:'diamond', image:'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&w=600' },
  { id:'vf4', title:'Dior Saddle Bag 2000s',          price:32000, location:'Tangier',    time:'3h ago',    badge:'diamond', image:'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&w=600' },
]

const bentoListings = [
  { id:'vb1', title:'Gucci Bamboo Bag 1990s',         price:45000, location:'Rabat',      time:'Just now',  badge:'diamond', image:'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&w=600', tall:true },
  { id:'vb2', title:'Louis Vuitton Speedy Vintage',   price:18500, location:'Casablanca', time:'1h ago',    badge:'diamond', image:'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&w=600', tall:false },
  { id:'vb3', title:'Fendi Baguette 1997 Original',   price:22000, location:'Marrakech',  time:'2h ago',    badge:'pro',     image:'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&w=600', tall:false },
  { id:'vb4', title:'Versace Medusa Vintage Tee',     price:4500,  location:'Agadir',     time:'3h ago',    badge:'diamond', image:'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&w=600', tall:false },
]

const collectionRow1 = [
  { id:'vc1', title:'Ralph Lauren Polo Vintage',      price:1200,  location:'Rabat',      time:'Today',     badge:'pro',     image:'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&w=600' },
  { id:'vc2', title:'Tommy Hilfiger 1995 Jacket',     price:2800,  location:'Casablanca', time:'1h ago',    badge:'diamond', image:'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&w=600' },
  { id:'vc3', title:'Burberry Nova Check Scarf',      price:6500,  location:'Marrakech',  time:'2h ago',    badge:'pro',     image:'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&w=600' },
  { id:'vc4', title:'Moschino Belt Bag 1990s',        price:9200,  location:'Tangier',    time:'3h ago',    badge:'diamond', image:'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&w=600' },
]

const collectionRow2 = [
  { id:'vd1', title:'Chanel CC Logo Earrings 1980s',  price:14500, location:'Rabat',      time:'Just now',  badge:'diamond', image:'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&w=600' },
  { id:'vd2', title:'Dior Trotter Pochette',           price:11000, location:'Casablanca', time:'Just now',  badge:'diamond', image:'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&w=600' },
  { id:'vd3', title:'YSL Mombasa Horn Bag',            price:16000, location:'Agadir',     time:'Just now',  badge:'pro',     image:'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&w=600' },
  { id:'vd4', title:'Prada Nylon Backpack 2000s',      price:8500,  location:'Fès',        time:'Just now',  badge:'diamond', image:'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&w=600' },
]

const collectionRow3 = [
  { id:'ve1', title:'Levi\'s Denim Jacket 1970s',     price:3200,  location:'Rabat',      time:'Just now',  badge:'pro',     image:'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&w=600' },
  { id:'ve2', title:'Versace Jeans Couture Shirt',    price:5800,  location:'Casablanca', time:'Just now',  badge:'diamond', image:'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&w=600' },
  { id:'ve3', title:'Helmut Lang Archive Tee',        price:4200,  location:'Marrakech',  time:'Just now',  badge:'pro',     image:'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&w=600' },
  { id:'ve4', title:'Jean Paul Gaultier Mesh Top',    price:7500,  location:'Tangier',    time:'Just now',  badge:'diamond', image:'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&w=600' },
]

const pills = ['All Vintage','1970s','1980s','1990s','2000s','Designer','Streetwear','Denim']

type Listing = { id:string; title:string; price:number; location:string; time:string; badge:string; image:string; tall?:boolean }

function Card({ item, locale }: { item:Listing; locale:string }) {
  const [saved, setSaved] = useState(false)
  const [hovered, setHovered] = useState(false)
  const { formatPrice } = useMarket()
  return (
    <Link href={`/${locale}/listing/${item.id}`} style={{ textDecoration:'none', display:'block', height:'100%' }}>
      <article onMouseEnter={()=>setHovered(true)} onMouseLeave={()=>setHovered(false)}
        style={{ backgroundColor:'white', borderRadius:'20px', overflow:'hidden', border:'1px solid #f1f5f9', boxShadow:hovered?'0 16px 32px rgba(0,0,0,0.1)':'0 2px 8px rgba(0,0,0,0.04)', transition:'all 0.25s', cursor:'pointer', height:'100%', display:'flex', flexDirection:'column' }}>
        <div style={{ position:'relative', aspectRatio:'4/3', overflow:'hidden' }}>
          <img src={item.image} alt={item.title} style={{ width:'100%', height:'100%', objectFit:'cover', transition:'transform 0.5s', transform:hovered?'scale(1.06)':'scale(1)' }} />
          {item.badge==='diamond' && (
            <span style={{ position:'absolute', top:'10px', left:'10px', background:'linear-gradient(135deg,#22d4a8,#0f9b8e)', color:'white', fontSize:'8px', fontWeight:800, padding:'3px 8px', borderRadius:'100px', textTransform:'uppercase', display:'flex', alignItems:'center', gap:'3px' }}>
              <Diamond size={8} /> Diamond
            </span>
          )}
          {item.badge==='pro' && (
            <span style={{ position:'absolute', top:'10px', left:'10px', backgroundColor:'rgba(255,255,255,0.92)', color:'#22d4a8', fontSize:'8px', fontWeight:800, padding:'3px 8px', borderRadius:'100px', textTransform:'uppercase' }}>Pro</span>
          )}
          <button onClick={e=>{e.preventDefault();setSaved(!saved)}}
            style={{ position:'absolute', top:'10px', right:'10px', width:'28px', height:'28px', borderRadius:'50%', backgroundColor:'rgba(255,255,255,0.2)', backdropFilter:'blur(12px)', border:'1px solid rgba(255,255,255,0.3)', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer' }}>
            <Heart size={12} color={saved?'#ef4444':'white'} fill={saved?'#ef4444':'none'} />
          </button>
        </div>
        <div style={{ padding:'12px' }}>
          <p style={{ fontSize:'11px', color:'#6b7a76', marginBottom:'3px', display:'flex', alignItems:'center', gap:'3px' }}><MapPin size={10} />{item.location}</p>
          <h3 style={{ fontSize:'12px', fontWeight:700, color:'#161d1b', marginBottom:'6px', lineHeight:1.3, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{item.title}</h3>
          <p style={{ fontSize:'14px', fontWeight:800, color:'#22d4a8', marginBottom:'10px' }}>{formatPrice(item.price)}</p>
          <div style={{ display:'flex', gap:'6px' }}>
            <button onClick={e=>e.preventDefault()} style={{ flex:1, backgroundColor:'#eef5f2', color:'#3c4a46', border:'none', padding:'8px', borderRadius:'100px', fontWeight:700, fontSize:'11px', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', gap:'4px' }}>
              <MessageCircle size={11} /> Message
            </button>
            <button onClick={e=>e.preventDefault()} style={{ flex:1, backgroundColor:'#25D366', color:'white', border:'none', padding:'8px', borderRadius:'100px', fontWeight:700, fontSize:'11px', cursor:'pointer' }}>WhatsApp</button>
          </div>
        </div>
      </article>
    </Link>
  )
}

export default function VintagePage({ params }: { params: Promise<{ locale:string }> }) {
  const { locale } = React.use(params)
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS)
  const [activePill, setActivePill] = useState('All Vintage')
  const [activeSeller, setActiveSeller] = useState('All Sellers')
  const [diamond, setDiamond] = useState(true)
  const [activePage, setActivePage] = useState(1)
  const [viewMode, setViewMode] = useState<'grid'|'list'>('grid')

  return (
    <div style={{ fontFamily:'Inter, system-ui, sans-serif', backgroundColor:'#f4fbf8', minHeight:'100vh' }}>

      {/* CINEMATIC HERO */}
      <section style={{ position:'relative', height:'480px', display:'flex', alignItems:'center', justifyContent:'center', overflow:'hidden' }}>
        <img src={HERO} alt="Vintage & Thrift" style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover' }} />
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top, rgba(15,23,42,0.88), rgba(15,23,42,0.3))' }} />
        <div style={{ position:'relative', zIndex:10, textAlign:'center', padding:'0 20px', maxWidth:'760px', width:'100%' }}>
          <h1 style={{ fontFamily:'Inter, sans-serif', fontWeight:900, letterSpacing:'-0.05em', fontSize:'clamp(36px,5vw,52px)', color:'white', marginBottom:'12px', lineHeight:1.05, fontStyle:'italic' as const }}>
            "Discover Rare Vintage Pieces in Morocco"
          </h1>
          <p style={{ fontSize:'15px', color:'rgba(255,255,255,0.82)', marginBottom:'28px' }}>1,840 curated vintage &amp; thrift listings across Morocco</p>
        </div>
      </section>

      {/* FASHION FILTER BAR — overlapping hero, chips built-in */}
      <div style={{ maxWidth:'1440px', margin:'-44px auto 0', padding:'0 40px', position:'relative', zIndex:30 }}>
        <FashionFilterBar filters={filters} setFilters={setFilters} />
      </div>

      <div style={{ maxWidth:'1440px', margin:'32px auto 0', padding:'0 40px' }}>

        <FashionBreadcrumb pageLabel="Vintage & Thrift" />

        <h2 style={{ fontSize:'22px', fontWeight:900, color:'#161d1b', marginBottom:'4px', letterSpacing:'-0.02em' }}>New and Pre-Owned Vintage Clothing in Rabat</h2>
        <p style={{ fontSize:'15px', color:'#6b7a76', fontWeight:500, marginBottom:'16px' }}>1,840 Ads in Rabat District</p>

        {/* CATEGORY PILLS */}
        <div style={{ display:'flex', gap:'8px', marginBottom:'16px', overflowX:'auto', paddingBottom:'4px' }}>
          {pills.map(pill=>(
            <button key={pill} onClick={()=>setActivePill(pill)}
              style={{ padding:'7px 18px', borderRadius:'100px', fontSize:'13px', fontWeight:700, cursor:'pointer', border:'none', whiteSpace:'nowrap', transition:'all 0.15s', backgroundColor:activePill===pill?'#161d1b':'#e8efec', color:activePill===pill?'white':'#3c4a46' }}>
              {pill}
            </button>
          ))}

          <button style={{ padding:'7px 18px', borderRadius:'100px', fontSize:'13px', fontWeight:700, cursor:'pointer', border:'1px solid #e2e8f0', backgroundColor:'white', color:'#6b7a76', whiteSpace:'nowrap', transition:'all 0.15s' }}
            onMouseEnter={e=>e.currentTarget.style.backgroundColor='#f8fafc'}
            onMouseLeave={e=>e.currentTarget.style.backgroundColor='white'}>
            View More
          </button>
        </div>

        {/* UTILITY BAR */}
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'12px 0', borderTop:'1px solid rgba(186,202,197,0.25)', borderBottom:'1px solid rgba(186,202,197,0.25)', marginBottom:'28px', flexWrap:'wrap', gap:'10px' }}>
          <div style={{ display:'flex', gap:'6px' }}>
            {['All Sellers','SouKni Members','SouKni Pro'].map(tab=>(
              <button key={tab} onClick={()=>setActiveSeller(tab)}
                style={{ padding:'7px 18px', borderRadius:'100px', fontSize:'12px', fontWeight:700, cursor:'pointer', border:'none', transition:'all 0.2s', backgroundColor:activeSeller===tab?'#dde4e1':'transparent', color:activeSeller===tab?'#161d1b':'#6b7a76' }}>
                {tab}
              </button>
            ))}
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:'16px', flexWrap:'wrap' }}>
            <div style={{ display:'flex', alignItems:'center', gap:'8px', cursor:'pointer' }} onClick={()=>setDiamond(!diamond)}>
              <span style={{ fontSize:'12px', fontWeight:700, color:'#6b7a76' }}>Show SouKni Diamond Verified First</span>
              <div style={{ width:'40px', height:'20px', borderRadius:'100px', backgroundColor:diamond?'#22d4a8':'#bacac5', position:'relative', transition:'background 0.25s' }}>
                <div style={{ position:'absolute', top:'2px', left:diamond?'22px':'2px', width:'16px', height:'16px', borderRadius:'50%', backgroundColor:'white', transition:'left 0.25s', boxShadow:'0 1px 3px rgba(0,0,0,0.15)' }} />
              </div>
            </div>
            <div style={{ display:'flex', gap:'6px', borderLeft:'1px solid rgba(186,202,197,0.3)', paddingLeft:'12px' }}>
              {[{icon:'↕',label:'Sort: Default'},{icon:'🔔',label:'Save Search'}].map(btn=>(
                <button key={btn.label} style={{ display:'flex', alignItems:'center', gap:'5px', padding:'7px 12px', borderRadius:'10px', border:'1px solid rgba(186,202,197,0.4)', backgroundColor:'#eef5f2', fontSize:'12px', fontWeight:700, cursor:'pointer', color:'#161d1b' }}
                  onMouseEnter={e=>e.currentTarget.style.backgroundColor='#e2eae7'}
                  onMouseLeave={e=>e.currentTarget.style.backgroundColor='#eef5f2'}>
                  {btn.icon} {btn.label}
                </button>
              ))}
            </div>
          </div>
        </div>


        {/* QUICK FILTERS + GRID TOGGLE */}
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'28px', flexWrap:'wrap', gap:'10px' }}>
          <div style={{ display:'flex', gap:'8px', flexWrap:'wrap' }}>
            {[
              { emoji:'✨', label:'New Arrivals', active:true },
              { emoji:'📉', label:'Price Drop Alert', active:false },
              { emoji:'🛍️', label:'Shop Sellers', active:false },
            ].map(chip=>(
              <button key={chip.label}
                style={{ display:'flex', alignItems:'center', gap:'6px', padding:'8px 16px', borderRadius:'100px', fontSize:'12px', fontWeight:700, cursor:'pointer', transition:'all 0.15s', border:chip.active?'none':'1px solid rgba(186,202,197,0.5)', backgroundColor:chip.active?'#161d1b':'white', color:chip.active?'white':'#3c4a46' }}>
                {chip.emoji} {chip.label}
              </button>
            ))}
          </div>
          <div style={{ display:'flex', gap:'6px' }}>
            <button onClick={()=>setViewMode('grid')}
              style={{ width:'36px', height:'36px', display:'flex', alignItems:'center', justifyContent:'center', borderRadius:'10px', border:'none', cursor:'pointer', backgroundColor:viewMode==='grid'?'#161d1b':'#e8efec', color:viewMode==='grid'?'white':'#3c4a46', transition:'all 0.15s' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
            </button>
            <button onClick={()=>setViewMode('list')}
              style={{ width:'36px', height:'36px', display:'flex', alignItems:'center', justifyContent:'center', borderRadius:'10px', border:'none', cursor:'pointer', backgroundColor:viewMode==='list'?'#161d1b':'#e8efec', color:viewMode==='list'?'white':'#3c4a46', transition:'all 0.15s' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
            </button>
          </div>
        </div>

        {/* FEATURED */}
        <section style={{ marginBottom:'40px' }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'16px' }}>
            <h2 style={{ fontSize:'13px', fontWeight:800, color:'#161d1b', textTransform:'uppercase', letterSpacing:'0.1em' }}>Featured Vintage Pieces</h2>
            <Link href="#" style={{ color:'#22d4a8', fontWeight:700, fontSize:'12px', textDecoration:'none', display:'flex', alignItems:'center', gap:'3px' }}>View all Featured <ChevronRight size={13} /></Link>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'16px' }}>
            {featuredListings.map(item=><Card key={item.id} item={item} locale={locale} />)}
          </div>
        </section>

        {/* MID BANNERS */}
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'16px', marginBottom:'40px' }}>
          <div style={{ borderRadius:'20px', background:'linear-gradient(135deg,#161d1b,#2b3230)', padding:'28px', display:'flex', flexDirection:'column', justifyContent:'space-between', minHeight:'160px' }}>
            <div>
              <p style={{ fontSize:'10px', fontWeight:700, color:'#22d4a8', textTransform:'uppercase', letterSpacing:'0.12em', marginBottom:'6px' }}>SouKni Vintage</p>
              <h3 style={{ fontSize:'20px', fontWeight:900, color:'white', letterSpacing:'-0.03em', marginBottom:'6px', lineHeight:1.2 }}>The Archive Vault</h3>
              <p style={{ fontSize:'12px', color:'rgba(255,255,255,0.6)', lineHeight:1.5 }}>Authenticated vintage pieces from the world's greatest fashion archives.</p>
            </div>
            <button style={{ alignSelf:'flex-start', backgroundColor:'#22d4a8', color:'white', border:'none', padding:'8px 18px', borderRadius:'100px', fontWeight:700, fontSize:'11px', cursor:'pointer', marginTop:'12px' }}>Explore Archive</button>
          </div>
          <div style={{ borderRadius:'20px', backgroundColor:'#f5ede0', padding:'28px', display:'flex', flexDirection:'column', justifyContent:'space-between', minHeight:'160px' }}>
            <div>
              <p style={{ fontSize:'10px', fontWeight:700, color:'#8a7a5c', textTransform:'uppercase', letterSpacing:'0.12em', marginBottom:'6px' }}>Exclusive Hunt</p>
              <h3 style={{ fontSize:'20px', fontWeight:900, color:'#161d1b', letterSpacing:'-0.03em', marginBottom:'6px', lineHeight:1.2 }}>Vintage Concierge</h3>
              <p style={{ fontSize:'12px', color:'#6b7a76', lineHeight:1.5 }}>Can't find a specific piece? Our experts will hunt it down for you.</p>
            </div>
            <button style={{ alignSelf:'flex-start', backgroundColor:'#161d1b', color:'white', border:'none', padding:'8px 18px', borderRadius:'100px', fontWeight:700, fontSize:'11px', cursor:'pointer', marginTop:'12px' }}>Start Hunt</button>
          </div>
        </div>

        {/* BENTO GRID */}
        <section style={{ marginBottom:'40px' }}>
          <h2 style={{ fontSize:'22px', fontWeight:900, color:'#22d4a8', letterSpacing:'-0.02em', marginBottom:'16px' }}>SouKni Vintage Collection</h2>
          <div style={{ display:'grid', gridTemplateColumns:'1.4fr 1fr 1fr', gridTemplateRows:'240px 240px', gap:'16px' }}>
            <div style={{ gridRow:'span 2' }}>
              <Card item={bentoListings[0]} locale={locale} />
            </div>
            {bentoListings.slice(1).map(item=>(
              <Card key={item.id} item={item} locale={locale} />
            ))}
          </div>
        </section>

        {/* ARCHIVE BANNER */}
        <div style={{ borderRadius:'20px', background:'linear-gradient(135deg,#64748b,#94a3b8)', padding:'40px', textAlign:'center', marginBottom:'32px' }}>
          <h3 style={{ fontSize:'24px', fontWeight:900, color:'white', letterSpacing:'-0.02em', marginBottom:'8px' }}>SouKni Vintage Marketplace</h3>
          <p style={{ fontSize:'13px', color:'rgba(255,255,255,0.8)', marginBottom:'18px' }}>Turn your vintage treasures into cash. Join thousands of collectors across Morocco.</p>
          <button style={{ backgroundColor:'#22d4a8', color:'white', border:'none', padding:'11px 26px', borderRadius:'100px', fontWeight:700, fontSize:'13px', cursor:'pointer' }}>Start Selling</button>
        </div>

        {/* COLLECTION ROWS */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'16px', marginBottom:'20px' }}>
          {collectionRow1.map(item=><Card key={item.id} item={item} locale={locale} />)}
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'16px', marginBottom:'20px' }}>
          {collectionRow2.map(item=><Card key={item.id} item={item} locale={locale} />)}
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'16px', marginBottom:'32px' }}>
          {collectionRow3.map(item=><Card key={item.id} item={item} locale={locale} />)}
        </div>

        {/* PAGINATION */}
        <div style={{ display:'flex', justifyContent:'center', alignItems:'center', gap:'8px', marginBottom:'48px' }}>
          {[1,2,3,4].map(page=>(
            <button key={page} onClick={()=>setActivePage(page)}
              style={{ width:'36px', height:'36px', borderRadius:'10px', border:activePage===page?'none':'1px solid #e2e8f0', backgroundColor:activePage===page?'#22d4a8':'white', color:activePage===page?'white':'#161d1b', fontWeight:700, fontSize:'13px', cursor:'pointer' }}>
              {page}
            </button>
          ))}
          <button style={{ padding:'0 16px', height:'36px', borderRadius:'10px', border:'1px solid #e2e8f0', backgroundColor:'white', color:'#161d1b', fontWeight:700, fontSize:'13px', cursor:'pointer', display:'flex', alignItems:'center', gap:'4px' }}>
            Next <ChevronRight size={14} />
          </button>
        </div>

        {/* DIAMOND BANNER */}
        <section style={{ borderRadius:'32px', background:'linear-gradient(rgba(22,29,27,0.95),rgba(22,29,27,0.95))', padding:'48px', display:'flex', alignItems:'center', justifyContent:'space-between', gap:'40px', flexWrap:'wrap', marginBottom:'40px' }}>
          <div style={{ maxWidth:'480px' }}>
            <span style={{ fontSize:'11px', fontWeight:800, color:'#22d4a8', textTransform:'uppercase', letterSpacing:'0.15em', display:'block', marginBottom:'10px' }}>Exclusive Status</span>
            <h2 style={{ fontFamily:'Inter, sans-serif', fontWeight:900, letterSpacing:'-0.05em', fontSize:'40px', color:'white', marginBottom:'14px', lineHeight:1.05, fontStyle:'italic' as const }}>Become a Diamond Member</h2>
            <p style={{ color:'rgba(255,255,255,0.65)', fontSize:'14px', marginBottom:'24px', lineHeight:1.7 }}>Get priority placement, a verified Diamond badge, and exclusive access to SouKni's vintage collector network.</p>
            <button style={{ backgroundColor:'#22d4a8', color:'white', border:'none', padding:'13px 30px', borderRadius:'100px', fontWeight:800, fontSize:'13px', cursor:'pointer' }}>Upgrade to Diamond</button>
          </div>
        </section>

        {/* JOIN THE SOUKNI FAMILY */}
        <section style={{ borderRadius:'32px', background:'linear-gradient(135deg,#22d4a8,#0f9b8e)', padding:'48px', display:'flex', alignItems:'center', justifyContent:'space-between', gap:'40px', flexWrap:'wrap', marginBottom:'64px' }}>
          <div>
            <h2 style={{ fontFamily:'Inter, sans-serif', fontWeight:900, letterSpacing:'-0.04em', fontSize:'32px', color:'white', marginBottom:'10px', lineHeight:1.1 }}>Join the SouKni Family</h2>
            <p style={{ fontSize:'14px', color:'rgba(255,255,255,0.85)', maxWidth:'440px', lineHeight:1.6 }}>Start selling your vintage pieces today for free and reach millions of buyers across Morocco.</p>
          </div>
          <Link href={`/${locale}/post-ad`} style={{ textDecoration:'none' }}>
            <span style={{ display:'inline-block', backgroundColor:'white', color:'#0f9b8e', padding:'14px 32px', borderRadius:'100px', fontWeight:800, fontSize:'13px', cursor:'pointer', whiteSpace:'nowrap' }}>Post Free Ad →</span>
          </Link>
        </section>

      </div>
    </div>
  )
}
