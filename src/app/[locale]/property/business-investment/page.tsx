'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Search, ChevronRight, ChevronLeft, MapPin, TrendingUp, Building, Heart, LayoutGrid, List, Phone, DollarSign, PieChart, Shield } from 'lucide-react'
import { useListings } from '@/hooks/useListings'
import Breadcrumb from '@/components/ui/Breadcrumb'
import CategoryFooterNav from '@/components/ui/CategoryFooterNav'

const C = { mint:'#22d4a8', mintDk:'#0f9b8e', ink:'#161d1b', surface:'#f4fbf8', muted:'#6b7a76' }
const UB = { fontFamily:"'Inter',sans-serif", fontWeight:900, letterSpacing:'-0.05em' } as const
const CB = { fontFamily:"'Hanken Grotesk',sans-serif", fontWeight:900, letterSpacing:'-0.03em' } as const

const INVEST_CATS = [
  { slug:'hotel-assets',      label:'Hotels & Guesthouses',  count:'48',  emoji:'🏨', yield:'7–9%', image:'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&w=600',     desc:'Boutique hotels, riads & hospitality assets' },
  { slug:'retail-strips',     label:'Retail Strips',          count:'124', emoji:'🏪', yield:'5–8%', image:'https://images.pexels.com/photos/1109561/pexels-photo-1109561.jpeg?auto=compress&w=600',   desc:'Multi-unit retail investments' },
  { slug:'office-buildings',  label:'Office Buildings',        count:'86',  emoji:'🏢', yield:'6–8%', image:'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&w=600',   desc:'Entire office floors & buildings' },
  { slug:'residential-blocks',label:'Residential Blocks',     count:'92',  emoji:'🏗️', yield:'4–6%', image:'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&w=600',   desc:'Apartment blocks & rental complexes' },
  { slug:'industrial-assets', label:'Industrial & Logistics',  count:'64',  emoji:'🏭', yield:'7–10%',image:'https://images.pexels.com/photos/2219024/pexels-photo-2219024.jpeg?auto=compress&w=600',   desc:'Warehouses, factories & logistics hubs' },
  { slug:'mixed-portfolios',  label:'Mixed Portfolios',        count:'38',  emoji:'📊', yield:'6–9%', image:'https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg?auto=compress&w=600',   desc:'Multi-asset investment portfolios' },
]

type AssetType = 'all'|'hotel-assets'|'retail-strips'|'office-buildings'|'residential-blocks'|'industrial-assets'
type YieldRange = 'all'|'4-6'|'6-8'|'8+'

const LISTINGS = [
  { id:'bi1',  title:'Boutique Hotel — 24 Rooms, Medina View',    type:'Hotels',      price:'28,500,000', yield_pct:8.4, occupancy:82, location:'Fès Médina',             tenanted:true,  badge:'Top Yield',    image:'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&w=700',   income:'238,200 MAD/mo'  },
  { id:'bi2',  title:'Retail Strip — 8 Units Fully Leased',        type:'Retail',      price:'9,200,000',  yield_pct:6.8, occupancy:100,location:'Casablanca, Anfa',       tenanted:true,  badge:'Fully Leased', image:'https://images.pexels.com/photos/1109561/pexels-photo-1109561.jpeg?auto=compress&w=700',  income:'52,133 MAD/mo'   },
  { id:'bi3',  title:'Office Building — 6 Floors, Finance City',   type:'Offices',     price:'95,000,000', yield_pct:7.5, occupancy:88, location:'Casa Finance City',      tenanted:true,  badge:'Premium Asset', image:'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&w=700', income:'593,750 MAD/mo'  },
  { id:'bi4',  title:'Logistics Hub — 12,000m² Tanger Port',       type:'Industrial',  price:'42,000,000', yield_pct:9.2, occupancy:95, location:'Tanger Med Zone',        tenanted:true,  badge:'Top Yield',    image:'https://images.pexels.com/photos/2219024/pexels-photo-2219024.jpeg?auto=compress&w=700',  income:'322,000 MAD/mo'  },
  { id:'bi5',  title:'Residential Block — 36 Units Agdal',         type:'Residential', price:'18,500,000', yield_pct:5.2, occupancy:92, location:'Rabat, Agdal',           tenanted:true,  badge:'Stable Income', image:'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&w=700', income:'80,167 MAD/mo'   },
  { id:'bi6',  title:'Riad Investment — 12 Suites, Marrakech',     type:'Hotels',      price:'14,800,000', yield_pct:7.8, occupancy:78, location:'Marrakech Médina',       tenanted:true,  badge:'Top Yield',    image:'https://images.pexels.com/photos/440731/pexels-photo-440731.jpeg?auto=compress&w=700',   income:'96,200 MAD/mo'   },
  { id:'bi7',  title:'Mall Anchor Unit — 2,400m² Rabat',           type:'Retail',      price:'24,000,000', yield_pct:6.2, occupancy:100,location:'Rabat, Souissi',         tenanted:true,  badge:'Fully Leased', image:'https://images.pexels.com/photos/1109561/pexels-photo-1109561.jpeg?auto=compress&w=700',  income:'124,000 MAD/mo'  },
  { id:'bi8',  title:'Mixed Portfolio — Hotel + Retail + Office',  type:'Portfolio',   price:'68,000,000', yield_pct:7.1, occupancy:89, location:'Casablanca',             tenanted:true,  badge:'Portfolio Deal',image:'https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg?auto=compress&w=700',  income:'402,333 MAD/mo'  },
  { id:'bi9',  title:'Factory + Office — Ain Sebaa Zone',          type:'Industrial',  price:'31,000,000', yield_pct:8.6, occupancy:90, location:'Casablanca, Ain Sebaa',  tenanted:false, badge:'Value-Add',    image:'https://images.pexels.com/photos/1595109/pexels-photo-1595109.jpeg?auto=compress&w=700',   income:'222,500 MAD/mo'  },
]

