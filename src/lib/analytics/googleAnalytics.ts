// Google Analytics 4 configuration for Cerebrum Biology Academy
// Types are declared in src/types/globals.d.ts

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-XXXXXXXXXX'

// Initialize Google Analytics
export const gtag = (...args: any[]) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag(...args)
  }
}

// Revenue tracking events for biology academy
export const trackEvent = (action: string, parameters?: any) => {
  gtag('event', action, parameters)
}

// Course enrollment tracking
export const trackEnrollment = (courseId: string, courseName: string, value: number) => {
  gtag('event', 'purchase', {
    transaction_id: `enrollment_${Date.now()}`,
    value: value,
    currency: 'INR',
    items: [
      {
        item_id: courseId,
        item_name: courseName,
        category: 'NEET Biology Course',
        quantity: 1,
        price: value,
      },
    ],
  })
}

// Demo booking tracking
export const trackDemoBooking = (studentName: string, courseInterest: string) => {
  gtag('event', 'generate_lead', {
    currency: 'INR',
    value: 2000, // Average demo to enrollment conversion value
    lead_type: 'demo_booking',
    course_interest: courseInterest,
    student_name: studentName,
  })
}

// WhatsApp lead tracking
export const trackWhatsAppLead = (phone: string, source: string) => {
  gtag('event', 'generate_lead', {
    currency: 'INR',
    value: 1500, // Average WhatsApp lead value
    lead_type: 'whatsapp',
    source: source,
    contact_method: 'whatsapp',
  })
}

// Student login tracking
export const trackStudentLogin = (studentId: string) => {
  gtag('event', 'login', {
    method: 'student_portal',
    student_id: studentId,
  })
}

// NEET score prediction tracking
export const trackScorePrediction = (predictedScore: number, actualAttempts: number) => {
  gtag('event', 'score_prediction', {
    predicted_score: predictedScore,
    total_attempts: actualAttempts,
    course_type: 'NEET Biology',
  })
}

// Study session tracking
export const trackStudySession = (duration: number, topicsCovered: number) => {
  gtag('event', 'study_session', {
    session_duration: duration,
    topics_covered: topicsCovered,
    engagement_type: 'study',
  })
}

// Page view tracking with custom parameters
export const trackPageView = (url: string, title: string) => {
  gtag('config', GA_MEASUREMENT_ID, {
    page_title: title,
    page_location: url,
    custom_map: {
      dimension1: 'user_type',
      dimension2: 'course_interest',
    },
  })
}

// Enhanced conversion tracking for revenue optimization
export const trackConversion = (goalId: string, value?: number, metadata?: Record<string, any>) => {
  gtag('event', 'conversion', {
    send_to: `${GA_MEASUREMENT_ID}/${goalId}`,
    value: value || 0,
    currency: 'INR',
    ...metadata,
  })
}
