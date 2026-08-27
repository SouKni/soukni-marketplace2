'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { Search, ChevronRight, MapPin, Heart } from 'lucide-react'
import { useListings } from '@/hooks/useListings'
import Breadcrumb from '@/components/ui/Breadcrumb'
import CategoryFooterNav from '@/components/ui/CategoryFooterNav'

const C = { mint:'#22d4a8', mintDk:'#0f9b8e', ink:'#161d1b', surface:'#f4fbf8', muted:'#6b7a76' }
const UB = { fontFamily:"'Inter',sans-serif", fontWeight:900, letterSpacing:'-0.05em' } as const
const CB = { fontFamily:"'Hanken Grotesk',sans-serif", fontWeight:900, letterSpacing:'-0.03em' } as const

const CATEGORIES: Record<string,{ label:string; hero:string; desc:string; count:string; priceRanges:string[] }> = {
  'apartments':  { label:'Apartments',         hero:'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&w=1600', desc:'Modern and classic apartments across Morocco\'s top cities.', count:'8,420', priceRanges:['Any Price','0 – 500,000 MAD','500,000 – 1.5M MAD','1.5M – 3M MAD','3M+ MAD'] },
  'villas':      { label:'Villas',              hero:'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&w=1600', desc:'Spacious villas with pools, gardens and premium finishes.', count:'3,140', priceRanges:['Any Price','0 – 2M MAD','2M – 5M MAD','5M – 10M MAD','10M+ MAD'] },
  'riads':       { label:'Riads',                hero:'https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg?auto=compress&w=1600', desc:'Traditional Moroccan riads, restored and move-in ready.', count:'1,280', priceRanges:['Any Price','0 – 1M MAD','1M – 3M MAD','3M – 6M MAD','6M+ MAD'] },
  'studios':     { label:'Studios',              hero:'https://images.pexels.com/photos/1743229/pexels-photo-1743229.jpeg?auto=compress&w=1600', desc:'Compact studio apartments perfect for singles and students.', count:'4,640', priceRanges:['Any Price','0 – 300,000 MAD','300,000 – 700,000 MAD','700,000+ MAD'] },
  'offices':     { label:'Offices & Commercial', hero:'https://images.pexels.com/photos/2062426/pexels-photo-2062426.jpeg?auto=compress&w=1600', desc:'Office spaces, retail units and commercial real estate.', count:'2,380', priceRanges:['Any Price','0 – 1M MAD','1M – 3M MAD','3M – 8M MAD','8M+ MAD'] },
  'farmhouses':  { label:'Farmhouses',           hero:'https://images.pexels.com/photos/1148955/pexels-photo-1148955.jpeg?auto=compress&w=1600', desc:'Rural farmhouses and agricultural estates.', count:'980', priceRanges:['Any Price','0 – 1M MAD','1M – 3M MAD','3M+ MAD'] },
  'land-plots':  { label:'Land / Plots',         hero:'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&w=1600', desc:'Buildable land and plots for residential or commercial development.', count:'1,860', priceRanges:['Any Price','0 – 500,000 MAD','500,000 – 1.5M MAD','1.5M – 4M MAD','4M+ MAD'] },
}

const ALL_CATS = [
  { label:'Apartments',        slug:'apartments' },
  { label:'Villas',            slug:'villas'     },
  { label:'Riads',             slug:'riads'      },
  { label:'Studios',           slug:'studios'    },
  { label:'Offices & Commercial', slug:'offices' },
  { label:'Farmhouses',        slug:'farmhouses' },
  { label:'Land / Plots',      slug:'land-plots' },
]

const IMGS = [
  'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&w=400',
  'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&w=400',
  'https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg?auto=compress&w=400',
  'https://images.pexels.com/photos/1090638/pexels-photo-1090638.jpeg?auto=compress&w=400',
]

