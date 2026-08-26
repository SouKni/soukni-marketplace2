'use client'

import { useState, useMemo } from 'react'
import React from 'react'
import { Heart, Search, ChevronDown, ChevronLeft, ChevronRight, SlidersHorizontal, MapPin } from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'

const C = {
  mint:   '#22d4a8',
  mintDk: '#006c53',
  ink:    '#161d1b',
  surface:'#f4fbf8',
  cream:  '#f5ede0',
  muted:  '#6b7a76',
}
const UB: React.CSSProperties = { fontFamily:'Inter,sans-serif',            fontWeight:900, letterSpacing:'-0.05em' }
const CB: React.CSSProperties = { fontFamily:"'Hanken Grotesk',sans-serif", fontWeight:900, letterSpacing:'-0.03em' }

const CATEGORIES: Record<string,{
  label:string; hero:string; desc:string; count:string;
  brands:string[]; priceRanges:string[]; emoji:string; eras:string[]
}> = {
  'all-vintage': {
    label:'All Vintage', emoji:'🏺',
    hero:'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&w=1600',
    desc:'Browse the complete SouKni vintage & thrift collection.',
    count:'2,640', eras:['1940s','1950s','1960s','1970s','1980s','1990s'],
    brands:['Levi\'s Vintage','Hermès','Chanel','Gucci','Dior','Rolex','YSL','Balenciaga'],
    priceRanges:['Any Price','0 – 500 MAD','500 – 2,000 MAD','2,000 – 8,000 MAD','8,000 – 30,000 MAD','30,000+ MAD'],
  },
  'clothing': {
    label:'Vintage Clothing', emoji:'👗',
    hero:'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&w=1600',
    desc:'Authenticated vintage clothing from the most iconic fashion decades.',
    count:'1,124', eras:['1940s','1950s','1960s','1970s','1980s','1990s'],
    brands:['Levi\'s Vintage','Chanel','YSL','Courrèges','Pucci','Biba','Halston','Ossie Clark'],
    priceRanges:['Any Price','0 – 500 MAD','500 – 2,000 MAD','2,000 – 8,000 MAD','8,000 – 30,000 MAD','30,000+ MAD'],
  },
  'accessories': {
    label:'Vintage Accessories', emoji:'👜',
    hero:'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&w=1600',
    desc:'Rare vintage bags, scarves, belts and accessories from top maisons.',
    count:'648', eras:['1950s','1960s','1970s','1980s','1990s'],
    brands:['Hermès','Chanel','Gucci','Dior','Louis Vuitton','Balenciaga','Céline'],
    priceRanges:['Any Price','0 – 1,000 MAD','1,000 – 5,000 MAD','5,000 – 20,000 MAD','20,000+ MAD'],
  },
  'watches': {
    label:'Vintage Watches', emoji:'⌚',
    hero:'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&w=1600',
    desc:'Rare vintage timepieces — from early Rolex sports models to Patek pocket watches.',
    count:'312', eras:['1940s','1950s','1960s','1970s','1980s'],
    brands:['Rolex','Patek Philippe','Audemars Piguet','Cartier','Omega','IWC','Jaeger-LeCoultre'],
    priceRanges:['Any Price','0 – 10,000 MAD','10,000 – 50,000 MAD','50,000 – 150,000 MAD','150,000+ MAD'],
  },
  'jewelry': {
    label:'Vintage Jewelry', emoji:'💍',
    hero:'https://images.pexels.com/photos/1458867/pexels-photo-1458867.jpeg?auto=compress&w=1600',
    desc:'Estate and vintage jewelry from Art Deco to Mid-Century Modern.',
    count:'284', eras:['1920s','1940s','1950s','1960s','1970s','1980s'],
    brands:['Cartier','Van Cleef & Arpels','Bulgari','Tiffany & Co','Miriam Haskell','Kenneth Jay Lane'],
    priceRanges:['Any Price','0 – 2,000 MAD','2,000 – 8,000 MAD','8,000 – 25,000 MAD','25,000+ MAD'],
  },
  'shoes': {
    label:'Vintage Shoes', emoji:'👠',
    hero:'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&w=1600',
    desc:'Rare vintage footwear from platform boots to classic pumps.',
    count:'198', eras:['1950s','1960s','1970s','1980s','1990s'],
    brands:['Manolo Blahnik','YSL','Charles Jourdan','Salvatore Ferragamo','Roger Vivier','Dior'],
    priceRanges:['Any Price','0 – 1,000 MAD','1,000 – 4,000 MAD','4,000 – 12,000 MAD','12,000+ MAD'],
  },
  'collectibles': {
    label:'Collectibles', emoji:'🎭',
    hero:'https://images.pexels.com/photos/5935748/pexels-photo-5935748.jpeg?auto=compress&w=1600',
    desc:'Rare fashion collectibles, campaign items, and archival pieces.',
    count:'74', eras:['1950s','1960s','1970s','1980s','1990s','2000s'],
    brands:['Chanel','Dior','YSL','Hermès','Versace','Gianni Versace','Alexander McQueen'],
    priceRanges:['Any Price','0 – 1,000 MAD','1,000 – 5,000 MAD','5,000 – 20,000 MAD','20,000+ MAD'],
  },
}

