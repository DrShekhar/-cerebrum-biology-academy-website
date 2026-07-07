import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import prisma from '@/lib/prisma'
import { requireAdminAuth } from '@/lib/auth'
import { upsertLeadCore } from '@/lib/leads/upsertLead'
import type { LeadStage, Priority } from '@/generated/prisma'

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

const LEAD_SOURCE_MAP: Record<
  string,
  'WEBSITE' | 'REFERRAL' | 'SOCIAL_MEDIA' | 'ADVERTISEMENT' | 'MANUAL_ENTRY'
> = {
  website: 'WEBSITE',
  referral: 'REFERRAL',
  social_media: 'SOCIAL_MEDIA',
  advertisement: 'ADVERTISEMENT',
  direct: 'MANUAL_ENTRY',
}

export async function POST(request: NextRequest) {
  try {
    // Verify admin authentication
    const session = await requireAdminAuth()

    const body = await request.json()

    // Validate request body
    const validatedData = addStudentSchema.parse(body)

    // Canonical CRM write: dedup by phone (phoneNormalized stamped), staff
    // create keeps its own note/activity, so skipTask. Rich details that have
    // no column are folded into a linked note + courseInterest context.
    const result = await upsertLeadCore(prisma, {
      name: validatedData.studentName,
      phone: validatedData.phone,
      email: validatedData.email,
      courseInterest: `${validatedData.courseInterest}${validatedData.class ? ` — Class ${validatedData.class}` : ''}`,
      source: 'admin-panel',
      sourceEnum: LEAD_SOURCE_MAP[validatedData.leadSource] || 'MANUAL_ENTRY',
      priority: validatedData.priority,
      skipTask: true,
    })
    const existing = !result.created
    const student = await prisma.leads.findUnique({ where: { id: result.leadId } })

    // Capture the extra detail (school/city/state/parent/DOB/notes) as a note.
    const noteLines = [
      validatedData.school && `School: ${validatedData.school}`,
      (validatedData.city || validatedData.state) &&
        `Location: ${[validatedData.city, validatedData.state].filter(Boolean).join(', ')}`,
      validatedData.dateOfBirth && `DOB: ${validatedData.dateOfBirth}`,
      validatedData.whatsappNumber && `WhatsApp: ${validatedData.whatsappNumber}`,
      validatedData.parentName && `Parent: ${validatedData.parentName}`,
      validatedData.parentPhone && `Parent phone: ${validatedData.parentPhone}`,
      validatedData.notes && `Notes: ${validatedData.notes}`,
    ].filter(Boolean)
    if (noteLines.length) {
      await prisma.notes.create({
        data: {
          id: `note_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
          leadId: result.leadId,
          content: noteLines.join('\n'),
          createdById: session.user.id,
          updatedAt: new Date(),
        },
      })
    }

    // Log activity (real activities schema).
    await prisma.activities.create({
      data: {
        id: `act_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
        userId: session.user.id,
        leadId: result.leadId,
        action: 'LEAD_CREATED',
        description: `Lead ${validatedData.studentName} added via admin panel`,
        metadata: { source: 'admin_panel', email: validatedData.email },
      },
    })

    return NextResponse.json(
      {
        success: true,
        message: existing ? 'Matched an existing lead by phone' : 'Student added successfully',
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
    const session = await requireAdminAuth()

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

    // Map the form status/priority to the real LeadStage/Priority enums.
    const STAGE_MAP: Record<string, LeadStage> = {
      lead: 'NEW_LEAD',
      active: 'ACTIVE_STUDENT',
      enrolled: 'ENROLLED',
      paused: 'ACTIVE_STUDENT',
      completed: 'ACTIVE_STUDENT',
      dropped: 'LOST',
    }
    const PRIORITY_MAP: Record<string, Priority> = {
      high: 'HOT',
      medium: 'WARM',
      low: 'COLD',
    }

    // Update student in database (REAL leads schema). Fields with no column —
    // whatsappNumber/dateOfBirth/class/school/city/state/parent*/notes/tags —
    // are folded into a linked note below.
    const updatedStudent = await prisma.leads.update({
      where: { id: validatedData.id },
      data: {
        studentName: validatedData.studentName,
        email: validatedData.email,
        phone: validatedData.phone,
        source: LEAD_SOURCE_MAP[validatedData.leadSource] || 'MANUAL_ENTRY',
        priority: PRIORITY_MAP[validatedData.priority] || 'WARM',
        stage: STAGE_MAP[validatedData.status] || 'NEW_LEAD',
        updatedAt: new Date(),
      },
    })

    // Capture the extra detail (school/city/state/parent/DOB/notes) as a note.
    const noteLines = [
      validatedData.school && `School: ${validatedData.school}`,
      (validatedData.city || validatedData.state) &&
        `Location: ${[validatedData.city, validatedData.state].filter(Boolean).join(', ')}`,
      validatedData.dateOfBirth && `DOB: ${validatedData.dateOfBirth}`,
      validatedData.whatsappNumber && `WhatsApp: ${validatedData.whatsappNumber}`,
      validatedData.parentName && `Parent: ${validatedData.parentName}`,
      validatedData.parentPhone && `Parent phone: ${validatedData.parentPhone}`,
      validatedData.notes && `Notes: ${validatedData.notes}`,
    ].filter(Boolean)
    if (noteLines.length) {
      await prisma.notes.create({
        data: {
          id: `note_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
          leadId: updatedStudent.id,
          content: noteLines.join('\n'),
          createdById: session.user.id,
          updatedAt: new Date(),
        },
      })
    }

    // Log activity (real activities schema).
    await prisma.activities.create({
      data: {
        id: `act_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
        userId: session.user.id,
        leadId: updatedStudent.id,
        action: 'LEAD_UPDATED',
        description: `Student ${validatedData.studentName} updated via admin panel`,
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
