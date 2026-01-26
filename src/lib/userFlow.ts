/**
 * User Flow Logic & Dashboard Routing
 *
 * This file contains the logic for determining which dashboard to show users
 * based on their authentication status, role, coaching tier, and trial status.
 *
 * Key Concepts:
 * - 8 User Roles: ADMIN, TEACHER, COUNSELOR, CONSULTANT, STUDENT, PARENT, FREE_USER
 * - 4 Coaching Tiers: PINNACLE, ASCENT, PURSUIT, FREE
 * - 7-day master trial: FREE users get PINNACLE access during trial
 */

import type { CoachingTier, UserRole } from '@/generated/prisma'
import {
  CoachingSubscriptionTier,
  hasCoachingFeature,
  type CoachingFeatures,
} from '@/lib/subscriptions/SmartSubscriptionTiers'

export type UserTrack = 'NEET' | 'REGULAR' | 'NOT_SET'

export interface UserProfile {
  track?: UserTrack
  goal?: string // e.g., "NEET 2026", "Class 11 Regular"
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
  role?: UserRole | string
  profile?: UserProfile | null
  enrollments?: Array<{
    id: string
    status: string
    courseId: string
  }>
  // Coaching tier and trial fields
  coachingTier?: CoachingTier
  trialStartDate?: Date | null
  trialEndDate?: Date | null
}

// ============================================
// COACHING TIER HELPERS
// ============================================

/**
 * Check if user's trial is currently active
 */
export function isTrialActive(user: User | null): boolean {
  if (!user?.trialEndDate) return false
  const now = new Date()
  return now < new Date(user.trialEndDate)
}

/**
 * Get days remaining in trial
 */
export function getTrialDaysRemaining(user: User | null): number {
  if (!user?.trialEndDate) return 0
  const now = new Date()
  const endDate = new Date(user.trialEndDate)
  const diffTime = endDate.getTime() - now.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return Math.max(0, diffDays)
}

/**
 * Get effective tier (considering trial status)
 * During active trial, FREE users get PINNACLE access
 */
export function getEffectiveTier(user: User | null): CoachingSubscriptionTier {
  if (!user) return CoachingSubscriptionTier.FREE

  const coachingTier = user.coachingTier || 'FREE'

  // During active trial, FREE users get PINNACLE access
  if (isTrialActive(user) && coachingTier === 'FREE') {
    return CoachingSubscriptionTier.PINNACLE
  }

  // Map database enum to subscription tier
  switch (coachingTier) {
    case 'PINNACLE':
      return CoachingSubscriptionTier.PINNACLE
    case 'ASCENT':
      return CoachingSubscriptionTier.ASCENT
    case 'PURSUIT':
      return CoachingSubscriptionTier.PURSUIT
    case 'FREE':
    default:
      return CoachingSubscriptionTier.FREE
  }
}

/**
 * Get tier badge for display
 */
export function getTierBadge(user: User | null): {
  label: string
  color: string
  bgColor: string
} | null {
  if (!user) return null

  const coachingTier = user.coachingTier || 'FREE'
  const trialActive = isTrialActive(user)
  const daysRemaining = getTrialDaysRemaining(user)

  // Trial badge takes priority for FREE users
  if (trialActive && coachingTier === 'FREE') {
    return {
      label: `TRIAL (${daysRemaining}d)`,
      color: 'text-purple-700',
      bgColor: 'bg-purple-100',
    }
  }

  switch (coachingTier) {
    case 'PINNACLE':
      return {
        label: 'PINNACLE',
        color: 'text-yellow-800',
        bgColor: 'bg-yellow-100',
      }
    case 'ASCENT':
      return {
        label: 'ASCENT',
        color: 'text-blue-700',
        bgColor: 'bg-blue-100',
      }
    case 'PURSUIT':
      return {
        label: 'PURSUIT',
        color: 'text-green-700',
        bgColor: 'bg-green-100',
      }
    case 'FREE':
    default:
      return {
        label: 'FREE',
        color: 'text-gray-600',
        bgColor: 'bg-gray-100',
      }
  }
}

/**
 * Check if user has access to a specific feature based on tier
 */
