'use client'

import { useState } from 'react'
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
  brands:string[]; priceRanges:string[]; emoji:string
}> = {
  'handbags': {
    label:'Handbags', emoji:'👜',
    hero:'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&w=1600',
    desc:'The world\'s most coveted handbags — from classic flaps to rare limited editions.',
    count:'2,841',
    brands:['Hermès','Chanel','Louis Vuitton','Dior','Gucci','Prada','Celine','Loewe'],
    priceRanges:['Any Price','0 – 5,000 MAD','5,000 – 20,000 MAD','20,000 – 60,000 MAD','60,000 – 150,000 MAD','150,000+ MAD'],
  },
  'wallets': {
    label:'Wallets', emoji:'👛',
    hero:'https://images.pexels.com/photos/904350/pexels-photo-904350.jpeg?auto=compress&w=1600',
    desc:'Luxury wallets and card holders from the finest leather houses.',
    count:'1,204',
    brands:['Louis Vuitton','Chanel','Gucci','Prada','Hermès','YSL','Bottega Veneta'],
    priceRanges:['Any Price','0 – 2,000 MAD','2,000 – 6,000 MAD','6,000 – 15,000 MAD','15,000+ MAD'],
  },
  'briefcases': {
    label:'Briefcases', emoji:'💼',
    hero:'https://images.pexels.com/photos/2081199/pexels-photo-2081199.jpeg?auto=compress&w=1600',
    desc:'Premium briefcases and work bags for the discerning professional.',
    count:'432',
    brands:['Louis Vuitton','Hermès','Prada','Gucci','Montblanc','Berluti','Smythson'],
    priceRanges:['Any Price','0 – 5,000 MAD','5,000 – 15,000 MAD','15,000 – 40,000 MAD','40,000+ MAD'],
  },
  'crossbody-bags': {
    label:'Crossbody Bags', emoji:'🎒',
    hero:'https://images.pexels.com/photos/1204469/pexels-photo-1204469.jpeg?auto=compress&w=1600',
    desc:'Elegant crossbody and shoulder bags for every occasion.',
    count:'1,876',
    brands:['Chanel','Louis Vuitton','Gucci','YSL','Dior','Givenchy','Balenciaga','Celine'],
    priceRanges:['Any Price','0 – 5,000 MAD','5,000 – 15,000 MAD','15,000 – 40,000 MAD','40,000+ MAD'],
  },
  'backpacks': {
    label:'Backpacks', emoji:'🎒',
    hero:'https://images.pexels.com/photos/2081199/pexels-photo-2081199.jpeg?auto=compress&w=1600',
    desc:'Luxury backpacks blending function with high fashion.',
    count:'654',
    brands:['Louis Vuitton','Gucci','Prada','Balenciaga','Burberry','Fendi','Givenchy'],
    priceRanges:['Any Price','0 – 5,000 MAD','5,000 – 15,000 MAD','15,000 – 35,000 MAD','35,000+ MAD'],
  },
  'clutches': {
    label:'Clutches', emoji:'👝',
    hero:'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&w=1600',
    desc:'Exquisite evening clutches and minaudières for special occasions.',
    count:'869',
    brands:['Judith Leiber','Chanel','Dior','YSL','Jimmy Choo','Valentino','Roger Vivier'],
    priceRanges:['Any Price','0 – 3,000 MAD','3,000 – 8,000 MAD','8,000 – 20,000 MAD','20,000+ MAD'],
  },
  'all-bags': {
    label:'All Bags', emoji:'👜',
    hero:'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&w=1600',
    desc:'Browse the complete SouKni bags & wallets collection.',
    count:'5,876',
    brands:['Hermès','Chanel','Louis Vuitton','Gucci','Prada','Dior','Celine','YSL'],
    priceRanges:['Any Price','0 – 5,000 MAD','5,000 – 20,000 MAD','20,000 – 60,000 MAD','60,000 – 150,000 MAD','150,000+ MAD'],
  },
}

