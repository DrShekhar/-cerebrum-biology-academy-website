'use client'

import { useCallback, useEffect, useRef } from 'react'
import { CourseSelectionData } from './useCourseSelectorState'
import {
  trackEvent,
  trackEnrollment,
  trackDemoBooking,
  trackWhatsAppLead,
  trackStudentLogin,
  trackScorePrediction,
  trackStudySession,
  trackConversion,
} from '@/lib/analytics/googleAnalytics'

declare global {
  interface Window {
    gtag: (...args: any[]) => void
    dataLayer: any[]
    fbq: (...args: any[]) => void
    clarity: (...args: any[]) => void
    _hsq: any[]
  }
}

export interface AnalyticsEvent {
  name: string
  parameters: { [key: string]: any }
  timestamp: string
  sessionId: string
  userId?: string
}

export interface UserBehaviorData {
  stepViews: { [stepId: string]: number }
  timeSpent: { [stepId: string]: number }
  dropOffPoints: string[]
  completionRate: number
  conversionFunnel: {
    step: string
    users: number
    conversionRate: number
  }[]
}

interface AnalyticsConfig {
  googleAnalyticsId?: string
  facebookPixelId?: string
  microsoftClarityId?: string
  hubspotId?: string
  enableDebug?: boolean
}

const DEFAULT_CONFIG: AnalyticsConfig = {
  googleAnalyticsId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
  facebookPixelId: process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID,
  microsoftClarityId: process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID,
  hubspotId: process.env.NEXT_PUBLIC_HUBSPOT_PORTAL_ID,
  enableDebug: process.env.NODE_ENV === 'development',
}

