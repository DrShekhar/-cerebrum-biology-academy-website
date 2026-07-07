import { redirect } from 'next/navigation'

export default function AdminEnrollmentsPage() {
  redirect('/admin/courses/enrollments')
}

export const metadata = {
  title: 'Enrollment Dashboard | Admin',
  description: 'Manage student enrollments and track payments.',
}
