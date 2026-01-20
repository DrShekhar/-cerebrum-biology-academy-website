/**
 * Gamification XP API
 * GET: Get XP history and breakdown
 */

import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { getXpHistory, getXpBreakdown, XP_REWARDS } from '@/lib/gamification'
import { XpEventType } from '@/types/prisma-enums'

export async function GET(req: NextRequest) {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const view = searchParams.get('view') || 'breakdown' // 'breakdown', 'history'

    if (view === 'history') {
      const limit = parseInt(searchParams.get('limit') || '20')
      const offset = parseInt(searchParams.get('offset') || '0')
      const eventType = searchParams.get('eventType') as XpEventType | undefined
      const startDate = searchParams.get('startDate')
      const endDate = searchParams.get('endDate')

      const history = await getXpHistory(session.user.id, {
        limit,
        offset,
        eventType,
        startDate: startDate ? new Date(startDate) : undefined,
        endDate: endDate ? new Date(endDate) : undefined,
      })

      return NextResponse.json({
        success: true,
        data: {
          events: history.events,
          total: history.total,
          hasMore: offset + history.events.length < history.total,
        },
      })
    }

    // Default: breakdown
    const breakdown = await getXpBreakdown(session.user.id)

    return NextResponse.json({
      success: true,
      data: {
        breakdown,
        rewards: XP_REWARDS,
      },
    })
  } catch (error) {
    console.error('Error fetching XP data:', error)
    return NextResponse.json({ success: false, error: 'Failed to fetch XP data' }, { status: 500 })
  }
}