export const useAnalytics = (config: AnalyticsConfig = {}) => {
  const finalConfig = { ...DEFAULT_CONFIG, ...config }
  const sessionId = useRef<string | undefined>(undefined)
  const userId = useRef<string | undefined>(undefined)
  const eventQueue = useRef<AnalyticsEvent[]>([])
  const isInitialized = useRef(false)

  // Generate session ID
  useEffect(() => {
    if (typeof window === 'undefined') return

    if (!sessionId.current) {
      sessionId.current = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    }

    // Try to get user ID from localStorage or generate new one
    const storedUserId = localStorage.getItem('analytics_user_id')
    if (storedUserId) {
      userId.current = storedUserId
    } else {
      userId.current = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      localStorage.setItem('analytics_user_id', userId.current)
    }
  }, [])

  const trackPageView = useCallback(
    (page: string, title?: string) => {
      trackEvent('page_view', {
        page_title: title || (typeof document !== 'undefined' ? document.title : ''),
        page_location: typeof window !== 'undefined' ? window.location.href : '',
        page_path: page,
      })
    },
    [trackEvent]
  )

  const trackCourseEnrollment = useCallback(
    (courseId: string, courseName: string, amount: number) => {
      trackEnrollment(courseId, courseName, amount)
      trackConversion('enrollment', amount, {
        course_id: courseId,
        course_name: courseName,
      })
    },
    [trackEnrollment, trackConversion]
  )

  const trackDemoRequest = useCallback((studentName: string, course: string, phone?: string) => {
    trackDemoBooking(studentName, course)
    trackConversion('demo_booking', 2000, {
      student_name: studentName,
      course_interest: course,
      phone: phone,
    })
  }, [])

  const trackWhatsAppClick = useCallback((source: string, phone: string) => {
    trackWhatsAppLead(phone, source)
    trackConversion('whatsapp_lead', 1500, { source })
  }, [])

  const trackLogin = useCallback((studentId: string, userType: 'student' | 'admin' = 'student') => {
    trackStudentLogin(studentId)
    trackEvent('login', {
      method: userType === 'admin' ? 'admin_portal' : 'student_portal',
      user_type: userType,
    })
  }, [])

  const trackScore = useCallback((predicted: number, attempts: number) => {
    trackScorePrediction(predicted, attempts)
  }, [])

  const trackStudy = useCallback((duration: number, topics: number, subject?: string) => {
    trackStudySession(duration, topics)
    trackEvent('engagement', {
      engagement_type: 'study_session',
      duration: duration,
      subject: subject || 'biology',
    })
  }, [])

  const trackFormSubmission = useCallback((formType: string, success: boolean, value?: number) => {
    trackEvent(success ? 'form_submit' : 'form_error', {
      form_type: formType,
      success: success,
      value: value || 0,
    })

    if (success && formType === 'contact') {
      trackConversion('contact_form', value || 1000)
    }
  }, [])

  const trackSearchQuery = useCallback((query: string, results: number) => {
    trackEvent('search', {
      search_term: query,
      results_count: results,
    })
  }, [])

  const trackVideoWatch = useCallback((videoId: string, duration: number, completed: boolean) => {
    trackEvent('video_watch', {
      video_id: videoId,
      duration: duration,
      completed: completed,
      engagement_type: 'video',
    })
  }, [])

  // Enhanced course selector specific analytics
  const trackStepCompletion = useCallback((stepId: string, stepData: any) => {
    trackEvent('step_completed', {
      stepId,
      step_name: stepData.stepName || stepId,
      time_spent: stepData.timeSpent || 0,
      completion_percentage: stepData.completionPercentage || 0,
      errors_encountered: stepData.errors || 0,
      retry_count: stepData.retryCount || 0,
      data_quality: stepData.dataQuality || 'good',
      session_id: sessionId.current,
      user_id: userId.current,
      ...stepData,
    })
  }, [])

  const trackUserBehavior = useCallback((behaviorData: Partial<UserBehaviorData>) => {
    trackEvent('user_behavior', {
      behavior_type: 'course_selector_interaction',
      session_id: sessionId.current,
      user_id: userId.current,
      ...behaviorData,
    })
  }, [])

  const trackError = useCallback((error: Error, context: string = 'general') => {
    trackEvent('error_occurred', {
      error_message: error.message,
      error_stack: error.stack?.substring(0, 500),
      error_context: context,
      error_type: error.name || 'Error',
      session_id: sessionId.current,
      user_id: userId.current,
    })
  }, [])

  const trackAbandon = useCallback((context: string, abandonData: any) => {
    trackEvent('user_abandoned', {
      abandon_context: context,
      abandon_point: abandonData.step || 'unknown',
      time_before_abandon: abandonData.timeSpent || 0,
      completion_percentage: abandonData.completionPercentage || 0,
      session_id: sessionId.current,
      user_id: userId.current,
      ...abandonData,
    })
  }, [])

  const trackCourseSelection = useCallback(
    (courseData: any, selectionData: CourseSelectionData) => {
      trackEvent('course_selected', {
        course_id: courseData.id,
        course_name: courseData.name,
        course_series: courseData.series,
        course_price: courseData.price.base,
        user_budget: selectionData.budget.maxAmount,
        user_goals: selectionData.goals.targetScore,
        matching_score: courseData.matching?.score || 0,
        selection_reasons: courseData.matching?.reasons || [],
        user_location: selectionData.location.city,
        preferred_mode: selectionData.location.preferredMode,
        session_id: sessionId.current,
        user_id: userId.current,
      })
    },
    []
  )

  const trackFilterUsage = useCallback((filters: any, resultCount: number) => {
    trackEvent('filters_applied', {
      filters_used: Object.keys(filters).filter((key) => filters[key] && filters[key].length > 0),
      filter_values: filters,
      result_count: resultCount,
      filter_effectiveness: resultCount > 0 ? 'effective' : 'no_results',
      session_id: sessionId.current,
      user_id: userId.current,
    })
  }, [])

  const trackTiming = useCallback(
    (timingCategory: string, timingVar: string, timingValue: number) => {
      trackEvent('timing_complete', {
        timing_category: timingCategory,
        timing_var: timingVar,
        timing_value: timingValue,
        session_id: sessionId.current,
        user_id: userId.current,
      })
    },
    []
  )

  const getAnalyticsData = useCallback((): {
    sessionId: string
    userId: string
    queuedEvents: number
    isInitialized: boolean
  } => {
    return {
      sessionId: sessionId.current || '',
      userId: userId.current || '',
      queuedEvents: eventQueue.current.length,
      isInitialized: isInitialized.current,
    }
  }, [])

  const flushEvents = useCallback(() => {
    if (eventQueue.current.length === 0) return

    const events = [...eventQueue.current]
    eventQueue.current = []

    if (finalConfig.enableDebug) {
      console.log('Flushing analytics events:', events)
    }

    // Send to custom analytics endpoint
    if (typeof window !== 'undefined') {
      fetch('/api/analytics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ events }),
      }).catch((error) => {
        console.error('Failed to send analytics events:', error)
        eventQueue.current = [...events, ...eventQueue.current]
      })
    }
  }, [finalConfig])

  return {
    trackPageView,
    trackCourseEnrollment,
    trackDemoRequest,
    trackWhatsAppClick,
    trackLogin,
    trackScore,
    trackStudy,
    trackFormSubmission,
    trackSearchQuery,
    trackVideoWatch,
    trackStepCompletion,
    trackUserBehavior,
    trackError,
    trackAbandon,
    trackCourseSelection,
    trackFilterUsage,
    trackTiming,
    getAnalyticsData,
    flushEvents,
    // Direct access to all tracking functions
    trackEvent,
    trackConversion,
  }
}
