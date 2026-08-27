'use client'

import { useState, useMemo, useEffect } from 'react'
import React from 'react'
import { Heart, Search, ChevronDown, ChevronLeft, ChevronRight, SlidersHorizontal, MapPin } from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useListings } from '@/hooks/useListings'
import WhatsAppButton from '@/components/ui/WhatsAppButton'
import Breadcrumb from '@/components/ui/Breadcrumb'
import CategoryFooterNav from '@/components/ui/CategoryFooterNav'

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

const CATEGORIES: Record<string,{ label:string; hero:string; desc:string; count:string; brands:string[]; priceRanges:string[]; ages:string[] }> = {
  'all-home-garden': {
    label:'All Home & Garden',
    hero:'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&w=1600',
    desc:'Browse the complete SouKni home, garden and living collection.',
    count:'3,120', ages:['Living Room','Bedroom','Kitchen','Bathroom','Outdoor','Office'],
    brands:['IKEA','Zara Home','Maisons du Monde','H&M Home','Made.com','West Elm','Habitat','La Redoute'],
    priceRanges:['Any Price','0 – 300 MAD','300 – 800 MAD','800 – 2,000 MAD','2,000 – 5,000 MAD','5,000+ MAD'],
  },
  'furniture': {
    label:'Furniture',
    hero:'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&w=1600',
    desc:'Sofas, tables, chairs, and storage furniture for every room.',
    count:'842', ages:['Living Room','Bedroom','Dining Room','Office','Kids Room','Outdoor'],
    brands:['IKEA','Made.com','West Elm','Habitat','Conforama','But','Maisons du Monde','Alinea'],
    priceRanges:['Any Price','0 – 1,000 MAD','1,000 – 3,000 MAD','3,000 – 8,000 MAD','8,000 – 20,000 MAD','20,000+ MAD'],
  },
  'garden-outdoor': {
    label:'Garden & Outdoor',
    hero:'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&w=1600',
    desc:'Garden furniture, tools, planters and outdoor living essentials.',
    count:'456', ages:['Patio','Balcony','Garden','Terrace','Poolside','Rooftop'],
    brands:['IKEA','Leroy Merlin','Jardiland','Truffaut','Gifi','Casa','Botanic','Bricoma'],
    priceRanges:['Any Price','0 – 500 MAD','500 – 1,500 MAD','1,500 – 4,000 MAD','4,000+ MAD'],
  },
  'home-decor': {
    label:'Home Decor',
    hero:'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&w=1600',
    desc:'Wall art, mirrors, vases and decorative accessories.',
    count:'678', ages:['Living Room','Bedroom','Entryway','Bathroom','Office','Kids Room'],
    brands:['Zara Home','H&M Home','Maisons du Monde','IKEA','Casa','La Redoute','Habitat','Gifi'],
    priceRanges:['Any Price','0 – 200 MAD','200 – 500 MAD','500 – 1,500 MAD','1,500+ MAD'],
  },
  'lighting': {
    label:'Lighting',
    hero:'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&w=1600',
    desc:'Ceiling lights, lamps, chandeliers and smart lighting.',
    count:'312', ages:['Living Room','Bedroom','Kitchen','Bathroom','Outdoor','Office'],
    brands:['IKEA','Philips','Zara Home','Made.com','Leroy Merlin','Habitat','Conforama','La Redoute'],
    priceRanges:['Any Price','0 – 300 MAD','300 – 800 MAD','800 – 2,000 MAD','2,000+ MAD'],
  },
  'bedding-bath': {
    label:'Bedding & Bath',
    hero:'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&w=1600',
    desc:'Duvets, sheets, towels and bathroom textiles.',
    count:'524', ages:['Single','Double','Queen','King','Bath','Guest Room'],
    brands:['Zara Home','H&M Home','IKEA','Maisons du Monde','La Redoute','Casa','Habitat','Sity'],
    priceRanges:['Any Price','0 – 200 MAD','200 – 500 MAD','500 – 1,200 MAD','1,200+ MAD'],
  },
  'kitchen-dining': {
    label:'Kitchen & Dining',
    hero:'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&w=1600',
    desc:'Cookware, dinnerware, kitchen tools and dining essentials.',
    count:'698', ages:['Cookware','Dinnerware','Cutlery','Storage','Appliances','Table Linen'],
    brands:['IKEA','Zara Home','Tefal','Le Creuset','WMF','Casa','Habitat','La Redoute'],
    priceRanges:['Any Price','0 – 300 MAD','300 – 800 MAD','800 – 2,000 MAD','2,000+ MAD'],
  },
  'storage-shelving': {
    label:'Storage & Shelving',
    hero:'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&w=1600',
    desc:'Shelves, cabinets, baskets and organisation solutions.',
    count:'389', ages:['Living Room','Bedroom','Kitchen','Bathroom','Office','Garage'],
    brands:['IKEA','Made.com','Habitat','Conforama','But','Leroy Merlin','Gifi','Casa'],
    priceRanges:['Any Price','0 – 400 MAD','400 – 1,000 MAD','1,000 – 3,000 MAD','3,000+ MAD'],
  },
  'rugs-curtains': {
    label:'Rugs & Curtains',
    hero:'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&w=1600',
    desc:'Area rugs, carpets, curtains and window treatments.',
    count:'267', ages:['Living Room','Bedroom','Dining Room','Hallway','Kids Room','Office'],
    brands:['IKEA','Zara Home','Maisons du Monde','La Redoute','H&M Home','Casa','Habitat','Sity'],
    priceRanges:['Any Price','0 – 400 MAD','400 – 1,000 MAD','1,000 – 3,000 MAD','3,000+ MAD'],
  },
  'plants-pots': {
    label:'Plants & Pots',
    hero:'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&w=1600',
    desc:'Indoor plants, planters, pots and gardening accessories.',
    count:'198', ages:['Indoor','Outdoor','Balcony','Terrace','Office','Kitchen'],
    brands:['IKEA','Jardiland','Truffaut','Botanic','Leroy Merlin','Casa','Gifi','Bricoma'],
    priceRanges:['Any Price','0 – 150 MAD','150 – 400 MAD','400 – 1,000 MAD','1,000+ MAD'],
  },
  'art-prints': {
    label:'Art & Prints',
    hero:'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&w=1600',
    desc:'Wall art, framed prints, posters and canvases.',
    count:'156', ages:['Living Room','Bedroom','Office','Entryway','Kids Room','Dining Room'],
    brands:['Zara Home','Maisons du Monde','IKEA','La Redoute','Habitat','Casa','H&M Home','Gifi'],
    priceRanges:['Any Price','0 – 200 MAD','200 – 500 MAD','500 – 1,500 MAD','1,500+ MAD'],
  },
  'tools-diy': {
    label:'Tools & DIY',
    hero:'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&w=1600',
    desc:'Hand tools, power tools and DIY home improvement supplies.',
    count:'421', ages:['Hand Tools','Power Tools','Painting','Plumbing','Electrical','Garden Tools'],
    brands:['Leroy Merlin','Bricoma','Bosch','Black+Decker','Makita','Dexter','IKEA','Mr Bricolage'],
    priceRanges:['Any Price','0 – 300 MAD','300 – 800 MAD','800 – 2,500 MAD','2,500+ MAD'],
  },
  'smart-home': {
    label:'Smart Home',
    hero:'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&w=1600',
    desc:'Smart lighting, security cameras, thermostats and home automation.',
    count:'134', ages:['Security','Lighting','Climate','Voice Assistants','Sensors','Entertainment'],
    brands:['Philips Hue','Google Nest','Amazon Echo','TP-Link','Xiaomi','IKEA','Ring','Ezviz'],
    priceRanges:['Any Price','0 – 500 MAD','500 – 1,500 MAD','1,500 – 4,000 MAD','4,000+ MAD'],
  },
}

