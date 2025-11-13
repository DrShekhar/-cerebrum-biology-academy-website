import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/database/connection'

/**
 * POST /api/user/profile
 * Save or update user profile with track selection and onboarding data
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, profile } = body

    if (!userId) {
      return NextResponse.json({ success: false, error: 'User ID is required' }, { status: 400 })
    }

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
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to update profile',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}

/**
 * GET /api/user/profile?userId=xxx
 * Get user profile
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')

    if (!userId) {
      return NextResponse.json({ success: false, error: 'User ID is required' }, { status: 400 })
    }

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
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch profile',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
