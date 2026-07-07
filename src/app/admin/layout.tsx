// Force dynamic rendering to prevent auth issues during static build
// This MUST be in a Server Component (no 'use client') for Next.js to respect it
export const dynamic = 'force-dynamic'

import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { headers } from 'next/headers'
import AdminLayoutClient from './AdminLayoutClient'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  // Server-side session pre-check: unauthenticated visitors never receive the
  // admin shell. Role/owner decision stays client-side in AdminLayoutClient
  // (owner is a phone-match the JWT may not carry). /admin/login is exempt so
  // the login page can render for signed-out users.
  const headerList = await headers()
  const pathname = headerList.get('x-pathname') || headerList.get('x-invoke-path') || ''
  const isLoginRoute = pathname === '/admin/login'

  if (!isLoginRoute) {
    const session = await auth()
    if (!session?.user) {
      redirect(`/sign-in?redirect_url=${encodeURIComponent(pathname || '/admin')}`)
    }
  }

  return <AdminLayoutClient>{children}</AdminLayoutClient>
}
