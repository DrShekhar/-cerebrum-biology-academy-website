import { NextRequest, NextResponse } from 'next/server'
import { withCounselor } from '@/lib/auth/middleware'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const updateTaskSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  status: z.enum(['TODO', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED']).optional(),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH', 'URGENT']).optional(),
  dueDate: z.string().optional(),
})

async function handlePATCH(
  request: NextRequest,
  session: any,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params
    const body = await request.json()
    const validatedData = updateTaskSchema.parse(body)

    const existingTask = await prisma.task.findUnique({
      where: { id },
      include: {
        lead: {
          select: {
            id: true,
            studentName: true,
          },
        },
      },
    })

    if (!existingTask) {
      return NextResponse.json(
        {
          success: false,
          error: 'Task not found',
        },
        { status: 404 }
      )
    }

    if (existingTask.assignedToId !== session.userId && session.role !== 'ADMIN') {
      return NextResponse.json(
        {
          success: false,
          error: 'Access denied',
        },
        { status: 403 }
      )
    }

    const updateData: any = { ...validatedData }
    if (validatedData.dueDate) {
      updateData.dueDate = new Date(validatedData.dueDate)
    }

    if (validatedData.status === 'COMPLETED' && existingTask.status !== 'COMPLETED') {
      updateData.completedAt = new Date()
    }

    const task = await prisma.task.update({
      where: { id },
      data: updateData,
      include: {
        lead: {
          select: {
            id: true,
            studentName: true,
          },
        },
      },
    })

    if (task.leadId) {
      await prisma.activity.create({
        data: {
          userId: session.userId,
          leadId: task.leadId,
          action: 'TASK_UPDATED',
          description: `Updated task: ${task.title} - Status: ${task.status}`,
        },
      })
    }

    return NextResponse.json({
      success: true,
      data: task,
      message: 'Task updated successfully',
    })
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

    console.error('Error updating task:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to update task',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}

async function handleDELETE(
  request: NextRequest,
  session: any,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params

    const existingTask = await prisma.task.findUnique({
      where: { id },
    })

    if (!existingTask) {
      return NextResponse.json(
        {
          success: false,
          error: 'Task not found',
        },
        { status: 404 }
      )
    }

    if (existingTask.assignedToId !== session.userId && session.role !== 'ADMIN') {
      return NextResponse.json(
        {
          success: false,
          error: 'Access denied',
        },
        { status: 403 }
      )
    }

    await prisma.task.delete({
      where: { id },
    })

    return NextResponse.json({
      success: true,
      message: 'Task deleted successfully',
    })
  } catch (error) {
    console.error('Error deleting task:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to delete task',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}

export const PATCH = withCounselor((req: NextRequest, session: any) =>
  handlePATCH(req, session, { params: Promise.resolve({ id: req.url.split('/').pop() || '' }) })
)
export const DELETE = withCounselor((req: NextRequest, session: any) =>
  handleDELETE(req, session, { params: Promise.resolve({ id: req.url.split('/').pop() || '' }) })
)