const ALL_CATS = [
  { label:'All Home & Garden', slug:'all-home-garden'  },
  { label:'Furniture',         slug:'furniture'        },
  { label:'Garden & Outdoor',  slug:'garden-outdoor'   },
  { label:'Home Decor',        slug:'home-decor'       },
  { label:'Lighting',          slug:'lighting'         },
  { label:'Bedding & Bath',    slug:'bedding-bath'     },
  { label:'Kitchen & Dining',  slug:'kitchen-dining'   },
  { label:'Storage & Shelving',slug:'storage-shelving' },
  { label:'Rugs & Curtains',   slug:'rugs-curtains'    },
  { label:'Plants & Pots',     slug:'plants-pots'      },
  { label:'Art & Prints',      slug:'art-prints'       },
  { label:'Tools & DIY',       slug:'tools-diy'        },
  { label:'Smart Home',        slug:'smart-home'       },
]

const IMGS = [
  'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&w=400',
  'https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg?auto=compress&w=400',
  'https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg?auto=compress&w=400',
  'https://images.pexels.com/photos/276583/pexels-photo-276583.jpeg?auto=compress&w=400',
  'https://images.pexels.com/photos/447592/pexels-photo-447592.jpeg?auto=compress&w=400',
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
  return <span style={{ backgroundColor:s.bg, color:s.color, fontSize:'8px', ...CB, padding:'4px 10px', borderRadius:'6px', textTransform:'uppercase' as const, letterSpacing:'0.08em', display:'inline-block', boxShadow:'0 2px 6px rgba(0,0,0,0.15)', whiteSpace:'nowrap' as const }}>{s.label}</span>
}

