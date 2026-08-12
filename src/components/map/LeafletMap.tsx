'use client'
import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { X, Heart, MapPin, Eye, Phone, ChevronRight } from 'lucide-react'

const C = { mint:'#22d4a8', mintDk:'#0f9b8e', ink:'#161d1b', surface:'#f4fbf8', muted:'#6b7a76' }

export type MapListing = {
  id: number; title: string; price: string; priceNum: number
  category: string; city: string; image: string; badge: string | null
  lat: number; lng: number; views: number; condition: string
}

interface Props {
  listings: MapListing[]
  selected: MapListing | null
  onSelect: (l: MapListing | null) => void
  locale: string
  saved: number[]
  onSave: (id: number) => void
  allListings: MapListing[]
}

export default function LeafletMap({ listings, selected, onSelect, locale, saved, onSave, allListings }: Props) {
  const mapRef     = useRef<any>(null)
  const mapElRef   = useRef<HTMLDivElement>(null)
  const markersRef = useRef<any[]>([])

  useEffect(() => {
    if (!mapElRef.current || mapRef.current) return
    let L: any
    import('leaflet').then(mod => {
      L = mod.default ?? mod
      delete (L.Icon.Default.prototype as any)._getIconUrl
      L.Icon.Default.mergeOptions({
        iconRetinaUrl:'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
        iconUrl:'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
        shadowUrl:'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
      })
      const map = L.map(mapElRef.current, {
        center:[31.7917,-7.0926], zoom:6, zoomControl:false,
      })
      L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',{
        attribution:'© <a href="https://www.openstreetmap.org/copyright">OSM</a> © <a href="https://carto.com/">CARTO</a>',
        subdomains:'abcd', maxZoom:20,
      }).addTo(map)
      mapRef.current = map
    })
    return () => { if(mapRef.current){mapRef.current.remove();mapRef.current=null} }
  }, [])

  useEffect(() => {
    if (!mapRef.current) {
      const t = setTimeout(() => { if (mapRef.current) updateMarkers() }, 500)
      return () => clearTimeout(t)
    }
    updateMarkers()

    function updateMarkers() {
      import('leaflet').then(mod => {
        const L = mod.default ?? mod
        markersRef.current.forEach(m => m.remove())
        markersRef.current = []
        listings.forEach(listing => {
          const isSel = selected?.id === listing.id
          const badgeColor = listing.badge==='Diamond'?C.mint:listing.badge==='Certified'?'#0891b2':'#6b7a76'
          const priceLabel = listing.priceNum>=1000000
            ? `${(listing.priceNum/1000000).toFixed(1)}M`
            : listing.priceNum>=1000 ? `${(listing.priceNum/1000).toFixed(0)}K`
            : `${listing.priceNum}`
          const icon = L.divIcon({
            className:'',
            html:`<div style="position:relative;display:inline-flex;cursor:pointer;filter:drop-shadow(0 2px 8px rgba(0,0,0,${isSel?'0.35':'0.18'}))">
              <div style="background:${isSel?C.mint:'white'};color:${isSel?'white':C.ink};border:2px solid ${isSel?C.mint:badgeColor};border-radius:100px;padding:4px 10px;font-size:11px;font-weight:900;font-family:'Inter',sans-serif;white-space:nowrap;transform:${isSel?'scale(1.12)':'scale(1)'}">${priceLabel} MAD</div>
              <div style="position:absolute;bottom:-6px;left:50%;transform:translateX(-50%);width:8px;height:8px;background:${isSel?C.mint:badgeColor};border-radius:50%;border:2px solid white"></div>
            </div>`,
            iconSize:[80,32], iconAnchor:[40,38],
          })
          const marker = L.marker([listing.lat,listing.lng],{icon})
            .addTo(mapRef.current)
            .on('click',()=>onSelect(isSel?null:listing))
          markersRef.current.push(marker)
        })
      })
    }
  }, [listings, selected])

  return (
    <div style={{ flex:1, display:'flex', overflow:'hidden', position:'relative' }}>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css"/>
      <div ref={mapElRef} style={{ flex:1, height:'100%' }}/>

      {/* Floating pill */}
      <div style={{ position:'absolute', bottom:24, left:'50%', transform:'translateX(-50%)', background:'rgba(22,29,27,0.88)', backdropFilter:'blur(12px)', borderRadius:100, padding:'10px 20px', zIndex:1000, display:'flex', alignItems:'center', gap:8, boxShadow:'0 4px 24px rgba(0,0,0,0.2)', pointerEvents:'none' }}>
        <MapPin size={13} color={C.mint}/>
        <span style={{ fontSize:'13px', fontWeight:800, color:'white' }}>{listings.length} listings in view</span>
        <span style={{ fontSize:'11px', color:'rgba(255,255,255,0.5)', fontWeight:600 }}>· Click a pin to preview</span>
      </div>

      {/* Slide-in panel */}
      <div style={{ width:selected?'360px':'0', overflow:'hidden', transition:'width 0.3s cubic-bezier(0.4,0,0.2,1)', background:'white', borderLeft:'1px solid #e2eae6', display:'flex', flexDirection:'column', flexShrink:0, zIndex:1000 }}>
        {selected && (
          <>
            <div style={{ position:'relative', height:200, flexShrink:0, overflow:'hidden' }}>
              <img src={selected.image} alt={selected.title} style={{ width:'100%', height:'100%', objectFit:'cover' }}/>
              <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top,rgba(22,29,27,0.6),transparent 60%)' }}/>
              <button onClick={()=>onSelect(null)} style={{ position:'absolute', top:12, right:12, width:32, height:32, borderRadius:'50%', background:'rgba(255,255,255,0.9)', border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}>
                <X size={14} color={C.ink}/>
              </button>
              {selected.badge && (
                <span style={{ position:'absolute', top:12, left:12, fontSize:'9px', fontWeight:900, padding:'4px 10px', borderRadius:100, background:selected.badge==='Diamond'?C.mint:'#0891b2', color:'white', textTransform:'uppercase' as const, letterSpacing:'0.08em' }}>
                  {selected.badge==='Diamond'?'💎 ':''}{selected.badge}
                </span>
              )}
              <div style={{ position:'absolute', bottom:12, left:12 }}>
                <span style={{ fontSize:'22px', fontWeight:900, color:'white', fontFamily:"'Inter',sans-serif", letterSpacing:'-0.04em' }}>{selected.price}</span>
              </div>
            </div>
            <div style={{ padding:'18px 20px', flex:1, overflowY:'auto' }}>
              <div style={{ display:'flex', alignItems:'center', gap:6, marginBottom:8 }}>
                <span style={{ fontSize:10, fontWeight:800, color:C.mint, background:`${C.mint}15`, padding:'3px 8px', borderRadius:100, textTransform:'uppercase' as const }}>{selected.category}</span>
                <span style={{ fontSize:10, fontWeight:700, color:C.muted }}>{selected.condition}</span>
              </div>
              <h3 style={{ fontSize:16, fontWeight:900, color:C.ink, marginBottom:10, lineHeight:1.3, letterSpacing:'-0.03em' }}>{selected.title}</h3>
              <div style={{ display:'flex', alignItems:'center', gap:6, marginBottom:14 }}>
                <MapPin size={13} color={C.muted}/><span style={{ fontSize:13, color:C.muted, fontWeight:600 }}>{selected.city}</span>
                <Eye size={12} color={C.muted}/><span style={{ fontSize:12, color:C.muted, fontWeight:600 }}>{selected.views.toLocaleString()}</span>
              </div>
              <div style={{ display:'flex', gap:8, marginBottom:12 }}>
                <Link href={`/${locale}/listing/${selected.id}`}
                  style={{ flex:1, padding:'12px', borderRadius:12, background:C.ink, color:'white', textDecoration:'none', fontSize:13, fontWeight:900, textAlign:'center', fontFamily:"'Inter',sans-serif" }}>
                  View Listing →
                </Link>
                <button onClick={()=>onSave(selected.id)}
                  style={{ width:44, height:44, borderRadius:12, border:`1.5px solid ${saved.includes(selected.id)?'#ef4444':'#e2eae6'}`, background:saved.includes(selected.id)?'#fef2f2':'white', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                  <Heart size={16} color={saved.includes(selected.id)?'#ef4444':C.muted} fill={saved.includes(selected.id)?'#ef4444':'none'}/>
                </button>
              </div>
              <Link href={`/${locale}/messages`}
                style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:6, padding:'11px', borderRadius:12, border:`1.5px solid ${C.mint}`, color:C.mint, textDecoration:'none', fontSize:13, fontWeight:800, fontFamily:"'Inter',sans-serif", background:'white' }}>
                <Phone size={13}/> Contact Seller
              </Link>
            </div>
            <div style={{ padding:'0 20px 20px' }}>
              <p style={{ fontSize:11, fontWeight:800, color:C.muted, textTransform:'uppercase' as const, letterSpacing:'0.08em', marginBottom:10 }}>Nearby listings</p>
              {allListings.filter(l=>l.id!==selected.id&&l.city===selected.city).slice(0,2).map(l=>(
                <button key={l.id} onClick={()=>onSelect(l)}
                  style={{ width:'100%', display:'flex', alignItems:'center', gap:10, padding:'10px', borderRadius:12, border:'1px solid #f1f5f9', background:'white', cursor:'pointer', marginBottom:8, textAlign:'left', fontFamily:"'Inter',sans-serif" }}>
                  <img src={l.image} alt={l.title} style={{ width:44, height:44, borderRadius:8, objectFit:'cover', flexShrink:0 }}/>
                  <div style={{ overflow:'hidden', flex:1 }}>
                    <p style={{ fontSize:12, fontWeight:800, color:C.ink, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{l.title}</p>
                    <p style={{ fontSize:12, fontWeight:900, color:C.mint }}>{l.price}</p>
                  </div>
                  <ChevronRight size={14} color={C.muted}/>
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
