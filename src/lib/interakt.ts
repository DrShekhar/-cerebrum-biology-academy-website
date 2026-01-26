/**
 * Interakt WhatsApp API Service
 * Comprehensive WhatsApp messaging through Interakt platform
 *
 * API Documentation: https://www.interakt.shop/resource-center/how-to-send-whatsapp-templates-using-apis-webhooks/
 * Dashboard: https://app.interakt.ai
 */

import { logger } from './utils/logger'
import {
  AUTH_TEMPLATES,
  MARKETING_TEMPLATES,
  UTILITY_TEMPLATES,
  getTemplateByName,
  formatBodyValues,
} from './interakt-templates'

// ============================================
// CONFIGURATION
// ============================================

const INTERAKT_API_URL = 'https://api.interakt.ai/v1'
const INTERAKT_API_KEY = process.env.INTERAKT_API_KEY

if (!INTERAKT_API_KEY) {
  logger.warn('INTERAKT_API_KEY is not set. WhatsApp functionality will be limited.', {
    service: 'interakt',
    feature: 'whatsapp',
  })
}

// ============================================
// TYPES & INTERFACES
// ============================================

interface SendMessageParams {
  phone: string
  message?: string
  mediaUrl?: string
  mediaType?: 'image' | 'video' | 'document' | 'audio'
  caption?: string
  templateName?: string
  templateParams?: Record<string, string>
  headerValues?: string[]
  buttonValues?: Record<string, string>
  callbackData?: string
  campaignId?: string
}

interface SendTemplateParams {
  phone: string
  templateName: string
  bodyValues: string[]
  headerValues?: string[]
  buttonValues?: Record<string, string>
  callbackData?: string
}

interface InteraktResponse {
  success: boolean
  messageId?: string
  error?: string
  rawResponse?: any
}

interface TrackUserParams {
  phone: string
  userId?: string
  traits?: Record<string, any>
}

interface WebhookEvent {
  type: 'message' | 'status' | 'button_reply'
  data: any
}

// ============================================
// CORE API FUNCTIONS
// ============================================

/**
 * Format phone number to Interakt format
 */
function formatPhoneNumber(phone: string): { countryCode: string; phoneNumber: string } {
  // Remove all non-digit characters except +
  const cleaned = phone.replace(/[^\d+]/g, '')

  // Handle different formats
  if (cleaned.startsWith('+91')) {
    return { countryCode: '+91', phoneNumber: cleaned.slice(3) }
  } else if (cleaned.startsWith('91') && cleaned.length === 12) {
    return { countryCode: '+91', phoneNumber: cleaned.slice(2) }
  } else if (cleaned.startsWith('0')) {
    return { countryCode: '+91', phoneNumber: cleaned.slice(1) }
  } else if (cleaned.length === 10) {
    return { countryCode: '+91', phoneNumber: cleaned }
  }

  // Default to +91 for Indian numbers
  return { countryCode: '+91', phoneNumber: cleaned.slice(-10) }
}

/**
 * Make API request to Interakt
 */
