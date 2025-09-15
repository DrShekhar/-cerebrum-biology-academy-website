import { MyEnrollments } from '@/components/student/MyEnrollments'

export default function EnrollmentsPage() {
  return <MyEnrollments />
}

export const metadata = {
  title: 'My Enrollments | Cerebrum Biology Academy',
  description:
    'Track your course progress and manage your enrollments at Cerebrum Biology Academy.',
}

// Make this page dynamic to avoid SSR issues
export const dynamic = 'force-dynamic'
