import { NextRequest, NextResponse } from 'next/server'
import { checkTrialStatus } from '@/lib/trial/trialManager'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const freeUserId = searchParams.get('freeUserId')

    if (!freeUserId) {
      return NextResponse.json({ error: 'freeUserId parameter is required' }, { status: 400 })
    }

    const trialStatus = await checkTrialStatus(freeUserId)

    if (!trialStatus) {
      return NextResponse.json({ error: 'Trial not found' }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      trialStatus,
    })
  } catch (error) {
    console.error('Trial status error:', error)
    return NextResponse.json(
      {
        error: 'Failed to check trial status',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
