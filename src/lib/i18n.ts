import type { Locale } from './types'

const dictionaries: Record<Locale, () => Promise<any>> = {
  en:  () => import('@/dictionaries/en.json').then((m) => m.default),
  fr:  () => import('@/dictionaries/fr.json').then((m) => m.default),
  ar:  () => import('@/dictionaries/ar.json').then((m) => m.default),
  es:  () => import('@/dictionaries/es.json').then((m) => m.default),
  de:  () => import('@/dictionaries/de.json').then((m) => m.default),
  ber: () => import('@/dictionaries/ber.json').then((m) => m.default),
}

export const getDictionary = async (locale: Locale) =>
  dictionaries[locale]?.() ?? dictionaries.en()
