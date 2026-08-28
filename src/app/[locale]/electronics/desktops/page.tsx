'use client'

import { useState, useEffect } from 'react'
import React from 'react'
import { Heart, Search, ChevronDown, ChevronLeft, ChevronRight, SlidersHorizontal, MapPin, Plus } from 'lucide-react'
import Link from 'next/link'
import { useListings } from '@/hooks/useListings'
import Breadcrumb from '@/components/ui/Breadcrumb'
import CategoryFooterNav from '@/components/ui/CategoryFooterNav'
import WhatsAppButton from '@/components/ui/WhatsAppButton'
import MessageSellerButton from '@/components/ui/MessageSellerButton'
import { useFavorites } from '@/hooks/useFavorites'

const C = { mint:'#22d4a8', mintDk:'#0f9b8e', ink:'#161d1b', surface:'#f4fbf8', cream:'#f5ede0', muted:'#6b7a76' }
const UB: React.CSSProperties = { fontFamily:'Inter,sans-serif', fontWeight:900, letterSpacing:'-0.05em' }
const CB: React.CSSProperties = { fontFamily:"'Hanken Grotesk',sans-serif", fontWeight:900, letterSpacing:'-0.03em' }

const I = {
  hero:   'https://images.pexels.com/photos/1029757/pexels-photo-1029757.jpeg?auto=compress&w=1600',
  g1:     'https://images.pexels.com/photos/1029757/pexels-photo-1029757.jpeg?auto=compress&w=400',
  g2:     'https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&w=400',
  g3:     'https://images.pexels.com/photos/1298601/pexels-photo-1298601.jpeg?auto=compress&w=400',
  g4:     'https://images.pexels.com/photos/2115256/pexels-photo-2115256.jpeg?auto=compress&w=400',
  g5:     'https://images.pexels.com/photos/1029757/pexels-photo-1029757.jpeg?auto=compress&w=400',
  bento1: 'https://images.pexels.com/photos/1029757/pexels-photo-1029757.jpeg?auto=compress&w=900',
  bento2: 'https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&w=600',
  bento3: 'https://images.pexels.com/photos/1298601/pexels-photo-1298601.jpeg?auto=compress&w=600',
  bento4: 'https://images.pexels.com/photos/2115256/pexels-photo-2115256.jpeg?auto=compress&w=600',
  auto:   'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&w=1200',
}

type BadgeT = 'certified'|'diamond'|'featured'|'new'
function Badge({ type }: { type: BadgeT }) {
  const map: Record<BadgeT,{bg:string;color:string;label:string}> = {
    certified:{ bg:C.mint, color:C.ink, label:'SouKni Certified' }, diamond:{ bg:C.ink, color:C.mint, label:'◆ DIAMOND' },
    featured:{ bg:'#fbbf24', color:C.ink, label:'Featured' }, new:{ bg:C.mintDk, color:'white', label:'New Arrival' },
  }
  const s = map[type]
  return <span style={{ backgroundColor:s.bg, color:s.color, fontSize:'8px', ...CB, padding:'4px 10px', borderRadius:'6px', textTransform:'uppercase' as const, letterSpacing:'0.08em', display:'inline-block', boxShadow:'0 2px 6px rgba(0,0,0,0.15)', whiteSpace:'nowrap' as const }}>{s.label}</span>
}

