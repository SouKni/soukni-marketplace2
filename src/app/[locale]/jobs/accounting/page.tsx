'use client'

import { useState } from 'react'
import React from 'react'
import { Heart, Search, MapPin, ChevronDown, ChevronLeft, ChevronRight, SlidersHorizontal } from 'lucide-react'

/* ─── PALETTE ─────────────────────────────────────────────── */
const C = {
  mint:    '#22d4a8',
  mintDk:  '#006c53',
  ink:     '#161d1b',
  surface: '#f4fbf8',
  cream:   '#f5ede0',
  muted:   '#6b7a76',
}
const UB: React.CSSProperties = { fontFamily:'Inter,sans-serif',              fontWeight:900, letterSpacing:'-0.05em' }
const CB: React.CSSProperties = { fontFamily:"'Hanken Grotesk',sans-serif",   fontWeight:900, letterSpacing:'-0.03em' }

/* ─── IMAGES ──────────────────────────────────────────────── */
const IMG = {
  hero:  'https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&w=1600',
  p1:    'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&w=400',
  p2:    'https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&w=400',
  p3:    'https://images.pexels.com/photos/3756681/pexels-photo-3756681.jpeg?auto=compress&w=400',
  p4:    'https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg?auto=compress&w=400',
  p5:    'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&w=400',
  p6:    'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&w=400',
  p7:    'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&w=400',
  p8:    'https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&w=400',
  expo:  'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&w=1400',
  immo:  'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&w=900',
  port:  'https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&w=900',
  phone: 'https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&w=400',
}

/* ─── BADGE ──────────────────────────────────────────────── */
type BadgeT = 'certified'|'diamond'|'featured'|'urgent'
function Badge({ type }: { type: BadgeT }) {
  const map: Record<BadgeT,{bg:string;color:string;label:string}> = {
    certified: { bg:C.mint,    color:C.ink,  label:'SOUKNI CERTIFIED' },
    diamond:   { bg:C.ink,     color:C.mint, label:'◆ DIAMOND'         },
    featured:  { bg:'#fbbf24', color:C.ink,  label:'FEATURED'          },
    urgent:    { bg:'#ef4444', color:'white', label:'URGENT'            },
  }
  const s = map[type]
  return (
    <span style={{ backgroundColor:s.bg, color:s.color, fontSize:'8px', ...CB, padding:'4px 10px', borderRadius:'6px', textTransform:'uppercase' as const, letterSpacing:'0.08em', display:'inline-block', boxShadow:'0 2px 6px rgba(0,0,0,0.12)', whiteSpace:'nowrap' as const }}>
      {s.label}
    </span>
  )
}

