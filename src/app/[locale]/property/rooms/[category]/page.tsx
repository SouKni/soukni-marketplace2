'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Heart, Search, ChevronLeft, ChevronRight, MapPin, Maximize, Phone, Wifi, SlidersHorizontal, LayoutGrid, List, Bath, Home } from 'lucide-react'
import { useParams } from 'next/navigation'
import { useListings } from '@/hooks/useListings'
import Breadcrumb from '@/components/ui/Breadcrumb'
import CategoryFooterNav from '@/components/ui/CategoryFooterNav'

const C = { mint:'#22d4a8', mintDk:'#0f9b8e', ink:'#161d1b', surface:'#f4fbf8', muted:'#6b7a76' }
const UB = { fontFamily:"'Inter',sans-serif", fontWeight:900, letterSpacing:'-0.05em' } as const
const CB = { fontFamily:"'Hanken Grotesk',sans-serif", fontWeight:900, letterSpacing:'-0.03em' } as const

const CAT_DATA: Record<string,{ label:string; hero:string; desc:string; count:string }> = {
  'single-room':    { label:'Single Room',    hero:'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&w=1600', desc:'Private single rooms for rent across Morocco — bills included options available.',              count:'3,840' },
  'shared-room':    { label:'Shared Room',    hero:'https://images.pexels.com/photos/1648776/pexels-photo-1648776.jpeg?auto=compress&w=1600', desc:'Affordable shared rooms and colocation across Morocco — perfect for students and young professionals.', count:'2,110' },
  'master-bedroom': { label:'Master Bedroom', hero:'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&w=1600', desc:'Spacious master bedrooms with en-suite options in premium locations.',                            count:'1,420' },
  'studio':         { label:'Studio',         hero:'https://images.pexels.com/photos/1918291/pexels-photo-1918291.jpeg?auto=compress&w=1600', desc:'Self-contained studios — your own kitchen, bathroom and private entrance.',                       count:'3,210' },
  'ensuite-room':   { label:'Ensuite Room',   hero:'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&w=1600',   desc:'Private rooms with attached bathroom — privacy and comfort without the studio price.',            count:'980'   },
  'hotel':          { label:'Hotel',          hero:'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&w=1600',   desc:'Hotels and serviced rooms for short-term and extended stays across Morocco.',                     count:'645'   },
}
const DEFAULT = CAT_DATA['single-room']

const ALL_CATS = [
  { label:'Single Room',    slug:'single-room'    },
  { label:'Shared Room',    slug:'shared-room'    },
  { label:'Master Bedroom', slug:'master-bedroom' },
  { label:'Studio',         slug:'studio'         },
  { label:'Ensuite Room',   slug:'ensuite-room'   },
  { label:'Hotel',          slug:'hotel'          },
]

const IMGS = [
  'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&w=500',
  'https://images.pexels.com/photos/1648776/pexels-photo-1648776.jpeg?auto=compress&w=500',
  'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&w=500',
  'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&w=500',
  'https://images.pexels.com/photos/1918291/pexels-photo-1918291.jpeg?auto=compress&w=500',
]

function makeListings(cat: string, count: number) {
  const titles: Record<string,string[]> = {
    'single-room':    ['Private Room with Balcony','Bright Single Room','Quiet Room Near Centre','Student Room Bills Incl.','Modern Single Room','Room with Private Bathroom','Single Room Garden View','Cosy Room Fully Furnished'],
    'shared-room':    ['Shared Room 3-Bed Flat','Colocation Premium','Shared Student Room','Mixed Colocation Modern','Shared Room Bills Incl.','Double Shared Near Tram','Colocation Professionals','Shared Suite Fully Furnished'],
    'master-bedroom': ['Master Suite with Ensuite','Luxury Master Bedroom','Master Room with Terrace','King Size Master Suite','Master Bedroom Garden View','Premium Master Room','Double Master with Storage','Master Suite Fully Furnished'],
    'studio':         ['Modern Self-Contained Studio','Furnished Studio City Centre','New Studio with Terrace','Compact Studio Near Metro','Luxury Studio Sea View','Studio with Mezzanine','Open-Plan Studio Modern','Serviced Studio Fully Equipped'],
    'ensuite-room':   ['Ensuite Room with Shower','Private En-Suite Modern','Ensuite Room Quiet Area','Large Ensuite Near University','Ensuite Suite with Desk','Budget Ensuite Room','Ensuite with Private Lounge','Premium En-Suite Fully Furnished'],
    'hotel':          ['Boutique Hotel Room Medina','Serviced Room Long Stay','Hotel Suite City Centre','Economy Hotel Room Clean','Deluxe Room with Breakfast','Extended Stay Hotel Room','Hotel Apartment Fully Serviced','Business Hotel Room Quiet'],
  }
  const locs   = ['Rabat, Agdal','Casablanca Centre','Marrakech, Gueliz','Rabat, Hay Riad','Tangier, Marina','Fès, Centre','Agadir Bord de Mer','Rabat, Souissi']
  const t      = titles[cat] || titles['single-room']
  const badges = ['Verified','New Listing','Exclusive','Verified','Verified','New Listing','Exclusive','Verified']
  return Array.from({length:count},(_,i)=>({
    id:        `${cat}-${i}`,
    title:     t[i%t.length],
    price:     800 + ((i*1373)%5000),
    unit:      cat === 'hotel' ? 'MAD/day' : 'MAD/mo',
    location:  locs[i%locs.length],
    area:      10 + ((i*7)%40),
    bath:      i%3===0 ? 1 : i%3===1 ? 2 : 1,
    balcony:   i%4===0,
    furnished: i%3 !== 0,
    image:     IMGS[i%IMGS.length],
    badge:     badges[i%badges.length],
    badge2:    i%3===0 ? undefined : (i%3===1 ? 'Furnished' : 'Bills Incl.'),
    diamond:   i%5===0,
  }))
}

