import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth/config'
import {
  checkCoachingTrialStatus,
  startMasterTrial,
  CoachingTrialStatus,
} from '@/lib/trial/trialManager'
import { CoachingTiers, CoachingSubscriptionTier } from '@/lib/subscriptions/SmartSubscriptionTiers'

export async function GET(request: NextRequest) {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const userId = session.user.id
    let trialStatus = await checkCoachingTrialStatus(userId)

    if (!trialStatus) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const tierConfig = CoachingTiers[trialStatus.effectiveTier]
    const baseTierConfig = CoachingTiers[trialStatus.coachingTier as CoachingSubscriptionTier]

    return NextResponse.json({
      success: true,
      data: {
        ...trialStatus,
        tierDisplayName: tierConfig?.displayName || 'Free Explorer',
        baseTierDisplayName: baseTierConfig?.displayName || 'Free Explorer',
        features: tierConfig?.features || null,
        isInTrial: trialStatus.isTrialActive && trialStatus.coachingTier === 'FREE',
        showUpgradePrompt:
          trialStatus.coachingTier === 'FREE' &&
          (!trialStatus.isTrialActive || trialStatus.daysRemaining <= 3),
      },
    })
  } catch (error) {
    console.error('Coaching trial status error:', error)
    return NextResponse.json(
      {
        error: 'Failed to check trial status',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const userId = session.user.id
    const body = await request.json()
    const { action } = body

    if (action === 'start') {
      const trialStatus = await startMasterTrial(userId)

      if (!trialStatus) {
        return NextResponse.json({ error: 'Failed to start trial' }, { status: 500 })
      }

      const tierConfig = CoachingTiers[trialStatus.effectiveTier]

      return NextResponse.json({
        success: true,
        message: 'Master trial started successfully!',
        data: {
          ...trialStatus,
          tierDisplayName: tierConfig?.displayName || 'Free Explorer',
          features: tierConfig?.features || null,
        },
      })
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
  } catch (error) {
    console.error('Coaching trial action error:', error)
    return NextResponse.json(
      {
        error: 'Failed to perform trial action',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
