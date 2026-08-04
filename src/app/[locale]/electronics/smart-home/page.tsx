'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { Heart, Search, MapPin, SlidersHorizontal, ChevronRight, Diamond, MessageCircle } from 'lucide-react'
import { useMarket } from '@/context/MarketContext'

const C = { mint:'#22d4a8', mintDk:'#0f9b8e', ink:'#161d1b', surface:'#f4fbf8', muted:'#6b7a76' }
const UB = { fontFamily:"'Inter',sans-serif", fontWeight:900, letterSpacing:'-0.05em' } as const
const HK = { fontFamily:"'Hanken Grotesk',sans-serif", fontWeight:900, letterSpacing:'-0.03em' } as const

type Badge = 'diamond' | 'certified' | 'pro' | null
interface Listing { id:string; title:string; price:number; location:string; time:string; image:string; badge:Badge; brand:string }

const IMGS = {
  hero:    'https://images.pexels.com/photos/1090638/pexels-photo-1090638.jpeg?auto=compress&w=1600',
  hub:     'https://images.pexels.com/photos/1090638/pexels-photo-1090638.jpeg?auto=compress&w=600',
  bulb:    'https://images.pexels.com/photos/1090638/pexels-photo-1090638.jpeg?auto=compress&w=600',
  cam:     'https://images.pexels.com/photos/892522/pexels-photo-892522.jpeg?auto=compress&w=600',
  speaker: 'https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&w=600',
  plug:    'https://images.pexels.com/photos/4526407/pexels-photo-4526407.jpeg?auto=compress&w=600',
  thermo:  'https://images.pexels.com/photos/1090638/pexels-photo-1090638.jpeg?auto=compress&w=600',
  lock:    'https://images.pexels.com/photos/892522/pexels-photo-892522.jpeg?auto=compress&w=600',
  immo:    'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&w=1200',
}

const featuredListings: Listing[] = [
  { id:'sh1', badge:'diamond',  title:'Amazon Echo Show 10 Smart Hub',       price:2400, location:'Rabat, Agdal',    time:'Just now', image:IMGS.hub,     brand:'Amazon' },
  { id:'sh2', badge:'pro',      title:'Philips Hue Starter Kit 4 Bulbs',     price:1650, location:'Rabat, Souissi',  time:'1h ago',   image:IMGS.bulb,    brand:'Philips' },
  { id:'sh3', badge:'diamond',  title:'Ring Video Doorbell Pro 2',           price:1950, location:'Rabat, Hassan',   time:'2h ago',   image:IMGS.cam,     brand:'Ring' },
  { id:'sh4', badge:'certified',title:'Google Nest Learning Thermostat',     price:2100, location:'Rabat, Hay Riad', time:'3h ago',   image:IMGS.thermo,  brand:'Google Nest' },
]

const exclusiveListings: Listing[] = [
  { id:'x1', badge:'diamond',  title:'Sonos One SL Smart Speaker',           price:1750, location:'Rabat, Agdal',    time:'Just now', image:IMGS.speaker, brand:'Sonos' },
  { id:'x2', badge:'certified',title:'TP-Link Kasa Smart Plug 4-Pack',       price:520,  location:'Rabat, Center',   time:'1h ago',   image:IMGS.plug,    brand:'TP-Link' },
  { id:'x3', badge:'pro',      title:'August Smart Lock Pro',                price:1850, location:'Casablanca',      time:'2h ago',   image:IMGS.lock,    brand:'August' },
  { id:'x4', badge:'certified',title:'Arlo Pro 4 Security Camera System',    price:3400, location:'Rabat, Souissi',  time:'3h ago',   image:IMGS.cam,     brand:'Arlo' },
]

