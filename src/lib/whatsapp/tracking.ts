import { CONTACT_INFO } from '@/lib/constants/contactInfo'
import { trackWhatsAppLead, GOOGLE_ADS_ID } from '@/lib/ads/googleAdsConversion'

const WHATSAPP_NUMBER = CONTACT_INFO.whatsapp.number
const API_ENDPOINT = '/api/analytics/whatsapp-click'

export interface WhatsAppTrackingParams {
  source: string
  page?: string
  campaign?: string
  buttonText?: string
  message?: string
  sessionId?: string
  userId?: string
  locality?: string // For geo-specific tracking
}

// UTM parameter extraction for attribution
export function getUTMParams(): Record<string, string> {
  if (typeof window === 'undefined') return {}

  const urlParams = new URLSearchParams(window.location.search)
  const utmParams: Record<string, string> = {}

  const utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term']
  utmKeys.forEach((key) => {
    const value = urlParams.get(key)
    if (value) {
      utmParams[key] = value
    }
  })

  // Store UTM params in session for persistence
  if (Object.keys(utmParams).length > 0) {
    sessionStorage.setItem('cerebrum_utm', JSON.stringify(utmParams))
  }

  // Retrieve stored UTM if current URL has none
  if (Object.keys(utmParams).length === 0) {
    const stored = sessionStorage.getItem('cerebrum_utm')
    if (stored) {
      try {
        return JSON.parse(stored)
      } catch {
        return {}
      }
    }
  }

  return utmParams
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

// Extract locality from URL path for geo-specific tracking
function extractLocalityFromPath(path: string): string | undefined {
  // Pattern: /neet-coaching-{locality}-delhi or /biology-tuition-{locality}
  const neetMatch = path.match(/\/neet-coaching-([a-z-]+)-delhi/)
  if (neetMatch) {
    return neetMatch[1].replace(/-/g, ' ')
  }

  // Pattern: /biology-tuition-south-delhi/{locality}
  const bioMatch = path.match(/\/biology-tuition-south-delhi\/([a-z-]+)/)
  if (bioMatch) {
    return bioMatch[1].replace(/-/g, ' ')
  }

  // Pattern: /locations/{city}/{locality}
  const locMatch = path.match(/\/locations\/[^/]+\/([a-z-]+)/)
  if (locMatch) {
    return locMatch[1].replace(/-/g, ' ')
  }

  return undefined
}

export async function trackWhatsAppClick(
  params: WhatsAppTrackingParams
): Promise<WhatsAppTrackingResult> {
  const page = params.page || getCurrentPage()
  const sessionId = params.sessionId || getSessionId()
  const utmParams = getUTMParams()

  // Extract locality from URL if not provided
  const locality = params.locality || extractLocalityFromPath(page)

  const payload = {
    ...params,
    page,
    sessionId,
    locality,
    ...utmParams, // Include UTM params in tracking
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

  // Fire Google Ads conversion for WhatsApp clicks (secondary conversion)
  trackWhatsAppLead(params.source, 50) // Estimated lead value ₹50

  // Also fire gtag event for real-time tracking
  if (typeof window !== 'undefined' && window.gtag && GOOGLE_ADS_ID) {
    window.gtag('event', 'conversion', {
      send_to: GOOGLE_ADS_ID,
      event_category: 'engagement',
      event_label: 'whatsapp_click',
      value: 50,
      currency: 'INR',
      whatsapp_source: params.source,
      whatsapp_campaign: params.campaign || 'direct',
    })
  }

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
  // General messages
  default: 'Hi! I am interested in NEET Biology coaching.',
  demo: 'Hi! I want to book a free demo class for NEET Biology.',
  demoBooked: 'Hi! I just booked a demo class and have some questions.',
  enquiry: 'Hi! I have some questions about your NEET Biology courses.',
  admission: 'Hi! I want to know about the admission process.',
  callback: 'Hi! Please call me back to discuss NEET Biology coaching.',

  // Course-related
  course: (courseName: string) => `Hi! I am interested in the ${courseName} course.`,
  courseEnquiry: 'Hi! I am interested in enrolling. Please share the course details.',

  // Page-specific messages
  mockTests: 'Hi! I want to know about your NEET Biology mock tests. What topics do they cover?',
  successStories: 'Hi! I saw your results page. How can I achieve similar scores in NEET Biology?',
  pricing: 'Hi! I want to know about the course fees and payment options for NEET Biology.',
  feeStructure: 'Hi! Please share the complete fee structure and EMI options.',
  scholarship: 'Hi! I want to apply for a scholarship. What is the process?',

  // Parent-specific messages
  parent: 'Hi! I am a parent enquiring about NEET Biology coaching for my child.',
  parentDemo: 'Hi! I am a parent. I want to book a demo class for my child.',
  parentFees: 'Hi! I am a parent. Please share the fee structure and batch timings.',
  parentProgress: "Hi! I am a parent. How can I track my child's progress in the course?",

  // NEET 2026/2027 specific
  neet2026: 'Hi! I want to enroll for NEET 2026 preparation. What batches are available?',
  neet2027: 'Hi! I am in Class 11. What courses do you have for NEET 2027?',
  dropper: 'Hi! I am a NEET dropper. Do you have a special batch for repeaters?',

  // Urgency messages
  discount: (code: string) => `Hi! I saw the discount offer (${code}). I want to claim it!`,
  exitIntent: (code: string) =>
    `Hi! I saw the 20% discount offer on the website. My code is ${code}. I would like to claim it!`,
  lastSeat: 'Hi! I saw only few seats are left. I want to enroll immediately!',

  // Seminar messages
  seminarFAQ: 'Hi, I have a question about the NEET Parent Seminar.',
  seminarSupport: 'Hi! I just registered for the NEET Guidance Seminar and need help.',
  careerSeminar:
    'Hi! I attended the School-Career Seminar. I want to know more about NEET coaching.',
} as const

// Page-to-message mapping for automatic context detection
export const PAGE_MESSAGES: Record<string, string> = {
  '/mock-tests': WHATSAPP_MESSAGES.mockTests,
  '/success-stories': WHATSAPP_MESSAGES.successStories,
  '/pricing': WHATSAPP_MESSAGES.pricing,
  '/fees': WHATSAPP_MESSAGES.feeStructure,
  '/scholarship': WHATSAPP_MESSAGES.scholarship,
  '/neet-2026-preparation': WHATSAPP_MESSAGES.neet2026,
  '/neet-2027': WHATSAPP_MESSAGES.neet2027,
  '/dropper-batch': WHATSAPP_MESSAGES.dropper,
  '/demo-booking': WHATSAPP_MESSAGES.demo,
  '/school-career-seminar': WHATSAPP_MESSAGES.careerSeminar,
}

// Get context-aware message based on current page with locality personalization
export function getContextAwareMessage(pathname?: string): string {
  if (!pathname) {
    if (typeof window !== 'undefined') {
      pathname = window.location.pathname
    } else {
      return WHATSAPP_MESSAGES.default
    }
  }

  // Check for exact match first
  if (PAGE_MESSAGES[pathname]) {
    return PAGE_MESSAGES[pathname]
  }

  // Locality-specific messages for better conversion
  const locality = extractLocalityFromPath(pathname)
  if (locality) {
    const localityName = locality
      .split(' ')
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ')

    if (pathname.includes('neet-coaching')) {
      return `Hi! I'm from ${localityName}. I want to join NEET Biology coaching. What batches are available nearby?`
    }

    if (pathname.includes('biology-tuition')) {
      return `Hi! I'm from ${localityName}. I need Biology tuition for my child. Can you share batch details?`
    }

    return `Hi! I'm from ${localityName} area and interested in NEET Biology coaching. Please share details.`
  }

  // Check for partial matches
  if (pathname.startsWith('/courses/')) {
    const courseName = pathname.split('/').pop()?.replace(/-/g, ' ') || 'NEET Biology'
    return `Hi! I am interested in the ${courseName} course. Please share details.`
  }

  if (pathname.startsWith('/blog/')) {
    return 'Hi! I was reading your blog and have some questions about NEET Biology preparation.'
  }

  // Default message with urgency
  return WHATSAPP_MESSAGES.default
}

export type WhatsAppMessageType = keyof typeof WHATSAPP_MESSAGES
