'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useFirebaseSession } from '@/hooks/useFirebaseSession'

function AdminAuthWrapper({ children }: { children: React.ReactNode }) {
  const { isLoading, isAuthenticated, user } = useFirebaseSession()
  const router = useRouter()
  const [isAdmin, setIsAdmin] = useState(false)
  const [isCheckingRole, setIsCheckingRole] = useState(true)

  // SECURITY: Auth bypass removed from client-side code
  // Server-side bypass (BYPASS_CRM_AUTH) only works in non-production environments

  useEffect(() => {
    if (isLoading) return

    if (!isAuthenticated) {
      router.push('/admin/login')
      return
    }

    // Check if user has admin role
    const userRole = user?.role?.toLowerCase()
    const hasAdminAccess = userRole === 'admin' || userRole === 'owner'
    setIsAdmin(hasAdminAccess)
    setIsCheckingRole(false)

    if (!hasAdminAccess) {
      router.push('/dashboard?error=admin_required')
    }
  }, [isLoading, isAuthenticated, user, router])

  if (isLoading || isCheckingRole) {
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

  if (!isAuthenticated || !isAdmin) {
    return null
  }

  return <div className="admin-layout">{children}</div>
}

export default function AdminLayoutClient({ children }: { children: React.ReactNode }) {
  return <AdminAuthWrapper>{children}</AdminAuthWrapper>
}
