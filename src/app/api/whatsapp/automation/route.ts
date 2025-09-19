import { NextRequest, NextResponse } from 'next/server'
import { WhatsAppAutomationService } from '@/lib/integrations/whatsappAutomationService'

/**
 * WhatsApp Automation Trigger API
 * Manually trigger automation flows for users
 */

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action, userData } = body

    // Validate required fields
    if (!action || !userData) {
      return NextResponse.json(
        { error: 'Missing required fields: action and userData' },
        { status: 400 }
      )
    }

    let result

    switch (action) {
      case 'initialize_user':
        await WhatsAppAutomationService.initializeUser(userData)
        result = { message: 'User initialization successful' }
        break

      case 'trigger_welcome':
        await WhatsAppAutomationService.triggerWelcomeSeries(userData)
        result = { message: 'Welcome series triggered' }
        break

      case 'trigger_abandoned_cart':
        await WhatsAppAutomationService.triggerAbandonedCartFlow(userData)
        result = { message: 'Abandoned cart flow triggered' }
        break

      case 'trigger_engagement':
        await WhatsAppAutomationService.triggerStudentEngagement(userData)
        result = { message: 'Student engagement flow triggered' }
        break

      case 'quick_action':
        result = await WhatsAppAutomationService.handleQuickAction(userData)
        break

      default:
        return NextResponse.json({ error: 'Invalid action specified' }, { status: 400 })
    }

    return NextResponse.json({
      success: true,
      action,
      result,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error('WhatsApp automation error:', error)
    return NextResponse.json(
      {
        error: 'Automation trigger failed',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}

// Get automation status and statistics
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const userId = searchParams.get('userId')

    if (userId) {
      // Return specific user automation status
      return NextResponse.json({
        userId,
        status: 'active', // This would come from your database
        lastInteraction: new Date().toISOString(),
        engagementScore: 85,
        activeFlows: ['welcome_series', 'daily_tips'],
        preferences: {
          dailyTips: true,
          weeklyMotivation: true,
          progressUpdates: true,
          parentUpdates: false,
        },
      })
    } else {
      // Return overall automation statistics
      return NextResponse.json({
        totalUsers: 1250,
        activeFlows: 523,
        messagesSentToday: 1847,
        engagementRate: 78.5,
        topPerformingFlows: [
          { name: 'welcome_series', engagement: 92.3 },
          { name: 'abandoned_cart', engagement: 67.8 },
          { name: 'daily_tips', engagement: 85.1 },
        ],
        recentActivity: [
          {
            timestamp: new Date().toISOString(),
            action: 'welcome_series_triggered',
            userId: 'user_123',
            success: true,
          },
        ],
      })
    }
  } catch (error) {
    console.error('Error fetching automation status:', error)
    return NextResponse.json({ error: 'Failed to fetch automation status' }, { status: 500 })
  }
}
