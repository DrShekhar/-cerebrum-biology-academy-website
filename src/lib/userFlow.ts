/**
 * User Flow Logic & Dashboard Routing
 *
 * This file contains the logic for determining which dashboard to show users
 * based on their authentication status, enrollment status, and track selection.
 */

export type UserTrack = 'NEET' | 'REGULAR' | 'NOT_SET'

export interface UserProfile {
  track?: UserTrack
  goal?: string // e.g., "NEET 2025", "Class 11 Regular"
  targetScore?: number // For NEET users
  class?: string
  city?: string
  school?: string
  onboardingCompleted?: boolean
}

export interface User {
  id: string
  email: string
  name: string
  role?: string
  profile?: UserProfile | null
  enrollments?: Array<{
    id: string
    status: string
    courseId: string
  }>
}

export type DashboardType = 'HOME' | 'NEET_PREP' | 'ANALYTICS'

/**
 * Determines which dashboard should be the default landing page for a user
 */
export function getDefaultDashboard(
  user: User | null,
  freeUserId: string | null
): {
  route: string
  type: DashboardType
  requiresAuth: boolean
  isPaid: boolean
} {
  // Case 1: No user at all (not even guest)
  if (!user && !freeUserId) {
    return {
      route: '/student/dashboard',
      type: 'HOME',
      requiresAuth: false,
      isPaid: false,
    }
  }

  // Case 2: Guest user (has freeUserId but no account)
  if (!user && freeUserId) {
    return {
      route: '/student/dashboard?mode=guest',
      type: 'HOME',
      requiresAuth: false,
      isPaid: false,
    }
  }

  // Case 3: Authenticated user
  if (user) {
    const hasActiveEnrollment = user.enrollments?.some(
      (e) => e.status === 'ACTIVE' || e.status === 'PENDING'
    )

    const userTrack = (user.profile?.track || 'NOT_SET') as UserTrack
    const isNEETTrack = userTrack === 'NEET' || user.profile?.goal?.includes('NEET')

    // Paid NEET user → NEET Prep Center
    if (hasActiveEnrollment && isNEETTrack) {
      return {
        route: '/dashboard',
        type: 'NEET_PREP',
        requiresAuth: true,
        isPaid: true,
      }
    }

    // Paid regular student → Home Dashboard (with full features)
    if (hasActiveEnrollment && !isNEETTrack) {
      return {
        route: '/student/dashboard',
        type: 'HOME',
        requiresAuth: true,
        isPaid: true,
      }
    }

    // Free registered user (any track) → Home Dashboard
    return {
      route: '/student/dashboard',
      type: 'HOME',
      requiresAuth: true,
      isPaid: false,
    }
  }

  // Fallback (should not reach here)
  return {
    route: '/student/dashboard',
    type: 'HOME',
    requiresAuth: false,
    isPaid: false,
  }
}

/**
 * Checks if a user has access to a specific dashboard
 */
export function canAccessDashboard(
  dashboard: DashboardType,
  user: User | null,
  freeUserId: string | null
): {
  hasAccess: boolean
  reason?: string
  upgradeRequired?: boolean
} {
  // Anyone can access HOME dashboard
  if (dashboard === 'HOME') {
    return { hasAccess: true }
  }

  // Guest users cannot access premium dashboards
  if (!user && freeUserId) {
    return {
      hasAccess: false,
      reason: 'Sign up required to access this feature',
      upgradeRequired: true,
    }
  }

  // Unauthenticated users cannot access any premium dashboard
  if (!user) {
    return {
      hasAccess: false,
      reason: 'Authentication required',
      upgradeRequired: false,
    }
  }

  // Check if user has active enrollment (paid user)
  const hasActiveEnrollment = user.enrollments?.some(
    (e) => e.status === 'ACTIVE' || e.status === 'PENDING'
  )

  // NEET Prep Center - requires paid enrollment
  if (dashboard === 'NEET_PREP') {
    if (!hasActiveEnrollment) {
      return {
        hasAccess: false,
        reason: 'Upgrade to access NEET Prep Center',
        upgradeRequired: true,
      }
    }
    return { hasAccess: true }
  }

  // Analytics - requires paid enrollment
  if (dashboard === 'ANALYTICS') {
    if (!hasActiveEnrollment) {
      return {
        hasAccess: false,
        reason: 'Upgrade to access full analytics',
        upgradeRequired: true,
      }
    }
    return { hasAccess: true }
  }

  return { hasAccess: false, reason: 'Unknown dashboard type' }
}

