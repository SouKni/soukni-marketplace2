'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { MapPin, Heart, MessageCircle, Share2, Eye, Clock, Shield, Star, ChevronLeft, ChevronRight, Phone } from 'lucide-react'
import { useListings } from '@/hooks/useListings'
import { useMarket } from '@/context/MarketContext'
import { useFavorites } from '@/hooks/useFavorites'
import WhatsAppButton from '@/components/ui/WhatsAppButton'
import MessageSellerButton from '@/components/ui/MessageSellerButton'
import ReportButton from '@/components/ui/ReportButton'
import NegotiationAdvisor from '@/components/ui/NegotiationAdvisor'

const C = { mint:'#22d4a8', mintDk:'#0f9b8e', ink:'#161d1b', surface:'#f4fbf8', muted:'#6b7a76' }
const UB = { fontFamily:"'Inter',sans-serif", fontWeight:900, letterSpacing:'-0.05em' } as const
const HK = { fontFamily:"'Hanken Grotesk',sans-serif", fontWeight:700, letterSpacing:'-0.02em' } as const

export default function ListingPage() {
  const params = useParams()
  const locale = (params?.locale as string) || 'en'
  const id = params?.id as string

  const { fetchListingById, incrementView, loading } = useListings()
  const { formatPrice } = useMarket()

  const [listing, setListing] = useState<any>(null)
  const [imgIdx, setImgIdx] = useState(0)
  const { isFavorited, toggleFavorite } = useFavorites()
  const saved = listing ? isFavorited(listing.id) : false
  const [showPhone, setShowPhone] = useState(false)

  useEffect(() => {
    if (!id) return
    fetchListingById(id).then(data => {
      setListing(data)
      incrementView(id)
    })
  }, [id])

  if (loading || !listing) return (
    <div style={{ minHeight:'100vh', backgroundColor:C.surface, display:'flex', alignItems:'center', justifyContent:'center' }}>
      <div style={{ textAlign:'center' }}>
        <div style={{ width:48, height:48, border:`3px solid ${C.mint}`, borderTopColor:'transparent', borderRadius:'50%', animation:'spin 0.8s linear infinite', margin:'0 auto 16px' }} />
        <p style={{ ...HK, color:C.muted, fontSize:14 }}>{loading ? 'Loading listing...' : 'Listing not found'}</p>
      </div>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  )

  const images = listing.images?.length ? listing.images : ['https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&w=800']
  const seller = listing.profiles || {}
  const price = listing.price / 100

  return (
    <div style={{ fontFamily:"'Inter',sans-serif", backgroundColor:C.surface, minHeight:'100vh' }}>

      {/* BREADCRUMB */}
      <div style={{ maxWidth:1440, margin:'0 auto', padding:'16px 40px' }}>
        <nav style={{ display:'flex', alignItems:'center', gap:6, fontSize:11, fontWeight:700, color:C.muted, textTransform:'uppercase' as const, letterSpacing:'0.06em' }}>
          <Link href={`/${locale}`} style={{ color:C.muted, textDecoration:'none' }}>Home</Link><span>›</span>
          <Link href={`/${locale}/${listing.category_slug || ''}`} style={{ color:C.muted, textDecoration:'none' }}>{listing.category_slug || 'Browse'}</Link><span>›</span>
          <span style={{ color:C.ink, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap', maxWidth:300 }}>{listing.title}</span>
        </nav>
      </div>

      <div style={{ maxWidth:1440, margin:'0 auto', padding:'0 40px 80px', display:'grid', gridTemplateColumns:'1fr 380px', gap:40, alignItems:'start' }}>

        {/* LEFT — Images + Details */}
        <div>

          {/* IMAGE GALLERY */}
          <div style={{ position:'relative', borderRadius:32, overflow:'hidden', marginBottom:16, aspectRatio:'16/9', backgroundColor:'#e8efec' }}>
            <img src={images[imgIdx]} alt={listing.title} style={{ width:'100%', height:'100%', objectFit:'cover' }} />

            {/* Badge */}
            {listing.badge && (
              <div style={{ position:'absolute', top:16, left:16, background:'linear-gradient(135deg,#22d4a8,#0f9b8e)', color:'white', fontSize:9, ...UB, padding:'4px 12px', borderRadius:100, letterSpacing:'0.1em', textTransform:'uppercase' as const }}>
                ✦ SOUKNI {listing.badge.toUpperCase()}
              </div>
            )}

            {/* Nav arrows */}
            {images.length > 1 && (
              <>
                <button onClick={()=>setImgIdx(i=>(i-1+images.length)%images.length)}
                  style={{ position:'absolute', left:12, top:'50%', transform:'translateY(-50%)', width:40, height:40, borderRadius:'50%', backgroundColor:'rgba(255,255,255,0.9)', border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', boxShadow:'0 2px 8px rgba(0,0,0,0.15)' }}>
                  <ChevronLeft size={18} color={C.ink} />
                </button>
                <button onClick={()=>setImgIdx(i=>(i+1)%images.length)}
                  style={{ position:'absolute', right:12, top:'50%', transform:'translateY(-50%)', width:40, height:40, borderRadius:'50%', backgroundColor:'rgba(255,255,255,0.9)', border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', boxShadow:'0 2px 8px rgba(0,0,0,0.15)' }}>
                  <ChevronRight size={18} color={C.ink} />
                </button>
                <div style={{ position:'absolute', bottom:12, left:'50%', transform:'translateX(-50%)', display:'flex', gap:6 }}>
                  {images.map((_:any,i:number)=>(
                    <button key={i} onClick={()=>setImgIdx(i)}
                      style={{ width:i===imgIdx?24:8, height:8, borderRadius:100, border:'none', backgroundColor:i===imgIdx?C.mint:'rgba(255,255,255,0.6)', cursor:'pointer', transition:'all 0.2s' }} />
                  ))}
                </div>
              </>
            )}

            {/* Counter */}
            <div style={{ position:'absolute', bottom:16, right:16, backgroundColor:'rgba(0,0,0,0.5)', backdropFilter:'blur(8px)', color:'white', fontSize:11, fontWeight:700, padding:'4px 10px', borderRadius:100 }}>
              {imgIdx+1} / {images.length}
            </div>
          </div>

          {/* Thumbnails */}
          {images.length > 1 && (
            <div style={{ display:'flex', gap:8, marginBottom:24, overflowX:'auto', paddingBottom:4 }}>
              {images.map((img:string, i:number)=>(
                <button key={i} onClick={()=>setImgIdx(i)}
                  style={{ width:80, height:60, borderRadius:12, overflow:'hidden', border:`2px solid ${i===imgIdx?C.mint:'transparent'}`, flexShrink:0, cursor:'pointer', padding:0, transition:'border-color 0.2s' }}>
                  <img src={img} alt="" style={{ width:'100%', height:'100%', objectFit:'cover' }} />
                </button>
              ))}
            </div>
          )}

          {/* TITLE & META */}
          <div style={{ backgroundColor:'white', borderRadius:24, padding:28, marginBottom:16, boxShadow:'0 2px 8px rgba(0,0,0,0.04)' }}>
            <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', gap:16, marginBottom:12 }}>
              <h1 style={{ ...UB, fontSize:'clamp(20px,2.5vw,28px)', color:C.ink, lineHeight:1.1, flex:1 }}>{listing.title}</h1>
              <button onClick={()=>toggleFavorite(listing.id)}
                style={{ width:44, height:44, borderRadius:'50%', border:`1px solid ${saved?'#ef4444':'rgba(186,202,197,0.4)'}`, backgroundColor:'white', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', flexShrink:0, transition:'all 0.2s' }}>
                <Heart size={18} color={saved?'#ef4444':C.muted} fill={saved?'#ef4444':'none'} />
              </button>
            </div>

            <div style={{ display:'flex', flexWrap:'wrap' as const, gap:16, marginBottom:16 }}>
              <span style={{ display:'flex', alignItems:'center', gap:4, fontSize:13, color:C.muted }}><MapPin size={14} color={C.mint} />{listing.city}{listing.neighbourhood ? `, ${listing.neighbourhood}` : ''}</span>
              {listing.views_count && <span style={{ display:'flex', alignItems:'center', gap:4, fontSize:13, color:C.muted }}><Eye size={14} />{listing.views_count} views</span>}
              {listing.created_at && <span style={{ display:'flex', alignItems:'center', gap:4, fontSize:13, color:C.muted }}><Clock size={14} />{new Date(listing.created_at).toLocaleDateString('en-GB', { day:'numeric', month:'short', year:'numeric' })}</span>}
              {listing.condition && <span style={{ backgroundColor:'#e8efec', color:C.ink, fontSize:11, fontWeight:700, padding:'3px 10px', borderRadius:100, textTransform:'uppercase' as const, letterSpacing:'0.06em' }}>{listing.condition}</span>}
            </div>

            <div style={{ ...UB, fontSize:'clamp(24px,3vw,36px)', color:C.mint }}>{formatPrice(price)}</div>
          </div>

          {/* DESCRIPTION */}
          {listing.description && (
            <div style={{ backgroundColor:'white', borderRadius:24, padding:28, marginBottom:16, boxShadow:'0 2px 8px rgba(0,0,0,0.04)' }}>
              <h2 style={{ ...UB, fontSize:16, color:C.ink, marginBottom:14, textTransform:'uppercase' as const, letterSpacing:'0.08em' }}>Description</h2>
              <p style={{ fontSize:15, color:C.ink, lineHeight:1.8, whiteSpace:'pre-wrap' as const }}>{listing.description}</p>
            </div>
          )}

          {/* DETAILS TABLE */}
          {(listing.make || listing.model || listing.year || listing.mileage || listing.fuel_type || listing.transmission || listing.condition) && (
            <div style={{ backgroundColor:'white', borderRadius:24, padding:28, marginBottom:16, boxShadow:'0 2px 8px rgba(0,0,0,0.04)' }}>
              <h2 style={{ ...UB, fontSize:16, color:C.ink, marginBottom:14, textTransform:'uppercase' as const, letterSpacing:'0.08em' }}>Details</h2>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
                {[
                  ['Condition', listing.condition],
                  ['Make', listing.make],
                  ['Model', listing.model],
                  ['Year', listing.year],
                  ['Mileage', listing.mileage ? `${listing.mileage.toLocaleString()} km` : null],
                  ['Fuel', listing.fuel_type],
                  ['Transmission', listing.transmission],
                  ['Body Type', listing.body_type],
                  ['Colour', listing.colour],
                  ['Size', listing.size],
                  ['Brand', listing.brand],
                ].filter(([,v])=>v).map(([k,v])=>(
                  <div key={k as string} style={{ display:'flex', justifyContent:'space-between', padding:'10px 0', borderBottom:'1px solid rgba(186,202,197,0.2)' }}>
                    <span style={{ fontSize:13, color:C.muted, fontWeight:600 }}>{k}</span>
                    <span style={{ fontSize:13, color:C.ink, fontWeight:700 }}>{v}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* LOCATION MAP PLACEHOLDER */}
          <div style={{ backgroundColor:'white', borderRadius:24, padding:28, boxShadow:'0 2px 8px rgba(0,0,0,0.04)' }}>
            <h2 style={{ ...UB, fontSize:16, color:C.ink, marginBottom:14, textTransform:'uppercase' as const, letterSpacing:'0.08em' }}>Location</h2>
            <div style={{ height:200, backgroundColor:'#e8efec', borderRadius:16, display:'flex', alignItems:'center', justifyContent:'center', gap:8 }}>
              <MapPin size={20} color={C.mint} />
              <span style={{ ...HK, fontSize:15, color:C.muted }}>{listing.city}{listing.neighbourhood ? `, ${listing.neighbourhood}` : ''}</span>
            </div>
          </div>
        </div>

        {/* RIGHT — Seller Card + CTA */}
        <div style={{ position:'sticky', top:24 }}>

          {/* PRICE + CTA */}
          <div style={{ backgroundColor:'white', borderRadius:24, padding:24, marginBottom:16, boxShadow:'0 4px 24px rgba(0,0,0,0.08)', border:`1px solid rgba(34,212,168,0.15)` }}>
            <div style={{ ...UB, fontSize:32, color:C.mint, marginBottom:4 }}>{formatPrice(price)}</div>
            {listing.price_negotiable && <p style={{ fontSize:12, color:C.muted, marginBottom:16 }}>Price negotiable</p>}

            <div style={{ display:'flex', flexDirection:'column' as const, gap:10 }}>
              <button
                onClick={()=>setShowPhone(!showPhone)}
                style={{ width:'100%', padding:'14px 0', borderRadius:100, backgroundColor:C.mint, border:'none', color:'white', fontSize:14, ...UB, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', gap:8, transition:'filter 0.15s' }}>
                <Phone size={16} /> {showPhone ? (listing.profiles?.phone || 'Contact seller') : 'Show Phone Number'}
              </button>
              <WhatsAppButton phone={listing.profiles?.phone} title={listing.title}
                style={{ width:'100%', padding:'14px 0', borderRadius:100, fontSize:14, ...UB, gap:8 }}>
                <MessageCircle size={16} /> WhatsApp
              </WhatsAppButton>
              <MessageSellerButton listingId={listing.id} sellerId={listing.seller_id}
                style={{ width:'100%', padding:'14px 0', borderRadius:100, backgroundColor:'#eef5f2', border:'none', color:C.ink, fontSize:14, ...UB, display:'flex', alignItems:'center', justifyContent:'center', gap:8 }}>
                <MessageCircle size={16} /> Send Message
              </MessageSellerButton>
              <NegotiationAdvisor listingId={listing.id} sellerId={listing.seller_id} askingPrice={price} currency={listing.currency} title={listing.title} />
            </div>

            <div style={{ display:'flex', gap:8, marginTop:12 }}>
              <button onClick={()=>toggleFavorite(listing.id)}
                style={{ flex:1, padding:'10px 0', borderRadius:100, border:`1px solid ${saved?'#ef4444':'rgba(186,202,197,0.4)'}`, backgroundColor:'white', color:saved?'#ef4444':C.muted, fontSize:12, fontWeight:700, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', gap:6 }}>
                <Heart size={13} fill={saved?'#ef4444':'none'} /> {saved?'Saved':'Save'}
              </button>
              <button
                onClick={()=>navigator.share?.({ title:listing.title, url:window.location.href }).catch(()=>{})}
                style={{ flex:1, padding:'10px 0', borderRadius:100, border:'1px solid rgba(186,202,197,0.4)', backgroundColor:'white', color:C.muted, fontSize:12, fontWeight:700, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', gap:6 }}>
                <Share2 size={13} /> Share
              </button>
              <ReportButton targetType="listing" targetId={listing.id}
                style={{ flex:1, padding:'10px 0', borderRadius:100, border:'1px solid rgba(186,202,197,0.4)', backgroundColor:'white', color:C.muted, fontSize:12, fontWeight:700, justifyContent:'center' }} />
            </div>
          </div>

          {/* SELLER CARD */}
          <div style={{ backgroundColor:'white', borderRadius:24, padding:24, marginBottom:16, boxShadow:'0 2px 8px rgba(0,0,0,0.04)' }}>
            <h3 style={{ ...UB, fontSize:13, color:C.muted, textTransform:'uppercase' as const, letterSpacing:'0.1em', marginBottom:14 }}>Seller</h3>
            <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:16 }}>
              <div style={{ width:52, height:52, borderRadius:'50%', overflow:'hidden', backgroundColor:'#e8efec', flexShrink:0 }}>
                {seller.avatar_url
                  ? <img src={seller.avatar_url} alt={seller.full_name} style={{ width:'100%', height:'100%', objectFit:'cover' }} />
                  : <div style={{ width:'100%', height:'100%', display:'flex', alignItems:'center', justifyContent:'center', ...UB, fontSize:20, color:C.mint }}>{(seller.full_name||'S')[0]}</div>
                }
              </div>
              <div>
                <p style={{ ...UB, fontSize:16, color:C.ink, marginBottom:2 }}>{seller.full_name || 'Private Seller'}</p>
                {seller.badge && (
                  <span style={{ fontSize:9, ...UB, color:C.mint, textTransform:'uppercase' as const, letterSpacing:'0.1em' }}>✦ {seller.badge}</span>
                )}
              </div>
            </div>

            {seller.rating && (
              <div style={{ display:'flex', alignItems:'center', gap:6, marginBottom:10 }}>
                <div style={{ display:'flex', gap:2 }}>
                  {[1,2,3,4,5].map(i=><Star key={i} size={12} fill={i<=Math.floor(seller.rating)?'#f59e0b':'none'} color="#f59e0b" />)}
                </div>
                <span style={{ fontSize:13, fontWeight:700, color:C.ink }}>{seller.rating}</span>
                {seller.review_count && <span style={{ fontSize:12, color:C.muted }}>({seller.review_count} reviews)</span>}
              </div>
            )}

            <div style={{ display:'flex', flexDirection:'column' as const, gap:6, fontSize:12, color:C.muted }}>
              {seller.response_rate && <span>Response rate: <strong style={{ color:C.ink }}>{seller.response_rate}%</strong></span>}
              {seller.response_time && <span>Replies in: <strong style={{ color:C.ink }}>{seller.response_time}</strong></span>}
              {seller.city && <span style={{ display:'flex', alignItems:'center', gap:4 }}><MapPin size={11} />{seller.city}</span>}
              {seller.verified_at && (
                <span style={{ display:'flex', alignItems:'center', gap:4, color:C.mint }}>
                  <Shield size={11} /> Verified seller
                </span>
              )}
            </div>

            <Link href={`/${locale}/seller/${listing.user_id}`} style={{ textDecoration:'none', display:'block', marginTop:14 }}>
              <button style={{ width:'100%', padding:'10px 0', borderRadius:100, border:`1px solid ${C.mint}`, backgroundColor:'transparent', color:C.mint, fontSize:12, ...UB, cursor:'pointer' }}>
                View All Ads
              </button>
            </Link>
          </div>

          {/* SAFETY TIP */}
          <div style={{ backgroundColor:'#fffbeb', borderRadius:20, padding:20, border:'1px solid #fde68a' }}>
            <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:8 }}>
              <Shield size={14} color='#d97706' />
              <span style={{ fontSize:12, ...UB, color:'#d97706', textTransform:'uppercase' as const, letterSpacing:'0.08em' }}>Safety Tips</span>
            </div>
            <ul style={{ fontSize:12, color:'#78716c', lineHeight:1.8, paddingLeft:16, margin:0 }}>
              <li>Meet in a safe public place</li>
              <li>Verify the item before paying</li>
              <li>Never send money in advance</li>
              <li>Report suspicious ads</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
