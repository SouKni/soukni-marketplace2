'use client'

import { useState } from 'react'
import React from 'react'
import Link from 'next/link'
import { Heart, Search, ChevronDown, ChevronLeft, ChevronRight, SlidersHorizontal, MapPin } from 'lucide-react'

const C = {
  mint:   '#22d4a8',
  mintDk: '#006c53',
  ink:    '#161d1b',
  surface:'#f4fbf8',
  cream:  '#f5ede0',
  muted:  '#6b7a76',
}
const UB: React.CSSProperties = { fontFamily:'Inter,sans-serif', fontWeight:900, letterSpacing:'-0.05em' }
const CB: React.CSSProperties = { fontFamily:"'Hanken Grotesk',sans-serif", fontWeight:900, letterSpacing:'-0.03em' }

const I = {
  hero: 'https://images.pexels.com/photos/2220316/pexels-photo-2220316.jpeg?auto=compress&w=1600',
  f1:   'https://images.pexels.com/photos/2220316/pexels-photo-2220316.jpeg?auto=compress&w=600',
  f2:   'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&w=600',
  f3:   'https://images.pexels.com/photos/5935748/pexels-photo-5935748.jpeg?auto=compress&w=600',
  f4:   'https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&w=600',
  g1:   'https://images.pexels.com/photos/2220316/pexels-photo-2220316.jpeg?auto=compress&w=400',
  g2:   'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&w=400',
  g3:   'https://images.pexels.com/photos/5935748/pexels-photo-5935748.jpeg?auto=compress&w=400',
  g4:   'https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&w=400',
}

type BadgeT = 'certified'|'diamond'|'featured'|'new'
function Badge({ type }: { type: BadgeT }) {
  const map: Record<BadgeT,{bg:string;color:string;label:string}> = {
    certified:{ bg:C.mint,    color:C.ink,  label:'SouKni Certified' },
    diamond:  { bg:C.ink,     color:C.mint, label:'Diamond Member'   },
    featured: { bg:'#fbbf24', color:C.ink,  label:'Featured'         },
    new:      { bg:C.mint,    color:'white', label:'New Arrival'     },
  }
  const s = map[type] || map.certified
  return (
    <span style={{ backgroundColor:s.bg, color:s.color, fontSize:'8px', ...CB, padding:'4px 10px', borderRadius:'6px', textTransform:'uppercase' as const, letterSpacing:'0.08em', display:'inline-block', boxShadow:'0 2px 6px rgba(0,0,0,0.15)', whiteSpace:'nowrap' as const }}>
      {s.label}
    </span>
  )
}