function BadgeChip({ label }: { label: string }) {
  const isGreen = label === 'Furnished' || label === 'Bills Incl.' || label === 'Available'
  return (
    <span style={{ backgroundColor:isGreen?C.mint:'rgba(15,23,42,0.85)', color:'white', fontSize:'9px', fontWeight:800, padding:'3px 8px', borderRadius:'4px', letterSpacing:'0.08em', textTransform:'uppercase' as const }}>{label}</span>
  )
}

function RoomCard({ item, locale, view }: { item: ReturnType<typeof makeListings>[0]; locale: string; view: 'grid'|'list' }) {
  const [saved, setSaved] = useState(false)
  const [hov,   setHov  ] = useState(false)

  if (view === 'list') return (
    <Link href={`/${locale}/listing/${item.id}`} style={{ textDecoration:'none' }}>
      <article onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
        style={{ backgroundColor:'white', borderRadius:'16px', overflow:'hidden', boxShadow:hov?'0 12px 32px rgba(0,0,0,0.1)':'0 2px 8px rgba(0,0,0,0.05)', border:`1px solid ${hov?C.mint:'rgba(0,0,0,0.06)'}`, transition:'all 0.3s', display:'flex', cursor:'pointer', marginBottom:16 }}>
        <div style={{ position:'relative', width:220, flexShrink:0, overflow:'hidden' }}>
          <img src={item.image} alt={item.title} style={{ width:'100%', height:'100%', objectFit:'cover', transition:'transform 0.5s', transform:hov?'scale(1.05)':'scale(1)' }} />
          {item.diamond && <span style={{ position:'absolute', top:10, left:10, backgroundColor:C.mint, color:'white', fontSize:'8px', fontWeight:800, padding:'3px 8px', borderRadius:'4px', textTransform:'uppercase' as const }}>Diamond</span>}
        </div>
        <div style={{ padding:'20px 24px', flex:1, display:'flex', flexDirection:'column', justifyContent:'space-between' }}>
          <div>
            <div style={{ display:'flex', gap:6, marginBottom:8 }}>
              <BadgeChip label={item.badge} />
              {item.badge2 && <BadgeChip label={item.badge2} />}
            </div>
            <h3 style={{ ...CB, fontSize:'16px', color:hov?C.mint:C.ink, marginBottom:'6px', transition:'color 0.2s' }}>{item.title}</h3>
            <div style={{ display:'flex', alignItems:'center', gap:5, marginBottom:8 }}>
              <MapPin size={12} color={C.muted} /><span style={{ fontSize:'13px', color:C.muted, fontWeight:600 }}>{item.location}</span>
            </div>
            <div style={{ display:'flex', gap:16 }}>
              <span style={{ fontSize:'12px', color:'#475569', fontWeight:600, display:'flex', alignItems:'center', gap:4 }}><Maximize size={13} color={C.mint}/>{item.area}m²</span>
              <span style={{ fontSize:'12px', color:'#475569', fontWeight:600, display:'flex', alignItems:'center', gap:4 }}><Bath size={13} color={C.mint}/>{item.bath} bath</span>
              {item.balcony && <span style={{ fontSize:'12px', color:'#475569', fontWeight:600, display:'flex', alignItems:'center', gap:4 }}><Home size={13} color={C.mint}/>Balcony</span>}
              <span style={{ fontSize:'12px', color:'#475569', fontWeight:600 }}>{item.furnished?'🛋️ Furnished':'📦 Unfurnished'}</span>
            </div>
          </div>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginTop:14 }}>
            <div>
              <span style={{ ...CB, fontSize:'22px', color:C.mint }}>{item.price.toLocaleString()} </span>
              <span style={{ fontSize:'13px', color:C.muted, fontWeight:600 }}>{item.unit}</span>
            </div>
            <div style={{ display:'flex', gap:8 }}>
              <button onClick={e=>e.preventDefault()} style={{ padding:'9px 18px', borderRadius:100, backgroundColor:C.surface, color:C.ink, border:'none', fontSize:'13px', fontWeight:700, cursor:'pointer' }}>Message</button>
              <button onClick={e=>e.preventDefault()} style={{ padding:'9px 18px', borderRadius:100, backgroundColor:C.mint, color:'white', border:'none', fontSize:'13px', fontWeight:700, cursor:'pointer', display:'flex', alignItems:'center', gap:6 }}><Phone size={13}/>Contact</button>
            </div>
          </div>
        </div>
      </article>
    </Link>
  )

  return (
    <Link href={`/${locale}/listing/${item.id}`} style={{ textDecoration:'none' }}>
      <article onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
        style={{ backgroundColor:'white', borderRadius:'20px', overflow:'hidden', boxShadow:hov?'0 20px 48px rgba(0,0,0,0.13)':'0 2px 12px rgba(0,0,0,0.06)', border:`1px solid ${hov?C.mint:'rgba(0,0,0,0.06)'}`, transition:'all 0.3s', cursor:'pointer' }}>
        <div style={{ position:'relative', aspectRatio:'16/10', overflow:'hidden' }}>
          <img src={item.image} alt={item.title} style={{ width:'100%', height:'100%', objectFit:'cover', transition:'transform 0.6s', transform:hov?'scale(1.06)':'scale(1)' }} />
          <div style={{ position:'absolute', top:'12px', left:'12px', display:'flex', gap:'6px', flexWrap:'wrap' }}>
            <BadgeChip label={item.badge} />
            {item.badge2 && <BadgeChip label={item.badge2} />}
          </div>
          <button onClick={e=>{e.preventDefault();setSaved(!saved)}}
            style={{ position:'absolute', top:'10px', right:'10px', width:'34px', height:'34px', borderRadius:'50%', backgroundColor:'rgba(255,255,255,0.9)', border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', boxShadow:'0 2px 8px rgba(0,0,0,0.15)' }}>
            <Heart size={16} fill={saved?'#ef4444':'none'} color={saved?'#ef4444':'#6b7a76'} />
          </button>
          {item.diamond && (
            <div style={{ position:'absolute', bottom:'12px', left:'12px', background:`linear-gradient(135deg,${C.mint},${C.mintDk})`, padding:'4px 10px', borderRadius:'6px' }}>
              <span style={{ color:'white', fontSize:'10px', fontWeight:800 }}>💎 Diamond</span>
            </div>
          )}
          {item.furnished && (
            <div style={{ position:'absolute', bottom:'12px', right:'12px', backgroundColor:'rgba(22,29,27,0.75)', padding:'4px 10px', borderRadius:'6px', display:'flex', alignItems:'center', gap:4 }}>
              <Wifi size={10} color="white" />
              <span style={{ color:'white', fontSize:'10px', fontWeight:700 }}>Furnished</span>
            </div>
          )}
        </div>
        <div style={{ padding:'16px 18px' }}>
          <h3 style={{ ...CB, fontSize:'14px', color:hov?C.mint:C.ink, marginBottom:'6px', lineHeight:1.3, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' as const, transition:'color 0.2s' }}>{item.title}</h3>
          <div style={{ display:'flex', alignItems:'center', gap:'5px', marginBottom:'10px' }}>
            <MapPin size={12} color={C.muted} />
            <span style={{ fontSize:'12px', color:C.muted, fontWeight:600 }}>{item.location}</span>
          </div>
          <div style={{ display:'flex', gap:'12px', marginBottom:'12px', paddingTop:'10px', borderTop:'1px solid #f1f5f9', flexWrap:'wrap' }}>
            <span style={{ display:'flex', alignItems:'center', gap:'4px', fontSize:'11px', color:'#475569', fontWeight:600 }}><Maximize size={12} color={C.mint}/>{item.area}m²</span>
            <span style={{ display:'flex', alignItems:'center', gap:'4px', fontSize:'11px', color:'#475569', fontWeight:600 }}><Bath size={12} color={C.mint}/>{item.bath} bath</span>
            {item.balcony && <span style={{ display:'flex', alignItems:'center', gap:'4px', fontSize:'11px', color:'#475569', fontWeight:600 }}><Home size={12} color={C.mint}/>Balcony</span>}
          </div>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
            <div>
              <span style={{ ...CB, fontSize:'19px', color:C.mint }}>{item.price.toLocaleString()} </span>
              <span style={{ fontSize:'11px', color:C.muted, fontWeight:600 }}>{item.unit}</span>
            </div>
            <button onClick={e=>e.preventDefault()} style={{ display:'flex', alignItems:'center', gap:'5px', padding:'8px 14px', borderRadius:'100px', backgroundColor:C.ink, color:'white', border:'none', fontSize:'12px', fontWeight:700, cursor:'pointer', transition:'background 0.2s' }}
              onMouseEnter={e=>e.currentTarget.style.backgroundColor=C.mint}
              onMouseLeave={e=>e.currentTarget.style.backgroundColor=C.ink}>
              <Phone size={11}/> Contact
            </button>
          </div>
        </div>
      </article>
    </Link>
  )
}

export default function RoomSubPage() {
  const params  = useParams()
  const locale  = (params?.locale   as string) || 'en'
  const catSlug = (params?.category as string) || 'single-room'
  const data    = CAT_DATA[catSlug] || DEFAULT

  // Filters
  const [city,         setCity        ] = useState('Cities & Neighbourhoods')
  const [propFor,      setPropFor     ] = useState('Rent')
  const [priceRange,   setPriceRange  ] = useState('Any Price')
  const [beds,         setBeds        ] = useState('Any')
  const [baths,        setBaths       ] = useState('Any')
  const [furnish,      setFurnish     ] = useState<'All'|'Furnished'|'Unfurnished'>('All')
  const [seller,       setSeller      ] = useState<'All Sellers'|'SouKni Agencies'|'Verified Owners'>('All Sellers')
  const [view,         setView        ] = useState<'grid'|'list'>('grid')
  const [sort,         setSort        ] = useState('Popular')
  const [page,         setPage        ] = useState(1)
  const [showFilters,  setShowFilters ] = useState(false)
  const [keyword,      setKeyword     ] = useState('')

  const cities     = ['Cities & Neighbourhoods','Casablanca','Rabat','Marrakech','Tangier','Agadir','Fès','Meknès']
  const priceRanges= ['Any Price','Under 2,000 MAD','2,000 – 4,000 MAD','4,000 – 8,000 MAD','8,000+ MAD']
  const bedOpts    = ['Any','1','2','3','4+']
  const bathOpts   = ['Any','1','2','3+']

  const { fetchListings } = useListings()
  const [dbListings, setDbListings] = useState<any[]>([])
  useEffect(() => {
    const t = setTimeout(() => {
      fetchListings({ category: 'property', sortBy: 'newest', limit: 24 }).then(rows => setDbListings(rows || []))
    }, 400)
    return () => clearTimeout(t)
  }, [])
  function mapDbRowToCard(row: any) {
    return {
      id: row.id,
      title: row.title,
      price: (row.price || 0) / 100,
      unit: 'MAD/mo',
      location: row.city,
      area: 20,
      bath: 1,
      balcony: false,
      furnished: true,
      image: (row.images && row.images[0]) || IMGS[0],
      badge: row.badge || 'Verified',
      badge2: undefined as string | undefined,
      diamond: false,
    }
  }
  function priceInRange(itemPrice: number, rangeLabel: string) {
    if (!rangeLabel || rangeLabel.startsWith('Any')) return true
    const nums = rangeLabel.replace(/,/g, '').match(/\d+/g)?.map(Number) || []
    if (rangeLabel.includes('+')) return itemPrice >= nums[0]
    if (rangeLabel.startsWith('Under')) return itemPrice <= nums[0]
    if (nums.length === 2) return itemPrice >= nums[0] && itemPrice <= nums[1]
    return true
  }

  const hasRealData = dbListings.length > 0
  const allListings = hasRealData ? dbListings.map(mapDbRowToCard) : makeListings(catSlug, 24)
  const filteredListings = allListings.filter(l => {
    if (furnish === 'Furnished'   && !l.furnished) return false
    if (furnish === 'Unfurnished' &&  l.furnished) return false
    if (seller  === 'SouKni Agencies'    && !l.diamond)   return false
    if (seller  === 'Verified Owners'    && l.badge !== 'Verified') return false
    if (keyword.trim() && !l.title.toLowerCase().includes(keyword.toLowerCase()) && !l.location.toLowerCase().includes(keyword.toLowerCase())) return false
    if (city !== 'Cities & Neighbourhoods' && !l.location.toLowerCase().includes(city.toLowerCase())) return false
    if (!priceInRange(l.price, priceRange)) return false
    return true
  }).sort((a, b) => sort === 'Price: Low to High' ? a.price - b.price : sort === 'Price: High to Low' ? b.price - a.price : 0)
  const PAGE_SIZE = 12
  const totalPages = Math.max(1, Math.ceil(filteredListings.length / PAGE_SIZE))
  const clampedPage = Math.min(page, totalPages)
  const listings = filteredListings.slice((clampedPage - 1) * PAGE_SIZE, clampedPage * PAGE_SIZE)

  useEffect(() => { setPage(1) }, [keyword, city, priceRange, furnish, seller, sort])

  return (
    <div style={{ fontFamily:"'Inter',sans-serif", backgroundColor:C.surface, minHeight:'100vh' }}>

      {/* HERO */}
      <section style={{ position:'relative', height:460, overflow:'hidden', display:'flex', alignItems:'center', justifyContent:'center' }}>
        <img src={data.hero} alt={data.label} style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover' }} />
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top, rgba(15,23,42,0.92) 0%, rgba(15,23,42,0.35) 60%, rgba(15,23,42,0.1) 100%)' }} />
        <div style={{ position:'relative', zIndex:10, textAlign:'center', padding:'0 24px', maxWidth:760, width:'100%' }}>
          <p style={{ fontSize:11, fontWeight:800, color:C.mint, textTransform:'uppercase', letterSpacing:'0.2em', marginBottom:14 }}>Property › Rooms for Rent</p>
          <h1 style={{ ...UB, fontSize:'clamp(34px,5.5vw,62px)', color:'white', lineHeight:0.95, marginBottom:12, textTransform:'uppercase' }}>
            FIND YOUR<br/><span style={{ color:C.mint }}>{data.label}</span>.
          </h1>
          <p style={{ fontSize:15, color:'rgba(255,255,255,0.7)', marginBottom:28, lineHeight:1.6 }}>{data.desc}</p>
          {/* Compact hero search */}
          <div style={{ display:'flex', alignItems:'stretch', backgroundColor:'rgba(255,255,255,0.12)', backdropFilter:'blur(24px)', border:'1px solid rgba(255,255,255,0.22)', borderRadius:100, overflow:'hidden', maxWidth:640, margin:'0 auto' }}>
            <div style={{ display:'flex', flexDirection:'column', padding:'12px 20px', flex:'0 0 150px', borderRight:'1px solid rgba(255,255,255,0.15)', gap:1 }}>
              <span style={{ fontSize:8, fontWeight:800, color:'rgba(255,255,255,0.5)', textTransform:'uppercase', letterSpacing:'0.12em' }}>City</span>
              <select value={city} onChange={e=>setCity(e.target.value)} style={{ backgroundColor:'transparent', border:'none', outline:'none', fontSize:13, fontWeight:700, color:'white', fontFamily:"'Inter',sans-serif", cursor:'pointer' }}>
                {cities.map(c=><option key={c} style={{ color:C.ink }}>{c}</option>)}
              </select>
            </div>
            <div style={{ display:'flex', flexDirection:'column', padding:'12px 20px', flex:1, borderRight:'1px solid rgba(255,255,255,0.15)', gap:1 }}>
              <span style={{ fontSize:8, fontWeight:800, color:'rgba(255,255,255,0.5)', textTransform:'uppercase', letterSpacing:'0.12em' }}>Keyword</span>
              <input value={keyword} onChange={e=>setKeyword(e.target.value)} placeholder="Search neighbourhood, building..." style={{ backgroundColor:'transparent', border:'none', outline:'none', fontSize:13, fontWeight:600, color:'white', fontFamily:"'Inter',sans-serif", padding:0 }} />
            </div>
            <button style={{ backgroundColor:C.mint, color:'white', border:'none', padding:'0 28px', fontWeight:800, fontSize:14, cursor:'pointer', flexShrink:0, transition:'background 0.15s', display:'flex', alignItems:'center', gap:6 }}
              onMouseEnter={e=>e.currentTarget.style.backgroundColor=C.mintDk}
              onMouseLeave={e=>e.currentTarget.style.backgroundColor=C.mint}>
              <Search size={15}/> SEARCH
            </button>
          </div>
        </div>
      </section>

      {/* RICH FILTER BAR — matching the apartments screenshot */}
      <div style={{ backgroundColor:'white', borderBottom:'1px solid rgba(186,202,197,0.3)', boxShadow:'0 4px 24px rgba(0,0,0,0.06)', position:'sticky', top:0, zIndex:40 }}>
        <div style={{ maxWidth:1440, margin:'0 auto', padding:'0 40px', display:'flex', alignItems:'center', gap:0, height:72 }}>
          {[
            { label:'LOCATION',      content:<select value={city} onChange={e=>setCity(e.target.value)} style={{ border:'none', outline:'none', fontSize:14, fontWeight:700, color:C.ink, fontFamily:"'Inter',sans-serif", backgroundColor:'transparent', cursor:'pointer', maxWidth:160 }}>{cities.map(c=><option key={c}>{c}</option>)}</select> },
            { label:'PROPERTY FOR',  content:<select value={propFor} onChange={e=>setPropFor(e.target.value)} style={{ border:'none', outline:'none', fontSize:14, fontWeight:700, color:C.ink, fontFamily:"'Inter',sans-serif", backgroundColor:'transparent', cursor:'pointer' }}>{['Rent','Buy or Sell'].map(o=><option key={o}>{o}</option>)}</select> },
            { label:'PROPERTY TYPE', content:<span style={{ fontSize:14, fontWeight:700, color:C.ink }}>All {data.label}s</span> },
            { label:'PRICE RANGE',   content:<select value={priceRange} onChange={e=>setPriceRange(e.target.value)} style={{ border:'none', outline:'none', fontSize:14, fontWeight:700, color:C.ink, fontFamily:"'Inter',sans-serif", backgroundColor:'transparent', cursor:'pointer' }}>{priceRanges.map(o=><option key={o}>{o}</option>)}</select> },
            { label:'BEDS',          content:<select value={beds} onChange={e=>setBeds(e.target.value)} style={{ border:'none', outline:'none', fontSize:14, fontWeight:700, color:C.ink, fontFamily:"'Inter',sans-serif", backgroundColor:'transparent', cursor:'pointer' }}>{bedOpts.map(o=><option key={o}>{o}</option>)}</select> },
            { label:'FILTERS',       content:<select value={baths} onChange={e=>setBaths(e.target.value)} style={{ border:'none', outline:'none', fontSize:14, fontWeight:700, color:C.ink, fontFamily:"'Inter',sans-serif", backgroundColor:'transparent', cursor:'pointer' }}>{bathOpts.map(o=><option key={o} style={{ color:C.ink }}>Bath: {o}</option>)}</select> },
          ].map((f,i,arr)=>(
            <div key={f.label} style={{ flex:1, padding:'0 18px', borderRight:i<arr.length-1?'1px solid rgba(186,202,197,0.25)':'none', display:'flex', flexDirection:'column', gap:2, height:'100%', justifyContent:'center' }}>
              <span style={{ fontSize:9, textTransform:'uppercase', fontWeight:800, color:C.muted, letterSpacing:'0.1em' }}>{f.label}</span>
              {f.content}
            </div>
          ))}
          <button style={{ backgroundColor:C.mint, color:'white', border:'none', padding:'12px 28px', borderRadius:100, cursor:'pointer', fontWeight:800, fontSize:14, flexShrink:0, marginLeft:12, display:'flex', alignItems:'center', gap:8, whiteSpace:'nowrap' }}
            onMouseEnter={e=>e.currentTarget.style.backgroundColor=C.mintDk}
            onMouseLeave={e=>e.currentTarget.style.backgroundColor=C.mint}>
            <Search size={16}/> SEARCH
          </button>
        </div>
      </div>

      <div style={{ maxWidth:1440, margin:'0 auto', padding:'32px 40px 80px' }}>

        {/* BREADCRUMB */}
        <Breadcrumb
          items={[
            { label:'Home', href:`/${locale}` },
            { label:'Property', href:`/${locale}/property` },
            { label:'For Rent', href:`/${locale}/property/for-rent` },
            { label:'Rooms', href:`/${locale}/property/rooms` },
            { label:data.label },
          ]}
          mutedColor={C.muted}
          inkColor={C.ink}
          style={{ marginBottom:20 }}
        />

        {/* TITLE + SORT */}
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', gap:16, marginBottom:20, flexWrap:'wrap' }}>
          <div>
            <h1 style={{ ...UB, fontSize:'clamp(22px,3vw,32px)', color:C.ink, marginBottom:4 }}>{data.label} for Rent in Morocco</h1>
            <p style={{ fontSize:15, color:C.mint, fontWeight:700 }}>{data.count} Ads</p>
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:10 }}>
            <select value={sort} onChange={e=>setSort(e.target.value)}
              style={{ padding:'9px 18px', borderRadius:100, border:'1px solid rgba(186,202,197,0.4)', backgroundColor:'white', fontSize:12, fontWeight:700, color:C.ink, cursor:'pointer', fontFamily:"'Inter',sans-serif" }}>
              <option>Popular</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
            </select>
            <button style={{ padding:'9px 18px', borderRadius:100, border:'1px solid rgba(186,202,197,0.4)', backgroundColor:'white', fontSize:12, fontWeight:700, color:C.ink, cursor:'pointer', fontFamily:"'Inter',sans-serif" }}>
              🔖 Save Search
            </button>
          </div>
        </div>

        {/* SUBCATEGORY PILLS */}
        <div style={{ display:'flex', gap:10, flexWrap:'wrap', marginBottom:20 }}>
          {ALL_CATS.map(cat=>(
            <Link key={cat.slug} href={`/${locale}/property/rooms/${cat.slug}`}
              style={{ padding:'9px 20px', borderRadius:100, fontSize:11, fontWeight:900, border:`1.5px solid ${catSlug===cat.slug?C.mint:'rgba(186,202,197,0.4)'}`, backgroundColor:catSlug===cat.slug?C.mint:'white', color:catSlug===cat.slug?'white':C.muted, textDecoration:'none', transition:'all 0.15s', display:'inline-block', fontFamily:"'Inter',sans-serif", textTransform:'uppercase', letterSpacing:'0.06em' }}
              onMouseEnter={e=>{if(catSlug!==cat.slug){(e.currentTarget as HTMLElement).style.borderColor=C.mint;(e.currentTarget as HTMLElement).style.color=C.ink}}}
              onMouseLeave={e=>{if(catSlug!==cat.slug){(e.currentTarget as HTMLElement).style.borderColor='rgba(186,202,197,0.4)';(e.currentTarget as HTMLElement).style.color=C.muted}}}
            >{cat.label}</Link>
          ))}
          <Link href={`/${locale}/property/rooms`}
            style={{ padding:'9px 20px', borderRadius:100, fontSize:11, fontWeight:900, border:'1.5px solid rgba(186,202,197,0.4)', backgroundColor:'white', color:C.muted, textDecoration:'none', fontFamily:"'Inter',sans-serif", textTransform:'uppercase', letterSpacing:'0.06em' }}>
            + View More
          </Link>
        </div>

        {/* SELLER TABS + FURNISHED TOGGLE + GRID TOGGLE */}
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:12, marginBottom:24 }}>
          {/* Left: Seller tabs */}
          <div style={{ display:'flex', gap:4, padding:'4px', backgroundColor:'#e8efec', borderRadius:100 }}>
            {(['All Sellers','SouKni Agencies','Verified Owners'] as const).map(tab=>(
              <button key={tab} onClick={()=>setSeller(tab)}
                style={{ padding:'9px 20px', borderRadius:100, fontSize:11, fontWeight:900, border:'none', cursor:'pointer', fontFamily:"'Inter',sans-serif", textTransform:'uppercase', letterSpacing:'0.06em', transition:'all 0.2s',
                  backgroundColor:seller===tab?C.ink:'transparent', color:seller===tab?'white':C.muted, boxShadow:seller===tab?'0 2px 8px rgba(0,0,0,0.15)':'none' }}>
                {tab}
              </button>
            ))}
          </div>

          {/* Right: Furnished filter + Grid toggle */}
          <div style={{ display:'flex', alignItems:'center', gap:12 }}>
            <div style={{ display:'flex', gap:6 }}>
              {(['All','Furnished','Unfurnished'] as const).map(f=>(
                <button key={f} onClick={()=>setFurnish(f)}
                  style={{ padding:'8px 18px', borderRadius:100, fontSize:12, fontWeight:700, border:`1.5px solid ${furnish===f?C.mint:'rgba(186,202,197,0.4)'}`, backgroundColor:furnish===f?C.mint:'white', color:furnish===f?'white':C.muted, cursor:'pointer', transition:'all 0.15s', fontFamily:"'Inter',sans-serif" }}>
                  {f}
                </button>
              ))}
            </div>
            {/* Grid/List toggle */}
            <div style={{ display:'flex', gap:2, padding:'3px', backgroundColor:'white', borderRadius:10, border:'1px solid rgba(186,202,197,0.3)' }}>
              <button onClick={()=>setView('grid')} title="Grid view"
                style={{ width:36, height:36, borderRadius:8, border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', backgroundColor:view==='grid'?C.ink:'transparent', transition:'all 0.2s' }}>
                <LayoutGrid size={16} color={view==='grid'?'white':C.muted} />
              </button>
              <button onClick={()=>setView('list')} title="List view"
                style={{ width:36, height:36, borderRadius:8, border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', backgroundColor:view==='list'?C.ink:'transparent', transition:'all 0.2s' }}>
                <List size={16} color={view==='list'?'white':C.muted} />
              </button>
            </div>
          </div>
        </div>

        {/* RESULTS COUNT */}
        <p style={{ fontSize:13, color:C.muted, fontWeight:600, marginBottom:20 }}>
          Showing {filteredListings.length} of {data.count} {data.label.toLowerCase()}s
          {furnish !== 'All' ? ` · ${furnish}` : ''}
          {seller !== 'All Sellers' ? ` · ${seller}` : ''}
        </p>

        {/* LISTINGS */}
        {listings.length > 0 ? (
          view === 'grid' ? (
            <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:24, marginBottom:48 }}>
              {listings.map(item => <RoomCard key={item.id} item={item} locale={locale} view="grid" />)}
            </div>
          ) : (
            <div style={{ marginBottom:48 }}>
              {listings.map(item => <RoomCard key={item.id} item={item} locale={locale} view="list" />)}
            </div>
          )
        ) : (
          <div style={{ textAlign:'center', padding:'80px 0' }}>
            <p style={{ fontSize:18, fontWeight:700, color:C.muted, marginBottom:16 }}>No results found for current filters.</p>
            <button onClick={()=>{ setFurnish('All'); setSeller('All Sellers') }}
              style={{ padding:'12px 28px', borderRadius:100, backgroundColor:C.mint, color:'white', border:'none', fontSize:14, fontWeight:700, cursor:'pointer' }}>
              Clear Filters
            </button>
          </div>
        )}

        {/* PAGINATION */}
        <div style={{ display:'flex', justifyContent:'center', alignItems:'center', gap:10, marginBottom:64 }}>
          <button onClick={()=>setPage(Math.max(1,clampedPage-1))} disabled={clampedPage<=1} style={{ width:'44px', height:'44px', borderRadius:'12px', backgroundColor:'white', border:'1px solid rgba(107,122,118,0.12)', cursor:clampedPage<=1?'not-allowed':'pointer', opacity:clampedPage<=1?0.4:1, display:'flex', alignItems:'center', justifyContent:'center', color:C.muted }}><ChevronLeft size={18}/></button>
          {Array.from({length:totalPages},(_,i)=>i+1).map(p=>(
            <button key={p} onClick={()=>setPage(p)} style={{ width:'44px', height:'44px', borderRadius:'12px', cursor:'pointer', fontSize:'15px', fontWeight:900, border:'1px solid', transition:'all 0.2s', backgroundColor:clampedPage===p?C.mint:'white', color:clampedPage===p?'white':C.muted, borderColor:clampedPage===p?C.mint:'rgba(107,122,118,0.12)', fontFamily:"'Inter',sans-serif" }}>{p}</button>
          ))}
          <button onClick={()=>setPage(Math.min(totalPages,clampedPage+1))} disabled={clampedPage>=totalPages} style={{ width:'44px', height:'44px', borderRadius:'12px', backgroundColor:'white', border:'1px solid rgba(107,122,118,0.12)', cursor:clampedPage>=totalPages?'not-allowed':'pointer', opacity:clampedPage>=totalPages?0.4:1, display:'flex', alignItems:'center', justifyContent:'center', color:C.muted }}><ChevronRight size={18}/></button>
        </div>

        {/* NAVIGATION FOOTER — always visible, easy page-to-page travel */}
        <div style={{ borderTop:'1px solid rgba(186,202,197,0.3)', paddingTop:40, marginBottom:40 }}>
          <p style={{ fontSize:12, fontWeight:800, color:C.muted, textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:20, textAlign:'center' }}>Explore More Room Types</p>
          <div style={{ display:'flex', gap:10, justifyContent:'center', flexWrap:'wrap', marginBottom:24 }}>
            {ALL_CATS.filter(c=>c.slug!==catSlug).map(cat=>(
              <Link key={cat.slug} href={`/${locale}/property/rooms/${cat.slug}`}
                style={{ padding:'10px 22px', borderRadius:100, fontSize:12, fontWeight:900, border:`1.5px solid rgba(186,202,197,0.4)`, backgroundColor:'white', color:C.muted, textDecoration:'none', transition:'all 0.2s', fontFamily:"'Inter',sans-serif", textTransform:'uppercase', letterSpacing:'0.06em' }}
                onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.borderColor=C.mint;(e.currentTarget as HTMLElement).style.color=C.mint}}
                onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.borderColor='rgba(186,202,197,0.4)';(e.currentTarget as HTMLElement).style.color=C.muted}}>
                {cat.label}
              </Link>
            ))}
          </div>

          {/* Back buttons — easy navigation */}
          <div style={{ display:'flex', gap:10, justifyContent:'center', flexWrap:'wrap' }}>
            <Link href={`/${locale}/property/rooms`}
              style={{ padding:'12px 28px', borderRadius:100, backgroundColor:C.surface, color:C.ink, border:`1.5px solid rgba(186,202,197,0.4)`, textDecoration:'none', fontSize:13, fontWeight:900, fontFamily:"'Inter',sans-serif", transition:'all 0.2s', display:'flex', alignItems:'center', gap:6 }}
              onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.borderColor=C.mint}}
              onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.borderColor='rgba(186,202,197,0.4)'}}>
              <ChevronLeft size={14}/> All Rooms
            </Link>
            <Link href={`/${locale}/property/for-rent`}
              style={{ padding:'12px 28px', borderRadius:100, backgroundColor:C.surface, color:C.ink, border:`1.5px solid rgba(186,202,197,0.4)`, textDecoration:'none', fontSize:13, fontWeight:900, fontFamily:"'Inter',sans-serif", transition:'all 0.2s', display:'flex', alignItems:'center', gap:6 }}
              onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.borderColor=C.mint}}
              onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.borderColor='rgba(186,202,197,0.4)'}}>
              <ChevronLeft size={14}/> For Rent
            </Link>
            <Link href={`/${locale}/property`}
              style={{ padding:'12px 28px', borderRadius:100, backgroundColor:C.surface, color:C.ink, border:`1.5px solid rgba(186,202,197,0.4)`, textDecoration:'none', fontSize:13, fontWeight:900, fontFamily:"'Inter',sans-serif", transition:'all 0.2s', display:'flex', alignItems:'center', gap:6 }}
              onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.borderColor=C.mint}}
              onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.borderColor='rgba(186,202,197,0.4)'}}>
              <ChevronLeft size={14}/> Property Hub
            </Link>
            <Link href={`/${locale}`}
              style={{ padding:'12px 28px', borderRadius:100, backgroundColor:C.ink, color:'white', border:'none', textDecoration:'none', fontSize:13, fontWeight:900, fontFamily:"'Inter',sans-serif", transition:'background 0.2s', display:'flex', alignItems:'center', gap:6 }}
              onMouseEnter={e=>(e.currentTarget as HTMLElement).style.backgroundColor=C.mint}
              onMouseLeave={e=>(e.currentTarget as HTMLElement).style.backgroundColor=C.ink}>
              <ChevronLeft size={14}/> Home
            </Link>
          </div>
        </div>

      </div>
    </div>
  )
}
