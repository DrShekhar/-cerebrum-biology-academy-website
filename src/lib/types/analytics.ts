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

// Enhanced Analytics Type Definitions for Performance Tracking
export interface UserPerformanceData {
  userId: string
  userName: string
  totalTests: number
  completedTests: number
  averageScore: number
  totalStudyTime: number
  currentStreak: number
  totalPoints: number
  topicPerformance: TopicAnalytics[]
  progressTrend: ProgressTrend[]
  strengths: string[]
  weaknesses: string[]
  achievements: Achievement[]
  timeRange: {
    from: Date
    to: Date
  }
}

export interface TestSessionAnalytics {
  testAttemptId: string
  userId: string
  title: string
  totalQuestions: number
  correctAnswers: number
  accuracy: number
  score: number
  totalMarks: number
  percentage: number
  timeSpent: number
  timeLimit?: number
  startedAt: Date
  submittedAt?: Date
  questionAnalysis: QuestionAnalysis[]
  topicBreakdown: TopicBreakdown[]
  recommendations: string[]
}

export interface TopicAnalytics {
  topic: string
  totalQuestions: number
  correctAnswers: number
  accuracy: number
  averageTime: number
  difficulty: {
    easy: { correct: number; total: number }
    medium: { correct: number; total: number }
    hard: { correct: number; total: number }
  }
  trend: Array<{
    date: Date
    accuracy: number
    timePerQuestion: number
  }>
}

export interface ProgressTrend {
  date: Date
  score: number
  accuracy: number
  testsCompleted: number
  studyTime: number
}

export interface ComparativeAnalytics {
  user: {
    rank: number
    score: number
    testsTaken: number
    studyTime: number
    strengths: string[]
    weaknesses: string[]
  }
  class: {
    totalUsers: number
    averageScore: number
    averageTestsTaken: number
    averageStudyTime: number
    topPerformers: Array<{
      rank: number
      name: string
      score: number
    }>
  }
  percentile: number
  comparison: {
    scoreComparison: number
    testsComparison: number
    timeComparison: number
  }
}

export interface PerformanceMetrics {
  period: 'week' | 'month' | 'quarter'
  totalTests: number
  totalQuestions: number
  correctAnswers: number
  accuracy: number
  averageScore: number
  totalStudyTime: number
  averageTestTime: number
  improvement: number
  consistencyScore: number
  topTopics: Array<{ topic: string; accuracy: number }>
  weakTopics: Array<{ topic: string; accuracy: number }>
}

export interface QuestionAnalysis {
  questionId: string
  topic: string
  difficulty: string
  isCorrect: boolean
  timeSpent: number
  selectedAnswer?: string
  correctAnswer: string
  explanation?: string
}

export interface TopicBreakdown {
  topic: string
  total: number
  correct: number
  timeSpent: number
}

export interface Achievement {
  type: string
  title: string
  earnedAt?: Date
  points: number
}

// Real-time Analytics Types
export interface RealTimeSession {
  sessionId: string
  userId: string
  testId: string
  currentQuestion: number
  totalQuestions: number
  timeRemaining: number
  status: 'active' | 'paused' | 'completed'
  score: number
  accuracy: number
  lastActivity: Date
}

export interface LiveAnalytics {
  activeUsers: number
  activeSessions: RealTimeSession[]
  completedTestsToday: number
  averageScoreToday: number
  popularTopics: Array<{
    topic: string
    testsAttempted: number
    averageScore: number
  }>
  performance: {
    totalTests: number
    totalUsers: number
    conversionRate: number
    retentionRate: number
  }
}

