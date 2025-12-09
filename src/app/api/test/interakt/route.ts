/**
 * Test API for Interakt WhatsApp Integration
 * POST /api/test/interakt
 *
 * This endpoint is for testing Interakt messaging.
 * Should be disabled in production or protected with admin auth.
 */

import { NextRequest, NextResponse } from 'next/server'
import {
  sendWhatsAppMessage,
  trackUser,
  isInteraktConfigured,
  checkAPIHealth,
} from '@/lib/interakt'

export async function POST(request: NextRequest) {
  try {
    // Check if this is production and block if not admin
    if (process.env.NODE_ENV === 'production') {
      const adminKey = request.headers.get('x-admin-key')
      if (adminKey !== process.env.AUTH_SECRET) {
        return NextResponse.json(
          { success: false, error: 'Unauthorized in production' },
          { status: 401 }
        )
      }
    }

    const body = await request.json()
    const { phone, message, type = 'text' } = body

    if (!phone) {
      return NextResponse.json(
        { success: false, error: 'Phone number is required' },
        { status: 400 }
      )
    }

    // Check if API key is configured
    if (!isInteraktConfigured()) {
      return NextResponse.json(
        {
          success: false,
          error: 'Interakt API key not configured',
        },
        { status: 503 }
      )
    }

    // First track/create the user in Interakt CRM
    const trackResult = await trackUser({
      phone,
      traits: {
        name: body.name || 'Test User',
        source: 'api_test',
        testMessage: true,
      },
    })

    let result

    if (type === 'text') {
      // Send plain text message (only works within 24hr session window)
      result = await sendWhatsAppMessage({
        phone,
        message:
          message ||
          '🎓 Test message from Cerebrum Biology Academy! Your Interakt integration is working correctly.',
      })
    } else if (type === 'template') {
      // Send template message (works anytime)
      // Note: Template must exist in Interakt dashboard
      result = await sendWhatsAppMessage({
        phone,
        templateName: body.templateName || 'hello_world', // Default template
        templateParams: body.templateParams || {},
      })
    }

    return NextResponse.json({
      success: result?.success || false,
      messageId: result?.messageId,
      userTracked: trackResult.success,
      sentAt: new Date().toISOString(),
      details: result,
      trackResult: trackResult,
    })
  } catch (error) {
    console.error('Interakt test error:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    // Health check endpoint
    const healthCheck = await checkAPIHealth()

    return NextResponse.json({
      service: 'Interakt WhatsApp API',
      status: healthCheck.status,
      apiKeyConfigured: isInteraktConfigured(),
      message: healthCheck.message,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    return NextResponse.json(
      {
        service: 'Interakt WhatsApp API',
        status: 'error',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
