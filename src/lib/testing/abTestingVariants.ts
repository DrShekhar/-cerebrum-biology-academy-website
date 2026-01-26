export interface ABTestVariant {
  id: string
  name: string
  description: string
  changes: VariantChange[]
  hypothesis: string
  expectedImpact: {
    metric: string
    direction: 'increase' | 'decrease'
    magnitude: 'small' | 'medium' | 'large'
    percentage?: number
  }
  targetAudience?: {
    segment: string
    percentage: number
    conditions: { [key: string]: any }
  }
}

export interface VariantChange {
  element: string
  type: 'content' | 'design' | 'behavior' | 'flow'
  description: string
  implementation: string
}

export interface ABTestDecisionPoint {
  id: string
  name: string
  location: string
  description: string
  importance: 'critical' | 'high' | 'medium' | 'low'
  currentMetrics: {
    conversionRate: number
    engagementRate: number
    dropOffRate: number
  }
  variants: ABTestVariant[]
  testConfiguration: {
    trafficSplit: number[]
    duration: number
    minimumSampleSize: number
    successMetrics: string[]
    guardRails: string[]
  }
}

// Critical decision points for A/B testing
export const AB_TEST_DECISION_POINTS: ABTestDecisionPoint[] = [
  {
    id: 'landing-page-hero',
    name: 'Landing Page Hero Section',
    location: 'Homepage hero section',
    description: 'First impression that determines user engagement and course selector entry',
    importance: 'critical',
    currentMetrics: {
      conversionRate: 12.5,
      engagementRate: 34.2,
      dropOffRate: 65.8,
    },
    variants: [
      {
        id: 'hero-control',
        name: 'Control - Current Hero',
        description: 'Current hero section with standard messaging',
        changes: [],
        hypothesis: 'Baseline performance measurement',
        expectedImpact: {
          metric: 'baseline',
          direction: 'increase',
          magnitude: 'small',
        },
      },
      {
        id: 'hero-results-focused',
        name: 'Results-Focused Hero',
        description: 'Emphasize 94.2% success rate and NEET ranks prominently',
        changes: [
          {
            element: 'Hero headline',
            type: 'content',
            description: 'Change from generic to results-focused messaging',
            implementation: '"94.2% Students Qualify NEET - Join 10,000+ Success Stories"',
          },
          {
            element: 'Hero visual',
            type: 'design',
            description: 'Add success statistics prominently',
            implementation: 'Large percentage display with animated counter',
          },
          {
            element: 'CTA button',
            type: 'content',
            description: 'Make CTA more specific',
            implementation: '"Find My Perfect Course" instead of "Get Started"',
          },
        ],
        hypothesis: 'Results-focused messaging will increase trust and course selector entry',
        expectedImpact: {
          metric: 'course_selector_entry',
          direction: 'increase',
          magnitude: 'medium',
          percentage: 15,
        },
      },
      {
        id: 'hero-urgency-based',
        name: 'Urgency-Based Hero',
        description: 'Create urgency with limited seats and batch timing',
        changes: [
          {
            element: 'Hero section',
            type: 'design',
            description: 'Add urgency banner at top',
            implementation: 'Red banner: "Only 47 seats left in this month\'s batch!"',
          },
          {
            element: 'CTA section',
            type: 'behavior',
            description: 'Add countdown timer',
            implementation: 'Timer showing time left for current batch enrollment',
          },
          {
            element: 'Hero copy',
            type: 'content',
            description: 'Add scarcity messaging',
            implementation: 'Include "Limited seats available" in subheading',
          },
        ],
        hypothesis: 'Urgency and scarcity will create immediate action',
        expectedImpact: {
          metric: 'immediate_engagement',
          direction: 'increase',
          magnitude: 'large',
          percentage: 25,
        },
      },
      {
        id: 'hero-personalized',
        name: 'Personalized Hero',
        description: 'Dynamic personalization based on location and device',
        changes: [
          {
            element: 'Hero messaging',
            type: 'content',
            description: 'Personalize based on detected location',
            implementation: '"Join 500+ students from [City] who qualified NEET"',
          },
          {
            element: 'Visual content',
            type: 'design',
            description: 'Show location-specific success stories',
            implementation: 'Local student success stories with photos',
          },
          {
            element: 'CTA personalization',
            type: 'behavior',
            description: 'Device-specific CTAs',
            implementation: 'Mobile: "Start on Phone", Desktop: "Begin Selection"',
          },
        ],
        hypothesis: 'Personalization will increase relevance and engagement',
        expectedImpact: {
          metric: 'engagement_depth',
          direction: 'increase',
          magnitude: 'medium',
          percentage: 18,
        },
      },
    ],
    testConfiguration: {
      trafficSplit: [25, 25, 25, 25],
      duration: 14,
      minimumSampleSize: 1000,
      successMetrics: ['course_selector_entry', 'time_on_page', 'scroll_depth'],
      guardRails: ['bounce_rate', 'page_load_time'],
    },
  },

  {
    id: 'course-selector-onboarding',
    name: 'Course Selector Onboarding',
    location: 'Course selector first step',
    description: 'Initial experience that determines completion vs abandonment',
    importance: 'critical',
    currentMetrics: {
      conversionRate: 68.3,
      engagementRate: 78.5,
      dropOffRate: 31.7,
    },
    variants: [
      {
        id: 'onboarding-control',
        name: 'Control - Direct Start',
        description: 'Current direct start approach',
        changes: [],
        hypothesis: 'Baseline measurement',
        expectedImpact: {
          metric: 'baseline',
          direction: 'increase',
          magnitude: 'small',
        },
      },
      {
        id: 'onboarding-explanation',
        name: 'Process Explanation',
        description: 'Explain the process before starting',
        changes: [
          {
            element: 'Onboarding overlay',
            type: 'flow',
            description: 'Add explanation overlay before first step',
            implementation: 'Modal explaining 8-step process with benefits',
          },
          {
            element: 'Progress indicator',
            type: 'design',
            description: 'Enhanced progress visualization',
            implementation: 'Detailed progress bar with step names and completion estimates',
          },
          {
            element: 'Benefit highlighting',
            type: 'content',
            description: 'Explain value at each step',
            implementation: 'Quick benefit explanations for each step',
          },
        ],
        hypothesis: 'Understanding the process will increase completion rates',
        expectedImpact: {
          metric: 'completion_rate',
          direction: 'increase',
          magnitude: 'medium',
          percentage: 12,
        },
      },
      {
        id: 'onboarding-gamified',
        name: 'Gamified Experience',
        description: 'Add gamification elements to increase engagement',
        changes: [
          {
            element: 'Progress tracking',
            type: 'design',
            description: 'Add gamification elements',
            implementation: 'Points, badges, and completion celebrations',
          },
          {
            element: 'Step completion',
            type: 'behavior',
            description: 'Celebratory animations',
            implementation: 'Confetti animation on step completion',
          },
          {
            element: 'Motivation messaging',
            type: 'content',
            description: 'Encouraging messages',
            implementation: '"Great job! You\'re 25% closer to your perfect course"',
          },
        ],
        hypothesis: 'Gamification will make the process more engaging and fun',
        expectedImpact: {
          metric: 'user_engagement',
          direction: 'increase',
          magnitude: 'large',
          percentage: 20,
        },
      },
      {
        id: 'onboarding-social-proof',
        name: 'Social Proof Heavy',
        description: 'Emphasize social proof throughout onboarding',
        changes: [
          {
            element: 'Onboarding content',
            type: 'content',
            description: 'Add social proof at each step',
            implementation: '"12,847 students have completed this step"',
          },
          {
            element: 'Live activity feed',
            type: 'behavior',
            description: 'Show real-time completions',
            implementation: 'Live ticker of students completing steps',
          },
          {
            element: 'Success stories',
            type: 'content',
            description: 'Relevant success stories at key points',
            implementation: 'Quick success story popup at decision points',
          },
        ],
        hypothesis: 'Social proof will reduce anxiety and increase completion',
        expectedImpact: {
          metric: 'completion_confidence',
          direction: 'increase',
          magnitude: 'medium',
          percentage: 15,
        },
      },
    ],
    testConfiguration: {
      trafficSplit: [25, 25, 25, 25],
      duration: 21,
      minimumSampleSize: 2000,
      successMetrics: ['step_completion_rate', 'overall_completion_rate', 'time_per_step'],
      guardRails: ['abandonment_rate', 'user_frustration_indicators'],
    },
  },

  {
    id: 'pricing-display-strategy',
    name: 'Pricing Display Strategy',
    location: 'Course recommendations and pricing pages',
    description: 'How pricing is presented affects purchase decisions',
    importance: 'critical',
    currentMetrics: {
      conversionRate: 23.8,
      engagementRate: 56.7,
      dropOffRate: 76.2,
    },
    variants: [
      {
        id: 'pricing-control',
        name: 'Control - Standard Pricing',
        description: 'Current pricing display format',
        changes: [],
        hypothesis: 'Baseline pricing performance',
        expectedImpact: {
          metric: 'baseline',
          direction: 'increase',
          magnitude: 'small',
        },
      },
      {
        id: 'pricing-value-focused',
        name: 'Value-Focused Pricing',
        description: 'Emphasize value and ROI over price',
        changes: [
          {
            element: 'Price presentation',
            type: 'design',
            description: 'Lead with value proposition',
            implementation: 'Show "₹125/day for NEET success" before total price',
          },
          {
            element: 'Comparison framework',
            type: 'content',
            description: 'Compare to alternatives',
            implementation: 'Compare to private tuition, other coaching costs',
          },
          {
            element: 'ROI calculator',
            type: 'behavior',
            description: 'Interactive ROI calculator',
            implementation: 'Tool showing cost per point improvement',
          },
        ],
        hypothesis: 'Value-focused presentation will reduce price sensitivity',
        expectedImpact: {
          metric: 'price_acceptance',
          direction: 'increase',
          magnitude: 'large',
          percentage: 30,
        },
      },
      {
        id: 'pricing-anchoring',
        name: 'Price Anchoring Strategy',
        description: 'Use high anchor prices to make actual prices seem reasonable',
        changes: [
          {
            element: 'Price structure',
            type: 'design',
            description: 'Show higher-tier options first',
            implementation: 'Display premium options prominently before standard',
          },
          {
            element: 'Discount presentation',
            type: 'content',
            description: 'Emphasize savings from higher reference point',
            implementation: '"Save ₹25,000 from individual tutoring costs"',
          },
          {
            element: 'Package comparison',
            type: 'behavior',
            description: 'Make mid-tier option most attractive',
            implementation: 'Design bias toward middle pricing option',
          },
        ],
        hypothesis: 'Price anchoring will make standard options more attractive',
        expectedImpact: {
          metric: 'average_order_value',
          direction: 'increase',
          magnitude: 'medium',
          percentage: 18,
        },
      },
      {
        id: 'pricing-payment-focus',
        name: 'Payment Flexibility Focus',
        description: 'Emphasize payment options over total price',
        changes: [
          {
            element: 'Primary price display',
            type: 'content',
            description: 'Show monthly EMI as primary price',
            implementation: '"Starting at ₹6,250/month" instead of total price',
          },
          {
            element: 'Payment options',
            type: 'design',
            description: 'Prominent payment flexibility section',
            implementation: 'Multiple EMI options, scholarship info prominently',
          },
          {
            element: 'Affordability messaging',
            type: 'content',
            description: 'Focus on accessibility',
            implementation: '"Quality NEET coaching for less than ₹200/day"',
          },
        ],
        hypothesis: 'Payment flexibility will reduce financial barriers',
        expectedImpact: {
          metric: 'payment_plan_adoption',
          direction: 'increase',
          magnitude: 'large',
          percentage: 35,
        },
      },
    ],
    testConfiguration: {
      trafficSplit: [25, 25, 25, 25],
      duration: 28,
      minimumSampleSize: 1500,
      successMetrics: ['conversion_rate', 'payment_plan_selection', 'average_order_value'],
      guardRails: ['cart_abandonment_rate', 'refund_requests'],
    },
  },

  {
    id: 'consultation-booking-flow',
    name: 'Consultation Booking Flow',
    location: 'Consultation booking and WhatsApp integration',
    description: 'How users book consultations affects lead quality and conversion',
    importance: 'high',
    currentMetrics: {
      conversionRate: 31.2,
      engagementRate: 67.8,
      dropOffRate: 68.8,
    },
    variants: [
      {
        id: 'consultation-control',
        name: 'Control - Current Flow',
        description: 'Current consultation booking process',
        changes: [],
        hypothesis: 'Baseline consultation booking performance',
        expectedImpact: {
          metric: 'baseline',
          direction: 'increase',
          magnitude: 'small',
        },
      },
      {
        id: 'consultation-simplified',
        name: 'Simplified One-Click',
        description: 'Minimize friction with one-click booking',
        changes: [
          {
            element: 'Booking form',
            type: 'flow',
            description: 'Reduce form fields to essential only',
            implementation: 'Name, phone, preferred time only',
          },
          {
            element: 'WhatsApp integration',
            type: 'behavior',
            description: 'Direct WhatsApp booking option',
            implementation: 'One-click WhatsApp with pre-filled message',
          },
          {
            element: 'Calendar selection',
            type: 'design',
            description: 'Visual calendar picker',
            implementation: 'Simple calendar grid with available slots',
          },
        ],
        hypothesis: 'Reduced friction will increase booking completion',
        expectedImpact: {
          metric: 'booking_completion',
          direction: 'increase',
          magnitude: 'large',
          percentage: 40,
        },
      },
      {
        id: 'consultation-value-emphasis',
        name: 'Value Emphasis',
        description: 'Emphasize consultation value and expertise',
        changes: [
          {
            element: 'Value proposition',
            type: 'content',
            description: 'Emphasize consultation value',
            implementation: '"₹2000 value consultation - FREE for limited time"',
          },
          {
            element: 'Expert profiles',
            type: 'design',
            description: 'Prominent counselor credentials',
            implementation: 'Photos, qualifications, success rates of counselors',
          },
          {
            element: 'Outcome preview',
            type: 'content',
            description: 'What users will get from consultation',
            implementation: 'Clear list of consultation outcomes and benefits',
          },
        ],
        hypothesis: 'Higher perceived value will increase booking willingness',
        expectedImpact: {
          metric: 'consultation_perceived_value',
          direction: 'increase',
          magnitude: 'medium',
          percentage: 22,
        },
      },
      {
        id: 'consultation-urgency',
        name: 'Urgency and Scarcity',
        description: 'Create urgency for immediate booking',
        changes: [
          {
            element: 'Availability display',
            type: 'behavior',
            description: 'Show limited slot availability',
            implementation: 'Real-time slot counter: "Only 3 slots left today"',
          },
          {
            element: 'Booking deadline',
            type: 'content',
            description: 'Time-limited booking opportunity',
            implementation: 'Timer: "Book within 15 minutes for today\'s consultation"',
          },
          {
            element: 'Social proof',
            type: 'design',
            description: 'Show recent booking activity',
            implementation: '"Arjun from Mumbai booked consultation 5 minutes ago"',
          },
        ],
        hypothesis: 'Urgency will create immediate action and reduce procrastination',
        expectedImpact: {
          metric: 'immediate_booking_rate',
          direction: 'increase',
          magnitude: 'large',
          percentage: 35,
        },
      },
    ],
    testConfiguration: {
      trafficSplit: [25, 25, 25, 25],
      duration: 14,
      minimumSampleSize: 800,
      successMetrics: [
        'booking_completion_rate',
        'consultation_show_up_rate',
        'consultation_to_enrollment',
      ],
      guardRails: ['booking_quality_score', 'no_show_rate'],
    },
  },

  {
    id: 'mobile-navigation-optimization',
    name: 'Mobile Navigation Optimization',
    location: 'Mobile navigation and menu structure',
    description: 'Mobile navigation affects user flow and task completion',
    importance: 'high',
    currentMetrics: {
      conversionRate: 18.4,
      engagementRate: 42.3,
      dropOffRate: 81.6,
    },
    variants: [
      {
        id: 'mobile-nav-control',
        name: 'Control - Standard Mobile Nav',
        description: 'Current mobile navigation structure',
        changes: [],
        hypothesis: 'Baseline mobile navigation performance',
        expectedImpact: {
          metric: 'baseline',
          direction: 'increase',
          magnitude: 'small',
        },
      },
      {
        id: 'mobile-nav-sticky-cta',
        name: 'Sticky CTA Navigation',
        description: 'Always-visible primary action button',
        changes: [
          {
            element: 'Navigation bar',
            type: 'design',
            description: 'Add sticky CTA button',
            implementation: 'Fixed bottom bar with "Find My Course" button',
          },
          {
            element: 'CTA positioning',
            type: 'behavior',
            description: 'Context-aware CTA changes',
            implementation: 'CTA text changes based on page context',
          },
          {
            element: 'Visual hierarchy',
            type: 'design',
            description: 'Make CTA most prominent element',
            implementation: 'Bright color, larger size, clear visibility',
          },
        ],
        hypothesis: 'Always-visible CTA will increase course selector entry',
        expectedImpact: {
          metric: 'mobile_conversion_rate',
          direction: 'increase',
          magnitude: 'large',
          percentage: 28,
        },
      },
      {
        id: 'mobile-nav-gesture-friendly',
        name: 'Gesture-Friendly Navigation',
        description: 'Optimize for thumb navigation and gestures',
        changes: [
          {
            element: 'Button placement',
            type: 'design',
            description: 'Thumb-friendly button positioning',
            implementation: 'Important buttons in thumb reach zone',
          },
          {
            element: 'Swipe navigation',
            type: 'behavior',
            description: 'Add swipe gestures for course selector',
            implementation: 'Swipe left/right to navigate between steps',
          },
          {
            element: 'Touch targets',
            type: 'design',
            description: 'Larger touch targets',
            implementation: 'Minimum 44px touch targets, adequate spacing',
          },
        ],
        hypothesis: 'Better mobile UX will reduce frustration and increase completion',
        expectedImpact: {
          metric: 'mobile_task_completion',
          direction: 'increase',
          magnitude: 'medium',
          percentage: 20,
        },
      },
      {
        id: 'mobile-nav-progressive',
        name: 'Progressive Disclosure',
        description: 'Show information progressively to reduce cognitive load',
        changes: [
          {
            element: 'Information architecture',
            type: 'flow',
            description: 'Progressive information disclosure',
            implementation: 'Show only essential info initially, expand on demand',
          },
          {
            element: 'Menu structure',
            type: 'design',
            description: 'Simplified menu with categorization',
            implementation: 'Grouped menu items with clear categories',
          },
          {
            element: 'Content prioritization',
            type: 'content',
            description: 'Mobile-first content prioritization',
            implementation: 'Most important content first, secondary in accordions',
          },
        ],
        hypothesis: 'Progressive disclosure will reduce cognitive load and improve focus',
        expectedImpact: {
          metric: 'mobile_engagement_depth',
          direction: 'increase',
          magnitude: 'medium',
          percentage: 16,
        },
      },
    ],
    testConfiguration: {
      trafficSplit: [25, 25, 25, 25],
      duration: 21,
      minimumSampleSize: 2500,
      successMetrics: ['mobile_conversion_rate', 'task_completion_rate', 'user_satisfaction'],
      guardRails: ['mobile_bounce_rate', 'navigation_confusion_indicators'],
    },
  },

  {
    id: 'social-proof-presentation',
    name: 'Social Proof Presentation',
    location: 'Social proof elements throughout the site',
    description: 'How social proof is presented affects trust and conversion',
    importance: 'medium',
    currentMetrics: {
      conversionRate: 19.7,
      engagementRate: 51.2,
      dropOffRate: 80.3,
    },
    variants: [
      {
        id: 'social-proof-control',
        name: 'Control - Current Social Proof',
        description: 'Current social proof implementation',
        changes: [],
        hypothesis: 'Baseline social proof performance',
        expectedImpact: {
          metric: 'baseline',
          direction: 'increase',
          magnitude: 'small',
        },
      },
      {
        id: 'social-proof-specific',
        name: 'Specific and Detailed',
        description: 'Highly specific social proof with verifiable details',
        changes: [
          {
            element: 'Success stories',
            type: 'content',
            description: 'Detailed, specific success stories',
            implementation: 'Full names, photos, specific NEET ranks, college names',
          },
          {
            element: 'Statistics presentation',
            type: 'design',
            description: 'Detailed statistics with context',
            implementation: '"94.2% qualification rate (2,847 out of 3,020 students in 2023)"',
          },
          {
            element: 'Verification badges',
            type: 'behavior',
            description: 'Verification and authenticity indicators',
            implementation: 'Verified badges, LinkedIn links, video testimonials',
          },
        ],
        hypothesis: 'Specific, detailed social proof will increase credibility and trust',
        expectedImpact: {
          metric: 'trust_score',
          direction: 'increase',
          magnitude: 'large',
          percentage: 32,
        },
      },
      {
        id: 'social-proof-live',
        name: 'Live Social Proof',
        description: 'Real-time social proof notifications',
        changes: [
          {
            element: 'Live notifications',
            type: 'behavior',
            description: 'Real-time enrollment and activity notifications',
            implementation: 'Live ticker: "Priya from Mumbai just enrolled - 2 minutes ago"',
          },
          {
            element: 'Current activity',
            type: 'content',
            description: 'Show current user activity',
            implementation: '"17 students currently taking course selector"',
          },
          {
            element: 'Recent achievements',
            type: 'design',
            description: 'Recently posted achievements and results',
            implementation: 'Feed of recent NEET results and college admissions',
          },
        ],
        hypothesis: 'Live social proof will create FOMO and urgency',
        expectedImpact: {
          metric: 'immediate_engagement',
          direction: 'increase',
          magnitude: 'medium',
          percentage: 24,
        },
      },
      {
        id: 'social-proof-peer-focused',
        name: 'Peer-Focused Social Proof',
        description: 'Social proof from similar backgrounds and situations',
        changes: [
          {
            element: 'Testimonial matching',
            type: 'behavior',
            description: 'Show testimonials from similar backgrounds',
            implementation: 'Match testimonials based on location, budget, goals',
          },
          {
            element: 'Peer statistics',
            type: 'content',
            description: 'Statistics about similar students',
            implementation: '"Students from your city improved by average 127 points"',
          },
          {
            element: 'Relatable stories',
            type: 'design',
            description: 'Emphasize similarity in success stories',
            implementation: 'Highlight similar backgrounds, challenges, achievements',
          },
        ],
        hypothesis: 'Peer-relevant social proof will increase personal relevance and motivation',
        expectedImpact: {
          metric: 'personal_relevance_score',
          direction: 'increase',
          magnitude: 'large',
          percentage: 28,
        },
      },
    ],
    testConfiguration: {
      trafficSplit: [25, 25, 25, 25],
      duration: 21,
      minimumSampleSize: 1200,
      successMetrics: ['trust_indicators', 'social_proof_engagement', 'conversion_lift'],
      guardRails: ['authenticity_perception', 'skepticism_indicators'],
    },
  },
]

