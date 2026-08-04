'use client'
import React, { useState, useRef, useEffect } from 'react'
import { Search, MapPin, ChevronDown, SlidersHorizontal, X } from 'lucide-react'
import { MOROCCO_LOCATIONS } from '@/lib/moroccoLocations'

const C = { mint:'#22d4a8', mintDk:'#0f9b8e', ink:'#161d1b', surface:'#f4fbf8', muted:'#6b7a76' }
const UB = { fontFamily:"'Inter',sans-serif", fontWeight:900, letterSpacing:'-0.05em' } as const

const ALL_CITIES = MOROCCO_LOCATIONS.flatMap(r =>
  r.provinces.flatMap(p => p.cities.map(c => ({
    city: c.name, province: p.name, neighborhoods: c.neighborhoods
  })))
)

const PRICE_RANGES = [
  { label:'Any Price', min:undefined, max:undefined },
  { label:'Under 500 MAD', min:undefined, max:500 },
  { label:'500 – 2,000 MAD', min:500, max:2000 },
  { label:'2,000 – 5,000 MAD', min:2000, max:5000 },
  { label:'5,000 – 15,000 MAD', min:5000, max:15000 },
  { label:'15,000 – 50,000 MAD', min:15000, max:50000 },
  { label:'50,000+ MAD', min:50000, max:undefined },
]

const SORT_OPTIONS = [
  { label:'Most Recent', value:'newest' },
  { label:'Price: Low → High', value:'price_asc' },
  { label:'Price: High → Low', value:'price_desc' },
]

interface Props {
  city: string
  keyword: string
  minPrice?: number
  maxPrice?: number
  sortBy: string
  onCity: (v:string) => void
  onKeyword: (v:string) => void
  onMinPrice: (v:number|undefined) => void
  onMaxPrice: (v:number|undefined) => void
  onSort: (v:any) => void
  onSearch: () => void
}

