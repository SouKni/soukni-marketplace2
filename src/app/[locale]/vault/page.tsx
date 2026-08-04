'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { Search, ChevronRight } from 'lucide-react'
import { useMarket } from '@/context/MarketContext'

const C = { mint:'#22d4a8', mintDk:'#0f9b8e', ink:'#161d1b', surface:'#f4fbf8', muted:'#6b7a76' }
const UB = { fontFamily:"'Inter',sans-serif", fontWeight:900, letterSpacing:'-0.05em' } as const

const categories = [
  { slug:'collectibles-treasures',     label:'Collectibles & Treasures',    count:'3,214', emoji:'💎', image:'https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&w=600' },
  { slug:'musical-instruments', label:'Musical Instruments',  count:'1,842', emoji:'🎸', image:'https://images.pexels.com/photos/1644616/pexels-photo-1644616.jpeg?auto=compress&w=600' },
  { slug:'home-garden',         label:'Home & Garden',        count:'2,719', emoji:'🌿', image:'https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg?auto=compress&w=600' },
  { slug:'gaming',              label:'Gaming',                count:'4,103', emoji:'🎮', image:'https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?auto=compress&w=600' },
  { slug:'baby-items',          label:'Baby Items',            count:'1,560', emoji:'🧸', image:'https://images.pexels.com/photos/3933250/pexels-photo-3933250.jpeg?auto=compress&w=600' },
  { slug:'pets-accessories',    label:'Pets & Accessories',    count:'980',   emoji:'🐾', image:'https://images.pexels.com/photos/1490908/pexels-photo-1490908.jpeg?auto=compress&w=600' },
  { slug:'tickets-vouchers',    label:'Tickets & Vouchers',    count:'897',   emoji:'🎟️', image:'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&w=600' },
  { slug:'toys',                label:'Toys',                  count:'2,340', emoji:'🧩', image:'https://images.pexels.com/photos/163696/toy-car-toy-box-mini-cars-163696.jpeg?auto=compress&w=600' },
  { slug:'home-appliances',     label:'Home Appliances',       count:'8,453', emoji:'🔌', image:'https://images.pexels.com/photos/4108715/pexels-photo-4108715.jpeg?auto=compress&w=600' },
  { slug:'sports-equipment',    label:'Sports Equipment',      count:'3,760', emoji:'⚽', image:'https://images.pexels.com/photos/1552249/pexels-photo-1552249.jpeg?auto=compress&w=600' },
  { slug:'electronics', label:'Mobiles & Electronics', count:'9,318', emoji:'📱', image:'https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&w=600' },
]

const featuredItems = [
  { id:'vt1', title:'Patek Philippe Nautilus — Ref. 5711', price:189000, location:'Casablanca, Maarif', image:'https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&w=600' },
  { id:'vt2', title:'PS5 Pro Bundle with 6 games sealed',  price:18500,  location:'Casablanca',         image:'https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?auto=compress&w=600' },
  { id:'vt3', title:'Luxury teak outdoor lounge set',      price:45000,  location:'Marrakech, Palmeraie',image:'https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg?auto=compress&w=600' },
  { id:'vt4', title:'Fender Stratocaster Vintage 1978',    price:12800,  location:'Marrakech, Gueliz',   image:'https://images.pexels.com/photos/1644616/pexels-photo-1644616.jpeg?auto=compress&w=600' },
]

