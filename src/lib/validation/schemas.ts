import { z } from 'zod'

// Common validation patterns
export const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/
export const indianPhoneRegex = /^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/

// User validation schemas
export const userRegistrationSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters')
    .regex(/^[a-zA-Z\s]+$/, 'Name can only contain letters and spaces'),

  email: z
    .string()
    .email('Please enter a valid email address')
    .max(255, 'Email must be less than 255 characters')
    .toLowerCase(),

  phone: z
    .string()
    .regex(indianPhoneRegex, 'Please enter a valid Indian phone number')
    .transform((phone) => phone.replace(/[\s\-\+]/g, '')), // Clean phone number

  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(128, 'Password must be less than 128 characters')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Password must contain at least one uppercase letter, one lowercase letter, and one number'
    ),

  role: z.enum(['STUDENT', 'PARENT', 'TEACHER', 'ADMIN']).default('STUDENT'),

  profile: z
    .object({
      currentClass: z
        .enum(['CLASS_9', 'CLASS_10', 'CLASS_11', 'CLASS_12', 'DROPPER', 'FOUNDATION'])
        .optional(),
      city: z.string().max(100).optional(),
      school: z.string().max(200).optional(),
      parentPhone: z.string().regex(indianPhoneRegex).optional(),
      targetScore: z.number().min(0).max(720).optional(),
    })
    .optional(),
})

export const userLoginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
})

// Demo booking validation schemas
export const demoBookingSchema = z.object({
  studentName: z
    .string()
    .min(2, 'Student name must be at least 2 characters')
    .max(100, 'Student name must be less than 100 characters')
    .regex(/^[a-zA-Z\s]+$/, 'Student name can only contain letters and spaces'),

  email: z
    .string()
    .email('Please enter a valid email address')
    .max(255, 'Email must be less than 255 characters')
    .toLowerCase()
    .optional(),

  phone: z
    .string()
    .regex(indianPhoneRegex, 'Please enter a valid Indian phone number')
    .transform((phone) => phone.replace(/[\s\-\+]/g, '')),

  studentClass: z
    .enum(['CLASS_9', 'CLASS_10', 'CLASS_11', 'CLASS_12', 'DROPPER', 'FOUNDATION'])
    .optional(),

  preferredDate: z
    .string()
    .min(1, 'Preferred date is required')
    .refine((date) => {
      // Parse date components explicitly to ensure local timezone
      const [year, month, day] = date.split('-').map(Number)
      const selectedDate = new Date(year, month - 1, day, 0, 0, 0, 0)

      const today = new Date()
      today.setHours(0, 0, 0, 0)

      return selectedDate >= today
    }, 'Preferred date must be today or in the future'),

  preferredTime: z
    .string()
    .min(1, 'Preferred time is required')
    .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]\s?(AM|PM)?$/i, 'Please enter a valid time format'),

  message: z.string().max(1000, 'Message must be less than 1000 characters').optional(),

  courseId: z.string().uuid().optional(),

  // Marketing fields
  source: z.string().max(50).optional(),
  utmSource: z.string().max(100).optional(),
  utmMedium: z.string().max(100).optional(),
  utmCampaign: z.string().max(100).optional(),
})

// Enrollment validation schemas
export const enrollmentSchema = z.object({
  userId: z.string().uuid('Invalid user ID'),
  courseId: z.string().uuid('Invalid course ID'),
  paymentPlan: z.enum(['FULL', 'QUARTERLY', 'MONTHLY', 'CUSTOM']).default('FULL'),

  // Payment details
  totalFees: z
    .number()
    .min(0, 'Total fees must be positive')
    .max(10000000, 'Total fees seems too high'), // ₹1,00,000 in paise

  startDate: z
    .string()
    .optional()
    .refine((date) => {
      if (!date) return true
      const selectedDate = new Date(date)
      const today = new Date()
      return selectedDate >= today
    }, 'Start date must be today or in the future'),
})

