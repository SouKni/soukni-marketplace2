'use client'

import { useState, useEffect } from 'react'
import React from 'react'
import { Heart, Search, ChevronDown, ChevronLeft, ChevronRight, SlidersHorizontal, MapPin } from 'lucide-react'
import { useListings } from '@/hooks/useListings'
import WhatsAppButton from '@/components/ui/WhatsAppButton'
import MessageSellerButton from '@/components/ui/MessageSellerButton'
import Breadcrumb from '@/components/ui/Breadcrumb'
import CategoryFooterNav from '@/components/ui/CategoryFooterNav'
import { useFavorites } from '@/hooks/useFavorites'
import Link from 'next/link'
import { useParams } from 'next/navigation'

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

const CATEGORIES: Record<string,{ label:string; hero:string; desc:string; count:string; brands:string[]; priceRanges:string[]; types:string[] }> = {
  'all-pets': {
    label:'All Pets & Accessories',
    hero:'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&w=1600',
    desc:'Browse the complete SouKni pets and accessories collection.',
    count:'1,840', types:['Food & Treats','Accessories','Toys','Housing','Grooming','Health & Care'],
    brands:['Royal Canin','Hill\'s Science','Purina','Kong','Pedigree','Whiskas','Ferplast','Trixie'],
    priceRanges:['Any Price','0 – 100 MAD','100 – 300 MAD','300 – 800 MAD','800 – 2,000 MAD','2,000+ MAD'],
  },
  'dogs': {
    label:'Dogs & Accessories',
    hero:'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&w=1600',
    desc:'Everything for your dog — food, toys, beds, leashes and grooming.',
    count:'684', types:['Food & Treats','Collars & Leashes','Toys','Beds & Crates','Grooming','Health'],
    brands:['Royal Canin','Hill\'s Science','Purina Pro Plan','Kong','Pedigree','Orijen','Taste of Wild','Acana'],
    priceRanges:['Any Price','0 – 100 MAD','100 – 300 MAD','300 – 800 MAD','800 – 2,500 MAD','2,500+ MAD'],
  },
  'cats': {
    label:'Cats & Accessories',
    hero:'https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&w=1600',
    desc:'Premium cat food, litter, toys, scratching posts and furniture.',
    count:'512', types:['Food & Treats','Litter & Boxes','Toys','Beds & Trees','Grooming','Health'],
    brands:['Royal Canin','Hill\'s Science','Whiskas','Purina Felix','Orijen Cat','Iams','Sheba','Fancy Feast'],
    priceRanges:['Any Price','0 – 80 MAD','80 – 250 MAD','250 – 600 MAD','600 – 1,500 MAD','1,500+ MAD'],
  },
  'birds': {
    label:'Birds & Accessories',
    hero:'https://images.pexels.com/photos/1616/animal-beak-beautiful-bird.jpg?auto=compress&w=1600',
    desc:'Bird cages, perches, food and accessories for all feathered friends.',
    count:'248', types:['Food & Seeds','Cages & Aviaries','Perches & Toys','Nesting','Health'],
    brands:['Versele-Laga','Vitapol','Trixie','Ferplast','Prevue','Kaytee','ZuPreem','Higgins'],
    priceRanges:['Any Price','0 – 80 MAD','80 – 250 MAD','250 – 800 MAD','800 – 2,000 MAD','2,000+ MAD'],
  },
  'fish-aquarium': {
    label:'Fish & Aquarium',
    hero:'https://images.pexels.com/photos/128756/pexels-photo-128756.jpeg?auto=compress&w=1600',
    desc:'Aquariums, filters, fish food, decorations and accessories.',
    count:'186', types:['Aquariums','Filters & Pumps','Fish Food','Lighting','Decorations','Water Treatment'],
    brands:['Fluval','Juwel','Tetra','API','Eheim','AquaClear','Seachem','Hikari'],
    priceRanges:['Any Price','0 – 100 MAD','100 – 400 MAD','400 – 1,500 MAD','1,500 – 5,000 MAD','5,000+ MAD'],
  },
  'small-animals': {
    label:'Small Animals',
    hero:'https://images.pexels.com/photos/35537/child-children-girl-happy.jpeg?auto=compress&w=1600',
    desc:'Food, cages, and accessories for rabbits, hamsters, guinea pigs and more.',
    count:'124', types:['Food & Hay','Cages & Habitats','Toys & Tunnels','Bedding','Health'],
    brands:['Versele-Laga','Vitakraft','Kaytee','Oxbow','Burgess','Science Selective','Trixie','Ferplast'],
    priceRanges:['Any Price','0 – 80 MAD','80 – 250 MAD','250 – 800 MAD','800 – 2,000 MAD','2,000+ MAD'],
  },
  'reptiles': {
    label:'Reptiles & Accessories',
    hero:'https://images.pexels.com/photos/35537/child-children-girl-happy.jpeg?auto=compress&w=1600',
    desc:'Terrariums, lighting, heating, food and accessories for reptiles.',
    count:'86', types:['Terrariums','Lighting & Heating','Food & Supplements','Substrates','Decor'],
    brands:['Exo Terra','Zoo Med','Fluker\'s','Arcadia','Repashy','Pangea','Komodo','Lucky Reptile'],
    priceRanges:['Any Price','0 – 100 MAD','100 – 400 MAD','400 – 1,500 MAD','1,500 – 5,000 MAD','5,000+ MAD'],
  },
}

