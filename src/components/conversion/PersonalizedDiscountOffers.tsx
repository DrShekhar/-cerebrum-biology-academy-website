'use client'

import React, { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Gift,
  Percent,
  Clock,
  Star,
  Target,
  TrendingUp,
  Award,
  Users,
  Zap,
  CheckCircle,
  X,
  Copy,
  Share2,
  Sparkles,
  Crown,
  Heart,
  BookOpen,
  MapPin,
  Calendar,
  Timer,
} from 'lucide-react'
import { CourseSelectionData } from '@/hooks/useCourseSelectorState'

interface DiscountOffer {
  id: string
  type:
    | 'early-bird'
    | 'merit'
    | 'financial'
    | 'loyalty'
    | 'location'
    | 'referral'
    | 'limited-time'
    | 'first-time'
  title: string
  description: string
  discountAmount: number
  discountPercentage: number
  code: string
  validUntil: Date
  eligibilityReasons: string[]
  conditions: string[]
  maxSavings: number
  urgencyLevel: 'low' | 'medium' | 'high' | 'critical'
  personalizedMessage: string
  icon: React.ReactNode
  color: {
    primary: string
    secondary: string
    background: string
    border: string
  }
  badge?: string
  isExclusive?: boolean
  claimLimit?: number
  claimedCount?: number
}

interface PersonalizedDiscountOffersProps {
  userProfile: CourseSelectionData
  courseId?: string
  courseName?: string
  coursePrice?: number
  position?: 'overlay' | 'inline' | 'sidebar'
  showOnlyTopOffer?: boolean
  autoShowAfterDelay?: number
}

