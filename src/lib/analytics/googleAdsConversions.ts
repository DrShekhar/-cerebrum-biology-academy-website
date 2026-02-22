/**
 * Google Ads Conversion Tracking for Cerebrum Biology Academy
 * Tracking ID: AW-11121440988
 * Only tracking: WhatsApp Lead + Phone Call Click
 *
 * Real conversion labels from Google Ads dashboard (created Feb 2026)
 */

const GOOGLE_ADS_ID = 'AW-11121440988'

// Real conversion labels from Google Ads
const CONVERSION_LABELS = {
  whatsAppLead: 'spP_CIuY5_wbENzxjrcp',
  phoneCall: 'lsthCI6Y5_wbENzxjrcp',
}

// Keep the old GOOGLE_ADS_CONVERSIONS export for any direct references
export const GOOGLE_ADS_CONVERSIONS = {
  PHONE_CALL: `${GOOGLE_ADS_ID}/${CONVERSION_LABELS.phoneCall}`,
  WHATSAPP_CLICK: `${GOOGLE_ADS_ID}/${CONVERSION_LABELS.whatsAppLead}`,
  // Backward compatibility — these are no-ops (no real labels)
  DEMO_BOOKING: '',
  LEAD_FORM: '',
  ENROLLMENT_START: '',
  ENROLLMENT_COMPLETE: '',
  PAYMENT_SUCCESS: '',
  COUNSELING_BOOKED: '',
  DOWNLOAD_RESOURCE: '',
  VIDEO_WATCHED: '',
  THANK_YOU_PAGE: '',
} as const

export type ConversionType = keyof typeof GOOGLE_ADS_CONVERSIONS

/**
 * Track a Google Ads conversion event
 */
export function trackGoogleAdsConversion(
  conversionType: ConversionType,
  value?: number,
  currency: string = 'INR',
  transactionId?: string
) {
  if (typeof window === 'undefined' || !(window as any).gtag) {
    return
  }

  const conversionLabel = GOOGLE_ADS_CONVERSIONS[conversionType]

  // Skip if no real label (backward compat no-ops)
  if (!conversionLabel) return

  const conversionData: Record<string, any> = {
    send_to: conversionLabel,
  }

  if (value !== undefined) {
    conversionData.value = value
    conversionData.currency = currency
  }

  if (transactionId) {
    conversionData.transaction_id = transactionId
  }

  ;(window as any).gtag('event', 'conversion', conversionData)
}

/**
 * Track phone call conversion
 */
export function trackPhoneCallConversion(phoneNumber?: string) {
  trackGoogleAdsConversion('PHONE_CALL')

  // Also track as GA4 event
  if (typeof window !== 'undefined' && (window as any).gtag) {
    ;(window as any).gtag('event', 'generate_lead', {
      currency: 'INR',
      value: 0,
      lead_type: 'phone_call',
      source: phoneNumber || 'header',
      contact_method: 'phone',
    })
  }
}

/**
 * Track WhatsApp click conversion
 */
export function trackWhatsAppConversion(source?: string) {
  trackGoogleAdsConversion('WHATSAPP_CLICK')

  // Also track as GA4 event
  if (typeof window !== 'undefined' && (window as any).gtag) {
    ;(window as any).gtag('event', 'generate_lead', {
      currency: 'INR',
      value: 0,
      lead_type: 'whatsapp',
      source: source || 'unknown',
      contact_method: 'whatsapp',
    })
  }
}

// Backward compatibility no-ops — only WhatsApp and Phone Call are tracked
export function trackDemoBookingConversion(_courseType?: string) {}
export function trackEnrollmentConversion(_value: number, _courseType?: string, _transactionId?: string) {}
export function trackLeadFormConversion(_formName?: string) {}
