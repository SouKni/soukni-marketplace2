'use client'
import React, { useState, useMemo } from 'react'
import { Search, MapPin, X } from 'lucide-react'

const ALL_SERVICES = [
  { id:1,  title:'Local Apartment Move',           category:'Movers',       city:'Casablanca', price:1200 },
  { id:2,  title:'Long Distance Rabat to Agadir',  category:'Movers',       city:'Rabat',      price:3500 },
  { id:3,  title:'Office Relocation Weekend',       category:'Movers',       city:'Casablanca', price:8500 },
  { id:4,  title:'French Language Tutor',           category:'Tutors',       city:'Rabat',      price:180  },
  { id:5,  title:'Maths Bac Coaching',              category:'Tutors',       city:'Casablanca', price:220  },
  { id:6,  title:'Python and Web Development',      category:'Tutors',       city:'Marrakech',  price:350  },
  { id:7,  title:'Emergency Plumber 24/7',          category:'Maintenance',  city:'Casablanca', price:350  },
  { id:8,  title:'Full Home Rewiring',              category:'Maintenance',  city:'Rabat',      price:2800 },
  { id:9,  title:'Deep Clean Villa',                category:'Maintenance',  city:'Marrakech',  price:1200 },
  { id:10, title:'Wedding Photography Package',     category:'Pro Services', city:'Casablanca', price:8500 },
  { id:11, title:'Brand Identity and Logo Design',  category:'Pro Services', city:'Rabat',      price:5500 },
  { id:12, title:'Royal Hammam Argan Ritual',       category:'Wellness',     city:'Marrakech',  price:680  },
  { id:13, title:'Deep Tissue Sports Massage',      category:'Wellness',     city:'Casablanca', price:450  },
  { id:14, title:'Bridal Hair and Makeup Full Day', category:'Beauty',       city:'Casablanca', price:2800 },
  { id:15, title:'Classic Gentleman Cut and Shave', category:'Beauty',       city:'Rabat',      price:180  },
  { id:16, title:'Business Strategy Consulting',    category:'Consultants',  city:'Casablanca', price:4500 },
  { id:17, title:'Contract Review and Drafting',    category:'Consultants',  city:'Rabat',      price:3200 },
  { id:18, title:'Storage Unit Monthly',            category:'Movers',       city:'Tangier',    price:800  },
  { id:19, title:'Vinyasa Yoga Private Session',    category:'Wellness',     city:'Rabat',      price:280  },
  { id:20, title:'Interior Repaint Full Apartment', category:'Maintenance',  city:'Tangier',    price:4500 },
]

const CATEGORIES = ['All','Movers','Tutors','Maintenance','Pro Services','Wellness','Beauty','Consultants']
const BUDGETS = ['Any Budget','0-500 MAD','500-2000 MAD','2000-5000 MAD','5000+ MAD']

