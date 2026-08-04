'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { Heart, Search, ChevronRight, ChevronLeft, MapPin, TrendingUp, Building, Calendar, Users, CheckCircle, Clock, Hammer, LayoutGrid, List, FileCheck } from 'lucide-react'
import { useParams } from 'next/navigation'

const C = { mint:'#22d4a8', mintDk:'#0f9b8e', ink:'#161d1b', surface:'#f4fbf8', muted:'#6b7a76' }
const UB = { fontFamily:"'Inter',sans-serif", fontWeight:900, letterSpacing:'-0.05em' } as const
const CB = { fontFamily:"'Hanken Grotesk',sans-serif", fontWeight:900, letterSpacing:'-0.03em' } as const

const CAT_DATA: Record<string,{ label:string; hero:string; desc:string; count:string; emoji:string }> = {
  'apartments': { label:'Apartments',  emoji:'🏢', hero:'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&w=1600', desc:'Studios to penthouses — new apartment projects across Morocco.',             count:'42' },
  'villas':     { label:'Villas',      emoji:'🏡', hero:'https://images.pexels.com/photos/2581922/pexels-photo-2581922.jpeg?auto=compress&w=1600', desc:'Private gated villa communities and luxury estate developments.',            count:'18' },
  'commerce':   { label:'Commerce',    emoji:'🏪', hero:'https://images.pexels.com/photos/1109561/pexels-photo-1109561.jpeg?auto=compress&w=1600', desc:'Retail parks, shopping centres and business development zones.',            count:'12' },
  'townhouses': { label:'Townhouses',  emoji:'🏘️', hero:'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&w=1600', desc:'Family duplex and townhouse cluster developments.',                        count:'9'  },
  'offices':    { label:'Offices',     emoji:'🏗️', hero:'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&w=1600', desc:'Class-A office towers and business park new builds.',                      count:'8'  },
  'mixed-use':  { label:'Mixed Use',   emoji:'🌆', hero:'https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg?auto=compress&w=1600', desc:'Live-work-play complexes combining residential, retail and offices.',      count:'14' },
}

const DEFAULT = CAT_DATA['apartments']

const ALL_CATS = [
  { label:'Apartments',  slug:'apartments', emoji:'🏢' },
  { label:'Villas',      slug:'villas',     emoji:'🏡' },
  { label:'Commerce',    slug:'commerce',   emoji:'🏪' },
  { label:'Townhouses',  slug:'townhouses', emoji:'🏘️' },
  { label:'Offices',     slug:'offices',    emoji:'🏗️' },
  { label:'Mixed Use',   slug:'mixed-use',  emoji:'🌆' },
]

const IMGS: Record<string,string[]> = {
  'apartments': ['https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&w=500','https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&w=500'],
  'villas':     ['https://images.pexels.com/photos/2581922/pexels-photo-2581922.jpeg?auto=compress&w=500','https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&w=500'],
  'commerce':   ['https://images.pexels.com/photos/1109561/pexels-photo-1109561.jpeg?auto=compress&w=500','https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&w=500'],
  'townhouses': ['https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&w=500','https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&w=500'],
  'offices':    ['https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&w=500','https://images.pexels.com/photos/380769/pexels-photo-380769.jpeg?auto=compress&w=500'],
  'mixed-use':  ['https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg?auto=compress&w=500','https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&w=500'],
}

type Status = 'all'|'off-plan'|'ready'|'under-construction'
type DevType = 'all'|'pro'|'private'

const STATUS_CONFIG = {
  'ready':              { label:'Ready',              color:'#10b981', bg:'#f0fdf4', icon:<CheckCircle size={11}/> },
  'under-construction': { label:'Under Construction', color:'#f59e0b', bg:'#fffbeb', icon:<Hammer size={11}/> },
  'off-plan':           { label:'Off-Plan',           color:'#7c3aed', bg:'#f5f3ff', icon:<Clock size={11}/> },
}

function StatusBadge({ status }: { status: keyof typeof STATUS_CONFIG }) {
  const s = STATUS_CONFIG[status]
  return (
    <span style={{ display:'inline-flex', alignItems:'center', gap:4, backgroundColor:s.bg, color:s.color, fontSize:'9px', fontWeight:800, padding:'4px 10px', borderRadius:100, textTransform:'uppercase', letterSpacing:'0.07em', whiteSpace:'nowrap' }}>
      {s.icon} {s.label}
    </span>
  )
}

