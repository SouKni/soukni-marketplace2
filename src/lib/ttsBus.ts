// Tiny pub-sub so multiple SpeakButton instances (one per chat message) can
// agree on which one is "currently speaking" — window.speechSynthesis only
// ever plays one utterance, but each button owns its own React state, so
// without this a button clicked earlier can get stuck showing "speaking"
// after a different button takes over.
type Listener = (activeId: string | null) => void

let currentId: string | null = null
const listeners = new Set<Listener>()

function notify() {
  listeners.forEach(l => l(currentId))
}

export function speak(id: string, text: string, lang: string) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return
  window.speechSynthesis.cancel()
  currentId = id
  notify()
  const utter = new SpeechSynthesisUtterance(text)
  utter.lang = lang
  const clear = () => { if (currentId === id) { currentId = null; notify() } }
  utter.onend = clear
  utter.onerror = clear
  window.speechSynthesis.speak(utter)
}

export function stopSpeaking() {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) window.speechSynthesis.cancel()
  currentId = null
  notify()
}

export function subscribeTts(cb: Listener): () => void {
  listeners.add(cb)
  return () => listeners.delete(cb)
}

export function isSpeechSynthesisSupported(): boolean {
  return typeof window !== 'undefined' && 'speechSynthesis' in window
}
