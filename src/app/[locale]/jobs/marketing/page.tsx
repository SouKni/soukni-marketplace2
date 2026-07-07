'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Heart, Search, MapPin, Globe, Bell, User, ChevronDown, MessageCircle, Car, Gem, Megaphone, BarChart2, Palette, TrendingUp, Target, PenTool, Monitor, Video, Mail, Layers, Users, Rss, BarChart, Briefcase, Star, Lightbulb, Edit3, Database, Rocket } from 'lucide-react'

const categoryPills = ['All Roles', 'Marketing Director', 'Creative Director', 'Social Media Manager', 'SEO Specialist', 'PPC Expert', 'Brand Manager']

type Job = {
  id: string; badge: 'Verified' | 'Diamond' | 'New' | null
  title: string; location: string; salary: string; salaryUnit?: string; icon: any; image: string
}

const imgs = [
  'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&w=600',
  'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&w=600',
  'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&w=600',
  'https://images.pexels.com/photos/1181271/pexels-photo-1181271.jpeg?auto=compress&w=600',
  'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&w=600',
  'https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&w=600',
  'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&w=600',
  'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&w=600',
]

const block1: Job[] = [
  { id: '1', badge: 'Verified', title: 'Senior Social Media Strategist', location: 'Rabat Agdal', salary: '18,500', salaryUnit: '/ mo', icon: Rss, image: imgs[0] },
  { id: '2', badge: 'Diamond', title: 'Digital Growth Analyst', location: 'Technopolis, Rabat', salary: '22,000', salaryUnit: '/ mo', icon: BarChart2, image: imgs[1] },
  { id: '3', badge: 'New', title: 'Senior Art Director', location: 'Hay Riad, Rabat', salary: '35,000', salaryUnit: '/ mo', icon: Palette, image: imgs[2] },
  { id: '4', badge: 'Verified', title: 'Content Marketing Manager', location: 'Souissi, Rabat', salary: '15,000', salaryUnit: '/ mo', icon: Edit3, image: imgs[3] },
  { id: '5', badge: 'Diamond', title: 'SEO Technical Lead', location: 'Rabat Agdal', salary: '28,000', icon: TrendingUp, image: imgs[4] },
  { id: '6', badge: null, title: 'Performance Marketing Specialist', location: 'Hay Riad, Rabat', salary: '16,500', icon: Target, image: imgs[5] },
  { id: '7', badge: 'Verified', title: 'Brand Identity Designer', location: 'Souissi, Rabat', salary: '24,000', icon: PenTool, image: imgs[6] },
  { id: '8', badge: null, title: 'PPC Lead Strategist', location: 'Rabat Agdal', salary: '19,000', icon: BarChart, image: imgs[7] },
]

const block2: Job[] = [
  { id: '9', badge: null, title: 'Social Media Analyst', location: 'Technopolis, Rabat', salary: '12,000', icon: Rss, image: imgs[0] },
  { id: '10', badge: null, title: 'Email Marketing Lead', location: 'Hay Riad, Rabat', salary: '14,500', icon: Mail, image: imgs[1] },
  { id: '11', badge: null, title: 'Graphic Designer', location: 'Rabat Agdal', salary: '9,500', icon: Palette, image: imgs[2] },
  { id: '12', badge: null, title: 'Video Editor (Motion)', location: 'Souissi, Rabat', salary: '11,000', icon: Video, image: imgs[3] },
  { id: '13', badge: null, title: 'Copywriter', location: 'Rabat', salary: '10,000', icon: Edit3, image: imgs[4] },
  { id: '14', badge: null, title: 'Affiliate Manager', location: 'Technopolis', salary: '17,000', icon: Layers, image: imgs[5] },
  { id: '15', badge: null, title: 'Influencer Lead', location: 'Hay Riad', salary: '13,500', icon: Star, image: imgs[6] },
  { id: '16', badge: null, title: 'Web Analyst', location: 'Agdal', salary: '16,000', icon: Monitor, image: imgs[7] },
]

