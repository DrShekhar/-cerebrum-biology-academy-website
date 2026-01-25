/**
 * Google Ads Conversion Tracking Configuration
 *
 * IMPORTANT: Replace placeholder labels with actual conversion labels from Google Ads dashboard
 * Go to: Google Ads > Tools > Conversions > [Your Conversion] > Tag setup > Use Google Tag Manager
 *
 * Format: 'AW-CONVERSION_ID/CONVERSION_LABEL'
 */

const GOOGLE_ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID || 'AW-11121440988'

export const GOOGLE_ADS_CONVERSIONS = {
  // Lead conversions
  DEMO_BOOKING: `${GOOGLE_ADS_ID}/demo_booking`,
  LEAD_FORM: `${GOOGLE_ADS_ID}/lead_form`,
  ENROLLMENT_START: `${GOOGLE_ADS_ID}/enrollment_start`,

  // Contact conversions
  PHONE_CALL: `${GOOGLE_ADS_ID}/phone_call`,
  WHATSAPP_CLICK: `${GOOGLE_ADS_ID}/whatsapp_click`,

  // Purchase/Enrollment conversions
  ENROLLMENT_COMPLETE: `${GOOGLE_ADS_ID}/enrollment_complete`,
  PAYMENT_SUCCESS: `${GOOGLE_ADS_ID}/payment_success`,

  // Engagement conversions
  COUNSELING_BOOKED: `${GOOGLE_ADS_ID}/counseling_booked`,
  DOWNLOAD_RESOURCE: `${GOOGLE_ADS_ID}/download_resource`,
  VIDEO_WATCHED: `${GOOGLE_ADS_ID}/video_watched`,

  // Thank you page
  THANK_YOU_PAGE: `${GOOGLE_ADS_ID}/thank_you`,
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
    console.warn('Google Ads tracking not available')
    return
  }

  const conversionLabel = GOOGLE_ADS_CONVERSIONS[conversionType]

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

  // Also log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log('Google Ads Conversion:', conversionType, conversionData)
  }
}

/**
 * Track phone call conversion
 */
export function trackPhoneCallConversion(phoneNumber?: string) {
  trackGoogleAdsConversion('PHONE_CALL')

  // Also track as GA4 event
  if (typeof window !== 'undefined' && (window as any).gtag) {
    ;(window as any).gtag('event', 'phone_call_click', {
      event_category: 'contact',
      event_label: phoneNumber || 'header',
      value: 1,
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
    ;(window as any).gtag('event', 'whatsapp_click', {
      event_category: 'contact',
      event_label: source || 'unknown',
      value: 1,
    })
  }
}

/**
 * Track demo booking conversion
 */
export function trackDemoBookingConversion(courseType?: string) {
  trackGoogleAdsConversion('DEMO_BOOKING', 0, 'INR')

  // Also track as GA4 event
  if (typeof window !== 'undefined' && (window as any).gtag) {
    ;(window as any).gtag('event', 'demo_booking', {
      event_category: 'lead',
      event_label: courseType || 'general',
      value: 1,
    })
  }
}

/**
 * Track enrollment conversion with value
 */
export function trackEnrollmentConversion(
  value: number,
  courseType?: string,
  transactionId?: string
) {
  trackGoogleAdsConversion('ENROLLMENT_COMPLETE', value, 'INR', transactionId)

  // Also track as GA4 event
  if (typeof window !== 'undefined' && (window as any).gtag) {
    ;(window as any).gtag('event', 'purchase', {
      transaction_id: transactionId,
      value: value,
      currency: 'INR',
      items: [
        {
          item_name: courseType || 'NEET Biology Course',
          price: value,
          quantity: 1,
        },
      ],
    })
  }
}

/**
 * Track lead form submission
 */
export function trackLeadFormConversion(formName?: string) {
  trackGoogleAdsConversion('LEAD_FORM')

  // Also track as GA4 event
  if (typeof window !== 'undefined' && (window as any).gtag) {
    ;(window as any).gtag('event', 'generate_lead', {
      event_category: 'lead',
      event_label: formName || 'contact_form',
      value: 1,
    })
  }
}
