'use client'

import { useState, useRef, useEffect } from 'react'
import { Search, ChevronDown, SlidersHorizontal } from 'lucide-react'

/* ─── DATA ─────────────────────────────────────────────── */
const CITIES: Record<string, string[]> = {
  'Rabat':       ['Agdal','Souissi','Hay Riad','Hassan','Médina','Océan','Aviation','Akkari','Youssoufia','Centre Ville'],
  'Casablanca':  ['Maarif','Gauthier','Anfa','Ain Diab','Bourgogne','Racine','Palmier','Hay Hassani','Sidi Belyout'],
  'Marrakech':   ['Guéliz','Hivernage','Médina','Palmeraie','Targa','M\'hamid','Massira'],
  'Fès':         ['Médina','Ville Nouvelle','Agdal','Saiss','Narjiss'],
  'Tanger':      ['Centre','Malabata','Marchane','Médina','Achakar'],
  'Agadir':      ['Centre','Hay Mohammadi','Tilila','Anza','Founty'],
  'Meknès':      ['Hamria','Médina','Ville Nouvelle','Ismaïlia'],
  'Oujda':       ['Centre','Hay Al Qods','Lazaret','Médina'],
  'Kénitra':     ['Centre','Saknia','Bir Rami'],
  'Tétouan':     ['Centre','Médina','Martil','M\'diq'],
}

const PRICE_RANGES = [
  { label:'Any Price',        min:0,      max:Infinity },
  { label:'0 – 5,000 MAD',   min:0,      max:5000     },
  { label:'5,000 – 15,000',  min:5000,   max:15000    },
  { label:'15,000 – 30,000', min:15000,  max:30000    },
  { label:'30,000 – 50,000', min:30000,  max:50000    },
  { label:'50,000 – 100,000',min:50000,  max:100000   },
  { label:'100,000+',        min:100000, max:Infinity  },
]

const C = { mint:'#22d4a8', ink:'#161d1b', muted:'#6b7a76', surface:'#f4fbf8' }

