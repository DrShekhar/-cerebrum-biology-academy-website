/**
 * Data Retention API - Admin only
 * Triggers data cleanup according to retention policies
 * Can be called by cron jobs or manually by admins
 */

import { NextRequest, NextResponse } from 'next/server'
import { withAdmin, UserSession } from '@/lib/auth/middleware'
import { DataRetentionService, DataRetentionConfig } from '@/lib/database/dataRetention'

// POST: Run data retention cleanup
async function handlePost(request: NextRequest, session: UserSession) {
  try {
    const body = await request.json().catch(() => ({}))
    const { dryRun = false, config } = body as { dryRun?: boolean; config?: Partial<DataRetentionConfig> }

    // Verify cron secret for automated calls
    const cronSecret = request.headers.get('x-cron-secret')
    const expectedSecret = process.env.CRON_SECRET

    // Allow admin users or valid cron secret
    const isAuthorizedCron = cronSecret && expectedSecret && cronSecret === expectedSecret
    const isAdmin = session.role === 'ADMIN'

    if (!isAdmin && !isAuthorizedCron) {
      return NextResponse.json(
        { error: 'Unauthorized: Admin access required' },
        { status: 403 }
      )
    }

    console.log(`[DataRetention] Triggered by ${isAuthorizedCron ? 'cron' : `admin ${session.userId}`}`)

    const retentionService = new DataRetentionService(config, dryRun)
    const result = await retentionService.runRetention()

    // Log for audit trail
    console.log('[DataRetention] Cleanup result:', {
      triggeredBy: isAuthorizedCron ? 'cron' : session.userId,
      dryRun,
      result,
    })

    return NextResponse.json({
      success: result.success,
      dryRun,
      deletedCounts: result.deletedCounts,
      errors: result.errors,
      duration: `${result.duration}ms`,
    })
  } catch (error) {
    console.error('[DataRetention] API error:', error)
    return NextResponse.json(
      { error: 'Data retention cleanup failed' },
      { status: 500 }
    )
  }
}

// GET: Get data retention status and counts of records to be cleaned
async function handleGet(request: NextRequest, session: UserSession) {
  try {
    // Only dry run to show what would be deleted
    const retentionService = new DataRetentionService({}, true)
    const result = await retentionService.runRetention()

    return NextResponse.json({
      success: true,
      pendingDeletion: result.deletedCounts,
      message: 'These counts show records that would be deleted on next retention run',
    })
  } catch (error) {
    console.error('[DataRetention] Status check error:', error)
    return NextResponse.json(
      { error: 'Failed to check retention status' },
      { status: 500 }
    )
  }
}

// Export with admin authentication
export const POST = withAdmin(handlePost)
export const GET = withAdmin(handleGet)
