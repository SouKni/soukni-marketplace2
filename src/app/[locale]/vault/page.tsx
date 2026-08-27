'use client'
import React, { useState, useMemo } from 'react'
import { createPortal } from 'react-dom'
import Link from 'next/link'
import { Search, ChevronRight, X } from 'lucide-react'
import { useMarket } from '@/context/MarketContext'
import { useDictionary } from '@/lib/useDictionary'
import { ALL_CITIES } from '@/lib/moroccoLocations'
import Breadcrumb from '@/components/ui/Breadcrumb'

const C = { mint:'#22d4a8', mintDk:'#0f9b8e', ink:'#161d1b', surface:'#f4fbf8', muted:'#6b7a76' }
const UB = { fontFamily:"'Inter',sans-serif", fontWeight:900, letterSpacing:'-0.05em' } as const

// categories moved inside component to support translation

const featuredItems = [
  { id:'vt1', title:'Patek Philippe Nautilus — Ref. 5711', price:189000, location:'Casablanca, Maarif', image:'https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&w=600' },
  { id:'vt2', title:'PS5 Pro Bundle with 6 games sealed',  price:18500,  location:'Casablanca',         image:'https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?auto=compress&w=600' },
  { id:'vt3', title:'Luxury teak outdoor lounge set',      price:45000,  location:'Marrakech, Palmeraie',image:'https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg?auto=compress&w=600' },
  { id:'vt4', title:'Fender Stratocaster Vintage 1978',    price:12800,  location:'Marrakech, Gueliz',   image:'https://images.pexels.com/photos/1644616/pexels-photo-1644616.jpeg?auto=compress&w=600' },
]


function HeroCityDropdown({ city, setCity, open, setOpen }: any) {
  const btnRef = React.useRef<HTMLButtonElement>(null)
  const [pos, setPos] = React.useState({ top:0, left:0, width:0 })
  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => { setMounted(true) }, [])
  React.useEffect(() => {
    if (!open) return
    const measure = () => {
      if (btnRef.current) {
        const rect = btnRef.current.getBoundingClientRect()
        setPos({ top: rect.bottom + 8, left: rect.left, width: Math.max(rect.width, 200) })
      }
    }
    measure()
    const closeOnScroll = () => setOpen(false)
    window.addEventListener('scroll', closeOnScroll, true)
    window.addEventListener('resize', measure)
    return () => {
      window.removeEventListener('scroll', closeOnScroll, true)
      window.removeEventListener('resize', measure)
    }
  }, [open])

  const dropdown = open && mounted ? createPortal(
    <>
      <div onClick={()=>setOpen(false)} style={{ position:'fixed', inset:0, zIndex:99998 }} />
      <div style={{ position:'fixed', top:pos.top, left:pos.left, minWidth:pos.width, maxHeight:320, overflowY:'auto' as const, backgroundColor:'white', borderRadius:16, boxShadow:'0 16px 48px rgba(0,0,0,0.2)', border:'1px solid rgba(107,122,118,0.1)', zIndex:99999, padding:'6px 0' }}>
        {['All Cities',...ALL_CITIES].map(opt=>(
          <button key={opt} onClick={()=>{setCity(opt==='All Cities'?'':opt);setOpen(false)}}
            style={{ width:'100%', padding:'10px 18px', background:'none', border:'none', cursor:'pointer', textAlign:'left' as const, fontSize:13, fontFamily:'Inter,sans-serif', fontWeight:600, color:(opt==='All Cities'?!city:city===opt)?'#22d4a8':'#161d1b', display:'flex', justifyContent:'space-between' }}
            onMouseEnter={e=>e.currentTarget.style.backgroundColor='#f4fbf8'}
            onMouseLeave={e=>e.currentTarget.style.backgroundColor='transparent'}
          >{opt}{(opt==='All Cities'?!city:city===opt)&&<span style={{color:'#22d4a8'}}>✓</span>}</button>
        ))}
      </div>
    </>, document.body
  ) : null

  return (
    <div style={{ position:'relative', width:'100%' }}>
      <button ref={btnRef} onClick={(e)=>{ e.stopPropagation(); setOpen(!open) }}
        style={{ background:'none', border:'none', cursor:'pointer', padding:0, display:'flex', alignItems:'center', gap:6, color:'white', fontSize:14, fontFamily:'Inter,sans-serif', fontWeight:600, width:'100%', textAlign:'left' as const, outline:'none' }}>
        {city||'All Cities'}
      </button>
      {dropdown}
    </div>
  )
}

