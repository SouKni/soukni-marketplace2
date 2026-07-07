'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { Search, MapPin, Heart, MessageCircle, ChevronRight, Star } from 'lucide-react'

const HERO = 'https://images.pexels.com/photos/8486972/pexels-photo-8486972.jpeg?auto=compress&w=1600'

const topChoices = [
  {
    id: 'hm1',
    title: 'Master Plumbing & Leak Detection — Casablanca',
    desc: 'Expert plumber with 15+ years experience. Specializes in leak detection, pipe replacement, and emergency repairs across Casablanca and Grand Casablanca.',
    price: 350,
    location: 'Casablanca, Maarif',
    rating: 4.9,
    reviews: 412,
    image: 'https://images.pexels.com/photos/8486972/pexels-photo-8486972.jpeg?auto=compress&w=800',
  },
  {
    id: 'hm2',
    title: 'Premium Villa Cleaning & Household Management',
    desc: 'Full-service cleaning for villas, riads, and luxury apartments. Trained staff, eco-certified products, weekly and monthly packages available.',
    price: 280,
    location: 'Marrakech, Palmeraie',
    rating: 5.0,
    reviews: 287,
    image: 'https://images.pexels.com/photos/4099467/pexels-photo-4099467.jpeg?auto=compress&w=800',
  },
  {
    id: 'hm3',
    title: 'Smart Home Electrician & Automation Specialist',
    desc: 'Certified electrician offering full wiring, smart home installation, solar panel setup, and security system integration across Rabat-Salé.',
    price: 420,
    location: 'Rabat, Agdal',
    rating: 4.8,
    reviews: 198,
    image: 'https://images.pexels.com/photos/8985454/pexels-photo-8985454.jpeg?auto=compress&w=800',
  },
]

const bentoListings = [
  { id:'bh1', title:'AC Installation & Climate Control', price:550, location:'Casablanca', image:'https://images.pexels.com/photos/3810755/pexels-photo-3810755.jpeg?auto=compress&w=600' },
  { id:'bh2', title:'Professional Painter — Interior & Exterior', price:200, location:'Rabat', image:'https://images.pexels.com/photos/8486972/pexels-photo-8486972.jpeg?auto=compress&w=600' },
  { id:'bh3', title:'Marble & Tile Flooring Specialist', price:320, location:'Marrakech', image:'https://images.pexels.com/photos/4099467/pexels-photo-4099467.jpeg?auto=compress&w=600' },
  { id:'bh4', title:'Garden Design & Landscaping', price:450, location:'Casablanca', image:'https://images.pexels.com/photos/1453499/pexels-photo-1453499.jpeg?auto=compress&w=600' },
  { id:'bh5', title:'Swimming Pool Maintenance', price:380, location:'Marrakech', image:'https://images.pexels.com/photos/2291731/pexels-photo-2291731.jpeg?auto=compress&w=600' },
]

const discoveryGrid = [
  { id:'dh1',  title:'Roof Waterproofing Expert',           price:600,  location:'Casablanca', image:'https://images.pexels.com/photos/8486972/pexels-photo-8486972.jpeg?auto=compress&w=600' },
  { id:'dh2',  title:'Kitchen Renovation Specialist',       price:850,  location:'Rabat',      image:'https://images.pexels.com/photos/4099467/pexels-photo-4099467.jpeg?auto=compress&w=600' },
  { id:'dh3',  title:'Carpenter & Custom Furniture',        price:400,  location:'Tangier',    image:'https://images.pexels.com/photos/8985454/pexels-photo-8985454.jpeg?auto=compress&w=600' },
  { id:'dh4',  title:'Pest Control & Disinfection',         price:250,  location:'Casablanca', image:'https://images.pexels.com/photos/3810755/pexels-photo-3810755.jpeg?auto=compress&w=600' },
  { id:'dh5',  title:'Window & Door Installation',          price:300,  location:'Marrakech',  image:'https://images.pexels.com/photos/8486972/pexels-photo-8486972.jpeg?auto=compress&w=600' },
  { id:'dh6',  title:'Bathroom Renovation Pro',             price:720,  location:'Rabat',      image:'https://images.pexels.com/photos/4099467/pexels-photo-4099467.jpeg?auto=compress&w=600' },
  { id:'dh7',  title:'CCTV & Security System Install',      price:480,  location:'Casablanca', image:'https://images.pexels.com/photos/8985454/pexels-photo-8985454.jpeg?auto=compress&w=600' },
  { id:'dh8',  title:'Gypsum Ceiling & Partition Works',    price:350,  location:'Agadir',     image:'https://images.pexels.com/photos/3810755/pexels-photo-3810755.jpeg?auto=compress&w=600' },
]

