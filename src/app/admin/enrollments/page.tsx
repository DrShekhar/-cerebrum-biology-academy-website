// Force dynamic rendering to prevent Clerk auth issues during static build
export const dynamic = 'force-dynamic'

import { EnrollmentDashboard } from '@/components/admin/EnrollmentDashboard'

export default function AdminEnrollmentsPage() {
  // In production, you would implement proper authentication and authorization
  const isAdmin = true // This should be checked from your auth system

  return <EnrollmentDashboard isAdmin={isAdmin} />
}

export const metadata = {
  title: 'Enrollment Dashboard | Admin | Cerebrum Biology Academy',
  description: 'Manage student enrollments and track payments.',
}
