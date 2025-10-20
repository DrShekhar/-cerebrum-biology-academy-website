export interface FunnelStep {
  id: string
  name: string
  description: string
  category: 'awareness' | 'interest' | 'consideration' | 'intent' | 'evaluation' | 'purchase'
  isRequired: boolean
  expectedTime?: number // seconds
  dependencies?: string[] // step IDs that must be completed first
}

export interface FunnelEvent {
  stepId: string
  userId: string
  sessionId: string
  timestamp: number
  eventType: 'enter' | 'complete' | 'exit' | 'skip' | 'retry'
  metadata?: Record<string, any>
  timeSpent?: number
  exitReason?: 'timeout' | 'error' | 'abandonment' | 'navigation'
}

export interface FunnelMetrics {
  stepId: string
  stepName: string
  totalEntries: number
  totalCompletions: number
  totalExits: number
  conversionRate: number
  dropOffRate: number
  averageTimeSpent: number
  medianTimeSpent: number
  bounceRate: number
  retryRate: number
  commonExitReasons: Array<{ reason: string; count: number }>
}

export interface FunnelAnalysis {
  overallConversionRate: number
  totalUsers: number
  completedJourney: number
  averageJourneyTime: number
  stepMetrics: FunnelMetrics[]
  bottlenecks: Array<{
    stepId: string
    stepName: string
    severity: 'low' | 'medium' | 'high' | 'critical'
    dropOffRate: number
    impact: string
    recommendations: string[]
  }>
  cohortAnalysis: {
    newUsers: FunnelMetrics[]
    returningUsers: FunnelMetrics[]
    mobileUsers: FunnelMetrics[]
    desktopUsers: FunnelMetrics[]
  }
}

