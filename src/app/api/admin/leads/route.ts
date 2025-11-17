import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { requireAdminAuth } from '@/lib/auth'
import { v4 as uuidv4 } from 'uuid'

const createLeadSchema = z.object({
  studentName: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Invalid email address').optional().or(z.literal('')),
  phone: z
    .string()
    .min(10, 'Phone must be at least 10 digits')
    .regex(/^[+]?[\d\s()-]+$/, 'Invalid phone number format'),
  courseInterest: z.string().min(1, 'Course interest is required'),
  source: z.enum([
    'MANUAL_ENTRY',
    'WALK_IN',
    'PHONE_CALL',
    'REFERRAL',
    'WHATSAPP',
    'EMAIL',
    'SOCIAL_MEDIA',
    'WEBSITE',
    'ADVERTISEMENT',
    'EVENT',
    'OTHER',
  ]),
  priority: z.enum(['HOT', 'WARM', 'COLD']).default('WARM'),
  assignedToId: z.string().min(1, 'Assigned counselor is required'),
  nextFollowUpAt: z.string().optional(),
  notes: z.string().optional(),
})

export async function POST(request: NextRequest) {
  try {
    await requireAdminAuth()

    const body = await request.json()
    const validatedData = createLeadSchema.parse(body)

    const lead = await prisma.leads.create({
      data: {
        id: uuidv4(),
        studentName: validatedData.studentName,
        email: validatedData.email || null,
        phone: validatedData.phone,
        courseInterest: validatedData.courseInterest,
        source: validatedData.source as any,
        priority: validatedData.priority as any,
        stage: 'NEW_LEAD',
        assignedToId: validatedData.assignedToId,
        nextFollowUpAt: validatedData.nextFollowUpAt
          ? new Date(validatedData.nextFollowUpAt)
          : null,
        updatedAt: new Date(),
      },
    })

    if (validatedData.notes) {
      await prisma.notes.create({
        data: {
          id: uuidv4(),
          leadId: lead.id,
          content: validatedData.notes,
          createdById: validatedData.assignedToId,
          updatedAt: new Date(),
        },
      })
    }

    await prisma.activities.create({
      data: {
        id: uuidv4(),
        userId: validatedData.assignedToId,
        leadId: lead.id,
        action: 'lead_created',
        description: `New lead "${validatedData.studentName}" added to CRM`,
        metadata: {
          source: validatedData.source,
          priority: validatedData.priority,
          courseInterest: validatedData.courseInterest,
        },
      },
    })

    return NextResponse.json(
      { success: true, message: 'Lead added successfully', data: lead },
      { status: 201 }
    )
  } catch (error) {
    console.error('Create lead error:', error)

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

    return NextResponse.json({ success: false, error: 'Failed to create lead' }, { status: 500 })
  }
}
