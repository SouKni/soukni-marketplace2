'use client'

import { useEffect, useRef, useState } from 'react'
import { Mic, Square } from 'lucide-react'
import { speechLangFor } from '@/lib/speechLangs'

function getRecognitionCtor(): (new () => SpeechRecognition) | null {
  if (typeof window === 'undefined') return null
  return window.SpeechRecognition || window.webkitSpeechRecognition || null
}

export default function VoiceInput({ locale, onResult, label = 'Describe it out loud' }: {
  locale: string
  onResult: (transcript: string) => void
  label?: string
}) {
  const [supported, setSupported] = useState(false)
  const [listening, setListening] = useState(false)
  const [interim, setInterim]     = useState('')
  const [error, setError]         = useState<string | null>(null)
  const recognitionRef = useRef<SpeechRecognition | null>(null)

  useEffect(() => {
    setSupported(!!getRecognitionCtor())
    return () => { recognitionRef.current?.stop() }
  }, [])

  if (!supported) return null

  const start = () => {
    const Ctor = getRecognitionCtor()
    if (!Ctor) return
    setError(null)
    setInterim('')
    const recognition = new Ctor()
    recognition.lang = speechLangFor(locale)
    recognition.interimResults = true
    recognition.continuous = false
    recognition.maxAlternatives = 1

    recognition.onresult = (e: SpeechRecognitionEvent) => {
      let finalTranscript = ''
      let interimTranscript = ''
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const transcript = e.results[i][0].transcript
        if (e.results[i].isFinal) finalTranscript += transcript
        else interimTranscript += transcript
      }
      if (finalTranscript) {
        onResult(finalTranscript.trim())
      } else {
        setInterim(interimTranscript)
      }
    }
    recognition.onerror = (e: SpeechRecognitionErrorEvent) => {
      setListening(false)
      if (e.error === 'no-speech') setError("Didn't catch that — try again.")
      else if (e.error === 'not-allowed' || e.error === 'service-not-allowed') setError('Microphone access was denied.')
      else setError('Voice input failed. Please try again.')
    }
    recognition.onend = () => setListening(false)

    recognitionRef.current = recognition
    recognition.start()
    setListening(true)
  }

  const stop = () => recognitionRef.current?.stop()

  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      <button onClick={listening ? stop : start}
        style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 16px', borderRadius: '100px', border: `1.5px solid ${listening ? '#dc2626' : '#22d4a8'}`, background: listening ? '#fef2f2' : '#f0fdf9', color: listening ? '#dc2626' : '#0f9b8e', fontSize: '13px', fontWeight: 900, cursor: 'pointer' }}>
        {listening
          ? <><Square size={14} fill="#dc2626" /> Stop Listening</>
          : <><Mic size={14} /> {label}</>}
      </button>
      {listening && (
        <p style={{ fontSize: '12px', color: '#6b7a76', fontWeight: 600, marginTop: '8px', fontStyle: 'italic', minHeight: '18px' }}>
          {interim || 'Listening...'}
        </p>
      )}
      {error && (
        <p style={{ fontSize: '12px', color: '#b91c1c', fontWeight: 700, marginTop: '8px' }}>{error}</p>
      )}
    </div>
  )
}
