import { auth, clerkClient } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

/**
 * GET /api/user/me
 * Get the current authenticated user's details
 */
export async function GET() {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const client = await clerkClient()
    const user = await client.users.getUser(userId)

    return NextResponse.json({
      success: true,
      data: {
        id: user.id,
        email: user.emailAddresses[0]?.emailAddress,
        phone: user.phoneNumbers[0]?.phoneNumber,
        firstName: user.firstName,
        lastName: user.lastName,
        fullName: user.fullName,
        imageUrl: user.imageUrl,
        role: user.publicMetadata?.role || 'student',
        createdAt: user.createdAt,
        lastSignInAt: user.lastSignInAt,
      },
    })
  } catch (error) {
    console.error('Error fetching current user:', error)
    return NextResponse.json({ error: 'Failed to fetch user' }, { status: 500 })
  }
}