// Payment validation schemas
export const paymentSchema = z.object({
  amount: z
    .number()
    .min(100, 'Minimum payment amount is ₹1') // 100 paise = ₹1
    .max(10000000, 'Maximum payment amount is ₹1,00,000'),

  currency: z.string().default('INR'),

  paymentMethod: z.enum([
    'RAZORPAY_UPI',
    'RAZORPAY_CARD',
    'RAZORPAY_NETBANKING',
    'RAZORPAY_WALLET',
    'BANK_TRANSFER',
    'CASH',
    'CHEQUE',
  ]),

  enrollmentId: z.string().uuid().optional(),

  // Razorpay specific fields
  razorpayOrderId: z.string().optional(),
  razorpayPaymentId: z.string().optional(),
  razorpaySignature: z.string().optional(),
})

// Course validation schemas
export const courseSchema = z.object({
  name: z
    .string()
    .min(3, 'Course name must be at least 3 characters')
    .max(200, 'Course name must be less than 200 characters'),

  description: z.string().max(2000, 'Description must be less than 2000 characters').optional(),

  type: z.enum(['NEET_COMPLETE', 'CLASS_11', 'CLASS_12', 'DROPPER', 'FOUNDATION', 'CRASH_COURSE']),

  class: z.enum(['CLASS_9', 'CLASS_10', 'CLASS_11', 'CLASS_12', 'DROPPER', 'FOUNDATION']),

  duration: z
    .number()
    .min(1, 'Duration must be at least 1 month')
    .max(24, 'Duration cannot exceed 24 months'),

  totalFees: z
    .number()
    .min(0, 'Total fees must be positive')
    .max(10000000, 'Total fees seems too high'),

  features: z.array(z.string().max(100)).max(20, 'Maximum 20 features allowed'),

  isActive: z.boolean().default(true),
  sortOrder: z.number().min(0).default(0),
})

// Communication validation schemas
export const communicationSchema = z.object({
  type: z.enum([
    'WELCOME_MESSAGE',
    'DEMO_CONFIRMATION',
    'DEMO_REMINDER',
    'ENROLLMENT_CONFIRMATION',
    'PAYMENT_REMINDER',
    'COURSE_UPDATE',
    'MARKETING_MESSAGE',
    'SUPPORT_MESSAGE',
    'FEEDBACK_REQUEST',
    'CUSTOM_MESSAGE',
  ]),

  channel: z.enum(['WHATSAPP', 'EMAIL', 'SMS', 'PHONE_CALL', 'IN_APP_NOTIFICATION']),

  content: z
    .string()
    .min(1, 'Content is required')
    .max(4000, 'Content must be less than 4000 characters'),

  subject: z.string().max(200, 'Subject must be less than 200 characters').optional(),

  userId: z.string().uuid().optional(),
  demoBookingId: z.string().uuid().optional(),
})

// Admin operations validation
export const adminUpdateSchema = z.object({
  status: z.string().optional(),
  assignedTo: z.string().uuid().optional(),
  notes: z.string().max(1000).optional(),
  followUpDate: z.string().optional(),
})

// Search and pagination schemas
export const paginationSchema = z.object({
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(20),
  search: z.string().max(100).optional(),
  sortBy: z.string().max(50).optional(),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
})

// Date range validation
export const dateRangeSchema = z
  .object({
    startDate: z.string().optional(),
    endDate: z.string().optional(),
  })
  .refine((data) => {
    if (data.startDate && data.endDate) {
      return new Date(data.startDate) <= new Date(data.endDate)
    }
    return true
  }, 'Start date must be before end date')

// API response schemas
export const apiResponseSchema = z.object({
  success: z.boolean(),
  data: z.any().optional(),
  error: z.string().optional(),
  message: z.string().optional(),
  pagination: z
    .object({
      page: z.number(),
      limit: z.number(),
      total: z.number(),
      pages: z.number(),
    })
    .optional(),
})

// Security validation
export const securityHeaderSchema = z.object({
  'user-agent': z.string().max(500).optional(),
  'x-forwarded-for': z.string().max(100).optional(),
  'x-real-ip': z.string().max(45).optional(),
  referer: z.string().max(500).optional(),
})

// File upload validation (for future use)
export const fileUploadSchema = z.object({
  filename: z
    .string()
    .max(255, 'Filename too long')
    .regex(/^[a-zA-Z0-9\-_\.]+$/, 'Invalid filename characters'),

  size: z.number().max(5 * 1024 * 1024, 'File size must be less than 5MB'),

  mimetype: z.enum(
    [
      'image/jpeg',
      'image/png',
      'image/webp',
      'application/pdf',
      'text/csv',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    ],
    { message: 'Unsupported file type' }
  ),
})