export default function SearchDemo() {
  const [heroCity, setHeroCity]         = useState('')
  const [heroKeyword, setHeroKeyword]   = useState('')
  const [budget, setBudget]             = useState('Any Budget')
  const [activeCategory, setActiveCategory] = useState('All')
  const [applied, setApplied]           = useState({ city:'', keyword:'' })
  const [budgetOpen, setBudgetOpen]     = useState(false)

  function applySearch() {
    setApplied({ city: heroCity, keyword: heroKeyword })
    setBudgetOpen(false)
  }

  const results = useMemo(() => {
    return ALL_SERVICES.filter(s => {
      const mc = !applied.city    || s.city.toLowerCase().includes(applied.city.toLowerCase())
      const mk = !applied.keyword || s.title.toLowerCase().includes(applied.keyword.toLowerCase()) || s.category.toLowerCase().includes(applied.keyword.toLowerCase())
      const mb = budget === 'Any Budget' ? true
               : budget === '0-500 MAD'    ? s.price <= 500
               : budget === '500-2000 MAD'  ? s.price > 500  && s.price <= 2000
               : budget === '2000-5000 MAD' ? s.price > 2000 && s.price <= 5000
               : s.price > 5000
      const mcat = activeCategory === 'All' || s.category === activeCategory
      return mc && mk && mb && mcat
    })
  }, [applied, budget, activeCategory])

  function clearAll() {
    setHeroCity(''); setHeroKeyword('')
    setApplied({ city:'', keyword:'' })
    setActiveCategory('All'); setBudget('Any Budget')
  }

  return (
    <div style={{ fontFamily:'Inter,sans-serif', backgroundColor:'#f4fbf8', minHeight:'100vh' }}>

      <section style={{ background:'linear-gradient(135deg,#161d1b,#0f4035)', padding:'80px 24px 120px', textAlign:'center' }}>
        <p style={{ fontSize:'11px', fontWeight:800, color:'#22d4a8', textTransform:'uppercase', letterSpacing:'0.2em', marginBottom:'12px' }}>SEARCH DEMO — EVERYTHING WORKS HERE</p>
        <h1 style={{ fontWeight:900, fontSize:'clamp(28px,5vw,48px)', color:'white', marginBottom:'8px' }}>Find Any Service in Morocco</h1>
        <p style={{ fontSize:'14px', color:'rgba(255,255,255,0.6)', marginBottom:'32px' }}>Type a city + keyword then click Search</p>
        <div style={{ display:'flex', alignItems:'stretch', backgroundColor:'rgba(255,255,255,0.12)', backdropFilter:'blur(24px)', border:'1px solid rgba(255,255,255,0.25)', borderRadius:'100px', overflow:'hidden', maxWidth:'640px', margin:'0 auto' }}>
          <div style={{ display:'flex', flexDirection:'column', padding:'14px 20px', flex:'0 0 180px', borderRight:'1px solid rgba(255,255,255,0.2)', gap:'3px' }}>
            <span style={{ fontSize:'9px', fontWeight:800, color:'rgba(255,255,255,0.55)', textTransform:'uppercase', letterSpacing:'0.12em' }}>City</span>
            <input value={heroCity} onChange={e=>setHeroCity(e.target.value)} onKeyDown={e=>e.key==='Enter'&&applySearch()} placeholder="e.g. Casablanca" style={{ backgroundColor:'transparent', border:'none', outline:'none', fontSize:'14px', fontWeight:600, color:'white', padding:0, width:'100%' }} />
          </div>
          <div style={{ display:'flex', flexDirection:'column', padding:'14px 20px', flex:1, borderRight:'1px solid rgba(255,255,255,0.2)', gap:'3px' }}>
            <span style={{ fontSize:'9px', fontWeight:800, color:'rgba(255,255,255,0.55)', textTransform:'uppercase', letterSpacing:'0.12em' }}>Keyword</span>
            <input value={heroKeyword} onChange={e=>setHeroKeyword(e.target.value)} onKeyDown={e=>e.key==='Enter'&&applySearch()} placeholder="plumber, tutor, massage..." style={{ backgroundColor:'transparent', border:'none', outline:'none', fontSize:'14px', fontWeight:600, color:'white', padding:0, width:'100%' }} />
          </div>
          <button onClick={applySearch} style={{ backgroundColor:'#22d4a8', color:'white', border:'none', padding:'0 32px', fontWeight:800, fontSize:'14px', cursor:'pointer', display:'flex', alignItems:'center', gap:'8px', flexShrink:0 }}
            onMouseEnter={e=>e.currentTarget.style.backgroundColor='#0f9b8e'} onMouseLeave={e=>e.currentTarget.style.backgroundColor='#22d4a8'}>
            <Search size={16} /> Search
          </button>
        </div>
      </section>

      <div style={{ maxWidth:'1280px', margin:'-28px auto 0', padding:'0 32px', position:'relative', zIndex:30 }}>
        <div style={{ backgroundColor:'white', border:'1px solid rgba(107,122,118,0.12)', borderRadius:'100px', boxShadow:'0 12px 40px rgba(0,0,0,0.1)', display:'flex', alignItems:'stretch', height:'68px' }}>
          <div style={{ flex:2, padding:'0 22px', display:'flex', flexDirection:'column', justifyContent:'center', borderRight:'1px solid rgba(186,202,197,0.3)' }}>
            <span style={{ fontSize:'9px', fontWeight:700, color:'#6b7a76', textTransform:'uppercase', letterSpacing:'0.12em', marginBottom:'3px' }}>KEYWORD</span>
            <div style={{ display:'flex', alignItems:'center', gap:'8px' }}>
              <Search size={13} color="#6b7a76" />
              <input value={heroKeyword} onChange={e=>setHeroKeyword(e.target.value)} onKeyDown={e=>e.key==='Enter'&&applySearch()} placeholder="Search services..." style={{ flex:1, background:'none', border:'none', outline:'none', fontSize:'14px', fontWeight:600, color:'#161d1b' }} />
              {heroKeyword && <button onClick={()=>{setHeroKeyword('');setApplied(p=>({...p,keyword:''}))}} style={{ background:'none', border:'none', cursor:'pointer', color:'#6b7a76', display:'flex' }}><X size={14}/></button>}
            </div>
          </div>
          <div style={{ position:'relative', flex:1, borderRight:'1px solid rgba(186,202,197,0.3)' }}>
            <button onClick={()=>setBudgetOpen(!budgetOpen)} style={{ width:'100%', height:'100%', background:'none', border:'none', cursor:'pointer', padding:'0 22px', display:'flex', flexDirection:'column', justifyContent:'center', textAlign:'left' }}>
              <span style={{ fontSize:'9px', fontWeight:700, color:'#6b7a76', textTransform:'uppercase', letterSpacing:'0.12em', marginBottom:'3px' }}>BUDGET</span>
              <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                <span style={{ fontSize:'14px', fontWeight:700, color:'#161d1b' }}>{budget}</span>
                <span style={{ color:'#22d4a8' }}>▾</span>
              </div>
            </button>
            {budgetOpen && (
              <div style={{ position:'absolute', top:'calc(100% + 8px)', left:0, minWidth:'200px', backgroundColor:'white', borderRadius:'20px', boxShadow:'0 20px 60px rgba(0,0,0,0.12)', border:'1px solid rgba(107,122,118,0.12)', zIndex:200, padding:'8px 0' }}>
                {BUDGETS.map(b=>(
                  <button key={b} onClick={()=>{setBudget(b);setBudgetOpen(false)}} style={{ width:'100%', padding:'12px 20px', background:'none', border:'none', cursor:'pointer', textAlign:'left', fontSize:'14px', fontWeight:600, color:budget===b?'#22d4a8':'#161d1b', display:'flex', justifyContent:'space-between' }}
                    onMouseEnter={e=>e.currentTarget.style.backgroundColor='#f4fbf8'} onMouseLeave={e=>e.currentTarget.style.backgroundColor='transparent'}>
                    {b}{budget===b&&<span>✓</span>}
                  </button>
                ))}
              </div>
            )}
          </div>
          <button onClick={applySearch} style={{ backgroundColor:'#22d4a8', color:'white', border:'none', padding:'0 32px', borderRadius:'0 100px 100px 0', fontWeight:800, fontSize:'13px', cursor:'pointer', display:'flex', alignItems:'center', gap:'8px', flexShrink:0 }}
            onMouseEnter={e=>e.currentTarget.style.backgroundColor='#0f9b8e'} onMouseLeave={e=>e.currentTarget.style.backgroundColor='#22d4a8'}>
            <Search size={16} /> SEARCH
          </button>
        </div>
      </div>

      <main style={{ maxWidth:'1280px', margin:'32px auto', padding:'0 32px 80px' }}>
        <div style={{ display:'flex', gap:'8px', flexWrap:'wrap', marginBottom:'20px' }}>
          {CATEGORIES.map(cat=>(
            <button key={cat} onClick={()=>setActiveCategory(cat)} style={{ padding:'9px 20px', borderRadius:'100px', fontSize:'12px', fontWeight:700, cursor:'pointer', border:'1px solid', transition:'all 0.15s', backgroundColor:activeCategory===cat?'#161d1b':'white', color:activeCategory===cat?'white':'#6b7a76', borderColor:activeCategory===cat?'#161d1b':'rgba(186,202,197,0.4)' }}>
              {cat}
            </button>
          ))}
        </div>

        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'20px' }}>
          <p style={{ fontWeight:700, color:'#161d1b' }}>{results.length} result{results.length!==1?'s':''} {applied.keyword&&<span style={{ color:'#22d4a8' }}>for "{applied.keyword}"</span>} {applied.city&&<span style={{ color:'#6b7a76' }}>in {applied.city}</span>}</p>
          {(applied.city||applied.keyword||activeCategory!=='All'||budget!=='Any Budget') && (
            <button onClick={clearAll} style={{ padding:'7px 16px', borderRadius:'100px', border:'1px solid #ef4444', backgroundColor:'white', fontSize:'12px', fontWeight:700, cursor:'pointer', color:'#ef4444' }}>Clear All</button>
          )}
        </div>

        {results.length === 0 ? (
          <div style={{ textAlign:'center', padding:'80px 20px' }}>
            <p style={{ fontSize:'20px', fontWeight:700, color:'#161d1b', marginBottom:'8px' }}>No results found</p>
            <p style={{ fontSize:'14px', color:'#6b7a76', marginBottom:'24px' }}>Try a different city, keyword or budget</p>
            <button onClick={clearAll} style={{ padding:'12px 28px', borderRadius:'100px', backgroundColor:'#22d4a8', color:'white', border:'none', fontWeight:700, fontSize:'14px', cursor:'pointer' }}>Clear Filters</button>
          </div>
        ) : (
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(260px,1fr))', gap:'20px' }}>
            {results.map(item=>(
              <div key={item.id} style={{ backgroundColor:'white', borderRadius:'24px', overflow:'hidden', border:'1px solid rgba(107,122,118,0.1)', padding:'20px', boxShadow:'0 2px 8px rgba(0,0,0,0.04)', transition:'all 0.25s', cursor:'pointer' }}
                onMouseEnter={e=>{e.currentTarget.style.borderColor='#22d4a8';e.currentTarget.style.boxShadow='0 16px 40px rgba(34,212,168,0.12)'}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor='rgba(107,122,118,0.1)';e.currentTarget.style.boxShadow='0 2px 8px rgba(0,0,0,0.04)'}}>
                <span style={{ display:'inline-block', backgroundColor:'#161d1b', color:'#22d4a8', fontSize:'9px', fontWeight:700, padding:'3px 10px', borderRadius:'100px', textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:'12px' }}>{item.category}</span>
                <h4 style={{ fontWeight:900, fontSize:'15px', color:'#161d1b', marginBottom:'6px', lineHeight:1.3 }}>{item.title}</h4>
                <p style={{ fontSize:'11px', color:'#6b7a76', marginBottom:'10px', display:'flex', alignItems:'center', gap:'3px' }}><MapPin size={10}/>{item.city}</p>
                <p style={{ fontWeight:900, fontSize:'20px', color:'#22d4a8', marginBottom:'14px' }}>{item.price.toLocaleString()} MAD</p>
                <div style={{ display:'flex', gap:'8px' }}>
                  <button style={{ flex:1, backgroundColor:'#eef5f2', color:'#161d1b', border:'none', padding:'10px', borderRadius:'12px', fontWeight:700, fontSize:'12px', cursor:'pointer', transition:'all 0.15s' }}
                    onMouseEnter={e=>{e.currentTarget.style.backgroundColor='#22d4a8';e.currentTarget.style.color='white'}}
                    onMouseLeave={e=>{e.currentTarget.style.backgroundColor='#eef5f2';e.currentTarget.style.color='#161d1b'}}>Message</button>
                  <button style={{ flex:1, backgroundColor:'#25D366', color:'white', border:'none', padding:'10px', borderRadius:'12px', fontWeight:700, fontSize:'12px', cursor:'pointer' }}>WhatsApp</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
