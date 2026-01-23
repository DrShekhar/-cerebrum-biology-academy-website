import { DemoBooking } from './db'

// Admin Dashboard Analytics
export interface AdminAnalytics {
  id: string
  date: string // YYYY-MM-DD format
  metrics: {
    // User engagement metrics
    totalUsers: number
    newRegistrations: number
    activeUsers: number
    userRetention: number
    
    // Enrollment & Revenue metrics
    totalEnrollments: number
    enrollmentConversionRate: number
    revenue: number
    averageOrderValue: number
    
    // Marketing metrics
    demoBookings: number
    demoConversionRate: number
    leadGeneration: number
    whatsappEngagement: number
    
    // Course-specific metrics
    popularCourses: Array<{courseId: string, enrollmentCount: number}>
    classDistribution: {
      class11: number
      class12: number
      dropper: number
      foundation: number
    }
    
    // Geographic distribution
    topCities: Array<{city: string, userCount: number}>
    stateDistribution: Record<string, number>
  }
  createdAt: number
}

// Faculty Management
export interface Faculty {
  id: string
  name: string
  email: string
  mobile: string
  whatsappNumber?: string
  
  // Professional details
  qualification: string[]
  experience: number
  subjects: ('Physics' | 'Chemistry' | 'Biology' | 'Mathematics')[]
  specialization: string[]
  designation: 'Senior Faculty' | 'Faculty' | 'Assistant Faculty' | 'Guest Faculty'
  
  // Performance metrics
  rating: number
  totalStudentsTaught: number
  successRate: number
  studentFeedbackScore: number
  
  // Availability and scheduling
  availability: {
    days: ('monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday')[]
    timeSlots: Array<{startTime: string, endTime: string}>
    maxClassesPerDay: number
    preferredBatchSize: number
  }
  
  // Admin fields
  isActive: boolean
  dateJoined: number
  lastActiveAt: number
  salary?: number
  createdAt: number
  updatedAt: number
  
  profile?: {
    bio: string
    achievements: string[]
    certifications: string[]
    profileImage: string
    socialLinks?: {
      linkedin?: string
      twitter?: string
      youtube?: string
    }
  }
}

// Calendar and Scheduling
export interface ClassSchedule {
  id: string
  courseId: string
  facultyId: string
  batchId: string
  
  // Schedule details
  title: string
  description?: string
  date: string // YYYY-MM-DD
  startTime: string // HH:mm format
  endTime: string // HH:mm format
  duration: number // in minutes
  
  // Class details
  type: 'live' | 'recorded' | 'doubt-clearing' | 'test' | 'revision'
  platform: 'zoom' | 'google-meet' | 'youtube' | 'classroom'
  meetingLink?: string
  recordingLink?: string
  
  // Attendance and engagement
  maxStudents: number
  enrolledStudents: string[] // User IDs
  attendedStudents: string[] // User IDs
  status: 'scheduled' | 'ongoing' | 'completed' | 'cancelled'
  
  // Resources
  materials: Array<{
    type: 'pdf' | 'video' | 'link' | 'assignment'
    title: string
    url: string
    description?: string
  }>
  
  createdAt: number
  updatedAt: number
}

// Enhanced Demo Booking with Automation
export interface EnhancedDemoBooking extends DemoBooking {
  // Enhanced fields for automation
  source: 'website' | 'whatsapp' | 'facebook' | 'google' | 'referral' | 'call'
  utmParams?: {
    source: string
    medium: string
    campaign: string
    content?: string
  }
  
  // Assignment and follow-up
  assignedTo?: string // Faculty/Sales team member ID
  followUpDate?: number
  remindersSent: number
  
  // Demographics and targeting
  studentClass: '10th' | '11th' | '12th' | 'Dropper'
  currentScore?: number
  targetScore?: number
  competitiveExams: ('NEET' | 'AIIMS' | 'JIPMER' | 'State CET')[]
  
  // Conversion tracking
  convertedToEnrollment: boolean
  conversionDate?: number
  rejectionReason?: string
  
  // Communication logs
  communicationHistory: Array<{
    type: 'call' | 'whatsapp' | 'email' | 'sms'
    timestamp: number
    content: string
    response?: string
    sentBy: string
  }>
  
  // Demo feedback
  demoFeedback?: {
    rating: number
    feedback: string
    attendanceStatus: 'attended' | 'missed' | 'rescheduled'
    interestLevel: 'high' | 'medium' | 'low'
    concerns: string[]
    nextSteps: string
  }
}

// Payment and Transaction Management
export interface PaymentTransaction {
  id: string
  enrollmentId: string
  userId: string
  courseId: string
  
  // Payment details
  amount: number
  currency: 'INR'
  paymentMethod: 'razorpay' | 'paytm' | 'gpay' | 'phonepe' | 'bank_transfer' | 'cash'
  status: 'pending' | 'processing' | 'completed' | 'failed' | 'refunded' | 'cancelled'
  
  // Gateway details
  gatewayTransactionId?: string
  gatewayResponse?: Record<string, any>
  failureReason?: string
  
  // Pricing and discounts
  originalAmount: number
  discountAmount: number
  discountCode?: string
  tax: number
  finalAmount: number
  
