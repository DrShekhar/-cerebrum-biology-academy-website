'use client'

import React, { useState } from 'react'
import Link from 'next/link'
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
  ChevronUpIcon,
} from '@heroicons/react/24/outline'
import { Button } from '@/components/ui/Button'
import {
  allClassPricing,
  addOnCourses,
  type ClassLevel,
  type CourseType,
  type TierLevel,
  type PricingTier,
  type ClassPricing,
} from '@/data/pricing'
import { PaymentOptionsDisplay } from '@/components/pricing/PaymentOptionsDisplay'

export default function PricingPage() {
  const [selectedClass, setSelectedClass] = useState<ClassLevel | 'all'>('all')
  const [courseType, setCourseType] = useState<CourseType>('board-neet')
  const [paymentMode, setPaymentMode] = useState<
    'lumpSum' | 'twoInstallments' | 'threeInstallments'
  >('lumpSum')
  const [searchQuery, setSearchQuery] = useState('')
  const [expandedTier, setExpandedTier] = useState<string | null>(null)

  // Force browser to reload - cache busting
  React.useEffect(() => {
    const metaTag = document.createElement('meta')
    metaTag.httpEquiv = 'Cache-Control'
    metaTag.content = 'no-cache, no-store, must-revalidate'
    document.head.appendChild(metaTag)

    const metaTag2 = document.createElement('meta')
    metaTag2.httpEquiv = 'Pragma'
    metaTag2.content = 'no-cache'
    document.head.appendChild(metaTag2)

    const metaTag3 = document.createElement('meta')
    metaTag3.httpEquiv = 'Expires'
    metaTag3.content = '0'
    document.head.appendChild(metaTag3)
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
        bg: 'from-purple-600 to-pink-600',
        badge: 'bg-purple-100 text-purple-700',
        floatingBadge: '👑 BEST FOR TOP RANKERS',
        badgeGradient: 'from-yellow-400 via-yellow-500 to-amber-600',
      },
      ascent: {
        bg: 'from-blue-600 to-indigo-600',
        badge: 'bg-blue-100 text-blue-700',
        floatingBadge: '🔥 MOST POPULAR',
        badgeGradient: 'from-orange-500 via-red-500 to-pink-600',
      },
      pursuit: {
        bg: 'from-green-600 to-teal-600',
        badge: 'bg-green-100 text-green-700',
        floatingBadge: '💰 BEST VALUE',
        badgeGradient: 'from-green-400 via-emerald-500 to-teal-600',
      },
    }

    const colors = tierColors[tier.tier]

    return (
      <div
        key={tierKey}
        className="group relative bg-white rounded-3xl shadow-xl overflow-visible transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_70px_rgba(0,0,0,0.12)]"
      >
        <div
          className={`absolute -top-3 left-1/2 transform -translate-x-1/2 z-10 px-4 py-2 rounded-full bg-gradient-to-r ${colors.badgeGradient} text-white text-xs font-bold shadow-lg whitespace-nowrap`}
        >
          {colors.floatingBadge}
        </div>
        <div
          className={`bg-gradient-to-r ${colors.bg} text-white p-6 transition-all duration-500 group-hover:bg-gradient-to-br rounded-t-3xl`}
        >
          <div className="flex items-center gap-2 mb-4">
            <span className="px-3 py-1 bg-white/20 rounded-full text-sm font-medium capitalize">
              {tier.tier}
            </span>
            {isPopular && (
              <span className="px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-full text-xs font-bold">
                POPULAR
              </span>
            )}
          </div>

          <h3 className="text-2xl font-bold mb-3 capitalize">
            {classData.displayName} - {tier.tier}
          </h3>

          <p className="text-white/90 text-sm mb-4">{classData.description}</p>

          <div className="mt-3">
            <div className="inline-block bg-white/20 backdrop-blur-sm rounded-lg px-3 py-2">
              <div className="text-xs font-semibold uppercase tracking-wide mb-1">Best For:</div>
              <div className="text-sm font-medium">{bestForDescriptions[tier.tier]}</div>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-3 text-center">
            <div>
              <div className="text-2xl font-bold">{classData.duration}</div>
              <div className="text-xs text-white/80">Duration</div>
            </div>
            <div>
              <div className="text-2xl font-bold">{tier.hours}</div>
              <div className="text-xs text-white/80">Per Week</div>
            </div>
            <div>
              <div className="text-2xl font-bold">{tier.batchSize}</div>
              <div className="text-xs text-white/80">Batch Size</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-300">
                {tier.tier === 'pinnacle' ? '55' : tier.tier === 'ascent' ? '120' : '160'}
              </div>
              <div className="text-xs text-white/80">Enrolled</div>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="text-center mb-6">
            <div className="text-4xl font-bold text-gray-900 mb-1">₹{price.toLocaleString()}</div>
            <div className="text-sm text-blue-600 font-medium mb-2">
              Approx. ₹{Math.round(price / 12).toLocaleString()}/month
            </div>
            <div className="text-sm text-gray-500 line-through mb-1">
              ₹{(price + Math.round(price * 0.05)).toLocaleString()}
            </div>
            <div className="text-xs text-green-600 font-medium">Save ₹5 (5% off)</div>
          </div>

          <div className="mb-6">
            <h4 className="font-semibold text-gray-900 mb-3">Key Features:</h4>
            <div className="space-y-2">
              {tier.features.slice(0, 3).map((feature, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <CheckCircleIcon className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700">{feature}</span>
                </div>
              ))}
              {tier.features.length > 3 && (
                <button className="text-sm text-blue-600 font-medium">
                  +{tier.features.length - 3} more features
                </button>
              )}
            </div>
          </div>

          <button
            onClick={() => setExpandedTier(isExpanded ? null : tierKey)}
            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 rounded-lg mb-3 transition-colors flex items-center justify-center gap-2"
          >
            <span>View Payment Options</span>
            {isExpanded ? (
              <ChevronUpIcon className="w-5 h-5" />
            ) : (
              <ChevronDownIcon className="w-5 h-5" />
            )}
          </button>

          {isExpanded && (
            <div className="mb-4 animate-fadeIn">
              <PaymentOptionsDisplay
                lumpSum={tier.prices.lumpSum}
                twoInstallments={tier.prices.twoInstallments}
                threeInstallments={tier.prices.threeInstallments}
                tierName={tier.tier}
              />
            </div>
          )}

          <div className="grid grid-cols-2 gap-3 mb-3">
            <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-3 rounded-lg transition-colors">
              View Details
            </button>
            <Link href={`/demo-booking?tier=${tier.tier}&class=${classData.class}`}>
              <button
                className={`w-full bg-gradient-to-r ${colors.bg} text-white font-bold py-3 rounded-lg hover:opacity-90 transition-opacity`}
              >
                Enroll Now
              </button>
            </Link>
          </div>

          <button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition-colors mb-4">
            Book Free Demo Class
          </button>

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-purple-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 mb-6">
              <ShieldCheckIcon className="w-5 h-5" />
              <span className="font-semibold text-sm">Trusted by 5,000+ NEET aspirants</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
              Master NEET Biology
              <br />
              <span className="bg-gradient-to-r from-yellow-300 via-yellow-200 to-yellow-300 bg-clip-text text-transparent">
                With India&apos;s Best Faculty
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
              Small batches, personalized attention, and proven results. Choose your path to medical
              college success.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 text-center">
              <div className="text-4xl font-bold mb-2">6</div>
              <div className="text-blue-100 text-sm">Course Programs</div>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 text-center">
              <div className="text-4xl font-bold mb-2">3</div>
              <div className="text-blue-100 text-sm">Learning Tiers</div>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 text-center">
              <div className="text-4xl font-bold mb-2">98%</div>
              <div className="text-blue-100 text-sm">NEET Qualified 2024</div>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 text-center">
              <div className="text-4xl font-bold mb-2">7-Day</div>
              <div className="text-blue-100 text-sm">Money-Back Guarantee</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="sticky top-0 z-20 bg-gradient-to-br from-blue-50 via-white to-purple-50 pb-4 pt-2 shadow-sm">
          <div className="mb-6">
            <div className="relative max-w-2xl mx-auto">
              <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search courses by class, tier, or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-12 py-4 rounded-2xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none text-gray-700 shadow-sm"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <XMarkIcon className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>

          <div className="mb-8 overflow-x-auto">
            <div className="flex gap-2 min-w-max">
              <button
                onClick={() => setSelectedClass('all')}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium text-sm transition-all ${
                  selectedClass === 'all'
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-50 shadow'
                }`}
              >
                <span className="text-lg">🎓</span>
                <span>All Classes</span>
                <span
                  className={`ml-1 px-2 py-0.5 rounded-full text-xs ${
                    selectedClass === 'all' ? 'bg-white/20 text-white' : 'bg-gray-200 text-gray-600'
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
                  className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium text-sm transition-all ${
                    selectedClass === item.class
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:bg-gray-50 shadow'
                  }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span>{item.label}</span>
                  <span
                    className={`ml-1 px-2 py-0.5 rounded-full text-xs ${
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

          <div className="flex flex-col md:flex-row justify-center items-center gap-6 mb-8">
            {selectedClass !== 'all' && availableCourseTypes.length > 1 && (
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-gray-700">Focus:</span>
                <div className="inline-flex rounded-lg bg-gray-100 p-1">
                  {availableCourseTypes.map((type) => (
                    <button
                      key={type}
                      onClick={() => setCourseType(type)}
                      className={`px-4 py-2 rounded-md font-medium text-sm transition-all ${
                        courseType === type
                          ? 'bg-white text-blue-600 shadow-sm'
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      {type === 'board-only'
                        ? 'Board Only'
                        : type === 'board-neet'
                          ? 'Board + NEET'
                          : type === 'academic'
                            ? 'Academic'
                            : 'NEET'}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-gray-700">Payment:</span>
              <div className="inline-flex rounded-lg bg-gray-100 p-1">
                <button
                  onClick={() => setPaymentMode('lumpSum')}
                  className={`px-4 py-2 rounded-md font-medium text-sm transition-all ${
                    paymentMode === 'lumpSum'
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Lump Sum
                </button>
                <button
                  onClick={() => setPaymentMode('twoInstallments')}
                  className={`px-4 py-2 rounded-md font-medium text-sm transition-all ${
                    paymentMode === 'twoInstallments'
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  2 Installments
                </button>
                <button
                  onClick={() => setPaymentMode('threeInstallments')}
                  className={`px-4 py-2 rounded-md font-medium text-sm transition-all ${
                    paymentMode === 'threeInstallments'
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  3 Installments
                </button>
              </div>
            </div>
          </div>
        </div>

        {hasResults && (
          <div className="text-center mb-6">
            <p className="text-lg text-gray-700">
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
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <div className="text-gray-400 mb-6">
                <svg
                  className="w-24 h-24 mx-auto"
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
              <h3 className="text-2xl font-bold text-gray-900 mb-2">No courses found</h3>
              <p className="text-gray-600 mb-6">
                We couldn't find any courses matching your search criteria. Try adjusting your
                filters.
              </p>
              <button
                onClick={clearFilters}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
              >
                Clear Filters
              </button>
            </div>
          </div>
        )}

        {selectedClass === 'all' && hasResults ? (
          <div className="space-y-16">
            {filteredClasses.map((classData) => {
              const allTiers = Object.entries(classData.tiers).flatMap(([courseTypeKey, tiers]) =>
                tiers.map((tier) => ({ ...tier, courseType: courseTypeKey as CourseType }))
              )

              return (
                <div key={classData.class}>
                  <div className="mb-6">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">
                      {classData.displayName}
                    </h2>
                    <p className="text-gray-600">{classData.description}</p>
                  </div>
                  <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8 pt-6">
                    {allTiers.map((tier) => renderTierCard(tier, classData))}
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          hasResults && (
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8 mb-16 pt-6">
              {currentTiers.map((tier) =>
                currentClassData ? renderTierCard(tier, currentClassData) : null
              )}
            </div>
          )
        )}

        <div className="bg-white rounded-3xl shadow-xl p-8 mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Tier Comparison</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="pb-4 font-semibold">Feature</th>
                  <th className="pb-4 text-center font-semibold">Pinnacle</th>
                  <th className="pb-4 text-center font-semibold">Ascent</th>
                  <th className="pb-4 text-center font-semibold">Pursuit</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="py-4 font-medium">Batch Size</td>
                  <td className="py-4 text-center text-green-600 font-semibold">10-12</td>
                  <td className="py-4 text-center text-blue-600 font-semibold">16-25</td>
                  <td className="py-4 text-center text-gray-600 font-semibold">30-40</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-4 font-medium">Weekly Hours</td>
                  <td className="py-4 text-center">5-6 hrs</td>
                  <td className="py-4 text-center">4-5 hrs</td>
                  <td className="py-4 text-center">3-4 hrs</td>
                </tr>
                <tr className="border-b border-gray-100">
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
                <tr className="border-b border-gray-100">
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
                <tr className="border-b border-gray-100">
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
                <tr className="border-b border-gray-100">
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
                <tr className="border-b border-gray-100">
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
                <tr className="border-b border-gray-100">
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
                <tr className="border-b border-gray-100">
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
                <tr className="border-b border-gray-100">
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
          <div className="grid md:grid-cols-3 gap-8">
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

        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl p-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Ready to Start Your NEET Journey?
            </h2>
            <p className="text-xl text-gray-800 mb-8">
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
            <p className="text-sm text-gray-700 mt-4">
              🔒 Secure payment via Razorpay • 📞 Call +91-88264-44334 for queries
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
