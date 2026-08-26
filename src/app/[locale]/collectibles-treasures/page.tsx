'use client'
import React, { useState, useMemo, useEffect } from 'react'
import Link from 'next/link'
import { Search, X, MapPin, Heart, MessageCircle, ChevronRight, Star, ChevronDown, ChevronUp } from 'lucide-react'
import { useListings } from '@/hooks/useListings'

const HERO = 'https://images.pexels.com/photos/1413420/pexels-photo-1413420.jpeg?auto=compress&w=1600'

const ALL_SUBCATS = [
  { slug:'vintage-watches',        label:'Vintage Watches',             emoji:'⌚', image:'https://images.pexels.com/photos/277390/pexels-photo-277390.jpeg?auto=compress&w=600' },
  { slug:'amazigh-berber-jewelry', label:'Amazigh & Berber Jewelry',    emoji:'💎', image:'https://images.pexels.com/photos/1413420/pexels-photo-1413420.jpeg?auto=compress&w=600' },
  { slug:'vintage-rugs',           label:'Vintage Rugs',                emoji:'🪞', image:'https://images.pexels.com/photos/265804/pexels-photo-265804.jpeg?auto=compress&w=600' },
  { slug:'pottery-ceramics',       label:'Pottery & Ceramics',          emoji:'🏺', image:'https://images.pexels.com/photos/690154/pexels-photo-690154.jpeg?auto=compress&w=600' },
  { slug:'metalwork',              label:'Metalwork',                   emoji:'🔩', image:'https://images.pexels.com/photos/1413420/pexels-photo-1413420.jpeg?auto=compress&w=600' },
  { slug:'stamps-postcards',       label:'Stamps & Postcards',          emoji:'📮', image:'https://images.pexels.com/photos/265804/pexels-photo-265804.jpeg?auto=compress&w=600' },
  { slug:'coins-banknotes',        label:'Coins & Banknotes',           emoji:'🪙', image:'https://images.pexels.com/photos/277390/pexels-photo-277390.jpeg?auto=compress&w=600' },
  { slug:'zellige-tiles',          label:'Zellige & Tiles',             emoji:'🔷', image:'https://images.pexels.com/photos/690154/pexels-photo-690154.jpeg?auto=compress&w=600' },
  { slug:'books-prints',           label:'Books & Prints',              emoji:'📚', image:'https://images.pexels.com/photos/265804/pexels-photo-265804.jpeg?auto=compress&w=600' },
  { slug:'doors-shutters',         label:'Doors & Shutters',            emoji:'🚪', image:'https://images.pexels.com/photos/1413420/pexels-photo-1413420.jpeg?auto=compress&w=600' },
  { slug:'orientalist-art',        label:'Orientalist & Colonial Art',  emoji:'🎨', image:'https://images.pexels.com/photos/277390/pexels-photo-277390.jpeg?auto=compress&w=600' },
  { slug:'vintage-posters',        label:'Vintage Posters',             emoji:'🖼️', image:'https://images.pexels.com/photos/265804/pexels-photo-265804.jpeg?auto=compress&w=600' },
  { slug:'vintage-caftans',        label:'Vintage Caftans & Takchitas', emoji:'👘', image:'https://images.pexels.com/photos/690154/pexels-photo-690154.jpeg?auto=compress&w=600' },
  { slug:'traditional-attire',     label:'Traditional Attire',          emoji:'🧵', image:'https://images.pexels.com/photos/1413420/pexels-photo-1413420.jpeg?auto=compress&w=600' },
  { slug:'woodwork-leather',       label:'Woodwork & Leather',          emoji:'🪵', image:'https://images.pexels.com/photos/277390/pexels-photo-277390.jpeg?auto=compress&w=600' },
  { slug:'sports-memorabilia',     label:'Sports Memorabilia',          emoji:'🏆', image:'https://images.pexels.com/photos/265804/pexels-photo-265804.jpeg?auto=compress&w=600' },
]

const topChoices = [
  { id:'ct1', title:'Rare Amazigh Silver Fibula — 19th Century',           price:28000, location:'Marrakech',  rating:4.9, reviews:34, image:'https://images.pexels.com/photos/1413420/pexels-photo-1413420.jpeg?auto=compress&w=800',  desc:'Exceptional antique Amazigh silver fibula brooch from the High Atlas, circa 1880. Coral and enamel inlay, original patina. Provenance documentation included. One of the finest examples in private hands.' },
  { id:'ct2', title:'Longines Conquest Vintage Watch — 1962',               price:18500, location:'Casablanca', rating:4.9, reviews:28, image:'https://images.pexels.com/photos/277390/pexels-photo-277390.jpeg?auto=compress&w=800',  desc:'Pristine 1962 Longines Conquest automatic in original condition. Gold-filled case, original dial with applied indices, recently serviced by certified watchmaker. Box and papers present.' },
  { id:'ct3', title:'Hand-Knotted Beni Ourain Rug — 3.2m × 2.1m',         price:45000, location:'Fès',        rating:4.8, reviews:22, image:'https://images.pexels.com/photos/265804/pexels-photo-265804.jpeg?auto=compress&w=800',  desc:'Museum-quality vintage Beni Ourain wool rug, circa 1950s. Natural undyed wool, bold geometric motifs. Excellent condition. Certificate of authenticity from Moroccan Heritage Foundation.' },
]

const bentoListings = [
  { id:'bc1', title:'Safi Blue Ceramic Amphora — 1940s',        price:8500,  location:'Safi',       image:'https://images.pexels.com/photos/690154/pexels-photo-690154.jpeg?auto=compress&w=600' },
  { id:'bc2', title:'Brass Moroccan Lantern — Hammered',        price:4200,  location:'Marrakech',  image:'https://images.pexels.com/photos/1413420/pexels-photo-1413420.jpeg?auto=compress&w=600' },
  { id:'bc3', title:'Hassan II 1987 Silver Dirham Set',         price:6800,  location:'Rabat',      image:'https://images.pexels.com/photos/265804/pexels-photo-265804.jpeg?auto=compress&w=600' },
  { id:'bc4', title:'Orientalist Oil Painting — Fès Medina',   price:95000, location:'Casablanca', image:'https://images.pexels.com/photos/277390/pexels-photo-277390.jpeg?auto=compress&w=600' },
  { id:'bc5', title:'Zellige Panel — Original Madrasa Fragment', price:32000, location:'Fès',       image:'https://images.pexels.com/photos/690154/pexels-photo-690154.jpeg?auto=compress&w=600' },
]

