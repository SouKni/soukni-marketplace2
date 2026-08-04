'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { Search, ChevronRight, Star } from 'lucide-react'

const C = { mint:'#22d4a8', mintDk:'#0f9b8e', ink:'#161d1b', surface:'#f4fbf8', muted:'#6b7a76' }
const UB = { fontFamily:"'Inter',sans-serif", fontWeight:900, letterSpacing:'-0.05em' } as const

const categories = [
  { slug:'movers',           label:'Movers & Removals',   count:'6,183', emoji:'📦', image:'https://images.pexels.com/photos/4246120/pexels-photo-4246120.jpeg?auto=compress&w=600' },
  { slug:'home-maintenance', label:'Home Maintenance',     count:'4,910', emoji:'🔧', image:'https://images.pexels.com/photos/8486972/pexels-photo-8486972.jpeg?auto=compress&w=600' },
  { slug:'tutors',           label:'Tutors & Classes',     count:'996',   emoji:'📚', image:'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&w=600' },
  { slug:'consultants',      label:'Consultancy',          count:'803',   emoji:'💼', image:'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&w=600' },
  { slug:'wellness-spa',     label:'Wellness & Spa',       count:'421',   emoji:'🧖', image:'https://images.pexels.com/photos/3865560/pexels-photo-3865560.jpeg?auto=compress&w=600' },
  { slug:'pro-services',     label:'Pro Services',         count:'1,240', emoji:'🛠️', image:'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&w=600' },
  { slug:'beauty-grooming',  label:'Beauty & Grooming',    count:'1,580', emoji:'💇', image:'https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&w=600' },
  { slug:'other-services',   label:'Other Services',       count:'752',   emoji:'✨', image:'https://images.pexels.com/photos/1261731/pexels-photo-1261731.jpeg?auto=compress&w=600' },
]

const featuredItems = [
  { id:'sv1', title:'Expert Home Relocation — Full Team',   provider:'Hicham M.', rating:5,   reviews:124, location:'Casablanca', image:'https://images.pexels.com/photos/4246120/pexels-photo-4246120.jpeg?auto=compress&w=600' },
  { id:'sv2', title:'Master Plumbing & Leakage Repair',       provider:'Karim T.',  rating:4.9, reviews:312, location:'Casablanca Finance City', image:'https://images.pexels.com/photos/8486972/pexels-photo-8486972.jpeg?auto=compress&w=600' },
  { id:'sv3', title:'Elite Business Strategy Advisors',       provider:'Yassine K.',rating:4.8, reviews:94,  location:'Rabat Agdal', image:'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&w=600' },
  { id:'sv4', title:'Pristine Villa Deep Cleaning',           provider:'Salma R.',  rating:5,   reviews:178, location:'Marrakech Palmery', image:'https://images.pexels.com/photos/4099467/pexels-photo-4099467.jpeg?auto=compress&w=600' },
]

// Additional providers grid — shown just above the final banner
const moreProviders = [
  { id:'sv5', title:'Smart Home Electricians', provider:'Othmane D.', rating:4.7, reviews:142, location:'Tangier Marina', image:'https://images.pexels.com/photos/8985454/pexels-photo-8985454.jpeg?auto=compress&w=600' },
  { id:'sv6', title:'Swift Move Solutions',     provider:'Bilal S.',   rating:4,   reviews:215, location:'Marrakech',     image:'https://images.pexels.com/photos/4246118/pexels-photo-4246118.jpeg?auto=compress&w=600' },
  { id:'sv7', title:'Climate Control Experts',  provider:'Yassine K.', rating:4.8, reviews:94,  location:'Rabat Agdal',   image:'https://images.pexels.com/photos/3810755/pexels-photo-3810755.jpeg?auto=compress&w=600' },
  { id:'sv8', title:'Wellness Spa & Massage',   provider:'Imane B.',   rating:4.9, reviews:67,  location:'Casablanca',    image:'https://images.pexels.com/photos/3865560/pexels-photo-3865560.jpeg?auto=compress&w=600' },
  { id:'sv9', title:'Careful Hands Logistics',  provider:'Nour E.',    rating:5,   reviews:56,  location:'Tangier',       image:'https://images.pexels.com/photos/4246120/pexels-photo-4246120.jpeg?auto=compress&w=600' },
  { id:'sv10',title:'Digital Transformation Lab',provider:'Reda H.',   rating:4.6, reviews:38,  location:'Casablanca',    image:'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&w=600' },
  { id:'sv11',title:'Beauty & Grooming Studio', provider:'Zineb A.',   rating:4.9, reviews:203, location:'Rabat',         image:'https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&w=600' },
  { id:'sv12',title:'Pro Tutoring — Math & Science', provider:'Adil M.', rating:5, reviews:89,  location:'Rabat',         image:'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&w=600' },
]