/**
 * Get navigation items with access control
 */
export function getNavigationItems(
  user: User | null,
  freeUserId: string | null
): Array<{
  label: string
  route: string
  icon: string
  locked: boolean
  badge?: string
  description: string
}> {
  const hasActiveEnrollment = user?.enrollments?.some(
    (e) => e.status === 'ACTIVE' || e.status === 'PENDING'
  )

  return [
    {
      label: 'Home',
      route: '/student/dashboard',
      icon: '🏠',
      locked: false,
      description: 'Your daily study hub',
    },
    {
      label: 'NEET Prep',
      route: '/dashboard',
      icon: '🎯',
      locked: !hasActiveEnrollment,
      badge: hasActiveEnrollment ? undefined : 'PRO',
      description: 'Track your path to 600+',
    },
    {
      label: 'Analytics',
      route: '/dashboard/student',
      icon: '📊',
      locked: !hasActiveEnrollment,
      badge: hasActiveEnrollment ? undefined : 'PRO',
      description: 'Deep insights into your progress',
    },
    {
      label: 'Materials',
      route: '/student/materials',
      icon: '📚',
      locked: false,
      description: 'Study materials and resources',
    },
  ]
}

/**
 * Check if user needs onboarding
 */
export function needsOnboarding(user: User | null): boolean {
  if (!user) return false

  // If profile doesn't exist or onboarding not completed
  if (!user.profile) return true

  const profile = user.profile as UserProfile

  // Check if essential profile fields are set
  const hasTrack = profile.track && profile.track !== 'NOT_SET'
  const hasGoal = profile.goal && profile.goal.length > 0
  const onboardingDone = profile.onboardingCompleted === true

  return !hasTrack || !hasGoal || !onboardingDone
}

/**
 * Get the next onboarding step for a user
 */
export function getOnboardingRoute(user: User | null): string {
  if (!user) return '/auth/signup'

  if (needsOnboarding(user)) {
    return '/onboarding/profile'
  }

  return getDefaultDashboard(user, null).route
}

/**
 * Format display name for user track
 */
export function getTrackDisplayName(track: UserTrack): string {
  switch (track) {
    case 'NEET':
      return 'NEET Preparation'
    case 'REGULAR':
      return 'Regular Studies'
    case 'NOT_SET':
      return 'Not Set'
    default:
      return 'Unknown'
  }
}

/**
 * Get upgrade CTA message based on user status
 */
export function getUpgradeMessage(
  user: User | null,
  freeUserId: string | null,
  feature: string
): {
  title: string
  description: string
  ctaText: string
  ctaLink: string
} {
  // Guest user
  if (!user && freeUserId) {
    return {
      title: `Sign up to unlock ${feature}`,
      description: 'Create a free account to access this feature and track your progress',
      ctaText: 'Sign Up Free',
      ctaLink: '/auth/signup',
    }
  }

  // Free registered user
  if (user && !user.enrollments?.some((e) => e.status === 'ACTIVE')) {
    return {
      title: `Upgrade to unlock ${feature}`,
      description: 'Get full access to NEET Prep tools, analytics, and unlimited tests',
      ctaText: 'View Plans',
      ctaLink: '/courses',
    }
  }

  // Default
  return {
    title: 'Access Required',
    description: 'You need appropriate access to view this content',
    ctaText: 'Learn More',
    ctaLink: '/',
  }
}
