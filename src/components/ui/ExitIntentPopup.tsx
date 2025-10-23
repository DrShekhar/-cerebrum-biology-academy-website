'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Download, BookOpen, Users, Trophy, CheckCircle, Gift } from 'lucide-react'
import { Button } from './Button'

interface ExitIntentPopupProps {
  isVisible: boolean
  onClose: () => void
  onDownload: (email: string, phone: string) => void
}

export function ExitIntentPopup({ isVisible, onClose, onDownload }: ExitIntentPopupProps) {
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !phone) return

    setIsSubmitting(true)
    try {
      await onDownload(email, phone)
      setIsSubmitted(true)

      // Auto close after success
      setTimeout(() => {
        onClose()
        setIsSubmitted(false)
      }, 3000)
    } catch (error) {
      console.error('Download failed:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Prevent scroll when popup is open
  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isVisible])

  const catalogFeatures = [
    'Complete Cerebrum NEET Biology Course Outline',
    'Chapter-wise Study Timeline by Cerebrum Experts',
    'Previous Year Question Analysis & Solutions',
    'Success Stories from 2,847 Cerebrum Students',
    'Cerebrum AIIMS Faculty Profiles & Credentials',
    'Fee Structure & Cerebrum Scholarship Details',
    'Exclusive Cerebrum Study Materials Preview',
  ]

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Popup Content */}
          <motion.div
            className="relative bg-white rounded-3xl shadow-2xl max-w-2xl w-full mx-4 overflow-hidden"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', duration: 0.5 }}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 bg-gray-100 hover:bg-gray-200 rounded-full p-2 transition-colors"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>

            {/* Header with Gradient */}
            <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white px-8 py-6">
              <div className="flex items-center mb-4">
                <div className="bg-white/20 rounded-full p-3 mr-4">
                  <Gift className="w-8 h-8" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Wait! Don't Miss This...</h2>
                  <p className="text-blue-100">Get Cerebrum's complete NEET Biology guide FREE</p>
                </div>
              </div>

              <div className="bg-white/10 rounded-lg p-4">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center">
                    <Trophy className="w-4 h-4 mr-2" />
                    <span>Cerebrum 98% Success</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-2" />
                    <span>2,500+ Students</span>
                  </div>
                  <div className="flex items-center">
                    <BookOpen className="w-4 h-4 mr-2" />
                    <span>AIIMS Faculty</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="px-8 py-6">
              {!isSubmitted ? (
                <>
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      Download Cerebrum's Complete Course Catalog
                    </h3>
                    <p className="text-gray-600">
                      Everything you need to know about Cerebrum's proven NEET Biology coaching
                      programs
                    </p>
                  </div>

                  {/* Features Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                    {catalogFeatures.map((feature, index) => (
                      <div key={index} className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-emerald-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Lead Form */}
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                          placeholder="student@example.com"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                          placeholder="+91 98765 43210"
                        />
                      </div>
                    </div>

                    <Button
                      type="submit"
                      variant="success_cta"
                      size="lg"
                      disabled={isSubmitting || !email || !phone}
                      className="w-full py-4 text-lg font-semibold"
                    >
                      <Download className="w-5 h-5 mr-3" />
                      {isSubmitting
                        ? 'Sending Cerebrum Catalog...'
                        : 'Download Free Cerebrum Catalog'}
                    </Button>

                    <p className="text-xs text-gray-500 text-center">
                      Your information is secure. We respect your privacy and won't spam you.
                    </p>
                  </form>

                  {/* Trust Signals */}
                  <div className="border-t border-gray-200 mt-6 pt-4">
                    <div className="flex items-center justify-center space-x-6 text-sm text-gray-600">
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                        <span>Instant Download</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                        <span>No Hidden Costs</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                        <span>Expert Guidance</span>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                /* Success State */
                <div className="text-center py-8">
                  <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Cerebrum Catalog Sent Successfully!
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Check your email for the complete Cerebrum NEET Biology course catalog.
                  </p>
                  <p className="text-sm text-gray-500">
                    Our Cerebrum counselor will call you within 24 hours to discuss your NEET
                    preparation.
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

// Hook for exit-intent detection
export function useExitIntent() {
  const [showExitIntent, setShowExitIntent] = useState(false)
  const [hasTriggered, setHasTriggered] = useState(false)

  useEffect(() => {
    // Check if user has already seen the popup in this session
    const hasSeenPopup = sessionStorage.getItem('exitIntentShown')
    if (hasSeenPopup) {
      setHasTriggered(true)
      return
    }

    const handleMouseLeave = (e: MouseEvent) => {
      // Only trigger if cursor moves to top of screen (exit intent)
      if (e.clientY <= 0 && !hasTriggered) {
        setShowExitIntent(true)
        setHasTriggered(true)
        sessionStorage.setItem('exitIntentShown', 'true')
      }
    }

    // Also trigger on scroll up near top (mobile behavior)
    let lastScrollY = window.scrollY
    const handleScroll = () => {
      if (window.scrollY < 100 && window.scrollY < lastScrollY && !hasTriggered) {
        // User scrolled up near the top - likely trying to navigate away
        setShowExitIntent(true)
        setHasTriggered(true)
        sessionStorage.setItem('exitIntentShown', 'true')
      }
      lastScrollY = window.scrollY
    }

    // Add event listeners
    document.addEventListener('mouseleave', handleMouseLeave)
    window.addEventListener('scroll', handleScroll)

    // Cleanup
    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [hasTriggered])

  const hideExitIntent = () => {
    setShowExitIntent(false)
  }

  return { showExitIntent, hideExitIntent }
}
