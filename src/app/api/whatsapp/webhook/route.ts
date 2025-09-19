import { NextRequest, NextResponse } from 'next/server'
import { WhatsAppAutomationService } from '@/lib/integrations/whatsappAutomationService'

/**
 * WhatsApp Business API Webhook Handler
 * Processes incoming messages and triggers automated responses
 */

// Webhook verification for WhatsApp Business API
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams

  const mode = searchParams.get('hub.mode')
  const token = searchParams.get('hub.verify_token')
  const challenge = searchParams.get('hub.challenge')

  // Verify the webhook
  if (mode === 'subscribe' && token === process.env.WHATSAPP_VERIFY_TOKEN) {
    console.log('WhatsApp webhook verified successfully')
    return new NextResponse(challenge, { status: 200 })
  } else {
    console.error('WhatsApp webhook verification failed')
    return NextResponse.json({ error: 'Verification failed' }, { status: 403 })
  }
}

// Handle incoming WhatsApp messages
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    console.log('WhatsApp webhook received:', JSON.stringify(body, null, 2))

    // Verify webhook signature for security
    const signature = request.headers.get('x-hub-signature-256')
    if (!verifyWebhookSignature(JSON.stringify(body), signature)) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 403 })
    }

    // Process the webhook data
    await WhatsAppAutomationService.handleWebhook(body)

    return NextResponse.json({ status: 'success' })
  } catch (error) {
    console.error('WhatsApp webhook error:', error)
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 })
  }
}

function verifyWebhookSignature(payload: string, signature: string | null): boolean {
  if (!signature || !process.env.WHATSAPP_WEBHOOK_SECRET) {
    return false
  }

  const crypto = require('crypto')
  const expectedSignature = crypto
    .createHmac('sha256', process.env.WHATSAPP_WEBHOOK_SECRET)
    .update(payload)
    .digest('hex')

  const receivedSignature = signature.replace('sha256=', '')

  return crypto.timingSafeEqual(
    Buffer.from(expectedSignature, 'hex'),
    Buffer.from(receivedSignature, 'hex')
  )
}
