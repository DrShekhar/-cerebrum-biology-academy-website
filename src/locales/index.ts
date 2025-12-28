/**
 * Locale Index - Centralized exports for all language translations
 */

import { en } from './en'
import { hi } from './hi'
import { ta } from './ta'
import { bn } from './bn'
import { te } from './te'
import { ml } from './ml'
import { kn } from './kn'
import { mr } from './mr'
import { es } from './es'
import { de } from './de'
import { ja } from './ja'
import { fr } from './fr'
import { pt } from './pt'
import { ru } from './ru'
import { it } from './it'
import { nl } from './nl'
import { pl } from './pl'

export const translations = {
  en,
  hi,
  ta,
  bn,
  te,
  ml,
  kn,
  mr,
  es,
  de,
  ja,
  fr,
  pt,
  ru,
  it,
  nl,
  pl,
}

export type TranslationKey = keyof typeof en
