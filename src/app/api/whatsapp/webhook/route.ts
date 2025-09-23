/**
 * WhatsApp Cloud API Webhook Endpoint
 * Advanced Biology Chatbot for Cerebrum Biology Academy
 * Handles text, voice, and image questions from students
 */

import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import { WhatsAppMessageProcessor } from '@/lib/whatsapp/messageProcessor'

const VERIFY_TOKEN = process.env.WHATSAPP_VERIFY_TOKEN
const WEBHOOK_SECRET = process.env.WHATSAPP_WEBHOOK_SECRET

interface WhatsAppWebhookEntry {
  id: string
  changes: Array<{
    value: {
      messaging_product: string
      metadata: {
        display_phone_number: string
        phone_number_id: string
      }
      contacts?: Array<{
        profile: {
          name: string
        }
        wa_id: string
      }>
      messages?: Array<{
        from: string
        id: string
        timestamp: string
        type: 'text' | 'audio' | 'image' | 'video' | 'document' | 'interactive'
        text?: { body: string }
        audio?: {
          id: string
          mime_type: string
          sha256: string
          voice: boolean
        }
        image?: {
          id: string
          mime_type: string
          sha256: string
          caption?: string
        }
        interactive?: {
          type: string
          button_reply?: {
            id: string
            title: string
          }
        }
        context?: {
          from: string
          id: string
        }
      }>
      statuses?: Array<{
        id: string
        status: 'sent' | 'delivered' | 'read' | 'failed'
        timestamp: string
        recipient_id: string
      }>
    }
    field: string
  }>
}

interface WhatsAppWebhookPayload {
  object: string
  entry: WhatsAppWebhookEntry[]
}

// GET request for webhook verification
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)

    const mode = searchParams.get('hub.mode')
    const token = searchParams.get('hub.verify_token')
    const challenge = searchParams.get('hub.challenge')

    console.log('🔗 WhatsApp webhook verification:', {
      mode,
      token: token?.substring(0, 10) + '...',
    })

    if (mode && token) {
      if (mode === 'subscribe' && token === VERIFY_TOKEN) {
        console.log('✅ WhatsApp webhook verified successfully')
        return new NextResponse(challenge, { status: 200 })
      } else {
        console.log('❌ Webhook verification failed - invalid token')
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
      }
    }

    return NextResponse.json({ error: 'Bad Request' }, { status: 400 })
  } catch (error) {
    console.error('❌ Webhook verification error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

// POST request for receiving messages
export async function POST(request: NextRequest) {
  try {
    const body = await request.text()

    // Verify webhook signature for security
    if (!verifyWebhookSignature(body, request.headers.get('x-hub-signature-256'))) {
      console.log('❌ Invalid webhook signature')
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const payload: WhatsAppWebhookPayload = JSON.parse(body)

    console.log('📱 WhatsApp webhook received:', {
      object: payload.object,
      entries: payload.entry?.length || 0,
      timestamp: new Date().toISOString(),
    })

    // Process webhook payload for biology education
    if (payload.object === 'whatsapp_business_account') {
      await processWhatsAppEducationWebhook(payload)
    }

    // Always return 200 to acknowledge receipt
    return NextResponse.json({ status: 'success' }, { status: 200 })
  } catch (error) {
    console.error('❌ WhatsApp webhook processing error:', error)

    // Still return 200 to prevent WhatsApp from retrying
    return NextResponse.json(
      {
        status: 'error',
        message: 'Internal processing error',
      },
      { status: 200 }
    )
  }
}

function verifyWebhookSignature(payload: string, signature: string | null): boolean {
  if (!signature || !WEBHOOK_SECRET) {
    console.log('⚠️  Missing signature or webhook secret')
    return false
  }

  try {
    const expectedSignature = crypto
      .createHmac('sha256', WEBHOOK_SECRET)
      .update(payload, 'utf8')
      .digest('hex')

    const providedSignature = signature.replace('sha256=', '')

    return crypto.timingSafeEqual(
      Buffer.from(expectedSignature, 'hex'),
      Buffer.from(providedSignature, 'hex')
    )
  } catch (error) {
    console.error('❌ Signature verification error:', error)
    return false
  }
}

async function processWhatsAppEducationWebhook(payload: WhatsAppWebhookPayload) {
  const messageProcessor = new WhatsAppMessageProcessor()

  for (const entry of payload.entry) {
    for (const change of entry.changes) {
      const { value } = change

      // Process incoming messages from students
      if (value.messages && value.messages.length > 0) {
        for (const message of value.messages) {
          try {
            console.log(`📩 Processing biology question from ${message.from}:`, {
              type: message.type,
              id: message.id,
              timestamp: message.timestamp,
            })

            // Extract student contact info
            const contact = value.contacts?.find((c) => c.wa_id === message.from)
            const studentName = contact?.profile?.name || 'Student'

            await messageProcessor.processEducationalMessage({
              messageId: message.id,
              from: message.from,
              phoneNumberId: value.metadata.phone_number_id,
              studentName,
              timestamp: message.timestamp,
              type: message.type,
              content: extractMessageContent(message),
              context: message.context,
            })
          } catch (error) {
            console.error(`❌ Failed to process message ${message.id}:`, error)

            // Send error response to student
            await messageProcessor.sendErrorResponse(
              message.from,
              value.metadata.phone_number_id,
              'Sorry, I encountered an error processing your question. Please try again! 🤖'
            )
          }
        }
      }

      // Process message status updates for analytics
      if (value.statuses && value.statuses.length > 0) {
        for (const status of value.statuses) {
          console.log(`📊 Message delivery status:`, {
            messageId: status.id,
            status: status.status,
            recipientId: status.recipient_id,
          })

          await messageProcessor.trackMessageStatus({
            messageId: status.id,
            status: status.status,
            recipientId: status.recipient_id,
            timestamp: status.timestamp,
          })
        }
      }
    }
  }
}

function extractMessageContent(message: any): any {
  switch (message.type) {
    case 'text':
      return {
        text: message.text?.body || '',
        type: 'text_question',
      }

    case 'audio':
      return {
        audioId: message.audio?.id,
        mimeType: message.audio?.mime_type,
        isVoiceNote: message.audio?.voice || false,
        type: 'voice_question',
      }

    case 'image':
      return {
        imageId: message.image?.id,
        mimeType: message.image?.mime_type,
        caption: message.image?.caption || '',
        type: 'diagram_question',
      }

    case 'interactive':
      return {
        interactionType: message.interactive?.type,
        buttonReply: message.interactive?.button_reply,
        type: 'button_response',
      }

    case 'document':
      return {
        documentId: message.document?.id,
        filename: message.document?.filename,
        mimeType: message.document?.mime_type,
        type: 'document_question',
      }

    default:
      return {
        raw: message,
        type: 'unknown',
      }
  }
}
