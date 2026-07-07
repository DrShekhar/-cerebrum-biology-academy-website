import { NextRequest, NextResponse } from 'next/server'
import { authenticateCounselor } from '@/lib/auth/counselor-auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const updateTaskSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  // Accept the legacy 'TODO' alias from older clients but normalize it to the
  // real TaskStatus enum member (PENDING) below — 'TODO' is not a DB value.
  status: z
    .enum(['TODO', 'PENDING', 'IN_PROGRESS', 'COMPLETED', 'SNOOZED', 'CANCELLED'])
    .optional(),
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

    const existingTask = await prisma.tasks.findUnique({
      where: { id },
      include: {
        leads: {
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
    if (validatedData.status === 'TODO') {
      updateData.status = 'PENDING'
    }
    if (validatedData.dueDate) {
      updateData.dueDate = new Date(validatedData.dueDate)
    }

    if (validatedData.status === 'COMPLETED' && existingTask.status !== 'COMPLETED') {
      updateData.completedAt = new Date()
    }

    const task = await prisma.tasks.update({
      where: { id },
      data: updateData,
      include: {
        leads: {
          select: {
            id: true,
            studentName: true,
          },
        },
      },
    })

    if (task.leadId) {
      await prisma.activities.create({
        data: {
          id: `act_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
          userId: session.userId,
          leadId: task.leadId,
          action: 'TASK_UPDATED',
          description: `Updated task: ${task.title} - Status: ${task.status}`,
        },
      })
    }

    const { leads: taskLead, ...taskRest } = task
    return NextResponse.json({
      success: true,
      data: { ...taskRest, lead: taskLead },
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

    const existingTask = await prisma.tasks.findUnique({
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

    await prisma.tasks.delete({
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

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const authResult = await authenticateCounselor()
  if ('error' in authResult) return authResult.error
  return handlePATCH(request, authResult.session, context)
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const authResult = await authenticateCounselor()
  if ('error' in authResult) return authResult.error
  return handleDELETE(request, authResult.session, context)
}
