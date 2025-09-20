'use client'

import type { Metadata } from 'next'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { SessionProvider } from '@/components/providers/SessionProvider'

// Note: metadata can't be used in client components, will be handled by individual pages

function AdminAuthWrapper({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'loading') return // Still loading

    if (status === 'unauthenticated' || !session?.user || session.user.role !== 'admin') {
      router.push('/admin/login')
      return
    }
  }, [status, session, router])

  // Show loading while checking authentication
  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <div className="w-8 h-8 bg-white rounded-full animate-pulse" />
          </div>
          <div className="text-lg font-semibold text-gray-700 mb-2">Checking admin access...</div>
          <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
        </div>
      </div>
    )
  }

  // Don't render children if not authenticated
  if (status === 'unauthenticated' || !session?.user || session.user.role !== 'admin') {
    return null
  }

  return <div className="admin-layout">{children}</div>
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <AdminAuthWrapper>{children}</AdminAuthWrapper>
    </SessionProvider>
  )
}