const block3: Job[] = [
  { id: '17', badge: null, title: 'Brand Strategist', location: 'Rabat', salary: '21,000', icon: Briefcase, image: imgs[0] },
  { id: '18', badge: null, title: 'Media Buyer', location: 'Agdal', salary: '18,000', icon: Target, image: imgs[1] },
  { id: '19', badge: null, title: 'UI Designer', location: 'Technopolis', salary: '20,000', icon: Layers, image: imgs[2] },
  { id: '20', badge: null, title: 'UX Researcher', location: 'Hay Riad', salary: '22,500', icon: Users, image: imgs[3] },
  { id: '21', badge: null, title: 'Growth Hacker', location: 'Rabat', salary: '19,500', icon: TrendingUp, image: imgs[4] },
  { id: '22', badge: null, title: 'CRM Manager', location: 'Souissi', salary: '17,500', icon: Database, image: imgs[5] },
  { id: '23', badge: null, title: 'Communications Lead', location: 'Agdal', salary: '16,000', icon: Megaphone, image: imgs[6] },
  { id: '24', badge: null, title: 'PR Executive', location: 'Rabat', salary: '15,000', icon: Rss, image: imgs[7] },
]

const block4: Job[] = [
  { id: '25', badge: null, title: 'Product Marketer', location: 'Technopolis', salary: '23,000', icon: Target, image: imgs[0] },
  { id: '26', badge: null, title: 'Creative Strategist', location: 'Hay Riad', salary: '25,000', icon: Lightbulb, image: imgs[1] },
  { id: '27', badge: null, title: 'Social Lead', location: 'Agdal', salary: '14,000', icon: Rss, image: imgs[2] },
  { id: '28', badge: null, title: 'Account Manager', location: 'Rabat', salary: '18,000', icon: Briefcase, image: imgs[3] },
  { id: '29', badge: null, title: 'Marketing Analyst', location: 'Souissi', salary: '16,500', icon: BarChart2, image: imgs[4] },
  { id: '30', badge: null, title: 'Creative Writer', location: 'Rabat', salary: '12,000', icon: Edit3, image: imgs[5] },
  { id: '31', badge: null, title: 'Data Strategist', location: 'Technopolis', salary: '20,000', icon: Database, image: imgs[6] },
  { id: '32', badge: null, title: 'Head of Growth', location: 'Hay Riad', salary: '38,000', icon: Rocket, image: imgs[7] },
]

function badgePill(badge: Job['badge']) {
  if (!badge) return null
  const styles: Record<string, { bg: string; color: string }> = {
    Diamond: { bg: 'rgba(255,172,90,0.2)', color: '#8d4f00' },
    Verified: { bg: 'rgba(255,255,255,0.7)', color: '#2dd4bf' },
    New: { bg: 'rgba(255,255,255,0.7)', color: '#2dd4bf' },
  }
  const s = styles[badge]
  return (
    <span style={{ backgroundColor: s.bg, backdropFilter: 'blur(8px)', border: badge === 'Diamond' ? '1px solid rgba(255,172,90,0.3)' : undefined, color: s.color, fontSize: '11px', fontWeight: 700, padding: '4px 10px', borderRadius: '100px' }}>
      {badge === 'Diamond' ? '◆ Diamond' : badge}
    </span>
  )
}

function JobCard({ job }: { job: Job }) {
  const [saved, setSaved] = useState(false)
  return (
    <div style={{ backgroundColor: 'white', borderRadius: '1.5rem', overflow: 'hidden', display: 'flex', flexDirection: 'column' as const, border: '1px solid rgba(186,202,197,0.1)', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', transition: 'transform 0.3s, box-shadow 0.3s' }}
      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.08)' }}
      onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.05)' }}
    >
      <div style={{ height: '224px', position: 'relative', overflow: 'hidden' }}>
        <img src={job.image} alt={job.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }}
          onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
        />
        {job.badge && <div style={{ position: 'absolute', top: '16px', left: '16px' }}>{badgePill(job.badge)}</div>}
        <button onClick={() => setSaved(!saved)} style={{ position: 'absolute', top: '16px', right: '16px', width: '36px', height: '36px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.8)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <Heart size={16} color="#2dd4bf" fill={saved ? '#2dd4bf' : 'none'} />
        </button>
      </div>
      <div style={{ padding: '24px', display: 'flex', flexDirection: 'column' as const, flex: 1 }}>
        <h4 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '8px', lineHeight: 1.3, color: '#161d1b' }}>{job.title}</h4>
        <p style={{ color: '#3c4a46', fontSize: '13px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '4px' }}>
          <MapPin size={14} color="#2dd4bf" /> {job.location}
        </p>
        <div style={{ fontSize: '22px', fontWeight: 800, color: '#2dd4bf', marginBottom: '24px' }}>
          {job.salary} MAD {job.salaryUnit && <span style={{ fontSize: '14px', fontWeight: 400, color: '#3c4a46' }}>{job.salaryUnit}</span>}
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
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '16px' }}>
      {jobs.map(j => <JobCard key={j.id} job={j} />)}
    </div>
  )
}