/* ─── DROPDOWN ─────────────────────────────────────────── */
function Dropdown({ label, value, options, onChange }: {
  label: string; value: string; options: string[]; onChange: (v: string) => void
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <div ref={ref} style={{ position:'relative', flex:1 }}>
      <button onClick={()=>setOpen(!open)}
        style={{ width:'100%', background:'none', border:'none', cursor:'pointer', padding:'8px 20px', textAlign:'left' as const, display:'flex', flexDirection:'column' as const }}>
        <span style={{ fontSize:'9px', fontWeight:700, textTransform:'uppercase' as const, letterSpacing:'0.12em', color:C.muted, marginBottom:'3px', fontFamily:'Inter,sans-serif' }}>{label}</span>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', gap:'8px' }}>
          <span style={{ fontSize:'14px', fontWeight:700, color:C.ink, fontFamily:'Inter,sans-serif', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' as const }}>{value}</span>
          <ChevronDown size={14} color={C.mint} style={{ flexShrink:0, transition:'transform 0.2s', transform:open?'rotate(180deg)':'rotate(0deg)' }} />
        </div>
      </button>

      {open && (
        <div style={{ position:'absolute', top:'calc(100% + 8px)', left:0, minWidth:'220px', backgroundColor:'white', borderRadius:'20px', boxShadow:'0 20px 60px rgba(0,0,0,0.12)', border:'1px solid rgba(107,122,118,0.12)', zIndex:100, overflow:'hidden', padding:'8px 0' }}>
          {options.map(opt=>(
            <button key={opt} onClick={()=>{ onChange(opt); setOpen(false) }}
              style={{ width:'100%', padding:'12px 20px', background:'none', border:'none', cursor:'pointer', textAlign:'left' as const, fontSize:'14px', fontWeight: value===opt ? 700 : 500, color: value===opt ? C.mint : C.ink, fontFamily:'Inter,sans-serif', transition:'background 0.15s', display:'flex', alignItems:'center', justifyContent:'space-between' }}
              onMouseEnter={e=>e.currentTarget.style.backgroundColor=C.surface}
              onMouseLeave={e=>e.currentTarget.style.backgroundColor='transparent'}
            >
              {opt}
              {value===opt && <span style={{ color:C.mint, fontSize:'16px' }}>✓</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

/* ─── FILTERS PANEL ────────────────────────────────────── */
function FiltersPanel({ open, onClose, filters, setFilters }: any) {
  if (!open) return null
  return (
    <>
      <div onClick={onClose} style={{ position:'fixed', inset:0, backgroundColor:'rgba(0,0,0,0.32)', zIndex:200, backdropFilter:'blur(4px)' }} />
      <div style={{ position:'fixed', top:0, right:0, bottom:0, width:'420px', backgroundColor:'white', zIndex:201, boxShadow:'-20px 0 60px rgba(0,0,0,0.12)', display:'flex', flexDirection:'column' as const, overflow:'hidden' }}>
        <div style={{ padding:'28px 32px', borderBottom:'1px solid rgba(107,122,118,0.12)', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <h3 style={{ fontSize:'20px', fontWeight:900, color:C.ink, fontFamily:'Inter,sans-serif', letterSpacing:'-0.05em' }}>FILTERS</h3>
          <button onClick={onClose} style={{ background:'none', border:'none', cursor:'pointer', fontSize:'24px', color:C.muted, lineHeight:1 }}>✕</button>
        </div>
        <div style={{ flex:1, overflowY:'auto' as const, padding:'28px 32px' }}>

          {/* Condition */}
          <div style={{ marginBottom:'32px' }}>
            <p style={{ fontSize:'11px', fontWeight:700, textTransform:'uppercase' as const, letterSpacing:'0.12em', color:C.muted, marginBottom:'14px', fontFamily:'Inter,sans-serif' }}>Condition</p>
            <div style={{ display:'flex', gap:'10px', flexWrap:'wrap' as const }}>
              {['Any','New','Like New','Good','Fair'].map(c=>(
                <button key={c} onClick={()=>setFilters((f:any)=>({...f,condition:c}))}
                  style={{ padding:'10px 20px', borderRadius:'100px', fontSize:'13px', fontWeight:700, cursor:'pointer', fontFamily:'Inter,sans-serif', border:'2px solid', transition:'all 0.2s',
                    backgroundColor: filters.condition===c ? C.mint : 'transparent',
                    color:           filters.condition===c ? C.ink  : C.muted,
                    borderColor:     filters.condition===c ? C.mint : 'rgba(107,122,118,0.2)',
                  }}
                >{c}</button>
              ))}
            </div>
          </div>

          {/* Seller Type */}
          <div style={{ marginBottom:'32px' }}>
            <p style={{ fontSize:'11px', fontWeight:700, textTransform:'uppercase' as const, letterSpacing:'0.12em', color:C.muted, marginBottom:'14px', fontFamily:'Inter,sans-serif' }}>Seller Type</p>
            <div style={{ display:'flex', gap:'10px', flexWrap:'wrap' as const }}>
              {['Any','Private','Pro Seller','Diamond Member'].map(s=>(
                <button key={s} onClick={()=>setFilters((f:any)=>({...f,sellerType:s}))}
                  style={{ padding:'10px 20px', borderRadius:'100px', fontSize:'13px', fontWeight:700, cursor:'pointer', fontFamily:'Inter,sans-serif', border:'2px solid', transition:'all 0.2s',
                    backgroundColor: filters.sellerType===s ? C.mint : 'transparent',
                    color:           filters.sellerType===s ? C.ink  : C.muted,
                    borderColor:     filters.sellerType===s ? C.mint : 'rgba(107,122,118,0.2)',
                  }}
                >{s}</button>
              ))}
            </div>
          </div>

          {/* Sort By */}
          <div style={{ marginBottom:'32px' }}>
            <p style={{ fontSize:'11px', fontWeight:700, textTransform:'uppercase' as const, letterSpacing:'0.12em', color:C.muted, marginBottom:'14px', fontFamily:'Inter,sans-serif' }}>Sort By</p>
            <div style={{ display:'flex', flexDirection:'column' as const, gap:'8px' }}>
              {['Most Recent','Price: Low to High','Price: High to Low','Most Popular'].map(s=>(
                <button key={s} onClick={()=>setFilters((f:any)=>({...f,sortBy:s}))}
                  style={{ padding:'14px 20px', borderRadius:'14px', fontSize:'14px', fontWeight:700, cursor:'pointer', fontFamily:'Inter,sans-serif', border:'2px solid', transition:'all 0.2s', textAlign:'left' as const, display:'flex', alignItems:'center', justifyContent:'space-between',
                    backgroundColor: filters.sortBy===s ? `${C.mint}18` : 'transparent',
                    color:           filters.sortBy===s ? C.mint : C.ink,
                    borderColor:     filters.sortBy===s ? C.mint : 'rgba(107,122,118,0.12)',
                  }}
                >
                  {s}
                  {filters.sortBy===s && <span style={{ color:C.mint }}>✓</span>}
                </button>
              ))}
            </div>
          </div>

          {/* With Photos */}
          <div style={{ marginBottom:'32px', display:'flex', alignItems:'center', justifyContent:'space-between', padding:'18px 20px', backgroundColor:C.surface, borderRadius:'16px' }}>
            <div>
              <p style={{ fontSize:'14px', fontWeight:700, color:C.ink, fontFamily:'Inter,sans-serif', marginBottom:'3px' }}>With Photos Only</p>
              <p style={{ fontSize:'12px', color:C.muted, fontFamily:'Inter,sans-serif' }}>Show only listings with images</p>
            </div>
            <div onClick={()=>setFilters((f:any)=>({...f,withPhotos:!f.withPhotos}))}
              style={{ width:'48px', height:'24px', borderRadius:'100px', backgroundColor:filters.withPhotos?C.mint:'rgba(107,122,118,0.25)', position:'relative', transition:'background 0.25s', cursor:'pointer', flexShrink:0 }}>
              <div style={{ position:'absolute', top:'3px', left:filters.withPhotos?'27px':'3px', width:'18px', height:'18px', borderRadius:'50%', backgroundColor:'white', transition:'left 0.25s', boxShadow:'0 1px 4px rgba(0,0,0,0.15)' }} />
            </div>
          </div>
        </div>

        {/* Apply */}
        <div style={{ padding:'24px 32px', borderTop:'1px solid rgba(107,122,118,0.12)', display:'flex', gap:'12px' }}>
          <button onClick={()=>setFilters({ condition:'Any', sellerType:'Any', sortBy:'Most Recent', withPhotos:false })}
            style={{ flex:1, padding:'16px', borderRadius:'14px', border:'2px solid rgba(107,122,118,0.2)', backgroundColor:'transparent', fontSize:'14px', fontWeight:700, cursor:'pointer', color:C.muted, fontFamily:'Inter,sans-serif' }}>
            Reset
          </button>
          <button onClick={onClose}
            style={{ flex:2, padding:'16px', borderRadius:'14px', border:'none', backgroundColor:C.mint, fontSize:'14px', fontWeight:700, cursor:'pointer', color:C.ink, fontFamily:'Inter,sans-serif', boxShadow:`0 4px 16px ${C.mint}40` }}>
            Apply Filters
          </button>
        </div>
      </div>
    </>
  )
}

/* ─── MAIN COMPONENT ───────────────────────────────────── */
export interface FilterState {
  city:        string
  keyword:     string
  neighborhood:string
  priceRange:  string
  condition:   string
  sellerType:  string
  sortBy:      string
  withPhotos:  boolean
}

export const DEFAULT_FILTERS: FilterState = {
  city:         'Rabat',
  keyword:      '',
  neighborhood: 'All Neighborhoods',
  priceRange:   'Any Price',
  condition:    'Any',
  sellerType:   'Any',
  sortBy:       'Most Recent',
  withPhotos:   false,
}

interface Props {
  filters: FilterState
  setFilters: (f: FilterState | ((prev: FilterState) => FilterState)) => void
  floating?: boolean
}

export default function FashionFilterBar({ filters, setFilters, floating = true }: Props) {
  const [panelOpen, setPanelOpen] = useState(false)
  const neighborhoods = ['All Neighborhoods', ...(CITIES[filters.city] || CITIES['Rabat'])]
  const activeCount = [
    filters.condition !== 'Any',
    filters.sellerType !== 'Any',
    filters.sortBy !== 'Most Recent',
    filters.withPhotos,
  ].filter(Boolean).length

  const bar = (
    <div style={{ backgroundColor:'rgba(255,255,255,0.92)', backdropFilter:'blur(16px)', border:'1px solid rgba(107,122,118,0.12)', borderRadius:'100px', boxShadow: floating ? '0 20px 40px rgba(0,0,0,0.08)' : '0 2px 8px rgba(0,0,0,0.04)', display:'flex', alignItems:'stretch', overflow:'visible', height:'72px' }}>

      {/* CITY */}
      <Dropdown
        label="CITY"
        value={filters.city}
        options={Object.keys(CITIES)}
        onChange={city => setFilters(f => ({ ...f, city, neighborhood:'All Neighborhoods' }))}
      />
      <div style={{ width:'1px', backgroundColor:'rgba(107,122,118,0.12)', margin:'12px 0' }} />

      {/* KEYWORD */}
      <div style={{ flex:1.5, padding:'8px 20px', display:'flex', flexDirection:'column' as const, justifyContent:'center' }}>
        <span style={{ fontSize:'9px', fontWeight:700, textTransform:'uppercase' as const, letterSpacing:'0.12em', color:C.muted, marginBottom:'3px', fontFamily:'Inter,sans-serif' }}>KEYWORD</span>
        <div style={{ display:'flex', alignItems:'center', gap:'8px' }}>
          <Search size={14} color={C.muted} style={{ flexShrink:0 }} />
          <input
            type="text"
            value={filters.keyword}
            onChange={e => setFilters(f => ({ ...f, keyword: e.target.value }))}
            placeholder="e.g. Kaftan, Djellaba..."
            style={{ flex:1, background:'none', border:'none', outline:'none', fontSize:'14px', fontWeight:600, color:C.ink, fontFamily:'Inter,sans-serif' }}
          />
          {filters.keyword && (
            <button onClick={() => setFilters(f => ({ ...f, keyword:'' }))}
              style={{ background:'none', border:'none', cursor:'pointer', color:C.muted, fontSize:'16px', lineHeight:1, padding:'0 4px' }}>✕</button>
          )}
        </div>
      </div>
      <div style={{ width:'1px', backgroundColor:'rgba(107,122,118,0.12)', margin:'12px 0' }} />

      {/* NEIGHBORHOOD */}
      <Dropdown
        label="NEIGHBORHOOD"
        value={filters.neighborhood}
        options={neighborhoods}
        onChange={neighborhood => setFilters(f => ({ ...f, neighborhood }))}
      />
      <div style={{ width:'1px', backgroundColor:'rgba(107,122,118,0.12)', margin:'12px 0' }} />

      {/* PRICE */}
      <Dropdown
        label="PRICE (MAD)"
        value={filters.priceRange}
        options={PRICE_RANGES.map(r => r.label)}
        onChange={priceRange => setFilters(f => ({ ...f, priceRange }))}
      />
      <div style={{ width:'1px', backgroundColor:'rgba(107,122,118,0.12)', margin:'12px 0' }} />

      {/* FILTERS BUTTON */}
      <button onClick={() => setPanelOpen(true)}
        style={{ display:'flex', alignItems:'center', gap:'10px', padding:'0 28px', background:'none', border:'none', cursor:'pointer', borderRadius:'0 100px 100px 0', transition:'background 0.15s', position:'relative' as const, flexShrink:0 }}
        onMouseEnter={e => e.currentTarget.style.backgroundColor = `${C.mint}14`}
        onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
      >
        <SlidersHorizontal size={18} color={C.mint} />
        <span style={{ fontSize:'14px', fontWeight:700, color:C.ink, fontFamily:'Inter,sans-serif' }}>Filters</span>
        {activeCount > 0 && (
          <span style={{ position:'absolute', top:'12px', right:'16px', width:'18px', height:'18px', borderRadius:'50%', backgroundColor:C.mint, color:C.ink, fontSize:'10px', fontWeight:900, display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'Inter,sans-serif' }}>
            {activeCount}
          </span>
        )}
      </button>
    </div>
  )

  return (
    <>
      {bar}
      <FiltersPanel
        open={panelOpen}
        onClose={() => setPanelOpen(false)}
        filters={filters}
        setFilters={setFilters}
      />
    </>
  )
}
