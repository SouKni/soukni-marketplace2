'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { Search, MapPin, Heart, MessageCircle, ChevronRight, Star } from 'lucide-react'
import Breadcrumb from '@/components/ui/Breadcrumb'
import CategoryFooterNav from '@/components/ui/CategoryFooterNav'

const HERO = 'https://images.pexels.com/photos/4483610/pexels-photo-4483610.jpeg?auto=compress&w=1600'

const topChoices = [
  {
    id: 'lg1',
    title: 'Head of Supply Chain & Logistics — FMCG Group',
    desc: 'Leading FMCG group in Casablanca seeks an experienced Supply Chain Director to oversee end-to-end logistics for 12 distribution centers across Morocco and West Africa.',
    price: 42000,
    location: 'Casablanca, Ain Sebaa',
    rating: 4.9,
    reviews: 52,
    image: 'https://images.pexels.com/photos/4483610/pexels-photo-4483610.jpeg?auto=compress&w=800',
  },
  {
    id: 'lg2',
    title: 'Fleet Manager — International Freight Company',
    desc: 'Major freight company hiring a Fleet Manager to oversee 80+ vehicles across Morocco. Responsible for route optimization, driver management, and compliance with transport regulations.',
    price: 28000,
    location: 'Tangier, Zone Franche',
    rating: 4.8,
    reviews: 38,
    image: 'https://images.pexels.com/photos/1427541/pexels-photo-1427541.jpeg?auto=compress&w=800',
  },
  {
    id: 'lg3',
    title: 'Warehouse Operations Manager — E-commerce',
    desc: 'Fast-growing e-commerce platform seeks a Warehouse Operations Manager to lead a team of 60+ in our Casablanca fulfillment center. Experience with WMS systems required.',
    price: 22000,
    location: 'Casablanca, Nouasseur',
    rating: 4.9,
    reviews: 29,
    image: 'https://images.pexels.com/photos/3846022/pexels-photo-3846022.jpeg?auto=compress&w=800',
  },
]

const bentoListings = [
  { id:'bl1', title:'Import/Export Coordinator',          price:12000, location:'Casablanca', image:'https://images.pexels.com/photos/4483610/pexels-photo-4483610.jpeg?auto=compress&w=600' },
  { id:'bl2', title:'Last-Mile Delivery Supervisor',      price:9000,  location:'Rabat',      image:'https://images.pexels.com/photos/1427541/pexels-photo-1427541.jpeg?auto=compress&w=600' },
  { id:'bl3', title:'Customs & Compliance Officer',       price:14000, location:'Tangier',    image:'https://images.pexels.com/photos/3846022/pexels-photo-3846022.jpeg?auto=compress&w=600' },
  { id:'bl4', title:'Inventory Control Specialist',       price:10000, location:'Casablanca', image:'https://images.pexels.com/photos/4483610/pexels-photo-4483610.jpeg?auto=compress&w=600' },
  { id:'bl5', title:'Cold Chain Logistics Manager',       price:18000, location:'Agadir',     image:'https://images.pexels.com/photos/1427541/pexels-photo-1427541.jpeg?auto=compress&w=600' },
]

const discoveryGrid = [
  { id:'dl1',  title:'Transport & Distribution Coordinator', price:8500,  location:'Casablanca', image:'https://images.pexels.com/photos/4483610/pexels-photo-4483610.jpeg?auto=compress&w=600' },
  { id:'dl2',  title:'Freight Forwarder Agent',              price:9000,  location:'Tangier',    image:'https://images.pexels.com/photos/1427541/pexels-photo-1427541.jpeg?auto=compress&w=600' },
  { id:'dl3',  title:'Procurement & Sourcing Manager',       price:16000, location:'Casablanca', image:'https://images.pexels.com/photos/3846022/pexels-photo-3846022.jpeg?auto=compress&w=600' },
  { id:'dl4',  title:'Logistics Data Analyst',               price:12000, location:'Rabat',      image:'https://images.pexels.com/photos/4483610/pexels-photo-4483610.jpeg?auto=compress&w=600' },
  { id:'dl5',  title:'Port Operations Supervisor',           price:15000, location:'Tangier',    image:'https://images.pexels.com/photos/1427541/pexels-photo-1427541.jpeg?auto=compress&w=600' },
  { id:'dl6',  title:'E-commerce Fulfillment Specialist',    price:8000,  location:'Casablanca', image:'https://images.pexels.com/photos/3846022/pexels-photo-3846022.jpeg?auto=compress&w=600' },
  { id:'dl7',  title:'International Shipping Coordinator',   price:11000, location:'Casablanca', image:'https://images.pexels.com/photos/4483610/pexels-photo-4483610.jpeg?auto=compress&w=600' },
  { id:'dl8',  title:'Route Planning & Optimization Lead',   price:13000, location:'Marrakech',  image:'https://images.pexels.com/photos/1427541/pexels-photo-1427541.jpeg?auto=compress&w=600' },
]