export default function FilterBar({ city, keyword, minPrice, maxPrice, sortBy, onCity, onKeyword, onMinPrice, onMaxPrice, onSort, onSearch }: Props) {
  const [cityOpen, setCityOpen] = useState(false)
  const [priceOpen, setPriceOpen] = useState(false)
  const [sortOpen, setSortOpen] = useState(false)
  const [citySearch, setCitySearch] = useState('')
  const cityRef = useRef<HTMLDivElement>(null)
  const priceRef = useRef<HTMLDivElement>(null)
  const sortRef = useRef<HTMLDivElement>(null)

  const selectedCity = ALL_CITIES.find(c => c.city === city)
  const filteredCities = citySearch
    ? ALL_CITIES.filter(c => c.city.toLowerCase().includes(citySearch.toLowerCase()) || c.province.toLowerCase().includes(citySearch.toLowerCase()))
    : ALL_CITIES

  const selectedPriceLabel = PRICE_RANGES.find(r => r.min === minPrice && r.max === maxPrice)?.label || 'Any Price'
  const selectedSortLabel = SORT_OPTIONS.find(s => s.value === sortBy)?.label || 'Most Recent'

  const hasFilters = city || keyword || minPrice !== undefined || maxPrice !== undefined

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (cityRef.current && !cityRef.current.contains(e.target as Node)) { setCityOpen(false); setCitySearch('') }
      if (priceRef.current && !priceRef.current.contains(e.target as Node)) setPriceOpen(false)
      if (sortRef.current && !sortRef.current.contains(e.target as Node)) setSortOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  function clearAll() {
    onCity(''); onKeyword(''); onMinPrice(undefined); onMaxPrice(undefined); onSort('newest')
  }

  return (
    <div style={{ backgroundColor:'rgba(255,255,255,0.95)', backdropFilter:'blur(20px)', borderRadius:100, padding:'6px 6px 6px 4px', boxShadow:'0 8px 40px rgba(0,0,0,0.10)', border:'1px solid rgba(255,255,255,0.7)', display:'flex', alignItems:'stretch', gap:0, minHeight:72 }}>

      {/* CITY PILL */}
      <div ref={cityRef} style={{ position:'relative', flex:'0 0 200px' }}>
        <button
          onClick={() => { setCityOpen(!cityOpen); setPriceOpen(false); setSortOpen(false) }}
          style={{ width:'100%', height:'100%', display:'flex', flexDirection:'column', justifyContent:'center', padding:'0 22px', background:'none', border:'none', borderRight:'1px solid rgba(186,202,197,0.25)', cursor:'pointer', textAlign:'left' }}>
          <span style={{ fontSize:9, fontWeight:800, color:C.muted, textTransform:'uppercase', letterSpacing:'0.12em', marginBottom:3 }}>City</span>
          <div style={{ display:'flex', alignItems:'center', gap:6 }}>
            <MapPin size={13} color={C.mint} />
            <span style={{ fontSize:14, fontWeight:700, color: city ? C.ink : C.muted }}>{city || 'All Morocco'}</span>
            <ChevronDown size={12} color={C.muted} style={{ marginLeft:'auto', transform: cityOpen ? 'rotate(180deg)' : 'none', transition:'transform 0.2s' }} />
          </div>
        </button>
        {cityOpen && (
          <div style={{ position:'absolute', top:'calc(100% + 12px)', left:0, width:280, backgroundColor:'white', borderRadius:20, boxShadow:'0 24px 64px rgba(0,0,0,0.14)', border:'1px solid rgba(186,202,197,0.15)', zIndex:400, overflow:'hidden' }}>
            <div style={{ padding:12, borderBottom:'1px solid rgba(186,202,197,0.12)' }}>
              <div style={{ display:'flex', alignItems:'center', gap:8, backgroundColor:'#f4fbf8', borderRadius:12, padding:'8px 12px' }}>
                <Search size={13} color={C.muted} />
                <input autoFocus value={citySearch} onChange={e=>setCitySearch(e.target.value)}
                  placeholder="Search cities..."
                  style={{ flex:1, background:'none', border:'none', outline:'none', fontSize:13, fontWeight:600, color:C.ink, fontFamily:"'Inter',sans-serif" }} />
                {citySearch && <button onClick={()=>setCitySearch('')} style={{ background:'none', border:'none', cursor:'pointer', padding:0 }}><X size={12} color={C.muted} /></button>}
              </div>
            </div>
            <div style={{ maxHeight:300, overflowY:'auto' }}>
              <button onClick={()=>{onCity('');setCityOpen(false);setCitySearch('')}}
                style={{ width:'100%', padding:'12px 16px', background:'none', border:'none', cursor:'pointer', textAlign:'left', fontSize:13, fontWeight:700, color:!city?C.mint:C.ink, display:'flex', alignItems:'center', gap:8, borderBottom:'1px solid rgba(186,202,197,0.08)' }}>
                <MapPin size={13} color={C.mint} /> All Morocco
              </button>
              {filteredCities.map(c => (
                <button key={c.city} onClick={()=>{onCity(c.city);setCityOpen(false);setCitySearch('')}}
                  style={{ width:'100%', padding:'10px 16px', background: c.city===city ? '#f4fbf8' : 'none', border:'none', cursor:'pointer', textAlign:'left', fontSize:13, color:c.city===city?C.mint:C.ink, fontWeight:c.city===city?700:500, display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                  <span>{c.city}</span>
                  <span style={{ fontSize:11, color:C.muted }}>{c.province}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* KEYWORD */}
      <div style={{ flex:1, display:'flex', flexDirection:'column', justifyContent:'center', padding:'0 22px', borderRight:'1px solid rgba(186,202,197,0.25)' }}>
        <span style={{ fontSize:9, fontWeight:800, color:C.muted, textTransform:'uppercase', letterSpacing:'0.12em', marginBottom:3 }}>Keyword</span>
        <div style={{ display:'flex', alignItems:'center', gap:8 }}>
          <input value={keyword} onChange={e=>onKeyword(e.target.value)}
            onKeyDown={e=>e.key==='Enter'&&onSearch()}
            placeholder="iPhone, laptop, TV..."
            style={{ flex:1, background:'none', border:'none', outline:'none', fontSize:14, fontWeight:600, color:C.ink, fontFamily:"'Inter',sans-serif", padding:0 }} />
          {keyword && <button onClick={()=>onKeyword('')} style={{ background:'none', border:'none', cursor:'pointer', padding:0, flexShrink:0 }}><X size={13} color={C.muted} /></button>}
        </div>
      </div>

      {/* PRICE RANGE PILL */}
      <div ref={priceRef} style={{ position:'relative', flex:'0 0 180px' }}>
        <button
          onClick={() => { setPriceOpen(!priceOpen); setCityOpen(false); setSortOpen(false) }}
          style={{ width:'100%', height:'100%', display:'flex', flexDirection:'column', justifyContent:'center', padding:'0 22px', background:'none', border:'none', borderRight:'1px solid rgba(186,202,197,0.25)', cursor:'pointer', textAlign:'left' }}>
          <span style={{ fontSize:9, fontWeight:800, color:C.muted, textTransform:'uppercase', letterSpacing:'0.12em', marginBottom:3 }}>Price</span>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
            <span style={{ fontSize:13, fontWeight:700, color:(minPrice||maxPrice)?C.ink:C.muted }}>{selectedPriceLabel}</span>
            <ChevronDown size={12} color={C.muted} style={{ transform: priceOpen ? 'rotate(180deg)' : 'none', transition:'transform 0.2s' }} />
          </div>
        </button>
        {priceOpen && (
          <div style={{ position:'absolute', top:'calc(100% + 12px)', left:0, width:220, backgroundColor:'white', borderRadius:20, boxShadow:'0 24px 64px rgba(0,0,0,0.14)', border:'1px solid rgba(186,202,197,0.15)', zIndex:400, overflow:'hidden', padding:'6px 0' }}>
            {PRICE_RANGES.map(r => (
              <button key={r.label} onClick={()=>{onMinPrice(r.min);onMaxPrice(r.max);setPriceOpen(false)}}
                style={{ width:'100%', padding:'11px 18px', background: selectedPriceLabel===r.label ? '#f4fbf8' : 'none', border:'none', cursor:'pointer', textAlign:'left', fontSize:13, color:selectedPriceLabel===r.label?C.mint:C.ink, fontWeight:selectedPriceLabel===r.label?700:500 }}>
                {r.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* SORT PILL */}
      <div ref={sortRef} style={{ position:'relative', flex:'0 0 180px' }}>
        <button
          onClick={() => { setSortOpen(!sortOpen); setCityOpen(false); setPriceOpen(false) }}
          style={{ width:'100%', height:'100%', display:'flex', flexDirection:'column', justifyContent:'center', padding:'0 22px', background:'none', border:'none', cursor:'pointer', textAlign:'left' }}>
          <span style={{ fontSize:9, fontWeight:800, color:C.muted, textTransform:'uppercase', letterSpacing:'0.12em', marginBottom:3 }}>Sort By</span>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
            <span style={{ fontSize:13, fontWeight:700, color:C.ink }}>{selectedSortLabel}</span>
            <ChevronDown size={12} color={C.muted} style={{ transform: sortOpen ? 'rotate(180deg)' : 'none', transition:'transform 0.2s' }} />
          </div>
        </button>
        {sortOpen && (
          <div style={{ position:'absolute', top:'calc(100% + 12px)', right:0, width:200, backgroundColor:'white', borderRadius:20, boxShadow:'0 24px 64px rgba(0,0,0,0.14)', border:'1px solid rgba(186,202,197,0.15)', zIndex:400, overflow:'hidden', padding:'6px 0' }}>
            {SORT_OPTIONS.map(s => (
              <button key={s.value} onClick={()=>{onSort(s.value);setSortOpen(false)}}
                style={{ width:'100%', padding:'11px 18px', background: sortBy===s.value ? '#f4fbf8' : 'none', border:'none', cursor:'pointer', textAlign:'left', fontSize:13, color:sortBy===s.value?C.mint:C.ink, fontWeight:sortBy===s.value?700:500 }}>
                {s.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ACTION BUTTONS */}
      <div style={{ display:'flex', alignItems:'center', gap:8, paddingLeft:8, flexShrink:0 }}>
        {hasFilters && (
          <button onClick={clearAll}
            style={{ width:40, height:40, borderRadius:'50%', border:'1px solid rgba(186,202,197,0.3)', backgroundColor:'white', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', transition:'all 0.15s' }}
            title="Clear filters">
            <X size={15} color={C.muted} />
          </button>
        )}
        <button onClick={onSearch}
          style={{ ...UB, backgroundColor:C.mint, color:'white', border:'none', padding:'0 28px', borderRadius:100, cursor:'pointer', fontSize:13, flexShrink:0, display:'flex', alignItems:'center', gap:8, height:52, transition:'background 0.15s' }}
          onMouseEnter={e=>e.currentTarget.style.backgroundColor=C.mintDk}
          onMouseLeave={e=>e.currentTarget.style.backgroundColor=C.mint}>
          <Search size={15} /> SEARCH
        </button>
      </div>

    </div>
  )
}
