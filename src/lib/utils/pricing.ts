import { courseTiers, coursePrograms } from '@/data/courseSystemData'
import type { CourseSeries } from '@/types/courseSystem'

export interface PricingInfo {
  minPrice: number
  maxPrice: number
  formattedMinPrice: string
  formattedMaxPrice: string
  priceRange: string
  tiers: {
    series: CourseSeries
    name: string
    price: number
    formattedPrice: string
  }[]
}

/**
 * Formats currency amount to Indian Rupees
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount)
}

/**
 * Formats currency amount with ₹ symbol (compact format)
 */
export function formatPrice(amount: number): string {
  if (amount >= 100000) {
    return `₹${(amount / 100000).toFixed(1)}L`
  } else if (amount >= 1000) {
    return `₹${(amount / 1000).toFixed(0)}K`
  }
  return `₹${amount.toLocaleString('en-IN')}`
}

/**
 * Gets complete pricing information for a course program
 */
export function getCoursePricing(programId: string): PricingInfo {
  const program = coursePrograms.find((p) => p.id === programId)

  if (!program) {
    throw new Error(`Course program with id "${programId}" not found`)
  }

  // Get pricing from all available tiers for this program
  const tierPricing = courseTiers.map((tier) => {
    // Use different pricing logic based on course type
    let price: number

    switch (programId) {
      case 'class-9-foundation-biology':
      case 'class-10-foundation-biology':
        price = Math.round(tier.priceRange.min * 0.7) // Foundation discount
        break
      case 'class-11-neet-comprehensive':
        price = tier.priceRange.min
        break
      case 'class-12-neet-intensive':
        price = tier.priceRange.min + 10000 // Premium for Class 12
        break
      case 'neet-dropper-intensive':
        price = tier.priceRange.max // Premium pricing for dropper
        break
      default:
        price = tier.priceRange.min
    }

    return {
      series: tier.series,
      name: tier.name,
      price,
      formattedPrice: formatPrice(price),
    }
  })

  const minPrice = Math.min(...tierPricing.map((t) => t.price))
  const maxPrice = Math.max(...tierPricing.map((t) => t.price))

  return {
    minPrice,
    maxPrice,
    formattedMinPrice: formatPrice(minPrice),
    formattedMaxPrice: formatPrice(maxPrice),
    priceRange:
      minPrice === maxPrice
        ? formatPrice(minPrice)
        : `${formatPrice(minPrice)} - ${formatPrice(maxPrice)}`,
    tiers: tierPricing,
  }
}

/**
 * Gets pricing for a specific tier and course combination
 */
export function getTierPricing(programId: string, tierSeries: CourseSeries): number {
  const pricing = getCoursePricing(programId)
  const tier = pricing.tiers.find((t) => t.series === tierSeries)

  if (!tier) {
    throw new Error(`Tier "${tierSeries}" not found for program "${programId}"`)
  }

  return tier.price
}

/**
 * Calculates EMI amount based on course price and tenure
 */
export function calculateEMI(
  principal: number,
  ratePercent: number = 0, // 0% for no-cost EMI
  tenureMonths: number = 12
): number {
  if (ratePercent === 0) {
    return Math.round(principal / tenureMonths)
  }

  const monthlyRate = ratePercent / (12 * 100)
  const emi =
    (principal * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) /
    (Math.pow(1 + monthlyRate, tenureMonths) - 1)

  return Math.round(emi)
}

/**
 * Gets scholarship discount information
 */
export function getScholarshipDiscount(score: number): {
  percentage: number
  amount: number
  formattedAmount: string
} {
  let percentage = 0

  if (score >= 95) {
    percentage = 25
  } else if (score >= 90) {
    percentage = 20
  } else if (score >= 85) {
    percentage = 15
  } else if (score >= 80) {
    percentage = 10
  } else if (score >= 75) {
    percentage = 5
  }

  return {
    percentage,
    amount: 0, // Will be calculated based on selected course
    formattedAmount: '',
  }
}

/**
 * Gets competitive advantage messaging
 */
export function getCompetitivePricingAdvantages(): string[] {
  return [
    "Starting at ₹48K vs competitors' ₹60K (Pursuit Series)",
    'Advanced EMI calculator with 0% interest options',
    'Up to 25% scholarships based on academic performance',
    'Flexible payment plans - monthly, quarterly, or annual',
    'No hidden fees or additional charges',
    'Money-back guarantee within first 30 days',
  ]
}

/**
 * Validates pricing data consistency
 */
export function validatePricingConsistency(): {
  isValid: boolean
  issues: string[]
} {
  const issues: string[] = []

  // Check if all course programs have valid pricing
  coursePrograms.forEach((program) => {
    try {
      const pricing = getCoursePricing(program.id)
      if (pricing.minPrice <= 0 || pricing.maxPrice <= 0) {
        issues.push(`Invalid pricing for program: ${program.id}`)
      }
    } catch (error) {
      issues.push(`Pricing error for program ${program.id}: ${error}`)
    }
  })

  return {
    isValid: issues.length === 0,
    issues,
  }
}
