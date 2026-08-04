'use client'
import { useState } from 'react'
import React from 'react'
import Link from 'next/link'
import { Heart, Search, ChevronDown, ChevronLeft, ChevronRight, SlidersHorizontal, MapPin } from 'lucide-react'
import { useParams } from 'next/navigation'

const C = {
  mint:'#22d4a8', mintDk:'#006c53', ink:'#161d1b',
  surface:'#f4fbf8', cream:'#f5ede0', muted:'#6b7a76',
}
const UB: React.CSSProperties = { fontFamily:'Inter,sans-serif', fontWeight:900, letterSpacing:'-0.05em' }
const CB: React.CSSProperties = { fontFamily:"'Hanken Grotesk',sans-serif", fontWeight:900, letterSpacing:'-0.03em' }

const SUBCATS = [
  { label:'Civil Engineering', slug:'civil-engineering' },
  { label:'Site Management',   slug:'site-management'   },
  { label:'Architecture',      slug:'architecture'      },
  { label:'Electrical',        slug:'electrical'        },
  { label:'Plumbing',          slug:'plumbing'          },
  { label:'Heavy Machinery',   slug:'heavy-machinery'   },
]

const CAT_DATA: Record<string,{ label:string; hero:string; desc:string; count:string; specialties:string[]; companies:string[]; salaryRanges:string[] }> = {
  'civil-engineering': {
    label:'Civil Engineering', count:'95',
    hero:'https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg?auto=compress&w=1600',
    desc:'Structural, geotechnical, transportation and water engineering roles.',
    specialties:['All Specialties','Structural','Geotechnical','Transportation','Water & Env','Project Mgmt'],
    companies:['All Companies','Morocco Urban Works','Bouygues','Vinci','CID','Egis','Artelia','Setec'],
    salaryRanges:['Any Salary','0–10k MAD','10–20k MAD','20–35k MAD','35k+ MAD'],
  },
  'site-management': {
    label:'Site Management', count:'72',
    hero:'https://images.pexels.com/photos/1109541/pexels-photo-1109541.jpeg?auto=compress&w=1600',
    desc:'Site supervisors, project coordinators, HSE officers and planning engineers.',
    specialties:['All Specialties','Site Supervisor','Project Coordinator','Safety Officer','Planning Engineer','Site Admin'],
    companies:['All Companies','Addoha','Alliances','CGI','Douja Promotion','Al Omrane','LafargeHolcim','Sonadac'],
    salaryRanges:['Any Salary','0–8k MAD','8–18k MAD','18–30k MAD','30k+ MAD'],
  },
  'architecture': {
    label:'Architecture', count:'48',
    hero:'https://images.pexels.com/photos/3862130/pexels-photo-3862130.jpeg?auto=compress&w=1600',
    desc:'Architects, interior designers, urban planners and BIM specialists.',
    specialties:['All Specialties','Architectural Design','Interior Design','Urban Planning','BIM & Revit','Landscape'],
    companies:['All Companies','M Architecture','Oualalou+Choi','KILO Architectures','Studio KO','Revery','Casamémoire','SOM'],
    salaryRanges:['Any Salary','0–9k MAD','9–20k MAD','20–32k MAD','32k+ MAD'],
  },
  'electrical': {
    label:'Electrical', count:'56',
    hero:'https://images.pexels.com/photos/257736/pexels-photo-257736.jpeg?auto=compress&w=1600',
    desc:'High voltage, industrial electrical, solar and automation engineering roles.',
    specialties:['All Specialties','High Voltage','Industrial Elec','Building Systems','Solar & Renewables','Automation'],
    companies:['All Companies','ONEE','Schneider Electric','Siemens','ABB','Cegelec','Engie','Eiffage Energie'],
    salaryRanges:['Any Salary','0–9k MAD','9–18k MAD','18–28k MAD','28k+ MAD'],
  },
  'plumbing': {
    label:'Plumbing', count:'34',
    hero:'https://images.pexels.com/photos/6419128/pexels-photo-6419128.jpeg?auto=compress&w=1600',
    desc:'Commercial plumbing, HVAC, fire suppression and industrial piping roles.',
    specialties:['All Specialties','Commercial Plumbing','HVAC','Fire Suppression','Industrial Piping','Sanitation'],
    companies:['All Companies','Coficab','Tractafric','Schneider','Johnson Controls','Carrier','Daikin','Trane'],
    salaryRanges:['Any Salary','0–7k MAD','7–14k MAD','14–22k MAD','22k+ MAD'],
  },
  'heavy-machinery': {
    label:'Heavy Machinery', count:'35',
    hero:'https://images.pexels.com/photos/1078884/pexels-photo-1078884.jpeg?auto=compress&w=1600',
    desc:'Crane operators, excavator drivers, plant supervisors and maintenance mechanics.',
    specialties:['All Specialties','Crane Operator','Excavator','Bulldozer','Forklift','Concrete Pump'],
    companies:['All Companies','Capital Excavations','HighRise Morocco','Atlas Equipment','Volvo CE','Caterpillar','Liebherr','Manitowoc'],
    salaryRanges:['Any Salary','0–6k MAD','6–12k MAD','12–18k MAD','18k+ MAD'],
  },
}

