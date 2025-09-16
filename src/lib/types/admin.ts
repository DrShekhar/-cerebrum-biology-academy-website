// Admin System Types for Cerebrum Biology Academy
// Enterprise-level type definitions for comprehensive admin panel

export interface User {
  id: string
  email: string
  phone: string
  whatsappNumber?: string
  name: string
  avatar?: string
  role: 'student' | 'admin' | 'faculty' | 'manager'
  status: 'active' | 'inactive' | 'suspended'
  subscription: 'free' | 'premium' | 'enterprise'
  lastLogin: Date
  registrationDate: Date
  preferences: UserPreferences
  analytics: UserAnalytics
}

export interface UserPreferences {
  notifications: {
    email: boolean
    sms: boolean
    whatsapp: boolean
    push: boolean
  }
  language: string
  timezone: string
  marketingConsent: boolean
}

export interface UserAnalytics {
  totalSessions: number
  totalTimeSpent: number // in minutes
  coursesViewed: string[]
  coursesEnrolled: string[]
  completionRate: number
  lastActivity: Date
  deviceInfo: DeviceInfo
  locationData: LocationData
}

export interface DeviceInfo {
  type: 'desktop' | 'mobile' | 'tablet'
  browser: string
  os: string
  screenResolution: string
}

export interface LocationData {
  country: string
  state: string
  city: string
  timezone: string
}

// Demo Booking System
export interface DemoBooking {
  id: string
  userId: string
  studentName: string
  phone: string
  whatsappNumber?: string
  email: string
  courseInterest: string[]
  preferredDate: Date
  preferredTime: TimeSlot
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled' | 'rescheduled'
  assignedFaculty?: string
  notes?: string
  remindersSent: number
  createdAt: Date
  updatedAt: Date
  completionFeedback?: CompletionFeedback
}

export interface TimeSlot {
  start: string // HH:MM format
  end: string
  timezone: string
}

export interface CompletionFeedback {
  rating: number
  comments: string
  enrollmentInterest: number // 1-10 scale
  followUpRequired: boolean
}

// Faculty Management
export interface Faculty {
  id: string
  name: string
  email: string
  phone: string
  specialization: string[]
  experience: number
  rating: number
  availability: FacultyAvailability
  stats: FacultyStats
  isActive: boolean
}

export interface FacultyAvailability {
  weeklySchedule: WeeklySchedule
  exceptions: AvailabilityException[]
  timezone: string
}

export interface WeeklySchedule {
  [key: string]: DaySchedule // 'monday', 'tuesday', etc.
}

export interface DaySchedule {
  isAvailable: boolean
  slots: TimeSlot[]
  maxBookings: number
}

export interface AvailabilityException {
  date: Date
  type: 'unavailable' | 'custom_hours'
  customSlots?: TimeSlot[]
  reason?: string
}

export interface FacultyStats {
  totalDemos: number
  completedDemos: number
  averageRating: number
  conversionRate: number
  totalStudents: number
}

// Analytics & Tracking
export interface UserActivity {
  id: string
  userId: string
  type: ActivityType
  data: Record<string, any>
  timestamp: Date
  sessionId: string
  ipAddress?: string
  userAgent?: string
}

export type ActivityType = 
  | 'page_view'
  | 'course_view'
  | 'demo_booking'
  | 'payment_attempt'
  | 'cart_abandonment'
  | 'download'
  | 'login'
  | 'logout'
  | 'search'
  | 'filter_use'
  | 'contact_form'
  | 'whatsapp_click'
  | 'phone_call'

// Payment & Cart Management
export interface CartItem {
  courseId: string
  courseName: string
  price: number
  discount?: number
  finalPrice: number
}

export interface Cart {
  id: string
  userId: string
  items: CartItem[]
  totalAmount: number
  discountCode?: string
  discountAmount: number
  finalAmount: number
  status: 'active' | 'abandoned' | 'converted' | 'expired'
  createdAt: Date
  updatedAt: Date
  abandonedAt?: Date
  remindersSent: number
}

export interface Payment {
  id: string
  userId: string
  cartId: string
  amount: number
  status: 'pending' | 'processing' | 'completed' | 'failed' | 'refunded'
  method: 'upi' | 'card' | 'netbanking' | 'wallet'
  transactionId: string
  gatewayResponse: Record<string, any>
  createdAt: Date
  completedAt?: Date
}

