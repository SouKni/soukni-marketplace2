'use client'
import React, { useState, useMemo } from 'react'
import Link from 'next/link'
import { Search, ChevronRight, X } from 'lucide-react'
import { ALL_CITIES } from '@/lib/moroccoLocations'
import { useDictionary } from '@/lib/useDictionary'

const C = { mint:'#22d4a8', mintDk:'#0f9b8e', ink:'#161d1b', surface:'#f4fbf8', muted:'#6b7a76' }
const UB = { fontFamily:"'Inter',sans-serif", fontWeight:900, letterSpacing:'-0.05em' } as const

// categories moved inside component to support translation

const featuredItems = [
  { id:'hg1', title:'Roche Bobois Mah Jong Modular Sofa',  price:28500, location:'Casablanca', image:'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&w=600' },
  { id:'hg2', title:'Jardin de Marrakech Outdoor Set',      price:12000, location:'Marrakech',  image:'https://images.pexels.com/photos/1453499/pexels-photo-1453499.jpeg?auto=compress&w=600' },
  { id:'hg3', title:'Beni Ourain Premium Wool Rug 3x4m',   price:8500,  location:'Rabat',      image:'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&w=600' },
  { id:'hg4', title:'Flos Arco Floor Lamp — Marble Base',  price:9200,  location:'Casablanca', image:'https://images.pexels.com/photos/1090638/pexels-photo-1090638.jpeg?auto=compress&w=600' },
]