// Define the complete NEET course selection funnel
export const COURSE_SELECTION_FUNNEL: FunnelStep[] = [
  // Awareness Stage
  {
    id: 'landing_page_view',
    name: 'Landing Page View',
    description: 'User visits the main landing page',
    category: 'awareness',
    isRequired: true,
    expectedTime: 30,
  },
  {
    id: 'value_proposition_engagement',
    name: 'Value Proposition Engagement',
    description: 'User scrolls past hero section and views key benefits',
    category: 'awareness',
    isRequired: false,
    expectedTime: 45,
    dependencies: ['landing_page_view'],
  },
  {
    id: 'success_stories_view',
    name: 'Success Stories View',
    description: 'User views student success testimonials',
    category: 'awareness',
    isRequired: false,
    expectedTime: 60,
    dependencies: ['landing_page_view'],
  },

  // Interest Stage
  {
    id: 'course_selector_initiation',
    name: 'Course Selector Initiation',
    description: 'User clicks to start course selection wizard',
    category: 'interest',
    isRequired: true,
    expectedTime: 5,
    dependencies: ['landing_page_view'],
  },
  {
    id: 'personal_info_step',
    name: 'Personal Information',
    description: 'User completes personal details form',
    category: 'interest',
    isRequired: true,
    expectedTime: 120,
    dependencies: ['course_selector_initiation'],
  },
  {
    id: 'academic_background_step',
    name: 'Academic Background',
    description: 'User provides academic history and performance',
    category: 'interest',
    isRequired: true,
    expectedTime: 90,
    dependencies: ['personal_info_step'],
  },

  // Consideration Stage
  {
    id: 'goals_aspirations_step',
    name: 'Goals & Aspirations',
    description: 'User defines NEET goals and target colleges',
    category: 'consideration',
    isRequired: true,
    expectedTime: 150,
    dependencies: ['academic_background_step'],
  },
  {
    id: 'study_preferences_step',
    name: 'Study Preferences',
    description: 'User selects preferred learning methods and schedule',
    category: 'consideration',
    isRequired: true,
    expectedTime: 180,
    dependencies: ['goals_aspirations_step'],
  },
  {
    id: 'budget_planning_step',
    name: 'Budget Planning',
    description: 'User provides budget constraints and payment preferences',
    category: 'consideration',
    isRequired: true,
    expectedTime: 120,
    dependencies: ['study_preferences_step'],
  },

  // Intent Stage
  {
    id: 'course_recommendations_view',
    name: 'Course Recommendations View',
    description: 'User views personalized course suggestions',
    category: 'intent',
    isRequired: true,
    expectedTime: 240,
    dependencies: ['budget_planning_step'],
  },
  {
    id: 'course_details_exploration',
    name: 'Course Details Exploration',
    description: 'User explores specific course details and curriculum',
    category: 'intent',
    isRequired: false,
    expectedTime: 300,
    dependencies: ['course_recommendations_view'],
  },
  {
    id: 'pricing_analysis',
    name: 'Pricing Analysis',
    description: 'User reviews detailed pricing and payment options',
    category: 'intent',
    isRequired: true,
    expectedTime: 180,
    dependencies: ['course_recommendations_view'],
  },

  // Evaluation Stage
  {
    id: 'consultation_booking',
    name: 'Consultation Booking',
    description: 'User schedules consultation with counselor',
    category: 'evaluation',
    isRequired: false,
    expectedTime: 120,
    dependencies: ['course_recommendations_view'],
  },
  {
    id: 'social_proof_engagement',
    name: 'Social Proof Engagement',
    description: 'User interacts with testimonials, reviews, or success metrics',
    category: 'evaluation',
    isRequired: false,
    expectedTime: 90,
    dependencies: ['course_recommendations_view'],
  },
  {
    id: 'comparison_analysis',
    name: 'Course Comparison',
    description: 'User compares multiple course options side by side',
    category: 'evaluation',
    isRequired: false,
    expectedTime: 240,
    dependencies: ['course_recommendations_view'],
  },

  // Purchase Stage
  {
    id: 'course_selection_final',
    name: 'Final Course Selection',
    description: 'User makes final course choice',
    category: 'purchase',
    isRequired: true,
    expectedTime: 60,
    dependencies: ['pricing_analysis'],
  },
  {
    id: 'enrollment_form',
    name: 'Enrollment Form',
    description: 'User completes enrollment application',
    category: 'purchase',
    isRequired: true,
    expectedTime: 300,
    dependencies: ['course_selection_final'],
  },
  {
    id: 'payment_initiation',
    name: 'Payment Initiation',
    description: 'User starts payment process',
    category: 'purchase',
    isRequired: true,
    expectedTime: 180,
    dependencies: ['enrollment_form'],
  },
  {
    id: 'payment_completion',
    name: 'Payment Completion',
    description: 'User successfully completes payment',
    category: 'purchase',
    isRequired: true,
    expectedTime: 120,
    dependencies: ['payment_initiation'],
  },
]

export class FunnelTracker {
  private events: FunnelEvent[] = []
  private stepStartTimes: Map<string, number> = new Map()
  private sessionId: string
  private userId: string