const pills = ['All Services','Plumbing','Electrical','Cleaning','Painting','AC & Heating','Renovation','View More']

function CertifiedBadge() {
  return (
    <span style={{ display:'inline-flex', alignItems:'center', gap:'4px', background:'linear-gradient(135deg,#22d4a8,#0f9b8e)', color:'white', fontSize:'8px', fontWeight:900, padding:'3px 10px', borderRadius:'100px', textTransform:'uppercase', letterSpacing:'0.08em' }}>
      ✦ SOUKNI CERTIFIED
    </span>
  )
}

function Stars({ rating }: { rating: number }) {
  return (
    <div style={{ display:'flex', gap:'1px' }}>
      {[1,2,3,4,5].map(i=><Star key={i} size={11} fill={i<=Math.floor(rating)?'#f59e0b':'none'} color="#f59e0b" />)}
    </div>
  )
}

function TopChoiceCard({ item, locale }: { item: typeof topChoices[0], locale: string }) {
  const [saved, setSaved] = useState(false)
  const [hovered, setHovered] = useState(false)
  return (
    <Link href={`/${locale}/listing/${item.id}`} style={{ textDecoration:'none' }}>
      <div onMouseEnter={()=>setHovered(true)} onMouseLeave={()=>setHovered(false)}
        style={{ display:'flex', backgroundColor:'white', borderRadius:'40px', overflow:'hidden', border:'1px solid #f1f5f9', boxShadow:hovered?'0 20px 48px rgba(0,0,0,0.12)':'0 2px 12px rgba(0,0,0,0.05)', transition:'all 0.3s', marginBottom:'16px' }}>
        <div style={{ position:'relative', width:'320px', flexShrink:0, overflow:'hidden' }}>
          <img src={item.image} alt={item.title} style={{ width:'100%', height:'100%', objectFit:'cover', transition:'transform 0.6s', transform:hovered?'scale(1.06)':'scale(1)' }} />
          <div style={{ position:'absolute', top:'16px', left:'16px' }}><CertifiedBadge /></div>
          <button onClick={e=>{e.preventDefault();setSaved(!saved)}} style={{ position:'absolute', top:'16px', right:'16px', width:'32px', height:'32px', borderRadius:'50%', backgroundColor:'rgba(255,255,255,0.2)', backdropFilter:'blur(12px)', border:'1px solid rgba(255,255,255,0.3)', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer' }}>
            <Heart size={14} color={saved?'#ef4444':'white'} fill={saved?'#ef4444':'none'} />
          </button>
        </div>
        <div style={{ flex:1, padding:'28px 32px', display:'flex', flexDirection:'column', justifyContent:'space-between' }}>
          <div>
            <div style={{ display:'flex', alignItems:'center', gap:'8px', marginBottom:'10px' }}>
              <Stars rating={item.rating} />
              <span style={{ fontFamily:'Hanken Grotesk, Inter, sans-serif', fontWeight:900, letterSpacing:'-0.03em', fontSize:'13px', color:'#161d1b' }}>{item.rating}</span>
              <span style={{ fontSize:'12px', color:'#6b7a76' }}>({item.reviews} reviews)</span>
            </div>
            <h3 style={{ fontFamily:'Inter, sans-serif', fontWeight:900, letterSpacing:'-0.05em', fontSize:'20px', color:'#161d1b', marginBottom:'10px', lineHeight:1.2 }}>{item.title}</h3>
            <p style={{ fontSize:'13px', color:'#6b7a76', lineHeight:1.7, marginBottom:'16px' }}>{item.desc}</p>
            <div style={{ display:'flex', alignItems:'center', gap:'4px', fontSize:'12px', color:'#6b7a76' }}>
              <MapPin size={12} /> {item.location}
            </div>
          </div>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginTop:'20px' }}>
            <div>
              <span style={{ fontFamily:'Hanken Grotesk, Inter, sans-serif', fontWeight:900, letterSpacing:'-0.03em', fontSize:'24px', color:'#22d4a8' }}>{item.price} MAD</span>
              <span style={{ fontSize:'12px', color:'#6b7a76' }}> / visit</span>
            </div>
            <div style={{ display:'flex', gap:'8px' }}>
              <button onClick={e=>e.preventDefault()} style={{ padding:'10px 20px', borderRadius:'100px', border:'1px solid #22d4a8', backgroundColor:'transparent', color:'#22d4a8', fontWeight:700, fontSize:'12px', cursor:'pointer', display:'flex', alignItems:'center', gap:'5px' }}>
                <MessageCircle size={13} />Chat
              </button>
              <button onClick={e=>e.preventDefault()} style={{ padding:'10px 20px', borderRadius:'100px', border:'none', backgroundColor:'#25D366', color:'white', fontWeight:700, fontSize:'12px', cursor:'pointer' }}>WhatsApp</button>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

function DiscoveryCard({ item, locale }: { item: typeof discoveryGrid[0], locale: string }) {
  const [saved, setSaved] = useState(false)
  const [hovered, setHovered] = useState(false)
  return (
    <Link href={`/${locale}/listing/${item.id}`} style={{ textDecoration:'none' }}>
      <div onMouseEnter={()=>setHovered(true)} onMouseLeave={()=>setHovered(false)}
        style={{ display:'flex', backgroundColor:'white', borderRadius:'24px', overflow:'hidden', border:'1px solid #f1f5f9', boxShadow:hovered?'0 16px 32px rgba(0,0,0,0.1)':'0 2px 8px rgba(0,0,0,0.04)', transition:'all 0.25s' }}>
        <div style={{ position:'relative', width:'160px', flexShrink:0, overflow:'hidden' }}>
          <img src={item.image} alt={item.title} style={{ width:'100%', height:'100%', objectFit:'cover', transition:'transform 0.5s', transform:hovered?'scale(1.06)':'scale(1)' }} />
          <div style={{ position:'absolute', top:'8px', left:'8px' }}><CertifiedBadge /></div>
        </div>
        <div style={{ flex:1, padding:'16px 20px', display:'flex', flexDirection:'column', justifyContent:'space-between' }}>
          <div>
            <p style={{ fontSize:'11px', color:'#6b7a76', marginBottom:'4px', display:'flex', alignItems:'center', gap:'3px' }}><MapPin size={10} />{item.location}</p>
            <h4 style={{ fontFamily:'Inter, sans-serif', fontWeight:900, letterSpacing:'-0.05em', fontSize:'14px', color:'#161d1b', marginBottom:'8px', lineHeight:1.3 }}>{item.title}</h4>
            <p style={{ fontFamily:'Hanken Grotesk, Inter, sans-serif', fontWeight:900, letterSpacing:'-0.03em', fontSize:'18px', color:'#22d4a8' }}>{item.price} MAD</p>
          </div>
          <div style={{ display:'flex', gap:'6px', marginTop:'12px' }}>
            <button onClick={e=>{e.preventDefault();setSaved(!saved)}} style={{ flex:1, backgroundColor:'#eef5f2', color:'#3c4a46', border:'none', padding:'8px', borderRadius:'100px', fontWeight:700, fontSize:'11px', cursor:'pointer' }}>Message</button>
            <button onClick={e=>e.preventDefault()} style={{ flex:1, backgroundColor:'#25D366', color:'white', border:'none', padding:'8px', borderRadius:'100px', fontWeight:700, fontSize:'11px', cursor:'pointer' }}>WhatsApp</button>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default function HomeMaintenancePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = React.use(params)
  const [activePill, setActivePill] = useState('All Services')
  const [activeSeller, setActiveSeller] = useState('All Sellers')
  const [diamond, setDiamond] = useState(true)
  const [activePage, setActivePage] = useState(1)
  const [viewMode, setViewMode] = useState<'grid'|'list'>('grid')
  const [keyword, setKeyword] = useState('')

  return (
    <div style={{ fontFamily:'Inter, sans-serif', backgroundColor:'#f4fbf8', minHeight:'100vh' }}>

      {/* CINEMATIC HERO */}
      <section style={{ position:'relative', height:'420px', display:'flex', alignItems:'center', justifyContent:'center', overflow:'hidden' }}>
        <img src={HERO} alt="Home Maintenance" style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover' }} />
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top, rgba(15,23,42,0.85), rgba(15,23,42,0.4))' }} />
        <div style={{ position:'relative', zIndex:10, textAlign:'center', padding:'0 20px', maxWidth:'720px', width:'100%' }}>
          <h1 style={{ fontFamily:'Inter, sans-serif', fontWeight:900, letterSpacing:'-0.05em', fontSize:'clamp(32px,5vw,52px)', color:'white', marginBottom:'12px', lineHeight:1.05 }}>
            Trusted Home Maintenance Experts Near You!
          </h1>
          <p style={{ fontSize:'15px', color:'rgba(255,255,255,0.82)', marginBottom:'28px' }}>4,910 verified home maintenance professionals across Morocco</p>
          <div style={{ display:'flex', gap:'8px', backgroundColor:'rgba(255,255,255,0.15)', backdropFilter:'blur(20px)', border:'1px solid rgba(255,255,255,0.25)', borderRadius:'100px', padding:'8px 8px 8px 24px', maxWidth:'580px', margin:'0 auto' }}>
            <Search size={18} color="rgba(255,255,255,0.7)" style={{ flexShrink:0, alignSelf:'center' }} />
            <input value={keyword} onChange={e=>setKeyword(e.target.value)} type="text" placeholder="Plumber, electrician, cleaner, painter..."
              style={{ flex:1, backgroundColor:'transparent', border:'none', outline:'none', fontSize:'14px', color:'white', fontFamily:'Inter, sans-serif', padding:'6px 8px' }} />
            <button style={{ backgroundColor:'#22d4a8', color:'white', border:'none', padding:'12px 26px', borderRadius:'100px', fontWeight:700, fontSize:'13px', cursor:'pointer', whiteSpace:'nowrap' }}>Search</button>
          </div>
        </div>
      </section>

      {/* ADVANCED FILTER BAR */}
      <div style={{ maxWidth:'1440px', margin:'-28px auto 0', padding:'0 40px', position:'relative', zIndex:30 }}>
        <div style={{ backgroundColor:'rgba(255,255,255,0.9)', backdropFilter:'blur(20px)', borderRadius:'100px', padding:'10px 10px 10px 24px', boxShadow:'0 8px 40px rgba(0,0,0,0.12)', border:'1px solid rgba(255,255,255,0.6)', display:'flex', alignItems:'center' }}>
          {[
            { label:'City', val:'Casablanca' },
            { label:'Keyword', val:'What service do you need?' },
            { label:'Neighborhood', val:'All Areas' },
            { label:'Ads Posted', val:'Anytime' },
            { label:'Filters', val:'All Filters' },
          ].map((f,i)=>(
            <div key={f.label} style={{ flex:i===1?2:1, padding:'6px 20px', borderRight:i<4?'1px solid rgba(186,202,197,0.3)':'none', display:'flex', flexDirection:'column', cursor:'pointer', gap:'1px' }}>
              <span style={{ fontSize:'9px', textTransform:'uppercase', fontWeight:700, color:'#6b7a76', letterSpacing:'0.1em' }}>{f.label}</span>
              <span style={{ fontSize:'13px', fontWeight:500, color:'#161d1b' }}>{f.val}</span>
            </div>
          ))}
          <button style={{ backgroundColor:'#22d4a8', color:'white', border:'none', padding:'14px 28px', borderRadius:'100px', cursor:'pointer', display:'flex', alignItems:'center', gap:'8px', fontWeight:700, fontSize:'13px', flexShrink:0, marginLeft:'8px' }}>
            <Search size={16} /> SEARCH
          </button>
        </div>
      </div>

      <div style={{ maxWidth:'1440px', margin:'32px auto 0', padding:'0 40px' }}>

        {/* BREADCRUMB */}
        <nav style={{ display:'flex', alignItems:'center', gap:'6px', fontSize:'12px', fontWeight:700, color:'#6b7a76', textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:'8px' }}>
          <Link href={`/${locale}`} style={{ color:'#6b7a76', textDecoration:'none' }}>Home</Link><span>›</span>
          <Link href={`/${locale}/services`} style={{ color:'#6b7a76', textDecoration:'none' }}>Services</Link><span>›</span>
          <span style={{ color:'#161d1b' }}>Home Maintenance</span>
        </nav>

        <h2 style={{ fontFamily:'Inter, sans-serif', fontWeight:900, letterSpacing:'-0.05em', fontSize:'22px', color:'#161d1b', marginBottom:'4px' }}>Home Maintenance &amp; Repair Services in Rabat</h2>
        <p style={{ fontSize:'14px', color:'#6b7a76', marginBottom:'16px' }}>4,910 Ads in Rabat District</p>

        {/* CATEGORY PILLS */}
        <div style={{ display:'flex', gap:'8px', marginBottom:'16px', overflowX:'auto', paddingBottom:'4px' }}>
          {pills.map(pill=>(
            <button key={pill} onClick={()=>setActivePill(pill)}
              style={{ padding:'7px 18px', borderRadius:'100px', fontSize:'12px', fontWeight:700, cursor:'pointer', border:'none', whiteSpace:'nowrap', transition:'all 0.15s', backgroundColor:activePill===pill?'#161d1b':'#e8efec', color:activePill===pill?'white':'#3c4a46' }}>
              {pill}
            </button>
          ))}
        </div>

        {/* UTILITY BAR */}
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'12px 0', borderTop:'1px solid rgba(186,202,197,0.25)', borderBottom:'1px solid rgba(186,202,197,0.25)', marginBottom:'16px', flexWrap:'wrap', gap:'10px' }}>
          <div style={{ display:'flex', gap:'6px' }}>
            {['All Sellers','SouKni Members','SouKni Pro'].map(tab=>(
              <button key={tab} onClick={()=>setActiveSeller(tab)}
                style={{ padding:'7px 18px', borderRadius:'100px', fontSize:'12px', fontWeight:700, cursor:'pointer', border:'none', backgroundColor:activeSeller===tab?'#dde4e1':'transparent', color:activeSeller===tab?'#161d1b':'#6b7a76' }}>
                {tab}
              </button>
            ))}
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:'16px' }}>
            <div style={{ display:'flex', alignItems:'center', gap:'8px', cursor:'pointer' }} onClick={()=>setDiamond(!diamond)}>
              <span style={{ fontSize:'12px', fontWeight:700, color:'#6b7a76' }}>Show SouKni Diamond Verified First</span>
              <div style={{ width:'40px', height:'20px', borderRadius:'100px', backgroundColor:diamond?'#22d4a8':'#bacac5', position:'relative', transition:'background 0.25s' }}>
                <div style={{ position:'absolute', top:'2px', left:diamond?'22px':'2px', width:'16px', height:'16px', borderRadius:'50%', backgroundColor:'white', transition:'left 0.25s', boxShadow:'0 1px 3px rgba(0,0,0,0.15)' }} />
              </div>
            </div>
            <div style={{ display:'flex', gap:'6px', borderLeft:'1px solid rgba(186,202,197,0.3)', paddingLeft:'12px' }}>
              {[{icon:'↕',label:'Sort: Default'},{icon:'🔔',label:'Save Search'}].map(btn=>(
                <button key={btn.label} style={{ display:'flex', alignItems:'center', gap:'5px', padding:'7px 12px', borderRadius:'10px', border:'1px solid rgba(186,202,197,0.4)', backgroundColor:'#eef5f2', fontSize:'12px', fontWeight:700, cursor:'pointer', color:'#161d1b' }}>
                  {btn.icon} {btn.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* QUICK FILTERS + GRID TOGGLE */}
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'32px', flexWrap:'wrap', gap:'10px' }}>
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
              style={{ width:'36px', height:'36px', display:'flex', alignItems:'center', justifyContent:'center', borderRadius:'10px', border:'none', cursor:'pointer', backgroundColor:viewMode==='grid'?'#161d1b':'#e8efec', color:viewMode==='grid'?'white':'#3c4a46' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
            </button>
            <button onClick={()=>setViewMode('list')}
              style={{ width:'36px', height:'36px', display:'flex', alignItems:'center', justifyContent:'center', borderRadius:'10px', border:'none', cursor:'pointer', backgroundColor:viewMode==='list'?'#161d1b':'#e8efec', color:viewMode==='list'?'white':'#3c4a46' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
            </button>
          </div>
        </div>

        {/* TOP CHOICES */}
        <section style={{ marginBottom:'40px' }}>
          <h2 style={{ fontSize:'13px', fontWeight:900, color:'#161d1b', textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:'20px' }}>SOUKNI TOP CHOICES</h2>
          {topChoices.map(item=><TopChoiceCard key={item.id} item={item} locale={locale} />)}
        </section>

        {/* CROSS-VERTICAL: MOBILES & ELECTRO PRO */}
        <div style={{ borderRadius:'40px', overflow:'hidden', marginBottom:'40px', background:'linear-gradient(135deg,#161d1b,#1a2e28)', padding:'40px 48px', display:'grid', gridTemplateColumns:'1fr 1fr', gap:'40px', alignItems:'center' }}>
          <div>
            <p style={{ fontSize:'10px', fontWeight:700, color:'#22d4a8', textTransform:'uppercase', letterSpacing:'0.15em', marginBottom:'8px' }}>SouKni Mobiles &amp; Electro Pro</p>
            <h3 style={{ fontFamily:'Inter, sans-serif', fontWeight:900, letterSpacing:'-0.05em', fontSize:'28px', color:'white', marginBottom:'12px', lineHeight:1.1 }}>Your Premium tech and elite electronics marketplace.</h3>
            <p style={{ fontSize:'13px', color:'rgba(255,255,255,0.65)', marginBottom:'24px', lineHeight:1.6 }}>Our certified SouKni network ensures you get the best tech deals across Morocco.</p>
            <div style={{ display:'flex', gap:'12px' }}>
              <Link href={`/${locale}/electronics`} style={{ textDecoration:'none' }}>
                <button style={{ backgroundColor:'#22d4a8', color:'white', border:'none', padding:'11px 24px', borderRadius:'100px', fontWeight:700, fontSize:'12px', cursor:'pointer' }}>Explore Tech</button>
              </Link>
              <button style={{ backgroundColor:'transparent', color:'white', border:'1px solid rgba(255,255,255,0.3)', padding:'11px 24px', borderRadius:'100px', fontWeight:700, fontSize:'12px', cursor:'pointer' }}>Contact Expert</button>
            </div>
          </div>
          <div style={{ position:'relative', height:'200px', borderRadius:'24px', overflow:'hidden' }}>
            <img src="https://images.pexels.com/photos/303383/pexels-photo-303383.jpeg?auto=compress&w=800" alt="Electronics" style={{ width:'100%', height:'100%', objectFit:'cover', opacity:0.7 }} />
          </div>
        </div>

        {/* BENTO COLLECTION — cleaner 3+2 layout */}
        <section style={{ marginBottom:'40px' }}>
          <h2 style={{ fontFamily:'Inter, sans-serif', fontWeight:900, letterSpacing:'-0.05em', fontSize:'22px', color:'#22d4a8', marginBottom:'16px' }}>SouKni Home Services Collection</h2>
          {/* Row 1: 3 equal tiles */}
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'16px', marginBottom:'16px' }}>
            {bentoListings.slice(0,3).map(item=>(
              <Link key={item.id} href={`/${locale}/listing/${item.id}`} style={{ textDecoration:'none' }}>
                <div style={{ position:'relative', height:'220px', borderRadius:'28px', overflow:'hidden', cursor:'pointer', transition:'transform 0.2s' }}
                  onMouseEnter={e=>(e.currentTarget as HTMLDivElement).style.transform='scale(1.02)'}
                  onMouseLeave={e=>(e.currentTarget as HTMLDivElement).style.transform='scale(1)'}>
                  <img src={item.image} alt={item.title} style={{ width:'100%', height:'100%', objectFit:'cover' }} />
                  <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top,rgba(0,0,0,0.85),rgba(0,0,0,0.05))' }} />
                  <div style={{ position:'absolute', top:'12px', left:'12px' }}><CertifiedBadge /></div>
                  <div style={{ position:'absolute', bottom:'16px', left:'16px', right:'16px' }}>
                    <h3 style={{ fontFamily:'Hanken Grotesk, Inter, sans-serif', fontWeight:900, letterSpacing:'-0.03em', fontSize:'15px', color:'white', marginBottom:'4px', lineHeight:1.3 }}>{item.title}</h3>
                    <p style={{ fontFamily:'Hanken Grotesk, Inter, sans-serif', fontWeight:900, letterSpacing:'-0.03em', fontSize:'17px', color:'#22d4a8' }}>{item.price} MAD</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          {/* Row 2: 2 wider tiles */}
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'16px' }}>
            {bentoListings.slice(3).map(item=>(
              <Link key={item.id} href={`/${locale}/listing/${item.id}`} style={{ textDecoration:'none' }}>
                <div style={{ position:'relative', height:'200px', borderRadius:'28px', overflow:'hidden', cursor:'pointer', transition:'transform 0.2s' }}
                  onMouseEnter={e=>(e.currentTarget as HTMLDivElement).style.transform='scale(1.02)'}
                  onMouseLeave={e=>(e.currentTarget as HTMLDivElement).style.transform='scale(1)'}>
                  <img src={item.image} alt={item.title} style={{ width:'100%', height:'100%', objectFit:'cover' }} />
                  <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top,rgba(0,0,0,0.85),rgba(0,0,0,0.05))' }} />
                  <div style={{ position:'absolute', top:'12px', left:'12px' }}><CertifiedBadge /></div>
                  <div style={{ position:'absolute', bottom:'16px', left:'16px', right:'16px' }}>
                    <h3 style={{ fontFamily:'Hanken Grotesk, Inter, sans-serif', fontWeight:900, letterSpacing:'-0.03em', fontSize:'16px', color:'white', marginBottom:'4px' }}>{item.title}</h3>
                    <p style={{ fontFamily:'Hanken Grotesk, Inter, sans-serif', fontWeight:900, letterSpacing:'-0.03em', fontSize:'18px', color:'#22d4a8' }}>{item.price} MAD</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* CROSS-VERTICAL: IMMO PRO */}
        <div style={{ borderRadius:'40px', backgroundColor:'#f5ede0', padding:'40px 48px', display:'grid', gridTemplateColumns:'1fr 1fr', gap:'40px', alignItems:'center', marginBottom:'40px' }}>
          <div>
            <p style={{ fontSize:'10px', fontWeight:700, color:'#8a7a5c', textTransform:'uppercase', letterSpacing:'0.15em', marginBottom:'8px' }}>SouKni Immo Pro</p>
            <h3 style={{ fontFamily:'Inter, sans-serif', fontWeight:900, letterSpacing:'-0.05em', fontSize:'28px', color:'#161d1b', marginBottom:'12px', lineHeight:1.1 }}>Elevate your lifestyle with Morocco's most exclusive real estate and rental spaces.</h3>
            <div style={{ display:'flex', gap:'12px', marginTop:'20px' }}>
              <Link href={`/${locale}/property`} style={{ textDecoration:'none' }}>
                <button style={{ backgroundColor:'#161d1b', color:'white', border:'none', padding:'11px 24px', borderRadius:'100px', fontWeight:700, fontSize:'12px', cursor:'pointer' }}>Explore Properties</button>
              </Link>
              <button style={{ backgroundColor:'transparent', color:'#161d1b', border:'1px solid #161d1b', padding:'11px 24px', borderRadius:'100px', fontWeight:700, fontSize:'12px', cursor:'pointer' }}>Contact Expert</button>
            </div>
          </div>
          <div style={{ position:'relative', height:'200px', borderRadius:'24px', overflow:'hidden' }}>
            <img src="https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&w=800" alt="Property" style={{ width:'100%', height:'100%', objectFit:'cover' }} />
          </div>
        </div>

        {/* DISCOVERY GRID — 2 columns */}
        <section style={{ marginBottom:'40px' }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'20px' }}>
            <h2 style={{ fontFamily:'Inter, sans-serif', fontWeight:900, letterSpacing:'-0.05em', fontSize:'20px', color:'#161d1b' }}>More Home Maintenance Services</h2>
            <Link href="#" style={{ color:'#22d4a8', fontWeight:700, fontSize:'13px', textDecoration:'none', display:'flex', alignItems:'center', gap:'3px' }}>View all <ChevronRight size={14} /></Link>
          </div>
          {/* 2-column horizontal cards */}
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'16px' }}>
            {discoveryGrid.map(item=><DiscoveryCard key={item.id} item={item} locale={locale} />)}
          </div>
        </section>

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

        {/* JOIN THE SOUKNI FAMILY */}
        <section style={{ borderRadius:'40px', background:'linear-gradient(135deg,#22d4a8,#0f9b8e)', padding:'56px 48px', display:'flex', alignItems:'center', justifyContent:'space-between', gap:'40px', flexWrap:'wrap', marginBottom:'64px' }}>
          <div>
            <h2 style={{ fontFamily:'Inter, sans-serif', fontWeight:900, letterSpacing:'-0.05em', fontSize:'36px', color:'white', marginBottom:'10px', lineHeight:1.05 }}>JOIN THE SOUKNI FAMILY</h2>
            <p style={{ fontSize:'15px', color:'rgba(255,255,255,0.85)', maxWidth:'480px', lineHeight:1.7 }}>Start selling your services today for free and reach millions of homeowners in Morocco.</p>
            <div style={{ display:'flex', gap:'12px', marginTop:'24px' }}>
              <button style={{ backgroundColor:'white', color:'#0f9b8e', border:'none', padding:'12px 24px', borderRadius:'100px', fontWeight:800, fontSize:'13px', cursor:'pointer' }}>App Store</button>
              <button style={{ backgroundColor:'rgba(255,255,255,0.2)', color:'white', border:'1px solid rgba(255,255,255,0.4)', padding:'12px 24px', borderRadius:'100px', fontWeight:800, fontSize:'13px', cursor:'pointer' }}>Google Play</button>
            </div>
          </div>
          <Link href={`/${locale}/post-ad`} style={{ textDecoration:'none' }}>
            <span style={{ display:'inline-block', backgroundColor:'white', color:'#0f9b8e', padding:'16px 36px', borderRadius:'100px', fontWeight:900, fontSize:'14px', cursor:'pointer', whiteSpace:'nowrap' }}>Post Free Ad →</span>
          </Link>
        </section>

      </div>
    </div>
  )
}
