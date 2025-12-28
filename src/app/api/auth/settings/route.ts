import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import {
  validateUserSession,
  addSecurityHeaders,
  SessionManager,
  PasswordUtils,
} from '@/lib/auth/config'
import { withAuth } from '@/lib/auth/middleware'
import { z } from 'zod'

// Settings update validation schema
const UpdateSettingsSchema = z.object({
  notifications: z
    .object({
      email: z.boolean().optional(),
      sms: z.boolean().optional(),
      push: z.boolean().optional(),
      marketing: z.boolean().optional(),
      testReminders: z.boolean().optional(),
      progressReports: z.boolean().optional(),
    })
    .optional(),
  privacy: z
    .object({
      profileVisible: z.boolean().optional(),
      progressVisible: z.boolean().optional(),
      allowContactFromTeachers: z.boolean().optional(),
      shareDataForImprovement: z.boolean().optional(),
    })
    .optional(),
  study: z
    .object({
      preferredStudyTime: z.enum(['MORNING', 'AFTERNOON', 'EVENING', 'NIGHT']).optional(),
      dailyStudyGoal: z.number().min(30).max(480).optional(), // 30 minutes to 8 hours
      reminderFrequency: z.enum(['NEVER', 'DAILY', 'WEEKLY']).optional(),
      autoGenerateTests: z.boolean().optional(),
      difficulty: z.enum(['EASY', 'MEDIUM', 'HARD', 'ADAPTIVE']).optional(),
    })
    .optional(),
  accessibility: z
    .object({
      highContrast: z.boolean().optional(),
      largeText: z.boolean().optional(),
      reducedMotion: z.boolean().optional(),
      screenReader: z.boolean().optional(),
    })
    .optional(),
})

/**
 * GET /api/auth/settings
 * Get user account settings
 */
export const GET = withAuth(async (request: NextRequest, session) => {
  try {
    const user = await prisma.users.findUnique({
      where: { id: session.userId },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        profile: true,
        emailVerified: true,
        phoneVerified: true,
        createdAt: true,
        lastActiveAt: true,
      },
    })

    if (!user) {
      return addSecurityHeaders(
        NextResponse.json(
          {
            error: 'User not found',
            message: 'User settings not found',
          },
          { status: 404 }
        )
      )
    }

    // Get active sessions
    const activeSessions = await prisma.session.findMany({
      where: {
        userId: session.userId,
        expires: { gt: new Date() },
      },
      select: {
        id: true,
        sessionToken: true,
        expires: true,
      },
    })

    // Extract settings from profile
    const profile = user.profile as any
    const settings = {
      notifications: profile?.preferences?.notifications || {
        email: true,
        sms: false,
        push: false,
        marketing: false,
        testReminders: true,
        progressReports: true,
      },
      privacy: profile?.preferences?.privacy || {
        profileVisible: false,
        progressVisible: true,
        allowContactFromTeachers: true,
        shareDataForImprovement: true,
      },
      study: profile?.preferences?.study || {
        preferredStudyTime: 'EVENING',
        dailyStudyGoal: 120, // 2 hours
        reminderFrequency: 'DAILY',
        autoGenerateTests: true,
        difficulty: 'ADAPTIVE',
      },
      accessibility: profile?.preferences?.accessibility || {
        highContrast: false,
        largeText: false,
        reducedMotion: false,
        screenReader: false,
      },
    }

    return addSecurityHeaders(
      NextResponse.json({
        success: true,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          emailVerified: user.emailVerified,
          phoneVerified: user.phoneVerified,
          createdAt: user.createdAt,
          lastActiveAt: user.lastActiveAt,
        },
        settings,
        security: {
          activeSessionsCount: activeSessions.length,
          lastActiveAt: user.lastActiveAt,
        },
      })
    )
  } catch (error) {
    console.error('Get settings error:', error)
    return addSecurityHeaders(
      NextResponse.json(
        {
          error: 'Internal server error',
          message: 'Failed to retrieve settings',
        },
        { status: 500 }
      )
    )
  }
})

/**
 * PUT /api/auth/settings
 * Update user account settings
 */
