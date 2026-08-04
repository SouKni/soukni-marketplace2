'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { Search, MapPin, Heart, MessageCircle, ChevronRight, Star } from 'lucide-react'

const HERO = 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&w=800'
const topChoices = [
  { id:'fm1', title:'Fleet Manager — National Distribution', desc:'National distributor seeking a Fleet Manager for a 120-vehicle fleet across Morocco. Telematics, maintenance scheduling, and driver compliance ownership.', price:24000, location:'Casablanca, Ain Sebaa', rating:4.9, reviews:14, image:HERO },
  { id:'fm2', title:'Fleet Coordinator — Last-Mile', desc:'Same-day delivery company hiring a Fleet Coordinator for route optimisation, driver scheduling, and vehicle utilisation reporting.', price:14000, location:'Casablanca, Maarif', rating:4.8, reviews:22, image:HERO },
  { id:'fm3', title:'Fleet Maintenance Supervisor', desc:'Transport company seeking a Fleet Maintenance Supervisor to manage a team of 8 mechanics and oversee preventive and corrective maintenance for 60 trucks.', price:18000, location:'Tangier', rating:4.7, reviews:17, image:HERO },
]
const bentoListings = [
  { id:'fmb1', title:'Fleet Administrator', price:10000, location:'Casablanca', image:HERO },
  { id:'fmb2', title:'Driver Trainer & Assessor', price:13000, location:'Rabat', image:HERO },
  { id:'fmb3', title:'Telematics Analyst', price:12000, location:'Casablanca', image:HERO },
  { id:'fmb4', title:'Vehicle Compliance Officer', price:11000, location:'Casablanca', image:HERO },
  { id:'fmb5', title:'Fleet Procurement Specialist', price:16000, location:'Rabat', image:HERO },
]
const discoveryGrid = [
  { id:'fmd1', title:'HGV Fleet Planner', price:13000, location:'Casablanca', image:HERO },
  { id:'fmd2', title:'Fleet Insurance Coordinator', price:11000, location:'Rabat', image:HERO },
  { id:'fmd3', title:'Electric Fleet Transition Manager', price:20000, location:'Casablanca', image:HERO },
  { id:'fmd4', title:'Driver Recruitment Specialist', price:12000, location:'Casablanca', image:HERO },
  { id:'fmd5', title:'Fleet Data Analyst', price:14000, location:'Rabat', image:HERO },
  { id:'fmd6', title:'Vehicle Damage Inspector', price:10000, location:'Casablanca', image:HERO },
  { id:'fmd7', title:'Fleet Cost Controller', price:15000, location:'Tangier', image:HERO },
  { id:'fmd8', title:'Fleet Operations Dispatcher', price:11000, location:'Casablanca', image:HERO },
]

