'use client'

import { useState } from 'react'
import React from 'react'
import Link from 'next/link'
import { useMarket } from '@/context/MarketContext'
import { Search, MapPin, ChevronDown, MessageCircle, Heart } from 'lucide-react'

/* ─── DATA ─────────────────────────────────────────────── */
const categoryPills = [
  'All Jobs', 'Home Cleaning', 'Office Cleaning', 'Housekeeper',
  'Laundry & Ironing', 'Childcare', 'Specialized Services',
]

const topJobs = [
  { id: 'j1', tag: 'Home Cleaning', title: 'Residential Housekeeper', location: 'Agdal, Rabat', salary: 4500, period: '/ mo', image: 'https://images.pexels.com/photos/4239091/pexels-photo-4239091.jpeg?auto=compress&w=600' },
  { id: 'j2', tag: 'Corporate', title: 'Office Cleaning Specialist', location: 'Hay Riad, Rabat', salary: 5000, period: '/ mo', image: 'https://images.pexels.com/photos/4099467/pexels-photo-4099467.jpeg?auto=compress&w=600' },
  { id: 'j3', tag: 'Deep Clean', title: 'Deep Cleaning Expert', location: 'Souissi, Rabat', salary: 6500, period: '/ mo', image: 'https://images.pexels.com/photos/4099354/pexels-photo-4099354.jpeg?auto=compress&w=600' },
  { id: 'j4', tag: 'Laundry', title: 'Elite Laundry Specialist', location: 'Centre Ville, Rabat', salary: 4800, period: '/ mo', image: 'https://images.pexels.com/photos/4239082/pexels-photo-4239082.jpeg?auto=compress&w=600' },
  { id: 'j5', tag: 'Hospitality', title: 'Hospitality Cleaning Pro', location: 'Hassan, Rabat', salary: 5200, period: '', image: 'https://images.pexels.com/photos/271639/pexels-photo-271639.jpeg?auto=compress&w=600' },
  { id: 'j6', tag: 'Windows', title: 'Window & Facade Tech', location: 'Technopolis, Rabat', salary: 6000, period: '', image: 'https://images.pexels.com/photos/4099467/pexels-photo-4099467.jpeg?auto=compress&w=600' },
  { id: 'j7', tag: 'Post-Con', title: 'Post-Construction Cleaner', location: 'Sale El Jadida, Rabat', salary: 5500, period: '', image: 'https://images.pexels.com/photos/4099354/pexels-photo-4099354.jpeg?auto=compress&w=600' },
  { id: 'j8', tag: 'Premium', title: 'Premium Riad Housekeeper', location: 'Medina, Rabat', salary: 7000, period: '', image: 'https://images.pexels.com/photos/4239091/pexels-photo-4239091.jpeg?auto=compress&w=600' },
]

const specializedRoles = [
  { icon: '🏭', title: 'Industrial Cleaning Pro', location: 'Industrial Zone, Rabat', salary: 8000 },
  { icon: '🏊', title: 'Pool Maintenance Tech', location: 'Souissi Villas, Rabat', salary: 6000 },
  { icon: '🧹', title: 'Carpet Cleaning Expert', location: 'Agdal, Rabat', salary: 5500 },
  { icon: '🌿', title: 'Green Cleaning Consultant', location: 'Hay Riad, Rabat', salary: 9500 },
  { icon: '⛵', title: 'Yacht Cleaning Specialist', location: 'Marina, Rabat-Sale', salary: 10000 },
  { icon: '🏥', title: 'Medical Facility Custodian', location: 'Hospital Zone, Rabat', salary: 7200 },
  { icon: '🍽', title: 'Kitchen Hygiene Tech', location: 'Centre Ville, Rabat', salary: 6500 },
  { icon: '🎓', title: 'Educational Facility Pro', location: 'Irkhane, Rabat', salary: 5000 },
]

