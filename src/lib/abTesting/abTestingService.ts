'use client'

export interface ABTestVariant {
  id: string
  name: string
  weight: number // 0-100 percentage
  config: Record<string, any>
  isControl: boolean
}

export interface ABTest {
  id: string
  name: string
  description: string
  status: 'draft' | 'running' | 'paused' | 'completed'
  startDate: string
  endDate?: string
  targetMetric: string
  variants: ABTestVariant[]
  trafficSplit: number // 0-100 percentage of users to include
  targetAudience?: {
    countries?: string[]
    devices?: ('desktop' | 'mobile' | 'tablet')[]
    newUsers?: boolean
    returningUsers?: boolean
  }
}

export interface ABTestAssignment {
  userId: string
  testId: string
  variantId: string
  timestamp: string
  metadata?: Record<string, any>
}

export interface ABTestEvent {
  userId: string
  testId: string
  variantId: string
  eventType: 'view' | 'click' | 'conversion' | 'signup' | 'payment'
  eventValue?: number
  metadata?: Record<string, any>
  timestamp: string
}

export interface ABTestResults {
  testId: string
  variants: {
    [variantId: string]: {
      name: string
      visitors: number
      conversions: number
      conversionRate: number
      confidence: number
      isWinner?: boolean
      liftOverControl?: number
    }
  }
  statisticalSignificance: number
  recommendedAction: 'continue' | 'stop_winner' | 'stop_inconclusive'
  durationDays: number
}

class ABTestingService {
  private static readonly STORAGE_KEY = 'cerebrum_ab_tests'
  private static readonly ASSIGNMENT_KEY = 'cerebrum_ab_assignments'
  private static readonly EVENTS_KEY = 'cerebrum_ab_events'
  private static readonly USER_ID_KEY = 'cerebrum_user_id'

  // Predefined A/B tests for the platform
  static readonly TESTS: Record<string, ABTest> = {
    hero_section: {
      id: 'hero_section',
      name: 'Hero Section Optimization',
      description: 'Test different hero section variants to improve enrollment conversion',
      status: 'running',
      startDate: '2024-12-17',
      targetMetric: 'demo_booking',
      trafficSplit: 100,
      variants: [
        {
          id: 'control',
          name: 'Original Hero',
          weight: 50,
          isControl: true,
          config: {
            headline: "Master NEET Biology with India's Top Faculty",
            subtext: 'Join 10,000+ students who achieved 330+ in Biology',
            ctaText: 'Book Free Demo Class',
            ctaColor: 'bg-gradient-to-r from-yellow-400 to-yellow-600',
          },
        },
        {
          id: 'urgency_variant',
          name: 'Urgency-Focused Hero',
          weight: 50,
          isControl: false,
          config: {
            headline: 'Last 7 Days: NEET 2026 Biology Crash Course',
            subtext: 'Limited Seats: 98% Success Rate - Join Before Enrollment Closes',
            ctaText: 'Secure Your Seat Now',
            ctaColor: 'bg-gradient-to-r from-red-500 to-red-700 animate-pulse',
          },
        },
      ],
    },
    pricing_strategy: {
      id: 'pricing_strategy',
      name: 'Pricing Page Strategy',
      description: 'Test pricing presentation and discount strategies',
      status: 'running',
      startDate: '2024-12-17',
      targetMetric: 'enrollment',
      trafficSplit: 100,
      variants: [
        {
          id: 'control',
          name: 'Standard Pricing',
          weight: 33,
          isControl: true,
          config: {
            showOriginalPrice: true,
            discountPercentage: 20,
            urgencyTimer: false,
            guaranteeBadge: false,
          },
        },
        {
          id: 'high_discount',
          name: 'High Discount',
          weight: 33,
          isControl: false,
          config: {
            showOriginalPrice: true,
            discountPercentage: 40,
            urgencyTimer: true,
            guaranteeBadge: false,
          },
        },
        {
          id: 'guarantee_focus',
          name: 'Guarantee Focused',
          weight: 34,
          isControl: false,
          config: {
            showOriginalPrice: true,
            discountPercentage: 20,
            urgencyTimer: false,
            guaranteeBadge: true,
            guaranteeText: '100% Money Back if you score <300 in Biology',
          },
        },
      ],
    },
    cta_buttons: {
      id: 'cta_buttons',
      name: 'CTA Button Optimization',
      description: 'Test different CTA button styles and copy across the platform',
      status: 'running',
      startDate: '2024-12-17',
      targetMetric: 'click_through',
      trafficSplit: 100,
      variants: [
        {
          id: 'control',
          name: 'Standard CTA',
          weight: 25,
          isControl: true,
          config: {
            primaryText: 'Book Free Demo',
            secondaryText: 'Start Learning',
            style: 'bg-yellow-500 hover:bg-yellow-600',
            size: 'md',
            addIcon: false,
          },
        },
        {
          id: 'action_oriented',
          name: 'Action-Oriented',
          weight: 25,
          isControl: false,
          config: {
            primaryText: 'Get Started Now',
            secondaryText: 'Join the Course',
            style: 'bg-green-600 hover:bg-green-600',
            size: 'lg',
            addIcon: true,
          },
        },
        {
          id: 'benefit_focused',
          name: 'Benefit-Focused',
          weight: 25,
          isControl: false,
          config: {
            primaryText: 'Score 330+ in Biology',
            secondaryText: 'Achieve Your Dream',
            style: 'bg-blue-500 hover:bg-blue-600',
            size: 'md',
            addIcon: false,
          },
        },
        {
          id: 'social_proof',
          name: 'Social Proof',
          weight: 25,
          isControl: false,
          config: {
            primaryText: 'Join 10,000+ Toppers',
            secondaryText: 'Be the Next Success',
            style: 'bg-purple-500 hover:bg-purple-600',
            size: 'md',
            addIcon: true,
          },
        },
      ],
    },
  }

