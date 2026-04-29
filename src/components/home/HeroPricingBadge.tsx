'use client'

import { useForeignPrice, formatINR } from '@/components/ui/DualCurrencyPrice'

/**
 * Hero pricing anchor. INR-only for Indian visitors with the EMI line
 * ("Courses from ₹48,000/year · EMI from ₹4,000/mo"). For non-IN
 * visitors: local currency only and the EMI line is dropped (EMI is
 * an Indian-bank-only product, misleading to show internationally).
 */
export function HeroPricingBadge() {
  const foreign = useForeignPrice(48000)

  if (!foreign) {
    return (
      <span className="text-amber-200 font-semibold text-xs xs:text-sm md:text-base">
        Courses from {formatINR(48000)}/year · EMI from {formatINR(4000)}/mo
      </span>
    )
  }

  const local = `${foreign.symbol}${foreign.amount.toLocaleString('en-US')}`
  return (
    <span className="text-amber-200 font-semibold text-xs xs:text-sm md:text-base">
      Courses from {local} {foreign.code}/year
    </span>
  )
}
