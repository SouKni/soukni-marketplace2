'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Heart, Search, MapPin, Globe, Bell, User, ChevronDown, MessageCircle, Car, Gem, Wrench, Zap, Wifi, Wind, Shield, Sun, Cpu, Droplets, Camera, Building2, Settings } from 'lucide-react'

const categoryPills = ['All Jobs', 'Elevator Tech', 'AC Tech', 'Internet Tech', 'Electrical Tech', 'Plumbing', 'CCTV Tech']

type Job = {
  id: string; badge: 'Verified' | 'Diamond' | null; category: string; title: string
  location: string; salary: string; icon: any; image: string
}

const jobsRow1: Job[] = [
  { id: '1', badge: 'Verified', category: 'Plumbing', title: 'Expert Plumber', location: 'Agdal, Rabat', salary: '6,500', icon: Droplets, image: 'https://images.pexels.com/photos/6419128/pexels-photo-6419128.jpeg?auto=compress&w=600' },
  { id: '2', badge: null, category: 'Electrical', title: 'Master Electrician', location: 'Hay Riad, Rabat', salary: '8,000', icon: Zap, image: 'https://images.pexels.com/photos/257736/pexels-photo-257736.jpeg?auto=compress&w=600' },
  { id: '3', badge: null, category: 'Tech', title: 'IT Support Specialist', location: 'Technopolis, Rabat', salary: '9,500', icon: Cpu, image: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&w=600' },
  { id: '4', badge: null, category: 'HVAC', title: 'HVAC Technician', location: 'Souissi, Rabat', salary: '7,200', icon: Wind, image: 'https://images.pexels.com/photos/8005397/pexels-photo-8005397.jpeg?auto=compress&w=600' },
]

const jobsRow2: Job[] = [
  { id: '5', badge: null, category: 'Maintenance', title: 'Appliance Repair Pro', location: 'Hassan, Rabat', salary: '5,800', icon: Wrench, image: 'https://images.pexels.com/photos/4792733/pexels-photo-4792733.jpeg?auto=compress&w=600' },
  { id: '6', badge: null, category: 'Tech', title: 'Smart Home Installer', location: 'Orangers, Rabat', salary: '10,000', icon: Wifi, image: 'https://images.pexels.com/photos/3183183/pexels-photo-3183183.jpeg?auto=compress&w=600' },
  { id: '7', badge: null, category: 'Auto', title: 'Vehicle Diagnostic Tech', location: 'Akkari, Rabat', salary: '7,500', icon: Car, image: 'https://images.pexels.com/photos/3806288/pexels-photo-3806288.jpeg?auto=compress&w=600' },
  { id: '8', badge: null, category: 'Garden', title: 'Irrigation Systems Pro', location: 'Embassies Area, Rabat', salary: '6,200', icon: Droplets, image: 'https://images.pexels.com/photos/1301856/pexels-photo-1301856.jpeg?auto=compress&w=600' },
]

const jobsRow3: Job[] = [
  { id: '9', badge: 'Verified', category: 'IT', title: 'Senior IT Architect', location: 'Hay Riad, Rabat', salary: '25,000', icon: Cpu, image: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&w=600' },
  { id: '10', badge: 'Diamond', category: 'Electrical', title: 'Industrial Electrician', location: 'Ain Sebaa, Rabat', salary: '12,500', icon: Zap, image: 'https://images.pexels.com/photos/257736/pexels-photo-257736.jpeg?auto=compress&w=600' },
  { id: '11', badge: 'Verified', category: 'Design', title: 'UX/UI Designer', location: 'Technopolis, Rabat', salary: '18,000', icon: Settings, image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&w=600' },
  { id: '12', badge: 'Verified', category: 'Solar', title: 'Solar Panel Tech', location: 'Souissi, Rabat', salary: '9,000', icon: Sun, image: 'https://images.pexels.com/photos/9799878/pexels-photo-9799878.jpeg?auto=compress&w=600' },
]

const jobsRow4: Job[] = [
  { id: '13', badge: 'Verified', category: 'Network', title: 'Network Engineer', location: 'Agdal, Rabat', salary: '16,500', icon: Wifi, image: 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&w=600' },
  { id: '14', badge: 'Diamond', category: 'HVAC', title: 'HVAC Project Lead', location: 'Hassan, Rabat', salary: '14,000', icon: Wind, image: 'https://images.pexels.com/photos/8005397/pexels-photo-8005397.jpeg?auto=compress&w=600' },
  { id: '15', badge: 'Verified', category: 'Data', title: 'Data Analyst', location: 'Technopolis, Rabat', salary: '15,000', icon: Cpu, image: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&w=600' },
  { id: '16', badge: 'Verified', category: 'Engineering', title: 'Civil Engineer', location: 'Orangers, Rabat', salary: '19,000', icon: Building2, image: 'https://images.pexels.com/photos/2219024/pexels-photo-2219024.jpeg?auto=compress&w=600' },
]

const jobsRow5: Job[] = [
  { id: '17', badge: 'Verified', category: 'Management', title: 'Project Manager', location: 'Hay Riad, Rabat', salary: '22,000', icon: Settings, image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&w=600' },
  { id: '18', badge: 'Diamond', category: 'Automation', title: 'Automation Specialist', location: 'Technopolis, Rabat', salary: '17,500', icon: Cpu, image: 'https://images.pexels.com/photos/3862132/pexels-photo-3862132.jpeg?auto=compress&w=600' },
  { id: '19', badge: 'Verified', category: 'Security', title: 'Security Systems Pro', location: 'Agdal, Rabat', salary: '11,000', icon: Shield, image: 'https://images.pexels.com/photos/430208/pexels-photo-430208.jpeg?auto=compress&w=600' },
  { id: '20', badge: 'Verified', category: 'Cloud', title: 'Cloud Architect', location: 'Hay Riad, Rabat', salary: '28,000', icon: Wifi, image: 'https://images.pexels.com/photos/1181271/pexels-photo-1181271.jpeg?auto=compress&w=600' },
]

const jobsRow6: Job[] = [
  { id: '21', badge: 'Verified', category: 'Solar', title: 'Solar EPC Manager', location: 'Rabat, Souissi', salary: '20,000', icon: Sun, image: 'https://images.pexels.com/photos/9799878/pexels-photo-9799878.jpeg?auto=compress&w=600' },
  { id: '22', badge: 'Diamond', category: 'CCTV', title: 'CCTV Lead Technician', location: 'Hay Riad, Rabat', salary: '8,500', icon: Camera, image: 'https://images.pexels.com/photos/430208/pexels-photo-430208.jpeg?auto=compress&w=600' },
  { id: '23', badge: 'Verified', category: 'Plumbing', title: 'Plumbing Supervisor', location: 'Agdal, Rabat', salary: '10,500', icon: Droplets, image: 'https://images.pexels.com/photos/6419128/pexels-photo-6419128.jpeg?auto=compress&w=600' },
  { id: '24', badge: 'Diamond', category: 'Automation', title: 'PLC Programmer', location: 'Technopolis, Rabat', salary: '21,000', icon: Cpu, image: 'https://images.pexels.com/photos/3862132/pexels-photo-3862132.jpeg?auto=compress&w=600' },
]

function badgeEl(badge: Job['badge']) {
  if (!badge) return null
  if (badge === 'Diamond') return (
    <span style={{ backgroundColor: 'rgba(255,172,90,0.2)', backdropFilter: 'blur(8px)', color: '#8d4f00', fontSize: '11px', fontWeight: 700, padding: '4px 10px', borderRadius: '100px', display: 'flex', alignItems: 'center', gap: '4px' }}>
      <Gem size={12} /> Diamond
    </span>
  )
  return (
    <span style={{ backgroundColor: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(8px)', color: '#2dd4bf', fontSize: '11px', fontWeight: 700, padding: '4px 10px', borderRadius: '100px', display: 'flex', alignItems: 'center', gap: '4px' }}>
      ✓ Verified
    </span>
  )
}

function JobCard({ job }: { job: Job }) {
  const [saved, setSaved] = useState(false)
  return (
    <div style={{ backgroundColor: 'white', borderRadius: '1.5rem', overflow: 'hidden', display: 'flex', flexDirection: 'column' as const, transition: 'transform 0.3s, box-shadow 0.3s', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}
      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.08)' }}
      onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.06)' }}
    >
      <div style={{ height: '192px', position: 'relative', overflow: 'hidden' }}>
        <img src={job.image} alt={job.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }}
          onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.05)')}
          onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
        />
        <div style={{ position: 'absolute', top: '16px', left: '16px', display: 'flex', gap: '8px' }}>
          <span style={{ backgroundColor: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(8px)', color: '#2dd4bf', fontSize: '11px', fontWeight: 700, padding: '4px 10px', borderRadius: '100px' }}>{job.category}</span>
          {badgeEl(job.badge)}
        </div>
        <button onClick={() => setSaved(!saved)} style={{ position: 'absolute', top: '16px', right: '16px', width: '36px', height: '36px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.8)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Heart size={16} color="#2dd4bf" fill={saved ? '#2dd4bf' : 'none'} />
        </button>
      </div>
      <div style={{ padding: '24px', display: 'flex', flexDirection: 'column' as const, flex: 1 }}>
        <h4 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '8px', color: '#161d1b' }}>{job.title}</h4>
        <p style={{ color: '#3c4a46', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '16px' }}>
          <MapPin size={14} color="#2dd4bf" /> {job.location}
        </p>
        <div style={{ fontSize: '22px', fontWeight: 800, color: '#2dd4bf', marginBottom: '24px' }}>
          {job.salary} MAD <span style={{ fontSize: '14px', fontWeight: 400, color: '#3c4a46' }}>/ month</span>
        </div>
        <div style={{ marginTop: 'auto', display: 'flex', gap: '8px' }}>
          <button style={{ flex: 1, backgroundColor: '#2dd4bf', color: 'white', padding: '12px', borderRadius: '12px', border: 'none', fontWeight: 700, fontSize: '14px', cursor: 'pointer' }}>Apply Now</button>
          <button style={{ padding: '12px', backgroundColor: '#eef5f2', borderRadius: '12px', border: 'none', cursor: 'pointer', color: '#2dd4bf', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <MessageCircle size={20} />
          </button>
        </div>
      </div>
    </div>
  )
}

function JobGrid({ jobs }: { jobs: Job[] }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '16px' }}>
      {jobs.map(job => <JobCard key={job.id} job={job} />)}
    </div>
  )
}

export default function HandymanJobsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = React.use(params)
  const [activePill, setActivePill] = useState('All Jobs')

  return (
    <div style={{ fontFamily: 'Hanken Grotesk, Inter, sans-serif', backgroundColor: '#f4fbf8', color: '#161d1b', minHeight: '100vh' }}>

      {/* HEADER */}

      {/* HERO */}
      <section style={{ position: 'relative', height: '540px', paddingTop: '80px', overflow: 'hidden' }}>
        <img src="https://images.pexels.com/photos/3862130/pexels-photo-3862130.jpeg?auto=compress&w=1600" alt="Technical workspace" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(22,29,27,0.4) 0%, rgba(22,29,27,0.2) 100%)' }} />
        <div style={{ position: 'relative', zIndex: 10, height: '100%', display: 'flex', flexDirection: 'column' as const, alignItems: 'center', justifyContent: 'center', padding: '0 40px', textAlign: 'center' as const }}>
          <h1 style={{ color: 'white', fontSize: '48px', fontWeight: 700, marginBottom: '32px', textShadow: '0 4px 16px rgba(0,0,0,0.4)', maxWidth: '800px' }}>Expert Handyman &amp; Technician Jobs in Rabat</h1>
          <div style={{ width: '100%', maxWidth: '900px', backgroundColor: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '1.5rem', padding: '16px', display: 'flex', gap: '16px', boxShadow: '0 25px 50px rgba(0,0,0,0.25)' }}>
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '12px', backgroundColor: 'white', borderRadius: '12px', padding: '12px 20px', border: '1px solid rgba(186,202,197,0.3)' }}>
              <Search size={18} color="#2dd4bf" />
              <input placeholder="What role are you looking for?" style={{ border: 'none', outline: 'none', background: 'transparent', width: '100%', fontFamily: 'inherit', fontSize: '15px', color: '#161d1b' }} />
            </div>
            <button style={{ backgroundColor: '#2dd4bf', color: 'white', padding: '16px 40px', borderRadius: '12px', border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: '15px', whiteSpace: 'nowrap' as const }}>Search</button>
          </div>
        </div>
      </section>

      {/* FILTER BAR + CATEGORY PILLS */}
      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 40px' }}>
        <section style={{ marginTop: '-40px', position: 'relative', zIndex: 20, marginBottom: '32px' }}>
          <div style={{ backgroundColor: 'white', borderRadius: '100px', padding: '8px', display: 'flex', alignItems: 'center', boxShadow: '0 20px 40px rgba(0,0,0,0.08)', border: '1px solid rgba(186,202,197,0.1)' }}>
            {[
              { icon: MapPin, label: 'City', value: 'Rabat' },
              { icon: MapPin, label: 'Neighborhood', value: 'Agdal' },
              { icon: null, label: 'Salary', value: 'Range' },
              { icon: null, label: 'Filters', value: '2 Applied' },
            ].map((f, i) => (
              <div key={f.label} style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 24px', borderRight: i < 3 ? '1px solid rgba(186,202,197,0.3)' : 'none', cursor: 'pointer' }}>
                {f.icon && <f.icon size={16} color="#2dd4bf" />}
                <div>
                  <div style={{ fontSize: '10px', textTransform: 'uppercase' as const, color: '#6b7a76', fontWeight: 700, letterSpacing: '0.08em' }}>{f.label}</div>
                  <div style={{ fontWeight: 600, fontSize: '14px', color: '#161d1b' }}>{f.value}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CATEGORY PILLS */}
        <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: '12px', marginBottom: '32px' }}>
          {categoryPills.map(c => (
            <button key={c} onClick={() => setActivePill(c)}
              style={{ padding: '8px 24px', borderRadius: '100px', fontSize: '13px', fontWeight: 600, border: 'none', cursor: 'pointer',
                backgroundColor: activePill === c ? '#2dd4bf' : 'rgba(45,212,191,0.15)', color: activePill === c ? 'white' : '#161d1b',
                backdropFilter: 'blur(8px)', border: activePill === c ? 'none' : '1px solid rgba(45,212,191,0.3)' }}>
              {c}
            </button>
          ))}
        </div>

        {/* RECRUITER BANNER */}
        <section style={{ marginBottom: '48px' }}>
          <div style={{ backgroundColor: 'rgba(45,212,191,0.1)', border: '2px solid rgba(45,212,191,0.2)', borderRadius: '1.5rem', padding: '32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '24px', flexWrap: 'wrap' as const }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
              <div style={{ width: '64px', height: '64px', backgroundColor: '#2dd4bf', borderRadius: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 16px rgba(45,212,191,0.3)', flexShrink: 0 }}>
                <Wrench size={32} color="#0f9b8e" />
              </div>
              <div>
                <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#0f9b8e', marginBottom: '4px' }}>Are you a Service Company?</h2>
                <p style={{ color: '#3c4a46', fontSize: '15px' }}>Find Your Next Star Technician — 100% Free Ads for Recruiters.</p>
              </div>
            </div>
            <button style={{ backgroundColor: '#2dd4bf', color: 'white', padding: '16px 40px', borderRadius: '100px', border: 'none', fontWeight: 700, fontSize: '14px', cursor: 'pointer', boxShadow: '0 8px 24px rgba(0,107,95,0.3)', whiteSpace: 'nowrap' as const }}>
              Post a FREE Recruitment Ad
            </button>
          </div>
        </section>

        {/* TOP OPPORTUNITIES HEADER */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
          <h3 style={{ fontSize: '24px', fontWeight: 700 }}>Top Opportunities in Rabat</h3>
          <a href="#" style={{ color: '#2dd4bf', fontWeight: 700, fontSize: '14px', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}>View all 1,420 jobs →</a>
        </div>

        {/* ROW 1 + 2 */}
        <JobGrid jobs={jobsRow1} />
        <JobGrid jobs={jobsRow2} />

        {/* DIAMOND BANNER */}
        <section style={{ marginBottom: '16px' }}>
          <div style={{ background: 'linear-gradient(90deg, #161d1b, #3c4a46)', borderRadius: '1.5rem', height: '128px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 48px', overflow: 'hidden', position: 'relative' }}>
            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at center, rgba(255,255,255,0.05), transparent)', pointerEvents: 'none' }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px', position: 'relative', zIndex: 1 }}>
              <div style={{ width: '64px', height: '64px', border: '1px solid rgba(255,172,90,0.3)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Gem size={36} color="#ffac5a" />
              </div>
              <div>
                <h4 style={{ color: 'white', fontSize: '20px', fontWeight: 700, marginBottom: '4px' }}>Diamond Recruitment Membership</h4>
                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px' }}>Get unlimited job posts and priority placement in search results.</p>
              </div>
            </div>
            <button style={{ position: 'relative', zIndex: 1, backgroundColor: 'white', color: '#161d1b', padding: '12px 32px', borderRadius: '100px', border: 'none', fontWeight: 700, fontSize: '14px', cursor: 'pointer', transition: 'transform 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
              Upgrade Now
            </button>
          </div>
        </section>

        {/* DUAL SPLIT: APP DOWNLOAD + AUTO PRO */}
        <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
          {/* APP DOWNLOAD */}
          <div style={{ backgroundColor: '#2dd4bf', borderRadius: '1.5rem', padding: '40px', minHeight: '220px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'relative', zIndex: 1, maxWidth: '60%' }}>
              <h4 style={{ color: 'white', fontSize: '28px', fontWeight: 700, marginBottom: '16px', lineHeight: 1.2 }}>Join the SouKni Family</h4>
              <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '14px', marginBottom: '24px' }}>Download the app for instant notifications on new technician jobs in Rabat.</p>
              <div style={{ display: 'flex', gap: '12px' }}>
                <button style={{ backgroundColor: 'black', color: 'white', padding: '10px 20px', borderRadius: '12px', border: 'none', cursor: 'pointer', fontSize: '13px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
                  📱 App Store
                </button>
                <button style={{ backgroundColor: 'black', color: 'white', padding: '10px 20px', borderRadius: '12px', border: 'none', cursor: 'pointer', fontSize: '13px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
                  ▶ Play Store
                </button>
              </div>
            </div>
            <div style={{ position: 'absolute', right: '-32px', bottom: '-32px', width: '200px', height: '200px', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '1.5rem', transform: 'rotate(12deg)' }} />
          </div>
          {/* AUTO PRO */}
          <div style={{ backgroundColor: '#e8efec', borderRadius: '1.5rem', padding: '40px', minHeight: '220px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '24px' }}>
            <div>
              <h4 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '8px', color: '#161d1b' }}>SouKni Auto Pro</h4>
              <p style={{ color: '#3c4a46', fontSize: '14px', marginBottom: '24px' }}>Professional car detailing and maintenance specialists across Rabat.</p>
              <button style={{ backgroundColor: '#2dd4bf', color: 'white', padding: '12px 32px', borderRadius: '100px', border: 'none', fontWeight: 700, fontSize: '14px', cursor: 'pointer' }}>Discover More</button>
            </div>
            <div style={{ width: '120px', height: '120px', backgroundColor: 'rgba(0,107,95,0.1)', borderRadius: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Car size={56} color="#2dd4bf" />
            </div>
          </div>
        </section>

        {/* ROWS 3, 4, 5, 6 */}
        <div style={{ marginTop: '48px', marginBottom: '32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h3 style={{ fontSize: '24px', fontWeight: 700 }}>Specialist Technical Roles</h3>
          <a href="#" style={{ color: '#2dd4bf', fontWeight: 700, fontSize: '14px', textDecoration: 'none' }}>View all →</a>
        </div>
        <JobGrid jobs={jobsRow3} />
        <JobGrid jobs={jobsRow4} />
        <JobGrid jobs={jobsRow5} />
        <div style={{ marginBottom: '48px' }}><JobGrid jobs={jobsRow6} /></div>

        {/* FINAL AUTO PRO CINEMATIC BANNER */}
        <section style={{ marginBottom: '64px' }}>
          <div style={{ position: 'relative', borderRadius: '1.5rem', overflow: 'hidden', height: '280px', display: 'flex', alignItems: 'center' }}>
            <img src="https://images.pexels.com/photos/3806288/pexels-photo-3806288.jpeg?auto=compress&w=1400" alt="Auto Pro" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(2px)' }} />
            <div style={{ position: 'relative', zIndex: 1, padding: '0 48px', maxWidth: '560px' }}>
              <h2 style={{ color: 'white', fontSize: '32px', fontWeight: 700, marginBottom: '16px' }}>SouKni Auto Pro</h2>
              <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '17px', marginBottom: '32px', lineHeight: 1.6 }}>The ultimate platform for automotive professionals in Morocco. List your inventory and reach thousands of buyers.</p>
              <div style={{ display: 'flex', gap: '16px' }}>
                <button style={{ backgroundColor: '#2dd4bf', color: 'white', padding: '14px 36px', borderRadius: '100px', border: 'none', fontWeight: 700, fontSize: '14px', cursor: 'pointer', transition: 'transform 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
                  Get Started
                </button>
                <button style={{ border: '2px solid white', color: 'white', padding: '14px 36px', borderRadius: '100px', backgroundColor: 'transparent', fontWeight: 700, fontSize: '14px', cursor: 'pointer' }}>Learn More</button>
              </div>
            </div>
            <Car size={200} color="white" style={{ position: 'absolute', right: '40px', bottom: '-20px', opacity: 0.08 }} />
          </div>
        </section>
      </div>

      {/* FOOTER */}

      {/* FAB */}
      <button style={{ position: 'fixed', bottom: '40px', right: '40px', width: '64px', height: '64px', backgroundColor: '#2dd4bf', color: 'white', borderRadius: '50%', border: 'none', cursor: 'pointer', fontSize: '32px', boxShadow: '0 8px 32px rgba(0,107,95,0.4)', zIndex: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'transform 0.2s' }}
        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
        +
      </button>
    </div>
  )
}
