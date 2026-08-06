'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { Heart, Search, ChevronRight, ChevronLeft, MapPin, TrendingUp, Building, Calendar, Users, Star, CheckCircle, Clock, Hammer, LayoutGrid, List } from 'lucide-react'

const C = { mint:'#22d4a8', mintDk:'#0f9b8e', ink:'#161d1b', surface:'#f4fbf8', muted:'#6b7a76' }
const UB = { fontFamily:"'Inter',sans-serif", fontWeight:900, letterSpacing:'-0.05em' } as const
const CB = { fontFamily:"'Hanken Grotesk',sans-serif", fontWeight:900, letterSpacing:'-0.03em' } as const

const PROJ_CATS = [
  { label:'Apartments',   slug:'apartments',    count:'42',  emoji:'🏢', image:'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&w=600',  desc:'Studios to penthouses' },
  { label:'Villas',       slug:'villas',         count:'18',  emoji:'🏡', image:'https://images.pexels.com/photos/2581922/pexels-photo-2581922.jpeg?auto=compress&w=600',  desc:'Private gated communities' },
  { label:'Commerce',     slug:'commerce',       count:'12',  emoji:'🏪', image:'https://images.pexels.com/photos/1109561/pexels-photo-1109561.jpeg?auto=compress&w=600',  desc:'Retail & business parks' },
  { label:'Townhouses',   slug:'townhouses',     count:'9',   emoji:'🏘️', image:'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&w=600',  desc:'Family duplex clusters' },
  { label:'Offices',      slug:'offices',        count:'8',   emoji:'🏗️', image:'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&w=600',  desc:'Class-A business towers' },
  { label:'Mixed Use',    slug:'mixed-use',      count:'14',  emoji:'🌆', image:'https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg?auto=compress&w=600',  desc:'Live-work-play complexes' },
]

type Status = 'all'|'off-plan'|'ready'|'under-construction'
type Project = {
  id:string; title:string; developer:string; devType:'pro'|'private'; location:string;
  type:string; status:'off-plan'|'ready'|'under-construction';
  priceFrom:string; units:number; completion:string; progress:number;
  yield_pct:number|null; paymentPlan:string|null; rating:number|null;
  image:string; badge:string|null; highlight:string;
}

const PROJECTS: Project[] = [
  { id:'np1', title:'Anfa Skyline Residences',    developer:'Addoha Group',       devType:'pro',     location:'Casablanca, Anfa',         type:'Apartments',  status:'off-plan',           priceFrom:'1,200,000', units:240, completion:'Q4 2027', progress:15, yield_pct:6.2, paymentPlan:'30/70',    rating:null, image:'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&w=700',    badge:'New Launch',       highlight:'Sea views from every floor' },
  { id:'np2', title:'Palmeraie Golf Estate',       developer:'Alliances Darna',    devType:'pro',     location:'Marrakech, Palmeraie',     type:'Villas',      status:'under-construction',  priceFrom:'4,500,000', units:48,  completion:'Q2 2026', progress:68, yield_pct:5.8, paymentPlan:'40/60',    rating:4.7, image:'https://images.pexels.com/photos/2581922/pexels-photo-2581922.jpeg?auto=compress&w=700',    badge:'68% Sold',         highlight:'Private golf course & spa' },
  { id:'np3', title:'Marina Business Tower',       developer:'CDG Invest',         devType:'pro',     location:'Casablanca Finance City',  type:'Offices',     status:'off-plan',           priceFrom:'8,500,000', units:120, completion:'Q1 2028', progress:5,  yield_pct:7.4, paymentPlan:'20/80',    rating:null, image:'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&w=700',    badge:'New Launch',       highlight:'Class-A 28-storey tower' },
  { id:'np4', title:'Hay Riad Green Quarter',      developer:'Karim Benali',       devType:'private', location:'Rabat, Hay Riad',          type:'Apartments',  status:'ready',              priceFrom:'980,000',   units:36,  completion:'Ready',   progress:100,yield_pct:null, paymentPlan:null,       rating:4.9, image:'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&w=700',    badge:'Move-In Ready',    highlight:'12 units remaining' },
  { id:'np5', title:'Bab Doukkala Riad Complex',   developer:'Medina Heritage Co.',devType:'pro',     location:'Marrakech Médina',         type:'Mixed Use',   status:'under-construction',  priceFrom:'2,200,000', units:22,  completion:'Q3 2026', progress:45, yield_pct:8.1, paymentPlan:'50/50',    rating:null, image:'https://images.pexels.com/photos/440731/pexels-photo-440731.jpeg?auto=compress&w=700',     badge:'Limited Units',    highlight:'Riads + boutique hotel + retail' },
  { id:'np6', title:'Agadir Corniche Towers',      developer:'Sonadac',            devType:'pro',     location:'Agadir, Bord de Mer',      type:'Apartments',  status:'off-plan',           priceFrom:'750,000',   units:360, completion:'Q2 2028', progress:0,  yield_pct:6.5, paymentPlan:'25/75',    rating:null, image:'https://images.pexels.com/photos/2872755/pexels-photo-2872755.jpeg?auto=compress&w=700',    badge:'Pre-Launch',       highlight:'Beachfront towers A & B' },
  { id:'np7', title:'Atlas Prestige Townhouses',   developer:'Sara & Yassine LLC', devType:'private', location:'Ifrane, Route de Meknès',  type:'Townhouses',  status:'under-construction',  priceFrom:'3,200,000', units:12,  completion:'Q4 2026', progress:55, yield_pct:null, paymentPlan:'40/60',    rating:4.5, image:'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&w=700',    badge:'Family Project',   highlight:'4 units left — act fast' },
  { id:'np8', title:'Tanger Med Business Park',    developer:'Tanger Alliance',    devType:'pro',     location:'Tanger, Zone Franche',     type:'Commerce',    status:'ready',              priceFrom:'1,800,000', units:64,  completion:'Ready',   progress:100,yield_pct:7.8, paymentPlan:null,       rating:4.8, image:'https://images.pexels.com/photos/1109561/pexels-photo-1109561.jpeg?auto=compress&w=700',    badge:'Move-In Ready',    highlight:'Full logistics & warehouse complex' },
  { id:'np9', title:'Fès Médina Cultural Lofts',   developer:'Omar El Filali',     devType:'private', location:'Fès, Médina',              type:'Mixed Use',   status:'off-plan',           priceFrom:'650,000',   units:18,  completion:'Q1 2027', progress:10, yield_pct:null, paymentPlan:'30/70',    rating:null, image:'https://images.pexels.com/photos/440731/pexels-photo-440731.jpeg?auto=compress&w=700',     badge:'New Launch',       highlight:'Art lofts + gallery + café' },
]

