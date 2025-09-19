/**
 * Google Tag Manager Service
 * Handles GTM initialization and event tracking
 */

declare global {
  interface Window {
    dataLayer: any[]
    gtag: (...args: any[]) => void
  }
}

export class GTMService {
  private static isInitialized = false

  static initialize(gtmId: string) {
    if (typeof window === 'undefined' || this.isInitialized) return

    // Initialize dataLayer
    window.dataLayer = window.dataLayer || []

    // GTM script injection
    const script = document.createElement('script')
    script.async = true
    script.src = `https://www.googletagmanager.com/gtm.js?id=${gtmId}`
    document.head.appendChild(script)

    // Initialize GTM
    window.dataLayer.push({
      'gtm.start': new Date().getTime(),
      event: 'gtm.js',
    })

    this.isInitialized = true
    console.log('GTM initialized with ID:', gtmId)
  }

  static trackEvent(eventName: string, parameters: Record<string, any> = {}) {
    if (typeof window === 'undefined' || !window.dataLayer) return

    window.dataLayer.push({
      event: eventName,
      ...parameters,
      timestamp: new Date().toISOString(),
    })

    console.log('GTM Event:', eventName, parameters)
  }

  static trackPageView(pagePath: string, pageTitle?: string) {
    this.trackEvent('page_view', {
      page_path: pagePath,
      page_title: pageTitle || document.title,
    })
  }

  static trackPurchase(transactionData: {
    transactionId: string
    value: number
    currency?: string
    items?: any[]
  }) {
    this.trackEvent('purchase', {
      transaction_id: transactionData.transactionId,
      value: transactionData.value,
      currency: transactionData.currency || 'INR',
      items: transactionData.items || [],
    })
  }

  static trackLead(leadData: { email?: string; phone?: string; source?: string; value?: number }) {
    this.trackEvent('generate_lead', {
      email: leadData.email,
      phone: leadData.phone,
      source: leadData.source,
      value: leadData.value || 0,
      currency: 'INR',
    })
  }

  static trackFormSubmission(formData: {
    formName: string
    formLocation: string
    success: boolean
    errorMessage?: string
  }) {
    this.trackEvent('form_submit', {
      form_name: formData.formName,
      form_location: formData.formLocation,
      success: formData.success,
      error_message: formData.errorMessage,
    })
  }

  static trackVideoPlay(videoData: {
    videoTitle: string
    videoDuration?: number
    videoPosition?: number
  }) {
    this.trackEvent('video_play', {
      video_title: videoData.videoTitle,
      video_duration: videoData.videoDuration,
      video_position: videoData.videoPosition || 0,
    })
  }

  static trackSearch(searchData: {
    searchTerm: string
    searchResults?: number
    searchLocation?: string
  }) {
    this.trackEvent('search', {
      search_term: searchData.searchTerm,
      search_results: searchData.searchResults,
      search_location: searchData.searchLocation,
    })
  }

  static trackEngagement(engagementData: {
    engagementType: string
    engagementValue?: string | number
    contentType?: string
  }) {
    this.trackEvent('engagement', {
      engagement_type: engagementData.engagementType,
      engagement_value: engagementData.engagementValue,
      content_type: engagementData.contentType,
    })
  }

  static trackException(errorData: {
    description: string
    fatal?: boolean
    fileName?: string
    lineNumber?: number
  }) {
    this.trackEvent('exception', {
      description: errorData.description,
      fatal: errorData.fatal || false,
      file_name: errorData.fileName,
      line_number: errorData.lineNumber,
    })
  }

  static setUserProperties(userProperties: {
    userId?: string
    userType?: 'student' | 'parent' | 'teacher' | 'visitor'
    attemptNumber?: number
    enrollmentStatus?: string
  }) {
    if (typeof window === 'undefined' || !window.dataLayer) return

    window.dataLayer.push({
      event: 'user_properties_set',
      user_id: userProperties.userId,
      user_type: userProperties.userType,
      attempt_number: userProperties.attemptNumber,
      enrollment_status: userProperties.enrollmentStatus,
    })
  }

  static trackCustomEvent(eventName: string, customData: Record<string, any>) {
    this.trackEvent(`custom_${eventName}`, customData)
  }
}

// Enhanced conversion tracking specifically for education sector
export class EducationAnalytics extends GTMService {
  static trackCourseView(courseData: {
    courseId: string
    courseName: string
    courseCategory: string
    coursePrice: number
  }) {
    this.trackEvent('view_item', {
      item_id: courseData.courseId,
      item_name: courseData.courseName,
      item_category: courseData.courseCategory,
      price: courseData.coursePrice,
      currency: 'INR',
    })
  }

  static trackCourseEnrollment(enrollmentData: {
    courseId: string
    courseName: string
    studentId: string
    enrollmentType: 'free' | 'paid'
    price?: number
  }) {
    this.trackEvent('course_enrollment', {
      course_id: enrollmentData.courseId,
      course_name: enrollmentData.courseName,
      student_id: enrollmentData.studentId,
      enrollment_type: enrollmentData.enrollmentType,
      value: enrollmentData.price || 0,
      currency: 'INR',
    })
  }

  static trackTestAttempt(testData: {
    testId: string
    testName: string
    testType: 'mock' | 'practice' | 'assessment'
    score?: number
    totalQuestions?: number
  }) {
    this.trackEvent('test_attempt', {
      test_id: testData.testId,
      test_name: testData.testName,
      test_type: testData.testType,
      score: testData.score,
      total_questions: testData.totalQuestions,
    })
  }

  static trackStudyProgress(progressData: {
    courseId: string
    moduleId: string
    progressPercentage: number
    timeSpent: number // in minutes
  }) {
    this.trackEvent('study_progress', {
      course_id: progressData.courseId,
      module_id: progressData.moduleId,
      progress_percentage: progressData.progressPercentage,
      time_spent_minutes: progressData.timeSpent,
    })
  }

  static trackBookingAttempt(bookingData: {
    bookingType: 'demo' | 'counseling' | 'trial'
    center?: string
    success: boolean
  }) {
    this.trackEvent('booking_attempt', {
      booking_type: bookingData.bookingType,
      center: bookingData.center,
      success: bookingData.success,
    })
  }
}
