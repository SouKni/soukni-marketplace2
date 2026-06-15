'use client'

import { useState } from 'react'
import { MapPin, Clock, ChevronDown, Search } from 'lucide-react'

const jobCategories = [
  { icon: '📈', label: 'Sales', count: '1.2k' },
  { icon: '💻', label: 'Tech', count: '840' },
  { icon: '💰', label: 'Finance', count: '420' },
  { icon: '🎨', label: 'Creative', count: '310' },
  { icon: '🏥', label: 'Healthcare', count: '215' },
  { icon: '🎓', label: 'Education', count: '750' },
  { icon: '📣', label: 'Marketing', count: '1.1k' },
  { icon: '🍽️', label: 'Hospitality', count: '2.3k' },
  { icon: '⚖️', label: 'Legal', count: '420' },
  { icon: '⚙️', label: 'Engineering', count: '1.5k' },
  { icon: '🎧', label: 'Customer Service', count: '2k' },
]

const popularJobs = [
  { title: 'Supermarket Staff', company: 'Retail Excellence Group', salary: '5,500 MAD', location: 'Casablanca', type: 'Full Time', image: 'https://images.pexels.com/photos/1005638/pexels-photo-1005638.jpeg?auto=compress&w=400' },
  { title: 'Account Assistant', company: 'Capital Trust Global', salary: '8,000 MAD', location: 'Rabat', type: 'Full Time', image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&w=400' },
  { title: 'Waiter / Waitress', company: 'Azure Luxury Lounge', salary: 'Negotiable', location: 'Marrakech', type: 'Shift Based', image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&w=400' },
  { title: 'Front Desk Receptionist', company: 'Skyline Holdings', salary: '6,500 MAD', location: 'Tangier', type: 'Full Time', image: 'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&w=400' },
]

const techJobs = [
  { title: 'Senior Full Stack Developer', company: 'Nexus Tech Solutions', salary: '25,000 MAD', location: 'Casablanca', type: 'Full Time', image: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&w=400' },
  { title: 'Cloud Architect', company: 'DataSphere Global', salary: '32,000 MAD', location: 'Rabat', type: 'Full Time', image: 'https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&w=400' },
  { title: 'AI Research Engineer', company: 'Future Intelligence', salary: '40,000 MAD', location: 'Casablanca', type: 'Full Time', image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&w=400' },
  { title: 'DevOps Lead', company: 'CloudScale Systems', salary: '28,000 MAD', location: 'Agadir', type: 'Full Time', image: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&w=400' },
]

const financeJobs = [
  { title: 'Investment Analyst', company: 'Global Wealth Partners', salary: '18,000 MAD', location: 'Casablanca Finance City', type: 'Full Time', image: 'https://images.pexels.com/photos/6863183/pexels-photo-6863183.jpeg?auto=compress&w=400' },
  { title: 'Portfolio Manager', company: 'Apex Capital', salary: '45,000 MAD', location: 'Rabat', type: 'Full Time', image: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&w=400' },
  { title: 'Senior Accountant', company: 'Elite Audit Firm', salary: '12,000 MAD', location: 'Marrakech', type: 'Full Time', image: 'https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&w=400' },
  { title: 'Risk Manager', company: 'Secure Finance Group', salary: '22,000 MAD', location: 'Tangier', type: 'Full Time', image: 'https://images.pexels.com/photos/7567443/pexels-photo-7567443.jpeg?auto=compress&w=400' },
]

const creativeJobs = [
  { title: 'Creative Director', company: 'Vivid Media Agency', salary: '35,000 MAD', location: 'Casablanca', type: 'Full Time', image: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&w=400' },
  { title: 'Senior UI/UX Designer', company: 'Digital Craft Studio', salary: '20,000 MAD', location: 'Rabat', type: 'Full Time', image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&w=400' },
  { title: 'Fashion Photographer', company: 'Luxe Studio', salary: '15,000 MAD', location: 'Marrakech', type: 'Contract', image: 'https://images.pexels.com/photos/1264210/pexels-photo-1264210.jpeg?auto=compress&w=400' },
  { title: 'Interior Architect', company: 'Modern Spaces', salary: '24,000 MAD', location: 'Agadir', type: 'Full Time', image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&w=400' },
]

const healthcareJobs = [
  { title: 'Specialist Surgeon', company: 'Moroccan Health Group', salary: '85,000 MAD', location: 'Casablanca', type: 'Full Time', image: 'https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg?auto=compress&w=400' },
  { title: 'Senior Nurse', company: 'City Medical Center', salary: '14,000 MAD', location: 'Rabat', type: 'Full Time', image: 'https://images.pexels.com/photos/3259624/pexels-photo-3259624.jpeg?auto=compress&w=400' },
  { title: 'Clinical Researcher', company: 'BioTech Labs', salary: '26,000 MAD', location: 'Fès', type: 'Full Time', image: 'https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&w=400' },
  { title: 'Orthodontist', company: 'Smile Design Clinic', salary: '50,000 MAD', location: 'Tangier', type: 'Full Time', image: 'https://images.pexels.com/photos/305568/pexels-photo-305568.jpeg?auto=compress&w=400' },
]

type Job = { title: string; company: string; salary: string; location: string; type: string; image: string }

function JobCard({ job }: { job: Job }) {
  const [hovered, setHovered] = useState(false)
  const [saved, setSaved] = useState(false)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        backgroundColor: 'white', borderRadius: '32px', overflow: 'hidden',
        border: '1px solid #f1f5f9',
        boxShadow: hovered ? '0 20px 40px rgba(0,0,0,0.1)' : '0 2px 8px rgba(0,0,0,0.04)',
        transition: 'all 0.3s', display: 'flex', flexDirection: 'column',
      }}
    >
      {/* Image */}
      <div style={{ position: 'relative', height: '200px', overflow: 'hidden' }}>
        <img
          src={job.image} alt={job.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s', transform: hovered ? 'scale(1.08)' : 'scale(1)' }}
        />
        <div style={{ position: 'absolute', top: '14px', left: '14px', background: 'linear-gradient(135deg, #2dd4bf, #0d9488)', color: 'white', fontSize: '9px', fontWeight: 700, padding: '4px 10px', borderRadius: '100px', textTransform: 'uppercase', letterSpacing: '0.06em', boxShadow: '0 4px 12px rgba(45,212,191,0.4)' }}>
          💎 Diamond Member
        </div>
        <button
          onClick={e => { e.stopPropagation(); setSaved(!saved) }}
          style={{ position: 'absolute', top: '14px', right: '14px', width: '34px', height: '34px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(8px)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px' }}
        >
          {saved ? '❤️' : '🤍'}
        </button>
      </div>

      {/* Content */}
      <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px', gap: '8px' }}>
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: 700, color: hovered ? '#2dd4bf' : '#0f172a', marginBottom: '3px', lineHeight: 1.3, transition: 'color 0.2s' }}>{job.title}</h3>
            <p style={{ fontSize: '12px', color: '#64748b' }}>{job.company}</p>
          </div>
          <div style={{ textAlign: 'right', flexShrink: 0 }}>
            <p style={{ fontSize: '14px', fontWeight: 700, color: '#2dd4bf' }}>{job.salary}</p>
            <p style={{ fontSize: '10px', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Salary</p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '12px', fontSize: '12px', color: '#64748b', marginBottom: '16px' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><MapPin size={12} />{job.location}</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Clock size={12} />{job.type}</span>
        </div>

        <div style={{ display: 'flex', gap: '8px', marginTop: 'auto' }}>
          <button style={{ flex: 1, padding: '11px 8px', borderRadius: '12px', border: 'none', backgroundColor: 'rgba(45,212,191,0.1)', color: '#2dd4bf', fontWeight: 700, fontSize: '13px', cursor: 'pointer', transition: 'all 0.15s' }}
            onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#2dd4bf'; e.currentTarget.style.color = 'white' }}
            onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'rgba(45,212,191,0.1)'; e.currentTarget.style.color = '#2dd4bf' }}
          >💬 Chat</button>
          <button style={{ flex: 1, padding: '11px 8px', borderRadius: '12px', border: 'none', backgroundColor: '#22c55e', color: 'white', fontWeight: 700, fontSize: '13px', cursor: 'pointer', transition: 'background 0.15s' }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#16a34a'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = '#22c55e'}
          >📱 WhatsApp</button>
        </div>
      </div>
    </div>
  )
}

function SectionHeader({ sub, title }: { sub: string; title: string }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '32px' }}>
      <div>
        <span style={{ color: '#2dd4bf', fontWeight: 700, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.15em', display: 'block', marginBottom: '4px' }}>{sub}</span>
        <h2 style={{ fontSize: '32px', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em', lineHeight: 1.1 }}>{title}</h2>
      </div>
      <button style={{ color: '#2dd4bf', fontWeight: 700, fontSize: '14px', background: 'none', border: 'none', cursor: 'pointer', transition: 'opacity 0.2s' }}
        onMouseEnter={e => e.currentTarget.style.opacity = '0.7'}
        onMouseLeave={e => e.currentTarget.style.opacity = '1'}
      >Explore All →</button>
    </div>
  )
}

export default function JobsPage() {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')

  return (
    <div style={{ fontFamily: 'Inter, system-ui, sans-serif', backgroundColor: '#f4fbf8', minHeight: '100vh' }}>

      {/* HERO */}
      <section style={{ position: 'relative', height: '460px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 16px', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(15,23,42,0.55), rgba(15,23,42,0.55)), url(https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&w=1600)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div style={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: '720px', textAlign: 'center' }}>
          <h1 style={{ fontSize: '48px', fontWeight: 800, color: 'white', marginBottom: '8px', letterSpacing: '-0.02em', lineHeight: 1.1, textShadow: '0 2px 20px rgba(0,0,0,0.3)' }}>Find Your Dream Job</h1>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '16px', marginBottom: '28px' }}>Morocco's premium jobs marketplace — 12,000+ verified opportunities</p>
          <div style={{ background: 'rgba(255,255,255,0.72)', backdropFilter: 'blur(16px)', borderRadius: '100px', padding: '6px 6px 6px 24px', display: 'flex', alignItems: 'center', boxShadow: '0 20px 60px rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.35)' }}>
            <Search size={18} color="#64748b" style={{ flexShrink: 0 }} />
            <input
              value={search} onChange={e => setSearch(e.target.value)}
              type="text" placeholder="Search job titles, companies, skills..."
              style={{ flex: 1, backgroundColor: 'transparent', border: 'none', outline: 'none', padding: '10px 16px', fontSize: '15px', fontFamily: 'Inter, sans-serif', color: '#0f172a' }}
            />
            <button style={{ backgroundColor: '#2dd4bf', color: 'white', border: 'none', padding: '12px 28px', borderRadius: '100px', fontWeight: 700, fontSize: '13px', cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.08em', transition: 'background 0.15s' }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = '#0f9b8e'}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = '#2dd4bf'}
            >Search</button>
          </div>
        </div>
      </section>

      {/* STATS */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginTop: '-48px', position: 'relative', zIndex: 10, marginBottom: '40px' }}>
          {[{ label: 'Active Jobs', value: '12,000+' }, { label: 'Companies', value: '3,400' }, { label: 'Placed This Month', value: '840' }, { label: 'Cities', value: '12' }].map(s => (
            <div key={s.label} style={{ backgroundColor: 'white', borderRadius: '20px', padding: '20px 24px', boxShadow: '0 8px 32px rgba(0,0,0,0.08)', textAlign: 'center' }}>
              <p style={{ fontSize: '26px', fontWeight: 800, color: '#2dd4bf', marginBottom: '4px', letterSpacing: '-0.02em' }}>{s.value}</p>
              <p style={{ fontSize: '11px', fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{s.label}</p>
            </div>
          ))}
        </div>

        {/* CATEGORY PILLS */}
        <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '8px', marginBottom: '48px', scrollbarWidth: 'none' }}>
          <button
            onClick={() => setActiveCategory('All')}
            style={{ whiteSpace: 'nowrap', padding: '10px 20px', borderRadius: '100px', fontSize: '13px', fontWeight: 700, border: 'none', cursor: 'pointer', flexShrink: 0, backgroundColor: activeCategory === 'All' ? '#2dd4bf' : 'white', color: activeCategory === 'All' ? 'white' : '#64748b', boxShadow: activeCategory === 'All' ? '0 4px 14px rgba(45,212,191,0.35)' : '0 1px 4px rgba(0,0,0,0.06)', transition: 'all 0.15s' }}
          >All Jobs</button>
          {jobCategories.map(cat => (
            <button
              key={cat.label}
              onClick={() => setActiveCategory(cat.label)}
              style={{ whiteSpace: 'nowrap', padding: '10px 20px', borderRadius: '100px', fontSize: '13px', fontWeight: 700, border: 'none', cursor: 'pointer', flexShrink: 0, backgroundColor: activeCategory === cat.label ? '#2dd4bf' : 'white', color: activeCategory === cat.label ? 'white' : '#64748b', boxShadow: activeCategory === cat.label ? '0 4px 14px rgba(45,212,191,0.35)' : '0 1px 4px rgba(0,0,0,0.06)', transition: 'all 0.15s' }}
            >
              {cat.icon} {cat.label} <span style={{ opacity: 0.6, fontSize: '11px' }}>({cat.count})</span>
            </button>
          ))}
        </div>

        {/* FILTERS BAR */}
        <div style={{ backgroundColor: 'white', borderRadius: '20px', padding: '16px 24px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', border: '1px solid #f1f5f9', marginBottom: '32px', display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
          {[{ label: 'City', value: 'All Morocco' }, { label: 'Job Type', value: 'Full Time' }, { label: 'Salary', value: 'Any Range' }, { label: 'Experience', value: 'Any Level' }].map(f => (
            <div key={f.label} style={{ display: 'flex', flexDirection: 'column', gap: '2px', borderRight: '1px solid #f1f5f9', paddingRight: '16px' }}>
              <span style={{ fontSize: '9px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.12em' }}>{f.label}</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}>
                <span style={{ fontSize: '14px', fontWeight: 600, color: '#0f172a' }}>{f.value}</span>
                <ChevronDown size={14} color="#94a3b8" />
              </div>
            </div>
          ))}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginLeft: 'auto', gap: '12px' }}>
            <span style={{ fontSize: '13px', color: '#64748b' }}>12,388 jobs found</span>
            <button style={{ padding: '8px 16px', borderRadius: '10px', border: '1px solid #e2e8f0', backgroundColor: 'white', fontSize: '13px', fontWeight: 600, color: '#334155', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
              Sort: Newest <ChevronDown size={13} />
            </button>
          </div>
        </div>

        {/* RECRUITER BANNER */}
        <div style={{ backgroundColor: 'white', border: '1px solid rgba(45,212,191,0.2)', borderRadius: '32px', padding: '40px 48px', textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', marginBottom: '56px' }}>
          <h2 style={{ fontSize: '28px', fontWeight: 800, color: '#0f172a', marginBottom: '12px', letterSpacing: '-0.02em' }}>Find Your Next Star Talent — 100% Free</h2>
          <p style={{ fontSize: '16px', color: '#64748b', marginBottom: '24px', lineHeight: 1.6, maxWidth: '560px', margin: '0 auto 24px' }}>Connect with Morocco's most qualified professionals. Post your job ad today and build the team of your dreams at zero cost.</p>
          <button style={{ backgroundColor: '#2dd4bf', color: 'white', border: 'none', padding: '14px 36px', borderRadius: '100px', fontWeight: 700, fontSize: '16px', cursor: 'pointer', boxShadow: '0 4px 16px rgba(45,212,191,0.3)', transition: 'all 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#0f9b8e'; e.currentTarget.style.transform = 'scale(1.02)' }}
            onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#2dd4bf'; e.currentTarget.style.transform = 'scale(1)' }}
          >Post a Job for FREE</button>
        </div>

        {/* POPULAR JOBS */}
        <section style={{ marginBottom: '64px' }}>
          <SectionHeader sub="Trending Now" title="Popular Jobs" />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
            {popularJobs.map(job => <JobCard key={job.title} job={job} />)}
          </div>
        </section>

        {/* TECH JOBS */}
        <section style={{ marginBottom: '64px' }}>
          <SectionHeader sub="Innovation Hub" title="Tech Jobs" />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
            {techJobs.map(job => <JobCard key={job.title} job={job} />)}
          </div>
        </section>

        {/* FINANCE JOBS */}
        <section style={{ marginBottom: '64px' }}>
          <SectionHeader sub="Capital Markets" title="Finance Jobs" />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
            {financeJobs.map(job => <JobCard key={job.title} job={job} />)}
          </div>
        </section>

        {/* CREATIVE JOBS */}
        <section style={{ marginBottom: '64px' }}>
          <SectionHeader sub="Design & Arts" title="Creative Jobs" />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
            {creativeJobs.map(job => <JobCard key={job.title} job={job} />)}
          </div>
        </section>

        {/* HEALTHCARE JOBS */}
        <section style={{ marginBottom: '64px' }}>
          <SectionHeader sub="Medical Excellence" title="Healthcare Jobs" />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
            {healthcareJobs.map(job => <JobCard key={job.title} job={job} />)}
          </div>
        </section>

        {/* REMOTE OPPORTUNITIES */}
        <section style={{ marginBottom: '64px' }}>
          <SectionHeader sub="Future of Work" title="Remote Opportunities" />
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
            <div style={{ backgroundColor: '#0f172a', padding: '48px', borderRadius: '40px', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'relative', zIndex: 1, color: 'white', maxWidth: '480px' }}>
                <h3 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '16px', lineHeight: 1.2 }}>Work from Anywhere in Morocco</h3>
                <p style={{ fontSize: '16px', opacity: 0.75, marginBottom: '28px', lineHeight: 1.6 }}>Access verified remote positions from top Moroccan and international companies. Curated daily.</p>
                <button style={{ backgroundColor: '#2dd4bf', color: '#00201c', border: 'none', padding: '14px 32px', borderRadius: '100px', fontWeight: 700, fontSize: '14px', cursor: 'pointer', transition: 'background 0.15s' }}
                  onMouseEnter={e => e.currentTarget.style.backgroundColor = '#5eead4'}
                  onMouseLeave={e => e.currentTarget.style.backgroundColor = '#2dd4bf'}
                >View Remote Roles 🚀</button>
              </div>
              <img src="https://images.pexels.com/photos/4050315/pexels-photo-4050315.jpeg?auto=compress&w=600" alt="Remote" style={{ position: 'absolute', right: 0, bottom: 0, width: '45%', height: '100%', objectFit: 'cover', mixBlendMode: 'overlay', opacity: 0.4 }} />
            </div>
            <div style={{ backgroundColor: 'white', padding: '40px', borderRadius: '40px', border: '1px solid #f1f5f9', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', cursor: 'pointer', transition: 'border-color 0.2s, box-shadow 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#2dd4bf'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(45,212,191,0.1)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = '#f1f5f9'; e.currentTarget.style.boxShadow = 'none' }}
            >
              <div>
                <div style={{ width: '56px', height: '56px', borderRadius: '16px', backgroundColor: 'rgba(45,212,191,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', marginBottom: '24px' }}>🌐</div>
                <h3 style={{ fontSize: '22px', fontWeight: 700, color: '#0f172a', marginBottom: '12px' }}>Hybrid Roles</h3>
                <p style={{ color: '#64748b', lineHeight: 1.6, fontSize: '14px' }}>The perfect balance between office presence and remote flexibility. Browse 500+ hybrid roles across Morocco.</p>
              </div>
              <a href="#" style={{ color: '#2dd4bf', fontWeight: 700, fontSize: '14px', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px', marginTop: '28px' }}
                onMouseEnter={e => e.currentTarget.style.gap = '10px'}
                onMouseLeave={e => e.currentTarget.style.gap = '6px'}
              >Browse Hybrid →</a>
            </div>
          </div>
        </section>

        {/* APP DOWNLOAD BANNER */}
        <section style={{ marginBottom: '80px' }}>
          <div style={{ background: 'linear-gradient(135deg, #2dd4bf 0%, #006b5f 100%)', borderRadius: '40px', padding: '64px', display: 'flex', alignItems: 'center', gap: '48px', overflow: 'hidden', position: 'relative', boxShadow: '0 20px 60px rgba(0,107,95,0.2)' }}>
            <div style={{ flex: 1, color: 'white', position: 'relative', zIndex: 1 }}>
              <h2 style={{ fontSize: '36px', fontWeight: 800, marginBottom: '16px', letterSpacing: '-0.02em', lineHeight: 1.1 }}>Join the SouKni Family</h2>
              <p style={{ fontSize: '16px', marginBottom: '32px', opacity: 0.9, lineHeight: 1.6, maxWidth: '480px' }}>Experience premium recruitment at your fingertips. Download the app for exclusive early access and AI-powered job matching.</p>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                {[{ icon: '🍎', label: 'App Store', sub: 'Download on the' }, { icon: '▶', label: 'Google Play', sub: 'Get it on' }].map(btn => (
                  <button key={btn.label} style={{ backgroundColor: '#0f172a', color: 'white', border: 'none', padding: '12px 20px', borderRadius: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', fontFamily: 'Inter, sans-serif', transition: 'transform 0.15s' }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.04)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                  >
                    <span style={{ fontSize: '24px' }}>{btn.icon}</span>
                    <div style={{ textAlign: 'left' }}>
                      <div style={{ fontSize: '9px', opacity: 0.6, textTransform: 'uppercase', lineHeight: 1 }}>{btn.sub}</div>
                      <div style={{ fontSize: '15px', fontWeight: 700, lineHeight: 1.3 }}>{btn.label}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
            <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
              <div style={{ width: '220px', height: '400px', backgroundColor: '#0f172a', borderRadius: '40px', border: '6px solid rgba(255,255,255,0.2)', boxShadow: '0 20px 60px rgba(0,0,0,0.3)', overflow: 'hidden' }}>
                <img src="https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&w=400" alt="App" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
