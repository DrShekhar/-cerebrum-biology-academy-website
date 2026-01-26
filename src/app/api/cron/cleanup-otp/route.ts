import { NextRequest, NextResponse } from 'next/server'
import { cleanupExpiredOTPs } from '@/lib/auth/otpCleanup'
import { logger } from '@/lib/utils'
import {
  verifyCronAuth,
  createCronUnauthorizedResponse,
  createCronConfigErrorResponse,
} from '@/lib/auth/cron-auth'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  // SECURITY: Strict cron authentication
  const authResult = verifyCronAuth(request)
  if (!authResult.authorized) {
    if (authResult.error?.includes('not set')) {
      return createCronConfigErrorResponse(authResult.error)
    }
    return createCronUnauthorizedResponse(authResult.error || 'Unauthorized')
  }

  try {
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
