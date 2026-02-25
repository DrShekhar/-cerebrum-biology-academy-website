/**
 * Facebook Pixel Service
 * Handles Facebook Pixel initialization and event tracking
 */

export class FacebookPixelService {
  private static isInitialized = false

  static initialize(pixelId: string) {
    if (typeof window === 'undefined' || this.isInitialized) return

    // Facebook Pixel initialization
    const fbq: ((...args: [string, ...unknown[]]) => void) & { q?: unknown[][]; push?: unknown; loaded?: boolean; version?: string; queue?: unknown[] } =
      window.fbq as typeof fbq ||
      function (...args: [string, ...unknown[]]) {
        ;(fbq.q = fbq.q || []).push(args)
      }
    fbq.push = fbq
    fbq.loaded = true
    fbq.version = '2.0'
    fbq.queue = []
    ;window.fbq = fbq
    if (!window._fbq) window._fbq = fbq

    // Load Facebook Pixel script
    const script = document.createElement('script')
    script.async = true
    script.src = 'https://connect.facebook.net/en_US/fbevents.js'
    document.head.appendChild(script)

    // Initialize pixel
    ;window.fbq('init', pixelId)
    ;window.fbq('track', 'PageView')

    this.isInitialized = true
    console.log('Facebook Pixel initialized with ID:', pixelId)
  }

  static trackEvent(eventName: string, parameters: Record<string, unknown> = {}) {
    if (typeof window === 'undefined' || !window.fbq) return
    ;window.fbq('track', eventName, parameters)
    console.log('Facebook Pixel Event:', eventName, parameters)
  }

  static trackCustomEvent(eventName: string, parameters: Record<string, unknown> = {}) {
    if (typeof window === 'undefined' || !window.fbq) return
    ;window.fbq('trackCustom', eventName, parameters)
    console.log('Facebook Pixel Custom Event:', eventName, parameters)
  }

  static trackPageView() {
    this.trackEvent('PageView')
  }

  static trackLead(
    leadData: {
      email?: string
      phone?: string
      firstName?: string
      lastName?: string
      value?: number
    } = {}
  ) {
    const parameters: Record<string, unknown> = {}

    if (leadData.email) parameters.email = leadData.email
    if (leadData.phone) parameters.phone = leadData.phone
    if (leadData.firstName) parameters.fn = leadData.firstName
    if (leadData.lastName) parameters.ln = leadData.lastName
    if (leadData.value) parameters.value = leadData.value

    this.trackEvent('Lead', parameters)
  }

  static trackPurchase(purchaseData: {
    value: number
    currency?: string
    contentIds?: string[]
    contentType?: string
  }) {
    this.trackEvent('Purchase', {
      value: purchaseData.value,
      currency: purchaseData.currency || 'INR',
      content_ids: purchaseData.contentIds,
      content_type: purchaseData.contentType || 'product',
    })
  }

  static trackCompleteRegistration(
    registrationData: {
      email?: string
      phone?: string
      status?: string
    } = {}
  ) {
    this.trackEvent('CompleteRegistration', {
      status: registrationData.status || 'completed',
      ...registrationData,
    })
  }

  static trackInitiateCheckout(checkoutData: {
    value: number
    currency?: string
    contentIds?: string[]
    numItems?: number
  }) {
    this.trackEvent('InitiateCheckout', {
      value: checkoutData.value,
      currency: checkoutData.currency || 'INR',
      content_ids: checkoutData.contentIds,
      num_items: checkoutData.numItems,
    })
  }

  static trackAddToCart(cartData: {
    value: number
    currency?: string
    contentId: string
    contentName?: string
  }) {
    this.trackEvent('AddToCart', {
      value: cartData.value,
      currency: cartData.currency || 'INR',
      content_id: cartData.contentId,
      content_name: cartData.contentName,
    })
  }

  static trackViewContent(contentData: {
    contentId: string
    contentName?: string
    contentCategory?: string
    value?: number
  }) {
    this.trackEvent('ViewContent', {
      content_id: contentData.contentId,
      content_name: contentData.contentName,
      content_category: contentData.contentCategory,
      value: contentData.value,
      currency: 'INR',
    })
  }

  static trackSearch(searchData: { searchString: string; contentCategory?: string }) {
    this.trackEvent('Search', {
      search_string: searchData.searchString,
      content_category: searchData.contentCategory,
    })
  }

  static trackContact() {
    this.trackEvent('Contact')
  }

  static trackSubmitApplication(
    applicationData: {
      applicationId?: string
      applicationStatus?: string
    } = {}
  ) {
    this.trackEvent('SubmitApplication', applicationData)
  }

  // Education-specific tracking events
  static trackScheduleDemo(
    demoData: {
      courseId?: string
      courseName?: string
      center?: string
    } = {}
  ) {
    this.trackCustomEvent('ScheduleDemo', {
      course_id: demoData.courseId,
      course_name: demoData.courseName,
      center: demoData.center,
    })
  }

  static trackDownloadBrochure(
    brochureData: {
      brochureType?: string
      courseId?: string
    } = {}
  ) {
    this.trackCustomEvent('DownloadBrochure', {
      brochure_type: brochureData.brochureType,
      course_id: brochureData.courseId,
    })
  }

  static trackVideoEngagement(videoData: {
    videoId: string
    videoTitle?: string
    watchTime: number
    totalDuration?: number
  }) {
    this.trackCustomEvent('VideoEngagement', {
      video_id: videoData.videoId,
      video_title: videoData.videoTitle,
      watch_time: videoData.watchTime,
      total_duration: videoData.totalDuration,
      completion_rate: videoData.totalDuration
        ? (videoData.watchTime / videoData.totalDuration) * 100
        : null,
    })
  }

  static trackTestCompletion(testData: {
    testId: string
    testType: string
    score?: number
    totalQuestions?: number
  }) {
    this.trackCustomEvent('TestCompletion', {
      test_id: testData.testId,
      test_type: testData.testType,
      score: testData.score,
      total_questions: testData.totalQuestions,
      success_rate:
        testData.score && testData.totalQuestions
          ? (testData.score / testData.totalQuestions) * 100
          : null,
    })
  }

  static trackCounselingBooking(
    counselingData: {
      counselingType?: string
      center?: string
      preferredDate?: string
    } = {}
  ) {
    this.trackCustomEvent('CounselingBooking', {
      counseling_type: counselingData.counselingType,
      center: counselingData.center,
      preferred_date: counselingData.preferredDate,
    })
  }

  static trackWhatsAppClick(
    whatsappData: {
      source?: string
      messageType?: string
    } = {}
  ) {
    this.trackCustomEvent('WhatsAppClick', {
      source: whatsappData.source,
      message_type: whatsappData.messageType,
    })
  }

  static trackPhoneCall(
    callData: {
      source?: string
      center?: string
    } = {}
  ) {
    this.trackCustomEvent('PhoneCall', {
      source: callData.source,
      center: callData.center,
    })
  }
}
