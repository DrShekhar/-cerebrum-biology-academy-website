import { Metadata } from 'next'
import { MyEnrollments } from '@/components/student/MyEnrollments'

export default function EnrollmentsPage() {
  return <MyEnrollments />
}

export const metadata: Metadata = {
  title: 'My Enrollments',
  description:
    'Track your course progress and manage your enrollments at Cerebrum Biology Academy.',
  robots: { index: false, follow: false },
}
