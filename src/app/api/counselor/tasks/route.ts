import { NextRequest, NextResponse } from 'next/server'
import { authenticateCounselor } from '@/lib/auth/counselor-auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const createTaskSchema = z.object({
  leadId: z.string().optional(),
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  // Accept the UI's labels; mapped to the real TaskType enum below.
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
  status: z
    .enum(['TODO', 'PENDING', 'IN_PROGRESS', 'COMPLETED', 'SNOOZED', 'CANCELLED'])
    .optional(),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH', 'URGENT']).optional(),
  dueDate: z.string().optional(),
})

// Map UI labels → real Prisma enums (schema: TaskType / TaskPriority / TaskStatus).
const TASK_TYPE_MAP: Record<
  string,
  | 'FOLLOW_UP_CALL'
  | 'SEND_WHATSAPP'
  | 'SEND_EMAIL'
  | 'PAYMENT_REMINDER'
  | 'DEMO_FOLLOWUP'
  | 'CUSTOM'
> = {
  FOLLOW_UP: 'FOLLOW_UP_CALL',
  DEMO_REMINDER: 'DEMO_FOLLOWUP',
  PAYMENT_REMINDER: 'PAYMENT_REMINDER',
  OFFER_EXPIRY: 'CUSTOM',
  DOCUMENT_COLLECTION: 'CUSTOM',
  OTHER: 'CUSTOM',
}
const mapTaskPriority = (p: string): 'HIGH' | 'MEDIUM' | 'LOW' =>
  p === 'URGENT' || p === 'HIGH' ? 'HIGH' : p === 'LOW' ? 'LOW' : 'MEDIUM'
const mapTaskStatus = (
  s?: string
): 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'SNOOZED' | 'CANCELLED' | undefined =>
  s === 'TODO'
    ? 'PENDING'
    : (s as 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'SNOOZED' | 'CANCELLED' | undefined)

const rand = (p: string) => `${p}_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`

export async function GET(request: NextRequest) {
  try {
    const authResult = await authenticateCounselor()
    if ('error' in authResult) return authResult.error
    const { session } = authResult

    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const leadId = searchParams.get('leadId')
    const overdue = searchParams.get('overdue') === 'true'

    const where: any = {
      assignedToId: session.userId,
    }

    if (status) {
      where.status = mapTaskStatus(status)
    }

    if (leadId) {
      where.leadId = leadId
    }

    if (overdue) {
      where.dueDate = {
        lt: new Date(),
      }
    }

    const tasks = await prisma.tasks.findMany({
      where,
      include: {
        leads: {
          select: {
            id: true,
            studentName: true,
            phone: true,
            email: true,
            stage: true,
          },
        },
        // Real relation name (was `users` — doesn't exist → threw).
        users_tasks_assignedToIdTousers: {
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

export async function POST(request: NextRequest) {
  try {
    const authResult = await authenticateCounselor()
    if ('error' in authResult) return authResult.error
    const { session } = authResult

    const body = await request.json()
    const validatedData = createTaskSchema.parse(body)

    if (validatedData.leadId) {
      const lead = await prisma.leads.findUnique({
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

    const task = await prisma.tasks.create({
      data: {
        id: rand('task'),
        leadId: validatedData.leadId,
        title: validatedData.title,
        description: validatedData.description,
        type: TASK_TYPE_MAP[validatedData.type] || 'CUSTOM',
        priority: mapTaskPriority(validatedData.priority),
        dueDate: new Date(validatedData.dueDate),
        assignedToId: session.userId,
        createdById: session.userId,
        status: 'PENDING',
        updatedAt: new Date(),
      },
      include: {
        leads: {
          select: {
            id: true,
            studentName: true,
          },
        },
      },
    })

    if (validatedData.leadId) {
      await prisma.activities.create({
        data: {
          id: rand('act'),
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
          details: error.issues,
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
