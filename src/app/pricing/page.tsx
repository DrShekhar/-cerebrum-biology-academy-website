'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import {
  CheckCircleIcon,
  XCircleIcon,
  SparklesIcon,
  AcademicCapIcon,
  ClockIcon,
  UserGroupIcon,
  BeakerIcon,
  TrophyIcon,
  CalendarIcon,
  ShieldCheckIcon,
  CreditCardIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
  ChevronDownIcon,
} from '@heroicons/react/24/outline'
import { Button } from '@/components/ui/Button'
import { motion } from 'framer-motion'
import {
  allClassPricing,
  addOnCourses,
  type ClassLevel,
  type CourseType,
  type TierLevel,
  type PricingTier,
  type ClassPricing,
} from '@/data/pricing'

const PaymentOptionsDisplay = dynamic(
  () =>
    import('@/components/pricing/PaymentOptionsDisplay').then((mod) => mod.PaymentOptionsDisplay),
  { ssr: false }
)

export default function PricingPage() {
  const [selectedClass, setSelectedClass] = useState<ClassLevel | 'all'>('all')
  const [courseType, setCourseType] = useState<CourseType>('board-neet')
  const [paymentMode, setPaymentMode] = useState<
    'lumpSum' | 'twoInstallments' | 'threeInstallments'
  >('lumpSum')
  const [searchQuery, setSearchQuery] = useState('')
  const [expandedTier, setExpandedTier] = useState<string | null>(null)
  const [expandedFeatures, setExpandedFeatures] = useState<Set<string>>(new Set())

  // Stats counter animation
  const [stats, setStats] = useState({ courses: 0, tiers: 0, success: 0 })
  const statsRef = React.useRef<HTMLDivElement>(null)
  const hasAnimated = React.useRef(false)

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true

            // Animate to target values
            const duration = 1500 // 1.5 seconds
            const frameRate = 1000 / 60 // 60fps
            const totalFrames = duration / frameRate

            let frame = 0
            const timer = setInterval(() => {
              frame++
              const progress = frame / totalFrames

              setStats({
                courses: Math.floor(6 * progress),
                tiers: Math.floor(3 * progress),
                success: Math.floor(98 * progress),
              })

              if (frame >= totalFrames) {
                setStats({ courses: 6, tiers: 3, success: 98 })
                clearInterval(timer)
              }
            }, frameRate)
          }
        })
      },
      { threshold: 0.5 }
    )

    if (statsRef.current) {
      observer.observe(statsRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const currentClassData =
    selectedClass === 'all' ? null : allClassPricing.find((c) => c.class === selectedClass)
  const availableCourseTypes = currentClassData?.availableCourseTypes || ['board-neet']
  const currentTiers = currentClassData?.tiers[courseType] || []

  const effectiveCourseType = availableCourseTypes.includes(courseType)
    ? courseType
    : availableCourseTypes[0]

  React.useEffect(() => {
    if (selectedClass !== 'all' && !availableCourseTypes.includes(courseType)) {
      setCourseType(availableCourseTypes[0])
    }
  }, [selectedClass, availableCourseTypes, courseType])

  const getFilteredClasses = () => {
    if (selectedClass === 'all') {
      return allClassPricing.filter((classData) => {
        const hasCourseType = classData.tiers[courseType] && classData.tiers[courseType].length > 0

        if (!searchQuery && !hasCourseType) return false
        if (!hasCourseType) return false
        if (!searchQuery) return true

        const query = searchQuery.toLowerCase()
        const matchesClassName = classData.displayName.toLowerCase().includes(query)
        const matchesDescription = classData.description.toLowerCase().includes(query)
        const matchesTierName = Object.keys(classData.tiers).some((tier) =>
          tier.toLowerCase().includes(query)
        )
        return matchesClassName || matchesDescription || matchesTierName
      })
    }
    return []
  }

  const filteredClasses = getFilteredClasses()
  const totalTiersCount =
    selectedClass === 'all'
      ? filteredClasses.reduce((sum, classData) => {
          const tiersForCourseType = Object.values(classData.tiers).flat()
          return sum + tiersForCourseType.length
        }, 0)
      : currentTiers.length

  const hasResults = selectedClass === 'all' ? filteredClasses.length > 0 : currentTiers.length > 0

  const clearFilters = () => {
    setSearchQuery('')
    setSelectedClass('all')
    setCourseType('board-neet')
  }

  // Best For descriptions for each tier
  const bestForDescriptions: Record<TierLevel, string> = {
    pinnacle: 'Top rankers seeking premium coaching',
    ascent: 'Serious aspirants with balanced approach',
    pursuit: 'Budget-conscious students seeking quality education',
  }

  const renderTierCard = (tier: PricingTier, classData: ClassPricing) => {
    const isPopular = tier.tier === 'ascent'
    const price = tier.prices[paymentMode]
    const lumpSumPrice = tier.prices.lumpSum
    const savings = paymentMode !== 'lumpSum' ? price - lumpSumPrice : 0
    const tierKey = `${classData.class}-${tier.tier}`
    const isExpanded = expandedTier === tierKey

    const tierColors = {
      pinnacle: {
        bg: 'from-purple-50 to-pink-50',
        textColor: 'text-purple-900',
        badge: 'bg-purple-100 text-purple-700',
        floatingBadge: '👑 BEST FOR TOP RANKERS',
        badgeGradient: 'from-yellow-400 via-yellow-500 to-amber-600',
        borderColor: 'border-purple-200',
      },
      ascent: {
        bg: 'from-blue-50 to-indigo-50',
        textColor: 'text-blue-900',
        badge: 'bg-blue-100 text-blue-700',
        floatingBadge: '🔥 MOST POPULAR',
        badgeGradient: 'from-orange-500 via-red-500 to-pink-600',
        borderColor: 'border-blue-200',
      },
      pursuit: {
        bg: 'from-green-50 to-teal-50',
        textColor: 'text-green-900',
        badge: 'bg-green-100 text-green-700',
        floatingBadge: '💰 BEST VALUE',
        badgeGradient: 'from-green-400 via-emerald-500 to-teal-600',
        borderColor: 'border-green-200',
      },
    }

    const colors = tierColors[tier.tier]

    return (
      <div
        key={tierKey}
        className="group relative bg-white rounded-3xl shadow-xl overflow-visible transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_70px_rgba(0,0,0,0.12)] flex flex-col h-full"
      >
        <div
          className={`absolute -top-3 left-1/2 transform -translate-x-1/2 z-10 px-4 py-2 rounded-full bg-gradient-to-r ${colors.badgeGradient} text-white text-xs font-bold shadow-lg whitespace-nowrap`}
        >
          {colors.floatingBadge}
        </div>
        <div
          className={`bg-gradient-to-r ${colors.bg} ${colors.textColor} p-4 sm:p-6 md:p-8 border-b-2 ${colors.borderColor} rounded-t-3xl`}
        >
          <div className="flex items-center gap-2 mb-4 sm:mb-6 flex-wrap">
            <span
              className={`px-3 sm:px-4 py-1 sm:py-1.5 ${colors.badge} rounded-full text-xs sm:text-sm font-semibold capitalize`}
            >
              {tier.tier}
            </span>
            {isPopular && (
              <span className="px-3 sm:px-4 py-1 sm:py-1.5 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-full text-xs font-bold shadow-md">
                POPULAR
              </span>
            )}
          </div>

          <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 capitalize leading-tight">
            {classData.displayName} - {tier.tier}
          </h3>

          <p className="text-gray-600 text-sm mb-4 sm:mb-6 leading-relaxed">
            {classData.description}
          </p>

          <div className="mb-4 sm:mb-6">
            <div className="space-y-1">
              <div className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                Best For:
              </div>
              <div className="text-sm text-gray-700 leading-relaxed">
                {bestForDescriptions[tier.tier]}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 text-center">
            <div className="bg-white/50 rounded-xl p-2 sm:p-3">
              <div className="text-lg sm:text-2xl font-bold">{classData.duration}</div>
              <div className="text-xs opacity-70 mt-1">Duration</div>
            </div>
            <div className="bg-white/50 rounded-xl p-2 sm:p-3">
              <div className="text-lg sm:text-2xl font-bold">{tier.hours}</div>
              <div className="text-xs opacity-70 mt-1">Per Week</div>
            </div>
            <div className="bg-white/50 rounded-xl p-2 sm:p-3">
              <div className="text-lg sm:text-2xl font-bold">{tier.batchSize}</div>
              <div className="text-xs opacity-70 mt-1">Batch Size</div>
            </div>
            <div className="bg-white/50 rounded-xl p-2 sm:p-3">
              <div className="text-lg sm:text-2xl font-bold text-green-600">
                {tier.tier === 'pinnacle' ? '55' : tier.tier === 'ascent' ? '120' : '160'}
              </div>
              <div className="text-xs opacity-70 mt-1">Enrolled</div>
            </div>
          </div>
        </div>

        <div className="p-4 sm:p-6 md:p-8 flex flex-col flex-grow">
          <div className="text-center mb-6 sm:mb-8">
            <div className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
              ₹{price.toLocaleString()}
            </div>
            <div className="text-sm text-blue-600 font-medium mb-3 sm:mb-4">
              Approx. ₹{Math.round(price / 12).toLocaleString()}/month
            </div>
            <div className="text-sm text-gray-500 line-through mb-2">
              ₹{(price + Math.round(price * 0.05)).toLocaleString()}
            </div>
            <div className="text-xs text-green-600 font-medium">
              Save ₹{Math.round(price * 0.05).toLocaleString()} (5% off)
            </div>
          </div>

          <div className="mb-4 sm:mb-6 flex-grow">
            <h4 className="font-semibold text-gray-900 mb-4 text-base">Key Features:</h4>
            <div className="space-y-3">
              {(expandedFeatures.has(tierKey) ? tier.features : tier.features.slice(0, 3)).map(
                (feature, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircleIcon className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700 leading-relaxed">{feature}</span>
                  </div>
                )
              )}
              {tier.features.length > 3 && (
                <button
                  onClick={() => {
                    const newExpanded = new Set(expandedFeatures)
                    if (newExpanded.has(tierKey)) {
                      newExpanded.delete(tierKey)
                    } else {
                      newExpanded.add(tierKey)
                    }
                    setExpandedFeatures(newExpanded)
                  }}
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1 pt-2 transition-colors"
                >
                  {expandedFeatures.has(tierKey) ? (
                    <>
                      <ChevronDownIcon className="w-4 h-4 rotate-180 transition-transform" />
                      <span>Show less</span>
                    </>
                  ) : (
                    <>
                      <ChevronDownIcon className="w-4 h-4 transition-transform" />
                      <span>+{tier.features.length - 3} more features</span>
                    </>
                  )}
                </button>
              )}
            </div>
          </div>

          <button
            onClick={() => setExpandedTier(isExpanded ? null : tierKey)}
            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 rounded-xl mb-6 transition-colors flex items-center justify-center gap-2"
          >
            <span>View Payment Options</span>
            <ChevronDownIcon
              className={`w-5 h-5 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
            />
          </button>

          {isExpanded && (
            <div className="mb-6 animate-fadeIn">
              <PaymentOptionsDisplay
                lumpSum={tier.prices.lumpSum}
                twoInstallments={tier.prices.twoInstallments}
                threeInstallments={tier.prices.threeInstallments}
                tierName={tier.tier}
              />
            </div>
          )}

          <div className="grid grid-cols-2 gap-4 mb-6">
            <Link href={`/courses#${classData.class}`}>
              <button className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-3 rounded-xl transition-all duration-200 hover:shadow-lg">
                View Details
              </button>
            </Link>
            <Link href={`/demo-booking?tier=${tier.tier}&class=${classData.class}`}>
              <button
                className={`w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-3 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 hover:shadow-xl`}
              >
                Enroll Now
              </button>
            </Link>
          </div>

          <Link href="/demo-booking">
            <button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-xl transition-all duration-200 hover:shadow-xl mb-6">
              Book Free Demo Class
            </button>
          </Link>

          <div className="flex items-center justify-center gap-4 text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-gray-400"></div>
              <span>Online</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-gray-400"></div>
              <span>Offline</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-gray-400"></div>
              <span>Hybrid</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 overflow-x-hidden">
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-purple-700 text-white py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 sm:px-6 py-2 sm:py-3 mb-4 sm:mb-6">
              <ShieldCheckIcon className="w-4 sm:w-5 h-4 sm:h-5" />
              <span className="font-semibold text-xs sm:text-sm">
                Trusted by 5,000+ NEET aspirants
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 sm:mb-6 leading-tight px-4">
              Master NEET Biology
              <br />
              <span className="bg-gradient-to-r from-yellow-300 via-yellow-200 to-yellow-300 bg-clip-text text-transparent">
                With India&apos;s Best Faculty
              </span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-blue-100 max-w-3xl mx-auto px-4">
              Small batches, personalized attention, and proven results. Choose your path to medical
              college success.
            </p>
          </div>

          <div
            ref={statsRef}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 max-w-5xl mx-auto"
          >
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-4 sm:p-6 text-center">
              <div className="text-3xl sm:text-4xl font-bold mb-2">{stats.courses}</div>
              <div className="text-blue-100 text-xs sm:text-sm">Course Programs</div>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-4 sm:p-6 text-center">
              <div className="text-3xl sm:text-4xl font-bold mb-2">{stats.tiers}</div>
              <div className="text-blue-100 text-xs sm:text-sm">Learning Tiers</div>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-4 sm:p-6 text-center">
              <div className="text-3xl sm:text-4xl font-bold mb-2">{stats.success}%</div>
              <div className="text-blue-100 text-xs sm:text-sm">NEET Qualified 2024</div>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-4 sm:p-6 text-center">
              <div className="text-3xl sm:text-4xl font-bold mb-2">7-Day</div>
              <div className="text-blue-100 text-xs sm:text-sm">Money-Back Guarantee</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <div className="sticky top-0 z-20 bg-gradient-to-br from-blue-50 via-white to-purple-50 pb-3 sm:pb-4 pt-2 shadow-sm">
          <div className="mb-4 sm:mb-6">
            <div className="relative max-w-2xl mx-auto">
              <MagnifyingGlassIcon className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 w-4 sm:w-5 h-4 sm:h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search courses by class, tier, or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 sm:pl-12 pr-10 sm:pr-12 py-3 sm:py-4 rounded-xl sm:rounded-2xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none focus:shadow-[0_0_0_4px_rgba(59,130,246,0.1)] text-sm sm:text-base text-gray-700 shadow-sm transition-shadow duration-200"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <XMarkIcon className="w-4 sm:w-5 h-4 sm:h-5" />
                </button>
              )}
            </div>
          </div>

          <div className="mb-6 sm:mb-8 relative">
            {/* Scroll indicators */}
            <div className="absolute left-0 top-0 bottom-2 w-8 bg-gradient-to-r from-blue-50 via-blue-50/80 to-transparent z-10 pointer-events-none sm:hidden" />
            <div className="absolute right-0 top-0 bottom-2 w-8 bg-gradient-to-l from-purple-50 via-purple-50/80 to-transparent z-10 pointer-events-none sm:hidden" />
            <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-hide">
              <div className="flex gap-1.5 sm:gap-2 min-w-min sm:min-w-max px-1 pb-2">
                <button
                  onClick={() => setSelectedClass('all')}
                  className={`relative flex items-center gap-1.5 sm:gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-full font-medium text-xs sm:text-sm transition-colors ${
                    selectedClass === 'all'
                      ? 'text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-50 shadow'
                  }`}
                >
                  {selectedClass === 'all' && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-blue-600 rounded-full shadow-lg"
                      initial={false}
                      transition={{
                        type: 'spring',
                        stiffness: 500,
                        damping: 30,
                      }}
                    />
                  )}
                  <span className="relative z-10 text-base sm:text-lg">🎓</span>
                  <span className="relative z-10">All Classes</span>
                  <span
                    className={`relative z-10 ml-0.5 sm:ml-1 px-1.5 sm:px-2 py-0.5 rounded-full text-xs ${
                      selectedClass === 'all'
                        ? 'bg-white/20 text-white'
                        : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    6
                  </span>
                </button>
                {[
                  { class: 'foundation-9', icon: '🌱', label: 'Class 9th', count: 1 },
                  { class: 'foundation-10', icon: '🍀', label: 'Class 10th', count: 1 },
                  { class: 'class-11', icon: '🎯', label: 'Class 11th', count: 1 },
                  { class: 'class-12', icon: '🏆', label: 'Class 12th', count: 1 },
                  { class: 'dropper', icon: '💪', label: 'Dropper', count: 1 },
                  { class: '2-year', icon: '📚', label: '2-Year', count: 1 },
                ].map((item) => (
                  <button
                    key={item.class}
                    onClick={() => setSelectedClass(item.class as ClassLevel)}
                    className={`relative flex items-center gap-1.5 sm:gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-full font-medium text-xs sm:text-sm transition-colors ${
                      selectedClass === item.class
                        ? 'text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-50 shadow'
                    }`}
                  >
                    {selectedClass === item.class && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 bg-blue-600 rounded-full shadow-lg"
                        initial={false}
                        transition={{
                          type: 'spring',
                          stiffness: 500,
                          damping: 30,
                        }}
                      />
                    )}
                    <span className="relative z-10 text-base sm:text-lg">{item.icon}</span>
                    <span className="relative z-10">{item.label}</span>
                    <span
                      className={`relative z-10 ml-0.5 sm:ml-1 px-1.5 sm:px-2 py-0.5 rounded-full text-xs ${
                        selectedClass === item.class
                          ? 'bg-white/20 text-white'
                          : 'bg-gray-200 text-gray-600'
                      }`}
                    >
                      {item.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-center items-center gap-4 sm:gap-6 mb-6 sm:mb-8">
            <div className="flex items-center gap-2 sm:gap-3">
              <span className="text-xs sm:text-sm font-medium text-gray-700">Focus:</span>
              <div className="flex gap-1.5 sm:gap-2">
                <button
                  onClick={() => setCourseType('board-only')}
                  className={`relative px-4 sm:px-6 py-2 sm:py-3 rounded-full font-medium text-xs sm:text-sm transition-colors ${
                    courseType === 'board-only'
                      ? 'text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-50 shadow'
                  }`}
                >
                  {courseType === 'board-only' && (
                    <motion.div
                      layoutId="focusTab"
                      className="absolute inset-0 bg-blue-600 rounded-full shadow-lg"
                      initial={false}
                      transition={{
                        type: 'spring',
                        stiffness: 500,
                        damping: 30,
                      }}
                    />
                  )}
                  <span className="relative z-10">Board Only</span>
                </button>
                <button
                  onClick={() => setCourseType('board-neet')}
                  className={`relative px-4 sm:px-6 py-2 sm:py-3 rounded-full font-medium text-xs sm:text-sm transition-colors ${
                    courseType === 'board-neet'
                      ? 'text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-50 shadow'
                  }`}
                >
                  {courseType === 'board-neet' && (
                    <motion.div
                      layoutId="focusTab"
                      className="absolute inset-0 bg-blue-600 rounded-full shadow-lg"
                      initial={false}
                      transition={{
                        type: 'spring',
                        stiffness: 500,
                        damping: 30,
                      }}
                    />
                  )}
                  <span className="relative z-10">Board + NEET</span>
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <span className="text-xs sm:text-sm font-medium text-gray-700">Payment:</span>
              <div className="flex gap-1.5 sm:gap-2">
                <button
                  onClick={() => setPaymentMode('lumpSum')}
                  className={`relative px-4 sm:px-6 py-2 sm:py-3 rounded-full font-medium text-xs sm:text-sm transition-colors ${
                    paymentMode === 'lumpSum'
                      ? 'text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-50 shadow'
                  }`}
                >
                  {paymentMode === 'lumpSum' && (
                    <motion.div
                      layoutId="paymentTab"
                      className="absolute inset-0 bg-blue-600 rounded-full shadow-lg"
                      initial={false}
                      transition={{
                        type: 'spring',
                        stiffness: 500,
                        damping: 30,
                      }}
                    />
                  )}
                  <span className="relative z-10">Lump Sum</span>
                </button>
                <button
                  onClick={() => setPaymentMode('twoInstallments')}
                  className={`relative px-4 sm:px-6 py-2 sm:py-3 rounded-full font-medium text-xs sm:text-sm transition-colors ${
                    paymentMode === 'twoInstallments'
                      ? 'text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-50 shadow'
                  }`}
                >
                  {paymentMode === 'twoInstallments' && (
                    <motion.div
                      layoutId="paymentTab"
                      className="absolute inset-0 bg-blue-600 rounded-full shadow-lg"
                      initial={false}
                      transition={{
                        type: 'spring',
                        stiffness: 500,
                        damping: 30,
                      }}
                    />
                  )}
                  <span className="relative z-10">2 Installments</span>
                </button>
                <button
                  onClick={() => setPaymentMode('threeInstallments')}
                  className={`relative px-4 sm:px-6 py-2 sm:py-3 rounded-full font-medium text-xs sm:text-sm transition-colors ${
                    paymentMode === 'threeInstallments'
                      ? 'text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-50 shadow'
                  }`}
                >
                  {paymentMode === 'threeInstallments' && (
                    <motion.div
                      layoutId="paymentTab"
                      className="absolute inset-0 bg-blue-600 rounded-full shadow-lg"
                      initial={false}
                      transition={{
                        type: 'spring',
                        stiffness: 500,
                        damping: 30,
                      }}
                    />
                  )}
                  <span className="relative z-10">3 Installments</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {hasResults && (
          <div className="text-center mb-4 sm:mb-6 px-4">
            <p className="text-sm sm:text-base md:text-lg text-gray-700">
              Showing <span className="font-bold text-blue-600">{totalTiersCount}</span> tiers
              {selectedClass === 'all' ? (
                <>
                  {' '}
                  for <span className="font-bold">All Classes</span>
                  {searchQuery && (
                    <>
                      {' '}
                      matching <span className="font-bold">"{searchQuery}"</span>
                    </>
                  )}
                </>
              ) : (
                <>
                  {' '}
                  for{' '}
                  <span className="font-bold">
                    {currentClassData?.displayName}
                    {availableCourseTypes.length > 1 &&
                      ` - ${courseType === 'board-only' ? 'Board Only' : courseType === 'board-neet' ? 'Board + NEET' : courseType === 'academic' ? 'Academic' : 'NEET'}`}
                  </span>
                </>
              )}
            </p>
          </div>
        )}

        {!hasResults && (
          <div className="text-center py-8 sm:py-12 md:py-16">
            <div className="max-w-md mx-auto px-4">
              <div className="text-gray-400 mb-4 sm:mb-6">
                <svg
                  className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 mx-auto"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">No courses found</h3>
              <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
                We couldn't find any courses matching your search criteria. Try adjusting your
                filters.
              </p>
              <button
                onClick={clearFilters}
                className="px-5 sm:px-6 py-2.5 sm:py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm sm:text-base font-medium rounded-lg transition-colors"
              >
                Clear Filters
              </button>
            </div>
          </div>
        )}

        {selectedClass === 'all' && hasResults ? (
          <div className="space-y-10 sm:space-y-12 md:space-y-16">
            {filteredClasses.map((classData) => {
              const allTiers = (classData.tiers[courseType] || []).map((tier) => ({
                ...tier,
                courseType: courseType,
              }))

              return (
                <div key={classData.class}>
                  <div className="mb-4 sm:mb-6 px-2">
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                      {classData.displayName}
                    </h2>
                    <p className="text-sm sm:text-base text-gray-600">{classData.description}</p>
                  </div>
                  <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 md:gap-8 pt-4 sm:pt-6 auto-rows-fr">
                    {allTiers.map((tier) => renderTierCard(tier, classData))}
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          hasResults && (
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-10 sm:mb-12 md:mb-16 pt-4 sm:pt-6 auto-rows-fr">
              {currentTiers.map((tier) =>
                currentClassData ? renderTierCard(tier, currentClassData) : null
              )}
            </div>
          )
        )}

        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl p-4 sm:p-6 md:p-8 mb-10 sm:mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8">
            Tier Comparison
          </h2>

          {/* Mobile Card View */}
          <div className="md:hidden space-y-4">
            {[
              {
                name: 'Pinnacle',
                color: 'purple',
                badge: '👑 Premium',
                batchSize: '10-12',
                hours: '5-6 hrs',
                attention: 'Maximum',
                mentorship: true,
                oneOnOne: true,
                bestFor: 'Top rankers seeking premium coaching',
              },
              {
                name: 'Ascent',
                color: 'blue',
                badge: '🔥 Popular',
                batchSize: '16-25',
                hours: '4-5 hrs',
                attention: 'High',
                mentorship: true,
                oneOnOne: true,
                bestFor: 'Serious aspirants with balanced approach',
              },
              {
                name: 'Pursuit',
                color: 'green',
                badge: '💰 Value',
                batchSize: '30-40',
                hours: '3-4 hrs',
                attention: 'Good',
                mentorship: false,
                oneOnOne: false,
                bestFor: 'Budget-conscious students seeking quality',
              },
            ].map((tier) => (
              <div
                key={tier.name}
                className={`border-2 rounded-2xl p-4 ${
                  tier.color === 'purple'
                    ? 'border-purple-200 bg-purple-50/50'
                    : tier.color === 'blue'
                      ? 'border-blue-200 bg-blue-50/50'
                      : 'border-green-200 bg-green-50/50'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3
                    className={`text-lg font-bold ${
                      tier.color === 'purple'
                        ? 'text-purple-700'
                        : tier.color === 'blue'
                          ? 'text-blue-700'
                          : 'text-green-700'
                    }`}
                  >
                    {tier.name}
                  </h3>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      tier.color === 'purple'
                        ? 'bg-purple-100 text-purple-700'
                        : tier.color === 'blue'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-green-100 text-green-700'
                    }`}
                  >
                    {tier.badge}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="text-gray-500">Batch Size</span>
                    <p className="font-semibold">{tier.batchSize}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Weekly Hours</span>
                    <p className="font-semibold">{tier.hours}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Attention</span>
                    <p
                      className={`font-semibold ${
                        tier.attention === 'Maximum'
                          ? 'text-green-600'
                          : tier.attention === 'High'
                            ? 'text-blue-600'
                            : 'text-gray-600'
                      }`}
                    >
                      {tier.attention}
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-500">Mentorship</span>
                    <p className="font-semibold flex items-center gap-1">
                      {tier.mentorship ? (
                        <>
                          <CheckCircleIcon className="w-4 h-4 text-green-500" /> Yes
                        </>
                      ) : (
                        <>
                          <XCircleIcon className="w-4 h-4 text-gray-300" /> No
                        </>
                      )}
                    </p>
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t border-gray-200">
                  <span className="text-xs text-gray-500">Best For:</span>
                  <p className="text-sm text-gray-700">{tier.bestFor}</p>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {['AIIMS Faculty', 'Study Materials', 'Mock Tests', 'AI Doubts'].map(
                    (feature) => (
                      <span
                        key={feature}
                        className="inline-flex items-center gap-1 text-xs bg-white px-2 py-1 rounded-full border"
                      >
                        <CheckCircleIcon className="w-3 h-3 text-green-500" />
                        {feature}
                      </span>
                    )
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Table View */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="pb-4 font-semibold">Feature</th>
                  <th className="pb-4 text-center font-semibold text-purple-700">Pinnacle</th>
                  <th className="pb-4 text-center font-semibold text-blue-700">Ascent</th>
                  <th className="pb-4 text-center font-semibold text-green-700">Pursuit</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100 hover:bg-blue-50/50 hover:border-l-4 hover:border-l-blue-500 transition-all duration-200">
                  <td className="py-4 font-medium">Batch Size</td>
                  <td className="py-4 text-center text-green-600 font-semibold">10-12</td>
                  <td className="py-4 text-center text-blue-600 font-semibold">16-25</td>
                  <td className="py-4 text-center text-gray-600 font-semibold">30-40</td>
                </tr>
                <tr className="border-b border-gray-100 hover:bg-blue-50/50 hover:border-l-4 hover:border-l-blue-500 transition-all duration-200">
                  <td className="py-4 font-medium">Weekly Hours</td>
                  <td className="py-4 text-center">5-6 hrs</td>
                  <td className="py-4 text-center">4-5 hrs</td>
                  <td className="py-4 text-center">3-4 hrs</td>
                </tr>
                <tr className="border-b border-gray-100 hover:bg-blue-50/50 hover:border-l-4 hover:border-l-blue-500 transition-all duration-200">
                  <td className="py-4 font-medium">Personal Attention</td>
                  <td className="py-4 text-center">
                    <span className="text-green-600 font-semibold">Maximum</span>
                  </td>
                  <td className="py-4 text-center">
                    <span className="text-blue-600 font-semibold">High</span>
                  </td>
                  <td className="py-4 text-center">
                    <span className="text-gray-600 font-semibold">Good</span>
                  </td>
                </tr>
                <tr className="border-b border-gray-100 hover:bg-blue-50/50 hover:border-l-4 hover:border-l-blue-500 transition-all duration-200">
                  <td className="py-4 font-medium">AIIMS Faculty</td>
                  <td className="py-4 text-center">
                    <CheckCircleIcon className="w-5 h-5 text-green-500 mx-auto" />
                  </td>
                  <td className="py-4 text-center">
                    <CheckCircleIcon className="w-5 h-5 text-green-500 mx-auto" />
                  </td>
                  <td className="py-4 text-center">
                    <CheckCircleIcon className="w-5 h-5 text-green-500 mx-auto" />
                  </td>
                </tr>
                <tr className="border-b border-gray-100 hover:bg-blue-50/50 hover:border-l-4 hover:border-l-blue-500 transition-all duration-200">
                  <td className="py-4 font-medium">Study Materials</td>
                  <td className="py-4 text-center">
                    <CheckCircleIcon className="w-5 h-5 text-green-500 mx-auto" />
                  </td>
                  <td className="py-4 text-center">
                    <CheckCircleIcon className="w-5 h-5 text-green-500 mx-auto" />
                  </td>
                  <td className="py-4 text-center">
                    <CheckCircleIcon className="w-5 h-5 text-green-500 mx-auto" />
                  </td>
                </tr>
                <tr className="border-b border-gray-100 hover:bg-blue-50/50 hover:border-l-4 hover:border-l-blue-500 transition-all duration-200">
                  <td className="py-4 font-medium">Mock Tests</td>
                  <td className="py-4 text-center">
                    <CheckCircleIcon className="w-5 h-5 text-green-500 mx-auto" />
                  </td>
                  <td className="py-4 text-center">
                    <CheckCircleIcon className="w-5 h-5 text-green-500 mx-auto" />
                  </td>
                  <td className="py-4 text-center">
                    <CheckCircleIcon className="w-5 h-5 text-green-500 mx-auto" />
                  </td>
                </tr>
                <tr className="border-b border-gray-100 hover:bg-blue-50/50 hover:border-l-4 hover:border-l-blue-500 transition-all duration-200">
                  <td className="py-4 font-medium">AI Doubt Resolution</td>
                  <td className="py-4 text-center">
                    <CheckCircleIcon className="w-5 h-5 text-green-500 mx-auto" />
                  </td>
                  <td className="py-4 text-center">
                    <CheckCircleIcon className="w-5 h-5 text-green-500 mx-auto" />
                  </td>
                  <td className="py-4 text-center">
                    <CheckCircleIcon className="w-5 h-5 text-green-500 mx-auto" />
                  </td>
                </tr>
                <tr className="border-b border-gray-100 hover:bg-blue-50/50 hover:border-l-4 hover:border-l-blue-500 transition-all duration-200">
                  <td className="py-4 font-medium">Personal Mentorship</td>
                  <td className="py-4 text-center">
                    <CheckCircleIcon className="w-5 h-5 text-green-500 mx-auto" />
                  </td>
                  <td className="py-4 text-center">
                    <CheckCircleIcon className="w-5 h-5 text-green-500 mx-auto" />
                  </td>
                  <td className="py-4 text-center">
                    <XCircleIcon className="w-5 h-5 text-gray-300 mx-auto" />
                  </td>
                </tr>
                <tr className="border-b border-gray-100 hover:bg-blue-50/50 hover:border-l-4 hover:border-l-blue-500 transition-all duration-200">
                  <td className="py-4 font-medium">1-on-1 Doubt Sessions</td>
                  <td className="py-4 text-center">
                    <CheckCircleIcon className="w-5 h-5 text-green-500 mx-auto" />
                  </td>
                  <td className="py-4 text-center">
                    <CheckCircleIcon className="w-5 h-5 text-green-500 mx-auto" />
                  </td>
                  <td className="py-4 text-center">
                    <XCircleIcon className="w-5 h-5 text-gray-300 mx-auto" />
                  </td>
                </tr>
                <tr className="border-b border-gray-100 hover:bg-blue-50/50 hover:border-l-4 hover:border-l-blue-500 transition-all duration-200">
                  <td className="py-4 font-medium">Best For</td>
                  <td className="py-4 text-center text-sm">
                    Top rankers
                    <br />
                    Premium coaching
                  </td>
                  <td className="py-4 text-center text-sm">
                    Serious aspirants
                    <br />
                    Balanced approach
                  </td>
                  <td className="py-4 text-center text-sm">
                    Budget-conscious
                    <br />
                    Quality education
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-white mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Why Cerebrum Biology Academy?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="text-center">
              <TrophyIcon className="w-16 h-16 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">98% Success Rate</h3>
              <p className="text-blue-100">
                27 students in Top 1000 AIR. Proven track record of excellence.
              </p>
            </div>
            <div className="text-center">
              <AcademicCapIcon className="w-16 h-16 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">AIIMS Faculty</h3>
              <p className="text-blue-100">
                Learn from Dr. Shekhar (AIIMS alumnus) - 15+ years experience
              </p>
            </div>
            <div className="text-center">
              <UserGroupIcon className="w-16 h-16 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Small Batch Sizes</h3>
              <p className="text-blue-100">
                Choose from Pinnacle (10-12), Ascent (16-25), or Pursuit (30-40) batches. Personal
                attention at every level.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6 max-w-3xl mx-auto">
            <details className="group">
              <summary className="cursor-pointer font-semibold text-lg text-gray-900 py-3 border-b border-gray-200">
                Can I pay in installments?
              </summary>
              <p className="text-gray-600 mt-3 pl-4">
                Yes! We offer flexible installment options - choose 2 or 3 installments based on
                your preference. Note that lump sum payment offers the best value with maximum
                savings.
              </p>
            </details>

            <details className="group">
              <summary className="cursor-pointer font-semibold text-lg text-gray-900 py-3 border-b border-gray-200">
                What's the difference between the tiers?
              </summary>
              <p className="text-gray-600 mt-3 pl-4">
                <strong>Pinnacle (10-12 students):</strong> Premium coaching with maximum personal
                attention, ideal for top rankers.
                <br />
                <strong>Ascent (16-25 students):</strong> Balanced approach with high-quality
                teaching and good personal attention.
                <br />
                <strong>Pursuit (30-40 students):</strong> Quality education at an affordable price,
                perfect for budget-conscious students.
              </p>
            </details>

            <details className="group">
              <summary className="cursor-pointer font-semibold text-lg text-gray-900 py-3 border-b border-gray-200">
                Is there a money-back guarantee?
              </summary>
              <p className="text-gray-600 mt-3 pl-4">
                Yes, Pinnacle and Ascent tiers come with a 30-day money-back guarantee if you're not
                satisfied with the quality of teaching.
              </p>
            </details>

            <details className="group">
              <summary className="cursor-pointer font-semibold text-lg text-gray-900 py-3 border-b border-gray-200">
                Are study materials included in the price?
              </summary>
              <p className="text-gray-600 mt-3 pl-4">
                Yes! All tiers include comprehensive study materials, downloadable PDFs, practice
                questions, and mock tests at no extra cost.
              </p>
            </details>

            <details className="group">
              <summary className="cursor-pointer font-semibold text-lg text-gray-900 py-3 border-b border-gray-200">
                What if I miss a live class?
              </summary>
              <p className="text-gray-600 mt-3 pl-4">
                All live classes are recorded and available for lifetime access. You can watch them
                anytime from your student dashboard.
              </p>
            </details>

            <details className="group">
              <summary className="cursor-pointer font-semibold text-lg text-gray-900 py-3 border-b border-gray-200">
                Can I switch tiers after enrollment?
              </summary>
              <p className="text-gray-600 mt-3 pl-4">
                Yes, you can upgrade to a higher tier by paying the price difference within the
                first 30 days of enrollment, subject to batch availability.
              </p>
            </details>
          </div>
        </div>

        <div className="mt-16 text-center pb-20 md:pb-0">
          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl p-6 sm:p-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              Ready to Start Your NEET Journey?
            </h2>
            <p className="text-base sm:text-xl text-gray-800 mb-6 sm:mb-8">
              Join 5,000+ successful students. Limited seats available!
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/demo-booking">
                <Button variant="primary" size="lg" className="bg-gray-900 hover:bg-black">
                  Book Free Demo Class
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" size="lg" className="border-gray-900 text-gray-900">
                  Talk to Counselor
                </Button>
              </Link>
            </div>
            <p className="text-xs sm:text-sm text-gray-700 mt-4">
              🔒 Secure payment via Razorpay • 📞 Call +91-88264-44334 for queries
            </p>
          </div>
        </div>
      </div>

      {/* Mobile Sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 md:hidden bg-white border-t border-gray-200 p-3 shadow-[0_-4px_20px_rgba(0,0,0,0.1)] z-50">
        <div className="flex gap-2 max-w-lg mx-auto">
          <Link href="/demo-booking" className="flex-1">
            <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-3 rounded-xl text-sm hover:from-blue-700 hover:to-purple-700 transition-all">
              Book Free Demo
            </button>
          </Link>
          <Link href="tel:+918826444334" className="flex-shrink-0">
            <button className="bg-green-600 text-white font-bold py-3 px-4 rounded-xl text-sm hover:bg-green-700 transition-all flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              Call
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}
