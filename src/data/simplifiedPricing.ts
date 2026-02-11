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
    id: 'pinnacle',
    name: 'Pinnacle Batch',
    description: 'Maximum Personal Attention with AIIMS Faculty',
    price: 98000,
    originalPrice: 110000,
    batchSize: 12,
    duration: '12 months',
    features: [
      'AIIMS Faculty Teaching',
      'Only 10-12 Students per Batch',
      'Personal Mentor Assigned',
      'Weekly One-on-One Sessions',
      'Complete Study Material',
      'Unlimited Doubt Support',
      'All India Test Series',
      'Parent-Teacher Meetings',
      'Guaranteed Result Tracking',
    ],
    highlights: [
      '98% Success Rate',
      '12 Students vs 100+ in Allen/Aakash',
      'AIIMS Faculty',
      'Personal Attention',
    ],
    isPopular: true,
    ctaText: 'Book Free NEET Biology Demo',
  },
  {
    id: 'ascent',
    name: 'Ascent Batch',
    description: 'Balanced Features with Expert Faculty',
    price: 76000,
    originalPrice: 85000,
    batchSize: 20,
    duration: '12 months',
    features: [
      'Expert Faculty Teaching',
      '16-20 Students per Batch',
      'Group Mentoring Sessions',
      'Weekly Progress Reviews',
      'Complete Study Material',
      'Daily Doubt Sessions',
      'Comprehensive Test Series',
      'Parent Updates',
      'Performance Tracking',
    ],
    highlights: [
      '20 Students vs 100+ in Competitors',
      'Expert Faculty',
      'Balanced Value Education',
      'Regular Testing',
    ],
    ctaText: 'Book Free NEET Biology Demo',
  },
  {
    id: 'pursuit',
    name: 'Pursuit Batch',
    description: 'Quality Education at Affordable Pricing',
    price: 48000,
    originalPrice: 55000,
    batchSize: 30,
    duration: '12 months',
    features: [
      'Experienced Faculty',
      '25-30 Students per Batch',
      'Group Study Sessions',
      'Monthly Progress Reviews',
      'Complete Study Material',
      'Regular Doubt Sessions',
      'Monthly Test Series',
      'Performance Tracking',
      'Self-paced Learning Support',
    ],
    highlights: [
      '30 Students vs 100+ in Competitors',
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
    pinnacle: {
      price: '₹98,000',
      savings: 'Save ₹12,000',
      perMonth: '₹8,167/month',
      batchSize: '10-12 students',
      comparison: 'vs 100+ in Allen/Aakash',
    },
    ascent: {
      price: '₹76,000',
      savings: 'Save ₹9,000',
      perMonth: '₹6,333/month',
      batchSize: '16-20 students',
      comparison: 'vs 100+ in competitors',
    },
    pursuit: {
      price: '₹48,000',
      savings: 'Save ₹7,000',
      perMonth: '₹4,000/month',
      batchSize: '25-30 students',
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
    cerebrum: '98% Success Rate',
    industry: '23% Average',
  },
}