function AppImmoSplit() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', margin: '24px 0' }}>
      {/* App download */}
      <div style={{ backgroundColor: '#2dd4bf', borderRadius: '2.5rem', padding: '40px', minHeight: '220px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '65%' }}>
          <h4 style={{ color: 'white', fontSize: '28px', fontWeight: 700, marginBottom: '16px', lineHeight: 1.2 }}>Join the SouKni Family</h4>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '14px', marginBottom: '24px' }}>Download the app for instant notifications on new marketing jobs in Rabat.</p>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button style={{ backgroundColor: 'black', color: 'white', padding: '10px 20px', borderRadius: '12px', border: 'none', cursor: 'pointer', fontSize: '13px', fontWeight: 600 }}>📱 App Store</button>
            <button style={{ backgroundColor: 'black', color: 'white', padding: '10px 20px', borderRadius: '12px', border: 'none', cursor: 'pointer', fontSize: '13px', fontWeight: 600 }}>▶ Play Store</button>
          </div>
        </div>
        <div style={{ position: 'absolute', right: '-32px', bottom: '-32px', width: '200px', height: '200px', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '2.5rem', transform: 'rotate(12deg)' }} />
      </div>
      {/* Immo Pro */}
      <div style={{ position: 'relative', borderRadius: '2.5rem', overflow: 'hidden', minHeight: '220px', display: 'flex', alignItems: 'center', padding: '40px', justifyContent: 'space-between' }}>
        <img src="https://images.pexels.com/photos/1838640/pexels-photo-1838640.jpeg?auto=compress&w=800" alt="Immo Pro" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(2px)' }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <h4 style={{ color: 'white', fontSize: '22px', fontWeight: 700, marginBottom: '8px' }}>SouKni Immo Pro</h4>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '14px', marginBottom: '20px', maxWidth: '300px' }}>Premium real estate and maintenance specialists across Rabat and Casablanca.</p>
          <button style={{ backgroundColor: '#2dd4bf', color: '#0f9b8e', padding: '10px 24px', borderRadius: '100px', border: 'none', fontWeight: 700, cursor: 'pointer' }}>Discover More</button>
        </div>
        <div style={{ position: 'relative', zIndex: 1, width: '80px', height: '80px', backgroundColor: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(8px)', borderRadius: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(255,255,255,0.2)' }}>
          <span style={{ fontSize: '40px' }}>🏠</span>
        </div>
      </div>
    </div>
  )
}

function DiamondBanner() {
  return (
    <div style={{ backgroundColor: 'rgba(232,239,236,0.5)', border: '2px solid rgba(186,202,197,0.15)', borderRadius: '2.5rem', height: '128px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 48px', margin: '24px 0', overflow: 'hidden', position: 'relative' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '24px', position: 'relative', zIndex: 1 }}>
        <div style={{ width: '64px', height: '64px', backgroundColor: 'rgba(255,172,90,0.2)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(255,172,90,0.3)' }}>
          <Gem size={32} color="#8d4f00" />
        </div>
        <div>
          <h4 style={{ fontSize: '20px', fontWeight: 700, color: '#161d1b', marginBottom: '4px' }}>Diamond Agency Membership</h4>
          <p style={{ color: '#3c4a46', fontSize: '14px' }}>Get unlimited job posts and priority placement in marketing search results.</p>
        </div>
      </div>
      <button style={{ backgroundColor: '#2dd4bf', color: 'white', padding: '12px 32px', borderRadius: '100px', border: 'none', fontWeight: 700, fontSize: '14px', cursor: 'pointer', transition: 'transform 0.2s' }}
        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
        Upgrade Now
      </button>
    </div>
  )
}