export function hasFeatureAccess(
  user: User | null,
  feature: keyof CoachingFeatures
): { hasAccess: boolean; reason?: string; upgradeRequired?: boolean } {
  const effectiveTier = getEffectiveTier(user)
  const hasAccess = hasCoachingFeature(effectiveTier, feature)

  if (hasAccess) {
    return { hasAccess: true }
  }

  const coachingTier = user?.coachingTier || 'FREE'
  const trialActive = isTrialActive(user)

  if (coachingTier === 'FREE' && !trialActive) {
    return {
      hasAccess: false,
      reason: 'Trial expired. Upgrade to access this feature.',
      upgradeRequired: true,
    }
  }

  return {
    hasAccess: false,
    reason: 'This feature requires a higher subscription tier.',
    upgradeRequired: true,
  }
}

export type DashboardType =
  | 'HOME'
  | 'NEET_PREP'
  | 'ANALYTICS'
  | 'ADMIN'
  | 'TEACHER'
  | 'COUNSELOR'
  | 'CONSULTANT'
  | 'PARENT'

// ============================================
// ROLE-BASED ROUTING
// ============================================

/**
 * Get dashboard route based on user role
 */
function getRoleDashboardRoute(role: UserRole | string | undefined): {
  route: string
  type: DashboardType
} {
  const normalizedRole = (role || 'STUDENT').toUpperCase()

  switch (normalizedRole) {
    case 'ADMIN':
      return { route: '/admin/dashboard', type: 'ADMIN' }
    case 'TEACHER':
      return { route: '/teacher/dashboard', type: 'TEACHER' }
    case 'COUNSELOR':
      return { route: '/counselor/dashboard', type: 'COUNSELOR' }
    case 'CONSULTANT':
      return { route: '/consultant/dashboard', type: 'CONSULTANT' }
    case 'PARENT':
      return { route: '/parent/dashboard', type: 'PARENT' }
    case 'STUDENT':
    default:
      return { route: '/dashboard', type: 'NEET_PREP' }
  }
}

/**
 * Check if a role is a staff/admin role (not student/parent)
 */
export function isStaffRole(role: UserRole | string | undefined): boolean {
  const normalizedRole = (role || 'STUDENT').toUpperCase()
  return ['ADMIN', 'TEACHER', 'COUNSELOR', 'CONSULTANT'].includes(normalizedRole)
}

/**
 * Determines which dashboard should be the default landing page for a user
 * Based on authentication status, role, and coaching tier
 */
