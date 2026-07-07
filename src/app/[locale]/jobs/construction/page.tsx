'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Heart, Search, MapPin, Globe, Bell, User, ChevronDown, MessageCircle, Car, Gem, HardHat, Zap, Wrench, Building2, Hammer, Layers, Shield, Truck, BarChart2, PenTool, Anchor, Cpu } from 'lucide-react'

const categoryPills = ['All Jobs', 'Civil Engineering', 'Site Management', 'Architecture', 'Electrical', 'Plumbing', 'Heavy Machinery']

type Job = {
  id: string; badge: 'Diamond Member' | 'Verified' | null
  category: string; categoryColor: string
  title: string; company: string; icon: any
  salaryLabel: string; salary: string; salarySuffix?: string
  image: string; cta: 'apply' | 'view'
}

const row1: Job[] = [
  { id: '1', badge: 'Diamond Member', category: 'Civil Engineering', categoryColor: '#2dd4bf', title: 'Senior Civil Engineer - Infrastructure', company: 'Rabat Construction Group', icon: Building2, salaryLabel: 'STARTING SALARY', salary: '25,000', image: 'https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg?auto=compress&w=600', cta: 'apply' },
  { id: '2', badge: 'Verified', category: 'Site Management', categoryColor: '#8d4f00', title: 'Construction Site Supervisor - Bouregreg Project', company: 'Atlas Build Morocco', icon: HardHat, salaryLabel: 'ESTIMATED MAD', salary: '18,500', salarySuffix: '+', image: 'https://images.pexels.com/photos/1109541/pexels-photo-1109541.jpeg?auto=compress&w=600', cta: 'apply' },
  { id: '3', badge: 'Diamond Member', category: 'Architecture', categoryColor: '#605e58', title: 'Architectural BIM Modeler - Luxury Residential', company: 'Rabat Design Studio', icon: PenTool, salaryLabel: 'SALARY', salary: '15,000', image: 'https://images.pexels.com/photos/3862130/pexels-photo-3862130.jpeg?auto=compress&w=600', cta: 'apply' },
  { id: '4', badge: 'Verified', category: 'Heavy Machinery', categoryColor: '#2dd4bf', title: 'Experienced Excavator Operator', company: 'Capital Excavations', icon: Truck, salaryLabel: 'MONTHLY MAD', salary: '9,500', salarySuffix: '+ OT', image: 'https://images.pexels.com/photos/1078884/pexels-photo-1078884.jpeg?auto=compress&w=600', cta: 'view' },
]

const row2: Job[] = [
  { id: '5', badge: 'Diamond Member', category: 'Heavy Machinery', categoryColor: '#8d4f00', title: 'Tower Crane Operator - Rabat Skyline', company: 'HighRise Morocco', icon: Truck, salaryLabel: 'SALARY', salary: '12,500', salarySuffix: '+', image: 'https://images.pexels.com/photos/2219024/pexels-photo-2219024.jpeg?auto=compress&w=600', cta: 'apply' },
  { id: '6', badge: 'Verified', category: 'Plumbing', categoryColor: '#605e58', title: 'Master Plumber - Commercial Systems', company: 'Rabat Flow Experts', icon: Wrench, salaryLabel: 'SALARY', salary: '11,000', salarySuffix: '+', image: 'https://images.pexels.com/photos/6419128/pexels-photo-6419128.jpeg?auto=compress&w=600', cta: 'apply' },
  { id: '7', badge: 'Diamond Member', category: 'Civil Engineering', categoryColor: '#2dd4bf', title: 'Structural Engineer - Bridge Specialist', company: 'Morocco Urban Works', icon: Building2, salaryLabel: 'SALARY', salary: '22,000', image: 'https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg?auto=compress&w=600', cta: 'apply' },
  { id: '8', badge: 'Verified', category: 'Electrical', categoryColor: '#8d4f00', title: 'Industrial Electrician - High Voltage', company: 'Power Grid Rabat', icon: Zap, salaryLabel: 'SALARY', salary: '13,500', image: 'https://images.pexels.com/photos/257736/pexels-photo-257736.jpeg?auto=compress&w=600', cta: 'apply' },
]

