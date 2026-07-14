/**
 * Admin Lead Notification Service
 * Sends WhatsApp notifications to owner/admin when new leads are created
 */

import { WhatsAppBusinessService } from '@/lib/integrations/whatsappBusinessService'
import { CONTACT_INFO } from '@/lib/constants/contactInfo'
import { logger } from '@/lib/utils/logger'
import { emailService } from '@/lib/email/emailService'

// Admin phone number for lead notifications (918826444334)
const ADMIN_WHATSAPP_NUMBER = process.env.ADMIN_NOTIFICATION_WHATSAPP || CONTACT_INFO.phone.primary

// Where ops/admin alerts land when WhatsApp is unconfigured. Defaults to the
// owner's working inbox so critical alerts (e.g. payment-captured-but-enrollment-
// failed) are never silently dropped.
const ADMIN_ALERT_EMAIL = process.env.ADMIN_LEAD_EMAIL || 'shekharcsingh57@gmail.com'

/**
 * Email fallback for admin alerts. Called when the WhatsApp channel is
 * unconfigured/failed so the alert still reaches a human. Best-effort — returns
 * true only if the email was actually sent (emailService no-ops without keys).
 */
async function sendAdminAlertEmail(subject: string, textBody: string): Promise<boolean> {
  try {
    const html = `<pre style="font-family:system-ui,-apple-system,sans-serif;white-space:pre-wrap;font-size:14px">${textBody
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')}</pre>`
    const res = await emailService.send({ to: ADMIN_ALERT_EMAIL, subject, html })
    return !!res?.success
  } catch (error) {
    logger.error('Admin alert email fallback failed', { error, subject })
    return false
  }
}

export interface LeadNotificationData {
  // Required fields
  name: string
  phone: string
  email?: string

  // Lead context
  type: 'demo_booking' | 'contact_inquiry' | 'course_interest' | 'callback_request'
  courseInterest?: string
  supportType?: string
  message?: string

  // Tracking info
  source?: string
  gclid?: string
  utmSource?: string
  utmMedium?: string
  utmCampaign?: string

  // System generated
  leadId?: string
  timestamp?: Date
}

/**
 * Format phone number for display
 */
function formatPhoneForDisplay(phone: string): string {
  // Remove any non-digit characters
  const digits = phone.replace(/\D/g, '')

  // If it's a 10-digit Indian number, format it
  if (digits.length === 10) {
    return `+91 ${digits.slice(0, 5)} ${digits.slice(5)}`
  }

  // If it already has country code
  if (digits.length === 12 && digits.startsWith('91')) {
    return `+91 ${digits.slice(2, 7)} ${digits.slice(7)}`
  }

  return phone
}

/**
 * Get source emoji based on lead source
 */
function getSourceEmoji(source?: string, gclid?: string): string {
  if (gclid || source === 'Google Ads') return '🔵' // Google Ads
  if (source?.toLowerCase().includes('facebook')) return '📘' // Facebook
  if (source?.toLowerCase().includes('instagram')) return '📷' // Instagram
  if (source?.toLowerCase().includes('referral')) return '🤝' // Referral
  return '🌐' // Website/Organic
}

/**
 * Get type emoji based on lead type
 */
function getTypeEmoji(type: LeadNotificationData['type']): string {
  switch (type) {
    case 'demo_booking':
      return '📅'
    case 'contact_inquiry':
      return '📩'
    case 'course_interest':
      return '📚'
    case 'callback_request':
      return '📞'
    default:
      return '🔔'
  }
}

/**
 * Get priority label based on lead attributes
 */
function getPriorityLabel(data: LeadNotificationData): string {
  // Google Ads leads are high priority (paid traffic)
  if (data.gclid || data.source === 'Google Ads') {
    return '🔥 HOT LEAD (Google Ads)'
  }

  // Demo bookings are high priority
  if (data.type === 'demo_booking') {
    return '⭐ HIGH PRIORITY (Demo Booked)'
  }

  // Admission inquiries are high priority
  if (data.supportType === 'admission') {
    return '⭐ HIGH PRIORITY (Admission)'
  }

  return ''
}

