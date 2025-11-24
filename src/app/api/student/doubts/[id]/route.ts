import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await auth()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized. Please sign in.' }, { status: 401 })
    }

    const userId = session.user.id
    const doubtId = params.id

    const doubt = await prisma.doubtTickets.findUnique({
      where: { id: doubtId },
      include: {
        student: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        instructor: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        },
        category: {
          select: {
            id: true,
            name: true,
            icon: true,
            color: true,
          },
        },
        course: {
          select: {
            id: true,
            name: true,
          },
        },
        chapter: {
          select: {
            id: true,
            title: true,
          },
        },
        topic: {
          select: {
            id: true,
            title: true,
          },
        },
        messages: {
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
          orderBy: {
            createdAt: 'asc',
          },
        },
      },
    })

    if (!doubt) {
      return NextResponse.json({ success: false, error: 'Doubt not found' }, { status: 404 })
    }

    if (
      doubt.studentId !== userId &&
      session.user.role !== 'teacher' &&
      session.user.role !== 'admin'
    ) {
      return NextResponse.json(
        { success: false, error: 'You do not have permission to view this doubt' },
        { status: 403 }
      )
    }

    await prisma.doubtTickets.update({
      where: { id: doubtId },
      data: {
        viewCount: {
          increment: 1,
        },
      },
    })

    await prisma.doubtMessages.updateMany({
      where: {
        doubtId,
        senderId: {
          not: userId,
        },
        isRead: false,
      },
      data: {
        isRead: true,
        readAt: new Date(),
      },
    })

    return NextResponse.json({
      success: true,
      doubt: {
        id: doubt.id,
        subject: doubt.subject,
        description: doubt.description,
        priority: doubt.priority,
        status: doubt.status,
        student: doubt.student,
        instructor: doubt.instructor,
        category: doubt.category,
        course: doubt.course,
        chapter: doubt.chapter,
        topic: doubt.topic,
        tags: doubt.tags,
        attachments: doubt.attachments,
        viewCount: doubt.viewCount + 1,
        responseTime: doubt.responseTime,
        resolvedAt: doubt.resolvedAt,
        studentRating: doubt.studentRating,
        studentFeedback: doubt.studentFeedback,
        lastMessageAt: doubt.lastMessageAt,
        createdAt: doubt.createdAt,
        updatedAt: doubt.updatedAt,
        messages: doubt.messages.map((msg) => ({
          id: msg.id,
          message: msg.message,
          messageType: msg.messageType,
          attachments: msg.attachments,
          sender: msg.sender,
          isRead: msg.isRead,
          readAt: msg.readAt,
          createdAt: msg.createdAt,
        })),
      },
    })
  } catch (error) {
    console.error('Failed to fetch doubt:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch doubt',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
