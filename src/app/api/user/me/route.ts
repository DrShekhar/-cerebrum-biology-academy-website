import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth as firebaseAuth } from 'firebase-admin'
import { getFirebaseAdmin } from '@/lib/firebase/admin'

/**
 * GET /api/user/me
 * Get the current authenticated user's details using Firebase Auth
 */
export async function GET(request: NextRequest) {
  try {
    // Get Firebase token from Authorization header
    const authHeader = request.headers.get('authorization')

    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const token = authHeader.split('Bearer ')[1]

    // Initialize Firebase Admin and verify token
    const admin = await getFirebaseAdmin()
    const decodedToken = await admin.auth().verifyIdToken(token)

    const firebaseUid = decodedToken.uid
    const phoneNumber = decodedToken.phone_number

    // Find user in database by phone number or Firebase UID
    let user = await prisma.users.findFirst({
      where: {
        OR: [
          { phone: phoneNumber },
          { firebaseUid: firebaseUid },
        ],
      },
    })

    // If user not found in DB, return Firebase user info
    if (!user) {
      return NextResponse.json({
        success: true,
        data: {
          id: firebaseUid,
          phone: phoneNumber,
          email: decodedToken.email || null,
          firstName: null,
          lastName: null,
          fullName: null,
          imageUrl: null,
          role: 'student',
          createdAt: new Date(),
          isNewUser: true,
        },
      })
    }

    return NextResponse.json({
      success: true,
      data: {
        id: user.id,
        email: user.email,
        phone: user.phone,
        firstName: user.name?.split(' ')[0] || null,
        lastName: user.name?.split(' ').slice(1).join(' ') || null,
        fullName: user.name,
        imageUrl: user.image,
        role: user.role?.toLowerCase() || 'student',
        createdAt: user.createdAt,
        lastSignInAt: user.lastActiveAt,
        isNewUser: false,
      },
    })
  } catch (error) {
    console.error('Error fetching current user:', error)
    return NextResponse.json({ error: 'Failed to fetch user' }, { status: 500 })
  }
}
