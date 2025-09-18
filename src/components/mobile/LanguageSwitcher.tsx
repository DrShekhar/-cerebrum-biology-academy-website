'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Globe, Check } from 'lucide-react'
import { useTranslations, type Language } from '@/lib/i18n/translations'

interface LanguageSwitcherProps {
  variant?: 'mobile' | 'desktop' | 'floating'
  position?: 'top-right' | 'bottom-right' | 'center'
  showFlag?: boolean
  compact?: boolean
}

const languageInfo = {
  en: {
    name: 'English',
    nativeName: 'English',
    flag: '🇺🇸',
    code: 'EN',
  },
  hi: {
    name: 'Hindi',
    nativeName: 'हिंदी',
    flag: '🇮🇳',
    code: 'हि',
  },
  ta: {
    name: 'Tamil',
    nativeName: 'தமிழ்',
    flag: '🇮🇳',
    code: 'த',
  },
  bn: {
    name: 'Bengali',
    nativeName: 'বাংলা',
    flag: '🇮🇳',
    code: 'ব',
  },
}

export function LanguageSwitcher({
  variant = 'mobile',
  position = 'top-right',
  showFlag = true,
  compact = false,
}: LanguageSwitcherProps) {
  const { language, changeLanguage, availableLanguages } = useTranslations()
  const [isOpen, setIsOpen] = useState(false)

  const currentLang = languageInfo[language]

  const handleLanguageChange = (newLanguage: Language) => {
    changeLanguage(newLanguage)
    setIsOpen(false)

    // Analytics tracking
    if (typeof window !== 'undefined' && 'gtag' in window) {
      ;(window as any).gtag('event', 'language_change', {
        new_language: newLanguage,
        previous_language: language,
      })
    }
  }

  if (variant === 'floating') {
    return (
      <FloatingLanguageSwitcher
        language={language}
        currentLang={currentLang}
        availableLanguages={availableLanguages}
        onLanguageChange={handleLanguageChange}
        position={position}
      />
    )
  }

  if (variant === 'desktop') {
    return (
      <DesktopLanguageSwitcher
        language={language}
        currentLang={currentLang}
        availableLanguages={availableLanguages}
        onLanguageChange={handleLanguageChange}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        showFlag={showFlag}
        compact={compact}
      />
    )
  }

  // Mobile variant (default)
  return (
    <div className="relative">
      <motion.button
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-4 py-3 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow mobile-touch-target"
        aria-label="Select Language"
      >
        {showFlag && (
          <span className="text-lg" role="img" aria-label={currentLang.name}>
            {currentLang.flag}
          </span>
        )}
        <span className="font-medium text-gray-900">
          {compact ? currentLang.code : currentLang.nativeName}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop for mobile */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
              onClick={() => setIsOpen(false)}
            />

            {/* Language options */}
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              className={`
                absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-50
                md:left-auto md:right-0 md:w-48
              `}
            >
              <div className="py-2">
                {availableLanguages.map((lang) => {
                  const langInfo = languageInfo[lang as Language]
                  const isSelected = lang === language

                  return (
                    <motion.button
                      key={lang}
                      whileHover={{ backgroundColor: '#f3f4f6' }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleLanguageChange(lang as Language)}
                      className={`
                        w-full flex items-center justify-between px-4 py-3 text-left hover:bg-gray-50 transition-colors
                        ${isSelected ? 'bg-blue-50' : ''}
                      `}
                    >
                      <div className="flex items-center space-x-3">
                        {showFlag && (
                          <span className="text-lg" role="img" aria-label={langInfo.name}>
                            {langInfo.flag}
                          </span>
                        )}
                        <div>
                          <div
                            className={`font-medium ${isSelected ? 'text-blue-900' : 'text-gray-900'}`}
                          >
                            {langInfo.nativeName}
                          </div>
                          <div className="text-sm text-gray-500">{langInfo.name}</div>
                        </div>
                      </div>
                      {isSelected && <Check className="w-4 h-4 text-blue-600" />}
                    </motion.button>
                  )
                })}
              </div>

              {/* Language help text */}
              <div className="border-t border-gray-100 px-4 py-3">
                <p className="text-xs text-gray-500 text-center">
                  {language === 'hi' && 'भाषा बदलने के लिए टैप करें'}
                  {language === 'ta' && 'மொழியை மாற்ற தட்டவும்'}
                  {language === 'bn' && 'ভাষা পরিবর্তন করতে ট্যাপ করুন'}
                  {language === 'en' && 'Tap to change language'}
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

function FloatingLanguageSwitcher({
  language,
  currentLang,
  availableLanguages,
  onLanguageChange,
  position,
}: any) {
  const [isOpen, setIsOpen] = useState(false)

  const positionClasses = {
    'top-right': 'top-4 right-4',
    'bottom-right': 'bottom-4 right-4',
    center: 'top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2',
  }

  return (
    <div className={`fixed ${positionClasses[position]} z-50`}>
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="relative">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(!isOpen)}
          className="w-12 h-12 bg-white border border-gray-200 rounded-full shadow-lg flex items-center justify-center hover:shadow-xl transition-shadow"
        >
          <Globe className="w-5 h-5 text-gray-600" />
        </motion.button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 10 }}
              className="absolute bottom-14 right-0 bg-white border border-gray-200 rounded-xl shadow-xl p-2 min-w-[160px]"
            >
              {availableLanguages.map((lang: Language) => {
                const langInfo = languageInfo[lang]
                const isSelected = lang === language

                return (
                  <motion.button
                    key={lang}
                    whileHover={{ backgroundColor: '#f3f4f6' }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      onLanguageChange(lang)
                      setIsOpen(false)
                    }}
                    className={`
                      w-full flex items-center space-x-2 px-3 py-2 rounded-lg text-left transition-colors
                      ${isSelected ? 'bg-blue-50 text-blue-900' : 'hover:bg-gray-50'}
                    `}
                  >
                    <span className="text-sm">{langInfo.flag}</span>
                    <span className="text-sm font-medium">{langInfo.code}</span>
                  </motion.button>
                )
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}

function DesktopLanguageSwitcher({
  language,
  currentLang,
  availableLanguages,
  onLanguageChange,
  isOpen,
  setIsOpen,
  showFlag,
  compact,
}: any) {
  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 text-sm bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
      >
        {showFlag && <span className="text-sm">{currentLang.flag}</span>}
        <span className="font-medium">{compact ? currentLang.code : currentLang.nativeName}</span>
        <ChevronDown
          className={`w-3 h-3 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="absolute top-full right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-50 min-w-[140px]"
          >
            {availableLanguages.map((lang: Language) => {
              const langInfo = languageInfo[lang]
              const isSelected = lang === language

              return (
                <button
                  key={lang}
                  onClick={() => {
                    onLanguageChange(lang)
                    setIsOpen(false)
                  }}
                  className={`
                    w-full flex items-center space-x-2 px-3 py-2 text-sm text-left hover:bg-gray-50 transition-colors
                    ${isSelected ? 'bg-blue-50 text-blue-900' : ''}
                  `}
                >
                  {showFlag && <span>{langInfo.flag}</span>}
                  <span>{compact ? langInfo.code : langInfo.nativeName}</span>
                  {isSelected && <Check className="w-3 h-3 ml-auto" />}
                </button>
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// Quick language toggle for mobile bottom navigation
export function QuickLanguageToggle() {
  const { language, changeLanguage } = useTranslations()

  const toggleLanguage = () => {
    const languages: Language[] = ['en', 'hi']
    const currentIndex = languages.indexOf(language)
    const nextIndex = (currentIndex + 1) % languages.length
    changeLanguage(languages[nextIndex])
  }

  const currentLang = languageInfo[language]

  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      onClick={toggleLanguage}
      className="flex items-center space-x-1 px-2 py-1 bg-gray-100 rounded-full text-xs font-medium"
      title="Toggle Language"
    >
      <span>{currentLang.flag}</span>
      <span>{currentLang.code}</span>
    </motion.button>
  )
}
