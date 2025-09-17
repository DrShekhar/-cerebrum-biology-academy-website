/**
 * Comprehensive Google Tools Integration for Cerebrum Biology Academy
 * Handles Google Analytics 4, Search Console, Tag Manager, and Google Ads
 */

export interface GoogleAnalyticsConfig {
  measurementId: string
  apiSecret: string
  conversionIds: {
    demoBooking: string
    courseEnrollment: string
    newsletterSignup: string
    contactForm: string
    brochureDownload: string
  }
  customDimensions: {
    studentClass: string
    courseInterest: string
    trafficSource: string
    deviceType: string
    geolocation: string
  }
}

export interface SearchConsoleMetrics {
  clicks: number
  impressions: number
  ctr: number
  avgPosition: number
  queries: {
    query: string
    clicks: number
    impressions: number
    ctr: number
    position: number
  }[]
  pages: {
    page: string
    clicks: number
    impressions: number
    ctr: number
    position: number
  }[]
}

export interface GoogleAdsConfig {
  customerId: string
  campaignTypes: {
    search: {
      name: string
      keywords: string[]
      budget: number
      targetCpa: number
    }
    display: {
      name: string
      audiences: string[]
      budget: number
      targetCpm: number
    }
    youtube: {
      name: string
      videoIds: string[]
      budget: number
      targetCpv: number
    }
  }
  conversionActions: string[]
}

export class GoogleIntegration {
  private config: GoogleAnalyticsConfig
  private adsConfig: GoogleAdsConfig

  constructor() {
    this.config = {
      measurementId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-XXXXXXXXXX',
      apiSecret: process.env.GA_API_SECRET || '',
      conversionIds: {
        demoBooking: 'AW-DEMO_BOOKING',
        courseEnrollment: 'AW-COURSE_ENROLLMENT',
        newsletterSignup: 'AW-NEWSLETTER_SIGNUP',
        contactForm: 'AW-CONTACT_FORM',
        brochureDownload: 'AW-BROCHURE_DOWNLOAD',
      },
      customDimensions: {
        studentClass: 'custom_dimension_1',
        courseInterest: 'custom_dimension_2',
        trafficSource: 'custom_dimension_3',
        deviceType: 'custom_dimension_4',
        geolocation: 'custom_dimension_5',
      },
    }

    this.adsConfig = {
      customerId: process.env.GOOGLE_ADS_CUSTOMER_ID || '',
      campaignTypes: {
        search: {
          name: 'NEET Biology Coaching - Search',
          keywords: [
            'NEET biology coaching',
            'online biology classes',
            'medical entrance coaching',
            'NEET preparation',
            'biology coaching institute',
            'AIIMS coaching',
            'NEET biology course',
          ],
          budget: 50000, // ₹500/day
          targetCpa: 2000, // ₹2000 per enrollment
        },
        display: {
          name: 'NEET Biology - Display Network',
          audiences: [
            'Medical Students',
            'NEET Aspirants',
            'Education Seekers',
            'Coaching Institute Visitors',
          ],
          budget: 30000, // ₹300/day
          targetCpm: 100, // ₹100 per 1000 impressions
        },
        youtube: {
          name: 'Biology Education - YouTube',
          videoIds: [],
          budget: 20000, // ₹200/day
          targetCpv: 5, // ₹5 per view
        },
      },
      conversionActions: [
        'Demo Booking Submission',
        'Course Enrollment',
        'Newsletter Signup',
        'Contact Form',
        'Brochure Download',
        'Phone Call',
        'WhatsApp Click',
      ],
    }
  }

  // Google Analytics 4 Implementation
  initializeGA4(): string {
    return `
      <!-- Google Analytics 4 -->
      <script async src="https://www.googletagmanager.com/gtag/js?id=${this.config.measurementId}"></script>
      <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        
        gtag('config', '${this.config.measurementId}', {
          page_title: document.title,
          page_location: window.location.href,
          custom_map: {
            'custom_dimension_1': 'student_class',
            'custom_dimension_2': 'course_interest',
            'custom_dimension_3': 'traffic_source',
            'custom_dimension_4': 'device_type',
            'custom_dimension_5': 'geolocation'
          }
        });

        // Enhanced Ecommerce for Education
        gtag('config', '${this.config.measurementId}', {
          currency: 'INR',
          country: 'IN',
          language: 'en'
        });
      </script>
    `
  }

