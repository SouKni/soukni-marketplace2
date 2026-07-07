'use client'
import { useState, useRef, useEffect } from 'react'
import { MapPin, ChevronDown } from 'lucide-react'
import { cities, quartiersByCity } from '@/data/locations'

interface CityPickerProps {
  onSelect?: (city: string, quartier?: string) => void
  placeholder?: string
  light?: boolean
}

export default function CityPicker({ onSelect, placeholder = 'All Morocco', light = false }: CityPickerProps) {
  const [open, setOpen] = useState(false)
  const [selectedCity, setSelectedCity] = useState('')
  const [selectedQuartier, setSelectedQuartier] = useState('')
  const [search, setSearch] = useState('')
  const ref = useRef<HTMLDivElement>(null)

  const quartiers = selectedCity ? (quartiersByCity[selectedCity] || []) : []
  const filtered = cities.filter(c => c.toLowerCase().includes(search.toLowerCase()))
  const label = selectedQuartier ? `${selectedCity}, ${selectedQuartier}` : selectedCity || placeholder

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  function pickCity(city: string) {
    setSelectedCity(city)
    setSelectedQuartier('')
    setSearch('')
    if (!quartiersByCity[city]) {
      onSelect?.(city)
      setOpen(false)
    }
  }

  function pickQuartier(q: string) {
    setSelectedQuartier(q)
    onSelect?.(selectedCity, q)
    setOpen(false)
  }

  const textColor = light ? 'rgba(255,255,255,0.9)' : '#161d1b'
  const mutedColor = light ? 'rgba(255,255,255,0.6)' : '#6b7a76'
  const borderColor = light ? 'rgba(255,255,255,0.2)' : '#f1f5f9'

  return (
    <div ref={ref} style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }} onClick={() => setOpen(!open)}>
      <MapPin size={14} color={mutedColor} />
      <span style={{ fontSize: '14px', fontWeight: 600, color: textColor, whiteSpace: 'nowrap' }}>{label}</span>
      <ChevronDown size={13} color={mutedColor} style={{ transition: 'transform 0.2s', transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }} />

      {open && (
        <div onClick={e => e.stopPropagation()}
          style={{ position: 'absolute', top: 'calc(100% + 10px)', left: 0, backgroundColor: 'white', borderRadius: '20px', border: '1px solid #f1f5f9', boxShadow: '0 20px 48px rgba(0,0,0,0.14)', zIndex: 999, minWidth: '260px', overflow: 'hidden' }}>

          {!selectedCity || !quartiers.length ? (
            <>
              <div style={{ padding: '12px 14px', borderBottom: '1px solid #f8fafc' }}>
                <input autoFocus value={search} onChange={e => setSearch(e.target.value)}
                  placeholder="Search city..." onClick={e => e.stopPropagation()}
                  style={{ width: '100%', border: 'none', outline: 'none', fontSize: '13px', fontFamily: 'Inter, sans-serif', color: '#161d1b', backgroundColor: '#f4fbf8', padding: '8px 12px', borderRadius: '100px' }} />
              </div>
              <div style={{ maxHeight: '240px', overflowY: 'auto' }}>
                <div onClick={() => { setSelectedCity(''); setSelectedQuartier(''); onSelect?.(''); setOpen(false) }}
                  style={{ padding: '10px 16px', fontSize: '13px', fontWeight: 600, color: '#22d4a8', cursor: 'pointer', borderBottom: '1px solid #f8fafc' }}>
                  All Morocco
                </div>
                {filtered.map(city => (
                  <div key={city} onClick={() => pickCity(city)}
                    style={{ padding: '9px 16px', fontSize: '13px', color: city === selectedCity ? '#22d4a8' : '#161d1b', fontWeight: city === selectedCity ? 700 : 400, cursor: 'pointer', backgroundColor: city === selectedCity ? '#f0fdfa' : 'transparent', transition: 'background 0.1s' }}
                    onMouseEnter={e => { if (city !== selectedCity) e.currentTarget.style.backgroundColor = '#f8fffe' }}
                    onMouseLeave={e => { if (city !== selectedCity) e.currentTarget.style.backgroundColor = 'transparent' }}>
                    {city}
                  </div>
                ))}
              </div>
            </>
          ) : (
            <>
              <div style={{ padding: '10px 16px', borderBottom: '1px solid #f8fafc', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <button onClick={() => setSelectedCity('')}
                  style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#22d4a8', fontSize: '13px', fontWeight: 700, padding: 0, fontFamily: 'Inter, sans-serif' }}>
                  ← {selectedCity}
                </button>
                <span style={{ fontSize: '13px', color: '#6b7a76' }}>· pick a neighbourhood</span>
              </div>
              <div style={{ maxHeight: '260px', overflowY: 'auto' }}>
                <div onClick={() => { onSelect?.(selectedCity); setOpen(false) }}
                  style={{ padding: '9px 16px', fontSize: '13px', fontWeight: 600, color: '#22d4a8', cursor: 'pointer', borderBottom: '1px solid #f8fafc' }}>
                  All {selectedCity}
                </div>
                {quartiers.map(q => (
                  <div key={q} onClick={() => pickQuartier(q)}
                    style={{ padding: '9px 16px', fontSize: '13px', color: '#161d1b', cursor: 'pointer', transition: 'background 0.1s' }}
                    onMouseEnter={e => e.currentTarget.style.backgroundColor = '#f8fffe'}
                    onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}>
                    {q}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )
}