function CertifiedBadge() {
  return <span style={{ display:'inline-flex', alignItems:'center', gap:'4px', background:'linear-gradient(135deg,#22d4a8,#0f9b8e)', color:'white', fontSize:'8px', fontWeight:900, padding:'3px 10px', borderRadius:'100px', textTransform:'uppercase' as const, letterSpacing:'0.08em' }}>✦ SOUKNI CERTIFIED</span>
}
function Stars({ rating }: { rating: number }) {
  return <div style={{ display:'flex', gap:'1px' }}>{[1,2,3,4,5].map(i=><Star key={i} size={11} fill={i<=Math.floor(rating)?'#f59e0b':'none'} color="#f59e0b" />)}</div>
}
function TopChoiceCard({ item, locale }: { item: typeof topChoices[0], locale: string }) {
  const [saved, setSaved] = useState(false)
  const [hov, setHov] = useState(false)
  return (
    <Link href={`/${locale}/listing/${item.id}`} style={{ textDecoration:'none' }}>
      <div onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
        style={{ display:'flex', backgroundColor:'white', borderRadius:'40px', overflow:'hidden', border:'1px solid #f1f5f9', boxShadow:hov?'0 20px 48px rgba(0,0,0,0.12)':'0 2px 12px rgba(0,0,0,0.05)', transition:'all 0.3s', marginBottom:'16px' }}>
        <div style={{ position:'relative', width:'320px', flexShrink:0, overflow:'hidden' }}>
          <img src={item.image} alt={item.title} style={{ width:'100%', height:'100%', objectFit:'cover', transition:'transform 0.6s', transform:hov?'scale(1.06)':'scale(1)' }} />
          <div style={{ position:'absolute', top:'16px', left:'16px' }}><CertifiedBadge /></div>
          <button onClick={e=>{e.preventDefault();setSaved(!saved)}} style={{ position:'absolute', top:'16px', right:'16px', width:'32px', height:'32px', borderRadius:'50%', backgroundColor:'rgba(255,255,255,0.2)', border:'1px solid rgba(255,255,255,0.3)', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer' }}>
            <Heart size={14} color={saved?'#ef4444':'white'} fill={saved?'#ef4444':'none'} />
          </button>
        </div>
        <div style={{ flex:1, padding:'28px 32px', display:'flex', flexDirection:'column' as const, justifyContent:'space-between' }}>
          <div>
            <div style={{ display:'flex', alignItems:'center', gap:'8px', marginBottom:'10px' }}><Stars rating={item.rating} /><span style={{ fontWeight:900, fontSize:'13px', color:'#161d1b' }}>{item.rating}</span><span style={{ fontSize:'12px', color:'#6b7a76' }}>({item.reviews} applicants)</span></div>
            <h3 style={{ fontWeight:900, letterSpacing:'-0.05em', fontSize:'20px', color:'#161d1b', marginBottom:'10px', lineHeight:1.2 }}>{item.title}</h3>
            <p style={{ fontSize:'13px', color:'#6b7a76', lineHeight:1.7, marginBottom:'16px' }}>{item.desc}</p>
            <p style={{ fontSize:'12px', color:'#6b7a76', display:'flex', alignItems:'center', gap:'4px' }}><MapPin size={12} />{item.location}</p>
          </div>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginTop:'20px' }}>
            <div><span style={{ fontWeight:900, fontSize:'24px', color:'#22d4a8' }}>{item.price.toLocaleString()} MAD</span><span style={{ fontSize:'12px', color:'#6b7a76' }}> / month</span></div>
            <div style={{ display:'flex', gap:'8px' }}>
              <button onClick={e=>e.preventDefault()} style={{ padding:'10px 20px', borderRadius:'100px', border:'1px solid #22d4a8', backgroundColor:'transparent', color:'#22d4a8', fontWeight:700, fontSize:'12px', cursor:'pointer', display:'flex', alignItems:'center', gap:'5px' }}><MessageCircle size={13} />Apply Now</button>
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
            <button onClick={e=>{e.preventDefault();setSaved(!saved)}} style={{ flex:1, backgroundColor:'#eef5f2', color:'#3c4a46', border:'none', padding:'8px', borderRadius:'100px', fontWeight:700, fontSize:'11px', cursor:'pointer' }}>Apply</button>
            <button onClick={e=>e.preventDefault()} style={{ flex:1, backgroundColor:'#25D366', color:'white', border:'none', padding:'8px', borderRadius:'100px', fontWeight:700, fontSize:'11px', cursor:'pointer' }}>WhatsApp</button>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = React.use(params)
  const [city, setCity] = useState('')
  const [keyword, setKeyword] = useState('')
  const [tab, setTab] = useState('All')
  const [page, setPage] = useState(1)
  return (
    <div style={{ fontFamily:'Inter, sans-serif', backgroundColor:'#f4fbf8', minHeight:'100vh' }}>
      <section style={{ position:'relative', height:'440px', overflow:'hidden', display:'flex', alignItems:'center', justifyContent:'center' }}>
        <img src={HERO} alt='Fleet Management' style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover' }} />
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top,rgba(15,23,42,0.88),rgba(15,23,42,0.4))' }} />
        <div style={{ position:'relative', zIndex:10, textAlign:'center', padding:'0 20px', maxWidth:'760px', width:'100%' }}>
          <h1 style={{ fontWeight:900, letterSpacing:'-0.05em', fontSize:'clamp(32px,5vw,52px)', color:'white', marginBottom:'12px', lineHeight:1.05 }}>Fleet Management Jobs in Morocco!</h1>
          <p style={{ fontSize:'15px', color:'rgba(255,255,255,0.82)', marginBottom:'32px' }}>145 verified positions across Morocco</p>
          <div style={{ display:'flex', alignItems:'stretch', backgroundColor:'rgba(255,255,255,0.12)', backdropFilter:'blur(24px)', border:'1px solid rgba(255,255,255,0.25)', borderRadius:'100px', overflow:'hidden', maxWidth:'680px', margin:'0 auto' }}>
            <div style={{ display:'flex', flexDirection:'column' as const, padding:'14px 20px', flex:'0 0 180px', borderRight:'1px solid rgba(255,255,255,0.2)', gap:'2px' }}>
              <span style={{ fontSize:'9px', fontWeight:800, color:'rgba(255,255,255,0.6)', textTransform:'uppercase' as const, letterSpacing:'0.12em' }}>City</span>
              <input value={city} onChange={e=>setCity(e.target.value)} placeholder="Casablanca" style={{ backgroundColor:'transparent', border:'none', outline:'none', fontSize:'14px', fontWeight:600, color:'white', padding:0, width:'100%' }} />
            </div>
            <div style={{ display:'flex', flexDirection:'column' as const, padding:'14px 20px', flex:1, borderRight:'1px solid rgba(255,255,255,0.2)', gap:'2px' }}>
              <span style={{ fontSize:'9px', fontWeight:800, color:'rgba(255,255,255,0.6)', textTransform:'uppercase' as const, letterSpacing:'0.12em' }}>Keyword</span>
              <input value={keyword} onChange={e=>setKeyword(e.target.value)} placeholder="Search..." style={{ backgroundColor:'transparent', border:'none', outline:'none', fontSize:'14px', fontWeight:600, color:'white', padding:0, width:'100%' }} />
            </div>
            <button style={{ backgroundColor:'#22d4a8', color:'white', border:'none', padding:'0 32px', fontWeight:800, fontSize:'14px', cursor:'pointer', display:'flex', alignItems:'center', gap:'8px', flexShrink:0 }}><Search size={16} /> Search</button>
          </div>
        </div>
      </section>
      <div style={{ maxWidth:'1440px', margin:'-28px auto 0', padding:'0 40px', position:'relative', zIndex:30 }}>
        <div style={{ backgroundColor:'rgba(255,255,255,0.9)', backdropFilter:'blur(20px)', borderRadius:'100px', padding:'10px 10px 10px 24px', boxShadow:'0 8px 40px rgba(0,0,0,0.12)', border:'1px solid rgba(255,255,255,0.6)', display:'flex', alignItems:'center' }}>
          {[['City','Casablanca'],['Job Title','Search...'],['Experience','All Levels'],['Salary','Any Range'],['Filters','All']].map(([l,v],i)=>(
            <div key={l} style={{ flex:i===1?2:1, padding:'6px 20px', borderRight:i<4?'1px solid rgba(186,202,197,0.3)':'none', display:'flex', flexDirection:'column' as const, cursor:'pointer', gap:'1px' }}>
              <span style={{ fontSize:'9px', textTransform:'uppercase' as const, fontWeight:700, color:'#6b7a76', letterSpacing:'0.1em' }}>{l}</span>
              <span style={{ fontSize:'13px', fontWeight:500, color:'#161d1b' }}>{v}</span>
            </div>
          ))}
          <button style={{ backgroundColor:'#22d4a8', color:'white', border:'none', padding:'14px 28px', borderRadius:'100px', cursor:'pointer', display:'flex', alignItems:'center', gap:'8px', fontWeight:700, fontSize:'13px', flexShrink:0, marginLeft:'8px' }}><Search size={16} /> SEARCH</button>
        </div>
      </div>
      <div style={{ maxWidth:'1440px', margin:'32px auto 0', padding:'0 40px 64px' }}>
        <nav style={{ display:'flex', alignItems:'center', gap:'6px', fontSize:'12px', fontWeight:700, color:'#6b7a76', textTransform:'uppercase' as const, letterSpacing:'0.06em', marginBottom:'8px' }}>
          <Link href={`/${locale}`} style={{ color:'#6b7a76', textDecoration:'none' }}>Home</Link><span>›</span>
          <Link href={`/${locale}/jobs`} style={{ color:'#6b7a76', textDecoration:'none' }}>Jobs</Link><span>›</span>
          <Link href={`/${locale}/jobs/logistics`} style={{ color:'#6b7a76', textDecoration:'none' }}>Logistics</Link><span>›</span>
          <span style={{ color:'#161d1b' }}>Fleet Management</span>
        </nav>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'4px' }}>
          <h2 style={{ fontWeight:900, letterSpacing:'-0.05em', fontSize:'22px', color:'#161d1b' }}>Fleet Management Jobs in Morocco</h2>
          <div style={{ display:'flex', gap:'8px' }}>
            <button style={{ padding:'8px 14px', borderRadius:'12px', border:'1px solid rgba(186,202,197,0.4)', backgroundColor:'#eef5f2', fontSize:'12px', fontWeight:700, cursor:'pointer', color:'#161d1b' }}>Sort: Default</button>
            <button style={{ padding:'8px 14px', borderRadius:'12px', border:'1px solid rgba(186,202,197,0.4)', backgroundColor:'#eef5f2', fontSize:'12px', fontWeight:700, cursor:'pointer', color:'#161d1b' }}>Save Search</button>
          </div>
        </div>
        <p style={{ fontSize:'14px', color:'#6b7a76', marginBottom:'32px' }}>145 positions across Morocco</p>
        <section style={{ marginBottom:'40px' }}>
          <h2 style={{ fontSize:'13px', fontWeight:900, color:'#161d1b', textTransform:'uppercase' as const, letterSpacing:'0.1em', marginBottom:'20px' }}>SOUKNI TOP CHOICES</h2>
          {topChoices.map(item=><TopChoiceCard key={item.id} item={item} locale={locale} />)}
        </section>
        <div style={{ display:'flex', gap:'8px', marginBottom:'32px', flexWrap:'wrap' as const }}>
          {['All','Full-Time','Part-Time','Commission'].map(t=>(
            <button key={t} onClick={()=>setTab(t)} style={{ padding:'8px 20px', borderRadius:'100px', fontSize:'12px', fontWeight:700, cursor:'pointer', border:'none', transition:'all 0.15s', backgroundColor:tab===t?'#161d1b':'#e8efec', color:tab===t?'white':'#3c4a46' }}>{t}</button>
          ))}
        </div>
        <div style={{ borderRadius:'40px', overflow:'hidden', marginBottom:'40px', background:'linear-gradient(135deg,#161d1b,#1a2e28)', padding:'40px 48px', display:'grid', gridTemplateColumns:'1fr 1fr', gap:'40px', alignItems:'center' }}>
          <div>
            <p style={{ fontSize:'10px', fontWeight:700, color:'#22d4a8', textTransform:'uppercase' as const, letterSpacing:'0.15em', marginBottom:'8px' }}>SouKni Mobiles & Electro Pro</p>
            <h3 style={{ fontWeight:900, letterSpacing:'-0.05em', fontSize:'28px', color:'white', marginBottom:'12px', lineHeight:1.1 }}>Your Premium tech and elite electronics marketplace.</h3>
            <div style={{ display:'flex', gap:'12px' }}>
              <Link href={`/${locale}/electronics`} style={{ textDecoration:'none' }}><button style={{ backgroundColor:'#22d4a8', color:'white', border:'none', padding:'11px 24px', borderRadius:'100px', fontWeight:700, fontSize:'12px', cursor:'pointer' }}>Explore Tech</button></Link>
              <button style={{ backgroundColor:'transparent', color:'white', border:'1px solid rgba(255,255,255,0.3)', padding:'11px 24px', borderRadius:'100px', fontWeight:700, fontSize:'12px', cursor:'pointer' }}>Contact Expert</button>
            </div>
          </div>
          <div style={{ position:'relative', height:'200px', borderRadius:'24px', overflow:'hidden' }}>
            <img src="https://images.pexels.com/photos/303383/pexels-photo-303383.jpeg?auto=compress&w=800" alt="Electronics" style={{ width:'100%', height:'100%', objectFit:'cover', opacity:0.7 }} />
          </div>
        </div>
        <section style={{ marginBottom:'40px' }}>
          <h2 style={{ fontWeight:900, letterSpacing:'-0.05em', fontSize:'22px', color:'#22d4a8', marginBottom:'16px' }}>SouKni Fleet Management Collection</h2>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'16px', marginBottom:'16px' }}>
            {bentoListings.slice(0,3).map(item=>(
              <Link key={item.id} href={`/${locale}/listing/${item.id}`} style={{ textDecoration:'none' }}>
                <div style={{ position:'relative', height:'220px', borderRadius:'28px', overflow:'hidden', cursor:'pointer', transition:'transform 0.2s' }} onMouseEnter={e=>(e.currentTarget as HTMLDivElement).style.transform='scale(1.02)'} onMouseLeave={e=>(e.currentTarget as HTMLDivElement).style.transform='scale(1)'}>
                  <img src={item.image} alt={item.title} style={{ width:'100%', height:'100%', objectFit:'cover' }} />
                  <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top,rgba(0,0,0,0.85),rgba(0,0,0,0.05))' }} />
                  <div style={{ position:'absolute', top:'12px', left:'12px' }}><CertifiedBadge /></div>
                  <div style={{ position:'absolute', bottom:'16px', left:'16px', right:'16px' }}>
                    <h3 style={{ fontWeight:900, fontSize:'15px', color:'white', marginBottom:'4px', lineHeight:1.3 }}>{item.title}</h3>
                    <p style={{ fontWeight:900, fontSize:'17px', color:'#22d4a8' }}>{item.price.toLocaleString()} MAD/mo</p>
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
                    <h3 style={{ fontWeight:900, fontSize:'16px', color:'white', marginBottom:'4px' }}>{item.title}</h3>
                    <p style={{ fontWeight:900, fontSize:'18px', color:'#22d4a8' }}>{item.price.toLocaleString()} MAD/mo</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
        <div style={{ borderRadius:'40px', backgroundColor:'#f5ede0', padding:'40px 48px', display:'grid', gridTemplateColumns:'1fr 1fr', gap:'40px', alignItems:'center', marginBottom:'40px' }}>
          <div>
            <p style={{ fontSize:'10px', fontWeight:700, color:'#8a7a5c', textTransform:'uppercase' as const, letterSpacing:'0.15em', marginBottom:'8px' }}>SouKni Immo Pro</p>
            <h3 style={{ fontWeight:900, letterSpacing:'-0.05em', fontSize:'28px', color:'#161d1b', marginBottom:'12px', lineHeight:1.1 }}>Morocco's most exclusive real estate and rental spaces.</h3>
            <div style={{ display:'flex', gap:'12px', marginTop:'20px' }}>
              <Link href={`/${locale}/property`} style={{ textDecoration:'none' }}><button style={{ backgroundColor:'#161d1b', color:'white', border:'none', padding:'11px 24px', borderRadius:'100px', fontWeight:700, fontSize:'12px', cursor:'pointer' }}>Explore Properties</button></Link>
              <button style={{ backgroundColor:'transparent', color:'#161d1b', border:'1px solid #161d1b', padding:'11px 24px', borderRadius:'100px', fontWeight:700, fontSize:'12px', cursor:'pointer' }}>Contact Expert</button>
            </div>
          </div>
          <div style={{ position:'relative', height:'200px', borderRadius:'24px', overflow:'hidden' }}>
            <img src="https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&w=800" alt="Property" style={{ width:'100%', height:'100%', objectFit:'cover' }} />
          </div>
        </div>
        <section style={{ marginBottom:'40px' }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'20px' }}>
            <h2 style={{ fontWeight:900, letterSpacing:'-0.05em', fontSize:'20px', color:'#161d1b' }}>More Fleet Management Positions</h2>
            <Link href="#" style={{ color:'#22d4a8', fontWeight:700, fontSize:'13px', textDecoration:'none', display:'flex', alignItems:'center', gap:'3px' }}>View all <ChevronRight size={14} /></Link>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'16px' }}>
            {discoveryGrid.map(item=><DiscoveryCard key={item.id} item={item} locale={locale} />)}
          </div>
        </section>
        <div style={{ display:'flex', justifyContent:'center', alignItems:'center', gap:'8px', marginBottom:'48px' }}>
          {[1,2,3,4].map(p=>(
            <button key={p} onClick={()=>setPage(p)} style={{ width:'36px', height:'36px', borderRadius:'10px', border:page===p?'none':'1px solid #e2e8f0', backgroundColor:page===p?'#22d4a8':'white', color:page===p?'white':'#161d1b', fontWeight:700, fontSize:'13px', cursor:'pointer' }}>{p}</button>
          ))}
          <button style={{ padding:'0 16px', height:'36px', borderRadius:'10px', border:'1px solid #e2e8f0', backgroundColor:'white', color:'#161d1b', fontWeight:700, fontSize:'13px', cursor:'pointer', display:'flex', alignItems:'center', gap:'4px' }}>Next <ChevronRight size={14} /></button>
        </div>
        <section style={{ marginBottom:'40px' }}>
          <h3 style={{ fontWeight:900, fontSize:'16px', color:'#161d1b', textTransform:'uppercase' as const, letterSpacing:'0.06em', marginBottom:'16px' }}>Explore Other Logistics Categories</h3>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(5,1fr)', gap:'12px' }}>
              <Link key="supply-chain" href={`/${locale}/jobs/logistics/supply-chain`}
                style={{ position:'relative', borderRadius:'20px', overflow:'hidden', textDecoration:'none', display:'block', border:'2px solid transparent', transition:'all 0.2s' }}
                onMouseEnter={e=>{e.currentTarget.style.borderColor='#22d4a8'}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor='transparent'}}
              >
                <div style={{ position:'relative', aspectRatio:'1/1', overflow:'hidden' }}>
                  <img src="https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&w=400" alt="Supply Chain" style={{ width:'100%', height:'100%', objectFit:'cover' }} />
                  <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top,rgba(0,0,0,0.7),rgba(0,0,0,0.1))' }} />
                  <div style={{ position:'absolute', bottom:'10px', left:0, right:0, textAlign:'center' as const, padding:'0 6px' }}>
                    <p style={{ fontSize:'11px', fontWeight:900, color:'white', lineHeight:1.2 }}>Supply Chain</p>
                  </div>
                </div>
              </Link>
              <Link key="warehouse" href={`/${locale}/jobs/logistics/warehouse`}
                style={{ position:'relative', borderRadius:'20px', overflow:'hidden', textDecoration:'none', display:'block', border:'2px solid transparent', transition:'all 0.2s' }}
                onMouseEnter={e=>{e.currentTarget.style.borderColor='#22d4a8'}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor='transparent'}}
              >
                <div style={{ position:'relative', aspectRatio:'1/1', overflow:'hidden' }}>
                  <img src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&w=400" alt="Warehouse" style={{ width:'100%', height:'100%', objectFit:'cover' }} />
                  <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top,rgba(0,0,0,0.7),rgba(0,0,0,0.1))' }} />
                  <div style={{ position:'absolute', bottom:'10px', left:0, right:0, textAlign:'center' as const, padding:'0 6px' }}>
                    <p style={{ fontSize:'11px', fontWeight:900, color:'white', lineHeight:1.2 }}>Warehouse</p>
                  </div>
                </div>
              </Link>
              <Link key="import-export" href={`/${locale}/jobs/logistics/import-export`}
                style={{ position:'relative', borderRadius:'20px', overflow:'hidden', textDecoration:'none', display:'block', border:'2px solid transparent', transition:'all 0.2s' }}
                onMouseEnter={e=>{e.currentTarget.style.borderColor='#22d4a8'}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor='transparent'}}
              >
                <div style={{ position:'relative', aspectRatio:'1/1', overflow:'hidden' }}>
                  <img src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&w=400" alt="Import/Export" style={{ width:'100%', height:'100%', objectFit:'cover' }} />
                  <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top,rgba(0,0,0,0.7),rgba(0,0,0,0.1))' }} />
                  <div style={{ position:'absolute', bottom:'10px', left:0, right:0, textAlign:'center' as const, padding:'0 6px' }}>
                    <p style={{ fontSize:'11px', fontWeight:900, color:'white', lineHeight:1.2 }}>Import/Export</p>
                  </div>
                </div>
              </Link>
              <Link key="last-mile-delivery" href={`/${locale}/jobs/logistics/last-mile-delivery`}
                style={{ position:'relative', borderRadius:'20px', overflow:'hidden', textDecoration:'none', display:'block', border:'2px solid transparent', transition:'all 0.2s' }}
                onMouseEnter={e=>{e.currentTarget.style.borderColor='#22d4a8'}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor='transparent'}}
              >
                <div style={{ position:'relative', aspectRatio:'1/1', overflow:'hidden' }}>
                  <img src="https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&w=400" alt="Last-Mile Delivery" style={{ width:'100%', height:'100%', objectFit:'cover' }} />
                  <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top,rgba(0,0,0,0.7),rgba(0,0,0,0.1))' }} />
                  <div style={{ position:'absolute', bottom:'10px', left:0, right:0, textAlign:'center' as const, padding:'0 6px' }}>
                    <p style={{ fontSize:'11px', fontWeight:900, color:'white', lineHeight:1.2 }}>Last-Mile Delivery</p>
                  </div>
                </div>
              </Link>
              <Link key="cold-chain" href={`/${locale}/jobs/logistics/cold-chain`}
                style={{ position:'relative', borderRadius:'20px', overflow:'hidden', textDecoration:'none', display:'block', border:'2px solid transparent', transition:'all 0.2s' }}
                onMouseEnter={e=>{e.currentTarget.style.borderColor='#22d4a8'}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor='transparent'}}
              >
                <div style={{ position:'relative', aspectRatio:'1/1', overflow:'hidden' }}>
                  <img src="https://images.pexels.com/photos/1546168/pexels-photo-1546168.jpeg?auto=compress&w=400" alt="Cold Chain" style={{ width:'100%', height:'100%', objectFit:'cover' }} />
                  <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top,rgba(0,0,0,0.7),rgba(0,0,0,0.1))' }} />
                  <div style={{ position:'absolute', bottom:'10px', left:0, right:0, textAlign:'center' as const, padding:'0 6px' }}>
                    <p style={{ fontSize:'11px', fontWeight:900, color:'white', lineHeight:1.2 }}>Cold Chain</p>
                  </div>
                </div>
              </Link>

          </div>
        </section>
        <div style={{ textAlign:'center' as const, marginBottom:'40px' }}>
          <Link href={`/${locale}/jobs/logistics`}
            style={{ display:'inline-flex', alignItems:'center', gap:'8px', padding:'14px 36px', borderRadius:'100px', backgroundColor:'#161d1b', color:'white', textDecoration:'none', fontSize:'12px', fontWeight:900, textTransform:'uppercase' as const, letterSpacing:'0.1em' }}
            onMouseEnter={e=>e.currentTarget.style.backgroundColor='#22d4a8'}
            onMouseLeave={e=>e.currentTarget.style.backgroundColor='#161d1b'}
          >← Back to Logistics</Link>
        </div>
        <section style={{ borderRadius:'40px', background:'linear-gradient(135deg,#22d4a8,#0f9b8e)', padding:'56px 48px', display:'flex', alignItems:'center', justifyContent:'space-between', gap:'40px', flexWrap:'wrap' as const, marginBottom:'64px' }}>
          <div>
            <h2 style={{ fontWeight:900, letterSpacing:'-0.05em', fontSize:'36px', color:'white', marginBottom:'10px', lineHeight:1.05 }}>JOIN THE SOUKNI FAMILY</h2>
            <p style={{ fontSize:'15px', color:'rgba(255,255,255,0.85)', maxWidth:'480px', lineHeight:1.7 }}>Post your job today for free and reach thousands of qualified candidates across Morocco.</p>
            <div style={{ display:'flex', gap:'12px', marginTop:'24px' }}>
              <button style={{ backgroundColor:'white', color:'#0f9b8e', border:'none', padding:'12px 24px', borderRadius:'100px', fontWeight:800, fontSize:'13px', cursor:'pointer' }}>App Store</button>
              <button style={{ backgroundColor:'rgba(255,255,255,0.2)', color:'white', border:'1px solid rgba(255,255,255,0.4)', padding:'12px 24px', borderRadius:'100px', fontWeight:800, fontSize:'13px', cursor:'pointer' }}>Google Play</button>
            </div>
          </div>
          <Link href={`/${locale}/post-ad`} style={{ textDecoration:'none' }}>
            <span style={{ display:'inline-block', backgroundColor:'white', color:'#0f9b8e', padding:'16px 36px', borderRadius:'100px', fontWeight:900, fontSize:'14px', cursor:'pointer', whiteSpace:'nowrap' as const }}>Post Free Job →</span>
          </Link>
        </section>
      </div>
    </div>
  )
}
