'use client'

import { useState, useRef } from 'react'
import { Video, X, Play, Upload, Film } from 'lucide-react'

const MINT = '#22d4a8'
const INK  = '#161d1b'
const MUTED = '#6b7a76'
const SURFACE = '#f4fbf8'
const FONT = "'Inter', system-ui, sans-serif"

export default function VideoUpload({ onVideoAdded }: { onVideoAdded?: (url: string) => void }) {
  const [video, setVideo]     = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  const handleFile = (file: File) => {
    if (!file.type.startsWith('video/')) return
    if (file.size > 100 * 1024 * 1024) { alert('Video must be under 100MB'); return }

    setUploading(true)
    const reader = new FileReader()
    reader.onload = e => {
      const url = e.target?.result as string
      setVideo(url)
      onVideoAdded?.(url)
      setUploading(false)
    }
    reader.readAsDataURL(file)
  }

  return (
    <div style={{ fontFamily: FONT }}>
      {!video ? (
        <div onClick={() => fileRef.current?.click()}
          style={{ border: `2px dashed ${MINT}`, borderRadius: '16px', padding: '28px 20px', textAlign: 'center', cursor: 'pointer', background: '#f0fdf9', transition: 'background 0.2s' }}
          onMouseEnter={e => e.currentTarget.style.background = '#e6f9f3'}
          onMouseLeave={e => e.currentTarget.style.background = '#f0fdf9'}
        >
          {uploading ? (
            <>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', border: `3px solid rgba(34,212,168,0.3)`, borderTopColor: MINT, margin: '0 auto 12px', animation: 'spin 0.8s linear infinite' }} />
              <p style={{ fontSize: '13px', fontWeight: 900, color: INK }}>Uploading video...</p>
            </>
          ) : (
            <>
              <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: `linear-gradient(135deg, ${MINT}, #0f9b8e)`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
                <Video size={24} color="white" />
              </div>
              <p style={{ fontSize: '14px', fontWeight: 900, color: INK, marginBottom: '4px' }}>Add a Video Walkaround</p>
              <p style={{ fontSize: '12px', color: MUTED, fontWeight: 700 }}>Listings with video get 5× more engagement · Max 60s, 100MB</p>
            </>
          )}
        </div>
      ) : (
        <div style={{ position: 'relative', borderRadius: '16px', overflow: 'hidden' }}>
          <video src={video} controls style={{ width: '100%', maxHeight: '300px', display: 'block', background: '#000' }} />
          <button onClick={() => setVideo(null)}
            style={{ position: 'absolute', top: '10px', right: '10px', width: '30px', height: '30px', borderRadius: '50%', background: 'rgba(0,0,0,0.6)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <X size={14} color="white" />
          </button>
          <div style={{ position: 'absolute', bottom: '10px', left: '10px', padding: '4px 10px', borderRadius: '100px', background: MINT, color: 'white', fontSize: '11px', fontWeight: 900, display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Film size={11} /> Video attached
          </div>
        </div>
      )}
      <input ref={fileRef} type="file" accept="video/*" style={{ display: 'none' }} onChange={e => e.target.files?.[0] && handleFile(e.target.files[0])} />
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  )
}