/**
 * Build the notification message
 */
function buildNotificationMessage(data: LeadNotificationData): string {
  const typeEmoji = getTypeEmoji(data.type)
  const sourceEmoji = getSourceEmoji(data.source, data.gclid)
  const priority = getPriorityLabel(data)
  const timestamp = data.timestamp || new Date()

  // Build the type label
  const typeLabels: Record<LeadNotificationData['type'], string> = {
    demo_booking: 'DEMO BOOKING',
    contact_inquiry: 'CONTACT INQUIRY',
    course_interest: 'COURSE INTEREST',
    callback_request: 'CALLBACK REQUEST',
  }

  let message = `${typeEmoji} NEW ${typeLabels[data.type]}!\n`
  message += `━━━━━━━━━━━━━━━━━━━━\n\n`

  // Priority banner if applicable
  if (priority) {
    message += `${priority}\n\n`
  }

  // Lead details
  message += `👤 *Name:* ${data.name}\n`
  message += `📱 *Phone:* ${formatPhoneForDisplay(data.phone)}\n`

  if (data.email) {
    message += `📧 *Email:* ${data.email}\n`
  }

  // Context based on type
  if (data.courseInterest) {
    message += `📚 *Course:* ${data.courseInterest}\n`
  }

  if (data.supportType) {
    message += `📋 *Type:* ${data.supportType.charAt(0).toUpperCase() + data.supportType.slice(1)}\n`
  }

  if (data.message) {
    const truncatedMessage =
      data.message.length > 100 ? data.message.slice(0, 100) + '...' : data.message
    message += `💬 *Message:* ${truncatedMessage}\n`
  }

  // Source tracking
  message += `\n${sourceEmoji} *Source:* ${data.source || 'Website'}\n`

  if (data.utmCampaign) {
    message += `📊 *Campaign:* ${data.utmCampaign}\n`
  }

  if (data.gclid) {
    message += `🎯 *GCLID:* ${data.gclid.slice(0, 20)}...\n`
  }

  // Timestamp
  message += `\n⏰ ${timestamp.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}`

  // Quick action link
  message += `\n\n📞 Call now: tel:${data.phone.replace(/\D/g, '')}`

  if (data.leadId) {
    message += `\n🔗 Lead ID: ${data.leadId}`
  }

  return message
}

/**
 * Send WhatsApp notification to admin for new lead
 */
export async function sendAdminLeadNotification(data: LeadNotificationData): Promise<boolean> {
  try {
    const message = buildNotificationMessage(data)
    const adminNumber = ADMIN_WHATSAPP_NUMBER.replace(/[^\d]/g, '')

    // Ensure the admin number has country code
    const formattedAdminNumber = adminNumber.startsWith('91') ? adminNumber : `91${adminNumber}`

    logger.info('Sending admin lead notification', {
      leadName: data.name,
      leadType: data.type,
      source: data.source,
      adminNumber: formattedAdminNumber.slice(0, 5) + '***',
    })

    // Use WhatsApp Business API to send the message. Unconfigured creds
    // return {skipped:true} — that is not a send; report it honestly.
    const sendResult = await WhatsAppBusinessService.sendTextMessage(formattedAdminNumber, message)
    if (sendResult?.skipped) {
      logger.warn('Admin lead notification skipped — WhatsApp not configured', {
        leadId: data.leadId,
      })
      return false
    }

    logger.businessEvent('admin_lead_notification_sent', {
      leadId: data.leadId,
      leadName: data.name,
      leadType: data.type,
      source: data.source,
      hasGclid: !!data.gclid,
    })

    return true
  } catch (error) {
    logger.error('Failed to send admin lead notification', {
      error,
      leadName: data.name,
      leadType: data.type,
    })

    // Don't throw - notification failure shouldn't break the main flow
    return false
  }
}