const pills = ['All Logistics','Supply Chain','Warehouse','Fleet Management','Import/Export','Last-Mile Delivery','Cold Chain','View More']
const pillSlugs: Record<string,string> = {
  'Supply Chain':'supply-chain',
  'Warehouse':'warehouse',
  'Fleet Management':'fleet-management',
  'Import/Export':'import-export',
  'Last-Mile Delivery':'last-mile-delivery',
  'Cold Chain':'cold-chain',
}

function CertifiedBadge() {
  return (
    <span style={{ display:'inline-flex', alignItems:'center', gap:'4px', background:'linear-gradient(135deg,#22d4a8,#0f9b8e)', color:'white', fontSize:'8px', fontWeight:900, padding:'3px 10px', borderRadius:'100px', textTransform:'uppercase' as const, letterSpacing:'0.08em' }}>
      ✦ SOUKNI CERTIFIED
    </span>
  )
}

function Stars({ rating }: { rating: number }) {
  return (
    <div style={{ display:'flex', gap:'1px' }}>
      {[1,2,3,4,5].map(i=><Star key={i} size={11} fill={i<=Math.floor(rating)?'#f59e0b':'none'} color="#f59e0b" />)}
    </div>
  )
}

function TopChoiceCard({ item, locale }: { item: typeof topChoices[0], locale: string }) {
  const [saved, setSaved] = useState(false)
  const [hovered, setHovered] = useState(false)
  return (
    <Link href={`/${locale}/listing/${item.id}`} style={{ textDecoration:'none' }}>
      <div onMouseEnter={()=>setHovered(true)} onMouseLeave={()=>setHovered(false)}
        style={{ display:'flex', backgroundColor:'white', borderRadius:'40px', overflow:'hidden', border:'1px solid #f1f5f9', boxShadow:hovered?'0 20px 48px rgba(0,0,0,0.12)':'0 2px 12px rgba(0,0,0,0.05)', transition:'all 0.3s', marginBottom:'16px' }}>
        <div style={{ position:'relative', width:'320px', flexShrink:0, overflow:'hidden' }}>
          <img src={item.image} alt={item.title} style={{ width:'100%', height:'100%', objectFit:'cover', transition:'transform 0.6s', transform:hovered?'scale(1.06)':'scale(1)' }} />
          <div style={{ position:'absolute', top:'16px', left:'16px' }}><CertifiedBadge /></div>
          <button onClick={e=>{e.preventDefault();setSaved(!saved)}} style={{ position:'absolute', top:'16px', right:'16px', width:'32px', height:'32px', borderRadius:'50%', backgroundColor:'rgba(255,255,255,0.2)', backdropFilter:'blur(12px)', border:'1px solid rgba(255,255,255,0.3)', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer' }}>
            <Heart size={14} color={saved?'#ef4444':'white'} fill={saved?'#ef4444':'none'} />
          </button>
        </div>
        <div style={{ flex:1, padding:'28px 32px', display:'flex', flexDirection:'column' as const, justifyContent:'space-between' }}>
          <div>
            <div style={{ display:'flex', alignItems:'center', gap:'8px', marginBottom:'10px' }}>
              <Stars rating={item.rating} />
              <span style={{ fontFamily:'Hanken Grotesk, Inter, sans-serif', fontWeight:900, letterSpacing:'-0.03em', fontSize:'13px', color:'#161d1b' }}>{item.rating}</span>
              <span style={{ fontSize:'12px', color:'#6b7a76' }}>({item.reviews} applicants)</span>
            </div>
            <h3 style={{ fontFamily:'Inter, sans-serif', fontWeight:900, letterSpacing:'-0.05em', fontSize:'20px', color:'#161d1b', marginBottom:'10px', lineHeight:1.2 }}>{item.title}</h3>
            <p style={{ fontSize:'13px', color:'#6b7a76', lineHeight:1.7, marginBottom:'16px' }}>{item.desc}</p>
            <div style={{ display:'flex', alignItems:'center', gap:'4px', fontSize:'12px', color:'#6b7a76' }}>
              <MapPin size={12} /> {item.location}
            </div>
          </div>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginTop:'20px' }}>
            <div>
              <span style={{ fontFamily:'Hanken Grotesk, Inter, sans-serif', fontWeight:900, letterSpacing:'-0.03em', fontSize:'24px', color:'#22d4a8' }}>{item.price.toLocaleString()} MAD</span>
              <span style={{ fontSize:'12px', color:'#6b7a76' }}> / month</span>
            </div>
            <div style={{ display:'flex', gap:'8px' }}>
              <button onClick={e=>e.preventDefault()} style={{ padding:'10px 20px', borderRadius:'100px', border:'1px solid #22d4a8', backgroundColor:'transparent', color:'#22d4a8', fontWeight:700, fontSize:'12px', cursor:'pointer', display:'flex', alignItems:'center', gap:'5px' }}>
                <MessageCircle size={13} />Apply Now
              </button>
              <button onClick={e=>e.preventDefault()} style={{ padding:'10px 20px', borderRadius:'100px', border:'none', backgroundColor:'#25D366', color:'white', fontWeight:700, fontSize:'12px', cursor:'pointer' }}>WhatsApp</button>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

function DiscoveryCard({ item, locale }: { item: typeof discoveryGrid[0], locale: string }) {
  const [saved, setSaved] = useState(false)
  const [hovered, setHovered] = useState(false)
  return (
    <Link href={`/${locale}/listing/${item.id}`} style={{ textDecoration:'none' }}>
      <div onMouseEnter={()=>setHovered(true)} onMouseLeave={()=>setHovered(false)}
        style={{ display:'flex', backgroundColor:'white', borderRadius:'24px', overflow:'hidden', border:'1px solid #f1f5f9', boxShadow:hovered?'0 16px 32px rgba(0,0,0,0.1)':'0 2px 8px rgba(0,0,0,0.04)', transition:'all 0.25s' }}>
        <div style={{ position:'relative', width:'160px', flexShrink:0, overflow:'hidden' }}>
          <img src={item.image} alt={item.title} style={{ width:'100%', height:'100%', objectFit:'cover', transition:'transform 0.5s', transform:hovered?'scale(1.06)':'scale(1)' }} />
          <div style={{ position:'absolute', top:'8px', left:'8px' }}><CertifiedBadge /></div>
        </div>
        <div style={{ flex:1, padding:'16px 20px', display:'flex', flexDirection:'column' as const, justifyContent:'space-between' }}>
          <div>
            <p style={{ fontSize:'11px', color:'#6b7a76', marginBottom:'4px', display:'flex', alignItems:'center', gap:'3px' }}><MapPin size={10} />{item.location}</p>
            <h4 style={{ fontFamily:'Inter, sans-serif', fontWeight:900, letterSpacing:'-0.05em', fontSize:'14px', color:'#161d1b', marginBottom:'8px', lineHeight:1.3 }}>{item.title}</h4>
            <p style={{ fontFamily:'Hanken Grotesk, Inter, sans-serif', fontWeight:900, letterSpacing:'-0.03em', fontSize:'18px', color:'#22d4a8' }}>{item.price.toLocaleString()} MAD</p>
          </div>
          <div style={{ display:'flex', gap:'6px', marginTop:'12px' }}>
            <button onClick={e=>{e.preventDefault();setSaved(!saved)}} style={{ flex:1, backgroundColor:'#eef5f2', color:'#3c4a46', border:'none', padding:'8px', borderRadius:'100px', fontWeight:700, fontSize:'11px', cursor:'pointer' }}>Apply</button>
            <button onClick={e=>e.preventDefault()} style={{ flex:1, backgroundColor:'#25D366', color:'white', border:'none', padding:'8px', borderRadius:'100px', fontWeight:700, fontSize:'11px', cursor:'pointer' }}>WhatsApp</button>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default function LogisticsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = React.use(params)
  const [city, setCity] = useState('')
  const [keyword, setKeyword] = useState('')
  const [applied, setApplied] = useState({ keyword: '', city: '', price: 'Any Range' })
  const [salary, setSalary] = useState('Any Range')
  const salaryPrices = discoveryGrid.map(it => it.price)
  const minSalary = Math.min(...salaryPrices)
  const maxSalary = Math.max(...salaryPrices)
  const midSalary = Math.round((minSalary + maxSalary) / 2)
  const salaryRanges = ['Any Range', `${minSalary.toLocaleString()} – ${midSalary.toLocaleString()} MAD`, `${midSalary.toLocaleString()} – ${maxSalary.toLocaleString()} MAD`, `${maxSalary.toLocaleString()}+ MAD`]
  function priceInRange(itemPrice: number, rangeLabel: string) {
    if (!rangeLabel || rangeLabel.startsWith('Any')) return true
    const nums = rangeLabel.replace(/,/g, '').match(/\d+/g)?.map(Number) || []
    if (rangeLabel.includes('+')) return itemPrice >= nums[0]
    if (nums.length === 2) return itemPrice >= nums[0] && itemPrice <= nums[1]
    return true
  }
  function applySearch() { setApplied({ keyword, city, price: salary }); setActivePage(1) }
  const [activePill, setActivePill] = useState('All Logistics')
  const [activeSeller, setActiveSeller] = useState('All')
  const [diamond, setDiamond] = useState(true)
  const [activePage, setActivePage] = useState(1)
  const [viewMode, setViewMode] = useState<'grid'|'list'>('grid')

  const filteredDiscoveryGrid = discoveryGrid.filter(item =>
    (!applied.keyword.trim() || item.title.toLowerCase().includes(applied.keyword.toLowerCase())) &&
    (!applied.city.trim() || item.location.toLowerCase().includes(applied.city.toLowerCase())) &&
    priceInRange(item.price, applied.price)
  )
  const DISCOVERY_PAGE_SIZE = Math.max(1, Math.ceil(discoveryGrid.length / 4))
  const totalDiscoveryPages = Math.max(1, Math.ceil(filteredDiscoveryGrid.length / DISCOVERY_PAGE_SIZE))
  const paginatedDiscoveryGrid = filteredDiscoveryGrid.slice((activePage-1)*DISCOVERY_PAGE_SIZE, activePage*DISCOVERY_PAGE_SIZE)

  return (
    <div style={{ fontFamily:'Inter, sans-serif', backgroundColor:'#f4fbf8', minHeight:'100vh' }}>

      <section style={{ position:'relative', height:'440px', overflow:'hidden', display:'flex', alignItems:'center', justifyContent:'center' }}>
        <img src={HERO} alt="Logistics & Distribution" style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover' }} />
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top, rgba(15,23,42,0.88), rgba(15,23,42,0.4))' }} />
        <div style={{ position:'relative', zIndex:10, textAlign:'center', padding:'0 20px', maxWidth:'760px', width:'100%' }}>
          <h1 style={{ fontFamily:'Inter, sans-serif', fontWeight:900, letterSpacing:'-0.05em', fontSize:'clamp(32px,5vw,52px)', color:'white', marginBottom:'12px', lineHeight:1.05 }}>
            Find Top Logistics &amp; Distribution Jobs!
          </h1>
          <p style={{ fontSize:'15px', color:'rgba(255,255,255,0.82)', marginBottom:'32px' }}>580 verified logistics &amp; distribution positions across Morocco</p>
          <div style={{ display:'flex', alignItems:'stretch', backgroundColor:'rgba(255,255,255,0.12)', backdropFilter:'blur(24px)', border:'1px solid rgba(255,255,255,0.25)', borderRadius:'100px', overflow:'hidden', maxWidth:'680px', margin:'0 auto', boxShadow:'0 8px 32px rgba(0,0,0,0.2)' }}>
            <div style={{ display:'flex', flexDirection:'column' as const, padding:'14px 20px', flex:'0 0 180px', borderRight:'1px solid rgba(255,255,255,0.2)', gap:'2px' }}>
              <span style={{ fontSize:'9px', fontWeight:800, color:'rgba(255,255,255,0.6)', textTransform:'uppercase' as const, letterSpacing:'0.12em' }}>City</span>
              <input value={city} onChange={e=>setCity(e.target.value)} onKeyDown={e=>e.key==='Enter'&&applySearch()} placeholder="Casablanca"
                style={{ backgroundColor:'transparent', border:'none', outline:'none', fontSize:'14px', fontWeight:600, color:'white', fontFamily:'Inter, sans-serif', padding:0, width:'100%' }} />
            </div>
            <div style={{ display:'flex', flexDirection:'column' as const, padding:'14px 20px', flex:1, borderRight:'1px solid rgba(255,255,255,0.2)', gap:'2px' }}>
              <span style={{ fontSize:'9px', fontWeight:800, color:'rgba(255,255,255,0.6)', textTransform:'uppercase' as const, letterSpacing:'0.12em' }}>Keyword</span>
              <input value={keyword} onChange={e=>setKeyword(e.target.value)} onKeyDown={e=>e.key==='Enter'&&applySearch()} placeholder="Supply chain, warehouse, fleet..."
                style={{ backgroundColor:'transparent', border:'none', outline:'none', fontSize:'14px', fontWeight:600, color:'white', fontFamily:'Inter, sans-serif', padding:0, width:'100%' }} />
            </div>
            <button onClick={applySearch} style={{ backgroundColor:'#22d4a8', color:'white', border:'none', padding:'0 32px', fontWeight:800, fontSize:'14px', cursor:'pointer', display:'flex', alignItems:'center', gap:'8px', flexShrink:0, transition:'background 0.15s' }}
              onMouseEnter={e=>e.currentTarget.style.backgroundColor='#0f9b8e'}
              onMouseLeave={e=>e.currentTarget.style.backgroundColor='#22d4a8'}>
              <Search size={16} /> Search
            </button>
          </div>
        </div>
      </section>

      <div style={{ maxWidth:'1440px', margin:'-28px auto 0', padding:'0 40px', position:'relative', zIndex:30 }}>
        <div style={{ backgroundColor:'rgba(255,255,255,0.9)', backdropFilter:'blur(20px)', borderRadius:'100px', padding:'10px 10px 10px 24px', boxShadow:'0 8px 40px rgba(0,0,0,0.12)', border:'1px solid rgba(255,255,255,0.6)', display:'flex', alignItems:'center' }}>
          <div style={{ flex:1, padding:'6px 20px', borderRight:'1px solid rgba(186,202,197,0.3)', display:'flex', flexDirection:'column' as const, gap:'1px' }}>
            <span style={{ fontSize:'9px', textTransform:'uppercase' as const, fontWeight:700, color:'#6b7a76', letterSpacing:'0.1em' }}>City</span>
            <input value={city} onChange={e=>setCity(e.target.value)} onKeyDown={e=>e.key==='Enter'&&applySearch()} placeholder="Casablanca" style={{ fontSize:'13px', fontWeight:500, color:'#161d1b', border:'none', outline:'none', background:'none', padding:0, width:'100%' }} />
          </div>
          <div style={{ flex:2, padding:'6px 20px', borderRight:'1px solid rgba(186,202,197,0.3)', display:'flex', flexDirection:'column' as const, gap:'1px' }}>
            <span style={{ fontSize:'9px', textTransform:'uppercase' as const, fontWeight:700, color:'#6b7a76', letterSpacing:'0.1em' }}>Job Title</span>
            <input value={keyword} onChange={e=>setKeyword(e.target.value)} onKeyDown={e=>e.key==='Enter'&&applySearch()} placeholder="Supply Chain, Fleet, Warehouse..." style={{ fontSize:'13px', fontWeight:500, color:'#161d1b', border:'none', outline:'none', background:'none', padding:0, width:'100%' }} />
          </div>
          <div style={{ flex:1, padding:'6px 20px', borderRight:'1px solid rgba(186,202,197,0.3)', display:'flex', flexDirection:'column' as const, cursor:'pointer', gap:'1px' }}>
            <span style={{ fontSize:'9px', textTransform:'uppercase' as const, fontWeight:700, color:'#6b7a76', letterSpacing:'0.1em' }}>Experience</span>
            <span style={{ fontSize:'13px', fontWeight:500, color:'#161d1b' }}>All Levels</span>
          </div>
          <div style={{ flex:1, padding:'6px 20px', borderRight:'1px solid rgba(186,202,197,0.3)', display:'flex', flexDirection:'column' as const, gap:'1px' }}>
            <span style={{ fontSize:'9px', textTransform:'uppercase' as const, fontWeight:700, color:'#6b7a76', letterSpacing:'0.1em' }}>Salary (MAD)</span>
            <select value={salary} onChange={e=>setSalary(e.target.value)} style={{ fontSize:'13px', fontWeight:500, color:'#161d1b', border:'none', outline:'none', background:'none', padding:0, width:'100%', cursor:'pointer' }}>
              {salaryRanges.map(r=><option key={r} value={r}>{r}</option>)}
            </select>
          </div>
          <div style={{ flex:1, padding:'6px 20px', display:'flex', flexDirection:'column' as const, cursor:'pointer', gap:'1px' }}>
            <span style={{ fontSize:'9px', textTransform:'uppercase' as const, fontWeight:700, color:'#6b7a76', letterSpacing:'0.1em' }}>Filters</span>
            <span style={{ fontSize:'13px', fontWeight:500, color:'#161d1b' }}>All Filters</span>
          </div>
          <button onClick={applySearch} style={{ backgroundColor:'#22d4a8', color:'white', border:'none', padding:'14px 28px', borderRadius:'100px', cursor:'pointer', display:'flex', alignItems:'center', gap:'8px', fontWeight:700, fontSize:'13px', flexShrink:0, marginLeft:'8px' }}>
            <Search size={16} /> SEARCH
          </button>
        </div>
      </div>

      <div style={{ maxWidth:'1440px', margin:'32px auto 0', padding:'0 40px' }}>

        <Breadcrumb
          items={[
            { label:'Home', href:`/${locale}` },
            { label:'Jobs', href:`/${locale}/jobs` },
            { label:'Logistics & Distribution' },
          ]}
          mutedColor="#6b7a76"
          inkColor="#161d1b"
        />

        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'4px' }}>
          <h2 style={{ fontFamily:'Inter, sans-serif', fontWeight:900, letterSpacing:'-0.05em', fontSize:'22px', color:'#161d1b' }}>Logistics &amp; Distribution Jobs in Morocco</h2>
          <div style={{ display:'flex', gap:'8px' }}>
            <button style={{ display:'flex', alignItems:'center', gap:'6px', padding:'8px 14px', borderRadius:'12px', border:'1px solid rgba(186,202,197,0.4)', backgroundColor:'#eef5f2', fontSize:'12px', fontWeight:700, cursor:'pointer', color:'#161d1b' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="3" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="13" y1="18" x2="21" y2="18"/></svg>
              Sort: Default
            </button>
            <button style={{ display:'flex', alignItems:'center', gap:'6px', padding:'8px 14px', borderRadius:'12px', border:'1px solid rgba(186,202,197,0.4)', backgroundColor:'#eef5f2', fontSize:'12px', fontWeight:700, cursor:'pointer', color:'#161d1b' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
              Save Search
            </button>
          </div>
        </div>
        <p style={{ fontSize:'14px', color:'#6b7a76', marginBottom:'16px' }}>580 Logistics &amp; Distribution positions across Morocco</p>

        <div style={{ display:'flex', gap:'8px', marginBottom:'16px', overflowX:'auto', paddingBottom:'4px' }}>
          {pills.map(pill=>(
            pillSlugs[pill] ? (
              <Link key={pill} href={`/${locale}/jobs/logistics/${pillSlugs[pill]}`}
                style={{ padding:'8px 20px', borderRadius:'100px', fontSize:'12px', fontWeight:700, cursor:'pointer', whiteSpace:'nowrap' as const, transition:'all 0.15s', textDecoration:'none', display:'inline-block', backgroundColor:'#e8efec', color:'#3c4a46' }}>
                {pill}
              </Link>
            ) : (
              <button key={pill} onClick={()=>setActivePill(pill)}
                style={{ padding:'8px 20px', borderRadius:'100px', fontSize:'12px', fontWeight:700, cursor:'pointer', border:'none', whiteSpace:'nowrap' as const, transition:'all 0.15s', backgroundColor:activePill===pill?'#161d1b':'#e8efec', color:activePill===pill?'white':'#3c4a46' }}>
                {pill}
              </button>
            )
          ))}
        </div>

        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'12px 0', borderTop:'1px solid rgba(186,202,197,0.25)', borderBottom:'1px solid rgba(186,202,197,0.25)', marginBottom:'16px', flexWrap:'wrap' as const, gap:'10px' }}>
          <div style={{ display:'flex', gap:'6px' }}>
            {['All','Full-Time','Part-Time','Freelance'].map(tab=>(
              <button key={tab} onClick={()=>setActiveSeller(tab)}
                style={{ padding:'7px 18px', borderRadius:'100px', fontSize:'12px', fontWeight:700, cursor:'pointer', border:'none', backgroundColor:activeSeller===tab?'#dde4e1':'transparent', color:activeSeller===tab?'#161d1b':'#6b7a76' }}>
                {tab}
              </button>
            ))}
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:'16px' }}>
            <div style={{ display:'flex', alignItems:'center', gap:'8px', cursor:'pointer' }} onClick={()=>setDiamond(!diamond)}>
              <span style={{ fontSize:'12px', fontWeight:700, color:'#6b7a76' }}>Show SouKni Diamond Verified First</span>
              <div style={{ width:'40px', height:'20px', borderRadius:'100px', backgroundColor:diamond?'#22d4a8':'#bacac5', position:'relative', transition:'background 0.25s' }}>
                <div style={{ position:'absolute', top:'2px', left:diamond?'22px':'2px', width:'16px', height:'16px', borderRadius:'50%', backgroundColor:'white', transition:'left 0.25s', boxShadow:'0 1px 3px rgba(0,0,0,0.15)' }} />
              </div>
            </div>
            <div style={{ display:'flex', gap:'6px' }}>
              <button onClick={()=>setViewMode('grid')} style={{ width:'34px', height:'34px', display:'flex', alignItems:'center', justifyContent:'center', borderRadius:'8px', border:'none', cursor:'pointer', backgroundColor:viewMode==='grid'?'#161d1b':'#e8efec', color:viewMode==='grid'?'white':'#161d1b' }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
              </button>
              <button onClick={()=>setViewMode('list')} style={{ width:'34px', height:'34px', display:'flex', alignItems:'center', justifyContent:'center', borderRadius:'8px', border:'none', cursor:'pointer', backgroundColor:viewMode==='list'?'#161d1b':'#e8efec', color:viewMode==='list'?'white':'#161d1b' }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
              </button>
            </div>
          </div>
        </div>

        <div style={{ display:'flex', gap:'8px', marginBottom:'32px', flexWrap:'wrap' as const }}>
          {[
            { emoji:'✨', label:'New Listings', active:true },
            { emoji:'💰', label:'Top Salaries', active:false },
            { emoji:'🏢', label:'Top Employers', active:false },
          ].map(chip=>(
            <button key={chip.label} style={{ display:'flex', alignItems:'center', gap:'6px', padding:'8px 16px', borderRadius:'100px', fontSize:'12px', fontWeight:700, cursor:'pointer', transition:'all 0.15s', border:chip.active?'none':'1px solid rgba(186,202,197,0.5)', backgroundColor:chip.active?'#161d1b':'white', color:chip.active?'white':'#3c4a46' }}>
              {chip.emoji} {chip.label}
            </button>
          ))}
        </div>

        <section style={{ marginBottom:'40px' }}>
          <h2 style={{ fontSize:'13px', fontWeight:900, color:'#161d1b', textTransform:'uppercase' as const, letterSpacing:'0.1em', marginBottom:'20px' }}>SOUKNI TOP CHOICES</h2>
          {topChoices.map(item=><TopChoiceCard key={item.id} item={item} locale={locale} />)}
        </section>

        <div style={{ borderRadius:'40px', overflow:'hidden', marginBottom:'40px', background:'linear-gradient(135deg,#161d1b,#1a2e28)', padding:'40px 48px', display:'grid', gridTemplateColumns:'1fr 1fr', gap:'40px', alignItems:'center' }}>
          <div>
            <p style={{ fontSize:'10px', fontWeight:700, color:'#22d4a8', textTransform:'uppercase' as const, letterSpacing:'0.15em', marginBottom:'8px' }}>SouKni Mobiles &amp; Electro Pro</p>
            <h3 style={{ fontFamily:'Inter, sans-serif', fontWeight:900, letterSpacing:'-0.05em', fontSize:'28px', color:'white', marginBottom:'12px', lineHeight:1.1 }}>Your Premium tech and elite electronics marketplace.</h3>
            <p style={{ fontSize:'13px', color:'rgba(255,255,255,0.65)', marginBottom:'24px', lineHeight:1.6 }}>Our certified SouKni network ensures you get the best tech deals across Morocco.</p>
            <div style={{ display:'flex', gap:'12px' }}>
              <Link href={`/${locale}/electronics`} style={{ textDecoration:'none' }}>
                <button style={{ backgroundColor:'#22d4a8', color:'white', border:'none', padding:'11px 24px', borderRadius:'100px', fontWeight:700, fontSize:'12px', cursor:'pointer' }}>Explore Tech</button>
              </Link>
              <button style={{ backgroundColor:'transparent', color:'white', border:'1px solid rgba(255,255,255,0.3)', padding:'11px 24px', borderRadius:'100px', fontWeight:700, fontSize:'12px', cursor:'pointer' }}>Contact Expert</button>
            </div>
          </div>
          <div style={{ position:'relative', height:'200px', borderRadius:'24px', overflow:'hidden' }}>
            <img src="https://images.pexels.com/photos/303383/pexels-photo-303383.jpeg?auto=compress&w=800" alt="Electronics" style={{ width:'100%', height:'100%', objectFit:'cover', opacity:0.7 }} />
          </div>
        </div>

        <section style={{ marginBottom:'40px' }}>
          <h2 style={{ fontFamily:'Inter, sans-serif', fontWeight:900, letterSpacing:'-0.05em', fontSize:'22px', color:'#22d4a8', marginBottom:'16px' }}>SouKni Logistics Collection</h2>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'16px', marginBottom:'16px' }}>
            {bentoListings.slice(0,3).map(item=>(
              <Link key={item.id} href={`/${locale}/listing/${item.id}`} style={{ textDecoration:'none' }}>
                <div style={{ position:'relative', height:'220px', borderRadius:'28px', overflow:'hidden', cursor:'pointer', transition:'transform 0.2s' }}
                  onMouseEnter={e=>(e.currentTarget as HTMLDivElement).style.transform='scale(1.02)'}
                  onMouseLeave={e=>(e.currentTarget as HTMLDivElement).style.transform='scale(1)'}>
                  <img src={item.image} alt={item.title} style={{ width:'100%', height:'100%', objectFit:'cover' }} />
                  <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top,rgba(0,0,0,0.85),rgba(0,0,0,0.05))' }} />
                  <div style={{ position:'absolute', top:'12px', left:'12px' }}><CertifiedBadge /></div>
                  <div style={{ position:'absolute', bottom:'16px', left:'16px', right:'16px' }}>
                    <h3 style={{ fontFamily:'Hanken Grotesk, Inter, sans-serif', fontWeight:900, letterSpacing:'-0.03em', fontSize:'15px', color:'white', marginBottom:'4px', lineHeight:1.3 }}>{item.title}</h3>
                    <p style={{ fontFamily:'Hanken Grotesk, Inter, sans-serif', fontWeight:900, letterSpacing:'-0.03em', fontSize:'17px', color:'#22d4a8' }}>{item.price.toLocaleString()} MAD/mo</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'16px' }}>
            {bentoListings.slice(3).map(item=>(
              <Link key={item.id} href={`/${locale}/listing/${item.id}`} style={{ textDecoration:'none' }}>
                <div style={{ position:'relative', height:'200px', borderRadius:'28px', overflow:'hidden', cursor:'pointer', transition:'transform 0.2s' }}
                  onMouseEnter={e=>(e.currentTarget as HTMLDivElement).style.transform='scale(1.02)'}
                  onMouseLeave={e=>(e.currentTarget as HTMLDivElement).style.transform='scale(1)'}>
                  <img src={item.image} alt={item.title} style={{ width:'100%', height:'100%', objectFit:'cover' }} />
                  <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top,rgba(0,0,0,0.85),rgba(0,0,0,0.05))' }} />
                  <div style={{ position:'absolute', top:'12px', left:'12px' }}><CertifiedBadge /></div>
                  <div style={{ position:'absolute', bottom:'16px', left:'16px', right:'16px' }}>
                    <h3 style={{ fontFamily:'Hanken Grotesk, Inter, sans-serif', fontWeight:900, letterSpacing:'-0.03em', fontSize:'16px', color:'white', marginBottom:'4px' }}>{item.title}</h3>
                    <p style={{ fontFamily:'Hanken Grotesk, Inter, sans-serif', fontWeight:900, letterSpacing:'-0.03em', fontSize:'18px', color:'#22d4a8' }}>{item.price.toLocaleString()} MAD/mo</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <div style={{ borderRadius:'40px', backgroundColor:'#f5ede0', padding:'40px 48px', display:'grid', gridTemplateColumns:'1fr 1fr', gap:'40px', alignItems:'center', marginBottom:'40px' }}>
          <div>
            <p style={{ fontSize:'10px', fontWeight:700, color:'#8a7a5c', textTransform:'uppercase' as const, letterSpacing:'0.15em', marginBottom:'8px' }}>SouKni Immo Pro</p>
            <h3 style={{ fontFamily:'Inter, sans-serif', fontWeight:900, letterSpacing:'-0.05em', fontSize:'28px', color:'#161d1b', marginBottom:'12px', lineHeight:1.1 }}>Elevate your lifestyle with Morocco's most exclusive real estate and rental spaces.</h3>
            <div style={{ display:'flex', gap:'12px', marginTop:'20px' }}>
              <Link href={`/${locale}/property`} style={{ textDecoration:'none' }}>
                <button style={{ backgroundColor:'#161d1b', color:'white', border:'none', padding:'11px 24px', borderRadius:'100px', fontWeight:700, fontSize:'12px', cursor:'pointer' }}>Explore Properties</button>
              </Link>
              <button style={{ backgroundColor:'transparent', color:'#161d1b', border:'1px solid #161d1b', padding:'11px 24px', borderRadius:'100px', fontWeight:700, fontSize:'12px', cursor:'pointer' }}>Contact Expert</button>
            </div>
          </div>
          <div style={{ position:'relative', height:'200px', borderRadius:'24px', overflow:'hidden' }}>
            <img src="https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&w=800" alt="Property" style={{ width:'100%', height:'100%', objectFit:'cover' }} />
          </div>
        </div>

        <section style={{ marginBottom:'40px' }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'20px' }}>
            <h2 style={{ fontFamily:'Inter, sans-serif', fontWeight:900, letterSpacing:'-0.05em', fontSize:'20px', color:'#161d1b' }}>More Logistics &amp; Distribution Positions</h2>
            <Link href="#" style={{ color:'#22d4a8', fontWeight:700, fontSize:'13px', textDecoration:'none', display:'flex', alignItems:'center', gap:'3px' }}>View all <ChevronRight size={14} /></Link>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'16px' }}>
            {paginatedDiscoveryGrid.map(item=><DiscoveryCard key={item.id} item={item} locale={locale} />)}
          </div>
        </section>

        <div style={{ display:'flex', justifyContent:'center', alignItems:'center', gap:'8px', marginBottom:'48px' }}>
          {Array.from({length: totalDiscoveryPages}, (_, i) => i+1).map(page=>(
            <button key={page} onClick={()=>setActivePage(page)}
              style={{ width:'36px', height:'36px', borderRadius:'10px', border:activePage===page?'none':'1px solid #e2e8f0', backgroundColor:activePage===page?'#22d4a8':'white', color:activePage===page?'white':'#161d1b', fontWeight:700, fontSize:'13px', cursor:'pointer' }}>
              {page}
            </button>
          ))}
          <button onClick={()=>setActivePage(p=>Math.min(totalDiscoveryPages,p+1))} disabled={activePage>=totalDiscoveryPages} style={{ padding:'0 16px', height:'36px', borderRadius:'10px', border:'1px solid #e2e8f0', backgroundColor:'white', color:'#161d1b', fontWeight:700, fontSize:'13px', display:'flex', alignItems:'center', gap:'4px', opacity: activePage>=totalDiscoveryPages?0.4:1, cursor: activePage>=totalDiscoveryPages?'not-allowed':'pointer' }}>
            Next <ChevronRight size={14} />
          </button>
        </div>

        <section style={{ borderRadius:'40px', background:'linear-gradient(135deg,#22d4a8,#0f9b8e)', padding:'56px 48px', display:'flex', alignItems:'center', justifyContent:'space-between', gap:'40px', flexWrap:'wrap' as const, marginBottom:'64px' }}>
          <div>
            <h2 style={{ fontFamily:'Inter, sans-serif', fontWeight:900, letterSpacing:'-0.05em', fontSize:'36px', color:'white', marginBottom:'10px', lineHeight:1.05 }}>JOIN THE SOUKNI FAMILY</h2>
            <p style={{ fontSize:'15px', color:'rgba(255,255,255,0.85)', maxWidth:'480px', lineHeight:1.7 }}>Post your logistics job today for free and reach thousands of qualified candidates across Morocco.</p>
            <div style={{ display:'flex', gap:'12px', marginTop:'24px' }}>
              <button style={{ backgroundColor:'white', color:'#0f9b8e', border:'none', padding:'12px 24px', borderRadius:'100px', fontWeight:800, fontSize:'13px', cursor:'pointer' }}>App Store</button>
              <button style={{ backgroundColor:'rgba(255,255,255,0.2)', color:'white', border:'1px solid rgba(255,255,255,0.4)', padding:'12px 24px', borderRadius:'100px', fontWeight:800, fontSize:'13px', cursor:'pointer' }}>Google Play</button>
            </div>
          </div>
          <Link href={`/${locale}/post-ad`} style={{ textDecoration:'none' }}>
            <span style={{ display:'inline-block', backgroundColor:'white', color:'#0f9b8e', padding:'16px 36px', borderRadius:'100px', fontWeight:900, fontSize:'14px', cursor:'pointer', whiteSpace:'nowrap' as const }}>Post Free Job →</span>
          </Link>
        </section>

        <CategoryFooterNav
          relatedTitle="Explore Other Logistics Jobs"
          related={Object.entries(pillSlugs).map(([label, slug]) => ({ label, href:`/${locale}/jobs/logistics/${slug}` }))}
          backHref={`/${locale}/jobs`}
          backLabel="Back to All Jobs"
          inkColor="#161d1b"
          mintDkColor="#0f9b8e"
        />

      </div>
    </div>
  )
}
