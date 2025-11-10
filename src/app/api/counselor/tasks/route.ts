import { NextRequest, NextResponse } from 'next/server'
import { withCounselor } from '@/lib/auth/middleware'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const createTaskSchema = z.object({
  leadId: z.string().optional(),
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  type: z.enum([
    'FOLLOW_UP',
    'DEMO_REMINDER',
    'PAYMENT_REMINDER',
    'OFFER_EXPIRY',
    'DOCUMENT_COLLECTION',
    'OTHER',
  ]),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH', 'URGENT']),
  dueDate: z.string().min(1, 'Due date is required'),
})

const updateTaskSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  status: z.enum(['TODO', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED']).optional(),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH', 'URGENT']).optional(),
  dueDate: z.string().optional(),
})

async function handleGET(request: NextRequest, session: any) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const leadId = searchParams.get('leadId')
    const overdue = searchParams.get('overdue') === 'true'

    const where: any = {
      assignedToId: session.userId,
    }

    if (status) {
      where.status = status
    }

    if (leadId) {
      where.leadId = leadId
    }

    if (overdue) {
      where.dueDate = {
        lt: new Date(),
      }
      where.status = {
        notIn: ['COMPLETED', 'CANCELLED'],
      }
    }

    const tasks = await prisma.task.findMany({
      where,
      include: {
        lead: {
          select: {
            id: true,
            studentName: true,
            phone: true,
            email: true,
            stage: true,
          },
        },
        assignedTo: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: [{ priority: 'desc' }, { dueDate: 'asc' }],
    })

    return NextResponse.json({
      success: true,
      data: tasks,
      count: tasks.length,
    })
  } catch (error) {
    console.error('Error fetching tasks:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch tasks',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}

async function handlePOST(request: NextRequest, session: any) {
  try {
    const body = await request.json()
    const validatedData = createTaskSchema.parse(body)

    if (validatedData.leadId) {
      const lead = await prisma.lead.findUnique({
        where: { id: validatedData.leadId },
        select: { assignedToId: true },
      })

      if (!lead) {
        return NextResponse.json(
          {
            success: false,
            error: 'Lead not found',
          },
          { status: 404 }
        )
      }

      if (lead.assignedToId !== session.userId && session.role !== 'ADMIN') {
        return NextResponse.json(
          {
            success: false,
            error: 'Access denied',
          },
          { status: 403 }
        )
      }
    }

    const task = await prisma.task.create({
      data: {
        ...validatedData,
        dueDate: new Date(validatedData.dueDate),
        assignedToId: session.userId,
        status: 'TODO',
      },
      include: {
        lead: {
          select: {
            id: true,
            studentName: true,
          },
        },
      },
    })

    if (validatedData.leadId) {
      await prisma.activity.create({
        data: {
          userId: session.userId,
          leadId: validatedData.leadId,
          action: 'TASK_CREATED',
          description: `Created task: ${task.title}`,
        },
      })
    }

    return NextResponse.json(
      {
        success: true,
        data: task,
        message: 'Task created successfully',
      },
      { status: 201 }
    )
  } catch (error) {
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

    console.error('Error creating task:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to create task',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}

export const GET = withCounselor(handleGET)
export const POST = withCounselor(handlePOST)
