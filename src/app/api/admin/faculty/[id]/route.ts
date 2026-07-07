import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { requireAdminAuth } from '@/lib/auth'
import { v4 as uuidv4 } from 'uuid'
import type { Prisma } from '@/generated/prisma'

const updateFacultySchema = z.object({
  name: z.string().min(2).max(100).optional(),
  email: z.string().email().optional(),
  phone: z
    .string()
    .min(10)
    .regex(/^[+]?[\d\s()-]+$/, 'Invalid phone number format')
    .optional(),
  specialization: z.string().min(2).optional(),
  experience: z.number().min(0).max(50).optional(),
  qualification: z.string().min(2).optional(),
  availability: z.string().min(2).optional(),
  bio: z.string().optional(),
  status: z.enum(['active', 'onLeave', 'inactive']).optional(),
})

async function getFacultyOr404(id: string) {
  const faculty = await prisma.users.findFirst({
    where: { id, role: 'TEACHER' },
    select: { id: true, name: true, email: true, phone: true, profile: true },
  })
  return faculty
}

export async function PUT(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    await requireAdminAuth()
    const { id } = await context.params

    const faculty = await getFacultyOr404(id)
    if (!faculty) {
      return NextResponse.json({ success: false, error: 'Faculty not found' }, { status: 404 })
    }

    const body = await request.json()
    const data = updateFacultySchema.parse(body)

    if (data.email || data.phone) {
      const clash = await prisma.users.findFirst({
        where: {
          id: { not: id },
          OR: [
            ...(data.email ? [{ email: data.email }] : []),
            ...(data.phone ? [{ phone: data.phone }] : []),
          ],
        },
        select: { email: true },
      })
      if (clash) {
        return NextResponse.json(
          {
            success: false,
            error:
              clash.email === data.email
                ? 'Email already registered to another user'
                : 'Phone number already registered to another user',
          },
          { status: 409 }
        )
      }
    }

    const existingProfile = (faculty.profile as Record<string, unknown> | null) || {}
    const profilePatch: Record<string, unknown> = {}
    for (const key of [
      'specialization',
      'experience',
      'qualification',
      'availability',
      'bio',
      'status',
    ] as const) {
      if (data[key] !== undefined) profilePatch[key] = data[key]
    }

    const updated = await prisma.users.update({
      where: { id },
      data: {
        ...(data.name !== undefined ? { name: data.name } : {}),
        ...(data.email !== undefined ? { email: data.email } : {}),
        ...(data.phone !== undefined ? { phone: data.phone } : {}),
        profile: { ...existingProfile, ...profilePatch } as Prisma.InputJsonValue,
        updatedAt: new Date(),
      },
      select: { id: true, name: true, email: true, phone: true, profile: true, createdAt: true },
    })

    await prisma.activities.create({
      data: {
        id: uuidv4(),
        userId: id,
        action: 'faculty_updated',
        description: `Faculty profile "${updated.name}" updated`,
        metadata: { changedFields: Object.keys(data) },
      },
    })

    return NextResponse.json({ success: true, data: updated })
  } catch (error) {
    if (error instanceof Error && error.message === 'Admin authentication required') {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: 'Validation failed', details: error.issues },
        { status: 400 }
      )
    }
    console.error('Update faculty error:', error)
    return NextResponse.json({ success: false, error: 'Failed to update faculty' }, { status: 500 })
  }
}

// Soft-deactivate only: TEACHER users can hold enrollment/content relations,
// so hard deletes are never safe here. Sets profile.status = 'inactive'.
export async function DELETE(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    await requireAdminAuth()
    const { id } = await context.params

    const faculty = await getFacultyOr404(id)
    if (!faculty) {
      return NextResponse.json({ success: false, error: 'Faculty not found' }, { status: 404 })
    }

    const existingProfile = (faculty.profile as Record<string, unknown> | null) || {}
    await prisma.users.update({
      where: { id },
      data: {
        profile: { ...existingProfile, status: 'inactive' } as Prisma.InputJsonValue,
        updatedAt: new Date(),
      },
    })

    await prisma.activities.create({
      data: {
        id: uuidv4(),
        userId: id,
        action: 'faculty_deactivated',
        description: `Faculty "${faculty.name}" deactivated`,
      },
    })

    return NextResponse.json({ success: true, message: 'Faculty deactivated' })
  } catch (error) {
    if (error instanceof Error && error.message === 'Admin authentication required') {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }
    console.error('Deactivate faculty error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to deactivate faculty' },
      { status: 500 }
    )
  }
}