function AutoProBanner() {
  return (
    <div style={{ position: 'relative', borderRadius: '2.5rem', height: '192px', background: 'linear-gradient(to right, #161d1b, #3c4a46)', display: 'flex', alignItems: 'center', padding: '0 48px', margin: '24px 0', overflow: 'hidden', cursor: 'pointer' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at center, rgba(45,212,191,0.1), transparent)', pointerEvents: 'none' }} />
      <div style={{ display: 'flex', alignItems: 'center', gap: '32px', position: 'relative', zIndex: 1 }}>
        <div style={{ width: '80px', height: '80px', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(255,255,255,0.15)', flexShrink: 0 }}>
          <Car size={40} color="#2dd4bf" />
        </div>
        <div>
          <h4 style={{ color: 'white', fontSize: '28px', fontWeight: 700, marginBottom: '8px' }}>SouKni Auto Pro</h4>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '16px', maxWidth: '560px' }}>Connecting Rabat's best automotive technicians with premium service centers. Expert diagnostics and mechanics.</p>
        </div>
      </div>
      <button style={{ marginLeft: 'auto', position: 'relative', zIndex: 1, backgroundColor: '#2dd4bf', color: 'white', padding: '14px 40px', borderRadius: '100px', border: 'none', fontWeight: 700, fontSize: '14px', cursor: 'pointer', boxShadow: '0 8px 24px rgba(0,107,95,0.3)', transition: 'transform 0.2s' }}
        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
        Join the Fleet
      </button>
    </div>
  )
}

export default function MarketingJobsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = React.use(params)
  const [activePill, setActivePill] = useState('All Roles')

  return (
    <div style={{ fontFamily: 'Hanken Grotesk, Inter, sans-serif', backgroundColor: '#f4fbf8', color: '#161d1b', minHeight: '100vh' }}>

      {/* ── HEADER ── */}

      {/* ── HERO ── */}
      <section style={{ position: 'relative', height: '640px', paddingTop: '80px', overflow: 'hidden' }}>
        <img src="https://images.pexels.com/photos/3183183/pexels-photo-3183183.jpeg?auto=compress&w=1600" alt="Creative agency Rabat" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(22,29,27,0.6) 0%, rgba(22,29,27,0.3) 100%)' }} />
        <div style={{ position: 'relative', zIndex: 10, height: '100%', display: 'flex', flexDirection: 'column' as const, alignItems: 'center', justifyContent: 'center', padding: '0 40px', textAlign: 'center' as const }}>
          <h1 style={{ color: 'white', fontSize: '48px', fontWeight: 700, marginBottom: '32px', maxWidth: '900px', lineHeight: 1.1, textShadow: '0 4px 12px rgba(0,0,0,0.4)' }}>Build Your Brand's Future in Rabat's Creative Industry</h1>
          <div style={{ width: '100%', maxWidth: '900px', backgroundColor: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.4)', borderRadius: '1.5rem', padding: '16px', display: 'flex', gap: '16px', boxShadow: '0 25px 50px rgba(0,0,0,0.2)' }}>
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '12px', backgroundColor: 'white', borderRadius: '12px', padding: '12px 20px', border: '1px solid rgba(186,202,197,0.3)' }}>
              <Search size={18} color="#2dd4bf" />
              <input placeholder="e.g. Creative Director or SEO Specialist" style={{ border: 'none', outline: 'none', background: 'transparent', width: '100%', fontFamily: 'inherit', fontSize: '15px', color: '#161d1b' }} />
            </div>
            <button style={{ backgroundColor: '#2dd4bf', color: 'white', height: '60px', padding: '0 40px', borderRadius: '12px', border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: '15px', whiteSpace: 'nowrap' as const }}>Search Jobs</button>
          </div>
        </div>
      </section>

      {/* ── FILTER BAR + PILLS ── */}
      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 40px' }}>
        <div style={{ marginTop: '-40px', position: 'relative', zIndex: 20, marginBottom: '32px' }}>
          <div style={{ backgroundColor: 'white', borderRadius: '100px', padding: '8px', display: 'flex', alignItems: 'center', boxShadow: '0 20px 40px rgba(0,0,0,0.08)', border: '1px solid rgba(186,202,197,0.1)' }}>
            {[
              { icon: MapPin, label: 'City', value: 'Rabat' },
              { icon: Briefcase, label: 'Industry', value: 'Marketing' },
              { icon: BarChart2, label: 'Salary', value: 'Competitive' },
              { icon: Target, label: 'Filters', value: 'Applied (3)' },
            ].map((f, i) => (
              <div key={f.label} style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 24px', borderRight: i < 3 ? '1px solid rgba(186,202,197,0.3)' : 'none', cursor: 'pointer' }}>
                <f.icon size={16} color="#2dd4bf" />
                <div>
                  <div style={{ fontSize: '10px', textTransform: 'uppercase' as const, color: '#6b7a76', fontWeight: 700, letterSpacing: '0.08em' }}>{f.label}</div>
                  <div style={{ fontWeight: 600, fontSize: '14px' }}>{f.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* PILLS */}
        <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: '10px', marginBottom: '32px' }}>
          {categoryPills.map(c => (
            <button key={c} onClick={() => setActivePill(c)} style={{ padding: '8px 20px', borderRadius: '100px', fontSize: '13px', fontWeight: activePill === c ? 700 : 400, cursor: 'pointer', border: activePill === c ? 'none' : '1px solid rgba(45,212,191,0.3)', backgroundColor: activePill === c ? '#2dd4bf' : 'rgba(45,212,191,0.15)', color: activePill === c ? 'white' : '#161d1b', backdropFilter: 'blur(8px)', whiteSpace: 'nowrap' as const }}>{c}</button>
          ))}
        </div>

        {/* SECTION HEADER */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
          <h3 style={{ fontSize: '24px', fontWeight: 700 }}>Top Creative Opportunities in Rabat</h3>
          <a href="#" style={{ color: '#2dd4bf', fontWeight: 700, fontSize: '14px', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}>View all 482 marketing roles →</a>
        </div>

        {/* ── INTERLEAVED CONTENT ── */}
        <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '0' }}>

          {/* BLOCK 1: 8 listings */}
          <JobGrid jobs={block1} />

          {/* INTERSTITIAL 1: App + Immo Pro */}
          <AppImmoSplit />

          {/* BLOCK 2: 8 listings */}
          <JobGrid jobs={block2} />

          {/* INTERSTITIAL 2: Diamond banner */}
          <DiamondBanner />

          {/* BLOCK 3: 8 listings */}
          <JobGrid jobs={block3} />

          {/* INTERSTITIAL 3: Auto Pro dark banner */}
          <AutoProBanner />

          {/* BLOCK 4: 8 listings */}
          <JobGrid jobs={block4} />
        </div>
      </div>

      {/* ── RECRUITER BANNER ── */}
      <section style={{ maxWidth: '1440px', margin: '48px auto 0', padding: '0 40px 32px' }}>
        <div style={{ backgroundColor: 'rgba(45,212,191,0.1)', border: '2px solid rgba(45,212,191,0.2)', borderRadius: '1.5rem', padding: '32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap' as const, gap: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <div style={{ width: '64px', height: '64px', backgroundColor: '#2dd4bf', borderRadius: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 16px rgba(45,212,191,0.3)', flexShrink: 0 }}>
              <Rocket size={32} color="#0f9b8e" />
            </div>
            <div>
              <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#0f9b8e', marginBottom: '4px' }}>Are you a Creative Agency?</h2>
              <p style={{ color: '#3c4a46', fontSize: '15px' }}>Find your next star talent — 100% Free Ads for Recruiters.</p>
            </div>
          </div>
          <button style={{ backgroundColor: '#2dd4bf', color: 'white', padding: '16px 40px', borderRadius: '100px', border: 'none', fontWeight: 700, fontSize: '14px', cursor: 'pointer', boxShadow: '0 8px 24px rgba(0,107,95,0.3)', whiteSpace: 'nowrap' as const }}>
            Post a FREE Recruitment Ad
          </button>
        </div>
      </section>

      {/* ── AUTO PRO (repeat, final) ── */}
      <section style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 40px 64px' }}>
        <AutoProBanner />
      </section>

      {/* ── FOOTER ── */}

      {/* FAB */}
      <button style={{ position: 'fixed', bottom: '40px', right: '40px', width: '64px', height: '64px', backgroundColor: '#2dd4bf', color: 'white', borderRadius: '50%', border: 'none', cursor: 'pointer', fontSize: '32px', boxShadow: '0 8px 32px rgba(0,107,95,0.4)', zIndex: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'transform 0.2s' }}
        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
        +
      </button>
    </div>
  )
}
