'use client'

import { useRouter, usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useOwnerAccess } from '@/hooks/useOwnerAccess'
import { AdminChrome } from '@/components/admin/AdminChrome'

// SINGLE admin guard. Access = ADMIN role OR owner (phone-match via
// useOwnerAccess). AdminLayout (chrome) no longer guards — this wrapper runs
// for every /admin route via the route layout.
function AdminAuthWrapper({ children }: { children: React.ReactNode }) {
  const { isLoading, isAuthenticated, user } = useAuth()
  const { isOwner, isCheckingOwner } = useOwnerAccess()
  const router = useRouter()
  const pathname = usePathname()
  const [isAdmin, setIsAdmin] = useState(false)
  const [isCheckingRole, setIsCheckingRole] = useState(true)

  // The login page lives under /admin but must NOT be guarded — otherwise an
  // unauthenticated visitor is redirected to /admin/login, which is itself
  // guarded, redirecting to /admin/login again → infinite "Checking admin
  // access…" loop. Let the login page render itself.
  const isLoginRoute = pathname === '/admin/login'

  // SECURITY: Auth bypass removed from client-side code
  // Server-side bypass (BYPASS_CRM_AUTH) only works in non-production environments

  useEffect(() => {
    if (isLoginRoute) {
      setIsCheckingRole(false)
      return
    }
    if (isLoading || isCheckingOwner) return

    if (!isAuthenticated) {
      // Go straight to the real sign-in (the /admin/login page just bounces here
      // anyway). Clear the spinner first so we never hang on this path.
      setIsCheckingRole(false)
      router.replace(`/sign-in?redirect_url=${encodeURIComponent(pathname || '/admin')}`)
      return
    }

    const hasAdminAccess = user?.role === 'ADMIN' || isOwner
    setIsAdmin(hasAdminAccess)
    setIsCheckingRole(false)

    if (!hasAdminAccess) {
      router.replace('/dashboard?error=admin_required')
    }
  }, [isLoading, isAuthenticated, user, router, pathname, isLoginRoute, isOwner, isCheckingOwner])

  // The login route renders without the admin gate.
  if (isLoginRoute) {
    return <>{children}</>
  }

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

  // Chrome (sidebar/topbar/bell) mounts here ONCE for every /admin page —
  // pages must not wrap themselves in AdminLayout/AdminChrome.
  return (
    <div className="admin-layout">
      <AdminChrome>{children}</AdminChrome>
    </div>
  )
}

export default function AdminLayoutClient({ children }: { children: React.ReactNode }) {
  return <AdminAuthWrapper>{children}</AdminAuthWrapper>
}