/**
 * Send notification for demo booking
 */
export async function notifyAdminDemoBooking(data: {
  studentName: string
  email: string
  phone: string
  courseInterest: string
  preferredDate: Date
  preferredTime: string
  source?: string
  gclid?: string
  utmSource?: string
  utmMedium?: string
  utmCampaign?: string
  leadId?: string
}): Promise<boolean> {
  return sendAdminLeadNotification({
    name: data.studentName,
    email: data.email,
    phone: data.phone,
    type: 'demo_booking',
    courseInterest: data.courseInterest,
    message: `Demo scheduled for ${data.preferredDate.toLocaleDateString()} at ${data.preferredTime}`,
    source: data.source,
    gclid: data.gclid,
    utmSource: data.utmSource,
    utmMedium: data.utmMedium,
    utmCampaign: data.utmCampaign,
    leadId: data.leadId,
    timestamp: new Date(),
  })
}

/**
 * Send notification for contact inquiry
 */
export async function notifyAdminContactInquiry(data: {
  name: string
  email?: string
  phone: string
  supportType: string
  message: string
  source?: string
  gclid?: string
  utmSource?: string
  utmMedium?: string
  utmCampaign?: string
  inquiryId?: string
}): Promise<boolean> {
  return sendAdminLeadNotification({
    name: data.name,
    email: data.email,
    phone: data.phone,
    type: 'contact_inquiry',
    supportType: data.supportType,
    message: data.message,
    source: data.source,
    gclid: data.gclid,
    utmSource: data.utmSource,
    utmMedium: data.utmMedium,
    utmCampaign: data.utmCampaign,
    leadId: data.inquiryId,
    timestamp: new Date(),
  })
}

/**
 * Generic form submission notification to admin WhatsApp
 * Use this for any form that doesn't have a dedicated notifier above
 */
export async function notifyAdminFormSubmission(
  formName: string,
  data: Record<string, string | number | boolean | null | undefined>
): Promise<boolean> {
  try {
    const adminNumber = ADMIN_WHATSAPP_NUMBER.replace(/[^\d]/g, '')
    const formattedAdminNumber = adminNumber.startsWith('91') ? adminNumber : `91${adminNumber}`

    const timestamp = new Date()
    let message = `📋 NEW FORM SUBMISSION\n`
    message += `━━━━━━━━━━━━━━━━━━━━\n\n`
    message += `📝 *Form:* ${formName}\n\n`

    for (const [key, value] of Object.entries(data)) {
      if (value === null || value === undefined || value === '') continue
      const label = key
        .replace(/([A-Z])/g, ' $1')
        .replace(/^./, (s) => s.toUpperCase())
        .trim()
      const displayValue =
        String(value).length > 150 ? String(value).slice(0, 150) + '...' : String(value)
      message += `*${label}:* ${displayValue}\n`
    }

    message += `\n⏰ ${timestamp.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}`

    const formSendResult = await WhatsAppBusinessService.sendTextMessage(
      formattedAdminNumber,
      message
    ).catch(() => ({ skipped: true }) as { skipped?: boolean })
    if (formSendResult?.skipped) {
      // WhatsApp unavailable — fall back to email so the alert still reaches a
      // human (critical for e.g. the payment-reconcile alert).
      const emailed = await sendAdminAlertEmail(`[Cerebrum] ${formName}`, message)
      if (!emailed) {
        logger.warn('Admin form notification dropped — no channel configured (WhatsApp+email)', {
          formName,
        })
      }
      return emailed
    }

    logger.businessEvent('admin_form_notification_sent', { formName })
    return true
  } catch (error) {
    logger.error('Failed to send admin form notification', { error, formName })
    return false
  }
}

export default {
  sendAdminLeadNotification,
  notifyAdminDemoBooking,
  notifyAdminContactInquiry,
  notifyAdminFormSubmission,
}
