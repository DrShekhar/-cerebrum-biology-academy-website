import {
  FunnelEvent,
  FunnelMetrics,
  COURSE_SELECTION_FUNNEL,
} from '../analytics/conversionFunnelAnalysis'
import { HeatmapDataPoint } from '../heatmap/heatmapTracking'
import { FeedbackData } from '../feedback/feedbackCollection'

// Generate realistic demo funnel data
export function generateDemoFunnelData(userCount: number = 100): FunnelEvent[] {
  const events: FunnelEvent[] = []
  const steps = COURSE_SELECTION_FUNNEL

  for (let userId = 1; userId <= userCount; userId++) {
    const sessionId = `session_${userId}_${Date.now()}`
    const baseTime = Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000 // Last 7 days

    let currentTime = baseTime
    let shouldContinue = true

    for (let i = 0; i < steps.length && shouldContinue; i++) {
      const step = steps[i]

      // Entry event
      events.push({
        stepId: step.id,
        userId: `user_${userId}`,
        sessionId,
        timestamp: currentTime,
        eventType: 'enter',
        metadata: {
          deviceType: Math.random() > 0.3 ? 'mobile' : 'desktop',
          browser: ['Chrome', 'Safari', 'Firefox'][Math.floor(Math.random() * 3)],
          entrySource:
            i === 0
              ? ['organic', 'paid', 'direct', 'referral'][Math.floor(Math.random() * 4)]
              : 'navigation',
        },
      })

      // Simulate time spent on step
      const timeSpent = (step.expectedTime || 60) * 1000 * (0.5 + Math.random()) // 50-150% of expected time
      currentTime += timeSpent

      // Determine if user completes or exits this step
      const completionRate = getStepCompletionRate(step.id)
      const willComplete = Math.random() < completionRate

      if (willComplete) {
        // Completion event
        events.push({
          stepId: step.id,
          userId: `user_${userId}`,
          sessionId,
          timestamp: currentTime,
          eventType: 'complete',
          timeSpent,
          metadata: {
            attempts: Math.random() > 0.8 ? Math.floor(Math.random() * 3) + 2 : 1,
            errors: Math.random() > 0.9 ? Math.floor(Math.random() * 2) + 1 : 0,
          },
        })
      } else {
        // Exit event
        const exitReasons: Array<'timeout' | 'error' | 'abandonment' | 'navigation'> = [
          'timeout',
          'error',
          'abandonment',
          'navigation',
        ]
        const exitReason = exitReasons[Math.floor(Math.random() * exitReasons.length)]

        events.push({
          stepId: step.id,
          userId: `user_${userId}`,
          sessionId,
          timestamp: currentTime,
          eventType: 'exit',
          timeSpent,
          exitReason,
          metadata: {
            exitPage: step.name,
            scrollDepth: Math.random(),
            interactionCount: Math.floor(Math.random() * 10),
          },
        })

        shouldContinue = false
      }

      // Add some random delay before next step
      currentTime += Math.random() * 30000 // 0-30 seconds
    }
  }

  return events
}

// Generate realistic completion rates for different steps
function getStepCompletionRate(stepId: string): number {
  const rates: Record<string, number> = {
    landing_page_view: 0.95,
    value_proposition_engagement: 0.8,
    success_stories_view: 0.7,
    course_selector_initiation: 0.75,
    personal_info_step: 0.85,
    academic_background_step: 0.9,
    goals_aspirations_step: 0.8,
    study_preferences_step: 0.85,
    budget_planning_step: 0.7,
    course_recommendations_view: 0.9,
    course_details_exploration: 0.6,
    pricing_analysis: 0.8,
    consultation_booking: 0.4,
    social_proof_engagement: 0.5,
    comparison_analysis: 0.3,
    course_selection_final: 0.7,
    enrollment_form: 0.9,
    payment_initiation: 0.8,
    payment_completion: 0.95,
  }

  return rates[stepId] || 0.5
}

