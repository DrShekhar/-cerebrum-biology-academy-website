import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/database/connection'
import { withAuth, UserSession } from '@/lib/auth/middleware'

/**
 * POST /api/user/profile
 * Save or update user profile with track selection and onboarding data
 * SECURITY: Requires authentication - users can only update their own profile
 */
async function handlePost(request: NextRequest, session: UserSession) {
  try {
    const body = await request.json()
    const { profile } = body

    // SECURITY: Use authenticated user's ID, not client-provided userId
    // This prevents users from modifying other users' profiles
    const userId = session.userId

    if (!profile) {
      return NextResponse.json(
        { success: false, error: 'Profile data is required' },
        { status: 400 }
      )
    }

    // Update user profile in database
    const updatedUser = await prisma.users.update({
      where: { id: userId },
      data: {
        profile: profile, // Store as JSON
        updatedAt: new Date(),
      },
      include: {
        enrollments: {
          where: {
            status: {
              in: ['ACTIVE', 'PENDING'],
            },
          },
        },
      },
    })

    return NextResponse.json({
      success: true,
      data: {
        user: {
          id: updatedUser.id,
          email: updatedUser.email,
          name: updatedUser.name,
          profile: updatedUser.profile,
          enrollments: updatedUser.enrollments,
        },
      },
    })
  } catch (error) {
    console.error('Error updating user profile:', error)
    // SECURITY: Don't expose internal error details to client
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to update profile',
      },
      { status: 500 }
    )
  }
}

// Export with authentication middleware
export const POST = withAuth(handlePost)

/**
 * GET /api/user/profile
 * Get authenticated user's profile
 * SECURITY: Requires authentication - users can only view their own profile
 */
async function handleGet(request: NextRequest, session: UserSession) {
  try {
    // SECURITY: Use authenticated user's ID, not query param
    // This prevents users from viewing other users' profiles
    const userId = session.userId

    const user = await prisma.users.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        profile: true,
        role: true,
        enrollments: {
          where: {
            status: {
              in: ['ACTIVE', 'PENDING'],
            },
          },
          include: {
            courses: {
              select: {
                id: true,
                name: true,
                type: true,
              },
            },
          },
        },
      },
    })

    if (!user) {
      return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      data: { user },
    })
  } catch (error) {
    console.error('Error fetching user profile:', error)
    // SECURITY: Don't expose internal error details to client
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch profile',
      },
      { status: 500 }
    )
  }
}

// Export with authentication middleware
export const GET = withAuth(handleGet)