export default function HomeGardenPage({ params }: { params: Promise<{ locale:string }> }) {
  const { locale } = React.use(params)
  const t = useDictionary(locale)
  const categories = [
    { slug:'furniture',        label:t.homeGarden.catFurniture,        count:'4,280', emoji:'🛋️',  image:'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&w=600' },
    { slug:'garden-outdoor',   label:t.homeGarden.catGardenOutdoor,    count:'2,140', emoji:'🌿',  image:'https://images.pexels.com/photos/1453499/pexels-photo-1453499.jpeg?auto=compress&w=600' },
    { slug:'home-decor',       label:t.homeGarden.catHomeDecor,        count:'3,920', emoji:'🖼️',  image:'https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg?auto=compress&w=600' },
    { slug:'lighting',         label:t.homeGarden.catLighting,         count:'1,640', emoji:'💡',  image:'https://images.pexels.com/photos/1090638/pexels-photo-1090638.jpeg?auto=compress&w=600' },
    { slug:'bedding-bath',     label:t.homeGarden.catBeddingBath,      count:'2,380', emoji:'🛏️',  image:'https://images.pexels.com/photos/1743229/pexels-photo-1743229.jpeg?auto=compress&w=600' },
    { slug:'kitchen-dining',   label:t.homeGarden.catKitchenDining,    count:'3,150', emoji:'🍽️',  image:'https://images.pexels.com/photos/2062426/pexels-photo-2062426.jpeg?auto=compress&w=600' },
    { slug:'storage-shelving', label:t.homeGarden.catStorageShelving,  count:'1,820', emoji:'📦',  image:'https://images.pexels.com/photos/1148955/pexels-photo-1148955.jpeg?auto=compress&w=600' },
    { slug:'rugs-curtains',    label:t.homeGarden.catRugsCurtains,     count:'2,460', emoji:'🪞',  image:'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&w=600' },
    { slug:'plants-pots',      label:t.homeGarden.catPlantsPots,       count:'1,290', emoji:'🌱',  image:'https://images.pexels.com/photos/1453499/pexels-photo-1453499.jpeg?auto=compress&w=600' },
    { slug:'tools-diy',        label:t.homeGarden.catToolsDiy,         count:'2,840', emoji:'🔨',  image:'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&w=600' },
    { slug:'art-prints',       label:t.homeGarden.catArtPrints,        count:'980',   emoji:'🎨',  image:'https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg?auto=compress&w=600' },
    { slug:'smart-home',       label:t.homeGarden.catSmartHome,        count:'1,560', emoji:'🏠',  image:'https://images.pexels.com/photos/1090638/pexels-photo-1090638.jpeg?auto=compress&w=600' },
  ]
  const [keyword, setKeyword]       = useState('')
  const [city, setCity]             = useState('')
  const [applied, setApplied]       = useState({ city:'', keyword:'' })
  const [price, setPrice]           = useState(t.homeGarden.priceAny)
  const [category, setCategory]     = useState(t.homeGarden.allCategories)
  const [priceOpen, setPriceOpen]   = useState(false)
  const [catOpen, setCatOpen]       = useState(false)
  const [cityOpen, setCityOpen]     = useState(false)
  const [hovCat, setHovCat]         = useState<string|null>(null)
  const [hovItem, setHovItem]       = useState<string|null>(null)

  const PRICES = [t.homeGarden.priceAny,'0–2,000 MAD','2,000–8,000 MAD','8,000–20,000 MAD','20,000+ MAD']
  const CAT_OPTIONS = [t.homeGarden.allCategories,...categories.map(c=>c.label)]

  function applySearch() {
    setApplied({ city, keyword })
    setPriceOpen(false)
    setCatOpen(false)
  }

  const filteredFeatured = useMemo(() => {
    return featuredItems.filter(item => {
      const mc = !applied.city    || item.location.toLowerCase().includes(applied.city.toLowerCase())
      const mk = !applied.keyword || item.title.toLowerCase().includes(applied.keyword.toLowerCase())
      const mp = price === t.homeGarden.priceAny ? true
               : price === '0–2,000 MAD'     ? item.price <= 2000
               : price === '2,000–8,000 MAD'  ? item.price > 2000  && item.price <= 8000
               : price === '8,000–20,000 MAD' ? item.price > 8000  && item.price <= 20000
               : item.price > 20000
      return mc && mk && mp
    })
  }, [applied, price])

  const filteredCategories = useMemo(() => {
    if (!applied.keyword && category === t.homeGarden.allCategories) return categories
    return categories.filter(cat =>
      (category === t.homeGarden.allCategories || cat.label === category) &&
      (!applied.keyword || cat.label.toLowerCase().includes(applied.keyword.toLowerCase()))
    )
  }, [applied.keyword, category])

  return (
    <div style={{ fontFamily:"'Inter',sans-serif", backgroundColor:C.surface, minHeight:'100vh' }}>

      {/* CINEMATIC HERO */}
      <section style={{ position:'relative', height:520, overflow:'hidden', display:'flex', alignItems:'center', justifyContent:'center' }}>
        <img src="https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&w=1600" alt="Home & Garden"
          style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover' }} />
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top,rgba(15,23,42,0.88),rgba(15,23,42,0.32))' }} />
        <div style={{ position:'relative', zIndex:10, textAlign:'center', padding:'0 24px', maxWidth:760, width:'100%' }}>
          <p style={{ fontSize:11, fontWeight:800, color:C.mint, textTransform:'uppercase' as const, letterSpacing:'0.2em', marginBottom:16 }}>{t.homeGarden.badge}</p>
          <h1 style={{ ...UB, fontSize:'clamp(36px,6vw,68px)', color:'white', lineHeight:1.0, marginBottom:20, textTransform:'uppercase' as const }}>
            {t.homeGarden.heroLine1}<br />{t.homeGarden.heroLine2}<br />{t.homeGarden.heroLine3}
          </h1>
          <p style={{ fontSize:16, color:'rgba(255,255,255,0.75)', marginBottom:32, maxWidth:520, margin:'0 auto 32px' }}>
            {t.homeGarden.heroSubtitle}
          </p>
          {/* 3-section glassmorphic search */}
          <div style={{ display:'flex', alignItems:'stretch', backgroundColor:'rgba(255,255,255,0.12)', backdropFilter:'blur(24px)', border:'1px solid rgba(255,255,255,0.25)', borderRadius:100, overflow:'hidden', maxWidth:680, margin:'0 auto', boxShadow:'0 8px 32px rgba(0,0,0,0.2)' }}>
            <div style={{ display:'flex', flexDirection:'column' as const, padding:'14px 22px', flex:'0 0 160px', borderRight:'1px solid rgba(255,255,255,0.2)', gap:2 }}>
              <span style={{ fontSize:9, fontWeight:800, color:'rgba(255,255,255,0.55)', textTransform:'uppercase' as const, letterSpacing:'0.12em' }}>{t.common.city}</span>
              <input value={city} onChange={e=>setCity(e.target.value)} onKeyDown={e=>e.key==='Enter'&&applySearch()} placeholder="Rabat" autoComplete="off" style={{ backgroundColor:'transparent', border:'none', outline:'none', fontSize:14, fontWeight:600, color:'white', fontFamily:"'Inter',sans-serif", padding:0, width:'100%' }} />
            </div>
            <div style={{ display:'flex', flexDirection:'column' as const, padding:'14px 22px', flex:1, borderRight:'1px solid rgba(255,255,255,0.2)', gap:2 }}>
              <span style={{ fontSize:9, fontWeight:800, color:'rgba(255,255,255,0.55)', textTransform:'uppercase' as const, letterSpacing:'0.12em' }}>{t.common.keyword}</span>
              <div style={{ display:'flex', alignItems:'center', gap:6, flex:1 }}>
                <input value={keyword} onChange={e=>setKeyword(e.target.value)} onKeyDown={e=>e.key==='Enter'&&applySearch()} placeholder={t.homeGarden.keywordPlaceholder} autoComplete="off" style={{ backgroundColor:'transparent', border:'none', outline:'none', fontSize:14, fontWeight:600, color:'white', fontFamily:"'Inter',sans-serif", padding:0, flex:1 }} />
                {keyword && <button onClick={()=>setKeyword('')} style={{ background:'none', border:'none', cursor:'pointer', color:'rgba(255,255,255,0.6)', display:'flex' }}><X size={13}/></button>}
              </div>
            </div>
            <button onClick={applySearch} style={{ backgroundColor:C.mint, color:'white', border:'none', padding:'0 32px', fontWeight:800, fontSize:14, cursor:'pointer', flexShrink:0, transition:'background 0.15s', display:'flex', alignItems:'center', gap:8 }}
              onMouseEnter={e=>e.currentTarget.style.backgroundColor=C.mintDk}
              onMouseLeave={e=>e.currentTarget.style.backgroundColor=C.mint}>
              <Search size={16} /> {t.common.search}
            </button>
          </div>
        </div>
      </section>

      {/* ADVANCED FILTER BAR */}
      <div style={{ maxWidth:1440, margin:'-26px auto 0', padding:'0 40px', position:'relative', zIndex:30 }}>
        <div style={{ backgroundColor:'rgba(255,255,255,0.95)', backdropFilter:'blur(20px)', borderRadius:100, padding:'8px 8px 8px 0', boxShadow:'0 8px 40px rgba(0,0,0,0.10)', border:'1px solid rgba(255,255,255,0.7)', display:'flex', alignItems:'center', overflow:'visible' }}>
          {/* CITY DROPDOWN */}
          <div style={{ position:'relative', flex:1, borderRight:'1px solid rgba(186,202,197,0.25)' }}>
            <button onClick={()=>{setCityOpen(!cityOpen);setPriceOpen(false);setCatOpen(false)}}
              style={{ width:'100%', height:'100%', background:'none', border:'none', cursor:'pointer', padding:'8px 20px', display:'flex', flexDirection:'column' as const, textAlign:'left' as const, gap:1 }}>
              <span style={{ fontSize:9, textTransform:'uppercase' as const, fontWeight:700, color:C.muted, letterSpacing:'0.1em' }}>{t.common.city.toUpperCase()}</span>
              <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                <span style={{ fontSize:13, fontWeight:600, color:city?C.ink:C.muted }}>{city||t.homeGarden.allCities}</span>
                <span style={{ color:C.mint, fontSize:10, display:'inline-block', transform:cityOpen?'rotate(180deg)':'rotate(0)', transition:'transform 0.2s' }}>▾</span>
              </div>
            </button>
            {cityOpen && (
              <div onClick={e=>e.stopPropagation()} style={{ position:'absolute', top:'calc(100% + 8px)', left:0, minWidth:220, backgroundColor:'white', borderRadius:16, boxShadow:'0 20px 60px rgba(0,0,0,0.12)', border:'1px solid rgba(107,122,118,0.12)', zIndex:200, padding:'8px 0', maxHeight:280, overflowY:'auto' as const }}>
                <button onClick={()=>{setCity('');setCityOpen(false)}}
                  style={{ width:'100%', padding:'10px 18px', background:'none', border:'none', cursor:'pointer', textAlign:'left' as const, fontSize:13, fontWeight:600, color:!city?C.mint:C.ink, display:'flex', justifyContent:'space-between' }}
                  onMouseEnter={e=>e.currentTarget.style.backgroundColor='#f4fbf8'} onMouseLeave={e=>e.currentTarget.style.backgroundColor='transparent'}>
                  {t.homeGarden.allCities}{!city&&<span style={{color:C.mint}}>✓</span>}
                </button>
                {ALL_CITIES.filter((c,i,arr)=>arr.indexOf(c)===i).map(opt=>(
                  <button key={opt} onClick={()=>{setCity(opt);setCityOpen(false)}}
                    style={{ width:'100%', padding:'10px 18px', background:'none', border:'none', cursor:'pointer', textAlign:'left' as const, fontSize:13, fontWeight:600, color:city===opt?C.mint:C.ink, display:'flex', justifyContent:'space-between' }}
                    onMouseEnter={e=>e.currentTarget.style.backgroundColor='#f4fbf8'} onMouseLeave={e=>e.currentTarget.style.backgroundColor='transparent'}>
                    {opt}{city===opt&&<span style={{color:C.mint}}>✓</span>}
                  </button>
                ))}
              </div>
            )}
          </div>
          {/* KEYWORD */}
          <div style={{ flex:2, padding:'8px 20px', borderRight:'1px solid rgba(186,202,197,0.25)', display:'flex', flexDirection:'column' as const, gap:1 }}>
            <span style={{ fontSize:9, textTransform:'uppercase' as const, fontWeight:700, color:C.muted, letterSpacing:'0.1em' }}>{t.common.keyword.toUpperCase()}</span>
            <div style={{ display:'flex', alignItems:'center', gap:6 }}>
              <Search size={12} color={C.muted} />
              <input value={keyword} onChange={e=>setKeyword(e.target.value)} onKeyDown={e=>e.key==='Enter'&&applySearch()} placeholder={t.homeGarden.keywordPlaceholderShort} autoComplete="off"
                style={{ fontSize:13, fontWeight:600, color:C.ink, border:'none', outline:'none', background:'none', flex:1 }} />
              {keyword && <button onClick={()=>{setKeyword('');setApplied(p=>({...p,keyword:''}))}} style={{ background:'none', border:'none', cursor:'pointer', color:C.muted, display:'flex' }}><X size={13}/></button>}
            </div>
          </div>
          {/* CATEGORY DROPDOWN */}
          <div style={{ position:'relative', flex:1, borderRight:'1px solid rgba(186,202,197,0.25)' }}>
            <button onClick={()=>{setCatOpen(!catOpen);setPriceOpen(false)}}
              style={{ width:'100%', height:'100%', background:'none', border:'none', cursor:'pointer', padding:'8px 20px', display:'flex', flexDirection:'column' as const, textAlign:'left' as const, gap:1 }}>
              <span style={{ fontSize:9, textTransform:'uppercase' as const, fontWeight:700, color:C.muted, letterSpacing:'0.1em' }}>{t.common.category.toUpperCase()}</span>
              <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                <span style={{ fontSize:13, fontWeight:600, color:category===t.homeGarden.allCategories?C.muted:C.ink }}>{category}</span>
                <span style={{ color:C.mint, fontSize:10, display:'inline-block', transform:catOpen?'rotate(180deg)':'rotate(0)', transition:'transform 0.2s' }}>▾</span>
              </div>
            </button>
            {catOpen && (
              <div onClick={e=>e.stopPropagation()} style={{ position:'absolute', top:'calc(100% + 8px)', left:0, minWidth:220, backgroundColor:'white', borderRadius:16, boxShadow:'0 20px 60px rgba(0,0,0,0.12)', border:'1px solid rgba(107,122,118,0.12)', zIndex:200, padding:'8px 0', maxHeight:280, overflowY:'auto' as const }}>
                {CAT_OPTIONS.map(opt=>(
                  <button key={opt} onClick={()=>{setCategory(opt);setCatOpen(false)}}
                    style={{ width:'100%', padding:'10px 18px', background:'none', border:'none', cursor:'pointer', textAlign:'left' as const, fontSize:13, fontWeight:600, color:category===opt?C.mint:C.ink, display:'flex', justifyContent:'space-between' }}
                    onMouseEnter={e=>e.currentTarget.style.backgroundColor='#f4fbf8'} onMouseLeave={e=>e.currentTarget.style.backgroundColor='transparent'}>
                    {opt}{category===opt&&<span style={{color:C.mint}}>✓</span>}
                  </button>
                ))}
              </div>
            )}
          </div>
          {/* PRICE DROPDOWN */}
          <div style={{ position:'relative', flex:1 }}>
            <button onClick={()=>{setPriceOpen(!priceOpen);setCatOpen(false)}}
              style={{ width:'100%', height:'100%', background:'none', border:'none', cursor:'pointer', padding:'8px 20px', display:'flex', flexDirection:'column' as const, textAlign:'left' as const, gap:1 }}>
              <span style={{ fontSize:9, textTransform:'uppercase' as const, fontWeight:700, color:C.muted, letterSpacing:'0.1em' }}>{t.common.price.toUpperCase()}</span>
              <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                <span style={{ fontSize:13, fontWeight:600, color:price===t.homeGarden.priceAny?C.muted:C.ink }}>{price}</span>
                <span style={{ color:C.mint, fontSize:10, display:'inline-block', transform:priceOpen?'rotate(180deg)':'rotate(0)', transition:'transform 0.2s' }}>▾</span>
              </div>
            </button>
            {priceOpen && (
              <div onClick={e=>e.stopPropagation()} style={{ position:'absolute', top:'calc(100% + 8px)', left:0, minWidth:220, backgroundColor:'white', borderRadius:16, boxShadow:'0 20px 60px rgba(0,0,0,0.12)', border:'1px solid rgba(107,122,118,0.12)', zIndex:200, padding:'8px 0' }}>
                {PRICES.map(opt=>(
                  <button key={opt} onClick={()=>{setPrice(opt);setPriceOpen(false)}}
                    style={{ width:'100%', padding:'10px 18px', background:'none', border:'none', cursor:'pointer', textAlign:'left' as const, fontSize:13, fontWeight:600, color:price===opt?C.mint:C.ink, display:'flex', justifyContent:'space-between' }}
                    onMouseEnter={e=>e.currentTarget.style.backgroundColor='#f4fbf8'} onMouseLeave={e=>e.currentTarget.style.backgroundColor='transparent'}>
                    {opt}{price===opt&&<span style={{color:C.mint}}>✓</span>}
                  </button>
                ))}
              </div>
            )}
          </div>
          <button onClick={applySearch} style={{ backgroundColor:C.mint, color:'white', border:'none', padding:'12px 24px', borderRadius:100, cursor:'pointer', fontWeight:700, fontSize:13, flexShrink:0, marginLeft:8, display:'flex', alignItems:'center', gap:6, transition:'background 0.15s' }}
            onMouseEnter={e=>e.currentTarget.style.backgroundColor=C.mintDk} onMouseLeave={e=>e.currentTarget.style.backgroundColor=C.mint}>
            <Search size={15} /> {t.common.search.toUpperCase()}
          </button>
        </div>
      </div>

      <div style={{ maxWidth:1440, margin:'48px auto 0', padding:'0 40px 80px' }}>

        {/* BREADCRUMB */}
        <nav style={{ display:'flex', alignItems:'center', gap:6, fontSize:11, fontWeight:700, color:C.muted, textTransform:'uppercase' as const, letterSpacing:'0.06em', marginBottom:32 }}>
          <Link href={`/${locale}`} style={{ color:C.muted, textDecoration:'none' }}>{t.common.home}</Link><span>›</span>
          <span style={{ color:C.ink }}>{t.homeGarden.breadcrumb}</span>
        </nav>

        {/* ACTIVE FILTERS */}
        {(applied.city||applied.keyword||price!==t.homeGarden.priceAny||category!==t.homeGarden.allCategories) && (
          <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:20, flexWrap:'wrap' as const }}>
            <span style={{ fontSize:13, fontWeight:700, color:C.ink }}>{t.homeGarden.filters}</span>
            {applied.city && <span style={{ display:'inline-flex', alignItems:'center', gap:6, padding:'4px 12px', borderRadius:100, backgroundColor:C.mint, color:'white', fontSize:12, fontWeight:700 }}>{applied.city}<button onClick={()=>{setApplied(p=>({...p,city:''}));setCity('')}} style={{ background:'none', border:'none', cursor:'pointer', color:'white', display:'flex' }}><X size={11}/></button></span>}
            {applied.keyword && <span style={{ display:'inline-flex', alignItems:'center', gap:6, padding:'4px 12px', borderRadius:100, backgroundColor:C.mint, color:'white', fontSize:12, fontWeight:700 }}>"{applied.keyword}"<button onClick={()=>{setApplied(p=>({...p,keyword:''}));setKeyword('')}} style={{ background:'none', border:'none', cursor:'pointer', color:'white', display:'flex' }}><X size={11}/></button></span>}
            {price!==t.homeGarden.priceAny && <span style={{ display:'inline-flex', alignItems:'center', gap:6, padding:'4px 12px', borderRadius:100, backgroundColor:C.ink, color:'white', fontSize:12, fontWeight:700 }}>{price}<button onClick={()=>setPrice(t.homeGarden.priceAny)} style={{ background:'none', border:'none', cursor:'pointer', color:'white', display:'flex' }}><X size={11}/></button></span>}
            {category!==t.homeGarden.allCategories && <span style={{ display:'inline-flex', alignItems:'center', gap:6, padding:'4px 12px', borderRadius:100, backgroundColor:C.ink, color:'white', fontSize:12, fontWeight:700 }}>{category}<button onClick={()=>setCategory(t.homeGarden.allCategories)} style={{ background:'none', border:'none', cursor:'pointer', color:'white', display:'flex' }}><X size={11}/></button></span>}
            <button onClick={()=>{setCity('');setKeyword('');setApplied({city:'',keyword:''});setPrice(t.homeGarden.priceAny);setCategory(t.homeGarden.allCategories)}} style={{ padding:'4px 14px', borderRadius:100, border:'1px solid #ef4444', backgroundColor:'white', fontSize:12, fontWeight:700, cursor:'pointer', color:'#ef4444' }}>{t.homeGarden.clearAll}</button>
          </div>
        )}
        {/* CATEGORY GRID */}
        <section style={{ marginBottom:64 }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:24 }}>
            <h2 style={{ ...UB, fontSize:28, color:C.ink }}>{t.common.browseByCategory}</h2>
            <span style={{ fontSize:14, color:C.muted }}>26,420 {t.common.totalListings}</span>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:16 }}>
            {filteredCategories.map(cat=>(
              <Link key={cat.slug} href={`/${locale}/home-garden/${cat.slug}`} style={{ textDecoration:'none' }}>
                <div onMouseEnter={()=>setHovCat(cat.slug)} onMouseLeave={()=>setHovCat(null)}
                  style={{ position:'relative', borderRadius:24, overflow:'hidden', cursor:'pointer', transition:'transform 0.2s, box-shadow 0.2s', transform:hovCat===cat.slug?'scale(1.02)':'scale(1)', boxShadow:hovCat===cat.slug?'0 20px 48px rgba(0,0,0,0.15)':'0 2px 8px rgba(0,0,0,0.06)' }}>
                  <div style={{ aspectRatio:'4/3', overflow:'hidden' }}>
                    <img src={cat.image} alt={cat.label} style={{ width:'100%', height:'100%', objectFit:'cover', transition:'transform 0.5s', transform:hovCat===cat.slug?'scale(1.08)':'scale(1)' }} />
                  </div>
                  <div style={{ position:'absolute', inset:0, background:hovCat===cat.slug?'linear-gradient(to top,rgba(34,212,168,0.75),rgba(0,0,0,0.1))':'linear-gradient(to top,rgba(0,0,0,0.72),rgba(0,0,0,0.05))' }} />
                  <div style={{ position:'absolute', bottom:0, left:0, right:0, padding:'16px 18px' }}>
                    <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                      <div>
                        <p style={{ ...UB, fontSize:15, color:'white', marginBottom:3 }}>{cat.label}</p>
                        <p style={{ fontSize:11, color:'rgba(255,255,255,0.8)', fontWeight:600 }}>{cat.count} {t.common.ads}</p>
                      </div>
                      <div style={{ width:36, height:36, borderRadius:'50%', backgroundColor:'rgba(255,255,255,0.2)', backdropFilter:'blur(8px)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:18 }}>
                        {cat.emoji}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* IMMO PRO BANNER */}
        <section style={{ marginBottom:64 }}>
          <div style={{ position:'relative', height:220, borderRadius:40, overflow:'hidden', cursor:'pointer', boxShadow:'0 20px 60px rgba(0,0,0,0.15)' }}>
            <img src="https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&w=1200" alt="Immo Pro"
              style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover' }} />
            <div style={{ position:'absolute', inset:0, background:'linear-gradient(to right,rgba(22,29,27,0.92) 0%,rgba(22,29,27,0.5) 60%,transparent)' }} />
            <div style={{ position:'absolute', inset:0, display:'flex', flexDirection:'column' as const, justifyContent:'center', padding:'0 56px' }}>
              <span style={{ backgroundColor:C.mint, color:'white', fontSize:9, ...UB, padding:'4px 14px', borderRadius:100, textTransform:'uppercase' as const, letterSpacing:'0.12em', display:'inline-block', marginBottom:14, width:'fit-content' }}>{t.homeGarden.immoProBadge}</span>
              <h2 style={{ ...UB, fontSize:'clamp(20px,3vw,32px)', color:'white', marginBottom:20, lineHeight:1.1 }}>{t.homeGarden.immoProTitle}<br/>{t.homeGarden.immoProTitle2}</h2>
              <div style={{ display:'flex', gap:12 }}>
                <Link href={`/${locale}/property`} style={{ textDecoration:'none' }}>
                  <button style={{ backgroundColor:'white', color:C.ink, border:'none', padding:'11px 28px', borderRadius:100, fontSize:12, ...UB, cursor:'pointer' }}>{t.homeGarden.exploreProperties}</button>
                </Link>
                <button style={{ backgroundColor:'transparent', color:'white', border:'1px solid rgba(255,255,255,0.4)', padding:'11px 28px', borderRadius:100, fontSize:12, fontWeight:700, cursor:'pointer' }}>{t.common.contactExpert}</button>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURED PICKS */}
        <section style={{ marginBottom:64 }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:24 }}>
            <h2 style={{ ...UB, fontSize:28, color:C.ink }}>{t.homeGarden.featuredTitle}</h2>
            <Link href={`/${locale}/home-garden/furniture`} style={{ color:C.mint, fontWeight:700, fontSize:13, textDecoration:'none', display:'flex', alignItems:'center', gap:4 }}>
              {t.common.viewAll} <ChevronRight size={14} />
            </Link>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:20 }}>
            {(applied.city||applied.keyword||price!=='Any Price'?filteredFeatured:featuredItems).map(item=>(
              <Link key={item.id} href={`/${locale}/listing/${item.id}`} style={{ textDecoration:'none' }}>
                <div onMouseEnter={()=>setHovItem(item.id)} onMouseLeave={()=>setHovItem(null)}
                  style={{ backgroundColor:'white', borderRadius:24, overflow:'hidden', border:`1px solid ${hovItem===item.id?C.mint:'rgba(186,202,197,0.2)'}`, boxShadow:hovItem===item.id?'0 20px 48px rgba(0,0,0,0.12)':'0 2px 8px rgba(0,0,0,0.04)', transition:'all 0.3s', cursor:'pointer' }}>
                  <div style={{ position:'relative', aspectRatio:'4/3', overflow:'hidden' }}>
                    <img src={item.image} alt={item.title} style={{ width:'100%', height:'100%', objectFit:'cover', transition:'transform 0.5s', transform:hovItem===item.id?'scale(1.06)':'scale(1)' }} />
                    <span style={{ position:'absolute', top:10, left:10, background:'linear-gradient(135deg,#22d4a8,#0f9b8e)', color:'white', fontSize:'8px', fontWeight:900, padding:'3px 10px', borderRadius:100, textTransform:'uppercase' as const }}>{t.homeGarden.certifiedBadge}</span>
                  </div>
                  <div style={{ padding:'16px 18px' }}>
                    <p style={{ fontFamily:"'Hanken Grotesk',sans-serif", fontWeight:900, letterSpacing:'-0.03em', fontSize:14, color:C.ink, marginBottom:6, lineHeight:1.3, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{item.title}</p>
                    <p style={{ fontFamily:"'Hanken Grotesk',sans-serif", fontWeight:900, letterSpacing:'-0.03em', fontSize:18, color:C.mint, marginBottom:6 }}>{item.price.toLocaleString()} MAD</p>
                    <p style={{ fontSize:11, color:C.muted }}>{item.location}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* AUTO PRO BANNER */}
        <section style={{ marginBottom:64 }}>
          <div style={{ position:'relative', height:220, borderRadius:40, overflow:'hidden', cursor:'pointer', boxShadow:'0 20px 60px rgba(0,0,0,0.15)' }}>
            <img src="https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&w=1200" alt="Auto Pro"
              style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover' }} />
            <div style={{ position:'absolute', inset:0, background:'linear-gradient(to right,rgba(22,29,27,0.92) 0%,rgba(22,29,27,0.5) 60%,transparent)' }} />
            <div style={{ position:'absolute', inset:0, display:'flex', flexDirection:'column' as const, justifyContent:'center', padding:'0 56px' }}>
              <span style={{ backgroundColor:'#8d4f00', color:'white', fontSize:9, ...UB, padding:'4px 14px', borderRadius:100, textTransform:'uppercase' as const, letterSpacing:'0.12em', display:'inline-block', marginBottom:14, width:'fit-content' }}>{t.homeGarden.autoProBadge}</span>
              <h2 style={{ ...UB, fontSize:'clamp(20px,3vw,32px)', color:'white', marginBottom:20, lineHeight:1.1 }}>{t.homeGarden.autoProTitle}<br/>{t.homeGarden.autoProTitle2}</h2>
              <div style={{ display:'flex', gap:12 }}>
                <Link href={`/${locale}/motors`} style={{ textDecoration:'none' }}>
                  <button style={{ backgroundColor:'white', color:C.ink, border:'none', padding:'11px 28px', borderRadius:100, fontSize:12, ...UB, cursor:'pointer' }}>{t.homeGarden.browseExplore}</button>
                </Link>
                <button style={{ backgroundColor:'transparent', color:'white', border:'1px solid rgba(255,255,255,0.4)', padding:'11px 28px', borderRadius:100, fontSize:12, fontWeight:700, cursor:'pointer' }}>{t.common.contactExpert}</button>
              </div>
            </div>
          </div>
        </section>

        {/* TRENDING SEARCHES */}
        <section style={{ marginBottom:64 }}>
          <h2 style={{ ...UB, fontSize:22, color:C.ink, marginBottom:20 }}>{t.homeGarden.trendingTitle}</h2>
          <div style={{ display:'flex', gap:10, flexWrap:'wrap' as const }}>
            {['Beni Ourain Rug','Rattan Furniture','Indoor Plants','Moroccan Lanterns','Kitchen Island','Garden Pergola','Zellige Tiles','Linen Bedding','Wall Art','Outdoor Sofa','Smart Lighting','Ceramic Vases'].map(tag=>(
              <Link key={tag} href={`/${locale}/home-garden/home-decor`} style={{ textDecoration:'none' }}>
                <span style={{ display:'inline-block', padding:'9px 18px', borderRadius:100, fontSize:13, fontWeight:700, backgroundColor:'white', color:C.ink, border:'1px solid rgba(186,202,197,0.4)', cursor:'pointer', transition:'all 0.15s' }}
                  onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.backgroundColor=C.mint;(e.currentTarget as HTMLElement).style.color='white'}}
                  onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.backgroundColor='white';(e.currentTarget as HTMLElement).style.color=C.ink}}>
                  {tag}
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* DIAMOND BANNER */}
        <section style={{ position:'relative', borderRadius:40, overflow:'hidden', marginBottom:48 }}>
          <img src="https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&w=1600" alt="Diamond"
            style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover' }} />
          <div style={{ position:'absolute', inset:0, background:'linear-gradient(135deg,rgba(15,23,42,0.96),rgba(15,23,42,0.7))' }} />
          <div style={{ position:'relative', zIndex:1, padding:'56px 64px', maxWidth:640 }}>
            <span style={{ display:'inline-flex', alignItems:'center', gap:6, background:'linear-gradient(135deg,#22d4a8,#0f9b8e)', color:'white', fontSize:9, ...UB, padding:'5px 16px', borderRadius:100, textTransform:'uppercase' as const, letterSpacing:'0.12em', marginBottom:20 }}>{t.common.diamondBadge}</span>
            <h2 style={{ ...UB, fontSize:'clamp(28px,4vw,48px)', color:'white', marginBottom:16, lineHeight:1.05 }}>{t.homeGarden.diamondTitle}</h2>
            <p style={{ fontSize:15, color:'rgba(255,255,255,0.72)', lineHeight:1.7, marginBottom:28 }}>{t.homeGarden.diamondSubtitle}</p>
            <div style={{ display:'flex', gap:12 }}>
              <button style={{ backgroundColor:C.mint, color:'white', border:'none', padding:'13px 28px', borderRadius:100, fontSize:13, ...UB, cursor:'pointer' }}>{t.common.getStarted}</button>
              <button style={{ backgroundColor:'transparent', color:'white', border:'1px solid rgba(255,255,255,0.3)', padding:'13px 28px', borderRadius:100, fontSize:13, fontWeight:700, cursor:'pointer' }}>{t.common.learnMore}</button>
            </div>
          </div>
        </section>

        {/* JOIN THE SOUKNI FAMILY */}
        <section style={{ borderRadius:40, background:'linear-gradient(135deg,#22d4a8,#0f9b8e)', padding:'56px 64px', display:'flex', alignItems:'center', justifyContent:'space-between', gap:40, flexWrap:'wrap' as const }}>
          <div>
            <h2 style={{ ...UB, fontSize:'clamp(28px,4vw,44px)', color:'white', marginBottom:12, lineHeight:1.05 }}>{t.homeGarden.joinFamilyTitle}</h2>
            <p style={{ fontSize:15, color:'rgba(255,255,255,0.85)', maxWidth:480, lineHeight:1.7 }}>{t.homeGarden.joinFamilySubtitle}</p>
            <div style={{ display:'flex', gap:12, marginTop:24 }}>
              <button style={{ backgroundColor:'white', color:C.mint, border:'none', padding:'12px 24px', borderRadius:100, fontWeight:800, fontSize:13, cursor:'pointer', display:'flex', alignItems:'center', gap:8 }}>🍎 {t.common.appStore}</button>
              <button style={{ backgroundColor:'rgba(255,255,255,0.15)', color:'white', border:'1px solid rgba(255,255,255,0.4)', padding:'12px 24px', borderRadius:100, fontWeight:800, fontSize:13, cursor:'pointer', display:'flex', alignItems:'center', gap:8 }}>▶ {t.common.googlePlay}</button>
            </div>
          </div>
          <Link href={`/${locale}/post-ad`} style={{ textDecoration:'none' }}>
            <span style={{ display:'inline-block', backgroundColor:'white', color:C.mint, padding:'16px 36px', borderRadius:100, fontWeight:900, fontSize:14, cursor:'pointer', whiteSpace:'nowrap' as const, ...UB }}>{t.common.postFreeAd}</span>
          </Link>
        </section>

      </div>
    </div>
  )
}