// Generate demo heatmap data
export function generateDemoHeatmapData(eventCount: number = 500): HeatmapDataPoint[] {
  const dataPoints: HeatmapDataPoint[] = []
  const eventTypes: Array<
    'click' | 'hover' | 'scroll' | 'focus' | 'blur' | 'form_interaction' | 'mouse_move'
  > = ['click', 'hover', 'scroll', 'focus', 'blur', 'form_interaction']

  const commonElements = [
    { tag: 'button', id: 'next-button', class: 'btn btn-primary' },
    { tag: 'button', id: 'prev-button', class: 'btn btn-secondary' },
    { tag: 'input', id: 'fullName', class: 'form-input' },
    { tag: 'input', id: 'email', class: 'form-input' },
    { tag: 'select', id: 'currentClass', class: 'form-select' },
    { tag: 'div', id: 'course-card-1', class: 'course-card' },
    { tag: 'div', id: 'course-card-2', class: 'course-card' },
    { tag: 'a', id: 'consultation-link', class: 'cta-button' },
    { tag: 'div', id: 'pricing-option-1', class: 'pricing-option' },
    { tag: 'div', id: 'success-story-1', class: 'testimonial' },
  ]

  for (let i = 0; i < eventCount; i++) {
    const userId = `user_${Math.floor(Math.random() * 50) + 1}`
    const sessionId = `session_${userId}_${Date.now()}`
    const eventType = eventTypes[Math.floor(Math.random() * eventTypes.length)]
    const element = commonElements[Math.floor(Math.random() * commonElements.length)]

    // Generate coordinates based on element type and common UI patterns
    let x, y
    if (element.tag === 'button') {
      x = 300 + Math.random() * 200 // Buttons typically in center-right
      y = 400 + Math.random() * 100
    } else if (element.tag === 'input' || element.tag === 'select') {
      x = 200 + Math.random() * 400 // Form fields spread across center
      y = 200 + Math.random() * 300
    } else {
      x = Math.random() * 800 // Other elements can be anywhere
      y = Math.random() * 600
    }

    dataPoints.push({
      id: `heatmap_${i}_${Date.now()}`,
      userId,
      sessionId,
      timestamp: Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000,
      eventType,
      elementId: element.id,
      elementClass: element.class,
      elementTag: element.tag,
      elementText: generateElementText(element.tag),
      xpath: generateXPath(element),
      coordinates: {
        x,
        y,
        relativeX: Math.random(),
        relativeY: Math.random(),
      },
      viewport: {
        width: 1200 + Math.random() * 600,
        height: 800 + Math.random() * 400,
      },
      page: {
        url: `https://cerebrum-biology-academy.com/course-selector?step=${Math.floor(Math.random() * 8)}`,
        title: 'NEET Course Selector - Cerebrum Biology Academy',
        step: Math.floor(Math.random() * 8).toString(),
      },
      metadata: {
        deviceType: Math.random() > 0.3 ? 'mobile' : 'desktop',
        browser: ['Chrome', 'Safari', 'Firefox'][Math.floor(Math.random() * 3)],
        interactionSequence: i,
      },
    })
  }

  return dataPoints
}

function generateElementText(tag: string): string {
  const texts = {
    button: ['Next Step', 'Previous', 'Get Started', 'Book Consultation', 'Select Course'],
    input: ['', '', ''], // Inputs typically don't have visible text
    select: ['Choose Class', 'Select Board', 'Pick Location'],
    div: ['Course Details', 'Success Story', 'Pricing Plan'],
    a: ['Learn More', 'Book Now', 'Contact Us'],
  }

  const options = texts[tag as keyof typeof texts] || ['Sample Text']
  return options[Math.floor(Math.random() * options.length)]
}

function generateXPath(element: { tag: string; id: string; class: string }): string {
  if (element.id) {
    return `//*[@id="${element.id}"]`
  }
  return `//div//${element.tag}[@class="${element.class}"]`
}

