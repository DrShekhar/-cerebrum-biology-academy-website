'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import {
  CheckCircle2,
  XCircleIcon,
  GraduationCap,
  Users,
  Trophy,
  ShieldCheck,
  Search,
  X,
  ChevronDown,
} from 'lucide-react'
import {
  allClassPricing,
  type ClassLevel,
  type CourseType,
  type TierLevel,
  type PricingTier,
  type ClassPricing,
} from '@/data/pricing'
import { trackAndOpenWhatsApp } from '@/lib/whatsapp/tracking'
import { MessageCircle } from 'lucide-react'

const getCourseDetailUrl = (classLevel: ClassLevel): string => {
  const urlMap: Record<ClassLevel, string> = {
    'foundation-9': '/courses/class-9-foundation-biology',
    'foundation-10': '/courses/class-10-foundation-biology',
    'class-11': '/courses/class-11-neet-comprehensive',
    'class-12': '/courses/class-12-neet-intensive',
    dropper: '/courses/neet-dropper-intensive',
    '2-year': '/courses/2-year-complete-neet',
  }
  return urlMap[classLevel] || '/courses'
}

const PaymentOptionsDisplay = dynamic(
  () =>
    import('@/components/pricing/PaymentOptionsDisplay').then((mod) => mod.PaymentOptionsDisplay),
  { ssr: false }
)

// BreadcrumbList Schema for improved SERP display and CTR
const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: 'https://cerebrumbiologyacademy.com',
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Pricing',
      item: 'https://cerebrumbiologyacademy.com/pricing',
    },
  ],
}

