import { clerkClient } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'
import { isAdmin } from '@/lib/auth/clerk-utils'
import { z } from 'zod'

const createUserSchema = z.object({
  emailAddress: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters').optional(),
  firstName: z.string().min(1).optional(),
  lastName: z.string().min(1).optional(),
  phoneNumber: z.string().optional(),
  role: z.enum(['admin', 'teacher', 'counselor', 'student', 'parent']).default('student'),
})

const updateUserSchema = z.object({
  userId: z.string(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  role: z.enum(['admin', 'teacher', 'counselor', 'student', 'parent']).optional(),
})

/**
 * GET /api/admin/clerk-users
 * List all Clerk users with optional filters
 */
export async function GET(request: NextRequest) {
  try {
    if (!(await isAdmin())) {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 })
    }

    const { searchParams } = new URL(request.url)
    const query = searchParams.get('query') || undefined
    const limit = parseInt(searchParams.get('limit') || '20', 10)
    const offset = parseInt(searchParams.get('offset') || '0', 10)

    const client = await clerkClient()
    const users = await client.users.getUserList({
      query,
      limit,
      offset,
    })

    return NextResponse.json({
      success: true,
      data: users.data.map((user) => ({
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
      })),
      totalCount: users.totalCount,
    })
  } catch (error) {
    console.error('Error fetching Clerk users:', error)
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 })
  }
}

/**
 * POST /api/admin/clerk-users
 * Create a new user directly in Clerk
 */
export async function POST(request: NextRequest) {
  try {
    if (!(await isAdmin())) {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 })
    }

    const body = await request.json()
    const parsed = createUserSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid request', details: parsed.error.flatten() },
        { status: 400 }
      )
    }

    const { emailAddress, password, firstName, lastName, phoneNumber, role } = parsed.data
    const client = await clerkClient()

    const user = await client.users.createUser({
      emailAddress: [emailAddress],
      password,
      firstName,
      lastName,
      phoneNumber: phoneNumber ? [phoneNumber] : undefined,
      publicMetadata: {
        role,
        createdBy: 'admin',
        createdAt: new Date().toISOString(),
      },
    })

    return NextResponse.json({
      success: true,
      message: `User ${emailAddress} created`,
      data: {
        id: user.id,
        email: user.emailAddresses[0]?.emailAddress,
        firstName: user.firstName,
        lastName: user.lastName,
        role,
      },
    })
  } catch (error) {
    console.error('Error creating Clerk user:', error)
    const errorMessage = error instanceof Error ? error.message : 'Failed to create user'
    return NextResponse.json({ error: errorMessage }, { status: 500 })
  }
}

/**
 * PATCH /api/admin/clerk-users
 * Update user details or role in Clerk
 */
export async function PATCH(request: NextRequest) {
  try {
    if (!(await isAdmin())) {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 })
    }

    const body = await request.json()
    const parsed = updateUserSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid request', details: parsed.error.flatten() },
        { status: 400 }
      )
    }

    const { userId, firstName, lastName, role } = parsed.data
    const client = await clerkClient()

    if (firstName || lastName) {
      await client.users.updateUser(userId, {
        firstName,
        lastName,
      })
    }

    if (role) {
      await client.users.updateUserMetadata(userId, {
        publicMetadata: { role },
      })
    }

    return NextResponse.json({
      success: true,
      message: 'User updated',
    })
  } catch (error) {
    console.error('Error updating Clerk user:', error)
    return NextResponse.json({ error: 'Failed to update user' }, { status: 500 })
  }
}

/**
 * DELETE /api/admin/clerk-users
 * Delete a user from Clerk
 */
export async function DELETE(request: NextRequest) {
  try {
    if (!(await isAdmin())) {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 })
    }

    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('id')

    if (!userId) {
      return NextResponse.json({ error: 'User ID required' }, { status: 400 })
    }

    const client = await clerkClient()
    await client.users.deleteUser(userId)

    return NextResponse.json({
      success: true,
      message: 'User deleted',
    })
  } catch (error) {
    console.error('Error deleting Clerk user:', error)
    return NextResponse.json({ error: 'Failed to delete user' }, { status: 500 })
  }
}
