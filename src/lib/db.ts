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
const APP_ID = process.env.NEXT_PUBLIC_INSTANT_APP_ID as string

if (!APP_ID) {
  console.warn('NEXT_PUBLIC_INSTANT_APP_ID environment variable is not set. Using demo mode.')
}

export const db = init({
  appId: APP_ID || 'demo-app-id',
})

// Export utilities
export { tx, id }