/* ─── JOB CARD ───────────────────────────────────────────── */
function JobCard({ job }: { job: any }) {
  const [saved, setSaved] = useState(false)
  const [hovered, setHovered] = useState(false)
  const { formatPrice } = useMarket()

  return (
    <article
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        backgroundColor: 'white', borderRadius: '24px', overflow: 'hidden',
        boxShadow: hovered ? '0 20px 40px rgba(0,0,0,0.1)' : '0 2px 8px rgba(0,0,0,0.04)',
        transition: 'all 0.3s', transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        display: 'flex', flexDirection: 'column' as const, cursor: 'pointer',
      }}
    >
      {/* Image */}
      <div style={{ height: '176px', position: 'relative', overflow: 'hidden' }}>
        <img src={job.image} alt={job.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s', transform: hovered ? 'scale(1.05)' : 'scale(1)' }}
        />
        {/* Tag */}
        <div style={{ position: 'absolute', top: '14px', left: '14px', backgroundColor: 'rgba(255,255,255,0.75)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.5)', padding: '4px 12px', borderRadius: '100px', fontSize: '11px', fontWeight: 700, color: '#2dd4bf' }}>
          {job.tag}
        </div>
        {/* Save */}
        <button onClick={e => { e.stopPropagation(); setSaved(!saved) }}
          style={{ position: 'absolute', top: '12px', right: '12px', width: '34px', height: '34px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.8)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <Heart size={15} fill={saved ? '#ef4444' : 'none'} color={saved ? '#ef4444' : '#161d1b'} />
        </button>
        {/* FAB+ on card 4 */}
        {job.id === 'j4' && (
          <div style={{ position: 'absolute', bottom: '-16px', right: '16px', width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#2dd4bf', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 800, fontSize: '20px', boxShadow: '0 4px 12px rgba(0,107,95,0.3)', zIndex: 5 }}>+</div>
        )}
      </div>

      {/* Content */}
      <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' as const }}>
        <h4 style={{ fontSize: '17px', fontWeight: 800, color: '#161d1b', marginBottom: '8px', lineHeight: 1.3 }}>{job.title}</h4>
        <p style={{ fontSize: '13px', color: '#6b7a76', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '4px' }}>
          <MapPin size={13} color="#2dd4bf" /> {job.location}
        </p>
        <div style={{ fontSize: '22px', fontWeight: 900, color: '#2dd4bf', marginBottom: '20px', letterSpacing: '-0.01em' }}>
          {formatPrice(job.salary)}
          {job.period && <span style={{ fontSize: '14px', fontWeight: 400, color: '#6b7a76' }}> {job.period}</span>}
        </div>
        <div style={{ display: 'flex', gap: '8px', marginTop: 'auto' }}>
          <button style={{ flex: 1, backgroundColor: '#2dd4bf', color: 'white', border: 'none', padding: '12px', borderRadius: '12px', fontSize: '14px', fontWeight: 700, cursor: 'pointer', transition: 'filter 0.15s' }}
            onMouseEnter={e => e.currentTarget.style.filter = 'brightness(1.1)'}
            onMouseLeave={e => e.currentTarget.style.filter = 'brightness(1)'}
          >Apply Now</button>
          <button style={{ width: '46px', height: '46px', backgroundColor: '#e8efec', border: 'none', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#2dd4bf', transition: 'background 0.15s', flexShrink: 0 }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#dde4e1'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = '#e8efec'}
          ><MessageCircle size={18} /></button>
        </div>
      </div>
    </article>
  )
}

/* ─── SPECIALIZED CARD ───────────────────────────────────── */
function SpecializedCard({ role }: { role: any }) {
  const [hovered, setHovered] = useState(false)
  const { formatPrice } = useMarket()

  return (
    <article
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        backgroundColor: 'white', borderRadius: '24px', padding: '24px',
        boxShadow: hovered ? '0 20px 40px rgba(0,0,0,0.08)' : '0 2px 8px rgba(0,0,0,0.04)',
        transition: 'all 0.3s', transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        display: 'flex', flexDirection: 'column' as const, cursor: 'pointer',
      }}
    >
      <div style={{ height: '120px', backgroundColor: 'rgba(0,107,95,0.05)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '48px', marginBottom: '16px' }}>
        {role.icon}
      </div>
      <h4 style={{ fontSize: '17px', fontWeight: 800, color: '#161d1b', marginBottom: '4px', lineHeight: 1.3 }}>{role.title}</h4>
      <p style={{ fontSize: '13px', color: '#6b7a76', marginBottom: '16px' }}>{role.location}</p>
      <div style={{ fontSize: '20px', fontWeight: 900, color: '#2dd4bf', marginTop: 'auto', letterSpacing: '-0.01em' }}>{formatPrice(role.salary)}</div>
    </article>
  )
}

/* ─── PAGE ───────────────────────────────────────────────── */
export default function HomeCleaningPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = React.use(params)
  const [activePill, setActivePill] = useState('All Jobs')
  const [keyword, setKeyword] = useState('')

  return (
    <div style={{ fontFamily: 'Inter,system-ui,sans-serif', backgroundColor: '#f4fbf8', minHeight: '100vh' }}>

      {/* ── HERO ── */}
      <section style={{ position: 'relative', height: '540px', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <img
          src="https://images.pexels.com/photos/4239091/pexels-photo-4239091.jpeg?auto=compress&w=1600"
          alt="Cleaning Jobs Hero"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(22,29,27,0.45) 0%, rgba(22,29,27,0.2) 100%)' }} />

        <div style={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: '900px', padding: '80px 24px 0', textAlign: 'center' }}>
          <h1 style={{ fontSize: '48px', fontWeight: 800, color: 'white', marginBottom: '28px', letterSpacing: '-0.02em', lineHeight: 1.1, textShadow: '0 4px 20px rgba(0,0,0,0.3)' }}>
            Expert Cleaners & Housekeepers in Rabat
          </h1>

          {/* Glassmorphic search */}
          <div style={{ backgroundColor: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.3)', borderRadius: '24px', padding: '12px', display: 'flex', alignItems: 'center', gap: '12px', boxShadow: '0 20px 60px rgba(0,0,0,0.15)' }}>
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '10px', backgroundColor: 'white', padding: '14px 20px', borderRadius: '16px', border: '1px solid rgba(186,202,197,0.3)' }}>
              <Search size={20} color="#2dd4bf" />
              <input type="text" value={keyword} onChange={e => setKeyword(e.target.value)}
                placeholder="What role are you looking for?"
                style={{ flex: 1, backgroundColor: 'transparent', border: 'none', outline: 'none', fontSize: '16px', fontFamily: 'Inter,sans-serif', color: '#161d1b' }}
              />
            </div>
            <button style={{ backgroundColor: '#2dd4bf', color: 'white', border: 'none', padding: '16px 40px', borderRadius: '16px', fontWeight: 700, fontSize: '15px', cursor: 'pointer', transition: 'filter 0.15s', whiteSpace: 'nowrap' as const }}
              onMouseEnter={e => e.currentTarget.style.filter = 'brightness(1.1)'}
              onMouseLeave={e => e.currentTarget.style.filter = 'brightness(1)'}
            >Search</button>
          </div>
        </div>
      </section>

      {/* ── FILTER BAR + PILLS ── */}
      <div style={{ maxWidth: '1440px', margin: '-32px auto 0', padding: '0 40px', position: 'relative', zIndex: 20 }}>
        {/* Filter bar */}
        <div style={{ backgroundColor: 'white', borderRadius: '100px', padding: '6px', display: 'flex', alignItems: 'center', border: '1px solid rgba(186,202,197,0.15)', boxShadow: '0 8px 32px rgba(0,0,0,0.08)', marginBottom: '24px' }}>
          {[
            { icon: '📍', label: 'City', val: 'Rabat' },
            { icon: '🧭', label: 'Neighborhood', val: 'Agdal' },
            { icon: '💰', label: 'Salary', val: 'Range' },
            { icon: '🎚', label: 'Filters', val: '2 Applied' },
          ].map((f, i, arr) => (
            <React.Fragment key={f.label}>
              <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 20px', cursor: 'pointer', borderRadius: '100px', transition: 'background 0.15s' }}
                onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.backgroundColor = '#eef5f2'}
                onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.backgroundColor = 'transparent'}
              >
                <span style={{ fontSize: '16px' }}>{f.icon}</span>
                <span style={{ fontSize: '9px', fontWeight: 700, textTransform: 'uppercase' as const, letterSpacing: '0.12em', color: '#6b7a76' }}>{f.label}</span>
                <span style={{ fontSize: '14px', fontWeight: 700, color: '#161d1b', marginLeft: 'auto' }}>{f.val}</span>
              </div>
              {i < arr.length - 1 && <div style={{ width: '1px', height: '28px', backgroundColor: 'rgba(186,202,197,0.3)', flexShrink: 0 }} />}
            </React.Fragment>
          ))}
        </div>

        {/* Category pills */}
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' as const }}>
          {categoryPills.map(pill => (
            <button key={pill} onClick={() => setActivePill(pill)}
              style={{
                padding: '10px 20px', borderRadius: '100px', fontSize: '13px', fontWeight: 700, border: 'none', cursor: 'pointer', transition: 'all 0.15s',
                backgroundColor: activePill === pill ? '#2dd4bf' : 'rgba(45,212,191,0.12)',
                color: activePill === pill ? 'white' : '#161d1b',
                backdropFilter: 'blur(8px)',
                boxShadow: activePill === pill ? '0 4px 16px rgba(0,107,95,0.25)' : 'none',
              }}
            >{pill}</button>
          ))}
        </div>
      </div>

      {/* ── MAIN ── */}
      <main style={{ maxWidth: '1440px', margin: '0 auto', padding: '40px 40px 80px' }}>

        {/* Section header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px' }}>
          <h3 style={{ fontSize: '22px', fontWeight: 800, color: '#161d1b' }}>Top Opportunities in Rabat</h3>
          <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#2dd4bf', fontWeight: 700, fontSize: '14px', textDecoration: 'none', transition: 'opacity 0.15s' }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.7'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
          >View all 840 jobs →</a>
        </div>

        {/* Row 1 — 4 cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '16px', marginBottom: '16px' }}>
          {topJobs.slice(0, 4).map(job => <JobCard key={job.id} job={job} />)}
        </div>

        {/* Row 2 — 4 cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '16px', marginBottom: '40px' }}>
          {topJobs.slice(4, 8).map(job => <JobCard key={job.id} job={job} />)}
        </div>

        {/* ── RECRUITER BANNER ── */}
        <div style={{ backgroundColor: 'rgba(45,212,191,0.08)', border: '2px solid rgba(45,212,191,0.2)', borderRadius: '32px', padding: '28px 36px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '24px', marginBottom: '40px', flexWrap: 'wrap' as const }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div style={{ width: '60px', height: '60px', backgroundColor: '#2dd4bf', borderRadius: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', boxShadow: '0 8px 20px rgba(45,212,191,0.3)', flexShrink: 0 }}>🧹</div>
            <div>
              <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#0f9b8e', marginBottom: '4px' }}>Are you a Cleaning Agency?</h2>
              <p style={{ fontSize: '15px', color: '#6b7a76' }}>Find your next star specialist — 100% Free.</p>
            </div>
          </div>
          <button style={{ backgroundColor: '#0f9b8e', color: '#62fae3', border: 'none', padding: '14px 32px', borderRadius: '100px', fontWeight: 800, fontSize: '14px', cursor: 'pointer', boxShadow: '0 8px 24px rgba(0,87,77,0.25)', transition: 'all 0.2s', whiteSpace: 'nowrap' as const, flexShrink: 0 }}
            onMouseEnter={e => e.currentTarget.style.filter = 'brightness(1.1)'}
            onMouseLeave={e => e.currentTarget.style.filter = 'brightness(1)'}
          >Post a FREE Recruitment Ad</button>
        </div>

        {/* ── DUAL BANNERS ── */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '48px' }}>

          {/* Left: Join SouKni Family */}
          <div style={{ backgroundColor: '#2dd4bf', borderRadius: '32px', padding: '40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', overflow: 'hidden', position: 'relative' as const, minHeight: '200px' }}>
            <div style={{ position: 'absolute', right: '-40px', bottom: '-40px', width: '220px', height: '220px', backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: '40px', transform: 'rotate(12deg)' }} />
            <div style={{ position: 'relative', zIndex: 1, maxWidth: '65%' }}>
              <h4 style={{ fontSize: '26px', fontWeight: 800, color: 'white', marginBottom: '12px', lineHeight: 1.2, letterSpacing: '-0.01em' }}>Join the SouKni Family</h4>
              <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: '20px', fontSize: '14px', lineHeight: 1.6 }}>Download the app for instant notifications on new cleaning jobs in Rabat.</p>
              <div style={{ display: 'flex', gap: '10px' }}>
                {[{ icon: '🍎', store: 'App Store' }, { icon: '▶', store: 'Play Store' }].map(btn => (
                  <button key={btn.store} style={{ backgroundColor: '#0f172a', color: 'white', border: 'none', padding: '10px 18px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '13px', fontWeight: 600, transition: 'opacity 0.15s' }}
                    onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
                    onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                  ><span style={{ fontSize: '18px' }}>{btn.icon}</span>{btn.store}</button>
                ))}
              </div>
            </div>
          </div>

          {/* Right: SouKni Immo Pro */}
          <div style={{ position: 'relative', borderRadius: '32px', overflow: 'hidden', minHeight: '200px' }}>
            <img src="https://images.pexels.com/photos/271639/pexels-photo-271639.jpeg?auto=compress&w=800" alt="Immo Pro"
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(2px)' }} />
            <div style={{ position: 'relative', zIndex: 1, padding: '36px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '100%' }}>
              <div>
                <h4 style={{ fontSize: '20px', fontWeight: 800, color: 'white', marginBottom: '8px' }}>SouKni Immo Pro</h4>
                <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: '20px', fontSize: '14px', lineHeight: 1.6, maxWidth: '260px' }}>Premium real estate and maintenance specialists across Rabat and Casablanca.</p>
                <button style={{ backgroundColor: '#2dd4bf', color: '#0f9b8e', border: 'none', padding: '12px 24px', borderRadius: '100px', fontWeight: 700, fontSize: '13px', cursor: 'pointer', transition: 'filter 0.15s' }}
                  onMouseEnter={e => e.currentTarget.style.filter = 'brightness(1.08)'}
                  onMouseLeave={e => e.currentTarget.style.filter = 'brightness(1)'}
                >Discover More</button>
              </div>
              <div style={{ width: '100px', height: '100px', backgroundColor: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(12px)', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(255,255,255,0.2)', fontSize: '48px', flexShrink: 0 }}>🏠</div>
            </div>
          </div>
        </div>

        {/* ── SPECIALIZED CLEANING ROLES ── */}
        <h3 style={{ fontSize: '22px', fontWeight: 800, color: '#161d1b', marginBottom: '24px' }}>Specialized Cleaning Roles</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '16px' }}>
          {specializedRoles.map(role => <SpecializedCard key={role.title} role={role} />)}
        </div>
      </main>

      {/* ── FOOTER ── */}

      {/* FAB */}
      <button style={{ position: 'fixed', bottom: '40px', right: '40px', width: '60px', height: '60px', borderRadius: '50%', backgroundColor: '#2dd4bf', color: 'white', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', boxShadow: '0 8px 24px rgba(0,107,95,0.35)', zIndex: 40, transition: 'all 0.2s' }}
        onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.1)' }}
        onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)' }}
      >+</button>
    </div>
  )
}
