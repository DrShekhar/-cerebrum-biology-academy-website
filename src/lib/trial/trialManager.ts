import { PrismaClient } from '@/generated/prisma'

const prisma = new PrismaClient()

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

export interface CreateTrialOptions {
  email?: string
  name?: string
  deviceId?: string
  grade?: string
  curriculum?: string
}

const TRIAL_DURATION_DAYS = 15
const MAX_TRIAL_TESTS = 50

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
    freeUser = await prisma.freeUser.create({
      data: {
        email,
        name: options.name || 'Guest User',
        grade: options.grade,
        curriculum: options.curriculum,
        deviceId,
        trialStartDate: startDate,
        trialExpiryDate: expiryDate,
        isTrialExpired: false,
        lastTrialCheck: startDate,
        testsTakenCount: 0,
      },
    })
  } catch (error: any) {
    if (error.code === 'P2002' && error.meta?.target?.includes('email')) {
      freeUser = await prisma.freeUser.findUnique({
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
  const freeUser = await prisma.freeUser.findUnique({
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

  const now = new Date()
  const daysRemaining = calculateDaysRemaining(freeUser.trialExpiryDate)
  const isExpired = daysRemaining <= 0 || freeUser.testsTakenCount >= MAX_TRIAL_TESTS

  if (freeUser.isTrialExpired !== isExpired) {
    await prisma.freeUser.update({
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
  const freeUser = await prisma.freeUser.findUnique({
    where: { id: freeUserId },
    select: {
      id: true,
      trialExpiryDate: true,
      extensionCount: true,
    },
  })

  if (!freeUser) {
    throw new Error('Free user not found')
  }

  const newExpiryDate = new Date(freeUser.trialExpiryDate)
  newExpiryDate.setDate(newExpiryDate.getDate() + days)

  await prisma.freeUser.update({
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
  const freeUser = await prisma.freeUser.findUnique({
    where: { id: freeUserId },
    include: {
      testAttempts: true,
      testSessions: true,
      userProgress: true,
      questionResponses: true,
      performanceReports: true,
    },
  })

  if (!freeUser) {
    throw new Error('Free user not found')
  }

  await prisma.$transaction(async (tx) => {
    await tx.freeUser.update({
      where: { id: freeUserId },
      data: {
        upgradedToUserId: userId,
        isTrialExpired: false,
      },
    })

    await tx.testSession.updateMany({
      where: { freeUserId },
      data: { userId },
    })

    await tx.userQuestionResponse.updateMany({
      where: { freeUserId },
      data: { userId },
    })

    await tx.userProgress.updateMany({
      where: { freeUserId },
      data: { userId },
    })

    await tx.performanceReport.updateMany({
      where: { freeUserId },
      data: { userId },
    })
  })
}

export async function incrementTestCount(freeUserId: string): Promise<number> {
  const updated = await prisma.freeUser.update({
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
  const freeUser = await prisma.freeUser.findUnique({
    where: { id: freeUserId },
    include: {
      testAttempts: {
        orderBy: { startedAt: 'desc' },
        take: 20,
      },
    },
  })

  if (!freeUser) {
    throw new Error('Free user not found')
  }

  const totalStudyTime = freeUser.testAttempts.reduce((acc, attempt) => acc + attempt.timeSpent, 0)
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
