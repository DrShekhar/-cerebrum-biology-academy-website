/**
 * Gamification Badges API
 * GET: Get user badges (earned, in-progress, available)
 * POST: Toggle badge showcase
 */

import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import {
  getUserBadges,
  toggleBadgeShowcase,
  getShowcasedBadges,
  BADGE_DEFINITIONS,
} from '@/lib/gamification'

export async function GET(req: NextRequest) {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const showcasedOnly = searchParams.get('showcased') === 'true'

    if (showcasedOnly) {
      const showcased = await getShowcasedBadges(session.user.id)
      return NextResponse.json({
        success: true,
        data: { showcased },
      })
    }

    const badges = await getUserBadges(session.user.id)

    return NextResponse.json({
      success: true,
      data: {
        ...badges,
        totalBadges: BADGE_DEFINITIONS.length,
        earnedCount: badges.earned.length,
        completionPercentage: Math.round(
          (badges.earned.length / BADGE_DEFINITIONS.length) * 100
        ),
      },
    })
  } catch (error) {
    console.error('Error fetching badges:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch badges' },
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
    const { badgeId, showcased } = body

    if (!badgeId || typeof showcased !== 'boolean') {
      return NextResponse.json(
        { success: false, error: 'badgeId and showcased (boolean) are required' },
        { status: 400 }
      )
    }

    const result = await toggleBadgeShowcase(session.user.id, badgeId, showcased)

    if (!result) {
      return NextResponse.json({
        success: false,
        error: showcased
          ? 'Maximum 3 badges can be showcased. Remove one first.'
          : 'Failed to update badge showcase',
      })
    }

    const showcasedBadges = await getShowcasedBadges(session.user.id)

    return NextResponse.json({
      success: true,
      message: showcased ? 'Badge added to showcase' : 'Badge removed from showcase',
      data: { showcased: showcasedBadges },
    })
  } catch (error) {
    console.error('Error updating badge showcase:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update badge showcase' },
      { status: 500 }
    )
  }
}