  constructor(userId: string, sessionId?: string) {
    this.userId = userId
    this.sessionId = sessionId || this.generateSessionId()
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  trackStepEntry(stepId: string, metadata?: Record<string, any>): void {
    const timestamp = Date.now()
    this.stepStartTimes.set(stepId, timestamp)

    const event: FunnelEvent = {
      stepId,
      userId: this.userId,
      sessionId: this.sessionId,
      timestamp,
      eventType: 'enter',
      metadata,
    }

    this.events.push(event)
    this.sendToAnalytics('funnel_step_enter', event)
  }

  trackStepCompletion(stepId: string, metadata?: Record<string, any>): void {
    const timestamp = Date.now()
    const startTime = this.stepStartTimes.get(stepId)
    const timeSpent = startTime ? timestamp - startTime : undefined

    const event: FunnelEvent = {
      stepId,
      userId: this.userId,
      sessionId: this.sessionId,
      timestamp,
      eventType: 'complete',
      metadata,
      timeSpent,
    }

    this.events.push(event)
    this.stepStartTimes.delete(stepId)
    this.sendToAnalytics('funnel_step_complete', event)
  }

  trackStepExit(
    stepId: string,
    exitReason?: 'timeout' | 'error' | 'abandonment' | 'navigation',
    metadata?: Record<string, any>
  ): void {
    const timestamp = Date.now()
    const startTime = this.stepStartTimes.get(stepId)
    const timeSpent = startTime ? timestamp - startTime : undefined

    const event: FunnelEvent = {
      stepId,
      userId: this.userId,
      sessionId: this.sessionId,
      timestamp,
      eventType: 'exit',
      metadata,
      timeSpent,
      exitReason,
    }

    this.events.push(event)
    this.stepStartTimes.delete(stepId)
    this.sendToAnalytics('funnel_step_exit', event)
  }

  private sendToAnalytics(eventName: string, event: FunnelEvent): void {
    // Send to Google Analytics 4
    if (typeof window !== 'undefined' && 'gtag' in window) {
      const gtag = (window as any).gtag
      gtag('event', eventName, {
        step_id: event.stepId,
        user_id: event.userId,
        session_id: event.sessionId,
        event_type: event.eventType,
        time_spent: event.timeSpent,
        exit_reason: event.exitReason,
        custom_parameters: event.metadata,
      })
    }

    // Send to custom analytics endpoint
    if (typeof window !== 'undefined') {
      fetch('/api/analytics/funnel', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(event),
      }).catch(console.error)
    }
  }

  getSessionEvents(): FunnelEvent[] {
    return [...this.events]
  }
}

// Analytics calculation utilities
export class FunnelAnalyzer {
  static calculateMetrics(events: FunnelEvent[]): FunnelAnalysis {
    const stepMetrics = COURSE_SELECTION_FUNNEL.map((step) => {
      const stepEvents = events.filter((e) => e.stepId === step.id)
      const entries = stepEvents.filter((e) => e.eventType === 'enter').length
      const completions = stepEvents.filter((e) => e.eventType === 'complete').length
      const exits = stepEvents.filter((e) => e.eventType === 'exit').length

      const completionTimes = stepEvents
        .filter((e) => e.eventType === 'complete' && e.timeSpent)
        .map((e) => e.timeSpent!)

      const exitReasons = stepEvents
        .filter((e) => e.eventType === 'exit' && e.exitReason)
        .reduce(
          (acc, e) => {
            const reason = e.exitReason!
            acc[reason] = (acc[reason] || 0) + 1
            return acc
          },
          {} as Record<string, number>
        )

      return {
        stepId: step.id,
        stepName: step.name,
        totalEntries: entries,
        totalCompletions: completions,
        totalExits: exits,
        conversionRate: entries > 0 ? (completions / entries) * 100 : 0,
        dropOffRate: entries > 0 ? (exits / entries) * 100 : 0,
        averageTimeSpent:
          completionTimes.length > 0
            ? completionTimes.reduce((a, b) => a + b, 0) / completionTimes.length / 1000
            : 0,
        medianTimeSpent:
          completionTimes.length > 0 ? this.calculateMedian(completionTimes) / 1000 : 0,
        bounceRate: entries > 0 ? (exits / entries) * 100 : 0,
        retryRate:
          (stepEvents.filter((e) => e.eventType === 'retry').length / Math.max(entries, 1)) * 100,
        commonExitReasons: Object.entries(exitReasons).map(([reason, count]) => ({
          reason,
          count,
        })),
      }
    })

    // Calculate bottlenecks
    const bottlenecks = stepMetrics
      .filter((metric) => metric.dropOffRate > 20) // Steps with >20% drop-off
      .map((metric) => {
        let severity: 'low' | 'medium' | 'high' | 'critical'
        if (metric.dropOffRate > 60) severity = 'critical'
        else if (metric.dropOffRate > 40) severity = 'high'
        else if (metric.dropOffRate > 30) severity = 'medium'
        else severity = 'low'

        const recommendations = this.generateRecommendations(metric)

        return {
          stepId: metric.stepId,
          stepName: metric.stepName,
          severity,
          dropOffRate: metric.dropOffRate,
          impact: `${metric.totalExits} users lost at this step`,
          recommendations,
        }
      })
      .sort((a, b) => b.dropOffRate - a.dropOffRate)

    // Calculate overall metrics
    const totalUsers = new Set(events.map((e) => e.userId)).size
    const usersWhoCompleted = events
      .filter((e) => e.eventType === 'complete' && e.stepId === 'payment_completion')
      .map((e) => e.userId)
    const completedJourney = new Set(usersWhoCompleted).size

    return {
      overallConversionRate: totalUsers > 0 ? (completedJourney / totalUsers) * 100 : 0,
      totalUsers,
      completedJourney,
      averageJourneyTime: this.calculateAverageJourneyTime(events),
      stepMetrics,
      bottlenecks,
      cohortAnalysis: this.calculateCohortAnalysis(events),
    }
  }