function ProgressBar({ pct, status }: { pct:number; status:keyof typeof STATUS_CONFIG }) {
  const color = status==='ready'?'#10b981':status==='under-construction'?'#f59e0b':'#7c3aed'
  return (
    <div>
      <div style={{ display:'flex', justifyContent:'space-between', marginBottom:3 }}>
        <span style={{ fontSize:10, fontWeight:700, color:C.muted }}>Progress</span>
        <span style={{ fontSize:10, fontWeight:800, color }}>{pct}%</span>
      </div>
      <div style={{ height:4, backgroundColor:'#e2eae6', borderRadius:100, overflow:'hidden' }}>
        <div style={{ height:'100%', width:`${pct}%`, backgroundColor:color, borderRadius:100 }} />
      </div>
    </div>
  )
}

function makeProjects(cat: string, count: number) {
  const titles: Record<string,string[]> = {
    'apartments': ['Residences du Parc — Phase 1','Marina View Towers','Hay Riad Green Quarter','Anfa Skyline Residences','Corniche Prestige','Les Terrasses du Golf','Bouskoura Gardens','Atlas Lofts Marrakech'],
    'villas':     ['Palmeraie Golf Estate','Les Villas de l\'Atlantique','Domaine Impérial Ifrane','Villa del Mar Agadir','Les Almohades Villas','Dar Tazi Private Estate','Riad Moderne Fès','Marrakech Hills Villas'],
    'commerce':   ['Tanger Med Business Park','Casablanca Retail Hub','Morocco Mall Extension','Marrakech Commercial Centre','Agadir Business Square','Rabat Retail Corridor','Fès Commerce District','Meknès Business Zone'],
    'townhouses': ['Atlas Prestige Townhouses','Les Maisons du Golf','Kenitra Family Homes','Témara Green Duplexes','Mohammedia Townhouses','Salé Riverside Homes','El Jadida Sea Duplexes','Berrechid Family Complex'],
    'offices':    ['Marina Business Tower','CFC Tower Phase 2','Rabat Business Centre','Marrakech Office Park','Tanger Free Zone HQ','Agadir Business Hub','Fès Industrial Office','Casablanca Smart Tower'],
    'mixed-use':  ['Bab Doukkala Cultural Quarter','Anfa Mixed Complex','Hay Riad Live-Work','Casablanca Bay District','Marrakech Gateway','Tanger Old Port Revival','Rabat Medina Quarter','Agadir Seafront Complex'],
  }
  const locs = ['Casablanca, Anfa','Marrakech, Palmeraie','Rabat, Hay Riad','Tanger, Marina','Agadir, Bord de Mer','Fès, Ville Nouvelle','Ifrane','Casablanca Finance City']
  const statuses: Array<'off-plan'|'under-construction'|'ready'> = ['off-plan','under-construction','ready','off-plan','under-construction','off-plan','ready','under-construction']
  const devTypes: Array<'pro'|'private'> = ['pro','pro','private','pro','private','pro','pro','private']
  const plans   = ['30/70','40/60','50/50',null,'25/75',null,'35/65',null]
  const imgs    = IMGS[cat] || IMGS['apartments']
  const t       = titles[cat] || titles['apartments']
  return Array.from({length:count},(_,i)=>{
    const status = statuses[i%statuses.length]
    return {
      id:          `${cat}-${i}`,
      title:       t[i%t.length],
      developer:   ['Addoha Group','Alliances Darna','CDG Invest','Private Developer','Sonadac','Al Omrane'][i%6],
      devType:     devTypes[i%devTypes.length],
      location:    locs[i%locs.length],
      status,
      priceFrom:   (500000 + ((i*1273000)%25000000)).toLocaleString(),
      units:       8 + ((i*17)%350),
      completion:  status==='ready'?'Ready':`Q${1+(i%4)} ${2026+(i%3)}`,
      progress:    status==='ready'?100:status==='under-construction'?10+((i*13)%85):5+((i*7)%20),
      paymentPlan: plans[i%plans.length],
      yield_pct:   i%3===0 ? (5.5+((i*0.3)%3)).toFixed(1) : null,
      image:       imgs[i%imgs.length],
      badge:       i===0?'New Launch':i===1?'68% Sold':i===2?'Limited Units':null,
    }
  })
}