const DEVELOPERS = [
  { name:'Addoha Group',     projects:12, image:'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&w=300',  badge:'Top Developer' },
  { name:'Alliances Darna',  projects:8,  image:'https://images.pexels.com/photos/2581922/pexels-photo-2581922.jpeg?auto=compress&w=300',  badge:'Verified Pro' },
  { name:'CDG Invest',       projects:6,  image:'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&w=300',  badge:'Top Developer' },
  { name:'Sonadac',          projects:5,  image:'https://images.pexels.com/photos/2872755/pexels-photo-2872755.jpeg?auto=compress&w=300',  badge:'Verified Pro' },
]

const STATUS_CONFIG = {
  'ready':               { label:'Ready',               color:'#10b981', bg:'#f0fdf4', icon:<CheckCircle size={12}/> },
  'under-construction':  { label:'Under Construction',  color:'#f59e0b', bg:'#fffbeb', icon:<Hammer size={12}/> },
  'off-plan':            { label:'Off-Plan',             color:'#7c3aed', bg:'#f5f3ff', icon:<Clock size={12}/> },
}

function StatusBadge({ status }: { status: Project['status'] }) {
  const s = STATUS_CONFIG[status]
  return (
    <span style={{ display:'inline-flex', alignItems:'center', gap:4, backgroundColor:s.bg, color:s.color, fontSize:'9px', fontWeight:800, padding:'4px 10px', borderRadius:100, textTransform:'uppercase', letterSpacing:'0.08em', whiteSpace:'nowrap' }}>
      {s.icon} {s.label}
    </span>
  )
}

function ProgressBar({ pct, status }: { pct: number; status: Project['status'] }) {
  const color = status==='ready' ? '#10b981' : status==='under-construction' ? '#f59e0b' : '#7c3aed'
  return (
    <div>
      <div style={{ display:'flex', justifyContent:'space-between', marginBottom:4 }}>
        <span style={{ fontSize:10, fontWeight:700, color:C.muted }}>Construction Progress</span>
        <span style={{ fontSize:10, fontWeight:800, color }}>{pct}%</span>
      </div>
      <div style={{ height:5, backgroundColor:'#e2eae6', borderRadius:100, overflow:'hidden' }}>
        <div style={{ height:'100%', width:`${pct}%`, backgroundColor:color, borderRadius:100, transition:'width 0.8s ease' }} />
      </div>
    </div>
  )
}

