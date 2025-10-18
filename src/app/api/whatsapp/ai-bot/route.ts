/**
 * WhatsApp AI Bot Webhook Handler
 * 24/7 Automated Student Support for Cerebrum Biology Academy
 *
 * Features:
 * - Webhook verification (GET)
 * - Message processing (POST)
 * - Rate limiting (10 messages/minute per user)
 * - Security validation
 * - Error handling with retry logic
 */

import { NextRequest, NextResponse } from 'next/server'
import { AIMessageHandler } from '@/lib/whatsapp/aiMessageHandler'
import crypto from 'crypto'

// Rate limiter store (in production, use Redis)
const rateLimitStore = new Map<string, { count: number; resetAt: number }>()

// Duplicate message tracker
const processedMessages = new Set<string>()

// Clean up old processed messages every hour
setInterval(
  () => {
    const oneHourAgo = Date.now() - 60 * 60 * 1000
    const messagesToRemove: string[] = []

    processedMessages.forEach((msgId) => {
      if (parseInt(msgId.split('_')[1] || '0') < oneHourAgo) {
        messagesToRemove.push(msgId)
      }
    })

    messagesToRemove.forEach((msgId) => processedMessages.delete(msgId))
  },
  60 * 60 * 1000
)

/**
 * GET - Webhook Verification
 * Meta requires this for WhatsApp Business API setup
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const mode = searchParams.get('hub.mode')
    const token = searchParams.get('hub.verify_token')
    const challenge = searchParams.get('hub.challenge')

    console.log('📞 Webhook verification request:', { mode, token: token ? '***' : null })

    // Check if verification token matches
    if (mode === 'subscribe' && token === process.env.WHATSAPP_VERIFY_TOKEN) {
      console.log('✅ Webhook verified successfully')
      return new Response(challenge, { status: 200 })
    }

    console.log('❌ Webhook verification failed')
    return NextResponse.json({ error: 'Verification failed' }, { status: 403 })
  } catch (error) {
    console.error('❌ Webhook verification error:', error)
    return NextResponse.json({ error: 'Verification error' }, { status: 500 })
  }
}

/**
 * POST - Webhook Handler for Incoming Messages
 * Processes WhatsApp messages and sends AI responses
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate webhook signature (Meta security requirement)
    const signature = request.headers.get('x-hub-signature-256')
    if (process.env.NODE_ENV === 'production' && !validateSignature(body, signature)) {
      console.error('❌ Invalid webhook signature')
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
    }

    // Extract message data from webhook payload
    const messageData = extractMessageData(body)

    if (!messageData) {
      // No message to process (could be status update, etc.)
      return NextResponse.json({ status: 'ok' }, { status: 200 })
    }

    const { from, text, messageId, name, phoneNumberId } = messageData

    console.log(`📱 Received message from ${name} (${from}): "${text?.substring(0, 50)}..."`)

    // Check for duplicate messages
    if (isDuplicateMessage(messageId)) {
      console.log(`⚠️ Duplicate message ignored: ${messageId}`)
      return NextResponse.json({ status: 'duplicate' }, { status: 200 })
    }

    // Mark message as processed
    processedMessages.add(`${messageId}_${Date.now()}`)

    // Rate limiting (10 messages per minute per user)
    if (!checkRateLimit(from)) {
      console.log(`⚠️ Rate limit exceeded for ${from}`)
      const aiHandler = new AIMessageHandler()
      await aiHandler.sendRateLimitMessage(from, phoneNumberId)
      return NextResponse.json({ status: 'rate_limited' }, { status: 429 })
    }

    // Process message with AI in background (don't block webhook response)
    processMessageAsync(messageData)

    // Return success immediately (Meta requires quick response)
    return NextResponse.json({ status: 'received' }, { status: 200 })
  } catch (error) {
    console.error('❌ Webhook processing error:', error)

    // Still return 200 to Meta to avoid webhook disabling
    return NextResponse.json({ status: 'error' }, { status: 200 })
  }
}

/**
 * Process message asynchronously (non-blocking)
 */
async function processMessageAsync(messageData: MessageData) {
  try {
    const aiHandler = new AIMessageHandler()
    await aiHandler.processMessage(messageData)
  } catch (error) {
    console.error('❌ Error processing message:', error)

    // Send error message to user
    try {
      const aiHandler = new AIMessageHandler()
      await aiHandler.sendErrorMessage(
        messageData.from,
        messageData.phoneNumberId,
        "I'm having trouble right now. Please try again in a moment or call us at +91 88264 44334"
      )
    } catch (sendError) {
      console.error('❌ Failed to send error message:', sendError)
    }
  }
}

/**
 * Extract message data from WhatsApp webhook payload
 */
function extractMessageData(body: any): MessageData | null {
  try {
    const entry = body.entry?.[0]
    const changes = entry?.changes?.[0]
    const value = changes?.value

    // Check if this is a message event
    if (!value?.messages?.[0]) {
      return null
    }

    const message = value.messages[0]
    const contact = value.contacts?.[0]

    // Extract phone number and message details
    const from = message.from
    const messageId = message.id
    const phoneNumberId = value.metadata?.phone_number_id
    const name = contact?.profile?.name || 'Student'
    const timestamp = message.timestamp

    // Extract message text based on type
    let text = ''
    let messageType = 'text'

    if (message.type === 'text') {
      text = message.text?.body || ''
      messageType = 'text'
    } else if (message.type === 'interactive') {
      // Handle button/list responses
      if (message.interactive?.type === 'button_reply') {
        text = message.interactive.button_reply.title || ''
        messageType = 'button'
      } else if (message.interactive?.type === 'list_reply') {
        text = message.interactive.list_reply.title || ''
        messageType = 'list'
      }
    }

    if (!text) {
      // Unsupported message type
      return null
    }

    return {
      from,
      text,
      messageId,
      phoneNumberId,
      name,
      timestamp,
      messageType,
    }
  } catch (error) {
    console.error('❌ Error extracting message data:', error)
    return null
  }
}

/**
 * Check if message has already been processed
 */
function isDuplicateMessage(messageId: string): boolean {
  // Check if message ID exists in processed set
  return Array.from(processedMessages).some((id) => id.startsWith(messageId))
}

/**
 * Rate limiting: Max 10 messages per minute per user
 */
function checkRateLimit(phoneNumber: string): boolean {
  const now = Date.now()
  const userLimit = rateLimitStore.get(phoneNumber)

  if (!userLimit || now > userLimit.resetAt) {
    // Reset or create new limit
    rateLimitStore.set(phoneNumber, {
      count: 1,
      resetAt: now + 60000, // 1 minute from now
    })
    return true
  }

  if (userLimit.count >= 10) {
    // Rate limit exceeded
    return false
  }

  // Increment count
  userLimit.count++
  return true
}

/**
 * Validate webhook signature from Meta
 */
function validateSignature(payload: any, signature: string | null): boolean {
  if (!signature) return false

  const appSecret = process.env.WHATSAPP_APP_SECRET
  if (!appSecret) {
    console.error('❌ WHATSAPP_APP_SECRET not configured')
    return false
  }

  try {
    // Calculate expected signature
    const payloadString = JSON.stringify(payload)
    const expectedSignature =
      'sha256=' + crypto.createHmac('sha256', appSecret).update(payloadString).digest('hex')

    // Compare signatures
    return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature))
  } catch (error) {
    console.error('❌ Signature validation error:', error)
    return false
  }
}

// Type definitions
interface MessageData {
  from: string
  text: string
  messageId: string
  phoneNumberId: string
  name: string
  timestamp: string
  messageType: string
}
