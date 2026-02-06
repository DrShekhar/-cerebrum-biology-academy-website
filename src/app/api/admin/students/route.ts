import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import prisma from '@/lib/prisma'
import { requireAdminAuth } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    await requireAdminAuth()

    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search')
    const role = searchParams.get('role')
    const status = searchParams.get('status')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '50')
    const offset = (page - 1) * limit

    const where: Record<string, unknown> = {}

    if (role && role !== 'all') {
      where.role = role.toUpperCase()
    } else {
      where.role = { in: ['STUDENT', 'PARENT'] }
    }

    if (status === 'active') {
      where.lastActiveAt = { gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) }
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
        { phone: { contains: search } },
      ]
    }

    const [students, total] = await Promise.all([
      prisma.users.findMany({
        where,
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          role: true,
          profile: true,
          coachingTier: true,
          createdAt: true,
          lastActiveAt: true,
          enrollments: {
            select: {
              id: true,
              status: true,
              courses: { select: { id: true, name: true } },
            },
          },
        },
        orderBy: { createdAt: 'desc' },
        skip: offset,
        take: limit,
      }),
      prisma.users.count({ where }),
    ])

    const roleCounts = await prisma.users.groupBy({
      by: ['role'],
      _count: true,
      where: { role: { in: ['STUDENT', 'PARENT'] } },
    })

    const activeCount = await prisma.users.count({
      where: {
        role: { in: ['STUDENT', 'PARENT'] },
        lastActiveAt: { gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
      },
    })

    return NextResponse.json({
      success: true,
      data: {
        students,
        pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
        stats: {
          total: roleCounts.reduce((s, r) => s + r._count, 0),
          active: activeCount,
          roleCounts: roleCounts.reduce(
            (acc, r) => ({ ...acc, [r.role]: r._count }),
            {} as Record<string, number>
          ),
        },
      },
    })
  } catch (error) {
    if (error instanceof Error && error.message === 'Admin authentication required') {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }
    console.error('Fetch students error:', error)
    return NextResponse.json({ success: false, error: 'Failed to fetch students' }, { status: 500 })
  }
}