function ProjectCard({ p, locale, view }: { p:Project; locale:string; view:'grid'|'list' }) {
  const [saved, setSaved] = useState(false)
  const [hov,   setHov  ] = useState(false)

  if (view === 'list') return (
    <Link href={`/${locale}/listing/${p.id}`} style={{ textDecoration:'none' }}>
      <article onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
        style={{ backgroundColor:'white', borderRadius:18, overflow:'hidden', boxShadow:hov?'0 12px 36px rgba(0,0,0,0.1)':'0 2px 8px rgba(0,0,0,0.05)', border:`1px solid ${hov?C.mint:'rgba(0,0,0,0.06)'}`, transition:'all 0.3s', display:'flex', cursor:'pointer', marginBottom:14 }}>
        <div style={{ position:'relative', width:280, flexShrink:0, overflow:'hidden' }}>
          <img src={p.image} alt={p.title} style={{ width:'100%', height:'100%', objectFit:'cover', transition:'transform 0.5s', transform:hov?'scale(1.04)':'scale(1)' }} />
          {p.badge && <span style={{ position:'absolute', top:10, left:10, backgroundColor:p.status==='ready'?'#10b981':p.status==='off-plan'?'#7c3aed':C.mint, color:'white', fontSize:'9px', fontWeight:800, padding:'4px 10px', borderRadius:100, textTransform:'uppercase', letterSpacing:'0.07em' }}>{p.badge}</span>}
          <div style={{ position:'absolute', bottom:10, left:10 }}><StatusBadge status={p.status} /></div>
        </div>
        <div style={{ padding:'20px 24px', flex:1, display:'flex', flexDirection:'column', justifyContent:'space-between' }}>
          <div>
            <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:6 }}>
              <span style={{ fontSize:11, fontWeight:800, color:p.devType==='pro'?C.mint:C.muted, backgroundColor:p.devType==='pro'?`${C.mint}15`:'#f4f4f4', padding:'2px 10px', borderRadius:100, textTransform:'uppercase', letterSpacing:'0.06em' }}>
                {p.devType==='pro'?'✦ Pro Developer':'Private Seller'}
              </span>
              <span style={{ fontSize:11, color:C.muted, fontWeight:600 }}>{p.developer}</span>
            </div>
            <h3 style={{ ...CB, fontSize:'17px', color:hov?C.mint:C.ink, marginBottom:5, transition:'color 0.2s' }}>{p.title}</h3>
            <div style={{ display:'flex', alignItems:'center', gap:5, marginBottom:10 }}>
              <MapPin size={12} color={C.muted}/><span style={{ fontSize:'12px', color:C.muted, fontWeight:600 }}>{p.location}</span>
            </div>
            <div style={{ display:'flex', gap:16, marginBottom:12, flexWrap:'wrap' }}>
              <span style={{ fontSize:'12px', color:'#475569', fontWeight:600, display:'flex', alignItems:'center', gap:4 }}><Building size={13} color={C.mint}/>{p.type}</span>
              <span style={{ fontSize:'12px', color:'#475569', fontWeight:600, display:'flex', alignItems:'center', gap:4 }}><Users size={13} color={C.mint}/>{p.units} units</span>
              <span style={{ fontSize:'12px', color:'#475569', fontWeight:600, display:'flex', alignItems:'center', gap:4 }}><Calendar size={13} color={C.mint}/>{p.completion}</span>
              {p.yield_pct && <span style={{ fontSize:'12px', color:C.mint, fontWeight:800, display:'flex', alignItems:'center', gap:4 }}><TrendingUp size={13}/>{p.yield_pct}% yield</span>}
            </div>
            <ProgressBar pct={p.progress} status={p.status} />
          </div>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', paddingTop:14, borderTop:'1px solid #f1f5f9', marginTop:14 }}>
            <div>
              <p style={{ fontSize:11, color:C.muted, fontWeight:600, marginBottom:2 }}>From</p>
              <span style={{ ...CB, fontSize:'22px', color:C.mint }}>{p.priceFrom} </span>
              <span style={{ fontSize:'12px', color:C.muted, fontWeight:600 }}>MAD</span>
              {p.paymentPlan && <span style={{ marginLeft:8, fontSize:'11px', fontWeight:800, color:'#7c3aed', backgroundColor:'#f5f3ff', padding:'2px 8px', borderRadius:100 }}>{p.paymentPlan} plan</span>}
            </div>
            <div style={{ display:'flex', gap:8 }}>
              <button onClick={e=>e.preventDefault()} style={{ padding:'9px 18px', borderRadius:100, backgroundColor:C.surface, color:C.ink, border:'none', fontSize:'12px', fontWeight:700, cursor:'pointer', fontFamily:"'Inter',sans-serif" }}>Brochure</button>
              <button onClick={e=>e.preventDefault()} style={{ padding:'9px 20px', borderRadius:100, backgroundColor:C.mint, color:'white', border:'none', fontSize:'12px', fontWeight:700, cursor:'pointer', fontFamily:"'Inter',sans-serif" }}>View Project →</button>
            </div>
          </div>
        </div>
      </article>
    </Link>
  )

  return (
    <Link href={`/${locale}/listing/${p.id}`} style={{ textDecoration:'none' }}>
      <article onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
        style={{ backgroundColor:'white', borderRadius:24, overflow:'hidden', boxShadow:hov?'0 20px 48px rgba(0,0,0,0.12)':'0 2px 12px rgba(0,0,0,0.06)', border:`1px solid ${hov?C.mint:'rgba(0,0,0,0.06)'}`, transition:'all 0.3s', cursor:'pointer', display:'flex', flexDirection:'column' }}>
        <div style={{ position:'relative', aspectRatio:'16/9', overflow:'hidden' }}>
          <img src={p.image} alt={p.title} style={{ width:'100%', height:'100%', objectFit:'cover', transition:'transform 0.6s', transform:hov?'scale(1.06)':'scale(1)' }} />
          {p.badge && (
            <span style={{ position:'absolute', top:12, left:12, backgroundColor:p.status==='ready'?'#10b981':p.status==='off-plan'?'#7c3aed':C.mint, color:'white', fontSize:'9px', fontWeight:800, padding:'4px 10px', borderRadius:100, textTransform:'uppercase', letterSpacing:'0.07em' }}>{p.badge}</span>
          )}
          <button onClick={e=>{e.preventDefault();setSaved(!saved)}}
            style={{ position:'absolute', top:12, right:12, width:34, height:34, borderRadius:'50%', backgroundColor:'rgba(255,255,255,0.9)', border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}>
            <Heart size={16} fill={saved?'#ef4444':'none'} color={saved?'#ef4444':'#6b7a76'}/>
          </button>
          <div style={{ position:'absolute', bottom:12, left:12 }}><StatusBadge status={p.status} /></div>
          {p.yield_pct && (
            <div style={{ position:'absolute', bottom:12, right:12, background:`linear-gradient(135deg,${C.mint},${C.mintDk})`, padding:'4px 10px', borderRadius:8, display:'flex', alignItems:'center', gap:4 }}>
              <TrendingUp size={11} color="white"/>
              <span style={{ color:'white', fontSize:'10px', fontWeight:800 }}>{p.yield_pct}% yield</span>
            </div>
          )}
        </div>
        <div style={{ padding:'16px 18px', flex:1, display:'flex', flexDirection:'column' }}>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:6 }}>
            <span style={{ fontSize:10, fontWeight:800, color:p.devType==='pro'?C.mint:C.muted, backgroundColor:p.devType==='pro'?`${C.mint}15`:'#f4f4f4', padding:'2px 9px', borderRadius:100, textTransform:'uppercase', letterSpacing:'0.06em' }}>
              {p.devType==='pro'?'✦ Pro':'Private'}
            </span>
            <span style={{ fontSize:10, color:C.muted, fontWeight:600 }}>{p.type} · {p.units} units</span>
          </div>
          <h3 style={{ ...CB, fontSize:'14px', color:hov?C.mint:C.ink, marginBottom:5, lineHeight:1.3, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap', transition:'color 0.2s' }}>{p.title}</h3>
          <p style={{ fontSize:11, color:C.muted, fontWeight:600, marginBottom:6 }}>by {p.developer}</p>
          <div style={{ display:'flex', alignItems:'center', gap:5, marginBottom:10 }}>
            <MapPin size={11} color={C.muted}/><span style={{ fontSize:'11px', color:C.muted, fontWeight:600 }}>{p.location}</span>
          </div>
          <div style={{ marginBottom:10 }}>
            <ProgressBar pct={p.progress} status={p.status} />
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:12 }}>
            <Calendar size={11} color={C.muted}/>
            <span style={{ fontSize:'11px', color:C.muted, fontWeight:600 }}>Handover: {p.completion}</span>
            {p.paymentPlan && <span style={{ fontSize:'10px', fontWeight:800, color:'#7c3aed', backgroundColor:'#f5f3ff', padding:'2px 8px', borderRadius:100 }}>{p.paymentPlan}</span>}
          </div>
          <div style={{ marginTop:'auto', paddingTop:10, borderTop:'1px solid #f1f5f9' }}>
            <p style={{ fontSize:10, color:C.muted, fontWeight:600, marginBottom:2 }}>Starting from</p>
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
              <span style={{ ...CB, fontSize:'18px', color:C.mint }}>{p.priceFrom} MAD</span>
              <span style={{ fontSize:11, color:C.mint, fontWeight:700 }}>{p.highlight}</span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  )
}