function ProjectCard({ p, locale, view }: { p:any; locale:string; view:'grid'|'list' }) {
  const [saved, setSaved] = useState(false)
  const [hov,   setHov  ] = useState(false)

  if (view === 'list') return (
    <Link href={`/${locale}/listing/${p.id}`} style={{ textDecoration:'none' }}>
      <article onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
        style={{ backgroundColor:'white', borderRadius:18, overflow:'hidden', boxShadow:hov?'0 12px 36px rgba(0,0,0,0.1)':'0 2px 8px rgba(0,0,0,0.05)', border:`1px solid ${hov?C.mint:'rgba(0,0,0,0.06)'}`, transition:'all 0.3s', display:'flex', cursor:'pointer', marginBottom:14 }}>
        <div style={{ position:'relative', width:260, flexShrink:0, overflow:'hidden' }}>
          <img src={p.image} alt={p.title} style={{ width:'100%', height:'100%', objectFit:'cover', transition:'transform 0.5s', transform:hov?'scale(1.04)':'scale(1)' }} />
          {p.badge && <span style={{ position:'absolute', top:10, left:10, backgroundColor:p.status==='ready'?'#10b981':p.status==='off-plan'?'#7c3aed':C.mint, color:'white', fontSize:'9px', fontWeight:800, padding:'4px 10px', borderRadius:100, textTransform:'uppercase' }}>{p.badge}</span>}
          <div style={{ position:'absolute', bottom:10, left:10 }}><StatusBadge status={p.status} /></div>
        </div>
        <div style={{ padding:'20px 24px', flex:1, display:'flex', flexDirection:'column', justifyContent:'space-between' }}>
          <div>
            <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:6 }}>
              <span style={{ fontSize:10, fontWeight:800, color:p.devType==='pro'?C.mint:C.muted, backgroundColor:p.devType==='pro'?`${C.mint}15`:'#f4f4f4', padding:'2px 9px', borderRadius:100, textTransform:'uppercase' }}>
                {p.devType==='pro'?'✦ Pro Developer':'Private Seller'}
              </span>
              <span style={{ fontSize:11, color:C.muted, fontWeight:600 }}>{p.developer}</span>
            </div>
            <h3 style={{ ...CB, fontSize:'16px', color:hov?C.mint:C.ink, marginBottom:5, transition:'color 0.2s' }}>{p.title}</h3>
            <div style={{ display:'flex', alignItems:'center', gap:5, marginBottom:10 }}>
              <MapPin size={12} color={C.muted}/><span style={{ fontSize:'12px', color:C.muted, fontWeight:600 }}>{p.location}</span>
            </div>
            <div style={{ display:'flex', gap:16, flexWrap:'wrap', marginBottom:10 }}>
              <span style={{ fontSize:'12px', color:'#475569', fontWeight:600, display:'flex', alignItems:'center', gap:4 }}><Users size={13} color={C.mint}/>{p.units} units</span>
              <span style={{ fontSize:'12px', color:'#475569', fontWeight:600, display:'flex', alignItems:'center', gap:4 }}><Calendar size={13} color={C.mint}/>{p.completion}</span>
              {p.yield_pct && <span style={{ fontSize:'12px', color:C.mint, fontWeight:800, display:'flex', alignItems:'center', gap:4 }}><TrendingUp size={13}/>{p.yield_pct}% yield</span>}
            </div>
            <ProgressBar pct={p.progress} status={p.status} />
          </div>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', paddingTop:14, borderTop:'1px solid #f1f5f9', marginTop:12 }}>
            <div>
              <p style={{ fontSize:11, color:C.muted, marginBottom:2 }}>From</p>
              <span style={{ ...CB, fontSize:'20px', color:C.mint }}>{p.priceFrom} MAD</span>
              {p.paymentPlan && <span style={{ marginLeft:8, fontSize:'11px', fontWeight:800, color:'#7c3aed', backgroundColor:'#f5f3ff', padding:'2px 8px', borderRadius:100 }}>{p.paymentPlan}</span>}
            </div>
            <div style={{ display:'flex', gap:8 }}>
              <button onClick={e=>e.preventDefault()} style={{ padding:'9px 18px', borderRadius:100, backgroundColor:C.surface, color:C.ink, border:'none', fontSize:'12px', fontWeight:700, cursor:'pointer', fontFamily:"'Inter',sans-serif" }}>Brochure</button>
              <button onClick={e=>e.preventDefault()} style={{ padding:'9px 20px', borderRadius:100, backgroundColor:C.mint, color:'white', border:'none', fontSize:'12px', fontWeight:700, cursor:'pointer', fontFamily:"'Inter',sans-serif" }}>View →</button>
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
          {p.badge && <span style={{ position:'absolute', top:12, left:12, backgroundColor:p.status==='ready'?'#10b981':p.status==='off-plan'?'#7c3aed':C.mint, color:'white', fontSize:'9px', fontWeight:800, padding:'4px 10px', borderRadius:100, textTransform:'uppercase' }}>{p.badge}</span>}
          <button onClick={e=>{e.preventDefault();setSaved(!saved)}} style={{ position:'absolute', top:12, right:12, width:34, height:34, borderRadius:'50%', backgroundColor:'rgba(255,255,255,0.9)', border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}>
            <Heart size={16} fill={saved?'#ef4444':'none'} color={saved?'#ef4444':'#6b7a76'}/>
          </button>
          <div style={{ position:'absolute', bottom:12, left:12 }}><StatusBadge status={p.status} /></div>
          {p.yield_pct && <div style={{ position:'absolute', bottom:12, right:12, background:`linear-gradient(135deg,${C.mint},${C.mintDk})`, padding:'4px 10px', borderRadius:8, display:'flex', alignItems:'center', gap:4 }}>
            <TrendingUp size={11} color="white"/><span style={{ color:'white', fontSize:'10px', fontWeight:800 }}>{p.yield_pct}% yield</span>
          </div>}
        </div>
        <div style={{ padding:'16px 18px', flex:1, display:'flex', flexDirection:'column' }}>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:6 }}>
            <span style={{ fontSize:10, fontWeight:800, color:p.devType==='pro'?C.mint:C.muted, backgroundColor:p.devType==='pro'?`${C.mint}15`:'#f4f4f4', padding:'2px 9px', borderRadius:100, textTransform:'uppercase' }}>
              {p.devType==='pro'?'✦ Pro':'Private'}
            </span>
            <span style={{ fontSize:10, color:C.muted, fontWeight:600 }}>{p.units} units</span>
          </div>
          <h3 style={{ ...CB, fontSize:'14px', color:hov?C.mint:C.ink, marginBottom:4, lineHeight:1.3, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap', transition:'color 0.2s' }}>{p.title}</h3>
          <p style={{ fontSize:11, color:C.muted, fontWeight:600, marginBottom:6 }}>by {p.developer}</p>
          <div style={{ display:'flex', alignItems:'center', gap:5, marginBottom:8 }}>
            <MapPin size={11} color={C.muted}/><span style={{ fontSize:'11px', color:C.muted, fontWeight:600 }}>{p.location}</span>
          </div>
          <div style={{ marginBottom:8 }}><ProgressBar pct={p.progress} status={p.status} /></div>
          <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:10 }}>
            <Calendar size={11} color={C.muted}/><span style={{ fontSize:'11px', color:C.muted, fontWeight:600 }}>Handover: {p.completion}</span>
            {p.paymentPlan && <span style={{ fontSize:'10px', fontWeight:800, color:'#7c3aed', backgroundColor:'#f5f3ff', padding:'2px 8px', borderRadius:100 }}>{p.paymentPlan}</span>}
          </div>
          <div style={{ marginTop:'auto', paddingTop:10, borderTop:'1px solid #f1f5f9', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
            <div>
              <p style={{ fontSize:10, color:C.muted, marginBottom:1 }}>From</p>
              <span style={{ ...CB, fontSize:'17px', color:C.mint }}>{p.priceFrom} MAD</span>
            </div>
            <button onClick={e=>e.preventDefault()} style={{ padding:'8px 14px', borderRadius:100, backgroundColor:C.ink, color:'white', border:'none', fontSize:'11px', fontWeight:700, cursor:'pointer', transition:'background 0.2s', fontFamily:"'Inter',sans-serif" }}
              onMouseEnter={e=>e.currentTarget.style.backgroundColor=C.mint}
              onMouseLeave={e=>e.currentTarget.style.backgroundColor=C.ink}>
              View →
            </button>
          </div>
        </div>
      </article>
    </Link>
  )
}

