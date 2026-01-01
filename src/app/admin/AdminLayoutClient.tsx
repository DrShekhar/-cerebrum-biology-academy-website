'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useClerkRole } from '@/hooks/useClerkRole'

function AdminAuthWrapper({ children }: { children: React.ReactNode }) {
  const { isLoaded, isSignedIn, isAdmin } = useClerkRole()
  const router = useRouter()

  useEffect(() => {
    if (!isLoaded) return

    if (!isSignedIn) {
      router.push('/admin/login')
      return
    }

    if (!isAdmin) {
      router.push('/dashboard?error=admin_required')
      return
    }
  }, [isLoaded, isSignedIn, isAdmin, router])

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <div className="w-8 h-8 bg-white rounded-full animate-pulse" />
          </div>
          <div className="text-lg font-semibold text-gray-700 mb-2">Checking admin access...</div>
          <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
        </div>
      </div>
    )
  }

  if (!isSignedIn || !isAdmin) {
    return null
  }

  return <div className="admin-layout">{children}</div>
}

export default function AdminLayoutClient({ children }: { children: React.ReactNode }) {
  return <AdminAuthWrapper>{children}</AdminAuthWrapper>
}