const IMGS = [
  'https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg?auto=compress&w=400',
  'https://images.pexels.com/photos/1109541/pexels-photo-1109541.jpeg?auto=compress&w=400',
  'https://images.pexels.com/photos/3862130/pexels-photo-3862130.jpeg?auto=compress&w=400',
  'https://images.pexels.com/photos/257736/pexels-photo-257736.jpeg?auto=compress&w=400',
  'https://images.pexels.com/photos/1078884/pexels-photo-1078884.jpeg?auto=compress&w=400',
]

type BadgeT = 'certified'|'diamond'|'featured'|'new'
function Badge({ type }: { type: BadgeT }) {
  const map: Record<BadgeT,{bg:string;color:string;label:string}> = {
    certified: { bg:C.mint,    color:C.ink,  label:'SouKni Certified' },
    diamond:   { bg:C.ink,     color:C.mint, label:'✦ DIAMOND'        },
    featured:  { bg:'#fbbf24', color:C.ink,  label:'Featured'         },
    new:       { bg:C.mint,    color:'white', label:'New Arrival'      },
  }
  const s = map[type]
  return <span style={{ backgroundColor:s.bg, color:s.color, fontSize:'8px', ...CB, padding:'4px 10px', borderRadius:'6px', textTransform:'uppercase' as const, letterSpacing:'0.08em', display:'inline-block', boxShadow:'0 2px 6px rgba(0,0,0,0.15)', whiteSpace:'nowrap' as const }}>{s.label}</span>
}

