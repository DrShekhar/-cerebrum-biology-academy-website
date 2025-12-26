'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ShieldCheck, Settings } from 'lucide-react'
import { GTMService } from '@/lib/analytics/gtmService'
import { FacebookPixelService } from '@/lib/analytics/facebookPixelService'

interface ConsentPreferences {
  necessary: boolean
  analytics: boolean
  marketing: boolean
  personalization: boolean
}

interface GDPRBannerProps {
  position?: 'bottom' | 'top'
  theme?: 'light' | 'dark'
  companyName?: string
  privacyPolicyUrl?: string
  cookiePolicyUrl?: string
  onConsentChange?: (preferences: ConsentPreferences) => void
}

export const GDPRBanner = ({
  position = 'bottom',
  theme = 'dark',
  companyName = 'Cerebrum Biology Academy',
  privacyPolicyUrl = '/privacy-policy',
  cookiePolicyUrl = '/cookie-policy',
  onConsentChange,
}: GDPRBannerProps) => {
  const [isVisible, setIsVisible] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  const [preferences, setPreferences] = useState<ConsentPreferences>({
    necessary: true, // Always required
    analytics: false,
    marketing: false,
    personalization: false,
  })

  useEffect(() => {
    // Check if user has already given consent
    const consent = localStorage.getItem('gdpr-consent')
    const consentDate = localStorage.getItem('gdpr-consent-date')

    if (!consent) {
      // Show banner if no consent given
      setIsVisible(true)
    } else {
      // Check if consent is older than 13 months (GDPR requirement)
      if (consentDate) {
        const consentTimestamp = new Date(consentDate).getTime()
        const thirteenMonthsAgo = Date.now() - 13 * 30 * 24 * 60 * 60 * 1000

        if (consentTimestamp < thirteenMonthsAgo) {
          setIsVisible(true)
        } else {
          // Load existing preferences and initialize tracking
          try {
            const savedPreferences = JSON.parse(consent)
            setPreferences(savedPreferences)
            initializeTracking(savedPreferences)
          } catch {
            setIsVisible(true)
          }
        }
      }
    }
  }, [])

  const initializeTracking = (consentPreferences: ConsentPreferences) => {
    // Initialize analytics based on consent
    if (consentPreferences.analytics) {
      const gtmId = process.env.NEXT_PUBLIC_GTM_ID
      if (gtmId) {
        GTMService.initialize(gtmId)
      }
    }

    if (consentPreferences.marketing) {
      const fbPixelId = process.env.NEXT_PUBLIC_FB_PIXEL_ID
      if (fbPixelId) {
        FacebookPixelService.initialize(fbPixelId)
      }
    }

    // Track consent preferences
    if (consentPreferences.analytics) {
      GTMService.trackEvent('gdpr_consent_given', {
        analytics: consentPreferences.analytics,
        marketing: consentPreferences.marketing,
        personalization: consentPreferences.personalization,
      })
    }
  }

  const saveConsent = (consentPreferences: ConsentPreferences) => {
    localStorage.setItem('gdpr-consent', JSON.stringify(consentPreferences))
    localStorage.setItem('gdpr-consent-date', new Date().toISOString())

    setPreferences(consentPreferences)
    onConsentChange?.(consentPreferences)

    // Initialize tracking based on preferences
    initializeTracking(consentPreferences)
  }

  const handleAcceptAll = () => {
    const allPreferences = {
      necessary: true,
      analytics: true,
      marketing: true,
      personalization: true,
    }

    saveConsent(allPreferences)
    setIsVisible(false)
  }

  const handleRejectAll = () => {
    const minimalPreferences = {
      necessary: true,
      analytics: false,
      marketing: false,
      personalization: false,
    }

    saveConsent(minimalPreferences)
    setIsVisible(false)
  }

  const handleSavePreferences = () => {
    saveConsent(preferences)
    setIsVisible(false)
    setShowDetails(false)
  }

  const handlePreferenceChange = (key: keyof ConsentPreferences, value: boolean) => {
    if (key === 'necessary') return // Cannot disable necessary cookies

    setPreferences((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  const bannerClasses = `
    fixed left-0 right-0 z-50 shadow-lg
    ${position === 'bottom' ? 'bottom-0' : 'top-0'}
    ${
      theme === 'dark'
        ? 'bg-gray-900 text-white border-gray-700'
        : 'bg-white text-gray-900 border-gray-200'
    }
    border-t-2
  `

  if (!isVisible) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: position === 'bottom' ? 100 : -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: position === 'bottom' ? 100 : -100, opacity: 0 }}
        className={bannerClasses}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {!showDetails ? (
            // Main banner content
            <div className="py-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <ShieldCheck className="w-6 h-6 text-blue-500 flex-shrink-0 mt-1" />
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold mb-1">Privacy & Cookies Notice</h3>
                    <p className="text-sm opacity-90 mb-3">
                      We use cookies and similar technologies to enhance your experience, analyze
                      our traffic, and for marketing purposes. Your privacy matters to us.
                    </p>

                    <div className="flex items-center space-x-2 text-xs">
                      <a
                        href={privacyPolicyUrl}
                        className="underline hover:opacity-80"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Privacy Policy
                      </a>
                      <span>•</span>
                      <a
                        href={cookiePolicyUrl}
                        className="underline hover:opacity-80"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Cookie Policy
                      </a>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setIsVisible(false)}
                  className="p-1 hover:opacity-70 transition-opacity"
                  aria-label="Close banner"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-2">
                <button
                  onClick={handleAcceptAll}
                  className="px-6 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Accept All
                </button>

                <button
                  onClick={handleRejectAll}
                  className={`px-6 py-2 text-sm font-medium rounded-lg transition-colors ${
                    theme === 'dark'
                      ? 'bg-gray-700 text-white hover:bg-gray-600'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  Reject All
                </button>

                <button
                  onClick={() => setShowDetails(true)}
                  className="px-4 py-2 text-sm font-medium text-blue-500 hover:text-blue-400 transition-colors flex items-center space-x-1"
                >
                  <Settings className="w-4 h-4" />
                  <span>Customize</span>
                </button>
              </div>
            </div>
          ) : (
            // Detailed preferences
            <div className="py-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Cookie Preferences</h3>
                <button
                  onClick={() => setShowDetails(false)}
                  className="p-1 hover:opacity-70 transition-opacity"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4 mb-6">
                {/* Necessary Cookies */}
                <div className="flex items-start justify-between py-3 border-b border-opacity-20 border-gray-500">
                  <div className="flex-1">
                    <h4 className="font-medium mb-1">Necessary Cookies</h4>
                    <p className="text-sm opacity-80">
                      Required for the website to function properly. Cannot be disabled.
                    </p>
                  </div>
                  <div className="ml-4">
                    <div className="w-12 h-6 bg-green-600 rounded-full relative">
                      <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5"></div>
                    </div>
                  </div>
                </div>

                {/* Analytics Cookies */}
                <div className="flex items-start justify-between py-3 border-b border-opacity-20 border-gray-500">
                  <div className="flex-1">
                    <h4 className="font-medium mb-1">Analytics Cookies</h4>
                    <p className="text-sm opacity-80">
                      Help us understand how visitors interact with our website.
                    </p>
                  </div>
                  <div className="ml-4">
                    <button
                      onClick={() => handlePreferenceChange('analytics', !preferences.analytics)}
                      className={`w-12 h-6 rounded-full relative transition-colors ${
                        preferences.analytics ? 'bg-blue-600' : 'bg-gray-400'
                      }`}
                    >
                      <div
                        className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${
                          preferences.analytics ? 'translate-x-6' : 'translate-x-0.5'
                        }`}
                      ></div>
                    </button>
                  </div>
                </div>

                {/* Marketing Cookies */}
                <div className="flex items-start justify-between py-3 border-b border-opacity-20 border-gray-500">
                  <div className="flex-1">
                    <h4 className="font-medium mb-1">Marketing Cookies</h4>
                    <p className="text-sm opacity-80">
                      Used to track visitors across websites for advertising purposes.
                    </p>
                  </div>
                  <div className="ml-4">
                    <button
                      onClick={() => handlePreferenceChange('marketing', !preferences.marketing)}
                      className={`w-12 h-6 rounded-full relative transition-colors ${
                        preferences.marketing ? 'bg-blue-600' : 'bg-gray-400'
                      }`}
                    >
                      <div
                        className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${
                          preferences.marketing ? 'translate-x-6' : 'translate-x-0.5'
                        }`}
                      ></div>
                    </button>
                  </div>
                </div>

                {/* Personalization Cookies */}
                <div className="flex items-start justify-between py-3">
                  <div className="flex-1">
                    <h4 className="font-medium mb-1">Personalization Cookies</h4>
                    <p className="text-sm opacity-80">
                      Enable personalized content and features based on your preferences.
                    </p>
                  </div>
                  <div className="ml-4">
                    <button
                      onClick={() =>
                        handlePreferenceChange('personalization', !preferences.personalization)
                      }
                      className={`w-12 h-6 rounded-full relative transition-colors ${
                        preferences.personalization ? 'bg-blue-600' : 'bg-gray-400'
                      }`}
                    >
                      <div
                        className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${
                          preferences.personalization ? 'translate-x-6' : 'translate-x-0.5'
                        }`}
                      ></div>
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleSavePreferences}
                  className="px-6 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Save Preferences
                </button>

                <button
                  onClick={handleAcceptAll}
                  className="px-6 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors"
                >
                  Accept All
                </button>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export type { ConsentPreferences }
