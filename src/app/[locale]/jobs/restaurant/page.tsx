'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Heart, Search, MapPin, Bell, Globe, User, ChevronDown, MessageCircle, Car, UtensilsCrossed, Coffee, Wine, Cake, Users, Star, ClipboardList, ChefHat, Sparkles } from 'lucide-react'

const categoryPills = ['All Roles', 'Executive Chefs', 'Restaurant Management', 'Pastry & Culinary Arts', 'Waiter/Waitress', 'Barista', 'Food Service Assistant']

type Job = {
  id: string; badge: 'Diamond Member' | 'Diamond' | 'Verified Agency' | 'Verified' | null
  category: string; categoryColor: string; title: string; company: string; icon: any
  salaryLabel: string; salary: string; salarySuffix?: string; image: string
  cta: 'apply' | 'view' | 'chat' | 'whatsapp'
}

const row1: Job[] = [
  { id: '1', badge: 'Diamond Member', category: 'Culinary Arts', categoryColor: '#2dd4bf', title: 'Executive Chef de Cuisine - Souissi Palace', company: "L'Escale Gastronomique", icon: ChefHat, salaryLabel: 'MONTHLY SALARY', salary: '45,000', image: 'https://images.pexels.com/photos/2696064/pexels-photo-2696064.jpeg?auto=compress&w=600', cta: 'whatsapp' },
  { id: '2', badge: 'Verified Agency', category: 'Management', categoryColor: '#8d4f00', title: 'Restaurant General Manager - Hay Riad', company: 'Amber Group Hospitality', icon: Users, salaryLabel: 'ESTIMATED MAD', salary: '28,500', salarySuffix: '+', image: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&w=600', cta: 'apply' },
  { id: '3', badge: 'Diamond', category: 'Patisserie', categoryColor: '#605e58', title: 'Master Pastry Chef - Fine Dining Venue', company: 'Rabat Royal Sweets', icon: Cake, salaryLabel: 'SALARY', salary: '22,000', image: 'https://images.pexels.com/photos/1070850/pexels-photo-1070850.jpeg?auto=compress&w=600', cta: 'chat' },
  { id: '4', badge: 'Verified', category: 'Beverage', categoryColor: '#2dd4bf', title: 'Head Sommelier & Wine Director', company: 'Vantage Wine Bar', icon: Wine, salaryLabel: 'MONTHLY MAD', salary: '25,000', salarySuffix: '+', image: 'https://images.pexels.com/photos/2912108/pexels-photo-2912108.jpeg?auto=compress&w=600', cta: 'view' },
]

const row2: Job[] = [
  { id: '5', badge: null, category: 'Front of House', categoryColor: '#8d4f00', title: "Maître d'Hôtel - Michelin Style", company: 'Atlas Gourmet', icon: Star, salaryLabel: 'SALARY', salary: '18,000', image: 'https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&w=600', cta: 'apply' },
  { id: '6', badge: null, category: 'Culinary', categoryColor: '#2dd4bf', title: 'Sous Chef - European Cuisine', company: 'The Rabat Brasserie', icon: UtensilsCrossed, salaryLabel: 'SALARY', salary: '15,500', image: 'https://images.pexels.com/photos/3338497/pexels-photo-3338497.jpeg?auto=compress&w=600', cta: 'apply' },
  { id: '7', badge: 'Diamond Member', category: 'Support', categoryColor: '#605e58', title: 'Restaurant Operations Coordinator', company: 'Hospitech Solutions', icon: ClipboardList, salaryLabel: 'SALARY', salary: '13,000', image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&w=600', cta: 'apply' },
  { id: '8', badge: null, category: 'Events', categoryColor: '#8d4f00', title: 'Banqueting & Events Manager', company: 'Hilton Rabat Events', icon: Sparkles, salaryLabel: 'SALARY', salary: '20,500', image: 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&w=600', cta: 'apply' },
]

const row3: Job[] = [
  { id: '9', badge: 'Diamond Member', category: 'Culinary', categoryColor: '#2dd4bf', title: 'Head Chef - Mediterranean Fusion', company: 'Ocean Blue Rabat', icon: ChefHat, salaryLabel: 'SALARY', salary: '35,000', image: 'https://images.pexels.com/photos/3184183/pexels-photo-3184183.jpeg?auto=compress&w=600', cta: 'apply' },
  { id: '10', badge: 'Verified', category: 'Coffee Arts', categoryColor: '#8d4f00', title: 'Senior Barista & Roastery Manager', company: 'Bean & Bloom Agdal', icon: Coffee, salaryLabel: 'MONTHLY', salary: '12,500', image: 'https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&w=600', cta: 'chat' },
  { id: '11', badge: 'Diamond', category: 'Service', categoryColor: '#605e58', title: 'Head Waiter - Fine Dining Rooftop', company: 'Skyline Lounge', icon: Star, salaryLabel: 'ESTIMATED', salary: '14,000', image: 'https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg?auto=compress&w=600', cta: 'apply' },
  { id: '12', badge: 'Verified', category: 'Culinary', categoryColor: '#2dd4bf', title: 'Junior Sous Chef - French Bistro', company: 'Le Petit Palais', icon: UtensilsCrossed, salaryLabel: 'SALARY', salary: '16,500', image: 'https://images.pexels.com/photos/3338497/pexels-photo-3338497.jpeg?auto=compress&w=600', cta: 'apply' },
]

const row4: Job[] = [
  { id: '13', badge: 'Verified', category: 'Management', categoryColor: '#8d4f00', title: 'Assistant Floor Manager - Souissi', company: 'Grand Cafe de Rabat', icon: Users, salaryLabel: 'MONTHLY', salary: '19,000', image: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&w=600', cta: 'apply' },
  { id: '14', badge: 'Diamond Member', category: 'Mixology', categoryColor: '#605e58', title: 'Lead Mixologist - Luxury Hotel Bar', company: 'The Rabat Regency', icon: Wine, salaryLabel: 'SALARY', salary: '21,000', image: 'https://images.pexels.com/photos/3407777/pexels-photo-3407777.jpeg?auto=compress&w=600', cta: 'chat' },
  { id: '15', badge: 'Verified', category: 'Bakery', categoryColor: '#2dd4bf', title: 'Artisan Baker - Luxury Boulangerie', company: 'Maison du Pain Rabat', icon: Cake, salaryLabel: 'SALARY', salary: '13,500', image: 'https://images.pexels.com/photos/1070850/pexels-photo-1070850.jpeg?auto=compress&w=600', cta: 'apply' },
  { id: '16', badge: 'Diamond', category: 'Events', categoryColor: '#8d4f00', title: 'Catering Operations Supervisor', company: 'Atlas Gourmet Events', icon: ClipboardList, salaryLabel: 'MONTHLY', salary: '17,000', image: 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&w=600', cta: 'apply' },
]

const row5: Job[] = [
  { id: '17', badge: 'Diamond Member', category: 'Hospitality', categoryColor: '#605e58', title: 'Front Desk Manager - Boutique Hotel', company: 'Riad Elegance Rabat', icon: Star, salaryLabel: 'SALARY', salary: '18,500', image: 'https://images.pexels.com/photos/1537008/pexels-photo-1537008.jpeg?auto=compress&w=600', cta: 'apply' },
  { id: '18', badge: 'Verified', category: 'Fine Dining', categoryColor: '#2dd4bf', title: 'Chef de Partie - Grill & Roast', company: 'The Charcoal Grill Rabat', icon: ChefHat, salaryLabel: 'MONTHLY', salary: '15,000', image: 'https://images.pexels.com/photos/2696064/pexels-photo-2696064.jpeg?auto=compress&w=600', cta: 'chat' },
  { id: '19', badge: 'Diamond', category: 'Host', categoryColor: '#8d4f00', title: 'Restaurant Receptionist & Reservationist', company: 'Amber Lounge', icon: Users, salaryLabel: 'SALARY', salary: '9,500', image: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&w=600', cta: 'apply' },
  { id: '20', badge: 'Verified', category: 'Sommelier', categoryColor: '#605e58', title: 'Wine Cellar Assistant - Rabat Royal', company: 'Royal Hospitality Group', icon: Wine, salaryLabel: 'MONTHLY', salary: '11,000', image: 'https://images.pexels.com/photos/2912108/pexels-photo-2912108.jpeg?auto=compress&w=600', cta: 'apply' },
]

function badgePill(badge: Job['badge']) {
  if (!badge) return null
  const isDiamond = badge === 'Diamond Member' || badge === 'Diamond'
  return (
    <span style={{
      background: isDiamond ? 'linear-gradient(to right, #fbbf24, #f97316)' : 'rgba(0,107,95,0.9)',
      color: 'white', fontSize: '10px', fontWeight: 800, padding: '4px 8px', borderRadius: '6px',
      textTransform: 'uppercase' as const, letterSpacing: '0.03em', boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
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
        {job.badge && <div style={{ position: 'absolute', top: '16px', left: '16px' }}>{badgePill(job.badge)}</div>}
        <button onClick={() => setSaved(!saved)} style={{ position: 'absolute', top: '16px', right: '16px', width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'rgba(0,0,0,0.2)', backdropFilter: 'blur(8px)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Heart size={15} color="white" fill={saved ? 'white' : 'none'} />
        </button>
      </div>
      <div style={{ padding: '24px' }}>
        <span style={{ color: job.categoryColor, fontWeight: 700, fontSize: '12px', textTransform: 'uppercase' as const, letterSpacing: '0.05em' }}>{job.category}</span>
        <h3 style={{ fontSize: '17px', fontWeight: 600, color: '#161d1b', margin: '4px 0 10px', lineHeight: 1.3, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' as const, overflow: 'hidden' }}>{job.title}</h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#3c4a46', marginBottom: '14px', fontSize: '13px' }}>
          <job.icon size={15} color="#2dd4bf" /> {job.company}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid rgba(186,202,197,0.1)', paddingTop: '14px' }}>
          <div>
            <div style={{ fontSize: '10px', color: '#6b7a76', fontWeight: 700 }}>{job.salaryLabel}</div>
            <div style={{ fontSize: '22px', fontWeight: 800, color: job.badge === 'Diamond Member' ? '#3cddc7' : '#161d1b' }}>
              {job.salary}<span style={{ fontSize: '13px', fontWeight: 400, marginLeft: '4px' }}>{job.salarySuffix || 'MAD'}</span>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            {job.cta === 'whatsapp' && (
              <button style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#25D366', border: 'none', cursor: 'pointer', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>📞</button>
            )}
            {job.cta === 'chat' && (
              <button style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#eef5f2', border: 'none', cursor: 'pointer', color: '#2dd4bf', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <MessageCircle size={18} />
              </button>
            )}
            {job.cta === 'view' && (
              <button style={{ padding: '8px 20px', backgroundColor: '#2dd4bf', color: 'white', borderRadius: '100px', border: 'none', fontWeight: 700, fontSize: '13px', cursor: 'pointer' }}>View</button>
            )}
            {job.cta === 'apply' && (
              <button style={{ padding: '8px 16px', backgroundColor: '#2dd4bf', color: '#0f9b8e', borderRadius: '100px', border: 'none', fontWeight: 700, fontSize: '13px', cursor: 'pointer' }}>Apply Now</button>
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

export default function RestaurantJobsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = React.use(params)
  const [activePill, setActivePill] = useState('All Roles')
  const [diamondOnly, setDiamondOnly] = useState(true)

  return (
    <div style={{ fontFamily: 'Hanken Grotesk, Inter, sans-serif', backgroundColor: '#f4fbf8', color: '#161d1b', minHeight: '100vh' }}>

      {/* ── HEADER ── */}

      {/* ── HERO ── */}
      <section style={{ position: 'relative', height: '480px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        <img src="https://images.pexels.com/photos/2696064/pexels-photo-2696064.jpeg?auto=compress&w=1600" alt="Fine dining kitchen Rabat" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.1), #f4fbf8)' }} />
        <div style={{ position: 'relative', zIndex: 10, textAlign: 'center' as const, maxWidth: '800px', padding: '0 24px' }}>
          <h1 style={{ color: 'white', fontSize: '48px', fontWeight: 700, marginBottom: '24px', lineHeight: 1.1, textShadow: '0 4px 12px rgba(0,0,0,0.4)' }}>Elevate Gastronomy in Rabat's Finest Kitchens</h1>
          <div style={{ maxWidth: '680px', margin: '0 auto', backgroundColor: 'rgba(255,255,255,0.65)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.4)', borderRadius: '100px', padding: '8px', display: 'flex', gap: '8px', boxShadow: '0 25px 50px rgba(0,0,0,0.2)' }}>
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '10px', padding: '0 16px', borderRight: '1px solid rgba(186,202,197,0.3)' }}>
              <Search size={17} color="#2dd4bf" />
              <input placeholder="Chef de Cuisine, Restaurant Manager, Sommelier..." style={{ border: 'none', outline: 'none', background: 'transparent', width: '100%', fontFamily: 'inherit', fontSize: '14px', padding: '12px 0' }} />
            </div>
            <button style={{ backgroundColor: '#2dd4bf', color: '#0f9b8e', padding: '12px 32px', borderRadius: '100px', border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: '14px', whiteSpace: 'nowrap' as const }}>Search Jobs</button>
          </div>
        </div>
      </section>

      {/* ── FILTER BAR + PILLS ── */}
      <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 40px' }}>
        <div style={{ marginTop: '-64px', position: 'relative', zIndex: 30, marginBottom: '32px' }}>
          <div style={{ backgroundColor: 'rgba(255,255,255,0.65)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.4)', borderRadius: '2.5rem', padding: '16px', display: 'flex', flexWrap: 'wrap' as const, alignItems: 'center', gap: '12px', boxShadow: '0 20px 40px rgba(0,0,0,0.08)' }}>
            {[
              { label: 'Neighborhood', value: 'All Rabat Districts' },
              { label: 'Salary Range', value: 'Any Salary' },
              { label: 'Contract Type', value: 'Full-time' },
            ].map((f, i) => (
              <div key={f.label} style={{ flex: 1, minWidth: '160px', padding: '0 16px', borderRight: i < 2 ? '1px solid rgba(186,202,197,0.2)' : 'none', display: 'flex', flexDirection: 'column' as const }}>
                <span style={{ fontSize: '10px', textTransform: 'uppercase' as const, color: '#6b7a76', fontWeight: 700 }}>{f.label}</span>
                <span style={{ fontSize: '14px', fontWeight: 500, cursor: 'pointer' }}>{f.value} <ChevronDown size={13} style={{ display: 'inline', verticalAlign: 'middle' }} /></span>
              </div>
            ))}
            <div style={{ width: '1px', height: '40px', backgroundColor: 'rgba(186,202,197,0.2)' }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '0 12px' }}>
              <span style={{ fontSize: '13px', color: '#3c4a46' }}>Diamond Only</span>
              <button onClick={() => setDiamondOnly(!diamondOnly)} style={{ width: '44px', height: '24px', borderRadius: '100px', backgroundColor: diamondOnly ? '#2dd4bf' : '#dde4e1', border: 'none', cursor: 'pointer', position: 'relative', flexShrink: 0 }}>
                <div style={{ position: 'absolute', top: '2px', left: diamondOnly ? '22px' : '2px', width: '20px', height: '20px', borderRadius: '50%', backgroundColor: 'white', transition: 'left 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }} />
              </button>
            </div>
          </div>
        </div>

        {/* pills + sort */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', marginBottom: '48px', flexWrap: 'wrap' as const }}>
          <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: '10px' }}>
            {categoryPills.map(c => (
              <button key={c} onClick={() => setActivePill(c)} style={{ padding: '8px 20px', borderRadius: '100px', fontSize: '13px', fontWeight: activePill === c ? 700 : 400, cursor: 'pointer', border: activePill === c ? 'none' : '1px solid rgba(186,202,197,0.2)', backgroundColor: activePill === c ? '#2dd4bf' : '#eef5f2', color: activePill === c ? '#0f9b8e' : '#3c4a46', whiteSpace: 'nowrap' as const }}>{c}</button>
            ))}
          </div>
          <div style={{ fontSize: '13px', color: '#3c4a46', whiteSpace: 'nowrap' as const, cursor: 'pointer' }}>
            Sort by: <span style={{ color: '#2dd4bf', fontWeight: 700 }}>Featured First</span> <ChevronDown size={14} style={{ display: 'inline', verticalAlign: 'middle' }} />
          </div>
        </div>

        {/* ROWS 1 + 2 */}
        <JobGrid jobs={row1} />
        <JobGrid jobs={row2} mb={64} />
      </section>

      {/* ── RECRUITER BANNER ── */}
      <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 40px 64px' }}>
        <div style={{ position: 'relative', borderRadius: '2.5rem', overflow: 'hidden', height: '300px', display: 'flex', alignItems: 'center' }}>
          <img src="https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&w=1400" alt="Fine dining" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,107,95,0.4)', backdropFilter: 'blur(2px)' }} />
          <div style={{ position: 'relative', zIndex: 1, padding: '0 48px', maxWidth: '580px' }}>
            <h2 style={{ color: 'white', fontSize: '40px', fontWeight: 700, marginBottom: '16px', lineHeight: 1.1 }}>Are you a Fine Dining Establishment?</h2>
            <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '18px', marginBottom: '32px', lineHeight: 1.6 }}>Find your next Michelin-star talent — 100% Free. Connect with top-tier culinary and hospitality professionals in Morocco today.</p>
            <div style={{ display: 'flex', gap: '16px' }}>
              <button style={{ backgroundColor: 'white', color: '#2dd4bf', padding: '12px 32px', borderRadius: '100px', border: 'none', fontWeight: 700, cursor: 'pointer' }}>Get Started</button>
              <button style={{ border: '2px solid white', color: 'white', padding: '12px 32px', borderRadius: '100px', backgroundColor: 'transparent', fontWeight: 700, cursor: 'pointer' }}>Learn More</button>
            </div>
          </div>
        </div>
      </section>

      {/* ── APP DOWNLOAD ── */}
      <section style={{ backgroundColor: '#e2eae7', padding: '64px 0' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 40px', display: 'flex', flexWrap: 'wrap' as const, alignItems: 'center', justifyContent: 'space-between', gap: '48px' }}>
          <div style={{ maxWidth: '480px' }}>
            <h2 style={{ fontSize: '42px', fontWeight: 700, color: '#161d1b', marginBottom: '20px', lineHeight: 1.1 }}>Join the SouKni Family</h2>
            <p style={{ color: '#3c4a46', fontSize: '18px', lineHeight: 1.6, marginBottom: '40px' }}>Get the most powerful Moroccan recruitment tool in your pocket. Real-time alerts for restaurant roles, direct messaging with chefs, and advanced filters.</p>
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
          <div style={{ position: 'relative', width: '260px', flexShrink: 0 }}>
            <div style={{ position: 'absolute', inset: '-16px', backgroundColor: 'rgba(0,107,95,0.1)', borderRadius: '50%', filter: 'blur(40px)' }} />
            <div style={{ position: 'relative', width: '100%', aspectRatio: '9/16', borderRadius: '2.5rem', overflow: 'hidden', border: '8px solid #161d1b', boxShadow: '0 25px 50px rgba(0,0,0,0.25)' }}>
              <img src="https://images.pexels.com/photos/2696064/pexels-photo-2696064.jpeg?auto=compress&w=400" alt="App preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          </div>
        </div>
      </section>

      {/* ── ROWS 3, 4, 5 ── */}
      <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '64px 40px 0' }}>
        <JobGrid jobs={row3} />
        <JobGrid jobs={row4} />
        <JobGrid jobs={row5} mb={64} />
      </section>

      {/* ── DUAL SPLIT: IMMO PRO + HOSPITALITY PRO ── */}
      <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 40px 64px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
          {/* Immo Pro */}
          <div style={{ position: 'relative', borderRadius: '2.5rem', overflow: 'hidden', height: '240px', display: 'flex', alignItems: 'center', padding: '32px' }}>
            <img src="https://images.pexels.com/photos/1838640/pexels-photo-1838640.jpeg?auto=compress&w=800" alt="Immo Pro" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.3 }} />
            <div style={{ position: 'absolute', inset: 0, backgroundColor: '#2b3230' }} />
            <div style={{ position: 'relative', zIndex: 1 }}>
              <h3 style={{ color: 'white', fontSize: '22px', fontWeight: 700, marginBottom: '8px' }}>SouKni Immo Pro</h3>
              <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '15px', marginBottom: '20px' }}>The ultimate recruitment engine for Real Estate agencies.</p>
              <button style={{ backgroundColor: '#2dd4bf', color: 'white', padding: '10px 24px', borderRadius: '100px', border: 'none', fontWeight: 700, fontSize: '13px', cursor: 'pointer' }}>Switch to Immo</button>
            </div>
          </div>
          {/* Hospitality Pro */}
          <div style={{ position: 'relative', borderRadius: '2.5rem', overflow: 'hidden', height: '240px', display: 'flex', alignItems: 'center', padding: '32px', backgroundColor: '#dde4e1' }}>
            <img src="https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&w=800" alt="Hospitality Pro" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.2 }} />
            <div style={{ position: 'relative', zIndex: 1 }}>
              <h3 style={{ fontSize: '22px', fontWeight: 700, color: '#161d1b', marginBottom: '8px' }}>SouKni Hospitality Pro</h3>
              <p style={{ color: '#3c4a46', fontSize: '15px', marginBottom: '20px' }}>Specialized hiring for kitchens and dining rooms.</p>
              <button style={{ backgroundColor: '#161d1b', color: 'white', padding: '10px 24px', borderRadius: '100px', border: 'none', fontWeight: 700, fontSize: '13px', cursor: 'pointer' }}>Learn More</button>
            </div>
          </div>
        </div>
      </section>

      {/* ── AUTO PRO BANNER ── */}
      <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 40px 64px' }}>
        <div style={{ position: 'relative', borderRadius: '2.5rem', overflow: 'hidden', height: '300px', display: 'flex', alignItems: 'center' }}>
          <img src="https://images.pexels.com/photos/3806288/pexels-photo-3806288.jpeg?auto=compress&w=1400" alt="Auto Pro" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
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
