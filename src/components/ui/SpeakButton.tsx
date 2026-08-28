'use client'

import { useEffect, useRef, useState } from 'react'
import { Volume2, VolumeX } from 'lucide-react'
import { speak, stopSpeaking, subscribeTts, isSpeechSynthesisSupported } from '@/lib/ttsBus'
import { speechLangFor } from '@/lib/speechLangs'

export default function SpeakButton({ id, text, locale, size = 12, color }: {
  id: string; text: string; locale: string; size?: number; color?: string
}) {
  const [supported, setSupported] = useState(false)
  const [speaking, setSpeaking]   = useState(false)
  const speakingRef = useRef(false)
  speakingRef.current = speaking

  useEffect(() => {
    setSupported(isSpeechSynthesisSupported())
    return subscribeTts(activeId => setSpeaking(activeId === id))
  }, [id])

  // Stop our own audio if the component unmounts mid-utterance (e.g. the
  // conversation list re-renders while a message is being read aloud).
  useEffect(() => () => { if (speakingRef.current) stopSpeaking() }, [])

  if (!supported || !text.trim()) return null

  const toggle = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (speaking) stopSpeaking()
    else speak(id, text, speechLangFor(locale))
  }

  return (
    <button onClick={toggle} title={speaking ? 'Stop reading' : 'Read aloud'}
      style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', opacity: speaking ? 1 : 0.5 }}>
      {speaking ? <VolumeX size={size} color={color || 'currentColor'} /> : <Volume2 size={size} color={color || 'currentColor'} />}
    </button>
  )
}