const addStudentSchema = z.object({
  studentName: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Invalid email address'),
  phone: z
    .string()
    .min(10, 'Phone must be at least 10 digits')
    .regex(/^[+]?[\d\s()-]+$/, 'Invalid phone number format'),
  whatsappNumber: z.string().optional(),
  dateOfBirth: z.string().optional(),
  class: z.string().min(1, 'Class is required'),
  school: z.string().min(1, 'School name is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  courseInterest: z.string().min(1, 'Course interest is required'),
  leadSource: z.enum(['website', 'referral', 'social_media', 'advertisement', 'direct']),
  priority: z.enum(['HOT', 'WARM', 'COLD']).default('WARM'),
  parentName: z.string().optional(),
  parentPhone: z.string().optional(),
  notes: z.string().optional(),
})

const updateStudentSchema = z.object({
  id: z.string().min(1, 'Student ID is required'),
  studentName: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Invalid email address'),
  phone: z
    .string()
    .min(10, 'Phone must be at least 10 digits')
    .regex(/^[+]?[\d\s()-]+$/, 'Invalid phone number format'),
  whatsappNumber: z.string().optional(),
  dateOfBirth: z.string().optional(),
  class: z.string().min(1, 'Class is required'),
  school: z.string().min(1, 'School name is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  status: z.enum(['lead', 'active', 'enrolled', 'paused', 'completed', 'dropped']),
  leadSource: z.enum(['website', 'referral', 'social_media', 'advertisement', 'direct']),
  priority: z.enum(['high', 'medium', 'low']),
  parentName: z.string().optional(),
  parentPhone: z.string().optional(),
  notes: z.string().optional(),
  tags: z.array(z.string()).optional(),
})

export async function POST(request: NextRequest) {
  try {
    // Verify admin authentication
    await requireAdminAuth()

    const body = await request.json()

    // Validate request body
    const validatedData = addStudentSchema.parse(body)

    // Create student in database
    const student = await prisma.leads.create({
      data: {
        name: validatedData.studentName,
        email: validatedData.email,
        phone: validatedData.phone,
        whatsappNumber: validatedData.whatsappNumber || null,
        dateOfBirth: validatedData.dateOfBirth ? new Date(validatedData.dateOfBirth) : null,
        class: validatedData.class,
        school: validatedData.school,
        city: validatedData.city,
        state: validatedData.state,
        courseInterest: validatedData.courseInterest,
        leadSource: validatedData.leadSource,
        priority: validatedData.priority,
        parentName: validatedData.parentName || null,
        parentPhone: validatedData.parentPhone || null,
        notes: validatedData.notes || null,
        status: 'NEW',
        createdBy: 'admin',
      },
    })

    // Log activity
    await prisma.activities.create({
      data: {
        entityType: 'lead',
        entityId: student.id,
        action: 'created',
        description: `Student ${validatedData.studentName} added via admin panel`,
        performedBy: 'admin',
        metadata: {
          source: 'admin_panel',
          studentName: validatedData.studentName,
          email: validatedData.email,
        },
      },
    })

    return NextResponse.json(
      {
        success: true,
        message: 'Student added successfully',
        data: student,
      },
      { status: 201 }
    )
  } catch (error) {
    // Handle Zod validation errors
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

    // Handle Prisma errors
    if (error instanceof Error) {
      // Check for unique constraint violations
      if (error.message.includes('Unique constraint')) {
        return NextResponse.json(
          {
            success: false,
            error: 'A student with this email or phone already exists',
          },
          { status: 409 }
        )
      }

      console.error('Error creating student:', error)
      return NextResponse.json(
        {
          success: false,
          error: error.message || 'Failed to create student',
        },
        { status: 500 }
      )
    }

    return NextResponse.json(
      {
        success: false,
        error: 'An unexpected error occurred',
      },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    // Verify admin authentication
    await requireAdminAuth()

    const body = await request.json()

    // Validate request body
    const validatedData = updateStudentSchema.parse(body)

    // Check if student exists
    const existingStudent = await prisma.leads.findUnique({
      where: { id: validatedData.id },
    })

    if (!existingStudent) {
      return NextResponse.json(
        {
          success: false,
          error: 'Student not found',
        },
        { status: 404 }
      )
    }

    // Update student in database
    const updatedStudent = await prisma.leads.update({
      where: { id: validatedData.id },
      data: {
        name: validatedData.studentName,
        email: validatedData.email,
        phone: validatedData.phone,
        whatsappNumber: validatedData.whatsappNumber || null,
        dateOfBirth: validatedData.dateOfBirth ? new Date(validatedData.dateOfBirth) : null,
        class: validatedData.class,
        school: validatedData.school,
        city: validatedData.city,
        state: validatedData.state,
        leadSource: validatedData.leadSource,
        priority: validatedData.priority.toUpperCase() as any,
        parentName: validatedData.parentName || null,
        parentPhone: validatedData.parentPhone || null,
        notes: validatedData.notes || null,
        status: validatedData.status.toUpperCase() as any,
        tags: validatedData.tags || [],
        updatedAt: new Date(),
      },
    })

    // Log activity
    await prisma.activities.create({
      data: {
        entityType: 'lead',
        entityId: updatedStudent.id,
        action: 'updated',
        description: `Student ${validatedData.studentName} updated via admin panel`,
        performedBy: 'admin',
        metadata: {
          source: 'admin_panel',
          studentName: validatedData.studentName,
          email: validatedData.email,
          changes: {
            status: validatedData.status,
            priority: validatedData.priority,
          },
        },
      },
    })

    return NextResponse.json(
      {
        success: true,
        message: 'Student updated successfully',
        data: updatedStudent,
      },
      { status: 200 }
    )
  } catch (error) {
    // Handle Zod validation errors
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

    // Handle Prisma errors
    if (error instanceof Error) {
      console.error('Error updating student:', error)
      return NextResponse.json(
        {
          success: false,
          error: error.message || 'Failed to update student',
        },
        { status: 500 }
      )
    }

    return NextResponse.json(
      {
        success: false,
        error: 'An unexpected error occurred',
      },
      { status: 500 }
    )
  }
}