// A/B test management utilities
export class ABTestManager {
  private activeTests: Map<string, ABTestDecisionPoint> = new Map()
  private testResults: Map<string, TestResults> = new Map()

  constructor() {
    // Initialize with predefined decision points
    AB_TEST_DECISION_POINTS.forEach((point) => {
      this.activeTests.set(point.id, point)
    })
  }

  // Get test configuration for a specific decision point
  getTestConfig(decisionPointId: string): ABTestDecisionPoint | null {
    return this.activeTests.get(decisionPointId) || null
  }

  // Record test result
  recordTestResult(testId: string, variantId: string, metric: string, value: number): void {
    const key = `${testId}_${variantId}`

    if (!this.testResults.has(key)) {
      this.testResults.set(key, {
        testId,
        variantId,
        metrics: new Map(),
        sampleSize: 0,
        conversionEvents: 0,
        startDate: new Date(),
      })
    }

    const result = this.testResults.get(key)!
    result.metrics.set(metric, (result.metrics.get(metric) || 0) + value)
    result.sampleSize++

    if (metric === 'conversion') {
      result.conversionEvents++
    }
  }

  // Calculate test significance
  calculateSignificance(
    testId: string,
    controlVariantId: string,
    testVariantId: string
  ): TestSignificance {
    const controlKey = `${testId}_${controlVariantId}`
    const testKey = `${testId}_${testVariantId}`

    const controlResults = this.testResults.get(controlKey)
    const testResults = this.testResults.get(testKey)

    if (!controlResults || !testResults) {
      return {
        isSignificant: false,
        confidenceLevel: 0,
        pValue: 1,
        effect: 0,
        recommendation: 'insufficient_data',
      }
    }

    // Simplified significance calculation (in production, use proper statistical tests)
    const controlConversion = controlResults.conversionEvents / controlResults.sampleSize
    const testConversion = testResults.conversionEvents / testResults.sampleSize

    const effect = ((testConversion - controlConversion) / controlConversion) * 100
    const combinedSampleSize = controlResults.sampleSize + testResults.sampleSize

    // Mock statistical significance (replace with proper statistical test)
    const isSignificant = combinedSampleSize > 1000 && Math.abs(effect) > 5
    const confidenceLevel = isSignificant ? 95 : Math.min(90, (combinedSampleSize / 1000) * 95)
    const pValue = isSignificant ? 0.03 : 0.15

    let recommendation: TestSignificance['recommendation'] = 'continue_test'
    if (isSignificant) {
      recommendation = effect > 0 ? 'implement_variant' : 'keep_control'
    } else if (combinedSampleSize > 10000) {
      recommendation = 'no_significant_difference'
    }

    return {
      isSignificant,
      confidenceLevel,
      pValue,
      effect,
      recommendation,
    }
  }

