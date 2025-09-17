// A/B Testing Hero Variants for Conversion Optimization
// Based on product strategy analysis for maximum impact

export interface HeroVariant {
  id: string
  name: string
  headline: {
    main: string
    highlight1: string
    highlight2: string
  }
  subtext: string
  primaryCTA: string
  secondaryCTA: string
  weight: number // For traffic distribution
}

export const heroVariants: HeroVariant[] = [
  {
    id: 'control',
    name: 'Original Control',
    headline: {
      main: 'From',
      highlight1: 'NEET Dreams',
      highlight2: 'Medical College Reality',
    },
    subtext:
      "Join 2,847 students who secured medical seats with Cerebrum Biology Academy's proven 94.2% success methodology. Transform your NEET preparation with personalized coaching from AIIMS faculty.",
    primaryCTA: 'Book Free Cerebrum Demo',
    secondaryCTA: 'Call Cerebrum: +91 88264 44334',
    weight: 25, // 25% traffic
  },
  {
    id: 'outcome_focused',
    name: 'Outcome-Focused (High Impact)',
    headline: {
      main: '2,847 Medical Seats Secured by Cerebrum -',
      highlight1: 'Your Turn',
      highlight2: 'Next',
    },
    subtext:
      "Join Cerebrum Biology Academy - India's #1 NEET Biology coaching with 94.2% success rate. Get personalized mentorship from AIIMS faculty and guarantee your medical college admission.",
    primaryCTA: 'Secure My Seat - Cerebrum Demo',
    secondaryCTA: 'Call Cerebrum: +91 88264 44334',
    weight: 30, // 30% traffic - primary test variant
  },
  {
    id: 'urgency_social_proof',
    name: 'Urgency + Social Proof',
    headline: {
      main: 'Last 7 Cerebrum Seats Left -',
      highlight1: 'Join 2,847 Successful',
      highlight2: 'NEET Toppers',
    },
    subtext:
      "Limited seats for Cerebrum's November batch! Get the same proven methodology that helped 2,847 students crack NEET with 94.2% success rate. AIIMS faculty coaching included.",
    primaryCTA: 'Grab Cerebrum Seat - Free Demo',
    secondaryCTA: 'Call Cerebrum: +91 88264 44334',
    weight: 25, // 25% traffic
  },
  {
    id: 'guarantee_focused',
    name: 'Guarantee-Focused',
    headline: {
      main: 'Cerebrum Guarantees Your',
      highlight1: 'Medical Seat',
      highlight2: '94.2% Success Rate',
    },
    subtext:
      'Join Cerebrum - the only NEET coaching with proven track record - 2,847 medical seats secured. Get personalized AIIMS faculty mentorship or get 50% refund guarantee.',
    primaryCTA: 'Start My Cerebrum Journey - Demo',
    secondaryCTA: 'Call Cerebrum: +91 88264 44334',
    weight: 20, // 20% traffic
  },
]

// A/B Testing Configuration
export const abTestConfig = {
  testName: 'hero_headline_optimization',
  description: 'Testing hero headline variants for conversion optimization',
  startDate: '2025-01-17',
  endDate: '2025-02-17', // 30-day test
  trafficAllocation: 100, // 100% of visitors in test
  primaryMetric: 'demo_bookings',
  secondaryMetrics: ['phone_calls', 'form_starts', 'scroll_depth'],
  minimumSampleSize: 1000, // visitors per variant
  confidenceLevel: 95,
  minimumDetectableEffect: 15, // 15% improvement threshold
}

// Utility function to get variant for user
export function getHeroVariant(userId?: string): HeroVariant {
  // Simple hash-based assignment for consistent user experience
  const visitorId = userId || generateVisitorId()
  const hash = hashString(visitorId)

  // Weighted random selection based on variant weights
  const totalWeight = heroVariants.reduce((sum, variant) => sum + variant.weight, 0)
  const random = (hash % 100) + 1 // 1-100

  let cumulativeWeight = 0
  for (const variant of heroVariants) {
    cumulativeWeight += (variant.weight / totalWeight) * 100
    if (random <= cumulativeWeight) {
      return variant
    }
  }

  // Fallback to control
  return heroVariants[0]
}

// Simple hash function for consistent assignment
function hashString(str: string): number {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = (hash << 5) - hash + char
    hash = hash & hash // Convert to 32-bit integer
  }
  return Math.abs(hash)
}

// Generate visitor ID if not provided
function generateVisitorId(): string {
  if (typeof window !== 'undefined') {
    // Try to get existing visitor ID from localStorage
    const existingId = localStorage.getItem('visitor_id')
    if (existingId) return existingId

    // Generate new visitor ID
    const newId = `visitor_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    localStorage.setItem('visitor_id', newId)
    return newId
  }

  // Server-side fallback
  return `visitor_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

// Analytics tracking for A/B test results
export interface ABTestEvent {
  testName: string
  variantId: string
  variantName: string
  event: string
  userId?: string
  timestamp: number
  metadata?: Record<string, any>
}

export function trackABTestEvent(
  variantId: string,
  event: string,
  metadata?: Record<string, any>
): void {
  const variant = heroVariants.find((v) => v.id === variantId)
  if (!variant) return

  const eventData: ABTestEvent = {
    testName: abTestConfig.testName,
    variantId,
    variantName: variant.name,
    event,
    timestamp: Date.now(),
    metadata,
  }

  // Track to analytics (implement your analytics provider)
  if (typeof window !== 'undefined') {
    // Google Analytics 4 example
    if ((window as any).gtag) {
      ;(window as any).gtag('event', 'ab_test_conversion', {
        test_name: eventData.testName,
        variant_id: eventData.variantId,
        variant_name: eventData.variantName,
        event_type: event,
        custom_parameter_1: metadata?.page || 'homepage',
      })
    }

    // Custom analytics endpoint
    fetch('/api/analytics/ab-test', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(eventData),
    }).catch((err) => console.warn('AB test tracking failed:', err))
  }
}
