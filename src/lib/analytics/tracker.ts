'use client'

import { UserActivity, UserSession } from '@/lib/types/analytics'

class AnalyticsTracker {
  private sessionId: string = ''
  private userId?: string
  private sessionStartTime: Date = new Date()
  private lastActivity: Date = new Date()
  private isInitialized: boolean = false
  private activityQueue: UserActivity[] = []
  private flushInterval?: NodeJS.Timeout

  constructor() {
    this.sessionId = this.generateSessionId()
    this.init()
  }

  private init() {
    if (typeof window === 'undefined') return

    // Initialize session tracking
    this.sessionStartTime = new Date()
    this.lastActivity = new Date()
    this.isInitialized = true

    // Set up periodic flush of activity queue
    this.flushInterval = setInterval(() => {
      this.flushActivities()
    }, 30000) // Flush every 30 seconds

    // Track page visibility changes
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') {
        this.updateActivity()
      } else {
        this.flushActivities()
      }
    })

    // Track beforeunload to capture session end
    window.addEventListener('beforeunload', () => {
      this.endSession()
    })

    // Track initial page view
    this.trackPageView()

    // Track clicks, scrolls, and other interactions
    this.setupInteractionTracking()
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  private updateActivity() {
    this.lastActivity = new Date()
  }

  private setupInteractionTracking() {
    if (typeof window === 'undefined') return

    // Track clicks
    document.addEventListener('click', (event) => {
      const target = event.target as HTMLElement
      if (target.tagName === 'A' || target.closest('a')) {
        const link = target.closest('a')
        if (link) {
          this.trackEvent('link_click', {
            url: link.href,
            text: link.textContent?.trim(),
            external: !link.href.includes(window.location.origin),
          })
        }
      }
    })

    // Track scroll depth
    let maxScrollDepth = 0
    window.addEventListener('scroll', () => {
      const scrollDepth = Math.round(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      )
      if (scrollDepth > maxScrollDepth) {
        maxScrollDepth = scrollDepth
        if (scrollDepth >= 25 && scrollDepth < 50) {
          this.trackEvent('scroll_25', { depth: scrollDepth })
        } else if (scrollDepth >= 50 && scrollDepth < 75) {
          this.trackEvent('scroll_50', { depth: scrollDepth })
        } else if (scrollDepth >= 75 && scrollDepth < 90) {
          this.trackEvent('scroll_75', { depth: scrollDepth })
        } else if (scrollDepth >= 90) {
          this.trackEvent('scroll_90', { depth: scrollDepth })
        }
      }
    })
  }

  setUserId(userId: string) {
    this.userId = userId
    // Update session with user info
    this.trackEvent('user_identified', { userId })
  }

  trackPageView(page?: string) {
    if (typeof window === 'undefined') return

    const currentPage = page || window.location.pathname
    const activity: UserActivity = {
      id: this.generateActivityId(),
      userId: this.userId || 'anonymous',
      sessionId: this.sessionId,
      type: 'page_view',
      timestamp: new Date(),
      metadata: {
        page: currentPage,
        referrer: document.referrer,
        userAgent: navigator.userAgent,
        ip: '', // Will be populated server-side
      },
    }

    this.addActivity(activity)
    this.updateActivity()
  }

  trackCourseView(courseId: string, courseName: string) {
    const activity: UserActivity = {
      id: this.generateActivityId(),
      userId: this.userId || 'anonymous',
      sessionId: this.sessionId,
      type: 'course_view',
      timestamp: new Date(),
      metadata: {
        course: courseId,
        page: window.location.pathname,
        userAgent: navigator.userAgent,
      },
    }

    this.addActivity(activity)
    this.updateActivity()
  }

  trackVideoPlay(videoId: string, courseId?: string) {
    const activity: UserActivity = {
      id: this.generateActivityId(),
      userId: this.userId || 'anonymous',
      sessionId: this.sessionId,
      type: 'video_play',
      timestamp: new Date(),
      metadata: {
        video: videoId,
        course: courseId,
        page: window.location.pathname,
        userAgent: navigator.userAgent,
      },
    }

    this.addActivity(activity)
    this.updateActivity()
  }

  trackDownload(fileName: string, fileType: string) {
    const activity: UserActivity = {
      id: this.generateActivityId(),
      userId: this.userId || 'anonymous',
      sessionId: this.sessionId,
      type: 'download',
      timestamp: new Date(),
      metadata: {
        download: fileName,
        page: window.location.pathname,
        userAgent: navigator.userAgent,
      },
    }

    this.addActivity(activity)
    this.updateActivity()
  }

  trackQuizAttempt(quizId: string, courseId?: string) {
    const activity: UserActivity = {
      id: this.generateActivityId(),
      userId: this.userId || 'anonymous',
      sessionId: this.sessionId,
      type: 'quiz_attempt',
      timestamp: new Date(),
      metadata: {
        quiz: quizId,
        course: courseId,
        page: window.location.pathname,
        userAgent: navigator.userAgent,
      },
    }

    this.addActivity(activity)
    this.updateActivity()
  }

  trackDemoBooking(demoId: string) {
    const activity: UserActivity = {
      id: this.generateActivityId(),
      userId: this.userId || 'anonymous',
      sessionId: this.sessionId,
      type: 'demo_booking',
      timestamp: new Date(),
      metadata: {
        page: window.location.pathname,
        userAgent: navigator.userAgent,
      },
    }

    this.addActivity(activity)
    this.updateActivity()
  }

  trackLogin(userId: string) {
    this.userId = userId
    const activity: UserActivity = {
      id: this.generateActivityId(),
      userId: userId,
      sessionId: this.sessionId,
      type: 'login',
      timestamp: new Date(),
      metadata: {
        page: window.location.pathname,
        userAgent: navigator.userAgent,
      },
    }

    this.addActivity(activity)
    this.updateActivity()
  }

  trackLogout() {
    const activity: UserActivity = {
      id: this.generateActivityId(),
      userId: this.userId || 'anonymous',
      sessionId: this.sessionId,
      type: 'logout',
      timestamp: new Date(),
      metadata: {
        page: window.location.pathname,
        userAgent: navigator.userAgent,
        duration: Date.now() - this.sessionStartTime.getTime(),
      },
    }

    this.addActivity(activity)
    this.flushActivities() // Immediate flush for logout
    this.userId = undefined
  }

  trackEvent(eventType: string, metadata: Record<string, unknown>) {
    // Generic event tracking for custom events
    this.updateActivity()

    // Store in local queue for batching
    const event = {
      type: eventType,
      timestamp: new Date(),
      metadata: {
        ...metadata,
        page: typeof window !== 'undefined' ? window.location.pathname : '',
        sessionId: this.sessionId,
        userId: this.userId,
      },
    }

    // Add to local storage for persistence
    if (typeof window !== 'undefined') {
      const events = JSON.parse(localStorage.getItem('analytics_events') || '[]')
      events.push(event)
      localStorage.setItem('analytics_events', JSON.stringify(events.slice(-100))) // Keep last 100 events
    }
  }

  private generateActivityId(): string {
    return `activity_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  private addActivity(activity: UserActivity) {
    this.activityQueue.push(activity)

    // Auto-flush if queue gets too large
    if (this.activityQueue.length >= 10) {
      this.flushActivities()
    }
  }

  private async flushActivities() {
    if (this.activityQueue.length === 0) return

    const activities = [...this.activityQueue]
    this.activityQueue = []

    try {
      // Send to analytics API
      await fetch('/api/analytics/track', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          activities,
          sessionId: this.sessionId,
          timestamp: new Date().toISOString(),
        }),
      })
    } catch (error) {
      console.error('Failed to send analytics data:', error)
      // Re-queue activities for retry
      this.activityQueue.unshift(...activities)
    }
  }

  private endSession() {
    // Send final session data
    const sessionData: Partial<UserSession> = {
      id: this.sessionId,
      userId: this.userId,
      startTime: this.sessionStartTime,
      endTime: new Date(),
      duration: Date.now() - this.sessionStartTime.getTime(),
      pageViews: this.activityQueue.filter((a) => a.type === 'page_view').length,
      activities: this.activityQueue.length,
      isActive: false,
    }

    // Send session end event
    navigator.sendBeacon('/api/analytics/session', JSON.stringify(sessionData))

    // Clear interval
    if (this.flushInterval) {
      clearInterval(this.flushInterval)
    }
  }

  // Get current session info
  getSessionInfo() {
    return {
      sessionId: this.sessionId,
      userId: this.userId,
      startTime: this.sessionStartTime,
      lastActivity: this.lastActivity,
      duration: Date.now() - this.sessionStartTime.getTime(),
    }
  }

  // Clean up
  destroy() {
    if (this.flushInterval) {
      clearInterval(this.flushInterval)
    }
    this.flushActivities()
  }
}

// Create singleton instance
export const analytics = new AnalyticsTracker()

// Export for use in components
export default analytics