  // Generate test report
  generateTestReport(testId: string): TestReport {
    const testConfig = this.getTestConfig(testId)
    if (!testConfig) {
      throw new Error(`Test ${testId} not found`)
    }

    const variantResults = testConfig.variants.map((variant) => {
      const key = `${testId}_${variant.id}`
      const results = this.testResults.get(key)

      return {
        variantId: variant.id,
        variantName: variant.name,
        sampleSize: results?.sampleSize || 0,
        conversionRate: results ? (results.conversionEvents / results.sampleSize) * 100 : 0,
        metrics: results?.metrics || new Map(),
      }
    })

    const controlVariant = testConfig.variants.find((v) => v.id.includes('control'))?.id
    const significanceResults = testConfig.variants
      .filter((v) => v.id !== controlVariant)
      .map((variant) => ({
        variantId: variant.id,
        significance: controlVariant
          ? this.calculateSignificance(testId, controlVariant, variant.id)
          : null,
      }))

    return {
      testId,
      testName: testConfig.name,
      status: this.getTestStatus(testId),
      startDate: new Date(), // Mock start date
      duration: testConfig.testConfiguration.duration,
      variantResults,
      significanceResults,
      recommendations: this.generateRecommendations(testId, significanceResults),
    }
  }

  private getTestStatus(testId: string): 'planning' | 'running' | 'completed' | 'paused' {
    // Mock implementation
    return 'running'
  }