const row3: Job[] = [
  { id: '9', badge: 'Verified', category: 'Site Management', categoryColor: '#8d4f00', title: 'Site Supervisor - Residential Complex', company: 'Prestige Build Co.', icon: HardHat, salaryLabel: 'SALARY', salary: '19,000', image: 'https://images.pexels.com/photos/1109541/pexels-photo-1109541.jpeg?auto=compress&w=600', cta: 'apply' },
  { id: '10', badge: 'Diamond Member', category: 'Finishing', categoryColor: '#605e58', title: 'Master Painter - Luxury Interiors', company: 'Elite Interiors Rabat', icon: Layers, salaryLabel: 'SALARY', salary: '8,500', image: 'https://images.pexels.com/photos/4512155/pexels-photo-4512155.jpeg?auto=compress&w=600', cta: 'apply' },
  { id: '11', badge: 'Verified', category: 'Design', categoryColor: '#2dd4bf', title: 'CAD Drafter - Structural Layouts', company: 'CAD Solutions Morocco', icon: PenTool, salaryLabel: 'SALARY', salary: '12,000', image: 'https://images.pexels.com/photos/3862130/pexels-photo-3862130.jpeg?auto=compress&w=600', cta: 'apply' },
  { id: '12', badge: 'Diamond Member', category: 'Safety', categoryColor: '#8d4f00', title: 'Fire Safety Technician', company: 'SafeGuard Maroc', icon: Shield, salaryLabel: 'SALARY', salary: '10,500', image: 'https://images.pexels.com/photos/430208/pexels-photo-430208.jpeg?auto=compress&w=600', cta: 'apply' },
]

const row4: Job[] = [
  { id: '13', badge: 'Verified', category: 'Electrical', categoryColor: '#2dd4bf', title: 'HV Electrical Engineer', company: 'Volt Morocco', icon: Zap, salaryLabel: 'SALARY', salary: '24,000', image: 'https://images.pexels.com/photos/257736/pexels-photo-257736.jpeg?auto=compress&w=600', cta: 'apply' },
  { id: '14', badge: 'Diamond Member', category: 'Maintenance', categoryColor: '#605e58', title: 'Pool Maintenance Technician', company: 'Aqua Services Rabat', icon: Wrench, salaryLabel: 'SALARY', salary: '7,500', image: 'https://images.pexels.com/photos/1458457/pexels-photo-1458457.jpeg?auto=compress&w=600', cta: 'apply' },
  { id: '15', badge: 'Verified', category: 'Automation', categoryColor: '#8d4f00', title: 'PLC Programmer - Industrial Systems', company: 'AutoTech Maroc', icon: Cpu, salaryLabel: 'SALARY', salary: '18,000', image: 'https://images.pexels.com/photos/3862132/pexels-photo-3862132.jpeg?auto=compress&w=600', cta: 'apply' },
  { id: '16', badge: 'Diamond Member', category: 'Welding', categoryColor: '#605e58', title: 'Welder (Certified) - Pipeline Project', company: 'PipeWeld Rabat', icon: Hammer, salaryLabel: 'SALARY', salary: '11,500', image: 'https://images.pexels.com/photos/3822727/pexels-photo-3822727.jpeg?auto=compress&w=600', cta: 'apply' },
]

