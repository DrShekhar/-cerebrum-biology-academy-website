import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireTeacher } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    const session = await requireTeacher()
    const userId = session.user.id
    const { searchParams } = new URL(request.url)

    const status = searchParams.get('status')
    const priority = searchParams.get('priority')
    const assigned = searchParams.get('assigned')
    const search = searchParams.get('search') || ''
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')

    const where: any = {
      OR: [{ instructorId: userId }, { instructorId: null }],
    }

    if (assigned === 'me') {
      where.OR = [{ instructorId: userId }]
    } else if (assigned === 'unassigned') {
      where.OR = [{ instructorId: null }]
    }

    if (status) {
      where.status = status
    }

    if (priority) {
      where.priority = priority
    }

    if (search) {
      where.AND = where.AND || []
      where.AND.push({
        OR: [
          { subject: { contains: search, mode: 'insensitive' } },
          { description: { contains: search, mode: 'insensitive' } },
          { tags: { hasSome: [search] } },
        ],
      })
    }

    const [doubts, total] = await Promise.all([
      prisma.doubt_tickets.findMany({
        where,
        include: {
          users_doubt_tickets_studentIdTousers: {
            select: {
              id: true,
              name: true,
              email: true,
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
          users_doubt_tickets_instructorIdTousers: {
            select: {
              id: true,
              name: true,
            },
          },
          doubt_messages: {
            select: {
              id: true,
              createdAt: true,
            },
            orderBy: {
              createdAt: 'desc',
            },
            take: 1,
          },
        },
        orderBy: [{ priority: 'desc' }, { lastMessageAt: 'desc' }],
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.doubt_tickets.count({ where }),
    ])

    const stats = await prisma.doubt_tickets.groupBy({
      by: ['status'],
      where: {
        OR: [{ instructorId: userId }, { instructorId: null }],
      },
      _count: {
        id: true,
      },
    })

    const statusCounts = stats.reduce(
      (acc, stat) => {
        acc[stat.status] = stat._count.id
        return acc
      },
      {} as Record<string, number>
    )

    return NextResponse.json({
      success: true,
      doubts: doubts.map((doubt) => ({
        id: doubt.id,
        subject: doubt.subject,
        description: doubt.description,
        priority: doubt.priority,
        status: doubt.status,
        student: doubt.users_doubt_tickets_studentIdTousers,
        category: doubt.doubt_categories,
        course: doubt.courses,
        instructor: doubt.users_doubt_tickets_instructorIdTousers,
        tags: doubt.tags,
        viewCount: doubt.viewCount,
        responseTime: doubt.responseTime,
        lastMessageAt: doubt.lastMessageAt,
        createdAt: doubt.createdAt,
        messageCount: doubt.doubt_messages.length,
      })),
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
      stats: statusCounts,
    })
  } catch (error) {
    console.error('Failed to fetch teacher doubts:', error)
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
