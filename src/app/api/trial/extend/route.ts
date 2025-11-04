import { NextRequest, NextResponse } from 'next/server'
import { extendTrial } from '@/lib/trial/trialManager'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { freeUserId, days = 7, adminKey } = body

    if (!freeUserId) {
      return NextResponse.json({ error: 'freeUserId is required' }, { status: 400 })
    }

    if (adminKey !== process.env.ADMIN_SECRET_KEY) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await extendTrial(freeUserId, days)

    return NextResponse.json({
      success: true,
      message: `Trial extended by ${days} days`,
    })
  } catch (error) {
    console.error('Trial extension error:', error)
    return NextResponse.json(
      {
        error: 'Failed to extend trial',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
