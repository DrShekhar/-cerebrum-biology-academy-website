import { PrismaClient, CoachingTier } from '@/generated/prisma'
import {
  CoachingSubscriptionTier,
  CoachingFeatures,
  hasCoachingFeature,
} from '@/lib/subscriptions/SmartSubscriptionTiers'

const prisma = new PrismaClient()

// ============================================
// TYPES
// ============================================

export interface TrialStatus {
  freeUserId: string
  startDate: Date
  expiryDate: Date
  daysRemaining: number
  isExpired: boolean
  hasEverUpgraded: boolean
  testsTaken: number
  testsRemaining: number
  urgencyLevel: 'info' | 'warning' | 'urgent' | 'expired'
}

export interface CoachingTrialStatus {
  userId: string
  coachingTier: CoachingTier
  isTrialActive: boolean
  trialStartDate: Date | null
  trialEndDate: Date | null
  daysRemaining: number
  urgencyLevel: 'info' | 'warning' | 'urgent' | 'expired'
  effectiveTier: CoachingSubscriptionTier
}

export interface CreateTrialOptions {
  email?: string
  name?: string
  deviceId?: string
  grade?: string
  curriculum?: string
}

// ============================================
// CONSTANTS
// ============================================

const TRIAL_DURATION_DAYS = 15
const MAX_TRIAL_TESTS = 50
const MASTER_TRIAL_DURATION_DAYS = 7

export async function generateDeviceId(): Promise<string> {
  return `device_${Date.now()}_${Math.random().toString(36).substring(7)}`
}

export function calculateTrialExpiry(startDate: Date): Date {
  const expiryDate = new Date(startDate)
  expiryDate.setDate(expiryDate.getDate() + TRIAL_DURATION_DAYS)
  return expiryDate
}

export function calculateDaysRemaining(expiryDate: Date): number {
  const now = new Date()
  const diffTime = expiryDate.getTime() - now.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return Math.max(0, diffDays)
}

export function getUrgencyLevel(
  daysRemaining: number,
  isExpired: boolean
): TrialStatus['urgencyLevel'] {
  if (isExpired) return 'expired'
  if (daysRemaining <= 3) return 'urgent'
  if (daysRemaining <= 7) return 'warning'
  return 'info'
}