export function getDefaultDashboard(
  user: User | null,
  freeUserId: string | null
): {
  route: string
  type: DashboardType
  requiresAuth: boolean
  isPaid: boolean
  coachingTier?: CoachingTier
  isTrialActive?: boolean
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

  // Case 3: Authenticated user - route based on role
  if (user) {
    const hasActiveEnrollment = user.enrollments?.some(
      (e) => e.status === 'ACTIVE' || e.status === 'PENDING'
    )

    const { route, type } = getRoleDashboardRoute(user.role)
    const coachingTier = user.coachingTier || 'FREE'
    const trialActive = isTrialActive(user)

    // Determine if user is "paid" (has active enrollment OR paid tier)
    const isPaidTier = coachingTier !== 'FREE'
    const isPaid = hasActiveEnrollment || isPaidTier || trialActive

    return {
      route,
      type,
      requiresAuth: true,
      isPaid,
      coachingTier,
      isTrialActive: trialActive,
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
 * Now considers role, coaching tier, and trial status
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

  const userRole = (user.role || 'STUDENT').toString().toUpperCase()
  const coachingTier = user.coachingTier || 'FREE'
  const trialActive = isTrialActive(user)
  const effectiveTier = getEffectiveTier(user)

  // Role-based dashboard access
  if (dashboard === 'ADMIN') {
    if (userRole !== 'ADMIN') {
      return { hasAccess: false, reason: 'Admin access required' }
    }
    return { hasAccess: true }
  }

  if (dashboard === 'TEACHER') {
    if (!['ADMIN', 'TEACHER'].includes(userRole)) {
      return { hasAccess: false, reason: 'Teacher access required' }
    }
    return { hasAccess: true }
  }

  if (dashboard === 'COUNSELOR') {
    if (!['ADMIN', 'COUNSELOR'].includes(userRole)) {
      return { hasAccess: false, reason: 'Counselor access required' }
    }
    return { hasAccess: true }
  }

  if (dashboard === 'CONSULTANT') {
    if (!['ADMIN', 'CONSULTANT'].includes(userRole)) {
      return { hasAccess: false, reason: 'Consultant access required' }
    }
    return { hasAccess: true }
  }

  if (dashboard === 'PARENT') {
    if (!['ADMIN', 'PARENT'].includes(userRole)) {
      return { hasAccess: false, reason: 'Parent access required' }
    }
    return { hasAccess: true }
  }

  // NEET Prep Center - available to all authenticated users
  if (dashboard === 'NEET_PREP') {
    return { hasAccess: true }
  }

  // Analytics - requires paid tier OR active trial
  if (dashboard === 'ANALYTICS') {
    // Check if user has access via coaching tier
    const hasPaidAccess =
      effectiveTier !== CoachingSubscriptionTier.FREE || (coachingTier === 'FREE' && trialActive)

    if (!hasPaidAccess) {
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

export interface NavigationItem {
  label: string
  route: string
  icon: string
  locked: boolean
  badge?: string
  badgeColor?: string
  badgeBgColor?: string
  description: string
  tierRequired?: CoachingSubscriptionTier
}

/**
 * Get navigation items with access control
 * Now includes tier badges and role-specific navigation
 */
export function getNavigationItems(user: User | null, freeUserId: string | null): NavigationItem[] {
  const isAuthenticated = !!user
  const effectiveTier = getEffectiveTier(user)
  const trialActive = isTrialActive(user)
  const tierBadge = getTierBadge(user)
  const userRole = (user?.role || 'STUDENT').toString().toUpperCase()

  // Base navigation for students
  const studentNav: NavigationItem[] = [
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
      locked: !isAuthenticated,
      badge: isAuthenticated ? tierBadge?.label : 'Login Required',
      badgeColor: tierBadge?.color,
      badgeBgColor: tierBadge?.bgColor,
      description: 'Track your path to 600+',
    },
    {
      label: 'Analytics',
      route: '/dashboard/student',
      icon: '📊',
      locked: effectiveTier === CoachingSubscriptionTier.FREE && !trialActive,
      badge:
        effectiveTier === CoachingSubscriptionTier.FREE && !trialActive
          ? 'PRO'
          : trialActive
            ? 'TRIAL'
            : undefined,
      badgeColor: trialActive ? 'text-purple-700' : undefined,
      badgeBgColor: trialActive ? 'bg-purple-100' : undefined,
      description: 'Deep insights into your progress',
      tierRequired: CoachingSubscriptionTier.PURSUIT,
    },
    {
      label: 'Materials',
      route: '/student/materials',
      icon: '📚',
      locked: false,
      description: 'Study materials and resources',
    },
    {
      label: 'AI Tutor',
      route: '/student/ai-tutor',
      icon: '🤖',
      locked: effectiveTier === CoachingSubscriptionTier.FREE && !trialActive,
      badge: effectiveTier === CoachingSubscriptionTier.FREE && !trialActive ? 'PRO' : undefined,
      description: 'Get instant help from AI',
      tierRequired: CoachingSubscriptionTier.PURSUIT,
    },
  ]

  // Parent navigation
  const parentNav: NavigationItem[] = [
    {
      label: 'Dashboard',
      route: '/parent/dashboard',
      icon: '🏠',
      locked: false,
      description: "Monitor your child's progress",
    },
    {
      label: 'Homework',
      route: '/parent/homework',
      icon: '📝',
      locked: false,
      description: 'Track homework status',
    },
    {
      label: 'Attendance',
      route: '/parent/attendance',
      icon: '📅',
      locked: false,
      description: 'View attendance records',
    },
    {
      label: 'Tests',
      route: '/parent/tests',
      icon: '📊',
      locked: false,
      description: 'Test results and analysis',
    },
    {
      label: 'Notices',
      route: '/parent/notices',
      icon: '📢',
      locked: false,
      description: 'Important announcements',
    },
  ]

  // Consultant navigation
  const consultantNav: NavigationItem[] = [
    {
      label: 'Dashboard',
      route: '/consultant/dashboard',
      icon: '🏠',
      locked: false,
      description: 'Your referral overview',
    },
    {
      label: 'Add Lead',
      route: '/consultant/leads/new',
      icon: '➕',
      locked: false,
      description: 'Add new student lead',
    },
    {
      label: 'Leads',
      route: '/consultant/leads',
      icon: '👥',
      locked: false,
      description: 'Track lead pipeline',
    },
    {
      label: 'Referrals',
      route: '/consultant/referrals',
      icon: '🔗',
      locked: false,
      description: 'Your referred students',
    },
    {
      label: 'Commissions',
      route: '/consultant/commissions',
      icon: '💰',
      locked: false,
      description: 'View your earnings',
    },
  ]

  // Return role-appropriate navigation
  switch (userRole) {
    case 'PARENT':
      return parentNav
    case 'CONSULTANT':
      return consultantNav
    case 'ADMIN':
    case 'TEACHER':
    case 'COUNSELOR':
      // Staff roles use their own navigation (handled elsewhere)
      return studentNav // Fallback to student nav for now
    default:
      return studentNav
  }
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
  if (!user) return '/sign-up'

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
 * Get upgrade CTA message based on user status and tier
 */
export function getUpgradeMessage(
  user: User | null,
  freeUserId: string | null,
  feature: string,
  requiredTier?: CoachingSubscriptionTier
): {
  title: string
  description: string
  ctaText: string
  ctaLink: string
  trialAvailable?: boolean
} {
  // Guest user
  if (!user && freeUserId) {
    return {
      title: `Sign up to unlock ${feature}`,
      description: 'Create a free account to get a 7-day trial with access to all premium features',
      ctaText: 'Start Free Trial',
      ctaLink: '/sign-up',
      trialAvailable: true,
    }
  }

  const coachingTier = user?.coachingTier || 'FREE'
  const trialActive = isTrialActive(user)
  const daysRemaining = getTrialDaysRemaining(user)

  // Trial user (show upgrade to keep access)
  if (coachingTier === 'FREE' && trialActive) {
    return {
      title: `Keep access to ${feature}`,
      description: `Your trial ends in ${daysRemaining} days. Upgrade now to continue using premium features.`,
      ctaText: 'Upgrade Now',
      ctaLink: '/pricing',
      trialAvailable: false,
    }
  }

  // Free user (trial expired or never had one)
  if (coachingTier === 'FREE' && !trialActive) {
    return {
      title: `Upgrade to unlock ${feature}`,
      description: 'Get full access to NEET Prep tools, AI tutor, analytics, and unlimited tests',
      ctaText: 'View Plans',
      ctaLink: '/pricing',
      trialAvailable: false,
    }
  }

  // Paid user but needs higher tier
  if (requiredTier) {
    const tierNames: Record<CoachingSubscriptionTier, string> = {
      [CoachingSubscriptionTier.FREE]: 'Free',
      [CoachingSubscriptionTier.PURSUIT]: 'Pursuit',
      [CoachingSubscriptionTier.ASCENT]: 'Ascent',
      [CoachingSubscriptionTier.PINNACLE]: 'Pinnacle',
    }

    return {
      title: `Upgrade to ${tierNames[requiredTier]} for ${feature}`,
      description: `This feature requires ${tierNames[requiredTier]} tier or higher`,
      ctaText: 'Upgrade Tier',
      ctaLink: '/pricing',
      trialAvailable: false,
    }
  }

  // Default
  return {
    title: 'Access Required',
    description: 'You need appropriate access to view this content',
    ctaText: 'Learn More',
    ctaLink: '/pricing',
    trialAvailable: false,
  }
}

// ============================================
// ROLE-SPECIFIC HELPERS
// ============================================

/**
 * Get the appropriate landing page after login based on role
 */
export function getPostLoginRedirect(user: User): string {
  const { route } = getDefaultDashboard(user, null)
  return route
}

/**
 * Check if user can access a specific route based on their role
 */
export function canAccessRoute(
  user: User | null,
  route: string
): { allowed: boolean; redirectTo?: string; reason?: string } {
  if (!user) {
    return {
      allowed: false,
      redirectTo: '/sign-in',
      reason: 'Authentication required',
    }
  }

  const userRole = (user.role || 'STUDENT').toString().toUpperCase()

  // Admin can access everything
  if (userRole === 'ADMIN') {
    return { allowed: true }
  }

  // Role-specific route restrictions
  const roleRouteMap: Record<string, string[]> = {
    STUDENT: ['/student', '/dashboard', '/test', '/courses'],
    PARENT: ['/parent'],
    TEACHER: ['/teacher'],
    COUNSELOR: ['/counselor'],
    CONSULTANT: ['/consultant'],
  }

  // Check if route is allowed for user's role
  const allowedPrefixes = roleRouteMap[userRole] || ['/student', '/dashboard']

  for (const prefix of allowedPrefixes) {
    if (route.startsWith(prefix)) {
      return { allowed: true }
    }
  }

  // Route not in allowed list
  const defaultDashboard = getDefaultDashboard(user, null)
  return {
    allowed: false,
    redirectTo: defaultDashboard.route,
    reason: `Access restricted. Redirecting to your dashboard.`,
  }
}
