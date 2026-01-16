import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth/config'
import type { NoticeCategory, NoticeTargetType } from '@/generated/prisma'

export const dynamic = 'force-dynamic'

// ============================================
// TYPES
// ============================================

interface NoticeFilters {
  category?: NoticeCategory
  isRead?: boolean
  limit?: number
  offset?: number
}

interface CreateNoticeData {
  title: string
  content: string
  category?: NoticeCategory
  targetType?: NoticeTargetType
  targetCourseIds?: string[]
  targetBatchIds?: string[]
  targetUserIds?: string[]
  priority?: number
  isPinned?: boolean
  attachments?: Array<{ name: string; url: string; type: string }>
  publishedAt?: string
  expiresAt?: string
}

// ============================================
// GET - Fetch notices for the current user
// ============================================

export async function GET(request: NextRequest) {
  try {
    const session = await auth()
    const { searchParams } = new URL(request.url)

    const category = searchParams.get('category') as NoticeCategory | null
    const limit = parseInt(searchParams.get('limit') || '20')
    const offset = parseInt(searchParams.get('offset') || '0')

    const now = new Date()

    // Base query conditions for active notices
    const baseConditions = {
      isActive: true,
      OR: [{ publishedAt: null }, { publishedAt: { lte: now } }],
      AND: [
        {
          OR: [{ expiresAt: null }, { expiresAt: { gt: now } }],
        },
      ],
    }

    // Build where clause based on user authentication
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let whereClause: any = { ...baseConditions }

    if (category) {
      whereClause.category = category
    }

    // If user is authenticated, filter by target type
    if (session?.user) {
      const userId = session.user.id

      // Get user's enrollments to determine their batches/courses
      const user = await prisma.users.findUnique({
        where: { id: userId },
        select: {
          id: true,
          enrollments: {
            where: { status: { in: ['ACTIVE', 'PENDING'] } },
            select: {
              courseId: true,
              batchId: true,
            },
          },
        },
      })

      const userCourseIds = user?.enrollments.map((e) => e.courseId).filter(Boolean) || []
      const userBatchIds = user?.enrollments.map((e) => e.batchId).filter(Boolean) || []

      // Filter notices that target this user
      whereClause = {
        ...whereClause,
        OR: [
          // Notices for all users
          { targetType: 'ALL' },
          // Notices for specific user
          { targetType: 'SPECIFIC_USERS', targetUserIds: { has: userId } },
          // Notices for user's courses
          ...(userCourseIds.length > 0
            ? [{ targetType: 'COURSE', targetCourseIds: { hasSome: userCourseIds } }]
            : []),
          // Notices for user's batches
          ...(userBatchIds.length > 0
            ? [{ targetType: 'BATCH', targetBatchIds: { hasSome: userBatchIds as string[] } }]
            : []),
        ],
      }
    } else {
      // For unauthenticated users, only show public notices
      whereClause.targetType = 'ALL'
    }

    // Fetch notices
    const [notices, total] = await Promise.all([
      prisma.notices.findMany({
        where: whereClause,
        orderBy: [{ isPinned: 'desc' }, { priority: 'desc' }, { publishedAt: 'desc' }],
        take: limit,
        skip: offset,
        select: {
          id: true,
          title: true,
          content: true,
          category: true,
          targetType: true,
          priority: true,
          isPinned: true,
          attachments: true,
          publishedAt: true,
          expiresAt: true,
          viewCount: true,
          createdAt: true,
          notice_reads: session?.user
            ? {
                where: { userId: session.user.id },
                select: { readAt: true },
              }
            : false,
        },
      }),
      prisma.notices.count({ where: whereClause }),
    ])

    // Transform notices to include read status
    const transformedNotices = notices.map((notice) => ({
      ...notice,
      isRead: Array.isArray(notice.notice_reads) && notice.notice_reads.length > 0,
      readAt: Array.isArray(notice.notice_reads) ? notice.notice_reads[0]?.readAt : undefined,
      notice_reads: undefined,
    }))

    return NextResponse.json({
      success: true,
      data: {
        notices: transformedNotices,
        pagination: {
          total,
          limit,
          offset,
          hasMore: offset + notices.length < total,
        },
      },
    })
  } catch (error) {
    console.error('Error fetching notices:', error)
    return NextResponse.json({ success: false, error: 'Failed to fetch notices' }, { status: 500 })
  }
}

// ============================================
// POST - Create a new notice (admin/teacher only)
// ============================================

export async function POST(request: NextRequest) {
  try {
    const session = await auth()

    if (!session?.user) {
      return NextResponse.json({ success: false, error: 'Authentication required' }, { status: 401 })
    }

    // Check if user has permission to create notices
    const userRole = (session.user.role || 'STUDENT').toString().toUpperCase()
    const allowedRoles = ['ADMIN', 'TEACHER', 'COUNSELOR']

    if (!allowedRoles.includes(userRole)) {
      return NextResponse.json(
        { success: false, error: 'You do not have permission to create notices' },
        { status: 403 }
      )
    }

    const body: CreateNoticeData = await request.json()

    // Validate required fields
    if (!body.title || !body.content) {
      return NextResponse.json(
        { success: false, error: 'Title and content are required' },
        { status: 400 }
      )
    }

    // Create the notice
    const notice = await prisma.notices.create({
      data: {
        title: body.title,
        content: body.content,
        category: body.category || 'ANNOUNCEMENT',
        targetType: body.targetType || 'ALL',
        targetCourseIds: body.targetCourseIds || [],
        targetBatchIds: body.targetBatchIds || [],
        targetUserIds: body.targetUserIds || [],
        priority: body.priority || 0,
        isPinned: body.isPinned || false,
        attachments: body.attachments || null,
        publishedAt: body.publishedAt ? new Date(body.publishedAt) : new Date(),
        expiresAt: body.expiresAt ? new Date(body.expiresAt) : null,
        createdById: session.user.id,
        isActive: true,
      },
    })

    return NextResponse.json({
      success: true,
      data: notice,
      message: 'Notice created successfully',
    })
  } catch (error) {
    console.error('Error creating notice:', error)
    return NextResponse.json({ success: false, error: 'Failed to create notice' }, { status: 500 })
  }
}
