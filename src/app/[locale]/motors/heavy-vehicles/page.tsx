'use client'

import { useState, useEffect } from 'react'
import { useListings } from '@/hooks/useListings'
import React from 'react'
import { Heart, Search, ChevronDown, ChevronLeft, ChevronRight, SlidersHorizontal, MapPin, Plus } from 'lucide-react'
import Link from 'next/link'

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

const I = {
  hero:    'https://images.pexels.com/photos/162553/excavator-construction-site-machine-162553.jpeg?auto=compress&w=1600',
  c1:      'https://images.pexels.com/photos/175389/pexels-photo-175389.jpeg?auto=compress&w=600',
  c2:      'https://images.pexels.com/photos/162553/excavator-construction-site-machine-162553.jpeg?auto=compress&w=600',
  c3:      'https://images.pexels.com/photos/2760243/pexels-photo-2760243.jpeg?auto=compress&w=600',
  c4:      'https://images.pexels.com/photos/4506105/pexels-photo-4506105.jpeg?auto=compress&w=600',
  bento1:  'https://images.pexels.com/photos/162240/harvest-combine-harvester-agriculture-machine-162240.jpeg?auto=compress&w=900',
  bento2:  'https://images.pexels.com/photos/4506270/pexels-photo-4506270.jpeg?auto=compress&w=600',
  bento3:  'https://images.pexels.com/photos/2933243/pexels-photo-2933243.jpeg?auto=compress&w=600',
  bento4:  'https://images.pexels.com/photos/2199293/pexels-photo-2199293.jpeg?auto=compress&w=600',
  inspect: 'https://images.pexels.com/photos/4506105/pexels-photo-4506105.jpeg?auto=compress&w=1200',
  power:   'https://images.pexels.com/photos/2760243/pexels-photo-2760243.jpeg?auto=compress&w=1200',
  g1:      'https://images.pexels.com/photos/162553/excavator-construction-site-machine-162553.jpeg?auto=compress&w=400',
  g2:      'https://images.pexels.com/photos/175389/pexels-photo-175389.jpeg?auto=compress&w=400',
  g3:      'https://images.pexels.com/photos/4506105/pexels-photo-4506105.jpeg?auto=compress&w=400',
  g4:      'https://images.pexels.com/photos/2760243/pexels-photo-2760243.jpeg?auto=compress&w=400',
  g5:      'https://images.pexels.com/photos/4506270/pexels-photo-4506270.jpeg?auto=compress&w=400',
}

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

