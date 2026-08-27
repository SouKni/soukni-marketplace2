'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { Search, MapPin, Heart, MessageCircle, ChevronRight, Star } from 'lucide-react'
import Breadcrumb from '@/components/ui/Breadcrumb'
import CategoryFooterNav from '@/components/ui/CategoryFooterNav'

const HERO = 'https://images.pexels.com/photos/3822621/pexels-photo-3822621.jpeg?auto=compress&w=1600'
const SIBLINGS = [
  { slug:'hammam-spa', label:'Hammam & Spa' },
  { slug:'massage', label:'Massage' },
  { slug:'yoga-pilates', label:'Yoga & Pilates' },
  { slug:'skincare', label:'Skincare' },
  { slug:'energy-healing', label:'Energy Healing' },
]
const topChoices = [
  { id:'t1', title:'Reiki Healing Session', price:250, location:'Rabat', rating:4.7, reviews:14, image:'https://images.pexels.com/photos/3757952/pexels-photo-3757952.jpeg?auto=compress&w=400', desc:'Reiki, sound healing, crystal therapy and holistic energy work. Certified on SouKni Morocco.' },
  { id:'t2', title:'Crystal Therapy', price:430, location:'Casablanca', rating:4.8, reviews:25, image:'https://images.pexels.com/photos/3997989/pexels-photo-3997989.jpeg?auto=compress&w=400', desc:'Reiki, sound healing, crystal therapy and holistic energy work. Certified on SouKni Morocco.' },
  { id:'t3', title:'Chakra Balancing', price:610, location:'Marrakech', rating:4.9, reviews:36, image:'https://images.pexels.com/photos/4056535/pexels-photo-4056535.jpeg?auto=compress&w=400', desc:'Reiki, sound healing, crystal therapy and holistic energy work. Certified on SouKni Morocco.' },
]
const bentoListings = [
  { id:'b1', title:'EFT Tapping Session', price:180, location:'Marrakech', image:'https://images.pexels.com/photos/3757952/pexels-photo-3757952.jpeg?auto=compress&w=400' },
  { id:'b2', title:'Sound Healing Bath', price:320, location:'Tangier', image:'https://images.pexels.com/photos/3997989/pexels-photo-3997989.jpeg?auto=compress&w=400' },
  { id:'b3', title:'Shamanic Healing', price:460, location:'Agadir', image:'https://images.pexels.com/photos/4056535/pexels-photo-4056535.jpeg?auto=compress&w=400' },
  { id:'b4', title:'Holistic Wellness Consult', price:600, location:'Fès', image:'https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&w=400' },
  { id:'b5', title:'Aura Cleansing Ritual', price:740, location:'Meknès', image:'https://images.pexels.com/photos/3822621/pexels-photo-3822621.jpeg?auto=compress&w=400' },
]
const discoveryGrid = [
  { id:'d1', title:'Reiki Healing Session', price:150, location:'Rabat', image:'https://images.pexels.com/photos/3757952/pexels-photo-3757952.jpeg?auto=compress&w=400' },
  { id:'d2', title:'Crystal Therapy', price:260, location:'Casablanca', image:'https://images.pexels.com/photos/3997989/pexels-photo-3997989.jpeg?auto=compress&w=400' },
  { id:'d3', title:'Chakra Balancing', price:370, location:'Marrakech', image:'https://images.pexels.com/photos/4056535/pexels-photo-4056535.jpeg?auto=compress&w=400' },
  { id:'d4', title:'EFT Tapping Session', price:480, location:'Tangier', image:'https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&w=400' },
  { id:'d5', title:'Sound Healing Bath', price:590, location:'Agadir', image:'https://images.pexels.com/photos/3822621/pexels-photo-3822621.jpeg?auto=compress&w=400' },
  { id:'d6', title:'Shamanic Healing', price:700, location:'Fès', image:'https://images.pexels.com/photos/3757952/pexels-photo-3757952.jpeg?auto=compress&w=400' },
  { id:'d7', title:'Holistic Wellness Consult', price:810, location:'Meknès', image:'https://images.pexels.com/photos/3997989/pexels-photo-3997989.jpeg?auto=compress&w=400' },
  { id:'d8', title:'Aura Cleansing Ritual', price:920, location:'Kenitra', image:'https://images.pexels.com/photos/4056535/pexels-photo-4056535.jpeg?auto=compress&w=400' },
]

