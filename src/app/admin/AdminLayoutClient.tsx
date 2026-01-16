'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useFirebaseSession } from '@/hooks/useFirebaseSession'

function AdminAuthWrapper({ children }: { children: React.ReactNode }) {
  const { isLoading, isAuthenticated, user } = useFirebaseSession()
  const router = useRouter()
  const [isAdmin, setIsAdmin] = useState(false)
  const [isCheckingRole, setIsCheckingRole] = useState(true)

  // DEV MODE: Skip authentication if bypass is enabled
  const isBypassEnabled = process.env.NEXT_PUBLIC_BYPASS_CRM_AUTH === 'true'

  useEffect(() => {
    if (isBypassEnabled) {
      setIsAdmin(true)
      setIsCheckingRole(false)
      return
    }

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
  }, [isLoading, isAuthenticated, user, router, isBypassEnabled])

  if (!isBypassEnabled && (isLoading || isCheckingRole)) {
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

  if (!isBypassEnabled && (!isAuthenticated || !isAdmin)) {
    return null
  }

  return <div className="admin-layout">{children}</div>
}

export default function AdminLayoutClient({ children }: { children: React.ReactNode }) {
  return <AdminAuthWrapper>{children}</AdminAuthWrapper>
}