async function makeInteraktRequest(
  endpoint: string,
  body: any,
  method: 'POST' | 'GET' = 'POST'
): Promise<any> {
  if (!INTERAKT_API_KEY) {
    throw new Error('Interakt API key not configured')
  }

  const response = await fetch(`${INTERAKT_API_URL}${endpoint}`, {
    method,
    headers: {
      Authorization: `Basic ${INTERAKT_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: method === 'POST' ? JSON.stringify(body) : undefined,
  })

  const data = await response.json()

  if (!response.ok) {
    logger.error('Interakt API error', {
      service: 'interakt',
      endpoint,
      statusCode: response.status,
      error: data,
    })
    throw new Error(data.message || data.detail || 'Interakt API request failed')
  }

  return data
}

// ============================================
// MESSAGE SENDING FUNCTIONS
// ============================================

/**
 * Send a WhatsApp message via Interakt (template or text)
 */
export async function sendWhatsAppMessage(params: SendMessageParams): Promise<InteraktResponse> {
  try {
    const {
      phone,
      message,
      mediaUrl,
      mediaType,
      caption,
      templateName,
      templateParams,
      headerValues,
      buttonValues,
      callbackData,
      campaignId,
    } = params

    const { countryCode, phoneNumber } = formatPhoneNumber(phone)

    const requestBody: any = {
      countryCode,
      phoneNumber,
      callbackData: callbackData || `msg_${Date.now()}`,
    }

    if (campaignId) {
      requestBody.campaignId = campaignId
    }

    // Template message
    if (templateName) {
      requestBody.type = 'Template'
      requestBody.template = {
        name: templateName,
        languageCode: 'en',
        bodyValues: templateParams ? Object.values(templateParams) : [],
      }

      if (headerValues && headerValues.length > 0) {
        requestBody.template.headerValues = headerValues
      }

      if (buttonValues && Object.keys(buttonValues).length > 0) {
        requestBody.template.buttonValues = buttonValues
      }
    }
    // Media message
    else if (mediaUrl) {
      requestBody.type =
        mediaType === 'image'
          ? 'Image'
          : mediaType === 'video'
            ? 'Video'
            : mediaType === 'document'
              ? 'Document'
              : mediaType === 'audio'
                ? 'Audio'
                : 'Image'
      requestBody.data = {
        mediaUrl,
        caption: caption || message || '',
      }
    }
    // Plain text message (only within 24hr session window)
    else {
      requestBody.type = 'Text'
      requestBody.data = {
        message: message || '',
      }
    }

    const data = await makeInteraktRequest('/public/message/', requestBody)

    logger.info('WhatsApp message sent via Interakt', {
      service: 'interakt',
      phone: phoneNumber,
      type: requestBody.type,
      templateName,
      messageId: data.id,
    })

    return {
      success: true,
      messageId: data.id,
      rawResponse: data,
    }
  } catch (error) {
    logger.error('Error sending WhatsApp message', {
      service: 'interakt',
      error,
      phone: params.phone,
    })
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

/**
 * Send a template message with typed parameters
 */
export async function sendTemplateMessage(params: SendTemplateParams): Promise<InteraktResponse> {
  const { phone, templateName, bodyValues, headerValues, buttonValues, callbackData } = params

  const { countryCode, phoneNumber } = formatPhoneNumber(phone)

  try {
    const requestBody: any = {
      countryCode,
      phoneNumber,
      type: 'Template',
      callbackData: callbackData || `tmpl_${Date.now()}`,
      template: {
        name: templateName,
        languageCode: 'en',
        bodyValues,
      },
    }

    if (headerValues && headerValues.length > 0) {
      requestBody.template.headerValues = headerValues
    }

    if (buttonValues && Object.keys(buttonValues).length > 0) {
      requestBody.template.buttonValues = buttonValues
    }

    const data = await makeInteraktRequest('/public/message/', requestBody)

    return {
      success: true,
      messageId: data.id,
      rawResponse: data,
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

// ============================================
// AUTHENTICATION MESSAGES
// ============================================

/**
 * Send OTP via WhatsApp
 */
export async function sendWhatsAppOTP(params: {
  phone: string
  otp: string
}): Promise<InteraktResponse> {
  return sendTemplateMessage({
    phone: params.phone,
    templateName: AUTH_TEMPLATES.OTP_VERIFICATION.name,
    bodyValues: [params.otp],
  })
}

/**
 * Send login OTP
 */
export async function sendLoginOTP(params: {
  phone: string
  name: string
  otp: string
}): Promise<InteraktResponse> {
  return sendTemplateMessage({
    phone: params.phone,
    templateName: AUTH_TEMPLATES.LOGIN_OTP.name,
    bodyValues: [params.name, params.otp],
  })
}

/**
 * Send password reset code
 */
export async function sendPasswordResetOTP(params: {
  phone: string
  name: string
  code: string
}): Promise<InteraktResponse> {
  return sendTemplateMessage({
    phone: params.phone,
    templateName: AUTH_TEMPLATES.PASSWORD_RESET.name,
    bodyValues: [params.name, params.code],
  })
}

// ============================================
// MARKETING MESSAGES
// ============================================

/**
 * Send welcome message to new user
 */
export async function sendWelcomeMessage(phone: string, name?: string): Promise<InteraktResponse> {
  return sendTemplateMessage({
    phone,
    templateName: MARKETING_TEMPLATES.WELCOME_MESSAGE.name,
    bodyValues: [name || 'there'],
  })
}

/**
 * Send course information
 */
export async function sendCourseInfo(phone: string): Promise<InteraktResponse> {
  return sendTemplateMessage({
    phone,
    templateName: MARKETING_TEMPLATES.COURSE_INFO.name,
    bodyValues: [],
  })
}

/**
 * Send special offer
 */
export async function sendSpecialOffer(params: {
  phone: string
  name: string
  offerDetails: string
  validityDate: string
  promoCode: string
  enrollLink: string
}): Promise<InteraktResponse> {
  return sendTemplateMessage({
    phone: params.phone,
    templateName: MARKETING_TEMPLATES.SPECIAL_OFFER.name,
    bodyValues: [
      params.name,
      params.offerDetails,
      params.validityDate,
      params.promoCode,
      params.enrollLink,
    ],
  })
}

/**
 * Send follow-up message to lead
 */
export async function sendFollowUpMessage(params: {
  phone: string
  name: string
  courseName: string
  counselorName: string
  bookingLink: string
}): Promise<InteraktResponse> {
  return sendTemplateMessage({
    phone: params.phone,
    templateName: MARKETING_TEMPLATES.FOLLOW_UP.name,
    bodyValues: [params.name, params.courseName, params.counselorName, params.bookingLink],
  })
}

// ============================================
// UTILITY MESSAGES
// ============================================

/**
 * Send demo class confirmation
 */
export async function sendDemoConfirmation(params: {
  phone: string
  name: string
  date: string
  time: string
}): Promise<InteraktResponse> {
  return sendTemplateMessage({
    phone: params.phone,
    templateName: UTILITY_TEMPLATES.DEMO_CONFIRMATION.name,
    bodyValues: [params.name, params.date, params.time],
  })
}

/**
 * Send demo class reminder
 */
export async function sendDemoReminder(params: {
  phone: string
  name: string
  timeRemaining: string
  zoomLink: string
  topic: string
  facultyName: string
}): Promise<InteraktResponse> {
  return sendTemplateMessage({
    phone: params.phone,
    templateName: UTILITY_TEMPLATES.DEMO_REMINDER.name,
    bodyValues: [
      params.name,
      params.timeRemaining,
      params.zoomLink,
      params.topic,
      params.facultyName,
    ],
  })
}

/**
 * Send enrollment confirmation
 */
export async function sendEnrollmentConfirmation(params: {
  phone: string
  name: string
  courseName: string
  batchName: string
  startDate: string
  loginEmail: string
  tempPassword: string
}): Promise<InteraktResponse> {
  return sendTemplateMessage({
    phone: params.phone,
    templateName: UTILITY_TEMPLATES.ENROLLMENT_CONFIRMATION.name,
    bodyValues: [
      params.name,
      params.courseName,
      params.batchName,
      params.startDate,
      params.loginEmail,
      params.tempPassword,
    ],
  })
}

/**
 * Send payment confirmation
 */
export async function sendPaymentConfirmation(params: {
  phone: string
  name: string
  amount: string
  transactionId: string
  date: string
  courseName: string
  receiptLink: string
}): Promise<InteraktResponse> {
  return sendTemplateMessage({
    phone: params.phone,
    templateName: UTILITY_TEMPLATES.PAYMENT_CONFIRMATION.name,
    bodyValues: [
      params.name,
      params.amount,
      params.transactionId,
      params.date,
      params.courseName,
      params.receiptLink,
    ],
  })
}

/**
 * Send payment reminder
 */
export async function sendPaymentReminder(params: {
  phone: string
  name: string
  amountDue: string
  dueDate: string
  courseName: string
  paymentLink: string
}): Promise<InteraktResponse> {
  return sendTemplateMessage({
    phone: params.phone,
    templateName: UTILITY_TEMPLATES.PAYMENT_REMINDER.name,
    bodyValues: [
      params.name,
      params.amountDue,
      params.dueDate,
      params.courseName,
      params.paymentLink,
    ],
  })
}

/**
 * Send class reminder
 */
export async function sendClassReminder(params: {
  phone: string
  name: string
  timeRemaining: string
  subject: string
  topic: string
  facultyName: string
  joinLink: string
}): Promise<InteraktResponse> {
  return sendTemplateMessage({
    phone: params.phone,
    templateName: UTILITY_TEMPLATES.CLASS_REMINDER.name,
    bodyValues: [
      params.name,
      params.timeRemaining,
      params.subject,
      params.topic,
      params.facultyName,
      params.joinLink,
    ],
  })
}

/**
 * Send test reminder
 */
export async function sendTestReminder(params: {
  phone: string
  name: string
  testName: string
  testDate: string
  testTime: string
  duration: string
  topics: string
  testLink: string
}): Promise<InteraktResponse> {
  return sendTemplateMessage({
    phone: params.phone,
    templateName: UTILITY_TEMPLATES.TEST_REMINDER.name,
    bodyValues: [
      params.name,
      params.testName,
      params.testDate,
      params.testTime,
      params.duration,
      params.topics,
      params.testLink,
    ],
  })
}

/**
 * Send test result notification
 */
export async function sendTestResult(params: {
  phone: string
  name: string
  testName: string
  score: string
  totalMarks: string
  percentage: string
  rank: string
  timeTaken: string
  strengths: string
  weaknesses: string
  analysisLink: string
}): Promise<InteraktResponse> {
  return sendTemplateMessage({
    phone: params.phone,
    templateName: UTILITY_TEMPLATES.TEST_RESULT.name,
    bodyValues: [
      params.name,
      params.testName,
      params.score,
      params.totalMarks,
      params.percentage,
      params.rank,
      params.timeTaken,
      params.strengths,
      params.weaknesses,
      params.analysisLink,
    ],
  })
}

/**
 * Notify counselor of new lead
 */
export async function notifyCounselorOfNewLead(params: {
  counselorPhone: string
  leadName: string
  leadPhone: string
  courseInterest: string
  initialMessage: string
  source: string
}): Promise<InteraktResponse> {
  const timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })

  return sendTemplateMessage({
    phone: params.counselorPhone,
    templateName: UTILITY_TEMPLATES.COUNSELOR_NOTIFICATION.name,
    bodyValues: [
      params.leadName,
      params.leadPhone,
      params.courseInterest,
      params.initialMessage.slice(0, 100),
      params.source,
      timestamp,
    ],
  })
}

// ============================================
// SEO CONTENT MACHINE MESSAGES
// ============================================

/**
 * Send SEO content for approval (uses template for 24hr rule)
 *
 * TEMPORARY WORKAROUND: Using 'new_lead_alert' template since
 * 'seo_content_approval' is not yet approved on Interakt Dashboard.
 *
 * Template mapping:
 * 1. lead_name → contentType
 * 2. lead_phone → title
 * 3. course_interest → preview
 * 4. initial_message → stats + instructions
 * 5. lead_source → "SEO Approval"
 * 6. timestamp → referenceId
 */
export async function sendSEOContentApproval(params: {
  phone: string
  contentType: string
  title: string
  preview: string
  wordCount?: number
  readTime?: number
  iterationCount?: number
  referenceId: string
}): Promise<InteraktResponse> {
  // Sanitize text for Interakt (no tabs, newlines, or multiple spaces)
  const sanitize = (text: string) =>
    text
      .replace(/[\t\n\r]/g, ' ')
      .replace(/\s{2,}/g, ' ')
      .trim()

  // Build stats string
  let stats = ''
  if (params.wordCount && params.wordCount > 0) {
    stats = `${params.wordCount} words | ${params.readTime || Math.ceil(params.wordCount / 200)} min read`
  }
  if (params.iterationCount && params.iterationCount > 0) {
    stats += ` | Rev ${params.iterationCount}`
  }

  // Instructions for approval (no newlines - Interakt limitation)
  const instructions = stats ? `${stats} - Reply YES/NO` : 'Reply YES to publish, NO to reject'

  // Use 'class_reminder' template (APPROVED) with 6 variables:
  // 1. student_name → content type label
  // 2. time_remaining → title
  // 3. subject → preview
  // 4. topic → instructions
  // 5. faculty_name → SEO Machine
  // 6. join_link → reference ID

  return sendTemplateMessage({
    phone: params.phone,
    templateName: UTILITY_TEMPLATES.CLASS_REMINDER.name, // 'class_reminder'
    bodyValues: [
      sanitize(`SEO ${params.contentType} Review`),
      sanitize(params.title.slice(0, 80)),
      sanitize(params.preview.slice(0, 150)),
      sanitize(instructions),
      'SEO Machine',
      sanitize(`Ref: ${params.referenceId.slice(0, 8)}`),
    ],
  })
}

/**
 * Send notification when SEO content is published
 */
export async function sendSEOPublishedNotification(params: {
  phone: string
  contentType: string
  title: string
  publishedUrl: string
}): Promise<InteraktResponse> {
  return sendTemplateMessage({
    phone: params.phone,
    templateName: UTILITY_TEMPLATES.SEO_CONTENT_PUBLISHED.name,
    bodyValues: [params.contentType, params.title.slice(0, 100), params.publishedUrl],
  })
}

/**
 * Send daily SEO summary
 */
export async function sendSEODailySummary(params: {
  phone: string
  pendingCount: number
  reviewCount: number
  publishedCount: number
  budgetUsed: string
  budgetRemaining: string
}): Promise<InteraktResponse> {
  return sendTemplateMessage({
    phone: params.phone,
    templateName: UTILITY_TEMPLATES.SEO_DAILY_SUMMARY.name,
    bodyValues: [
      String(params.pendingCount),
      String(params.reviewCount),
      String(params.publishedCount),
      params.budgetUsed,
      params.budgetRemaining,
    ],
  })
}

// ============================================
// USER TRACKING
// ============================================

/**
 * Track or update user in Interakt CRM
 */
export async function trackUser(params: TrackUserParams): Promise<InteraktResponse> {
  try {
    const { countryCode, phoneNumber } = formatPhoneNumber(params.phone)

    const requestBody: any = {
      phoneNumber,
      countryCode,
      userId: params.userId || `user_${phoneNumber}`,
    }

    if (params.traits) {
      requestBody.traits = params.traits
    }

    const data = await makeInteraktRequest('/public/track/users/', requestBody)

    return {
      success: true,
      rawResponse: data,
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

/**
 * Track an event for a user
 */
export async function trackEvent(params: {
  phone: string
  eventName: string
  eventData?: Record<string, any>
}): Promise<InteraktResponse> {
  try {
    const { countryCode, phoneNumber } = formatPhoneNumber(params.phone)

    const requestBody = {
      phoneNumber,
      countryCode,
      event: params.eventName,
      traits: params.eventData || {},
    }

    const data = await makeInteraktRequest('/public/track/events/', requestBody)

    return {
      success: true,
      rawResponse: data,
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Generate a 6-digit OTP
 */
export function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

/**
 * Verify if OTP is still valid (not expired)
 */
export function isOTPValid(expiresAt: Date): boolean {
  return new Date() < expiresAt
}

/**
 * Check if Interakt is configured and ready
 */
export function isInteraktConfigured(): boolean {
  return !!INTERAKT_API_KEY
}

/**
 * Get API health status
 */
export async function checkAPIHealth(): Promise<{
  status: 'healthy' | 'unhealthy' | 'not_configured'
  message: string
}> {
  if (!INTERAKT_API_KEY) {
    return { status: 'not_configured', message: 'API key not set' }
  }

  try {
    // Try to track a test user to verify API is working
    await makeInteraktRequest('/public/track/users/', {
      phoneNumber: '0000000000',
      countryCode: '+91',
      userId: 'health_check',
    })

    return { status: 'healthy', message: 'API is working' }
  } catch (error) {
    return {
      status: 'unhealthy',
      message: error instanceof Error ? error.message : 'API check failed',
    }
  }
}

// ============================================
// WEBHOOK HELPERS
// ============================================

/**
 * Parse Interakt webhook payload
 */
export function parseWebhookPayload(payload: any): WebhookEvent | null {
  try {
    // Interakt webhook format may vary - handle common structures
    if (payload.type === 'message_received' || payload.data?.message) {
      return {
        type: 'message',
        data: {
          from: payload.data?.from || payload.from,
          messageId: payload.data?.messageId || payload.messageId,
          text: payload.data?.text || payload.data?.message?.text,
          timestamp: payload.timestamp,
          messageType: payload.data?.type || 'text',
        },
      }
    }

    if (payload.type === 'message_status' || payload.status) {
      return {
        type: 'status',
        data: {
          messageId: payload.messageId || payload.data?.messageId,
          status: payload.status || payload.data?.status,
          timestamp: payload.timestamp,
        },
      }
    }

    if (payload.type === 'button_reply' || payload.data?.buttonReply) {
      return {
        type: 'button_reply',
        data: {
          from: payload.data?.from || payload.from,
          buttonId: payload.data?.buttonId || payload.data?.buttonReply?.id,
          buttonText: payload.data?.buttonText || payload.data?.buttonReply?.text,
          timestamp: payload.timestamp,
        },
      }
    }

    return null
  } catch (error) {
    logger.error('Error parsing webhook payload', {
      service: 'interakt',
      error,
      payload,
    })
    return null
  }
}

// ============================================
// EXPORTS
// ============================================

export {
  AUTH_TEMPLATES,
  MARKETING_TEMPLATES,
  UTILITY_TEMPLATES,
  getTemplateByName,
  formatBodyValues,
}