const ALL_CATS = [
  { label:'All Vintage',        slug:'all-vintage',  emoji:'🏺' },
  { label:'Vintage Clothing',   slug:'clothing',     emoji:'👗' },
  { label:'Accessories',        slug:'accessories',  emoji:'👜' },
  { label:'Vintage Watches',    slug:'watches',      emoji:'⌚' },
  { label:'Vintage Jewelry',    slug:'jewelry',      emoji:'💍' },
  { label:'Vintage Shoes',      slug:'shoes',        emoji:'👠' },
  { label:'Collectibles',       slug:'collectibles', emoji:'🎭' },
]

const VINTAGE_IMGS = [
  'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&w=400',
  'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&w=400',
  'https://images.pexels.com/photos/2220316/pexels-photo-2220316.jpeg?auto=compress&w=400',
  'https://images.pexels.com/photos/5935748/pexels-photo-5935748.jpeg?auto=compress&w=400',
  'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&w=400',
]

type BadgeT = 'certified'|'diamond'|'featured'|'new'
function Badge({ type }: { type: BadgeT }) {
  const map: Record<BadgeT,{bg:string;color:string;label:string}> = {
    certified:{ bg:C.mint,   color:C.ink,  label:'SouKni Certified' },
    diamond:  { bg:C.ink,    color:C.mint, label:'◆ DIAMOND'        },
    featured: { bg:'#fbbf24',color:C.ink,  label:'Featured'         },
    new:      { bg:C.mint, color:'white', label:'New Arrival'     },
  }
  const s = map[type]
  return (
    <span style={{ backgroundColor:s.bg, color:s.color, fontSize:'8px', ...CB, padding:'4px 10px', borderRadius:'6px', textTransform:'uppercase' as const, letterSpacing:'0.08em', display:'inline-block', boxShadow:'0 2px 6px rgba(0,0,0,0.15)', whiteSpace:'nowrap' as const }}>
      {s.label}
    </span>
  )
}

