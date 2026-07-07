'use client'

import { useState } from 'react'
import React from 'react'
import Link from 'next/link'
import { useMarket } from '@/context/MarketContext'
import { Search, Heart, MessageCircle, ChevronDown } from 'lucide-react'

/* ─── DATA ─────────────────────────────────────────────── */
const categoryPills = [
  'All Jobs', 'Bilingual (FR/EN)', 'Technical Support', 'Customer Care Agent',
  'Sales & Telemarketing', 'Management', 'Retention', 'Call Center Agent',
]

type BadgeType = 'diamond' | 'verified'

interface Job {
  id: string
  badge: BadgeType
  category: string
  categoryColor: string
  title: string
  company: string
  companyIcon: string
  salary: number
  salaryLabel: string
  salaryExtra?: string
  image: string
  cta?: 'view'
}

const jobs: Job[] = [
  { id: 'j1', badge: 'diamond', category: 'Management', categoryColor: '#2dd4bf', title: 'Team Leader - Bilingual (FR/EN) Account', company: 'Webhelp Technopolis', companyIcon: '🎧', salary: 12500, salaryLabel: 'BASE SALARY', image: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&w=600' },
  { id: 'j2', badge: 'verified', category: 'Technical Support', categoryColor: '#8d4f00', title: 'L2 Technical Support Specialist - IT Infrastructure', company: 'Majorel Morocco', companyIcon: '🖥', salary: 9500, salaryLabel: 'MAD + BONUS', salaryExtra: '+', image: 'https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&w=600' },
  { id: 'j3', badge: 'diamond', category: 'Customer Success', categoryColor: '#605e58', title: 'Junior Customer Success Manager - SaaS', company: 'TechFlow Solutions', companyIcon: '🌐', salary: 7500, salaryLabel: 'SALARY', image: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&w=600' },
  { id: 'j4', badge: 'verified', category: 'Management', categoryColor: '#2dd4bf', title: 'Operations Director - Experience Hub', company: 'Global Link BPO', companyIcon: '📊', salary: 35000, salaryLabel: 'MONTHLY MAD', salaryExtra: '+ Perks', image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&w=600', cta: 'view' },
  { id: 'j5', badge: 'diamond', category: 'Retention', categoryColor: '#8d4f00', title: 'Retention Agent - Telecom Specialist', company: 'Orange Business Services', companyIcon: '📞', salary: 6500, salaryLabel: 'SALARY', salaryExtra: '+ Comm', image: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&w=600' },
  { id: 'j6', badge: 'verified', category: 'Sales & Telemarketing', categoryColor: '#605e58', title: 'Outbound Sales Representative - Energy Sector', company: 'Direct Call Rabat', companyIcon: '⚡', salary: 5500, salaryLabel: 'SALARY', salaryExtra: '+ Uncapped', image: 'https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&w=600' },
  { id: 'j7', badge: 'diamond', category: 'Technical Support', categoryColor: '#2dd4bf', title: 'Technical Lead - Helpdesk Rabat', company: 'Atos Morocco', companyIcon: '💻', salary: 15000, salaryLabel: 'SALARY', image: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&w=600' },
  { id: 'j8', badge: 'verified', category: 'Bilingual (FR/EN)', categoryColor: '#8d4f00', title: 'Multilingual Receptionist - Luxury Hospitality', company: 'Fairmont La Marina', companyIcon: '🏨', salary: 8500, salaryLabel: 'SALARY', image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&w=600' },
  { id: 'j9', badge: 'verified', category: 'Management', categoryColor: '#8d4f00', title: 'Quality Analyst - French Flow', company: 'Teleperformance Rabat', companyIcon: '📋', salary: 9000, salaryLabel: 'SALARY', image: 'https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&w=600' },
  { id: 'j10', badge: 'diamond', category: 'Retention', categoryColor: '#605e58', title: 'Churn Specialist - Tech Account', company: 'Capgemini Morocco', companyIcon: '🔄', salary: 7200, salaryLabel: 'SALARY', image: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&w=600' },
  { id: 'j11', badge: 'verified', category: 'Customer Success', categoryColor: '#2dd4bf', title: 'Onboarding Specialist - E-commerce', company: 'Jumia Morocco', companyIcon: '🛒', salary: 8000, salaryLabel: 'SALARY', image: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&w=600' },
  { id: 'j12', badge: 'diamond', category: 'Management', categoryColor: '#8d4f00', title: 'Call Centre Site Manager', company: 'Concentrix Rabat', companyIcon: '🏢', salary: 45000, salaryLabel: 'SALARY', image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&w=600' },
  { id: 'j13', badge: 'diamond', category: 'Bilingual (FR/EN)', categoryColor: '#2dd4bf', title: 'Bilingual Customer Care Agent FR/IT', company: 'Webhelp Technopolis', companyIcon: '🎧', salary: 6800, salaryLabel: 'SALARY', image: 'https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&w=600' },
  { id: 'j14', badge: 'verified', category: 'Technical Support', categoryColor: '#605e58', title: 'Network Support Engineer - FR/EN', company: 'Atos Morocco', companyIcon: '🔧', salary: 11000, salaryLabel: 'SALARY', image: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&w=600' },
  { id: 'j15', badge: 'diamond', category: 'Sales & Telemarketing', categoryColor: '#8d4f00', title: 'Inside Sales Executive - SaaS Platform', company: 'TechFlow Solutions', companyIcon: '💼', salary: 8500, salaryLabel: 'SALARY', salaryExtra: '+ Comm', image: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&w=600' },
  { id: 'j16', badge: 'verified', category: 'Management', categoryColor: '#2dd4bf', title: 'Customer Experience Director', company: 'Majorel Morocco', companyIcon: '⭐', salary: 40000, salaryLabel: 'SALARY', image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&w=600', cta: 'view' },
]

/* ─── JOB CARD ───────────────────────────────────────────── */
function JobCard({ job }: { job: Job }) {
  const [saved, setSaved] = useState(false)
  const [hovered, setHovered] = useState(false)
  const { formatPrice } = useMarket()

  return (
    <article
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        backgroundColor: 'white', borderRadius: '40px', overflow: 'hidden',
        border: '1px solid rgba(186,202,197,0.15)',
        boxShadow: hovered ? '0 20px 40px rgba(0,0,0,0.1)' : '0 2px 8px rgba(0,0,0,0.04)',
        transition: 'all 0.3s', cursor: 'pointer',
      }}
    >
      {/* Image */}
      <div style={{ position: 'relative', height: '176px', overflow: 'hidden' }}>
        <img src={job.image} alt={job.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s', transform: hovered ? 'scale(1.05)' : 'scale(1)' }}
        />

        {/* Badge */}
        <div style={{ position: 'absolute', top: '14px', left: '14px', display: 'flex', gap: '6px' }}>
          {job.badge === 'diamond' ? (
            <span style={{ background: 'linear-gradient(135deg, #f59e0b, #ea580c)', color: 'white', fontSize: '9px', fontWeight: 900, padding: '4px 8px', borderRadius: '6px', textTransform: 'uppercase' as const, letterSpacing: '0.06em', boxShadow: '0 4px 12px rgba(245,158,11,0.35)' }}>Diamond Partner</span>
          ) : (
            <span style={{ backgroundColor: 'rgba(0,107,95,0.9)', color: 'white', fontSize: '9px', fontWeight: 700, padding: '4px 8px', borderRadius: '6px', textTransform: 'uppercase' as const, letterSpacing: '0.06em' }}>Verified</span>
          )}
        </div>

        {/* Save */}
        <button onClick={e => { e.stopPropagation(); setSaved(!saved) }}
          style={{ position: 'absolute', top: '12px', right: '12px', width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'rgba(0,0,0,0.2)', backdropFilter: 'blur(8px)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <Heart size={15} fill={saved ? '#ef4444' : 'none'} color="white" />
        </button>
      </div>

      {/* Content */}
      <div style={{ padding: '20px' }}>
        <span style={{ fontSize: '11px', fontWeight: 700, color: job.categoryColor, textTransform: 'uppercase' as const, letterSpacing: '0.1em' }}>{job.category}</span>
        <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#161d1b', margin: '6px 0 10px', lineHeight: 1.35, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' as const, overflow: 'hidden', minHeight: '44px' }}>{job.title}</h3>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#6b7a76', marginBottom: '16px', fontSize: '13px' }}>
          <span>{job.companyIcon}</span>
          <span style={{ fontWeight: 500 }}>{job.company}</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid rgba(186,202,197,0.2)', paddingTop: '14px' }}>
          <div>
            <div style={{ fontSize: '9px', fontWeight: 700, color: '#6b7a76', textTransform: 'uppercase' as const, letterSpacing: '0.12em', marginBottom: '2px' }}>{job.salaryLabel}</div>
            <div style={{ fontSize: '20px', fontWeight: 900, color: job.salary >= 20000 ? '#2dd4bf' : '#161d1b', letterSpacing: '-0.02em', lineHeight: 1 }}>
              {job.salary.toLocaleString()}
              {job.salaryExtra && <span style={{ fontSize: '13px', fontWeight: 400, color: '#6b7a76', marginLeft: '3px' }}>{job.salaryExtra}</span>}
            </div>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            {!job.cta && (
              <button style={{ width: '38px', height: '38px', borderRadius: '50%', backgroundColor: '#e8efec', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2dd4bf', transition: 'background 0.15s' }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = '#dde4e1'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = '#e8efec'}
              ><MessageCircle size={16} /></button>
            )}
            <button style={{ backgroundColor: job.cta === 'view' ? '#2dd4bf' : '#2dd4bf', color: job.cta === 'view' ? 'white' : '#0f9b8e', border: 'none', padding: '10px 18px', borderRadius: '100px', fontSize: '12px', fontWeight: 700, cursor: 'pointer', transition: 'filter 0.15s', whiteSpace: 'nowrap' as const }}
              onMouseEnter={e => e.currentTarget.style.filter = 'brightness(1.08)'}
              onMouseLeave={e => e.currentTarget.style.filter = 'brightness(1)'}
            >{job.cta === 'view' ? 'View Detail' : 'Apply Now'}</button>
          </div>
        </div>
      </div>
    </article>
  )
}

/* ─── PAGE ───────────────────────────────────────────────── */
export default function CustomerServiceJobsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = React.use(params)
  const [activePill, setActivePill] = useState('All Jobs')
  const [keyword, setKeyword] = useState('')
  const [immediateStart, setImmediateStart] = useState(true)

  return (
    <div style={{ fontFamily: 'Inter,system-ui,sans-serif', backgroundColor: '#f4fbf8', minHeight: '100vh' }}>

      {/* ── HERO ── */}
      <section style={{ position: 'relative', height: '480px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        <img src="https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&w=1600" alt="Customer Service Jobs"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(22,29,27,0.25) 0%, rgba(22,29,27,0.15) 60%, #f4fbf8 100%)' }} />

        <div style={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: '860px', padding: '80px 24px 0', textAlign: 'center' }}>
          <h1 style={{ fontSize: '48px', fontWeight: 800, color: 'white', marginBottom: '24px', letterSpacing: '-0.02em', lineHeight: 1.1, textShadow: '0 4px 20px rgba(0,0,0,0.25)' }}>
            Launch Your Customer Success Career in Rabat
          </h1>

          {/* Glassmorphic search */}
          <div style={{ backgroundColor: 'rgba(255,255,255,0.65)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.4)', borderRadius: '100px', padding: '8px 8px 8px 0', display: 'flex', alignItems: 'center', boxShadow: '0 20px 60px rgba(0,0,0,0.12)' }}>
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 20px', borderRight: '1px solid rgba(186,202,197,0.3)' }}>
              <Search size={20} color="#2dd4bf" />
              <input type="text" value={keyword} onChange={e => setKeyword(e.target.value)}
                placeholder="Role, language (French/English), or BPO agency..."
                style={{ flex: 1, backgroundColor: 'transparent', border: 'none', outline: 'none', fontSize: '15px', fontFamily: 'Inter,sans-serif', color: '#161d1b' }}
              />
            </div>
            <button style={{ backgroundColor: '#2dd4bf', color: '#0f9b8e', border: 'none', padding: '13px 28px', borderRadius: '100px', fontWeight: 700, fontSize: '13px', cursor: 'pointer', margin: '0 4px', transition: 'filter 0.15s' }}
              onMouseEnter={e => e.currentTarget.style.filter = 'brightness(1.08)'}
              onMouseLeave={e => e.currentTarget.style.filter = 'brightness(1)'}
            >Search Jobs</button>
          </div>
        </div>
      </section>

      {/* ── FILTER + PILLS ── */}
      <div style={{ maxWidth: '1440px', margin: '-48px auto 0', padding: '0 40px', position: 'relative', zIndex: 30 }}>
        {/* Filter bar */}
        <div style={{ backgroundColor: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.45)', borderRadius: '40px', padding: '20px 24px', boxShadow: '0 12px 40px rgba(0,0,0,0.08)', display: 'flex', alignItems: 'center', gap: '0', flexWrap: 'wrap' as const, marginBottom: '24px' }}>
          {[
            { label: 'Language Level', type: 'select', options: ['All Languages', 'Native French', 'Bilingual FR/EN', 'Bilingual FR/IT', 'Bilingual FR/ES'] },
            { label: 'Salary Range', type: 'select', options: ['Any Salary', '4,000 - 6,000 MAD', '6,000 - 10,000 MAD', '10,000+ MAD'] },
            { label: 'Contract Type', type: 'button', val: 'CDI / CDD' },
          ].map((f, i, arr) => (
            <React.Fragment key={f.label}>
              <div style={{ flex: 1, minWidth: '180px', padding: '0 16px', borderRight: i < arr.length - 1 ? '1px solid rgba(186,202,197,0.25)' : 'none' }}>
                <div style={{ fontSize: '9px', fontWeight: 700, textTransform: 'uppercase' as const, letterSpacing: '0.12em', color: '#6b7a76', marginBottom: '4px' }}>{f.label}</div>
                {f.type === 'select' ? (
                  <select style={{ backgroundColor: 'transparent', border: 'none', outline: 'none', fontSize: '14px', fontWeight: 600, color: '#161d1b', fontFamily: 'Inter,sans-serif', cursor: 'pointer', width: '100%' }}>
                    {f.options!.map(o => <option key={o}>{o}</option>)}
                  </select>
                ) : (
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
                    <span style={{ fontSize: '14px', fontWeight: 600, color: '#161d1b' }}>{f.val}</span>
                    <span style={{ fontSize: '18px' }}>🎚</span>
                  </div>
                )}
              </div>
            </React.Fragment>
          ))}

          {/* Divider */}
          <div style={{ width: '1px', height: '40px', backgroundColor: 'rgba(186,202,197,0.25)', margin: '0 8px' }} />

          {/* Immediate Start Toggle */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '0 16px', cursor: 'pointer' }} onClick={() => setImmediateStart(!immediateStart)}>
            <span style={{ fontSize: '13px', fontWeight: 600, color: '#3c4a46', whiteSpace: 'nowrap' as const }}>Immediate Start</span>
            <div style={{ width: '44px', height: '24px', borderRadius: '100px', backgroundColor: immediateStart ? '#2dd4bf' : '#dde4e1', position: 'relative', transition: 'background 0.25s', flexShrink: 0 }}>
              <div style={{ position: 'absolute', top: '2px', left: immediateStart ? '22px' : '2px', width: '20px', height: '20px', borderRadius: '50%', backgroundColor: 'white', boxShadow: '0 1px 4px rgba(0,0,0,0.2)', transition: 'left 0.25s' }} />
            </div>
          </div>
        </div>

        {/* Category pills + Sort */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', overflowX: 'auto' as const, gap: '12px', paddingBottom: '8px' }}>
          <div style={{ display: 'flex', gap: '10px', flexShrink: 0 }}>
            {categoryPills.map(pill => (
              <button key={pill} onClick={() => setActivePill(pill)}
                style={{ padding: '9px 20px', borderRadius: '100px', fontSize: '13px', fontWeight: 700, border: '1px solid', cursor: 'pointer', transition: 'all 0.15s', whiteSpace: 'nowrap' as const,
                  backgroundColor: activePill === pill ? '#2dd4bf' : '#eef5f2',
                  color: activePill === pill ? '#0f9b8e' : '#3c4a46',
                  borderColor: activePill === pill ? '#2dd4bf' : 'rgba(186,202,197,0.25)',
                  boxShadow: activePill === pill ? '0 4px 16px rgba(45,212,191,0.25)' : 'none',
                }}
              >{pill}</button>
            ))}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#6b7a76', fontSize: '13px', flexShrink: 0, cursor: 'pointer', whiteSpace: 'nowrap' as const }}>
            Sort by: <span style={{ color: '#2dd4bf', fontWeight: 700 }}>Newest First</span>
            <ChevronDown size={16} color="#2dd4bf" />
          </div>
        </div>
      </div>

      <main style={{ maxWidth: '1440px', margin: '0 auto', padding: '40px 40px 80px' }}>

        {/* ── GRID ROWS 1–2 (8 cards) ── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '20px', marginBottom: '48px' }}>
          {jobs.slice(0, 8).map(job => <JobCard key={job.id} job={job} />)}
        </div>

        {/* ── BPO RECRUITMENT BANNER ── */}
        <div style={{ position: 'relative', borderRadius: '40px', overflow: 'hidden', height: '280px', display: 'flex', alignItems: 'center', marginBottom: '48px' }}>
          <img src="https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&w=1600" alt="BPO Recruitment"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,107,95,0.45)', backdropFilter: 'blur(2px)' }} />
          <div style={{ position: 'relative', zIndex: 1, padding: '48px', maxWidth: '660px' }}>
            <h2 style={{ fontSize: '36px', fontWeight: 800, color: 'white', marginBottom: '14px', letterSpacing: '-0.02em', lineHeight: 1.2 }}>Are you a BPO Recruitment Manager?</h2>
            <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '16px', marginBottom: '28px', lineHeight: 1.6 }}>Hire your next wave of talent — 100% Free with a SouKni Jobs Pro account. Reach top Rabat-based language experts today.</p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button style={{ backgroundColor: 'white', color: '#2dd4bf', border: 'none', padding: '13px 28px', borderRadius: '100px', fontWeight: 700, fontSize: '14px', cursor: 'pointer', boxShadow: '0 8px 24px rgba(0,0,0,0.15)', transition: 'transform 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.04)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
              >Get Started</button>
              <button style={{ border: '2px solid white', color: 'white', backgroundColor: 'transparent', padding: '13px 28px', borderRadius: '100px', fontWeight: 700, fontSize: '14px', cursor: 'pointer', transition: 'background 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.12)'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
              >Learn More</button>
            </div>
          </div>
        </div>

        {/* ── GRID ROWS 3–4 (8 more cards) ── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '20px', marginBottom: '48px' }}>
          {jobs.slice(8, 16).map(job => <JobCard key={job.id} job={job} />)}
        </div>

        {/* ── APP + IMMO PRO DUAL BANNERS ── */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '48px' }}>
          {/* Join SouKni Family */}
          <div style={{ backgroundColor: '#e8efec', borderRadius: '32px', padding: '40px 48px', display: 'flex', flexDirection: 'column' as const, justifyContent: 'space-between', minHeight: '220px' }}>
            <div>
              <h2 style={{ fontSize: '32px', fontWeight: 800, color: '#161d1b', marginBottom: '12px', letterSpacing: '-0.02em', lineHeight: 1.2 }}>Join the SouKni Family</h2>
              <p style={{ color: '#6b7a76', fontSize: '15px', lineHeight: 1.6, marginBottom: '24px', maxWidth: '360px' }}>Get the most powerful Moroccan job discovery tool in your pocket. Real-time alerts for Rabat BPO openings, direct messaging, and advanced language filters.</p>
            </div>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' as const }}>
              {[{ icon: '🍎', store: 'App Store', sub: 'Download on' }, { icon: '▶', store: 'Google Play', sub: 'Get it on' }].map(btn => (
                <button key={btn.store} style={{ backgroundColor: '#0f172a', color: 'white', border: 'none', padding: '12px 20px', borderRadius: '14px', display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', transition: 'opacity 0.15s' }}
                  onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
                  onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                >
                  <span style={{ fontSize: '22px' }}>{btn.icon}</span>
                  <div>
                    <div style={{ fontSize: '9px', opacity: 0.6, textTransform: 'uppercase' as const, letterSpacing: '0.1em' }}>{btn.sub}</div>
                    <div style={{ fontSize: '15px', fontWeight: 700 }}>{btn.store}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* SouKni Auto Pro */}
          <div style={{ position: 'relative', borderRadius: '32px', overflow: 'hidden', minHeight: '220px' }}>
            <img src="https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&w=800" alt="Auto Pro"
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.42)', backdropFilter: 'blur(2px)' }} />
            <div style={{ position: 'absolute', inset: 0, padding: '36px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <h4 style={{ fontSize: '22px', fontWeight: 800, color: 'white', marginBottom: '8px' }}>SouKni Auto Pro</h4>
                <p style={{ color: 'rgba(255,255,255,0.82)', fontSize: '14px', lineHeight: 1.6, marginBottom: '20px', maxWidth: '260px' }}>The ultimate platform for automotive professionals in Morocco. List your inventory and reach thousands of buyers.</p>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button style={{ backgroundColor: '#2dd4bf', color: 'white', border: 'none', padding: '11px 22px', borderRadius: '100px', fontWeight: 700, fontSize: '13px', cursor: 'pointer', transition: 'filter 0.15s' }}
                    onMouseEnter={e => e.currentTarget.style.filter = 'brightness(1.1)'}
                    onMouseLeave={e => e.currentTarget.style.filter = 'brightness(1)'}
                  >Get Started</button>
                  <button style={{ border: '2px solid rgba(255,255,255,0.6)', color: 'white', backgroundColor: 'transparent', padding: '11px 22px', borderRadius: '100px', fontWeight: 700, fontSize: '13px', cursor: 'pointer' }}>Learn More</button>
                </div>
              </div>
              <div style={{ width: '90px', height: '90px', backgroundColor: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(12px)', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(255,255,255,0.2)', fontSize: '44px', flexShrink: 0 }}>🚗</div>
            </div>
          </div>
        </div>

        {/* ── DIAMOND MEMBERSHIP BANNER ── */}
        <div style={{ borderRadius: '40px', overflow: 'hidden', background: 'linear-gradient(135deg, #0d9488 0%, #2dd4bf 100%)', padding: '52px 56px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '48px', position: 'relative' as const }}>
          <div style={{ position: 'absolute', right: '180px', top: '50%', transform: 'translateY(-50%) rotate(12deg)', width: '180px', height: '180px', border: '8px solid rgba(255,255,255,0.1)', borderRadius: '40px', pointerEvents: 'none' as const }} />
          <div style={{ position: 'absolute', right: '240px', top: '20%', width: '70px', height: '70px', backgroundColor: 'rgba(255,255,255,0.06)', borderRadius: '50%', pointerEvents: 'none' as const }} />
          <div style={{ maxWidth: '560px', position: 'relative', zIndex: 1 }}>
            <span style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase' as const, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.8)', display: 'block', marginBottom: '14px' }}>Exclusive Privilege</span>
            <h2 style={{ fontSize: '32px', fontWeight: 800, color: 'white', marginBottom: '14px', letterSpacing: '-0.02em', lineHeight: 1.2 }}>Become a Diamond Agency Partner</h2>
            <p style={{ color: 'rgba(255,255,255,0.88)', fontSize: '15px', marginBottom: '24px', lineHeight: 1.7 }}>Priority placement, verified trust badges, and direct candidate messaging tools to hire 5× faster in the Rabat BPO market.</p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button style={{ backgroundColor: 'white', color: '#0d9488', border: 'none', padding: '13px 28px', borderRadius: '100px', fontWeight: 800, fontSize: '14px', cursor: 'pointer', transition: 'transform 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.04)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
              >Get Diamond Status</button>
              <button style={{ backgroundColor: 'rgba(255,255,255,0.2)', color: 'white', border: '1px solid rgba(255,255,255,0.3)', padding: '13px 28px', borderRadius: '100px', fontWeight: 700, fontSize: '14px', cursor: 'pointer' }}>Learn More</button>
            </div>
          </div>
          <div style={{ fontSize: '120px', opacity: 0.15, lineHeight: 1, userSelect: 'none' as const }}>💎</div>
        </div>

        {/* ── MORE GRID (repeat first 8 with variation) ── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '20px' }}>
          {[...jobs].reverse().slice(0, 8).map(job => <JobCard key={`extra-${job.id}`} job={{ ...job, id: `extra-${job.id}` }} />)}
        </div>
      </main>

      {/* ── FOOTER ── */}

      {/* Mobile Bottom Nav */}
      <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 50, backgroundColor: 'rgba(244,251,248,0.85)', backdropFilter: 'blur(20px)', borderTop: '1px solid rgba(186,202,197,0.2)', display: 'flex', justifyContent: 'space-around', alignItems: 'center', padding: '10px 16px 24px' }}>
        {[
          { icon: '🧭', label: 'Explore', active: false },
          { icon: '🔍', label: 'Search', active: false },
          { icon: '+', label: '', isCenter: true },
          { icon: '🎧', label: 'Jobs', active: true },
          { icon: '👤', label: 'Profile', active: false },
        ].map((item, i) => (
          <div key={i} style={{ display: 'flex', flexDirection: 'column' as const, alignItems: 'center', gap: '2px', cursor: 'pointer', marginTop: item.isCenter ? '-20px' : '0' }}>
            {item.isCenter ? (
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: '#2dd4bf', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', color: '#0f9b8e', fontWeight: 800, boxShadow: '0 4px 16px rgba(45,212,191,0.35)' }}>+</div>
            ) : (
              <>
                <span style={{ fontSize: '20px' }}>{item.icon}</span>
                <span style={{ fontSize: '9px', fontWeight: 700, color: item.active ? '#2dd4bf' : '#6b7a76', textTransform: 'uppercase' as const, letterSpacing: '0.05em' }}>{item.label}</span>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
