'use client'
import React, { useState, useRef, useEffect } from 'react'
import { ChevronDown, MapPin } from 'lucide-react'
import { MOROCCO_LOCATIONS } from '@/lib/moroccoLocations'

const C = { mint:'#22d4a8', ink:'#161d1b', muted:'#6b7a76' }

export const ALL_CITIES = MOROCCO_LOCATIONS.flatMap(r =>
  r.provinces.flatMap(p => p.cities.map(c => ({
    city: c.name,
    province: p.name,
    region: r.region,
    neighborhoods: c.neighborhoods
  })))
)

interface Props {
  city: string
  neighbourhood: string
  onCityChange: (city: string) => void
  onNeighbourhoodChange: (n: string) => void
  style?: React.CSSProperties
}

export default function LocationSelect({ city, neighbourhood, onCityChange, onNeighbourhoodChange, style }: Props) {
  const [cityOpen, setCityOpen] = useState(false)
  const [neighOpen, setNeighOpen] = useState(false)
  const [citySearch, setCitySearch] = useState('')
  const cityRef = useRef<HTMLDivElement>(null)
  const neighRef = useRef<HTMLDivElement>(null)

  const selectedCityData = ALL_CITIES.find(c => c.city === city)
  const filteredCities = citySearch
    ? ALL_CITIES.filter(c =>
        c.city.toLowerCase().includes(citySearch.toLowerCase()) ||
        c.province.toLowerCase().includes(citySearch.toLowerCase())
      )
    : ALL_CITIES

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (cityRef.current && !cityRef.current.contains(e.target as Node)) setCityOpen(false)
      if (neighRef.current && !neighRef.current.contains(e.target as Node)) setNeighOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <div style={{ display:'flex', gap:8, ...style }}>
      {/* City */}
      <div ref={cityRef} style={{ position:'relative', flex:1 }}>
        <button
          onClick={() => { setCityOpen(!cityOpen); setNeighOpen(false) }}
          style={{ width:'100%', display:'flex', alignItems:'center', justifyContent:'space-between', gap:6, padding:'10px 14px', borderRadius:12, border:`1px solid ${cityOpen ? C.mint : 'rgba(186,202,197,0.4)'}`, backgroundColor:'white', cursor:'pointer', fontSize:13, fontWeight:600, color:city ? C.ink : C.muted }}>
          <span style={{ display:'flex', alignItems:'center', gap:6 }}>
            <MapPin size={13} color={C.mint} />
            {city || 'All Morocco'}
          </span>
          <ChevronDown size={13} color={C.muted} style={{ transform: cityOpen ? 'rotate(180deg)' : 'none', transition:'transform 0.2s' }} />
        </button>
        {cityOpen && (
          <div style={{ position:'absolute', top:'calc(100% + 6px)', left:0, right:0, backgroundColor:'white', borderRadius:16, boxShadow:'0 20px 60px rgba(0,0,0,0.15)', border:'1px solid rgba(186,202,197,0.2)', zIndex:300, overflow:'hidden', minWidth:220 }}>
            <div style={{ padding:8, borderBottom:'1px solid rgba(186,202,197,0.15)' }}>
              <input autoFocus value={citySearch} onChange={e => setCitySearch(e.target.value)}
                placeholder="Search city..."
                style={{ width:'100%', padding:'8px 12px', borderRadius:10, border:'1px solid rgba(186,202,197,0.3)', outline:'none', fontSize:13 }} />
            </div>
            <div style={{ maxHeight:280, overflowY:'auto' }}>
              <button onClick={() => { onCityChange(''); onNeighbourhoodChange(''); setCityOpen(false); setCitySearch('') }}
                style={{ width:'100%', padding:'10px 16px', background:'none', border:'none', cursor:'pointer', textAlign:'left', fontSize:13, fontWeight:600, color:!city ? C.mint : C.ink, borderBottom:'1px solid rgba(186,202,197,0.1)' }}>
                All Morocco
              </button>
              {filteredCities.map(c => (
                <button key={c.city} onClick={() => { onCityChange(c.city); onNeighbourhoodChange(''); setCityOpen(false); setCitySearch('') }}
                  style={{ width:'100%', padding:'9px 16px', background:'none', border:'none', cursor:'pointer', textAlign:'left', fontSize:13, color:c.city === city ? C.mint : C.ink, fontWeight: c.city === city ? 700 : 500, display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                  <span>{c.city}</span>
                  <span style={{ fontSize:11, color:C.muted }}>{c.province}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Neighbourhood — only when city selected */}
      {city && selectedCityData && selectedCityData.neighborhoods.length > 0 && (
        <div ref={neighRef} style={{ position:'relative', flex:1 }}>
          <button onClick={() => { setNeighOpen(!neighOpen); setCityOpen(false) }}
            style={{ width:'100%', display:'flex', alignItems:'center', justifyContent:'space-between', gap:6, padding:'10px 14px', borderRadius:12, border:`1px solid ${neighOpen ? C.mint : 'rgba(186,202,197,0.4)'}`, backgroundColor:'white', cursor:'pointer', fontSize:13, fontWeight:600, color:neighbourhood ? C.ink : C.muted }}>
            <span>{neighbourhood || 'All neighbourhoods'}</span>
            <ChevronDown size={13} color={C.muted} style={{ transform: neighOpen ? 'rotate(180deg)' : 'none', transition:'transform 0.2s' }} />
          </button>
          {neighOpen && (
            <div style={{ position:'absolute', top:'calc(100% + 6px)', left:0, right:0, backgroundColor:'white', borderRadius:16, boxShadow:'0 20px 60px rgba(0,0,0,0.15)', border:'1px solid rgba(186,202,197,0.2)', zIndex:300, overflow:'hidden', minWidth:200 }}>
              <div style={{ maxHeight:280, overflowY:'auto' }}>
                <button onClick={() => { onNeighbourhoodChange(''); setNeighOpen(false) }}
                  style={{ width:'100%', padding:'10px 16px', background:'none', border:'none', cursor:'pointer', textAlign:'left', fontSize:13, fontWeight:600, color:!neighbourhood ? C.mint : C.ink, borderBottom:'1px solid rgba(186,202,197,0.1)' }}>
                  All neighbourhoods
                </button>
                {selectedCityData.neighborhoods.map(n => (
                  <button key={n} onClick={() => { onNeighbourhoodChange(n); setNeighOpen(false) }}
                    style={{ width:'100%', padding:'9px 16px', background:'none', border:'none', cursor:'pointer', textAlign:'left', fontSize:13, color:n === neighbourhood ? C.mint : C.ink, fontWeight: n === neighbourhood ? 700 : 500 }}>
                    {n}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
