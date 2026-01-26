import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth/config'
import type { NoticeCategory, NoticeTargetType } from '@/types/prisma-enums'

export const dynamic = 'force-dynamic'

interface RouteContext {
  params: Promise<{ id: string }>
}

// ============================================
// GET - Fetch a single notice and mark as read
// ============================================

export async function GET(request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params
    const session = await auth()

    const notice = await prisma.notices.findUnique({
      where: { id },
      select: {
        id: true,
        title: true,
        content: true,
        category: true,
        targetType: true,
        targetCourseIds: true,
        targetBatchIds: true,
        targetUserIds: true,
        priority: true,
        isPinned: true,
        isActive: true,
        attachments: true,
        publishedAt: true,
        expiresAt: true,
        createdById: true,
        viewCount: true,
        createdAt: true,
        updatedAt: true,
        notice_reads: session?.user
          ? {
              where: { userId: session.user.id },
              select: { readAt: true },
            }
          : false,
      },
    })

    if (!notice) {
      return NextResponse.json({ success: false, error: 'Notice not found' }, { status: 404 })
    }

    // Check if notice is active and published
    const now = new Date()
    if (!notice.isActive) {
      return NextResponse.json({ success: false, error: 'Notice not found' }, { status: 404 })
    }
    if (notice.publishedAt && notice.publishedAt > now) {
      return NextResponse.json({ success: false, error: 'Notice not found' }, { status: 404 })
    }
    if (notice.expiresAt && notice.expiresAt < now) {
      return NextResponse.json({ success: false, error: 'Notice has expired' }, { status: 410 })
    }

    // Mark as read if user is authenticated
    if (session?.user) {
      await prisma.notice_reads.upsert({
        where: {
          noticeId_userId: {
            noticeId: id,
            userId: session.user.id,
          },
        },
        update: {
          readAt: now,
        },
        create: {
          noticeId: id,
          userId: session.user.id,
          readAt: now,
        },
      })

      // Increment view count
      await prisma.notices.update({
        where: { id },
        data: { viewCount: { increment: 1 } },
      })
    }

    // Transform response
    const isRead = Array.isArray(notice.notice_reads) && notice.notice_reads.length > 0
    const readAt = Array.isArray(notice.notice_reads) ? notice.notice_reads[0]?.readAt : undefined

    return NextResponse.json({
      success: true,
      data: {
        ...notice,
        isRead,
        readAt,
        notice_reads: undefined,
      },
    })
  } catch (error) {
    console.error('Error fetching notice:', error)
    return NextResponse.json({ success: false, error: 'Failed to fetch notice' }, { status: 500 })
  }
}

// ============================================
// PUT - Update a notice (admin/teacher only)
// ============================================

export async function PUT(request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params
    const session = await auth()

    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      )
    }

    // Check if user has permission to update notices
    const userRole = (session.user.role || 'STUDENT').toString().toUpperCase()
    const allowedRoles = ['ADMIN', 'TEACHER', 'COUNSELOR']

    if (!allowedRoles.includes(userRole)) {
      return NextResponse.json(
        { success: false, error: 'You do not have permission to update notices' },
        { status: 403 }
      )
    }

    // Check if notice exists
    const existingNotice = await prisma.notices.findUnique({
      where: { id },
      select: { id: true, createdById: true },
    })

    if (!existingNotice) {
      return NextResponse.json({ success: false, error: 'Notice not found' }, { status: 404 })
    }

    // Only allow editing own notices (unless admin)
    if (userRole !== 'ADMIN' && existingNotice.createdById !== session.user.id) {
      return NextResponse.json(
        { success: false, error: 'You can only edit your own notices' },
        { status: 403 }
      )
    }

    const body = await request.json()

    // Build update data
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const updateData: any = {}

    if (body.title !== undefined) updateData.title = body.title
    if (body.content !== undefined) updateData.content = body.content
    if (body.category !== undefined) updateData.category = body.category as NoticeCategory
    if (body.targetType !== undefined) updateData.targetType = body.targetType as NoticeTargetType
    if (body.targetCourseIds !== undefined) updateData.targetCourseIds = body.targetCourseIds
    if (body.targetBatchIds !== undefined) updateData.targetBatchIds = body.targetBatchIds
    if (body.targetUserIds !== undefined) updateData.targetUserIds = body.targetUserIds
    if (body.priority !== undefined) updateData.priority = body.priority
    if (body.isPinned !== undefined) updateData.isPinned = body.isPinned
    if (body.attachments !== undefined) updateData.attachments = body.attachments
    if (body.publishedAt !== undefined)
      updateData.publishedAt = body.publishedAt ? new Date(body.publishedAt) : null
    if (body.expiresAt !== undefined)
      updateData.expiresAt = body.expiresAt ? new Date(body.expiresAt) : null
    if (body.isActive !== undefined) updateData.isActive = body.isActive

    const updatedNotice = await prisma.notices.update({
      where: { id },
      data: updateData,
    })

    return NextResponse.json({
      success: true,
      data: updatedNotice,
      message: 'Notice updated successfully',
    })
  } catch (error) {
    console.error('Error updating notice:', error)
    return NextResponse.json({ success: false, error: 'Failed to update notice' }, { status: 500 })
  }
}

// ============================================
// DELETE - Delete a notice (admin only)
// ============================================

export async function DELETE(request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params
    const session = await auth()

    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      )
    }

    // Only admin can delete notices
    const userRole = (session.user.role || 'STUDENT').toString().toUpperCase()

    if (userRole !== 'ADMIN') {
      return NextResponse.json(
        { success: false, error: 'Only administrators can delete notices' },
        { status: 403 }
      )
    }

    // Check if notice exists
    const existingNotice = await prisma.notices.findUnique({
      where: { id },
      select: { id: true },
    })

    if (!existingNotice) {
      return NextResponse.json({ success: false, error: 'Notice not found' }, { status: 404 })
    }

    // Soft delete by setting isActive to false
    await prisma.notices.update({
      where: { id },
      data: { isActive: false },
    })

    return NextResponse.json({
      success: true,
      message: 'Notice deleted successfully',
    })
  } catch (error) {
    console.error('Error deleting notice:', error)
    return NextResponse.json({ success: false, error: 'Failed to delete notice' }, { status: 500 })
  }
}