const row5: Job[] = [
  { id: '17', badge: 'Verified', category: 'Mechanic', categoryColor: '#8d4f00', title: 'Heavy Equipment Mechanic', company: 'MechPro Morocco', icon: Wrench, salaryLabel: 'SALARY', salary: '14,500', image: 'https://images.pexels.com/photos/3806288/pexels-photo-3806288.jpeg?auto=compress&w=600', cta: 'apply' },
  { id: '18', badge: 'Diamond Member', category: 'Surveying', categoryColor: '#2dd4bf', title: 'Land Surveyor - Infrastructure', company: 'GeoSurvey Rabat', icon: Anchor, salaryLabel: 'SALARY', salary: '16,000', image: 'https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg?auto=compress&w=600', cta: 'apply' },
  { id: '19', badge: 'Verified', category: 'Interiors', categoryColor: '#605e58', title: 'Interior Fit-out Specialist', company: 'LuxFit Maroc', icon: Layers, salaryLabel: 'SALARY', salary: '13,000', image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&w=600', cta: 'apply' },
  { id: '20', badge: 'Diamond Member', category: 'Logistics', categoryColor: '#2dd4bf', title: 'Logistics Manager - Supply Chain', company: 'BuildChain Morocco', icon: Truck, salaryLabel: 'SALARY', salary: '21,000', image: 'https://images.pexels.com/photos/906494/pexels-photo-906494.jpeg?auto=compress&w=600', cta: 'apply' },
]

function badgePill(badge: Job['badge']) {
  if (!badge) return null
  const isDiamond = badge === 'Diamond Member'
  return (
    <span style={{
      background: isDiamond ? 'linear-gradient(to right, #fbbf24, #f97316)' : 'rgba(0,107,95,0.9)',
      color: 'white', fontSize: '10px', fontWeight: 800,
      padding: '4px 8px', borderRadius: '6px',
      textTransform: 'uppercase' as const, letterSpacing: '0.03em',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    }}>{badge}</span>
  )
}

function JobCard({ job }: { job: Job }) {
  const [saved, setSaved] = useState(false)
  return (
    <article style={{ backgroundColor: 'white', borderRadius: '2.5rem', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', border: '1px solid rgba(186,202,197,0.1)', transition: 'box-shadow 0.3s, transform 0.3s' }}
      onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.1)'; e.currentTarget.style.transform = 'translateY(-4px)' }}
      onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.05)'; e.currentTarget.style.transform = 'translateY(0)' }}
    >
      <div style={{ position: 'relative', height: '192px', overflow: 'hidden' }}>
        <img src={job.image} alt={job.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }}
          onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
        />
        <div style={{ position: 'absolute', top: '16px', left: '16px' }}>{badgePill(job.badge)}</div>
        <button onClick={() => setSaved(!saved)} style={{ position: 'absolute', top: '16px', right: '16px', width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'rgba(0,0,0,0.2)', backdropFilter: 'blur(8px)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Heart size={15} color="white" fill={saved ? 'white' : 'none'} />
        </button>
      </div>
      <div style={{ padding: '24px' }}>
        <span style={{ color: job.categoryColor, fontWeight: 700, fontSize: '12px', textTransform: 'uppercase' as const, letterSpacing: '0.05em' }}>{job.category}</span>
        <h3 style={{ fontSize: '17px', fontWeight: 600, color: '#161d1b', margin: '4px 0 12px', lineHeight: 1.3, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' as const, overflow: 'hidden' }}>{job.title}</h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#3c4a46', marginBottom: '16px', fontSize: '13px' }}>
          <job.icon size={16} color="#2dd4bf" /> {job.company}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid rgba(186,202,197,0.1)', paddingTop: '16px' }}>
          <div>
            <div style={{ fontSize: '10px', color: '#6b7a76', fontWeight: 700, letterSpacing: '0.05em' }}>{job.salaryLabel}</div>
            <div style={{ fontSize: '22px', fontWeight: 800, color: job.badge === 'Diamond Member' ? '#3cddc7' : '#161d1b' }}>
              {job.salary}<span style={{ fontSize: '14px', fontWeight: 400, marginLeft: '4px' }}>{job.salarySuffix || 'MAD'}</span>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            {job.cta === 'apply' && (
              <>
                <button style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#eef5f2', border: 'none', cursor: 'pointer', color: '#2dd4bf', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><MessageCircle size={18} /></button>
                <button style={{ padding: '8px 16px', backgroundColor: '#2dd4bf', color: '#0f9b8e', borderRadius: '100px', border: 'none', fontWeight: 700, fontSize: '13px', cursor: 'pointer' }}>Apply Now</button>
              </>
            )}
            {job.cta === 'view' && (
              <button style={{ padding: '8px 24px', backgroundColor: '#2dd4bf', color: 'white', borderRadius: '100px', border: 'none', fontWeight: 700, fontSize: '13px', cursor: 'pointer' }}>View Detail</button>
            )}
          </div>
        </div>
      </div>
    </article>
  )
}

function JobGrid({ jobs, mb = 24 }: { jobs: Job[]; mb?: number }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '24px', marginBottom: `${mb}px` }}>
      {jobs.map(j => <JobCard key={j.id} job={j} />)}
    </div>
  )
}