// Dashboard Analytics Types
export interface DashboardMetrics {
  overview: {
    totalStudents: number
    totalTests: number
    averageScore: number
    completionRate: number
  }
  trends: {
    dailyActive: Array<{ date: string; count: number }>
    weeklyTests: Array<{ week: string; count: number }>
    monthlyGrowth: Array<{ month: string; students: number; tests: number }>
  }
  topPerformers: Array<{
    userId: string
    name: string
    score: number
    rank: number
  }>
  popularContent: Array<{
    type: 'topic' | 'chapter' | 'test'
    name: string
    engagement: number
    performance: number
  }>
}

// Teacher Dashboard Types
export interface TeacherAnalytics {
  classOverview: {
    totalStudents: number
    averageScore: number
    classAverage: number
    improvement: number
  }
  studentProgress: Array<{
    studentId: string
    name: string
    lastActive: Date
    testsTaken: number
    averageScore: number
    improvement: number
    strugglingTopics: string[]
  }>
  topicPerformance: Array<{
    topic: string
    classAverage: number
    difficultyLevel: 'easy' | 'medium' | 'hard'
    studentsStruggling: number
    recommendedActions: string[]
  }>
  engagementMetrics: {
    dailyActiveStudents: number
    weeklyTestCompletion: number
    averageStudyTime: number
    dropoffPoints: string[]
  }
}

// Admin Dashboard Types
export interface AdminAnalytics {
  systemMetrics: {
    totalUsers: number
    totalTeachers: number
    totalStudents: number
    monthlyGrowth: number
    churnRate: number
  }
  contentMetrics: {
    totalQuestions: number
    totalTests: number
    averageRating: number
    contentGaps: string[]
  }
  performanceMetrics: {
    systemUptime: number
    averageResponseTime: number
    errorRate: number
    serverLoad: number
  }
  businessMetrics: {
    revenue: number
    conversionRate: number
    customerLifetimeValue: number
    costPerAcquisition: number
  }
}

// Export Types
export interface ExportOptions {
  format: 'pdf' | 'csv' | 'xlsx'
  timeRange: {
    from: Date
    to: Date
  }
  filters: {
    userId?: string
    grade?: string
    subject?: string
    topics?: string[]
  }
  includeCharts: boolean
  includeRawData: boolean
}

export interface ExportData {
  summary: {
    totalRecords: number
    dateRange: string
    generatedAt: Date
  }
  data: any[]
  charts?: {
    [key: string]: {
      type: 'line' | 'bar' | 'pie' | 'scatter'
      data: any[]
      options: any
    }
  }
}

// Chart Data Types
export interface ChartData {
  labels: string[]
  datasets: Array<{
    label: string
    data: number[]
    backgroundColor?: string | string[]
    borderColor?: string
    borderWidth?: number
    fill?: boolean
  }>
}

export interface TimeSeriesData {
  timestamp: Date
  value: number
  label?: string
  category?: string
}

// Leaderboard Types
export interface LeaderboardEntry {
  rank: number
  userId: string
  name: string
  score: number
  testsCompleted: number
  averageTime: number
  badgeCount: number
  streakDays: number
  change: number // Position change from last period
}

export interface Leaderboard {
  type: 'global' | 'grade' | 'subject' | 'topic'
  period: 'daily' | 'weekly' | 'monthly' | 'allTime'
  entries: LeaderboardEntry[]
  userPosition?: LeaderboardEntry
  totalParticipants: number
}

// Event Tracking Types
export interface AnalyticsEvent {
  eventType: 'user_action' | 'system_event' | 'performance_metric'
  eventName: string
  userId?: string
  sessionId?: string
  timestamp: Date
  properties: Record<string, any>
  pagePath?: string
  userAgent?: string
  ipAddress?: string
  location?: {
    country: string
    city: string
  }
}

// Engagement Metrics
export interface EngagementMetrics {
  dailyActiveUsers: number
  weeklyActiveUsers: number
  monthlyActiveUsers: number
  averageSessionDuration: number
  bounceRate: number
  pageViews: number
  uniquePageViews: number
  conversionFunnel: Array<{
    stage: string
    users: number
    conversionRate: number
  }>
}