const ALL_CATS = [
  { label:'All Bags',      slug:'all-bags',       emoji:'👜' },
  { label:'Handbags',      slug:'handbags',        emoji:'👜' },
  { label:'Wallets',       slug:'wallets',         emoji:'👛' },
  { label:'Briefcases',    slug:'briefcases',      emoji:'💼' },
  { label:'Crossbody Bags',slug:'crossbody-bags',  emoji:'🎒' },
  { label:'Backpacks',     slug:'backpacks',       emoji:'🎒' },
  { label:'Clutches',      slug:'clutches',        emoji:'👝' },
]

const BAG_IMGS = [
  'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&w=400',
  'https://images.pexels.com/photos/904350/pexels-photo-904350.jpeg?auto=compress&w=400',
  'https://images.pexels.com/photos/1204469/pexels-photo-1204469.jpeg?auto=compress&w=400',
  'https://images.pexels.com/photos/2081199/pexels-photo-2081199.jpeg?auto=compress&w=400',
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

function ListingCard({ brand, title, price, location, condition, img, badge }: any) {
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
        {condition && (
          <div style={{ position:'absolute', bottom:'10px', left:'10px', zIndex:10, backgroundColor:'rgba(255,255,255,0.92)', padding:'3px 8px', borderRadius:'6px', fontSize:'9px', ...CB, color:C.mint, textTransform:'uppercase' as const }}>
            {condition}
          </div>
        )}
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
          <a href="https://wa.me/212600000000?text=Hi%2C%20I%20found%20your%20bag%20listing%20on%20SouKni!" target="_blank" rel="noopener noreferrer"
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
    'handbags':       ['Classic Double Flap','Birkin 30','Neverfull MM','Lady Dior','Dionysus GG','Galleria Saffiano','Belt Bag','Puzzle Small'],
    'wallets':        ['Zippy Wallet','Classic Card Holder','Billfold Wallet','Long Wallet','Compact Wallet','Key Pouch','Coin Purse'],
    'briefcases':     ['Porte-Documents','Briefcase 38','Work Bag','Portfolio Case','Attache Case'],
    'crossbody-bags': ['Sunset Shoulder','Camera Bag','Mini Crossbody','Chain Bag','Saddle Bag','Pochette'],
    'backpacks':      ['Monogram Backpack','GG Supreme Pack','Nylon Backpack','City Pack','Explorer Pack'],
    'clutches':       ['Evening Clutch','Crystal Minaudière','Box Clutch','Pochette Metis','Quilted Clutch'],
    'all-bags':       ['Classic Flap','Birkin 30','Neverfull MM','Lady Dior','Sunset Shoulder','Zippy Wallet'],
  }
  const brandMap: Record<string,string[]> = {
    'handbags':       ['Hermès','Chanel','Louis Vuitton','Dior','Gucci','Prada','Celine','Loewe'],
    'wallets':        ['Louis Vuitton','Chanel','Gucci','Prada','Hermès','YSL'],
    'briefcases':     ['Louis Vuitton','Hermès','Prada','Gucci','Berluti'],
    'crossbody-bags': ['Chanel','Louis Vuitton','Gucci','YSL','Dior','Givenchy'],
    'backpacks':      ['Louis Vuitton','Gucci','Prada','Balenciaga','Burberry'],
    'clutches':       ['Chanel','Dior','YSL','Valentino','Roger Vivier'],
    'all-bags':       ['Hermès','Chanel','Louis Vuitton','Gucci','Prada','Dior'],
  }
  const brands = brandMap[cat] || brandMap['all-bags']
  const titles = titleMap[cat] || titleMap['all-bags']
  const badges: BadgeT[] = ['certified','diamond','featured','new','certified','diamond']
  const locs  = ['Rabat, Agdal','Rabat, Souissi','Casablanca','Rabat, Hay Riad','Rabat, Centre']
  const conds = ['Like New','New','Excellent','Good',undefined,undefined]
  const colors = ['Black','Beige','Camel','Navy','Burgundy','White','Gold']
  return Array.from({length:count},(_,i)=>({
    brand:     brands[i%brands.length],
    title:     `${titles[i%titles.length]} — ${colors[i%colors.length]}`,
    price:     3500 + ((i*2731)%180000),
    location:  locs[i%locs.length],
    condition: conds[i%conds.length],
    img:       BAG_IMGS[i%BAG_IMGS.length],
    badge:     badges[i%badges.length],
  }))
}