function ListingCard({ brand, title, price, location, condition, img, badge, age, phone }: any) {
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
        {age && <div style={{ position:'absolute', bottom:'10px', right:'10px', zIndex:10, backgroundColor:'rgba(22,29,27,0.75)', color:'white', fontSize:'9px', ...CB, padding:'3px 8px', borderRadius:'5px' }}>{age}</div>}
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
          <WhatsAppButton phone={phone} title={title}
            style={{ flex:1, padding:'9px', borderRadius:'12px', fontSize:'10px', textTransform:'uppercase' as const }}>
            💬 WhatsApp
          </WhatsAppButton>
        </div>
      </div>
    </article>
  )
}

function makeListings(cat: string, count: number) {
  const titleMap: Record<string,string[]> = {
    'all-home-garden':  ['Karlstad Sofa','Malm Bed Frame','Ektorp Armchair','Lack Coffee Table','Billy Bookcase','Poang Chair'],
    'furniture':        ['Karlstad Sofa 3-Seater','Malm Bed Frame Queen','Ektorp Armchair','Lack Coffee Table','Billy Bookcase','Poang Chair','Bestå TV Unit','Norden Dining Table'],
    'garden-outdoor':   ['Applaro Outdoor Set','Solstickan Parasol','Rattan Lounge Chair','Garden Bench Teak','Planter Box Set','Outdoor Dining Set','Hammock Stand','BBQ Grill Cart'],
    'home-decor':       ['Round Wall Mirror','Ceramic Vase Set','Framed Wall Art','Decorative Cushions','Table Lamp Set','Wall Clock Modern','Woven Basket','Candle Holder Set'],
    'lighting':         ['Ceiling Pendant Light','Floor Lamp Arc','LED Strip Lights','Chandelier Crystal','Table Lamp Bedside','Wall Sconce Pair','Smart Bulb Set','Outdoor String Lights'],
    'bedding-bath':      ['Duvet Cover Set Queen','Egyptian Cotton Sheets','Towel Set 6-Piece','Pillow Set Memory Foam','Bath Mat Set','Shower Curtain','Blanket Throw','Mattress Protector'],
    'kitchen-dining':   ['Dinnerware Set 16pc','Non-Stick Cookware Set','Cutlery Set Steel','Glass Storage Containers','Coffee Maker Machine','Dining Table Set','Wine Glass Set','Kitchen Knife Set'],
    'storage-shelving': ['Kallax Shelf Unit','Wardrobe Sliding Door','Storage Baskets Set','Shoe Cabinet','Floating Shelves Set','Under-bed Storage','Garage Shelving Unit','Closet Organizer'],
    'rugs-curtains':    ['Persian Style Rug','Blackout Curtains Pair','Shag Area Rug','Sheer Curtain Panel','Jute Runner Rug','Roman Blinds','Kids Room Rug','Outdoor Rug Weatherproof'],
    'plants-pots':      ['Monstera Deliciosa Plant','Ceramic Plant Pot Set','Snake Plant Sansevieria','Hanging Planter Set','Succulent Collection','Fiddle Leaf Fig','Terracotta Pot Large','Herb Garden Kit'],
    'art-prints':       ['Abstract Canvas Print','Botanical Print Set','Framed Photography Art','Typography Wall Art','Landscape Canvas','Modern Line Art Print','Gallery Wall Set','Vintage Poster Print'],
    'tools-diy':        ['Cordless Drill Set','Tool Box Complete','Paint Roller Kit','Screwdriver Set','Hammer & Nail Kit','Electric Sander','Measuring Tape Pro','Ladder Aluminum'],
    'smart-home':       ['Smart Bulb Starter Kit','Video Doorbell Camera','Smart Thermostat','Voice Assistant Speaker','Smart Plug 4-Pack','Security Camera System','Smart Lock Deadbolt','Motion Sensor Set'],
  }
  const cat_data = CATEGORIES[cat] || CATEGORIES['all-home-garden']
  const titles   = titleMap[cat] || titleMap['all-home-garden']
  const badges: BadgeT[] = ['certified','diamond','featured','new','certified','diamond']
  const locs  = ['Rabat, Agdal','Rabat, Souissi','Casablanca','Rabat, Hay Riad','Rabat, Centre']
  const conds = ['Like New','New','Excellent','Good',undefined,undefined]
  return Array.from({length:count},(_,i)=>({
    brand:     cat_data.brands[i%cat_data.brands.length],
    title:     titles[i%titles.length],
    price:     150 + ((i*1373)%8000),
    location:  locs[i%locs.length],
    condition: conds[i%conds.length],
    age:       cat_data.ages[i%cat_data.ages.length],
    img:       IMGS[i%IMGS.length],
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
        <div onClick={e=>e.stopPropagation()} style={{ position:'absolute', top:'calc(100% + 8px)', left:0, minWidth:'220px', backgroundColor:'white', borderRadius:'20px', boxShadow:'0 20px 60px rgba(0,0,0,0.12)', border:'1px solid rgba(107,122,118,0.12)', zIndex:200, overflow:'hidden', padding:'8px 0', maxHeight:'280px', overflowY:'auto' as const }}>
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

export default function HomeGardenCategoryPage() {
  const params   = useParams()
  const locale   = (params?.locale as string) || 'en'
  const catSlug  = (params?.category as string) || 'all-home-garden'
  const catData  = CATEGORIES[catSlug] || CATEGORIES['all-home-garden']

  const [activeSeller, setActiveSeller] = useState('All Sellers')
  const [diamond,      setDiamond     ] = useState(true)
  const [gridView,     setGridView    ] = useState(true)
  const [page,         setPage        ] = useState(1)
  const [keyword,      setKeyword     ] = useState('')
  const [city,         setCity        ] = useState('Rabat')
  const [price,        setPrice       ] = useState('Any Price')
  const [sortBy,       setSortBy      ] = useState('Most Recent')
  const [activeBrand,  setActiveBrand ] = useState('All Brands')
  const [activeAge,    setActiveAge   ] = useState('All Rooms')
  const [cityOpen,     setCityOpen    ] = useState(false)
  const [priceOpen,    setPriceOpen   ] = useState(false)

  const { fetchListings } = useListings()
  const [dbListings, setDbListings] = useState<any[]>([])

  useEffect(() => {
    const t = setTimeout(() => {
      fetchListings({ category: 'home-garden', sortBy: 'newest', limit: 24 }).then(rows => setDbListings(rows || []))
    }, 400)
    return () => clearTimeout(t)
  }, [])

  function mapDbRowToCard(row: any) {
    return {
      brand:     row.brand || '',
      title:     row.title,
      price:     (row.price || 0) / 100,
      location:  row.city || '',
      condition: row.condition || undefined,
      age:       row.subcategory || '',
      img:       (row.images && row.images[0]) || IMGS[0],
      badge:     row.badge || 'certified',
      phone:     row.profiles?.phone,
    }
  }

  const listings = React.useMemo(() => {
    const hasRealData = dbListings.length > 0
    const all = hasRealData ? dbListings.map(mapDbRowToCard) : makeListings(catSlug, 24)
    let items = all.filter(item => {
      const mk = keyword.trim()==='' || item.title.toLowerCase().includes(keyword.toLowerCase()) || item.brand.toLowerCase().includes(keyword.toLowerCase())
      const mb = activeBrand==='All Brands' || item.brand===activeBrand
      const ms = activeSeller==='All Sellers' || (item as any).seller===activeSeller
      const mr = activeAge==='All Rooms' || (item as any).room===activeAge
      const mc = city.trim()==='' || (item.location||'').toLowerCase().includes(city.toLowerCase())
      const mp = (() => {
        if (price==='Any Price') return true
        const nums = price.replace(/MAD/g,'').split('–').map((s:string)=>parseInt(s.replace(/,/g,'').trim()))
        const [mn, mx] = price.includes('+') ? [nums[0], Infinity] : [nums[0], nums[1]]
        return item.price >= mn && item.price <= mx
      })()
      return mk && mb && ms && mr && mc && mp
    })
    if (diamond) items = [...items].sort((a,b)=>{ const r=(x:string)=>x==='diamond'?2:x==='certified'?1:0; return r(b.badge)-r(a.badge) })
    if (sortBy==='Price: Low to High') items = [...items].sort((a,b)=>a.price-b.price)
    if (sortBy==='Price: High to Low') items = [...items].sort((a,b)=>b.price-a.price)
    return items
  }, [catSlug, keyword, activeBrand, activeSeller, activeAge, city, price, diamond, sortBy, dbListings])
  const PAGE_SIZE = 16
  const totalPages = Math.max(1, Math.ceil(listings.length / PAGE_SIZE))
  const clampedPage = Math.min(page, totalPages)
  const paginatedListings = listings.slice((clampedPage - 1) * PAGE_SIZE, clampedPage * PAGE_SIZE)
  const cities   = ['Rabat','Casablanca','Marrakech','Fès','Tanger','Agadir','Meknès']

  // DDrop defined outside component


  return (
    <div style={{ ...UB, backgroundColor:C.surface, color:C.ink, minHeight:'100vh' }}>

      {/* HERO */}
      <section style={{ position:'relative', height:'360px', display:'flex', alignItems:'center', justifyContent:'center', overflow:'hidden' }}>
        <img src={catData.hero} alt={catData.label} style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover' }} />
        <div style={{ position:'absolute', inset:0, backgroundColor:'rgba(22,29,27,0.52)' }} />
        <div style={{ position:'relative', zIndex:10, textAlign:'center' as const, maxWidth:'860px', padding:'0 24px', width:'100%' }}>
          <p style={{ fontSize:'11px', ...UB, color:C.mint, textTransform:'uppercase' as const, letterSpacing:'0.2em', marginBottom:'12px' }}>HOME & LIVING › HOME & GARDEN</p>
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
        <div style={{ backgroundColor:'rgba(255,255,255,0.97)', backdropFilter:'blur(16px)', border:'1px solid rgba(107,122,118,0.12)', borderRadius:'100px', boxShadow:'0 12px 40px rgba(0,0,0,0.08)', display:'flex', alignItems:'stretch', height:'68px', overflow:'visible' }}>
          <DDrop label="CITY" value={city} options={cities} open={cityOpen} setOpen={setCityOpen} onChange={setCity} />
          <div style={{ width:'1px', backgroundColor:'rgba(107,122,118,0.12)', margin:'12px 0' }} />
          <div style={{ flex:1.8, padding:'0 22px', display:'flex', flexDirection:'column' as const, justifyContent:'center' }}>
            <span style={{ fontSize:'9px', ...UB, textTransform:'uppercase' as const, letterSpacing:'0.14em', color:C.muted, marginBottom:'3px' }}>KEYWORD</span>
            <div style={{ display:'flex', alignItems:'center', gap:'8px' }}>
              <Search size={13} color={C.muted} />
              <input type="text" value={keyword} onChange={e=>setKeyword(e.target.value)} placeholder={`e.g. ${catData.brands[0]}, ${catData.brands[1]}...`}
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
        <Breadcrumb
          items={[
            { label:'Home', href:`/${locale}` },
            { label:'The Vault', href:`/${locale}/vault` },
            { label:'Home & Garden', href:`/${locale}/home-garden` },
            { label:catData.label },
          ]}
          mutedColor={C.muted}
          inkColor={C.ink}
        />

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
            <Link key={cat.slug} href={`/${locale}/home-garden/${cat.slug}`}
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
                  backgroundColor: activeSeller===tab?C.ink:'transparent', color:activeSeller===tab?'white':C.muted, boxShadow:activeSeller===tab?'0 2px 8px rgba(0,0,0,0.15)':'none',
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
            <button onClick={()=>setGridView(true)}  style={{ width:'36px', height:'36px', borderRadius:'8px', border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'17px', backgroundColor:gridView?C.ink:'transparent', color:gridView?'white':C.muted, transition:'all 0.2s' }}>⊞</button>
            <button onClick={()=>setGridView(false)} style={{ width:'36px', height:'36px', borderRadius:'8px', border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'17px', backgroundColor:!gridView?C.ink:'transparent', color:!gridView?'white':C.muted, transition:'all 0.2s' }}>☰</button>
          </div>
        </div>

        {/* ROOM FILTER */}
        <div style={{ backgroundColor:'white', borderRadius:'20px', padding:'20px 24px', marginBottom:'16px', border:'1px solid rgba(107,122,118,0.1)' }}>
          <p style={{ fontSize:'9px', ...UB, color:C.muted, textTransform:'uppercase' as const, letterSpacing:'0.14em', marginBottom:'12px' }}>FILTER BY ROOM</p>
          <div style={{ display:'flex', gap:'8px', flexWrap:'wrap' as const }}>
            <button onClick={()=>setActiveAge('All Rooms')}
              style={{ padding:'7px 16px', borderRadius:'100px', fontSize:'10px', ...UB, border:`1px solid`, cursor:'pointer', transition:'all 0.15s',
                backgroundColor:activeAge==='All Rooms'?C.mint:'transparent', color:activeAge==='All Rooms'?C.ink:C.muted, borderColor:activeAge==='All Rooms'?C.mint:'rgba(107,122,118,0.2)' }}>All Rooms</button>
            {catData.ages.map(room=>(
              <button key={room} onClick={()=>setActiveAge(room)}
                style={{ padding:'7px 16px', borderRadius:'100px', fontSize:'10px', ...UB, border:`1px solid`, cursor:'pointer', transition:'all 0.15s',
                  backgroundColor:activeAge===room?C.mint:'transparent', color:activeAge===room?C.ink:C.muted, borderColor:activeAge===room?C.mint:'rgba(107,122,118,0.2)' }}
                onMouseEnter={e=>{if(activeAge!==room){e.currentTarget.style.borderColor=C.mint;e.currentTarget.style.color=C.ink}}}
                onMouseLeave={e=>{if(activeAge!==room){e.currentTarget.style.borderColor='rgba(107,122,118,0.2)';e.currentTarget.style.color=C.muted}}}
              >{room}</button>
            ))}
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
          <p style={{ fontSize:'13px', color:C.muted, ...CB, marginBottom:'20px' }}>Showing {paginatedListings.length} of {listings.length} results</p>
          {gridView ? (
            <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'20px' }}>
              {paginatedListings.map((item,i)=><ListingCard key={i} {...item} />)}
            </div>
          ) : (
            <div style={{ display:'flex', flexDirection:'column' as const, gap:'14px' }}>
              {paginatedListings.map((item,j)=>(
                <div key={j} style={{ display:'flex', backgroundColor:'white', borderRadius:'20px', border:'1px solid rgba(107,122,118,0.1)', overflow:'hidden', height:'140px' }}>
                  <img src={item.img} alt={item.title} style={{ width:'140px', height:'100%', objectFit:'cover' as const, flexShrink:0 }} />
                  <div style={{ flex:1, padding:'16px 20px', display:'flex', flexDirection:'column' as const, justifyContent:'space-between' }}>
                    <div>
                      <p style={{ fontSize:'9px', fontFamily:"'Hanken Grotesk',sans-serif", fontWeight:900, color:'#22d4a8', textTransform:'uppercase' as const }}>{item.brand}</p>
                      <h4 style={{ fontSize:'15px', fontFamily:"'Hanken Grotesk',sans-serif", fontWeight:900, color:'#161d1b' }}>{item.title}</h4>
                    </div>
                    <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                      <p style={{ fontSize:'18px', fontFamily:"'Hanken Grotesk',sans-serif", fontWeight:900, color:'#22d4a8' }}>{item.price.toLocaleString()} MAD</p>
                      <div style={{ display:'flex', gap:'8px' }}>
                        <button style={{ padding:'8px 16px', borderRadius:'10px', border:'1px solid #161d1b', backgroundColor:'transparent', color:'#161d1b', fontSize:'10px', cursor:'pointer' }}>Message</button>
                        <WhatsAppButton phone={(item as any).phone} title={item.title} style={{ padding:'8px 16px', borderRadius:'10px', fontSize:'10px' }} />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* PAGINATION */}
        <div style={{ display:'flex', justifyContent:'center', alignItems:'center', gap:'10px', marginBottom:'64px' }}>
          <button onClick={()=>setPage(p=>Math.max(1,p-1))} disabled={clampedPage<=1}
            style={{ width:'44px', height:'44px', borderRadius:'12px', backgroundColor:'white', border:'1px solid rgba(107,122,118,0.12)', cursor:clampedPage<=1?'not-allowed':'pointer', opacity:clampedPage<=1?0.4:1, display:'flex', alignItems:'center', justifyContent:'center', color:C.muted }}><ChevronLeft size={18} /></button>
          {Array.from({length:totalPages},(_,i)=>i+1).map(p=>(
            <button key={p} onClick={()=>setPage(p)} style={{ width:'44px', height:'44px', borderRadius:'12px', cursor:'pointer', fontSize:'15px', ...UB, border:'1px solid', transition:'all 0.2s', backgroundColor:clampedPage===p?C.mint:'white', color:clampedPage===p?C.ink:C.muted, borderColor:clampedPage===p?C.mint:'rgba(107,122,118,0.12)' }}>{p}</button>
          ))}
          <button onClick={()=>setPage(p=>Math.min(totalPages,p+1))} disabled={clampedPage>=totalPages}
            style={{ width:'44px', height:'44px', borderRadius:'12px', backgroundColor:'white', border:'1px solid rgba(107,122,118,0.12)', cursor:clampedPage>=totalPages?'not-allowed':'pointer', opacity:clampedPage>=totalPages?0.4:1, display:'flex', alignItems:'center', justifyContent:'center', color:C.muted }}><ChevronRight size={18} /></button>
        </div>

        <CategoryFooterNav
          relatedTitle="Explore Other Home & Garden Categories"
          related={ALL_CATS.filter(c=>c.slug!==catSlug).map(cat=>({ label:cat.label, href:`/${locale}/home-garden/${cat.slug}` }))}
          backHref={`/${locale}/home-garden`}
          backLabel="Back to All Home & Garden"
          inkColor={C.ink}
          mintDkColor={C.mintDk}
        />
      </main>
    </div>
  )
}