  // Track Education-Specific Events
  trackEducationEvent(eventName: string, parameters: Record<string, any>): void {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', eventName, {
        event_category: 'Education',
        event_label: parameters.label || '',
        value: parameters.value || 0,
        student_class: parameters.studentClass || '',
        course_interest: parameters.courseInterest || '',
        traffic_source: parameters.trafficSource || '',
        device_type: this.getDeviceType(),
        geolocation: parameters.location || '',
        custom_parameter_1: parameters.customParam1 || '',
        custom_parameter_2: parameters.customParam2 || '',
      })
    }
  }

  // Course Enrollment Tracking
  trackCourseEnrollment(courseData: {
    courseId: string
    courseName: string
    coursePrice: number
    studentClass: string
    paymentMethod: string
  }): void {
    this.trackEducationEvent('course_enrollment', {
      event_category: 'Ecommerce',
      transaction_id: `enroll_${Date.now()}`,
      value: courseData.coursePrice,
      currency: 'INR',
      items: [
        {
          item_id: courseData.courseId,
          item_name: courseData.courseName,
          item_category: 'Online Course',
          item_variant: courseData.studentClass,
          price: courseData.coursePrice,
          quantity: 1,
        },
      ],
      studentClass: courseData.studentClass,
      courseInterest: courseData.courseName,
      paymentMethod: courseData.paymentMethod,
    })

    // Track Google Ads Conversion
    window.gtag('event', 'conversion', {
      send_to: this.config.conversionIds.courseEnrollment,
      value: courseData.coursePrice,
      currency: 'INR',
      transaction_id: `enroll_${Date.now()}`,
    })
  }

  // Demo Booking Tracking
  trackDemoBooking(demoData: {
    subject: string
    studentClass: string
    preferredTime: string
    source: string
  }): void {
    this.trackEducationEvent('demo_booking', {
      event_category: 'Lead Generation',
      event_label: `${demoData.subject} - ${demoData.studentClass}`,
      value: 500, // Estimated value of demo booking
      studentClass: demoData.studentClass,
      courseInterest: demoData.subject,
      trafficSource: demoData.source,
      preferredTime: demoData.preferredTime,
    })

    // Track Google Ads Conversion
    window.gtag('event', 'conversion', {
      send_to: this.config.conversionIds.demoBooking,
      value: 500,
      currency: 'INR',
    })
  }

  // Content Engagement Tracking
  trackContentEngagement(contentData: {
    contentType: string
    contentTitle: string
    engagementType: string
    timeSpent?: number
    scrollDepth?: number
  }): void {
    this.trackEducationEvent('content_engagement', {
      event_category: 'Content',
      event_label: contentData.contentTitle,
      value: contentData.timeSpent || 0,
      content_type: contentData.contentType,
      engagement_type: contentData.engagementType,
      scroll_depth: contentData.scrollDepth || 0,
    })
  }

  // Search Console Integration
  async getSearchConsoleData(dateRange: {
    startDate: string
    endDate: string
  }): Promise<SearchConsoleMetrics> {
    try {
      const response = await fetch('/api/analytics/search-console', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dateRange),
      })

      if (!response.ok) {
        throw new Error('Failed to fetch Search Console data')
      }

      return await response.json()
    } catch (error) {
      console.error('Search Console API Error:', error)
      return {
        clicks: 0,
        impressions: 0,
        ctr: 0,
        avgPosition: 0,
        queries: [],
        pages: [],
      }
    }
  }

  // Google Tag Manager Implementation
  initializeGTM(): string {
    const gtmId = process.env.NEXT_PUBLIC_GTM_ID || 'GTM-XXXXXXX'

    return `
      <!-- Google Tag Manager -->
      <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','${gtmId}');</script>
      <!-- End Google Tag Manager -->
    `
  }

  getGTMNoScript(): string {
    const gtmId = process.env.NEXT_PUBLIC_GTM_ID || 'GTM-XXXXXXX'

    return `
      <!-- Google Tag Manager (noscript) -->
      <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=${gtmId}"
      height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
      <!-- End Google Tag Manager (noscript) -->
    `
  }

  // Google Ads Campaign Optimization
  async optimizeAdCampaigns(): Promise<{
    recommendations: string[]
    budgetAdjustments: Record<string, number>
    keywordSuggestions: string[]
  }> {
    try {
      const response = await fetch('/api/ads/optimize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.adsConfig),
      })

      if (!response.ok) {
        throw new Error('Failed to optimize ad campaigns')
      }

      return await response.json()
    } catch (error) {
      console.error('Google Ads Optimization Error:', error)
      return {
        recommendations: [],
        budgetAdjustments: {},
        keywordSuggestions: [],
      }
    }
  }

  // Audience Segmentation for Education
  createEducationAudiences(): Array<{
    name: string
    description: string
    criteria: Record<string, any>
  }> {
    return [
      {
        name: 'NEET Aspirants Class 11',
        description: 'Students in Class 11 interested in NEET preparation',
        criteria: {
          custom_dimension_1: '11',
          custom_dimension_2: 'NEET Biology',
          age_range: '16-18',
          interests: ['Education', 'Medical Colleges'],
        },
      },
      {
        name: 'NEET Aspirants Class 12',
        description: 'Students in Class 12 preparing for NEET',
        criteria: {
          custom_dimension_1: '12',
          custom_dimension_2: 'NEET Biology',
          age_range: '17-19',
          interests: ['Medical Entrance', 'Biology Education'],
        },
      },
      {
        name: 'NEET Droppers',
        description: 'Students who have completed 12th and preparing for NEET again',
        criteria: {
          custom_dimension_1: 'Dropper',
          custom_dimension_2: 'NEET Preparation',
          age_range: '18-22',
          interests: ['Medical Entrance', 'Competitive Exams'],
        },
      },
      {
        name: 'Demo Attendees',
        description: 'Users who attended demo classes',
        criteria: {
          event: 'demo_booking',
          engagement_time: '>300',
          pages_viewed: '>3',
        },
      },
      {
        name: 'High Intent Visitors',
        description: 'Visitors with high purchase intent',
        criteria: {
          pages_viewed: '>5',
          session_duration: '>180',
          events: ['course_view', 'pricing_view', 'faculty_view'],
        },
      },
    ]
  }

  // Performance Monitoring
  async getPerformanceMetrics(): Promise<{
    pageSpeed: number
    coreWebVitals: {
      lcp: number
      fid: number
      cls: number
    }
    conversionRates: Record<string, number>
    adSpend: Record<string, number>
    roas: number
  }> {
    try {
      const response = await fetch('/api/analytics/performance')
      if (!response.ok) {
        throw new Error('Failed to fetch performance metrics')
      }
      return await response.json()
    } catch (error) {
      console.error('Performance Metrics Error:', error)
      return {
        pageSpeed: 0,
        coreWebVitals: { lcp: 0, fid: 0, cls: 0 },
        conversionRates: {},
        adSpend: {},
        roas: 0,
      }
    }
  }

  // Utility Methods
  private getDeviceType(): string {
    if (typeof window === 'undefined') return 'unknown'

    const userAgent = navigator.userAgent
    if (/tablet|ipad|playbook|silk/i.test(userAgent)) return 'tablet'
    if (
      /mobile|iphone|ipod|android|blackberry|opera|mini|windows\sce|palm|smartphone|iemobile/i.test(
        userAgent
      )
    )
      return 'mobile'
    return 'desktop'
  }

  // Enhanced Conversion Tracking
  setupEnhancedConversions(): void {
    window.gtag('config', this.config.measurementId, {
      enhanced_conversions: true,
      allow_enhanced_conversions: true,
    })
  }

  // User-ID Tracking for Cross-Device
  setUserId(userId: string): void {
    window.gtag('config', this.config.measurementId, {
      user_id: userId,
    })
  }

  // Privacy-Compliant Tracking
  updateConsentSettings(consent: {
    analytics: boolean
    advertising: boolean
    functionality: boolean
  }): void {
    window.gtag('consent', 'update', {
      analytics_storage: consent.analytics ? 'granted' : 'denied',
      ad_storage: consent.advertising ? 'granted' : 'denied',
      functionality_storage: consent.functionality ? 'granted' : 'denied',
      personalization_storage: consent.advertising ? 'granted' : 'denied',
    })
  }
}

// Global Type Extensions
declare global {
  interface Window {
    gtag: (...args: any[]) => void
    dataLayer: any[]
  }
}

export const googleIntegration = new GoogleIntegration()
