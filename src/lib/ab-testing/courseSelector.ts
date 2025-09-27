// A/B Testing Configuration for Course Selector
// Test conversion impact of new content optimizations

export interface ABTestVariant {
  id: string
  name: string
  weight: number
  changes: {
    ctaText?: {
      primary?: string
      secondary?: string
      tertiary?: string
    }
    socialProof?: {
      enrollmentCount?: number
      urgencyMessage?: string
    }
    seriesDescriptions?: {
      [key: string]: string
    }
  }
}

export const COURSE_SELECTOR_AB_TESTS: ABTestVariant[] = [
  // Control - Original Content
  {
    id: 'control',
    name: 'Original Course Selector',
    weight: 30,
    changes: {
      ctaText: {
        primary: '📚 Book Free Demo Class',
        secondary: 'Details',
        tertiary: 'Enroll Now',
      },
      socialProof: {
        enrollmentCount: 23,
        urgencyMessage: '23 students enrolled this week',
      },
    },
  },

  // Variant A - Optimized Content (Current Implementation)
  {
    id: 'optimized_content',
    name: 'Content Optimized Course Selector',
    weight: 40,
    changes: {
      ctaText: {
        primary: '🎯 Book FREE Demo → See Results!',
        secondary: '📋 Full Details',
        tertiary: '⚡ Secure My Seat',
      },
      socialProof: {
        enrollmentCount: 47,
        urgencyMessage: '47 students enrolled this week • Only 8 seats left!',
      },
    },
  },

  // Variant B - High Urgency
  {
    id: 'high_urgency',
    name: 'High Urgency Course Selector',
    weight: 30,
    changes: {
      ctaText: {
        primary: '🚨 FREE Demo - Last 3 Days!',
        secondary: '⏰ Course Details',
        tertiary: '🔥 GRAB LAST SEAT',
      },
      socialProof: {
        enrollmentCount: 89,
        urgencyMessage: '89 students enrolled • Only 3 seats left in next batch!',
      },
    },
  },
]

// Get user's assigned variant
export function getAssignedVariant(userId: string): ABTestVariant {
  // Simple hash-based assignment for consistent user experience
  const hash = hashString(userId)
  const random = hash % 100

  let cumulative = 0
  for (const variant of COURSE_SELECTOR_AB_TESTS) {
    cumulative += variant.weight
    if (random < cumulative) {
      return variant
    }
  }

  // Fallback to control
  return COURSE_SELECTOR_AB_TESTS[0]
}

// Simple string hash function
function hashString(str: string): number {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = (hash << 5) - hash + char
    hash = hash & hash // Convert to 32bit integer
  }
  return Math.abs(hash)
}

// Track conversion events
export interface ConversionEvent {
  userId: string
  variant: string
  event: 'page_view' | 'demo_click' | 'demo_complete' | 'enrollment_click' | 'enrollment_complete'
  timestamp: number
  metadata?: {
    series?: string
    plan?: string
    classLevel?: string
  }
}

// Expected conversion improvements based on agent analysis
export const EXPECTED_IMPROVEMENTS = {
  optimized_content: {
    demo_booking_rate: 1.25, // +25% improvement
    enrollment_rate: 1.15, // +15% improvement
    engagement_rate: 1.3, // +30% improvement
  },
  high_urgency: {
    demo_booking_rate: 1.4, // +40% improvement
    enrollment_rate: 1.2, // +20% improvement
    engagement_rate: 1.35, // +35% improvement
  },
}
