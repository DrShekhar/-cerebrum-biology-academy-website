import { init, tx, id } from '@instantdb/react'

// Define your database schema for NEET coaching platform
export interface User {
  id: string
  // Primary authentication fields (mobile-first for Indian market)
  mobile: string // Primary identifier for NEET students in India
  email?: string // Optional - many students don't have email
  name: string
  password?: string // Optional - OTP-first authentication
  role: 'student' | 'parent' | 'teacher' | 'admin'

  // Remarketing and communication fields
  whatsappNumber?: string // Often different from mobile, critical for remarketing
  isWhatsappSame?: boolean // True if WhatsApp number is same as mobile
  communicationPreference: 'sms' | 'whatsapp' | 'email' | 'call'

  // Verification and security
  isMobileVerified: boolean
  isEmailVerified: boolean
  lastOtpSent?: number
  otpAttempts?: number

  createdAt: number
  updatedAt: number
  lastActiveAt?: number

  profile?: {
    // Student-specific fields
    currentClass?: '10th' | '11th' | '12th' | 'Dropper'
    parentMobile?: string // Parent's mobile for communication
    parentWhatsapp?: string // Parent's WhatsApp for updates
    targetScore?: number
    weakSubjects?: ('Physics' | 'Chemistry' | 'Biology')[]
    studyHours?: number
    registrationDate?: number
    enrolledCourses?: string[]

    // Parent-specific fields
    childrenIds?: string[]
    relationToStudent?: 'father' | 'mother' | 'guardian'

    // Teacher-specific fields
    subjects?: string[]
    experience?: number
    qualification?: string

    // Common fields for remarketing
    location?: string
    city?: string
    state?: string
    school?: string
    coachingHistory?: string[] // Previous coaching institutes
    referralCode?: string
    referredBy?: string
    targetYear?: string

    // Marketing consent
    marketingConsent: boolean
    whatsappConsent: boolean
    smsConsent: boolean
  }
}

// OTP management for mobile-first authentication
export interface OtpVerification {
  id: string
  mobile: string
  otp: string
  purpose: 'registration' | 'login' | 'password_reset' | 'mobile_verification'
  expiresAt: number
  attempts: number
  isUsed: boolean
  createdAt: number
}

// Remarketing and lead tracking
export interface MarketingLead {
  id: string
  mobile?: string
  whatsapp?: string
  email?: string
  name?: string
  source: 'website' | 'whatsapp' | 'referral' | 'facebook' | 'google' | 'offline'
  campaign?: string
  utmSource?: string
  utmMedium?: string
  utmCampaign?: string
  status: 'new' | 'contacted' | 'interested' | 'enrolled' | 'not_interested'
  assignedTo?: string // Sales team member
  lastContactedAt?: number
  nextFollowupAt?: number
  notes?: string[]
  createdAt: number
}

// Authentication logs for security auditing
export interface AuthLog {
  id: string
  userId: string
  event: 'signin' | 'signout' | 'registration' | 'password_reset' | 'failed_login'
  timestamp: number
  ip?: string
  userAgent?: string
  metadata?: Record<string, any>
}

export interface DemoBooking {
  id: string
  userId: string
  courseId: string
  studentName: string
  email: string
  phone: string
  preferredDate: string
  preferredTime: string
  message?: string
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
  createdAt: number
}

export interface Enrollment {
  id: string
  userId: string
  courseId: string
  studentName: string
  email: string
  phone: string
  paymentStatus: 'pending' | 'paid' | 'failed'
  enrollmentDate: number
  courseStartDate: string
  batchAssigned?: string
}

export interface ContactSubmission {
  id: string
  name: string
  email: string
  phone: string
  course: string
  message?: string
  preferredTime?: string
  status: 'new' | 'contacted' | 'converted'
  createdAt: number
}

// Initialize the database
// You'll need to get your app ID from InstantDB dashboard
const APP_ID = process.env.NEXT_PUBLIC_INSTANT_APP_ID as string

// Only warn in development mode, not during build
if (!APP_ID && process.env.NODE_ENV === 'development') {
  console.warn('NEXT_PUBLIC_INSTANT_APP_ID environment variable is not set. Using demo mode.')
}

export const db = init({
  appId: APP_ID || 'demo-app-id',
})

// Export utilities
export { tx, id }
