/**
 * Gamification Notifications API
 * GET: Get user notifications with filters
 * POST: Mark notification(s) as read or delete
 */

import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import {
  getNotifications,
  markAsRead,
  markAllAsRead,
  deleteNotification,
  getUnreadCount,
} from '@/lib/gamification'
import { GamificationNotificationType } from '@/types/prisma-enums'

export async function GET(req: NextRequest) {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const limit = parseInt(searchParams.get('limit') || '20')
    const offset = parseInt(searchParams.get('offset') || '0')
    const unreadOnly = searchParams.get('unreadOnly') === 'true'
    const typesParam = searchParams.get('types')

    let types: GamificationNotificationType[] | undefined
    if (typesParam) {
      types = typesParam.split(',') as GamificationNotificationType[]
    }

    // Check if only count is requested
    if (searchParams.get('countOnly') === 'true') {
      const unreadCount = await getUnreadCount(session.user.id)
      return NextResponse.json({
        success: true,
        data: { unreadCount },
      })
    }

    const result = await getNotifications(session.user.id, {
      limit,
      offset,
      unreadOnly,
      types,
    })

    return NextResponse.json({
      success: true,
      data: {
        notifications: result.notifications,
        unreadCount: result.unreadCount,
        total: result.total,
        hasMore: offset + result.notifications.length < result.total,
      },
    })
  } catch (error) {
    console.error('Error fetching notifications:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch notifications' },
      { status: 500 }
    )
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const { action, notificationId } = body

    if (!action || !['markRead', 'markAllRead', 'delete'].includes(action)) {
      return NextResponse.json(
        { success: false, error: 'Invalid action. Use "markRead", "markAllRead", or "delete"' },
        { status: 400 }
      )
    }

    if (action === 'markAllRead') {
      const count = await markAllAsRead(session.user.id)
      return NextResponse.json({
        success: true,
        message: `Marked ${count} notifications as read`,
        data: { markedCount: count },
      })
    }

    if (!notificationId) {
      return NextResponse.json(
        { success: false, error: 'notificationId is required for this action' },
        { status: 400 }
      )
    }

    let result: boolean

    if (action === 'markRead') {
      result = await markAsRead(notificationId, session.user.id)
    } else {
      result = await deleteNotification(notificationId, session.user.id)
    }

    if (!result) {
      return NextResponse.json({
        success: false,
        error: 'Notification not found or already processed',
      })
    }

    const unreadCount = await getUnreadCount(session.user.id)

    return NextResponse.json({
      success: true,
      message: action === 'markRead' ? 'Notification marked as read' : 'Notification deleted',
      data: { unreadCount },
    })
  } catch (error) {
    console.error('Error processing notification action:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to process notification action' },
      { status: 500 }
    )
  }
}