export default function PricingPage() {
  const [selectedClass, setSelectedClass] = useState<ClassLevel | 'all'>('class-11')
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
    // When class changes, ensure courseType is valid for the new class
    if (selectedClass !== 'all') {
      const validTypes = currentClassData?.availableCourseTypes || []
      if (!validTypes.includes(courseType)) {
        setCourseType(validTypes[0] || 'neet')
      }
    } else {
      // For "All Classes", default to board-neet or neet
      if (!['board-neet', 'neet'].includes(courseType)) {
        setCourseType('board-neet')
      }
    }
  }, [selectedClass, currentClassData])

  const getFilteredClasses = () => {
    if (selectedClass === 'all') {
      return allClassPricing.filter((classData) => {
        // Check if class has any matching course types
        // For 'neet', also check 'board-neet' as they are related
        // For 'board-neet', also check 'neet' as they are related
        let hasCourseType = classData.tiers[courseType] && classData.tiers[courseType].length > 0

        // Also include classes that have related course types
        if (!hasCourseType && courseType === 'neet') {
          hasCourseType = classData.tiers['board-neet'] && classData.tiers['board-neet'].length > 0
        }
        if (!hasCourseType && courseType === 'board-neet') {
          hasCourseType = classData.tiers['neet'] && classData.tiers['neet'].length > 0
        }

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

  const tierOrder: Record<TierLevel, number> = { pursuit: 0, ascent: 1, pinnacle: 2, elixir: 3 }
  const sortTiers = (tiers: PricingTier[]) => [...tiers].sort((a, b) => tierOrder[a.tier] - tierOrder[b.tier])

  // Best For descriptions for each tier
  const bestForDescriptions: Record<TierLevel, string> = {
    pinnacle: 'Top rankers seeking premium coaching',
    ascent: 'Serious aspirants with balanced approach',
    pursuit: 'Budget-conscious students seeking quality education',
    elixir: 'Price-sensitive students wanting NCERT-based quality coaching',
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
        floatingBadge: '🔥 BEST FOR TOP RANKERS',
        badgeBg: 'bg-amber-500',
        borderColor: 'border-purple-200',
      },
      ascent: {
        bg: 'bg-gray-50',
        textColor: 'text-blue-900',
        badge: 'bg-blue-100 text-blue-700',
        floatingBadge: '🔥 MOST POPULAR',
        badgeBg: 'bg-rose-500',
        borderColor: 'border-blue-200',
      },
      pursuit: {
        bg: 'from-green-50 to-green-50',
        textColor: 'text-green-900',
        badge: 'bg-green-100 text-green-700',
        floatingBadge: '💰 BEST VALUE',
        badgeBg: 'bg-green-600',
        borderColor: 'border-green-200',
      },
      elixir: {
        bg: 'from-amber-50 to-orange-50',
        textColor: 'text-amber-900',
        badge: 'bg-amber-100 text-amber-700',
        floatingBadge: '✨ STARTING ₹5,999/yr',
        badgeBg: 'bg-amber-500',
        borderColor: 'border-amber-200',
      },
    }

    const colors = tierColors[tier.tier]

    return (
      <div
        key={tierKey}
        className="group relative bg-white rounded-3xl shadow-xl overflow-visible transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_70px_rgba(0,0,0,0.12)] flex flex-col h-full"
      >
        <div
          className={`absolute -top-3 left-1/2 transform -translate-x-1/2 z-10 px-4 py-2 rounded-full ${colors.badgeBg} text-white text-xs font-bold shadow-lg whitespace-nowrap`}
        >
          {colors.floatingBadge}
        </div>
        <div
          className={`bg-gradient-to-r ${colors.bg} ${colors.textColor} p-3 sm:p-4 md:p-5 border-b-2 ${colors.borderColor} rounded-t-3xl`}
        >
          <div className="flex items-center gap-2 mb-2 sm:mb-3 flex-wrap">
            <span
              className={`px-3 sm:px-4 py-1 sm:py-1.5 ${colors.badge} rounded-full text-xs sm:text-sm font-semibold capitalize`}
            >
              {tier.tier}
            </span>
          </div>

          <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 capitalize leading-tight">
            {classData.displayName} - {tier.tier}
          </h3>

          <p className="text-gray-600 text-sm mb-2 sm:mb-3 leading-relaxed">
            {classData.description}
          </p>

          <div className="mb-2 sm:mb-3">
            <div className="space-y-0.5">
              <div className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                Best For:
              </div>
              <div className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                {bestForDescriptions[tier.tier]}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-1 text-center">
            <div className="bg-white/50 rounded-md p-1 sm:p-1.5 min-w-0">
              <div className="text-xs sm:text-sm md:text-base font-bold truncate">
                {classData.duration}
              </div>
              <div className="text-[10px] sm:text-xs opacity-80 truncate">Duration</div>
            </div>
            <div className="bg-white/50 rounded-md p-1 sm:p-1.5 min-w-0">
              <div className="text-xs sm:text-sm md:text-base font-bold truncate">{tier.hours}</div>
              <div className="text-[10px] sm:text-xs opacity-80 truncate">Per Week</div>
            </div>
            <div className="bg-white/50 rounded-md p-1 sm:p-1.5 min-w-0">
              <div className="text-xs sm:text-sm md:text-base font-bold truncate">
                {tier.batchSize}
              </div>
              <div className="text-[10px] sm:text-xs opacity-80 truncate">Batch</div>
            </div>
            <div className="bg-white/50 rounded-md p-1 sm:p-1.5 min-w-0">
              <div className="text-xs sm:text-sm md:text-base font-bold text-green-600 truncate">
                {tier.tier === 'pinnacle' ? '55' : tier.tier === 'ascent' ? '120' : tier.tier === 'elixir' ? '400+' : '160'}
              </div>
              <div className="text-[10px] sm:text-xs opacity-80 truncate">Enrolled</div>
            </div>
          </div>
        </div>

        <div className="p-2 sm:p-3 md:p-4 flex flex-col flex-grow">
          <div className="text-center mb-2 sm:mb-3">
            <div className="text-xl sm:text-2xl font-bold text-gray-900">
              ₹{price.toLocaleString()}
            </div>
            <div className="text-[10px] sm:text-xs text-blue-600 font-medium">
              ~₹{Math.round(price / 12).toLocaleString()}/mo
            </div>
          </div>

          <div className="mb-3 sm:mb-4 flex-grow">
            <h4 className="font-semibold text-gray-900 mb-2 text-sm">Key Features:</h4>
            <div className="space-y-2">
              {tier.features.slice(0, 6).map(
                (feature, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700 leading-relaxed">{feature}</span>
                  </div>
                )
              )}
            </div>
          </div>

          <button
            onClick={() => setExpandedTier(isExpanded ? null : tierKey)}
            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2.5 rounded-xl mb-3 transition-colors flex items-center justify-center gap-2 text-sm"
          >
            <span>View Payment Options</span>
            <ChevronDown
              className={`w-5 h-5 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
            />
          </button>

          {isExpanded && (
            <div className="mb-3 animate-fadeIn">
              <PaymentOptionsDisplay
                lumpSum={tier.prices.lumpSum}
                twoInstallments={tier.prices.twoInstallments}
                threeInstallments={tier.prices.threeInstallments}
                tierName={tier.tier}
                monthly={tier.prices.monthly}
              />
            </div>
          )}

          <button
            onClick={() => trackAndOpenWhatsApp({
              source: `pricing-${classData.class}-${tier.tier}`,
              message: `Hi! I'm interested in ${classData.displayName} — ${tier.tier.charAt(0).toUpperCase() + tier.tier.slice(1)} tier (₹${price.toLocaleString()}). Please share enrollment details, batch timings, and payment options.`,
              campaign: 'pricing-page',
            })}
            className="w-full bg-[#25D366] hover:bg-[#20BD5A] text-white font-bold py-3 rounded-xl transition-all duration-200 hover:shadow-xl mb-3 text-sm flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-4 h-4" />
            Chat to Enroll — ₹{price.toLocaleString()}
          </button>

          <Link href={getCourseDetailUrl(classData.class)}>
            <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2.5 rounded-xl transition-colors text-sm">
              View Course Details
            </button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 overflow-x-hidden">
        {/* Hero Section with enhanced gradient */}
        <div className="relative bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-900 text-white py-8 sm:py-10 lg:py-12 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-white/5 to-transparent rounded-full" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6 sm:mb-8 animate-fade-in-up">
            <div
              className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md border border-white/20 rounded-full px-4 sm:px-5 py-2 sm:py-2.5 mb-4 sm:mb-5 shadow-lg animate-fade-in-up"
              style={{ animationDelay: '0.2s' }}
            >
              <ShieldCheck className="w-4 sm:w-5 h-4 sm:h-5 text-blue-300" />
              <span className="font-semibold text-xs sm:text-sm tracking-wide">
                Trusted by 5,000+ NEET aspirants
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-3 sm:mb-4 leading-[1.1] px-4">
              Master NEET Biology
              <br />
              <span className="bg-gradient-to-r from-yellow-300 via-amber-200 to-yellow-300 bg-clip-text text-transparent drop-shadow-sm">
                With India&apos;s Best Faculty
              </span>
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-blue-200 max-w-2xl mx-auto px-4 leading-relaxed">
              Small batches, personalized attention, and proven results.
              <span className="block mt-2 text-yellow-300 font-semibold">
                Courses starting from just ₹5,999/year
              </span>
            </p>
          </div>

          <div
            ref={statsRef}
            className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto animate-fade-in-up"
            style={{ animationDelay: '0.4s' }}
          >
            {[
              { value: stats.courses, label: 'Course Programs', suffix: '' },
              { value: stats.tiers, label: 'Learning Tiers', suffix: '' },
              { value: stats.success, label: 'NEET Success Rate', suffix: '%' },
              { value: '7', label: 'Day Money-Back', suffix: '-Day', isStatic: true },
            ].map((stat, idx) => (
              <div
                key={idx}
                className="group bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-3 sm:p-4 text-center hover:bg-white/15 transition-all duration-300 hover:scale-[1.02]"
              >
                <div className="text-xl sm:text-2xl font-bold mb-0.5 tabular-nums">
                  {stat.isStatic ? `${stat.value}${stat.suffix}` : `${stat.value}${stat.suffix}`}
                </div>
                <div className="text-green-100/80 text-[10px] sm:text-xs font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Urgency Banner */}
      <div className="bg-red-600 text-white py-3">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs sm:text-sm font-medium">
          <span>April 2026 Batch — Enrollment Open</span>
          <span className="bg-white/20 px-2 sm:px-3 py-1 rounded-full">Pinnacle: 3 seats left</span>
          <span className="bg-white/20 px-2 sm:px-3 py-1 rounded-full">Ascent: 8 seats left</span>
          <button
            onClick={() => trackAndOpenWhatsApp({ source: 'pricing-urgency-banner', message: 'Hi! I want to reserve my seat for the April 2026 batch. Please share available slots and enrollment process.', campaign: 'pricing-urgency' })}
            className="bg-yellow-500 text-gray-900 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full font-bold hover:bg-yellow-400 transition-colors"
          >
            Reserve Now
          </button>
        </div>
      </div>

      {/* "Not sure?" helper */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-0">
        <div className="text-center">
          <button
            onClick={() => trackAndOpenWhatsApp({ source: 'pricing-help', message: 'Hi! I\'m on the pricing page but not sure which course/tier is right for me. Can you help me choose?', campaign: 'pricing-help' })}
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium text-sm"
          >
            <MessageCircle className="w-4 h-4" />
            Not sure which plan? Chat with us — we&apos;ll help you choose
          </button>
        </div>
      </div>


      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        {/* Sticky Filter Section */}
        <div className="sticky top-0 z-20 bg-white/80 backdrop-blur-xl pb-4 sm:pb-6 pt-4 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 border-b border-gray-100 shadow-sm">
          <div className="mb-5 sm:mb-6">
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-12 py-3.5 rounded-xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10 text-sm text-gray-700 placeholder:text-gray-400 transition-all duration-200"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>

          <div className="mb-3 sm:mb-4 relative">
            {/* Scroll indicators */}
            <div className="absolute left-0 top-0 bottom-2 w-8 bg-gradient-to-r from-blue-50 via-blue-50/80 to-transparent z-10 pointer-events-none sm:hidden" />
            <div className="absolute right-0 top-0 bottom-2 w-8 bg-gradient-to-l from-purple-50 via-purple-50/80 to-transparent z-10 pointer-events-none sm:hidden" />
            <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-hide">
              <div className="flex gap-1.5 sm:gap-2 min-w-min sm:min-w-max px-1 pb-2">
                <button
                  onClick={() => setSelectedClass('all')}
                  className={`relative flex items-center gap-1.5 sm:gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-full font-medium text-xs sm:text-sm transition-all duration-200 ${
                    selectedClass === 'all'
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                      : 'bg-white text-gray-700 hover:bg-gray-50 shadow'
                  }`}
                >
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
                    className={`relative flex items-center gap-1.5 sm:gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-full font-medium text-xs sm:text-sm transition-all duration-200 ${
                      selectedClass === item.class
                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                        : 'bg-white text-gray-700 hover:bg-gray-50 shadow'
                    }`}
                  >
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

          <div className="flex flex-col md:flex-row justify-center items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
            <div className="flex items-center gap-2 sm:gap-3">
              <span className="text-xs sm:text-sm font-medium text-gray-700">Focus:</span>
              <div className="flex gap-1.5 sm:gap-2 flex-wrap justify-center">
                {(() => {
                  // Get Focus options based on selected class
                  const getFocusOptions = (): { type: CourseType; label: string }[] => {
                    // Dropper: NEET + Elixir NEET
                    if (selectedClass === 'dropper') {
                      return [
                        { type: 'neet', label: 'NEET' },
                        { type: 'elixir-neet', label: 'NEET Elixir' },
                      ]
                    }
                    // 2-Year: NEET only
                    if (selectedClass === '2-year') {
                      return [{ type: 'neet', label: 'NEET' }]
                    }
                    // Class 9: Academic terminology (no elixir for foundation)
                    if (selectedClass === 'foundation-9') {
                      return [
                        { type: 'academic', label: 'Academic' },
                        { type: 'neet', label: 'NEET' },
                        { type: 'board-neet', label: 'NEET + Academic' },
                      ]
                    }
                    // Class 11: Academic + Elixir
                    if (selectedClass === 'class-11') {
                      return [
                        { type: 'academic', label: 'Academic' },
                        { type: 'neet', label: 'NEET' },
                        { type: 'board-neet', label: 'NEET + Academic' },
                        { type: 'elixir-neet', label: 'NEET Elixir' },
                        { type: 'elixir-board', label: 'BIO Elixir' },
                      ]
                    }
                    // Class 10: Boards terminology
                    if (selectedClass === 'foundation-10') {
                      return [
                        { type: 'board-only', label: 'Boards' },
                        { type: 'neet', label: 'NEET' },
                        { type: 'board-neet', label: 'NEET + Boards' },
                      ]
                    }
                    // Class 12: Boards + Flagship + Elixir
                    if (selectedClass === 'class-12') {
                      return [
                        { type: 'board-only', label: 'Boards' },
                        { type: 'neet', label: 'NEET' },
                        { type: 'board-neet', label: 'NEET + Boards' },
                        { type: 'flagship', label: 'Flagship (12th+11th)' },
                        { type: 'elixir-neet', label: 'NEET Elixir' },
                        { type: 'elixir-board', label: 'BIO Elixir' },
                      ]
                    }
                    // All Classes: Show combined options
                    return [
                      { type: 'board-neet', label: 'Board + NEET' },
                      { type: 'neet', label: 'NEET' },
                    ]
                  }

                  const focusOptions = getFocusOptions()

                  return focusOptions.map((option) => (
                    <button
                      key={option.type}
                      onClick={() => setCourseType(option.type)}
                      className={`relative px-4 sm:px-6 py-2 sm:py-3 rounded-full font-medium text-xs sm:text-sm transition-all duration-200 ${
                        courseType === option.type
                          ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                          : 'bg-white text-gray-700 hover:bg-gray-50 shadow'
                      }`}
                    >
                      <span className="relative z-10">{option.label}</span>
                    </button>
                  ))
                })()}
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <span className="text-xs sm:text-sm font-medium text-gray-700">Payment:</span>
              <div className="flex gap-1.5 sm:gap-2">
                <button
                  onClick={() => setPaymentMode('lumpSum')}
                  className={`relative px-4 sm:px-6 py-2 sm:py-3 rounded-full font-medium text-xs sm:text-sm transition-all duration-200 ${
                    paymentMode === 'lumpSum'
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                      : 'bg-white text-gray-700 hover:bg-gray-50 shadow'
                  }`}
                >
                  <span className="relative z-10">Lump Sum (2% Off)</span>
                </button>
                <button
                  onClick={() => setPaymentMode('twoInstallments')}
                  className={`relative px-4 sm:px-6 py-2 sm:py-3 rounded-full font-medium text-xs sm:text-sm transition-all duration-200 ${
                    paymentMode === 'twoInstallments'
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                      : 'bg-white text-gray-700 hover:bg-gray-50 shadow'
                  }`}
                >
                  <span className="relative z-10">2 Installments</span>
                </button>
                <button
                  onClick={() => setPaymentMode('threeInstallments')}
                  className={`relative px-4 sm:px-6 py-2 sm:py-3 rounded-full font-medium text-xs sm:text-sm transition-all duration-200 ${
                    paymentMode === 'threeInstallments'
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                      : 'bg-white text-gray-700 hover:bg-gray-50 shadow'
                  }`}
                >
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
              // Find the best matching course type for this class
              let effectiveType = courseType
              if (!classData.tiers[courseType] || classData.tiers[courseType].length === 0) {
                // Try to find a matching type
                if (courseType === 'neet' && classData.tiers['board-neet']) {
                  effectiveType = 'board-neet'
                } else if (courseType === 'board-neet' && classData.tiers['neet']) {
                  effectiveType = 'neet'
                } else {
                  // Use the first available type
                  effectiveType = classData.availableCourseTypes[0]
                }
              }

              const allTiers = sortTiers(classData.tiers[effectiveType] || []).map((tier) => ({
                ...tier,
                courseType: effectiveType,
              }))

              if (allTiers.length === 0) return null

              return (
                <div key={classData.class}>
                  <div className="mb-4 sm:mb-6 px-2">
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                      {classData.displayName}
                      {effectiveType !== courseType && (
                        <span className="ml-2 text-sm font-normal text-blue-600">
                          (
                          {effectiveType === 'neet'
                            ? 'NEET'
                            : effectiveType === 'board-neet'
                              ? 'Board + NEET'
                              : effectiveType === 'academic'
                                ? 'Academic'
                                : 'Board Only'}
                          )
                        </span>
                      )}
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
              {sortTiers(currentTiers).map((tier) =>
                currentClassData ? renderTierCard(tier, currentClassData) : null
              )}
            </div>
          )
        )}

        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl p-4 sm:p-6 md:p-8 mb-10 sm:mb-12 md:mb-16">
          <div className="text-center mb-6 sm:mb-8">
            <span className="inline-block px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full text-sm font-medium mb-3">
              Compare Plans
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Which Plan is Right for You?
            </h2>
          </div>

          {/* Mobile Card View */}
          <div className="md:hidden space-y-4">
            {[
              {
                name: 'Pursuit',
                color: 'green',
                badge: '💰 Best Value',
                batchSize: '30-40',
                hours: '4.5 hrs',
                attention: 'Good',
                mentorship: false,
                oneOnOne: false,
                bestFor: 'Budget-conscious students seeking quality',
              },
              {
                name: 'Ascent',
                color: 'blue',
                badge: '🔥 Most Popular',
                batchSize: '16-25',
                hours: '4.5 hrs',
                attention: 'High',
                mentorship: true,
                oneOnOne: true,
                bestFor: 'Serious aspirants with balanced approach',
              },
              {
                name: 'Pinnacle',
                color: 'purple',
                badge: '👑 Premium',
                batchSize: '10-12',
                hours: '4.5-6.0 hrs',
                attention: 'Maximum',
                mentorship: true,
                oneOnOne: true,
                bestFor: 'Top rankers seeking premium coaching',
              },
            ].map((tier) => (
              <div
                key={tier.name}
                className={`border-2 rounded-2xl p-4 ${
                  tier.color === 'purple'
                    ? 'border-purple-200 bg-purple-50/50'
                    : tier.color === 'blue'
                      ? 'border-blue-200 bg-blue-50/50'
                      : tier.color === 'amber'
                        ? 'border-amber-200 bg-amber-50/50'
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
                          : tier.color === 'amber'
                            ? 'text-amber-700'
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
                          : tier.color === 'amber'
                            ? 'bg-amber-100 text-amber-700'
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
                          <CheckCircle2 className="w-4 h-4 text-green-600" /> Yes
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
                        <CheckCircle2 className="w-3 h-3 text-green-600" />
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
                  <th className="pb-4 pl-4 font-semibold text-gray-500 text-sm uppercase tracking-wide">Feature</th>
                  <th className="pb-4 text-center font-bold text-green-700">
                    <div className="text-lg">Pursuit</div>
                    <div className="text-xs font-normal text-gray-500">Best Value</div>
                  </th>
                  <th className="pb-4 text-center font-bold text-blue-700 bg-blue-50 rounded-t-2xl">
                    <div className="text-xs font-bold text-blue-600 mb-1">MOST POPULAR</div>
                    <div className="text-lg">Ascent</div>
                    <div className="text-xs font-normal text-gray-500">Recommended</div>
                  </th>
                  <th className="pb-4 text-center font-bold text-purple-700">
                    <div className="text-lg">Pinnacle</div>
                    <div className="text-xs font-normal text-gray-500">Premium</div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  { feature: 'Batch Size', pursuit: '30-40', ascent: '16-25', pinnacle: '10-12', highlight: true },
                  { feature: 'Weekly Hours', pursuit: '4.5 hrs', ascent: '4.5 hrs', pinnacle: '4.5-6.0 hrs' },
                  { feature: 'Personal Attention', pursuit: 'Good', ascent: 'High', pinnacle: 'Maximum', highlight: true },
                  { feature: 'AIIMS Faculty', pursuit: true, ascent: true, pinnacle: true },
                  { feature: 'Study Materials', pursuit: true, ascent: true, pinnacle: true },
                  { feature: 'Mock Tests', pursuit: true, ascent: true, pinnacle: true },
                  { feature: 'Recorded Lectures', pursuit: true, ascent: true, pinnacle: true },
                  { feature: 'AI Doubt Resolution', pursuit: true, ascent: true, pinnacle: true },
                  { feature: 'Personal Mentoring', pursuit: false, ascent: true, pinnacle: true },
                  { feature: '1-on-1 Doubt Sessions', pursuit: false, ascent: true, pinnacle: true },
                  { feature: 'Printed Materials', pursuit: true, ascent: true, pinnacle: true },
                  { feature: 'Weekly Tests', pursuit: false, ascent: true, pinnacle: true },
                  { feature: 'Performance Tracking', pursuit: false, ascent: true, pinnacle: true },
                  { feature: 'Parent Counseling', pursuit: false, ascent: false, pinnacle: true },
                  { feature: 'Career Guidance', pursuit: false, ascent: true, pinnacle: true },
                  { feature: 'Study Planning', pursuit: false, ascent: false, pinnacle: true },
                  { feature: 'Money-back Guarantee', pursuit: false, ascent: true, pinnacle: true },
                ].map((row, idx) => (
                  <tr key={idx} className={`border-b border-gray-100 ${idx % 2 === 0 ? 'bg-gray-50/50' : ''}`}>
                    <td className="py-3.5 pl-4 font-medium text-gray-900 text-sm">{row.feature}</td>
                    <td className="py-3.5 text-center text-sm">
                      {typeof row.pursuit === 'boolean' ? (
                        row.pursuit ? <CheckCircle2 className="w-5 h-5 text-green-600 mx-auto" /> : <XCircleIcon className="w-5 h-5 text-gray-300 mx-auto" />
                      ) : (
                        <span className={row.highlight ? 'font-semibold text-green-700' : ''}>{row.pursuit}</span>
                      )}
                    </td>
                    <td className="py-3.5 text-center text-sm bg-blue-50/60">
                      {typeof row.ascent === 'boolean' ? (
                        row.ascent ? <CheckCircle2 className="w-5 h-5 text-green-600 mx-auto" /> : <XCircleIcon className="w-5 h-5 text-gray-300 mx-auto" />
                      ) : (
                        <span className={row.highlight ? 'font-semibold text-blue-700' : ''}>{row.ascent}</span>
                      )}
                    </td>
                    <td className="py-3.5 text-center text-sm">
                      {typeof row.pinnacle === 'boolean' ? (
                        row.pinnacle ? <CheckCircle2 className="w-5 h-5 text-green-600 mx-auto" /> : <XCircleIcon className="w-5 h-5 text-gray-300 mx-auto" />
                      ) : (
                        <span className={row.highlight ? 'font-semibold text-purple-700' : ''}>{row.pinnacle}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="relative bg-gradient-to-br from-slate-900 to-blue-950 rounded-3xl p-8 sm:p-12 lg:p-16 text-white mb-16 overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-20 -right-20 w-60 h-60 bg-white/5 rounded-full blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-blue-500/10 rounded-full blur-3xl" />
          </div>

          <div className="relative">
            <div className="text-center mb-10 sm:mb-12">
              <span className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-sm font-medium mb-4">
                Why Choose Us
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
                Why Cerebrum Biology Academy?
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
              {[
                {
                  icon: Trophy,
                  title: '98% Success Rate',
                  desc: '27 students in Top 1000 AIR. Proven track record of excellence.',
                },
                {
                  icon: GraduationCap,
                  title: 'AIIMS Faculty',
                  desc: 'Learn from Dr. Shekhar (AIIMS alumnus) - 15+ years experience',
                },
                {
                  icon: Users,
                  title: 'Small Batch Sizes',
                  desc: 'Pinnacle (10-12), Ascent (16-25), or Pursuit (30-40). Personal attention guaranteed.',
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex flex-row md:flex-col items-center md:items-center gap-4 md:gap-0 text-left md:text-center bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 md:p-8 hover:bg-white/10 transition-colors duration-300"
                >
                  <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-white/10 rounded-xl md:rounded-2xl md:mb-5">
                    <item.icon className="w-6 h-6 md:w-8 md:h-8" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base md:text-xl font-bold mb-1 md:mb-2">{item.title}</h3>
                    <p className="text-green-100/80 text-sm md:text-base leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Competitive Comparison Table */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 sm:p-10 mb-16">
          <div className="text-center mb-8">
            <span className="inline-block px-4 py-1.5 bg-green-50 text-green-700 rounded-full text-sm font-medium mb-4">
              Compare & Decide
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              Cerebrum vs Alternatives
            </h2>
            <p className="text-gray-600 text-sm sm:text-base">See why 15,000+ students choose us over Kota coaching and big EdTech</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-500">Feature</th>
                  <th className="text-center py-3 px-4 font-medium text-gray-500">Kota (Allen/Aakash)</th>
                  <th className="text-center py-3 px-4 font-medium text-gray-500">Big EdTech</th>
                  <th className="text-center py-3 px-4 font-bold text-blue-700 bg-blue-50 rounded-t-xl">Cerebrum</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  ['Batch Size', '200-500', 'Recorded/AI', '10-30 students'],
                  ['Faculty', 'Rotating teachers', 'Pre-recorded', 'Dr. Shekhar (AIIMS)'],
                  ['Annual Fee', '₹3-5 Lakh + Hostel', '₹1-2 Lakh', '₹45K-98K'],
                  ['Success Rate', '15-20%', 'Not disclosed', '98%'],
                  ['Personal Mentoring', 'No', 'No', 'Yes (Pinnacle)'],
                  ['Location', 'Kota only', 'Online only', 'Delhi NCR + Online'],
                  ['Money-back Guarantee', 'No', 'No', '15-day guarantee'],
                  ['Parent Progress Reports', 'No', 'Basic', 'Monthly detailed reports'],
                  ['Doubt Resolution', 'Queue (2-3 days)', 'AI chatbot', 'WhatsApp (2 hours)'],
                ].map(([feature, kota, edtech, cerebrum], idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium text-gray-900">{feature}</td>
                    <td className="py-3 px-4 text-center text-gray-500">{kota}</td>
                    <td className="py-3 px-4 text-center text-gray-500">{edtech}</td>
                    <td className="py-3 px-4 text-center font-semibold text-blue-700 bg-blue-50">{cerebrum}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Elixir Budget Section — Positioned as alternative for price-sensitive visitors */}
        <div className="bg-gradient-to-r from-amber-50 via-orange-50 to-amber-50 border-2 border-amber-200 rounded-3xl p-6 sm:p-8 lg:p-10 mb-16">
          <div className="text-center mb-6">
            <span className="inline-flex items-center bg-amber-100 text-amber-700 px-4 py-1.5 rounded-full text-sm font-bold mb-3">
              Budget-Friendly Option
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              Looking for something more affordable?
            </h2>
            <p className="text-base sm:text-lg text-gray-600">
              Try <span className="font-bold text-amber-700">NEET Elixir — ₹5,999/year</span> (₹3,000/month) — AIIMS faculty, 400+ student mega batch
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-xl mx-auto">
            <button
              onClick={() => trackAndOpenWhatsApp({ source: 'pricing-elixir-bottom', message: 'Hi! I\'m interested in the NEET Elixir budget course (₹5,999/year). Please share details about batch timings and enrollment.', campaign: 'pricing-elixir' })}
              className="flex-1 bg-[#25D366] hover:bg-[#20BD5A] text-white font-bold py-3 px-6 rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-5 h-5" />
              Chat About Elixir — ₹5,999/year
            </button>
            <button
              onClick={() => trackAndOpenWhatsApp({ source: 'pricing-elixir-demo', message: 'Hi! I want to book a FREE demo for the Elixir course. Please share available timings.', campaign: 'pricing-elixir' })}
              className="flex-1 bg-white hover:bg-gray-50 text-gray-900 font-semibold py-3 px-6 rounded-xl border-2 border-amber-300 transition-colors"
            >
              Book Free Demo
            </button>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 sm:p-10">
          <div className="text-center mb-8 sm:mb-10">
            <span className="inline-block px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full text-sm font-medium mb-4">
              FAQ
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="space-y-3 max-w-3xl mx-auto">
            {[
              {
                q: 'Can I pay in installments?',
                a: 'Yes! We offer flexible installment options - choose 2 or 3 installments based on your preference. Note that lump sum payment offers the best value with maximum savings.',
              },
              {
                q: "What's the difference between the tiers?",
                a: '<strong>Pinnacle (10-12 students):</strong> Premium coaching with maximum personal attention, ideal for top rankers.<br/><strong>Ascent (16-25 students):</strong> Balanced approach with high-quality teaching and good personal attention.<br/><strong>Pursuit (30-40 students):</strong> Quality education at an affordable price, perfect for budget-conscious students.',
              },
              {
                q: 'Is there a money-back guarantee?',
                a: "Yes, Pinnacle and Ascent tiers come with a 30-day money-back guarantee if you're not satisfied with the quality of teaching.",
              },
              {
                q: 'Are study materials included in the price?',
                a: 'Yes! All tiers include comprehensive study materials, downloadable PDFs, practice questions, and mock tests at no extra cost.',
              },
              {
                q: 'What if I miss a live class?',
                a: 'All live classes are recorded and available for lifetime access. You can watch them anytime from your student dashboard.',
              },
              {
                q: 'Can I switch tiers after enrollment?',
                a: 'Yes, you can upgrade to a higher tier by paying the price difference within the first 30 days of enrollment, subject to batch availability.',
              },
              {
                q: 'What is the Elixir course?',
                a: '<strong>NEET Elixir (₹5,999/yr)</strong> is our budget-friendly NCERT-based NEET preparation course with AIIMS faculty, 3 hrs/week live classes, mock tests, and free MCQ tool access. <strong>BIO Elixir (₹5,999/yr)</strong> is the Board Biology variant. Dropper Elixir is ₹7,999/yr. Monthly payment of ₹3,000/mo is also available. Ideal for price-sensitive students who want quality coaching at an affordable price.',
              },
            ].map((faq, idx) => (
              <details
                key={idx}
                className="group bg-gray-50 hover:bg-gray-100/80 rounded-xl transition-colors duration-200"
              >
                <summary className="cursor-pointer flex items-center justify-between gap-4 p-4 sm:p-5 font-semibold text-gray-900 text-sm sm:text-base">
                  <span>{faq.q}</span>
                  <ChevronDown className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform duration-200 flex-shrink-0" />
                </summary>
                <p
                  className="text-gray-600 text-sm sm:text-base px-4 sm:px-5 pb-4 sm:pb-5 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: faq.a }}
                />
              </details>
            ))}
          </div>
        </div>

        <div className="mt-12 sm:mt-16 pb-24 md:pb-8">
          <div className="relative bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-900 rounded-3xl p-8 sm:p-12 lg:p-16 overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl hidden sm:block" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl hidden sm:block" />
            </div>

            <div className="relative text-center">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4">
                Ready to Start Your NEET Journey?
              </h2>
              <p className="text-base sm:text-lg text-white/90 mb-8 max-w-xl mx-auto">
                Join 5,000+ successful students. Limited seats available for the upcoming batch!
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
                <button
                  onClick={() => trackAndOpenWhatsApp({ source: 'pricing-bottom-enroll', message: 'Hi! I\'m ready to enroll at Cerebrum Biology Academy. Please share available courses and batch timings for my class.', campaign: 'pricing-bottom' })}
                  className="w-full sm:w-auto px-8 py-4 bg-[#25D366] hover:bg-[#20BD5A] text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 text-sm sm:text-base flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-5 h-5" />
                  Chat to Enroll Now
                </button>
                <button
                  onClick={() => trackAndOpenWhatsApp({ source: 'pricing-bottom-demo', message: 'Hi! I want to book a FREE demo class before enrolling. Please share available timings.', campaign: 'pricing-bottom' })}
                  className="w-full sm:w-auto px-8 py-4 bg-white/90 hover:bg-white text-gray-900 font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 border-2 border-gray-900/10 text-sm sm:text-base"
                >
                  Book Free Demo First
                </button>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mt-8 text-sm text-white/80">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4" />
                  Secure payment via Razorpay
                </span>
                <span className="flex items-center gap-1.5">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  Call +91-88264-44334
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 md:hidden bg-white/95 backdrop-blur-lg border-t border-gray-200/80 px-4 py-3 shadow-[0_-4px_30px_rgba(0,0,0,0.08)] z-50 safe-area-pb">
        <button
          onClick={() => trackAndOpenWhatsApp({ source: 'pricing-sticky-mobile', message: 'Hi! I\'m on the pricing page and want to enroll. Please help me choose the right course and plan.', campaign: 'pricing-sticky' })}
          className="w-full max-w-lg mx-auto bg-[#25D366] hover:bg-[#20BD5A] text-white font-bold py-3.5 rounded-xl text-sm shadow-lg shadow-green-500/25 active:scale-[0.98] transition-transform flex items-center justify-center gap-2"
        >
          <MessageCircle className="w-5 h-5" />
          Chat to Enroll — Starting ₹45,000/year
        </button>
      </div>
      </div>
    </>
  )
}
