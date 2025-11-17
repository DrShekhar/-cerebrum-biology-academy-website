import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import prisma from '@/lib/prisma'

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

export async function POST(request: NextRequest) {
  try {
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
          details: error.errors,
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
