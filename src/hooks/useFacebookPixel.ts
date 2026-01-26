'use client'

import { useCallback } from 'react'

/**
 * React hook for Facebook Pixel event tracking
 * Integrates with the MetaIntegration library for education-specific events
 */

interface TrackEventParams {
  contentType?: string
  contentName?: string
  contentCategory?: string
  value?: number
  currency?: string
  studentClass?: string
  courseInterest?: string
  trafficSource?: string
  [key: string]: string | number | boolean | undefined
}

interface DemoBookingData {
  subject: string
  studentClass: string
  studentName: string
  phoneNumber: string
  email?: string
  preferredTime?: string
  source?: string
}

interface EnrollmentData {
  courseId: string
  courseName: string
  coursePrice: number
  studentClass: string
  studentName: string
  email?: string
  phoneNumber?: string
  paymentMethod?: string
}

// Helper to get device type
function getDeviceType(): string {
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

// Simple hash function for PII (in production, use proper SHA-256)
function simpleHash(value: string): string {
  return value.toLowerCase().trim()
}

export function useFacebookPixel() {
  /**
   * Track a standard Facebook Pixel event
   */
  const trackEvent = useCallback((eventName: string, params?: TrackEventParams) => {
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', eventName, {
        content_category: params?.contentCategory || 'Education',
        content_type: params?.contentType || 'NEET Biology Course',
        content_name: params?.contentName || '',
        value: params?.value || 0,
        currency: params?.currency || 'INR',
        device_type: getDeviceType(),
        ...params,
      })

      // Also log to console in development
      if (process.env.NODE_ENV === 'development') {
        console.log('[Facebook Pixel]', eventName, params)
      }
    }
  }, [])

  /**
   * Track a custom event
   */
  const trackCustomEvent = useCallback((eventName: string, params?: TrackEventParams) => {
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('trackCustom', eventName, {
        content_category: 'Education',
        device_type: getDeviceType(),
        ...params,
      })

      if (process.env.NODE_ENV === 'development') {
        console.log('[Facebook Pixel Custom]', eventName, params)
      }
    }
  }, [])

  /**
   * Track demo booking as a Lead event
   */
  const trackDemoBooking = useCallback(
    (data: DemoBookingData) => {
      // Client-side pixel tracking
      trackEvent('Lead', {
        contentType: 'Demo Class',
        contentName: `${data.subject} Demo - Class ${data.studentClass}`,
        value: 500, // Estimated lead value in INR
        studentClass: data.studentClass,
        courseInterest: data.subject,
        trafficSource: data.source || 'direct',
      })

      // Send to Conversion API (server-side)
      sendConversionAPIEvent('Lead', {
        email: data.email,
        phone: data.phoneNumber,
        firstName: data.studentName.split(' ')[0],
        lastName: data.studentName.split(' ').slice(1).join(' '),
        customData: {
          content_type: 'Demo Class',
          value: 500,
          currency: 'INR',
        },
      })
    },
    [trackEvent]
  )

  /**
   * Track course enrollment as a Purchase event
   */
  const trackEnrollment = useCallback(
    (data: EnrollmentData) => {
      trackEvent('Purchase', {
        contentType: 'Course Enrollment',
        contentName: data.courseName,
        value: data.coursePrice,
        currency: 'INR',
        studentClass: data.studentClass,
      })

      // Send to Conversion API
      sendConversionAPIEvent('Purchase', {
        email: data.email,
        phone: data.phoneNumber,
        firstName: data.studentName.split(' ')[0],
        lastName: data.studentName.split(' ').slice(1).join(' '),
        customData: {
          content_type: 'Course',
          content_ids: [data.courseId],
          value: data.coursePrice,
          currency: 'INR',
          num_items: 1,
        },
      })
    },
    [trackEvent]
  )

  /**
   * Track content view (course page, lesson, etc.)
   */
  const trackContentView = useCallback(
    (contentName: string, contentType: string = 'Course Page') => {
      trackEvent('ViewContent', {
        contentName,
        contentType,
        contentCategory: 'Education',
      })
    },
    [trackEvent]
  )

  /**
   * Track course added to cart/wishlist
   */
  const trackAddToCart = useCallback(
    (courseName: string, price: number) => {
      trackEvent('AddToCart', {
        contentName: courseName,
        contentType: 'Course',
        value: price,
        currency: 'INR',
      })
    },
    [trackEvent]
  )

  /**
   * Track form initiation
   */
  const trackFormStart = useCallback(
    (formName: string) => {
      trackCustomEvent('FormStart', {
        contentName: formName,
        contentType: 'Lead Form',
      })
    },
    [trackCustomEvent]
  )

  /**
   * Track WhatsApp click
   */
  const trackWhatsAppClick = useCallback(
    (source: string) => {
      trackCustomEvent('WhatsAppClick', {
        contentName: 'WhatsApp Inquiry',
        trafficSource: source,
      })
    },
    [trackCustomEvent]
  )

  /**
   * Track phone call click
   */
  const trackPhoneClick = useCallback(
    (source: string) => {
      trackCustomEvent('PhoneCallClick', {
        contentName: 'Phone Inquiry',
        trafficSource: source,
      })
    },
    [trackCustomEvent]
  )

  return {
    trackEvent,
    trackCustomEvent,
    trackDemoBooking,
    trackEnrollment,
    trackContentView,
    trackAddToCart,
    trackFormStart,
    trackWhatsAppClick,
    trackPhoneClick,
  }
}

/**
 * Send event to Facebook Conversion API (server-side tracking)
 * This provides more accurate tracking than client-side only
 */
async function sendConversionAPIEvent(
  eventName: string,
  data: {
    email?: string
    phone?: string
    firstName?: string
    lastName?: string
    customData?: Record<string, unknown>
  }
): Promise<void> {
  try {
    const response = await fetch('/api/analytics/facebook-conversion', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        eventName,
        eventTime: Math.floor(Date.now() / 1000),
        userData: {
          em: data.email ? simpleHash(data.email) : undefined,
          ph: data.phone ? data.phone.replace(/\D/g, '') : undefined,
          fn: data.firstName ? simpleHash(data.firstName) : undefined,
          ln: data.lastName ? simpleHash(data.lastName) : undefined,
        },
        customData: data.customData,
      }),
    })

    if (!response.ok) {
      console.error('Failed to send Conversion API event')
    }
  } catch (error) {
    console.error('Conversion API error:', error)
  }
}

export default useFacebookPixel
