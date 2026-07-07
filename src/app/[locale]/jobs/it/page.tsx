'use client'

import { useState } from 'react'
import React from 'react'
import Link from 'next/link'
import { useMarket } from '@/context/MarketContext'
import { Search, Heart, MessageCircle, ChevronDown, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react'

/* ─── DATA ─────────────────────────────────────────────── */
const categoryPills = [
  'All Jobs', 'Software Engineering', 'Cloud & DevOps', 'Data Science',
  'Cybersecurity', 'IT Support', 'Product Management',
]

type BadgeType = 'diamond' | 'verified'

interface Job {
  id: string; badge: BadgeType; category: string; categoryColor: string
  title: string; company: string; companyIcon: string
  salary: number; salaryLabel: string; salaryExtra?: string
  image: string
}

const TECH_IMGS = [
  'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&w=600',
  'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&w=600',
  'https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&w=600',
  'https://images.pexels.com/photos/574077/pexels-photo-574077.jpeg?auto=compress&w=600',
  'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&w=600',
  'https://images.pexels.com/photos/3861972/pexels-photo-3861972.jpeg?auto=compress&w=600',
  'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&w=600',
  'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&w=600',
]

// Grid 1 — rows 1-2 (first 4 shown immediately, then recruiter, then 4 more)
const grid1: Job[] = [
  { id:'g1', badge:'diamond', category:'Engineering', categoryColor:'#006b5f', title:'Senior Full Stack Developer', company:'TechNova Solutions', companyIcon:'💻', salary:42000, salaryLabel:'MONTHLY SALARY', salaryExtra:'MAD', image:TECH_IMGS[0] },
  { id:'g2', badge:'verified', category:'Cloud', categoryColor:'#8d4f00', title:'Cloud Solutions Architect', company:'Azure Global Rabat', companyIcon:'☁️', salary:55000, salaryLabel:'ESTIMATED MAD', salaryExtra:'+', image:TECH_IMGS[1] },
  { id:'g3', badge:'diamond', category:'Security', categoryColor:'#605e58', title:'Cybersecurity Analyst', company:'SecureNet Morocco', companyIcon:'🛡', salary:38000, salaryLabel:'SALARY', image:TECH_IMGS[2] },
  { id:'g4', badge:'verified', category:'Data Science', categoryColor:'#006b5f', title:'Data Research Scientist', company:'AI Labs Rabat', companyIcon:'🔬', salary:48000, salaryLabel:'MONTHLY MAD', salaryExtra:'+', image:TECH_IMGS[3] },
]

// Grid 2 — after recruiter banner (4 cards)
const grid2: Job[] = [
  { id:'g5', badge:'diamond', category:'Design', categoryColor:'#006b5f', title:'Senior UX/UI Designer', company:'Creative Hub Rabat', companyIcon:'🎨', salary:28000, salaryLabel:'SALARY', image:TECH_IMGS[4] },
  { id:'g6', badge:'verified', category:'DevOps', categoryColor:'#8d4f00', title:'DevOps Engineer', company:'CloudScale Systems', companyIcon:'⚙️', salary:35000, salaryLabel:'MONTHLY', image:TECH_IMGS[5] },
  { id:'g7', badge:'diamond', category:'Support', categoryColor:'#605e58', title:'IT Support Specialist', company:'Global IT Services', companyIcon:'🖥', salary:15000, salaryLabel:'ESTIMATED', image:TECH_IMGS[6] },
  { id:'g8', badge:'verified', category:'Mobile', categoryColor:'#006b5f', title:'Mobile App Developer', company:'AppWorks Rabat', companyIcon:'📱', salary:32000, salaryLabel:'SALARY', image:TECH_IMGS[7] },
]

// Grid 3 — rows 3-4 (8 cards after second set)
const grid3: Job[] = [
  { id:'g9',  badge:'diamond', category:'Infrastructure', categoryColor:'#006b5f', title:'Network Engineer', company:'ConnectMorocco Rabat', companyIcon:'🌐', salary:25000, salaryLabel:'MONTHLY', image:TECH_IMGS[0] },
  { id:'g10', badge:'verified', category:'Data', categoryColor:'#006b5f', title:'Data Analyst', company:'Insight Solutions', companyIcon:'📊', salary:22000, salaryLabel:'SALARY', image:TECH_IMGS[1] },
  { id:'g11', badge:'diamond', category:'Management', categoryColor:'#605e58', title:'Project Manager', company:'Global Tech Rabat', companyIcon:'📋', salary:30000, salaryLabel:'MONTHLY', image:TECH_IMGS[2] },
  { id:'g12', badge:'verified', category:'Architecture', categoryColor:'#006b5f', title:'Systems Architect', company:'Azure Global Rabat', companyIcon:'🏗', salary:50000, salaryLabel:'SALARY', image:TECH_IMGS[3] },
  { id:'g13', badge:'diamond', category:'Software', categoryColor:'#006b5f', title:'Senior Software Engineer', company:'TechNova Solutions', companyIcon:'💻', salary:45000, salaryLabel:'MONTHLY MAD', image:TECH_IMGS[4] },
  { id:'g14', badge:'verified', category:'Data', categoryColor:'#006b5f', title:'Data Scientist', company:'Insight Labs', companyIcon:'📉', salary:38000, salaryLabel:'MONTHLY MAD', image:TECH_IMGS[5] },
  { id:'g15', badge:'diamond', category:'Cloud', categoryColor:'#8d4f00', title:'Cloud Solutions Architect', company:'Azure Global', companyIcon:'☁️', salary:55000, salaryLabel:'MONTHLY MAD', image:TECH_IMGS[6] },
  { id:'g16', badge:'verified', category:'Management', categoryColor:'#605e58', title:'IT Project Manager', company:'Global Tech', companyIcon:'📌', salary:42000, salaryLabel:'MONTHLY MAD', image:TECH_IMGS[7] },
]

// Grid 4 — rows 5-6 after "Join the Family" (8 cards)
const grid4: Job[] = [
  { id:'g17', badge:'diamond', category:'Security', categoryColor:'#006b5f', title:'Cybersecurity Lead', company:'SecureNet', companyIcon:'🔒', salary:48000, salaryLabel:'MONTHLY MAD', image:TECH_IMGS[0] },
  { id:'g18', badge:'verified', category:'AI', categoryColor:'#006b5f', title:'AI Research Engineer', company:'Visionary Labs', companyIcon:'🤖', salary:52000, salaryLabel:'MONTHLY MAD', image:TECH_IMGS[1] },
  { id:'g19', badge:'diamond', category:'Mobile', categoryColor:'#006b5f', title:'Mobile App Developer', company:'AppWorks', companyIcon:'📱', salary:35000, salaryLabel:'MONTHLY MAD', image:TECH_IMGS[2] },
  { id:'g20', badge:'verified', category:'Data', categoryColor:'#006b5f', title:'Database Administrator', company:'DataCore Rabat', companyIcon:'🗄', salary:30000, salaryLabel:'MONTHLY MAD', image:TECH_IMGS[3] },
]

// Grid 5 — rows 7-8 (final 4 ads, then pagination, then banners)
const grid5: Job[] = [
  { id:'g21', badge:'diamond', category:'Design', categoryColor:'#006b5f', title:'Senior UX/UI Designer', company:'Creative Hub Rabat', companyIcon:'🎨', salary:28000, salaryLabel:'SALARY', image:TECH_IMGS[4] },
  { id:'g22', badge:'verified', category:'DevOps', categoryColor:'#8d4f00', title:'DevOps Engineer', company:'CloudScale Systems', companyIcon:'⚙️', salary:35000, salaryLabel:'MONTHLY', image:TECH_IMGS[5] },
  { id:'g23', badge:'diamond', category:'Support', categoryColor:'#605e58', title:'IT Support Specialist', company:'Global IT Services', companyIcon:'🖥', salary:15000, salaryLabel:'ESTIMATED', image:TECH_IMGS[6] },
  { id:'g24', badge:'verified', category:'Mobile', categoryColor:'#006b5f', title:'Mobile App Developer', company:'AppWorks Rabat', companyIcon:'📱', salary:32000, salaryLabel:'SALARY', image:TECH_IMGS[7] },
]

/* ─── CARD ───────────────────────────────────────────────── */
function ITJobCard({ job }: { job: Job }) {
  const [saved, setSaved] = useState(false)
  const [hovered, setHovered] = useState(false)
  const { formatPrice } = useMarket()

  return (
    <article
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        backgroundColor: 'white', borderRadius: '40px', overflow: 'hidden',
        border: '1px solid rgba(186,202,197,0.12)',
        boxShadow: hovered ? '0 20px 40px rgba(0,0,0,0.1)' : '0 2px 8px rgba(0,0,0,0.04)',
        transition: 'all 0.3s', cursor: 'pointer',
      }}
    >
      <div style={{ position: 'relative', height: '176px', overflow: 'hidden' }}>
        <img src={job.image} alt={job.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s', transform: hovered ? 'scale(1.05)' : 'scale(1)' }}
        />
        <div style={{ position: 'absolute', top: '14px', left: '14px' }}>
          {job.badge === 'diamond'
            ? <span style={{ background: 'linear-gradient(135deg,#f59e0b,#ea580c)', color: 'white', fontSize: '9px', fontWeight: 900, padding: '4px 8px', borderRadius: '6px', textTransform: 'uppercase' as const, letterSpacing: '0.06em', boxShadow: '0 4px 12px rgba(245,158,11,0.3)' }}>Diamond Member</span>
            : <span style={{ backgroundColor: 'rgba(0,107,95,0.92)', color: 'white', fontSize: '9px', fontWeight: 700, padding: '4px 8px', borderRadius: '6px', textTransform: 'uppercase' as const, letterSpacing: '0.06em' }}>Verified Agency</span>
          }
        </div>
        <button onClick={e => { e.stopPropagation(); setSaved(!saved) }}
          style={{ position: 'absolute', top: '12px', right: '12px', width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'rgba(0,0,0,0.2)', backdropFilter: 'blur(8px)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Heart size={15} fill={saved ? '#ef4444' : 'none'} color="white" />
        </button>
      </div>
      <div style={{ padding: '20px' }}>
        <span style={{ fontSize: '11px', fontWeight: 700, color: job.categoryColor, textTransform: 'uppercase' as const, letterSpacing: '0.1em' }}>{job.category}</span>
        <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#161d1b', margin: '6px 0 10px', lineHeight: 1.35, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' as const, overflow: 'hidden', minHeight: '44px' }}>{job.title}</h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#6b7a76', marginBottom: '14px', fontSize: '12px' }}>
          <span>{job.companyIcon}</span><span style={{ fontWeight: 500 }}>{job.company}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid rgba(186,202,197,0.2)', paddingTop: '14px' }}>
          <div>
            <div style={{ fontSize: '9px', fontWeight: 700, color: '#6b7a76', textTransform: 'uppercase' as const, letterSpacing: '0.12em', marginBottom: '2px' }}>{job.salaryLabel}</div>
            <div style={{ fontSize: '20px', fontWeight: 900, color: job.salary >= 40000 ? '#3cddc7' : '#161d1b', letterSpacing: '-0.02em', lineHeight: 1 }}>
              {job.salary.toLocaleString()}
              {job.salaryExtra && <span style={{ fontSize: '13px', fontWeight: 400, color: '#6b7a76', marginLeft: '3px' }}>{job.salaryExtra}</span>}
            </div>
          </div>
          <button style={{ backgroundColor: '#2dd4bf', color: '#00574d', border: 'none', padding: '9px 18px', borderRadius: '100px', fontSize: '12px', fontWeight: 700, cursor: 'pointer', transition: 'filter 0.15s', whiteSpace: 'nowrap' as const }}
            onMouseEnter={e => e.currentTarget.style.filter = 'brightness(1.08)'}
            onMouseLeave={e => e.currentTarget.style.filter = 'brightness(1)'}
          >Apply</button>
        </div>
      </div>
    </article>
  )
}

/* ─── PAGE ───────────────────────────────────────────────── */
export default function ITJobsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = React.use(params)
  const [activePill, setActivePill] = useState('All Jobs')
  const [keyword, setKeyword] = useState('')
  const [diamondOnly, setDiamondOnly] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)

  return (
    <div style={{ fontFamily: 'Inter,system-ui,sans-serif', backgroundColor: '#f4fbf8', minHeight: '100vh' }}>

      {/* ── HERO ── */}
      <section style={{ position: 'relative', height: '480px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        <img src="https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&w=1600" alt="IT Jobs Hero"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(22,29,27,0.45) 0%, rgba(22,29,27,0.12) 60%, #f4fbf8 100%)' }} />
        <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', width: '100%', maxWidth: '860px', padding: '80px 24px 0' }}>
          <h1 style={{ fontSize: '48px', fontWeight: 800, color: 'white', marginBottom: '24px', letterSpacing: '-0.02em', lineHeight: 1.1, textShadow: '0 4px 20px rgba(0,0,0,0.3)' }}>
            Information Technology Jobs in Rabat
          </h1>
          <div style={{ backgroundColor: 'rgba(255,255,255,0.68)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.45)', borderRadius: '100px', padding: '8px 8px 8px 0', display: 'flex', alignItems: 'center', boxShadow: '0 20px 60px rgba(0,0,0,0.12)' }}>
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 20px', borderRight: '1px solid rgba(186,202,197,0.3)' }}>
              <Search size={20} color="#006b5f" />
              <input type="text" value={keyword} onChange={e => setKeyword(e.target.value)}
                placeholder="Software Engineer, Cloud Architect, Data Scientist..."
                style={{ flex: 1, backgroundColor: 'transparent', border: 'none', outline: 'none', fontSize: '15px', fontFamily: 'Inter,sans-serif', color: '#161d1b' }}
              />
            </div>
            <button style={{ backgroundColor: '#2dd4bf', color: '#00574d', border: 'none', padding: '13px 28px', borderRadius: '100px', fontWeight: 700, fontSize: '13px', cursor: 'pointer', margin: '0 4px', transition: 'filter 0.15s' }}
              onMouseEnter={e => e.currentTarget.style.filter = 'brightness(1.08)'}
              onMouseLeave={e => e.currentTarget.style.filter = 'brightness(1)'}
            >Search Jobs</button>
          </div>
        </div>
      </section>

      {/* ── FILTER + PILLS ── */}
      <div style={{ maxWidth: '1440px', margin: '-48px auto 0', padding: '0 40px', position: 'relative', zIndex: 30 }}>
        {/* Filter bar */}
        <div style={{ backgroundColor: 'rgba(255,255,255,0.68)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.45)', borderRadius: '40px', padding: '20px 24px', boxShadow: '0 12px 40px rgba(0,0,0,0.08)', display: 'flex', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap' as const, gap: '0' }}>
          {[
            { label: 'Neighborhood', opts: ['All Rabat Districts', 'Hay Riad (Tech Hub)', 'Agdal (Startups)', 'Souissi (Corporates)', 'Hassan (Gov IT)'] },
            { label: 'Salary Range', opts: ['Any Salary', '8,000 - 15,000 MAD', '15,000 - 30,000 MAD', '30,000+ MAD'] },
          ].map((f, i, arr) => (
            <React.Fragment key={f.label}>
              <div style={{ flex: 1, minWidth: '200px', padding: '0 16px', borderRight: i < arr.length - 1 ? '1px solid rgba(186,202,197,0.25)' : 'none' }}>
                <div style={{ fontSize: '9px', fontWeight: 700, textTransform: 'uppercase' as const, letterSpacing: '0.12em', color: '#6b7a76', marginBottom: '4px' }}>{f.label}</div>
                <select style={{ backgroundColor: 'transparent', border: 'none', outline: 'none', fontSize: '14px', fontWeight: 600, color: '#161d1b', fontFamily: 'Inter,sans-serif', cursor: 'pointer', width: '100%' }}>
                  {f.opts.map(o => <option key={o}>{o}</option>)}
                </select>
              </div>
            </React.Fragment>
          ))}
          <div style={{ flex: 1, minWidth: '140px', padding: '0 16px', borderRight: '1px solid rgba(186,202,197,0.25)' }}>
            <div style={{ fontSize: '9px', fontWeight: 700, textTransform: 'uppercase' as const, letterSpacing: '0.12em', color: '#6b7a76', marginBottom: '4px' }}>Contract Type</div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
              <span style={{ fontSize: '14px', fontWeight: 600, color: '#161d1b' }}>Full-time</span>
              <span style={{ fontSize: '16px' }}>🎚</span>
            </div>
          </div>
          <div style={{ width: '1px', height: '40px', backgroundColor: 'rgba(186,202,197,0.25)', flexShrink: 0, margin: '0 8px' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '0 16px', cursor: 'pointer' }} onClick={() => setDiamondOnly(!diamondOnly)}>
            <span style={{ fontSize: '13px', fontWeight: 600, color: '#3c4a46', whiteSpace: 'nowrap' as const }}>Diamond Certified Only</span>
            <div style={{ width: '44px', height: '24px', borderRadius: '100px', backgroundColor: diamondOnly ? '#006b5f' : '#dde4e1', position: 'relative', transition: 'background 0.25s', flexShrink: 0 }}>
              <div style={{ position: 'absolute', top: '2px', left: diamondOnly ? '22px' : '2px', width: '20px', height: '20px', borderRadius: '50%', backgroundColor: 'white', boxShadow: '0 1px 4px rgba(0,0,0,0.2)', transition: 'left 0.25s' }} />
            </div>
          </div>
        </div>

        {/* Pills + sort */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', overflowX: 'auto' as const, gap: '12px', paddingBottom: '8px', marginBottom: '40px' }}>
          <div style={{ display: 'flex', gap: '10px', flexShrink: 0 }}>
            {categoryPills.map(pill => (
              <button key={pill} onClick={() => setActivePill(pill)}
                style={{ padding: '9px 20px', borderRadius: '100px', fontSize: '13px', fontWeight: 700, border: '1px solid', cursor: 'pointer', transition: 'all 0.15s', whiteSpace: 'nowrap' as const,
                  backgroundColor: activePill === pill ? '#2dd4bf' : '#eef5f2',
                  color: activePill === pill ? '#00574d' : '#3c4a46',
                  borderColor: activePill === pill ? '#2dd4bf' : 'rgba(186,202,197,0.25)',
                  boxShadow: activePill === pill ? '0 4px 16px rgba(45,212,191,0.25)' : 'none',
                }}
              >{pill}</button>
            ))}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#6b7a76', fontSize: '13px', flexShrink: 0, cursor: 'pointer', whiteSpace: 'nowrap' as const }}>
            Sort by: <span style={{ color: '#006b5f', fontWeight: 700 }}>Featured First</span>
            <ChevronDown size={16} color="#006b5f" />
          </div>
        </div>
      </div>

      <main style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 40px 80px' }}>

        {/* ── GRID 1 — rows 1 (4 cards) ── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '20px', marginBottom: '64px' }}>
          {grid1.map(job => <ITJobCard key={job.id} job={job} />)}
        </div>

        {/* ── RECRUITER MODULE BANNER ── */}
        <div style={{ position: 'relative', borderRadius: '40px', overflow: 'hidden', height: '280px', display: 'flex', alignItems: 'center', marginBottom: '64px' }}>
          <img src="https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&w=1600" alt="Tech Recruiter"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,107,95,0.42)', backdropFilter: 'blur(2px)' }} />
          <div style={{ position: 'relative', zIndex: 1, padding: '48px', maxWidth: '640px' }}>
            <h2 style={{ fontSize: '38px', fontWeight: 800, color: 'white', marginBottom: '14px', letterSpacing: '-0.02em', lineHeight: 1.2 }}>Are you a Tech Company or Startup?</h2>
            <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '16px', marginBottom: '28px', lineHeight: 1.6 }}>Find your next top-tier developer or architect — 100% Free. Connect with the best IT professionals in Morocco today.</p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button style={{ backgroundColor: 'white', color: '#006b5f', border: 'none', padding: '13px 28px', borderRadius: '100px', fontWeight: 700, fontSize: '14px', cursor: 'pointer', boxShadow: '0 8px 24px rgba(0,0,0,0.15)', transition: 'transform 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.04)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
              >Find Talent</button>
              <button style={{ border: '2px solid rgba(255,255,255,0.7)', color: 'white', backgroundColor: 'transparent', padding: '13px 28px', borderRadius: '100px', fontWeight: 700, fontSize: '14px', cursor: 'pointer', transition: 'background 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.12)'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
              >Learn More</button>
            </div>
          </div>
        </div>

        {/* ── GRID 2 — 4 cards ── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '20px', marginBottom: '64px' }}>
          {grid2.map(job => <ITJobCard key={job.id} job={job} />)}
        </div>

        {/* ── GRID 3 — rows 3-4 (8 cards) ── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '20px', marginBottom: '64px' }}>
          {grid3.map(job => <ITJobCard key={job.id} job={job} />)}
        </div>

        {/* ── JOIN SOUKNI FAMILY ── */}
        <section style={{ backgroundColor: '#e2eae7', borderRadius: '40px', padding: '64px 48px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '48px', marginBottom: '64px', flexWrap: 'wrap' as const }}>
          <div style={{ maxWidth: '480px' }}>
            <h2 style={{ fontSize: '44px', fontWeight: 800, color: '#161d1b', marginBottom: '16px', letterSpacing: '-0.02em', lineHeight: 1.1 }}>Join the SouKni Family</h2>
            <p style={{ fontSize: '17px', color: '#6b7a76', marginBottom: '32px', lineHeight: 1.7 }}>Get the most powerful Moroccan recruitment tool in your pocket. Real-time alerts for IT roles, direct messaging with companies, and advanced filters.</p>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' as const }}>
              {[{ icon: '🍎', store: 'App Store', sub: 'Download on' }, { icon: '▶', store: 'Google Play', sub: 'Get it on' }].map(btn => (
                <button key={btn.store} style={{ backgroundColor: '#0f172a', color: 'white', border: 'none', padding: '13px 20px', borderRadius: '14px', display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', transition: 'opacity 0.15s' }}
                  onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
                  onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                >
                  <span style={{ fontSize: '26px' }}>{btn.icon}</span>
                  <div>
                    <div style={{ fontSize: '9px', opacity: 0.6, textTransform: 'uppercase' as const, letterSpacing: '0.1em', lineHeight: 1 }}>{btn.sub}</div>
                    <div style={{ fontSize: '16px', fontWeight: 700, lineHeight: 1.3 }}>{btn.store}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
          {/* Phone mockup */}
          <div style={{ flexShrink: 0, position: 'relative', width: '220px' }}>
            <div style={{ position: 'absolute', inset: '-16px', backgroundColor: 'rgba(0,107,95,0.08)', borderRadius: '50%', filter: 'blur(40px)' }} />
            <div style={{ width: '220px', aspectRatio: '9/16', backgroundColor: '#0f172a', borderRadius: '32px', border: '8px solid #1e293b', overflow: 'hidden', position: 'relative', boxShadow: '0 24px 60px rgba(0,0,0,0.2)' }}>
              <img src="https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&w=400" alt="App Preview"
                style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.85 }}
              />
              <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '70px', height: '16px', backgroundColor: '#1e293b', borderRadius: '0 0 12px 12px' }} />
            </div>
          </div>
        </section>

        {/* ── GRID 4 — rows 5-6 (8 cards) ── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '20px', marginBottom: '64px' }}>
          {grid4.map(job => <ITJobCard key={job.id} job={job} />)}
        </div>

        {/* ── GRID 5 — rows 7-8 (final 4 ads) ── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '20px', marginBottom: '48px' }}>
          {grid5.map(job => <ITJobCard key={job.id} job={job} />)}
        </div>

        {/* ── PAGINATION — immediately after last row of ads ── */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '6px', marginBottom: '64px' }}>
          {[
            { content: <ChevronsLeft size={16} />, action: () => setCurrentPage(1) },
            { content: <ChevronLeft size={16} />, action: () => setCurrentPage(Math.max(1, currentPage - 1)) },
          ].map((btn, i) => (
            <button key={i} onClick={btn.action}
              style={{ width: '40px', height: '40px', borderRadius: '10px', border: '1px solid rgba(186,202,197,0.35)', backgroundColor: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6b7a76', transition: 'background 0.15s' }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = '#e8efec'}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
            >{btn.content}</button>
          ))}
          {[1,2,3,4,5].map(p => (
            <button key={p} onClick={() => setCurrentPage(p)}
              style={{ width: '40px', height: '40px', borderRadius: '10px', border: '1px solid', cursor: 'pointer', fontWeight: 700, fontSize: '14px', transition: 'all 0.15s',
                backgroundColor: currentPage === p ? '#2b3230' : 'transparent',
                color: currentPage === p ? 'white' : '#3c4a46',
                borderColor: currentPage === p ? '#2b3230' : 'rgba(186,202,197,0.35)',
              }}
            >{p}</button>
          ))}
          {[
            { content: <ChevronRight size={16} />, action: () => setCurrentPage(Math.min(5, currentPage + 1)) },
            { content: <ChevronsRight size={16} />, action: () => setCurrentPage(5) },
          ].map((btn, i) => (
            <button key={i} onClick={btn.action}
              style={{ width: '40px', height: '40px', borderRadius: '10px', border: '1px solid rgba(186,202,197,0.35)', backgroundColor: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6b7a76', transition: 'background 0.15s' }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = '#e8efec'}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
            >{btn.content}</button>
          ))}
        </div>

        {/* ── DUAL BANNERS: Immo Pro + Hospitality Pro ── */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '64px', padding: '48px 0' }}>
          {/* Immo Pro */}
          <div style={{ position: 'relative', borderRadius: '40px', overflow: 'hidden', height: '220px', display: 'flex', alignItems: 'center', padding: '32px', backgroundColor: '#2b3230' }}>
            <img src="https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&w=600" alt="Immo Pro"
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.3, transition: 'transform 0.5s' }}
              onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
            />
            <div style={{ position: 'relative', zIndex: 1 }}>
              <h3 style={{ fontSize: '22px', fontWeight: 800, color: 'white', marginBottom: '8px' }}>SouKni Immo Pro</h3>
              <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '14px', marginBottom: '18px', lineHeight: 1.6 }}>The ultimate recruitment engine for Real Estate agencies.</p>
              <button style={{ backgroundColor: '#006b5f', color: 'white', border: 'none', padding: '10px 22px', borderRadius: '100px', fontWeight: 700, fontSize: '13px', cursor: 'pointer', transition: 'filter 0.15s' }}
                onMouseEnter={e => e.currentTarget.style.filter = 'brightness(1.1)'}
                onMouseLeave={e => e.currentTarget.style.filter = 'brightness(1)'}
              >Switch to SouKni Immo Pro</button>
            </div>
          </div>

          {/* Hospitality Pro */}
          <div style={{ position: 'relative', borderRadius: '40px', overflow: 'hidden', height: '220px', display: 'flex', alignItems: 'center', padding: '32px', backgroundColor: '#dde4e1' }}>
            <img src="https://images.pexels.com/photos/1579253/pexels-photo-1579253.jpeg?auto=compress&w=600" alt="Hospitality Pro"
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.2, transition: 'transform 0.5s' }}
              onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
            />
            <div style={{ position: 'relative', zIndex: 1 }}>
              <h3 style={{ fontSize: '22px', fontWeight: 800, color: '#161d1b', marginBottom: '8px' }}>SouKni Hospitality Pro</h3>
              <p style={{ color: '#3c4a46', fontSize: '14px', marginBottom: '18px', lineHeight: 1.6 }}>Specialized hiring for kitchens and dining rooms.</p>
              <button style={{ backgroundColor: '#161d1b', color: '#f4fbf8', border: 'none', padding: '10px 22px', borderRadius: '100px', fontWeight: 700, fontSize: '13px', cursor: 'pointer', transition: 'filter 0.15s' }}
                onMouseEnter={e => e.currentTarget.style.filter = 'brightness(1.2)'}
                onMouseLeave={e => e.currentTarget.style.filter = 'brightness(1)'}
              >Learn More About Pro Accounts</button>
            </div>
          </div>
        </div>

        {/* ── AUTO PRO BANNER ── */}
        <div style={{ position: 'relative', borderRadius: '40px', overflow: 'hidden', height: '280px', display: 'flex', alignItems: 'center' }}>
          <img src="https://images.pexels.com/photos/1005417/pexels-photo-1005417.jpeg?auto=compress&w=1600" alt="Auto Pro"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.42)', backdropFilter: 'blur(2px)' }} />
          <div style={{ position: 'relative', zIndex: 1, padding: '48px', maxWidth: '620px' }}>
            <h2 style={{ fontSize: '38px', fontWeight: 800, color: 'white', marginBottom: '14px', letterSpacing: '-0.02em', lineHeight: 1.2 }}>SouKni Auto Pro</h2>
            <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '16px', marginBottom: '28px', lineHeight: 1.6 }}>The ultimate platform for automotive professionals in Morocco. List your inventory and reach thousands of buyers.</p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button style={{ backgroundColor: '#006b5f', color: 'white', border: 'none', padding: '13px 28px', borderRadius: '100px', fontWeight: 700, fontSize: '14px', cursor: 'pointer', boxShadow: '0 8px 24px rgba(0,107,95,0.35)', transition: 'transform 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.04)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
              >Get Started</button>
              <button style={{ border: '2px solid rgba(255,255,255,0.7)', color: 'white', backgroundColor: 'transparent', padding: '13px 28px', borderRadius: '100px', fontWeight: 700, fontSize: '14px', cursor: 'pointer', transition: 'background 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.12)'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
              >Learn More</button>
            </div>
          </div>
        </div>
      </main>

      {/* ── FOOTER ── */}
      <footer style={{ backgroundColor: '#7a7a7a', color: 'white', paddingTop: '64px', paddingBottom: '32px' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 40px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '48px', marginBottom: '48px', paddingBottom: '48px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                <div style={{ width: '34px', height: '34px', backgroundColor: '#006b5f', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>💻</div>
                <span style={{ fontSize: '20px', fontWeight: 900, color: 'white', letterSpacing: '-0.02em' }}>SouKni MarketPlace</span>
              </div>
              <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.72)', lineHeight: 1.7, maxWidth: '280px', marginBottom: '20px' }}>The premium hub for Moroccan technology, IT jobs, and professional discovery. Trusted, localized, and professional.</p>
              <div style={{ display: 'flex', gap: '10px' }}>
                {['🌐', '💬'].map((icon, i) => (
                  <a key={i} href="#" style={{ width: '38px', height: '38px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', textDecoration: 'none', transition: 'background 0.15s' }}
                    onMouseEnter={e => e.currentTarget.style.backgroundColor = '#006b5f'}
                    onMouseLeave={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.06)'}
                  >{icon}</a>
                ))}
              </div>
            </div>
            {[
              { title: 'Quick Links', links: ['IT Jobs in Rabat', 'Tech Startups', 'Luxury Offices', 'Partner Network'] },
              { title: 'Support', links: ['Recruiter Help', 'Safety Guidelines', 'Terms & Conditions', 'Privacy Policy'] },
              { title: 'Professionals', links: ['SouKni Hospitality Pro', 'Culinary API', 'Featured Postings', 'Diamond Members'] },
            ].map(col => (
              <div key={col.title}>
                <h4 style={{ fontWeight: 700, color: 'white', marginBottom: '20px', fontSize: '15px' }}>{col.title}</h4>
                {col.links.map(link => (
                  <a key={link} href="#" style={{ display: 'block', fontSize: '14px', color: 'rgba(255,255,255,0.7)', textDecoration: 'none', marginBottom: '12px', transition: 'color 0.15s' }}
                    onMouseEnter={e => e.currentTarget.style.color = '#2dd4bf'}
                    onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.7)'}
                  >{link}</a>
                ))}
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' as const, gap: '12px' }}>
            <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)' }}>© 2026 SouKni Marketplace. Premium Moroccan Hospitality & Lifestyle Hub.</p>
            <div style={{ display: 'flex', gap: '12px' }}>
              {['🛡', '✅'].map((icon, i) => (
                <div key={i} style={{ width: '48px', height: '24px', backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', cursor: 'pointer', opacity: 0.5 }}>{icon}</div>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* Mobile Bottom Nav */}
      <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 50, backgroundColor: 'rgba(244,251,248,0.88)', backdropFilter: 'blur(20px)', borderTop: '1px solid rgba(186,202,197,0.2)', display: 'flex', justifyContent: 'space-around', alignItems: 'center', padding: '10px 16px 24px' }}>
        {[
          { icon: '🧭', label: 'Explore', active: false }, { icon: '🔍', label: 'Search', active: false },
          { icon: '+', label: '', isCenter: true }, { icon: '💻', label: 'Jobs', active: true }, { icon: '👤', label: 'Profile', active: false },
        ].map((item, i) => (
          <div key={i} style={{ display: 'flex', flexDirection: 'column' as const, alignItems: 'center', gap: '2px', cursor: 'pointer', marginTop: item.isCenter ? '-20px' : '0' }}>
            {item.isCenter
              ? <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: '#2dd4bf', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', color: '#00574d', fontWeight: 800, boxShadow: '0 4px 16px rgba(45,212,191,0.35)' }}>+</div>
              : <><span style={{ fontSize: '20px' }}>{item.icon}</span><span style={{ fontSize: '9px', fontWeight: 700, color: item.active ? '#006b5f' : '#6b7a76', textTransform: 'uppercase' as const, letterSpacing: '0.05em' }}>{item.label}</span></>
            }
          </div>
        ))}
      </div>
    </div>
  )
}