const discoveryGrid = [
  { id:'d1',  title:'Vintage Berber Fibula Pair',               price:12000, location:'Marrakech',  image:'https://images.pexels.com/photos/1413420/pexels-photo-1413420.jpeg?auto=compress&w=600' },
  { id:'d2',  title:'Vintage Maroc Air Poster — 1960s',         price:4500,  location:'Casablanca', image:'https://images.pexels.com/photos/265804/pexels-photo-265804.jpeg?auto=compress&w=600' },
  { id:'d3',  title:'Handcarved Cedar Door — Fès Medina',       price:28000, location:'Fès',        image:'https://images.pexels.com/photos/277390/pexels-photo-277390.jpeg?auto=compress&w=600' },
  { id:'d4',  title:'Vintage Caftan — Royal Purple Velvet',     price:9800,  location:'Rabat',      image:'https://images.pexels.com/photos/690154/pexels-photo-690154.jpeg?auto=compress&w=600' },
  { id:'d5',  title:'Morocco Protectorate Stamp Collection',    price:3200,  location:'Casablanca', image:'https://images.pexels.com/photos/1413420/pexels-photo-1413420.jpeg?auto=compress&w=600' },
  { id:'d6',  title:'Leather-Bound Arabic Manuscript',         price:18500, location:'Fès',        image:'https://images.pexels.com/photos/265804/pexels-photo-265804.jpeg?auto=compress&w=600' },
  { id:'d7',  title:'Real Madrid Signed Jersey — 2006',        price:8500,  location:'Casablanca', image:'https://images.pexels.com/photos/277390/pexels-photo-277390.jpeg?auto=compress&w=600' },
  { id:'d8',  title:'Chefchaouen Blue Takchita — 1970s',       price:7200,  location:'Chefchaouen',image:'https://images.pexels.com/photos/690154/pexels-photo-690154.jpeg?auto=compress&w=600' },
]

