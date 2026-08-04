'use client'

import { useState, useRef, useEffect } from 'react'
import { RotateCw, Maximize2, Layers, Home, Ruler, Info } from 'lucide-react'

const MINT = '#22d4a8'
const INK  = '#161d1b'
const MUTED = '#6b7a76'
const SURFACE = '#f4fbf8'
const FONT = "'Inter', system-ui, sans-serif"

type Room = { name: string; x: number; y: number; w: number; h: number; area: string; color: string }

const DEFAULT_ROOMS: Room[] = [
  { name: 'Living Room', x: 10,  y: 10,  w: 45, h: 40, area: '28m²', color: '#22d4a8' },
  { name: 'Kitchen',     x: 58,  y: 10,  w: 32, h: 40, area: '14m²', color: '#0891b2' },
  { name: 'Bedroom 1',   x: 10,  y: 53,  w: 38, h: 37, area: '18m²', color: '#7c3aed' },
  { name: 'Bedroom 2',   x: 52,  y: 53,  w: 30, h: 37, area: '15m²', color: '#f59e0b' },
  { name: 'Bathroom',    x: 85,  y: 53,  w: 15, h: 37, area: '6m²',  color: '#ec4899' },
]

export default function FloorPlan3D({ rooms = DEFAULT_ROOMS, totalArea = '120m²' }: { rooms?: Room[]; totalArea?: string }) {
  const [rotation, setRotation]     = useState(0)
  const [tilt, setTilt]             = useState(35)
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null)
  const [mode, setMode]             = useState<'2d' | '3d'>('3d')
  const [dragging, setDragging]     = useState(false)
  const lastX = useRef(0)

  const handlePointerDown = (e: React.PointerEvent) => {
    setDragging(true)
    lastX.current = e.clientX
  }
  const handlePointerMove = (e: React.PointerEvent) => {
    if (!dragging) return
    const delta = e.clientX - lastX.current
    setRotation(r => r + delta * 0.5)
    lastX.current = e.clientX
  }
  const handlePointerUp = () => setDragging(false)

  return (
    <div style={{ fontFamily: FONT, background: 'white', borderRadius: '20px', border: '1px solid #e2eae6', overflow: 'hidden' }}>

      {/* Header */}
      <div style={{ padding: '16px 20px', borderBottom: '1px solid #e2eae6', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '32px', height: '32px', borderRadius: '10px', background: `linear-gradient(135deg, ${MINT}, #0f9b8e)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Home size={16} color="white" />
          </div>
          <div>
            <p style={{ fontSize: '14px', fontWeight: 900, color: INK }}>3D Floor Plan</p>
            <p style={{ fontSize: '11px', color: MUTED, fontWeight: 700 }}>Total area: {totalArea} · Drag to rotate</p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '4px', background: SURFACE, padding: '3px', borderRadius: '10px' }}>
          {(['2d', '3d'] as const).map(m => (
            <button key={m} onClick={() => setMode(m)}
              style={{ padding: '6px 14px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontSize: '12px', fontWeight: 900, fontFamily: FONT, background: mode === m ? 'white' : 'transparent', color: mode === m ? INK : MUTED, boxShadow: mode === m ? '0 1px 4px rgba(0,0,0,0.1)' : 'none', textTransform: 'uppercase' }}>
              {m}
            </button>
          ))}
        </div>
      </div>

      {/* 3D View */}
      <div
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        style={{ height: '360px', background: 'linear-gradient(180deg, #f4fbf8, #e8f5f0)', position: 'relative', cursor: dragging ? 'grabbing' : 'grab', overflow: 'hidden', perspective: '1000px', touchAction: 'none' }}
      >
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          width: '320px', height: '260px',
          transform: `translate(-50%, -50%) rotateX(${mode === '3d' ? tilt : 0}deg) rotateZ(${mode === '3d' ? rotation : 0}deg)`,
          transformStyle: 'preserve-3d',
          transition: dragging ? 'none' : 'transform 0.3s ease',
        }}>
          {/* Base floor */}
          <div style={{ position: 'absolute', inset: 0, background: '#f5f0e8', border: '2px solid #d4c8b0', borderRadius: '4px', boxShadow: '0 20px 60px rgba(0,0,0,0.15)' }} />

          {/* Rooms */}
          {rooms.map((room, i) => (
            <div key={room.name}
              onClick={() => setSelectedRoom(room)}
              style={{
                position: 'absolute',
                left: `${room.x}%`, top: `${room.y}%`,
                width: `${room.w}%`, height: `${room.h}%`,
                background: `${room.color}25`,
                border: `2px solid ${selectedRoom?.name === room.name ? room.color : room.color + '80'}`,
                borderRadius: '3px',
                cursor: 'pointer',
                transform: mode === '3d' ? `translateZ(${8 + i}px)` : 'none',
                transition: 'all 0.2s',
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              }}>
              {mode === '3d' && (
                <div style={{ position: 'absolute', inset: 0, background: room.color, opacity: 0.15, transform: 'translateZ(-8px)' }} />
              )}
              <p style={{ fontSize: '9px', fontWeight: 900, color: INK, textAlign: 'center', padding: '2px', lineHeight: 1.2 }}>{room.name}</p>
              <p style={{ fontSize: '8px', color: MUTED, fontWeight: 700 }}>{room.area}</p>
            </div>
          ))}
        </div>

        {/* Controls hint */}
        <div style={{ position: 'absolute', bottom: '12px', left: '50%', transform: 'translateX(-50%)', padding: '6px 14px', background: 'rgba(255,255,255,0.9)', borderRadius: '100px', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <RotateCw size={12} color={MUTED} />
          <span style={{ fontSize: '11px', color: MUTED, fontWeight: 700 }}>Drag to rotate {mode === '3d' ? '· ' : ''}</span>
          {mode === '3d' && (
            <input type="range" min="0" max="60" value={tilt} onChange={e => setTilt(Number(e.target.value))}
              style={{ width: '60px', accentColor: MINT }} onClick={e => e.stopPropagation()} />
          )}
        </div>
      </div>

      {/* Room list */}
      <div style={{ padding: '14px 20px', borderTop: '1px solid #f4fbf8' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
          {rooms.map(room => (
            <button key={room.name} onClick={() => setSelectedRoom(room)}
              style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 10px', borderRadius: '10px', border: `1.5px solid ${selectedRoom?.name === room.name ? room.color : '#e2eae6'}`, background: selectedRoom?.name === room.name ? `${room.color}10` : 'white', cursor: 'pointer', fontFamily: FONT, textAlign: 'left' }}>
              <div style={{ width: '10px', height: '10px', borderRadius: '3px', background: room.color, flexShrink: 0 }} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: '11px', fontWeight: 900, color: INK, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{room.name}</p>
                <p style={{ fontSize: '10px', color: MUTED, fontWeight: 700 }}>{room.area}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
