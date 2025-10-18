/**
 * Google Analytics 4 Integration
 *
 * Provides comprehensive event tracking for user behavior analysis.
 * Tracks key events: AI usage, test generation, enrollments, and conversions.
 */

import { logger } from '../monitoring/logger'

declare global {
  interface Window {
    gtag: (...args: any[]) => void
    dataLayer: any[]
  }
}

export type GAEventName =
  | 'page_view'
  | 'ai_question_asked'
  | 'test_generated'
  | 'demo_booked'
  | 'student_enrolled'
  | 'whatsapp_message_sent'
  | 'course_viewed'
  | 'payment_initiated'
  | 'payment_completed'
  | 'user_signup'
  | 'user_login'

export interface GAEvent {
  name: GAEventName
  params?: Record<string, any>
}

class GoogleAnalytics {
  private measurementId: string | undefined
  private enabled: boolean
  private isInitialized = false

  constructor() {
    this.measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
    this.enabled = !!this.measurementId && typeof window !== 'undefined'

    if (this.enabled && this.measurementId && this.measurementId !== 'G-TEMP-DEV-CONFIG') {
      this.initialize()
    }
  }

  /**
   * Initialize Google Analytics
   */
  private initialize(): void {
    if (!this.measurementId || this.isInitialized) return

    try {
      // Load gtag.js script
      const script = document.createElement('script')
      script.src = `https://www.googletagmanager.com/gtag/js?id=${this.measurementId}`
      script.async = true
      document.head.appendChild(script)

      // Initialize dataLayer
      window.dataLayer = window.dataLayer || []
      window.gtag = function () {
        window.dataLayer.push(arguments)
      }

      window.gtag('js', new Date())
      window.gtag('config', this.measurementId, {
        send_page_view: false, // We'll handle page views manually
      })

      this.isInitialized = true
      logger.info('Google Analytics initialized', {
        measurementId: this.measurementId,
      })
    } catch (error) {
      logger.error('Failed to initialize Google Analytics', error as Error)
    }
  }

  /**
   * Track an event
   */
  trackEvent(event: GAEvent): void {
    if (!this.enabled || !window.gtag) {
      logger.debug('GA event (not tracked):', { event })
      return
    }

    try {
      window.gtag('event', event.name, event.params)

      logger.debug('GA event tracked:', event)
    } catch (error) {
      logger.error('Failed to track GA event', error as Error, { event })
    }
  }

  /**
   * Track page view
   */
  trackPageView(url: string, title?: string): void {
    this.trackEvent({
      name: 'page_view',
      params: {
        page_location: url,
        page_title: title || document.title,
      },
    })
  }

  /**
   * Track AI question asked
   */
  trackAIQuestion(params: {
    userId?: string
    topic?: string
    questionLength: number
    responseTime: number
  }): void {
    this.trackEvent({
      name: 'ai_question_asked',
      params: {
        ...params,
        event_category: 'AI Interaction',
        event_label: params.topic,
      },
    })
  }

  /**
   * Track test generation
   */
  trackTestGeneration(params: {
    userId?: string
    testType: string
    questionCount: number
    topics: string[]
  }): void {
    this.trackEvent({
      name: 'test_generated',
      params: {
        ...params,
        event_category: 'Test Generator',
        event_label: params.testType,
        topics_count: params.topics.length,
      },
    })
  }

  /**
   * Track demo booking
   */
  trackDemoBooking(params: { name: string; email: string; phone: string; source: string }): void {
    this.trackEvent({
      name: 'demo_booked',
      params: {
        event_category: 'Conversion',
        event_label: params.source,
        email: params.email, // Hashed in production
      },
    })
  }

  /**
   * Track student enrollment
   */
  trackEnrollment(params: {
    userId: string
    courseId: string
    courseName: string
    amount: number
    paymentMethod: string
  }): void {
    this.trackEvent({
      name: 'student_enrolled',
      params: {
        ...params,
        event_category: 'Conversion',
        event_label: params.courseName,
        value: params.amount,
        currency: 'INR',
      },
    })

    // Also track as purchase for ecommerce
    this.trackPurchase(params)
  }