function CertifiedBadge() {
  return (
    <span style={{ display:'inline-flex', alignItems:'center', gap:'4px', background:'linear-gradient(135deg,#22d4a8,#0f9b8e)', color:'white', fontSize:'8px', fontWeight:900, padding:'3px 10px', borderRadius:'100px', textTransform:'uppercase' as const, letterSpacing:'0.08em' }}>✦ SOUKNI CERTIFIED</span>
  )
}
function Stars({ rating }: { rating: number }) {
  return <div style={{ display:'flex', gap:'1px' }}>{[1,2,3,4,5].map(i=><Star key={i} size={11} fill={i<=Math.floor(rating)?'#f59e0b':'none'} color="#f59e0b" />)}</div>
}
function TopChoiceCard({ item, locale }: { item: typeof topChoices[0], locale: string }) {
  const [saved, setSaved] = useState(false)
  const [hov, setHov] = useState(false)
  return (
    <Link href={`/${locale}/listing/${item.id}`} style={{ textDecoration:'none' }}>
      <div onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
        style={{ display:'flex', backgroundColor:'white', borderRadius:'40px', overflow:'hidden', border:'1px solid #f1f5f9', boxShadow:hov?'0 20px 48px rgba(0,0,0,0.12)':'0 2px 12px rgba(0,0,0,0.05)', transition:'all 0.3s', marginBottom:'16px' }}>
        <div style={{ position:'relative', width:'320px', flexShrink:0, overflow:'hidden' }}>
          <img src={item.image} alt={item.title} style={{ width:'100%', height:'100%', objectFit:'cover', transition:'transform 0.6s', transform:hov?'scale(1.06)':'scale(1)' }} />
          <div style={{ position:'absolute', top:'16px', left:'16px' }}><CertifiedBadge /></div>
          <button onClick={e=>{e.preventDefault();setSaved(!saved)}} style={{ position:'absolute', top:'16px', right:'16px', width:'32px', height:'32px', borderRadius:'50%', backgroundColor:'rgba(255,255,255,0.2)', border:'1px solid rgba(255,255,255,0.3)', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer' }}>
            <Heart size={14} color={saved?'#ef4444':'white'} fill={saved?'#ef4444':'none'} />
          </button>
        </div>
        <div style={{ flex:1, padding:'28px 32px', display:'flex', flexDirection:'column' as const, justifyContent:'space-between' }}>
          <div>
            <div style={{ display:'flex', alignItems:'center', gap:'8px', marginBottom:'10px' }}><Stars rating={item.rating} /><span style={{ fontWeight:900, fontSize:'13px', color:'#161d1b' }}>{item.rating}</span><span style={{ fontSize:'12px', color:'#6b7a76' }}>({item.reviews} reviews)</span></div>
            <h3 style={{ fontWeight:900, letterSpacing:'-0.05em', fontSize:'20px', color:'#161d1b', marginBottom:'10px', lineHeight:1.2 }}>{item.title}</h3>
            <p style={{ fontSize:'13px', color:'#6b7a76', lineHeight:1.7, marginBottom:'16px' }}>{item.desc}</p>
            <p style={{ fontSize:'12px', color:'#6b7a76', display:'flex', alignItems:'center', gap:'4px' }}><MapPin size={12} />{item.location}</p>
          </div>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginTop:'20px' }}>
            <div><span style={{ fontWeight:900, fontSize:'24px', color:'#22d4a8' }}>{item.price.toLocaleString()} MAD</span></div>
            <div style={{ display:'flex', gap:'8px' }}>
              <button onClick={e=>e.preventDefault()} style={{ padding:'10px 20px', borderRadius:'100px', border:'1px solid #22d4a8', backgroundColor:'transparent', color:'#22d4a8', fontWeight:700, fontSize:'12px', cursor:'pointer', display:'flex', alignItems:'center', gap:'5px' }}><MessageCircle size={13} />Message</button>
              <button onClick={e=>e.preventDefault()} style={{ padding:'10px 20px', borderRadius:'100px', border:'none', backgroundColor:'#25D366', color:'white', fontWeight:700, fontSize:'12px', cursor:'pointer' }}>WhatsApp</button>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
function DiscoveryCard({ item, locale }: { item: typeof discoveryGrid[0], locale: string }) {
  const [saved, setSaved] = useState(false)
  const [hov, setHov] = useState(false)
  return (
    <Link href={`/${locale}/listing/${item.id}`} style={{ textDecoration:'none' }}>
      <div onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
        style={{ display:'flex', backgroundColor:'white', borderRadius:'24px', overflow:'hidden', border:'1px solid #f1f5f9', boxShadow:hov?'0 16px 32px rgba(0,0,0,0.1)':'0 2px 8px rgba(0,0,0,0.04)', transition:'all 0.25s' }}>
        <div style={{ position:'relative', width:'160px', flexShrink:0, overflow:'hidden' }}>
          <img src={item.image} alt={item.title} style={{ width:'100%', height:'100%', objectFit:'cover', transition:'transform 0.5s', transform:hov?'scale(1.06)':'scale(1)' }} />
          <div style={{ position:'absolute', top:'8px', left:'8px' }}><CertifiedBadge /></div>
        </div>
        <div style={{ flex:1, padding:'16px 20px', display:'flex', flexDirection:'column' as const, justifyContent:'space-between' }}>
          <p style={{ fontSize:'11px', color:'#6b7a76', marginBottom:'4px', display:'flex', alignItems:'center', gap:'3px' }}><MapPin size={10} />{item.location}</p>
          <h4 style={{ fontWeight:900, letterSpacing:'-0.05em', fontSize:'14px', color:'#161d1b', marginBottom:'8px', lineHeight:1.3 }}>{item.title}</h4>
          <p style={{ fontWeight:900, fontSize:'18px', color:'#22d4a8', marginBottom:'12px' }}>{item.price.toLocaleString()} MAD</p>
          <div style={{ display:'flex', gap:'6px' }}>
            <button onClick={e=>{e.preventDefault();setSaved(!saved)}} style={{ flex:1, backgroundColor:'#eef5f2', color:'#3c4a46', border:'none', padding:'8px', borderRadius:'100px', fontWeight:700, fontSize:'11px', cursor:'pointer' }}>Message</button>
            <button onClick={e=>e.preventDefault()} style={{ flex:1, backgroundColor:'#25D366', color:'white', border:'none', padding:'8px', borderRadius:'100px', fontWeight:700, fontSize:'11px', cursor:'pointer' }}>WhatsApp</button>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default function CollectiblesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = React.use(params)
  const [showAll, setShowAll] = useState(false)
  const [activePill, setActivePill] = useState('All Collectibles')
  const [tab, setTab] = useState('All')
  const [diamond, setDiamond] = useState(true)
  const [page, setPage] = useState(1)
  const [grid, setGrid] = useState(true)
  const [city, setCity]             = useState('')
  const [keyword, setKeyword]       = useState('')
  const [applied, setApplied]       = useState({ city:'', keyword:'' })
  const [price, setPrice]           = useState('Any Price')
  const [catFilter, setCatFilter]   = useState('All Categories')
  const [priceOpen, setPriceOpen]   = useState(false)
  const [catOpen, setCatOpen]       = useState(false)
  const [cityOpen, setCityOpen]     = useState(false)
  const [sortBy, setSortBy]         = useState('Default')
  const [sortOpen, setSortOpen]     = useState(false)
  const [savedSearch, setSavedSearch] = useState(false)
  const [activeChip, setActiveChip] = useState('New Arrivals')

  const PRICES = ['Any Price','0–500 MAD','500–2,000 MAD','2,000–8,000 MAD','8,000+ MAD']
  const CAT_OPTIONS = ['All Categories','All Collectibles','Vintage Watches','Berber Jewelry','Vintage Rugs','Pottery','Metalwork','Art & Prints','Coins']

  function applySearch() {
    setApplied({ city, keyword })
    setPriceOpen(false); setCatOpen(false); setCityOpen(false)
  }

  // Real Supabase data — falls back to the mock arrays above when this
  // category has no listings yet (same hybrid pattern as motors/cars).
  const { fetchListings } = useListings()
  const [dbListings, setDbListings] = useState<any[]>([])

  useEffect(() => {
    const t = setTimeout(() => {
      fetchListings({ category: 'collectibles-treasures', sortBy: 'newest', limit: 24 })
        .then(rows => setDbListings(rows || []))
    }, 400)
    return () => clearTimeout(t)
  }, [])

  function mapDbRowToTopChoice(row: any) {
    return {
      id: row.id,
      title: row.title,
      price: (row.price || 0) / 100,
      location: row.city || '',
      rating: row.profiles?.rating || 4.8,
      reviews: row.profiles?.review_count || 0,
      image: (row.images && row.images[0]) || HERO,
      desc: row.description || '',
    }
  }

  function mapDbRowToBento(row: any) {
    return {
      id: row.id,
      title: row.title,
      price: (row.price || 0) / 100,
      location: row.city || '',
      image: (row.images && row.images[0]) || HERO,
    }
  }

  const hasRealData = dbListings.length > 0
  const realTopChoices    = hasRealData ? dbListings.slice(0, 3).map(mapDbRowToTopChoice) : topChoices
  const realBentoListings = hasRealData ? dbListings.slice(3, 8).map(mapDbRowToBento) : bentoListings
  const realDiscoveryGrid = hasRealData ? dbListings.slice(8, 24).map(mapDbRowToBento) : discoveryGrid

  const filteredDiscovery = useMemo(() => {
    return realDiscoveryGrid.filter(item => {
      const mc = !applied.city    || item.location.toLowerCase().includes(applied.city.toLowerCase())
      const mk = !applied.keyword || item.title.toLowerCase().includes(applied.keyword.toLowerCase())
      const mp = price === 'Any Price' ? true
               : price === '0–500 MAD'      ? item.price <= 500
               : price === '500–2,000 MAD'  ? item.price > 500   && item.price <= 2000
               : price === '2,000–8,000 MAD'? item.price > 2000  && item.price <= 8000
               : item.price > 8000
      return mc && mk && mp
    })
  }, [applied, price, realDiscoveryGrid])

  const VISIBLE_COUNT = 8
  const visibleSubcats = showAll ? ALL_SUBCATS : ALL_SUBCATS.slice(0, VISIBLE_COUNT)

  const pills = ['All Collectibles','Vintage Watches','Berber Jewelry','Vintage Rugs','Pottery','Metalwork','Art & Prints','Coins']
  const jobTabs = ['All','For Sale','Wanted','Trade']

  return (
    <div style={{ fontFamily:'Inter, sans-serif', backgroundColor:'#f4fbf8', minHeight:'100vh' }}>

      {/* CINEMATIC HERO */}
      <section style={{ position:'relative', height:'440px', overflow:'hidden', display:'flex', alignItems:'center', justifyContent:'center' }}>
        <img src={HERO} alt="Collectibles & Treasures" style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover' }} />
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top,rgba(15,23,42,0.88),rgba(15,23,42,0.4))' }} />
        <div style={{ position:'relative', zIndex:10, textAlign:'center', padding:'0 20px', maxWidth:'760px', width:'100%' }}>
          <h1 style={{ fontWeight:900, letterSpacing:'-0.05em', fontSize:'clamp(32px,5vw,56px)', color:'white', marginBottom:'12px', lineHeight:1.05 }}>
            Collectibles &amp;<br />Treasures in Rabat.
          </h1>
          <p style={{ fontSize:'15px', color:'rgba(255,255,255,0.82)', marginBottom:'32px' }}>Morocco's finest antiques, vintage treasures &amp; cultural heritage pieces</p>
          <div style={{ display:'flex', alignItems:'stretch', backgroundColor:'rgba(255,255,255,0.12)', backdropFilter:'blur(24px)', border:'1px solid rgba(255,255,255,0.25)', borderRadius:'100px', overflow:'hidden', maxWidth:'680px', margin:'0 auto' }}>
            <div style={{ display:'flex', flexDirection:'column' as const, padding:'14px 20px', flex:'0 0 180px', borderRight:'1px solid rgba(255,255,255,0.2)', gap:'2px' }}>
              <span style={{ fontSize:'9px', fontWeight:800, color:'rgba(255,255,255,0.6)', textTransform:'uppercase' as const, letterSpacing:'0.12em' }}>City</span>
              <input value={city} onChange={e=>setCity(e.target.value)} onKeyDown={e=>e.key==='Enter'&&applySearch()} placeholder="Marrakech" autoComplete="off" style={{ backgroundColor:'transparent', border:'none', outline:'none', fontSize:'14px', fontWeight:600, color:'white', padding:0, width:'100%' }} />
            </div>
            <div style={{ display:'flex', flexDirection:'column' as const, padding:'14px 20px', flex:1, borderRight:'1px solid rgba(255,255,255,0.2)', gap:'2px' }}>
              <span style={{ fontSize:'9px', fontWeight:800, color:'rgba(255,255,255,0.6)', textTransform:'uppercase' as const, letterSpacing:'0.12em' }}>Keyword</span>
              <input value={keyword} onChange={e=>setKeyword(e.target.value)} onKeyDown={e=>e.key==='Enter'&&applySearch()} placeholder="Amazigh silver, vintage rug, zellige..." autoComplete="off" style={{ backgroundColor:'transparent', border:'none', outline:'none', fontSize:'14px', fontWeight:600, color:'white', padding:0, width:'100%' }} />
            </div>
            <button onClick={applySearch} style={{ backgroundColor:'#22d4a8', color:'white', border:'none', padding:'0 32px', fontWeight:800, fontSize:'14px', cursor:'pointer', display:'flex', alignItems:'center', gap:'8px', flexShrink:0, transition:'background 0.15s' }} onMouseEnter={e=>e.currentTarget.style.backgroundColor='#0f9b8e'} onMouseLeave={e=>e.currentTarget.style.backgroundColor='#22d4a8'}><Search size={16} /> Search</button>
          </div>
        </div>
      </section>

      {/* FILTER BAR */}
      <div style={{ maxWidth:'1440px', margin:'-28px auto 0', padding:'0 40px', position:'relative', zIndex:30 }}>
        <div style={{ backgroundColor:'rgba(255,255,255,0.9)', backdropFilter:'blur(20px)', borderRadius:'100px', padding:'10px 10px 10px 0', boxShadow:'0 8px 40px rgba(0,0,0,0.12)', border:'1px solid rgba(255,255,255,0.6)', display:'flex', alignItems:'center', overflow:'visible' }}>
          {/* CITY */}
          <div style={{ position:'relative', flex:1, borderRight:'1px solid rgba(186,202,197,0.3)' }}>
            <button onClick={()=>{setCityOpen(!cityOpen);setPriceOpen(false);setCatOpen(false)}}
              style={{ width:'100%', height:'100%', background:'none', border:'none', cursor:'pointer', padding:'6px 20px', display:'flex', flexDirection:'column' as const, textAlign:'left' as const, gap:'1px' }}>
              <span style={{ fontSize:'9px', textTransform:'uppercase' as const, fontWeight:700, color:'#6b7a76', letterSpacing:'0.1em' }}>CITY</span>
              <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                <span style={{ fontSize:'13px', fontWeight:600, color:city?'#161d1b':'#6b7a76' }}>{city||'All Cities'}</span>
                <span style={{ color:'#22d4a8', fontSize:'10px', transform:cityOpen?'rotate(180deg)':'rotate(0)', transition:'transform 0.2s', display:'inline-block' }}>▾</span>
              </div>
            </button>
            {cityOpen && (
              <div onClick={e=>e.stopPropagation()} style={{ position:'absolute', top:'calc(100% + 8px)', left:0, minWidth:220, backgroundColor:'white', borderRadius:16, boxShadow:'0 20px 60px rgba(0,0,0,0.12)', border:'1px solid rgba(107,122,118,0.12)', zIndex:200, padding:'8px 0', maxHeight:280, overflowY:'auto' as const }}>
                {['All Cities','Casablanca','Rabat','Marrakech','Fès','Tangier','Agadir','Meknès'].map(opt=>(
                  <button key={opt} onClick={()=>{setCity(opt==='All Cities'?'':opt);setCityOpen(false)}}
                    style={{ width:'100%', padding:'10px 18px', background:'none', border:'none', cursor:'pointer', textAlign:'left' as const, fontSize:'13px', fontWeight:600, color:(opt==='All Cities'?!city:city===opt)?'#22d4a8':'#161d1b', display:'flex', justifyContent:'space-between' }}
                    onMouseEnter={e=>e.currentTarget.style.backgroundColor='#f4fbf8'} onMouseLeave={e=>e.currentTarget.style.backgroundColor='transparent'}>
                    {opt}{(opt==='All Cities'?!city:city===opt)&&<span style={{color:'#22d4a8'}}>✓</span>}
                  </button>
                ))}
              </div>
            )}
          </div>
          {/* KEYWORD */}
          <div style={{ flex:2, padding:'6px 20px', borderRight:'1px solid rgba(186,202,197,0.3)', display:'flex', flexDirection:'column' as const, gap:'1px' }}>
            <span style={{ fontSize:'9px', textTransform:'uppercase' as const, fontWeight:700, color:'#6b7a76', letterSpacing:'0.1em' }}>KEYWORD</span>
            <div style={{ display:'flex', alignItems:'center', gap:'6px' }}>
              <Search size={12} color="#6b7a76" />
              <input value={keyword} onChange={e=>setKeyword(e.target.value)} onKeyDown={e=>e.key==='Enter'&&applySearch()} placeholder="Berber jewelry, vintage rug..." autoComplete="off"
                style={{ fontSize:'13px', fontWeight:600, color:'#161d1b', border:'none', outline:'none', background:'none', flex:1 }} />
              {keyword && <button onClick={()=>{setKeyword('');setApplied(p=>({...p,keyword:''}))}} style={{ background:'none', border:'none', cursor:'pointer', color:'#6b7a76', display:'flex' }}><X size={13}/></button>}
            </div>
          </div>
          {/* CATEGORY */}
          <div style={{ position:'relative', flex:1, borderRight:'1px solid rgba(186,202,197,0.3)' }}>
            <button onClick={()=>{setCatOpen(!catOpen);setPriceOpen(false);setCityOpen(false)}}
              style={{ width:'100%', height:'100%', background:'none', border:'none', cursor:'pointer', padding:'6px 20px', display:'flex', flexDirection:'column' as const, textAlign:'left' as const, gap:'1px' }}>
              <span style={{ fontSize:'9px', textTransform:'uppercase' as const, fontWeight:700, color:'#6b7a76', letterSpacing:'0.1em' }}>CATEGORY</span>
              <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                <span style={{ fontSize:'13px', fontWeight:600, color:catFilter==='All Categories'?'#6b7a76':'#161d1b' }}>{catFilter}</span>
                <span style={{ color:'#22d4a8', fontSize:'10px', transform:catOpen?'rotate(180deg)':'rotate(0)', transition:'transform 0.2s', display:'inline-block' }}>▾</span>
              </div>
            </button>
            {catOpen && (
              <div onClick={e=>e.stopPropagation()} style={{ position:'absolute', top:'calc(100% + 8px)', left:0, minWidth:220, backgroundColor:'white', borderRadius:16, boxShadow:'0 20px 60px rgba(0,0,0,0.12)', border:'1px solid rgba(107,122,118,0.12)', zIndex:200, padding:'8px 0', maxHeight:280, overflowY:'auto' as const }}>
                {CAT_OPTIONS.map(opt=>(
                  <button key={opt} onClick={()=>{setCatFilter(opt);setCatOpen(false)}}
                    style={{ width:'100%', padding:'10px 18px', background:'none', border:'none', cursor:'pointer', textAlign:'left' as const, fontSize:'13px', fontWeight:600, color:catFilter===opt?'#22d4a8':'#161d1b', display:'flex', justifyContent:'space-between' }}
                    onMouseEnter={e=>e.currentTarget.style.backgroundColor='#f4fbf8'} onMouseLeave={e=>e.currentTarget.style.backgroundColor='transparent'}>
                    {opt}{catFilter===opt&&<span style={{color:'#22d4a8'}}>✓</span>}
                  </button>
                ))}
              </div>
            )}
          </div>
          {/* PRICE */}
          <div style={{ position:'relative', flex:1 }}>
            <button onClick={()=>{setPriceOpen(!priceOpen);setCatOpen(false);setCityOpen(false)}}
              style={{ width:'100%', height:'100%', background:'none', border:'none', cursor:'pointer', padding:'6px 20px', display:'flex', flexDirection:'column' as const, textAlign:'left' as const, gap:'1px' }}>
              <span style={{ fontSize:'9px', textTransform:'uppercase' as const, fontWeight:700, color:'#6b7a76', letterSpacing:'0.1em' }}>PRICE</span>
              <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                <span style={{ fontSize:'13px', fontWeight:600, color:price==='Any Price'?'#6b7a76':'#161d1b' }}>{price}</span>
                <span style={{ color:'#22d4a8', fontSize:'10px', transform:priceOpen?'rotate(180deg)':'rotate(0)', transition:'transform 0.2s', display:'inline-block' }}>▾</span>
              </div>
            </button>
            {priceOpen && (
              <div onClick={e=>e.stopPropagation()} style={{ position:'absolute', top:'calc(100% + 8px)', left:0, minWidth:200, backgroundColor:'white', borderRadius:16, boxShadow:'0 20px 60px rgba(0,0,0,0.12)', border:'1px solid rgba(107,122,118,0.12)', zIndex:200, padding:'8px 0' }}>
                {PRICES.map(opt=>(
                  <button key={opt} onClick={()=>{setPrice(opt);setPriceOpen(false)}}
                    style={{ width:'100%', padding:'10px 18px', background:'none', border:'none', cursor:'pointer', textAlign:'left' as const, fontSize:'13px', fontWeight:600, color:price===opt?'#22d4a8':'#161d1b', display:'flex', justifyContent:'space-between' }}
                    onMouseEnter={e=>e.currentTarget.style.backgroundColor='#f4fbf8'} onMouseLeave={e=>e.currentTarget.style.backgroundColor='transparent'}>
                    {opt}{price===opt&&<span style={{color:'#22d4a8'}}>✓</span>}
                  </button>
                ))}
              </div>
            )}
          </div>
          <button onClick={applySearch} style={{ backgroundColor:'#22d4a8', color:'white', border:'none', padding:'14px 28px', borderRadius:'100px', cursor:'pointer', display:'flex', alignItems:'center', gap:'8px', fontWeight:700, fontSize:'13px', flexShrink:0, marginLeft:'8px', transition:'background 0.15s' }}
            onMouseEnter={e=>e.currentTarget.style.backgroundColor='#0f9b8e'} onMouseLeave={e=>e.currentTarget.style.backgroundColor='#22d4a8'}><Search size={16} /> SEARCH</button>
        </div>
      </div>

      <div style={{ maxWidth:'1440px', margin:'32px auto 0', padding:'0 40px 64px' }}>

        {/* BREADCRUMB */}
        <nav style={{ display:'flex', alignItems:'center', gap:'6px', fontSize:'12px', fontWeight:700, color:'#6b7a76', textTransform:'uppercase' as const, letterSpacing:'0.06em', marginBottom:'8px' }}>
          <Link href={`/${locale}`} style={{ color:'#6b7a76', textDecoration:'none' }}>Home</Link><span>›</span>
          <Link href={`/${locale}/vault`} style={{ color:'#6b7a76', textDecoration:'none' }}>The Vault</Link><span>›</span>
          <span style={{ color:'#161d1b' }}>Collectibles &amp; Treasures</span>
        </nav>

        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'4px' }}>
          <h2 style={{ fontWeight:900, letterSpacing:'-0.05em', fontSize:'22px', color:'#161d1b' }}>Collectibles &amp; Treasures in Rabat</h2>
          <div style={{ display:'flex', gap:'8px' }}>
<div style={{ position:'relative' }}>
              <button onClick={()=>setSortOpen(!sortOpen)} style={{ display:'flex', alignItems:'center', gap:'6px', padding:'8px 14px', borderRadius:'12px', border:'1px solid rgba(186,202,197,0.4)', backgroundColor:sortOpen?'#161d1b':'#eef5f2', fontSize:'12px', fontWeight:700, cursor:'pointer', color:sortOpen?'white':'#161d1b', transition:'all 0.15s' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="3" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="13" y1="18" x2="21" y2="18"/></svg>Sort: {sortBy}
              </button>
              {sortOpen && (
                <div onClick={e=>e.stopPropagation()} style={{ position:'absolute', top:'calc(100% + 6px)', right:0, backgroundColor:'white', borderRadius:'14px', boxShadow:'0 12px 30px rgba(0,0,0,0.12)', border:'1px solid rgba(107,122,118,0.12)', zIndex:100, overflow:'hidden', minWidth:'180px' }}>
                  {['Default','Price: Low to High','Price: High to Low'].map(opt=>(
                    <button key={opt} onClick={()=>{setSortBy(opt);setSortOpen(false)}} style={{ width:'100%', padding:'10px 16px', background:'none', border:'none', textAlign:'left' as const, fontSize:'11px', fontWeight:700, color:sortBy===opt?'#22d4a8':'#161d1b', cursor:'pointer' }}>{opt}</button>
                  ))}
                </div>
              )}
            </div>
            <button onClick={()=>setSavedSearch(!savedSearch)} style={{ display:'flex', alignItems:'center', gap:'6px', padding:'8px 14px', borderRadius:'12px', border:'1px solid rgba(186,202,197,0.4)', backgroundColor:savedSearch?'#22d4a8':'#eef5f2', fontSize:'12px', fontWeight:700, cursor:'pointer', color:savedSearch?'white':'#161d1b', transition:'all 0.15s' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>{savedSearch?'Saved':'Save Search'}
            </button>
          </div>
        </div>
        <p style={{ fontSize:'14px', color:'#6b7a76', marginBottom: (applied.city||applied.keyword||price!=='Any Price') ? '12px' : '24px' }}>
          {filteredDiscovery.length} of 4,280 Collectibles &amp; Treasures across Morocco
        </p>
        {(applied.city||applied.keyword||price!=='Any Price') && (
          <div style={{ display:'flex', alignItems:'center', gap:'8px', marginBottom:'20px', flexWrap:'wrap' as const }}>
            {applied.city && <span style={{ display:'inline-flex', alignItems:'center', gap:'6px', padding:'4px 12px', borderRadius:'100px', backgroundColor:'#22d4a8', color:'white', fontSize:'12px', fontWeight:700 }}>{applied.city}<button onClick={()=>{setApplied(p=>({...p,city:''}));setCity('')}} style={{ background:'none', border:'none', cursor:'pointer', color:'white', display:'flex', padding:0 }}><X size={11}/></button></span>}
            {applied.keyword && <span style={{ display:'inline-flex', alignItems:'center', gap:'6px', padding:'4px 12px', borderRadius:'100px', backgroundColor:'#22d4a8', color:'white', fontSize:'12px', fontWeight:700 }}>"{applied.keyword}"<button onClick={()=>{setApplied(p=>({...p,keyword:''}));setKeyword('')}} style={{ background:'none', border:'none', cursor:'pointer', color:'white', display:'flex', padding:0 }}><X size={11}/></button></span>}
            {price!=='Any Price' && <span style={{ display:'inline-flex', alignItems:'center', gap:'6px', padding:'4px 12px', borderRadius:'100px', backgroundColor:'#161d1b', color:'white', fontSize:'12px', fontWeight:700 }}>{price}<button onClick={()=>setPrice('Any Price')} style={{ background:'none', border:'none', cursor:'pointer', color:'white', display:'flex', padding:0 }}><X size={11}/></button></span>}
            <button onClick={()=>{setCity('');setKeyword('');setApplied({city:'',keyword:''});setPrice('Any Price')}} style={{ padding:'4px 14px', borderRadius:'100px', border:'1px solid #ef4444', backgroundColor:'white', fontSize:'12px', fontWeight:700, cursor:'pointer', color:'#ef4444' }}>Clear All</button>
          </div>
        )}

        {/* SUB-CATEGORY TILES WITH VIEW MORE/LESS */}
        <section style={{ marginBottom:'32px' }}>
          <h2 style={{ fontWeight:900, fontSize:'14px', color:'#161d1b', textTransform:'uppercase' as const, letterSpacing:'0.1em', marginBottom:'16px' }}>BROWSE BY CATEGORY</h2>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(8,1fr)', gap:'10px', marginBottom:'12px' }}>
            {visibleSubcats.map(sub=>(
              <Link key={sub.slug} href={`/${locale}/collectibles-treasures/${sub.slug}`} style={{ textDecoration:'none' }}>
                <div style={{ position:'relative', borderRadius:'16px', overflow:'hidden', cursor:'pointer', transition:'transform 0.2s', aspectRatio:'1/1' }}
                  onMouseEnter={e=>(e.currentTarget as HTMLDivElement).style.transform='scale(1.04)'}
                  onMouseLeave={e=>(e.currentTarget as HTMLDivElement).style.transform='scale(1)'}>
                  <img src={sub.image} alt={sub.label} style={{ width:'100%', height:'100%', objectFit:'cover' }} />
                  <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top,rgba(0,0,0,0.82),rgba(0,0,0,0.1))' }} />
                  <div style={{ position:'absolute', bottom:'8px', left:'8px', right:'8px' }}>
                    <p style={{ fontSize:'9px', fontWeight:800, color:'white', lineHeight:1.2, marginBottom:'1px' }}>{sub.emoji} {sub.label}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          {/* VIEW MORE / VIEW LESS BUTTON */}
          <div style={{ textAlign:'center' as const }}>
            <button onClick={()=>setShowAll(!showAll)}
              style={{ display:'inline-flex', alignItems:'center', gap:'6px', padding:'9px 24px', borderRadius:'100px', border:'1px solid rgba(34,212,168,0.4)', backgroundColor:'white', fontSize:'12px', fontWeight:700, cursor:'pointer', color:'#22d4a8', transition:'all 0.15s' }}
              onMouseEnter={e=>{e.currentTarget.style.backgroundColor='#22d4a8';e.currentTarget.style.color='white'}}
              onMouseLeave={e=>{e.currentTarget.style.backgroundColor='white';e.currentTarget.style.color='#22d4a8'}}>
              {showAll
                ? <><ChevronUp size={14} /> View Less</>
                : <><ChevronDown size={14} /> View More ({ALL_SUBCATS.length - VISIBLE_COUNT} more categories)</>}
            </button>
          </div>
        </section>

        {/* PILLS */}
        <div style={{ display:'flex', gap:'8px', marginBottom:'16px', overflowX:'auto', paddingBottom:'4px' }}>
          {pills.map(p=><button key={p} onClick={()=>setActivePill(p)} style={{ padding:'8px 20px', borderRadius:'100px', fontSize:'12px', fontWeight:700, cursor:'pointer', border:'none', whiteSpace:'nowrap' as const, backgroundColor:activePill===p?'#161d1b':'#e8efec', color:activePill===p?'white':'#3c4a46' }}>{p}</button>)}
        </div>

        {/* UTILITY BAR */}
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'12px 0', borderTop:'1px solid rgba(186,202,197,0.25)', borderBottom:'1px solid rgba(186,202,197,0.25)', marginBottom:'16px', flexWrap:'wrap' as const, gap:'10px' }}>
          <div style={{ display:'flex', gap:'6px' }}>
            {jobTabs.map(t=><button key={t} onClick={()=>setTab(t)} style={{ padding:'7px 18px', borderRadius:'100px', fontSize:'12px', fontWeight:700, cursor:'pointer', border:'none', backgroundColor:tab===t?'#dde4e1':'transparent', color:tab===t?'#161d1b':'#6b7a76' }}>{t}</button>)}
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:'16px' }}>
            <div style={{ display:'flex', alignItems:'center', gap:'8px', cursor:'pointer' }} onClick={()=>setDiamond(!diamond)}>
              <span style={{ fontSize:'12px', fontWeight:700, color:'#6b7a76' }}>Show SouKni Diamond Verified First</span>
              <div style={{ width:'40px', height:'20px', borderRadius:'100px', backgroundColor:diamond?'#22d4a8':'#bacac5', position:'relative', transition:'background 0.25s' }}>
                <div style={{ position:'absolute', top:'2px', left:diamond?'22px':'2px', width:'16px', height:'16px', borderRadius:'50%', backgroundColor:'white', transition:'left 0.25s' }} />
              </div>
            </div>
            <div style={{ display:'flex', gap:'6px' }}>
              <button onClick={()=>setGrid(true)} style={{ width:'34px', height:'34px', display:'flex', alignItems:'center', justifyContent:'center', borderRadius:'8px', border:'none', cursor:'pointer', backgroundColor:grid?'#161d1b':'#e8efec', color:grid?'white':'#161d1b' }}><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg></button>
              <button onClick={()=>setGrid(false)} style={{ width:'34px', height:'34px', display:'flex', alignItems:'center', justifyContent:'center', borderRadius:'8px', border:'none', cursor:'pointer', backgroundColor:!grid?'#161d1b':'#e8efec', color:!grid?'white':'#161d1b' }}><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg></button>
            </div>
          </div>
        </div>

        {/* QUICK CHIPS */}
        <div style={{ display:'flex', gap:'8px', marginBottom:'32px', flexWrap:'wrap' as const }}>
          {[{emoji:'✨',label:'New Arrivals'},{emoji:'💎',label:'Rare Finds'},{emoji:'🏷️',label:'Best Value'}].map(ch=>(
            <button key={ch.label} onClick={()=>setActiveChip(ch.label)}
              style={{ display:'flex', alignItems:'center', gap:'6px', padding:'8px 16px', borderRadius:'100px', fontSize:'12px', fontWeight:700, cursor:'pointer', border:activeChip===ch.label?'none':'1px solid rgba(186,202,197,0.5)', backgroundColor:activeChip===ch.label?'#161d1b':'white', color:activeChip===ch.label?'white':'#3c4a46', transition:'all 0.15s' }}
              onMouseEnter={e=>{if(activeChip!==ch.label){e.currentTarget.style.borderColor='#22d4a8';e.currentTarget.style.color='#161d1b'}}}
              onMouseLeave={e=>{if(activeChip!==ch.label){e.currentTarget.style.borderColor='rgba(186,202,197,0.5)';e.currentTarget.style.color='#3c4a46'}}}>{ch.emoji} {ch.label}</button>
          ))}
        </div>

        {/* TOP CHOICES */}
        <section style={{ marginBottom:'40px' }}>
          <h2 style={{ fontSize:'13px', fontWeight:900, color:'#161d1b', textTransform:'uppercase' as const, letterSpacing:'0.1em', marginBottom:'20px' }}>SOUKNI TOP CHOICES</h2>
          {realTopChoices.map(item=><TopChoiceCard key={item.id} item={item} locale={locale} />)}
        </section>

        {/* DARK BANNER */}
        <div style={{ borderRadius:'40px', overflow:'hidden', marginBottom:'40px', background:'linear-gradient(135deg,#161d1b,#1a2e28)', padding:'40px 48px', display:'grid', gridTemplateColumns:'1fr 1fr', gap:'40px', alignItems:'center' }}>
          <div>
            <p style={{ fontSize:'10px', fontWeight:700, color:'#22d4a8', textTransform:'uppercase' as const, letterSpacing:'0.15em', marginBottom:'8px' }}>SouKni Immo Pro</p>
            <h3 style={{ fontWeight:900, letterSpacing:'-0.05em', fontSize:'28px', color:'white', marginBottom:'12px', lineHeight:1.1 }}>List your luxury property where Morocco's elite browse.</h3>
            <div style={{ display:'flex', gap:'12px' }}>
              <Link href={`/${locale}/property`} style={{ textDecoration:'none' }}><button style={{ backgroundColor:'#22d4a8', color:'white', border:'none', padding:'11px 24px', borderRadius:'100px', fontWeight:700, fontSize:'12px', cursor:'pointer' }}>Explore Properties</button></Link>
              <button style={{ backgroundColor:'transparent', color:'white', border:'1px solid rgba(255,255,255,0.3)', padding:'11px 24px', borderRadius:'100px', fontWeight:700, fontSize:'12px', cursor:'pointer' }}>Contact Expert</button>
            </div>
          </div>
          <div style={{ position:'relative', height:'200px', borderRadius:'24px', overflow:'hidden' }}>
            <img src="https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&w=800" alt="Property" style={{ width:'100%', height:'100%', objectFit:'cover', opacity:0.7 }} />
          </div>
        </div>

        {/* BENTO COLLECTION */}
        <section style={{ marginBottom:'40px' }}>
          <h2 style={{ fontWeight:900, letterSpacing:'-0.05em', fontSize:'22px', color:'#22d4a8', marginBottom:'16px' }}>SouKni Collectibles Collection</h2>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'16px', marginBottom:'16px' }}>
            {realBentoListings.slice(0,3).map(item=>(
              <Link key={item.id} href={`/${locale}/listing/${item.id}`} style={{ textDecoration:'none' }}>
                <div style={{ position:'relative', height:'220px', borderRadius:'28px', overflow:'hidden', cursor:'pointer', transition:'transform 0.2s' }}
                  onMouseEnter={e=>(e.currentTarget as HTMLDivElement).style.transform='scale(1.02)'}
                  onMouseLeave={e=>(e.currentTarget as HTMLDivElement).style.transform='scale(1)'}>
                  <img src={item.image} alt={item.title} style={{ width:'100%', height:'100%', objectFit:'cover' }} />
                  <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top,rgba(0,0,0,0.85),rgba(0,0,0,0.05))' }} />
                  <div style={{ position:'absolute', top:'12px', left:'12px' }}><CertifiedBadge /></div>
                  <div style={{ position:'absolute', bottom:'16px', left:'16px', right:'16px' }}>
                    <h3 style={{ fontWeight:900, fontSize:'14px', color:'white', marginBottom:'4px', lineHeight:1.3 }}>{item.title}</h3>
                    <p style={{ fontWeight:900, fontSize:'16px', color:'#22d4a8' }}>{item.price.toLocaleString()} MAD</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'16px' }}>
            {realBentoListings.slice(3).map(item=>(
              <Link key={item.id} href={`/${locale}/listing/${item.id}`} style={{ textDecoration:'none' }}>
                <div style={{ position:'relative', height:'200px', borderRadius:'28px', overflow:'hidden', cursor:'pointer', transition:'transform 0.2s' }}
                  onMouseEnter={e=>(e.currentTarget as HTMLDivElement).style.transform='scale(1.02)'}
                  onMouseLeave={e=>(e.currentTarget as HTMLDivElement).style.transform='scale(1)'}>
                  <img src={item.image} alt={item.title} style={{ width:'100%', height:'100%', objectFit:'cover' }} />
                  <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top,rgba(0,0,0,0.85),rgba(0,0,0,0.05))' }} />
                  <div style={{ position:'absolute', top:'12px', left:'12px' }}><CertifiedBadge /></div>
                  <div style={{ position:'absolute', bottom:'16px', left:'16px', right:'16px' }}>
                    <h3 style={{ fontWeight:900, fontSize:'15px', color:'white', marginBottom:'4px' }}>{item.title}</h3>
                    <p style={{ fontWeight:900, fontSize:'17px', color:'#22d4a8' }}>{item.price.toLocaleString()} MAD</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* CREAM BANNER */}
        <div style={{ borderRadius:'40px', backgroundColor:'#f5ede0', padding:'40px 48px', display:'grid', gridTemplateColumns:'1fr 1fr', gap:'40px', alignItems:'center', marginBottom:'40px' }}>
          <div>
            <p style={{ fontSize:'10px', fontWeight:700, color:'#8a7a5c', textTransform:'uppercase' as const, letterSpacing:'0.15em', marginBottom:'8px' }}>SouKni Auto Pro</p>
            <h3 style={{ fontWeight:900, letterSpacing:'-0.05em', fontSize:'28px', color:'#161d1b', marginBottom:'12px', lineHeight:1.1 }}>Premium Vehicles for the Elite Shopper.</h3>
            <div style={{ display:'flex', gap:'12px', marginTop:'20px' }}>
              <Link href={`/${locale}/motors`} style={{ textDecoration:'none' }}><button style={{ backgroundColor:'#161d1b', color:'white', border:'none', padding:'11px 24px', borderRadius:'100px', fontWeight:700, fontSize:'12px', cursor:'pointer' }}>Browse & Explore</button></Link>
              <button style={{ backgroundColor:'transparent', color:'#161d1b', border:'1px solid #161d1b', padding:'11px 24px', borderRadius:'100px', fontWeight:700, fontSize:'12px', cursor:'pointer' }}>Contact Expert</button>
            </div>
          </div>
          <div style={{ position:'relative', height:'200px', borderRadius:'24px', overflow:'hidden' }}>
            <img src="https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&w=800" alt="Motors" style={{ width:'100%', height:'100%', objectFit:'cover' }} />
          </div>
        </div>

        {/* DISCOVERY GRID */}
        <section style={{ marginBottom:'40px' }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'20px' }}>
            <h2 style={{ fontWeight:900, letterSpacing:'-0.05em', fontSize:'20px', color:'#161d1b' }}>More Collectibles &amp; Treasures</h2>
            <Link href="#" style={{ color:'#22d4a8', fontWeight:700, fontSize:'13px', textDecoration:'none', display:'flex', alignItems:'center', gap:'3px' }}>View all <ChevronRight size={14} /></Link>
          </div>
          {filteredDiscovery.length === 0 ? (
            <div style={{ textAlign:'center' as const, padding:'48px 20px', backgroundColor:'white', borderRadius:'24px' }}>
              <p style={{ fontSize:'16px', fontWeight:700, color:'#161d1b', marginBottom:'8px' }}>No results found</p>
              <p style={{ fontSize:'13px', color:'#6b7a76', marginBottom:'16px' }}>Try a different city, keyword or price range</p>
              <button onClick={()=>{setCity('');setKeyword('');setApplied({city:'',keyword:''});setPrice('Any Price')}}
                style={{ padding:'10px 24px', borderRadius:'100px', backgroundColor:'#22d4a8', color:'white', border:'none', fontWeight:700, fontSize:'13px', cursor:'pointer' }}>Clear Filters</button>
            </div>
          ) : grid ? (
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'16px' }}>
              {filteredDiscovery.map(item=><DiscoveryCard key={item.id} item={item} locale={locale} />)}
            </div>
          ) : (
            <div style={{ display:'flex', flexDirection:'column' as const, gap:'12px' }}>
              {filteredDiscovery.map(item=>(
                <div key={item.id} style={{ display:'flex', backgroundColor:'white', borderRadius:'20px', border:'1px solid rgba(107,122,118,0.1)', overflow:'hidden', height:'120px' }}>
                  <img src={item.image} alt={item.title} style={{ width:'120px', height:'100%', objectFit:'cover' as const, flexShrink:0 }} />
                  <div style={{ flex:1, padding:'14px 18px', display:'flex', flexDirection:'column' as const, justifyContent:'space-between' }}>
                    <div>
                      <p style={{ fontSize:'11px', color:'#6b7a76', marginBottom:'3px' }}>{item.location}</p>
                      <h4 style={{ fontSize:'14px', fontWeight:900, color:'#161d1b' }}>{item.title}</h4>
                    </div>
                    <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                      <p style={{ fontSize:'17px', fontWeight:900, color:'#22d4a8' }}>{item.price.toLocaleString()} MAD</p>
                      <div style={{ display:'flex', gap:'8px' }}>
                        <button style={{ padding:'7px 14px', borderRadius:'10px', border:'1px solid #161d1b', backgroundColor:'transparent', color:'#161d1b', fontSize:'10px', fontWeight:700, cursor:'pointer' }}>Message</button>
                        <button style={{ padding:'7px 14px', borderRadius:'10px', border:'none', backgroundColor:'#25D366', color:'white', fontSize:'10px', fontWeight:700, cursor:'pointer' }}>WhatsApp</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* PAGINATION */}
        <div style={{ display:'flex', justifyContent:'center', alignItems:'center', gap:'8px', marginBottom:'48px' }}>
          {[1,2,3,4].map(p=>(
            <button key={p} onClick={()=>setPage(p)} style={{ width:'36px', height:'36px', borderRadius:'10px', border:page===p?'none':'1px solid #e2e8f0', backgroundColor:page===p?'#22d4a8':'white', color:page===p?'white':'#161d1b', fontWeight:700, fontSize:'13px', cursor:'pointer' }}>{p}</button>
          ))}
          <button style={{ padding:'0 16px', height:'36px', borderRadius:'10px', border:'1px solid #e2e8f0', backgroundColor:'white', color:'#161d1b', fontWeight:700, fontSize:'13px', cursor:'pointer', display:'flex', alignItems:'center', gap:'4px' }}>Next <ChevronRight size={14} /></button>
        </div>

        {/* JOIN THE SOUKNI FAMILY */}
        <section style={{ borderRadius:'40px', background:'linear-gradient(135deg,#22d4a8,#0f9b8e)', padding:'56px 48px', display:'flex', alignItems:'center', justifyContent:'space-between', gap:'40px', flexWrap:'wrap' as const, marginBottom:'64px' }}>
          <div>
            <h2 style={{ fontWeight:900, letterSpacing:'-0.05em', fontSize:'36px', color:'white', marginBottom:'10px', lineHeight:1.05 }}>JOIN THE SOUKNI FAMILY</h2>
            <p style={{ fontSize:'15px', color:'rgba(255,255,255,0.85)', maxWidth:'480px', lineHeight:1.7 }}>List your antiques, vintage treasures and cultural heritage pieces for free and reach Morocco's most discerning collectors.</p>
            <div style={{ display:'flex', gap:'12px', marginTop:'24px' }}>
              <button style={{ backgroundColor:'white', color:'#0f9b8e', border:'none', padding:'12px 24px', borderRadius:'100px', fontWeight:800, fontSize:'13px', cursor:'pointer' }}>App Store</button>
              <button style={{ backgroundColor:'rgba(255,255,255,0.2)', color:'white', border:'1px solid rgba(255,255,255,0.4)', padding:'12px 24px', borderRadius:'100px', fontWeight:800, fontSize:'13px', cursor:'pointer' }}>Google Play</button>
            </div>
          </div>
          <Link href={`/${locale}/post-ad`} style={{ textDecoration:'none' }}>
            <span style={{ display:'inline-block', backgroundColor:'white', color:'#0f9b8e', padding:'16px 36px', borderRadius:'100px', fontWeight:900, fontSize:'14px', cursor:'pointer', whiteSpace:'nowrap' as const }}>Post Free Ad →</span>
          </Link>
        </section>

      </div>
    </div>
  )
}