export default function ConstructionJobsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = React.use(params)
  const [activePill, setActivePill] = useState('All Jobs')
  const [diamondFirst, setDiamondFirst] = useState(true)

  return (
    <div style={{ fontFamily: 'Hanken Grotesk, Inter, sans-serif', backgroundColor: '#f4fbf8', color: '#161d1b', minHeight: '100vh' }}>

      {/* ── HEADER LINE 1 ── */}

      {/* ── HERO ── */}
      <section style={{ position: 'relative', height: '480px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        <img src="https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg?auto=compress&w=1600" alt="Construction site Rabat" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.2), transparent, #f4fbf8)' }} />
        <div style={{ position: 'relative', zIndex: 10, textAlign: 'center' as const, maxWidth: '800px', padding: '0 24px' }}>
          <h1 style={{ color: 'white', fontSize: '48px', fontWeight: 700, marginBottom: '24px', lineHeight: 1.1, textShadow: '0 4px 12px rgba(0,0,0,0.4)' }}>Build Your Future in Rabat's Construction Industry</h1>
          <div style={{ maxWidth: '680px', margin: '0 auto', backgroundColor: 'rgba(255,255,255,0.65)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.4)', borderRadius: '100px', padding: '8px', display: 'flex', gap: '8px', boxShadow: '0 25px 50px rgba(0,0,0,0.2)' }}>
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '10px', padding: '0 16px', borderRight: '1px solid rgba(186,202,197,0.3)' }}>
              <Search size={17} color="#2dd4bf" />
              <input placeholder="Job title, skill, or construction firm..." style={{ border: 'none', outline: 'none', background: 'transparent', width: '100%', fontFamily: 'inherit', fontSize: '14px', padding: '12px 0' }} />
            </div>
            <button style={{ backgroundColor: '#2dd4bf', color: '#0f9b8e', padding: '12px 32px', borderRadius: '100px', border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: '14px', whiteSpace: 'nowrap' as const }}>Search Jobs</button>
          </div>
        </div>
      </section>

      {/* ── FILTER BAR + PILLS ── */}
      <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 40px' }}>
        <div style={{ marginTop: '-64px', position: 'relative', zIndex: 30, marginBottom: '32px' }}>
          <div style={{ backgroundColor: 'rgba(255,255,255,0.65)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.4)', borderRadius: '2.5rem', padding: '16px', display: 'flex', flexWrap: 'wrap' as const, alignItems: 'center', gap: '12px', boxShadow: '0 20px 40px rgba(0,0,0,0.08)' }}>
            {[{ label: 'Neighborhood', value: 'All Rabat Neighborhoods' }, { label: 'Salary Range', value: 'Any Salary' }].map(f => (
              <div key={f.label} style={{ flex: 1, minWidth: '180px', padding: '0 16px', borderRight: '1px solid rgba(186,202,197,0.2)', display: 'flex', flexDirection: 'column' as const }}>
                <span style={{ fontSize: '10px', textTransform: 'uppercase' as const, color: '#6b7a76', fontWeight: 700 }}>{f.label}</span>
                <span style={{ fontSize: '14px', fontWeight: 500, cursor: 'pointer' }}>{f.value} <ChevronDown size={14} style={{ display: 'inline', verticalAlign: 'middle' }} /></span>
              </div>
            ))}
            <div style={{ flex: 1, minWidth: '140px', padding: '0 16px', display: 'flex', flexDirection: 'column' as const }}>
              <span style={{ fontSize: '10px', textTransform: 'uppercase' as const, color: '#6b7a76', fontWeight: 700 }}>More Filters</span>
              <span style={{ fontSize: '14px', fontWeight: 500, cursor: 'pointer' }}>Advanced ⚙</span>
            </div>
            <div style={{ width: '1px', height: '40px', backgroundColor: 'rgba(186,202,197,0.2)' }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '0 12px' }}>
              <span style={{ fontSize: '13px', color: '#3c4a46' }}>Diamond Verified First</span>
              <button onClick={() => setDiamondFirst(!diamondFirst)} style={{ width: '44px', height: '24px', borderRadius: '100px', backgroundColor: diamondFirst ? '#2dd4bf' : '#dde4e1', border: 'none', cursor: 'pointer', position: 'relative', flexShrink: 0 }}>
                <div style={{ position: 'absolute', top: '2px', left: diamondFirst ? '22px' : '2px', width: '20px', height: '20px', borderRadius: '50%', backgroundColor: 'white', transition: 'left 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }} />
              </button>
            </div>
          </div>
        </div>

        {/* PILLS + SORT */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', marginBottom: '48px', flexWrap: 'wrap' as const }}>
          <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: '10px' }}>
            {categoryPills.map(c => (
              <button key={c} onClick={() => setActivePill(c)} style={{ padding: '8px 20px', borderRadius: '100px', fontSize: '13px', fontWeight: activePill === c ? 700 : 400, cursor: 'pointer', border: activePill === c ? 'none' : '1px solid rgba(186,202,197,0.2)', backgroundColor: activePill === c ? '#2dd4bf' : '#eef5f2', color: activePill === c ? '#0f9b8e' : '#3c4a46' }}>{c}</button>
            ))}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#3c4a46', fontSize: '13px', whiteSpace: 'nowrap' as const, cursor: 'pointer' }}>
            Sort by: <span style={{ color: '#2dd4bf', fontWeight: 700 }}>Newest First</span> <ChevronDown size={16} />
          </div>
        </div>

        {/* ROWS 1 + 2 */}
        <JobGrid jobs={row1} />
        <JobGrid jobs={row2} mb={64} />

        {/* RECRUITER BANNER */}
        <section style={{ marginBottom: '48px' }}>
          <div style={{ position: 'relative', borderRadius: '2.5rem', overflow: 'hidden', height: '300px', display: 'flex', alignItems: 'center' }}>
            <img src="https://images.pexels.com/photos/1109541/pexels-photo-1109541.jpeg?auto=compress&w=1400" alt="Construction company" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,107,95,0.4)', backdropFilter: 'blur(2px)' }} />
            <div style={{ position: 'relative', zIndex: 1, padding: '0 48px', maxWidth: '580px' }}>
              <h2 style={{ color: 'white', fontSize: '40px', fontWeight: 700, marginBottom: '16px', lineHeight: 1.1 }}>Are you a Construction Company?</h2>
              <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '18px', marginBottom: '32px', lineHeight: 1.6 }}>Find your next star talent — 100% Free with a SouKni Construction Pro account. Reach top Moroccan experts today.</p>
              <div style={{ display: 'flex', gap: '16px' }}>
                <button style={{ backgroundColor: 'white', color: '#2dd4bf', padding: '12px 32px', borderRadius: '100px', border: 'none', fontWeight: 700, fontSize: '13px', cursor: 'pointer' }}>Get Started</button>
                <button style={{ border: '2px solid white', color: 'white', padding: '12px 32px', borderRadius: '100px', backgroundColor: 'transparent', fontWeight: 700, fontSize: '13px', cursor: 'pointer' }}>Learn More</button>
              </div>
            </div>
          </div>
        </section>

        {/* ROWS 3, 4, 5 */}
        <JobGrid jobs={row3} />
        <JobGrid jobs={row4} />
        <JobGrid jobs={row5} mb={64} />
      </section>

      {/* ── APP DOWNLOAD ── */}
      <section style={{ backgroundColor: '#e2eae7', padding: '64px 0', marginBottom: '0' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 40px', display: 'flex', flexWrap: 'wrap' as const, alignItems: 'center', justifyContent: 'space-between', gap: '48px' }}>
          <div style={{ maxWidth: '480px' }}>
            <h2 style={{ fontSize: '42px', fontWeight: 700, color: '#161d1b', marginBottom: '20px', lineHeight: 1.1 }}>Join the SouKni Family</h2>
            <p style={{ color: '#3c4a46', fontSize: '18px', lineHeight: 1.6, marginBottom: '40px' }}>Get the most powerful Moroccan construction job tool in your pocket. Real-time alerts, direct messaging, and advanced filters at your fingertips.</p>
            <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: '16px' }}>
              {[{ label: 'Download on', store: 'App Store', icon: '🛒' }, { label: 'Get it on', store: 'Google Play', icon: '▶' }].map(s => (
                <button key={s.store} style={{ backgroundColor: 'black', color: 'white', padding: '12px 24px', borderRadius: '12px', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ fontSize: '24px' }}>{s.icon}</span>
                  <div style={{ textAlign: 'left' as const }}>
                    <div style={{ fontSize: '10px', textTransform: 'uppercase' as const, fontWeight: 700 }}>{s.label}</div>
                    <div style={{ fontWeight: 700 }}>{s.store}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
          <div style={{ position: 'relative', width: '280px', flexShrink: 0 }}>
            <div style={{ position: 'absolute', inset: '-16px', backgroundColor: 'rgba(0,107,95,0.1)', borderRadius: '50%', filter: 'blur(40px)' }} />
            <div style={{ position: 'relative', width: '100%', aspectRatio: '9/16', backgroundColor: '#eef5f2', borderRadius: '2.5rem', overflow: 'hidden', border: '8px solid #161d1b', boxShadow: '0 25px 50px rgba(0,0,0,0.25)' }}>
              <img src="https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg?auto=compress&w=400" alt="App preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          </div>
        </div>
      </section>

      {/* ── AUTO PRO BANNER ── */}
      <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '64px 40px' }}>
        <div style={{ position: 'relative', borderRadius: '2.5rem', overflow: 'hidden', height: '300px', display: 'flex', alignItems: 'center' }}>
          <img src="https://images.pexels.com/photos/3806288/pexels-photo-3806288.jpeg?auto=compress&w=1400" alt="SouKni Auto Pro" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(2px)' }} />
          <div style={{ position: 'relative', zIndex: 1, padding: '0 48px', maxWidth: '560px' }}>
            <h2 style={{ color: 'white', fontSize: '40px', fontWeight: 700, marginBottom: '16px' }}>SouKni Auto Pro</h2>
            <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '18px', marginBottom: '32px', lineHeight: 1.6 }}>The ultimate platform for automotive professionals in Morocco. List your inventory and reach thousands of buyers.</p>
            <div style={{ display: 'flex', gap: '16px' }}>
              <button style={{ backgroundColor: '#2dd4bf', color: 'white', padding: '12px 32px', borderRadius: '100px', border: 'none', fontWeight: 700, cursor: 'pointer' }}>Get Started</button>
              <button style={{ border: '2px solid white', color: 'white', padding: '12px 32px', borderRadius: '100px', backgroundColor: 'transparent', fontWeight: 700, cursor: 'pointer' }}>Learn More</button>
            </div>
          </div>
          <Car size={180} color="white" style={{ position: 'absolute', right: '40px', bottom: '-10px', opacity: 0.08 }} />
        </div>
      </section>

      {/* ── FOOTER ── */}
    </div>
  )
}
