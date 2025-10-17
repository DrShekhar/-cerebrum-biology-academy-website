// Admin AI Metrics API Endpoint
// Provides comprehensive AI monitoring data for administrators

import { NextRequest, NextResponse } from 'next/server'
import { performanceMonitor } from '@/lib/ai/performanceMonitor'
import { costDashboard } from '@/lib/ai/CostOptimizationDashboard'

// Force Node.js runtime for better compatibility
export const runtime = 'nodejs'

// Helper to verify admin access (simplified - should integrate with actual auth)
async function isAdmin(request: NextRequest): Promise<boolean> {
  // In production, this should verify the user's session and check their role
  // For now, we'll check for a valid session cookie
  const cookies = request.cookies
  const sessionCookie = cookies.get('session')

  // TODO: Implement actual admin verification using your auth system
  // This is a placeholder that assumes valid session = admin for demo
  return !!sessionCookie
}

export async function GET(request: NextRequest) {
  try {
    // Verify admin access
    if (!(await isAdmin(request))) {
      return NextResponse.json(
        {
          success: false,
          error: 'Unauthorized: Admin access required',
          timestamp: new Date().toISOString(),
        },
        { status: 403 }
      )
    }

    const url = new URL(request.url)
    const action = url.searchParams.get('action') || 'dashboard'

    switch (action) {
      case 'dashboard':
        // Get comprehensive dashboard data
        const stats = performanceMonitor.getStats()
        const tokenStats = performanceMonitor.getTokenStats()
        const budgetStatus = costDashboard.getBudgetStatus()
        const optimizations = costDashboard.getOptimizationRecommendations()
        const analytics = costDashboard.getDetailedAnalytics()

        return NextResponse.json({
          success: true,
          data: {
            performance: stats,
            tokens: tokenStats,
            budget: budgetStatus,
            optimizations,
            analytics,
            system: {
              uptime: process.uptime(),
              memory: process.memoryUsage(),
              nodeVersion: process.version,
            },
          },
          timestamp: new Date().toISOString(),
        })

      case 'cost-breakdown':
        // Detailed cost analysis
        const costMetrics = costDashboard.getCurrentMetrics()
        const forecast = costDashboard.getCostForecast(30)

        return NextResponse.json({
          success: true,
          data: {
            current: costMetrics,
            forecast,
            recommendations: costDashboard.getOptimizationRecommendations(),
          },
          timestamp: new Date().toISOString(),
        })

      case 'provider-performance':
        // Provider-specific metrics
        const providerStats = {
          anthropic: await getProviderMetrics('anthropic'),
          openai: await getProviderMetrics('openai'),
          google: await getProviderMetrics('google'),
        }

        return NextResponse.json({
          success: true,
          data: providerStats,
          timestamp: new Date().toISOString(),
        })

      case 'alerts':
        // Get active alerts and budget warnings
        const alerts = budgetStatus.alerts
        const activeAlerts = alerts.filter((alert) => !alert.acknowledged)

        return NextResponse.json({
          success: true,
          data: {
            active: activeAlerts,
            total: alerts.length,
            critical: alerts.filter((a) => a.type === 'critical').length,
          },
          timestamp: new Date().toISOString(),
        })

      case 'export':
        // Export metrics for analysis
        const format = url.searchParams.get('format') || 'json'
        const provider = url.searchParams.get('provider')
        const startDate = url.searchParams.get('start')
        const endDate = url.searchParams.get('end')

        const filters: any = {}
        if (provider) filters.provider = provider
        if (startDate && endDate) {
          filters.timeRange = {
            start: new Date(startDate),
            end: new Date(endDate),
          }
        }

        const exportData = performanceMonitor.exportMetrics(filters)
        const costExportData = costDashboard.exportData(format as 'json' | 'csv')

        return NextResponse.json({
          success: true,
          data: {
            performance: exportData,
            cost: format === 'json' ? JSON.parse(costExportData) : costExportData,
            exportedAt: new Date().toISOString(),
            filters,
          },
          timestamp: new Date().toISOString(),
        })

      case 'health-check':
        // System health check
        const healthData = {
          status: 'operational',
          services: {
            performance_monitor: true,
            cost_dashboard: true,
            api: true,
          },
          metrics: {
            uptime: process.uptime(),
            memory: {
              used: process.memoryUsage().heapUsed / 1024 / 1024,
              total: process.memoryUsage().heapTotal / 1024 / 1024,
              percentage: (process.memoryUsage().heapUsed / process.memoryUsage().heapTotal) * 100,
            },
          },
          timestamp: new Date().toISOString(),
        }

        return NextResponse.json({
          success: true,
          data: healthData,
          timestamp: new Date().toISOString(),
        })

      default:
        return NextResponse.json(
          {
            success: false,
            error: 'Invalid action',
            availableActions: [
              'dashboard',
              'cost-breakdown',
              'provider-performance',
              'alerts',
              'export',
              'health-check',
            ],
          },
          { status: 400 }
        )
    }
  } catch (error) {
    console.error('Admin AI Metrics API Error:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to retrieve admin metrics',
        details: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    // Verify admin access
    if (!(await isAdmin(request))) {
      return NextResponse.json(
        {
          success: false,
          error: 'Unauthorized: Admin access required',
          timestamp: new Date().toISOString(),
        },
        { status: 403 }
      )
    }

    const body = await request.json()
    const { action, data } = body

    switch (action) {
      case 'acknowledge-alert':
        // Acknowledge a cost alert
        if (!data?.alertId) {
          return NextResponse.json({ success: false, error: 'Alert ID required' }, { status: 400 })
        }

        costDashboard.acknowledgeAlert(data.alertId)
        return NextResponse.json({
          success: true,
          message: 'Alert acknowledged',
          timestamp: new Date().toISOString(),
        })

      case 'update-budget':
        // Update budget settings
        if (!data?.budgetSettings) {
          return NextResponse.json(
            { success: false, error: 'Budget settings required' },
            { status: 400 }
          )
        }

        costDashboard.updateBudgetSettings(data.budgetSettings)
        return NextResponse.json({
          success: true,
          message: 'Budget settings updated',
          timestamp: new Date().toISOString(),
        })

      case 'reset-metrics':
        // Reset performance metrics (admin only)
        performanceMonitor.reset()
        return NextResponse.json({
          success: true,
          message: 'Performance metrics reset',
          timestamp: new Date().toISOString(),
        })

      case 'cleanup':
        // Clean up old metrics
        performanceMonitor.cleanup()
        return NextResponse.json({
          success: true,
          message: 'Metrics cleaned up',
          timestamp: new Date().toISOString(),
        })

      default:
        return NextResponse.json(
          {
            success: false,
            error: 'Invalid action',
            availableActions: ['acknowledge-alert', 'update-budget', 'reset-metrics', 'cleanup'],
          },
          { status: 400 }
        )
    }
  } catch (error) {
    console.error('Admin AI Metrics POST Error:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to process admin action',
        details: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    )
  }
}

// Helper function to get provider-specific metrics
async function getProviderMetrics(provider: string) {
  const stats = performanceMonitor.getStats()
  const providerRequests = stats.providerBreakdown[provider] || 0
  const totalRequests = stats.totalRequests

  return {
    requests: providerRequests,
    percentage: totalRequests > 0 ? (providerRequests / totalRequests) * 100 : 0,
    successRate: stats.successRate,
    avgResponseTime: stats.avgResponseTime,
    avgCost: stats.avgCost,
    estimatedMonthlyCost: parseFloat(stats.avgCost.replace('$', '')) * providerRequests * 30,
  }
}
