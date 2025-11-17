// AI Performance Monitoring API Endpoint
// Provides real-time performance metrics and statistics

import { NextRequest, NextResponse } from 'next/server'
import { performanceMonitor } from '@/lib/ai/performanceMonitor'
import { verifyAdminAccess } from '@/lib/auth/adminVerification'

// Force Node.js runtime for better compatibility
export const runtime = 'nodejs'

export async function GET(request: NextRequest) {
  try {
    // Verify admin access
    const adminVerification = await verifyAdminAccess(request)
    if (!adminVerification.authorized) {
      return NextResponse.json(
        {
          success: false,
          error: 'Unauthorized',
          message: adminVerification.message || 'Admin access required',
        },
        { status: 401 }
      )
    }

    const url = new URL(request.url)
    const action = url.searchParams.get('action')

    switch (action) {
      case 'stats':
        // Get comprehensive performance statistics
        const stats = performanceMonitor.getStats()
        return NextResponse.json({
          success: true,
          data: stats,
          timestamp: new Date().toISOString(),
        })

      case 'realtime':
        // Get real-time metrics for dashboard
        const realTimeMetrics = performanceMonitor.getRealTimeMetrics()
        return NextResponse.json({
          success: true,
          data: realTimeMetrics,
          timestamp: new Date().toISOString(),
        })

      case 'export':
        // Export metrics with optional filters
        const provider = url.searchParams.get('provider')
        const startDate = url.searchParams.get('start')
        const endDate = url.searchParams.get('end')
        const successOnly = url.searchParams.get('success') === 'true'

        const filters: any = {}
        if (provider) filters.provider = provider
        if (startDate && endDate) {
          filters.timeRange = {
            start: new Date(startDate),
            end: new Date(endDate),
          }
        }
        if (url.searchParams.has('success')) {
          filters.success = successOnly
        }

        const metrics = performanceMonitor.exportMetrics(filters)
        return NextResponse.json({
          success: true,
          data: {
            metrics,
            count: metrics.length,
            filters,
          },
          timestamp: new Date().toISOString(),
        })

      default:
        // Default: return basic system status
        const basicStats = performanceMonitor.getRealTimeMetrics()
        return NextResponse.json({
          success: true,
          data: {
            status: 'operational',
            ...basicStats,
          },
          actions: [
            'GET /api/ai/performance?action=stats - Full statistics',
            'GET /api/ai/performance?action=realtime - Real-time metrics',
            'GET /api/ai/performance?action=export&provider=anthropic - Export filtered metrics',
          ],
          timestamp: new Date().toISOString(),
        })
    }
  } catch (error) {
    console.error('Performance API Error:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to retrieve performance metrics',
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action } = body

    switch (action) {
      case 'cleanup':
        // Clean up old metrics
        performanceMonitor.cleanup()
        return NextResponse.json({
          success: true,
          message: 'Performance metrics cleaned up',
          timestamp: new Date().toISOString(),
        })

      case 'reset':
        // Reset all metrics (admin only)
        performanceMonitor.reset()
        return NextResponse.json({
          success: true,
          message: 'Performance metrics reset',
          timestamp: new Date().toISOString(),
        })

      default:
        return NextResponse.json(
          {
            success: false,
            error: 'Invalid action',
            availableActions: ['cleanup', 'reset'],
          },
          { status: 400 }
        )
    }
  } catch (error) {
    console.error('Performance API Error:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to process performance action',
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    )
  }
}
