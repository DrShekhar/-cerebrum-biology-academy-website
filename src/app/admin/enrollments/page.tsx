import { EnrollmentDashboard } from '@/components/admin/EnrollmentDashboard'

export default function AdminEnrollmentsPage() {
  // In production, you would implement proper authentication and authorization
  const isAdmin = true // This should be checked from your auth system

  return <EnrollmentDashboard isAdmin={isAdmin} />
}

export const metadata = {
  title: 'Enrollment Dashboard | Admin',
  description: 'Manage student enrollments and track payments.',
}
