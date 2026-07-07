'use client'

import { useState } from 'react'
import React from 'react'
import Link from 'next/link'
import { useMarket } from '@/context/MarketContext'
import { Search, Heart, MessageCircle, ChevronDown, Phone } from 'lucide-react'

/* ─── DATA ─────────────────────────────────────────────── */
const categoryPills = ['All Roles','Specialist Doctors','Surgeons','Nursing','Lab Research','Administration','Pharmacy']

type BadgeType = 'diamond' | 'verified' | 'none'
type CTAType = 'apply' | 'view' | 'whatsapp' | 'chat'

interface Job {
  id: string; badge: BadgeType; category: string; categoryColor: string
  title: string; company: string; companyIcon: string
  salary: number; salaryLabel: string; salaryExtra?: string
  image: string; cta: CTAType
}

const IMGS = [
  'https://images.pexels.com/photos/5327921/pexels-photo-5327921.jpeg?auto=compress&w=600',
  'https://images.pexels.com/photos/4173251/pexels-photo-4173251.jpeg?auto=compress&w=600',
  'https://images.pexels.com/photos/3259629/pexels-photo-3259629.jpeg?auto=compress&w=600',
  'https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg?auto=compress&w=600',
  'https://images.pexels.com/photos/5214961/pexels-photo-5214961.jpeg?auto=compress&w=600',
  'https://images.pexels.com/photos/4225880/pexels-photo-4225880.jpeg?auto=compress&w=600',
  'https://images.pexels.com/photos/4021775/pexels-photo-4021775.jpeg?auto=compress&w=600',
  'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&w=600',
]

