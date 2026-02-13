'use client'

import { createContext, useContext, useEffect, useMemo, ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import analytics from '@/lib/analytics/tracker'

interface AnalyticsContextType {
  trackPageView: (page?: string) => void
  trackCourseView: (courseId: string, courseName: string) => void
  trackVideoPlay: (videoId: string, courseId?: string) => void
  trackDownload: (fileName: string, fileType: string) => void
  trackQuizAttempt: (quizId: string, courseId?: string) => void
  trackDemoBooking: (demoId: string) => void
  trackLogin: (userId: string) => void
  trackLogout: () => void
  trackEvent: (eventType: string, metadata: Record<string, any>) => void
  setUserId: (userId: string) => void
}

const AnalyticsContext = createContext<AnalyticsContextType | null>(null)

interface AnalyticsProviderProps {
  children: ReactNode
}

export function AnalyticsProvider({ children }: AnalyticsProviderProps) {
  const pathname = usePathname()

  // Initialize analytics on mount, cleanup on unmount
  useEffect(() => {
    analytics.init()

    return () => {
      analytics.destroy()
    }
  }, [])

  useEffect(() => {
    // Track page view on route change
    analytics.trackPageView(pathname)
  }, [pathname])

  useEffect(() => {
    // Set up global error tracking
    const handleError = (event: ErrorEvent) => {
      analytics.trackEvent('javascript_error', {
        message: event.message,
        filename: event.filename,
        line: event.lineno,
        column: event.colno,
        stack: event.error?.stack,
      })
    }

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      analytics.trackEvent('unhandled_promise_rejection', {
        reason: event.reason?.toString(),
        stack: event.reason?.stack,
      })
    }

    window.addEventListener('error', handleError)
    window.addEventListener('unhandledrejection', handleUnhandledRejection)

    return () => {
      window.removeEventListener('error', handleError)
      window.removeEventListener('unhandledrejection', handleUnhandledRejection)
    }
  }, [])

  const contextValue = useMemo<AnalyticsContextType>(
    () => ({
      trackPageView: analytics.trackPageView.bind(analytics),
      trackCourseView: analytics.trackCourseView.bind(analytics),
      trackVideoPlay: analytics.trackVideoPlay.bind(analytics),
      trackDownload: analytics.trackDownload.bind(analytics),
      trackQuizAttempt: analytics.trackQuizAttempt.bind(analytics),
      trackDemoBooking: analytics.trackDemoBooking.bind(analytics),
      trackLogin: analytics.trackLogin.bind(analytics),
      trackLogout: analytics.trackLogout.bind(analytics),
      trackEvent: analytics.trackEvent.bind(analytics),
      setUserId: analytics.setUserId.bind(analytics),
    }),
    []
  )

  return <AnalyticsContext.Provider value={contextValue}>{children}</AnalyticsContext.Provider>
}

export function useAnalytics() {
  const context = useContext(AnalyticsContext)
  if (!context) {
    throw new Error('useAnalytics must be used within an AnalyticsProvider')
  }
  return context
}

// Hook for tracking course engagement
export function useCourseAnalytics(courseId?: string, courseName?: string) {
  const { trackCourseView, trackVideoPlay, trackQuizAttempt, trackEvent } = useAnalytics()

  useEffect(() => {
    if (courseId && courseName) {
      trackCourseView(courseId, courseName)
    }
  }, [courseId, courseName, trackCourseView])

  return {
    trackVideoStart: (videoId: string) => trackVideoPlay(videoId, courseId),
    trackQuizStart: (quizId: string) => trackQuizAttempt(quizId, courseId),
    trackChapterComplete: (chapterId: string) =>
      trackEvent('chapter_complete', {
        courseId,
        chapterId,
        timestamp: new Date().toISOString(),
      }),
    trackNotesTaken: (topic: string) =>
      trackEvent('notes_taken', {
        courseId,
        topic,
        timestamp: new Date().toISOString(),
      }),
    trackBookmark: (contentId: string, contentType: 'video' | 'quiz' | 'note') =>
      trackEvent('bookmark_added', {
        courseId,
        contentId,
        contentType,
        timestamp: new Date().toISOString(),
      }),
  }
}

// Hook for tracking user engagement
export function useEngagementAnalytics() {
  const { trackEvent } = useAnalytics()

  useEffect(() => {
    const startTime = Date.now()
    let isActive = true
    let activityTimer: NodeJS.Timeout

    // Track time on page
    const trackTimeOnPage = () => {
      if (isActive) {
        const timeSpent = Date.now() - startTime
        if (timeSpent > 10000) {
          // Only track if user spent more than 10 seconds
          trackEvent('time_on_page', {
            duration: timeSpent,
            page: window.location.pathname,
            timestamp: new Date().toISOString(),
          })
        }
      }
    }

    // Track user activity
    const resetActivityTimer = () => {
      isActive = true
      clearTimeout(activityTimer)
      activityTimer = setTimeout(() => {
        isActive = false
        trackEvent('user_inactive', {
          page: window.location.pathname,
          timestamp: new Date().toISOString(),
        })
      }, 30000) // 30 seconds of inactivity
    }

    // Set up activity listeners
    const activityEvents = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart']

    activityEvents.forEach((event) => {
      document.addEventListener(event, resetActivityTimer, { passive: true })
    })

    // Initial activity timer
    resetActivityTimer()

    // Track time when component unmounts
    return () => {
      trackTimeOnPage()
      clearTimeout(activityTimer)
      activityEvents.forEach((event) => {
        document.removeEventListener(event, resetActivityTimer)
      })
    }
  }, [trackEvent])

  return {
    trackFormStart: (formName: string) =>
      trackEvent('form_start', {
        formName,
        timestamp: new Date().toISOString(),
      }),
    trackFormComplete: (formName: string, success: boolean) =>
      trackEvent('form_complete', {
        formName,
        success,
        timestamp: new Date().toISOString(),
      }),
    trackSearchQuery: (query: string, results: number) =>
      trackEvent('search_query', {
        query,
        results,
        timestamp: new Date().toISOString(),
      }),
    trackFilterUse: (filterType: string, filterValue: string) =>
      trackEvent('filter_used', {
        filterType,
        filterValue,
        timestamp: new Date().toISOString(),
      }),
    trackSocialShare: (platform: string, content: string) =>
      trackEvent('social_share', {
        platform,
        content,
        timestamp: new Date().toISOString(),
      }),
  }
}