function ListingCard({ brand, title, price, location, condition, img, badge, era }: any) {
  const [saved, setSaved] = useState(false)
  const [hov,   setHov  ] = useState(false)
  return (
    <article onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{ backgroundColor:'white', borderRadius:'24px', border:`1px solid ${hov?C.mint:'rgba(107,122,118,0.1)'}`, overflow:'hidden', boxShadow:hov?`0 20px 40px ${C.mint}18`:'0 2px 8px rgba(0,0,0,0.04)', transition:'all 0.3s', cursor:'pointer', display:'flex', flexDirection:'column' as const }}>
      <div style={{ position:'relative', aspectRatio:'1/1', overflow:'hidden', backgroundColor:C.cream }}>
        <img src={img} alt={title} style={{ width:'100%', height:'100%', objectFit:'cover', transition:'transform 0.6s', transform:hov?'scale(1.08)':'scale(1)' }} />
        <div style={{ position:'absolute', top:'10px', left:'10px', zIndex:10 }}><Badge type={badge} /></div>
        <button onClick={e=>{e.stopPropagation();setSaved(!saved)}}
          style={{ position:'absolute', top:'8px', right:'8px', zIndex:10, width:'32px', height:'32px', borderRadius:'50%', backgroundColor:'rgba(255,255,255,0.85)', border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}>
          <Heart size={14} fill={saved?'#ef4444':'none'} color={saved?'#ef4444':C.muted} />
        </button>
        {era && <div style={{ position:'absolute', bottom:'10px', right:'10px', zIndex:10, backgroundColor:'rgba(22,29,27,0.75)', color:'white', fontSize:'9px', ...CB, padding:'3px 8px', borderRadius:'5px' }}>{era}</div>}
        {condition && <div style={{ position:'absolute', bottom:'10px', left:'10px', zIndex:10, backgroundColor:'rgba(255,255,255,0.92)', padding:'3px 8px', borderRadius:'6px', fontSize:'9px', ...CB, color:C.mint, textTransform:'uppercase' as const }}>{condition}</div>}
      </div>
      <div style={{ padding:'16px 18px', flex:1, display:'flex', flexDirection:'column' as const }}>
        <p style={{ fontSize:'9px', ...CB, color:C.mint, textTransform:'uppercase' as const, letterSpacing:'0.1em', marginBottom:'2px' }}>{brand}</p>
        <h4 style={{ fontSize:'14px', ...CB, color:hov?C.mint:C.ink, marginBottom:'4px', transition:'color 0.2s', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' as const }}>{title}</h4>
        <p style={{ fontSize:'18px', ...CB, color:C.mint, marginBottom:'6px' }}>{price.toLocaleString()} MAD</p>
        {location && <p style={{ fontSize:'10px', color:C.muted, ...CB, display:'flex', alignItems:'center', gap:'3px', marginBottom:'12px' }}><MapPin size={10}/>{location}</p>}
        <div style={{ marginTop:'auto', display:'flex', gap:'8px' }}>
          <button style={{ flex:1, border:`2px solid ${C.ink}`, color:C.ink, backgroundColor:'transparent', padding:'9px', borderRadius:'12px', fontSize:'10px', ...CB, textTransform:'uppercase' as const, cursor:'pointer', transition:'all 0.15s' }}
            onMouseEnter={e=>{e.currentTarget.style.backgroundColor=C.ink;e.currentTarget.style.color='white'}}
            onMouseLeave={e=>{e.currentTarget.style.backgroundColor='transparent';e.currentTarget.style.color=C.ink}}
          >Message</button>
          <a href="https://wa.me/212600000000?text=Hi%2C%20I%20found%20your%20vintage%20listing%20on%20SouKni!" target="_blank" rel="noopener noreferrer"
            style={{ flex:1, backgroundColor:'#25D366', color:'white', border:'none', padding:'9px', borderRadius:'12px', fontSize:'10px', ...CB, textTransform:'uppercase' as const, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', gap:'4px', textDecoration:'none' }}>
            💬 WhatsApp
          </a>
        </div>
      </div>
    </article>
  )
}

function makeListings(cat: string, count: number) {
  const titleMap: Record<string,string[]> = {
    'all-vintage':  ['501 Selvedge 1980s','Carré Scarf 1970s','Tweed Jacket 1990s','Submariner 5513','Bamboo Bag 1950s','Wrap Dress 1970s','Nautilus 3700','Royal Oak A-Series','Art Deco Diamond Ring','Platform Boot 1970s','Mary Jane 1960s','Carré Silk Scarf','Shift Dress 1960s','Logo Belt 1990s','Tweed Suit 1980s','Campaign Poster'],
    'clothing':     ['501 Selvedge Denim','New Look Dress','Wrap Dress','Tweed Suit','Platform Dress','Palazzo Pants','Maxi Skirt','Shift Dress'],
    'accessories':  ['Carré Silk Scarf','Bamboo Handle Bag','Logo Belt','Chain Belt','Silk Turban','Leather Gloves'],
    'watches':      ['Submariner 5513','Nautilus 3700','Royal Oak A-Series','Santos Cartier','Speedmaster Pre-Moon','Calatrava Ref 96'],
    'jewelry':      ['Art Deco Diamond Ring','Retro Brooch','Cocktail Ring','Pearl Choker','Enamel Bracelet','Bakelite Bangle'],
    'shoes':        ['Platform Boot 1970s','Mary Jane 1960s','Ankle Strap Pump','Kitten Heel 1950s','Chelsea Boot 1960s','Wooden Clog 1970s'],
    'collectibles': ['Campaign Poster','Runway Piece','Press Sample','Limited Edition','Archive Sample','Exhibition Piece'],
  }
  const cat_data = CATEGORIES[cat] || CATEGORIES['all-vintage']
  const titles = titleMap[cat] || titleMap['all-vintage']
  const badges: BadgeT[] = ['certified','diamond','featured','new','certified','diamond']
  const locs  = ['Rabat, Agdal','Rabat, Souissi','Casablanca','Rabat, Hay Riad','Rabat, Centre']
  const conds = ['Excellent','Like New','Good','Very Good',undefined,undefined]
  return Array.from({length:count},(_,i)=>({
    brand:     cat_data.brands[i%cat_data.brands.length],
    title:     titles[i%titles.length],
    price:     400 + ((i*2131)%28000),
    location:  locs[i%locs.length],
    condition: conds[i%conds.length],
    era:       cat_data.eras[i%cat_data.eras.length],
    img:       VINTAGE_IMGS[i%VINTAGE_IMGS.length],
    badge:     badges[i%badges.length],
  }))
}


function DDrop({ label, value, options, open, setOpen, onChange }: any) {
  return (
    <div style={{ position:'relative', flex:1 }}>
      <button onClick={()=>setOpen(!open)}
        style={{ width:'100%', height:'100%', background:'none', border:'none', cursor:'pointer', padding:'0 22px', display:'flex', flexDirection:'column' as const, justifyContent:'center', textAlign:'left' as const }}>
        <span style={{ fontSize:'9px', fontFamily:'Inter,sans-serif', fontWeight:900, letterSpacing:'0.14em', textTransform:'uppercase' as const, color:'#6b7a76', marginBottom:'3px' }}>{label}</span>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
          <span style={{ fontSize:'14px', fontFamily:'Inter,sans-serif', fontWeight:900, color:'#161d1b' }}>{value}</span>
          <ChevronDown size={14} color="#22d4a8" style={{ flexShrink:0, transition:'transform 0.2s', transform:open?'rotate(180deg)':'rotate(0)' }} />
        </div>
      </button>
      {open && (
        <div onClick={e=>e.stopPropagation()} style={{ position:'absolute', top:'calc(100% + 8px)', left:0, minWidth:'220px', backgroundColor:'white', borderRadius:'20px', boxShadow:'0 20px 60px rgba(0,0,0,0.12)', border:'1px solid rgba(107,122,118,0.12)', zIndex:200, overflow:'hidden', padding:'8px 0' }}>
          {options.map((opt:string)=>(
            <button key={opt} onClick={()=>{ onChange(opt); setOpen(false) }}
              style={{ width:'100%', padding:'12px 20px', background:'none', border:'none', cursor:'pointer', textAlign:'left' as const, fontSize:'14px', fontFamily:'Inter,sans-serif', fontWeight:900, color:opt===value?'#22d4a8':'#161d1b', display:'flex', justifyContent:'space-between', alignItems:'center' }}
              onMouseEnter={e=>e.currentTarget.style.backgroundColor='#f4fbf8'}
              onMouseLeave={e=>e.currentTarget.style.backgroundColor='transparent'}
            >{opt}{opt===value&&<span style={{color:'#22d4a8'}}>✓</span>}</button>
          ))}
        </div>
      )}
    </div>
  )
}

export default function VintageCategoryPage() {
  const params   = useParams()
  const locale   = (params?.locale as string) || 'en'
  const catSlug  = (params?.category as string) || 'all-vintage'
  const catData  = CATEGORIES[catSlug] || CATEGORIES['all-vintage']

  const [activeSeller, setActiveSeller] = useState('All Sellers')
  const [diamond,      setDiamond     ] = useState(true)
  const [gridView,     setGridView    ] = useState(true)
  const [page,         setPage        ] = useState(1)
  const [keyword,      setKeyword     ] = useState('')
  const [city,         setCity        ] = useState('Rabat')
  const [price,        setPrice       ] = useState('Any Price')
  const [sortBy,       setSortBy      ] = useState('Most Recent')
  const [activeBrand,  setActiveBrand ] = useState('All Brands')
  const [activeEra,    setActiveEra   ] = useState('All Eras')
  const [cityOpen,     setCityOpen    ] = useState(false)
  const [priceOpen,    setPriceOpen   ] = useState(false)

  const listings = React.useMemo(() => {
    const all = makeListings(catSlug, 24)
    let items = all.filter(item => {
      const mk = keyword.trim()==='' || item.title.toLowerCase().includes(keyword.toLowerCase()) || item.brand.toLowerCase().includes(keyword.toLowerCase())
      const ma = activeEra==='All Eras' || item.era===activeEra
      const mb = activeBrand==='All Brands' || item.brand===activeBrand
      const ms = activeSeller==='All Sellers' || (item as any).seller===activeSeller
      const mp = (() => {
        if (price==='Any Price') return true
        const nums = price.replace(/MAD/g,'').split('–').map((s:string)=>parseInt(s.replace(/,/g,'').trim()))
        const [mn, mx] = price.includes('+') ? [nums[0], Infinity] : [nums[0], nums[1]]
        return item.price >= mn && item.price <= mx
      })()
      return mk && ma && mb && ms && mp
    })
    if (diamond) items = [...items].sort((a,b)=>{ const r=(x:string)=>x==='diamond'?2:x==='certified'?1:0; return r(b.badge)-r(a.badge) })
    if (sortBy==='Price: Low to High') items = [...items].sort((a,b)=>a.price-b.price)
    if (sortBy==='Price: High to Low') items = [...items].sort((a,b)=>b.price-a.price)
    return items
  }, [catSlug, keyword, activeEra, activeBrand, activeSeller, price, diamond, sortBy])
  const cities   = ['Rabat','Casablanca','Marrakech','Fès','Tanger','Agadir','Meknès']

  // DDrop defined outside component

  return (
    <div style={{ ...UB, backgroundColor:C.surface, color:C.ink, minHeight:'100vh' }}>

      {/* ══ HERO ══════════════════════════════════════════════ */}
      <section style={{ position:'relative', height:'360px', display:'flex', alignItems:'center', justifyContent:'center', overflow:'hidden' }}>
        <img src={catData.hero} alt={catData.label} style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover' }} />
        <div style={{ position:'absolute', inset:0, backgroundColor:'rgba(22,29,27,0.52)' }} />
        <div style={{ position:'relative', zIndex:10, textAlign:'center' as const, maxWidth:'860px', padding:'0 24px', width:'100%' }}>
          <p style={{ fontSize:'11px', ...UB, color:C.mint, textTransform:'uppercase' as const, letterSpacing:'0.2em', marginBottom:'12px' }}>FASHION › VINTAGE & THRIFT</p>
          <h1 style={{ fontSize:'clamp(32px,5vw,52px)', ...UB, color:'white', marginBottom:'16px', lineHeight:1.05, textShadow:'0 4px 20px rgba(0,0,0,0.4)' }}>
            {catData.emoji} {catData.label} in Rabat
          </h1>
          <p style={{ fontSize:'16px', color:'rgba(255,255,255,0.82)', marginBottom:'28px' }}>{catData.desc}</p>
          <div style={{ maxWidth:'620px', margin:'0 auto', backgroundColor:'rgba(255,255,255,0.12)', backdropFilter:'blur(12px)', border:'1px solid rgba(255,255,255,0.22)', borderRadius:'100px', padding:'6px', display:'flex', alignItems:'center', gap:'8px' }}>
            <div style={{ flex:1, display:'flex', alignItems:'center', gap:'8px', padding:'0 16px' }}>
              <Search size={16} color="rgba(255,255,255,0.7)" />
              <input type="text" value={keyword} onChange={e=>setKeyword(e.target.value)} placeholder={`Search ${catData.label}...`}
                style={{ flex:1, background:'none', border:'none', outline:'none', color:'white', fontSize:'14px', ...UB, fontFamily:'Inter,sans-serif' }} />
            </div>
            <button style={{ backgroundColor:C.mint, color:C.ink, border:'none', padding:'12px 28px', borderRadius:'100px', fontSize:'11px', ...UB, textTransform:'uppercase' as const, letterSpacing:'0.1em', cursor:'pointer' }}>SEARCH</button>
          </div>
        </div>
      </section>

      {/* ══ FILTER BAR ════════════════════════════════════════ */}
      <div style={{ maxWidth:'1280px', margin:'-36px auto 0', padding:'0 24px', position:'relative', zIndex:30 }}>
        <div style={{ backgroundColor:'rgba(255,255,255,0.97)', backdropFilter:'blur(16px)', border:'1px solid rgba(107,122,118,0.12)', borderRadius:'100px', boxShadow:'0 12px 40px rgba(0,0,0,0.08)', display:'flex', alignItems:'stretch', height:'68px', overflow:'visible' }}>
          <DDrop label="CITY" value={city} options={cities} open={cityOpen} setOpen={setCityOpen} onChange={setCity} />
          <div style={{ width:'1px', backgroundColor:'rgba(107,122,118,0.12)', margin:'12px 0' }} />
          <div style={{ flex:1.8, padding:'0 22px', display:'flex', flexDirection:'column' as const, justifyContent:'center' }}>
            <span style={{ fontSize:'9px', ...UB, textTransform:'uppercase' as const, letterSpacing:'0.14em', color:C.muted, marginBottom:'3px' }}>KEYWORD</span>
            <div style={{ display:'flex', alignItems:'center', gap:'8px' }}>
              <Search size={13} color={C.muted} />
              <input type="text" value={keyword} onChange={e=>setKeyword(e.target.value)} placeholder={`e.g. ${catData.brands[0]}, 1970s...`}
                style={{ flex:1, background:'none', border:'none', outline:'none', fontSize:'14px', ...UB, color:C.ink, fontFamily:'Inter,sans-serif' }} />
              {keyword && <button onClick={()=>setKeyword('')} style={{ background:'none', border:'none', cursor:'pointer', color:C.muted, fontSize:'16px' }}>✕</button>}
            </div>
          </div>
          <div style={{ width:'1px', backgroundColor:'rgba(107,122,118,0.12)', margin:'12px 0' }} />
          <DDrop label="PRICE (MAD)" value={price} options={catData.priceRanges} open={priceOpen} setOpen={setPriceOpen} onChange={setPrice} />
          <div style={{ width:'1px', backgroundColor:'rgba(107,122,118,0.12)', margin:'12px 0' }} />
          <button style={{ display:'flex', alignItems:'center', gap:'10px', padding:'0 28px', background:'none', border:'none', cursor:'pointer', borderRadius:'0 100px 100px 0', transition:'background 0.15s', flexShrink:0 }}
            onMouseEnter={e=>e.currentTarget.style.backgroundColor=`${C.mint}14`}
            onMouseLeave={e=>e.currentTarget.style.backgroundColor='transparent'}
          >
            <SlidersHorizontal size={18} color={C.mint} />
            <span style={{ fontSize:'14px', ...UB, color:C.ink }}>Filters</span>
          </button>
        </div>
      </div>

      <main style={{ maxWidth:'1280px', margin:'0 auto', padding:'32px 24px 80px' }}>

        {/* ══ BREADCRUMB ════════════════════════════════════════ */}
        <nav style={{ display:'flex', alignItems:'center', gap:'6px', fontSize:'10px', ...UB, color:C.muted, textTransform:'uppercase' as const, letterSpacing:'0.12em', marginBottom:'12px' }}>
          {[
            { label:'Rabat',            href:`/${locale}` },
            { label:'Fashion',          href:`/${locale}/fashion` },
            { label:'Vintage & Thrift', href:`/${locale}/fashion/vintage` },
            { label:catData.label,      href:null },
          ].map((c,i,arr)=>(
            <span key={c.label} style={{ display:'flex', alignItems:'center', gap:'6px' }}>
              {c.href
                ? <Link href={c.href} style={{ color:C.muted, textDecoration:'none', transition:'color 0.15s' }}
                    onMouseEnter={e=>e.currentTarget.style.color=C.mint}
                    onMouseLeave={e=>e.currentTarget.style.color=C.muted}
                  >{c.label}</Link>
                : <span style={{ color:C.ink }}>{c.label}</span>}
              {i<arr.length-1 && <span style={{ opacity:0.4 }}>›</span>}
            </span>
          ))}
        </nav>

        {/* ══ TITLE + SORT ══════════════════════════════════════ */}
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', gap:'16px', marginBottom:'24px', flexWrap:'wrap' as const }}>
          <div>
            <h2 style={{ fontSize:'clamp(20px,2.5vw,28px)', ...UB, color:C.ink, marginBottom:'4px' }}>{catData.label} for Sale in Rabat</h2>
            <p style={{ fontSize:'14px', color:C.mint, ...CB }}>{catData.count} Ads</p>
          </div>
          <div style={{ display:'flex', gap:'10px', alignItems:'center' }}>
            <select value={sortBy} onChange={e=>setSortBy(e.target.value)}
              style={{ backgroundColor:'white', border:'1px solid rgba(107,122,118,0.18)', padding:'9px 16px', borderRadius:'12px', fontSize:'10px', ...UB, textTransform:'uppercase' as const, letterSpacing:'0.1em', cursor:'pointer', color:C.ink, outline:'none' }}>
              {['Most Recent','Price: Low to High','Price: High to Low','Oldest First','Newest Era'].map(s=><option key={s}>{s}</option>)}
            </select>
            <button style={{ backgroundColor:'white', border:'1px solid rgba(107,122,118,0.18)', padding:'9px 16px', borderRadius:'12px', fontSize:'10px', ...UB, textTransform:'uppercase' as const, letterSpacing:'0.1em', cursor:'pointer', color:C.ink }}>🔖 Save Search</button>
          </div>
        </div>

        {/* ══ SUB-CATEGORY PILLS ════════════════════════════════ */}
        <div style={{ display:'flex', gap:'10px', flexWrap:'wrap' as const, marginBottom:'20px' }}>
          {ALL_CATS.map(cat=>(
            <Link key={cat.slug} href={`/${locale}/fashion/vintage/${cat.slug}`}
              style={{ padding:'10px 22px', borderRadius:'100px', fontSize:'11px', ...UB, textTransform:'uppercase' as const, letterSpacing:'0.1em', cursor:'pointer', transition:'all 0.2s', border:'1px solid', textDecoration:'none', display:'inline-block',
                backgroundColor: catSlug===cat.slug ? C.mint  : 'white',
                color:           catSlug===cat.slug ? C.ink   : C.muted,
                borderColor:     catSlug===cat.slug ? C.mint  : 'rgba(186,202,197,0.4)',
              }}
              onMouseEnter={e=>{if(catSlug!==cat.slug){e.currentTarget.style.borderColor=C.mint;e.currentTarget.style.color=C.ink}}}
              onMouseLeave={e=>{if(catSlug!==cat.slug){e.currentTarget.style.borderColor='rgba(186,202,197,0.4)';e.currentTarget.style.color=C.muted}}}
            >{cat.emoji} {cat.label}</Link>
          ))}
        </div>

        {/* ══ SELLER TABS + DIAMOND ══════════════════════════════ */}
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap' as const, gap:'14px', marginBottom:'20px' }}>
          <div style={{ display:'flex', gap:'4px', padding:'5px', backgroundColor:'#e8efec', borderRadius:'100px' }}>
            {['All Sellers','SouKni Members','SouKni Pro'].map(tab=>(
              <button key={tab} onClick={()=>setActiveSeller(tab)}
                style={{ padding:'10px 24px', borderRadius:'100px', fontSize:'11px', ...UB, textTransform:'uppercase' as const, letterSpacing:'0.1em', cursor:'pointer', border:'none', transition:'all 0.2s',
                  backgroundColor: activeSeller===tab ? C.ink   : 'transparent',
                  color:           activeSeller===tab ? 'white' : C.muted,
                  boxShadow:       activeSeller===tab ? '0 2px 8px rgba(0,0,0,0.15)' : 'none',
                }}
              >{tab}</button>
            ))}
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:'12px', cursor:'pointer' }} onClick={()=>setDiamond(!diamond)}>
            <span style={{ fontSize:'10px', ...UB, color:C.muted, textTransform:'uppercase' as const, letterSpacing:'0.1em' }}>Show SouKni Diamond Certified First</span>
            <div style={{ width:'52px', height:'26px', borderRadius:'100px', backgroundColor:diamond?C.mint:'rgba(107,122,118,0.25)', position:'relative', transition:'background 0.25s' }}>
              <div style={{ position:'absolute', top:'3px', left:diamond?'29px':'3px', width:'20px', height:'20px', borderRadius:'50%', backgroundColor:C.ink, transition:'left 0.25s' }} />
            </div>
          </div>
        </div>

        {/* ══ NEW ARRIVALS + GRID TOGGLE ════════════════════════ */}
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'32px' }}>
          <div style={{ display:'flex', gap:'10px' }}>
            {['✨ New Arrivals','📉 Price Drop Alert'].map(btn=>(
              <button key={btn}
                style={{ display:'flex', alignItems:'center', gap:'6px', padding:'9px 18px', borderRadius:'100px', border:'1px solid rgba(107,122,118,0.2)', backgroundColor:'transparent', fontSize:'12px', ...UB, cursor:'pointer', color:C.muted, transition:'all 0.15s' }}
                onMouseEnter={e=>{e.currentTarget.style.borderColor=C.mint;e.currentTarget.style.color=C.ink;e.currentTarget.style.backgroundColor=`${C.mint}0a`}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor='rgba(107,122,118,0.2)';e.currentTarget.style.color=C.muted;e.currentTarget.style.backgroundColor='transparent'}}
              >{btn}</button>
            ))}
          </div>
          <div style={{ display:'flex', gap:'4px', padding:'4px', backgroundColor:'white', borderRadius:'12px', border:'1px solid rgba(107,122,118,0.12)' }}>
            <button onClick={()=>setGridView(true)}  style={{ width:'36px', height:'36px', borderRadius:'8px', border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'17px', backgroundColor:gridView?C.ink:'transparent', color:gridView?'white':C.muted, transition:'all 0.2s' }}>⊞</button>
            <button onClick={()=>setGridView(false)} style={{ width:'36px', height:'36px', borderRadius:'8px', border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'17px', backgroundColor:!gridView?C.ink:'transparent', color:!gridView?'white':C.muted, transition:'all 0.2s' }}>☰</button>
          </div>
        </div>

        {/* ══ ERA FILTER (unique to vintage) ════════════════════ */}
        <div style={{ backgroundColor:'white', borderRadius:'20px', padding:'20px 24px', marginBottom:'16px', border:'1px solid rgba(107,122,118,0.1)', boxShadow:'0 2px 8px rgba(0,0,0,0.04)' }}>
          <p style={{ fontSize:'9px', ...UB, color:C.muted, textTransform:'uppercase' as const, letterSpacing:'0.14em', marginBottom:'12px' }}>FILTER BY ERA</p>
          <div style={{ display:'flex', gap:'8px', flexWrap:'wrap' as const }}>
            <button onClick={()=>setActiveEra('All Eras')}
              style={{ padding:'7px 16px', borderRadius:'100px', fontSize:'10px', ...UB, border:`1px solid`, cursor:'pointer', transition:'all 0.15s',
                backgroundColor: activeEra==='All Eras'?C.mint:'transparent',
                color:           activeEra==='All Eras'?C.ink:C.muted,
                borderColor:     activeEra==='All Eras'?C.mint:'rgba(107,122,118,0.2)',
              }}>All Eras</button>
            {catData.eras.map(era=>(
              <button key={era} onClick={()=>setActiveEra(era)}
                style={{ padding:'7px 16px', borderRadius:'100px', fontSize:'10px', ...UB, border:`1px solid`, cursor:'pointer', transition:'all 0.15s',
                  backgroundColor: activeEra===era?C.mint:'transparent',
                  color:           activeEra===era?C.ink:C.muted,
                  borderColor:     activeEra===era?C.mint:'rgba(107,122,118,0.2)',
                }}
                onMouseEnter={e=>{if(activeEra!==era){e.currentTarget.style.borderColor=C.mint;e.currentTarget.style.color=C.ink}}}
                onMouseLeave={e=>{if(activeEra!==era){e.currentTarget.style.borderColor='rgba(107,122,118,0.2)';e.currentTarget.style.color=C.muted}}}
              >{era}</button>
            ))}
          </div>
        </div>

        {/* ══ BRAND FILTER ══════════════════════════════════════ */}
        <div style={{ backgroundColor:'white', borderRadius:'20px', padding:'20px 24px', marginBottom:'32px', border:'1px solid rgba(107,122,118,0.1)', boxShadow:'0 2px 8px rgba(0,0,0,0.04)' }}>
          <p style={{ fontSize:'9px', ...UB, color:C.muted, textTransform:'uppercase' as const, letterSpacing:'0.14em', marginBottom:'12px' }}>FILTER BY BRAND</p>
          <div style={{ display:'flex', gap:'8px', flexWrap:'wrap' as const }}>
            <button onClick={()=>setActiveBrand('All Brands')}
              style={{ padding:'7px 16px', borderRadius:'100px', fontSize:'10px', ...UB, border:`1px solid`, cursor:'pointer', transition:'all 0.15s',
                backgroundColor: activeBrand==='All Brands'?C.mint:'transparent',
                color:           activeBrand==='All Brands'?C.ink:C.muted,
                borderColor:     activeBrand==='All Brands'?C.mint:'rgba(107,122,118,0.2)',
              }}>All Brands</button>
            {catData.brands.map(brand=>(
              <button key={brand} onClick={()=>setActiveBrand(brand)}
                style={{ padding:'7px 16px', borderRadius:'100px', fontSize:'10px', ...UB, border:`1px solid`, cursor:'pointer', transition:'all 0.15s',
                  backgroundColor: activeBrand===brand?C.mint:'transparent',
                  color:           activeBrand===brand?C.ink:C.muted,
                  borderColor:     activeBrand===brand?C.mint:'rgba(107,122,118,0.2)',
                }}
                onMouseEnter={e=>{if(activeBrand!==brand){e.currentTarget.style.borderColor=C.mint;e.currentTarget.style.color=C.ink}}}
                onMouseLeave={e=>{if(activeBrand!==brand){e.currentTarget.style.borderColor='rgba(107,122,118,0.2)';e.currentTarget.style.color=C.muted}}}
              >{brand}</button>
            ))}
          </div>
        </div>

        {/* ══ LISTINGS GRID ═════════════════════════════════════ */}
        <section style={{ marginBottom:'48px' }}>
          <p style={{ fontSize:'13px', color:C.muted, ...CB, marginBottom:'20px' }}>Showing {listings.length} of {catData.count} results</p>
          {gridView ? (
            <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'20px' }}>
              {listings.map((item,i)=><ListingCard key={i} {...item} />)}
            </div>
          ) : (
            <div style={{ display:'flex', flexDirection:'column' as const, gap:'14px' }}>
              {listings.map((item,j)=>(
                <div key={j} style={{ display:'flex', backgroundColor:'white', borderRadius:'20px', border:'1px solid rgba(107,122,118,0.1)', overflow:'hidden', height:'140px' }}>
                  <img src={item.img} alt={item.title} style={{ width:'140px', height:'100%', objectFit:'cover' as const, flexShrink:0 }} />
                  <div style={{ flex:1, padding:'16px 20px', display:'flex', flexDirection:'column' as const, justifyContent:'space-between' }}>
                    <div>
                      <p style={{ fontSize:'9px', fontFamily:"'Hanken Grotesk',sans-serif", fontWeight:900, color:'#22d4a8', textTransform:'uppercase' as const }}>{item.brand} · {item.era}</p>
                      <h4 style={{ fontSize:'15px', fontFamily:"'Hanken Grotesk',sans-serif", fontWeight:900, color:'#161d1b' }}>{item.title}</h4>
                    </div>
                    <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                      <p style={{ fontSize:'18px', fontFamily:"'Hanken Grotesk',sans-serif", fontWeight:900, color:'#22d4a8' }}>{item.price.toLocaleString()} MAD</p>
                      <div style={{ display:'flex', gap:'8px' }}>
                        <button style={{ padding:'8px 16px', borderRadius:'10px', border:'1px solid #161d1b', backgroundColor:'transparent', color:'#161d1b', fontSize:'10px', cursor:'pointer' }}>Message</button>
                        <button style={{ padding:'8px 16px', borderRadius:'10px', border:'none', backgroundColor:'#25D366', color:'white', fontSize:'10px', cursor:'pointer' }}>WhatsApp</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* ══ PAGINATION ════════════════════════════════════════ */}
        <div style={{ display:'flex', justifyContent:'center', alignItems:'center', gap:'10px', marginBottom:'64px' }}>
          <button style={{ width:'44px', height:'44px', borderRadius:'12px', backgroundColor:'white', border:'1px solid rgba(107,122,118,0.12)', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', color:C.muted }}><ChevronLeft size={18} /></button>
          {[1,2,3,4,5].map(p=>(
            <button key={p} onClick={()=>setPage(p)}
              style={{ width:'44px', height:'44px', borderRadius:'12px', cursor:'pointer', fontSize:'15px', ...UB, border:'1px solid', transition:'all 0.2s',
                backgroundColor: page===p?C.mint:'white', color:page===p?C.ink:C.muted, borderColor:page===p?C.mint:'rgba(107,122,118,0.12)',
              }}
            >{p}</button>
          ))}
          <span style={{ color:C.muted }}>…</span>
          <button style={{ width:'44px', height:'44px', borderRadius:'12px', backgroundColor:'white', border:'1px solid rgba(107,122,118,0.12)', cursor:'pointer', fontSize:'15px', ...UB, color:C.muted }}>10</button>
          <button style={{ width:'44px', height:'44px', borderRadius:'12px', backgroundColor:'white', border:'1px solid rgba(107,122,118,0.12)', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', color:C.muted }}><ChevronRight size={18} /></button>
        </div>

        {/* ══ EXPLORE OTHER CATEGORIES ══════════════════════════ */}
        <section style={{ marginBottom:'48px' }}>
          <h3 style={{ fontSize:'clamp(18px,2.5vw,24px)', ...UB, color:C.ink, textTransform:'uppercase' as const, marginBottom:'20px' }}>Explore Other Vintage Categories</h3>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(6,1fr)', gap:'14px' }}>
            {ALL_CATS.filter(c=>c.slug!==catSlug).map(cat=>(
              <Link key={cat.slug} href={`/${locale}/fashion/vintage/${cat.slug}`}
                style={{ backgroundColor:'white', borderRadius:'20px', padding:'20px 16px', textAlign:'center' as const, border:'1px solid rgba(107,122,118,0.1)', textDecoration:'none', transition:'all 0.2s', display:'block' }}
                onMouseEnter={e=>{e.currentTarget.style.borderColor=C.mint;e.currentTarget.style.boxShadow=`0 8px 24px ${C.mint}18`}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor='rgba(107,122,118,0.1)';e.currentTarget.style.boxShadow='none'}}
              >
                <p style={{ fontSize:'24px', marginBottom:'6px' }}>{cat.emoji}</p>
                <p style={{ fontSize:'10px', ...UB, color:C.ink, textTransform:'uppercase' as const, letterSpacing:'0.08em' }}>{cat.label}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* ══ BACK TO ALL VINTAGE ════════════════════════════════ */}
        <div style={{ textAlign:'center' as const }}>
          <Link href={`/${locale}/fashion/vintage`}
            style={{ display:'inline-flex', alignItems:'center', gap:'8px', padding:'16px 40px', borderRadius:'100px', backgroundColor:C.ink, color:'white', textDecoration:'none', fontSize:'12px', ...UB, textTransform:'uppercase' as const, letterSpacing:'0.1em', transition:'background 0.2s' }}
            onMouseEnter={e=>e.currentTarget.style.backgroundColor=C.mint}
            onMouseLeave={e=>e.currentTarget.style.backgroundColor=C.ink}
          >← Back to All Vintage</Link>
        </div>
      </main>
    </div>
  )
}
