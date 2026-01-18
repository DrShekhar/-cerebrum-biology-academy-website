'use client'

import { useMemo, useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useFirebaseSession } from './useFirebaseSession'
import {
  getDefaultDashboard,
  canAccessDashboard,
  getNavigationItems,
  needsOnboarding,
  getOnboardingRoute,
  getUpgradeMessage,
  type DashboardType,
  type User as UserFlowUser,
} from '@/lib/userFlow'

/**
 * Hook for managing user flow, dashboard access, and navigation
 */
export function useUserFlow() {
  // Use only Firebase session - InstantDB has been deprecated
  const { user: firebaseUser, isAuthenticated, isLoading } = useFirebaseSession()

  // Map Firebase user to the expected user format
  const user = firebaseUser ? {
    id: firebaseUser.id,
    email: firebaseUser.email,
    name: firebaseUser.name || firebaseUser.email?.split('@')[0] || 'User',
    phone: firebaseUser.phone,
    role: firebaseUser.role,
    createdAt: Date.now(),
    grade: undefined,
    profile: undefined,
    enrollments: undefined,
  } : null
  const router = useRouter()
  const pathname = usePathname()
  const [freeUserId, setFreeUserId] = useState<string | null>(null)
  const [isDevMode, setIsDevMode] = useState(false)

  // Check for dev mode (only in development)
  useEffect(() => {
    if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
      const devMode = localStorage.getItem('devMode') === 'true'
      setIsDevMode(devMode)
      if (devMode) {
        console.log('🔓 DEV MODE ACTIVE - All dashboards unlocked for testing')
      }
    }
  }, [])

  // Get or create freeUserId for guest users
  useEffect(() => {
    if (!isAuthenticated && typeof window !== 'undefined') {
      let storedFreeUserId = localStorage.getItem('freeUserId')
      if (!storedFreeUserId) {
        storedFreeUserId = `free_${Date.now()}_${Math.random().toString(36).substring(7)}`
        localStorage.setItem('freeUserId', storedFreeUserId)
      }
      setFreeUserId(storedFreeUserId)
    }
  }, [isAuthenticated])

  // Convert auth user to userFlow user type
  const userFlowUser = useMemo((): UserFlowUser | null => {
    if (!user) return null

    return {
      id: user.id,
      email: user.email || '',
      name: user.name || 'User',
      role: user.role,
      profile: user.profile as any,
      enrollments: user.enrollments as any,
    }
  }, [user])

  // Get default dashboard for current user
  const defaultDashboard = useMemo(() => {
    return getDefaultDashboard(userFlowUser, freeUserId)
  }, [userFlowUser, freeUserId])

  // Get navigation items with access control
  const navigationItems = useMemo(() => {
    return getNavigationItems(userFlowUser, freeUserId)
  }, [userFlowUser, freeUserId])

  // Check if user needs onboarding
  const requiresOnboarding = useMemo(() => {
    return needsOnboarding(userFlowUser)
  }, [userFlowUser])

  // Check if user is paid (or in dev mode)
  const isPaidUser = useMemo(() => {
    if (isDevMode) return true
    return defaultDashboard.isPaid
  }, [defaultDashboard, isDevMode])

  // Check if user is guest
  const isGuestUser = useMemo(() => {
    if (isDevMode) return false
    return !user && !!freeUserId
  }, [user, freeUserId, isDevMode])

  /**
   * Navigate to default dashboard for user
   */
  const goToDefaultDashboard = () => {
    router.push(defaultDashboard.route)
  }

  /**
   * Navigate to onboarding if needed, otherwise to default dashboard
   */
  const goToNextStep = () => {
    const nextRoute = getOnboardingRoute(userFlowUser)
    router.push(nextRoute)
  }

  /**
   * Check if user can access a specific dashboard
   */
  const checkDashboardAccess = (dashboard: DashboardType) => {
    // Dev mode bypasses all access checks
    if (isDevMode) {
      return { hasAccess: true, reason: 'Dev mode active' }
    }
    return canAccessDashboard(dashboard, userFlowUser, freeUserId)
  }

  /**
   * Get upgrade message for a specific feature
   */
  const getFeatureUpgradeMessage = (featureName: string) => {
    return getUpgradeMessage(userFlowUser, freeUserId, featureName)
  }

  /**
   * Check if current route requires authentication
   */
  const currentRouteRequiresAuth = useMemo(() => {
    const protectedRoutes = ['/dashboard', '/dashboard/student', '/profile', '/settings']
    return protectedRoutes.some((route) => pathname?.startsWith(route))
  }, [pathname])

  /**
   * Check if current route is accessible
   */
  const canAccessCurrentRoute = useMemo(() => {
    if (!pathname) return true

    // Check dashboard routes
    if (pathname.startsWith('/dashboard/student')) {
      return checkDashboardAccess('ANALYTICS').hasAccess
    }

    if (pathname === '/dashboard') {
      return checkDashboardAccess('NEET_PREP').hasAccess
    }

    if (pathname.startsWith('/student/dashboard')) {
      return checkDashboardAccess('HOME').hasAccess
    }

    // All other routes are accessible by default
    return true
  }, [pathname, userFlowUser, freeUserId])

  /**
   * Redirect to default dashboard (useful for post-login)
   */
  useEffect(() => {
    // Skip during loading or dev mode
    if (isLoading || isDevMode) return

    // Skip if on public pages
    const publicRoutes = ['/', '/auth', '/courses', '/results', '/faculty', '/demo']
    if (publicRoutes.some((route) => pathname?.startsWith(route))) return

    // Redirect to onboarding if needed
    if (isAuthenticated && requiresOnboarding && !pathname?.startsWith('/onboarding')) {
      router.push('/onboarding/profile')
      return
    }

    // Redirect if accessing protected route without access
    if (currentRouteRequiresAuth && !isAuthenticated) {
      router.push(`/sign-in?callbackUrl=${encodeURIComponent(pathname || '/')}`)
    }
  }, [
    isLoading,
    isAuthenticated,
    requiresOnboarding,
    pathname,
    currentRouteRequiresAuth,
    router,
    isDevMode,
  ])

  return {
    // User state
    user: userFlowUser,
    isAuthenticated,
    isLoading,
    isPaidUser,
    isGuestUser,
    freeUserId,
    isDevMode,

    // Dashboard info
    defaultDashboard,
    requiresOnboarding,

    // Navigation
    navigationItems,

    // Actions
    goToDefaultDashboard,
    goToNextStep,
    checkDashboardAccess,
    getFeatureUpgradeMessage,

    // Current route info
    currentRouteRequiresAuth,
    canAccessCurrentRoute,
  }
}
