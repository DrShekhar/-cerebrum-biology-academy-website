'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Gift,
  Clock,
  Star,
  CheckCircle,
  X,
  ArrowRight,
  Phone,
  MessageCircle,
  Mail,
  Zap,
  Heart,
  Target,
  Trophy,
  Sparkles,
  AlertTriangle,
  Users,
  Calendar,
  Percent,
  Timer,
  Shield,
} from 'lucide-react'
import { trackAndOpenWhatsApp } from '@/lib/whatsapp/tracking'

interface ExitIntentOffer {
  id: string
  type: 'discount' | 'consultation' | 'trial' | 'bonus' | 'urgency'
  headline: string
  subheadline: string
  offerDetails: {
    discount?: number
    bonusValue?: string
    urgencyMessage?: string
    consultationDetails?: string
  }
  cta: {
    primary: string
    secondary?: string
  }
  validFor: string
  urgencyLevel: 'low' | 'medium' | 'high' | 'critical'
  personalizedElements: string[]
  visual: {
    icon: React.ReactNode
    gradient: string
    accentColor: string
  }
  socialProof: {
    count: number
    message: string
  }
  riskReversal: string[]
}

interface ExitIntentPopupProps {
  userProfile?: any
  isEnabled?: boolean
  delayBeforeShow?: number
  maxShowsPerSession?: number
  showOnScrollUp?: boolean
  showOnTabSwitch?: boolean
  position?: 'center' | 'bottom' | 'top'
  variant?: 'minimal' | 'standard' | 'premium'
}

