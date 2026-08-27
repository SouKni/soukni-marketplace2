'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Search, ChevronRight } from 'lucide-react'
import { useListings } from '@/hooks/useListings'
import ListingCard from '@/components/ui/ListingCard'
import Breadcrumb from '@/components/ui/Breadcrumb'
import FilterBar from '@/components/ui/FilterBar'
import type { Listing } from '@/lib/types'
import { useDictionary } from '@/lib/useDictionary'

const C = { mint:'#22d4a8', mintDk:'#0f9b8e', ink:'#161d1b', surface:'#f4fbf8', muted:'#6b7a76' }
const UB = { fontFamily:"'Inter',sans-serif", fontWeight:900, letterSpacing:'-0.05em' } as const

// categories moved inside component to support translation

const trending = ['iPhone 15 Pro','Gaming Laptop','AirPods Pro','Samsung TV 65"','MacBook Air M3','PS5 Console','Smart Watch','DSLR Camera','Bluetooth Speaker','Drone 4K','Wireless Charger','Mechanical Keyboard']

function mapRowToListing(row: any): Listing {
  return {
    id: row.id,
    title: row.title,
    price: (row.price || 0) / 100,
    currency: row.currency || 'MAD',
    category: row.subcategory ? row.subcategory.charAt(0).toUpperCase() + row.subcategory.slice(1) : row.category_slug,
    location: row.city,
    images: row.images && row.images.length ? row.images : ['https://images.pexels.com/photos/1229861/pexels-photo-1229861.jpeg?auto=compress&w=600'],
    isVerified: row.badge === 'verified' || row.badge === 'certified',
    badge: row.badge,
    seller: row.profiles ? { name: row.profiles.full_name, type: 'owner', rating: row.profiles.rating, phone: row.profiles.phone } : undefined,
  }
}

