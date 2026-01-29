import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { UserRole } from '@/generated/prisma'
import { requireAdminAuth } from '@/lib/auth'
import { v4 as uuidv4 } from 'uuid'
import bcrypt from 'bcryptjs'
import {
  logAdminUserCreation,
  logAdminUserUpdate,
  logAdminAction,
} from '@/lib/security/auditLogger'

const createUserSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Invalid email address'),
  phone: z
    .string()
    .min(10, 'Phone must be at least 10 digits')
    .regex(/^[+]?[\d\s()-]+$/, 'Invalid phone number format'),
  role: z.enum(['ADMIN', 'COUNSELOR', 'TEACHER']),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  permissions: z.array(z.string()).min(1, 'Select at least one permission'),
})

const updateUserSchema = z.object({
  id: z.string().min(1, 'User ID is required'),
  name: z.string().min(2, 'Name must be at least 2 characters').max(100).optional(),
  phone: z
    .string()
    .min(10, 'Phone must be at least 10 digits')
    .regex(/^[+]?[\d\s()-]+$/, 'Invalid phone number format')
    .optional(),
  role: z.enum(['ADMIN', 'COUNSELOR', 'TEACHER']).optional(),
  permissions: z.array(z.string()).optional(),
  status: z.enum(['active', 'inactive', 'suspended']).optional(),
  password: z.string().min(8, 'Password must be at least 8 characters').optional(),
})

const deleteUserSchema = z.object({
  id: z.string().min(1, 'User ID is required'),
})

