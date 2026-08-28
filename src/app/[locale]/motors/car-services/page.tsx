'use client'

import { useState, useEffect } from 'react'
import React from 'react'
import { Heart, Search, ChevronDown, ChevronLeft, ChevronRight, SlidersHorizontal, MapPin, Plus, Star, BadgeCheck, Clock } from 'lucide-react'
import Link from 'next/link'
import Breadcrumb from '@/components/ui/Breadcrumb'
import CategoryFooterNav from '@/components/ui/CategoryFooterNav'
import { useFavorites } from '@/hooks/useFavorites'

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
  hero:    'https://images.pexels.com/photos/3807319/pexels-photo-3807319.jpeg?auto=compress&w=1600',
  c1:      'https://images.pexels.com/photos/3807319/pexels-photo-3807319.jpeg?auto=compress&w=600',
  c2:      'https://images.pexels.com/photos/4489749/pexels-photo-4489749.jpeg?auto=compress&w=600',
  c3:      'https://images.pexels.com/photos/6873088/pexels-photo-6873088.jpeg?auto=compress&w=600',
  c4:      'https://images.pexels.com/photos/6870983/pexels-photo-6870983.jpeg?auto=compress&w=600',
  bento1:  'https://images.pexels.com/photos/4489749/pexels-photo-4489749.jpeg?auto=compress&w=900',
  bento2:  'https://images.pexels.com/photos/3807319/pexels-photo-3807319.jpeg?auto=compress&w=600',
  bento3:  'https://images.pexels.com/photos/6873088/pexels-photo-6873088.jpeg?auto=compress&w=600',
  bento4:  'https://images.pexels.com/photos/6870983/pexels-photo-6870983.jpeg?auto=compress&w=600',
  listcta: 'https://images.pexels.com/photos/4489749/pexels-photo-4489749.jpeg?auto=compress&w=1200',
  helpcta: 'https://images.pexels.com/photos/6870983/pexels-photo-6870983.jpeg?auto=compress&w=1200',
  g1:      'https://images.pexels.com/photos/3807319/pexels-photo-3807319.jpeg?auto=compress&w=400',
  g2:      'https://images.pexels.com/photos/4489749/pexels-photo-4489749.jpeg?auto=compress&w=400',
  g3:      'https://images.pexels.com/photos/6873088/pexels-photo-6873088.jpeg?auto=compress&w=400',
  g4:      'https://images.pexels.com/photos/6870983/pexels-photo-6870983.jpeg?auto=compress&w=400',
  g5:      'https://images.pexels.com/photos/3807319/pexels-photo-3807319.jpeg?auto=compress&w=400',
}

type BadgeT = 'certified'|'top'|'featured'|'new'
function Badge({ type }: { type: BadgeT }) {
  const map: Record<BadgeT,{bg:string;color:string;label:string}> = {
    certified:{ bg:C.mint,   color:C.ink,  label:'SouKni Verified' },
    top:      { bg:C.ink,    color:C.mint, label:'Top Rated'       },
    featured: { bg:'#fbbf24',color:C.ink,  label:'Featured'        },
    new:      { bg:C.mint, color:'white', label:'New Partner'      },
  }
  const s = map[type]
  return (
    <span style={{ backgroundColor:s.bg, color:s.color, fontSize:'8px', ...CB, padding:'4px 10px', borderRadius:'6px', textTransform:'uppercase' as const, letterSpacing:'0.08em', display:'inline-block', boxShadow:'0 2px 6px rgba(0,0,0,0.15)', whiteSpace:'nowrap' as const }}>
      {s.label}
    </span>
  )
}

