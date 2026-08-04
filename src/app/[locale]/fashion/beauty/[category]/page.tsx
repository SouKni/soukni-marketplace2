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
  brands:string[]; priceRanges:string[]
}> = {
  'all-brands': {
    label:'All Beauty Brands',
    hero:'https://images.pexels.com/photos/2113855/pexels-photo-2113855.jpeg?auto=compress&w=1600',
    desc:'Browse the complete SouKni beauty and skincare collection.',
    count:'2,140',
    brands:['Aura Luxe','Aurora Couture',"Maison d'Or",'Luna Aura','Chanel Beauty','Dior Beauty','La Mer','YSL Beauté'],
    priceRanges:['Any Price','0 – 200 MAD','200 – 500 MAD','500 – 1,500 MAD','1,500 – 4,000 MAD','4,000+ MAD'],
  },
  'skincare': {
    label:'Skincare',
    hero:'https://images.pexels.com/photos/3685530/pexels-photo-3685530.jpeg?auto=compress&w=1600',
    desc:'Luxury skincare for anti-aging, hydration, and radiant complexion.',
    count:'840',
    brands:['La Mer','Aura Luxe','SK-II','Sisley Paris','Dr. Barbara Sturm','Augustinus Bader','Estée Lauder'],
    priceRanges:['Any Price','0 – 300 MAD','300 – 800 MAD','800 – 2,000 MAD','2,000 – 5,000 MAD','5,000+ MAD'],
  },
  'makeup': {
    label:'Makeup',
    hero:'https://images.pexels.com/photos/2639947/pexels-photo-2639947.jpeg?auto=compress&w=1600',
    desc:'Professional-grade makeup palettes, foundations, and beauty essentials.',
    count:'612',
    brands:['Aurora Couture','Chanel Beauty','Dior Beauty','YSL Beauté','Charlotte Tilbury','Pat McGrath Labs','NARS'],
    priceRanges:['Any Price','0 – 200 MAD','200 – 500 MAD','500 – 1,500 MAD','1,500 – 3,500 MAD','3,500+ MAD'],
  },
  'fragrances': {
    label:'Fragrances',
    hero:'https://images.pexels.com/photos/965989/pexels-photo-965989.jpeg?auto=compress&w=1600',
    desc:'Exclusive perfumes and eau de parfums from the world\'s finest maisons.',
    count:'428',
    brands:["Maison d'Or",'Chanel','Dior','Tom Ford','Creed','Amouage','Byredo','Maison Francis Kurkdjian'],
    priceRanges:['Any Price','0 – 500 MAD','500 – 1,200 MAD','1,200 – 2,500 MAD','2,500 – 5,000 MAD','5,000+ MAD'],
  },
  'haircare': {
    label:'Haircare',
    hero:'https://images.pexels.com/photos/2467285/pexels-photo-2467285.jpeg?auto=compress&w=1600',
    desc:'Premium haircare from marble-brush sets to nourishing hair oils.',
    count:'260',
    brands:['Luna Aura','Oribe','Kérastase','Olaplex','Moroccanoil','Living Proof','Sisley Hair'],
    priceRanges:['Any Price','0 – 200 MAD','200 – 500 MAD','500 – 1,200 MAD','1,200 – 3,000 MAD','3,000+ MAD'],
  },
}

const ALL_CATS = [
  { label:'All Brands', slug:'all-brands' },
  { label:'Skincare',   slug:'skincare'   },
  { label:'Makeup',     slug:'makeup'     },
  { label:'Fragrances', slug:'fragrances' },
  { label:'Haircare',   slug:'haircare'   },
]

const BEAUTY_IMGS = [
  'https://images.pexels.com/photos/3685530/pexels-photo-3685530.jpeg?auto=compress&w=400',
  'https://images.pexels.com/photos/2639947/pexels-photo-2639947.jpeg?auto=compress&w=400',
  'https://images.pexels.com/photos/965989/pexels-photo-965989.jpeg?auto=compress&w=400',
  'https://images.pexels.com/photos/2467285/pexels-photo-2467285.jpeg?auto=compress&w=400',
  'https://images.pexels.com/photos/2113855/pexels-photo-2113855.jpeg?auto=compress&w=400',
]

