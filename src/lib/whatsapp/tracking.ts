import { CONTACT_INFO, getPhoneLink } from '@/lib/constants/contactInfo'
import { trackWhatsAppLead } from '@/lib/ads/googleAdsConversion'

const WHATSAPP_NUMBER = CONTACT_INFO.whatsapp.number
const PHONE_DISPLAY = CONTACT_INFO.phone.display.primary
const API_ENDPOINT = '/api/analytics/whatsapp-click'

export function isMobileDevice(): boolean {
  if (typeof navigator === 'undefined') return true
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
}

export interface WhatsAppDesktopModalEvent {
  whatsappUrl: string
  message: string
  source?: string
}

export function openDesktopWhatsAppModal(whatsappUrl: string, message: string, source?: string) {
  window.dispatchEvent(
    new CustomEvent<WhatsAppDesktopModalEvent>('cerebrum:whatsapp-desktop-modal', {
      detail: { whatsappUrl, message, source },
    })
  )
}

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

  const utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'gclid']
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

function openWhatsAppDirectly(params: WhatsAppTrackingParams): void {
  const message = params.message || 'Hi! I am interested in NEET Biology coaching.'
  const utmData = getUTMParams()
  const sourceTag = utmData.gclid ? 'Google Ads' : params.source
  const trackingInfo = ` [Source: ${sourceTag}]`
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message + trackingInfo)}`

  // Fire synchronous tracking FIRST (Google Ads conversion — no network call)
  trackWhatsAppLead(params.source, 50)

  if (isMobileDevice()) {
    // Use location.href directly — more reliable than window.open on mobile
    // and avoids popup blockers entirely
    window.location.href = whatsappUrl
  } else {
    openDesktopWhatsAppModal(whatsappUrl, message, params.source)
  }

  // Fire async tracking AFTER navigation starts (fire-and-forget)
  trackWhatsAppClick(params).catch(() => {})
}

export async function trackAndOpenWhatsApp(params: WhatsAppTrackingParams): Promise<void> {
  openWhatsAppDirectly(params)
}

/**
 * Show a call fallback when WhatsApp fails to open (popup blocked, app not installed).
 * Uses a simple DOM toast so it works without React dependencies.
 */
function showCallFallback() {
  if (typeof document === 'undefined') return

  const existing = document.getElementById('whatsapp-call-fallback')
  if (existing) existing.remove()

  const toast = document.createElement('div')
  toast.id = 'whatsapp-call-fallback'
  toast.style.cssText =
    'position:fixed;bottom:80px;left:50%;transform:translateX(-50%);z-index:99999;' +
    'background:#1e40af;color:white;padding:16px 24px;border-radius:16px;' +
    'box-shadow:0 10px 25px rgba(0,0,0,0.2);text-align:center;max-width:340px;width:90%;' +
    'font-family:system-ui,sans-serif;animation:fadeInUp 0.3s ease'

  toast.innerHTML =
    '<p style="margin:0 0 12px;font-size:14px;font-weight:500">WhatsApp could not open. Call us instead:</p>' +
    `<a href="${getPhoneLink()}" style="display:inline-flex;align-items:center;gap:8px;` +
    'background:white;color:#1e40af;padding:12px 24px;border-radius:12px;font-weight:700;' +
    `font-size:16px;text-decoration:none">📞 ${PHONE_DISPLAY}</a>` +
    '<button onclick="this.parentElement.remove()" style="position:absolute;top:8px;right:12px;' +
    'background:none;border:none;color:white;font-size:18px;cursor:pointer;padding:4px">&times;</button>'

  document.body.appendChild(toast)

  setTimeout(() => {
    toast.remove()
  }, 10000)
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

  // City-specific messages with center info
  cityFaridabad:
    "Hi! I'm from Faridabad. I want to visit your Sector 17 center for NEET Biology coaching. Please share batch timings and demo class schedule.",
  cityGurugram:
    "Hi! I'm from Gurugram. I want to visit your Sector 51 center (M2K Corporate Park) for NEET Biology classes. Please share batch details.",
  citySouthDelhi:
    "Hi! I'm from South Delhi. I want to visit your South Extension center for NEET Biology coaching. Please share batch timings.",
  cityRohini:
    "Hi! I'm from Rohini/North Delhi. I want to visit your DC Chowk center for NEET Biology classes. Please share demo schedule.",
  cityNoida:
    "Hi! I'm from Noida. I want to join your online NEET Biology classes. Please share batch timings and demo class schedule.",
  cityGhaziabad:
    "Hi! I'm from Ghaziabad. I want to join your online NEET Biology classes. Please share batch details and fees.",

  // Course-specific messages for broader offerings
  olympiad: 'Hi! I want to enroll for Biology Olympiad (NBO/IBO) preparation. What courses do you offer?',
  boardBiology: 'Hi! I need Board Biology / CBSE Biology coaching. Please share course details.',
  foundation: 'Hi! I want Foundation Biology coaching for Class 9/10. What batches are available?',
  mcqPractice: 'Hi! I want to access your MCQ Practice tool for NEET Biology preparation.',
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
  '/neet-coaching-faridabad': WHATSAPP_MESSAGES.cityFaridabad,
  '/neet-coaching-gurugram': WHATSAPP_MESSAGES.cityGurugram,
  '/neet-coaching-south-delhi': WHATSAPP_MESSAGES.citySouthDelhi,
  '/neet-coaching-rohini': WHATSAPP_MESSAGES.cityRohini,
  '/neet-coaching-north-delhi': WHATSAPP_MESSAGES.cityRohini,
  '/neet-coaching-west-delhi': WHATSAPP_MESSAGES.cityRohini,
  '/neet-coaching-noida': WHATSAPP_MESSAGES.cityNoida,
  '/neet-coaching-ghaziabad': WHATSAPP_MESSAGES.cityGhaziabad,
  '/neet-coaching-east-delhi': WHATSAPP_MESSAGES.cityNoida,
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

  // City-specific messages mentioning nearest offline center
  const centerCities: Record<string, string> = {
    'faridabad': 'I can visit your Faridabad center (Sector 17, Huda Market). ',
    'gurugram': 'I can visit your Gurugram center (M2K Corporate Park, Sector 51). ',
    'gurgaon': 'I can visit your Gurugram center (M2K Corporate Park, Sector 51). ',
    'south-delhi': 'I can visit your South Extension center. ',
    'south-extension': 'I can visit your South Extension center. ',
    'rohini': 'I can visit your Rohini center (DC Chowk, Sector 9). ',
    'north-delhi': 'I can visit your Rohini center (DC Chowk, Sector 9). ',
    'west-delhi': 'I can visit your Rohini center (DC Chowk, Sector 9). ',
    'noida': 'I prefer online classes. ',
    'ghaziabad': 'I prefer online classes. ',
    'east-delhi': 'I prefer online classes. ',
  }

  // Locality-specific messages for better conversion
  const locality = extractLocalityFromPath(pathname)
  if (locality) {
    const localityName = locality
      .split(' ')
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ')

    const centerHint = Object.entries(centerCities).find(([key]) => pathname.includes(key))?.[1] || ''

    if (pathname.includes('neet-coaching')) {
      return `Hi! I'm from ${localityName}. ${centerHint}I want to join NEET Biology coaching. What batches and timings are available?`
    }

    if (pathname.includes('biology-tuition')) {
      return `Hi! I'm from ${localityName}. ${centerHint}I need Biology tuition for my child. Can you share batch details?`
    }

    return `Hi! I'm from ${localityName} area. ${centerHint}I'm interested in NEET Biology coaching. Please share details.`
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