const allJobs: Job[] = [
  // Grid 1 — rows 1-2
  { id:'m1', badge:'diamond', category:'Surgery', categoryColor:'#2dd4bf', title:'Chief Cardiothoracic Surgeon - Souissi Hospital', company:'Rabat Heart Institute', companyIcon:'❤️', salary:85000, salaryLabel:'MONTHLY SALARY', salaryExtra:'MAD', image:IMGS[0], cta:'whatsapp' },
  { id:'m2', badge:'verified', category:'Internal Medicine', categoryColor:'#8d4f00', title:'Specialist Pediatrician - Private Clinic Agdal', company:'HealthFirst Group', companyIcon:'🏥', salary:42500, salaryLabel:'ESTIMATED MAD', salaryExtra:'+', image:IMGS[1], cta:'apply' },
  { id:'m3', badge:'diamond', category:'Nursing', categoryColor:'#605e58', title:'Head of Clinical Nursing Operations', company:'Atlas Medical Center', companyIcon:'💊', salary:28000, salaryLabel:'SALARY', image:IMGS[2], cta:'chat' },
  { id:'m4', badge:'verified', category:'Diagnostics', categoryColor:'#2dd4bf', title:'Medical Laboratory Director - Research Center', company:'BioLab Rabat', companyIcon:'🔬', salary:38000, salaryLabel:'MONTHLY MAD', salaryExtra:'+', image:IMGS[3], cta:'view' },
  { id:'m5', badge:'none', category:'Executive', categoryColor:'#8d4f00', title:'Hospital Administrator - Executive Director', company:'Rabat Specialty Clinics', companyIcon:'🏛', salary:55000, salaryLabel:'SALARY', image:IMGS[4], cta:'apply' },
  { id:'m6', badge:'verified', category:'Pharmacy', categoryColor:'#2dd4bf', title:'Head Clinical Pharmacist - Regional Center', company:'PharmCare Rabat', companyIcon:'💉', salary:24500, salaryLabel:'SALARY', image:IMGS[5], cta:'apply' },
  { id:'m7', badge:'diamond', category:'Imaging', categoryColor:'#2dd4bf', title:'Consultant Radiologist - MRI Specialist', company:'Rayon Diagnostics', companyIcon:'📡', salary:48000, salaryLabel:'SALARY', image:IMGS[6], cta:'apply' },
  { id:'m8', badge:'verified', category:'Emergency', categoryColor:'#8d4f00', title:'Senior Emergency Medicine Physician', company:'CHU Ibn Sina Rabat', companyIcon:'🚑', salary:36000, salaryLabel:'MONTHLY MAD', image:IMGS[7], cta:'apply' },
  // Grid 2 — rows 3-4
  { id:'m9', badge:'diamond', category:'Oncology', categoryColor:'#2dd4bf', title:'Medical Oncologist - Chemotherapy Unit', company:'Cancer Care Rabat', companyIcon:'🎗', salary:72000, salaryLabel:'SALARY', image:IMGS[0], cta:'apply' },
  { id:'m10', badge:'verified', category:'Orthopaedics', categoryColor:'#605e58', title:'Orthopaedic Surgeon - Sports Medicine', company:'SportsMed Clinic', companyIcon:'🦴', salary:65000, salaryLabel:'SALARY', image:IMGS[1], cta:'apply' },
  { id:'m11', badge:'verified', category:'Neurology', categoryColor:'#8d4f00', title:'Neurologist - Memory & Brain Disorders', company:'Neurocenter Rabat', companyIcon:'🧠', salary:58000, salaryLabel:'MONTHLY MAD', image:IMGS[2], cta:'view' },
  { id:'m12', badge:'diamond', category:'Dermatology', categoryColor:'#2dd4bf', title:'Consultant Dermatologist - Private Practice', company:'SkinCare Elite', companyIcon:'✨', salary:45000, salaryLabel:'SALARY', image:IMGS[3], cta:'apply' },
  { id:'m13', badge:'none', category:'Nursing', categoryColor:'#605e58', title:'ICU Senior Nurse - Night Shift Lead', company:'Polyclinique Atlas', companyIcon:'🏥', salary:18500, salaryLabel:'MAD', image:IMGS[4], cta:'apply' },
  { id:'m14', badge:'verified', category:'Lab Research', categoryColor:'#2dd4bf', title:'Molecular Biology Researcher - Genomics Lab', company:'GenomicsMorocco', companyIcon:'🧬', salary:32000, salaryLabel:'SALARY', image:IMGS[5], cta:'apply' },
  { id:'m15', badge:'diamond', category:'Psychiatry', categoryColor:'#8d4f00', title:'Senior Psychiatrist - Mental Health Unit', company:'MindCare Rabat', companyIcon:'🧘', salary:52000, salaryLabel:'MONTHLY MAD', image:IMGS[6], cta:'apply' },
  { id:'m16', badge:'verified', category:'Administration', categoryColor:'#605e58', title:'Clinical Operations Director - Private Network', company:'CliniGroup Morocco', companyIcon:'📊', salary:44000, salaryLabel:'SALARY', image:IMGS[7], cta:'view' },
  // Grid 3 — rows 5-6
  { id:'m17', badge:'diamond', category:'Cardiology', categoryColor:'#2dd4bf', title:'Interventional Cardiologist - Cath Lab', company:'Heart Center Rabat', companyIcon:'💓', salary:80000, salaryLabel:'SALARY', image:IMGS[0], cta:'apply' },
  { id:'m18', badge:'verified', category:'Gynecology', categoryColor:'#8d4f00', title:'Senior OB-GYN Consultant', company:'Maternité Al Amal', companyIcon:'👶', salary:55000, salaryLabel:'MONTHLY MAD', image:IMGS[1], cta:'apply' },
  { id:'m19', badge:'none', category:'Physiotherapy', categoryColor:'#605e58', title:'Head of Physiotherapy Department', company:'RehabPro Agdal', companyIcon:'💪', salary:22000, salaryLabel:'SALARY', image:IMGS[2], cta:'apply' },
  { id:'m20', badge:'diamond', category:'Anesthesiology', categoryColor:'#2dd4bf', title:'Senior Anesthesiologist - Surgical Block', company:'CHU Mohammed V', companyIcon:'😴', salary:68000, salaryLabel:'MONTHLY MAD', image:IMGS[3], cta:'apply' },
  { id:'m21', badge:'verified', category:'Ophthalmology', categoryColor:'#8d4f00', title:'Consultant Ophthalmologist - Laser Surgery', company:'VisionPro Rabat', companyIcon:'👁', salary:48000, salaryLabel:'SALARY', image:IMGS[4], cta:'apply' },
  { id:'m22', badge:'verified', category:'Endocrinology', categoryColor:'#605e58', title:'Diabetes & Endocrine Specialist', company:'DiabetesCare Morocco', companyIcon:'🩺', salary:42000, salaryLabel:'SALARY', image:IMGS[5], cta:'view' },
  { id:'m23', badge:'diamond', category:'Nephrology', categoryColor:'#2dd4bf', title:'Renal Transplant Specialist - Dialysis Unit', company:'KidneyLife Center', companyIcon:'🫁', salary:74000, salaryLabel:'MONTHLY MAD', image:IMGS[6], cta:'apply' },
  { id:'m24', badge:'none', category:'Nursing', categoryColor:'#605e58', title:'Pediatric Nurse Specialist - NICU', company:'Children\'s Hospital Rabat', companyIcon:'👼', salary:16500, salaryLabel:'SALARY', image:IMGS[7], cta:'apply' },
  // Grid 4 — rows 7-8
  { id:'m25', badge:'verified', category:'Dentistry', categoryColor:'#2dd4bf', title:'Chief Dental Officer - Implantology Expert', company:'DentalElite Rabat', companyIcon:'🦷', salary:55000, salaryLabel:'SALARY', image:IMGS[0], cta:'apply' },
  { id:'m26', badge:'diamond', category:'Rheumatology', categoryColor:'#8d4f00', title:'Rheumatologist - Autoimmune Diseases', company:'JointCare Clinic', companyIcon:'🦴', salary:50000, salaryLabel:'MONTHLY MAD', image:IMGS[1], cta:'apply' },
  { id:'m27', badge:'verified', category:'Pulmonology', categoryColor:'#605e58', title:'Respiratory Medicine Consultant', company:'LungHealth Rabat', companyIcon:'🫁', salary:46000, salaryLabel:'SALARY', image:IMGS[2], cta:'apply' },
  { id:'m28', badge:'none', category:'Lab Research', categoryColor:'#2dd4bf', title:'Clinical Biochemist - Toxicology Lab', company:'LabNation Morocco', companyIcon:'⚗️', salary:28000, salaryLabel:'SALARY', image:IMGS[3], cta:'apply' },
  { id:'m29', badge:'diamond', category:'Urology', categoryColor:'#8d4f00', title:'Urologist - Robotic Surgery Specialist', company:'UroCare Souissi', companyIcon:'🔬', salary:62000, salaryLabel:'MONTHLY MAD', image:IMGS[4], cta:'view' },
  { id:'m30', badge:'verified', category:'Administration', categoryColor:'#605e58', title:'Medical Quality & Compliance Officer', company:'ISO Health Partners', companyIcon:'✅', salary:35000, salaryLabel:'SALARY', image:IMGS[5], cta:'apply' },
  { id:'m31', badge:'verified', category:'Pharmacy', categoryColor:'#2dd4bf', title:'Hospital Chief Pharmacist - Oncology Unit', company:'PharmOncology Rabat', companyIcon:'💊', salary:30000, salaryLabel:'SALARY', image:IMGS[6], cta:'apply' },
  { id:'m32', badge:'diamond', category:'Surgery', categoryColor:'#2dd4bf', title:'Laparoscopic Surgeon - Digestive Institute', company:'DigestiveCare Rabat', companyIcon:'🏥', salary:70000, salaryLabel:'MONTHLY MAD', image:IMGS[7], cta:'apply' },
]