export default function VaultPage({ params }: { params: Promise<{ locale:string }> }) {
  const { locale } = React.use(params)
  const [keyword, setKeyword] = useState('')
  const [hovCat, setHovCat] = useState<string|null>(null)
  const [hovItem, setHovItem] = useState<string|null>(null)
  const { formatPrice } = useMarket()

  return (
    <div style={{ fontFamily:"'Inter',sans-serif", backgroundColor:C.surface, minHeight:'100vh' }}>

      {/* CINEMATIC HERO */}
      <section style={{ position:'relative', height:520, overflow:'hidden', display:'flex', alignItems:'center', justifyContent:'center' }}>
        <img src="https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg?auto=compress&w=1600" alt="The Vault"
          style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover' }} />
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top,rgba(15,23,42,0.88),rgba(15,23,42,0.32))' }} />
        <div style={{ position:'relative', zIndex:10, textAlign:'center', padding:'0 24px', maxWidth:760, width:'100%' }}>
          <p style={{ fontSize:11, fontWeight:800, color:C.mint, textTransform:'uppercase' as const, letterSpacing:'0.2em', marginBottom:16 }}>SouKni The Vault</p>
          <h1 style={{ ...UB, fontSize:'clamp(36px,6vw,68px)', color:'white', lineHeight:1.0, marginBottom:20, textTransform:'uppercase' as const }}>
            RARE FINDS.<br />LUXURY GOODS.<br />THE VAULT.
          </h1>
          <p style={{ fontSize:16, color:'rgba(255,255,255,0.75)', marginBottom:32, maxWidth:520, margin:'0 auto 32px' }}>
            29,868 verified collectible &amp; luxury listings across Morocco
          </p>
          {/* 3-section glassmorphic search */}
          <div style={{ display:'flex', alignItems:'stretch', backgroundColor:'rgba(255,255,255,0.12)', backdropFilter:'blur(24px)', border:'1px solid rgba(255,255,255,0.25)', borderRadius:100, overflow:'hidden', maxWidth:680, margin:'0 auto', boxShadow:'0 8px 32px rgba(0,0,0,0.2)' }}>
            <div style={{ display:'flex', flexDirection:'column' as const, padding:'14px 22px', flex:'0 0 160px', borderRight:'1px solid rgba(255,255,255,0.2)', gap:2 }}>
              <span style={{ fontSize:9, fontWeight:800, color:'rgba(255,255,255,0.55)', textTransform:'uppercase' as const, letterSpacing:'0.12em' }}>City</span>
              <input placeholder="Rabat" style={{ backgroundColor:'transparent', border:'none', outline:'none', fontSize:14, fontWeight:600, color:'white', fontFamily:"'Inter',sans-serif", padding:0 }} />
            </div>
            <div style={{ display:'flex', flexDirection:'column' as const, padding:'14px 22px', flex:1, borderRight:'1px solid rgba(255,255,255,0.2)', gap:2 }}>
              <span style={{ fontSize:9, fontWeight:800, color:'rgba(255,255,255,0.55)', textTransform:'uppercase' as const, letterSpacing:'0.12em' }}>Keyword</span>
              <input value={keyword} onChange={e=>setKeyword(e.target.value)} placeholder="Watches, gaming, jewelry..." style={{ backgroundColor:'transparent', border:'none', outline:'none', fontSize:14, fontWeight:600, color:'white', fontFamily:"'Inter',sans-serif", padding:0, width:'100%' }} />
            </div>
            <button style={{ backgroundColor:C.mint, color:'white', border:'none', padding:'0 32px', fontWeight:800, fontSize:14, cursor:'pointer', flexShrink:0, transition:'background 0.15s', display:'flex', alignItems:'center', gap:8 }}
              onMouseEnter={e=>e.currentTarget.style.backgroundColor=C.mintDk}
              onMouseLeave={e=>e.currentTarget.style.backgroundColor=C.mint}>
              <Search size={16} /> Search
            </button>
          </div>
        </div>
      </section>

      {/* ADVANCED FILTER BAR */}
      <div style={{ maxWidth:1440, margin:'-26px auto 0', padding:'0 40px', position:'relative', zIndex:30 }}>
        <div style={{ backgroundColor:'rgba(255,255,255,0.95)', backdropFilter:'blur(20px)', borderRadius:100, padding:'8px 8px 8px 0', boxShadow:'0 8px 40px rgba(0,0,0,0.10)', border:'1px solid rgba(255,255,255,0.7)', display:'flex', alignItems:'center' }}>
          {[
            { label:'City', val:'Rabat', w:1 },
            { label:'Keyword', val:'Watches, gaming, jewelry...', w:2 },
            { label:'Category', val:'All Vault Items', w:1 },
            { label:'Price (MAD)', val:'Select Range', w:1 },
          ].map((f,i)=>(
            <div key={f.label} style={{ flex:f.w, padding:'8px 20px', borderRight:i<3?'1px solid rgba(186,202,197,0.25)':'none', display:'flex', flexDirection:'column' as const, cursor:'pointer', gap:1 }}>
              <span style={{ fontSize:9, textTransform:'uppercase' as const, fontWeight:700, color:C.muted, letterSpacing:'0.1em' }}>{f.label}</span>
              <span style={{ fontSize:13, fontWeight:600, color:C.ink }}>{f.val}</span>
            </div>
          ))}
          <button style={{ backgroundColor:C.mint, color:'white', border:'none', padding:'12px 24px', borderRadius:100, cursor:'pointer', fontWeight:700, fontSize:13, flexShrink:0, marginLeft:8, display:'flex', alignItems:'center', gap:6 }}>
            <Search size={15} /> SEARCH
          </button>
        </div>
      </div>

      <div style={{ maxWidth:1440, margin:'48px auto 0', padding:'0 40px 80px' }}>

        {/* BREADCRUMB */}
        <nav style={{ display:'flex', alignItems:'center', gap:6, fontSize:11, fontWeight:700, color:C.muted, textTransform:'uppercase' as const, letterSpacing:'0.06em', marginBottom:32 }}>
          <Link href={`/${locale}`} style={{ color:C.muted, textDecoration:'none' }}>Home</Link><span>›</span>
          <span style={{ color:C.ink }}>The Vault</span>
        </nav>

        {/* CATEGORY GRID */}
        <section style={{ marginBottom:64 }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:24 }}>
            <h2 style={{ ...UB, fontSize:28, color:C.ink }}>Browse by Category</h2>
            <span style={{ fontSize:14, color:C.muted }}>29,868 total listings</span>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:16 }}>
            {categories.map(cat=>(
              <Link key={cat.slug} href={`/${locale}/${cat.slug}`} style={{ textDecoration:'none' }}>
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
                        <p style={{ fontSize:11, color:'rgba(255,255,255,0.8)', fontWeight:600 }}>{cat.count} ads</p>
                      </div>
                      <div style={{ width:36, height:36, borderRadius:'50%', backgroundColor:'rgba(255,255,255,0.2)', backdropFilter:'blur(8px)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:18 }}>
                        {cat.emoji}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}

            {/* View More tile — 12th slot */}
            <Link href={`/${locale}/vault-other`} style={{ textDecoration:'none' }}>
              <div onMouseEnter={()=>setHovCat('view-more')} onMouseLeave={()=>setHovCat(null)}
                style={{ position:'relative', borderRadius:24, overflow:'hidden', cursor:'pointer', aspectRatio:'4/3', transition:'transform 0.2s, box-shadow 0.2s', transform:hovCat==='view-more'?'scale(1.02)':'scale(1)', boxShadow:hovCat==='view-more'?'0 20px 48px rgba(0,0,0,0.15)':'0 2px 8px rgba(0,0,0,0.06)',
                  background: hovCat==='view-more' ? `linear-gradient(135deg,${C.mint},${C.mintDk})` : C.ink,
                  display:'flex', flexDirection:'column' as const, alignItems:'center', justifyContent:'center', gap:8 }}>
                <div style={{ width:36, height:36, borderRadius:'50%', backgroundColor:'rgba(255,255,255,0.15)', display:'flex', alignItems:'center', justifyContent:'center' }}>
                  <ChevronRight size={20} color="white" />
                </div>
                <p style={{ ...UB, fontSize:15, color:'white' }}>View More</p>
                <p style={{ fontSize:11, color:'rgba(255,255,255,0.7)', fontWeight:600 }}>Other rare finds</p>
              </div>
            </Link>
          </div>
        </section>

        {/* DIAMOND MEMBER BANNER */}
        <section style={{ marginBottom:64 }}>
          <div style={{ position:'relative', height:220, borderRadius:40, overflow:'hidden', cursor:'pointer', boxShadow:'0 20px 60px rgba(0,0,0,0.15)' }}>
            <img src="https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&w=1200" alt="Diamond"
              style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover' }} />
            <div style={{ position:'absolute', inset:0, background:'linear-gradient(to right,rgba(22,29,27,0.92) 0%,rgba(22,29,27,0.5) 60%,transparent)' }} />
            <div style={{ position:'absolute', inset:0, display:'flex', flexDirection:'column' as const, justifyContent:'center', padding:'0 56px' }}>
              <span style={{ backgroundColor:C.mint, color:'white', fontSize:9, ...UB, padding:'4px 14px', borderRadius:100, textTransform:'uppercase' as const, letterSpacing:'0.12em', display:'inline-block', marginBottom:14, width:'fit-content' }}>SouKni Diamond</span>
              <h2 style={{ ...UB, fontSize:'clamp(20px,3vw,32px)', color:'white', marginBottom:20, lineHeight:1.1 }}>List your luxury property<br/>where the elite browse.</h2>
              <div style={{ display:'flex', gap:12 }}>
                <Link href={`/${locale}/diamond`} style={{ textDecoration:'none' }}>
                  <button style={{ backgroundColor:'white', color:C.ink, border:'none', padding:'11px 28px', borderRadius:100, fontSize:12, ...UB, cursor:'pointer' }}>Get Certified</button>
                </Link>
                <button style={{ backgroundColor:'transparent', color:'white', border:'1px solid rgba(255,255,255,0.4)', padding:'11px 28px', borderRadius:100, fontSize:12, fontWeight:700, cursor:'pointer' }}>Contact Expert</button>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURED PICKS */}
        <section style={{ marginBottom:64 }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:24 }}>
            <h2 style={{ ...UB, fontSize:28, color:C.ink }}>Featured Vault Picks</h2>
            <Link href={`/${locale}/jewelry-watches`} style={{ color:C.mint, fontWeight:700, fontSize:13, textDecoration:'none', display:'flex', alignItems:'center', gap:4 }}>
              View all <ChevronRight size={14} />
            </Link>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:20 }}>
            {featuredItems.map(item=>(
              <Link key={item.id} href={`/${locale}/listing/${item.id}`} style={{ textDecoration:'none' }}>
                <div onMouseEnter={()=>setHovItem(item.id)} onMouseLeave={()=>setHovItem(null)}
                  style={{ backgroundColor:'white', borderRadius:24, overflow:'hidden', border:`1px solid ${hovItem===item.id?C.mint:'rgba(186,202,197,0.2)'}`, boxShadow:hovItem===item.id?'0 20px 48px rgba(0,0,0,0.12)':'0 2px 8px rgba(0,0,0,0.04)', transition:'all 0.3s', cursor:'pointer' }}>
                  <div style={{ position:'relative', aspectRatio:'4/3', overflow:'hidden' }}>
                    <img src={item.image} alt={item.title} style={{ width:'100%', height:'100%', objectFit:'cover', transition:'transform 0.5s', transform:hovItem===item.id?'scale(1.06)':'scale(1)' }} />
                    <span style={{ position:'absolute', top:10, left:10, background:'linear-gradient(135deg,#22d4a8,#0f9b8e)', color:'white', fontSize:'8px', fontWeight:900, padding:'3px 10px', borderRadius:100, textTransform:'uppercase' as const }}>✦ SOUKNI CERTIFIED</span>
                  </div>
                  <div style={{ padding:'16px 18px' }}>
                    <p style={{ fontFamily:"'Hanken Grotesk',sans-serif", fontWeight:900, letterSpacing:'-0.03em', fontSize:14, color:C.ink, marginBottom:6, lineHeight:1.3, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{item.title}</p>
                    <p style={{ fontFamily:"'Hanken Grotesk',sans-serif", fontWeight:900, letterSpacing:'-0.03em', fontSize:18, color:C.mint, marginBottom:6 }}>{formatPrice(item.price)}</p>
                    <p style={{ fontSize:11, color:C.muted }}>{item.location}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* AUTO PRO BANNER */}
        <section style={{ marginBottom:64 }}>
          <div style={{ position:'relative', height:220, borderRadius:40, overflow:'hidden', cursor:'pointer', boxShadow:'0 20px 60px rgba(0,0,0,0.15)' }}>
            <img src="https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&w=1200" alt="Auto Pro"
              style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover' }} />
            <div style={{ position:'absolute', inset:0, background:'linear-gradient(to right,rgba(22,29,27,0.92) 0%,rgba(22,29,27,0.5) 60%,transparent)' }} />
            <div style={{ position:'absolute', inset:0, display:'flex', flexDirection:'column' as const, justifyContent:'center', padding:'0 56px' }}>
              <span style={{ backgroundColor:'#8d4f00', color:'white', fontSize:9, ...UB, padding:'4px 14px', borderRadius:100, textTransform:'uppercase' as const, letterSpacing:'0.12em', display:'inline-block', marginBottom:14, width:'fit-content' }}>SouKni Auto Pro</span>
              <h2 style={{ ...UB, fontSize:'clamp(20px,3vw,32px)', color:'white', marginBottom:20, lineHeight:1.1 }}>Premium Vehicles for<br/>the Elite Shopper.</h2>
              <div style={{ display:'flex', gap:12 }}>
                <Link href={`/${locale}/motors`} style={{ textDecoration:'none' }}>
                  <button style={{ backgroundColor:'white', color:C.ink, border:'none', padding:'11px 28px', borderRadius:100, fontSize:12, ...UB, cursor:'pointer' }}>Browse &amp; Explore</button>
                </Link>
                <button style={{ backgroundColor:'transparent', color:'white', border:'1px solid rgba(255,255,255,0.4)', padding:'11px 28px', borderRadius:100, fontSize:12, fontWeight:700, cursor:'pointer' }}>Contact Expert</button>
              </div>
            </div>
          </div>
        </section>

        {/* TRENDING SEARCHES */}
        <section style={{ marginBottom:64 }}>
          <h2 style={{ ...UB, fontSize:22, color:C.ink, marginBottom:20 }}>Trending in The Vault</h2>
          <div style={{ display:'flex', gap:10, flexWrap:'wrap' as const }}>
            {['Rolex Submariner','PS5 Console','Patek Philippe','Fender Guitar','LEGO Collector','Cartier Bracelet','Gaming PC','Vintage Watch','Van Cleef Jewelry','Nintendo Switch','Home Decor','Sports Gear'].map(tag=>(
              <Link key={tag} href={`/${locale}/jewelry-watches`} style={{ textDecoration:'none' }}>
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
          <img src="https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&w=1600" alt="Diamond"
            style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover' }} />
          <div style={{ position:'absolute', inset:0, background:'linear-gradient(135deg,rgba(15,23,42,0.96),rgba(15,23,42,0.7))' }} />
          <div style={{ position:'relative', zIndex:1, padding:'56px 64px', maxWidth:640 }}>
            <span style={{ display:'inline-flex', alignItems:'center', gap:6, background:'linear-gradient(135deg,#22d4a8,#0f9b8e)', color:'white', fontSize:9, ...UB, padding:'5px 16px', borderRadius:100, textTransform:'uppercase' as const, letterSpacing:'0.12em', marginBottom:20 }}>✦ SOUKNI CERTIFIED</span>
            <h2 style={{ ...UB, fontSize:'clamp(28px,4vw,48px)', color:'white', marginBottom:16, lineHeight:1.05 }}>Unlock the Power of Diamond.</h2>
            <p style={{ fontSize:15, color:'rgba(255,255,255,0.72)', lineHeight:1.7, marginBottom:28 }}>Priority placement, boosted visibility, and full access to Morocco's most discerning collectors. Get started today.</p>
            <div style={{ display:'flex', gap:12 }}>
              <button style={{ backgroundColor:C.mint, color:'white', border:'none', padding:'13px 28px', borderRadius:100, fontSize:13, ...UB, cursor:'pointer' }}>Get Started</button>
              <button style={{ backgroundColor:'transparent', color:'white', border:'1px solid rgba(255,255,255,0.3)', padding:'13px 28px', borderRadius:100, fontSize:13, fontWeight:700, cursor:'pointer' }}>Learn More</button>
            </div>
          </div>
        </section>

        {/* JOIN THE SOUKNI FAMILY */}
        <section style={{ borderRadius:40, background:'linear-gradient(135deg,#22d4a8,#0f9b8e)', padding:'56px 64px', display:'flex', alignItems:'center', justifyContent:'space-between', gap:40, flexWrap:'wrap' as const }}>
          <div>
            <h2 style={{ ...UB, fontSize:'clamp(28px,4vw,44px)', color:'white', marginBottom:12, lineHeight:1.05 }}>UNLOCK YOUR VAULT</h2>
            <p style={{ fontSize:15, color:'rgba(255,255,255,0.85)', maxWidth:480, lineHeight:1.7 }}>Start selling your luxury or collectible items today for free and reach millions of buyers across Morocco.</p>
            <div style={{ display:'flex', gap:12, marginTop:24 }}>
              <button style={{ backgroundColor:'white', color:C.mint, border:'none', padding:'12px 24px', borderRadius:100, fontWeight:800, fontSize:13, cursor:'pointer', display:'flex', alignItems:'center', gap:8 }}>🍎 App Store</button>
              <button style={{ backgroundColor:'rgba(255,255,255,0.15)', color:'white', border:'1px solid rgba(255,255,255,0.4)', padding:'12px 24px', borderRadius:100, fontWeight:800, fontSize:13, cursor:'pointer', display:'flex', alignItems:'center', gap:8 }}>▶ Google Play</button>
            </div>
          </div>
          <Link href={`/${locale}/post-ad`} style={{ textDecoration:'none' }}>
            <span style={{ display:'inline-block', backgroundColor:'white', color:C.mint, padding:'16px 36px', borderRadius:100, fontWeight:900, fontSize:14, cursor:'pointer', whiteSpace:'nowrap' as const, ...UB }}>Post Free Ad →</span>
          </Link>
        </section>

      </div>
    </div>
  )
}
