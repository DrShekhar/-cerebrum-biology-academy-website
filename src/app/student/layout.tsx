/**
 * Student Portal Layout — wraps every /student/* page in the shared shell
 * (top nav on desktop, bottom tabs on mobile) so all built features are
 * reachable without knowing the URL.
 */

import { StudentShell } from '@/components/student/StudentShell'

export default function StudentLayout({ children }: { children: React.ReactNode }) {
  return <StudentShell>{children}</StudentShell>
}
