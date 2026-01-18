// Force dynamic rendering to prevent auth issues during static build
// This MUST be in a Server Component (no 'use client') for Next.js to respect it
export const dynamic = 'force-dynamic'

import CounselorLayoutClient from './CounselorLayoutClient'

export default function CounselorLayout({ children }: { children: React.ReactNode }) {
  return <CounselorLayoutClient>{children}</CounselorLayoutClient>
}
