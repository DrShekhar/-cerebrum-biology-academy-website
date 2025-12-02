'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X,
  Download,
  BookOpen,
  Users,
  Trophy,
  CheckCircle,
  Gift,
  Clock,
  Sparkles,
  Phone,
  Percent,
} from 'lucide-react'
import { Button } from './Button'

interface ExitIntentPopupProps {
  isVisible: boolean
  onClose: () => void
  onDownload: (email: string, phone: string) => void
  variant?: 'catalog' | 'discount'
}

export function ExitIntentPopup({
  isVisible,
  onClose,
  onDownload,
  variant = 'discount',
}: ExitIntentPopupProps) {
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [name, setName] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [discountTimer, setDiscountTimer] = useState({ minutes: 14, seconds: 59 })

  useEffect(() => {
    if (!isVisible || variant !== 'discount') return

    const timer = setInterval(() => {
      setDiscountTimer((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 }
        } else if (prev.minutes > 0) {
          return { minutes: prev.minutes - 1, seconds: 59 }
        }
        return prev
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [isVisible, variant])

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

  const discountBenefits = [
    'FREE Demo Class worth Rs 2,000',
    '20% OFF on any course enrollment',
    'Priority batch selection',
    'Exclusive study material access',
  ]

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Popup Content */}
          <motion.div
            className="relative bg-white rounded-3xl shadow-2xl max-w-[calc(100vw-2rem)] sm:max-w-md md:max-w-xl w-full overflow-hidden"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', duration: 0.5 }}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 bg-white/90 hover:bg-white rounded-full p-2 transition-colors shadow-md"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>

            {variant === 'discount' ? (
              <>
                {/* Discount Variant Header */}
                <div className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white px-6 py-8 relative overflow-hidden">
                  <motion.div
                    className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                  <motion.div
                    className="absolute -bottom-5 -left-5 w-20 h-20 bg-white/10 rounded-full"
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 2.5, repeat: Infinity }}
                  />

                  <div className="relative z-10">
                    <motion.div
                      className="inline-flex items-center bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm mb-3"
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <Sparkles className="w-4 h-4 mr-1" />
                      <span>Exclusive Offer</span>
                    </motion.div>

                    <h2 className="text-2xl sm:text-3xl font-bold mb-2">
                      Wait! Don't Leave Yet...
                    </h2>
                    <p className="text-orange-100 text-lg">Get 20% OFF + FREE Demo Class!</p>

                    {/* Countdown Timer */}
                    <div className="mt-4 flex items-center gap-2">
                      <Clock className="w-5 h-5 text-yellow-300" />
                      <span className="text-yellow-100">Offer expires in:</span>
                      <div className="flex gap-1 font-mono font-bold text-lg">
                        <span className="bg-white/20 px-2 py-1 rounded">
                          {String(discountTimer.minutes).padStart(2, '0')}
                        </span>
                        <span>:</span>
                        <span className="bg-white/20 px-2 py-1 rounded">
                          {String(discountTimer.seconds).padStart(2, '0')}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Discount Content */}
                <div className="px-6 py-6">
                  {!isSubmitted ? (
                    <>
                      {/* Benefits */}
                      <div className="grid grid-cols-2 gap-3 mb-6">
                        {discountBenefits.map((benefit, index) => (
                          <motion.div
                            key={index}
                            className="flex items-center bg-green-50 rounded-lg p-3"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                          >
                            <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                            <span className="text-sm text-gray-700 font-medium">{benefit}</span>
                          </motion.div>
                        ))}
                      </div>

                      {/* Lead Form */}
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                          <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                            placeholder="Your Name"
                          />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <input
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                            placeholder="Phone Number *"
                          />
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                            placeholder="Email Address *"
                          />
                        </div>

                        <motion.button
                          type="submit"
                          disabled={isSubmitting || !email || !phone}
                          className="w-full py-4 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Percent className="w-5 h-5" />
                          {isSubmitting ? 'Claiming Offer...' : 'Claim My 20% Discount'}
                        </motion.button>

                        <p className="text-xs text-gray-500 text-center">
                          Limited time offer. No spam, we promise!
                        </p>
                      </form>

                      {/* Trust Indicators */}
                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <div className="flex items-center justify-center gap-4 text-xs text-gray-500">
                          <div className="flex items-center">
                            <Trophy className="w-4 h-4 mr-1 text-yellow-500" />
                            98% Success Rate
                          </div>
                          <div className="flex items-center">
                            <Users className="w-4 h-4 mr-1 text-blue-500" />
                            2,500+ Students
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="text-center py-6">
                      <motion.div
                        className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring' }}
                      >
                        <CheckCircle className="w-8 h-8 text-green-600" />
                      </motion.div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">Discount Claimed!</h3>
                      <p className="text-gray-600 mb-2">
                        Your 20% discount code has been sent to your email.
                      </p>
                      <p className="text-sm text-gray-500">
                        Our counselor will call you shortly to schedule your FREE demo class.
                      </p>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                {/* Catalog Variant Header */}
                <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white px-6 sm:px-8 py-6">
                  <div className="flex items-center mb-4">
                    <div className="bg-white/20 rounded-full p-3 mr-4">
                      <Gift className="w-8 h-8" />
                    </div>
                    <div>
                      <h2 className="text-xl sm:text-2xl font-bold">Wait! Don't Miss This...</h2>
                      <p className="text-blue-100">
                        Get Cerebrum's complete NEET Biology guide FREE
                      </p>
                    </div>
                  </div>

                  <div className="bg-white/10 rounded-lg p-3 sm:p-4">
                    <div className="flex flex-wrap items-center justify-center gap-4 text-xs sm:text-sm">
                      <div className="flex items-center">
                        <Trophy className="w-4 h-4 mr-2" />
                        <span>98% Success</span>
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

                {/* Catalog Content */}
                <div className="px-6 sm:px-8 py-6">
                  {!isSubmitted ? (
                    <>
                      <div className="text-center mb-6">
                        <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                          Download Cerebrum's Complete Course Catalog
                        </h3>
                        <p className="text-sm sm:text-base text-gray-600">
                          Everything you need to know about Cerebrum's proven NEET Biology coaching
                          programs
                        </p>
                      </div>

                      {/* Features Grid */}
                      <div className="grid grid-cols-1 gap-2 mb-6 max-h-40 overflow-y-auto">
                        {catalogFeatures.map((feature, index) => (
                          <div key={index} className="flex items-start">
                            <CheckCircle className="w-4 h-4 text-emerald-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-gray-700">{feature}</span>
                          </div>
                        ))}
                      </div>

                      {/* Lead Form */}
                      <form onSubmit={handleSubmit} className="space-y-3">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm"
                            placeholder="Email Address *"
                          />
                          <input
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm"
                            placeholder="Phone Number *"
                          />
                        </div>

                        <Button
                          type="submit"
                          variant="success_cta"
                          size="lg"
                          disabled={isSubmitting || !email || !phone}
                          className="w-full py-3 text-base font-semibold"
                        >
                          <Download className="w-5 h-5 mr-2" />
                          {isSubmitting ? 'Sending...' : 'Download Free Catalog'}
                        </Button>

                        <p className="text-xs text-gray-500 text-center">
                          Your information is secure. We respect your privacy.
                        </p>
                      </form>
                    </>
                  ) : (
                    <div className="text-center py-6">
                      <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="w-8 h-8 text-green-600" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Catalog Sent!</h3>
                      <p className="text-gray-600 mb-2">
                        Check your email for the complete course catalog.
                      </p>
                      <p className="text-sm text-gray-500">
                        Our counselor will call you within 24 hours.
                      </p>
                    </div>
                  )}
                </div>
              </>
            )}
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