  private static calculateMedian(numbers: number[]): number {
    const sorted = [...numbers].sort((a, b) => a - b)
    const mid = Math.floor(sorted.length / 2)
    return sorted.length % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2
  }

  private static generateRecommendations(metric: FunnelMetrics): string[] {
    const recommendations: string[] = []

    if (metric.dropOffRate > 50) {
      recommendations.push('Critical: Redesign this step to reduce complexity')
      recommendations.push('Add progress indicators and motivation messaging')
    }

    if (metric.averageTimeSpent > 300) {
      // > 5 minutes
      recommendations.push('Optimize form fields and reduce cognitive load')
      recommendations.push('Add inline help and tooltips')
    }

    if (metric.commonExitReasons.some((r) => r.reason === 'error')) {
      recommendations.push('Fix technical issues causing errors')
      recommendations.push('Improve error messaging and recovery flows')
    }

    if (metric.commonExitReasons.some((r) => r.reason === 'timeout')) {
      recommendations.push('Increase step timeout or break into smaller steps')
      recommendations.push('Add auto-save functionality')
    }

    return recommendations
  }

  private static calculateAverageJourneyTime(events: FunnelEvent[]): number {
    const userJourneys = events.reduce(
      (acc, event) => {
        if (!acc[event.userId]) {
          acc[event.userId] = { start: null, end: null }
        }

        if (event.stepId === 'landing_page_view' && event.eventType === 'enter') {
          acc[event.userId].start = event.timestamp
        }

        if (event.stepId === 'payment_completion' && event.eventType === 'complete') {
          acc[event.userId].end = event.timestamp
        }

        return acc
      },
      {} as Record<string, { start: number | null; end: number | null }>
    )

    const completedJourneyTimes = Object.values(userJourneys)
      .filter((journey) => journey.start && journey.end)
      .map((journey) => journey.end! - journey.start!)

    return completedJourneyTimes.length > 0
      ? completedJourneyTimes.reduce((a, b) => a + b, 0) / completedJourneyTimes.length / 1000 / 60 // minutes
      : 0
  }

  private static calculateCohortAnalysis(events: FunnelEvent[]): FunnelAnalysis['cohortAnalysis'] {
    // This is a simplified implementation - in practice, you'd need user metadata
    const allMetrics = this.calculateMetrics(events).stepMetrics

    return {
      newUsers: allMetrics, // Would filter by user.isNew
      returningUsers: allMetrics, // Would filter by user.isReturning
      mobileUsers: allMetrics, // Would filter by user.device === 'mobile'
      desktopUsers: allMetrics, // Would filter by user.device === 'desktop'
    }
  }
}