  // Timeline
  initiatedAt: number
  completedAt?: number
  expiresAt?: number
  
  // Refund information
  refundAmount?: number
  refundReason?: string
  refundedAt?: number
  
  createdAt: number
  updatedAt: number
}

// Marketing Campaign Management
export interface MarketingCampaign {
  id: string
  name: string
  type: 'whatsapp' | 'sms' | 'email' | 'facebook' | 'google' | 'mixed'
  status: 'draft' | 'scheduled' | 'active' | 'paused' | 'completed'
  
  // Campaign details
  objective: 'enrollment' | 'demo_booking' | 'retention' | 'upsell' | 'referral'
  targetAudience: {
    demographics: {
      class: ('10th' | '11th' | '12th' | 'Dropper')[]
      city?: string[]
      state?: string[]
      score_range?: {min: number, max: number}
    }
    behavior: {
      enrollment_status?: ('enrolled' | 'demo_taken' | 'lead' | 'inactive')[]
      last_activity_days?: number
      course_interest?: string[]
    }
    customSegment?: string // ID of custom audience segment
  }
  
  // Campaign content
  content: {
    whatsapp?: {
      message: string
      mediaUrl?: string
      ctaButton?: string
    }
    sms?: {
      message: string
    }
    email?: {
      subject: string
      htmlContent: string
      textContent: string
    }
  }
  
  // Scheduling
  scheduledAt?: number
  frequency?: 'once' | 'daily' | 'weekly' | 'monthly'
  endDate?: number
  
  // Performance metrics
  metrics: {
    sent: number
    delivered: number
    opened: number
    clicked: number
    converted: number
    unsubscribed: number
    cost: number
  }
  
  createdBy: string
  createdAt: number
  updatedAt: number
}

// Abandoned Cart Recovery
export interface AbandonedCart {
  id: string
  userId: string
  courseId: string
  sessionId: string
  
  // Cart details
  items: Array<{
    courseId: string
    courseName: string
    price: number
    discountApplied?: number
  }>
  totalAmount: number
  
  // Abandonment tracking
  abandonedAt: number
  lastInteraction: number
  pageExited: string
  timeSpentOnPage: number
  
  // Recovery attempts
  recoveryAttempts: Array<{
    type: 'whatsapp' | 'sms' | 'email' | 'push'
    sentAt: number
    opened?: boolean
    clicked?: boolean
    content: string
  }>
  
  // Outcome
  recovered: boolean
  recoveredAt?: number
  finalPurchaseAmount?: number
  
  // Personalization data
  userBehavior: {
    previousCourses: string[]
    browsingHistory: string[]
    timeOnSite: number
    deviceType: 'mobile' | 'desktop' | 'tablet'
    source: string
  }
}

// Admin Action Logs for Audit Trail
export interface AdminActionLog {
  id: string
  adminId: string
  adminName: string
  action: string
  resourceType: 'user' | 'enrollment' | 'payment' | 'campaign' | 'demo' | 'faculty' | 'schedule'
  resourceId: string
  
  // Action details
  actionType: 'create' | 'update' | 'delete' | 'approve' | 'reject' | 'export'
  previousValues?: Record<string, any>
  newValues?: Record<string, any>
  reason?: string
  
  // Context
  ipAddress: string
  userAgent: string
  timestamp: number
  
  // Impact assessment
  affectedUsers?: string[]
  criticalAction: boolean
}

// Real-time System Metrics
export interface SystemMetrics {
  id: string
  timestamp: number
  
  // Performance metrics
  responseTime: number
  activeConnections: number
  databaseLatency: number
  errorRate: number
  
  // User activity
  onlineUsers: number
  concurrentClasses: number
  apiCallsPerMinute: number
  
  // Business metrics
  conversionRateToday: number
  revenueToday: number
  enrollmentsToday: number
  
  // System health
  serverLoad: number
  memoryUsage: number
  diskUsage: number
  uptime: number
}

// Course and Batch Management
export interface CourseBatch {
  id: string
  courseId: string
  batchName: string
  facultyId: string
  
  // Batch configuration
  maxStudents: number
  currentStudents: number
  startDate: string
  endDate: string
  
  // Schedule
  schedule: {
    days: string[]
    timeSlot: string
    duration: number
    totalClasses: number
  }
  
  // Student management
  enrolledStudents: Array<{
    userId: string
    enrollmentDate: number
    paymentStatus: 'pending' | 'partial' | 'completed'
    attendancePercentage: number
  }>
  
  // Performance tracking
  averageAttendance: number
  completionRate: number
  studentSatisfaction: number
  
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled'
  createdAt: number
  updatedAt: number
}

export interface ClassAttendance {
  id: string
  classScheduleId: string
  studentId: string
  
  // Attendance details
  status: 'present' | 'absent' | 'late' | 'excused'
  joinTime?: number
  leaveTime?: number
  duration?: number
  
  // Engagement metrics
  questionsAsked: number
  chatParticipation: number
  quizScore?: number
  
  // Technical details
  deviceType: 'mobile' | 'desktop' | 'tablet'
  connectionQuality: 'excellent' | 'good' | 'poor'
  technicalIssues?: string[]
  
  createdAt: number
}