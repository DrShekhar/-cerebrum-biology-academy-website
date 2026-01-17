/**
 * Temporary endpoint to manually approve SEO content
 * DELETE THIS AFTER TESTING
 *
 * SECURITY: Requires admin authentication
 */

import { NextRequest, NextResponse } from 'next/server'
import { getQueueStats, getItemsInReview } from '@/lib/seo-marketing/queueService'
import { validateAdminSession } from '@/lib/auth/admin-auth'

export async function GET(request: NextRequest) {
  // SECURITY: Require admin authentication
  const session = await validateAdminSession(request)
  if (!session.valid) {
    return NextResponse.json({ error: 'Unauthorized - Admin access required' }, { status: 401 })
  }
  const stats = await getQueueStats()
  const reviewItems = await getItemsInReview()

  // Also get failed items for reset capability
  const { prisma } = await import('@/lib/prisma')
  const failedItems = await prisma.content_generation_queue.findMany({
    where: { status: 'FAILED' },
    orderBy: { updatedAt: 'desc' },
    take: 5,
  })

  return NextResponse.json({
    message: 'Manual approval endpoint',
    stats: stats.queue,
    reviewItems: reviewItems.map((item) => ({
      id: item.id,
      topic: item.topic,
      title: item.generatedTitle,
      status: item.status,
    })),
    failedItems: failedItems.map((item) => ({
      id: item.id,
      topic: item.topic,
      title: item.generatedTitle,
      error: item.errorMessage,
    })),
    usage: 'POST with { "action": "yes"|"reset", "itemId": "..." }',
  })
}

export async function POST(request: NextRequest) {
  // SECURITY: Require admin authentication
  const session = await validateAdminSession(request)
  if (!session.valid) {
    return NextResponse.json({ error: 'Unauthorized - Admin access required' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const action = body.action || 'yes'
    const itemId = body.itemId // Optional: specific item ID

    // Import Prisma directly
    const { prisma } = await import('@/lib/prisma')

    // Handle reset action for failed items
    if (action === 'reset') {
      const failedItems = await prisma.content_generation_queue.findMany({
        where: { status: 'FAILED' },
        orderBy: { updatedAt: 'desc' },
      })

      if (failedItems.length === 0) {
        return NextResponse.json({ success: false, error: 'No failed items to reset' })
      }

      const targetItem = itemId
        ? failedItems.find((item) => item.id === itemId)
        : failedItems[0]

      if (!targetItem) {
        return NextResponse.json({
          success: false,
          error: 'Failed item not found',
          availableItems: failedItems.map((i) => i.id),
        })
      }

      await prisma.content_generation_queue.update({
        where: { id: targetItem.id },
        data: {
          status: 'APPROVED',
          errorMessage: null,
          updatedAt: new Date(),
        },
      })

      return NextResponse.json({
        success: true,
        action: 'reset',
        item: { id: targetItem.id, title: targetItem.generatedTitle, newStatus: 'APPROVED' },
        message: 'Item reset to APPROVED. Run publish to test.',
      })
    }

    // Get items in review for approve/reject actions
    const reviewItems = await getItemsInReview()

    if (reviewItems.length === 0) {
      return NextResponse.json({
        success: false,
        error: 'No items in review status',
      })
    }

    // Use specified item or first in review
    const targetItem = itemId
      ? reviewItems.find((item) => item.id === itemId)
      : reviewItems[0]

    if (!targetItem) {
      return NextResponse.json({
        success: false,
        error: 'Item not found',
        availableItems: reviewItems.map((i) => i.id),
      })
    }

    if (action === 'yes' || action === 'approve') {
      // Directly update to APPROVED status
      await prisma.content_generation_queue.update({
        where: { id: targetItem.id },
        data: {
          status: 'APPROVED',
          approvalResponse: 'Manual approval via test endpoint',
          updatedAt: new Date(),
        },
      })

      return NextResponse.json({
        success: true,
        action: 'approved',
        item: {
          id: targetItem.id,
          title: targetItem.generatedTitle,
          newStatus: 'APPROVED',
        },
        message: 'Content approved! Auto-publisher will publish it shortly.',
      })
    } else if (action === 'no' || action === 'reject') {
      await prisma.content_generation_queue.update({
        where: { id: targetItem.id },
        data: {
          status: 'REJECTED',
          approvalResponse: 'Manual rejection via test endpoint',
          updatedAt: new Date(),
        },
      })

      return NextResponse.json({
        success: true,
        action: 'rejected',
        item: {
          id: targetItem.id,
          title: targetItem.generatedTitle,
          newStatus: 'REJECTED',
        },
      })
    }

    return NextResponse.json({
      success: false,
      error: 'Invalid action. Use "yes" or "no"',
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