function CertifiedBadge() {
  return <span style={{ display:'inline-flex', alignItems:'center', gap:'4px', background:'linear-gradient(135deg,#22d4a8,#0f9b8e)', color:'white', fontSize:'8px', fontWeight:900, padding:'3px 10px', borderRadius:'100px', textTransform:'uppercase' as const, letterSpacing:'0.08em' }}>✦ SOUKNI CERTIFIED</span>
}
function Stars({ rating }: { rating: number }) {
  return <div style={{ display:'flex', gap:'1px' }}>{[1,2,3,4,5].map(i=><Star key={i} size={11} fill={i<=Math.floor(rating)?'#f59e0b':'none'} color="#f59e0b" />)}</div>
}
function TopCard({ item, locale }: { item: typeof topChoices[0], locale: string }) {
  const [saved, setSaved] = useState(false)
  const [hov, setHov] = useState(false)
  return (
    <Link href={`/${locale}/listing/${item.id}`} style={{ textDecoration:'none' }}>
      <div onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
        style={{ display:'flex', backgroundColor:'white', borderRadius:'40px', overflow:'hidden', border:`1px solid ${hov?'#22d4a8':'#f1f5f9'}`, boxShadow:hov?'0 20px 48px rgba(0,0,0,0.12)':'0 2px 12px rgba(0,0,0,0.05)', transition:'all 0.3s', marginBottom:'16px' }}>
        <div style={{ position:'relative', width:'280px', flexShrink:0, overflow:'hidden' }}>
          <img src={item.image} alt={item.title} style={{ width:'100%', height:'100%', objectFit:'cover', transition:'transform 0.6s', transform:hov?'scale(1.06)':'scale(1)' }} />
          <div style={{ position:'absolute', top:'16px', left:'16px' }}><CertifiedBadge /></div>
          <button onClick={e=>{e.preventDefault();setSaved(!saved)}} style={{ position:'absolute', top:'16px', right:'16px', width:'32px', height:'32px', borderRadius:'50%', backgroundColor:'rgba(255,255,255,0.2)', border:'1px solid rgba(255,255,255,0.3)', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer' }}>
            <Heart size={14} color={saved?'#ef4444':'white'} fill={saved?'#ef4444':'none'} />
          </button>
        </div>
        <div style={{ flex:1, padding:'28px 32px', display:'flex', flexDirection:'column' as const, justifyContent:'space-between' }}>
          <div>
            <div style={{ display:'flex', alignItems:'center', gap:'8px', marginBottom:'10px' }}><Stars rating={item.rating} /><span style={{ fontWeight:900, fontSize:'13px', color:'#161d1b' }}>{item.rating}</span><span style={{ fontSize:'12px', color:'#6b7a76' }}>({item.reviews} reviews)</span></div>
            <h3 style={{ fontWeight:900, letterSpacing:'-0.05em', fontSize:'20px', color:'#161d1b', marginBottom:'10px', lineHeight:1.2 }}>{item.title}</h3>
            <p style={{ fontSize:'13px', color:'#6b7a76', lineHeight:1.7, marginBottom:'16px' }}>{item.desc}</p>
            <p style={{ fontSize:'12px', color:'#6b7a76', display:'flex', alignItems:'center', gap:'4px' }}><MapPin size={12} />{item.location}</p>
          </div>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginTop:'20px' }}>
            <span style={{ fontWeight:900, fontSize:'24px', color:'#22d4a8' }}>{item.price.toLocaleString()} MAD</span>
            <div style={{ display:'flex', gap:'8px' }}>
              <button onClick={e=>e.preventDefault()} style={{ padding:'10px 20px', borderRadius:'100px', border:'1px solid #22d4a8', backgroundColor:'transparent', color:'#22d4a8', fontWeight:700, fontSize:'12px', cursor:'pointer', display:'flex', alignItems:'center', gap:'5px', transition:'all 0.15s' }}
                onMouseEnter={e=>{e.currentTarget.style.backgroundColor='#22d4a8';e.currentTarget.style.color='white'}} onMouseLeave={e=>{e.currentTarget.style.backgroundColor='transparent';e.currentTarget.style.color='#22d4a8'}}>
                <MessageCircle size={13} />Message
              </button>
              <button onClick={e=>e.preventDefault()} style={{ padding:'10px 20px', borderRadius:'100px', border:'none', backgroundColor:'#25D366', color:'white', fontWeight:700, fontSize:'12px', cursor:'pointer', transition:'opacity 0.15s' }}
                onMouseEnter={e=>e.currentTarget.style.opacity='0.85'} onMouseLeave={e=>e.currentTarget.style.opacity='1'}>WhatsApp</button>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
function DiscoCard({ item, locale }: { item: typeof discoveryGrid[0], locale: string }) {
  const [saved, setSaved] = useState(false)
  const [hov, setHov] = useState(false)
  return (
    <Link href={`/${locale}/listing/${item.id}`} style={{ textDecoration:'none' }}>
      <div onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
        style={{ display:'flex', backgroundColor:'white', borderRadius:'24px', overflow:'hidden', border:`1px solid ${hov?'#22d4a8':'#f1f5f9'}`, boxShadow:hov?'0 16px 32px rgba(0,0,0,0.1)':'0 2px 8px rgba(0,0,0,0.04)', transition:'all 0.25s' }}>
        <div style={{ position:'relative', width:'160px', flexShrink:0, overflow:'hidden' }}>
          <img src={item.image} alt={item.title} style={{ width:'100%', height:'100%', objectFit:'cover', transition:'transform 0.5s', transform:hov?'scale(1.06)':'scale(1)' }} />
          <div style={{ position:'absolute', top:'8px', left:'8px' }}><CertifiedBadge /></div>
        </div>
        <div style={{ flex:1, padding:'16px 20px', display:'flex', flexDirection:'column' as const, justifyContent:'space-between' }}>
          <div>
            <p style={{ fontSize:'11px', color:'#6b7a76', marginBottom:'4px', display:'flex', alignItems:'center', gap:'3px' }}><MapPin size={10} />{item.location}</p>
            <h4 style={{ fontWeight:900, letterSpacing:'-0.05em', fontSize:'14px', color:'#161d1b', marginBottom:'8px', lineHeight:1.3 }}>{item.title}</h4>
            <p style={{ fontWeight:900, fontSize:'18px', color:'#22d4a8' }}>{item.price.toLocaleString()} MAD</p>
          </div>
          <div style={{ display:'flex', gap:'6px', marginTop:'12px' }}>
            <button onClick={e=>{e.preventDefault();setSaved(!saved)}} style={{ flex:1, backgroundColor:saved?'#22d4a8':'#eef5f2', color:saved?'white':'#3c4a46', border:'none', padding:'8px', borderRadius:'100px', fontWeight:700, fontSize:'11px', cursor:'pointer', transition:'all 0.2s' }}>{saved?'Saved':'Message'}</button>
            <button onClick={e=>e.preventDefault()} style={{ flex:1, backgroundColor:'#25D366', color:'white', border:'none', padding:'8px', borderRadius:'100px', fontWeight:700, fontSize:'11px', cursor:'pointer', transition:'opacity 0.15s' }}
              onMouseEnter={e=>e.currentTarget.style.opacity='0.85'} onMouseLeave={e=>e.currentTarget.style.opacity='1'}>WhatsApp</button>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = React.use(params)
  const [tab, setTab] = useState('All')
  const [diamond, setDiamond] = useState(true)
  const [page, setPage] = useState(1)
  const [grid, setGrid] = useState(true)
  const [keyword, setKeyword] = useState('')
  const [city, setCity] = useState('')
  const [budget, setBudget] = useState('Any Range')
  const budgetPrices = discoveryGrid.map(i => i.price)
  const minBudget = Math.min(...budgetPrices)
  const maxBudget = Math.max(...budgetPrices)
  const midBudget = Math.round((minBudget + maxBudget) / 2)
  const budgetRanges = ['Any Range', `${minBudget.toLocaleString()} – ${midBudget.toLocaleString()} MAD`, `${midBudget.toLocaleString()} – ${maxBudget.toLocaleString()} MAD`, `${maxBudget.toLocaleString()}+ MAD`]
  function priceInRange(itemPrice: number, rangeLabel: string) {
    if (!rangeLabel || rangeLabel.startsWith('Any')) return true
    const nums = rangeLabel.replace(/,/g, '').match(/\d+/g)?.map(Number) || []
    if (rangeLabel.includes('+')) return itemPrice >= nums[0]
    if (nums.length === 2) return itemPrice >= nums[0] && itemPrice <= nums[1]
    return true
  }

  const filteredGrid = discoveryGrid.filter(item =>
    (!keyword.trim() || item.title.toLowerCase().includes(keyword.toLowerCase())) &&
    (!city.trim()    || item.location.toLowerCase().includes(city.toLowerCase())) &&
    priceInRange(item.price, budget)
  )
  const PAGE_SIZE = 2
  const totalPages = Math.max(1, Math.ceil(filteredGrid.length / PAGE_SIZE))
  const clampedPage = Math.min(page, totalPages)
  const paginatedGrid = filteredGrid.slice((clampedPage-1)*PAGE_SIZE, clampedPage*PAGE_SIZE)

  return (
    <div style={{ fontFamily:'Inter, sans-serif', backgroundColor:'#f4fbf8', minHeight:'100vh' }}>
      <section style={{ position:'relative', height:'400px', overflow:'hidden', display:'flex', alignItems:'center', justifyContent:'center' }}>
        <img src={HERO} alt='Energy Healing' style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover' }} />
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top,rgba(15,23,42,0.88),rgba(15,23,42,0.4))' }} />
        <div style={{ position:'relative', zIndex:10, textAlign:'center', padding:'0 20px', maxWidth:'760px', width:'100%' }}>
          <p style={{ fontSize:'11px', fontWeight:800, color:'#22d4a8', textTransform:'uppercase' as const, letterSpacing:'0.2em', marginBottom:'12px' }}>WELLNESS & SPA</p>
          <h1 style={{ fontWeight:900, letterSpacing:'-0.05em', fontSize:'clamp(28px,5vw,48px)', color:'white', marginBottom:'12px', lineHeight:1.05 }}>Energy Healing</h1>
          <p style={{ fontSize:'15px', color:'rgba(255,255,255,0.82)', marginBottom:'28px' }}>Reiki, sound healing, crystal therapy and holistic energy work</p>
          <div style={{ display:'flex', alignItems:'stretch', backgroundColor:'rgba(255,255,255,0.12)', backdropFilter:'blur(24px)', border:'1px solid rgba(255,255,255,0.25)', borderRadius:'100px', overflow:'hidden', maxWidth:'620px', margin:'0 auto' }}>
            <div style={{ display:'flex', flexDirection:'column' as const, padding:'12px 20px', flex:'0 0 160px', borderRight:'1px solid rgba(255,255,255,0.2)', gap:'2px' }}>
              <span style={{ fontSize:'9px', fontWeight:800, color:'rgba(255,255,255,0.6)', textTransform:'uppercase' as const, letterSpacing:'0.12em' }}>City</span>
              <input value={city} onChange={e=>setCity(e.target.value)} placeholder="Marrakech" style={{ backgroundColor:'transparent', border:'none', outline:'none', fontSize:'13px', fontWeight:600, color:'white', padding:0, width:'100%' }} />
            </div>
            <div style={{ display:'flex', flexDirection:'column' as const, padding:'12px 20px', flex:1, borderRight:'1px solid rgba(255,255,255,0.2)', gap:'2px' }}>
              <span style={{ fontSize:'9px', fontWeight:800, color:'rgba(255,255,255,0.6)', textTransform:'uppercase' as const, letterSpacing:'0.12em' }}>Keyword</span>
              <input value={keyword} onChange={e=>setKeyword(e.target.value)} placeholder="Search..." onKeyDown={e=>e.key==='Enter'&&e.currentTarget.blur()} style={{ backgroundColor:'transparent', border:'none', outline:'none', fontSize:'13px', fontWeight:600, color:'white', padding:0, width:'100%' }} />
            </div>
            <button style={{ backgroundColor:'#22d4a8', color:'white', border:'none', padding:'0 28px', fontWeight:800, fontSize:'13px', cursor:'pointer', display:'flex', alignItems:'center', gap:'6px', flexShrink:0, transition:'background 0.15s' }}
              onMouseEnter={e=>e.currentTarget.style.backgroundColor='#0f9b8e'} onMouseLeave={e=>e.currentTarget.style.backgroundColor='#22d4a8'}>
              <Search size={15} /> Search
            </button>
          </div>
        </div>
      </section>

      <div style={{ maxWidth:'1440px', margin:'-24px auto 0', padding:'0 40px', position:'relative', zIndex:30 }}>
        <div style={{ backgroundColor:'rgba(255,255,255,0.9)', backdropFilter:'blur(20px)', borderRadius:'100px', padding:'8px 8px 8px 24px', boxShadow:'0 8px 40px rgba(0,0,0,0.12)', border:'1px solid rgba(255,255,255,0.6)', display:'flex', alignItems:'center' }}>
                      <div style={{ flex:1, padding:'6px 18px', borderRight:'1px solid rgba(186,202,197,0.3)', display:'flex', flexDirection:'column' as const, gap:'1px' }}>
              <span style={{ fontSize:'9px', textTransform:'uppercase' as const, fontWeight:700, color:'#6b7a76', letterSpacing:'0.1em' }}>City</span>
              <input value={city} onChange={e=>setCity(e.target.value)} placeholder="Marrakech" style={{ fontSize:'13px', fontWeight:500, color:'#161d1b', background:'none', border:'none', outline:'none', padding:0, width:'100%' }} />
            </div>
            <div style={{ flex:2, padding:'6px 18px', borderRight:'1px solid rgba(186,202,197,0.3)', display:'flex', flexDirection:'column' as const, gap:'1px' }}>
              <span style={{ fontSize:'9px', textTransform:'uppercase' as const, fontWeight:700, color:'#6b7a76', letterSpacing:'0.1em' }}>Keyword</span>
              <input value={keyword} onChange={e=>setKeyword(e.target.value)} placeholder="Search..." style={{ fontSize:'13px', fontWeight:500, color:'#161d1b', background:'none', border:'none', outline:'none', padding:0, width:'100%' }} />
            </div>
            <div style={{ flex:1, padding:'6px 18px', borderRight:'1px solid rgba(186,202,197,0.3)', display:'flex', flexDirection:'column' as const, gap:'1px' }}>
              <span style={{ fontSize:'9px', textTransform:'uppercase' as const, fontWeight:700, color:'#6b7a76', letterSpacing:'0.1em' }}>Budget</span>
              <select value={budget} onChange={e=>setBudget(e.target.value)} style={{ ...{ fontSize:'13px', fontWeight:500, color:'#161d1b', background:'none', border:'none', outline:'none', padding:0, width:'100%' }, cursor:'pointer' }}>
                {budgetRanges.map(r=><option key={r} value={r}>{r}</option>)}
              </select>
            </div>
            <div style={{ flex:1, padding:'6px 18px', borderRight:'1px solid rgba(186,202,197,0.3)', display:'flex', flexDirection:'column' as const, cursor:'pointer', gap:'1px' }}>
              <span style={{ fontSize:'9px', textTransform:'uppercase' as const, fontWeight:700, color:'#6b7a76', letterSpacing:'0.1em' }}>Availability</span>
              <span style={{ fontSize:'13px', fontWeight:500, color:'#161d1b' }}>Anytime</span>
            </div>
            <div style={{ flex:1, padding:'6px 18px', display:'flex', flexDirection:'column' as const, cursor:'pointer', gap:'1px' }}>
              <span style={{ fontSize:'9px', textTransform:'uppercase' as const, fontWeight:700, color:'#6b7a76', letterSpacing:'0.1em' }}>Filters</span>
              <span style={{ fontSize:'13px', fontWeight:500, color:'#161d1b' }}>All</span>
            </div>
          <button style={{ backgroundColor:'#22d4a8', color:'white', border:'none', padding:'12px 24px', borderRadius:'100px', cursor:'pointer', display:'flex', alignItems:'center', gap:'6px', fontWeight:700, fontSize:'12px', flexShrink:0, marginLeft:'8px', transition:'background 0.15s' }}
            onMouseEnter={e=>e.currentTarget.style.backgroundColor='#0f9b8e'} onMouseLeave={e=>e.currentTarget.style.backgroundColor='#22d4a8'}>
            <Search size={14} /> SEARCH
          </button>
        </div>
      </div>

      <div style={{ maxWidth:'1440px', margin:'28px auto 0', padding:'0 40px 64px' }}>
        <Breadcrumb
          items={[
            { label:'Home', href:`/${locale}` },
            { label:'Services', href:`/${locale}/services` },
            { label:'Wellness & Spa', href:`/${locale}/services/wellness-spa` },
            { label:'Energy Healing' },
          ]}
          mutedColor="#6b7a76"
          inkColor="#161d1b"
        />

        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'4px' }}>
          <h2 style={{ fontWeight:900, letterSpacing:'-0.05em', fontSize:'22px', color:'#161d1b' }}>Energy Healing in Morocco</h2>
          <div style={{ display:'flex', gap:'8px' }}>
            <button style={{ display:'flex', alignItems:'center', gap:'6px', padding:'8px 14px', borderRadius:'12px', border:'1px solid rgba(186,202,197,0.4)', backgroundColor:'#eef5f2', fontSize:'12px', fontWeight:700, cursor:'pointer', color:'#161d1b', transition:'all 0.15s' }}
              onMouseEnter={e=>{e.currentTarget.style.backgroundColor='#22d4a8';e.currentTarget.style.color='white';e.currentTarget.style.borderColor='#22d4a8'}}
              onMouseLeave={e=>{e.currentTarget.style.backgroundColor='#eef5f2';e.currentTarget.style.color='#161d1b';e.currentTarget.style.borderColor='rgba(186,202,197,0.4)'}}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="3" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="13" y1="18" x2="21" y2="18"/></svg>Sort
            </button>
            <button style={{ display:'flex', alignItems:'center', gap:'6px', padding:'8px 14px', borderRadius:'12px', border:'1px solid rgba(186,202,197,0.4)', backgroundColor:'#eef5f2', fontSize:'12px', fontWeight:700, cursor:'pointer', color:'#161d1b', transition:'all 0.15s' }}
              onMouseEnter={e=>{e.currentTarget.style.backgroundColor='#22d4a8';e.currentTarget.style.color='white';e.currentTarget.style.borderColor='#22d4a8'}}
              onMouseLeave={e=>{e.currentTarget.style.backgroundColor='#eef5f2';e.currentTarget.style.color='#161d1b';e.currentTarget.style.borderColor='rgba(186,202,197,0.4)'}}>🔖 Save</button>
          </div>
        </div>
        <p style={{ fontSize:'14px', color:'#6b7a76', marginBottom:'20px' }}>Reiki, sound healing, crystal therapy and holistic energy work</p>

        <div style={{ display:'flex', gap:'8px', marginBottom:'20px', overflowX:'auto', paddingBottom:'4px' }}>
          {SIBLINGS.map(s=>(
            <Link key={s.slug} href={`/${locale}/services/wellness-spa/${s.slug}`} style={{ textDecoration:'none' }}>
              <button style={{ padding:'9px 20px', borderRadius:'100px', fontSize:'11px', fontWeight:700, cursor:'pointer', border:'1px solid', whiteSpace:'nowrap' as const, transition:'all 0.15s',
                backgroundColor: s.slug==='energy-healing' ? '#161d1b' : 'white',
                color: s.slug==='energy-healing' ? 'white' : '#6b7a76',
                borderColor: s.slug==='energy-healing' ? '#161d1b' : 'rgba(186,202,197,0.4)',
              }}>{s.label}</button>
            </Link>
          ))}
        </div>

        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'12px 0', borderTop:'1px solid rgba(186,202,197,0.25)', borderBottom:'1px solid rgba(186,202,197,0.25)', marginBottom:'16px', flexWrap:'wrap' as const, gap:'10px' }}>
          <div style={{ display:'flex', gap:'4px', padding:'4px', backgroundColor:'#e8efec', borderRadius:'100px' }}>
            {['All','Online','In-Person','Home Visit'].map(t=>(
              <button key={t} onClick={()=>setTab(t)} style={{ padding:'8px 20px', borderRadius:'100px', fontSize:'11px', fontWeight:700, cursor:'pointer', border:'none', transition:'all 0.2s',
                backgroundColor:tab===t?'#161d1b':'transparent', color:tab===t?'white':'#6b7a76', boxShadow:tab===t?'0 2px 8px rgba(0,0,0,0.15)':'none' }}>{t}</button>
            ))}
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:'16px' }}>
            <div style={{ display:'flex', alignItems:'center', gap:'8px', cursor:'pointer' }} onClick={()=>setDiamond(!diamond)}>
              <span style={{ fontSize:'12px', fontWeight:700, color:'#6b7a76' }}>Diamond Verified First</span>
              <div style={{ width:'40px', height:'20px', borderRadius:'100px', backgroundColor:diamond?'#22d4a8':'#bacac5', position:'relative', transition:'background 0.25s' }}>
                <div style={{ position:'absolute', top:'2px', left:diamond?'22px':'2px', width:'16px', height:'16px', borderRadius:'50%', backgroundColor:'white', transition:'left 0.25s', boxShadow:'0 1px 3px rgba(0,0,0,0.15)' }} />
              </div>
            </div>
            <div style={{ display:'flex', gap:'6px' }}>
              <button onClick={()=>setGrid(true)} style={{ width:'34px', height:'34px', display:'flex', alignItems:'center', justifyContent:'center', borderRadius:'8px', border:'none', cursor:'pointer', backgroundColor:grid?'#161d1b':'#e8efec', color:grid?'white':'#161d1b', transition:'all 0.2s' }}><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg></button>
              <button onClick={()=>setGrid(false)} style={{ width:'34px', height:'34px', display:'flex', alignItems:'center', justifyContent:'center', borderRadius:'8px', border:'none', cursor:'pointer', backgroundColor:!grid?'#161d1b':'#e8efec', color:!grid?'white':'#161d1b', transition:'all 0.2s' }}><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg></button>
            </div>
          </div>
        </div>

        <div style={{ display:'flex', gap:'8px', marginBottom:'32px', flexWrap:'wrap' as const }}>
          {[{label:'New Arrivals',active:true},{label:'Top Rated',active:false},{label:'Best Price',active:false}].map(c=>(
            <button key={c.label} style={{ padding:'8px 18px', borderRadius:'100px', fontSize:'12px', fontWeight:700, cursor:'pointer', border:c.active?'none':'1px solid rgba(186,202,197,0.5)', backgroundColor:c.active?'#161d1b':'white', color:c.active?'white':'#3c4a46', transition:'all 0.15s' }}
              onMouseEnter={e=>{if(!c.active){e.currentTarget.style.borderColor='#22d4a8';e.currentTarget.style.color='#161d1b'}}}
              onMouseLeave={e=>{if(!c.active){e.currentTarget.style.borderColor='rgba(186,202,197,0.5)';e.currentTarget.style.color='#3c4a46'}}}>{c.label}</button>
          ))}
        </div>

        <section style={{ marginBottom:'40px' }}>
          <h2 style={{ fontSize:'13px', fontWeight:900, color:'#161d1b', textTransform:'uppercase' as const, letterSpacing:'0.1em', marginBottom:'20px' }}>SOUKNI TOP CHOICES</h2>
          {topChoices.map(item=><TopCard key={item.id} item={item} locale={locale} />)}
        </section>

        <div style={{ borderRadius:'40px', overflow:'hidden', marginBottom:'40px', background:'linear-gradient(135deg,#161d1b,#1a2e28)', padding:'40px 48px', display:'grid', gridTemplateColumns:'1fr 1fr', gap:'40px', alignItems:'center' }}>
          <div>
            <p style={{ fontSize:'10px', fontWeight:700, color:'#22d4a8', textTransform:'uppercase' as const, letterSpacing:'0.15em', marginBottom:'8px' }}>SouKni Immo Pro</p>
            <h3 style={{ fontWeight:900, letterSpacing:'-0.05em', fontSize:'28px', color:'white', marginBottom:'12px', lineHeight:1.1 }}>List your luxury property where Morocco's elite browse.</h3>
            <Link href={`/${locale}/property`} style={{ textDecoration:'none' }}><button style={{ backgroundColor:'#22d4a8', color:'white', border:'none', padding:'11px 24px', borderRadius:'100px', fontWeight:700, fontSize:'12px', cursor:'pointer', transition:'background 0.15s' }} onMouseEnter={e=>e.currentTarget.style.backgroundColor='#0f9b8e'} onMouseLeave={e=>e.currentTarget.style.backgroundColor='#22d4a8'}>Explore Properties</button></Link>
          </div>
          <div style={{ position:'relative', height:'200px', borderRadius:'24px', overflow:'hidden' }}>
            <img src="https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&w=800" alt="Property" style={{ width:'100%', height:'100%', objectFit:'cover', opacity:0.7 }} />
          </div>
        </div>

        <section style={{ marginBottom:'40px' }}>
          <h2 style={{ fontWeight:900, letterSpacing:'-0.05em', fontSize:'22px', color:'#22d4a8', marginBottom:'16px' }}>SouKni Energy Healing Collection</h2>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'16px', marginBottom:'16px' }}>
            {bentoListings.slice(0,3).map(item=>(
              <Link key={item.id} href={`/${locale}/listing/${item.id}`} style={{ textDecoration:'none' }}>
                <div style={{ position:'relative', height:'220px', borderRadius:'28px', overflow:'hidden', cursor:'pointer', transition:'transform 0.2s' }} onMouseEnter={e=>(e.currentTarget as HTMLDivElement).style.transform='scale(1.02)'} onMouseLeave={e=>(e.currentTarget as HTMLDivElement).style.transform='scale(1)'}>
                  <img src={item.image} alt={item.title} style={{ width:'100%', height:'100%', objectFit:'cover' }} />
                  <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top,rgba(0,0,0,0.85),rgba(0,0,0,0.05))' }} />
                  <div style={{ position:'absolute', top:'12px', left:'12px' }}><CertifiedBadge /></div>
                  <div style={{ position:'absolute', bottom:'16px', left:'16px', right:'16px' }}>
                    <h3 style={{ fontWeight:900, fontSize:'14px', color:'white', marginBottom:'4px', lineHeight:1.3 }}>{item.title}</h3>
                    <p style={{ fontWeight:900, fontSize:'16px', color:'#22d4a8' }}>{item.price.toLocaleString()} MAD</p>
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
                    <h3 style={{ fontWeight:900, fontSize:'15px', color:'white', marginBottom:'4px' }}>{item.title}</h3>
                    <p style={{ fontWeight:900, fontSize:'17px', color:'#22d4a8' }}>{item.price.toLocaleString()} MAD</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section style={{ marginBottom:'40px' }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'20px' }}>
            <h2 style={{ fontWeight:900, letterSpacing:'-0.05em', fontSize:'20px', color:'#161d1b' }}>More Energy Healing Services</h2>
            <Link href="#" style={{ color:'#22d4a8', fontWeight:700, fontSize:'13px', textDecoration:'none', display:'flex', alignItems:'center', gap:'3px' }}>View all <ChevronRight size={14} /></Link>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'16px' }}>
            {paginatedGrid.map(item=><DiscoCard key={item.id} item={item} locale={locale} />)}
          </div>
        </section>

        <div style={{ display:'flex', justifyContent:'center', alignItems:'center', gap:'8px', marginBottom:'40px' }}>
          {Array.from({length:totalPages},(_,i)=>i+1).map(p=><button key={p} onClick={()=>setPage(p)} style={{ width:'36px', height:'36px', borderRadius:'10px', border:page===p?'none':'1px solid #e2e8f0', backgroundColor:page===p?'#22d4a8':'white', color:page===p?'white':'#161d1b', fontWeight:700, fontSize:'13px', cursor:'pointer', transition:'all 0.2s' }}>{p}</button>)}
        </div>

        <section style={{ marginBottom:'48px' }}>
          <h3 style={{ fontSize:'16px', fontWeight:900, color:'#161d1b', textTransform:'uppercase' as const, letterSpacing:'0.08em', marginBottom:'16px' }}>Explore Other Wellness Treatments</h3>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'12px' }}>
            {SIBLINGS.filter(s=>s.slug!=='energy-healing').map(s=>(
              <Link key={s.slug} href={`/${locale}/services/wellness-spa/${s.slug}`}
                style={{ backgroundColor:'white', borderRadius:'16px', padding:'20px 16px', textAlign:'center' as const, border:'1px solid rgba(107,122,118,0.1)', textDecoration:'none', transition:'all 0.2s', display:'block' }}
                onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.borderColor='#22d4a8';(e.currentTarget as HTMLElement).style.boxShadow='0 8px 24px rgba(34,212,168,0.12)'}}
                onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.borderColor='rgba(107,122,118,0.1)';(e.currentTarget as HTMLElement).style.boxShadow='none'}}>
                <p style={{ fontSize:'12px', fontWeight:900, color:'#161d1b', textTransform:'uppercase' as const, letterSpacing:'0.06em' }}>{s.label}</p>
              </Link>
            ))}
          </div>
        </section>

        <CategoryFooterNav
          backHref={`/${locale}/services/wellness-spa`}
          backLabel="Back to Wellness & Spa"
          inkColor="#161d1b"
          mintDkColor="#22d4a8"
        />
      </div>
    </div>
  )
}