export async function initializeTrial(options: CreateTrialOptions): Promise<TrialStatus> {
  const startDate = new Date()
  const expiryDate = calculateTrialExpiry(startDate)
  const deviceId = options.deviceId || (await generateDeviceId())

  const email = options.email || `guest_${deviceId}@temp.local`

  let freeUser

  try {
    freeUser = await prisma.free_users.create({
      data: {
        id: `free_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
        email,
        name: options.name || 'Guest User',
        grade: options.grade || '',
        curriculum: options.curriculum || '',
        deviceId,
        trialStartDate: startDate,
        trialExpiryDate: expiryDate,
        isTrialExpired: false,
        lastTrialCheck: startDate,
        testsTakenCount: 0,
        updatedAt: startDate,
      },
    })
  } catch (error: any) {
    if (error.code === 'P2002' && error.meta?.target?.includes('email')) {
      freeUser = await prisma.free_users.findUnique({
        where: { email },
      })

      if (!freeUser) {
        throw new Error('Failed to create or find free user')
      }
    } else {
      throw error
    }
  }

  return {
    freeUserId: freeUser.id,
    startDate: freeUser.trialStartDate,
    expiryDate: freeUser.trialExpiryDate,
    daysRemaining: calculateDaysRemaining(freeUser.trialExpiryDate),
    isExpired: freeUser.isTrialExpired,
    hasEverUpgraded: !!freeUser.upgradedToUserId,
    testsTaken: freeUser.testsTakenCount,
    testsRemaining: Math.max(0, MAX_TRIAL_TESTS - freeUser.testsTakenCount),
    urgencyLevel: getUrgencyLevel(
      calculateDaysRemaining(freeUser.trialExpiryDate),
      freeUser.isTrialExpired
    ),
  }
}

export async function checkTrialStatus(freeUserId: string): Promise<TrialStatus | null> {
  const freeUser = await prisma.free_users.findUnique({
    where: { id: freeUserId },
    select: {
      id: true,
      trialStartDate: true,
      trialExpiryDate: true,
      isTrialExpired: true,
      upgradedToUserId: true,
      testsTakenCount: true,
      lastTrialCheck: true,
    },
  })

  if (!freeUser) {
    return null
  }

  if (!freeUser.trialExpiryDate) {
    const expiryDate = calculateTrialExpiry(freeUser.trialStartDate)
    await prisma.free_users.update({
      where: { id: freeUserId },
      data: { trialExpiryDate: expiryDate },
    })
    freeUser.trialExpiryDate = expiryDate
  }

  const now = new Date()
  const daysRemaining = calculateDaysRemaining(freeUser.trialExpiryDate)
  const isExpired = daysRemaining <= 0 || freeUser.testsTakenCount >= MAX_TRIAL_TESTS

  if (freeUser.isTrialExpired !== isExpired) {
    await prisma.free_users.update({
      where: { id: freeUserId },
      data: {
        isTrialExpired: isExpired,
        lastTrialCheck: now,
      },
    })
  }

  return {
    freeUserId: freeUser.id,
    startDate: freeUser.trialStartDate,
    expiryDate: freeUser.trialExpiryDate,
    daysRemaining,
    isExpired,
    hasEverUpgraded: !!freeUser.upgradedToUserId,
    testsTaken: freeUser.testsTakenCount,
    testsRemaining: Math.max(0, MAX_TRIAL_TESTS - freeUser.testsTakenCount),
    urgencyLevel: getUrgencyLevel(daysRemaining, isExpired),
  }
}

export async function extendTrial(freeUserId: string, days: number = 7): Promise<void> {
  const freeUser = await prisma.free_users.findUnique({
    where: { id: freeUserId },
    select: {
      id: true,
      trialStartDate: true,
      trialExpiryDate: true,
      extensionCount: true,
    },
  })

  if (!freeUser) {
    throw new Error('Free user not found')
  }

  let currentExpiryDate = freeUser.trialExpiryDate
  if (!currentExpiryDate) {
    currentExpiryDate = calculateTrialExpiry(freeUser.trialStartDate)
  }

  const newExpiryDate = new Date(currentExpiryDate)
  newExpiryDate.setDate(newExpiryDate.getDate() + days)

  await prisma.free_users.update({
    where: { id: freeUserId },
    data: {
      trialExpiryDate: newExpiryDate,
      trialExtended: true,
      extensionCount: freeUser.extensionCount + 1,
      isTrialExpired: false,
      lastTrialCheck: new Date(),
    },
  })
}

export async function convertToFullUser(freeUserId: string, userId: string): Promise<void> {
  const freeUser = await prisma.free_users.findUnique({
    where: { id: freeUserId },
    include: {
      test_attempts: true,
      test_sessions: true,
      user_progress: true,
      user_question_responses: true,
      performance_reports: true,
    },
  })

  if (!freeUser) {
    throw new Error('Free user not found')
  }

  await prisma.$transaction(async (tx) => {
    await tx.free_users.update({
      where: { id: freeUserId },
      data: {
        upgradedToUserId: userId,
        isTrialExpired: false,
      },
    })

    await tx.test_sessions.updateMany({
      where: { freeUserId },
      data: { userId },
    })

    await tx.user_question_responses.updateMany({
      where: { freeUserId },
      data: { userId },
    })

    await tx.user_progress.updateMany({
      where: { freeUserId },
      data: { userId },
    })

    await tx.performance_reports.updateMany({
      where: { freeUserId },
      data: { userId },
    })
  })
}

export async function incrementTestCount(freeUserId: string): Promise<number> {
  const updated = await prisma.free_users.update({
    where: { id: freeUserId },
    data: {
      testsTakenCount: {
        increment: 1,
      },
    },
    select: {
      testsTakenCount: true,
    },
  })

  return updated.testsTakenCount
}

export async function canTakeTest(
  freeUserId: string
): Promise<{ allowed: boolean; reason?: string }> {
  const status = await checkTrialStatus(freeUserId)

  if (!status) {
    return { allowed: false, reason: 'User not found' }
  }

  if (status.isExpired) {
    if (status.daysRemaining <= 0) {
      return { allowed: false, reason: 'Trial period has expired' }
    }
    if (status.testsTaken >= MAX_TRIAL_TESTS) {
      return { allowed: false, reason: `Maximum ${MAX_TRIAL_TESTS} tests reached during trial` }
    }
  }

  if (status.testsRemaining <= 0) {
    return { allowed: false, reason: `Maximum ${MAX_TRIAL_TESTS} tests reached during trial` }
  }

  return { allowed: true }
}

export async function getTrialStatistics(freeUserId: string): Promise<{
  totalStudyTime: number
  averageScore: number
  strongTopics: string[]
  weakTopics: string[]
  testsCompleted: number
}> {
  const freeUser = await prisma.free_users.findUnique({
    where: { id: freeUserId },
    include: {
      test_attempts: {
        orderBy: { startedAt: 'desc' },
        take: 20,
      },
    },
  })

  if (!freeUser) {
    throw new Error('Free user not found')
  }

  const totalStudyTime = freeUser.test_attempts.reduce((acc, attempt) => acc + attempt.timeSpent, 0)
  const averageScore = freeUser.averageScore || 0
  const strongTopics = (freeUser.strongestTopics as string[]) || []
  const weakTopics = (freeUser.weakestTopics as string[]) || []
  const testsCompleted = freeUser.testsTakenCount

  return {
    totalStudyTime,
    averageScore,
    strongTopics,
    weakTopics,
    testsCompleted,
  }
}

// ============================================
// REGISTERED USER TRIAL FUNCTIONS (7-day master trial)
// ============================================

export function getCoachingUrgencyLevel(
  daysRemaining: number,
  isExpired: boolean
): CoachingTrialStatus['urgencyLevel'] {
  if (isExpired || daysRemaining <= 0) return 'expired'
  if (daysRemaining <= 2) return 'urgent'
  if (daysRemaining <= 4) return 'warning'
  return 'info'
}

export async function checkCoachingTrialStatus(userId: string): Promise<CoachingTrialStatus | null> {
  const user = await prisma.users.findUnique({
    where: { id: userId },
    select: {
      id: true,
      coachingTier: true,
      trialStartDate: true,
      trialEndDate: true,
    },
  })

  if (!user) {
    return null
  }

  const now = new Date()
  const isTrialActive = user.trialEndDate ? now < user.trialEndDate : false
  const daysRemaining = user.trialEndDate
    ? Math.max(0, Math.ceil((user.trialEndDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)))
    : 0

  const effectiveTier = getEffectiveTierFromCoaching(user.coachingTier, isTrialActive)

  return {
    userId: user.id,
    coachingTier: user.coachingTier,
    isTrialActive,
    trialStartDate: user.trialStartDate,
    trialEndDate: user.trialEndDate,
    daysRemaining,
    urgencyLevel: getCoachingUrgencyLevel(daysRemaining, !isTrialActive && user.coachingTier === 'FREE'),
    effectiveTier,
  }
}

export function getEffectiveTierFromCoaching(
  coachingTier: CoachingTier,
  isTrialActive: boolean
): CoachingSubscriptionTier {
  // During active trial, FREE users get PINNACLE access to experience all features
  if (isTrialActive && coachingTier === 'FREE') {
    return CoachingSubscriptionTier.PINNACLE
  }

  // Map database enum to subscription tier enum
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

export async function getEffectiveTier(userId: string): Promise<CoachingSubscriptionTier> {
  const status = await checkCoachingTrialStatus(userId)
  if (!status) {
    return CoachingSubscriptionTier.FREE
  }
  return status.effectiveTier
}

export async function hasTrialFeatureAccess(
  userId: string,
  feature: keyof CoachingFeatures
): Promise<{ hasAccess: boolean; reason?: string }> {
  const status = await checkCoachingTrialStatus(userId)

  if (!status) {
    return { hasAccess: false, reason: 'User not found' }
  }

  const hasFeature = hasCoachingFeature(status.effectiveTier, feature)

  if (!hasFeature) {
    if (status.coachingTier === 'FREE' && !status.isTrialActive) {
      return {
        hasAccess: false,
        reason: 'Trial expired. Upgrade to access this feature.',
      }
    }
    return {
      hasAccess: false,
      reason: `This feature requires a higher subscription tier.`,
    }
  }

  return { hasAccess: true }
}

export async function upgradeUserTier(
  userId: string,
  newTier: CoachingTier
): Promise<{ success: boolean; user?: any; error?: string }> {
  try {
    const user = await prisma.users.findUnique({
      where: { id: userId },
    })

    if (!user) {
      return { success: false, error: 'User not found' }
    }

    const updatedUser = await prisma.users.update({
      where: { id: userId },
      data: {
        coachingTier: newTier,
        trialEndDate: null,
        updatedAt: new Date(),
      },
    })

    return { success: true, user: updatedUser }
  } catch (error) {
    console.error('Error upgrading user tier:', error)
    return { success: false, error: 'Failed to upgrade tier' }
  }
}

export async function startMasterTrial(userId: string): Promise<CoachingTrialStatus | null> {
  const user = await prisma.users.findUnique({
    where: { id: userId },
  })

  if (!user) {
    return null
  }

  if (user.trialStartDate) {
    return checkCoachingTrialStatus(userId)
  }

  const trialStartDate = new Date()
  const trialEndDate = new Date(trialStartDate)
  trialEndDate.setDate(trialEndDate.getDate() + MASTER_TRIAL_DURATION_DAYS)

  await prisma.users.update({
    where: { id: userId },
    data: {
      trialStartDate,
      trialEndDate,
      updatedAt: new Date(),
    },
  })

  return checkCoachingTrialStatus(userId)
}

export async function extendMasterTrial(userId: string, days: number = 3): Promise<CoachingTrialStatus | null> {
  const user = await prisma.users.findUnique({
    where: { id: userId },
  })

  if (!user || !user.trialEndDate) {
    return null
  }

  const newTrialEndDate = new Date(user.trialEndDate)
  newTrialEndDate.setDate(newTrialEndDate.getDate() + days)

  await prisma.users.update({
    where: { id: userId },
    data: {
      trialEndDate: newTrialEndDate,
      updatedAt: new Date(),
    },
  })

  return checkCoachingTrialStatus(userId)
}
