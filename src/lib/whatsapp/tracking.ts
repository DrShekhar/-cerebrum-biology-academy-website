const WHATSAPP_NUMBER = '918826444334'
const API_ENDPOINT = '/api/analytics/whatsapp-click'

export interface WhatsAppTrackingParams {
  source: string
  page?: string
  campaign?: string
  buttonText?: string
  message?: string
  sessionId?: string
  userId?: string
}

export interface WhatsAppTrackingResult {
  success: boolean
  eventId?: string
  whatsappUrl: string
}

function getSessionId(): string | null {
  if (typeof window === 'undefined') return null

  let sessionId = sessionStorage.getItem('cerebrum_session_id')
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substring(2, 10)}`
    sessionStorage.setItem('cerebrum_session_id', sessionId)
  }
  return sessionId
}

function getCurrentPage(): string {
  if (typeof window === 'undefined') return '/'
  return window.location.pathname
}

export async function trackWhatsAppClick(
  params: WhatsAppTrackingParams
): Promise<WhatsAppTrackingResult> {
  const page = params.page || getCurrentPage()
  const sessionId = params.sessionId || getSessionId()

  const payload = {
    ...params,
    page,
    sessionId,
  }

  try {
    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })

    const result = await response.json()
    return result as WhatsAppTrackingResult
  } catch (error) {
    console.error('WhatsApp tracking failed:', error)

    // Return fallback URL if tracking fails
    const fallbackMessage = params.message || 'Hi! I am interested in NEET Biology coaching.'
    const trackingInfo = ` [Source: ${params.source}]`
    const fullMessage = `${fallbackMessage}${trackingInfo}`

    return {
      success: false,
      whatsappUrl: `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(fullMessage)}`,
    }
  }
}

export async function trackAndOpenWhatsApp(params: WhatsAppTrackingParams): Promise<void> {
  const result = await trackWhatsAppClick(params)
  window.open(result.whatsappUrl, '_blank', 'noopener,noreferrer')
}

export function buildWhatsAppUrl(
  message: string,
  source?: string,
  includeTracking: boolean = true
): string {
  let fullMessage = message
  if (includeTracking && source) {
    fullMessage = `${message} [Source: ${source}]`
  }
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(fullMessage)}`
}

export function getTrackingRedirectUrl(source: string, message?: string, page?: string): string {
  const params = new URLSearchParams({
    source,
    ...(message && { message }),
    ...(page && { page }),
  })
  return `${API_ENDPOINT}?${params.toString()}`
}

export const WHATSAPP_MESSAGES = {
  default: 'Hi! I am interested in NEET Biology coaching.',
  demo: 'Hi! I want to book a free demo class for NEET Biology.',
  demoBooked: 'Hi! I just booked a demo class and have some questions.',
  course: (courseName: string) => `Hi! I am interested in the ${courseName} course.`,
  courseEnquiry: 'Hi! I am interested in enrolling. Please share the course details.',
  enquiry: 'Hi! I have some questions about your NEET Biology courses.',
  admission: 'Hi! I want to know about the admission process.',
  discount: (code: string) => `Hi! I saw the discount offer (${code}). I want to claim it!`,
  callback: 'Hi! Please call me back to discuss NEET Biology coaching.',
  exitIntent: (code: string) =>
    `Hi! I saw the 20% discount offer on the website. My code is ${code}. I would like to claim it!`,
} as const

export type WhatsAppMessageType = keyof typeof WHATSAPP_MESSAGES
