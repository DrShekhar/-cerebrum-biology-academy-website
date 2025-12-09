'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, X, Crown, Star, Sparkles, Users, Clock, MessageSquare } from 'lucide-react'
import { allClassPricing, getTierDetails, type TierLevel, type ClassLevel } from '@/data/pricing'

interface PricingComparisonTableProps {
  showWhatsAppCTA?: boolean
  highlightTier?: TierLevel
  courseType?: 'neet' | 'board-neet' | 'academic'
  classFilter?: ClassLevel[]
}

const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price)
}

export function PricingComparisonTable({
  showWhatsAppCTA = true,
  highlightTier = 'ascent',
  courseType = 'neet',
  classFilter,
}: PricingComparisonTableProps) {
  const [selectedCourseType, setSelectedCourseType] = useState<'neet' | 'board-neet' | 'academic'>(
    courseType
  )

  const filteredClasses = classFilter
    ? allClassPricing.filter((c) => classFilter.includes(c.class))
    : allClassPricing.filter((c) => ['class-11', 'class-12', 'dropper', '2-year'].includes(c.class))

  const tiers: TierLevel[] = ['pursuit', 'ascent', 'pinnacle']

  const tierIcons = {
    pursuit: Sparkles,
    ascent: Star,
    pinnacle: Crown,
  }

  const tierColors = {
    pursuit: 'from-emerald-500 to-teal-600',
    ascent: 'from-purple-500 to-indigo-600',
    pinnacle: 'from-amber-500 to-orange-600',
  }

  const tierBgColors = {
    pursuit: 'bg-emerald-50 border-emerald-200',
    ascent: 'bg-purple-50 border-purple-200',
    pinnacle: 'bg-amber-50 border-amber-200',
  }

  return (
    <div className="w-full">
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {(['neet', 'board-neet', 'academic'] as const).map((type) => (
          <button
            key={type}
            onClick={() => setSelectedCourseType(type)}
            className={`px-4 py-2 min-h-[44px] rounded-full text-sm font-medium transition-all touch-manipulation ${
              selectedCourseType === type
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {type === 'neet' && 'NEET Only'}
            {type === 'board-neet' && 'Board + NEET'}
            {type === 'academic' && 'Academic Only'}
          </button>
        ))}
      </div>

      <div className="overflow-x-auto -mx-4 px-4 pb-2">
        <table className="w-full min-w-[600px] sm:min-w-[700px] border-collapse">
          <thead>
            <tr>
              <th className="p-4 text-left bg-gray-50 rounded-tl-xl"></th>
              {tiers.map((tier) => {
                const details = getTierDetails(tier)
                const Icon = tierIcons[tier]
                const isHighlighted = tier === highlightTier

                return (
                  <th
                    key={tier}
                    className={`p-4 text-center relative ${
                      isHighlighted
                        ? `${tierBgColors[tier]} border-2 border-b-0 rounded-t-xl`
                        : 'bg-gray-50'
                    }`}
                  >
                    {isHighlighted && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                        Most Popular
                      </div>
                    )}
                    <div
                      className={`inline-flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br ${tierColors[tier]} mb-2`}
                    >
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="font-bold text-lg text-gray-900 capitalize">
                      {details?.name}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">{details?.subtitle}</div>
                  </th>
                )
              })}
            </tr>
          </thead>

          <tbody>
            <tr className="border-t border-gray-200">
              <td className="p-4 font-medium text-gray-700 flex items-center gap-2">
                <Users className="w-4 h-4 text-gray-400" />
                Batch Size
              </td>
              <td className="p-4 text-center text-gray-900 font-medium">30-40 students</td>
              <td
                className={`p-4 text-center text-gray-900 font-medium ${highlightTier === 'ascent' ? tierBgColors.ascent : ''}`}
              >
                16-18 students
              </td>
              <td className="p-4 text-center text-gray-900 font-medium">10-12 students</td>
            </tr>

            <tr className="border-t border-gray-200 bg-gray-50/50">
              <td className="p-4 font-medium text-gray-700 flex items-center gap-2">
                <Clock className="w-4 h-4 text-gray-400" />
                Hours/Week
              </td>
              <td className="p-4 text-center text-gray-900">6 hrs/week</td>
              <td
                className={`p-4 text-center text-gray-900 ${highlightTier === 'ascent' ? tierBgColors.ascent : ''}`}
              >
                8 hrs/week
              </td>
              <td className="p-4 text-center text-gray-900">10-12 hrs/week</td>
            </tr>

            {filteredClasses.map((classPricing) => {
              const tiersData = classPricing.tiers[selectedCourseType]
              if (!tiersData) return null

              return (
                <tr key={classPricing.class} className="border-t border-gray-200">
                  <td className="p-4 font-medium text-gray-700">
                    {classPricing.displayName}
                    <div className="text-xs text-gray-500">{classPricing.duration}</div>
                  </td>
                  {tiers.map((tier) => {
                    const tierData = tiersData.find((t) => t.tier === tier)
                    const isHighlighted = tier === highlightTier

                    return (
                      <td
                        key={tier}
                        className={`p-4 text-center ${isHighlighted ? tierBgColors[tier] : ''}`}
                      >
                        {tierData ? (
                          <div>
                            <div className="text-lg font-bold text-gray-900">
                              {formatPrice(tierData.prices.lumpSum)}
                            </div>
                            <div className="text-xs text-gray-500">
                              or {formatPrice(Math.round(tierData.prices.threeInstallments / 3))}/mo
                            </div>
                          </div>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </td>
                    )
                  })}
                </tr>
              )
            })}

            <tr className="border-t border-gray-200 bg-gray-50/50">
              <td className="p-4 font-medium text-gray-700">AIIMS Faculty</td>
              <td className="p-4 text-center">
                <Check className="w-5 h-5 text-green-600 mx-auto" />
              </td>
              <td
                className={`p-4 text-center ${highlightTier === 'ascent' ? tierBgColors.ascent : ''}`}
              >
                <Check className="w-5 h-5 text-green-600 mx-auto" />
              </td>
              <td className="p-4 text-center">
                <Check className="w-5 h-5 text-green-600 mx-auto" />
              </td>
            </tr>

            <tr className="border-t border-gray-200">
              <td className="p-4 font-medium text-gray-700">Personal Mentorship</td>
              <td className="p-4 text-center">
                <X className="w-5 h-5 text-gray-400 mx-auto" />
              </td>
              <td
                className={`p-4 text-center ${highlightTier === 'ascent' ? tierBgColors.ascent : ''}`}
              >
                <X className="w-5 h-5 text-gray-400 mx-auto" />
              </td>
              <td className="p-4 text-center">
                <Check className="w-5 h-5 text-green-600 mx-auto" />
              </td>
            </tr>

            <tr className="border-t border-gray-200 bg-gray-50/50">
              <td className="p-4 font-medium text-gray-700">1-on-1 Doubt Sessions</td>
              <td className="p-4 text-center text-gray-600 text-sm">Bi-weekly group</td>
              <td
                className={`p-4 text-center text-gray-600 text-sm ${highlightTier === 'ascent' ? tierBgColors.ascent : ''}`}
              >
                Weekly group
              </td>
              <td className="p-4 text-center text-gray-600 text-sm">Weekly 1-on-1</td>
            </tr>

            <tr className="border-t border-gray-200">
              <td className="p-4 font-medium text-gray-700">Mock Tests</td>
              <td className="p-4 text-center text-gray-600 text-sm">Basic series</td>
              <td
                className={`p-4 text-center text-gray-600 text-sm ${highlightTier === 'ascent' ? tierBgColors.ascent : ''}`}
              >
                Standard series
              </td>
              <td className="p-4 text-center text-gray-600 text-sm">Premium series</td>
            </tr>

            <tr className="border-t border-gray-200 bg-gray-50/50">
              <td className="p-4 font-medium text-gray-700">Recorded Lectures</td>
              <td className="p-4 text-center">
                <Check className="w-5 h-5 text-green-600 mx-auto" />
              </td>
              <td
                className={`p-4 text-center ${highlightTier === 'ascent' ? tierBgColors.ascent : ''}`}
              >
                <Check className="w-5 h-5 text-green-600 mx-auto" />
              </td>
              <td className="p-4 text-center">
                <Check className="w-5 h-5 text-green-600 mx-auto" />
              </td>
            </tr>

            <tr className="border-t border-gray-200">
              <td className="p-4 font-medium text-gray-700">Money-back Guarantee</td>
              <td className="p-4 text-center">
                <X className="w-5 h-5 text-gray-400 mx-auto" />
              </td>
              <td
                className={`p-4 text-center ${highlightTier === 'ascent' ? tierBgColors.ascent : ''}`}
              >
                <X className="w-5 h-5 text-gray-400 mx-auto" />
              </td>
              <td className="p-4 text-center">
                <Check className="w-5 h-5 text-green-600 mx-auto" />
              </td>
            </tr>

            <tr className="border-t-2 border-gray-300">
              <td className="p-4"></td>
              {tiers.map((tier) => {
                const isHighlighted = tier === highlightTier
                return (
                  <td
                    key={tier}
                    className={`p-4 text-center ${isHighlighted ? `${tierBgColors[tier]} border-2 border-t-0 rounded-b-xl` : ''}`}
                  >
                    <motion.a
                      href="/demo-booking"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`inline-block w-full px-4 py-3 rounded-xl font-semibold text-sm transition-all min-h-[44px] touch-manipulation ${
                        isHighlighted
                          ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg hover:shadow-xl'
                          : 'bg-gray-900 text-white hover:bg-gray-800'
                      }`}
                    >
                      Book Free Demo
                    </motion.a>
                  </td>
                )
              })}
            </tr>
          </tbody>
        </table>
      </div>

      {showWhatsAppCTA && (
        <div className="mt-8 text-center">
          <p className="text-gray-600 mb-3">Need help choosing the right plan?</p>
          <a
            href="https://wa.me/918826444334?text=Hi!%20I%20need%20help%20choosing%20the%20right%20plan%20for%20NEET%20preparation."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#25D366] hover:bg-[#20BD5A] text-white font-semibold rounded-xl transition-colors min-h-[48px] touch-manipulation"
          >
            <MessageSquare className="w-5 h-5" />
            Chat with us on WhatsApp
          </a>
        </div>
      )}
    </div>
  )
}
