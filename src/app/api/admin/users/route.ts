import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { requireAdminAuth } from '@/lib/auth'
import { v4 as uuidv4 } from 'uuid'
import bcrypt from 'bcryptjs'

const createUserSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Invalid email address'),
  phone: z
    .string()
    .min(10, 'Phone must be at least 10 digits')
    .regex(/^[+]?[\d\s()-]+$/, 'Invalid phone number format'),
  role: z.enum(['ADMIN', 'COUNSELOR', 'STAFF']),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  permissions: z.array(z.string()).min(1, 'Select at least one permission'),
})

export async function POST(request: NextRequest) {
  try {
    await requireAdminAuth()

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

    const passwordHash = await bcrypt.hash(validatedData.password, 10)

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
