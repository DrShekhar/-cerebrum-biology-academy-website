'use client'

import React, { ReactNode, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { UserRole } from '@/generated/prisma'
import LoadingSpinner from '@/components/ui/LoadingSpinner'

interface ProtectedRouteProps {
  children: ReactNode
  requireAuth?: boolean
  allowedRoles?: UserRole[]
  requiredPermissions?: string[]
  fallbackUrl?: string
  loadingComponent?: ReactNode
  unauthorizedComponent?: ReactNode
}

export default function ProtectedRoute({
  children,
  requireAuth = true,
  allowedRoles,
  requiredPermissions,
  fallbackUrl = '/auth/signin',
  loadingComponent,
  unauthorizedComponent
}: ProtectedRouteProps) {
  const { user, isLoading, isAuthenticated, hasRole, hasPermission } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading) {
      // If authentication is required but user is not authenticated
      if (requireAuth && !isAuthenticated) {
        const currentUrl = encodeURIComponent(window.location.pathname + window.location.search)
        router.push(`${fallbackUrl}?returnUrl=${currentUrl}`)
        return
      }

      // If specific roles are required
      if (allowedRoles && user && !hasRole(allowedRoles)) {
        router.push('/unauthorized')
        return
      }

      // If specific permissions are required
      if (requiredPermissions && user) {
        const hasAllPermissions = requiredPermissions.every(permission =>
          hasPermission(permission)
        )
        if (!hasAllPermissions) {
          router.push('/unauthorized')
          return
        }
      }
    }
  }, [isLoading, isAuthenticated, user, requireAuth, allowedRoles, requiredPermissions, hasRole, hasPermission, router, fallbackUrl])

  // Show loading state
  if (isLoading) {
    return loadingComponent || <LoadingSpinner />
  }

  // If auth is required but user is not authenticated
  if (requireAuth && !isAuthenticated) {
    return null // Will redirect in useEffect
  }

  // If roles are specified and user doesn't have required role
  if (allowedRoles && user && !hasRole(allowedRoles)) {
    return unauthorizedComponent || (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="mb-4">
            <svg className="mx-auto h-16 w-16 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h2>
          <p className="text-gray-600 mb-6">
            You don't have permission to access this page. Required role: {allowedRoles.join(' or ')}.
          </p>
          <button
            onClick={() => router.push('/')}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go to Homepage
          </button>
        </div>
      </div>
    )
  }

  // If permissions are specified and user doesn't have required permissions
  if (requiredPermissions && user) {
    const hasAllPermissions = requiredPermissions.every(permission =>
      hasPermission(permission)
    )
    if (!hasAllPermissions) {
      return unauthorizedComponent || (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="mb-4">
              <svg className="mx-auto h-16 w-16 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h2>
            <p className="text-gray-600 mb-6">
              You don't have the required permissions to access this page.
            </p>
            <button
              onClick={() => router.push('/')}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Go to Homepage
            </button>
          </div>
        </div>
      )
    }
  }

  // User is authorized, render children
  return <>{children}</>
}

// Convenience components for specific use cases
export function StudentRoute({ children, ...props }: Omit<ProtectedRouteProps, 'allowedRoles'>) {
  return (
    <ProtectedRoute allowedRoles={['STUDENT']} {...props}>
      {children}
    </ProtectedRoute>
  )
}

export function TeacherRoute({ children, ...props }: Omit<ProtectedRouteProps, 'allowedRoles'>) {
  return (
    <ProtectedRoute allowedRoles={['TEACHER', 'ADMIN']} {...props}>
      {children}
    </ProtectedRoute>
  )
}

export function AdminRoute({ children, ...props }: Omit<ProtectedRouteProps, 'allowedRoles'>) {
  return (
    <ProtectedRoute allowedRoles={['ADMIN']} {...props}>
      {children}
    </ProtectedRoute>
  )
}

export function ParentRoute({ children, ...props }: Omit<ProtectedRouteProps, 'allowedRoles'>) {
  return (
    <ProtectedRoute allowedRoles={['PARENT']} {...props}>
      {children}
    </ProtectedRoute>
  )
}