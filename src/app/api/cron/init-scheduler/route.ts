import { NextRequest, NextResponse } from 'next/server'
import { initializeTaskScheduler, isTaskSchedulerInitialized } from '@/lib/scheduler/init'
import { logger } from '@/lib/utils/logger'

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization')
    const cronSecret = process.env.CRON_SECRET

    if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    if (isTaskSchedulerInitialized()) {
      return NextResponse.json({
        success: true,
        message: 'Task scheduler already initialized',
        initialized: true,
      })
    }

    await initializeTaskScheduler()

    logger.info('Task scheduler initialized via cron endpoint')

    return NextResponse.json({
      success: true,
      message: 'Task scheduler initialized successfully',
      initialized: true,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    logger.error('Failed to initialize task scheduler via cron', error)

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to initialize task scheduler',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
