'use client'

import { useState, useEffect } from 'react'
import { X, Gift, Mail, Phone, CheckCircle } from 'lucide-react'

interface ExitIntentPopupProps {
  onClose?: () => void
  onCapture?: (email: string) => void
}

export function ExitIntentPopup({ onClose, onCapture }: ExitIntentPopupProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [hasShown, setHasShown] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email) return

    try {
      onCapture?.(email)
      setIsSubmitted(true)

      setTimeout(() => {
        handleClose()
      }, 3000)
    } catch (error) {
      console.error('Error capturing email:', error)
    }
  }

  const handleRemindLater = () => {
    sessionStorage.removeItem('exitIntentShown')
    handleClose()
  }

  return (
<>
{isVisible && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 animate-fadeInUp"
            onClick={handleClose}
          />

          {/* Popup */}
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeInUp"
          >
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden">
              {/* Close Button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-10"
              >
                <X className="w-6 h-6" />
              </button>

              {!isSubmitted ? (
                <>
                  {/* Header */}
                  <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white p-6 text-center">
                    <Gift className="w-16 h-16 mx-auto mb-3 animate-bounce" />
                    <h2 className="text-3xl font-bold mb-2">Wait! Don't Miss Out!</h2>
                    <p className="text-lg opacity-95">Special Offer Just For You</p>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="bg-yellow-50 border-2 border-yellow-400 rounded-lg p-4 mb-6">
                      <div className="text-center">
                        <div className="text-4xl font-bold text-red-600 mb-2">₹2,000 OFF</div>
                        <div className="text-lg font-semibold text-gray-900">
                          On Your First Enrollment
                        </div>
                        <div className="text-sm text-gray-600 mt-1">
                          + FREE Study Materials Worth ₹3,000
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3 mb-6">
                      <div className="flex items-center text-sm text-gray-700">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-2 flex-shrink-0" />
                        <span>98% NEET qualification rate</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-700">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-2 flex-shrink-0" />
                        <span>AIIMS faculty with 15+ years experience</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-700">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-2 flex-shrink-0" />
                        <span>1,50,000+ students in top medical colleges</span>
                      </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          <Mail className="w-4 h-4 inline mr-2" />
                          Email Address *
                        </label>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-red-500 focus:ring-2 focus:ring-red-100 outline-none text-gray-900"
                          placeholder="your.email@example.com"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          <Phone className="w-4 h-4 inline mr-2" />
                          WhatsApp Number (Optional)
                        </label>
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-red-500 focus:ring-2 focus:ring-red-100 outline-none text-gray-900"
                          placeholder="+91 XXXXX XXXXX"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-bold py-4 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200"
                      >
                        Claim My ₹2,000 Discount Now!
                      </button>
                    </form>

                    <div className="mt-4 text-center">
                      <button
                        onClick={handleRemindLater}
                        className="text-sm text-gray-500 hover:text-gray-700 underline"
                      >
                        Remind me later
                      </button>
                    </div>

                    <div className="mt-4 text-xs text-center text-gray-500">
                      Offer valid for first-time enrollments only. Limited to 50 students.
                    </div>
                  </div>
                </>
              ) : (
                <div className="p-8 text-center">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-12 h-12 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Success!</h3>
                  <p className="text-gray-600 mb-4">
                    Check your email for your exclusive ₹2,000 discount code!
                  </p>
                  <p className="text-sm text-gray-500">
                    We'll also send you free NEET preparation tips and study materials.
                  </p>
                </div>
              )}
            </div>
          </div>
        </>
      )}
</>
)
}
