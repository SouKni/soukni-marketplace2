'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { Search, MapPin, Heart, MessageCircle, ChevronRight, Star } from 'lucide-react'
import Breadcrumb from '@/components/ui/Breadcrumb'
import CategoryFooterNav from '@/components/ui/CategoryFooterNav'

const HERO = 'https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&w=1600'

const subCategories = [
  { slug:'chef-kitchen',    label:'Chef & Kitchen',    count:'680', image:'https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&w=600' },
  { slug:'front-of-house',  label:'Front of House',   count:'540', image:'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&w=600' },
  { slug:'fb-management',   label:'F&B Management',   count:'320', image:'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&w=600' },
  { slug:'pastry-bakery',   label:'Pastry & Bakery',  count:'210', image:'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&w=600' },
  { slug:'bartending',      label:'Bartending',       count:'180', image:'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&w=600' },
  { slug:'catering-events', label:'Catering & Events', count:'370', image:'https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&w=600' },
]

const topChoices = [
  { id:'rs1', title:'Executive Chef — 5-Star Luxury Resort', desc:'Prestigious 5-star resort in Marrakech seeks an Executive Chef to lead a team of 40+ kitchen staff across 4 restaurants. Michelin-level culinary standards, menu development, and food cost management required.', price:42000, location:'Marrakech, Palmeraie', rating:4.9, reviews:58, image:'https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&w=800' },
  { id:'rs2', title:'F&B Director — International Hotel Group', desc:'Leading international hotel group hiring an F&B Director to oversee all food and beverage operations across 6 outlets. P&L responsibility, team leadership of 120+, and guest experience optimization.', price:55000, location:'Casablanca, Anfa', rating:4.9, reviews:44, image:'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&w=800' },
  { id:'rs3', title:'Restaurant General Manager — Fine Dining', desc:'Award-winning fine dining restaurant in Rabat seeks a General Manager with passion for hospitality excellence. Full operations management, wine program oversight, and VIP guest relations.', price:28000, location:'Rabat, Souissi', rating:4.8, reviews:37, image:'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&w=800' },
]

const bentoListings = [
  { id:'rb1', title:'Pastry Chef — Luxury Patisserie',     price:16000, location:'Casablanca', image:'https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&w=600' },
  { id:'rb2', title:'Head Waiter & Floor Supervisor',      price:9000,  location:'Marrakech',  image:'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&w=600' },
  { id:'rb3', title:'Sous Chef — Modern Moroccan Cuisine', price:14000, location:'Rabat',      image:'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&w=600' },
  { id:'rb4', title:'Restaurant Operations Manager',       price:18000, location:'Tangier',    image:'https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&w=600' },
  { id:'rb5', title:'Barista & Coffee Specialist',         price:7500,  location:'Casablanca', image:'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&w=600' },
]

const discoveryGrid = [
  { id:'rd1', title:'Hotel Breakfast Chef',                price:8000,  location:'Marrakech',  image:'https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&w=600' },
  { id:'rd2', title:'Sommelier & Wine Director',           price:15000, location:'Casablanca', image:'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&w=600' },
  { id:'rd3', title:'Catering & Events Coordinator',       price:11000, location:'Rabat',      image:'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&w=600' },
  { id:'rd4', title:'Fast Food Shift Manager',             price:6500,  location:'Casablanca', image:'https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&w=600' },
  { id:'rd5', title:'Kitchen Porter & Commis Chef',        price:5500,  location:'Tangier',    image:'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&w=600' },
  { id:'rd6', title:'Cocktail Bartender & Mixologist',     price:9000,  location:'Marrakech',  image:'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&w=600' },
  { id:'rd7', title:'Food & Beverage Cost Controller',     price:12000, location:'Casablanca', image:'https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&w=600' },
  { id:'rd8', title:'Private Chef — Luxury Riad',          price:18000, location:'Marrakech',  image:'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&w=600' },
]
function priceInRange(itemPrice: number, rangeLabel: string) {
  if (!rangeLabel || rangeLabel.startsWith('Any')) return true
  const nums = rangeLabel.replace(/,/g, '').match(/\d+/g)?.map(Number) || []
  if (rangeLabel.includes('+')) return itemPrice >= nums[0]
  if (nums.length === 2) return itemPrice >= nums[0] && itemPrice <= nums[1]
  return true
}
const discoveryGridPrices = discoveryGrid.map(i => i.price)
const dgMinPrice = Math.min(...discoveryGridPrices)
const dgMaxPrice = Math.max(...discoveryGridPrices)
const dgMidPrice = Math.round((dgMinPrice + dgMaxPrice) / 2)
const salaryRanges = ['Any Range', `${dgMinPrice.toLocaleString()} – ${dgMidPrice.toLocaleString()} MAD`, `${dgMidPrice.toLocaleString()} – ${dgMaxPrice.toLocaleString()} MAD`, `${dgMaxPrice.toLocaleString()}+ MAD`]