function Stars({ rating, size = 12 }: { rating: number; size?: number }) {
  return (
    <div style={{ display:'flex', gap:'1px' }}>
      {[1,2,3,4,5].map(i => <Star key={i} size={size} fill={i <= Math.floor(rating) ? '#f59e0b' : 'none'} color="#f59e0b" />)}
    </div>
  )
}

export default function ServicesPage({ params }: { params: Promise<{ locale:string }> }) {
  const { locale } = React.use(params)
  const [keyword, setKeyword] = useState('')
  const [hovCat, setHovCat] = useState<string|null>(null)
  const [hovItem, setHovItem] = useState<string|null>(null)

  return (
    <div style={{ fontFamily:"'Inter',sans-serif", backgroundColor:C.surface, minHeight:'100vh' }}>

      {/* CINEMATIC HERO */}
      <section style={{ position:'relative', height:520, overflow:'hidden', display:'flex', alignItems:'center', justifyContent:'center' }}>
        <img src="https://images.pexels.com/photos/4246120/pexels-photo-4246120.jpeg?auto=compress&w=1600" alt="Services"
          style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover' }} />
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top,rgba(15,23,42,0.88),rgba(15,23,42,0.32))' }} />
        <div style={{ position:'relative', zIndex:10, textAlign:'center', padding:'0 24px', maxWidth:760, width:'100%' }}>
          <p style={{ fontSize:11, fontWeight:800, color:C.mint, textTransform:'uppercase' as const, letterSpacing:'0.2em', marginBottom:16 }}>SouKni Services</p>
          <h1 style={{ ...UB, fontSize:'clamp(36px,6vw,68px)', color:'white', lineHeight:1.0, marginBottom:20, textTransform:'uppercase' as const }}>
            TRUSTED HELP.<br />ANY TASK.<br />ANY TIME.
          </h1>
          <p style={{ fontSize:16, color:'rgba(255,255,255,0.75)', marginBottom:32, maxWidth:520, margin:'0 auto 32px' }}>
            9,200+ verified providers ready to respond across Morocco
          </p>
          {/* 3-section glassmorphic search */}
          <div style={{ display:'flex', alignItems:'stretch', backgroundColor:'rgba(255,255,255,0.12)', backdropFilter:'blur(24px)', border:'1px solid rgba(255,255,255,0.25)', borderRadius:100, overflow:'hidden', maxWidth:680, margin:'0 auto', boxShadow:'0 8px 32px rgba(0,0,0,0.2)' }}>
            <div style={{ display:'flex', flexDirection:'column' as const, padding:'14px 22px', flex:'0 0 160px', borderRight:'1px solid rgba(255,255,255,0.2)', gap:2 }}>
              <span style={{ fontSize:9, fontWeight:800, color:'rgba(255,255,255,0.55)', textTransform:'uppercase' as const, letterSpacing:'0.12em' }}>City</span>
              <input placeholder="Rabat" style={{ backgroundColor:'transparent', border:'none', outline:'none', fontSize:14, fontWeight:600, color:'white', fontFamily:"'Inter',sans-serif", padding:0 }} />
            </div>
            <div style={{ display:'flex', flexDirection:'column' as const, padding:'14px 22px', flex:1, borderRight:'1px solid rgba(255,255,255,0.2)', gap:2 }}>
              <span style={{ fontSize:9, fontWeight:800, color:'rgba(255,255,255,0.55)', textTransform:'uppercase' as const, letterSpacing:'0.12em' }}>Keyword</span>
              <input value={keyword} onChange={e=>setKeyword(e.target.value)} placeholder="Plumber, mover, tutor, electrician..." style={{ backgroundColor:'transparent', border:'none', outline:'none', fontSize:14, fontWeight:600, color:'white', fontFamily:"'Inter',sans-serif", padding:0, width:'100%' }} />
            </div>
            <button style={{ backgroundColor:C.mint, color:'white', border:'none', padding:'0 32px', fontWeight:800, fontSize:14, cursor:'pointer', flexShrink:0, transition:'background 0.15s', display:'flex', alignItems:'center', gap:8 }}
              onMouseEnter={e=>e.currentTarget.style.backgroundColor=C.mintDk}
              onMouseLeave={e=>e.currentTarget.style.backgroundColor=C.mint}>
              <Search size={16} /> Search
            </button>
          </div>
        </div>
      </section>

      {/* ADVANCED FILTER BAR */}
      <div style={{ maxWidth:1440, margin:'-26px auto 0', padding:'0 40px', position:'relative', zIndex:30 }}>
        <div style={{ backgroundColor:'rgba(255,255,255,0.95)', backdropFilter:'blur(20px)', borderRadius:100, padding:'8px 8px 8px 0', boxShadow:'0 8px 40px rgba(0,0,0,0.10)', border:'1px solid rgba(255,255,255,0.7)', display:'flex', alignItems:'center' }}>
          {[
            { label:'City', val:'Rabat', w:1 },
            { label:'Keyword', val:'Plumber, mover, electrician...', w:2 },
            { label:'Category', val:'All Services', w:1 },
            { label:'Price (MAD)', val:'Select Range', w:1 },
          ].map((f,i)=>(
            <div key={f.label} style={{ flex:f.w, padding:'8px 20px', borderRight:i<3?'1px solid rgba(186,202,197,0.25)':'none', display:'flex', flexDirection:'column' as const, cursor:'pointer', gap:1 }}>
              <span style={{ fontSize:9, textTransform:'uppercase' as const, fontWeight:700, color:C.muted, letterSpacing:'0.1em' }}>{f.label}</span>
              <span style={{ fontSize:13, fontWeight:600, color:C.ink }}>{f.val}</span>
            </div>
          ))}
          <button style={{ backgroundColor:C.mint, color:'white', border:'none', padding:'12px 24px', borderRadius:100, cursor:'pointer', fontWeight:700, fontSize:13, flexShrink:0, marginLeft:8, display:'flex', alignItems:'center', gap:6 }}>
            <Search size={15} /> SEARCH
          </button>
        </div>
      </div>

      <div style={{ maxWidth:1440, margin:'48px auto 0', padding:'0 40px 80px' }}>

        {/* BREADCRUMB */}
        <nav style={{ display:'flex', alignItems:'center', gap:6, fontSize:11, fontWeight:700, color:C.muted, textTransform:'uppercase' as const, letterSpacing:'0.06em', marginBottom:32 }}>
          <Link href={`/${locale}`} style={{ color:C.muted, textDecoration:'none' }}>Home</Link><span>›</span>
          <span style={{ color:C.ink }}>Services</span>
        </nav>

        {/* CATEGORY GRID */}
        <section style={{ marginBottom:64 }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:24 }}>
            <h2 style={{ ...UB, fontSize:28, color:C.ink }}>Browse by Category</h2>
            <span style={{ fontSize:14, color:C.muted }}>9,200 total listings</span>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:16 }}>
            {categories.map(cat=>(
              <Link key={cat.slug} href={`/${locale}/services/${cat.slug}`} style={{ textDecoration:'none' }}>
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
                        <p style={{ fontSize:11, color:'rgba(255,255,255,0.8)', fontWeight:600 }}>{cat.count} ads</p>
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

        {/* PRO SERVICES BANNER */}
        <section style={{ marginBottom:64 }}>
          <div style={{ position:'relative', height:220, borderRadius:40, overflow:'hidden', cursor:'pointer', boxShadow:'0 20px 60px rgba(0,0,0,0.15)' }}>
            <img src="https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&w=1200" alt="Pro Services"
              style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover' }} />
            <div style={{ position:'absolute', inset:0, background:'linear-gradient(to right,rgba(22,29,27,0.92) 0%,rgba(22,29,27,0.5) 60%,transparent)' }} />
            <div style={{ position:'absolute', inset:0, display:'flex', flexDirection:'column' as const, justifyContent:'center', padding:'0 56px' }}>
              <span style={{ backgroundColor:C.mint, color:'white', fontSize:9, ...UB, padding:'4px 14px', borderRadius:100, textTransform:'uppercase' as const, letterSpacing:'0.12em', display:'inline-block', marginBottom:14, width:'fit-content' }}>SouKni Pro Services</span>
              <h2 style={{ ...UB, fontSize:'clamp(20px,3vw,32px)', color:'white', marginBottom:20, lineHeight:1.1 }}>Become a certified<br/>professional today.</h2>
              <div style={{ display:'flex', gap:12 }}>
                <Link href={`/${locale}/diamond`} style={{ textDecoration:'none' }}>
                  <button style={{ backgroundColor:'white', color:C.ink, border:'none', padding:'11px 28px', borderRadius:100, fontSize:12, ...UB, cursor:'pointer' }}>Get Certified</button>
                </Link>
                <button style={{ backgroundColor:'transparent', color:'white', border:'1px solid rgba(255,255,255,0.4)', padding:'11px 28px', borderRadius:100, fontSize:12, fontWeight:700, cursor:'pointer' }}>Contact Us</button>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURED PICKS */}
        <section style={{ marginBottom:64 }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:24 }}>
            <h2 style={{ ...UB, fontSize:28, color:C.ink }}>Featured Service Providers</h2>
            <Link href={`/${locale}/services/movers`} style={{ color:C.mint, fontWeight:700, fontSize:13, textDecoration:'none', display:'flex', alignItems:'center', gap:4 }}>
              View all <ChevronRight size={14} />
            </Link>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:20 }}>
            {featuredItems.map(item=>(
              <Link key={item.id} href={`/${locale}/listing/${item.id}`} style={{ textDecoration:'none' }}>
                <div onMouseEnter={()=>setHovItem(item.id)} onMouseLeave={()=>setHovItem(null)}
                  style={{ backgroundColor:'white', borderRadius:24, overflow:'hidden', border:`1px solid ${hovItem===item.id?C.mint:'rgba(186,202,197,0.2)'}`, boxShadow:hovItem===item.id?'0 20px 48px rgba(0,0,0,0.12)':'0 2px 8px rgba(0,0,0,0.04)', transition:'all 0.3s', cursor:'pointer' }}>
                  <div style={{ position:'relative', aspectRatio:'4/3', overflow:'hidden' }}>
                    <img src={item.image} alt={item.title} style={{ width:'100%', height:'100%', objectFit:'cover', transition:'transform 0.5s', transform:hovItem===item.id?'scale(1.06)':'scale(1)' }} />
                    <span style={{ position:'absolute', top:10, left:10, background:'linear-gradient(135deg,#22d4a8,#0f9b8e)', color:'white', fontSize:'8px', fontWeight:900, padding:'3px 10px', borderRadius:100, textTransform:'uppercase' as const }}>✦ SOUKNI CERTIFIED</span>
                  </div>
                  <div style={{ padding:'16px 18px' }}>
                    <p style={{ fontFamily:"'Hanken Grotesk',sans-serif", fontWeight:900, letterSpacing:'-0.03em', fontSize:14, color:C.ink, marginBottom:6, lineHeight:1.3, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{item.title}</p>
                    <p style={{ fontSize:12, fontWeight:600, color:'#3c4a46', marginBottom:8 }}>{item.provider}</p>
                    <div style={{ display:'flex', alignItems:'center', gap:6, marginBottom:6 }}>
                      <Stars rating={item.rating} />
                      <span style={{ fontSize:11, color:C.muted }}>({item.reviews})</span>
                    </div>
                    <p style={{ fontSize:11, color:C.muted }}>{item.location}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* TUTORS/EDUCATION BANNER */}
        <section style={{ marginBottom:64 }}>
          <div style={{ position:'relative', height:220, borderRadius:40, overflow:'hidden', cursor:'pointer', boxShadow:'0 20px 60px rgba(0,0,0,0.15)' }}>
            <img src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&w=1200" alt="Tutors"
              style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover' }} />
            <div style={{ position:'absolute', inset:0, background:'linear-gradient(to right,rgba(22,29,27,0.92) 0%,rgba(22,29,27,0.5) 60%,transparent)' }} />
            <div style={{ position:'absolute', inset:0, display:'flex', flexDirection:'column' as const, justifyContent:'center', padding:'0 56px' }}>
              <span style={{ backgroundColor:'#7c3aed', color:'white', fontSize:9, ...UB, padding:'4px 14px', borderRadius:100, textTransform:'uppercase' as const, letterSpacing:'0.12em', display:'inline-block', marginBottom:14, width:'fit-content' }}>SouKni Learning</span>
              <h2 style={{ ...UB, fontSize:'clamp(20px,3vw,32px)', color:'white', marginBottom:20, lineHeight:1.1 }}>Find the right tutor<br/>for any subject.</h2>
              <div style={{ display:'flex', gap:12 }}>
                <Link href={`/${locale}/services/tutors`} style={{ textDecoration:'none' }}>
                  <button style={{ backgroundColor:'white', color:C.ink, border:'none', padding:'11px 28px', borderRadius:100, fontSize:12, ...UB, cursor:'pointer' }}>Browse Tutors</button>
                </Link>
                <button style={{ backgroundColor:'transparent', color:'white', border:'1px solid rgba(255,255,255,0.4)', padding:'11px 28px', borderRadius:100, fontSize:12, fontWeight:700, cursor:'pointer' }}>Contact Expert</button>
              </div>
            </div>
          </div>
        </section>

        {/* TRENDING SEARCHES */}
        <section style={{ marginBottom:64 }}>
          <h2 style={{ ...UB, fontSize:22, color:C.ink, marginBottom:20 }}>Trending Service Requests</h2>
          <div style={{ display:'flex', gap:10, flexWrap:'wrap' as const }}>
            {['Plumber Rabat','House Cleaning','Math Tutor','AC Repair','Home Movers','Electrician','Legal Advisor','Massage Therapist','Painter','Carpenter','Financial Advisor','Wedding Planner'].map(tag=>(
              <Link key={tag} href={`/${locale}/services/pro-services`} style={{ textDecoration:'none' }}>
                <span style={{ display:'inline-block', padding:'9px 18px', borderRadius:100, fontSize:13, fontWeight:700, backgroundColor:'white', color:C.ink, border:'1px solid rgba(186,202,197,0.4)', cursor:'pointer', transition:'all 0.15s' }}
                  onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.backgroundColor=C.mint;(e.currentTarget as HTMLElement).style.color='white'}}
                  onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.backgroundColor='white';(e.currentTarget as HTMLElement).style.color=C.ink}}>
                  {tag}
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* MORE PROVIDERS — extra grid added just above final banners */}
        <section style={{ marginBottom:64 }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:24 }}>
            <h2 style={{ ...UB, fontSize:28, color:C.ink }}>More Trusted Providers</h2>
            <span style={{ fontSize:14, color:C.muted }}>Handpicked this week</span>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:20 }}>
            {moreProviders.map(item=>(
              <Link key={item.id} href={`/${locale}/listing/${item.id}`} style={{ textDecoration:'none' }}>
                <div onMouseEnter={()=>setHovItem(item.id)} onMouseLeave={()=>setHovItem(null)}
                  style={{ backgroundColor:'white', borderRadius:24, overflow:'hidden', border:`1px solid ${hovItem===item.id?C.mint:'rgba(186,202,197,0.2)'}`, boxShadow:hovItem===item.id?'0 20px 48px rgba(0,0,0,0.12)':'0 2px 8px rgba(0,0,0,0.04)', transition:'all 0.3s', cursor:'pointer' }}>
                  <div style={{ position:'relative', aspectRatio:'4/3', overflow:'hidden' }}>
                    <img src={item.image} alt={item.title} style={{ width:'100%', height:'100%', objectFit:'cover', transition:'transform 0.5s', transform:hovItem===item.id?'scale(1.06)':'scale(1)' }} />
                    <span style={{ position:'absolute', top:10, left:10, background:'linear-gradient(135deg,#22d4a8,#0f9b8e)', color:'white', fontSize:'8px', fontWeight:900, padding:'3px 10px', borderRadius:100, textTransform:'uppercase' as const }}>✦ SOUKNI CERTIFIED</span>
                  </div>
                  <div style={{ padding:'16px 18px' }}>
                    <p style={{ fontFamily:"'Hanken Grotesk',sans-serif", fontWeight:900, letterSpacing:'-0.03em', fontSize:14, color:C.ink, marginBottom:6, lineHeight:1.3, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{item.title}</p>
                    <p style={{ fontSize:12, fontWeight:600, color:'#3c4a46', marginBottom:8 }}>{item.provider}</p>
                    <div style={{ display:'flex', alignItems:'center', gap:6, marginBottom:6 }}>
                      <Stars rating={item.rating} />
                      <span style={{ fontSize:11, color:C.muted }}>({item.reviews})</span>
                    </div>
                    <p style={{ fontSize:11, color:C.muted }}>{item.location}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* DIAMOND BANNER */}
        <section style={{ position:'relative', borderRadius:40, overflow:'hidden', marginBottom:48 }}>
          <img src="https://images.pexels.com/photos/4246120/pexels-photo-4246120.jpeg?auto=compress&w=1600" alt="Diamond"
            style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover' }} />
          <div style={{ position:'absolute', inset:0, background:'linear-gradient(135deg,rgba(15,23,42,0.96),rgba(15,23,42,0.7))' }} />
          <div style={{ position:'relative', zIndex:1, padding:'56px 64px', maxWidth:640 }}>
            <span style={{ display:'inline-flex', alignItems:'center', gap:6, background:'linear-gradient(135deg,#22d4a8,#0f9b8e)', color:'white', fontSize:9, ...UB, padding:'5px 16px', borderRadius:100, textTransform:'uppercase' as const, letterSpacing:'0.12em', marginBottom:20 }}>✦ SOUKNI CERTIFIED</span>
            <h2 style={{ ...UB, fontSize:'clamp(28px,4vw,48px)', color:'white', marginBottom:16, lineHeight:1.05 }}>Every provider is identity-verified.</h2>
            <p style={{ fontSize:15, color:'rgba(255,255,255,0.72)', lineHeight:1.7, marginBottom:28 }}>Background-checked, rated by real customers, rebooked every day across Morocco. Trust and safety, guaranteed.</p>
            <div style={{ display:'flex', gap:12 }}>
              <button style={{ backgroundColor:C.mint, color:'white', border:'none', padding:'13px 28px', borderRadius:100, fontSize:13, ...UB, cursor:'pointer' }}>Get Started</button>
              <button style={{ backgroundColor:'transparent', color:'white', border:'1px solid rgba(255,255,255,0.3)', padding:'13px 28px', borderRadius:100, fontSize:13, fontWeight:700, cursor:'pointer' }}>Learn More</button>
            </div>
          </div>
        </section>

        {/* JOIN THE SOUKNI FAMILY */}
        <section style={{ borderRadius:40, background:'linear-gradient(135deg,#22d4a8,#0f9b8e)', padding:'56px 64px', display:'flex', alignItems:'center', justifyContent:'space-between', gap:40, flexWrap:'wrap' as const }}>
          <div>
            <h2 style={{ ...UB, fontSize:'clamp(28px,4vw,44px)', color:'white', marginBottom:12, lineHeight:1.05 }}>BECOME A SOUKNI PROVIDER</h2>
            <p style={{ fontSize:15, color:'rgba(255,255,255,0.85)', maxWidth:480, lineHeight:1.7 }}>Start offering your services today for free and reach millions of buyers across Morocco.</p>
            <div style={{ display:'flex', gap:12, marginTop:24 }}>
              <button style={{ backgroundColor:'white', color:C.mint, border:'none', padding:'12px 24px', borderRadius:100, fontWeight:800, fontSize:13, cursor:'pointer', display:'flex', alignItems:'center', gap:8 }}>🍎 App Store</button>
              <button style={{ backgroundColor:'rgba(255,255,255,0.15)', color:'white', border:'1px solid rgba(255,255,255,0.4)', padding:'12px 24px', borderRadius:100, fontWeight:800, fontSize:13, cursor:'pointer', display:'flex', alignItems:'center', gap:8 }}>▶ Google Play</button>
            </div>
          </div>
          <Link href={`/${locale}/post-ad`} style={{ textDecoration:'none' }}>
            <span style={{ display:'inline-block', backgroundColor:'white', color:C.mint, padding:'16px 36px', borderRadius:100, fontWeight:900, fontSize:14, cursor:'pointer', whiteSpace:'nowrap' as const, ...UB }}>Post Free Ad →</span>
          </Link>
        </section>

      </div>
    </div>
  )
}
