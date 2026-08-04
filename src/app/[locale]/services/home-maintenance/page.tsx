'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { Search, MapPin, Heart, MessageCircle, ChevronRight, Star } from 'lucide-react'

const HERO = 'https://images.pexels.com/photos/8005397/pexels-photo-8005397.jpeg?auto=compress&w=1600'

const SUBCATS = [
  { slug:'plumbing',   label:'Plumbing',    image:'https://images.pexels.com/photos/6419128/pexels-photo-6419128.jpeg?auto=compress&w=600' },
  { slug:'electrical', label:'Electrical',  image:'https://images.pexels.com/photos/257736/pexels-photo-257736.jpeg?auto=compress&w=600' },
  { slug:'cleaning',   label:'Cleaning',    image:'https://images.pexels.com/photos/4239146/pexels-photo-4239146.jpeg?auto=compress&w=600' },
  { slug:'painting',   label:'Painting',    image:'https://images.pexels.com/photos/1109541/pexels-photo-1109541.jpeg?auto=compress&w=600' },
  { slug:'ac-heating', label:'AC & Heating',image:'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&w=600' },
  { slug:'renovation', label:'Renovation',  image:'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&w=600' },
]

const topChoices = [
  { id:'hm1', title:'Emergency Plumber — 24/7 Casablanca', price:350, location:'Casablanca', rating:4.9, reviews:84, image:'https://images.pexels.com/photos/6419128/pexels-photo-6419128.jpeg?auto=compress&w=800', desc:'Certified master plumber available 24/7 for emergency repairs across Casablanca. Pipe bursts, leaks, drain unblocking and full bathroom installations. Same-day response guaranteed.' },
  { id:'hm2', title:'Licensed Electrician — Full Home Rewiring', price:2800, location:'Rabat', rating:4.9, reviews:61, image:'https://images.pexels.com/photos/257736/pexels-photo-257736.jpeg?auto=compress&w=800', desc:'Certified electrician for full home rewiring, fuse box upgrades, LED lighting retrofits and smart home installations. ONEE-compliant work with certificate of conformity provided.' },
  { id:'hm3', title:'Full Villa Renovation — Turnkey Service', price:85000, location:'Marrakech', rating:4.8, reviews:42, image:'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&w=800', desc:'Complete villa renovation from structural work through interior finishes. Kitchen, bathrooms, tadelakt, zellige and custom joinery. 15+ years experience across luxury Marrakech properties.' },
]

const bentoListings = [
  { id:'hb1', title:'Deep Clean — 5-Bedroom Villa',      price:1200, location:'Marrakech',  image:'https://images.pexels.com/photos/4239146/pexels-photo-4239146.jpeg?auto=compress&w=600' },
  { id:'hb2', title:'Interior Repaint — 3-Bed Apartment',price:4500, location:'Casablanca', image:'https://images.pexels.com/photos/1109541/pexels-photo-1109541.jpeg?auto=compress&w=600' },
  { id:'hb3', title:'AC Annual Service — All Units',      price:600,  location:'Rabat',      image:'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&w=600' },
  { id:'hb4', title:'Bathroom Renovation Complete',       price:22000,location:'Casablanca', image:'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&w=600' },
  { id:'hb5', title:'Kitchen Sink & Tap Replacement',    price:450,  location:'Tangier',    image:'https://images.pexels.com/photos/6419128/pexels-photo-6419128.jpeg?auto=compress&w=600' },
]

const discoveryGrid = [
  { id:'hd1', title:'Toilet & Cistern Repair',          price:280,  location:'Casablanca', image:'https://images.pexels.com/photos/6419128/pexels-photo-6419128.jpeg?auto=compress&w=400' },
  { id:'hd2', title:'Socket & Switch Installation',     price:180,  location:'Rabat',      image:'https://images.pexels.com/photos/257736/pexels-photo-257736.jpeg?auto=compress&w=400' },
  { id:'hd3', title:'Post-Construction Deep Clean',     price:1800, location:'Marrakech',  image:'https://images.pexels.com/photos/4239146/pexels-photo-4239146.jpeg?auto=compress&w=400' },
  { id:'hd4', title:'Feature Wall Tadelakt Finish',     price:3200, location:'Casablanca', image:'https://images.pexels.com/photos/1109541/pexels-photo-1109541.jpeg?auto=compress&w=400' },
  { id:'hd5', title:'Split AC Installation',            price:1400, location:'Tangier',    image:'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&w=400' },
  { id:'hd6', title:'Open Plan Conversion',             price:35000,location:'Casablanca', image:'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&w=400' },
  { id:'hd7', title:'Water Heater Replacement',         price:850,  location:'Rabat',      image:'https://images.pexels.com/photos/6419128/pexels-photo-6419128.jpeg?auto=compress&w=400' },
  { id:'hd8', title:'EV Charger Home Installation',    price:3500, location:'Casablanca', image:'https://images.pexels.com/photos/257736/pexels-photo-257736.jpeg?auto=compress&w=400' },
]