function FeaturedCard({ brand, title, price, location, img, badges }: any) {
  const [hov, setHov]     = useState(false)
  const [saved, setSaved] = useState(false)
  return (
    <div onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{ backgroundColor:'white', borderRadius:'24px', border:`1px solid ${hov?C.mint:'rgba(107,122,118,0.1)'}`, boxShadow:hov?`0 20px 40px ${C.mint}18`:'0 2px 8px rgba(0,0,0,0.04)', overflow:'hidden', transition:'all 0.3s', cursor:'pointer' }}>
      <div style={{ position:'relative', aspectRatio:'1/1', overflow:'hidden', backgroundColor:C.cream }}>
        <img src={img} alt={title} style={{ width:'100%', height:'100%', objectFit:'cover', transition:'transform 0.7s', transform:hov?'scale(1.08)':'scale(1)' }} />
        <div style={{ position:'absolute', top:'12px', left:'12px', display:'flex', flexDirection:'column' as const, gap:'5px' }}>
          {badges?.map((b:string)=><Badge key={b} type={b as BadgeT} />)}
        </div>
        <button onClick={e=>{e.stopPropagation();setSaved(!saved)}} style={{ position:'absolute', top:'10px', right:'10px', width:'32px', height:'32px', borderRadius:'50%', backgroundColor:'rgba(255,255,255,0.85)', border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}>
          <Heart size={14} fill={saved?'#ef4444':'none'} color={saved?'#ef4444':C.muted} />
        </button>
      </div>
      <div style={{ padding:'18px 20px' }}>
        <p style={{ fontSize:'9px', ...CB, color:C.mint, textTransform:'uppercase' as const, letterSpacing:'0.1em', marginBottom:'3px' }}>{brand}</p>
        <h4 style={{ fontSize:'15px', ...CB, color:hov?C.mint:C.ink, marginBottom:'4px', transition:'color 0.2s', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' as const }}>{title}</h4>
        <p style={{ fontSize:'20px', ...CB, color:C.mint, marginBottom:'6px' }}>{price.toLocaleString()} MAD</p>
        {location && <p style={{ fontSize:'10px', color:C.muted, ...CB, display:'flex', alignItems:'center', gap:'3px', marginBottom:'12px' }}><MapPin size={10}/>{location}</p>}
        <div style={{ display:'flex', gap:'8px' }}>
          <button style={{ flex:1, border:`2px solid ${C.ink}`, color:C.ink, backgroundColor:'transparent', padding:'10px', borderRadius:'12px', fontSize:'10px', ...CB, textTransform:'uppercase' as const, cursor:'pointer', transition:'all 0.15s' }}
            onMouseEnter={e=>{e.currentTarget.style.backgroundColor=C.ink;e.currentTarget.style.color='white'}}
            onMouseLeave={e=>{e.currentTarget.style.backgroundColor='transparent';e.currentTarget.style.color=C.ink}}
          >Message</button>
          <button style={{ flex:1, backgroundColor:'#25D366', color:'white', border:'none', padding:'10px', borderRadius:'12px', fontSize:'10px', ...CB, textTransform:'uppercase' as const, cursor:'pointer' }}>WhatsApp</button>
        </div>
      </div>
    </div>
  )
}

function GridCard({ brand, title, price, img, badge }: any) {
  const [saved, setSaved] = useState(false)
  const [hov,   setHov  ] = useState(false)
  return (
    <div onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{ backgroundColor:'white', borderRadius:'28px', border:`1px solid ${hov?C.mint:'rgba(107,122,118,0.1)'}`, boxShadow:hov?`0 16px 40px ${C.mint}18`:'0 2px 8px rgba(0,0,0,0.04)', overflow:'hidden', transition:'all 0.3s', cursor:'pointer' }}>
      <div style={{ position:'relative', aspectRatio:'1/1', overflow:'hidden', backgroundColor:C.cream }}>
        <img src={img} alt={title} style={{ width:'100%', height:'100%', objectFit:'cover', transition:'transform 0.7s', transform:hov?'scale(1.08)':'scale(1)' }} />
        <div style={{ position:'absolute', top:'10px', left:'10px' }}><Badge type={badge as BadgeT} /></div>
        <button onClick={e=>{e.stopPropagation();setSaved(!saved)}} style={{ position:'absolute', top:'8px', right:'8px', width:'28px', height:'28px', borderRadius:'50%', backgroundColor:'rgba(255,255,255,0.85)', border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}>
          <Heart size={12} fill={saved?'#ef4444':'none'} color={saved?'#ef4444':C.muted} />
        </button>
      </div>
      <div style={{ padding:'14px 16px' }}>
        <p style={{ fontSize:'9px', ...CB, color:C.muted, textTransform:'uppercase' as const, letterSpacing:'0.08em', marginBottom:'2px' }}>{brand}</p>
        <h4 style={{ fontSize:'13px', ...CB, color:hov?C.mint:C.ink, marginBottom:'6px', transition:'color 0.2s', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' as const }}>{title}</h4>
        <p style={{ fontSize:'15px', ...CB, color:C.mint, marginBottom:'10px' }}>{price.toLocaleString()} MAD</p>
        <div style={{ display:'flex', gap:'6px' }}>
          <button style={{ flex:1, border:`1px solid rgba(107,122,118,0.2)`, color:C.muted, backgroundColor:'transparent', padding:'7px', borderRadius:'10px', fontSize:'9px', ...CB, textTransform:'uppercase' as const, cursor:'pointer', transition:'all 0.15s' }}
            onMouseEnter={e=>{e.currentTarget.style.borderColor=C.mint;e.currentTarget.style.color=C.mint}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor='rgba(107,122,118,0.2)';e.currentTarget.style.color=C.muted}}
          >Message</button>
          <button style={{ flex:1, backgroundColor:C.mint, color:C.ink, border:'none', padding:'7px', borderRadius:'10px', fontSize:'9px', ...CB, textTransform:'uppercase' as const, cursor:'pointer' }}>WhatsApp</button>
        </div>
      </div>
    </div>
  )
}

const featuredItems = [
  { brand:'Ziana Prestige',    title:'Takchita Royale — Broderie Main',     price:18500, location:'Rabat, Agdal',      img:I.f1, badges:['featured','diamond']   },
  { brand:'Maison Couture',    title:'Kaftan Soiree — Velours & Perles',    price:12800, location:'Casablanca',         img:I.f2, badges:['featured','certified'] },
  { brand:"L'Artisan Rabat",   title:'Djellaba Luxe — Laine Fine',          price:4200,  location:'Rabat, Souissi',     img:I.f3, badges:['featured','new']       },
  { brand:'Atelier Zineb',     title:'Gandoura Été — Soie Pure',            price:3600,  location:'Marrakech, Hivernage',img:I.f4, badges:['featured','certified'] },
]

function makeGrid(count: number) {
  const brands  = ['Ziana Prestige','Maison Couture',"L'Artisan Rabat",'Atelier Zineb','Studio Nadia','Maison Hassan']
  const titles  = ['Takchita Brodée','Kaftan Cérémonie','Djellaba Classique','Gandoura Soie','Babouches Cuir','Caftan Moderne','Ceinture Brodée','Châle Traditionnel']
  const badges: BadgeT[] = ['certified','diamond','featured','new','certified','diamond']
  const imgs    = [I.g1,I.g2,I.g3,I.g4]
  return Array.from({length:count},(_,i)=>({
    brand: brands[i%brands.length],
    title: titles[i%titles.length],
    price: 500 + ((i*1973)%15000),
    img:   imgs[i%imgs.length],
    badge: badges[i%badges.length],
  }))
}
const gridItems = makeGrid(16)

const CATS = ['Takchita','Djellaba','Gandoura','Kaftan','Babouches','Bridal Traditional']

export default function TraditionalPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = React.use(params)

  const [activeSeller, setActiveSeller] = useState('All Sellers')
  const [diamond,      setDiamond     ] = useState(true)
  const [page,         setPage        ] = useState(1)
  const [keyword,      setKeyword     ] = useState('')
  const [city,         setCity        ] = useState('Rabat')
  const [price,        setPrice       ] = useState('Any Price')
  const [cityOpen,     setCityOpen    ] = useState(false)
  const [priceOpen,    setPriceOpen   ] = useState(false)

  const cities      = ['Rabat','Casablanca','Marrakech','Fès','Tanger','Agadir','Meknès']
  const priceRanges = ['Any Price','0 – 500 MAD','500 – 2,000 MAD','2,000 – 8,000 MAD','8,000 – 20,000 MAD','20,000+ MAD']

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
      <section style={{ position:'relative', height:'520px', display:'flex', alignItems:'center', justifyContent:'center', overflow:'hidden' }}>
        <img src={I.hero} alt="Traditional Wear" style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover' }} />
        <div style={{ position:'absolute', inset:0, backgroundColor:'rgba(22,29,27,0.55)' }} />
        <div style={{ position:'relative', zIndex:10, textAlign:'center' as const, maxWidth:'960px', padding:'0 24px', width:'100%' }}>
          <p style={{ fontSize:'11px', ...UB, color:C.mint, textTransform:'uppercase' as const, letterSpacing:'0.2em', marginBottom:'16px' }}>FASHION › TRADITIONAL WEAR</p>
          <h1 style={{ fontSize:'clamp(36px,6vw,72px)', ...UB, color:'white', marginBottom:'8px', lineHeight:1, textShadow:'0 4px 20px rgba(0,0,0,0.4)', textTransform:'uppercase' as const }}>
            TRADITIONAL<br/>MOROCCAN WEAR
          </h1>
          <p style={{ fontSize:'16px', color:'rgba(255,255,255,0.75)', marginBottom:'36px' }}>Takchita, Djellaba, Kaftan &amp; more — 1,680 listings across Morocco</p>
          <div style={{ maxWidth:'780px', margin:'0 auto', backgroundColor:'rgba(255,255,255,0.12)', backdropFilter:'blur(12px)', border:'1px solid rgba(255,255,255,0.22)', borderRadius:'100px', padding:'8px', display:'flex', alignItems:'center' }}>
            <div style={{ flex:1, padding:'0 28px', borderRight:'1px solid rgba(255,255,255,0.22)', display:'flex', flexDirection:'column' as const, gap:'2px' }}>
              <span style={{ fontSize:'9px', ...UB, color:'rgba(255,255,255,0.62)', textTransform:'uppercase' as const, letterSpacing:'0.15em' }}>CITY</span>
              <div style={{ display:'flex', alignItems:'center', gap:'6px', color:'white', fontSize:'14px', ...UB }}>Rabat <ChevronDown size={14} /></div>
            </div>
            <div style={{ flex:2, padding:'0 28px', display:'flex', flexDirection:'column' as const, gap:'2px' }}>
              <span style={{ fontSize:'9px', ...UB, color:'rgba(255,255,255,0.62)', textTransform:'uppercase' as const, letterSpacing:'0.15em' }}>KEYWORD</span>
              <input type="text" value={keyword} onChange={e=>setKeyword(e.target.value)} placeholder="Takchita, Kaftan, Djellaba, Gandoura..."
                style={{ backgroundColor:'transparent', border:'none', outline:'none', color:'white', fontSize:'14px', ...UB, fontFamily:'Inter,sans-serif', width:'100%' }} />
            </div>
            <button style={{ backgroundColor:C.mint, color:C.ink, border:'none', padding:'16px 44px', borderRadius:'100px', fontSize:'11px', ...UB, textTransform:'uppercase' as const, letterSpacing:'0.12em', cursor:'pointer' }}>SEARCH</button>
          </div>
        </div>
      </section>

      {/* FILTER BAR */}
      <div style={{ maxWidth:'1280px', margin:'-40px auto 0', padding:'0 24px', position:'relative', zIndex:30 }}>
        <div style={{ backgroundColor:'rgba(255,255,255,0.97)', backdropFilter:'blur(16px)', border:'1px solid rgba(107,122,118,0.12)', borderRadius:'100px', boxShadow:'0 12px 40px rgba(0,0,0,0.08)', display:'flex', alignItems:'stretch', height:'72px' }}>
          <DDrop label="CITY" value={city} options={cities} open={cityOpen} setOpen={setCityOpen} onChange={setCity} />
          <div style={{ width:'1px', backgroundColor:'rgba(107,122,118,0.12)', margin:'12px 0' }} />
          <div style={{ flex:1.8, padding:'0 22px', display:'flex', flexDirection:'column' as const, justifyContent:'center' }}>
            <span style={{ fontSize:'9px', ...UB, textTransform:'uppercase' as const, letterSpacing:'0.14em', color:C.muted, marginBottom:'3px' }}>KEYWORD</span>
            <div style={{ display:'flex', alignItems:'center', gap:'8px' }}>
              <Search size={13} color={C.muted} />
              <input type="text" value={keyword} onChange={e=>setKeyword(e.target.value)} placeholder="Takchita, Kaftan, Djellaba..."
                style={{ flex:1, background:'none', border:'none', outline:'none', fontSize:'14px', ...UB, color:C.ink, fontFamily:'Inter,sans-serif' }} />
              {keyword && <button onClick={()=>setKeyword('')} style={{ background:'none', border:'none', cursor:'pointer', color:C.muted, fontSize:'16px' }}>✕</button>}
            </div>
          </div>
          <div style={{ width:'1px', backgroundColor:'rgba(107,122,118,0.12)', margin:'12px 0' }} />
          <DDrop label="PRICE (MAD)" value={price} options={priceRanges} open={priceOpen} setOpen={setPriceOpen} onChange={setPrice} />
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
            { label:'Rabat',           href:`/${locale}` },
            { label:'Fashion',         href:`/${locale}/fashion` },
            { label:'Traditional Wear',href:null },
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
            <h2 style={{ fontSize:'clamp(20px,2.5vw,28px)', ...UB, color:C.ink, marginBottom:'4px' }}>Traditional Moroccan Wear for Sale in Rabat</h2>
            <p style={{ fontSize:'14px', color:C.mint, ...CB }}>1,680 Ads</p>
          </div>
          <div style={{ display:'flex', gap:'10px' }}>
            {['Sort: Default','Save Search'].map(b=>(
              <button key={b} style={{ border:'1px solid rgba(107,122,118,0.2)', backgroundColor:'white', padding:'9px 18px', borderRadius:'12px', fontSize:'10px', ...UB, cursor:'pointer', color:C.muted, letterSpacing:'0.1em', textTransform:'uppercase' as const, transition:'all 0.15s' }}
                onMouseEnter={e=>{e.currentTarget.style.borderColor=C.mint;e.currentTarget.style.color=C.ink}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor='rgba(107,122,118,0.2)';e.currentTarget.style.color=C.muted}}
              >{b}</button>
            ))}
          </div>
        </div>

        {/* SUBCATEGORY PILLS — link to [category] subpages */}
        <div style={{ display:'flex', gap:'10px', flexWrap:'wrap' as const, marginBottom:'20px' }}>
          {CATS.map(cat=>{
            const slug = cat.toLowerCase().replace(/\s+/g,'-').replace(/[^a-z0-9-]/g,'')
            return (
              <Link key={cat} href={`/${locale}/fashion/traditional/${slug}`}
                style={{ padding:'10px 22px', borderRadius:'100px', fontSize:'11px', ...UB, textTransform:'uppercase' as const, letterSpacing:'0.1em', cursor:'pointer', border:'1px solid rgba(186,202,197,0.4)', backgroundColor:'white', color:C.muted, textDecoration:'none', display:'inline-block', transition:'all 0.2s' }}
                onMouseEnter={e=>{e.currentTarget.style.borderColor=C.mint;e.currentTarget.style.color=C.ink;e.currentTarget.style.backgroundColor=`${C.mint}0a`}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor='rgba(186,202,197,0.4)';e.currentTarget.style.color=C.muted;e.currentTarget.style.backgroundColor='white'}}
              >{cat}</Link>
            )
          })}
        </div>

        {/* SELLER TABS + DIAMOND */}
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap' as const, gap:'14px', marginBottom:'20px' }}>
          <div style={{ display:'flex', gap:'4px', padding:'5px', backgroundColor:'#e8efec', borderRadius:'100px' }}>
            {['All Sellers','SouKni Members','SouKni Pro'].map(tab=>(
              <button key={tab} onClick={()=>setActiveSeller(tab)}
                style={{ padding:'10px 24px', borderRadius:'100px', fontSize:'11px', ...UB, textTransform:'uppercase' as const, letterSpacing:'0.1em', cursor:'pointer', border:'none', transition:'all 0.2s',
                  backgroundColor: activeSeller===tab?C.ink:'transparent', color:activeSeller===tab?'white':C.muted, boxShadow:activeSeller===tab?'0 2px 8px rgba(0,0,0,0.15)':'none',
                }}
              >{tab}</button>
            ))}
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:'12px', cursor:'pointer' }} onClick={()=>setDiamond(!diamond)}>
            <span style={{ fontSize:'10px', ...UB, color:C.muted, textTransform:'uppercase' as const, letterSpacing:'0.1em' }}>Show SouKni Diamond First</span>
            <div style={{ width:'52px', height:'26px', borderRadius:'100px', backgroundColor:diamond?C.mint:'rgba(107,122,118,0.25)', position:'relative', transition:'background 0.25s' }}>
              <div style={{ position:'absolute', top:'3px', left:diamond?'29px':'3px', width:'20px', height:'20px', borderRadius:'50%', backgroundColor:C.ink, transition:'left 0.25s' }} />
            </div>
          </div>
        </div>

        {/* QUICK FILTERS */}
        <div style={{ display:'flex', justifyContent:'flex-end', marginBottom:'32px' }}>
          <div style={{ display:'flex', gap:'10px' }}>
            {['New Arrivals','Price Drop Alert'].map(btn=>(
              <button key={btn} style={{ display:'flex', alignItems:'center', gap:'6px', padding:'9px 18px', borderRadius:'100px', border:'1px solid rgba(107,122,118,0.2)', backgroundColor:'transparent', fontSize:'12px', ...UB, cursor:'pointer', color:C.muted, transition:'all 0.15s' }}
                onMouseEnter={e=>{e.currentTarget.style.borderColor=C.mint;e.currentTarget.style.color=C.ink}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor='rgba(107,122,118,0.2)';e.currentTarget.style.color=C.muted}}
              >{btn}</button>
            ))}
          </div>
        </div>

        {/* FEATURED SECTION */}
        <section style={{ marginBottom:'48px' }}>
          <h3 style={{ fontSize:'13px', ...UB, color:C.muted, textTransform:'uppercase' as const, letterSpacing:'0.14em', marginBottom:'20px' }}>Featured Traditional Wear</h3>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'20px' }}>
            {featuredItems.map((item,i)=><FeaturedCard key={i} {...item} />)}
          </div>
        </section>

        {/* MAIN GRID — 4 rows of 4 */}
        <section style={{ marginBottom:'48px' }}>
          <p style={{ fontSize:'13px', color:C.muted, ...CB, marginBottom:'20px' }}>Showing 16 of 1,680 results</p>
          {[gridItems.slice(0,4),gridItems.slice(4,8),gridItems.slice(8,12),gridItems.slice(12,16)].map((row,ri)=>(
            <div key={ri} style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'20px', marginBottom:'20px' }}>
              {row.map((item,j)=><GridCard key={j} {...item} />)}
            </div>
          ))}
        </section>

        {/* PAGINATION */}
        <div style={{ display:'flex', justifyContent:'center', alignItems:'center', gap:'10px', marginBottom:'64px' }}>
          <button style={{ width:'44px', height:'44px', borderRadius:'12px', backgroundColor:'white', border:'1px solid rgba(107,122,118,0.12)', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', color:C.muted }}><ChevronLeft size={18} /></button>
          {[1,2,3].map(p=>(
            <button key={p} onClick={()=>setPage(p)} style={{ width:'44px', height:'44px', borderRadius:'12px', cursor:'pointer', fontSize:'15px', ...UB, border:'1px solid', transition:'all 0.2s', backgroundColor:page===p?C.mint:'white', color:page===p?C.ink:C.muted, borderColor:page===p?C.mint:'rgba(107,122,118,0.12)' }}>{p}</button>
          ))}
          <button style={{ width:'44px', height:'44px', borderRadius:'12px', backgroundColor:'white', border:'1px solid rgba(107,122,118,0.12)', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', color:C.muted }}><ChevronRight size={18} /></button>
        </div>

        {/* CROSS-NAV BACK */}
        <div style={{ textAlign:'center' as const, paddingTop:'40px', borderTop:'1px solid rgba(107,122,118,0.12)' }}>
          <p style={{ fontSize:'11px', ...UB, color:C.muted, textTransform:'uppercase' as const, letterSpacing:'0.14em', marginBottom:'16px' }}>Explore More Fashion</p>
          <div style={{ display:'flex', gap:'10px', justifyContent:'center', flexWrap:'wrap' as const }}>
            {['Shoes','Bags','Jewelry','Sports','Vintage','Wedding'].map(cat=>(
              <Link key={cat} href={`/${locale}/fashion/${cat.toLowerCase()}`}
                style={{ padding:'10px 22px', borderRadius:'100px', fontSize:'11px', ...UB, textTransform:'uppercase' as const, border:'1px solid rgba(186,202,197,0.4)', backgroundColor:'white', color:C.muted, textDecoration:'none', transition:'all 0.2s' }}
                onMouseEnter={e=>{e.currentTarget.style.borderColor=C.mint;e.currentTarget.style.color=C.ink}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor='rgba(186,202,197,0.4)';e.currentTarget.style.color=C.muted}}
              >{cat}</Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