  static getUserId(): string {
    if (typeof window === 'undefined') return 'server_user'

    let userId = localStorage.getItem(this.USER_ID_KEY)
    if (!userId) {
      userId = 'user_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now()
      localStorage.setItem(this.USER_ID_KEY, userId)
    }
    return userId
  }

  static getTestAssignment(testId: string): ABTestAssignment | null {
    if (typeof window === 'undefined') return null

    const assignments = this.getStoredAssignments()
    return assignments.find((a) => a.testId === testId && a.userId === this.getUserId()) || null
  }

  static assignUserToTest(testId: string): ABTestAssignment | null {
    if (typeof window === 'undefined') return null

    const test = this.TESTS[testId]
    if (!test || test.status !== 'running') return null

    // Check if user already assigned
    const existing = this.getTestAssignment(testId)
    if (existing) return existing

    const userId = this.getUserId()

    // Check if user should be included based on traffic split
    if (Math.random() * 100 > test.trafficSplit) return null

    // Check target audience criteria
    if (test.targetAudience && !this.matchesTargetAudience(test.targetAudience)) {
      return null
    }

    // Assign to variant based on weights
    const variant = this.selectVariant(test.variants)
    if (!variant) return null

    const assignment: ABTestAssignment = {
      userId,
      testId,
      variantId: variant.id,
      timestamp: new Date().toISOString(),
      metadata: {
        userAgent: navigator.userAgent,
        referrer: document.referrer,
        url: window.location.href,
      },
    }

    // Store assignment
    this.storeAssignment(assignment)

    // Track assignment event
    this.trackEvent({
      userId,
      testId,
      variantId: variant.id,
      eventType: 'view',
      timestamp: new Date().toISOString(),
    })

    return assignment
  }

  static getVariantConfig(testId: string): Record<string, any> | null {
    const assignment = this.getTestAssignment(testId)
    if (!assignment) return null

    const test = this.TESTS[testId]
    const variant = test?.variants.find((v) => v.id === assignment.variantId)

    return variant?.config || null
  }

  static trackEvent(event: ABTestEvent): void {
    if (typeof window === 'undefined') return

    const events = this.getStoredEvents()
    events.push(event)

    // Keep only last 1000 events to prevent storage overflow
    if (events.length > 1000) {
      events.splice(0, events.length - 1000)
    }

    localStorage.setItem(this.EVENTS_KEY, JSON.stringify(events))

    // Also send to analytics API if available
    this.sendEventToAPI(event).catch(console.error)
  }

  static trackConversion(
    testId: string,
    eventType: 'signup' | 'payment' | 'demo_booking' = 'signup',
    value?: number
  ): void {
    const assignment = this.getTestAssignment(testId)
    if (!assignment) return

    this.trackEvent({
      userId: assignment.userId,
      testId,
      variantId: assignment.variantId,
      eventType: 'conversion',
      eventValue: value,
      timestamp: new Date().toISOString(),
      metadata: { conversionType: eventType },
    })
  }

  static getTestResults(testId: string): ABTestResults | null {
    const test = this.TESTS[testId]
    if (!test) return null

    const events = this.getStoredEvents().filter((e) => e.testId === testId)
    const assignments = this.getStoredAssignments().filter((a) => a.testId === testId)

    const results: ABTestResults = {
      testId,
      variants: {},
      statisticalSignificance: 0,
      recommendedAction: 'continue',
      durationDays: this.calculateDurationDays(test.startDate),
    }

    // Calculate metrics for each variant
    test.variants.forEach((variant) => {
      const variantAssignments = assignments.filter((a) => a.variantId === variant.id)
      const variantConversions = events.filter(
        (e) => e.variantId === variant.id && e.eventType === 'conversion'
      )

      const visitors = variantAssignments.length
      const conversions = variantConversions.length
      const conversionRate = visitors > 0 ? (conversions / visitors) * 100 : 0

      results.variants[variant.id] = {
        name: variant.name,
        visitors,
        conversions,
        conversionRate,
        confidence: this.calculateConfidence(visitors, conversions),
        isWinner: false,
        liftOverControl: 0,
      }
    })

    // Calculate statistical significance and winner
    const controlVariant = test.variants.find((v) => v.isControl)
    if (controlVariant && results.variants[controlVariant.id]) {
      const controlRate = results.variants[controlVariant.id].conversionRate

      Object.keys(results.variants).forEach((variantId) => {
        if (variantId !== controlVariant.id) {
          const variantRate = results.variants[variantId].conversionRate
          results.variants[variantId].liftOverControl =
            controlRate > 0 ? ((variantRate - controlRate) / controlRate) * 100 : 0
        }
      })

      // Determine winner and statistical significance
      results.statisticalSignificance = this.calculateStatisticalSignificance(results.variants)

      if (results.statisticalSignificance > 95) {
        const winnerVariantId = this.findWinnerVariant(results.variants)
        if (winnerVariantId) {
          results.variants[winnerVariantId].isWinner = true
          results.recommendedAction = 'stop_winner'
        }
      } else if (results.durationDays > 30) {
        results.recommendedAction = 'stop_inconclusive'
      }
    }

    return results
  }