/* ─── TOP CHOICE CARD (portrait, tall) ───────────────────── */
function TopCard({ name, role, company, salary, period, img, badge, skills }: any) {
  const [saved, setSaved] = useState(false)
  const [hov, setHov] = useState(false)
  return (
    <article onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{ backgroundColor:'white', borderRadius:'28px', border:`1px solid ${hov?C.mint:'rgba(107,122,118,0.12)'}`, overflow:'hidden', boxShadow:hov?`0 20px 48px ${C.mint}18`:'0 2px 12px rgba(0,0,0,0.05)', transition:'all 0.3s', cursor:'pointer', display:'flex', flexDirection:'column' as const }}>
      <div style={{ position:'relative', height:'260px', overflow:'hidden', backgroundColor:C.cream }}>
        <img src={img} alt={name} style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'top', transition:'transform 0.6s', transform:hov?'scale(1.05)':'scale(1)' }} />
        <div style={{ position:'absolute', top:'12px', left:'12px', zIndex:10 }}><Badge type={badge} /></div>
        <button onClick={e=>{e.stopPropagation();setSaved(!saved)}} style={{ position:'absolute', top:'10px', right:'10px', zIndex:10, width:'32px', height:'32px', borderRadius:'50%', backgroundColor:'rgba(255,255,255,0.85)', border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}>
          <Heart size={14} fill={saved?'#ef4444':'none'} color={saved?'#ef4444':C.muted} />
        </button>
      </div>
      <div style={{ padding:'20px 22px', flex:1, display:'flex', flexDirection:'column' as const }}>
        <div style={{ marginBottom:'8px' }}>
          <h4 style={{ fontSize:'16px', ...UB, color:hov?C.mint:C.ink, marginBottom:'3px', transition:'color 0.2s' }}>{name}</h4>
          <p style={{ fontSize:'13px', ...CB, color:C.mint, marginBottom:'2px' }}>{role}</p>
          <p style={{ fontSize:'11px', ...CB, color:C.muted }}>{company}</p>
        </div>
        <div style={{ display:'flex', gap:'8px', marginBottom:'12px', flexWrap:'wrap' as const }}>
          {skills?.map((s:string) => (
            <span key={s} style={{ backgroundColor:C.surface, color:C.muted, fontSize:'9px', ...CB, padding:'3px 8px', borderRadius:'6px', textTransform:'uppercase' as const, letterSpacing:'0.06em' }}>{s}</span>
          ))}
        </div>
        <p style={{ fontSize:'18px', ...CB, color:C.mint, marginBottom:'4px' }}>{salary.toLocaleString()} MAD <span style={{ fontSize:'11px', fontWeight:400, color:C.muted }}>/ {period}</span></p>
        <p style={{ fontSize:'10px', ...CB, color:C.muted, marginBottom:'14px', display:'flex', alignItems:'center', gap:'4px' }}><MapPin size={10} /> Rabat</p>
        <div style={{ marginTop:'auto', display:'flex', gap:'8px' }}>
          <button style={{ flex:1, border:`2px solid ${C.ink}`, color:C.ink, backgroundColor:'transparent', padding:'10px', borderRadius:'14px', fontSize:'10px', ...CB, textTransform:'uppercase' as const, cursor:'pointer', transition:'all 0.15s' }}
            onMouseEnter={e=>{e.currentTarget.style.backgroundColor=C.ink;e.currentTarget.style.color='white'}}
            onMouseLeave={e=>{e.currentTarget.style.backgroundColor='transparent';e.currentTarget.style.color=C.ink}}
          >Message</button>
          <button style={{ flex:1, backgroundColor:C.mint, color:C.ink, border:'none', padding:'10px', borderRadius:'14px', fontSize:'10px', ...CB, textTransform:'uppercase' as const, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', gap:'4px', transition:'filter 0.15s' }}
            onMouseEnter={e=>e.currentTarget.style.filter='brightness(1.08)'}
            onMouseLeave={e=>e.currentTarget.style.filter='brightness(1)'}
          >💬 WhatsApp</button>
        </div>
      </div>
    </article>
  )
}

/* ─── GRID JOB CARD ──────────────────────────────────────── */
function JobCard({ name, role, company, salary, period, img, badge, area, experience }: any) {
  const [saved, setSaved] = useState(false)
  const [hov, setHov] = useState(false)
  return (
    <article onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{ backgroundColor:'white', borderRadius:'24px', border:`1px solid ${hov?C.mint:'rgba(107,122,118,0.1)'}`, overflow:'hidden', boxShadow:hov?`0 16px 40px ${C.mint}18`:'0 2px 8px rgba(0,0,0,0.04)', transition:'all 0.3s', cursor:'pointer', display:'flex', flexDirection:'column' as const }}>
      <div style={{ position:'relative', height:'200px', overflow:'hidden', backgroundColor:C.cream }}>
        <img src={img} alt={name} style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'top', transition:'transform 0.5s', transform:hov?'scale(1.06)':'scale(1)' }} />
        <div style={{ position:'absolute', top:'10px', left:'10px', zIndex:10 }}><Badge type={badge} /></div>
        <button onClick={e=>{e.stopPropagation();setSaved(!saved)}} style={{ position:'absolute', top:'8px', right:'8px', zIndex:10, width:'28px', height:'28px', borderRadius:'50%', backgroundColor:'rgba(255,255,255,0.85)', border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}>
          <Heart size={12} fill={saved?'#ef4444':'none'} color={saved?'#ef4444':C.muted} />
        </button>
      </div>
      <div style={{ padding:'16px 18px', flex:1, display:'flex', flexDirection:'column' as const }}>
        <h4 style={{ fontSize:'14px', ...UB, color:hov?C.mint:C.ink, marginBottom:'2px', transition:'color 0.2s', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' as const }}>{name}</h4>
        <p style={{ fontSize:'11px', ...CB, color:C.mint, marginBottom:'1px' }}>{role}</p>
        <p style={{ fontSize:'10px', ...CB, color:C.muted, marginBottom:'6px' }}>{company}</p>
        <div style={{ display:'flex', gap:'8px', marginBottom:'8px', flexWrap:'wrap' as const }}>
          {area && <span style={{ fontSize:'9px', ...CB, color:C.muted, display:'flex', alignItems:'center', gap:'3px' }}><MapPin size={9} />{area}</span>}
          {experience && <span style={{ fontSize:'9px', ...CB, color:C.muted }}>· {experience}</span>}
        </div>
        <p style={{ fontSize:'15px', ...CB, color:C.mint, marginBottom:'12px' }}>{salary.toLocaleString()} MAD <span style={{ fontSize:'10px', fontWeight:400, color:C.muted }}>/ {period}</span></p>
        <div style={{ marginTop:'auto', display:'flex', gap:'6px' }}>
          <button style={{ flex:1, border:`1px solid ${C.ink}`, color:C.ink, backgroundColor:'transparent', padding:'8px', borderRadius:'12px', fontSize:'9px', ...CB, textTransform:'uppercase' as const, cursor:'pointer', transition:'all 0.15s' }}
            onMouseEnter={e=>{e.currentTarget.style.backgroundColor=C.ink;e.currentTarget.style.color='white'}}
            onMouseLeave={e=>{e.currentTarget.style.backgroundColor='transparent';e.currentTarget.style.color=C.ink}}
          >Message</button>
          <button style={{ flex:1, backgroundColor:C.mint, color:C.ink, border:'none', padding:'8px', borderRadius:'12px', fontSize:'9px', ...CB, textTransform:'uppercase' as const, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', gap:'3px' }}>💬 WhatsApp</button>
        </div>
      </div>
    </article>
  )
}

/* ─── DATA ───────────────────────────────────────────────── */
const topChoices = [
  { name:'Chief Financial Officer',    role:'CFO / C-Suite Finance',      company:'Atlas Capital Group',      salary:65000, period:'Month', img:IMG.p1, badge:'certified' as BadgeT, skills:['IFRS','M&A','Treasury'] },
  { name:'Senior Portfolio Manager',   role:'Investment Management',       company:'Moroccan Finance House',   salary:52000, period:'Month', img:IMG.p2, badge:'diamond'   as BadgeT, skills:['Bloomberg','CFA','Risk'] },
  { name:'Senior Risk Analyst',        role:'Risk & Compliance',           company:'BCP Group',                salary:38000, period:'Month', img:IMG.p3, badge:'certified' as BadgeT, skills:['Basel III','VaR','SOX'] },
  { name:'Financial Controller',       role:'Financial Reporting',         company:'OCP Finance Division',     salary:42000, period:'Month', img:IMG.p4, badge:'featured'  as BadgeT, skills:['SAP','IFRS','FP&A'] },
]

const topRow2 = [
  { name:'Investment Banker',          role:'Corporate Finance',           company:'CDG Capital',              salary:48000, period:'Month', img:IMG.p5, badge:'certified' as BadgeT, skills:['DCF','LBO','Pitchbooks'] },
  { name:'Audit Manager',             role:'Internal Audit',              company:'Deloitte Maroc',           salary:35000, period:'Month', img:IMG.p6, badge:'diamond'   as BadgeT, skills:['KPMG','Big4','CISA'] },
  { name:'Senior Tax Consultant',     role:'Tax Advisory',                company:'PwC Morocco',              salary:40000, period:'Month', img:IMG.p7, badge:'certified' as BadgeT, skills:['VAT','Transfer Pricing'] },
  { name:'Senior Finance Director',   role:'Strategic Finance',           company:'Maroc Telecom Finance',    salary:55000, period:'Month', img:IMG.p8, badge:'featured'  as BadgeT, skills:['FP&A','Board Reporting'] },
]

function makeGrid(count: number) {
  const roles = ['Chief Accountant','Portfolio Analyst','Tax Consultant','Treasury Manager','Audit Lead','FP&A Associate','International Tax Expert','Group CFO','Compliance Director','Private Equity Analyst','Tax Strategy Lead','Regional Finance Head','Audit Partner','Wealth Advisor','Tax Compliance Manager']
  const companies = ['Attijariwafa Bank','BMCE Bank','CIH Bank','CDG Capital','OCP Finance','BCP Group','Wafa Assurance','RMA Watanya','Al Barid Bank','Société Générale Maroc']
  const imgs = [IMG.p1,IMG.p2,IMG.p3,IMG.p4,IMG.p5,IMG.p6,IMG.p7,IMG.p8]
  const badges: BadgeT[] = ['certified','diamond','featured','urgent','certified','diamond','certified','featured']
  const areas = ['Rabat, Agdal','Rabat, Hassan','Casablanca','Rabat, Hay Riad','Rabat, Souissi']
  const exps = ['5-8 ans','3-5 ans','8-12 ans','2-4 ans','10+ ans']
  return Array.from({length:count},(_,i)=>({
    name: roles[i % roles.length],
    role: ['Senior Finance','Audit & Control','Tax Advisory','Treasury & Risk','Investment'][i%5],
    company: companies[i % companies.length],
    salary: 18000 + ((i * 3731) % 42000),
    period: i%3===0 ? 'Month' : 'Month',
    img: imgs[i % imgs.length],
    badge: badges[i % badges.length],
    area: areas[i % areas.length],
    experience: exps[i % exps.length],
  }))
}

const gridItems = makeGrid(20)

const CATS = [
  'ALL POSITIONS','CHARTERED ACCOUNTANTS','TAX CONSULTANTS','AUDIT MANAGERS','FINANCIAL ANALYSTS',
]
const SUB_CATS = ['All Fields','SouKni Members','SouKni Pro']

export default function AccountingFinancePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = React.use(params)
  const [cat, setCat]         = useState('ALL POSITIONS')
  const [sub, setSub]         = useState('All Fields')
  const [diamond, setDiamond] = useState(true)
  const [page, setPage]       = useState(1)
  const [city, setCity]       = useState('Rabat')
  const [kw, setKw]           = useState('')
  const [salary, setSalary]   = useState('Any Range')
  const [exp, setExp]         = useState('Any')
  const [cityOpen, setCityOpen]   = useState(false)
  const [salaryOpen, setSalaryOpen] = useState(false)

  const cities = ['Rabat','Casablanca','Marrakech','Fès','Tanger','Agadir','Meknès']
  const salaries = ['Any Range','10,000 – 20,000 MAD','20,000 – 35,000 MAD','35,000 – 55,000 MAD','55,000 – 80,000 MAD','80,000+ MAD']

  return (
    <div style={{ ...UB, backgroundColor:C.surface, color:C.ink, minHeight:'100vh' }}>

      {/* ── HERO ── */}
      <section style={{ position:'relative', height:'440px', display:'flex', alignItems:'center', justifyContent:'center', overflow:'hidden' }}>
        <img src={IMG.hero} alt="Finance Jobs" style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover' }} />
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(to bottom, rgba(22,29,27,0.62) 0%, rgba(22,29,27,0.28) 60%, #f4fbf8 100%)' }} />
        <div style={{ position:'relative', zIndex:10, textAlign:'center' as const, maxWidth:'860px', padding:'0 24px', width:'100%' }}>
          <h1 style={{ fontSize:'clamp(32px,5vw,48px)', ...UB, color:'white', marginBottom:'32px', lineHeight:1.05, textShadow:'0 4px 24px rgba(0,0,0,0.4)' }}>
            Discover Career Opportunities<br/>in Finance & Accounting
          </h1>
          {/* transparent search */}
          <div style={{ backgroundColor:'rgba(255,255,255,0.14)', backdropFilter:'blur(16px)', border:'1px solid rgba(255,255,255,0.22)', borderRadius:'100px', padding:'8px', display:'flex', gap:'8px', alignItems:'center', maxWidth:'700px', margin:'0 auto' }}>
            <div style={{ flex:1, display:'flex', alignItems:'center', gap:'10px', backgroundColor:'rgba(255,255,255,0.12)', borderRadius:'100px', padding:'12px 22px' }}>
              <Search size={17} color="rgba(255,255,255,0.8)" />
              <input type="text" value={kw} onChange={e=>setKw(e.target.value)} placeholder="Search roles, companies, skills..."
                style={{ flex:1, background:'none', border:'none', outline:'none', color:'white', fontSize:'14px', ...UB, fontFamily:'Inter,sans-serif' }} />
            </div>
            <button style={{ backgroundColor:C.mint, color:C.ink, border:'none', padding:'14px 36px', borderRadius:'100px', fontSize:'11px', ...UB, textTransform:'uppercase' as const, letterSpacing:'0.12em', cursor:'pointer', flexShrink:0, transition:'filter 0.15s', boxShadow:`0 4px 16px ${C.mint}40` }}
              onMouseEnter={e=>e.currentTarget.style.filter='brightness(1.08)'}
              onMouseLeave={e=>e.currentTarget.style.filter='brightness(1)'}
            >SEARCH JOBS</button>
          </div>
        </div>
      </section>

      {/* ── FILTER BAR ── */}
      <div style={{ maxWidth:'1280px', margin:'-36px auto 36px', padding:'0 24px', position:'relative', zIndex:20 }}>
        <div style={{ backgroundColor:'rgba(255,255,255,0.94)', backdropFilter:'blur(16px)', border:'1px solid rgba(107,122,118,0.12)', borderRadius:'100px', boxShadow:'0 12px 40px rgba(0,0,0,0.08)', display:'flex', alignItems:'stretch', height:'72px' }}>

          {/* CITY */}
          <div style={{ position:'relative', flex:1 }}>
            <button onClick={()=>{setCityOpen(!cityOpen);setSalaryOpen(false)}} style={{ width:'100%', height:'100%', background:'none', border:'none', cursor:'pointer', padding:'0 22px', display:'flex', flexDirection:'column' as const, justifyContent:'center', textAlign:'left' as const }}>
              <span style={{ fontSize:'8px', ...UB, textTransform:'uppercase' as const, letterSpacing:'0.14em', color:C.muted, marginBottom:'3px' }}>CITY</span>
              <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                <span style={{ fontSize:'14px', ...UB, color:C.ink }}>{city}</span>
                <ChevronDown size={14} color={C.mint} style={{ transition:'transform 0.2s', transform:cityOpen?'rotate(180deg)':'rotate(0)' }} />
              </div>
            </button>
            {cityOpen && (
              <div style={{ position:'absolute', top:'calc(100% + 8px)', left:0, minWidth:'200px', backgroundColor:'white', borderRadius:'20px', boxShadow:'0 20px 60px rgba(0,0,0,0.12)', border:'1px solid rgba(107,122,118,0.12)', zIndex:100, overflow:'hidden', padding:'8px 0' }}>
                {cities.map(c=>(
                  <button key={c} onClick={()=>{setCity(c);setCityOpen(false)}}
                    style={{ width:'100%', padding:'12px 20px', background:'none', border:'none', cursor:'pointer', textAlign:'left' as const, fontSize:'14px', ...UB, color:c===city?C.mint:C.ink, transition:'background 0.15s', display:'flex', justifyContent:'space-between' }}
                    onMouseEnter={e=>e.currentTarget.style.backgroundColor=C.surface}
                    onMouseLeave={e=>e.currentTarget.style.backgroundColor='transparent'}
                  >{c}{c===city&&<span style={{color:C.mint}}>✓</span>}</button>
                ))}
              </div>
            )}
          </div>

          <div style={{ width:'1px', backgroundColor:'rgba(107,122,118,0.12)', margin:'12px 0' }} />

          {/* KEYWORD */}
          <div style={{ flex:1.8, padding:'0 22px', display:'flex', flexDirection:'column' as const, justifyContent:'center' }}>
            <span style={{ fontSize:'8px', ...UB, textTransform:'uppercase' as const, letterSpacing:'0.14em', color:C.muted, marginBottom:'3px' }}>KEYWORD</span>
            <div style={{ display:'flex', alignItems:'center', gap:'8px' }}>
              <Search size={13} color={C.muted} style={{ flexShrink:0 }} />
              <input type="text" value={kw} onChange={e=>setKw(e.target.value)} placeholder="Role, skill, company..."
                style={{ flex:1, background:'none', border:'none', outline:'none', fontSize:'14px', ...UB, color:C.ink, fontFamily:'Inter,sans-serif' }} />
              {kw && <button onClick={()=>setKw('')} style={{ background:'none', border:'none', cursor:'pointer', color:C.muted, fontSize:'16px' }}>✕</button>}
            </div>
          </div>

          <div style={{ width:'1px', backgroundColor:'rgba(107,122,118,0.12)', margin:'12px 0' }} />

          {/* NEIGHBORHOOD */}
          <div style={{ flex:1, padding:'0 22px', display:'flex', flexDirection:'column' as const, justifyContent:'center' }}>
            <span style={{ fontSize:'8px', ...UB, textTransform:'uppercase' as const, letterSpacing:'0.14em', color:C.muted, marginBottom:'3px' }}>NEIGHBORHOOD</span>
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
              <span style={{ fontSize:'14px', ...UB, color:'rgba(22,29,27,0.45)' }}>All Areas</span>
              <ChevronDown size={14} color={C.mint} />
            </div>
          </div>

          <div style={{ width:'1px', backgroundColor:'rgba(107,122,118,0.12)', margin:'12px 0' }} />

          {/* SALARY */}
          <div style={{ position:'relative', flex:1 }}>
            <button onClick={()=>{setSalaryOpen(!salaryOpen);setCityOpen(false)}} style={{ width:'100%', height:'100%', background:'none', border:'none', cursor:'pointer', padding:'0 22px', display:'flex', flexDirection:'column' as const, justifyContent:'center', textAlign:'left' as const }}>
              <span style={{ fontSize:'8px', ...UB, textTransform:'uppercase' as const, letterSpacing:'0.14em', color:C.muted, marginBottom:'3px' }}>SALARY RANGE</span>
              <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                <span style={{ fontSize:'13px', ...UB, color:C.ink, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' as const, flex:1 }}>{salary}</span>
                <ChevronDown size={14} color={C.mint} style={{ transition:'transform 0.2s', transform:salaryOpen?'rotate(180deg)':'rotate(0)', flexShrink:0 }} />
              </div>
            </button>
            {salaryOpen && (
              <div style={{ position:'absolute', top:'calc(100% + 8px)', right:0, minWidth:'240px', backgroundColor:'white', borderRadius:'20px', boxShadow:'0 20px 60px rgba(0,0,0,0.12)', border:'1px solid rgba(107,122,118,0.12)', zIndex:100, overflow:'hidden', padding:'8px 0' }}>
                {salaries.map(s=>(
                  <button key={s} onClick={()=>{setSalary(s);setSalaryOpen(false)}}
                    style={{ width:'100%', padding:'12px 20px', background:'none', border:'none', cursor:'pointer', textAlign:'left' as const, fontSize:'13px', ...UB, color:s===salary?C.mint:C.ink, transition:'background 0.15s', display:'flex', justifyContent:'space-between' }}
                    onMouseEnter={e=>e.currentTarget.style.backgroundColor=C.surface}
                    onMouseLeave={e=>e.currentTarget.style.backgroundColor='transparent'}
                  >{s}{s===salary&&<span style={{color:C.mint}}>✓</span>}</button>
                ))}
              </div>
            )}
          </div>

          <div style={{ width:'1px', backgroundColor:'rgba(107,122,118,0.12)', margin:'12px 0' }} />

          {/* FILTERS */}
          <button style={{ display:'flex', alignItems:'center', gap:'10px', padding:'0 28px', background:'none', border:'none', cursor:'pointer', borderRadius:'0 100px 100px 0', transition:'background 0.15s', flexShrink:0 }}
            onMouseEnter={e=>e.currentTarget.style.backgroundColor=`${C.mint}14`}
            onMouseLeave={e=>e.currentTarget.style.backgroundColor='transparent'}
          >
            <SlidersHorizontal size={18} color={C.mint} />
            <span style={{ fontSize:'14px', ...UB, color:C.ink }}>Filters</span>
          </button>
        </div>
      </div>

      <main style={{ maxWidth:'1280px', margin:'0 auto', padding:'0 24px 80px' }}>

        {/* ── BREADCRUMB ── */}
        <div style={{ marginBottom:'24px' }}>
          <nav style={{ display:'flex', alignItems:'center', gap:'6px', fontSize:'9px', ...UB, color:C.muted, textTransform:'uppercase' as const, letterSpacing:'0.14em', marginBottom:'14px' }}>
            {['Rabat','The Vault','Jobs','Accounting & Finance'].map((c,i,arr)=>(
              <React.Fragment key={c}>
                <a href="#" style={{ color:i===arr.length-1?C.mint:C.muted, textDecoration:'none' }}>{c}</a>
                {i<arr.length-1 && <span style={{ opacity:0.4 }}>›</span>}
              </React.Fragment>
            ))}
          </nav>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', flexWrap:'wrap' as const, gap:'16px' }}>
            <div>
              <h2 style={{ fontSize:'clamp(20px,2.5vw,28px)', ...UB, color:C.ink, marginBottom:'4px' }}>Accounting & Finance Jobs in Rabat</h2>
              <span style={{ fontSize:'12px', ...UB, color:C.muted }}>6,752 ACTIVE POSITIONS</span>
            </div>
            <div style={{ display:'flex', gap:'10px' }}>
              {['↕ SORT: DEFAULT','🔖 SAVE SEARCH'].map(b=>(
                <button key={b} style={{ backgroundColor:'white', border:'1px solid rgba(107,122,118,0.18)', padding:'9px 16px', borderRadius:'12px', fontSize:'9px', ...UB, textTransform:'uppercase' as const, letterSpacing:'0.1em', cursor:'pointer', color:C.ink, transition:'background 0.15s' }}
                  onMouseEnter={e=>e.currentTarget.style.backgroundColor=C.surface}
                  onMouseLeave={e=>e.currentTarget.style.backgroundColor='white'}
                >{b}</button>
              ))}
            </div>
          </div>
        </div>

        {/* ── CATEGORY PILLS ── */}
        <div style={{ display:'flex', gap:'10px', overflowX:'auto' as const, paddingBottom:'6px', marginBottom:'16px' }}>
          {CATS.map(c=>(
            <button key={c} onClick={()=>setCat(c)}
              style={{ whiteSpace:'nowrap' as const, padding:'11px 22px', borderRadius:'100px', fontSize:'9px', ...UB, textTransform:'uppercase' as const, letterSpacing:'0.1em', border:'none', cursor:'pointer', transition:'all 0.2s',
                backgroundColor: cat===c ? C.mint : C.ink,
                color:           cat===c ? C.ink  : 'white',
              }}
            >{c}</button>
          ))}
        </div>

        {/* ── SUB TABS + DIAMOND ── */}
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap' as const, gap:'14px', marginBottom:'40px', paddingBottom:'20px', borderBottom:`1px solid rgba(107,122,118,0.12)` }}>
          <div style={{ display:'flex', gap:'6px', padding:'4px', backgroundColor:'rgba(107,122,118,0.06)', borderRadius:'14px' }}>
            {SUB_CATS.map(s=>(
              <button key={s} onClick={()=>setSub(s)}
                style={{ padding:'9px 22px', borderRadius:'10px', fontSize:'10px', ...UB, textTransform:'uppercase' as const, letterSpacing:'0.1em', border:'none', cursor:'pointer', transition:'all 0.2s',
                  backgroundColor: sub===s ? C.mint : 'transparent',
                  color:           sub===s ? C.ink  : C.muted,
                  boxShadow:       sub===s ? `0 2px 8px ${C.mint}30` : 'none',
                }}
              >{s}</button>
            ))}
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:'12px', cursor:'pointer' }} onClick={()=>setDiamond(!diamond)}>
            <span style={{ fontSize:'9px', ...UB, color:C.muted, textTransform:'uppercase' as const, letterSpacing:'0.12em' }}>SHOW SOUKNI DIAMOND VERIFIED FIRST</span>
            <div style={{ width:'48px', height:'24px', borderRadius:'100px', backgroundColor:diamond?C.mint:'rgba(107,122,118,0.25)', position:'relative', transition:'background 0.25s', flexShrink:0 }}>
              <div style={{ position:'absolute', top:'3px', left:diamond?'27px':'3px', width:'18px', height:'18px', borderRadius:'50%', backgroundColor:C.ink, transition:'left 0.25s' }} />
            </div>
          </div>
        </div>

        {/* ── TOP CHOICES ROW 1 ── */}
        <div style={{ marginBottom:'24px' }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'20px' }}>
            <h3 style={{ fontSize:'clamp(16px,2vw,20px)', ...UB, color:C.ink, textTransform:'uppercase' as const }}>SouKni Top Choices</h3>
            <span style={{ fontSize:'9px', ...UB, color:C.muted, textTransform:'uppercase' as const, letterSpacing:'0.12em' }}>New Arrivals · Price Dropping</span>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'20px' }}>
            {topChoices.map((j,i)=><TopCard key={i} {...j} />)}
          </div>
        </div>

        {/* ── TOP CHOICES ROW 2 ── */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'20px', marginBottom:'64px' }}>
          {topRow2.map((j,i)=><TopCard key={i} {...j} />)}
        </div>

        {/* ── JOBS EXPO PRO BANNER ── */}
        <div style={{ position:'relative', borderRadius:'40px', overflow:'hidden', height:'360px', display:'flex', alignItems:'center', boxShadow:'0 24px 64px rgba(0,0,0,0.18)', marginBottom:'64px', cursor:'pointer' }}>
          <img src={IMG.expo} alt="Jobs Expo Pro" style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover', transition:'transform 0.7s' }}
            onMouseEnter={e=>e.currentTarget.style.transform='scale(1.04)'}
            onMouseLeave={e=>e.currentTarget.style.transform='scale(1)'}
          />
          <div style={{ position:'absolute', inset:0, backgroundColor:'rgba(22,29,27,0.6)' }} />
          <div style={{ position:'relative', zIndex:1, padding:'0 64px', maxWidth:'600px' }}>
            <div style={{ backgroundColor:C.mint, color:C.ink, fontSize:'9px', ...UB, padding:'5px 14px', borderRadius:'6px', textTransform:'uppercase' as const, letterSpacing:'0.12em', display:'inline-block', marginBottom:'18px' }}>SOUKNI JOBS EXPO PRO</div>
            <h2 style={{ fontSize:'clamp(28px,3.5vw,44px)', ...UB, color:'white', marginBottom:'16px', lineHeight:1.05 }}>Connect with Morocco's Top Finance Talent</h2>
            <p style={{ fontSize:'17px', color:'rgba(255,255,255,0.82)', marginBottom:'28px', lineHeight:1.55 }}>Elevate your executive recruitment. Connect with thousands of high-calibre finance professionals today.</p>
            <button style={{ backgroundColor:C.mint, color:C.ink, border:'none', padding:'16px 40px', borderRadius:'100px', fontSize:'10px', ...UB, textTransform:'uppercase' as const, letterSpacing:'0.12em', cursor:'pointer', transition:'transform 0.2s', boxShadow:`0 8px 24px ${C.mint}40` }}
              onMouseEnter={e=>e.currentTarget.style.transform='scale(1.04)'}
              onMouseLeave={e=>e.currentTarget.style.transform='scale(1)'}
            >BROWSE PREMIUM ROLES</button>
          </div>
        </div>

        {/* ── PROFESSIONAL DISCOVERY GRID ── */}
        <div style={{ marginBottom:'20px' }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'24px' }}>
            <h3 style={{ fontSize:'clamp(16px,2vw,20px)', ...UB, color:C.ink, textTransform:'uppercase' as const }}>Professional Finance Discoveries</h3>
            <div style={{ display:'flex', alignItems:'center', gap:'8px', fontSize:'9px', ...UB, color:C.muted }}>
              SORT BY:
              <select style={{ background:'transparent', border:'none', outline:'none', color:C.mint, fontWeight:900, fontSize:'9px', cursor:'pointer', fontFamily:'Inter,sans-serif', letterSpacing:'-0.05em' }}>
                <option>Recently Added</option>
                <option>Salary: High to Low</option>
                <option>Salary: Low to High</option>
              </select>
            </div>
          </div>
        </div>

        {/* Grid rows with interstitial banners */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'16px', marginBottom:'16px' }}>
          {gridItems.slice(0,4).map((j,i)=><JobCard key={i} {...j} />)}
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'16px', marginBottom:'16px' }}>
          {gridItems.slice(4,8).map((j,i)=><JobCard key={i} {...j} />)}
        </div>

        {/* Immo Pro + Show Portfolio interstitials */}
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'16px', marginBottom:'16px' }}>
          <div style={{ position:'relative', borderRadius:'28px', overflow:'hidden', height:'240px', cursor:'pointer' }}>
            <img src={IMG.immo} alt="Immo Pro" style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover' }} />
            <div style={{ position:'absolute', inset:0, backgroundColor:'rgba(0,107,95,0.75)' }} />
            <div style={{ position:'relative', zIndex:1, padding:'32px 36px', height:'100%', display:'flex', flexDirection:'column' as const, justifyContent:'center' }}>
              <p style={{ fontSize:'9px', ...UB, color:C.mint, textTransform:'uppercase' as const, letterSpacing:'0.15em', marginBottom:'10px' }}>SOUKNI IMMO PRO</p>
              <h4 style={{ fontSize:'22px', ...UB, color:'white', marginBottom:'10px', lineHeight:1.1 }}>Accounting & Finance Jobs in Rabat</h4>
              <p style={{ fontSize:'14px', color:'rgba(255,255,255,0.75)', marginBottom:'18px' }}>The premier destination for finance careers and corporate placements.</p>
              <button style={{ backgroundColor:C.mint, color:C.ink, border:'none', padding:'10px 24px', borderRadius:'100px', fontSize:'9px', ...UB, textTransform:'uppercase' as const, letterSpacing:'0.1em', cursor:'pointer', width:'fit-content' }}>Register Now</button>
            </div>
          </div>
          <div style={{ position:'relative', borderRadius:'28px', overflow:'hidden', height:'240px', cursor:'pointer' }}>
            <img src={IMG.port} alt="Portfolio" style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover' }} />
            <div style={{ position:'absolute', inset:0, backgroundColor:'rgba(22,29,27,0.65)' }} />
            <div style={{ position:'relative', zIndex:1, padding:'32px 36px', height:'100%', display:'flex', flexDirection:'column' as const, justifyContent:'center' }}>
              <p style={{ fontSize:'9px', ...UB, color:C.mint, textTransform:'uppercase' as const, letterSpacing:'0.15em', marginBottom:'10px' }}>SOUKNI AUTO PRO</p>
              <h4 style={{ fontSize:'22px', ...UB, color:'white', marginBottom:'10px', lineHeight:1.1 }}>Luxury Portfolio Finance Tools</h4>
              <p style={{ fontSize:'14px', color:'rgba(255,255,255,0.75)', marginBottom:'18px' }}>Learn about our premium tools for finance professionals.</p>
              <button style={{ backgroundColor:'white', color:C.ink, border:'none', padding:'10px 24px', borderRadius:'100px', fontSize:'9px', ...UB, textTransform:'uppercase' as const, letterSpacing:'0.1em', cursor:'pointer', width:'fit-content' }}>Browse Premium Fleet</button>
            </div>
          </div>
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'16px', marginBottom:'16px' }}>
          {gridItems.slice(8,12).map((j,i)=><JobCard key={i} {...j} />)}
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'16px', marginBottom:'16px' }}>
          {gridItems.slice(12,16).map((j,i)=><JobCard key={i} {...j} />)}
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'16px', marginBottom:'64px' }}>
          {gridItems.slice(16,20).map((j,i)=><JobCard key={i} {...j} />)}
        </div>

        {/* ── PAGINATION ── */}
        <div style={{ display:'flex', justifyContent:'center', alignItems:'center', gap:'10px', marginBottom:'80px' }}>
          <button style={{ width:'44px', height:'44px', borderRadius:'12px', backgroundColor:'white', border:'1px solid rgba(107,122,118,0.12)', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', color:C.muted, transition:'all 0.2s' }}
            onMouseEnter={e=>{e.currentTarget.style.backgroundColor=C.mint;e.currentTarget.style.color=C.ink}}
            onMouseLeave={e=>{e.currentTarget.style.backgroundColor='white';e.currentTarget.style.color=C.muted}}
          ><ChevronLeft size={18} /></button>
          {[1,2,3,4].map(p=>(
            <button key={p} onClick={()=>setPage(p)}
              style={{ width:'44px', height:'44px', borderRadius:'12px', cursor:'pointer', fontSize:'15px', ...UB, border:'1px solid', transition:'all 0.2s',
                backgroundColor: page===p ? C.mint : 'white',
                color:           page===p ? C.ink  : C.muted,
                borderColor:     page===p ? C.mint : 'rgba(107,122,118,0.12)',
              }}
            >{p}</button>
          ))}
          <span style={{ color:C.muted }}>…</span>
          <button style={{ width:'44px', height:'44px', borderRadius:'12px', backgroundColor:'white', border:'1px solid rgba(107,122,118,0.12)', cursor:'pointer', fontSize:'15px', ...UB, color:C.muted }}>10</button>
          <button style={{ width:'44px', height:'44px', borderRadius:'12px', backgroundColor:'white', border:'1px solid rgba(107,122,118,0.12)', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', color:C.muted, transition:'all 0.2s' }}
            onMouseEnter={e=>{e.currentTarget.style.backgroundColor=C.mint;e.currentTarget.style.color=C.ink}}
            onMouseLeave={e=>{e.currentTarget.style.backgroundColor='white';e.currentTarget.style.color=C.muted}}
          ><ChevronRight size={18} /></button>
        </div>

        {/* ── JOIN SOUKNI FAMILY ── */}
        <div style={{ backgroundColor:C.mint, borderRadius:'40px', padding:'56px 64px', display:'flex', alignItems:'center', justifyContent:'space-between', gap:'48px', position:'relative' as const, overflow:'hidden', flexWrap:'wrap' as const, boxShadow:`0 16px 48px ${C.mint}40` }}>
          <div style={{ position:'absolute', right:'-60px', bottom:'-60px', width:'300px', height:'300px', backgroundColor:'rgba(22,29,27,0.08)', borderRadius:'50%' }} />
          <div style={{ position:'relative', zIndex:1, maxWidth:'520px' }}>
            <h2 style={{ fontSize:'clamp(26px,3.5vw,38px)', ...UB, color:C.ink, marginBottom:'14px', lineHeight:1.05 }}>JOIN THE SOUKNI FAMILY</h2>
            <p style={{ fontSize:'16px', color:`${C.ink}b3`, marginBottom:'32px', lineHeight:1.6 }}>Download our premium marketplace for real-time finance job alerts and exclusive career opportunities.</p>
            <div style={{ display:'flex', gap:'14px', flexWrap:'wrap' as const }}>
              {['App Store','Google Play'].map(app=>(
                <button key={app} style={{ height:'52px', minWidth:'160px', backgroundColor:C.ink, color:'white', border:'none', borderRadius:'14px', fontSize:'10px', ...UB, textTransform:'uppercase' as const, letterSpacing:'0.1em', cursor:'pointer', transition:'transform 0.15s' }}
                  onMouseEnter={e=>e.currentTarget.style.transform='scale(1.04)'}
                  onMouseLeave={e=>e.currentTarget.style.transform='scale(1)'}
                >{app === 'App Store' ? '📱' : '▶'} {app}</button>
              ))}
            </div>
          </div>
          <div style={{ position:'relative', zIndex:1, width:'200px', aspectRatio:'9/17' as const, backgroundColor:C.ink, borderRadius:'40px', border:'6px solid rgba(255,255,255,0.2)', overflow:'hidden', boxShadow:'0 32px 80px rgba(0,0,0,0.28)', flexShrink:0 }}>
            <img src={IMG.phone} alt="App" style={{ width:'100%', height:'100%', objectFit:'cover', opacity:0.7 }} />
          </div>
        </div>
      </main>

      {/* ── FOOTER ── */}
      <footer style={{ backgroundColor:C.ink, color:'white', padding:'80px 24px 48px' }}>
        <div style={{ maxWidth:'1280px', margin:'0 auto' }}>
          <div style={{ display:'grid', gridTemplateColumns:'1.6fr 1fr 1fr 1fr 1fr', gap:'40px', marginBottom:'64px' }}>
            <div>
              <div style={{ fontSize:'28px', ...UB, color:C.mint, marginBottom:'18px' }}>SouKni</div>
              <p style={{ fontSize:'9px', ...UB, color:C.muted, textTransform:'uppercase' as const, letterSpacing:'0.1em', lineHeight:1.9, maxWidth:'240px', marginBottom:'24px', opacity:0.75 }}>The Market in your Pocket</p>
              <div style={{ display:'flex', gap:'10px' }}>
                {['FB','IG','X'].map(s=>(
                  <div key={s} style={{ width:'36px', height:'36px', borderRadius:'50%', backgroundColor:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.1)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'9px', ...UB, color:C.muted, cursor:'pointer', transition:'all 0.2s' }}
                    onMouseEnter={e=>{(e.currentTarget as HTMLDivElement).style.backgroundColor=C.mint;(e.currentTarget as HTMLDivElement).style.color=C.ink}}
                    onMouseLeave={e=>{(e.currentTarget as HTMLDivElement).style.backgroundColor='rgba(255,255,255,0.06)';(e.currentTarget as HTMLDivElement).style.color=C.muted}}
                  >{s}</div>
                ))}
              </div>
            </div>
            {[
              { title:'MARKETPLACE', links:['Real Estate','Motors','Jobs','Services','The Vault'] },
              { title:'COMPANY',     links:['About Us','Careers','Legal','Privacy'] },
              { title:'SUPPORT',     links:['Help Center','Safety Tips','Advertising'] },
              { title:'APP DOWNLOADS', links:['App Store','Google Play'] },
            ].map(col=>(
              <div key={col.title}>
                <h5 style={{ fontSize:'9px', ...UB, color:C.mint, textTransform:'uppercase' as const, letterSpacing:'0.15em', marginBottom:'24px' }}>{col.title}</h5>
                {col.links.map(link=>(
                  <a key={link} href="#" style={{ display:'block', fontSize:'9px', ...UB, color:C.muted, textTransform:'uppercase' as const, letterSpacing:'0.1em', textDecoration:'none', marginBottom:'14px', transition:'color 0.15s' }}
                    onMouseEnter={e=>e.currentTarget.style.color=C.mint}
                    onMouseLeave={e=>e.currentTarget.style.color=C.muted}
                  >{link}</a>
                ))}
              </div>
            ))}
          </div>
          <div style={{ borderTop:'1px solid rgba(255,255,255,0.06)', paddingTop:'28px', textAlign:'center' as const, fontSize:'9px', ...UB, color:C.muted, textTransform:'uppercase' as const, letterSpacing:'0.22em', opacity:0.35 }}>
            © 2026 SOUKNI MOROCCO — ALL RIGHTS RESERVED
          </div>
        </div>
      </footer>
    </div>
  )
}