type BadgeT = 'certified'|'diamond'|'featured'|'new'
function Badge({ type }: { type: BadgeT }) {
  const map: Record<BadgeT,{bg:string;color:string;label:string}> = {
    certified:{ bg:C.mint,   color:C.ink,  label:'SouKni Certified' },
    diamond:  { bg:C.ink,    color:C.mint, label:'Diamond Member'   },
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

function ListingCard({ brand, title, price, location, condition, img, badge, size }: any) {
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
        {condition && <div style={{ position:'absolute', bottom:'10px', left:'10px', zIndex:10, backgroundColor:'rgba(255,255,255,0.92)', padding:'3px 8px', borderRadius:'6px', fontSize:'9px', ...CB, color:C.mint, textTransform:'uppercase' as const }}>{condition}</div>}
      </div>
      <div style={{ padding:'16px 18px', flex:1, display:'flex', flexDirection:'column' as const }}>
        <p style={{ fontSize:'9px', ...CB, color:C.mint, textTransform:'uppercase' as const, letterSpacing:'0.1em', marginBottom:'2px' }}>{brand}</p>
        <h4 style={{ fontSize:'14px', ...CB, color:hov?C.mint:C.ink, marginBottom:'4px', transition:'color 0.2s', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' as const }}>{title}</h4>
        {size && <p style={{ fontSize:'10px', ...CB, color:C.muted, marginBottom:'2px' }}>{size}</p>}
        <p style={{ fontSize:'18px', ...CB, color:C.mint, marginBottom:'6px' }}>{price.toLocaleString()} MAD</p>
        {location && <p style={{ fontSize:'10px', color:C.muted, ...CB, display:'flex', alignItems:'center', gap:'3px', marginBottom:'12px' }}><MapPin size={10}/>{location}</p>}
        <div style={{ marginTop:'auto', display:'flex', gap:'8px' }}>
          <button style={{ flex:1, border:`2px solid ${C.ink}`, color:C.ink, backgroundColor:'transparent', padding:'9px', borderRadius:'12px', fontSize:'10px', ...CB, textTransform:'uppercase' as const, cursor:'pointer', transition:'all 0.15s' }}
            onMouseEnter={e=>{e.currentTarget.style.backgroundColor=C.ink;e.currentTarget.style.color='white'}}
            onMouseLeave={e=>{e.currentTarget.style.backgroundColor='transparent';e.currentTarget.style.color=C.ink}}
          >Message</button>
          <a href="https://wa.me/212600000000?text=Hi%2C%20I%20found%20your%20beauty%20listing%20on%20SouKni!" target="_blank" rel="noopener noreferrer"
            style={{ flex:1, backgroundColor:'#25D366', color:'white', border:'none', padding:'9px', borderRadius:'12px', fontSize:'10px', ...CB, textTransform:'uppercase' as const, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', gap:'4px', textDecoration:'none' }}>
            WhatsApp
          </a>
        </div>
      </div>
    </article>
  )
}

function makeListings(cat: string, count: number) {
  const titleMap: Record<string,string[]> = {
    'all-brands': ['Advanced Serum','Makeup Palette','Oud Perfume','Brush Set','Hair Mask','Foundation'],
    'skincare':   ['Advanced Hydration Serum','Anti-Aging Eye Cream','Vitamin C Brightening','Retinol Night Cream','Hyaluronic Acid Serum','SPF 50 Sunscreen','Exfoliating Toner','Collagen Mask'],
    'makeup':     ['Matte Perfection Foundation','Lip & Cheek Kit','32-Shade Eyeshadow Palette','Setting Spray','Full Coverage Concealer','Contour & Highlight Kit','Volumizing Mascara','Blush Palette'],
    'fragrances': ['Aurelia Gold EDP 50ml','Rose Elixir EDP','White Musk EDP','Amber Noir EDP','Oud Collection EDP','Tobacco Vanille','Baccarat Rouge 540','Neroli Portofino'],
    'haircare':   ['Premium Marble & Gold Brush Set','Repair Hair Mask','Shine Serum','Volumizing Shampoo','Deep Conditioner','Heat Protector Spray','Scalp Treatment Oil','Hair Repair Oil'],
  }
  const sizeMap: Record<string,string[]> = {
    'skincare':   ['30ml','50ml','100ml','200ml'],
    'makeup':     ['Full Size','Travel Size','Limited Edition'],
    'fragrances': ['30ml EDP','50ml EDP','100ml EDP','200ml EDP'],
    'haircare':   ['250ml','500ml','1L'],
  }
  const cat_data = CATEGORIES[cat] || CATEGORIES['all-brands']
  const titles = titleMap[cat] || titleMap['all-brands']
  const sizes  = sizeMap[cat] || []
  const badges: BadgeT[] = ['certified','diamond','featured','new','certified','diamond']
  const locs  = ['Rabat, Agdal','Rabat, Souissi','Casablanca','Rabat, Hay Riad','Rabat, Centre']
  const conds = ['New Sealed','Like New','Opened Once','Good',undefined,undefined]
  return Array.from({length:count},(_,i)=>({
    brand:     cat_data.brands[i%cat_data.brands.length],
    title:     titles[i%titles.length],
    price:     180 + ((i*1373)%7500),
    location:  locs[i%locs.length],
    condition: conds[i%conds.length],
    size:      sizes[i%sizes.length],
    img:       BEAUTY_IMGS[i%BEAUTY_IMGS.length],
    badge:     badges[i%badges.length],
  }))
}

export default function BeautyCategoryPage() {
  const params   = useParams()
  const locale   = (params?.locale as string) || 'en'
  const catSlug  = (params?.category as string) || 'all-brands'
  const catData  = CATEGORIES[catSlug] || CATEGORIES['all-brands']

  const [activeSeller, setActiveSeller] = useState('All Sellers')
  const [diamond,      setDiamond     ] = useState(true)
  const [gridView,     setGridView    ] = useState(true)
  const [page,         setPage        ] = useState(1)
  const [keyword,      setKeyword     ] = useState('')
  const [city,         setCity        ] = useState('Rabat')
  const [price,        setPrice       ] = useState('Any Price')
  const [sortBy,       setSortBy      ] = useState('Most Recent')
  const [activeBrand,  setActiveBrand ] = useState('All Brands')
  const [cityOpen,     setCityOpen    ] = useState(false)
  const [priceOpen,    setPriceOpen   ] = useState(false)

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

      {/* HERO */}
      <section style={{ position:'relative', height:'360px', display:'flex', alignItems:'center', justifyContent:'center', overflow:'hidden' }}>
        <img src={catData.hero} alt={catData.label} style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover' }} />
        <div style={{ position:'absolute', inset:0, backgroundColor:'rgba(22,29,27,0.52)' }} />
        <div style={{ position:'relative', zIndex:10, textAlign:'center' as const, maxWidth:'860px', padding:'0 24px', width:'100%' }}>
          <p style={{ fontSize:'11px', ...UB, color:C.mint, textTransform:'uppercase' as const, letterSpacing:'0.2em', marginBottom:'12px' }}>FASHION › BEAUTY & SKINCARE</p>
          <h1 style={{ fontSize:'clamp(32px,5vw,52px)', ...UB, color:'white', marginBottom:'16px', lineHeight:1.05, textShadow:'0 4px 20px rgba(0,0,0,0.4)' }}>{catData.label} in Rabat</h1>
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

      {/* FILTER BAR */}
      <div style={{ maxWidth:'1280px', margin:'-36px auto 0', padding:'0 24px', position:'relative', zIndex:30 }}>
        <div style={{ backgroundColor:'rgba(255,255,255,0.97)', backdropFilter:'blur(16px)', border:'1px solid rgba(107,122,118,0.12)', borderRadius:'100px', boxShadow:'0 12px 40px rgba(0,0,0,0.08)', display:'flex', alignItems:'stretch', height:'68px' }}>
          <DDrop label="CITY" value={city} options={cities} open={cityOpen} setOpen={setCityOpen} onChange={setCity} />
          <div style={{ width:'1px', backgroundColor:'rgba(107,122,118,0.12)', margin:'12px 0' }} />
          <div style={{ flex:1.8, padding:'0 22px', display:'flex', flexDirection:'column' as const, justifyContent:'center' }}>
            <span style={{ fontSize:'9px', ...UB, textTransform:'uppercase' as const, letterSpacing:'0.14em', color:C.muted, marginBottom:'3px' }}>KEYWORD</span>
            <div style={{ display:'flex', alignItems:'center', gap:'8px' }}>
              <Search size={13} color={C.muted} />
              <input type="text" value={keyword} onChange={e=>setKeyword(e.target.value)} placeholder={`e.g. ${catData.brands[0]}, Serum, Palette...`}
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

        {/* BREADCRUMB */}
        <nav style={{ display:'flex', alignItems:'center', gap:'6px', fontSize:'10px', ...UB, color:C.muted, textTransform:'uppercase' as const, letterSpacing:'0.12em', marginBottom:'12px' }}>
          {[
            { label:'Rabat',              href:`/${locale}` },
            { label:'Fashion',            href:`/${locale}/fashion` },
            { label:'Beauty & Skincare',  href:`/${locale}/fashion/beauty` },
            { label:catData.label,        href:null },
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

        {/* TITLE + SORT */}
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', gap:'16px', marginBottom:'24px', flexWrap:'wrap' as const }}>
          <div>
            <h2 style={{ fontSize:'clamp(20px,2.5vw,28px)', ...UB, color:C.ink, marginBottom:'4px' }}>{catData.label} for Sale in Rabat</h2>
            <p style={{ fontSize:'14px', color:C.mint, ...CB }}>{catData.count} Ads</p>
          </div>
          <div style={{ display:'flex', gap:'10px', alignItems:'center' }}>
            <select value={sortBy} onChange={e=>setSortBy(e.target.value)}
              style={{ backgroundColor:'white', border:'1px solid rgba(107,122,118,0.18)', padding:'9px 16px', borderRadius:'12px', fontSize:'10px', ...UB, textTransform:'uppercase' as const, letterSpacing:'0.1em', cursor:'pointer', color:C.ink, outline:'none' }}>
              {['Most Recent','Price: Low to High','Price: High to Low','Most Popular'].map(s=><option key={s}>{s}</option>)}
            </select>
            <button style={{ backgroundColor:'white', border:'1px solid rgba(107,122,118,0.18)', padding:'9px 16px', borderRadius:'12px', fontSize:'10px', ...UB, textTransform:'uppercase' as const, letterSpacing:'0.1em', cursor:'pointer', color:C.ink }}>🔖 Save Search</button>
          </div>
        </div>

        {/* SUB-CATEGORY PILLS */}
        <div style={{ display:'flex', gap:'10px', flexWrap:'wrap' as const, marginBottom:'20px' }}>
          {ALL_CATS.map(cat=>(
            <Link key={cat.slug} href={`/${locale}/fashion/beauty/${cat.slug}`}
              style={{ padding:'10px 22px', borderRadius:'100px', fontSize:'11px', ...UB, textTransform:'uppercase' as const, letterSpacing:'0.1em', cursor:'pointer', transition:'all 0.2s', border:'1px solid', textDecoration:'none', display:'inline-block',
                backgroundColor: catSlug===cat.slug ? C.mint  : 'white',
                color:           catSlug===cat.slug ? C.ink   : C.muted,
                borderColor:     catSlug===cat.slug ? C.mint  : 'rgba(186,202,197,0.4)',
              }}
              onMouseEnter={e=>{if(catSlug!==cat.slug){e.currentTarget.style.borderColor=C.mint;e.currentTarget.style.color=C.ink}}}
              onMouseLeave={e=>{if(catSlug!==cat.slug){e.currentTarget.style.borderColor='rgba(186,202,197,0.4)';e.currentTarget.style.color=C.muted}}}
            >{cat.label}</Link>
          ))}
        </div>

        {/* SELLER TABS + DIAMOND */}
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

        {/* GRID TOGGLE */}
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

        {/* BRAND FILTER */}
        <div style={{ backgroundColor:'white', borderRadius:'20px', padding:'20px 24px', marginBottom:'32px', border:'1px solid rgba(107,122,118,0.1)' }}>
          <p style={{ fontSize:'9px', ...UB, color:C.muted, textTransform:'uppercase' as const, letterSpacing:'0.14em', marginBottom:'12px' }}>FILTER BY BRAND</p>
          <div style={{ display:'flex', gap:'8px', flexWrap:'wrap' as const }}>
            <button onClick={()=>setActiveBrand('All Brands')}
              style={{ padding:'7px 16px', borderRadius:'100px', fontSize:'10px', ...UB, border:`1px solid`, cursor:'pointer', transition:'all 0.15s',
                backgroundColor:activeBrand==='All Brands'?C.mint:'transparent', color:activeBrand==='All Brands'?C.ink:C.muted, borderColor:activeBrand==='All Brands'?C.mint:'rgba(107,122,118,0.2)' }}>All Brands</button>
            {catData.brands.map(brand=>(
              <button key={brand} onClick={()=>setActiveBrand(brand)}
                style={{ padding:'7px 16px', borderRadius:'100px', fontSize:'10px', ...UB, border:`1px solid`, cursor:'pointer', transition:'all 0.15s',
                  backgroundColor:activeBrand===brand?C.mint:'transparent', color:activeBrand===brand?C.ink:C.muted, borderColor:activeBrand===brand?C.mint:'rgba(107,122,118,0.2)' }}
                onMouseEnter={e=>{if(activeBrand!==brand){e.currentTarget.style.borderColor=C.mint;e.currentTarget.style.color=C.ink}}}
                onMouseLeave={e=>{if(activeBrand!==brand){e.currentTarget.style.borderColor='rgba(107,122,118,0.2)';e.currentTarget.style.color=C.muted}}}
              >{brand}</button>
            ))}
          </div>
        </div>

        {/* LISTINGS GRID */}
        <section style={{ marginBottom:'48px' }}>
          <p style={{ fontSize:'13px', color:C.muted, ...CB, marginBottom:'20px' }}>Showing {listings.length} of {catData.count} results</p>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'20px' }}>
            {listings.map((item,i)=><ListingCard key={i} {...item} />)}
          </div>
        </section>

        {/* PAGINATION */}
        <div style={{ display:'flex', justifyContent:'center', alignItems:'center', gap:'10px', marginBottom:'64px' }}>
          <button style={{ width:'44px', height:'44px', borderRadius:'12px', backgroundColor:'white', border:'1px solid rgba(107,122,118,0.12)', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', color:C.muted }}><ChevronLeft size={18} /></button>
          {[1,2,3,4,5].map(p=>(
            <button key={p} onClick={()=>setPage(p)}
              style={{ width:'44px', height:'44px', borderRadius:'12px', cursor:'pointer', fontSize:'15px', ...UB, border:'1px solid', transition:'all 0.2s',
                backgroundColor: page===p ? C.mint : 'white', color: page===p ? C.ink : C.muted, borderColor: page===p ? C.mint : 'rgba(107,122,118,0.12)',
              }}
            >{p}</button>
          ))}
          <span style={{ color:C.muted }}>…</span>
          <button style={{ width:'44px', height:'44px', borderRadius:'12px', backgroundColor:'white', border:'1px solid rgba(107,122,118,0.12)', cursor:'pointer', fontSize:'15px', ...UB, color:C.muted }}>8</button>
          <button style={{ width:'44px', height:'44px', borderRadius:'12px', backgroundColor:'white', border:'1px solid rgba(107,122,118,0.12)', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', color:C.muted }}><ChevronRight size={18} /></button>
        </div>

        {/* EXPLORE OTHER CATEGORIES */}
        <section style={{ marginBottom:'48px' }}>
          <h3 style={{ fontSize:'clamp(18px,2.5vw,24px)', ...UB, color:C.ink, textTransform:'uppercase' as const, marginBottom:'20px' }}>Explore Other Beauty Categories</h3>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'14px' }}>
            {ALL_CATS.filter(c=>c.slug!==catSlug).map(cat=>(
              <Link key={cat.slug} href={`/${locale}/fashion/beauty/${cat.slug}`}
                style={{ backgroundColor:'white', borderRadius:'20px', padding:'24px 16px', textAlign:'center' as const, border:'1px solid rgba(107,122,118,0.1)', textDecoration:'none', transition:'all 0.2s', display:'block' }}
                onMouseEnter={e=>{e.currentTarget.style.borderColor=C.mint;e.currentTarget.style.boxShadow=`0 8px 24px ${C.mint}18`}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor='rgba(107,122,118,0.1)';e.currentTarget.style.boxShadow='none'}}
              >
                <p style={{ fontSize:'11px', ...UB, color:C.ink, textTransform:'uppercase' as const, letterSpacing:'0.08em' }}>{cat.label}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* BACK */}
        <div style={{ textAlign:'center' as const }}>
          <Link href={`/${locale}/fashion/beauty`}
            style={{ display:'inline-flex', alignItems:'center', gap:'8px', padding:'16px 40px', borderRadius:'100px', backgroundColor:C.ink, color:'white', textDecoration:'none', fontSize:'12px', ...UB, textTransform:'uppercase' as const, letterSpacing:'0.1em', transition:'background 0.2s' }}
            onMouseEnter={e=>e.currentTarget.style.backgroundColor=C.mintDk}
            onMouseLeave={e=>e.currentTarget.style.backgroundColor=C.ink}
          >← Back to Beauty & Skincare</Link>
        </div>
      </main>
    </div>
  )
}
