import { init, tx, id } from '@instantdb/react'

// Define your database schema
export interface User {
  id: string
  email: string
  name: string
  phone?: string
  createdAt: number
  profile?: {
    class?: '11th' | '12th' | 'Dropper'
    targetYear?: string
    interestedCourses?: string[]
    location?: string
  }
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
const rawAppId = process.env.NEXT_PUBLIC_INSTANT_APP_ID as string

// Validate that APP_ID is a valid UUID format
// InstantDB requires a valid UUID, not a placeholder string
const isValidUuid = (str: string) => {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
  return str && uuidRegex.test(str)
}

const APP_ID = isValidUuid(rawAppId) ? rawAppId : undefined

if (!APP_ID) {
  console.warn(
    'NEXT_PUBLIC_INSTANT_APP_ID environment variable is not set or invalid. InstantDB features will be limited.'
  )
}

// Create a mock db object when APP_ID is not available
// This prevents crashes while allowing the app to function with Prisma
export const db: any = APP_ID
  ? init({ appId: APP_ID })
  : {
      // Mock object for when InstantDB is not configured
      useAuth: () => ({ user: null, isLoading: false, error: null }),
      auth: null,
    }

// Export utilities
export { tx, id }
