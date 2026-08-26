'use client'
import en from '@/dictionaries/en.json'
import fr from '@/dictionaries/fr.json'
import ar from '@/dictionaries/ar.json'
import es from '@/dictionaries/es.json'
import de from '@/dictionaries/de.json'
import ber from '@/dictionaries/ber.json'
import type { Locale } from './types'

const dictionaries: Record<Locale, any> = { en, fr, ar, es, de, ber }

export function useDictionary(locale: string) {
  return dictionaries[locale as Locale] ?? dictionaries.en
}