  private generateRecommendations(testId: string, significanceResults: any[]): string[] {
    const recommendations: string[] = []

    significanceResults.forEach((result) => {
      if (result.significance?.isSignificant) {
        if (result.significance.effect > 0) {
          recommendations.push(
            `Implement variant ${result.variantId} - shows ${result.significance.effect.toFixed(1)}% improvement`
          )
        } else {
          recommendations.push(
            `Keep control - variant ${result.variantId} shows ${Math.abs(result.significance.effect).toFixed(1)}% decrease`
          )
        }
      } else {
        recommendations.push(
          `Continue testing variant ${result.variantId} - need more data for significance`
        )
      }
    })

    return recommendations
  }
}

// Supporting interfaces
interface TestResults {
  testId: string
  variantId: string
  metrics: Map<string, number>
  sampleSize: number
  conversionEvents: number
  startDate: Date
}

interface TestSignificance {
  isSignificant: boolean
  confidenceLevel: number
  pValue: number
  effect: number
  recommendation:
    | 'implement_variant'
    | 'keep_control'
    | 'continue_test'
    | 'no_significant_difference'
    | 'insufficient_data'
}

interface TestReport {
  testId: string
  testName: string
  status: 'planning' | 'running' | 'completed' | 'paused'
  startDate: Date
  duration: number
  variantResults: Array<{
    variantId: string
    variantName: string
    sampleSize: number
    conversionRate: number
    metrics: Map<string, number>
  }>
  significanceResults: Array<{
    variantId: string
    significance: TestSignificance | null
  }>
  recommendations: string[]
}

// Test planning utilities
export function generateTestPlan(decisionPoints: ABTestDecisionPoint[]): string {
  const plan = {
    summary: {
      totalTests: decisionPoints.length,
      criticalTests: decisionPoints.filter((p) => p.importance === 'critical').length,
      estimatedDuration: Math.max(...decisionPoints.map((p) => p.testConfiguration.duration)),
      requiredSampleSize: decisionPoints.reduce(
        (sum, p) => sum + p.testConfiguration.minimumSampleSize,
        0
      ),
    },
    timeline: decisionPoints.map((point) => ({
      testName: point.name,
      importance: point.importance,
      duration: point.testConfiguration.duration,
      sampleSize: point.testConfiguration.minimumSampleSize,
      successMetrics: point.testConfiguration.successMetrics,
    })),
    recommendations: [
      'Start with critical decision points first',
      'Run high-traffic tests in parallel to reduce overall timeline',
      'Ensure adequate sample sizes for statistical significance',
      'Monitor guard rail metrics to prevent negative impacts',
    ],
  }

  return JSON.stringify(plan, null, 2)
}
