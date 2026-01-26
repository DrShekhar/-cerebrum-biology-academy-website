'use client'

import { Check, Users, Clock, Star, Sparkles, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { TierLevel, PricingTier, getTierDetails } from '@/data/pricing'
import { cn } from '@/lib/utils'

interface TierSelectorProps {
  tiers: PricingTier[]
  selectedTier: TierLevel | null
  onSelect: (tier: TierLevel) => void
}

export function TierSelector({ tiers, selectedTier, onSelect }: TierSelectorProps) {
  const tierOrder: TierLevel[] = ['pursuit', 'ascent', 'pinnacle']

  const sortedTiers = [...tiers].sort(
    (a, b) => tierOrder.indexOf(a.tier) - tierOrder.indexOf(b.tier)
  )

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">Choose Your Batch Type</h3>
      <div className="grid gap-4 md:grid-cols-3">
        {sortedTiers.map((tier) => {
          const details = getTierDetails(tier.tier)
          const isSelected = selectedTier === tier.tier
          const isPopular = details?.popular

          return (
            <button
              key={tier.tier}
              type="button"
              onClick={() => onSelect(tier.tier)}
              className={cn(
                'relative rounded-xl border-2 p-5 text-left transition-all duration-200',
                isSelected
                  ? 'border-blue-600 bg-blue-50 ring-2 ring-blue-600 ring-offset-2'
                  : 'border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50/50',
                isPopular && !isSelected && 'border-purple-300'
              )}
            >
              {isPopular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1 rounded-full bg-indigo-500 px-3 py-1 text-xs font-semibold text-white shadow-md">
                    <Star className="h-3 w-3 fill-current" />
                    Most Popular
                  </span>
                </div>
              )}

              <div className="mb-3 flex items-start justify-between">
                <div>
                  <h4
                    className={cn(
                      'text-lg font-bold',
                      tier.tier === 'pinnacle' && 'text-blue-700',
                      tier.tier === 'ascent' && 'text-purple-700',
                      tier.tier === 'pursuit' && 'text-green-700'
                    )}
                  >
                    {details?.name}
                  </h4>
                  <p className="text-sm text-gray-600">{details?.subtitle}</p>
                </div>
                <div
                  className={cn(
                    'flex h-6 w-6 items-center justify-center rounded-full border-2',
                    isSelected
                      ? 'border-blue-600 bg-blue-600 text-white'
                      : 'border-gray-300 bg-white'
                  )}
                >
                  {isSelected && <Check className="h-4 w-4" />}
                </div>
              </div>

              <div className="mb-4 space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <Users className="h-4 w-4 text-gray-500" />
                  <span>{tier.batchSize} students per batch</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <span>{tier.hours}</span>
                </div>
              </div>

              <div className="mb-4 border-t border-gray-100 pt-4">
                <div className="text-2xl font-bold text-gray-900">
                  ₹{tier.prices.lumpSum.toLocaleString('en-IN')}
                </div>
                <p className="text-xs text-gray-500">Full payment (best value)</p>
              </div>

              <div className="space-y-2">
                {tier.features.slice(0, 4).map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                    <Check
                      className={cn(
                        'mt-0.5 h-4 w-4 flex-shrink-0',
                        tier.tier === 'pinnacle' && 'text-blue-600',
                        tier.tier === 'ascent' && 'text-purple-600',
                        tier.tier === 'pursuit' && 'text-green-600'
                      )}
                    />
                    <span className="line-clamp-1">{feature}</span>
                  </div>
                ))}
                {tier.features.length > 4 && (
                  <p className="text-xs text-gray-500">+{tier.features.length - 4} more features</p>
                )}
              </div>

              {tier.tier === 'pinnacle' && (
                <div className="mt-4 flex items-center gap-1 text-xs text-blue-600">
                  <Sparkles className="h-3 w-3" />
                  <span>Personal mentorship included</span>
                </div>
              )}
            </button>
          )
        })}
      </div>

      {/* Intensive Biology Program Upgrade Recommendation */}
      {selectedTier === 'pinnacle' && (
        <div className="mt-6 rounded-xl border-2 border-dashed border-[#3d4d3d]/30 bg-[#e8ede8] p-5">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Sparkles className="h-4 w-4 text-[#3d4d3d]" />
                <span className="text-sm font-semibold text-[#3d4d3d]">Upgrade Available</span>
              </div>
              <h4 className="text-base font-bold text-gray-900 mb-1">Intensive Biology Program</h4>
              <p className="text-sm text-gray-600">
                Get 1-on-1 mentorship, ultra-exclusive cohort & top rank focus with Pinnacle
              </p>
            </div>
            <Link
              href="/courses/intensive-neet-biology"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#3d4d3d] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#4a5d4a] transition-colors whitespace-nowrap"
            >
              Learn More
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