const ZONES = [
  { zone:'Casa Finance City', avgYield:'7.2%', bestType:'Office',   image:'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&w=400' },
  { zone:'Marrakech Médina',  avgYield:'8.1%', bestType:'Hospitality',image:'https://images.pexels.com/photos/440731/pexels-photo-440731.jpeg?auto=compress&w=400' },
  { zone:'Tanger Med Zone',   avgYield:'9.0%', bestType:'Industrial',image:'https://images.pexels.com/photos/2219024/pexels-photo-2219024.jpeg?auto=compress&w=400' },
  { zone:'Rabat, Agdal',      avgYield:'5.8%', bestType:'Residential',image:'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&w=400' },
]

type Listing = typeof LISTINGS[0]

function InvestCard({ item, locale, view }: { item:Listing; locale:string; view:'grid'|'list' }) {
  const [saved, setSaved] = useState(false)
  const [hov,   setHov  ] = useState(false)

  if (view === 'list') return (
    <Link href={`/${locale}/listing/${item.id}`} style={{ textDecoration:'none' }}>
      <article onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
        style={{ backgroundColor:'white', borderRadius:18, overflow:'hidden', boxShadow:hov?'0 12px 36px rgba(0,0,0,0.1)':'0 2px 8px rgba(0,0,0,0.05)', border:`1px solid ${hov?C.mint:'rgba(0,0,0,0.06)'}`, transition:'all 0.3s', display:'flex', cursor:'pointer', marginBottom:14 }}>
        <div style={{ position:'relative', width:260, flexShrink:0, overflow:'hidden' }}>
          <img src={item.image} alt={item.title} style={{ width:'100%', height:'100%', objectFit:'cover', transition:'transform 0.5s', transform:hov?'scale(1.04)':'scale(1)' }} />
          <div style={{ position:'absolute', top:10, left:10 }}>
            <span style={{ backgroundColor:C.mint, color:'white', fontSize:'9px', fontWeight:800, padding:'3px 10px', borderRadius:100, textTransform:'uppercase' }}>{item.badge}</span>
          </div>
          <div style={{ position:'absolute', bottom:10, left:10, background:`linear-gradient(135deg,${C.mint},${C.mintDk})`, padding:'5px 12px', borderRadius:8, display:'flex', alignItems:'center', gap:4 }}>
            <TrendingUp size={12} color="white"/>
            <span style={{ color:'white', fontSize:'12px', fontWeight:900 }}>{item.yield_pct}% yield</span>
          </div>
        </div>
        <div style={{ padding:'20px 24px', flex:1, display:'flex', flexDirection:'column', justifyContent:'space-between' }}>
          <div>
            <p style={{ fontSize:11, color:C.mint, fontWeight:800, textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:4 }}>{item.type}</p>
            <h3 style={{ ...CB, fontSize:'16px', color:hov?C.mint:C.ink, marginBottom:5, transition:'color 0.2s' }}>{item.title}</h3>
            <div style={{ display:'flex', alignItems:'center', gap:5, marginBottom:10 }}>
              <MapPin size={12} color={C.muted}/><span style={{ fontSize:'12px', color:C.muted, fontWeight:600 }}>{item.location}</span>
            </div>
            <div style={{ display:'flex', gap:16, flexWrap:'wrap' }}>
              <span style={{ fontSize:'12px', color:'#475569', fontWeight:700 }}>📊 {item.occupancy}% occupied</span>
              <span style={{ fontSize:'12px', color:'#10b981', fontWeight:700 }}>💰 {item.income}</span>
              {item.tenanted && <span style={{ fontSize:'12px', color:'#7c3aed', fontWeight:700 }}>✅ Tenanted</span>}
            </div>
          </div>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', paddingTop:14, borderTop:'1px solid #f1f5f9', marginTop:12 }}>
            <div>
              <p style={{ fontSize:11, color:C.muted, marginBottom:2 }}>Asking Price</p>
              <span style={{ ...CB, fontSize:'20px', color:C.mint }}>{item.price} MAD</span>
            </div>
            <div style={{ display:'flex', gap:8 }}>
              <button onClick={e=>e.preventDefault()} style={{ padding:'9px 18px', borderRadius:100, backgroundColor:C.surface, color:C.ink, border:'none', fontSize:'12px', fontWeight:700, cursor:'pointer', fontFamily:"'Inter',sans-serif" }}>Info Pack</button>
              <button onClick={e=>e.preventDefault()} style={{ padding:'9px 20px', borderRadius:100, backgroundColor:C.mint, color:'white', border:'none', fontSize:'12px', fontWeight:700, cursor:'pointer', fontFamily:"'Inter',sans-serif", display:'flex', alignItems:'center', gap:5 }}><Phone size={12}/>Contact</button>
            </div>
          </div>
        </div>
      </article>
    </Link>
  )

  return (
    <Link href={`/${locale}/listing/${item.id}`} style={{ textDecoration:'none' }}>
      <article onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
        style={{ backgroundColor:'white', borderRadius:24, overflow:'hidden', boxShadow:hov?'0 20px 48px rgba(0,0,0,0.12)':'0 2px 12px rgba(0,0,0,0.06)', border:`1px solid ${hov?C.mint:'rgba(0,0,0,0.06)'}`, transition:'all 0.3s', cursor:'pointer', display:'flex', flexDirection:'column' }}>
        <div style={{ position:'relative', aspectRatio:'16/10', overflow:'hidden' }}>
          <img src={item.image} alt={item.title} style={{ width:'100%', height:'100%', objectFit:'cover', transition:'transform 0.6s', transform:hov?'scale(1.06)':'scale(1)' }} />
          <div style={{ position:'absolute', top:12, left:12 }}>
            <span style={{ backgroundColor:C.mint, color:'white', fontSize:'9px', fontWeight:800, padding:'4px 10px', borderRadius:100, textTransform:'uppercase' }}>{item.badge}</span>
          </div>
          <button onClick={e=>{e.preventDefault();setSaved(!saved)}} style={{ position:'absolute', top:12, right:12, width:34, height:34, borderRadius:'50%', backgroundColor:'rgba(255,255,255,0.9)', border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}>
            <Heart size={16} fill={saved?'#ef4444':'none'} color={saved?'#ef4444':'#6b7a76'}/>
          </button>
          <div style={{ position:'absolute', bottom:12, left:12, background:`linear-gradient(135deg,${C.mint},${C.mintDk})`, padding:'5px 12px', borderRadius:8, display:'flex', alignItems:'center', gap:4 }}>
            <TrendingUp size={12} color="white"/>
            <span style={{ color:'white', fontSize:'12px', fontWeight:900 }}>{item.yield_pct}% yield</span>
          </div>
          <div style={{ position:'absolute', bottom:12, right:12, backgroundColor:'rgba(22,29,27,0.8)', backdropFilter:'blur(8px)', padding:'4px 10px', borderRadius:7 }}>
            <span style={{ color:'white', fontSize:'11px', fontWeight:700 }}>{item.type}</span>
          </div>
        </div>
        <div style={{ padding:'16px 18px', flex:1, display:'flex', flexDirection:'column' }}>
          <h3 style={{ ...CB, fontSize:'14px', color:hov?C.mint:C.ink, marginBottom:5, lineHeight:1.3, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap', transition:'color 0.2s' }}>{item.title}</h3>
          <div style={{ display:'flex', alignItems:'center', gap:5, marginBottom:8 }}>
            <MapPin size={11} color={C.muted}/><span style={{ fontSize:'11px', color:C.muted, fontWeight:600 }}>{item.location}</span>
          </div>
          <div style={{ display:'flex', gap:10, marginBottom:10, paddingTop:8, borderTop:'1px solid #f1f5f9', flexWrap:'wrap' }}>
            <span style={{ fontSize:'11px', color:'#475569', fontWeight:700 }}>📊 {item.occupancy}%</span>
            <span style={{ fontSize:'11px', color:'#10b981', fontWeight:700 }}>💰 {item.income}</span>
            {item.tenanted && <span style={{ fontSize:'11px', color:'#7c3aed', fontWeight:700 }}>✅ Tenanted</span>}
          </div>
          <div style={{ marginTop:'auto', paddingTop:8, borderTop:'1px solid #f1f5f9', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
            <div>
              <p style={{ fontSize:10, color:C.muted, marginBottom:1 }}>Asking Price</p>
              <span style={{ ...CB, fontSize:'16px', color:C.mint }}>{item.price} MAD</span>
            </div>
            <button onClick={e=>e.preventDefault()} style={{ padding:'8px 14px', borderRadius:100, backgroundColor:C.ink, color:'white', border:'none', fontSize:'11px', fontWeight:700, cursor:'pointer', transition:'background 0.2s', fontFamily:"'Inter',sans-serif" }}
              onMouseEnter={e=>e.currentTarget.style.backgroundColor=C.mint}
              onMouseLeave={e=>e.currentTarget.style.backgroundColor=C.ink}>
              <Phone size={11}/>
            </button>
          </div>
        </div>
      </article>
    </Link>
  )
}

export default function BusinessInvestmentPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale }             = React.use(params)
  const [assetType, setAssetType] = useState<AssetType>('all')
  const [yieldRange,setYieldRange] = useState<YieldRange>('all')
  const [tenanted,  setTenanted ] = useState(false)
  const [city,      setCity     ] = useState('All Morocco')
  const [minPrice,  setMinPrice ] = useState('')
  const [maxPrice,  setMaxPrice ] = useState('')
  const [view,      setView     ] = useState<'grid'|'list'>('grid')
  const [sort,      setSort     ] = useState<'Highest Yield'|'Price Low'|'Price High'|'Occupancy'>('Highest Yield')
  const [hovCat,    setHovCat   ] = useState<string|null>(null)
  const [page,      setPage     ] = useState(1)
  const [keyword,   setKeyword  ] = useState('')

  const cities = ['All Morocco','Casablanca','Rabat','Marrakech','Tangier','Agadir','Fès','Meknès']

  const { fetchListings } = useListings()
  const [dbListings, setDbListings] = useState<any[]>([])
  useEffect(() => {
    const t = setTimeout(() => {
      fetchListings({ category: 'property', sortBy: 'newest', limit: 24 }).then(rows => setDbListings(rows || []))
    }, 400)
    return () => clearTimeout(t)
  }, [])
  function mapDbRowToCard(row: any) {
    return {
      id: row.id,
      title: row.title,
      type: row.subcategory || 'Residential',
      price: Math.round((row.price || 0) / 100).toLocaleString(),
      yield_pct: 0,
      occupancy: 0,
      location: row.city,
      tenanted: false,
      badge: row.badge || 'Verified',
      image: (row.images && row.images[0]) || LISTINGS[0].image,
      income: '—',
    }
  }
  const hasRealData = dbListings.length > 0
  const sourceListings = hasRealData ? dbListings.map(mapDbRowToCard) : LISTINGS
  const filtered = sourceListings.filter(l => {
    if (assetType !== 'all' && !l.type.toLowerCase().includes(assetType.replace('-',' ').split('-')[0])) return false
    if (yieldRange === '4-6' && (l.yield_pct < 4 || l.yield_pct > 6)) return false
    if (yieldRange === '6-8' && (l.yield_pct < 6 || l.yield_pct > 8)) return false
    if (yieldRange === '8+' && l.yield_pct < 8) return false
    if (tenanted && !l.tenanted) return false
    if (keyword.trim() && !l.title.toLowerCase().includes(keyword.toLowerCase()) && !l.location.toLowerCase().includes(keyword.toLowerCase())) return false
    if (city && city !== 'All Morocco' && !l.location.toLowerCase().includes(city.toLowerCase())) return false
    const priceNum = Number(String(l.price).replace(/,/g, ''))
    if (minPrice.trim() && priceNum < Number(minPrice)) return false
    if (maxPrice.trim() && priceNum > Number(maxPrice)) return false
    return true
  }).sort((a, b) => {
    if (sort === 'Price Low') return Number(String(a.price).replace(/,/g,'')) - Number(String(b.price).replace(/,/g,''))
    if (sort === 'Price High') return Number(String(b.price).replace(/,/g,'')) - Number(String(a.price).replace(/,/g,''))
    if (sort === 'Occupancy') return b.occupancy - a.occupancy
    return b.yield_pct - a.yield_pct // Highest Yield (default)
  })

  const stats = [
    { icon:<TrendingUp size={22} color={C.mint}/>, value:'7.2%',  label:'Avg. Rental Yield' },
    { icon:<Building size={22} color={C.mint}/>,   value:'568',   label:'Investment Assets'  },
    { icon:<DollarSign size={22} color={C.mint}/>, value:'12',    label:'Cities Covered'     },
    { icon:<Shield size={22} color={C.mint}/>,     value:'89%',   label:'Avg. Occupancy Rate'},
  ]

  return (
    <div style={{ fontFamily:"'Inter',sans-serif", backgroundColor:C.surface, minHeight:'100vh' }}>

      {/* CINEMATIC HERO */}
      <section style={{ position:'relative', height:560, overflow:'hidden', display:'flex', alignItems:'center', justifyContent:'center' }}>
        <img src="https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg?auto=compress&w=1600" alt="Business Investment Morocco"
          style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover' }} />
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top, rgba(15,23,42,0.96) 0%, rgba(15,23,42,0.5) 55%, rgba(15,23,42,0.2) 100%)' }} />
        <div style={{ position:'relative', zIndex:10, textAlign:'center', padding:'0 24px', maxWidth:820, width:'100%' }}>
          <div style={{ display:'inline-flex', alignItems:'center', gap:8, backgroundColor:'rgba(34,212,168,0.15)', border:'1px solid rgba(34,212,168,0.4)', borderRadius:100, padding:'7px 20px', marginBottom:22 }}>
            <TrendingUp size={13} color={C.mint}/>
            <span style={{ fontSize:11, fontWeight:800, color:C.mint, textTransform:'uppercase', letterSpacing:'0.16em' }}>SouKni Business Investment · Morocco</span>
          </div>
          <h1 style={{ ...UB, fontSize:'clamp(36px,6vw,70px)', color:'white', lineHeight:0.92, marginBottom:18, textTransform:'uppercase' }}>
            YOUR MONEY.<br/><span style={{ color:C.mint }}>WORKING</span><br/>IN MOROCCO.
          </h1>
          <p style={{ fontSize:17, color:'rgba(255,255,255,0.7)', marginBottom:36, maxWidth:560, margin:'0 auto 36px', lineHeight:1.65 }}>
            Hotels, retail strips, office buildings &amp; industrial assets — 568 income-generating properties with verified yields
          </p>
          <div style={{ display:'flex', alignItems:'stretch', backgroundColor:'rgba(255,255,255,0.12)', backdropFilter:'blur(24px)', border:'1px solid rgba(255,255,255,0.25)', borderRadius:100, overflow:'hidden', maxWidth:700, margin:'0 auto', boxShadow:'0 8px 32px rgba(0,0,0,0.25)' }}>
            <div style={{ display:'flex', flexDirection:'column', padding:'14px 22px', flex:'0 0 155px', borderRight:'1px solid rgba(255,255,255,0.15)', gap:2 }}>
              <span style={{ fontSize:9, fontWeight:800, color:'rgba(255,255,255,0.5)', textTransform:'uppercase', letterSpacing:'0.12em' }}>City</span>
              <select value={city} onChange={e=>setCity(e.target.value)} style={{ backgroundColor:'transparent', border:'none', outline:'none', fontSize:14, fontWeight:700, color:'white', fontFamily:"'Inter',sans-serif", cursor:'pointer' }}>
                {cities.map(c=><option key={c} style={{ color:C.ink }}>{c}</option>)}
              </select>
            </div>
            <div style={{ display:'flex', flexDirection:'column', padding:'14px 22px', flex:'0 0 145px', borderRight:'1px solid rgba(255,255,255,0.15)', gap:2 }}>
              <span style={{ fontSize:9, fontWeight:800, color:'rgba(255,255,255,0.5)', textTransform:'uppercase', letterSpacing:'0.12em' }}>Asset Type</span>
              <select value={assetType} onChange={e=>setAssetType(e.target.value as AssetType)} style={{ backgroundColor:'transparent', border:'none', outline:'none', fontSize:14, fontWeight:700, color:'white', fontFamily:"'Inter',sans-serif", cursor:'pointer' }}>
                {['all','hotel-assets','retail-strips','office-buildings','residential-blocks','industrial-assets'].map(t=><option key={t} value={t} style={{ color:C.ink }}>{t==='all'?'All Assets':t.split('-').map(w=>w[0].toUpperCase()+w.slice(1)).join(' ')}</option>)}
              </select>
            </div>
            <div style={{ display:'flex', flexDirection:'column', padding:'14px 22px', flex:1, borderRight:'1px solid rgba(255,255,255,0.15)', gap:2 }}>
              <span style={{ fontSize:9, fontWeight:800, color:'rgba(255,255,255,0.5)', textTransform:'uppercase', letterSpacing:'0.12em' }}>Keyword</span>
              <input value={keyword} onChange={e=>setKeyword(e.target.value)} placeholder="Hotel, retail, logistics..." style={{ backgroundColor:'transparent', border:'none', outline:'none', fontSize:14, fontWeight:600, color:'white', fontFamily:"'Inter',sans-serif", padding:0 }} />
            </div>
            <button style={{ backgroundColor:C.mint, color:'white', border:'none', padding:'0 28px', fontWeight:800, fontSize:14, cursor:'pointer', flexShrink:0, transition:'background 0.15s', display:'flex', alignItems:'center', gap:8 }}
              onMouseEnter={e=>e.currentTarget.style.backgroundColor=C.mintDk}
              onMouseLeave={e=>e.currentTarget.style.backgroundColor=C.mint}>
              <Search size={16}/> Search
            </button>
          </div>
        </div>
      </section>

      {/* FILTER HUB — 2 rows */}
      <div style={{ maxWidth:1440, margin:'-26px auto 0', padding:'0 40px', position:'relative', zIndex:30 }}>
        <div style={{ backgroundColor:'rgba(255,255,255,0.97)', backdropFilter:'blur(20px)', borderRadius:32, boxShadow:'0 8px 40px rgba(0,0,0,0.10)', border:'1px solid rgba(255,255,255,0.7)', overflow:'hidden' }}>
          {/* Row 1 */}
          <div style={{ display:'flex', alignItems:'center', borderBottom:'1px solid rgba(186,202,197,0.2)' }}>
            {[
              { label:'City',            content:<select value={city} onChange={e=>setCity(e.target.value)} style={{ border:'none', outline:'none', fontSize:14, fontWeight:700, color:C.ink, backgroundColor:'transparent', cursor:'pointer', fontFamily:"'Inter',sans-serif" }}>{cities.map(c=><option key={c}>{c}</option>)}</select> },
              { label:'Asset Type',      content:<select value={assetType} onChange={e=>setAssetType(e.target.value as AssetType)} style={{ border:'none', outline:'none', fontSize:14, fontWeight:700, color:C.ink, backgroundColor:'transparent', cursor:'pointer', fontFamily:"'Inter',sans-serif" }}>{['all','hotel-assets','retail-strips','office-buildings','residential-blocks','industrial-assets'].map(t=><option key={t} value={t}>{t==='all'?'All Asset Types':t.split('-').map(w=>w[0].toUpperCase()+w.slice(1)).join(' ')}</option>)}</select> },
              { label:'Min Price (MAD)', content:<input type="number" value={minPrice} onChange={e=>setMinPrice(e.target.value)} placeholder="Any" style={{ border:'none', outline:'none', fontSize:14, fontWeight:700, color:C.ink, backgroundColor:'transparent', fontFamily:"'Inter',sans-serif", width:90 }} /> },
              { label:'Max Price (MAD)', content:<input type="number" value={maxPrice} onChange={e=>setMaxPrice(e.target.value)} placeholder="Any" style={{ border:'none', outline:'none', fontSize:14, fontWeight:700, color:C.ink, backgroundColor:'transparent', fontFamily:"'Inter',sans-serif", width:90 }} /> },
              { label:'Min Yield (%)',   content:<select style={{ border:'none', outline:'none', fontSize:14, fontWeight:700, color:C.ink, backgroundColor:'transparent', cursor:'pointer', fontFamily:"'Inter',sans-serif" }}>{['Any','4%+','5%+','6%+','7%+','8%+','9%+'].map(y=><option key={y}>{y}</option>)}</select> },
            ].map((f,i,arr)=>(
              <div key={f.label} style={{ flex:1, padding:'12px 20px', borderRight:i<arr.length-1?'1px solid rgba(186,202,197,0.2)':'none', display:'flex', flexDirection:'column', gap:2 }}>
                <span style={{ fontSize:9, textTransform:'uppercase', fontWeight:800, color:C.muted, letterSpacing:'0.1em' }}>{f.label}</span>
                {f.content}
              </div>
            ))}
            <div style={{ padding:'8px 12px', flexShrink:0 }}>
              <button style={{ backgroundColor:C.mint, color:'white', border:'none', padding:'13px 28px', borderRadius:100, cursor:'pointer', fontWeight:800, fontSize:14, display:'flex', alignItems:'center', gap:7, whiteSpace:'nowrap' }}
                onMouseEnter={e=>e.currentTarget.style.backgroundColor=C.mintDk}
                onMouseLeave={e=>e.currentTarget.style.backgroundColor=C.mint}>
                <Search size={15}/> SEARCH
              </button>
            </div>
          </div>
          {/* Row 2 */}
          <div style={{ display:'flex', alignItems:'center', gap:8, padding:'10px 20px', flexWrap:'wrap' }}>
            <span style={{ fontSize:10, fontWeight:800, color:C.muted, textTransform:'uppercase', letterSpacing:'0.1em', flexShrink:0 }}>Yield Range:</span>
            {([
              { key:'all', label:'Any Yield' },
              { key:'4-6', label:'4–6%' },
              { key:'6-8', label:'6–8%' },
              { key:'8+',  label:'8%+' },
            ] as const).map(y=>(
              <button key={y.key} onClick={()=>setYieldRange(y.key)}
                style={{ padding:'7px 18px', borderRadius:100, border:`1.5px solid ${yieldRange===y.key?C.mint:'rgba(186,202,197,0.4)'}`, backgroundColor:yieldRange===y.key?C.mint:'white', color:yieldRange===y.key?'white':C.muted, cursor:'pointer', fontSize:12, fontWeight:700, transition:'all 0.2s', whiteSpace:'nowrap', fontFamily:"'Inter',sans-serif" }}>
                {y.label}
              </button>
            ))}
            <div style={{ width:1, height:20, backgroundColor:'rgba(186,202,197,0.4)', margin:'0 4px' }} />
            <button onClick={()=>setTenanted(!tenanted)}
              style={{ padding:'7px 18px', borderRadius:100, border:`1.5px solid ${tenanted?'#7c3aed':'rgba(186,202,197,0.4)'}`, backgroundColor:tenanted?'#f5f3ff':'white', color:tenanted?'#7c3aed':C.muted, cursor:'pointer', fontSize:12, fontWeight:700, transition:'all 0.2s', whiteSpace:'nowrap', fontFamily:"'Inter',sans-serif" }}>
              ✅ Tenanted Only
            </button>
          </div>
        </div>
      </div>

      <div style={{ maxWidth:1440, margin:'48px auto 0', padding:'0 40px 80px' }}>

        {/* BREADCRUMB */}
        <Breadcrumb
          items={[
            { label:'Home', href:`/${locale}` },
            { label:'Property', href:`/${locale}/property` },
            { label:'Business Investment' },
          ]}
          mutedColor={C.muted}
          inkColor={C.ink}
          style={{ fontSize:11, marginBottom:32 }}
        />

        {/* STATS */}
        <section style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:16, marginBottom:56 }}>
          {stats.map(s=>(
            <div key={s.label} style={{ backgroundColor:'white', borderRadius:20, padding:'20px 22px', border:'1px solid rgba(186,202,197,0.2)', boxShadow:'0 2px 8px rgba(0,0,0,0.04)', display:'flex', alignItems:'center', gap:14 }}>
              <div style={{ width:46, height:46, borderRadius:14, backgroundColor:`${C.mint}15`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>{s.icon}</div>
              <div>
                <p style={{ ...UB, fontSize:22, color:C.ink, marginBottom:2 }}>{s.value}</p>
                <p style={{ fontSize:12, color:C.muted, fontWeight:600 }}>{s.label}</p>
              </div>
            </div>
          ))}
        </section>

        {/* ASSET TYPE GRID */}
        <section style={{ marginBottom:64 }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:24 }}>
            <h2 style={{ ...UB, fontSize:30, color:C.ink }}>Browse by Asset Type</h2>
            <span style={{ fontSize:14, color:C.muted }}>568 income-generating assets</span>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:16 }}>
            {INVEST_CATS.map(cat=>(
              <Link key={cat.slug} href={`/${locale}/property/commercial/${cat.slug.replace('-assets','').replace('-strips','').replace('-buildings','').replace('-blocks','').replace('-portfolios','mixed-use')}`} style={{ textDecoration:'none' }}>
                <div onMouseEnter={()=>setHovCat(cat.slug)} onMouseLeave={()=>setHovCat(null)}
                  style={{ position:'relative', borderRadius:22, overflow:'hidden', cursor:'pointer', transition:'transform 0.2s, box-shadow 0.2s', transform:hovCat===cat.slug?'scale(1.02)':'scale(1)', boxShadow:hovCat===cat.slug?'0 20px 48px rgba(0,0,0,0.18)':'0 4px 12px rgba(0,0,0,0.08)' }}>
                  <div style={{ aspectRatio:'4/3', overflow:'hidden' }}>
                    <img src={cat.image} alt={cat.label} style={{ width:'100%', height:'100%', objectFit:'cover', transition:'transform 0.5s', transform:hovCat===cat.slug?'scale(1.08)':'scale(1)' }} />
                  </div>
                  <div style={{ position:'absolute', inset:0, background:hovCat===cat.slug?'linear-gradient(to top,rgba(34,212,168,0.82),rgba(0,0,0,0.05))':'linear-gradient(to top,rgba(15,23,42,0.82),rgba(0,0,0,0.05))' }} />
                  <div style={{ position:'absolute', top:12, right:12, background:`linear-gradient(135deg,${C.mint},${C.mintDk})`, padding:'4px 10px', borderRadius:8, display:'flex', alignItems:'center', gap:4 }}>
                    <TrendingUp size={10} color="white"/>
                    <span style={{ color:'white', fontSize:'10px', fontWeight:800 }}>{cat.yield}</span>
                  </div>
                  <div style={{ position:'absolute', top:12, left:12, fontSize:22 }}>{cat.emoji}</div>
                  <div style={{ position:'absolute', bottom:0, left:0, right:0, padding:'14px 16px' }}>
                    <p style={{ ...UB, fontSize:14, color:'white', marginBottom:2 }}>{cat.label}</p>
                    <p style={{ fontSize:11, color:'rgba(255,255,255,0.7)', fontWeight:600 }}>{cat.count} assets · {cat.desc}</p>
                  </div>
                </div>
              </Link>
            ))}
            <Link href={`/${locale}/property/commercial`} style={{ textDecoration:'none' }}>
              <div onMouseEnter={()=>setHovCat('more')} onMouseLeave={()=>setHovCat(null)}
                style={{ borderRadius:22, overflow:'hidden', aspectRatio:'4/3', cursor:'pointer', transition:'transform 0.2s, box-shadow 0.2s', transform:hovCat==='more'?'scale(1.02)':'scale(1)', boxShadow:hovCat==='more'?'0 20px 48px rgba(0,0,0,0.18)':'0 4px 12px rgba(0,0,0,0.08)', background:hovCat==='more'?`linear-gradient(135deg,${C.mint},${C.mintDk})`:C.ink, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:8 }}>
                <ChevronRight size={28} color="white"/>
                <p style={{ ...UB, fontSize:15, color:'white' }}>View More</p>
                <p style={{ fontSize:11, color:'rgba(255,255,255,0.6)', fontWeight:600 }}>All commercial</p>
              </div>
            </Link>
          </div>
        </section>

        {/* TOP INVESTMENT ZONES */}
        <section style={{ marginBottom:64 }}>
          <div style={{ background:`linear-gradient(135deg,${C.ink},#2b3230)`, borderRadius:32, padding:'40px 48px', display:'flex', alignItems:'center', gap:40, flexWrap:'wrap' }}>
            <div style={{ flex:1, minWidth:260 }}>
              <span style={{ display:'inline-block', backgroundColor:`${C.mint}20`, color:C.mint, fontSize:10, fontWeight:800, padding:'5px 16px', borderRadius:100, textTransform:'uppercase', letterSpacing:'0.12em', marginBottom:14 }}>📊 Top Investment Zones</span>
              <h2 style={{ ...UB, fontSize:'clamp(22px,3vw,34px)', color:'white', marginBottom:10, lineHeight:1.05 }}>Where the best<br/>yields are in Morocco</h2>
              <p style={{ fontSize:14, color:'rgba(255,255,255,0.55)', lineHeight:1.7 }}>Data updated quarterly — based on verified rental income and market transactions.</p>
            </div>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:12 }}>
              {ZONES.map(z=>(
                <div key={z.zone} style={{ backgroundColor:'rgba(255,255,255,0.07)', borderRadius:16, overflow:'hidden', border:'1px solid rgba(255,255,255,0.1)', cursor:'pointer', transition:'all 0.2s' }}
                  onMouseEnter={e=>{e.currentTarget.style.backgroundColor='rgba(34,212,168,0.12)';e.currentTarget.style.borderColor=`${C.mint}40`}}
                  onMouseLeave={e=>{e.currentTarget.style.backgroundColor='rgba(255,255,255,0.07)';e.currentTarget.style.borderColor='rgba(255,255,255,0.1)'}}>
                  <img src={z.image} alt={z.zone} style={{ width:'100%', height:70, objectFit:'cover', opacity:0.7 }} />
                  <div style={{ padding:'12px 14px' }}>
                    <p style={{ fontSize:12, fontWeight:800, color:'white', marginBottom:3 }}>{z.zone}</p>
                    <p style={{ fontSize:10, color:'rgba(255,255,255,0.5)', marginBottom:4 }}>Best: {z.bestType}</p>
                    <p style={{ fontSize:20, fontWeight:900, color:C.mint, fontFamily:"'Inter',sans-serif" }}>{z.avgYield}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* LISTINGS */}
        <section style={{ marginBottom:64 }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:20, flexWrap:'wrap', gap:12 }}>
            <div>
              <h2 style={{ ...UB, fontSize:28, color:C.ink, marginBottom:4 }}>Investment Assets for Sale</h2>
              <p style={{ fontSize:14, color:C.mint, fontWeight:700 }}>{filtered.length} assets · {yieldRange!=='all'?yieldRange+'% yield range':'All yields'}{tenanted?' · Tenanted only':''}</p>
            </div>
            <div style={{ display:'flex', alignItems:'center', gap:10 }}>
              <div style={{ display:'flex', gap:4, padding:'4px', backgroundColor:'#f4f4f4', borderRadius:100 }}>
                {(['Highest Yield','Price Low','Price High','Occupancy'] as const).map(s=>(
                  <button key={s} onClick={()=>setSort(s)} style={{ padding:'7px 12px', borderRadius:100, fontSize:10, fontWeight:800, border:'none', cursor:'pointer', fontFamily:"'Inter',sans-serif", transition:'all 0.2s', backgroundColor:sort===s?C.ink:'transparent', color:sort===s?'white':C.muted }}>{s}</button>
                ))}
              </div>
              <div style={{ display:'flex', gap:2, padding:'3px', backgroundColor:'white', borderRadius:10, border:'1px solid rgba(186,202,197,0.3)' }}>
                <button onClick={()=>setView('grid')} style={{ width:34, height:34, borderRadius:8, border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', backgroundColor:view==='grid'?C.ink:'transparent', transition:'all 0.2s' }}>
                  <LayoutGrid size={15} color={view==='grid'?'white':C.muted}/>
                </button>
                <button onClick={()=>setView('list')} style={{ width:34, height:34, borderRadius:8, border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', backgroundColor:view==='list'?C.ink:'transparent', transition:'all 0.2s' }}>
                  <List size={15} color={view==='list'?'white':C.muted}/>
                </button>
              </div>
            </div>
          </div>
          {filtered.length > 0 ? (
            view === 'grid' ? (
              <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:24, marginBottom:48 }}>
                {filtered.map(item => <InvestCard key={item.id} item={item} locale={locale} view="grid" />)}
              </div>
            ) : (
              <div style={{ marginBottom:48 }}>
                {filtered.map(item => <InvestCard key={item.id} item={item} locale={locale} view="list" />)}
              </div>
            )
          ) : (
            <div style={{ textAlign:'center', padding:'80px 0' }}>
              <span style={{ fontSize:48, display:'block', marginBottom:16 }}>📊</span>
              <p style={{ fontSize:18, fontWeight:700, color:C.muted, marginBottom:16 }}>No assets match your filters.</p>
              <button onClick={()=>{ setYieldRange('all'); setTenanted(false); setAssetType('all') }}
                style={{ padding:'12px 28px', borderRadius:100, backgroundColor:C.mint, color:'white', border:'none', fontSize:14, fontWeight:700, cursor:'pointer' }}>Clear Filters</button>
            </div>
          )}
        </section>

        {/* TRENDING */}
        <section style={{ marginBottom:64 }}>
          <h2 style={{ ...UB, fontSize:22, color:C.ink, marginBottom:20 }}>Trending Investment Searches</h2>
          <div style={{ display:'flex', gap:10, flexWrap:'wrap' }}>
            {['Hotel Investment Marrakech','Retail Strip Casablanca','Office Building Rabat','Logistics Hub Tanger','Riad Income Fès','Residential Block Agadir','Mixed Portfolio Morocco','High Yield Industrial','Fully Tenanted Asset','8%+ Yield Property','Commercial Income Asset','Boutique Hotel Investment'].map(tag=>(
              <span key={tag} style={{ display:'inline-block', padding:'9px 18px', borderRadius:100, fontSize:13, fontWeight:700, backgroundColor:'white', color:C.ink, border:'1px solid rgba(186,202,197,0.4)', cursor:'pointer', transition:'all 0.15s' }}
                onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.backgroundColor=C.mint;(e.currentTarget as HTMLElement).style.color='white'}}
                onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.backgroundColor='white';(e.currentTarget as HTMLElement).style.color=C.ink}}>
                {tag}
              </span>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section style={{ borderRadius:40, background:`linear-gradient(135deg,${C.mint},${C.mintDk})`, padding:'56px 64px', display:'flex', alignItems:'center', justifyContent:'space-between', gap:40, flexWrap:'wrap', marginBottom:64 }}>
          <div>
            <h2 style={{ ...UB, fontSize:'clamp(24px,4vw,42px)', color:'white', marginBottom:12, lineHeight:1.05 }}>SELLING AN INCOME ASSET?<br/>LIST IT ON SOUKNI.</h2>
            <p style={{ fontSize:15, color:'rgba(255,255,255,0.85)', maxWidth:480, lineHeight:1.7 }}>Reach Morocco's most serious investors — post your income-generating property free in 2 minutes.</p>
            <div style={{ display:'flex', gap:12, marginTop:24 }}>
              <button style={{ backgroundColor:'white', color:C.mint, border:'none', padding:'12px 24px', borderRadius:100, fontWeight:800, fontSize:13, cursor:'pointer' }}>🍎 App Store</button>
              <button style={{ backgroundColor:'rgba(255,255,255,0.15)', color:'white', border:'1px solid rgba(255,255,255,0.4)', padding:'12px 24px', borderRadius:100, fontWeight:800, fontSize:13, cursor:'pointer' }}>▶ Google Play</button>
            </div>
          </div>
          <Link href={`/${locale}/post-ad`} style={{ textDecoration:'none' }}>
            <span style={{ display:'inline-block', backgroundColor:'white', color:C.mint, padding:'18px 40px', borderRadius:100, fontWeight:900, fontSize:15, cursor:'pointer', whiteSpace:'nowrap', ...UB, boxShadow:'0 8px 32px rgba(0,0,0,0.15)' }}>Post Free Ad →</span>
          </Link>
        </section>

        {/* BACK NAV */}
        <div style={{ borderTop:'1px solid rgba(186,202,197,0.3)', paddingTop:40 }}>
          <p style={{ fontSize:12, fontWeight:800, color:C.muted, textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:20, textAlign:'center' }}>Navigate Property</p>
          <div style={{ display:'flex', gap:10, justifyContent:'center', flexWrap:'wrap' }}>
            {[
              { label:'← Commercial',   href:`/${locale}/property/commercial`   },
              { label:'← For Sale',     href:`/${locale}/property/for-sale`     },
              { label:'← Property Hub', href:`/${locale}/property`              },
              { label:'← Home',         href:`/${locale}`                       },
            ].map((b,i)=>(
              <Link key={b.label} href={b.href}
                style={{ padding:'12px 24px', borderRadius:100, textDecoration:'none', fontSize:13, fontWeight:900, fontFamily:"'Inter',sans-serif", transition:'all 0.2s', display:'flex', alignItems:'center', gap:6,
                  backgroundColor: i===3?C.ink:'white', color: i===3?'white':C.ink, border: i===3?'none':'1.5px solid rgba(186,202,197,0.4)' }}
                onMouseEnter={e=>{if(i<3){(e.currentTarget as HTMLElement).style.borderColor=C.mint;(e.currentTarget as HTMLElement).style.color=C.mint}else{(e.currentTarget as HTMLElement).style.backgroundColor=C.mint}}}
                onMouseLeave={e=>{if(i<3){(e.currentTarget as HTMLElement).style.borderColor='rgba(186,202,197,0.4)';(e.currentTarget as HTMLElement).style.color=C.ink}else{(e.currentTarget as HTMLElement).style.backgroundColor=C.ink}}}>
                {b.label}
              </Link>
            ))}
          </div>
        </div>

        <CategoryFooterNav
          backHref={`/${locale}/property`}
          backLabel="Back to All Property"
          inkColor={C.ink}
          mintDkColor={C.mintDk}
        />
      </div>
    </div>
  )
}
