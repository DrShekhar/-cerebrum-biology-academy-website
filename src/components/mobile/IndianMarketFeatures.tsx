'use client'

import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/Button'
import {
  Globe,
  MessageCircle,
  Download,
  Wifi,
  WifiOff,
  Smartphone,
  Languages,
  IndianRupee,
  Phone,
  Star,
  MapPin,
  Clock,
  BookOpen,
} from 'lucide-react'
import { getPhoneLink } from '@/lib/constants/contactInfo'

interface IndianMarketFeaturesProps {
  onLanguageChange?: (language: string) => void
  currentLanguage?: string
  className?: string
}

interface NetworkInfo {
  effectiveType: string
  downlink: number
  rtt: number
  saveData: boolean
}

interface LanguageOption {
  code: string
  name: string
  nativeName: string
  flag: string
}

const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', flag: '🇧🇩' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', flag: '🇮🇳' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', flag: '🇮🇳' },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી', flag: '🇮🇳' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी', flag: '🇮🇳' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ', flag: '🇮🇳' },
]

export function IndianMarketFeatures({
  onLanguageChange,
  currentLanguage = 'en',
  className = '',
}: IndianMarketFeaturesProps) {
  const [isOnline, setIsOnline] = useState(true)
  const [networkInfo, setNetworkInfo] = useState<NetworkInfo | null>(null)
  const [showLanguageSelector, setShowLanguageSelector] = useState(false)
  const [showDataSaver, setShowDataSaver] = useState(false)
  const [dataSaverMode, setDataSaverMode] = useState(false)
  const [showWhatsAppShare, setShowWhatsAppShare] = useState(false)

  // Network monitoring
  useEffect(() => {
    const updateOnlineStatus = () => setIsOnline(navigator.onLine)
    const updateNetworkInfo = () => {
      if ('connection' in navigator) {
        const connection = (navigator as any).connection
        setNetworkInfo({
          effectiveType: connection.effectiveType,
          downlink: connection.downlink,
          rtt: connection.rtt,
          saveData: connection.saveData,
        })

        // Auto-enable data saver for slow networks
        if (connection.effectiveType === '2g' || connection.effectiveType === 'slow-2g') {
          setDataSaverMode(true)
          setShowDataSaver(true)
        }
      }
    }

    window.addEventListener('online', updateOnlineStatus)
    window.addEventListener('offline', updateOnlineStatus)
    window.addEventListener('change', updateNetworkInfo)

    updateOnlineStatus()
    updateNetworkInfo()

    return () => {
      window.removeEventListener('online', updateOnlineStatus)
      window.removeEventListener('offline', updateOnlineStatus)
      window.removeEventListener('change', updateNetworkInfo)
    }
  }, [])

  // Data saver mode detection
  useEffect(() => {
    if (networkInfo?.saveData) {
      setDataSaverMode(true)
    }
  }, [networkInfo])

  const handleLanguageSelect = (language: LanguageOption) => {
    localStorage.setItem('preferred_language', language.code)
    onLanguageChange?.(language.code)
    setShowLanguageSelector(false)

    // Show confirmation in selected language
    const messages = {
      en: 'Language changed to English',
      hi: 'भाषा बदलकर हिन्दी की गई',
      bn: 'ভাষা বাংলায় পরিবর্তিত হয়েছে',
      ta: 'மொழி தமிழுக்கு மாற்றப்பட்டது',
      te: 'భాష తెలుగుకు మార్చబడింది',
      gu: 'ભાષા ગુજરાતીમાં બદલાઈ',
      mr: 'भाषा मराठीत बदलली',
      kn: 'ಭಾಷೆ ಕನ್ನಡಕ್ಕೆ ಬದಲಾಗಿದೆ',
    }

    if ('vibrate' in navigator) {
      navigator.vibrate(50)
    }
  }

  const shareToWhatsApp = (type: 'test-result' | 'course' | 'app') => {
    const messages = {
      'test-result': {
        en: 'Just scored amazing marks in NEET Biology test on Cerebrum Biology Academy! 🎉📚 Join me: https://cerebrumbiologyacademy.com',
        hi: 'मैंने Cerebrum Biology Academy पर NEET Biology टेस्ट में बेहतरीन अंक प्राप्त किए! 🎉📚 मेरे साथ जुड़ें: https://cerebrumbiologyacademy.com',
      },
      course: {
        en: 'Found the best NEET Biology coaching online! 🧬✨ Check out Cerebrum Biology Academy: https://cerebrumbiologyacademy.com',
        hi: 'सबसे अच्छी NEET Biology कोचिंग मिली! 🧬✨ Cerebrum Biology Academy देखें: https://cerebrumbiologyacademy.com',
      },
      app: {
        en: 'Using Cerebrum Biology Academy app for NEET preparation! Amazing content by AIIMS faculty 👨‍⚕️📱 Download: https://cerebrumbiologyacademy.com',
        hi: 'NEET की तैयारी के लिए Cerebrum Biology Academy ऐप का उपयोग कर रहा हूं! AIIMS फैकल्टी द्वारा बेहतरीन कंटेंट 👨‍⚕️📱 डाउनलोड करें: https://cerebrumbiologyacademy.com',
      },
    }

    const message = messages[type][currentLanguage as 'en' | 'hi'] || messages[type].en
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
  }

  const getNetworkStatusColor = () => {
    if (!isOnline) return 'text-red-500'
    if (!networkInfo) return 'text-gray-500'

    switch (networkInfo.effectiveType) {
      case '4g':
        return 'text-green-600'
      case '3g':
        return 'text-yellow-500'
      case '2g':
      case 'slow-2g':
        return 'text-orange-500'
      default:
        return 'text-gray-500'
    }
  }

  const getNetworkStatusText = () => {
    if (!isOnline) return currentLanguage === 'hi' ? 'ऑफलाइन' : 'Offline'
    if (!networkInfo) return currentLanguage === 'hi' ? 'अज्ञात' : 'Unknown'

    const labels = {
      en: { '4g': '4G', '3g': '3G', '2g': '2G', 'slow-2g': 'Slow 2G' },
      hi: { '4g': '4G', '3g': '3G', '2g': '2G', 'slow-2g': 'धीमा 2G' },
    }

    return (
      labels[currentLanguage as 'en' | 'hi']?.[networkInfo.effectiveType] ||
      networkInfo.effectiveType
    )
  }

  const currentLang =
    SUPPORTED_LANGUAGES.find((lang) => lang.code === currentLanguage) || SUPPORTED_LANGUAGES[0]

  return (
    <div className={`indian-market-features ${className}`}>
      {/* Network Status & Data Saver Banner */}
      {(showDataSaver || !isOnline) && (
        <div
          className={`mb-4 p-3 rounded-lg border ${
            !isOnline
              ? 'bg-red-50 border-red-200 text-red-800'
              : 'bg-blue-50 border-blue-200 text-blue-800'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {isOnline ? <Wifi className="w-4 h-4" /> : <WifiOff className="w-4 h-4" />}
              <span className="text-sm font-medium">
                {!isOnline
                  ? currentLanguage === 'hi'
                    ? 'इंटरनेट कनेक्शन नहीं'
                    : 'No Internet Connection'
                  : currentLanguage === 'hi'
                    ? 'डेटा सेवर मोड'
                    : 'Data Saver Mode'}
              </span>
              <span className={`text-xs ${getNetworkStatusColor()}`}>{getNetworkStatusText()}</span>
            </div>
            {isOnline && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setDataSaverMode(!dataSaverMode)}
                className="text-xs"
              >
                {dataSaverMode
                  ? currentLanguage === 'hi'
                    ? 'बंद करें'
                    : 'Turn Off'
                  : currentLanguage === 'hi'
                    ? 'चालू करें'
                    : 'Turn On'}
              </Button>
            )}
          </div>
        </div>
      )}

      {/* Quick Action Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {/* Language Selector */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowLanguageSelector(true)}
          className="flex flex-col items-center py-3 h-auto"
        >
          <Languages className="w-5 h-5 mb-1" />
          <span className="text-xs">{currentLang.flag}</span>
        </Button>

        {/* WhatsApp Share */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowWhatsAppShare(true)}
          className="flex flex-col items-center py-3 h-auto text-green-600 border-green-200 hover:bg-green-50"
        >
          <MessageCircle className="w-5 h-5 mb-1" />
          <span className="text-xs">{currentLanguage === 'hi' ? 'शेयर' : 'Share'}</span>
        </Button>

        {/* Call Support */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => window.open(getPhoneLink(), '_self')}
          className="flex flex-col items-center py-3 h-auto text-blue-600 border-blue-200 hover:bg-blue-50"
        >
          <Phone className="w-5 h-5 mb-1" />
          <span className="text-xs">{currentLanguage === 'hi' ? 'कॉल करें' : 'Call Us'}</span>
        </Button>

        {/* Data Usage */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowDataSaver(!showDataSaver)}
          className={`flex flex-col items-center py-3 h-auto ${
            dataSaverMode ? 'text-orange-600 border-orange-200 bg-orange-50' : ''
          }`}
        >
          <Smartphone className="w-5 h-5 mb-1" />
          <span className="text-xs">{currentLanguage === 'hi' ? 'डेटा' : 'Data'}</span>
        </Button>
      </div>

      {/* Language Selection Modal */}
      {showLanguageSelector && (
        <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center animate-fadeInUp">
          <div
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={() => setShowLanguageSelector(false)}
          />
          <div className="relative bg-white rounded-t-2xl md:rounded-2xl w-full max-w-md max-h-96 overflow-y-auto animate-fadeInUp">
            <div className="p-6">
              <h3 className="text-lg font-bold mb-4 flex items-center">
                <Languages className="w-5 h-5 mr-2" />
                {currentLanguage === 'hi' ? 'भाषा चुनें' : 'Select Language'}
              </h3>
              <div className="space-y-2">
                {SUPPORTED_LANGUAGES.map((language) => (
                  <button
                    key={language.code}
                    onClick={() => handleLanguageSelect(language)}
                    className={`w-full flex items-center p-3 rounded-lg border transition-all ${
                      language.code === currentLanguage
                        ? 'border-blue-500 bg-blue-50 text-blue-900'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <span className="text-2xl mr-3">{language.flag}</span>
                    <div className="text-left">
                      <div className="font-medium">{language.nativeName}</div>
                      <div className="text-sm text-gray-600">{language.name}</div>
                    </div>
                    {language.code === currentLanguage && (
                      <Star className="w-4 h-4 text-blue-500 ml-auto" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      {/* WhatsApp Share Modal */}
      {showWhatsAppShare && (
        <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center animate-fadeInUp">
          <div
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={() => setShowWhatsAppShare(false)}
          />
          <div className="relative bg-white rounded-t-2xl md:rounded-2xl w-full max-w-md animate-fadeInUp">
            <div className="p-6">
              <h3 className="text-lg font-bold mb-4 flex items-center text-green-600">
                <MessageCircle className="w-5 h-5 mr-2" />
                {currentLanguage === 'hi' ? 'WhatsApp पर शेयर करें' : 'Share on WhatsApp'}
              </h3>
              <div className="space-y-3">
                <button
                  onClick={() => shareToWhatsApp('test-result')}
                  className="w-full flex items-center p-4 rounded-lg border border-gray-200 hover:border-green-300 hover:bg-green-50 transition-all"
                >
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                    <Star className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="text-left">
                    <div className="font-medium">
                      {currentLanguage === 'hi' ? 'टेस्ट रिजल्ट शेयर करें' : 'Share Test Result'}
                    </div>
                    <div className="text-sm text-gray-600">
                      {currentLanguage === 'hi'
                        ? 'अपने स्कोर के बारे में बताएं'
                        : 'Tell friends about your score'}
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => shareToWhatsApp('course')}
                  className="w-full flex items-center p-4 rounded-lg border border-gray-200 hover:border-green-300 hover:bg-green-50 transition-all"
                >
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                    <BookOpen className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="text-left">
                    <div className="font-medium">
                      {currentLanguage === 'hi'
                        ? 'कोर्स की जानकारी शेयर करें'
                        : 'Share Course Info'}
                    </div>
                    <div className="text-sm text-gray-600">
                      {currentLanguage === 'hi'
                        ? 'दोस्तों को कोर्स के बारे में बताएं'
                        : 'Recommend course to friends'}
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => shareToWhatsApp('app')}
                  className="w-full flex items-center p-4 rounded-lg border border-gray-200 hover:border-green-300 hover:bg-green-50 transition-all"
                >
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                    <Download className="w-5 h-5 text-purple-600" />
                  </div>
                  <div className="text-left">
                    <div className="font-medium">
                      {currentLanguage === 'hi' ? 'ऐप शेयर करें' : 'Share App'}
                    </div>
                    <div className="text-sm text-gray-600">
                      {currentLanguage === 'hi'
                        ? 'ऐप डाउनलोड लिंक शेयर करें'
                        : 'Share app download link'}
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Regional Context Info */}
      <div className="bg-gradient-to-r from-orange-50 to-green-50 rounded-lg p-4 border border-orange-200">
        <div className="flex items-center mb-2">
          <MapPin className="w-4 h-4 text-orange-600 mr-2" />
          <span className="text-sm font-medium text-orange-800">
            {currentLanguage === 'hi'
              ? 'भारतीय छात्रों के लिए विशेष'
              : 'Designed for Indian Students'}
          </span>
        </div>
        <div className="grid grid-cols-2 gap-4 text-xs">
          <div className="flex items-center text-gray-600">
            <IndianRupee className="w-3 h-3 mr-1" />
            {currentLanguage === 'hi' ? 'किफायती फीस' : 'Affordable Fees'}
          </div>
          <div className="flex items-center text-gray-600">
            <Clock className="w-3 h-3 mr-1" />
            {currentLanguage === 'hi' ? '24/7 सपोर्ट' : '24/7 Support'}
          </div>
          <div className="flex items-center text-gray-600">
            <Smartphone className="w-3 h-3 mr-1" />
            {currentLanguage === 'hi' ? 'मोबाइल फ्रेंडली' : 'Mobile Friendly'}
          </div>
          <div className="flex items-center text-gray-600">
            <Globe className="w-3 h-3 mr-1" />
            {currentLanguage === 'hi' ? 'क्षेत्रीय भाषा' : 'Regional Languages'}
          </div>
        </div>
      </div>
    </div>
  )
}

// Hook for using Indian market features
export function useIndianMarketFeatures() {
  const [language, setLanguage] = useState('en')
  const [isLowBandwidth, setIsLowBandwidth] = useState(false)
  const [dataSaverMode, setDataSaverMode] = useState(false)

  useEffect(() => {
    // Load saved language preference
    const savedLanguage = localStorage.getItem('preferred_language')
    if (savedLanguage) {
      setLanguage(savedLanguage)
    }

    // Detect data saver mode
    if ('connection' in navigator) {
      const connection = (navigator as any).connection
      if (connection.saveData || connection.effectiveType === '2g') {
        setDataSaverMode(true)
        setIsLowBandwidth(true)
      }
    }
  }, [])

  const changeLanguage = (newLanguage: string) => {
    setLanguage(newLanguage)
    localStorage.setItem('preferred_language', newLanguage)
  }

  return {
    language,
    changeLanguage,
    isLowBandwidth,
    dataSaverMode,
    setDataSaverMode,
  }
}
