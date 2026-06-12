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

    const doubt = await prisma.doubt_tickets.findUnique({
      where: { id: doubtId },
      include: {
        users_doubt_tickets_studentIdTousers: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        users_doubt_tickets_instructorIdTousers: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        },
        doubt_categories: {
          select: {
            id: true,
            name: true,
            icon: true,
            color: true,
          },
        },
        courses: {
          select: {
            id: true,
            name: true,
          },
        },
        chapters: {
          select: {
            id: true,
            title: true,
          },
        },
        topics: {
          select: {
            id: true,
            title: true,
          },
        },
        doubt_messages: {
          include: {
            users: {
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
      session.user.role !== 'TEACHER' &&
      session.user.role !== 'ADMIN'
    ) {
      return NextResponse.json(
        { success: false, error: 'You do not have permission to view this doubt' },
        { status: 403 }
      )
    }

    await prisma.doubt_tickets.update({
      where: { id: doubtId },
      data: {
        viewCount: {
          increment: 1,
        },
      },
    })

    await prisma.doubt_messages.updateMany({
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
        student: doubt.users_doubt_tickets_studentIdTousers,
        instructor: doubt.users_doubt_tickets_instructorIdTousers,
        category: doubt.doubt_categories,
        course: doubt.courses,
        chapter: doubt.chapters,
        topic: doubt.topics,
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
        messages: doubt.doubt_messages.map((msg) => ({
          id: msg.id,
          message: msg.message,
          messageType: msg.messageType,
          attachments: msg.attachments,
          sender: msg.users,
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