const ExitIntentPopup: React.FC<ExitIntentPopupProps> = ({
  userProfile = {},
  isEnabled = true,
  delayBeforeShow = 30000, // 30 seconds minimum before showing
  maxShowsPerSession = 2,
  showOnScrollUp = true,
  showOnTabSwitch = true,
  position = 'center',
  variant = 'standard',
}) => {
  const [isVisible, setIsVisible] = useState(false)
  const [hasShown, setHasShown] = useState(false)
  const [showCount, setShowCount] = useState(0)
  const [mouseY, setMouseY] = useState(0)
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('down')
  const [lastScrollY, setLastScrollY] = useState(0)
  const [timeOnPage, setTimeOnPage] = useState(0)
  const [selectedOffer, setSelectedOffer] = useState<ExitIntentOffer | null>(null)

  // Track time on page
  useEffect(() => {
    const startTime = Date.now()
    const interval = setInterval(() => {
      setTimeOnPage(Date.now() - startTime)
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  // Generate personalized exit intent offers
  const exitIntentOffers: ExitIntentOffer[] = [
    {
      id: 'last-chance-discount',
      type: 'discount',
      headline: "Wait! Don't Miss This Exclusive Offer",
      subheadline: 'Get 25% OFF your NEET coaching - Limited time offer ending soon!',
      offerDetails: {
        discount: 25,
        urgencyMessage: 'This offer expires in 15 minutes',
      },
      cta: {
        primary: 'Claim 25% Discount Now',
        secondary: "No thanks, I'll pay full price",
      },
      validFor: '15 minutes',
      urgencyLevel: 'critical',
      personalizedElements: [
        userProfile.goals?.targetScore
          ? `Perfect for your ${userProfile.goals.targetScore} target score`
          : 'Perfect for NEET aspirants',
        userProfile.location?.city
          ? `Join 500+ students from ${userProfile.location.city}`
          : 'Join 10,000+ successful students',
      ],
      visual: {
        icon: <Gift className="w-8 h-8" />,
        gradient: 'bg-red-600',
        accentColor: 'red',
      },
      socialProof: {
        count: 1247,
        message: 'students claimed this offer in the last 24 hours',
      },
      riskReversal: [
        '100% Money-back guarantee',
        'Cancel anytime within 7 days',
        'No hidden fees or charges',
      ],
    },
    {
      id: 'free-consultation',
      type: 'consultation',
      headline: 'Before You Go... Get Expert Guidance',
      subheadline:
        'Free 30-minute consultation with our NEET experts to plan your success strategy',
      offerDetails: {
        consultationDetails: '30-minute personalized session worth ₹2000 - completely FREE',
      },
      cta: {
        primary: 'Book Free Consultation',
        secondary: 'Continue browsing',
      },
      validFor: 'Today only',
      urgencyLevel: 'medium',
      personalizedElements: [
        'Personalized study plan based on your profile',
        'Expert advice on course selection',
      ],
      visual: {
        icon: <Users className="w-8 h-8" />,
        gradient: 'from-green-600 to-blue-500',
        accentColor: 'emerald',
      },
      socialProof: {
        count: 2847,
        message: 'students have taken free consultations',
      },
      riskReversal: [
        'Completely free with no obligations',
        'Get instant expert advice',
        'Available today only',
      ],
    },
    {
      id: 'trial-access',
      type: 'trial',
      headline: 'Try Before You Decide',
      subheadline: 'Get 7-day free access to our premium NEET course content',
      offerDetails: {
        bonusValue: '7-day premium access worth ₹5000',
      },
      cta: {
        primary: 'Start Free Trial',
        secondary: "No, I'll decide later",
      },
      validFor: '24 hours',
      urgencyLevel: 'low',
      personalizedElements: [
        'Experience our teaching methodology',
        'Access to practice tests and study materials',
      ],
      visual: {
        icon: <Trophy className="w-8 h-8" />,
        gradient: 'from-purple-500 to-indigo-500',
        accentColor: 'purple',
      },
      socialProof: {
        count: 892,
        message: 'students started their free trial this week',
      },
      riskReversal: ['No payment required', 'Cancel anytime', 'Full access to premium features'],
    },
    {
      id: 'urgency-offer',
      type: 'urgency',
      headline: 'Only 7 Seats Left in This Batch!',
      subheadline: 'Join the last few spots in our most successful NEET batch',
      offerDetails: {
        urgencyMessage: "Batch starts in 3 days - Don't miss out!",
      },
      cta: {
        primary: 'Secure My Seat Now',
        secondary: "I'll check other options",
      },
      validFor: 'Until batch fills up',
      urgencyLevel: 'high',
      personalizedElements: [
        '94.2% success rate in this batch',
        'Perfect timing for your NEET preparation',
      ],
      visual: {
        icon: <Target className="w-8 h-8" />,
        gradient: 'bg-orange-600',
        accentColor: 'orange',
      },
      socialProof: {
        count: 156,
        message: 'students enrolled in this batch',
      },
      riskReversal: [
        'Guaranteed seat in next batch if unsatisfied',
        '30-day money-back guarantee',
        'Proven track record',
      ],
    },
  ]

  // Select best offer based on user profile and time on page
  useEffect(() => {
    if (timeOnPage > delayBeforeShow && !selectedOffer) {
      let bestOffer = exitIntentOffers[0] // Default to discount offer

      // Select based on time on page
      if (timeOnPage < 60000) {
        // Less than 1 minute - consultation
        bestOffer = exitIntentOffers.find((o) => o.type === 'consultation') || bestOffer
      } else if (timeOnPage > 180000) {
        // More than 3 minutes - urgency
        bestOffer = exitIntentOffers.find((o) => o.type === 'urgency') || bestOffer
      }

      // Override based on user profile
      if (userProfile.budget?.maxAmount && userProfile.budget.maxAmount < 50000) {
        bestOffer = exitIntentOffers.find((o) => o.type === 'discount') || bestOffer
      }

      setSelectedOffer(bestOffer)
    }
  }, [timeOnPage, userProfile, selectedOffer])

  // Track mouse movement for exit intent
  const handleMouseMove = useCallback((e: MouseEvent) => {
    setMouseY(e.clientY)
  }, [])

  // Track scroll direction
  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY
    if (currentScrollY > lastScrollY) {
      setScrollDirection('down')
    } else {
      setScrollDirection('up')
    }
    setLastScrollY(currentScrollY)
  }, [lastScrollY])

  // Detect exit intent
  const handleMouseLeave = useCallback(
    (e: MouseEvent) => {
      if (
        isEnabled &&
        !hasShown &&
        showCount < maxShowsPerSession &&
        timeOnPage > delayBeforeShow &&
        e.clientY <= 5 &&
        selectedOffer
      ) {
        setIsVisible(true)
        setHasShown(true)
        setShowCount((prev) => prev + 1)

        // Track exit intent trigger
        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('event', 'exit_intent_triggered', {
            event_category: 'engagement',
            event_label: 'mouse_leave',
            time_on_page: timeOnPage,
            offer_type: selectedOffer.type,
          })
        }
      }
    },
    [isEnabled, hasShown, showCount, maxShowsPerSession, timeOnPage, delayBeforeShow, selectedOffer]
  )

  // Detect tab visibility change
  const handleVisibilityChange = useCallback(() => {
    if (
      document.hidden &&
      showOnTabSwitch &&
      isEnabled &&
      !hasShown &&
      showCount < maxShowsPerSession &&
      timeOnPage > delayBeforeShow &&
      selectedOffer
    ) {
      setIsVisible(true)
      setHasShown(true)
      setShowCount((prev) => prev + 1)

      // Track tab switch trigger
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'exit_intent_triggered', {
          event_category: 'engagement',
          event_label: 'tab_switch',
          time_on_page: timeOnPage,
          offer_type: selectedOffer.type,
        })
      }
    }
  }, [
    showOnTabSwitch,
    isEnabled,
    hasShown,
    showCount,
    maxShowsPerSession,
    timeOnPage,
    delayBeforeShow,
    selectedOffer,
  ])

  // Detect aggressive scroll up
  const handleScrollUp = useCallback(() => {
    if (
      showOnScrollUp &&
      scrollDirection === 'up' &&
      window.scrollY < 100 &&
      isEnabled &&
      !hasShown &&
      showCount < maxShowsPerSession &&
      timeOnPage > delayBeforeShow &&
      selectedOffer
    ) {
      setIsVisible(true)
      setHasShown(true)
      setShowCount((prev) => prev + 1)

      // Track scroll up trigger
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'exit_intent_triggered', {
          event_category: 'engagement',
          event_label: 'scroll_up',
          time_on_page: timeOnPage,
          offer_type: selectedOffer.type,
        })
      }
    }
  }, [
    showOnScrollUp,
    scrollDirection,
    isEnabled,
    hasShown,
    showCount,
    maxShowsPerSession,
    timeOnPage,
    delayBeforeShow,
    selectedOffer,
  ])

  // Add event listeners
  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('visibilitychange', handleVisibilityChange)
    window.addEventListener('scroll', handleScroll)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [handleMouseMove, handleMouseLeave, handleVisibilityChange, handleScroll])

  // Check for scroll up pattern
  useEffect(() => {
    if (scrollDirection === 'up' && window.scrollY < 100) {
      handleScrollUp()
    }
  }, [scrollDirection, handleScrollUp])

  const handlePrimaryAction = async () => {
    if (!selectedOffer) return

    // Track conversion
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'exit_intent_conversion', {
        event_category: 'conversion',
        event_label: selectedOffer.type,
        value: selectedOffer.offerDetails.discount || 1,
        offer_id: selectedOffer.id,
      })
    }

    // Handle different offer types
    switch (selectedOffer.type) {
      case 'discount':
        // Redirect to enrollment with discount code
        window.location.href = '/enroll?discount=EXIT25'
        break
      case 'consultation':
        // Open WhatsApp or booking form
        await trackAndOpenWhatsApp({
          source: 'exit-intent-popup',
          message: 'Hi! I saw your exit intent offer and would like to book a free consultation.',
          campaign: 'exit-intent',
        })
        break
      case 'trial':
        // Redirect to trial signup
        window.location.href = '/trial-signup'
        break
      case 'urgency':
        // Redirect to enrollment
        window.location.href = '/enroll?urgency=true'
        break
    }

    setIsVisible(false)
  }

  const handleSecondaryAction = () => {
    setIsVisible(false)

    // Track dismissal
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'exit_intent_dismissed', {
        event_category: 'engagement',
        event_label: 'secondary_action',
        offer_type: selectedOffer?.type || 'unknown',
      })
    }
  }

  const handleClose = () => {
    setIsVisible(false)

    // Track close
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'exit_intent_dismissed', {
        event_category: 'engagement',
        event_label: 'close_button',
        offer_type: selectedOffer?.type || 'unknown',
      })
    }
  }

  if (!isVisible || !selectedOffer) {
    return null
  }

  const getPositionClasses = () => {
    switch (position) {
      case 'center':
        return 'items-center justify-center'
      case 'top':
        return 'items-start justify-center pt-12'
      case 'bottom':
        return 'items-end justify-center pb-12'
      default:
        return 'items-center justify-center'
    }
  }

  const getUrgencyAnimation = () => {
    switch (selectedOffer.urgencyLevel) {
      case 'critical':
        return 'animate-pulse'
      case 'high':
        return 'animate-bounce'
      default:
        return ''
    }
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className={`fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm z-50 flex ${getPositionClasses()} p-4`}
        onClick={handleClose}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 50 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="relative max-w-lg w-full mx-4 sm:mx-0 bg-white rounded-2xl shadow-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 z-10 p-2 bg-white/80 rounded-full hover:bg-white transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>

          {/* Header with solid indigo */}
          <div
            className="bg-indigo-500 p-4 sm:p-6 text-white relative overflow-hidden"
          >
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-white/20 rounded-full">{selectedOffer.visual.icon}</div>
                <div>
                  <h2 className="text-2xl font-bold leading-tight">{selectedOffer.headline}</h2>
                </div>
              </div>

              <p className="text-lg text-white/90 leading-relaxed">{selectedOffer.subheadline}</p>

              {/* Urgency indicator */}
              {selectedOffer.urgencyLevel === 'critical' && (
                <div className="flex items-center gap-2 mt-3 bg-white/20 rounded-lg p-2">
                  <Timer className={`w-4 h-4 ${getUrgencyAnimation()}`} />
                  <span className="text-sm font-medium">
                    {selectedOffer.offerDetails.urgencyMessage}
                  </span>
                </div>
              )}
            </div>

            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12" />
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Offer details */}
            <div className="text-center">
              {selectedOffer.offerDetails.discount && (
                <div className="mb-4">
                  <div className="text-4xl font-bold text-gray-900 mb-1">
                    {selectedOffer.offerDetails.discount}% OFF
                  </div>
                  <div className="text-lg text-gray-600">
                    Save ₹
                    {Math.floor(
                      (75000 * selectedOffer.offerDetails.discount) / 100
                    ).toLocaleString()}
                  </div>
                </div>
              )}

              {selectedOffer.offerDetails.bonusValue && (
                <div className="text-2xl font-bold text-green-600 mb-2">
                  {selectedOffer.offerDetails.bonusValue}
                </div>
              )}

              {selectedOffer.offerDetails.consultationDetails && (
                <div className="text-lg text-gray-700 mb-2">
                  {selectedOffer.offerDetails.consultationDetails}
                </div>
              )}
            </div>

            {/* Personalized elements */}
            <div className="space-y-2">
              {selectedOffer.personalizedElements.map((element, index) => (
                <div key={index} className="flex items-center gap-2 text-gray-700">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span>{element}</span>
                </div>
              ))}
            </div>

            {/* Social proof */}
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <div className="flex items-center justify-center gap-2 text-gray-700">
                <Users className="w-5 h-5 text-green-600" />
                <span className="font-semibold">
                  {selectedOffer.socialProof.count.toLocaleString()}
                </span>
                <span>{selectedOffer.socialProof.message}</span>
              </div>
            </div>

            {/* Risk reversal */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Shield className="w-5 h-5 text-green-600" />
                100% Risk-Free Guarantee
              </h4>
              <div className="space-y-2">
                {selectedOffer.riskReversal.map((item, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action buttons */}
            <div className="space-y-3">
              <motion.button
                onClick={handlePrimaryAction}
                className="w-full py-4 px-6 bg-gray-900 hover:bg-gray-300 text-white hover:text-gray-900 font-bold text-lg rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {selectedOffer.visual.icon}
                {selectedOffer.cta.primary}
                <ArrowRight className="w-5 h-5" />
              </motion.button>

              {selectedOffer.cta.secondary && (
                <button
                  onClick={handleSecondaryAction}
                  className="w-full py-3 px-6 text-gray-600 hover:text-gray-800 font-medium transition-colors"
                >
                  {selectedOffer.cta.secondary}
                </button>
              )}
            </div>

            {/* Validity */}
            <div className="text-center">
              <div className="inline-flex items-center gap-2 text-sm text-gray-500 bg-gray-100 rounded-full px-4 py-2">
                <Clock className="w-4 h-4" />
                <span>Valid for {selectedOffer.validFor}</span>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default ExitIntentPopup