function FeaturedCard({ brand, title, price, location, img, badges }: any) {
  const [hov, setHov]     = useState(false)
  const [saved, setSaved] = useState(false)
  return (
    <div onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{ backgroundColor:'white', borderRadius:'24px', border:`1px solid ${hov?C.mint:'rgba(107,122,118,0.1)'}`, boxShadow:hov?`0 20px 40px ${C.mint}18`:'0 2px 8px rgba(0,0,0,0.04)', overflow:'hidden', transition:'all 0.3s', cursor:'pointer' }}>
      <div style={{ position:'relative', aspectRatio:'1/1', overflow:'hidden', backgroundColor:C.cream }}>
        <img src={img} alt={title} style={{ width:'100%', height:'100%', objectFit:'cover', transition:'transform 0.7s', transform:hov?'scale(1.1)':'scale(1)' }} />
        <div style={{ position:'absolute', top:'12px', left:'12px', display:'flex', flexDirection:'column' as const, gap:'5px' }}>
          {badges?.map((b:string)=><Badge key={b} type={b as BadgeT} />)}
        </div>
        <button onClick={e=>{e.stopPropagation();setSaved(!saved)}} style={{ position:'absolute', top:'10px', right:'10px', width:'32px', height:'32px', borderRadius:'50%', backgroundColor:'rgba(255,255,255,0.85)', border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}>
          <Heart size={14} fill={saved?'#ef4444':'none'} color={saved?'#ef4444':C.muted} />
        </button>
      </div>
      <div style={{ padding:'18px 20px' }}>
        <p style={{ fontSize:'9px', ...CB, color:C.mint, textTransform:'uppercase' as const, letterSpacing:'0.1em', marginBottom:'3px' }}>{brand}</p>
        <h4 style={{ fontSize:'14px', ...CB, color:hov?C.mint:C.ink, marginBottom:'4px', transition:'color 0.2s', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' as const }}>{title}</h4>
        <p style={{ fontSize:'20px', ...CB, color:C.mint, marginBottom:'4px' }}>MAD {price.toLocaleString()}</p>
        {location && <p style={{ fontSize:'10px', color:C.muted, ...CB, display:'flex', alignItems:'center', gap:'3px', marginBottom:'14px' }}><MapPin size={10}/>{location}</p>}
        <div style={{ display:'flex', gap:'8px' }}>
          <button style={{ flex:1, border:`2px solid ${C.mint}`, color:C.ink, backgroundColor:'transparent', padding:'10px', borderRadius:'12px', fontSize:'10px', ...CB, textTransform:'uppercase' as const, cursor:'pointer', transition:'all 0.15s' }}
            onMouseEnter={e=>e.currentTarget.style.backgroundColor=C.mint}
            onMouseLeave={e=>e.currentTarget.style.backgroundColor='transparent'}
          >Message</button>
          <button style={{ flex:1, backgroundColor:'#25D366', color:'white', border:'none', padding:'10px', borderRadius:'12px', fontSize:'10px', ...CB, textTransform:'uppercase' as const, cursor:'pointer' }}>Call</button>
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
        <img src={img} alt={title} style={{ width:'100%', height:'100%', objectFit:'cover', transition:'transform 0.7s', transform:hov?'scale(1.1)':'scale(1)' }} />
        <div style={{ position:'absolute', top:'10px', left:'10px' }}><Badge type={badge as BadgeT} /></div>
        <button onClick={e=>{e.stopPropagation();setSaved(!saved)}} style={{ position:'absolute', top:'8px', right:'8px', width:'28px', height:'28px', borderRadius:'50%', backgroundColor:'rgba(255,255,255,0.85)', border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}>
          <Heart size={12} fill={saved?'#ef4444':'none'} color={saved?'#ef4444':C.muted} />
        </button>
      </div>
      <div style={{ padding:'14px 16px' }}>
        <p style={{ fontSize:'9px', ...CB, color:C.muted, textTransform:'uppercase' as const, letterSpacing:'0.08em', marginBottom:'2px' }}>{brand}</p>
        <h4 style={{ fontSize:'12px', ...CB, color:hov?C.mint:C.ink, marginBottom:'8px', transition:'color 0.2s', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' as const }}>{title}</h4>
        <p style={{ fontSize:'14px', ...CB, color:C.mint, marginBottom:'10px' }}>MAD {price.toLocaleString()}</p>
        <div style={{ display:'flex', gap:'6px' }}>
          <button style={{ flex:1, border:`1px solid rgba(107,122,118,0.2)`, color:C.muted, backgroundColor:'transparent', padding:'7px', borderRadius:'10px', fontSize:'9px', ...CB, textTransform:'uppercase' as const, cursor:'pointer', transition:'all 0.15s' }}
            onMouseEnter={e=>{e.currentTarget.style.borderColor=C.mint;e.currentTarget.style.color=C.mint}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor='rgba(107,122,118,0.2)';e.currentTarget.style.color=C.muted}}
          >Message</button>
          <button style={{ flex:1, backgroundColor:C.mint, color:C.ink, border:'none', padding:'7px', borderRadius:'10px', fontSize:'9px', ...CB, textTransform:'uppercase' as const, cursor:'pointer' }}>Call</button>
        </div>
      </div>
    </div>
  )
}

const featuredItems = [
  { brand:'John Deere',    title:'8R 410 Tractor — 2024',            price:2850000, location:'Rabat',      img:I.c1, badges:['featured','diamond']   },
  { brand:'Caterpillar',   title:'320 Hydraulic Excavator',           price:1450000, location:'Rabat',      img:I.c2, badges:['featured','diamond']   },
  { brand:'Liebherr',      title:'LTM 1060 Mobile Crane',              price:4800000, location:'Tangier',    img:I.c3, badges:['featured','certified'] },
  { brand:'JCB',           title:'540-170 Telehandler',                price:1250000, location:'Tangier',    img:I.c4, badges:['featured','new']       },
]

function makeGrid(count: number) {
  const brands = ['Caterpillar','John Deere','Komatsu','Liebherr','JCB','New Holland','Case IH','Mercedes-Benz']
  const titles = ['320 Excavator','8R 410 Tractor','D65 Bulldozer','LTM 1060 Crane','540-170 Telehandler','CR11 Combine','Magnum 380 Tractor','Arocs 3240 Mixer']
  const imgs   = [I.g1,I.g2,I.g3,I.g4,I.g5]
  const badges: BadgeT[] = ['certified','diamond','featured','new','certified']
  return Array.from({length:count},(_,i)=>({
    brand: brands[i%brands.length],
    title: titles[i%titles.length],
    price: 450000 + ((i*97310)%4500000),
    img:   imgs[i%imgs.length],
    badge: badges[i%badges.length],
  }))
}

const CATS = [
  { label:'All Equipment',      slug:'all-equipment'    },
  { label:'Agricultural',       slug:'agricultural'     },
  { label:'Construction',       slug:'construction'     },
  { label:'Cranes & Lifting',   slug:'cranes-lifting'   },
  { label:'Trucks & Buses',     slug:'trucks-buses'     },
  { label:'Generators & Power', slug:'generators-power' },
]

export default function HeavyVehiclesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale }                      = React.use(params)
  const [activeSeller, setActiveSeller] = useState('All Sellers')
  const [diamond,      setDiamond     ] = useState(true)
  const [gridView,     setGridView    ] = useState(true)
  const [page,         setPage        ] = useState(1)
  const [keyword,      setKeyword     ] = useState('')
  const [city,         setCity        ] = useState('All Morocco')
  const [equipType,    setEquipType   ] = useState('Any Type')
  const [price,        setPrice       ] = useState('Any Price')
  const [hours,        setHours       ] = useState('Any Hours of Use')
  const [cityOpen,     setCityOpen    ] = useState(false)
  const [typeOpen,     setTypeOpen    ] = useState(false)
  const [priceOpen,    setPriceOpen   ] = useState(false)

  const { fetchListings } = useListings()
  const [dbListings, setDbListings] = useState<any[]>([])
  useEffect(() => {
    const t = setTimeout(() => {
      fetchListings({ category: 'motors', sortBy: 'newest', limit: 24 }).then(rows => setDbListings(rows || []))
    }, 400)
    return () => clearTimeout(t)
  }, [])
  function mapDbRowToCard(row: any) {
    return {
      brand: row.brand || '',
      title: row.title,
      price: (row.price || 0) / 100,
      img: (row.images && row.images[0]) || I.g1,
      badge: row.badge || 'certified',
    }
  }
  const hasRealData = dbListings.length > 0
  const gridItems = hasRealData ? dbListings.map(mapDbRowToCard) : makeGrid(16)
  const [hoursOpen,    setHoursOpen   ] = useState(false)

  const cities  = ['All Morocco','Casablanca','Rabat','Marrakech','Fès','Tanger','Agadir','Meknès']
  const types   = ['Any Type','Tractors','Excavators','Cranes','Forklifts','Trucks','Buses','Generators']
  const prices  = ['Any Price','0 – 500,000 MAD','500,000 – 1,500,000 MAD','1,500,000 – 3,000,000 MAD','3,000,000+ MAD']
  const hoursOpts=['Any Hours of Use','0 – 500 hrs','500 – 2,000 hrs','2,000 – 5,000 hrs','5,000+ hrs']

  function DDrop({ label, value, options, open, setOpen, onChange }: any) {
    return (
      <div style={{ position:'relative', flex:1 }}>
        <button onClick={()=>{ setOpen(!open); setCityOpen(false); setTypeOpen(false); setPriceOpen(false); setHoursOpen(false) }}
          style={{ width:'100%', height:'100%', background:'none', border:'none', cursor:'pointer', padding:'0 18px', display:'flex', flexDirection:'column' as const, justifyContent:'center', textAlign:'left' as const }}>
          <span style={{ fontSize:'9px', ...UB, textTransform:'uppercase' as const, letterSpacing:'0.14em', color:C.muted, marginBottom:'3px' }}>{label}</span>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
            <span style={{ fontSize:'13px', ...UB, color:C.ink, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' as const }}>{value}</span>
            <ChevronDown size={13} color={C.mint} style={{ flexShrink:0, transition:'transform 0.2s', transform:open?'rotate(180deg)':'rotate(0)' }} />
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

      {/* ══ 1. HERO ══════════════════════════════════════════ */}
      <section style={{ position:'relative', height:'520px', display:'flex', alignItems:'center', justifyContent:'center', overflow:'hidden' }}>
        <img src={I.hero} alt="Heavy Vehicles & Equipment" style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover' }} />
        <div style={{ position:'absolute', inset:0, backgroundColor:'rgba(22,29,27,0.42)' }} />
        <div style={{ position:'relative', zIndex:10, textAlign:'center' as const, maxWidth:'960px', padding:'0 24px', width:'100%' }}>
          <h1 style={{ fontSize:'clamp(36px,6vw,64px)', ...UB, color:'white', marginBottom:'36px', lineHeight:1, textShadow:'0 4px 20px rgba(0,0,0,0.4)' }}>
            HEAVY VEHICLES & EQUIPMENT.<br/><span style={{ color:C.mint }}>AGRICULTURAL, CONSTRUCTION & MORE.</span>
          </h1>
          <div style={{ maxWidth:'780px', margin:'0 auto', backgroundColor:'rgba(255,255,255,0.12)', backdropFilter:'blur(12px)', border:'1px solid rgba(255,255,255,0.22)', borderRadius:'100px', padding:'8px', display:'flex', alignItems:'center' }}>
            <div style={{ flex:1, padding:'0 28px', borderRight:'1px solid rgba(255,255,255,0.22)', display:'flex', flexDirection:'column' as const, gap:'2px' }}>
              <span style={{ fontSize:'9px', ...UB, color:'rgba(255,255,255,0.62)', textTransform:'uppercase' as const, letterSpacing:'0.15em' }}>CITY</span>
              <div style={{ display:'flex', alignItems:'center', gap:'6px', color:'white', fontSize:'14px', ...UB }}>All Morocco <ChevronDown size={14} /></div>
            </div>
            <div style={{ flex:2, padding:'0 28px', display:'flex', flexDirection:'column' as const, gap:'2px' }}>
              <span style={{ fontSize:'9px', ...UB, color:'rgba(255,255,255,0.62)', textTransform:'uppercase' as const, letterSpacing:'0.15em' }}>SEARCH</span>
              <input type="text" value={keyword} onChange={e=>setKeyword(e.target.value)} placeholder="Search brands, equipment types..."
                style={{ backgroundColor:'transparent', border:'none', outline:'none', color:'white', fontSize:'14px', ...UB, fontFamily:'Inter,sans-serif', width:'100%' }} />
            </div>
            <button style={{ backgroundColor:C.mint, color:C.ink, border:'none', padding:'16px 44px', borderRadius:'100px', fontSize:'11px', ...UB, textTransform:'uppercase' as const, letterSpacing:'0.12em', cursor:'pointer', transition:'filter 0.15s' }}
              onMouseEnter={e=>e.currentTarget.style.filter='brightness(1.08)'}
              onMouseLeave={e=>e.currentTarget.style.filter='brightness(1)'}
            >SEARCH</button>
          </div>
        </div>
      </section>

      {/* ══ 2. ADVANCED FILTER BAR ═══════════════════════════ */}
      <div style={{ maxWidth:'1280px', margin:'-40px auto 0', padding:'0 24px', position:'relative', zIndex:30 }}>
        <div style={{ backgroundColor:'rgba(255,255,255,0.97)', backdropFilter:'blur(16px)', border:'1px solid rgba(107,122,118,0.12)', borderRadius:'100px', boxShadow:'0 12px 40px rgba(0,0,0,0.08)', display:'flex', alignItems:'stretch', height:'72px' }}>
          <DDrop label="CITY" value={city} options={cities} open={cityOpen} setOpen={setCityOpen} onChange={setCity} />
          <div style={{ width:'1px', backgroundColor:'rgba(107,122,118,0.12)', margin:'12px 0' }} />
          <DDrop label="EQUIPMENT TYPE" value={equipType} options={types} open={typeOpen} setOpen={setTypeOpen} onChange={setEquipType} />
          <div style={{ width:'1px', backgroundColor:'rgba(107,122,118,0.12)', margin:'12px 0' }} />
          <DDrop label="PRICE (MAD)" value={price} options={prices} open={priceOpen} setOpen={setPriceOpen} onChange={setPrice} />
          <div style={{ width:'1px', backgroundColor:'rgba(107,122,118,0.12)', margin:'12px 0' }} />
          <DDrop label="HOURS OF USE" value={hours} options={hoursOpts} open={hoursOpen} setOpen={setHoursOpen} onChange={setHours} />
          <div style={{ width:'1px', backgroundColor:'rgba(107,122,118,0.12)', margin:'12px 0' }} />
          <button style={{ display:'flex', alignItems:'center', gap:'8px', padding:'0 24px', background:'none', border:'none', cursor:'pointer', borderRadius:'0 100px 100px 0', transition:'background 0.15s', flexShrink:0 }}
            onMouseEnter={e=>e.currentTarget.style.backgroundColor=`${C.mint}14`}
            onMouseLeave={e=>e.currentTarget.style.backgroundColor='transparent'}
          >
            <SlidersHorizontal size={17} color={C.mint} />
            <span style={{ fontSize:'13px', ...UB, color:C.ink }}>Filters</span>
          </button>
        </div>
      </div>

      <main style={{ maxWidth:'1280px', margin:'0 auto', padding:'32px 24px 80px' }}>

        {/* ══ 3. BREADCRUMB + TITLE + SORT ═════════════════════ */}
        <nav style={{ display:'flex', alignItems:'center', gap:'6px', fontSize:'10px', ...UB, color:C.muted, textTransform:'uppercase' as const, letterSpacing:'0.12em', marginBottom:'12px' }}>
          {['Home','Motors','Heavy Vehicles'].map((c,i,arr)=>(
            <React.Fragment key={c}>
              {i<arr.length-1
                ? <><Link href={i===0?`/${locale}`:`/${locale}/motors`} style={{ color:C.muted, textDecoration:'none' }} onMouseEnter={e=>e.currentTarget.style.color=C.mint} onMouseLeave={e=>e.currentTarget.style.color=C.muted}>{c}</Link><span style={{ opacity:0.4 }}>›</span></>
                : <span style={{ color:C.ink }}>{c}</span>}
            </React.Fragment>
          ))}
        </nav>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', gap:'16px', marginBottom:'24px', flexWrap:'wrap' as const }}>
          <div>
            <h2 style={{ fontSize:'clamp(20px,2.5vw,28px)', ...UB, color:C.ink, marginBottom:'4px' }}>Heavy & Agro Vehicles for Sale in Morocco</h2>
            <p style={{ fontSize:'14px', color:C.mint, ...CB }}>192 Ads across Morocco</p>
          </div>
          <div style={{ display:'flex', gap:'10px' }}>
            {['Sort: Default','Save Search'].map(b=>(
              <button key={b} style={{ backgroundColor:'white', border:'1px solid rgba(107,122,118,0.18)', padding:'9px 16px', borderRadius:'12px', fontSize:'10px', ...UB, textTransform:'uppercase' as const, letterSpacing:'0.1em', cursor:'pointer', color:C.ink, transition:'background 0.15s' }}
                onMouseEnter={e=>e.currentTarget.style.backgroundColor=C.surface}
                onMouseLeave={e=>e.currentTarget.style.backgroundColor='white'}
              >{b}</button>
            ))}
          </div>
        </div>

        {/* ══ 4. CATEGORY PILLS + VIEW MORE ════════════════════ */}
        <div style={{ display:'flex', gap:'10px', flexWrap:'wrap' as const, marginBottom:'20px', alignItems:'center' }}>
          {CATS.map(cat=>(
            <Link key={cat.slug} href={`/${locale}/motors/heavy-vehicles/${cat.slug}`}
              style={{ padding:'10px 22px', borderRadius:'100px', fontSize:'11px', ...UB, textTransform:'uppercase' as const, letterSpacing:'0.1em', cursor:'pointer', transition:'all 0.2s', border:'1px solid', textDecoration:'none', display:'inline-block',
                backgroundColor:'white', color:C.muted, borderColor:'rgba(186,202,197,0.4)',
              }}
              onMouseEnter={e=>{e.currentTarget.style.backgroundColor=C.mint;e.currentTarget.style.color=C.ink;e.currentTarget.style.borderColor=C.mint}}
              onMouseLeave={e=>{e.currentTarget.style.backgroundColor='white';e.currentTarget.style.color=C.muted;e.currentTarget.style.borderColor='rgba(186,202,197,0.4)'}}
            >{cat.label}</Link>
          ))}
          <button style={{ display:'flex', alignItems:'center', gap:'6px', padding:'10px 22px', borderRadius:'100px', fontSize:'11px', ...UB, textTransform:'uppercase' as const, letterSpacing:'0.1em', cursor:'pointer', transition:'all 0.2s', border:`1px solid ${C.mint}`, backgroundColor:'transparent', color:C.mint }}
            onMouseEnter={e=>{e.currentTarget.style.backgroundColor=C.mint;e.currentTarget.style.color=C.ink}}
            onMouseLeave={e=>{e.currentTarget.style.backgroundColor='transparent';e.currentTarget.style.color=C.mint}}
          ><Plus size={14} /> View More</button>
        </div>

        {/* ══ 5. SELLER TABS + DIAMOND TOGGLE ══════════════════ */}
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

        {/* ══ 6. NEW ARRIVALS + GRID TOGGLE ════════════════════ */}
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'40px' }}>
          <div style={{ display:'flex', gap:'10px' }}>
            {['New Arrivals','Price Drop Alert'].map(btn=>(
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

        {/* ══ 7. FEATURED EQUIPMENT ═════════════════════════════ */}
        <section style={{ marginBottom:'48px' }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'24px' }}>
            <div>
              <h3 style={{ fontSize:'clamp(18px,2.5vw,24px)', ...UB, color:C.ink, textTransform:'uppercase' as const, marginBottom:'4px' }}>Featured Heavy Equipment</h3>
              <p style={{ fontSize:'14px', color:C.muted }}>Inspected agricultural and construction machinery</p>
            </div>
            <a href="#" style={{ fontSize:'12px', ...UB, color:C.mint, textDecoration:'none' }}>View All Featured</a>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'24px' }}>
            {featuredItems.map((item,i)=><FeaturedCard key={i} {...item} />)}
          </div>
        </section>

        {/* ══ 8. INSPECTION SERVICES BANNER ═════════════════════ */}
        <section style={{ marginBottom:'64px' }}>
          <div style={{ backgroundColor:C.ink, borderRadius:'40px', padding:'56px 64px', display:'flex', alignItems:'center', justifyContent:'space-between', position:'relative' as const, overflow:'hidden', minHeight:'240px', boxShadow:'0 16px 48px rgba(0,0,0,0.2)', flexWrap:'wrap' as const, gap:'24px' }}>
            <div style={{ position:'absolute', right:'-48px', bottom:'-48px', width:'320px', height:'320px', backgroundColor:`${C.mint}18`, borderRadius:'50%' }} />
            <div style={{ position:'absolute', right:'120px', top:'-60px', width:'200px', height:'200px', backgroundColor:`${C.mint}0a`, borderRadius:'50%' }} />
            <div style={{ position:'relative', zIndex:1, maxWidth:'480px' }}>
              <p style={{ fontSize:'11px', ...UB, color:C.mint, textTransform:'uppercase' as const, letterSpacing:'0.15em', marginBottom:'16px' }}>SOUKNI AUTO PRO</p>
              <h2 style={{ fontSize:'clamp(24px,3.5vw,38px)', ...UB, color:'white', marginBottom:'20px', lineHeight:1.1 }}>Get your heavy equipment professionally inspected before selling.</h2>
              <button style={{ backgroundColor:C.mint, color:C.ink, border:'none', padding:'16px 40px', borderRadius:'100px', fontSize:'11px', ...UB, textTransform:'uppercase' as const, letterSpacing:'0.12em', cursor:'pointer', transition:'transform 0.2s' }}
                onMouseEnter={e=>e.currentTarget.style.transform='scale(1.04)'}
                onMouseLeave={e=>e.currentTarget.style.transform='scale(1)'}
              >Book Inspection</button>
            </div>
          </div>
        </section>

        {/* ══ 9. EXCLUSIVE FLEET COLLECTION BENTO ══════════════ */}
        <section style={{ marginBottom:'64px' }}>
          <h3 style={{ fontSize:'clamp(20px,3vw,32px)', ...UB, color:C.ink, textTransform:'uppercase' as const, marginBottom:'32px' }}>Exclusive Fleet Collection</h3>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gridTemplateRows:'380px 380px', gap:'20px' }}>
            <div style={{ gridColumn:'1/3', gridRow:'1/3', backgroundColor:'white', borderRadius:'40px', overflow:'hidden', display:'flex', flexDirection:'column' as const, border:'1px solid rgba(107,122,118,0.1)' }}>
              <div style={{ flex:1, overflow:'hidden', position:'relative', minHeight:0 }}>
                <img src={I.bento1} alt="New Holland Combine" style={{ width:'100%', height:'100%', objectFit:'cover' }} />
                <div style={{ position:'absolute', top:'20px', left:'20px' }}>
                  <span style={{ backgroundColor:C.ink, color:C.mint, fontSize:'10px', ...CB, padding:'7px 16px', borderRadius:'100px', textTransform:'uppercase' as const, letterSpacing:'0.1em' }}>Diamond Member</span>
                </div>
              </div>
              <div style={{ padding:'24px 28px', flexShrink:0 }}>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'6px', gap:'12px' }}>
                  <div>
                    <p style={{ fontSize:'11px', ...CB, color:C.mint, textTransform:'uppercase' as const, letterSpacing:'0.1em', marginBottom:'3px' }}>NEW HOLLAND</p>
                    <h4 style={{ fontSize:'20px', ...CB, color:C.ink }}>CR11 Combine Harvester</h4>
                  </div>
                  <span style={{ fontSize:'22px', ...CB, color:C.mint, flexShrink:0 }}>MAD 4,200,000</span>
                </div>
                <p style={{ fontSize:'13px', color:C.muted, ...CB, marginBottom:'16px' }}>2024 · Full dealership service history · Rabat</p>
                <div style={{ display:'flex', gap:'10px' }}>
                  <button style={{ flex:1, border:`2px solid rgba(107,122,118,0.2)`, color:C.ink, backgroundColor:'transparent', padding:'12px', borderRadius:'16px', fontSize:'11px', ...CB, textTransform:'uppercase' as const, cursor:'pointer', transition:'all 0.15s' }}
                    onMouseEnter={e=>{e.currentTarget.style.borderColor=C.mint;e.currentTarget.style.backgroundColor=`${C.mint}14`}}
                    onMouseLeave={e=>{e.currentTarget.style.borderColor='rgba(107,122,118,0.2)';e.currentTarget.style.backgroundColor='transparent'}}
                  >Message</button>
                  <button style={{ flex:1, backgroundColor:C.mint, color:C.ink, border:'none', padding:'12px', borderRadius:'16px', fontSize:'11px', ...CB, textTransform:'uppercase' as const, cursor:'pointer' }}>Call</button>
                </div>
              </div>
            </div>
            <div style={{ gridColumn:'3', gridRow:'1', backgroundColor:'white', borderRadius:'32px', overflow:'hidden', display:'flex', flexDirection:'column' as const, border:'1px solid rgba(107,122,118,0.1)' }}>
              <div style={{ flex:1, overflow:'hidden', position:'relative', minHeight:0 }}>
                <img src={I.bento2} alt="Jungheinrich Forklift" style={{ width:'100%', height:'100%', objectFit:'cover' }} />
                <div style={{ position:'absolute', top:'12px', left:'12px' }}>
                  <span style={{ backgroundColor:C.mint, color:C.ink, fontSize:'8px', ...CB, padding:'5px 12px', borderRadius:'100px', textTransform:'uppercase' as const }}>SouKni Certified</span>
                </div>
              </div>
              <div style={{ padding:'16px 18px', flexShrink:0 }}>
                <p style={{ fontSize:'9px', ...CB, color:C.mint, textTransform:'uppercase' as const, letterSpacing:'0.1em', marginBottom:'2px' }}>JUNGHEINRICH</p>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', gap:'6px', marginBottom:'10px' }}>
                  <h4 style={{ fontSize:'13px', ...CB, color:C.ink }}>EKS 412s Forklift</h4>
                  <span style={{ fontSize:'14px', ...CB, color:C.mint, flexShrink:0 }}>MAD 450,000</span>
                </div>
                <div style={{ display:'flex', gap:'6px' }}>
                  <button style={{ flex:1, border:`1px solid rgba(107,122,118,0.2)`, color:C.ink, backgroundColor:'transparent', padding:'8px', borderRadius:'12px', fontSize:'9px', ...CB, cursor:'pointer' }}>Message</button>
                  <button style={{ flex:1, backgroundColor:C.mint, color:C.ink, border:'none', padding:'8px', borderRadius:'12px', fontSize:'9px', ...CB, cursor:'pointer' }}>Call</button>
                </div>
              </div>
            </div>
            <div style={{ gridColumn:'4', gridRow:'1', backgroundColor:'white', borderRadius:'32px', overflow:'hidden', display:'flex', flexDirection:'column' as const, border:'1px solid rgba(107,122,118,0.1)' }}>
              <div style={{ flex:1, overflow:'hidden', position:'relative', minHeight:0 }}>
                <img src={I.bento3} alt="Case IH Magnum" style={{ width:'100%', height:'100%', objectFit:'cover' }} />
                <div style={{ position:'absolute', top:'12px', left:'12px' }}>
                  <span style={{ backgroundColor:'#fbbf24', color:C.ink, fontSize:'8px', ...CB, padding:'5px 12px', borderRadius:'100px', textTransform:'uppercase' as const }}>Featured</span>
                </div>
              </div>
              <div style={{ padding:'16px 18px', flexShrink:0 }}>
                <p style={{ fontSize:'9px', ...CB, color:C.mint, textTransform:'uppercase' as const, letterSpacing:'0.1em', marginBottom:'2px' }}>CASE IH</p>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', gap:'6px', marginBottom:'10px' }}>
                  <h4 style={{ fontSize:'13px', ...CB, color:C.ink }}>Magnum 380 Tractor</h4>
                  <span style={{ fontSize:'14px', ...CB, color:C.mint, flexShrink:0 }}>MAD 2,650,000</span>
                </div>
                <div style={{ display:'flex', gap:'6px' }}>
                  <button style={{ flex:1, border:`1px solid rgba(107,122,118,0.2)`, color:C.ink, backgroundColor:'transparent', padding:'8px', borderRadius:'12px', fontSize:'9px', ...CB, cursor:'pointer' }}>Message</button>
                  <button style={{ flex:1, backgroundColor:C.mint, color:C.ink, border:'none', padding:'8px', borderRadius:'12px', fontSize:'9px', ...CB, cursor:'pointer' }}>Call</button>
                </div>
              </div>
            </div>
            <div style={{ gridColumn:'3/5', gridRow:'2', backgroundColor:'white', borderRadius:'32px', overflow:'hidden', display:'flex', flexDirection:'row' as const, border:'1px solid rgba(107,122,118,0.1)' }}>
              <div style={{ width:'50%', overflow:'hidden', position:'relative' }}>
                <img src={I.bento4} alt="Mercedes Arocs Mixer" style={{ width:'100%', height:'100%', objectFit:'cover' }} />
                <div style={{ position:'absolute', top:'12px', left:'12px' }}>
                  <span style={{ backgroundColor:C.mint, color:'white', fontSize:'8px', ...CB, padding:'5px 12px', borderRadius:'100px', textTransform:'uppercase' as const }}>New Arrival</span>
                </div>
              </div>
              <div style={{ flex:1, padding:'28px 32px', display:'flex', flexDirection:'column' as const, justifyContent:'center' }}>
                <p style={{ fontSize:'11px', ...CB, color:C.mint, textTransform:'uppercase' as const, letterSpacing:'0.1em', marginBottom:'6px' }}>MERCEDES-BENZ</p>
                <h4 style={{ fontSize:'18px', ...CB, color:C.ink, marginBottom:'6px' }}>Arocs 3240 Concrete Mixer</h4>
                <p style={{ fontSize:'13px', color:C.muted, ...CB, marginBottom:'12px' }}>2024 · Full service history · Agadir</p>
                <span style={{ fontSize:'22px', ...CB, color:C.mint, marginBottom:'20px', display:'block' }}>MAD 950,000</span>
                <div style={{ display:'flex', gap:'10px' }}>
                  <button style={{ flex:1, border:`2px solid rgba(107,122,118,0.2)`, color:C.ink, backgroundColor:'transparent', padding:'12px', borderRadius:'16px', fontSize:'10px', ...CB, cursor:'pointer', transition:'border-color 0.15s' }}
                    onMouseEnter={e=>e.currentTarget.style.borderColor=C.mint}
                    onMouseLeave={e=>e.currentTarget.style.borderColor='rgba(107,122,118,0.2)'}
                  >Message</button>
                  <button style={{ flex:1, backgroundColor:C.mint, color:C.ink, border:'none', padding:'12px', borderRadius:'16px', fontSize:'10px', ...CB, cursor:'pointer' }}>Call</button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══ 10. POWER & GENERATORS BANNER ═════════════════════ */}
        <section style={{ marginBottom:'64px' }}>
          <div style={{ position:'relative', borderRadius:'40px', overflow:'hidden', height:'320px', display:'flex', alignItems:'center', boxShadow:'0 16px 48px rgba(0,0,0,0.15)', cursor:'pointer' }}>
            <img src={I.power} alt="Power & Generators" style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover' }} />
            <div style={{ position:'absolute', inset:0, backgroundColor:'rgba(22,29,27,0.58)' }} />
            <div style={{ position:'relative', zIndex:1, padding:'0 64px', maxWidth:'560px' }}>
              <p style={{ fontSize:'11px', ...UB, color:C.mint, textTransform:'uppercase' as const, letterSpacing:'0.15em', marginBottom:'14px' }}>SOUKNI AUTO PRO</p>
              <h2 style={{ fontSize:'clamp(26px,3.5vw,42px)', ...UB, color:'white', marginBottom:'18px', lineHeight:1.05 }}>Power Your Site, Reliably.</h2>
              <p style={{ fontSize:'17px', color:'rgba(255,255,255,0.9)', marginBottom:'28px', lineHeight:1.55 }}>Generators and power equipment ready for construction sites and farms across Morocco.</p>
              <button style={{ backgroundColor:C.mint, color:C.ink, border:'none', padding:'16px 40px', borderRadius:'100px', fontSize:'11px', ...UB, textTransform:'uppercase' as const, letterSpacing:'0.12em', cursor:'pointer', transition:'transform 0.2s' }}
                onMouseEnter={e=>e.currentTarget.style.transform='scale(1.04)'}
                onMouseLeave={e=>e.currentTarget.style.transform='scale(1)'}
              >EXPLORE POWER EQUIPMENT</button>
            </div>
          </div>
        </section>

        {/* ══ 11. EQUIPMENT DISCOVERIES GRID ════════════════════ */}
        <section style={{ marginBottom:'48px' }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'28px' }}>
            <h3 style={{ fontSize:'clamp(18px,2.5vw,24px)', ...UB, color:C.ink, textTransform:'uppercase' as const }}>Equipment Discoveries</h3>
            <a href="#" style={{ fontSize:'12px', ...UB, color:C.mint, textDecoration:'none' }}>View All</a>
          </div>
          {[gridItems.slice(0,4),gridItems.slice(4,8),gridItems.slice(8,12),gridItems.slice(12,16)].map((row,ri)=>(
            <div key={ri} style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'20px', marginBottom:'20px' }}>
              {row.map((item,j)=><GridCard key={j} {...item} />)}
            </div>
          ))}
        </section>

        {/* ══ 12. PAGINATION ═══════════════════════════════════ */}
        <div style={{ display:'flex', justifyContent:'center', alignItems:'center', gap:'10px', marginBottom:'64px' }}>
          <button style={{ width:'44px', height:'44px', borderRadius:'12px', backgroundColor:'white', border:'1px solid rgba(107,122,118,0.12)', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', color:C.muted }}><ChevronLeft size={18} /></button>
          {[1,2,3].map(p=>(
            <button key={p} onClick={()=>setPage(p)}
              style={{ width:'44px', height:'44px', borderRadius:'12px', cursor:'pointer', fontSize:'15px', ...UB, border:'1px solid', transition:'all 0.2s',
                backgroundColor: page===p?C.mint:'white', color:page===p?C.ink:C.muted, borderColor:page===p?C.mint:'rgba(107,122,118,0.12)',
              }}
            >{p}</button>
          ))}
          <span style={{ color:C.muted, padding:'0 4px' }}>…</span>
          <button style={{ width:'44px', height:'44px', borderRadius:'12px', backgroundColor:'white', border:'1px solid rgba(107,122,118,0.12)', cursor:'pointer', fontSize:'15px', ...UB, color:C.muted }}>8</button>
          <button style={{ width:'44px', height:'44px', borderRadius:'12px', backgroundColor:'white', border:'1px solid rgba(107,122,118,0.12)', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', color:C.muted }}><ChevronRight size={18} /></button>
        </div>

        {/* ══ 13. DIAMOND TRUST BANNER ═════════════════════════ */}
        <section style={{ marginBottom:'64px' }}>
          <div style={{ backgroundColor:C.mint, borderRadius:'40px', padding:'56px 64px', display:'flex', alignItems:'center', justifyContent:'space-between', boxShadow:`0 16px 48px ${C.mint}30`, flexWrap:'wrap' as const, gap:'28px' }}>
            <div style={{ maxWidth:'520px' }}>
              <p style={{ fontSize:'9px', ...UB, textTransform:'uppercase' as const, letterSpacing:'0.15em', color:'rgba(22,29,27,0.6)', marginBottom:'14px' }}>EXCLUSIVE PRIVILEGE</p>
              <h2 style={{ fontSize:'clamp(26px,3.5vw,40px)', ...UB, color:C.ink, marginBottom:'16px', lineHeight:1.05 }}>Unlock the Power of Diamond.</h2>
              <p style={{ fontSize:'17px', color:`${C.ink}b3`, lineHeight:1.6 }}>Priority placement and a verified badge on every equipment listing you post. Move your fleet 5x faster.</p>
            </div>
            <div style={{ display:'flex', gap:'14px', flexWrap:'wrap' as const }}>
              <button style={{ backgroundColor:C.ink, color:'white', border:'none', padding:'18px 44px', borderRadius:'100px', fontSize:'11px', ...UB, textTransform:'uppercase' as const, letterSpacing:'0.12em', cursor:'pointer', transition:'transform 0.2s' }}
                onMouseEnter={e=>e.currentTarget.style.transform='scale(1.04)'}
                onMouseLeave={e=>e.currentTarget.style.transform='scale(1)'}
              >Get Status</button>
              <button style={{ backgroundColor:'transparent', color:C.ink, border:`2px solid rgba(22,29,27,0.2)`, padding:'18px 44px', borderRadius:'100px', fontSize:'11px', ...UB, textTransform:'uppercase' as const, letterSpacing:'0.12em', cursor:'pointer', transition:'all 0.2s' }}
                onMouseEnter={e=>e.currentTarget.style.backgroundColor='rgba(22,29,27,0.06)'}
                onMouseLeave={e=>e.currentTarget.style.backgroundColor='transparent'}
              >Learn More</button>
            </div>
          </div>
        </section>

        {/* ══ 14. APP BANNER ═══════════════════════════════════ */}
        <section style={{ marginBottom:'64px' }}>
          <div style={{ backgroundColor:C.cream, borderRadius:'40px', height:'440px', position:'relative' as const, overflow:'hidden', display:'flex', alignItems:'center', padding:'0 64px', border:'1px solid rgba(107,122,118,0.1)' }}>
            <div style={{ position:'relative', zIndex:1, maxWidth:'480px' }}>
              <h2 style={{ fontSize:'clamp(36px,5vw,56px)', ...UB, color:C.ink, marginBottom:'20px', lineHeight:1, letterSpacing:'-0.05em' }}>JOIN THE<br/>SOUKNI FAMILY</h2>
              <p style={{ fontSize:'17px', color:C.muted, marginBottom:'36px', maxWidth:'400px', lineHeight:1.6 }}>Get early access to fleet deals, financing offers, and verified equipment sellers.</p>
              <div style={{ display:'flex', gap:'14px', flexWrap:'wrap' as const }}>
                {['App Store','Google Play'].map(app=>(
                  <button key={app} style={{ height:'52px', minWidth:'160px', backgroundColor:C.ink, color:'white', border:'none', borderRadius:'14px', fontSize:'10px', ...UB, textTransform:'uppercase' as const, letterSpacing:'0.1em', cursor:'pointer', transition:'transform 0.15s' }}
                    onMouseEnter={e=>e.currentTarget.style.transform='scale(1.04)'}
                    onMouseLeave={e=>e.currentTarget.style.transform='scale(1)'}
                  >{app}</button>
                ))}
              </div>
            </div>
            <div style={{ position:'absolute', right:'80px', bottom:'-40px', width:'320px', height:'500px', backgroundColor:'white', borderRadius:'56px', boxShadow:'0 32px 80px rgba(0,0,0,0.18)', border:'8px solid #f5ede0', padding:'20px', display:'flex', flexDirection:'column' as const, gap:'16px' }}>
              <div style={{ backgroundColor:C.surface, borderRadius:'100px', height:'32px' }} />
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'12px', flex:1 }}>
                <div style={{ backgroundColor:C.surface, borderRadius:'16px' }} />
                <div style={{ backgroundColor:C.surface, borderRadius:'16px' }} />
                <div style={{ backgroundColor:C.surface, borderRadius:'16px', gridColumn:'span 2' }} />
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ══ 15. FOOTER ═══════════════════════════════════════ */}
      <footer style={{ backgroundColor:C.ink, color:'white', padding:'64px 24px 32px' }}>
        <div style={{ maxWidth:'1280px', margin:'0 auto' }}>
          <div style={{ display:'grid', gridTemplateColumns:'2fr 1fr 1fr 1fr', gap:'48px', marginBottom:'48px', paddingBottom:'48px', borderBottom:'1px solid rgba(255,255,255,0.12)' }}>
            <div>
              <Link href={`/${locale}`} style={{ textDecoration:'none' }}>
                <div style={{ fontSize:'28px', ...UB, color:C.mint, marginBottom:'12px', cursor:'pointer' }}>SouKni</div>
              </Link>
              <p style={{ fontSize:'14px', ...CB, color:'rgba(255,255,255,0.82)', fontStyle:'italic', marginBottom:'20px' }}>The Market in your Pocket</p>
              <div style={{ display:'flex', gap:'10px' }}>
                {[{s:'FB',h:'https://facebook.com'},{s:'IG',h:'https://instagram.com'},{s:'X',h:'https://x.com'}].map(({s,h})=>(
                  <a key={s} href={h} target="_blank" rel="noopener noreferrer"
                    style={{ width:'38px', height:'38px', borderRadius:'50%', backgroundColor:'rgba(255,255,255,0.08)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'10px', ...UB, color:'rgba(255,255,255,0.6)', textDecoration:'none', transition:'all 0.15s' }}
                    onMouseEnter={e=>{e.currentTarget.style.backgroundColor=C.mint;e.currentTarget.style.color=C.ink}}
                    onMouseLeave={e=>{e.currentTarget.style.backgroundColor='rgba(255,255,255,0.08)';e.currentTarget.style.color='rgba(255,255,255,0.6)'}}
                  >{s}</a>
                ))}
              </div>
            </div>
            {[
              { title:'Marketplace', links:[{l:'Motors',h:`/${locale}/motors`},{l:'Property',h:`/${locale}/property`},{l:'Fashion',h:`/${locale}/fashion`},{l:'The Vault',h:`/${locale}/vault`}] },
              { title:'Company',     links:[{l:'About Us',h:`/${locale}/about`},{l:'Careers',h:`/${locale}/jobs`},{l:'Press Kit',h:`/${locale}/about`}] },
              { title:'Support',     links:[{l:'Help Center',h:`/${locale}/community`},{l:'Safety Center',h:`/${locale}/community`},{l:'Contact',h:`/${locale}/community`}] },
            ].map(col=>(
              <div key={col.title}>
                <h4 style={{ fontSize:'10px', ...UB, textTransform:'uppercase' as const, letterSpacing:'0.15em', color:C.mint, marginBottom:'20px' }}>{col.title}</h4>
                {col.links.map(({l,h})=>(
                  <Link key={l} href={h} style={{ display:'block', fontSize:'13px', ...CB, color:'rgba(255,255,255,0.65)', textDecoration:'none', marginBottom:'12px', transition:'color 0.15s' }}
                    onMouseEnter={e=>e.currentTarget.style.color='white'}
                    onMouseLeave={e=>e.currentTarget.style.color='rgba(255,255,255,0.65)'}
                  >{l}</Link>
                ))}
              </div>
            ))}
          </div>
          <div style={{ textAlign:'center' as const, fontSize:'10px', ...UB, color:'rgba(255,255,255,0.35)', textTransform:'uppercase' as const, letterSpacing:'0.2em' }}>
            © 2026 SOUKNI MOROCCO — ALL RIGHTS RESERVED
          </div>
        </div>
      </footer>
    </div>
  )
}
