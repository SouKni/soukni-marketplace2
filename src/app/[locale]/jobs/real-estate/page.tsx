'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Heart, Search, MapPin, Globe, DollarSign, Bell, User, ChevronDown, Sliders, MessageCircle, Phone, ChevronRight, Building2, Briefcase, Megaphone, Key, Banknote, Scale, GraduationCap, Calculator, Handshake, TrendingUp, Settings, Edit3, Star, Car } from 'lucide-react'

const categoryPills = ['All Roles', 'Sales', 'Management', 'Admin', 'Legal', 'Technical', 'HR']

type Job = {
  id: string; badge: 'Diamond Member' | 'Verified' | 'New Opening'; category: string; categoryColor: string
  title: string; company: string; icon: any; salary: string; salarySuffix?: string; image: string; cta: 'apply' | 'view' | 'chevron'
}

const jobsRow1: Job[] = [
  { id: '1', badge: 'Diamond Member', category: 'Luxury Residential', categoryColor: '#2dd4bf', title: 'Senior Property Consultant - Hay Riad', company: 'Prestige Realty Rabat', icon: Building2, salary: '15,000', image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&w=600', cta: 'apply' },
  { id: '2', badge: 'New Opening', category: 'Management', categoryColor: '#8d4f00', title: 'Agency Branch Manager - Agdal District', company: 'Atlas Global Living', icon: Briefcase, salary: '22,500', salarySuffix: '+', image: 'https://images.pexels.com/photos/380769/pexels-photo-380769.jpeg?auto=compress&w=600', cta: 'apply' },
  { id: '3', badge: 'Verified', category: 'Marketing', categoryColor: '#605e58', title: 'Real Estate Marketing Specialist (Digital)', company: 'Rabat Estate Marketing', icon: Megaphone, salary: '12,000', image: 'https://images.pexels.com/photos/3760067/pexels-photo-3760067.jpeg?auto=compress&w=600', cta: 'chevron' },
  { id: '4', badge: 'Diamond Member', category: 'Luxury Rentals', categoryColor: '#2dd4bf', title: 'Luxury Rental Portfolio Manager - Souissi', company: 'Exclusive Rabat Living', icon: Key, salary: '18,000', salarySuffix: '+ Comm', image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&w=600', cta: 'view' },
]

const jobsRow2: Job[] = [
  { id: '5', badge: 'Diamond Member', category: 'Commercial', categoryColor: '#2dd4bf', title: 'Senior Property Negotiator', company: 'Rabat Prime Estates', icon: Building2, salary: '14,500', salarySuffix: '+', image: 'https://images.pexels.com/photos/3760607/pexels-photo-3760607.jpeg?auto=compress&w=600', cta: 'apply' },
  { id: '6', badge: 'Verified', category: 'Leasing', categoryColor: '#8d4f00', title: 'Commercial Leasing Agent', company: 'Atlas Realty Group', icon: Building2, salary: '12,000', salarySuffix: '+', image: 'https://images.pexels.com/photos/1170412/pexels-photo-1170412.jpeg?auto=compress&w=600', cta: 'apply' },
  { id: '7', badge: 'Diamond Member', category: 'Sales', categoryColor: '#605e58', title: 'Residential Sales Manager', company: 'Morocco Luxury Homes', icon: Key, salary: '18,500', salarySuffix: '+', image: 'https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg?auto=compress&w=600', cta: 'apply' },
  { id: '8', badge: 'Verified', category: 'Portfolio', categoryColor: '#2dd4bf', title: 'Real Estate Portfolio Manager', company: 'Capital Assets Rabat', icon: Banknote, salary: '21,000', salarySuffix: '+', image: 'https://images.pexels.com/photos/3760069/pexels-photo-3760069.jpeg?auto=compress&w=600', cta: 'apply' },
]

const jobsRow3: Job[] = [
  { id: '9', badge: 'Diamond Member', category: 'Investment', categoryColor: '#8d4f00', title: 'Investment Property Analyst', company: 'Global Invest Rabat', icon: TrendingUp, salary: '16,000', salarySuffix: '+', image: 'https://images.pexels.com/photos/669610/pexels-photo-669610.jpeg?auto=compress&w=600', cta: 'apply' },
  { id: '10', badge: 'Verified', category: 'Operations', categoryColor: '#605e58', title: 'Agency Operations Coordinator', company: 'Elite Property Services', icon: Settings, salary: '11,500', salarySuffix: '+', image: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&w=600', cta: 'apply' },
  { id: '11', badge: 'Diamond Member', category: 'Marketing', categoryColor: '#2dd4bf', title: 'Real Estate Content Strategist', company: 'SouKni Media Partners', icon: Edit3, salary: '13,000', salarySuffix: '+', image: 'https://images.pexels.com/photos/3756879/pexels-photo-3756879.jpeg?auto=compress&w=600', cta: 'apply' },
  { id: '12', badge: 'Verified', category: 'Executive', categoryColor: '#8d4f00', title: 'Regional Sales Director', company: 'Pan-African Realty', icon: Star, salary: '35,000', salarySuffix: '+', image: 'https://images.pexels.com/photos/1422290/pexels-photo-1422290.jpeg?auto=compress&w=600', cta: 'apply' },
]

const jobsRow4: Job[] = [
  { id: '13', badge: 'Diamond Member', category: 'Legal', categoryColor: '#605e58', title: 'Real Estate Legal Counsel', company: 'Rabat Law Associates', icon: Scale, salary: '25,000', salarySuffix: '+', image: 'https://images.pexels.com/photos/5668858/pexels-photo-5668858.jpeg?auto=compress&w=600', cta: 'apply' },
  { id: '14', badge: 'Verified', category: 'Training', categoryColor: '#2dd4bf', title: 'Sales Training Manager', company: 'Academy of Real Estate', icon: GraduationCap, salary: '17,000', salarySuffix: '+', image: 'https://images.pexels.com/photos/256401/pexels-photo-256401.jpeg?auto=compress&w=600', cta: 'apply' },
  { id: '15', badge: 'Diamond Member', category: 'Valuation', categoryColor: '#8d4f00', title: 'Senior Property Valuer', company: 'Rabat Valuation Experts', icon: Calculator, salary: '19,000', salarySuffix: '+', image: 'https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg?auto=compress&w=600', cta: 'apply' },
  { id: '16', badge: 'Verified', category: 'Customer Success', categoryColor: '#605e58', title: 'Client Relations Manager', company: 'SouKni Concierge', icon: Handshake, salary: '15,500', salarySuffix: '+', image: 'https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg?auto=compress&w=600', cta: 'apply' },
]

function badgeStyle(badge: Job['badge']) {
  if (badge === 'Diamond Member') return { background: 'linear-gradient(to right, #fbbf24, #f97316)', color: 'white' }
  if (badge === 'New Opening') return { background: 'rgba(0,107,95,0.9)', color: 'white' }
  return { background: 'rgba(0,107,95,0.9)', color: 'white' }
}

function JobCard({ job }: { job: Job }) {
  const [saved, setSaved] = useState(false)
  return (
    <article style={{ backgroundColor: 'white', borderRadius: '2.5rem', overflow: 'hidden', boxShadow: '0 1px 2px rgba(0,0,0,0.04)', border: '1px solid rgba(186,202,197,0.1)', transition: 'box-shadow 0.3s' }}
      onMouseEnter={e => e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0,0,0,0.1)'}
      onMouseLeave={e => e.currentTarget.style.boxShadow = '0 1px 2px rgba(0,0,0,0.04)'}
    >
      <div style={{ position: 'relative', height: '192px', overflow: 'hidden' }}>
        <img src={job.image} alt={job.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <span style={{ position: 'absolute', top: '16px', left: '16px', ...badgeStyle(job.badge), fontSize: '10px', fontWeight: 800, padding: '4px 8px', borderRadius: '6px', textTransform: 'uppercase' as const }}>{job.badge}</span>
        <button onClick={() => setSaved(!saved)} style={{ position: 'absolute', top: '16px', right: '16px', width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'rgba(0,0,0,0.2)', backdropFilter: 'blur(8px)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
          <Heart size={16} color="white" fill={saved ? 'white' : 'none'} />
        </button>
      </div>
      <div style={{ padding: '24px' }}>
        <span style={{ color: job.categoryColor, fontWeight: 700, fontSize: '12px', textTransform: 'uppercase' as const, letterSpacing: '0.05em' }}>{job.category}</span>
        <h3 style={{ fontSize: '17px', fontWeight: 600, color: '#161d1b', marginTop: '4px', marginBottom: '12px', lineHeight: 1.3, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' as const, overflow: 'hidden' }}>{job.title}</h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#3c4a46', marginBottom: '16px' }}>
          <job.icon size={18} />
          <span style={{ fontSize: '13px' }}>{job.company}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid rgba(186,202,197,0.1)', paddingTop: '16px' }}>
          <div style={{ display: 'flex', flexDirection: 'column' as const }}>
            <span style={{ fontSize: '10px', color: '#6b7a76', fontWeight: 700 }}>SALARY</span>
            <span style={{ fontSize: '22px', fontWeight: 800, color: '#161d1b' }}>{job.salary}<span style={{ fontSize: '14px', marginLeft: '4px' }}>{job.salarySuffix}</span></span>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            {job.cta === 'apply' && (
              <>
                <button style={{ width: '40px', height: '40px', borderRadius: '50%', border: '1px solid rgba(186,202,197,0.3)', backgroundColor: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#2dd4bf' }}><MessageCircle size={18} /></button>
                <button style={{ padding: '8px 16px', backgroundColor: '#2dd4bf', color: '#0f9b8e', borderRadius: '100px', border: 'none', fontWeight: 700, fontSize: '13px', cursor: 'pointer' }}>Apply Now</button>
              </>
            )}
            {job.cta === 'chevron' && (
              <>
                <button style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#eef5f2', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#2dd4bf', border: 'none' }}><MessageCircle size={18} /></button>
                <button style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#2dd4bf', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'white', border: 'none' }}><ChevronRight size={18} /></button>
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

export default function RealEstateJobsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = React.use(params)
  const [activePill, setActivePill] = useState('All Roles')
  const [diamondFirst, setDiamondFirst] = useState(true)

  return (
    <div style={{ fontFamily: 'Hanken Grotesk, Inter, sans-serif', backgroundColor: '#f4fbf8', color: '#161d1b', minHeight: '100vh' }}>

      {/* HEADER LINE 1 */}

      <main>
        {/* HERO */}
        <section style={{ position: 'relative', height: '480px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
          <img src="https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&w=1600" alt="Real estate office" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.2), transparent, #f4fbf8)' }} />
          <div style={{ position: 'relative', zIndex: 10, textAlign: 'center' as const, maxWidth: '900px', padding: '0 16px' }}>
            <h1 style={{ color: 'white', fontSize: '48px', fontWeight: 700, marginBottom: '24px', textShadow: '0 4px 12px rgba(0,0,0,0.3)' }}>Unlock Your Future in Rabat's Property Market</h1>
            <div style={{ maxWidth: '700px', margin: '0 auto', backgroundColor: 'rgba(255,255,255,0.65)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.4)', borderRadius: '100px', padding: '8px', display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 25px 50px rgba(0,0,0,0.2)' }}>
              <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '12px', padding: '0 16px', borderRight: '1px solid rgba(186,202,197,0.3)' }}>
                <Search size={18} color="#2dd4bf" />
                <input placeholder="Job title, skills, or agency name..." style={{ border: 'none', outline: 'none', background: 'transparent', width: '100%', fontFamily: 'inherit', fontSize: '14px', padding: '12px 0' }} />
              </div>
              <button style={{ backgroundColor: '#2dd4bf', color: '#0f9b8e', padding: '12px 32px', borderRadius: '100px', border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: '14px' }}>Search Jobs</button>
            </div>
          </div>
        </section>

        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 40px' }}>

          {/* FILTER BAR */}
          <section style={{ marginTop: '-64px', position: 'relative', zIndex: 30, marginBottom: '32px' }}>
            <div style={{ backgroundColor: 'rgba(255,255,255,0.65)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.4)', borderRadius: '2.5rem', padding: '16px', display: 'flex', flexWrap: 'wrap' as const, alignItems: 'center', gap: '16px', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }}>
              {[
                { label: 'Neighborhood', value: 'All Rabat Neighborhoods' },
                { label: 'Salary Range', value: 'Any Salary' },
              ].map(f => (
                <div key={f.label} style={{ flex: 1, minWidth: '200px', padding: '0 16px', borderRight: '1px solid rgba(186,202,197,0.2)', display: 'flex', flexDirection: 'column' as const }}>
                  <span style={{ fontSize: '10px', textTransform: 'uppercase' as const, color: '#6b7a76', fontWeight: 700 }}>{f.label}</span>
                  <span style={{ fontSize: '14px', fontWeight: 500 }}>{f.value}</span>
                </div>
              ))}
              <div style={{ flex: 1, minWidth: '150px', padding: '0 16px', display: 'flex', flexDirection: 'column' as const }}>
                <span style={{ fontSize: '10px', textTransform: 'uppercase' as const, color: '#6b7a76', fontWeight: 700 }}>More Filters</span>
                <span style={{ fontSize: '14px', fontWeight: 500, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>Advanced <Sliders size={16} /></span>
              </div>
              <div style={{ width: '1px', height: '40px', backgroundColor: 'rgba(186,202,197,0.2)' }} />
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '0 16px' }}>
                <span style={{ fontSize: '13px', color: '#3c4a46' }}>Diamond Verified First</span>
                <button onClick={() => setDiamondFirst(!diamondFirst)} style={{ width: '44px', height: '24px', borderRadius: '100px', backgroundColor: diamondFirst ? '#2dd4bf' : '#dde4e1', position: 'relative', border: 'none', cursor: 'pointer' }}>
                  <div style={{ position: 'absolute', top: '2px', left: diamondFirst ? '22px' : '2px', width: '20px', height: '20px', borderRadius: '50%', backgroundColor: 'white', transition: 'left 0.2s' }} />
                </button>
              </div>
            </div>
          </section>

          {/* CATEGORY PILLS */}
          <section style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', overflowX: 'auto' as const, paddingBottom: '8px', marginBottom: '32px', flexWrap: 'wrap' as const, gap: '16px' }}>
            <div style={{ display: 'flex', gap: '12px' }}>
              {categoryPills.map(c => (
                <button key={c} onClick={() => setActivePill(c)}
                  style={{ whiteSpace: 'nowrap' as const, padding: '8px 24px', borderRadius: '100px', fontSize: '14px', fontWeight: activePill === c ? 700 : 400, cursor: 'pointer', border: activePill === c ? 'none' : '1px solid rgba(186,202,197,0.2)',
                    backgroundColor: activePill === c ? '#2dd4bf' : '#eef5f2', color: activePill === c ? '#0f9b8e' : '#3c4a46' }}>
                  {c}
                </button>
              ))}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#3c4a46', whiteSpace: 'nowrap' as const }}>
              <span style={{ fontSize: '13px' }}>Sort by: <span style={{ color: '#2dd4bf', fontWeight: 700 }}>Newest First</span></span>
              <ChevronDown size={18} />
            </div>
          </section>

          {/* ROW 1 */}
          <section style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px', marginBottom: '64px' }}>
            {jobsRow1.map(job => <JobCard key={job.id} job={job} />)}
          </section>

          {/* RECRUITER BANNER */}
          <section style={{ marginBottom: '64px' }}>
            <div style={{ position: 'relative', height: '300px', borderRadius: '2.5rem', overflow: 'hidden', display: 'flex', alignItems: 'center' }}>
              <img src="https://images.pexels.com/photos/2901209/pexels-photo-2901209.jpeg?auto=compress&w=1400" alt="Rabat skyline" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,107,95,0.4)', backdropFilter: 'blur(2px)' }} />
              <div style={{ position: 'relative', zIndex: 1, padding: '0 48px', maxWidth: '600px' }}>
                <h2 style={{ color: 'white', fontSize: '36px', fontWeight: 700, marginBottom: '16px' }}>Are you a Real Estate Agency?</h2>
                <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '18px', marginBottom: '32px' }}>Boost your recruitment drive with a SouKni Immo Pro account. Reach the top talent in Morocco today.</p>
                <div style={{ display: 'flex', gap: '16px' }}>
                  <button style={{ backgroundColor: 'white', color: '#2dd4bf', padding: '12px 32px', borderRadius: '100px', border: 'none', fontWeight: 700, fontSize: '13px', cursor: 'pointer' }}>Get Started</button>
                  <button style={{ border: '2px solid white', color: 'white', padding: '12px 32px', borderRadius: '100px', backgroundColor: 'transparent', fontWeight: 700, fontSize: '13px', cursor: 'pointer' }}>Learn More</button>
                </div>
              </div>
            </div>
          </section>

          {/* ROWS 2, 3, 4 */}
          <section style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px', marginBottom: '24px' }}>
            {jobsRow2.map(job => <JobCard key={job.id} job={job} />)}
          </section>
          <section style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px', marginBottom: '24px' }}>
            {jobsRow3.map(job => <JobCard key={job.id} job={job} />)}
          </section>
          <section style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px', marginBottom: '64px' }}>
            {jobsRow4.map(job => <JobCard key={job.id} job={job} />)}
          </section>

        </div>

        {/* APP DOWNLOAD BANNER */}
        <section style={{ backgroundColor: '#e2eae7', padding: '64px 0' }}>
          <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 40px', display: 'flex', flexWrap: 'wrap' as const, alignItems: 'center', justifyContent: 'space-between', gap: '48px' }}>
            <div style={{ maxWidth: '500px', textAlign: 'left' as const }}>
              <h2 style={{ fontSize: '40px', fontWeight: 700, marginBottom: '24px' }}>Join the SouKni Family</h2>
              <p style={{ color: '#3c4a46', fontSize: '18px', marginBottom: '40px', lineHeight: 1.6 }}>Get the most powerful Moroccan real estate tool in your pocket. Real-time alerts, direct messaging, and advanced filters at your fingertips.</p>
              <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: '16px' }}>
                <div style={{ backgroundColor: 'black', color: 'white', padding: '12px 24px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
                  <div><p style={{ fontSize: '9px', textTransform: 'uppercase' as const, fontWeight: 700, margin: 0 }}>Download on</p><p style={{ fontWeight: 700, margin: 0 }}>App Store</p></div>
                </div>
                <div style={{ backgroundColor: 'black', color: 'white', padding: '12px 24px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
                  <div><p style={{ fontSize: '9px', textTransform: 'uppercase' as const, fontWeight: 700, margin: 0 }}>Get it on</p><p style={{ fontWeight: 700, margin: 0 }}>Google Play</p></div>
                </div>
              </div>
            </div>
            <div style={{ position: 'relative', width: '320px', flexShrink: 0 }}>
              <div style={{ position: 'absolute', inset: '-16px', backgroundColor: 'rgba(0,107,95,0.1)', borderRadius: '50%', filter: 'blur(48px)' }} />
              <div style={{ position: 'relative', width: '100%', aspectRatio: '9/16', backgroundColor: 'white', borderRadius: '2.5rem', overflow: 'hidden', boxShadow: '0 25px 50px rgba(0,0,0,0.2)', border: '8px solid #161d1b' }}>
                <img src="https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&w=400" alt="App preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            </div>
          </div>
        </section>

        {/* AUTO PRO BANNER */}
        <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '64px 40px' }}>
          <div style={{ position: 'relative', height: '300px', borderRadius: '2.5rem', overflow: 'hidden', display: 'flex', alignItems: 'center' }}>
            <img src="https://images.pexels.com/photos/63294/autos-technology-vw-multi-storey-car-park-63294.jpeg?auto=compress&w=1400" alt="Auto Pro" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(2px)' }} />
            <div style={{ position: 'relative', zIndex: 1, padding: '0 48px', maxWidth: '600px' }}>
              <h2 style={{ color: 'white', fontSize: '36px', fontWeight: 700, marginBottom: '16px' }}>SouKni Auto Pro</h2>
              <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '18px', marginBottom: '32px' }}>The ultimate platform for automotive professionals in Morocco. List your inventory and reach thousands of buyers.</p>
              <div style={{ display: 'flex', gap: '16px' }}>
                <button style={{ backgroundColor: '#2dd4bf', color: 'white', padding: '12px 32px', borderRadius: '100px', border: 'none', fontWeight: 700, fontSize: '13px', cursor: 'pointer' }}>Get Started</button>
                <button style={{ border: '2px solid white', color: 'white', padding: '12px 32px', borderRadius: '100px', backgroundColor: 'transparent', fontWeight: 700, fontSize: '13px', cursor: 'pointer' }}>Learn More</button>
              </div>
            </div>
            <Car size={180} color="white" style={{ position: 'absolute', right: '40px', bottom: '-20px', opacity: 0.1 }} />
          </div>
        </section>
      </main>

      {/* FOOTER */}
    </div>
  )
}