const pills = ['All Restaurant','Executive Chef','F&B Management','Front of House','Pastry & Bakery','Bartending','Catering','View More']
const jobTabs = ['All','Full-Time','Part-Time','Seasonal']

function CertifiedBadge() {
  return <span style={{ display:'inline-flex', alignItems:'center', gap:'4px', background:'linear-gradient(135deg,#22d4a8,#0f9b8e)', color:'white', fontSize:'8px', fontWeight:900, padding:'3px 10px', borderRadius:'100px', textTransform:'uppercase' as const, letterSpacing:'0.08em' }}>✦ SOUKNI CERTIFIED</span>
}
function Stars({ rating }: { rating: number }) {
  return <div style={{ display:'flex', gap:'1px' }}>{[1,2,3,4,5].map(i=><Star key={i} size={11} fill={i<=Math.floor(rating)?'#f59e0b':'none'} color="#f59e0b" />)}</div>
}
function TopChoiceCard({ item, locale }: { item: typeof topChoices[0], locale: string }) {
  const [saved, setSaved] = useState(false)
  const [hov, setHov] = useState(false)
  return (
    <Link href={`/${locale}/listing/${item.id}`} style={{ textDecoration:'none' }}>
      <div onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
        style={{ display:'flex', backgroundColor:'white', borderRadius:'40px', overflow:'hidden', border:'1px solid #f1f5f9', boxShadow:hov?'0 20px 48px rgba(0,0,0,0.12)':'0 2px 12px rgba(0,0,0,0.05)', transition:'all 0.3s', marginBottom:'16px' }}>
        <div style={{ position:'relative', width:'320px', flexShrink:0, overflow:'hidden' }}>
          <img src={item.image} alt={item.title} style={{ width:'100%', height:'100%', objectFit:'cover', transition:'transform 0.6s', transform:hov?'scale(1.06)':'scale(1)' }} />
          <div style={{ position:'absolute', top:'16px', left:'16px' }}><CertifiedBadge /></div>
          <button onClick={e=>{e.preventDefault();setSaved(!saved)}} style={{ position:'absolute', top:'16px', right:'16px', width:'32px', height:'32px', borderRadius:'50%', backgroundColor:'rgba(255,255,255,0.2)', border:'1px solid rgba(255,255,255,0.3)', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer' }}>
            <Heart size={14} color={saved?'#ef4444':'white'} fill={saved?'#ef4444':'none'} />
          </button>
        </div>
        <div style={{ flex:1, padding:'28px 32px', display:'flex', flexDirection:'column' as const, justifyContent:'space-between' }}>
          <div>
            <div style={{ display:'flex', alignItems:'center', gap:'8px', marginBottom:'10px' }}><Stars rating={item.rating} /><span style={{ fontWeight:900, fontSize:'13px', color:'#161d1b' }}>{item.rating}</span><span style={{ fontSize:'12px', color:'#6b7a76' }}>({item.reviews} applicants)</span></div>
            <h3 style={{ fontWeight:900, letterSpacing:'-0.05em', fontSize:'20px', color:'#161d1b', marginBottom:'10px', lineHeight:1.2 }}>{item.title}</h3>
            <p style={{ fontSize:'13px', color:'#6b7a76', lineHeight:1.7, marginBottom:'16px' }}>{item.desc}</p>
            <p style={{ fontSize:'12px', color:'#6b7a76', display:'flex', alignItems:'center', gap:'4px' }}><MapPin size={12} />{item.location}</p>
          </div>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginTop:'20px' }}>
            <div><span style={{ fontWeight:900, fontSize:'24px', color:'#22d4a8' }}>{item.price.toLocaleString()} MAD</span><span style={{ fontSize:'12px', color:'#6b7a76' }}> / month</span></div>
            <div style={{ display:'flex', gap:'8px' }}>
              <button onClick={e=>e.preventDefault()} style={{ padding:'10px 20px', borderRadius:'100px', border:'1px solid #22d4a8', backgroundColor:'transparent', color:'#22d4a8', fontWeight:700, fontSize:'12px', cursor:'pointer', display:'flex', alignItems:'center', gap:'5px' }}><MessageCircle size={13} />Apply Now</button>
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
  const [hov, setHov] = useState(false)
  return (
    <Link href={`/${locale}/listing/${item.id}`} style={{ textDecoration:'none' }}>
      <div onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
        style={{ display:'flex', backgroundColor:'white', borderRadius:'24px', overflow:'hidden', border:'1px solid #f1f5f9', boxShadow:hov?'0 16px 32px rgba(0,0,0,0.1)':'0 2px 8px rgba(0,0,0,0.04)', transition:'all 0.25s' }}>
        <div style={{ position:'relative', width:'160px', flexShrink:0, overflow:'hidden' }}>
          <img src={item.image} alt={item.title} style={{ width:'100%', height:'100%', objectFit:'cover', transition:'transform 0.5s', transform:hov?'scale(1.06)':'scale(1)' }} />
          <div style={{ position:'absolute', top:'8px', left:'8px' }}><CertifiedBadge /></div>
        </div>
        <div style={{ flex:1, padding:'16px 20px', display:'flex', flexDirection:'column' as const, justifyContent:'space-between' }}>
          <p style={{ fontSize:'11px', color:'#6b7a76', marginBottom:'4px', display:'flex', alignItems:'center', gap:'3px' }}><MapPin size={10} />{item.location}</p>
          <h4 style={{ fontWeight:900, letterSpacing:'-0.05em', fontSize:'14px', color:'#161d1b', marginBottom:'8px', lineHeight:1.3 }}>{item.title}</h4>
          <p style={{ fontWeight:900, fontSize:'18px', color:'#22d4a8', marginBottom:'12px' }}>{item.price.toLocaleString()} MAD</p>
          <div style={{ display:'flex', gap:'6px' }}>
            <button onClick={e=>{e.preventDefault();setSaved(!saved)}} style={{ flex:1, backgroundColor:'#eef5f2', color:'#3c4a46', border:'none', padding:'8px', borderRadius:'100px', fontWeight:700, fontSize:'11px', cursor:'pointer' }}>Apply</button>
            <button onClick={e=>e.preventDefault()} style={{ flex:1, backgroundColor:'#25D366', color:'white', border:'none', padding:'8px', borderRadius:'100px', fontWeight:700, fontSize:'11px', cursor:'pointer' }}>WhatsApp</button>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default function RestaurantPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = React.use(params)
  const [city, setCity] = useState('')
  const [keyword, setKeyword] = useState('')
  const [applied, setApplied] = useState({ keyword: '', city: '', price: 'Any Range' })
  const [salary, setSalary] = useState('Any Range')
  const [activePill, setActivePill] = useState('All Restaurant')
  const [tab, setTab] = useState('All')
  const [diamond, setDiamond] = useState(true)
  const [page, setPage] = useState(1)
  const [grid, setGrid] = useState(true)

  const applySearch = () => { setApplied({ keyword, city, price: salary }); setPage(1) }

  const filteredDiscoveryGrid = discoveryGrid.filter(item =>
    (applied.keyword.trim() === '' ||
    item.title.toLowerCase().includes(applied.keyword.toLowerCase()) ||
    item.location.toLowerCase().includes(applied.keyword.toLowerCase())) &&
    (!applied.city || item.location.toLowerCase().includes(applied.city.toLowerCase())) &&
    priceInRange(item.price, applied.price)
  )
  const PAGE_SIZE = Math.max(1, Math.ceil(discoveryGrid.length / 4))
  const totalPages = Math.max(1, Math.ceil(filteredDiscoveryGrid.length / PAGE_SIZE))
  const paginatedDiscoveryGrid = filteredDiscoveryGrid.slice((page-1)*PAGE_SIZE, page*PAGE_SIZE)

  return (
    <div style={{ fontFamily:'Inter, sans-serif', backgroundColor:'#f4fbf8', minHeight:'100vh' }}>
      <section style={{ position:'relative', height:'440px', overflow:'hidden', display:'flex', alignItems:'center', justifyContent:'center' }}>
        <img src={HERO} alt="Restaurant Jobs" style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover' }} />
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top,rgba(15,23,42,0.88),rgba(15,23,42,0.4))' }} />
        <div style={{ position:'relative', zIndex:10, textAlign:'center', padding:'0 20px', maxWidth:'760px', width:'100%' }}>
          <h1 style={{ fontWeight:900, letterSpacing:'-0.05em', fontSize:'clamp(32px,5vw,52px)', color:'white', marginBottom:'12px', lineHeight:1.05 }}>Find Top Restaurant & Hospitality Jobs!</h1>
          <p style={{ fontSize:'15px', color:'rgba(255,255,255,0.82)', marginBottom:'32px' }}>2,300 verified restaurant & hospitality positions across Morocco</p>
          <div style={{ display:'flex', alignItems:'stretch', backgroundColor:'rgba(255,255,255,0.12)', backdropFilter:'blur(24px)', border:'1px solid rgba(255,255,255,0.25)', borderRadius:'100px', overflow:'hidden', maxWidth:'680px', margin:'0 auto' }}>
            <div style={{ display:'flex', flexDirection:'column' as const, padding:'14px 20px', flex:'0 0 180px', borderRight:'1px solid rgba(255,255,255,0.2)', gap:'2px' }}>
              <span style={{ fontSize:'9px', fontWeight:800, color:'rgba(255,255,255,0.6)', textTransform:'uppercase' as const, letterSpacing:'0.12em' }}>City</span>
              <input value={city} onChange={e=>setCity(e.target.value)} placeholder="Marrakech" style={{ backgroundColor:'transparent', border:'none', outline:'none', fontSize:'14px', fontWeight:600, color:'white', padding:0, width:'100%' }} />
            </div>
            <div style={{ display:'flex', flexDirection:'column' as const, padding:'14px 20px', flex:1, borderRight:'1px solid rgba(255,255,255,0.2)', gap:'2px' }}>
              <span style={{ fontSize:'9px', fontWeight:800, color:'rgba(255,255,255,0.6)', textTransform:'uppercase' as const, letterSpacing:'0.12em' }}>Keyword</span>
              <input value={keyword} onChange={e=>setKeyword(e.target.value)} onKeyDown={e=>e.key==='Enter'&&applySearch()} placeholder="Chef, manager, waiter, bartender..." style={{ backgroundColor:'transparent', border:'none', outline:'none', fontSize:'14px', fontWeight:600, color:'white', padding:0, width:'100%' }} />
            </div>
            <button onClick={applySearch} style={{ backgroundColor:'#22d4a8', color:'white', border:'none', padding:'0 32px', fontWeight:800, fontSize:'14px', cursor:'pointer', display:'flex', alignItems:'center', gap:'8px', flexShrink:0 }}><Search size={16} /> Search</button>
          </div>
        </div>
      </section>

      <div style={{ maxWidth:'1440px', margin:'-28px auto 0', padding:'0 40px', position:'relative', zIndex:30 }}>
        <div style={{ backgroundColor:'rgba(255,255,255,0.9)', backdropFilter:'blur(20px)', borderRadius:'100px', padding:'10px 10px 10px 24px', boxShadow:'0 8px 40px rgba(0,0,0,0.12)', border:'1px solid rgba(255,255,255,0.6)', display:'flex', alignItems:'center' }}>
          {[['City','Marrakech'],['Job Title','Chef, Manager, Waiter, Bartender...'],['Experience','All Levels'],['Salary','Any Range'],['Filters','All']].map(([l,v],i)=>(
            <div key={l} style={{ flex:i===1?2:1, padding:'6px 20px', borderRight:i<4?'1px solid rgba(186,202,197,0.3)':'none', display:'flex', flexDirection:'column' as const, cursor:i===2||i===4?'default':'pointer', gap:'1px' }}>
              <span style={{ fontSize:'9px', textTransform:'uppercase' as const, fontWeight:700, color:'#6b7a76', letterSpacing:'0.1em' }}>{l}</span>
              {i===0 ? (
                <input value={city} onChange={e=>setCity(e.target.value)} onKeyDown={e=>e.key==='Enter'&&applySearch()} placeholder={v} style={{ fontSize:'13px', fontWeight:500, color:'#161d1b', border:'none', outline:'none', background:'none', padding:0, width:'100%', fontFamily:'inherit' }} />
              ) : i===1 ? (
                <input value={keyword} onChange={e=>setKeyword(e.target.value)} onKeyDown={e=>e.key==='Enter'&&applySearch()} placeholder={v} style={{ fontSize:'13px', fontWeight:500, color:'#161d1b', border:'none', outline:'none', background:'none', padding:0, width:'100%', fontFamily:'inherit' }} />
              ) : i===3 ? (
                <select value={salary} onChange={e=>setSalary(e.target.value)} style={{ fontSize:'13px', fontWeight:500, color:'#161d1b', border:'none', outline:'none', background:'none', padding:0, width:'100%', cursor:'pointer', fontFamily:'inherit' }}>
                  {salaryRanges.map(r=><option key={r} value={r}>{r}</option>)}
                </select>
              ) : (
                <span style={{ fontSize:'13px', fontWeight:500, color:'#161d1b' }}>{v}</span>
              )}
            </div>
          ))}
          <button onClick={applySearch} style={{ backgroundColor:'#22d4a8', color:'white', border:'none', padding:'14px 28px', borderRadius:'100px', cursor:'pointer', display:'flex', alignItems:'center', gap:'8px', fontWeight:700, fontSize:'13px', flexShrink:0, marginLeft:'8px' }}><Search size={16} /> SEARCH</button>
        </div>
      </div>

      <div style={{ maxWidth:'1440px', margin:'32px auto 0', padding:'0 40px 64px' }}>
        <Breadcrumb
          items={[
            { label:'Home', href:`/${locale}` },
            { label:'Jobs', href:`/${locale}/jobs` },
            { label:'Restaurant & Hospitality' },
          ]}
          mutedColor="#6b7a76"
          inkColor="#161d1b"
        />

        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'4px' }}>
          <h2 style={{ fontWeight:900, letterSpacing:'-0.05em', fontSize:'22px', color:'#161d1b' }}>Restaurant & Hospitality Jobs in Morocco</h2>
          <div style={{ display:'flex', gap:'8px' }}>
            <button style={{ display:'flex', alignItems:'center', gap:'6px', padding:'8px 14px', borderRadius:'12px', border:'1px solid rgba(186,202,197,0.4)', backgroundColor:'#eef5f2', fontSize:'12px', fontWeight:700, cursor:'pointer', color:'#161d1b' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="3" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="13" y1="18" x2="21" y2="18"/></svg>Sort: Default
            </button>
            <button style={{ display:'flex', alignItems:'center', gap:'6px', padding:'8px 14px', borderRadius:'12px', border:'1px solid rgba(186,202,197,0.4)', backgroundColor:'#eef5f2', fontSize:'12px', fontWeight:700, cursor:'pointer', color:'#161d1b' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>Save Search
            </button>
          </div>
        </div>
        <p style={{ fontSize:'14px', color:'#6b7a76', marginBottom:'24px' }}>2,300 Restaurant & Hospitality positions across Morocco</p>

        {/* SUB-CATEGORY HUB */}
        <section style={{ marginBottom:'32px' }}>
          <h2 style={{ fontWeight:900, fontSize:'14px', color:'#161d1b', textTransform:'uppercase' as const, letterSpacing:'0.1em', marginBottom:'16px' }}>BROWSE BY SPECIALTY</h2>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(6,1fr)', gap:'12px' }}>
            {subCategories.map(sub=>(
              <Link key={sub.slug} href={`/${locale}/jobs/restaurant/${sub.slug}`} style={{ textDecoration:'none' }}>
                <div style={{ position:'relative', borderRadius:'20px', overflow:'hidden', cursor:'pointer', transition:'transform 0.2s', aspectRatio:'1/1' }}
                  onMouseEnter={e=>(e.currentTarget as HTMLDivElement).style.transform='scale(1.04)'}
                  onMouseLeave={e=>(e.currentTarget as HTMLDivElement).style.transform='scale(1)'}>
                  <img src={sub.image} alt={sub.label} style={{ width:'100%', height:'100%', objectFit:'cover' }} />
                  <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top,rgba(0,0,0,0.85),rgba(0,0,0,0.1))' }} />
                  <div style={{ position:'absolute', bottom:'10px', left:'10px', right:'10px' }}>
                    <p style={{ fontSize:'12px', fontWeight:800, color:'white', lineHeight:1.2, marginBottom:'2px' }}>{sub.label}</p>
                    <p style={{ fontSize:'9px', color:'#62fae3', fontWeight:700 }}>{sub.count} jobs</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <div style={{ display:'flex', gap:'8px', marginBottom:'16px', overflowX:'auto', paddingBottom:'4px' }}>
          {pills.map(p=><button key={p} onClick={()=>setActivePill(p)} style={{ padding:'8px 20px', borderRadius:'100px', fontSize:'12px', fontWeight:700, cursor:'pointer', border:'none', whiteSpace:'nowrap' as const, backgroundColor:activePill===p?'#161d1b':'#e8efec', color:activePill===p?'white':'#3c4a46' }}>{p}</button>)}
        </div>

        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'12px 0', borderTop:'1px solid rgba(186,202,197,0.25)', borderBottom:'1px solid rgba(186,202,197,0.25)', marginBottom:'16px', flexWrap:'wrap' as const, gap:'10px' }}>
          <div style={{ display:'flex', gap:'6px' }}>
            {jobTabs.map(t=><button key={t} onClick={()=>setTab(t)} style={{ padding:'7px 18px', borderRadius:'100px', fontSize:'12px', fontWeight:700, cursor:'pointer', border:'none', backgroundColor:tab===t?'#dde4e1':'transparent', color:tab===t?'#161d1b':'#6b7a76' }}>{t}</button>)}
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:'16px' }}>
            <div style={{ display:'flex', alignItems:'center', gap:'8px', cursor:'pointer' }} onClick={()=>setDiamond(!diamond)}>
              <span style={{ fontSize:'12px', fontWeight:700, color:'#6b7a76' }}>Show SouKni Diamond Verified First</span>
              <div style={{ width:'40px', height:'20px', borderRadius:'100px', backgroundColor:diamond?'#22d4a8':'#bacac5', position:'relative', transition:'background 0.25s' }}>
                <div style={{ position:'absolute', top:'2px', left:diamond?'22px':'2px', width:'16px', height:'16px', borderRadius:'50%', backgroundColor:'white', transition:'left 0.25s' }} />
              </div>
            </div>
            <div style={{ display:'flex', gap:'6px' }}>
              <button onClick={()=>setGrid(true)} style={{ width:'34px', height:'34px', display:'flex', alignItems:'center', justifyContent:'center', borderRadius:'8px', border:'none', cursor:'pointer', backgroundColor:grid?'#161d1b':'#e8efec', color:grid?'white':'#161d1b' }}><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg></button>
              <button onClick={()=>setGrid(false)} style={{ width:'34px', height:'34px', display:'flex', alignItems:'center', justifyContent:'center', borderRadius:'8px', border:'none', cursor:'pointer', backgroundColor:!grid?'#161d1b':'#e8efec', color:!grid?'white':'#161d1b' }}><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg></button>
            </div>
          </div>
        </div>

        <div style={{ display:'flex', gap:'8px', marginBottom:'32px', flexWrap:'wrap' as const }}>
          {[{emoji:'✨',label:'New Listings',active:true},{emoji:'💰',label:'Top Salaries',active:false},{emoji:'🏢',label:'Top Employers',active:false}].map(c=>(
            <button key={c.label} style={{ display:'flex', alignItems:'center', gap:'6px', padding:'8px 16px', borderRadius:'100px', fontSize:'12px', fontWeight:700, cursor:'pointer', border:c.active?'none':'1px solid rgba(186,202,197,0.5)', backgroundColor:c.active?'#161d1b':'white', color:c.active?'white':'#3c4a46' }}>{c.emoji} {c.label}</button>
          ))}
        </div>

        <section style={{ marginBottom:'40px' }}>
          <h2 style={{ fontSize:'13px', fontWeight:900, color:'#161d1b', textTransform:'uppercase' as const, letterSpacing:'0.1em', marginBottom:'20px' }}>SOUKNI TOP CHOICES</h2>
          {topChoices.map(item=><TopChoiceCard key={item.id} item={item} locale={locale} />)}
        </section>

        <div style={{ borderRadius:'40px', overflow:'hidden', marginBottom:'40px', background:'linear-gradient(135deg,#161d1b,#1a2e28)', padding:'40px 48px', display:'grid', gridTemplateColumns:'1fr 1fr', gap:'40px', alignItems:'center' }}>
          <div>
            <p style={{ fontSize:'10px', fontWeight:700, color:'#22d4a8', textTransform:'uppercase' as const, letterSpacing:'0.15em', marginBottom:'8px' }}>SouKni Mobiles & Electro Pro</p>
            <h3 style={{ fontWeight:900, letterSpacing:'-0.05em', fontSize:'28px', color:'white', marginBottom:'12px', lineHeight:1.1 }}>Your Premium tech and elite electronics marketplace.</h3>
            <div style={{ display:'flex', gap:'12px' }}>
              <Link href={`/${locale}/electronics`} style={{ textDecoration:'none' }}><button style={{ backgroundColor:'#22d4a8', color:'white', border:'none', padding:'11px 24px', borderRadius:'100px', fontWeight:700, fontSize:'12px', cursor:'pointer' }}>Explore Tech</button></Link>
              <button style={{ backgroundColor:'transparent', color:'white', border:'1px solid rgba(255,255,255,0.3)', padding:'11px 24px', borderRadius:'100px', fontWeight:700, fontSize:'12px', cursor:'pointer' }}>Contact Expert</button>
            </div>
          </div>
          <div style={{ position:'relative', height:'200px', borderRadius:'24px', overflow:'hidden' }}>
            <img src="https://images.pexels.com/photos/303383/pexels-photo-303383.jpeg?auto=compress&w=800" alt="Electronics" style={{ width:'100%', height:'100%', objectFit:'cover', opacity:0.7 }} />
          </div>
        </div>

        <section style={{ marginBottom:'40px' }}>
          <h2 style={{ fontWeight:900, letterSpacing:'-0.05em', fontSize:'22px', color:'#22d4a8', marginBottom:'16px' }}>SouKni Restaurant Collection</h2>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'16px', marginBottom:'16px' }}>
            {bentoListings.slice(0,3).map(item=>(
              <Link key={item.id} href={`/${locale}/listing/${item.id}`} style={{ textDecoration:'none' }}>
                <div style={{ position:'relative', height:'220px', borderRadius:'28px', overflow:'hidden', cursor:'pointer', transition:'transform 0.2s' }} onMouseEnter={e=>(e.currentTarget as HTMLDivElement).style.transform='scale(1.02)'} onMouseLeave={e=>(e.currentTarget as HTMLDivElement).style.transform='scale(1)'}>
                  <img src={item.image} alt={item.title} style={{ width:'100%', height:'100%', objectFit:'cover' }} />
                  <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top,rgba(0,0,0,0.85),rgba(0,0,0,0.05))' }} />
                  <div style={{ position:'absolute', top:'12px', left:'12px' }}><CertifiedBadge /></div>
                  <div style={{ position:'absolute', bottom:'16px', left:'16px', right:'16px' }}>
                    <h3 style={{ fontWeight:900, fontSize:'15px', color:'white', marginBottom:'4px', lineHeight:1.3 }}>{item.title}</h3>
                    <p style={{ fontWeight:900, fontSize:'17px', color:'#22d4a8' }}>{item.price.toLocaleString()} MAD/mo</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'16px' }}>
            {bentoListings.slice(3).map(item=>(
              <Link key={item.id} href={`/${locale}/listing/${item.id}`} style={{ textDecoration:'none' }}>
                <div style={{ position:'relative', height:'200px', borderRadius:'28px', overflow:'hidden', cursor:'pointer', transition:'transform 0.2s' }} onMouseEnter={e=>(e.currentTarget as HTMLDivElement).style.transform='scale(1.02)'} onMouseLeave={e=>(e.currentTarget as HTMLDivElement).style.transform='scale(1)'}>
                  <img src={item.image} alt={item.title} style={{ width:'100%', height:'100%', objectFit:'cover' }} />
                  <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top,rgba(0,0,0,0.85),rgba(0,0,0,0.05))' }} />
                  <div style={{ position:'absolute', top:'12px', left:'12px' }}><CertifiedBadge /></div>
                  <div style={{ position:'absolute', bottom:'16px', left:'16px', right:'16px' }}>
                    <h3 style={{ fontWeight:900, fontSize:'16px', color:'white', marginBottom:'4px' }}>{item.title}</h3>
                    <p style={{ fontWeight:900, fontSize:'18px', color:'#22d4a8' }}>{item.price.toLocaleString()} MAD/mo</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <div style={{ borderRadius:'40px', backgroundColor:'#f5ede0', padding:'40px 48px', display:'grid', gridTemplateColumns:'1fr 1fr', gap:'40px', alignItems:'center', marginBottom:'40px' }}>
          <div>
            <p style={{ fontSize:'10px', fontWeight:700, color:'#8a7a5c', textTransform:'uppercase' as const, letterSpacing:'0.15em', marginBottom:'8px' }}>SouKni Immo Pro</p>
            <h3 style={{ fontWeight:900, letterSpacing:'-0.05em', fontSize:'28px', color:'#161d1b', marginBottom:'12px', lineHeight:1.1 }}>Morocco's most exclusive real estate and rental spaces.</h3>
            <div style={{ display:'flex', gap:'12px', marginTop:'20px' }}>
              <Link href={`/${locale}/property`} style={{ textDecoration:'none' }}><button style={{ backgroundColor:'#161d1b', color:'white', border:'none', padding:'11px 24px', borderRadius:'100px', fontWeight:700, fontSize:'12px', cursor:'pointer' }}>Explore Properties</button></Link>
              <button style={{ backgroundColor:'transparent', color:'#161d1b', border:'1px solid #161d1b', padding:'11px 24px', borderRadius:'100px', fontWeight:700, fontSize:'12px', cursor:'pointer' }}>Contact Expert</button>
            </div>
          </div>
          <div style={{ position:'relative', height:'200px', borderRadius:'24px', overflow:'hidden' }}>
            <img src="https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&w=800" alt="Property" style={{ width:'100%', height:'100%', objectFit:'cover' }} />
          </div>
        </div>

        <section style={{ marginBottom:'40px' }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'20px' }}>
            <h2 style={{ fontWeight:900, letterSpacing:'-0.05em', fontSize:'20px', color:'#161d1b' }}>More Restaurant & Hospitality Positions</h2>
            <Link href="#" style={{ color:'#22d4a8', fontWeight:700, fontSize:'13px', textDecoration:'none', display:'flex', alignItems:'center', gap:'3px' }}>View all <ChevronRight size={14} /></Link>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'16px' }}>
            {paginatedDiscoveryGrid.map(item=><DiscoveryCard key={item.id} item={item} locale={locale} />)}
          </div>
        </section>

        <div style={{ display:'flex', justifyContent:'center', alignItems:'center', gap:'8px', marginBottom:'48px' }}>
          {Array.from({length:totalPages},(_,i)=>i+1).map(p=>(
            <button key={p} onClick={()=>setPage(p)} style={{ width:'36px', height:'36px', borderRadius:'10px', border:page===p?'none':'1px solid #e2e8f0', backgroundColor:page===p?'#22d4a8':'white', color:page===p?'white':'#161d1b', fontWeight:700, fontSize:'13px', cursor:'pointer' }}>{p}</button>
          ))}
          <button onClick={()=>setPage(p=>Math.min(totalPages,p+1))} disabled={page>=totalPages} style={{ padding:'0 16px', height:'36px', borderRadius:'10px', border:'1px solid #e2e8f0', backgroundColor:'white', color:'#161d1b', fontWeight:700, fontSize:'13px', cursor:page>=totalPages?'not-allowed':'pointer', opacity:page>=totalPages?0.4:1, display:'flex', alignItems:'center', gap:'4px' }}>Next <ChevronRight size={14} /></button>
        </div>

        <section style={{ borderRadius:'40px', background:'linear-gradient(135deg,#22d4a8,#0f9b8e)', padding:'56px 48px', display:'flex', alignItems:'center', justifyContent:'space-between', gap:'40px', flexWrap:'wrap' as const, marginBottom:'64px' }}>
          <div>
            <h2 style={{ fontWeight:900, letterSpacing:'-0.05em', fontSize:'36px', color:'white', marginBottom:'10px', lineHeight:1.05 }}>JOIN THE SOUKNI FAMILY</h2>
            <p style={{ fontSize:'15px', color:'rgba(255,255,255,0.85)', maxWidth:'480px', lineHeight:1.7 }}>Post your restaurant or hospitality job today for free and reach thousands of talented chefs and managers across Morocco.</p>
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
          relatedTitle="Explore Other Restaurant Jobs"
          related={[
            { label:'Chef & Kitchen', href:`/${locale}/jobs/restaurant/chef-kitchen` },
            { label:'Front of House', href:`/${locale}/jobs/restaurant/front-of-house` },
            { label:'F&B Management', href:`/${locale}/jobs/restaurant/fb-management` },
            { label:'Pastry & Bakery', href:`/${locale}/jobs/restaurant/pastry-bakery` },
            { label:'Bartending', href:`/${locale}/jobs/restaurant/bartending` },
            { label:'Catering & Events', href:`/${locale}/jobs/restaurant/catering-events` },
          ]}
          backHref={`/${locale}/jobs`}
          backLabel="Back to All Jobs"
          inkColor="#161d1b"
          mintDkColor="#0f9b8e"
        />
      </div>
    </div>
  )
}