  /**
   * Track purchase (ecommerce)
   */
  private trackPurchase(params: {
    userId: string
    courseId: string
    courseName: string
    amount: number
  }): void {
    if (!this.enabled || !window.gtag) return

    window.gtag('event', 'purchase', {
      transaction_id: `enroll_${params.userId}_${Date.now()}`,
      value: params.amount,
      currency: 'INR',
      items: [
        {
          item_id: params.courseId,
          item_name: params.courseName,
          price: params.amount,
          quantity: 1,
        },
      ],
    })
  }

  /**
   * Track WhatsApp message sent
   */
  trackWhatsAppMessage(params: {
    phoneNumber: string
    messageType: 'text' | 'template'
    context: string
  }): void {
    this.trackEvent({
      name: 'whatsapp_message_sent',
      params: {
        ...params,
        event_category: 'Communication',
        event_label: params.context,
      },
    })
  }

  /**
   * Track course view
   */
  trackCourseView(params: { courseId: string; courseName: string; price: number }): void {
    this.trackEvent({
      name: 'course_viewed',
      params: {
        ...params,
        event_category: 'Engagement',
        event_label: params.courseName,
        value: params.price,
        currency: 'INR',
      },
    })
  }

  /**
   * Track payment initiated
   */
  trackPaymentInitiated(params: { amount: number; courseId: string; courseName: string }): void {
    this.trackEvent({
      name: 'payment_initiated',
      params: {
        ...params,
        event_category: 'Ecommerce',
        event_label: params.courseName,
        value: params.amount,
        currency: 'INR',
      },
    })
  }

  /**
   * Track user signup
   */
  trackSignup(params: { method: string; userType: 'student' | 'parent' | 'teacher' }): void {
    this.trackEvent({
      name: 'user_signup',
      params: {
        ...params,
        event_category: 'User',
        event_label: params.method,
      },
    })
  }

  /**
   * Track user login
   */
  trackLogin(params: {
    method: string
    userType: 'student' | 'parent' | 'teacher' | 'admin'
  }): void {
    this.trackEvent({
      name: 'user_login',
      params: {
        ...params,
        event_category: 'User',
        event_label: params.method,
      },
    })
  }

  /**
   * Set user properties
   */
  setUserProperties(properties: Record<string, any>): void {
    if (!this.enabled || !window.gtag) return

    try {
      window.gtag('set', 'user_properties', properties)
      logger.debug('GA user properties set:', properties)
    } catch (error) {
      logger.error('Failed to set GA user properties', error as Error)
    }
  }

  /**
   * Set user ID
   */
  setUserId(userId: string | null): void {
    if (!this.enabled || !window.gtag) return

    try {
      window.gtag('config', this.measurementId, {
        user_id: userId,
      })
      logger.debug('GA user ID set:', { userId })
    } catch (error) {
      logger.error('Failed to set GA user ID', error as Error)
    }
  }
}

// Export singleton instance
export const ga4 = new GoogleAnalytics()

// Convenience functions
export const trackEvent = (event: GAEvent) => ga4.trackEvent(event)
export const trackPageView = (url: string, title?: string) => ga4.trackPageView(url, title)
export const trackAIQuestion = (params: Parameters<typeof ga4.trackAIQuestion>[0]) =>
  ga4.trackAIQuestion(params)
export const trackTestGeneration = (params: Parameters<typeof ga4.trackTestGeneration>[0]) =>
  ga4.trackTestGeneration(params)
export const trackDemoBooking = (params: Parameters<typeof ga4.trackDemoBooking>[0]) =>
  ga4.trackDemoBooking(params)
export const trackEnrollment = (params: Parameters<typeof ga4.trackEnrollment>[0]) =>
  ga4.trackEnrollment(params)
export const trackWhatsAppMessage = (params: Parameters<typeof ga4.trackWhatsAppMessage>[0]) =>
  ga4.trackWhatsAppMessage(params)
