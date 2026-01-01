// Force dynamic rendering to prevent Clerk auth issues during static build
export const dynamic = 'force-dynamic'

import { redirect } from 'next/navigation'

export default function CounselorDashboard() {
  redirect('/counselor/leads')
}
