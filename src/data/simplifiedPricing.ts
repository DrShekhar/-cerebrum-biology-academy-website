// 🎯 SIMPLIFIED PRICING STRATEGY - Content Optimization
// Based on content audit recommendation: 2 clear tiers instead of complex structure

export interface SimplifiedPricingTier {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  batchSize: number
  duration: string
  features: string[]
  highlights: string[]
  isPopular?: boolean
  ctaText: string
}

export const simplifiedPricingTiers: SimplifiedPricingTier[] = [
  {
    id: 'premium',
    name: 'Premium Batch',
    description: 'Maximum Personal Attention with AIIMS Faculty',
    price: 75000,
    originalPrice: 98000,
    batchSize: 12,
    duration: '12 months',
    features: [
      'AIIMS Faculty Teaching',
      'Only 12 Students per Batch',
      'Personal Mentor Assigned',
      'Weekly One-on-One Sessions',
      'Complete Study Material',
      'Unlimited Doubt Support',
      'All India Test Series',
      'Parent-Teacher Meetings',
      'Guaranteed Result Tracking',
    ],
    highlights: [
      '94.2% Success Rate',
      '12 Students vs 100+ in Allen/Aakash',
      'AIIMS Faculty',
      'Personal Attention',
    ],
    isPopular: true,
    ctaText: 'Book Free NEET Biology Demo',
  },
  {
    id: 'standard',
    name: 'Standard Batch',
    description: 'Quality Education with Experienced Faculty',
    price: 45000,
    originalPrice: 58000,
    batchSize: 25,
    duration: '12 months',
    features: [
      'Experienced Faculty',
      '25 Students per Batch',
      'Group Mentoring Sessions',
      'Bi-weekly Progress Reviews',
      'Complete Study Material',
      'Daily Doubt Sessions',
      'Monthly Test Series',
      'Parent Updates',
      'Performance Tracking',
    ],
    highlights: [
      '25 Students vs 100+ in Competitors',
      'Experienced Faculty',
      'Affordable Premium Education',
      'Regular Testing',
    ],
    ctaText: 'Book Free NEET Biology Demo',
  },
]

// Simplified pricing display helpers
export function getSimplifiedPricingDisplay() {
  return {
    premium: {
      price: '₹75,000',
      savings: 'Save ₹23,000',
      perMonth: '₹6,250/month',
      batchSize: '12 students',
      comparison: 'vs 100+ in Allen/Aakash',
    },
    standard: {
      price: '₹45,000',
      savings: 'Save ₹13,000',
      perMonth: '₹3,750/month',
      batchSize: '25 students',
      comparison: 'vs 100+ in competitors',
    },
  }
}

// Key differentiators for content optimization
export const keyDifferentiators = {
  batchSize: {
    cerebrum: '12-25 students',
    allen: '100+ students',
    aakash: '100+ students',
    byjus: 'Self-study only',
  },
  faculty: {
    cerebrum: 'AIIMS Faculty',
    competitors: 'General Faculty',
  },
  attention: {
    cerebrum: 'Personal Mentoring',
    competitors: 'Mass Teaching',
  },
  results: {
    cerebrum: '94.2% Success Rate',
    industry: '23% Average',
  },
}
