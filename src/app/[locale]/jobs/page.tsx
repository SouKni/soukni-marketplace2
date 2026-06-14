'use client'

import React, { useState } from 'react'
import Link from 'next/link'

const categories = [
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
  { title: 'Supermarket Staffs', company: 'Retail Excellence Group', salary: '3,500 AED', location: 'Dubai', type: 'Full Time', image: 'https://images.pexels.com/photos/1005638/pexels-photo-1005638.jpeg?auto=compress&w=400' },
  { title: 'Account Assistant', company: 'Capital Trust Global', salary: '7,000 AED', location: 'Abu Dhabi', type: 'Full Time', image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&w=400' },
  { title: 'Waiter/Waitress', company: 'Azure Luxury Lounge', salary: 'Negotiable', location: 'Dubai Marina', type: 'Shift Based', image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&w=400' },
  { title: 'Front Desk Reception', company: 'Skyline Holdings', salary: '5,500 AED', location: 'Downtown Dubai', type: 'Full Time', image: 'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&w=400' },
]

const techJobs = [
  { title: 'Senior Full Stack Developer', company: 'Nexus Tech Solutions', salary: '25,000 AED', location: 'Dubai', type: 'Full Time', image: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&w=400' },
  { title: 'Cloud Architect', company: 'DataSphere Global', salary: '32,000 AED', location: 'Abu Dhabi', type: 'Full Time', image: 'https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&w=400' },
  { title: 'AI Research Engineer', company: 'Future Intelligence', salary: '40,000 AED', location: 'Dubai', type: 'Full Time', image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&w=400' },
  { title: 'DevOps Lead', company: 'CloudScale Systems', salary: '28,000 AED', location: 'Dubai', type: 'Full Time', image: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&w=400' },
]

const financeJobs = [
  { title: 'Investment Analyst', company: 'Global Wealth Partners', salary: '18,000 AED', location: 'DIFC, Dubai', type: 'Full Time', image: 'https://images.pexels.com/photos/6863183/pexels-photo-6863183.jpeg?auto=compress&w=400' },
  { title: 'Portfolio Manager', company: 'Apex Capital', salary: '45,000 AED', location: 'Dubai', type: 'Full Time', image: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&w=400' },
  { title: 'Senior Accountant', company: 'Elite Audit Firm', salary: '12,000 AED', location: 'Abu Dhabi', type: 'Full Time', image: 'https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&w=400' },
  { title: 'Risk Manager', company: 'Secure Finance Group', salary: '22,000 AED', location: 'Dubai', type: 'Full Time', image: 'https://images.pexels.com/photos/7567443/pexels-photo-7567443.jpeg?auto=compress&w=400' },
]

const creativeJobs = [
  { title: 'Creative Director', company: 'Vivid Media Agency', salary: '35,000 AED', location: 'Dubai Design District', type: 'Full Time', image: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&w=400' },
  { title: 'Senior UI/UX Designer', company: 'Digital Craft Studio', salary: '20,000 AED', location: 'Dubai', type: 'Full Time', image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&w=400' },
  { title: 'Fashion Photographer', company: 'Luxe Studio', salary: '15,000 AED', location: 'Dubai', type: 'Contract', image: 'https://images.pexels.com/photos/1264210/pexels-photo-1264210.jpeg?auto=compress&w=400' },
  { title: 'Interior Architect', company: 'Modern Spaces', salary: '24,000 AED', location: 'Abu Dhabi', type: 'Full Time', image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&w=400' },
]

const healthcareJobs = [
  { title: 'Specialist Surgeon', company: 'Emirates Health Group', salary: '85,000 AED', location: 'Dubai', type: 'Full Time', image: 'https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg?auto=compress&w=400' },
  { title: 'Senior Nurse', company: 'City Medical Center', salary: '14,000 AED', location: 'Abu Dhabi', type: 'Full Time', image: 'https://images.pexels.com/photos/3259624/pexels-photo-3259624.jpeg?auto=compress&w=400' },
  { title: 'Clinical Researcher', company: 'BioTech Labs', salary: '26,000 AED', location: 'Dubai', type: 'Full Time', image: 'https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&w=400' },
  { title: 'Orthodontist', company: 'Smile Design Clinic', salary: '50,000 AED', location: 'Dubai', type: 'Full Time', image: 'https://images.pexels.com/photos/305568/pexels-photo-305568.jpeg?auto=compress&w=400' },
]

const navLinks = ['Motors', 'Property', 'The Vault', 'Services', 'Fashion', 'Jobs', 'Mobiles & Computers', 'Community']

function DiamondBadge() {
  return (
    <span style={{ background: 'linear-gradient(90deg, #3cddc7 0%, #ffb875 100%)', color: 'white', fontSize: '10px', fontWeight: 700, padding: '4px 12px', borderRadius: '100px', textTransform: 'uppercase', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>
      Certified & Verified Diamond Member
    </span>
  )
}

function JobCard({ job }: { job: typeof popularJobs[0] }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        backgroundColor: 'white', borderRadius: '32px', overflow: 'hidden',
        border: '1px solid rgba(186,202,197,0.1)',
        boxShadow: hovered ? '0 20px 40px rgba(0,0,0,0.1)' : '0 2px 8px rgba(0,0,0,0.04)',
        transition: 'all 0.5s', fontFamily: 'Inter, sans-serif',
      }}
    >
      <div style={{ position: 'relative', height: '256px', overflow: 'hidden' }}>
        <img src={job.image} alt={job.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.7s', transform: hovered ? 'scale(1.1)' : 'scale(1)' }}
        />
        <div style={{ position: 'absolute', top: '16px', left: '16px' }}><DiamondBadge /></div>
      </div>
      <div style={{ padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: 700, color: hovered ? '#006b5f' : '#161d1b', marginBottom: '4px', transition: 'color 0.2s', lineHeight: 1.3 }}>{job.title}</h3>
            <p style={{ fontSize: '13px', color: '#6b7a76' }}>{job.company}</p>
          </div>
          <div style={{ textAlign: 'right', flexShrink: 0, paddingLeft: '8px' }}>
            <p style={{ fontSize: '14px', fontWeight: 700, color: '#006b5f' }}>{job.salary}</p>
            <p style={{ fontSize: '10px', color: '#6b7a76', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Salary</p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '16px', fontSize: '13px', color: '#6b7a76', marginBottom: '24px' }}>
          <span>📍 {job.location}</span>
          <span>🕐 {job.type}</span>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button style={{ flex: 1, padding: '12px', borderRadius: '12px', border: '1px solid #006b5f', color: '#006b5f', backgroundColor: 'transparent', fontWeight: 700, fontSize: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontFamily: 'Inter, sans-serif', transition: 'background 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(0,107,95,0.05)'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
          >💬 Chat</button>
          <button style={{ flex: 1, padding: '12px', borderRadius: '12px', border: 'none', backgroundColor: '#25D366', color: 'white', fontWeight: 700, fontSize: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontFamily: 'Inter, sans-serif', transition: 'filter 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.filter = 'brightness(1.05)'}
            onMouseLeave={e => e.currentTarget.style.filter = 'brightness(1)'}
          >📞 WhatsApp</button>
        </div>
      </div>
    </div>
  )
}

function SectionHeader({ sub, title, onExplore }: { sub: string, title: string, onExplore?: () => void }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '48px' }}>
      <div>
        <span style={{ color: '#006b5f', fontWeight: 700, fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.15em', display: 'block', marginBottom: '4px' }}>{sub}</span>
        <h2 style={{ fontSize: '48px', fontWeight: 700, color: '#161d1b', letterSpacing: '-0.02em', lineHeight: 1.1 }}>{title}</h2>
      </div>
      <button style={{ color: '#006b5f', fontWeight: 700, fontSize: '15px', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontFamily: 'Inter, sans-serif', transition: 'gap 0.2s' }}
        onMouseEnter={e => e.currentTarget.style.gap = '12px'}
        onMouseLeave={e => e.currentTarget.style.gap = '8px'}
      >Explore All →</button>
    </div>
  )
}

export default function JobsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = React.use(params)

  return (
    <div style={{ fontFamily: 'Inter, system-ui, sans-serif', backgroundColor: '#f4fbf8', minHeight: '100vh' }}>

          </div>
        </section>

        {/* RECRUITER BANNER */}
        <section style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 40px', marginBottom: '48px' }}>
          <div style={{ backgroundColor: '#f4fbf8', border: '1px solid rgba(45,212,191,0.2)', borderRadius: '40px', padding: '48px', textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
            <div style={{ maxWidth: '600px', margin: '0 auto' }}>
              <h2 style={{ fontSize: '36px', fontWeight: 700, color: '#161d1b', marginBottom: '16px', letterSpacing: '-0.02em' }}>Find Your Next Star Talent — 100% Free</h2>
              <p style={{ fontSize: '18px', color: '#3c4a46', marginBottom: '32px', lineHeight: 1.6 }}>Connect with Morocco's most qualified professionals. Post your job ad today and build the team of your dreams at zero cost.</p>
              <button style={{ backgroundColor: '#2dd4bf', color: 'white', border: 'none', padding: '16px 40px', borderRadius: '100px', fontWeight: 700, fontSize: '18px', cursor: 'pointer', fontFamily: 'Inter, sans-serif', boxShadow: '0 4px 16px rgba(45,212,191,0.3)', transition: 'all 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.filter = 'brightness(1.05)'; e.currentTarget.style.boxShadow = '0 6px 24px rgba(45,212,191,0.4)' }}
                onMouseLeave={e => { e.currentTarget.style.filter = 'brightness(1)'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(45,212,191,0.3)' }}
              >Post a Job for FREE</button>
            </div>
          </div>
        </section>

        {/* POPULAR JOBS */}
        <section style={{ maxWidth: '1440px', margin: '0 auto', padding: '64px 40px' }}>
          <SectionHeader sub="Trending Now" title="Popular Jobs" />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '32px' }}>
            {popularJobs.map(job => <JobCard key={job.title} job={job} />)}
          </div>
        </section>

        {/* TECH JOBS */}
        <section style={{ maxWidth: '1440px', margin: '0 auto', padding: '64px 40px' }}>
          <SectionHeader sub="Innovation Hub" title="Tech Jobs" />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '32px' }}>
            {techJobs.map(job => <JobCard key={job.title} job={job} />)}
          </div>
        </section>

        {/* FINANCE JOBS */}
        <section style={{ maxWidth: '1440px', margin: '0 auto', padding: '64px 40px' }}>
          <SectionHeader sub="Capital Markets" title="Finance Jobs" />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '32px' }}>
            {financeJobs.map(job => <JobCard key={job.title} job={job} />)}
          </div>
        </section>

        {/* CREATIVE JOBS */}
        <section style={{ maxWidth: '1440px', margin: '0 auto', padding: '64px 40px' }}>
          <SectionHeader sub="Design & Arts" title="Creative Jobs" />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '32px' }}>
            {creativeJobs.map(job => <JobCard key={job.title} job={job} />)}
          </div>
        </section>

        {/* HEALTHCARE JOBS */}
        <section style={{ maxWidth: '1440px', margin: '0 auto', padding: '64px 40px' }}>
          <SectionHeader sub="Medical Excellence" title="Healthcare Jobs" />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '32px' }}>
            {healthcareJobs.map(job => <JobCard key={job.title} job={job} />)}
          </div>
        </section>

        {/* REMOTE OPPORTUNITIES */}
        <section style={{ backgroundColor: '#eef5f2', padding: '64px 0' }}>
          <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 40px' }}>
            <div style={{ marginBottom: '48px' }}>
              <span style={{ color: '#006b5f', fontWeight: 700, fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.15em', display: 'block', marginBottom: '4px' }}>Future of Work</span>
              <h2 style={{ fontSize: '48px', fontWeight: 700, color: '#161d1b', letterSpacing: '-0.02em' }}>Remote Opportunities</h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '32px' }}>
              {/* Featured bento */}
              <div style={{ backgroundColor: '#006b5f', padding: '48px', borderRadius: '48px', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'relative', zIndex: 1, color: 'white', maxWidth: '480px' }}>
                  <h3 style={{ fontSize: '36px', fontWeight: 700, marginBottom: '24px', lineHeight: 1.2 }}>Work from Anywhere in the World</h3>
                  <p style={{ fontSize: '18px', opacity: 0.8, marginBottom: '32px', lineHeight: 1.6 }}>Access the most prestigious remote positions from top-tier global firms. We curate only verified diamond-level opportunities for our community.</p>
                  <button style={{ backgroundColor: 'white', color: '#006b5f', border: 'none', padding: '14px 36px', borderRadius: '100px', fontWeight: 700, fontSize: '16px', cursor: 'pointer', fontFamily: 'Inter, sans-serif', display: 'flex', alignItems: 'center', gap: '10px', transition: 'background 0.2s' }}
                    onMouseEnter={e => e.currentTarget.style.backgroundColor = '#62fae3'}
                    onMouseLeave={e => e.currentTarget.style.backgroundColor = 'white'}
                  >View Remote Roles 🚀</button>
                </div>
                <img src="https://images.pexels.com/photos/4050315/pexels-photo-4050315.jpeg?auto=compress&w=600" alt="Remote" style={{ position: 'absolute', right: 0, bottom: 0, width: '50%', height: '100%', objectFit: 'cover', mixBlendMode: 'overlay', opacity: 0.5 }} />
              </div>
              {/* Hybrid card */}
              <div style={{ backgroundColor: 'white', padding: '40px', borderRadius: '48px', border: '1px solid rgba(186,202,197,0.2)', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', cursor: 'pointer', transition: 'border-color 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.borderColor = '#006b5f'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(186,202,197,0.2)'}
              >
                <div>
                  <div style={{ width: '64px', height: '64px', borderRadius: '16px', backgroundColor: 'rgba(0,107,95,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px', marginBottom: '32px' }}>🌐</div>
                  <h3 style={{ fontSize: '24px', fontWeight: 700, color: '#161d1b', marginBottom: '16px' }}>Hybrid Roles</h3>
                  <p style={{ color: '#6b7a76', lineHeight: 1.6 }}>The perfect balance between corporate presence and remote flexibility. Browse 500+ hybrid roles in the UAE.</p>
                </div>
                <a href="#" style={{ color: '#006b5f', fontWeight: 700, fontSize: '15px', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px', marginTop: '32px', transition: 'gap 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.gap = '10px'}
                  onMouseLeave={e => e.currentTarget.style.gap = '6px'}
                >Browse Hybrid →</a>
              </div>
            </div>
          </div>
        </section>

        {/* JOIN SOUKNI FAMILY */}
        <section style={{ maxWidth: '1440px', margin: '0 auto', padding: '64px 40px' }}>
          <div style={{ background: 'linear-gradient(135deg, #2dd4bf 0%, #006b5f 100%)', borderRadius: '48px', padding: '80px', display: 'flex', alignItems: 'center', gap: '48px', overflow: 'hidden', position: 'relative', boxShadow: '0 20px 60px rgba(0,107,95,0.2)' }}>
            <div style={{ flex: 1, color: 'white', position: 'relative', zIndex: 1 }}>
              <h2 style={{ fontSize: '48px', fontWeight: 700, marginBottom: '24px', letterSpacing: '-0.03em', lineHeight: 1.1 }}>Join the SouKni Family</h2>
              <p style={{ fontSize: '18px', marginBottom: '40px', opacity: 0.9, lineHeight: 1.6, maxWidth: '560px' }}>Experience luxury recruitment at your fingertips. Download our mobile app for exclusive early access to premium listings and AI-powered job matching.</p>
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                {[{ icon: '🍎', label: 'App Store', sub: 'Download on the' }, { icon: '▶', label: 'Google Play', sub: 'Get it on' }].map(btn => (
                  <button key={btn.label} style={{ backgroundColor: '#161d1b', color: 'white', border: 'none', padding: '14px 24px', borderRadius: '16px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px', fontFamily: 'Inter, sans-serif', transition: 'transform 0.15s' }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                  >
                    <span style={{ fontSize: '28px' }}>{btn.icon}</span>
                    <div style={{ textAlign: 'left' }}>
                      <div style={{ fontSize: '10px', opacity: 0.7, textTransform: 'uppercase', lineHeight: 1 }}>{btn.sub}</div>
                      <div style={{ fontSize: '17px', fontWeight: 700, lineHeight: 1.3 }}>{btn.label}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
            <div style={{ flex: 1, display: 'flex', justifyContent: 'center', position: 'relative' }}>
              <div style={{ width: '256px', height: '480px', backgroundColor: 'black', borderRadius: '48px', border: '8px solid rgba(255,255,255,0.2)', boxShadow: '0 20px 60px rgba(0,0,0,0.3)', overflow: 'hidden' }}>
                <img src="https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&w=400" alt="App" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ position: 'absolute', right: '-80px', top: '40px', width: '256px', height: '480px', backgroundColor: 'black', borderRadius: '48px', border: '8px solid rgba(255,255,255,0.1)', boxShadow: '0 20px 60px rgba(0,0,0,0.2)', opacity: 0.5, filter: 'blur(1px)' }} />
            </div>
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer style={{ backgroundColor: '#1a202c', color: 'white', paddingTop: '96px', paddingBottom: '48px', marginTop: '64px' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 40px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '48px', marginBottom: '80px' }}>
            <div>
              <div style={{ fontSize: '28px', fontWeight: 800, color: '#006b5f', letterSpacing: '-0.03em', marginBottom: '32px' }}>SouKni</div>
              <p style={{ fontSize: '15px', color: 'rgba(186,202,197,0.6)', lineHeight: 1.7, marginBottom: '32px', maxWidth: '280px' }}>The world's first luxury marketplace for high-end professional connections and lifestyle discovery.</p>
              <div style={{ display: 'flex', gap: '12px' }}>
                {['🌐', '✉️', '👥'].map((icon, i) => (
                  <a key={i} href="#" style={{ width: '40px', height: '40px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', fontSize: '18px', transition: 'background 0.2s' }}
                    onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'}
                    onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                  >{icon}</a>
                ))}
              </div>
            </div>
            {[
              { title: 'SouKni Pro', links: ['SouKni Immo Pro', 'SouKni Electro Pro', 'SouKni Auto Pro'] },
              { title: 'Concierge', links: ['Sustainability Charter', 'Heritage & Craft', 'Global Logistics', 'Priority Support'] },
              { title: 'Intelligence', links: ['Market Insights', 'Privacy Policy', 'Merchant Studio', 'Career Analytics'] },
            ].map(col => (
              <div key={col.title}>
                <h4 style={{ fontWeight: 700, fontSize: '18px', color: 'white', marginBottom: '32px' }}>{col.title}</h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {col.links.map(link => (
                    <li key={link} style={{ marginBottom: '16px' }}>
                      <a href="#" style={{ fontSize: '15px', color: 'rgba(186,202,197,0.6)', textDecoration: 'none', transition: 'color 0.15s' }}
                        onMouseEnter={e => e.currentTarget.style.color = '#2dd4bf'}
                        onMouseLeave={e => e.currentTarget.style.color = 'rgba(186,202,197,0.6)'}
                      >{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
            <p style={{ fontSize: '13px', color: 'rgba(186,202,197,0.4)', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 600 }}>© 2026 SOUKNI LUXURY MARKETPLACE. ALL RIGHTS RESERVED.</p>
            <div style={{ display: 'flex', gap: '32px' }}>
              {['Terms of Service', 'Cookie Policy'].map(link => (
                <a key={link} href="#" style={{ fontSize: '13px', color: 'rgba(186,202,197,0.4)', textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600, transition: 'color 0.15s' }}
                  onMouseEnter={e => e.currentTarget.style.color = 'white'}
                  onMouseLeave={e => e.currentTarget.style.color = 'rgba(186,202,197,0.4)'}
                >{link}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