/* ─── CARD ───────────────────────────────────────────────── */
function MedJobCard({ job }: { job: Job }) {
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
        transition: 'all 0.3s', cursor: 'pointer', display: 'flex', flexDirection: 'column' as const,
      }}
    >
      {/* Image */}
      <div style={{ position: 'relative', height: '176px', overflow: 'hidden' }}>
        <img src={job.image} alt={job.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s', transform: hovered ? 'scale(1.05)' : 'scale(1)' }}
        />
        {/* Badge */}
        <div style={{ position: 'absolute', top: '14px', left: '14px', display: 'flex', gap: '6px' }}>
          {job.badge === 'diamond' && (
            <span style={{ background: 'linear-gradient(135deg,#f59e0b,#ea580c)', color: 'white', fontSize: '9px', fontWeight: 900, padding: '4px 8px', borderRadius: '6px', textTransform: 'uppercase' as const, letterSpacing: '0.06em', boxShadow: '0 4px 12px rgba(245,158,11,0.3)' }}>Diamond Member</span>
          )}
          {job.badge === 'verified' && (
            <span style={{ backgroundColor: 'rgba(0,107,95,0.92)', color: 'white', fontSize: '9px', fontWeight: 700, padding: '4px 8px', borderRadius: '6px', textTransform: 'uppercase' as const, letterSpacing: '0.06em' }}>Verified Hospital</span>
          )}
        </div>
        {/* Save */}
        <button onClick={e => { e.stopPropagation(); setSaved(!saved) }}
          style={{ position: 'absolute', top: '12px', right: '12px', width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'rgba(0,0,0,0.22)', backdropFilter: 'blur(8px)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <Heart size={15} fill={saved ? '#ef4444' : 'none'} color="white" />
        </button>
      </div>

      {/* Content */}
      <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' as const }}>
        <span style={{ fontSize: '11px', fontWeight: 700, color: job.categoryColor, textTransform: 'uppercase' as const, letterSpacing: '0.1em' }}>{job.category}</span>
        <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#161d1b', margin: '6px 0 10px', lineHeight: 1.35, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' as const, overflow: 'hidden', minHeight: '42px' }}>{job.title}</h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#6b7a76', marginBottom: '14px', fontSize: '12px' }}>
          <span>{job.companyIcon}</span>
          <span style={{ fontWeight: 500 }}>{job.company}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid rgba(186,202,197,0.2)', paddingTop: '14px', marginTop: 'auto' }}>
          <div>
            <div style={{ fontSize: '9px', fontWeight: 700, color: '#6b7a76', textTransform: 'uppercase' as const, letterSpacing: '0.12em', marginBottom: '2px' }}>{job.salaryLabel}</div>
            <div style={{ fontSize: '20px', fontWeight: 900, color: job.salary >= 40000 ? '#2dd4bf' : '#161d1b', letterSpacing: '-0.02em', lineHeight: 1 }}>
              {job.salary.toLocaleString()}
              {job.salaryExtra && <span style={{ fontSize: '13px', fontWeight: 400, color: '#6b7a76', marginLeft: '3px' }}>{job.salaryExtra}</span>}
            </div>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            {job.cta === 'whatsapp' && (
              <button style={{ width: '38px', height: '38px', borderRadius: '50%', backgroundColor: '#25D366', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '18px' }}>📞</button>
            )}
            {job.cta === 'chat' && (
              <button style={{ width: '38px', height: '38px', borderRadius: '50%', backgroundColor: '#e8efec', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2dd4bf' }}>
                <MessageCircle size={16} />
              </button>
            )}
            {(job.cta === 'apply' || job.cta === 'view') && (
              <button style={{ backgroundColor: job.cta === 'view' ? '#2dd4bf' : '#2dd4bf', color: job.cta === 'view' ? 'white' : '#0f9b8e', border: 'none', padding: '10px 18px', borderRadius: '100px', fontSize: '12px', fontWeight: 700, cursor: 'pointer', transition: 'filter 0.15s', whiteSpace: 'nowrap' as const }}
                onMouseEnter={e => e.currentTarget.style.filter = 'brightness(1.08)'}
                onMouseLeave={e => e.currentTarget.style.filter = 'brightness(1)'}
              >{job.cta === 'view' ? 'View' : 'Apply Now'}</button>
            )}
          </div>
        </div>
      </div>
    </article>
  )
}

/* ─── PAGE ───────────────────────────────────────────────── */
export default function MedicalJobsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = React.use(params)
  const [activePill, setActivePill] = useState('All Roles')
  const [keyword, setKeyword] = useState('')
  const [diamondOnly, setDiamondOnly] = useState(true)

  return (
    <div style={{ fontFamily: 'Inter,system-ui,sans-serif', backgroundColor: '#f4fbf8', minHeight: '100vh' }}>

      {/* ── HERO ── */}
      <section style={{ position: 'relative', height: '480px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        <img src="https://images.pexels.com/photos/4386464/pexels-photo-4386464.jpeg?auto=compress&w=1600" alt="Medical Jobs"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(22,29,27,0.45) 0%, rgba(22,29,27,0.12) 60%, #f4fbf8 100%)' }} />
        <div style={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: '860px', padding: '80px 24px 0', textAlign: 'center' }}>
          <h1 style={{ fontSize: '48px', fontWeight: 800, color: 'white', marginBottom: '24px', letterSpacing: '-0.02em', lineHeight: 1.1, textShadow: '0 4px 20px rgba(0,0,0,0.3)' }}>
            Advance Your Medical Career in Rabat
          </h1>
          <div style={{ backgroundColor: 'rgba(255,255,255,0.65)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.4)', borderRadius: '100px', padding: '8px 8px 8px 0', display: 'flex', alignItems: 'center', boxShadow: '0 20px 60px rgba(0,0,0,0.12)' }}>
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 20px', borderRight: '1px solid rgba(186,202,197,0.3)' }}>
              <Search size={20} color="#2dd4bf" />
              <input type="text" value={keyword} onChange={e => setKeyword(e.target.value)}
                placeholder="Specialist Doctor, Registered Nurse, Lab Director..."
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

      {/* ── FILTERS + PILLS ── */}
      <div style={{ maxWidth: '1440px', margin: '-48px auto 0', padding: '0 40px', position: 'relative', zIndex: 30 }}>
        {/* Filter bar */}
        <div style={{ backgroundColor: 'rgba(255,255,255,0.68)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.45)', borderRadius: '40px', padding: '20px 24px', boxShadow: '0 12px 40px rgba(0,0,0,0.08)', display: 'flex', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap' as const }}>
          {[
            { label: 'Medical District', opts: ['All Rabat Districts', 'Souissi (Hospital Hub)', 'Agdal (Private Clinics)', 'Hay Riad (Specialized Centers)', 'Hassan (Public Health)'] },
            { label: 'Salary Range', opts: ['Any Salary', '10,000 - 20,000 MAD', '20,000 - 45,000 MAD', '50,000+ MAD'] },
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
            <span style={{ fontSize: '13px', fontWeight: 600, color: '#3c4a46', whiteSpace: 'nowrap' as const }}>Diamond Only</span>
            <div style={{ width: '44px', height: '24px', borderRadius: '100px', backgroundColor: diamondOnly ? '#2dd4bf' : '#dde4e1', position: 'relative', transition: 'background 0.25s', flexShrink: 0 }}>
              <div style={{ position: 'absolute', top: '2px', left: diamondOnly ? '22px' : '2px', width: '20px', height: '20px', borderRadius: '50%', backgroundColor: 'white', boxShadow: '0 1px 4px rgba(0,0,0,0.2)', transition: 'left 0.25s' }} />
            </div>
          </div>
        </div>

        {/* Pills + sort */}
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
            Sort by: <span style={{ color: '#2dd4bf', fontWeight: 700 }}>Featured First</span>
            <ChevronDown size={16} color="#2dd4bf" />
          </div>
        </div>
      </div>

      <main style={{ maxWidth: '1440px', margin: '0 auto', padding: '40px 40px 80px' }}>

        {/* ── GRID 1 — rows 1-2 (8 cards) ── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '20px', marginBottom: '48px' }}>
          {allJobs.slice(0, 8).map(job => <MedJobCard key={job.id} job={job} />)}
        </div>

        {/* ── DUAL BANNERS: App + Immo Pro ── */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '48px' }}>
          {/* Join SouKni Medical Family */}
          <div style={{ backgroundColor: '#e8efec', borderRadius: '40px', padding: '40px 44px', display: 'flex', flexDirection: 'column' as const, justifyContent: 'space-between', minHeight: '260px', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', right: '-50px', bottom: '-50px', width: '240px', height: '240px', backgroundColor: 'rgba(0,107,95,0.07)', borderRadius: '50%', filter: 'blur(40px)' }} />
            <div style={{ position: 'relative', zIndex: 1 }}>
              <h2 style={{ fontSize: '28px', fontWeight: 800, color: '#161d1b', marginBottom: '10px', letterSpacing: '-0.02em', lineHeight: 1.2 }}>Join the SouKni Medical Family</h2>
              <p style={{ color: '#6b7a76', fontSize: '15px', marginBottom: '24px', lineHeight: 1.6, maxWidth: '340px' }}>Get the most powerful Moroccan recruitment tool in your pocket. Real-time alerts for healthcare roles and advanced clinical filters.</p>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' as const }}>
                {[{ icon: '🍎', store: 'App Store', sub: 'Download on' }, { icon: '▶', store: 'Google Play', sub: 'Get it on' }].map(btn => (
                  <button key={btn.store} style={{ backgroundColor: '#0f172a', color: 'white', border: 'none', padding: '11px 18px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '13px', fontWeight: 600, transition: 'opacity 0.15s' }}
                    onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
                    onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                  ><span style={{ fontSize: '20px' }}>{btn.icon}</span>{btn.store}</button>
                ))}
              </div>
            </div>
          </div>

          {/* SouKni Immo Pro */}
          <div style={{ position: 'relative', borderRadius: '40px', overflow: 'hidden', minHeight: '260px' }}>
            <img src="https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&w=800" alt="Immo Pro"
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.35)', transition: 'transform 0.7s' }}
              onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
            />
            <div style={{ position: 'absolute', inset: 0, padding: '40px', display: 'flex', flexDirection: 'column' as const, justifyContent: 'center' }}>
              <h3 style={{ fontSize: '26px', fontWeight: 800, color: 'white', marginBottom: '10px' }}>SouKni Immo Pro</h3>
              <p style={{ color: 'rgba(255,255,255,0.82)', fontSize: '15px', marginBottom: '24px', lineHeight: 1.6, maxWidth: '300px' }}>The ultimate recruitment engine for Real Estate agencies in Morocco. Scale your brokerage with elite talent.</p>
              <button style={{ backgroundColor: '#2dd4bf', color: 'white', border: 'none', padding: '12px 24px', borderRadius: '100px', fontWeight: 700, fontSize: '14px', cursor: 'pointer', width: 'fit-content', transition: 'filter 0.15s' }}
                onMouseEnter={e => e.currentTarget.style.filter = 'brightness(1.1)'}
                onMouseLeave={e => e.currentTarget.style.filter = 'brightness(1)'}
              >Switch to Immo</button>
            </div>
          </div>
        </div>

        {/* ── GRID 2 — rows 3-4 ── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '20px', marginBottom: '48px' }}>
          {allJobs.slice(8, 16).map(job => <MedJobCard key={job.id} job={job} />)}
        </div>

        {/* ── DIAMOND HEALTHCARE PARTNERSHIP BANNER ── */}
        <div style={{ position: 'relative', borderRadius: '40px', overflow: 'hidden', height: '280px', display: 'flex', alignItems: 'center', marginBottom: '48px' }}>
          <img src="https://images.pexels.com/photos/236380/pexels-photo-236380.jpeg?auto=compress&w=1600" alt="Diamond Healthcare"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,107,95,0.62)', backdropFilter: 'blur(2px)' }} />
          <div style={{ position: 'relative', zIndex: 1, padding: '48px', maxWidth: '680px' }}>
            <h2 style={{ fontSize: '38px', fontWeight: 800, color: 'white', marginBottom: '14px', letterSpacing: '-0.02em', lineHeight: 1.2 }}>Diamond Healthcare Partnership</h2>
            <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '16px', marginBottom: '28px', lineHeight: 1.6 }}>Unlock priority recruitment status for your clinic. Access top-tier Moroccan healthcare professionals before they hit the general market.</p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button style={{ backgroundColor: 'white', color: '#2dd4bf', border: 'none', padding: '13px 28px', borderRadius: '100px', fontWeight: 700, fontSize: '14px', cursor: 'pointer', boxShadow: '0 8px 24px rgba(0,0,0,0.15)', transition: 'transform 0.2s' }}
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

        {/* ── GRID 3 — rows 5-6 ── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '20px', marginBottom: '48px' }}>
          {allJobs.slice(16, 24).map(job => <MedJobCard key={job.id} job={job} />)}
        </div>

        {/* ── FIND YOUR NEXT MEDICAL EXPERT BANNER ── */}
        <div style={{ position: 'relative', borderRadius: '40px', overflow: 'hidden', height: '280px', display: 'flex', alignItems: 'center', marginBottom: '48px' }}>
          <img src="https://images.pexels.com/photos/4386464/pexels-photo-4386464.jpeg?auto=compress&w=1600" alt="Recruiter Banner"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,107,95,0.52)', backdropFilter: 'blur(2px)' }} />
          <div style={{ position: 'relative', zIndex: 1, padding: '48px', maxWidth: '640px' }}>
            <h2 style={{ fontSize: '36px', fontWeight: 800, color: 'white', marginBottom: '14px', letterSpacing: '-0.02em', lineHeight: 1.2 }}>Find Your Next Medical Expert — 100% Free</h2>
            <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '16px', marginBottom: '28px', lineHeight: 1.6 }}>Connect with top-tier healthcare professionals in Rabat. Post your medical vacancy today and hire the best talent in Morocco.</p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button style={{ backgroundColor: 'white', color: '#2dd4bf', border: 'none', padding: '13px 28px', borderRadius: '100px', fontWeight: 700, fontSize: '14px', cursor: 'pointer', transition: 'transform 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.04)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
              >Get Started</button>
              <button style={{ border: '2px solid rgba(255,255,255,0.7)', color: 'white', backgroundColor: 'transparent', padding: '13px 28px', borderRadius: '100px', fontWeight: 700, fontSize: '14px', cursor: 'pointer' }}>Learn More</button>
            </div>
          </div>
        </div>

        {/* ── GRID 4 — rows 7-8 ── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '20px', marginBottom: '64px' }}>
          {allJobs.slice(24, 32).map(job => <MedJobCard key={job.id} job={job} />)}
        </div>

        {/* ── SOUKNI AUTO PRO ── */}
        <div style={{ position: 'relative', borderRadius: '40px', overflow: 'hidden', height: '280px', display: 'flex', alignItems: 'center' }}>
          <img src="https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg?auto=compress&w=1600" alt="Auto Pro"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(2px)' }} />
          <div style={{ position: 'relative', zIndex: 1, padding: '48px', maxWidth: '620px' }}>
            <h2 style={{ fontSize: '38px', fontWeight: 800, color: 'white', marginBottom: '14px', letterSpacing: '-0.02em', lineHeight: 1.2 }}>SouKni Auto Pro</h2>
            <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '16px', marginBottom: '28px', lineHeight: 1.6 }}>Cinematic solutions for medical fleet services in Morocco. Secure, reliable, and professional vehicle management for the healthcare sector.</p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button style={{ backgroundColor: '#2dd4bf', color: 'white', border: 'none', padding: '13px 28px', borderRadius: '100px', fontWeight: 700, fontSize: '14px', cursor: 'pointer', boxShadow: '0 8px 24px rgba(0,107,95,0.35)', transition: 'transform 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.04)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
              >Get Started</button>
              <button style={{ border: '2px solid rgba(255,255,255,0.7)', color: 'white', backgroundColor: 'transparent', padding: '13px 28px', borderRadius: '100px', fontWeight: 700, fontSize: '14px', cursor: 'pointer' }}>Learn More</button>
            </div>
          </div>
        </div>
      </main>

      {/* ── APP DOWNLOAD SECTION ── */}
      <section style={{ backgroundColor: '#e2eae7', padding: '80px 40px' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '48px', flexWrap: 'wrap' as const }}>
          <div style={{ maxWidth: '520px' }}>
            <h2 style={{ fontSize: '44px', fontWeight: 800, color: '#161d1b', marginBottom: '16px', letterSpacing: '-0.02em', lineHeight: 1.1 }}>Join the SouKni Medical Family</h2>
            <p style={{ fontSize: '17px', color: '#6b7a76', marginBottom: '36px', lineHeight: 1.7 }}>Get the most powerful Moroccan recruitment tool in your pocket. Real-time alerts for healthcare roles, direct messaging with specialists, and advanced clinical filters.</p>
            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' as const }}>
              {[{ icon: '🍎', store: 'App Store', sub: 'Download on' }, { icon: '▶', store: 'Google Play', sub: 'Get it on' }].map(btn => (
                <button key={btn.store} style={{ backgroundColor: '#0f172a', color: 'white', border: 'none', padding: '13px 22px', borderRadius: '14px', display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', transition: 'opacity 0.15s' }}
                  onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
                  onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                >
                  <span style={{ fontSize: '28px' }}>{btn.icon}</span>
                  <div>
                    <div style={{ fontSize: '9px', opacity: 0.6, textTransform: 'uppercase' as const, letterSpacing: '0.1em' }}>{btn.sub}</div>
                    <div style={{ fontSize: '16px', fontWeight: 700 }}>{btn.store}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
          {/* Phone mockup */}
          <div style={{ flexShrink: 0, position: 'relative' }}>
            <div style={{ position: 'absolute', inset: '-16px', backgroundColor: 'rgba(0,107,95,0.08)', borderRadius: '50%', filter: 'blur(40px)' }} />
            <div style={{ width: '200px', aspectRatio: '9/16', backgroundColor: '#0f172a', borderRadius: '32px', border: '8px solid #1e293b', overflow: 'hidden', position: 'relative', boxShadow: '0 24px 60px rgba(0,0,0,0.2)' }}>
              <img src="https://images.pexels.com/photos/5327921/pexels-photo-5327921.jpeg?auto=compress&w=400" alt="App Preview"
                style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.85 }}
              />
              <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '70px', height: '16px', backgroundColor: '#1e293b', borderRadius: '0 0 12px 12px' }} />
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}

      {/* Mobile Bottom Nav */}
      <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 50, backgroundColor: 'rgba(244,251,248,0.88)', backdropFilter: 'blur(20px)', borderTop: '1px solid rgba(186,202,197,0.2)', display: 'flex', justifyContent: 'space-around', alignItems: 'center', padding: '10px 16px 24px' }}>
        {[
          { icon: '🧭', label: 'Explore', active: false }, { icon: '🔍', label: 'Search', active: false },
          { icon: '+', label: '', isCenter: true }, { icon: '🏥', label: 'Jobs', active: true }, { icon: '👤', label: 'Profile', active: false },
        ].map((item, i) => (
          <div key={i} style={{ display: 'flex', flexDirection: 'column' as const, alignItems: 'center', gap: '2px', cursor: 'pointer', marginTop: item.isCenter ? '-20px' : '0' }}>
            {item.isCenter
              ? <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: '#2dd4bf', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', color: '#0f9b8e', fontWeight: 800, boxShadow: '0 4px 16px rgba(45,212,191,0.35)' }}>+</div>
              : <><span style={{ fontSize: '20px' }}>{item.icon}</span><span style={{ fontSize: '9px', fontWeight: 700, color: item.active ? '#2dd4bf' : '#6b7a76', textTransform: 'uppercase' as const, letterSpacing: '0.05em' }}>{item.label}</span></>
            }
          </div>
        ))}
      </div>
    </div>
  )
}
