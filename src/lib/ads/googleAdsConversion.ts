// Google Ads Conversion Tracking for Cerebrum Biology Academy
// Tracking ID: AW-11121440988

export const GOOGLE_ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID || 'AW-11121440988'

// Helper function to send conversion events to Google Ads
const gtagReportConversion = (
  conversionLabel: string,
  value?: number,
  currency: string = 'INR',
  transactionId?: string
) => {
  if (typeof window === 'undefined' || !window.gtag) {
    console.warn('Google Ads gtag not loaded')
    return false
  }

  const conversionConfig: any = {
    send_to: `${GOOGLE_ADS_ID}/${conversionLabel}`,
    value: value || 0,
    currency: currency,
  }

  if (transactionId) {
    conversionConfig.transaction_id = transactionId
  }

  window.gtag('event', 'conversion', conversionConfig)
  return true
}

/**
 * Track course enrollment conversion
 * Call this when a student successfully enrolls in a course
 */
export const trackCourseEnrollment = (
  courseId: string,
  courseName: string,
  value: number,
  transactionId?: string
) => {
  // Replace 'XXXXXXXXX' with your actual conversion label from Google Ads
  // You'll get this label when you set up a conversion action in Google Ads
  const conversionLabel = 'COURSE_ENROLLMENT_LABEL' // TODO: Replace with actual label

  gtagReportConversion(conversionLabel, value, 'INR', transactionId)

  // Also track as enhanced conversion for better attribution
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'purchase', {
      transaction_id: transactionId || `enrollment_${Date.now()}`,
      value: value,
      currency: 'INR',
      items: [
        {
          item_id: courseId,
          item_name: courseName,
          item_category: 'NEET Biology Course',
          price: value,
          quantity: 1,
        },
      ],
    })
  }
}

/**
 * Track demo booking conversion
 * Call this when a student books a free demo class
 */
export const trackDemoBooking = (
  studentName: string,
  courseInterest: string,
  value: number = 0
) => {
  const conversionLabel = 'DEMO_BOOKING_LABEL' // TODO: Replace with actual label

  gtagReportConversion(conversionLabel, value, 'INR')

  // Track as lead generation
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'generate_lead', {
      currency: 'INR',
      value: value,
      lead_type: 'demo_booking',
      course_interest: courseInterest,
    })
  }
}

/**
 * Track WhatsApp lead conversion
 * Call this when a user clicks WhatsApp CTA
 */
export const trackWhatsAppLead = (source: string, value: number = 0) => {
  const conversionLabel = 'WHATSAPP_LEAD_LABEL' // TODO: Replace with actual label

  gtagReportConversion(conversionLabel, value, 'INR')

  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'generate_lead', {
      currency: 'INR',
      value: value,
      lead_type: 'whatsapp',
      source: source,
      contact_method: 'whatsapp',
    })
  }
}

/**
 * Track form submission conversion
 * Call this when a contact form is submitted
 */
export const trackFormSubmission = (formType: string, value: number = 0) => {
  const conversionLabel = 'FORM_SUBMISSION_LABEL' // TODO: Replace with actual label

  gtagReportConversion(conversionLabel, value, 'INR')

  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'generate_lead', {
      currency: 'INR',
      value: value,
      lead_type: 'form_submission',
      form_type: formType,
    })
  }
}

/**
 * Track phone call conversion
 * Call this when a user clicks phone number CTA
 */
export const trackPhoneCall = (source: string, value: number = 0) => {
  const conversionLabel = 'PHONE_CALL_LABEL' // TODO: Replace with actual label

  gtagReportConversion(conversionLabel, value, 'INR')

  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'generate_lead', {
      currency: 'INR',
      value: value,
      lead_type: 'phone_call',
      source: source,
      contact_method: 'phone',
    })
  }
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

/**
 * Track custom conversion
 * Use this for any other conversion actions
 */
export const trackCustomConversion = (
  conversionLabel: string,
  value?: number,
  metadata?: Record<string, any>
) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'conversion', {
      send_to: `${GOOGLE_ADS_ID}/${conversionLabel}`,
      value: value || 0,
      currency: 'INR',
      ...metadata,
    })
  }
}

/**
 * Enhanced conversions with user data (for better attribution)
 * Call this when you have user email/phone for better conversion matching
 */
export const trackEnhancedConversion = (
  conversionLabel: string,
  value: number,
  userEmail?: string,
  userPhone?: string
) => {
  if (typeof window !== 'undefined' && window.gtag) {
    const enhancedData: any = {}

    if (userEmail) {
      enhancedData.email = userEmail
    }

    if (userPhone) {
      enhancedData.phone_number = userPhone
    }

    window.gtag('event', 'conversion', {
      send_to: `${GOOGLE_ADS_ID}/${conversionLabel}`,
      value: value,
      currency: 'INR',
      ...enhancedData,
    })
  }
}