export default function ElectronicsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = React.use(params)
  const t = useDictionary(locale)
  const categories = [
    { slug:'mobiles',         label:t.electronics.catMobiles,         count:'9,318', emoji:'📱', image:'https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&w=600' },
    { slug:'tablets',         label:t.electronics.catTablets,         count:'2,140', emoji:'📲', image:'https://images.pexels.com/photos/1334597/pexels-photo-1334597.jpeg?auto=compress&w=600' },
    { slug:'laptops',         label:t.electronics.catLaptops,         count:'4,210', emoji:'💻', image:'https://images.pexels.com/photos/1229861/pexels-photo-1229861.jpeg?auto=compress&w=600' },
    { slug:'desktops',        label:t.electronics.catDesktops,        count:'980',   emoji:'🖥️', image:'https://images.pexels.com/photos/303383/pexels-photo-303383.jpeg?auto=compress&w=600' },
    { slug:'audio',           label:t.electronics.catAudio,           count:'1,930', emoji:'🎧', image:'https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&w=600' },
    { slug:'wearables',       label:t.electronics.catWearables,       count:'1,540', emoji:'⌚', image:'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&w=600' },
    { slug:'cameras',         label:t.electronics.catCameras,         count:'1,120', emoji:'📷', image:'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&w=600' },
    { slug:'projectors-tvs',  label:t.electronics.catProjectorsTvs,   count:'2,840', emoji:'📺', image:'https://images.pexels.com/photos/1571442/pexels-photo-1571442.jpeg?auto=compress&w=600' },
    { slug:'accessories',     label:t.electronics.catAccessories,     count:'6,200', emoji:'🔌', image:'https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&w=600' },
    { slug:'car-electronics', label:t.electronics.catCarElectronics,  count:'1,420', emoji:'🚗', image:'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&w=600' },
    { slug:'smart-home',      label:t.electronics.catSmartHome,       count:'1,560', emoji:'🏠', image:'https://images.pexels.com/photos/1090638/pexels-photo-1090638.jpeg?auto=compress&w=600' },
  ]
  const [keyword, setKeyword] = useState('')
  const [city, setCity] = useState('')
  const [minPrice, setMinPrice] = useState<number|undefined>()
  const [maxPrice, setMaxPrice] = useState<number|undefined>()
  const [sortBy, setSortBy] = useState<'newest'|'price_asc'|'price_desc'>('newest')
  const [page, setPage] = useState(1)
  const LIMIT = 12
  const [hovCat, setHovCat] = useState<string|null>(null)
  const { fetchListings, loading } = useListings()
  const [listings, setListings] = useState<Listing[]>([])
  const [total, setTotal] = useState(0)

  // Debounced search — fires 400ms after last change
  useEffect(() => {
    const t = setTimeout(() => {
      fetchListings({
        category: 'electronics',
        query: keyword || undefined,
        city: city || undefined,
        minPrice,
        maxPrice,
        sortBy,
        limit: LIMIT,
        offset: (page - 1) * LIMIT,
      }).then(rows => {
        setListings((rows || []).map(mapRowToListing))
        setTotal(rows?.length === LIMIT ? page * LIMIT + 1 : (page - 1) * LIMIT + (rows?.length || 0))
      })
    }, 400)
    return () => clearTimeout(t)
  }, [keyword, city, minPrice, maxPrice, sortBy, page])

  const dict = { save: t.common.save ?? 'Save', viewDetails: t.listing.viewDetails, mad: t.listing.mad }

  return (
    <div style={{ fontFamily:"'Inter',sans-serif", backgroundColor:C.surface, minHeight:'100vh' }}>

      {/* CINEMATIC HERO */}
      <section style={{ position:'relative', height:520, overflow:'hidden', display:'flex', alignItems:'center', justifyContent:'center' }}>
        <img src="https://images.pexels.com/photos/1229861/pexels-photo-1229861.jpeg?auto=compress&w=1600" alt="Electronics"
          style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover' }} />
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top,rgba(15,23,42,0.88),rgba(15,23,42,0.32))' }} />
        <div style={{ position:'relative', zIndex:10, textAlign:'center', padding:'0 24px', maxWidth:760, width:'100%' }}>
          <p style={{ fontSize:11, fontWeight:800, color:C.mint, textTransform:'uppercase' as const, letterSpacing:'0.2em', marginBottom:16 }}>{t.electronics.badge}</p>
          <h1 style={{ ...UB, fontSize:'clamp(36px,6vw,68px)', color:'white', lineHeight:1.0, marginBottom:20, textTransform:'uppercase' as const }}>
            {t.electronics.heroLine1}<br />{t.electronics.heroLine2}<br />{t.electronics.heroLine3}
          </h1>
          <p style={{ fontSize:16, color:'rgba(255,255,255,0.75)', marginBottom:32, maxWidth:520, margin:'0 auto 32px' }}>
            {t.electronics.heroSubtitle}
          </p>
          <div style={{ display:'flex', alignItems:'stretch', backgroundColor:'rgba(255,255,255,0.12)', backdropFilter:'blur(24px)', border:'1px solid rgba(255,255,255,0.25)', borderRadius:100, overflow:'hidden', maxWidth:680, margin:'0 auto', boxShadow:'0 8px 32px rgba(0,0,0,0.2)' }}>
            <div style={{ display:'flex', flexDirection:'column' as const, padding:'14px 22px', flex:'0 0 160px', borderRight:'1px solid rgba(255,255,255,0.2)', gap:2 }}>
              <span style={{ fontSize:9, fontWeight:800, color:'rgba(255,255,255,0.55)', textTransform:'uppercase' as const, letterSpacing:'0.12em' }}>{t.common.city}</span>
              <input value={city} onChange={e=>setCity(e.target.value)} placeholder={t.locations.allMorocco} style={{ backgroundColor:'transparent', border:'none', outline:'none', fontSize:14, fontWeight:600, color:'white', fontFamily:"'Inter',sans-serif", padding:0 }} />
            </div>
            <div style={{ display:'flex', flexDirection:'column' as const, padding:'14px 22px', flex:1, borderRight:'1px solid rgba(255,255,255,0.2)', gap:2 }}>
              <span style={{ fontSize:9, fontWeight:800, color:'rgba(255,255,255,0.55)', textTransform:'uppercase' as const, letterSpacing:'0.12em' }}>{t.common.keyword}</span>
              <input value={keyword} onChange={e=>setKeyword(e.target.value)} placeholder={t.electronics.keywordPlaceholder} style={{ backgroundColor:'transparent', border:'none', outline:'none', fontSize:14, fontWeight:600, color:'white', fontFamily:"'Inter',sans-serif", padding:0, width:'100%' }} />
            </div>
            <button style={{ backgroundColor:C.mint, color:'white', border:'none', padding:'0 32px', fontWeight:800, fontSize:14, cursor:'pointer', flexShrink:0, transition:'background 0.15s', display:'flex', alignItems:'center', gap:8 }}
              onMouseEnter={e=>e.currentTarget.style.backgroundColor=C.mintDk}
              onMouseLeave={e=>e.currentTarget.style.backgroundColor=C.mint}
              onClick={()=>setPage(1)}>
              <Search size={16} /> {t.common.search}
            </button>
          </div>
        </div>
      </section>

      {/* ADVANCED FILTER BAR */}
      <div style={{ maxWidth:1440, margin:'-26px auto 0', padding:'0 40px', position:'relative', zIndex:30 }}>
        <div style={{ backgroundColor:'rgba(255,255,255,0.95)', backdropFilter:'blur(20px)', borderRadius:100, padding:'8px 8px 8px 0', boxShadow:'0 8px 40px rgba(0,0,0,0.10)', border:'1px solid rgba(255,255,255,0.7)', display:'flex', alignItems:'center' }}>
          {/* City */}
          <div style={{ flex:1, padding:'8px 20px', borderRight:'1px solid rgba(186,202,197,0.25)', display:'flex', flexDirection:'column' as const, gap:1 }}>
            <span style={{ fontSize:9, textTransform:'uppercase' as const, fontWeight:700, color:C.muted, letterSpacing:'0.1em' }}>{t.common.city}</span>
            <input value={city} onChange={e=>{setCity(e.target.value);setPage(1)}} placeholder={t.locations.allMorocco}
              style={{ fontSize:13, fontWeight:600, color:C.ink, border:'none', outline:'none', backgroundColor:'transparent', fontFamily:"'Inter',sans-serif", padding:0 }} />
          </div>
          {/* Keyword */}
          <div style={{ flex:2, padding:'8px 20px', borderRight:'1px solid rgba(186,202,197,0.25)', display:'flex', flexDirection:'column' as const, gap:1 }}>
            <span style={{ fontSize:9, textTransform:'uppercase' as const, fontWeight:700, color:C.muted, letterSpacing:'0.1em' }}>{t.common.keyword}</span>
            <input value={keyword} onChange={e=>{setKeyword(e.target.value);setPage(1)}} placeholder={t.electronics.keywordPlaceholderShort}
              style={{ fontSize:13, fontWeight:600, color:C.ink, border:'none', outline:'none', backgroundColor:'transparent', fontFamily:"'Inter',sans-serif", padding:0, width:'100%' }} />
          </div>
          {/* Price range */}
          <div style={{ flex:1, padding:'8px 20px', borderRight:'1px solid rgba(186,202,197,0.25)', display:'flex', flexDirection:'column' as const, gap:1 }}>
            <span style={{ fontSize:9, textTransform:'uppercase' as const, fontWeight:700, color:C.muted, letterSpacing:'0.1em' }}>{t.electronics.minPrice}</span>
            <input type="number" value={minPrice||''} onChange={e=>{setMinPrice(e.target.value?Number(e.target.value):undefined);setPage(1)}} placeholder="0"
              style={{ fontSize:13, fontWeight:600, color:C.ink, border:'none', outline:'none', backgroundColor:'transparent', fontFamily:"'Inter',sans-serif", padding:0, width:'100%' }} />
          </div>
          <div style={{ flex:1, padding:'8px 20px', borderRight:'1px solid rgba(186,202,197,0.25)', display:'flex', flexDirection:'column' as const, gap:1 }}>
            <span style={{ fontSize:9, textTransform:'uppercase' as const, fontWeight:700, color:C.muted, letterSpacing:'0.1em' }}>{t.electronics.maxPrice}</span>
            <input type="number" value={maxPrice||''} onChange={e=>{setMaxPrice(e.target.value?Number(e.target.value):undefined);setPage(1)}} placeholder="Any"
              style={{ fontSize:13, fontWeight:600, color:C.ink, border:'none', outline:'none', backgroundColor:'transparent', fontFamily:"'Inter',sans-serif", padding:0, width:'100%' }} />
          </div>
          {/* Sort */}
          <div style={{ flex:1, padding:'8px 20px', display:'flex', flexDirection:'column' as const, gap:1 }}>
            <span style={{ fontSize:9, textTransform:'uppercase' as const, fontWeight:700, color:C.muted, letterSpacing:'0.1em' }}>{t.electronics.sortBy}</span>
            <select value={sortBy} onChange={e=>{setSortBy(e.target.value as any);setPage(1)}}
              style={{ fontSize:13, fontWeight:600, color:C.ink, border:'none', outline:'none', backgroundColor:'transparent', fontFamily:"'Inter',sans-serif", padding:0, cursor:'pointer' }}>
              <option value="newest">{t.electronics.newest}</option>
              <option value="price_asc">{t.electronics.priceAsc}</option>
              <option value="price_desc">{t.electronics.priceDesc}</option>
            </select>
          </div>
          {[
            { label:'IGNORE', val:'IGNORE', w:1 },
          ].filter(()=>false).map((f,i)=>(
            <div key={f.label} style={{ flex:f.w, padding:'8px 20px', borderRight:i<3?'1px solid rgba(186,202,197,0.25)':'none', display:'flex', flexDirection:'column' as const, cursor:'pointer', gap:1 }}>
              <span style={{ fontSize:9, textTransform:'uppercase' as const, fontWeight:700, color:C.muted, letterSpacing:'0.1em' }}>{f.label}</span>
              <span style={{ fontSize:13, fontWeight:600, color:C.ink }}>{f.val}</span>
            </div>
          ))}
          <button style={{ backgroundColor:C.mint, color:'white', border:'none', padding:'12px 24px', borderRadius:100, cursor:'pointer', fontWeight:700, fontSize:13, flexShrink:0, marginLeft:8, display:'flex', alignItems:'center', gap:6 }}>
            <Search size={15} /> {t.common.search.toUpperCase()}
          </button>
        </div>
      </div>

      <div style={{ maxWidth:1440, margin:'48px auto 0', padding:'0 40px 80px' }}>

        {/* BREADCRUMB */}
        <Breadcrumb
          items={[{ label:t.common.home, href:`/${locale}` }, { label:t.electronics.badge }]}
          mutedColor={C.muted}
          inkColor={C.ink}
          style={{ marginBottom:32 }}
        />

        {/* CATEGORY GRID — 11 categories + View More = 12 tiles */}
        <section style={{ marginBottom:64 }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:24 }}>
            <h2 style={{ ...UB, fontSize:28, color:C.ink }}>{t.common.browseByCategory}</h2>
            <span style={{ fontSize:14, color:C.muted }}>33,780 {t.common.totalListings}</span>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:16 }}>
            {categories.map(cat=>(
              <Link key={cat.slug} href={`/${locale}/electronics/${cat.slug}`} style={{ textDecoration:'none' }}>
                <div onMouseEnter={()=>setHovCat(cat.slug)} onMouseLeave={()=>setHovCat(null)}
                  style={{ position:'relative', borderRadius:24, overflow:'hidden', cursor:'pointer', transition:'transform 0.2s, box-shadow 0.2s', transform:hovCat===cat.slug?'scale(1.02)':'scale(1)', boxShadow:hovCat===cat.slug?'0 20px 48px rgba(0,0,0,0.15)':'0 2px 8px rgba(0,0,0,0.06)' }}>
                  <div style={{ aspectRatio:'4/3', overflow:'hidden' }}>
                    <img src={cat.image} alt={cat.label} style={{ width:'100%', height:'100%', objectFit:'cover', transition:'transform 0.5s', transform:hovCat===cat.slug?'scale(1.08)':'scale(1)' }} />
                  </div>
                  <div style={{ position:'absolute', inset:0, background:hovCat===cat.slug?'linear-gradient(to top,rgba(34,212,168,0.75),rgba(0,0,0,0.1))':'linear-gradient(to top,rgba(0,0,0,0.72),rgba(0,0,0,0.05))' }} />
                  <div style={{ position:'absolute', bottom:0, left:0, right:0, padding:'16px 18px' }}>
                    <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                      <div>
                        <p style={{ ...UB, fontSize:15, color:'white', marginBottom:3 }}>{cat.label}</p>
                        <p style={{ fontSize:11, color:'rgba(255,255,255,0.8)', fontWeight:600 }}>{cat.count} {t.common.ads}</p>
                      </div>
                      <div style={{ width:36, height:36, borderRadius:'50%', backgroundColor:'rgba(255,255,255,0.2)', backdropFilter:'blur(8px)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:18 }}>
                        {cat.emoji}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}

            {/* Gaming tile — 12th slot */}
            <Link href={`/${locale}/gaming`} style={{ textDecoration:'none' }}>
              <div onMouseEnter={()=>setHovCat('gaming')} onMouseLeave={()=>setHovCat(null)}
                style={{ position:'relative', borderRadius:24, overflow:'hidden', cursor:'pointer', transition:'transform 0.2s, box-shadow 0.2s', transform:hovCat==='gaming'?'scale(1.02)':'scale(1)', boxShadow:hovCat==='gaming'?'0 20px 48px rgba(0,0,0,0.15)':'0 2px 8px rgba(0,0,0,0.06)' }}>
                <div style={{ aspectRatio:'4/3', overflow:'hidden' }}>
                  <img src="https://images.pexels.com/photos/3945656/pexels-photo-3945656.jpeg?auto=compress&w=600" alt="Gaming" style={{ width:'100%', height:'100%', objectFit:'cover', transition:'transform 0.5s', transform:hovCat==='gaming'?'scale(1.08)':'scale(1)' }} />
                </div>
                <div style={{ position:'absolute', inset:0, background:hovCat==='gaming'?'linear-gradient(to top,rgba(34,212,168,0.75),rgba(0,0,0,0.1))':'linear-gradient(to top,rgba(0,0,0,0.72),rgba(0,0,0,0.05))' }} />
                <div style={{ position:'absolute', bottom:0, left:0, right:0, padding:'16px 18px' }}>
                  <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                    <div>
                      <p style={{ ...UB, fontSize:15, color:'white', marginBottom:3 }}>{t.electronics.catGaming}</p>
                      <p style={{ fontSize:11, color:'rgba(255,255,255,0.8)', fontWeight:600 }}>4,820 {t.common.ads}</p>
                    </div>
                    <div style={{ width:36, height:36, borderRadius:'50%', backgroundColor:'rgba(255,255,255,0.2)', backdropFilter:'blur(8px)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:18 }}>
                      🎮
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </section>

        {/* ELECTRO PRO BANNER */}
        <section style={{ marginBottom:64 }}>
          <div style={{ position:'relative', height:220, borderRadius:40, overflow:'hidden', cursor:'pointer', boxShadow:'0 20px 60px rgba(0,0,0,0.15)' }}>
            <img src="https://images.pexels.com/photos/1229861/pexels-photo-1229861.jpeg?auto=compress&w=1200" alt="Electro Pro"
              style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover' }} />
            <div style={{ position:'absolute', inset:0, background:'linear-gradient(to right,rgba(22,29,27,0.92) 0%,rgba(22,29,27,0.5) 60%,transparent)' }} />
            <div style={{ position:'absolute', inset:0, display:'flex', flexDirection:'column' as const, justifyContent:'center', padding:'0 56px' }}>
              <span style={{ backgroundColor:C.mint, color:'white', fontSize:9, ...UB, padding:'4px 14px', borderRadius:100, textTransform:'uppercase' as const, letterSpacing:'0.12em', display:'inline-block', marginBottom:14, width:'fit-content' }}>{t.electronics.electroProBadge}</span>
              <h2 style={{ ...UB, fontSize:'clamp(20px,3vw,32px)', color:'white', marginBottom:20, lineHeight:1.1 }}>{t.electronics.electroProTitle}<br/>{t.electronics.electroProTitle2}</h2>
              <div style={{ display:'flex', gap:12 }}>
                <button style={{ backgroundColor:'white', color:C.ink, border:'none', padding:'11px 28px', borderRadius:100, fontSize:12, ...UB, cursor:'pointer' }}>{t.electronics.explorProDeals}</button>
                <button style={{ backgroundColor:'transparent', color:'white', border:'1px solid rgba(255,255,255,0.4)', padding:'11px 28px', borderRadius:100, fontSize:12, fontWeight:700, cursor:'pointer' }}>{t.common.contactExpert}</button>
              </div>
            </div>
          </div>
        </section>

        {/* LATEST LISTINGS — real data from Supabase */}
        <section style={{ marginBottom:64 }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:24 }}>
            <h2 style={{ ...UB, fontSize:28, color:C.ink }}>{t.electronics.latestListings}</h2>
            <Link href={`/${locale}/electronics/mobiles`} style={{ color:C.mint, fontWeight:700, fontSize:13, textDecoration:'none', display:'flex', alignItems:'center', gap:4 }}>
              {t.common.viewAll} <ChevronRight size={14} />
            </Link>
          </div>
          {loading ? (
            <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:20 }}>
              {Array.from({length:8}).map((_,i)=>(
                <div key={i} style={{ backgroundColor:'white', borderRadius:24, overflow:'hidden', height:320, animation:'pulse 1.5s ease-in-out infinite' }}>
                  <div style={{ height:220, backgroundColor:'#e8efec' }} />
                  <div style={{ padding:16 }}>
                    <div style={{ height:12, backgroundColor:'#e8efec', borderRadius:6, marginBottom:8 }} />
                    <div style={{ height:12, backgroundColor:'#e8efec', borderRadius:6, width:'60%' }} />
                  </div>
                </div>
              ))}
            </div>
          ) : listings.length === 0 ? (
            <div style={{ textAlign:'center', padding:'64px 0', color:C.muted }}>
              <p style={{ fontSize:18, fontWeight:700, marginBottom:8 }}>{t.electronics.noListings}</p>
              <p style={{ fontSize:14 }}>{t.electronics.tryAdjusting}</p>
              <button onClick={()=>{setKeyword('');setCity('');setMinPrice(undefined);setMaxPrice(undefined);setPage(1)}}
                style={{ marginTop:16, padding:'10px 24px', borderRadius:100, backgroundColor:C.mint, color:'white', border:'none', fontWeight:700, cursor:'pointer' }}>
                {t.electronics.clearFilters}
              </button>
            </div>
          ) : (
            <>
              <p style={{ fontSize:13, color:C.muted, marginBottom:16 }}>{listings.length} {listings.length!==1?t.electronics.listingsFound:t.electronics.listingFound}{city?` ${t.electronics.inCity} ${city}`:''}{ keyword?` ${t.electronics.forKeyword} "${keyword}"`:''}</p>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:20 }}>
                {listings.map(item => <ListingCard key={item.id} listing={item} locale={locale as any} dict={dict} />)}
              </div>
              {/* Pagination */}
              <div style={{ display:'flex', justifyContent:'center', alignItems:'center', gap:8, marginTop:32 }}>
                <button onClick={()=>setPage(p=>Math.max(1,p-1))} disabled={page===1}
                  style={{ width:36, height:36, borderRadius:10, border:'1px solid #e2e8f0', backgroundColor:'white', cursor:page===1?'not-allowed':'pointer', opacity:page===1?0.4:1, display:'flex', alignItems:'center', justifyContent:'center', color:C.ink }}>‹</button>
                <span style={{ fontSize:13, fontWeight:700, color:C.ink, padding:'0 12px' }}>{t.electronics.page} {page}</span>
                <button onClick={()=>setPage(p=>p+1)} disabled={listings.length < LIMIT}
                  style={{ width:36, height:36, borderRadius:10, border:'1px solid #e2e8f0', backgroundColor:'white', cursor:listings.length<LIMIT?'not-allowed':'pointer', opacity:listings.length<LIMIT?0.4:1, display:'flex', alignItems:'center', justifyContent:'center', color:C.ink }}>›</button>
              </div>
            </>
          )}
          <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.5}}`}</style>
        </section>

        {/* GAMING BANNER */}
        <section style={{ marginBottom:64 }}>
          <div style={{ position:'relative', height:220, borderRadius:40, overflow:'hidden', cursor:'pointer', boxShadow:'0 20px 60px rgba(0,0,0,0.15)' }}>
            <img src="https://images.pexels.com/photos/3945656/pexels-photo-3945656.jpeg?auto=compress&w=1200" alt="Gaming"
              style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover' }} />
            <div style={{ position:'absolute', inset:0, background:'linear-gradient(to right,rgba(22,29,27,0.92) 0%,rgba(22,29,27,0.5) 60%,transparent)' }} />
            <div style={{ position:'absolute', inset:0, display:'flex', flexDirection:'column' as const, justifyContent:'center', padding:'0 56px' }}>
              <span style={{ backgroundColor:'#7c3aed', color:'white', fontSize:9, ...UB, padding:'4px 14px', borderRadius:100, textTransform:'uppercase' as const, letterSpacing:'0.12em', display:'inline-block', marginBottom:14, width:'fit-content' }}>SouKni Gaming</span>
              <h2 style={{ ...UB, fontSize:'clamp(20px,3vw,32px)', color:'white', marginBottom:20, lineHeight:1.1 }}>Consoles, PCs<br/>& everything gaming.</h2>
              <div style={{ display:'flex', gap:12 }}>
                <Link href={`/${locale}/gaming`} style={{ textDecoration:'none' }}>
                  <button style={{ backgroundColor:'white', color:C.ink, border:'none', padding:'11px 28px', borderRadius:100, fontSize:12, ...UB, cursor:'pointer' }}>Browse Gaming</button>
                </Link>
                <button style={{ backgroundColor:'transparent', color:'white', border:'1px solid rgba(255,255,255,0.4)', padding:'11px 28px', borderRadius:100, fontSize:12, fontWeight:700, cursor:'pointer' }}>Contact Expert</button>
              </div>
            </div>
          </div>
        </section>

        {/* TRENDING SEARCHES */}
        <section style={{ marginBottom:64 }}>
          <h2 style={{ ...UB, fontSize:22, color:C.ink, marginBottom:20 }}>{t.electronics.trendingTitle}</h2>
          <div style={{ display:'flex', gap:10, flexWrap:'wrap' as const }}>
            {trending.map(tag=>(
              <Link key={tag} href={`/${locale}/electronics/mobiles`} style={{ textDecoration:'none' }}>
                <span style={{ display:'inline-block', padding:'9px 18px', borderRadius:100, fontSize:13, fontWeight:700, backgroundColor:'white', color:C.ink, border:'1px solid rgba(186,202,197,0.4)', cursor:'pointer', transition:'all 0.15s' }}
                  onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.backgroundColor=C.mint;(e.currentTarget as HTMLElement).style.color='white'}}
                  onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.backgroundColor='white';(e.currentTarget as HTMLElement).style.color=C.ink}}>
                  {tag}
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* DIAMOND BANNER */}
        <section style={{ position:'relative', borderRadius:40, overflow:'hidden', marginBottom:48 }}>
          <img src="https://images.pexels.com/photos/1229861/pexels-photo-1229861.jpeg?auto=compress&w=1600" alt="Diamond"
            style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover' }} />
          <div style={{ position:'absolute', inset:0, background:'linear-gradient(135deg,rgba(15,23,42,0.96),rgba(15,23,42,0.7))' }} />
          <div style={{ position:'relative', zIndex:1, padding:'56px 64px', maxWidth:640 }}>
            <span style={{ display:'inline-flex', alignItems:'center', gap:6, background:'linear-gradient(135deg,#22d4a8,#0f9b8e)', color:'white', fontSize:9, ...UB, padding:'5px 16px', borderRadius:100, textTransform:'uppercase' as const, letterSpacing:'0.12em', marginBottom:20 }}>{t.common.diamondBadge}</span>
            <h2 style={{ ...UB, fontSize:'clamp(28px,4vw,48px)', color:'white', marginBottom:16, lineHeight:1.05 }}>{t.electronics.diamondTitle}</h2>
            <p style={{ fontSize:15, color:'rgba(255,255,255,0.72)', lineHeight:1.7, marginBottom:28 }}>{t.electronics.diamondSubtitle}</p>
            <div style={{ display:'flex', gap:12 }}>
              <Link href={`/${locale}/diamond`} style={{ textDecoration:'none' }}>
                <button style={{ backgroundColor:C.mint, color:'white', border:'none', padding:'13px 28px', borderRadius:100, fontSize:13, ...UB, cursor:'pointer' }}>{t.common.getVerifiedNow}</button>
              </Link>
              <button style={{ backgroundColor:'transparent', color:'white', border:'1px solid rgba(255,255,255,0.3)', padding:'13px 28px', borderRadius:100, fontSize:13, fontWeight:700, cursor:'pointer' }}>{t.common.learnMore}</button>
            </div>
          </div>
        </section>

        {/* JOIN THE SOUKNI FAMILY */}
        <section style={{ borderRadius:40, background:'linear-gradient(135deg,#22d4a8,#0f9b8e)', padding:'56px 64px', display:'flex', alignItems:'center', justifyContent:'space-between', gap:40, flexWrap:'wrap' as const }}>
          <div>
            <h2 style={{ ...UB, fontSize:'clamp(28px,4vw,44px)', color:'white', marginBottom:12, lineHeight:1.05 }}>{t.electronics.sellTechTitle}</h2>
            <p style={{ fontSize:15, color:'rgba(255,255,255,0.85)', maxWidth:480, lineHeight:1.7 }}>{t.electronics.sellTechSubtitle}</p>
            <div style={{ display:'flex', gap:12, marginTop:24 }}>
              <button style={{ backgroundColor:'white', color:C.mint, border:'none', padding:'12px 24px', borderRadius:100, fontWeight:800, fontSize:13, cursor:'pointer', display:'flex', alignItems:'center', gap:8 }}>🍎 {t.common.appStore}</button>
              <button style={{ backgroundColor:'rgba(255,255,255,0.15)', color:'white', border:'1px solid rgba(255,255,255,0.4)', padding:'12px 24px', borderRadius:100, fontWeight:800, fontSize:13, cursor:'pointer', display:'flex', alignItems:'center', gap:8 }}>▶ {t.common.googlePlay}</button>
            </div>
          </div>
          <Link href={`/${locale}/post-ad`} style={{ textDecoration:'none' }}>
            <span style={{ display:'inline-block', backgroundColor:'white', color:C.mint, padding:'16px 36px', borderRadius:100, fontWeight:900, fontSize:14, cursor:'pointer', whiteSpace:'nowrap' as const, ...UB }}>{t.common.postFreeAd}</span>
          </Link>
        </section>

      </div>
    </div>
  )
}