// Generate demo feedback data
export function generateDemoFeedbackData(feedbackCount: number = 50): FeedbackData[] {
  const feedbackData: FeedbackData[] = []
  const feedbackTypes: Array<'rating' | 'survey' | 'suggestion' | 'bug_report' | 'exit_feedback'> =
    ['rating', 'survey', 'suggestion', 'bug_report', 'exit_feedback']

  const sampleResponses = {
    rating: [
      { rating: 5, comment: 'Excellent course selection process!' },
      { rating: 4, comment: 'Very helpful, just a bit slow on mobile' },
      { rating: 3, comment: 'Good but could be more intuitive' },
      { rating: 2, comment: 'Confusing navigation' },
      { rating: 1, comment: 'Too complicated' },
    ],
    survey: [
      {
        step_difficulty: 4,
        step_clarity: 5,
        step_suggestions: 'Add more examples for each subject',
      },
      {
        relevance_rating: 8,
        missing_courses: 'Need more foundation courses for weak students',
        decision_factors: ['Course content and curriculum', 'Price and payment options'],
      },
      {
        nps_score: 9,
        nps_reason: 'Great personalized recommendations',
      },
    ],
    suggestion: [
      { comment: 'Add a progress save feature so I can come back later' },
      { comment: 'Include more payment options like EMI' },
      { comment: 'Show more success stories from students like me' },
    ],
    bug_report: [
      {
        comment: 'Page crashes when I select multiple subjects on mobile',
        browser_info: 'Chrome on Android',
      },
      { comment: 'Form validation errors are not clear', error_frequency: 'Occasionally' },
    ],
    exit_feedback: [
      {
        exit_reason: 'Process is too long',
        return_likelihood: 3,
        improvement_suggestion: 'Make it shorter or show progress better',
      },
      {
        exit_reason: 'Need to discuss with family',
        return_likelihood: 4,
        improvement_suggestion: 'Add option to save and email details',
      },
    ],
  }

  for (let i = 0; i < feedbackCount; i++) {
    const userId = `user_${Math.floor(Math.random() * 30) + 1}`
    const sessionId = `session_${userId}_${Date.now()}`
    const feedbackType = feedbackTypes[Math.floor(Math.random() * feedbackTypes.length)]
    const step = Math.floor(Math.random() * 8)

    const responses = sampleResponses[feedbackType]
    const data = responses[Math.floor(Math.random() * responses.length)]

    feedbackData.push({
      id: `feedback_${i}_${Date.now()}`,
      userId,
      sessionId,
      timestamp: Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000,
      feedbackType,
      context: {
        step,
        stepName: [
          'Personal Info',
          'Academic Background',
          'Goals',
          'Preferences',
          'Budget',
          'Recommendations',
          'Selection',
          'Payment',
        ][step],
        page: `https://cerebrum-biology-academy.com/course-selector?step=${step}`,
        userAgent: 'Mozilla/5.0 (compatible demo data)',
        viewport: { width: 1200, height: 800 },
      },
      data: {
        responses: data,
        surveyId:
          feedbackType === 'survey'
            ? ['step_completion_feedback', 'course_recommendation_feedback', 'nps_survey'][
                Math.floor(Math.random() * 3)
              ]
            : undefined,
      },
      metadata: {
        deviceType: Math.random() > 0.3 ? 'mobile' : 'desktop',
        completionTime: Date.now(),
      },
    })
  }

  return feedbackData
}

// Generate funnel metrics from events
export function generateFunnelMetrics(events: FunnelEvent[]): FunnelMetrics[] {
  const metrics: FunnelMetrics[] = []

  COURSE_SELECTION_FUNNEL.forEach((step) => {
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

    metrics.push({
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
      medianTimeSpent: completionTimes.length > 0 ? calculateMedian(completionTimes) / 1000 : 0,
      bounceRate: entries > 0 ? (exits / entries) * 100 : 0,
      retryRate:
        (stepEvents.filter((e) => e.eventType === 'retry').length / Math.max(entries, 1)) * 100,
      commonExitReasons: Object.entries(exitReasons).map(([reason, count]) => ({ reason, count })),
    })
  })

  return metrics
}

function calculateMedian(numbers: number[]): number {
  const sorted = [...numbers].sort((a, b) => a - b)
  const mid = Math.floor(sorted.length / 2)
  return sorted.length % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2
}

// Utility function to refresh demo data
export function refreshDemoData() {
  return {
    funnelEvents: generateDemoFunnelData(100),
    heatmapData: generateDemoHeatmapData(500),
    feedbackData: generateDemoFeedbackData(50),
  }
}