const discoveryListings: Listing[] = [
  { id:'d1',  badge:'diamond',  title:'Amazon Echo Dot 5th Gen',             price:450,  location:'Rabat Center',   time:'Just now', image:IMGS.hub,     brand:'Amazon' },
  { id:'d2',  badge:'certified',title:'Philips Hue Smart Bulb Single',       price:280,  location:'Rabat Center',   time:'1h ago',   image:IMGS.bulb,    brand:'Philips' },
  { id:'d3',  badge:'pro',      title:'Ring Stick Up Cam Battery',           price:1100, location:'Rabat, Agdal',   time:'2h ago',   image:IMGS.cam,     brand:'Ring' },
  { id:'d4',  badge:'diamond',  title:'Google Nest Mini Smart Speaker',      price:390,  location:'Salé',           time:'3h ago',   image:IMGS.speaker, brand:'Google Nest' },
  { id:'d5',  badge:'certified',title:'TP-Link Tapo Smart Camera',           price:480,  location:'Casablanca',     time:'4h ago',   image:IMGS.cam,     brand:'TP-Link' },
  { id:'d6',  badge:'diamond',  title:'August Wi-Fi Smart Lock',             price:1650, location:'Rabat',          time:'5h ago',   image:IMGS.lock,    brand:'August' },
  { id:'d7',  badge:'pro',      title:'Ecobee Smart Thermostat Premium',     price:1950, location:'Marrakech',      time:'6h ago',   image:IMGS.thermo,  brand:'Ecobee' },
  { id:'d8',  badge:'certified',title:'Sonos Roam Portable Smart Speaker',   price:1450, location:'Tangier',        time:'7h ago',   image:IMGS.speaker, brand:'Sonos' },
  { id:'d9',  badge:'diamond',  title:'Arlo Essential Doorbell',             price:1200, location:'Casablanca',     time:'8h ago',   image:IMGS.cam,     brand:'Arlo' },
  { id:'d10', badge:'certified',title:'TP-Link Kasa Smart Dimmer Switch',    price:290,  location:'Rabat',          time:'9h ago',   image:IMGS.plug,    brand:'TP-Link' },
  { id:'d11', badge:'pro',      title:'Philips Hue Smart Light Strip',      price:650,  location:'Marrakech',      time:'10h ago',  image:IMGS.bulb,    brand:'Philips' },
  { id:'d12', badge:'diamond',  title:'Amazon Echo Show 8',                  price:1550, location:'Casablanca',     time:'11h ago',  image:IMGS.hub,     brand:'Amazon' },
]

const brands = [
  { name:'Amazon',      count:'620', image:IMGS.hub },
  { name:'Philips',     count:'480', image:IMGS.bulb },
  { name:'Ring',        count:'340', image:IMGS.cam },
  { name:'Google Nest', count:'410', image:IMGS.thermo },
  { name:'Sonos',       count:'290', image:IMGS.speaker },
  { name:'TP-Link',     count:'560', image:IMGS.plug },
  { name:'August',      count:'180', image:IMGS.lock },
]

const pills = ['All Smart Home','Smart Speakers','Smart Lighting','Security Cameras','Smart Locks','Thermostats','Smart Plugs']
const pillSlugs: Record<string,string> = {
    'All Smart Home':'all-smart-home',
    'Smart Speakers':'smart-speakers',
    'Smart Lighting':'smart-lighting',
    'Security Cameras':'security-cameras',
    'Smart Locks':'smart-locks',
    'Thermostats':'thermostats',
    'Smart Plugs':'smart-plugs',
}

function CertifiedBadge({ type }: { type: Badge }) {
  if (!type) return null
  if (type === 'diamond') return (
    <span style={{ position:'absolute', top:10, left:10, zIndex:2, background:'linear-gradient(135deg,#22d4a8,#0f9b8e)', color:'white', fontSize:'8px', ...UB, letterSpacing:'0.06em', padding:'3px 10px', borderRadius:100, display:'inline-flex', alignItems:'center', gap:3 }}>
      <Diamond size={8} /> SOUKNI CERTIFIED
    </span>
  )
  return (
    <span style={{ position:'absolute', top:10, left:10, zIndex:2, backgroundColor:'rgba(255,255,255,0.92)', color:C.mint, fontSize:'8px', ...UB, letterSpacing:'0.06em', padding:'3px 10px', borderRadius:100 }}>
      ✓ CERTIFIED
    </span>
  )
}

