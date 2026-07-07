'use client'

import { useState } from 'react'
import React from 'react'
import Link from 'next/link'
import { useMarket } from '@/context/MarketContext'
import { Search, Heart, MessageCircle, ChevronDown } from 'lucide-react'

/* ─── DATA ─────────────────────────────────────────────── */
const categoryPills = ['All Roles','Security Guard','Bodyguard','CCTV Monitoring','Security Manager','Consultancy','Event Security']

type BadgeType = 'diamond' | 'verified'

interface Job {
  id: string; badge: BadgeType; category: string; categoryColor: string
  title: string; company: string; companyIcon: string
  salary: number; salaryLabel: string; salaryExtra?: string
  image?: string; hasChat?: boolean; description?: string
}

const IMGS = [
  'https://images.pexels.com/photos/5935794/pexels-photo-5935794.jpeg?auto=compress&w=600',
  'https://images.pexels.com/photos/8112172/pexels-photo-8112172.jpeg?auto=compress&w=600',
  'https://images.pexels.com/photos/4427624/pexels-photo-4427624.jpeg?auto=compress&w=600',
  'https://images.pexels.com/photos/3862132/pexels-photo-3862132.jpeg?auto=compress&w=600',
]

const allJobs: Job[] = [
  // Row 1-2 (with images)
  { id:'j1', badge:'diamond', category:'Supervision', categoryColor:'#2dd4bf', title:'Site Security Supervisor - Technopolis Rabat', company:'Global Guarding Services', companyIcon:'🏢', salary:12500, salaryLabel:'MONTHLY MAD', image:IMGS[0], hasChat:true },
  { id:'j2', badge:'verified', category:'Close Protection', categoryColor:'#8d4f00', title:'Executive Protection Specialist - Diplomatic Corps', company:'Shield Elite Security', companyIcon:'🛡', salary:28000, salaryLabel:'SALARY MAD', image:IMGS[1] },
  { id:'j3', badge:'diamond', category:'Executive Management', categoryColor:'#605e58', title:'Regional Security Director - North Africa', company:'Atlas Corp Intl', companyIcon:'🌍', salary:45000, salaryLabel:'MONTHLY MAD', image:IMGS[2] },
  { id:'j4', badge:'verified', category:'Surveillance', categoryColor:'#2dd4bf', title:'Senior CCTV Monitoring Specialist - Mall Hub', company:'Rabat Mall Group', companyIcon:'👁', salary:9500, salaryLabel:'SALARY MAD', image:IMGS[3] },
  // Row 2 (text cards)
  { id:'j5', badge:'verified', category:'Guard Force', categoryColor:'#2dd4bf', title:'Night Shift Security Guard - Hay Riad District', company:'ProGuard Morocco', companyIcon:'🌙', salary:6500, salaryLabel:'MAD', description:'Professional guard required for premium residential complex. Bilingual (Arabic/French) preferred.' },
  { id:'j6', badge:'diamond', category:'Event Security', categoryColor:'#8d4f00', title:'Crowd Control Team Lead - Festival Season', company:'EventSec Rabat', companyIcon:'🎪', salary:15000, salaryLabel:'MAD', description:'Leading security for major music festivals in Rabat. High energy role with competitive rates.' },
  { id:'j7', badge:'verified', category:'Risk Assessment', categoryColor:'#605e58', title:'Corporate Security Consultant - Banking Sector', company:'RiskPro Morocco', companyIcon:'🏦', salary:35000, salaryLabel:'MAD', description:'Conducting full audits of physical security infrastructure for national banks.' },
  { id:'j8', badge:'verified', category:'Technical', categoryColor:'#2dd4bf', title:'Security Systems Technician - Access Control', company:'TechSec Solutions', companyIcon:'🔧', salary:11000, salaryLabel:'MAD', description:'Maintenance and installation of modern biometric systems and alarms.' },
  // Grid 2 (rows 3-4)
  { id:'j9',  badge:'verified', category:'Guard Force', categoryColor:'#2dd4bf', title:'Residential Guard - Souissi Luxury Riad', company:'LuxGuard', companyIcon:'🏰', salary:7200, salaryLabel:'MAD' },
  { id:'j10', badge:'diamond', category:'Management', categoryColor:'#8d4f00', title:'Security Operations Center Lead', company:'OpsSec Rabat', companyIcon:'📡', salary:18500, salaryLabel:'MAD' },
  { id:'j11', badge:'verified', category:'Asset Protection', categoryColor:'#605e58', title:'Loss Prevention Manager', company:'RetailSafe Morocco', companyIcon:'🔒', salary:14000, salaryLabel:'MAD' },
  { id:'j12', badge:'verified', category:'Guard Force', categoryColor:'#2dd4bf', title:'K9 Security Handler - Airport Zone', company:'AirSec Rabat', companyIcon:'🐕', salary:10500, salaryLabel:'MAD' },
  { id:'j13', badge:'diamond', category:'Bodyguard', categoryColor:'#8d4f00', title:'Female Protection Detail for VIP Clients', company:'EliteShield', companyIcon:'👮', salary:22000, salaryLabel:'MAD' },
  { id:'j14', badge:'verified', category:'CCTV', categoryColor:'#605e58', title:'Night Surveillance Operator', company:'VisionSec Morocco', companyIcon:'📷', salary:8800, salaryLabel:'MAD' },
  { id:'j15', badge:'verified', category:'Audit', categoryColor:'#2dd4bf', title:'Fire & Safety Security Officer', company:'SafetyFirst Rabat', companyIcon:'🚒', salary:9500, salaryLabel:'MAD' },
  { id:'j16', badge:'diamond', category:'Security Manager', categoryColor:'#8d4f00', title:'Chief Security Officer - Rabat Agdal', company:'CSO Partners', companyIcon:'⭐', salary:32000, salaryLabel:'MAD' },
  // Grid 3 (rows 5-6)
  { id:'j17', badge:'verified', category:'Guard Force', categoryColor:'#2dd4bf', title:'Retail Security Officer - Agdal Boutique', company:'RetailGuard', companyIcon:'🛍', salary:6200, salaryLabel:'MAD' },
  { id:'j18', badge:'verified', category:'Event', categoryColor:'#8d4f00', title:'Concert Security Crew - Rabat Coast', company:'EventForce', companyIcon:'🎵', salary:12000, salaryLabel:'MAD' },
  { id:'j19', badge:'diamond', category:'CCTV', categoryColor:'#605e58', title:'Head of Surveillance Center', company:'SurveillancePro', companyIcon:'🖥', salary:16000, salaryLabel:'MAD' },
  { id:'j20', badge:'verified', category:'Transport', categoryColor:'#2dd4bf', title:'Cash-in-Transit Armed Guard', company:'SecureTrans Morocco', companyIcon:'🚐', salary:13500, salaryLabel:'MAD' },
  { id:'j21', badge:'verified', category:'Cyber', categoryColor:'#8d4f00', title:'Information Security Coordinator', company:'CyberSec Rabat', companyIcon:'💻', salary:25000, salaryLabel:'MAD' },
  { id:'j22', badge:'diamond', category:'Director', categoryColor:'#605e58', title:'Global Head of Asset Security', company:'AssetGuard International', companyIcon:'🌐', salary:60000, salaryLabel:'MAD' },
  { id:'j23', badge:'verified', category:'Guard', categoryColor:'#2dd4bf', title:'Patrol Officer - Rabat Tech Park', company:'TechPark Security', companyIcon:'🚶', salary:6800, salaryLabel:'MAD' },
  { id:'j24', badge:'verified', category:'Events', categoryColor:'#8d4f00', title:'VIP Liaison & Security Host', company:'VIPSec Morocco', companyIcon:'🎖', salary:11500, salaryLabel:'MAD' },
  // Grid 4 (rows 7-8)
  { id:'j25', badge:'verified', category:'Guard Force', categoryColor:'#2dd4bf', title:'Warehouse Night Guard - Sale Zone', company:'WareGuard', companyIcon:'🏭', salary:6000, salaryLabel:'MAD' },
  { id:'j26', badge:'verified', category:'Consulting', categoryColor:'#8d4f00', title:'Security Infrastructure Advisor', company:'InfraSec Consulting', companyIcon:'📐', salary:28000, salaryLabel:'MAD' },
  { id:'j27', badge:'diamond', category:'Monitoring', categoryColor:'#605e58', title:'CCTV Analytics Lead', company:'AnalyticSec', companyIcon:'📊', salary:15500, salaryLabel:'MAD' },
  { id:'j28', badge:'verified', category:'Guard Force', categoryColor:'#2dd4bf', title:'Armed Security Officer - Banking HQ', company:'BankGuard Rabat', companyIcon:'🏛', salary:12500, salaryLabel:'MAD' },
  { id:'j29', badge:'verified', category:'Trainer', categoryColor:'#8d4f00', title:'Head of Guard Training Center', company:'SecureAcademy Morocco', companyIcon:'🎓', salary:20000, salaryLabel:'MAD' },
  { id:'j30', badge:'diamond', category:'Crisis', categoryColor:'#605e58', title:'Crisis Response Specialist', company:'CrisisShield', companyIcon:'🚨', salary:24500, salaryLabel:'MAD' },
  { id:'j31', badge:'verified', category:'Technical', categoryColor:'#2dd4bf', title:'Lead CCTV Engineer', company:'TechSec Labs', companyIcon:'🔭', salary:14200, salaryLabel:'MAD' },
  { id:'j32', badge:'verified', category:'Patrol', categoryColor:'#8d4f00', title:'Mobile Patrol Unit - Rabat North', company:'PatrolPro Morocco', companyIcon:'🚔', salary:7800, salaryLabel:'MAD' },
]

