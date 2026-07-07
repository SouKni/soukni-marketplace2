'use client'

import { useState } from 'react'
import React from 'react'
import { Heart, Search, MapPin, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react'

/* ─── IMAGES ────────────────────────────────────────────── */
const I = {
  hero:      'https://images.pexels.com/photos/1983037/pexels-photo-1983037.jpeg?auto=compress&w=1600',
  sony:      'https://images.pexels.com/photos/51383/photo-camera-subject-photographer-51383.jpeg?auto=compress&w=600',
  canon:     'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&w=600',
  film:      'https://images.pexels.com/photos/3062541/pexels-photo-3062541.jpeg?auto=compress&w=800',
  lens1:     'https://images.pexels.com/photos/1787220/pexels-photo-1787220.jpeg?auto=compress&w=600',
  lens2:     'https://images.pexels.com/photos/279906/pexels-photo-279906.jpeg?auto=compress&w=600',
  lens3:     'https://images.pexels.com/photos/1983037/pexels-photo-1983037.jpeg?auto=compress&w=600',
  gimbal:    'https://images.pexels.com/photos/3062541/pexels-photo-3062541.jpeg?auto=compress&w=600',
  red:       'https://images.pexels.com/photos/2510428/pexels-photo-2510428.jpeg?auto=compress&w=600',
  tripod:    'https://images.pexels.com/photos/1203819/pexels-photo-1203819.jpeg?auto=compress&w=600',
  arri:      'https://images.pexels.com/photos/2510428/pexels-photo-2510428.jpeg?auto=compress&w=600',
  pana:      'https://images.pexels.com/photos/279906/pexels-photo-279906.jpeg?auto=compress&w=600',
  light:     'https://images.pexels.com/photos/1040160/pexels-photo-1040160.jpeg?auto=compress&w=600',
  mic:       'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&w=600',
  drone:     'https://images.pexels.com/photos/1087180/pexels-photo-1087180.jpeg?auto=compress&w=600',
  monitor:   'https://images.pexels.com/photos/1714207/pexels-photo-1714207.jpeg?auto=compress&w=600',
  slider:    'https://images.pexels.com/photos/1983037/pexels-photo-1983037.jpeg?auto=compress&w=600',
  teradek:   'https://images.pexels.com/photos/3062541/pexels-photo-3062541.jpeg?auto=compress&w=600',
  gopro:     'https://images.pexels.com/photos/1697912/pexels-photo-1697912.jpeg?auto=compress&w=600',
  osmo:      'https://images.pexels.com/photos/2510428/pexels-photo-2510428.jpeg?auto=compress&w=600',
  insta:     'https://images.pexels.com/photos/279906/pexels-photo-279906.jpeg?auto=compress&w=600',
  mavic:     'https://images.pexels.com/photos/1087180/pexels-photo-1087180.jpeg?auto=compress&w=600',
  app:       'https://images.pexels.com/photos/1983037/pexels-photo-1983037.jpeg?auto=compress&w=400',
  immo:      'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&w=1200',
}

type Badge = 'verified' | 'diamond' | 'certified' | 'both'

interface Item {
  id: string; brand: string; title: string; price: number
  location: string; image: string; badge: Badge
  tags?: string[]; cta?: 'request'
}

/* ─── DATA ──────────────────────────────────────────────── */
const mirrorless: Item[] = [
  { id:'m1', brand:'Sony',  title:'Sony Alpha a7R V Mirrorless', price:28500, location:'Souissi, Rabat',  image:I.sony,  badge:'both' },
  { id:'m2', brand:'Canon', title:'Canon EOS R5',                price:38900, location:'Hay Riad, Rabat', image:I.canon, badge:'verified' },
]

const optics: Item[] = [
  { id:'o1', brand:'Sony',   title:'Sony FE 50mm f/1.2 GM Lens',     price:24500, location:'Souissi, Rabat',  image:I.lens1,  badge:'verified' },
  { id:'o2', brand:'Canon',  title:'Canon RF 70-200mm f/2.8L IS USM', price:32800, location:'Agdal, Rabat',    image:I.lens2,  badge:'certified' },
  { id:'o3', brand:'Nikon',  title:'Nikon NIKKOR Z 85mm f/1.2 S',     price:31200, location:'Hay Riad, Rabat', image:I.lens3,  badge:'verified' },
  { id:'o4', brand:'DJI',    title:'DJI RS 4 Pro Gimbal Stabilizer',  price:9400,  location:'Casablanca',      image:I.gimbal, badge:'diamond' },
]

const cineGear: Item[] = [
  { id:'c1', brand:'RED',       title:'RED Komodo 6K Production Rig',  price:115000, location:'Casablanca',      image:I.red,    badge:'both',  tags:['CINEMA GEAR','PRO RIG'],    cta:'request' },
  { id:'c2', brand:'Manfrotto', title:'Carbon Fiber Precision Tripod', price:12400,  location:'Rabat',            image:I.tripod, badge:'certified', tags:['STABILITY','CARBON'], cta:'request' },
]

const cinema: Item[] = [
  { id:'v1', brand:'Arri',       title:'Arri Alexa 35 Cinema Body',     price:1250000, location:'Casablanca', image:I.arri,  badge:'both' },
  { id:'v2', brand:'Panavision', title:'Panavision Anamorphic Prime',   price:450000,  location:'Rabat',      image:I.pana,  badge:'verified' },
  { id:'v3', brand:'Aputure',    title:'Aputure 600d Pro LED Light',    price:32500,   location:'Tangier',    image:I.light, badge:'verified' },
  { id:'v4', brand:'Sennheiser', title:'Sennheiser MKH 416 Mic Rig',   price:15400,   location:'Marrakech',  image:I.mic,   badge:'verified' },
]

const grip: Item[] = [
  { id:'g1', brand:'DJI',     title:'DJI Inspire 3 Cinema Drone',        price:185000, location:'Casablanca', image:I.drone,   badge:'both' },
  { id:'g2', brand:'SmallHD', title:'SmallHD 703 UltraBright Monitor',   price:28900,  location:'Rabat',      image:I.monitor, badge:'verified' },
  { id:'g3', brand:'Kessler', title:'Kessler Crane Motorized Slider',    price:42000,  location:'Marrakech',  image:I.slider,  badge:'verified' },
  { id:'g4', brand:'Teradek', title:'Teradek Bolt 6 XT Wireless Video',  price:95000,  location:'Casablanca', image:I.teradek, badge:'verified' },
]

const action: Item[] = [
  { id:'a1', brand:'GoPro',   title:'Premium 8K Adventure Action Camera', price:4200,  location:'Harhoura, Rabat', image:I.gopro, badge:'verified' },
  { id:'a2', brand:'DJI',     title:'DJI Osmo Action 4',                  price:3800,  location:'Temara',          image:I.osmo,  badge:'verified' },
  { id:'a3', brand:'Insta360',title:'Insta360 X3 Waterproof',             price:5200,  location:'Rabat',           image:I.insta, badge:'verified' },
  { id:'a4', brand:'DJI',     title:'DJI Mavic 3 Pro Drone',              price:22500, location:'Harhoura',        image:I.mavic, badge:'verified' },
]

/* ─── BADGE ─────────────────────────────────────────────── */
function BadgePill({ badge }: { badge: Badge }) {
  const pills = []
  if (badge === 'verified' || badge === 'both')
    pills.push(<span key="v" style={{ backgroundColor:'#2dd4bf', color:'white', fontSize:'10px', fontWeight:700, padding:'4px 10px', borderRadius:'100px', letterSpacing:'0.05em', textTransform:'uppercase' as const }}>Verified</span>)
  if (badge === 'diamond' || badge === 'both')
    pills.push(<span key="d" style={{ backgroundColor:'#ffdcc0', color:'#2d1600', fontSize:'10px', fontWeight:700, padding:'4px 10px', borderRadius:'100px', display:'flex', alignItems:'center', gap:'3px', letterSpacing:'0.05em', textTransform:'uppercase' as const }}>◆ Diamond</span>)
  if (badge === 'certified')
    pills.push(<span key="c" style={{ backgroundColor:'rgba(221,228,225,0.88)', backdropFilter:'blur(8px)', color:'#3c4a46', fontSize:'10px', fontWeight:700, padding:'4px 10px', borderRadius:'100px', border:'1px solid rgba(255,255,255,0.25)' }}>Certified</span>)
  return <div style={{ display:'flex', gap:'6px', flexWrap:'wrap' as const }}>{pills}</div>
}

/* ─── SQUARE CARD ───────────────────────────────────────── */
function CamCard({ item }: { item: Item }) {
  const [saved, setSaved] = useState(false)
  const [hov, setHov] = useState(false)
  return (
    <div onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{ backgroundColor:'white', borderRadius:'40px', overflow:'hidden', border:'1px solid rgba(186,202,197,0.25)', boxShadow: hov?'0 20px 40px rgba(0,0,0,0.1)':'0 2px 8px rgba(0,0,0,0.04)', transition:'all 0.3s', display:'flex', flexDirection:'column' as const, cursor:'pointer' }}>
      <div style={{ position:'relative', aspectRatio:'1/1', overflow:'hidden' }}>
        <img src={item.image} alt={item.title} style={{ width:'100%', height:'100%', objectFit:'cover', transition:'transform 0.5s', transform:hov?'scale(1.1)':'scale(1)' }} />
        <div style={{ position:'absolute', top:'14px', left:'14px', zIndex:10 }}><BadgePill badge={item.badge} /></div>
        <button onClick={e=>{e.stopPropagation();setSaved(!saved)}} style={{ position:'absolute', top:'12px', right:'12px', zIndex:10, width:'32px', height:'32px', borderRadius:'50%', backgroundColor:'rgba(255,255,255,0.85)', backdropFilter:'blur(8px)', border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}>
          <Heart size={15} fill={saved?'#ef4444':'none'} color={saved?'#ef4444':'#ba1a1a'} />
        </button>
      </div>
      <div style={{ padding:'24px' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'8px' }}>
          <span style={{ fontSize:'10px', fontWeight:700, color:'#6b7a76', textTransform:'uppercase' as const, letterSpacing:'0.15em' }}>{item.brand}</span>
          <span style={{ fontSize:'18px', fontWeight:700, color:'#2dd4bf' }}>{item.price.toLocaleString()} MAD</span>
        </div>
        <h4 style={{ fontSize:'18px', fontWeight:700, color:hov?'#2dd4bf':'#161d1b', marginBottom:'8px', lineHeight:1.3, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' as const, transition:'color 0.2s' }}>{item.title}</h4>
        <p style={{ fontSize:'13px', color:'#6b7a76', display:'flex', alignItems:'center', gap:'4px', marginBottom:'16px' }}>
          <MapPin size={14} color="#2dd4bf" /> {item.location}
        </p>
        {item.tags && (
          <div style={{ display:'flex', gap:'8px', marginBottom:'20px' }}>
            {item.tags.map(tag=><span key={tag} style={{ backgroundColor:'#e8efec', padding:'4px 10px', borderRadius:'100px', fontSize:'9px', fontWeight:700, textTransform:'uppercase' as const, color:'#3c4a46', letterSpacing:'0.08em' }}>{tag}</span>)}
          </div>
        )}
        {item.cta === 'request'
          ? <button style={{ width:'100%', backgroundColor:'#2dd4bf', color:'white', border:'none', padding:'12px', borderRadius:'100px', fontSize:'13px', fontWeight:700, cursor:'pointer', transition:'filter 0.15s' }}
              onMouseEnter={e=>e.currentTarget.style.filter='brightness(1.1)'}
              onMouseLeave={e=>e.currentTarget.style.filter='brightness(1)'}
            >Request Details</button>
          : <div style={{ display:'flex', gap:'8px' }}>
              <button style={{ flex:1, padding:'10px', borderRadius:'100px', border:'1px solid #2dd4bf', backgroundColor:'transparent', color:'#2dd4bf', fontSize:'13px', fontWeight:700, cursor:'pointer', transition:'background 0.15s' }}
                onMouseEnter={e=>e.currentTarget.style.backgroundColor='rgba(0,107,95,0.05)'}
                onMouseLeave={e=>e.currentTarget.style.backgroundColor='transparent'}
              >Message</button>
              <button style={{ flex:1, padding:'10px', borderRadius:'100px', backgroundColor:'#25D366', color:'white', border:'none', fontSize:'13px', fontWeight:700, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', gap:'4px', transition:'filter 0.15s' }}
                onMouseEnter={e=>e.currentTarget.style.filter='brightness(1.08)'}
                onMouseLeave={e=>e.currentTarget.style.filter='brightness(1)'}
              >💬 WhatsApp</button>
            </div>
        }
      </div>
    </div>
  )
}

/* ─── SECTION HEADER ────────────────────────────────────── */
function SectionHeader({ title, sub }: { title: string; sub?: string }) {
  return (
    <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:'28px' }}>
      <div>
        <h3 style={{ fontSize:'24px', fontWeight:600, color:'#161d1b', letterSpacing:'-0.01em', marginBottom: sub?'4px':'0' }}>{title}</h3>
        {sub && <p style={{ fontSize:'16px', color:'#6b7a76' }}>{sub}</p>}
      </div>
      <a href="#" style={{ fontSize:'13px', fontWeight:700, color:'#2dd4bf', textDecoration:'none' }}
        onMouseEnter={e=>e.currentTarget.style.textDecoration='underline'}
        onMouseLeave={e=>e.currentTarget.style.textDecoration='none'}
      >View All</a>
    </div>
  )
}

/* ─── PAGE ──────────────────────────────────────────────── */
export default function CamerasPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = React.use(params)
  const [activeBrand, setActiveBrand] = useState('All Brands')
  const [activeSeller, setActiveSeller] = useState('All Sellers')
  const [diamondFirst, setDiamondFirst] = useState(true)
  const [keyword, setKeyword] = useState('')
  const brands = ['All Brands','Sony','Canon','Nikon','DJI','Fujifilm','Panasonic','Leica']

  return (
    <div style={{ fontFamily:'Hanken Grotesk, Inter, sans-serif', backgroundColor:'#f4fbf8', minHeight:'100vh', color:'#161d1b' }}>

      {/* ── HERO ── */}
      <section style={{ position:'relative', width:'100%', height:'400px', display:'flex', alignItems:'center', justifyContent:'center', overflow:'hidden', marginBottom:'64px' }}>
        <img src={I.hero} alt="Camera Showroom" style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover', filter:'brightness(0.75)' }} />
        <div style={{ position:'relative', zIndex:10, width:'100%', maxWidth:'860px', padding:'0 40px', display:'flex', flexDirection:'column' as const, alignItems:'center' }}>
          <h2 style={{ fontSize:'48px', fontWeight:700, color:'white', marginBottom:'28px', textAlign:'center', letterSpacing:'-0.02em', lineHeight:1.1, textShadow:'0 2px 16px rgba(0,0,0,0.3)' }}>
            Elite Imaging Equipment.<br />
            <span style={{ color:'#62fae3' }}>Premium Visionaries in Rabat.</span>
          </h2>
          <div style={{ width:'100%', backgroundColor:'rgba(22,29,27,0.12)', backdropFilter:'blur(12px)', border:'1px solid rgba(255,255,255,0.22)', borderRadius:'100px', padding:'6px' }}>
            <div style={{ display:'flex', alignItems:'center', backgroundColor:'rgba(255,255,255,0.12)', backdropFilter:'blur(12px)', border:'1px solid rgba(255,255,255,0.22)', borderRadius:'100px', padding:'6px 24px' }}>
              <Search size={20} color="rgba(255,255,255,0.75)" style={{ marginRight:'12px', flexShrink:0 }} />
              <input type="text" value={keyword} onChange={e=>setKeyword(e.target.value)} placeholder="Search for premium cameras, lenses, or filmmaking gear..."
                style={{ flex:1, backgroundColor:'transparent', border:'none', outline:'none', fontSize:'16px', fontFamily:'Hanken Grotesk, sans-serif', color:'white', padding:'10px 0' }}
              />
              <button style={{ backgroundColor:'#2dd4bf', color:'white', border:'none', padding:'12px 32px', borderRadius:'100px', fontWeight:700, fontSize:'14px', cursor:'pointer', marginLeft:'12px', transition:'filter 0.15s' }}
                onMouseEnter={e=>e.currentTarget.style.filter='brightness(1.1)'}
                onMouseLeave={e=>e.currentTarget.style.filter='brightness(1)'}
              >Search</button>
            </div>
          </div>
        </div>
      </section>

      {/* ── ADVANCED FILTER BAR ── */}
      <div style={{ maxWidth:'1280px', margin:'-40px auto 48px', padding:'0 40px', position:'relative', zIndex:20 }}>
        <div style={{ backgroundColor:'rgba(255,255,255,0.85)', backdropFilter:'blur(20px)', border:'1px solid rgba(255,255,255,0.25)', borderRadius:'100px', boxShadow:'0 20px 60px rgba(0,0,0,0.07)', display:'flex', alignItems:'center', padding:'6px' }}>
          {[
            { label:'City',          val:'Rabat',             type:'select' },
            { label:'Keyword',       val:'Search premium cameras...', type:'input' },
            { label:'Neighborhood',  val:'Enter location',    type:'loc' },
            { label:'Price (MAD)',   val:'Select',            type:'select' },
            { label:'Filters',       val:'1 filter selected', type:'tune', highlight:true },
          ].map((f,i,arr)=>(
            <React.Fragment key={f.label}>
              <div style={{ flex: f.type==='input' ? 2 : 1, padding:'8px 20px', borderRight: i<arr.length-1 ? '1px solid rgba(186,202,197,0.3)':'none', cursor: f.type!=='input'?'pointer':'default' }}>
                <div style={{ fontSize:'9px', fontWeight:700, textTransform:'uppercase' as const, letterSpacing:'0.12em', color:'#6b7a76', marginBottom:'3px' }}>{f.label}</div>
                {f.type==='input'
                  ? <div style={{ display:'flex', alignItems:'center', gap:'8px' }}>
                      <input type="text" placeholder={f.val} style={{ flex:1, backgroundColor:'transparent', border:'none', outline:'none', fontSize:'16px', fontFamily:'Hanken Grotesk, sans-serif', color:'#161d1b' }} />
                      <Search size={18} color="#6b7a76" />
                    </div>
                  : f.type==='loc'
                  ? <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                      <span style={{ fontSize:'16px', color:'rgba(107,122,118,0.7)' }}>{f.val}</span>
                      <MapPin size={18} color="#6b7a76" />
                    </div>
                  : f.type==='tune'
                  ? <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                      <span style={{ fontSize:'16px', fontWeight:700, color:'#2dd4bf' }}>{f.val}</span>
                      <span style={{ fontSize:'18px' }}>🎚</span>
                    </div>
                  : <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                      <span style={{ fontSize:'16px', fontWeight: f.val==='Rabat'?700:400, color: f.val==='Rabat'?'#161d1b':'rgba(107,122,118,0.7)' }}>{f.val}</span>
                      <ChevronDown size={18} color="#2dd4bf" />
                    </div>
                }
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>

      <div style={{ maxWidth:'1280px', margin:'0 auto', padding:'0 40px' }}>

        {/* ── BREADCRUMB + TITLE ── */}
        <section style={{ marginBottom:'28px' }}>
          <nav style={{ display:'flex', alignItems:'center', gap:'6px', fontSize:'13px', color:'rgba(107,122,118,0.8)', marginBottom:'16px' }}>
            {['Home','Electronics','Cameras & Imaging'].map((c,i,arr)=>(
              <React.Fragment key={c}>
                {i<arr.length-1
                  ? <><a href="#" style={{ color:'rgba(107,122,118,0.8)', textDecoration:'none' }} onMouseEnter={e=>e.currentTarget.style.color='#2dd4bf'} onMouseLeave={e=>e.currentTarget.style.color='rgba(107,122,118,0.8)'}>{c}</a><span>›</span></>
                  : <span style={{ color:'#6b7a76' }}>{c}</span>
                }
              </React.Fragment>
            ))}
          </nav>

          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', gap:'16px', marginBottom:'16px', flexWrap:'wrap' as const }}>
            <div style={{ display:'flex', alignItems:'baseline', gap:'12px', flexWrap:'wrap' as const }}>
              <h2 style={{ fontSize:'24px', fontWeight:600, color:'#161d1b', letterSpacing:'-0.01em' }}>New and Used Cameras & Imaging for sale in Rabat</h2>
              <span style={{ fontSize:'16px', color:'#6b7a76' }}>• 4,597 Ads</span>
            </div>
            <div style={{ display:'flex', gap:'10px' }}>
              {[{icon:'↕', label:'Sort: Default'},{icon:'🔖', label:'Save Search'}].map(btn=>(
                <button key={btn.label} style={{ display:'flex', alignItems:'center', gap:'6px', padding:'8px 16px', borderRadius:'10px', backgroundColor:'#eef5f2', border:'none', cursor:'pointer', fontSize:'13px', fontWeight:700, color:'#161d1b', transition:'background 0.15s' }}
                  onMouseEnter={e=>e.currentTarget.style.backgroundColor='#e2eae7'}
                  onMouseLeave={e=>e.currentTarget.style.backgroundColor='#eef5f2'}
                >{btn.icon} {btn.label}</button>
              ))}
            </div>
          </div>

          {/* Brand pills */}
          <div style={{ display:'flex', gap:'10px', overflowX:'auto' as const, paddingBottom:'8px', marginBottom:'14px' }}>
            {brands.map(brand=>(
              <button key={brand} onClick={()=>setActiveBrand(brand)}
                style={{ whiteSpace:'nowrap' as const, padding:'9px 22px', borderRadius:'100px', fontSize:'13px', fontWeight:700, border:'1px solid', cursor:'pointer', transition:'all 0.15s',
                  backgroundColor: activeBrand===brand ? '#2dd4bf' : '#e8efec',
                  color: activeBrand===brand ? '#0f9b8e' : '#6b7a76',
                  borderColor: activeBrand===brand ? '#2dd4bf' : 'rgba(186,202,197,0.3)',
                }}
              >{brand}</button>
            ))}
            <button style={{ width:'40px', height:'40px', flexShrink:0, borderRadius:'50%', backgroundColor:'#e8efec', border:'1px solid rgba(186,202,197,0.3)', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', color:'#2dd4bf', fontSize:'20px', fontWeight:700 }}>+</button>
          </div>

          {/* Seller toggles + diamond */}
          <div style={{ display:'flex', alignItems:'center', gap:'10px', flexWrap:'wrap' as const }}>
            {['All Sellers','SouKni Members','SouKni Pro'].map(tab=>(
              <button key={tab} onClick={()=>setActiveSeller(tab)}
                style={{ padding:'8px 20px', borderRadius:'10px', fontSize:'13px', fontWeight:700, cursor:'pointer', transition:'all 0.15s', border:'1px solid',
                  backgroundColor: activeSeller===tab ? '#2dd4bf' : 'transparent',
                  color: activeSeller===tab ? 'white' : '#6b7a76',
                  borderColor: activeSeller===tab ? '#2dd4bf' : 'rgba(186,202,197,0.4)',
                }}
              >{tab}</button>
            ))}
            <div style={{ marginLeft:'auto', display:'flex', alignItems:'center', gap:'10px', backgroundColor:'#eef5f2', border:'1px solid rgba(186,202,197,0.3)', padding:'8px 16px', borderRadius:'10px', cursor:'pointer' }} onClick={()=>setDiamondFirst(!diamondFirst)}>
              <span style={{ fontSize:'13px', fontWeight:700, color:'#6b7a76', whiteSpace:'nowrap' as const }}>Show Diamond Verified First</span>
              <div style={{ width:'44px', height:'24px', borderRadius:'100px', backgroundColor: diamondFirst?'#2dd4bf':'#bacac5', position:'relative', transition:'background 0.25s', flexShrink:0 }}>
                <div style={{ position:'absolute', top:'2px', left: diamondFirst?'22px':'2px', width:'20px', height:'20px', borderRadius:'50%', backgroundColor:'white', transition:'left 0.25s' }} />
              </div>
            </div>
          </div>
        </section>

        {/* ── PROFESSIONAL MIRRORLESS ── */}
        <section style={{ marginBottom:'64px' }}>
          <SectionHeader title="Professional Mirrorless Selection" />
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 2fr', gap:'16px' }}>
            {mirrorless.map(item=><CamCard key={item.id} item={item} />)}
            {/* Concierge panel */}
            <div style={{ position:'relative', borderRadius:'40px', overflow:'hidden', cursor:'pointer' }}>
              <img src={I.film} alt="Pro Filmmaking Concierge" style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover', transition:'transform 0.7s' }}
                onMouseEnter={e=>e.currentTarget.style.transform='scale(1.05)'}
                onMouseLeave={e=>e.currentTarget.style.transform='scale(1)'}
              />
              <div style={{ position:'absolute', inset:0, background:'linear-gradient(180deg, rgba(22,29,27,0.75) 0%, rgba(22,29,27,0.2) 100%)' }} />
              <div style={{ position:'relative', height:'100%', display:'flex', flexDirection:'column' as const, justifyContent:'flex-end', padding:'32px' }}>
                <div style={{ backgroundColor:'rgba(255,255,255,0.88)', backdropFilter:'blur(20px)', border:'1px solid rgba(255,255,255,0.3)', borderRadius:'40px', padding:'28px 32px' }}>
                  <h3 style={{ fontSize:'24px', fontWeight:600, color:'#2dd4bf', marginBottom:'10px' }}>Pro Filmmaking Concierge</h3>
                  <p style={{ fontSize:'16px', color:'#6b7a76', marginBottom:'20px', lineHeight:1.6 }}>Whether you're offloading premium gear or hunting for a rare cinematic setup, our expert agents handle the sourcing and verification for you.</p>
                  <div style={{ display:'flex', gap:'12px', flexWrap:'wrap' as const }}>
                    <button style={{ backgroundColor:'#2dd4bf', color:'#0f9b8e', border:'none', padding:'12px 24px', borderRadius:'100px', fontWeight:700, fontSize:'13px', cursor:'pointer', transition:'filter 0.15s' }}
                      onMouseEnter={e=>e.currentTarget.style.filter='brightness(1.08)'}
                      onMouseLeave={e=>e.currentTarget.style.filter='brightness(1)'}
                    >Post Your Gear</button>
                    <button style={{ border:'2px solid #2dd4bf', color:'#2dd4bf', backgroundColor:'transparent', padding:'12px 24px', borderRadius:'100px', fontWeight:700, fontSize:'13px', cursor:'pointer' }}>Request Sourcing</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── IMMO PRO BANNER ── */}
        <section style={{ marginBottom:'64px' }}>
          <div style={{ position:'relative', borderRadius:'40px', overflow:'hidden', height:'380px', display:'flex', alignItems:'center', padding:'48px', cursor:'pointer', boxShadow:'0 20px 60px rgba(0,0,0,0.15)' }}>
            <img src={I.immo} alt="SouKni Immo Pro" style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover', filter:'brightness(0.42)', transition:'transform 0.7s' }}
              onMouseEnter={e=>e.currentTarget.style.transform='scale(1.05)'}
              onMouseLeave={e=>e.currentTarget.style.transform='scale(1)'}
            />
            <div style={{ position:'absolute', inset:0, background:'linear-gradient(to right, rgba(0,0,0,0.62), transparent)' }} />
            <div style={{ position:'relative', zIndex:1, maxWidth:'480px' }}>
              <div style={{ fontSize:'13px', fontWeight:700, color:'#2dd4bf', textTransform:'uppercase' as const, letterSpacing:'0.15em', marginBottom:'16px' }}>SouKni Immo Pro</div>
              <h3 style={{ fontSize:'36px', fontWeight:700, color:'white', marginBottom:'24px', lineHeight:1.2, letterSpacing:'-0.02em', textShadow:'0 2px 8px rgba(0,0,0,0.3)' }}>List your property where the elite browse.</h3>
              <button style={{ backgroundColor:'white', color:'#2dd4bf', border:'none', padding:'14px 32px', borderRadius:'100px', fontWeight:700, fontSize:'14px', cursor:'pointer', boxShadow:'0 8px 24px rgba(0,0,0,0.15)', transition:'all 0.2s' }}
                onMouseEnter={e=>{e.currentTarget.style.backgroundColor='#2dd4bf';e.currentTarget.style.color='#0f9b8e'}}
                onMouseLeave={e=>{e.currentTarget.style.backgroundColor='white';e.currentTarget.style.color='#2dd4bf'}}
              >Explore Properties</button>
            </div>
          </div>
        </section>

        {/* ── PRO OPTICS ── */}
        <section style={{ marginBottom:'64px' }}>
          <SectionHeader title="Pro Optics & Stabilizers" sub="Elite glass and precision control for every shot." />
          <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'16px' }}>
            {optics.map(item=><CamCard key={item.id} item={item} />)}
          </div>
        </section>

        {/* ── CINEMATIC GEAR ── */}
        <section style={{ marginBottom:'64px' }}>
          <SectionHeader title="Cinematic Filmmaking Gear" />
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 2fr', gap:'16px' }}>
            {cineGear.map(item=><CamCard key={item.id} item={item} />)}
            {/* Concierge panel 2 */}
            <div style={{ position:'relative', borderRadius:'40px', overflow:'hidden', cursor:'pointer' }}>
              <img src={I.film} alt="Pro Filmmaking" style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover' }} />
              <div style={{ position:'absolute', inset:0, backgroundColor:'rgba(0,0,0,0.32)', backdropFilter:'blur(2px)' }} />
              <div style={{ position:'relative', height:'100%', display:'flex', alignItems:'center', justifyContent:'center', padding:'32px' }}>
                <div style={{ backgroundColor:'rgba(255,255,255,0.88)', backdropFilter:'blur(20px)', border:'1px solid rgba(255,255,255,0.3)', borderRadius:'40px', padding:'32px', textAlign:'center' as const, maxWidth:'340px', boxShadow:'0 20px 40px rgba(0,0,0,0.15)' }}>
                  <h3 style={{ fontSize:'24px', fontWeight:600, color:'#2dd4bf', marginBottom:'12px' }}>Pro Filmmaking Concierge</h3>
                  <p style={{ fontSize:'16px', color:'#6b7a76', marginBottom:'24px', lineHeight:1.6 }}>Whether you're offloading premium gear or hunting for a rare cinematic setup, our expert agents handle the sourcing and verification for you.</p>
                  <div style={{ display:'flex', justifyContent:'center', gap:'12px', flexWrap:'wrap' as const }}>
                    <button style={{ backgroundColor:'#2dd4bf', color:'#0f9b8e', border:'none', padding:'12px 24px', borderRadius:'100px', fontWeight:700, fontSize:'13px', cursor:'pointer' }}>Post Your Gear</button>
                    <button style={{ border:'2px solid #2dd4bf', color:'#2dd4bf', backgroundColor:'transparent', padding:'12px 24px', borderRadius:'100px', fontWeight:700, fontSize:'13px', cursor:'pointer' }}>Request Sourcing</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── CINEMA & VIDEO ── */}
        <section style={{ marginBottom:'64px' }}>
          <SectionHeader title="Cinema & Video Production" />
          <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'16px' }}>
            {cinema.map(item=><CamCard key={item.id} item={item} />)}
          </div>
        </section>

        {/* ── GRIP & MONITORING ── */}
        <section style={{ marginBottom:'64px' }}>
          <SectionHeader title="Advanced Grip & Monitoring" />
          <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'16px' }}>
            {grip.map(item=><CamCard key={item.id} item={item} />)}
          </div>
        </section>

        {/* ── DIAMOND BANNER ── */}
        <section style={{ marginBottom:'64px' }}>
          <div style={{ position:'relative', borderRadius:'40px', overflow:'hidden', padding:'48px', display:'flex', alignItems:'center', justifyContent:'space-between', background:'linear-gradient(135deg, #2dd4bf 0%, #2dd4bf 100%)', boxShadow:'0 20px 60px rgba(0,107,95,0.3)', gap:'32px' }}>
            <div style={{ maxWidth:'560px' }}>
              <div style={{ display:'flex', alignItems:'center', gap:'8px', color:'rgba(255,255,255,0.82)', fontWeight:700, marginBottom:'16px', fontSize:'13px', textTransform:'uppercase' as const, letterSpacing:'0.1em' }}>
                ◆ Exclusive Privilege
              </div>
              <h3 style={{ fontSize:'36px', fontWeight:700, color:'white', marginBottom:'20px', letterSpacing:'-0.02em', lineHeight:1.2 }}>Unlock the Power of Diamond Membership.</h3>
              <p style={{ fontSize:'18px', color:'rgba(255,255,255,0.9)', marginBottom:'28px', lineHeight:1.7 }}>Priority placement, verified trust status, and direct WhatsApp marketing tools to sell 5x faster in the Rabat premium market.</p>
              <div style={{ display:'flex', gap:'14px', flexWrap:'wrap' as const }}>
                <button style={{ backgroundColor:'white', color:'#2dd4bf', border:'none', padding:'16px 36px', borderRadius:'100px', fontWeight:900, fontSize:'14px', cursor:'pointer', transition:'transform 0.2s' }}
                  onMouseEnter={e=>e.currentTarget.style.transform='scale(1.04)'}
                  onMouseLeave={e=>e.currentTarget.style.transform='scale(1)'}
                >Get Diamond Status</button>
                <button style={{ backgroundColor:'rgba(255,255,255,0.15)', backdropFilter:'blur(8px)', border:'1px solid rgba(255,255,255,0.25)', color:'white', padding:'16px 36px', borderRadius:'100px', fontWeight:700, fontSize:'14px', cursor:'pointer', transition:'background 0.2s' }}
                  onMouseEnter={e=>e.currentTarget.style.backgroundColor='rgba(255,255,255,0.22)'}
                  onMouseLeave={e=>e.currentTarget.style.backgroundColor='rgba(255,255,255,0.15)'}
                >Learn More</button>
              </div>
            </div>
            <div style={{ position:'relative', width:'280px', height:'280px', flexShrink:0, display:'flex', alignItems:'center', justifyContent:'center' }}>
              <div style={{ position:'absolute', inset:0, backgroundColor:'rgba(255,255,255,0.08)', borderRadius:'50%', animation:'pulse 2s infinite' }} />
              <div style={{ width:'200px', height:'200px', backgroundColor:'rgba(45,212,191,0.3)', borderRadius:'40px', transform:'rotate(12deg)', border:'4px solid rgba(255,255,255,0.2)', display:'flex', alignItems:'center', justifyContent:'center' }}>
                <span style={{ fontSize:'80px' }}>◆</span>
              </div>
            </div>
          </div>
        </section>

        {/* ── ACTION & ADVENTURE ── */}
        <section style={{ marginBottom:'80px' }}>
          <SectionHeader title="Action & Adventure Capture" />
          <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'16px' }}>
            {action.map(item=><CamCard key={item.id} item={item} />)}
          </div>
        </section>

      </div>

      {/* ── JOIN SOUKNI FAMILY ── */}
      <section style={{ position:'relative', overflow:'hidden', marginBottom:'64px' }}>
        <div style={{ maxWidth:'1280px', margin:'0 auto', padding:'0 40px' }}>
          <div style={{ position:'relative', borderRadius:'40px', overflow:'hidden', backgroundColor:'#2dd4bf', minHeight:'480px', display:'flex', alignItems:'center', justifyContent:'space-between', padding:'64px', gap:'48px' }}>
            <div style={{ maxWidth:'480px', position:'relative', zIndex:1 }}>
              <h2 style={{ fontSize:'48px', fontWeight:700, color:'white', marginBottom:'16px', letterSpacing:'-0.02em', lineHeight:1.1 }}>Join the<br />SouKni Family</h2>
              <p style={{ fontSize:'18px', color:'rgba(255,255,255,0.9)', marginBottom:'36px', lineHeight:1.7, maxWidth:'400px' }}>Download our premium mobile experience for real-time alerts and exclusive marketplace deals.</p>
              <div style={{ display:'flex', gap:'14px', flexWrap:'wrap' as const }}>
                {[{icon:'📱',store:'App Store',sub:'Download on the'},{icon:'🤖',store:'Google Play',sub:'Get it on'}].map(app=>(
                  <a key={app.store} href="#" style={{ display:'flex', alignItems:'center', gap:'12px', backgroundColor:'#0f172a', color:'white', padding:'12px 22px', borderRadius:'14px', textDecoration:'none', transition:'filter 0.15s', boxShadow:'0 8px 24px rgba(0,0,0,0.2)' }}
                    onMouseEnter={e=>e.currentTarget.style.filter='brightness(1.15)'}
                    onMouseLeave={e=>e.currentTarget.style.filter='brightness(1)'}
                  >
                    <span style={{ fontSize:'28px' }}>{app.icon}</span>
                    <div>
                      <div style={{ fontSize:'9px', fontWeight:700, opacity:0.6, textTransform:'uppercase' as const, letterSpacing:'0.1em' }}>{app.sub}</div>
                      <div style={{ fontSize:'15px', fontWeight:700 }}>{app.store}</div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
            <div style={{ position:'relative', flexShrink:0 }}>
              <div style={{ width:'280px', height:'480px', position:'relative', transform:'translateY(20px)' }}>
                <img src={I.app} alt="SouKni App" style={{ width:'100%', height:'100%', objectFit:'cover', borderRadius:'32px', boxShadow:'0 32px 80px rgba(0,0,0,0.25)' }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
    </div>
  )
}