export async function POST(request: NextRequest) {
  try {
    const session = await requireAdminAuth()

    // Get client info for audit logging
    const forwardedFor = request.headers.get('x-forwarded-for')
    const clientIp =
      forwardedFor?.split(',')[0].trim() || request.headers.get('x-real-ip') || 'unknown'
    const userAgent = request.headers.get('user-agent') || 'unknown'

    const body = await request.json()
    const validatedData = createUserSchema.parse(body)

    const existingUser = await prisma.users.findFirst({
      where: {
        OR: [{ email: validatedData.email }, { phone: validatedData.phone }],
      },
    })

    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          error:
            existingUser.email === validatedData.email
              ? 'Email already registered'
              : 'Phone number already registered',
        },
        { status: 409 }
      )
    }

    // SECURITY: Use 12 salt rounds (standardized across the application)
    const passwordHash = await bcrypt.hash(validatedData.password, 12)

    const user = await prisma.users.create({
      data: {
        id: uuidv4(),
        name: validatedData.name,
        email: validatedData.email,
        phone: validatedData.phone,
        role: validatedData.role as any,
        passwordHash,
        emailVerified: new Date(),
        profile: {
          permissions: validatedData.permissions,
          status: 'active',
          createdBy: 'admin',
        },
        updatedAt: new Date(),
      },
    })

    await prisma.activities.create({
      data: {
        id: uuidv4(),
        userId: user.id,
        action: 'user_created',
        description: `New ${validatedData.role.toLowerCase()} user "${validatedData.name}" added to the system`,
        metadata: {
          role: validatedData.role,
          permissions: validatedData.permissions,
        },
      },
    })

    // SECURITY: Log admin action to security audit trail
    logAdminUserCreation(session.user.email, session.user.id, clientIp, userAgent, {
      id: user.id,
      email: user.email,
      role: validatedData.role,
    })

    const sanitizedUser = {
      ...user,
      passwordHash: undefined,
    }

    return NextResponse.json(
      { success: true, message: 'User added successfully', data: sanitizedUser },
      { status: 201 }
    )
  } catch (error) {
    console.error('Create user error:', error)

    if (error instanceof Error && error.message === 'Admin authentication required') {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: 'Validation failed',
          details: error.issues,
        },
        { status: 400 }
      )
    }

    return NextResponse.json({ success: false, error: 'Failed to create user' }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    await requireAdminAuth()

    const { searchParams } = new URL(request.url)
    const role = searchParams.get('role')
    const status = searchParams.get('status')
    const search = searchParams.get('search')

    const adminRoles = [UserRole.ADMIN, UserRole.COUNSELOR, UserRole.TEACHER]
    const whereClause: any = {
      role: {
        in: adminRoles,
      },
    }

    if (role && role !== 'all') {
      whereClause.role = role as UserRole
    }

    if (search) {
      whereClause.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
        { phone: { contains: search, mode: 'insensitive' } },
      ]
    }

    const users = await prisma.users.findMany({
      where: whereClause,
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        role: true,
        profile: true,
        createdAt: true,
        lastActiveAt: true,
        emailVerified: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    const formattedUsers = users.map((user) => {
      const profile = user.profile as any
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone || '',
        role: user.role,
        status: profile?.status || 'active',
        permissions: profile?.permissions || [],
        createdAt: user.createdAt.toISOString().split('T')[0],
        lastLogin: user.lastActiveAt?.toISOString() || user.createdAt.toISOString(),
      }
    })

    if (status && status !== 'all') {
      const filtered = formattedUsers.filter((u) => u.status === status)
      return NextResponse.json({ success: true, data: filtered })
    }

    return NextResponse.json({ success: true, data: formattedUsers })
  } catch (error) {
    console.error('Get users error:', error)

    if (error instanceof Error && error.message === 'Admin authentication required') {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    return NextResponse.json({ success: false, error: 'Failed to fetch users' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await requireAdminAuth()

    const forwardedFor = request.headers.get('x-forwarded-for')
    const clientIp =
      forwardedFor?.split(',')[0].trim() || request.headers.get('x-real-ip') || 'unknown'
    const userAgent = request.headers.get('user-agent') || 'unknown'

    const body = await request.json()
    const validatedData = updateUserSchema.parse(body)

    const existingUser = await prisma.users.findUnique({
      where: { id: validatedData.id },
    })

    if (!existingUser) {
      return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 })
    }

    if (
      validatedData.role &&
      existingUser.role === 'ADMIN' &&
      validatedData.role !== 'ADMIN' &&
      session.user.id === existingUser.id
    ) {
      return NextResponse.json(
        { success: false, error: 'Cannot demote yourself from admin' },
        { status: 400 }
      )
    }

    const existingProfile = existingUser.profile as any
    const changes: Record<string, { from: any; to: any }> = {}
    const updateData: any = {
      updatedAt: new Date(),
    }

    if (validatedData.name && validatedData.name !== existingUser.name) {
      changes.name = { from: existingUser.name, to: validatedData.name }
      updateData.name = validatedData.name
    }

    if (validatedData.phone && validatedData.phone !== existingUser.phone) {
      const phoneExists = await prisma.users.findFirst({
        where: { phone: validatedData.phone, id: { not: validatedData.id } },
      })
      if (phoneExists) {
        return NextResponse.json(
          { success: false, error: 'Phone number already in use' },
          { status: 409 }
        )
      }
      changes.phone = { from: existingUser.phone, to: validatedData.phone }
      updateData.phone = validatedData.phone
    }

    if (validatedData.role && validatedData.role !== existingUser.role) {
      changes.role = { from: existingUser.role, to: validatedData.role }
      updateData.role = validatedData.role
    }

    const newProfile = { ...existingProfile }
    if (validatedData.permissions) {
      changes.permissions = { from: existingProfile?.permissions, to: validatedData.permissions }
      newProfile.permissions = validatedData.permissions
    }
    if (validatedData.status) {
      changes.status = { from: existingProfile?.status, to: validatedData.status }
      newProfile.status = validatedData.status
    }
    if (validatedData.permissions || validatedData.status) {
      updateData.profile = newProfile
    }

    if (validatedData.password) {
      updateData.passwordHash = await bcrypt.hash(validatedData.password, 12)
      changes.password = { from: '[REDACTED]', to: '[CHANGED]' }
    }

    const updatedUser = await prisma.users.update({
      where: { id: validatedData.id },
      data: updateData,
    })

    await prisma.activities.create({
      data: {
        id: uuidv4(),
        userId: validatedData.id,
        action: 'user_updated',
        description: `User "${updatedUser.name}" updated by admin`,
        metadata: { changes, updatedBy: session.user.email },
      },
    })

    logAdminUserUpdate(
      session.user.email,
      session.user.id,
      clientIp,
      userAgent,
      { email: existingUser.email, id: existingUser.id },
      changes
    )

    const profile = updatedUser.profile as any
    return NextResponse.json({
      success: true,
      message: 'User updated successfully',
      data: {
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        phone: updatedUser.phone || '',
        role: updatedUser.role,
        status: profile?.status || 'active',
        permissions: profile?.permissions || [],
      },
    })
  } catch (error) {
    console.error('Update user error:', error)

    if (error instanceof Error && error.message === 'Admin authentication required') {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: 'Validation failed', details: error.issues },
        { status: 400 }
      )
    }

    return NextResponse.json({ success: false, error: 'Failed to update user' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await requireAdminAuth()

    const forwardedFor = request.headers.get('x-forwarded-for')
    const clientIp =
      forwardedFor?.split(',')[0].trim() || request.headers.get('x-real-ip') || 'unknown'
    const userAgent = request.headers.get('user-agent') || 'unknown'

    const body = await request.json()
    const validatedData = deleteUserSchema.parse(body)

    if (session.user.id === validatedData.id) {
      return NextResponse.json({ success: false, error: 'Cannot delete yourself' }, { status: 400 })
    }

    const userToDelete = await prisma.users.findUnique({
      where: { id: validatedData.id },
    })

    if (!userToDelete) {
      return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 })
    }

    if (userToDelete.role === 'ADMIN') {
      const allAdmins = await prisma.users.findMany({
        where: { role: 'ADMIN' },
        select: { id: true, profile: true },
      })
      const activeAdminCount = allAdmins.filter((admin) => {
        const profile = admin.profile as any
        return profile?.status !== 'deleted'
      }).length
      if (activeAdminCount <= 1) {
        return NextResponse.json(
          { success: false, error: 'Cannot delete the last admin user' },
          { status: 400 }
        )
      }
    }

    const existingProfile = userToDelete.profile as any
    await prisma.users.update({
      where: { id: validatedData.id },
      data: {
        profile: { ...existingProfile, status: 'deleted', deletedAt: new Date().toISOString() },
        updatedAt: new Date(),
      },
    })

    await prisma.activities.create({
      data: {
        id: uuidv4(),
        userId: validatedData.id,
        action: 'user_deleted',
        description: `User "${userToDelete.name}" deactivated by admin`,
        metadata: { deletedBy: session.user.email },
      },
    })

    logAdminAction('admin_user_deleted', session.user.email, session.user.id, clientIp, userAgent, {
      targetUserId: userToDelete.id,
      targetUserEmail: userToDelete.email,
    })

    return NextResponse.json({ success: true, message: 'User deactivated successfully' })
  } catch (error) {
    console.error('Delete user error:', error)

    if (error instanceof Error && error.message === 'Admin authentication required') {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: 'Validation failed', details: error.issues },
        { status: 400 }
      )
    }

    return NextResponse.json({ success: false, error: 'Failed to delete user' }, { status: 500 })
  }
}
