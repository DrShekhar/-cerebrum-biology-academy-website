/**
 * Dictionary Index
 * Exports all language dictionaries and provides a unified getter
 */

import { Locale } from '../config'
import { en } from './en'
import { hi } from './hi'
import { ta } from './ta'

export const dictionaries: Record<string, typeof en> = {
  en,
  hi: hi as unknown as typeof en,
  ta: ta as unknown as typeof en,
}

export type Dictionary = typeof en

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] || dictionaries.en
}

// Re-export individual dictionaries
export { en } from './en'
export { hi } from './hi'
export { ta } from './ta'