export default function BagsCategoryPage() {
  const params   = useParams()
  const locale   = (params?.locale as string) || 'en'
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
  const [cityOpen,     setCityOpen    ] = useState(false)
  const [priceOpen,    setPriceOpen   ] = useState(false)
  const [activeBrand,  setActiveBrand ] = useState('All Brands')

  const listings = makeListings(catSlug, 24)
  const cities   = ['Rabat','Casablanca','Marrakech','Fès','Tanger','Agadir','Meknès']

  function DDrop({ label, value, options, open, setOpen, onChange }: any) {
    return (
      <div style={{ position:'relative', flex:1 }}>
        <button onClick={()=>{ setOpen(!open); setCityOpen(false); setPriceOpen(false) }}
          style={{ width:'100%', height:'100%', background:'none', border:'none', cursor:'pointer', padding:'0 22px', display:'flex', flexDirection:'column' as const, justifyContent:'center', textAlign:'left' as const }}>
          <span style={{ fontSize:'9px', ...UB, textTransform:'uppercase' as const, letterSpacing:'0.14em', color:C.muted, marginBottom:'3px' }}>{label}</span>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
            <span style={{ fontSize:'14px', ...UB, color:C.ink }}>{value}</span>
            <ChevronDown size={14} color={C.mint} style={{ flexShrink:0, transition:'transform 0.2s', transform:open?'rotate(180deg)':'rotate(0)' }} />
          </div>
        </button>
        {open && (
          <div style={{ position:'absolute', top:'calc(100% + 8px)', left:0, minWidth:'220px', backgroundColor:'white', borderRadius:'20px', boxShadow:'0 20px 60px rgba(0,0,0,0.12)', border:'1px solid rgba(107,122,118,0.12)', zIndex:200, overflow:'hidden', padding:'8px 0' }}>
            {options.map((opt:string)=>(
              <button key={opt} onClick={()=>{ onChange(opt); setOpen(false) }}
                style={{ width:'100%', padding:'12px 20px', background:'none', border:'none', cursor:'pointer', textAlign:'left' as const, fontSize:'14px', ...UB, color:opt===value?C.mint:C.ink, display:'flex', justifyContent:'space-between', alignItems:'center' }}
                onMouseEnter={e=>e.currentTarget.style.backgroundColor=C.surface}
                onMouseLeave={e=>e.currentTarget.style.backgroundColor='transparent'}
              >{opt}{opt===value&&<span style={{color:C.mint}}>✓</span>}</button>
            ))}
          </div>
        )}
      </div>
    )
  }

  return (
    <div style={{ ...UB, backgroundColor:C.surface, color:C.ink, minHeight:'100vh' }}>

      {/* ══ HERO ══════════════════════════════════════════════ */}
      <section style={{ position:'relative', height:'360px', display:'flex', alignItems:'center', justifyContent:'center', overflow:'hidden' }}>
        <img src={catData.hero} alt={catData.label} style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover' }} />
        <div style={{ position:'absolute', inset:0, backgroundColor:'rgba(22,29,27,0.52)' }} />
        <div style={{ position:'relative', zIndex:10, textAlign:'center' as const, maxWidth:'860px', padding:'0 24px', width:'100%' }}>
          <p style={{ fontSize:'11px', ...UB, color:C.mint, textTransform:'uppercase' as const, letterSpacing:'0.2em', marginBottom:'12px' }}>FASHION › BAGS & WALLETS</p>
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
        <div style={{ backgroundColor:'rgba(255,255,255,0.97)', backdropFilter:'blur(16px)', border:'1px solid rgba(107,122,118,0.12)', borderRadius:'100px', boxShadow:'0 12px 40px rgba(0,0,0,0.08)', display:'flex', alignItems:'stretch', height:'68px' }}>
          <DDrop label="CITY" value={city} options={cities} open={cityOpen} setOpen={setCityOpen} onChange={setCity} />
          <div style={{ width:'1px', backgroundColor:'rgba(107,122,118,0.12)', margin:'12px 0' }} />
          <div style={{ flex:1.8, padding:'0 22px', display:'flex', flexDirection:'column' as const, justifyContent:'center' }}>
            <span style={{ fontSize:'9px', ...UB, textTransform:'uppercase' as const, letterSpacing:'0.14em', color:C.muted, marginBottom:'3px' }}>KEYWORD</span>
            <div style={{ display:'flex', alignItems:'center', gap:'8px' }}>
              <Search size={13} color={C.muted} />
              <input type="text" value={keyword} onChange={e=>setKeyword(e.target.value)} placeholder={`e.g. ${catData.brands[0]}, Classic Flap...`}
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
            { label:'Rabat',           href:`/${locale}` },
            { label:'Fashion',         href:`/${locale}/fashion` },
            { label:'Bags & Wallets',  href:`/${locale}/fashion/bags` },
            { label:catData.label,     href:null },
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
            <h2 style={{ fontSize:'clamp(20px,2.5vw,28px)', ...UB, color:C.ink, marginBottom:'4px' }}>
              {catData.label} for Sale in Rabat
            </h2>
            <p style={{ fontSize:'14px', color:C.mint, ...CB }}>{catData.count} Ads</p>
          </div>
          <div style={{ display:'flex', gap:'10px', alignItems:'center' }}>
            <select value={sortBy} onChange={e=>setSortBy(e.target.value)}
              style={{ backgroundColor:'white', border:'1px solid rgba(107,122,118,0.18)', padding:'9px 16px', borderRadius:'12px', fontSize:'10px', ...UB, textTransform:'uppercase' as const, letterSpacing:'0.1em', cursor:'pointer', color:C.ink, outline:'none' }}>
              {['Most Recent','Price: Low to High','Price: High to Low','Most Popular'].map(s=>(
                <option key={s}>{s}</option>
              ))}
            </select>
            <button style={{ backgroundColor:'white', border:'1px solid rgba(107,122,118,0.18)', padding:'9px 16px', borderRadius:'12px', fontSize:'10px', ...UB, textTransform:'uppercase' as const, letterSpacing:'0.1em', cursor:'pointer', color:C.ink }}>
              🔖 Save Search
            </button>
          </div>
        </div>

        {/* ══ SUB-CATEGORY PILLS ════════════════════════════════ */}
        <div style={{ display:'flex', gap:'10px', flexWrap:'wrap' as const, marginBottom:'20px', alignItems:'center' }}>
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

        {/* ══ BRAND FILTER ══════════════════════════════════════ */}
        <div style={{ backgroundColor:'white', borderRadius:'20px', padding:'20px 24px', marginBottom:'32px', border:'1px solid rgba(107,122,118,0.1)', boxShadow:'0 2px 8px rgba(0,0,0,0.04)' }}>
          <p style={{ fontSize:'9px', ...UB, color:C.muted, textTransform:'uppercase' as const, letterSpacing:'0.14em', marginBottom:'12px' }}>FILTER BY BRAND</p>
          <div style={{ display:'flex', gap:'8px', flexWrap:'wrap' as const }}>
            <button onClick={()=>setActiveBrand('All Brands')}
              style={{ padding:'7px 16px', borderRadius:'100px', fontSize:'10px', ...UB, border:`1px solid`, cursor:'pointer', transition:'all 0.15s',
                backgroundColor: activeBrand==='All Brands' ? C.mint : 'transparent',
                color:           activeBrand==='All Brands' ? C.ink  : C.muted,
                borderColor:     activeBrand==='All Brands' ? C.mint : 'rgba(107,122,118,0.2)',
              }}>All Brands</button>
            {catData.brands.map(brand=>(
              <button key={brand} onClick={()=>setActiveBrand(brand)}
                style={{ padding:'7px 16px', borderRadius:'100px', fontSize:'10px', ...UB, border:`1px solid`, cursor:'pointer', transition:'all 0.15s',
                  backgroundColor: activeBrand===brand ? C.mint : 'transparent',
                  color:           activeBrand===brand ? C.ink  : C.muted,
                  borderColor:     activeBrand===brand ? C.mint : 'rgba(107,122,118,0.2)',
                }}
                onMouseEnter={e=>{if(activeBrand!==brand){e.currentTarget.style.borderColor=C.mint;e.currentTarget.style.color=C.ink}}}
                onMouseLeave={e=>{if(activeBrand!==brand){e.currentTarget.style.borderColor='rgba(107,122,118,0.2)';e.currentTarget.style.color=C.muted}}}
              >{brand}</button>
            ))}
          </div>
        </div>

        {/* ══ LISTINGS GRID ═════════════════════════════════════ */}
        <section style={{ marginBottom:'48px' }}>
          <p style={{ fontSize:'13px', color:C.muted, ...CB, marginBottom:'20px' }}>
            Showing {listings.length} of {catData.count} results
            {activeBrand !== 'All Brands' && ` · Brand: ${activeBrand}`}
            {price !== 'Any Price' && ` · Price: ${price}`}
          </p>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'20px' }}>
            {listings.map((item,i)=><ListingCard key={i} {...item} />)}
          </div>
        </section>

        {/* ══ PAGINATION ════════════════════════════════════════ */}
        <div style={{ display:'flex', justifyContent:'center', alignItems:'center', gap:'10px', marginBottom:'64px' }}>
          <button style={{ width:'44px', height:'44px', borderRadius:'12px', backgroundColor:'white', border:'1px solid rgba(107,122,118,0.12)', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', color:C.muted }}><ChevronLeft size={18} /></button>
          {[1,2,3,4,5].map(p=>(
            <button key={p} onClick={()=>setPage(p)}
              style={{ width:'44px', height:'44px', borderRadius:'12px', cursor:'pointer', fontSize:'15px', ...UB, border:'1px solid', transition:'all 0.2s',
                backgroundColor: page===p ? C.mint : 'white',
                color:           page===p ? C.ink  : C.muted,
                borderColor:     page===p ? C.mint : 'rgba(107,122,118,0.12)',
              }}
            >{p}</button>
          ))}
          <span style={{ color:C.muted }}>…</span>
          <button style={{ width:'44px', height:'44px', borderRadius:'12px', backgroundColor:'white', border:'1px solid rgba(107,122,118,0.12)', cursor:'pointer', fontSize:'15px', ...UB, color:C.muted }}>18</button>
          <button style={{ width:'44px', height:'44px', borderRadius:'12px', backgroundColor:'white', border:'1px solid rgba(107,122,118,0.12)', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', color:C.muted }}><ChevronRight size={18} /></button>
        </div>

        {/* ══ EXPLORE OTHER BAG CATEGORIES ══════════════════════ */}
        <section style={{ marginBottom:'48px' }}>
          <h3 style={{ fontSize:'clamp(18px,2.5vw,24px)', ...UB, color:C.ink, textTransform:'uppercase' as const, marginBottom:'20px' }}>Explore Other Bag Categories</h3>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(6,1fr)', gap:'14px' }}>
            {ALL_CATS.filter(c=>c.slug!==catSlug).map(cat=>(
              <Link key={cat.slug} href={`/${locale}/fashion/bags/${cat.slug}`}
                style={{ backgroundColor:'white', borderRadius:'20px', padding:'20px 16px', textAlign:'center' as const, border:'1px solid rgba(107,122,118,0.1)', textDecoration:'none', transition:'all 0.2s', display:'block' }}
                onMouseEnter={e=>{e.currentTarget.style.borderColor=C.mint;e.currentTarget.style.boxShadow=`0 8px 24px ${C.mint}18`}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor='rgba(107,122,118,0.1)';e.currentTarget.style.boxShadow='none'}}
              >
                <p style={{ fontSize:'22px', marginBottom:'6px' }}>{cat.emoji}</p>
                <p style={{ fontSize:'10px', ...UB, color:C.ink, textTransform:'uppercase' as const, letterSpacing:'0.08em' }}>{cat.label}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* ══ BACK TO ALL BAGS ══════════════════════════════════ */}
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