// CRM & Contact Management
export interface Contact {
  id: string
  name: string
  email?: string
  phone: string
  whatsappNumber?: string
  source: 'website' | 'social' | 'referral' | 'advertisement' | 'direct'
  status: 'new' | 'contacted' | 'qualified' | 'enrolled' | 'lost'
  assignedTo?: string
  tags: string[]
  notes: ContactNote[]
  leadScore: number
  createdAt: Date
  lastContactedAt?: Date
}

export interface ContactNote {
  id: string
  content: string
  type: 'call' | 'email' | 'whatsapp' | 'meeting' | 'general'
  createdBy: string
  createdAt: Date
}

// Marketing Automation
export interface Campaign {
  id: string
  name: string
  type: 'email' | 'sms' | 'whatsapp' | 'push'
  status: 'draft' | 'scheduled' | 'running' | 'completed' | 'paused'
  targetAudience: AudienceSegment
  content: CampaignContent
  schedule: CampaignSchedule
  analytics: CampaignAnalytics
  createdAt: Date
  createdBy: string
}

export interface AudienceSegment {
  criteria: {
    userType?: ('free' | 'premium')[]
    courseInterest?: string[]
    lastActivity?: { min?: Date; max?: Date }
    location?: string[]
    ageRange?: { min: number; max: number }
  }
  estimatedReach: number
}

export interface CampaignContent {
  subject?: string
  message: string
  mediaUrl?: string
  ctaText?: string
  ctaUrl?: string
}

export interface CampaignSchedule {
  type: 'immediate' | 'scheduled' | 'recurring'
  sendAt?: Date
  recurringPattern?: {
    frequency: 'daily' | 'weekly' | 'monthly'
    interval: number
    endDate?: Date
  }
}

export interface CampaignAnalytics {
  sent: number
  delivered: number
  opened: number
  clicked: number
  converted: number
  unsubscribed: number
  bounced: number
}

// Notifications System
export interface Notification {
  id: string
  type: NotificationType
  title: string
  message: string
  data?: Record<string, any>
  recipients: string[] // user IDs
  channels: ('email' | 'sms' | 'whatsapp' | 'push' | 'in_app')[]
  priority: 'low' | 'medium' | 'high' | 'urgent'
  status: 'queued' | 'sending' | 'sent' | 'failed'
  scheduledFor?: Date
  createdAt: Date
  sentAt?: Date
}

export type NotificationType = 
  | 'demo_booking'
  | 'payment_success'
  | 'payment_failed'
  | 'course_enrollment'
  | 'cart_abandonment'
  | 'system_alert'
  | 'marketing'
  | 'reminder'

// Dashboard Analytics
export interface DashboardMetrics {
  overview: {
    totalUsers: number
    activeUsers: number
    newRegistrations: number
    totalRevenue: number
    conversionRate: number
    averageSessionTime: number
  }
  demos: {
    totalBookings: number
    pendingBookings: number
    completedToday: number
    conversionRate: number
    averageRating: number
  }
  courses: {
    totalEnrollments: number
    popularCourses: CourseMetric[]
    completionRates: Record<string, number>
  }
  revenue: {
    totalRevenue: number
    monthlyGrowth: number
    averageOrderValue: number
    pendingPayments: number
  }
  marketing: {
    activeCampaigns: number
    emailOpenRate: number
    whatsappResponseRate: number
    leadConversionRate: number
  }
}

export interface CourseMetric {
  courseId: string
  courseName: string
  enrollments: number
  revenue: number
  rating: number
}

// Real-time Events
export interface RealTimeEvent {
  id: string
  type: string
  data: Record<string, any>
  timestamp: Date
  userId?: string
  sessionId?: string
}

// Admin User Roles & Permissions
export interface AdminRole {
  id: string
  name: string
  permissions: Permission[]
  description: string
}

export interface Permission {
  resource: string // 'users', 'courses', 'payments', etc.
  actions: ('read' | 'write' | 'delete' | 'manage')[]
}

export interface AdminUser {
  id: string
  name: string
  email: string
  role: AdminRole
  lastLogin: Date
  isActive: boolean
  permissions: Permission[]
}