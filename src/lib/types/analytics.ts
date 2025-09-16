export interface UserActivity {
  id: string
  userId: string
  sessionId: string
  type:
    | 'page_view'
    | 'course_view'
    | 'video_play'
    | 'download'
    | 'quiz_attempt'
    | 'demo_booking'
    | 'login'
    | 'logout'
  timestamp: Date
  metadata: {
    page?: string
    course?: string
    video?: string
    download?: string
    quiz?: string
    duration?: number
    referrer?: string
    userAgent?: string
    ip?: string
    location?: {
      country: string
      city: string
      region: string
    }
  }
}

export interface UserSession {
  id: string
  userId: string
  startTime: Date
  endTime?: Date
  duration?: number
  pageViews: number
  activities: number
  device: 'mobile' | 'tablet' | 'desktop'
  browser: string
  os: string
  referrer?: string
  exitPage?: string
  isActive: boolean
}

export interface UserBehavior {
  userId: string
  totalSessions: number
  totalPageViews: number
  averageSessionDuration: number
  mostVisitedPages: Array<{
    page: string
    visits: number
  }>
  courseEngagement: Array<{
    courseId: string
    timeSpent: number
    videosWatched: number
    quizzesAttempted: number
    downloadCount: number
  }>
  conversionEvents: Array<{
    event: 'demo_booked' | 'course_enrolled' | 'payment_completed' | 'subscription_created'
    timestamp: Date
    value?: number
  }>
  lastActive: Date
  retentionData: {
    day1: boolean
    day7: boolean
    day30: boolean
  }
}

export interface AnalyticsDashboard {
  totalUsers: number
  activeUsers: number
  newUsers: number
  returningUsers: number
  totalPageViews: number
  averageSessionDuration: number
  bounceRate: number
  conversionRate: number
  revenueGenerated: number

  topPages: Array<{
    page: string
    views: number
    uniqueUsers: number
  }>

  topCourses: Array<{
    courseId: string
    title: string
    views: number
    enrollments: number
    revenue: number
  }>

  userGrowth: Array<{
    date: string
    newUsers: number
    totalUsers: number
  }>

  sessionData: Array<{
    hour: number
    sessions: number
    averageDuration: number
  }>

  deviceBreakdown: {
    mobile: number
    tablet: number
    desktop: number
  }

  locationData: Array<{
    country: string
    users: number
    sessions: number
  }>
}

export interface RealTimeMetrics {
  activeUsers: number
  activeSessions: Array<{
    userId: string
    sessionId: string
    currentPage: string
    startTime: Date
    lastActivity: Date
  }>
  livePageViews: Array<{
    page: string
    count: number
  }>
  recentActivities: Array<UserActivity>
  conversionFunnel: {
    visitors: number
    demoBookings: number
    enrollments: number
    payments: number
  }
}

export interface CohortAnalysis {
  cohortMonth: string
  totalUsers: number
  retentionRates: {
    month0: number
    month1: number
    month3: number
    month6: number
    month12: number
  }
  revenue: {
    month0: number
    month1: number
    month3: number
    month6: number
    month12: number
  }
}

export interface ConversionFunnel {
  step: string
  users: number
  conversions: number
  conversionRate: number
  dropoffRate: number
}

export interface AcquisitionChannel {
  channel: 'organic' | 'paid' | 'social' | 'email' | 'referral' | 'direct'
  users: number
  sessions: number
  conversions: number
  cost?: number
  roi?: number
}
