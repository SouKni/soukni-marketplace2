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
  brands:string[]; priceRanges:string[]; emoji:string; styles:string[]
}> = {
  'all-bags': {
    label:'All Bags', emoji:'👜',
    hero:'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&w=1600',
    desc:'Browse the complete SouKni bags and handbags collection.',
    count:'3,840', styles:['Handbag','Shoulder Bag','Crossbody','Tote','Clutch','Backpack','Mini Bag'],
    brands:['Louis Vuitton','Chanel','Gucci','Hermes','Prada','Dior','Coach','Michael Kors'],
    priceRanges:['Any Price','0 – 500 MAD','500 – 2,000 MAD','2,000 – 8,000 MAD','8,000 – 30,000 MAD','30,000+ MAD'],
  },
  'handbags': {
    label:'Handbags', emoji:'👛',
    hero:'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&w=1600',
    desc:'Top-handle and structured handbags from the world\'s most iconic maisons.',
    count:'1,240', styles:['Structured','Top Handle','Satchel','Doctor Bag','Kelly','Birkin'],
    brands:['Hermes','Chanel','Dior','Gucci','Prada','Celine','Bottega Veneta','Loewe'],
    priceRanges:['Any Price','0 – 2,000 MAD','2,000 – 8,000 MAD','8,000 – 30,000 MAD','30,000+ MAD'],
  },
  'shoulder-bags': {
    label:'Shoulder Bags', emoji:'🎒',
    hero:'https://images.pexels.com/photos/3731256/pexels-photo-3731256.jpeg?auto=compress&w=1600',
    desc:'Shoulder bags and chain bags for every occasion.',
    count:'980', styles:['Chain Bag','Flap Bag','Hobo','Bucket','Drawstring','Half-Moon'],
    brands:['Chanel','Saint Laurent','Gucci','Balenciaga','Givenchy','Alexander McQueen','Valentino'],
    priceRanges:['Any Price','0 – 1,500 MAD','1,500 – 6,000 MAD','6,000 – 20,000 MAD','20,000+ MAD'],
  },
  'crossbody': {
    label:'Crossbody', emoji:'💼',
    hero:'https://images.pexels.com/photos/904350/pexels-photo-904350.jpeg?auto=compress&w=1600',
    desc:'Crossbody and messenger bags for hands-free style.',
    count:'720', styles:['Mini Crossbody','Messenger','Belt Bag','Camera Bag','Phone Bag','Saddle Bag'],
    brands:['Dior','Gucci','Louis Vuitton','Fendi','Coach','Kate Spade','Jacquemus','Chloe'],
    priceRanges:['Any Price','0 – 1,000 MAD','1,000 – 4,000 MAD','4,000 – 12,000 MAD','12,000+ MAD'],
  },
  'totes': {
    label:'Totes', emoji:'🛍️',
    hero:'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&w=1600',
    desc:'Spacious tote bags for work, travel and everyday luxury.',
    count:'540', styles:['Open Tote','Zip Tote','Shopper','Canvas Tote','Leather Tote','Woven'],
    brands:['Louis Vuitton','Goyard','Celine','Longchamp','Bottega Veneta','Loro Piana','Hermes','Prada'],
    priceRanges:['Any Price','0 – 800 MAD','800 – 3,000 MAD','3,000 – 10,000 MAD','10,000+ MAD'],
  },
  'clutches': {
    label:'Clutches', emoji:'💅',
    hero:'https://images.pexels.com/photos/3731256/pexels-photo-3731256.jpeg?auto=compress&w=1600',
    desc:'Evening clutches and minaudieres for special occasions.',
    count:'320', styles:['Evening Clutch','Minaudiere','Envelope','Box Clutch','Wristlet','Pochette'],
    brands:['Judith Leiber','Chanel','Saint Laurent','Jimmy Choo','Roger Vivier','Valentino','Gucci'],
    priceRanges:['Any Price','0 – 500 MAD','500 – 2,000 MAD','2,000 – 8,000 MAD','8,000+ MAD'],
  },
  'luxury': {
    label:'Luxury', emoji:'💎',
    hero:'https://images.pexels.com/photos/904350/pexels-photo-904350.jpeg?auto=compress&w=1600',
    desc:'Ultra-luxury authenticated bags — Hermes, Chanel, and beyond.',
    count:'184', styles:['Birkin','Kelly','Constance','Classic Flap','2.55','Timeless'],
    brands:['Hermes','Chanel','Louis Vuitton','Goyard','Bottega Veneta','Loro Piana','Brunello Cucinelli'],
    priceRanges:['Any Price','10,000 – 30,000 MAD','30,000 – 80,000 MAD','80,000 – 200,000 MAD','200,000+ MAD'],
  },
}