export default function NewProjectsSubPage() {
  const params  = useParams()
  const locale  = (params?.locale   as string) || 'en'
  const catSlug = (params?.category as string) || 'apartments'
  const data    = CAT_DATA[catSlug] || DEFAULT

  const [status,  setStatus ] = useState<Status>('all')
  const [devType, setDevType] = useState<DevType>('all')
  const [city,    setCity   ] = useState('All Morocco')
  const [view,    setView   ] = useState<'grid'|'list'>('grid')
  const [sort,    setSort   ] = useState<'Newest'|'Price Low'|'Price High'|'Most Advanced'>('Newest')
  const [page,    setPage   ] = useState(1)
  const [keyword, setKeyword] = useState('')

  const cities = ['All Morocco','Casablanca','Rabat','Marrakech','Tangier','Agadir','Fès','Meknès']

  const allProjects = makeProjects(catSlug, 18)
  const projects    = allProjects.filter(p => {
    if (status !== 'all' && p.status !== status) return false
    if (devType !== 'all' && p.devType !== devType) return false
    return true
  })

  return (
    <div style={{ fontFamily:"'Inter',sans-serif", backgroundColor:C.surface, minHeight:'100vh' }}>

      {/* HERO */}
      <section style={{ position:'relative', height:480, overflow:'hidden', display:'flex', alignItems:'center', justifyContent:'center' }}>
        <img src={data.hero} alt={data.label} style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover' }} />
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top, rgba(15,23,42,0.94) 0%, rgba(15,23,42,0.45) 60%, rgba(15,23,42,0.15) 100%)' }} />
        <div style={{ position:'relative', zIndex:10, textAlign:'center', padding:'0 24px', maxWidth:760, width:'100%' }}>
          <p style={{ fontSize:11, fontWeight:800, color:C.mint, textTransform:'uppercase', letterSpacing:'0.2em', marginBottom:14 }}>New Projects · {data.label}</p>
          <h1 style={{ ...UB, fontSize:'clamp(34px,5.5vw,62px)', color:'white', lineHeight:0.95, marginBottom:12, textTransform:'uppercase' }}>
            {data.emoji} {data.label}
          </h1>
          <p style={{ fontSize:15, color:'rgba(255,255,255,0.7)', marginBottom:28, lineHeight:1.6 }}>{data.desc}</p>
          <div style={{ display:'flex', alignItems:'stretch', backgroundColor:'rgba(255,255,255,0.12)', backdropFilter:'blur(24px)', border:'1px solid rgba(255,255,255,0.25)', borderRadius:100, overflow:'hidden', maxWidth:640, margin:'0 auto' }}>
            <div style={{ display:'flex', flexDirection:'column', padding:'13px 20px', flex:'0 0 150px', borderRight:'1px solid rgba(255,255,255,0.15)', gap:1 }}>
              <span style={{ fontSize:9, fontWeight:800, color:'rgba(255,255,255,0.5)', textTransform:'uppercase', letterSpacing:'0.12em' }}>City</span>
              <select value={city} onChange={e=>setCity(e.target.value)} style={{ backgroundColor:'transparent', border:'none', outline:'none', fontSize:13, fontWeight:700, color:'white', fontFamily:"'Inter',sans-serif", cursor:'pointer' }}>
                {cities.map(c=><option key={c} style={{ color:C.ink }}>{c}</option>)}
              </select>
            </div>
            <div style={{ display:'flex', flexDirection:'column', padding:'13px 20px', flex:1, borderRight:'1px solid rgba(255,255,255,0.15)', gap:1 }}>
              <span style={{ fontSize:9, fontWeight:800, color:'rgba(255,255,255,0.5)', textTransform:'uppercase', letterSpacing:'0.12em' }}>Keyword</span>
              <input value={keyword} onChange={e=>setKeyword(e.target.value)} placeholder="Developer, zone, project name..." style={{ backgroundColor:'transparent', border:'none', outline:'none', fontSize:13, fontWeight:600, color:'white', fontFamily:"'Inter',sans-serif", padding:0 }} />
            </div>
            <button style={{ backgroundColor:C.mint, color:'white', border:'none', padding:'0 28px', fontWeight:800, fontSize:14, cursor:'pointer', flexShrink:0, transition:'background 0.15s', display:'flex', alignItems:'center', gap:7 }}
              onMouseEnter={e=>e.currentTarget.style.backgroundColor=C.mintDk}
              onMouseLeave={e=>e.currentTarget.style.backgroundColor=C.mint}>
              <Search size={15}/> Search
            </button>
          </div>
        </div>
      </section>

      {/* FILTER HUB */}
      <div style={{ maxWidth:1440, margin:'-26px auto 0', padding:'0 40px', position:'relative', zIndex:30 }}>
        <div style={{ backgroundColor:'rgba(255,255,255,0.97)', backdropFilter:'blur(20px)', borderRadius:32, boxShadow:'0 8px 40px rgba(0,0,0,0.10)', border:'1px solid rgba(255,255,255,0.7)', overflow:'hidden' }}>
          <div style={{ display:'flex', alignItems:'center', borderBottom:'1px solid rgba(186,202,197,0.2)' }}>
            {[
              { label:'City', content:<select value={city} onChange={e=>setCity(e.target.value)} style={{ border:'none', outline:'none', fontSize:14, fontWeight:700, color:C.ink, backgroundColor:'transparent', cursor:'pointer', fontFamily:"'Inter',sans-serif" }}>{cities.map(c=><option key={c}>{c}</option>)}</select> },
              { label:'Min Price (MAD)', content:<input placeholder="Any" style={{ border:'none', outline:'none', fontSize:14, fontWeight:700, color:C.ink, backgroundColor:'transparent', fontFamily:"'Inter',sans-serif", width:90 }} /> },
              { label:'Max Price (MAD)', content:<input placeholder="Any" style={{ border:'none', outline:'none', fontSize:14, fontWeight:700, color:C.ink, backgroundColor:'transparent', fontFamily:"'Inter',sans-serif", width:90 }} /> },
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
          <div style={{ display:'flex', alignItems:'center', gap:8, padding:'10px 20px', flexWrap:'wrap' }}>
            <span style={{ fontSize:10, fontWeight:800, color:C.muted, textTransform:'uppercase', letterSpacing:'0.1em', flexShrink:0 }}>Status:</span>
            {([
              { key:'all',               label:'All' },
              { key:'off-plan',          label:'Off-Plan' },
              { key:'under-construction',label:'Under Construction' },
              { key:'ready',             label:'Ready' },
            ] as const).map(s=>(
              <button key={s.key} onClick={()=>setStatus(s.key)}
                style={{ padding:'7px 16px', borderRadius:100, border:`1.5px solid ${status===s.key?C.mint:'rgba(186,202,197,0.4)'}`, backgroundColor:status===s.key?C.mint:'white', color:status===s.key?'white':C.muted, cursor:'pointer', fontSize:12, fontWeight:700, transition:'all 0.2s', whiteSpace:'nowrap', fontFamily:"'Inter',sans-serif" }}>
                {s.label}
              </button>
            ))}
            <div style={{ width:1, height:20, backgroundColor:'rgba(186,202,197,0.4)', margin:'0 4px' }} />
            <span style={{ fontSize:10, fontWeight:800, color:C.muted, textTransform:'uppercase', letterSpacing:'0.1em', flexShrink:0 }}>Seller:</span>
            {([
              { key:'all',     label:'All Sellers' },
              { key:'pro',     label:'✦ Pro Developers' },
              { key:'private', label:'Private' },
            ] as const).map(d=>(
              <button key={d.key} onClick={()=>setDevType(d.key)}
                style={{ padding:'7px 16px', borderRadius:100, border:`1.5px solid ${devType===d.key?C.ink:'rgba(186,202,197,0.4)'}`, backgroundColor:devType===d.key?C.ink:'white', color:devType===d.key?'white':C.muted, cursor:'pointer', fontSize:12, fontWeight:700, transition:'all 0.2s', whiteSpace:'nowrap', fontFamily:"'Inter',sans-serif" }}>
                {d.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth:1440, margin:'40px auto 0', padding:'0 40px 80px' }}>

        {/* BREADCRUMB */}
        <nav style={{ display:'flex', alignItems:'center', gap:6, fontSize:11, fontWeight:700, color:C.muted, textTransform:'uppercase', letterSpacing:'0.07em', marginBottom:24 }}>
          {[
            { label:'Home',         href:`/${locale}` },
            { label:'Property',     href:`/${locale}/property` },
            { label:'New Projects', href:`/${locale}/property/new-projects` },
            { label:data.label,     href:null },
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

        {/* TITLE + CONTROLS */}
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', gap:16, marginBottom:24, flexWrap:'wrap' }}>
          <div>
            <h1 style={{ ...UB, fontSize:'clamp(22px,3vw,32px)', color:C.ink, marginBottom:4 }}>New {data.label} Projects in Morocco</h1>
            <p style={{ fontSize:15, color:C.mint, fontWeight:700 }}>{data.count} projects · {status!=='all'?STATUS_CONFIG[status as keyof typeof STATUS_CONFIG].label:'All statuses'}</p>
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:10 }}>
            <div style={{ display:'flex', gap:4, padding:'4px', backgroundColor:'#f4f4f4', borderRadius:100 }}>
              {(['Newest','Price Low','Price High','Most Advanced'] as const).map(s=>(
                <button key={s} onClick={()=>setSort(s)} style={{ padding:'7px 12px', borderRadius:100, fontSize:10, fontWeight:800, border:'none', cursor:'pointer', fontFamily:"'Inter',sans-serif", transition:'all 0.2s', backgroundColor:sort===s?C.ink:'transparent', color:sort===s?'white':C.muted }}>{s}</button>
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

        {/* CATEGORY PILLS */}
        <div style={{ display:'flex', gap:10, flexWrap:'wrap', marginBottom:24 }}>
          {ALL_CATS.map(cat=>(
            <Link key={cat.slug} href={`/${locale}/property/new-projects/${cat.slug}`}
              style={{ padding:'9px 18px', borderRadius:100, fontSize:12, fontWeight:800, border:`1.5px solid ${catSlug===cat.slug?C.mint:'rgba(186,202,197,0.4)'}`, backgroundColor:catSlug===cat.slug?C.mint:'white', color:catSlug===cat.slug?'white':C.muted, textDecoration:'none', transition:'all 0.15s', fontFamily:"'Inter',sans-serif", display:'flex', alignItems:'center', gap:5 }}
              onMouseEnter={e=>{if(catSlug!==cat.slug){(e.currentTarget as HTMLElement).style.borderColor=C.mint;(e.currentTarget as HTMLElement).style.color=C.mint}}}
              onMouseLeave={e=>{if(catSlug!==cat.slug){(e.currentTarget as HTMLElement).style.borderColor='rgba(186,202,197,0.4)';(e.currentTarget as HTMLElement).style.color=C.muted}}}>
              {cat.emoji} {cat.label}
            </Link>
          ))}
          <Link href={`/${locale}/property/new-projects`}
            style={{ padding:'9px 18px', borderRadius:100, fontSize:12, fontWeight:800, border:'1.5px solid rgba(186,202,197,0.4)', backgroundColor:'white', color:C.muted, textDecoration:'none', fontFamily:"'Inter',sans-serif" }}>
            + View More
          </Link>
        </div>

        <p style={{ fontSize:13, color:C.muted, fontWeight:600, marginBottom:20 }}>
          {projects.length} {data.label.toLowerCase()} projects {status!=='all'?`· ${STATUS_CONFIG[status as keyof typeof STATUS_CONFIG].label}`:''} {devType!=='all'?`· ${devType==='pro'?'Pro Developers':'Private Sellers'}':''}
        </p>

        {/* PROJECTS */}
        {projects.length > 0 ? (
          view === 'grid' ? (
            <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:24, marginBottom:48 }}>
              {projects.map(p => <ProjectCard key={p.id} p={p} locale={locale} view="grid" />)}
            </div>
          ) : (
            <div style={{ marginBottom:48 }}>
              {projects.map(p => <ProjectCard key={p.id} p={p} locale={locale} view="list" />)}
            </div>
          )
        ) : (
          <div style={{ textAlign:'center', padding:'80px 0' }}>
            <span style={{ fontSize:48, display:'block', marginBottom:16 }}>🔍</span>
            <p style={{ fontSize:18, fontWeight:700, color:C.muted, marginBottom:16 }}>No projects match your filters.</p>
            <button onClick={()=>{ setStatus('all'); setDevType('all') }}
              style={{ padding:'12px 28px', borderRadius:100, backgroundColor:C.mint, color:'white', border:'none', fontSize:14, fontWeight:700, cursor:'pointer' }}>Clear Filters</button>
          </div>
        )}

        {/* PAGINATION */}
        <div style={{ display:'flex', justifyContent:'center', alignItems:'center', gap:10, marginBottom:64 }}>
          <button onClick={()=>setPage(Math.max(1,page-1))} style={{ width:44, height:44, borderRadius:12, backgroundColor:'white', border:'1px solid rgba(107,122,118,0.12)', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', color:C.muted }}><ChevronLeft size={18}/></button>
          {[1,2,3].map(p=>(
            <button key={p} onClick={()=>setPage(p)} style={{ width:44, height:44, borderRadius:12, cursor:'pointer', fontSize:15, fontWeight:900, border:'1px solid', transition:'all 0.2s', backgroundColor:page===p?C.mint:'white', color:page===p?'white':C.muted, borderColor:page===p?C.mint:'rgba(107,122,118,0.12)', fontFamily:"'Inter',sans-serif" }}>{p}</button>
          ))}
          <button onClick={()=>setPage(Math.min(5,page+1))} style={{ width:44, height:44, borderRadius:12, backgroundColor:'white', border:'1px solid rgba(107,122,118,0.12)', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', color:C.muted }}><ChevronRight size={18}/></button>
        </div>

        {/* EXPLORE OTHER TYPES */}
        <div style={{ borderTop:'1px solid rgba(186,202,197,0.3)', paddingTop:40 }}>
          <p style={{ fontSize:12, fontWeight:800, color:C.muted, textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:20, textAlign:'center' }}>Explore Other Project Types</p>
          <div style={{ display:'flex', gap:10, justifyContent:'center', flexWrap:'wrap', marginBottom:24 }}>
            {ALL_CATS.filter(c=>c.slug!==catSlug).map(cat=>(
              <Link key={cat.slug} href={`/${locale}/property/new-projects/${cat.slug}`}
                style={{ padding:'10px 22px', borderRadius:100, fontSize:12, fontWeight:800, border:'1.5px solid rgba(186,202,197,0.4)', backgroundColor:'white', color:C.muted, textDecoration:'none', transition:'all 0.2s', fontFamily:"'Inter',sans-serif", display:'flex', alignItems:'center', gap:5 }}
                onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.borderColor=C.mint;(e.currentTarget as HTMLElement).style.color=C.mint}}
                onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.borderColor='rgba(186,202,197,0.4)';(e.currentTarget as HTMLElement).style.color=C.muted}}>
                {cat.emoji} {cat.label}
              </Link>
            ))}
          </div>
          <div style={{ display:'flex', gap:10, justifyContent:'center', flexWrap:'wrap' }}>
            {[
              { label:'← All New Projects', href:`/${locale}/property/new-projects` },
              { label:'← Property Hub',     href:`/${locale}/property`              },
              { label:'← Home',             href:`/${locale}`                       },
            ].map((b,i)=>(
              <Link key={b.label} href={b.href}
                style={{ padding:'12px 24px', borderRadius:100, textDecoration:'none', fontSize:13, fontWeight:900, fontFamily:"'Inter',sans-serif", transition:'all 0.2s', display:'flex', alignItems:'center', gap:6,
                  backgroundColor: i===2 ? C.ink : 'white',
                  color:           i===2 ? 'white' : C.ink,
                  border:          i===2 ? 'none' : '1.5px solid rgba(186,202,197,0.4)' }}
                onMouseEnter={e=>{if(i<2){(e.currentTarget as HTMLElement).style.borderColor=C.mint;(e.currentTarget as HTMLElement).style.color=C.mint}else{(e.currentTarget as HTMLElement).style.backgroundColor=C.mint}}}
                onMouseLeave={e=>{if(i<2){(e.currentTarget as HTMLElement).style.borderColor='rgba(186,202,197,0.4)';(e.currentTarget as HTMLElement).style.color=C.ink}else{(e.currentTarget as HTMLElement).style.backgroundColor=C.ink}}}>
                {b.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