export default function VaultPage({ params }: { params: Promise<{ locale:string }> }) {
  const { locale } = React.use(params)
  const t = useDictionary(locale)
  const categories = [
    { slug:'collectibles-treasures', label:t.vault.catCollectibles,       count:'3,214', emoji:'💎', image:'https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&w=600' },
    { slug:'musical-instruments',    label:t.vault.catMusicalInstruments, count:'1,842', emoji:'🎸', image:'https://images.pexels.com/photos/1644616/pexels-photo-1644616.jpeg?auto=compress&w=600' },
    { slug:'home-garden',            label:t.vault.catHomeGarden,         count:'2,719', emoji:'🌿', image:'https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg?auto=compress&w=600' },
    { slug:'gaming',                 label:t.vault.catGaming,             count:'4,103', emoji:'🎮', image:'https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?auto=compress&w=600' },
    { slug:'baby-items',             label:t.vault.catBabyItems,          count:'1,560', emoji:'🧸', image:'https://images.pexels.com/photos/3933250/pexels-photo-3933250.jpeg?auto=compress&w=600' },
    { slug:'pets-accessories',       label:t.vault.catPetsAccessories,    count:'980',   emoji:'🐾', image:'https://images.pexels.com/photos/1490908/pexels-photo-1490908.jpeg?auto=compress&w=600' },
    { slug:'tickets-vouchers',       label:t.vault.catTicketsVouchers,    count:'897',   emoji:'🎟️', image:'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&w=600' },
    { slug:'toys',                   label:t.vault.catToys,               count:'2,340', emoji:'🧩', image:'https://images.pexels.com/photos/163696/toy-car-toy-box-mini-cars-163696.jpeg?auto=compress&w=600' },
    { slug:'home-appliances',        label:t.vault.catHomeAppliances,     count:'8,453', emoji:'🔌', image:'https://images.pexels.com/photos/4108715/pexels-photo-4108715.jpeg?auto=compress&w=600' },
    { slug:'sports-equipment',       label:t.vault.catSportsEquipment,    count:'3,760', emoji:'⚽', image:'https://images.pexels.com/photos/1552249/pexels-photo-1552249.jpeg?auto=compress&w=600' },
    { slug:'electronics',            label:t.vault.catElectronics,        count:'9,318', emoji:'📱', image:'https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&w=600' },
  ]
  const [keyword, setKeyword]       = useState('')
  const [city, setCity]             = useState('')
  const [applied, setApplied]       = useState({ city:'', keyword:'' })
  const [price, setPrice]           = useState('Any Price')
  const [category, setCategory]     = useState('All Categories')
  const [priceOpen, setPriceOpen]   = useState(false)
  const [catOpen, setCatOpen]       = useState(false)
  const [cityOpen, setCityOpen]     = useState(false)
  const [heroCityOpen, setHeroCityOpen] = useState(false)
  const [hovCat, setHovCat]         = useState<string|null>(null)
  const [hovItem, setHovItem]       = useState<string|null>(null)
  const { formatPrice } = useMarket()

  const PRICES = ['Any Price','0–2,000 MAD','2,000–8,000 MAD','8,000–30,000 MAD','30,000+ MAD']
  const CAT_OPTIONS = ['All Categories',...categories.map(c=>c.label)]

  function applySearch() {
    setApplied({ city, keyword })
    setPriceOpen(false)
    setCatOpen(false)
    setCityOpen(false)
  }

  const filteredFeatured = useMemo(() => {
    return featuredItems.filter(item => {
      const mc = !applied.city    || item.location.toLowerCase().includes(applied.city.toLowerCase())
      const mk = !applied.keyword || item.title.toLowerCase().includes(applied.keyword.toLowerCase())
      const mp = price === 'Any Price' ? true
               : price === '0–2,000 MAD'      ? item.price <= 2000
               : price === '2,000–8,000 MAD'  ? item.price > 2000  && item.price <= 8000
               : price === '8,000–30,000 MAD' ? item.price > 8000  && item.price <= 30000
               : item.price > 30000
      return mc && mk && mp
    })
  }, [applied, price])

  const filteredCategories = useMemo(() => {
    if (!applied.keyword && category === 'All Categories') return categories
    return categories.filter(cat =>
      (category === 'All Categories' || cat.label === category) &&
      (!applied.keyword || cat.label.toLowerCase().includes(applied.keyword.toLowerCase()))
    )
  }, [applied.keyword, category])

  return (
    <div style={{ fontFamily:"'Inter',sans-serif", backgroundColor:C.surface, minHeight:'100vh' }}>

      {/* CINEMATIC HERO */}
      <section style={{ position:'relative', height:520, overflow:'hidden', display:'flex', alignItems:'center', justifyContent:'center' }}>
        <img src="https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg?auto=compress&w=1600" alt="The Vault"
          style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover' }} />
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top,rgba(15,23,42,0.88),rgba(15,23,42,0.32))' }} />
        <div style={{ position:'relative', zIndex:10, textAlign:'center', padding:'0 24px', maxWidth:760, width:'100%' }}>
          <p style={{ fontSize:11, fontWeight:800, color:C.mint, textTransform:'uppercase' as const, letterSpacing:'0.2em', marginBottom:16 }}>{t.vault.badge}</p>
          <h1 style={{ ...UB, fontSize:'clamp(36px,6vw,68px)', color:'white', lineHeight:1.0, marginBottom:20, textTransform:'uppercase' as const }}>
            {t.vault.heroLine1}<br />{t.vault.heroLine2}<br />{t.vault.heroLine3}
          </h1>
          <p style={{ fontSize:16, color:'rgba(255,255,255,0.75)', marginBottom:32, maxWidth:520, margin:'0 auto 32px' }}>
            {t.vault.heroSubtitle}
          </p>
          {/* 3-section glassmorphic search */}
          <div style={{ display:'flex', alignItems:'stretch', backgroundColor:'rgba(255,255,255,0.12)', backdropFilter:'blur(24px)', border:'1px solid rgba(255,255,255,0.25)', borderRadius:100, overflow:'hidden', maxWidth:680, margin:'0 auto', boxShadow:'0 8px 32px rgba(0,0,0,0.2)' }}>
            <div style={{ display:'flex', flexDirection:'column' as const, padding:'14px 22px', flex:'0 0 160px', borderRight:'1px solid rgba(255,255,255,0.2)', gap:2 }}>
              <span style={{ fontSize:9, fontWeight:800, color:'rgba(255,255,255,0.55)', textTransform:'uppercase' as const, letterSpacing:'0.12em' }}>{t.common.city}</span>
              <HeroCityDropdown city={city} setCity={setCity} open={heroCityOpen} setOpen={setHeroCityOpen} />
            </div>
            <div style={{ display:'flex', flexDirection:'column' as const, padding:'14px 22px', flex:1, borderRight:'1px solid rgba(255,255,255,0.2)', gap:2 }}>
              <span style={{ fontSize:9, fontWeight:800, color:'rgba(255,255,255,0.55)', textTransform:'uppercase' as const, letterSpacing:'0.12em' }}>{t.common.keyword}</span>
              <input value={keyword} onChange={e=>setKeyword(e.target.value)} onKeyDown={e=>e.key==='Enter'&&applySearch()} placeholder={t.vault.keywordPlaceholder} autoComplete="off" style={{ backgroundColor:'transparent', border:'none', outline:'none', fontSize:14, fontWeight:600, color:'white', fontFamily:"'Inter',sans-serif", padding:0, width:'100%' }} />
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
          <div style={{ flex:1, padding:'8px 20px', borderRight:'1px solid rgba(186,202,197,0.25)', display:'flex', flexDirection:'column' as const, gap:1 }}>
            <span style={{ fontSize:9, textTransform:'uppercase' as const, fontWeight:700, color:C.muted, letterSpacing:'0.1em' }}>{t.common.city}</span>
            <div style={{ position:'relative', width:'100%' }}>
              <button onClick={()=>{setCityOpen(!cityOpen);setPriceOpen(false);setCatOpen(false)}} style={{ fontSize:13, fontWeight:600, color:city?C.ink:C.muted, border:'none', outline:'none', background:'none', width:'100%', textAlign:'left' as const, cursor:'pointer' }}>
                {city||'All Cities'}
              </button>
              {cityOpen && (
                <div onClick={e=>e.stopPropagation()} style={{ position:'absolute', top:'calc(100% + 8px)', left:0, minWidth:220, backgroundColor:'white', borderRadius:16, boxShadow:'0 20px 60px rgba(0,0,0,0.12)', border:'1px solid rgba(107,122,118,0.12)', zIndex:200, padding:'8px 0', maxHeight:280, overflowY:'auto' as const }}>
                  {['All Cities',...ALL_CITIES].map(opt=>(
                    <button key={opt} onClick={()=>{setCity(opt==='All Cities'?'':opt);setCityOpen(false)}}
                      style={{ width:'100%', padding:'10px 18px', background:'none', border:'none', cursor:'pointer', textAlign:'left' as const, fontSize:13, fontWeight:600, color:(opt==='All Cities'?!city:city===opt)?C.mint:C.ink, display:'flex', justifyContent:'space-between' }}
                      onMouseEnter={e=>e.currentTarget.style.backgroundColor='#f4fbf8'} onMouseLeave={e=>e.currentTarget.style.backgroundColor='transparent'}>
                      {opt}{(opt==='All Cities'?!city:city===opt)&&<span style={{color:C.mint}}>✓</span>}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div style={{ flex:2, padding:'8px 20px', borderRight:'1px solid rgba(186,202,197,0.25)', display:'flex', flexDirection:'column' as const, gap:1 }}>
            <span style={{ fontSize:9, textTransform:'uppercase' as const, fontWeight:700, color:C.muted, letterSpacing:'0.1em' }}>{t.common.keyword}</span>
            <div style={{ display:'flex', alignItems:'center', gap:6 }}>
              <Search size={12} color={C.muted} />
              <input value={keyword} onChange={e=>setKeyword(e.target.value)} onKeyDown={e=>e.key==='Enter'&&applySearch()} placeholder={t.vault.keywordPlaceholder} autoComplete="off"
                style={{ fontSize:13, fontWeight:600, color:C.ink, border:'none', outline:'none', background:'none', flex:1 }} />
              {keyword && <button onClick={()=>{setKeyword('');setApplied(p=>({...p,keyword:''}))}} style={{ background:'none', border:'none', cursor:'pointer', color:C.muted, display:'flex' }}><X size={13}/></button>}
            </div>
          </div>
          <div style={{ position:'relative', flex:1, borderRight:'1px solid rgba(186,202,197,0.25)' }}>
            <button onClick={()=>{setCatOpen(!catOpen);setPriceOpen(false);setCityOpen(false)}}
              style={{ width:'100%', height:'100%', background:'none', border:'none', cursor:'pointer', padding:'8px 20px', display:'flex', flexDirection:'column' as const, textAlign:'left' as const, gap:1 }}>
              <span style={{ fontSize:9, textTransform:'uppercase' as const, fontWeight:700, color:C.muted, letterSpacing:'0.1em' }}>{t.common.category}</span>
              <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                <span style={{ fontSize:13, fontWeight:600, color:category==='All Categories'?C.muted:C.ink }}>{category}</span>
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
          <div style={{ position:'relative', flex:1 }}>
            <button onClick={()=>{setPriceOpen(!priceOpen);setCatOpen(false);setCityOpen(false)}}
              style={{ width:'100%', height:'100%', background:'none', border:'none', cursor:'pointer', padding:'8px 20px', display:'flex', flexDirection:'column' as const, textAlign:'left' as const, gap:1 }}>
              <span style={{ fontSize:9, textTransform:'uppercase' as const, fontWeight:700, color:C.muted, letterSpacing:'0.1em' }}>{t.common.price}</span>
              <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                <span style={{ fontSize:13, fontWeight:600, color:price==='Any Price'?C.muted:C.ink }}>{price}</span>
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
        <Breadcrumb
          items={[
            { label:t.common.home, href:`/${locale}` },
            { label:t.vault.breadcrumb },
          ]}
          mutedColor={C.muted}
          inkColor={C.ink}
          style={{ marginBottom:32 }}
        />

        {/* ACTIVE FILTERS */}
        {(applied.city||applied.keyword||price!=='Any Price'||category!=='All Categories') && (
          <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:20, flexWrap:'wrap' as const }}>
            <span style={{ fontSize:13, fontWeight:700, color:C.ink }}>Filters:</span>
            {applied.city && <span style={{ display:'inline-flex', alignItems:'center', gap:6, padding:'4px 12px', borderRadius:100, backgroundColor:C.mint, color:'white', fontSize:12, fontWeight:700 }}>{applied.city}<button onClick={()=>{setApplied(p=>({...p,city:''}));setCity('')}} style={{ background:'none', border:'none', cursor:'pointer', color:'white', display:'flex' }}><X size={11}/></button></span>}
            {applied.keyword && <span style={{ display:'inline-flex', alignItems:'center', gap:6, padding:'4px 12px', borderRadius:100, backgroundColor:C.mint, color:'white', fontSize:12, fontWeight:700 }}>"{applied.keyword}"<button onClick={()=>{setApplied(p=>({...p,keyword:''}));setKeyword('')}} style={{ background:'none', border:'none', cursor:'pointer', color:'white', display:'flex' }}><X size={11}/></button></span>}
            {price!=='Any Price' && <span style={{ display:'inline-flex', alignItems:'center', gap:6, padding:'4px 12px', borderRadius:100, backgroundColor:C.ink, color:'white', fontSize:12, fontWeight:700 }}>{price}<button onClick={()=>setPrice('Any Price')} style={{ background:'none', border:'none', cursor:'pointer', color:'white', display:'flex' }}><X size={11}/></button></span>}
            {category!=='All Categories' && <span style={{ display:'inline-flex', alignItems:'center', gap:6, padding:'4px 12px', borderRadius:100, backgroundColor:C.ink, color:'white', fontSize:12, fontWeight:700 }}>{category}<button onClick={()=>setCategory('All Categories')} style={{ background:'none', border:'none', cursor:'pointer', color:'white', display:'flex' }}><X size={11}/></button></span>}
            <button onClick={()=>{setCity('');setKeyword('');setApplied({city:'',keyword:''});setPrice('Any Price');setCategory('All Categories')}} style={{ padding:'4px 14px', borderRadius:100, border:'1px solid #ef4444', backgroundColor:'white', fontSize:12, fontWeight:700, cursor:'pointer', color:'#ef4444' }}>Clear All</button>
          </div>
        )}
        {/* CATEGORY GRID */}
        <section style={{ marginBottom:64 }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:24 }}>
            <h2 style={{ ...UB, fontSize:28, color:C.ink }}>{t.common.browseByCategory}</h2>
            <span style={{ fontSize:14, color:C.muted }}>29,868 {t.common.totalListings}</span>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:16 }}>
            {filteredCategories.map(cat=>(
              <Link key={cat.slug} href={`/${locale}/${cat.slug}`} style={{ textDecoration:'none' }}>
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

            {/* View More tile — 12th slot */}
            <Link href={`/${locale}/vault-other`} style={{ textDecoration:'none' }}>
              <div onMouseEnter={()=>setHovCat('view-more')} onMouseLeave={()=>setHovCat(null)}
                style={{ position:'relative', borderRadius:24, overflow:'hidden', cursor:'pointer', aspectRatio:'4/3', transition:'transform 0.2s, box-shadow 0.2s', transform:hovCat==='view-more'?'scale(1.02)':'scale(1)', boxShadow:hovCat==='view-more'?'0 20px 48px rgba(0,0,0,0.15)':'0 2px 8px rgba(0,0,0,0.06)',
                  background: hovCat==='view-more' ? `linear-gradient(135deg,${C.mint},${C.mintDk})` : C.ink,
                  display:'flex', flexDirection:'column' as const, alignItems:'center', justifyContent:'center', gap:8 }}>
                <div style={{ width:36, height:36, borderRadius:'50%', backgroundColor:'rgba(255,255,255,0.15)', display:'flex', alignItems:'center', justifyContent:'center' }}>
                  <ChevronRight size={20} color="white" />
                </div>
                <p style={{ ...UB, fontSize:15, color:'white' }}>{t.vault.viewMore}</p>
                <p style={{ fontSize:11, color:'rgba(255,255,255,0.7)', fontWeight:600 }}>{t.vault.otherFinds}</p>
              </div>
            </Link>
          </div>
        </section>

        {/* DIAMOND MEMBER BANNER */}
        <section style={{ marginBottom:64 }}>
          <div style={{ position:'relative', height:220, borderRadius:40, overflow:'hidden', cursor:'pointer', boxShadow:'0 20px 60px rgba(0,0,0,0.15)' }}>
            <img src="https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&w=1200" alt="Diamond"
              style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover' }} />
            <div style={{ position:'absolute', inset:0, background:'linear-gradient(to right,rgba(22,29,27,0.92) 0%,rgba(22,29,27,0.5) 60%,transparent)' }} />
            <div style={{ position:'absolute', inset:0, display:'flex', flexDirection:'column' as const, justifyContent:'center', padding:'0 56px' }}>
              <span style={{ backgroundColor:C.mint, color:'white', fontSize:9, ...UB, padding:'4px 14px', borderRadius:100, textTransform:'uppercase' as const, letterSpacing:'0.12em', display:'inline-block', marginBottom:14, width:'fit-content' }}>{t.vault.diamondBannerBadge}</span>
              <h2 style={{ ...UB, fontSize:'clamp(20px,3vw,32px)', color:'white', marginBottom:20, lineHeight:1.1 }}>{t.vault.diamondBannerTitle}<br/>{t.vault.diamondBannerTitle2}</h2>
              <div style={{ display:'flex', gap:12 }}>
                <Link href={`/${locale}/diamond`} style={{ textDecoration:'none' }}>
                  <button style={{ backgroundColor:'white', color:C.ink, border:'none', padding:'11px 28px', borderRadius:100, fontSize:12, ...UB, cursor:'pointer' }}>{t.common.getCertified}</button>
                </Link>
                <button style={{ backgroundColor:'transparent', color:'white', border:'1px solid rgba(255,255,255,0.4)', padding:'11px 28px', borderRadius:100, fontSize:12, fontWeight:700, cursor:'pointer' }}>{t.common.contactExpert}</button>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURED PICKS */}
        <section style={{ marginBottom:64 }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:24 }}>
            <h2 style={{ ...UB, fontSize:28, color:C.ink }}>{t.vault.featuredTitle}</h2>
            <Link href={`/${locale}/jewelry-watches`} style={{ color:C.mint, fontWeight:700, fontSize:13, textDecoration:'none', display:'flex', alignItems:'center', gap:4 }}>
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
                    <span style={{ position:'absolute', top:10, left:10, background:'linear-gradient(135deg,#22d4a8,#0f9b8e)', color:'white', fontSize:'8px', fontWeight:900, padding:'3px 10px', borderRadius:100, textTransform:'uppercase' as const }}>{t.vault.certifiedBadge}</span>
                  </div>
                  <div style={{ padding:'16px 18px' }}>
                    <p style={{ fontFamily:"'Hanken Grotesk',sans-serif", fontWeight:900, letterSpacing:'-0.03em', fontSize:14, color:C.ink, marginBottom:6, lineHeight:1.3, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{item.title}</p>
                    <p style={{ fontFamily:"'Hanken Grotesk',sans-serif", fontWeight:900, letterSpacing:'-0.03em', fontSize:18, color:C.mint, marginBottom:6 }}>{formatPrice(item.price)}</p>
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
              <span style={{ backgroundColor:'#8d4f00', color:'white', fontSize:9, ...UB, padding:'4px 14px', borderRadius:100, textTransform:'uppercase' as const, letterSpacing:'0.12em', display:'inline-block', marginBottom:14, width:'fit-content' }}>{t.vault.autoProBadge}</span>
              <h2 style={{ ...UB, fontSize:'clamp(20px,3vw,32px)', color:'white', marginBottom:20, lineHeight:1.1 }}>{t.vault.autoProTitle}<br/>{t.vault.autoProTitle2}</h2>
              <div style={{ display:'flex', gap:12 }}>
                <Link href={`/${locale}/motors`} style={{ textDecoration:'none' }}>
                  <button style={{ backgroundColor:'white', color:C.ink, border:'none', padding:'11px 28px', borderRadius:100, fontSize:12, ...UB, cursor:'pointer' }}>{t.vault.browseExplore}</button>
                </Link>
                <button style={{ backgroundColor:'transparent', color:'white', border:'1px solid rgba(255,255,255,0.4)', padding:'11px 28px', borderRadius:100, fontSize:12, fontWeight:700, cursor:'pointer' }}>{t.common.contactExpert}</button>
              </div>
            </div>
          </div>
        </section>

        {/* TRENDING SEARCHES */}
        <section style={{ marginBottom:64 }}>
          <h2 style={{ ...UB, fontSize:22, color:C.ink, marginBottom:20 }}>{t.vault.trendingTitle}</h2>
          <div style={{ display:'flex', gap:10, flexWrap:'wrap' as const }}>
            {['Rolex Submariner','PS5 Console','Patek Philippe','Fender Guitar','LEGO Collector','Cartier Bracelet','Gaming PC','Vintage Watch','Van Cleef Jewelry','Nintendo Switch','Home Decor','Sports Gear'].map(tag=>(
              <Link key={tag} href={`/${locale}/jewelry-watches`} style={{ textDecoration:'none' }}>
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
          <img src="https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&w=1600" alt="Diamond"
            style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover' }} />
          <div style={{ position:'absolute', inset:0, background:'linear-gradient(135deg,rgba(15,23,42,0.96),rgba(15,23,42,0.7))' }} />
          <div style={{ position:'relative', zIndex:1, padding:'56px 64px', maxWidth:640 }}>
            <span style={{ display:'inline-flex', alignItems:'center', gap:6, background:'linear-gradient(135deg,#22d4a8,#0f9b8e)', color:'white', fontSize:9, ...UB, padding:'5px 16px', borderRadius:100, textTransform:'uppercase' as const, letterSpacing:'0.12em', marginBottom:20 }}>{t.common.diamondBadge}</span>
            <h2 style={{ ...UB, fontSize:'clamp(28px,4vw,48px)', color:'white', marginBottom:16, lineHeight:1.05 }}>{t.vault.unlockDiamondTitle}</h2>
            <p style={{ fontSize:15, color:'rgba(255,255,255,0.72)', lineHeight:1.7, marginBottom:28 }}>{t.vault.unlockDiamondSubtitle}</p>
            <div style={{ display:'flex', gap:12 }}>
              <button style={{ backgroundColor:C.mint, color:'white', border:'none', padding:'13px 28px', borderRadius:100, fontSize:13, ...UB, cursor:'pointer' }}>{t.vault.getStarted}</button>
              <button style={{ backgroundColor:'transparent', color:'white', border:'1px solid rgba(255,255,255,0.3)', padding:'13px 28px', borderRadius:100, fontSize:13, fontWeight:700, cursor:'pointer' }}>{t.common.learnMore}</button>
            </div>
          </div>
        </section>

        {/* JOIN THE SOUKNI FAMILY */}
        <section style={{ borderRadius:40, background:'linear-gradient(135deg,#22d4a8,#0f9b8e)', padding:'56px 64px', display:'flex', alignItems:'center', justifyContent:'space-between', gap:40, flexWrap:'wrap' as const }}>
          <div>
            <h2 style={{ ...UB, fontSize:'clamp(28px,4vw,44px)', color:'white', marginBottom:12, lineHeight:1.05 }}>{t.vault.unlockVaultTitle}</h2>
            <p style={{ fontSize:15, color:'rgba(255,255,255,0.85)', maxWidth:480, lineHeight:1.7 }}>{t.vault.unlockVaultSubtitle}</p>
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
