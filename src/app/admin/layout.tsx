// Force dynamic rendering to prevent auth issues during static build
// This MUST be in a Server Component (no 'use client') for Next.js to respect it
export const dynamic = 'force-dynamic'

import AdminLayoutClient from './AdminLayoutClient'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AdminLayoutClient>{children}</AdminLayoutClient>
}
