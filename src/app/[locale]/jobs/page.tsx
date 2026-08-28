'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { Search, MapPin, Clock, ChevronRight, Heart, MessageCircle, Building2, GraduationCap, Briefcase, Users } from 'lucide-react'
import { useDictionary } from '@/lib/useDictionary'
import Breadcrumb from '@/components/ui/Breadcrumb'

const jobCategories = [
  { label: 'Real Estate', count: '460', slug: 'real-estate', image: 'https://images.pexels.com/photos/7415083/pexels-photo-7415083.jpeg?auto=compress&w=600' },
  { label: 'Restaurant & Hospitality', count: '2,300', slug: 'restaurant', image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&w=600' },
  { label: 'Construction', count: '340', slug: 'construction', image: 'https://images.pexels.com/photos/159306/construction-site-build-construction-work-159306.jpeg?auto=compress&w=600' },
  { label: 'Marketing & Advertising', count: '210', slug: 'marketing', image: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&w=600' },
  { label: 'Customer Service', count: '440', slug: 'customer-service', image: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&w=600' },
  { label: 'Security & Guard', count: '40', slug: 'security', image: 'https://images.pexels.com/photos/612923/pexels-photo-612923.jpeg?auto=compress&w=600' },
  { label: 'Medical & Healthcare', count: '220', slug: 'medical', image: 'https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg?auto=compress&w=600' },
  { label: 'Home Cleaning', count: '370', slug: 'home-cleaning', image: 'https://images.pexels.com/photos/4239146/pexels-photo-4239146.jpeg?auto=compress&w=600' },
  { label: 'Handyman & Technician', count: '390', slug: 'handyman', image: 'https://images.pexels.com/photos/8005397/pexels-photo-8005397.jpeg?auto=compress&w=600' },
  { label: 'HR \& Admin', count: '420', slug: 'hr-admin', image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&w=600' },
  { label: 'Logistics \& Distribution', count: '580', slug: 'logistics', image: 'https://images.pexels.com/photos/4483610/pexels-photo-4483610.jpeg?auto=compress&w=600' },
  { label: 'Manufacturing \& Warehouse', count: '720', slug: 'manufacturing', image: 'https://images.pexels.com/photos/3846022/pexels-photo-3846022.jpeg?auto=compress&w=600' },
]

const moreCategories = [
  { label: 'Manufacturing & Warehouse', count: '440' },
  { label: 'HR & Admin', count: '420', slug: 'hr-admin' },
  { label: 'Handyman & Technician', count: '390' },
  { label: 'Restaurant Operations', count: '360' },
  { label: 'Construction', count: '340' },
  { label: 'Logistics & Distribution', count: '220' },
  { label: 'Medical & Healthcare', count: '220' },
  { label: 'Marketing & Advertising', count: '210' },
  { label: 'Customer Service', count: '440' },
  { label: 'Legal Services', count: '40' },
  { label: 'Security & Guard', count: '40' },
  { label: 'Education', count: '60' },
  { label: 'Sports & Fitness', count: '20' },
  { label: 'Others', count: '590' },
]

const jobTypes = [
  { label: 'Full Time', count: '9,410', icon: <Briefcase size={28} color="#2dd4bf" /> },
  { label: 'Part Time', count: '190', icon: <Clock size={28} color="#2dd4bf" /> },
  { label: 'Contract', count: '240', icon: <Building2 size={28} color="#2dd4bf" /> },
  { label: 'Remote', count: '310', icon: <Users size={28} color="#2dd4bf" /> },
]

const qualifications = [
  { label: 'High School', count: '285' },
  { label: 'Bachelors Degree', count: '358' },
  { label: 'Masters Degree', count: '11' },
  { label: 'PhD', count: '0' },
]

const popularJobs = [
  { id: '1', title: 'Supermarket Staff', company: 'Retail Excellence Group', salary: '5,500 MAD', location: 'Casablanca', type: 'Full Time', image: 'https://images.pexels.com/photos/1005638/pexels-photo-1005638.jpeg?auto=compress&w=400' },
  { id: '2', title: 'Account Assistant', company: 'Capital Trust Global', salary: '8,000 MAD', location: 'Rabat', type: 'Full Time', image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&w=400' },
  { id: '3', title: 'Waiter / Waitress', company: 'Azure Luxury Lounge', salary: 'Negotiable', location: 'Marrakech', type: 'Shift Based', image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&w=400' },
  { id: '4', title: 'Front Desk Receptionist', company: 'Skyline Holdings', salary: '6,500 MAD', location: 'Tangier', type: 'Full Time', image: 'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&w=400' },
  { id: '4b', title: 'Warehouse Supervisor', company: 'LogiTrans Morocco', salary: '7,200 MAD', location: 'Casablanca', type: 'Full Time', image: 'https://images.pexels.com/photos/4481259/pexels-photo-4481259.jpeg?auto=compress&w=400' },
  { id: '4c', title: 'Delivery Driver', company: 'Speedy Logistics', salary: '4,800 MAD', location: 'Rabat', type: 'Full Time', image: 'https://images.pexels.com/photos/4391470/pexels-photo-4391470.jpeg?auto=compress&w=400' },
  { id: '4d', title: 'Retail Sales Associate', company: 'Marjane Holding', salary: '4,200 MAD', location: 'Fes', type: 'Full Time', image: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&w=400' },
  { id: '4e', title: 'Call Center Agent', company: 'Webhelp Morocco', salary: '5,000 MAD', location: 'Casablanca', type: 'Full Time', image: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&w=400' },
]

const techJobs = [
  { id: '5', title: 'Senior Full Stack Developer', company: 'Nexus Tech Solutions', salary: '25,000 MAD', location: 'Casablanca', type: 'Full Time', image: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&w=400' },
  { id: '6', title: 'Cloud Architect', company: 'DataSphere Global', salary: '32,000 MAD', location: 'Rabat', type: 'Full Time', image: 'https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&w=400' },
  { id: '7', title: 'AI Research Engineer', company: 'Future Intelligence', salary: '40,000 MAD', location: 'Casablanca', type: 'Full Time', image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&w=400' },
  { id: '8', title: 'DevOps Lead', company: 'CloudScale Systems', salary: '28,000 MAD', location: 'Agadir', type: 'Full Time', image: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&w=400' },
  { id: '8b', title: 'Mobile App Developer', company: 'AppFactory MA', salary: '20,000 MAD', location: 'Rabat', type: 'Full Time', image: 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&w=400' },
  { id: '8c', title: 'Data Analyst', company: 'InsightWorks', salary: '16,000 MAD', location: 'Casablanca', type: 'Full Time', image: 'https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg?auto=compress&w=400' },
  { id: '8d', title: 'Cybersecurity Specialist', company: 'SecureNet Morocco', salary: '27,000 MAD', location: 'Rabat', type: 'Full Time', image: 'https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&w=400' },
  { id: '8e', title: 'UI/UX Product Designer', company: 'PixelForge Studio', salary: '18,500 MAD', location: 'Marrakech', type: 'Full Time', image: 'https://images.pexels.com/photos/196645/pexels-photo-196645.jpeg?auto=compress&w=400' },
]

const salesJobs = [
  { id: 's1', title: 'Business Development Manager', company: 'Atlas Trade Group', salary: '15,000 MAD', location: 'Casablanca', type: 'Full Time', image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&w=400' },
  { id: 's2', title: 'Key Account Executive', company: 'Maghreb Distribution', salary: '12,000 MAD', location: 'Rabat', type: 'Full Time', image: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&w=400' },
  { id: 's3', title: 'Retail Sales Manager', company: 'Marjane Holding', salary: '13,500 MAD', location: 'Marrakech', type: 'Full Time', image: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&w=400' },
  { id: 's4', title: 'Sales Representative B2B', company: 'IndustriPro', salary: '9,000 MAD', location: 'Tangier', type: 'Full Time', image: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&w=400' },
]

const financeJobs = [
  { id: 'f1', title: 'Investment Analyst', company: 'Global Wealth Partners', salary: '18,000 MAD', location: 'Casablanca Finance City', type: 'Full Time', image: 'https://images.pexels.com/photos/6863183/pexels-photo-6863183.jpeg?auto=compress&w=400' },
  { id: 'f2', title: 'Portfolio Manager', company: 'Apex Capital', salary: '45,000 MAD', location: 'Rabat', type: 'Full Time', image: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&w=400' },
  { id: 'f3', title: 'Senior Accountant', company: 'Elite Audit Firm', salary: '12,000 MAD', location: 'Marrakech', type: 'Full Time', image: 'https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&w=400' },
  { id: 'f4', title: 'Risk Manager', company: 'Secure Finance Group', salary: '22,000 MAD', location: 'Tangier', type: 'Full Time', image: 'https://images.pexels.com/photos/7567443/pexels-photo-7567443.jpeg?auto=compress&w=400' },
]

const hospitalityJobs = [
  { id: 'h1', title: 'Hotel General Manager', company: 'Riad Collection Group', salary: '28,000 MAD', location: 'Marrakech', type: 'Full Time', image: 'https://images.pexels.com/photos/261101/pexels-photo-261101.jpeg?auto=compress&w=400' },
  { id: 'h2', title: 'Executive Chef', company: 'Azure Luxury Lounge', salary: '18,000 MAD', location: 'Casablanca', type: 'Full Time', image: 'https://images.pexels.com/photos/2696064/pexels-photo-2696064.jpeg?auto=compress&w=400' },
  { id: 'h3', title: 'Front Office Manager', company: 'Skyline Holdings', salary: '11,000 MAD', location: 'Tangier', type: 'Full Time', image: 'https://images.pexels.com/photos/271639/pexels-photo-271639.jpeg?auto=compress&w=400' },
  { id: 'h4', title: 'Events Coordinator', company: 'Grand Oasis Resorts', salary: '9,500 MAD', location: 'Agadir', type: 'Full Time', image: 'https://images.pexels.com/photos/587741/pexels-photo-587741.jpeg?auto=compress&w=400' },
]

const healthcareJobs = [
  { id: 'hc1', title: 'Specialist Surgeon', company: 'Moroccan Health Group', salary: '85,000 MAD', location: 'Casablanca', type: 'Full Time', image: 'https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg?auto=compress&w=400' },
  { id: 'hc2', title: 'Senior Nurse', company: 'City Medical Center', salary: '14,000 MAD', location: 'Rabat', type: 'Full Time', image: 'https://images.pexels.com/photos/3259624/pexels-photo-3259624.jpeg?auto=compress&w=400' },
  { id: 'hc3', title: 'Clinical Researcher', company: 'BioTech Labs', salary: '26,000 MAD', location: 'Fes', type: 'Full Time', image: 'https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&w=400' },
  { id: 'hc4', title: 'Orthodontist', company: 'Smile Design Clinic', salary: '50,000 MAD', location: 'Tangier', type: 'Full Time', image: 'https://images.pexels.com/photos/305568/pexels-photo-305568.jpeg?auto=compress&w=400' },
]

const featuredCompanies = [
  { name: 'Attijariwafa Bank', sector: 'Finance', initials: 'AW' },
  { name: 'Maroc Telecom', sector: 'Telecom', initials: 'MT' },
  { name: 'OCP Group', sector: 'Mining', initials: 'OCP' },
  { name: 'CIH Bank', sector: 'Banking', initials: 'CIH' },
  { name: 'ONCF', sector: 'Transport', initials: 'ON' },
  { name: 'Royal Air Maroc', sector: 'Aviation', initials: 'RAM' },
]

function JobCard({ job, t }: { job: typeof popularJobs[0]; t: any }) {
  const [liked, setLiked] = useState(false)
  const [hovered, setHovered] = useState(false)
  return (
    <article onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{ backgroundColor: 'white', borderRadius: '28px', overflow: 'hidden', border: '1px solid #f1f5f9', boxShadow: hovered ? '0 20px 40px rgba(0,0,0,0.1)' : '0 2px 8px rgba(0,0,0,0.04)', transition: 'all 0.3s', display: 'flex', flexDirection: 'column' }}>
      <div style={{ position: 'relative', height: '180px', overflow: 'hidden' }}>
        <img src={job.image} alt={job.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s', transform: hovered ? 'scale(1.06)' : 'scale(1)' }} />
        <div style={{ position: 'absolute', top: '12px', left: '12px', background: 'linear-gradient(135deg, #2dd4bf, #0d9488)', color: 'white', fontSize: '9px', fontWeight: 700, padding: '4px 10px', borderRadius: '100px', textTransform: 'uppercase' }}>{t.jobs.diamondMember}</div>
        <button onClick={() => setLiked(!liked)} style={{ position: 'absolute', top: '12px', right: '12px', width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.9)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Heart size={14} fill={liked ? '#ef4444' : 'none'} color={liked ? '#ef4444' : '#64748b'} />
        </button>
      </div>
      <div style={{ padding: '16px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <h3 style={{ fontSize: '15px', fontWeight: 700, color: hovered ? '#2dd4bf' : '#0f172a', marginBottom: '3px', transition: 'color 0.2s' }}>{job.title}</h3>
        <p style={{ fontSize: '12px', color: '#64748b', marginBottom: '10px' }}>{job.company}</p>
        <div style={{ display: 'flex', gap: '12px', fontSize: '11px', color: '#64748b', marginBottom: '12px' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}><MapPin size={11} />{job.location}</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}><Clock size={11} />{job.type}</span>
        </div>
        <div style={{ fontSize: '16px', fontWeight: 800, color: '#2dd4bf', marginBottom: '14px' }}>{job.salary}</div>
        <div style={{ display: 'flex', gap: '8px', marginTop: 'auto' }}>
          <button style={{ flex: 1, padding: '10px', borderRadius: '10px', border: 'none', backgroundColor: 'rgba(45,212,191,0.1)', color: '#2dd4bf', fontWeight: 700, fontSize: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', transition: 'all 0.15s' }}
            onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#2dd4bf'; e.currentTarget.style.color = 'white' }}
            onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'rgba(45,212,191,0.1)'; e.currentTarget.style.color = '#2dd4bf' }}>
            <MessageCircle size={13} /> {t.jobs.chat}
          </button>
          <button style={{ flex: 1, padding: '10px', borderRadius: '10px', border: 'none', backgroundColor: '#22c55e', color: 'white', fontWeight: 700, fontSize: '12px', cursor: 'pointer', transition: 'background 0.15s' }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#16a34a'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = '#22c55e'}>{t.common.whatsapp}</button>
        </div>
      </div>
    </article>
  )
}

export default function JobsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = React.use(params)
  const t = useDictionary(locale)
  const jobCategories = [
    { label: t.jobs.catRealEstate,     count: '460',   slug: 'real-estate',      image: 'https://images.pexels.com/photos/7415083/pexels-photo-7415083.jpeg?auto=compress&w=600' },
    { label: t.jobs.catRestaurant,     count: '2,300', slug: 'restaurant',       image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&w=600' },
    { label: t.jobs.catConstruction,   count: '340',   slug: 'construction',     image: 'https://images.pexels.com/photos/159306/construction-site-build-construction-work-159306.jpeg?auto=compress&w=600' },
    { label: t.jobs.catMarketing,      count: '210',   slug: 'marketing',        image: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&w=600' },
    { label: t.jobs.catCustomerService,count: '440',   slug: 'customer-service', image: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&w=600' },
    { label: t.jobs.catSecurity,       count: '40',    slug: 'security',         image: 'https://images.pexels.com/photos/612923/pexels-photo-612923.jpeg?auto=compress&w=600' },
    { label: t.jobs.catMedical,        count: '220',   slug: 'medical',          image: 'https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg?auto=compress&w=600' },
    { label: t.jobs.catHomeCleaning,   count: '370',   slug: 'home-cleaning',    image: 'https://images.pexels.com/photos/4239146/pexels-photo-4239146.jpeg?auto=compress&w=600' },
    { label: t.jobs.catHandyman,       count: '390',   slug: 'handyman',         image: 'https://images.pexels.com/photos/8005397/pexels-photo-8005397.jpeg?auto=compress&w=600' },
    { label: t.jobs.catHrAdmin,        count: '420',   slug: 'hr-admin',         image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&w=600' },
    { label: t.jobs.catLogistics,      count: '580',   slug: 'logistics',        image: 'https://images.pexels.com/photos/4483610/pexels-photo-4483610.jpeg?auto=compress&w=600' },
    { label: t.jobs.catManufacturing,  count: '720',   slug: 'manufacturing',    image: 'https://images.pexels.com/photos/3846022/pexels-photo-3846022.jpeg?auto=compress&w=600' },
    { label: t.jobs.catAccounting,     count: '150',   slug: 'accounting',       image: 'https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&w=600' },
    { label: t.jobs.catIt,             count: '260',   slug: 'it',               image: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&w=600' },
  ]
  const moreCategories = [
    { label: t.jobs.catManufacturing, count: '440' },
    { label: t.jobs.catHrAdmin,       count: '420', slug: 'hr-admin' },
    { label: t.jobs.catHandyman,      count: '390' },
    { label: t.jobs.catRestaurantOps, count: '360' },
    { label: t.jobs.catConstruction,  count: '340' },
    { label: t.jobs.catLogistics,     count: '220' },
    { label: t.jobs.catMedical,       count: '220' },
    { label: t.jobs.catMarketing,     count: '210' },
    { label: t.jobs.catCustomerService,count:'440' },
    { label: t.jobs.catLegal,         count: '40'  },
    { label: t.jobs.catSecurity,      count: '40'  },
    { label: t.jobs.catEducation,     count: '60'  },
    { label: t.jobs.catSports,        count: '20'  },
    { label: t.jobs.catOthers,        count: '590' },
  ]
  const jobTypes = [
    { label: t.jobs.typeFullTime, count: '9,410', icon: <Briefcase size={28} color="#2dd4bf" /> },
    { label: t.jobs.typePartTime, count: '190',   icon: <Clock size={28} color="#2dd4bf" /> },
    { label: t.jobs.typeContract, count: '240',   icon: <Building2 size={28} color="#2dd4bf" /> },
    { label: t.jobs.typeRemote,   count: '310',   icon: <Users size={28} color="#2dd4bf" /> },
  ]
  const qualifications = [
    { label: t.jobs.qualHighSchool, count: '285' },
    { label: t.jobs.qualBachelors,  count: '358' },
    { label: t.jobs.qualMasters,    count: '11'  },
    { label: t.jobs.qualPhD,        count: '0'   },
  ]
  const [search, setSearch] = useState('')
  const [showMoreCats, setShowMoreCats] = useState(false)

  return (
    <div style={{ fontFamily: 'Inter, system-ui, sans-serif', backgroundColor: '#f4fbf8', minHeight: '100vh' }}>

      {/* HERO */}
      <section style={{ position: 'relative', height: '440px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 16px', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(15,23,42,0.55), rgba(15,23,42,0.55)), url(https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&w=1600)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div style={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: '720px', textAlign: 'center' }}>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '12px', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '12px' }}>{t.jobs.badge}</p>
          <h1 style={{ fontSize: '48px', fontWeight: 800, color: 'white', marginBottom: '8px', letterSpacing: '-0.02em', lineHeight: 1.1, textShadow: '0 2px 20px rgba(0,0,0,0.3)' }}>{t.jobs.heroTitle}</h1>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '16px', marginBottom: '28px' }}>{t.jobs.heroSubtitle}</p>
          <div style={{ background: 'rgba(255,255,255,0.72)', backdropFilter: 'blur(16px)', borderRadius: '100px', padding: '6px 6px 6px 24px', display: 'flex', alignItems: 'center', boxShadow: '0 20px 60px rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.35)' }}>
            <Search size={18} color="#64748b" style={{ flexShrink: 0 }} />
            <input value={search} onChange={e => setSearch(e.target.value)} type="text" placeholder={t.jobs.keywordPlaceholder}
              style={{ flex: 1, backgroundColor: 'transparent', border: 'none', outline: 'none', padding: '10px 16px', fontSize: '15px', fontFamily: 'Inter, sans-serif', color: '#0f172a' }} />
            <button style={{ backgroundColor: '#2dd4bf', color: 'white', border: 'none', padding: '12px 28px', borderRadius: '100px', fontWeight: 700, fontSize: '13px', cursor: 'pointer' }}>{t.common.search}</button>
          </div>
          <div style={{ marginTop: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Link href={`/${locale}/post-ad`} style={{ color: '#62fae3', fontWeight: 700, fontSize: '13px', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px' }}>
              {t.jobs.recruiterLink} <ChevronRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* STATS */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginTop: '-48px', position: 'relative', zIndex: 10, marginBottom: '56px' }}>
          {[{ label: t.jobs.statActiveJobs, value: '12,000+' }, { label: t.jobs.statCompanies, value: '3,400' }, { label: t.jobs.statPlaced, value: '840' }, { label: t.jobs.statCities, value: '12' }].map(s => (
            <div key={s.label} style={{ backgroundColor: 'white', borderRadius: '20px', padding: '20px 24px', boxShadow: '0 8px 32px rgba(0,0,0,0.08)', textAlign: 'center' }}>
              <p style={{ fontSize: '26px', fontWeight: 800, color: '#2dd4bf', marginBottom: '4px', letterSpacing: '-0.02em' }}>{s.value}</p>
              <p style={{ fontSize: '11px', fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{s.label}</p>
            </div>
          ))}
        </div>

        <Breadcrumb
          items={[
            { label: 'Home', href: `/${locale}` },
            { label: 'Jobs' },
          ]}
        />

        {/* JOBS BY CATEGORY — image grid */}
        <section style={{ marginBottom: '56px' }}>
          <h2 style={{ fontSize: '28px', fontWeight: 800, color: '#0f172a', marginBottom: '28px', letterSpacing: '-0.01em' }}>{t.jobs.byCategoryTitle}</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '20px' }}>
            {jobCategories.map(cat => (
              <Link key={cat.slug} href={`/${locale}/jobs/${cat.slug}`} style={{ textDecoration: 'none' }}>
                <div style={{ position: 'relative', height: '160px', borderRadius: '24px', overflow: 'hidden', cursor: 'pointer', transition: 'transform 0.2s' }}
                  onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.transform = 'scale(1.03)'}
                  onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.transform = 'scale(1)'}>
                  <img src={cat.image} alt={cat.label} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.85), rgba(0,0,0,0.1))' }} />
                  <div style={{ position: 'absolute', bottom: '16px', left: '16px', right: '16px' }}>
                    <p style={{ fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, color: '#62fae3', marginBottom: '4px' }}>{cat.count} {t.jobs.jobsSuffix.toLowerCase()}</p>
                    <p style={{ fontSize: '15px', fontWeight: 800, color: 'white', letterSpacing: '-0.01em' }}>{cat.label}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* MORE CATEGORY PILLS */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center' }}>
            {(showMoreCats ? moreCategories : moreCategories.slice(0, 8)).map(cat => (
              <button key={cat.label} style={{ padding: '6px 16px', borderRadius: '100px', border: '1px solid #e2e8f0', backgroundColor: 'white', fontSize: '12px', fontWeight: 600, color: '#334155', cursor: 'pointer', whiteSpace: 'nowrap', transition: 'all 0.15s' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#2dd4bf'; e.currentTarget.style.color = '#2dd4bf' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.color = '#334155' }}>
                {cat.label} <span style={{ opacity: 0.6, fontSize: '11px' }}>({cat.count})</span>
              </button>
            ))}
            <button onClick={() => setShowMoreCats(!showMoreCats)}
              style={{ padding: '6px 16px', borderRadius: '100px', border: '1px solid #e2e8f0', backgroundColor: 'white', fontSize: '12px', fontWeight: 700, color: '#2dd4bf', cursor: 'pointer' }}>
              {showMoreCats ? t.jobs.viewLess : t.jobs.viewMoreBtn} {showMoreCats ? '↑' : '↓'}
            </button>
          </div>
        </section>

        {/* POPULAR JOBS */}
        <section style={{ marginBottom: '56px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '28px' }}>
            <div>
              <span style={{ color: '#2dd4bf', fontWeight: 700, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.15em', display: 'block', marginBottom: '4px' }}>{t.jobs.trendingNow}</span>
              <h2 style={{ fontSize: '28px', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.01em' }}>{t.jobs.popularJobsTitle}</h2>
            </div>
            <a href="#" style={{ color: '#2dd4bf', fontWeight: 700, fontSize: '14px', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}>{t.jobs.exploreAll} <ChevronRight size={15} /></a>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
            {popularJobs.map(job => <JobCard key={job.id} job={job} t={t} />)}
          </div>
        </section>

        {/* JOBS BY TYPE */}
        <section style={{ marginBottom: '56px' }}>
          <h2 style={{ fontSize: '28px', fontWeight: 800, color: '#0f172a', marginBottom: '28px', letterSpacing: '-0.01em' }}>{t.jobs.byTypeTitle}</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
            {jobTypes.map(jt => (
              <div key={jt.label} style={{ backgroundColor: 'white', borderRadius: '24px', padding: '32px 24px', textAlign: 'center', border: '1px solid #f1f5f9', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', cursor: 'pointer', transition: 'all 0.2s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = '0 12px 32px rgba(0,0,0,0.1)'; (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = '0 2px 8px rgba(0,0,0,0.04)'; (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)' }}>
                <div style={{ backgroundColor: 'rgba(45,212,191,0.1)', width: '64px', height: '64px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>{jt.icon}</div>
                <p style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', marginBottom: '4px' }}>{jt.label}</p>
                <p style={{ fontSize: '13px', color: '#64748b' }}>{jt.count}+ {t.jobs.jobsSuffix}</p>
              </div>
            ))}
          </div>
        </section>

        {/* JOBS BY QUALIFICATION */}
        <section style={{ marginBottom: '56px' }}>
          <h2 style={{ fontSize: '28px', fontWeight: 800, color: '#0f172a', marginBottom: '28px', letterSpacing: '-0.01em' }}>{t.jobs.byQualificationTitle}</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
            {qualifications.map(q => (
              <div key={q.label} style={{ backgroundColor: 'white', borderRadius: '24px', padding: '32px 24px', textAlign: 'center', border: '1px solid #f1f5f9', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', cursor: 'pointer', transition: 'all 0.2s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = '0 12px 32px rgba(0,0,0,0.1)'; (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = '0 2px 8px rgba(0,0,0,0.04)'; (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)' }}>
                <div style={{ backgroundColor: 'rgba(45,212,191,0.1)', width: '64px', height: '64px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                  <GraduationCap size={28} color="#2dd4bf" />
                </div>
                <p style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', marginBottom: '4px' }}>{q.label}</p>
                <p style={{ fontSize: '13px', color: '#64748b' }}>{q.count}+ {t.jobs.jobsSuffix}</p>
              </div>
            ))}
          </div>
        </section>

        {/* TECH JOBS */}
        <section style={{ marginBottom: '56px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '28px' }}>
            <div>
              <span style={{ color: '#2dd4bf', fontWeight: 700, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.15em', display: 'block', marginBottom: '4px' }}>{t.jobs.innovationHub}</span>
              <h2 style={{ fontSize: '28px', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.01em' }}>{t.jobs.techJobsTitle}</h2>
            </div>
            <Link href={`/${locale}/jobs/tech`} style={{ color: '#2dd4bf', fontWeight: 700, fontSize: '14px', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}>{t.jobs.viewAll} <ChevronRight size={15} /></Link>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
            {techJobs.map(job => <JobCard key={job.id} job={job} t={t} />)}
          </div>
        </section>

        {/* SALES JOBS */}
        <section style={{ marginBottom: '56px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '28px' }}>
            <div>
              <span style={{ color: '#2dd4bf', fontWeight: 700, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.15em', display: 'block', marginBottom: '4px' }}>{t.jobs.businessGrowth}</span>
              <h2 style={{ fontSize: '28px', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.01em' }}>{t.jobs.salesJobsTitle}</h2>
            </div>
            <a href="#" style={{ color: '#2dd4bf', fontWeight: 700, fontSize: '14px', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}>{t.jobs.exploreAll} <ChevronRight size={15} /></a>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
            {salesJobs.map(job => <JobCard key={job.id} job={job} t={t} />)}
          </div>
        </section>

        {/* FINANCE JOBS */}
        <section style={{ marginBottom: '56px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '28px' }}>
            <div>
              <span style={{ color: '#2dd4bf', fontWeight: 700, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.15em', display: 'block', marginBottom: '4px' }}>{t.jobs.capitalMarkets}</span>
              <h2 style={{ fontSize: '28px', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.01em' }}>{t.jobs.financeJobsTitle}</h2>
            </div>
            <a href="#" style={{ color: '#2dd4bf', fontWeight: 700, fontSize: '14px', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}>{t.jobs.exploreAll} <ChevronRight size={15} /></a>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
            {financeJobs.map(job => <JobCard key={job.id} job={job} t={t} />)}
          </div>
        </section>

        {/* HOSPITALITY JOBS */}
        <section style={{ marginBottom: '56px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '28px' }}>
            <div>
              <span style={{ color: '#2dd4bf', fontWeight: 700, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.15em', display: 'block', marginBottom: '4px' }}>{t.jobs.hotelsdining}</span>
              <h2 style={{ fontSize: '28px', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.01em' }}>{t.jobs.hospitalityJobsTitle}</h2>
            </div>
            <a href="#" style={{ color: '#2dd4bf', fontWeight: 700, fontSize: '14px', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}>{t.jobs.exploreAll} <ChevronRight size={15} /></a>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
            {hospitalityJobs.map(job => <JobCard key={job.id} job={job} t={t} />)}
          </div>
        </section>

        {/* HEALTHCARE JOBS */}
        <section style={{ marginBottom: '56px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '28px' }}>
            <div>
              <span style={{ color: '#2dd4bf', fontWeight: 700, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.15em', display: 'block', marginBottom: '4px' }}>{t.jobs.medicalExcellence}</span>
              <h2 style={{ fontSize: '28px', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.01em' }}>{t.jobs.healthcareJobsTitle}</h2>
            </div>
            <a href="#" style={{ color: '#2dd4bf', fontWeight: 700, fontSize: '14px', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}>{t.jobs.exploreAll} <ChevronRight size={15} /></a>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
            {healthcareJobs.map(job => <JobCard key={job.id} job={job} t={t} />)}
          </div>
        </section>

        {/* FEATURED COMPANIES */}
        <section style={{ marginBottom: '56px' }}>
          <h2 style={{ fontSize: '28px', fontWeight: 800, color: '#0f172a', marginBottom: '28px', letterSpacing: '-0.01em' }}>{t.jobs.featuredCompaniesTitle}</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '16px' }}>
            {featuredCompanies.map(co => (
              <div key={co.name} style={{ backgroundColor: 'white', borderRadius: '20px', padding: '24px 16px', textAlign: 'center', border: '1px solid #f1f5f9', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', cursor: 'pointer', transition: 'all 0.2s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = '0 8px 24px rgba(0,0,0,0.1)'; (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-3px)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = '0 2px 8px rgba(0,0,0,0.04)'; (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)' }}>
                <div style={{ width: '56px', height: '56px', borderRadius: '16px', backgroundColor: 'rgba(45,212,191,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px', fontSize: '14px', fontWeight: 900, color: '#2dd4bf' }}>{co.initials}</div>
                <p style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a', marginBottom: '4px', lineHeight: 1.3 }}>{co.name}</p>
                <p style={{ fontSize: '11px', color: '#64748b' }}>{co.sector}</p>
              </div>
            ))}
          </div>
        </section>

        {/* RECRUITER BANNER */}
        <section style={{ marginBottom: '56px' }}>
          <div style={{ backgroundColor: 'white', border: '1px solid rgba(45,212,191,0.2)', borderRadius: '40px', padding: '48px', textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
            <h2 style={{ fontSize: '28px', fontWeight: 800, color: '#0f172a', marginBottom: '12px', letterSpacing: '-0.02em' }}>{t.jobs.recruiterBannerTitle}</h2>
            <p style={{ fontSize: '16px', color: '#64748b', marginBottom: '24px', lineHeight: 1.6, maxWidth: '560px', margin: '0 auto 24px' }}>{t.jobs.recruiterBannerSub}</p>
            <button style={{ backgroundColor: '#2dd4bf', color: 'white', border: 'none', padding: '14px 36px', borderRadius: '100px', fontWeight: 700, fontSize: '16px', cursor: 'pointer', boxShadow: '0 4px 16px rgba(45,212,191,0.3)' }}>{t.jobs.postJobFree}</button>
          </div>
        </section>

        {/* 80% CV BANNER */}
        <section style={{ marginBottom: '64px' }}>
          <div style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', borderRadius: '40px', padding: '48px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '32px', flexWrap: 'wrap' }}>
            <div style={{ maxWidth: '520px' }}>
              <h2 style={{ fontSize: '28px', fontWeight: 800, color: 'white', marginBottom: '16px', letterSpacing: '-0.01em' }}>{t.jobs.cvBannerTitle}</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '28px' }}>
                {[t.jobs.cvBenefit1, t.jobs.cvBenefit2, t.jobs.cvBenefit3].map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: '#2dd4bf', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <span style={{ color: 'white', fontSize: '11px', fontWeight: 800 }}>✓</span>
                    </div>
                    <span style={{ color: 'rgba(255,255,255,0.85)', fontSize: '15px' }}>{item}</span>
                  </div>
                ))}
              </div>
              <button style={{ backgroundColor: '#2dd4bf', color: '#00201c', border: 'none', padding: '14px 32px', borderRadius: '100px', fontWeight: 800, fontSize: '14px', cursor: 'pointer' }}>{t.jobs.uploadCV}</button>
            </div>
            <div style={{ width: '180px', height: '180px', borderRadius: '50%', background: 'rgba(45,212,191,0.1)', border: '2px solid rgba(45,212,191,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <GraduationCap size={64} color="#2dd4bf" />
            </div>
          </div>
        </section>

      </div>
    </div>
  )
}