function FeaturedCard({ id, brand, title, price, location, img, badges, condition, phone, sellerId }: any) {
  const [hov, setHov] = useState(false)
  const { isFavorited, toggleFavorite } = useFavorites()
  const saved = isFavorited(id)
  return (
    <div onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{ backgroundColor:'white', borderRadius:'24px', border:`1px solid ${hov?C.mint:'rgba(107,122,118,0.1)'}`, boxShadow:hov?`0 20px 40px ${C.mint}18`:'0 2px 8px rgba(0,0,0,0.04)', overflow:'hidden', transition:'all 0.3s', cursor:'pointer' }}>
      <div style={{ position:'relative', aspectRatio:'1/1', overflow:'hidden', backgroundColor:C.cream }}>
        <img src={img} alt={title} style={{ width:'100%', height:'100%', objectFit:'cover', transition:'transform 0.7s', transform:hov?'scale(1.1)':'scale(1)' }} />
        <div style={{ position:'absolute', top:'12px', left:'12px', display:'flex', flexDirection:'column' as const, gap:'5px' }}>
          {badges?.map((b:string)=><Badge key={b} type={b as BadgeT} />)}
        </div>
        <button onClick={e=>{e.stopPropagation();toggleFavorite(id)}} style={{ position:'absolute', top:'10px', right:'10px', width:'32px', height:'32px', borderRadius:'50%', backgroundColor:'rgba(255,255,255,0.85)', border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}>
          <Heart size={14} fill={saved?'#ef4444':'none'} color={saved?'#ef4444':C.muted} />
        </button>
        {condition && <div style={{ position:'absolute', bottom:'10px', left:'10px', backgroundColor:'rgba(255,255,255,0.92)', padding:'3px 8px', borderRadius:'6px', fontSize:'9px', ...CB, color:C.mintDk, textTransform:'uppercase' as const }}>{condition}</div>}
      </div>
      <div style={{ padding:'18px 20px' }}>
        <p style={{ fontSize:'9px', ...CB, color:C.mint, textTransform:'uppercase' as const, letterSpacing:'0.1em', marginBottom:'3px' }}>{brand}</p>
        <h4 style={{ fontSize:'14px', ...CB, color:hov?C.mint:C.ink, marginBottom:'4px', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' as const }}>{title}</h4>
        <p style={{ fontSize:'20px', ...CB, color:C.mint, marginBottom:'4px' }}>{price.toLocaleString()} MAD</p>
        {location && <p style={{ fontSize:'10px', color:C.muted, ...CB, display:'flex', alignItems:'center', gap:'3px', marginBottom:'14px' }}><MapPin size={10}/>{location}</p>}
        <div style={{ display:'flex', gap:'8px' }}>
          <MessageSellerButton listingId={id} sellerId={sellerId} style={{ flex:1, border:`2px solid ${C.mint}`, color:C.ink, backgroundColor:'transparent', padding:'10px', borderRadius:'12px', fontSize:'10px', ...CB, textTransform:'uppercase' as const }}>Message</MessageSellerButton>
          <WhatsAppButton phone={phone} title={title} style={{ flex:1, padding:'10px', borderRadius:'12px', fontSize:'10px', ...CB, textTransform:'uppercase' as const }}>💬 WhatsApp</WhatsAppButton>
        </div>
      </div>
    </div>
  )
}

function GridCard({ id, brand, title, price, img, badge, condition, phone, sellerId }: any) {
  const { isFavorited, toggleFavorite } = useFavorites()
  const saved = isFavorited(id)
  const [hov, setHov] = useState(false)
  return (
    <div onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{ backgroundColor:'white', borderRadius:'28px', border:`1px solid ${hov?C.mint:'rgba(107,122,118,0.1)'}`, boxShadow:hov?`0 16px 40px ${C.mint}18`:'0 2px 8px rgba(0,0,0,0.04)', overflow:'hidden', transition:'all 0.3s', cursor:'pointer' }}>
      <div style={{ position:'relative', aspectRatio:'1/1', overflow:'hidden', backgroundColor:C.cream }}>
        <img src={img} alt={title} style={{ width:'100%', height:'100%', objectFit:'cover', transition:'transform 0.7s', transform:hov?'scale(1.1)':'scale(1)' }} />
        <div style={{ position:'absolute', top:'10px', left:'10px' }}><Badge type={badge as BadgeT} /></div>
        <button onClick={e=>{e.stopPropagation();toggleFavorite(id)}} style={{ position:'absolute', top:'8px', right:'8px', width:'28px', height:'28px', borderRadius:'50%', backgroundColor:'rgba(255,255,255,0.85)', border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}>
          <Heart size={12} fill={saved?'#ef4444':'none'} color={saved?'#ef4444':C.muted} />
        </button>
        {condition && <div style={{ position:'absolute', bottom:'8px', left:'8px', backgroundColor:'rgba(255,255,255,0.92)', padding:'2px 6px', borderRadius:'5px', fontSize:'8px', ...CB, color:C.mintDk, textTransform:'uppercase' as const }}>{condition}</div>}
      </div>
      <div style={{ padding:'14px 16px' }}>
        <p style={{ fontSize:'9px', ...CB, color:C.muted, textTransform:'uppercase' as const, letterSpacing:'0.08em', marginBottom:'2px' }}>{brand}</p>
        <h4 style={{ fontSize:'12px', ...CB, color:hov?C.mint:C.ink, marginBottom:'8px', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' as const }}>{title}</h4>
        <p style={{ fontSize:'14px', ...CB, color:C.mint, marginBottom:'10px' }}>{price.toLocaleString()} MAD</p>
        <div style={{ display:'flex', gap:'6px' }}>
          <MessageSellerButton listingId={id} sellerId={sellerId} style={{ flex:1, border:`1px solid rgba(107,122,118,0.2)`, color:C.muted, backgroundColor:'transparent', padding:'7px', borderRadius:'10px', fontSize:'9px', ...CB, textTransform:'uppercase' as const }}>Message</MessageSellerButton>
          <WhatsAppButton phone={phone} title={title} style={{ flex:1, backgroundColor:C.mint, color:C.ink, padding:'7px', borderRadius:'10px', fontSize:'9px', ...CB, textTransform:'uppercase' as const }} />
        </div>
      </div>
    </div>
  )
}

const featuredItems = [
  { brand:'Apple', title:'Mac Studio M2 Ultra 128GB', price:52000, location:'Rabat, Agdal', img:I.g1, badges:['featured','diamond'], condition:'New' },
  { brand:'Custom Build', title:'RTX 4090 Gaming Rig — Full Tower', price:34000, location:'Rabat, Souissi', img:I.g2, badges:['featured','certified'], condition:'New' },
  { brand:'Dell', title:'OptiPlex 7010 SFF i7 32GB', price:9800, location:'Rabat, Hassan', img:I.g3, badges:['featured','certified'], condition:'Like New' },
  { brand:'HP', title:'Omen 45L Gaming Desktop RTX 4080', price:26500, location:'Rabat, Hay Riad', img:I.g4, badges:['featured','new'], condition:'New' },
]

function makeGrid(count: number) {
  const brands = ['Apple','Dell','HP','Lenovo','Custom Build','ASUS','MSI','Acer','Corsair','NZXT']
  const titles = ['iMac 24" M3','OptiPlex 7010','Omen 45L Gaming','ThinkCentre M90','RTX 4070 Ti Build','ROG Strix G16CH','Aegis RS','Aspire TC','One a200','H7 Flow Build']
  const imgs = [I.g1,I.g2,I.g3,I.g4,I.g5]
  const conds = ['Like New','Excellent','Good','New',undefined]
  const badges: BadgeT[] = ['certified','diamond','featured','new','certified']
  return Array.from({length:count},(_,i)=>({
    brand: brands[i%brands.length], title: titles[i%titles.length], price: 4000 + ((i*2731)%48000),
    img: imgs[i%imgs.length], condition: conds[i%conds.length], badge: badges[i%badges.length],
  }))
}
const gridItems = makeGrid(16)

const CATS = [
  { label:'All Desktops', slug:'all-desktops' }, { label:'Apple', slug:'apple' }, { label:'Dell', slug:'dell' },
  { label:'HP', slug:'hp' }, { label:'Lenovo', slug:'lenovo' }, { label:'Custom Build', slug:'custom-build' }, { label:'ASUS', slug:'asus' }, { label:'MSI', slug:'msi' },
]

export default function DesktopsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = React.use(params)

  const { fetchListings } = useListings()
  const [dbListings, setDbListings] = useState<any[]>([])

  useEffect(() => {
    const t = setTimeout(() => {
      fetchListings({ category: 'electronics', sortBy: 'newest', limit: 20 }).then(rows => setDbListings(rows || []))
    }, 400)
    return () => clearTimeout(t)
  }, [])

  const VALID_BADGES = ['certified', 'diamond', 'featured', 'new']
  const realFeatured = dbListings.slice(0, 4).map(row => ({
    id: row.id,
    sellerId: row.seller_id,
    brand: row.brand || '',
    title: row.title,
    price: (row.price || 0) / 100,
    location: row.city || '',
    img: (row.images && row.images[0]) || I.g1,
    badges: row.badge && VALID_BADGES.includes(row.badge) ? [row.badge] : [],
    condition: row.condition || undefined,
    phone: row.profiles?.phone,
  }))
  const realGrid = dbListings.slice(4, 20).map(row => ({
    id: row.id,
    sellerId: row.seller_id,
    brand: row.brand || '',
    title: row.title,
    price: (row.price || 0) / 100,
    img: (row.images && row.images[0]) || I.g1,
    badge: (row.badge && VALID_BADGES.includes(row.badge) ? row.badge : 'certified') as BadgeT,
    condition: row.condition || undefined,
    phone: row.profiles?.phone,
  }))
  const hasRealData = dbListings.length >= 4
  const displayFeaturedAll = hasRealData ? realFeatured : featuredItems
  const displayGridAll = hasRealData ? realGrid : gridItems
  const [activeSeller, setActiveSeller] = useState('All Sellers')
  const [diamond, setDiamond] = useState(true)
  const [gridView, setGridView] = useState(true)
  const [page, setPage] = useState(1)
  const [keyword, setKeyword] = useState('')
  const [applied, setApplied] = useState({ keyword: '' })
  const [city, setCity] = useState('Rabat')
  const [neighborhood, setNeighborhood] = useState('All Neighborhoods')
  const [price, setPrice] = useState('Any Price')
  const [cityOpen, setCityOpen] = useState(false)
  const [neighOpen, setNeighOpen] = useState(false)
  const [priceOpen, setPriceOpen] = useState(false)

  const cities = ['Rabat','Casablanca','Marrakech','Fès','Tanger','Agadir','Meknès']
  const neighborhoods = ['All Neighborhoods','Agdal','Souissi','Hay Riad','Hassan','Médina','Océan']
  const priceRanges = ['Any Price','0 – 5,000 MAD','5,000 – 15,000 MAD','15,000 – 30,000 MAD','30,000 – 50,000 MAD','50,000+ MAD']

  function priceInRange(itemPrice: number, rangeLabel: string) {
    if (!rangeLabel || rangeLabel.startsWith('Any')) return true
    const nums = rangeLabel.replace(/,/g, '').match(/\d+/g)?.map(Number) || []
    if (rangeLabel.includes('+')) return itemPrice >= nums[0]
    if (nums.length === 2) return itemPrice >= nums[0] && itemPrice <= nums[1]
    return true
  }

  const applySearch = () => setApplied({ keyword })
  const matchesFilters = (item: any) =>
    (!applied.keyword.trim() ||
      (item.title || '').toLowerCase().includes(applied.keyword.toLowerCase()) ||
      (item.brand || '').toLowerCase().includes(applied.keyword.toLowerCase())) &&
    (!city || (item.location || '').toLowerCase().includes(city.toLowerCase())) &&
    priceInRange(item.price, price)
  const displayFeatured = displayFeaturedAll.filter(matchesFilters)
  const filteredGrid = displayGridAll.filter(matchesFilters)

  const PAGE_SIZE = 16
  const totalPages = Math.max(1, Math.ceil(filteredGrid.length / PAGE_SIZE))
  const displayGrid = filteredGrid.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  useEffect(() => { setPage(1) }, [applied, city, price])

  function DDrop({ label, value, options, open, setOpen, onChange }: any) {
    return (
      <div style={{ position:'relative', flex:1 }}>
        <button onClick={()=>{ setOpen(!open); setCityOpen(false); setNeighOpen(false); setPriceOpen(false) }}
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
                style={{ width:'100%', padding:'12px 20px', background:'none', border:'none', cursor:'pointer', textAlign:'left' as const, fontSize:'14px', ...UB, color:opt===value?C.mint:C.ink, display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                {opt}{opt===value&&<span style={{color:C.mint}}>✓</span>}</button>
            ))}
          </div>
        )}
      </div>
    )
  }

  return (
    <div style={{ ...UB, backgroundColor:C.surface, color:C.ink, minHeight:'100vh' }}>
      <section style={{ position:'relative', height:'520px', display:'flex', alignItems:'center', justifyContent:'center', overflow:'hidden' }}>
        <img src={I.hero} alt="Desktops" style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover' }} />
        <div style={{ position:'absolute', inset:0, backgroundColor:'rgba(22,29,27,0.52)' }} />
        <div style={{ position:'relative', zIndex:10, textAlign:'center' as const, maxWidth:'960px', padding:'0 24px', width:'100%' }}>
          <h1 style={{ fontSize:'clamp(36px,6vw,64px)', ...UB, color:'white', marginBottom:'36px', lineHeight:1, textShadow:'0 4px 20px rgba(0,0,0,0.4)' }}>
            DESKTOPS.<br/><span style={{ color:C.mint }}>POWER THAT STAYS.</span>
          </h1>
          <div style={{ maxWidth:'780px', margin:'0 auto', backgroundColor:'rgba(255,255,255,0.12)', backdropFilter:'blur(12px)', border:'1px solid rgba(255,255,255,0.22)', borderRadius:'100px', padding:'8px', display:'flex', alignItems:'center' }}>
            <div style={{ flex:1, padding:'0 28px', borderRight:'1px solid rgba(255,255,255,0.22)', display:'flex', flexDirection:'column' as const, gap:'2px' }}>
              <span style={{ fontSize:'9px', ...UB, color:'rgba(255,255,255,0.62)', textTransform:'uppercase' as const, letterSpacing:'0.15em' }}>CITY</span>
              <div style={{ display:'flex', alignItems:'center', gap:'6px', color:'white', fontSize:'14px', ...UB }}>Rabat <ChevronDown size={14} /></div>
            </div>
            <div style={{ flex:2, padding:'0 28px', display:'flex', flexDirection:'column' as const, gap:'2px' }}>
              <span style={{ fontSize:'9px', ...UB, color:'rgba(255,255,255,0.62)', textTransform:'uppercase' as const, letterSpacing:'0.15em' }}>KEYWORD</span>
              <input type="text" value={keyword} onChange={e=>setKeyword(e.target.value)} onKeyDown={e=>e.key==='Enter'&&applySearch()} placeholder="Search brands, builds, specs..."
                style={{ backgroundColor:'transparent', border:'none', outline:'none', color:'white', fontSize:'14px', ...UB, fontFamily:'Inter,sans-serif', width:'100%' }} />
            </div>
            <button onClick={applySearch} style={{ backgroundColor:C.mint, color:C.ink, border:'none', padding:'16px 44px', borderRadius:'100px', fontSize:'11px', ...UB, textTransform:'uppercase' as const, letterSpacing:'0.12em', cursor:'pointer' }}>SEARCH</button>
          </div>
        </div>
      </section>

      <div style={{ maxWidth:'1280px', margin:'-40px auto 0', padding:'0 24px', position:'relative', zIndex:30 }}>
        <div style={{ backgroundColor:'rgba(255,255,255,0.97)', backdropFilter:'blur(16px)', border:'1px solid rgba(107,122,118,0.12)', borderRadius:'100px', boxShadow:'0 12px 40px rgba(0,0,0,0.08)', display:'flex', alignItems:'stretch', height:'72px' }}>
          <DDrop label="CITY" value={city} options={cities} open={cityOpen} setOpen={setCityOpen} onChange={setCity} />
          <div style={{ width:'1px', backgroundColor:'rgba(107,122,118,0.12)', margin:'12px 0' }} />
          <div style={{ flex:1.8, padding:'0 22px', display:'flex', flexDirection:'column' as const, justifyContent:'center' }}>
            <span style={{ fontSize:'9px', ...UB, textTransform:'uppercase' as const, letterSpacing:'0.14em', color:C.muted, marginBottom:'3px' }}>KEYWORD</span>
            <div style={{ display:'flex', alignItems:'center', gap:'8px' }}>
              <Search size={13} color={C.muted} />
              <input type="text" value={keyword} onChange={e=>setKeyword(e.target.value)} onKeyDown={e=>e.key==='Enter'&&applySearch()} placeholder="e.g. iMac, RTX 4090, OptiPlex..."
                style={{ flex:1, background:'none', border:'none', outline:'none', fontSize:'14px', ...UB, color:C.ink, fontFamily:'Inter,sans-serif' }} />
              {keyword && <button onClick={()=>setKeyword('')} style={{ background:'none', border:'none', cursor:'pointer', color:C.muted, fontSize:'16px' }}>✕</button>}
            </div>
          </div>
          <div style={{ width:'1px', backgroundColor:'rgba(107,122,118,0.12)', margin:'12px 0' }} />
          <DDrop label="NEIGHBOURHOOD" value={neighborhood} options={neighborhoods} open={neighOpen} setOpen={setNeighOpen} onChange={setNeighborhood} />
          <div style={{ width:'1px', backgroundColor:'rgba(107,122,118,0.12)', margin:'12px 0' }} />
          <DDrop label="PRICE (MAD)" value={price} options={priceRanges} open={priceOpen} setOpen={setPriceOpen} onChange={setPrice} />
          <div style={{ width:'1px', backgroundColor:'rgba(107,122,118,0.12)', margin:'12px 0' }} />
          <button style={{ display:'flex', alignItems:'center', gap:'10px', padding:'0 28px', background:'none', border:'none', cursor:'pointer', borderRadius:'0 100px 100px 0', flexShrink:0 }}>
            <SlidersHorizontal size={18} color={C.mint} /><span style={{ fontSize:'14px', ...UB, color:C.ink }}>Filters</span>
          </button>
        </div>
      </div>

      <main style={{ maxWidth:'1280px', margin:'0 auto', padding:'32px 24px 80px' }}>
        <Breadcrumb
          items={[
            { label:'Rabat', href:`/${locale}` },
            { label:'Electronics', href:`/${locale}/electronics` },
            { label:'Desktops' },
          ]}
          mutedColor={C.muted}
          inkColor={C.ink}
        />
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', gap:'16px', marginBottom:'24px', flexWrap:'wrap' as const }}>
          <div>
            <h2 style={{ fontSize:'clamp(20px,2.5vw,28px)', ...UB, color:C.ink, marginBottom:'4px' }}>New and Pre-Owned Desktops in Rabat</h2>
            <p style={{ fontSize:'14px', color:C.mint, ...CB }}>2,640 Ads in Rabat District</p>
          </div>
          <div style={{ display:'flex', gap:'10px' }}>
            {['↕ Sort: Default','🔖 Save Search'].map(b=>(
              <button key={b} style={{ backgroundColor:'white', border:'1px solid rgba(107,122,118,0.18)', padding:'9px 16px', borderRadius:'12px', fontSize:'10px', ...UB, textTransform:'uppercase' as const, letterSpacing:'0.1em', cursor:'pointer', color:C.ink }}>{b}</button>
            ))}
          </div>
        </div>

        <div style={{ display:'flex', gap:'10px', flexWrap:'wrap' as const, marginBottom:'20px', alignItems:'center' }}>
          {CATS.map(cat=>(
            <Link key={cat.slug} href={`/${locale}/electronics/desktops/${cat.slug}`}
              style={{ padding:'10px 22px', borderRadius:'100px', fontSize:'11px', ...UB, textTransform:'uppercase' as const, letterSpacing:'0.1em', cursor:'pointer', border:'1px solid', textDecoration:'none', display:'inline-block',
                backgroundColor:'white', color:C.muted, borderColor:'rgba(186,202,197,0.4)' }}
              onMouseEnter={e=>{e.currentTarget.style.backgroundColor=C.mint;e.currentTarget.style.color=C.ink;e.currentTarget.style.borderColor=C.mint}}
              onMouseLeave={e=>{e.currentTarget.style.backgroundColor='white';e.currentTarget.style.color=C.muted;e.currentTarget.style.borderColor='rgba(186,202,197,0.4)'}}>
              {cat.label}
            </Link>
          ))}
          <button style={{ display:'flex', alignItems:'center', gap:'6px', padding:'10px 22px', borderRadius:'100px', fontSize:'11px', ...UB, textTransform:'uppercase' as const, letterSpacing:'0.1em', cursor:'pointer', border:`1px solid ${C.mint}`, backgroundColor:'transparent', color:C.mint }}
            onMouseEnter={e=>{e.currentTarget.style.backgroundColor=C.mint;e.currentTarget.style.color=C.ink}} onMouseLeave={e=>{e.currentTarget.style.backgroundColor='transparent';e.currentTarget.style.color=C.mint}}>
            <Plus size={14} /> View More
          </button>
        </div>

        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap' as const, gap:'14px', marginBottom:'20px' }}>
          <div style={{ display:'flex', gap:'4px', padding:'5px', backgroundColor:'#e8efec', borderRadius:'100px' }}>
            {['All Sellers','SouKni Members','SouKni Pro'].map(tab=>(
              <button key={tab} onClick={()=>setActiveSeller(tab)}
                style={{ padding:'10px 24px', borderRadius:'100px', fontSize:'11px', ...UB, textTransform:'uppercase' as const, letterSpacing:'0.1em', cursor:'pointer', border:'none',
                  backgroundColor: activeSeller===tab ? C.ink : 'transparent', color: activeSeller===tab ? 'white' : C.muted }}>{tab}</button>
            ))}
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:'12px', cursor:'pointer' }} onClick={()=>setDiamond(!diamond)}>
            <span style={{ fontSize:'10px', ...UB, color:C.muted, textTransform:'uppercase' as const, letterSpacing:'0.1em' }}>Show SouKni Diamond Certified First</span>
            <div style={{ width:'52px', height:'26px', borderRadius:'100px', backgroundColor:diamond?C.mint:'rgba(107,122,118,0.25)', position:'relative' }}>
              <div style={{ position:'absolute', top:'3px', left:diamond?'29px':'3px', width:'20px', height:'20px', borderRadius:'50%', backgroundColor:C.ink, transition:'left 0.25s' }} />
            </div>
          </div>
        </div>

        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'40px' }}>
          <div style={{ display:'flex', gap:'10px' }}>
            {['✨ New Arrivals','📉 Price Drop Alert'].map(btn=>(
              <button key={btn} style={{ display:'flex', alignItems:'center', gap:'6px', padding:'9px 18px', borderRadius:'100px', border:'1px solid rgba(107,122,118,0.2)', backgroundColor:'transparent', fontSize:'12px', ...UB, cursor:'pointer', color:C.muted }}>{btn}</button>
            ))}
          </div>
          <div style={{ display:'flex', gap:'4px', padding:'4px', backgroundColor:'white', borderRadius:'12px', border:'1px solid rgba(107,122,118,0.12)' }}>
            <button onClick={()=>setGridView(true)} style={{ width:'36px', height:'36px', borderRadius:'8px', border:'none', cursor:'pointer', fontSize:'17px', backgroundColor:gridView?C.ink:'transparent', color:gridView?'white':C.muted }}>⊞</button>
            <button onClick={()=>setGridView(false)} style={{ width:'36px', height:'36px', borderRadius:'8px', border:'none', cursor:'pointer', fontSize:'17px', backgroundColor:!gridView?C.ink:'transparent', color:!gridView?'white':C.muted }}>☰</button>
          </div>
        </div>

        <section style={{ marginBottom:'48px' }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'24px' }}>
            <div>
              <h3 style={{ fontSize:'clamp(18px,2.5vw,24px)', ...UB, color:C.ink, textTransform:'uppercase' as const, marginBottom:'4px' }}>Featured Premium Desktops</h3>
              <p style={{ fontSize:'14px', color:C.muted }}>Hand-picked machines from top brands and custom builders</p>
            </div>
            <a href="#" style={{ fontSize:'12px', ...UB, color:C.mint, textDecoration:'none' }}>View All Featured →</a>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'24px' }}>
            {displayFeatured.map((item,i)=><FeaturedCard key={i} {...item} />)}
          </div>
        </section>

        <section style={{ marginBottom:'64px' }}>
          <div style={{ position:'relative', borderRadius:'40px', overflow:'hidden', height:'320px', display:'flex', alignItems:'center', boxShadow:'0 16px 48px rgba(0,0,0,0.15)', cursor:'pointer' }}>
            <img src={I.auto} alt="Auto Pro" style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover' }} />
            <div style={{ position:'absolute', inset:0, backgroundColor:'rgba(22,29,27,0.58)' }} />
            <div style={{ position:'relative', zIndex:1, padding:'0 64px', maxWidth:'560px' }}>
              <p style={{ fontSize:'11px', ...UB, color:C.mint, textTransform:'uppercase' as const, letterSpacing:'0.15em', marginBottom:'14px' }}>SOUKNI AUTO PRO</p>
              <h2 style={{ fontSize:'clamp(26px,3.5vw,42px)', ...UB, color:'white', marginBottom:'18px', lineHeight:1.05 }}>Haul your rig in style.</h2>
              <p style={{ fontSize:'17px', color:'rgba(255,255,255,0.9)', marginBottom:'28px', lineHeight:1.55 }}>Premium vehicle rentals for transporting heavy tech setups across Morocco.</p>
              <button style={{ backgroundColor:C.mint, color:C.ink, border:'none', padding:'16px 40px', borderRadius:'100px', fontSize:'11px', ...UB, textTransform:'uppercase' as const, letterSpacing:'0.12em', cursor:'pointer' }}>BECOME A PARTNER</button>
            </div>
          </div>
        </section>

        <section style={{ marginBottom:'64px' }}>
          <h3 style={{ fontSize:'clamp(20px,3vw,32px)', ...UB, color:C.ink, textTransform:'uppercase' as const, marginBottom:'32px' }}>Exclusive Desktops Collection</h3>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gridTemplateRows:'380px 380px', gap:'20px' }}>
            <div style={{ gridColumn:'1/3', gridRow:'1/3', backgroundColor:'white', borderRadius:'40px', overflow:'hidden', display:'flex', flexDirection:'column' as const, border:'1px solid rgba(107,122,118,0.1)' }}>
              <div style={{ flex:1, overflow:'hidden', position:'relative', minHeight:0 }}>
                <img src={I.bento1} alt="Mac Studio" style={{ width:'100%', height:'100%', objectFit:'cover' }} />
                <div style={{ position:'absolute', top:'20px', left:'20px' }}>
                  <span style={{ backgroundColor:C.ink, color:C.mint, fontSize:'10px', ...CB, padding:'7px 16px', borderRadius:'100px', textTransform:'uppercase' as const, letterSpacing:'0.1em' }}>◆ DIAMOND MEMBER</span>
                </div>
              </div>
              <div style={{ padding:'24px 28px', flexShrink:0 }}>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'6px', gap:'12px' }}>
                  <div>
                    <p style={{ fontSize:'11px', ...CB, color:C.mint, textTransform:'uppercase' as const, letterSpacing:'0.1em', marginBottom:'3px' }}>APPLE</p>
                    <h4 style={{ fontSize:'20px', ...CB, color:C.ink }}>Mac Studio M2 Ultra — 128GB</h4>
                  </div>
                  <span style={{ fontSize:'22px', ...CB, color:C.mint, flexShrink:0 }}>52,000 MAD</span>
                </div>
                <p style={{ fontSize:'13px', color:C.muted, ...CB, marginBottom:'16px' }}>8TB SSD · Brand new sealed · Rabat, Agdal</p>
                <div style={{ display:'flex', gap:'10px' }}>
                  <MessageSellerButton style={{ flex:1, border:`2px solid rgba(107,122,118,0.2)`, color:C.ink, backgroundColor:'transparent', padding:'12px', borderRadius:'16px', fontSize:'11px', ...CB, textTransform:'uppercase' as const }}
                    onMouseEnter={e=>{e.currentTarget.style.borderColor=C.mint;e.currentTarget.style.backgroundColor=`${C.mint}14`}} onMouseLeave={e=>{e.currentTarget.style.borderColor='rgba(107,122,118,0.2)';e.currentTarget.style.backgroundColor='transparent'}}>Message</MessageSellerButton>
                  <WhatsAppButton phone={undefined} title="Mac Studio M2 Ultra — 128GB" style={{ flex:1, backgroundColor:C.mint, color:C.ink, padding:'12px', borderRadius:'16px', fontSize:'11px', ...CB, textTransform:'uppercase' as const }}>💬 WhatsApp</WhatsAppButton>
                </div>
              </div>
            </div>
            <div style={{ gridColumn:'3', gridRow:'1', backgroundColor:'white', borderRadius:'32px', overflow:'hidden', display:'flex', flexDirection:'column' as const, border:'1px solid rgba(107,122,118,0.1)' }}>
              <div style={{ flex:1, overflow:'hidden', position:'relative', minHeight:0 }}>
                <img src={I.bento2} alt="Gaming Rig" style={{ width:'100%', height:'100%', objectFit:'cover' }} />
                <div style={{ position:'absolute', top:'12px', left:'12px' }}>
                  <span style={{ backgroundColor:C.mint, color:C.ink, fontSize:'8px', ...CB, padding:'5px 12px', borderRadius:'100px', textTransform:'uppercase' as const }}>SOUKNI CERTIFIED</span>
                </div>
              </div>
              <div style={{ padding:'16px 18px', flexShrink:0 }}>
                <p style={{ fontSize:'9px', ...CB, color:C.mint, textTransform:'uppercase' as const, letterSpacing:'0.1em', marginBottom:'2px' }}>CUSTOM BUILD</p>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', gap:'6px', marginBottom:'10px' }}>
                  <h4 style={{ fontSize:'13px', ...CB, color:C.ink }}>RTX 4090 Gaming Rig</h4>
                  <span style={{ fontSize:'14px', ...CB, color:C.mint, flexShrink:0 }}>34,000 MAD</span>
                </div>
                <div style={{ display:'flex', gap:'6px' }}>
                  <MessageSellerButton style={{ flex:1, border:`1px solid rgba(107,122,118,0.2)`, color:C.ink, backgroundColor:'transparent', padding:'8px', borderRadius:'12px', fontSize:'9px', ...CB }}>Message</MessageSellerButton>
                  <WhatsAppButton phone={undefined} title="RTX 4090 Gaming Rig" style={{ flex:1, backgroundColor:C.mint, color:C.ink, padding:'8px', borderRadius:'12px', fontSize:'9px', ...CB }} />
                </div>
              </div>
            </div>
            <div style={{ gridColumn:'4', gridRow:'1', backgroundColor:'white', borderRadius:'32px', overflow:'hidden', display:'flex', flexDirection:'column' as const, border:'1px solid rgba(107,122,118,0.1)' }}>
              <div style={{ flex:1, overflow:'hidden', position:'relative', minHeight:0 }}>
                <img src={I.bento3} alt="Dell" style={{ width:'100%', height:'100%', objectFit:'cover' }} />
                <div style={{ position:'absolute', top:'12px', left:'12px' }}>
                  <span style={{ backgroundColor:'#fbbf24', color:C.ink, fontSize:'8px', ...CB, padding:'5px 12px', borderRadius:'100px', textTransform:'uppercase' as const }}>Featured</span>
                </div>
              </div>
              <div style={{ padding:'16px 18px', flexShrink:0 }}>
                <p style={{ fontSize:'9px', ...CB, color:C.mint, textTransform:'uppercase' as const, letterSpacing:'0.1em', marginBottom:'2px' }}>DELL</p>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', gap:'6px', marginBottom:'10px' }}>
                  <h4 style={{ fontSize:'13px', ...CB, color:C.ink }}>OptiPlex 7010 SFF i7</h4>
                  <span style={{ fontSize:'14px', ...CB, color:C.mint, flexShrink:0 }}>9,800 MAD</span>
                </div>
                <div style={{ display:'flex', gap:'6px' }}>
                  <MessageSellerButton style={{ flex:1, border:`1px solid rgba(107,122,118,0.2)`, color:C.ink, backgroundColor:'transparent', padding:'8px', borderRadius:'12px', fontSize:'9px', ...CB }}>Message</MessageSellerButton>
                  <WhatsAppButton phone={undefined} title="OptiPlex 7010 SFF i7" style={{ flex:1, backgroundColor:C.mint, color:C.ink, padding:'8px', borderRadius:'12px', fontSize:'9px', ...CB }} />
                </div>
              </div>
            </div>
            <div style={{ gridColumn:'3/5', gridRow:'2', backgroundColor:'white', borderRadius:'32px', overflow:'hidden', display:'flex', flexDirection:'row' as const, border:'1px solid rgba(107,122,118,0.1)' }}>
              <div style={{ width:'50%', overflow:'hidden', position:'relative' }}>
                <img src={I.bento4} alt="HP Omen" style={{ width:'100%', height:'100%', objectFit:'cover' }} />
                <div style={{ position:'absolute', top:'12px', left:'12px' }}>
                  <span style={{ backgroundColor:C.mintDk, color:'white', fontSize:'8px', ...CB, padding:'5px 12px', borderRadius:'100px', textTransform:'uppercase' as const }}>New Arrival</span>
                </div>
              </div>
              <div style={{ flex:1, padding:'28px 32px', display:'flex', flexDirection:'column' as const, justifyContent:'center' }}>
                <p style={{ fontSize:'11px', ...CB, color:C.mint, textTransform:'uppercase' as const, letterSpacing:'0.1em', marginBottom:'6px' }}>HP</p>
                <h4 style={{ fontSize:'18px', ...CB, color:C.ink, marginBottom:'6px' }}>Omen 45L Gaming RTX 4080</h4>
                <p style={{ fontSize:'13px', color:C.muted, ...CB, marginBottom:'12px' }}>32GB RAM · 2TB NVMe · Brand new</p>
                <span style={{ fontSize:'22px', ...CB, color:C.mint, marginBottom:'20px', display:'block' }}>26,500 MAD</span>
                <div style={{ display:'flex', gap:'10px' }}>
                  <MessageSellerButton style={{ flex:1, border:`2px solid rgba(107,122,118,0.2)`, color:C.ink, backgroundColor:'transparent', padding:'12px', borderRadius:'16px', fontSize:'10px', ...CB }}
                    onMouseEnter={e=>e.currentTarget.style.borderColor=C.mint} onMouseLeave={e=>e.currentTarget.style.borderColor='rgba(107,122,118,0.2)'}>Message</MessageSellerButton>
                  <WhatsAppButton phone={undefined} title="Omen 45L Gaming RTX 4080" style={{ flex:1, backgroundColor:C.mint, color:C.ink, padding:'12px', borderRadius:'16px', fontSize:'10px', ...CB }}>💬 WhatsApp</WhatsAppButton>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section style={{ marginBottom:'48px' }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'28px' }}>
            <h3 style={{ fontSize:'clamp(18px,2.5vw,24px)', ...UB, color:C.ink, textTransform:'uppercase' as const }}>All Desktop Discoveries</h3>
            <a href="#" style={{ fontSize:'12px', ...UB, color:C.mint, textDecoration:'none' }}>View All →</a>
          </div>
          {[displayGrid.slice(0,4),displayGrid.slice(4,8),displayGrid.slice(8,12),displayGrid.slice(12,16)].map((row,ri)=>(
            <div key={ri} style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'20px', marginBottom:'20px' }}>
              {row.map((item,j)=><GridCard key={j} {...item} />)}
            </div>
          ))}
        </section>

        <div style={{ display:'flex', justifyContent:'center', alignItems:'center', gap:'10px', marginBottom:'64px' }}>
          <button onClick={()=>setPage(p=>Math.max(1,p-1))} disabled={page<=1}
            style={{ width:'44px', height:'44px', borderRadius:'12px', backgroundColor:'white', border:'1px solid rgba(107,122,118,0.12)', cursor:page<=1?'not-allowed':'pointer', display:'flex', alignItems:'center', justifyContent:'center', color:C.muted, opacity:page<=1?0.4:1 }}><ChevronLeft size={18} /></button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(p=>(
            <button key={p} onClick={()=>setPage(p)} style={{ width:'44px', height:'44px', borderRadius:'12px', cursor:'pointer', fontSize:'15px', ...UB, border:'1px solid', backgroundColor:page===p?C.mint:'white', color:page===p?C.ink:C.muted, borderColor:page===p?C.mint:'rgba(107,122,118,0.12)' }}>{p}</button>
          ))}
          <button onClick={()=>setPage(p=>Math.min(totalPages,p+1))} disabled={page>=totalPages}
            style={{ width:'44px', height:'44px', borderRadius:'12px', backgroundColor:'white', border:'1px solid rgba(107,122,118,0.12)', cursor:page>=totalPages?'not-allowed':'pointer', display:'flex', alignItems:'center', justifyContent:'center', color:C.muted, opacity:page>=totalPages?0.4:1 }}><ChevronRight size={18} /></button>
        </div>

        <section style={{ marginBottom:'64px' }}>
          <div style={{ backgroundColor:C.mint, borderRadius:'40px', padding:'56px 64px', display:'flex', alignItems:'center', justifyContent:'space-between', boxShadow:`0 16px 48px ${C.mint}30`, flexWrap:'wrap' as const, gap:'28px' }}>
            <div style={{ maxWidth:'520px' }}>
              <p style={{ fontSize:'9px', ...UB, textTransform:'uppercase' as const, letterSpacing:'0.15em', color:'rgba(22,29,27,0.6)', marginBottom:'14px' }}>EXCLUSIVE PRIVILEGE</p>
              <h2 style={{ fontSize:'clamp(26px,3.5vw,40px)', ...UB, color:C.ink, marginBottom:'16px', lineHeight:1.05 }}>Unlock the Power of Diamond.</h2>
              <p style={{ fontSize:'17px', color:`${C.ink}b3`, lineHeight:1.6 }}>Priority placement, SouKni Certified status, and direct marketing tools. Sell your desktops 5x faster.</p>
            </div>
            <div style={{ display:'flex', gap:'14px', flexWrap:'wrap' as const }}>
              <button style={{ backgroundColor:C.ink, color:'white', border:'none', padding:'18px 44px', borderRadius:'100px', fontSize:'11px', ...UB, textTransform:'uppercase' as const, letterSpacing:'0.12em', cursor:'pointer' }}>Get Status</button>
              <button style={{ backgroundColor:'transparent', color:C.ink, border:`2px solid rgba(22,29,27,0.2)`, padding:'18px 44px', borderRadius:'100px', fontSize:'11px', ...UB, textTransform:'uppercase' as const, letterSpacing:'0.12em', cursor:'pointer' }}>Learn More</button>
            </div>
          </div>
        </section>

        <section style={{ marginBottom:'64px' }}>
          <div style={{ backgroundColor:C.cream, borderRadius:'40px', height:'440px', position:'relative' as const, overflow:'hidden', display:'flex', alignItems:'center', padding:'0 64px', border:'1px solid rgba(107,122,118,0.1)' }}>
            <div style={{ position:'relative', zIndex:1, maxWidth:'480px' }}>
              <h2 style={{ fontSize:'clamp(36px,5vw,56px)', ...UB, color:C.ink, marginBottom:'20px', lineHeight:1, letterSpacing:'-0.05em' }}>JOIN THE<br/>SOUKNI FAMILY</h2>
              <p style={{ fontSize:'17px', color:C.muted, marginBottom:'36px', maxWidth:'400px', lineHeight:1.6 }}>Get early alerts on rare tech drops, refurbished deals, and exclusive gadget auctions.</p>
              <div style={{ display:'flex', gap:'14px', flexWrap:'wrap' as const }}>
                {['📱 App Store','▶ Google Play'].map(app=>(
                  <button key={app} style={{ height:'52px', minWidth:'160px', backgroundColor:C.ink, color:'white', border:'none', borderRadius:'14px', fontSize:'10px', ...UB, textTransform:'uppercase' as const, letterSpacing:'0.1em', cursor:'pointer' }}>{app}</button>
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
          backHref={`/${locale}/electronics`}
          backLabel="Back to Electronics"
          inkColor={C.ink}
          mintDkColor={C.mintDk}
        />
      </main>

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
                    style={{ width:'38px', height:'38px', borderRadius:'50%', backgroundColor:'rgba(255,255,255,0.08)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'10px', ...UB, color:'rgba(255,255,255,0.6)', textDecoration:'none' }}>{s}</a>
                ))}
              </div>
            </div>
            {[
              { title:'Marketplace', links:[{l:'Motors',h:`/${locale}/motors`},{l:'Property',h:`/${locale}/property`},{l:'Fashion',h:`/${locale}/fashion`},{l:'The Vault',h:`/${locale}/vault`}] },
              { title:'Company', links:[{l:'About Us',h:`/${locale}/about`},{l:'Careers',h:`/${locale}/jobs`},{l:'Press Kit',h:`/${locale}/about`}] },
              { title:'Support', links:[{l:'Help Center',h:`/${locale}/community`},{l:'Safety Center',h:`/${locale}/community`},{l:'Contact',h:`/${locale}/community`}] },
            ].map(col=>(
              <div key={col.title}>
                <h4 style={{ fontSize:'10px', ...UB, textTransform:'uppercase' as const, letterSpacing:'0.15em', color:C.mint, marginBottom:'20px' }}>{col.title}</h4>
                {col.links.map(({l,h})=>(
                  <Link key={l} href={h} style={{ display:'block', fontSize:'13px', ...CB, color:'rgba(255,255,255,0.65)', textDecoration:'none', marginBottom:'12px' }}>{l}</Link>
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
