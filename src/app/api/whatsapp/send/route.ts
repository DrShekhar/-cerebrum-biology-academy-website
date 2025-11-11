import { NextRequest, NextResponse } from 'next/server'
import { WhatsAppBusinessService } from '@/lib/integrations/whatsappBusinessService'

/**
 * WhatsApp Business API Send Message Endpoint
 * Handles direct message sending for legacy compatibility
 */

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { phone, message, type = 'text', templateName, templateParams } = body

    // Validate required fields
    if (!phone || !message) {
      return NextResponse.json(
        { error: 'Missing required fields: phone and message' },
        { status: 400 }
      )
    }

    // Validate phone number format
    if (!phone.match(/^\+?[1-9]\d{1,14}$/)) {
      return NextResponse.json({ error: 'Invalid phone number format' }, { status: 400 })
    }

    let result

    switch (type) {
      case 'text':
        result = await WhatsAppBusinessService.sendTextMessage(phone, message)
        break

      case 'template':
        if (!templateName) {
          return NextResponse.json(
            { error: 'Template name required for template messages' },
            { status: 400 }
          )
        }

        // Convert templateParams to proper components format
        const components: Array<{
          type: 'header' | 'body' | 'footer' | 'button'
          parameters: Array<{ type: 'text'; text: string }>
        }> = templateParams
          ? [
              {
                type: 'body',
                parameters: templateParams.map((param: string) => ({
                  type: 'text',
                  text: param,
                })),
              },
            ]
          : []

        result = await WhatsAppBusinessService.sendTemplate(phone, templateName, 'en', components)
        break

      default:
        return NextResponse.json(
          { error: 'Unsupported message type. Use "text" or "template"' },
          { status: 400 }
        )
    }

    return NextResponse.json({
      success: true,
      messageId: result.messages?.[0]?.id,
      whatsappId: result.messages?.[0]?.wa_id,
      status: 'sent',
      timestamp: new Date().toISOString(),
      result,
    })
  } catch (error) {
    console.error('WhatsApp send message error:', error)

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to send WhatsApp message',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}

// Get sending status and rate limits
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const messageId = searchParams.get('messageId')

    if (messageId) {
      // In production, you would check message status
      return NextResponse.json({
        messageId,
        status: 'delivered', // This would come from WhatsApp webhook
        timestamp: new Date().toISOString(),
      })
    } else {
      // Return API status and rate limits
      return NextResponse.json({
        status: 'operational',
        rateLimit: {
          messagesPerMinute: 80,
          messagesPerDay: 1000,
          currentUsage: {
            today: 245,
            thisMinute: 12,
          },
        },
        templates: {
          available: [
            'welcome_instant',
            'class_reminder',
            'assignment_reminder',
            'test_results',
            'fee_reminder',
            'limited_offer',
            'cart_recovery_discount',
            'last_chance_offer',
          ],
        },
        phoneNumberId: process.env.WHATSAPP_PHONE_NUMBER_ID || 'not_configured',
        webhookUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/api/whatsapp/webhook`,
      })
    }
  } catch (error) {
    console.error('Error getting WhatsApp status:', error)
    return NextResponse.json({ error: 'Failed to get status' }, { status: 500 })
  }
}
