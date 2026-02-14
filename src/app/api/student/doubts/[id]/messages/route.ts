import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'
import { z } from 'zod'

const createMessageSchema = z.object({
  message: z.string().min(1, 'Message cannot be empty'),
  messageType: z.enum(['TEXT', 'IMAGE', 'FILE', 'VOICE', 'VIDEO']).default('TEXT'),
  attachments: z.array(z.string()).default([]),
})

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await auth()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized. Please sign in.' }, { status: 401 })
    }

    const userId = session.user.id
    const doubtId = params.id
    const body = await request.json()

    const validatedData = createMessageSchema.parse(body)

    const doubt = await prisma.doubt_tickets.findUnique({
      where: { id: doubtId },
      select: {
        id: true,
        studentId: true,
        instructorId: true,
        status: true,
      },
    })

    if (!doubt) {
      return NextResponse.json({ success: false, error: 'Doubt not found' }, { status: 404 })
    }

    if (
      doubt.studentId !== userId &&
      doubt.instructorId !== userId &&
      session.user.role !== 'TEACHER' &&
      session.user.role !== 'ADMIN'
    ) {
      return NextResponse.json(
        { success: false, error: 'You do not have permission to reply to this doubt' },
        { status: 403 }
      )
    }

    if (doubt.status === 'CLOSED') {
      return NextResponse.json(
        { success: false, error: 'Cannot add messages to a closed doubt' },
        { status: 400 }
      )
    }

    const message = await prisma.doubt_messages.create({
      data: {
        doubtId,
        senderId: userId,
        message: validatedData.message,
        messageType: validatedData.messageType,
        attachments: validatedData.attachments,
      },
      include: {
        sender: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        },
      },
    })

    let newStatus = doubt.status
    if (userId !== doubt.studentId && doubt.status === 'OPEN') {
      newStatus = 'IN_PROGRESS'
    } else if (
      userId !== doubt.studentId &&
      (doubt.status === 'IN_PROGRESS' || doubt.status === 'OPEN')
    ) {
      newStatus = 'ANSWERED'
    }

    const responseTime =
      doubt.status === 'OPEN' && userId !== doubt.studentId
        ? Math.floor((new Date().getTime() - new Date(doubt.createdAt).getTime()) / (1000 * 60))
        : undefined

    await prisma.doubt_tickets.update({
      where: { id: doubtId },
      data: {
        status: newStatus,
        lastMessageAt: new Date(),
        ...(responseTime && { responseTime }),
        ...(userId !== doubt.studentId && !doubt.instructorId && { instructorId: userId }),
      },
    })

    return NextResponse.json({
      success: true,
      message: {
        id: message.id,
        message: message.message,
        messageType: message.messageType,
        attachments: message.attachments,
        sender: message.sender,
        isRead: message.isRead,
        createdAt: message.createdAt,
      },
    })
  } catch (error) {
    console.error('Failed to create message:', error)

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
      {
        success: false,
        error: 'Failed to create message',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
