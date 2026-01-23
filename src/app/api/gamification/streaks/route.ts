/**
 * Gamification Streaks API
 * GET: Get streak status with protection details
 * POST: Use freeze or recover streak
 */

import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import {
  getStreakStatus,
  applyStreakFreeze,
  recoverStreak,
  STREAK_PROTECTION_CONFIG,
} from '@/lib/gamification'

export async function GET(req: NextRequest) {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    const status = await getStreakStatus(session.user.id)

    if (!status) {
      return NextResponse.json({
        success: true,
        data: {
          status: null,
          config: STREAK_PROTECTION_CONFIG,
        },
      })
    }

    return NextResponse.json({
      success: true,
      data: {
        status,
        config: STREAK_PROTECTION_CONFIG,
      },
    })
  } catch (error) {
    console.error('Error fetching streak status:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch streak status' },
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
    const { action } = body

    if (!action || !['freeze', 'recover'].includes(action)) {
      return NextResponse.json(
        { success: false, error: 'Invalid action. Use "freeze" or "recover"' },
        { status: 400 }
      )
    }

    let result

    if (action === 'freeze') {
      result = await applyStreakFreeze(session.user.id)
    } else {
      result = await recoverStreak(session.user.id)
    }

    return NextResponse.json({
      success: result.success,
      message: result.message,
      data: result.newStatus
        ? {
            status: result.newStatus,
          }
        : undefined,
    })
  } catch (error) {
    console.error('Error processing streak action:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to process streak action' },
      { status: 500 }
    )
  }
}
