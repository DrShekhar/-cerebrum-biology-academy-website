import AdminDashboard from './AdminDashboardClient'

// Auth-gated, user-specific admin dashboard. Server wrapper forces dynamic
// rendering so the client shell is never statically prerendered — the client
// bundle references a browser-only global (`location`) deep in its tree, which
// threw "location is not defined" during build-time SSG. Route config is only
// honored on a server component, so the page.tsx wrapper (not the 'use client'
// child) carries it.
export const dynamic = 'force-dynamic'

export default function AdminDashboardPage() {
  return <AdminDashboard />
}
