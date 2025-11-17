import { NextRequest, NextResponse } from 'next/server'
import { cleanupExpiredOTPs } from '@/lib/auth/otpCleanup'
import { logger } from '@/lib/utils'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization')
    const cronSecret = process.env.CRON_SECRET

    if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const deletedCount = await cleanupExpiredOTPs()

    return NextResponse.json({
      success: true,
      message: `Cleaned up ${deletedCount} expired OTP records`,
      deletedCount,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    logger.error('OTP cleanup cron failed', error as Error)

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to cleanup OTPs',
      },
      { status: 500 }
    )
  }
}
