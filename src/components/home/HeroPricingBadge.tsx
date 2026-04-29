'use client'

import { useForeignPrice, formatINR } from '@/components/ui/DualCurrencyPrice'

/**
 * Hero pricing anchor. INR-primary for Indian visitors with the EMI
 * line ("Courses from ₹48,000/year · EMI from ₹4,000/mo"). For non-IN
 * visitors the local-currency amount is primary and the EMI line is
 * dropped — EMI is an Indian-bank-only product, so showing it to US/UK
 * visitors is misleading.
 */
export function HeroPricingBadge() {
  const foreign = useForeignPrice(48000)

  if (!foreign) {
    // INR view (also the SSR-time skeleton — first paint before geo).
    return (
      <span className="text-amber-200 font-semibold text-xs xs:text-sm md:text-base">
        Courses from {formatINR(48000)}/year · EMI from {formatINR(4000)}/mo
      </span>
    )
  }

  const local = `${foreign.symbol}${foreign.amount.toLocaleString('en-US')}`
  return (
    <span className="text-amber-200 font-semibold text-xs xs:text-sm md:text-base">
      Courses from {local} {foreign.code}/year{' '}
      <span className="text-amber-200/70">(≈ {formatINR(48000)} INR)</span>
    </span>
  )
}
