import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { validateUserSession, addSecurityHeaders } from '@/lib/auth/config'
import { z } from 'zod'

const completeSignupSchema = z.object({
  userId: z.string(),
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  class: z.enum(['10th', '11th', '12th', 'Dropper']),
  parentName: z.string().min(2, 'Parent name required').optional(),
  parentPhone: z.string().min(10, 'Valid phone number required').optional(),
  schoolName: z.string().min(2, 'School name required').optional(),
  city: z.string().min(2, 'City required').optional(),
  referralSource: z.string().optional(),
})

export async function POST(request: NextRequest) {
  try {
    // SECURITY: Validate user session before allowing profile completion
    const session = await validateUserSession(request)
    if (!session.valid || !session.userId) {
      return addSecurityHeaders(
        NextResponse.json({ error: 'Authentication required to complete signup' }, { status: 401 })
      )
    }

    const body = await request.json()
    const validatedData = completeSignupSchema.parse(body)

    const { userId, fullName, email, ...profileData } = validatedData

    // SECURITY: Prevent IDOR - verify userId matches authenticated session
    // Users can only complete their own signup, not modify other accounts
    if (userId !== session.userId) {
      console.warn(`[SECURITY] IDOR attempt: User ${session.userId} tried to modify user ${userId}`)
      return addSecurityHeaders(
        NextResponse.json({ error: 'You can only complete your own signup' }, { status: 403 })
      )
    }

    // Update user with complete information
    const updatedUser = await prisma.users.update({
      where: { id: userId },
      data: {
        name: fullName,
        email: email,
        profile: {
          ...profileData,
          signupCompletedAt: new Date().toISOString(),
        },
        updatedAt: new Date(),
      },
    })

    console.log('✅ User signup completed:', userId)

    return addSecurityHeaders(
      NextResponse.json({
        success: true,
        user: {
          id: updatedUser.id,
          name: updatedUser.name,
          email: updatedUser.email,
          phone: updatedUser.phone,
          role: updatedUser.role,
          profile: updatedUser.profile,
        },
        message: 'Registration completed successfully!',
      })
    )
  } catch (error: unknown) {
    console.error('❌ Error completing signup:', error)

    if (error instanceof z.ZodError) {
      return addSecurityHeaders(
        NextResponse.json({ error: error.issues[0].message }, { status: 400 })
      )
    }

    return addSecurityHeaders(
      NextResponse.json(
        {
          error: 'Failed to complete signup',
          details: error instanceof Error ? error.message : 'Unknown error occurred',
        },
        { status: 500 }
      )
    )
  }
}
