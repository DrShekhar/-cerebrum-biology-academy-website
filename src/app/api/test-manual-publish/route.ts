/**
 * Admin endpoint to manually trigger publishing
 * Requires admin authentication
 */

import { NextResponse } from 'next/server'
import { publishAllApproved } from '@/lib/seo-marketing/publisher'
import { getApprovedItems, getQueueStats } from '@/lib/seo-marketing/queueService'
import { requireAdminAuth } from '@/lib/auth'

export async function GET() {
  try {
    await requireAdminAuth()
  } catch {
    return NextResponse.json(
      { success: false, error: 'Unauthorized - Admin access required' },
      { status: 401 }
    )
  }

  const stats = await getQueueStats()
  const approvedItems = await getApprovedItems()

  return NextResponse.json({
    message: 'Manual publish endpoint',
    stats: stats.queue,
    approvedItems: approvedItems.map((item) => ({
      id: item.id,
      topic: item.topic,
      title: item.generatedTitle,
      status: item.status,
    })),
    usage: 'POST to publish all approved items',
  })
}

export async function POST() {
  try {
    await requireAdminAuth()
  } catch {
    return NextResponse.json(
      { success: false, error: 'Unauthorized - Admin access required' },
      { status: 401 }
    )
  }

  try {
    const approvedItems = await getApprovedItems()

    if (approvedItems.length === 0) {
      return NextResponse.json({
        success: true,
        message: 'No approved content to publish',
        published: 0,
      })
    }

    const result = await publishAllApproved()

    return NextResponse.json({
      success: true,
      message: `Published ${result.published} items, ${result.failed} failed`,
      published: result.published,
      failed: result.failed,
      results: result.results.map((r) => ({
        success: r.success,
        url: r.publishedUrl,
        error: r.error,
      })),
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
