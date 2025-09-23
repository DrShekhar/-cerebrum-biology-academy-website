/**
 * API Routes for Monitoring Dashboard
 */

import { NextRequest, NextResponse } from 'next/server'
import { ObservabilityManager } from '@/lib/monitoring/ObservabilityManager'

// Initialize observability manager
let observabilityManager: ObservabilityManager

if (!observabilityManager) {
  observabilityManager = new ObservabilityManager()
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type')
    const timeRange = searchParams.get('timeRange') || '24h'

    switch (type) {
      case 'health':
        const health = await observabilityManager.getSystemHealth()
        return NextResponse.json({ success: true, health })

      case 'performance':
        const performance = await observabilityManager.getPerformanceAnalytics(timeRange)
        return NextResponse.json({ success: true, performance })

      case 'business':
        const business = await observabilityManager.getBusinessIntelligence()
        return NextResponse.json({ success: true, business })

      case 'metrics':
        const systemMetrics = await observabilityManager.collectSystemMetrics()
        const appMetrics = await observabilityManager.collectApplicationMetrics()
        const businessMetrics = await observabilityManager.collectBusinessMetrics()

        return NextResponse.json({
          success: true,
          metrics: {
            system: systemMetrics,
            application: appMetrics,
            business: businessMetrics,
          },
        })

      default:
        // Return overview data
        const overview = {
          health: await observabilityManager.getSystemHealth(),
          performance: await observabilityManager.getPerformanceAnalytics(timeRange),
          business: await observabilityManager.getBusinessIntelligence(),
        }

        return NextResponse.json({ success: true, overview })
    }
  } catch (error) {
    console.error('Error fetching monitoring data:', error)
    return NextResponse.json({ error: 'Failed to fetch monitoring data' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action, data } = body

    switch (action) {
      case 'log_event':
        await observabilityManager.logEvent(data)
        return NextResponse.json({
          success: true,
          message: 'Event logged successfully',
        })

      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
    }
  } catch (error) {
    console.error('Error processing monitoring request:', error)
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 })
  }
}
