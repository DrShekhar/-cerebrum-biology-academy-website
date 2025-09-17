import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Admin Panel - Cerebrum Biology Academy',
  description: 'Admin dashboard for Cerebrum Biology Academy management',
  robots: 'noindex, nofollow',
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <div className="admin-layout">{children}</div>
}
