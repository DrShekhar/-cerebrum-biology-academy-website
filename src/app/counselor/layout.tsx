// Force dynamic rendering to prevent auth issues during static build
// This MUST be in a Server Component (no 'use client') for Next.js to respect it
export const dynamic = 'force-dynamic'

import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { headers } from 'next/headers'
import CounselorLayoutClient from './CounselorLayoutClient'

export default async function CounselorLayout({ children }: { children: React.ReactNode }) {
  // Server-side guard: counselor APIs were already role-gated, but the pages
  // relied on client-only checks — a signed-out visitor briefly received the
  // dashboard shell. Sessions without COUNSELOR/ADMIN never render it now.
  const session = await auth()
  if (!session?.user) {
    const headerList = await headers()
    const pathname = headerList.get('x-pathname') || '/counselor'
    redirect(`/sign-in?redirect_url=${encodeURIComponent(pathname)}`)
  }

  const role = (session.user.role || '').toUpperCase()
  if (role !== 'COUNSELOR' && role !== 'ADMIN') {
    redirect('/dashboard?error=counselor_required')
  }

  return <CounselorLayoutClient>{children}</CounselorLayoutClient>
}
