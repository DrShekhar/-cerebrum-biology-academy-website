'use client'

import { useCallback } from 'react'
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

export const useAnalytics = () => {
  const trackPageView = useCallback((page: string, title?: string) => {
    trackEvent('page_view', {
      page_title: title || document.title,
      page_location: window.location.href,
      page_path: page,
    })
  }, [])

  const trackCourseEnrollment = useCallback(
    (courseId: string, courseName: string, amount: number) => {
      trackEnrollment(courseId, courseName, amount)
      // Also track as conversion for ads
      trackConversion('enrollment', amount, {
        course_id: courseId,
        course_name: courseName,
      })
    },
    []
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
    // Direct access to all tracking functions
    trackEvent,
    trackConversion,
  }
}