const ALL_CATS = [
  { label:'All Bags',     slug:'all-bags',     emoji:'👜' },
  { label:'Handbags',     slug:'handbags',      emoji:'👛' },
  { label:'Shoulder Bags',slug:'shoulder-bags', emoji:'🎒' },
  { label:'Crossbody',    slug:'crossbody',     emoji:'💼' },
  { label:'Totes',        slug:'totes',         emoji:'🛍️' },
  { label:'Clutches',     slug:'clutches',      emoji:'💅' },
  { label:'Luxury',       slug:'luxury',        emoji:'💎' },
]

const BAG_IMGS = [
  'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&w=400',
  'https://images.pexels.com/photos/3731256/pexels-photo-3731256.jpeg?auto=compress&w=400',
  'https://images.pexels.com/photos/904350/pexels-photo-904350.jpeg?auto=compress&w=400',
  'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&w=400',
  'https://images.pexels.com/photos/3731256/pexels-photo-3731256.jpeg?auto=compress&w=400',
]

type BadgeT = 'certified'|'diamond'|'featured'|'new'
function Badge({ type }: { type: BadgeT }) {
  const map: Record<BadgeT,{bg:string;color:string;label:string}> = {
    certified:{ bg:C.mint,   color:C.ink,  label:'SouKni Certified' },
    diamond:  { bg:C.ink,    color:C.mint, label:'◆ DIAMOND'        },
    featured: { bg:'#fbbf24',color:C.ink,  label:'Featured'         },
    new:      { bg:C.mint,   color:'white',label:'New Arrival'       },
  }
  const s = map[type]
  return (
    <span style={{ backgroundColor:s.bg, color:s.color, fontSize:'8px', ...CB, padding:'4px 10px', borderRadius:'6px', textTransform:'uppercase' as const, letterSpacing:'0.08em', display:'inline-block', boxShadow:'0 2px 6px rgba(0,0,0,0.15)', whiteSpace:'nowrap' as const }}>
      {s.label}
    </span>
  )
}

