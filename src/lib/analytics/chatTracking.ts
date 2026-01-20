/**
 * Chat Analytics Tracking for Ceri AI and Aria
 * Tracks usage, engagement, and conversion metrics
 */

// Define tracking event types
export type CeriEventType =
  | 'ceri_opened'
  | 'ceri_closed'
  | 'ceri_message_sent'
  | 'ceri_doubt_resolved'
  | 'ceri_topic_asked'
  | 'ceri_practice_question_generated'
  | 'ceri_error'

export type AriaEventType =
  | 'aria_opened'
  | 'aria_closed'
  | 'aria_message_sent'
  | 'aria_lead_captured'
  | 'aria_demo_booked'
  | 'aria_qualified_lead'
  | 'aria_error'

interface CeriEventData {
  topic?: string
  doubtType?: string
  resolutionScore?: number // 1-5 rating
  messageCount?: number
  sessionDuration?: number // seconds
  studentId?: string
  studentClass?: string
}

interface AriaEventData {
  source?: string // page where chat was opened
  leadStage?: string // 'inquiry' | 'qualified' | 'demo_booked'
  messageCount?: number
  sessionDuration?: number // seconds
  demoBooked?: boolean
  leadData?: {
    name?: string
    phone?: string
    email?: string
    class?: string
    location?: string
  }
}

/**
 * Track Ceri AI events (Educational Tutor)
 */
export function trackCeriEvent(
  eventType: CeriEventType,
  eventData: CeriEventData = {}
): void {
  try {
    // Google Analytics 4
    if (typeof window !== 'undefined' && (window as any).gtag) {
      ;(window as any).gtag('event', eventType, {
        event_category: 'ceri_ai_tutor',
        event_label: eventData.topic || 'general',
        topic: eventData.topic,
        doubt_type: eventData.doubtType,
        resolution_score: eventData.resolutionScore,
        message_count: eventData.messageCount,
        session_duration: eventData.sessionDuration,
        student_id: eventData.studentId,
        student_class: eventData.studentClass,
        timestamp: new Date().toISOString(),
      })
    }

    // Console log in development
    if (process.env.NODE_ENV === 'development') {
      console.log('[Ceri Analytics]', eventType, eventData)
    }

    // Send to backend for detailed analytics (optional)
    if (eventType === 'ceri_doubt_resolved' || eventType === 'ceri_topic_asked') {
      fetch('/api/analytics/ceri', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          event: eventType,
          data: eventData,
          timestamp: new Date().toISOString(),
        }),
      }).catch((err) => console.error('[Ceri Analytics] Failed to send:', err))
    }
  } catch (error) {
    console.error('[Ceri Analytics] Error:', error)
  }
}

/**
 * Track Aria events (Sales Agent)
 */
export function trackAriaEvent(
  eventType: AriaEventType,
  eventData: AriaEventData = {}
): void {
  try {
    // Google Analytics 4
    if (typeof window !== 'undefined' && (window as any).gtag) {
      ;(window as any).gtag('event', eventType, {
        event_category: 'aria_sales_agent',
        event_label: eventData.source || 'unknown',
        source: eventData.source,
        lead_stage: eventData.leadStage,
        message_count: eventData.messageCount,
        session_duration: eventData.sessionDuration,
        demo_booked: eventData.demoBooked,
        timestamp: new Date().toISOString(),
      })
    }

    // Google Ads conversion tracking for qualified leads
    if (
      eventType === 'aria_demo_booked' ||
      eventType === 'aria_qualified_lead' ||
      eventType === 'aria_lead_captured'
    ) {
      if (typeof window !== 'undefined' && (window as any).gtag) {
        ;(window as any).gtag('event', 'conversion', {
          send_to: 'AW-11121440988/demo_booking',
          value: eventType === 'aria_demo_booked' ? 500 : 200,
          currency: 'INR',
          transaction_id: `aria_${Date.now()}`,
        })
      }
    }

    // Console log in development
    if (process.env.NODE_ENV === 'development') {
      console.log('[Aria Analytics]', eventType, eventData)
    }

    // Send to backend for detailed analytics (optional)
    if (
      eventType === 'aria_demo_booked' ||
      eventType === 'aria_qualified_lead' ||
      eventType === 'aria_lead_captured'
    ) {
      fetch('/api/analytics/aria', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          event: eventType,
          data: eventData,
          timestamp: new Date().toISOString(),
        }),
      }).catch((err) => console.error('[Aria Analytics] Failed to send:', err))
    }
  } catch (error) {
    console.error('[Aria Analytics] Error:', error)
  }
}

/**
 * Helper: Calculate session duration
 */
export function calculateSessionDuration(startTime: number): number {
  return Math.floor((Date.now() - startTime) / 1000) // seconds
}

/**
 * Helper: Track chat session start
 */
export function startChatSession(): number {
  return Date.now()
}

/**
 * Ceri AI Analytics - Track doubt resolution
 */
export function trackDoubtResolved(
  topic: string,
  resolutionScore: number,
  messageCount: number,
  sessionStart: number
): void {
  trackCeriEvent('ceri_doubt_resolved', {
    topic,
    resolutionScore,
    messageCount,
    sessionDuration: calculateSessionDuration(sessionStart),
  })
}

/**
 * Aria Analytics - Track demo booking
 */
export function trackDemoBooked(
  source: string,
  leadData: AriaEventData['leadData'],
  messageCount: number,
  sessionStart: number
): void {
  trackAriaEvent('aria_demo_booked', {
    source,
    leadStage: 'demo_booked',
    leadData,
    messageCount,
    sessionDuration: calculateSessionDuration(sessionStart),
    demoBooked: true,
  })
}

/**
 * Aria Analytics - Track qualified lead
 */
export function trackQualifiedLead(
  source: string,
  leadData: AriaEventData['leadData'],
  messageCount: number
): void {
  trackAriaEvent('aria_qualified_lead', {
    source,
    leadStage: 'qualified',
    leadData,
    messageCount,
  })
}

/**
 * Aria Analytics - Track lead captured
 */
export function trackLeadCaptured(
  source: string,
  leadData: AriaEventData['leadData']
): void {
  trackAriaEvent('aria_lead_captured', {
    source,
    leadStage: 'inquiry',
    leadData,
  })
}
