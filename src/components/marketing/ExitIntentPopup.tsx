'use client'

import { useState, useEffect } from 'react'
import { X, Gift, Phone, CheckCircle, MessageCircle } from 'lucide-react'
import { trackAndOpenWhatsApp } from '@/lib/whatsapp/tracking'

interface ExitIntentPopupProps {
  onClose?: () => void
  onCapture?: (email: string) => void
}

export function ExitIntentPopup({ onClose }: ExitIntentPopupProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [hasShown, setHasShown] = useState(false)

  useEffect(() => {
    const hasShownBefore = sessionStorage.getItem('exitIntentShown')
    if (hasShownBefore) {
      setHasShown(true)
      return
    }

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !hasShown) {
        setIsVisible(true)
        setHasShown(true)
        sessionStorage.setItem('exitIntentShown', 'true')
      }
    }

    document.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [hasShown])

  const handleClose = () => {
    setIsVisible(false)
    onClose?.()
  }

  return (
    <>
      {isVisible && (
        <>
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 animate-fadeInUp"
            onClick={handleClose}
          />

          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeInUp">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden relative">
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-10 min-w-[44px] min-h-[44px] flex items-center justify-center"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white p-6 text-center">
                <Gift className="w-16 h-16 mx-auto mb-3" />
                <h2 className="text-2xl sm:text-3xl font-bold mb-2">Wait! Don't Miss Out!</h2>
                <p className="text-lg opacity-95">Special Offer Just For You</p>
              </div>

              <div className="p-6">
                <div className="bg-yellow-50 border-2 border-yellow-400 rounded-lg p-4 mb-6">
                  <div className="text-center">
                    <div className="text-3xl sm:text-4xl font-bold text-red-600 mb-2">
                      FREE Demo + 20% OFF
                    </div>
                    <div className="text-base sm:text-lg font-semibold text-gray-900">
                      On Your First Enrollment
                    </div>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  {[
                    '98% NEET qualification rate',
                    'AIIMS faculty with 15+ years experience',
                    '15,000+ students in top medical colleges',
                  ].map((item) => (
                    <div key={item} className="flex items-center text-sm text-gray-700">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-2 flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                <div className="space-y-3">
                  <button
                    type="button"
                    onClick={() =>
                      trackAndOpenWhatsApp({
                        source: 'exit-intent-marketing',
                        message:
                          'Hi! I saw the special offer. I want to claim the 20% discount and book a free demo class.',
                        campaign: 'exit-intent',
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
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}
