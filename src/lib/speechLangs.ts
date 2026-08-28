// Maps our site locales to BCP-47 language tags for the Web Speech APIs
// (SpeechSynthesis and SpeechRecognition). Browsers rarely ship a dedicated
// Darija (Moroccan Arabic) voice/recognizer — ar-MA is the closest honest
// tag; the browser falls back to its default Arabic voice when it's absent
// rather than failing.
export const LOCALE_TO_SPEECH_LANG: Record<string, string> = {
  en: 'en-US',
  fr: 'fr-FR',
  ar: 'ar-MA',
  ber: 'ar-MA',
  es: 'es-ES',
  de: 'de-DE',
}

export function speechLangFor(locale: string): string {
  return LOCALE_TO_SPEECH_LANG[locale] || 'en-US'
}
