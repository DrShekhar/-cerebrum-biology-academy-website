import { EnrollmentDashboard } from '@/components/admin/EnrollmentDashboard'

export default function CourseEnrollmentsPage() {
  return <EnrollmentDashboard isAdmin={true} />
}

export const metadata = {
  title: 'Course Enrollments | Admin | Cerebrum Biology Academy',
  description: 'View and manage course enrollments, payment statuses, and batch assignments.',
}
