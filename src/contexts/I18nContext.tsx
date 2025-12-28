'use client'

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from 'react'
import { translations, TranslationKey } from '@/locales'

export type Language =
  | 'en'
  | 'hi'
  | 'ta'
  | 'bn'
  | 'te'
  | 'ml'
  | 'kn'
  | 'mr'
  | 'es'
  | 'de'
  | 'ja'
  | 'fr'
  | 'pt'
  | 'ru'
  | 'it'
  | 'nl'
  | 'pl'

export const languageNames: Record<Language, string> = {
  en: 'English',
  hi: 'हिन्दी',
  ta: 'தமிழ்',
  bn: 'বাংলা',
  te: 'తెలుగు',
  ml: 'മലയാളം',
  kn: 'ಕನ್ನಡ',
  mr: 'मराठी',
  es: 'Español',
  de: 'Deutsch',
  ja: '日本語',
  fr: 'Français',
  pt: 'Português',
  ru: 'Русский',
  it: 'Italiano',
  nl: 'Nederlands',
  pl: 'Polski',
}

export type { TranslationKey }

interface I18nContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: TranslationKey, params?: Record<string, string | number>) => string
  availableLanguages: Language[]
}

const I18nContext = createContext<I18nContextType | undefined>(undefined)

function detectLanguage(): Language {
  if (typeof window === 'undefined') return 'en'

  const savedLang = localStorage.getItem('preferred-language') as Language
  if (savedLang && savedLang in translations) {
    return savedLang
  }

  const browserLang = navigator.language.toLowerCase()
  if (browserLang.includes('hi')) return 'hi'
  if (browserLang.includes('ta')) return 'ta'
  if (browserLang.includes('bn')) return 'bn'

  return 'en'
}

const availableLanguages: Language[] = [
  'en',
  'es',
  'de',
  'ja',
  'fr',
  'pt',
  'ru',
  'it',
  'nl',
  'pl',
  'hi',
  'ta',
  'bn',
  'te',
  'ml',
  'kn',
  'mr',
]

export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en')
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    const detected = detectLanguage()
    setLanguageState(detected)
    setIsHydrated(true)
  }, [])

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang)
    if (typeof window !== 'undefined') {
      localStorage.setItem('preferred-language', lang)
      document.documentElement.lang = lang
    }
  }, [])

  const t = useCallback(
    (key: TranslationKey, params?: Record<string, string | number>): string => {
      let text = translations[language]?.[key] || translations.en[key] || key
      if (params) {
        Object.entries(params).forEach(([paramKey, value]) => {
          text = text.replace(`{${paramKey}}`, String(value))
        })
      }
      return text
    },
    [language]
  )

  const value: I18nContextType = {
    language,
    setLanguage,
    t,
    availableLanguages,
  }

  if (!isHydrated) {
    return <>{children}</>
  }

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const context = useContext(I18nContext)
  if (context === undefined) {
    return {
      language: 'en' as Language,
      setLanguage: () => {},
      t: (key: TranslationKey) => translations.en[key] || key,
      availableLanguages,
    }
  }
  return context
}