  private static selectVariant(variants: ABTestVariant[]): ABTestVariant | null {
    const random = Math.random() * 100
    let cumulative = 0

    for (const variant of variants) {
      cumulative += variant.weight
      if (random <= cumulative) {
        return variant
      }
    }

    return variants[0] // Fallback
  }

  private static matchesTargetAudience(audience: NonNullable<ABTest['targetAudience']>): boolean {
    if (typeof window === 'undefined') return true

    // Check device type
    if (audience.devices) {
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
      const isTablet = /iPad/i.test(navigator.userAgent)
      const isDesktop = !isMobile && !isTablet

      const deviceType = isTablet ? 'tablet' : isMobile ? 'mobile' : 'desktop'
      if (!audience.devices.includes(deviceType)) return false
    }

    // Additional audience checks can be added here
    // (e.g., geographic location, user type, etc.)

    return true
  }

  private static getStoredAssignments(): ABTestAssignment[] {
    if (typeof window === 'undefined') return []

    try {
      const stored = localStorage.getItem(this.ASSIGNMENT_KEY)
      return stored ? JSON.parse(stored) : []
    } catch {
      return []
    }
  }

  private static storeAssignment(assignment: ABTestAssignment): void {
    if (typeof window === 'undefined') return

    const assignments = this.getStoredAssignments()
    assignments.push(assignment)
    localStorage.setItem(this.ASSIGNMENT_KEY, JSON.stringify(assignments))
  }

  private static getStoredEvents(): ABTestEvent[] {
    if (typeof window === 'undefined') return []

    try {
      const stored = localStorage.getItem(this.EVENTS_KEY)
      return stored ? JSON.parse(stored) : []
    } catch {
      return []
    }
  }

  private static async sendEventToAPI(event: ABTestEvent): Promise<void> {
    try {
      await fetch('/api/analytics/ab-test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(event),
      })
    } catch (error) {
      console.error('Failed to send A/B test event to API:', error)
    }
  }

  private static calculateDurationDays(startDate: string): number {
    const start = new Date(startDate)
    const now = new Date()
    return Math.floor((now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))
  }

  private static calculateConfidence(visitors: number, conversions: number): number {
    if (visitors < 30) return 0 // Not enough data

    const rate = conversions / visitors
    const standardError = Math.sqrt((rate * (1 - rate)) / visitors)
    const zScore = Math.abs(rate - 0.5) / standardError

    // Convert z-score to confidence percentage (simplified)
    return Math.min(99, Math.max(0, (zScore / 3) * 100))
  }

  private static calculateStatisticalSignificance(variants: Record<string, any>): number {
    const variantIds = Object.keys(variants)
    if (variantIds.length < 2) return 0

    // Simplified statistical significance calculation
    // In production, use proper statistical methods (Chi-square, T-test, etc.)
    const maxConfidence = Math.max(...variantIds.map((id) => variants[id].confidence))
    return maxConfidence
  }

  private static findWinnerVariant(variants: Record<string, any>): string | null {
    let maxRate = 0
    let winnerId = null

    Object.keys(variants).forEach((variantId) => {
      if (variants[variantId].conversionRate > maxRate) {
        maxRate = variants[variantId].conversionRate
        winnerId = variantId
      }
    })

    return winnerId
  }

  // Utility methods for React components
  static useABTest(testId: string): { variant: string | null; config: Record<string, any> | null } {
    if (typeof window === 'undefined') {
      return { variant: null, config: null }
    }

    const assignment = this.assignUserToTest(testId)
    const config = this.getVariantConfig(testId)

    return {
      variant: assignment?.variantId || null,
      config,
    }
  }

  static getAllActiveTests(): ABTest[] {
    return Object.values(this.TESTS).filter((test) => test.status === 'running')
  }

  static exportData(): {
    assignments: ABTestAssignment[]
    events: ABTestEvent[]
    tests: Record<string, ABTest>
  } {
    return {
      assignments: this.getStoredAssignments(),
      events: this.getStoredEvents(),
      tests: this.TESTS,
    }
  }

  static clearData(): void {
    if (typeof window === 'undefined') return

    localStorage.removeItem(this.ASSIGNMENT_KEY)
    localStorage.removeItem(this.EVENTS_KEY)
    localStorage.removeItem(this.USER_ID_KEY)
  }
}

export { ABTestingService }
