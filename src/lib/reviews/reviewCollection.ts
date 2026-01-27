/**
 * Review Collection Automation
 *
 * Triggers review requests after successful interactions (demo bookings, enrollments)
 * Sends delayed WhatsApp messages asking for Google reviews
 */


// Google Business Profile review link - UPDATE THIS with your actual link
export const GOOGLE_REVIEW_LINK = 'https://g.page/r/cerebrum-biology-academy/review'

// Review request delays (in milliseconds)
export const REVIEW_REQUEST_DELAYS = {
  AFTER_DEMO: 24 * 60 * 60 * 1000, // 24 hours after demo class
  AFTER_ENROLLMENT: 7 * 24 * 60 * 60 * 1000, // 7 days after enrollment
  AFTER_FIRST_CLASS: 3 * 24 * 60 * 60 * 1000, // 3 days after first class
}

interface ReviewRequestData {
  studentName: string
  phone: string
  eventType: 'demo' | 'enrollment' | 'first_class' | 'result'
  source?: string
}

/**
 * Generate personalized review request message
 */
export function generateReviewMessage(data: ReviewRequestData): string {
  const { studentName, eventType } = data
  const firstName = studentName.split(' ')[0]

  const messages = {
    demo: `Hi ${firstName}! 👋

Thank you for attending the demo class at Cerebrum Biology Academy!

We hope you found it valuable. If you enjoyed the session, we'd really appreciate if you could share your experience on Google:

${GOOGLE_REVIEW_LINK}

Your feedback helps other NEET aspirants find quality coaching! ⭐

- Team Cerebrum`,

    enrollment: `Hi ${firstName}! 🎉

Welcome to the Cerebrum family! We're excited to have you on board.

After your first week of classes, we'd love to hear your thoughts! Your review helps other students:

${GOOGLE_REVIEW_LINK}

Wishing you success in NEET! 📚

- Team Cerebrum`,

    first_class: `Hi ${firstName}! 📚

How was your first class at Cerebrum Biology Academy?

If you're enjoying the teaching style, please consider sharing your experience:

${GOOGLE_REVIEW_LINK}

Every review helps future NEET aspirants! ⭐

- Team Cerebrum`,

    result: `Hi ${firstName}! 🎊

Congratulations on your NEET result! We're so proud of your achievement!

Would you mind sharing your success story? It could inspire other students:

${GOOGLE_REVIEW_LINK}

Your story matters! 🌟

- Team Cerebrum`,
  }

  return messages[eventType]
}

/**
 * Generate WhatsApp link for review request
 */
export function getReviewRequestWhatsAppLink(data: ReviewRequestData): string {
  const message = generateReviewMessage(data)
  const phone = data.phone.replace(/[^0-9]/g, '')
  const formattedPhone = phone.startsWith('91') ? phone : `91${phone}`
  return `https://wa.me/${formattedPhone}?text=${encodeURIComponent(message)}`
}

/**
 * Schedule review request (stores in localStorage for follow-up)
 * In production, this should be handled by a backend service
 */
export function scheduleReviewRequest(data: ReviewRequestData): void {
  if (typeof window === 'undefined') return

  const scheduledRequests = JSON.parse(localStorage.getItem('scheduledReviewRequests') || '[]')

  const delay =
    REVIEW_REQUEST_DELAYS[`AFTER_${data.eventType.toUpperCase()}`] ||
    REVIEW_REQUEST_DELAYS.AFTER_DEMO

  scheduledRequests.push({
    ...data,
    scheduledFor: Date.now() + delay,
    createdAt: Date.now(),
    sent: false,
  })

  localStorage.setItem('scheduledReviewRequests', JSON.stringify(scheduledRequests))

  // Track scheduling
  if ((window as any).gtag) {
    ;(window as any).gtag('event', 'review_request_scheduled', {
      event_category: 'review_collection',
      event_label: data.eventType,
    })
  }
}

/**
 * Check and process pending review requests
 * Call this on app load or periodically
 */
export function processPendingReviewRequests(): ReviewRequestData[] {
  if (typeof window === 'undefined') return []

  const scheduledRequests = JSON.parse(localStorage.getItem('scheduledReviewRequests') || '[]')

  const now = Date.now()
  const dueRequests: ReviewRequestData[] = []

  const updatedRequests = scheduledRequests.map((request: any) => {
    if (!request.sent && request.scheduledFor <= now) {
      dueRequests.push(request)
      return { ...request, sent: true }
    }
    return request
  })

  localStorage.setItem('scheduledReviewRequests', JSON.stringify(updatedRequests))

  return dueRequests
}

/**
 * Track when user clicks review link
 */
export function trackReviewClick(source: string): void {
  if (typeof window === 'undefined') return

  // Track in analytics
  if ((window as any).gtag) {
    ;(window as any).gtag('event', 'review_link_click', {
      event_category: 'review_collection',
      event_label: source,
      value: 1,
    })
  }

  // Track in Facebook Pixel
  if ((window as any).fbq) {
    ;(window as any).fbq('trackCustom', 'ReviewIntentClick', {
      source: source,
    })
  }

  // Store locally for attribution
  const reviewClicks = JSON.parse(localStorage.getItem('reviewClicks') || '[]')
  reviewClicks.push({
    source,
    timestamp: Date.now(),
  })
  localStorage.setItem('reviewClicks', JSON.stringify(reviewClicks))
}

/**
 * Get review collection stats
 */
export function getReviewCollectionStats(): {
  scheduled: number
  sent: number
  clicked: number
} {
  if (typeof window === 'undefined') {
    return { scheduled: 0, sent: 0, clicked: 0 }
  }

  const scheduledRequests = JSON.parse(localStorage.getItem('scheduledReviewRequests') || '[]')
  const reviewClicks = JSON.parse(localStorage.getItem('reviewClicks') || '[]')

  return {
    scheduled: scheduledRequests.filter((r: any) => !r.sent).length,
    sent: scheduledRequests.filter((r: any) => r.sent).length,
    clicked: reviewClicks.length,
  }
}

/**
 * API endpoint handler for scheduling review requests from backend
 * Use this in your API routes
 */
export async function scheduleReviewRequestAPI(data: {
  studentName: string
  phone: string
  email?: string
  eventType: 'demo' | 'enrollment' | 'first_class' | 'result'
  delayHours?: number
}): Promise<{ success: boolean; message: string }> {
  // In production, this should:
  // 1. Store in database with scheduled time
  // 2. Use a job queue (like Bull, Agenda, or cloud functions)
  // 3. Send WhatsApp via official API or integration

  // For now, return success and handle client-side
  return {
    success: true,
    message: `Review request scheduled for ${data.studentName}`,
  }
}
