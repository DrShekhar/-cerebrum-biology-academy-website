import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { addSecurityHeaders, getCorsOrigin } from '@/lib/auth/config'
import { withAuth } from '@/lib/auth/middleware'
import { z } from 'zod'

// Profile update validation schema
const UpdateProfileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').optional(),
  phone: z.string().optional(),
  profile: z
    .object({
      grade: z.string().optional(),
      curriculum: z.enum(['NEET', 'CBSE', 'ICSE', 'IB', 'IGCSE', 'STATE_BOARD']).optional(),
      school: z.string().optional(),
      city: z.string().optional(),
      bio: z.string().max(500, 'Bio must be less than 500 characters').optional(),
      goals: z.array(z.string()).optional(),
      preferences: z
        .object({
          notifications: z
            .object({
              email: z.boolean().optional(),
              sms: z.boolean().optional(),
              push: z.boolean().optional(),
            })
            .optional(),
          privacy: z
            .object({
              profileVisible: z.boolean().optional(),
              progressVisible: z.boolean().optional(),
              allowContactFromTeachers: z.boolean().optional(),
            })
            .optional(),
          study: z
            .object({
              preferredStudyTime: z.enum(['MORNING', 'AFTERNOON', 'EVENING', 'NIGHT']).optional(),
              dailyStudyGoal: z.number().min(30).max(480).optional(), // 30 minutes to 8 hours
              reminderFrequency: z.enum(['NEVER', 'DAILY', 'WEEKLY']).optional(),
            })
            .optional(),
        })
        .optional(),
    })
    .optional(),
})

/**
 * GET /api/auth/profile
 * Get user profile information
 */
export const GET = withAuth(async (request: NextRequest, session) => {
  try {
    const user = await prisma.users.findUnique({
      where: { id: session.userId },
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        role: true,
        emailVerified: true,
        phoneVerified: true,
        profile: true,
        createdAt: true,
        lastActiveAt: true,
        // Include related data
        enrollments: {
          select: {
            id: true,
            status: true,
            enrollmentDate: true,
            course: {
              select: {
                id: true,
                name: true,
                type: true,
                class: true,
              },
            },
          },
        },
        _count: {
          select: {
            testSessions: true,
            userProgress: true,
          },
        },
      },
    })

    if (!user) {
      return addSecurityHeaders(
        NextResponse.json(
          {
            error: 'User not found',
            message: 'User profile not found',
          },
          { status: 404 }
        )
      )
    }

    // Calculate profile completion percentage
    const profileCompletion = calculateProfileCompletion(user)

    return addSecurityHeaders(
      NextResponse.json({
        success: true,
        user: {
          ...user,
          profileCompletion,
        },
      })
    )
  } catch (error) {
    console.error('Get profile error:', error)
    return addSecurityHeaders(
      NextResponse.json(
        {
          error: 'Internal server error',
          message: 'Failed to retrieve profile',
        },
        { status: 500 }
      )
    )
  }
})

/**
 * PUT /api/auth/profile
 * Update user profile information
 */
export const PUT = withAuth(async (request: NextRequest, session) => {
  try {
    const body = await request.json()
    const result = UpdateProfileSchema.safeParse(body)

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

    const { name, phone, profile } = result.data

    // Check if phone number is already taken by another user
    if (phone) {
      const existingUser = await prisma.users.findFirst({
        where: {
          phone,
          id: { not: session.userId },
        },
      })

      if (existingUser) {
        return addSecurityHeaders(
          NextResponse.json(
            {
              error: 'Phone number already in use',
              message: 'This phone number is already associated with another account',
            },
            { status: 409 }
          )
        )
      }
    }

    // Get current user data to merge with updates
    const currentUser = await prisma.users.findUnique({
      where: { id: session.userId },
      select: { profile: true },
    })

    // Merge profile data
    const updatedProfile = profile
      ? {
          ...((currentUser?.profile as any) || {}),
          ...profile,
          preferences: {
            ...((currentUser?.profile as any)?.preferences || {}),
            ...profile.preferences,
          },
        }
      : undefined

    // Update user profile
    const updatedUser = await prisma.users.update({
      where: { id: session.userId },
      data: {
        ...(name && { name }),
        ...(phone && { phone }),
        ...(updatedProfile && { profile: updatedProfile }),
      },
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        role: true,
        emailVerified: true,
        phoneVerified: true,
        profile: true,
        updatedAt: true,
      },
    })

    // Track profile update event
    try {
      await prisma.analytics_events.create({
        data: {
          userId: session.userId,
          eventType: 'profile',
          eventName: 'profile_updated',
          properties: {
            updatedFields: Object.keys(result.data),
            hasProfile: !!profile,
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
        message: 'Profile updated successfully',
        user: {
          ...updatedUser,
          profileCompletion: calculateProfileCompletion(updatedUser),
        },
      })
    )
  } catch (error) {
    console.error('Update profile error:', error)
    return addSecurityHeaders(
      NextResponse.json(
        {
          error: 'Internal server error',
          message: 'Failed to update profile',
        },
        { status: 500 }
      )
    )
  }
})

/**
 * Calculate profile completion percentage
 */
function calculateProfileCompletion(user: any): number {
  const requiredFields = ['name', 'phone', 'emailVerified']

  const profileFields = [
    'profile.grade',
    'profile.curriculum',
    'profile.school',
    'profile.city',
    'profile.bio',
  ]

  let completedFields = 0
  const totalFields = requiredFields.length + profileFields.length

  // Check required fields
  requiredFields.forEach((field) => {
    if (getNestedValue(user, field)) {
      completedFields++
    }
  })

  // Check profile fields
  profileFields.forEach((field) => {
    if (getNestedValue(user, field)) {
      completedFields++
    }
  })

  return Math.round((completedFields / totalFields) * 100)
}

/**
 * Get nested object value by path
 */
function getNestedValue(obj: any, path: string): any {
  return path.split('.').reduce((current, key) => current?.[key], obj)
}

// OPTIONS for CORS preflight
export async function OPTIONS(request: NextRequest) {
  return addSecurityHeaders(
    new NextResponse(null, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': getCorsOrigin(request),
        'Access-Control-Allow-Methods': 'GET, PUT, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Allow-Credentials': 'true',
      },
    })
  )
}
