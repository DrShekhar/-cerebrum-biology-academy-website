import { z } from 'zod'

// Mock Indian phone regex
export const indianPhoneRegex = /^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/
export const phoneRegex = /^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/

// Mock schemas for testing
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
    .transform((phone) => phone.replace(/[\s\-]/g, '')),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Password must contain uppercase, lowercase, and number'
    ),
  role: z.enum(['STUDENT', 'PARENT', 'TEACHER', 'ADMIN']).default('STUDENT'),
})

export const userLoginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
})

export const demoBookingSchema = z.object({
  studentName: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters'),
  email: z.string().email('Please enter a valid email address').optional(),
  phone: z
    .string()
    .regex(indianPhoneRegex, 'Please enter a valid Indian phone number')
    .transform((phone) => phone.replace(/[\s\-]/g, '')),
  preferredDate: z.string().refine((date) => {
    const selectedDate = new Date(date)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return selectedDate >= today
  }, 'Date must be today or in the future'),
  preferredTime: z
    .string()
    .regex(
      /^(([01]?[0-9]|2[0-3]):[0-5][0-9](\s?(AM|PM))?|([0-9]|1[0-2]):[0-5][0-9]\s?(AM|PM))$/i,
      'Invalid time format'
    ),
  message: z.string().max(1000, 'Message must be less than 1000 characters').optional(),
  studentClass: z.enum(['CLASS_11', 'CLASS_12', 'DROPPER']),
})