function ListingCard({ brand, title, price, location, company, img, badge, specialty }: any) {
  const [saved, setSaved] = useState(false)
  const [hov,   setHov  ] = useState(false)
  return (
    <article onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{ backgroundColor:'white', borderRadius:'24px', border:`1px solid ${hov?C.mint:'rgba(107,122,118,0.1)'}`, overflow:'hidden', transition:'all 0.3s', cursor:'pointer', boxShadow:hov?`0 20px 40px ${C.mint}18`:'0 2px 8px rgba(0,0,0,0.04)' }}>
      <div style={{ position:'relative', aspectRatio:'1/1', overflow:'hidden', backgroundColor:C.cream }}>
        <img src={img} alt={title} style={{ width:'100%', height:'100%', objectFit:'cover', transition:'transform 0.6s', transform:hov?'scale(1.08)':'scale(1)' }} />
        <div style={{ position:'absolute', top:'10px', left:'10px', zIndex:10 }}><Badge type={badge} /></div>
        <button onClick={e=>{e.stopPropagation();setSaved(!saved)}}
          style={{ position:'absolute', top:'8px', right:'8px', zIndex:10, width:'32px', height:'32px', borderRadius:'50%', backgroundColor:'rgba(255,255,255,0.85)', border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}>
          <Heart size={14} fill={saved?'#ef4444':'none'} color={saved?'#ef4444':C.muted} />
        </button>
        {specialty && <div style={{ position:'absolute', bottom:'10px', right:'10px', zIndex:10, backgroundColor:'rgba(22,29,27,0.75)', color:'white', fontSize:'9px', ...CB, padding:'3px 8px', borderRadius:'5px' }}>{specialty}</div>}
      </div>
      <div style={{ padding:'16px 18px', flex:1, display:'flex', flexDirection:'column' as const }}>
        <p style={{ fontSize:'9px', ...UB, color:C.mint, textTransform:'uppercase' as const, letterSpacing:'0.1em', marginBottom:'2px' }}>{brand}</p>
        <h4 style={{ fontSize:'14px', ...CB, color:hov?C.mint:C.ink, marginBottom:'4px', transition:'color 0.2s', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' as const }}>{title}</h4>
        <p style={{ fontSize:'18px', ...CB, color:C.mint, marginBottom:'6px' }}>{price.toLocaleString()} MAD</p>
        {location && <p style={{ display:'flex', alignItems:'center', gap:'3px', marginBottom:'12px' }}><MapPin size={10} color={C.muted} /><span style={{ fontSize:'9px', color:C.muted }}>{location}</span></p>}
        <div style={{ marginTop:'auto', display:'flex', gap:'8px' }}>
          <button style={{ flex:1, border:`2px solid ${C.ink}`, color:C.ink, backgroundColor:'transparent', padding:'9px', borderRadius:'12px', fontSize:'10px', ...CB, textTransform:'uppercase' as const, cursor:'pointer', transition:'all 0.15s' }}
            onMouseEnter={e=>{e.currentTarget.style.backgroundColor=C.ink;e.currentTarget.style.color='white'}}
            onMouseLeave={e=>{e.currentTarget.style.backgroundColor='transparent';e.currentTarget.style.color=C.ink}}>
            Message
          </button>
          <a href="https://wa.me/212600000000?text=Hi%2C%20I%20found%20your%20item%20on%20SouKni!" target="_blank" rel="noopener noreferrer"
            style={{ flex:1, border:'none', color:'white', backgroundColor:'#25D366', padding:'9px', borderRadius:'12px', fontSize:'10px', ...CB, textTransform:'uppercase' as const, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', gap:'4px', textDecoration:'none' }}>
            WhatsApp
          </a>
        </div>
      </div>
    </article>
  )
}

function makeListings(catSlug: string, count: number) {
  const cat = CAT_DATA[catSlug] || CAT_DATA['civil-engineering']
  const titleMap: Record<string,string[]> = {
    'civil-engineering': ['Senior Structural Engineer','Infrastructure PM','Geotechnical Engineer','Bridge Design Engineer','Site Engineer','Hydraulic Engineer','BIM Coordinator','Materials Inspector','Survey Technician','AutoCAD Draftsman','Environmental Assessor','Lab Technician','QS Civil','Drainage Engineer','Highway Engineer','Site Inspector'],
    'site-management':   ['Site Director','Senior Site Manager','Project Coordinator','HSE Officer','Planning Engineer','Site Foreman','Document Controller','Subcontractor Manager','Safety Inspector','Clerk of Works','Snag Manager','Logistics Coordinator','Contracts Manager','Commissioning Manager','Temp Works Coordinator','Construction Buyer'],
    'architecture':      ['Lead Architect','Senior Interior Designer','Urban Planning Manager','BIM Manager','Junior Architect','Landscape Architect','3D Visualisation Artist','Heritage Architect','CAD Technician','Specification Writer','Concept Designer','Permit Coordinator','Sustainability Consultant','FF&E Coordinator','Arch Project Manager','Urban Designer'],
    'electrical':        ['Senior Electrical Engineer','Electrical PM','Solar PV Designer','Industrial Electrician','Building Elec Supervisor','Solar Installer','Electrical Inspector','Automation Engineer','Commercial Electrician','LV Technician','Fire & Security Engineer','Data Centre Engineer','Cable Crew Lead','Street Lighting Engineer','Electrical Estimator','EV Charging Engineer'],
    'plumbing':          ['Master Plumber','HVAC Design Engineer','Fire Protection Engineer','Industrial Pipefitter','HVAC Technician','Sanitation Engineer','Pool Systems Specialist','Gas Engineer','Residential Plumber','Water Treatment Tech','Sprinkler Installer','HVAC Maintenance Tech','Boiler Engineer','Plumbing Estimator','Air Systems Tech','MEP Coordinator'],
    'heavy-machinery':   ['Tower Crane Operator','Senior Excavator Operator','Fleet Supervisor','Mobile Crane Operator','Bulldozer Operator','Concrete Pump Operator','Piling Rig Operator','Plant Mechanic','Forklift Operator','Dump Truck Driver','Roller Operator','Telehandler Operator','Crane Rigger','Scissor Lift Operator','Asphalt Paver Operator','Equipment Trainer'],
  }
  const titles    = titleMap[catSlug] || titleMap['civil-engineering']
  const badges: BadgeT[]  = ['certified','diamond','featured','new','certified','diamond']
  const locs      = ['Rabat','Casablanca','Tangier','Marrakech','Agadir','Fès','Kenitra','Jorf Lasfar']
  const specs     = cat.specialties.slice(1)
  return Array.from({length:count},(_,i)=>({
    brand:    cat.companies[i%cat.companies.length] === 'All Companies' ? cat.companies[1] : cat.companies[i%cat.companies.length],
    title:    titles[i%titles.length],
    price:    6000 + ((i*1373)%34000),
    location: locs[i%locs.length],
    img:      IMGS[i%IMGS.length],
    badge:    badges[i%badges.length],
    specialty: specs[i%specs.length],
  }))
}

export default function ConstructionSubPage() {
  const params   = useParams()
  const locale   = (params?.locale as string) || 'en'
  const catSlug  = (params?.category as string) || 'civil-engineering'
  const catData  = CAT_DATA[catSlug] || CAT_DATA['civil-engineering']

  const [activeSeller,   setActiveSeller  ] = useState('All Sellers')
  const [diamond,        setDiamond       ] = useState(true)
  const [gridView,       setGridView      ] = useState(true)
  const [page,           setPage          ] = useState(1)
  const [keyword,        setKeyword       ] = useState('')
  const [city,           setCity          ] = useState('Rabat')
  const [price,          setPrice         ] = useState('Any Salary')
  const [sortBy,         setSortBy        ] = useState('Most Recent')
  const [activeSpecialty,setActiveSpecialty] = useState('All Specialties')
  const [activeCompany,  setActiveCompany ] = useState('All Companies')
  const [cityOpen,       setCityOpen      ] = useState(false)
  const [priceOpen,      setPriceOpen     ] = useState(false)

  const listings = makeListings(catSlug, 24)
  const cities   = ['Rabat','Casablanca','Marrakech','Fès','Tangier','Agadir','Meknès']

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
          <div style={{ position:'absolute', top:'calc(100% + 8px)', left:0, minWidth:'220px', backgroundColor:'white', borderRadius:'20px', boxShadow:'0 20px 60px rgba(0,0,0,0.12)', border:`1px solid rgba(107,122,118,0.12)`, zIndex:200, overflow:'hidden', padding:'8px 0' }}>
            {options.map((opt:string)=>(
              <button key={opt} onClick={()=>{ onChange(opt); setOpen(false) }}
                style={{ width:'100%', padding:'12px 20px', background:'none', border:'none', cursor:'pointer', textAlign:'left' as const, fontSize:'14px', ...UB, color:opt===value?C.mint:C.ink, display:'flex', justifyContent:'space-between', alignItems:'center' }}
                onMouseEnter={e=>e.currentTarget.style.backgroundColor=C.surface}
                onMouseLeave={e=>e.currentTarget.style.backgroundColor='transparent'}>
                {opt}{opt===value&&<span style={{color:C.mint}}>✓</span>}
              </button>
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
          <p style={{ fontSize:'11px', ...UB, color:C.mint, textTransform:'uppercase' as const, letterSpacing:'0.2em', marginBottom:'12px' }}>CONSTRUCTION › {catData.label.toUpperCase()}</p>
          <h1 style={{ fontSize:'clamp(32px,5vw,52px)', ...UB, color:'white', marginBottom:'16px', lineHeight:1.05, textShadow:'0 4px 20px rgba(0,0,0,0.4)' }}>{catData.label} in Rabat</h1>
          <p style={{ fontSize:'16px', color:'rgba(255,255,255,0.82)', marginBottom:'28px' }}>{catData.desc}</p>
          <div style={{ maxWidth:'620px', margin:'0 auto', backgroundColor:'rgba(255,255,255,0.12)', backdropFilter:'blur(12px)', borderRadius:'100px', border:'1px solid rgba(255,255,255,0.22)', display:'flex', alignItems:'center', gap:'8px', padding:'6px 6px 6px 16px' }}>
            <Search size={16} color="rgba(255,255,255,0.7)" />
            <input type="text" value={keyword} onChange={e=>setKeyword(e.target.value)} placeholder={`Search ${catData.label}...`}
              style={{ flex:1, background:'none', border:'none', outline:'none', color:'white', fontSize:'14px', ...UB, fontFamily:'Inter,sans-serif' }} />
            {keyword && <button onClick={()=>setKeyword('')} style={{ background:'none', border:'none', cursor:'pointer', color:C.muted, fontSize:'16px' }}>×</button>}
            <button style={{ backgroundColor:C.mint, color:C.ink, border:'none', padding:'12px 28px', borderRadius:'100px', fontSize:'11px', ...UB, textTransform:'uppercase' as const, letterSpacing:'0.1em', cursor:'pointer' }}>SEARCH</button>
          </div>
        </div>
      </section>

      {/* FILTER BAR */}
      <div style={{ maxWidth:'1280px', margin:'-36px auto 0', padding:'0 24px', position:'relative', zIndex:30 }}>
        <div style={{ backgroundColor:'rgba(255,255,255,0.97)', backdropFilter:'blur(16px)', border:'1px solid rgba(107,122,118,0.12)', borderRadius:'100px', boxShadow:'0 12px 40px rgba(0,0,0,0.08)', display:'flex', alignItems:'stretch', height:'68px' }}>
          <DDrop label="CITY" value={city} options={cities} open={cityOpen} setOpen={setCityOpen} onChange={setCity} />
          <div style={{ width:'1px', backgroundColor:'rgba(107,122,118,0.12)', margin:'12px 0' }} />
          <div style={{ flex:1.8, padding:'0 22px', display:'flex', flexDirection:'column' as const, justifyContent:'center', gap:'8px' }}>
            <span style={{ fontSize:'9px', ...UB, textTransform:'uppercase' as const, letterSpacing:'0.14em', color:C.muted, marginBottom:'3px' }}>KEYWORD</span>
            <div style={{ display:'flex', alignItems:'center', gap:'8px' }}>
              <Search size={13} color={C.muted} />
              <input type="text" value={keyword} onChange={e=>setKeyword(e.target.value)} placeholder={`e.g. ${catData.companies[1]}, ${catData.companies[2]}...`}
                style={{ flex:1, background:'none', border:'none', outline:'none', fontSize:'14px', ...UB, color:C.ink, fontFamily:'Inter,sans-serif' }} />
              {keyword && <button onClick={()=>setKeyword('')} style={{ background:'none', border:'none', cursor:'pointer', color:C.muted, fontSize:'16px' }}>×</button>}
            </div>
          </div>
          <div style={{ width:'1px', backgroundColor:'rgba(107,122,118,0.12)', margin:'12px 0' }} />
          <DDrop label="SALARY (MAD)" value={price} options={catData.salaryRanges} open={priceOpen} setOpen={setPriceOpen} onChange={setPrice} />
          <div style={{ width:'1px', backgroundColor:'rgba(107,122,118,0.12)', margin:'12px 0' }} />
          <button style={{ display:'flex', alignItems:'center', gap:'10px', padding:'0 28px', background:'none', border:'none', cursor:'pointer', borderRadius:'0 100px 100px 0', transition:'background 0.15s', flexShrink:0 }}
            onMouseEnter={e=>e.currentTarget.style.backgroundColor=`${C.mint}14`}
            onMouseLeave={e=>e.currentTarget.style.backgroundColor='transparent'}>
            <SlidersHorizontal size={18} color={C.mint} />
            <span style={{ fontSize:'14px', ...UB, color:C.ink }}>Filters</span>
          </button>
        </div>
      </div>

      <main style={{ maxWidth:'1280px', margin:'0 auto', padding:'32px 24px 80px' }}>

        {/* BREADCRUMB */}
        <nav style={{ display:'flex', alignItems:'center', gap:'6px', fontSize:'10px', ...UB, color:C.muted, textTransform:'uppercase' as const, letterSpacing:'0.12em', marginBottom:'12px' }}>
          {[
            { label:'Home',         href:`/${locale}` },
            { label:'Jobs',         href:`/${locale}/jobs` },
            { label:'Construction', href:`/${locale}/jobs/construction` },
            { label:catData.label,   href:null },
          ].map((c,i,arr)=>(
            <span key={c.label} style={{ display:'flex', alignItems:'center', gap:'6px' }}>
              {c.href
                ? <Link href={c.href} style={{ color:C.muted, textDecoration:'none', transition:'color 0.15s' }}
                    onMouseEnter={e=>e.currentTarget.style.color=C.mint}
                    onMouseLeave={e=>e.currentTarget.style.color=C.muted}>{c.label}</Link>
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
              {['Most Recent','Salary: Low to High','Salary: High to Low','Most Popular'].map(s=><option key={s}>{s}</option>)}
            </select>
            <button style={{ backgroundColor:'white', border:'1px solid rgba(107,122,118,0.18)', padding:'9px 16px', borderRadius:'12px', fontSize:'10px', ...UB, textTransform:'uppercase' as const, letterSpacing:'0.1em', cursor:'pointer', color:C.ink }}>
              🔔 Save Search
            </button>
          </div>
        </div>

        {/* SUB-CATEGORY PILLS */}
        <div style={{ display:'flex', gap:'10px', flexWrap:'wrap' as const, marginBottom:'20px' }}>
          {SUBCATS.map(cat=>(
            <Link key={cat.slug} href={`/${locale}/jobs/construction/${cat.slug}`}
              style={{ padding:'10px 22px', borderRadius:'100px', fontSize:'11px', ...UB, textTransform:'uppercase' as const, letterSpacing:'0.1em', cursor:'pointer', transition:'all 0.2s', border:'1px solid', textDecoration:'none', display:'inline-block',
                backgroundColor: catSlug===cat.slug ? C.mint     : 'white',
                color:           catSlug===cat.slug ? C.ink      : C.muted,
                borderColor:     catSlug===cat.slug ? C.mint     : 'rgba(186,202,197,0.4)',
              }}
              onMouseEnter={e=>{if(catSlug!==cat.slug){(e.currentTarget as HTMLElement).style.borderColor=C.mint;(e.currentTarget as HTMLElement).style.color=C.ink}}}
              onMouseLeave={e=>{if(catSlug!==cat.slug){(e.currentTarget as HTMLElement).style.borderColor='rgba(186,202,197,0.4)';(e.currentTarget as HTMLElement).style.color=C.muted}}}
            >{cat.label}</Link>
          ))}
        </div>

        {/* SELLER TABS + DIAMOND */}
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap' as const, gap:'14px', marginBottom:'20px' }}>
          <div style={{ display:'flex', gap:'4px', padding:'5px', backgroundColor:'#e8efec', borderRadius:'100px' }}>
            {['All Sellers','SouKni Members','SouKni Pro'].map(tab=>(
              <button key={tab} onClick={()=>setActiveSeller(tab)}
                style={{ padding:'10px 24px', borderRadius:'100px', fontSize:'11px', ...UB, textTransform:'uppercase' as const, letterSpacing:'0.1em', cursor:'pointer', border:'none', transition:'all 0.2s',
                  backgroundColor:activeSeller===tab?C.ink:'transparent', color:activeSeller===tab?'white':C.muted, boxShadow:activeSeller===tab?'0 2px 8px rgba(0,0,0,0.15)':'none' }}>
                {tab}
              </button>
            ))}
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:'12px', cursor:'pointer' }} onClick={()=>setDiamond(!diamond)}>
            <span style={{ fontSize:'10px', ...UB, color:C.muted, textTransform:'uppercase' as const, letterSpacing:'0.1em' }}>Show SouKni Diamond Certified First</span>
            <div style={{ width:'52px', height:'26px', borderRadius:'100px', backgroundColor:diamond?C.mint:'rgba(107,122,118,0.2)', position:'relative', transition:'background 0.25s' }}>
              <div style={{ position:'absolute', top:'3px', left:diamond?'29px':'3px', width:'20px', height:'20px', borderRadius:'50%', backgroundColor:C.ink, transition:'left 0.25s' }} />
            </div>
          </div>
        </div>

        {/* NEW ARRIVALS + GRID TOGGLE */}
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'32px' }}>
          <div style={{ display:'flex', gap:'10px' }}>
            {['✨ New Arrivals','📉 Price Drop Alert'].map(btn=>(
              <button key={btn} style={{ display:'flex', alignItems:'center', gap:'6px', padding:'9px 18px', borderRadius:'100px', border:'1px solid rgba(107,122,118,0.2)', backgroundColor:'transparent', fontSize:'12px', ...UB, cursor:'pointer', color:C.muted, transition:'all 0.15s' }}
                onMouseEnter={e=>{e.currentTarget.style.borderColor=C.mint;e.currentTarget.style.color=C.ink;e.currentTarget.style.backgroundColor=`${C.mint}0a`}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor='rgba(107,122,118,0.2)';e.currentTarget.style.color=C.muted;e.currentTarget.style.backgroundColor='transparent'}}
              >{btn}</button>
            ))}
          </div>
          <div style={{ display:'flex', gap:'4px', padding:'4px', backgroundColor:'white', borderRadius:'12px', border:'1px solid rgba(107,122,118,0.12)' }}>
            <button onClick={()=>setGridView(true)}  style={{ width:'36px', height:'36px', borderRadius:'8px', border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'17px', backgroundColor:gridView?C.ink:'transparent',  color:gridView?'white':C.muted,  transition:'all 0.2s' }}>⊞</button>
            <button onClick={()=>setGridView(false)} style={{ width:'36px', height:'36px', borderRadius:'8px', border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'17px', backgroundColor:!gridView?C.ink:'transparent', color:!gridView?'white':C.muted, transition:'all 0.2s' }}>≡</button>
          </div>
        </div>

        {/* SPECIALTY FILTER */}
        <div style={{ backgroundColor:'white', borderRadius:'20px', padding:'20px 24px', marginBottom:'16px', border:'1px solid rgba(107,122,118,0.1)' }}>
          <p style={{ fontSize:'9px', ...UB, color:C.muted, textTransform:'uppercase' as const, letterSpacing:'0.14em', marginBottom:'12px' }}>FILTER BY SPECIALTY</p>
          <div style={{ display:'flex', gap:'8px', flexWrap:'wrap' as const }}>
            {catData.specialties.map(spec=>(
              <button key={spec} onClick={()=>setActiveSpecialty(spec)}
                style={{ padding:'7px 16px', borderRadius:'100px', fontSize:'10px', ...UB, border:'1px solid', cursor:'pointer', transition:'all 0.15s',
                  backgroundColor:activeSpecialty===spec?C.mint:'transparent', color:activeSpecialty===spec?C.ink:C.muted, borderColor:activeSpecialty===spec?C.mint:'rgba(107,122,118,0.2)' }}
                onMouseEnter={e=>{if(activeSpecialty!==spec){e.currentTarget.style.borderColor=C.mint;e.currentTarget.style.color=C.ink}}}
                onMouseLeave={e=>{if(activeSpecialty!==spec){e.currentTarget.style.borderColor='rgba(107,122,118,0.2)';e.currentTarget.style.color=C.muted}}}
              >{spec}</button>
            ))}
          </div>
        </div>

        {/* COMPANY FILTER */}
        <div style={{ backgroundColor:'white', borderRadius:'20px', padding:'20px 24px', marginBottom:'32px', border:'1px solid rgba(107,122,118,0.1)' }}>
          <p style={{ fontSize:'9px', ...UB, color:C.muted, textTransform:'uppercase' as const, letterSpacing:'0.14em', marginBottom:'12px' }}>FILTER BY COMPANY</p>
          <div style={{ display:'flex', gap:'8px', flexWrap:'wrap' as const }}>
            {catData.companies.map(co=>(
              <button key={co} onClick={()=>setActiveCompany(co)}
                style={{ padding:'7px 16px', borderRadius:'100px', fontSize:'10px', ...UB, border:'1px solid', cursor:'pointer', transition:'all 0.15s',
                  backgroundColor:activeCompany===co?C.mint:'transparent', color:activeCompany===co?C.ink:C.muted, borderColor:activeCompany===co?C.mint:'rgba(107,122,118,0.2)' }}
                onMouseEnter={e=>{if(activeCompany!==co){e.currentTarget.style.borderColor=C.mint;e.currentTarget.style.color=C.ink}}}
                onMouseLeave={e=>{if(activeCompany!==co){e.currentTarget.style.borderColor='rgba(107,122,118,0.2)';e.currentTarget.style.color=C.muted}}}
              >{co}</button>
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
          <button style={{ width:'44px', height:'44px', borderRadius:'12px', backgroundColor:'white', border:'1px solid rgba(107,122,118,0.12)', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', color:C.muted }}>
            <ChevronLeft size={18} />
          </button>
          {[1,2,3,4,5].map(p=>(
            <button key={p} onClick={()=>setPage(p)} style={{ width:'44px', height:'44px', borderRadius:'12px', cursor:'pointer', fontSize:'15px', ...UB, border:'1px solid', transition:'all 0.2s', backgroundColor:page===p?C.mint:'white', color:page===p?C.ink:C.muted, borderColor:page===p?C.mint:'rgba(107,122,118,0.12)' }}>{p}</button>
          ))}
          <span style={{ color:C.muted }}>…</span>
          <button style={{ width:'44px', height:'44px', borderRadius:'12px', backgroundColor:'white', border:'1px solid rgba(107,122,118,0.12)', cursor:'pointer', ...UB, fontSize:'15px', color:C.muted }}>10</button>
          <button style={{ width:'44px', height:'44px', borderRadius:'12px', backgroundColor:'white', border:'1px solid rgba(107,122,118,0.12)', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', color:C.muted }}>
            <ChevronRight size={18} />
          </button>
        </div>

        {/* EXPLORE OTHER SPECIALTIES */}
        <section style={{ marginBottom:'48px' }}>
          <h3 style={{ fontSize:'clamp(18px,2.5vw,24px)', ...UB, color:C.ink, textTransform:'uppercase' as const, marginBottom:'20px' }}>Explore Other Construction Specialties</h3>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(6,1fr)', gap:'14px' }}>
            {SUBCATS.filter(c=>c.slug!==catSlug).map(cat=>(
              <Link key={cat.slug} href={`/${locale}/jobs/construction/${cat.slug}`}
                style={{ backgroundColor:'white', borderRadius:'20px', padding:'20px 16px', textAlign:'center' as const, border:'1px solid rgba(107,122,118,0.1)', textDecoration:'none', transition:'all 0.2s', display:'block' }}
                onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.borderColor=C.mint;(e.currentTarget as HTMLElement).style.boxShadow=`0 8px 24px ${C.mint}18`}}
                onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.borderColor='rgba(107,122,118,0.1)';(e.currentTarget as HTMLElement).style.boxShadow='none'}}
              >
                <p style={{ fontSize:'11px', ...UB, color:C.ink, textTransform:'uppercase' as const, letterSpacing:'0.08em' }}>{cat.label}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* BACK */}
        <div style={{ textAlign:'center' as const }}>
          <Link href={`/${locale}/jobs/construction`}
            style={{ display:'inline-flex', alignItems:'center', gap:'8px', padding:'16px 40px', borderRadius:'100px', backgroundColor:C.ink, color:'white', textDecoration:'none', fontSize:'12px', ...UB, textTransform:'uppercase' as const, letterSpacing:'0.1em', transition:'background 0.2s' }}
            onMouseEnter={e=>e.currentTarget.style.backgroundColor=C.mint}
            onMouseLeave={e=>e.currentTarget.style.backgroundColor=C.ink}>
            ← Back to All Construction
          </Link>
        </div>

      </main>
    </div>
  )
}
