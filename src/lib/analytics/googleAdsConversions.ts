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
  if (typeof window === 'undefined' || !window.gtag) {
    return
  }

  const conversionLabel = GOOGLE_ADS_CONVERSIONS[conversionType]

  // Skip if no real label (backward compat no-ops)
  if (!conversionLabel) return

  const conversionData: Record<string, unknown> = {
    send_to: conversionLabel,
  }

  if (value !== undefined) {
    conversionData.value = value
    conversionData.currency = currency
  }

  if (transactionId) {
    conversionData.transaction_id = transactionId
  }

  ;window.gtag('event', 'conversion', conversionData)
}

/**
 * Track phone call conversion
 */
export function trackPhoneCallConversion(phoneNumber?: string) {
  trackGoogleAdsConversion('PHONE_CALL')

  // Also track as GA4 event
  if (typeof window !== 'undefined' && window.gtag) {
    ;window.gtag('event', 'generate_lead', {
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
  if (typeof window !== 'undefined' && window.gtag) {
    ;window.gtag('event', 'generate_lead', {
      currency: 'INR',
      value: 0,
      lead_type: 'whatsapp',
      source: source || 'unknown',
      contact_method: 'whatsapp',
    })
  }
}

/**
 * Track demo booking as GA4 generate_lead event (importable as Google Ads conversion)
 */
export function trackDemoBookingConversion(courseType?: string) {
  if (typeof window === 'undefined' || !window.gtag) return

  window.gtag('event', 'generate_lead', {
    currency: 'INR',
    value: 0,
    lead_type: 'demo_booking',
    source: courseType || 'website',
    contact_method: 'form',
  })

  window.gtag('event', 'demo_booking_complete', {
    event_category: 'conversion',
    event_label: courseType || 'general',
  })
}

/**
 * Track enrollment as GA4 purchase event (importable as Google Ads conversion)
 */
export function trackEnrollmentConversion(value: number, courseType?: string, transactionId?: string) {
  if (typeof window === 'undefined' || !window.gtag) return

  window.gtag('event', 'purchase', {
    currency: 'INR',
    value,
    transaction_id: transactionId,
    items: [{ item_name: courseType || 'NEET Biology Course' }],
  })
}

export function trackLeadFormConversion(formName?: string) {
  if (typeof window === 'undefined' || !window.gtag) return

  window.gtag('event', 'generate_lead', {
    currency: 'INR',
    value: 0,
    lead_type: 'lead_form',
    source: formName || 'unknown',
    contact_method: 'form',
  })
}
