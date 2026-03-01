// Google Ads Conversion Tracking for Cerebrum Biology Academy
// Tracking ID: AW-11121440988
// Only tracking: WhatsApp Lead + Phone Call Click

export const GOOGLE_ADS_ID = 'AW-11121440988'

// Hardcoded conversion labels from Google Ads
const CONVERSION_LABELS = {
  whatsAppLead: 'spP_CIuY5_wbENzxjrcp',
  phoneCall: 'lsthCI6Y5_wbENzxjrcp',
  signUp: 'MIYpCOHGy4AcENzxjrcp',
}

/**
 * Track WhatsApp lead conversion
 * Call this when a user clicks WhatsApp CTA
 */
export const trackWhatsAppLead = (source: string, value: number = 0) => {
  if (typeof window === 'undefined' || !window.gtag) {
    return false
  }

  window.gtag('event', 'conversion', {
    send_to: `${GOOGLE_ADS_ID}/${CONVERSION_LABELS.whatsAppLead}`,
    value: value,
    currency: 'INR',
  })

  // Also track as GA4 lead event
  window.gtag('event', 'generate_lead', {
    currency: 'INR',
    value: value,
    lead_type: 'whatsapp',
    source: source,
    contact_method: 'whatsapp',
  })

  return true
}

/**
 * Track phone call conversion
 * Call this when a user clicks phone number CTA
 */
export const trackPhoneCall = (source: string, value: number = 0) => {
  if (typeof window === 'undefined' || !window.gtag) {
    return false
  }

  window.gtag('event', 'conversion', {
    send_to: `${GOOGLE_ADS_ID}/${CONVERSION_LABELS.phoneCall}`,
    value: value,
    currency: 'INR',
  })

  // Also track as GA4 lead event
  window.gtag('event', 'generate_lead', {
    currency: 'INR',
    value: value,
    lead_type: 'phone_call',
    source: source,
    contact_method: 'phone',
  })

  return true
}

/**
 * Track sign-up / form submission conversion
 * Fire this on the thank-you page after a user submits a form
 */
export const trackSignUpConversion = (source: string, value: number = 0) => {
  if (typeof window === 'undefined' || !window.gtag) {
    return false
  }

  window.gtag('event', 'conversion', {
    send_to: `${GOOGLE_ADS_ID}/${CONVERSION_LABELS.signUp}`,
    value: value,
    currency: 'INR',
  })

  window.gtag('event', 'generate_lead', {
    currency: 'INR',
    value: value,
    lead_type: 'sign_up',
    source: source,
    contact_method: 'form',
  })

  return true
}

/**
 * Track page view (for remarketing)
 * Call this on key landing pages
 */
export const trackPageView = (pageType: string, pagePath: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'page_view', {
      page_path: pagePath,
      page_type: pageType,
      send_to: GOOGLE_ADS_ID,
    })
  }
}

// Keep these exports for backward compatibility (they are no-ops now)
export const trackCourseEnrollment = () => {}
export const trackDemoBooking = () => {}
export const trackFormSubmission = () => {}
export const trackCustomConversion = () => {}
export const trackEnhancedConversion = () => {}