function ListingCard({ title, price, location, img, condition }: any) {
  const [saved, setSaved] = useState(false)
  const [hov, setHov]     = useState(false)
  return (
    <article onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{ backgroundColor:'white', borderRadius:24, border:`1px solid ${hov?C.mint:'rgba(186,202,197,0.2)'}`, overflow:'hidden', boxShadow:hov?'0 20px 40px rgba(34,212,168,0.15)':'0 2px 8px rgba(0,0,0,0.04)', transition:'all 0.3s', cursor:'pointer' }}>
      <div style={{ position:'relative', aspectRatio:'4/3', overflow:'hidden' }}>
        <img src={img} alt={title} style={{ width:'100%', height:'100%', objectFit:'cover', transition:'transform 0.5s', transform:hov?'scale(1.06)':'scale(1)' }} />
        <span style={{ position:'absolute', top:10, left:10, background:'linear-gradient(135deg,#22d4a8,#0f9b8e)', color:'white', fontSize:8, ...CB, padding:'3px 10px', borderRadius:100, textTransform:'uppercase' as const }}>◆ SOUKNI CERTIFIED</span>
        <button onClick={e=>{e.stopPropagation();setSaved(!saved)}} style={{ position:'absolute', top:8, right:8, width:30, height:30, borderRadius:'50%', backgroundColor:'rgba(255,255,255,0.85)', border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}>
          <Heart size={13} fill={saved?'#ef4444':'none'} color={saved?'#ef4444':C.muted} />
        </button>
        {condition && <div style={{ position:'absolute', bottom:8, left:8, backgroundColor:'rgba(255,255,255,0.92)', padding:'3px 8px', borderRadius:6, fontSize:9, ...CB, color:C.mintDk, textTransform:'uppercase' as const }}>{condition}</div>}
      </div>
      <div style={{ padding:'16px 18px' }}>
        <p style={{ ...CB, fontSize:14, color:C.ink, marginBottom:6, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{title}</p>
        <p style={{ ...CB, fontSize:18, color:C.mint, marginBottom:6 }}>{price.toLocaleString()} MAD</p>
        <p style={{ fontSize:11, color:C.muted, display:'flex', alignItems:'center', gap:4 }}><MapPin size={11}/>{location}</p>
      </div>
    </article>
  )
}

function makeListings(cat: string, count: number) {
  const titleMap: Record<string,string[]> = {
    apartments: ['Duplex Hay Riad','Sea View Apartment','Modern 3-Bed Flat','Renovated 2-Bed'],
    villas:     ['Villa with Pool','Contemporary Villa','Gated Community Villa','Garden Villa'],
    riads:      ['Restored Medina Riad','Riad with Courtyard','Boutique Riad','Historic Riad'],
    studios:    ['City Center Studio','Furnished Studio','Modern Studio Flat','Compact Studio'],
    offices:    ['Prime Office Space','Retail Unit Downtown','Coworking Floor','Commercial Building'],
    farmhouses: ['Agricultural Estate','Rural Farmhouse','Countryside Property','Olive Grove Estate'],
    'land-plots': ['Buildable Plot 500m²','Residential Land Lot','Commercial Development Land','Agricultural Land Parcel'],
  }
  const titles = titleMap[cat] || titleMap['apartments']
  const locs   = ['Rabat, Agdal','Casablanca','Marrakech','Fès Medina','Rabat, Souissi','Tanger']
  const conds  = ['New Build','Renovated','Move-in Ready',undefined,undefined]
  return Array.from({length:count},(_,i)=>({
    title:     titles[i%titles.length],
    price:     280000 + ((i*173311)%6800000),
    location:  locs[i%locs.length],
    condition: conds[i%conds.length],
    img:       IMGS[i%IMGS.length],
  }))
}

export default function PropertyCategoryPage() {
  const params  = useParams()
  const locale  = (params?.locale as string) || 'en'
  const catSlug = (params?.category as string) || 'apartments'
  const catData = CATEGORIES[catSlug] || CATEGORIES['apartments']

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
      title: row.title,
      price: (row.price || 0) / 100,
      location: row.city,
      condition: row.condition || undefined,
      img: (row.images && row.images[0]) || IMGS[0],
    }
  }
  const hasRealData = dbListings.length > 0
  const listings = hasRealData ? dbListings.map(mapDbRowToCard) : makeListings(catSlug, 24)

  return (
    <div style={{ fontFamily:"'Inter',sans-serif", backgroundColor:C.surface, minHeight:'100vh' }}>
      <section style={{ position:'relative', height:360, display:'flex', alignItems:'center', justifyContent:'center', overflow:'hidden' }}>
        <img src={catData.hero} alt={catData.label} style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover' }} />
        <div style={{ position:'absolute', inset:0, backgroundColor:'rgba(22,29,27,0.52)' }} />
        <div style={{ position:'relative', zIndex:10, textAlign:'center', maxWidth:860, padding:'0 24px', width:'100%' }}>
          <p style={{ fontSize:11, ...UB, color:C.mint, textTransform:'uppercase' as const, letterSpacing:'0.2em', marginBottom:12 }}>PROPERTY › {catData.label.toUpperCase()}</p>
          <h1 style={{ fontSize:'clamp(32px,5vw,52px)', ...UB, color:'white', marginBottom:16, lineHeight:1.05, textShadow:'0 4px 20px rgba(0,0,0,0.4)' }}>{catData.label} in Morocco</h1>
          <p style={{ fontSize:16, color:'rgba(255,255,255,0.82)' }}>{catData.desc}</p>
        </div>
      </section>

      <main style={{ maxWidth:1280, margin:'0 auto', padding:'32px 24px 80px' }}>
        <Breadcrumb
          items={[
            { label:'Home', href:`/${locale}` },
            { label:'Property', href:`/${locale}/property` },
            { label:catData.label },
          ]}
          mutedColor={C.muted}
          inkColor={C.ink}
          style={{ marginBottom:12 }}
        />

        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', gap:16, marginBottom:24, flexWrap:'wrap' }}>
          <div>
            <h2 style={{ fontSize:'clamp(20px,2.5vw,28px)', ...UB, color:C.ink, marginBottom:4 }}>{catData.label} for Sale</h2>
            <p style={{ fontSize:14, color:C.mint, ...CB }}>{catData.count} Ads</p>
          </div>
        </div>

        <div style={{ display:'flex', gap:10, flexWrap:'wrap', marginBottom:32 }}>
          {ALL_CATS.map(cat=>(
            <Link key={cat.slug} href={`/${locale}/property/${cat.slug}`}
              style={{ padding:'10px 22px', borderRadius:100, fontSize:11, ...UB, textTransform:'uppercase' as const, letterSpacing:'0.1em', cursor:'pointer', transition:'all 0.2s', border:'1px solid', textDecoration:'none', display:'inline-block',
                backgroundColor: catSlug===cat.slug ? C.mint : 'white', color: catSlug===cat.slug ? 'white' : C.muted, borderColor: catSlug===cat.slug ? C.mint : 'rgba(186,202,197,0.4)' }}>
              {cat.label}
            </Link>
          ))}
          <Link href={`/${locale}/property`}
            style={{ padding:'10px 22px', borderRadius:100, fontSize:11, ...UB, textTransform:'uppercase' as const, letterSpacing:'0.1em', cursor:'pointer', border:`1px solid ${C.mint}`, backgroundColor:'transparent', color:C.mint, textDecoration:'none', display:'inline-block' }}>
            + View More
          </Link>
        </div>

        <section style={{ marginBottom:48 }}>
          <p style={{ fontSize:13, color:C.muted, ...CB, marginBottom:20 }}>Showing {listings.length} of {catData.count} results</p>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:20 }}>
            {listings.map((item,i)=><ListingCard key={i} {...item} />)}
          </div>
        </section>

        <CategoryFooterNav
          backHref={`/${locale}/property`}
          backLabel="Back to All Property"
          related={ALL_CATS.filter(c=>c.slug!==catSlug).map(c=>({ label:c.label, href:`/${locale}/property/${c.slug}` }))}
          relatedTitle="Explore Other Property Types"
          inkColor={C.ink}
          mintDkColor={C.mintDk}
        />
      </main>
    </div>
  )
}
