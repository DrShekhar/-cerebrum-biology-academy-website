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
export const trackWhatsAppLead = (source: string, value: number = 500) => {
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
export const trackPhoneCall = (source: string, value: number = 500) => {
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
export const trackSignUpConversion = (source: string, value: number = 1000) => {
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

    if (pageType === 'course' || pageType === 'landing') {
      window.gtag('event', 'view_item', {
        send_to: GOOGLE_ADS_ID,
        items: [{
          item_category: pageType,
          item_name: document.title,
        }],
      })
    }
  }
}

/**
 * Track demo booking form submission
 * Fires signUp conversion since form leads ultimately convert via WhatsApp/call
 */
export const trackDemoBooking = (name?: string, courseType?: string, value: number = 0) => {
  trackSignUpConversion(`demo-booking-${courseType || 'general'}`, value)
}

/**
 * Track generic form submission
 */
export const trackFormSubmission = (source?: string, value: number = 0) => {
  trackSignUpConversion(source || 'form', value)
}

/**
 * Track enhanced conversion with hashed user data
 * Sends first-party user data to Google Ads for better attribution (20-40% improvement)
 * Google handles the SHA256 hashing when using the gtag API
 */
export const trackEnhancedConversion = (
  eventName: string,
  value: number = 0,
  email?: string,
  phone?: string,
  name?: string
) => {
  if (typeof window === 'undefined' || !window.gtag) {
    return false
  }

  const userData: Record<string, string> = {}
  if (email) userData.email = email.trim().toLowerCase()
  if (phone) {
    const cleaned = phone.replace(/[^\d]/g, '').slice(-10)
    userData.phone_number = `+91${cleaned}`
  }
  if (name) {
    const parts = name.trim().split(/\s+/)
    if (parts[0]) userData.first_name = parts[0]
    if (parts.length > 1) userData.last_name = parts.slice(1).join(' ')
  }

  if (Object.keys(userData).length === 0) return false

  window.gtag('set', 'user_data', userData)

  window.gtag('event', 'conversion', {
    send_to: `${GOOGLE_ADS_ID}/${CONVERSION_LABELS.signUp}`,
    value,
    currency: 'INR',
  })

  return true
}

export const trackCourseEnrollment = (..._args: unknown[]) => {}
export const trackCustomConversion = (..._args: unknown[]) => {}
