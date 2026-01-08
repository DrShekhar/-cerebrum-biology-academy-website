'use client'

import { useState, useRef, useEffect } from 'react'
import { Globe, Check, ChevronDown } from 'lucide-react'
import { useI18n, Language, languageNames } from '@/contexts/I18nContext'

interface LanguageOption {
  code: Language
  name: string
  nativeName: string
  flag: string
}

const languages: LanguageOption[] = [
  // International Languages
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
  { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語', flag: '🇯🇵' },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português', flag: '🇧🇷' },
  { code: 'ru', name: 'Russian', nativeName: 'Русский', flag: '🇷🇺' },
  { code: 'it', name: 'Italian', nativeName: 'Italiano', flag: '🇮🇹' },
  { code: 'nl', name: 'Dutch', nativeName: 'Nederlands', flag: '🇳🇱' },
  { code: 'pl', name: 'Polish', nativeName: 'Polski', flag: '🇵🇱' },
  // Indian Languages
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', flag: '🇮🇳' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', flag: '🇮🇳' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', flag: '🇮🇳' },
  { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം', flag: '🇮🇳' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ', flag: '🇮🇳' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी', flag: '🇮🇳' },
]

interface LanguageSwitcherProps {
  variant?: 'default' | 'compact' | 'footer'
  onLanguageChange?: (language: Language) => void
}

export function LanguageSwitcher({ variant = 'default', onLanguageChange }: LanguageSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false)
  const { language: currentLanguage, setLanguage } = useI18n()
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLanguageSelect = (language: Language) => {
    setLanguage(language)
    setIsOpen(false)
    onLanguageChange?.(language)
  }

  const currentLang = languages.find((l) => l.code === currentLanguage) || languages[0]

  if (variant === 'compact') {
    return (
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-1 px-3 py-2 min-h-[40px] text-sm text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100 transition-colors"
          aria-label="Change language"
        >
          <Globe className="w-4 h-4" />
          <span className="hidden sm:inline">{currentLang.code.toUpperCase()}</span>
        </button>

        {isOpen && (
          <div className="absolute right-0 top-full mt-1 w-40 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageSelect(lang.code)}
                className={`w-full px-3 py-2 text-left text-sm flex items-center justify-between hover:bg-gray-50 ${
                  currentLanguage === lang.code ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                }`}
              >
                <span className="flex items-center gap-2">
                  <span>{lang.flag}</span>
                  <span>{lang.nativeName}</span>
                </span>
                {currentLanguage === lang.code && <Check className="w-4 h-4" />}
              </button>
            ))}
          </div>
        )}
      </div>
    )
  }

  if (variant === 'footer') {
    return (
      <div className="flex flex-wrap gap-2">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => handleLanguageSelect(lang.code)}
            className={`px-4 py-2 min-h-[40px] text-sm rounded-full transition-colors ${
              currentLanguage === lang.code
                ? 'bg-white text-blue-600'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            {lang.nativeName}
          </button>
        ))}
      </div>
    )
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2.5 min-h-[40px] bg-white border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
        aria-label="Change language"
        aria-expanded={isOpen}
      >
        <Globe className="w-5 h-5 text-gray-500" />
        <span className="text-sm font-medium text-gray-700">{currentLang.nativeName}</span>
        <ChevronDown
          className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-50">
          <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Select Language
          </div>
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageSelect(lang.code)}
              className={`w-full px-3 py-2.5 text-left flex items-center justify-between hover:bg-gray-50 transition-colors ${
                currentLanguage === lang.code ? 'bg-blue-50' : ''
              }`}
            >
              <span className="flex items-center gap-3">
                <span className="text-lg">{lang.flag}</span>
                <span className="flex flex-col">
                  <span
                    className={`text-sm font-medium ${currentLanguage === lang.code ? 'text-blue-600' : 'text-gray-900'}`}
                  >
                    {lang.nativeName}
                  </span>
                  <span className="text-xs text-gray-500">{lang.name}</span>
                </span>
              </span>
              {currentLanguage === lang.code && <Check className="w-5 h-5 text-blue-600" />}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
