/**
 * Dictionary Index
 * Exports all language dictionaries and provides a unified getter
 */

import { Locale } from '../config'
import { en } from './en'
import { hi } from './hi'

export const dictionaries = {
  en,
  hi,
} as const

export type Dictionary = typeof en

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] || dictionaries.en
}

// Re-export individual dictionaries
export { en } from './en'
export { hi } from './hi'