function FeaturedCard({ id, name, specialty, location, rating, reviews, years, img, badges }: any) {
  const [hov, setHov]     = useState(false)
  const { isFavorited, toggleFavorite } = useFavorites()
  const saved = isFavorited(id)
  return (
    <div onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{ backgroundColor:'white', borderRadius:'24px', border:`1px solid ${hov?C.mint:'rgba(107,122,118,0.1)'}`, boxShadow:hov?`0 20px 40px ${C.mint}18`:'0 2px 8px rgba(0,0,0,0.04)', overflow:'hidden', transition:'all 0.3s', cursor:'pointer' }}>
      <div style={{ position:'relative', aspectRatio:'1/1', overflow:'hidden', backgroundColor:C.cream }}>
        <img src={img} alt={name} style={{ width:'100%', height:'100%', objectFit:'cover', transition:'transform 0.7s', transform:hov?'scale(1.1)':'scale(1)' }} />
        <div style={{ position:'absolute', top:'12px', left:'12px', display:'flex', flexDirection:'column' as const, gap:'5px' }}>
          {badges?.map((b:string)=><Badge key={b} type={b as BadgeT} />)}
        </div>
        <button onClick={e=>{e.stopPropagation();toggleFavorite(id)}} style={{ position:'absolute', top:'10px', right:'10px', width:'32px', height:'32px', borderRadius:'50%', backgroundColor:'rgba(255,255,255,0.85)', border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}>
          <Heart size={14} fill={saved?'#ef4444':'none'} color={saved?'#ef4444':C.muted} />
        </button>
      </div>
      <div style={{ padding:'18px 20px' }}>
        <h4 style={{ fontSize:'14px', ...CB, color:hov?C.mint:C.ink, marginBottom:'4px', transition:'color 0.2s', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' as const }}>{name}</h4>
        <p style={{ fontSize:'11px', ...CB, color:C.muted, marginBottom:'6px' }}>{specialty}</p>
        <div style={{ display:'flex', alignItems:'center', gap:'6px', marginBottom:'10px' }}>
          <span style={{ display:'flex', alignItems:'center', gap:'3px', fontSize:'12px', color:'#f59e0b', ...CB }}><Star size={12} fill="#f59e0b" />{rating.toFixed(1)}</span>
          <span style={{ fontSize:'11px', color:C.muted }}>({reviews} reviews) · {years}y</span>
        </div>
        {location && <p style={{ fontSize:'10px', color:C.muted, ...CB, display:'flex', alignItems:'center', gap:'3px', marginBottom:'14px' }}><MapPin size={10}/>{location}</p>}
        <div style={{ display:'flex', gap:'8px' }}>
          <button style={{ flex:1, border:`2px solid ${C.mint}`, color:C.ink, backgroundColor:'transparent', padding:'10px', borderRadius:'12px', fontSize:'10px', ...CB, textTransform:'uppercase' as const, cursor:'pointer', transition:'all 0.15s' }}
            onMouseEnter={e=>e.currentTarget.style.backgroundColor=C.mint}
            onMouseLeave={e=>e.currentTarget.style.backgroundColor='transparent'}
          >Call Now</button>
          <button style={{ flex:1, backgroundColor:'#25D366', color:'white', border:'none', padding:'10px', borderRadius:'12px', fontSize:'10px', ...CB, textTransform:'uppercase' as const, cursor:'pointer' }}>Book Service</button>
        </div>
      </div>
    </div>
  )
}

function GridCard({ id, name, specialty, rating, reviews, img, badge }: any) {
  const { isFavorited, toggleFavorite } = useFavorites()
  const saved = isFavorited(id)
  const [hov,   setHov  ] = useState(false)
  return (
    <div onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{ backgroundColor:'white', borderRadius:'28px', border:`1px solid ${hov?C.mint:'rgba(107,122,118,0.1)'}`, boxShadow:hov?`0 16px 40px ${C.mint}18`:'0 2px 8px rgba(0,0,0,0.04)', overflow:'hidden', transition:'all 0.3s', cursor:'pointer' }}>
      <div style={{ position:'relative', aspectRatio:'1/1', overflow:'hidden', backgroundColor:C.cream }}>
        <img src={img} alt={name} style={{ width:'100%', height:'100%', objectFit:'cover', transition:'transform 0.7s', transform:hov?'scale(1.1)':'scale(1)' }} />
        <div style={{ position:'absolute', top:'10px', left:'10px' }}><Badge type={badge as BadgeT} /></div>
        <button onClick={e=>{e.stopPropagation();toggleFavorite(id)}} style={{ position:'absolute', top:'8px', right:'8px', width:'28px', height:'28px', borderRadius:'50%', backgroundColor:'rgba(255,255,255,0.85)', border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}>
          <Heart size={12} fill={saved?'#ef4444':'none'} color={saved?'#ef4444':C.muted} />
        </button>
      </div>
      <div style={{ padding:'14px 16px' }}>
        <h4 style={{ fontSize:'12px', ...CB, color:hov?C.mint:C.ink, marginBottom:'4px', transition:'color 0.2s', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' as const }}>{name}</h4>
        <p style={{ fontSize:'9px', ...CB, color:C.muted, marginBottom:'6px' }}>{specialty}</p>
        <div style={{ display:'flex', alignItems:'center', gap:'5px', marginBottom:'10px' }}>
          <span style={{ display:'flex', alignItems:'center', gap:'2px', fontSize:'10px', color:'#f59e0b', ...CB }}><Star size={10} fill="#f59e0b" />{rating.toFixed(1)}</span>
          <span style={{ fontSize:'9px', color:C.muted }}>({reviews})</span>
        </div>
        <div style={{ display:'flex', gap:'6px' }}>
          <button style={{ flex:1, border:`1px solid rgba(107,122,118,0.2)`, color:C.muted, backgroundColor:'transparent', padding:'7px', borderRadius:'10px', fontSize:'9px', ...CB, textTransform:'uppercase' as const, cursor:'pointer', transition:'all 0.15s' }}
            onMouseEnter={e=>{e.currentTarget.style.borderColor=C.mint;e.currentTarget.style.color=C.mint}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor='rgba(107,122,118,0.2)';e.currentTarget.style.color=C.muted}}
          >Call</button>
          <button style={{ flex:1, backgroundColor:C.mint, color:C.ink, border:'none', padding:'7px', borderRadius:'10px', fontSize:'9px', ...CB, textTransform:'uppercase' as const, cursor:'pointer' }}>Book</button>
        </div>
      </div>
    </div>
  )
}

const featuredItems = [
  { name:'Atlas Auto Garage',      specialty:'Full Mechanical Repair', price:0, location:'Maarif, Casablanca', rating:4.9, reviews:214, years:12, img:I.c1, badges:['top','certified']  },
  { name:'CarreFix Body & Paint',  specialty:'Collision Repair & Paint', location:'Agdal, Rabat',        rating:4.8, reviews:167, years:9,  img:I.c2, badges:['certified','featured'] },
  { name:'ProShine Detailing',     specialty:'Wash, Wax & Detailing',   location:'Gueliz, Marrakech',    rating:5.0, reviews:98,  years:5,  img:I.c3, badges:['top']  },
  { name:'RoadHelp Towing',        specialty:'24/7 Towing & Roadside',  location:'Centre, Tanger',       rating:4.7, reviews:143, years:7,  img:I.c4, badges:['new']  },
]

function makeGrid(count: number) {
  const names = ['Diamond Motors Garage','QuickFix Mechanics','Prestige Detailing','TirePro Casablanca','SpeedTow Services','ElectroAuto Diagnostics','Atlas Body Shop','Marrakech Auto Care']
  const specs  = ['Engine Diagnostics','Tire & Wheel Alignment','Interior Detailing','Brake & Suspension','Towing & Roadside','Electrical Repair','Body & Paint','Full Service']
  const imgs   = [I.g1,I.g2,I.g3,I.g4,I.g5]
  const badges: BadgeT[] = ['certified','top','featured','new','certified']
  return Array.from({length:count},(_,i)=>({
    name: names[i%names.length],
    specialty: specs[i%specs.length],
    rating: 4.3 + ((i%7)*0.1),
    reviews: 20 + ((i*37)%300),
    img:   imgs[i%imgs.length],
    badge: badges[i%badges.length],
  }))
}
const gridItems = makeGrid(48)

const CATS = [
  { label:'All Services',              slug:'all-services'          },
  { label:'Mechanics & Repair',        slug:'mechanics-repair'       },
  { label:'Body & Paint',              slug:'body-paint'             },
  { label:'Tire & Wheel Services',     slug:'tire-wheel'             },
  { label:'Car Wash & Detailing',      slug:'wash-detailing'         },
  { label:'Towing & Roadside',         slug:'towing-roadside'        },
  { label:'Inspection & Diagnostics',  slug:'inspection-diagnostics' },
]

export default function CarServicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale }                      = React.use(params)
  const [activeSeller, setActiveSeller] = useState('All Providers')
  const [verified,     setVerified    ] = useState(true)
  const [gridView,     setGridView    ] = useState(true)
  const [page,         setPage        ] = useState(1)
  const [keyword,      setKeyword     ] = useState('')
  const [applied, setApplied] = useState({ keyword: '', city: '' })
  const applySearch = () => { setApplied({ keyword, city }); setPage(1) }
  const matchesKeyword = (item: any) => !applied.keyword.trim() ||
    (item.name || '').toLowerCase().includes(applied.keyword.toLowerCase()) ||
    (item.specialty || '').toLowerCase().includes(applied.keyword.toLowerCase())
  const matchesCity = (item: any) => applied.city === 'All Morocco' || !applied.city ||
    (item.location || '').toLowerCase().includes(applied.city.toLowerCase())
  const filteredFeatured = featuredItems.filter(item => matchesKeyword(item) && matchesCity(item))
  const filteredGridAll = gridItems.filter(matchesKeyword)
  const PAGE_SIZE = 16
  const totalPages = Math.max(1, Math.ceil(filteredGridAll.length / PAGE_SIZE))
  const filteredGrid = filteredGridAll.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  useEffect(() => { setPage(1) }, [applied])
  const [city,         setCity        ] = useState('All Morocco')
  const [service,      setService     ] = useState('Any Service')
  const [rating,       setRating      ] = useState('Any Rating')
  const [availability, setAvailability] = useState('Any Time')
  const [cityOpen,     setCityOpen    ] = useState(false)
  const [serviceOpen,  setServiceOpen ] = useState(false)
  const [ratingOpen,   setRatingOpen  ] = useState(false)
  const [availOpen,    setAvailOpen   ] = useState(false)

  const cities  = ['All Morocco','Casablanca','Rabat','Marrakech','Fès','Tanger','Agadir','Meknès']
  const services= ['Any Service','Mechanics & Repair','Body & Paint','Tire & Wheel Services','Car Wash & Detailing','Towing & Roadside','Inspection & Diagnostics']
  const ratings = ['Any Rating','4.5+ Stars','4.0+ Stars','3.5+ Stars']
  const avails  = ['Any Time','Available Today','Available This Week','24/7 Emergency']

  function DDrop({ label, value, options, open, setOpen, onChange }: any) {
    return (
      <div style={{ position:'relative', flex:1 }}>
        <button onClick={()=>{ setOpen(!open); setCityOpen(false); setServiceOpen(false); setRatingOpen(false); setAvailOpen(false) }}
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
        <img src={I.hero} alt="Car Services" style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover' }} />
        <div style={{ position:'absolute', inset:0, backgroundColor:'rgba(22,29,27,0.42)' }} />
        <div style={{ position:'relative', zIndex:10, textAlign:'center' as const, maxWidth:'960px', padding:'0 24px', width:'100%' }}>
          <h1 style={{ fontSize:'clamp(36px,6vw,64px)', ...UB, color:'white', marginBottom:'36px', lineHeight:1, textShadow:'0 4px 20px rgba(0,0,0,0.4)' }}>
            TRUSTED CAR SERVICES.<br/><span style={{ color:C.mint }}>FIND A GARAGE NEAR YOU.</span>
          </h1>
          <div style={{ maxWidth:'780px', margin:'0 auto', backgroundColor:'rgba(255,255,255,0.12)', backdropFilter:'blur(12px)', border:'1px solid rgba(255,255,255,0.22)', borderRadius:'100px', padding:'8px', display:'flex', alignItems:'center' }}>
            <div style={{ flex:1, padding:'0 28px', borderRight:'1px solid rgba(255,255,255,0.22)', display:'flex', flexDirection:'column' as const, gap:'2px' }}>
              <span style={{ fontSize:'9px', ...UB, color:'rgba(255,255,255,0.62)', textTransform:'uppercase' as const, letterSpacing:'0.15em' }}>CITY</span>
              <div style={{ display:'flex', alignItems:'center', gap:'6px', color:'white', fontSize:'14px', ...UB }}>All Morocco <ChevronDown size={14} /></div>
            </div>
            <div style={{ flex:2, padding:'0 28px', display:'flex', flexDirection:'column' as const, gap:'2px' }}>
              <span style={{ fontSize:'9px', ...UB, color:'rgba(255,255,255,0.62)', textTransform:'uppercase' as const, letterSpacing:'0.15em' }}>SEARCH</span>
              <input type="text" value={keyword} onChange={e=>setKeyword(e.target.value)} onKeyDown={e=>e.key==='Enter'&&applySearch()} placeholder="Search mechanics, body shops, towing..."
                style={{ backgroundColor:'transparent', border:'none', outline:'none', color:'white', fontSize:'14px', ...UB, fontFamily:'Inter,sans-serif', width:'100%' }} />
            </div>
            <button onClick={applySearch} style={{ backgroundColor:C.mint, color:C.ink, border:'none', padding:'16px 44px', borderRadius:'100px', fontSize:'11px', ...UB, textTransform:'uppercase' as const, letterSpacing:'0.12em', cursor:'pointer', transition:'filter 0.15s' }}
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
          <DDrop label="SERVICE TYPE" value={service} options={services} open={serviceOpen} setOpen={setServiceOpen} onChange={setService} />
          <div style={{ width:'1px', backgroundColor:'rgba(107,122,118,0.12)', margin:'12px 0' }} />
          <DDrop label="RATING" value={rating} options={ratings} open={ratingOpen} setOpen={setRatingOpen} onChange={setRating} />
          <div style={{ width:'1px', backgroundColor:'rgba(107,122,118,0.12)', margin:'12px 0' }} />
          <DDrop label="AVAILABILITY" value={availability} options={avails} open={availOpen} setOpen={setAvailOpen} onChange={setAvailability} />
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
        <Breadcrumb
          items={[
            { label:'Home', href:`/${locale}` },
            { label:'Motors', href:`/${locale}/motors` },
            { label:'Car Services' },
          ]}
          mutedColor={C.muted}
          inkColor={C.ink}
          style={{ fontSize:'10px', ...UB, letterSpacing:'0.12em', marginBottom:'12px' }}
        />
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', gap:'16px', marginBottom:'24px', flexWrap:'wrap' as const }}>
          <div>
            <h2 style={{ fontSize:'clamp(20px,2.5vw,28px)', ...UB, color:C.ink, marginBottom:'4px' }}>Trusted Car Services in Morocco</h2>
            <p style={{ fontSize:'14px', color:C.mint, ...CB }}>1,240 Verified Providers</p>
          </div>
          <div style={{ display:'flex', gap:'10px' }}>
            {['Sort: Top Rated','Save Search'].map(b=>(
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
            <Link key={cat.slug} href={`/${locale}/motors/car-services/${cat.slug}`}
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

        {/* ══ 5. PROVIDER TABS + VERIFIED TOGGLE ═══════════════ */}
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap' as const, gap:'14px', marginBottom:'20px' }}>
          <div style={{ display:'flex', gap:'4px', padding:'5px', backgroundColor:'#e8efec', borderRadius:'100px' }}>
            {['All Providers','SouKni Members','SouKni Pro'].map(tab=>(
              <button key={tab} onClick={()=>setActiveSeller(tab)}
                style={{ padding:'10px 24px', borderRadius:'100px', fontSize:'11px', ...UB, textTransform:'uppercase' as const, letterSpacing:'0.1em', cursor:'pointer', border:'none', transition:'all 0.2s',
                  backgroundColor: activeSeller===tab ? C.ink   : 'transparent',
                  color:           activeSeller===tab ? 'white' : C.muted,
                  boxShadow:       activeSeller===tab ? '0 2px 8px rgba(0,0,0,0.15)' : 'none',
                }}
              >{tab}</button>
            ))}
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:'12px', cursor:'pointer' }} onClick={()=>setVerified(!verified)}>
            <span style={{ fontSize:'10px', ...UB, color:C.muted, textTransform:'uppercase' as const, letterSpacing:'0.1em' }}>Show Verified Providers First</span>
            <div style={{ width:'52px', height:'26px', borderRadius:'100px', backgroundColor:verified?C.mint:'rgba(107,122,118,0.25)', position:'relative', transition:'background 0.25s' }}>
              <div style={{ position:'absolute', top:'3px', left:verified?'29px':'3px', width:'20px', height:'20px', borderRadius:'50%', backgroundColor:C.ink, transition:'left 0.25s' }} />
            </div>
          </div>
        </div>

        {/* ══ 6. NEAREST + GRID TOGGLE ══════════════════════════ */}
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'40px' }}>
          <div style={{ display:'flex', gap:'10px' }}>
            {['Nearest to Me','Open Now'].map(btn=>(
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

        {/* ══ 7. FEATURED TOP-RATED PROVIDERS ══════════════════ */}
        <section style={{ marginBottom:'48px' }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'24px' }}>
            <div>
              <h3 style={{ fontSize:'clamp(18px,2.5vw,24px)', ...UB, color:C.ink, textTransform:'uppercase' as const, marginBottom:'4px' }}>Featured Top-Rated Providers</h3>
              <p style={{ fontSize:'14px', color:C.muted }}>Verified garages and specialists near you</p>
            </div>
            <a href="#" style={{ fontSize:'12px', ...UB, color:C.mint, textDecoration:'none' }}>View All</a>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'24px' }}>
            {filteredFeatured.map((item,i)=><FeaturedCard key={i} {...item} />)}
          </div>
        </section>

        {/* ══ 8. FOR PROVIDERS BANNER ═══════════════════════════ */}
        <section style={{ marginBottom:'64px' }}>
          <div style={{ backgroundColor:C.ink, borderRadius:'40px', padding:'56px 64px', display:'flex', alignItems:'center', justifyContent:'space-between', position:'relative' as const, overflow:'hidden', minHeight:'240px', boxShadow:'0 16px 48px rgba(0,0,0,0.2)', flexWrap:'wrap' as const, gap:'24px' }}>
            <div style={{ position:'absolute', right:'-48px', bottom:'-48px', width:'320px', height:'320px', backgroundColor:`${C.mint}18`, borderRadius:'50%' }} />
            <div style={{ position:'absolute', right:'120px', top:'-60px', width:'200px', height:'200px', backgroundColor:`${C.mint}0a`, borderRadius:'50%' }} />
            <div style={{ position:'relative', zIndex:1, maxWidth:'480px' }}>
              <p style={{ fontSize:'11px', ...UB, color:C.mint, textTransform:'uppercase' as const, letterSpacing:'0.15em', marginBottom:'16px' }}>FOR GARAGE OWNERS</p>
              <h2 style={{ fontSize:'clamp(24px,3.5vw,38px)', ...UB, color:'white', marginBottom:'20px', lineHeight:1.1 }}>List your garage and start getting bookings today.</h2>
              <button style={{ backgroundColor:C.mint, color:C.ink, border:'none', padding:'16px 40px', borderRadius:'100px', fontSize:'11px', ...UB, textTransform:'uppercase' as const, letterSpacing:'0.12em', cursor:'pointer', transition:'transform 0.2s' }}
                onMouseEnter={e=>e.currentTarget.style.transform='scale(1.04)'}
                onMouseLeave={e=>e.currentTarget.style.transform='scale(1)'}
              >List Your Business</button>
            </div>
          </div>
        </section>

        {/* ══ 9. EXCLUSIVE VERIFIED PARTNERS BENTO ═════════════ */}
        <section style={{ marginBottom:'64px' }}>
          <h3 style={{ fontSize:'clamp(20px,3vw,32px)', ...UB, color:C.ink, textTransform:'uppercase' as const, marginBottom:'32px' }}>Exclusive Verified Partners</h3>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gridTemplateRows:'380px 380px', gap:'20px' }}>
            <div style={{ gridColumn:'1/3', gridRow:'1/3', backgroundColor:'white', borderRadius:'40px', overflow:'hidden', display:'flex', flexDirection:'column' as const, border:'1px solid rgba(107,122,118,0.1)' }}>
              <div style={{ flex:1, overflow:'hidden', position:'relative', minHeight:0 }}>
                <img src={I.bento1} alt="CarreFix Body & Paint" style={{ width:'100%', height:'100%', objectFit:'cover' }} />
                <div style={{ position:'absolute', top:'20px', left:'20px' }}>
                  <span style={{ backgroundColor:C.ink, color:C.mint, fontSize:'10px', ...CB, padding:'7px 16px', borderRadius:'100px', textTransform:'uppercase' as const, letterSpacing:'0.1em' }}>Top Rated</span>
                </div>
              </div>
              <div style={{ padding:'24px 28px', flexShrink:0 }}>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'6px', gap:'12px' }}>
                  <div>
                    <p style={{ fontSize:'11px', ...CB, color:C.mint, textTransform:'uppercase' as const, letterSpacing:'0.1em', marginBottom:'3px' }}>BODY & PAINT SPECIALIST</p>
                    <h4 style={{ fontSize:'20px', ...CB, color:C.ink }}>CarreFix Body & Paint</h4>
                  </div>
                  <span style={{ display:'flex', alignItems:'center', gap:'4px', fontSize:'18px', ...CB, color:'#f59e0b', flexShrink:0 }}><Star size={16} fill="#f59e0b" />4.8</span>
                </div>
                <p style={{ fontSize:'13px', color:C.muted, ...CB, marginBottom:'16px' }}>167 reviews · 9 years in business · Agdal, Rabat</p>
                <div style={{ display:'flex', gap:'10px' }}>
                  <button style={{ flex:1, border:`2px solid rgba(107,122,118,0.2)`, color:C.ink, backgroundColor:'transparent', padding:'12px', borderRadius:'16px', fontSize:'11px', ...CB, textTransform:'uppercase' as const, cursor:'pointer', transition:'all 0.15s' }}
                    onMouseEnter={e=>{e.currentTarget.style.borderColor=C.mint;e.currentTarget.style.backgroundColor=`${C.mint}14`}}
                    onMouseLeave={e=>{e.currentTarget.style.borderColor='rgba(107,122,118,0.2)';e.currentTarget.style.backgroundColor='transparent'}}
                  >Call Now</button>
                  <button style={{ flex:1, backgroundColor:C.mint, color:C.ink, border:'none', padding:'12px', borderRadius:'16px', fontSize:'11px', ...CB, textTransform:'uppercase' as const, cursor:'pointer' }}>Book Service</button>
                </div>
              </div>
            </div>
            <div style={{ gridColumn:'3', gridRow:'1', backgroundColor:'white', borderRadius:'32px', overflow:'hidden', display:'flex', flexDirection:'column' as const, border:'1px solid rgba(107,122,118,0.1)' }}>
              <div style={{ flex:1, overflow:'hidden', position:'relative', minHeight:0 }}>
                <img src={I.bento2} alt="Atlas Auto Garage" style={{ width:'100%', height:'100%', objectFit:'cover' }} />
                <div style={{ position:'absolute', top:'12px', left:'12px' }}>
                  <span style={{ backgroundColor:C.mint, color:C.ink, fontSize:'8px', ...CB, padding:'5px 12px', borderRadius:'100px', textTransform:'uppercase' as const }}>SouKni Verified</span>
                </div>
              </div>
              <div style={{ padding:'16px 18px', flexShrink:0 }}>
                <p style={{ fontSize:'9px', ...CB, color:C.mint, textTransform:'uppercase' as const, letterSpacing:'0.1em', marginBottom:'2px' }}>MECHANICS & REPAIR</p>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', gap:'6px', marginBottom:'10px' }}>
                  <h4 style={{ fontSize:'13px', ...CB, color:C.ink }}>Atlas Auto Garage</h4>
                  <span style={{ display:'flex', alignItems:'center', gap:'3px', fontSize:'12px', ...CB, color:'#f59e0b' }}><Star size={11} fill="#f59e0b" />4.9</span>
                </div>
                <div style={{ display:'flex', gap:'6px' }}>
                  <button style={{ flex:1, border:`1px solid rgba(107,122,118,0.2)`, color:C.ink, backgroundColor:'transparent', padding:'8px', borderRadius:'12px', fontSize:'9px', ...CB, cursor:'pointer' }}>Call</button>
                  <button style={{ flex:1, backgroundColor:C.mint, color:C.ink, border:'none', padding:'8px', borderRadius:'12px', fontSize:'9px', ...CB, cursor:'pointer' }}>Book</button>
                </div>
              </div>
            </div>
            <div style={{ gridColumn:'4', gridRow:'1', backgroundColor:'white', borderRadius:'32px', overflow:'hidden', display:'flex', flexDirection:'column' as const, border:'1px solid rgba(107,122,118,0.1)' }}>
              <div style={{ flex:1, overflow:'hidden', position:'relative', minHeight:0 }}>
                <img src={I.bento3} alt="ProShine Detailing" style={{ width:'100%', height:'100%', objectFit:'cover' }} />
                <div style={{ position:'absolute', top:'12px', left:'12px' }}>
                  <span style={{ backgroundColor:'#fbbf24', color:C.ink, fontSize:'8px', ...CB, padding:'5px 12px', borderRadius:'100px', textTransform:'uppercase' as const }}>Featured</span>
                </div>
              </div>
              <div style={{ padding:'16px 18px', flexShrink:0 }}>
                <p style={{ fontSize:'9px', ...CB, color:C.mint, textTransform:'uppercase' as const, letterSpacing:'0.1em', marginBottom:'2px' }}>DETAILING</p>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', gap:'6px', marginBottom:'10px' }}>
                  <h4 style={{ fontSize:'13px', ...CB, color:C.ink }}>ProShine Detailing</h4>
                  <span style={{ display:'flex', alignItems:'center', gap:'3px', fontSize:'12px', ...CB, color:'#f59e0b' }}><Star size={11} fill="#f59e0b" />5.0</span>
                </div>
                <div style={{ display:'flex', gap:'6px' }}>
                  <button style={{ flex:1, border:`1px solid rgba(107,122,118,0.2)`, color:C.ink, backgroundColor:'transparent', padding:'8px', borderRadius:'12px', fontSize:'9px', ...CB, cursor:'pointer' }}>Call</button>
                  <button style={{ flex:1, backgroundColor:C.mint, color:C.ink, border:'none', padding:'8px', borderRadius:'12px', fontSize:'9px', ...CB, cursor:'pointer' }}>Book</button>
                </div>
              </div>
            </div>
            <div style={{ gridColumn:'3/5', gridRow:'2', backgroundColor:'white', borderRadius:'32px', overflow:'hidden', display:'flex', flexDirection:'row' as const, border:'1px solid rgba(107,122,118,0.1)' }}>
              <div style={{ width:'50%', overflow:'hidden', position:'relative' }}>
                <img src={I.bento4} alt="RoadHelp Towing" style={{ width:'100%', height:'100%', objectFit:'cover' }} />
                <div style={{ position:'absolute', top:'12px', left:'12px' }}>
                  <span style={{ backgroundColor:C.mint, color:'white', fontSize:'8px', ...CB, padding:'5px 12px', borderRadius:'100px', textTransform:'uppercase' as const }}>New Partner</span>
                </div>
              </div>
              <div style={{ flex:1, padding:'28px 32px', display:'flex', flexDirection:'column' as const, justifyContent:'center' }}>
                <p style={{ fontSize:'11px', ...CB, color:C.mint, textTransform:'uppercase' as const, letterSpacing:'0.1em', marginBottom:'6px' }}>TOWING & ROADSIDE</p>
                <h4 style={{ fontSize:'18px', ...CB, color:C.ink, marginBottom:'6px' }}>RoadHelp Towing</h4>
                <p style={{ fontSize:'13px', color:C.muted, ...CB, marginBottom:'12px', display:'flex', alignItems:'center', gap:'5px' }}><Clock size={12} /> 24/7 Emergency Response · Centre, Tanger</p>
                <span style={{ display:'flex', alignItems:'center', gap:'5px', fontSize:'18px', ...CB, color:'#f59e0b', marginBottom:'20px' }}><Star size={16} fill="#f59e0b" />4.7 <span style={{ fontSize:'12px', color:C.muted }}>(143 reviews)</span></span>
                <div style={{ display:'flex', gap:'10px' }}>
                  <button style={{ flex:1, border:`2px solid rgba(107,122,118,0.2)`, color:C.ink, backgroundColor:'transparent', padding:'12px', borderRadius:'16px', fontSize:'10px', ...CB, cursor:'pointer', transition:'border-color 0.15s' }}
                    onMouseEnter={e=>e.currentTarget.style.borderColor=C.mint}
                    onMouseLeave={e=>e.currentTarget.style.borderColor='rgba(107,122,118,0.2)'}
                  >Call Now</button>
                  <button style={{ flex:1, backgroundColor:C.mint, color:C.ink, border:'none', padding:'12px', borderRadius:'16px', fontSize:'10px', ...CB, cursor:'pointer' }}>Book Service</button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══ 10. NEED HELP NOW BANNER ══════════════════════════ */}
        <section style={{ marginBottom:'64px' }}>
          <div style={{ position:'relative', borderRadius:'40px', overflow:'hidden', height:'320px', display:'flex', alignItems:'center', boxShadow:'0 16px 48px rgba(0,0,0,0.15)', cursor:'pointer' }}>
            <img src={I.helpcta} alt="24/7 Roadside Help" style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover' }} />
            <div style={{ position:'absolute', inset:0, backgroundColor:'rgba(22,29,27,0.58)' }} />
            <div style={{ position:'relative', zIndex:1, padding:'0 64px', maxWidth:'560px' }}>
              <p style={{ fontSize:'11px', ...UB, color:C.mint, textTransform:'uppercase' as const, letterSpacing:'0.15em', marginBottom:'14px' }}>NEED HELP RIGHT NOW?</p>
              <h2 style={{ fontSize:'clamp(26px,3.5vw,42px)', ...UB, color:'white', marginBottom:'18px', lineHeight:1.05 }}>24/7 Emergency Roadside Assistance.</h2>
              <p style={{ fontSize:'17px', color:'rgba(255,255,255,0.9)', marginBottom:'28px', lineHeight:1.55 }}>Breakdown, flat tire, or lockout — find nearby help in minutes.</p>
              <button style={{ backgroundColor:C.mint, color:C.ink, border:'none', padding:'16px 40px', borderRadius:'100px', fontSize:'11px', ...UB, textTransform:'uppercase' as const, letterSpacing:'0.12em', cursor:'pointer', transition:'transform 0.2s' }}
                onMouseEnter={e=>e.currentTarget.style.transform='scale(1.04)'}
                onMouseLeave={e=>e.currentTarget.style.transform='scale(1)'}
              >FIND ROADSIDE HELP</button>
            </div>
          </div>
        </section>

        {/* ══ 11. SERVICE DISCOVERIES GRID ═══════════════════════ */}
        <section style={{ marginBottom:'48px' }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'28px' }}>
            <h3 style={{ fontSize:'clamp(18px,2.5vw,24px)', ...UB, color:C.ink, textTransform:'uppercase' as const }}>More Services Near You</h3>
            <a href="#" style={{ fontSize:'12px', ...UB, color:C.mint, textDecoration:'none' }}>View All</a>
          </div>
          {[filteredGrid.slice(0,4),filteredGrid.slice(4,8),filteredGrid.slice(8,12),filteredGrid.slice(12,16)].map((row,ri)=>(
            <div key={ri} style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'20px', marginBottom:'20px' }}>
              {row.map((item,j)=><GridCard key={j} {...item} />)}
            </div>
          ))}
        </section>

        {/* ══ 12. PAGINATION ═══════════════════════════════════ */}
        <div style={{ display:'flex', justifyContent:'center', alignItems:'center', gap:'10px', marginBottom:'64px' }}>
          <button onClick={()=>setPage(p=>Math.max(1,p-1))} disabled={page<=1} style={{ width:'44px', height:'44px', borderRadius:'12px', backgroundColor:'white', border:'1px solid rgba(107,122,118,0.12)', cursor:page<=1?'not-allowed':'pointer', opacity:page<=1?0.4:1, display:'flex', alignItems:'center', justifyContent:'center', color:C.muted }}><ChevronLeft size={18} /></button>
          {Array.from({length:totalPages},(_,i)=>i+1).map(p=>(
            <button key={p} onClick={()=>setPage(p)}
              style={{ width:'44px', height:'44px', borderRadius:'12px', cursor:'pointer', fontSize:'15px', ...UB, border:'1px solid', transition:'all 0.2s',
                backgroundColor: page===p?C.mint:'white', color:page===p?C.ink:C.muted, borderColor:page===p?C.mint:'rgba(107,122,118,0.12)',
              }}
            >{p}</button>
          ))}          <button style={{ width:'44px', height:'44px', borderRadius:'12px', backgroundColor:'white', border:'1px solid rgba(107,122,118,0.12)', cursor:'pointer', fontSize:'15px', ...UB, color:C.muted }}>6</button>
          <button onClick={()=>setPage(p=>Math.min(totalPages,p+1))} disabled={page>=totalPages} style={{ width:'44px', height:'44px', borderRadius:'12px', backgroundColor:'white', border:'1px solid rgba(107,122,118,0.12)', cursor:page>=totalPages?'not-allowed':'pointer', opacity:page>=totalPages?0.4:1, display:'flex', alignItems:'center', justifyContent:'center', color:C.muted }}><ChevronRight size={18} /></button>
        </div>

        {/* ══ 13. BECOME VERIFIED PARTNER BANNER ═══════════════ */}
        <section style={{ marginBottom:'64px' }}>
          <div style={{ backgroundColor:C.mint, borderRadius:'40px', padding:'56px 64px', display:'flex', alignItems:'center', justifyContent:'space-between', boxShadow:`0 16px 48px ${C.mint}30`, flexWrap:'wrap' as const, gap:'28px' }}>
            <div style={{ maxWidth:'520px' }}>
              <p style={{ fontSize:'9px', ...UB, textTransform:'uppercase' as const, letterSpacing:'0.15em', color:'rgba(22,29,27,0.6)', marginBottom:'14px' }}>FOR PROVIDERS</p>
              <h2 style={{ fontSize:'clamp(26px,3.5vw,40px)', ...UB, color:C.ink, marginBottom:'16px', lineHeight:1.05 }}>Become a SouKni Verified Partner.</h2>
              <p style={{ fontSize:'17px', color:`${C.ink}b3`, lineHeight:1.6 }}>Priority placement, a trust badge, and access to more customers searching for your service.</p>
            </div>
            <div style={{ display:'flex', gap:'14px', flexWrap:'wrap' as const }}>
              <button style={{ backgroundColor:C.ink, color:'white', border:'none', padding:'18px 44px', borderRadius:'100px', fontSize:'11px', ...UB, textTransform:'uppercase' as const, letterSpacing:'0.12em', cursor:'pointer', transition:'transform 0.2s' }}
                onMouseEnter={e=>e.currentTarget.style.transform='scale(1.04)'}
                onMouseLeave={e=>e.currentTarget.style.transform='scale(1)'}
              >Get Verified</button>
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
              <p style={{ fontSize:'17px', color:C.muted, marginBottom:'36px', maxWidth:'400px', lineHeight:1.6 }}>Get early access to trusted service providers and exclusive booking deals.</p>
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
        <CategoryFooterNav
          backHref={`/${locale}/motors`}
          backLabel="Back to All Motors"
          inkColor={C.ink}
          mintDkColor={C.mint}
        />
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
