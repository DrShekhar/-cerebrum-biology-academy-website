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
    id: 'batch_size_focus',
    name: 'Small Batch Differentiator (Content Optimized)',
    headline: {
      main: '12 Students per Batch',
      highlight1: 'vs 100+ in Allen/Aakash',
      highlight2: 'Personal Attention. Proven Results.',
    },
    subtext:
      '98% Success Rate with AIIMS Faculty. Join 1,50,000+ students who chose personal attention over mass coaching. Premium NEET Biology preparation with guaranteed results.',
    primaryCTA: 'Book Free NEET Biology Demo',
    secondaryCTA: 'Call Now: +91 88264 44334',
    weight: 40, // Primary content-optimized variant
  },
  {
    id: 'outcome_focused_v2',
    name: 'Results-Focused with Differentiation',
    headline: {
      main: '1,50,000+ Students Mentored',
      highlight1: 'with Personal Mentoring',
      highlight2: '98% Success Rate',
    },
    subtext:
      'Small batch sizes (12-25 students) vs mass coaching (100+ students). AIIMS faculty. Personalized attention. Real results. Your medical college admission awaits.',
    primaryCTA: 'Book Free NEET Biology Demo',
    secondaryCTA: 'Call Now: +91 88264 44334',
    weight: 35, // Secondary variant with differentiation
  },
  {
    id: 'trust_focused',
    name: 'Trust & Credibility Focused',
    headline: {
      main: 'Premium NEET Biology Coaching',
      highlight1: 'Small Batches. Big Results.',
      highlight2: '98% Success Rate',
    },
    subtext:
      'AIIMS faculty teaching 12-25 students (not 100+). Proven track record: 1,50,000+ students mentored, 67+ AIIMS selections. Personal mentoring that actually works.',
    primaryCTA: 'Book Free NEET Biology Demo',
    secondaryCTA: 'Call Now: +91 88264 44334',
    weight: 25, // Trust-building variant
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