const PersonalizedDiscountOffers: React.FC<PersonalizedDiscountOffersProps> = ({
  userProfile,
  courseId,
  courseName = 'NEET Biology Course',
  coursePrice = 75000,
  position = 'overlay',
  showOnlyTopOffer = false,
  autoShowAfterDelay = 10000,
}) => {
  const [visibleOffers, setVisibleOffers] = useState<DiscountOffer[]>([])
  const [showOffers, setShowOffers] = useState(false)
  const [claimedOffers, setClaimedOffers] = useState<Set<string>>(new Set())
  const [copiedCode, setCopiedCode] = useState<string | null>(null)

  // Generate personalized discount offers based on user profile
  const personalizedOffers = useMemo((): DiscountOffer[] => {
    const offers: DiscountOffer[] = []
    const now = new Date()

    // Early Bird Offer (if within first 7 days of course launch)
    if (Math.random() > 0.3) {
      // 70% chance
      offers.push({
        id: 'early-bird-2024',
        type: 'early-bird',
        title: 'Early Bird Special',
        description: 'Limited time offer for early enrollments',
        discountAmount: 15000,
        discountPercentage: 20,
        code: 'EARLY2024',
        validUntil: new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000), // 3 days
        eligibilityReasons: ['New student enrollment', 'Course launch period'],
        conditions: ['Valid for first-time students', 'Cannot be combined with other offers'],
        maxSavings: 15000,
        urgencyLevel: 'high',
        personalizedMessage: `${userProfile.personalInfo?.name || 'You'} are eligible for our exclusive early bird discount!`,
        icon: <Sparkles className="w-6 h-6" />,
        color: {
          primary: 'text-purple-600',
          secondary: 'text-purple-800',
          background: 'bg-purple-50',
          border: 'border-purple-200',
        },
        badge: 'LIMITED TIME',
        isExclusive: true,
        claimLimit: 100,
        claimedCount: 73,
      })
    }

    // Merit-based Scholarship (if target score is high)
    if (userProfile.goals?.targetScore && userProfile.goals.targetScore >= 600) {
      offers.push({
        id: 'merit-scholarship',
        type: 'merit',
        title: 'High Achiever Scholarship',
        description: 'Special scholarship for ambitious students',
        discountAmount: 18750,
        discountPercentage: 25,
        code: 'MERIT25',
        validUntil: new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000), // 7 days
        eligibilityReasons: [
          `Target score of ${userProfile.goals.targetScore} shows high ambition`,
          'Dedicated to achieving top ranks',
        ],
        conditions: [
          'Minimum target score 600+',
          'Academic performance verification may be required',
        ],
        maxSavings: 18750,
        urgencyLevel: 'medium',
        personalizedMessage: `Your target score of ${userProfile.goals.targetScore} qualifies you for our merit scholarship!`,
        icon: <Award className="w-6 h-6" />,
        color: {
          primary: 'text-yellow-600',
          secondary: 'text-yellow-800',
          background: 'bg-yellow-50',
          border: 'border-yellow-200',
        },
        badge: 'MERIT BASED',
        isExclusive: true,
        claimLimit: 50,
        claimedCount: 23,
      })
    }

    // Financial Support (if budget is limited)
    if (userProfile.budget?.maxAmount && userProfile.budget.maxAmount < coursePrice) {
      const supportPercentage = Math.min(
        30,
        Math.floor(((coursePrice - userProfile.budget.maxAmount) / coursePrice) * 40)
      )
      offers.push({
        id: 'financial-support',
        type: 'financial',
        title: 'Financial Support Offer',
        description: 'Making quality education accessible',
        discountAmount: (coursePrice * supportPercentage) / 100,
        discountPercentage: supportPercentage,
        code: 'SUPPORT2024',
        validUntil: new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000), // 14 days
        eligibilityReasons: [
          'Budget-conscious student',
          'Committed to education despite financial constraints',
        ],
        conditions: ['Income verification may be required', 'One-time offer per student'],
        maxSavings: (coursePrice * supportPercentage) / 100,
        urgencyLevel: 'medium',
        personalizedMessage: `We understand your budget constraints and want to help you achieve your dreams!`,
        icon: <Heart className="w-6 h-6" />,
        color: {
          primary: 'text-emerald-600',
          secondary: 'text-emerald-800',
          background: 'bg-emerald-50',
          border: 'border-emerald-200',
        },
        badge: 'NEED BASED',
        claimLimit: 30,
        claimedCount: 18,
      })
    }

    // Location-based Offer
    if (userProfile.location?.city) {
      const tier1Cities = ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Hyderabad', 'Kota']
      const isTier1 = tier1Cities.includes(userProfile.location.city)

      offers.push({
        id: 'location-special',
        type: 'location',
        title: `${userProfile.location.city} Special Offer`,
        description: isTier1 ? 'Metropolitan city special discount' : 'Regional support discount',
        discountAmount: isTier1 ? 7500 : 11250,
        discountPercentage: isTier1 ? 10 : 15,
        code: `${userProfile.location.city.toUpperCase()}2024`,
        validUntil: new Date(now.getTime() + 5 * 24 * 60 * 60 * 1000), // 5 days
        eligibilityReasons: [
          `Special offer for ${userProfile.location.city} students`,
          isTier1 ? 'Metropolitan city support' : 'Regional development initiative',
        ],
        conditions: [
          'Valid for students from specified location',
          'Location verification required',
        ],
        maxSavings: isTier1 ? 7500 : 11250,
        urgencyLevel: 'low',
        personalizedMessage: `Exclusive offer for students from ${userProfile.location.city}!`,
        icon: <MapPin className="w-6 h-6" />,
        color: {
          primary: 'text-blue-600',
          secondary: 'text-blue-800',
          background: 'bg-blue-50',
          border: 'border-blue-200',
        },
        badge: 'LOCATION SPECIAL',
      })
    }

    // First-time Student Offer
    if (!localStorage.getItem('returning_user')) {
      offers.push({
        id: 'first-time-student',
        type: 'first-time',
        title: 'Welcome Bonus',
        description: 'Special discount for new students',
        discountAmount: 9000,
        discountPercentage: 12,
        code: 'WELCOME12',
        validUntil: new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000), // 2 days
        eligibilityReasons: ['First-time student at Cerebrum', 'Welcome to our learning community'],
        conditions: ['New students only', 'One-time offer'],
        maxSavings: 9000,
        urgencyLevel: 'medium',
        personalizedMessage: "Welcome to Cerebrum! Here's a special discount to get you started.",
        icon: <Gift className="w-6 h-6" />,
        color: {
          primary: 'text-pink-600',
          secondary: 'text-pink-800',
          background: 'bg-pink-50',
          border: 'border-pink-200',
        },
        badge: 'WELCOME OFFER',
        claimLimit: 200,
        claimedCount: 156,
      })
    }

    // Time-sensitive Flash Offer
    if (Math.random() > 0.6) {
      // 40% chance
      offers.push({
        id: 'flash-offer',
        type: 'limited-time',
        title: 'Flash Sale - 2 Hours Only!',
        description: 'Surprise discount ending soon',
        discountAmount: 12000,
        discountPercentage: 16,
        code: 'FLASH16',
        validUntil: new Date(now.getTime() + 2 * 60 * 60 * 1000), // 2 hours
        eligibilityReasons: [
          'Lucky timing - you caught our flash sale!',
          'Limited quantity available',
        ],
        conditions: ['Valid for next 2 hours only', 'Limited to first 25 students'],
        maxSavings: 12000,
        urgencyLevel: 'critical',
        personalizedMessage: "You're lucky! You caught our surprise flash sale!",
        icon: <Zap className="w-6 h-6" />,
        color: {
          primary: 'text-red-600',
          secondary: 'text-red-800',
          background: 'bg-red-50',
          border: 'border-red-200',
        },
        badge: 'FLASH SALE',
        isExclusive: true,
        claimLimit: 25,
        claimedCount: 19,
      })
    }

    // Sort by urgency and discount amount
    return offers.sort((a, b) => {
      const urgencyOrder = { critical: 4, high: 3, medium: 2, low: 1 }
      const urgencyDiff = urgencyOrder[b.urgencyLevel] - urgencyOrder[a.urgencyLevel]
      if (urgencyDiff !== 0) return urgencyDiff
      return b.discountAmount - a.discountAmount
    })
  }, [userProfile, coursePrice])

  // Auto-show offers after delay
  useEffect(() => {
    if (autoShowAfterDelay && personalizedOffers.length > 0) {
      const timer = setTimeout(() => {
        setShowOffers(true)
      }, autoShowAfterDelay)

      return () => clearTimeout(timer)
    }
  }, [autoShowAfterDelay, personalizedOffers])

  // Set visible offers
  useEffect(() => {
    if (showOnlyTopOffer) {
      setVisibleOffers(personalizedOffers.slice(0, 1))
    } else {
      setVisibleOffers(personalizedOffers.slice(0, 3))
    }
  }, [personalizedOffers, showOnlyTopOffer])

  const handleClaimOffer = (offer: DiscountOffer) => {
    setClaimedOffers((prev) => new Set([...prev, offer.id]))

    // Track offer claim
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'discount_offer_claimed', {
        event_category: 'conversion',
        event_label: offer.type,
        value: offer.discountAmount,
        custom_parameters: {
          offer_id: offer.id,
          discount_percentage: offer.discountPercentage,
          urgency_level: offer.urgencyLevel,
        },
      })
    }

    // Simulate enrollment process
    alert(`Offer claimed! Code: ${offer.code}\nRedirect to enrollment page...`)
  }

  const copyDiscountCode = (code: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(code)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  const formatTimeRemaining = (validUntil: Date) => {
    const now = new Date()
    const diff = validUntil.getTime() - now.getTime()

    if (diff <= 0) return 'Expired'

    const hours = Math.floor(diff / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))

    if (hours > 24) {
      const days = Math.floor(hours / 24)
      return `${days} day${days > 1 ? 's' : ''}`
    }

    if (hours > 0) {
      return `${hours}h ${minutes}m`
    }

    return `${minutes}m`
  }

  const getUrgencyPulse = (urgencyLevel: string) => {
    switch (urgencyLevel) {
      case 'critical':
        return 'animate-pulse'
      case 'high':
        return 'animate-bounce'
      default:
        return ''
    }
  }

  if (!showOffers || visibleOffers.length === 0) {
    return null
  }

  const renderOfferCard = (offer: DiscountOffer, index: number) => {
    const isClaimed = claimedOffers.has(offer.id)
    const timeRemaining = formatTimeRemaining(offer.validUntil)
    const isExpired = new Date() > offer.validUntil

    return (
      <motion.div
        key={offer.id}
        initial={{ opacity: 0, y: 20, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0.9 }}
        transition={{ delay: index * 0.1 }}
        className={`
          relative overflow-hidden rounded-2xl border-2 shadow-lg backdrop-blur-sm
          ${offer.color.background} ${offer.color.border}
          ${offer.urgencyLevel === 'critical' ? 'ring-2 ring-red-300' : ''}
          ${getUrgencyPulse(offer.urgencyLevel)}
        `}
      >
        {/* Badge */}
        {offer.badge && (
          <div className="absolute top-4 right-4 z-10">
            <span
              className={`
              px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide
              ${
                offer.urgencyLevel === 'critical'
                  ? 'bg-red-500 text-white'
                  : offer.urgencyLevel === 'high'
                    ? 'bg-orange-500 text-white'
                    : 'bg-gray-800 text-white'
              }
            `}
            >
              {offer.badge}
            </span>
          </div>
        )}

        {/* Exclusive ribbon */}
        {offer.isExclusive && (
          <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
            <div className="absolute top-3 right-[-32px] w-32 bg-gradient-to-r from-gold-400 to-yellow-500 text-white text-xs font-bold py-1 text-center rotate-45 shadow-lg">
              <Crown className="w-3 h-3 inline mr-1" />
              VIP
            </div>
          </div>
        )}

        <div className="p-6">
          <div className="flex items-start gap-4">
            <div className={`p-3 rounded-xl bg-white ${offer.color.primary} flex-shrink-0`}>
              {offer.icon}
            </div>

            <div className="flex-1">
              <h3 className={`text-xl font-bold ${offer.color.secondary} mb-1`}>{offer.title}</h3>
              <p className="text-gray-600 text-sm mb-3">{offer.description}</p>

              <div className="mb-4">
                <div className="flex items-baseline gap-2">
                  <span className={`text-3xl font-bold ${offer.color.primary}`}>
                    {offer.discountPercentage}% OFF
                  </span>
                  <span className="text-lg font-semibold text-gray-700">
                    Save ₹{offer.discountAmount.toLocaleString()}
                  </span>
                </div>
                <div className="text-sm text-gray-600 mt-1">{offer.personalizedMessage}</div>
              </div>

              {/* Eligibility reasons */}
              <div className="mb-4">
                <div className="text-sm font-medium text-gray-700 mb-2">Why you qualify:</div>
                <div className="space-y-1">
                  {offer.eligibilityReasons.map((reason, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                      <span>{reason}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Time remaining */}
              <div className="flex items-center gap-2 mb-4">
                <Timer
                  className={`w-4 h-4 ${timeRemaining === 'Expired' ? 'text-red-500' : offer.color.primary}`}
                />
                <span
                  className={`text-sm font-medium ${timeRemaining === 'Expired' ? 'text-red-500' : offer.color.secondary}`}
                >
                  {timeRemaining === 'Expired' ? 'Offer Expired' : `Expires in ${timeRemaining}`}
                </span>
              </div>

              {/* Claim limit progress */}
              {offer.claimLimit && offer.claimedCount && (
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Claimed</span>
                    <span>
                      {offer.claimedCount}/{offer.claimLimit}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <motion.div
                      className={`h-2 rounded-full ${offer.urgencyLevel === 'critical' ? 'bg-red-500' : 'bg-emerald-500'}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${(offer.claimedCount / offer.claimLimit) * 100}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                    />
                  </div>
                </div>
              )}

              {/* Discount code */}
              <div className="mb-4">
                <div className="flex items-center gap-2 p-3 bg-white border border-gray-200 rounded-lg">
                  <span className="text-sm text-gray-600">Code:</span>
                  <span className="font-mono font-bold text-gray-900 flex-1">{offer.code}</span>
                  <button
                    onClick={() => copyDiscountCode(offer.code)}
                    className="p-1 hover:bg-gray-100 rounded transition-colors"
                  >
                    {copiedCode === offer.code ? (
                      <CheckCircle className="w-4 h-4 text-emerald-500" />
                    ) : (
                      <Copy className="w-4 h-4 text-gray-500" />
                    )}
                  </button>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex gap-3">
                <motion.button
                  onClick={() => handleClaimOffer(offer)}
                  disabled={isClaimed || isExpired}
                  className={`
                    flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-semibold text-sm transition-all
                    ${
                      isClaimed
                        ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                        : isExpired
                          ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                          : 'bg-gradient-to-r from-emerald-600 to-blue-600 text-white hover:from-emerald-700 hover:to-blue-700 shadow-lg hover:shadow-xl'
                    }
                  `}
                  whileHover={!isClaimed && !isExpired ? { scale: 1.02 } : {}}
                  whileTap={!isClaimed && !isExpired ? { scale: 0.98 } : {}}
                >
                  {isClaimed ? (
                    <>
                      <CheckCircle className="w-4 h-4" />
                      Claimed
                    </>
                  ) : isExpired ? (
                    <>
                      <X className="w-4 h-4" />
                      Expired
                    </>
                  ) : (
                    <>
                      <Gift className="w-4 h-4" />
                      Claim Offer
                    </>
                  )}
                </motion.button>

                <button
                  onClick={() => {
                    /* Share offer */
                  }}
                  className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Share2 className="w-4 h-4 text-gray-600" />
                </button>
              </div>

              {/* Conditions */}
              <details className="mt-4">
                <summary className="text-xs text-gray-500 cursor-pointer hover:text-gray-700">
                  Terms & Conditions
                </summary>
                <div className="mt-2 text-xs text-gray-500 space-y-1">
                  {offer.conditions.map((condition, idx) => (
                    <div key={idx}>• {condition}</div>
                  ))}
                </div>
              </details>
            </div>
          </div>
        </div>
      </motion.div>
    )
  }

  if (position === 'overlay') {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          className="max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        >
          <div className="relative">
            <button
              onClick={() => setShowOffers(false)}
              className="absolute top-4 right-4 z-10 p-2 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-colors"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>

            <AnimatePresence>
              {visibleOffers.map((offer, index) => renderOfferCard(offer, index))}
            </AnimatePresence>
          </div>
        </motion.div>
      </motion.div>
    )
  }

  return (
    <div className="space-y-6">
      <AnimatePresence>
        {visibleOffers.map((offer, index) => renderOfferCard(offer, index))}
      </AnimatePresence>
    </div>
  )
}

export default PersonalizedDiscountOffers
