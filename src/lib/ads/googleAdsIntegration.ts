// Google Ads conversion tracking for Cerebrum Biology Academy
declare global {
  interface Window {
    gtag: (...args: any[]) => void
    google_trackConversion?: (config: any) => void
  }
}

// Google Ads Account Configuration
export const GOOGLE_ADS_CONFIG = {
  CONVERSION_ID: process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_ID || 'AW-XXXXXXXXX',
  ENROLLMENT_LABEL: 'enrollment',
  DEMO_LABEL: 'demo_booking',
  WHATSAPP_LABEL: 'whatsapp_lead',
  CONTACT_LABEL: 'contact_form',
}

// Track Google Ads conversions with enhanced data
export const trackAdsConversion = (
  label: string,
  value?: number,
  metadata?: Record<string, any>
) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'conversion', {
      send_to: `${GOOGLE_ADS_CONFIG.CONVERSION_ID}/${label}`,
      value: value || 0,
      currency: 'INR',
      transaction_id: `conv_${Date.now()}`,
      ...metadata,
    })
  }
}

// Specific conversion tracking functions for different actions
export const trackEnrollmentConversion = (courseId: string, amount: number, studentData: any) => {
  trackAdsConversion(GOOGLE_ADS_CONFIG.ENROLLMENT_LABEL, amount, {
    course_id: courseId,
    student_name: studentData.name,
    installment_plan: studentData.installmentPlan,
    phone: studentData.phone,
    custom_parameter_1: 'enrollment',
  })
}

export const trackDemoConversion = (studentName: string, courseInterest: string, phone: string) => {
  trackAdsConversion(GOOGLE_ADS_CONFIG.DEMO_LABEL, 2000, {
    student_name: studentName,
    course_interest: courseInterest,
    phone: phone,
    custom_parameter_1: 'demo_booking',
  })
}

export const trackWhatsAppConversion = (source: string, phone: string) => {
  trackAdsConversion(GOOGLE_ADS_CONFIG.WHATSAPP_LABEL, 1500, {
    source: source,
    phone: phone,
    custom_parameter_1: 'whatsapp_lead',
  })
}

export const trackContactConversion = (formData: any) => {
  trackAdsConversion(GOOGLE_ADS_CONFIG.CONTACT_LABEL, 1000, {
    name: formData.name,
    email: formData.email,
    phone: formData.phone,
    subject: formData.subject,
    custom_parameter_1: 'contact_form',
  })
}

// Enhanced remarketing with customer data
export const setupRemarketingData = (
  userType: 'student' | 'parent' | 'visitor',
  userData?: any
) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GOOGLE_ADS_CONFIG.CONVERSION_ID, {
      custom_map: {
        custom_parameter_1: 'user_type',
        custom_parameter_2: 'course_interest',
        custom_parameter_3: 'location',
      },
    })

    // Set remarketing parameters
    window.gtag('event', 'page_view', {
      custom_parameter_1: userType,
      custom_parameter_2: userData?.courseInterest || 'neet_biology',
      custom_parameter_3: userData?.location || 'india',
      value: userType === 'student' ? 75000 : userType === 'parent' ? 50000 : 1000,
    })
  }
}

// Dynamic remarketing for course pages
export const trackCoursePageView = (courseId: string, courseName: string, price: number) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'view_item', {
      currency: 'INR',
      value: price,
      items: [
        {
          item_id: courseId,
          item_name: courseName,
          category: 'NEET Biology Course',
          quantity: 1,
          price: price,
        },
      ],
    })
  }
}

// Track form interactions for optimization
export const trackFormInteraction = (formType: string, step: string, fieldName?: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'form_interaction', {
      form_type: formType,
      interaction_step: step,
      field_name: fieldName || '',
      custom_parameter_1: 'form_engagement',
    })
  }
}

// Track video engagement for YouTube ads optimization
export const trackVideoEngagement = (
  videoId: string,
  engagement: 'start' | 'quarter' | 'half' | 'complete'
) => {
  if (typeof window !== 'undefined' && window.gtag) {
    const valueMap = {
      start: 100,
      quarter: 250,
      half: 500,
      complete: 1000,
    }

    window.gtag('event', 'video_engagement', {
      video_id: videoId,
      engagement_level: engagement,
      value: valueMap[engagement],
      currency: 'INR',
      custom_parameter_1: 'video_engagement',
    })
  }
}

// Initialize Google Ads tracking
export const initializeGoogleAds = () => {
  if (typeof window !== 'undefined') {
    // Load Google Ads script
    const script = document.createElement('script')
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_CONFIG.CONVERSION_ID}`
    script.async = true
    document.head.appendChild(script)

    // Initialize gtag
    window.dataLayer = window.dataLayer || []
    function gtag(...args: any[]) {
      window.dataLayer.push(args)
    }
    window.gtag = gtag

    gtag('js', new Date())
    gtag('config', GOOGLE_ADS_CONFIG.CONVERSION_ID, {
      send_page_view: false, // We'll handle page views manually
    })
  }
}