export default function NewProjectsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale }             = React.use(params)
  const [status,   setStatus ] = useState<Status>('all')
  const [devType,  setDevType] = useState<'all'|'pro'|'private'>('all')
  const [city,     setCity   ] = useState('All Morocco')
  const [type,     setType   ] = useState('All Types')
  const [keyword,  setKeyword] = useState('')
  const [view,     setView   ] = useState<'grid'|'list'>('grid')
  const [sort,     setSort   ] = useState<'Newest'|'Price Low'|'Price High'|'Most Advanced'>('Newest')
  const [page,     setPage   ] = useState(1)
  const [hovCat,   setHovCat ] = useState<string|null>(null)

  const cities = ['All Morocco','Casablanca','Rabat','Marrakech','Tangier','Agadir','Fès','Meknès','Ifrane']
  const types  = ['All Types','Apartments','Villas','Offices','Commerce','Townhouses','Mixed Use']

  const filtered = PROJECTS.filter(p => {
    if (status !== 'all' && p.status !== status) return false
    if (devType !== 'all' && p.devType !== devType) return false
    if (type !== 'All Types' && p.type !== type) return false
    return true
  })

  const stats = [
    { icon:'🏗️', value:'84',   label:'Active Projects'      },
    { icon:'🏠', value:'3,200+',label:'Total Units'          },
    { icon:'📈', value:'6.8%',  label:'Avg. Rental Yield'   },
    { icon:'🏙️', value:'12',    label:'Cities Covered'       },
  ]

  return (
    <div style={{ fontFamily:"'Inter',sans-serif", backgroundColor:C.surface, minHeight:'100vh' }}>

      {/* CINEMATIC HERO */}
      <section style={{ position:'relative', height:580, overflow:'hidden', display:'flex', alignItems:'center', justifyContent:'center' }}>
        <img src="https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg?auto=compress&w=1600" alt="New Projects Morocco"
          style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover' }} />
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top, rgba(15,23,42,0.95) 0%, rgba(15,23,42,0.45) 55%, rgba(15,23,42,0.2) 100%)' }} />
        <div style={{ position:'relative', zIndex:10, textAlign:'center', padding:'0 24px', maxWidth:820, width:'100%' }}>
          <div style={{ display:'inline-flex', alignItems:'center', gap:8, backgroundColor:'rgba(34,212,168,0.15)', border:'1px solid rgba(34,212,168,0.4)', borderRadius:100, padding:'7px 20px', marginBottom:22 }}>
            <Building size={13} color={C.mint}/>
            <span style={{ fontSize:11, fontWeight:800, color:C.mint, textTransform:'uppercase', letterSpacing:'0.16em' }}>SouKni New Projects · Morocco</span>
          </div>
          <h1 style={{ ...UB, fontSize:'clamp(38px,6.5vw,72px)', color:'white', lineHeight:0.92, marginBottom:18, textTransform:'uppercase' }}>
            BUILD YOUR<br/><span style={{ color:C.mint }}>FUTURE</span><br/>IN MOROCCO.
          </h1>
          <p style={{ fontSize:17, color:'rgba(255,255,255,0.7)', marginBottom:36, maxWidth:560, margin:'0 auto 36px', lineHeight:1.65 }}>
            Off-plan, under construction &amp; ready-to-move — 84 verified new property projects across Morocco
          </p>
          {/* Glassmorphic search */}
          <div style={{ display:'flex', alignItems:'stretch', backgroundColor:'rgba(255,255,255,0.12)', backdropFilter:'blur(24px)', border:'1px solid rgba(255,255,255,0.25)', borderRadius:100, overflow:'hidden', maxWidth:700, margin:'0 auto', boxShadow:'0 8px 32px rgba(0,0,0,0.25)' }}>
            <div style={{ display:'flex', flexDirection:'column', padding:'14px 22px', flex:'0 0 160px', borderRight:'1px solid rgba(255,255,255,0.15)', gap:2 }}>
              <span style={{ fontSize:9, fontWeight:800, color:'rgba(255,255,255,0.5)', textTransform:'uppercase', letterSpacing:'0.12em' }}>City</span>
              <select value={city} onChange={e=>setCity(e.target.value)} style={{ backgroundColor:'transparent', border:'none', outline:'none', fontSize:14, fontWeight:700, color:'white', fontFamily:"'Inter',sans-serif", cursor:'pointer' }}>
                {cities.map(c=><option key={c} style={{ color:C.ink }}>{c}</option>)}
              </select>
            </div>
            <div style={{ display:'flex', flexDirection:'column', padding:'14px 22px', flex:'0 0 140px', borderRight:'1px solid rgba(255,255,255,0.15)', gap:2 }}>
              <span style={{ fontSize:9, fontWeight:800, color:'rgba(255,255,255,0.5)', textTransform:'uppercase', letterSpacing:'0.12em' }}>Type</span>
              <select value={type} onChange={e=>setType(e.target.value)} style={{ backgroundColor:'transparent', border:'none', outline:'none', fontSize:14, fontWeight:700, color:'white', fontFamily:"'Inter',sans-serif", cursor:'pointer' }}>
                {types.map(t=><option key={t} style={{ color:C.ink }}>{t}</option>)}
              </select>
            </div>
            <div style={{ display:'flex', flexDirection:'column', padding:'14px 22px', flex:1, borderRight:'1px solid rgba(255,255,255,0.15)', gap:2 }}>
              <span style={{ fontSize:9, fontWeight:800, color:'rgba(255,255,255,0.5)', textTransform:'uppercase', letterSpacing:'0.12em' }}>Keyword</span>
              <input value={keyword} onChange={e=>setKeyword(e.target.value)} placeholder="Project name, developer, zone..." style={{ backgroundColor:'transparent', border:'none', outline:'none', fontSize:14, fontWeight:600, color:'white', fontFamily:"'Inter',sans-serif", padding:0 }} />
            </div>
            <button style={{ backgroundColor:C.mint, color:'white', border:'none', padding:'0 32px', fontWeight:800, fontSize:14, cursor:'pointer', flexShrink:0, transition:'background 0.15s', display:'flex', alignItems:'center', gap:8 }}
              onMouseEnter={e=>e.currentTarget.style.backgroundColor=C.mintDk}
              onMouseLeave={e=>e.currentTarget.style.backgroundColor=C.mint}>
              <Search size={16}/> Search
            </button>
          </div>
        </div>
      </section>

      {/* FILTER HUB — 2 rows */}
      <div style={{ maxWidth:1440, margin:'-26px auto 0', padding:'0 40px', position:'relative', zIndex:30 }}>
        <div style={{ backgroundColor:'rgba(255,255,255,0.97)', backdropFilter:'blur(20px)', borderRadius:32, boxShadow:'0 8px 40px rgba(0,0,0,0.10)', border:'1px solid rgba(255,255,255,0.7)', overflow:'hidden' }}>

          {/* Row 1 */}
          <div style={{ display:'flex', alignItems:'center', borderBottom:'1px solid rgba(186,202,197,0.2)' }}>
            {[
              { label:'City', content:<select value={city} onChange={e=>setCity(e.target.value)} style={{ border:'none', outline:'none', fontSize:14, fontWeight:700, color:C.ink, backgroundColor:'transparent', cursor:'pointer', fontFamily:"'Inter',sans-serif" }}>{cities.map(c=><option key={c}>{c}</option>)}</select> },
              { label:'Property Type', content:<select value={type} onChange={e=>setType(e.target.value)} style={{ border:'none', outline:'none', fontSize:14, fontWeight:700, color:C.ink, backgroundColor:'transparent', cursor:'pointer', fontFamily:"'Inter',sans-serif" }}>{types.map(t=><option key={t}>{t}</option>)}</select> },
              { label:'Min Price (MAD)', content:<input placeholder="Any" style={{ border:'none', outline:'none', fontSize:14, fontWeight:700, color:C.ink, backgroundColor:'transparent', fontFamily:"'Inter',sans-serif", width:80 }} /> },
              { label:'Max Price (MAD)', content:<input placeholder="Any" style={{ border:'none', outline:'none', fontSize:14, fontWeight:700, color:C.ink, backgroundColor:'transparent', fontFamily:"'Inter',sans-serif", width:80 }} /> },
              { label:'Handover By', content:<select style={{ border:'none', outline:'none', fontSize:14, fontWeight:700, color:C.ink, backgroundColor:'transparent', cursor:'pointer', fontFamily:"'Inter',sans-serif" }}>{['Any','2025','2026','2027','2028+'].map(y=><option key={y}>{y}</option>)}</select> },
            ].map((f,i,arr)=>(
              <div key={f.label} style={{ flex:1, padding:'12px 20px', borderRight:i<arr.length-1?'1px solid rgba(186,202,197,0.2)':'none', display:'flex', flexDirection:'column', gap:2 }}>
                <span style={{ fontSize:9, textTransform:'uppercase', fontWeight:800, color:C.muted, letterSpacing:'0.1em' }}>{f.label}</span>
                {f.content}
              </div>
            ))}
            <div style={{ padding:'8px 12px', flexShrink:0 }}>
              <button style={{ backgroundColor:C.mint, color:'white', border:'none', padding:'13px 28px', borderRadius:100, cursor:'pointer', fontWeight:800, fontSize:14, display:'flex', alignItems:'center', gap:7, whiteSpace:'nowrap' }}
                onMouseEnter={e=>e.currentTarget.style.backgroundColor=C.mintDk}
                onMouseLeave={e=>e.currentTarget.style.backgroundColor=C.mint}>
                <Search size={15}/> SEARCH
              </button>
            </div>
          </div>

          {/* Row 2 — status + dev type filters */}
          <div style={{ display:'flex', alignItems:'center', gap:8, padding:'10px 20px', flexWrap:'wrap' }}>
            <span style={{ fontSize:10, fontWeight:800, color:C.muted, textTransform:'uppercase', letterSpacing:'0.1em', flexShrink:0 }}>Status:</span>
            {([
              { key:'all',               label:'All Projects' },
              { key:'off-plan',          label:'Off-Plan' },
              { key:'under-construction',label:'Under Construction' },
              { key:'ready',             label:'Ready to Move' },
            ] as const).map(s=>(
              <button key={s.key} onClick={()=>setStatus(s.key)}
                style={{ padding:'7px 18px', borderRadius:100, border:`1.5px solid ${status===s.key?C.mint:'rgba(186,202,197,0.4)'}`, backgroundColor:status===s.key?C.mint:'white', color:status===s.key?'white':C.muted, cursor:'pointer', fontSize:12, fontWeight:700, transition:'all 0.2s', whiteSpace:'nowrap', fontFamily:"'Inter',sans-serif" }}>
                {s.label}
              </button>
            ))}
            <div style={{ width:'1px', height:20, backgroundColor:'rgba(186,202,197,0.4)', margin:'0 8px' }} />
            <span style={{ fontSize:10, fontWeight:800, color:C.muted, textTransform:'uppercase', letterSpacing:'0.1em', flexShrink:0 }}>Seller:</span>
            {([
              { key:'all',     label:'All Sellers' },
              { key:'pro',     label:'✦ Pro Developers' },
              { key:'private', label:'Private Sellers' },
            ] as const).map(d=>(
              <button key={d.key} onClick={()=>setDevType(d.key)}
                style={{ padding:'7px 18px', borderRadius:100, border:`1.5px solid ${devType===d.key?C.ink:'rgba(186,202,197,0.4)'}`, backgroundColor:devType===d.key?C.ink:'white', color:devType===d.key?'white':C.muted, cursor:'pointer', fontSize:12, fontWeight:700, transition:'all 0.2s', whiteSpace:'nowrap', fontFamily:"'Inter',sans-serif" }}>
                {d.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth:1440, margin:'48px auto 0', padding:'0 40px 80px' }}>

        {/* BREADCRUMB */}
        <nav style={{ display:'flex', alignItems:'center', gap:6, fontSize:11, fontWeight:700, color:C.muted, textTransform:'uppercase', letterSpacing:'0.07em', marginBottom:32 }}>
          {[
            { label:'Home',        href:`/${locale}` },
            { label:'Property',    href:`/${locale}/property` },
            { label:'New Projects',href:null },
          ].map((c,i,arr)=>(
            <span key={c.label} style={{ display:'flex', alignItems:'center', gap:6 }}>
              {c.href
                ? <Link href={c.href} style={{ color:C.muted, textDecoration:'none' }}
                    onMouseEnter={e=>e.currentTarget.style.color=C.mint}
                    onMouseLeave={e=>e.currentTarget.style.color=C.muted}>{c.label}</Link>
                : <span style={{ color:C.ink }}>{c.label}</span>}
              {i<arr.length-1 && <ChevronRight size={12} color={C.muted}/>}
            </span>
          ))}
        </nav>

        {/* MARKET STATS */}
        <section style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:16, marginBottom:56 }}>
          {stats.map(s=>(
            <div key={s.label} style={{ backgroundColor:'white', borderRadius:20, padding:'20px 22px', border:'1px solid rgba(186,202,197,0.2)', boxShadow:'0 2px 8px rgba(0,0,0,0.04)', display:'flex', alignItems:'center', gap:14 }}>
              <div style={{ width:46, height:46, borderRadius:14, backgroundColor:`${C.mint}15`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:22, flexShrink:0 }}>{s.icon}</div>
              <div>
                <p style={{ ...UB, fontSize:22, color:C.ink, marginBottom:2 }}>{s.value}</p>
                <p style={{ fontSize:12, color:C.muted, fontWeight:600 }}>{s.label}</p>
              </div>
            </div>
          ))}
        </section>

        {/* PROJECT TYPE GRID */}
        <section style={{ marginBottom:64 }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:24 }}>
            <h2 style={{ ...UB, fontSize:30, color:C.ink }}>Browse by Project Type</h2>
            <span style={{ fontSize:14, color:C.muted }}>84 projects · 12 cities</span>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:16 }}>
            {PROJ_CATS.map(cat=>(
              <Link key={cat.slug} href={`/${locale}/property/new-projects/${cat.slug}`} style={{ textDecoration:'none' }}>
                <div onMouseEnter={()=>setHovCat(cat.slug)} onMouseLeave={()=>setHovCat(null)}
                  style={{ position:'relative', borderRadius:22, overflow:'hidden', cursor:'pointer', transition:'transform 0.2s, box-shadow 0.2s', transform:hovCat===cat.slug?'scale(1.02)':'scale(1)', boxShadow:hovCat===cat.slug?'0 20px 48px rgba(0,0,0,0.18)':'0 4px 12px rgba(0,0,0,0.08)' }}>
                  <div style={{ aspectRatio:'4/3', overflow:'hidden' }}>
                    <img src={cat.image} alt={cat.label} style={{ width:'100%', height:'100%', objectFit:'cover', transition:'transform 0.5s', transform:hovCat===cat.slug?'scale(1.08)':'scale(1)' }} />
                  </div>
                  <div style={{ position:'absolute', inset:0, background:hovCat===cat.slug?'linear-gradient(to top,rgba(34,212,168,0.75),rgba(0,0,0,0.05))':'linear-gradient(to top,rgba(15,23,42,0.8),rgba(0,0,0,0.05))' }} />
                  <div style={{ position:'absolute', top:12, left:12, fontSize:22 }}>{cat.emoji}</div>
                  <div style={{ position:'absolute', bottom:0, left:0, right:0, padding:'14px 16px' }}>
                    <p style={{ ...UB, fontSize:15, color:'white', marginBottom:2 }}>{cat.label}</p>
                    <p style={{ fontSize:11, color:'rgba(255,255,255,0.7)', fontWeight:600 }}>{cat.count} projects · {cat.desc}</p>
                  </div>
                </div>
              </Link>
            ))}
            {/* View More */}
            <Link href={`/${locale}/property/new-projects`} style={{ textDecoration:'none' }}>
              <div onMouseEnter={()=>setHovCat('all')} onMouseLeave={()=>setHovCat(null)}
                style={{ borderRadius:22, overflow:'hidden', aspectRatio:'4/3', transition:'transform 0.2s, box-shadow 0.2s', transform:hovCat==='all'?'scale(1.02)':'scale(1)', boxShadow:hovCat==='all'?'0 20px 48px rgba(0,0,0,0.18)':'0 4px 12px rgba(0,0,0,0.08)', background:hovCat==='all'?`linear-gradient(135deg,${C.mint},${C.mintDk})`:C.ink, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:8, cursor:'pointer' }}>
                <ChevronRight size={28} color="white"/>
                <p style={{ ...UB, fontSize:15, color:'white' }}>View More</p>
                <p style={{ fontSize:11, color:'rgba(255,255,255,0.6)', fontWeight:600 }}>All project types</p>
              </div>
            </Link>
          </div>
        </section>

        {/* PRO DEVELOPERS BANNER */}
        <section style={{ marginBottom:64 }}>
          <div style={{ background:`linear-gradient(135deg, ${C.ink}, #2b3230)`, borderRadius:32, padding:'40px 48px', display:'flex', alignItems:'center', gap:40, flexWrap:'wrap' }}>
            <div style={{ flex:1, minWidth:260 }}>
              <span style={{ display:'inline-block', backgroundColor:`${C.mint}20`, color:C.mint, fontSize:10, fontWeight:800, padding:'5px 16px', borderRadius:100, textTransform:'uppercase', letterSpacing:'0.12em', marginBottom:14 }}>✦ SouKni Pro Developers</span>
              <h2 style={{ ...UB, fontSize:'clamp(22px,3vw,34px)', color:'white', marginBottom:10, lineHeight:1.05 }}>Are you a developer<br/>or promoteur?</h2>
              <p style={{ fontSize:14, color:'rgba(255,255,255,0.55)', lineHeight:1.7, marginBottom:20 }}>List your entire project on SouKni Pro — showcase floor plans, payment plans, 3D renders and track your leads in real time. Reach Morocco's most serious buyers.</p>
              <div style={{ display:'flex', gap:12 }}>
                <Link href={`/${locale}/diamond`} style={{ textDecoration:'none' }}>
                  <button style={{ backgroundColor:C.mint, color:'white', border:'none', padding:'12px 28px', borderRadius:100, fontSize:13, ...UB, cursor:'pointer' }}>Get Pro Access</button>
                </Link>
                <button style={{ backgroundColor:'rgba(255,255,255,0.1)', color:'white', border:'1px solid rgba(255,255,255,0.3)', padding:'12px 28px', borderRadius:100, fontSize:13, fontWeight:700, cursor:'pointer' }}>Learn More</button>
              </div>
            </div>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:12 }}>
              {DEVELOPERS.map(d=>(
                <div key={d.name} style={{ backgroundColor:'rgba(255,255,255,0.07)', borderRadius:16, padding:'14px 16px', border:'1px solid rgba(255,255,255,0.1)', cursor:'pointer', transition:'all 0.2s' }}
                  onMouseEnter={e=>{e.currentTarget.style.backgroundColor='rgba(34,212,168,0.12)';e.currentTarget.style.borderColor=`${C.mint}40`}}
                  onMouseLeave={e=>{e.currentTarget.style.backgroundColor='rgba(255,255,255,0.07)';e.currentTarget.style.borderColor='rgba(255,255,255,0.1)'}}>
                  <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:6 }}>
                    <img src={d.image} alt={d.name} style={{ width:36, height:36, borderRadius:10, objectFit:'cover', flexShrink:0 }} />
                    <div>
                      <p style={{ fontSize:12, fontWeight:800, color:'white', marginBottom:1 }}>{d.name}</p>
                      <span style={{ fontSize:9, fontWeight:800, color:C.mint, backgroundColor:`${C.mint}20`, padding:'2px 7px', borderRadius:100, textTransform:'uppercase', letterSpacing:'0.06em' }}>{d.badge}</span>
                    </div>
                  </div>
                  <p style={{ fontSize:11, color:'rgba(255,255,255,0.45)', fontWeight:600 }}>{d.projects} active projects</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ALL PROJECTS */}
        <section style={{ marginBottom:64 }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:20, flexWrap:'wrap', gap:12 }}>
            <div>
              <h2 style={{ ...UB, fontSize:28, color:C.ink, marginBottom:4 }}>
                {status==='all' ? 'All New Projects' : status==='ready' ? '✅ Ready to Move In' : status==='off-plan' ? '🏗️ Off-Plan Projects' : '🔨 Under Construction'}
                {type !== 'All Types' ? ` — ${type}` : ''}
              </h2>
              <p style={{ fontSize:14, color:C.mint, fontWeight:700 }}>{filtered.length} projects found</p>
            </div>
            <div style={{ display:'flex', alignItems:'center', gap:10 }}>
              <div style={{ display:'flex', gap:4, padding:'4px', backgroundColor:'#f4f4f4', borderRadius:100 }}>
                {(['Newest','Price Low','Price High','Most Advanced'] as const).map(s=>(
                  <button key={s} onClick={()=>setSort(s)}
                    style={{ padding:'7px 14px', borderRadius:100, fontSize:11, fontWeight:800, border:'none', cursor:'pointer', fontFamily:"'Inter',sans-serif", transition:'all 0.2s',
                      backgroundColor:sort===s?C.ink:'transparent', color:sort===s?'white':C.muted, boxShadow:sort===s?'0 2px 8px rgba(0,0,0,0.15)':'none' }}>
                    {s}
                  </button>
                ))}
              </div>
              <div style={{ display:'flex', gap:2, padding:'3px', backgroundColor:'white', borderRadius:10, border:'1px solid rgba(186,202,197,0.3)' }}>
                <button onClick={()=>setView('grid')} style={{ width:34, height:34, borderRadius:8, border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', backgroundColor:view==='grid'?C.ink:'transparent', transition:'all 0.2s' }}>
                  <LayoutGrid size={15} color={view==='grid'?'white':C.muted}/>
                </button>
                <button onClick={()=>setView('list')} style={{ width:34, height:34, borderRadius:8, border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', backgroundColor:view==='list'?C.ink:'transparent', transition:'all 0.2s' }}>
                  <List size={15} color={view==='list'?'white':C.muted}/>
                </button>
              </div>
            </div>
          </div>

          {filtered.length > 0 ? (
            view === 'grid' ? (
              <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:24, marginBottom:48 }}>
                {filtered.map(p => <ProjectCard key={p.id} p={p} locale={locale} view="grid" />)}
              </div>
            ) : (
              <div style={{ marginBottom:48 }}>
                {filtered.map(p => <ProjectCard key={p.id} p={p} locale={locale} view="list" />)}
              </div>
            )
          ) : (
            <div style={{ textAlign:'center', padding:'80px 0' }}>
              <span style={{ fontSize:48, display:'block', marginBottom:16 }}>🔍</span>
              <p style={{ fontSize:18, fontWeight:700, color:C.muted, marginBottom:16 }}>No projects match your filters.</p>
              <button onClick={()=>{ setStatus('all'); setDevType('all'); setType('All Types') }}
                style={{ padding:'12px 28px', borderRadius:100, backgroundColor:C.mint, color:'white', border:'none', fontSize:14, fontWeight:700, cursor:'pointer' }}>Clear Filters</button>
            </div>
          )}
        </section>

        {/* PAYMENT PLAN INFO */}
        <section style={{ marginBottom:64 }}>
          <div style={{ backgroundColor:'white', borderRadius:32, padding:'40px 48px', border:'1px solid rgba(186,202,197,0.2)', boxShadow:'0 4px 16px rgba(0,0,0,0.04)' }}>
            <h2 style={{ ...UB, fontSize:26, color:C.ink, marginBottom:8 }}>How Payment Plans Work in Morocco 💡</h2>
            <p style={{ fontSize:14, color:C.muted, marginBottom:28, lineHeight:1.7 }}>Most Moroccan off-plan projects offer structured payment plans — you pay in stages tied to construction milestones.</p>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:20 }}>
              {[
                { step:'1', label:'Reservation', desc:'Typically 5–10% upfront to secure your unit and lock in the price.', color:'#7c3aed' },
                { step:'2', label:'During Construction', desc:'Installments paid quarterly tied to construction progress — 30% to 60% total.', color:C.mint },
                { step:'3', label:'On Handover', desc:'Remaining balance on key collection — typically 30–50% of total price.', color:'#10b981' },
              ].map(s=>(
                <div key={s.step} style={{ padding:'20px 22px', borderRadius:20, backgroundColor:`${s.color}08`, border:`1px solid ${s.color}20` }}>
                  <div style={{ width:36, height:36, borderRadius:'50%', backgroundColor:s.color, display:'flex', alignItems:'center', justifyContent:'center', marginBottom:12 }}>
                    <span style={{ color:'white', fontWeight:900, fontSize:16, fontFamily:"'Inter',sans-serif" }}>{s.step}</span>
                  </div>
                  <p style={{ fontSize:14, fontWeight:900, color:C.ink, marginBottom:6, fontFamily:"'Inter',sans-serif" }}>{s.label}</p>
                  <p style={{ fontSize:13, color:C.muted, lineHeight:1.6 }}>{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TRENDING */}
        <section style={{ marginBottom:64 }}>
          <h2 style={{ ...UB, fontSize:22, color:C.ink, marginBottom:20 }}>Trending Project Searches</h2>
          <div style={{ display:'flex', gap:10, flexWrap:'wrap' }}>
            {['Off-Plan Casablanca','Villas Marrakech 2026','Ready Apartments Rabat','Luxury Residences Tangier','Investment Agadir','Smart Homes Casa','Eco Villas Atlas','Mixed Use Hay Riad','Commercial Zone Tanger Med','Riads Médina Marrakech','Townhouses Ifrane','Student Housing Rabat'].map(tag=>(
              <span key={tag} style={{ display:'inline-block', padding:'9px 18px', borderRadius:100, fontSize:13, fontWeight:700, backgroundColor:'white', color:C.ink, border:'1px solid rgba(186,202,197,0.4)', cursor:'pointer', transition:'all 0.15s' }}
                onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.backgroundColor=C.mint;(e.currentTarget as HTMLElement).style.color='white'}}
                onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.backgroundColor='white';(e.currentTarget as HTMLElement).style.color=C.ink}}>
                {tag}
              </span>
            ))}
          </div>
        </section>

        {/* POST YOUR PROJECT CTA */}
        <section style={{ borderRadius:40, background:`linear-gradient(135deg,${C.mint},${C.mintDk})`, padding:'56px 64px', display:'flex', alignItems:'center', justifyContent:'space-between', gap:40, flexWrap:'wrap', marginBottom:64 }}>
          <div>
            <h2 style={{ ...UB, fontSize:'clamp(24px,4vw,42px)', color:'white', marginBottom:12, lineHeight:1.05 }}>GOT A PROJECT?<br/>LIST IT ON SOUKNI.</h2>
            <p style={{ fontSize:15, color:'rgba(255,255,255,0.85)', maxWidth:480, lineHeight:1.7 }}>Whether you're a promoteur with 200 units or a private seller with one villa under construction — SouKni gives you the tools to sell faster.</p>
            <div style={{ display:'flex', gap:12, marginTop:24 }}>
              <Link href={`/${locale}/post-ad`} style={{ textDecoration:'none' }}>
                <button style={{ backgroundColor:'white', color:C.mint, border:'none', padding:'12px 28px', borderRadius:100, fontWeight:800, fontSize:13, cursor:'pointer' }}>Post Free Ad</button>
              </Link>
              <Link href={`/${locale}/diamond`} style={{ textDecoration:'none' }}>
                <button style={{ backgroundColor:'rgba(255,255,255,0.15)', color:'white', border:'1px solid rgba(255,255,255,0.4)', padding:'12px 28px', borderRadius:100, fontWeight:800, fontSize:13, cursor:'pointer' }}>✦ Pro Developer Access</button>
              </Link>
            </div>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:12, flexShrink:0 }}>
            {[
              { icon:'📐', label:'Floor Plans', sub:'Upload renders & 3D models' },
              { icon:'📅', label:'Payment Plans', sub:'Showcase your instalments' },
              { icon:'📊', label:'Lead Tracking', sub:'See who viewed your project' },
              { icon:'💎', label:'Diamond Badge', sub:'Priority in all searches' },
            ].map(f=>(
              <div key={f.label} style={{ backgroundColor:'rgba(255,255,255,0.15)', borderRadius:16, padding:'14px 16px', border:'1px solid rgba(255,255,255,0.25)' }}>
                <span style={{ fontSize:22, display:'block', marginBottom:6 }}>{f.icon}</span>
                <p style={{ fontSize:12, fontWeight:800, color:'white', marginBottom:2 }}>{f.label}</p>
                <p style={{ fontSize:11, color:'rgba(255,255,255,0.65)', fontWeight:600 }}>{f.sub}</p>
              </div>
            ))}
          </div>
        </section>

        {/* BACK NAV */}
        <div style={{ borderTop:'1px solid rgba(186,202,197,0.3)', paddingTop:40 }}>
          <p style={{ fontSize:12, fontWeight:800, color:C.muted, textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:20, textAlign:'center' }}>Navigate Property</p>
          <div style={{ display:'flex', gap:10, justifyContent:'center', flexWrap:'wrap' }}>
            {[
              { label:'← For Sale',     href:`/${locale}/property/for-sale`  },
              { label:'← For Rent',     href:`/${locale}/property/for-rent`  },
              { label:'← Property Hub', href:`/${locale}/property`           },
              { label:'← Home',         href:`/${locale}`                    },
            ].map((b,i)=>(
              <Link key={b.label} href={b.href}
                style={{ padding:'12px 24px', borderRadius:100, textDecoration:'none', fontSize:13, fontWeight:900, fontFamily:"'Inter',sans-serif", transition:'all 0.2s', display:'flex', alignItems:'center', gap:6,
                  backgroundColor: i===3 ? C.ink : 'white',
                  color:           i===3 ? 'white' : C.ink,
                  border:          i===3 ? 'none' : '1.5px solid rgba(186,202,197,0.4)' }}
                onMouseEnter={e=>{if(i<3){(e.currentTarget as HTMLElement).style.borderColor=C.mint;(e.currentTarget as HTMLElement).style.color=C.mint}else{(e.currentTarget as HTMLElement).style.backgroundColor=C.mint}}}
                onMouseLeave={e=>{if(i<3){(e.currentTarget as HTMLElement).style.borderColor='rgba(186,202,197,0.4)';(e.currentTarget as HTMLElement).style.color=C.ink}else{(e.currentTarget as HTMLElement).style.backgroundColor=C.ink}}}>
                {b.label}
              </Link>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
