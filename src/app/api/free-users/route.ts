import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

// POST /api/free-users - Create or retrieve a free user for MCQ practice
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { phone, name, email, studentClass, source, sessionId } = body

    // Validate phone number
    if (!phone || typeof phone !== 'string' || phone.length < 10) {
      return NextResponse.json(
        { success: false, error: 'Valid phone number is required' },
        { status: 400 }
      )
    }

    // Clean phone number (remove non-digits)
    const cleanPhone = phone.replace(/\D/g, '').slice(-10)

    // Generate email from phone if not provided (for unique constraint)
    const userEmail = email || `${cleanPhone}@mcq.cerebrumbiologyacademy.com`

    try {
      // Check if user already exists with this email
      let user = await prisma.free_users.findUnique({
        where: { email: userEmail },
      })

      if (user) {
        // User exists, optionally update their info
        if (name || studentClass) {
          user = await prisma.free_users.update({
            where: { id: user.id },
            data: {
              name: name || user.name,
              grade: studentClass || user.grade,
              lastActiveDate: new Date(),
            },
          })
        }

        return NextResponse.json({
          success: true,
          data: {
            id: user.id,
            isNewUser: false,
          },
        })
      }

      // Create new free user
      const newUser = await prisma.free_users.create({
        data: {
          id: generateUserId(),
          email: userEmail,
          name: name || null,
          grade: studentClass || null,
          curriculum: 'NEET',
          totalPoints: 0,
          studyStreak: 0,
          registrationDate: new Date(),
          updatedAt: new Date(),
          lastActiveDate: new Date(),
          currentLevel: 1,
          trialStartDate: new Date(),
          preferences: {
            phone: cleanPhone,
            source: source || 'mcq_practice',
            sessionId: sessionId || null,
          },
        },
      })

      // Create initial MCQ stats for the user
      try {
        await prisma.mcq_user_stats.create({
          data: {
            freeUserId: newUser.id,
            totalQuestions: 0,
            correctAnswers: 0,
            accuracy: 0,
            currentStreak: 0,
            longestStreak: 0,
            totalXp: 0,
            currentLevel: 1,
            levelProgress: 0,
            topicMastery: {},
            badges: [],
          },
        })
      } catch (statsError) {
        // Stats creation is non-critical, log and continue
        console.error('Failed to create initial MCQ stats:', statsError)
      }

      // Update session with lead capture info if sessionId provided
      if (sessionId) {
        try {
          await prisma.mcq_practice_sessions.update({
            where: { id: sessionId },
            data: {
              freeUserId: newUser.id,
              leadCaptured: true,
              capturedAt: new Date(),
            },
          })
        } catch (sessionError) {
          // Session update is non-critical
          console.error('Failed to update session with lead info:', sessionError)
        }
      }

      return NextResponse.json({
        success: true,
        data: {
          id: newUser.id,
          isNewUser: true,
        },
      })
    } catch (dbError) {
      // Handle unique constraint violation (race condition)
      if (dbError instanceof Error && dbError.message.includes('Unique constraint failed')) {
        // Try to fetch existing user
        const existingUser = await prisma.free_users.findUnique({
          where: { email: userEmail },
        })

        if (existingUser) {
          return NextResponse.json({
            success: true,
            data: {
              id: existingUser.id,
              isNewUser: false,
            },
          })
        }
      }
      throw dbError
    }
  } catch (error) {
    console.error('Error in free-users API:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to process request',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}

// GET /api/free-users - Get user by ID
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('id')

    if (!userId) {
      return NextResponse.json({ success: false, error: 'User ID is required' }, { status: 400 })
    }

    const user = await prisma.free_users.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        grade: true,
        currentLevel: true,
        totalPoints: true,
        studyStreak: true,
        registrationDate: true,
        lastActiveDate: true,
      },
    })

    if (!user) {
      return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      data: user,
    })
  } catch (error) {
    console.error('Error fetching free user:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch user',
      },
      { status: 500 }
    )
  }
}

function generateUserId(): string {
  const timestamp = Date.now().toString(36)
  const randomPart = crypto.randomBytes(6).toString('hex')
  return `fu_${timestamp}_${randomPart}`
}