const ALL_CATS = [
  { label:'All Pets',        slug:'all-pets'       },
  { label:'Dogs',            slug:'dogs'           },
  { label:'Cats',            slug:'cats'           },
  { label:'Birds',           slug:'birds'          },
  { label:'Fish & Aquarium', slug:'fish-aquarium'  },
  { label:'Small Animals',   slug:'small-animals'  },
  { label:'Reptiles',        slug:'reptiles'       },
]

const IMGS = [
  'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&w=400',
  'https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&w=400',
  'https://images.pexels.com/photos/1616/animal-beak-beautiful-bird.jpg?auto=compress&w=400',
  'https://images.pexels.com/photos/128756/pexels-photo-128756.jpeg?auto=compress&w=400',
  'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&w=400',
]

type BadgeT = 'certified'|'diamond'|'featured'|'new'
function Badge({ type }: { type: BadgeT }) {
  const map: Record<BadgeT,{bg:string;color:string;label:string}> = {
    certified:{ bg:C.mint,   color:C.ink,  label:'SouKni Certified' },
    diamond:  { bg:C.ink,    color:C.mint, label:'◆ DIAMOND'        },
    featured: { bg:'#fbbf24',color:C.ink,  label:'Featured'         },
    new:      { bg:C.mintDk, color:'white', label:'New Arrival'     },
  }
  const s = map[type]
  return <span style={{ backgroundColor:s.bg, color:s.color, fontSize:'8px', ...CB, padding:'4px 10px', borderRadius:'6px', textTransform:'uppercase' as const, letterSpacing:'0.08em', display:'inline-block', boxShadow:'0 2px 6px rgba(0,0,0,0.15)', whiteSpace:'nowrap' as const }}>{s.label}</span>
}

