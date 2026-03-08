'use client'

import { useState, useEffect } from 'react'
import { X, Gift, Clock, CheckCircle, Phone, MessageCircle } from 'lucide-react'
import { trackAndOpenWhatsApp } from '@/lib/whatsapp/tracking'

interface ExitIntentPopupProps {
  onClose?: () => void
}

export function ExitIntentPopup({ onClose }: ExitIntentPopupProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [hasShown, setHasShown] = useState(false)

  useEffect(() => {
    const shown = sessionStorage.getItem('exitIntentShown')
    const dismissed = sessionStorage.getItem('exitIntentDismissed')
    if (shown || dismissed) {
      setHasShown(true)
      return
    }

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 10 && !hasShown) {
        setIsVisible(true)
        setHasShown(true)
        sessionStorage.setItem('exitIntentShown', 'true')
      }
    }

    const timer = setTimeout(() => {
      document.addEventListener('mouseleave', handleMouseLeave)
    }, 8000)

    return () => {
      clearTimeout(timer)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [hasShown])

  const handleClose = () => {
    setIsVisible(false)
    sessionStorage.setItem('exitIntentDismissed', 'true')
    onClose?.()
  }

  if (!isVisible) return null

  return (
    <>
      {isVisible && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fadeInUp">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fadeInUp"
            onClick={handleClose}
          />

          <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden animate-fadeInUp">
            <button
              onClick={handleClose}
              className="absolute top-3 right-3 z-20 bg-white hover:bg-gray-100 rounded-full p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center transition-all shadow-lg border border-gray-200 touch-manipulation active:scale-95"
              aria-label="Close popup"
            >
              <X className="w-5 h-5 text-gray-700" />
            </button>

            <div className="bg-indigo-500 px-6 py-8 text-white text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Gift className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Wait! Don't Miss This</h2>
              <p className="text-blue-100">Get a FREE Diagnostic Test worth Rs 999</p>
            </div>

            <div className="p-6">
              <div className="mb-6">
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                  <Clock className="w-4 h-4 text-orange-500" />
                  <span>Limited time offer</span>
                </div>

                <ul className="space-y-2 text-sm text-gray-700">
                  {[
                    'Full NEET-pattern diagnostic test',
                    'Detailed performance analysis report',
                    'One-on-one counseling session',
                    'Personalized study plan',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-3">
                <button
                  type="button"
                  onClick={() =>
                    trackAndOpenWhatsApp({
                      source: 'admissions-exit-intent',
                      message:
                        'Hi! I want to take the FREE Diagnostic Test. Please share the details.',
                      campaign: 'exit-intent-diagnostic',
                    })
                  }
                  className="w-full flex items-center justify-center gap-2 py-4 bg-green-600 hover:bg-green-700 text-white font-bold text-lg rounded-xl shadow-lg transition-all min-h-[56px] touch-manipulation"
                >
                  <MessageCircle className="w-6 h-6" />
                  Claim via WhatsApp
                </button>

                <a
                  href="tel:+918826444334"
                  className="w-full flex items-center justify-center gap-2 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg rounded-xl shadow-lg transition-all min-h-[56px] touch-manipulation"
                >
                  <Phone className="w-6 h-6" />
                  Call: +91 88264 44334
                </a>
              </div>

              <p className="text-xs text-gray-500 text-center mt-4">
                No spam. We respect your privacy.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
