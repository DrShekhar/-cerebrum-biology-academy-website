/**
 * Internationalization Configuration for Cerebrum Biology Academy
 *
 * Supported Languages:
 * - English (en) - Default
 * - Hindi (hi) - Primary regional language
 *
 * Future expansion: Tamil (ta), Bengali (bn), Marathi (mr), Telugu (te)
 */

export const i18nConfig = {
  defaultLocale: 'en',
  locales: ['en', 'hi'] as const,
  localeNames: {
    en: 'English',
    hi: 'हिंदी',
  } as const,
  localeFlags: {
    en: '🇬🇧',
    hi: '🇮🇳',
  } as const,
}

export type Locale = (typeof i18nConfig.locales)[number]

export function isValidLocale(locale: string): locale is Locale {
  return i18nConfig.locales.includes(locale as Locale)
}

// SEO-friendly locale codes for hreflang
export const hreflangMap: Record<Locale, string> = {
  en: 'en-IN',
  hi: 'hi-IN',
}
