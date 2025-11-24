import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'
import { z } from 'zod'

const createDoubtSchema = z.object({
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  description: z.string().min(20, 'Description must be at least 20 characters'),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH', 'URGENT']).default('MEDIUM'),
  categoryId: z.string().optional(),
  courseId: z.string().optional(),
  chapterId: z.string().optional(),
  topicId: z.string().optional(),
  tags: z.array(z.string()).default([]),
  attachments: z.array(z.string()).default([]),
})

export async function GET(request: NextRequest) {
  try {
    const session = await auth()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized. Please sign in.' }, { status: 401 })
    }

    const userId = session.user.id
    const { searchParams } = new URL(request.url)

    const status = searchParams.get('status')
    const categoryId = searchParams.get('categoryId')
    const priority = searchParams.get('priority')
    const search = searchParams.get('search') || ''
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')

    const where: any = {
      studentId: userId,
    }

    if (status) {
      where.status = status
    }

    if (categoryId) {
      where.categoryId = categoryId
    }

    if (priority) {
      where.priority = priority
    }

    if (search) {
      where.OR = [
        { subject: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { tags: { hasSome: [search] } },
      ]
    }

    const [doubts, total] = await Promise.all([
      prisma.doubtTickets.findMany({
        where,
        include: {
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
          instructor: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
          messages: {
            select: {
              id: true,
              isRead: true,
              createdAt: true,
            },
            orderBy: {
              createdAt: 'desc',
            },
            take: 1,
          },
        },
        orderBy: {
          lastMessageAt: 'desc',
        },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.doubtTickets.count({ where }),
    ])

    const unreadCount = await prisma.doubtMessages.count({
      where: {
        doubt: {
          studentId: userId,
        },
        senderId: {
          not: userId,
        },
        isRead: false,
      },
    })

    return NextResponse.json({
      success: true,
      doubts: doubts.map((doubt) => ({
        id: doubt.id,
        subject: doubt.subject,
        description: doubt.description,
        priority: doubt.priority,
        status: doubt.status,
        category: doubt.category,
        course: doubt.course,
        chapter: doubt.chapter,
        topic: doubt.topic,
        instructor: doubt.instructor,
        tags: doubt.tags,
        viewCount: doubt.viewCount,
        responseTime: doubt.responseTime,
        lastMessageAt: doubt.lastMessageAt,
        createdAt: doubt.createdAt,
        updatedAt: doubt.updatedAt,
        hasUnreadMessages: doubt.messages.some((m) => !m.isRead),
        messageCount: doubt.messages.length,
      })),
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
      unreadCount,
    })
  } catch (error) {
    console.error('Failed to fetch doubts:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch doubts',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized. Please sign in.' }, { status: 401 })
    }

    const userId = session.user.id
    const body = await request.json()

    const validatedData = createDoubtSchema.parse(body)

    if (validatedData.courseId) {
      const enrollment = await prisma.enrollments.findFirst({
        where: {
          userId,
          courseId: validatedData.courseId,
          status: 'ACTIVE',
        },
      })

      if (!enrollment) {
        return NextResponse.json(
          {
            success: false,
            error: 'You must be enrolled in the course to ask questions about it',
          },
          { status: 403 }
        )
      }
    }

    const doubt = await prisma.doubtTickets.create({
      data: {
        studentId: userId,
        subject: validatedData.subject,
        description: validatedData.description,
        priority: validatedData.priority,
        status: 'OPEN',
        categoryId: validatedData.categoryId,
        courseId: validatedData.courseId,
        chapterId: validatedData.chapterId,
        topicId: validatedData.topicId,
        tags: validatedData.tags,
        attachments: validatedData.attachments,
      },
      include: {
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
      },
    })

    const initialMessage = await prisma.doubtMessages.create({
      data: {
        doubtId: doubt.id,
        senderId: userId,
        message: validatedData.description,
        messageType: 'TEXT',
        attachments: validatedData.attachments,
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
        category: doubt.category,
        course: doubt.course,
        chapter: doubt.chapter,
        topic: doubt.topic,
        tags: doubt.tags,
        attachments: doubt.attachments,
        createdAt: doubt.createdAt,
      },
      message: initialMessage,
    })
  } catch (error) {
    console.error('Failed to create doubt:', error)

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
        error: 'Failed to create doubt',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