function CertifiedBadge() {
  return <span style={{ display:'inline-flex', alignItems:'center', gap:'4px', background:'linear-gradient(135deg,#22d4a8,#0f9b8e)', color:'white', fontSize:'8px', fontWeight:900, padding:'3px 10px', borderRadius:'100px', textTransform:'uppercase' as const, letterSpacing:'0.08em' }}>✦ SOUKNI CERTIFIED</span>
}
function Stars({ rating }: { rating: number }) {
  return <div style={{ display:'flex', gap:'1px' }}>{[1,2,3,4,5].map(i=><Star key={i} size={11} fill={i<=Math.floor(rating)?'#f59e0b':'none'} color="#f59e0b" />)}</div>
}
function TopCard({ item, locale }: { item: typeof topChoices[0], locale: string }) {
  const [saved, setSaved] = useState(false)
  const [hov, setHov] = useState(false)
  return (
    <Link href={`/${locale}/listing/${item.id}`} style={{ textDecoration:'none' }}>
      <div onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
        style={{ display:'flex', backgroundColor:'white', borderRadius:'40px', overflow:'hidden', border:'1px solid #f1f5f9', boxShadow:hov?'0 20px 48px rgba(0,0,0,0.12)':'0 2px 12px rgba(0,0,0,0.05)', transition:'all 0.3s', marginBottom:'16px' }}>
        <div style={{ position:'relative', width:'280px', flexShrink:0, overflow:'hidden' }}>
          <img src={item.image} alt={item.title} style={{ width:'100%', height:'100%', objectFit:'cover', transition:'transform 0.6s', transform:hov?'scale(1.06)':'scale(1)' }} />
          <div style={{ position:'absolute', top:'16px', left:'16px' }}><CertifiedBadge /></div>
          <button onClick={e=>{e.preventDefault();setSaved(!saved)}} style={{ position:'absolute', top:'16px', right:'16px', width:'32px', height:'32px', borderRadius:'50%', backgroundColor:'rgba(255,255,255,0.2)', border:'1px solid rgba(255,255,255,0.3)', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer' }}>
            <Heart size={14} color={saved?'#ef4444':'white'} fill={saved?'#ef4444':'none'} />
          </button>
        </div>
        <div style={{ flex:1, padding:'28px 32px', display:'flex', flexDirection:'column' as const, justifyContent:'space-between' }}>
          <div>
            <div style={{ display:'flex', alignItems:'center', gap:'8px', marginBottom:'10px' }}><Stars rating={item.rating} /><span style={{ fontWeight:900, fontSize:'13px', color:'#161d1b' }}>{item.rating}</span><span style={{ fontSize:'12px', color:'#6b7a76' }}>({item.reviews} reviews)</span></div>
            <h3 style={{ fontWeight:900, letterSpacing:'-0.05em', fontSize:'20px', color:'#161d1b', marginBottom:'10px', lineHeight:1.2 }}>{item.title}</h3>
            <p style={{ fontSize:'13px', color:'#6b7a76', lineHeight:1.7, marginBottom:'16px' }}>{item.desc}</p>
            <p style={{ fontSize:'12px', color:'#6b7a76', display:'flex', alignItems:'center', gap:'4px' }}><MapPin size={12} />{item.location}</p>
          </div>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginTop:'20px' }}>
            <span style={{ fontWeight:900, fontSize:'24px', color:'#22d4a8' }}>{item.price.toLocaleString()} MAD</span>
            <div style={{ display:'flex', gap:'8px' }}>
              <button onClick={e=>e.preventDefault()} style={{ padding:'10px 20px', borderRadius:'100px', border:'1px solid #22d4a8', backgroundColor:'transparent', color:'#22d4a8', fontWeight:700, fontSize:'12px', cursor:'pointer', display:'flex', alignItems:'center', gap:'5px' }}><MessageCircle size={13} />Message</button>
              <button onClick={e=>e.preventDefault()} style={{ padding:'10px 20px', borderRadius:'100px', border:'none', backgroundColor:'#25D366', color:'white', fontWeight:700, fontSize:'12px', cursor:'pointer' }}>WhatsApp</button>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
function DiscoCard({ item, locale }: { item: typeof discoveryGrid[0], locale: string }) {
  const [saved, setSaved] = useState(false)
  const [hov, setHov] = useState(false)
  return (
    <Link href={`/${locale}/listing/${item.id}`} style={{ textDecoration:'none' }}>
      <div onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
        style={{ display:'flex', backgroundColor:'white', borderRadius:'24px', overflow:'hidden', border:'1px solid #f1f5f9', boxShadow:hov?'0 16px 32px rgba(0,0,0,0.1)':'0 2px 8px rgba(0,0,0,0.04)', transition:'all 0.25s' }}>
        <div style={{ position:'relative', width:'160px', flexShrink:0, overflow:'hidden' }}>
          <img src={item.image} alt={item.title} style={{ width:'100%', height:'100%', objectFit:'cover', transition:'transform 0.5s', transform:hov?'scale(1.06)':'scale(1)' }} />
          <div style={{ position:'absolute', top:'8px', left:'8px' }}><CertifiedBadge /></div>
        </div>
        <div style={{ flex:1, padding:'16px 20px', display:'flex', flexDirection:'column' as const, justifyContent:'space-between' }}>
          <p style={{ fontSize:'11px', color:'#6b7a76', marginBottom:'4px', display:'flex', alignItems:'center', gap:'3px' }}><MapPin size={10} />{item.location}</p>
          <h4 style={{ fontWeight:900, letterSpacing:'-0.05em', fontSize:'14px', color:'#161d1b', marginBottom:'8px', lineHeight:1.3 }}>{item.title}</h4>
          <p style={{ fontWeight:900, fontSize:'18px', color:'#22d4a8', marginBottom:'12px' }}>{item.price.toLocaleString()} MAD</p>
          <div style={{ display:'flex', gap:'6px' }}>
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
  const [tab, setTab] = useState('All')
  const [diamond, setDiamond] = useState(true)
  const [page, setPage] = useState(1)
  const [grid, setGrid] = useState(true)
  const [keyword, setKeyword] = useState('')
  const [city, setCity] = useState('')

  return (
    <div style={{ fontFamily:'Inter, sans-serif', backgroundColor:'#f4fbf8', minHeight:'100vh' }}>

      <section style={{ position:'relative', height:'400px', overflow:'hidden', display:'flex', alignItems:'center', justifyContent:'center' }}>
        <img src={HERO} alt="Home Maintenance" style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover' }} />
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top,rgba(15,23,42,0.88),rgba(15,23,42,0.4))' }} />
        <div style={{ position:'relative', zIndex:10, textAlign:'center', padding:'0 20px', maxWidth:'760px', width:'100%' }}>
          <p style={{ fontSize:'11px', fontWeight:800, color:'#22d4a8', textTransform:'uppercase' as const, letterSpacing:'0.2em', marginBottom:'12px' }}>SOUKNI SERVICES</p>
          <h1 style={{ fontWeight:900, letterSpacing:'-0.05em', fontSize:'clamp(28px,5vw,52px)', color:'white', marginBottom:'12px', lineHeight:1.05 }}>Home Maintenance</h1>
          <p style={{ fontSize:'15px', color:'rgba(255,255,255,0.82)', marginBottom:'28px' }}>Plumbing, electrical, cleaning, painting, AC and full renovation across Morocco</p>
          <div style={{ display:'flex', alignItems:'stretch', backgroundColor:'rgba(255,255,255,0.12)', backdropFilter:'blur(24px)', border:'1px solid rgba(255,255,255,0.25)', borderRadius:'100px', overflow:'hidden', maxWidth:'620px', margin:'0 auto' }}>
            <div style={{ display:'flex', flexDirection:'column' as const, padding:'12px 20px', flex:'0 0 160px', borderRight:'1px solid rgba(255,255,255,0.2)', gap:'2px' }}>
              <span style={{ fontSize:'9px', fontWeight:800, color:'rgba(255,255,255,0.6)', textTransform:'uppercase' as const, letterSpacing:'0.12em' }}>City</span>
              <input value={city} onChange={e=>setCity(e.target.value)} placeholder="Rabat" style={{ backgroundColor:'transparent', border:'none', outline:'none', fontSize:'13px', fontWeight:600, color:'white', padding:0, width:'100%' }} />
            </div>
            <div style={{ display:'flex', flexDirection:'column' as const, padding:'12px 20px', flex:1, borderRight:'1px solid rgba(255,255,255,0.2)', gap:'2px' }}>
              <span style={{ fontSize:'9px', fontWeight:800, color:'rgba(255,255,255,0.6)', textTransform:'uppercase' as const, letterSpacing:'0.12em' }}>Keyword</span>
              <input value={keyword} onChange={e=>setKeyword(e.target.value)} placeholder="Plumber, electrician, cleaning..." style={{ backgroundColor:'transparent', border:'none', outline:'none', fontSize:'13px', fontWeight:600, color:'white', padding:0, width:'100%' }} />
            </div>
            <button style={{ backgroundColor:'#22d4a8', color:'white', border:'none', padding:'0 28px', fontWeight:800, fontSize:'13px', cursor:'pointer', display:'flex', alignItems:'center', gap:'6px', flexShrink:0 }}><Search size={15} /> Search</button>
          </div>
        </div>
      </section>

      <div style={{ maxWidth:'1440px', margin:'-24px auto 0', padding:'0 40px', position:'relative', zIndex:30 }}>
        <div style={{ backgroundColor:'rgba(255,255,255,0.9)', backdropFilter:'blur(20px)', borderRadius:'100px', padding:'8px 8px 8px 24px', boxShadow:'0 8px 40px rgba(0,0,0,0.12)', border:'1px solid rgba(255,255,255,0.6)', display:'flex', alignItems:'center' }}>
          {[['City','Rabat'],['Keyword','Plumber, electrician, cleaning...'],['Budget','Any Range'],['Availability','Anytime'],['Filters','All']].map(([l,v],i)=>(
            <div key={l} style={{ flex:i===1?2:1, padding:'6px 18px', borderRight:i<4?'1px solid rgba(186,202,197,0.3)':'none', display:'flex', flexDirection:'column' as const, cursor:'pointer', gap:'1px' }}>
              <span style={{ fontSize:'9px', textTransform:'uppercase' as const, fontWeight:700, color:'#6b7a76', letterSpacing:'0.1em' }}>{l}</span>
              <span style={{ fontSize:'13px', fontWeight:500, color:'#161d1b' }}>{v}</span>
            </div>
          ))}
          <button style={{ backgroundColor:'#22d4a8', color:'white', border:'none', padding:'12px 24px', borderRadius:'100px', cursor:'pointer', display:'flex', alignItems:'center', gap:'6px', fontWeight:700, fontSize:'12px', flexShrink:0, marginLeft:'8px' }}><Search size={14} /> SEARCH</button>
        </div>
      </div>

      <div style={{ maxWidth:'1440px', margin:'28px auto 0', padding:'0 40px 64px' }}>
        <nav style={{ display:'flex', alignItems:'center', gap:'6px', fontSize:'11px', fontWeight:700, color:'#6b7a76', textTransform:'uppercase' as const, letterSpacing:'0.06em', marginBottom:'8px' }}>
          <Link href={`/${locale}`} style={{ color:'#6b7a76', textDecoration:'none' }}>Home</Link><span>›</span>
          <Link href={`/${locale}/services`} style={{ color:'#6b7a76', textDecoration:'none' }}>Services</Link><span>›</span>
          <span style={{ color:'#161d1b' }}>Home Maintenance</span>
        </nav>

        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'4px' }}>
          <h2 style={{ fontWeight:900, letterSpacing:'-0.05em', fontSize:'22px', color:'#161d1b' }}>Home Maintenance in Morocco</h2>
          <div style={{ display:'flex', gap:'8px' }}>
            <button style={{ display:'flex', alignItems:'center', gap:'6px', padding:'8px 14px', borderRadius:'12px', border:'1px solid rgba(186,202,197,0.4)', backgroundColor:'#eef5f2', fontSize:'12px', fontWeight:700, cursor:'pointer', color:'#161d1b' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="3" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="13" y1="18" x2="21" y2="18"/></svg>Sort
            </button>
            <button style={{ display:'flex', alignItems:'center', gap:'6px', padding:'8px 14px', borderRadius:'12px', border:'1px solid rgba(186,202,197,0.4)', backgroundColor:'#eef5f2', fontSize:'12px', fontWeight:700, cursor:'pointer', color:'#161d1b' }}>🔖 Save</button>
          </div>
        </div>
        <p style={{ fontSize:'14px', color:'#6b7a76', marginBottom:'24px' }}>Verified home maintenance professionals across Morocco</p>

        <section style={{ marginBottom:'32px' }}>
          <h2 style={{ fontWeight:900, fontSize:'14px', color:'#161d1b', textTransform:'uppercase' as const, letterSpacing:'0.1em', marginBottom:'16px' }}>BROWSE BY SERVICE</h2>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(6,1fr)', gap:'12px' }}>
            {SUBCATS.map(sub=>(
              <Link key={sub.slug} href={`/${locale}/services/home-maintenance/${sub.slug}`} style={{ textDecoration:'none' }}>
                <div style={{ position:'relative', borderRadius:'20px', overflow:'hidden', cursor:'pointer', transition:'transform 0.2s', aspectRatio:'1/1' }}
                  onMouseEnter={e=>(e.currentTarget as HTMLDivElement).style.transform='scale(1.04)'}
                  onMouseLeave={e=>(e.currentTarget as HTMLDivElement).style.transform='scale(1)'}>
                  <img src={sub.image} alt={sub.label} style={{ width:'100%', height:'100%', objectFit:'cover' }} />
                  <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top,rgba(0,0,0,0.82),rgba(0,0,0,0.1))' }} />
                  <div style={{ position:'absolute', bottom:'10px', left:'10px', right:'10px' }}>
                    <p style={{ fontSize:'11px', fontWeight:800, color:'white', lineHeight:1.2, textTransform:'uppercase' as const, letterSpacing:'0.06em' }}>{sub.label}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'12px 0', borderTop:'1px solid rgba(186,202,197,0.25)', borderBottom:'1px solid rgba(186,202,197,0.25)', marginBottom:'16px', flexWrap:'wrap' as const, gap:'10px' }}>
          <div style={{ display:'flex', gap:'4px', padding:'4px', backgroundColor:'#e8efec', borderRadius:'100px' }}>
            {['All','Online','In-Person','Home Visit'].map(t=>(
              <button key={t} onClick={()=>setTab(t)} style={{ padding:'8px 20px', borderRadius:'100px', fontSize:'11px', fontWeight:700, cursor:'pointer', border:'none', transition:'all 0.2s',
                backgroundColor:tab===t?'#161d1b':'transparent', color:tab===t?'white':'#6b7a76',
                boxShadow:tab===t?'0 2px 8px rgba(0,0,0,0.15)':'none' }}>{t}</button>
            ))}
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:'16px' }}>
            <div style={{ display:'flex', alignItems:'center', gap:'8px', cursor:'pointer' }} onClick={()=>setDiamond(!diamond)}>
              <span style={{ fontSize:'12px', fontWeight:700, color:'#6b7a76' }}>Diamond Verified First</span>
              <div style={{ width:'40px', height:'20px', borderRadius:'100px', backgroundColor:diamond?'#22d4a8':'#bacac5', position:'relative', transition:'background 0.25s' }}>
                <div style={{ position:'absolute', top:'2px', left:diamond?'22px':'2px', width:'16px', height:'16px', borderRadius:'50%', backgroundColor:'white', transition:'left 0.25s' }} />
              </div>
            </div>
            <div style={{ display:'flex', gap:'6px' }}>
              <button onClick={()=>setGrid(true)} style={{ width:'34px', height:'34px', display:'flex', alignItems:'center', justifyContent:'center', borderRadius:'8px', border:'none', cursor:'pointer', backgroundColor:grid?'#161d1b':'#e8efec', color:grid?'white':'#161d1b' }}><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg></button>
              <button onClick={()=>setGrid(false)} style={{ width:'34px', height:'34px', display:'flex', alignItems:'center', justifyContent:'center', borderRadius:'8px', border:'none', cursor:'pointer', backgroundColor:!grid?'#161d1b':'#e8efec', color:!grid?'white':'#161d1b' }}><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg></button>
            </div>
          </div>
        </div>

        <div style={{ display:'flex', gap:'8px', marginBottom:'32px', flexWrap:'wrap' as const }}>
          {[{label:'New Arrivals',active:true},{label:'Top Rated',active:false},{label:'Best Price',active:false}].map(c=>(
            <button key={c.label} style={{ padding:'8px 18px', borderRadius:'100px', fontSize:'12px', fontWeight:700, cursor:'pointer', border:c.active?'none':'1px solid rgba(186,202,197,0.5)', backgroundColor:c.active?'#161d1b':'white', color:c.active?'white':'#3c4a46' }}>{c.label}</button>
          ))}
        </div>

        <section style={{ marginBottom:'40px' }}>
          <h2 style={{ fontSize:'13px', fontWeight:900, color:'#161d1b', textTransform:'uppercase' as const, letterSpacing:'0.1em', marginBottom:'20px' }}>SOUKNI TOP CHOICES</h2>
          {topChoices.map(item=><TopCard key={item.id} item={item} locale={locale} />)}
        </section>

        <div style={{ borderRadius:'40px', overflow:'hidden', marginBottom:'40px', background:'linear-gradient(135deg,#161d1b,#1a2e28)', padding:'40px 48px', display:'grid', gridTemplateColumns:'1fr 1fr', gap:'40px', alignItems:'center' }}>
          <div>
            <p style={{ fontSize:'10px', fontWeight:700, color:'#22d4a8', textTransform:'uppercase' as const, letterSpacing:'0.15em', marginBottom:'8px' }}>SouKni Immo Pro</p>
            <h3 style={{ fontWeight:900, letterSpacing:'-0.05em', fontSize:'28px', color:'white', marginBottom:'12px', lineHeight:1.1 }}>List your luxury property where Morocco's elite browse.</h3>
            <Link href={`/${locale}/property`} style={{ textDecoration:'none' }}><button style={{ backgroundColor:'#22d4a8', color:'white', border:'none', padding:'11px 24px', borderRadius:'100px', fontWeight:700, fontSize:'12px', cursor:'pointer' }}>Explore Properties</button></Link>
          </div>
          <div style={{ position:'relative', height:'200px', borderRadius:'24px', overflow:'hidden' }}>
            <img src="https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&w=800" alt="Property" style={{ width:'100%', height:'100%', objectFit:'cover', opacity:0.7 }} />
          </div>
        </div>

        <section style={{ marginBottom:'40px' }}>
          <h2 style={{ fontWeight:900, letterSpacing:'-0.05em', fontSize:'22px', color:'#22d4a8', marginBottom:'16px' }}>SouKni Home Maintenance Collection</h2>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'16px', marginBottom:'16px' }}>
            {bentoListings.slice(0,3).map(item=>(
              <Link key={item.id} href={`/${locale}/listing/${item.id}`} style={{ textDecoration:'none' }}>
                <div style={{ position:'relative', height:'220px', borderRadius:'28px', overflow:'hidden', cursor:'pointer', transition:'transform 0.2s' }} onMouseEnter={e=>(e.currentTarget as HTMLDivElement).style.transform='scale(1.02)'} onMouseLeave={e=>(e.currentTarget as HTMLDivElement).style.transform='scale(1)'}>
                  <img src={item.image} alt={item.title} style={{ width:'100%', height:'100%', objectFit:'cover' }} />
                  <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top,rgba(0,0,0,0.85),rgba(0,0,0,0.05))' }} />
                  <div style={{ position:'absolute', top:'12px', left:'12px' }}><CertifiedBadge /></div>
                  <div style={{ position:'absolute', bottom:'16px', left:'16px', right:'16px' }}>
                    <h3 style={{ fontWeight:900, fontSize:'14px', color:'white', marginBottom:'4px', lineHeight:1.3 }}>{item.title}</h3>
                    <p style={{ fontWeight:900, fontSize:'16px', color:'#22d4a8' }}>{item.price.toLocaleString()} MAD</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'16px' }}>
            {bentoListings.slice(3).map(item=>(
              <Link key={item.id} href={`/${locale}/listing/${item.id}`} style={{ textDecoration:'none' }}>
                <div style={{ position:'relative', height:'200px', borderRadius:'28px', overflow:'hidden', cursor:'pointer', transition:'transform 0.2s' }} onMouseEnter={e=>(e.currentTarget as HTMLDivElement).style.transform='scale(1.02)'} onMouseLeave={e=>(e.currentTarget as HTMLDivElement).style.transform='scale(1)'}>
                  <img src={item.image} alt={item.title} style={{ width:'100%', height:'100%', objectFit:'cover' }} />
                  <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top,rgba(0,0,0,0.85),rgba(0,0,0,0.05))' }} />
                  <div style={{ position:'absolute', top:'12px', left:'12px' }}><CertifiedBadge /></div>
                  <div style={{ position:'absolute', bottom:'16px', left:'16px', right:'16px' }}>
                    <h3 style={{ fontWeight:900, fontSize:'15px', color:'white', marginBottom:'4px' }}>{item.title}</h3>
                    <p style={{ fontWeight:900, fontSize:'17px', color:'#22d4a8' }}>{item.price.toLocaleString()} MAD</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section style={{ marginBottom:'40px' }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'20px' }}>
            <h2 style={{ fontWeight:900, letterSpacing:'-0.05em', fontSize:'20px', color:'#161d1b' }}>More Home Maintenance Services</h2>
            <Link href="#" style={{ color:'#22d4a8', fontWeight:700, fontSize:'13px', textDecoration:'none', display:'flex', alignItems:'center', gap:'3px' }}>View all <ChevronRight size={14} /></Link>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'16px' }}>
            {discoveryGrid.map(item=><DiscoCard key={item.id} item={item} locale={locale} />)}
          </div>
        </section>

        <div style={{ display:'flex', justifyContent:'center', alignItems:'center', gap:'8px', marginBottom:'48px' }}>
          {[1,2,3,4].map(p=><button key={p} onClick={()=>setPage(p)} style={{ width:'36px', height:'36px', borderRadius:'10px', border:page===p?'none':'1px solid #e2e8f0', backgroundColor:page===p?'#22d4a8':'white', color:page===p?'white':'#161d1b', fontWeight:700, fontSize:'13px', cursor:'pointer' }}>{p}</button>)}
        </div>

        <section style={{ borderRadius:'40px', background:'linear-gradient(135deg,#22d4a8,#0f9b8e)', padding:'56px 48px', display:'flex', alignItems:'center', justifyContent:'space-between', gap:'40px', flexWrap:'wrap' as const, marginBottom:'48px' }}>
          <div>
            <h2 style={{ fontWeight:900, letterSpacing:'-0.05em', fontSize:'36px', color:'white', marginBottom:'10px', lineHeight:1.05 }}>JOIN THE SOUKNI FAMILY</h2>
            <p style={{ fontSize:'15px', color:'rgba(255,255,255,0.85)', maxWidth:'480px', lineHeight:1.7 }}>List your home maintenance service for free and reach thousands of homeowners across Morocco.</p>
            <div style={{ display:'flex', gap:'12px', marginTop:'24px' }}>
              <button style={{ backgroundColor:'white', color:'#0f9b8e', border:'none', padding:'12px 24px', borderRadius:'100px', fontWeight:800, fontSize:'13px', cursor:'pointer' }}>App Store</button>
              <button style={{ backgroundColor:'rgba(255,255,255,0.2)', color:'white', border:'1px solid rgba(255,255,255,0.4)', padding:'12px 24px', borderRadius:'100px', fontWeight:800, fontSize:'13px', cursor:'pointer' }}>Google Play</button>
            </div>
          </div>
          <Link href={`/${locale}/post-ad`} style={{ textDecoration:'none' }}>
            <span style={{ display:'inline-block', backgroundColor:'white', color:'#0f9b8e', padding:'16px 36px', borderRadius:'100px', fontWeight:900, fontSize:'14px', cursor:'pointer', whiteSpace:'nowrap' as const }}>Post Free Ad →</span>
          </Link>
        </section>

        <div style={{ textAlign:'center' as const }}>
          <Link href={`/${locale}/services`}
            style={{ display:'inline-flex', alignItems:'center', gap:'8px', padding:'14px 40px', borderRadius:'100px', backgroundColor:'#161d1b', color:'white', textDecoration:'none', fontSize:'12px', fontWeight:700, textTransform:'uppercase' as const, letterSpacing:'0.1em', transition:'background 0.2s' }}
            onMouseEnter={e=>e.currentTarget.style.backgroundColor='#22d4a8'}
            onMouseLeave={e=>e.currentTarget.style.backgroundColor='#161d1b'}>
            ← Back to All Services
          </Link>
        </div>

      </div>
    </div>
  )
}