/* ─── CARD (with image) ───────────────────────────────────── */
function JobCardImage({ job }: { job: Job }) {
  const [saved, setSaved] = useState(false)
  const [hovered, setHovered] = useState(false)
  const { formatPrice } = useMarket()

  return (
    <article onMouseEnter={()=>setHovered(true)} onMouseLeave={()=>setHovered(false)}
      style={{ backgroundColor:'white', borderRadius:'40px', overflow:'hidden', border:'1px solid rgba(186,202,197,0.15)',
        boxShadow: hovered ? '0 20px 40px rgba(0,0,0,0.1)' : '0 2px 8px rgba(0,0,0,0.04)',
        transition:'all 0.3s', cursor:'pointer', display:'flex', flexDirection:'column' as const }}>
      <div style={{ position:'relative', height:'200px', overflow:'hidden' }}>
        <img src={job.image} alt={job.title}
          style={{ width:'100%', height:'100%', objectFit:'cover', transition:'transform 0.5s', transform: hovered ? 'scale(1.05)' : 'scale(1)' }}
        />
        <div style={{ position:'absolute', top:'14px', left:'14px' }}>
          {job.badge === 'diamond'
            ? <span style={{ background:'linear-gradient(135deg,#2dd4bf,#2dd4bf)', color:'white', fontSize:'9px', fontWeight:900, padding:'4px 8px', borderRadius:'6px', textTransform:'uppercase' as const, letterSpacing:'0.06em', boxShadow:'0 4px 12px rgba(45,212,191,0.35)' }}>Diamond Partner</span>
            : <span style={{ backgroundColor:'rgba(221,228,225,0.9)', color:'#3c4a46', fontSize:'9px', fontWeight:700, padding:'4px 8px', borderRadius:'6px', textTransform:'uppercase' as const, letterSpacing:'0.06em' }}>Verified</span>
          }
        </div>
        <button onClick={e=>{e.stopPropagation();setSaved(!saved)}}
          style={{ position:'absolute', top:'12px', right:'12px', width:'32px', height:'32px', borderRadius:'50%', backgroundColor:'rgba(0,0,0,0.2)', backdropFilter:'blur(8px)', border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}>
          <Heart size={15} fill={saved?'#ef4444':'none'} color="white" />
        </button>
      </div>
      <div style={{ padding:'20px', flex:1, display:'flex', flexDirection:'column' as const }}>
        <span style={{ fontSize:'11px', fontWeight:700, color:job.categoryColor, textTransform:'uppercase' as const, letterSpacing:'0.1em' }}>{job.category}</span>
        <h3 style={{ fontSize:'16px', fontWeight:700, color:'#161d1b', margin:'6px 0 10px', lineHeight:1.35, display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical' as const, overflow:'hidden', minHeight:'44px' }}>{job.title}</h3>
        <div style={{ display:'flex', alignItems:'center', gap:'6px', color:'#6b7a76', marginBottom:'14px', fontSize:'13px' }}>
          <span>{job.companyIcon}</span><span style={{ fontWeight:500 }}>{job.company}</span>
        </div>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', borderTop:'1px solid rgba(186,202,197,0.2)', paddingTop:'14px', marginTop:'auto' }}>
          <div>
            <div style={{ fontSize:'9px', fontWeight:700, color:'#6b7a76', textTransform:'uppercase' as const, letterSpacing:'0.12em', marginBottom:'2px' }}>{job.salaryLabel}</div>
            <div style={{ fontSize:'22px', fontWeight:900, color: job.salary>=20000?'#2dd4bf':'#161d1b', letterSpacing:'-0.02em', lineHeight:1 }}>
              {job.salary.toLocaleString()}{job.salaryExtra && <span style={{ fontSize:'13px', fontWeight:400, color:'#6b7a76', marginLeft:'3px' }}>{job.salaryExtra}</span>}
            </div>
          </div>
          <div style={{ display:'flex', gap:'8px' }}>
            {job.hasChat && (
              <button style={{ width:'38px', height:'38px', borderRadius:'50%', border:'1px solid #2dd4bf', backgroundColor:'transparent', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', color:'#2dd4bf', transition:'all 0.15s' }}
                onMouseEnter={e=>e.currentTarget.style.backgroundColor='rgba(0,107,95,0.06)'}
                onMouseLeave={e=>e.currentTarget.style.backgroundColor='transparent'}
              ><MessageCircle size={16} /></button>
            )}
            <button style={{ backgroundColor:'#2dd4bf', color:'#0f9b8e', border:'none', padding:'10px 18px', borderRadius:'100px', fontSize:'12px', fontWeight:700, cursor:'pointer', transition:'filter 0.15s' }}
              onMouseEnter={e=>e.currentTarget.style.filter='brightness(1.08)'}
              onMouseLeave={e=>e.currentTarget.style.filter='brightness(1)'}
            >Apply Now</button>
          </div>
        </div>
      </div>
    </article>
  )
}

/* ─── CARD (text only) ───────────────────────────────────── */
function JobCardText({ job }: { job: Job }) {
  const [saved, setSaved] = useState(false)
  const [hovered, setHovered] = useState(false)
  const { formatPrice } = useMarket()

  return (
    <article onMouseEnter={()=>setHovered(true)} onMouseLeave={()=>setHovered(false)}
      style={{ backgroundColor:'white', borderRadius:'40px', overflow:'hidden', border:'1px solid rgba(186,202,197,0.15)', padding:'24px',
        boxShadow: hovered ? '0 20px 40px rgba(0,0,0,0.08)' : '0 2px 8px rgba(0,0,0,0.04)',
        transition:'all 0.3s', cursor:'pointer', display:'flex', flexDirection:'column' as const, minHeight:'300px' }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'14px' }}>
        {job.badge === 'diamond'
          ? <span style={{ background:'linear-gradient(135deg,#2dd4bf,#2dd4bf)', color:'white', fontSize:'9px', fontWeight:900, padding:'4px 8px', borderRadius:'6px', textTransform:'uppercase' as const, letterSpacing:'0.06em' }}>Diamond Partner</span>
          : <span style={{ backgroundColor:'#dde4e1', color:'#3c4a46', fontSize:'9px', fontWeight:700, padding:'4px 8px', borderRadius:'6px', textTransform:'uppercase' as const }}>Verified</span>
        }
        <button onClick={e=>{e.stopPropagation();setSaved(!saved)}}
          style={{ background:'none', border:'none', cursor:'pointer', color: saved?'#ef4444':'#6b7a76' }}>
          <Heart size={18} fill={saved?'#ef4444':'none'} />
        </button>
      </div>
      <span style={{ fontSize:'11px', fontWeight:700, color:job.categoryColor, textTransform:'uppercase' as const, letterSpacing:'0.1em' }}>{job.category}</span>
      <h3 style={{ fontSize:'16px', fontWeight:700, color:'#161d1b', margin:'6px 0 10px', lineHeight:1.35, display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical' as const, overflow:'hidden' }}>{job.title}</h3>
      {job.description && <p style={{ fontSize:'14px', color:'#6b7a76', lineHeight:1.6, display:'-webkit-box', WebkitLineClamp:3, WebkitBoxOrient:'vertical' as const, overflow:'hidden', marginBottom:'12px', flex:1 }}>{job.description}</p>}
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', borderTop:'1px solid rgba(186,202,197,0.2)', paddingTop:'14px', marginTop:'auto' }}>
        <div>
          <div style={{ fontSize:'9px', fontWeight:700, color:'#6b7a76', textTransform:'uppercase' as const, letterSpacing:'0.12em', marginBottom:'2px' }}>{job.salaryLabel}</div>
          <div style={{ fontSize:'20px', fontWeight:900, color: job.salary>=20000?'#2dd4bf':'#161d1b', letterSpacing:'-0.02em', lineHeight:1 }}>{job.salary.toLocaleString()}</div>
        </div>
        <button style={{ backgroundColor:'#2dd4bf', color:'#0f9b8e', border:'none', padding:'10px 20px', borderRadius:'100px', fontSize:'12px', fontWeight:700, cursor:'pointer', transition:'filter 0.15s' }}
          onMouseEnter={e=>e.currentTarget.style.filter='brightness(1.08)'}
          onMouseLeave={e=>e.currentTarget.style.filter='brightness(1)'}
        >Apply Now</button>
      </div>
    </article>
  )
}

/* ─── MINIMAL CARD (rows 3-8) ────────────────────────────── */
function JobCardMinimal({ job }: { job: Job }) {
  const [hovered, setHovered] = useState(false)

  return (
    <article onMouseEnter={()=>setHovered(true)} onMouseLeave={()=>setHovered(false)}
      style={{ backgroundColor:'white', borderRadius:'40px', border:'1px solid rgba(186,202,197,0.15)', padding:'24px',
        boxShadow: hovered ? '0 20px 40px rgba(0,0,0,0.08)' : '0 2px 8px rgba(0,0,0,0.04)',
        transition:'all 0.3s', cursor:'pointer', display:'flex', flexDirection:'column' as const, minHeight:'300px' }}>
      <div style={{ marginBottom:'14px' }}>
        {job.badge === 'diamond'
          ? <span style={{ background:'linear-gradient(135deg,#2dd4bf,#2dd4bf)', color:'white', fontSize:'9px', fontWeight:900, padding:'4px 8px', borderRadius:'6px', textTransform:'uppercase' as const, letterSpacing:'0.06em' }}>Diamond Partner</span>
          : <span style={{ backgroundColor:'#dde4e1', color:'#3c4a46', fontSize:'9px', fontWeight:700, padding:'4px 8px', borderRadius:'6px', textTransform:'uppercase' as const }}>Verified</span>
        }
      </div>
      <span style={{ fontSize:'11px', fontWeight:700, color:job.categoryColor, textTransform:'uppercase' as const, letterSpacing:'0.1em' }}>{job.category}</span>
      <h3 style={{ fontSize:'16px', fontWeight:700, color:'#161d1b', margin:'6px 0', lineHeight:1.35, flex:1 }}>{job.title}</h3>
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', borderTop:'1px solid rgba(186,202,197,0.2)', paddingTop:'14px', marginTop:'auto' }}>
        <div>
          <div style={{ fontSize:'9px', fontWeight:700, color:'#6b7a76', textTransform:'uppercase' as const, letterSpacing:'0.12em', marginBottom:'2px' }}>MAD</div>
          <div style={{ fontSize:'22px', fontWeight:900, color: job.salary>=20000?'#2dd4bf':'#161d1b', letterSpacing:'-0.02em' }}>{job.salary.toLocaleString()}</div>
        </div>
        <button style={{ backgroundColor:'#2dd4bf', color:'#0f9b8e', border:'none', padding:'8px 16px', borderRadius:'100px', fontSize:'12px', fontWeight:700, cursor:'pointer', transition:'filter 0.15s' }}
          onMouseEnter={e=>e.currentTarget.style.filter='brightness(1.08)'}
          onMouseLeave={e=>e.currentTarget.style.filter='brightness(1)'}
        >Apply</button>
      </div>
    </article>
  )
}

/* ─── PAGE ───────────────────────────────────────────────── */
export default function SecurityJobsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = React.use(params)
  const [activePill, setActivePill] = useState('All Roles')
  const [keyword, setKeyword] = useState('')
  const [diamondOnly, setDiamondOnly] = useState(true)

  return (
    <div style={{ fontFamily:'Inter,system-ui,sans-serif', backgroundColor:'#f4fbf8', minHeight:'100vh' }}>

      {/* ── HERO ── */}
      <section style={{ position:'relative', height:'480px', display:'flex', alignItems:'center', justifyContent:'center', overflow:'hidden' }}>
        <img src="https://images.pexels.com/photos/5935794/pexels-photo-5935794.jpeg?auto=compress&w=1600" alt="Security Jobs Hero"
          style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover' }}
        />
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(180deg, rgba(22,29,27,0.45) 0%, rgba(22,29,27,0.15) 60%, #f4fbf8 100%)' }} />
        <div style={{ position:'relative', zIndex:10, width:'100%', maxWidth:'860px', padding:'80px 24px 0', textAlign:'center' }}>
          <h1 style={{ fontSize:'48px', fontWeight:800, color:'white', marginBottom:'24px', letterSpacing:'-0.02em', lineHeight:1.1, textShadow:'0 4px 20px rgba(0,0,0,0.3)' }}>
            Secure Your Future in Rabat's Leading Organizations
          </h1>
          <div style={{ backgroundColor:'rgba(255,255,255,0.65)', backdropFilter:'blur(20px)', border:'1px solid rgba(255,255,255,0.4)', borderRadius:'100px', padding:'8px 8px 8px 0', display:'flex', alignItems:'center', boxShadow:'0 20px 60px rgba(0,0,0,0.12)' }}>
            <div style={{ flex:1, display:'flex', alignItems:'center', gap:'10px', padding:'10px 20px', borderRight:'1px solid rgba(186,202,197,0.3)' }}>
              <Search size={20} color="#2dd4bf" />
              <input type="text" value={keyword} onChange={e=>setKeyword(e.target.value)}
                placeholder="Security Manager, Protection Specialist, CCTV Operator..."
                style={{ flex:1, backgroundColor:'transparent', border:'none', outline:'none', fontSize:'15px', fontFamily:'Inter,sans-serif', color:'#161d1b' }}
              />
            </div>
            <button style={{ backgroundColor:'#2dd4bf', color:'#0f9b8e', border:'none', padding:'13px 28px', borderRadius:'100px', fontWeight:700, fontSize:'13px', cursor:'pointer', margin:'0 4px', transition:'filter 0.15s' }}
              onMouseEnter={e=>e.currentTarget.style.filter='brightness(1.08)'}
              onMouseLeave={e=>e.currentTarget.style.filter='brightness(1)'}
            >Search Jobs</button>
          </div>
        </div>
      </section>

      {/* ── FILTER + PILLS ── */}
      <div style={{ maxWidth:'1440px', margin:'-48px auto 0', padding:'0 40px', position:'relative', zIndex:30 }}>
        {/* Filter bar */}
        <div style={{ backgroundColor:'rgba(255,255,255,0.68)', backdropFilter:'blur(20px)', border:'1px solid rgba(255,255,255,0.45)', borderRadius:'40px', padding:'20px 24px', boxShadow:'0 12px 40px rgba(0,0,0,0.08)', display:'flex', alignItems:'center', gap:'0', marginBottom:'24px', flexWrap:'wrap' as const }}>
          {[
            { label:'District', type:'select', opts:['All Rabat Districts','Hay Riad','Agdal','Souissi','Hassan'] },
            { label:'Compensation', type:'select', opts:['Any Salary','6,000-10,000 MAD','10,000-20,000 MAD','20,000+ MAD'] },
            { label:'Shift Type', type:'button', val:'Full-time' },
          ].map((f,i,arr)=>(
            <React.Fragment key={f.label}>
              <div style={{ flex:1, minWidth:'180px', padding:'0 16px', borderRight: i<arr.length-1?'1px solid rgba(186,202,197,0.25)':'none' }}>
                <div style={{ fontSize:'9px', fontWeight:700, textTransform:'uppercase' as const, letterSpacing:'0.12em', color:'#6b7a76', marginBottom:'4px' }}>{f.label}</div>
                {f.type==='select'
                  ? <select style={{ backgroundColor:'transparent', border:'none', outline:'none', fontSize:'14px', fontWeight:600, color:'#161d1b', fontFamily:'Inter,sans-serif', cursor:'pointer', width:'100%' }}>
                      {f.opts!.map(o=><option key={o}>{o}</option>)}
                    </select>
                  : <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', cursor:'pointer' }}>
                      <span style={{ fontSize:'14px', fontWeight:600, color:'#161d1b' }}>{f.val}</span>
                      <span style={{ fontSize:'18px' }}>🎚</span>
                    </div>
                }
              </div>
            </React.Fragment>
          ))}
          <div style={{ width:'1px', height:'40px', backgroundColor:'rgba(186,202,197,0.25)', margin:'0 8px', flexShrink:0 }} />
          <div style={{ display:'flex', alignItems:'center', gap:'10px', padding:'0 16px', cursor:'pointer' }} onClick={()=>setDiamondOnly(!diamondOnly)}>
            <span style={{ fontSize:'13px', fontWeight:600, color:'#3c4a46', whiteSpace:'nowrap' as const }}>Diamond Only</span>
            <div style={{ width:'44px', height:'24px', borderRadius:'100px', backgroundColor: diamondOnly?'#2dd4bf':'#dde4e1', position:'relative', transition:'background 0.25s', flexShrink:0 }}>
              <div style={{ position:'absolute', top:'2px', left: diamondOnly?'22px':'2px', width:'20px', height:'20px', borderRadius:'50%', backgroundColor:'white', boxShadow:'0 1px 4px rgba(0,0,0,0.2)', transition:'left 0.25s' }} />
            </div>
          </div>
        </div>
        {/* Pills + sort */}
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', overflowX:'auto' as const, gap:'12px', paddingBottom:'8px' }}>
          <div style={{ display:'flex', gap:'10px', flexShrink:0 }}>
            {categoryPills.map(pill=>(
              <button key={pill} onClick={()=>setActivePill(pill)}
                style={{ padding:'9px 20px', borderRadius:'100px', fontSize:'13px', fontWeight:700, border:'1px solid', cursor:'pointer', transition:'all 0.15s', whiteSpace:'nowrap' as const,
                  backgroundColor: activePill===pill?'#2dd4bf':'#eef5f2',
                  color: activePill===pill?'#0f9b8e':'#3c4a46',
                  borderColor: activePill===pill?'#2dd4bf':'rgba(186,202,197,0.25)',
                  boxShadow: activePill===pill?'0 4px 16px rgba(45,212,191,0.25)':'none',
                }}
              >{pill}</button>
            ))}
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:'6px', color:'#6b7a76', fontSize:'13px', flexShrink:0, cursor:'pointer', whiteSpace:'nowrap' as const }}>
            Sort: <span style={{ color:'#2dd4bf', fontWeight:700 }}>Featured First</span>
            <ChevronDown size={16} color="#2dd4bf" />
          </div>
        </div>
      </div>

      <main style={{ maxWidth:'1440px', margin:'0 auto', padding:'40px 40px 80px' }}>

        {/* ── GRID 1 — rows 1-2 (4 image cards + 4 text cards) ── */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'20px', marginBottom:'48px' }}>
          {allJobs.slice(0,4).map(job=><JobCardImage key={job.id} job={job} />)}
          {allJobs.slice(4,8).map(job=><JobCardText key={job.id} job={job} />)}
        </div>

        {/* ── DUAL BANNERS: Join Family + Immo Pro ── */}
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'20px', marginBottom:'48px' }}>
          {/* Join SouKni Family */}
          <div style={{ position:'relative', borderRadius:'40px', overflow:'hidden', backgroundColor:'#e8efec', padding:'48px', display:'flex', alignItems:'center', minHeight:'280px' }}>
            <div style={{ position:'absolute', right:'-40px', top:'50%', transform:'translateY(-50%)', width:'220px', height:'220px', backgroundColor:'rgba(0,107,95,0.08)', borderRadius:'50%', filter:'blur(40px)' }} />
            <div style={{ position:'relative', zIndex:1, maxWidth:'360px' }}>
              <h2 style={{ fontSize:'32px', fontWeight:800, color:'#161d1b', marginBottom:'12px', letterSpacing:'-0.02em', lineHeight:1.2 }}>Join the SouKni Family</h2>
              <p style={{ color:'#6b7a76', fontSize:'15px', marginBottom:'28px', lineHeight:1.6 }}>Download the app for real-time security alerts and direct messaging with hiring agencies.</p>
              <div style={{ display:'flex', gap:'12px' }}>
                {[{icon:'🍎',store:'App Store'},{icon:'▶',store:'Google Play'}].map(btn=>(
                  <button key={btn.store} style={{ backgroundColor:'#0f172a', color:'white', border:'none', padding:'10px 18px', borderRadius:'12px', display:'flex', alignItems:'center', gap:'8px', cursor:'pointer', fontSize:'13px', fontWeight:600 }}>
                    <span style={{ fontSize:'20px' }}>{btn.icon}</span>{btn.store}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* SouKni Immo Pro */}
          <div style={{ position:'relative', borderRadius:'40px', overflow:'hidden', minHeight:'280px' }}>
            <img src="https://images.pexels.com/photos/1732414/pexels-photo-1732414.jpeg?auto=compress&w=800" alt="Immo Pro"
              style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover', transition:'transform 0.7s' }}
              onMouseEnter={e=>e.currentTarget.style.transform='scale(1.05)'}
              onMouseLeave={e=>e.currentTarget.style.transform='scale(1)'}
            />
            <div style={{ position:'absolute', inset:0, backgroundColor:'rgba(0,0,0,0.5)' }} />
            <div style={{ position:'absolute', inset:0, padding:'40px', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
              <div>
                <h3 style={{ fontSize:'22px', fontWeight:800, color:'white', marginBottom:'8px' }}>SouKni Immo Pro</h3>
                <p style={{ color:'rgba(255,255,255,0.82)', fontSize:'14px', marginBottom:'20px', maxWidth:'240px', lineHeight:1.6 }}>The ultimate recruitment engine for Real Estate agencies.</p>
                <button style={{ backgroundColor:'#2dd4bf', color:'white', border:'none', padding:'12px 24px', borderRadius:'100px', fontWeight:700, fontSize:'13px', cursor:'pointer' }}>Switch to Immo</button>
              </div>
              <div style={{ width:'80px', height:'80px', backgroundColor:'rgba(255,255,255,0.1)', backdropFilter:'blur(12px)', borderRadius:'20px', display:'flex', alignItems:'center', justifyContent:'center', border:'1px solid rgba(255,255,255,0.2)', fontSize:'40px', flexShrink:0 }}>🏠</div>
            </div>
          </div>
        </div>

        {/* ── GRID 2 — rows 3-4 ── */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'20px', marginBottom:'48px' }}>
          {allJobs.slice(8,16).map(job=><JobCardMinimal key={job.id} job={job} />)}
        </div>

        {/* ── DIAMOND AGENCY BANNER ── */}
        <div style={{ borderRadius:'40px', overflow:'hidden', background:'linear-gradient(135deg, #2dd4bf 0%, #2dd4bf 100%)', padding:'52px 56px', display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'48px', position:'relative' as const }}>
          <div style={{ position:'absolute', right:'60px', top:'50%', transform:'translateY(-50%)', fontSize:'260px', opacity:0.08, lineHeight:1, userSelect:'none' as const, pointerEvents:'none' as const }}>🛡</div>
          <div style={{ maxWidth:'560px', position:'relative', zIndex:1 }}>
            <h2 style={{ fontSize:'32px', fontWeight:800, color:'white', marginBottom:'12px', letterSpacing:'-0.02em', lineHeight:1.2 }}>Diamond Agency Membership</h2>
            <p style={{ color:'rgba(255,255,255,0.9)', fontSize:'16px', marginBottom:'24px', lineHeight:1.7 }}>Gain maximum visibility and trust. Verified agencies receive 5× more applications and priority placement across all security categories.</p>
            <button style={{ backgroundColor:'white', color:'#2dd4bf', border:'none', padding:'14px 32px', borderRadius:'100px', fontWeight:800, fontSize:'14px', cursor:'pointer', boxShadow:'0 8px 24px rgba(0,0,0,0.15)', transition:'transform 0.2s' }}
              onMouseEnter={e=>e.currentTarget.style.transform='scale(1.04)'}
              onMouseLeave={e=>e.currentTarget.style.transform='scale(1)'}
            >Become a Diamond Member</button>
          </div>
        </div>

        {/* ── GRID 3 — rows 5-6 ── */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'20px', marginBottom:'48px' }}>
          {allJobs.slice(16,24).map(job=><JobCardMinimal key={job.id} job={job} />)}
        </div>

        {/* ── SOUKNI AUTO PRO BANNER ── */}
        <div style={{ position:'relative', borderRadius:'40px', overflow:'hidden', height:'280px', display:'flex', alignItems:'center', marginBottom:'48px' }}>
          <img src="https://images.pexels.com/photos/112460/pexels-photo-112460.jpeg?auto=compress&w=1600" alt="Auto Pro"
            style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover' }}
          />
          <div style={{ position:'absolute', inset:0, backgroundColor:'rgba(0,0,0,0.45)', backdropFilter:'blur(2px)' }} />
          <div style={{ position:'relative', zIndex:1, padding:'48px', maxWidth:'640px' }}>
            <h2 style={{ fontSize:'38px', fontWeight:800, color:'white', marginBottom:'14px', letterSpacing:'-0.02em', lineHeight:1.2 }}>SouKni Auto Pro</h2>
            <p style={{ color:'rgba(255,255,255,0.9)', fontSize:'16px', marginBottom:'28px', lineHeight:1.6 }}>Professional fleet services for security firms and corporate fleets. List your inventory or source armored vehicles today.</p>
            <div style={{ display:'flex', gap:'12px' }}>
              <button style={{ backgroundColor:'#2dd4bf', color:'white', border:'none', padding:'13px 28px', borderRadius:'100px', fontWeight:700, fontSize:'14px', cursor:'pointer', boxShadow:'0 8px 24px rgba(0,107,95,0.35)', transition:'transform 0.2s' }}
                onMouseEnter={e=>e.currentTarget.style.transform='scale(1.04)'}
                onMouseLeave={e=>e.currentTarget.style.transform='scale(1)'}
              >Get Started</button>
              <button style={{ border:'2px solid rgba(255,255,255,0.7)', color:'white', backgroundColor:'transparent', padding:'13px 28px', borderRadius:'100px', fontWeight:700, fontSize:'14px', cursor:'pointer', transition:'background 0.2s' }}
                onMouseEnter={e=>e.currentTarget.style.backgroundColor='rgba(255,255,255,0.12)'}
                onMouseLeave={e=>e.currentTarget.style.backgroundColor='transparent'}
              >Learn More</button>
            </div>
          </div>
        </div>

        {/* ── GRID 4 — rows 7-8 ── */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'20px' }}>
          {allJobs.slice(24,32).map(job=><JobCardMinimal key={job.id} job={job} />)}
        </div>
      </main>

      {/* ── FOOTER ── */}

      {/* Mobile Bottom Nav */}
      <div style={{ position:'fixed', bottom:0, left:0, right:0, zIndex:50, backgroundColor:'rgba(244,251,248,0.88)', backdropFilter:'blur(20px)', borderTop:'1px solid rgba(186,202,197,0.2)', display:'flex', justifyContent:'space-around', alignItems:'center', padding:'10px 16px 24px' }}>
        {[
          {icon:'🧭',label:'Explore',active:false},{icon:'🔍',label:'Search',active:false},
          {icon:'+',label:'',isCenter:true},{icon:'🛡',label:'Jobs',active:true},{icon:'👤',label:'Profile',active:false},
        ].map((item,i)=>(
          <div key={i} style={{ display:'flex', flexDirection:'column' as const, alignItems:'center', gap:'2px', cursor:'pointer', marginTop:item.isCenter?'-20px':'0' }}>
            {item.isCenter
              ? <div style={{ width:'48px', height:'48px', borderRadius:'50%', backgroundColor:'#2dd4bf', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'24px', color:'#0f9b8e', fontWeight:800, boxShadow:'0 4px 16px rgba(45,212,191,0.35)' }}>+</div>
              : <><span style={{ fontSize:'20px' }}>{item.icon}</span><span style={{ fontSize:'9px', fontWeight:700, color:item.active?'#2dd4bf':'#6b7a76', textTransform:'uppercase' as const, letterSpacing:'0.05em' }}>{item.label}</span></>
            }
          </div>
        ))}
      </div>
    </div>
  )
}