function ListingCard({ item, locale, compact=false }: { item:Listing; locale:string; compact?:boolean }) {
  const [saved, setSaved] = useState(false)
  const [hov, setHov] = useState(false)
  const { formatPrice } = useMarket()
  return (
    <Link href={`/${locale}/listing/${item.id}`} style={{ textDecoration:'none', display:'block' }}>
      <article onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
        style={{ backgroundColor:'white', borderRadius:compact?20:28, overflow:'hidden', border:`1px solid ${hov?C.mint:'rgba(186,202,197,0.2)'}`, boxShadow:hov?'0 20px 48px rgba(0,0,0,0.12)':'0 2px 8px rgba(0,0,0,0.04)', transition:'all 0.3s', cursor:'pointer' }}>
        <div style={{ position:'relative', aspectRatio:'4/3', overflow:'hidden' }}>
          <img src={item.image} alt={item.title} style={{ width:'100%', height:'100%', objectFit:'cover', transition:'transform 0.5s', transform:hov?'scale(1.06)':'scale(1)' }} />
          <CertifiedBadge type={item.badge} />
          <button onClick={e=>{e.preventDefault();setSaved(!saved)}} style={{ position:'absolute', top:10, right:10, zIndex:2, width:30, height:30, borderRadius:'50%', backgroundColor:'rgba(255,255,255,0.15)', backdropFilter:'blur(8px)', border:'1px solid rgba(255,255,255,0.3)', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer' }}>
            <Heart size={13} color={saved?'#ef4444':'white'} fill={saved?'#ef4444':'none'} />
          </button>
        </div>
        <div style={{ padding:compact?'12px 14px':'16px 18px' }}>
          <p style={{ fontSize:9, ...UB, color:C.mint, textTransform:'uppercase' as const, letterSpacing:'0.08em', marginBottom:3 }}>{item.brand}</p>
          <p style={{ fontSize:10, color:C.muted, marginBottom:3, display:'flex', alignItems:'center', gap:3 }}><MapPin size={10} />{item.location} · {item.time}</p>
          <h4 style={{ ...HK, fontSize:compact?13:14, color:C.ink, marginBottom:6, lineHeight:1.3, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{item.title}</h4>
          <p style={{ ...HK, fontSize:compact?15:17, color:C.mint, marginBottom:10 }}>{formatPrice(item.price)}</p>
          <div style={{ display:'flex', gap:6 }}>
            <button onClick={e=>e.preventDefault()} style={{ flex:1, backgroundColor:'#eef5f2', color:'#3c4a46', border:'none', padding:'8px 0', borderRadius:100, fontWeight:700, fontSize:11, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', gap:4 }}>
              <MessageCircle size={11} /> Chat
            </button>
            <button onClick={e=>e.preventDefault()} style={{ flex:1, backgroundColor:'#25D366', color:'white', border:'none', padding:'8px 0', borderRadius:100, fontWeight:700, fontSize:11, cursor:'pointer' }}>WhatsApp</button>
          </div>
        </div>
      </article>
    </Link>
  )
}

export default function SmartHomePage({ params }: { params: Promise<{ locale:string }> }) {
  const { locale } = React.use(params)
  const [activeSeller, setActiveSeller] = useState('All Sellers')
  const [diamondFirst, setDiamondFirst] = useState(true)
  const [activePill, setActivePill] = useState('All Smart Home')
  const [activeBrand, setActiveBrand] = useState('')
  const [page, setPage] = useState(1)
  const [viewGrid, setViewGrid] = useState(true)
  const sellerTabs = ['All Sellers','SouKni Members','SouKni Pro']

  return (
    <div style={{ fontFamily:"'Inter',sans-serif", backgroundColor:C.surface, minHeight:'100vh' }}>

      <section style={{ position:'relative', height:480, overflow:'hidden', display:'flex', alignItems:'center', justifyContent:'center' }}>
        <img src={IMGS.hero} alt="Smart Home" style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover' }} />
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top,rgba(15,23,42,0.88),rgba(15,23,42,0.32))' }} />
        <div style={{ position:'relative', zIndex:10, textAlign:'center', padding:'0 24px', maxWidth:760, width:'100%' }}>
          <h1 style={{ ...UB, fontSize:'clamp(36px,6vw,64px)', color:'white', lineHeight:1.0, marginBottom:20, textTransform:'uppercase' as const }}>
            SMART HOME<br />TECH IN RABAT.
          </h1>
          <div style={{ display:'flex', alignItems:'stretch', backgroundColor:'rgba(255,255,255,0.12)', backdropFilter:'blur(24px)', border:'1px solid rgba(255,255,255,0.25)', borderRadius:100, overflow:'hidden', maxWidth:680, margin:'0 auto', boxShadow:'0 8px 32px rgba(0,0,0,0.2)' }}>
            <div style={{ display:'flex', flexDirection:'column' as const, padding:'14px 22px', flex:'0 0 160px', borderRight:'1px solid rgba(255,255,255,0.2)', gap:2 }}>
              <span style={{ fontSize:9, fontWeight:800, color:'rgba(255,255,255,0.55)', textTransform:'uppercase' as const, letterSpacing:'0.12em' }}>City</span>
              <input placeholder="Rabat" style={{ backgroundColor:'transparent', border:'none', outline:'none', fontSize:14, fontWeight:600, color:'white', fontFamily:"'Inter',sans-serif", padding:0 }} />
            </div>
            <div style={{ display:'flex', flexDirection:'column' as const, padding:'14px 22px', flex:1, borderRight:'1px solid rgba(255,255,255,0.2)', gap:2 }}>
              <span style={{ fontSize:9, fontWeight:800, color:'rgba(255,255,255,0.55)', textTransform:'uppercase' as const, letterSpacing:'0.12em' }}>Keyword</span>
              <input placeholder="Smart speaker, camera, thermostat..." style={{ backgroundColor:'transparent', border:'none', outline:'none', fontSize:14, fontWeight:600, color:'white', fontFamily:"'Inter',sans-serif", padding:0, width:'100%' }} />
            </div>
            <button style={{ backgroundColor:C.mint, color:'white', border:'none', padding:'0 32px', fontWeight:800, fontSize:14, cursor:'pointer', flexShrink:0 }}>Search</button>
          </div>
        </div>
      </section>

      <div style={{ maxWidth:1440, margin:'-26px auto 0', padding:'0 40px', position:'relative', zIndex:30 }}>
        <div style={{ backgroundColor:'rgba(255,255,255,0.92)', backdropFilter:'blur(20px)', borderRadius:100, padding:'8px 8px 8px 0', boxShadow:'0 8px 40px rgba(0,0,0,0.10)', border:'1px solid rgba(255,255,255,0.7)', display:'flex', alignItems:'center' }}>
          {[
            { label:'City', val:'Rabat', w:1 },
            { label:'Keyword', val:'Smart speaker, camera...', w:2 },
            { label:'Condition', val:'Select', w:1 },
            { label:'Price (MAD)', val:'Select Range', w:1 },
          ].map((f,i)=>(
            <div key={f.label} style={{ flex:f.w, padding:'8px 20px', borderRight:i<3?'1px solid rgba(186,202,197,0.25)':'none', display:'flex', flexDirection:'column' as const, cursor:'pointer', gap:1 }}>
              <span style={{ fontSize:9, textTransform:'uppercase' as const, fontWeight:700, color:C.muted, letterSpacing:'0.1em' }}>{f.label}</span>
              <span style={{ fontSize:13, fontWeight:600, color:C.ink }}>{f.val}</span>
            </div>
          ))}
          <button style={{ display:'flex', alignItems:'center', gap:6, padding:'10px 18px', borderRadius:100, border:'1px solid rgba(186,202,197,0.3)', backgroundColor:'#eef5f2', fontSize:12, fontWeight:700, color:C.ink, cursor:'pointer', marginLeft:8, flexShrink:0 }}>
            <SlidersHorizontal size={14} /> All Filters
          </button>
          <button style={{ backgroundColor:C.mint, color:'white', border:'none', padding:'12px 24px', borderRadius:100, cursor:'pointer', fontWeight:700, fontSize:13, flexShrink:0, marginLeft:8, display:'flex', alignItems:'center', gap:6 }}>
            <Search size={15} /> SEARCH
          </button>
        </div>
      </div>

      <div style={{ maxWidth:1440, margin:'32px auto 0', padding:'0 40px 80px' }}>

        <nav style={{ display:'flex', alignItems:'center', gap:6, fontSize:11, fontWeight:700, color:C.muted, textTransform:'uppercase' as const, letterSpacing:'0.06em', marginBottom:8 }}>
          <Link href={`/${locale}`} style={{ color:C.muted, textDecoration:'none' }}>Home</Link><span>›</span>
          <Link href={`/${locale}/electronics`} style={{ color:C.muted, textDecoration:'none' }}>Electronics</Link><span>›</span>
          <span style={{ color:C.ink }}>Smart Home</span>
        </nav>

        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:4 }}>
          <h2 style={{ ...UB, fontSize:22, color:C.ink }}>New and Used Smart Home Tech in Rabat</h2>
          <div style={{ display:'flex', gap:8 }}>
            <button style={{ display:'flex', alignItems:'center', gap:6, padding:'8px 14px', borderRadius:12, border:'1px solid rgba(186,202,197,0.4)', backgroundColor:'#eef5f2', fontSize:12, fontWeight:700, cursor:'pointer', color:C.ink }}>Sort: Default</button>
            <button style={{ display:'flex', alignItems:'center', gap:6, padding:'8px 14px', borderRadius:12, border:'1px solid rgba(186,202,197,0.4)', backgroundColor:'#eef5f2', fontSize:12, fontWeight:700, cursor:'pointer', color:C.ink }}>Save Search</button>
          </div>
        </div>
        <p style={{ fontSize:14, color:C.muted, marginBottom:16 }}>1,560 Ads in Rabat District</p>

        <section style={{ marginBottom:32 }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:16 }}>
            <h2 style={{ ...UB, fontSize:16, color:C.ink, textTransform:'uppercase' as const, letterSpacing:'0.08em' }}>SHOP BY BRAND</h2>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(7,1fr)', gap:12 }}>
            {brands.map(brand=>(
              <button key={brand.name} onClick={()=>setActiveBrand(activeBrand===brand.name?'':brand.name)}
                style={{ position:'relative', borderRadius:20, overflow:'hidden', border:`2px solid ${activeBrand===brand.name?C.mint:'transparent'}`, cursor:'pointer', transition:'all 0.2s', background:'none', padding:0 }}>
                <div style={{ position:'relative', aspectRatio:'1/1', overflow:'hidden' }}>
                  <img src={brand.image} alt={brand.name} style={{ width:'100%', height:'100%', objectFit:'cover', transition:'transform 0.4s', transform:activeBrand===brand.name?'scale(1.06)':'scale(1)' }} />
                  <div style={{ position:'absolute', inset:0, background:activeBrand===brand.name?'linear-gradient(to top,rgba(34,212,168,0.7),rgba(0,0,0,0.2))':'linear-gradient(to top,rgba(0,0,0,0.7),rgba(0,0,0,0.1))' }} />
                  <div style={{ position:'absolute', bottom:10, left:0, right:0, textAlign:'center' }}>
                    <p style={{ ...UB, fontSize:11, color:'white', marginBottom:2 }}>{brand.name}</p>
                    <p style={{ fontSize:9, color:'rgba(255,255,255,0.8)', fontWeight:600 }}>{brand.count} ads</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </section>

        <div style={{ display:'flex', gap:8, marginBottom:16, overflowX:'auto', paddingBottom:4 }}>
          {pills.map(p=>(
            <Link key={p} href={`/${locale}/electronics/smart-home/${pillSlugs[p]}`}
              style={{ padding:'8px 20px', borderRadius:100, fontSize:12, fontWeight:700, cursor:'pointer', whiteSpace:'nowrap' as const, transition:'all 0.15s', textDecoration:'none', display:'inline-block', backgroundColor:'#e8efec', color:'#3c4a46' }}
              onMouseEnter={e=>{e.currentTarget.style.backgroundColor=C.ink;e.currentTarget.style.color='white'}}
              onMouseLeave={e=>{e.currentTarget.style.backgroundColor='#e8efec';e.currentTarget.style.color='#3c4a46'}}
            >{p}</Link>
          ))}
        </div>

        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'12px 0', borderTop:'1px solid rgba(186,202,197,0.25)', borderBottom:'1px solid rgba(186,202,197,0.25)', marginBottom:28, flexWrap:'wrap' as const, gap:10 }}>
          <div style={{ display:'flex', gap:6 }}>
            {sellerTabs.map(tab=>(
              <button key={tab} onClick={()=>setActiveSeller(tab)}
                style={{ padding:'7px 18px', borderRadius:100, fontSize:12, fontWeight:700, cursor:'pointer', border:'none', backgroundColor:activeSeller===tab?'#dde4e1':'transparent', color:activeSeller===tab?C.ink:C.muted }}>
                {tab}
              </button>
            ))}
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:16 }}>
            <div style={{ display:'flex', alignItems:'center', gap:8, cursor:'pointer' }} onClick={()=>setDiamondFirst(!diamondFirst)}>
              <span style={{ fontSize:12, fontWeight:700, color:C.muted }}>Show SouKni Diamond Verified First</span>
              <div style={{ width:40, height:20, borderRadius:100, backgroundColor:diamondFirst?C.mint:'#bacac5', position:'relative', transition:'background 0.25s' }}>
                <div style={{ position:'absolute', top:2, left:diamondFirst?22:2, width:16, height:16, borderRadius:'50%', backgroundColor:'white', transition:'left 0.25s' }} />
              </div>
            </div>
            <div style={{ display:'flex', gap:6 }}>
              <button onClick={()=>setViewGrid(true)} style={{ width:34, height:34, display:'flex', alignItems:'center', justifyContent:'center', borderRadius:8, border:'none', cursor:'pointer', backgroundColor:viewGrid?C.ink:'#e8efec', color:viewGrid?'white':C.ink }}>⊞</button>
              <button onClick={()=>setViewGrid(false)} style={{ width:34, height:34, display:'flex', alignItems:'center', justifyContent:'center', borderRadius:8, border:'none', cursor:'pointer', backgroundColor:!viewGrid?C.ink:'#e8efec', color:!viewGrid?'white':C.ink }}>☰</button>
            </div>
          </div>
        </div>

        <div style={{ display:'flex', gap:8, marginBottom:28, flexWrap:'wrap' as const }}>
          {[
            { emoji:'✨', label:'New Arrivals', active:true },
            { emoji:'📉', label:'Price Drop Alert', active:false },
          ].map(chip=>(
            <button key={chip.label} style={{ display:'flex', alignItems:'center', gap:6, padding:'8px 16px', borderRadius:100, fontSize:12, fontWeight:700, cursor:'pointer', border:chip.active?'none':'1px solid rgba(186,202,197,0.5)', backgroundColor:chip.active?C.ink:'white', color:chip.active?'white':'#3c4a46' }}>
              {chip.emoji} {chip.label}
            </button>
          ))}
        </div>

        <section style={{ marginBottom:48 }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:20 }}>
            <h2 style={{ ...UB, fontSize:13, color:C.ink, textTransform:'uppercase' as const, letterSpacing:'0.1em' }}>FEATURED PREMIUM SMART HOME</h2>
            <Link href={`/${locale}/electronics`} style={{ color:C.mint, fontWeight:700, fontSize:13, textDecoration:'none', display:'flex', alignItems:'center', gap:4 }}>View all Featured <ChevronRight size={14} /></Link>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:20 }}>
            {featuredListings.map(item=><ListingCard key={item.id} item={item} locale={locale} />)}
          </div>
        </section>

        <section style={{ marginBottom:48 }}>
          <div style={{ position:'relative', height:220, borderRadius:40, overflow:'hidden', cursor:'pointer', boxShadow:'0 20px 60px rgba(0,0,0,0.15)' }}>
            <img src={IMGS.immo} alt="Electro Pro" style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover' }} />
            <div style={{ position:'absolute', inset:0, background:'linear-gradient(to right,rgba(22,29,27,0.92) 0%,rgba(22,29,27,0.5) 60%,transparent)' }} />
            <div style={{ position:'absolute', inset:0, display:'flex', flexDirection:'column' as const, justifyContent:'center', padding:'0 56px' }}>
              <span style={{ backgroundColor:C.mint, color:'white', fontSize:9, ...UB, padding:'4px 14px', borderRadius:100, textTransform:'uppercase' as const, letterSpacing:'0.12em', display:'inline-block', marginBottom:14, width:'fit-content' }}>SouKni Electro Pro</span>
              <h2 style={{ ...UB, fontSize:'clamp(20px,3vw,32px)', color:'white', marginBottom:20, lineHeight:1.1 }}>Certified installers.<br/>Guaranteed setup.</h2>
              <Link href={`/${locale}/electronics`} style={{ textDecoration:'none' }}>
                <button style={{ backgroundColor:'white', color:C.ink, border:'none', padding:'11px 28px', borderRadius:100, fontSize:12, ...UB, cursor:'pointer' }}>Explore Pro Deals</button>
              </Link>
            </div>
          </div>
        </section>

        <section style={{ marginBottom:48 }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:20 }}>
            <h2 style={{ ...UB, fontSize:22, color:C.mint }}>Exclusive Smart Home Collection</h2>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:16 }}>
            {exclusiveListings.map(item=><ListingCard key={item.id} item={item} locale={locale} compact />)}
          </div>
        </section>

        <section style={{ marginBottom:48 }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:20 }}>
            <h2 style={{ ...UB, fontSize:20, color:C.ink }}>Pro Smart Home Discoveries</h2>
          </div>
          <div style={{ display:'flex', flexDirection:'column' as const, gap:16 }}>
            {[discoveryListings.slice(0,4), discoveryListings.slice(4,8), discoveryListings.slice(8,12)].map((row,ri)=>(
              <div key={ri} style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:16 }}>
                {row.map(item=><ListingCard key={item.id} item={item} locale={locale} compact />)}
              </div>
            ))}
          </div>
        </section>

        <div style={{ display:'flex', justifyContent:'center', alignItems:'center', gap:8, marginBottom:56 }}>
          {[1,2,3,4].map(p=>(
            <button key={p} onClick={()=>setPage(p)}
              style={{ width:36, height:36, borderRadius:10, border:page===p?'none':'1px solid #e2e8f0', backgroundColor:page===p?C.mint:'white', color:page===p?'white':C.ink, fontWeight:700, fontSize:13, cursor:'pointer' }}>
              {p}
            </button>
          ))}
        </div>

        <section style={{ position:'relative', borderRadius:40, overflow:'hidden', marginBottom:40 }}>
          <img src={IMGS.hero} alt="Diamond" style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover' }} />
          <div style={{ position:'absolute', inset:0, background:'linear-gradient(135deg,rgba(15,23,42,0.96),rgba(15,23,42,0.7))' }} />
          <div style={{ position:'relative', zIndex:1, padding:'56px 64px', maxWidth:640 }}>
            <h2 style={{ ...UB, fontSize:'clamp(28px,4vw,48px)', color:'white', marginBottom:16, lineHeight:1.05 }}>Become a SouKni Diamond Member.</h2>
            <p style={{ fontSize:15, color:'rgba(255,255,255,0.72)', lineHeight:1.7, marginBottom:28 }}>Unlock priority listings, verified badge, and exclusive buyer access.</p>
            <Link href={`/${locale}/diamond`} style={{ textDecoration:'none' }}>
              <button style={{ backgroundColor:C.mint, color:'white', border:'none', padding:'13px 28px', borderRadius:100, fontSize:13, ...UB, cursor:'pointer' }}>Get Verified Now</button>
            </Link>
          </div>
        </section>

        <section style={{ borderRadius:40, background:'linear-gradient(135deg,#22d4a8,#0f9b8e)', padding:'56px 64px', display:'flex', alignItems:'center', justifyContent:'space-between', gap:40, flexWrap:'wrap' as const }}>
          <div>
            <h2 style={{ ...UB, fontSize:'clamp(28px,4vw,44px)', color:'white', marginBottom:12, lineHeight:1.05 }}>SELL YOUR SMART HOME TECH TODAY</h2>
            <p style={{ fontSize:15, color:'rgba(255,255,255,0.85)', maxWidth:480, lineHeight:1.7 }}>Post for free and reach millions of buyers across Morocco.</p>
          </div>
          <Link href={`/${locale}/post-ad`} style={{ textDecoration:'none' }}>
            <span style={{ display:'inline-block', backgroundColor:'white', color:C.mint, padding:'16px 36px', borderRadius:100, fontWeight:900, fontSize:14, cursor:'pointer', whiteSpace:'nowrap' as const, ...UB }}>Post Free Ad →</span>
          </Link>
        </section>

      </div>
    </div>
  )
}