function ListingCard({ brand, title, price, location, condition, img, badge, style }: any) {
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
        {style && <div style={{ position:'absolute', bottom:'10px', right:'10px', zIndex:10, backgroundColor:'rgba(22,29,27,0.75)', color:'white', fontSize:'9px', ...CB, padding:'3px 8px', borderRadius:'5px' }}>{style}</div>}
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
          <a href="https://wa.me/212600000000" target="_blank" rel="noopener noreferrer"
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
    'all-bags':     ['Neverfull MM Monogram','Classic Flap Medium','Birkin 30 Togo','Dionysus GG Supreme','Galleria Saffiano','Lady Dior Medium'],
    'handbags':     ['Birkin 30 Togo Leather','Kelly 28 Sellier','Constance 24','Roulis Mini','Picotin Lock 18','Garden Party 36'],
    'shoulder-bags':['Classic Flap Medium','2.55 Reissue','Timeless CC Flap','Boy Bag Medium','WOC Wallet on Chain','19 Bag Large'],
    'crossbody':    ['Saddle Bag Mini','Montaigne BB','Pochette Metis','Nano Speedy','Cleo Chain Bag','On The Go PM'],
    'totes':        ['Neverfull MM','Neverfull GM','Cabas Chanel','Shopping Tote GST','Large Tote','Open Box Tote'],
    'clutches':     ['Evening Minaudiere','Pochette Accessoires','WOC Gold Chain','Envelope Clutch','Box Clutch Evening','Crystal Minaudiere'],
    'luxury':       ['Birkin 25 Crocodile','Kelly 20 Mini','Constance Slim','Birkin 35 HSS','Kelly 32 Sellier','Birkin 30 Ostrich'],
  }
  const cat_data = CATEGORIES[cat] || CATEGORIES['all-bags']
  const titles   = titleMap[cat] || titleMap['all-bags']
  const badges: BadgeT[] = ['certified','diamond','featured','new','certified','diamond']
  const locs  = ['Rabat, Agdal','Rabat, Souissi','Casablanca','Rabat, Hay Riad','Marrakech, Gueliz']
  const conds = ['Excellent','Like New','Good','Very Good',undefined,undefined]
  return Array.from({length:count},(_,i)=>({
    brand:     cat_data.brands[i%cat_data.brands.length],
    title:     titles[i%titles.length],
    price:     800 + ((i*2131)%45000),
    location:  locs[i%locs.length],
    condition: conds[i%conds.length],
    style:     cat_data.styles[i%cat_data.styles.length],
    img:       BAG_IMGS[i%BAG_IMGS.length],
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

export default function BagsCategoryPage() {
  const params   = useParams()
  const locale   = (params?.locale   as string) || 'en'
  const catSlug  = (params?.category as string) || 'all-bags'
  const catData  = CATEGORIES[catSlug] || CATEGORIES['all-bags']

  const [activeSeller, setActiveSeller] = useState('All Sellers')
  const [diamond,      setDiamond     ] = useState(true)
  const [gridView,     setGridView    ] = useState(true)
  const [page,         setPage        ] = useState(1)
  const [keyword,      setKeyword     ] = useState('')
  const [city,         setCity        ] = useState('Rabat')
  const [price,        setPrice       ] = useState('Any Price')
  const [sortBy,       setSortBy      ] = useState('Most Recent')
  const [activeBrand,  setActiveBrand ] = useState('All Brands')
  const [activeStyle,  setActiveStyle ] = useState('All Styles')
  const [cityOpen,     setCityOpen    ] = useState(false)
  const [priceOpen,    setPriceOpen   ] = useState(false)
  const [showNew,      setShowNew     ] = useState(false)
  const [showDrop,     setShowDrop    ] = useState(false)

  const cities = ['Rabat','Casablanca','Marrakech','Fes','Tanger','Agadir','Meknes']

  function parsePriceRange(range: string): [number, number] {
    if (range === 'Any Price') return [0, Infinity]
    const nums = range.replace(/MAD/g,'').split('–').map(s=>parseInt(s.replace(/,/g,'').trim()))
    if (range.includes('+')) return [nums[0], Infinity]
    return [nums[0], nums[1]]
  }
  const [minP, maxP] = parsePriceRange(price)

  const listings = useMemo(() => {
    const allListings = makeListings(catSlug, 24)
    let items = allListings.filter(item => {
      const mk = keyword.trim()==='' || item.title.toLowerCase().includes(keyword.toLowerCase()) || item.brand.toLowerCase().includes(keyword.toLowerCase())
      const mp = item.price >= minP && item.price <= maxP
      const mb = activeBrand==='All Brands' || item.brand===activeBrand
      const ms = activeStyle==='All Styles' || item.style===activeStyle
      return mk && mp && mb && ms
    })
    if (diamond) items = [...items].sort((a,b)=>{ const r=(x:string)=>x==='diamond'?2:x==='certified'?1:0; return r(b.badge)-r(a.badge) })
    if (sortBy==='Price: Low to High') items = [...items].sort((a,b)=>a.price-b.price)
    if (sortBy==='Price: High to Low') items = [...items].sort((a,b)=>b.price-a.price)
    return items
  }, [catSlug, keyword, minP, maxP, activeBrand, activeStyle, diamond, sortBy])

  // DDrop is defined outside the component above

  return (
    <div style={{ ...UB, backgroundColor:C.surface, color:C.ink, minHeight:'100vh' }}>

      {/* ══ HERO ══════════════════════════════════════════════ */}
      <section style={{ position:'relative', height:'360px', display:'flex', alignItems:'center', justifyContent:'center', overflow:'hidden' }}>
        <img src={catData.hero} alt={catData.label} style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover' }} />
        <div style={{ position:'absolute', inset:0, backgroundColor:'rgba(22,29,27,0.52)' }} />
        <div style={{ position:'relative', zIndex:10, textAlign:'center' as const, maxWidth:'860px', padding:'0 24px', width:'100%' }}>
          <p style={{ fontSize:'11px', ...UB, color:C.mint, textTransform:'uppercase' as const, letterSpacing:'0.2em', marginBottom:'12px' }}>FASHION › BAGS & HANDBAGS</p>
          <h1 style={{ fontSize:'clamp(32px,5vw,52px)', ...UB, color:'white', marginBottom:'16px', lineHeight:1.05, textShadow:'0 4px 20px rgba(0,0,0,0.4)' }}>
            {catData.emoji} {catData.label} in Rabat
          </h1>
          <p style={{ fontSize:'16px', color:'rgba(255,255,255,0.82)', marginBottom:'28px' }}>{catData.desc}</p>
          <div style={{ maxWidth:'620px', margin:'0 auto', backgroundColor:'rgba(255,255,255,0.12)', backdropFilter:'blur(12px)', border:'1px solid rgba(255,255,255,0.22)', borderRadius:'100px', padding:'6px', display:'flex', alignItems:'center', gap:'8px' }}>
            <div style={{ flex:1, display:'flex', alignItems:'center', gap:'8px', padding:'0 16px' }}>
              <Search size={16} color="rgba(255,255,255,0.7)" />
              <input type="text" value={keyword} onChange={e=>setKeyword(e.target.value)} placeholder={`Search ${catData.label}...`}
                autoComplete="off"
                style={{ flex:1, background:'none', border:'none', outline:'none', color:'white', fontSize:'14px', ...UB, fontFamily:'Inter,sans-serif' }} />
              {keyword && <button onClick={()=>setKeyword('')} style={{ background:'none', border:'none', cursor:'pointer', color:'rgba(255,255,255,0.6)', fontSize:'16px' }}>✕</button>}
            </div>
            <button style={{ backgroundColor:C.mint, color:C.ink, border:'none', padding:'12px 28px', borderRadius:'100px', fontSize:'11px', ...UB, textTransform:'uppercase' as const, letterSpacing:'0.1em', cursor:'pointer', transition:'filter 0.15s' }}
              onMouseEnter={e=>e.currentTarget.style.filter='brightness(1.08)'}
              onMouseLeave={e=>e.currentTarget.style.filter='brightness(1)'}
            >SEARCH</button>
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
              <input type="text" value={keyword} onChange={e=>setKeyword(e.target.value)} placeholder={`e.g. ${catData.brands[0]}, ${catData.styles[0]}...`}
                autoComplete="off"
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
            { label:'Rabat',        href:`/${locale}` },
            { label:'Fashion',      href:`/${locale}/fashion` },
            { label:'Bags',         href:`/${locale}/fashion/bags` },
            { label:catData.label,  href:null },
          ].map((c,i,arr)=>(
            <span key={c.label} style={{ display:'flex', alignItems:'center', gap:'6px' }}>
              {c.href
                ? <Link href={c.href} style={{ color:C.muted, textDecoration:'none' }}
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
            <p style={{ fontSize:'14px', color:C.mint, ...CB }}>{listings.length} of {catData.count} Ads</p>
          </div>
          <div style={{ display:'flex', gap:'10px', alignItems:'center' }}>
            <select value={sortBy} onChange={e=>setSortBy(e.target.value)}
              style={{ backgroundColor:'white', border:'1px solid rgba(107,122,118,0.18)', padding:'9px 16px', borderRadius:'12px', fontSize:'10px', ...UB, textTransform:'uppercase' as const, letterSpacing:'0.1em', cursor:'pointer', color:C.ink, outline:'none' }}>
              {['Most Recent','Price: Low to High','Price: High to Low','Most Popular'].map(s=><option key={s}>{s}</option>)}
            </select>
            <button style={{ backgroundColor:'white', border:'1px solid rgba(107,122,118,0.18)', padding:'9px 16px', borderRadius:'12px', fontSize:'10px', ...UB, textTransform:'uppercase' as const, letterSpacing:'0.1em', cursor:'pointer', color:C.ink }}>🔖 Save Search</button>
          </div>
        </div>

        {/* ══ CATEGORY PILLS ════════════════════════════════════ */}
        <div style={{ display:'flex', gap:'10px', flexWrap:'wrap' as const, marginBottom:'20px' }}>
          {ALL_CATS.map(cat=>(
            <Link key={cat.slug} href={`/${locale}/fashion/bags/${cat.slug}`}
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
            <button onClick={()=>setShowNew(!showNew)}
              style={{ display:'flex', alignItems:'center', gap:'6px', padding:'9px 18px', borderRadius:'100px', border:`1px solid ${showNew?C.mint:'rgba(107,122,118,0.2)'}`, backgroundColor:showNew?`${C.mint}14`:'transparent', fontSize:'12px', ...UB, cursor:'pointer', color:showNew?C.ink:C.muted, transition:'all 0.15s' }}
            >✨ New Arrivals</button>
            <button onClick={()=>setShowDrop(!showDrop)}
              style={{ display:'flex', alignItems:'center', gap:'6px', padding:'9px 18px', borderRadius:'100px', border:`1px solid ${showDrop?C.mint:'rgba(107,122,118,0.2)'}`, backgroundColor:showDrop?`${C.mint}14`:'transparent', fontSize:'12px', ...UB, cursor:'pointer', color:showDrop?C.ink:C.muted, transition:'all 0.15s' }}
            >📉 Price Drop Alert</button>
          </div>
          <div style={{ display:'flex', gap:'4px', padding:'4px', backgroundColor:'white', borderRadius:'12px', border:'1px solid rgba(107,122,118,0.12)' }}>
            <button onClick={()=>setGridView(true)}  style={{ width:'36px', height:'36px', borderRadius:'8px', border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'17px', backgroundColor:gridView?C.ink:'transparent', color:gridView?'white':C.muted, transition:'all 0.2s' }}>⊞</button>
            <button onClick={()=>setGridView(false)} style={{ width:'36px', height:'36px', borderRadius:'8px', border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'17px', backgroundColor:!gridView?C.ink:'transparent', color:!gridView?'white':C.muted, transition:'all 0.2s' }}>☰</button>
          </div>
        </div>

        {/* ══ STYLE FILTER ══════════════════════════════════════ */}
        <div style={{ backgroundColor:'white', borderRadius:'20px', padding:'20px 24px', marginBottom:'16px', border:'1px solid rgba(107,122,118,0.1)', boxShadow:'0 2px 8px rgba(0,0,0,0.04)' }}>
          <p style={{ fontSize:'9px', ...UB, color:C.muted, textTransform:'uppercase' as const, letterSpacing:'0.14em', marginBottom:'12px' }}>FILTER BY STYLE</p>
          <div style={{ display:'flex', gap:'8px', flexWrap:'wrap' as const }}>
            {['All Styles',...catData.styles].map(s=>(
              <button key={s} onClick={()=>setActiveStyle(s)}
                style={{ padding:'7px 16px', borderRadius:'100px', fontSize:'10px', ...UB, border:'1px solid', cursor:'pointer', transition:'all 0.15s',
                  backgroundColor: activeStyle===s?C.mint:'transparent',
                  color:           activeStyle===s?C.ink:C.muted,
                  borderColor:     activeStyle===s?C.mint:'rgba(107,122,118,0.2)',
                }}
                onMouseEnter={e=>{if(activeStyle!==s){e.currentTarget.style.borderColor=C.mint;e.currentTarget.style.color=C.ink}}}
                onMouseLeave={e=>{if(activeStyle!==s){e.currentTarget.style.borderColor='rgba(107,122,118,0.2)';e.currentTarget.style.color=C.muted}}}
              >{s}</button>
            ))}
          </div>
        </div>

        {/* ══ BRAND FILTER ══════════════════════════════════════ */}
        <div style={{ backgroundColor:'white', borderRadius:'20px', padding:'20px 24px', marginBottom:'32px', border:'1px solid rgba(107,122,118,0.1)', boxShadow:'0 2px 8px rgba(0,0,0,0.04)' }}>
          <p style={{ fontSize:'9px', ...UB, color:C.muted, textTransform:'uppercase' as const, letterSpacing:'0.14em', marginBottom:'12px' }}>FILTER BY BRAND</p>
          <div style={{ display:'flex', gap:'8px', flexWrap:'wrap' as const }}>
            {['All Brands',...catData.brands].map(brand=>(
              <button key={brand} onClick={()=>setActiveBrand(brand)}
                style={{ padding:'7px 16px', borderRadius:'100px', fontSize:'10px', ...UB, border:'1px solid', cursor:'pointer', transition:'all 0.15s',
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

        {/* ══ LISTINGS ══════════════════════════════════════════ */}
        <section style={{ marginBottom:'48px' }}>
          <p style={{ fontSize:'13px', color:C.muted, ...CB, marginBottom:'20px' }}>
            Showing {listings.length} of {catData.count} results
            {keyword && <span style={{ color:C.mint }}> for "{keyword}"</span>}
          </p>
          {listings.length === 0 ? (
            <div style={{ textAlign:'center' as const, padding:'60px 20px' }}>
              <p style={{ fontSize:'18px', ...UB, color:C.ink, marginBottom:'8px' }}>No bags match your filters</p>
              <p style={{ fontSize:'14px', color:C.muted, marginBottom:'20px' }}>Try adjusting your keyword, brand or price range</p>
              <button onClick={()=>{setKeyword('');setActiveBrand('All Brands');setActiveStyle('All Styles');setPrice('Any Price')}}
                style={{ padding:'12px 28px', borderRadius:'100px', backgroundColor:C.mint, color:C.ink, border:'none', ...UB, fontSize:'13px', cursor:'pointer' }}>
                Clear Filters
              </button>
            </div>
          ) : gridView ? (
            <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'20px' }}>
              {listings.map((item,i)=><ListingCard key={i} {...item} />)}
            </div>
          ) : (
            <div style={{ display:'flex', flexDirection:'column' as const, gap:'14px' }}>
              {listings.map((item,j)=>(
                <div key={j} style={{ display:'flex', backgroundColor:'white', borderRadius:'20px', border:'1px solid rgba(107,122,118,0.1)', overflow:'hidden', height:'140px' }}>
                  <img src={item.img} alt={item.title} style={{ width:'140px', height:'100%', objectFit:'cover' as const }} />
                  <div style={{ flex:1, padding:'16px 20px', display:'flex', flexDirection:'column' as const, justifyContent:'space-between' }}>
                    <div>
                      <p style={{ fontSize:'9px', ...CB, color:C.mint, textTransform:'uppercase' as const }}>{item.brand} · {item.style}</p>
                      <h4 style={{ fontSize:'15px', ...CB, color:C.ink }}>{item.title}</h4>
                    </div>
                    <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                      <p style={{ fontSize:'18px', ...CB, color:C.mint }}>{item.price.toLocaleString()} MAD</p>
                      <div style={{ display:'flex', gap:'8px' }}>
                        <button style={{ padding:'8px 16px', borderRadius:'10px', border:`1px solid ${C.ink}`, backgroundColor:'transparent', color:C.ink, fontSize:'10px', ...CB, cursor:'pointer' }}>Message</button>
                        <button style={{ padding:'8px 16px', borderRadius:'10px', border:'none', backgroundColor:'#25D366', color:'white', fontSize:'10px', ...CB, cursor:'pointer' }}>WhatsApp</button>
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
          <h3 style={{ fontSize:'clamp(18px,2.5vw,24px)', ...UB, color:C.ink, textTransform:'uppercase' as const, marginBottom:'20px' }}>Explore Other Bag Categories</h3>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(6,1fr)', gap:'14px' }}>
            {ALL_CATS.filter(c=>c.slug!==catSlug).map(cat=>(
              <Link key={cat.slug} href={`/${locale}/fashion/bags/${cat.slug}`}
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

        {/* ══ BACK TO BAGS ══════════════════════════════════════ */}
        <div style={{ textAlign:'center' as const }}>
          <Link href={`/${locale}/fashion/bags`}
            style={{ display:'inline-flex', alignItems:'center', gap:'8px', padding:'16px 40px', borderRadius:'100px', backgroundColor:C.ink, color:'white', textDecoration:'none', fontSize:'12px', ...UB, textTransform:'uppercase' as const, letterSpacing:'0.1em', transition:'background 0.2s' }}
            onMouseEnter={e=>e.currentTarget.style.backgroundColor=C.mint}
            onMouseLeave={e=>e.currentTarget.style.backgroundColor=C.ink}
          >← Back to All Bags</Link>
        </div>
      </main>
    </div>
  )
}