export const PUT = withAuth(async (request: NextRequest, session) => {
  try {
    const body = await request.json()
    const result = UpdateSettingsSchema.safeParse(body)

    if (!result.success) {
      return addSecurityHeaders(
        NextResponse.json(
          {
            error: 'Invalid input',
            details: result.error.issues,
          },
          { status: 400 }
        )
      )
    }

    const { notifications, privacy, study, accessibility } = result.data

    // Get current user profile
    const currentUser = await prisma.users.findUnique({
      where: { id: session.userId },
      select: { profile: true },
    })

    if (!currentUser) {
      return addSecurityHeaders(
        NextResponse.json(
          {
            error: 'User not found',
            message: 'User not found',
          },
          { status: 404 }
        )
      )
    }

    // Merge settings with existing profile
    const currentProfile = (currentUser.profile as any) || {}
    const updatedProfile = {
      ...currentProfile,
      preferences: {
        ...currentProfile.preferences,
        ...(notifications && {
          notifications: { ...currentProfile.preferences?.notifications, ...notifications },
        }),
        ...(privacy && { privacy: { ...currentProfile.preferences?.privacy, ...privacy } }),
        ...(study && { study: { ...currentProfile.preferences?.study, ...study } }),
        ...(accessibility && {
          accessibility: { ...currentProfile.preferences?.accessibility, ...accessibility },
        }),
      },
    }

    // Update user profile
    const updatedUser = await prisma.users.update({
      where: { id: session.userId },
      data: { profile: updatedProfile },
      select: {
        id: true,
        email: true,
        name: true,
        profile: true,
        updatedAt: true,
      },
    })

    // Track settings update event
    try {
      await prisma.analyticsEvent.create({
        data: {
          userId: session.userId,
          eventType: 'settings',
          eventName: 'settings_updated',
          properties: {
            updatedCategories: Object.keys(result.data),
            notifications: !!notifications,
            privacy: !!privacy,
            study: !!study,
            accessibility: !!accessibility,
          },
          ipAddress:
            request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown',
          userAgent: request.headers.get('user-agent'),
        },
      })
    } catch (analyticsError) {
      console.error('Analytics tracking error:', analyticsError)
    }

    return addSecurityHeaders(
      NextResponse.json({
        success: true,
        message: 'Settings updated successfully',
        settings: {
          notifications: updatedProfile.preferences?.notifications,
          privacy: updatedProfile.preferences?.privacy,
          study: updatedProfile.preferences?.study,
          accessibility: updatedProfile.preferences?.accessibility,
        },
      })
    )
  } catch (error) {
    console.error('Update settings error:', error)
    return addSecurityHeaders(
      NextResponse.json(
        {
          error: 'Internal server error',
          message: 'Failed to update settings',
        },
        { status: 500 }
      )
    )
  }
})

/**
 * DELETE /api/auth/settings
 * Delete user account (with confirmation)
 */
export const DELETE = withAuth(async (request: NextRequest, session) => {
  try {
    const body = await request.json()
    const { confirmDelete, password } = body

    if (!confirmDelete || confirmDelete !== 'DELETE_MY_ACCOUNT') {
      return addSecurityHeaders(
        NextResponse.json(
          {
            error: 'Confirmation required',
            message: 'You must type "DELETE_MY_ACCOUNT" to confirm account deletion',
          },
          { status: 400 }
        )
      )
    }

    if (!password) {
      return addSecurityHeaders(
        NextResponse.json(
          {
            error: 'Password required',
            message: 'Password confirmation is required for account deletion',
          },
          { status: 400 }
        )
      )
    }

    // Get user with password hash
    const user = await prisma.users.findUnique({
      where: { id: session.userId },
      select: {
        email: true,
        passwordHash: true,
      },
    })

    if (!user || !user.passwordHash) {
      return addSecurityHeaders(
        NextResponse.json(
          {
            error: 'User not found',
            message: 'Unable to verify user account',
          },
          { status: 404 }
        )
      )
    }

    // Verify password
    const isPasswordValid = await PasswordUtils.verify(password, user.passwordHash)
    if (!isPasswordValid) {
      return addSecurityHeaders(
        NextResponse.json(
          {
            error: 'Invalid password',
            message: 'Password confirmation failed',
          },
          { status: 401 }
        )
      )
    }

    // Track account deletion event before deleting
    try {
      await prisma.analyticsEvent.create({
        data: {
          userId: session.userId,
          eventType: 'account',
          eventName: 'account_deleted',
          properties: {
            method: 'user_initiated',
            reason: 'user_request',
          },
          ipAddress:
            request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown',
          userAgent: request.headers.get('user-agent'),
        },
      })
    } catch (analyticsError) {
      console.error('Analytics tracking error:', analyticsError)
    }

    // Terminate all user sessions
    await SessionManager.terminateAllUserSessions(session.userId)

    // Soft delete user (mark as deleted but keep data for analytics)
    await prisma.users.update({
      where: { id: session.userId },
      data: {
        email: `deleted_${session.userId}@deleted.com`,
        name: 'Deleted User',
        passwordHash: null,
        phone: null,
        profile: {
          deleted: true,
          deletedAt: new Date().toISOString(),
          originalEmail: user.email, // Keep for potential recovery
        },
      },
    })

    return addSecurityHeaders(
      NextResponse.json({
        success: true,
        message: "Account deleted successfully. We're sorry to see you go!",
      })
    )
  } catch (error) {
    console.error('Delete account error:', error)
    return addSecurityHeaders(
      NextResponse.json(
        {
          error: 'Internal server error',
          message: 'Failed to delete account',
        },
        { status: 500 }
      )
    )
  }
})

// OPTIONS for CORS preflight
export async function OPTIONS(request: NextRequest) {
  const origin = request.headers.get('origin') || ''
  const allowedOrigins = [
    'https://cerebrumbiologyacademy.com',
    'https://www.cerebrumbiologyacademy.com',
    ...(process.env.NODE_ENV === 'development' ? ['http://localhost:3000'] : []),
  ]
  const corsOrigin = allowedOrigins.includes(origin) ? origin : allowedOrigins[0]

  return addSecurityHeaders(
    new NextResponse(null, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': corsOrigin,
        'Access-Control-Allow-Methods': 'GET, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Allow-Credentials': 'true',
      },
    })
  )
}
