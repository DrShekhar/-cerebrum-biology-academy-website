'use client'

import { useState, useEffect } from 'react'
import { X, Gift, Clock, CheckCircle, Phone } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { trackExitIntent } from '@/lib/analytics'

interface ExitIntentPopupProps {
  onClose?: () => void
}

export function ExitIntentPopup({ onClose }: ExitIntentPopupProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [hasShown, setHasShown] = useState(false)
  const [phone, setPhone] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    // Check if popup was already shown OR dismissed in this session
    // Respect user's decision - don't be pushy!
    const shown = sessionStorage.getItem('exitIntentShown')
    const dismissed = sessionStorage.getItem('exitIntentDismissed')
    if (shown || dismissed) {
      setHasShown(true)
      return
    }

    const handleMouseLeave = (e: MouseEvent) => {
      // Trigger when mouse moves towards the top of the page
      if (e.clientY <= 10 && !hasShown) {
        setIsVisible(true)
        setHasShown(true)
        sessionStorage.setItem('exitIntentShown', 'true')
        trackExitIntent.shown()
      }
    }

    // Add a delay before enabling exit intent (increased to 8 seconds)
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
    // Mark as dismissed so it won't reappear in this session
    sessionStorage.setItem('exitIntentDismissed', 'true')
    onClose?.()
  }

  const handleSubmit = async () => {
    if (!name.trim()) {
      setError('Please enter your name')
      return
    }
    if (!phone || phone.replace(/\D/g, '').length < 10) {
      setError('Please enter a valid phone number')
      return
    }

    setError('')
    setLoading(true)

    try {
      let formattedPhone = phone.replace(/[\s\-\(\)]/g, '')
      if (!formattedPhone.startsWith('+')) {
        formattedPhone = formattedPhone.startsWith('91')
          ? `+${formattedPhone}`
          : `+91${formattedPhone}`
      }

      const response = await fetch('/api/demo-booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          phone: formattedPhone,
          email: '',
          course: 'diagnostic-test',
          source: 'exit-intent-popup',
          preferredDate: new Date().toISOString().split('T')[0],
          preferredTime: 'callback',
          message: 'Free diagnostic test request from exit intent popup',
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to submit')
      }

      setSuccess(true)
      trackExitIntent.converted()
    } catch (err) {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (!isVisible) return null

  return (
<>
{isVisible && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fadeInUp"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fadeInUp"
            onClick={handleClose}
          />

          {/* Popup Content */}
          <div
            className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden animate-fadeInUp"
          >
            {/* Close Button - prominent and easy to tap */}
            <button
              onClick={handleClose}
              className="absolute top-3 right-3 z-20 bg-white hover:bg-gray-100 rounded-full p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center transition-all shadow-lg border border-gray-200 touch-manipulation active:scale-95"
              aria-label="Close popup"
            >
              <X className="w-5 h-5 text-gray-700" />
            </button>

            {success ? (
              <div className="p-8 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">You're All Set!</h3>
                <p className="text-gray-600 mb-4">
                  Our counselor will call you within 30 minutes to schedule your free diagnostic
                  test.
                </p>
                <div className="flex items-center justify-center gap-2 text-green-600 text-sm">
                  <Phone className="w-4 h-4" />
                  <span>Keep your phone ready!</span>
                </div>
              </div>
            ) : (
              <>
                {/* Header */}
                <div className="bg-indigo-500 px-6 py-8 text-white text-center">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Gift className="w-8 h-8" />
                  </div>
                  <h2 className="text-2xl font-bold mb-2">Wait! Don't Miss This</h2>
                  <p className="text-blue-100">Get a FREE Diagnostic Test worth ₹999</p>
                </div>

                {/* Body */}
                <div className="p-6">
                  <div className="mb-6">
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                      <Clock className="w-4 h-4 text-orange-500" />
                      <span>Limited time offer - Expires in 24 hours</span>
                    </div>

                    <ul className="space-y-2 text-sm text-gray-700">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>Full NEET-pattern diagnostic test</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>Detailed performance analysis report</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>One-on-one counseling session</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>Personalized study plan</span>
                      </li>
                    </ul>
                  </div>

                  {error && (
                    <div className="bg-red-50 text-red-600 px-3 py-2 rounded-lg text-sm mb-4">
                      {error}
                    </div>
                  )}

                  <div className="space-y-3">
                    <input
                      type="text"
                      placeholder="Your Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="tel"
                      placeholder="WhatsApp Number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <Button
                      variant="primary"
                      className="w-full py-3"
                      onClick={handleSubmit}
                      disabled={loading}
                    >
                      {loading ? 'Please wait...' : 'Claim Free Test'}
                    </Button>
                  </div>

                  <p className="text-xs text-gray-500 text-center mt-4">
                    No spam. We respect your privacy.
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      )}
</>
)
}
