import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { requireAdminAuth } from '@/lib/auth'
import { v4 as uuidv4 } from 'uuid'
import bcrypt from 'bcryptjs'

const createFacultySchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Invalid email address'),
  phone: z
    .string()
    .min(10, 'Phone must be at least 10 digits')
    .regex(/^[+]?[\d\s()-]+$/, 'Invalid phone number format'),
  specialization: z.string().min(2, 'Specialization is required'),
  experience: z.number().min(0, 'Experience cannot be negative').max(50),
  qualification: z.string().min(2, 'Qualification is required'),
  availability: z.string().min(2, 'Availability schedule is required'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  bio: z.string().optional(),
})

export async function POST(request: NextRequest) {
  try {
    await requireAdminAuth()

    const body = await request.json()
    const validatedData = createFacultySchema.parse(body)

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

    const faculty = await prisma.users.create({
      data: {
        id: uuidv4(),
        name: validatedData.name,
        email: validatedData.email,
        phone: validatedData.phone,
        role: 'TEACHER',
        passwordHash,
        emailVerified: new Date(),
        profile: {
          specialization: validatedData.specialization,
          experience: validatedData.experience,
          qualification: validatedData.qualification,
          availability: validatedData.availability,
          bio: validatedData.bio || null,
          status: 'active',
          joinedDate: new Date().toISOString(),
        },
        updatedAt: new Date(),
      },
    })

    await prisma.activities.create({
      data: {
        id: uuidv4(),
        userId: faculty.id,
        action: 'faculty_onboarded',
        description: `New faculty member "${validatedData.name}" added to the team`,
        metadata: {
          specialization: validatedData.specialization,
          qualification: validatedData.qualification,
          experience: validatedData.experience,
        },
      },
    })

    const sanitizedFaculty = {
      ...faculty,
      passwordHash: undefined,
    }

    return NextResponse.json(
      { success: true, message: 'Faculty member added successfully', data: sanitizedFaculty },
      { status: 201 }
    )
  } catch (error) {
    console.error('Create faculty error:', error)

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

    return NextResponse.json(
      { success: false, error: 'Failed to create faculty member' },
      { status: 500 }
    )
  }
}