function ListingCard({ id, brand, title, price, location, condition, img, badge, petType, phone, sellerId }: any) {
  const { isFavorited, toggleFavorite } = useFavorites()
  const saved = isFavorited(id)
  const [hov,   setHov  ] = useState(false)
  return (
    <article onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{ backgroundColor:'white', borderRadius:'24px', border:`1px solid ${hov?C.mint:'rgba(107,122,118,0.1)'}`, overflow:'hidden', boxShadow:hov?`0 20px 40px ${C.mint}18`:'0 2px 8px rgba(0,0,0,0.04)', transition:'all 0.3s', cursor:'pointer', display:'flex', flexDirection:'column' as const }}>
      <div style={{ position:'relative', aspectRatio:'1/1', overflow:'hidden', backgroundColor:C.cream }}>
        <img src={img} alt={title} style={{ width:'100%', height:'100%', objectFit:'cover', transition:'transform 0.6s', transform:hov?'scale(1.08)':'scale(1)' }} />
        <div style={{ position:'absolute', top:'10px', left:'10px', zIndex:10 }}><Badge type={badge} /></div>
        <button onClick={e=>{e.stopPropagation();toggleFavorite(id)}}
          style={{ position:'absolute', top:'8px', right:'8px', zIndex:10, width:'32px', height:'32px', borderRadius:'50%', backgroundColor:'rgba(255,255,255,0.85)', border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}>
          <Heart size={14} fill={saved?'#ef4444':'none'} color={saved?'#ef4444':C.muted} />
        </button>
        {petType && <div style={{ position:'absolute', bottom:'10px', right:'10px', zIndex:10, backgroundColor:'rgba(22,29,27,0.75)', color:'white', fontSize:'9px', ...CB, padding:'3px 8px', borderRadius:'5px' }}>{petType}</div>}
        {condition && <div style={{ position:'absolute', bottom:'10px', left:'10px', zIndex:10, backgroundColor:'rgba(255,255,255,0.92)', padding:'3px 8px', borderRadius:'6px', fontSize:'9px', ...CB, color:C.mintDk, textTransform:'uppercase' as const }}>{condition}</div>}
      </div>
      <div style={{ padding:'16px 18px', flex:1, display:'flex', flexDirection:'column' as const }}>
        <p style={{ fontSize:'9px', ...CB, color:C.mint, textTransform:'uppercase' as const, letterSpacing:'0.1em', marginBottom:'2px' }}>{brand}</p>
        <h4 style={{ fontSize:'14px', ...CB, color:hov?C.mint:C.ink, marginBottom:'4px', transition:'color 0.2s', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' as const }}>{title}</h4>
        <p style={{ fontSize:'18px', ...CB, color:C.mint, marginBottom:'6px' }}>{price.toLocaleString()} MAD</p>
        {location && <p style={{ fontSize:'10px', color:C.muted, ...CB, display:'flex', alignItems:'center', gap:'3px', marginBottom:'12px' }}><MapPin size={10}/>{location}</p>}
        <div style={{ marginTop:'auto', display:'flex', gap:'8px' }}>
          <MessageSellerButton listingId={id} sellerId={sellerId} style={{ flex:1, border:`2px solid ${C.ink}`, color:C.ink, backgroundColor:'transparent', padding:'9px', borderRadius:'12px', fontSize:'10px', ...CB, textTransform:'uppercase' as const, transition:'all 0.15s' }}
            onMouseEnter={e=>{e.currentTarget.style.backgroundColor=C.ink;e.currentTarget.style.color='white'}}
            onMouseLeave={e=>{e.currentTarget.style.backgroundColor='transparent';e.currentTarget.style.color=C.ink}}
          >Message</MessageSellerButton>
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
    'all-pets':       ['Royal Canin 10kg','Kong Classic L','Cat Scratching Post','Bird Cage Deluxe','Aquarium 100L','Hamster Cage','Reptile Terrarium'],
    'dogs':           ['Royal Canin Adult 10kg','Kong Classic Large','Orthopedic Dog Bed','Retractable Leash 5m','Dog Harness No-Pull','Purina One 12kg','Dog Crate XL','Grooming Brush Set'],
    'cats':           ['Royal Canin Indoor 8kg','Cat Tree 180cm','Auto Litter Box','Whiskas Pouches 48pk','Interactive Laser Toy','Cat Carrier Soft','Scratching Post 90cm','Catnip Mouse Set'],
    'birds':          ['Budgie Seed Mix 5kg','Parrot Cage 80cm','Cuttlebone & Perch','Cockatiel Pellets 1kg','Swing & Ladder Set','Nesting Box Wooden','Water Dispenser Auto'],
    'fish-aquarium':  ['Fluval 100L Tank','Eheim Filter 2213','Tetra Pro Colour 1L','LED Aquarium Light','Coral Decoration Set','Seachem Prime 500ml','Gravel Substrate 5kg'],
    'small-animals':  ['Timothy Hay 1kg','Hamster Cage Deluxe','Guinea Pig Pellets','Rabbit Hutch 2-Tier','Exercise Wheel Silent','Tunnel & Hideout Set','Water Bottle 250ml'],
    'reptiles':       ['Exo Terra 60x45 Tank','UVB Lamp 10.0','Repashy Crested Gecko','Arcadia 54W T5 Kit','Coconut Substrate 5L','Cork Bark Curved','Digital Thermometer'],
  }
  const cat_data = CATEGORIES[cat] || CATEGORIES['all-pets']
  const titles   = titleMap[cat] || titleMap['all-pets']
  const petTypes = cat_data.types
  const badges: BadgeT[] = ['certified','diamond','featured','new','certified','diamond']
  const locs  = ['Rabat, Agdal','Rabat, Souissi','Casablanca','Rabat, Hay Riad','Rabat, Centre']
  const conds = ['New Sealed','Like New','Good',undefined,undefined,undefined]
  return Array.from({length:count},(_,i)=>({
    brand:     cat_data.brands[i%cat_data.brands.length],
    title:     titles[i%titles.length],
    price:     45 + ((i*1373)%2800),
    location:  locs[i%locs.length],
    condition: conds[i%conds.length],
    petType:   petTypes[i%petTypes.length],
    img:       IMGS[i%IMGS.length],
    badge:     badges[i%badges.length],
  }))
}

export default function PetsCategoryPage() {
  const params   = useParams()
  const locale   = (params?.locale as string) || 'en'
  const catSlug  = (params?.category as string) || 'all-pets'
  const catData  = CATEGORIES[catSlug] || CATEGORIES['all-pets']

  const [activeSeller, setActiveSeller] = useState('All Sellers')
  const [diamond,      setDiamond     ] = useState(true)
  const [gridView,     setGridView    ] = useState(true)
  const [page,         setPage        ] = useState(1)
  const [keyword,      setKeyword     ] = useState('')
  const [city,         setCity        ] = useState('Rabat')
  const [price,        setPrice       ] = useState('Any Price')
  const [sortBy,       setSortBy      ] = useState('Most Recent')
  const [activeBrand,  setActiveBrand ] = useState('All Brands')
  const [activeType,   setActiveType  ] = useState('All Types')
  const [cityOpen,     setCityOpen    ] = useState(false)
  const [priceOpen,    setPriceOpen   ] = useState(false)

  const { fetchListings } = useListings()
  const [dbListings, setDbListings] = useState<any[]>([])

  useEffect(() => {
    const t = setTimeout(() => {
      fetchListings({ category: 'pets-accessories', sortBy: 'newest', limit: 24 }).then(rows => setDbListings(rows || []))
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
      petType:   row.subcategory || '',
      img:       (row.images && row.images[0]) || IMGS[0],
      badge:     row.badge || 'certified',
      phone:     row.profiles?.phone,
      id:        row.id,
      sellerId:  row.seller_id,
    }
  }

  const hasRealData = dbListings.length > 0
  const listings = (hasRealData ? dbListings.map(mapDbRowToCard) : makeListings(catSlug, 24))
    .filter(item => keyword.trim()==='' || item.title.toLowerCase().includes(keyword.toLowerCase()))
    .filter(item => city==='Rabat' || !item.location || item.location.toLowerCase().includes(city.toLowerCase()))
    .filter(item => {
      if (price === 'Any Price') return true
      const nums = price.replace(/,/g,'').match(/\d+/g)?.map(Number) || []
      return price.includes('+') ? item.price >= nums[0] : item.price >= nums[0] && item.price <= nums[1]
    })
    .filter((item:any) => activeBrand==='All Brands' || item.brand===activeBrand)

  const PAGE_SIZE = 12
  const totalPages = Math.max(1, Math.ceil(listings.length / PAGE_SIZE))
  const paginatedListings = listings.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
  useEffect(() => { setPage(1) }, [keyword, city, price, activeBrand, catSlug])
  const cities   = ['Rabat','Casablanca','Marrakech','Fès','Tanger','Agadir','Meknès']

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

      {/* HERO */}
      <section style={{ position:'relative', height:'360px', display:'flex', alignItems:'center', justifyContent:'center', overflow:'hidden' }}>
        <img src={catData.hero} alt={catData.label} style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover' }} />
        <div style={{ position:'absolute', inset:0, backgroundColor:'rgba(22,29,27,0.52)' }} />
        <div style={{ position:'relative', zIndex:10, textAlign:'center' as const, maxWidth:'860px', padding:'0 24px', width:'100%' }}>
          <p style={{ fontSize:'11px', ...UB, color:C.mint, textTransform:'uppercase' as const, letterSpacing:'0.2em', marginBottom:'12px' }}>THE VAULT › PETS & ACCESSORIES</p>
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
        <div style={{ backgroundColor:'rgba(255,255,255,0.97)', backdropFilter:'blur(16px)', border:'1px solid rgba(107,122,118,0.12)', borderRadius:'100px', boxShadow:'0 12px 40px rgba(0,0,0,0.08)', display:'flex', alignItems:'stretch', height:'68px' }}>
          <DDrop label="CITY" value={city} options={cities} open={cityOpen} setOpen={setCityOpen} onChange={setCity} />
          <div style={{ width:'1px', backgroundColor:'rgba(107,122,118,0.12)', margin:'12px 0' }} />
          <div style={{ flex:1.8, padding:'0 22px', display:'flex', flexDirection:'column' as const, justifyContent:'center' }}>
            <span style={{ fontSize:'9px', ...UB, textTransform:'uppercase' as const, letterSpacing:'0.14em', color:C.muted, marginBottom:'3px' }}>KEYWORD</span>
            <div style={{ display:'flex', alignItems:'center', gap:'8px' }}>
              <Search size={13} color={C.muted} />
              <input type="text" value={keyword} onChange={e=>setKeyword(e.target.value)} placeholder={`e.g. ${catData.brands[0]}, Food, Toys...`}
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
            { label:'Pets & Accessories', href:`/${locale}/pets-accessories` },
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
            <Link key={cat.slug} href={`/${locale}/pets-accessories/${cat.slug}`}
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

        {/* GRID TOGGLE */}
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

        {/* PRODUCT TYPE FILTER — unique to pets */}
        <div style={{ backgroundColor:'white', borderRadius:'20px', padding:'20px 24px', marginBottom:'16px', border:'1px solid rgba(107,122,118,0.1)' }}>
          <p style={{ fontSize:'9px', ...UB, color:C.muted, textTransform:'uppercase' as const, letterSpacing:'0.14em', marginBottom:'12px' }}>FILTER BY TYPE</p>
          <div style={{ display:'flex', gap:'8px', flexWrap:'wrap' as const }}>
            <button onClick={()=>setActiveType('All Types')}
              style={{ padding:'7px 16px', borderRadius:'100px', fontSize:'10px', ...UB, border:`1px solid`, cursor:'pointer', transition:'all 0.15s',
                backgroundColor:activeType==='All Types'?C.mint:'transparent', color:activeType==='All Types'?C.ink:C.muted, borderColor:activeType==='All Types'?C.mint:'rgba(107,122,118,0.2)' }}>All Types</button>
            {catData.types.map(type=>(
              <button key={type} onClick={()=>setActiveType(type)}
                style={{ padding:'7px 16px', borderRadius:'100px', fontSize:'10px', ...UB, border:`1px solid`, cursor:'pointer', transition:'all 0.15s',
                  backgroundColor:activeType===type?C.mint:'transparent', color:activeType===type?C.ink:C.muted, borderColor:activeType===type?C.mint:'rgba(107,122,118,0.2)' }}
                onMouseEnter={e=>{if(activeType!==type){e.currentTarget.style.borderColor=C.mint;e.currentTarget.style.color=C.ink}}}
                onMouseLeave={e=>{if(activeType!==type){e.currentTarget.style.borderColor='rgba(107,122,118,0.2)';e.currentTarget.style.color=C.muted}}}
              >{type}</button>
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

        {/* LISTINGS */}
        <section style={{ marginBottom:'48px' }}>
          <p style={{ fontSize:'13px', color:C.muted, ...CB, marginBottom:'20px' }}>Showing {listings.length} of {catData.count} results</p>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'20px' }}>
            {paginatedListings.map((item,i)=><ListingCard key={i} {...item} />)}
          </div>
        </section>

        {/* PAGINATION */}
        <div style={{ display:'flex', justifyContent:'center', alignItems:'center', gap:'10px', marginBottom:'64px' }}>
          <button onClick={()=>setPage(p=>Math.max(1,p-1))} disabled={page<=1} style={{ width:'44px', height:'44px', borderRadius:'12px', backgroundColor:'white', border:'1px solid rgba(107,122,118,0.12)', cursor:page<=1?'not-allowed':'pointer', opacity:page<=1?0.4:1, display:'flex', alignItems:'center', justifyContent:'center', color:C.muted }}><ChevronLeft size={18} /></button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(p=>(
            <button key={p} onClick={()=>setPage(p)} style={{ width:'44px', height:'44px', borderRadius:'12px', cursor:'pointer', fontSize:'15px', ...UB, border:'1px solid', transition:'all 0.2s', backgroundColor:page===p?C.mint:'white', color:page===p?C.ink:C.muted, borderColor:page===p?C.mint:'rgba(107,122,118,0.12)' }}>{p}</button>
          ))}
          <button onClick={()=>setPage(p=>Math.min(totalPages,p+1))} disabled={page>=totalPages} style={{ width:'44px', height:'44px', borderRadius:'12px', backgroundColor:'white', border:'1px solid rgba(107,122,118,0.12)', cursor:page>=totalPages?'not-allowed':'pointer', opacity:page>=totalPages?0.4:1, display:'flex', alignItems:'center', justifyContent:'center', color:C.muted }}><ChevronRight size={18} /></button>
        </div>

        <CategoryFooterNav
          relatedTitle="Explore Other Pet Categories"
          related={ALL_CATS.filter(c=>c.slug!==catSlug).map(cat=>({ label:cat.label, href:`/${locale}/pets-accessories/${cat.slug}` }))}
          backHref={`/${locale}/pets-accessories`}
          backLabel="Back to All Pets & Accessories"
          inkColor={C.ink}
          mintDkColor={C.mintDk}
        />
      </main>
    </div>
  )
}
